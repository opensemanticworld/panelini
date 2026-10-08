/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function $a(s) {
  const u = /* @__PURE__ */ Object.create(null);
  for (const p of s.split(",")) u[p] = 1;
  return (p) => p in u;
}
const at = {}, Rn = [], vr = () => {
}, hu = () => !1, Zo = (s) => s.charCodeAt(0) === 111 && s.charCodeAt(1) === 110 && // uppercase letter
(s.charCodeAt(2) > 122 || s.charCodeAt(2) < 97), Yo = (s) => s.startsWith("onUpdate:"), xt = Object.assign, Ga = (s, u) => {
  const p = s.indexOf(u);
  p > -1 && s.splice(p, 1);
}, qf = Object.prototype.hasOwnProperty, et = (s, u) => qf.call(s, u), Me = Array.isArray, an = (s) => ho(s) === "[object Map]", Vo = (s) => ho(s) === "[object Set]", Ac = (s) => ho(s) === "[object Date]", qe = (s) => typeof s == "function", dt = (s) => typeof s == "string", gr = (s) => typeof s == "symbol", rt = (s) => s !== null && typeof s == "object", pu = (s) => (rt(s) || qe(s)) && qe(s.then) && qe(s.catch), fu = Object.prototype.toString, ho = (s) => fu.call(s), Uf = (s) => ho(s).slice(8, -1), yu = (s) => ho(s) === "[object Object]", Wa = (s) => dt(s) && s !== "NaN" && s[0] !== "-" && "" + parseInt(s, 10) === s, Yi = /* @__PURE__ */ $a(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Qo = (s) => {
  const u = /* @__PURE__ */ Object.create(null);
  return (p) => u[p] || (u[p] = s(p));
}, $f = /-\w/g, Xt = Qo(
  (s) => s.replace($f, (u) => u.slice(1).toUpperCase())
), Gf = /\B([A-Z])/g, Mn = Qo(
  (s) => s.replace(Gf, "-$1").toLowerCase()
), mu = Qo((s) => s.charAt(0).toUpperCase() + s.slice(1)), va = Qo(
  (s) => s ? `on${mu(s)}` : ""
), br = (s, u) => !Object.is(s, u), Fo = (s, ...u) => {
  for (let p = 0; p < s.length; p++)
    s[p](...u);
}, bu = (s, u, p, _ = !1) => {
  Object.defineProperty(s, u, {
    configurable: !0,
    enumerable: !1,
    writable: _,
    value: p
  });
}, Ja = (s) => {
  const u = parseFloat(s);
  return isNaN(u) ? s : u;
};
let Rc;
const Xo = () => Rc || (Rc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function In(s) {
  if (Me(s)) {
    const u = {};
    for (let p = 0; p < s.length; p++) {
      const _ = s[p], b = dt(_) ? Zf(_) : In(_);
      if (b)
        for (const O in b)
          u[O] = b[O];
    }
    return u;
  } else if (dt(s) || rt(s))
    return s;
}
const Wf = /;(?![^(]*\))/g, Jf = /:([^]+)/, Kf = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Zf(s) {
  const u = {};
  return s.replace(Kf, (p) => p.startsWith("/*") ? "" : p).split(Wf).forEach((p) => {
    if (p) {
      const _ = p.split(Jf);
      _.length > 1 && (u[_[0].trim()] = _[1].trim());
    }
  }), u;
}
function Bn(s) {
  let u = "";
  if (dt(s))
    u = s;
  else if (Me(s))
    for (let p = 0; p < s.length; p++) {
      const _ = Bn(s[p]);
      _ && (u += _ + " ");
    }
  else if (rt(s))
    for (const p in s)
      s[p] && (u += p + " ");
  return u.trim();
}
const Yf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qf = /* @__PURE__ */ $a(Yf);
function vu(s) {
  return !!s || s === "";
}
function Xf(s, u, p) {
  if (s.length !== u.length) return !1;
  let _ = !0;
  for (let b = 0; _ && b < s.length; b++)
    _ = es(s[b], u[b], p);
  return _;
}
function Ic(s, u, p) {
  if (s.size !== u.size) return !1;
  const _ = Array.from(u), b = new Uint8Array(_.length);
  for (const O of s) {
    let h = -1;
    for (let w = 0; w < _.length; w++)
      if (!b[w] && es(O, _[w], p)) {
        h = w;
        break;
      }
    if (h < 0) return !1;
    b[h] = 1;
  }
  return !0;
}
function ey(s, u, p) {
  let _ = an(s), b = an(u);
  if (_ || b || (_ = Vo(s), b = Vo(u), _ || b))
    return _ && b ? Ic(s, u, p) : !1;
  const O = Object.keys(s).length, h = Object.keys(u).length;
  if (O !== h)
    return !1;
  for (const w in s) {
    const a = s.hasOwnProperty(w), f = u.hasOwnProperty(w);
    if (a && !f || !a && f || !es(s[w], u[w], p))
      return !1;
  }
  return String(s) === String(u);
}
function Bc(s, u, p, _) {
  p || (p = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [b, O] = p;
  if (b.has(s) || O.has(u))
    return b.get(s) === u && O.get(u) === s;
  b.set(s, u), O.set(u, s);
  const h = _(s, u, p);
  return b.delete(s), O.delete(u), h;
}
function es(s, u, p) {
  if (s === u) return !0;
  let _ = Ac(s), b = Ac(u);
  return _ || b ? _ && b ? s.getTime() === u.getTime() : !1 : (_ = gr(s), b = gr(u), _ || b ? s === u : (_ = Me(s), b = Me(u), _ || b ? _ && b ? Bc(s, u, p, Xf) : !1 : (_ = rt(s), b = rt(u), _ || b ? !_ || !b ? !1 : Bc(s, u, p, ey) : String(s) === String(u))));
}
const gu = (s) => !!(s && s.__v_isRef === !0), Qi = (s) => dt(s) ? s : s == null ? "" : Me(s) || rt(s) && (s.toString === fu || !qe(s.toString)) ? gu(s) ? Qi(s.value) : JSON.stringify(s, _u, 2) : String(s), _u = (s, u) => gu(u) ? _u(s, u.value) : an(u) ? {
  [`Map(${u.size})`]: [...u.entries()].reduce(
    (p, [_, b], O) => (p[ga(_, O) + " =>"] = b, p),
    {}
  )
} : Vo(u) ? {
  [`Set(${u.size})`]: [...u.values()].map((p) => ga(p))
} : gr(u) ? ga(u) : rt(u) && !Me(u) && !yu(u) ? String(u) : u, ga = (s, u = "") => {
  var p;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    gr(s) ? `Symbol(${(p = s.description) != null ? p : u})` : s
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class ty {
  // TODO isolatedDeclarations "__v_skip"
  constructor(u = !1) {
    this.detached = u, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !u && gt && (gt.active ? (this.parent = gt, this.index = (gt.scopes || (gt.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let u, p;
      if (this.scopes) {
        const _ = this.scopes.slice();
        for (u = 0, p = _.length; u < p; u++)
          _[u].pause();
      }
      for (u = 0, p = this.effects.length; u < p; u++)
        this.effects[u].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let u, p;
      if (this.scopes) {
        const b = this.scopes.slice();
        for (u = 0, p = b.length; u < p; u++)
          b[u].resume();
      }
      const _ = this.effects.slice();
      for (u = 0, p = _.length; u < p; u++)
        _[u].resume();
    }
  }
  run(u) {
    if (this._active) {
      const p = gt;
      try {
        return gt = this, u();
      } finally {
        gt = p;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = gt, gt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (gt === this)
        gt = this.prevScope;
      else {
        let u = gt;
        for (; u; ) {
          if (u.prevScope === this) {
            u.prevScope = this.prevScope;
            break;
          }
          u = u.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(u) {
    if (this._active) {
      this._active = !1;
      let p, _;
      for (p = 0, _ = this.effects.length; p < _; p++)
        this.effects[p].stop();
      for (this.effects.length = 0, p = 0, _ = this.cleanups.length; p < _; p++)
        this.cleanups[p]();
      if (this.cleanups.length = 0, this.scopes) {
        const b = this.scopes.slice();
        for (p = 0, _ = b.length; p < _; p++)
          b[p].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !u) {
        const b = this.parent.scopes.pop();
        b && b !== this && (this.parent.scopes[this.index] = b, b.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ry() {
  return gt;
}
let lt;
const _a = /* @__PURE__ */ new WeakSet();
class wu {
  constructor(u) {
    this.fn = u, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, gt && (gt.active ? gt.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, _a.has(this) && (_a.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ku(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Nc(this), xu(this);
    const u = lt, p = er;
    lt = this, er = !0;
    try {
      return this.fn();
    } finally {
      Ou(this), lt = u, er = p, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let u = this.deps; u; u = u.nextDep)
        Ya(u);
      this.deps = this.depsTail = void 0, Nc(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? _a.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    La(this) && this.run();
  }
  get dirty() {
    return La(this);
  }
}
let ju = 0, Xi, eo;
function ku(s, u = !1) {
  if (s.flags |= 8, u) {
    s.next = eo, eo = s;
    return;
  }
  s.next = Xi, Xi = s;
}
function Ka() {
  ju++;
}
function Za() {
  if (--ju > 0)
    return;
  if (eo) {
    let u = eo;
    for (eo = void 0; u; ) {
      const p = u.next;
      u.next = void 0, u.flags &= -9, u = p;
    }
  }
  let s;
  for (; Xi; ) {
    let u = Xi;
    for (Xi = void 0; u; ) {
      const p = u.next;
      if (u.next = void 0, u.flags &= -9, u.flags & 1)
        try {
          u.trigger();
        } catch (_) {
          s || (s = _);
        }
      u = p;
    }
  }
  if (s) throw s;
}
function xu(s) {
  for (let u = s.deps; u; u = u.nextDep)
    u.version = -1, u.prevActiveLink = u.dep.activeLink, u.dep.activeLink = u;
}
function Ou(s) {
  let u, p = s.depsTail, _ = p;
  for (; _; ) {
    const b = _.prevDep;
    _.version === -1 ? (_ === p && (p = b), Ya(_), ny(_)) : u = _, _.dep.activeLink = _.prevActiveLink, _.prevActiveLink = void 0, _ = b;
  }
  s.deps = u, s.depsTail = p;
}
function La(s) {
  for (let u = s.deps; u; u = u.nextDep)
    if (u.dep.version !== u.version || u.dep.computed && (Cu(u.dep.computed) || u.dep.version !== u.version))
      return !0;
  return !!s._dirty;
}
function Cu(s) {
  if (s.flags & 4 && !(s.flags & 16) || (s.flags &= -17, s.globalVersion === oo) || (s.globalVersion = oo, !s.isSSR && s.flags & 128 && (!s.deps && !s._dirty || !La(s))))
    return;
  s.flags |= 2;
  const u = s.dep, p = lt, _ = er;
  lt = s, er = !0;
  try {
    xu(s);
    const b = s.fn(s._value);
    (u.version === 0 || br(b, s._value)) && (s.flags |= 128, s._value = b, u.version++);
  } catch (b) {
    throw u.version++, b;
  } finally {
    lt = p, er = _, Ou(s), s.flags &= -3;
  }
}
function Ya(s, u = !1) {
  const { dep: p, prevSub: _, nextSub: b } = s;
  if (_ && (_.nextSub = b, s.prevSub = void 0), b && (b.prevSub = _, s.nextSub = void 0), p.subs === s && (p.subs = _, !_ && p.computed)) {
    p.computed.flags &= -5;
    for (let O = p.computed.deps; O; O = O.nextDep)
      Ya(O, !0);
  }
  !u && !--p.sc && p.map && p.map.delete(p.key);
}
function ny(s) {
  const { prevDep: u, nextDep: p } = s;
  u && (u.nextDep = p, s.prevDep = void 0), p && (p.prevDep = u, s.nextDep = void 0);
}
let er = !0;
const Eu = [];
function Br() {
  Eu.push(er), er = !1;
}
function Nr() {
  const s = Eu.pop();
  er = s === void 0 ? !0 : s;
}
function Nc(s) {
  const { cleanup: u } = s;
  if (s.cleanup = void 0, u) {
    const p = lt;
    lt = void 0;
    try {
      u();
    } finally {
      lt = p;
    }
  }
}
let oo = 0;
class iy {
  constructor(u, p) {
    this.sub = u, this.dep = p, this.version = p.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Qa {
  // TODO isolatedDeclarations "__v_skip"
  constructor(u) {
    this.computed = u, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(u) {
    if (!lt || !er || lt === this.computed)
      return;
    let p = this.activeLink;
    if (p === void 0 || p.sub !== lt)
      p = this.activeLink = new iy(lt, this), lt.deps ? (p.prevDep = lt.depsTail, lt.depsTail.nextDep = p, lt.depsTail = p) : lt.deps = lt.depsTail = p, Su(p);
    else if (p.version === -1 && (p.version = this.version, p.nextDep)) {
      const _ = p.nextDep;
      _.prevDep = p.prevDep, p.prevDep && (p.prevDep.nextDep = _), p.prevDep = lt.depsTail, p.nextDep = void 0, lt.depsTail.nextDep = p, lt.depsTail = p, lt.deps === p && (lt.deps = _);
    }
    return p;
  }
  trigger(u) {
    this.version++, oo++, this.notify(u);
  }
  notify(u) {
    Ka();
    try {
      for (let p = this.subs; p; p = p.prevSub)
        p.sub.notify() && p.sub.dep.notify();
    } finally {
      Za();
    }
  }
}
function Su(s) {
  if (s.dep.sc++, s.sub.flags & 4) {
    const u = s.dep.computed;
    if (u && !s.dep.subs) {
      u.flags |= 20;
      for (let _ = u.deps; _; _ = _.nextDep)
        Su(_);
    }
    const p = s.dep.subs;
    p !== s && (s.prevSub = p, p && (p.nextSub = s)), s.dep.subs = s;
  }
}
const Aa = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ Symbol(
  ""
), Ra = /* @__PURE__ */ Symbol(
  ""
), so = /* @__PURE__ */ Symbol(
  ""
);
function jt(s, u, p) {
  if (er && lt) {
    let _ = Aa.get(s);
    _ || Aa.set(s, _ = /* @__PURE__ */ new Map());
    let b = _.get(p);
    b || (_.set(p, b = new Qa()), b.map = _, b.key = p), b.track();
  }
}
function Ar(s, u, p, _, b, O) {
  const h = Aa.get(s);
  if (!h) {
    oo++;
    return;
  }
  const w = (a) => {
    a && a.trigger();
  };
  if (Ka(), u === "clear")
    h.forEach(w);
  else {
    const a = Me(s), f = a && Wa(p);
    if (a && p === "length") {
      const y = Number(_);
      h.forEach((m, v) => {
        (v === "length" || v === so || !gr(v) && v >= y) && w(m);
      });
    } else
      switch ((p !== void 0 || h.has(void 0)) && w(h.get(p)), f && w(h.get(so)), u) {
        case "add":
          a ? f && w(h.get("length")) : (w(h.get(Nn)), an(s) && w(h.get(Ra)));
          break;
        case "delete":
          a || (w(h.get(Nn)), an(s) && w(h.get(Ra)));
          break;
        case "set":
          an(s) && w(h.get(Nn));
          break;
      }
  }
  Za();
}
function Ei(s) {
  const u = /* @__PURE__ */ Xe(s);
  return u === s || (jt(u, "iterate", so), /* @__PURE__ */ Ft(s)) ? u : /* @__PURE__ */ _r(s) ? /* @__PURE__ */ ln(s) ? u.map((p) => cn(Mt(p))) : u.map(cn) : u.map(Mt);
}
function ts(s) {
  return jt(s = /* @__PURE__ */ Xe(s), "iterate", so), s;
}
function yr(s, u) {
  return /* @__PURE__ */ _r(s) ? cn(/* @__PURE__ */ ln(s) ? Mt(u) : u) : Mt(u);
}
const oy = {
  __proto__: null,
  [Symbol.iterator]() {
    return wa(this, Symbol.iterator, (s) => yr(this, s));
  },
  concat(...s) {
    return Ei(this).concat(
      ...s.map((u) => Me(u) ? Ei(u) : u)
    );
  },
  entries() {
    return wa(this, "entries", (s) => (s[1] = yr(this, s[1]), s));
  },
  every(s, u) {
    return Sr(this, "every", s, u, void 0, arguments);
  },
  filter(s, u) {
    return Sr(
      this,
      "filter",
      s,
      u,
      (p) => p.map((_) => yr(this, _)),
      arguments
    );
  },
  find(s, u) {
    return Sr(
      this,
      "find",
      s,
      u,
      (p) => yr(this, p),
      arguments
    );
  },
  findIndex(s, u) {
    return Sr(this, "findIndex", s, u, void 0, arguments);
  },
  findLast(s, u) {
    return Sr(
      this,
      "findLast",
      s,
      u,
      (p) => yr(this, p),
      arguments
    );
  },
  findLastIndex(s, u) {
    return Sr(this, "findLastIndex", s, u, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(s, u) {
    return Sr(this, "forEach", s, u, void 0, arguments);
  },
  includes(...s) {
    return ja(this, "includes", s);
  },
  indexOf(...s) {
    return ja(this, "indexOf", s);
  },
  join(s) {
    return Ei(this).join(s);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...s) {
    return ja(this, "lastIndexOf", s);
  },
  map(s, u) {
    return Sr(this, "map", s, u, void 0, arguments);
  },
  pop() {
    return Gi(this, "pop");
  },
  push(...s) {
    return Gi(this, "push", s);
  },
  reduce(s, ...u) {
    return Dc(this, "reduce", s, u);
  },
  reduceRight(s, ...u) {
    return Dc(this, "reduceRight", s, u);
  },
  shift() {
    return Gi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(s, u) {
    return Sr(this, "some", s, u, void 0, arguments);
  },
  splice(...s) {
    return Gi(this, "splice", s);
  },
  toReversed() {
    return Ei(this).toReversed();
  },
  toSorted(s) {
    return Ei(this).toSorted(s);
  },
  toSpliced(...s) {
    return Ei(this).toSpliced(...s);
  },
  unshift(...s) {
    return Gi(this, "unshift", s);
  },
  values() {
    return wa(this, "values", (s) => yr(this, s));
  }
};
function wa(s, u, p) {
  const _ = ts(s), b = _[u]();
  return _ !== s && !/* @__PURE__ */ Ft(s) && (b._next = b.next, b.next = () => {
    const O = b._next();
    return O.done || (O.value = p(O.value)), O;
  }), b;
}
const sy = Array.prototype;
function Sr(s, u, p, _, b, O) {
  const h = ts(s), w = h !== s && !/* @__PURE__ */ Ft(s), a = h[u];
  if (a !== sy[u]) {
    const m = a.apply(s, O);
    return w ? Mt(m) : m;
  }
  let f = p;
  h !== s && (w ? f = function(m, v) {
    return p.call(this, yr(s, m), v, s);
  } : p.length > 2 && (f = function(m, v) {
    return p.call(this, m, v, s);
  }));
  const y = a.call(h, f, _);
  return w && b ? b(y) : y;
}
function Dc(s, u, p, _) {
  const b = ts(s), O = b !== s && !/* @__PURE__ */ Ft(s);
  let h = p, w = !1;
  b !== s && (O ? (w = _.length === 0, h = function(f, y, m) {
    return w && (w = !1, f = yr(s, f)), p.call(this, f, yr(s, y), m, s);
  }) : p.length > 3 && (h = function(f, y, m) {
    return p.call(this, f, y, m, s);
  }));
  const a = b[u](h, ..._);
  return w ? yr(s, a) : a;
}
function ja(s, u, p) {
  const _ = /* @__PURE__ */ Xe(s);
  jt(_, "iterate", so);
  const b = _[u](...p);
  return (b === -1 || b === !1) && /* @__PURE__ */ rl(p[0]) ? (p[0] = /* @__PURE__ */ Xe(p[0]), _[u](...p)) : b;
}
function Gi(s, u, p = []) {
  Br(), Ka();
  const _ = (/* @__PURE__ */ Xe(s))[u].apply(s, p);
  return Za(), Nr(), _;
}
const ay = /* @__PURE__ */ $a("__proto__,__v_isRef,__isVue"), Pu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((s) => s !== "arguments" && s !== "caller").map((s) => Symbol[s]).filter(gr)
);
function ly(s) {
  gr(s) || (s = String(s));
  const u = /* @__PURE__ */ Xe(this);
  return jt(u, "has", s), u.hasOwnProperty(s);
}
class Tu {
  constructor(u = !1, p = !1) {
    this._isReadonly = u, this._isShallow = p;
  }
  get(u, p, _) {
    if (p === "__v_skip") return u.__v_skip;
    const b = this._isReadonly, O = this._isShallow;
    if (p === "__v_isReactive")
      return !b;
    if (p === "__v_isReadonly")
      return b;
    if (p === "__v_isShallow")
      return O;
    if (p === "__v_raw")
      return _ === (b ? O ? vy : Iu : O ? Ru : Au).get(u) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(u) === Object.getPrototypeOf(_) ? u : void 0;
    const h = Me(u);
    if (!b) {
      let a;
      if (h && (a = oy[p]))
        return a;
      if (p === "hasOwnProperty")
        return ly;
    }
    const w = Reflect.get(
      u,
      p,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ kt(u) ? u : _
    );
    if ((gr(p) ? Pu.has(p) : ay(p)) || (b || jt(u, "get", p), O))
      return w;
    if (/* @__PURE__ */ kt(w)) {
      const a = h && Wa(p) ? w : w.value;
      return b && rt(a) ? /* @__PURE__ */ Ba(a) : a;
    }
    return rt(w) ? b ? /* @__PURE__ */ Ba(w) : /* @__PURE__ */ el(w) : w;
  }
}
class Lu extends Tu {
  constructor(u = !1) {
    super(!1, u);
  }
  set(u, p, _, b) {
    let O = u[p];
    const h = Me(u) && Wa(p);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ _r(O);
      if (!/* @__PURE__ */ Ft(_) && !/* @__PURE__ */ _r(_) && (O = /* @__PURE__ */ Xe(O), _ = /* @__PURE__ */ Xe(_)), !h && /* @__PURE__ */ kt(O) && !/* @__PURE__ */ kt(_))
        return f || (O.value = _), !0;
    }
    const w = h ? Number(p) < u.length : et(u, p), a = Reflect.set(
      u,
      p,
      _,
      /* @__PURE__ */ kt(u) ? u : b
    );
    return u === /* @__PURE__ */ Xe(b) && a && (w ? br(_, O) && Ar(u, "set", p, _) : Ar(u, "add", p, _)), a;
  }
  deleteProperty(u, p) {
    const _ = et(u, p);
    u[p];
    const b = Reflect.deleteProperty(u, p);
    return b && _ && Ar(u, "delete", p, void 0), b;
  }
  has(u, p) {
    const _ = Reflect.has(u, p);
    return (!gr(p) || !Pu.has(p)) && jt(u, "has", p), _;
  }
  ownKeys(u) {
    return jt(
      u,
      "iterate",
      Me(u) ? "length" : Nn
    ), Reflect.ownKeys(u);
  }
}
class cy extends Tu {
  constructor(u = !1) {
    super(!0, u);
  }
  set(u, p) {
    return !0;
  }
  deleteProperty(u, p) {
    return !0;
  }
}
const uy = /* @__PURE__ */ new Lu(), dy = /* @__PURE__ */ new cy(), hy = /* @__PURE__ */ new Lu(!0);
const Ia = (s) => s, Lo = (s) => Reflect.getPrototypeOf(s);
function py(s, u, p) {
  return function(..._) {
    const b = this.__v_raw, O = /* @__PURE__ */ Xe(b), h = an(O), w = s === "entries" || s === Symbol.iterator && h, a = s === "keys" && h, f = b[s](..._), y = p ? Ia : u ? cn : Mt;
    return !u && jt(
      O,
      "iterate",
      a ? Ra : Nn
    ), xt(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: m, done: v } = f.next();
          return v ? { value: m, done: v } : {
            value: w ? [y(m[0]), y(m[1])] : y(m),
            done: v
          };
        }
      }
    );
  };
}
function Ao(s) {
  return function(...u) {
    return s === "delete" ? !1 : s === "clear" ? void 0 : this;
  };
}
function fy(s, u) {
  const p = {
    get(b) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), w = /* @__PURE__ */ Xe(b);
      s || (br(b, w) && jt(h, "get", b), jt(h, "get", w));
      const { has: a } = Lo(h), f = u ? Ia : s ? cn : Mt;
      if (a.call(h, b))
        return f(O.get(b));
      if (a.call(h, w))
        return f(O.get(w));
      O !== h && O.get(b);
    },
    get size() {
      const b = this.__v_raw;
      return !s && jt(/* @__PURE__ */ Xe(b), "iterate", Nn), b.size;
    },
    has(b) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), w = /* @__PURE__ */ Xe(b);
      return s || (br(b, w) && jt(h, "has", b), jt(h, "has", w)), b === w ? O.has(b) : O.has(b) || O.has(w);
    },
    forEach(b, O) {
      const h = this, w = h.__v_raw, a = /* @__PURE__ */ Xe(w), f = u ? Ia : s ? cn : Mt;
      return !s && jt(a, "iterate", Nn), w.forEach((y, m) => b.call(O, f(y), f(m), h));
    }
  };
  return xt(
    p,
    s ? {
      add: Ao("add"),
      set: Ao("set"),
      delete: Ao("delete"),
      clear: Ao("clear")
    } : {
      add(b) {
        const O = /* @__PURE__ */ Xe(this), h = Lo(O), w = /* @__PURE__ */ Xe(b), a = !u && !/* @__PURE__ */ Ft(b) && !/* @__PURE__ */ _r(b) ? w : b;
        return h.has.call(O, a) || br(b, a) && h.has.call(O, b) || br(w, a) && h.has.call(O, w) || (O.add(a), Ar(O, "add", a, a)), this;
      },
      set(b, O) {
        !u && !/* @__PURE__ */ Ft(O) && !/* @__PURE__ */ _r(O) && (O = /* @__PURE__ */ Xe(O));
        const h = /* @__PURE__ */ Xe(this), { has: w, get: a } = Lo(h);
        let f = w.call(h, b);
        f || (b = /* @__PURE__ */ Xe(b), f = w.call(h, b));
        const y = a.call(h, b);
        return h.set(b, O), f ? br(O, y) && Ar(h, "set", b, O) : Ar(h, "add", b, O), this;
      },
      delete(b) {
        const O = /* @__PURE__ */ Xe(this), { has: h, get: w } = Lo(O);
        let a = h.call(O, b);
        a || (b = /* @__PURE__ */ Xe(b), a = h.call(O, b)), w && w.call(O, b);
        const f = O.delete(b);
        return a && Ar(O, "delete", b, void 0), f;
      },
      clear() {
        const b = /* @__PURE__ */ Xe(this), O = b.size !== 0, h = b.clear();
        return O && Ar(
          b,
          "clear",
          void 0,
          void 0
        ), h;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((b) => {
    p[b] = py(b, s, u);
  }), p;
}
function Xa(s, u) {
  const p = fy(s, u);
  return (_, b, O) => b === "__v_isReactive" ? !s : b === "__v_isReadonly" ? s : b === "__v_raw" ? _ : Reflect.get(
    et(p, b) && b in _ ? p : _,
    b,
    O
  );
}
const yy = {
  get: /* @__PURE__ */ Xa(!1, !1)
}, my = {
  get: /* @__PURE__ */ Xa(!1, !0)
}, by = {
  get: /* @__PURE__ */ Xa(!0, !1)
};
const Au = /* @__PURE__ */ new WeakMap(), Ru = /* @__PURE__ */ new WeakMap(), Iu = /* @__PURE__ */ new WeakMap(), vy = /* @__PURE__ */ new WeakMap();
function gy(s) {
  switch (s) {
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
function el(s) {
  return /* @__PURE__ */ _r(s) ? s : tl(
    s,
    !1,
    uy,
    yy,
    Au
  );
}
// @__NO_SIDE_EFFECTS__
function _y(s) {
  return tl(
    s,
    !1,
    hy,
    my,
    Ru
  );
}
// @__NO_SIDE_EFFECTS__
function Ba(s) {
  return tl(
    s,
    !0,
    dy,
    by,
    Iu
  );
}
function tl(s, u, p, _, b) {
  if (!rt(s) || s.__v_raw && !(u && s.__v_isReactive) || s.__v_skip || !Object.isExtensible(s))
    return s;
  const O = b.get(s);
  if (O)
    return O;
  const h = gy(Uf(s));
  if (h === 0)
    return s;
  const w = new Proxy(
    s,
    h === 2 ? _ : p
  );
  return b.set(s, w), w;
}
// @__NO_SIDE_EFFECTS__
function ln(s) {
  return /* @__PURE__ */ _r(s) ? /* @__PURE__ */ ln(s.__v_raw) : !!(s && s.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _r(s) {
  return !!(s && s.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ft(s) {
  return !!(s && s.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function rl(s) {
  return s ? !!s.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Xe(s) {
  const u = s && s.__v_raw;
  return u ? /* @__PURE__ */ Xe(u) : s;
}
function wy(s) {
  return !et(s, "__v_skip") && Object.isExtensible(s) && bu(s, "__v_skip", !0), s;
}
const Mt = (s) => rt(s) ? /* @__PURE__ */ el(s) : s, cn = (s) => rt(s) ? /* @__PURE__ */ Ba(s) : s;
// @__NO_SIDE_EFFECTS__
function kt(s) {
  return s ? s.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ln(s) {
  return jy(s, !1);
}
function jy(s, u) {
  return /* @__PURE__ */ kt(s) ? s : new ky(s, u);
}
class ky {
  constructor(u, p) {
    this.dep = new Qa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = p ? u : /* @__PURE__ */ Xe(u), this._value = p ? u : Mt(u), this.__v_isShallow = p;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(u) {
    const p = this._rawValue, _ = this.__v_isShallow || /* @__PURE__ */ Ft(u) || /* @__PURE__ */ _r(u);
    u = _ ? u : /* @__PURE__ */ Xe(u), br(u, p) && (this._rawValue = u, this._value = _ ? u : Mt(u), this.dep.trigger());
  }
}
function xy(s) {
  return /* @__PURE__ */ kt(s) ? s.value : s;
}
const Oy = {
  get: (s, u, p) => u === "__v_raw" ? s : xy(Reflect.get(s, u, p)),
  set: (s, u, p, _) => {
    const b = s[u];
    return /* @__PURE__ */ kt(b) && !/* @__PURE__ */ kt(p) ? (b.value = p, !0) : Reflect.set(s, u, p, _);
  }
};
function Bu(s) {
  return /* @__PURE__ */ ln(s) ? s : new Proxy(s, Oy);
}
class Cy {
  constructor(u, p, _) {
    this.fn = u, this.setter = p, this._value = void 0, this.dep = new Qa(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = oo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !p, this.isSSR = _;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    lt !== this)
      return ku(this, !0), !0;
  }
  get value() {
    const u = this.dep.track();
    return Cu(this), u && (u.version = this.dep.version), this._value;
  }
  set value(u) {
    this.setter && this.setter(u);
  }
}
// @__NO_SIDE_EFFECTS__
function Ey(s, u, p = !1) {
  let _, b;
  return qe(s) ? _ = s : (_ = s.get, b = s.set), new Cy(_, b, p);
}
const Ro = {}, zo = /* @__PURE__ */ new WeakMap();
let Tn;
function Sy(s, u = !1, p = Tn) {
  if (p) {
    let _ = zo.get(p);
    _ || zo.set(p, _ = []), _.push(s);
  }
}
function Py(s, u, p = at) {
  const { immediate: _, deep: b, once: O, scheduler: h, augmentJob: w, call: a } = p, f = (L) => b ? L : /* @__PURE__ */ Ft(L) || b === !1 || b === 0 ? Rr(L, 1) : Rr(L);
  let y, m, v, j, C = !1, k = !1;
  if (/* @__PURE__ */ kt(s) ? (m = () => s.value, C = /* @__PURE__ */ Ft(s)) : /* @__PURE__ */ ln(s) ? (m = () => f(s), C = !0) : Me(s) ? (k = !0, C = s.some((L) => /* @__PURE__ */ ln(L) || /* @__PURE__ */ Ft(L)), m = () => s.map((L) => {
    if (/* @__PURE__ */ kt(L))
      return L.value;
    if (/* @__PURE__ */ ln(L))
      return f(L);
    if (qe(L))
      return a ? a(L, 2) : L();
  })) : qe(s) ? u ? m = a ? () => a(s, 2) : s : m = () => {
    if (v) {
      Br();
      try {
        v();
      } finally {
        Nr();
      }
    }
    const L = Tn;
    Tn = y;
    try {
      return a ? a(s, 3, [j]) : s(j);
    } finally {
      Tn = L;
    }
  } : m = vr, u && b) {
    const L = m, M = b === !0 ? 1 / 0 : b;
    m = () => Rr(L(), M);
  }
  const E = ry(), P = () => {
    y.stop(), E && E.active && Ga(E.effects, y);
  };
  if (O && u) {
    const L = u;
    u = (...M) => {
      const H = L(...M);
      return P(), H;
    };
  }
  let T = k ? new Array(s.length).fill(Ro) : Ro;
  const I = (L) => {
    if (!(!(y.flags & 1) || !y.dirty && !L))
      if (u) {
        const M = y.run();
        if (L || b || C || (k ? M.some((H, A) => br(H, T[A])) : br(M, T))) {
          v && v();
          const H = Tn;
          Tn = y;
          try {
            const A = [
              M,
              // pass undefined as the old value when it's changed for the first time
              T === Ro ? void 0 : k && T[0] === Ro ? [] : T,
              j
            ];
            T = M, a ? a(u, 3, A) : (
              // @ts-expect-error
              u(...A)
            );
          } finally {
            Tn = H;
          }
        }
      } else
        y.run();
  };
  return w && w(I), y = new wu(m), y.scheduler = h ? () => h(I, !1) : I, j = (L) => Sy(L, !1, y), v = y.onStop = () => {
    const L = zo.get(y);
    if (L) {
      if (a)
        a(L, 4);
      else
        for (const M of L) M();
      zo.delete(y);
    }
  }, u ? _ ? I(!0) : T = y.run() : h ? h(I.bind(null, !0), !0) : y.run(), P.pause = y.pause.bind(y), P.resume = y.resume.bind(y), P.stop = P, P;
}
function Rr(s, u = 1 / 0, p) {
  if (u <= 0 || !rt(s) || s.__v_skip || (p = p || /* @__PURE__ */ new Map(), (p.get(s) || 0) >= u))
    return s;
  if (p.set(s, u), u--, /* @__PURE__ */ kt(s))
    Rr(s.value, u, p);
  else if (Me(s))
    for (let _ = 0; _ < s.length; _++)
      Rr(s[_], u, p);
  else if (Vo(s) || an(s))
    s.forEach((_) => {
      Rr(_, u, p);
    });
  else if (yu(s)) {
    for (const _ in s)
      Rr(s[_], u, p);
    for (const _ of Object.getOwnPropertySymbols(s))
      Object.prototype.propertyIsEnumerable.call(s, _) && Rr(s[_], u, p);
  }
  return s;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function po(s, u, p, _) {
  try {
    return _ ? s(..._) : s();
  } catch (b) {
    rs(b, u, p);
  }
}
function tr(s, u, p, _) {
  if (qe(s)) {
    const b = po(s, u, p, _);
    return b && pu(b) && b.catch((O) => {
      rs(O, u, p);
    }), b;
  }
  if (Me(s)) {
    const b = [];
    for (let O = 0; O < s.length; O++)
      b.push(tr(s[O], u, p, _));
    return b;
  }
}
function rs(s, u, p, _ = !0) {
  const b = u ? u.vnode : null, { errorHandler: O, throwUnhandledErrorInProduction: h } = u && u.appContext.config || at;
  if (u) {
    let w = u.parent;
    const a = u.proxy, f = `https://vuejs.org/error-reference/#runtime-${p}`;
    for (; w; ) {
      const y = w.ec;
      if (y) {
        for (let m = 0; m < y.length; m++)
          if (y[m](s, a, f) === !1)
            return;
      }
      w = w.parent;
    }
    if (O) {
      Br(), po(O, null, 10, [
        s,
        a,
        f
      ]), Nr();
      return;
    }
  }
  Ty(s, p, b, _, h);
}
function Ty(s, u, p, _ = !0, b = !1) {
  if (b)
    throw s;
  console.error(s);
}
const Tt = [];
let fr = -1;
const Li = [];
let sn = null, Pi = 0;
const Nu = /* @__PURE__ */ Promise.resolve();
let qo = null;
function Dn(s) {
  const u = qo || Nu;
  return s ? u.then(this ? s.bind(this) : s) : u;
}
function Ly(s) {
  let u = fr + 1, p = Tt.length;
  for (; u < p; ) {
    const _ = u + p >>> 1, b = Tt[_], O = ao(b);
    O < s || O === s && b.flags & 2 ? u = _ + 1 : p = _;
  }
  return u;
}
function nl(s) {
  if (!(s.flags & 1)) {
    const u = ao(s), p = Tt[Tt.length - 1];
    !p || // fast path when the job id is larger than the tail
    !(s.flags & 2) && u >= ao(p) ? Tt.push(s) : Tt.splice(Ly(u), 0, s), s.flags |= 1, Du();
  }
}
function Du() {
  qo || (qo = Nu.then(Mu));
}
function Ay(s) {
  if (!Me(s))
    sn && s.id === -1 ? sn.splice(Pi + 1, 0, s) : s.flags & 1 || (Li.push(s), s.flags |= 1);
  else
    for (let u = 0; u < s.length; u++)
      Li.push(s[u]);
  Du();
}
function Fc(s, u, p = fr + 1) {
  for (; p < Tt.length; p++) {
    const _ = Tt[p];
    if (_ && _.flags & 2) {
      if (s && _.id !== s.uid)
        continue;
      Tt.splice(p, 1), p--, _.flags & 4 && (_.flags &= -2), _(), _.flags & 4 || (_.flags &= -2);
    }
  }
}
function Fu(s) {
  if (Li.length) {
    const u = [...new Set(Li)].sort(
      (p, _) => ao(p) - ao(_)
    );
    if (Li.length = 0, sn) {
      for (let p = 0; p < u.length; p++)
        sn.push(u[p]);
      return;
    }
    for (sn = u, Pi = 0; Pi < sn.length; Pi++) {
      const p = sn[Pi];
      p.flags & 4 && (p.flags &= -2), p.flags & 8 || p(), p.flags &= -2;
    }
    sn = null, Pi = 0;
  }
}
const ao = (s) => s.id == null ? s.flags & 2 ? -1 : 1 / 0 : s.id;
function Mu(s) {
  try {
    for (fr = 0; fr < Tt.length; fr++) {
      const u = Tt[fr];
      u && !(u.flags & 8) && (u.flags & 4 && (u.flags &= -2), po(
        u,
        u.i,
        u.i ? 15 : 14
      ), u.flags & 4 || (u.flags &= -2));
    }
  } finally {
    for (; fr < Tt.length; fr++) {
      const u = Tt[fr];
      u && (u.flags &= -2);
    }
    fr = -1, Tt.length = 0, Fu(), qo = null, (Tt.length || Li.length) && Mu();
  }
}
let Dt = null, Hu = null;
function Uo(s) {
  const u = Dt;
  return Dt = s, Hu = s && s.type.__scopeId || null, u;
}
function Ry(s, u = Dt, p) {
  if (!u || s._n)
    return s;
  const _ = (...b) => {
    _._d && Yc(-1);
    const O = Uo(u), h = Fn.length;
    let w;
    try {
      w = s(...b);
    } finally {
      for (let a = Fn.length; a > h; a--) ud();
      Uo(O), _._d && Yc(1);
    }
    return w;
  };
  return _._n = !0, _._c = !0, _._d = !0, _;
}
function Iy(s, u) {
  if (Dt === null)
    return s;
  const p = as(Dt), _ = s.dirs || (s.dirs = []);
  for (let b = 0; b < u.length; b++) {
    let [O, h, w, a = at] = u[b];
    O && (qe(O) && (O = {
      mounted: O,
      updated: O
    }), O.deep && Rr(h), _.push({
      dir: O,
      instance: p,
      value: h,
      oldValue: void 0,
      arg: w,
      modifiers: a
    }));
  }
  return s;
}
function Sn(s, u, p, _) {
  const b = s.dirs, O = u && u.dirs;
  for (let h = 0; h < b.length; h++) {
    const w = b[h];
    O && (w.oldValue = O[h].value);
    let a = w.dir[_];
    a && (Br(), tr(a, p, 8, [
      s.el,
      w,
      s,
      u
    ]), Nr());
  }
}
function By(s, u) {
  if (Lt) {
    let p = Lt.provides;
    const _ = Lt.parent && Lt.parent.provides;
    _ === p && (p = Lt.provides = Object.create(_)), p[s] = u;
  }
}
function Mo(s, u, p = !1) {
  const _ = Im();
  if (_ || Ai) {
    let b = Ai ? Ai._context.provides : _ ? _.parent == null || _.ce ? _.vnode.appContext && _.vnode.appContext.provides : _.parent.provides : void 0;
    if (b && s in b)
      return b[s];
    if (arguments.length > 1)
      return p && qe(u) ? u.call(_ && _.proxy) : u;
  }
}
const Ny = /* @__PURE__ */ Symbol.for("v-scx"), Dy = () => Mo(Ny);
function to(s, u, p) {
  return Vu(s, u, p);
}
function Vu(s, u, p = at) {
  const { immediate: _, deep: b, flush: O, once: h } = p, w = xt({}, p), a = u && _ || !u && O !== "post";
  let f;
  if (uo) {
    if (O === "sync") {
      const j = Dy();
      f = j.__watcherHandles || (j.__watcherHandles = []);
    } else if (!a) {
      const j = () => {
      };
      return j.stop = vr, j.resume = vr, j.pause = vr, j;
    }
  }
  const y = Lt;
  w.call = (j, C, k) => tr(j, y, C, k);
  let m = !1;
  O === "post" ? w.scheduler = (j) => {
    Pt(j, y && y.suspense);
  } : O !== "sync" && (m = !0, w.scheduler = (j, C) => {
    C ? j() : nl(j);
  }), w.augmentJob = (j) => {
    u && (j.flags |= 4), m && (j.flags |= 2, y && (j.id = y.uid, j.i = y));
  };
  const v = Py(s, u, w);
  return uo && (f ? f.push(v) : a && v()), v;
}
function Fy(s, u, p) {
  const _ = this.proxy, b = dt(s) ? s.includes(".") ? zu(_, s) : () => _[s] : s.bind(_, _);
  let O;
  qe(u) ? O = u : (O = u.handler, p = u);
  const h = fo(this), w = Vu(b, O.bind(_), p);
  return h(), w;
}
function zu(s, u) {
  const p = u.split(".");
  return () => {
    let _ = s;
    for (let b = 0; b < p.length && _; b++)
      _ = _[p[b]];
    return _;
  };
}
const on = /* @__PURE__ */ new WeakMap(), qu = /* @__PURE__ */ Symbol("_vte"), ns = (s) => s.__isTeleport, An = (s) => s && (s.disabled || s.disabled === ""), My = (s) => s && (s.defer || s.defer === ""), Mc = (s) => typeof SVGElement < "u" && s instanceof SVGElement, Hc = (s) => typeof MathMLElement == "function" && s instanceof MathMLElement, Na = (s, u) => {
  const p = s && s.to;
  return dt(p) ? u ? u(p) : null : p;
}, Hy = {
  name: "Teleport",
  __isTeleport: !0,
  process(s, u, p, _, b, O, h, w, a, f) {
    const {
      mc: y,
      pc: m,
      pbc: v,
      o: { insert: j, querySelector: C, createText: k, createComment: E, parentNode: P }
    } = f, T = An(u.props);
    let { dynamicChildren: I } = u;
    const L = (A, B, N) => {
      A.shapeFlag & 16 && y(
        A.children,
        B,
        N,
        b,
        O,
        h,
        w,
        a
      );
    }, M = (A = u) => {
      const B = An(A.props), N = A.target = Na(A.props, C), z = Da(N, A, k, j);
      N && (h !== "svg" && Mc(N) ? h = "svg" : h !== "mathml" && Hc(N) && (h = "mathml"), b && b.isCE && (b.ce._teleportTargets || (b.ce._teleportTargets = /* @__PURE__ */ new Set())).add(N), B || (L(A, N, z), Ji(A, !1)));
    }, H = (A) => {
      const B = () => {
        if (on.get(A) === B) {
          if (on.delete(A), An(A.props)) {
            const N = P(A.el) || p;
            L(A, N, A.anchor), Ji(A, !0);
          }
          M(A);
        }
      };
      on.set(A, B), Pt(B, O);
    };
    if (s == null) {
      const A = u.el = k(""), B = u.anchor = k("");
      if (j(A, p, _), j(B, p, _), My(u.props) || O && O.pendingBranch) {
        H(u);
        return;
      }
      T && (L(u, p, B), Ji(u, !0)), M();
    } else {
      u.el = s.el;
      const A = u.anchor = s.anchor, B = on.get(s);
      if (B) {
        B.flags |= 8, on.delete(s), H(u);
        return;
      }
      u.targetStart = s.targetStart;
      const N = u.target = s.target, z = u.targetAnchor = s.targetAnchor, V = An(s.props), Z = V ? p : N, J = V ? A : z;
      if (h === "svg" || Mc(N) ? h = "svg" : (h === "mathml" || Hc(N)) && (h = "mathml"), I ? (v(
        s.dynamicChildren,
        I,
        Z,
        b,
        O,
        h,
        w
      ), ul(s, u, !0)) : a || m(
        s,
        u,
        Z,
        J,
        b,
        O,
        h,
        w,
        !1
      ), T)
        V ? u.props && s.props && u.props.to !== s.props.to && (u.props.to = s.props.to) : Io(
          u,
          p,
          A,
          f,
          1
        );
      else if ((u.props && u.props.to) !== (s.props && s.props.to)) {
        const X = Na(u.props, C);
        X && (u.target = X, Io(
          u,
          X,
          null,
          f,
          0
        ));
      } else V && Io(
        u,
        N,
        z,
        f,
        1
      );
      Ji(u, T);
    }
  },
  remove(s, u, p, { um: _, o: { remove: b } }, O) {
    const {
      shapeFlag: h,
      children: w,
      anchor: a,
      targetStart: f,
      targetAnchor: y,
      target: m,
      props: v
    } = s, j = An(v), C = O || !j, k = on.get(s);
    if (k && (k.flags |= 8, on.delete(s)), m && (b(f), b(y)), O && b(a), !k && (j || m) && h & 16)
      for (let E = 0; E < w.length; E++) {
        const P = w[E];
        _(
          P,
          u,
          p,
          C,
          !!P.dynamicChildren
        );
      }
  },
  move: Io,
  hydrate: Vy
};
function Io(s, u, p, { o: { insert: _ }, m: b }, O = 2) {
  O === 0 && _(s.targetAnchor, u, p);
  const { el: h, anchor: w, shapeFlag: a, children: f, props: y } = s, m = O === 2;
  if (m && _(h, u, p), !on.has(s) && (!m || An(y)) && a & 16)
    for (let v = 0; v < f.length; v++)
      b(
        f[v],
        u,
        p,
        2
      );
  m && _(w, u, p);
}
function Vy(s, u, p, _, b, O, {
  o: { nextSibling: h, parentNode: w, querySelector: a, insert: f, createText: y }
}, m) {
  function v(E, P) {
    let T = P;
    for (; T; ) {
      if (T && T.nodeType === 8) {
        if (T.data === "teleport start anchor")
          u.targetStart = T;
        else if (T.data === "teleport anchor") {
          u.targetAnchor = T, E._lpa = u.targetAnchor && h(u.targetAnchor);
          break;
        }
      }
      T = h(T);
    }
  }
  function j(E, P) {
    P.anchor = m(
      h(E),
      P,
      w(E),
      p,
      _,
      b,
      O
    );
  }
  const C = u.target = Na(
    u.props,
    a
  ), k = An(u.props);
  if (C) {
    const E = C._lpa || C.firstChild;
    u.shapeFlag & 16 && (k ? (j(s, u), v(C, E), u.targetAnchor || Da(
      C,
      u,
      y,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      w(s) === C ? s : null
    )) : (u.anchor = h(s), v(C, E), u.targetAnchor || Da(C, u, y, f), m(
      E && h(E),
      u,
      C,
      p,
      _,
      b,
      O
    ))), Ji(u, k);
  } else k && u.shapeFlag & 16 && (j(s, u), u.targetStart = s, u.targetAnchor = h(s));
  return u.anchor && h(u.anchor);
}
const zy = Hy;
function Ji(s, u) {
  const p = s.ctx;
  if (p && p.ut) {
    let _, b;
    for (u ? (_ = s.el, b = s.anchor) : (_ = s.targetStart, b = s.targetAnchor); _ && _ !== b; )
      _.nodeType === 1 && _.setAttribute("data-v-owner", p.uid), _ = _.nextSibling;
    p.ut();
  }
}
function Da(s, u, p, _, b = null) {
  const O = u.targetStart = p(""), h = u.targetAnchor = p("");
  return O[qu] = h, s && (_(O, s, b), _(h, s, b)), h;
}
const ka = /* @__PURE__ */ Symbol("_leaveCb");
function qy(s) {
  let u = s[0];
  if (s.length > 1) {
    for (const p of s)
      if (p.type !== Dr) {
        u = p;
        break;
      }
  }
  return u;
}
function Uu(s) {
  if (!ol(s))
    return ns(s.type) && s.children ? qy(s.children) : s;
  if (s.component)
    return s.component.subTree;
  const { shapeFlag: u, children: p } = s;
  if (p) {
    if (u & 16)
      return p[0];
    if (u & 32 && qe(p.default))
      return p.default();
  }
}
function il(s, u) {
  if (s.shapeFlag & 6 && s.component) {
    s.transition = u;
    const p = s.component.subTree;
    il(
      ns(p.type) && Uu(p) || p,
      u
    );
  } else s.shapeFlag & 128 ? (s.ssContent.transition = u.clone(s.ssContent), s.ssFallback.transition = u.clone(s.ssFallback)) : s.transition = u;
}
function $u(s) {
  s.ids = [s.ids[0] + s.ids[2]++ + "-", 0, 0];
}
function Vc(s, u) {
  let p;
  return !!((p = Object.getOwnPropertyDescriptor(s, u)) && !p.configurable);
}
const $o = /* @__PURE__ */ new WeakMap();
function ro(s, u, p, _, b = !1) {
  if (Me(s)) {
    s.forEach(
      (k, E) => ro(
        k,
        u && (Me(u) ? u[E] : u),
        p,
        _,
        b
      )
    );
    return;
  }
  if (no(_) && !b) {
    _.shapeFlag & 512 && _.type.__asyncResolved && _.component.subTree.component && ro(s, u, p, _.component.subTree);
    return;
  }
  const O = _.shapeFlag & 4 ? as(_.component) : _.el, h = b ? null : O, { i: w, r: a } = s, f = u && u.r, y = w.refs === at ? w.refs = {} : w.refs, m = w.setupState, v = /* @__PURE__ */ Xe(m), j = m === at ? hu : (k) => Vc(y, k) ? !1 : et(v, k), C = (k, E) => !(E && Vc(y, E));
  if (f != null && f !== a) {
    if (zc(u), dt(f))
      y[f] = null, j(f) && (m[f] = null);
    else if (/* @__PURE__ */ kt(f)) {
      const k = u;
      C(f, k.k) && (f.value = null), k.k && (y[k.k] = null);
    }
  }
  if (qe(a))
    po(a, w, 12, [h, y]);
  else {
    const k = dt(a), E = /* @__PURE__ */ kt(a);
    if (k || E) {
      const P = () => {
        if (s.f) {
          const T = k ? j(a) ? m[a] : y[a] : C() || !s.k ? a.value : y[s.k];
          if (b)
            Me(T) && Ga(T, O);
          else if (Me(T))
            T.includes(O) || T.push(O);
          else if (k)
            y[a] = [O], j(a) && (m[a] = y[a]);
          else {
            const I = [O];
            C(a, s.k) && (a.value = I), s.k && (y[s.k] = I);
          }
        } else k ? (y[a] = h, j(a) && (m[a] = h)) : E && (C(a, s.k) && (a.value = h), s.k && (y[s.k] = h));
      };
      if (h) {
        const T = () => {
          P(), $o.delete(s);
        };
        T.id = -1, $o.set(s, T), Pt(T, p);
      } else
        zc(s), P();
    }
  }
}
function zc(s) {
  const u = $o.get(s);
  u && (u.flags |= 8, $o.delete(s));
}
Xo().requestIdleCallback;
Xo().cancelIdleCallback;
const no = (s) => !!s.type.__asyncLoader, ol = (s) => s.type.__isKeepAlive;
function Uy(s, u) {
  Gu(s, "a", u);
}
function $y(s, u) {
  Gu(s, "da", u);
}
function Gu(s, u, p = Lt) {
  const _ = s.__wdc || (s.__wdc = () => {
    let b = p;
    for (; b; ) {
      if (b.isDeactivated)
        return;
      b = b.parent;
    }
    return s();
  });
  if (is(u, _, p), p) {
    let b = p.parent;
    for (; b && b.parent; )
      ol(b.parent.vnode) && Gy(_, u, p, b), b = b.parent;
  }
}
function Gy(s, u, p, _) {
  const b = is(
    u,
    s,
    _,
    !0
    /* prepend */
  );
  Wu(() => {
    Ga(_[u], b);
  }, p);
}
function is(s, u, p = Lt, _ = !1) {
  if (p) {
    const b = p[s] || (p[s] = []), O = u.__weh || (u.__weh = (...h) => {
      Br();
      const w = fo(p), a = tr(u, p, s, h);
      return w(), Nr(), a;
    });
    return _ ? b.unshift(O) : b.push(O), O;
  }
}
const Fr = (s) => (u, p = Lt) => {
  (!uo || s === "sp") && is(s, (..._) => u(..._), p);
}, Wy = Fr("bm"), sl = Fr("m"), Jy = Fr(
  "bu"
), Ky = Fr("u"), al = Fr(
  "bum"
), Wu = Fr("um"), Zy = Fr(
  "sp"
), Yy = Fr("rtg"), Qy = Fr("rtc");
function Xy(s, u = Lt) {
  is("ec", s, u);
}
const em = /* @__PURE__ */ Symbol.for("v-ndc");
function tm(s, u, p, _) {
  let b;
  const O = p, h = Me(s);
  if (h || dt(s)) {
    const w = h && /* @__PURE__ */ ln(s);
    let a = !1, f = !1;
    w && (a = !/* @__PURE__ */ Ft(s), f = /* @__PURE__ */ _r(s), s = ts(s)), b = new Array(s.length);
    for (let y = 0, m = s.length; y < m; y++)
      b[y] = u(
        a ? f ? cn(Mt(s[y])) : Mt(s[y]) : s[y],
        y,
        void 0,
        O
      );
  } else if (typeof s == "number") {
    b = new Array(s);
    for (let w = 0; w < s; w++)
      b[w] = u(w + 1, w, void 0, O);
  } else if (rt(s))
    if (s[Symbol.iterator])
      b = Array.from(
        s,
        (w, a) => u(w, a, void 0, O)
      );
    else {
      const w = Object.keys(s);
      b = new Array(w.length);
      for (let a = 0, f = w.length; a < f; a++) {
        const y = w[a];
        b[a] = u(s[y], y, a, O);
      }
    }
  else
    b = [];
  return b;
}
const Fa = (s) => s ? yd(s) ? as(s) : Fa(s.parent) : null, io = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xt(/* @__PURE__ */ Object.create(null), {
    $: (s) => s,
    $el: (s) => s.vnode.el,
    $data: (s) => s.data,
    $props: (s) => s.props,
    $attrs: (s) => s.attrs,
    $slots: (s) => s.slots,
    $refs: (s) => s.refs,
    $parent: (s) => Fa(s.parent),
    $root: (s) => Fa(s.root),
    $host: (s) => s.ce,
    $emit: (s) => s.emit,
    $options: (s) => Ku(s),
    $forceUpdate: (s) => s.f || (s.f = () => {
      nl(s.update);
    }),
    $nextTick: (s) => s.n || (s.n = Dn.bind(s.proxy)),
    $watch: (s) => Fy.bind(s)
  })
), xa = (s, u) => s !== at && !s.__isScriptSetup && et(s, u), rm = {
  get({ _: s }, u) {
    if (u === "__v_skip")
      return !0;
    const { ctx: p, setupState: _, data: b, props: O, accessCache: h, type: w, appContext: a } = s;
    if (u[0] !== "$") {
      const v = h[u];
      if (v !== void 0)
        switch (v) {
          case 1:
            return _[u];
          case 2:
            return b[u];
          case 4:
            return p[u];
          case 3:
            return O[u];
        }
      else {
        if (xa(_, u))
          return h[u] = 1, _[u];
        if (b !== at && et(b, u))
          return h[u] = 2, b[u];
        if (et(O, u))
          return h[u] = 3, O[u];
        if (p !== at && et(p, u))
          return h[u] = 4, p[u];
        Ma && (h[u] = 0);
      }
    }
    const f = io[u];
    let y, m;
    if (f)
      return u === "$attrs" && jt(s.attrs, "get", ""), f(s);
    if (
      // css module (injected by vue-loader)
      (y = w.__cssModules) && (y = y[u])
    )
      return y;
    if (p !== at && et(p, u))
      return h[u] = 4, p[u];
    if (
      // global properties
      m = a.config.globalProperties, et(m, u)
    )
      return m[u];
  },
  set({ _: s }, u, p) {
    const { data: _, setupState: b, ctx: O } = s;
    return xa(b, u) ? (b[u] = p, !0) : _ !== at && et(_, u) ? (_[u] = p, !0) : et(s.props, u) || u[0] === "$" && u.slice(1) in s ? !1 : (O[u] = p, !0);
  },
  has({
    _: { data: s, setupState: u, accessCache: p, ctx: _, appContext: b, props: O, type: h }
  }, w) {
    let a;
    return !!(p[w] || s !== at && w[0] !== "$" && et(s, w) || xa(u, w) || et(O, w) || et(_, w) || et(io, w) || et(b.config.globalProperties, w) || (a = h.__cssModules) && a[w]);
  },
  defineProperty(s, u, p) {
    return p.get != null ? s._.accessCache[u] = 0 : et(p, "value") && this.set(s, u, p.value, null), Reflect.defineProperty(s, u, p);
  }
};
function qc(s) {
  return Me(s) ? s.reduce(
    (u, p) => (u[p] = null, u),
    {}
  ) : s;
}
let Ma = !0;
function nm(s) {
  const u = Ku(s), p = s.proxy, _ = s.ctx;
  Ma = !1, u.beforeCreate && Uc(u.beforeCreate, s, "bc");
  const {
    // state
    data: b,
    computed: O,
    methods: h,
    watch: w,
    provide: a,
    inject: f,
    // lifecycle
    created: y,
    beforeMount: m,
    mounted: v,
    beforeUpdate: j,
    updated: C,
    activated: k,
    deactivated: E,
    beforeDestroy: P,
    beforeUnmount: T,
    destroyed: I,
    unmounted: L,
    render: M,
    renderTracked: H,
    renderTriggered: A,
    errorCaptured: B,
    serverPrefetch: N,
    // public API
    expose: z,
    inheritAttrs: V,
    // assets
    components: Z,
    directives: J,
    filters: X
  } = u;
  if (f && im(f, _, null), h)
    for (const ne in h) {
      const me = h[ne];
      qe(me) && (_[ne] = me.bind(p));
    }
  if (b) {
    const ne = b.call(p, p);
    rt(ne) && (s.data = /* @__PURE__ */ el(ne));
  }
  if (Ma = !0, O)
    for (const ne in O) {
      const me = O[ne], fe = qe(me) ? me.bind(p, p) : qe(me.get) ? me.get.bind(p, p) : vr, ke = !qe(me) && qe(me.set) ? me.set.bind(p) : vr, Ee = qa({
        get: fe,
        set: ke
      });
      Object.defineProperty(_, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (Se) => Ee.value = Se
      });
    }
  if (w)
    for (const ne in w)
      Ju(w[ne], _, p, ne);
  if (a) {
    const ne = qe(a) ? a.call(p) : a;
    Reflect.ownKeys(ne).forEach((me) => {
      By(me, ne[me]);
    });
  }
  y && Uc(y, s, "c");
  function oe(ne, me) {
    Me(me) ? me.forEach((fe) => ne(fe.bind(p))) : me && ne(me.bind(p));
  }
  if (oe(Wy, m), oe(sl, v), oe(Jy, j), oe(Ky, C), oe(Uy, k), oe($y, E), oe(Xy, B), oe(Qy, H), oe(Yy, A), oe(al, T), oe(Wu, L), oe(Zy, N), Me(z))
    if (z.length) {
      const ne = s.exposed || (s.exposed = {});
      z.forEach((me) => {
        Object.defineProperty(ne, me, {
          get: () => p[me],
          set: (fe) => p[me] = fe,
          enumerable: !0
        });
      });
    } else s.exposed || (s.exposed = {});
  M && s.render === vr && (s.render = M), V != null && (s.inheritAttrs = V), Z && (s.components = Z), J && (s.directives = J), N && $u(s);
}
function im(s, u, p = vr) {
  Me(s) && (s = Ha(s));
  for (const _ in s) {
    const b = s[_];
    let O;
    rt(b) ? "default" in b ? O = Mo(
      b.from || _,
      b.default,
      !0
    ) : O = Mo(b.from || _) : O = Mo(b), /* @__PURE__ */ kt(O) ? Object.defineProperty(u, _, {
      enumerable: !0,
      configurable: !0,
      get: () => O.value,
      set: (h) => O.value = h
    }) : u[_] = O;
  }
}
function Uc(s, u, p) {
  tr(
    Me(s) ? s.map((_) => _.bind(u.proxy)) : s.bind(u.proxy),
    u,
    p
  );
}
function Ju(s, u, p, _) {
  let b = _.includes(".") ? zu(p, _) : () => p[_];
  if (dt(s)) {
    const O = u[s];
    qe(O) && to(b, O);
  } else if (qe(s))
    to(b, s.bind(p));
  else if (rt(s))
    if (Me(s))
      s.forEach((O) => Ju(O, u, p, _));
    else {
      const O = qe(s.handler) ? s.handler.bind(p) : u[s.handler];
      qe(O) && to(b, O, s);
    }
}
function Ku(s) {
  const u = s.type, { mixins: p, extends: _ } = u, {
    mixins: b,
    optionsCache: O,
    config: { optionMergeStrategies: h }
  } = s.appContext, w = O.get(u);
  let a;
  return w ? a = w : !b.length && !p && !_ ? a = u : (a = {}, b.length && b.forEach(
    (f) => Go(a, f, h, !0)
  ), Go(a, u, h)), rt(u) && O.set(u, a), a;
}
function Go(s, u, p, _ = !1) {
  const { mixins: b, extends: O } = u;
  O && Go(s, O, p, !0), b && b.forEach(
    (h) => Go(s, h, p, !0)
  );
  for (const h in u)
    if (!(_ && h === "expose")) {
      const w = om[h] || p && p[h];
      s[h] = w ? w(s[h], u[h]) : u[h];
    }
  return s;
}
const om = {
  data: $c,
  props: Gc,
  emits: Gc,
  // objects
  methods: Ki,
  computed: Ki,
  // lifecycle
  beforeCreate: St,
  created: St,
  beforeMount: St,
  mounted: St,
  beforeUpdate: St,
  updated: St,
  beforeDestroy: St,
  beforeUnmount: St,
  destroyed: St,
  unmounted: St,
  activated: St,
  deactivated: St,
  errorCaptured: St,
  serverPrefetch: St,
  // assets
  components: Ki,
  directives: Ki,
  // watch
  watch: am,
  // provide / inject
  provide: $c,
  inject: sm
};
function $c(s, u) {
  return u ? s ? function() {
    return xt(
      qe(s) ? s.call(this, this) : s,
      qe(u) ? u.call(this, this) : u
    );
  } : u : s;
}
function sm(s, u) {
  return Ki(Ha(s), Ha(u));
}
function Ha(s) {
  if (Me(s)) {
    const u = {};
    for (let p = 0; p < s.length; p++)
      u[s[p]] = s[p];
    return u;
  }
  return s;
}
function St(s, u) {
  return s ? [...new Set([].concat(s, u))] : u;
}
function Ki(s, u) {
  return s ? xt(/* @__PURE__ */ Object.create(null), s, u) : u;
}
function Gc(s, u) {
  return s ? Me(s) && Me(u) ? [.../* @__PURE__ */ new Set([...s, ...u])] : xt(
    /* @__PURE__ */ Object.create(null),
    qc(s),
    qc(u ?? {})
  ) : u;
}
function am(s, u) {
  if (!s) return u;
  if (!u) return s;
  const p = xt(/* @__PURE__ */ Object.create(null), s);
  for (const _ in u)
    p[_] = St(s[_], u[_]);
  return p;
}
function Zu() {
  return {
    app: null,
    config: {
      isNativeTag: hu,
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
let lm = 0;
function cm(s, u) {
  return function(_, b = null) {
    qe(_) || (_ = xt({}, _)), b != null && !rt(b) && (b = null);
    const O = Zu(), h = /* @__PURE__ */ new WeakSet(), w = [];
    let a = !1;
    const f = O.app = {
      _uid: lm++,
      _component: _,
      _props: b,
      _container: null,
      _context: O,
      _instance: null,
      version: Hm,
      get config() {
        return O.config;
      },
      set config(y) {
      },
      use(y, ...m) {
        return h.has(y) || (y && qe(y.install) ? (h.add(y), y.install(f, ...m)) : qe(y) && (h.add(y), y(f, ...m))), f;
      },
      mixin(y) {
        return O.mixins.includes(y) || O.mixins.push(y), f;
      },
      component(y, m) {
        return m ? (O.components[y] = m, f) : O.components[y];
      },
      directive(y, m) {
        return m ? (O.directives[y] = m, f) : O.directives[y];
      },
      mount(y, m, v) {
        if (!a) {
          const j = f._ceVNode || Ir(_, b);
          return j.appContext = O, v === !0 ? v = "svg" : v === !1 && (v = void 0), s(j, y, v), a = !0, f._container = y, y.__vue_app__ = f, as(j.component);
        }
      },
      onUnmount(y) {
        w.push(y);
      },
      unmount() {
        a && (tr(
          w,
          f._instance,
          16
        ), s(null, f._container), delete f._container.__vue_app__);
      },
      provide(y, m) {
        return O.provides[y] = m, f;
      },
      runWithContext(y) {
        const m = Ai;
        Ai = f;
        try {
          return y();
        } finally {
          Ai = m;
        }
      }
    };
    return f;
  };
}
let Ai = null;
const um = (s, u) => u === "modelValue" || u === "model-value" ? s.modelModifiers : s[`${u}Modifiers`] || s[`${Xt(u)}Modifiers`] || s[`${Mn(u)}Modifiers`];
function dm(s, u, ...p) {
  if (s.isUnmounted) return;
  const _ = s.vnode.props || at;
  let b = p;
  const O = u.startsWith("update:"), h = O && um(_, u.slice(7));
  h && (h.trim && (b = p.map((y) => dt(y) ? y.trim() : y)), h.number && (b = b.map(Ja)));
  let w, a = _[w = va(u)] || // also try camelCase event handler (#2249)
  _[w = va(Xt(u))];
  !a && O && (a = _[w = va(Mn(u))]), a && tr(
    a,
    s,
    6,
    b
  );
  const f = _[w + "Once"];
  if (f) {
    if (!s.emitted)
      s.emitted = {};
    else if (s.emitted[w])
      return;
    s.emitted[w] = !0, tr(
      f,
      s,
      6,
      b
    );
  }
}
const hm = /* @__PURE__ */ new WeakMap();
function Yu(s, u, p = !1) {
  const _ = p ? hm : u.emitsCache, b = _.get(s);
  if (b !== void 0)
    return b;
  const O = s.emits;
  let h = {}, w = !1;
  if (!qe(s)) {
    const a = (f) => {
      const y = Yu(f, u, !0);
      y && (w = !0, xt(h, y));
    };
    !p && u.mixins.length && u.mixins.forEach(a), s.extends && a(s.extends), s.mixins && s.mixins.forEach(a);
  }
  return !O && !w ? (rt(s) && _.set(s, null), null) : (Me(O) ? O.forEach((a) => h[a] = null) : xt(h, O), rt(s) && _.set(s, h), h);
}
function os(s, u) {
  return !s || !Zo(u) ? !1 : (u = u.slice(2), u = u === "Once" ? u : u.replace(/Once$/, ""), et(s, u[0].toLowerCase() + u.slice(1)) || et(s, Mn(u)) || et(s, u));
}
function Wc(s) {
  const {
    type: u,
    vnode: p,
    proxy: _,
    withProxy: b,
    propsOptions: [O],
    slots: h,
    attrs: w,
    emit: a,
    render: f,
    renderCache: y,
    props: m,
    data: v,
    setupState: j,
    ctx: C,
    inheritAttrs: k
  } = s, E = Uo(s);
  let P, T;
  try {
    if (p.shapeFlag & 4) {
      const L = b || _, M = L;
      P = mr(
        f.call(
          M,
          L,
          y,
          m,
          j,
          v,
          C
        )
      ), T = w;
    } else {
      const L = u;
      P = mr(
        L.length > 1 ? L(
          m,
          { attrs: w, slots: h, emit: a }
        ) : L(
          m,
          null
        )
      ), T = u.props ? w : pm(w);
    }
  } catch (L) {
    Fn.length = 0, rs(L, s, 1), P = Ir(Dr);
  }
  let I = P;
  if (T && k !== !1) {
    const L = Object.keys(T), { shapeFlag: M } = I;
    L.length && M & 7 && (O && L.some(Yo) && (T = fm(
      T,
      O
    )), I = Ri(I, T, !1, !0));
  }
  if (p.dirs && (I = Ri(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(p.dirs) : p.dirs), p.transition) {
    const L = ns(I.type) && Uu(I) || I;
    il(L, p.transition);
  }
  return P = I, Uo(E), P;
}
const pm = (s) => {
  let u;
  for (const p in s)
    (p === "class" || p === "style" || Zo(p)) && ((u || (u = {}))[p] = s[p]);
  return u;
}, fm = (s, u) => {
  const p = {};
  for (const _ in s)
    (!Yo(_) || !(_.slice(9) in u)) && (p[_] = s[_]);
  return p;
};
function ym(s, u, p) {
  const { props: _, children: b, component: O } = s, { props: h, children: w, patchFlag: a } = u, f = O.emitsOptions;
  if (u.dirs || u.transition)
    return !0;
  if (p && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return _ ? Jc(_, h, f) : !!h;
    if (a & 8) {
      const y = u.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        const v = y[m];
        if (Qu(h, _, v) && !os(f, v))
          return !0;
      }
    }
  } else
    return (b || w) && (!w || !w.$stable) ? !0 : _ === h ? !1 : _ ? h ? Jc(_, h, f) : !0 : !!h;
  return !1;
}
function Jc(s, u, p) {
  const _ = Object.keys(u);
  if (_.length !== Object.keys(s).length)
    return !0;
  for (let b = 0; b < _.length; b++) {
    const O = _[b];
    if (Qu(u, s, O) && !os(p, O))
      return !0;
  }
  return !1;
}
function Qu(s, u, p) {
  const _ = s[p], b = u[p];
  return p === "style" && rt(_) && rt(b) ? !es(_, b) : _ !== b;
}
function mm({ vnode: s, parent: u, suspense: p }, _) {
  for (; u; ) {
    const b = u.subTree;
    if (b.suspense && b.suspense.activeBranch === s && (b.suspense.vnode.el = b.el = _, s = b), b === s)
      (s = u.vnode).el = _, u = u.parent;
    else
      break;
  }
  p && p.activeBranch === s && (p.vnode.el = _);
}
const Xu = {}, ed = () => Object.create(Xu), td = (s) => Object.getPrototypeOf(s) === Xu;
function bm(s, u, p, _ = !1) {
  const b = {}, O = ed();
  s.propsDefaults = /* @__PURE__ */ Object.create(null), rd(s, u, b, O);
  for (const h in s.propsOptions[0])
    h in b || (b[h] = void 0);
  p ? s.props = _ ? b : /* @__PURE__ */ _y(b) : s.type.props ? s.props = b : s.props = O, s.attrs = O;
}
function vm(s, u, p, _) {
  const {
    props: b,
    attrs: O,
    vnode: { patchFlag: h }
  } = s, w = /* @__PURE__ */ Xe(b), [a] = s.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (_ || h > 0) && !(h & 16)
  ) {
    if (h & 8) {
      const y = s.vnode.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        let v = y[m];
        if (os(s.emitsOptions, v))
          continue;
        const j = u[v];
        if (a)
          if (et(O, v))
            j !== O[v] && (O[v] = j, f = !0);
          else {
            const C = Xt(v);
            b[C] = Va(
              a,
              w,
              C,
              j,
              s,
              !1
            );
          }
        else
          j !== O[v] && (O[v] = j, f = !0);
      }
    }
  } else {
    rd(s, u, b, O) && (f = !0);
    let y;
    for (const m in w)
      (!u || // for camelCase
      !et(u, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = Mn(m)) === m || !et(u, y))) && (a ? p && // for camelCase
      (p[m] !== void 0 || // for kebab-case
      p[y] !== void 0) && (b[m] = Va(
        a,
        w,
        m,
        void 0,
        s,
        !0
      )) : delete b[m]);
    if (O !== w)
      for (const m in O)
        (!u || !et(u, m)) && (delete O[m], f = !0);
  }
  f && Ar(s.attrs, "set", "");
}
function rd(s, u, p, _) {
  const [b, O] = s.propsOptions;
  let h = !1, w;
  if (u)
    for (let a in u) {
      if (Yi(a))
        continue;
      const f = u[a];
      let y;
      b && et(b, y = Xt(a)) ? !O || !O.includes(y) ? p[y] = f : (w || (w = {}))[y] = f : os(s.emitsOptions, a) || (!(a in _) || f !== _[a]) && (_[a] = f, h = !0);
    }
  if (O) {
    const a = /* @__PURE__ */ Xe(p), f = w || at;
    for (let y = 0; y < O.length; y++) {
      const m = O[y];
      p[m] = Va(
        b,
        a,
        m,
        f[m],
        s,
        !et(f, m)
      );
    }
  }
  return h;
}
function Va(s, u, p, _, b, O) {
  const h = s[p];
  if (h != null) {
    const w = et(h, "default");
    if (w && _ === void 0) {
      const a = h.default;
      if (h.type !== Function && !h.skipFactory && qe(a)) {
        const { propsDefaults: f } = b;
        if (p in f)
          _ = f[p];
        else {
          const y = fo(b);
          _ = f[p] = a.call(
            null,
            u
          ), y();
        }
      } else
        _ = a;
      b.ce && b.ce._setProp(p, _);
    }
    h[
      0
      /* shouldCast */
    ] && (O && !w ? _ = !1 : h[
      1
      /* shouldCastTrue */
    ] && (_ === "" || _ === Mn(p)) && (_ = !0));
  }
  return _;
}
const gm = /* @__PURE__ */ new WeakMap();
function nd(s, u, p = !1) {
  const _ = p ? gm : u.propsCache, b = _.get(s);
  if (b)
    return b;
  const O = s.props, h = {}, w = [];
  let a = !1;
  if (!qe(s)) {
    const y = (m) => {
      a = !0;
      const [v, j] = nd(m, u, !0);
      xt(h, v), j && w.push(...j);
    };
    !p && u.mixins.length && u.mixins.forEach(y), s.extends && y(s.extends), s.mixins && s.mixins.forEach(y);
  }
  if (!O && !a)
    return rt(s) && _.set(s, Rn), Rn;
  if (Me(O))
    for (let y = 0; y < O.length; y++) {
      const m = Xt(O[y]);
      Kc(m) && (h[m] = at);
    }
  else if (O)
    for (const y in O) {
      const m = Xt(y);
      if (Kc(m)) {
        const v = O[y], j = h[m] = Me(v) || qe(v) ? { type: v } : xt({}, v), C = j.type;
        let k = !1, E = !0;
        if (Me(C))
          for (let P = 0; P < C.length; ++P) {
            const T = C[P], I = qe(T) && T.name;
            if (I === "Boolean") {
              k = !0;
              break;
            } else I === "String" && (E = !1);
          }
        else
          k = qe(C) && C.name === "Boolean";
        j[
          0
          /* shouldCast */
        ] = k, j[
          1
          /* shouldCastTrue */
        ] = E, (k || et(j, "default")) && w.push(m);
      }
    }
  const f = [h, w];
  return rt(s) && _.set(s, f), f;
}
function Kc(s) {
  return s[0] !== "$" && !Yi(s);
}
const ll = (s) => s === "_" || s === "_ctx" || s === "$stable", cl = (s) => Me(s) ? s.map(mr) : [mr(s)], _m = (s, u, p) => {
  if (u._n)
    return u;
  const _ = Ry((...b) => cl(u(...b)), p);
  return _._c = !1, _;
}, id = (s, u, p) => {
  const _ = s._ctx;
  for (const b in s) {
    if (ll(b)) continue;
    const O = s[b];
    if (qe(O))
      u[b] = _m(b, O, _);
    else if (O != null) {
      const h = cl(O);
      u[b] = () => h;
    }
  }
}, od = (s, u) => {
  const p = cl(u);
  s.slots.default = () => p;
}, sd = (s, u, p) => {
  for (const _ in u)
    (p || !ll(_)) && (s[_] = u[_]);
}, wm = (s, u, p) => {
  const _ = s.slots = ed();
  if (s.vnode.shapeFlag & 32) {
    const b = u._;
    b ? (sd(_, u, p), p && bu(_, "_", b, !0)) : id(u, _);
  } else u && od(s, u);
}, jm = (s, u, p) => {
  const { vnode: _, slots: b } = s;
  let O = !0, h = at;
  if (_.shapeFlag & 32) {
    const w = u._;
    w ? p && w === 1 ? O = !1 : sd(b, u, p) : (O = !u.$stable, id(u, b)), h = u;
  } else u && (od(s, u), h = { default: 1 });
  if (O)
    for (const w in b)
      !ll(w) && h[w] == null && delete b[w];
}, Pt = Em;
function km(s) {
  return xm(s);
}
function xm(s, u) {
  const p = Xo();
  p.__VUE__ = !0;
  const {
    insert: _,
    remove: b,
    patchProp: O,
    createElement: h,
    createText: w,
    createComment: a,
    setText: f,
    setElementText: y,
    parentNode: m,
    nextSibling: v,
    setScopeId: j = vr,
    insertStaticContent: C
  } = s, k = (R, F, W, Y = null, Q = null, ee = null, de = void 0, he = null, le = !!F.dynamicChildren) => {
    if (R === F)
      return;
    R && !Wi(R, F) && (Y = Ye(R), Se(R, Q, ee, !0), R = null), F.patchFlag === -2 && (le = !1, F.dynamicChildren = null), F.dynamicChildren && R && R.dynamicChildren && R.dynamicChildren.hasOnce && (F.dynamicChildren === Rn && (F.dynamicChildren = []), F.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: je, shapeFlag: be } = F;
    switch (ie) {
      case ss:
        E(R, F, W, Y);
        break;
      case Dr:
        P(R, F, W, Y);
        break;
      case Ca:
        R == null && T(F, W, Y, de);
        break;
      case Nt:
        Z(
          R,
          F,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le
        );
        break;
      default:
        be & 1 ? M(
          R,
          F,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le
        ) : be & 6 ? J(
          R,
          F,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le
        ) : (be & 64 || be & 128) && ie.process(
          R,
          F,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le,
          Te
        );
    }
    je != null && Q ? ro(je, R && R.ref, ee, F || R, !F) : je == null && R && R.ref != null && ro(R.ref, null, ee, R, !0);
  }, E = (R, F, W, Y) => {
    if (R == null)
      _(
        F.el = w(F.children),
        W,
        Y
      );
    else {
      const Q = F.el = R.el;
      F.children !== R.children && f(Q, F.children);
    }
  }, P = (R, F, W, Y) => {
    R == null ? _(
      F.el = a(F.children || ""),
      W,
      Y
    ) : F.el = R.el;
  }, T = (R, F, W, Y) => {
    [R.el, R.anchor] = C(
      R.children,
      F,
      W,
      Y,
      R.el,
      R.anchor
    );
  }, I = ({ el: R, anchor: F }, W, Y) => {
    let Q;
    for (; R && R !== F; )
      Q = v(R), _(R, W, Y), R = Q;
    _(F, W, Y);
  }, L = ({ el: R, anchor: F }) => {
    let W;
    for (; R && R !== F; )
      W = v(R), b(R), R = W;
    b(F);
  }, M = (R, F, W, Y, Q, ee, de, he, le) => {
    if (F.type === "svg" ? de = "svg" : F.type === "math" && (de = "mathml"), R == null)
      H(
        F,
        W,
        Y,
        Q,
        ee,
        de,
        he,
        le
      );
    else {
      const ie = R.el && R.el._isVueCE ? R.el : null;
      try {
        ie && ie._beginPatch(), N(
          R,
          F,
          Q,
          ee,
          de,
          he,
          le
        );
      } finally {
        ie && ie._endPatch();
      }
    }
  }, H = (R, F, W, Y, Q, ee, de, he) => {
    let le, ie;
    const { props: je, shapeFlag: be, transition: Ce, dirs: re } = R;
    if (le = R.el = h(
      R.type,
      ee,
      je && je.is,
      je
    ), be & 8 ? y(le, R.children) : be & 16 && B(
      R.children,
      le,
      null,
      Y,
      Q,
      Oa(R, ee),
      de,
      he
    ), re && Sn(R, null, Y, "created"), A(le, R, R.scopeId, de, Y), je) {
      for (const ue in je)
        ue !== "value" && !Yi(ue) && O(le, ue, null, je[ue], ee, Y);
      "value" in je && O(le, "value", null, je.value, ee), (ie = je.onVnodeBeforeMount) && pr(ie, Y, R);
    }
    re && Sn(R, null, Y, "beforeMount");
    const ae = Om(Q, Ce);
    ae && Ce.beforeEnter(le), _(le, F, W), ((ie = je && je.onVnodeMounted) || ae || re) && Pt(() => {
      try {
        ie && pr(ie, Y, R), ae && Ce.enter(le), re && Sn(R, null, Y, "mounted");
      } finally {
      }
    }, Q);
  }, A = (R, F, W, Y, Q) => {
    if (W && j(R, W), Y)
      for (let ee = 0; ee < Y.length; ee++)
        j(R, Y[ee]);
    if (Q) {
      let ee = Q.subTree;
      if (F === ee || cd(ee.type) && (ee.ssContent === F || ee.ssFallback === F)) {
        const de = Q.vnode;
        A(
          R,
          de,
          de.scopeId,
          de.slotScopeIds,
          Q.parent
        );
      }
    }
  }, B = (R, F, W, Y, Q, ee, de, he, le = 0) => {
    for (let ie = le; ie < R.length; ie++) {
      const je = R[ie] = he ? Lr(R[ie]) : mr(R[ie]);
      k(
        null,
        je,
        F,
        W,
        Y,
        Q,
        ee,
        de,
        he
      );
    }
  }, N = (R, F, W, Y, Q, ee, de) => {
    const he = F.el = R.el;
    let { patchFlag: le, dynamicChildren: ie, dirs: je } = F;
    le |= R.patchFlag & 16;
    const be = R.props || at, Ce = F.props || at;
    let re;
    if (W && Pn(W, !1), (re = Ce.onVnodeBeforeUpdate) && pr(re, W, F, R), je && Sn(F, R, W, "beforeUpdate"), W && Pn(W, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!R.dynamicChildren || R.dynamicChildren.length !== ie.length) && (le = 0, de = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && y(he, ""), ie ? z(
      R.dynamicChildren,
      ie,
      he,
      W,
      Y,
      Oa(F, Q),
      ee
    ) : de || me(
      R,
      F,
      he,
      null,
      W,
      Y,
      Oa(F, Q),
      ee,
      !1
    ), le > 0) {
      if (le & 16)
        V(he, be, Ce, W, Q);
      else if (le & 2 && be.class !== Ce.class && O(he, "class", null, Ce.class, Q), le & 4 && O(he, "style", be.style, Ce.style, Q), le & 8) {
        const ae = F.dynamicProps;
        for (let ue = 0; ue < ae.length; ue++) {
          const Oe = ae[ue], Ae = be[Oe], ze = Ce[Oe];
          (ze !== Ae || Oe === "value") && O(he, Oe, Ae, ze, Q, W);
        }
      }
      le & 1 && R.children !== F.children && y(he, F.children);
    } else !de && ie == null && V(he, be, Ce, W, Q);
    ((re = Ce.onVnodeUpdated) || je) && Pt(() => {
      re && pr(re, W, F, R), je && Sn(F, R, W, "updated");
    }, Y);
  }, z = (R, F, W, Y, Q, ee, de) => {
    for (let he = 0; he < F.length; he++) {
      const le = R[he], ie = F[he], je = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === Nt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wi(le, ie) || // - In the case of a component, it could contain anything.
        le.shapeFlag & 198) ? m(le.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      k(
        le,
        ie,
        je,
        null,
        Y,
        Q,
        ee,
        de,
        !0
      );
    }
  }, V = (R, F, W, Y, Q) => {
    if (F !== W) {
      if (F !== at)
        for (const ee in F)
          !Yi(ee) && !(ee in W) && O(
            R,
            ee,
            F[ee],
            null,
            Q,
            Y
          );
      for (const ee in W) {
        if (Yi(ee)) continue;
        const de = W[ee], he = F[ee];
        de !== he && ee !== "value" && O(R, ee, he, de, Q, Y);
      }
      "value" in W && O(R, "value", F.value, W.value, Q);
    }
  }, Z = (R, F, W, Y, Q, ee, de, he, le) => {
    const ie = F.el = R ? R.el : w(""), je = F.anchor = R ? R.anchor : w("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: re } = F;
    re && (he = he ? he.concat(re) : re), R == null ? (_(ie, W, Y), _(je, W, Y), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      F.children || [],
      W,
      je,
      Q,
      ee,
      de,
      he,
      le
    )) : be > 0 && be & 64 && Ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    R.dynamicChildren && R.dynamicChildren.length === Ce.length ? (z(
      R.dynamicChildren,
      Ce,
      W,
      Q,
      ee,
      de,
      he
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (F.key != null || Q && F === Q.subTree) && ul(
      R,
      F,
      !0
      /* shallow */
    )) : me(
      R,
      F,
      W,
      je,
      Q,
      ee,
      de,
      he,
      le
    );
  }, J = (R, F, W, Y, Q, ee, de, he, le) => {
    F.slotScopeIds = he, R == null ? F.shapeFlag & 512 ? Q.ctx.activate(
      F,
      W,
      Y,
      de,
      le
    ) : X(
      F,
      W,
      Y,
      Q,
      ee,
      de,
      le
    ) : ce(R, F, le);
  }, X = (R, F, W, Y, Q, ee, de) => {
    const he = R.component = Rm(
      R,
      Y,
      Q
    );
    if (ol(R) && (he.ctx.renderer = Te), Bm(he, !1, de), he.asyncDep) {
      if (Q && Q.registerDep(he, oe, de), !R.el) {
        const le = he.subTree = Ir(Dr);
        P(null, le, F, W), R.placeholder = le.el;
      }
    } else
      oe(
        he,
        R,
        F,
        W,
        Q,
        ee,
        de
      );
  }, ce = (R, F, W) => {
    const Y = F.component = R.component;
    if (ym(R, F, W))
      if (Y.asyncDep && !Y.asyncResolved) {
        F.el = R.el, ne(Y, F, W);
        return;
      } else
        Y.next = F, Y.update();
    else
      F.el = R.el, Y.vnode = F;
  }, oe = (R, F, W, Y, Q, ee, de) => {
    const he = () => {
      if (R.isMounted) {
        let { next: be, bu: Ce, u: re, parent: ae, vnode: ue } = R;
        {
          const ut = ad(R);
          if (ut) {
            be && (be.el = ue.el, ne(R, be, de)), ut.asyncDep.then(() => {
              Pt(() => {
                R.isUnmounted || ie();
              }, Q);
            });
            return;
          }
        }
        let Oe = be, Ae;
        Pn(R, !1), be ? (be.el = ue.el, ne(R, be, de)) : be = ue, Ce && Fo(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && pr(Ae, ae, be, ue), Pn(R, !0);
        const ze = Wc(R), nt = R.subTree;
        R.subTree = ze, k(
          nt,
          ze,
          // parent may have changed if it's in a teleport
          m(nt.el),
          // anchor may have changed if it's in a fragment
          Ye(nt),
          R,
          Q,
          ee
        ), be.el = ze.el, Oe === null && mm(R, ze.el), re && Pt(re, Q), (Ae = be.props && be.props.onVnodeUpdated) && Pt(
          () => pr(Ae, ae, be, ue),
          Q
        );
      } else {
        let be;
        const { el: Ce, props: re } = F, { bm: ae, m: ue, parent: Oe, root: Ae, type: ze } = R, nt = no(F);
        Pn(R, !1), ae && Fo(ae), !nt && (be = re && re.onVnodeBeforeMount) && pr(be, Oe, F), Pn(R, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(
            ze,
            R.parent ? R.parent.type : void 0
          );
          const ut = R.subTree = Wc(R);
          k(
            null,
            ut,
            W,
            Y,
            R,
            Q,
            ee
          ), F.el = ut.el;
        }
        if (ue && Pt(ue, Q), !nt && (be = re && re.onVnodeMounted)) {
          const ut = F;
          Pt(
            () => pr(be, Oe, ut),
            Q
          );
        }
        (F.shapeFlag & 256 || Oe && no(Oe.vnode) && Oe.vnode.shapeFlag & 256) && R.a && Pt(R.a, Q), R.isMounted = !0, F = W = Y = null;
      }
    };
    R.scope.on();
    const le = R.effect = new wu(he);
    R.scope.off();
    const ie = R.update = le.run.bind(le), je = R.job = le.runIfDirty.bind(le);
    je.i = R, je.id = R.uid, le.scheduler = () => nl(je), Pn(R, !0), ie();
  }, ne = (R, F, W) => {
    F.component = R;
    const Y = R.vnode.props;
    R.vnode = F, R.next = null, vm(R, F.props, Y, W), jm(R, F.children, W), Br(), Fc(R), Nr();
  }, me = (R, F, W, Y, Q, ee, de, he, le = !1) => {
    const ie = R && R.children, je = R ? R.shapeFlag : 0, be = F.children, { patchFlag: Ce, shapeFlag: re } = F;
    if (Ce > 0) {
      if (Ce & 128) {
        ke(
          ie,
          be,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le
        );
        return;
      } else if (Ce & 256) {
        fe(
          ie,
          be,
          W,
          Y,
          Q,
          ee,
          de,
          he,
          le
        );
        return;
      }
    }
    re & 8 ? (je & 16 && Fe(ie, Q, ee), be !== ie && y(W, be)) : je & 16 ? re & 16 ? ke(
      ie,
      be,
      W,
      Y,
      Q,
      ee,
      de,
      he,
      le
    ) : Fe(ie, Q, ee, !0) : (je & 8 && y(W, ""), re & 16 && B(
      be,
      W,
      Y,
      Q,
      ee,
      de,
      he,
      le
    ));
  }, fe = (R, F, W, Y, Q, ee, de, he, le) => {
    R = R || Rn, F = F || Rn;
    const ie = R.length, je = F.length, be = Math.min(ie, je);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const re = F[Ce] = le ? Lr(F[Ce]) : mr(F[Ce]);
      k(
        R[Ce],
        re,
        W,
        null,
        Q,
        ee,
        de,
        he,
        le
      );
    }
    ie > je ? Fe(
      R,
      Q,
      ee,
      !0,
      !1,
      be
    ) : B(
      F,
      W,
      Y,
      Q,
      ee,
      de,
      he,
      le,
      be
    );
  }, ke = (R, F, W, Y, Q, ee, de, he, le) => {
    let ie = 0;
    const je = F.length;
    let be = R.length - 1, Ce = je - 1;
    for (; ie <= be && ie <= Ce; ) {
      const re = R[ie], ae = F[ie] = le ? Lr(F[ie]) : mr(F[ie]);
      if (Wi(re, ae))
        k(
          re,
          ae,
          W,
          null,
          Q,
          ee,
          de,
          he,
          le
        );
      else
        break;
      ie++;
    }
    for (; ie <= be && ie <= Ce; ) {
      const re = R[be], ae = F[Ce] = le ? Lr(F[Ce]) : mr(F[Ce]);
      if (Wi(re, ae))
        k(
          re,
          ae,
          W,
          null,
          Q,
          ee,
          de,
          he,
          le
        );
      else
        break;
      be--, Ce--;
    }
    if (ie > be) {
      if (ie <= Ce) {
        const re = Ce + 1, ae = re < je ? F[re].el : Y;
        for (; ie <= Ce; )
          k(
            null,
            F[ie] = le ? Lr(F[ie]) : mr(F[ie]),
            W,
            ae,
            Q,
            ee,
            de,
            he,
            le
          ), ie++;
      }
    } else if (ie > Ce)
      for (; ie <= be; )
        Se(R[ie], Q, ee, !0), ie++;
    else {
      const re = ie, ae = ie, ue = /* @__PURE__ */ new Map();
      for (ie = ae; ie <= Ce; ie++) {
        const Je = F[ie] = le ? Lr(F[ie]) : mr(F[ie]);
        Je.key != null && ue.set(Je.key, ie);
      }
      let Oe, Ae = 0;
      const ze = Ce - ae + 1;
      let nt = !1, ut = 0;
      const ft = new Array(ze);
      for (ie = 0; ie < ze; ie++) ft[ie] = 0;
      for (ie = re; ie <= be; ie++) {
        const Je = R[ie];
        if (Ae >= ze) {
          Se(Je, Q, ee, !0);
          continue;
        }
        let Ze;
        if (Je.key != null)
          Ze = ue.get(Je.key);
        else
          for (Oe = ae; Oe <= Ce; Oe++)
            if (ft[Oe - ae] === 0 && Wi(Je, F[Oe])) {
              Ze = Oe;
              break;
            }
        Ze === void 0 ? Se(Je, Q, ee, !0) : (ft[Ze - ae] = ie + 1, Ze >= ut ? ut = Ze : nt = !0, k(
          Je,
          F[Ze],
          W,
          null,
          Q,
          ee,
          de,
          he,
          le
        ), Ae++);
      }
      const yt = nt ? Cm(ft) : Rn;
      for (Oe = yt.length - 1, ie = ze - 1; ie >= 0; ie--) {
        const Je = ae + ie, Ze = F[Je], wr = F[Je + 1], un = Je + 1 < je ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          wr.el || ld(wr)
        ) : Y;
        ft[ie] === 0 ? k(
          null,
          Ze,
          W,
          un,
          Q,
          ee,
          de,
          he,
          le
        ) : nt && (Oe < 0 || ie !== yt[Oe] ? Ee(Ze, W, un, 2) : Oe--);
      }
    }
  }, Ee = (R, F, W, Y, Q = null) => {
    const { el: ee, type: de, transition: he, children: le, shapeFlag: ie } = R;
    if (ie & 6) {
      Ee(R.component.subTree, F, W, Y);
      return;
    }
    if (ie & 128) {
      R.suspense.move(F, W, Y);
      return;
    }
    if (ie & 64) {
      de.move(R, F, W, Te);
      return;
    }
    if (de === Nt) {
      _(ee, F, W);
      for (let be = 0; be < le.length; be++)
        Ee(le[be], F, W, Y);
      _(R.anchor, F, W);
      return;
    }
    if (de === Ca) {
      I(R, F, W);
      return;
    }
    if (Y !== 2 && ie & 1 && he)
      if (Y === 0)
        he.persisted && !ee[ka] ? _(ee, F, W) : (he.beforeEnter(ee), _(ee, F, W), Pt(() => he.enter(ee), Q));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: re } = he, ae = () => {
          R.ctx.isUnmounted ? b(ee) : _(ee, F, W);
        }, ue = () => {
          const Oe = ee._isLeaving || !!ee[ka];
          ee._isLeaving && ee[ka](
            !0
            /* cancelled */
          ), he.persisted && !Oe ? ae() : be(ee, () => {
            ae(), re && re();
          });
        };
        Ce ? Ce(ee, ae, ue) : ue();
      }
    else
      _(ee, F, W);
  }, Se = (R, F, W, Y = !1, Q = !1) => {
    const {
      type: ee,
      props: de,
      ref: he,
      children: le,
      dynamicChildren: ie,
      shapeFlag: je,
      patchFlag: be,
      dirs: Ce,
      cacheIndex: re,
      memo: ae
    } = R;
    if ((be === -2 || ie && ie.hasOnce) && (Q = !1), he != null && (Br(), ro(he, null, W, R, !0), Nr()), re != null && (!R.ctx || R.ctx === F) && (F.renderCache[re] = void 0), je & 256) {
      F.ctx.deactivate(R);
      return;
    }
    const ue = je & 1 && Ce, Oe = !no(R);
    let Ae;
    if (Oe && (Ae = de && de.onVnodeBeforeUnmount) && pr(Ae, F, R), je & 6)
      Pe(R.component, W, Y);
    else {
      if (je & 128) {
        R.suspense.unmount(W, Y);
        return;
      }
      ue && Sn(R, null, F, "beforeUnmount"), je & 64 ? R.type.remove(
        R,
        F,
        W,
        Te,
        Y
      ) : ie && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !ie.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ee !== Nt || be > 0 && be & 64) ? Fe(
        ie,
        F,
        W,
        !1,
        !0
      ) : (ee === Nt && be & 384 || !Q && je & 16) && Fe(le, F, W), Y && ye(R);
    }
    const ze = ae != null && re == null;
    (Oe && (Ae = de && de.onVnodeUnmounted) || ue || ze) && Pt(() => {
      Ae && pr(Ae, F, R), ue && Sn(R, null, F, "unmounted"), ze && (R.el = null);
    }, W);
  }, ye = (R) => {
    const { type: F, el: W, anchor: Y, transition: Q } = R;
    if (F === Nt) {
      Re(W, Y);
      return;
    }
    if (F === Ca) {
      L(R), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
      return;
    }
    const ee = () => {
      b(W), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
    };
    if (R.shapeFlag & 1 && Q && !Q.persisted) {
      const { leave: de, delayLeave: he } = Q, le = () => de(W, ee);
      he ? he(R.el, ee, le) : le();
    } else
      ee();
  }, Re = (R, F) => {
    let W;
    for (; R !== F; )
      W = v(R), b(R), R = W;
    b(F);
  }, Pe = (R, F, W) => {
    const { bum: Y, scope: Q, job: ee, subTree: de, um: he, m: le, a: ie } = R;
    Zc(le), Zc(ie), Y && Fo(Y), Q.stop(), ee ? (ee.flags |= 8, Se(de, R, F, W)) : R.vnode.el && de && (de.transition = R.vnode.transition, Se(de, R, F, W)), he && Pt(he, F), Pt(() => {
      R.isUnmounted = !0;
    }, F);
  }, Fe = (R, F, W, Y = !1, Q = !1, ee = 0) => {
    for (let de = ee; de < R.length; de++)
      Se(R[de], F, W, Y, Q);
  }, Ye = (R) => {
    if (R.shapeFlag & 6)
      return Ye(R.component.subTree);
    if (R.shapeFlag & 128)
      return R.suspense.next();
    const F = v(R.anchor || R.el), W = F && F[qu];
    return W ? v(W) : F;
  };
  let tt = !1;
  const Ve = (R, F, W) => {
    let Y;
    R == null ? F._vnode && (Se(F._vnode, null, null, !0), Y = F._vnode.component) : k(
      F._vnode || null,
      R,
      F,
      null,
      null,
      null,
      W
    ), F._vnode = R, tt || (tt = !0, Fc(Y), Fu(), tt = !1);
  }, Te = {
    p: k,
    um: Se,
    m: Ee,
    r: ye,
    mt: X,
    mc: B,
    pc: me,
    pbc: z,
    n: Ye,
    o: s
  };
  return {
    render: Ve,
    hydrate: void 0,
    createApp: cm(Ve)
  };
}
function Oa({ type: s, props: u }, p) {
  return p === "svg" && s === "foreignObject" || p === "mathml" && s === "annotation-xml" && u && u.encoding && u.encoding.includes("html") ? void 0 : p;
}
function Pn({ effect: s, job: u }, p) {
  p ? (s.flags |= 32, u.flags |= 4) : (s.flags &= -33, u.flags &= -5);
}
function Om(s, u) {
  return (!s || s && !s.pendingBranch) && u && !u.persisted;
}
function ul(s, u, p = !1) {
  const _ = s.children, b = u.children;
  if (Me(_) && Me(b))
    for (let O = 0; O < _.length; O++) {
      const h = _[O];
      let w = b[O];
      w.shapeFlag & 1 && !w.dynamicChildren && ((w.patchFlag <= 0 || w.patchFlag === 32) && (w = b[O] = Lr(b[O]), w.el = h.el), !p && w.patchFlag !== -2 && ul(h, w)), w.type === ss && (w.patchFlag === -1 && (w = b[O] = Lr(w)), w.el = h.el), w.type === Dr && !w.el && (w.el = h.el);
    }
}
function Cm(s) {
  const u = s.slice(), p = [0];
  let _, b, O, h, w;
  const a = s.length;
  for (_ = 0; _ < a; _++) {
    const f = s[_];
    if (f !== 0) {
      if (b = p[p.length - 1], s[b] < f) {
        u[_] = b, p.push(_);
        continue;
      }
      for (O = 0, h = p.length - 1; O < h; )
        w = O + h >> 1, s[p[w]] < f ? O = w + 1 : h = w;
      f < s[p[O]] && (O > 0 && (u[_] = p[O - 1]), p[O] = _);
    }
  }
  for (O = p.length, h = p[O - 1]; O-- > 0; )
    p[O] = h, h = u[h];
  return p;
}
function ad(s) {
  const u = s.subTree.component;
  if (u)
    return u.asyncDep && !u.asyncResolved ? u : ad(u);
}
function Zc(s) {
  if (s)
    for (let u = 0; u < s.length; u++)
      s[u].flags |= 8;
}
function ld(s) {
  if (s.placeholder)
    return s.placeholder;
  const u = s.component;
  return u ? ld(u.subTree) : null;
}
const cd = (s) => s.__isSuspense;
function Em(s, u) {
  u && u.pendingBranch ? Me(s) ? u.effects.push(...s) : u.effects.push(s) : Ay(s);
}
const Nt = /* @__PURE__ */ Symbol.for("v-fgt"), ss = /* @__PURE__ */ Symbol.for("v-txt"), Dr = /* @__PURE__ */ Symbol.for("v-cmt"), Ca = /* @__PURE__ */ Symbol.for("v-stc"), Fn = [];
let Bt = null;
function Qt(s = !1) {
  Fn.push(Bt = s ? null : []);
}
function ud() {
  Fn.pop(), Bt = Fn[Fn.length - 1] || null;
}
let lo = 1;
function Yc(s, u = !1) {
  lo += s, s < 0 && Bt && u && (Bt.hasOnce = !0);
}
function dd(s) {
  return s.dynamicChildren = lo > 0 ? Bt || Rn : null, ud(), lo > 0 && Bt && Bt.push(s), s;
}
function Pr(s, u, p, _, b, O) {
  return dd(
    wt(
      s,
      u,
      p,
      _,
      b,
      O,
      !0
    )
  );
}
function hd(s, u, p, _, b) {
  return dd(
    Ir(
      s,
      u,
      p,
      _,
      b,
      !0
    )
  );
}
function pd(s) {
  return s ? s.__v_isVNode === !0 : !1;
}
function Wi(s, u) {
  return s.type === u.type && s.key === u.key;
}
const fd = ({ key: s }) => s ?? null, Ho = ({
  ref: s,
  ref_key: u,
  ref_for: p
}) => (typeof s == "number" && (s = "" + s), s != null ? dt(s) || /* @__PURE__ */ kt(s) || qe(s) ? { i: Dt, r: s, k: u, f: !!p } : s : null);
function wt(s, u = null, p = null, _ = 0, b = null, O = s === Nt ? 0 : 1, h = !1, w = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: s,
    props: u,
    key: u && fd(u),
    ref: u && Ho(u),
    scopeId: Hu,
    slotScopeIds: null,
    children: p,
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
    shapeFlag: O,
    patchFlag: _,
    dynamicProps: b,
    dynamicChildren: null,
    appContext: null,
    ctx: Dt
  };
  return w ? (Jo(a, p), O & 128 && s.normalize(a)) : p && (a.shapeFlag |= dt(p) ? 8 : 16), lo > 0 && // avoid a block node from tracking itself
  !h && // has current parent block
  Bt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || O & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Bt.push(a), a;
}
const Ir = Sm;
function Sm(s, u = null, p = null, _ = 0, b = null, O = !1) {
  if ((!s || s === em) && (s = Dr), pd(s)) {
    const w = Ri(
      s,
      u,
      !0
      /* mergeRef: true */
    );
    return p && Jo(w, p), lo > 0 && !O && Bt && (w.shapeFlag & 6 ? Bt[Bt.indexOf(s)] = w : Bt.push(w)), w.patchFlag = -2, w;
  }
  if (Mm(s) && (s = s.__vccOpts), u) {
    u = Pm(u);
    let { class: w, style: a } = u;
    w && !dt(w) && (u.class = Bn(w)), rt(a) && (/* @__PURE__ */ rl(a) && !Me(a) && (a = xt({}, a)), u.style = In(a));
  }
  const h = dt(s) ? 1 : cd(s) ? 128 : ns(s) ? 64 : rt(s) ? 4 : qe(s) ? 2 : 0;
  return wt(
    s,
    u,
    p,
    _,
    b,
    h,
    O,
    !0
  );
}
function Pm(s) {
  return s ? /* @__PURE__ */ rl(s) || td(s) ? xt({}, s) : s : null;
}
function Ri(s, u, p = !1, _ = !1) {
  const { props: b, ref: O, patchFlag: h, children: w, transition: a } = s, f = u ? Tm(b || {}, u) : b, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: s.type,
    props: f,
    key: f && fd(f),
    ref: u && u.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      p && O ? Me(O) ? O.concat(Ho(u)) : [O, Ho(u)] : Ho(u)
    ) : O,
    scopeId: s.scopeId,
    slotScopeIds: s.slotScopeIds,
    children: w,
    target: s.target,
    targetStart: s.targetStart,
    targetAnchor: s.targetAnchor,
    staticCount: s.staticCount,
    shapeFlag: s.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: u && s.type !== Nt ? h === -1 ? 16 : h | 16 : h,
    dynamicProps: s.dynamicProps,
    dynamicChildren: s.dynamicChildren,
    appContext: s.appContext,
    dirs: s.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: s.component,
    suspense: s.suspense,
    ssContent: s.ssContent && Ri(s.ssContent),
    ssFallback: s.ssFallback && Ri(s.ssFallback),
    placeholder: s.placeholder,
    el: s.el,
    anchor: s.anchor,
    ctx: s.ctx,
    ce: s.ce,
    cacheIndex: s.cacheIndex
  };
  return a && _ && il(
    y,
    a.clone(y)
  ), y;
}
function Wo(s = " ", u = 0) {
  return Ir(ss, null, s, u);
}
function za(s = "", u = !1) {
  return u ? (Qt(), hd(Dr, null, s)) : Ir(Dr, null, s);
}
function mr(s) {
  return s == null || typeof s == "boolean" ? Ir(Dr) : Me(s) ? Ir(
    Nt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    s.slice()
  ) : pd(s) ? Lr(s) : Ir(ss, null, String(s));
}
function Lr(s) {
  return s.el === null && s.patchFlag !== -1 || s.memo ? s : Ri(s);
}
function Jo(s, u) {
  let p = 0;
  const { shapeFlag: _ } = s;
  if (u == null)
    u = null;
  else if (Me(u))
    p = 16;
  else if (typeof u == "object")
    if (_ & 65) {
      const b = u.default;
      b && (b._c && (b._d = !1), Jo(s, b()), b._c && (b._d = !0));
      return;
    } else {
      p = 32;
      const b = u._;
      !b && !td(u) ? u._ctx = Dt : b === 3 && Dt && (Dt.slots._ === 1 ? u._ = 1 : (u._ = 2, s.patchFlag |= 1024));
    }
  else if (qe(u)) {
    if (_ & 65) {
      Jo(s, { default: u });
      return;
    }
    u = { default: u, _ctx: Dt }, p = 32;
  } else
    u = String(u), _ & 64 ? (p = 16, u = [Wo(u)]) : p = 8;
  s.children = u, s.shapeFlag |= p;
}
function Tm(...s) {
  const u = {};
  for (let p = 0; p < s.length; p++) {
    const _ = s[p];
    for (const b in _)
      if (b === "class")
        u.class !== _.class && (u.class = Bn([u.class, _.class]));
      else if (b === "style")
        u.style = In([u.style, _.style]);
      else if (Zo(b)) {
        const O = u[b], h = _[b];
        h && O !== h && !(Me(O) && O.includes(h)) ? u[b] = O ? [].concat(O, h) : h : h == null && O == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Yo(b) && (u[b] = h);
      } else b !== "" && (u[b] = _[b]);
  }
  return u;
}
function pr(s, u, p, _ = null) {
  tr(s, u, 7, [
    p,
    _
  ]);
}
const Lm = Zu();
let Am = 0;
function Rm(s, u, p) {
  const _ = s.type, b = (u ? u.appContext : s.appContext) || Lm, O = {
    uid: Am++,
    vnode: s,
    type: _,
    parent: u,
    appContext: b,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ty(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: u ? u.provides : Object.create(b.provides),
    ids: u ? u.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: nd(_, b),
    emitsOptions: Yu(_, b),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: at,
    // inheritAttrs
    inheritAttrs: _.inheritAttrs,
    // state
    ctx: at,
    data: at,
    props: at,
    attrs: at,
    slots: at,
    refs: at,
    setupState: at,
    setupContext: null,
    // suspense related
    suspense: p,
    suspenseId: p ? p.pendingId : 0,
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
  return O.ctx = { _: O }, O.root = u ? u.root : O, O.emit = dm.bind(null, O), s.ce && s.ce(O), O;
}
let Lt = null;
const Im = () => Lt || Dt;
let Ko, co;
{
  const s = Xo(), u = (p, _) => {
    let b;
    return (b = s[p]) || (b = s[p] = []), b.push(_), (O) => {
      b.length > 1 ? b.forEach((h) => h(O)) : b[0](O);
    };
  };
  Ko = u(
    "__VUE_INSTANCE_SETTERS__",
    (p) => Lt = p
  ), co = u(
    "__VUE_SSR_SETTERS__",
    (p) => uo = p
  );
}
const fo = (s) => {
  const u = Lt;
  return Ko(s), s.scope.on(), () => {
    s.scope.off(), Ko(u);
  };
}, Qc = () => {
  Lt && Lt.scope.off(), Ko(null);
};
function yd(s) {
  return s.vnode.shapeFlag & 4;
}
let uo = !1;
function Bm(s, u = !1, p = !1) {
  u && co(u);
  const { props: _, children: b } = s.vnode, O = yd(s);
  bm(s, _, O, u), wm(s, b, p || u);
  const h = O ? Nm(s, u) : void 0;
  return u && co(!1), h;
}
function Nm(s, u) {
  const p = s.type;
  s.accessCache = /* @__PURE__ */ Object.create(null), s.proxy = new Proxy(s.ctx, rm);
  const { setup: _ } = p;
  if (_) {
    Br();
    const b = s.setupContext = _.length > 1 ? Fm(s) : null, O = fo(s), h = po(
      _,
      s,
      0,
      [
        s.props,
        b
      ]
    ), w = pu(h);
    if (Nr(), O(), (w || s.sp) && !no(s) && $u(s), w) {
      if (h.then(Qc, Qc), u)
        return h.then((a) => {
          co(!0);
          try {
            Xc(s, a, u);
          } finally {
            co(!1);
          }
        }).catch((a) => {
          rs(a, s, 0);
        });
      s.asyncDep = h;
    } else
      Xc(s, h);
  } else
    md(s);
}
function Xc(s, u, p) {
  qe(u) ? s.type.__ssrInlineRender ? s.ssrRender = u : s.render = u : rt(u) && (s.setupState = Bu(u)), md(s);
}
function md(s, u, p) {
  const _ = s.type;
  s.render || (s.render = _.render || vr);
  {
    const b = fo(s);
    Br();
    try {
      nm(s);
    } finally {
      Nr(), b();
    }
  }
}
const Dm = {
  get(s, u) {
    return jt(s, "get", ""), s[u];
  }
};
function Fm(s) {
  const u = (p) => {
    s.exposed = p || {};
  };
  return {
    attrs: new Proxy(s.attrs, Dm),
    slots: s.slots,
    emit: s.emit,
    expose: u
  };
}
function as(s) {
  return s.exposed ? s.exposeProxy || (s.exposeProxy = new Proxy(Bu(wy(s.exposed)), {
    get(u, p) {
      if (p in u)
        return u[p];
      if (p in io)
        return io[p](s);
    },
    has(u, p) {
      return p in u || p in io;
    }
  })) : s.proxy;
}
function Mm(s) {
  return qe(s) && "__vccOpts" in s;
}
const qa = (s, u) => /* @__PURE__ */ Ey(s, u, uo), Hm = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ua;
const eu = typeof window < "u" && window.trustedTypes;
if (eu)
  try {
    Ua = /* @__PURE__ */ eu.createPolicy("vue", {
      createHTML: (s) => s
    });
  } catch {
  }
const bd = Ua ? (s) => Ua.createHTML(s) : (s) => s, Vm = "http://www.w3.org/2000/svg", zm = "http://www.w3.org/1998/Math/MathML", Tr = typeof document < "u" ? document : null, tu = Tr && /* @__PURE__ */ Tr.createElement("template"), qm = {
  insert: (s, u, p) => {
    u.insertBefore(s, p || null);
  },
  remove: (s) => {
    const u = s.parentNode;
    u && u.removeChild(s);
  },
  createElement: (s, u, p, _) => {
    const b = u === "svg" ? Tr.createElementNS(Vm, s) : u === "mathml" ? Tr.createElementNS(zm, s) : p ? Tr.createElement(s, { is: p }) : Tr.createElement(s);
    return s === "select" && _ && _.multiple != null && b.setAttribute("multiple", _.multiple), b;
  },
  createText: (s) => Tr.createTextNode(s),
  createComment: (s) => Tr.createComment(s),
  setText: (s, u) => {
    s.nodeValue = u;
  },
  setElementText: (s, u) => {
    s.textContent = u;
  },
  parentNode: (s) => s.parentNode,
  nextSibling: (s) => s.nextSibling,
  querySelector: (s) => Tr.querySelector(s),
  setScopeId(s, u) {
    s.setAttribute(u, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(s, u, p, _, b, O) {
    const h = p ? p.previousSibling : u.lastChild;
    if (b && (b === O || b.nextSibling))
      for (; u.insertBefore(b.cloneNode(!0), p), !(b === O || !(b = b.nextSibling)); )
        ;
    else {
      tu.innerHTML = bd(
        _ === "svg" ? `<svg>${s}</svg>` : _ === "mathml" ? `<math>${s}</math>` : s
      );
      const w = tu.content;
      if (_ === "svg" || _ === "mathml") {
        const a = w.firstChild;
        for (; a.firstChild; )
          w.appendChild(a.firstChild);
        w.removeChild(a);
      }
      u.insertBefore(w, p);
    }
    return [
      // first
      h ? h.nextSibling : u.firstChild,
      // last
      p ? p.previousSibling : u.lastChild
    ];
  }
}, Um = /* @__PURE__ */ Symbol("_vtc");
function $m(s, u, p) {
  const _ = s[Um];
  _ && (u = (u ? [u, ..._] : [..._]).join(" ")), u == null ? s.removeAttribute("class") : p ? s.setAttribute("class", u) : s.className = u;
}
const ru = /* @__PURE__ */ Symbol("_vod"), Gm = /* @__PURE__ */ Symbol("_vsh"), Wm = /* @__PURE__ */ Symbol(""), Jm = /(?:^|;)\s*display\s*:/;
function Km(s, u, p) {
  const _ = s.style, b = dt(p);
  let O = !1;
  if (p && !b) {
    if (u)
      if (dt(u))
        for (const h of u.split(";")) {
          const w = h.slice(0, h.indexOf(":")).trim();
          p[w] == null && Zi(_, w, "");
        }
      else
        for (const h in u)
          p[h] == null && Zi(_, h, "");
    for (const h in p) {
      h === "display" && (O = !0);
      const w = p[h];
      w != null ? Ym(
        s,
        h,
        !dt(u) && u ? u[h] : void 0,
        w
      ) || Zi(_, h, w) : Zi(_, h, "");
    }
  } else if (b) {
    if (u !== p) {
      const h = _[Wm];
      h && (p += ";" + h), _.cssText = p, O = Jm.test(p);
    }
  } else u && s.removeAttribute("style");
  ru in s && (s[ru] = O ? _.display : "", s[Gm] && (_.display = "none"));
}
const Bo = /\s*!important$/;
function Zi(s, u, p) {
  if (Me(p))
    p.forEach((_) => Zi(s, u, _));
  else if (p == null && (p = ""), u.startsWith("--"))
    Bo.test(p) ? s.setProperty(u, p.replace(Bo, ""), "important") : s.setProperty(u, p);
  else {
    const _ = Zm(s, u);
    Bo.test(p) ? s.setProperty(
      Mn(_),
      p.replace(Bo, ""),
      "important"
    ) : s[_] = p;
  }
}
const nu = ["Webkit", "Moz", "ms"], Ea = {};
function Zm(s, u) {
  const p = Ea[u];
  if (p)
    return p;
  let _ = Xt(u);
  if (_ !== "filter" && _ in s)
    return Ea[u] = _;
  _ = mu(_);
  for (let b = 0; b < nu.length; b++) {
    const O = nu[b] + _;
    if (O in s)
      return Ea[u] = O;
  }
  return u;
}
function Ym(s, u, p, _) {
  return s.tagName === "TEXTAREA" && (u === "width" || u === "height") && dt(_) && p === _;
}
const iu = "http://www.w3.org/1999/xlink";
function ou(s, u, p, _, b, O = Qf(u)) {
  _ && u.startsWith("xlink:") ? p == null ? s.removeAttributeNS(iu, u.slice(6, u.length)) : s.setAttributeNS(iu, u, p) : p == null || O && !vu(p) ? s.removeAttribute(u) : s.setAttribute(
    u,
    O ? "" : gr(p) ? String(p) : p
  );
}
function su(s, u, p, _, b) {
  if (u === "innerHTML" || u === "textContent") {
    p != null && (s[u] = u === "innerHTML" ? bd(p) : p);
    return;
  }
  const O = s.tagName;
  if (u === "value" && O !== "PROGRESS" && // custom elements may use _value internally
  !O.includes("-")) {
    const w = O === "OPTION" ? s.getAttribute("value") || "" : s.value, a = p == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      s.type === "checkbox" ? "on" : ""
    ) : String(p);
    (w !== a || !("_value" in s)) && (s.value = a), p == null && s.removeAttribute(u), s._value = p;
    return;
  }
  let h = !1;
  if (p === "" || p == null) {
    const w = typeof s[u];
    w === "boolean" ? p = vu(p) : p == null && w === "string" ? (p = "", h = !0) : w === "number" && (p = 0, h = !0);
  }
  try {
    s[u] = p;
  } catch {
  }
  h && s.removeAttribute(b || u);
}
function Ti(s, u, p, _) {
  s.addEventListener(u, p, _);
}
function Qm(s, u, p, _) {
  s.removeEventListener(u, p, _);
}
const au = /* @__PURE__ */ Symbol("_vei");
function Xm(s, u, p, _, b = null) {
  const O = s[au] || (s[au] = {}), h = O[u];
  if (_ && h)
    h.value = _;
  else {
    const [w, a] = rb(u);
    if (_) {
      const f = O[u] = ob(
        _,
        b
      );
      Ti(s, w, f, a);
    } else h && (Qm(s, w, h, a), O[u] = void 0);
  }
}
const eb = /(Once|Passive|Capture)$/, tb = /^on:?(?:Once|Passive|Capture)$/;
function rb(s) {
  let u, p;
  for (; (p = s.match(eb)) && !tb.test(s); )
    u || (u = {}), s = s.slice(0, s.length - p[1].length), u[p[1].toLowerCase()] = !0;
  return [s[2] === ":" ? s.slice(3) : Mn(s.slice(2)), u];
}
let Sa = 0;
const nb = /* @__PURE__ */ Promise.resolve(), ib = () => Sa || (nb.then(() => Sa = 0), Sa = Date.now());
function ob(s, u) {
  const p = (_) => {
    if (!_._vts)
      _._vts = Date.now();
    else if (_._vts <= p.attached)
      return;
    const b = p.value;
    if (Me(b)) {
      const O = _.stopImmediatePropagation;
      _.stopImmediatePropagation = () => {
        O.call(_), _._stopped = !0;
      };
      const h = b.slice(), w = [_];
      for (let a = 0; a < h.length && !_._stopped; a++) {
        const f = h[a];
        f && tr(
          f,
          u,
          5,
          w
        );
      }
    } else
      tr(
        b,
        u,
        5,
        [_]
      );
  };
  return p.value = s, p.attached = ib(), p;
}
const lu = (s) => s.charCodeAt(0) === 111 && s.charCodeAt(1) === 110 && // lowercase letter
s.charCodeAt(2) > 96 && s.charCodeAt(2) < 123, sb = (s, u, p, _, b, O) => {
  const h = b === "svg";
  u === "class" ? $m(s, _, h) : u === "style" ? Km(s, p, _) : Zo(u) ? Yo(u) || Xm(s, u, p, _, O) : (u[0] === "." ? (u = u.slice(1), !0) : u[0] === "^" ? (u = u.slice(1), !1) : ab(s, u, _, h)) ? (su(s, u, _), !s.tagName.includes("-") && (u === "value" || u === "checked" || u === "selected") && ou(s, u, _, h, O, u !== "value")) : /* #11081 force set props for possible async custom element */ s._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (lb(s, u) || // @ts-expect-error _def is private
  s._def.__asyncLoader && (/[A-Z]/.test(u) || !dt(_))) ? su(s, Xt(u), _, O, u) : (u === "true-value" ? s._trueValue = _ : u === "false-value" && (s._falseValue = _), ou(s, u, _, h));
};
function ab(s, u, p, _) {
  if (_)
    return !!(u === "innerHTML" || u === "textContent" || u in s && lu(u) && qe(p));
  if (u === "spellcheck" || u === "draggable" || u === "translate" || u === "autocorrect" || u === "sandbox" && s.tagName === "IFRAME" || u === "form" || u === "list" && s.tagName === "INPUT" || u === "type" && s.tagName === "TEXTAREA")
    return !1;
  if (u === "width" || u === "height") {
    const b = s.tagName;
    if (b === "IMG" || b === "VIDEO" || b === "CANVAS" || b === "SOURCE")
      return !1;
  }
  return lu(u) && dt(p) ? !1 : u in s;
}
function lb(s, u) {
  const p = (
    // @ts-expect-error _def is private
    s._def.props
  );
  if (!p)
    return !1;
  const _ = Xt(u);
  return Array.isArray(p) ? p.some((b) => Xt(b) === _) : Object.keys(p).some((b) => Xt(b) === _);
}
const cu = (s) => {
  const u = s.props["onUpdate:modelValue"] || !1;
  return Me(u) ? (p) => Fo(u, p) : u;
};
function cb(s) {
  s.target.composing = !0;
}
function uu(s) {
  const u = s.target;
  u.composing && (u.composing = !1, u.dispatchEvent(new Event("input")));
}
const No = /* @__PURE__ */ Symbol("_assign"), Do = /* @__PURE__ */ Symbol("_initialValue");
function Pa(s, u, p) {
  return u && (s = s.trim()), p && (s = Ja(s)), s;
}
const ub = {
  created(s, { modifiers: { lazy: u, trim: p, number: _ } }, b) {
    s.parentNode && (s.type === "text" ? s[Do] = s.defaultValue.replace(/[\r\n]/g, "") : s.type === "textarea" && (s[Do] = s.defaultValue.replace(/\r\n?/g, `
`))), s[No] = cu(b);
    const O = _ || b.props && b.props.type === "number";
    Ti(s, u ? "change" : "input", (h) => {
      h.target.composing || s[No](Pa(s.value, p, O));
    }), (p || O) && Ti(s, "change", () => {
      s.value = Pa(s.value, p, O);
    }), u || (Ti(s, "compositionstart", cb), Ti(s, "compositionend", uu), Ti(s, "change", uu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(s, { value: u, modifiers: { trim: p, number: _ } }) {
    const b = u ?? "", O = s[Do];
    delete s[Do], O !== void 0 && (s.type === "text" || s.type === "textarea") && s.value !== O ? s[No](Pa(s.value, p, _)) : s.value = b;
  },
  beforeUpdate(s, { value: u, oldValue: p, modifiers: { lazy: _, trim: b, number: O } }, h) {
    if (s[No] = cu(h), s.composing) return;
    const w = (O || s.type === "number") && !/^0\d/.test(s.value) ? Ja(s.value) : s.value, a = u ?? "";
    if (w === a)
      return;
    const f = s.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === s && s.type !== "range" && (_ && u === p || b && s.value.trim() === a) || (s.value = a);
  }
}, db = ["ctrl", "shift", "alt", "meta"], hb = {
  stop: (s) => s.stopPropagation(),
  prevent: (s) => s.preventDefault(),
  self: (s) => s.target !== s.currentTarget,
  ctrl: (s) => !s.ctrlKey,
  shift: (s) => !s.shiftKey,
  alt: (s) => !s.altKey,
  meta: (s) => !s.metaKey,
  left: (s) => "button" in s && s.button !== 0,
  middle: (s) => "button" in s && s.button !== 1,
  right: (s) => "button" in s && s.button !== 2,
  exact: (s, u) => db.some((p) => s[`${p}Key`] && !u.includes(p))
}, Si = (s, u) => {
  if (!s) return s;
  const p = s._withMods || (s._withMods = {}), _ = u.join(".");
  return p[_] || (p[_] = (b, ...O) => {
    for (let h = 0; h < u.length; h++) {
      const w = hb[u[h]];
      if (w && w(b, u)) return;
    }
    return s(b, ...O);
  });
}, pb = /* @__PURE__ */ xt({ patchProp: sb }, qm);
let du;
function fb() {
  return du || (du = km(pb));
}
const vd = (...s) => {
  const u = fb().createApp(...s), { mount: p } = u;
  return u.mount = (_) => {
    const b = mb(_);
    if (!b) return;
    const O = u._component;
    !qe(O) && !O.render && !O.template && (O.template = b.innerHTML), b.nodeType === 1 && (b.textContent = "");
    const h = p(b, !1, yb(b));
    return b instanceof Element && (b.removeAttribute("v-cloak"), b.setAttribute("data-v-app", "")), h;
  }, u;
};
function yb(s) {
  if (s instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && s instanceof MathMLElement)
    return "mathml";
}
function mb(s) {
  return dt(s) ? document.querySelector(s) : s;
}
function bb(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var gd = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(s, u) {
  (function(p, _) {
    s.exports = _();
  })(self, () => (() => {
    var p = { 9306: (h, w, a) => {
      var f = a(4901), y = a(6823), m = TypeError;
      h.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not a function");
      };
    }, 5548: (h, w, a) => {
      var f = a(3517), y = a(6823), m = TypeError;
      h.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not a constructor");
      };
    }, 3506: (h, w, a) => {
      var f = a(3925), y = String, m = TypeError;
      h.exports = function(v) {
        if (f(v)) return v;
        throw new m("Can't set " + y(v) + " as a prototype");
      };
    }, 6469: (h, w, a) => {
      var f = a(8227), y = a(2360), m = a(4913).f, v = f("unscopables"), j = Array.prototype;
      j[v] === void 0 && m(j, v, { configurable: !0, value: y(null) }), h.exports = function(C) {
        j[v][C] = !0;
      };
    }, 7829: (h, w, a) => {
      var f = a(8183).charAt;
      h.exports = function(y, m, v) {
        return m + (v ? f(y, m).length : 1);
      };
    }, 679: (h, w, a) => {
      var f = a(1625), y = TypeError;
      h.exports = function(m, v) {
        if (f(v, m)) return m;
        throw new y("Incorrect invocation");
      };
    }, 8551: (h, w, a) => {
      var f = a(34), y = String, m = TypeError;
      h.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not an object");
      };
    }, 235: (h, w, a) => {
      var f = a(9213).forEach, y = a(4598)("forEach");
      h.exports = y ? [].forEach : function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (h, w, a) => {
      var f = a(6080), y = a(9565), m = a(8981), v = a(6319), j = a(4209), C = a(3517), k = a(6198), E = a(4659), P = a(81), T = a(851), I = Array;
      h.exports = function(L) {
        var M = m(L), H = C(this), A = arguments.length, B = A > 1 ? arguments[1] : void 0, N = B !== void 0;
        N && (B = f(B, A > 2 ? arguments[2] : void 0));
        var z, V, Z, J, X, ce, oe = T(M), ne = 0;
        if (!oe || this === I && j(oe)) for (z = k(M), V = H ? new this(z) : I(z); z > ne; ne++) ce = N ? B(M[ne], ne) : M[ne], E(V, ne, ce);
        else for (V = H ? new this() : [], X = (J = P(M, oe)).next; !(Z = y(X, J)).done; ne++) ce = N ? v(J, B, [Z.value, ne], !0) : Z.value, E(V, ne, ce);
        return V.length = ne, V;
      };
    }, 9617: (h, w, a) => {
      var f = a(5397), y = a(5610), m = a(6198), v = function(j) {
        return function(C, k, E) {
          var P = f(C), T = m(P);
          if (T === 0) return !j && -1;
          var I, L = y(E, T);
          if (j && k != k) {
            for (; T > L; ) if ((I = P[L++]) != I) return !0;
          } else for (; T > L; L++) if ((j || L in P) && P[L] === k) return j || L || 0;
          return !j && -1;
        };
      };
      h.exports = { includes: v(!0), indexOf: v(!1) };
    }, 9213: (h, w, a) => {
      var f = a(6080), y = a(9504), m = a(7055), v = a(8981), j = a(6198), C = a(1469), k = y([].push), E = function(P) {
        var T = P === 1, I = P === 2, L = P === 3, M = P === 4, H = P === 6, A = P === 7, B = P === 5 || H;
        return function(N, z, V, Z) {
          for (var J, X, ce = v(N), oe = m(ce), ne = j(oe), me = f(z, V), fe = 0, ke = Z || C, Ee = T ? ke(N, ne) : I || A ? ke(N, 0) : void 0; ne > fe; fe++) if ((B || fe in oe) && (X = me(J = oe[fe], fe, ce), P)) if (T) Ee[fe] = X;
          else if (X) switch (P) {
            case 3:
              return !0;
            case 5:
              return J;
            case 6:
              return fe;
            case 2:
              k(Ee, J);
          }
          else switch (P) {
            case 4:
              return !1;
            case 7:
              k(Ee, J);
          }
          return H ? -1 : L || M ? M : Ee;
        };
      };
      h.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (h, w, a) => {
      var f = a(9039), y = a(8227), m = a(7388), v = y("species");
      h.exports = function(j) {
        return m >= 51 || !f(function() {
          var C = [];
          return (C.constructor = {})[v] = function() {
            return { foo: 1 };
          }, C[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (h, w, a) => {
      var f = a(9039);
      h.exports = function(y, m) {
        var v = [][y];
        return !!v && f(function() {
          v.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (h, w, a) => {
      var f = a(9306), y = a(8981), m = a(7055), v = a(6198), j = TypeError, C = "Reduce of empty array with no initial value", k = function(E) {
        return function(P, T, I, L) {
          var M = y(P), H = m(M), A = v(M);
          if (f(T), A === 0 && I < 2) throw new j(C);
          var B = E ? A - 1 : 0, N = E ? -1 : 1;
          if (I < 2) for (; ; ) {
            if (B in H) {
              L = H[B], B += N;
              break;
            }
            if (B += N, E ? B < 0 : A <= B) throw new j(C);
          }
          for (; E ? B >= 0 : A > B; B += N) B in H && (L = T(L, H[B], B, M));
          return L;
        };
      };
      h.exports = { left: k(!1), right: k(!0) };
    }, 4527: (h, w, a) => {
      var f = a(3724), y = a(4376), m = TypeError, v = Object.getOwnPropertyDescriptor, j = f && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (C) {
          return C instanceof TypeError;
        }
      }();
      h.exports = j ? function(C, k) {
        if (y(C) && !v(C, "length").writable) throw new m("Cannot set read only .length");
        return C.length = k;
      } : function(C, k) {
        return C.length = k;
      };
    }, 7680: (h, w, a) => {
      var f = a(9504);
      h.exports = f([].slice);
    }, 4488: (h, w, a) => {
      var f = a(7680), y = Math.floor, m = function(v, j) {
        var C = v.length;
        if (C < 8) for (var k, E, P = 1; P < C; ) {
          for (E = P, k = v[P]; E && j(v[E - 1], k) > 0; ) v[E] = v[--E];
          E !== P++ && (v[E] = k);
        }
        else for (var T = y(C / 2), I = m(f(v, 0, T), j), L = m(f(v, T), j), M = I.length, H = L.length, A = 0, B = 0; A < M || B < H; ) v[A + B] = A < M && B < H ? j(I[A], L[B]) <= 0 ? I[A++] : L[B++] : A < M ? I[A++] : L[B++];
        return v;
      };
      h.exports = m;
    }, 7433: (h, w, a) => {
      var f = a(4376), y = a(3517), m = a(34), v = a(8227)("species"), j = Array;
      h.exports = function(C) {
        var k;
        return f(C) && (k = C.constructor, (y(k) && (k === j || f(k.prototype)) || m(k) && (k = k[v]) === null) && (k = void 0)), k === void 0 ? j : k;
      };
    }, 1469: (h, w, a) => {
      var f = a(7433);
      h.exports = function(y, m) {
        return new (f(y))(m === 0 ? 0 : m);
      };
    }, 6319: (h, w, a) => {
      var f = a(8551), y = a(9539);
      h.exports = function(m, v, j, C) {
        try {
          return C ? v(f(j)[0], j[1]) : v(j);
        } catch (k) {
          y(m, "throw", k);
        }
      };
    }, 4428: (h, w, a) => {
      var f = a(8227)("iterator"), y = !1;
      try {
        var m = 0, v = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          y = !0;
        } };
        v[f] = function() {
          return this;
        }, Array.from(v, function() {
          throw 2;
        });
      } catch {
      }
      h.exports = function(j, C) {
        try {
          if (!C && !y) return !1;
        } catch {
          return !1;
        }
        var k = !1;
        try {
          var E = {};
          E[f] = function() {
            return { next: function() {
              return { done: k = !0 };
            } };
          }, j(E);
        } catch {
        }
        return k;
      };
    }, 4576: (h, w, a) => {
      var f = a(9504), y = f({}.toString), m = f("".slice);
      h.exports = function(v) {
        return m(y(v), 8, -1);
      };
    }, 6955: (h, w, a) => {
      var f = a(2140), y = a(4901), m = a(4576), v = a(8227)("toStringTag"), j = Object, C = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      h.exports = f ? m : function(k) {
        var E, P, T;
        return k === void 0 ? "Undefined" : k === null ? "Null" : typeof (P = function(I, L) {
          try {
            return I[L];
          } catch {
          }
        }(E = j(k), v)) == "string" ? P : C ? m(E) : (T = m(E)) === "Object" && y(E.callee) ? "Arguments" : T;
      };
    }, 7740: (h, w, a) => {
      var f = a(9297), y = a(5031), m = a(7347), v = a(4913);
      h.exports = function(j, C, k) {
        for (var E = y(C), P = v.f, T = m.f, I = 0; I < E.length; I++) {
          var L = E[I];
          f(j, L) || k && f(k, L) || P(j, L, T(C, L));
        }
      };
    }, 1436: (h, w, a) => {
      var f = a(8227)("match");
      h.exports = function(y) {
        var m = /./;
        try {
          "/./"[y](m);
        } catch {
          try {
            return m[f] = !1, "/./"[y](m);
          } catch {
          }
        }
        return !1;
      };
    }, 2211: (h, w, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        function y() {
        }
        return y.prototype.constructor = null, Object.getPrototypeOf(new y()) !== y.prototype;
      });
    }, 2529: (h) => {
      h.exports = function(w, a) {
        return { value: w, done: a };
      };
    }, 6699: (h, w, a) => {
      var f = a(3724), y = a(4913), m = a(6980);
      h.exports = f ? function(v, j, C) {
        return y.f(v, j, m(1, C));
      } : function(v, j, C) {
        return v[j] = C, v;
      };
    }, 6980: (h) => {
      h.exports = function(w, a) {
        return { enumerable: !(1 & w), configurable: !(2 & w), writable: !(4 & w), value: a };
      };
    }, 4659: (h, w, a) => {
      var f = a(3724), y = a(4913), m = a(6980);
      h.exports = function(v, j, C) {
        f ? y.f(v, j, m(0, C)) : v[j] = C;
      };
    }, 380: (h, w, a) => {
      var f = a(9504), y = a(9039), m = a(533).start, v = RangeError, j = isFinite, C = Math.abs, k = Date.prototype, E = k.toISOString, P = f(k.getTime), T = f(k.getUTCDate), I = f(k.getUTCFullYear), L = f(k.getUTCHours), M = f(k.getUTCMilliseconds), H = f(k.getUTCMinutes), A = f(k.getUTCMonth), B = f(k.getUTCSeconds);
      h.exports = y(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !y(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(P(this))) throw new v("Invalid time value");
        var N = this, z = I(N), V = M(N), Z = z < 0 ? "-" : z > 9999 ? "+" : "";
        return Z + m(C(z), Z ? 6 : 4, 0) + "-" + m(A(N) + 1, 2, 0) + "-" + m(T(N), 2, 0) + "T" + m(L(N), 2, 0) + ":" + m(H(N), 2, 0) + ":" + m(B(N), 2, 0) + "." + m(V, 3, 0) + "Z";
      } : E;
    }, 3640: (h, w, a) => {
      var f = a(8551), y = a(4270), m = TypeError;
      h.exports = function(v) {
        if (f(this), v === "string" || v === "default") v = "string";
        else if (v !== "number") throw new m("Incorrect hint");
        return y(this, v);
      };
    }, 2106: (h, w, a) => {
      var f = a(283), y = a(4913);
      h.exports = function(m, v, j) {
        return j.get && f(j.get, v, { getter: !0 }), j.set && f(j.set, v, { setter: !0 }), y.f(m, v, j);
      };
    }, 6840: (h, w, a) => {
      var f = a(4901), y = a(4913), m = a(283), v = a(9433);
      h.exports = function(j, C, k, E) {
        E || (E = {});
        var P = E.enumerable, T = E.name !== void 0 ? E.name : C;
        if (f(k) && m(k, T, E), E.global) P ? j[C] = k : v(C, k);
        else {
          try {
            E.unsafe ? j[C] && (P = !0) : delete j[C];
          } catch {
          }
          P ? j[C] = k : y.f(j, C, { value: k, enumerable: !1, configurable: !E.nonConfigurable, writable: !E.nonWritable });
        }
        return j;
      };
    }, 9433: (h, w, a) => {
      var f = a(4475), y = Object.defineProperty;
      h.exports = function(m, v) {
        try {
          y(f, m, { value: v, configurable: !0, writable: !0 });
        } catch {
          f[m] = v;
        }
        return v;
      };
    }, 4606: (h, w, a) => {
      var f = a(6823), y = TypeError;
      h.exports = function(m, v) {
        if (!delete m[v]) throw new y("Cannot delete property " + f(v) + " of " + f(m));
      };
    }, 3724: (h, w, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (h, w, a) => {
      var f = a(4475), y = a(34), m = f.document, v = y(m) && y(m.createElement);
      h.exports = function(j) {
        return v ? m.createElement(j) : {};
      };
    }, 6837: (h) => {
      var w = TypeError;
      h.exports = function(a) {
        if (a > 9007199254740991) throw w("Maximum allowed index exceeded");
        return a;
      };
    }, 7400: (h) => {
      h.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (h, w, a) => {
      var f = a(4055)("span").classList, y = f && f.constructor && f.constructor.prototype;
      h.exports = y === Object.prototype ? void 0 : y;
    }, 8834: (h, w, a) => {
      var f = a(9392).match(/firefox\/(\d+)/i);
      h.exports = !!f && +f[1];
    }, 7290: (h, w, a) => {
      var f = a(516), y = a(9088);
      h.exports = !f && !y && typeof window == "object" && typeof document == "object";
    }, 6763: (h) => {
      h.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (h) => {
      h.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (h, w, a) => {
      var f = a(9392);
      h.exports = /MSIE|Trident/.test(f);
    }, 28: (h, w, a) => {
      var f = a(9392);
      h.exports = /ipad|iphone|ipod/i.test(f) && typeof Pebble < "u";
    }, 8119: (h, w, a) => {
      var f = a(9392);
      h.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(f);
    }, 9088: (h, w, a) => {
      var f = a(4475), y = a(4576);
      h.exports = y(f.process) === "process";
    }, 6765: (h, w, a) => {
      var f = a(9392);
      h.exports = /web0s(?!.*chrome)/i.test(f);
    }, 9392: (h) => {
      h.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (h, w, a) => {
      var f, y, m = a(4475), v = a(9392), j = m.process, C = m.Deno, k = j && j.versions || C && C.version, E = k && k.v8;
      E && (y = (f = E.split("."))[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1])), !y && v && (!(f = v.match(/Edge\/(\d+)/)) || f[1] >= 74) && (f = v.match(/Chrome\/(\d+)/)) && (y = +f[1]), h.exports = y;
    }, 9160: (h, w, a) => {
      var f = a(9392).match(/AppleWebKit\/(\d+)\./);
      h.exports = !!f && +f[1];
    }, 8727: (h) => {
      h.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (h, w, a) => {
      var f = a(4475), y = a(7347).f, m = a(6699), v = a(6840), j = a(9433), C = a(7740), k = a(2796);
      h.exports = function(E, P) {
        var T, I, L, M, H, A = E.target, B = E.global, N = E.stat;
        if (T = B ? f : N ? f[A] || j(A, {}) : f[A] && f[A].prototype) for (I in P) {
          if (M = P[I], L = E.dontCallGetSet ? (H = y(T, I)) && H.value : T[I], !k(B ? I : A + (N ? "." : "#") + I, E.forced) && L !== void 0) {
            if (typeof M == typeof L) continue;
            C(M, L);
          }
          (E.sham || L && L.sham) && m(M, "sham", !0), v(T, I, M, E);
        }
      };
    }, 9039: (h) => {
      h.exports = function(w) {
        try {
          return !!w();
        } catch {
          return !0;
        }
      };
    }, 9228: (h, w, a) => {
      a(7495);
      var f = a(9565), y = a(6840), m = a(7323), v = a(9039), j = a(8227), C = a(6699), k = j("species"), E = RegExp.prototype;
      h.exports = function(P, T, I, L) {
        var M = j(P), H = !v(function() {
          var z = {};
          return z[M] = function() {
            return 7;
          }, ""[P](z) !== 7;
        }), A = H && !v(function() {
          var z = !1, V = /a/;
          return P === "split" && ((V = {}).constructor = {}, V.constructor[k] = function() {
            return V;
          }, V.flags = "", V[M] = /./[M]), V.exec = function() {
            return z = !0, null;
          }, V[M](""), !z;
        });
        if (!H || !A || I) {
          var B = /./[M], N = T(M, ""[P], function(z, V, Z, J, X) {
            var ce = V.exec;
            return ce === m || ce === E.exec ? H && !X ? { done: !0, value: f(B, V, Z, J) } : { done: !0, value: f(z, Z, V, J) } : { done: !1 };
          });
          y(String.prototype, P, N[0]), y(E, M, N[1]);
        }
        L && C(E[M], "sham", !0);
      };
    }, 8745: (h, w, a) => {
      var f = a(616), y = Function.prototype, m = y.apply, v = y.call;
      h.exports = typeof Reflect == "object" && Reflect.apply || (f ? v.bind(m) : function() {
        return v.apply(m, arguments);
      });
    }, 6080: (h, w, a) => {
      var f = a(7476), y = a(9306), m = a(616), v = f(f.bind);
      h.exports = function(j, C) {
        return y(j), C === void 0 ? j : m ? v(j, C) : function() {
          return j.apply(C, arguments);
        };
      };
    }, 616: (h, w, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        var y = (function() {
        }).bind();
        return typeof y != "function" || y.hasOwnProperty("prototype");
      });
    }, 566: (h, w, a) => {
      var f = a(9504), y = a(9306), m = a(34), v = a(9297), j = a(7680), C = a(616), k = Function, E = f([].concat), P = f([].join), T = {};
      h.exports = C ? k.bind : function(I) {
        var L = y(this), M = L.prototype, H = j(arguments, 1), A = function() {
          var B = E(H, j(arguments));
          return this instanceof A ? function(N, z, V) {
            if (!v(T, z)) {
              for (var Z = [], J = 0; J < z; J++) Z[J] = "a[" + J + "]";
              T[z] = k("C,a", "return new C(" + P(Z, ",") + ")");
            }
            return T[z](N, V);
          }(L, B.length, B) : L.apply(I, B);
        };
        return m(M) && (A.prototype = M), A;
      };
    }, 9565: (h, w, a) => {
      var f = a(616), y = Function.prototype.call;
      h.exports = f ? y.bind(y) : function() {
        return y.apply(y, arguments);
      };
    }, 350: (h, w, a) => {
      var f = a(3724), y = a(9297), m = Function.prototype, v = f && Object.getOwnPropertyDescriptor, j = y(m, "name"), C = j && (function() {
      }).name === "something", k = j && (!f || f && v(m, "name").configurable);
      h.exports = { EXISTS: j, PROPER: C, CONFIGURABLE: k };
    }, 6706: (h, w, a) => {
      var f = a(9504), y = a(9306);
      h.exports = function(m, v, j) {
        try {
          return f(y(Object.getOwnPropertyDescriptor(m, v)[j]));
        } catch {
        }
      };
    }, 7476: (h, w, a) => {
      var f = a(4576), y = a(9504);
      h.exports = function(m) {
        if (f(m) === "Function") return y(m);
      };
    }, 9504: (h, w, a) => {
      var f = a(616), y = Function.prototype, m = y.call, v = f && y.bind.bind(m, m);
      h.exports = f ? v : function(j) {
        return function() {
          return m.apply(j, arguments);
        };
      };
    }, 7751: (h, w, a) => {
      var f = a(4475), y = a(4901);
      h.exports = function(m, v) {
        return arguments.length < 2 ? (j = f[m], y(j) ? j : void 0) : f[m] && f[m][v];
        var j;
      };
    }, 851: (h, w, a) => {
      var f = a(6955), y = a(5966), m = a(4117), v = a(6269), j = a(8227)("iterator");
      h.exports = function(C) {
        if (!m(C)) return y(C, j) || y(C, "@@iterator") || v[f(C)];
      };
    }, 81: (h, w, a) => {
      var f = a(9565), y = a(9306), m = a(8551), v = a(6823), j = a(851), C = TypeError;
      h.exports = function(k, E) {
        var P = arguments.length < 2 ? j(k) : E;
        if (y(P)) return m(f(P, k));
        throw new C(v(k) + " is not iterable");
      };
    }, 6933: (h, w, a) => {
      var f = a(9504), y = a(4376), m = a(4901), v = a(4576), j = a(655), C = f([].push);
      h.exports = function(k) {
        if (m(k)) return k;
        if (y(k)) {
          for (var E = k.length, P = [], T = 0; T < E; T++) {
            var I = k[T];
            typeof I == "string" ? C(P, I) : typeof I != "number" && v(I) !== "Number" && v(I) !== "String" || C(P, j(I));
          }
          var L = P.length, M = !0;
          return function(H, A) {
            if (M) return M = !1, A;
            if (y(this)) return A;
            for (var B = 0; B < L; B++) if (P[B] === H) return A;
          };
        }
      };
    }, 5966: (h, w, a) => {
      var f = a(9306), y = a(4117);
      h.exports = function(m, v) {
        var j = m[v];
        return y(j) ? void 0 : f(j);
      };
    }, 2478: (h, w, a) => {
      var f = a(9504), y = a(8981), m = Math.floor, v = f("".charAt), j = f("".replace), C = f("".slice), k = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      h.exports = function(P, T, I, L, M, H) {
        var A = I + P.length, B = L.length, N = E;
        return M !== void 0 && (M = y(M), N = k), j(H, N, function(z, V) {
          var Z;
          switch (v(V, 0)) {
            case "$":
              return "$";
            case "&":
              return P;
            case "`":
              return C(T, 0, I);
            case "'":
              return C(T, A);
            case "<":
              Z = M[C(V, 1, -1)];
              break;
            default:
              var J = +V;
              if (J === 0) return z;
              if (J > B) {
                var X = m(J / 10);
                return X === 0 ? z : X <= B ? L[X - 1] === void 0 ? v(V, 1) : L[X - 1] + v(V, 1) : z;
              }
              Z = L[J - 1];
          }
          return Z === void 0 ? "" : Z;
        });
      };
    }, 4475: function(h, w, a) {
      var f = function(y) {
        return y && y.Math === Math && y;
      };
      h.exports = f(typeof globalThis == "object" && globalThis) || f(typeof window == "object" && window) || f(typeof self == "object" && self) || f(typeof a.g == "object" && a.g) || f(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (h, w, a) => {
      var f = a(9504), y = a(8981), m = f({}.hasOwnProperty);
      h.exports = Object.hasOwn || function(v, j) {
        return m(y(v), j);
      };
    }, 421: (h) => {
      h.exports = {};
    }, 3138: (h) => {
      h.exports = function(w, a) {
        try {
          arguments.length === 1 ? console.error(w) : console.error(w, a);
        } catch {
        }
      };
    }, 397: (h, w, a) => {
      var f = a(7751);
      h.exports = f("document", "documentElement");
    }, 5917: (h, w, a) => {
      var f = a(3724), y = a(9039), m = a(4055);
      h.exports = !f && !y(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (h, w, a) => {
      var f = a(9504), y = a(9039), m = a(4576), v = Object, j = f("".split);
      h.exports = y(function() {
        return !v("z").propertyIsEnumerable(0);
      }) ? function(C) {
        return m(C) === "String" ? j(C, "") : v(C);
      } : v;
    }, 3167: (h, w, a) => {
      var f = a(4901), y = a(34), m = a(2967);
      h.exports = function(v, j, C) {
        var k, E;
        return m && f(k = j.constructor) && k !== C && y(E = k.prototype) && E !== C.prototype && m(v, E), v;
      };
    }, 3706: (h, w, a) => {
      var f = a(9504), y = a(4901), m = a(7629), v = f(Function.toString);
      y(m.inspectSource) || (m.inspectSource = function(j) {
        return v(j);
      }), h.exports = m.inspectSource;
    }, 1181: (h, w, a) => {
      var f, y, m, v = a(8622), j = a(4475), C = a(34), k = a(6699), E = a(9297), P = a(7629), T = a(6119), I = a(421), L = "Object already initialized", M = j.TypeError, H = j.WeakMap;
      if (v || P.state) {
        var A = P.state || (P.state = new H());
        A.get = A.get, A.has = A.has, A.set = A.set, f = function(N, z) {
          if (A.has(N)) throw new M(L);
          return z.facade = N, A.set(N, z), z;
        }, y = function(N) {
          return A.get(N) || {};
        }, m = function(N) {
          return A.has(N);
        };
      } else {
        var B = T("state");
        I[B] = !0, f = function(N, z) {
          if (E(N, B)) throw new M(L);
          return z.facade = N, k(N, B, z), z;
        }, y = function(N) {
          return E(N, B) ? N[B] : {};
        }, m = function(N) {
          return E(N, B);
        };
      }
      h.exports = { set: f, get: y, has: m, enforce: function(N) {
        return m(N) ? y(N) : f(N, {});
      }, getterFor: function(N) {
        return function(z) {
          var V;
          if (!C(z) || (V = y(z)).type !== N) throw new M("Incompatible receiver, " + N + " required");
          return V;
        };
      } };
    }, 4209: (h, w, a) => {
      var f = a(8227), y = a(6269), m = f("iterator"), v = Array.prototype;
      h.exports = function(j) {
        return j !== void 0 && (y.Array === j || v[m] === j);
      };
    }, 4376: (h, w, a) => {
      var f = a(4576);
      h.exports = Array.isArray || function(y) {
        return f(y) === "Array";
      };
    }, 4901: (h) => {
      var w = typeof document == "object" && document.all;
      h.exports = w === void 0 && w !== void 0 ? function(a) {
        return typeof a == "function" || a === w;
      } : function(a) {
        return typeof a == "function";
      };
    }, 3517: (h, w, a) => {
      var f = a(9504), y = a(9039), m = a(4901), v = a(6955), j = a(7751), C = a(3706), k = function() {
      }, E = j("Reflect", "construct"), P = /^\s*(?:class|function)\b/, T = f(P.exec), I = !P.test(k), L = function(H) {
        if (!m(H)) return !1;
        try {
          return E(k, [], H), !0;
        } catch {
          return !1;
        }
      }, M = function(H) {
        if (!m(H)) return !1;
        switch (v(H)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return I || !!T(P, C(H));
        } catch {
          return !0;
        }
      };
      M.sham = !0, h.exports = !E || y(function() {
        var H;
        return L(L.call) || !L(Object) || !L(function() {
          H = !0;
        }) || H;
      }) ? M : L;
    }, 6575: (h, w, a) => {
      var f = a(9297);
      h.exports = function(y) {
        return y !== void 0 && (f(y, "value") || f(y, "writable"));
      };
    }, 2796: (h, w, a) => {
      var f = a(9039), y = a(4901), m = /#|\.prototype\./, v = function(P, T) {
        var I = C[j(P)];
        return I === E || I !== k && (y(T) ? f(T) : !!T);
      }, j = v.normalize = function(P) {
        return String(P).replace(m, ".").toLowerCase();
      }, C = v.data = {}, k = v.NATIVE = "N", E = v.POLYFILL = "P";
      h.exports = v;
    }, 4117: (h) => {
      h.exports = function(w) {
        return w == null;
      };
    }, 34: (h, w, a) => {
      var f = a(4901);
      h.exports = function(y) {
        return typeof y == "object" ? y !== null : f(y);
      };
    }, 3925: (h, w, a) => {
      var f = a(34);
      h.exports = function(y) {
        return f(y) || y === null;
      };
    }, 6395: (h) => {
      h.exports = !1;
    }, 788: (h, w, a) => {
      var f = a(34), y = a(4576), m = a(8227)("match");
      h.exports = function(v) {
        var j;
        return f(v) && ((j = v[m]) !== void 0 ? !!j : y(v) === "RegExp");
      };
    }, 757: (h, w, a) => {
      var f = a(7751), y = a(4901), m = a(1625), v = a(7040), j = Object;
      h.exports = v ? function(C) {
        return typeof C == "symbol";
      } : function(C) {
        var k = f("Symbol");
        return y(k) && m(k.prototype, j(C));
      };
    }, 2652: (h, w, a) => {
      var f = a(6080), y = a(9565), m = a(8551), v = a(6823), j = a(4209), C = a(6198), k = a(1625), E = a(81), P = a(851), T = a(9539), I = TypeError, L = function(H, A) {
        this.stopped = H, this.result = A;
      }, M = L.prototype;
      h.exports = function(H, A, B) {
        var N, z, V, Z, J, X, ce, oe = B && B.that, ne = !(!B || !B.AS_ENTRIES), me = !(!B || !B.IS_RECORD), fe = !(!B || !B.IS_ITERATOR), ke = !(!B || !B.INTERRUPTED), Ee = f(A, oe), Se = function(Re) {
          return N && T(N, "normal", Re), new L(!0, Re);
        }, ye = function(Re) {
          return ne ? (m(Re), ke ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : ke ? Ee(Re, Se) : Ee(Re);
        };
        if (me) N = H.iterator;
        else if (fe) N = H;
        else {
          if (!(z = P(H))) throw new I(v(H) + " is not iterable");
          if (j(z)) {
            for (V = 0, Z = C(H); Z > V; V++) if ((J = ye(H[V])) && k(M, J)) return J;
            return new L(!1);
          }
          N = E(H, z);
        }
        for (X = me ? H.next : N.next; !(ce = y(X, N)).done; ) {
          try {
            J = ye(ce.value);
          } catch (Re) {
            T(N, "throw", Re);
          }
          if (typeof J == "object" && J && k(M, J)) return J;
        }
        return new L(!1);
      };
    }, 9539: (h, w, a) => {
      var f = a(9565), y = a(8551), m = a(5966);
      h.exports = function(v, j, C) {
        var k, E;
        y(v);
        try {
          if (!(k = m(v, "return"))) {
            if (j === "throw") throw C;
            return C;
          }
          k = f(k, v);
        } catch (P) {
          E = !0, k = P;
        }
        if (j === "throw") throw C;
        if (E) throw k;
        return y(k), C;
      };
    }, 3994: (h, w, a) => {
      var f = a(7657).IteratorPrototype, y = a(2360), m = a(6980), v = a(687), j = a(6269), C = function() {
        return this;
      };
      h.exports = function(k, E, P, T) {
        var I = E + " Iterator";
        return k.prototype = y(f, { next: m(+!T, P) }), v(k, I, !1, !0), j[I] = C, k;
      };
    }, 1088: (h, w, a) => {
      var f = a(6518), y = a(9565), m = a(6395), v = a(350), j = a(4901), C = a(3994), k = a(2787), E = a(2967), P = a(687), T = a(6699), I = a(6840), L = a(8227), M = a(6269), H = a(7657), A = v.PROPER, B = v.CONFIGURABLE, N = H.IteratorPrototype, z = H.BUGGY_SAFARI_ITERATORS, V = L("iterator"), Z = "keys", J = "values", X = "entries", ce = function() {
        return this;
      };
      h.exports = function(oe, ne, me, fe, ke, Ee, Se) {
        C(me, ne, fe);
        var ye, Re, Pe, Fe = function(F) {
          if (F === ke && Ue) return Ue;
          if (!z && F && F in Ve) return Ve[F];
          switch (F) {
            case Z:
            case J:
            case X:
              return function() {
                return new me(this, F);
              };
          }
          return function() {
            return new me(this);
          };
        }, Ye = ne + " Iterator", tt = !1, Ve = oe.prototype, Te = Ve[V] || Ve["@@iterator"] || ke && Ve[ke], Ue = !z && Te || Fe(ke), R = ne === "Array" && Ve.entries || Te;
        if (R && (ye = k(R.call(new oe()))) !== Object.prototype && ye.next && (m || k(ye) === N || (E ? E(ye, N) : j(ye[V]) || I(ye, V, ce)), P(ye, Ye, !0, !0), m && (M[Ye] = ce)), A && ke === J && Te && Te.name !== J && (!m && B ? T(Ve, "name", J) : (tt = !0, Ue = function() {
          return y(Te, this);
        })), ke) if (Re = { values: Fe(J), keys: Ee ? Ue : Fe(Z), entries: Fe(X) }, Se) for (Pe in Re) (z || tt || !(Pe in Ve)) && I(Ve, Pe, Re[Pe]);
        else f({ target: ne, proto: !0, forced: z || tt }, Re);
        return m && !Se || Ve[V] === Ue || I(Ve, V, Ue, { name: ke }), M[ne] = Ue, Re;
      };
    }, 7657: (h, w, a) => {
      var f, y, m, v = a(9039), j = a(4901), C = a(34), k = a(2360), E = a(2787), P = a(6840), T = a(8227), I = a(6395), L = T("iterator"), M = !1;
      [].keys && ("next" in (m = [].keys()) ? (y = E(E(m))) !== Object.prototype && (f = y) : M = !0), !C(f) || v(function() {
        var H = {};
        return f[L].call(H) !== H;
      }) ? f = {} : I && (f = k(f)), j(f[L]) || P(f, L, function() {
        return this;
      }), h.exports = { IteratorPrototype: f, BUGGY_SAFARI_ITERATORS: M };
    }, 6269: (h) => {
      h.exports = {};
    }, 6198: (h, w, a) => {
      var f = a(8014);
      h.exports = function(y) {
        return f(y.length);
      };
    }, 283: (h, w, a) => {
      var f = a(9504), y = a(9039), m = a(4901), v = a(9297), j = a(3724), C = a(350).CONFIGURABLE, k = a(3706), E = a(1181), P = E.enforce, T = E.get, I = String, L = Object.defineProperty, M = f("".slice), H = f("".replace), A = f([].join), B = j && !y(function() {
        return L(function() {
        }, "length", { value: 8 }).length !== 8;
      }), N = String(String).split("String"), z = h.exports = function(V, Z, J) {
        M(I(Z), 0, 7) === "Symbol(" && (Z = "[" + H(I(Z), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), J && J.getter && (Z = "get " + Z), J && J.setter && (Z = "set " + Z), (!v(V, "name") || C && V.name !== Z) && (j ? L(V, "name", { value: Z, configurable: !0 }) : V.name = Z), B && J && v(J, "arity") && V.length !== J.arity && L(V, "length", { value: J.arity });
        try {
          J && v(J, "constructor") && J.constructor ? j && L(V, "prototype", { writable: !1 }) : V.prototype && (V.prototype = void 0);
        } catch {
        }
        var X = P(V);
        return v(X, "source") || (X.source = A(N, typeof Z == "string" ? Z : "")), V;
      };
      Function.prototype.toString = z(function() {
        return m(this) && T(this).source || k(this);
      }, "toString");
    }, 741: (h) => {
      var w = Math.ceil, a = Math.floor;
      h.exports = Math.trunc || function(f) {
        var y = +f;
        return (y > 0 ? a : w)(y);
      };
    }, 1955: (h, w, a) => {
      var f, y, m, v, j, C = a(4475), k = a(3389), E = a(6080), P = a(9225).set, T = a(8265), I = a(8119), L = a(28), M = a(6765), H = a(9088), A = C.MutationObserver || C.WebKitMutationObserver, B = C.document, N = C.process, z = C.Promise, V = k("queueMicrotask");
      if (!V) {
        var Z = new T(), J = function() {
          var X, ce;
          for (H && (X = N.domain) && X.exit(); ce = Z.get(); ) try {
            ce();
          } catch (oe) {
            throw Z.head && f(), oe;
          }
          X && X.enter();
        };
        I || H || M || !A || !B ? !L && z && z.resolve ? ((v = z.resolve(void 0)).constructor = z, j = E(v.then, v), f = function() {
          j(J);
        }) : H ? f = function() {
          N.nextTick(J);
        } : (P = E(P, C), f = function() {
          P(J);
        }) : (y = !0, m = B.createTextNode(""), new A(J).observe(m, { characterData: !0 }), f = function() {
          m.data = y = !y;
        }), V = function(X) {
          Z.head || f(), Z.add(X);
        };
      }
      h.exports = V;
    }, 6043: (h, w, a) => {
      var f = a(9306), y = TypeError, m = function(v) {
        var j, C;
        this.promise = new v(function(k, E) {
          if (j !== void 0 || C !== void 0) throw new y("Bad Promise constructor");
          j = k, C = E;
        }), this.resolve = f(j), this.reject = f(C);
      };
      h.exports.f = function(v) {
        return new m(v);
      };
    }, 5749: (h, w, a) => {
      var f = a(788), y = TypeError;
      h.exports = function(m) {
        if (f(m)) throw new y("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (h, w, a) => {
      var f = a(4475), y = a(9039), m = a(9504), v = a(655), j = a(3802).trim, C = a(7452), k = m("".charAt), E = f.parseFloat, P = f.Symbol, T = P && P.iterator, I = 1 / E(C + "-0") != -1 / 0 || T && !y(function() {
        E(Object(T));
      });
      h.exports = I ? function(L) {
        var M = j(v(L)), H = E(M);
        return H === 0 && k(M, 0) === "-" ? -0 : H;
      } : E;
    }, 2703: (h, w, a) => {
      var f = a(4475), y = a(9039), m = a(9504), v = a(655), j = a(3802).trim, C = a(7452), k = f.parseInt, E = f.Symbol, P = E && E.iterator, T = /^[+-]?0x/i, I = m(T.exec), L = k(C + "08") !== 8 || k(C + "0x16") !== 22 || P && !y(function() {
        k(Object(P));
      });
      h.exports = L ? function(M, H) {
        var A = j(v(M));
        return k(A, H >>> 0 || (I(T, A) ? 16 : 10));
      } : k;
    }, 4213: (h, w, a) => {
      var f = a(3724), y = a(9504), m = a(9565), v = a(9039), j = a(1072), C = a(3717), k = a(8773), E = a(8981), P = a(7055), T = Object.assign, I = Object.defineProperty, L = y([].concat);
      h.exports = !T || v(function() {
        if (f && T({ b: 1 }, T(I({}, "a", { enumerable: !0, get: function() {
          I(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var M = {}, H = {}, A = Symbol("assign detection"), B = "abcdefghijklmnopqrst";
        return M[A] = 7, B.split("").forEach(function(N) {
          H[N] = N;
        }), T({}, M)[A] !== 7 || j(T({}, H)).join("") !== B;
      }) ? function(M, H) {
        for (var A = E(M), B = arguments.length, N = 1, z = C.f, V = k.f; B > N; ) for (var Z, J = P(arguments[N++]), X = z ? L(j(J), z(J)) : j(J), ce = X.length, oe = 0; ce > oe; ) Z = X[oe++], f && !m(V, J, Z) || (A[Z] = J[Z]);
        return A;
      } : T;
    }, 2360: (h, w, a) => {
      var f, y = a(8551), m = a(6801), v = a(8727), j = a(421), C = a(397), k = a(4055), E = a(6119), P = "prototype", T = "script", I = E("IE_PROTO"), L = function() {
      }, M = function(B) {
        return "<" + T + ">" + B + "</" + T + ">";
      }, H = function(B) {
        B.write(M("")), B.close();
        var N = B.parentWindow.Object;
        return B = null, N;
      }, A = function() {
        try {
          f = new ActiveXObject("htmlfile");
        } catch {
        }
        var B, N, z;
        A = typeof document < "u" ? document.domain && f ? H(f) : (N = k("iframe"), z = "java" + T + ":", N.style.display = "none", C.appendChild(N), N.src = String(z), (B = N.contentWindow.document).open(), B.write(M("document.F=Object")), B.close(), B.F) : H(f);
        for (var V = v.length; V--; ) delete A[P][v[V]];
        return A();
      };
      j[I] = !0, h.exports = Object.create || function(B, N) {
        var z;
        return B !== null ? (L[P] = y(B), z = new L(), L[P] = null, z[I] = B) : z = A(), N === void 0 ? z : m.f(z, N);
      };
    }, 6801: (h, w, a) => {
      var f = a(3724), y = a(8686), m = a(4913), v = a(8551), j = a(5397), C = a(1072);
      w.f = f && !y ? Object.defineProperties : function(k, E) {
        v(k);
        for (var P, T = j(E), I = C(E), L = I.length, M = 0; L > M; ) m.f(k, P = I[M++], T[P]);
        return k;
      };
    }, 4913: (h, w, a) => {
      var f = a(3724), y = a(5917), m = a(8686), v = a(8551), j = a(6969), C = TypeError, k = Object.defineProperty, E = Object.getOwnPropertyDescriptor, P = "enumerable", T = "configurable", I = "writable";
      w.f = f ? m ? function(L, M, H) {
        if (v(L), M = j(M), v(H), typeof L == "function" && M === "prototype" && "value" in H && I in H && !H[I]) {
          var A = E(L, M);
          A && A[I] && (L[M] = H.value, H = { configurable: T in H ? H[T] : A[T], enumerable: P in H ? H[P] : A[P], writable: !1 });
        }
        return k(L, M, H);
      } : k : function(L, M, H) {
        if (v(L), M = j(M), v(H), y) try {
          return k(L, M, H);
        } catch {
        }
        if ("get" in H || "set" in H) throw new C("Accessors not supported");
        return "value" in H && (L[M] = H.value), L;
      };
    }, 7347: (h, w, a) => {
      var f = a(3724), y = a(9565), m = a(8773), v = a(6980), j = a(5397), C = a(6969), k = a(9297), E = a(5917), P = Object.getOwnPropertyDescriptor;
      w.f = f ? P : function(T, I) {
        if (T = j(T), I = C(I), E) try {
          return P(T, I);
        } catch {
        }
        if (k(T, I)) return v(!y(m.f, T, I), T[I]);
      };
    }, 298: (h, w, a) => {
      var f = a(4576), y = a(5397), m = a(8480).f, v = a(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      h.exports.f = function(C) {
        return j && f(C) === "Window" ? function(k) {
          try {
            return m(k);
          } catch {
            return v(j);
          }
        }(C) : m(y(C));
      };
    }, 8480: (h, w, a) => {
      var f = a(1828), y = a(8727).concat("length", "prototype");
      w.f = Object.getOwnPropertyNames || function(m) {
        return f(m, y);
      };
    }, 3717: (h, w) => {
      w.f = Object.getOwnPropertySymbols;
    }, 2787: (h, w, a) => {
      var f = a(9297), y = a(4901), m = a(8981), v = a(6119), j = a(2211), C = v("IE_PROTO"), k = Object, E = k.prototype;
      h.exports = j ? k.getPrototypeOf : function(P) {
        var T = m(P);
        if (f(T, C)) return T[C];
        var I = T.constructor;
        return y(I) && T instanceof I ? I.prototype : T instanceof k ? E : null;
      };
    }, 1625: (h, w, a) => {
      var f = a(9504);
      h.exports = f({}.isPrototypeOf);
    }, 1828: (h, w, a) => {
      var f = a(9504), y = a(9297), m = a(5397), v = a(9617).indexOf, j = a(421), C = f([].push);
      h.exports = function(k, E) {
        var P, T = m(k), I = 0, L = [];
        for (P in T) !y(j, P) && y(T, P) && C(L, P);
        for (; E.length > I; ) y(T, P = E[I++]) && (~v(L, P) || C(L, P));
        return L;
      };
    }, 1072: (h, w, a) => {
      var f = a(1828), y = a(8727);
      h.exports = Object.keys || function(m) {
        return f(m, y);
      };
    }, 8773: (h, w) => {
      var a = {}.propertyIsEnumerable, f = Object.getOwnPropertyDescriptor, y = f && !a.call({ 1: 2 }, 1);
      w.f = y ? function(m) {
        var v = f(this, m);
        return !!v && v.enumerable;
      } : a;
    }, 2967: (h, w, a) => {
      var f = a(6706), y = a(34), m = a(7750), v = a(3506);
      h.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, C = !1, k = {};
        try {
          (j = f(Object.prototype, "__proto__", "set"))(k, []), C = k instanceof Array;
        } catch {
        }
        return function(E, P) {
          return m(E), v(P), y(E) && (C ? j(E, P) : E.__proto__ = P), E;
        };
      }() : void 0);
    }, 2357: (h, w, a) => {
      var f = a(3724), y = a(9039), m = a(9504), v = a(2787), j = a(1072), C = a(5397), k = m(a(8773).f), E = m([].push), P = f && y(function() {
        var I = /* @__PURE__ */ Object.create(null);
        return I[2] = 2, !k(I, 2);
      }), T = function(I) {
        return function(L) {
          for (var M, H = C(L), A = j(H), B = P && v(H) === null, N = A.length, z = 0, V = []; N > z; ) M = A[z++], f && !(B ? M in H : k(H, M)) || E(V, I ? [M, H[M]] : H[M]);
          return V;
        };
      };
      h.exports = { entries: T(!0), values: T(!1) };
    }, 3179: (h, w, a) => {
      var f = a(2140), y = a(6955);
      h.exports = f ? {}.toString : function() {
        return "[object " + y(this) + "]";
      };
    }, 4270: (h, w, a) => {
      var f = a(9565), y = a(4901), m = a(34), v = TypeError;
      h.exports = function(j, C) {
        var k, E;
        if (C === "string" && y(k = j.toString) && !m(E = f(k, j)) || y(k = j.valueOf) && !m(E = f(k, j)) || C !== "string" && y(k = j.toString) && !m(E = f(k, j))) return E;
        throw new v("Can't convert object to primitive value");
      };
    }, 5031: (h, w, a) => {
      var f = a(7751), y = a(9504), m = a(8480), v = a(3717), j = a(8551), C = y([].concat);
      h.exports = f("Reflect", "ownKeys") || function(k) {
        var E = m.f(j(k)), P = v.f;
        return P ? C(E, P(k)) : E;
      };
    }, 9167: (h, w, a) => {
      var f = a(4475);
      h.exports = f;
    }, 1103: (h) => {
      h.exports = function(w) {
        try {
          return { error: !1, value: w() };
        } catch (a) {
          return { error: !0, value: a };
        }
      };
    }, 916: (h, w, a) => {
      var f = a(4475), y = a(550), m = a(4901), v = a(2796), j = a(3706), C = a(8227), k = a(7290), E = a(516), P = a(6395), T = a(7388), I = y && y.prototype, L = C("species"), M = !1, H = m(f.PromiseRejectionEvent), A = v("Promise", function() {
        var B = j(y), N = B !== String(y);
        if (!N && T === 66 || P && (!I.catch || !I.finally)) return !0;
        if (!T || T < 51 || !/native code/.test(B)) {
          var z = new y(function(Z) {
            Z(1);
          }), V = function(Z) {
            Z(function() {
            }, function() {
            });
          };
          if ((z.constructor = {})[L] = V, !(M = z.then(function() {
          }) instanceof V)) return !0;
        }
        return !N && (k || E) && !H;
      });
      h.exports = { CONSTRUCTOR: A, REJECTION_EVENT: H, SUBCLASSING: M };
    }, 550: (h, w, a) => {
      var f = a(4475);
      h.exports = f.Promise;
    }, 3438: (h, w, a) => {
      var f = a(8551), y = a(34), m = a(6043);
      h.exports = function(v, j) {
        if (f(v), y(j) && j.constructor === v) return j;
        var C = m.f(v);
        return (0, C.resolve)(j), C.promise;
      };
    }, 537: (h, w, a) => {
      var f = a(550), y = a(4428), m = a(916).CONSTRUCTOR;
      h.exports = m || !y(function(v) {
        f.all(v).then(void 0, function() {
        });
      });
    }, 1056: (h, w, a) => {
      var f = a(4913).f;
      h.exports = function(y, m, v) {
        v in y || f(y, v, { configurable: !0, get: function() {
          return m[v];
        }, set: function(j) {
          m[v] = j;
        } });
      };
    }, 8265: (h) => {
      var w = function() {
        this.head = null, this.tail = null;
      };
      w.prototype = { add: function(a) {
        var f = { item: a, next: null }, y = this.tail;
        y ? y.next = f : this.head = f, this.tail = f;
      }, get: function() {
        var a = this.head;
        if (a) return (this.head = a.next) === null && (this.tail = null), a.item;
      } }, h.exports = w;
    }, 6682: (h, w, a) => {
      var f = a(9565), y = a(8551), m = a(4901), v = a(4576), j = a(7323), C = TypeError;
      h.exports = function(k, E) {
        var P = k.exec;
        if (m(P)) {
          var T = f(P, k, E);
          return T !== null && y(T), T;
        }
        if (v(k) === "RegExp") return f(j, k, E);
        throw new C("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (h, w, a) => {
      var f, y, m = a(9565), v = a(9504), j = a(655), C = a(7979), k = a(8429), E = a(5745), P = a(2360), T = a(1181).get, I = a(3635), L = a(8814), M = E("native-string-replace", String.prototype.replace), H = RegExp.prototype.exec, A = H, B = v("".charAt), N = v("".indexOf), z = v("".replace), V = v("".slice), Z = (y = /b*/g, m(H, f = /a/, "a"), m(H, y, "a"), f.lastIndex !== 0 || y.lastIndex !== 0), J = k.BROKEN_CARET, X = /()??/.exec("")[1] !== void 0;
      (Z || X || J || I || L) && (A = function(ce) {
        var oe, ne, me, fe, ke, Ee, Se, ye = this, Re = T(ye), Pe = j(ce), Fe = Re.raw;
        if (Fe) return Fe.lastIndex = ye.lastIndex, oe = m(A, Fe, Pe), ye.lastIndex = Fe.lastIndex, oe;
        var Ye = Re.groups, tt = J && ye.sticky, Ve = m(C, ye), Te = ye.source, Ue = 0, R = Pe;
        if (tt && (Ve = z(Ve, "y", ""), N(Ve, "g") === -1 && (Ve += "g"), R = V(Pe, ye.lastIndex), ye.lastIndex > 0 && (!ye.multiline || ye.multiline && B(Pe, ye.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", R = " " + R, Ue++), ne = new RegExp("^(?:" + Te + ")", Ve)), X && (ne = new RegExp("^" + Te + "$(?!\\s)", Ve)), Z && (me = ye.lastIndex), fe = m(H, tt ? ne : ye, R), tt ? fe ? (fe.input = V(fe.input, Ue), fe[0] = V(fe[0], Ue), fe.index = ye.lastIndex, ye.lastIndex += fe[0].length) : ye.lastIndex = 0 : Z && fe && (ye.lastIndex = ye.global ? fe.index + fe[0].length : me), X && fe && fe.length > 1 && m(M, fe[0], ne, function() {
          for (ke = 1; ke < arguments.length - 2; ke++) arguments[ke] === void 0 && (fe[ke] = void 0);
        }), fe && Ye) for (fe.groups = Ee = P(null), ke = 0; ke < Ye.length; ke++) Ee[(Se = Ye[ke])[0]] = fe[Se[1]];
        return fe;
      }), h.exports = A;
    }, 7979: (h, w, a) => {
      var f = a(8551);
      h.exports = function() {
        var y = f(this), m = "";
        return y.hasIndices && (m += "d"), y.global && (m += "g"), y.ignoreCase && (m += "i"), y.multiline && (m += "m"), y.dotAll && (m += "s"), y.unicode && (m += "u"), y.unicodeSets && (m += "v"), y.sticky && (m += "y"), m;
      };
    }, 1034: (h, w, a) => {
      var f = a(9565), y = a(9297), m = a(1625), v = a(7979), j = RegExp.prototype;
      h.exports = function(C) {
        var k = C.flags;
        return k !== void 0 || "flags" in j || y(C, "flags") || !m(j, C) ? k : f(v, C);
      };
    }, 8429: (h, w, a) => {
      var f = a(9039), y = a(4475).RegExp, m = f(function() {
        var C = y("a", "y");
        return C.lastIndex = 2, C.exec("abcd") !== null;
      }), v = m || f(function() {
        return !y("a", "y").sticky;
      }), j = m || f(function() {
        var C = y("^r", "gy");
        return C.lastIndex = 2, C.exec("str") !== null;
      });
      h.exports = { BROKEN_CARET: j, MISSED_STICKY: v, UNSUPPORTED_Y: m };
    }, 3635: (h, w, a) => {
      var f = a(9039), y = a(4475).RegExp;
      h.exports = f(function() {
        var m = y(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (h, w, a) => {
      var f = a(9039), y = a(4475).RegExp;
      h.exports = f(function() {
        var m = y("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (h, w, a) => {
      var f = a(4117), y = TypeError;
      h.exports = function(m) {
        if (f(m)) throw new y("Can't call method on " + m);
        return m;
      };
    }, 3389: (h, w, a) => {
      var f = a(4475), y = a(3724), m = Object.getOwnPropertyDescriptor;
      h.exports = function(v) {
        if (!y) return f[v];
        var j = m(f, v);
        return j && j.value;
      };
    }, 9472: (h, w, a) => {
      var f, y = a(4475), m = a(8745), v = a(4901), j = a(6763), C = a(9392), k = a(7680), E = a(2812), P = y.Function, T = /MSIE .\./.test(C) || j && ((f = y.Bun.version.split(".")).length < 3 || f[0] === "0" && (f[1] < 3 || f[1] === "3" && f[2] === "0"));
      h.exports = function(I, L) {
        var M = L ? 2 : 1;
        return T ? function(H, A) {
          var B = E(arguments.length, 1) > M, N = v(H) ? H : P(H), z = B ? k(arguments, M) : [], V = B ? function() {
            m(N, this, z);
          } : N;
          return L ? I(V, A) : I(V);
        } : I;
      };
    }, 7633: (h, w, a) => {
      var f = a(7751), y = a(2106), m = a(8227), v = a(3724), j = m("species");
      h.exports = function(C) {
        var k = f(C);
        v && k && !k[j] && y(k, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (h, w, a) => {
      var f = a(4913).f, y = a(9297), m = a(8227)("toStringTag");
      h.exports = function(v, j, C) {
        v && !C && (v = v.prototype), v && !y(v, m) && f(v, m, { configurable: !0, value: j });
      };
    }, 6119: (h, w, a) => {
      var f = a(5745), y = a(3392), m = f("keys");
      h.exports = function(v) {
        return m[v] || (m[v] = y(v));
      };
    }, 7629: (h, w, a) => {
      var f = a(6395), y = a(4475), m = a(9433), v = "__core-js_shared__", j = h.exports = y[v] || m(v, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: f ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (h, w, a) => {
      var f = a(7629);
      h.exports = function(y, m) {
        return f[y] || (f[y] = m || {});
      };
    }, 2293: (h, w, a) => {
      var f = a(8551), y = a(5548), m = a(4117), v = a(8227)("species");
      h.exports = function(j, C) {
        var k, E = f(j).constructor;
        return E === void 0 || m(k = f(E)[v]) ? C : y(k);
      };
    }, 8183: (h, w, a) => {
      var f = a(9504), y = a(1291), m = a(655), v = a(7750), j = f("".charAt), C = f("".charCodeAt), k = f("".slice), E = function(P) {
        return function(T, I) {
          var L, M, H = m(v(T)), A = y(I), B = H.length;
          return A < 0 || A >= B ? P ? "" : void 0 : (L = C(H, A)) < 55296 || L > 56319 || A + 1 === B || (M = C(H, A + 1)) < 56320 || M > 57343 ? P ? j(H, A) : L : P ? k(H, A, A + 2) : M - 56320 + (L - 55296 << 10) + 65536;
        };
      };
      h.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (h, w, a) => {
      var f = a(9504), y = a(8014), m = a(655), v = a(2333), j = a(7750), C = f(v), k = f("".slice), E = Math.ceil, P = function(T) {
        return function(I, L, M) {
          var H, A, B = m(j(I)), N = y(L), z = B.length, V = M === void 0 ? " " : m(M);
          return N <= z || V === "" ? B : ((A = C(V, E((H = N - z) / V.length))).length > H && (A = k(A, 0, H)), T ? B + A : A + B);
        };
      };
      h.exports = { start: P(!1), end: P(!0) };
    }, 2333: (h, w, a) => {
      var f = a(1291), y = a(655), m = a(7750), v = RangeError;
      h.exports = function(j) {
        var C = y(m(this)), k = "", E = f(j);
        if (E < 0 || E === 1 / 0) throw new v("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (C += C)) 1 & E && (k += C);
        return k;
      };
    }, 706: (h, w, a) => {
      var f = a(350).PROPER, y = a(9039), m = a(7452);
      h.exports = function(v) {
        return y(function() {
          return !!m[v]() || "​᠎"[v]() !== "​᠎" || f && m[v].name !== v;
        });
      };
    }, 3802: (h, w, a) => {
      var f = a(9504), y = a(7750), m = a(655), v = a(7452), j = f("".replace), C = RegExp("^[" + v + "]+"), k = RegExp("(^|[^" + v + "])[" + v + "]+$"), E = function(P) {
        return function(T) {
          var I = m(y(T));
          return 1 & P && (I = j(I, C, "")), 2 & P && (I = j(I, k, "$1")), I;
        };
      };
      h.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (h, w, a) => {
      var f = a(7388), y = a(9039), m = a(4475).String;
      h.exports = !!Object.getOwnPropertySymbols && !y(function() {
        var v = Symbol("symbol detection");
        return !m(v) || !(Object(v) instanceof Symbol) || !Symbol.sham && f && f < 41;
      });
    }, 8242: (h, w, a) => {
      var f = a(9565), y = a(7751), m = a(8227), v = a(6840);
      h.exports = function() {
        var j = y("Symbol"), C = j && j.prototype, k = C && C.valueOf, E = m("toPrimitive");
        C && !C[E] && v(C, E, function(P) {
          return f(k, this);
        }, { arity: 1 });
      };
    }, 1296: (h, w, a) => {
      var f = a(4495);
      h.exports = f && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (h, w, a) => {
      var f, y, m, v, j = a(4475), C = a(8745), k = a(6080), E = a(4901), P = a(9297), T = a(9039), I = a(397), L = a(7680), M = a(4055), H = a(2812), A = a(8119), B = a(9088), N = j.setImmediate, z = j.clearImmediate, V = j.process, Z = j.Dispatch, J = j.Function, X = j.MessageChannel, ce = j.String, oe = 0, ne = {}, me = "onreadystatechange";
      T(function() {
        f = j.location;
      });
      var fe = function(ye) {
        if (P(ne, ye)) {
          var Re = ne[ye];
          delete ne[ye], Re();
        }
      }, ke = function(ye) {
        return function() {
          fe(ye);
        };
      }, Ee = function(ye) {
        fe(ye.data);
      }, Se = function(ye) {
        j.postMessage(ce(ye), f.protocol + "//" + f.host);
      };
      N && z || (N = function(ye) {
        H(arguments.length, 1);
        var Re = E(ye) ? ye : J(ye), Pe = L(arguments, 1);
        return ne[++oe] = function() {
          C(Re, void 0, Pe);
        }, y(oe), oe;
      }, z = function(ye) {
        delete ne[ye];
      }, B ? y = function(ye) {
        V.nextTick(ke(ye));
      } : Z && Z.now ? y = function(ye) {
        Z.now(ke(ye));
      } : X && !A ? (v = (m = new X()).port2, m.port1.onmessage = Ee, y = k(v.postMessage, v)) : j.addEventListener && E(j.postMessage) && !j.importScripts && f && f.protocol !== "file:" && !T(Se) ? (y = Se, j.addEventListener("message", Ee, !1)) : y = me in M("script") ? function(ye) {
        I.appendChild(M("script"))[me] = function() {
          I.removeChild(this), fe(ye);
        };
      } : function(ye) {
        setTimeout(ke(ye), 0);
      }), h.exports = { set: N, clear: z };
    }, 1240: (h, w, a) => {
      var f = a(9504);
      h.exports = f(1 .valueOf);
    }, 5610: (h, w, a) => {
      var f = a(1291), y = Math.max, m = Math.min;
      h.exports = function(v, j) {
        var C = f(v);
        return C < 0 ? y(C + j, 0) : m(C, j);
      };
    }, 5397: (h, w, a) => {
      var f = a(7055), y = a(7750);
      h.exports = function(m) {
        return f(y(m));
      };
    }, 1291: (h, w, a) => {
      var f = a(741);
      h.exports = function(y) {
        var m = +y;
        return m != m || m === 0 ? 0 : f(m);
      };
    }, 8014: (h, w, a) => {
      var f = a(1291), y = Math.min;
      h.exports = function(m) {
        var v = f(m);
        return v > 0 ? y(v, 9007199254740991) : 0;
      };
    }, 8981: (h, w, a) => {
      var f = a(7750), y = Object;
      h.exports = function(m) {
        return y(f(m));
      };
    }, 2777: (h, w, a) => {
      var f = a(9565), y = a(34), m = a(757), v = a(5966), j = a(4270), C = a(8227), k = TypeError, E = C("toPrimitive");
      h.exports = function(P, T) {
        if (!y(P) || m(P)) return P;
        var I, L = v(P, E);
        if (L) {
          if (T === void 0 && (T = "default"), I = f(L, P, T), !y(I) || m(I)) return I;
          throw new k("Can't convert object to primitive value");
        }
        return T === void 0 && (T = "number"), j(P, T);
      };
    }, 6969: (h, w, a) => {
      var f = a(2777), y = a(757);
      h.exports = function(m) {
        var v = f(m, "string");
        return y(v) ? v : v + "";
      };
    }, 2140: (h, w, a) => {
      var f = {};
      f[a(8227)("toStringTag")] = "z", h.exports = String(f) === "[object z]";
    }, 655: (h, w, a) => {
      var f = a(6955), y = String;
      h.exports = function(m) {
        if (f(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return y(m);
      };
    }, 6823: (h) => {
      var w = String;
      h.exports = function(a) {
        try {
          return w(a);
        } catch {
          return "Object";
        }
      };
    }, 3392: (h, w, a) => {
      var f = a(9504), y = 0, m = Math.random(), v = f(1 .toString);
      h.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + v(++y + m, 36);
      };
    }, 7040: (h, w, a) => {
      var f = a(4495);
      h.exports = f && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (h, w, a) => {
      var f = a(3724), y = a(9039);
      h.exports = f && y(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (h) => {
      var w = TypeError;
      h.exports = function(a, f) {
        if (a < f) throw new w("Not enough arguments");
        return a;
      };
    }, 8622: (h, w, a) => {
      var f = a(4475), y = a(4901), m = f.WeakMap;
      h.exports = y(m) && /native code/.test(String(m));
    }, 511: (h, w, a) => {
      var f = a(9167), y = a(9297), m = a(1951), v = a(4913).f;
      h.exports = function(j) {
        var C = f.Symbol || (f.Symbol = {});
        y(C, j) || v(C, j, { value: m.f(j) });
      };
    }, 1951: (h, w, a) => {
      var f = a(8227);
      w.f = f;
    }, 8227: (h, w, a) => {
      var f = a(4475), y = a(5745), m = a(9297), v = a(3392), j = a(4495), C = a(7040), k = f.Symbol, E = y("wks"), P = C ? k.for || k : k && k.withoutSetter || v;
      h.exports = function(T) {
        return m(E, T) || (E[T] = j && m(k, T) ? k[T] : P("Symbol." + T)), E[T];
      };
    }, 7452: (h) => {
      h.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (h, w, a) => {
      var f = a(6518), y = a(9039), m = a(4376), v = a(34), j = a(8981), C = a(6198), k = a(6837), E = a(4659), P = a(1469), T = a(597), I = a(8227), L = a(7388), M = I("isConcatSpreadable"), H = L >= 51 || !y(function() {
        var B = [];
        return B[M] = !1, B.concat()[0] !== B;
      }), A = function(B) {
        if (!v(B)) return !1;
        var N = B[M];
        return N !== void 0 ? !!N : m(B);
      };
      f({ target: "Array", proto: !0, arity: 1, forced: !H || !T("concat") }, { concat: function(B) {
        var N, z, V, Z, J, X = j(this), ce = P(X, 0), oe = 0;
        for (N = -1, V = arguments.length; N < V; N++) if (A(J = N === -1 ? X : arguments[N])) for (Z = C(J), k(oe + Z), z = 0; z < Z; z++, oe++) z in J && E(ce, oe, J[z]);
        else k(oe + 1), E(ce, oe++, J);
        return ce.length = oe, ce;
      } });
    }, 8431: (h, w, a) => {
      var f = a(6518), y = a(9213).every;
      f({ target: "Array", proto: !0, forced: !a(4598)("every") }, { every: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (h, w, a) => {
      var f = a(6518), y = a(9213).filter;
      f({ target: "Array", proto: !0, forced: !a(597)("filter") }, { filter: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (h, w, a) => {
      var f = a(6518), y = a(9213).find, m = a(6469), v = "find", j = !0;
      v in [] && Array(1)[v](function() {
        j = !1;
      }), f({ target: "Array", proto: !0, forced: j }, { find: function(C) {
        return y(this, C, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(v);
    }, 1629: (h, w, a) => {
      var f = a(6518), y = a(235);
      f({ target: "Array", proto: !0, forced: [].forEach !== y }, { forEach: y });
    }, 3418: (h, w, a) => {
      var f = a(6518), y = a(7916);
      f({ target: "Array", stat: !0, forced: !a(4428)(function(m) {
        Array.from(m);
      }) }, { from: y });
    }, 4423: (h, w, a) => {
      var f = a(6518), y = a(9617).includes, m = a(9039), v = a(6469);
      f({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return y(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), v("includes");
    }, 5276: (h, w, a) => {
      var f = a(6518), y = a(7476), m = a(9617).indexOf, v = a(4598), j = y([].indexOf), C = !!j && 1 / j([1], 1, -0) < 0;
      f({ target: "Array", proto: !0, forced: C || !v("indexOf") }, { indexOf: function(k) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return C ? j(this, k, E) || 0 : m(this, k, E);
      } });
    }, 4346: (h, w, a) => {
      a(6518)({ target: "Array", stat: !0 }, { isArray: a(4376) });
    }, 3792: (h, w, a) => {
      var f = a(5397), y = a(6469), m = a(6269), v = a(1181), j = a(4913).f, C = a(1088), k = a(2529), E = a(6395), P = a(3724), T = "Array Iterator", I = v.set, L = v.getterFor(T);
      h.exports = C(Array, "Array", function(H, A) {
        I(this, { type: T, target: f(H), index: 0, kind: A });
      }, function() {
        var H = L(this), A = H.target, B = H.index++;
        if (!A || B >= A.length) return H.target = void 0, k(void 0, !0);
        switch (H.kind) {
          case "keys":
            return k(B, !1);
          case "values":
            return k(A[B], !1);
        }
        return k([B, A[B]], !1);
      }, "values");
      var M = m.Arguments = m.Array;
      if (y("keys"), y("values"), y("entries"), !E && P && M.name !== "values") try {
        j(M, "name", { value: "values" });
      } catch {
      }
    }, 8598: (h, w, a) => {
      var f = a(6518), y = a(9504), m = a(7055), v = a(5397), j = a(4598), C = y([].join);
      f({ target: "Array", proto: !0, forced: m !== Object || !j("join", ",") }, { join: function(k) {
        return C(v(this), k === void 0 ? "," : k);
      } });
    }, 2062: (h, w, a) => {
      var f = a(6518), y = a(9213).map;
      f({ target: "Array", proto: !0, forced: !a(597)("map") }, { map: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (h, w, a) => {
      var f = a(6518), y = a(926).left, m = a(4598), v = a(7388);
      f({ target: "Array", proto: !0, forced: !a(9088) && v > 79 && v < 83 || !m("reduce") }, { reduce: function(j) {
        var C = arguments.length;
        return y(this, j, C, C > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (h, w, a) => {
      var f = a(6518), y = a(9504), m = a(4376), v = y([].reverse), j = [1, 2];
      f({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), v(this);
      } });
    }, 4782: (h, w, a) => {
      var f = a(6518), y = a(4376), m = a(3517), v = a(34), j = a(5610), C = a(6198), k = a(5397), E = a(4659), P = a(8227), T = a(597), I = a(7680), L = T("slice"), M = P("species"), H = Array, A = Math.max;
      f({ target: "Array", proto: !0, forced: !L }, { slice: function(B, N) {
        var z, V, Z, J = k(this), X = C(J), ce = j(B, X), oe = j(N === void 0 ? X : N, X);
        if (y(J) && (z = J.constructor, (m(z) && (z === H || y(z.prototype)) || v(z) && (z = z[M]) === null) && (z = void 0), z === H || z === void 0)) return I(J, ce, oe);
        for (V = new (z === void 0 ? H : z)(A(oe - ce, 0)), Z = 0; ce < oe; ce++, Z++) ce in J && E(V, Z, J[ce]);
        return V.length = Z, V;
      } });
    }, 5086: (h, w, a) => {
      var f = a(6518), y = a(9213).some;
      f({ target: "Array", proto: !0, forced: !a(4598)("some") }, { some: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (h, w, a) => {
      var f = a(6518), y = a(9504), m = a(9306), v = a(8981), j = a(6198), C = a(4606), k = a(655), E = a(9039), P = a(4488), T = a(4598), I = a(8834), L = a(3202), M = a(7388), H = a(9160), A = [], B = y(A.sort), N = y(A.push), z = E(function() {
        A.sort(void 0);
      }), V = E(function() {
        A.sort(null);
      }), Z = T("sort"), J = !E(function() {
        if (M) return M < 70;
        if (!(I && I > 3)) {
          if (L) return !0;
          if (H) return H < 603;
          var X, ce, oe, ne, me = "";
          for (X = 65; X < 76; X++) {
            switch (ce = String.fromCharCode(X), X) {
              case 66:
              case 69:
              case 70:
              case 72:
                oe = 3;
                break;
              case 68:
              case 71:
                oe = 4;
                break;
              default:
                oe = 2;
            }
            for (ne = 0; ne < 47; ne++) A.push({ k: ce + ne, v: oe });
          }
          for (A.sort(function(fe, ke) {
            return ke.v - fe.v;
          }), ne = 0; ne < A.length; ne++) ce = A[ne].k.charAt(0), me.charAt(me.length - 1) !== ce && (me += ce);
          return me !== "DGBEFHACIJK";
        }
      });
      f({ target: "Array", proto: !0, forced: z || !V || !Z || !J }, { sort: function(X) {
        X !== void 0 && m(X);
        var ce = v(this);
        if (J) return X === void 0 ? B(ce) : B(ce, X);
        var oe, ne, me = [], fe = j(ce);
        for (ne = 0; ne < fe; ne++) ne in ce && N(me, ce[ne]);
        for (P(me, /* @__PURE__ */ function(ke) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : ke !== void 0 ? +ke(Ee, Se) || 0 : k(Ee) > k(Se) ? 1 : -1;
          };
        }(X)), oe = j(me), ne = 0; ne < oe; ) ce[ne] = me[ne++];
        for (; ne < fe; ) C(ce, ne++);
        return ce;
      } });
    }, 4554: (h, w, a) => {
      var f = a(6518), y = a(8981), m = a(5610), v = a(1291), j = a(6198), C = a(4527), k = a(6837), E = a(1469), P = a(4659), T = a(4606), I = a(597)("splice"), L = Math.max, M = Math.min;
      f({ target: "Array", proto: !0, forced: !I }, { splice: function(H, A) {
        var B, N, z, V, Z, J, X = y(this), ce = j(X), oe = m(H, ce), ne = arguments.length;
        for (ne === 0 ? B = N = 0 : ne === 1 ? (B = 0, N = ce - oe) : (B = ne - 2, N = M(L(v(A), 0), ce - oe)), k(ce + B - N), z = E(X, N), V = 0; V < N; V++) (Z = oe + V) in X && P(z, V, X[Z]);
        if (z.length = N, B < N) {
          for (V = oe; V < ce - N; V++) J = V + B, (Z = V + N) in X ? X[J] = X[Z] : T(X, J);
          for (V = ce; V > ce - N + B; V--) T(X, V - 1);
        } else if (B > N) for (V = ce - N; V > oe; V--) J = V + B - 1, (Z = V + N - 1) in X ? X[J] = X[Z] : T(X, J);
        for (V = 0; V < B; V++) X[V + oe] = arguments[V + 2];
        return C(X, ce - N + B), z;
      } });
    }, 1688: (h, w, a) => {
      var f = a(6518), y = a(380);
      f({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== y }, { toISOString: y });
    }, 739: (h, w, a) => {
      var f = a(6518), y = a(9039), m = a(8981), v = a(2777);
      f({ target: "Date", proto: !0, arity: 1, forced: y(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var C = m(this), k = v(C, "number");
        return typeof k != "number" || isFinite(k) ? C.toISOString() : null;
      } });
    }, 9572: (h, w, a) => {
      var f = a(9297), y = a(6840), m = a(3640), v = a(8227)("toPrimitive"), j = Date.prototype;
      f(j, v) || y(j, v, m);
    }, 3288: (h, w, a) => {
      var f = a(9504), y = a(6840), m = Date.prototype, v = "Invalid Date", j = "toString", C = f(m[j]), k = f(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== v && y(m, j, function() {
        var E = k(this);
        return E == E ? C(this) : v;
      });
    }, 4170: (h, w, a) => {
      var f = a(6518), y = a(566);
      f({ target: "Function", proto: !0, forced: Function.bind !== y }, { bind: y });
    }, 2010: (h, w, a) => {
      var f = a(3724), y = a(350).EXISTS, m = a(9504), v = a(2106), j = Function.prototype, C = m(j.toString), k = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = m(k.exec);
      f && !y && v(j, "name", { configurable: !0, get: function() {
        try {
          return E(k, C(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (h, w, a) => {
      var f = a(6518), y = a(7751), m = a(8745), v = a(9565), j = a(9504), C = a(9039), k = a(4901), E = a(757), P = a(7680), T = a(6933), I = a(4495), L = String, M = y("JSON", "stringify"), H = j(/./.exec), A = j("".charAt), B = j("".charCodeAt), N = j("".replace), z = j(1 .toString), V = /[\uD800-\uDFFF]/g, Z = /^[\uD800-\uDBFF]$/, J = /^[\uDC00-\uDFFF]$/, X = !I || C(function() {
        var me = y("Symbol")("stringify detection");
        return M([me]) !== "[null]" || M({ a: me }) !== "{}" || M(Object(me)) !== "{}";
      }), ce = C(function() {
        return M("\uDF06\uD834") !== '"\\udf06\\ud834"' || M("\uDEAD") !== '"\\udead"';
      }), oe = function(me, fe) {
        var ke = P(arguments), Ee = T(fe);
        if (k(Ee) || me !== void 0 && !E(me)) return ke[1] = function(Se, ye) {
          if (k(Ee) && (ye = v(Ee, this, L(Se), ye)), !E(ye)) return ye;
        }, m(M, null, ke);
      }, ne = function(me, fe, ke) {
        var Ee = A(ke, fe - 1), Se = A(ke, fe + 1);
        return H(Z, me) && !H(J, Se) || H(J, me) && !H(Z, Ee) ? "\\u" + z(B(me, 0), 16) : me;
      };
      M && f({ target: "JSON", stat: !0, arity: 3, forced: X || ce }, { stringify: function(me, fe, ke) {
        var Ee = P(arguments), Se = m(X ? oe : M, null, Ee);
        return ce && typeof Se == "string" ? N(Se, V, ne) : Se;
      } });
    }, 4731: (h, w, a) => {
      var f = a(4475);
      a(687)(f.JSON, "JSON", !0);
    }, 479: (h, w, a) => {
      a(687)(Math, "Math", !0);
    }, 2892: (h, w, a) => {
      var f = a(6518), y = a(6395), m = a(3724), v = a(4475), j = a(9167), C = a(9504), k = a(2796), E = a(9297), P = a(3167), T = a(1625), I = a(757), L = a(2777), M = a(9039), H = a(8480).f, A = a(7347).f, B = a(4913).f, N = a(1240), z = a(3802).trim, V = "Number", Z = v[V], J = j[V], X = Z.prototype, ce = v.TypeError, oe = C("".slice), ne = C("".charCodeAt), me = k(V, !Z(" 0o1") || !Z("0b1") || Z("+0x1")), fe = function(Ee) {
        var Se, ye = arguments.length < 1 ? 0 : Z(function(Re) {
          var Pe = L(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(Fe) {
            var Ye, tt, Ve, Te, Ue, R, F, W, Y = L(Fe, "number");
            if (I(Y)) throw new ce("Cannot convert a Symbol value to a number");
            if (typeof Y == "string" && Y.length > 2) {
              if (Y = z(Y), (Ye = ne(Y, 0)) === 43 || Ye === 45) {
                if ((tt = ne(Y, 2)) === 88 || tt === 120) return NaN;
              } else if (Ye === 48) {
                switch (ne(Y, 1)) {
                  case 66:
                  case 98:
                    Ve = 2, Te = 49;
                    break;
                  case 79:
                  case 111:
                    Ve = 8, Te = 55;
                    break;
                  default:
                    return +Y;
                }
                for (R = (Ue = oe(Y, 2)).length, F = 0; F < R; F++) if ((W = ne(Ue, F)) < 48 || W > Te) return NaN;
                return parseInt(Ue, Ve);
              }
            }
            return +Y;
          }(Pe);
        }(Ee));
        return T(X, Se = this) && M(function() {
          N(Se);
        }) ? P(Object(ye), this, fe) : ye;
      };
      fe.prototype = X, me && !y && (X.constructor = fe), f({ global: !0, constructor: !0, wrap: !0, forced: me }, { Number: fe });
      var ke = function(Ee, Se) {
        for (var ye, Re = m ? H(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, ye = Re[Pe]) && !E(Ee, ye) && B(Ee, ye, A(Se, ye));
      };
      y && J && ke(j[V], J), (me || y) && ke(j[V], Z);
    }, 9868: (h, w, a) => {
      var f = a(6518), y = a(9504), m = a(1291), v = a(1240), j = a(2333), C = a(9039), k = RangeError, E = String, P = Math.floor, T = y(j), I = y("".slice), L = y(1 .toFixed), M = function(N, z, V) {
        return z === 0 ? V : z % 2 == 1 ? M(N, z - 1, V * N) : M(N * N, z / 2, V);
      }, H = function(N, z, V) {
        for (var Z = -1, J = V; ++Z < 6; ) J += z * N[Z], N[Z] = J % 1e7, J = P(J / 1e7);
      }, A = function(N, z) {
        for (var V = 6, Z = 0; --V >= 0; ) Z += N[V], N[V] = P(Z / z), Z = Z % z * 1e7;
      }, B = function(N) {
        for (var z = 6, V = ""; --z >= 0; ) if (V !== "" || z === 0 || N[z] !== 0) {
          var Z = E(N[z]);
          V = V === "" ? Z : V + T("0", 7 - Z.length) + Z;
        }
        return V;
      };
      f({ target: "Number", proto: !0, forced: C(function() {
        return L(8e-5, 3) !== "0.000" || L(0.9, 0) !== "1" || L(1.255, 2) !== "1.25" || L(1000000000000000100, 0) !== "1000000000000000128";
      }) || !C(function() {
        L({});
      }) }, { toFixed: function(N) {
        var z, V, Z, J, X = v(this), ce = m(N), oe = [0, 0, 0, 0, 0, 0], ne = "", me = "0";
        if (ce < 0 || ce > 20) throw new k("Incorrect fraction digits");
        if (X != X) return "NaN";
        if (X <= -1e21 || X >= 1e21) return E(X);
        if (X < 0 && (ne = "-", X = -X), X > 1e-21) if (V = (z = function(fe) {
          for (var ke = 0, Ee = fe; Ee >= 4096; ) ke += 12, Ee /= 4096;
          for (; Ee >= 2; ) ke += 1, Ee /= 2;
          return ke;
        }(X * M(2, 69, 1)) - 69) < 0 ? X * M(2, -z, 1) : X / M(2, z, 1), V *= 4503599627370496, (z = 52 - z) > 0) {
          for (H(oe, 0, V), Z = ce; Z >= 7; ) H(oe, 1e7, 0), Z -= 7;
          for (H(oe, M(10, Z, 1), 0), Z = z - 1; Z >= 23; ) A(oe, 8388608), Z -= 23;
          A(oe, 1 << Z), H(oe, 1, 1), A(oe, 2), me = B(oe);
        } else H(oe, 0, V), H(oe, 1 << -z, 0), me = B(oe) + T("0", ce);
        return ce > 0 ? ne + ((J = me.length) <= ce ? "0." + T("0", ce - J) + me : I(me, 0, J - ce) + "." + I(me, J - ce)) : ne + me;
      } });
    }, 9085: (h, w, a) => {
      var f = a(6518), y = a(4213);
      f({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== y }, { assign: y });
    }, 9904: (h, w, a) => {
      a(6518)({ target: "Object", stat: !0, sham: !a(3724) }, { create: a(2360) });
    }, 7945: (h, w, a) => {
      var f = a(6518), y = a(3724), m = a(6801).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !y }, { defineProperties: m });
    }, 4185: (h, w, a) => {
      var f = a(6518), y = a(3724), m = a(4913).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !y }, { defineProperty: m });
    }, 5506: (h, w, a) => {
      var f = a(6518), y = a(2357).entries;
      f({ target: "Object", stat: !0 }, { entries: function(m) {
        return y(m);
      } });
    }, 3851: (h, w, a) => {
      var f = a(6518), y = a(9039), m = a(5397), v = a(7347).f, j = a(3724);
      f({ target: "Object", stat: !0, forced: !j || y(function() {
        v(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(C, k) {
        return v(m(C), k);
      } });
    }, 1278: (h, w, a) => {
      var f = a(6518), y = a(3724), m = a(5031), v = a(5397), j = a(7347), C = a(4659);
      f({ target: "Object", stat: !0, sham: !y }, { getOwnPropertyDescriptors: function(k) {
        for (var E, P, T = v(k), I = j.f, L = m(T), M = {}, H = 0; L.length > H; ) (P = I(T, E = L[H++])) !== void 0 && C(M, E, P);
        return M;
      } });
    }, 9773: (h, w, a) => {
      var f = a(6518), y = a(4495), m = a(9039), v = a(3717), j = a(8981);
      f({ target: "Object", stat: !0, forced: !y || m(function() {
        v.f(1);
      }) }, { getOwnPropertySymbols: function(C) {
        var k = v.f;
        return k ? k(j(C)) : [];
      } });
    }, 875: (h, w, a) => {
      var f = a(6518), y = a(9039), m = a(8981), v = a(2787), j = a(2211);
      f({ target: "Object", stat: !0, forced: y(function() {
        v(1);
      }), sham: !j }, { getPrototypeOf: function(C) {
        return v(m(C));
      } });
    }, 9432: (h, w, a) => {
      var f = a(6518), y = a(8981), m = a(1072);
      f({ target: "Object", stat: !0, forced: a(9039)(function() {
        m(1);
      }) }, { keys: function(v) {
        return m(y(v));
      } });
    }, 287: (h, w, a) => {
      a(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: a(2967) });
    }, 6099: (h, w, a) => {
      var f = a(2140), y = a(6840), m = a(3179);
      f || y(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (h, w, a) => {
      var f = a(6518), y = a(2357).values;
      f({ target: "Object", stat: !0 }, { values: function(m) {
        return y(m);
      } });
    }, 8459: (h, w, a) => {
      var f = a(6518), y = a(3904);
      f({ global: !0, forced: parseFloat !== y }, { parseFloat: y });
    }, 8940: (h, w, a) => {
      var f = a(6518), y = a(2703);
      f({ global: !0, forced: parseInt !== y }, { parseInt: y });
    }, 6499: (h, w, a) => {
      var f = a(6518), y = a(9565), m = a(9306), v = a(6043), j = a(1103), C = a(2652);
      f({ target: "Promise", stat: !0, forced: a(537) }, { all: function(k) {
        var E = this, P = v.f(E), T = P.resolve, I = P.reject, L = j(function() {
          var M = m(E.resolve), H = [], A = 0, B = 1;
          C(k, function(N) {
            var z = A++, V = !1;
            B++, y(M, E, N).then(function(Z) {
              V || (V = !0, H[z] = Z, --B || T(H));
            }, I);
          }), --B || T(H);
        });
        return L.error && I(L.value), P.promise;
      } });
    }, 2003: (h, w, a) => {
      var f = a(6518), y = a(6395), m = a(916).CONSTRUCTOR, v = a(550), j = a(7751), C = a(4901), k = a(6840), E = v && v.prototype;
      if (f({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(T) {
        return this.then(void 0, T);
      } }), !y && C(v)) {
        var P = j("Promise").prototype.catch;
        E.catch !== P && k(E, "catch", P, { unsafe: !0 });
      }
    }, 436: (h, w, a) => {
      var f, y, m, v = a(6518), j = a(6395), C = a(9088), k = a(4475), E = a(9565), P = a(6840), T = a(2967), I = a(687), L = a(7633), M = a(9306), H = a(4901), A = a(34), B = a(679), N = a(2293), z = a(9225).set, V = a(1955), Z = a(3138), J = a(1103), X = a(8265), ce = a(1181), oe = a(550), ne = a(916), me = a(6043), fe = "Promise", ke = ne.CONSTRUCTOR, Ee = ne.REJECTION_EVENT, Se = ne.SUBCLASSING, ye = ce.getterFor(fe), Re = ce.set, Pe = oe && oe.prototype, Fe = oe, Ye = Pe, tt = k.TypeError, Ve = k.document, Te = k.process, Ue = me.f, R = Ue, F = !!(Ve && Ve.createEvent && k.dispatchEvent), W = "unhandledrejection", Y = function(re) {
        var ae;
        return !(!A(re) || !H(ae = re.then)) && ae;
      }, Q = function(re, ae) {
        var ue, Oe, Ae, ze = ae.value, nt = ae.state === 1, ut = nt ? re.ok : re.fail, ft = re.resolve, yt = re.reject, Je = re.domain;
        try {
          ut ? (nt || (ae.rejection === 2 && ie(ae), ae.rejection = 1), ut === !0 ? ue = ze : (Je && Je.enter(), ue = ut(ze), Je && (Je.exit(), Ae = !0)), ue === re.promise ? yt(new tt("Promise-chain cycle")) : (Oe = Y(ue)) ? E(Oe, ue, ft, yt) : ft(ue)) : yt(ze);
        } catch (Ze) {
          Je && !Ae && Je.exit(), yt(Ze);
        }
      }, ee = function(re, ae) {
        re.notified || (re.notified = !0, V(function() {
          for (var ue, Oe = re.reactions; ue = Oe.get(); ) Q(ue, re);
          re.notified = !1, ae && !re.rejection && he(re);
        }));
      }, de = function(re, ae, ue) {
        var Oe, Ae;
        F ? ((Oe = Ve.createEvent("Event")).promise = ae, Oe.reason = ue, Oe.initEvent(re, !1, !0), k.dispatchEvent(Oe)) : Oe = { promise: ae, reason: ue }, !Ee && (Ae = k["on" + re]) ? Ae(Oe) : re === W && Z("Unhandled promise rejection", ue);
      }, he = function(re) {
        E(z, k, function() {
          var ae, ue = re.facade, Oe = re.value;
          if (le(re) && (ae = J(function() {
            C ? Te.emit("unhandledRejection", Oe, ue) : de(W, ue, Oe);
          }), re.rejection = C || le(re) ? 2 : 1, ae.error)) throw ae.value;
        });
      }, le = function(re) {
        return re.rejection !== 1 && !re.parent;
      }, ie = function(re) {
        E(z, k, function() {
          var ae = re.facade;
          C ? Te.emit("rejectionHandled", ae) : de("rejectionhandled", ae, re.value);
        });
      }, je = function(re, ae, ue) {
        return function(Oe) {
          re(ae, Oe, ue);
        };
      }, be = function(re, ae, ue) {
        re.done || (re.done = !0, ue && (re = ue), re.value = ae, re.state = 2, ee(re, !0));
      }, Ce = function(re, ae, ue) {
        if (!re.done) {
          re.done = !0, ue && (re = ue);
          try {
            if (re.facade === ae) throw new tt("Promise can't be resolved itself");
            var Oe = Y(ae);
            Oe ? V(function() {
              var Ae = { done: !1 };
              try {
                E(Oe, ae, je(Ce, Ae, re), je(be, Ae, re));
              } catch (ze) {
                be(Ae, ze, re);
              }
            }) : (re.value = ae, re.state = 1, ee(re, !1));
          } catch (Ae) {
            be({ done: !1 }, Ae, re);
          }
        }
      };
      if (ke && (Ye = (Fe = function(re) {
        B(this, Ye), M(re), E(f, this);
        var ae = ye(this);
        try {
          re(je(Ce, ae), je(be, ae));
        } catch (ue) {
          be(ae, ue);
        }
      }).prototype, (f = function(re) {
        Re(this, { type: fe, done: !1, notified: !1, parent: !1, reactions: new X(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Ye, "then", function(re, ae) {
        var ue = ye(this), Oe = Ue(N(this, Fe));
        return ue.parent = !0, Oe.ok = !H(re) || re, Oe.fail = H(ae) && ae, Oe.domain = C ? Te.domain : void 0, ue.state === 0 ? ue.reactions.add(Oe) : V(function() {
          Q(Oe, ue);
        }), Oe.promise;
      }), y = function() {
        var re = new f(), ae = ye(re);
        this.promise = re, this.resolve = je(Ce, ae), this.reject = je(be, ae);
      }, me.f = Ue = function(re) {
        return re === Fe || re === void 0 ? new y(re) : R(re);
      }, !j && H(oe) && Pe !== Object.prototype)) {
        m = Pe.then, Se || P(Pe, "then", function(re, ae) {
          var ue = this;
          return new Fe(function(Oe, Ae) {
            E(m, ue, Oe, Ae);
          }).then(re, ae);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        T && T(Pe, Ye);
      }
      v({ global: !0, constructor: !0, wrap: !0, forced: ke }, { Promise: Fe }), I(Fe, fe, !1, !0), L(fe);
    }, 3362: (h, w, a) => {
      a(436), a(6499), a(2003), a(7743), a(1481), a(280);
    }, 7743: (h, w, a) => {
      var f = a(6518), y = a(9565), m = a(9306), v = a(6043), j = a(1103), C = a(2652);
      f({ target: "Promise", stat: !0, forced: a(537) }, { race: function(k) {
        var E = this, P = v.f(E), T = P.reject, I = j(function() {
          var L = m(E.resolve);
          C(k, function(M) {
            y(L, E, M).then(P.resolve, T);
          });
        });
        return I.error && T(I.value), P.promise;
      } });
    }, 1481: (h, w, a) => {
      var f = a(6518), y = a(6043);
      f({ target: "Promise", stat: !0, forced: a(916).CONSTRUCTOR }, { reject: function(m) {
        var v = y.f(this);
        return (0, v.reject)(m), v.promise;
      } });
    }, 280: (h, w, a) => {
      var f = a(6518), y = a(7751), m = a(6395), v = a(550), j = a(916).CONSTRUCTOR, C = a(3438), k = y("Promise"), E = m && !j;
      f({ target: "Promise", stat: !0, forced: m || j }, { resolve: function(P) {
        return C(E && this === k ? v : this, P);
      } });
    }, 825: (h, w, a) => {
      var f = a(6518), y = a(7751), m = a(8745), v = a(566), j = a(5548), C = a(8551), k = a(34), E = a(2360), P = a(9039), T = y("Reflect", "construct"), I = Object.prototype, L = [].push, M = P(function() {
        function B() {
        }
        return !(T(function() {
        }, [], B) instanceof B);
      }), H = !P(function() {
        T(function() {
        });
      }), A = M || H;
      f({ target: "Reflect", stat: !0, forced: A, sham: A }, { construct: function(B, N) {
        j(B), C(N);
        var z = arguments.length < 3 ? B : j(arguments[2]);
        if (H && !M) return T(B, N, z);
        if (B === z) {
          switch (N.length) {
            case 0:
              return new B();
            case 1:
              return new B(N[0]);
            case 2:
              return new B(N[0], N[1]);
            case 3:
              return new B(N[0], N[1], N[2]);
            case 4:
              return new B(N[0], N[1], N[2], N[3]);
          }
          var V = [null];
          return m(L, V, N), new (m(v, B, V))();
        }
        var Z = z.prototype, J = E(k(Z) ? Z : I), X = m(B, J, N);
        return k(X) ? X : J;
      } });
    }, 888: (h, w, a) => {
      var f = a(6518), y = a(9565), m = a(34), v = a(8551), j = a(6575), C = a(7347), k = a(2787);
      f({ target: "Reflect", stat: !0 }, { get: function E(P, T) {
        var I, L, M = arguments.length < 3 ? P : arguments[2];
        return v(P) === M ? P[T] : (I = C.f(P, T)) ? j(I) ? I.value : I.get === void 0 ? void 0 : y(I.get, M) : m(L = k(P)) ? E(L, T, M) : void 0;
      } });
    }, 4864: (h, w, a) => {
      var f = a(3724), y = a(4475), m = a(9504), v = a(2796), j = a(3167), C = a(6699), k = a(2360), E = a(8480).f, P = a(1625), T = a(788), I = a(655), L = a(1034), M = a(8429), H = a(1056), A = a(6840), B = a(9039), N = a(9297), z = a(1181).enforce, V = a(7633), Z = a(8227), J = a(3635), X = a(8814), ce = Z("match"), oe = y.RegExp, ne = oe.prototype, me = y.SyntaxError, fe = m(ne.exec), ke = m("".charAt), Ee = m("".replace), Se = m("".indexOf), ye = m("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, Fe = /a/g, Ye = new oe(Pe) !== Pe, tt = M.MISSED_STICKY, Ve = M.UNSUPPORTED_Y;
      if (v("RegExp", f && (!Ye || tt || J || X || B(function() {
        return Fe[ce] = !1, oe(Pe) !== Pe || oe(Fe) === Fe || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(F, W) {
          var Y, Q, ee, de, he, le, ie = P(ne, this), je = T(F), be = W === void 0, Ce = [], re = F;
          if (!ie && je && be && F.constructor === Te) return F;
          if ((je || P(ne, F)) && (F = F.source, be && (W = L(re))), F = F === void 0 ? "" : I(F), W = W === void 0 ? "" : I(W), re = F, J && "dotAll" in Pe && (Q = !!W && Se(W, "s") > -1) && (W = Ee(W, /s/g, "")), Y = W, tt && "sticky" in Pe && (ee = !!W && Se(W, "y") > -1) && Ve && (W = Ee(W, /y/g, "")), X && (de = function(ae) {
            for (var ue, Oe = ae.length, Ae = 0, ze = "", nt = [], ut = k(null), ft = !1, yt = !1, Je = 0, Ze = ""; Ae <= Oe; Ae++) {
              if ((ue = ke(ae, Ae)) === "\\") ue += ke(ae, ++Ae);
              else if (ue === "]") ft = !1;
              else if (!ft) switch (!0) {
                case ue === "[":
                  ft = !0;
                  break;
                case ue === "(":
                  fe(Re, ye(ae, Ae + 1)) && (Ae += 2, yt = !0), ze += ue, Je++;
                  continue;
                case (ue === ">" && yt):
                  if (Ze === "" || N(ut, Ze)) throw new me("Invalid capture group name");
                  ut[Ze] = !0, nt[nt.length] = [Ze, Je], yt = !1, Ze = "";
                  continue;
              }
              yt ? Ze += ue : ze += ue;
            }
            return [ze, nt];
          }(F), F = de[0], Ce = de[1]), he = j(oe(F, W), ie ? this : ne, Te), (Q || ee || Ce.length) && (le = z(he), Q && (le.dotAll = !0, le.raw = Te(function(ae) {
            for (var ue, Oe = ae.length, Ae = 0, ze = "", nt = !1; Ae <= Oe; Ae++) (ue = ke(ae, Ae)) !== "\\" ? nt || ue !== "." ? (ue === "[" ? nt = !0 : ue === "]" && (nt = !1), ze += ue) : ze += "[\\s\\S]" : ze += ue + ke(ae, ++Ae);
            return ze;
          }(F), Y)), ee && (le.sticky = !0), Ce.length && (le.groups = Ce)), F !== re) try {
            C(he, "source", re === "" ? "(?:)" : re);
          } catch {
          }
          return he;
        }, Ue = E(oe), R = 0; Ue.length > R; ) H(Te, oe, Ue[R++]);
        ne.constructor = Te, Te.prototype = ne, A(y, "RegExp", Te, { constructor: !0 });
      }
      V("RegExp");
    }, 7495: (h, w, a) => {
      var f = a(6518), y = a(7323);
      f({ target: "RegExp", proto: !0, forced: /./.exec !== y }, { exec: y });
    }, 8781: (h, w, a) => {
      var f = a(350).PROPER, y = a(6840), m = a(8551), v = a(655), j = a(9039), C = a(1034), k = "toString", E = RegExp.prototype, P = E[k], T = j(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), I = f && P.name !== k;
      (T || I) && y(E, k, function() {
        var L = m(this);
        return "/" + v(L.source) + "/" + v(C(L));
      }, { unsafe: !0 });
    }, 1699: (h, w, a) => {
      var f = a(6518), y = a(9504), m = a(5749), v = a(7750), j = a(655), C = a(1436), k = y("".indexOf);
      f({ target: "String", proto: !0, forced: !C("includes") }, { includes: function(E) {
        return !!~k(j(v(this)), j(m(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (h, w, a) => {
      var f = a(8183).charAt, y = a(655), m = a(1181), v = a(1088), j = a(2529), C = "String Iterator", k = m.set, E = m.getterFor(C);
      v(String, "String", function(P) {
        k(this, { type: C, string: y(P), index: 0 });
      }, function() {
        var P, T = E(this), I = T.string, L = T.index;
        return L >= I.length ? j(void 0, !0) : (P = f(I, L), T.index += P.length, j(P, !1));
      });
    }, 1761: (h, w, a) => {
      var f = a(9565), y = a(9228), m = a(8551), v = a(4117), j = a(8014), C = a(655), k = a(7750), E = a(5966), P = a(7829), T = a(6682);
      y("match", function(I, L, M) {
        return [function(H) {
          var A = k(this), B = v(H) ? void 0 : E(H, I);
          return B ? f(B, H, A) : new RegExp(H)[I](C(A));
        }, function(H) {
          var A = m(this), B = C(H), N = M(L, A, B);
          if (N.done) return N.value;
          if (!A.global) return T(A, B);
          var z = A.unicode;
          A.lastIndex = 0;
          for (var V, Z = [], J = 0; (V = T(A, B)) !== null; ) {
            var X = C(V[0]);
            Z[J] = X, X === "" && (A.lastIndex = P(B, j(A.lastIndex), z)), J++;
          }
          return J === 0 ? null : Z;
        }];
      });
    }, 5440: (h, w, a) => {
      var f = a(8745), y = a(9565), m = a(9504), v = a(9228), j = a(9039), C = a(8551), k = a(4901), E = a(4117), P = a(1291), T = a(8014), I = a(655), L = a(7750), M = a(7829), H = a(5966), A = a(2478), B = a(6682), N = a(8227)("replace"), z = Math.max, V = Math.min, Z = m([].concat), J = m([].push), X = m("".indexOf), ce = m("".slice), oe = "a".replace(/./, "$0") === "$0", ne = !!/./[N] && /./[N]("a", "$0") === "";
      v("replace", function(me, fe, ke) {
        var Ee = ne ? "$" : "$0";
        return [function(Se, ye) {
          var Re = L(this), Pe = E(Se) ? void 0 : H(Se, N);
          return Pe ? y(Pe, Se, Re, ye) : y(fe, I(Re), Se, ye);
        }, function(Se, ye) {
          var Re = C(this), Pe = I(Se);
          if (typeof ye == "string" && X(ye, Ee) === -1 && X(ye, "$<") === -1) {
            var Fe = ke(fe, Re, Pe, ye);
            if (Fe.done) return Fe.value;
          }
          var Ye = k(ye);
          Ye || (ye = I(ye));
          var tt, Ve = Re.global;
          Ve && (tt = Re.unicode, Re.lastIndex = 0);
          for (var Te, Ue = []; (Te = B(Re, Pe)) !== null && (J(Ue, Te), Ve); ) I(Te[0]) === "" && (Re.lastIndex = M(Pe, T(Re.lastIndex), tt));
          for (var R, F = "", W = 0, Y = 0; Y < Ue.length; Y++) {
            for (var Q, ee = I((Te = Ue[Y])[0]), de = z(V(P(Te.index), Pe.length), 0), he = [], le = 1; le < Te.length; le++) J(he, (R = Te[le]) === void 0 ? R : String(R));
            var ie = Te.groups;
            if (Ye) {
              var je = Z([ee], he, de, Pe);
              ie !== void 0 && J(je, ie), Q = I(f(ye, void 0, je));
            } else Q = A(ee, Pe, de, he, ie, ye);
            de >= W && (F += ce(Pe, W, de) + Q, W = de + ee.length);
          }
          return F + ce(Pe, W);
        }];
      }, !!j(function() {
        var me = /./;
        return me.exec = function() {
          var fe = [];
          return fe.groups = { a: "7" }, fe;
        }, "".replace(me, "$<a>") !== "7";
      }) || !oe || ne);
    }, 1392: (h, w, a) => {
      var f, y = a(6518), m = a(7476), v = a(7347).f, j = a(8014), C = a(655), k = a(5749), E = a(7750), P = a(1436), T = a(6395), I = m("".slice), L = Math.min, M = P("startsWith");
      y({ target: "String", proto: !0, forced: !(!T && !M && (f = v(String.prototype, "startsWith"), f && !f.writable) || M) }, { startsWith: function(H) {
        var A = C(E(this));
        k(H);
        var B = j(L(arguments.length > 1 ? arguments[1] : void 0, A.length)), N = C(H);
        return I(A, B, B + N.length) === N;
      } });
    }, 2762: (h, w, a) => {
      var f = a(6518), y = a(3802).trim;
      f({ target: "String", proto: !0, forced: a(706)("trim") }, { trim: function() {
        return y(this);
      } });
    }, 6412: (h, w, a) => {
      a(511)("asyncIterator");
    }, 6761: (h, w, a) => {
      var f = a(6518), y = a(4475), m = a(9565), v = a(9504), j = a(6395), C = a(3724), k = a(4495), E = a(9039), P = a(9297), T = a(1625), I = a(8551), L = a(5397), M = a(6969), H = a(655), A = a(6980), B = a(2360), N = a(1072), z = a(8480), V = a(298), Z = a(3717), J = a(7347), X = a(4913), ce = a(6801), oe = a(8773), ne = a(6840), me = a(2106), fe = a(5745), ke = a(6119), Ee = a(421), Se = a(3392), ye = a(8227), Re = a(1951), Pe = a(511), Fe = a(8242), Ye = a(687), tt = a(1181), Ve = a(9213).forEach, Te = ke("hidden"), Ue = "Symbol", R = "prototype", F = tt.set, W = tt.getterFor(Ue), Y = Object[R], Q = y.Symbol, ee = Q && Q[R], de = y.RangeError, he = y.TypeError, le = y.QObject, ie = J.f, je = X.f, be = V.f, Ce = oe.f, re = v([].push), ae = fe("symbols"), ue = fe("op-symbols"), Oe = fe("wks"), Ae = !le || !le[R] || !le[R].findChild, ze = function(Be, Ge, We) {
        var Qe = ie(Y, Ge);
        Qe && delete Y[Ge], je(Be, Ge, We), Qe && Be !== Y && je(Y, Ge, Qe);
      }, nt = C && E(function() {
        return B(je({}, "a", { get: function() {
          return je(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? ze : je, ut = function(Be, Ge) {
        var We = ae[Be] = B(ee);
        return F(We, { type: Ue, tag: Be, description: Ge }), C || (We.description = Ge), We;
      }, ft = function(Be, Ge, We) {
        Be === Y && ft(ue, Ge, We), I(Be);
        var Qe = M(Ge);
        return I(We), P(ae, Qe) ? (We.enumerable ? (P(Be, Te) && Be[Te][Qe] && (Be[Te][Qe] = !1), We = B(We, { enumerable: A(0, !1) })) : (P(Be, Te) || je(Be, Te, A(1, B(null))), Be[Te][Qe] = !0), nt(Be, Qe, We)) : je(Be, Qe, We);
      }, yt = function(Be, Ge) {
        I(Be);
        var We = L(Ge), Qe = N(We).concat(un(We));
        return Ve(Qe, function(ht) {
          C && !m(Je, We, ht) || ft(Be, ht, We[ht]);
        }), Be;
      }, Je = function(Be) {
        var Ge = M(Be), We = m(Ce, this, Ge);
        return !(this === Y && P(ae, Ge) && !P(ue, Ge)) && (!(We || !P(this, Ge) || !P(ae, Ge) || P(this, Te) && this[Te][Ge]) || We);
      }, Ze = function(Be, Ge) {
        var We = L(Be), Qe = M(Ge);
        if (We !== Y || !P(ae, Qe) || P(ue, Qe)) {
          var ht = ie(We, Qe);
          return !ht || !P(ae, Qe) || P(We, Te) && We[Te][Qe] || (ht.enumerable = !0), ht;
        }
      }, wr = function(Be) {
        var Ge = be(L(Be)), We = [];
        return Ve(Ge, function(Qe) {
          P(ae, Qe) || P(Ee, Qe) || re(We, Qe);
        }), We;
      }, un = function(Be) {
        var Ge = Be === Y, We = be(Ge ? ue : L(Be)), Qe = [];
        return Ve(We, function(ht) {
          !P(ae, ht) || Ge && !P(Y, ht) || re(Qe, ae[ht]);
        }), Qe;
      };
      k || (ne(ee = (Q = function() {
        if (T(ee, this)) throw new he("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? H(arguments[0]) : void 0, Ge = Se(Be), We = function(Qe) {
          var ht = this === void 0 ? y : this;
          ht === Y && m(We, ue, Qe), P(ht, Te) && P(ht[Te], Ge) && (ht[Te][Ge] = !1);
          var rr = A(1, Qe);
          try {
            nt(ht, Ge, rr);
          } catch (At) {
            if (!(At instanceof de)) throw At;
            ze(ht, Ge, rr);
          }
        };
        return C && Ae && nt(Y, Ge, { configurable: !0, set: We }), ut(Ge, Be);
      })[R], "toString", function() {
        return W(this).tag;
      }), ne(Q, "withoutSetter", function(Be) {
        return ut(Se(Be), Be);
      }), oe.f = Je, X.f = ft, ce.f = yt, J.f = Ze, z.f = V.f = wr, Z.f = un, Re.f = function(Be) {
        return ut(ye(Be), Be);
      }, C && (me(ee, "description", { configurable: !0, get: function() {
        return W(this).description;
      } }), j || ne(Y, "propertyIsEnumerable", Je, { unsafe: !0 }))), f({ global: !0, constructor: !0, wrap: !0, forced: !k, sham: !k }, { Symbol: Q }), Ve(N(Oe), function(Be) {
        Pe(Be);
      }), f({ target: Ue, stat: !0, forced: !k }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), f({ target: "Object", stat: !0, forced: !k, sham: !C }, { create: function(Be, Ge) {
        return Ge === void 0 ? B(Be) : yt(B(Be), Ge);
      }, defineProperty: ft, defineProperties: yt, getOwnPropertyDescriptor: Ze }), f({ target: "Object", stat: !0, forced: !k }, { getOwnPropertyNames: wr }), Fe(), Ye(Q, Ue), Ee[Te] = !0;
    }, 9463: (h, w, a) => {
      var f = a(6518), y = a(3724), m = a(4475), v = a(9504), j = a(9297), C = a(4901), k = a(1625), E = a(655), P = a(2106), T = a(7740), I = m.Symbol, L = I && I.prototype;
      if (y && C(I) && (!("description" in L) || I().description !== void 0)) {
        var M = {}, H = function() {
          var J = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), X = k(L, this) ? new I(J) : J === void 0 ? I() : I(J);
          return J === "" && (M[X] = !0), X;
        };
        T(H, I), H.prototype = L, L.constructor = H;
        var A = String(I("description detection")) === "Symbol(description detection)", B = v(L.valueOf), N = v(L.toString), z = /^Symbol\((.*)\)[^)]+$/, V = v("".replace), Z = v("".slice);
        P(L, "description", { configurable: !0, get: function() {
          var J = B(this);
          if (j(M, J)) return "";
          var X = N(J), ce = A ? Z(X, 7, -1) : V(X, z, "$1");
          return ce === "" ? void 0 : ce;
        } }), f({ global: !0, constructor: !0, forced: !0 }, { Symbol: H });
      }
    }, 1510: (h, w, a) => {
      var f = a(6518), y = a(7751), m = a(9297), v = a(655), j = a(5745), C = a(1296), k = j("string-to-symbol-registry"), E = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { for: function(P) {
        var T = v(P);
        if (m(k, T)) return k[T];
        var I = y("Symbol")(T);
        return k[T] = I, E[I] = T, I;
      } });
    }, 2259: (h, w, a) => {
      a(511)("iterator");
    }, 2675: (h, w, a) => {
      a(6761), a(1510), a(7812), a(3110), a(9773);
    }, 7812: (h, w, a) => {
      var f = a(6518), y = a(9297), m = a(757), v = a(6823), j = a(5745), C = a(1296), k = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { keyFor: function(E) {
        if (!m(E)) throw new TypeError(v(E) + " is not a symbol");
        if (y(k, E)) return k[E];
      } });
    }, 5700: (h, w, a) => {
      var f = a(511), y = a(8242);
      f("toPrimitive"), y();
    }, 8125: (h, w, a) => {
      var f = a(7751), y = a(511), m = a(687);
      y("toStringTag"), m(f("Symbol"), "Symbol");
    }, 3500: (h, w, a) => {
      var f = a(4475), y = a(7400), m = a(9296), v = a(235), j = a(6699), C = function(E) {
        if (E && E.forEach !== v) try {
          j(E, "forEach", v);
        } catch {
          E.forEach = v;
        }
      };
      for (var k in y) y[k] && C(f[k] && f[k].prototype);
      C(m);
    }, 2953: (h, w, a) => {
      var f = a(4475), y = a(7400), m = a(9296), v = a(3792), j = a(6699), C = a(687), k = a(8227)("iterator"), E = v.values, P = function(I, L) {
        if (I) {
          if (I[k] !== E) try {
            j(I, k, E);
          } catch {
            I[k] = E;
          }
          if (C(I, L, !0), y[L]) {
            for (var M in v) if (I[M] !== v[M]) try {
              j(I, M, v[M]);
            } catch {
              I[M] = v[M];
            }
          }
        }
      };
      for (var T in y) P(f[T] && f[T].prototype, T);
      P(m, "DOMTokenList");
    }, 5575: (h, w, a) => {
      var f = a(6518), y = a(4475), m = a(9472)(y.setInterval, !0);
      f({ global: !0, bind: !0, forced: y.setInterval !== m }, { setInterval: m });
    }, 4599: (h, w, a) => {
      var f = a(6518), y = a(4475), m = a(9472)(y.setTimeout, !0);
      f({ global: !0, bind: !0, forced: y.setTimeout !== m }, { setTimeout: m });
    }, 6031: (h, w, a) => {
      a(5575), a(4599);
    } }, _ = {};
    function b(h) {
      var w = _[h];
      if (w !== void 0) return w.exports;
      var a = _[h] = { exports: {} };
      return p[h].call(a.exports, a, a.exports, b), a.exports;
    }
    b.d = (h, w) => {
      for (var a in w) b.o(w, a) && !b.o(h, a) && Object.defineProperty(h, a, { enumerable: !0, get: w[a] });
    }, b.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), b.o = (h, w) => Object.prototype.hasOwnProperty.call(h, w), b.r = (h) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(h, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(h, "__esModule", { value: !0 });
    };
    var O = {};
    return (() => {
      b.r(O), b.d(O, { JSONEditor: () => Er }), b(2675), b(9463), b(6412), b(2259), b(5700), b(8125), b(8706), b(113), b(1629), b(3418), b(4346), b(3792), b(2712), b(4490), b(4782), b(739), b(9572), b(3288), b(2010), b(4731), b(479), b(2892), b(9085), b(9904), b(4185), b(875), b(9432), b(287), b(6099), b(6034), b(3362), b(7495), b(8781), b(7764), b(3500), b(2953), b(5506), b(4864), b(5440), b(4423);
      var h = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], w = [function(o) {
        return o.type === "string" && o.format === "color" && "colorpicker";
      }, function(o) {
        return o.type === "string" && ["ip", "ipv4", "ipv6", "hostname"].includes(o.format) && "ip";
      }, function(o) {
        return o.type === "string" && h.includes(o.format) && "ace";
      }, function(o) {
        return o.type === "string" && ["xhtml", "bbcode"].includes(o.format) && "sceditor";
      }, function(o) {
        return o.type === "string" && o.format === "markdown" && "simplemde";
      }, function(o) {
        return o.type === "string" && o.format === "jodit" && "jodit";
      }, function(o) {
        return o.type === "string" && o.format === "autocomplete" && "autocomplete";
      }, function(o) {
        return o.type === "string" && o.format === "uuid" && "uuid";
      }, function(o) {
        return o.format === "info" && "info";
      }, function(o) {
        return o.format === "button" && "button";
      }, function(o) {
        if ((o.type === "integer" || o.type === "number") && o.format === "stepper") return "stepper";
      }, function(o) {
        if (o.links) {
          for (var r = 0; r < o.links.length; r++) if (o.links[r].rel && o.links[r].rel.toLowerCase() === "describedby") return "describedBy";
        }
      }, function(o) {
        return ["string", "integer"].includes(o.type) && ["starrating", "rating"].includes(o.format) && "starrating";
      }, function(o) {
        return ["string", "integer"].includes(o.type) && ["date", "time", "datetime-local"].includes(o.format) && "datetime";
      }, function(o) {
        var r, n;
        return (o.oneOf || o.anyOf) && ((r = (n = o.options) === null || n === void 0 ? void 0 : n.switcher) === null || r === void 0 || r) === !0 && "multiple";
      }, function(o) {
        return o.if && "multiple";
      }, function(o, r) {
        if (o.items && (o.items = r.expandSchema(o.items)), o.type === "array" && o.items && !Array.isArray(o.items) && ["string", "number", "integer"].includes(o.items.type)) {
          if (o.format === "choices") return "arrayChoices";
          if (o.uniqueItems) {
            if (o.format === "selectize") return "arraySelectize";
            if (o.format === "select2") return "arraySelect2";
            if (o.items.enum && o.format !== "table") return "multiselect";
          }
        }
      }, function(o) {
        if (o.enum) {
          if (o.type === "array" || o.type === "object") return "enum";
          if (o.type === "number" || o.type === "integer" || o.type === "string") return o.format === "radio" ? "radio" : o.format === "select2" ? "select2" : o.format === "selectize" ? "selectize" : o.format === "choices" ? "choices" : "select";
        }
      }, function(o) {
        if (o.enumSource) return o.format === "radio" ? "radio" : o.format === "select2" ? "select2" : o.format === "selectize" ? "selectize" : o.format === "choices" ? "choices" : "select";
      }, function(o) {
        return o.type === "array" && o.format === "table" && "table";
      }, function(o) {
        return o.type === "string" && o.format === "url" && window.FileReader && o.options && o.options.upload === Object(o.options.upload) && "upload";
      }, function(o) {
        return o.type === "string" && o.media && o.media.binaryEncoding === "base64" && "base64";
      }, function(o) {
        return o.type === "any" && "multiple";
      }, function(o) {
        if (o.type === "boolean") return o.format === "checkbox" || o.options && o.options.checkbox ? "checkbox" : o.format === "select2" ? "select2" : o.format === "selectize" ? "selectize" : o.format === "choices" ? "choices" : "select";
      }, function(o) {
        return o.type === "string" && o.format === "signature" && "signature";
      }, function(o) {
        return typeof o.type == "string" && ["string", "number", "integer", "boolean", "null", "array", "object"].includes(o.type) && o.type;
      }, function(o) {
        return !o.type && o.properties && "object";
      }, function(o) {
        return typeof o.type != "string" && "multiple";
      }, function(o) {
        return typeof o.type == "string" && "string";
      }];
      function a(o, r, n) {
        var l;
        return l = function(e, t) {
          if (f(e) != "object" || !e) return e;
          var i = e[Symbol.toPrimitive];
          if (i !== void 0) {
            var c = i.call(e, "string");
            if (f(c) != "object") return c;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(r), (r = f(l) == "symbol" ? l : l + "") in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function f(o) {
        return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, f(o);
      }
      function y(o) {
        return !(o === null || f(o) !== "object" || o.nodeType || o === o.window || o.constructor && !k(o.constructor.prototype, "isPrototypeOf"));
      }
      function m(o) {
        return y(o) ? v({}, o) : Array.isArray(o) ? o.map(m) : o;
      }
      function v(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && y(e[t]) ? (k(o, t) || (o[t] = {}), v(o[t], e[t])) : Array.isArray(e[t]) ? o[t] = m(e[t]) : o[t] = e[t];
          });
        }), o;
      }
      function j(o, r) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(r, !0, !0), o.dispatchEvent(n);
      }
      function C(o) {
        return o && (o.toString() === "[object ShadowRoot]" ? o : C(o.parentNode));
      }
      function k(o, r) {
        return o && Object.prototype.hasOwnProperty.call(o, r);
      }
      b(4170), b(3851), b(825), b(888), b(8598), b(1699), b(1761), b(5276), b(5086), b(1392), b(2062), b(8459), b(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function T() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function I(o) {
        return o && f(o) === "object" && !Array.isArray(o);
      }
      var L = ["__proto__", "constructor", "prototype"];
      function M(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        if (!n.length) return o;
        var e = n.shift();
        if (I(o) && I(e)) for (var t in e) k(e, t) && (L.includes(t) || (I(e[t]) ? (k(o, t) && I(o[t]) || Object.assign(o, a({}, t, {})), M(o[t], e[t])) : Object.assign(o, a({}, t, e[t]))));
        return M.apply(void 0, [o].concat(n));
      }
      function H(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function A(o) {
        return A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, A(o);
      }
      function B(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, N(l.key), l);
        }
      }
      function N(o) {
        var r = function(n, l) {
          if (A(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (A(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return A(r) == "symbol" ? r : r + "";
      }
      var z = function() {
        return o = function n(l, e) {
          var t, i;
          (function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.defaults = e, this.jsoneditor = l.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = l.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = v({}, this.options || {}, this.schema.options || {}, l.schema.options || {}, l), this.enforceConstEnabled = (t = this.options.enforce_const) !== null && t !== void 0 ? t : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", l.path || this.schema.id || (this.schema.id = this.formname), this.path = l.path || this.formname, this.formname = l.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = l.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, l.container && this.setContainer(l.container), this.registerDependencies();
        }, r = [{ key: "onChildEditorChange", value: function(n, l) {
          this.onChange(!0, !1, l);
        } }, { key: "notify", value: function() {
          this.path && this.jsoneditor.notifyWatchers(this.path);
        } }, { key: "change", value: function(n) {
          this.parent ? this.parent.onChildEditorChange(this, n) : this.jsoneditor && this.jsoneditor.onChange(n);
        } }, { key: "onChange", value: function(n, l, e) {
          this.notify(), l || this.watch_listener && this.watch_listener(), n && this.change(e);
        } }, { key: "register", value: function() {
          if (this.jsoneditor.registerEditor(this), this.input && !this.label) {
            var n = this.getTitle() || this.formname;
            this.input.setAttribute("aria-label", n);
          }
          this.onChange();
        } }, { key: "unregister", value: function() {
          this.jsoneditor && this.jsoneditor.unregisterEditor(this);
        } }, { key: "getNumColumns", value: function() {
          return 12;
        } }, { key: "isActive", value: function() {
          return this.active;
        } }, { key: "activate", value: function() {
          this.active = !0, this.optInCheckbox.checked = !0, this.enable(), this.change();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.optInCheckbox.checked = !1, this.disable(), this.change());
        } }, { key: "registerDependencies", value: function() {
          var n = this;
          this.dependenciesFulfilled = !0;
          var l = this.options.dependencies;
          l && Object.keys(l).forEach(function(e) {
            var t;
            e.startsWith(n.jsoneditor.root.path) ? t = e : ((t = n.path.split("."))[t.length - 1] = e, t = t.join(".")), n.jsoneditor.watch(t, function() {
              n.evaluateDependencies();
            });
          });
        } }, { key: "evaluateDependencies", value: function() {
          var n = this, l = this.container || this.control;
          if (l && this.jsoneditor !== null) {
            var e = this.options.dependencies;
            if (e) {
              var t = this.dependenciesFulfilled;
              this.dependenciesFulfilled = !0, Object.keys(e).forEach(function(c) {
                var d;
                c.startsWith(n.jsoneditor.root.path) ? d = c : ((d = n.path.split("."))[d.length - 1] = c, d = d.join("."));
                var g = e[c];
                n.checkDependency(d, g);
              }), this.dependenciesFulfilled !== t && this.notify();
              var i = this.dependenciesFulfilled ? "block" : "none";
              this.options.hidden && (i = "none"), l.tagName === "TD" ? Object.keys(l.childNodes).forEach(function(c) {
                return l.childNodes[c].style.display = i;
              }) : l.style.display = i;
            }
          }
        } }, { key: "checkDependency", value: function(n, l) {
          var e = this;
          if (this.path !== n && this.jsoneditor !== null) {
            var t = this.jsoneditor.getEditor(n), i = t ? t.getValue() : void 0;
            t && t.dependenciesFulfilled && i != null ? Array.isArray(l) ? this.dependenciesFulfilled = l.some(function(c) {
              if (JSON.stringify(i) === JSON.stringify(c)) return !0;
            }) : A(l) === "object" ? A(i) !== "object" ? this.dependenciesFulfilled = l === i : Object.keys(l).some(function(c) {
              return !!k(l, c) && (k(i, c) && l[c] === i[c] ? void 0 : (e.dependenciesFulfilled = !1, !0));
            }) : typeof l == "string" || typeof l == "number" ? this.dependenciesFulfilled = this.dependenciesFulfilled && i === l : typeof l == "boolean" && (this.dependenciesFulfilled = l ? this.dependenciesFulfilled && (i || i.length > 0) : this.dependenciesFulfilled && (!i || i.length === 0)) : this.dependenciesFulfilled = !1;
          }
        } }, { key: "setContainer", value: function(n) {
          this.container = n, this.setContainerAttributes(), this.schema.id && this.container.setAttribute("data-schemaid", this.schema.id), this.schema.type && typeof this.schema.type == "string" && this.container.setAttribute("data-schematype", this.schema.type), this.container.setAttribute("data-schemapath", this.path);
        } }, { key: "setOptInCheckbox", value: function() {
          var n, l = this;
          n = this.optInWidget === "switch" ? this.theme.getOptInSwitch(this.formname) : this.theme.getOptInCheckbox(this.formname), this.optInCheckbox = n.checkbox, this.optInContainer = n.container, this.optInCheckbox.addEventListener("click", function() {
            l.isActive() ? l.deactivate() : l.activate();
          });
          var e = this.jsoneditor.options.show_opt_in, t = this.parent.options.show_opt_in !== void 0, i = t && this.parent.options.show_opt_in === !0, c = t && this.parent.options.show_opt_in === !1;
          (i || !c && e || !t && e) && this.parent && this.parent.schema.type === "object" && !this.isRequired() && this.header && (this.header.insertBefore(this.optInContainer, this.header.firstChild), this.optInAppended = !0);
        } }, { key: "preBuild", value: function() {
        } }, { key: "build", value: function() {
        } }, { key: "postBuild", value: function() {
          this.setupWatchListeners(), this.addLinks(), this.register(), this.setValue(this.getDefault(), !0), this.updateHeaderText(), this.onWatchedFieldChange(), this.options.titleHidden && (this.theme.visuallyHidden(this.label), this.theme.visuallyHidden(this.header)), this.enforceConstEnabled && this.schema.const && this.disable();
        } }, { key: "setupWatchListeners", value: function() {
          var n = this;
          if (this.watched = {}, this.schema.vars && (this.schema.watch = this.schema.vars), this.watched_values = {}, this.watch_listener = function() {
            n.refreshWatchedFieldValues() && n.onWatchedFieldChange();
          }, k(this.schema, "watch")) {
            var l, e, t, i, c, d = this.container.getAttribute("data-schemapath");
            Object.keys(this.schema.watch).forEach(function(g) {
              if (l = n.schema.watch[g], Array.isArray(l)) {
                if (l.length < 2) return;
                e = [l[0]].concat(l[1].split("."));
              } else e = l.split("."), n.theme.closest(n.container, '[data-schemaid="'.concat(e[0], '"]')) || e.unshift("#");
              if ((t = e.shift()) === "#" && (t = n.jsoneditor.schema.id || n.jsoneditor.root.formname), !(i = n.theme.closest(n.container, '[data-schemaid="'.concat(t, '"]')))) throw new Error("Could not find ancestor node with id ".concat(t));
              c = "".concat(i.getAttribute("data-schemapath"), ".").concat(e.join(".")), d.startsWith(c) && (n.watchLoop = !0), n.jsoneditor.watch(c, n.watch_listener), n.watched[g] = c;
            });
          }
          this.schema.headerTemplate && (this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine));
        } }, { key: "addLinks", value: function() {
          if (!this.no_link_holder && (this.link_holder = this.theme.getLinksHolder(), this.description !== void 0 ? this.description.parentNode.insertBefore(this.link_holder, this.description) : this.container.appendChild(this.link_holder), this.schema.links)) for (var n = 0; n < this.schema.links.length; n++) this.addLink(this.getLink(this.schema.links[n]));
        } }, { key: "onMove", value: function() {
        } }, { key: "getButton", value: function(n, l, e) {
          var t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], i = "json-editor-btn-".concat(l);
          l = this.iconlib ? this.iconlib.getIcon(l) : null, n = this.translate(n, t), e = this.translate(e, t), !l && e && (n = e, e = null);
          var c = this.theme.getButton(n, l, e);
          return c.classList.add(i), c;
        } }, { key: "setButtonText", value: function(n, l, e, t) {
          var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
          return e = this.iconlib ? this.iconlib.getIcon(e) : null, l = this.translate(l, i), t = this.translate(t, i), !e && t && (l = t, t = null), this.theme.setButtonText(n, l, e, t);
        } }, { key: "addLink", value: function(n) {
          this.link_holder && this.link_holder.appendChild(n);
        } }, { key: "getLink", value: function(n) {
          var l, e, t = (n.mediaType || "application/javascript").split("/")[0], i = this.jsoneditor.compileTemplate(n.href, this.template_engine), c = this.jsoneditor.compileTemplate(n.rel ? n.rel : n.href, this.template_engine), d = null;
          if (n.download && (d = n.download), d && d !== !0 && (d = this.jsoneditor.compileTemplate(d, this.template_engine)), t === "image") {
            l = this.theme.getBlockLinkHolder(), (e = document.createElement("a")).setAttribute("target", "_blank");
            var g = document.createElement("img");
            this.theme.createImageLink(l, e, g), this.link_watchers.push(function(S) {
              var D = i(S), $ = c(S);
              e.setAttribute("href", D), e.setAttribute("title", $ || D), g.setAttribute("src", D);
            });
          } else if (["audio", "video"].includes(t)) {
            l = this.theme.getBlockLinkHolder(), (e = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var x = document.createElement(t);
            x.setAttribute("controls", "controls"), this.theme.createMediaLink(l, e, x), this.link_watchers.push(function(S) {
              var D = i(S), $ = c(S);
              e.setAttribute("href", D), e.textContent = $ || D, x.setAttribute("src", D);
            });
          } else e = l = this.theme.getBlockLink(), l.setAttribute("target", "_blank"), l.textContent = n.rel, l.style.display = "none", this.link_watchers.push(function(S) {
            var D = i(S), $ = c(S);
            D && (l.style.display = ""), l.setAttribute("href", D), l.textContent = $ || D;
          });
          return d && e && (d === !0 ? e.setAttribute("download", "") : this.link_watchers.push(function(S) {
            e.setAttribute("download", d(S));
          })), n.class && n.class.split(" ").forEach(function(S) {
            e.classList.add(S);
          }), l;
        } }, { key: "refreshWatchedFieldValues", value: function() {
          var n = this;
          if (this.watched_values) {
            var l = {}, e = !1;
            return this.watched && Object.keys(this.watched).forEach(function(t) {
              var i = n.jsoneditor.getEditor(n.watched[t]), c = i ? i.getValue() : null;
              n.watched_values[t] !== c && (e = !0), l[t] = c;
            }), l.self = this.getValue(), this.watched_values.self !== l.self && (e = !0), this.watched_values = l, e;
          }
        } }, { key: "getWatchedFieldValues", value: function() {
          return this.watched_values;
        } }, { key: "updateHeaderText", value: function() {
          if (this.header) {
            var n = this.getHeaderText();
            if (this.header.children.length) {
              for (var l = 0; l < this.header.childNodes.length; l++) if (this.header.childNodes[l].nodeType === 3) {
                this.header.childNodes[l].nodeValue = this.cleanText(n);
                break;
              }
            } else window.DOMPurify ? this.header.innerHTML = window.DOMPurify.sanitize(n) : this.header.textContent = this.cleanText(n);
          }
        } }, { key: "purify", value: function(n) {
          return typeof n != "string" ? n : n = window.DOMPurify ? window.DOMPurify.sanitize(n) : this.cleanText(n);
        } }, { key: "getHeaderText", value: function(n) {
          return this.header_text ? this.header_text : n ? this.translateProperty(this.schema.title) : this.getTitle();
        } }, { key: "getPathDepth", value: function() {
          return this.path.split(".").length;
        } }, { key: "cleanText", value: function(n) {
          var l = document.createElement("div");
          return l.innerHTML = n, l.textContent || l.innerText;
        } }, { key: "onWatchedFieldChange", value: function() {
          var n, l = this;
          if (this.header_template) {
            n = v(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (n.properties = {}, Object.keys(this.editors).forEach(function(i) {
              var c = l.editors[i];
              if (c.schema && c.schema.enum && c.schema.options && c.schema.options.enum_titles) {
                var d = c.schema.enum.indexOf(c.value), g = c.options.enum_titles[d];
                n.properties[i] = { enumTitle: g };
              }
            }));
            var e = this.header_template(n);
            e !== this.header_text && (this.header_text = e, this.updateHeaderText(), this.notify());
          }
          if (this.link_watchers.length) {
            n = this.getWatchedFieldValues();
            for (var t = 0; t < this.link_watchers.length; t++) this.link_watchers[t](n);
          }
        } }, { key: "setValue", value: function(n) {
          n = this.applyConstFilter(n), this.value = n;
        } }, { key: "applyConstFilter", value: function(n) {
          return this.enforceConstEnabled && this.schema.const !== void 0 && (n = this.schema.const), n;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.value;
        } }, { key: "refreshValue", value: function() {
        } }, { key: "getChildEditors", value: function() {
          return !1;
        } }, { key: "destroy", value: function() {
          var n = this;
          this.unregister(this), this.watched && Object.values(this.watched).forEach(function(l) {
            return n.jsoneditor.unwatch(l, n.watch_listener);
          }), this.watched = null, this.watched_values = null, this.watch_listener = null, this.header_text = null, this.header_template = null, this.value = null, this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.jsoneditor = null, this.schema = null, this.path = null, this.key = null, this.parent = null;
        } }, { key: "isDefaultRequired", value: function() {
          return this.isRequired() || !!this.jsoneditor.options.use_default_values;
        } }, { key: "getDefault", value: function() {
          if (this.enforceConstEnabled && this.schema.const) return this.schema.const;
          if (this.schema.default !== void 0) return this.schema.default;
          if (this.schema.enum !== void 0) return this.schema.enum[0];
          var n = this.schema.type || this.schema.oneOf;
          if (n && Array.isArray(n) && (n = n[0]), n && A(n) === "object" && (n = n.type), n && Array.isArray(n) && (n = n[0]), typeof n == "string") {
            if (n === "number") return this.isDefaultRequired() ? 0 : void 0;
            if (n === "boolean") return !this.isDefaultRequired() && void 0;
            if (n === "integer") return this.isDefaultRequired() ? 0 : void 0;
            if (n === "string") return this.isDefaultRequired() ? "" : void 0;
            if (n === "null") return null;
            if (n === "object") return {};
            if (n === "array") return [];
          }
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title || this.key || this.formname);
        } }, { key: "enable", value: function() {
          this.disabled = !1;
        } }, { key: "disable", value: function() {
          this.disabled = !0;
        } }, { key: "isEnabled", value: function() {
          return !this.disabled;
        } }, { key: "isRequired", value: function() {
          return typeof this.schema.required == "boolean" ? this.schema.required : this.parent && this.parent.schema && Array.isArray(this.parent.schema.required) ? this.parent.schema.required.includes(this.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "getDisplayText", value: function(n) {
          var l = [], e = {};
          n.forEach(function(i) {
            i.title && (e[i.title] = e[i.title] || 0, e[i.title]++), i.description && (e[i.description] = e[i.description] || 0, e[i.description]++), i.format && (e[i.format] = e[i.format] || 0, e[i.format]++), i.type && (e[i.type] = e[i.type] || 0, e[i.type]++);
          }), n.forEach(function(i) {
            var c;
            c = typeof i == "string" ? i : i.title && e[i.title] <= 1 ? i.title : i.format && e[i.format] <= 1 ? i.format : i.type && e[i.type] <= 1 ? i.type : i.description && e[i.description] <= 1 ? i.description : i.title ? i.title : i.format ? i.format : i.type ? i.type : i.description ? i.description : JSON.stringify(i).length < 500 ? JSON.stringify(i) : "type", l.push(c);
          });
          var t = {};
          return l.forEach(function(i, c) {
            t[i] = t[i] || 0, t[i]++, e[i] > 1 && (l[c] = "".concat(i, " ").concat(t[i]));
          }), l;
        } }, { key: "getValidId", value: function(n) {
          return (n = n === void 0 ? "" : n.toString()).replace(/\s+/g, "-");
        } }, { key: "setInputAttributes", value: function(n, l) {
          if (this.schema.options && this.schema.options.inputAttributes) {
            var e = this.schema.options.inputAttributes, t = ["name", "type"].concat(n), i = l || this.input;
            Object.keys(e).forEach(function(c) {
              t.includes(c.toLowerCase()) || i.setAttribute(c, e[c]);
            });
          }
        } }, { key: "setContainerAttributes", value: function() {
          var n = this;
          if (this.schema.options && this.schema.options.containerAttributes) {
            var l = this.schema.options.containerAttributes, e = ["data-schemapath", "data-schematype", "data-schemaid"];
            Object.keys(l).forEach(function(t) {
              e.includes(t.toLowerCase()) || n.container.setAttribute(t, l[t]);
            });
          }
        } }, { key: "expandCallbacks", value: function(n, l) {
          var e = this, t = this.defaults.callbacks[n];
          return Object.entries(l).forEach(function(i) {
            var c, d, g = (d = 2, function(D) {
              if (Array.isArray(D)) return D;
            }(c = i) || function(D, $) {
              var G = D == null ? null : typeof Symbol < "u" && D[Symbol.iterator] || D["@@iterator"];
              if (G != null) {
                var te, pe, _e, we, Ie = [], De = !0, He = !1;
                try {
                  if (_e = (G = G.call(D)).next, $ === 0) {
                    if (Object(G) !== G) return;
                    De = !1;
                  } else for (; !(De = (te = _e.call(G)).done) && (Ie.push(te.value), Ie.length !== $); De = !0) ;
                } catch (ve) {
                  He = !0, pe = ve;
                } finally {
                  try {
                    if (!De && G.return != null && (we = G.return(), Object(we) !== we)) return;
                  } finally {
                    if (He) throw pe;
                  }
                }
                return Ie;
              }
            }(c, d) || function(D, $) {
              if (D) {
                if (typeof D == "string") return H(D, $);
                var G = Object.prototype.toString.call(D).slice(8, -1);
                return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? H(D, $) : void 0;
              }
            }(c, d) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), x = g[0], S = g[1];
            S === Object(S) ? l[x] = e.expandCallbacks(n, S) : typeof S == "string" && A(t) === "object" && typeof t[S] == "function" && (l[x] = t[S].bind(null, e));
          }), l;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && B(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function V(o) {
        return V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, V(o);
      }
      function Z(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, J(l.key), l);
        }
      }
      function J(o) {
        var r = function(n, l) {
          if (V(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (V(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return V(r) == "symbol" ? r : r + "";
      }
      function X(o, r, n) {
        return r = ne(r), function(l, e) {
          if (e && (V(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ce() ? Reflect.construct(r, n || [], ne(o).constructor) : r.apply(o, n));
      }
      function ce() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ce = function() {
          return !!o;
        })();
      }
      function oe() {
        return oe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ne(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, oe.apply(this, arguments);
      }
      function ne(o) {
        return ne = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ne(o);
      }
      function me(o, r) {
        return me = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, me(o, r);
      }
      var fe = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), X(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && me(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          oe(ne(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          oe(ne(r.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.purify(e), e = this.applyConstFilter(e), (!this.template || i) && (this.shouldBeUnset() || e != null ? V(e) === "object" ? e = JSON.stringify(e) : this.shouldBeUnset() || typeof e == "string" || (e = "".concat(e)) : e = "", e !== this.serialized)) {
            var c = this.sanitize(e);
            if (this.input.value !== c) {
              if (this.setValueToInputField(c), this.format === "range") {
                var d = this.control.querySelector("output");
                d && (d.value = c);
              }
              var g = i || this.getValue() !== e;
              return this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), g && this.onChange(!0, i), { changed: g, value: c };
            }
          }
        } }, { key: "setValueToInputField", value: function(e) {
          this.input.value = e === void 0 ? "" : e;
        } }, { key: "getNumColumns", value: function() {
          var e, t = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5);
          return e = this.input_type === "textarea" ? 6 : ["text", "email"].includes(this.input_type) ? 4 : 2, Math.min(12, Math.max(t, e));
        } }, { key: "build", value: function() {
          var e, t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.format = this.schema.format, !this.format && this.schema.media && this.schema.media.type && (this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, "")), !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.format) if (this.format === "textarea") this.input_type = "textarea", this.input = this.theme.getTextareaInput();
          else if (this.format === "range") {
            this.input_type = "range";
            var i = this.schema.minimum || 0, c = this.schema.maximum || Math.max(100, i + 1), d = 1;
            this.schema.multipleOf && (i % this.schema.multipleOf && (i = Math.ceil(i / this.schema.multipleOf) * this.schema.multipleOf), c % this.schema.multipleOf && (c = Math.floor(c / this.schema.multipleOf) * this.schema.multipleOf), d = this.schema.multipleOf), this.input = this.theme.getRangeInput(i, c, d, this.description, this.formname), this.input.setAttribute("id", this.formname);
          } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(this.format) && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
          else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function($) {
            if ($.preventDefault(), $.stopPropagation(), t.schema.template) $.currentTarget.value = t.value;
            else {
              var G = $.currentTarget.value, te = t.sanitize(G);
              G !== te && ($.currentTarget.value = te), t.is_dirty = !0, t.refreshValue(), t.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function($) {
            if ($) {
              var G, te = $.offsetHeight;
              if ($.offsetHeight < $.scrollHeight) for (G = 0; $.offsetHeight < $.scrollHeight + 3 && !(G > 100); ) G++, te++, $.style.height = "".concat(te, "px");
              else {
                for (G = 0; $.offsetHeight >= $.scrollHeight + 3 && !(G > 100); ) G++, te--, $.style.height = "".concat(te, "px");
                $.style.height = "".concat(te + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function($) {
            t.adjust_height($.currentTarget);
          }), this.input.addEventListener("change", function($) {
            t.adjust_height($.currentTarget);
          }), this.adjust_height());
          var g = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, x = this.schema.maxLength !== void 0;
          g && x && this.input.addEventListener("paste", function($) {
            ($.clipboardData || window.clipboardData).getData("text").length + t.input.value.length > t.schema.maxLength && alert(t.translate("paste_max_length_reached", [t.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var S = this.input;
          if (this.format === "range" && (S = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input), t.format === "range" && (t.control.querySelector("output").value = t.input.value);
          }), this.schema.template) {
            var D = this.expandCallbacks("template", { template: this.schema.template });
            typeof D.template == "function" ? this.template = D.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }, { key: "setupCleave", value: function(e) {
          var t = this.expandCallbacks("cleave", v({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
          V(t) === "object" && Object.keys(t).length > 0 && (this.cleave_instance = new window.Cleave(e, t));
        } }, { key: "setupImask", value: function(e) {
          var t = this.expandCallbacks("imask", v({}, this.defaults.options.imask || {}, this.options.imask || {}));
          V(t) === "object" && Object.keys(t).length > 0 && (this.imask_instance = window.IMask(e, this.ajustIMaskOptions(t)));
        } }, { key: "ajustIMaskOptions", value: function(e) {
          var t = this;
          return Object.keys(e).forEach(function(i) {
            if (e[i] === Object(e[i])) e[i] = t.ajustIMaskOptions(e[i]);
            else if (i === "mask") if (e[i].substr(0, 6) === "regex:") {
              var c = e[i].match(/^regex:\/(.*)\/([gimsuy]*)$/);
              if (c !== null) try {
                e[i] = new RegExp(c[1], c[2]);
              } catch {
              }
            } else e[i] = t.getGlobalPropertyFromString(e[i]);
          }), e;
        } }, { key: "getGlobalPropertyFromString", value: function(e) {
          if (e.includes(".")) {
            var t = e.split("."), i = t[0], c = t[1];
            if (window[i] !== void 0 && window[i][c] !== void 0) return window[i][c];
          } else if (window[e] !== void 0) return window[e];
          return e;
        } }, { key: "shouldBeUnset", value: function() {
          return !this.jsoneditor.options.use_default_values && !this.is_dirty;
        } }, { key: "getValue", value: function() {
          var e = !(!this.input || !this.input.value);
          if (!this.shouldBeUnset() || e) return this.imask_instance && this.dependenciesFulfilled && this.options.imask.returnUnmasked ? this.imask_instance.unmaskedValue : oe(ne(r.prototype), "getValue", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, oe(ne(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, oe(ne(r.prototype), "disable", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input), window.Cleave && !this.cleave_instance ? this.setupCleave(this.input) : window.IMask && !this.imask_instance && this.setupImask(this.input);
        } }, { key: "refreshValue", value: function() {
          this.input && (this.value = this.input.value, typeof this.value == "string" || this.shouldBeUnset() || (this.value = ""), this.serialized = this.value);
        } }, { key: "destroy", value: function() {
          this.cleave_instance && this.cleave_instance.destroy(), this.imask_instance && this.imask_instance.destroy(), this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), oe(ne(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), oe(ne(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.jsoneditor.options.show_errors !== "always") {
            if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
          }
          this.previous_error_setting = this.jsoneditor.options.show_errors;
          var i = e.reduce(function(c, d) {
            return d.path === t.path && c.push(d.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && Z(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ke(o) {
        return ke = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ke(o);
      }
      function Ee(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Se(l.key), l);
        }
      }
      function Se(o) {
        var r = function(n, l) {
          if (ke(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ke(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ke(r) == "symbol" ? r : r + "";
      }
      function ye(o, r, n) {
        return r = Fe(r), function(l, e) {
          if (e && (ke(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Re() ? Reflect.construct(r, n || [], Fe(o).constructor) : r.apply(o, n));
      }
      function Re() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Re = function() {
          return !!o;
        })();
      }
      function Pe() {
        return Pe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Fe(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Pe.apply(this, arguments);
      }
      function Fe(o) {
        return Fe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Fe(o);
      }
      function Ye(o, r) {
        return Ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ye(o, r);
      }
      var tt = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ye(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ye(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Pe(Fe(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(c.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize());
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Pe(Fe(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.ace) {
            var i = this.input_type;
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), e = this.expandCallbacks("ace", v({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, e), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
              t.input.value = t.ace_editor_instance.getValue(), t.refreshValue(), t.is_dirty = !0, t.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Pe(Fe(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!1), Pe(Fe(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!0), Pe(Fe(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.ace_editor_instance && (this.ace_editor_instance.destroy(), this.ace_editor_instance = null), Pe(Fe(r.prototype), "destroy", this).call(this);
        } }]) && Ee(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Ve(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(o);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function Te(o, r, n) {
        return (r = F(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Ue(o) {
        return Ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ue(o);
      }
      function R(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, F(l.key), l);
        }
      }
      function F(o) {
        var r = function(n, l) {
          if (Ue(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ue(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ue(r) == "symbol" ? r : r + "";
      }
      function W(o, r, n) {
        return r = ee(r), function(l, e) {
          if (e && (Ue(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Y() ? Reflect.construct(r, n || [], ee(o).constructor) : r.apply(o, n));
      }
      function Y() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Y = function() {
          return !!o;
        })();
      }
      function Q() {
        return Q = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ee(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Q.apply(this, arguments);
      }
      function ee(o) {
        return ee = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ee(o);
      }
      function de(o, r) {
        return de = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, de(o, r);
      }
      b(2008), b(4554), b(7945), b(1278);
      var he = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), W(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && de(e, t);
        }(r, o), n = r, l = [{ key: "askConfirmation", value: function() {
          return this.jsoneditor.options.prompt_before_delete !== !0 || window.confirm(this.translate("button_delete_node_warning")) !== !1;
        } }, { key: "register", value: function() {
          Q(ee(r.prototype), "register", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          Q(ee(r.prototype), "unregister", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          var e = this.getItemInfo(0);
          return this.tabs_holder && this.schema.format !== "tabs-top" ? Math.max(Math.min(12, e.width + 2), 4) : e.width;
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.setAvailability(this, !1), this.rows && this.rows.forEach(function(t) {
            t.enable(), e.setAvailability(t, !1);
          }), Q(ee(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.setAvailability(this, !0), this.rows && this.rows.forEach(function(i) {
            i.disable(e), t.setAvailability(i, !0);
          }), Q(ee(r.prototype), "disable", this).call(this);
        } }, { key: "setAvailability", value: function(e, t) {
          e.add_row_button && (e.add_row_button.disabled = t), e.remove_all_rows_button && (e.remove_all_rows_button.disabled = t), e.delete_last_row_button && (e.delete_last_row_button.disabled = t), e.copy_button && (e.copy_button.disabled = t), e.delete_button && (e.delete_button.disabled = t), e.moveup_button && (e.moveup_button.disabled = t), e.movedown_button && (e.movedown_button.disabled = t);
        } }, { key: "preBuild", value: function() {
          Q(ee(r.prototype), "preBuild", this).call(this), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add, this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top;
        } }, { key: "build", value: function() {
          this.options.compact ? (this.title = this.theme.getHeader("", this.getPathDepth()), this.container.appendChild(this.title), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.schema.format === "tabs-top" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder), this.active_tab = null) : this.schema.format === "tabs" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls))), this.addControls();
        } }, { key: "postBuild", value: function() {
          Q(ee(r.prototype), "postBuild", this).call(this), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), this.refreshTabs(!0), this.is_dirty = !0, Q(ee(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemTitle", value: function() {
          if (!this.item_title) if (this.schema.items && !Array.isArray(this.schema.items)) {
            var e = this.jsoneditor.expandRefs(this.schema.items);
            this.item_title = this.translateProperty(e.title) || this.translate("default_array_item_title");
          } else this.item_title = this.translate("default_array_item_title");
          return this.cleanText(this.item_title);
        } }, { key: "getItemSchema", value: function(e) {
          return Array.isArray(this.schema.items) ? e >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? v({}, this.schema.additionalItems) : void 0 : v({}, this.schema.items[e]) : this.schema.items ? v({}, this.schema.items) : {};
        } }, { key: "getItemInfo", value: function(e) {
          var t = this.getItemSchema(e);
          this.item_info = this.item_info || {};
          var i = JSON.stringify(t);
          return this.item_info[i] !== void 0 || (t = this.jsoneditor.expandRefs(t), this.item_info[i] = { title: this.translateProperty(t.title) || this.translate("default_array_item_title"), default: t.default, width: 12, child_editors: t.properties || t.items }), this.item_info[i];
        } }, { key: "getElementEditor", value: function(e) {
          var t = this.getItemInfo(e), i = this.getItemSchema(e);
          (i = this.jsoneditor.expandRefs(i)).title = "".concat(t.title, " ").concat(e + 1);
          var c, d = this.jsoneditor.getEditorClass(i);
          this.tabs_holder ? (c = this.schema.format === "tabs-top" ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = "".concat(this.path, ".").concat(e) : c = t.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(c);
          var g = this.jsoneditor.createEditor(d, { jsoneditor: this.jsoneditor, schema: i, container: c, path: "".concat(this.path, ".").concat(e), parent: this, required: !0 });
          return g.preBuild(), g.build(), g.postBuild(), g.title_controls || (g.array_controls = this.theme.getButtonHolder(), c.appendChild(g.array_controls)), g;
        } }, { key: "checkParent", value: function(e) {
          return e && e.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, Q(ee(r.prototype), "destroy", this).call(this);
        } }, { key: "empty", value: function(e) {
          var t = this;
          if (this.rows !== null) {
            if (this.rows.forEach(function(c, d) {
              e && (t.checkParent(c.tab) && c.tab.parentNode.removeChild(c.tab), t.destroyRow(c, !0), t.row_cache[d] = null), t.rows[d] = null;
            }), e) for (var i = this.rows.length; i < this.row_cache.length; i++) this.destroyRow(this.row_cache[i], !0), this.row_cache[i] = null;
            this.rows = [], e && (this.row_cache = []);
          }
        } }, { key: "destroyRow", value: function(e, t) {
          var i = e.container;
          t ? (e.destroy(), i.parentNode && i.parentNode.removeChild(i), this.checkParent(e.tab) && e.tab.parentNode.removeChild(e.tab)) : (e.tab && (e.tab.style.display = "none"), i.style.display = "none", e.unregister());
        } }, { key: "getMax", value: function() {
          return Array.isArray(this.schema.items) && this.schema.additionalItems === !1 ? Math.min(this.schema.items.length, this.schema.maxItems || 1 / 0) : this.schema.maxItems || 1 / 0;
        } }, { key: "refreshTabs", value: function(e) {
          var t = this;
          this.rows.forEach(function(i) {
            i.tab && (e ? i.tab_text.textContent = i.getHeaderText() : i.tab === t.active_tab ? t.theme.markTabActive(i) : t.theme.markTabInactive(i));
          });
        } }, { key: "ensureArraySize", value: function(e) {
          if (Array.isArray(e) || (e = [e]), this.schema.minItems) for (; e.length < this.schema.minItems; ) e.push(this.getItemInfo(e.length).default);
          return this.getMax() && e.length > this.getMax() && (e = e.slice(0, this.getMax())), e;
        } }, { key: "setValue", value: function() {
          var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (t = this.applyConstFilter(t), t = this.ensureArraySize(t), JSON.stringify(t) !== this.serialized) {
            t.forEach(function(x, S) {
              if (e.rows[S]) e.rows[S].setValue(x, i);
              else if (e.row_cache[S]) e.rows[S] = e.row_cache[S], e.rows[S].setValue(x, i), e.rows[S].container.style.display = "", e.rows[S].tab && (e.rows[S].tab.style.display = ""), e.rows[S].register(), e.jsoneditor.trigger("addRow", e.rows[S]);
              else {
                var D = e.addRow(x, i);
                e.jsoneditor.trigger("addRow", D);
              }
            });
            for (var c = t.length; c < this.rows.length; c++) this.destroyRow(this.rows[c]), this.rows[c] = null;
            this.rows = this.rows.slice(0, t.length);
            var d = this.rows.find(function(x) {
              return x.tab === e.active_tab;
            }), g = d !== void 0 ? d.tab : null;
            !g && this.rows.length && (g = this.rows[0].tab), this.active_tab = g, this.refreshValue(i), this.refreshTabs(!0), this.refreshTabs(), this.onChange();
          } else i && this.refreshValue(i);
        } }, { key: "setButtonState", value: function(e, t) {
          switch (this.options.button_state_mode || this.jsoneditor.options.button_state_mode) {
            case 1:
            default:
              e.style.display = t ? "" : "none";
              break;
            case 2:
              e.disabled = !t;
          }
        } }, { key: "setupButtons", value: function(e) {
          var t = [];
          if (this.value.length) if (this.value.length === 1) {
            this.setButtonState(this.remove_all_rows_button, !1);
            var i = !(e || this.hide_delete_last_row_buttons);
            this.setButtonState(this.delete_last_row_button, i), t.push(i);
          } else {
            var c = !(e || this.hide_delete_last_row_buttons);
            this.setButtonState(this.delete_last_row_button, c), t.push(c);
            var d = !(e || this.hide_delete_all_rows_buttons);
            this.setButtonState(this.remove_all_rows_button, d), t.push(d);
          }
          else this.setButtonState(this.delete_last_row_button, !1), this.setButtonState(this.remove_all_rows_button, !1);
          var g = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, g), t.push(g), t.some(function(x) {
            return x;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(d) {
            return d.getValue();
          }), i !== this.value.length || e) {
            var c = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(d, g) {
              if (d.movedown_button) {
                var x = g !== t.rows.length - 1;
                t.setButtonState(d.movedown_button, x);
              }
              d.delete_button && t.setButtonState(d.delete_button, !c), t.value[g] = d.getValue();
            }), this.setupButtons(c) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e, t) {
          var i = this, c = this.rows.length;
          this.rows[c] = this.getElementEditor(c), this.row_cache[c] = this.rows[c], this.tabs_holder ? (this.rows[c].tab_text = document.createElement("span"), this.rows[c].tab_text.textContent = this.rows[c].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[c].tab = this.theme.getTopTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTopTab(this.tabs_holder, this.rows[c].tab)) : (this.rows[c].tab = this.theme.getTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTab(this.tabs_holder, this.rows[c].tab)), this.rows[c].tab.addEventListener("click", function(g) {
            i.active_tab = i.rows[c].tab, i.refreshTabs(), g.preventDefault(), g.stopPropagation();
          }), this._supportDragDrop(this.rows[c].tab)) : this._supportDragDrop(this.rows[c].container, !0);
          var d = this.rows[c].title_controls || this.rows[c].array_controls;
          return this.hide_delete_buttons || (this.rows[c].delete_button = this._createDeleteButton(c, d)), this.show_copy_button && (this.rows[c].copy_button = this._createCopyButton(c, d)), c && !this.hide_move_buttons && (this.rows[c].moveup_button = this._createMoveUpButton(c, d)), this.hide_move_buttons || (this.rows[c].movedown_button = this._createMoveDownButton(c, d)), e !== void 0 && this.rows[c].setValue(e, t), this.refreshTabs(), this.rows[c];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            if (d.preventDefault(), d.stopPropagation(), !i.askConfirmation()) return !1;
            var g = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue().filter(function($, G) {
              return G !== g;
            }), S = null, D = i.rows[g].getValue();
            i.setValue(x), i.rows[g] ? S = i.rows[g].tab : i.rows[g - 1] && (S = i.rows[g - 1].tab), S && (i.active_tab = S, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", D);
          }), t && t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), d = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(g) {
            var x = i.getValue();
            g.preventDefault(), g.stopPropagation();
            var S = 1 * g.currentTarget.getAttribute("data-i");
            x.forEach(function(D, $) {
              if ($ === S) {
                var G = Ue(D) === "object" && D !== null ? function(we) {
                  for (var Ie = 1; Ie < arguments.length; Ie++) {
                    var De = arguments[Ie] != null ? arguments[Ie] : {};
                    Ie % 2 ? Ve(Object(De), !0).forEach(function(He) {
                      Te(we, He, De[He]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(we, Object.getOwnPropertyDescriptors(De)) : Ve(Object(De)).forEach(function(He) {
                      Object.defineProperty(we, He, Object.getOwnPropertyDescriptor(De, He));
                    });
                  }
                  return we;
                }({}, D) : D;
                if (d.items.type === "string" && d.items.format === "uuid") G = T();
                else if (d.items.type === "object" && d.items.properties) for (var te = 0, pe = Object.keys(G); te < pe.length; te++) {
                  var _e = pe[te];
                  d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && (G[_e] = T());
                }
                x.push(G);
              }
            }), i.setValue(x), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[S - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var g = 1 * d.currentTarget.getAttribute("data-i");
            if (!(g <= 0)) {
              var x = i.getValue(), S = x[g - 1];
              x[g - 1] = x[g], x[g] = S, i.setValue(x), i.active_tab = i.rows[g - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g - 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var g = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            if (!(g >= x.length - 1)) {
              var S = x[g + 1];
              x[g + 1] = x[g], x[g] = S, i.setValue(x), i.active_tab = i.rows[g + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g + 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          le(e, function(c, d) {
            var g = i.getValue(), x = g[c];
            g.splice(c, 1), g.splice(d, 0, x), i.setValue(g), i.active_tab = i.rows[d].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[d]);
          }, { useTrigger: t });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
        } }, { key: "_createToggleButton", value: function() {
          var e = this, t = this.getButton("", "collapse", "button_collapse");
          t.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(t, this.title.childNodes[0]);
          var i = this.row_holder.style.display, c = this.controls.style.display;
          return t.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation(), e.panel && e.setButtonState(e.panel, e.collapsed), e.tabs_holder && e.setButtonState(e.tabs_holder, e.collapsed), e.collapsed ? (e.collapsed = !1, e.row_holder.style.display = i, e.controls.style.display = c, e.setButtonText(d.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.row_holder.style.display = "none", e.controls.style.display = "none", e.setButtonText(d.currentTarget, "", "expand", "button_expand"));
          }), t;
        } }, { key: "_createAddRowButton", value: function() {
          var e = this, t = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-add"), t.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var c, d = e.rows.length;
            e.row_cache[d] ? (c = e.rows[d] = e.row_cache[d], e.rows[d].setValue(e.rows[d].getDefault(), !0), typeof e.rows[d].deactivateNonRequiredProperties == "function" && e.rows[d].deactivateNonRequiredProperties(!0), e.rows[d].container.style.display = "", e.rows[d].tab && (e.rows[d].tab.style.display = ""), e.rows[d].register()) : c = e.addRow(), e.active_tab = e.rows[d].tab, e.refreshTabs(), e.refreshValue(), e.onChange(!0), e.jsoneditor.trigger("addRow", c);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue(), d = null, g = c.pop();
            e.setValue(c), e.rows[e.rows.length - 1] && (d = e.rows[e.rows.length - 1].tab), d && (e.active_tab = d, e.refreshTabs()), e.onChange(!0), e.jsoneditor.trigger("deleteRow", g);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue();
            e.empty(!0), e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", c);
          }), this.controls.appendChild(t), t;
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], c = [];
          e.forEach(function(d) {
            d.path === t.path ? i.push(d) : c.push(d);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(d) {
            t.error_holder.appendChild(t.theme.getErrorMessage(d.message));
          })) : this.error_holder.style.display = "none"), this.rows.forEach(function(d) {
            return d.showValidationErrors(c);
          });
        } }], l && R(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function le(o, r) {
        (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).useTrigger ? o.addEventListener("mousedown", function(n) {
          if (n.ctrlKey) {
            o.draggable = !0;
            var l = function e(t) {
              o.draggable = !1, document.removeEventListener("dragend", e), document.removeEventListener("mouseup", e);
            };
            document.addEventListener("dragend", l), document.addEventListener("mouseup", l);
          }
        }) : o.draggable = !0, o.addEventListener("dragstart", function(n) {
          window.curDrag = o;
        }), o.addEventListener("dragover", function(n) {
          window.curDrag === null || window.curDrag === o || window.curDrag.parentElement !== o.parentElement ? n.dataTransfer.dropEffect = "none" : n.dataTransfer.dropEffect = "move", n.preventDefault();
        }), o.addEventListener("drop", function(n) {
          if (n.preventDefault(), n.stopPropagation(), window.curDrag !== null && window.curDrag !== o && window.curDrag.parentElement === o.parentElement) {
            var l = function(i) {
              for (var c = 0, d = i.parentElement.firstElementChild; d !== i && d !== null; ) d = d.nextSibling, ++c;
              return c;
            }, e = l(window.curDrag), t = l(o);
            r(e, t, window.curDrag, o), window.curDrag = null;
          }
        });
      }
      function ie(o) {
        return ie = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ie(o);
      }
      function je(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, be(l.key), l);
        }
      }
      function be(o) {
        var r = function(n, l) {
          if (ie(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ie(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ie(r) == "symbol" ? r : r + "";
      }
      function Ce(o, r, n) {
        return r = ue(r), function(l, e) {
          if (e && (ie(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, re() ? Reflect.construct(r, n || [], ue(o).constructor) : r.apply(o, n));
      }
      function re() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (re = function() {
          return !!o;
        })();
      }
      function ae() {
        return ae = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ue(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ae.apply(this, arguments);
      }
      function ue(o) {
        return ue = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ue(o);
      }
      function Oe(o, r) {
        return Oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Oe(o, r);
      }
      he.rules = { ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-array-control-btn": "width:100%25;text-align:left;margin-bottom:3px" };
      var Ae = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ce(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Oe(e, t);
        }(r, o), n = r, (l = [{ key: "onInputChange", value: function() {
          this.value = this.input.value, this.onChange(!0);
        } }, { key: "register", value: function() {
          ae(ue(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          ae(ue(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          var e = this, t = this.getTitle().length;
          return Object.keys(this.select_values).forEach(function(i) {
            return t = Math.max(t, "".concat(e.select_values[i]).length + 4);
          }), Math.min(12, Math.max(t / 7, 2));
        } }, { key: "preBuild", value: function() {
          var e;
          ae(ue(r.prototype), "preBuild", this).call(this), this.select_options = {}, this.select_values = {}, this.option_titles = [], this.option_keys = [], this.option_enum = [];
          var t = this.jsoneditor.expandRefs(this.schema.items || {}), i = t.enum || [], c = t.options && t.options.enum || [], d = t.options && t.options.enum_titles || [];
          for (e = 0; e < i.length; e++) if (this.sanitize(i[e]) === i[e]) {
            var g = c[e] || {};
            "title" in g || (g.title = "".concat(d[e] || i[e])), this.option_keys.push("".concat(i[e])), this.option_enum.push(g), this.select_values["".concat(i[e])] = i[e];
          }
        } }, { key: "build", value: function() {
          var e, t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || this.schema.format === "checkbox") {
            for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, e = 0; e < this.option_keys.length; e++) {
              var i = this.formname + e.toString();
              this.inputs[this.option_keys[e]] = this.theme.getCheckbox(), this.inputs[this.option_keys[e]].id = i, this.select_options[this.option_keys[e]] = this.inputs[this.option_keys[e]];
              var c = this.theme.getCheckboxLabel(this.option_enum[e].title);
              if (c.htmlFor = i, this.option_enum[e].infoText) {
                var d = this.theme.getInfoButton(this.translateProperty(this.option_enum[e].infoText));
                c.appendChild(d);
              }
              this.controls["_" + this.option_keys[e]] = this.theme.getFormControl(c, this.inputs[this.option_keys[e]]);
            }
            this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description, this.infoButton), this.inputs.controlgroup = this.inputs.controls = this.control;
          } else {
            for (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys, !0), this.theme.setSelectOptions(this.input, this.option_keys, this.option_enum.map(function(g) {
              return g.title;
            })), this.input.setAttribute("multiple", "multiple"), this.input.size = Math.min(10, this.option_keys.length), e = 0; e < this.option_keys.length; e++) this.select_options[this.option_keys[e]] = this.input.children[e];
            this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname);
          }
          (this.schema.readOnly || this.schema.readonly) && this.disable(!0), this.container.appendChild(this.control), this.multiselectChangeHandler = function(g) {
            var x = [];
            for (e = 0; e < t.option_keys.length; e++) t.select_options[t.option_keys[e]] && (t.select_options[t.option_keys[e]].selected || t.select_options[t.option_keys[e]].checked) && x.push(t.select_values[t.option_keys[e]]);
            t.updateValue(x), t.onChange(!0);
          }, this.control.addEventListener("change", this.multiselectChangeHandler, !1), window.requestAnimationFrame(function() {
            t.afterInputReady();
          });
        } }, { key: "postBuild", value: function() {
          ae(ue(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input || this.inputs);
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          e = (e = this.applyConstFilter(e)) || [], Array.isArray(e) || (e = [e]), e = e.map(function(c) {
            return "".concat(c);
          }), Object.keys(this.select_options).forEach(function(c) {
            i.select_options[c][i.input_type === "select" ? "selected" : "checked"] = e.includes(c);
          }), this.updateValue(e), this.onChange(!0);
        } }, { key: "removeValue", value: function(e) {
          e = [].concat(e), this.setValue(this.getValue().filter(function(t) {
            return !e.includes(t);
          }));
        } }, { key: "addValue", value: function(e) {
          this.setValue(this.getValue().concat(e));
        } }, { key: "updateValue", value: function(e) {
          for (var t = !1, i = [], c = 0; c < e.length; c++) if (this.select_options["".concat(e[c])]) {
            var d = this.sanitize(this.select_values[e[c]]);
            i.push(d), d !== e[c] && (t = !0);
          } else t = !0;
          return this.value = i, t;
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.schema.items.type === "boolean" ? !!e : this.schema.items.type === "number" ? 1 * e || 0 : this.schema.items.type === "integer" ? Math.floor(1 * e || 0) : "".concat(e);
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.input ? this.input.disabled = !1 : this.inputs && Object.keys(this.inputs).forEach(function(t) {
            return e.inputs[t].disabled = !1;
          }), ae(ue(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.input ? this.input.disabled = !0 : this.inputs && Object.keys(this.inputs).forEach(function(i) {
            return t.inputs[i].disabled = !0;
          }), ae(ue(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          ae(ue(r.prototype), "destroy", this).call(this);
        } }, { key: "escapeRegExp", value: function(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } }, { key: "showValidationErrors", value: function(e) {
          var t = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = e.reduce(function(c, d) {
            return d.path.match(t) && c.push(d.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && je(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ze(o) {
        return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ze(o);
      }
      function nt(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, ut(l.key), l);
        }
      }
      function ut(o) {
        var r = function(n, l) {
          if (ze(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ze(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ze(r) == "symbol" ? r : r + "";
      }
      function ft(o, r, n) {
        return r = Ze(r), function(l, e) {
          if (e && (ze(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, yt() ? Reflect.construct(r, n || [], Ze(o).constructor) : r.apply(o, n));
      }
      function yt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yt = function() {
          return !!o;
        })();
      }
      function Je() {
        return Je = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ze(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Je.apply(this, arguments);
      }
      function Ze(o) {
        return Ze = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ze(o);
      }
      function wr(o, r) {
        return wr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, wr(o, r);
      }
      var un = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ft(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && wr(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          this.choices_instance ? (e = this.applyConstFilter(e), e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : Je(Ze(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.Choices && !this.choices_instance) {
            var t = this.expandCallbacks("choices", v({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
            this.newEnumAllowed = !1, this.choices_instance = new window.Choices(this.input, t), this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              var c = e.choices_instance.getValue(!0);
              e.updateValue(c), e.onChange(!0);
            }, this.control.addEventListener("change", this.multiselectChangeHandler, !1);
          }
          Je(Ze(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], c = 0; c < e.length; c++)
            if (!(!this.select_values["".concat(e[c])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[c])))) {
              var d = this.sanitize(this.select_values[e[c]]);
              i.push(d), d !== e[c] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          return this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.schema.items.enum.push(e), this.choices_instance.setChoices([{ value: "".concat(e), label: "".concat(e) }], "value", "label", !1), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Je(Ze(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), Je(Ze(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Je(Ze(r.prototype), "destroy", this).call(this);
        } }]) && nt(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Ae);
      function Be(o) {
        return Be = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Be(o);
      }
      function Ge(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, We(l.key), l);
        }
      }
      function We(o) {
        var r = function(n, l) {
          if (Be(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Be(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Be(r) == "symbol" ? r : r + "";
      }
      function Qe(o, r, n) {
        return r = At(r), function(l, e) {
          if (e && (Be(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ht() ? Reflect.construct(r, n || [], At(o).constructor) : r.apply(o, n));
      }
      function ht() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ht = function() {
          return !!o;
        })();
      }
      function rr() {
        return rr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = At(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, rr.apply(this, arguments);
      }
      function At(o) {
        return At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, At(o);
      }
      function ls(o, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ls(o, r);
      }
      var wd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.select2_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : rr(At(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (e = this.expandCallbacks("select2", v({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = e.tags = !!e.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
            var i = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
            t.updateValue(i), t.onChange(!0);
          }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), rr(At(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], c = 0; c < e.length; c++)
            if (!(!this.select_values["".concat(e[c])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[c])))) {
              var d = this.sanitize(this.select_values[e[c]]);
              i.push(d), d !== e[c] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.schema.items.enum.push(e);
          var t = this.input.querySelector('option[value="'.concat(e, '"]'));
          return t ? t.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(e, e, !1, !1)).trigger("change"), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), rr(At(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), rr(At(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), rr(At(r.prototype), "destroy", this).call(this);
        } }]) && Ge(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Ae);
      function Hn(o) {
        return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hn(o);
      }
      function jd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, kd(l.key), l);
        }
      }
      function kd(o) {
        var r = function(n, l) {
          if (Hn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Hn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Hn(r) == "symbol" ? r : r + "";
      }
      function xd(o, r, n) {
        return r = nr(r), function(l, e) {
          if (e && (Hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, dl() ? Reflect.construct(r, n || [], nr(o).constructor) : r.apply(o, n));
      }
      function dl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (dl = function() {
          return !!o;
        })();
      }
      function dn() {
        return dn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = nr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, dn.apply(this, arguments);
      }
      function nr(o) {
        return nr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, nr(o);
      }
      function cs(o, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, cs(o, r);
      }
      var Od = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), xd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.selectize_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.selectize_instance.setValue(this.value), this.onChange(!0)) : dn(nr(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            e = this.expandCallbacks("selectize", v({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = e.create = !!e.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(g) {
              var x = t.selectize_instance.getValue();
              t.updateValue(x), t.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
            var i = this.theme.getHiddenLabel(this.formname);
            this.input.setAttribute("id", this.formname + "-hidden-input"), i.setAttribute("for", this.formname + "-hidden-input"), this.input.parentNode.insertBefore(i, this.input);
            var c = this.selectize_instance.$control[0];
            if (c) {
              var d = this.theme.getHiddenLabel(this.formname);
              d.setAttribute("for", this.formname + "-selectized"), c.appendChild(d);
            }
          }
          dn(nr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], c = 0; c < e.length; c++)
            if (!(!this.select_values["".concat(e[c])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[c])))) {
              var d = this.sanitize(this.select_values[e[c]]);
              i.push(d), d !== e[c] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          return this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.selectize_instance.addOption({ text: e, value: e }), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), dn(nr(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), dn(nr(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), dn(nr(r.prototype), "destroy", this).call(this);
        } }]) && jd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Ae);
      function Vn(o) {
        return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vn(o);
      }
      function Cd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ed(l.key), l);
        }
      }
      function Ed(o) {
        var r = function(n, l) {
          if (Vn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Vn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Vn(r) == "symbol" ? r : r + "";
      }
      function Sd(o, r, n) {
        return r = Mr(r), function(l, e) {
          if (e && (Vn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, hl() ? Reflect.construct(r, n || [], Mr(o).constructor) : r.apply(o, n));
      }
      function hl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (hl = function() {
          return !!o;
        })();
      }
      function Ii() {
        return Ii = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Mr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ii.apply(this, arguments);
      }
      function Mr(o) {
        return Mr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Mr(o);
      }
      function us(o, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, us(o, r);
      }
      var Pd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Sd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && us(e, t);
        }(r, o), n = r, (l = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), Ii(Mr(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Autocomplete && !this.autocomplete_instance && (e = this.expandCallbacks("autocomplete", v({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            t.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(e.baseClass), this.autocomplete_dropdown.classList.add("".concat(e.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, e)), Ii(Mr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), Ii(Mr(r.prototype), "destroy", this).call(this);
        } }]) && Cd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function zn(o) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(o);
      }
      function Td(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ld(l.key), l);
        }
      }
      function Ld(o) {
        var r = function(n, l) {
          if (zn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (zn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return zn(r) == "symbol" ? r : r + "";
      }
      function Ad(o, r, n) {
        return r = Hr(r), function(l, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, pl() ? Reflect.construct(r, n || [], Hr(o).constructor) : r.apply(o, n));
      }
      function pl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pl = function() {
          return !!o;
        })();
      }
      function Bi() {
        return Bi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Hr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Bi.apply(this, arguments);
      }
      function Hr(o) {
        return Hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Hr(o);
      }
      function ds(o, r) {
        return ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ds(o, r);
      }
      var Rd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ad(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ds(e, t);
        }(r, o), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "setFileReaderListener", value: function(e) {
          var t = this;
          e.addEventListener("load", function(i) {
            if (t.count === t.current_item_index) t.value[t.count][t.key] = i.target.result;
            else {
              var c = {};
              for (var d in t.parent.schema.properties) c[d] = "";
              c[t.key] = i.target.result, t.value.splice(t.count, 0, c);
            }
            t.count += 1, t.count === t.total + t.current_item_index && t.arrayEditor.setValue(t.value);
          });
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
            if (!window.FileReader) throw new Error("FileReader required for base64 editor");
            this.uploader = this.theme.getFormInputField("file"), this.uploader.style.display = "none", this.schema.options && this.schema.options.multiple && this.schema.options.multiple === !0 && this.parent && this.parent.schema.type === "object" && this.parent.parent && this.parent.parent.schema.type === "array" && this.uploader.setAttribute("multiple", ""), this.uploader.addEventListener("change", function(i) {
              if (i.preventDefault(), i.stopPropagation(), i.currentTarget.files && i.currentTarget.files.length) if (i.currentTarget.files.length > 1 && e.schema.options && e.schema.options.multiple && e.schema.options.multiple === !0 && e.parent && e.parent.schema.type === "object" && e.parent.parent && e.parent.parent.schema.type === "array") {
                e.arrayEditor = e.jsoneditor.getEditor(e.parent.parent.path), e.value = e.arrayEditor.getValue(), e.total = i.currentTarget.files.length, e.current_item_index = parseInt(e.parent.key), e.count = e.current_item_index;
                for (var c = 0; c < e.total; c++) {
                  var d = new FileReader();
                  e.setFileReaderListener(d), d.readAsDataURL(i.currentTarget.files[c]);
                }
              } else {
                var g = new FileReader();
                g.onload = function(x) {
                  e.value = x.target.result, e.refreshPreview(), e.onChange(!0), g = null;
                }, g.readAsDataURL(i.currentTarget.files[0]);
              }
            });
          }
          this.preview = this.theme.getFormInputDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview, this.infoButton), this.container.appendChild(this.control);
          var t = this.getButton("button_upload", "upload", "button_upload");
          t.addEventListener("click", function() {
            e.uploader.click();
          }), this.control.appendChild(t), this.setInputAttributes(["multiple"], t);
        } }, { key: "refreshPreview", value: function() {
          if (this.last_preview !== this.value && (this.last_preview = this.value, this.preview.innerHTML = "", this.value)) {
            var e = this.value.match(/^data:([^;,]+)[;,]/);
            if (e && (e = e[1]), e) {
              if (this.preview.innerHTML = "<strong>Type:</strong> ".concat(e, ", <strong>Size:</strong> ").concat(Math.floor((this.value.length - this.value.split(",")[0].length - 1) / 1.33333), " bytes"), e.substr(0, 5) === "image") {
                this.preview.innerHTML += "<br>";
                var t = document.createElement("img");
                t.style.maxWidth = "100%", t.style.maxHeight = "100px", t.src = this.value, this.preview.appendChild(t);
              }
            } else this.preview.innerHTML = "<em>Invalid data URI</em>";
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Bi(Hr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Bi(Hr(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(e) ? this.value = this.schema.enum[0] : this.value = e, this.input.value = this.value, this.refreshPreview(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), Bi(Hr(r.prototype), "destroy", this).call(this);
        } }]) && Td(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function qn(o) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(o);
      }
      function Id(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Bd(l.key), l);
        }
      }
      function Bd(o) {
        var r = function(n, l) {
          if (qn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (qn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return qn(r) == "symbol" ? r : r + "";
      }
      function Nd(o, r, n) {
        return r = Vr(r), function(l, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, fl() ? Reflect.construct(r, n || [], Vr(o).constructor) : r.apply(o, n));
      }
      function fl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (fl = function() {
          return !!o;
        })();
      }
      function Ni() {
        return Ni = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ni.apply(this, arguments);
      }
      function Vr(o) {
        return Vr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vr(o);
      }
      function hs(o, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, hs(o, r);
      }
      var yl = function(o) {
        function r(e, t) {
          var i;
          return function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = Nd(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", v({}, { icon: "", validated: !1, align: "left", action: function(c, d) {
            window.alert('No button action defined for "'.concat(c.path, '"'));
          } }, this.defaults.options.button || {}, this.options.button || {})), i = this.translateProperty(t.text || this.schema.title) || this.key;
          this.input = this.getButton(i, t.icon, i), typeof t.action != "function" ? window.alert('No button action defined for "'.concat(this.path, '"')) : this.input.addEventListener("click", t.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(t.align), this.control.appendChild(this.input), this.container.appendChild(this.control), this.changeHandler = function() {
            e.jsoneditor.validate(e.jsoneditor.getValue()).length > 0 ? e.disable() : e.enable();
          }, t.validated && this.jsoneditor.on("change", this.changeHandler);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Ni(Vr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Ni(Vr(r.prototype), "disable", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "activate", value: function() {
          this.active = !1, this.enable();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.disable());
        } }, { key: "destroy", value: function() {
          this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, Ni(Vr(r.prototype), "destroy", this).call(this);
        } }]) && Id(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Un(o) {
        return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Un(o);
      }
      function Dd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Fd(l.key), l);
        }
      }
      function Fd(o) {
        var r = function(n, l) {
          if (Un(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Un(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Un(r) == "symbol" ? r : r + "";
      }
      function Md(o, r, n) {
        return r = Ht(r), function(l, e) {
          if (e && (Un(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ml() ? Reflect.construct(r, n || [], Ht(o).constructor) : r.apply(o, n));
      }
      function ml() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ml = function() {
          return !!o;
        })();
      }
      function zr() {
        return zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ht(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, zr.apply(this, arguments);
      }
      function Ht(o) {
        return Ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ht(o);
      }
      function ps(o, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ps(o, r);
      }
      var Hd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Md(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = !!(e = this.applyConstFilter(e));
          var i = this.getValue() !== e;
          this.value = e, this.input.checked = this.value, t || (this.is_dirty = !0), this.onChange(i);
        } }, { key: "register", value: function() {
          zr(Ht(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          zr(Ht(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          return Math.min(12, Math.max(this.getTitle().length / 7, 2));
        } }, { key: "setOptInCheckbox", value: function() {
          zr(Ht(r.prototype), "setOptInCheckbox", this).call(this), this.optInAppended && (this.container.insertBefore(this.optInContainer, this.container.firstChild), this.optInContainer.style.verticalAlign = "top", this.control.style.marginTop = "0");
        } }, { key: "build", value: function() {
          var e = this;
          this.parent.options.table_row || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.label.htmlFor = this.formname), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.input.id = this.formname, this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.control.style.display = "inline-block", (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.input.addEventListener("change", function(t) {
            t.preventDefault(), t.stopPropagation(), e.value = t.currentTarget.checked, e.is_dirty = !0, e.onChange(!0);
          }), this.container.appendChild(this.control);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, zr(Ht(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, zr(Ht(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), zr(Ht(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, c = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!c || this.is_dirty)) {
            var d = e.reduce(function(g, x) {
              return x.path === t.path && g.push(x.message), g;
            }, []);
            this.input.controlgroup = this.control, d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Dd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function $n(o) {
        return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $n(o);
      }
      function Vd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, zd(l.key), l);
        }
      }
      function zd(o) {
        var r = function(n, l) {
          if ($n(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($n(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return $n(r) == "symbol" ? r : r + "";
      }
      function qd(o, r, n) {
        return r = Vt(r), function(l, e) {
          if (e && ($n(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, bl() ? Reflect.construct(r, n || [], Vt(o).constructor) : r.apply(o, n));
      }
      function bl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (bl = function() {
          return !!o;
        })();
      }
      function qr() {
        return qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, qr.apply(this, arguments);
      }
      function Vt(o) {
        return Vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vt(o);
      }
      function fs(o, r) {
        return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fs(o, r);
      }
      b(6910);
      var Di = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), c = this.enum_options.length > 0 && this.enum_values.includes(i), d = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || c && (!t || this.isRequired() || d) || (i = this.enum_values[0]), this.value !== i) {
            var g = this.enum_values.indexOf(i);
            c && g !== -1 ? this.input.value = this.enum_options[g] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, t || (this.is_dirty = !0), this.onChange(), this.change();
          }
        } }, { key: "register", value: function() {
          qr(Vt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          qr(Vt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          if (!this.enum_options) return 3;
          for (var e = this.getTitle().length, t = 0; t < this.enum_options.length; t++) e = Math.max(e, this.enum_options[t].length + 4);
          return Math.min(12, Math.max(e / 7, 2));
        } }, { key: "typecast", value: function(e) {
          return this.schema.type === "boolean" ? e === "undefined" || e === void 0 ? void 0 : !!e : this.schema.type === "number" ? 1 * e || 0 : this.schema.type === "integer" ? Math.floor(1 * e || 0) : this.schema.enum && e === void 0 ? void 0 : "".concat(e);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.typecast(this.value);
        } }, { key: "preBuild", value: function() {
          var e, t, i, c, d = this;
          if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.hasPlaceholderOption = ((e = this.schema) === null || e === void 0 || (e = e.options) === null || e === void 0 ? void 0 : e.has_placeholder_option) || !1, this.placeholderOptionText = ((t = this.schema) === null || t === void 0 || (t = t.options) === null || t === void 0 ? void 0 : t.placeholder_option_text) || " ", this.enforceConst && this.schema.const) {
            var g = this.schema.const;
            this.enum_options = ["".concat(g)], this.enum_display = ["".concat(this.translateProperty(g) || g)], this.enum_values = [this.typecast(g)];
          } else if (this.schema.enum) {
            var x = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(S, D) {
              d.enum_options[D] = "".concat(S), d.enum_display[D] = "".concat(d.translateProperty(x[D]) || S), d.enum_values[D] = d.typecast(S);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = v({}, this.schema.enumSource[i]);
            else this.schema.enumValue ? this.enumSource = [{ source: this.schema.enumSource, value: this.schema.enumValue }] : this.enumSource = [{ source: this.schema.enumSource }];
            for (i = 0; i < this.enumSource.length; i++) this.enumSource[i].value && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].value })).template == "function" ? this.enumSource[i].value = c.template : this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine)), this.enumSource[i].title && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].title })).template == "function" ? this.enumSource[i].title = c.template : this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine)), this.enumSource[i].filter && this.enumSource[i].value && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].filter })).template == "function" ? this.enumSource[i].filter = c.template : this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine));
          }
        } }, { key: "build", value: function() {
          var e = this;
          this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getSelectInput(this.enum_options, !1), this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display, this.hasPlaceholderOption, this.placeholderOptionText), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.setInputAttributes([]), this.input.addEventListener("change", function(t) {
            t.preventDefault(), t.stopPropagation(), e.onInputChange();
          }), this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), this.value = this.enum_values[0], window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady();
          });
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input);
        } }, { key: "onInputChange", value: function() {
          var e, t = this.typecast(this.input.value);
          (e = this.enum_values.includes(t) ? this.enum_values[this.enum_values.indexOf(t)] : this.enum_values[0]) !== this.value && (this.is_dirty = !0, this.value = e, this.onChange(!0));
        } }, { key: "onWatchedFieldChange", value: function() {
          var e, t, i = [], c = [];
          if (this.enumSource) {
            e = this.getWatchedFieldValues();
            for (var d = 0; d < this.enumSource.length; d++) if (Array.isArray(this.enumSource[d])) i = i.concat(this.enumSource[d]), c = c.concat(this.enumSource[d]);
            else {
              var g = [];
              if (g = Array.isArray(this.enumSource[d].source) ? this.enumSource[d].source : e[this.enumSource[d].source]) {
                if (this.enumSource[d].slice && (g = Array.prototype.slice.apply(g, this.enumSource[d].slice)), this.enumSource[d].filter) {
                  var x = [];
                  for (t = 0; t < g.length; t++) this.enumSource[d].filter({ i: t, item: g[t], watched: e }) && x.push(g[t]);
                  g = x;
                }
                var S = [], D = [];
                for (t = 0; t < g.length; t++) {
                  var $ = g[t];
                  this.enumSource[d].value ? D[t] = this.typecast(this.enumSource[d].value({ i: t, item: $ })) : D[t] = g[t], this.enumSource[d].title ? S[t] = this.enumSource[d].title({ i: t, item: $ }) : S[t] = D[t];
                }
                this.enumSource[d].sort && (function(te, pe, _e) {
                  te.map(function(we, Ie) {
                    return { v: we, t: pe[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    te[Ie] = we.v, pe[Ie] = we.t;
                  });
                }).bind(null, D, S, this.enumSource[d].sort === "desc" ? 1 : -1)(), i = i.concat(D), c = c.concat(S);
              }
            }
            var G = this.value;
            this.theme.setSelectOptions(this.input, i, c), this.enum_options = i, this.enum_display = c, this.enum_values = i, i.includes(G) || this.jsoneditor.options.enum_source_value_auto_select !== !1 ? (this.input.value = G, this.value = G) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path));
          }
          qr(Vt(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, qr(Vt(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, qr(Vt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), qr(Vt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, c = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!c || this.is_dirty)) {
            var d = e.reduce(function(g, x) {
              return x.path === t.path && g.push(x.message), g;
            }, []);
            d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Vd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Gn(o) {
        return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gn(o);
      }
      function Ud(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, $d(l.key), l);
        }
      }
      function $d(o) {
        var r = function(n, l) {
          if (Gn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Gn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Gn(r) == "symbol" ? r : r + "";
      }
      function Gd(o, r, n) {
        return r = zt(r), function(l, e) {
          if (e && (Gn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, vl() ? Reflect.construct(r, n || [], zt(o).constructor) : r.apply(o, n));
      }
      function vl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (vl = function() {
          return !!o;
        })();
      }
      function Ur() {
        return Ur = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ur.apply(this, arguments);
      }
      function zt(o) {
        return zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, zt(o);
      }
      function ys(o, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ys(o, r);
      }
      var gl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else Ur(zt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", v({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, e);
          }
          Ur(zt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          if (Ur(zt(r.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var t = this.enum_options.map(function(i, c) {
              return { value: i, label: e.enum_display[c] };
            });
            this.choices_instance.setChoices(t, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Ur(zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), Ur(zt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Ur(zt(r.prototype), "destroy", this).call(this);
        } }]) && Ud(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function hn(o) {
        return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hn(o);
      }
      function Wd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Jd(l.key), l);
        }
      }
      function Jd(o) {
        var r = function(n, l) {
          if (hn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (hn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return hn(r) == "symbol" ? r : r + "";
      }
      function Kd(o, r, n) {
        return r = $r(r), function(l, e) {
          if (e && (hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, _l() ? Reflect.construct(r, n || [], $r(o).constructor) : r.apply(o, n));
      }
      function _l() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (_l = function() {
          return !!o;
        })();
      }
      function Fi() {
        return Fi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $r(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Fi.apply(this, arguments);
      }
      function $r(o) {
        return $r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $r(o);
      }
      function ms(o, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ms(o, r);
      }
      gl.rules = { ".choices > *": "box-sizing:border-box" };
      var Zd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Kd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          if (Fi($r(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && hn(this.options.flatpickr) === "object")) {
            this.options.flatpickr.enableTime = this.schema.format !== "date", this.options.flatpickr.noCalendar = this.schema.format === "time", this.schema.type === "integer" && (this.options.flatpickr.mode = "single"), this.input.setAttribute("data-input", "");
            var e = this.input;
            if (this.options.flatpickr.wrap === !0) {
              var t = [];
              if (this.options.flatpickr.showToggleButton !== !1) {
                var i = this.getButton("", this.schema.format === "time" ? "time" : "calendar", "flatpickr_toggle_button");
                i.setAttribute("data-toggle", ""), t.push(i);
              }
              if (this.options.flatpickr.showClearButton !== !1) {
                var c = this.getButton("", "clear", "flatpickr_clear_button");
                c.setAttribute("data-clear", ""), t.push(c);
              }
              var d = this.input.parentNode, g = this.input.nextSibling, x = this.theme.getInputGroup(this.input, t);
              x !== void 0 ? (this.options.flatpickr.inline = !1, d.insertBefore(x, g), e = x) : this.options.flatpickr.wrap = !1;
            }
            this.flatpickr = window.flatpickr(e, this.options.flatpickr), this.options.flatpickr.inline === !0 && this.options.flatpickr.inlineHideInput === !0 && this.input.setAttribute("type", "hidden");
          }
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            if (this.schema.type === "string") return this.value;
            if (this.value !== "" && this.value !== void 0) {
              var e = this.schema.format === "time" ? "1970-01-01 ".concat(this.value) : this.value;
              return parseInt(new Date(e).getTime() / 1e3);
            }
          }
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), this.schema.type === "string") Fi($r(r.prototype), "setValue", this).call(this, e, t, i), this.flatpickr && this.flatpickr.setDate(e);
          else if (e > 0) {
            var c = new Date(1e3 * e), d = c.getFullYear(), g = this.zeroPad(c.getMonth() + 1), x = this.zeroPad(c.getDate()), S = this.zeroPad(c.getHours()), D = this.zeroPad(c.getMinutes()), $ = this.zeroPad(c.getSeconds()), G = [d, g, x].join("-"), te = [S, D, $].join(":"), pe = "".concat(G, "T").concat(te);
            this.schema.format === "date" ? pe = G : this.schema.format === "time" && (pe = te), this.input.value = pe, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(pe);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Fi($r(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && Wd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Wn(o) {
        return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Wn(o);
      }
      function Yd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Qd(l.key), l);
        }
      }
      function Qd(o) {
        var r = function(n, l) {
          if (Wn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Wn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Wn(r) == "symbol" ? r : r + "";
      }
      function Xd(o, r, n) {
        return r = qt(r), function(l, e) {
          if (e && (Wn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, wl() ? Reflect.construct(r, n || [], qt(o).constructor) : r.apply(o, n));
      }
      function wl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wl = function() {
          return !!o;
        })();
      }
      function Gr() {
        return Gr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = qt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Gr.apply(this, arguments);
      }
      function qt(o) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, qt(o);
      }
      function bs(o, r) {
        return bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, bs(o, r);
      }
      var eh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Xd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && bs(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.currentEditor] && this.editors[this.currentEditor].register();
          }
          Gr(qt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Gr(qt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
          Gr(qt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable();
          Gr(qt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function() {
          var e = this, t = this.getWatchedFieldValues();
          if (t) {
            var i = document.location.origin + document.location.pathname + this.template(t);
            this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), this.editors.forEach(function(c, d) {
              c && (e.currentEditor === d ? c.container.style.display = "" : c.container.style.display = "none");
            }), this.refreshValue(), this.onChange(!0);
          }
        } }, { key: "buildChildEditor", value: function(e) {
          this.refs[e] = this.editors.length;
          var t = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(t);
          var i = v({}, this.schema, this.jsoneditor.refs[e]), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
          this.editors.push(d), d.preBuild(), d.build(), d.postBuild();
        } }, { key: "preBuild", value: function() {
          var e;
          for (this.refs = {}, this.editors = [], this.currentEditor = "", e = 0; e < this.schema.links.length; e++) if (this.schema.links[e].rel.toLowerCase() === "describedby") {
            this.template = this.jsoneditor.compileTemplate(this.schema.links[e].href, this.template_engine);
            break;
          }
          this.schema.links = this.schema.links.slice(0, e).concat(this.schema.links.slice(e + 1)), this.schema.links.length === 0 && delete this.schema.links, this.baseSchema = v({}, this.schema);
        } }, { key: "build", value: function() {
          this.editor_holder = document.createElement("div"), this.container.appendChild(this.editor_holder), this.switchEditor();
        } }, { key: "onWatchedFieldChange", value: function() {
          this.switchEditor();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.currentEditor] && this.refreshValue(), Gr(qt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "refreshValue", value: function() {
          this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue());
        } }, { key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(e, t), this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), Gr(qt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          this.editors.forEach(function(t) {
            t && t.showValidationErrors(e);
          });
        } }]) && Yd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function pn(o) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pn(o);
      }
      function jl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function th(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, rh(l.key), l);
        }
      }
      function rh(o) {
        var r = function(n, l) {
          if (pn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (pn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return pn(r) == "symbol" ? r : r + "";
      }
      function nh(o, r, n) {
        return r = Wr(r), function(l, e) {
          if (e && (pn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, kl() ? Reflect.construct(r, n || [], Wr(o).constructor) : r.apply(o, n));
      }
      function kl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (kl = function() {
          return !!o;
        })();
      }
      function Mi() {
        return Mi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Mi.apply(this, arguments);
      }
      function Wr(o) {
        return Wr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wr(o);
      }
      function vs(o, r) {
        return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, vs(o, r);
      }
      var ih = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), nh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vs(e, t);
        }(r, o), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.container.appendChild(this.title), this.options.enum_titles = this.options.enum_titles || [], this.enforceConstEnabled && this.schema.const ? this.enum = [this.schema.const] : this.enum = this.schema.enum, this.selected = 0, this.select_options = [], this.html_values = [];
          for (var t = 0; t < this.enum.length; t++) this.select_options[t] = this.options.enum_titles[t] || "Value ".concat(t + 1), this.html_values[t] = this.getHTML(this.enum[t]);
          this.switcher = this.theme.getSwitcher(this.select_options), this.container.appendChild(this.switcher), this.display_area = this.theme.getIndentedPanel(), this.container.appendChild(this.display_area), this.options.hide_display && (this.display_area.style.display = "none"), this.switcher.addEventListener("change", function(i) {
            e.selected = e.select_options.indexOf(i.currentTarget.value), e.value = e.enum[e.selected], e.refreshValue(), e.onChange(!0);
          }), this.value = this.enum[0], this.refreshValue(), this.enum.length === 1 && (this.switcher.style.display = "none");
        } }, { key: "refreshValue", value: function() {
          var e = this;
          if (this.enum) {
            this.selected = -1;
            var t = JSON.stringify(this.value);
            this.enum.forEach(function(i, c) {
              if (t === JSON.stringify(i)) return e.selected = c, !1;
            }), this.selected < 0 ? this.setValue(this.enum[0]) : (this.switcher.value = this.select_options[this.selected], this.display_area.innerHTML = this.html_values[this.selected]);
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.switcher.disabled = !1, Mi(Wr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.switcher.disabled = !0, Mi(Wr(r.prototype), "disable", this).call(this);
        } }, { key: "getHTML", value: function(e) {
          var t, i, c = this;
          if (e === null) return "<em>null</em>";
          if (pn(e) === "object") {
            var d = "";
            return t = e, i = function(g, x) {
              var S = c.getHTML(x);
              Array.isArray(e) || (S = "<div><em>".concat(g, "</em>: ").concat(S, "</div>")), d += "<li>".concat(S, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(g, x) {
              return i(x, g);
            }) : Object.entries(t).forEach(function(g) {
              var x, S, D = (S = 2, function(te) {
                if (Array.isArray(te)) return te;
              }(x = g) || function(te, pe) {
                var _e = te == null ? null : typeof Symbol < "u" && te[Symbol.iterator] || te["@@iterator"];
                if (_e != null) {
                  var we, Ie, De, He, ve = [], xe = !0, Ke = !1;
                  try {
                    if (De = (_e = _e.call(te)).next, pe === 0) {
                      if (Object(_e) !== _e) return;
                      xe = !1;
                    } else for (; !(xe = (we = De.call(_e)).done) && (ve.push(we.value), ve.length !== pe); xe = !0) ;
                  } catch (it) {
                    Ke = !0, Ie = it;
                  } finally {
                    try {
                      if (!xe && _e.return != null && (He = _e.return(), Object(He) !== He)) return;
                    } finally {
                      if (Ke) throw Ie;
                    }
                  }
                  return ve;
                }
              }(x, S) || function(te, pe) {
                if (te) {
                  if (typeof te == "string") return jl(te, pe);
                  var _e = Object.prototype.toString.call(te).slice(8, -1);
                  return _e === "Object" && te.constructor && (_e = te.constructor.name), _e === "Map" || _e === "Set" ? Array.from(te) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? jl(te, pe) : void 0;
                }
              }(x, S) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), $ = D[0], G = D[1];
              return i($, G);
            }), d = Array.isArray(e) ? "<ol>".concat(d, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(d, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Mi(Wr(r.prototype), "destroy", this).call(this);
        } }]) && th(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function fn(o) {
        return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fn(o);
      }
      function oh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, sh(l.key), l);
        }
      }
      function sh(o) {
        var r = function(n, l) {
          if (fn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (fn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return fn(r) == "symbol" ? r : r + "";
      }
      function ah(o, r, n) {
        return r = Ut(r), function(l, e) {
          if (e && (fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, xl() ? Reflect.construct(r, n || [], Ut(o).constructor) : r.apply(o, n));
      }
      function xl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (xl = function() {
          return !!o;
        })();
      }
      function Jr() {
        return Jr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Jr.apply(this, arguments);
      }
      function Ut(o) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(o);
      }
      function gs(o, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, gs(o, r);
      }
      var lh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          Jr(Ut(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Jr(Ut(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), (!this.template || i) && (e == null ? e = "" : fn(e) === "object" ? e = JSON.stringify(e) : typeof e != "string" && (e = "".concat(e)), e !== this.serialized)) {
            var c = this.sanitize(e);
            if (this.input.value !== c) {
              this.input.value = c;
              var d = i || this.getValue() !== e;
              this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(d);
            }
          }
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "enable", value: function() {
          Jr(Ut(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Jr(Ut(r.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Jr(Ut(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), Jr(Ut(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var e = this.expandCallbacks("template", { template: this.schema.template });
            typeof e.template == "function" ? this.template = e.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && oh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Jn(o) {
        return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Jn(o);
      }
      function ch(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, uh(l.key), l);
        }
      }
      function uh(o) {
        var r = function(n, l) {
          if (Jn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Jn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Jn(r) == "symbol" ? r : r + "";
      }
      function dh(o, r, n) {
        return r = yo(r), function(l, e) {
          if (e && (Jn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ol() ? Reflect.construct(r, n || [], yo(o).constructor) : r.apply(o, n));
      }
      function Ol() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ol = function() {
          return !!o;
        })();
      }
      function yo(o) {
        return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, yo(o);
      }
      function _s(o, r) {
        return _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, _s(o, r);
      }
      var hh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), dh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _s(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          this.options.compact = !1, this.header = this.label = this.theme.getLabelLike(this.getTitle()), this.description = this.theme.getDescription(this.schema.description || ""), this.control = this.theme.getFormControl(this.label, this.description, null), this.container.appendChild(this.control);
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getNumColumns", value: function() {
          return 12;
        } }, { key: "disable", value: function() {
          return !1;
        } }, { key: "enable", value: function() {
          return !1;
        } }]) && ch(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(yl);
      function Kn(o) {
        return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Kn(o);
      }
      function ph(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, fh(l.key), l);
        }
      }
      function fh(o) {
        var r = function(n, l) {
          if (Kn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Kn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Kn(r) == "symbol" ? r : r + "";
      }
      function yh(o, r, n) {
        return r = Zn(r), function(l, e) {
          if (e && (Kn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Cl() ? Reflect.construct(r, n || [], Zn(o).constructor) : r.apply(o, n));
      }
      function Cl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Cl = function() {
          return !!o;
        })();
      }
      function ws() {
        return ws = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Zn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ws.apply(this, arguments);
      }
      function Zn(o) {
        return Zn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Zn(o);
      }
      function js(o, r) {
        return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, js(o, r);
      }
      var El = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && js(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          if (ws(Zn(r.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
            var e = this.schema.minimum;
            this.schema.exclusiveMinimum !== void 0 && (e += 1), this.input.setAttribute("min", e);
          }
          if (this.schema.maximum !== void 0) {
            var t = this.schema.maximum;
            this.schema.exclusiveMaximum !== void 0 && (t -= 1), this.input.setAttribute("max", t);
          }
          if (this.schema.step !== void 0) {
            var i = this.schema.step || 1;
            this.input.setAttribute("step", i);
          }
          this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(E), i = parseFloat(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseFloat(this.value) : this.value : void (this.shouldBeUnset() && (this.input.value = ""));
        } }]) && ph(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Yn(o) {
        return Yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Yn(o);
      }
      function mh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, bh(l.key), l);
        }
      }
      function bh(o) {
        var r = function(n, l) {
          if (Yn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Yn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Yn(r) == "symbol" ? r : r + "";
      }
      function vh(o, r, n) {
        return r = mo(r), function(l, e) {
          if (e && (Yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Sl() ? Reflect.construct(r, n || [], mo(o).constructor) : r.apply(o, n));
      }
      function Sl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Sl = function() {
          return !!o;
        })();
      }
      function mo(o) {
        return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mo(o);
      }
      function ks(o, r) {
        return ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ks(o, r);
      }
      var Pl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), vh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ks(e, t);
        }(r, o), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(P), i = parseInt(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && mh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(El);
      function Qn(o) {
        return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qn(o);
      }
      function gh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, _h(l.key), l);
        }
      }
      function _h(o) {
        var r = function(n, l) {
          if (Qn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Qn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Qn(r) == "symbol" ? r : r + "";
      }
      function wh(o, r, n) {
        return r = Xn(r), function(l, e) {
          if (e && (Qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Tl() ? Reflect.construct(r, n || [], Xn(o).constructor) : r.apply(o, n));
      }
      function Tl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Tl = function() {
          return !!o;
        })();
      }
      function xs() {
        return xs = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Xn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, xs.apply(this, arguments);
      }
      function Xn(o) {
        return Xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Xn(o);
      }
      function Os(o, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Os(o, r);
      }
      var jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Os(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          if (xs(Xn(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = v(this.options, this.schema.options || {});
        } }]) && gh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function ei(o) {
        return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ei(o);
      }
      function kh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, xh(l.key), l);
        }
      }
      function xh(o) {
        var r = function(n, l) {
          if (ei(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ei(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ei(r) == "symbol" ? r : r + "";
      }
      function Oh(o, r, n) {
        return r = $t(r), function(l, e) {
          if (e && (ei(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ll() ? Reflect.construct(r, n || [], $t(o).constructor) : r.apply(o, n));
      }
      function Ll() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ll = function() {
          return !!o;
        })();
      }
      function Kr() {
        return Kr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $t(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Kr.apply(this, arguments);
      }
      function $t(o) {
        return $t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $t(o);
      }
      function Cs(o, r) {
        return Cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Cs(o, r);
      }
      var Ch = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Oh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Kr($t(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.jodit_instance && this.jodit_instance.setEditorValue(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Kr($t(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", v({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            t.value = t.jodit_instance.getEditorValue(), t.is_dirty = !0, t.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : Kr($t(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), Kr($t(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), Kr($t(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), Kr($t(r.prototype), "destroy", this).call(this);
        } }]) && kh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Eh(o, r, n, l) {
        try {
          switch (o.format) {
            case "ipv4":
              (function(e) {
                var t = e.split(".");
                if (t.length !== 4) throw new Error("error_ipv4");
                t.forEach(function(i) {
                  if (isNaN(+i) || +i < 0 || +i > 255) throw new Error("error_ipv4");
                });
              })(r);
              break;
            case "ipv6":
              (function(e) {
                if (!e.match("^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]).){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$")) throw new Error("error_ipv6");
              })(r);
              break;
            case "hostname":
              (function(e) {
                if (!e.match("(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9].)+[a-zA-Z]{2,63}$)")) throw new Error("error_hostname");
              })(r);
          }
          return [];
        } catch (e) {
          return [{ path: n, property: "format", message: l(e.message) }];
        }
      }
      function Al(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(o);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function Sh(o, r, n) {
        return (r = Rl(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Gt(o) {
        return Gt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gt(o);
      }
      function Hi(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, d, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(o, r) || Es(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ct(o) {
        return function(r) {
          if (Array.isArray(r)) return Ss(r);
        }(o) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(o) || Es(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Es(o, r) {
        if (o) {
          if (typeof o == "string") return Ss(o, r);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set" ? Array.from(o) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ss(o, r) : void 0;
        }
      }
      function Ss(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function Ph(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Rl(l.key), l);
        }
      }
      function Rl(o) {
        var r = function(n, l) {
          if (Gt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Gt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Gt(r) == "symbol" ? r : r + "";
      }
      b(8431);
      var Il = function() {
        return o = function n(l, e, t, i) {
          (function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = l, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(c, d, g) {
            var x = [];
            if (c.dependentRequired !== void 0) {
              var S = [];
              Object.keys(c.dependentRequired).forEach(function(D) {
                if (d[D] !== void 0) {
                  var $ = c.dependentRequired[D];
                  S = $.filter(function(G) {
                    return !k(d, G);
                  });
                }
              }), S.length > 0 && x.push({ message: "Must have the required properties: " + S.join(", "), path: g });
            }
            return x;
          }, dependentSchemas: function(c, d, g) {
            var x = this, S = [];
            return Object.keys(c.dependentSchemas).forEach(function(D) {
              if (d[D] !== void 0) {
                var $ = c.dependentSchemas[D], G = x._validateSchema($, d, g);
                S = [].concat(ct(S), ct(G));
              }
            }), S;
          }, contains: function(c, d, g) {
            var x = this, S = [], D = 0;
            d.forEach(function(G) {
              x._validateSchema(c.contains, G, g).length === 0 && D++;
            });
            var $ = D === 0;
            return c.minContains !== void 0 ? D < c.minContains && S.push({ message: this.translate("error_minContains", [D, c.minContains], c), path: g }) : $ && S.push({ message: this.translate("error_contains", null, c), path: g }), c.maxContains !== void 0 && D > c.maxContains && S.push({ message: this.translate("error_maxContains", [D, c.maxContains], c), path: g }), S;
          }, if: function(c, d, g) {
            if (c.then === void 0 && c.else === void 0) return [];
            var x = this._validateSchema(c.if, d, g), S = [], D = [];
            return c.then !== void 0 && (S = this._validateSchema(c.then, d, g)), c.else !== void 0 && (D = this._validateSchema(c.else, d, g)), c.if === !0 ? S : c.if === !1 ? D : x.length === 0 ? S : x.length > 0 ? D : [];
          }, const: function(c, d, g) {
            return JSON.stringify(c.const) === JSON.stringify(d) ? [] : [{ path: g, property: "const", message: this.translate("error_const", null, c) }];
          }, enum: function(c, d, g) {
            var x = JSON.stringify(d);
            return c.enum.some(function(S) {
              return x === JSON.stringify(S);
            }) ? [] : [{ path: g, property: "enum", message: this.translate("error_enum", null, c) }];
          }, extends: function(c, d, g) {
            var x = this;
            return c.extends.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, d, g))), S;
            }, []);
          }, allOf: function(c, d, g) {
            var x = this;
            return c.allOf.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, d, g))), S;
            }, []);
          }, anyOf: function(c, d, g) {
            var x = this;
            return c.anyOf.some(function(S) {
              return !x._validateSchema(S, d, g).length;
            }) ? [] : [{ path: g, property: "anyOf", message: this.translate("error_anyOf", null, c) }];
          }, oneOf: function(c, d, g) {
            var x = this, S = 0, D = [];
            c.oneOf.forEach(function(G, te) {
              var pe = x._validateSchema(G, d, g);
              pe.length || S++, pe.forEach(function(_e) {
                _e.path = "".concat(g, ".oneOf[").concat(te, "]").concat(_e.path.substr(g.length));
              }), D.push.apply(D, ct(pe));
            });
            var $ = [];
            return S !== 1 && ($.push({ path: g, property: "oneOf", message: this.translate("error_oneOf", [S], c) }), $.push.apply($, D)), $;
          }, not: function(c, d, g) {
            return this._validateSchema(c.not, d, g).length ? [] : [{ path: g, property: "not", message: this.translate("error_not", null, c) }];
          }, type: function(c, d, g) {
            var x = this;
            if (Array.isArray(c.type)) {
              if (!c.type.some(function(S) {
                return x._checkType(S, d);
              })) return [{ path: g, property: "type", message: this.translate("error_type_union", null, c) }];
            } else if (["date", "time", "datetime-local"].includes(c.format) && c.type === "integer") {
              if (!this._checkType("string", "".concat(d))) return [{ path: g, property: "type", message: this.translate("error_type", [c.format], c) }];
            } else if (!this._checkType(c.type, d)) return [{ path: g, property: "type", message: this.translate("error_type", [c.type], c) }];
            return [];
          }, disallow: function(c, d, g) {
            var x = this;
            if (Array.isArray(c.disallow)) {
              if (c.disallow.some(function(S) {
                return x._checkType(S, d);
              })) return [{ path: g, property: "disallow", message: this.translate("error_disallow_union", null, c) }];
            } else if (this._checkType(c.disallow, d)) return [{ path: g, property: "disallow", message: this.translate("error_disallow", [c.disallow], c) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(c, d, g) {
            return this._validateNumberSubSchemaMultipleDivisible(c, d, g);
          }, divisibleBy: function(c, d, g) {
            return this._validateNumberSubSchemaMultipleDivisible(c, d, g);
          }, maximum: function(c, d, g) {
            var x = c.exclusiveMaximum ? d < c.maximum : d <= c.maximum;
            return window.math ? x = window.math[c.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(d), window.math.bignumber(c.maximum)) : window.Decimal && (x = new window.Decimal(d)[c.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(c.maximum))), x ? [] : [{ path: g, property: "maximum", message: this.translate(c.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [c.maximum], c) }];
          }, minimum: function(c, d, g) {
            var x = c.exclusiveMinimum ? d > c.minimum : d >= c.minimum;
            return window.math ? x = window.math[c.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(d), window.math.bignumber(c.minimum)) : window.Decimal && (x = new window.Decimal(d)[c.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(c.minimum))), x ? [] : [{ path: g, property: "minimum", message: this.translate(c.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [c.minimum], c) }];
          } }, this._validateStringSubSchema = { maxLength: function(c, d, g) {
            var x = [];
            return "".concat(d).length > c.maxLength && x.push({ path: g, property: "maxLength", message: this.translate("error_maxLength", [c.maxLength], c) }), x;
          }, minLength: function(c, d, g) {
            return "".concat(d).length < c.minLength ? [{ path: g, property: "minLength", message: this.translate(c.minLength === 1 ? "error_notempty" : "error_minLength", [c.minLength], c) }] : [];
          }, pattern: function(c, d, g) {
            return new RegExp(c.pattern).test(d) ? [] : [{ path: g, property: "pattern", message: c.options && c.options.patternmessage ? c.options.patternmessage : this.translate("error_pattern", [c.pattern], c) }];
          } }, this._validateArraySubSchema = { items: function(c, d, g) {
            var x = this, S = [];
            if (Array.isArray(c.items)) for (var D = 0; D < d.length; D++) if (c.items[D]) S.push.apply(S, ct(this._validateSchema(c.items[D], d[D], "".concat(g, ".").concat(D))));
            else {
              if (c.additionalItems === !0) break;
              if (!c.additionalItems) {
                if (c.additionalItems === !1) {
                  S.push({ path: g, property: "additionalItems", message: this.translate("error_additionalItems", null, c) });
                  break;
                }
                break;
              }
              S.push.apply(S, ct(this._validateSchema(c.additionalItems, d[D], "".concat(g, ".").concat(D))));
            }
            else d.forEach(function($, G) {
              S.push.apply(S, ct(x._validateSchema(c.items, $, "".concat(g, ".").concat(G))));
            });
            return S;
          }, maxItems: function(c, d, g) {
            return d.length > c.maxItems ? [{ path: g, property: "maxItems", message: this.translate("error_maxItems", [c.maxItems], c) }] : [];
          }, minItems: function(c, d, g) {
            return d.length < c.minItems ? [{ path: g, property: "minItems", message: this.translate("error_minItems", [c.minItems], c) }] : [];
          }, uniqueItems: function(c, d, g) {
            for (var x = {}, S = 0; S < d.length; S++) {
              var D = JSON.stringify(d[S]);
              if (x[D]) return [{ path: g, property: "uniqueItems", message: this.translate("error_uniqueItems", null, c) }];
              x[D] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(c, d, g) {
            return Object.keys(d).length > c.maxProperties ? [{ path: g, property: "maxProperties", message: this.translate("error_maxProperties", [c.maxProperties], c) }] : [];
          }, minProperties: function(c, d, g) {
            return Object.keys(d).length < c.minProperties ? [{ path: g, property: "minProperties", message: this.translate("error_minProperties", [c.minProperties], c) }] : [];
          }, required: function(c, d, g) {
            var x = this, S = [];
            return Array.isArray(c.required) && c.required.forEach(function(D) {
              if (d[D] === void 0) {
                var $ = x.jsoneditor.getEditor("".concat(g, ".").concat(D));
                $ && $.dependenciesFulfilled === !1 || $ && ["button", "info"].includes($.schema.format || $.schema.type) || S.push({ path: g, property: "required", message: x.translate("error_required", [c && c.properties && c.properties[D] && c.properties[D].title ? c.properties[D].title : D], c) });
              }
            }), S;
          }, properties: function(c, d, g, x) {
            var S = this, D = [];
            return Object.entries(c.properties).forEach(function($) {
              var G = Hi($, 2), te = G[0], pe = G[1];
              x[te] = !0, D.push.apply(D, ct(S._validateSchema(pe, d[te], "".concat(g, ".").concat(te))));
            }), D;
          }, patternProperties: function(c, d, g, x) {
            var S = this, D = [];
            return Object.entries(c.patternProperties).forEach(function($) {
              var G = Hi($, 2), te = G[0], pe = G[1], _e = new RegExp(te);
              Object.entries(d).forEach(function(we) {
                var Ie = Hi(we, 2), De = Ie[0], He = Ie[1];
                _e.test(De) && (x[De] = !0, D.push.apply(D, ct(S._validateSchema(pe, He, "".concat(g, ".").concat(De)))));
              });
            }), D;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(c, d, g, x) {
            for (var S, D = this, $ = [], G = Object.keys(d), te = null, pe = function() {
              var we = "";
              return te = G[_e], typeof c.propertyNames == "boolean" ? c.propertyNames === !0 ? 0 : ($.push({ path: g, property: "propertyNames", message: D.translate("error_property_names_false", [te], c) }), 1) : Object.entries(c.propertyNames).every(function(Ie) {
                var De = Hi(Ie, 2), He = De[0], ve = De[1], xe = !1;
                switch (He) {
                  case "maxLength":
                    if (typeof ve != "number") {
                      we = "error_property_names_maxlength";
                      break;
                    }
                    if (te.length > ve) {
                      we = "error_property_names_exceeds_maxlength";
                      break;
                    }
                    return !0;
                  case "const":
                    if (ve !== te) {
                      we = "error_property_names_const_mismatch";
                      break;
                    }
                    return !0;
                  case "enum":
                    if (!Array.isArray(ve)) {
                      we = "error_property_names_enum";
                      break;
                    }
                    if (ve.forEach(function(Ke) {
                      Ke === te && (xe = !0);
                    }), !xe) {
                      we = "error_property_names_enum_mismatch";
                      break;
                    }
                    return !0;
                  case "pattern":
                    if (typeof ve != "string") {
                      we = "error_property_names_pattern";
                      break;
                    }
                    if (!new RegExp(ve).test(te)) {
                      we = "error_property_names_pattern_mismatch";
                      break;
                    }
                    return !0;
                  default:
                    return $.push({ path: g, property: "propertyNames", message: D.translate("error_property_names_unsupported", [He], c) }), !1;
                }
                return $.push({ path: g, property: "propertyNames", message: D.translate(we, [te], c) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < G.length && ((S = pe()) === 0 || S !== 1); _e++) ;
            return $;
          }, additionalProperties: function(c, d, g, x) {
            for (var S = [], D = Object.keys(d), $ = 0; $ < D.length; $++) {
              var G = D[$];
              if (!x[G]) {
                if (!c.additionalProperties) {
                  S.push({ path: g, property: "additionalProperties", message: this.translate("error_additional_properties", [G], c) });
                  break;
                }
                if (c.additionalProperties === !0) break;
                S.push.apply(S, ct(this._validateSchema(c.additionalProperties, d[G], "".concat(g, ".").concat(G))));
              }
            }
            return S;
          }, dependencies: function(c, d, g) {
            var x = this, S = [];
            return Object.entries(c.dependencies).forEach(function(D) {
              var $ = Hi(D, 2), G = $[0], te = $[1];
              d[G] !== void 0 && (Array.isArray(te) ? te.forEach(function(pe) {
                d[pe] === void 0 && S.push({ path: g, property: "dependencies", message: x.translate("error_dependency", [pe], c) });
              }) : S.push.apply(S, ct(x._validateSchema(te, d, g))));
            }), S;
          } };
        }, r = [{ key: "fitTest", value: function(n, l) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if (Gt(n) === "object" && n !== null) {
            var i = this._getSchema(l);
            if (i.anyOf) {
              var c, d = function(te) {
                for (var pe = 1; pe < arguments.length; pe++) {
                  var _e = arguments[pe] != null ? arguments[pe] : {};
                  pe % 2 ? Al(Object(_e), !0).forEach(function(we) {
                    Sh(te, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(te, Object.getOwnPropertyDescriptors(_e)) : Al(Object(_e)).forEach(function(we) {
                    Object.defineProperty(te, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return te;
              }({}, t), g = function(te, pe) {
                var _e = typeof Symbol < "u" && te[Symbol.iterator] || te["@@iterator"];
                if (!_e) {
                  if (Array.isArray(te) || (_e = Es(te))) {
                    _e && (te = _e);
                    var we = 0, Ie = function() {
                    };
                    return { s: Ie, n: function() {
                      return we >= te.length ? { done: !0 } : { done: !1, value: te[we++] };
                    }, e: function(xe) {
                      throw xe;
                    }, f: Ie };
                  }
                  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
                }
                var De, He = !0, ve = !1;
                return { s: function() {
                  _e = _e.call(te);
                }, n: function() {
                  var xe = _e.next();
                  return He = xe.done, xe;
                }, e: function(xe) {
                  ve = !0, De = xe;
                }, f: function() {
                  try {
                    He || _e.return == null || _e.return();
                  } finally {
                    if (ve) throw De;
                  }
                } };
              }(i.anyOf);
              try {
                for (g.s(); !(c = g.n()).done; ) {
                  var x = c.value, S = this.fitTest(n, x, e);
                  (S.match > d.match || S.match === d.match && S.extra < d.extra) && (d = S);
                }
              } catch (te) {
                g.e(te);
              } finally {
                g.f();
              }
              return d;
            }
            var D = this._getSchema(l).properties;
            for (var $ in D) if (k(D, $)) {
              if (Gt(n[$]) === "object" && Gt(D[$]) === "object" && Gt(D[$].properties) === "object") {
                var G = this.fitTest(n[$], D[$], e / 100);
                t.match += G.match, t.extra += G.extra;
              }
              n[$] !== void 0 && (t.match += e);
            } else t.extra += e;
          }
          return t;
        } }, { key: "_getSchema", value: function(n) {
          return n === void 0 ? v({}, this.jsoneditor.expandRefs(this.schema)) : n;
        } }, { key: "validate", value: function(n) {
          return this._validateSchema(this.schema, n);
        } }, { key: "_validateSchema", value: function(n, l, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = v({}, this.jsoneditor.expandRefs(n)), l === void 0 ? this._validateV3Required(n, l, e) : (Object.keys(n).forEach(function(c) {
            t._validateSubSchema[c] && i.push.apply(i, ct(t._validateSubSchema[c].call(t, n, l, e)));
          }), i.push.apply(i, ct(this._validateByValueType(n, l, e))), n.links && n.links.forEach(function(c, d) {
            c.rel && c.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, d), i.push.apply(i, ct(t._validateSchema(n, l, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, ct(this._validateDateTimeSubSchema(n, l, e))), ["uuid"].includes(n.format) && i.push.apply(i, ct(this._validateUUIDSchema(n, l, e))), i.push.apply(i, ct(this._validateCustomValidator(n, l, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, l) {
          var e = n.links[l].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), c = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, l).concat(n.links.slice(l + 1)), v({}, n, this.jsoneditor.refs[c]);
        } }, { key: "_validateV3Required", value: function(n, l, e) {
          return (n.required !== void 0 && n.required === !0 || n.required === void 0 && this.jsoneditor.options.required_by_default === !0) && n.type !== "info" ? [{ path: e, property: "required", message: this.translate("error_notset", null, n) }] : [];
        } }, { key: "_validateByValueType", value: function(n, l, e) {
          var t = this, i = [];
          if (l === null) return i;
          if (typeof l == "number") Object.keys(n).forEach(function(d) {
            t._validateNumberSubSchema[d] && i.push.apply(i, ct(t._validateNumberSubSchema[d].call(t, n, l, e)));
          });
          else if (typeof l == "string") Object.keys(n).forEach(function(d) {
            t._validateStringSubSchema[d] && i.push.apply(i, ct(t._validateStringSubSchema[d].call(t, n, l, e)));
          });
          else if (Array.isArray(l)) Object.keys(n).forEach(function(d) {
            t._validateArraySubSchema[d] && i.push.apply(i, ct(t._validateArraySubSchema[d].call(t, n, l, e)));
          });
          else if (Gt(l) === "object") {
            var c = {};
            Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema[d] && i.push.apply(i, ct(t._validateObjectSubSchema[d].call(t, n, l, e, c)));
            }), n.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || n.oneOf || n.anyOf || n.allOf || (n.additionalProperties = !1), Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema2[d] !== void 0 && i.push.apply(i, ct(t._validateObjectSubSchema2[d].call(t, n, l, e, c)));
            });
          }
          return i;
        } }, { key: "_validateUUIDSchema", value: function(n, l, e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(l) ? [] : [{ path: e, property: "format", message: this.translate("error_pattern", ["^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"], n) }];
        } }, { key: "_validateNumberSubSchemaMultipleDivisible", value: function(n, l, e) {
          var t = n.multipleOf || n.divisibleBy, i = l / t === Math.floor(l / t);
          return window.math ? i = window.math.mod(window.math.bignumber(l), window.math.bignumber(t)).equals(0) : window.Decimal && (i = new window.Decimal(l).mod(new window.Decimal(t)).equals(0)), i ? [] : [{ path: e, property: n.multipleOf ? "multipleOf" : "divisibleBy", message: this.translate("error_multipleOf", [t], n) }];
        } }, { key: "_validateDateTimeSubSchema", value: function(n, l, e) {
          var t = this, i = this.jsoneditor.getEditor(e), c = i && i.flatpickr ? i.flatpickr.config.dateFormat : { date: '"YYYY-MM-DD"', time: '"HH:MM"', "datetime-local": '"YYYY-MM-DD HH:MM"' }[n.format];
          if (n.type === "integer") return function(d, g, x) {
            return 1 * g < 1 ? [{ path: x, property: "format", message: t.translate("error_invalid_epoch", null, d) }] : g !== Math.abs(parseInt(g)) ? [{ path: x, property: "format", message: t.translate("error_".concat(d.format.replace(/-/g, "_")), [c], d) }] : [];
          }(n, l, e);
          if (i && i.flatpickr) {
            if (i) return function(d, g, x, S) {
              if (g !== "") {
                var D;
                if (S.flatpickr.config.mode !== "single") {
                  var $ = S.flatpickr.config.mode === "range" ? S.flatpickr.l10n.rangeSeparator : ", ";
                  D = S.flatpickr.selectedDates.map(function(te) {
                    return S.flatpickr.formatDate(te, S.flatpickr.config.dateFormat);
                  }).join($);
                }
                try {
                  if (D) {
                    if (D !== g) throw new Error("".concat(S.flatpickr.config.mode, " mismatch"));
                  } else if (S.flatpickr.formatDate(S.flatpickr.parseDate(g, S.flatpickr.config.dateFormat), S.flatpickr.config.dateFormat) !== g) throw new Error("mismatch");
                } catch {
                  var G = S.flatpickr.config.errorDateFormat !== void 0 ? S.flatpickr.config.errorDateFormat : S.flatpickr.config.dateFormat;
                  return [{ path: x, property: "format", message: t.translate("error_".concat(S.format.replace(/-/g, "_")), [G], d) }];
                }
              }
              return [];
            }(n, l, e, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[n.format].test(l)) return [{ path: e, property: "format", message: this.translate("error_".concat(n.format.replace(/-/g, "_")), [c], n) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(n, l, e) {
          var t = this, i = [];
          i.push.apply(i, ct(Eh.call(this, n, l, e, this.translate)));
          var c = function(d) {
            i.push.apply(i, ct(d.call(t, n, l, e)));
          };
          return this.defaults.custom_validators.forEach(c), this.options.custom_validators && this.options.custom_validators.forEach(c), i;
        } }, { key: "_removeDuplicateErrors", value: function(n) {
          return n.reduce(function(l, e) {
            var t = !0;
            return l || (l = []), l.forEach(function(i) {
              i.message === e.message && i.path === e.path && i.property === e.property && (i.errorcount++, t = !1);
            }), t && (e.errorcount = 1, l.push(e)), l;
          }, []);
        } }, { key: "_checkType", value: function(n, l) {
          var e = { string: function(t) {
            return typeof t == "string";
          }, number: function(t) {
            return typeof t == "number";
          }, integer: function(t) {
            return typeof t == "number" && t === Math.floor(t);
          }, boolean: function(t) {
            return typeof t == "boolean";
          }, array: function(t) {
            return Array.isArray(t);
          }, object: function(t) {
            return t !== null && !Array.isArray(t) && Gt(t) === "object";
          }, null: function(t) {
            return t === null;
          } };
          return typeof n == "string" ? !e[n] || e[n](l) : !this._validateSchema(n, l).length;
        } }], r && Ph(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function yn(o) {
        return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yn(o);
      }
      function Th(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Lh(l.key), l);
        }
      }
      function Lh(o) {
        var r = function(n, l) {
          if (yn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (yn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return yn(r) == "symbol" ? r : r + "";
      }
      function Ah(o, r, n) {
        return r = Wt(r), function(l, e) {
          if (e && (yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Bl() ? Reflect.construct(r, n || [], Wt(o).constructor) : r.apply(o, n));
      }
      function Bl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Bl = function() {
          return !!o;
        })();
      }
      function Zr() {
        return Zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Zr.apply(this, arguments);
      }
      function Wt(o) {
        return Wt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wt(o);
      }
      function Ps(o, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ps(o, r);
      }
      var Rh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ps(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.type] && this.editors[this.type].register();
          }
          Zr(Wt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Zr(Wt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
            this.switcher.disabled = !1, Zr(Wt(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          if (e && (this.always_disabled = !0), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable(e);
          this.switcher.disabled = !0, Zr(Wt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function(e) {
          var t = this;
          this.lastType = this.type, this.editors[e] || this.buildChildEditor(e);
          var i = this.getValue();
          this.type = e, this.register(), this.editors.forEach(function(c, d) {
            var g, x;
            c && (t.type === d ? (t.keep_only_existing_values && (g = c.getValue(), x = i, Object.keys(x).forEach(function(S) {
              L.includes(S) || S in g && (g[S] = x[S]);
            }), i = g), (t.keep_values || t.if) && c.setValue(i, !0), c.container.style.display = "") : c.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, c = this, d = this.types[e], g = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(g), typeof d == "string" ? (i = v({}, this.schema)).type = d : (i = v({}, this.schema, d), i = this.jsoneditor.expandRefs(i), d && d.required && Array.isArray(d.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(d.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
          var x = this.jsoneditor.getEditorClass(i);
          this.editors[e] = this.jsoneditor.createEditor(x, { jsoneditor: this.jsoneditor, schema: i, container: g, path: this.path, parent: this, required: !0 }), this.editors[e].preBuild(), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].header && this.theme.visuallyHidden(this.editors[e].header), this.editors[e].option = this.switcher_options[e], g.addEventListener("change_header_text", function() {
            c.refreshHeaderText();
          }), e !== this.type && (g.style.display = "none");
        } }, { key: "preBuild", value: function() {
          if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, this.jsoneditor.options.keep_oneof_values !== void 0 && (this.keep_values = this.jsoneditor.options.keep_oneof_values), this.options.keep_oneof_values !== void 0 && (this.keep_values = this.options.keep_oneof_values), this.keep_only_existing_values = !1, this.jsoneditor.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.jsoneditor.options.keep_only_existing_values), this.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.options.keep_only_existing_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
          else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
          else if (this.schema.if) this.if = !0, this.ifSchema = JSON.parse(JSON.stringify(this.schema.if)), this.thenSchema = { title: "then" }, this.elseSchema = { title: "else" }, this.types = [], this.schema.then && M(this.thenSchema, this.schema, this.schema.then), this.schema.else && M(this.elseSchema, this.schema, this.schema.else), this.types.push(this.thenSchema), this.types.push(this.elseSchema), this.types.forEach(function(i) {
            delete i.if, delete i.then, delete i.else;
          }), delete this.schema.if;
          else {
            if (this.schema.type && this.schema.type !== "any") Array.isArray(this.schema.type) ? this.types = this.schema.type : this.types = [this.schema.type];
            else if (this.types = ["string", "number", "integer", "boolean", "object", "array", "null"], this.schema.disallow) {
              var e = this.schema.disallow;
              yn(e) === "object" && Array.isArray(e) || (e = [e]);
              var t = [];
              this.types.forEach(function(i) {
                e.includes(i) || t.push(i);
              }), this.types = t;
            }
            delete this.schema.type;
          }
          this.display_text = this.getDisplayText(this.types);
        } }, { key: "build", value: function() {
          var e = this, t = this.container;
          this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired()), this.switcher = this.theme.getSwitcher(this.display_text), this.switcher.setAttribute("id", this.formname + "switcher"), this.switcherLabel = this.theme.getHiddenLabel(this.formname + " switcher"), this.switcherLabel.setAttribute("for", this.formname + "switcher"), this.if || (this.container.appendChild(this.header), t.appendChild(this.switcherLabel), t.appendChild(this.switcher)), this.switcher.addEventListener("change", function(c) {
            c.preventDefault(), c.stopPropagation(), e.switchEditor(e.display_text.indexOf(c.currentTarget.value)), e.onChange(!0);
          }), this.editor_holder = document.createElement("div"), t.appendChild(this.editor_holder);
          var i = {};
          this.jsoneditor.options.custom_validators && (i.custom_validators = this.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), this.types.forEach(function(c, d) {
            var g;
            e.editors[d] = !1, typeof c == "string" ? (g = v({}, e.schema)).type = c : (g = v({}, e.schema, c), c.required && Array.isArray(c.required) && e.schema.required && Array.isArray(e.schema.required) && (g.required = e.schema.required.concat(c.required))), e.validators[d] = new Il(e.jsoneditor, g, i, e.defaults);
          }), this.jsoneditor.on("change", function() {
            e.switchIf();
          }), this.switchEditor(0);
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), Zr(Wt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "refreshHeaderText", value: function() {
          var e = this.getDisplayText(this.types);
          Array.from(this.switcher_options).forEach(function(t, i) {
            t.textContent = e[i];
          });
        } }, { key: "refreshValue", value: function() {
          this.editors[this.type] && (this.value = this.editors[this.type].getValue());
        } }, { key: "switchIf", value: function() {
          if (this.ifSchema && this.value) {
            var e = this.getIfType(this.value);
            this.lastType !== e && (this.switchEditor(e), this.editors[this.type].setValue(this.value, !0)), this.switcher.value = this.display_text[this.type];
          }
        } }, { key: "getIfType", value: function(e) {
          return this.jsoneditor.validator._validateSchema(this.ifSchema, e).length === 0 ? 0 : 1;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          e = this.applyConstFilter(e);
          var c = this.type, d = { match: 0, extra: 0, i: this.type }, g = { match: 0, i: null };
          this.validators.forEach(function(D, $) {
            var G = null;
            i.anyOf !== void 0 && i.anyOf && (G = D.fitTest(e), (d.match < G.match || d.match === G.match && d.extra > G.extra) && ((d = G).i = $)), D.validate(e).length || g.i !== null ? d = g : (g.i = $, G !== null && (g.match = G.match));
          });
          var x = g.i;
          this.anyOf !== void 0 && this.anyOf && g.match < d.match && (x = d.i), this.if && (x = this.getIfType(e)), x === null && (x = this.type), this.type = x, this.switcher.value = this.display_text[x];
          var S = this.type !== c;
          S && (this.switchEditor(this.type), this.editors[this.type].setValue(e, t)), e !== void 0 && this.editors[this.type].setValue(e, t), this.refreshValue(), this.onChange(S);
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Zr(Wt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.oneOf || this.anyOf) {
            var i = this.oneOf ? "oneOf" : "anyOf";
            this.editors.forEach(function(c, d) {
              if (c) {
                var g = "".concat(t.path, ".").concat(i, "[").concat(d, "]");
                c.showValidationErrors(e.reduce(function(x, S) {
                  if (S.path.startsWith(g) || S.path === g.substr(0, S.path.length)) {
                    var D = v({}, S);
                    S.path.startsWith(g) && (D.path = t.path + D.path.substr(g.length)), x.push(D);
                  }
                  return x;
                }, []));
              }
            });
          } else this.editors.forEach(function(c) {
            c && c.showValidationErrors(e);
          });
        } }, { key: "addLinks", value: function() {
        } }]) && Th(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ti(o) {
        return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ti(o);
      }
      function Ih(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Bh(l.key), l);
        }
      }
      function Bh(o) {
        var r = function(n, l) {
          if (ti(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ti(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ti(r) == "symbol" ? r : r + "";
      }
      function Nh(o, r, n) {
        return r = bo(r), function(l, e) {
          if (e && (ti(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Nl() ? Reflect.construct(r, n || [], bo(o).constructor) : r.apply(o, n));
      }
      function Nl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Nl = function() {
          return !!o;
        })();
      }
      function bo(o) {
        return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bo(o);
      }
      function Ts(o, r) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ts(o, r);
      }
      var Dh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Nh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ts(e, t);
        }(r, o), n = r, (l = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && Ih(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Dl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(o);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function ri(o) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? Dl(Object(n), !0).forEach(function(l) {
            vo(o, l, n[l]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : Dl(Object(n)).forEach(function(l) {
            Object.defineProperty(o, l, Object.getOwnPropertyDescriptor(n, l));
          });
        }
        return o;
      }
      function vo(o, r, n) {
        return (r = Ml(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function ni(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, d, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(o, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return Fl(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Fl(n, l) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Fl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function jr(o) {
        return jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, jr(o);
      }
      function Fh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ml(l.key), l);
        }
      }
      function Ml(o) {
        var r = function(n, l) {
          if (jr(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (jr(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return jr(r) == "symbol" ? r : r + "";
      }
      function Mh(o, r, n) {
        return r = Rt(r), function(l, e) {
          if (e && (jr(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Hl() ? Reflect.construct(r, n || [], Rt(o).constructor) : r.apply(o, n));
      }
      function Hl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Hl = function() {
          return !!o;
        })();
      }
      function ir() {
        return ir = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Rt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ir.apply(this, arguments);
      }
      function Rt(o) {
        return Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Rt(o);
      }
      function Ls(o, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ls(o, r);
      }
      var Vl = function(o) {
        function r(e, t, i) {
          var c;
          return function(d, g) {
            if (!(d instanceof g)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (c = Mh(this, r, [e, t])).currentDepth = i, c;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ls(e, t);
        }(r, o), n = r, (l = [{ key: "getChildEditors", value: function() {
          return this.editors;
        } }, { key: "register", value: function() {
          ir(Rt(r.prototype), "register", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          ir(Rt(r.prototype), "unregister", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.maxwidth), 3);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.editjson_control && (this.editjson_control.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), ir(Rt(r.prototype), "enable", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            (e.isActive() || e.isUiOnly) && e.enable(), e.optInCheckbox && (e.optInCheckbox.disabled = !1);
          }));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.editjson_control && (this.editjson_control.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), ir(Rt(r.prototype), "disable", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            (t.isActive() || t.isUiOnly) && t.disable(e), t.optInCheckbox.disabled = !0;
          });
        } }, { key: "layoutEditors", value: function() {
          var e, t, i = this;
          if (this.row_container) {
            var c;
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(He, ve) {
              var xe = i.editors[He].schema.propertyOrder, Ke = i.editors[ve].schema.propertyOrder;
              return typeof xe != "number" && (xe = 1e3), typeof Ke != "number" && (Ke = 1e3), xe - Ke;
            });
            var d, g = this.format === "categories", x = [], S = null, D = null;
            if (this.format === "grid-strict") {
              var $ = 0;
              if (d = [], this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ke = ve.options.hidden ? 0 : ve.options.grid_offset || 0, it = !ve.options.hidden && (ve.options.grid_break || !1), Ot = { key: He, width: xe, offset: Ke, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  d.push(Ot), x[$] = d, it && ($++, d = []);
                }
              }), this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), c.appendChild(d), t = 0; t < x[e].length; t++) S = x[e][t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e][t].width, x[e][t].offset), d.appendChild(D.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  for (var xe = !1, Ke = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), it = ve.options.hidden ? 0 : ve.container.offsetHeight, Ot = 0; Ot < x.length; Ot++) x[Ot].width + Ke <= 12 && (!it || 0.5 * x[Ot].minh < it && 2 * x[Ot].maxh > it) && (xe = Ot);
                  xe === !1 && (x.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), xe = x.length - 1), x[xe].editors.push({ key: He, width: Ke, height: it }), x[xe].width += Ke, x[xe].minh = Math.min(x[xe].minh, it), x[xe].maxh = Math.max(x[xe].maxh, it);
                }
              }), e = 0; e < x.length; e++) if (x[e].width < 12) {
                var G = !1, te = 0;
                for (t = 0; t < x[e].editors.length; t++) (G === !1 || x[e].editors[t].width > x[e].editors[G].width) && (G = t), x[e].editors[t].width *= 12 / x[e].width, x[e].editors[t].width = Math.floor(x[e].editors[t].width), te += x[e].editors[t].width;
                te < 12 && (x[e].editors[G].width += 12 - te), x[e].width = 12;
              }
              if (this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), c.appendChild(d), t = 0; t < x[e].editors.length; t++) S = x[e].editors[t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e].editors[t].width), d.appendChild(D.container);
            } else {
              if (c = document.createElement("div"), g) {
                var pe = document.createElement("div"), _e = this.theme.getTopTabHolder(this.translateProperty(this.schema.title)), we = this.theme.getTopTabContentHolder(_e);
                for (this.property_order.forEach(function(He) {
                  var ve = i.editors[He];
                  if (!ve.property_removed) {
                    var xe = i.theme.getTabContent(), Ke = ve.schema && (ve.schema.type === "object" || ve.schema.type === "array");
                    xe.isObjOrArray = Ke;
                    var it = i.theme.getGridRow();
                    ve.tab || (i.basicPane === void 0 ? i.addRow(ve, _e, xe) : i.addRow(ve, _e, i.basicPane)), xe.id = i.getValidId(ve.tab_text.textContent), Ke ? (xe.appendChild(it), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab)) : (pe.appendChild(it), we.childElementCount > 0 ? we.firstChild.isObjOrArray && (xe.appendChild(pe), we.insertBefore(xe, we.firstChild), i.theme.insertBasicTopTab(ve.tab, _e), ve.basicPane = xe) : (xe.appendChild(pe), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab), ve.basicPane = xe)), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), it.appendChild(ve.container), ve.rowPane = xe;
                  }
                }); this.tabPanesContainer.firstChild; ) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                var Ie = this.tabs_holder.parentNode;
                Ie.removeChild(Ie.firstChild), Ie.appendChild(_e), this.tabPanesContainer = we, this.tabs_holder = _e;
                var De = this.theme.getFirstTab(this.tabs_holder);
                return void (De && j(De, "click"));
              }
              this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                ve.property_removed || (d = i.theme.getGridRow(), c.appendChild(d), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), d.appendChild(ve.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(c);
          }
        } }, { key: "getPropertySchema", value: function(e) {
          var t = this, i = this.schema.properties[e] || {};
          i = v({}, i);
          var c = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(d) {
            new RegExp(d).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[d]), c = !0);
          }), !c && this.schema.additionalProperties && jr(this.schema.additionalProperties) === "object" && (i = v({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (ir(Rt(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = ni(t, 2), c = i[0], d = i[1], g = e.jsoneditor.getEditorClass(d);
            e.editors[c] = e.jsoneditor.createEditor(g, { jsoneditor: e.jsoneditor, schema: d, path: "".concat(e.path, ".").concat(c), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[c].preBuild();
            var x = e.editors[c].options.hidden ? 0 : e.editors[c].options.grid_columns || e.editors[c].getNumColumns();
            e.minwidth += x, e.maxwidth += x;
          }), this.no_link_holder = !0;
          else {
            if (this.options.table) throw new Error("Not supported yet");
            this.schema.defaultProperties || (this.jsoneditor.options.display_required_only || this.options.display_required_only ? this.schema.defaultProperties = Object.keys(this.schema.properties).filter(function(t) {
              return e.isRequiredObject({ key: t, schema: e.schema.properties[t] });
            }) : this.schema.defaultProperties = Object.keys(this.schema.properties)), this.maxwidth += 1, Array.isArray(this.schema.defaultProperties) && this.schema.defaultProperties.forEach(function(t) {
              e.addObjectProperty(t, !0), e.editors[t] && (e.minwidth = Math.max(e.minwidth, e.editors[t].options.grid_columns || e.editors[t].getNumColumns()), e.maxwidth += e.editors[t].options.grid_columns || e.editors[t].getNumColumns());
            });
          }
          this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(t, i) {
            var c = e.editors[t].schema.propertyOrder, d = e.editors[i].schema.propertyOrder;
            return typeof c != "number" && (c = 1e3), typeof d != "number" && (d = 1e3), c - d;
          });
        } }, { key: "addTab", value: function(e) {
          var t = this, i = this.rows[e].schema && (this.rows[e].schema.type === "object" || this.rows[e].schema.type === "array");
          this.tabs_holder && (this.rows[e].tab_text = document.createElement("span"), this.rows[e].tab_text.textContent = i ? this.rows[e].getHeaderText() : this.schema.basicCategoryTitle === void 0 ? "Basic" : this.schema.basicCategoryTitle, this.rows[e].tab = this.theme.getTopTab(this.rows[e].tab_text, this.getValidId(this.rows[e].tab_text.textContent)), this.rows[e].tab.addEventListener("click", function(c) {
            t.active_tab = t.rows[e].tab, t.refreshTabs(), c.preventDefault(), c.stopPropagation();
          }));
        } }, { key: "addRow", value: function(e, t, i) {
          var c = this.rows.length, d = e.schema.type === "object" || e.schema.type === "array";
          this.rows[c] = e, this.rows[c].rowPane = i, d ? (this.addTab(c), this.theme.addTopTab(t, this.rows[c].tab)) : this.basicTab === void 0 ? (this.addTab(c), this.basicTab = c, this.basicPane = i, this.theme.addTopTab(t, this.rows[c].tab)) : (this.rows[c].tab = this.rows[this.basicTab].tab, this.rows[c].tab_text = this.rows[this.basicTab].tab_text, this.rows[c].rowPane = this.rows[this.basicTab].rowPane);
        } }, { key: "refreshTabs", value: function(e) {
          var t = this, i = this.basicTab !== void 0, c = !1;
          this.rows.forEach(function(d) {
            d.tab && d.rowPane && d.rowPane.parentNode && (i && d.tab === t.rows[t.basicTab].tab && c || (e ? d.tab_text.textContent = d.getHeaderText() : (i && d.tab === t.rows[t.basicTab].tab && (c = !0), d.tab === t.active_tab ? t.theme.markTabActive(d) : t.theme.markTabInactive(d))));
          });
        } }, { key: "build", value: function() {
          var e = this, t = this.format === "categories";
          if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, Object.entries(this.editors).forEach(function(c) {
            var d = ni(c, 2), g = d[0], x = d[1], S = e.theme.getTableCell();
            e.editor_holder.appendChild(S), x.setContainer(S), x.build(), x.postBuild(), x.setOptInCheckbox(x.header), x.setValue(x.getDefault(), !0), e.editors[g].options.hidden && (S.style.display = "none"), e.editors[g].options.input_width && (S.style.width = e.editors[g].options.input_width);
          });
          else {
            if (this.options.table) throw new Error("Not supported yet");
            this.header = "", this.options.compact || (this.header = document.createElement("span"), this.header.textContent = this.getTitle()), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.title.classList.add("je-object__title"), this.controls = this.theme.getButtonHolder(), this.controls.classList.add("je-object__controls"), this.container.appendChild(this.title), this.container.appendChild(this.controls), this.container.classList.add("je-object__container"), this.editjson_holder = this.theme.getModal(), this.editjson_textarea_label = this.theme.getHiddenLabel(this.translate("button_edit_json")), this.editjson_textarea_label.setAttribute("for", this.path + "-edit-json-textarea"), this.editjson_textarea = this.theme.getTextareaInput(), this.editjson_textarea.setAttribute("id", this.path + "-edit-json-textarea"), this.editjson_textarea.setAttribute("aria-labelledby", this.path + "-edit-json-textarea"), this.editjson_textarea.classList.add("je-edit-json--textarea"), this.editjson_save = this.getButton("button_save", "save", "button_save"), this.editjson_save.classList.add("json-editor-btntype-save"), this.editjson_save.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.saveJSON();
            }), this.editjson_copy = this.getButton("button_copy", "copy", "button_copy"), this.editjson_copy.classList.add("json-editor-btntype-copy"), this.editjson_copy.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.copyJSON();
            }), this.editjson_cancel = this.getButton("button_cancel", "cancel", "button_cancel"), this.editjson_cancel.classList.add("json-editor-btntype-cancel"), this.editjson_cancel.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.hideEditJSON();
            }), this.editjson_holder.appendChild(this.editjson_textarea_label), this.editjson_holder.appendChild(this.editjson_textarea), this.editjson_holder.appendChild(this.editjson_save), this.editjson_holder.appendChild(this.editjson_copy), this.editjson_holder.appendChild(this.editjson_cancel), this.addproperty_holder = this.theme.getModal(), this.addproperty_list = document.createElement("div"), this.addproperty_list.classList.add("property-selector"), this.addproperty_add = this.getButton("button_add", "add", "button_add"), this.addproperty_add.classList.add("json-editor-btntype-add"), this.addproperty_input = this.theme.getFormInputField("text"), this.addproperty_input.setAttribute("placeholder", "Property name..."), this.addproperty_input_label = this.theme.getHiddenLabel(this.translate("button_properties")), this.addproperty_input_label.setAttribute("for", this.path + "-property-selector"), this.addproperty_input.classList.add("property-selector-input"), this.addproperty_input.setAttribute("id", this.path + "-property-selector"), this.addproperty_input.setAttribute("aria-labelledby", this.path + "-property-selector"), this.addproperty_add.addEventListener("click", function(c) {
              if (c.preventDefault(), c.stopPropagation(), e.addproperty_input.value) {
                if (e.editors[e.addproperty_input.value]) return void window.alert("there is already a property with that name");
                e.addObjectProperty(e.addproperty_input.value), e.editors[e.addproperty_input.value] && e.editors[e.addproperty_input.value].disable();
                var d = e.editors[e.addproperty_input.value].key, g = e.editors[e.addproperty_input.value].type, x = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: d, type: g, path: x } });
              }
            }), this.addproperty_input.addEventListener("input", function(c) {
              c.target.previousSibling.previousSibling.childNodes.forEach(function(d) {
                var g = d.innerText, x = c.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (g = g.toLowerCase(), x = x.toLowerCase()), g.includes(x) ? d.style.display = "" : d.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(c) {
              var d = e.theme.getTabContent(), g = e.theme.getGridColumn(), x = !(!c.schema || c.schema.type !== "object" && c.schema.type !== "array");
              if (d.isObjOrArray = x, t) {
                if (x) {
                  var S = e.theme.getGridContainer();
                  S.appendChild(g), d.appendChild(S), e.tabPanesContainer.appendChild(d), e.row_container = S;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), d.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(d) : e.tabPanesContainer.insertBefore(d, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(g);
                e.addRow(c, e.tabs_holder, d), d.id = e.getValidId(c.schema.title);
              } else e.row_container.appendChild(g);
              c.setContainer(g), c.build(), c.postBuild(), c.setOptInCheckbox(c.header);
            }), this.rows[0] && j(this.rows[0].tab, "click"), this.collapsed = !1, this.collapse_control = this.getButton("", "collapse", "button_collapse"), this.collapse_control.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(this.collapse_control, this.title.childNodes[0]), this.collapse_control.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.collapsed ? (e.editor_holder.style.display = "", e.collapsed = !1, e.setButtonText(e.collapse_control, "", "collapse", "button_collapse")) : (e.editor_holder.style.display = "none", e.collapsed = !0, e.setButtonText(e.collapse_control, "", "expand", "button_expand"));
            }), this.options.collapsed && j(this.collapse_control, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.collapse_control.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.collapse_control.style.display = "none"), this.editjson_control = this.getButton("JSON", "edit", "button_edit_json"), this.editjson_control.classList.add("json-editor-btntype-editjson"), this.editjson_control.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.toggleEditJSON();
            }), this.controls.appendChild(this.editjson_control), this.controls.insertBefore(this.editjson_holder, this.controls.childNodes[0]), this.schema.options && this.schema.options.disable_edit_json !== void 0 ? this.schema.options.disable_edit_json && (this.editjson_control.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_control.style.display = "none"), this.addproperty_button = this.getButton("button_properties", "edit_properties", "button_object_properties"), this.addproperty_button.classList.add("json-editor-btntype-properties"), this.addproperty_button.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), e.toggleAddProperty();
            }), this.controls.appendChild(this.addproperty_button), this.controls.insertBefore(this.addproperty_holder, this.controls.childNodes[1]), this.refreshAddProperties(), this.deactivateNonRequiredProperties(!1);
          }
          this.options.table_row ? (this.editor_holder = this.container, this.property_order.forEach(function(c) {
            e.editor_holder.appendChild(e.editors[c].container);
          })) : (this.layoutEditors(), this.layoutEditors()), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "deactivateNonRequiredProperties", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_opt_in, c = this.options.show_opt_in !== void 0, d = c && this.options.show_opt_in === !0, g = c && this.options.show_opt_in === !1;
          (d || !g && i || !c && i) && Object.entries(this.editors).forEach(function(x) {
            var S = ni(x, 2), D = S[0], $ = S[1];
            t.isRequiredObject($) || t.editors[D].deactivate(), e && typeof t.editors[D].deactivateNonRequiredProperties == "function" && t.editors[D].deactivateNonRequiredProperties(e);
          });
        } }, { key: "showEditJSON", value: function() {
          this.editjson_holder && (this.hideAddProperty(), this.editjson_holder.style.left = "".concat(this.editjson_control.offsetLeft, "px"), this.editjson_holder.style.top = "".concat(this.editjson_control.offsetTop + this.editjson_control.offsetHeight, "px"), this.editjson_textarea.value = JSON.stringify(this.getValue(), null, 2), this.disable(), this.editjson_holder.style.display = "", this.editjson_control.disabled = !1, this.editing_json = !0);
        } }, { key: "hideEditJSON", value: function() {
          this.editjson_holder && this.editing_json && (this.editjson_holder.style.display = "none", this.enable(), this.editing_json = !1);
        } }, { key: "copyJSON", value: function() {
          this.editjson_holder && navigator.clipboard.writeText(this.editjson_textarea.value).catch(function(e) {
            return window.alert(e);
          });
        } }, { key: "saveJSON", value: function() {
          if (this.editjson_holder) try {
            var e = JSON.parse(this.editjson_textarea.value);
            this.setValue(e), this.hideEditJSON(), this.onChange(!0);
          } catch (t) {
            throw window.alert("invalid JSON"), t;
          }
        } }, { key: "toggleEditJSON", value: function() {
          this.editing_json ? this.hideEditJSON() : this.showEditJSON();
        } }, { key: "insertPropertyControlUsingPropertyOrder", value: function(e, t, i) {
          var c;
          this.schema.properties[e] && (c = this.schema.properties[e].propertyOrder), typeof c != "number" && (c = 1e3), t.propertyOrder = c;
          for (var d = 0; d < i.childNodes.length; d++) {
            var g = i.childNodes[d];
            if (t.propertyOrder < g.propertyOrder) {
              this.addproperty_list.insertBefore(t, g), t = null;
              break;
            }
          }
          t && this.addproperty_list.appendChild(t);
        } }, { key: "addPropertyCheckbox", value: function(e) {
          var t, i = this, c = this.theme.getCheckbox();
          t = this.schema.properties[e] && this.schema.properties[e].title ? this.schema.properties[e].title : e;
          var d = this.theme.getCheckboxLabel(t), g = this.theme.getFormControl(d, c, null, null, this.path + "-" + e);
          return g.style.paddingBottom = g.style.marginBottom = g.style.paddingTop = g.style.marginTop = 0, g.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(e, g, this.addproperty_list), c.checked = e in this.editors, c.addEventListener("change", function() {
            c.checked ? i.addObjectProperty(e) : i.removeObjectProperty(e), i.onChange(!0);
          }), this.addproperty_checkboxes[e] = c, c;
        } }, { key: "showAddProperty", value: function() {
          this.addproperty_holder && (this.hideEditJSON(), this.addproperty_holder.style.left = "".concat(this.addproperty_button.offsetLeft, "px"), this.addproperty_holder.style.top = "".concat(this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight, "px"), this.disable(), this.adding_property = !0, this.addproperty_button.disabled = !1, this.addproperty_holder.style.display = "", this.refreshAddProperties());
        } }, { key: "hideAddProperty", value: function() {
          this.addproperty_holder && this.adding_property && (this.addproperty_holder.style.display = "none", this.enable(), this.adding_property = !1);
        } }, { key: "toggleAddProperty", value: function() {
          this.adding_property ? this.hideAddProperty() : this.showAddProperty();
        } }, { key: "removeObjectProperty", value: function(e) {
          if (this.editors[e]) {
            var t;
            if ((t = this.editors[e].schema) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies) return;
            this.editors[e].unregister(), delete this.editors[e], this.refreshValue(), this.layoutEditors();
          }
        } }, { key: "getSchemaOnMaxDepth", value: function(e) {
          return Object.keys(e).reduce(function(t, i) {
            switch (i) {
              case "$ref":
                return t;
              case "properties":
              case "items":
                return ri(ri({}, t), {}, vo({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return ri(ri({}, t), {}, vo({}, i, !0));
              default:
                return ri(ri({}, t), {}, vo({}, i, e[i]));
            }
          }, {});
        } }, { key: "addObjectProperty", value: function(e, t) {
          if (!this.editors[e]) {
            if (this.cached_editors[e]) {
              if (this.editors[e] = this.cached_editors[e], t) return;
              this.editors[e].register();
            } else {
              if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[e] || this.schema.patternProperties && Object.keys(this.schema.patternProperties).find(function(x) {
                return new RegExp(x).test(e);
              }))) return;
              var i = this.getPropertySchema(e);
              typeof i.propertyOrder != "number" && (i.propertyOrder = Object.keys(this.editors).length + 1e3);
              var c = this.jsoneditor.getEditorClass(i), d = this.jsoneditor.options.max_depth;
              if (this.editors[e] = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: d && this.currentDepth >= d ? this.getSchemaOnMaxDepth(i) : i, path: "".concat(this.path, ".").concat(e), parent: this }, this.currentDepth + 1), this.editors[e].preBuild(), !t) {
                var g = this.theme.getChildEditorHolder();
                this.editor_holder.appendChild(g), this.editors[e].setContainer(g), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].setOptInCheckbox(c.header), this.editors[e].activate();
              }
              this.cached_editors[e] = this.editors[e];
            }
            t || (this.refreshValue(), this.layoutEditors());
          }
        } }, { key: "onOutsideModalClick", value: function(e) {
          var t = e.path || e.composedPath && e.composedPath();
          this.addproperty_holder && !this.addproperty_holder.contains(t[0]) && this.adding_property && (e.preventDefault(), e.stopPropagation(), this.toggleAddProperty());
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), ir(Rt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "canHaveAdditionalProperties", value: function() {
          return typeof this.schema.additionalProperties == "boolean" ? this.schema.additionalProperties : jr(this.schema.additionalProperties) === "object" && this.schema.additionalProperties !== null || (typeof this.options.no_additional_properties == "boolean" ? !this.options.no_additional_properties : typeof this.jsoneditor.options.no_additional_properties != "boolean" || !this.jsoneditor.options.no_additional_properties);
        } }, { key: "destroy", value: function() {
          Object.values(this.cached_editors).forEach(function(e) {
            return e.destroy();
          }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClickListener, !0), ir(Rt(r.prototype), "destroy", this).call(this);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            var e = ir(Rt(r.prototype), "getValue", this).call(this);
            return e && (this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties) && Object.keys(e).forEach(function(t) {
              var i;
              ((i = e[t]) === void 0 || i === "" || i === Object(i) && Object.keys(i).length === 0 && i.constructor === Object) && delete e[t];
            }), e && (this.jsoneditor.options.remove_false_properties || this.options.remove_false_properties) && Object.keys(e).forEach(function(t) {
              e[t] === !1 && delete e[t];
            }), e;
          }
        } }, { key: "refreshValue", value: function() {
          var e = this;
          this.value = {}, this.editors && (Object.keys(this.editors).forEach(function(t) {
            e.editors[t].isActive() && (e.editors[t].refreshValue(), e.value[t] = e.editors[t].getValue());
          }), Object.keys(this.editors).forEach(function(t) {
            e.editors[t].isActive() && e.activateDependentRequired(e.editors[t].key);
          }), this.adding_property && this.refreshAddProperties());
        } }, { key: "activateDependentRequired", value: function(e) {
          var t = this;
          this.getDependentRequired(e).forEach(function(i) {
            var c;
            Object.entries(t.cached_editors).forEach(function(d) {
              var g = ni(d, 2), x = (g[0], g[1]);
              x.key === i && (c = x);
            }), c && !c.isActive() && c.activate();
          });
        } }, { key: "getDependentRequired", value: function(e) {
          return this.schema.dependentRequired && k(this.schema.dependentRequired, e) ? this.schema.dependentRequired[e] : [];
        } }, { key: "refreshAddProperties", value: function() {
          var e = this;
          if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) this.addproperty_button.style.display = "none";
          else {
            var t, i = 0, c = !1;
            Object.keys(this.editors).forEach(function(d) {
              return i++;
            }), t = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(d) {
              e.addPropertyCheckbox(d), e.isRequiredObject(e.cached_editors[d]) && d in e.editors && (e.addproperty_checkboxes[d].disabled = !0), e.schema.minProperties !== void 0 && i <= e.schema.minProperties ? (e.addproperty_checkboxes[d].disabled = e.addproperty_checkboxes[d].checked, e.addproperty_checkboxes[d].checked || (c = !0)) : d in e.editors ? c = !0 : t || k(e.schema.properties, d) ? (e.addproperty_checkboxes[d].disabled = !1, c = !0) : e.addproperty_checkboxes[d].disabled = !0;
            }), this.canHaveAdditionalProperties() && (c = !0), Object.keys(this.schema.properties).forEach(function(d) {
              e.cached_editors[d] || (c = !0, e.addPropertyCheckbox(d));
            }), c ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(e) {
          if (e) return typeof e.schema.required == "boolean" ? e.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(e.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          (jr(e = (e = this.applyConstFilter(e)) || {}) !== "object" || Array.isArray(e)) && (e = {}), Object.entries(this.cached_editors).forEach(function(c) {
            var d = ni(c, 2), g = d[0], x = d[1];
            e[g] !== void 0 ? (i.addObjectProperty(g), x.setValue(e[g], t), x.activate(), i.disabled && x.disable()) : t || i.isRequiredObject(x) ? x.setValue(x.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? x.deactivate() : i.removeObjectProperty(g);
          }), Object.entries(e).forEach(function(c) {
            var d = ni(c, 2), g = d[0], x = d[1];
            i.cached_editors[g] || (i.addObjectProperty(g), i.editors[g] && i.editors[g].setValue(x, t, !!i.editors[g].template));
          }), this.refreshValue(), this.layoutEditors(), this.onChange();
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], c = [];
          e.forEach(function(d) {
            d.path === t.path ? i.push(d) : c.push(d);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(d) {
            d.errorcount && d.errorcount > 1 && (d.message += " (".concat(d.errorcount, " errors)")), t.error_holder.appendChild(t.theme.getErrorMessage(d.message));
          })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), Object.values(this.editors).forEach(function(d) {
            d.showValidationErrors(c);
          });
        } }]) && Fh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ii(o) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ii(o);
      }
      function Hh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Vh(l.key), l);
        }
      }
      function Vh(o) {
        var r = function(n, l) {
          if (ii(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ii(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ii(r) == "symbol" ? r : r + "";
      }
      function zh(o, r, n) {
        return r = kr(r), function(l, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, zl() ? Reflect.construct(r, n || [], kr(o).constructor) : r.apply(o, n));
      }
      function zl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (zl = function() {
          return !!o;
        })();
      }
      function oi() {
        return oi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = kr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, oi.apply(this, arguments);
      }
      function kr(o) {
        return kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, kr(o);
      }
      function As(o, r) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, As(o, r);
      }
      Vl.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var qh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && As(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          oi(kr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          var e = this;
          this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
          for (var t = function(D) {
            e.setValue(D.currentTarget.value), e.onChange(!0), e.radioGroup.forEach(function($) {
              $.checked = $.value === e.getValue();
            });
          }, i = 0; i < this.enum_values.length; i++) {
            var c = { id: "".concat(this.formname, "[").concat(i, "]"), value: this.enum_values[i] };
            this.jsoneditor.options.use_name_attributes && (c.name = this.formname), this.input = this.theme.getFormRadio(c), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", t, !1), this.radioGroup.push(this.input);
            var d = this.theme.getFormRadioLabel(this.enum_display[i]);
            d.htmlFor = this.input.id;
            var g = this.theme.getFormRadioControl(d, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
            this.radioContainer.appendChild(g);
          }
          if (this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var x = 0; x < this.radioGroup.length; x++) this.radioGroup[x].disabled = !0;
            this.radioContainer.classList.add("readonly");
          }
          var S = this.theme.getContainer();
          S.appendChild(this.radioContainer), S.dataset.containerFor = "radio", this.input = S, this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady();
          });
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !1;
            this.radioContainer.classList.remove("readonly"), oi(kr(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.radioContainer.classList.add("readonly"), oi(kr(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), oi(kr(r.prototype), "destroy", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "setValue", value: function(e) {
          typeof (e = this.applyConstFilter(e)) != "string" && (e = String(e));
          for (var t = 0; t < this.radioGroup.length; t++) {
            if (this.radioGroup[t].value === e) {
              this.radioGroup[t].checked = !0;
              break;
            }
            this.radioGroup[t].checked = !1;
          }
          this.value = e, this.onChange();
        } }]) && Hh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function si(o) {
        return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, si(o);
      }
      function Uh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, $h(l.key), l);
        }
      }
      function $h(o) {
        var r = function(n, l) {
          if (si(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (si(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return si(r) == "symbol" ? r : r + "";
      }
      function Gh(o, r, n) {
        return r = Jt(r), function(l, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ql() ? Reflect.construct(r, n || [], Jt(o).constructor) : r.apply(o, n));
      }
      function ql() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ql = function() {
          return !!o;
        })();
      }
      function Yr() {
        return Yr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Yr.apply(this, arguments);
      }
      function Jt(o) {
        return Jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jt(o);
      }
      function Rs(o, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Rs(o, r);
      }
      var Wh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Yr(Jt(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.sceditor_instance && this.sceditor_instance.val(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Yr(Jt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.sceditor) {
            var t = this.expandCallbacks("sceditor", v({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
            i === void 0 && window.sceditor.create(this.input, t), this.sceditor_instance = i || window.sceditor.instance(this.input), this.sceditor_instance.blur(function() {
              e.value = e.sceditor_instance.val(), e.sceditor_instance.updateOriginal(), e.is_dirty = !0, e.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Yr(Jt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), Yr(Jt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.sceditor_instance && this.sceditor_instance.readOnly(!0), Yr(Jt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), Yr(Jt(r.prototype), "destroy", this).call(this);
        } }]) && Uh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function ai(o) {
        return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ai(o);
      }
      function Jh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Kh(l.key), l);
        }
      }
      function Kh(o) {
        var r = function(n, l) {
          if (ai(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ai(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ai(r) == "symbol" ? r : r + "";
      }
      function Zh(o, r, n) {
        return r = or(r), function(l, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ul() ? Reflect.construct(r, n || [], or(o).constructor) : r.apply(o, n));
      }
      function Ul() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ul = function() {
          return !!o;
        })();
      }
      function mn() {
        return mn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = or(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, mn.apply(this, arguments);
      }
      function or(o) {
        return or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, or(o);
      }
      function Is(o, r) {
        return Is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Is(o, r);
      }
      var Yh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Is(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else mn(or(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", v({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = t.tags = !!t.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
              e.updateValue(i), e.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          mn(or(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t, i = this.typecast(e), c = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (t = this.input.querySelector('option[value="'.concat(i, '"]'))) ? t.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), c = !0), c;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), mn(or(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), mn(or(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), mn(or(r.prototype), "destroy", this).call(this);
        } }]) && Jh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function li(o) {
        return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, li(o);
      }
      function Qh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Xh(l.key), l);
        }
      }
      function Xh(o) {
        var r = function(n, l) {
          if (li(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (li(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return li(r) == "symbol" ? r : r + "";
      }
      function ep(o, r, n) {
        return r = Kt(r), function(l, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, $l() ? Reflect.construct(r, n || [], Kt(o).constructor) : r.apply(o, n));
      }
      function $l() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return ($l = function() {
          return !!o;
        })();
      }
      function Qr() {
        return Qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Qr.apply(this, arguments);
      }
      function Kt(o) {
        return Kt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kt(o);
      }
      function Bs(o, r) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Bs(o, r);
      }
      var tp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ep(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Bs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.selectize_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else Qr(Kt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var t = this.expandCallbacks("selectize", v({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
            this.newEnumAllowed = t.create = !!t.create && this.schema.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              e.updateValue(i), e.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
          }
          Qr(Kt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t = this.typecast(e), i = !1;
          return this.enum_values.includes(t) || t === "" || (this.enum_options.push("".concat(t)), this.enum_display.push("".concat(t)), this.enum_values.push(t), this.schema.enum.push(t), this.selectize_instance.addItem(t), this.selectize_instance.refreshOptions(!1), i = !0), i;
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          Qr(Kt(r.prototype), "onWatchedFieldChange", this).call(this), this.selectize_instance && (this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(t, i) {
            e.selectize_instance.addOption({ value: t, text: e.enum_display[i] });
          }), this.selectize_instance.addItem("".concat(this.value), !0));
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), Qr(Kt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), Qr(Kt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), Qr(Kt(r.prototype), "destroy", this).call(this);
        } }]) && Qh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function ci(o) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(o);
      }
      function rp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, np(l.key), l);
        }
      }
      function np(o) {
        var r = function(n, l) {
          if (ci(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ci(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ci(r) == "symbol" ? r : r + "";
      }
      function ip(o, r, n) {
        return r = go(r), function(l, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Gl() ? Reflect.construct(r, n || [], go(o).constructor) : r.apply(o, n));
      }
      function Gl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Gl = function() {
          return !!o;
        })();
      }
      function go(o) {
        return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, go(o);
      }
      function Ns(o, r) {
        return Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ns(o, r);
      }
      var op = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ip(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ns(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description)));
          var t = this.formname.replace(/\W/g, "");
          if (typeof SignaturePad == "function") {
            this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input);
            var i = document.createElement("div");
            i.classList.add("signature-container");
            var c = document.createElement("canvas");
            this.jsoneditor.options.use_name_attributes && c.setAttribute("name", t), c.classList.add("signature"), i.appendChild(c), this.signaturePad = new window.SignaturePad(c), this.signaturePad.onEnd = function() {
              e.signaturePad.isEmpty() ? e.input.value = "" : e.input.value = e.signaturePad.toDataURL(), e.is_dirty = !0, e.refreshValue(), e.watch_listener(), e.jsoneditor.notifyWatchers(e.path), e.parent ? e.parent.onChildEditorChange(e) : e.jsoneditor.onChange();
            };
            var d = document.createElement("div"), g = document.createElement("button");
            g.classList.add("tiny", "button"), g.innerHTML = "Clear signature", d.appendChild(g), i.appendChild(d), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(S) {
              c.setAttribute("readOnly", "readOnly"), S.disabled = !0;
            })), g.addEventListener("click", function(S) {
              S.preventDefault(), S.stopPropagation(), e.signaturePad.clear(), e.signaturePad.strokeEnd();
            }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), c.width = i.offsetWidth, this.options && this.options.canvas_height ? c.height = this.options.canvas_height : c.height = "300";
          } else {
            var x = document.createElement("p");
            x.innerHTML = "Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad", this.container.appendChild(x);
          }
        } }, { key: "setValue", value: function(e) {
          if (e = this.applyConstFilter(e), typeof SignaturePad == "function") {
            var t = this.sanitize(e);
            return this.value === t ? void 0 : (this.value = t, this.input.value = this.value, this.signaturePad.clear(), e && e !== "" && this.signaturePad.fromDataURL(e), this.watch_listener(), this.jsoneditor.notifyWatchers(this.path), !1);
          }
        } }, { key: "destroy", value: function() {
          this.signaturePad.off(), delete this.signaturePad;
        } }]) && rp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function ui(o) {
        return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ui(o);
      }
      function sp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, ap(l.key), l);
        }
      }
      function ap(o) {
        var r = function(n, l) {
          if (ui(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ui(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ui(r) == "symbol" ? r : r + "";
      }
      function lp(o, r, n) {
        return r = Zt(r), function(l, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Wl() ? Reflect.construct(r, n || [], Zt(o).constructor) : r.apply(o, n));
      }
      function Wl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Wl = function() {
          return !!o;
        })();
      }
      function Xr() {
        return Xr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Xr.apply(this, arguments);
      }
      function Zt(o) {
        return Zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Zt(o);
      }
      function Ds(o, r) {
        return Ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ds(o, r);
      }
      b(6031);
      var cp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ds(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Xr(Zt(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.simplemde_instance && this.simplemde_instance.value(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Xr(Zt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.SimpleMDE ? (e = this.expandCallbacks("simplemde", v({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
            t.value = t.simplemde_instance.value(), t.is_dirty = !0, t.onChange(!0);
          }), e.autorefresh && this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 }), this.theme.afterInputReady(this.input)) : Xr(Zt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), Xr(Zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), Xr(Zt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), Xr(Zt(r.prototype), "destroy", this).call(this);
        } }, { key: "startListening", value: function(e, t) {
          var i = this, c = function d() {
            e.display.wrapper.offsetHeight ? (i.stopListening(e, t), e.display.lastWrapHeight !== e.display.wrapper.clientHeight && e.refresh()) : t.timeout = window.setTimeout(d, t.delay);
          };
          t.timeout = window.setTimeout(c, t.delay), t.hurry = function() {
            window.clearTimeout(t.timeout), t.timeout = window.setTimeout(c, 50);
          }, e.on(window, "mouseup", t.hurry), e.on(window, "keyup", t.hurry);
        } }, { key: "stopListening", value: function(e, t) {
          window.clearTimeout(t.timeout), e.off(window, "mouseup", t.hurry), e.off(window, "keyup", t.hurry);
        } }]) && sp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function di(o) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(o);
      }
      function up(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, dp(l.key), l);
        }
      }
      function dp(o) {
        var r = function(n, l) {
          if (di(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (di(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return di(r) == "symbol" ? r : r + "";
      }
      function hp(o, r, n) {
        return r = bn(r), function(l, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Jl() ? Reflect.construct(r, n || [], bn(o).constructor) : r.apply(o, n));
      }
      function Jl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Jl = function() {
          return !!o;
        })();
      }
      function _o() {
        return _o = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = bn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _o.apply(this, arguments);
      }
      function bn(o) {
        return bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bn(o);
      }
      function Fs(o, r) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Fs(o, r);
      }
      var Kl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Fs(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var t = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && t--, this.enum_values = [];
            for (var i = 0; i < t; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var c = function(te) {
            te.preventDefault(), te.stopPropagation(), e.setValue(te.currentTarget.value), e.onChange(!0);
          }, d = this.enum_values.length - 1; d > -1; d--) {
            var g = this.formname + (d + 1), x = this.theme.getFormInputField("radio");
            x.name = "".concat(this.formname, "[starrating]"), x.value = this.enum_values[d], x.id = g, x.addEventListener("change", c, !1), this.radioGroup.push(x);
            var S = document.createElement("label");
            S.htmlFor = g, S.title = this.enum_values[d], this.options.displayValue && S.classList.add("starrating-display-enabled");
            var D = this.theme.getHiddenText("label");
            D.textContent = d, S.appendChild(D), this.ratingContainer.appendChild(x), this.ratingContainer.appendChild(S);
          }
          if (this.options.displayValue && (this.displayRating = document.createElement("div"), this.displayRating.classList.add("starrating-display"), this.displayRating.innerText = this.enum_values[0], this.ratingContainer.appendChild(this.displayRating)), this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var $ = 0; $ < this.radioGroup.length; $++) this.radioGroup[$].disabled = !0;
            this.ratingContainer.classList.add("readonly");
          }
          var G = this.theme.getContainer();
          G.appendChild(this.ratingContainer), this.input = G, this.control = this.theme.getFormControl(this.label, G, this.description, this.infoButton), this.container.appendChild(this.control), this.refreshValue();
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !1;
            this.ratingContainer.classList.remove("readonly"), this.disabled = !1;
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.ratingContainer.classList.add("readonly"), this.disabled = !0;
        } }, { key: "destroy", value: function() {
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), _o(bn(r.prototype), "destroy", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.type === "integer" ? this.value === "" ? 0 : parseInt(this.value) : this.value;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value = e;
          for (var t = 0; t < this.radioGroup.length; t++) if (this.radioGroup[t].value === "".concat(e)) {
            this.radioGroup[t].checked = !0, this.value = e, this.options.displayValue && (this.displayRating.innerHTML = this.value);
            break;
          }
          _o(bn(r.prototype), "setValue", this).call(this, this.value);
        } }]) && up(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function hi(o) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(o);
      }
      function pp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, fp(l.key), l);
        }
      }
      function fp(o) {
        var r = function(n, l) {
          if (hi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (hi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return hi(r) == "symbol" ? r : r + "";
      }
      function yp(o, r, n) {
        return r = en(r), function(l, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Zl() ? Reflect.construct(r, n || [], en(o).constructor) : r.apply(o, n));
      }
      function Zl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Zl = function() {
          return !!o;
        })();
      }
      function Vi() {
        return Vi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = en(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Vi.apply(this, arguments);
      }
      function en(o) {
        return en = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, en(o);
      }
      function Ms(o, r) {
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ms(o, r);
      }
      Kl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var mp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ms(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          Vi(en(r.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var e = this.theme.getStepperButtons(this.input);
          this.control.appendChild(e), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          Vi(en(r.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          Vi(en(r.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && pp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Pl);
      function pi(o) {
        return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pi(o);
      }
      function bp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, vp(l.key), l);
        }
      }
      function vp(o) {
        var r = function(n, l) {
          if (pi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (pi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return pi(r) == "symbol" ? r : r + "";
      }
      function gp(o, r, n) {
        return r = sr(r), function(l, e) {
          if (e && (pi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Yl() ? Reflect.construct(r, n || [], sr(o).constructor) : r.apply(o, n));
      }
      function Yl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Yl = function() {
          return !!o;
        })();
      }
      function vn() {
        return vn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = sr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vn.apply(this, arguments);
      }
      function sr(o) {
        return sr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, sr(o);
      }
      function Hs(o, r) {
        return Hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Hs(o, r);
      }
      var _p = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hs(e, t);
        }(r, o), n = r, l = [{ key: "register", value: function() {
          if (vn(sr(r.prototype), "register", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].register();
        } }, { key: "unregister", value: function() {
          if (vn(sr(r.prototype), "unregister", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var e = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = e.title || "row", this.item_default = e.default || null, this.item_has_child_editors = e.properties || e.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, vn(sr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          this.tableContainer = this.theme.getTableContainer(), this.table = this.theme.getTable(), this.tableContainer.appendChild(this.table), this.container.appendChild(this.tableContainer), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
          var e = this.getElementEditor(0, !0);
          if (this.item_default = e.getDefault(), this.width = e.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.tableContainer), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls), this.item_has_child_editors) for (var t = e.getChildEditors(), i = e.property_order || Object.keys(t), c = 0; c < i.length; c++) {
            var d = this.theme.getTableHeaderCell(t[i[c]].getTitle());
            t[i[c]].options.hidden && (d.style.display = "none"), this.header_row.appendChild(d);
          }
          else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
          e.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(this.translate("table_controls")), this.controls_header_cell.setAttribute("aria-hidden", "true"), this.controls_header_cell.style.visibility = "hidden", this.header_row.appendChild(this.controls_header_cell), this.addControls();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), vn(sr(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemDefault", value: function() {
          return v({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = v({}, this.schema.items), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.row_holder.appendChild(this.theme.getTableRow()), g = d;
          this.item_has_child_editors || (g = this.theme.getTableCell(), d.appendChild(g));
          var x = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: g, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
          return x.preBuild(), t || (x.build(), x.postBuild(), x.controls_cell = d.appendChild(this.theme.getTableCell()), x.row = d, x.table_controls = this.theme.getButtonHolder(), x.controls_cell.appendChild(x.table_controls), x.table_controls.style.margin = 0, x.table_controls.style.padding = 0), x;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, vn(sr(r.prototype), "destroy", this).call(this);
        } }, { key: "ensureArraySize", value: function(e) {
          if (Array.isArray(e) || (e = [e]), this.schema.minItems) for (; e.length < this.schema.minItems; ) e.push(this.getItemDefault());
          return this.schema.maxItems && e.length > this.schema.maxItems && (e = e.slice(0, this.schema.maxItems)), e;
        } }, { key: "setValue", value: function() {
          var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (t = this.applyConstFilter(t), t = this.ensureArraySize(t), JSON.stringify(t) !== this.serialized) {
            var c = !1;
            t.forEach(function(x, S) {
              e.rows[S] ? e.rows[S].setValue(x) : (e.addRow(x), c = !0);
            });
            for (var d = t.length; d < this.rows.length; d++) {
              var g = this.rows[d].container;
              this.item_has_child_editors || this.rows[d].row.parentNode.removeChild(this.rows[d].row), this.rows[d].destroy(), g.parentNode && g.parentNode.removeChild(g), this.rows[d] = null, c = !0;
            }
            this.rows = this.rows.slice(0, t.length), this.refreshValue(), (c || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var e = this, t = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, c = [];
          this.rows.forEach(function($, G) {
            if ($.delete_button) {
              var te = !t;
              e.setButtonState($.delete_button, te), c.push(te);
            }
            if ($.copy_button) {
              var pe = !i;
              e.setButtonState($.copy_button, pe), c.push(pe);
            }
            if ($.moveup_button) {
              var _e = G !== 0;
              e.setButtonState($.moveup_button, _e), c.push(_e);
            }
            if ($.movedown_button) {
              var we = G !== e.rows.length - 1;
              e.setButtonState($.movedown_button, we), c.push(we);
            }
          });
          var d = c.some(function($) {
            return $;
          });
          this.rows.forEach(function($) {
            return e.setButtonState($.controls_cell, d);
          }), this.setButtonState(this.controls_header_cell, d), this.setButtonState(this.table, this.value.length);
          var g = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, g);
          var x = !(!this.value.length || t || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, x);
          var S = !(this.value.length <= 1 || t || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, S);
          var D = g || x || S;
          this.setButtonState(this.controls, D);
        } }, { key: "refreshValue", value: function() {
          var e = this;
          this.value = [], this.rows.forEach(function(t, i) {
            e.value[i] = t.getValue();
          }), this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e) {
          var t = this.rows.length;
          this.rows[t] = this.getElementEditor(t);
          var i = this.rows[t].table_controls;
          return this.hide_delete_buttons || (this.rows[t].delete_button = this._createDeleteButton(t, i)), this.show_copy_button && (this.rows[t].copy_button = this._createCopyButton(t, i)), this.hide_move_buttons || (this.rows[t].moveup_button = this._createMoveUpButton(t, i)), this.hide_move_buttons || (this.rows[t].movedown_button = this._createMoveDownButton(t, i)), this._supportDragDrop(this.rows[t].row), e !== void 0 && this.rows[t].setValue(e), this.rows[t];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, c = this.getButton("", "delete", "button_delete_row_title_short");
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            if (d.preventDefault(), d.stopPropagation(), !i.askConfirmation()) return !1;
            var g = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue(), S = i.getValue()[g];
            x.splice(g, 1), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("deleteRow", S);
          }), t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton("", "copy", "button_copy_row_title_short"), d = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(g) {
            g.preventDefault(), g.stopPropagation();
            var x = 1 * g.currentTarget.getAttribute("data-i"), S = i.getValue(), D = S[x];
            d.items.type === "string" && d.items.format === "uuid" ? D = T() : d.items.type === "object" && d.items.properties && S.forEach(function($, G) {
              if (x === G) for (var te = 0, pe = Object.keys($); te < pe.length; te++) {
                var _e = pe[te];
                d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && ((D = Object.assign({}, S[x]))[_e] = T());
              }
            }), S.splice(x + 1, 0, D), i.setValue(S), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[x + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var g = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(g - 1, 0, x.splice(g, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var g = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(g + 1, 0, x.splice(g, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          le(e, function(i, c) {
            var d = t.getValue(), g = d[i];
            d.splice(i, 1), d.splice(c, 0, g), t.setValue(d), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[c]);
          }, { useTrigger: !0 });
        } }, { key: "addControls", value: function() {
          var e = this;
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.title_controls && (this.title.insertBefore(this.toggle_button, this.title.childNodes[0]), this.toggle_button.addEventListener("click", function(t) {
            t.preventDefault(), t.stopPropagation(), e.setButtonState(e.panel, e.collapsed), e.collapsed ? (e.collapsed = !1, e.setButtonText(t.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.setButtonText(t.currentTarget, "", "expand", "button_expand"));
          }), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none")), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton();
        } }, { key: "_createToggleButton", value: function() {
          var e = this.getButton("", "collapse", "button_collapse");
          return e.classList.add("json-editor-btntype-toggle"), e;
        } }, { key: "_createAddRowButton", value: function() {
          var e = this, t = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-add"), t.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var c = e.addRow();
            e.refreshValue(), e.refreshRowButtons(), e.onChange(!0), e.jsoneditor.trigger("addRow", c);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue(), d = c.pop();
            e.setValue(c), e.onChange(!0), e.jsoneditor.trigger("deleteRow", d);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue();
            e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", c);
          }), this.controls.appendChild(t), t;
        } }], l && bp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(he);
      function fi(o) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(o);
      }
      function wp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, jp(l.key), l);
        }
      }
      function jp(o) {
        var r = function(n, l) {
          if (fi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (fi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return fi(r) == "symbol" ? r : r + "";
      }
      function kp(o, r, n) {
        return r = tn(r), function(l, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ql() ? Reflect.construct(r, n || [], tn(o).constructor) : r.apply(o, n));
      }
      function Ql() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ql = function() {
          return !!o;
        })();
      }
      function zi() {
        return zi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = tn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, zi.apply(this, arguments);
      }
      function tn(o) {
        return tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, tn(o);
      }
      function Vs(o, r) {
        return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Vs(o, r);
      }
      function yi(o) {
        return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yi(o);
      }
      function xp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Op(l.key), l);
        }
      }
      function Op(o) {
        var r = function(n, l) {
          if (yi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (yi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return yi(r) == "symbol" ? r : r + "";
      }
      function Cp(o, r, n) {
        return r = rn(r), function(l, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Xl() ? Reflect.construct(r, n || [], rn(o).constructor) : r.apply(o, n));
      }
      function Xl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Xl = function() {
          return !!o;
        })();
      }
      function qi() {
        return qi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = rn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, qi.apply(this, arguments);
      }
      function rn(o) {
        return rn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, rn(o);
      }
      function zs(o, r) {
        return zs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, zs(o, r);
      }
      function mi(o) {
        return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mi(o);
      }
      function Ep(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Sp(l.key), l);
        }
      }
      function Sp(o) {
        var r = function(n, l) {
          if (mi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (mi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return mi(r) == "symbol" ? r : r + "";
      }
      function Pp(o, r, n) {
        return r = ar(r), function(l, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ec() ? Reflect.construct(r, n || [], ar(o).constructor) : r.apply(o, n));
      }
      function ec() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ec = function() {
          return !!o;
        })();
      }
      function gn() {
        return gn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ar(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, gn.apply(this, arguments);
      }
      function ar(o) {
        return ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ar(o);
      }
      function qs(o, r) {
        return qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, qs(o, r);
      }
      b(9868);
      var wo = { ace: tt, array: he, arrayChoices: un, arraySelect2: wd, arraySelectize: Od, autocomplete: Pd, base64: Rd, button: yl, checkbox: Hd, choices: gl, datetime: Zd, describedBy: eh, enum: ih, hidden: lh, info: hh, integer: Pl, ip: jh, jodit: Ch, multiple: Rh, multiselect: Ae, null: Dh, number: El, object: Vl, radio: qh, sceditor: Wh, select: Di, select2: Yh, selectize: tp, signature: op, simplemde: cp, starrating: Kl, stepper: mp, string: fe, table: _p, upload: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vs(e, t);
        }(r, o), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", v({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(c, d, g, x) {
            window.alert('No upload_handler defined for "'.concat(c.path, '". You must create your own handler to enable upload to server'));
          } }, this.defaults.options.upload || {}, this.options.upload || {})), this.options.mime_type = this.options.mime_type ? [].concat(this.options.mime_type) : [], this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
            if (typeof this.options.upload_handler != "function") throw new Error("Upload handler required for upload editor");
            if (this.uploader = this.theme.getFormInputField("file"), this.uploader.style.display = "none", this.options.mime_type.length && this.uploader.setAttribute("accept", this.options.mime_type), this.options.enable_drag_drop === !0 && this.options.hide_input === !0 || (this.clickHandler = function(c) {
              e.uploader.dispatchEvent(new window.MouseEvent("click", { view: window, bubbles: !0, cancelable: !1 }));
            }, this.browseButton = this.getButton(this.options.title, this.options.icon, this.options.title), this.browseButton.addEventListener("click", this.clickHandler), this.fileDisplay = this.theme.getFormInputField("input"), this.fileDisplay.setAttribute("readonly", !0), this.fileDisplay.value = "No file selected.", this.fileDisplay.addEventListener("dblclick", this.clickHandler), this.fileUploadGroup = this.theme.getInputGroup(this.fileDisplay, [this.browseButton]), this.fileUploadGroup || (this.fileUploadGroup = document.createElement("div"), this.fileUploadGroup.appendChild(this.fileDisplay), this.fileUploadGroup.appendChild(this.browseButton))), this.options.enable_drag_drop === !0) {
              if (this.options.alt_drop_zone !== "") {
                if (this.altDropZone = document.querySelector(this.options.alt_drop_zone), !this.altDropZone) throw new Error('Error: alt_drop_zone selector "'.concat(this.options.alt_drop_zone, '" not found!'));
                this.dropZone = this.altDropZone;
              } else this.dropZone = this.theme.getDropZone(this.options.drop_zone_text);
              this.dropZone && (this.dropZone.classList.add("upload-dropzone"), this.dropZone.addEventListener("dblclick", this.clickHandler));
            }
            this.uploadHandler = function(c) {
              c.preventDefault(), c.stopPropagation();
              var d = c.target.files || c.dataTransfer.files;
              if (d && d.length) if (e.options.max_upload_size !== 0 && d[0].size > e.options.max_upload_size) e.theme.addInputError(e.uploader, "".concat(e.translate("upload_max_size"), " ").concat(e.options.max_upload_size));
              else if (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)) {
                e.fileDisplay && (e.fileDisplay.value = d[0].name);
                var g = new window.FileReader();
                g.onload = function(x) {
                  e.preview_value = x.target.result, e.refreshPreview(d), e.onChange(!0), g = null;
                }, g.readAsDataURL(d[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(c) {
              var d = c.dataTransfer.items || c.dataTransfer.files, g = d && d.length && (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)), x = c.currentTarget.classList && c.currentTarget.classList.contains("upload-dropzone") && g;
              switch ((c.currentTarget === window ? "w_" : "e_") + c.type) {
                case "w_drop":
                case "w_dragover":
                  x || (c.dataTransfer.dropEffect = "none");
                  break;
                case "e_dragenter":
                  x ? (e.dropZone.classList.add("valid-dropzone"), c.dataTransfer.dropEffect = "copy") : e.dropZone.classList.add("invalid-dropzone");
                  break;
                case "e_dragover":
                  x && (c.dataTransfer.dropEffect = "copy");
                  break;
                case "e_dragleave":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone");
                  break;
                case "e_drop":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone"), x && e.uploadHandler(c);
              }
              x || c.preventDefault();
            }, this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(c) {
              window.addEventListener(c, e.dragHandler, !0);
            }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(c) {
              e.dropZone.addEventListener(c, e.dragHandler, !0);
            }));
          }
          this.preview = document.createElement("div"), this.control = this.input.controlgroup = this.theme.getFormControl(this.label, this.uploader || this.input, this.description, this.infoButton), this.uploader && (this.uploader.controlgroup = this.control);
          var t = this.uploader || this.input, i = document.createElement("div");
          this.dropZone && !this.altDropZone && this.options.drop_zone_top === !0 && i.appendChild(this.dropZone), this.fileUploadGroup && i.appendChild(this.fileUploadGroup), this.dropZone && !this.altDropZone && this.options.drop_zone_top !== !0 && i.appendChild(this.dropZone), i.appendChild(this.preview), t.parentNode.insertBefore(i, t.nextSibling), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.afterInputReady();
          });
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (this.value) {
            var t = document.createElement("img");
            t.style.maxWidth = "100%", t.style.maxHeight = "100px", t.onload = function(i) {
              e.preview.appendChild(t);
            }, t.onerror = function(i) {
              console.error("upload error", i, i.currentTarget);
            }, t.src = this.container.querySelector("a").href;
          }
          this.theme.afterInputReady(this.input);
        } }, { key: "refreshPreview", value: function(e) {
          var t = this;
          if (this.last_preview !== this.preview_value && (this.last_preview = this.preview_value, this.preview.innerHTML = "", this.preview_value)) {
            var i = e[0], c = this.preview_value.match(/^data:([^;,]+)[;,]/);
            if (i.mimeType = c ? c[1] : "unknown", i.size > 0) {
              var d = Math.floor(Math.log(i.size) / Math.log(1024));
              i.formattedSize = "".concat(parseFloat((i.size / Math.pow(1024, d)).toFixed(2)), " ").concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]);
            } else i.formattedSize = "0 Bytes";
            var g = this.getButton("button_upload", "upload", "button_upload");
            g.addEventListener("click", function(x) {
              x.preventDefault(), g.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.options.upload_handler(t.path, i, { success: function(S) {
                t.setValue(S), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), g.removeAttribute("disabled");
              }, failure: function(S) {
                t.theme.addInputError(t.uploader, S), t.progressBar && t.preview.removeChild(t.progressBar), g.removeAttribute("disabled");
              }, updateProgress: function(S) {
                t.progressBar && (S ? t.theme.updateProgressBar(t.progressBar, S) : t.theme.updateProgressBarUnknown(t.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, g, this.preview_value)), this.options.auto_upload && (g.dispatchEvent(new window.MouseEvent("click")), g.parentNode.removeChild(g));
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), zi(tn(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), zi(tn(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.input.value = this.value, this.onChange());
        } }, { key: "destroy", value: function() {
          var e = this;
          this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(t) {
            window.removeEventListener(t, e.dragHandler, !0);
          }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(t) {
            e.dropZone.removeEventListener(t, e.dragHandler, !0);
          }), this.dropZone.removeEventListener("dblclick", this.clickHandler), this.dropZone && this.dropZone.parentNode && this.dropZone.parentNode.removeChild(this.dropZone)), this.uploader && this.uploader.parentNode && (this.uploader.removeEventListener("change", this.uploadHandler), this.uploader.parentNode.removeChild(this.uploader)), this.browseButton && this.browseButton.parentNode && (this.browseButton.removeEventListener("click", this.clickHandler), this.browseButton.parentNode.removeChild(this.browseButton)), this.fileDisplay && this.fileDisplay.parentNode && (this.fileDisplay.removeEventListener("dblclick", this.clickHandler), this.fileDisplay.parentNode.removeChild(this.fileDisplay)), this.fileUploadGroup && this.fileUploadGroup.parentNode && this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup), this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.header && this.header.parentNode && this.header.parentNode.removeChild(this.header), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), zi(tn(r.prototype), "destroy", this).call(this);
        } }, { key: "isValidMimeType", value: function(e, t) {
          return t.reduce(function(i, c) {
            return i || new RegExp(c.replace(/\*/g, ".*"), "gi").test(e);
          }, !1);
        } }]) && wp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z), uuid: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zs(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          qi(rn(r.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          qi(rn(r.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.testUuid(e) || (e = this.uuid), e;
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e), this.testUuid(e) || (e = this.uuid), this.uuid = e, qi(rn(r.prototype), "setValue", this).call(this, e, t, i);
        } }, { key: "getUuid", value: function() {
          return T();
        } }, { key: "testUuid", value: function(e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e);
        } }]) && xp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe), colorpicker: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Pp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qs(e, t);
        }(r, o), n = r, (l = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = gn(ar(r.prototype), "setValue", this).call(this, e, t, i);
          return this.picker_instance && this.picker_instance.domElement && c && c.changed && this.picker_instance.setColor(c.value, !0), c;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          gn(ar(r.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (gn(ar(r.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (gn(ar(r.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), gn(ar(r.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(e) {
          var t = this;
          if (e) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", v({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), c = function(d) {
                var g = t.picker_instance.settings.editorFormat, x = t.picker_instance.settings.alpha;
                t.setValue(g === "hex" ? x ? d.hex : d.hex.slice(0, 7) : d["".concat(g + (x ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = c) : i.onChange = c, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && Ep(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe) };
      function tc(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      var rc = {}, Us = "en", Tp = Us;
      rc.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(wo).forEach(function(o) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, c) {
            var d = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (d != null) {
              var g, x, S, D, $ = [], G = !0, te = !1;
              try {
                if (S = (d = d.call(i)).next, c !== 0) for (; !(G = (g = S.call(d)).done) && ($.push(g.value), $.length !== c); G = !0) ;
              } catch (pe) {
                te = !0, x = pe;
              } finally {
                try {
                  if (!G && d.return != null && (D = d.return(), Object(D) !== D)) return;
                } finally {
                  if (te) throw x;
                }
              }
              return $;
            }
          }(e, t) || function(i, c) {
            if (i) {
              if (typeof i == "string") return tc(i, c);
              var d = Object.prototype.toString.call(i).slice(8, -1);
              return d === "Object" && i.constructor && (d = i.constructor.name), d === "Map" || d === "Set" ? Array.from(i) : d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? tc(i, c) : void 0;
            }
          }(e, t) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(o, 2), n = r[0], l = r[1];
        wo[n].options = l.options || {};
      });
      var _n = { options: { upload: function(o, r, n) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: wo, languages: rc, resolvers: w, custom_validators: [], default_language: Us, language: Tp, translate: function(o, r, n) {
        var l = {};
        n && n.options && n.options.error_messages && n.options.error_messages[_n.language] && (l = n.options.error_messages[_n.language]);
        var e = _n.languages[_n.language];
        if (!e) throw new Error("Unknown language ".concat(_n.language));
        var t = l[o] || e[o] || _n.languages[Us][o] || o;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(o, r) {
        return o;
      } };
      function wn() {
        wn = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function(U, q, K) {
          U[q] = K.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function g(U, q, K) {
          return Object.defineProperty(U, q, { value: K, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          g({}, "");
        } catch {
          g = function(q, K, ge) {
            return q[K] = ge;
          };
        }
        function x(U, q, K, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new hr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, K, $e) }), Le;
        }
        function S(U, q, K) {
          try {
            return { type: "normal", arg: U.call(q, K) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", $ = "suspendedYield", G = "executing", te = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        g(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ct([])));
        ve && ve !== n && l.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ke(U) {
          ["next", "throw", "return"].forEach(function(q) {
            g(U, q, function(K) {
              return this._invoke(q, K);
            });
          });
        }
        function it(U, q) {
          function K(se, Le, $e, ot) {
            var st = S(U[se], U, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && bt(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                K("next", Et, $e, ot);
              }, function(Et) {
                K("throw", Et, $e, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return K("throw", Et, $e, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(ot, st) {
                K(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, K) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (K.method = se, K.arg = Le; ; ) {
              var $e = K.delegate;
              if ($e) {
                var ot = nn($e, K);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (K.method === "next") K.sent = K._sent = K.arg;
              else if (K.method === "throw") {
                if (ge === D) throw ge = te, K.arg;
                K.dispatchException(K.arg);
              } else K.method === "return" && K.abrupt("return", K.arg);
              ge = G;
              var st = S(U, q, K);
              if (st.type === "normal") {
                if (ge = K.done ? te : $, st.arg === pe) continue;
                return { value: st.arg, done: K.done };
              }
              st.type === "throw" && (ge = te, K.method = "throw", K.arg = st.arg);
            }
          };
        }
        function nn(U, q) {
          var K = q.method, ge = U.iterator[K];
          if (ge === o) return q.delegate = null, K === "throw" && U.iterator.return && (q.method = "return", q.arg = o, nn(U, q), q.method === "throw") || K !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + K + "' method")), pe;
          var se = S(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function Ci(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function hr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(Ci, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var K = -1, ge = function se() {
                for (; ++K < U.length; ) if (l.call(U, K)) return se.value = U[K], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(bt(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = g(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, g(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ke(it.prototype), g(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function(U, q, K, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x(U, q, K, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), g(xe, d, "Generator"), g(xe, i, function() {
          return this;
        }), g(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), K = [];
          for (var ge in q) K.push(ge);
          return K.reverse(), function se() {
            for (; K.length; ) {
              var Le = K.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, hr.prototype = { constructor: hr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function K(st, It) {
            return Le.type = "throw", Le.arg = U, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return K("end");
            if (se.tryLoc <= this.prev) {
              var $e = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if ($e && ot) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var K = this.tryEntries.length - 1; K >= 0; --K) {
            var ge = this.tryEntries[K];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (U === "break" || U === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = U, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function(U, q) {
          if (U.type === "throw") throw U.arg;
          return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && q && (this.next = q), pe;
        }, finish: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.finallyLoc === U) return this.complete(K.completion, K.afterLoc), Ne(K), pe;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.tryLoc === U) {
              var ge = K.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(K);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, K) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: K }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function nc(o, r, n, l, e, t, i) {
        try {
          var c = o[t](i), d = c.value;
        } catch (g) {
          return void n(g);
        }
        c.done ? r(d) : Promise.resolve(d).then(l, e);
      }
      function ic(o) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(l, e) {
            var t = o.apply(r, n);
            function i(d) {
              nc(t, l, e, i, c, "next", d);
            }
            function c(d) {
              nc(t, l, e, i, c, "throw", d);
            }
            i(void 0);
          });
        };
      }
      function jn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, d, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(o, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return oc(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? oc(n, l) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function oc(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function bt(o) {
        return bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bt(o);
      }
      function Lp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ap(l.key), l);
        }
      }
      function Ap(o) {
        var r = function(n, l) {
          if (bt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (bt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return bt(r) == "symbol" ? r : r + "";
      }
      b(1688);
      var Rp = function() {
        return o = function e(t) {
          (function(i, c) {
            if (!(i instanceof c)) throw new TypeError("Cannot call a class as a function");
          })(this, e), this.options = t || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            bt(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            bt(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var c = this;
            Object.entries(i.anyOf).forEach(function(d) {
              var g = jn(d, 2), x = g[0], S = g[1];
              i.anyOf[x] = c.expandSchema(S);
            });
          }, dependencies: function(i) {
            var c = this;
            Object.entries(i.dependencies).forEach(function(d) {
              var g = jn(d, 2), x = g[0], S = g[1];
              bt(S) !== "object" || Array.isArray(S) || (i.dependencies[x] = c.expandSchema(S));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, c) {
            var d = this, g = v({}, c);
            return Object.entries(i.allOf).forEach(function(x) {
              var S = jn(x, 2), D = S[0], $ = S[1];
              i.allOf[D] = d.expandRefs($, !0), g = d.extendSchemas(g, d.expandSchema($));
            }), delete g.allOf, g;
          }, extends: function(i, c) {
            var d, g = this;
            return delete (d = Array.isArray(i.extends) ? i.extends.reduce(function(x, S, D) {
              return g.extendSchemas(x, g.expandSchema(S));
            }, c) : this.extendSchemas(c, this.expandSchema(i.extends))).extends, d;
          }, oneOf: function(i, c) {
            var d = this, g = v({}, c);
            return delete g.oneOf, i.oneOf.reduce(function(x, S, D) {
              return x.oneOf[D] = d.extendSchemas(d.expandSchema(S), g), x;
            }, c), c;
          } };
        }, r = [{ key: "load", value: (l = ic(wn().mark(function e(t, i, c) {
          return wn().wrap(function(d) {
            for (; ; ) switch (d.prev = d.next) {
              case 0:
                return this.schema = t, d.next = 3, this._asyncloadExternalRefs(t, i, this._getFileBase(c), !0);
              case 3:
                return d.abrupt("return", this.expandRefs(t));
              case 4:
              case "end":
                return d.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return l.apply(this, arguments);
        }) }, { key: "expandRefs", value: function(e, t) {
          var i = this, c = v({}, e);
          if (!c.$ref) return c;
          var d = c.$ref.split("#");
          if (d.length === 2 && !this.refs_with_info[c.$ref]) {
            var g = this.expandRecursivePointer(this.schema, d[1]), x = this.extendSchemas(c, this.expandSchema(g));
            return delete x.$ref, x;
          }
          var S = d.length > 2 ? this.refs_with_info["#" + d[1]] : this.refs_with_info[c.$ref];
          delete c.$ref;
          var D = S.$ref.startsWith("#") ? S.fetchUrl : "", $ = this._getRef(D, S);
          if (this.refs[$]) {
            if (t && k(this.refs[$], "allOf")) {
              var G = this.refs[$].allOf;
              Object.keys(G).forEach(function(te) {
                G[te] = i.expandRefs(G[te], !0);
              });
            }
          } else console.warn("reference:'".concat($, "' not found!"));
          return d.length > 2 ? this.extendSchemas(c, this.expandSchema(this.expandRecursivePointer(this.refs[$], d[2]))) : this.extendSchemas(c, this.expandSchema(this.refs[$]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(c) {
            i[c] && (i = i[c]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(c) {
            var d = jn(c, 2), g = d[0], x = d[1];
            e[g] && x.call(t, e);
          });
          var i = v({}, e);
          return Object.entries(this._subSchema2).forEach(function(c) {
            var d = jn(c, 2), g = d[0], x = d[1];
            e[g] && (i = x.call(t, e, i));
          }), this.expandRefs(i);
        } }, { key: "_getRef", value: function(e, t) {
          var i = e + t;
          return this.refs[i] ? i : e + decodeURIComponent(t.$ref);
        } }, { key: "_expandSubSchema", value: function(e) {
          var t = this;
          return Array.isArray(e) ? e.map(function(i) {
            return bt(i) === "object" ? t.expandSchema(i) : i;
          }) : this.expandSchema(e);
        } }, { key: "_manageRecursivePointer", value: function(e, t) {
          Object.keys(e).forEach(function(i) {
            e[i] !== null && e[i].$ref && e[i].$ref.indexOf("#") === 0 && (e[i].$ref = t + e[i].$ref);
          });
        } }, { key: "_getExternalRefs", value: function(e, t) {
          var i = this, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
          c || this._manageRecursivePointer(e, t);
          var d = {}, g = function(G) {
            return Object.keys(G).forEach(function(te) {
              d[te] = !0;
            });
          };
          if (e.$ref && bt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !c)) {
            var x = e.$ref, S = "";
            x.indexOf("#") > 0 && (x = x.substr(0, x.indexOf("#"))), x !== e.$ref && (S = e.$ref.substr(e.$ref.indexOf("#")));
            var D = this.refs_prefix + this.refs_counter++, $ = D + S;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (d[x] = !0), this.refs_with_info[D] = { fetchUrl: t, $ref: x }, e.$ref = $;
          }
          return Object.values(e).forEach(function(G) {
            G && bt(G) === "object" && (Array.isArray(G) ? Object.values(G).forEach(function(te) {
              te && bt(te) === "object" && g(i._getExternalRefs(te, t, c));
            }) : G.$ref && typeof G.$ref == "string" && G.$ref.startsWith("#") || g(i._getExternalRefs(G, t, c)));
          }), e.id && typeof e.id == "string" && e.id.substr(0, 4) === "urn:" ? this.refs[e.id] = e : e.$id && typeof e.$id == "string" && e.$id.substr(0, 4) === "urn:" && (this.refs[e.$id] = e), d;
        } }, { key: "_getFileBase", value: function(e) {
          if (!e) return "/";
          var t = this.options.ajaxBase;
          return t === void 0 ? this._getFileBaseFromFileLocation(e) : t;
        } }, { key: "_getFileBaseFromFileLocation", value: function(e) {
          var t = e.split("/");
          return t.pop(), "".concat(t.join("/"), "/");
        } }, { key: "_joinUrl", value: function(e, t) {
          var i = e;
          return e.substr(0, 7) !== "http://" && e.substr(0, 8) !== "https://" && e.substr(0, 5) !== "blob:" && e.substr(0, 5) !== "data:" && e.substr(0, 1) !== "#" && e.substr(0, 1) !== "/" && (i = t + e), i.indexOf("#") > 0 && (i = i.substr(0, i.indexOf("#"))), i;
        } }, { key: "_isUniformResourceName", value: function(e) {
          return e.substr(0, 4) === "urn:";
        } }, { key: "_asyncloadExternalRefs", value: (n = ic(wn().mark(function e(t, i, c) {
          var d, g, x, S, D, $, G = this, te = arguments;
          return wn().wrap(function(pe) {
            for (; ; ) switch (pe.prev = pe.next) {
              case 0:
                d = te.length > 3 && te[3] !== void 0 && te[3], g = this._getExternalRefs(t, i, d), x = 0, S = wn().mark(function _e() {
                  var we, Ie, De, He, ve, xe, Ke, it, Ot, nn, Ci;
                  return wn().wrap(function(Ne) {
                    for (; ; ) switch (Ne.prev = Ne.next) {
                      case 0:
                        if ((we = $[D]) !== void 0) {
                          Ne.next = 3;
                          break;
                        }
                        return Ne.abrupt("return", 0);
                      case 3:
                        if (!G.refs[we]) {
                          Ne.next = 5;
                          break;
                        }
                        return Ne.abrupt("return", 0);
                      case 5:
                        if (!G._isUniformResourceName(we)) {
                          Ne.next = 40;
                          break;
                        }
                        if (G.refs[we] = "loading", x++, Ie = G.options.urn_resolver, De = we, typeof Ie == "function") {
                          Ne.next = 13;
                          break;
                        }
                        throw console.log('No "urn_resolver" callback defined to resolve "'.concat(De, '"')), new Error("Must set urn_resolver option to a callback to resolve ".concat(De));
                      case 13:
                        return De.indexOf("#") > 0 && (De = De.substr(0, De.indexOf("#"))), Ne.prev = 14, Ne.next = 17, Ie(De);
                      case 17:
                        He = Ne.sent, Ne.prev = 18, ve = JSON.parse(He), Ne.next = 26;
                        break;
                      case 22:
                        throw Ne.prev = 22, Ne.t0 = Ne.catch(18), console.log(Ne.t0), new Error("Failed to parse external ref ".concat(De));
                      case 26:
                        if (!(typeof ve != "boolean" && bt(ve) !== "object" || ve === null || Array.isArray(ve))) {
                          Ne.next = 28;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(De));
                      case 28:
                        return G.refs[we] = ve, Ne.next = 31, G._asyncloadExternalRefs(ve, we, c);
                      case 31:
                        Ne.next = 37;
                        break;
                      case 33:
                        throw Ne.prev = 33, Ne.t1 = Ne.catch(14), console.log(Ne.t1), new Error("Failed to parse external ref ".concat(De));
                      case 37:
                        if (typeof He != "boolean") {
                          Ne.next = 39;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(De));
                      case 39:
                        return Ne.abrupt("return", 0);
                      case 40:
                        if (G.options.ajax) {
                          Ne.next = 42;
                          break;
                        }
                        throw new Error("Must set ajax option to true to load external ref ".concat(we));
                      case 42:
                        if (x++, xe = G._joinUrl(we, c), G.options.ajax_cache_responses && (it = G.cacheGet(xe)) && (Ke = it), Ke) {
                          Ne.next = 61;
                          break;
                        }
                        return Ne.next = 48, new Promise(function(hr) {
                          var Ct = new XMLHttpRequest();
                          G.options.ajaxCredentials && (Ct.withCredentials = G.options.ajaxCredentials), Ct.overrideMimeType("application/json"), Ct.open("GET", xe, !0), Ct.onload = function() {
                            hr(Ct);
                          }, Ct.onerror = function(U) {
                            hr(void 0);
                          }, Ct.send();
                        });
                      case 48:
                        if ((Ot = Ne.sent) !== void 0) {
                          Ne.next = 51;
                          break;
                        }
                        throw new Error("Failed to fetch ref via ajax - ".concat(we));
                      case 51:
                        Ne.prev = 51, Ke = JSON.parse(Ot.responseText), G.onSchemaLoaded({ schema: Ke, schemaUrl: xe }), G.options.ajax_cache_responses && G.cacheSet(xe, Ke), Ne.next = 61;
                        break;
                      case 57:
                        throw Ne.prev = 57, Ne.t2 = Ne.catch(51), console.log(Ne.t2), new Error("Failed to parse external ref ".concat(xe));
                      case 61:
                        if (!(typeof Ke != "boolean" && bt(Ke) !== "object" || Ke === null || Array.isArray(Ke))) {
                          Ne.next = 63;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(xe));
                      case 63:
                        return G.refs[we] = Ke, nn = G._getFileBaseFromFileLocation(xe), xe !== we && (Ci = xe.split("/"), xe = (we.substr(0, 1) === "/" ? "/" : "") + Ci.pop()), Ne.next = 68, G._asyncloadExternalRefs(Ke, xe, nn);
                      case 68:
                      case "end":
                        return Ne.stop();
                    }
                  }, _e, null, [[14, 33], [18, 22], [51, 57]]);
                }), D = 0, $ = Object.keys(g);
              case 5:
                if (!(D < $.length)) {
                  pe.next = 13;
                  break;
                }
                return pe.delegateYield(S(), "t0", 7);
              case 7:
                if (pe.t0 !== 0) {
                  pe.next = 10;
                  break;
                }
                return pe.abrupt("continue", 10);
              case 10:
                D++, pe.next = 5;
                break;
              case 13:
                if (x) {
                  pe.next = 15;
                  break;
                }
                return pe.abrupt("return", !0);
              case 15:
                this.onAllSchemasLoaded();
              case 16:
              case "end":
                return pe.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return n.apply(this, arguments);
        }) }, { key: "onSchemaLoaded", value: function(e) {
        } }, { key: "onAllSchemasLoaded", value: function() {
        } }, { key: "extendSchemas", value: function(e, t) {
          var i = this;
          e = v({}, e), t = v({}, t);
          var c = {}, d = function(g) {
            typeof g == "string" && (g = [g]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? c.type = g.filter(function(x) {
              return t.type.includes(x);
            }) : c.type = g, c.type.length === 1 && typeof c.type[0] == "string" ? c.type = c.type[0] : c.type.length === 0 && delete c.type;
          };
          return Object.entries(e).forEach(function(g) {
            var x = jn(g, 2), S = x[0], D = x[1];
            t[S] !== void 0 ? function($, G) {
              (function(te, pe) {
                return (te === "required" || te === "defaultProperties") && bt(pe) === "object" && Array.isArray(pe);
              })($, G) ? c[$] = G.concat(t[$]).reduce(function(te, pe) {
                return te.includes(pe) || te.push(pe), te;
              }, []) : $ !== "type" || typeof G != "string" && !Array.isArray(G) ? bt(G) !== "object" || Array.isArray(G) || G === null ? c[$] = G : c[$] = i.extendSchemas(G, t[$]) : d(G);
            }(S, D) : c[S] = D;
          }), Object.entries(t).forEach(function(g) {
            var x = jn(g, 2), S = x[0], D = x[1];
            e[S] === void 0 && (c[S] = D);
          }), c;
        } }, { key: "getCacheKey", value: function(e) {
          return ["je-cache", e].join("::");
        } }, { key: "getCacheBuster", value: function() {
          return this.options.ajax_cache_buster || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        } }, { key: "cacheSet", value: function(e, t) {
          try {
            window.localStorage.setItem(this.getCacheKey(e), JSON.stringify({ cacheBuster: this.getCacheBuster(), schema: t }));
          } catch (i) {
            console.error(i);
          }
        } }, { key: "cacheGet", value: function(e) {
          try {
            var t = window.localStorage.getItem(this.getCacheKey(e));
            if (t) {
              var i = JSON.parse(t);
              if (i.cacheBuster && i.schema && i.cacheBuster === this.getCacheBuster()) return i.schema;
              this.cacheDelete(e);
            }
          } catch (c) {
            console.error(c);
          }
        } }, { key: "cacheDelete", value: function(e) {
          window.localStorage.removeItem(this.getCacheKey(e));
        } }], r && Lp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r, n, l;
      }(), Ip = (b(2762), { default: function() {
        return { compile: function(o) {
          var r = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return o;
          };
          for (var l = [], e = function(i) {
            var c, d, g = r[i].replace(/[{}]+/g, "").trim().split("."), x = g.length;
            x > 1 ? c = function(S) {
              for (d = S, i = 0; i < x && (d = d[g[i]]); i++) ;
              return d;
            } : (g = g[0], c = function(S) {
              return S[g];
            }), l.push({ s: r[i], r: c });
          }, t = 0; t < n; t++) e(t);
          return function(i) {
            for (var c, d = "".concat(o), g = 0; g < n; g++) c = l[g], d = d.replace(c.s, c.r(i));
            return d;
          };
        } };
      }, ejs: function() {
        return !!window.EJS && { compile: function(o) {
          var r = new window.EJS({ text: o });
          return function(n) {
            return r.render(n);
          };
        } };
      }, handlebars: function() {
        return window.Handlebars;
      }, hogan: function() {
        return !!window.Hogan && { compile: function(o) {
          var r = window.Hogan.compile(o);
          return function(n) {
            return r.render(n);
          };
        } };
      }, lodash: function() {
        return !!window._ && { compile: function(o) {
          return function(r) {
            return window._.template(o)(r);
          };
        } };
      }, markup: function() {
        return !(!window.Mark || !window.Mark.up) && { compile: function(o) {
          return function(r) {
            return window.Mark.up(o, r);
          };
        } };
      }, mustache: function() {
        return !!window.Mustache && { compile: function(o) {
          return function(r) {
            return window.Mustache.render(o, r);
          };
        } };
      }, swig: function() {
        return window.swig;
      }, underscore: function() {
        return !!window._ && { compile: function(o) {
          return function(r) {
            return window._.template(o)(r);
          };
        } };
      } });
      function Ui(o) {
        return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ui(o);
      }
      function $s(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function Bp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Np(l.key), l);
        }
      }
      function Np(o) {
        var r = function(n, l) {
          if (Ui(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ui(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ui(r) == "symbol" ? r : r + "";
      }
      var Dp = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, xr = function() {
        return o = function n() {
          var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dp;
          (function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.mapping = e, this.icon_prefix = l;
        }, (r = [{ key: "getIconClass", value: function(n) {
          return this.mapping[n] ? this.icon_prefix + this.mapping[n] : this.icon_prefix + n;
        } }, { key: "getIcon", value: function(n) {
          var l, e = this.getIconClass(n);
          if (!e) return null;
          var t, i = document.createElement("i");
          return (l = i.classList).add.apply(l, function(c) {
            if (Array.isArray(c)) return $s(c);
          }(t = e.split(" ")) || function(c) {
            if (typeof Symbol < "u" && c[Symbol.iterator] != null || c["@@iterator"] != null) return Array.from(c);
          }(t) || function(c, d) {
            if (c) {
              if (typeof c == "string") return $s(c, d);
              var g = Object.prototype.toString.call(c).slice(8, -1);
              return g === "Object" && c.constructor && (g = c.constructor.name), g === "Map" || g === "Set" ? Array.from(c) : g === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g) ? $s(c, d) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && Bp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function Gs(o) {
        return Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gs(o);
      }
      function Fp(o, r, n) {
        return r = jo(r), function(l, e) {
          if (e && (Gs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, sc() ? Reflect.construct(r, n || [], jo(o).constructor) : r.apply(o, n));
      }
      function sc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (sc = function() {
          return !!o;
        })();
      }
      function jo(o) {
        return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jo(o);
      }
      function Ws(o, r) {
        return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ws(o, r);
      }
      var Mp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Hp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fp(this, r, ["glyphicon glyphicon-", Mp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ws(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Js(o) {
        return Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Js(o);
      }
      function Vp(o, r, n) {
        return r = ko(r), function(l, e) {
          if (e && (Js(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ac() ? Reflect.construct(r, n || [], ko(o).constructor) : r.apply(o, n));
      }
      function ac() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ac = function() {
          return !!o;
        })();
      }
      function ko(o) {
        return ko = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ko(o);
      }
      function Ks(o, r) {
        return Ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ks(o, r);
      }
      var zp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, qp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Vp(this, r, ["icon-", zp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ks(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Zs(o) {
        return Zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zs(o);
      }
      function Up(o, r, n) {
        return r = xo(r), function(l, e) {
          if (e && (Zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, lc() ? Reflect.construct(r, n || [], xo(o).constructor) : r.apply(o, n));
      }
      function lc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (lc = function() {
          return !!o;
        })();
      }
      function xo(o) {
        return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, xo(o);
      }
      function Ys(o, r) {
        return Ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ys(o, r);
      }
      var $p = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Gp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Up(this, r, ["fa fa-", $p]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ys(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Qs(o) {
        return Qs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qs(o);
      }
      function Wp(o, r, n) {
        return r = Oo(r), function(l, e) {
          if (e && (Qs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, cc() ? Reflect.construct(r, n || [], Oo(o).constructor) : r.apply(o, n));
      }
      function cc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (cc = function() {
          return !!o;
        })();
      }
      function Oo(o) {
        return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Oo(o);
      }
      function Xs(o, r) {
        return Xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Xs(o, r);
      }
      var Jp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, Kp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wp(this, r, ["fas fa-", Jp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Xs(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ea(o) {
        return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ea(o);
      }
      function Zp(o, r, n) {
        return r = Co(r), function(l, e) {
          if (e && (ea(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, uc() ? Reflect.construct(r, n || [], Co(o).constructor) : r.apply(o, n));
      }
      function uc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (uc = function() {
          return !!o;
        })();
      }
      function Co(o) {
        return Co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Co(o);
      }
      function ta(o, r) {
        return ta = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ta(o, r);
      }
      var Yp = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, Qp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zp(this, r, ["ui-icon ui-icon-", Yp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && ta(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ra(o) {
        return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ra(o);
      }
      function Xp(o, r, n) {
        return r = Eo(r), function(l, e) {
          if (e && (ra(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, dc() ? Reflect.construct(r, n || [], Eo(o).constructor) : r.apply(o, n));
      }
      function dc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (dc = function() {
          return !!o;
        })();
      }
      function Eo(o) {
        return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Eo(o);
      }
      function na(o, r) {
        return na = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, na(o, r);
      }
      var ef = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, tf = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Xp(this, r, ["oi oi-", ef]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && na(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ia(o) {
        return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ia(o);
      }
      function rf(o, r, n) {
        return r = So(r), function(l, e) {
          if (e && (ia(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, hc() ? Reflect.construct(r, n || [], So(o).constructor) : r.apply(o, n));
      }
      function hc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (hc = function() {
          return !!o;
        })();
      }
      function So(o) {
        return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, So(o);
      }
      function oa(o, r) {
        return oa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, oa(o, r);
      }
      var nf = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, of = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), rf(this, r, ["icon icon-", nf]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && oa(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function sa(o) {
        return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, sa(o);
      }
      function sf(o, r, n) {
        return r = Po(r), function(l, e) {
          if (e && (sa(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, pc() ? Reflect.construct(r, n || [], Po(o).constructor) : r.apply(o, n));
      }
      function pc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pc = function() {
          return !!o;
        })();
      }
      function Po(o) {
        return Po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Po(o);
      }
      function aa(o, r) {
        return aa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, aa(o, r);
      }
      var af = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, lf = { bootstrap: function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), sf(this, r, ["bi bi-", af]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && aa(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr), bootstrap3: Hp, fontawesome3: qp, fontawesome4: Gp, fontawesome5: Kp, jqueryui: Qp, openiconic: tf, spectre: of };
      function $i(o) {
        return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $i(o);
      }
      function cf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, uf(l.key), l);
        }
      }
      function uf(o) {
        var r = function(n, l) {
          if ($i(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($i(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return $i(r) == "symbol" ? r : r + "";
      }
      var fc = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
        return o in document.documentElement;
      }), Or = function() {
        return o = function n(l) {
          var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { disable_theme_rules: !1 };
          (function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = l, Object.keys(e).forEach(function(t) {
            l.options[t] !== void 0 && (e[t] = l.options[t]);
          }), this.options = e;
        }, r = [{ key: "getContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getOptInCheckbox", value: function(n) {
          var l = document.createElement("span"), e = this.getHiddenLabel(n + " opt-in");
          e.setAttribute("for", n + "-opt-in"), e.textContent = n + "-opt-in";
          var t = document.createElement("input");
          return t.setAttribute("type", "checkbox"), t.setAttribute("style", "margin: 0 10px 0 0;"), t.setAttribute("id", n + "-opt-in"), t.classList.add("json-editor-opt-in"), l.appendChild(t), l.appendChild(e), { label: e, checkbox: t, container: l };
        } }, { key: "getOptInSwitch", value: function(n) {
          return this.getOptInCheckbox();
        } }, { key: "getFloatRightLinkHolder", value: function() {
          var n = document.createElement("div");
          return n.classList.add("je-float-right-linkholder"), n;
        } }, { key: "getModal", value: function() {
          var n = document.createElement("div");
          return n.style.display = "none", n.classList.add("je-modal"), n;
        } }, { key: "getGridContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getGridRow", value: function() {
          var n = document.createElement("div");
          return n.classList.add("row"), n;
        } }, { key: "getGridColumn", value: function() {
          return document.createElement("div");
        } }, { key: "setGridColumnSize", value: function(n, l) {
        } }, { key: "getLink", value: function(n) {
          var l = document.createElement("a");
          return l.setAttribute("href", "#"), l.appendChild(document.createTextNode(n)), l;
        } }, { key: "disableHeader", value: function(n) {
          n.style.color = "#ccc";
        } }, { key: "disableLabel", value: function(n) {
          n.style.color = "#ccc";
        } }, { key: "enableHeader", value: function(n) {
          n.style.color = "";
        } }, { key: "enableLabel", value: function(n) {
          n.style.color = "";
        } }, { key: "getInfoButton", value: function(n) {
          var l = document.createElement("span");
          l.innerText = "ⓘ", l.classList.add("je-infobutton-icon");
          var e = document.createElement("span");
          return e.classList.add("je-infobutton-tooltip"), e.innerText = n, l.onmouseover = function() {
            e.style.visibility = "visible";
          }, l.onmouseleave = function() {
            e.style.visibility = "hidden";
          }, l.appendChild(e), l;
        } }, { key: "getFormInputLabel", value: function(n, l) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(n)), l && e.classList.add("required"), e;
        } }, { key: "getLabelLike", value: function(n, l) {
          var e = document.createElement("b");
          return e.appendChild(document.createTextNode(n)), l && e.classList.add("required"), e;
        } }, { key: "getHeader", value: function(n, l) {
          var e = document.createElement("span");
          return typeof n == "string" ? e.textContent = n : e.appendChild(n), e.classList.add("je-header"), e;
        } }, { key: "getCheckbox", value: function() {
          var n = this.getFormInputField("checkbox");
          return n.classList.add("je-checkbox"), n;
        } }, { key: "getCheckboxLabel", value: function(n, l) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(" ".concat(n))), l && e.classList.add("required"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(n, l, e, t) {
          var i = document.createElement("div");
          return i.classList.add("control-group"), l && (l.style.display = "block", i.appendChild(l), t && l.appendChild(t)), Object.values(n).forEach(function(c) {
            c.style.display = "inline-block", c.style.marginRight = "20px", i.appendChild(c);
          }), e && i.appendChild(e), i;
        } }, { key: "getFormCheckboxControl", value: function(n, l, e) {
          var t = document.createElement("div");
          return t.appendChild(n), l.style.width = "auto", n.insertBefore(l, n.firstChild), e && t.classList.add("je-checkbox-control--compact"), t;
        } }, { key: "getFormRadio", value: function(n) {
          var l = this.getFormInputField("radio");
          return Object.keys(n).forEach(function(e) {
            return l.setAttribute(e, n[e]);
          }), l.classList.add("je-radio"), l;
        } }, { key: "getFormRadioLabel", value: function(n, l) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(" ".concat(n))), l && e.classList.add("required"), e;
        } }, { key: "getFormRadioControl", value: function(n, l, e, t) {
          var i = document.createElement("div");
          return i.appendChild(n), l.style.width = "auto", n.insertBefore(l, n.firstChild), e && i.classList.add("je-radio-control--compact"), l.tagName.toLowerCase() !== "div" && t && n && l && (l.setAttribute("id", t), l.setAttribute("aria-labelledby", t), n.setAttribute("for", t)), i;
        } }, { key: "getSelectInput", value: function(n, l) {
          var e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], t = document.createElement("select");
          return n && this.setSelectOptions(t, n, [], e), t;
        } }, { key: "getSwitcher", value: function(n) {
          var l = this.getSelectInput(n, !1);
          return l.classList.add("je-switcher"), l;
        } }, { key: "getSwitcherOptions", value: function(n) {
          return n.getElementsByTagName("option");
        } }, { key: "setSwitcherOptions", value: function(n, l, e) {
          this.setSelectOptions(n, l, e);
        } }, { key: "setSelectOptions", value: function(n, l) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], t = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : " ";
          if (n.innerHTML = "", t) {
            var c = document.createElement("option");
            c.setAttribute("value", "_placeholder_"), c.textContent = i, c.setAttribute("disabled", ""), c.setAttribute("hidden", ""), n.appendChild(c);
          }
          for (var d = 0; d < l.length; d++) {
            var g = document.createElement("option");
            g.setAttribute("value", l[d]), g.textContent = e[d] || l[d], n.appendChild(g);
          }
        } }, { key: "getTextareaInput", value: function() {
          var n = document.createElement("textarea");
          return n.classList.add("je-textarea"), n;
        } }, { key: "getHiddenLabel", value: function(n) {
          var l = document.createElement("label");
          return l.textContent = n, l.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), l;
        } }, { key: "visuallyHidden", value: function(n) {
          n && n.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;");
        } }, { key: "getHiddenText", value: function(n) {
          var l = document.createElement("span");
          return l.textContent = n, l.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), l;
        } }, { key: "getRangeInput", value: function(n, l, e, t, i) {
          var c = this.getFormInputField("range");
          return c.setAttribute("min", n), c.setAttribute("max", l), c.setAttribute("step", e), t && (t.setAttribute("id", i + "-description"), c.setAttribute("aria-describedby", i + "-description")), c;
        } }, { key: "getStepperButtons", value: function(n) {
          var l = document.createElement("div"), e = document.createElement("button");
          e.setAttribute("type", "button"), e.classList.add("stepper-down");
          var t = document.createElement("button");
          t.setAttribute("type", "button"), t.classList.add("stepper-up"), n.getAttribute("readonly") && (e.setAttribute("disabled", !0), t.setAttribute("disabled", !0)), e.textContent = "-", t.textContent = "+";
          var i = function(g, x) {
            g.value = Number(x || g.value), g.setAttribute("initialized", "1");
          }, c = n.getAttribute("min"), d = n.getAttribute("max");
          return e.addEventListener("click", function() {
            n.getAttribute("initialized") ? c ? Number(n.value) > Number(c) && n.stepDown() : n.stepDown() : i(n, c), j(n, "change");
          }), t.addEventListener("click", function() {
            n.getAttribute("initialized") ? d ? Number(n.value) < Number(d) && n.stepUp() : n.stepUp() : i(n, c), j(n, "change");
          }), l.appendChild(e), l.appendChild(t), l;
        } }, { key: "getRangeOutput", value: function(n) {
          var l = document.createElement("output"), e = function(t) {
            l.value = t.currentTarget.value;
          };
          return n.addEventListener("change", e, !1), n.addEventListener("input", e, !1), l;
        } }, { key: "getRangeControl", value: function(n, l) {
          var e = document.createElement("div");
          return e.classList.add("je-range-control"), l && e.appendChild(l), e.appendChild(n), e;
        } }, { key: "getFormInputField", value: function(n) {
          var l = document.createElement("input");
          return l.setAttribute("type", n), l;
        } }, { key: "afterInputReady", value: function(n) {
        } }, { key: "getFormControl", value: function(n, l, e, t, i) {
          var c = document.createElement("div");
          return c.classList.add("form-control"), n && (c.appendChild(n), i && n.setAttribute("for", i)), l.type !== "checkbox" && l.type !== "radio" || !n ? (t && n && n.appendChild(t), c.appendChild(l)) : (l.style.width = "auto", n.insertBefore(l, n.firstChild), t && n.appendChild(t)), l.tagName.toLowerCase() !== "div" && l && n && i && (n.setAttribute("for", i), l.setAttribute("id", i)), l.tagName.toLowerCase() !== "div" && l && e && (e.setAttribute("id", i + "-description"), l.setAttribute("aria-describedby", i + "-description")), e && c.appendChild(e), c;
        } }, { key: "getIndentedPanel", value: function() {
          var n = document.createElement("div");
          return n.classList.add("je-indented-panel"), n;
        } }, { key: "getTopIndentedPanel", value: function() {
          var n = document.createElement("div");
          return n.classList.add("je-indented-panel--top"), n;
        } }, { key: "getChildEditorHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getDescription", value: function(n) {
          var l = document.createElement("p");
          return window.DOMPurify ? l.innerHTML = window.DOMPurify.sanitize(n) : l.textContent = this.cleanText(n), l;
        } }, { key: "getCheckboxDescription", value: function(n) {
          return this.getDescription(n);
        } }, { key: "getFormInputDescription", value: function(n) {
          return this.getDescription(n);
        } }, { key: "getButtonHolder", value: function() {
          return document.createElement("span");
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getFormButtonHolder", value: function(n) {
          return this.getButtonHolder();
        } }, { key: "getButton", value: function(n, l, e) {
          var t = document.createElement("button");
          return t.type = "button", this.setButtonText(t, n, l, e), t;
        } }, { key: "getFormButton", value: function(n, l, e) {
          return this.getButton(n, l, e);
        } }, { key: "setButtonText", value: function(n, l, e, t) {
          for (; n.firstChild; ) n.removeChild(n.firstChild);
          if (e && (n.appendChild(e), l = " ".concat(l)), !this.jsoneditor.options.iconlib || !this.jsoneditor.options.remove_button_labels || !e) {
            var i = document.createElement("span");
            i.appendChild(document.createTextNode(l)), n.appendChild(i);
          }
          t && n.setAttribute("title", t);
        } }, { key: "getTableContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getTable", value: function() {
          return document.createElement("table");
        } }, { key: "getTableRow", value: function() {
          return document.createElement("tr");
        } }, { key: "getTableHead", value: function() {
          return document.createElement("thead");
        } }, { key: "getTableBody", value: function() {
          return document.createElement("tbody");
        } }, { key: "getTableHeaderCell", value: function(n) {
          var l = document.createElement("th");
          return l.textContent = n, l;
        } }, { key: "getTableCell", value: function() {
          return document.createElement("td");
        } }, { key: "getErrorMessage", value: function(n) {
          var l = document.createElement("p");
          return l.style = l.style || {}, l.style.color = "red", l.appendChild(document.createTextNode(n)), l;
        } }, { key: "addInputError", value: function(n, l) {
          n.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(n) {
        } }, { key: "addTableRowError", value: function(n) {
        } }, { key: "removeTableRowError", value: function(n) {
        } }, { key: "getTabHolder", value: function(n) {
          var l = n === void 0 ? "" : n, e = document.createElement("div");
          return e.innerHTML = "<div class='je-tabholder tabs'></div><div class='content' id='".concat(l, "'></div><div class='je-tabholder--clear'></div>"), e;
        } }, { key: "getTopTabHolder", value: function(n) {
          var l = n === void 0 ? "" : n, e = document.createElement("div");
          return e.innerHTML = "<div class='tabs je-tabholder--top'></div><div class='je-tabholder--clear'></div><div class='content' id='".concat(l, "'></div>"), e;
        } }, { key: "applyStyles", value: function(n, l) {
          Object.keys(l).forEach(function(e) {
            return n.style[e] = l[e];
          });
        } }, { key: "closest", value: function(n, l) {
          for (; n && n !== document; ) {
            if (!n[fc]) return !1;
            if (n[fc](l)) return n;
            n = n.parentNode;
          }
          return !1;
        } }, { key: "insertBasicTopTab", value: function(n, l) {
          l.firstChild.insertBefore(n, l.firstChild.firstChild);
        } }, { key: "getTab", value: function(n, l) {
          var e = document.createElement("div");
          return e.appendChild(n), e.id = l, e.classList.add("je-tab"), e;
        } }, { key: "getTopTab", value: function(n, l) {
          var e = document.createElement("div");
          return e.appendChild(n), e.id = l, e.classList.add("je-tab--top"), e;
        } }, { key: "getTabContentHolder", value: function(n) {
          return n.children[1];
        } }, { key: "getTopTabContentHolder", value: function(n) {
          return n.children[1];
        } }, { key: "getTabContent", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getTopTabContent", value: function() {
          return this.getTopIndentedPanel();
        } }, { key: "markTabActive", value: function(n) {
          this.applyStyles(n.tab, { opacity: 1, background: "white" }), n.rowPane !== void 0 ? n.rowPane.style.display = "" : n.container.style.display = "";
        } }, { key: "markTabInactive", value: function(n) {
          this.applyStyles(n.tab, { opacity: 0.5, background: "" }), n.rowPane !== void 0 ? n.rowPane.style.display = "none" : n.container.style.display = "none";
        } }, { key: "addTab", value: function(n, l) {
          n.children[0].appendChild(l);
        } }, { key: "addTopTab", value: function(n, l) {
          n.children[0].appendChild(l);
        } }, { key: "getBlockLink", value: function() {
          var n = document.createElement("a");
          return n.classList.add("je-block-link"), n;
        } }, { key: "getBlockLinkHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "createMediaLink", value: function(n, l, e) {
          n.appendChild(l), e.classList.add("je-media"), n.appendChild(e);
        } }, { key: "createImageLink", value: function(n, l, e) {
          n.appendChild(l), l.appendChild(e);
        } }, { key: "getFirstTab", value: function(n) {
          return n.firstChild.firstChild;
        } }, { key: "getInputGroup", value: function(n, l) {
        } }, { key: "cleanText", value: function(n) {
          var l = document.createElement("div");
          return l.innerHTML = n, l.textContent || l.innerText;
        } }, { key: "getDropZone", value: function(n) {
          var l = document.createElement("div");
          return l.setAttribute("data-text", n), l.classList.add("je-dropzone"), l;
        } }, { key: "getUploadPreview", value: function(n, l, e) {
          var t = document.createElement("div");
          if (t.classList.add("je-upload-preview"), n.mimeType.substr(0, 5) === "image") {
            var i = document.createElement("img");
            i.src = e, t.appendChild(i);
          }
          var c = document.createElement("div");
          c.innerHTML += "<strong>Name:</strong> ".concat(n.name, "<br><strong>Type:</strong> ").concat(n.type, "<br><strong>Size:</strong> ").concat(n.formattedSize), t.appendChild(c), t.appendChild(l);
          var d = document.createElement("div");
          return d.style.clear = "left", t.appendChild(d), t;
        } }, { key: "getProgressBar", value: function() {
          var n = document.createElement("progress");
          return n.setAttribute("max", 100), n.setAttribute("value", 0), n;
        } }, { key: "updateProgressBar", value: function(n, l) {
          n && n.setAttribute("value", l);
        } }, { key: "updateProgressBarUnknown", value: function(n) {
          n && n.removeAttribute("value");
        } }], r && cf(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function bi(o) {
        return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bi(o);
      }
      function df(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, hf(l.key), l);
        }
      }
      function hf(o) {
        var r = function(n, l) {
          if (bi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (bi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return bi(r) == "symbol" ? r : r + "";
      }
      function pf(o, r, n) {
        return r = lr(r), function(l, e) {
          if (e && (bi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, yc() ? Reflect.construct(r, n || [], lr(o).constructor) : r.apply(o, n));
      }
      function yc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yc = function() {
          return !!o;
        })();
      }
      function kn() {
        return kn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = lr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, kn.apply(this, arguments);
      }
      function lr(o) {
        return lr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lr(o);
      }
      function la(o, r) {
        return la = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, la(o, r);
      }
      var mc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), pf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && la(e, t);
        }(r, o), n = r, (l = [{ key: "getFormInputLabel", value: function(e, t) {
          var i = kn(lr(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = kn(lr(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-form-input-label"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var e = kn(lr(r.prototype), "getIndentedPanel", this).call(this);
          return e.classList.add("je-indented-panel"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var e = kn(lr(r.prototype), "getChildEditorHolder", this).call(this);
          return e.classList.add("je-child-editor-holder"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("je-header-button-holder"), e;
        } }, { key: "getTable", value: function() {
          var e = kn(lr(r.prototype), "getTable", this).call(this);
          return e.classList.add("je-table"), e;
        } }, { key: "addInputError", value: function(e, t) {
          var i = this.closest(e, ".form-control") || e.controlgroup;
          e.errmsg ? e.errmsg.style.display = "block" : (e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), e.errmsg.style = e.errmsg.style || {}, e.errmsg.style.color = "red", i.appendChild(e.errmsg)), e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && df(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function vi(o) {
        return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vi(o);
      }
      function ff(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, yf(l.key), l);
        }
      }
      function yf(o) {
        var r = function(n, l) {
          if (vi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (vi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return vi(r) == "symbol" ? r : r + "";
      }
      function mf(o, r, n) {
        return r = cr(r), function(l, e) {
          if (e && (vi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, bc() ? Reflect.construct(r, n || [], cr(o).constructor) : r.apply(o, n));
      }
      function bc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (bc = function() {
          return !!o;
        })();
      }
      function xn() {
        return xn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = cr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, xn.apply(this, arguments);
      }
      function cr(o) {
        return cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, cr(o);
      }
      function ca(o, r) {
        return ca = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ca(o, r);
      }
      mc.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var vc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ca(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = xn(cr(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i;
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("col-md-offset-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, c, d) {
          return xn(cr(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
        } }, { key: "getFormInputField", value: function(e) {
          var t = xn(cr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && t.classList.add("form-control"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var g = document.createElement("div");
          return !e || t.type !== "checkbox" && t.type !== "radio" ? (g.classList.add("form-group"), e && (e.classList.add("control-label"), g.appendChild(e), c && e.appendChild(c)), g.appendChild(t)) : (g.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), g.appendChild(e)), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), g;
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("well", "well-sm"), e.style.paddingBottom = 0, e;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("glyphicon", "glyphicon-info-sign", "pull-right"), t.style.padding = ".25rem", t.style.position = "relative", t.style.display = "inline-block";
          var i = document.createElement("span");
          return i.style["font-family"] = "sans-serif", i.style.visibility = "hidden", i.style["background-color"] = "rgba(50, 50, 50, .75)", i.style.margin = "0 .25rem", i.style.color = "#FAFAFA", i.style.padding = ".5rem 1rem", i.style["border-radius"] = ".25rem", i.style.width = "25rem", i.style.position = "absolute", i.innerText = e, t.onmouseover = function() {
            i.style.visibility = "visible";
          }, t.onmouseleave = function() {
            i.style.visibility = "hidden";
          }, t.appendChild(i), t;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("p");
          return t.classList.add("help-block"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getHeaderContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return i.classList.add("h3"), typeof e == "string" ? i.textContent = e : i.appendChild(e), i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e;
        } }, { key: "getButtonHolder", value: function() {
          var e = document.createElement("span");
          return e.classList.add("btn-group"), e;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = xn(cr(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-default"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = xn(cr(r.prototype), "getTableContainer", this).call(this);
          return e.classList.add("table-responsive"), e;
        } }, { key: "getTable", value: function() {
          var e = document.createElement("table");
          return e.classList.add("table", "table-bordered"), e.style.width = "auto", e.style.maxWidth = "none", e;
        } }, { key: "addInputError", value: function(e, t) {
          e.controlgroup && (e.controlgroup.classList.add("has-error"), e.errmsg ? e.errmsg.style.display = "" : (e.errmsg = document.createElement("p"), e.errmsg.classList.add("help-block", "errormsg"), e.controlgroup.appendChild(e.errmsg)), e.errmsg.textContent = t, e.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(e) {
          e.errmsg && (e.errmsg.style.display = "none", e.controlgroup.classList.remove("has-error"));
        } }, { key: "getTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.innerHTML = "<ul class='col-md-2 nav nav-pills nav-stacked' id='".concat(t, "' role='tablist'></ul><div class='col-md-10 tab-content active well well-small'  id='").concat(t, "'></div>"), i;
        } }, { key: "getTopTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.innerHTML = "<ul class='nav nav-tabs' id='".concat(t, "' role='tablist'></ul><div class='tab-content active well well-small'  id='").concat(t, "'></div>"), i;
        } }, { key: "getTab", value: function(e, t) {
          var i = document.createElement("li");
          i.setAttribute("role", "presentation");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(t)), c.appendChild(e), c.setAttribute("aria-controls", t), c.setAttribute("role", "tab"), c.setAttribute("data-toggle", "tab"), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.setAttribute("role", "presentation");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(t)), c.appendChild(e), c.setAttribute("aria-controls", t), c.setAttribute("role", "tab"), c.setAttribute("data-toggle", "tab"), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "getTopTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.classList.add("active"), e.rowPane !== void 0 ? e.rowPane.classList.add("active") : e.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.classList.remove("active"), e.rowPane !== void 0 ? e.rowPane.classList.remove("active") : e.container.classList.remove("active");
        } }, { key: "getProgressBar", value: function() {
          var e = document.createElement("div");
          e.classList.add("progress");
          var t = document.createElement("div");
          return t.classList.add("progress-bar"), t.setAttribute("role", "progressbar"), t.setAttribute("aria-valuenow", 0), t.setAttribute("aria-valuemin", 0), t.setAttribute("aria-valuenax", 100), t.innerHTML = "".concat(0, "%"), e.appendChild(t), e;
        } }, { key: "updateProgressBar", value: function(e, t) {
          if (e) {
            var i = e.firstChild, c = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(e) {
          if (e) {
            var t = e.firstChild;
            e.classList.add("progress", "progress-striped", "active"), t.removeAttribute("aria-valuenow"), t.style.width = "100%", t.innerHTML = "";
          }
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(e);
            var c = document.createElement("div");
            c.classList.add("input-group-btn"), i.appendChild(c);
            for (var d = 0; d < t.length; d++) c.appendChild(t[d]);
            return i;
          }
        } }]) && ff(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function gi(o) {
        return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, gi(o);
      }
      function bf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, vf(l.key), l);
        }
      }
      function vf(o) {
        var r = function(n, l) {
          if (gi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (gi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return gi(r) == "symbol" ? r : r + "";
      }
      function gf(o, r, n) {
        return r = ur(r), function(l, e) {
          if (e && (gi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, gc() ? Reflect.construct(r, n || [], ur(o).constructor) : r.apply(o, n));
      }
      function gc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (gc = function() {
          return !!o;
        })();
      }
      function On() {
        return On = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ur(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, On.apply(this, arguments);
      }
      function ur(o) {
        return ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ur(o);
      }
      function ua(o, r) {
        return ua = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ua(o, r);
      }
      vc.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var _f = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, _c = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gf(this, r, [e, _f]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ua(e, t);
        }(r, o), n = r, (l = [{ key: "getSelectInput", value: function(e, t) {
          var i = On(ur(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), this.options.custom_forms === !1 ? (this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg")) : (i.classList.remove("form-control"), i.classList.add("custom-select"), this.options.input_size === "small" && i.classList.add("custom-select-sm"), this.options.input_size === "large" && i.classList.add("custom-select-lg")), i;
        } }, { key: "getContainer", value: function() {
          var e = document.createElement("div");
          return this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("custom-control", "custom-switch", "d-inline-block", "fs-6");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("custom-control-input", "json-editor-opt-in");
          var d = document.createElement("label");
          d.setAttribute("for", e + "-opt-in"), d.classList.add("custom-control-label");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", d.appendChild(g), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("offset-md-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          if (!e.controlgroup) {
            var t = e.name;
            e.id = t;
            var i = e.parentNode.parentNode.getElementsByTagName("label")[0];
            i && (i.htmlFor = t), e.controlgroup = this.closest(e, ".form-group");
          }
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), this.options.input_size === "small" && e.classList.add("form-control-sm"), this.options.input_size === "large" && e.classList.add("form-control-lg"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, c, d) {
          var g = On(ur(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return this.options.custom_forms === !0 && (g.classList.remove("form-control"), g.classList.add("custom-range")), g;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), c = document.createElement("div"), d = document.createElement("button");
          d.setAttribute("type", "button");
          var g = document.createElement("button");
          g.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), i.appendChild(d), c.appendChild(g), t.classList.add("input-group"), i.classList.add("input-group-prepend"), c.classList.add("input-group-append"), d.classList.add("btn"), d.classList.add("btn-secondary"), d.classList.add("stepper-down"), g.classList.add("btn"), g.classList.add("btn-secondary"), g.classList.add("stepper-up"), e.getAttribute("readonly") && (d.setAttribute("disabled", !0), g.setAttribute("disabled", !0)), d.textContent = "-", g.textContent = "+";
          var x = function($, G) {
            $.value = Number(G || $.value), $.setAttribute("initialized", "1");
          }, S = e.getAttribute("min"), D = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), d.addEventListener("click", function() {
            e.getAttribute("initialized") ? S ? Number(e.value) > Number(S) && e.stepDown() : e.stepDown() : x(e, S), j(e, "change");
          }), g.addEventListener("click", function() {
            e.getAttribute("initialized") ? D ? Number(e.value) < Number(D) && e.stepUp() : e.stepUp() : x(e, S), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = On(ur(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && e !== "file" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), e === "file" && t.classList.add("form-control-file"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var g = document.createElement("div");
          if (g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (g.appendChild(e), c && g.appendChild(c)), g.appendChild(t);
          else {
            var x = document.createElement("div");
            this.options.custom_forms === !1 ? (x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (x.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? x.classList.add("custom-checkbox") : x.classList.add("custom-radio")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), g.appendChild(x);
          }
          return i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), g;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("button");
          t.type = "button", t.classList.add("ml-3", "jsoneditor-twbs4-text-button"), t.setAttribute("data-toggle", "tooltip"), t.setAttribute("data-placement", "auto"), t.title = e;
          var i = document.createTextNode("ⓘ");
          return t.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(t).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && t.classList.add("je-tooltip"), t;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, c) {
          var d = document.createElement("div");
          d.classList.add("form-group"), t && (d.appendChild(t), c && t.appendChild(c));
          var g = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            g.appendChild(S);
          }), d.appendChild(g), i && d.appendChild(i), d;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return this.options.custom_forms === !1 ? t.classList.add("form-check-input") : t.classList.add("custom-control-input"), t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = document.createElement("label");
          return this.options.custom_forms === !1 ? i.classList.add("form-check-label") : i.classList.add("custom-control-label"), i.appendChild(document.createTextNode(e)), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          var c = document.createElement("div");
          return this.options.custom_forms === !1 ? c.classList.add("form-check") : c.classList.add("custom-control", "custom-radio"), c.appendChild(t), c.appendChild(e), i && (this.options.custom_forms === !1 ? c.classList.add("form-check-inline") : c.classList.add("custom-control-inline")), c;
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("card", "card-body", "mb-3"), this.options.object_background && e.classList.add(this.options.object_background), this.options.object_text && e.classList.add(this.options.object_text), e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("small");
          return t.classList.add("form-text"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return i.classList.add("h3"), i.classList.add("card-title"), i.classList.add("level-" + t), typeof e == "string" ? i.textContent = e : i.appendChild(e), i.style.display = "inline-block", i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var e = document.createElement("span");
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = this.getButtonHolder();
          return t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" && t.classList.add("text-right"), t;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = On(ur(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = On(ur(r.prototype), "getTableContainer", this).call(this);
          return e.classList.add("table-responsive"), e;
        } }, { key: "getTable", value: function() {
          var e = document.createElement("table");
          return e.classList.add("table", "table-sm"), this.options.table_border && e.classList.add("table-bordered"), this.options.table_zebrastyle && e.classList.add("table-striped"), e;
        } }, { key: "getErrorMessage", value: function(e) {
          var t = document.createElement("div");
          return t.classList.add("alert", "alert-danger"), t.setAttribute("role", "alert"), t.appendChild(document.createTextNode(e)), t;
        } }, { key: "addInputError", value: function(e, t) {
          e.controlgroup && (e.controlgroup.classList.add("is-invalid"), e.errmsg || (e.errmsg = document.createElement("p"), e.errmsg.classList.add("invalid-feedback"), e.controlgroup.appendChild(e.errmsg), e.errmsg.style.display = "block"), e.errmsg.style.display = "block", e.errmsg.textContent = t, e.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(e) {
          e.errmsg && (e.errmsg.style.display = "none", e.controlgroup.classList.remove("is-invalid"));
        } }, { key: "getTabHolder", value: function(e) {
          var t = document.createElement("div"), i = e === void 0 ? "" : e;
          return t.innerHTML = "<div class='col-md-2' id='".concat(i, "'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='").concat(i, "'></div></div>"), t.classList.add("row"), t;
        } }, { key: "addTab", value: function(e, t) {
          e.children[0].children[0].appendChild(t);
        } }, { key: "getTabContentHolder", value: function(e) {
          return e.children[1].children[0];
        } }, { key: "getTopTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.classList.add("card"), i.innerHTML = "<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='".concat(t, "'></ul></div><div class='card-body'><div class='tab-content' id='").concat(t, "'></div></div>"), i;
        } }, { key: "getTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "getTopTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.firstChild.classList.add("active"), e.rowPane !== void 0 ? e.rowPane.classList.add("active") : e.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.firstChild.classList.remove("active"), e.rowPane !== void 0 ? e.rowPane.classList.remove("active") : e.container.classList.remove("active");
        } }, { key: "insertBasicTopTab", value: function(e, t) {
          t.children[0].children[0].insertBefore(e, t.children[0].children[0].firstChild);
        } }, { key: "addTopTab", value: function(e, t) {
          e.children[0].children[0].appendChild(t);
        } }, { key: "getTopTabContentHolder", value: function(e) {
          return e.children[1].children[0];
        } }, { key: "getFirstTab", value: function(e) {
          return e.firstChild.firstChild.firstChild;
        } }, { key: "getProgressBar", value: function() {
          var e = document.createElement("div");
          e.classList.add("progress");
          var t = document.createElement("div");
          return t.classList.add("progress-bar"), t.setAttribute("role", "progressbar"), t.setAttribute("aria-valuenow", 0), t.setAttribute("aria-valuemin", 0), t.setAttribute("aria-valuenax", 100), t.innerHTML = "".concat(0, "%"), e.appendChild(t), e;
        } }, { key: "updateProgressBar", value: function(e, t) {
          if (e) {
            var i = e.firstChild, c = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(e) {
          if (e) {
            var t = e.firstChild;
            e.classList.add("progress", "progress-striped", "active"), t.removeAttribute("aria-valuenow"), t.style.width = "100%", t.innerHTML = "";
          }
        } }, { key: "getBlockLink", value: function() {
          var e = document.createElement("a");
          return e.classList.add("mb-3", "d-inline-block"), e;
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(e);
            var c = document.createElement("div");
            c.classList.add("input-group-append"), i.appendChild(c);
            for (var d = 0; d < t.length; d++) t[d].classList.remove("mr-2", "btn-secondary"), t[d].classList.add("btn-outline-secondary"), c.appendChild(t[d]);
            return i;
          }
        } }]) && bf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function _i(o) {
        return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _i(o);
      }
      function wf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, jf(l.key), l);
        }
      }
      function jf(o) {
        var r = function(n, l) {
          if (_i(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (_i(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return _i(r) == "symbol" ? r : r + "";
      }
      function kf(o, r, n) {
        return r = dr(r), function(l, e) {
          if (e && (_i(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, wc() ? Reflect.construct(r, n || [], dr(o).constructor) : r.apply(o, n));
      }
      function wc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wc = function() {
          return !!o;
        })();
      }
      function Cn() {
        return Cn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = dr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Cn.apply(this, arguments);
      }
      function dr(o) {
        return dr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, dr(o);
      }
      function da(o, r) {
        return da = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, da(o, r);
      }
      _c.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var xf = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, jc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kf(this, r, [e, xf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && da(e, t);
        }(r, o), n = r, (l = [{ key: "getSelectInput", value: function(e, t) {
          var i = Cn(dr(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i.classList.add("form-select"), this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg"), i;
        } }, { key: "getContainer", value: function() {
          var e = document.createElement("div");
          return this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("form-check", "form-switch", "d-inline-block", "fs-6");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("role", "switch"), c.setAttribute("id", e + "-opt-in"), c.classList.add("form-check-input", "json-editor-opt-in");
          var d = document.createElement("label");
          d.setAttribute("for", e + "-opt-in"), d.classList.add("form-check-label");
          var g = document.createElement("span");
          return g.classList.add("visually-hidden"), g.textContent = e + "-opt-in", d.appendChild(g), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("offset-md-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          if (!e.controlgroup) {
            var t = e.name;
            e.id = t;
            var i = e.parentNode.parentNode.getElementsByTagName("label")[0];
            i && (i.classList.add("form-label"), i.htmlFor = t), e.controlgroup = this.closest(e, ".form-group");
          }
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), this.options.input_size === "small" && e.classList.add("form-control-sm"), this.options.input_size === "large" && e.classList.add("form-control-lg"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, c, d) {
          var g = Cn(dr(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return g.classList.remove("form-control"), g.classList.add("form-range"), g;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var c = document.createElement("button");
          c.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), c.classList.add("btn"), c.classList.add("btn-secondary"), c.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), c.setAttribute("disabled", !0)), i.textContent = "-", c.textContent = "+";
          var d = function(S, D) {
            S.value = Number(D || S.value), S.setAttribute("initialized", "1");
          }, g = e.getAttribute("min"), x = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? g ? Number(e.value) > Number(g) && e.stepDown() : e.stepDown() : d(e, g), j(e, "change");
          }), c.addEventListener("click", function() {
            e.getAttribute("initialized") ? x ? Number(e.value) < Number(x) && e.stepUp() : e.stepUp() : d(e, g), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = Cn(dr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var g = document.createElement("div");
          if (g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), g.appendChild(e), c && g.appendChild(c)), g.appendChild(t);
          else {
            var x = document.createElement("div");
            x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), g.appendChild(x);
          }
          return i && g.appendChild(i), g;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("visually-hidden"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("visually-hidden");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("button");
          t.type = "button", t.classList.add("ms-3", "jsoneditor-twbs5-text-button"), t.setAttribute("data-toggle", "tooltip"), t.setAttribute("data-placement", "auto"), t.title = e;
          var i = document.createTextNode("ⓘ");
          return t.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(t).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && t.classList.add("je-tooltip"), t;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, c) {
          var d = document.createElement("div");
          d.classList.add("form-group"), t && (d.appendChild(t), c && t.appendChild(c));
          var g = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            g.appendChild(S);
          }), d.appendChild(g), i && d.appendChild(i), d;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t.classList.add("form-check-input"), t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = document.createElement("label");
          return i.classList.add("form-check-label"), i.appendChild(document.createTextNode(e)), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          var c = document.createElement("div");
          return c.classList.add("form-check"), c.appendChild(t), c.appendChild(e), i && c.classList.add("form-check-inline"), c;
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("card", "card-body", "my-3"), this.options.object_background && e.classList.add(this.options.object_background), this.options.object_text && e.classList.add(this.options.object_text), e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("small");
          return t.classList.add("form-text"), t.classList.add("d-block"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return i.classList.add("h3"), i.classList.add("card-title"), i.classList.add("level-" + t), typeof e == "string" ? i.textContent = e : i.appendChild(e), i.style.display = "inline-block", i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var e = document.createElement("span");
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = this.getButtonHolder();
          return t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" && t.classList.add("text-end"), t;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = Cn(dr(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = Cn(dr(r.prototype), "getTableContainer", this).call(this);
          return e.classList.add("table-responsive"), e;
        } }, { key: "getTable", value: function() {
          var e = document.createElement("table");
          return e.classList.add("table", "table-sm"), this.options.table_border && e.classList.add("table-bordered"), this.options.table_zebrastyle && e.classList.add("table-striped"), e;
        } }, { key: "getErrorMessage", value: function(e) {
          var t = document.createElement("div");
          return t.classList.add("alert", "alert-danger"), t.setAttribute("role", "alert"), t.appendChild(document.createTextNode(e)), t;
        } }, { key: "addInputError", value: function(e, t) {
          e.controlgroup && (e.controlgroup.classList.add("is-invalid"), e.errmsg || (e.errmsg = document.createElement("p"), e.errmsg.classList.add("invalid-feedback"), e.controlgroup.appendChild(e.errmsg), e.errmsg.style.display = "block"), e.errmsg.style.display = "block", e.errmsg.textContent = t, e.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(e) {
          e.errmsg && (e.errmsg.style.display = "none", e.controlgroup.classList.remove("is-invalid"));
        } }, { key: "getTabHolder", value: function(e) {
          var t = document.createElement("div"), i = e === void 0 ? "" : e;
          return t.innerHTML = "<div class='col-md-2' id='".concat(i, "'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='").concat(i, "'></div></div>"), t.classList.add("row"), t;
        } }, { key: "addTab", value: function(e, t) {
          e.children[0].children[0].appendChild(t);
        } }, { key: "getTabContentHolder", value: function(e) {
          return e.children[1].children[0];
        } }, { key: "getTopTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.classList.add("card"), i.innerHTML = "<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='".concat(t, "'></ul></div><div class='card-body'><div class='tab-content' id='").concat(t, "'></div></div>"), i;
        } }, { key: "getTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "getTopTabContent", value: function() {
          var e = document.createElement("div");
          return e.classList.add("tab-pane"), e.setAttribute("role", "tabpanel"), e;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.firstChild.classList.add("active"), e.rowPane !== void 0 ? e.rowPane.classList.add("active") : e.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.firstChild.classList.remove("active"), e.rowPane !== void 0 ? e.rowPane.classList.remove("active") : e.container.classList.remove("active");
        } }, { key: "insertBasicTopTab", value: function(e, t) {
          t.children[0].children[0].insertBefore(e, t.children[0].children[0].firstChild);
        } }, { key: "addTopTab", value: function(e, t) {
          e.children[0].children[0].appendChild(t);
        } }, { key: "getTopTabContentHolder", value: function(e) {
          return e.children[1].children[0];
        } }, { key: "getFirstTab", value: function(e) {
          return e.firstChild.firstChild.firstChild;
        } }, { key: "getProgressBar", value: function() {
          var e = document.createElement("div");
          e.classList.add("progress");
          var t = document.createElement("div");
          return t.classList.add("progress-bar"), t.setAttribute("role", "progressbar"), t.setAttribute("aria-valuenow", 0), t.setAttribute("aria-valuemin", 0), t.setAttribute("aria-valuenax", 100), t.innerHTML = "".concat(0, "%"), e.appendChild(t), e;
        } }, { key: "updateProgressBar", value: function(e, t) {
          if (e) {
            var i = e.firstChild, c = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(e) {
          if (e) {
            var t = e.firstChild;
            e.classList.add("progress", "progress-striped", "active"), t.removeAttribute("aria-valuenow"), t.style.width = "100%", t.innerHTML = "";
          }
        } }, { key: "getBlockLink", value: function() {
          var e = document.createElement("a");
          return e.classList.add("mb-3", "d-inline-block"), e;
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(e);
            for (var c = 0; c < t.length; c++) t[c].classList.remove("me-2", "btn-secondary"), t[c].classList.add("btn-outline-secondary"), i.appendChild(t[c]);
            return i;
          }
        } }]) && wf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function wi(o) {
        return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, wi(o);
      }
      function Of(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Cf(l.key), l);
        }
      }
      function Cf(o) {
        var r = function(n, l) {
          if (wi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (wi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return wi(r) == "symbol" ? r : r + "";
      }
      function Ef(o, r, n) {
        return r = Cr(r), function(l, e) {
          if (e && (wi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, kc() ? Reflect.construct(r, n || [], Cr(o).constructor) : r.apply(o, n));
      }
      function kc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (kc = function() {
          return !!o;
        })();
      }
      function ji() {
        return ji = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Cr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ji.apply(this, arguments);
      }
      function Cr(o) {
        return Cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Cr(o);
      }
      function ha(o, r) {
        return ha = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ha(o, r);
      }
      jc.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var xc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ef(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ha(e, t);
        }(r, o), n = r, (l = [{ key: "getTable", value: function() {
          var e = ji(Cr(r.prototype), "getTable", this).call(this);
          return e.setAttribute("cellpadding", 5), e.setAttribute("cellspacing", 0), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = ji(Cr(r.prototype), "getTableHeaderCell", this).call(this, e);
          return t.classList.add("ui-state-active"), t.style.fontWeight = "bold", t;
        } }, { key: "getTableCell", value: function() {
          var e = ji(Cr(r.prototype), "getTableCell", this).call(this);
          return e.classList.add("ui-widget-content"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e.style.fontSize = ".6em", e.style.display = "inline-block", e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = this.getDescription(e);
          return t.style.marginLeft = "10px", t.style.display = "inline-block", t;
        } }, { key: "getFormControl", value: function(e, t, i, c) {
          var d = ji(Cr(r.prototype), "getFormControl", this).call(this, e, t, i, c);
          return t.type === "checkbox" ? (d.style.lineHeight = "25px", d.style.padding = "3px 0") : d.style.padding = "4px 0 8px 0", d;
        } }, { key: "getDescription", value: function(e) {
          var t = document.createElement("span");
          return t.style.fontSize = ".8em", t.style.fontStyle = "italic", window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getButtonHolder", value: function() {
          var e = document.createElement("div");
          return e.classList.add("ui-buttonset"), e.style.fontSize = ".7em", e;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = document.createElement("label");
          return i.style.fontWeight = "bold", i.style.display = "block", i.textContent = e, t && i.classList.add("required"), i;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = document.createElement("button");
          c.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), t && !e ? (c.classList.add("ui-button-icon-only"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(t)) : t ? (c.classList.add("ui-button-text-icon-primary"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(t)) : c.classList.add("ui-button-text-only");
          var d = document.createElement("span");
          return d.classList.add("ui-button-text"), d.textContent = e || i || ".", c.appendChild(d), c.setAttribute("title", i), c;
        } }, { key: "setButtonText", value: function(e, t, i, c) {
          e.innerHTML = "", e.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !t ? (e.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : i ? (e.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : e.classList.add("ui-button-text-only");
          var d = document.createElement("span");
          d.classList.add("ui-button-text"), d.textContent = t || c || ".", e.appendChild(d), e.setAttribute("title", c);
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("ui-widget-content", "ui-corner-all"), e.style.padding = "1em 1.4em", e.style.marginBottom = "20px", e;
        } }, { key: "afterInputReady", value: function(e) {
          if (!e.controls && (e.controls = this.closest(e, ".form-control"), this.queuedInputErrorText)) {
            var t = this.queuedInputErrorText;
            delete this.queuedInputErrorText, this.addInputError(e, t);
          }
        } }, { key: "addInputError", value: function(e, t) {
          e.controls ? (e.errmsg ? e.errmsg.style.display = "" : (e.errmsg = document.createElement("div"), e.errmsg.classList.add("ui-state-error"), e.controls.appendChild(e.errmsg)), e.errmsg.textContent = t) : this.queuedInputErrorText = t;
        } }, { key: "removeInputError", value: function(e) {
          e.controls || delete this.queuedInputErrorText, e.errmsg && (e.errmsg.style.display = "none");
        } }, { key: "markTabActive", value: function(e) {
          e.tab.classList.remove("ui-widget-header"), e.tab.classList.add("ui-state-active"), e.rowPane !== void 0 ? e.rowPane.style.display = "" : e.container.style.display = "";
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.classList.add("ui-widget-header"), e.tab.classList.remove("ui-state-active"), e.rowPane !== void 0 ? e.rowPane.style.display = "none" : e.container.style.display = "none";
        } }]) && Of(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function ki(o) {
        return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ki(o);
      }
      function Sf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Pf(l.key), l);
        }
      }
      function Pf(o) {
        var r = function(n, l) {
          if (ki(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ki(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ki(r) == "symbol" ? r : r + "";
      }
      function Tf(o, r, n) {
        return r = To(r), function(l, e) {
          if (e && (ki(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Oc() ? Reflect.construct(r, n || [], To(o).constructor) : r.apply(o, n));
      }
      function Oc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Oc = function() {
          return !!o;
        })();
      }
      function To(o) {
        return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, To(o);
      }
      function pa(o, r) {
        return pa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, pa(o, r);
      }
      xc.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var Cc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Tf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && pa(e, t);
        }(r, o), n = r, (l = [{ key: "addInputError", value: function(e, t) {
          if (e.errmsg) e.errmsg.style.display = "block";
          else {
            var i = this.closest(e, ".form-control");
            e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(e.errmsg);
          }
          e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && Sf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function xi(o) {
        return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, xi(o);
      }
      function Lf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Af(l.key), l);
        }
      }
      function Af(o) {
        var r = function(n, l) {
          if (xi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (xi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return xi(r) == "symbol" ? r : r + "";
      }
      function Rf(o, r, n) {
        return r = pt(r), function(l, e) {
          if (e && (xi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ec() ? Reflect.construct(r, n || [], pt(o).constructor) : r.apply(o, n));
      }
      function Ec() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ec = function() {
          return !!o;
        })();
      }
      function vt() {
        return vt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = pt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vt.apply(this, arguments);
      }
      function pt(o) {
        return pt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, pt(o);
      }
      function fa(o, r) {
        return fa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fa(o, r);
      }
      Cc.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var If = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, Sc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rf(this, r, [e, If]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fa(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("i");
          d.classList.add("form-icon");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(d), t.appendChild(i), { label: i, checkbox: c, container: t };
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-".concat(t)), i && e.classList.add("col-mx-auto");
        } }, { key: "getGridContainer", value: function() {
          var e = document.createElement("div");
          return e.classList.add("container"), this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getGridRow", value: function() {
          var e = document.createElement("div");
          return e.classList.add("columns"), e;
        } }, { key: "getGridColumn", value: function() {
          var e = document.createElement("div");
          return e.classList.add("column"), this.options.align_bottom && e.classList.add("je-align-bottom"), e;
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("je-panel"), this.options.object_border && e.classList.add("je-border"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          var e = document.createElement("div");
          return e.classList.add("je-panel-top"), this.options.object_border && e.classList.add("je-border"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var e = vt(pt(r.prototype), "getButtonHolder", this).call(this);
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = vt(pt(r.prototype), "getFormButtonHolder", this).call(this);
          return t.classList.remove("btn-group"), t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" ? t.classList.add("text-right") : t.classList.add("text-left"), t;
        } }, { key: "getFormButton", value: function(e, t, i) {
          var c = vt(pt(r.prototype), "getFormButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-primary", "mx-2", "my-1"), this.options.input_size !== "small" && c.classList.remove("btn-sm"), this.options.input_size === "large" && c.classList.add("btn-lg"), c;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = vt(pt(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), c;
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return typeof e == "string" ? i.textContent = e : i.appendChild(e), i.style.display = "inline-block", i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = vt(pt(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-desc", "hide-sm"), t;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = vt(pt(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold && i.classList.add("je-label"), i;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getCheckboxLabel", value: function(e, t) {
          var i = vt(pt(r.prototype), "getCheckboxLabel", this).call(this, e, t), c = document.createElement("i");
          return c.classList.add("form-icon"), i.classList.add("form-checkbox", "pr-0"), i.insertBefore(c, i.firstChild), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, c) {
          return vt(pt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, c);
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = vt(pt(r.prototype), "getFormRadioLabel", this).call(this, e, t), c = document.createElement("i");
          return c.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(c, i.firstChild), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getFormInputField", value: function(e) {
          var t = vt(pt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("form-input"), t;
        } }, { key: "getRangeInput", value: function(e, t, i, c, d) {
          var g = vt(pt(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return g.classList.add("slider"), g.classList.remove("form-input"), g.setAttribute("oninput", 'this.setAttribute("value", this.value)'), g;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = vt(pt(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center"), i;
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = vt(pt(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-select"), i;
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-input"), e;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var g = document.createElement("div");
          return g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio" ? (e && (e.classList.add("form-label"), g.appendChild(e), c && e.appendChild(c)), g.appendChild(t)) : (g.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), g.appendChild(e)), this.options.input_size === "small" ? t.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && t.classList.add("input-lg", "select-lg"), t.type !== "checkbox" && g.appendChild(t), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), g;
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(e);
            for (var c = 0; c < t.length; c++) t[c].classList.add("input-group-btn"), t[c].classList.remove("btn-sm", "mr-2", "my-1"), i.appendChild(t[c]);
            return i;
          }
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("div");
          t.classList.add("popover", "popover-left", "float-right");
          var i = document.createElement("button");
          i.classList.add("btn", "btn-secondary", "btn-info", "btn-action", "s-circle"), i.setAttribute("tabindex", "-1"), t.appendChild(i);
          var c = document.createTextNode("I");
          i.appendChild(c);
          var d = document.createElement("div");
          d.classList.add("popover-container"), t.appendChild(d);
          var g = document.createElement("div");
          g.classList.add("card"), d.appendChild(g);
          var x = document.createElement("div");
          return x.classList.add("card-body"), x.innerHTML = e, g.appendChild(x), t;
        } }, { key: "getTable", value: function() {
          var e = vt(pt(r.prototype), "getTable", this).call(this);
          return e.classList.add("table", "table-scroll"), this.options.table_border && e.classList.add("je-table-border"), this.options.table_zebrastyle && e.classList.add("table-striped"), e;
        } }, { key: "getProgressBar", value: function() {
          var e = vt(pt(r.prototype), "getProgressBar", this).call(this);
          return e.classList.add("progress"), e;
        } }, { key: "getTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.classList.add("columns"), i.innerHTML = '<div class="column col-2"></div><div class="column col-10 content" id="'.concat(t, '"></div>'), i;
        } }, { key: "getTopTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.innerHTML = '<ul class="tab"></ul><div class="content" id="'.concat(t, '"></div>'), i;
        } }, { key: "getTab", value: function(e, t) {
          var i = document.createElement("a");
          return i.classList.add("btn", "btn-secondary", "btn-block"), i.setAttribute("href", "#".concat(t)), i.appendChild(e), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.id = t, i.classList.add("tab-item");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(t)), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.classList.add("active"), e.rowPane !== void 0 ? e.rowPane.style.display = "" : e.container.style.display = "";
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.classList.remove("active"), e.rowPane !== void 0 ? e.rowPane.style.display = "none" : e.container.style.display = "none";
        } }, { key: "afterInputReady", value: function(e) {
          if (e.localName === "select") {
            if (e.classList.contains("selectized")) {
              var t = e.nextSibling;
              t && (t.classList.remove("form-select"), Array.from(t.querySelectorAll(".form-select")).forEach(function(c) {
                c.classList.remove("form-select");
              }));
            } else if (e.classList.contains("select2-hidden-accessible")) {
              var i = e.nextSibling;
              i && i.querySelector(".select2-selection--single") && i.classList.add("form-select");
            }
          }
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "addInputError", value: function(e, t) {
          e.controlgroup && (e.controlgroup.classList.add("has-error"), e.errmsg || (e.errmsg = document.createElement("p"), e.errmsg.classList.add("form-input-hint"), e.controlgroup.appendChild(e.errmsg)), e.errmsg.classList.remove("d-hide"), e.errmsg.textContent = t, e.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(e) {
          e.errmsg && (e.errmsg.classList.add("d-hide"), e.controlgroup.classList.remove("has-error"));
        } }]) && Lf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function Oi(o) {
        return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Oi(o);
      }
      function Bf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Nf(l.key), l);
        }
      }
      function Nf(o) {
        var r = function(n, l) {
          if (Oi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Oi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Oi(r) == "symbol" ? r : r + "";
      }
      function Df(o, r, n) {
        return r = mt(r), function(l, e) {
          if (e && (Oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Pc() ? Reflect.construct(r, n || [], mt(o).constructor) : r.apply(o, n));
      }
      function Pc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Pc = function() {
          return !!o;
        })();
      }
      function _t() {
        return _t = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = mt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _t.apply(this, arguments);
      }
      function mt(o) {
        return mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mt(o);
      }
      function ya(o, r) {
        return ya = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ya(o, r);
      }
      Sc.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Ff = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, Tc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Df(this, r, [e, Ff]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ya(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider", "round");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
        } }, { key: "getGridContainer", value: function() {
          var e = document.createElement("div");
          return e.classList.add("flex", "flex-col", "w-full"), this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getGridRow", value: function() {
          var e = document.createElement("div");
          return e.classList.add("flex", "flex-wrap", "w-full"), e;
        } }, { key: "getGridColumn", value: function() {
          var e = document.createElement("div");
          return e.classList.add("flex", "flex-col"), e;
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          t > 0 && t < 12 ? e.classList.add("w-".concat(t, "/12"), "px-1") : e.classList.add("w-full", "px-1"), i && (e.style.marginLeft = "".concat(100 / 12 * i, "%"));
        } }, { key: "getIndentedPanel", value: function() {
          var e = document.createElement("div");
          return this.options.object_panel_default ? e.classList.add("w-full", "p-1") : e.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && e.classList.add("je-border"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          var e = document.createElement("div");
          return this.options.object_panel_default ? e.classList.add("w-full", "m-2") : e.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && e.classList.add("je-border"), e;
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = _t(mt(r.prototype), "getSelectInput", this).call(this, e);
          return t ? i.classList.add("form-multiselect", "block", "py-0", "h-auto", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded") : i.classList.add("form-select", "block", "py-0", "h-6", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && i.classList.add("compact"), i;
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = _t(mt(r.prototype), "getTextareaInput", this).call(this);
          return e.classList.add("block", "w-full", "px-1", "text-sm", "leading-normal", "bg-white", "text-black", "border", "border-grey", "rounded"), this.options.enable_compact && e.classList.add("compact"), e.style.height = 0, e;
        } }, { key: "getRangeInput", value: function(e, t, i) {
          var c = this.getFormInputField("range");
          return c.classList.add("slider"), this.options.enable_compact && c.classList.add("compact"), c.setAttribute("oninput", 'this.setAttribute("value", this.value)'), c.setAttribute("min", e), c.setAttribute("max", t), c.setAttribute("step", i), c;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = _t(mt(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center", "text-black"), i;
        } }, { key: "getCheckbox", value: function() {
          var e = this.getFormInputField("checkbox");
          return e.classList.add("form-checkbox", "text-red-600"), e;
        } }, { key: "getCheckboxLabel", value: function(e, t) {
          var i = _t(mt(r.prototype), "getCheckboxLabel", this).call(this, e, t);
          return i.classList.add("inline-flex", "items-center"), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("inline-flex flex-row"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, c) {
          var d = _t(mt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, c);
          return d.classList.add("inline-flex", "flex-col"), d;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in t.classList.add("form-radio", "text-red-600"), e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = _t(mt(r.prototype), "getFormRadioLabel", this).call(this, e, t);
          return i.classList.add("inline-flex", "items-center", "mr-2"), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-radio"), e;
        } }, { key: "getRadioHolder", value: function(e, t, i, c, d) {
          var g = _t(mt(r.prototype), "getRadioHolder", this).call(this, t, i, c, d);
          return e.options.layout === "h" ? g.classList.add("inline-flex", "flex-row") : g.classList.add("inline-flex", "flex-col"), g;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = _t(mt(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold ? i.classList.add("font-bold") : i.classList.add("required"), i;
        } }, { key: "getFormInputField", value: function(e) {
          var t = _t(mt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("block", "w-full", "px-1", "text-black", "text-sm", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && t.classList.add("compact"), t;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("p");
          return t.classList.add("block", "mt-1", "text-xs"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var g = document.createElement("div");
          return g.classList.add("form-group", "mb-1", "w-full"), e && (e.classList.add("text-xs"), t.type === "checkbox" && (t.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormCheckboxControl(e, t, !1, c)), t.type === "radio" && (t.classList.add("form-radio", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormRadioControl(e, t, !1, c)), g.appendChild(e), !["checkbox", "radio"].includes(t.type) && c && g.appendChild(c)), ["checkbox", "radio"].includes(t.type) || (this.options.input_size === "small" ? t.classList.add("text-xs") : this.options.input_size === "normal" ? t.classList.add("text-base") : this.options.input_size === "large" && t.classList.add("text-xl"), g.appendChild(t)), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), g;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("hidden");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("text-sm"), e;
        } }, { key: "getButtonHolder", value: function() {
          var e = document.createElement("div");
          return e.classList.add("flex", "relative", "inline-flex", "align-middle"), e;
        } }, { key: "getButton", value: function(e, t, i) {
          var c = _t(mt(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("inline-block", "align-middle", "text-center", "text-sm", "bg-blue-700", "text-white", "py-1", "pr-1", "m-2", "shadow", "select-none", "whitespace-no-wrap", "rounded"), c;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("a");
          t.classList.add("tooltips", "float-right"), t.innerHTML = "ⓘ";
          var i = document.createElement("span");
          return i.innerHTML = e, t.appendChild(i), t;
        } }, { key: "getTable", value: function() {
          var e = _t(mt(r.prototype), "getTable", this).call(this);
          return this.options.table_border ? e.classList.add("je-table-border") : e.classList.add("table", "border", "p-0"), e;
        } }, { key: "getTableRow", value: function() {
          var e = _t(mt(r.prototype), "getTableRow", this).call(this);
          return this.options.table_border && e.classList.add("je-table-border"), this.options.table_zebrastyle && e.classList.add("je-table-zebra"), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = _t(mt(r.prototype), "getTableHeaderCell", this).call(this, e);
          return this.options.table_border ? t.classList.add("je-table-border") : this.options.table_hdiv ? t.classList.add("je-table-hdiv") : t.classList.add("text-xs", "border", "p-0", "m-0"), t;
        } }, { key: "getTableCell", value: function() {
          var e = _t(mt(r.prototype), "getTableCell", this).call(this);
          return this.options.table_border ? e.classList.add("je-table-border") : this.options.table_hdiv ? e.classList.add("je-table-hdiv") : e.classList.add("border-0", "p-0", "m-0"), e;
        } }, { key: "addInputError", value: function(e, t) {
          e.controlgroup && (e.controlgroup.classList.add("has-error"), e.controlgroup.classList.add("text-red-600"), e.errmsg ? e.errmsg.style.display = "" : (e.errmsg = document.createElement("p"), e.errmsg.classList.add("block", "mt-1", "text-xs", "text-red"), e.controlgroup.appendChild(e.errmsg)), e.errmsg.textContent = t);
        } }, { key: "removeInputError", value: function(e) {
          e.errmsg && (e.errmsg.style.display = "none", e.controlgroup.classList.remove("text-red-600"), e.controlgroup.classList.remove("has-error"));
        } }, { key: "getTabHolder", value: function(e) {
          var t = document.createElement("div"), i = e === void 0 ? "" : e;
          return t.innerHTML = "<div class='w-2/12' id='".concat(i, "'><ul class='list-reset pl-0 mb-0'></ul></div><div class='w-10/12' id='").concat(i, "'></div>"), t.classList.add("flex"), t;
        } }, { key: "addTab", value: function(e, t) {
          e.children[0].children[0].appendChild(t);
        } }, { key: "getTopTabHolder", value: function(e) {
          var t = e === void 0 ? "" : e, i = document.createElement("div");
          return i.innerHTML = "<ul class='nav-tabs flex list-reset pl-0 mb-0 border-b border-grey-light' id='".concat(t, "'></ul><div class='p-6 block' id='").concat(t, "'></div>"), i;
        } }, { key: "getTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item", "flex-col", "text-center", "text-white", "bg-blue-500", "shadow-md", "border", "p-2", "mb-2", "mr-2", "hover:bg-blue-400", "rounded");
          var c = document.createElement("a");
          return c.classList.add("nav-link", "text-center"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item", "flex", "border-l", "border-t", "border-r");
          var c = document.createElement("a");
          return c.classList.add("nav-link", "-mb-px", "flex-row", "text-center", "bg-white", "p-2", "hover:bg-blue-400", "rounded-t"), c.setAttribute("href", "#".concat(t)), c.setAttribute("data-toggle", "tab"), c.appendChild(e), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var e = document.createElement("div");
          return e.setAttribute("role", "tabpanel"), e;
        } }, { key: "getTopTabContent", value: function() {
          var e = document.createElement("div");
          return e.setAttribute("role", "tabpanel"), e;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.firstChild.classList.add("block"), e.tab.firstChild.classList.contains("border-b") === !0 ? (e.tab.firstChild.classList.add("border-b-0"), e.tab.firstChild.classList.remove("border-b")) : e.tab.firstChild.classList.add("border-b-0"), e.container.classList.contains("hidden") === !0 && e.container.classList.remove("hidden"), e.container.classList.add("block");
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.firstChild.classList.contains("border-b-0") === !0 ? (e.tab.firstChild.classList.add("border-b"), e.tab.firstChild.classList.remove("border-b-0")) : e.tab.firstChild.classList.add("border-b"), e.container.classList.contains("block") === !0 && (e.container.classList.remove("block"), e.container.classList.add("hidden"));
        } }, { key: "getProgressBar", value: function() {
          var e = document.createElement("div");
          e.classList.add("progress");
          var t = document.createElement("div");
          return t.classList.add("bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white"), t.setAttribute("role", "progressbar"), t.setAttribute("aria-valuenow", 0), t.setAttribute("aria-valuemin", 0), t.setAttribute("aria-valuenax", 100), t.innerHTML = "".concat(0, "%"), e.appendChild(t), e;
        } }, { key: "updateProgressBar", value: function(e, t) {
          if (e) {
            var i = e.firstChild, c = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(e) {
          if (e) {
            var t = e.firstChild;
            e.classList.add("progress", "bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white", "block"), t.removeAttribute("aria-valuenow"), t.classList.add("w-full"), t.innerHTML = "";
          }
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("relative", "items-stretch", "w-full"), i.appendChild(e);
            var c = document.createElement("div");
            c.classList.add("-mr-1"), i.appendChild(c);
            for (var d = 0; d < t.length; d++) c.appendChild(t[d]);
            return i;
          }
        } }]) && Bf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      Tc.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Mf = { html: mc, bootstrap3: vc, bootstrap4: _c, bootstrap5: jc, jqueryui: xc, barebones: Cc, spectre: Sc, tailwind: Tc };
      const Hf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function En(o) {
        return En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, En(o);
      }
      function ma(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function ba() {
        ba = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function(U, q, K) {
          U[q] = K.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function g(U, q, K) {
          return Object.defineProperty(U, q, { value: K, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          g({}, "");
        } catch {
          g = function(q, K, ge) {
            return q[K] = ge;
          };
        }
        function x(U, q, K, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new hr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, K, $e) }), Le;
        }
        function S(U, q, K) {
          try {
            return { type: "normal", arg: U.call(q, K) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", $ = "suspendedYield", G = "executing", te = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        g(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ct([])));
        ve && ve !== n && l.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ke(U) {
          ["next", "throw", "return"].forEach(function(q) {
            g(U, q, function(K) {
              return this._invoke(q, K);
            });
          });
        }
        function it(U, q) {
          function K(se, Le, $e, ot) {
            var st = S(U[se], U, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && En(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                K("next", Et, $e, ot);
              }, function(Et) {
                K("throw", Et, $e, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return K("throw", Et, $e, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(ot, st) {
                K(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, K) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (K.method = se, K.arg = Le; ; ) {
              var $e = K.delegate;
              if ($e) {
                var ot = nn($e, K);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (K.method === "next") K.sent = K._sent = K.arg;
              else if (K.method === "throw") {
                if (ge === D) throw ge = te, K.arg;
                K.dispatchException(K.arg);
              } else K.method === "return" && K.abrupt("return", K.arg);
              ge = G;
              var st = S(U, q, K);
              if (st.type === "normal") {
                if (ge = K.done ? te : $, st.arg === pe) continue;
                return { value: st.arg, done: K.done };
              }
              st.type === "throw" && (ge = te, K.method = "throw", K.arg = st.arg);
            }
          };
        }
        function nn(U, q) {
          var K = q.method, ge = U.iterator[K];
          if (ge === o) return q.delegate = null, K === "throw" && U.iterator.return && (q.method = "return", q.arg = o, nn(U, q), q.method === "throw") || K !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + K + "' method")), pe;
          var se = S(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function Ci(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function hr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(Ci, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var K = -1, ge = function se() {
                for (; ++K < U.length; ) if (l.call(U, K)) return se.value = U[K], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(En(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = g(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, g(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ke(it.prototype), g(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function(U, q, K, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x(U, q, K, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), g(xe, d, "Generator"), g(xe, i, function() {
          return this;
        }), g(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), K = [];
          for (var ge in q) K.push(ge);
          return K.reverse(), function se() {
            for (; K.length; ) {
              var Le = K.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, hr.prototype = { constructor: hr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function K(st, It) {
            return Le.type = "throw", Le.arg = U, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return K("end");
            if (se.tryLoc <= this.prev) {
              var $e = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if ($e && ot) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var K = this.tryEntries.length - 1; K >= 0; --K) {
            var ge = this.tryEntries[K];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (U === "break" || U === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = U, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function(U, q) {
          if (U.type === "throw") throw U.arg;
          return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && q && (this.next = q), pe;
        }, finish: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.finallyLoc === U) return this.complete(K.completion, K.afterLoc), Ne(K), pe;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.tryLoc === U) {
              var ge = K.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(K);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, K) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: K }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function Lc(o, r, n, l, e, t, i) {
        try {
          var c = o[t](i), d = c.value;
        } catch (g) {
          return void n(g);
        }
        c.done ? r(d) : Promise.resolve(d).then(l, e);
      }
      function Vf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, zf(l.key), l);
        }
      }
      function zf(o) {
        var r = function(n, l) {
          if (En(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (En(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return En(r) == "symbol" ? r : r + "";
      }
      var Er = function() {
        function o(t) {
          var i = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(G, te) {
            if (!(G instanceof te)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = v({}, o.defaults.options, c), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var d = this.options.theme || o.defaults.theme, g = o.defaults.themes[d];
          if (!g) throw new Error("Unknown theme ".concat(d));
          this.element.setAttribute("data-theme", d), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new g(this);
          var x = v(Hf, this.getEditorsRules()), S = function(G, te, pe) {
            return pe ? i.addNewStyleRulesToShadowRoot(G, te, pe) : i.addNewStyleRules(G, te);
          };
          if (!this.theme.options.disable_theme_rules) {
            var D = C(this.element);
            S("default", x, D), g.rules !== void 0 && S(d, g.rules, D);
          }
          var $ = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          $ && (this.iconlib = new $()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = o, n = [{ key: "load", value: (l = ba().mark(function t() {
          var i, c, d, g, x, S, D = this;
          return ba().wrap(function($) {
            for (; ; ) switch ($.prev = $.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (c = new Rp(this.options)).onSchemaLoaded = function(G) {
                  D.trigger("schemaLoaded", G);
                }, c.onAllSchemasLoaded = function() {
                  D.trigger("allSchemasLoaded");
                }, this.expandSchema = function(G) {
                  return c.expandSchema(G);
                }, this.expandRefs = function(G, te) {
                  return c.expandRefs(G, te);
                }, d = document.location.toString(), $.next = 9, c.load(this.schema, i, d);
              case 9:
                g = $.sent, x = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new Il(this, null, x, o.defaults), S = this.getEditorClass(g), this.root = this.createEditor(S, { jsoneditor: this, schema: g, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), k(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  D.ready && (D.validation_results = D.validator.validate(D.root.getValue()), D.root.showValidationErrors(D.validation_results), D.trigger("ready"), D.trigger("change"));
                });
              case 24:
              case "end":
                return $.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(c, d) {
            var g = l.apply(t, i);
            function x(D) {
              Lc(g, c, d, x, S, "next", D);
            }
            function S(D) {
              Lc(g, c, d, x, S, "throw", D);
            }
            x(void 0);
          });
        }, function() {
          return e.apply(this, arguments);
        }) }, { key: "getValue", value: function() {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return this.root.getValue();
        } }, { key: "setValue", value: function(t) {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return this.root.setValue(t), this;
        } }, { key: "validate", value: function(t) {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return arguments.length === 1 ? this.validator.validate(t) : this.validation_results;
        } }, { key: "destroy", value: function() {
          this.destroyed || this.ready && (this.schema = null, this.options = null, this.root.destroy(), this.root = null, this.root_container = null, this.validator = null, this.validation_results = null, this.theme = null, this.iconlib = null, this.template = null, this.__data = null, this.ready = !1, this.element.innerHTML = "", this.element.removeAttribute("data-theme"), this.destroyed = !0);
        } }, { key: "on", value: function(t, i) {
          return this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [], this.callbacks[t].push(i), this;
        } }, { key: "off", value: function(t, i) {
          if (t && i) {
            this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [];
            for (var c = [], d = 0; d < this.callbacks[t].length; d++) this.callbacks[t][d] !== i && c.push(this.callbacks[t][d]);
            this.callbacks[t] = c;
          } else t ? (this.callbacks = this.callbacks || {}, this.callbacks[t] = []) : this.callbacks = {};
          return this;
        } }, { key: "trigger", value: function(t, i) {
          if (this.callbacks && this.callbacks[t] && this.callbacks[t].length) for (var c = 0; c < this.callbacks[t].length; c++) this.callbacks[t][c].apply(this, [i]);
          return this;
        } }, { key: "setOption", value: function(t, i) {
          if (t !== "show_errors") throw new Error("Option ".concat(t, " must be set during instantiation and cannot be changed later"));
          return this.options.show_errors = i, this.onChange(), this;
        } }, { key: "getEditorsRules", value: function() {
          return Object.values(o.defaults.editors).reduce(function(t, i) {
            return i.rules ? v(t, i.rules) : t;
          }, {});
        } }, { key: "getEditorClass", value: function(t) {
          var i, c = this;
          if (t = this.expandSchema(t), o.defaults.resolvers.find(function(d) {
            return (i = d(t, c)) && o.defaults.editors[i];
          }), !i) throw new Error("Unknown editor for schema ".concat(JSON.stringify(t)));
          if (!o.defaults.editors[i]) throw new Error("Unknown editor ".concat(i));
          return o.defaults.editors[i];
        } }, { key: "createEditor", value: function(t, i) {
          var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          return new t(i = v({}, t.options || {}, i), o.defaults, c);
        } }, { key: "onChange", value: function(t) {
          var i = this;
          if (this.ready && (t && this.trigger(t.event, t.data), !this.firing_change)) return this.firing_change = !0, window.requestAnimationFrame(function() {
            i.firing_change = !1, i.ready && (i.validation_results = i.validator.validate(i.root.getValue()), i.options.show_errors !== "never" ? i.root.showValidationErrors(i.validation_results) : i.root.showValidationErrors([]), i.trigger("change"));
          }), this;
        } }, { key: "compileTemplate", value: function(t) {
          var i, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : o.defaults.template;
          if (typeof c == "string") {
            if (!o.defaults.templates[c]) throw new Error("Unknown template engine ".concat(c));
            if (!(i = o.defaults.templates[c]())) throw new Error("Template engine ".concat(c, " missing required library."));
          } else i = c;
          if (!i) throw new Error("No template engine set");
          if (!i.compile) throw new Error("Invalid template engine set");
          return i.compile(t);
        } }, { key: "_data", value: function(t, i, c) {
          if (arguments.length !== 3) return t.hasAttribute("data-jsoneditor-".concat(i)) ? this.__data[t.getAttribute("data-jsoneditor-".concat(i))] : null;
          var d;
          t.hasAttribute("data-jsoneditor-".concat(i)) ? d = t.getAttribute("data-jsoneditor-".concat(i)) : (d = this.uuid++, t.setAttribute("data-jsoneditor-".concat(i), d)), this.__data[d] = c;
        } }, { key: "registerEditor", value: function(t) {
          return this.editors = this.editors || {}, this.editors[t.path] = t, this;
        } }, { key: "unregisterEditor", value: function(t) {
          return this.editors = this.editors || {}, this.editors[t.path] = null, this;
        } }, { key: "getEditor", value: function(t) {
          if (this.editors) return this.editors[t];
        } }, { key: "watch", value: function(t, i) {
          return this.watchlist = this.watchlist || {}, this.watchlist[t] = this.watchlist[t] || [], this.watchlist[t].push(i), this;
        } }, { key: "unwatch", value: function(t, i) {
          if (!this.watchlist || !this.watchlist[t]) return this;
          if (!i) return this.watchlist[t] = null, this;
          for (var c = [], d = 0; d < this.watchlist[t].length; d++) this.watchlist[t][d] !== i && c.push(this.watchlist[t][d]);
          return this.watchlist[t] = c.length ? c : null, this;
        } }, { key: "notifyWatchers", value: function(t) {
          if (!this.watchlist || !this.watchlist[t]) return this;
          for (var i = 0; i < this.watchlist[t].length; i++) this.watchlist[t][i]();
        } }, { key: "isEnabled", value: function() {
          return !this.root || this.root.isEnabled();
        } }, { key: "enable", value: function() {
          this.root.enable();
        } }, { key: "disable", value: function() {
          this.root.disable();
        } }, { key: "setCopyClipboardContents", value: function(t) {
          this.copyClipboard = t;
        } }, { key: "getCopyClipboardContents", value: function() {
          return this.copyClipboard;
        } }, { key: "addNewStyleRules", value: function(t, i) {
          var c = document.querySelector("#theme-".concat(t));
          c || ((c = document.createElement("style")).setAttribute("id", "theme-".concat(t)), c.appendChild(document.createTextNode("")), document.head.appendChild(c));
          for (var d = c.sheet ? c.sheet : c.styleSheet, g = this.element.nodeName.toLowerCase(); d.cssRules.length > 0; ) d.deleteRule(0);
          Object.keys(i).forEach(function(x) {
            var S = t === "default" ? x : "".concat(g, '[data-theme="').concat(t, '"] ').concat(x);
            d.insertRule ? d.insertRule(S + " {" + decodeURIComponent(i[x]) + "}", 0) : d.addRule && d.addRule(S, decodeURIComponent(i[x]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, c) {
          var d = this.element.nodeName.toLowerCase(), g = "";
          Object.keys(i).forEach(function(D) {
            var $ = t === "default" ? D : "".concat(d, '[data-theme="').concat(t, '"] ').concat(D);
            g += $ + " {" + decodeURIComponent(i[D]) + `}
`;
          });
          var x, S = new CSSStyleSheet();
          S.replaceSync(g), c.adoptedStyleSheets = [].concat(function(D) {
            if (Array.isArray(D)) return ma(D);
          }(x = c.adoptedStyleSheets) || function(D) {
            if (typeof Symbol < "u" && D[Symbol.iterator] != null || D["@@iterator"] != null) return Array.from(D);
          }(x) || function(D, $) {
            if (D) {
              if (typeof D == "string") return ma(D, $);
              var G = Object.prototype.toString.call(D).slice(8, -1);
              return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? ma(D, $) : void 0;
            }
          }(x) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }(), [S]);
        } }, { key: "showValidationErrors", value: function(t) {
          var i = t ?? this.validate();
          Object.values(this.editors).forEach(function(c) {
            c && (c.is_dirty = !0, c.showValidationErrors(i));
          });
        } }], n && Vf(r.prototype, n), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, n, l, e;
      }();
      Er.defaults = _n, Er.AbstractEditor = z, Er.AbstractTheme = Or, Er.AbstractIconLib = xr, Object.assign(Er.defaults.themes, Mf), Object.assign(Er.defaults.editors, wo), Object.assign(Er.defaults.templates, Ip), Object.assign(Er.defaults.iconlibs, lf);
    })(), O;
  })());
})(gd);
var _d = gd.exports;
const Ta = /* @__PURE__ */ bb(_d), vb = ["placeholder", "readonly"], gb = ["onClick"], _b = ["title"], wb = ["onClick"], jb = ["title"], kb = {
  key: 0,
  class: "ontocombo-empty"
}, xb = {
  __name: "ontocombo",
  props: {
    modelValue: String,
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(s, { expose: u, emit: p }) {
    const _ = s, b = p, O = /* @__PURE__ */ Ln(null), h = /* @__PURE__ */ Ln(!1), w = /* @__PURE__ */ Ln(""), a = /* @__PURE__ */ Ln(/* @__PURE__ */ new Set()), f = /* @__PURE__ */ Ln({}), y = qa(() => !_.options || _.options.length === 0 ? !1 : _.options.length <= 2 && !_.options.some((A) => A.children)), m = () => {
      if (O.value && h.value) {
        const A = O.value.getBoundingClientRect();
        f.value = {
          position: "fixed",
          top: `${A.bottom + 4}px`,
          left: `${A.left}px`,
          width: `${A.width}px`,
          zIndex: 999999,
          backgroundColor: "#ffffff",
          border: "1px solid #ced4da",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
          maxHeight: "250px",
          overflowY: "auto"
        };
      }
    }, v = (A) => {
      const B = (N) => {
        for (const z of N) {
          if (!z.children && z.value === A) return z.label;
          if (z.children) {
            const V = B(z.children);
            if (V) return V;
          }
        }
        return null;
      };
      w.value = B(_.options) || A || "";
    };
    u({ updateFromExternal: v }), to(() => _.modelValue, (A) => {
      A !== w.value && v(A);
    }, { immediate: !0 }), to(h, (A) => {
      A && Dn(m);
    });
    const j = () => {
      b("update:modelValue", w.value);
    }, C = qa(() => {
      const A = y.value ? "" : w.value.toLowerCase(), B = (N, z = 0, V = !1) => {
        let Z = [];
        for (const J of N) {
          const X = J.label.toLowerCase().includes(A), ce = J.children ? k(J.children, A) : !1;
          if (!A || X || ce)
            if (J.children) {
              const oe = V || !!A || a.value.has(J.id);
              Z.push({ ...J, isGroup: !0, level: z, expanded: oe }), oe && Z.push(...B(J.children, z + 1, V));
            } else
              Z.push({ ...J, isGroup: !1, level: z });
        }
        return Z;
      };
      return B(_.options);
    }), k = (A, B) => {
      for (const N of A)
        if (N.label.toLowerCase().includes(B) || N.children && k(N.children, B)) return !0;
      return !1;
    }, E = () => {
      h.value = !0, Dn(m);
    }, P = () => {
      h.value = !h.value, h.value && Dn(m);
    }, T = () => {
      h.value = !1;
    }, I = (A) => {
      a.value.has(A) ? a.value.delete(A) : a.value.add(A), a.value = new Set(a.value);
    }, L = (A) => {
      w.value = A.label, b("update:modelValue", A.value), T();
    }, M = (A, B) => {
      const N = B ? "group" : "element";
      return A === 0 ? N : A === 1 ? `sub${N}` : A === 2 ? `subsub${N}` : `${N}-level-${A}`;
    }, H = (A) => {
      if (h.value && O.value) {
        const B = A.composedPath(), N = document.querySelector(".ontocombo-dropdown");
        !B.includes(O.value) && (!N || !B.includes(N)) && T();
      }
    };
    return sl(() => {
      document.addEventListener("click", H), document.addEventListener("mousedown", H), window.addEventListener("scroll", m, !0), window.addEventListener("resize", m);
    }), al(() => {
      document.removeEventListener("click", H), document.removeEventListener("mousedown", H), window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (A, B) => (Qt(), Pr("div", {
      class: "ontocombo",
      ref_key: "containerRef",
      ref: O
    }, [
      wt("div", {
        class: "ontocombo-header form-control p-0 d-flex align-items-stretch",
        onClick: Si(E, ["stop"])
      }, [
        Iy(wt("input", {
          type: "text",
          class: "ontocombo-input flex-grow-1 px-2 border-0 bg-transparent",
          "onUpdate:modelValue": B[0] || (B[0] = (N) => w.value = N),
          onFocus: E,
          onClick: Si(E, ["stop"]),
          onInput: j,
          placeholder: s.placeholder,
          readonly: y.value,
          style: In(y.value ? "cursor: pointer; outline: none !important; box-shadow: none !important; min-width: 0;" : "outline: none !important; box-shadow: none !important; min-width: 0;")
        }, null, 44, vb), [
          [ub, w.value]
        ]),
        wt("div", {
          class: "ontocombo-arrow d-flex align-items-center px-2 flex-shrink-0",
          onClick: Si(P, ["stop"]),
          style: { cursor: "pointer" }
        }, [
          wt("i", {
            class: Bn(["fas", h.value ? "fa-caret-down" : "fa-caret-right"])
          }, null, 2)
        ])
      ]),
      (Qt(), hd(zy, { to: "body" }, [
        h.value ? (Qt(), Pr("div", {
          key: 0,
          class: "ontocombo-dropdown",
          style: In(f.value),
          onClick: B[1] || (B[1] = Si(() => {
          }, ["stop"]))
        }, [
          (Qt(!0), Pr(Nt, null, tm(C.value, (N) => (Qt(), Pr(Nt, {
            key: N.id
          }, [
            N.isGroup ? (Qt(), Pr("div", {
              key: 0,
              class: Bn(["ontocombo-row is-group", M(N.level, !0)]),
              style: In({ display: "flex", cursor: "pointer", "align-items": "center", padding: `0 ${N.level * 16 + 8}px` }),
              onClick: Si((z) => I(N.id), ["stop"])
            }, [
              wt("span", {
                class: "row-label flex-grow-1 text-start",
                title: N.label
              }, Qi(N.label === "" ? " " : N.label), 9, _b),
              wt("i", {
                class: Bn(["fas row-toggle", N.expanded ? "fa-caret-down" : "fa-caret-right"])
              }, null, 2)
            ], 14, gb)) : (Qt(), Pr("div", {
              key: 1,
              class: Bn(["ontocombo-row is-element", M(N.level, !1)]),
              style: In({ cursor: "pointer", paddingLeft: `${N.level * 16 + 8}px` }),
              onClick: Si((z) => L(N), ["stop"])
            }, [
              wt("span", {
                class: "row-label flex-grow-1 text-start",
                title: N.label
              }, Qi(N.label === "" ? " " : N.label), 9, jb)
            ], 14, wb))
          ], 64))), 128)),
          C.value.length === 0 ? (Qt(), Pr("div", kb, [
            B[2] || (B[2] = Wo(" Using custom value:", -1)),
            B[3] || (B[3] = wt("br", null, null, -1)),
            Wo(" " + Qi(w.value), 1)
          ])) : za("", !0)
        ], 4)) : za("", !0)
      ]))
    ], 512));
  }
};
function Ob(s, u) {
  s.defaults.editors.ontocombo = class extends s.defaults.editors.string {
    build() {
      var _;
      super.build(), this.input && (this.input.type = "hidden", this.input.style.setProperty("display", "none", "important")), this.vueContainer = document.createElement("div"), this.vueContainer.style.width = "100%", this.input.parentNode.insertBefore(this.vueContainer, this.input.nextSibling);
      const p = ((_ = this.schema.options) == null ? void 0 : _.ontology_data) || [];
      this.vueApp = u(xb, {
        options: p,
        modelValue: this.value || this.schema.default || "",
        placeholder: "",
        "onUpdate:modelValue": (b) => {
          this.value = b, this.input && (this.input.value = b), this.onChange(!0);
        }
      }), this.vueInstance = this.vueApp.mount(this.vueContainer);
    }
    setValue(p) {
      super.setValue(p), this.vueInstance && typeof this.vueInstance.updateFromExternal == "function" && this.vueInstance.updateFromExternal(p || this.schema.default || "");
    }
    destroy() {
      this.vueApp && this.vueApp.unmount(), this.vueContainer && this.vueContainer.parentNode && this.vueContainer.parentNode.removeChild(this.vueContainer), super.destroy();
    }
  }, s.defaults.resolvers.unshift((p) => {
    if (p.type === "string" && p.format === "ontocombo")
      return "ontocombo";
  });
}
const Cb = {
  key: 0,
  class: "alert alert-danger mb-3"
}, Eb = {
  class: "json-editor-scroll-area d-flex flex-column h-100",
  "data-bs-theme": "light"
}, Sb = {
  __name: "filter",
  props: {
    model: Object
  },
  setup(s) {
    const u = s, p = /* @__PURE__ */ Ln(null), _ = /* @__PURE__ */ Ln("");
    let b = null, O = !1;
    const h = {
      type: "object",
      format: "categories",
      title: " ",
      properties: {
        Basic: {
          type: "array",
          minItems: 1,
          options: {
            category: "Basic",
            titleHidden: !0
          },
          items: {
            type: "object",
            format: "grid",
            options: {
              titleHidden: !0
            },
            properties: {
              predicate: {
                type: "string",
                title: "Predicate",
                format: "ontocombo",
                options: { grid_columns: 5, ontology_data: [] }
              },
              object: {
                type: "string",
                title: "Object",
                format: "ontocombo",
                options: { grid_columns: 5, ontology_data: [] }
              }
            }
          },
          default: [
            { predicate: "", object: "" }
          ]
        },
        Simple: {
          type: "array",
          minItems: 1,
          options: {
            category: "Simple",
            titleHidden: !0
          },
          items: {
            type: "object",
            format: "grid",
            options: {
              titleHidden: !0
            },
            properties: {
              subject: {
                type: "string",
                title: "Subject",
                format: "ontocombo",
                options: { grid_columns: 4, ontology_data: [] }
              },
              predicate: {
                type: "string",
                title: "Predicate",
                format: "ontocombo",
                options: { grid_columns: 4, ontology_data: [] }
              },
              object: {
                type: "string",
                title: "Object",
                format: "ontocombo",
                options: { grid_columns: 4, ontology_data: [] }
              },
              logic: {
                type: "string",
                title: "Relation Logic",
                format: "ontocombo",
                default: "AND",
                options: {
                  grid_columns: 6,
                  ontology_data: [
                    { id: "AND", label: "AND", value: "AND" },
                    { id: "OR", label: "OR", value: "OR" }
                  ]
                }
              },
              modifier: {
                type: "string",
                title: "Modifier",
                format: "ontocombo",
                default: "",
                options: {
                  grid_columns: 6,
                  ontology_data: [
                    { id: "NONE", label: "", value: "" },
                    { id: "NOT", label: "NOT", value: "NOT" }
                  ]
                }
              }
            }
          },
          default: [
            { subject: "", predicate: "", object: "", logic: "AND", modifier: "" }
          ]
        },
        Advanced: {
          type: "object",
          options: {
            category: "Advanced",
            titleHidden: !0
          },
          properties: {
            query: {
              type: "string",
              title: " ",
              format: "textarea",
              default: `SELECT * WHERE {
  ?s ?p ?o .
}`,
              options: {
                inputAttributes: {
                  class: "form-control",
                  style: "font-family: monospace; min-height: 200px"
                },
                compact: !0
              }
            }
          }
        }
      }
    }, w = (v, j) => {
      if (j && !j.querySelector(`link[href="${v}"]`)) {
        const C = document.createElement("link");
        C.rel = "stylesheet", C.href = v, j.appendChild(C);
      }
    }, a = (v) => {
      const j = v == null ? void 0 : v.querySelector(".nav-tabs .nav-link.active");
      return j ? j.textContent.trim() : "Basic";
    }, f = () => {
      var v;
      if (u.model && b) {
        O = !0;
        const j = (v = p.value) == null ? void 0 : v.getRootNode(), C = a(j);
        b.setValue({
          Basic: [{ predicate: "", object: "" }],
          Simple: [{ subject: "", predicate: "", object: "", logic: "AND", modifier: "" }],
          Advanced: { query: `SELECT * WHERE {
  ?s ?p ?o .
}` }
        }), Dn(() => {
          const k = j == null ? void 0 : j.querySelectorAll(".nav-tabs .nav-link");
          k == null || k.forEach((E) => {
            E.textContent.trim() === C && E.click();
          }), m();
        }), setTimeout(() => {
          let k = b.getValue();
          k = JSON.parse(JSON.stringify(k || {}));
          const E = u.model.get("value") || {};
          k._trigger_apply = E._trigger_apply || 0, k._trigger_cancel = Date.now(), k.active_tab = C, u.model.set("value", k), u.model.save_changes(), O = !1;
        }, 50);
      }
    }, y = () => {
      u.model && b && setTimeout(() => {
        var C;
        let v = b.getValue();
        v = JSON.parse(JSON.stringify(v || {}));
        const j = u.model.get("value") || {};
        v._trigger_cancel = j._trigger_cancel || 0, v._trigger_apply = Date.now(), v.active_tab = a((C = p.value) == null ? void 0 : C.getRootNode()), u.model.set("value", v), u.model.save_changes();
      }, 50);
    }, m = () => {
      Dn(() => {
        var k, E;
        const v = (k = p.value) == null ? void 0 : k.getRootNode();
        if (!v || !b) return;
        const j = b.getValue(), C = ((E = j == null ? void 0 : j.Simple) == null ? void 0 : E.length) || 0;
        for (let P = 0; P < C; P++) {
          const T = P === C - 1, I = v.querySelector(`[data-schemapath="root.Simple.${P}.logic"]`), L = v.querySelector(`[data-schemapath="root.Simple.${P}.modifier"]`);
          I && (T ? I.classList.add("d-none") : I.classList.remove("d-none")), L && (T ? L.classList.add("d-none") : L.classList.remove("d-none"));
        }
      });
    };
    return sl(async () => {
      var j;
      await Dn();
      const v = p.value.getRootNode();
      w("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", v), w("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", v), w("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", document.head), w("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", document.head);
      try {
        const C = _d.JSONEditor || (Ta == null ? void 0 : Ta.JSONEditor) || window.JSONEditor;
        Ob(C, vd);
        const k = ((j = u.model) == null ? void 0 : j.get("schema")) || {}, E = k.entities || [], P = k.predicates || [], T = h.properties.Basic.items.properties;
        T.predicate.options.ontology_data = P, T.object.options.ontology_data = E;
        const I = h.properties.Simple.items.properties;
        I.subject.options.ontology_data = E, I.object.options.ontology_data = E, I.predicate.options.ontology_data = P, b = new C(p.value, {
          theme: "bootstrap5",
          iconlib: "fontawesome5",
          schema: h,
          disable_collapse: !0,
          disable_edit_json: !0,
          disable_properties: !0,
          show_opt_in: !1,
          disable_array_reorder: !0,
          disable_array_delete_all_rows: !0,
          remove_button_labels: !0,
          prompt_before_delete: !1
        }), b.on("ready", () => {
          v.querySelectorAll(".nav-tabs .nav-link").forEach((M) => {
            M.textContent.trim() === "Basic" && M.click();
          }), m();
        }), b.on("change", () => {
          if (O) return;
          let L = b.getValue(), M = !1;
          if (v.querySelectorAll(".nav-tabs .nav-link").forEach((A) => {
            A.textContent.trim() === "Simple" && A.classList.contains("active") && (M = !0);
          }), M && L && L.Simple && Array.isArray(L.Simple)) {
            let A = [], B = [];
            L.Simple.forEach((V, Z) => {
              let J = `${V.subject || "?s"} ${V.predicate || "?p"} ${V.object || "?o"}`;
              if (Z > 0) {
                let X = L.Simple[Z - 1];
                X.modifier === "NOT" && (J = `FILTER NOT EXISTS { ${J} }`), X.logic === "OR" ? (B.length === 0 && B.push(A.pop()), B.push(J)) : (B.length > 0 && (A.push(B.map((ce) => `{ ${ce} }`).join(" UNION ")), B = []), A.push(J));
              } else
                A.push(J);
            }), B.length > 0 && A.push(B.map((V) => `{ ${V} }`).join(" UNION "));
            const z = `SELECT * WHERE {
  ${A.join(` .
  `)} 
}`;
            if (L.Advanced || (L.Advanced = {}), L.Advanced.query !== z) {
              O = !0;
              const V = b.getEditor("root.Advanced.query");
              V && V.setValue(z), L.Advanced.query = z, O = !1;
            }
          }
          if (m(), u.model) {
            L = JSON.parse(JSON.stringify(L || {}));
            const A = u.model.get("value") || {};
            A._trigger_apply && (L._trigger_apply = A._trigger_apply), A._trigger_cancel && (L._trigger_cancel = A._trigger_cancel), L.active_tab = a(v), u.model.set("value", L), u.model.save_changes();
          }
        });
      } catch (C) {
        console.error("Failed to initialize JSON Editor:", C), _.value = String(C);
      }
    }), al(() => {
      b && b.destroy();
    }), (v, j) => (Qt(), Pr(Nt, null, [
      _.value ? (Qt(), Pr("div", Cb, [
        j[0] || (j[0] = wt("strong", null, "Error:", -1)),
        Wo(" " + Qi(_.value), 1)
      ])) : za("", !0),
      wt("div", Eb, [
        wt("div", {
          ref_key: "editorHolder",
          ref: p,
          class: "flex-grow-1"
        }, null, 512),
        wt("div", { class: "m-3 d-flex justify-content-end border-top pt-3" }, [
          wt("button", {
            class: "btn btn-secondary col-3 me-2",
            onClick: f
          }, "Cancel"),
          wt("button", {
            class: "btn btn-primary col-3",
            onClick: y
          }, "Apply")
        ])
      ])
    ], 64));
  }
}, Pb = ".json-editor-scroll-area{max-height:calc(100vh - 88px);overflow-x:hidden;overflow-y:auto}.json-editor-scroll-area .card{border:none;background:transparent!important;margin:0!important;padding:0}.json-editor-scroll-area .card-header{border-radius:0;margin-bottom:10px}.json-editor-scroll-area .card-title{display:none!important}.json-editor-scroll-area .card-body{padding-top:0;padding-bottom:0}.json-editor-scroll-area .btn-group,.json-editor-scroll-area .je-object__controls{display:none}.json-editor-scroll-area .json-editor-btntype-add{background-color:#fff;border-color:var(--bs-success);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-success);margin-right:1rem}.json-editor-scroll-area .json-editor-btntype-add:active,.json-editor-scroll-area .json-editor-btntype-add:focus-visible,.json-editor-scroll-area .json-editor-btntype-add:hover{background-color:var(--bs-success);border-color:var(--bs-success);color:#fff}.json-editor-scroll-area .json-editor-btntype-deletelast{background-color:#fff;border-color:var(--bs-danger);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-danger)}.json-editor-scroll-area .json-editor-btntype-deletelast:active,.json-editor-scroll-area .json-editor-btntype-deletelast:focus-visible,.json-editor-scroll-area .json-editor-btntype-deletelast:hover{background-color:var(--bs-danger);border-color:var(--bs-danger);color:#fff}";
function Tb({ model: s, el: u }) {
  const p = document.createElement("style");
  p.innerHTML = Pb, u.append(p);
  const _ = document.createElement("div");
  _.setAttribute("id", "filter-vue-app"), u.append(_);
  const b = vd(Sb, { model: s });
  return b.mount(_), () => {
    b.unmount();
  };
}
export {
  Tb as render
};

/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ca(l) {
  const u = /* @__PURE__ */ Object.create(null);
  for (const y of l.split(",")) u[y] = 1;
  return (y) => y in u;
}
const ce = {}, ci = [], cn = () => {
}, Kp = () => !1, ko = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // uppercase letter
(l.charCodeAt(2) > 122 || l.charCodeAt(2) < 97), ua = (l) => l.startsWith("onUpdate:"), Se = Object.assign, ha = (l, u) => {
  const y = l.indexOf(u);
  y > -1 && l.splice(y, 1);
}, Zp = Object.prototype.hasOwnProperty, Yt = (l, u) => Zp.call(l, u), Dt = Array.isArray, ui = (l) => xo(l) === "[object Map]", kc = (l) => xo(l) === "[object Set]", Vt = (l) => typeof l == "function", me = (l) => typeof l == "string", Wn = (l) => typeof l == "symbol", de = (l) => l !== null && typeof l == "object", xc = (l) => (de(l) || Vt(l)) && Vt(l.then) && Vt(l.catch), Oc = Object.prototype.toString, xo = (l) => Oc.call(l), Yp = (l) => xo(l).slice(8, -1), Cc = (l) => xo(l) === "[object Object]", da = (l) => me(l) && l !== "NaN" && l[0] !== "-" && "" + parseInt(l, 10) === l, Ti = /* @__PURE__ */ ca(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Oo = (l) => {
  const u = /* @__PURE__ */ Object.create(null);
  return (y) => u[y] || (u[y] = l(y));
}, Qp = /-(\w)/g, Gn = Oo(
  (l) => l.replace(Qp, (u, y) => y ? y.toUpperCase() : "")
), Xp = /\B([A-Z])/g, _r = Oo(
  (l) => l.replace(Xp, "-$1").toLowerCase()
), Ec = Oo((l) => l.charAt(0).toUpperCase() + l.slice(1)), Hs = Oo(
  (l) => l ? `on${Ec(l)}` : ""
), br = (l, u) => !Object.is(l, u), Vs = (l, ...u) => {
  for (let y = 0; y < l.length; y++)
    l[y](...u);
}, Sc = (l, u, y, w = !1) => {
  Object.defineProperty(l, u, {
    configurable: !0,
    enumerable: !1,
    writable: w,
    value: y
  });
}, tf = (l) => {
  const u = parseFloat(l);
  return isNaN(u) ? l : u;
};
let Zl;
const Co = () => Zl || (Zl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function pa(l) {
  if (Dt(l)) {
    const u = {};
    for (let y = 0; y < l.length; y++) {
      const w = l[y], _ = me(w) ? of(w) : pa(w);
      if (_)
        for (const C in _)
          u[C] = _[C];
    }
    return u;
  } else if (me(l) || de(l))
    return l;
}
const ef = /;(?![^(]*\))/g, nf = /:([^]+)/, rf = /\/\*[^]*?\*\//g;
function of(l) {
  const u = {};
  return l.replace(rf, "").split(ef).forEach((y) => {
    if (y) {
      const w = y.split(nf);
      w.length > 1 && (u[w[0].trim()] = w[1].trim());
    }
  }), u;
}
function fa(l) {
  let u = "";
  if (me(l))
    u = l;
  else if (Dt(l))
    for (let y = 0; y < l.length; y++) {
      const w = fa(l[y]);
      w && (u += w + " ");
    }
  else if (de(l))
    for (const y in l)
      l[y] && (u += y + " ");
  return u.trim();
}
const sf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", af = /* @__PURE__ */ ca(sf);
function Pc(l) {
  return !!l || l === "";
}
const Tc = (l) => !!(l && l.__v_isRef === !0), Lc = (l) => me(l) ? l : l == null ? "" : Dt(l) || de(l) && (l.toString === Oc || !Vt(l.toString)) ? Tc(l) ? Lc(l.value) : JSON.stringify(l, Ac, 2) : String(l), Ac = (l, u) => Tc(u) ? Ac(l, u.value) : ui(u) ? {
  [`Map(${u.size})`]: [...u.entries()].reduce(
    (y, [w, _], C) => (y[zs(w, C) + " =>"] = _, y),
    {}
  )
} : kc(u) ? {
  [`Set(${u.size})`]: [...u.values()].map((y) => zs(y))
} : Wn(u) ? zs(u) : de(u) && !Dt(u) && !Cc(u) ? String(u) : u, zs = (l, u = "") => {
  var y;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Wn(l) ? `Symbol(${(y = l.description) != null ? y : u})` : l
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ae;
class lf {
  constructor(u = !1) {
    this.detached = u, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ae, !u && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let u, y;
      if (this.scopes)
        for (u = 0, y = this.scopes.length; u < y; u++)
          this.scopes[u].pause();
      for (u = 0, y = this.effects.length; u < y; u++)
        this.effects[u].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let u, y;
      if (this.scopes)
        for (u = 0, y = this.scopes.length; u < y; u++)
          this.scopes[u].resume();
      for (u = 0, y = this.effects.length; u < y; u++)
        this.effects[u].resume();
    }
  }
  run(u) {
    if (this._active) {
      const y = Ae;
      try {
        return Ae = this, u();
      } finally {
        Ae = y;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ae = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ae = this.parent;
  }
  stop(u) {
    if (this._active) {
      this._active = !1;
      let y, w;
      for (y = 0, w = this.effects.length; y < w; y++)
        this.effects[y].stop();
      for (this.effects.length = 0, y = 0, w = this.cleanups.length; y < w; y++)
        this.cleanups[y]();
      if (this.cleanups.length = 0, this.scopes) {
        for (y = 0, w = this.scopes.length; y < w; y++)
          this.scopes[y].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !u) {
        const _ = this.parent.scopes.pop();
        _ && _ !== this && (this.parent.scopes[this.index] = _, _.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function cf() {
  return Ae;
}
let le;
const qs = /* @__PURE__ */ new WeakSet();
class Rc {
  constructor(u) {
    this.fn = u, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ae && Ae.active && Ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, qs.has(this) && (qs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Bc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Yl(this), Nc(this);
    const u = le, y = We;
    le = this, We = !0;
    try {
      return this.fn();
    } finally {
      Fc(this), le = u, We = y, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let u = this.deps; u; u = u.nextDep)
        ba(u);
      this.deps = this.depsTail = void 0, Yl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? qs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qs(this) && this.run();
  }
  get dirty() {
    return Qs(this);
  }
}
let Ic = 0, Li, Ai;
function Bc(l, u = !1) {
  if (l.flags |= 8, u) {
    l.next = Ai, Ai = l;
    return;
  }
  l.next = Li, Li = l;
}
function ya() {
  Ic++;
}
function ma() {
  if (--Ic > 0)
    return;
  if (Ai) {
    let u = Ai;
    for (Ai = void 0; u; ) {
      const y = u.next;
      u.next = void 0, u.flags &= -9, u = y;
    }
  }
  let l;
  for (; Li; ) {
    let u = Li;
    for (Li = void 0; u; ) {
      const y = u.next;
      if (u.next = void 0, u.flags &= -9, u.flags & 1)
        try {
          u.trigger();
        } catch (w) {
          l || (l = w);
        }
      u = y;
    }
  }
  if (l) throw l;
}
function Nc(l) {
  for (let u = l.deps; u; u = u.nextDep)
    u.version = -1, u.prevActiveLink = u.dep.activeLink, u.dep.activeLink = u;
}
function Fc(l) {
  let u, y = l.depsTail, w = y;
  for (; w; ) {
    const _ = w.prevDep;
    w.version === -1 ? (w === y && (y = _), ba(w), uf(w)) : u = w, w.dep.activeLink = w.prevActiveLink, w.prevActiveLink = void 0, w = _;
  }
  l.deps = u, l.depsTail = y;
}
function Qs(l) {
  for (let u = l.deps; u; u = u.nextDep)
    if (u.dep.version !== u.version || u.dep.computed && (Dc(u.dep.computed) || u.dep.version !== u.version))
      return !0;
  return !!l._dirty;
}
function Dc(l) {
  if (l.flags & 4 && !(l.flags & 16) || (l.flags &= -17, l.globalVersion === Fi))
    return;
  l.globalVersion = Fi;
  const u = l.dep;
  if (l.flags |= 2, u.version > 0 && !l.isSSR && l.deps && !Qs(l)) {
    l.flags &= -3;
    return;
  }
  const y = le, w = We;
  le = l, We = !0;
  try {
    Nc(l);
    const _ = l.fn(l._value);
    (u.version === 0 || br(_, l._value)) && (l._value = _, u.version++);
  } catch (_) {
    throw u.version++, _;
  } finally {
    le = y, We = w, Fc(l), l.flags &= -3;
  }
}
function ba(l, u = !1) {
  const { dep: y, prevSub: w, nextSub: _ } = l;
  if (w && (w.nextSub = _, l.prevSub = void 0), _ && (_.prevSub = w, l.nextSub = void 0), y.subs === l && (y.subs = w, !w && y.computed)) {
    y.computed.flags &= -5;
    for (let C = y.computed.deps; C; C = C.nextDep)
      ba(C, !0);
  }
  !u && !--y.sc && y.map && y.map.delete(y.key);
}
function uf(l) {
  const { prevDep: u, nextDep: y } = l;
  u && (u.nextDep = y, l.prevDep = void 0), y && (y.prevDep = u, l.nextDep = void 0);
}
let We = !0;
const Mc = [];
function Jn() {
  Mc.push(We), We = !1;
}
function Kn() {
  const l = Mc.pop();
  We = l === void 0 ? !0 : l;
}
function Yl(l) {
  const { cleanup: u } = l;
  if (l.cleanup = void 0, u) {
    const y = le;
    le = void 0;
    try {
      u();
    } finally {
      le = y;
    }
  }
}
let Fi = 0;
class hf {
  constructor(u, y) {
    this.sub = u, this.dep = y, this.version = y.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Hc {
  constructor(u) {
    this.computed = u, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(u) {
    if (!le || !We || le === this.computed)
      return;
    let y = this.activeLink;
    if (y === void 0 || y.sub !== le)
      y = this.activeLink = new hf(le, this), le.deps ? (y.prevDep = le.depsTail, le.depsTail.nextDep = y, le.depsTail = y) : le.deps = le.depsTail = y, Vc(y);
    else if (y.version === -1 && (y.version = this.version, y.nextDep)) {
      const w = y.nextDep;
      w.prevDep = y.prevDep, y.prevDep && (y.prevDep.nextDep = w), y.prevDep = le.depsTail, y.nextDep = void 0, le.depsTail.nextDep = y, le.depsTail = y, le.deps === y && (le.deps = w);
    }
    return y;
  }
  trigger(u) {
    this.version++, Fi++, this.notify(u);
  }
  notify(u) {
    ya();
    try {
      for (let y = this.subs; y; y = y.prevSub)
        y.sub.notify() && y.sub.dep.notify();
    } finally {
      ma();
    }
  }
}
function Vc(l) {
  if (l.dep.sc++, l.sub.flags & 4) {
    const u = l.dep.computed;
    if (u && !l.dep.subs) {
      u.flags |= 20;
      for (let w = u.deps; w; w = w.nextDep)
        Vc(w);
    }
    const y = l.dep.subs;
    y !== l && (l.prevSub = y, y && (y.nextSub = l)), l.dep.subs = l;
  }
}
const Xs = /* @__PURE__ */ new WeakMap(), vr = Symbol(
  ""
), ta = Symbol(
  ""
), Di = Symbol(
  ""
);
function _e(l, u, y) {
  if (We && le) {
    let w = Xs.get(l);
    w || Xs.set(l, w = /* @__PURE__ */ new Map());
    let _ = w.get(y);
    _ || (w.set(y, _ = new Hc()), _.map = w, _.key = y), _.track();
  }
}
function jn(l, u, y, w, _, C) {
  const d = Xs.get(l);
  if (!d) {
    Fi++;
    return;
  }
  const g = (a) => {
    a && a.trigger();
  };
  if (ya(), u === "clear")
    d.forEach(g);
  else {
    const a = Dt(l), p = a && da(y);
    if (a && y === "length") {
      const f = Number(w);
      d.forEach((m, v) => {
        (v === "length" || v === Di || !Wn(v) && v >= f) && g(m);
      });
    } else
      switch ((y !== void 0 || d.has(void 0)) && g(d.get(y)), p && g(d.get(Di)), u) {
        case "add":
          a ? p && g(d.get("length")) : (g(d.get(vr)), ui(l) && g(d.get(ta)));
          break;
        case "delete":
          a || (g(d.get(vr)), ui(l) && g(d.get(ta)));
          break;
        case "set":
          ui(l) && g(d.get(vr));
          break;
      }
  }
  ma();
}
function ai(l) {
  const u = ie(l);
  return u === l ? u : (_e(u, "iterate", Di), un(l) ? u : u.map(Re));
}
function va(l) {
  return _e(l = ie(l), "iterate", Di), l;
}
const df = {
  __proto__: null,
  [Symbol.iterator]() {
    return Us(this, Symbol.iterator, Re);
  },
  concat(...l) {
    return ai(this).concat(
      ...l.map((u) => Dt(u) ? ai(u) : u)
    );
  },
  entries() {
    return Us(this, "entries", (l) => (l[1] = Re(l[1]), l));
  },
  every(l, u) {
    return gn(this, "every", l, u, void 0, arguments);
  },
  filter(l, u) {
    return gn(this, "filter", l, u, (y) => y.map(Re), arguments);
  },
  find(l, u) {
    return gn(this, "find", l, u, Re, arguments);
  },
  findIndex(l, u) {
    return gn(this, "findIndex", l, u, void 0, arguments);
  },
  findLast(l, u) {
    return gn(this, "findLast", l, u, Re, arguments);
  },
  findLastIndex(l, u) {
    return gn(this, "findLastIndex", l, u, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(l, u) {
    return gn(this, "forEach", l, u, void 0, arguments);
  },
  includes(...l) {
    return $s(this, "includes", l);
  },
  indexOf(...l) {
    return $s(this, "indexOf", l);
  },
  join(l) {
    return ai(this).join(l);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...l) {
    return $s(this, "lastIndexOf", l);
  },
  map(l, u) {
    return gn(this, "map", l, u, void 0, arguments);
  },
  pop() {
    return Ei(this, "pop");
  },
  push(...l) {
    return Ei(this, "push", l);
  },
  reduce(l, ...u) {
    return Ql(this, "reduce", l, u);
  },
  reduceRight(l, ...u) {
    return Ql(this, "reduceRight", l, u);
  },
  shift() {
    return Ei(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(l, u) {
    return gn(this, "some", l, u, void 0, arguments);
  },
  splice(...l) {
    return Ei(this, "splice", l);
  },
  toReversed() {
    return ai(this).toReversed();
  },
  toSorted(l) {
    return ai(this).toSorted(l);
  },
  toSpliced(...l) {
    return ai(this).toSpliced(...l);
  },
  unshift(...l) {
    return Ei(this, "unshift", l);
  },
  values() {
    return Us(this, "values", Re);
  }
};
function Us(l, u, y) {
  const w = va(l), _ = w[u]();
  return w !== l && !un(l) && (_._next = _.next, _.next = () => {
    const C = _._next();
    return C.value && (C.value = y(C.value)), C;
  }), _;
}
const pf = Array.prototype;
function gn(l, u, y, w, _, C) {
  const d = va(l), g = d !== l && !un(l), a = d[u];
  if (a !== pf[u]) {
    const m = a.apply(l, C);
    return g ? Re(m) : m;
  }
  let p = y;
  d !== l && (g ? p = function(m, v) {
    return y.call(this, Re(m), v, l);
  } : y.length > 2 && (p = function(m, v) {
    return y.call(this, m, v, l);
  }));
  const f = a.call(d, p, w);
  return g && _ ? _(f) : f;
}
function Ql(l, u, y, w) {
  const _ = va(l);
  let C = y;
  return _ !== l && (un(l) ? y.length > 3 && (C = function(d, g, a) {
    return y.call(this, d, g, a, l);
  }) : C = function(d, g, a) {
    return y.call(this, d, Re(g), a, l);
  }), _[u](C, ...w);
}
function $s(l, u, y) {
  const w = ie(l);
  _e(w, "iterate", Di);
  const _ = w[u](...y);
  return (_ === -1 || _ === !1) && ja(y[0]) ? (y[0] = ie(y[0]), w[u](...y)) : _;
}
function Ei(l, u, y = []) {
  Jn(), ya();
  const w = ie(l)[u].apply(l, y);
  return ma(), Kn(), w;
}
const ff = /* @__PURE__ */ ca("__proto__,__v_isRef,__isVue"), zc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((l) => l !== "arguments" && l !== "caller").map((l) => Symbol[l]).filter(Wn)
);
function yf(l) {
  Wn(l) || (l = String(l));
  const u = ie(this);
  return _e(u, "has", l), u.hasOwnProperty(l);
}
class qc {
  constructor(u = !1, y = !1) {
    this._isReadonly = u, this._isShallow = y;
  }
  get(u, y, w) {
    if (y === "__v_skip") return u.__v_skip;
    const _ = this._isReadonly, C = this._isShallow;
    if (y === "__v_isReactive")
      return !_;
    if (y === "__v_isReadonly")
      return _;
    if (y === "__v_isShallow")
      return C;
    if (y === "__v_raw")
      return w === (_ ? C ? Of : Wc : C ? Gc : $c).get(u) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(u) === Object.getPrototypeOf(w) ? u : void 0;
    const d = Dt(u);
    if (!_) {
      let a;
      if (d && (a = df[y]))
        return a;
      if (y === "hasOwnProperty")
        return yf;
    }
    const g = Reflect.get(
      u,
      y,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ee(u) ? u : w
    );
    return (Wn(y) ? zc.has(y) : ff(y)) || (_ || _e(u, "get", y), C) ? g : Ee(g) ? d && da(y) ? g : g.value : de(g) ? _ ? Jc(g) : _a(g) : g;
  }
}
class Uc extends qc {
  constructor(u = !1) {
    super(!1, u);
  }
  set(u, y, w, _) {
    let C = u[y];
    if (!this._isShallow) {
      const a = pi(C);
      if (!un(w) && !pi(w) && (C = ie(C), w = ie(w)), !Dt(u) && Ee(C) && !Ee(w))
        return a ? !1 : (C.value = w, !0);
    }
    const d = Dt(u) && da(y) ? Number(y) < u.length : Yt(u, y), g = Reflect.set(
      u,
      y,
      w,
      Ee(u) ? u : _
    );
    return u === ie(_) && (d ? br(w, C) && jn(u, "set", y, w) : jn(u, "add", y, w)), g;
  }
  deleteProperty(u, y) {
    const w = Yt(u, y);
    u[y];
    const _ = Reflect.deleteProperty(u, y);
    return _ && w && jn(u, "delete", y, void 0), _;
  }
  has(u, y) {
    const w = Reflect.has(u, y);
    return (!Wn(y) || !zc.has(y)) && _e(u, "has", y), w;
  }
  ownKeys(u) {
    return _e(
      u,
      "iterate",
      Dt(u) ? "length" : vr
    ), Reflect.ownKeys(u);
  }
}
class mf extends qc {
  constructor(u = !1) {
    super(!0, u);
  }
  set(u, y) {
    return !0;
  }
  deleteProperty(u, y) {
    return !0;
  }
}
const bf = /* @__PURE__ */ new Uc(), vf = /* @__PURE__ */ new mf(), gf = /* @__PURE__ */ new Uc(!0);
const ea = (l) => l, co = (l) => Reflect.getPrototypeOf(l);
function _f(l, u, y) {
  return function(...w) {
    const _ = this.__v_raw, C = ie(_), d = ui(C), g = l === "entries" || l === Symbol.iterator && d, a = l === "keys" && d, p = _[l](...w), f = y ? ea : u ? na : Re;
    return !u && _e(
      C,
      "iterate",
      a ? ta : vr
    ), {
      // iterator protocol
      next() {
        const { value: m, done: v } = p.next();
        return v ? { value: m, done: v } : {
          value: g ? [f(m[0]), f(m[1])] : f(m),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function uo(l) {
  return function(...u) {
    return l === "delete" ? !1 : l === "clear" ? void 0 : this;
  };
}
function wf(l, u) {
  const y = {
    get(_) {
      const C = this.__v_raw, d = ie(C), g = ie(_);
      l || (br(_, g) && _e(d, "get", _), _e(d, "get", g));
      const { has: a } = co(d), p = u ? ea : l ? na : Re;
      if (a.call(d, _))
        return p(C.get(_));
      if (a.call(d, g))
        return p(C.get(g));
      C !== d && C.get(_);
    },
    get size() {
      const _ = this.__v_raw;
      return !l && _e(ie(_), "iterate", vr), Reflect.get(_, "size", _);
    },
    has(_) {
      const C = this.__v_raw, d = ie(C), g = ie(_);
      return l || (br(_, g) && _e(d, "has", _), _e(d, "has", g)), _ === g ? C.has(_) : C.has(_) || C.has(g);
    },
    forEach(_, C) {
      const d = this, g = d.__v_raw, a = ie(g), p = u ? ea : l ? na : Re;
      return !l && _e(a, "iterate", vr), g.forEach((f, m) => _.call(C, p(f), p(m), d));
    }
  };
  return Se(
    y,
    l ? {
      add: uo("add"),
      set: uo("set"),
      delete: uo("delete"),
      clear: uo("clear")
    } : {
      add(_) {
        !u && !un(_) && !pi(_) && (_ = ie(_));
        const C = ie(this);
        return co(C).has.call(C, _) || (C.add(_), jn(C, "add", _, _)), this;
      },
      set(_, C) {
        !u && !un(C) && !pi(C) && (C = ie(C));
        const d = ie(this), { has: g, get: a } = co(d);
        let p = g.call(d, _);
        p || (_ = ie(_), p = g.call(d, _));
        const f = a.call(d, _);
        return d.set(_, C), p ? br(C, f) && jn(d, "set", _, C) : jn(d, "add", _, C), this;
      },
      delete(_) {
        const C = ie(this), { has: d, get: g } = co(C);
        let a = d.call(C, _);
        a || (_ = ie(_), a = d.call(C, _)), g && g.call(C, _);
        const p = C.delete(_);
        return a && jn(C, "delete", _, void 0), p;
      },
      clear() {
        const _ = ie(this), C = _.size !== 0, d = _.clear();
        return C && jn(
          _,
          "clear",
          void 0,
          void 0
        ), d;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((_) => {
    y[_] = _f(_, l, u);
  }), y;
}
function ga(l, u) {
  const y = wf(l, u);
  return (w, _, C) => _ === "__v_isReactive" ? !l : _ === "__v_isReadonly" ? l : _ === "__v_raw" ? w : Reflect.get(
    Yt(y, _) && _ in w ? y : w,
    _,
    C
  );
}
const jf = {
  get: /* @__PURE__ */ ga(!1, !1)
}, kf = {
  get: /* @__PURE__ */ ga(!1, !0)
}, xf = {
  get: /* @__PURE__ */ ga(!0, !1)
};
const $c = /* @__PURE__ */ new WeakMap(), Gc = /* @__PURE__ */ new WeakMap(), Wc = /* @__PURE__ */ new WeakMap(), Of = /* @__PURE__ */ new WeakMap();
function Cf(l) {
  switch (l) {
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
function Ef(l) {
  return l.__v_skip || !Object.isExtensible(l) ? 0 : Cf(Yp(l));
}
function _a(l) {
  return pi(l) ? l : wa(
    l,
    !1,
    bf,
    jf,
    $c
  );
}
function Sf(l) {
  return wa(
    l,
    !1,
    gf,
    kf,
    Gc
  );
}
function Jc(l) {
  return wa(
    l,
    !0,
    vf,
    xf,
    Wc
  );
}
function wa(l, u, y, w, _) {
  if (!de(l) || l.__v_raw && !(u && l.__v_isReactive))
    return l;
  const C = _.get(l);
  if (C)
    return C;
  const d = Ef(l);
  if (d === 0)
    return l;
  const g = new Proxy(
    l,
    d === 2 ? w : y
  );
  return _.set(l, g), g;
}
function Ri(l) {
  return pi(l) ? Ri(l.__v_raw) : !!(l && l.__v_isReactive);
}
function pi(l) {
  return !!(l && l.__v_isReadonly);
}
function un(l) {
  return !!(l && l.__v_isShallow);
}
function ja(l) {
  return l ? !!l.__v_raw : !1;
}
function ie(l) {
  const u = l && l.__v_raw;
  return u ? ie(u) : l;
}
function Pf(l) {
  return !Yt(l, "__v_skip") && Object.isExtensible(l) && Sc(l, "__v_skip", !0), l;
}
const Re = (l) => de(l) ? _a(l) : l, na = (l) => de(l) ? Jc(l) : l;
function Ee(l) {
  return l ? l.__v_isRef === !0 : !1;
}
function Tf(l) {
  return Ee(l) ? l.value : l;
}
const Lf = {
  get: (l, u, y) => u === "__v_raw" ? l : Tf(Reflect.get(l, u, y)),
  set: (l, u, y, w) => {
    const _ = l[u];
    return Ee(_) && !Ee(y) ? (_.value = y, !0) : Reflect.set(l, u, y, w);
  }
};
function Kc(l) {
  return Ri(l) ? l : new Proxy(l, Lf);
}
class Af {
  constructor(u, y, w) {
    this.fn = u, this.setter = y, this._value = void 0, this.dep = new Hc(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Fi - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !y, this.isSSR = w;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Bc(this, !0), !0;
  }
  get value() {
    const u = this.dep.track();
    return Dc(this), u && (u.version = this.dep.version), this._value;
  }
  set value(u) {
    this.setter && this.setter(u);
  }
}
function Rf(l, u, y = !1) {
  let w, _;
  return Vt(l) ? w = l : (w = l.get, _ = l.set), new Af(w, _, y);
}
const ho = {}, bo = /* @__PURE__ */ new WeakMap();
let mr;
function If(l, u = !1, y = mr) {
  if (y) {
    let w = bo.get(y);
    w || bo.set(y, w = []), w.push(l);
  }
}
function Bf(l, u, y = ce) {
  const { immediate: w, deep: _, once: C, scheduler: d, augmentJob: g, call: a } = y, p = (L) => _ ? L : un(L) || _ === !1 || _ === 0 ? $n(L, 1) : $n(L);
  let f, m, v, j, O = !1, x = !1;
  if (Ee(l) ? (m = () => l.value, O = un(l)) : Ri(l) ? (m = () => p(l), O = !0) : Dt(l) ? (x = !0, O = l.some((L) => Ri(L) || un(L)), m = () => l.map((L) => {
    if (Ee(L))
      return L.value;
    if (Ri(L))
      return p(L);
    if (Vt(L))
      return a ? a(L, 2) : L();
  })) : Vt(l) ? u ? m = a ? () => a(l, 2) : l : m = () => {
    if (v) {
      Jn();
      try {
        v();
      } finally {
        Kn();
      }
    }
    const L = mr;
    mr = f;
    try {
      return a ? a(l, 3, [j]) : l(j);
    } finally {
      mr = L;
    }
  } : m = cn, u && _) {
    const L = m, D = _ === !0 ? 1 / 0 : _;
    m = () => $n(L(), D);
  }
  const S = cf(), P = () => {
    f.stop(), S && S.active && ha(S.effects, f);
  };
  if (C && u) {
    const L = u;
    u = (...D) => {
      L(...D), P();
    };
  }
  let A = x ? new Array(l.length).fill(ho) : ho;
  const R = (L) => {
    if (!(!(f.flags & 1) || !f.dirty && !L))
      if (u) {
        const D = f.run();
        if (_ || O || (x ? D.some((N, H) => br(N, A[H])) : br(D, A))) {
          v && v();
          const N = mr;
          mr = f;
          try {
            const H = [
              D,
              // pass undefined as the old value when it's changed for the first time
              A === ho ? void 0 : x && A[0] === ho ? [] : A,
              j
            ];
            a ? a(u, 3, H) : (
              // @ts-expect-error
              u(...H)
            ), A = D;
          } finally {
            mr = N;
          }
        }
      } else
        f.run();
  };
  return g && g(R), f = new Rc(m), f.scheduler = d ? () => d(R, !1) : R, j = (L) => If(L, !1, f), v = f.onStop = () => {
    const L = bo.get(f);
    if (L) {
      if (a)
        a(L, 4);
      else
        for (const D of L) D();
      bo.delete(f);
    }
  }, u ? w ? R(!0) : A = f.run() : d ? d(R.bind(null, !0), !0) : f.run(), P.pause = f.pause.bind(f), P.resume = f.resume.bind(f), P.stop = P, P;
}
function $n(l, u = 1 / 0, y) {
  if (u <= 0 || !de(l) || l.__v_skip || (y = y || /* @__PURE__ */ new Set(), y.has(l)))
    return l;
  if (y.add(l), u--, Ee(l))
    $n(l.value, u, y);
  else if (Dt(l))
    for (let w = 0; w < l.length; w++)
      $n(l[w], u, y);
  else if (kc(l) || ui(l))
    l.forEach((w) => {
      $n(w, u, y);
    });
  else if (Cc(l)) {
    for (const w in l)
      $n(l[w], u, y);
    for (const w of Object.getOwnPropertySymbols(l))
      Object.prototype.propertyIsEnumerable.call(l, w) && $n(l[w], u, y);
  }
  return l;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qi(l, u, y, w) {
  try {
    return w ? l(...w) : l();
  } catch (_) {
    Eo(_, u, y);
  }
}
function hn(l, u, y, w) {
  if (Vt(l)) {
    const _ = qi(l, u, y, w);
    return _ && xc(_) && _.catch((C) => {
      Eo(C, u, y);
    }), _;
  }
  if (Dt(l)) {
    const _ = [];
    for (let C = 0; C < l.length; C++)
      _.push(hn(l[C], u, y, w));
    return _;
  }
}
function Eo(l, u, y, w = !0) {
  const _ = u ? u.vnode : null, { errorHandler: C, throwUnhandledErrorInProduction: d } = u && u.appContext.config || ce;
  if (u) {
    let g = u.parent;
    const a = u.proxy, p = `https://vuejs.org/error-reference/#runtime-${y}`;
    for (; g; ) {
      const f = g.ec;
      if (f) {
        for (let m = 0; m < f.length; m++)
          if (f[m](l, a, p) === !1)
            return;
      }
      g = g.parent;
    }
    if (C) {
      Jn(), qi(C, null, 10, [
        l,
        a,
        p
      ]), Kn();
      return;
    }
  }
  Nf(l, y, _, w, d);
}
function Nf(l, u, y, w = !0, _ = !1) {
  if (_)
    throw l;
  console.error(l);
}
const Oe = [];
let sn = -1;
const hi = [];
let qn = null, li = 0;
const Zc = /* @__PURE__ */ Promise.resolve();
let vo = null;
function Ff(l) {
  const u = vo || Zc;
  return l ? u.then(this ? l.bind(this) : l) : u;
}
function Df(l) {
  let u = sn + 1, y = Oe.length;
  for (; u < y; ) {
    const w = u + y >>> 1, _ = Oe[w], C = Mi(_);
    C < l || C === l && _.flags & 2 ? u = w + 1 : y = w;
  }
  return u;
}
function ka(l) {
  if (!(l.flags & 1)) {
    const u = Mi(l), y = Oe[Oe.length - 1];
    !y || // fast path when the job id is larger than the tail
    !(l.flags & 2) && u >= Mi(y) ? Oe.push(l) : Oe.splice(Df(u), 0, l), l.flags |= 1, Yc();
  }
}
function Yc() {
  vo || (vo = Zc.then(Xc));
}
function Mf(l) {
  Dt(l) ? hi.push(...l) : qn && l.id === -1 ? qn.splice(li + 1, 0, l) : l.flags & 1 || (hi.push(l), l.flags |= 1), Yc();
}
function Xl(l, u, y = sn + 1) {
  for (; y < Oe.length; y++) {
    const w = Oe[y];
    if (w && w.flags & 2) {
      if (l && w.id !== l.uid)
        continue;
      Oe.splice(y, 1), y--, w.flags & 4 && (w.flags &= -2), w(), w.flags & 4 || (w.flags &= -2);
    }
  }
}
function Qc(l) {
  if (hi.length) {
    const u = [...new Set(hi)].sort(
      (y, w) => Mi(y) - Mi(w)
    );
    if (hi.length = 0, qn) {
      qn.push(...u);
      return;
    }
    for (qn = u, li = 0; li < qn.length; li++) {
      const y = qn[li];
      y.flags & 4 && (y.flags &= -2), y.flags & 8 || y(), y.flags &= -2;
    }
    qn = null, li = 0;
  }
}
const Mi = (l) => l.id == null ? l.flags & 2 ? -1 : 1 / 0 : l.id;
function Xc(l) {
  try {
    for (sn = 0; sn < Oe.length; sn++) {
      const u = Oe[sn];
      u && !(u.flags & 8) && (u.flags & 4 && (u.flags &= -2), qi(
        u,
        u.i,
        u.i ? 15 : 14
      ), u.flags & 4 || (u.flags &= -2));
    }
  } finally {
    for (; sn < Oe.length; sn++) {
      const u = Oe[sn];
      u && (u.flags &= -2);
    }
    sn = -1, Oe.length = 0, Qc(), vo = null, (Oe.length || hi.length) && Xc();
  }
}
let ln = null, tu = null;
function go(l) {
  const u = ln;
  return ln = l, tu = l && l.type.__scopeId || null, u;
}
function Hf(l, u = ln, y) {
  if (!u || l._n)
    return l;
  const w = (..._) => {
    w._d && lc(-1);
    const C = go(u);
    let d;
    try {
      d = l(..._);
    } finally {
      go(C), w._d && lc(1);
    }
    return d;
  };
  return w._n = !0, w._c = !0, w._d = !0, w;
}
function fr(l, u, y, w) {
  const _ = l.dirs, C = u && u.dirs;
  for (let d = 0; d < _.length; d++) {
    const g = _[d];
    C && (g.oldValue = C[d].value);
    let a = g.dir[w];
    a && (Jn(), hn(a, y, 8, [
      l.el,
      g,
      l,
      u
    ]), Kn());
  }
}
const Vf = Symbol("_vte"), zf = (l) => l.__isTeleport;
function xa(l, u) {
  l.shapeFlag & 6 && l.component ? (l.transition = u, xa(l.component.subTree, u)) : l.shapeFlag & 128 ? (l.ssContent.transition = u.clone(l.ssContent), l.ssFallback.transition = u.clone(l.ssFallback)) : l.transition = u;
}
function eu(l) {
  l.ids = [l.ids[0] + l.ids[2]++ + "-", 0, 0];
}
function _o(l, u, y, w, _ = !1) {
  if (Dt(l)) {
    l.forEach(
      (O, x) => _o(
        O,
        u && (Dt(u) ? u[x] : u),
        y,
        w,
        _
      )
    );
    return;
  }
  if (Ii(w) && !_) {
    w.shapeFlag & 512 && w.type.__asyncResolved && w.component.subTree.component && _o(l, u, y, w.component.subTree);
    return;
  }
  const C = w.shapeFlag & 4 ? Sa(w.component) : w.el, d = _ ? null : C, { i: g, r: a } = l, p = u && u.r, f = g.refs === ce ? g.refs = {} : g.refs, m = g.setupState, v = ie(m), j = m === ce ? () => !1 : (O) => Yt(v, O);
  if (p != null && p !== a && (me(p) ? (f[p] = null, j(p) && (m[p] = null)) : Ee(p) && (p.value = null)), Vt(a))
    qi(a, g, 12, [d, f]);
  else {
    const O = me(a), x = Ee(a);
    if (O || x) {
      const S = () => {
        if (l.f) {
          const P = O ? j(a) ? m[a] : f[a] : a.value;
          _ ? Dt(P) && ha(P, C) : Dt(P) ? P.includes(C) || P.push(C) : O ? (f[a] = [C], j(a) && (m[a] = f[a])) : (a.value = [C], l.k && (f[l.k] = a.value));
        } else O ? (f[a] = d, j(a) && (m[a] = d)) : x && (a.value = d, l.k && (f[l.k] = d));
      };
      d ? (S.id = -1, Le(S, y)) : S();
    }
  }
}
Co().requestIdleCallback;
Co().cancelIdleCallback;
const Ii = (l) => !!l.type.__asyncLoader, nu = (l) => l.type.__isKeepAlive;
function qf(l, u) {
  ru(l, "a", u);
}
function Uf(l, u) {
  ru(l, "da", u);
}
function ru(l, u, y = Ce) {
  const w = l.__wdc || (l.__wdc = () => {
    let _ = y;
    for (; _; ) {
      if (_.isDeactivated)
        return;
      _ = _.parent;
    }
    return l();
  });
  if (So(u, w, y), y) {
    let _ = y.parent;
    for (; _ && _.parent; )
      nu(_.parent.vnode) && $f(w, u, y, _), _ = _.parent;
  }
}
function $f(l, u, y, w) {
  const _ = So(
    u,
    l,
    w,
    !0
    /* prepend */
  );
  iu(() => {
    ha(w[u], _);
  }, y);
}
function So(l, u, y = Ce, w = !1) {
  if (y) {
    const _ = y[l] || (y[l] = []), C = u.__weh || (u.__weh = (...d) => {
      Jn();
      const g = Ui(y), a = hn(u, y, l, d);
      return g(), Kn(), a;
    });
    return w ? _.unshift(C) : _.push(C), C;
  }
}
const kn = (l) => (u, y = Ce) => {
  (!zi || l === "sp") && So(l, (...w) => u(...w), y);
}, Gf = kn("bm"), Wf = kn("m"), Jf = kn(
  "bu"
), Kf = kn("u"), Zf = kn(
  "bum"
), iu = kn("um"), Yf = kn(
  "sp"
), Qf = kn("rtg"), Xf = kn("rtc");
function ty(l, u = Ce) {
  So("ec", l, u);
}
const ey = Symbol.for("v-ndc"), ra = (l) => l ? Ou(l) ? Sa(l) : ra(l.parent) : null, Bi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Se(/* @__PURE__ */ Object.create(null), {
    $: (l) => l,
    $el: (l) => l.vnode.el,
    $data: (l) => l.data,
    $props: (l) => l.props,
    $attrs: (l) => l.attrs,
    $slots: (l) => l.slots,
    $refs: (l) => l.refs,
    $parent: (l) => ra(l.parent),
    $root: (l) => ra(l.root),
    $host: (l) => l.ce,
    $emit: (l) => l.emit,
    $options: (l) => su(l),
    $forceUpdate: (l) => l.f || (l.f = () => {
      ka(l.update);
    }),
    $nextTick: (l) => l.n || (l.n = Ff.bind(l.proxy)),
    $watch: (l) => ky.bind(l)
  })
), Gs = (l, u) => l !== ce && !l.__isScriptSetup && Yt(l, u), ny = {
  get({ _: l }, u) {
    if (u === "__v_skip")
      return !0;
    const { ctx: y, setupState: w, data: _, props: C, accessCache: d, type: g, appContext: a } = l;
    let p;
    if (u[0] !== "$") {
      const j = d[u];
      if (j !== void 0)
        switch (j) {
          case 1:
            return w[u];
          case 2:
            return _[u];
          case 4:
            return y[u];
          case 3:
            return C[u];
        }
      else {
        if (Gs(w, u))
          return d[u] = 1, w[u];
        if (_ !== ce && Yt(_, u))
          return d[u] = 2, _[u];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = l.propsOptions[0]) && Yt(p, u)
        )
          return d[u] = 3, C[u];
        if (y !== ce && Yt(y, u))
          return d[u] = 4, y[u];
        ia && (d[u] = 0);
      }
    }
    const f = Bi[u];
    let m, v;
    if (f)
      return u === "$attrs" && _e(l.attrs, "get", ""), f(l);
    if (
      // css module (injected by vue-loader)
      (m = g.__cssModules) && (m = m[u])
    )
      return m;
    if (y !== ce && Yt(y, u))
      return d[u] = 4, y[u];
    if (
      // global properties
      v = a.config.globalProperties, Yt(v, u)
    )
      return v[u];
  },
  set({ _: l }, u, y) {
    const { data: w, setupState: _, ctx: C } = l;
    return Gs(_, u) ? (_[u] = y, !0) : w !== ce && Yt(w, u) ? (w[u] = y, !0) : Yt(l.props, u) || u[0] === "$" && u.slice(1) in l ? !1 : (C[u] = y, !0);
  },
  has({
    _: { data: l, setupState: u, accessCache: y, ctx: w, appContext: _, propsOptions: C }
  }, d) {
    let g;
    return !!y[d] || l !== ce && Yt(l, d) || Gs(u, d) || (g = C[0]) && Yt(g, d) || Yt(w, d) || Yt(Bi, d) || Yt(_.config.globalProperties, d);
  },
  defineProperty(l, u, y) {
    return y.get != null ? l._.accessCache[u] = 0 : Yt(y, "value") && this.set(l, u, y.value, null), Reflect.defineProperty(l, u, y);
  }
};
function tc(l) {
  return Dt(l) ? l.reduce(
    (u, y) => (u[y] = null, u),
    {}
  ) : l;
}
let ia = !0;
function ry(l) {
  const u = su(l), y = l.proxy, w = l.ctx;
  ia = !1, u.beforeCreate && ec(u.beforeCreate, l, "bc");
  const {
    // state
    data: _,
    computed: C,
    methods: d,
    watch: g,
    provide: a,
    inject: p,
    // lifecycle
    created: f,
    beforeMount: m,
    mounted: v,
    beforeUpdate: j,
    updated: O,
    activated: x,
    deactivated: S,
    beforeDestroy: P,
    beforeUnmount: A,
    destroyed: R,
    unmounted: L,
    render: D,
    renderTracked: N,
    renderTriggered: H,
    errorCaptured: M,
    serverPrefetch: F,
    // public API
    expose: U,
    inheritAttrs: q,
    // assets
    components: Z,
    directives: K,
    filters: tt
  } = u;
  if (p && iy(p, w, null), d)
    for (const rt in d) {
      const lt = d[rt];
      Vt(lt) && (w[rt] = lt.bind(y));
    }
  if (_) {
    const rt = _.call(y, y);
    de(rt) && (l.data = _a(rt));
  }
  if (ia = !0, C)
    for (const rt in C) {
      const lt = C[rt], bt = Vt(lt) ? lt.bind(y, y) : Vt(lt.get) ? lt.get.bind(y, y) : cn, Ct = !Vt(lt) && Vt(lt.set) ? lt.set.bind(y) : cn, St = Wy({
        get: bt,
        set: Ct
      });
      Object.defineProperty(w, rt, {
        enumerable: !0,
        configurable: !0,
        get: () => St.value,
        set: (Pt) => St.value = Pt
      });
    }
  if (g)
    for (const rt in g)
      ou(g[rt], w, y, rt);
  if (a) {
    const rt = Vt(a) ? a.call(y) : a;
    Reflect.ownKeys(rt).forEach((lt) => {
      uy(lt, rt[lt]);
    });
  }
  f && ec(f, l, "c");
  function nt(rt, lt) {
    Dt(lt) ? lt.forEach((bt) => rt(bt.bind(y))) : lt && rt(lt.bind(y));
  }
  if (nt(Gf, m), nt(Wf, v), nt(Jf, j), nt(Kf, O), nt(qf, x), nt(Uf, S), nt(ty, M), nt(Xf, N), nt(Qf, H), nt(Zf, A), nt(iu, L), nt(Yf, F), Dt(U))
    if (U.length) {
      const rt = l.exposed || (l.exposed = {});
      U.forEach((lt) => {
        Object.defineProperty(rt, lt, {
          get: () => y[lt],
          set: (bt) => y[lt] = bt
        });
      });
    } else l.exposed || (l.exposed = {});
  D && l.render === cn && (l.render = D), q != null && (l.inheritAttrs = q), Z && (l.components = Z), K && (l.directives = K), F && eu(l);
}
function iy(l, u, y = cn) {
  Dt(l) && (l = oa(l));
  for (const w in l) {
    const _ = l[w];
    let C;
    de(_) ? "default" in _ ? C = po(
      _.from || w,
      _.default,
      !0
    ) : C = po(_.from || w) : C = po(_), Ee(C) ? Object.defineProperty(u, w, {
      enumerable: !0,
      configurable: !0,
      get: () => C.value,
      set: (d) => C.value = d
    }) : u[w] = C;
  }
}
function ec(l, u, y) {
  hn(
    Dt(l) ? l.map((w) => w.bind(u.proxy)) : l.bind(u.proxy),
    u,
    y
  );
}
function ou(l, u, y, w) {
  let _ = w.includes(".") ? _u(y, w) : () => y[w];
  if (me(l)) {
    const C = u[l];
    Vt(C) && Js(_, C);
  } else if (Vt(l))
    Js(_, l.bind(y));
  else if (de(l))
    if (Dt(l))
      l.forEach((C) => ou(C, u, y, w));
    else {
      const C = Vt(l.handler) ? l.handler.bind(y) : u[l.handler];
      Vt(C) && Js(_, C, l);
    }
}
function su(l) {
  const u = l.type, { mixins: y, extends: w } = u, {
    mixins: _,
    optionsCache: C,
    config: { optionMergeStrategies: d }
  } = l.appContext, g = C.get(u);
  let a;
  return g ? a = g : !_.length && !y && !w ? a = u : (a = {}, _.length && _.forEach(
    (p) => wo(a, p, d, !0)
  ), wo(a, u, d)), de(u) && C.set(u, a), a;
}
function wo(l, u, y, w = !1) {
  const { mixins: _, extends: C } = u;
  C && wo(l, C, y, !0), _ && _.forEach(
    (d) => wo(l, d, y, !0)
  );
  for (const d in u)
    if (!(w && d === "expose")) {
      const g = oy[d] || y && y[d];
      l[d] = g ? g(l[d], u[d]) : u[d];
    }
  return l;
}
const oy = {
  data: nc,
  props: rc,
  emits: rc,
  // objects
  methods: Pi,
  computed: Pi,
  // lifecycle
  beforeCreate: xe,
  created: xe,
  beforeMount: xe,
  mounted: xe,
  beforeUpdate: xe,
  updated: xe,
  beforeDestroy: xe,
  beforeUnmount: xe,
  destroyed: xe,
  unmounted: xe,
  activated: xe,
  deactivated: xe,
  errorCaptured: xe,
  serverPrefetch: xe,
  // assets
  components: Pi,
  directives: Pi,
  // watch
  watch: ay,
  // provide / inject
  provide: nc,
  inject: sy
};
function nc(l, u) {
  return u ? l ? function() {
    return Se(
      Vt(l) ? l.call(this, this) : l,
      Vt(u) ? u.call(this, this) : u
    );
  } : u : l;
}
function sy(l, u) {
  return Pi(oa(l), oa(u));
}
function oa(l) {
  if (Dt(l)) {
    const u = {};
    for (let y = 0; y < l.length; y++)
      u[l[y]] = l[y];
    return u;
  }
  return l;
}
function xe(l, u) {
  return l ? [...new Set([].concat(l, u))] : u;
}
function Pi(l, u) {
  return l ? Se(/* @__PURE__ */ Object.create(null), l, u) : u;
}
function rc(l, u) {
  return l ? Dt(l) && Dt(u) ? [.../* @__PURE__ */ new Set([...l, ...u])] : Se(
    /* @__PURE__ */ Object.create(null),
    tc(l),
    tc(u ?? {})
  ) : u;
}
function ay(l, u) {
  if (!l) return u;
  if (!u) return l;
  const y = Se(/* @__PURE__ */ Object.create(null), l);
  for (const w in u)
    y[w] = xe(l[w], u[w]);
  return y;
}
function au() {
  return {
    app: null,
    config: {
      isNativeTag: Kp,
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
let ly = 0;
function cy(l, u) {
  return function(w, _ = null) {
    Vt(w) || (w = Se({}, w)), _ != null && !de(_) && (_ = null);
    const C = au(), d = /* @__PURE__ */ new WeakSet(), g = [];
    let a = !1;
    const p = C.app = {
      _uid: ly++,
      _component: w,
      _props: _,
      _container: null,
      _context: C,
      _instance: null,
      version: Jy,
      get config() {
        return C.config;
      },
      set config(f) {
      },
      use(f, ...m) {
        return d.has(f) || (f && Vt(f.install) ? (d.add(f), f.install(p, ...m)) : Vt(f) && (d.add(f), f(p, ...m))), p;
      },
      mixin(f) {
        return C.mixins.includes(f) || C.mixins.push(f), p;
      },
      component(f, m) {
        return m ? (C.components[f] = m, p) : C.components[f];
      },
      directive(f, m) {
        return m ? (C.directives[f] = m, p) : C.directives[f];
      },
      mount(f, m, v) {
        if (!a) {
          const j = p._ceVNode || gr(w, _);
          return j.appContext = C, v === !0 ? v = "svg" : v === !1 && (v = void 0), l(j, f, v), a = !0, p._container = f, f.__vue_app__ = p, Sa(j.component);
        }
      },
      onUnmount(f) {
        g.push(f);
      },
      unmount() {
        a && (hn(
          g,
          p._instance,
          16
        ), l(null, p._container), delete p._container.__vue_app__);
      },
      provide(f, m) {
        return C.provides[f] = m, p;
      },
      runWithContext(f) {
        const m = di;
        di = p;
        try {
          return f();
        } finally {
          di = m;
        }
      }
    };
    return p;
  };
}
let di = null;
function uy(l, u) {
  if (Ce) {
    let y = Ce.provides;
    const w = Ce.parent && Ce.parent.provides;
    w === y && (y = Ce.provides = Object.create(w)), y[l] = u;
  }
}
function po(l, u, y = !1) {
  const w = Ce || ln;
  if (w || di) {
    const _ = di ? di._context.provides : w ? w.parent == null ? w.vnode.appContext && w.vnode.appContext.provides : w.parent.provides : void 0;
    if (_ && l in _)
      return _[l];
    if (arguments.length > 1)
      return y && Vt(u) ? u.call(w && w.proxy) : u;
  }
}
const lu = {}, cu = () => Object.create(lu), uu = (l) => Object.getPrototypeOf(l) === lu;
function hy(l, u, y, w = !1) {
  const _ = {}, C = cu();
  l.propsDefaults = /* @__PURE__ */ Object.create(null), hu(l, u, _, C);
  for (const d in l.propsOptions[0])
    d in _ || (_[d] = void 0);
  y ? l.props = w ? _ : Sf(_) : l.type.props ? l.props = _ : l.props = C, l.attrs = C;
}
function dy(l, u, y, w) {
  const {
    props: _,
    attrs: C,
    vnode: { patchFlag: d }
  } = l, g = ie(_), [a] = l.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (w || d > 0) && !(d & 16)
  ) {
    if (d & 8) {
      const f = l.vnode.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        let v = f[m];
        if (Po(l.emitsOptions, v))
          continue;
        const j = u[v];
        if (a)
          if (Yt(C, v))
            j !== C[v] && (C[v] = j, p = !0);
          else {
            const O = Gn(v);
            _[O] = sa(
              a,
              g,
              O,
              j,
              l,
              !1
            );
          }
        else
          j !== C[v] && (C[v] = j, p = !0);
      }
    }
  } else {
    hu(l, u, _, C) && (p = !0);
    let f;
    for (const m in g)
      (!u || // for camelCase
      !Yt(u, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = _r(m)) === m || !Yt(u, f))) && (a ? y && // for camelCase
      (y[m] !== void 0 || // for kebab-case
      y[f] !== void 0) && (_[m] = sa(
        a,
        g,
        m,
        void 0,
        l,
        !0
      )) : delete _[m]);
    if (C !== g)
      for (const m in C)
        (!u || !Yt(u, m)) && (delete C[m], p = !0);
  }
  p && jn(l.attrs, "set", "");
}
function hu(l, u, y, w) {
  const [_, C] = l.propsOptions;
  let d = !1, g;
  if (u)
    for (let a in u) {
      if (Ti(a))
        continue;
      const p = u[a];
      let f;
      _ && Yt(_, f = Gn(a)) ? !C || !C.includes(f) ? y[f] = p : (g || (g = {}))[f] = p : Po(l.emitsOptions, a) || (!(a in w) || p !== w[a]) && (w[a] = p, d = !0);
    }
  if (C) {
    const a = ie(y), p = g || ce;
    for (let f = 0; f < C.length; f++) {
      const m = C[f];
      y[m] = sa(
        _,
        a,
        m,
        p[m],
        l,
        !Yt(p, m)
      );
    }
  }
  return d;
}
function sa(l, u, y, w, _, C) {
  const d = l[y];
  if (d != null) {
    const g = Yt(d, "default");
    if (g && w === void 0) {
      const a = d.default;
      if (d.type !== Function && !d.skipFactory && Vt(a)) {
        const { propsDefaults: p } = _;
        if (y in p)
          w = p[y];
        else {
          const f = Ui(_);
          w = p[y] = a.call(
            null,
            u
          ), f();
        }
      } else
        w = a;
      _.ce && _.ce._setProp(y, w);
    }
    d[
      0
      /* shouldCast */
    ] && (C && !g ? w = !1 : d[
      1
      /* shouldCastTrue */
    ] && (w === "" || w === _r(y)) && (w = !0));
  }
  return w;
}
const py = /* @__PURE__ */ new WeakMap();
function du(l, u, y = !1) {
  const w = y ? py : u.propsCache, _ = w.get(l);
  if (_)
    return _;
  const C = l.props, d = {}, g = [];
  let a = !1;
  if (!Vt(l)) {
    const f = (m) => {
      a = !0;
      const [v, j] = du(m, u, !0);
      Se(d, v), j && g.push(...j);
    };
    !y && u.mixins.length && u.mixins.forEach(f), l.extends && f(l.extends), l.mixins && l.mixins.forEach(f);
  }
  if (!C && !a)
    return de(l) && w.set(l, ci), ci;
  if (Dt(C))
    for (let f = 0; f < C.length; f++) {
      const m = Gn(C[f]);
      ic(m) && (d[m] = ce);
    }
  else if (C)
    for (const f in C) {
      const m = Gn(f);
      if (ic(m)) {
        const v = C[f], j = d[m] = Dt(v) || Vt(v) ? { type: v } : Se({}, v), O = j.type;
        let x = !1, S = !0;
        if (Dt(O))
          for (let P = 0; P < O.length; ++P) {
            const A = O[P], R = Vt(A) && A.name;
            if (R === "Boolean") {
              x = !0;
              break;
            } else R === "String" && (S = !1);
          }
        else
          x = Vt(O) && O.name === "Boolean";
        j[
          0
          /* shouldCast */
        ] = x, j[
          1
          /* shouldCastTrue */
        ] = S, (x || Yt(j, "default")) && g.push(m);
      }
    }
  const p = [d, g];
  return de(l) && w.set(l, p), p;
}
function ic(l) {
  return l[0] !== "$" && !Ti(l);
}
const pu = (l) => l[0] === "_" || l === "$stable", Oa = (l) => Dt(l) ? l.map(an) : [an(l)], fy = (l, u, y) => {
  if (u._n)
    return u;
  const w = Hf((..._) => Oa(u(..._)), y);
  return w._c = !1, w;
}, fu = (l, u, y) => {
  const w = l._ctx;
  for (const _ in l) {
    if (pu(_)) continue;
    const C = l[_];
    if (Vt(C))
      u[_] = fy(_, C, w);
    else if (C != null) {
      const d = Oa(C);
      u[_] = () => d;
    }
  }
}, yu = (l, u) => {
  const y = Oa(u);
  l.slots.default = () => y;
}, mu = (l, u, y) => {
  for (const w in u)
    (y || w !== "_") && (l[w] = u[w]);
}, yy = (l, u, y) => {
  const w = l.slots = cu();
  if (l.vnode.shapeFlag & 32) {
    const _ = u._;
    _ ? (mu(w, u, y), y && Sc(w, "_", _, !0)) : fu(u, w);
  } else u && yu(l, u);
}, my = (l, u, y) => {
  const { vnode: w, slots: _ } = l;
  let C = !0, d = ce;
  if (w.shapeFlag & 32) {
    const g = u._;
    g ? y && g === 1 ? C = !1 : mu(_, u, y) : (C = !u.$stable, fu(u, _)), d = u;
  } else u && (yu(l, u), d = { default: 1 });
  if (C)
    for (const g in _)
      !pu(g) && d[g] == null && delete _[g];
}, Le = Ty;
function by(l) {
  return vy(l);
}
function vy(l, u) {
  const y = Co();
  y.__VUE__ = !0;
  const {
    insert: w,
    remove: _,
    patchProp: C,
    createElement: d,
    createText: g,
    createComment: a,
    setText: p,
    setElementText: f,
    parentNode: m,
    nextSibling: v,
    setScopeId: j = cn,
    insertStaticContent: O
  } = l, x = (T, B, G, Y = null, et = null, it = null, ht = void 0, ft = null, ut = !!B.dynamicChildren) => {
    if (T === B)
      return;
    T && !Si(T, B) && (Y = Qt(T), Pt(T, et, it, !0), T = null), B.patchFlag === -2 && (ut = !1, B.dynamicChildren = null);
    const { type: st, ref: wt, shapeFlag: yt } = B;
    switch (st) {
      case To:
        S(T, B, G, Y);
        break;
      case Hi:
        P(T, B, G, Y);
        break;
      case Ks:
        T == null && A(B, G, Y, ht);
        break;
      case wn:
        Z(
          T,
          B,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut
        );
        break;
      default:
        yt & 1 ? D(
          T,
          B,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut
        ) : yt & 6 ? K(
          T,
          B,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut
        ) : (yt & 64 || yt & 128) && st.process(
          T,
          B,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut,
          Lt
        );
    }
    wt != null && et && _o(wt, T && T.ref, it, B || T, !B);
  }, S = (T, B, G, Y) => {
    if (T == null)
      w(
        B.el = g(B.children),
        G,
        Y
      );
    else {
      const et = B.el = T.el;
      B.children !== T.children && p(et, B.children);
    }
  }, P = (T, B, G, Y) => {
    T == null ? w(
      B.el = a(B.children || ""),
      G,
      Y
    ) : B.el = T.el;
  }, A = (T, B, G, Y) => {
    [T.el, T.anchor] = O(
      T.children,
      B,
      G,
      Y,
      T.el,
      T.anchor
    );
  }, R = ({ el: T, anchor: B }, G, Y) => {
    let et;
    for (; T && T !== B; )
      et = v(T), w(T, G, Y), T = et;
    w(B, G, Y);
  }, L = ({ el: T, anchor: B }) => {
    let G;
    for (; T && T !== B; )
      G = v(T), _(T), T = G;
    _(B);
  }, D = (T, B, G, Y, et, it, ht, ft, ut) => {
    B.type === "svg" ? ht = "svg" : B.type === "math" && (ht = "mathml"), T == null ? N(
      B,
      G,
      Y,
      et,
      it,
      ht,
      ft,
      ut
    ) : F(
      T,
      B,
      et,
      it,
      ht,
      ft,
      ut
    );
  }, N = (T, B, G, Y, et, it, ht, ft) => {
    let ut, st;
    const { props: wt, shapeFlag: yt, transition: _t, dirs: Q } = T;
    if (ut = T.el = d(
      T.type,
      it,
      wt && wt.is,
      wt
    ), yt & 8 ? f(ut, T.children) : yt & 16 && M(
      T.children,
      ut,
      null,
      Y,
      et,
      Ws(T, it),
      ht,
      ft
    ), Q && fr(T, null, Y, "created"), H(ut, T, T.scopeId, ht, Y), wt) {
      for (const mt in wt)
        mt !== "value" && !Ti(mt) && C(ut, mt, null, wt[mt], it, Y);
      "value" in wt && C(ut, "value", null, wt.value, it), (st = wt.onVnodeBeforeMount) && on(st, Y, T);
    }
    Q && fr(T, null, Y, "beforeMount");
    const ct = gy(et, _t);
    ct && _t.beforeEnter(ut), w(ut, B, G), ((st = wt && wt.onVnodeMounted) || ct || Q) && Le(() => {
      st && on(st, Y, T), ct && _t.enter(ut), Q && fr(T, null, Y, "mounted");
    }, et);
  }, H = (T, B, G, Y, et) => {
    if (G && j(T, G), Y)
      for (let it = 0; it < Y.length; it++)
        j(T, Y[it]);
    if (et) {
      let it = et.subTree;
      if (B === it || ju(it.type) && (it.ssContent === B || it.ssFallback === B)) {
        const ht = et.vnode;
        H(
          T,
          ht,
          ht.scopeId,
          ht.slotScopeIds,
          et.parent
        );
      }
    }
  }, M = (T, B, G, Y, et, it, ht, ft, ut = 0) => {
    for (let st = ut; st < T.length; st++) {
      const wt = T[st] = ft ? Un(T[st]) : an(T[st]);
      x(
        null,
        wt,
        B,
        G,
        Y,
        et,
        it,
        ht,
        ft
      );
    }
  }, F = (T, B, G, Y, et, it, ht) => {
    const ft = B.el = T.el;
    let { patchFlag: ut, dynamicChildren: st, dirs: wt } = B;
    ut |= T.patchFlag & 16;
    const yt = T.props || ce, _t = B.props || ce;
    let Q;
    if (G && yr(G, !1), (Q = _t.onVnodeBeforeUpdate) && on(Q, G, B, T), wt && fr(B, T, G, "beforeUpdate"), G && yr(G, !0), (yt.innerHTML && _t.innerHTML == null || yt.textContent && _t.textContent == null) && f(ft, ""), st ? U(
      T.dynamicChildren,
      st,
      ft,
      G,
      Y,
      Ws(B, et),
      it
    ) : ht || lt(
      T,
      B,
      ft,
      null,
      G,
      Y,
      Ws(B, et),
      it,
      !1
    ), ut > 0) {
      if (ut & 16)
        q(ft, yt, _t, G, et);
      else if (ut & 2 && yt.class !== _t.class && C(ft, "class", null, _t.class, et), ut & 4 && C(ft, "style", yt.style, _t.style, et), ut & 8) {
        const ct = B.dynamicProps;
        for (let mt = 0; mt < ct.length; mt++) {
          const Ot = ct[mt], Bt = yt[Ot], Kt = _t[Ot];
          (Kt !== Bt || Ot === "value") && C(ft, Ot, Bt, Kt, et, G);
        }
      }
      ut & 1 && T.children !== B.children && f(ft, B.children);
    } else !ht && st == null && q(ft, yt, _t, G, et);
    ((Q = _t.onVnodeUpdated) || wt) && Le(() => {
      Q && on(Q, G, B, T), wt && fr(B, T, G, "updated");
    }, Y);
  }, U = (T, B, G, Y, et, it, ht) => {
    for (let ft = 0; ft < B.length; ft++) {
      const ut = T[ft], st = B[ft], wt = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ut.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ut.type === wn || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Si(ut, st) || // - In the case of a component, it could contain anything.
        ut.shapeFlag & 70) ? m(ut.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          G
        )
      );
      x(
        ut,
        st,
        wt,
        null,
        Y,
        et,
        it,
        ht,
        !0
      );
    }
  }, q = (T, B, G, Y, et) => {
    if (B !== G) {
      if (B !== ce)
        for (const it in B)
          !Ti(it) && !(it in G) && C(
            T,
            it,
            B[it],
            null,
            et,
            Y
          );
      for (const it in G) {
        if (Ti(it)) continue;
        const ht = G[it], ft = B[it];
        ht !== ft && it !== "value" && C(T, it, ft, ht, et, Y);
      }
      "value" in G && C(T, "value", B.value, G.value, et);
    }
  }, Z = (T, B, G, Y, et, it, ht, ft, ut) => {
    const st = B.el = T ? T.el : g(""), wt = B.anchor = T ? T.anchor : g("");
    let { patchFlag: yt, dynamicChildren: _t, slotScopeIds: Q } = B;
    Q && (ft = ft ? ft.concat(Q) : Q), T == null ? (w(st, G, Y), w(wt, G, Y), M(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      B.children || [],
      G,
      wt,
      et,
      it,
      ht,
      ft,
      ut
    )) : yt > 0 && yt & 64 && _t && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    T.dynamicChildren ? (U(
      T.dynamicChildren,
      _t,
      G,
      et,
      it,
      ht,
      ft
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (B.key != null || et && B === et.subTree) && bu(
      T,
      B,
      !0
      /* shallow */
    )) : lt(
      T,
      B,
      G,
      wt,
      et,
      it,
      ht,
      ft,
      ut
    );
  }, K = (T, B, G, Y, et, it, ht, ft, ut) => {
    B.slotScopeIds = ft, T == null ? B.shapeFlag & 512 ? et.ctx.activate(
      B,
      G,
      Y,
      ht,
      ut
    ) : tt(
      B,
      G,
      Y,
      et,
      it,
      ht,
      ut
    ) : at(T, B, ut);
  }, tt = (T, B, G, Y, et, it, ht) => {
    const ft = T.component = Vy(
      T,
      Y,
      et
    );
    if (nu(T) && (ft.ctx.renderer = Lt), zy(ft, !1, ht), ft.asyncDep) {
      if (et && et.registerDep(ft, nt, ht), !T.el) {
        const ut = ft.subTree = gr(Hi);
        P(null, ut, B, G);
      }
    } else
      nt(
        ft,
        T,
        B,
        G,
        et,
        it,
        ht
      );
  }, at = (T, B, G) => {
    const Y = B.component = T.component;
    if (Sy(T, B, G))
      if (Y.asyncDep && !Y.asyncResolved) {
        rt(Y, B, G);
        return;
      } else
        Y.next = B, Y.update();
    else
      B.el = T.el, Y.vnode = B;
  }, nt = (T, B, G, Y, et, it, ht) => {
    const ft = () => {
      if (T.isMounted) {
        let { next: yt, bu: _t, u: Q, parent: ct, vnode: mt } = T;
        {
          const Xt = vu(T);
          if (Xt) {
            yt && (yt.el = mt.el, rt(T, yt, ht)), Xt.asyncDep.then(() => {
              T.isUnmounted || ft();
            });
            return;
          }
        }
        let Ot = yt, Bt;
        yr(T, !1), yt ? (yt.el = mt.el, rt(T, yt, ht)) : yt = mt, _t && Vs(_t), (Bt = yt.props && yt.props.onVnodeBeforeUpdate) && on(Bt, ct, yt, mt), yr(T, !0);
        const Kt = sc(T), ne = T.subTree;
        T.subTree = Kt, x(
          ne,
          Kt,
          // parent may have changed if it's in a teleport
          m(ne.el),
          // anchor may have changed if it's in a fragment
          Qt(ne),
          T,
          et,
          it
        ), yt.el = Kt.el, Ot === null && Py(T, Kt.el), Q && Le(Q, et), (Bt = yt.props && yt.props.onVnodeUpdated) && Le(
          () => on(Bt, ct, yt, mt),
          et
        );
      } else {
        let yt;
        const { el: _t, props: Q } = B, { bm: ct, m: mt, parent: Ot, root: Bt, type: Kt } = T, ne = Ii(B);
        yr(T, !1), ct && Vs(ct), !ne && (yt = Q && Q.onVnodeBeforeMount) && on(yt, Ot, B), yr(T, !0);
        {
          Bt.ce && Bt.ce._injectChildStyle(Kt);
          const Xt = T.subTree = sc(T);
          x(
            null,
            Xt,
            G,
            Y,
            T,
            et,
            it
          ), B.el = Xt.el;
        }
        if (mt && Le(mt, et), !ne && (yt = Q && Q.onVnodeMounted)) {
          const Xt = B;
          Le(
            () => on(yt, Ot, Xt),
            et
          );
        }
        (B.shapeFlag & 256 || Ot && Ii(Ot.vnode) && Ot.vnode.shapeFlag & 256) && T.a && Le(T.a, et), T.isMounted = !0, B = G = Y = null;
      }
    };
    T.scope.on();
    const ut = T.effect = new Rc(ft);
    T.scope.off();
    const st = T.update = ut.run.bind(ut), wt = T.job = ut.runIfDirty.bind(ut);
    wt.i = T, wt.id = T.uid, ut.scheduler = () => ka(wt), yr(T, !0), st();
  }, rt = (T, B, G) => {
    B.component = T;
    const Y = T.vnode.props;
    T.vnode = B, T.next = null, dy(T, B.props, Y, G), my(T, B.children, G), Jn(), Xl(T), Kn();
  }, lt = (T, B, G, Y, et, it, ht, ft, ut = !1) => {
    const st = T && T.children, wt = T ? T.shapeFlag : 0, yt = B.children, { patchFlag: _t, shapeFlag: Q } = B;
    if (_t > 0) {
      if (_t & 128) {
        Ct(
          st,
          yt,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut
        );
        return;
      } else if (_t & 256) {
        bt(
          st,
          yt,
          G,
          Y,
          et,
          it,
          ht,
          ft,
          ut
        );
        return;
      }
    }
    Q & 8 ? (wt & 16 && Gt(st, et, it), yt !== st && f(G, yt)) : wt & 16 ? Q & 16 ? Ct(
      st,
      yt,
      G,
      Y,
      et,
      it,
      ht,
      ft,
      ut
    ) : Gt(st, et, it, !0) : (wt & 8 && f(G, ""), Q & 16 && M(
      yt,
      G,
      Y,
      et,
      it,
      ht,
      ft,
      ut
    ));
  }, bt = (T, B, G, Y, et, it, ht, ft, ut) => {
    T = T || ci, B = B || ci;
    const st = T.length, wt = B.length, yt = Math.min(st, wt);
    let _t;
    for (_t = 0; _t < yt; _t++) {
      const Q = B[_t] = ut ? Un(B[_t]) : an(B[_t]);
      x(
        T[_t],
        Q,
        G,
        null,
        et,
        it,
        ht,
        ft,
        ut
      );
    }
    st > wt ? Gt(
      T,
      et,
      it,
      !0,
      !1,
      yt
    ) : M(
      B,
      G,
      Y,
      et,
      it,
      ht,
      ft,
      ut,
      yt
    );
  }, Ct = (T, B, G, Y, et, it, ht, ft, ut) => {
    let st = 0;
    const wt = B.length;
    let yt = T.length - 1, _t = wt - 1;
    for (; st <= yt && st <= _t; ) {
      const Q = T[st], ct = B[st] = ut ? Un(B[st]) : an(B[st]);
      if (Si(Q, ct))
        x(
          Q,
          ct,
          G,
          null,
          et,
          it,
          ht,
          ft,
          ut
        );
      else
        break;
      st++;
    }
    for (; st <= yt && st <= _t; ) {
      const Q = T[yt], ct = B[_t] = ut ? Un(B[_t]) : an(B[_t]);
      if (Si(Q, ct))
        x(
          Q,
          ct,
          G,
          null,
          et,
          it,
          ht,
          ft,
          ut
        );
      else
        break;
      yt--, _t--;
    }
    if (st > yt) {
      if (st <= _t) {
        const Q = _t + 1, ct = Q < wt ? B[Q].el : Y;
        for (; st <= _t; )
          x(
            null,
            B[st] = ut ? Un(B[st]) : an(B[st]),
            G,
            ct,
            et,
            it,
            ht,
            ft,
            ut
          ), st++;
      }
    } else if (st > _t)
      for (; st <= yt; )
        Pt(T[st], et, it, !0), st++;
    else {
      const Q = st, ct = st, mt = /* @__PURE__ */ new Map();
      for (st = ct; st <= _t; st++) {
        const te = B[st] = ut ? Un(B[st]) : an(B[st]);
        te.key != null && mt.set(te.key, st);
      }
      let Ot, Bt = 0;
      const Kt = _t - ct + 1;
      let ne = !1, Xt = 0;
      const re = new Array(Kt);
      for (st = 0; st < Kt; st++) re[st] = 0;
      for (st = Q; st <= yt; st++) {
        const te = T[st];
        if (Bt >= Kt) {
          Pt(te, et, it, !0);
          continue;
        }
        let ee;
        if (te.key != null)
          ee = mt.get(te.key);
        else
          for (Ot = ct; Ot <= _t; Ot++)
            if (re[Ot - ct] === 0 && Si(te, B[Ot])) {
              ee = Ot;
              break;
            }
        ee === void 0 ? Pt(te, et, it, !0) : (re[ee - ct] = st + 1, ee >= Xt ? Xt = ee : ne = !0, x(
          te,
          B[ee],
          G,
          null,
          et,
          it,
          ht,
          ft,
          ut
        ), Bt++);
      }
      const pe = ne ? _y(re) : ci;
      for (Ot = pe.length - 1, st = Kt - 1; st >= 0; st--) {
        const te = ct + st, ee = B[te], Zn = te + 1 < wt ? B[te + 1].el : Y;
        re[st] === 0 ? x(
          null,
          ee,
          G,
          Zn,
          et,
          it,
          ht,
          ft,
          ut
        ) : ne && (Ot < 0 || st !== pe[Ot] ? St(ee, G, Zn, 2) : Ot--);
      }
    }
  }, St = (T, B, G, Y, et = null) => {
    const { el: it, type: ht, transition: ft, children: ut, shapeFlag: st } = T;
    if (st & 6) {
      St(T.component.subTree, B, G, Y);
      return;
    }
    if (st & 128) {
      T.suspense.move(B, G, Y);
      return;
    }
    if (st & 64) {
      ht.move(T, B, G, Lt);
      return;
    }
    if (ht === wn) {
      w(it, B, G);
      for (let yt = 0; yt < ut.length; yt++)
        St(ut[yt], B, G, Y);
      w(T.anchor, B, G);
      return;
    }
    if (ht === Ks) {
      R(T, B, G);
      return;
    }
    if (Y !== 2 && st & 1 && ft)
      if (Y === 0)
        ft.beforeEnter(it), w(it, B, G), Le(() => ft.enter(it), et);
      else {
        const { leave: yt, delayLeave: _t, afterLeave: Q } = ft, ct = () => w(it, B, G), mt = () => {
          yt(it, () => {
            ct(), Q && Q();
          });
        };
        _t ? _t(it, ct, mt) : mt();
      }
    else
      w(it, B, G);
  }, Pt = (T, B, G, Y = !1, et = !1) => {
    const {
      type: it,
      props: ht,
      ref: ft,
      children: ut,
      dynamicChildren: st,
      shapeFlag: wt,
      patchFlag: yt,
      dirs: _t,
      cacheIndex: Q
    } = T;
    if (yt === -2 && (et = !1), ft != null && _o(ft, null, G, T, !0), Q != null && (B.renderCache[Q] = void 0), wt & 256) {
      B.ctx.deactivate(T);
      return;
    }
    const ct = wt & 1 && _t, mt = !Ii(T);
    let Ot;
    if (mt && (Ot = ht && ht.onVnodeBeforeUnmount) && on(Ot, B, T), wt & 6)
      Et(T.component, G, Y);
    else {
      if (wt & 128) {
        T.suspense.unmount(G, Y);
        return;
      }
      ct && fr(T, null, B, "beforeUnmount"), wt & 64 ? T.type.remove(
        T,
        B,
        G,
        Lt,
        Y
      ) : st && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !st.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (it !== wn || yt > 0 && yt & 64) ? Gt(
        st,
        B,
        G,
        !1,
        !0
      ) : (it === wn && yt & 384 || !et && wt & 16) && Gt(ut, B, G), Y && pt(T);
    }
    (mt && (Ot = ht && ht.onVnodeUnmounted) || ct) && Le(() => {
      Ot && on(Ot, B, T), ct && fr(T, null, B, "unmounted");
    }, G);
  }, pt = (T) => {
    const { type: B, el: G, anchor: Y, transition: et } = T;
    if (B === wn) {
      Tt(G, Y);
      return;
    }
    if (B === Ks) {
      L(T);
      return;
    }
    const it = () => {
      _(G), et && !et.persisted && et.afterLeave && et.afterLeave();
    };
    if (T.shapeFlag & 1 && et && !et.persisted) {
      const { leave: ht, delayLeave: ft } = et, ut = () => ht(G, it);
      ft ? ft(T.el, it, ut) : ut();
    } else
      it();
  }, Tt = (T, B) => {
    let G;
    for (; T !== B; )
      G = v(T), _(T), T = G;
    _(B);
  }, Et = (T, B, G) => {
    const { bum: Y, scope: et, job: it, subTree: ht, um: ft, m: ut, a: st } = T;
    oc(ut), oc(st), Y && Vs(Y), et.stop(), it && (it.flags |= 8, Pt(ht, T, B, G)), ft && Le(ft, B), Le(() => {
      T.isUnmounted = !0;
    }, B), B && B.pendingBranch && !B.isUnmounted && T.asyncDep && !T.asyncResolved && T.suspenseId === B.pendingId && (B.deps--, B.deps === 0 && B.resolve());
  }, Gt = (T, B, G, Y = !1, et = !1, it = 0) => {
    for (let ht = it; ht < T.length; ht++)
      Pt(T[ht], B, G, Y, et);
  }, Qt = (T) => {
    if (T.shapeFlag & 6)
      return Qt(T.component.subTree);
    if (T.shapeFlag & 128)
      return T.suspense.next();
    const B = v(T.anchor || T.el), G = B && B[Vf];
    return G ? v(G) : B;
  };
  let Zt = !1;
  const Mt = (T, B, G) => {
    T == null ? B._vnode && Pt(B._vnode, null, null, !0) : x(
      B._vnode || null,
      T,
      B,
      null,
      null,
      null,
      G
    ), B._vnode = T, Zt || (Zt = !0, Xl(), Qc(), Zt = !1);
  }, Lt = {
    p: x,
    um: Pt,
    m: St,
    r: pt,
    mt: tt,
    mc: M,
    pc: lt,
    pbc: U,
    n: Qt,
    o: l
  };
  return {
    render: Mt,
    hydrate: void 0,
    createApp: cy(Mt)
  };
}
function Ws({ type: l, props: u }, y) {
  return y === "svg" && l === "foreignObject" || y === "mathml" && l === "annotation-xml" && u && u.encoding && u.encoding.includes("html") ? void 0 : y;
}
function yr({ effect: l, job: u }, y) {
  y ? (l.flags |= 32, u.flags |= 4) : (l.flags &= -33, u.flags &= -5);
}
function gy(l, u) {
  return (!l || l && !l.pendingBranch) && u && !u.persisted;
}
function bu(l, u, y = !1) {
  const w = l.children, _ = u.children;
  if (Dt(w) && Dt(_))
    for (let C = 0; C < w.length; C++) {
      const d = w[C];
      let g = _[C];
      g.shapeFlag & 1 && !g.dynamicChildren && ((g.patchFlag <= 0 || g.patchFlag === 32) && (g = _[C] = Un(_[C]), g.el = d.el), !y && g.patchFlag !== -2 && bu(d, g)), g.type === To && (g.el = d.el);
    }
}
function _y(l) {
  const u = l.slice(), y = [0];
  let w, _, C, d, g;
  const a = l.length;
  for (w = 0; w < a; w++) {
    const p = l[w];
    if (p !== 0) {
      if (_ = y[y.length - 1], l[_] < p) {
        u[w] = _, y.push(w);
        continue;
      }
      for (C = 0, d = y.length - 1; C < d; )
        g = C + d >> 1, l[y[g]] < p ? C = g + 1 : d = g;
      p < l[y[C]] && (C > 0 && (u[w] = y[C - 1]), y[C] = w);
    }
  }
  for (C = y.length, d = y[C - 1]; C-- > 0; )
    y[C] = d, d = u[d];
  return y;
}
function vu(l) {
  const u = l.subTree.component;
  if (u)
    return u.asyncDep && !u.asyncResolved ? u : vu(u);
}
function oc(l) {
  if (l)
    for (let u = 0; u < l.length; u++)
      l[u].flags |= 8;
}
const wy = Symbol.for("v-scx"), jy = () => po(wy);
function Js(l, u, y) {
  return gu(l, u, y);
}
function gu(l, u, y = ce) {
  const { immediate: w, deep: _, flush: C, once: d } = y, g = Se({}, y), a = u && w || !u && C !== "post";
  let p;
  if (zi) {
    if (C === "sync") {
      const j = jy();
      p = j.__watcherHandles || (j.__watcherHandles = []);
    } else if (!a) {
      const j = () => {
      };
      return j.stop = cn, j.resume = cn, j.pause = cn, j;
    }
  }
  const f = Ce;
  g.call = (j, O, x) => hn(j, f, O, x);
  let m = !1;
  C === "post" ? g.scheduler = (j) => {
    Le(j, f && f.suspense);
  } : C !== "sync" && (m = !0, g.scheduler = (j, O) => {
    O ? j() : ka(j);
  }), g.augmentJob = (j) => {
    u && (j.flags |= 4), m && (j.flags |= 2, f && (j.id = f.uid, j.i = f));
  };
  const v = Bf(l, u, g);
  return zi && (p ? p.push(v) : a && v()), v;
}
function ky(l, u, y) {
  const w = this.proxy, _ = me(l) ? l.includes(".") ? _u(w, l) : () => w[l] : l.bind(w, w);
  let C;
  Vt(u) ? C = u : (C = u.handler, y = u);
  const d = Ui(this), g = gu(_, C.bind(w), y);
  return d(), g;
}
function _u(l, u) {
  const y = u.split(".");
  return () => {
    let w = l;
    for (let _ = 0; _ < y.length && w; _++)
      w = w[y[_]];
    return w;
  };
}
const xy = (l, u) => u === "modelValue" || u === "model-value" ? l.modelModifiers : l[`${u}Modifiers`] || l[`${Gn(u)}Modifiers`] || l[`${_r(u)}Modifiers`];
function Oy(l, u, ...y) {
  if (l.isUnmounted) return;
  const w = l.vnode.props || ce;
  let _ = y;
  const C = u.startsWith("update:"), d = C && xy(w, u.slice(7));
  d && (d.trim && (_ = y.map((f) => me(f) ? f.trim() : f)), d.number && (_ = y.map(tf)));
  let g, a = w[g = Hs(u)] || // also try camelCase event handler (#2249)
  w[g = Hs(Gn(u))];
  !a && C && (a = w[g = Hs(_r(u))]), a && hn(
    a,
    l,
    6,
    _
  );
  const p = w[g + "Once"];
  if (p) {
    if (!l.emitted)
      l.emitted = {};
    else if (l.emitted[g])
      return;
    l.emitted[g] = !0, hn(
      p,
      l,
      6,
      _
    );
  }
}
function wu(l, u, y = !1) {
  const w = u.emitsCache, _ = w.get(l);
  if (_ !== void 0)
    return _;
  const C = l.emits;
  let d = {}, g = !1;
  if (!Vt(l)) {
    const a = (p) => {
      const f = wu(p, u, !0);
      f && (g = !0, Se(d, f));
    };
    !y && u.mixins.length && u.mixins.forEach(a), l.extends && a(l.extends), l.mixins && l.mixins.forEach(a);
  }
  return !C && !g ? (de(l) && w.set(l, null), null) : (Dt(C) ? C.forEach((a) => d[a] = null) : Se(d, C), de(l) && w.set(l, d), d);
}
function Po(l, u) {
  return !l || !ko(u) ? !1 : (u = u.slice(2).replace(/Once$/, ""), Yt(l, u[0].toLowerCase() + u.slice(1)) || Yt(l, _r(u)) || Yt(l, u));
}
function sc(l) {
  const {
    type: u,
    vnode: y,
    proxy: w,
    withProxy: _,
    propsOptions: [C],
    slots: d,
    attrs: g,
    emit: a,
    render: p,
    renderCache: f,
    props: m,
    data: v,
    setupState: j,
    ctx: O,
    inheritAttrs: x
  } = l, S = go(l);
  let P, A;
  try {
    if (y.shapeFlag & 4) {
      const L = _ || w, D = L;
      P = an(
        p.call(
          D,
          L,
          f,
          m,
          j,
          v,
          O
        )
      ), A = g;
    } else {
      const L = u;
      P = an(
        L.length > 1 ? L(
          m,
          { attrs: g, slots: d, emit: a }
        ) : L(
          m,
          null
        )
      ), A = u.props ? g : Cy(g);
    }
  } catch (L) {
    Ni.length = 0, Eo(L, l, 1), P = gr(Hi);
  }
  let R = P;
  if (A && x !== !1) {
    const L = Object.keys(A), { shapeFlag: D } = R;
    L.length && D & 7 && (C && L.some(ua) && (A = Ey(
      A,
      C
    )), R = fi(R, A, !1, !0));
  }
  return y.dirs && (R = fi(R, null, !1, !0), R.dirs = R.dirs ? R.dirs.concat(y.dirs) : y.dirs), y.transition && xa(R, y.transition), P = R, go(S), P;
}
const Cy = (l) => {
  let u;
  for (const y in l)
    (y === "class" || y === "style" || ko(y)) && ((u || (u = {}))[y] = l[y]);
  return u;
}, Ey = (l, u) => {
  const y = {};
  for (const w in l)
    (!ua(w) || !(w.slice(9) in u)) && (y[w] = l[w]);
  return y;
};
function Sy(l, u, y) {
  const { props: w, children: _, component: C } = l, { props: d, children: g, patchFlag: a } = u, p = C.emitsOptions;
  if (u.dirs || u.transition)
    return !0;
  if (y && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return w ? ac(w, d, p) : !!d;
    if (a & 8) {
      const f = u.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const v = f[m];
        if (d[v] !== w[v] && !Po(p, v))
          return !0;
      }
    }
  } else
    return (_ || g) && (!g || !g.$stable) ? !0 : w === d ? !1 : w ? d ? ac(w, d, p) : !0 : !!d;
  return !1;
}
function ac(l, u, y) {
  const w = Object.keys(u);
  if (w.length !== Object.keys(l).length)
    return !0;
  for (let _ = 0; _ < w.length; _++) {
    const C = w[_];
    if (u[C] !== l[C] && !Po(y, C))
      return !0;
  }
  return !1;
}
function Py({ vnode: l, parent: u }, y) {
  for (; u; ) {
    const w = u.subTree;
    if (w.suspense && w.suspense.activeBranch === l && (w.el = l.el), w === l)
      (l = u.vnode).el = y, u = u.parent;
    else
      break;
  }
}
const ju = (l) => l.__isSuspense;
function Ty(l, u) {
  u && u.pendingBranch ? Dt(l) ? u.effects.push(...l) : u.effects.push(l) : Mf(l);
}
const wn = Symbol.for("v-fgt"), To = Symbol.for("v-txt"), Hi = Symbol.for("v-cmt"), Ks = Symbol.for("v-stc"), Ni = [];
let Ie = null;
function Ly(l = !1) {
  Ni.push(Ie = l ? null : []);
}
function Ay() {
  Ni.pop(), Ie = Ni[Ni.length - 1] || null;
}
let Vi = 1;
function lc(l, u = !1) {
  Vi += l, l < 0 && Ie && u && (Ie.hasOnce = !0);
}
function Ry(l) {
  return l.dynamicChildren = Vi > 0 ? Ie || ci : null, Ay(), Vi > 0 && Ie && Ie.push(l), l;
}
function Iy(l, u, y, w, _, C) {
  return Ry(
    Ca(
      l,
      u,
      y,
      w,
      _,
      C,
      !0
    )
  );
}
function ku(l) {
  return l ? l.__v_isVNode === !0 : !1;
}
function Si(l, u) {
  return l.type === u.type && l.key === u.key;
}
const xu = ({ key: l }) => l ?? null, fo = ({
  ref: l,
  ref_key: u,
  ref_for: y
}) => (typeof l == "number" && (l = "" + l), l != null ? me(l) || Ee(l) || Vt(l) ? { i: ln, r: l, k: u, f: !!y } : l : null);
function Ca(l, u = null, y = null, w = 0, _ = null, C = l === wn ? 0 : 1, d = !1, g = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l,
    props: u,
    key: u && xu(u),
    ref: u && fo(u),
    scopeId: tu,
    slotScopeIds: null,
    children: y,
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
    shapeFlag: C,
    patchFlag: w,
    dynamicProps: _,
    dynamicChildren: null,
    appContext: null,
    ctx: ln
  };
  return g ? (Ea(a, y), C & 128 && l.normalize(a)) : y && (a.shapeFlag |= me(y) ? 8 : 16), Vi > 0 && // avoid a block node from tracking itself
  !d && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || C & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ie.push(a), a;
}
const gr = By;
function By(l, u = null, y = null, w = 0, _ = null, C = !1) {
  if ((!l || l === ey) && (l = Hi), ku(l)) {
    const g = fi(
      l,
      u,
      !0
      /* mergeRef: true */
    );
    return y && Ea(g, y), Vi > 0 && !C && Ie && (g.shapeFlag & 6 ? Ie[Ie.indexOf(l)] = g : Ie.push(g)), g.patchFlag = -2, g;
  }
  if (Gy(l) && (l = l.__vccOpts), u) {
    u = Ny(u);
    let { class: g, style: a } = u;
    g && !me(g) && (u.class = fa(g)), de(a) && (ja(a) && !Dt(a) && (a = Se({}, a)), u.style = pa(a));
  }
  const d = me(l) ? 1 : ju(l) ? 128 : zf(l) ? 64 : de(l) ? 4 : Vt(l) ? 2 : 0;
  return Ca(
    l,
    u,
    y,
    w,
    _,
    d,
    C,
    !0
  );
}
function Ny(l) {
  return l ? ja(l) || uu(l) ? Se({}, l) : l : null;
}
function fi(l, u, y = !1, w = !1) {
  const { props: _, ref: C, patchFlag: d, children: g, transition: a } = l, p = u ? Dy(_ || {}, u) : _, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l.type,
    props: p,
    key: p && xu(p),
    ref: u && u.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      y && C ? Dt(C) ? C.concat(fo(u)) : [C, fo(u)] : fo(u)
    ) : C,
    scopeId: l.scopeId,
    slotScopeIds: l.slotScopeIds,
    children: g,
    target: l.target,
    targetStart: l.targetStart,
    targetAnchor: l.targetAnchor,
    staticCount: l.staticCount,
    shapeFlag: l.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: u && l.type !== wn ? d === -1 ? 16 : d | 16 : d,
    dynamicProps: l.dynamicProps,
    dynamicChildren: l.dynamicChildren,
    appContext: l.appContext,
    dirs: l.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: l.component,
    suspense: l.suspense,
    ssContent: l.ssContent && fi(l.ssContent),
    ssFallback: l.ssFallback && fi(l.ssFallback),
    el: l.el,
    anchor: l.anchor,
    ctx: l.ctx,
    ce: l.ce
  };
  return a && w && xa(
    f,
    a.clone(f)
  ), f;
}
function Fy(l = " ", u = 0) {
  return gr(To, null, l, u);
}
function an(l) {
  return l == null || typeof l == "boolean" ? gr(Hi) : Dt(l) ? gr(
    wn,
    null,
    // #3666, avoid reference pollution when reusing vnode
    l.slice()
  ) : ku(l) ? Un(l) : gr(To, null, String(l));
}
function Un(l) {
  return l.el === null && l.patchFlag !== -1 || l.memo ? l : fi(l);
}
function Ea(l, u) {
  let y = 0;
  const { shapeFlag: w } = l;
  if (u == null)
    u = null;
  else if (Dt(u))
    y = 16;
  else if (typeof u == "object")
    if (w & 65) {
      const _ = u.default;
      _ && (_._c && (_._d = !1), Ea(l, _()), _._c && (_._d = !0));
      return;
    } else {
      y = 32;
      const _ = u._;
      !_ && !uu(u) ? u._ctx = ln : _ === 3 && ln && (ln.slots._ === 1 ? u._ = 1 : (u._ = 2, l.patchFlag |= 1024));
    }
  else Vt(u) ? (u = { default: u, _ctx: ln }, y = 32) : (u = String(u), w & 64 ? (y = 16, u = [Fy(u)]) : y = 8);
  l.children = u, l.shapeFlag |= y;
}
function Dy(...l) {
  const u = {};
  for (let y = 0; y < l.length; y++) {
    const w = l[y];
    for (const _ in w)
      if (_ === "class")
        u.class !== w.class && (u.class = fa([u.class, w.class]));
      else if (_ === "style")
        u.style = pa([u.style, w.style]);
      else if (ko(_)) {
        const C = u[_], d = w[_];
        d && C !== d && !(Dt(C) && C.includes(d)) && (u[_] = C ? [].concat(C, d) : d);
      } else _ !== "" && (u[_] = w[_]);
  }
  return u;
}
function on(l, u, y, w = null) {
  hn(l, u, 7, [
    y,
    w
  ]);
}
const My = au();
let Hy = 0;
function Vy(l, u, y) {
  const w = l.type, _ = (u ? u.appContext : l.appContext) || My, C = {
    uid: Hy++,
    vnode: l,
    type: w,
    parent: u,
    appContext: _,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new lf(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: u ? u.provides : Object.create(_.provides),
    ids: u ? u.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: du(w, _),
    emitsOptions: wu(w, _),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ce,
    // inheritAttrs
    inheritAttrs: w.inheritAttrs,
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
    suspense: y,
    suspenseId: y ? y.pendingId : 0,
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
  return C.ctx = { _: C }, C.root = u ? u.root : C, C.emit = Oy.bind(null, C), l.ce && l.ce(C), C;
}
let Ce = null, jo, aa;
{
  const l = Co(), u = (y, w) => {
    let _;
    return (_ = l[y]) || (_ = l[y] = []), _.push(w), (C) => {
      _.length > 1 ? _.forEach((d) => d(C)) : _[0](C);
    };
  };
  jo = u(
    "__VUE_INSTANCE_SETTERS__",
    (y) => Ce = y
  ), aa = u(
    "__VUE_SSR_SETTERS__",
    (y) => zi = y
  );
}
const Ui = (l) => {
  const u = Ce;
  return jo(l), l.scope.on(), () => {
    l.scope.off(), jo(u);
  };
}, cc = () => {
  Ce && Ce.scope.off(), jo(null);
};
function Ou(l) {
  return l.vnode.shapeFlag & 4;
}
let zi = !1;
function zy(l, u = !1, y = !1) {
  u && aa(u);
  const { props: w, children: _ } = l.vnode, C = Ou(l);
  hy(l, w, C, u), yy(l, _, y);
  const d = C ? qy(l, u) : void 0;
  return u && aa(!1), d;
}
function qy(l, u) {
  const y = l.type;
  l.accessCache = /* @__PURE__ */ Object.create(null), l.proxy = new Proxy(l.ctx, ny);
  const { setup: w } = y;
  if (w) {
    Jn();
    const _ = l.setupContext = w.length > 1 ? $y(l) : null, C = Ui(l), d = qi(
      w,
      l,
      0,
      [
        l.props,
        _
      ]
    ), g = xc(d);
    if (Kn(), C(), (g || l.sp) && !Ii(l) && eu(l), g) {
      if (d.then(cc, cc), u)
        return d.then((a) => {
          uc(l, a);
        }).catch((a) => {
          Eo(a, l, 0);
        });
      l.asyncDep = d;
    } else
      uc(l, d);
  } else
    Cu(l);
}
function uc(l, u, y) {
  Vt(u) ? l.type.__ssrInlineRender ? l.ssrRender = u : l.render = u : de(u) && (l.setupState = Kc(u)), Cu(l);
}
function Cu(l, u, y) {
  const w = l.type;
  l.render || (l.render = w.render || cn);
  {
    const _ = Ui(l);
    Jn();
    try {
      ry(l);
    } finally {
      Kn(), _();
    }
  }
}
const Uy = {
  get(l, u) {
    return _e(l, "get", ""), l[u];
  }
};
function $y(l) {
  const u = (y) => {
    l.exposed = y || {};
  };
  return {
    attrs: new Proxy(l.attrs, Uy),
    slots: l.slots,
    emit: l.emit,
    expose: u
  };
}
function Sa(l) {
  return l.exposed ? l.exposeProxy || (l.exposeProxy = new Proxy(Kc(Pf(l.exposed)), {
    get(u, y) {
      if (y in u)
        return u[y];
      if (y in Bi)
        return Bi[y](l);
    },
    has(u, y) {
      return y in u || y in Bi;
    }
  })) : l.proxy;
}
function Gy(l) {
  return Vt(l) && "__vccOpts" in l;
}
const Wy = (l, u) => Rf(l, u, zi), Jy = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let la;
const hc = typeof window < "u" && window.trustedTypes;
if (hc)
  try {
    la = /* @__PURE__ */ hc.createPolicy("vue", {
      createHTML: (l) => l
    });
  } catch {
  }
const Eu = la ? (l) => la.createHTML(l) : (l) => l, Ky = "http://www.w3.org/2000/svg", Zy = "http://www.w3.org/1998/Math/MathML", _n = typeof document < "u" ? document : null, dc = _n && /* @__PURE__ */ _n.createElement("template"), Yy = {
  insert: (l, u, y) => {
    u.insertBefore(l, y || null);
  },
  remove: (l) => {
    const u = l.parentNode;
    u && u.removeChild(l);
  },
  createElement: (l, u, y, w) => {
    const _ = u === "svg" ? _n.createElementNS(Ky, l) : u === "mathml" ? _n.createElementNS(Zy, l) : y ? _n.createElement(l, { is: y }) : _n.createElement(l);
    return l === "select" && w && w.multiple != null && _.setAttribute("multiple", w.multiple), _;
  },
  createText: (l) => _n.createTextNode(l),
  createComment: (l) => _n.createComment(l),
  setText: (l, u) => {
    l.nodeValue = u;
  },
  setElementText: (l, u) => {
    l.textContent = u;
  },
  parentNode: (l) => l.parentNode,
  nextSibling: (l) => l.nextSibling,
  querySelector: (l) => _n.querySelector(l),
  setScopeId(l, u) {
    l.setAttribute(u, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(l, u, y, w, _, C) {
    const d = y ? y.previousSibling : u.lastChild;
    if (_ && (_ === C || _.nextSibling))
      for (; u.insertBefore(_.cloneNode(!0), y), !(_ === C || !(_ = _.nextSibling)); )
        ;
    else {
      dc.innerHTML = Eu(
        w === "svg" ? `<svg>${l}</svg>` : w === "mathml" ? `<math>${l}</math>` : l
      );
      const g = dc.content;
      if (w === "svg" || w === "mathml") {
        const a = g.firstChild;
        for (; a.firstChild; )
          g.appendChild(a.firstChild);
        g.removeChild(a);
      }
      u.insertBefore(g, y);
    }
    return [
      // first
      d ? d.nextSibling : u.firstChild,
      // last
      y ? y.previousSibling : u.lastChild
    ];
  }
}, Qy = Symbol("_vtc");
function Xy(l, u, y) {
  const w = l[Qy];
  w && (u = (u ? [u, ...w] : [...w]).join(" ")), u == null ? l.removeAttribute("class") : y ? l.setAttribute("class", u) : l.className = u;
}
const pc = Symbol("_vod"), tm = Symbol("_vsh"), em = Symbol(""), nm = /(^|;)\s*display\s*:/;
function rm(l, u, y) {
  const w = l.style, _ = me(y);
  let C = !1;
  if (y && !_) {
    if (u)
      if (me(u))
        for (const d of u.split(";")) {
          const g = d.slice(0, d.indexOf(":")).trim();
          y[g] == null && yo(w, g, "");
        }
      else
        for (const d in u)
          y[d] == null && yo(w, d, "");
    for (const d in y)
      d === "display" && (C = !0), yo(w, d, y[d]);
  } else if (_) {
    if (u !== y) {
      const d = w[em];
      d && (y += ";" + d), w.cssText = y, C = nm.test(y);
    }
  } else u && l.removeAttribute("style");
  pc in l && (l[pc] = C ? w.display : "", l[tm] && (w.display = "none"));
}
const fc = /\s*!important$/;
function yo(l, u, y) {
  if (Dt(y))
    y.forEach((w) => yo(l, u, w));
  else if (y == null && (y = ""), u.startsWith("--"))
    l.setProperty(u, y);
  else {
    const w = im(l, u);
    fc.test(y) ? l.setProperty(
      _r(w),
      y.replace(fc, ""),
      "important"
    ) : l[w] = y;
  }
}
const yc = ["Webkit", "Moz", "ms"], Zs = {};
function im(l, u) {
  const y = Zs[u];
  if (y)
    return y;
  let w = Gn(u);
  if (w !== "filter" && w in l)
    return Zs[u] = w;
  w = Ec(w);
  for (let _ = 0; _ < yc.length; _++) {
    const C = yc[_] + w;
    if (C in l)
      return Zs[u] = C;
  }
  return u;
}
const mc = "http://www.w3.org/1999/xlink";
function bc(l, u, y, w, _, C = af(u)) {
  w && u.startsWith("xlink:") ? y == null ? l.removeAttributeNS(mc, u.slice(6, u.length)) : l.setAttributeNS(mc, u, y) : y == null || C && !Pc(y) ? l.removeAttribute(u) : l.setAttribute(
    u,
    C ? "" : Wn(y) ? String(y) : y
  );
}
function vc(l, u, y, w, _) {
  if (u === "innerHTML" || u === "textContent") {
    y != null && (l[u] = u === "innerHTML" ? Eu(y) : y);
    return;
  }
  const C = l.tagName;
  if (u === "value" && C !== "PROGRESS" && // custom elements may use _value internally
  !C.includes("-")) {
    const g = C === "OPTION" ? l.getAttribute("value") || "" : l.value, a = y == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      l.type === "checkbox" ? "on" : ""
    ) : String(y);
    (g !== a || !("_value" in l)) && (l.value = a), y == null && l.removeAttribute(u), l._value = y;
    return;
  }
  let d = !1;
  if (y === "" || y == null) {
    const g = typeof l[u];
    g === "boolean" ? y = Pc(y) : y == null && g === "string" ? (y = "", d = !0) : g === "number" && (y = 0, d = !0);
  }
  try {
    l[u] = y;
  } catch {
  }
  d && l.removeAttribute(_ || u);
}
function om(l, u, y, w) {
  l.addEventListener(u, y, w);
}
function sm(l, u, y, w) {
  l.removeEventListener(u, y, w);
}
const gc = Symbol("_vei");
function am(l, u, y, w, _ = null) {
  const C = l[gc] || (l[gc] = {}), d = C[u];
  if (w && d)
    d.value = w;
  else {
    const [g, a] = lm(u);
    if (w) {
      const p = C[u] = hm(
        w,
        _
      );
      om(l, g, p, a);
    } else d && (sm(l, g, d, a), C[u] = void 0);
  }
}
const _c = /(?:Once|Passive|Capture)$/;
function lm(l) {
  let u;
  if (_c.test(l)) {
    u = {};
    let w;
    for (; w = l.match(_c); )
      l = l.slice(0, l.length - w[0].length), u[w[0].toLowerCase()] = !0;
  }
  return [l[2] === ":" ? l.slice(3) : _r(l.slice(2)), u];
}
let Ys = 0;
const cm = /* @__PURE__ */ Promise.resolve(), um = () => Ys || (cm.then(() => Ys = 0), Ys = Date.now());
function hm(l, u) {
  const y = (w) => {
    if (!w._vts)
      w._vts = Date.now();
    else if (w._vts <= y.attached)
      return;
    hn(
      dm(w, y.value),
      u,
      5,
      [w]
    );
  };
  return y.value = l, y.attached = um(), y;
}
function dm(l, u) {
  if (Dt(u)) {
    const y = l.stopImmediatePropagation;
    return l.stopImmediatePropagation = () => {
      y.call(l), l._stopped = !0;
    }, u.map(
      (w) => (_) => !_._stopped && w && w(_)
    );
  } else
    return u;
}
const wc = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // lowercase letter
l.charCodeAt(2) > 96 && l.charCodeAt(2) < 123, pm = (l, u, y, w, _, C) => {
  const d = _ === "svg";
  u === "class" ? Xy(l, w, d) : u === "style" ? rm(l, y, w) : ko(u) ? ua(u) || am(l, u, y, w, C) : (u[0] === "." ? (u = u.slice(1), !0) : u[0] === "^" ? (u = u.slice(1), !1) : fm(l, u, w, d)) ? (vc(l, u, w), !l.tagName.includes("-") && (u === "value" || u === "checked" || u === "selected") && bc(l, u, w, d, C, u !== "value")) : /* #11081 force set props for possible async custom element */ l._isVueCE && (/[A-Z]/.test(u) || !me(w)) ? vc(l, Gn(u), w, C, u) : (u === "true-value" ? l._trueValue = w : u === "false-value" && (l._falseValue = w), bc(l, u, w, d));
};
function fm(l, u, y, w) {
  if (w)
    return !!(u === "innerHTML" || u === "textContent" || u in l && wc(u) && Vt(y));
  if (u === "spellcheck" || u === "draggable" || u === "translate" || u === "form" || u === "list" && l.tagName === "INPUT" || u === "type" && l.tagName === "TEXTAREA")
    return !1;
  if (u === "width" || u === "height") {
    const _ = l.tagName;
    if (_ === "IMG" || _ === "VIDEO" || _ === "CANVAS" || _ === "SOURCE")
      return !1;
  }
  return wc(u) && me(y) ? !1 : u in l;
}
const ym = /* @__PURE__ */ Se({ patchProp: pm }, Yy);
let jc;
function mm() {
  return jc || (jc = by(ym));
}
const bm = (...l) => {
  const u = mm().createApp(...l), { mount: y } = u;
  return u.mount = (w) => {
    const _ = gm(w);
    if (!_) return;
    const C = u._component;
    !Vt(C) && !C.render && !C.template && (C.template = _.innerHTML), _.nodeType === 1 && (_.textContent = "");
    const d = y(_, !1, vm(_));
    return _ instanceof Element && (_.removeAttribute("v-cloak"), _.setAttribute("data-v-app", "")), d;
  }, u;
};
function vm(l) {
  if (l instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && l instanceof MathMLElement)
    return "mathml";
}
function gm(l) {
  return me(l) ? document.querySelector(l) : l;
}
var Su = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(l, u) {
  (function(y, w) {
    l.exports = w();
  })(self, () => (() => {
    var y = { 9306: (d, g, a) => {
      var p = a(4901), f = a(6823), m = TypeError;
      d.exports = function(v) {
        if (p(v)) return v;
        throw new m(f(v) + " is not a function");
      };
    }, 5548: (d, g, a) => {
      var p = a(3517), f = a(6823), m = TypeError;
      d.exports = function(v) {
        if (p(v)) return v;
        throw new m(f(v) + " is not a constructor");
      };
    }, 3506: (d, g, a) => {
      var p = a(3925), f = String, m = TypeError;
      d.exports = function(v) {
        if (p(v)) return v;
        throw new m("Can't set " + f(v) + " as a prototype");
      };
    }, 6469: (d, g, a) => {
      var p = a(8227), f = a(2360), m = a(4913).f, v = p("unscopables"), j = Array.prototype;
      j[v] === void 0 && m(j, v, { configurable: !0, value: f(null) }), d.exports = function(O) {
        j[v][O] = !0;
      };
    }, 7829: (d, g, a) => {
      var p = a(8183).charAt;
      d.exports = function(f, m, v) {
        return m + (v ? p(f, m).length : 1);
      };
    }, 679: (d, g, a) => {
      var p = a(1625), f = TypeError;
      d.exports = function(m, v) {
        if (p(v, m)) return m;
        throw new f("Incorrect invocation");
      };
    }, 8551: (d, g, a) => {
      var p = a(34), f = String, m = TypeError;
      d.exports = function(v) {
        if (p(v)) return v;
        throw new m(f(v) + " is not an object");
      };
    }, 235: (d, g, a) => {
      var p = a(9213).forEach, f = a(4598)("forEach");
      d.exports = f ? [].forEach : function(m) {
        return p(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (d, g, a) => {
      var p = a(6080), f = a(9565), m = a(8981), v = a(6319), j = a(4209), O = a(3517), x = a(6198), S = a(4659), P = a(81), A = a(851), R = Array;
      d.exports = function(L) {
        var D = m(L), N = O(this), H = arguments.length, M = H > 1 ? arguments[1] : void 0, F = M !== void 0;
        F && (M = p(M, H > 2 ? arguments[2] : void 0));
        var U, q, Z, K, tt, at, nt = A(D), rt = 0;
        if (!nt || this === R && j(nt)) for (U = x(D), q = N ? new this(U) : R(U); U > rt; rt++) at = F ? M(D[rt], rt) : D[rt], S(q, rt, at);
        else for (q = N ? new this() : [], tt = (K = P(D, nt)).next; !(Z = f(tt, K)).done; rt++) at = F ? v(K, M, [Z.value, rt], !0) : Z.value, S(q, rt, at);
        return q.length = rt, q;
      };
    }, 9617: (d, g, a) => {
      var p = a(5397), f = a(5610), m = a(6198), v = function(j) {
        return function(O, x, S) {
          var P = p(O), A = m(P);
          if (A === 0) return !j && -1;
          var R, L = f(S, A);
          if (j && x != x) {
            for (; A > L; ) if ((R = P[L++]) != R) return !0;
          } else for (; A > L; L++) if ((j || L in P) && P[L] === x) return j || L || 0;
          return !j && -1;
        };
      };
      d.exports = { includes: v(!0), indexOf: v(!1) };
    }, 9213: (d, g, a) => {
      var p = a(6080), f = a(9504), m = a(7055), v = a(8981), j = a(6198), O = a(1469), x = f([].push), S = function(P) {
        var A = P === 1, R = P === 2, L = P === 3, D = P === 4, N = P === 6, H = P === 7, M = P === 5 || N;
        return function(F, U, q, Z) {
          for (var K, tt, at = v(F), nt = m(at), rt = j(nt), lt = p(U, q), bt = 0, Ct = Z || O, St = A ? Ct(F, rt) : R || H ? Ct(F, 0) : void 0; rt > bt; bt++) if ((M || bt in nt) && (tt = lt(K = nt[bt], bt, at), P)) if (A) St[bt] = tt;
          else if (tt) switch (P) {
            case 3:
              return !0;
            case 5:
              return K;
            case 6:
              return bt;
            case 2:
              x(St, K);
          }
          else switch (P) {
            case 4:
              return !1;
            case 7:
              x(St, K);
          }
          return N ? -1 : L || D ? D : St;
        };
      };
      d.exports = { forEach: S(0), map: S(1), filter: S(2), some: S(3), every: S(4), find: S(5), findIndex: S(6), filterReject: S(7) };
    }, 597: (d, g, a) => {
      var p = a(9039), f = a(8227), m = a(7388), v = f("species");
      d.exports = function(j) {
        return m >= 51 || !p(function() {
          var O = [];
          return (O.constructor = {})[v] = function() {
            return { foo: 1 };
          }, O[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (d, g, a) => {
      var p = a(9039);
      d.exports = function(f, m) {
        var v = [][f];
        return !!v && p(function() {
          v.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (d, g, a) => {
      var p = a(9306), f = a(8981), m = a(7055), v = a(6198), j = TypeError, O = "Reduce of empty array with no initial value", x = function(S) {
        return function(P, A, R, L) {
          var D = f(P), N = m(D), H = v(D);
          if (p(A), H === 0 && R < 2) throw new j(O);
          var M = S ? H - 1 : 0, F = S ? -1 : 1;
          if (R < 2) for (; ; ) {
            if (M in N) {
              L = N[M], M += F;
              break;
            }
            if (M += F, S ? M < 0 : H <= M) throw new j(O);
          }
          for (; S ? M >= 0 : H > M; M += F) M in N && (L = A(L, N[M], M, D));
          return L;
        };
      };
      d.exports = { left: x(!1), right: x(!0) };
    }, 4527: (d, g, a) => {
      var p = a(3724), f = a(4376), m = TypeError, v = Object.getOwnPropertyDescriptor, j = p && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (O) {
          return O instanceof TypeError;
        }
      }();
      d.exports = j ? function(O, x) {
        if (f(O) && !v(O, "length").writable) throw new m("Cannot set read only .length");
        return O.length = x;
      } : function(O, x) {
        return O.length = x;
      };
    }, 7680: (d, g, a) => {
      var p = a(9504);
      d.exports = p([].slice);
    }, 4488: (d, g, a) => {
      var p = a(7680), f = Math.floor, m = function(v, j) {
        var O = v.length;
        if (O < 8) for (var x, S, P = 1; P < O; ) {
          for (S = P, x = v[P]; S && j(v[S - 1], x) > 0; ) v[S] = v[--S];
          S !== P++ && (v[S] = x);
        }
        else for (var A = f(O / 2), R = m(p(v, 0, A), j), L = m(p(v, A), j), D = R.length, N = L.length, H = 0, M = 0; H < D || M < N; ) v[H + M] = H < D && M < N ? j(R[H], L[M]) <= 0 ? R[H++] : L[M++] : H < D ? R[H++] : L[M++];
        return v;
      };
      d.exports = m;
    }, 7433: (d, g, a) => {
      var p = a(4376), f = a(3517), m = a(34), v = a(8227)("species"), j = Array;
      d.exports = function(O) {
        var x;
        return p(O) && (x = O.constructor, (f(x) && (x === j || p(x.prototype)) || m(x) && (x = x[v]) === null) && (x = void 0)), x === void 0 ? j : x;
      };
    }, 1469: (d, g, a) => {
      var p = a(7433);
      d.exports = function(f, m) {
        return new (p(f))(m === 0 ? 0 : m);
      };
    }, 6319: (d, g, a) => {
      var p = a(8551), f = a(9539);
      d.exports = function(m, v, j, O) {
        try {
          return O ? v(p(j)[0], j[1]) : v(j);
        } catch (x) {
          f(m, "throw", x);
        }
      };
    }, 4428: (d, g, a) => {
      var p = a(8227)("iterator"), f = !1;
      try {
        var m = 0, v = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          f = !0;
        } };
        v[p] = function() {
          return this;
        }, Array.from(v, function() {
          throw 2;
        });
      } catch {
      }
      d.exports = function(j, O) {
        try {
          if (!O && !f) return !1;
        } catch {
          return !1;
        }
        var x = !1;
        try {
          var S = {};
          S[p] = function() {
            return { next: function() {
              return { done: x = !0 };
            } };
          }, j(S);
        } catch {
        }
        return x;
      };
    }, 4576: (d, g, a) => {
      var p = a(9504), f = p({}.toString), m = p("".slice);
      d.exports = function(v) {
        return m(f(v), 8, -1);
      };
    }, 6955: (d, g, a) => {
      var p = a(2140), f = a(4901), m = a(4576), v = a(8227)("toStringTag"), j = Object, O = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      d.exports = p ? m : function(x) {
        var S, P, A;
        return x === void 0 ? "Undefined" : x === null ? "Null" : typeof (P = function(R, L) {
          try {
            return R[L];
          } catch {
          }
        }(S = j(x), v)) == "string" ? P : O ? m(S) : (A = m(S)) === "Object" && f(S.callee) ? "Arguments" : A;
      };
    }, 7740: (d, g, a) => {
      var p = a(9297), f = a(5031), m = a(7347), v = a(4913);
      d.exports = function(j, O, x) {
        for (var S = f(O), P = v.f, A = m.f, R = 0; R < S.length; R++) {
          var L = S[R];
          p(j, L) || x && p(x, L) || P(j, L, A(O, L));
        }
      };
    }, 1436: (d, g, a) => {
      var p = a(8227)("match");
      d.exports = function(f) {
        var m = /./;
        try {
          "/./"[f](m);
        } catch {
          try {
            return m[p] = !1, "/./"[f](m);
          } catch {
          }
        }
        return !1;
      };
    }, 2211: (d, g, a) => {
      var p = a(9039);
      d.exports = !p(function() {
        function f() {
        }
        return f.prototype.constructor = null, Object.getPrototypeOf(new f()) !== f.prototype;
      });
    }, 2529: (d) => {
      d.exports = function(g, a) {
        return { value: g, done: a };
      };
    }, 6699: (d, g, a) => {
      var p = a(3724), f = a(4913), m = a(6980);
      d.exports = p ? function(v, j, O) {
        return f.f(v, j, m(1, O));
      } : function(v, j, O) {
        return v[j] = O, v;
      };
    }, 6980: (d) => {
      d.exports = function(g, a) {
        return { enumerable: !(1 & g), configurable: !(2 & g), writable: !(4 & g), value: a };
      };
    }, 4659: (d, g, a) => {
      var p = a(3724), f = a(4913), m = a(6980);
      d.exports = function(v, j, O) {
        p ? f.f(v, j, m(0, O)) : v[j] = O;
      };
    }, 380: (d, g, a) => {
      var p = a(9504), f = a(9039), m = a(533).start, v = RangeError, j = isFinite, O = Math.abs, x = Date.prototype, S = x.toISOString, P = p(x.getTime), A = p(x.getUTCDate), R = p(x.getUTCFullYear), L = p(x.getUTCHours), D = p(x.getUTCMilliseconds), N = p(x.getUTCMinutes), H = p(x.getUTCMonth), M = p(x.getUTCSeconds);
      d.exports = f(function() {
        return S.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !f(function() {
        S.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(P(this))) throw new v("Invalid time value");
        var F = this, U = R(F), q = D(F), Z = U < 0 ? "-" : U > 9999 ? "+" : "";
        return Z + m(O(U), Z ? 6 : 4, 0) + "-" + m(H(F) + 1, 2, 0) + "-" + m(A(F), 2, 0) + "T" + m(L(F), 2, 0) + ":" + m(N(F), 2, 0) + ":" + m(M(F), 2, 0) + "." + m(q, 3, 0) + "Z";
      } : S;
    }, 3640: (d, g, a) => {
      var p = a(8551), f = a(4270), m = TypeError;
      d.exports = function(v) {
        if (p(this), v === "string" || v === "default") v = "string";
        else if (v !== "number") throw new m("Incorrect hint");
        return f(this, v);
      };
    }, 2106: (d, g, a) => {
      var p = a(283), f = a(4913);
      d.exports = function(m, v, j) {
        return j.get && p(j.get, v, { getter: !0 }), j.set && p(j.set, v, { setter: !0 }), f.f(m, v, j);
      };
    }, 6840: (d, g, a) => {
      var p = a(4901), f = a(4913), m = a(283), v = a(9433);
      d.exports = function(j, O, x, S) {
        S || (S = {});
        var P = S.enumerable, A = S.name !== void 0 ? S.name : O;
        if (p(x) && m(x, A, S), S.global) P ? j[O] = x : v(O, x);
        else {
          try {
            S.unsafe ? j[O] && (P = !0) : delete j[O];
          } catch {
          }
          P ? j[O] = x : f.f(j, O, { value: x, enumerable: !1, configurable: !S.nonConfigurable, writable: !S.nonWritable });
        }
        return j;
      };
    }, 9433: (d, g, a) => {
      var p = a(4475), f = Object.defineProperty;
      d.exports = function(m, v) {
        try {
          f(p, m, { value: v, configurable: !0, writable: !0 });
        } catch {
          p[m] = v;
        }
        return v;
      };
    }, 4606: (d, g, a) => {
      var p = a(6823), f = TypeError;
      d.exports = function(m, v) {
        if (!delete m[v]) throw new f("Cannot delete property " + p(v) + " of " + p(m));
      };
    }, 3724: (d, g, a) => {
      var p = a(9039);
      d.exports = !p(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (d, g, a) => {
      var p = a(4475), f = a(34), m = p.document, v = f(m) && f(m.createElement);
      d.exports = function(j) {
        return v ? m.createElement(j) : {};
      };
    }, 6837: (d) => {
      var g = TypeError;
      d.exports = function(a) {
        if (a > 9007199254740991) throw g("Maximum allowed index exceeded");
        return a;
      };
    }, 7400: (d) => {
      d.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (d, g, a) => {
      var p = a(4055)("span").classList, f = p && p.constructor && p.constructor.prototype;
      d.exports = f === Object.prototype ? void 0 : f;
    }, 8834: (d, g, a) => {
      var p = a(9392).match(/firefox\/(\d+)/i);
      d.exports = !!p && +p[1];
    }, 7290: (d, g, a) => {
      var p = a(516), f = a(9088);
      d.exports = !p && !f && typeof window == "object" && typeof document == "object";
    }, 6763: (d) => {
      d.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (d) => {
      d.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (d, g, a) => {
      var p = a(9392);
      d.exports = /MSIE|Trident/.test(p);
    }, 28: (d, g, a) => {
      var p = a(9392);
      d.exports = /ipad|iphone|ipod/i.test(p) && typeof Pebble < "u";
    }, 8119: (d, g, a) => {
      var p = a(9392);
      d.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(p);
    }, 9088: (d, g, a) => {
      var p = a(4475), f = a(4576);
      d.exports = f(p.process) === "process";
    }, 6765: (d, g, a) => {
      var p = a(9392);
      d.exports = /web0s(?!.*chrome)/i.test(p);
    }, 9392: (d) => {
      d.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (d, g, a) => {
      var p, f, m = a(4475), v = a(9392), j = m.process, O = m.Deno, x = j && j.versions || O && O.version, S = x && x.v8;
      S && (f = (p = S.split("."))[0] > 0 && p[0] < 4 ? 1 : +(p[0] + p[1])), !f && v && (!(p = v.match(/Edge\/(\d+)/)) || p[1] >= 74) && (p = v.match(/Chrome\/(\d+)/)) && (f = +p[1]), d.exports = f;
    }, 9160: (d, g, a) => {
      var p = a(9392).match(/AppleWebKit\/(\d+)\./);
      d.exports = !!p && +p[1];
    }, 8727: (d) => {
      d.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (d, g, a) => {
      var p = a(4475), f = a(7347).f, m = a(6699), v = a(6840), j = a(9433), O = a(7740), x = a(2796);
      d.exports = function(S, P) {
        var A, R, L, D, N, H = S.target, M = S.global, F = S.stat;
        if (A = M ? p : F ? p[H] || j(H, {}) : p[H] && p[H].prototype) for (R in P) {
          if (D = P[R], L = S.dontCallGetSet ? (N = f(A, R)) && N.value : A[R], !x(M ? R : H + (F ? "." : "#") + R, S.forced) && L !== void 0) {
            if (typeof D == typeof L) continue;
            O(D, L);
          }
          (S.sham || L && L.sham) && m(D, "sham", !0), v(A, R, D, S);
        }
      };
    }, 9039: (d) => {
      d.exports = function(g) {
        try {
          return !!g();
        } catch {
          return !0;
        }
      };
    }, 9228: (d, g, a) => {
      a(7495);
      var p = a(9565), f = a(6840), m = a(7323), v = a(9039), j = a(8227), O = a(6699), x = j("species"), S = RegExp.prototype;
      d.exports = function(P, A, R, L) {
        var D = j(P), N = !v(function() {
          var U = {};
          return U[D] = function() {
            return 7;
          }, ""[P](U) !== 7;
        }), H = N && !v(function() {
          var U = !1, q = /a/;
          return P === "split" && ((q = {}).constructor = {}, q.constructor[x] = function() {
            return q;
          }, q.flags = "", q[D] = /./[D]), q.exec = function() {
            return U = !0, null;
          }, q[D](""), !U;
        });
        if (!N || !H || R) {
          var M = /./[D], F = A(D, ""[P], function(U, q, Z, K, tt) {
            var at = q.exec;
            return at === m || at === S.exec ? N && !tt ? { done: !0, value: p(M, q, Z, K) } : { done: !0, value: p(U, Z, q, K) } : { done: !1 };
          });
          f(String.prototype, P, F[0]), f(S, D, F[1]);
        }
        L && O(S[D], "sham", !0);
      };
    }, 8745: (d, g, a) => {
      var p = a(616), f = Function.prototype, m = f.apply, v = f.call;
      d.exports = typeof Reflect == "object" && Reflect.apply || (p ? v.bind(m) : function() {
        return v.apply(m, arguments);
      });
    }, 6080: (d, g, a) => {
      var p = a(7476), f = a(9306), m = a(616), v = p(p.bind);
      d.exports = function(j, O) {
        return f(j), O === void 0 ? j : m ? v(j, O) : function() {
          return j.apply(O, arguments);
        };
      };
    }, 616: (d, g, a) => {
      var p = a(9039);
      d.exports = !p(function() {
        var f = (function() {
        }).bind();
        return typeof f != "function" || f.hasOwnProperty("prototype");
      });
    }, 566: (d, g, a) => {
      var p = a(9504), f = a(9306), m = a(34), v = a(9297), j = a(7680), O = a(616), x = Function, S = p([].concat), P = p([].join), A = {};
      d.exports = O ? x.bind : function(R) {
        var L = f(this), D = L.prototype, N = j(arguments, 1), H = function() {
          var M = S(N, j(arguments));
          return this instanceof H ? function(F, U, q) {
            if (!v(A, U)) {
              for (var Z = [], K = 0; K < U; K++) Z[K] = "a[" + K + "]";
              A[U] = x("C,a", "return new C(" + P(Z, ",") + ")");
            }
            return A[U](F, q);
          }(L, M.length, M) : L.apply(R, M);
        };
        return m(D) && (H.prototype = D), H;
      };
    }, 9565: (d, g, a) => {
      var p = a(616), f = Function.prototype.call;
      d.exports = p ? f.bind(f) : function() {
        return f.apply(f, arguments);
      };
    }, 350: (d, g, a) => {
      var p = a(3724), f = a(9297), m = Function.prototype, v = p && Object.getOwnPropertyDescriptor, j = f(m, "name"), O = j && (function() {
      }).name === "something", x = j && (!p || p && v(m, "name").configurable);
      d.exports = { EXISTS: j, PROPER: O, CONFIGURABLE: x };
    }, 6706: (d, g, a) => {
      var p = a(9504), f = a(9306);
      d.exports = function(m, v, j) {
        try {
          return p(f(Object.getOwnPropertyDescriptor(m, v)[j]));
        } catch {
        }
      };
    }, 7476: (d, g, a) => {
      var p = a(4576), f = a(9504);
      d.exports = function(m) {
        if (p(m) === "Function") return f(m);
      };
    }, 9504: (d, g, a) => {
      var p = a(616), f = Function.prototype, m = f.call, v = p && f.bind.bind(m, m);
      d.exports = p ? v : function(j) {
        return function() {
          return m.apply(j, arguments);
        };
      };
    }, 7751: (d, g, a) => {
      var p = a(4475), f = a(4901);
      d.exports = function(m, v) {
        return arguments.length < 2 ? (j = p[m], f(j) ? j : void 0) : p[m] && p[m][v];
        var j;
      };
    }, 851: (d, g, a) => {
      var p = a(6955), f = a(5966), m = a(4117), v = a(6269), j = a(8227)("iterator");
      d.exports = function(O) {
        if (!m(O)) return f(O, j) || f(O, "@@iterator") || v[p(O)];
      };
    }, 81: (d, g, a) => {
      var p = a(9565), f = a(9306), m = a(8551), v = a(6823), j = a(851), O = TypeError;
      d.exports = function(x, S) {
        var P = arguments.length < 2 ? j(x) : S;
        if (f(P)) return m(p(P, x));
        throw new O(v(x) + " is not iterable");
      };
    }, 6933: (d, g, a) => {
      var p = a(9504), f = a(4376), m = a(4901), v = a(4576), j = a(655), O = p([].push);
      d.exports = function(x) {
        if (m(x)) return x;
        if (f(x)) {
          for (var S = x.length, P = [], A = 0; A < S; A++) {
            var R = x[A];
            typeof R == "string" ? O(P, R) : typeof R != "number" && v(R) !== "Number" && v(R) !== "String" || O(P, j(R));
          }
          var L = P.length, D = !0;
          return function(N, H) {
            if (D) return D = !1, H;
            if (f(this)) return H;
            for (var M = 0; M < L; M++) if (P[M] === N) return H;
          };
        }
      };
    }, 5966: (d, g, a) => {
      var p = a(9306), f = a(4117);
      d.exports = function(m, v) {
        var j = m[v];
        return f(j) ? void 0 : p(j);
      };
    }, 2478: (d, g, a) => {
      var p = a(9504), f = a(8981), m = Math.floor, v = p("".charAt), j = p("".replace), O = p("".slice), x = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, S = /\$([$&'`]|\d{1,2})/g;
      d.exports = function(P, A, R, L, D, N) {
        var H = R + P.length, M = L.length, F = S;
        return D !== void 0 && (D = f(D), F = x), j(N, F, function(U, q) {
          var Z;
          switch (v(q, 0)) {
            case "$":
              return "$";
            case "&":
              return P;
            case "`":
              return O(A, 0, R);
            case "'":
              return O(A, H);
            case "<":
              Z = D[O(q, 1, -1)];
              break;
            default:
              var K = +q;
              if (K === 0) return U;
              if (K > M) {
                var tt = m(K / 10);
                return tt === 0 ? U : tt <= M ? L[tt - 1] === void 0 ? v(q, 1) : L[tt - 1] + v(q, 1) : U;
              }
              Z = L[K - 1];
          }
          return Z === void 0 ? "" : Z;
        });
      };
    }, 4475: function(d, g, a) {
      var p = function(f) {
        return f && f.Math === Math && f;
      };
      d.exports = p(typeof globalThis == "object" && globalThis) || p(typeof window == "object" && window) || p(typeof self == "object" && self) || p(typeof a.g == "object" && a.g) || p(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (d, g, a) => {
      var p = a(9504), f = a(8981), m = p({}.hasOwnProperty);
      d.exports = Object.hasOwn || function(v, j) {
        return m(f(v), j);
      };
    }, 421: (d) => {
      d.exports = {};
    }, 3138: (d) => {
      d.exports = function(g, a) {
        try {
          arguments.length === 1 ? console.error(g) : console.error(g, a);
        } catch {
        }
      };
    }, 397: (d, g, a) => {
      var p = a(7751);
      d.exports = p("document", "documentElement");
    }, 5917: (d, g, a) => {
      var p = a(3724), f = a(9039), m = a(4055);
      d.exports = !p && !f(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (d, g, a) => {
      var p = a(9504), f = a(9039), m = a(4576), v = Object, j = p("".split);
      d.exports = f(function() {
        return !v("z").propertyIsEnumerable(0);
      }) ? function(O) {
        return m(O) === "String" ? j(O, "") : v(O);
      } : v;
    }, 3167: (d, g, a) => {
      var p = a(4901), f = a(34), m = a(2967);
      d.exports = function(v, j, O) {
        var x, S;
        return m && p(x = j.constructor) && x !== O && f(S = x.prototype) && S !== O.prototype && m(v, S), v;
      };
    }, 3706: (d, g, a) => {
      var p = a(9504), f = a(4901), m = a(7629), v = p(Function.toString);
      f(m.inspectSource) || (m.inspectSource = function(j) {
        return v(j);
      }), d.exports = m.inspectSource;
    }, 1181: (d, g, a) => {
      var p, f, m, v = a(8622), j = a(4475), O = a(34), x = a(6699), S = a(9297), P = a(7629), A = a(6119), R = a(421), L = "Object already initialized", D = j.TypeError, N = j.WeakMap;
      if (v || P.state) {
        var H = P.state || (P.state = new N());
        H.get = H.get, H.has = H.has, H.set = H.set, p = function(F, U) {
          if (H.has(F)) throw new D(L);
          return U.facade = F, H.set(F, U), U;
        }, f = function(F) {
          return H.get(F) || {};
        }, m = function(F) {
          return H.has(F);
        };
      } else {
        var M = A("state");
        R[M] = !0, p = function(F, U) {
          if (S(F, M)) throw new D(L);
          return U.facade = F, x(F, M, U), U;
        }, f = function(F) {
          return S(F, M) ? F[M] : {};
        }, m = function(F) {
          return S(F, M);
        };
      }
      d.exports = { set: p, get: f, has: m, enforce: function(F) {
        return m(F) ? f(F) : p(F, {});
      }, getterFor: function(F) {
        return function(U) {
          var q;
          if (!O(U) || (q = f(U)).type !== F) throw new D("Incompatible receiver, " + F + " required");
          return q;
        };
      } };
    }, 4209: (d, g, a) => {
      var p = a(8227), f = a(6269), m = p("iterator"), v = Array.prototype;
      d.exports = function(j) {
        return j !== void 0 && (f.Array === j || v[m] === j);
      };
    }, 4376: (d, g, a) => {
      var p = a(4576);
      d.exports = Array.isArray || function(f) {
        return p(f) === "Array";
      };
    }, 4901: (d) => {
      var g = typeof document == "object" && document.all;
      d.exports = g === void 0 && g !== void 0 ? function(a) {
        return typeof a == "function" || a === g;
      } : function(a) {
        return typeof a == "function";
      };
    }, 3517: (d, g, a) => {
      var p = a(9504), f = a(9039), m = a(4901), v = a(6955), j = a(7751), O = a(3706), x = function() {
      }, S = j("Reflect", "construct"), P = /^\s*(?:class|function)\b/, A = p(P.exec), R = !P.test(x), L = function(N) {
        if (!m(N)) return !1;
        try {
          return S(x, [], N), !0;
        } catch {
          return !1;
        }
      }, D = function(N) {
        if (!m(N)) return !1;
        switch (v(N)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return R || !!A(P, O(N));
        } catch {
          return !0;
        }
      };
      D.sham = !0, d.exports = !S || f(function() {
        var N;
        return L(L.call) || !L(Object) || !L(function() {
          N = !0;
        }) || N;
      }) ? D : L;
    }, 6575: (d, g, a) => {
      var p = a(9297);
      d.exports = function(f) {
        return f !== void 0 && (p(f, "value") || p(f, "writable"));
      };
    }, 2796: (d, g, a) => {
      var p = a(9039), f = a(4901), m = /#|\.prototype\./, v = function(P, A) {
        var R = O[j(P)];
        return R === S || R !== x && (f(A) ? p(A) : !!A);
      }, j = v.normalize = function(P) {
        return String(P).replace(m, ".").toLowerCase();
      }, O = v.data = {}, x = v.NATIVE = "N", S = v.POLYFILL = "P";
      d.exports = v;
    }, 4117: (d) => {
      d.exports = function(g) {
        return g == null;
      };
    }, 34: (d, g, a) => {
      var p = a(4901);
      d.exports = function(f) {
        return typeof f == "object" ? f !== null : p(f);
      };
    }, 3925: (d, g, a) => {
      var p = a(34);
      d.exports = function(f) {
        return p(f) || f === null;
      };
    }, 6395: (d) => {
      d.exports = !1;
    }, 788: (d, g, a) => {
      var p = a(34), f = a(4576), m = a(8227)("match");
      d.exports = function(v) {
        var j;
        return p(v) && ((j = v[m]) !== void 0 ? !!j : f(v) === "RegExp");
      };
    }, 757: (d, g, a) => {
      var p = a(7751), f = a(4901), m = a(1625), v = a(7040), j = Object;
      d.exports = v ? function(O) {
        return typeof O == "symbol";
      } : function(O) {
        var x = p("Symbol");
        return f(x) && m(x.prototype, j(O));
      };
    }, 2652: (d, g, a) => {
      var p = a(6080), f = a(9565), m = a(8551), v = a(6823), j = a(4209), O = a(6198), x = a(1625), S = a(81), P = a(851), A = a(9539), R = TypeError, L = function(N, H) {
        this.stopped = N, this.result = H;
      }, D = L.prototype;
      d.exports = function(N, H, M) {
        var F, U, q, Z, K, tt, at, nt = M && M.that, rt = !(!M || !M.AS_ENTRIES), lt = !(!M || !M.IS_RECORD), bt = !(!M || !M.IS_ITERATOR), Ct = !(!M || !M.INTERRUPTED), St = p(H, nt), Pt = function(Tt) {
          return F && A(F, "normal", Tt), new L(!0, Tt);
        }, pt = function(Tt) {
          return rt ? (m(Tt), Ct ? St(Tt[0], Tt[1], Pt) : St(Tt[0], Tt[1])) : Ct ? St(Tt, Pt) : St(Tt);
        };
        if (lt) F = N.iterator;
        else if (bt) F = N;
        else {
          if (!(U = P(N))) throw new R(v(N) + " is not iterable");
          if (j(U)) {
            for (q = 0, Z = O(N); Z > q; q++) if ((K = pt(N[q])) && x(D, K)) return K;
            return new L(!1);
          }
          F = S(N, U);
        }
        for (tt = lt ? N.next : F.next; !(at = f(tt, F)).done; ) {
          try {
            K = pt(at.value);
          } catch (Tt) {
            A(F, "throw", Tt);
          }
          if (typeof K == "object" && K && x(D, K)) return K;
        }
        return new L(!1);
      };
    }, 9539: (d, g, a) => {
      var p = a(9565), f = a(8551), m = a(5966);
      d.exports = function(v, j, O) {
        var x, S;
        f(v);
        try {
          if (!(x = m(v, "return"))) {
            if (j === "throw") throw O;
            return O;
          }
          x = p(x, v);
        } catch (P) {
          S = !0, x = P;
        }
        if (j === "throw") throw O;
        if (S) throw x;
        return f(x), O;
      };
    }, 3994: (d, g, a) => {
      var p = a(7657).IteratorPrototype, f = a(2360), m = a(6980), v = a(687), j = a(6269), O = function() {
        return this;
      };
      d.exports = function(x, S, P, A) {
        var R = S + " Iterator";
        return x.prototype = f(p, { next: m(+!A, P) }), v(x, R, !1, !0), j[R] = O, x;
      };
    }, 1088: (d, g, a) => {
      var p = a(6518), f = a(9565), m = a(6395), v = a(350), j = a(4901), O = a(3994), x = a(2787), S = a(2967), P = a(687), A = a(6699), R = a(6840), L = a(8227), D = a(6269), N = a(7657), H = v.PROPER, M = v.CONFIGURABLE, F = N.IteratorPrototype, U = N.BUGGY_SAFARI_ITERATORS, q = L("iterator"), Z = "keys", K = "values", tt = "entries", at = function() {
        return this;
      };
      d.exports = function(nt, rt, lt, bt, Ct, St, Pt) {
        O(lt, rt, bt);
        var pt, Tt, Et, Gt = function(B) {
          if (B === Ct && Jt) return Jt;
          if (!U && B && B in Mt) return Mt[B];
          switch (B) {
            case Z:
            case K:
            case tt:
              return function() {
                return new lt(this, B);
              };
          }
          return function() {
            return new lt(this);
          };
        }, Qt = rt + " Iterator", Zt = !1, Mt = nt.prototype, Lt = Mt[q] || Mt["@@iterator"] || Ct && Mt[Ct], Jt = !U && Lt || Gt(Ct), T = rt === "Array" && Mt.entries || Lt;
        if (T && (pt = x(T.call(new nt()))) !== Object.prototype && pt.next && (m || x(pt) === F || (S ? S(pt, F) : j(pt[q]) || R(pt, q, at)), P(pt, Qt, !0, !0), m && (D[Qt] = at)), H && Ct === K && Lt && Lt.name !== K && (!m && M ? A(Mt, "name", K) : (Zt = !0, Jt = function() {
          return f(Lt, this);
        })), Ct) if (Tt = { values: Gt(K), keys: St ? Jt : Gt(Z), entries: Gt(tt) }, Pt) for (Et in Tt) (U || Zt || !(Et in Mt)) && R(Mt, Et, Tt[Et]);
        else p({ target: rt, proto: !0, forced: U || Zt }, Tt);
        return m && !Pt || Mt[q] === Jt || R(Mt, q, Jt, { name: Ct }), D[rt] = Jt, Tt;
      };
    }, 7657: (d, g, a) => {
      var p, f, m, v = a(9039), j = a(4901), O = a(34), x = a(2360), S = a(2787), P = a(6840), A = a(8227), R = a(6395), L = A("iterator"), D = !1;
      [].keys && ("next" in (m = [].keys()) ? (f = S(S(m))) !== Object.prototype && (p = f) : D = !0), !O(p) || v(function() {
        var N = {};
        return p[L].call(N) !== N;
      }) ? p = {} : R && (p = x(p)), j(p[L]) || P(p, L, function() {
        return this;
      }), d.exports = { IteratorPrototype: p, BUGGY_SAFARI_ITERATORS: D };
    }, 6269: (d) => {
      d.exports = {};
    }, 6198: (d, g, a) => {
      var p = a(8014);
      d.exports = function(f) {
        return p(f.length);
      };
    }, 283: (d, g, a) => {
      var p = a(9504), f = a(9039), m = a(4901), v = a(9297), j = a(3724), O = a(350).CONFIGURABLE, x = a(3706), S = a(1181), P = S.enforce, A = S.get, R = String, L = Object.defineProperty, D = p("".slice), N = p("".replace), H = p([].join), M = j && !f(function() {
        return L(function() {
        }, "length", { value: 8 }).length !== 8;
      }), F = String(String).split("String"), U = d.exports = function(q, Z, K) {
        D(R(Z), 0, 7) === "Symbol(" && (Z = "[" + N(R(Z), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), K && K.getter && (Z = "get " + Z), K && K.setter && (Z = "set " + Z), (!v(q, "name") || O && q.name !== Z) && (j ? L(q, "name", { value: Z, configurable: !0 }) : q.name = Z), M && K && v(K, "arity") && q.length !== K.arity && L(q, "length", { value: K.arity });
        try {
          K && v(K, "constructor") && K.constructor ? j && L(q, "prototype", { writable: !1 }) : q.prototype && (q.prototype = void 0);
        } catch {
        }
        var tt = P(q);
        return v(tt, "source") || (tt.source = H(F, typeof Z == "string" ? Z : "")), q;
      };
      Function.prototype.toString = U(function() {
        return m(this) && A(this).source || x(this);
      }, "toString");
    }, 741: (d) => {
      var g = Math.ceil, a = Math.floor;
      d.exports = Math.trunc || function(p) {
        var f = +p;
        return (f > 0 ? a : g)(f);
      };
    }, 1955: (d, g, a) => {
      var p, f, m, v, j, O = a(4475), x = a(3389), S = a(6080), P = a(9225).set, A = a(8265), R = a(8119), L = a(28), D = a(6765), N = a(9088), H = O.MutationObserver || O.WebKitMutationObserver, M = O.document, F = O.process, U = O.Promise, q = x("queueMicrotask");
      if (!q) {
        var Z = new A(), K = function() {
          var tt, at;
          for (N && (tt = F.domain) && tt.exit(); at = Z.get(); ) try {
            at();
          } catch (nt) {
            throw Z.head && p(), nt;
          }
          tt && tt.enter();
        };
        R || N || D || !H || !M ? !L && U && U.resolve ? ((v = U.resolve(void 0)).constructor = U, j = S(v.then, v), p = function() {
          j(K);
        }) : N ? p = function() {
          F.nextTick(K);
        } : (P = S(P, O), p = function() {
          P(K);
        }) : (f = !0, m = M.createTextNode(""), new H(K).observe(m, { characterData: !0 }), p = function() {
          m.data = f = !f;
        }), q = function(tt) {
          Z.head || p(), Z.add(tt);
        };
      }
      d.exports = q;
    }, 6043: (d, g, a) => {
      var p = a(9306), f = TypeError, m = function(v) {
        var j, O;
        this.promise = new v(function(x, S) {
          if (j !== void 0 || O !== void 0) throw new f("Bad Promise constructor");
          j = x, O = S;
        }), this.resolve = p(j), this.reject = p(O);
      };
      d.exports.f = function(v) {
        return new m(v);
      };
    }, 5749: (d, g, a) => {
      var p = a(788), f = TypeError;
      d.exports = function(m) {
        if (p(m)) throw new f("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (d, g, a) => {
      var p = a(4475), f = a(9039), m = a(9504), v = a(655), j = a(3802).trim, O = a(7452), x = m("".charAt), S = p.parseFloat, P = p.Symbol, A = P && P.iterator, R = 1 / S(O + "-0") != -1 / 0 || A && !f(function() {
        S(Object(A));
      });
      d.exports = R ? function(L) {
        var D = j(v(L)), N = S(D);
        return N === 0 && x(D, 0) === "-" ? -0 : N;
      } : S;
    }, 2703: (d, g, a) => {
      var p = a(4475), f = a(9039), m = a(9504), v = a(655), j = a(3802).trim, O = a(7452), x = p.parseInt, S = p.Symbol, P = S && S.iterator, A = /^[+-]?0x/i, R = m(A.exec), L = x(O + "08") !== 8 || x(O + "0x16") !== 22 || P && !f(function() {
        x(Object(P));
      });
      d.exports = L ? function(D, N) {
        var H = j(v(D));
        return x(H, N >>> 0 || (R(A, H) ? 16 : 10));
      } : x;
    }, 4213: (d, g, a) => {
      var p = a(3724), f = a(9504), m = a(9565), v = a(9039), j = a(1072), O = a(3717), x = a(8773), S = a(8981), P = a(7055), A = Object.assign, R = Object.defineProperty, L = f([].concat);
      d.exports = !A || v(function() {
        if (p && A({ b: 1 }, A(R({}, "a", { enumerable: !0, get: function() {
          R(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var D = {}, N = {}, H = Symbol("assign detection"), M = "abcdefghijklmnopqrst";
        return D[H] = 7, M.split("").forEach(function(F) {
          N[F] = F;
        }), A({}, D)[H] !== 7 || j(A({}, N)).join("") !== M;
      }) ? function(D, N) {
        for (var H = S(D), M = arguments.length, F = 1, U = O.f, q = x.f; M > F; ) for (var Z, K = P(arguments[F++]), tt = U ? L(j(K), U(K)) : j(K), at = tt.length, nt = 0; at > nt; ) Z = tt[nt++], p && !m(q, K, Z) || (H[Z] = K[Z]);
        return H;
      } : A;
    }, 2360: (d, g, a) => {
      var p, f = a(8551), m = a(6801), v = a(8727), j = a(421), O = a(397), x = a(4055), S = a(6119), P = "prototype", A = "script", R = S("IE_PROTO"), L = function() {
      }, D = function(M) {
        return "<" + A + ">" + M + "</" + A + ">";
      }, N = function(M) {
        M.write(D("")), M.close();
        var F = M.parentWindow.Object;
        return M = null, F;
      }, H = function() {
        try {
          p = new ActiveXObject("htmlfile");
        } catch {
        }
        var M, F, U;
        H = typeof document < "u" ? document.domain && p ? N(p) : (F = x("iframe"), U = "java" + A + ":", F.style.display = "none", O.appendChild(F), F.src = String(U), (M = F.contentWindow.document).open(), M.write(D("document.F=Object")), M.close(), M.F) : N(p);
        for (var q = v.length; q--; ) delete H[P][v[q]];
        return H();
      };
      j[R] = !0, d.exports = Object.create || function(M, F) {
        var U;
        return M !== null ? (L[P] = f(M), U = new L(), L[P] = null, U[R] = M) : U = H(), F === void 0 ? U : m.f(U, F);
      };
    }, 6801: (d, g, a) => {
      var p = a(3724), f = a(8686), m = a(4913), v = a(8551), j = a(5397), O = a(1072);
      g.f = p && !f ? Object.defineProperties : function(x, S) {
        v(x);
        for (var P, A = j(S), R = O(S), L = R.length, D = 0; L > D; ) m.f(x, P = R[D++], A[P]);
        return x;
      };
    }, 4913: (d, g, a) => {
      var p = a(3724), f = a(5917), m = a(8686), v = a(8551), j = a(6969), O = TypeError, x = Object.defineProperty, S = Object.getOwnPropertyDescriptor, P = "enumerable", A = "configurable", R = "writable";
      g.f = p ? m ? function(L, D, N) {
        if (v(L), D = j(D), v(N), typeof L == "function" && D === "prototype" && "value" in N && R in N && !N[R]) {
          var H = S(L, D);
          H && H[R] && (L[D] = N.value, N = { configurable: A in N ? N[A] : H[A], enumerable: P in N ? N[P] : H[P], writable: !1 });
        }
        return x(L, D, N);
      } : x : function(L, D, N) {
        if (v(L), D = j(D), v(N), f) try {
          return x(L, D, N);
        } catch {
        }
        if ("get" in N || "set" in N) throw new O("Accessors not supported");
        return "value" in N && (L[D] = N.value), L;
      };
    }, 7347: (d, g, a) => {
      var p = a(3724), f = a(9565), m = a(8773), v = a(6980), j = a(5397), O = a(6969), x = a(9297), S = a(5917), P = Object.getOwnPropertyDescriptor;
      g.f = p ? P : function(A, R) {
        if (A = j(A), R = O(R), S) try {
          return P(A, R);
        } catch {
        }
        if (x(A, R)) return v(!f(m.f, A, R), A[R]);
      };
    }, 298: (d, g, a) => {
      var p = a(4576), f = a(5397), m = a(8480).f, v = a(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      d.exports.f = function(O) {
        return j && p(O) === "Window" ? function(x) {
          try {
            return m(x);
          } catch {
            return v(j);
          }
        }(O) : m(f(O));
      };
    }, 8480: (d, g, a) => {
      var p = a(1828), f = a(8727).concat("length", "prototype");
      g.f = Object.getOwnPropertyNames || function(m) {
        return p(m, f);
      };
    }, 3717: (d, g) => {
      g.f = Object.getOwnPropertySymbols;
    }, 2787: (d, g, a) => {
      var p = a(9297), f = a(4901), m = a(8981), v = a(6119), j = a(2211), O = v("IE_PROTO"), x = Object, S = x.prototype;
      d.exports = j ? x.getPrototypeOf : function(P) {
        var A = m(P);
        if (p(A, O)) return A[O];
        var R = A.constructor;
        return f(R) && A instanceof R ? R.prototype : A instanceof x ? S : null;
      };
    }, 1625: (d, g, a) => {
      var p = a(9504);
      d.exports = p({}.isPrototypeOf);
    }, 1828: (d, g, a) => {
      var p = a(9504), f = a(9297), m = a(5397), v = a(9617).indexOf, j = a(421), O = p([].push);
      d.exports = function(x, S) {
        var P, A = m(x), R = 0, L = [];
        for (P in A) !f(j, P) && f(A, P) && O(L, P);
        for (; S.length > R; ) f(A, P = S[R++]) && (~v(L, P) || O(L, P));
        return L;
      };
    }, 1072: (d, g, a) => {
      var p = a(1828), f = a(8727);
      d.exports = Object.keys || function(m) {
        return p(m, f);
      };
    }, 8773: (d, g) => {
      var a = {}.propertyIsEnumerable, p = Object.getOwnPropertyDescriptor, f = p && !a.call({ 1: 2 }, 1);
      g.f = f ? function(m) {
        var v = p(this, m);
        return !!v && v.enumerable;
      } : a;
    }, 2967: (d, g, a) => {
      var p = a(6706), f = a(34), m = a(7750), v = a(3506);
      d.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, O = !1, x = {};
        try {
          (j = p(Object.prototype, "__proto__", "set"))(x, []), O = x instanceof Array;
        } catch {
        }
        return function(S, P) {
          return m(S), v(P), f(S) && (O ? j(S, P) : S.__proto__ = P), S;
        };
      }() : void 0);
    }, 2357: (d, g, a) => {
      var p = a(3724), f = a(9039), m = a(9504), v = a(2787), j = a(1072), O = a(5397), x = m(a(8773).f), S = m([].push), P = p && f(function() {
        var R = /* @__PURE__ */ Object.create(null);
        return R[2] = 2, !x(R, 2);
      }), A = function(R) {
        return function(L) {
          for (var D, N = O(L), H = j(N), M = P && v(N) === null, F = H.length, U = 0, q = []; F > U; ) D = H[U++], p && !(M ? D in N : x(N, D)) || S(q, R ? [D, N[D]] : N[D]);
          return q;
        };
      };
      d.exports = { entries: A(!0), values: A(!1) };
    }, 3179: (d, g, a) => {
      var p = a(2140), f = a(6955);
      d.exports = p ? {}.toString : function() {
        return "[object " + f(this) + "]";
      };
    }, 4270: (d, g, a) => {
      var p = a(9565), f = a(4901), m = a(34), v = TypeError;
      d.exports = function(j, O) {
        var x, S;
        if (O === "string" && f(x = j.toString) && !m(S = p(x, j)) || f(x = j.valueOf) && !m(S = p(x, j)) || O !== "string" && f(x = j.toString) && !m(S = p(x, j))) return S;
        throw new v("Can't convert object to primitive value");
      };
    }, 5031: (d, g, a) => {
      var p = a(7751), f = a(9504), m = a(8480), v = a(3717), j = a(8551), O = f([].concat);
      d.exports = p("Reflect", "ownKeys") || function(x) {
        var S = m.f(j(x)), P = v.f;
        return P ? O(S, P(x)) : S;
      };
    }, 9167: (d, g, a) => {
      var p = a(4475);
      d.exports = p;
    }, 1103: (d) => {
      d.exports = function(g) {
        try {
          return { error: !1, value: g() };
        } catch (a) {
          return { error: !0, value: a };
        }
      };
    }, 916: (d, g, a) => {
      var p = a(4475), f = a(550), m = a(4901), v = a(2796), j = a(3706), O = a(8227), x = a(7290), S = a(516), P = a(6395), A = a(7388), R = f && f.prototype, L = O("species"), D = !1, N = m(p.PromiseRejectionEvent), H = v("Promise", function() {
        var M = j(f), F = M !== String(f);
        if (!F && A === 66 || P && (!R.catch || !R.finally)) return !0;
        if (!A || A < 51 || !/native code/.test(M)) {
          var U = new f(function(Z) {
            Z(1);
          }), q = function(Z) {
            Z(function() {
            }, function() {
            });
          };
          if ((U.constructor = {})[L] = q, !(D = U.then(function() {
          }) instanceof q)) return !0;
        }
        return !F && (x || S) && !N;
      });
      d.exports = { CONSTRUCTOR: H, REJECTION_EVENT: N, SUBCLASSING: D };
    }, 550: (d, g, a) => {
      var p = a(4475);
      d.exports = p.Promise;
    }, 3438: (d, g, a) => {
      var p = a(8551), f = a(34), m = a(6043);
      d.exports = function(v, j) {
        if (p(v), f(j) && j.constructor === v) return j;
        var O = m.f(v);
        return (0, O.resolve)(j), O.promise;
      };
    }, 537: (d, g, a) => {
      var p = a(550), f = a(4428), m = a(916).CONSTRUCTOR;
      d.exports = m || !f(function(v) {
        p.all(v).then(void 0, function() {
        });
      });
    }, 1056: (d, g, a) => {
      var p = a(4913).f;
      d.exports = function(f, m, v) {
        v in f || p(f, v, { configurable: !0, get: function() {
          return m[v];
        }, set: function(j) {
          m[v] = j;
        } });
      };
    }, 8265: (d) => {
      var g = function() {
        this.head = null, this.tail = null;
      };
      g.prototype = { add: function(a) {
        var p = { item: a, next: null }, f = this.tail;
        f ? f.next = p : this.head = p, this.tail = p;
      }, get: function() {
        var a = this.head;
        if (a) return (this.head = a.next) === null && (this.tail = null), a.item;
      } }, d.exports = g;
    }, 6682: (d, g, a) => {
      var p = a(9565), f = a(8551), m = a(4901), v = a(4576), j = a(7323), O = TypeError;
      d.exports = function(x, S) {
        var P = x.exec;
        if (m(P)) {
          var A = p(P, x, S);
          return A !== null && f(A), A;
        }
        if (v(x) === "RegExp") return p(j, x, S);
        throw new O("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (d, g, a) => {
      var p, f, m = a(9565), v = a(9504), j = a(655), O = a(7979), x = a(8429), S = a(5745), P = a(2360), A = a(1181).get, R = a(3635), L = a(8814), D = S("native-string-replace", String.prototype.replace), N = RegExp.prototype.exec, H = N, M = v("".charAt), F = v("".indexOf), U = v("".replace), q = v("".slice), Z = (f = /b*/g, m(N, p = /a/, "a"), m(N, f, "a"), p.lastIndex !== 0 || f.lastIndex !== 0), K = x.BROKEN_CARET, tt = /()??/.exec("")[1] !== void 0;
      (Z || tt || K || R || L) && (H = function(at) {
        var nt, rt, lt, bt, Ct, St, Pt, pt = this, Tt = A(pt), Et = j(at), Gt = Tt.raw;
        if (Gt) return Gt.lastIndex = pt.lastIndex, nt = m(H, Gt, Et), pt.lastIndex = Gt.lastIndex, nt;
        var Qt = Tt.groups, Zt = K && pt.sticky, Mt = m(O, pt), Lt = pt.source, Jt = 0, T = Et;
        if (Zt && (Mt = U(Mt, "y", ""), F(Mt, "g") === -1 && (Mt += "g"), T = q(Et, pt.lastIndex), pt.lastIndex > 0 && (!pt.multiline || pt.multiline && M(Et, pt.lastIndex - 1) !== `
`) && (Lt = "(?: " + Lt + ")", T = " " + T, Jt++), rt = new RegExp("^(?:" + Lt + ")", Mt)), tt && (rt = new RegExp("^" + Lt + "$(?!\\s)", Mt)), Z && (lt = pt.lastIndex), bt = m(N, Zt ? rt : pt, T), Zt ? bt ? (bt.input = q(bt.input, Jt), bt[0] = q(bt[0], Jt), bt.index = pt.lastIndex, pt.lastIndex += bt[0].length) : pt.lastIndex = 0 : Z && bt && (pt.lastIndex = pt.global ? bt.index + bt[0].length : lt), tt && bt && bt.length > 1 && m(D, bt[0], rt, function() {
          for (Ct = 1; Ct < arguments.length - 2; Ct++) arguments[Ct] === void 0 && (bt[Ct] = void 0);
        }), bt && Qt) for (bt.groups = St = P(null), Ct = 0; Ct < Qt.length; Ct++) St[(Pt = Qt[Ct])[0]] = bt[Pt[1]];
        return bt;
      }), d.exports = H;
    }, 7979: (d, g, a) => {
      var p = a(8551);
      d.exports = function() {
        var f = p(this), m = "";
        return f.hasIndices && (m += "d"), f.global && (m += "g"), f.ignoreCase && (m += "i"), f.multiline && (m += "m"), f.dotAll && (m += "s"), f.unicode && (m += "u"), f.unicodeSets && (m += "v"), f.sticky && (m += "y"), m;
      };
    }, 1034: (d, g, a) => {
      var p = a(9565), f = a(9297), m = a(1625), v = a(7979), j = RegExp.prototype;
      d.exports = function(O) {
        var x = O.flags;
        return x !== void 0 || "flags" in j || f(O, "flags") || !m(j, O) ? x : p(v, O);
      };
    }, 8429: (d, g, a) => {
      var p = a(9039), f = a(4475).RegExp, m = p(function() {
        var O = f("a", "y");
        return O.lastIndex = 2, O.exec("abcd") !== null;
      }), v = m || p(function() {
        return !f("a", "y").sticky;
      }), j = m || p(function() {
        var O = f("^r", "gy");
        return O.lastIndex = 2, O.exec("str") !== null;
      });
      d.exports = { BROKEN_CARET: j, MISSED_STICKY: v, UNSUPPORTED_Y: m };
    }, 3635: (d, g, a) => {
      var p = a(9039), f = a(4475).RegExp;
      d.exports = p(function() {
        var m = f(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (d, g, a) => {
      var p = a(9039), f = a(4475).RegExp;
      d.exports = p(function() {
        var m = f("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (d, g, a) => {
      var p = a(4117), f = TypeError;
      d.exports = function(m) {
        if (p(m)) throw new f("Can't call method on " + m);
        return m;
      };
    }, 3389: (d, g, a) => {
      var p = a(4475), f = a(3724), m = Object.getOwnPropertyDescriptor;
      d.exports = function(v) {
        if (!f) return p[v];
        var j = m(p, v);
        return j && j.value;
      };
    }, 9472: (d, g, a) => {
      var p, f = a(4475), m = a(8745), v = a(4901), j = a(6763), O = a(9392), x = a(7680), S = a(2812), P = f.Function, A = /MSIE .\./.test(O) || j && ((p = f.Bun.version.split(".")).length < 3 || p[0] === "0" && (p[1] < 3 || p[1] === "3" && p[2] === "0"));
      d.exports = function(R, L) {
        var D = L ? 2 : 1;
        return A ? function(N, H) {
          var M = S(arguments.length, 1) > D, F = v(N) ? N : P(N), U = M ? x(arguments, D) : [], q = M ? function() {
            m(F, this, U);
          } : F;
          return L ? R(q, H) : R(q);
        } : R;
      };
    }, 7633: (d, g, a) => {
      var p = a(7751), f = a(2106), m = a(8227), v = a(3724), j = m("species");
      d.exports = function(O) {
        var x = p(O);
        v && x && !x[j] && f(x, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (d, g, a) => {
      var p = a(4913).f, f = a(9297), m = a(8227)("toStringTag");
      d.exports = function(v, j, O) {
        v && !O && (v = v.prototype), v && !f(v, m) && p(v, m, { configurable: !0, value: j });
      };
    }, 6119: (d, g, a) => {
      var p = a(5745), f = a(3392), m = p("keys");
      d.exports = function(v) {
        return m[v] || (m[v] = f(v));
      };
    }, 7629: (d, g, a) => {
      var p = a(6395), f = a(4475), m = a(9433), v = "__core-js_shared__", j = d.exports = f[v] || m(v, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: p ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (d, g, a) => {
      var p = a(7629);
      d.exports = function(f, m) {
        return p[f] || (p[f] = m || {});
      };
    }, 2293: (d, g, a) => {
      var p = a(8551), f = a(5548), m = a(4117), v = a(8227)("species");
      d.exports = function(j, O) {
        var x, S = p(j).constructor;
        return S === void 0 || m(x = p(S)[v]) ? O : f(x);
      };
    }, 8183: (d, g, a) => {
      var p = a(9504), f = a(1291), m = a(655), v = a(7750), j = p("".charAt), O = p("".charCodeAt), x = p("".slice), S = function(P) {
        return function(A, R) {
          var L, D, N = m(v(A)), H = f(R), M = N.length;
          return H < 0 || H >= M ? P ? "" : void 0 : (L = O(N, H)) < 55296 || L > 56319 || H + 1 === M || (D = O(N, H + 1)) < 56320 || D > 57343 ? P ? j(N, H) : L : P ? x(N, H, H + 2) : D - 56320 + (L - 55296 << 10) + 65536;
        };
      };
      d.exports = { codeAt: S(!1), charAt: S(!0) };
    }, 533: (d, g, a) => {
      var p = a(9504), f = a(8014), m = a(655), v = a(2333), j = a(7750), O = p(v), x = p("".slice), S = Math.ceil, P = function(A) {
        return function(R, L, D) {
          var N, H, M = m(j(R)), F = f(L), U = M.length, q = D === void 0 ? " " : m(D);
          return F <= U || q === "" ? M : ((H = O(q, S((N = F - U) / q.length))).length > N && (H = x(H, 0, N)), A ? M + H : H + M);
        };
      };
      d.exports = { start: P(!1), end: P(!0) };
    }, 2333: (d, g, a) => {
      var p = a(1291), f = a(655), m = a(7750), v = RangeError;
      d.exports = function(j) {
        var O = f(m(this)), x = "", S = p(j);
        if (S < 0 || S === 1 / 0) throw new v("Wrong number of repetitions");
        for (; S > 0; (S >>>= 1) && (O += O)) 1 & S && (x += O);
        return x;
      };
    }, 706: (d, g, a) => {
      var p = a(350).PROPER, f = a(9039), m = a(7452);
      d.exports = function(v) {
        return f(function() {
          return !!m[v]() || "​᠎"[v]() !== "​᠎" || p && m[v].name !== v;
        });
      };
    }, 3802: (d, g, a) => {
      var p = a(9504), f = a(7750), m = a(655), v = a(7452), j = p("".replace), O = RegExp("^[" + v + "]+"), x = RegExp("(^|[^" + v + "])[" + v + "]+$"), S = function(P) {
        return function(A) {
          var R = m(f(A));
          return 1 & P && (R = j(R, O, "")), 2 & P && (R = j(R, x, "$1")), R;
        };
      };
      d.exports = { start: S(1), end: S(2), trim: S(3) };
    }, 4495: (d, g, a) => {
      var p = a(7388), f = a(9039), m = a(4475).String;
      d.exports = !!Object.getOwnPropertySymbols && !f(function() {
        var v = Symbol("symbol detection");
        return !m(v) || !(Object(v) instanceof Symbol) || !Symbol.sham && p && p < 41;
      });
    }, 8242: (d, g, a) => {
      var p = a(9565), f = a(7751), m = a(8227), v = a(6840);
      d.exports = function() {
        var j = f("Symbol"), O = j && j.prototype, x = O && O.valueOf, S = m("toPrimitive");
        O && !O[S] && v(O, S, function(P) {
          return p(x, this);
        }, { arity: 1 });
      };
    }, 1296: (d, g, a) => {
      var p = a(4495);
      d.exports = p && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (d, g, a) => {
      var p, f, m, v, j = a(4475), O = a(8745), x = a(6080), S = a(4901), P = a(9297), A = a(9039), R = a(397), L = a(7680), D = a(4055), N = a(2812), H = a(8119), M = a(9088), F = j.setImmediate, U = j.clearImmediate, q = j.process, Z = j.Dispatch, K = j.Function, tt = j.MessageChannel, at = j.String, nt = 0, rt = {}, lt = "onreadystatechange";
      A(function() {
        p = j.location;
      });
      var bt = function(pt) {
        if (P(rt, pt)) {
          var Tt = rt[pt];
          delete rt[pt], Tt();
        }
      }, Ct = function(pt) {
        return function() {
          bt(pt);
        };
      }, St = function(pt) {
        bt(pt.data);
      }, Pt = function(pt) {
        j.postMessage(at(pt), p.protocol + "//" + p.host);
      };
      F && U || (F = function(pt) {
        N(arguments.length, 1);
        var Tt = S(pt) ? pt : K(pt), Et = L(arguments, 1);
        return rt[++nt] = function() {
          O(Tt, void 0, Et);
        }, f(nt), nt;
      }, U = function(pt) {
        delete rt[pt];
      }, M ? f = function(pt) {
        q.nextTick(Ct(pt));
      } : Z && Z.now ? f = function(pt) {
        Z.now(Ct(pt));
      } : tt && !H ? (v = (m = new tt()).port2, m.port1.onmessage = St, f = x(v.postMessage, v)) : j.addEventListener && S(j.postMessage) && !j.importScripts && p && p.protocol !== "file:" && !A(Pt) ? (f = Pt, j.addEventListener("message", St, !1)) : f = lt in D("script") ? function(pt) {
        R.appendChild(D("script"))[lt] = function() {
          R.removeChild(this), bt(pt);
        };
      } : function(pt) {
        setTimeout(Ct(pt), 0);
      }), d.exports = { set: F, clear: U };
    }, 1240: (d, g, a) => {
      var p = a(9504);
      d.exports = p(1 .valueOf);
    }, 5610: (d, g, a) => {
      var p = a(1291), f = Math.max, m = Math.min;
      d.exports = function(v, j) {
        var O = p(v);
        return O < 0 ? f(O + j, 0) : m(O, j);
      };
    }, 5397: (d, g, a) => {
      var p = a(7055), f = a(7750);
      d.exports = function(m) {
        return p(f(m));
      };
    }, 1291: (d, g, a) => {
      var p = a(741);
      d.exports = function(f) {
        var m = +f;
        return m != m || m === 0 ? 0 : p(m);
      };
    }, 8014: (d, g, a) => {
      var p = a(1291), f = Math.min;
      d.exports = function(m) {
        var v = p(m);
        return v > 0 ? f(v, 9007199254740991) : 0;
      };
    }, 8981: (d, g, a) => {
      var p = a(7750), f = Object;
      d.exports = function(m) {
        return f(p(m));
      };
    }, 2777: (d, g, a) => {
      var p = a(9565), f = a(34), m = a(757), v = a(5966), j = a(4270), O = a(8227), x = TypeError, S = O("toPrimitive");
      d.exports = function(P, A) {
        if (!f(P) || m(P)) return P;
        var R, L = v(P, S);
        if (L) {
          if (A === void 0 && (A = "default"), R = p(L, P, A), !f(R) || m(R)) return R;
          throw new x("Can't convert object to primitive value");
        }
        return A === void 0 && (A = "number"), j(P, A);
      };
    }, 6969: (d, g, a) => {
      var p = a(2777), f = a(757);
      d.exports = function(m) {
        var v = p(m, "string");
        return f(v) ? v : v + "";
      };
    }, 2140: (d, g, a) => {
      var p = {};
      p[a(8227)("toStringTag")] = "z", d.exports = String(p) === "[object z]";
    }, 655: (d, g, a) => {
      var p = a(6955), f = String;
      d.exports = function(m) {
        if (p(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return f(m);
      };
    }, 6823: (d) => {
      var g = String;
      d.exports = function(a) {
        try {
          return g(a);
        } catch {
          return "Object";
        }
      };
    }, 3392: (d, g, a) => {
      var p = a(9504), f = 0, m = Math.random(), v = p(1 .toString);
      d.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + v(++f + m, 36);
      };
    }, 7040: (d, g, a) => {
      var p = a(4495);
      d.exports = p && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (d, g, a) => {
      var p = a(3724), f = a(9039);
      d.exports = p && f(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (d) => {
      var g = TypeError;
      d.exports = function(a, p) {
        if (a < p) throw new g("Not enough arguments");
        return a;
      };
    }, 8622: (d, g, a) => {
      var p = a(4475), f = a(4901), m = p.WeakMap;
      d.exports = f(m) && /native code/.test(String(m));
    }, 511: (d, g, a) => {
      var p = a(9167), f = a(9297), m = a(1951), v = a(4913).f;
      d.exports = function(j) {
        var O = p.Symbol || (p.Symbol = {});
        f(O, j) || v(O, j, { value: m.f(j) });
      };
    }, 1951: (d, g, a) => {
      var p = a(8227);
      g.f = p;
    }, 8227: (d, g, a) => {
      var p = a(4475), f = a(5745), m = a(9297), v = a(3392), j = a(4495), O = a(7040), x = p.Symbol, S = f("wks"), P = O ? x.for || x : x && x.withoutSetter || v;
      d.exports = function(A) {
        return m(S, A) || (S[A] = j && m(x, A) ? x[A] : P("Symbol." + A)), S[A];
      };
    }, 7452: (d) => {
      d.exports = `
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (d, g, a) => {
      var p = a(6518), f = a(9039), m = a(4376), v = a(34), j = a(8981), O = a(6198), x = a(6837), S = a(4659), P = a(1469), A = a(597), R = a(8227), L = a(7388), D = R("isConcatSpreadable"), N = L >= 51 || !f(function() {
        var M = [];
        return M[D] = !1, M.concat()[0] !== M;
      }), H = function(M) {
        if (!v(M)) return !1;
        var F = M[D];
        return F !== void 0 ? !!F : m(M);
      };
      p({ target: "Array", proto: !0, arity: 1, forced: !N || !A("concat") }, { concat: function(M) {
        var F, U, q, Z, K, tt = j(this), at = P(tt, 0), nt = 0;
        for (F = -1, q = arguments.length; F < q; F++) if (H(K = F === -1 ? tt : arguments[F])) for (Z = O(K), x(nt + Z), U = 0; U < Z; U++, nt++) U in K && S(at, nt, K[U]);
        else x(nt + 1), S(at, nt++, K);
        return at.length = nt, at;
      } });
    }, 8431: (d, g, a) => {
      var p = a(6518), f = a(9213).every;
      p({ target: "Array", proto: !0, forced: !a(4598)("every") }, { every: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (d, g, a) => {
      var p = a(6518), f = a(9213).filter;
      p({ target: "Array", proto: !0, forced: !a(597)("filter") }, { filter: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (d, g, a) => {
      var p = a(6518), f = a(9213).find, m = a(6469), v = "find", j = !0;
      v in [] && Array(1)[v](function() {
        j = !1;
      }), p({ target: "Array", proto: !0, forced: j }, { find: function(O) {
        return f(this, O, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(v);
    }, 1629: (d, g, a) => {
      var p = a(6518), f = a(235);
      p({ target: "Array", proto: !0, forced: [].forEach !== f }, { forEach: f });
    }, 3418: (d, g, a) => {
      var p = a(6518), f = a(7916);
      p({ target: "Array", stat: !0, forced: !a(4428)(function(m) {
        Array.from(m);
      }) }, { from: f });
    }, 4423: (d, g, a) => {
      var p = a(6518), f = a(9617).includes, m = a(9039), v = a(6469);
      p({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return f(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), v("includes");
    }, 5276: (d, g, a) => {
      var p = a(6518), f = a(7476), m = a(9617).indexOf, v = a(4598), j = f([].indexOf), O = !!j && 1 / j([1], 1, -0) < 0;
      p({ target: "Array", proto: !0, forced: O || !v("indexOf") }, { indexOf: function(x) {
        var S = arguments.length > 1 ? arguments[1] : void 0;
        return O ? j(this, x, S) || 0 : m(this, x, S);
      } });
    }, 4346: (d, g, a) => {
      a(6518)({ target: "Array", stat: !0 }, { isArray: a(4376) });
    }, 3792: (d, g, a) => {
      var p = a(5397), f = a(6469), m = a(6269), v = a(1181), j = a(4913).f, O = a(1088), x = a(2529), S = a(6395), P = a(3724), A = "Array Iterator", R = v.set, L = v.getterFor(A);
      d.exports = O(Array, "Array", function(N, H) {
        R(this, { type: A, target: p(N), index: 0, kind: H });
      }, function() {
        var N = L(this), H = N.target, M = N.index++;
        if (!H || M >= H.length) return N.target = void 0, x(void 0, !0);
        switch (N.kind) {
          case "keys":
            return x(M, !1);
          case "values":
            return x(H[M], !1);
        }
        return x([M, H[M]], !1);
      }, "values");
      var D = m.Arguments = m.Array;
      if (f("keys"), f("values"), f("entries"), !S && P && D.name !== "values") try {
        j(D, "name", { value: "values" });
      } catch {
      }
    }, 8598: (d, g, a) => {
      var p = a(6518), f = a(9504), m = a(7055), v = a(5397), j = a(4598), O = f([].join);
      p({ target: "Array", proto: !0, forced: m !== Object || !j("join", ",") }, { join: function(x) {
        return O(v(this), x === void 0 ? "," : x);
      } });
    }, 2062: (d, g, a) => {
      var p = a(6518), f = a(9213).map;
      p({ target: "Array", proto: !0, forced: !a(597)("map") }, { map: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (d, g, a) => {
      var p = a(6518), f = a(926).left, m = a(4598), v = a(7388);
      p({ target: "Array", proto: !0, forced: !a(9088) && v > 79 && v < 83 || !m("reduce") }, { reduce: function(j) {
        var O = arguments.length;
        return f(this, j, O, O > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (d, g, a) => {
      var p = a(6518), f = a(9504), m = a(4376), v = f([].reverse), j = [1, 2];
      p({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), v(this);
      } });
    }, 4782: (d, g, a) => {
      var p = a(6518), f = a(4376), m = a(3517), v = a(34), j = a(5610), O = a(6198), x = a(5397), S = a(4659), P = a(8227), A = a(597), R = a(7680), L = A("slice"), D = P("species"), N = Array, H = Math.max;
      p({ target: "Array", proto: !0, forced: !L }, { slice: function(M, F) {
        var U, q, Z, K = x(this), tt = O(K), at = j(M, tt), nt = j(F === void 0 ? tt : F, tt);
        if (f(K) && (U = K.constructor, (m(U) && (U === N || f(U.prototype)) || v(U) && (U = U[D]) === null) && (U = void 0), U === N || U === void 0)) return R(K, at, nt);
        for (q = new (U === void 0 ? N : U)(H(nt - at, 0)), Z = 0; at < nt; at++, Z++) at in K && S(q, Z, K[at]);
        return q.length = Z, q;
      } });
    }, 5086: (d, g, a) => {
      var p = a(6518), f = a(9213).some;
      p({ target: "Array", proto: !0, forced: !a(4598)("some") }, { some: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (d, g, a) => {
      var p = a(6518), f = a(9504), m = a(9306), v = a(8981), j = a(6198), O = a(4606), x = a(655), S = a(9039), P = a(4488), A = a(4598), R = a(8834), L = a(3202), D = a(7388), N = a(9160), H = [], M = f(H.sort), F = f(H.push), U = S(function() {
        H.sort(void 0);
      }), q = S(function() {
        H.sort(null);
      }), Z = A("sort"), K = !S(function() {
        if (D) return D < 70;
        if (!(R && R > 3)) {
          if (L) return !0;
          if (N) return N < 603;
          var tt, at, nt, rt, lt = "";
          for (tt = 65; tt < 76; tt++) {
            switch (at = String.fromCharCode(tt), tt) {
              case 66:
              case 69:
              case 70:
              case 72:
                nt = 3;
                break;
              case 68:
              case 71:
                nt = 4;
                break;
              default:
                nt = 2;
            }
            for (rt = 0; rt < 47; rt++) H.push({ k: at + rt, v: nt });
          }
          for (H.sort(function(bt, Ct) {
            return Ct.v - bt.v;
          }), rt = 0; rt < H.length; rt++) at = H[rt].k.charAt(0), lt.charAt(lt.length - 1) !== at && (lt += at);
          return lt !== "DGBEFHACIJK";
        }
      });
      p({ target: "Array", proto: !0, forced: U || !q || !Z || !K }, { sort: function(tt) {
        tt !== void 0 && m(tt);
        var at = v(this);
        if (K) return tt === void 0 ? M(at) : M(at, tt);
        var nt, rt, lt = [], bt = j(at);
        for (rt = 0; rt < bt; rt++) rt in at && F(lt, at[rt]);
        for (P(lt, /* @__PURE__ */ function(Ct) {
          return function(St, Pt) {
            return Pt === void 0 ? -1 : St === void 0 ? 1 : Ct !== void 0 ? +Ct(St, Pt) || 0 : x(St) > x(Pt) ? 1 : -1;
          };
        }(tt)), nt = j(lt), rt = 0; rt < nt; ) at[rt] = lt[rt++];
        for (; rt < bt; ) O(at, rt++);
        return at;
      } });
    }, 4554: (d, g, a) => {
      var p = a(6518), f = a(8981), m = a(5610), v = a(1291), j = a(6198), O = a(4527), x = a(6837), S = a(1469), P = a(4659), A = a(4606), R = a(597)("splice"), L = Math.max, D = Math.min;
      p({ target: "Array", proto: !0, forced: !R }, { splice: function(N, H) {
        var M, F, U, q, Z, K, tt = f(this), at = j(tt), nt = m(N, at), rt = arguments.length;
        for (rt === 0 ? M = F = 0 : rt === 1 ? (M = 0, F = at - nt) : (M = rt - 2, F = D(L(v(H), 0), at - nt)), x(at + M - F), U = S(tt, F), q = 0; q < F; q++) (Z = nt + q) in tt && P(U, q, tt[Z]);
        if (U.length = F, M < F) {
          for (q = nt; q < at - F; q++) K = q + M, (Z = q + F) in tt ? tt[K] = tt[Z] : A(tt, K);
          for (q = at; q > at - F + M; q--) A(tt, q - 1);
        } else if (M > F) for (q = at - F; q > nt; q--) K = q + M - 1, (Z = q + F - 1) in tt ? tt[K] = tt[Z] : A(tt, K);
        for (q = 0; q < M; q++) tt[q + nt] = arguments[q + 2];
        return O(tt, at - F + M), U;
      } });
    }, 1688: (d, g, a) => {
      var p = a(6518), f = a(380);
      p({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== f }, { toISOString: f });
    }, 739: (d, g, a) => {
      var p = a(6518), f = a(9039), m = a(8981), v = a(2777);
      p({ target: "Date", proto: !0, arity: 1, forced: f(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var O = m(this), x = v(O, "number");
        return typeof x != "number" || isFinite(x) ? O.toISOString() : null;
      } });
    }, 9572: (d, g, a) => {
      var p = a(9297), f = a(6840), m = a(3640), v = a(8227)("toPrimitive"), j = Date.prototype;
      p(j, v) || f(j, v, m);
    }, 3288: (d, g, a) => {
      var p = a(9504), f = a(6840), m = Date.prototype, v = "Invalid Date", j = "toString", O = p(m[j]), x = p(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== v && f(m, j, function() {
        var S = x(this);
        return S == S ? O(this) : v;
      });
    }, 4170: (d, g, a) => {
      var p = a(6518), f = a(566);
      p({ target: "Function", proto: !0, forced: Function.bind !== f }, { bind: f });
    }, 2010: (d, g, a) => {
      var p = a(3724), f = a(350).EXISTS, m = a(9504), v = a(2106), j = Function.prototype, O = m(j.toString), x = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, S = m(x.exec);
      p && !f && v(j, "name", { configurable: !0, get: function() {
        try {
          return S(x, O(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (d, g, a) => {
      var p = a(6518), f = a(7751), m = a(8745), v = a(9565), j = a(9504), O = a(9039), x = a(4901), S = a(757), P = a(7680), A = a(6933), R = a(4495), L = String, D = f("JSON", "stringify"), N = j(/./.exec), H = j("".charAt), M = j("".charCodeAt), F = j("".replace), U = j(1 .toString), q = /[\uD800-\uDFFF]/g, Z = /^[\uD800-\uDBFF]$/, K = /^[\uDC00-\uDFFF]$/, tt = !R || O(function() {
        var lt = f("Symbol")("stringify detection");
        return D([lt]) !== "[null]" || D({ a: lt }) !== "{}" || D(Object(lt)) !== "{}";
      }), at = O(function() {
        return D("\uDF06\uD834") !== '"\\udf06\\ud834"' || D("\uDEAD") !== '"\\udead"';
      }), nt = function(lt, bt) {
        var Ct = P(arguments), St = A(bt);
        if (x(St) || lt !== void 0 && !S(lt)) return Ct[1] = function(Pt, pt) {
          if (x(St) && (pt = v(St, this, L(Pt), pt)), !S(pt)) return pt;
        }, m(D, null, Ct);
      }, rt = function(lt, bt, Ct) {
        var St = H(Ct, bt - 1), Pt = H(Ct, bt + 1);
        return N(Z, lt) && !N(K, Pt) || N(K, lt) && !N(Z, St) ? "\\u" + U(M(lt, 0), 16) : lt;
      };
      D && p({ target: "JSON", stat: !0, arity: 3, forced: tt || at }, { stringify: function(lt, bt, Ct) {
        var St = P(arguments), Pt = m(tt ? nt : D, null, St);
        return at && typeof Pt == "string" ? F(Pt, q, rt) : Pt;
      } });
    }, 4731: (d, g, a) => {
      var p = a(4475);
      a(687)(p.JSON, "JSON", !0);
    }, 479: (d, g, a) => {
      a(687)(Math, "Math", !0);
    }, 2892: (d, g, a) => {
      var p = a(6518), f = a(6395), m = a(3724), v = a(4475), j = a(9167), O = a(9504), x = a(2796), S = a(9297), P = a(3167), A = a(1625), R = a(757), L = a(2777), D = a(9039), N = a(8480).f, H = a(7347).f, M = a(4913).f, F = a(1240), U = a(3802).trim, q = "Number", Z = v[q], K = j[q], tt = Z.prototype, at = v.TypeError, nt = O("".slice), rt = O("".charCodeAt), lt = x(q, !Z(" 0o1") || !Z("0b1") || Z("+0x1")), bt = function(St) {
        var Pt, pt = arguments.length < 1 ? 0 : Z(function(Tt) {
          var Et = L(Tt, "number");
          return typeof Et == "bigint" ? Et : function(Gt) {
            var Qt, Zt, Mt, Lt, Jt, T, B, G, Y = L(Gt, "number");
            if (R(Y)) throw new at("Cannot convert a Symbol value to a number");
            if (typeof Y == "string" && Y.length > 2) {
              if (Y = U(Y), (Qt = rt(Y, 0)) === 43 || Qt === 45) {
                if ((Zt = rt(Y, 2)) === 88 || Zt === 120) return NaN;
              } else if (Qt === 48) {
                switch (rt(Y, 1)) {
                  case 66:
                  case 98:
                    Mt = 2, Lt = 49;
                    break;
                  case 79:
                  case 111:
                    Mt = 8, Lt = 55;
                    break;
                  default:
                    return +Y;
                }
                for (T = (Jt = nt(Y, 2)).length, B = 0; B < T; B++) if ((G = rt(Jt, B)) < 48 || G > Lt) return NaN;
                return parseInt(Jt, Mt);
              }
            }
            return +Y;
          }(Et);
        }(St));
        return A(tt, Pt = this) && D(function() {
          F(Pt);
        }) ? P(Object(pt), this, bt) : pt;
      };
      bt.prototype = tt, lt && !f && (tt.constructor = bt), p({ global: !0, constructor: !0, wrap: !0, forced: lt }, { Number: bt });
      var Ct = function(St, Pt) {
        for (var pt, Tt = m ? N(Pt) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Et = 0; Tt.length > Et; Et++) S(Pt, pt = Tt[Et]) && !S(St, pt) && M(St, pt, H(Pt, pt));
      };
      f && K && Ct(j[q], K), (lt || f) && Ct(j[q], Z);
    }, 9868: (d, g, a) => {
      var p = a(6518), f = a(9504), m = a(1291), v = a(1240), j = a(2333), O = a(9039), x = RangeError, S = String, P = Math.floor, A = f(j), R = f("".slice), L = f(1 .toFixed), D = function(F, U, q) {
        return U === 0 ? q : U % 2 == 1 ? D(F, U - 1, q * F) : D(F * F, U / 2, q);
      }, N = function(F, U, q) {
        for (var Z = -1, K = q; ++Z < 6; ) K += U * F[Z], F[Z] = K % 1e7, K = P(K / 1e7);
      }, H = function(F, U) {
        for (var q = 6, Z = 0; --q >= 0; ) Z += F[q], F[q] = P(Z / U), Z = Z % U * 1e7;
      }, M = function(F) {
        for (var U = 6, q = ""; --U >= 0; ) if (q !== "" || U === 0 || F[U] !== 0) {
          var Z = S(F[U]);
          q = q === "" ? Z : q + A("0", 7 - Z.length) + Z;
        }
        return q;
      };
      p({ target: "Number", proto: !0, forced: O(function() {
        return L(8e-5, 3) !== "0.000" || L(0.9, 0) !== "1" || L(1.255, 2) !== "1.25" || L(1000000000000000100, 0) !== "1000000000000000128";
      }) || !O(function() {
        L({});
      }) }, { toFixed: function(F) {
        var U, q, Z, K, tt = v(this), at = m(F), nt = [0, 0, 0, 0, 0, 0], rt = "", lt = "0";
        if (at < 0 || at > 20) throw new x("Incorrect fraction digits");
        if (tt != tt) return "NaN";
        if (tt <= -1e21 || tt >= 1e21) return S(tt);
        if (tt < 0 && (rt = "-", tt = -tt), tt > 1e-21) if (q = (U = function(bt) {
          for (var Ct = 0, St = bt; St >= 4096; ) Ct += 12, St /= 4096;
          for (; St >= 2; ) Ct += 1, St /= 2;
          return Ct;
        }(tt * D(2, 69, 1)) - 69) < 0 ? tt * D(2, -U, 1) : tt / D(2, U, 1), q *= 4503599627370496, (U = 52 - U) > 0) {
          for (N(nt, 0, q), Z = at; Z >= 7; ) N(nt, 1e7, 0), Z -= 7;
          for (N(nt, D(10, Z, 1), 0), Z = U - 1; Z >= 23; ) H(nt, 8388608), Z -= 23;
          H(nt, 1 << Z), N(nt, 1, 1), H(nt, 2), lt = M(nt);
        } else N(nt, 0, q), N(nt, 1 << -U, 0), lt = M(nt) + A("0", at);
        return at > 0 ? rt + ((K = lt.length) <= at ? "0." + A("0", at - K) + lt : R(lt, 0, K - at) + "." + R(lt, K - at)) : rt + lt;
      } });
    }, 9085: (d, g, a) => {
      var p = a(6518), f = a(4213);
      p({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== f }, { assign: f });
    }, 9904: (d, g, a) => {
      a(6518)({ target: "Object", stat: !0, sham: !a(3724) }, { create: a(2360) });
    }, 7945: (d, g, a) => {
      var p = a(6518), f = a(3724), m = a(6801).f;
      p({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !f }, { defineProperties: m });
    }, 4185: (d, g, a) => {
      var p = a(6518), f = a(3724), m = a(4913).f;
      p({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !f }, { defineProperty: m });
    }, 5506: (d, g, a) => {
      var p = a(6518), f = a(2357).entries;
      p({ target: "Object", stat: !0 }, { entries: function(m) {
        return f(m);
      } });
    }, 3851: (d, g, a) => {
      var p = a(6518), f = a(9039), m = a(5397), v = a(7347).f, j = a(3724);
      p({ target: "Object", stat: !0, forced: !j || f(function() {
        v(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(O, x) {
        return v(m(O), x);
      } });
    }, 1278: (d, g, a) => {
      var p = a(6518), f = a(3724), m = a(5031), v = a(5397), j = a(7347), O = a(4659);
      p({ target: "Object", stat: !0, sham: !f }, { getOwnPropertyDescriptors: function(x) {
        for (var S, P, A = v(x), R = j.f, L = m(A), D = {}, N = 0; L.length > N; ) (P = R(A, S = L[N++])) !== void 0 && O(D, S, P);
        return D;
      } });
    }, 9773: (d, g, a) => {
      var p = a(6518), f = a(4495), m = a(9039), v = a(3717), j = a(8981);
      p({ target: "Object", stat: !0, forced: !f || m(function() {
        v.f(1);
      }) }, { getOwnPropertySymbols: function(O) {
        var x = v.f;
        return x ? x(j(O)) : [];
      } });
    }, 875: (d, g, a) => {
      var p = a(6518), f = a(9039), m = a(8981), v = a(2787), j = a(2211);
      p({ target: "Object", stat: !0, forced: f(function() {
        v(1);
      }), sham: !j }, { getPrototypeOf: function(O) {
        return v(m(O));
      } });
    }, 9432: (d, g, a) => {
      var p = a(6518), f = a(8981), m = a(1072);
      p({ target: "Object", stat: !0, forced: a(9039)(function() {
        m(1);
      }) }, { keys: function(v) {
        return m(f(v));
      } });
    }, 287: (d, g, a) => {
      a(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: a(2967) });
    }, 6099: (d, g, a) => {
      var p = a(2140), f = a(6840), m = a(3179);
      p || f(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (d, g, a) => {
      var p = a(6518), f = a(2357).values;
      p({ target: "Object", stat: !0 }, { values: function(m) {
        return f(m);
      } });
    }, 8459: (d, g, a) => {
      var p = a(6518), f = a(3904);
      p({ global: !0, forced: parseFloat !== f }, { parseFloat: f });
    }, 8940: (d, g, a) => {
      var p = a(6518), f = a(2703);
      p({ global: !0, forced: parseInt !== f }, { parseInt: f });
    }, 6499: (d, g, a) => {
      var p = a(6518), f = a(9565), m = a(9306), v = a(6043), j = a(1103), O = a(2652);
      p({ target: "Promise", stat: !0, forced: a(537) }, { all: function(x) {
        var S = this, P = v.f(S), A = P.resolve, R = P.reject, L = j(function() {
          var D = m(S.resolve), N = [], H = 0, M = 1;
          O(x, function(F) {
            var U = H++, q = !1;
            M++, f(D, S, F).then(function(Z) {
              q || (q = !0, N[U] = Z, --M || A(N));
            }, R);
          }), --M || A(N);
        });
        return L.error && R(L.value), P.promise;
      } });
    }, 2003: (d, g, a) => {
      var p = a(6518), f = a(6395), m = a(916).CONSTRUCTOR, v = a(550), j = a(7751), O = a(4901), x = a(6840), S = v && v.prototype;
      if (p({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(A) {
        return this.then(void 0, A);
      } }), !f && O(v)) {
        var P = j("Promise").prototype.catch;
        S.catch !== P && x(S, "catch", P, { unsafe: !0 });
      }
    }, 436: (d, g, a) => {
      var p, f, m, v = a(6518), j = a(6395), O = a(9088), x = a(4475), S = a(9565), P = a(6840), A = a(2967), R = a(687), L = a(7633), D = a(9306), N = a(4901), H = a(34), M = a(679), F = a(2293), U = a(9225).set, q = a(1955), Z = a(3138), K = a(1103), tt = a(8265), at = a(1181), nt = a(550), rt = a(916), lt = a(6043), bt = "Promise", Ct = rt.CONSTRUCTOR, St = rt.REJECTION_EVENT, Pt = rt.SUBCLASSING, pt = at.getterFor(bt), Tt = at.set, Et = nt && nt.prototype, Gt = nt, Qt = Et, Zt = x.TypeError, Mt = x.document, Lt = x.process, Jt = lt.f, T = Jt, B = !!(Mt && Mt.createEvent && x.dispatchEvent), G = "unhandledrejection", Y = function(Q) {
        var ct;
        return !(!H(Q) || !N(ct = Q.then)) && ct;
      }, et = function(Q, ct) {
        var mt, Ot, Bt, Kt = ct.value, ne = ct.state === 1, Xt = ne ? Q.ok : Q.fail, re = Q.resolve, pe = Q.reject, te = Q.domain;
        try {
          Xt ? (ne || (ct.rejection === 2 && st(ct), ct.rejection = 1), Xt === !0 ? mt = Kt : (te && te.enter(), mt = Xt(Kt), te && (te.exit(), Bt = !0)), mt === Q.promise ? pe(new Zt("Promise-chain cycle")) : (Ot = Y(mt)) ? S(Ot, mt, re, pe) : re(mt)) : pe(Kt);
        } catch (ee) {
          te && !Bt && te.exit(), pe(ee);
        }
      }, it = function(Q, ct) {
        Q.notified || (Q.notified = !0, q(function() {
          for (var mt, Ot = Q.reactions; mt = Ot.get(); ) et(mt, Q);
          Q.notified = !1, ct && !Q.rejection && ft(Q);
        }));
      }, ht = function(Q, ct, mt) {
        var Ot, Bt;
        B ? ((Ot = Mt.createEvent("Event")).promise = ct, Ot.reason = mt, Ot.initEvent(Q, !1, !0), x.dispatchEvent(Ot)) : Ot = { promise: ct, reason: mt }, !St && (Bt = x["on" + Q]) ? Bt(Ot) : Q === G && Z("Unhandled promise rejection", mt);
      }, ft = function(Q) {
        S(U, x, function() {
          var ct, mt = Q.facade, Ot = Q.value;
          if (ut(Q) && (ct = K(function() {
            O ? Lt.emit("unhandledRejection", Ot, mt) : ht(G, mt, Ot);
          }), Q.rejection = O || ut(Q) ? 2 : 1, ct.error)) throw ct.value;
        });
      }, ut = function(Q) {
        return Q.rejection !== 1 && !Q.parent;
      }, st = function(Q) {
        S(U, x, function() {
          var ct = Q.facade;
          O ? Lt.emit("rejectionHandled", ct) : ht("rejectionhandled", ct, Q.value);
        });
      }, wt = function(Q, ct, mt) {
        return function(Ot) {
          Q(ct, Ot, mt);
        };
      }, yt = function(Q, ct, mt) {
        Q.done || (Q.done = !0, mt && (Q = mt), Q.value = ct, Q.state = 2, it(Q, !0));
      }, _t = function(Q, ct, mt) {
        if (!Q.done) {
          Q.done = !0, mt && (Q = mt);
          try {
            if (Q.facade === ct) throw new Zt("Promise can't be resolved itself");
            var Ot = Y(ct);
            Ot ? q(function() {
              var Bt = { done: !1 };
              try {
                S(Ot, ct, wt(_t, Bt, Q), wt(yt, Bt, Q));
              } catch (Kt) {
                yt(Bt, Kt, Q);
              }
            }) : (Q.value = ct, Q.state = 1, it(Q, !1));
          } catch (Bt) {
            yt({ done: !1 }, Bt, Q);
          }
        }
      };
      if (Ct && (Qt = (Gt = function(Q) {
        M(this, Qt), D(Q), S(p, this);
        var ct = pt(this);
        try {
          Q(wt(_t, ct), wt(yt, ct));
        } catch (mt) {
          yt(ct, mt);
        }
      }).prototype, (p = function(Q) {
        Tt(this, { type: bt, done: !1, notified: !1, parent: !1, reactions: new tt(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Qt, "then", function(Q, ct) {
        var mt = pt(this), Ot = Jt(F(this, Gt));
        return mt.parent = !0, Ot.ok = !N(Q) || Q, Ot.fail = N(ct) && ct, Ot.domain = O ? Lt.domain : void 0, mt.state === 0 ? mt.reactions.add(Ot) : q(function() {
          et(Ot, mt);
        }), Ot.promise;
      }), f = function() {
        var Q = new p(), ct = pt(Q);
        this.promise = Q, this.resolve = wt(_t, ct), this.reject = wt(yt, ct);
      }, lt.f = Jt = function(Q) {
        return Q === Gt || Q === void 0 ? new f(Q) : T(Q);
      }, !j && N(nt) && Et !== Object.prototype)) {
        m = Et.then, Pt || P(Et, "then", function(Q, ct) {
          var mt = this;
          return new Gt(function(Ot, Bt) {
            S(m, mt, Ot, Bt);
          }).then(Q, ct);
        }, { unsafe: !0 });
        try {
          delete Et.constructor;
        } catch {
        }
        A && A(Et, Qt);
      }
      v({ global: !0, constructor: !0, wrap: !0, forced: Ct }, { Promise: Gt }), R(Gt, bt, !1, !0), L(bt);
    }, 3362: (d, g, a) => {
      a(436), a(6499), a(2003), a(7743), a(1481), a(280);
    }, 7743: (d, g, a) => {
      var p = a(6518), f = a(9565), m = a(9306), v = a(6043), j = a(1103), O = a(2652);
      p({ target: "Promise", stat: !0, forced: a(537) }, { race: function(x) {
        var S = this, P = v.f(S), A = P.reject, R = j(function() {
          var L = m(S.resolve);
          O(x, function(D) {
            f(L, S, D).then(P.resolve, A);
          });
        });
        return R.error && A(R.value), P.promise;
      } });
    }, 1481: (d, g, a) => {
      var p = a(6518), f = a(6043);
      p({ target: "Promise", stat: !0, forced: a(916).CONSTRUCTOR }, { reject: function(m) {
        var v = f.f(this);
        return (0, v.reject)(m), v.promise;
      } });
    }, 280: (d, g, a) => {
      var p = a(6518), f = a(7751), m = a(6395), v = a(550), j = a(916).CONSTRUCTOR, O = a(3438), x = f("Promise"), S = m && !j;
      p({ target: "Promise", stat: !0, forced: m || j }, { resolve: function(P) {
        return O(S && this === x ? v : this, P);
      } });
    }, 825: (d, g, a) => {
      var p = a(6518), f = a(7751), m = a(8745), v = a(566), j = a(5548), O = a(8551), x = a(34), S = a(2360), P = a(9039), A = f("Reflect", "construct"), R = Object.prototype, L = [].push, D = P(function() {
        function M() {
        }
        return !(A(function() {
        }, [], M) instanceof M);
      }), N = !P(function() {
        A(function() {
        });
      }), H = D || N;
      p({ target: "Reflect", stat: !0, forced: H, sham: H }, { construct: function(M, F) {
        j(M), O(F);
        var U = arguments.length < 3 ? M : j(arguments[2]);
        if (N && !D) return A(M, F, U);
        if (M === U) {
          switch (F.length) {
            case 0:
              return new M();
            case 1:
              return new M(F[0]);
            case 2:
              return new M(F[0], F[1]);
            case 3:
              return new M(F[0], F[1], F[2]);
            case 4:
              return new M(F[0], F[1], F[2], F[3]);
          }
          var q = [null];
          return m(L, q, F), new (m(v, M, q))();
        }
        var Z = U.prototype, K = S(x(Z) ? Z : R), tt = m(M, K, F);
        return x(tt) ? tt : K;
      } });
    }, 888: (d, g, a) => {
      var p = a(6518), f = a(9565), m = a(34), v = a(8551), j = a(6575), O = a(7347), x = a(2787);
      p({ target: "Reflect", stat: !0 }, { get: function S(P, A) {
        var R, L, D = arguments.length < 3 ? P : arguments[2];
        return v(P) === D ? P[A] : (R = O.f(P, A)) ? j(R) ? R.value : R.get === void 0 ? void 0 : f(R.get, D) : m(L = x(P)) ? S(L, A, D) : void 0;
      } });
    }, 4864: (d, g, a) => {
      var p = a(3724), f = a(4475), m = a(9504), v = a(2796), j = a(3167), O = a(6699), x = a(2360), S = a(8480).f, P = a(1625), A = a(788), R = a(655), L = a(1034), D = a(8429), N = a(1056), H = a(6840), M = a(9039), F = a(9297), U = a(1181).enforce, q = a(7633), Z = a(8227), K = a(3635), tt = a(8814), at = Z("match"), nt = f.RegExp, rt = nt.prototype, lt = f.SyntaxError, bt = m(rt.exec), Ct = m("".charAt), St = m("".replace), Pt = m("".indexOf), pt = m("".slice), Tt = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Et = /a/g, Gt = /a/g, Qt = new nt(Et) !== Et, Zt = D.MISSED_STICKY, Mt = D.UNSUPPORTED_Y;
      if (v("RegExp", p && (!Qt || Zt || K || tt || M(function() {
        return Gt[at] = !1, nt(Et) !== Et || nt(Gt) === Gt || String(nt(Et, "i")) !== "/a/i";
      })))) {
        for (var Lt = function(B, G) {
          var Y, et, it, ht, ft, ut, st = P(rt, this), wt = A(B), yt = G === void 0, _t = [], Q = B;
          if (!st && wt && yt && B.constructor === Lt) return B;
          if ((wt || P(rt, B)) && (B = B.source, yt && (G = L(Q))), B = B === void 0 ? "" : R(B), G = G === void 0 ? "" : R(G), Q = B, K && "dotAll" in Et && (et = !!G && Pt(G, "s") > -1) && (G = St(G, /s/g, "")), Y = G, Zt && "sticky" in Et && (it = !!G && Pt(G, "y") > -1) && Mt && (G = St(G, /y/g, "")), tt && (ht = function(ct) {
            for (var mt, Ot = ct.length, Bt = 0, Kt = "", ne = [], Xt = x(null), re = !1, pe = !1, te = 0, ee = ""; Bt <= Ot; Bt++) {
              if ((mt = Ct(ct, Bt)) === "\\") mt += Ct(ct, ++Bt);
              else if (mt === "]") re = !1;
              else if (!re) switch (!0) {
                case mt === "[":
                  re = !0;
                  break;
                case mt === "(":
                  bt(Tt, pt(ct, Bt + 1)) && (Bt += 2, pe = !0), Kt += mt, te++;
                  continue;
                case (mt === ">" && pe):
                  if (ee === "" || F(Xt, ee)) throw new lt("Invalid capture group name");
                  Xt[ee] = !0, ne[ne.length] = [ee, te], pe = !1, ee = "";
                  continue;
              }
              pe ? ee += mt : Kt += mt;
            }
            return [Kt, ne];
          }(B), B = ht[0], _t = ht[1]), ft = j(nt(B, G), st ? this : rt, Lt), (et || it || _t.length) && (ut = U(ft), et && (ut.dotAll = !0, ut.raw = Lt(function(ct) {
            for (var mt, Ot = ct.length, Bt = 0, Kt = "", ne = !1; Bt <= Ot; Bt++) (mt = Ct(ct, Bt)) !== "\\" ? ne || mt !== "." ? (mt === "[" ? ne = !0 : mt === "]" && (ne = !1), Kt += mt) : Kt += "[\\s\\S]" : Kt += mt + Ct(ct, ++Bt);
            return Kt;
          }(B), Y)), it && (ut.sticky = !0), _t.length && (ut.groups = _t)), B !== Q) try {
            O(ft, "source", Q === "" ? "(?:)" : Q);
          } catch {
          }
          return ft;
        }, Jt = S(nt), T = 0; Jt.length > T; ) N(Lt, nt, Jt[T++]);
        rt.constructor = Lt, Lt.prototype = rt, H(f, "RegExp", Lt, { constructor: !0 });
      }
      q("RegExp");
    }, 7495: (d, g, a) => {
      var p = a(6518), f = a(7323);
      p({ target: "RegExp", proto: !0, forced: /./.exec !== f }, { exec: f });
    }, 8781: (d, g, a) => {
      var p = a(350).PROPER, f = a(6840), m = a(8551), v = a(655), j = a(9039), O = a(1034), x = "toString", S = RegExp.prototype, P = S[x], A = j(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), R = p && P.name !== x;
      (A || R) && f(S, x, function() {
        var L = m(this);
        return "/" + v(L.source) + "/" + v(O(L));
      }, { unsafe: !0 });
    }, 1699: (d, g, a) => {
      var p = a(6518), f = a(9504), m = a(5749), v = a(7750), j = a(655), O = a(1436), x = f("".indexOf);
      p({ target: "String", proto: !0, forced: !O("includes") }, { includes: function(S) {
        return !!~x(j(v(this)), j(m(S)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (d, g, a) => {
      var p = a(8183).charAt, f = a(655), m = a(1181), v = a(1088), j = a(2529), O = "String Iterator", x = m.set, S = m.getterFor(O);
      v(String, "String", function(P) {
        x(this, { type: O, string: f(P), index: 0 });
      }, function() {
        var P, A = S(this), R = A.string, L = A.index;
        return L >= R.length ? j(void 0, !0) : (P = p(R, L), A.index += P.length, j(P, !1));
      });
    }, 1761: (d, g, a) => {
      var p = a(9565), f = a(9228), m = a(8551), v = a(4117), j = a(8014), O = a(655), x = a(7750), S = a(5966), P = a(7829), A = a(6682);
      f("match", function(R, L, D) {
        return [function(N) {
          var H = x(this), M = v(N) ? void 0 : S(N, R);
          return M ? p(M, N, H) : new RegExp(N)[R](O(H));
        }, function(N) {
          var H = m(this), M = O(N), F = D(L, H, M);
          if (F.done) return F.value;
          if (!H.global) return A(H, M);
          var U = H.unicode;
          H.lastIndex = 0;
          for (var q, Z = [], K = 0; (q = A(H, M)) !== null; ) {
            var tt = O(q[0]);
            Z[K] = tt, tt === "" && (H.lastIndex = P(M, j(H.lastIndex), U)), K++;
          }
          return K === 0 ? null : Z;
        }];
      });
    }, 5440: (d, g, a) => {
      var p = a(8745), f = a(9565), m = a(9504), v = a(9228), j = a(9039), O = a(8551), x = a(4901), S = a(4117), P = a(1291), A = a(8014), R = a(655), L = a(7750), D = a(7829), N = a(5966), H = a(2478), M = a(6682), F = a(8227)("replace"), U = Math.max, q = Math.min, Z = m([].concat), K = m([].push), tt = m("".indexOf), at = m("".slice), nt = "a".replace(/./, "$0") === "$0", rt = !!/./[F] && /./[F]("a", "$0") === "";
      v("replace", function(lt, bt, Ct) {
        var St = rt ? "$" : "$0";
        return [function(Pt, pt) {
          var Tt = L(this), Et = S(Pt) ? void 0 : N(Pt, F);
          return Et ? f(Et, Pt, Tt, pt) : f(bt, R(Tt), Pt, pt);
        }, function(Pt, pt) {
          var Tt = O(this), Et = R(Pt);
          if (typeof pt == "string" && tt(pt, St) === -1 && tt(pt, "$<") === -1) {
            var Gt = Ct(bt, Tt, Et, pt);
            if (Gt.done) return Gt.value;
          }
          var Qt = x(pt);
          Qt || (pt = R(pt));
          var Zt, Mt = Tt.global;
          Mt && (Zt = Tt.unicode, Tt.lastIndex = 0);
          for (var Lt, Jt = []; (Lt = M(Tt, Et)) !== null && (K(Jt, Lt), Mt); ) R(Lt[0]) === "" && (Tt.lastIndex = D(Et, A(Tt.lastIndex), Zt));
          for (var T, B = "", G = 0, Y = 0; Y < Jt.length; Y++) {
            for (var et, it = R((Lt = Jt[Y])[0]), ht = U(q(P(Lt.index), Et.length), 0), ft = [], ut = 1; ut < Lt.length; ut++) K(ft, (T = Lt[ut]) === void 0 ? T : String(T));
            var st = Lt.groups;
            if (Qt) {
              var wt = Z([it], ft, ht, Et);
              st !== void 0 && K(wt, st), et = R(p(pt, void 0, wt));
            } else et = H(it, Et, ht, ft, st, pt);
            ht >= G && (B += at(Et, G, ht) + et, G = ht + it.length);
          }
          return B + at(Et, G);
        }];
      }, !!j(function() {
        var lt = /./;
        return lt.exec = function() {
          var bt = [];
          return bt.groups = { a: "7" }, bt;
        }, "".replace(lt, "$<a>") !== "7";
      }) || !nt || rt);
    }, 1392: (d, g, a) => {
      var p, f = a(6518), m = a(7476), v = a(7347).f, j = a(8014), O = a(655), x = a(5749), S = a(7750), P = a(1436), A = a(6395), R = m("".slice), L = Math.min, D = P("startsWith");
      f({ target: "String", proto: !0, forced: !(!A && !D && (p = v(String.prototype, "startsWith"), p && !p.writable) || D) }, { startsWith: function(N) {
        var H = O(S(this));
        x(N);
        var M = j(L(arguments.length > 1 ? arguments[1] : void 0, H.length)), F = O(N);
        return R(H, M, M + F.length) === F;
      } });
    }, 2762: (d, g, a) => {
      var p = a(6518), f = a(3802).trim;
      p({ target: "String", proto: !0, forced: a(706)("trim") }, { trim: function() {
        return f(this);
      } });
    }, 6412: (d, g, a) => {
      a(511)("asyncIterator");
    }, 6761: (d, g, a) => {
      var p = a(6518), f = a(4475), m = a(9565), v = a(9504), j = a(6395), O = a(3724), x = a(4495), S = a(9039), P = a(9297), A = a(1625), R = a(8551), L = a(5397), D = a(6969), N = a(655), H = a(6980), M = a(2360), F = a(1072), U = a(8480), q = a(298), Z = a(3717), K = a(7347), tt = a(4913), at = a(6801), nt = a(8773), rt = a(6840), lt = a(2106), bt = a(5745), Ct = a(6119), St = a(421), Pt = a(3392), pt = a(8227), Tt = a(1951), Et = a(511), Gt = a(8242), Qt = a(687), Zt = a(1181), Mt = a(9213).forEach, Lt = Ct("hidden"), Jt = "Symbol", T = "prototype", B = Zt.set, G = Zt.getterFor(Jt), Y = Object[T], et = f.Symbol, it = et && et[T], ht = f.RangeError, ft = f.TypeError, ut = f.QObject, st = K.f, wt = tt.f, yt = q.f, _t = nt.f, Q = v([].push), ct = bt("symbols"), mt = bt("op-symbols"), Ot = bt("wks"), Bt = !ut || !ut[T] || !ut[T].findChild, Kt = function(Nt, zt, Ft) {
        var qt = st(Y, zt);
        qt && delete Y[zt], wt(Nt, zt, Ft), qt && Nt !== Y && wt(Y, zt, qt);
      }, ne = O && S(function() {
        return M(wt({}, "a", { get: function() {
          return wt(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? Kt : wt, Xt = function(Nt, zt) {
        var Ft = ct[Nt] = M(it);
        return B(Ft, { type: Jt, tag: Nt, description: zt }), O || (Ft.description = zt), Ft;
      }, re = function(Nt, zt, Ft) {
        Nt === Y && re(mt, zt, Ft), R(Nt);
        var qt = D(zt);
        return R(Ft), P(ct, qt) ? (Ft.enumerable ? (P(Nt, Lt) && Nt[Lt][qt] && (Nt[Lt][qt] = !1), Ft = M(Ft, { enumerable: H(0, !1) })) : (P(Nt, Lt) || wt(Nt, Lt, H(1, M(null))), Nt[Lt][qt] = !0), ne(Nt, qt, Ft)) : wt(Nt, qt, Ft);
      }, pe = function(Nt, zt) {
        R(Nt);
        var Ft = L(zt), qt = F(Ft).concat($i(Ft));
        return Mt(qt, function(he) {
          O && !m(te, Ft, he) || re(Nt, he, Ft[he]);
        }), Nt;
      }, te = function(Nt) {
        var zt = D(Nt), Ft = m(_t, this, zt);
        return !(this === Y && P(ct, zt) && !P(mt, zt)) && (!(Ft || !P(this, zt) || !P(ct, zt) || P(this, Lt) && this[Lt][zt]) || Ft);
      }, ee = function(Nt, zt) {
        var Ft = L(Nt), qt = D(zt);
        if (Ft !== Y || !P(ct, qt) || P(mt, qt)) {
          var he = st(Ft, qt);
          return !he || !P(ct, qt) || P(Ft, Lt) && Ft[Lt][qt] || (he.enumerable = !0), he;
        }
      }, Zn = function(Nt) {
        var zt = yt(L(Nt)), Ft = [];
        return Mt(zt, function(qt) {
          P(ct, qt) || P(St, qt) || Q(Ft, qt);
        }), Ft;
      }, $i = function(Nt) {
        var zt = Nt === Y, Ft = yt(zt ? mt : L(Nt)), qt = [];
        return Mt(Ft, function(he) {
          !P(ct, he) || zt && !P(Y, he) || Q(qt, ct[he]);
        }), qt;
      };
      x || (rt(it = (et = function() {
        if (A(it, this)) throw new ft("Symbol is not a constructor");
        var Nt = arguments.length && arguments[0] !== void 0 ? N(arguments[0]) : void 0, zt = Pt(Nt), Ft = function(qt) {
          var he = this === void 0 ? f : this;
          he === Y && m(Ft, mt, qt), P(he, Lt) && P(he[Lt], zt) && (he[Lt][zt] = !1);
          var Gi = H(1, qt);
          try {
            ne(he, zt, Gi);
          } catch (dn) {
            if (!(dn instanceof ht)) throw dn;
            Kt(he, zt, Gi);
          }
        };
        return O && Bt && ne(Y, zt, { configurable: !0, set: Ft }), Xt(zt, Nt);
      })[T], "toString", function() {
        return G(this).tag;
      }), rt(et, "withoutSetter", function(Nt) {
        return Xt(Pt(Nt), Nt);
      }), nt.f = te, tt.f = re, at.f = pe, K.f = ee, U.f = q.f = Zn, Z.f = $i, Tt.f = function(Nt) {
        return Xt(pt(Nt), Nt);
      }, O && (lt(it, "description", { configurable: !0, get: function() {
        return G(this).description;
      } }), j || rt(Y, "propertyIsEnumerable", te, { unsafe: !0 }))), p({ global: !0, constructor: !0, wrap: !0, forced: !x, sham: !x }, { Symbol: et }), Mt(F(Ot), function(Nt) {
        Et(Nt);
      }), p({ target: Jt, stat: !0, forced: !x }, { useSetter: function() {
        Bt = !0;
      }, useSimple: function() {
        Bt = !1;
      } }), p({ target: "Object", stat: !0, forced: !x, sham: !O }, { create: function(Nt, zt) {
        return zt === void 0 ? M(Nt) : pe(M(Nt), zt);
      }, defineProperty: re, defineProperties: pe, getOwnPropertyDescriptor: ee }), p({ target: "Object", stat: !0, forced: !x }, { getOwnPropertyNames: Zn }), Gt(), Qt(et, Jt), St[Lt] = !0;
    }, 9463: (d, g, a) => {
      var p = a(6518), f = a(3724), m = a(4475), v = a(9504), j = a(9297), O = a(4901), x = a(1625), S = a(655), P = a(2106), A = a(7740), R = m.Symbol, L = R && R.prototype;
      if (f && O(R) && (!("description" in L) || R().description !== void 0)) {
        var D = {}, N = function() {
          var K = arguments.length < 1 || arguments[0] === void 0 ? void 0 : S(arguments[0]), tt = x(L, this) ? new R(K) : K === void 0 ? R() : R(K);
          return K === "" && (D[tt] = !0), tt;
        };
        A(N, R), N.prototype = L, L.constructor = N;
        var H = String(R("description detection")) === "Symbol(description detection)", M = v(L.valueOf), F = v(L.toString), U = /^Symbol\((.*)\)[^)]+$/, q = v("".replace), Z = v("".slice);
        P(L, "description", { configurable: !0, get: function() {
          var K = M(this);
          if (j(D, K)) return "";
          var tt = F(K), at = H ? Z(tt, 7, -1) : q(tt, U, "$1");
          return at === "" ? void 0 : at;
        } }), p({ global: !0, constructor: !0, forced: !0 }, { Symbol: N });
      }
    }, 1510: (d, g, a) => {
      var p = a(6518), f = a(7751), m = a(9297), v = a(655), j = a(5745), O = a(1296), x = j("string-to-symbol-registry"), S = j("symbol-to-string-registry");
      p({ target: "Symbol", stat: !0, forced: !O }, { for: function(P) {
        var A = v(P);
        if (m(x, A)) return x[A];
        var R = f("Symbol")(A);
        return x[A] = R, S[R] = A, R;
      } });
    }, 2259: (d, g, a) => {
      a(511)("iterator");
    }, 2675: (d, g, a) => {
      a(6761), a(1510), a(7812), a(3110), a(9773);
    }, 7812: (d, g, a) => {
      var p = a(6518), f = a(9297), m = a(757), v = a(6823), j = a(5745), O = a(1296), x = j("symbol-to-string-registry");
      p({ target: "Symbol", stat: !0, forced: !O }, { keyFor: function(S) {
        if (!m(S)) throw new TypeError(v(S) + " is not a symbol");
        if (f(x, S)) return x[S];
      } });
    }, 5700: (d, g, a) => {
      var p = a(511), f = a(8242);
      p("toPrimitive"), f();
    }, 8125: (d, g, a) => {
      var p = a(7751), f = a(511), m = a(687);
      f("toStringTag"), m(p("Symbol"), "Symbol");
    }, 3500: (d, g, a) => {
      var p = a(4475), f = a(7400), m = a(9296), v = a(235), j = a(6699), O = function(S) {
        if (S && S.forEach !== v) try {
          j(S, "forEach", v);
        } catch {
          S.forEach = v;
        }
      };
      for (var x in f) f[x] && O(p[x] && p[x].prototype);
      O(m);
    }, 2953: (d, g, a) => {
      var p = a(4475), f = a(7400), m = a(9296), v = a(3792), j = a(6699), O = a(687), x = a(8227)("iterator"), S = v.values, P = function(R, L) {
        if (R) {
          if (R[x] !== S) try {
            j(R, x, S);
          } catch {
            R[x] = S;
          }
          if (O(R, L, !0), f[L]) {
            for (var D in v) if (R[D] !== v[D]) try {
              j(R, D, v[D]);
            } catch {
              R[D] = v[D];
            }
          }
        }
      };
      for (var A in f) P(p[A] && p[A].prototype, A);
      P(m, "DOMTokenList");
    }, 5575: (d, g, a) => {
      var p = a(6518), f = a(4475), m = a(9472)(f.setInterval, !0);
      p({ global: !0, bind: !0, forced: f.setInterval !== m }, { setInterval: m });
    }, 4599: (d, g, a) => {
      var p = a(6518), f = a(4475), m = a(9472)(f.setTimeout, !0);
      p({ global: !0, bind: !0, forced: f.setTimeout !== m }, { setTimeout: m });
    }, 6031: (d, g, a) => {
      a(5575), a(4599);
    } }, w = {};
    function _(d) {
      var g = w[d];
      if (g !== void 0) return g.exports;
      var a = w[d] = { exports: {} };
      return y[d].call(a.exports, a, a.exports, _), a.exports;
    }
    _.d = (d, g) => {
      for (var a in g) _.o(g, a) && !_.o(d, a) && Object.defineProperty(d, a, { enumerable: !0, get: g[a] });
    }, _.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), _.o = (d, g) => Object.prototype.hasOwnProperty.call(d, g), _.r = (d) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(d, "__esModule", { value: !0 });
    };
    var C = {};
    return (() => {
      _.r(C), _.d(C, { JSONEditor: () => vn }), _(2675), _(9463), _(6412), _(2259), _(5700), _(8125), _(8706), _(113), _(1629), _(3418), _(4346), _(3792), _(2712), _(4490), _(4782), _(739), _(9572), _(3288), _(2010), _(4731), _(479), _(2892), _(9085), _(9904), _(4185), _(875), _(9432), _(287), _(6099), _(6034), _(3362), _(7495), _(8781), _(7764), _(3500), _(2953), _(5506), _(4864), _(5440), _(4423);
      var d = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], g = [function(o) {
        return o.type === "string" && o.format === "color" && "colorpicker";
      }, function(o) {
        return o.type === "string" && ["ip", "ipv4", "ipv6", "hostname"].includes(o.format) && "ip";
      }, function(o) {
        return o.type === "string" && d.includes(o.format) && "ace";
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
          for (var n = 0; n < o.links.length; n++) if (o.links[n].rel && o.links[n].rel.toLowerCase() === "describedby") return "describedBy";
        }
      }, function(o) {
        return ["string", "integer"].includes(o.type) && ["starrating", "rating"].includes(o.format) && "starrating";
      }, function(o) {
        return ["string", "integer"].includes(o.type) && ["date", "time", "datetime-local"].includes(o.format) && "datetime";
      }, function(o) {
        var n, r;
        return (o.oneOf || o.anyOf) && ((n = (r = o.options) === null || r === void 0 ? void 0 : r.switcher) === null || n === void 0 || n) === !0 && "multiple";
      }, function(o) {
        return o.if && "multiple";
      }, function(o, n) {
        if (o.items && (o.items = n.expandSchema(o.items)), o.type === "array" && o.items && !Array.isArray(o.items) && ["string", "number", "integer"].includes(o.items.type)) {
          if (o.format === "choices") return "arrayChoices";
          if (o.uniqueItems) {
            if (o.format === "selectize") return "arraySelectize";
            if (o.format === "select2") return "arraySelect2";
            if (o.items.enum) return "multiselect";
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
      function a(o, n, r) {
        var s;
        return s = function(t, e) {
          if (p(t) != "object" || !t) return t;
          var i = t[Symbol.toPrimitive];
          if (i !== void 0) {
            var c = i.call(t, "string");
            if (p(c) != "object") return c;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t);
        }(n), (n = p(s) == "symbol" ? s : s + "") in o ? Object.defineProperty(o, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : o[n] = r, o;
      }
      function p(o) {
        return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, p(o);
      }
      function f(o) {
        return !(o === null || p(o) !== "object" || o.nodeType || o === o.window || o.constructor && !x(o.constructor.prototype, "isPrototypeOf"));
      }
      function m(o) {
        return f(o) ? v({}, o) : Array.isArray(o) ? o.map(m) : o;
      }
      function v(o) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
        return r.forEach(function(t) {
          t && Object.keys(t).forEach(function(e) {
            t[e] && f(t[e]) ? (x(o, e) || (o[e] = {}), v(o[e], t[e])) : Array.isArray(t[e]) ? o[e] = m(t[e]) : o[e] = t[e];
          });
        }), o;
      }
      function j(o, n) {
        var r = document.createEvent("HTMLEvents");
        r.initEvent(n, !0, !0), o.dispatchEvent(r);
      }
      function O(o) {
        return o && (o.toString() === "[object ShadowRoot]" ? o : O(o.parentNode));
      }
      function x(o, n) {
        return o && Object.prototype.hasOwnProperty.call(o, n);
      }
      _(4170), _(3851), _(825), _(888), _(8598), _(1699), _(1761), _(5276), _(5086), _(1392), _(2062), _(8459), _(8940);
      var S = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function A() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
          var r = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (n === "x" ? r : 3 & r | 8).toString(16);
        });
      }
      function R(o) {
        return o && p(o) === "object" && !Array.isArray(o);
      }
      function L(o) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
        if (!r.length) return o;
        var t = r.shift();
        if (R(o) && R(t)) for (var e in t) R(t[e]) ? (o[e] || Object.assign(o, a({}, e, {})), L(o[e], t[e])) : Object.assign(o, a({}, e, t[e]));
        return L.apply(void 0, [o].concat(r));
      }
      function D(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function N(o) {
        return N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, N(o);
      }
      function H(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, M(s.key), s);
        }
      }
      function M(o) {
        var n = function(r, s) {
          if (N(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (N(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return N(n) == "symbol" ? n : n + "";
      }
      var F = function() {
        return o = function r(s, t) {
          var e, i;
          (function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
          })(this, r), this.defaults = t, this.jsoneditor = s.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = s.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = v({}, this.options || {}, this.schema.options || {}, s.schema.options || {}, s), this.enforceConstEnabled = (e = this.options.enforce_const) !== null && e !== void 0 ? e : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", s.path || this.schema.id || (this.schema.id = this.formname), this.path = s.path || this.formname, this.formname = s.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = s.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, s.container && this.setContainer(s.container), this.registerDependencies();
        }, n = [{ key: "onChildEditorChange", value: function(r, s) {
          this.onChange(!0, !1, s);
        } }, { key: "notify", value: function() {
          this.path && this.jsoneditor.notifyWatchers(this.path);
        } }, { key: "change", value: function(r) {
          this.parent ? this.parent.onChildEditorChange(this, r) : this.jsoneditor && this.jsoneditor.onChange(r);
        } }, { key: "onChange", value: function(r, s, t) {
          this.notify(), s || this.watch_listener && this.watch_listener(), r && this.change(t);
        } }, { key: "register", value: function() {
          if (this.jsoneditor.registerEditor(this), this.input && !this.label) {
            var r = this.getTitle() || this.formname;
            this.input.setAttribute("aria-label", r);
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
          var r = this;
          this.dependenciesFulfilled = !0;
          var s = this.options.dependencies;
          s && Object.keys(s).forEach(function(t) {
            var e;
            t.startsWith(r.jsoneditor.root.path) ? e = t : ((e = r.path.split("."))[e.length - 1] = t, e = e.join(".")), r.jsoneditor.watch(e, function() {
              r.evaluateDependencies();
            });
          });
        } }, { key: "evaluateDependencies", value: function() {
          var r = this, s = this.container || this.control;
          if (s && this.jsoneditor !== null) {
            var t = this.options.dependencies;
            if (t) {
              var e = this.dependenciesFulfilled;
              this.dependenciesFulfilled = !0, Object.keys(t).forEach(function(c) {
                var h;
                c.startsWith(r.jsoneditor.root.path) ? h = c : ((h = r.path.split("."))[h.length - 1] = c, h = h.join("."));
                var b = t[c];
                r.checkDependency(h, b);
              }), this.dependenciesFulfilled !== e && this.notify();
              var i = this.dependenciesFulfilled ? "block" : "none";
              this.options.hidden && (i = "none"), s.tagName === "TD" ? Object.keys(s.childNodes).forEach(function(c) {
                return s.childNodes[c].style.display = i;
              }) : s.style.display = i;
            }
          }
        } }, { key: "checkDependency", value: function(r, s) {
          var t = this;
          if (this.path !== r && this.jsoneditor !== null) {
            var e = this.jsoneditor.getEditor(r), i = e ? e.getValue() : void 0;
            e && e.dependenciesFulfilled && i ? Array.isArray(s) ? this.dependenciesFulfilled = s.some(function(c) {
              if (JSON.stringify(i) === JSON.stringify(c)) return !0;
            }) : N(s) === "object" ? N(i) !== "object" ? this.dependenciesFulfilled = s === i : Object.keys(s).some(function(c) {
              return !!x(s, c) && (x(i, c) && s[c] === i[c] ? void 0 : (t.dependenciesFulfilled = !1, !0));
            }) : typeof s == "string" || typeof s == "number" ? this.dependenciesFulfilled = this.dependenciesFulfilled && i === s : typeof s == "boolean" && (this.dependenciesFulfilled = s ? this.dependenciesFulfilled && (i || i.length > 0) : this.dependenciesFulfilled && (!i || i.length === 0)) : this.dependenciesFulfilled = !1;
          }
        } }, { key: "setContainer", value: function(r) {
          this.container = r, this.setContainerAttributes(), this.schema.id && this.container.setAttribute("data-schemaid", this.schema.id), this.schema.type && typeof this.schema.type == "string" && this.container.setAttribute("data-schematype", this.schema.type), this.container.setAttribute("data-schemapath", this.path);
        } }, { key: "setOptInCheckbox", value: function() {
          var r, s = this;
          r = this.optInWidget === "switch" ? this.theme.getOptInSwitch(this.formname) : this.theme.getOptInCheckbox(this.formname), this.optInCheckbox = r.checkbox, this.optInContainer = r.container, this.optInCheckbox.addEventListener("click", function() {
            s.isActive() ? s.deactivate() : s.activate();
          });
          var t = this.jsoneditor.options.show_opt_in, e = this.parent.options.show_opt_in !== void 0, i = e && this.parent.options.show_opt_in === !0, c = e && this.parent.options.show_opt_in === !1;
          (i || !c && t || !e && t) && this.parent && this.parent.schema.type === "object" && !this.isRequired() && this.header && (this.header.insertBefore(this.optInContainer, this.header.firstChild), this.optInAppended = !0);
        } }, { key: "preBuild", value: function() {
        } }, { key: "build", value: function() {
        } }, { key: "postBuild", value: function() {
          this.setupWatchListeners(), this.addLinks(), this.register(), this.setValue(this.getDefault(), !0), this.updateHeaderText(), this.onWatchedFieldChange(), this.options.titleHidden && (this.theme.visuallyHidden(this.label), this.theme.visuallyHidden(this.header)), this.enforceConstEnabled && this.schema.const && this.disable();
        } }, { key: "setupWatchListeners", value: function() {
          var r = this;
          if (this.watched = {}, this.schema.vars && (this.schema.watch = this.schema.vars), this.watched_values = {}, this.watch_listener = function() {
            r.refreshWatchedFieldValues() && r.onWatchedFieldChange();
          }, x(this.schema, "watch")) {
            var s, t, e, i, c, h = this.container.getAttribute("data-schemapath");
            Object.keys(this.schema.watch).forEach(function(b) {
              if (s = r.schema.watch[b], Array.isArray(s)) {
                if (s.length < 2) return;
                t = [s[0]].concat(s[1].split("."));
              } else t = s.split("."), r.theme.closest(r.container, '[data-schemaid="'.concat(t[0], '"]')) || t.unshift("#");
              if ((e = t.shift()) === "#" && (e = r.jsoneditor.schema.id || r.jsoneditor.root.formname), !(i = r.theme.closest(r.container, '[data-schemaid="'.concat(e, '"]')))) throw new Error("Could not find ancestor node with id ".concat(e));
              c = "".concat(i.getAttribute("data-schemapath"), ".").concat(t.join(".")), h.startsWith(c) && (r.watchLoop = !0), r.jsoneditor.watch(c, r.watch_listener), r.watched[b] = c;
            });
          }
          this.schema.headerTemplate && (this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine));
        } }, { key: "addLinks", value: function() {
          if (!this.no_link_holder && (this.link_holder = this.theme.getLinksHolder(), this.description !== void 0 ? this.description.parentNode.insertBefore(this.link_holder, this.description) : this.container.appendChild(this.link_holder), this.schema.links)) for (var r = 0; r < this.schema.links.length; r++) this.addLink(this.getLink(this.schema.links[r]));
        } }, { key: "onMove", value: function() {
        } }, { key: "getButton", value: function(r, s, t) {
          var e = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], i = "json-editor-btn-".concat(s);
          s = this.iconlib ? this.iconlib.getIcon(s) : null, r = this.translate(r, e), t = this.translate(t, e), !s && t && (r = t, t = null);
          var c = this.theme.getButton(r, s, t);
          return c.classList.add(i), c;
        } }, { key: "setButtonText", value: function(r, s, t, e) {
          var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
          return t = this.iconlib ? this.iconlib.getIcon(t) : null, s = this.translate(s, i), e = this.translate(e, i), !t && e && (s = e, e = null), this.theme.setButtonText(r, s, t, e);
        } }, { key: "addLink", value: function(r) {
          this.link_holder && this.link_holder.appendChild(r);
        } }, { key: "getLink", value: function(r) {
          var s, t, e = (r.mediaType || "application/javascript").split("/")[0], i = this.jsoneditor.compileTemplate(r.href, this.template_engine), c = this.jsoneditor.compileTemplate(r.rel ? r.rel : r.href, this.template_engine), h = null;
          if (r.download && (h = r.download), h && h !== !0 && (h = this.jsoneditor.compileTemplate(h, this.template_engine)), e === "image") {
            s = this.theme.getBlockLinkHolder(), (t = document.createElement("a")).setAttribute("target", "_blank");
            var b = document.createElement("img");
            this.theme.createImageLink(s, t, b), this.link_watchers.push(function(E) {
              var I = i(E), $ = c(E);
              t.setAttribute("href", I), t.setAttribute("title", $ || I), b.setAttribute("src", I);
            });
          } else if (["audio", "video"].includes(e)) {
            s = this.theme.getBlockLinkHolder(), (t = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var k = document.createElement(e);
            k.setAttribute("controls", "controls"), this.theme.createMediaLink(s, t, k), this.link_watchers.push(function(E) {
              var I = i(E), $ = c(E);
              t.setAttribute("href", I), t.textContent = $ || I, k.setAttribute("src", I);
            });
          } else t = s = this.theme.getBlockLink(), s.setAttribute("target", "_blank"), s.textContent = r.rel, s.style.display = "none", this.link_watchers.push(function(E) {
            var I = i(E), $ = c(E);
            I && (s.style.display = ""), s.setAttribute("href", I), s.textContent = $ || I;
          });
          return h && t && (h === !0 ? t.setAttribute("download", "") : this.link_watchers.push(function(E) {
            t.setAttribute("download", h(E));
          })), r.class && r.class.split(" ").forEach(function(E) {
            t.classList.add(E);
          }), s;
        } }, { key: "refreshWatchedFieldValues", value: function() {
          var r = this;
          if (this.watched_values) {
            var s = {}, t = !1;
            return this.watched && Object.keys(this.watched).forEach(function(e) {
              var i = r.jsoneditor.getEditor(r.watched[e]), c = i ? i.getValue() : null;
              r.watched_values[e] !== c && (t = !0), s[e] = c;
            }), s.self = this.getValue(), this.watched_values.self !== s.self && (t = !0), this.watched_values = s, t;
          }
        } }, { key: "getWatchedFieldValues", value: function() {
          return this.watched_values;
        } }, { key: "updateHeaderText", value: function() {
          if (this.header) {
            var r = this.getHeaderText();
            if (this.header.children.length) {
              for (var s = 0; s < this.header.childNodes.length; s++) if (this.header.childNodes[s].nodeType === 3) {
                this.header.childNodes[s].nodeValue = this.cleanText(r);
                break;
              }
            } else window.DOMPurify ? this.header.innerHTML = window.DOMPurify.sanitize(r) : this.header.textContent = this.cleanText(r);
          }
        } }, { key: "getHeaderText", value: function(r) {
          return this.header_text ? this.header_text : r ? this.translateProperty(this.schema.title) : this.getTitle();
        } }, { key: "getPathDepth", value: function() {
          return this.path.split(".").length;
        } }, { key: "cleanText", value: function(r) {
          var s = document.createElement("div");
          return s.innerHTML = r, s.textContent || s.innerText;
        } }, { key: "onWatchedFieldChange", value: function() {
          var r, s = this;
          if (this.header_template) {
            r = v(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (r.properties = {}, Object.keys(this.editors).forEach(function(i) {
              var c = s.editors[i];
              if (c.schema && c.schema.enum && c.schema.options && c.schema.options.enum_titles) {
                var h = c.schema.enum.indexOf(c.value), b = c.options.enum_titles[h];
                r.properties[i] = { enumTitle: b };
              }
            }));
            var t = this.header_template(r);
            t !== this.header_text && (this.header_text = t, this.updateHeaderText(), this.notify());
          }
          if (this.link_watchers.length) {
            r = this.getWatchedFieldValues();
            for (var e = 0; e < this.link_watchers.length; e++) this.link_watchers[e](r);
          }
        } }, { key: "setValue", value: function(r) {
          r = this.applyConstFilter(r), this.value = r;
        } }, { key: "applyConstFilter", value: function(r) {
          return this.enforceConstEnabled && this.schema.const !== void 0 && (r = this.schema.const), r;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.value;
        } }, { key: "refreshValue", value: function() {
        } }, { key: "getChildEditors", value: function() {
          return !1;
        } }, { key: "destroy", value: function() {
          var r = this;
          this.unregister(this), this.watched && Object.values(this.watched).forEach(function(s) {
            return r.jsoneditor.unwatch(s, r.watch_listener);
          }), this.watched = null, this.watched_values = null, this.watch_listener = null, this.header_text = null, this.header_template = null, this.value = null, this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.jsoneditor = null, this.schema = null, this.path = null, this.key = null, this.parent = null;
        } }, { key: "isDefaultRequired", value: function() {
          return this.isRequired() || !!this.jsoneditor.options.use_default_values;
        } }, { key: "getDefault", value: function() {
          if (this.enforceConstEnabled && this.schema.const) return this.schema.const;
          if (this.schema.default !== void 0) return this.schema.default;
          if (this.schema.enum !== void 0) return this.schema.enum[0];
          var r = this.schema.type || this.schema.oneOf;
          if (r && Array.isArray(r) && (r = r[0]), r && N(r) === "object" && (r = r.type), r && Array.isArray(r) && (r = r[0]), typeof r == "string") {
            if (r === "number") return this.isDefaultRequired() ? 0 : void 0;
            if (r === "boolean") return !this.isDefaultRequired() && void 0;
            if (r === "integer") return this.isDefaultRequired() ? 0 : void 0;
            if (r === "string") return this.isDefaultRequired() ? "" : void 0;
            if (r === "null") return null;
            if (r === "object") return {};
            if (r === "array") return [];
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
        } }, { key: "getDisplayText", value: function(r) {
          var s = [], t = {};
          r.forEach(function(i) {
            i.title && (t[i.title] = t[i.title] || 0, t[i.title]++), i.description && (t[i.description] = t[i.description] || 0, t[i.description]++), i.format && (t[i.format] = t[i.format] || 0, t[i.format]++), i.type && (t[i.type] = t[i.type] || 0, t[i.type]++);
          }), r.forEach(function(i) {
            var c;
            c = typeof i == "string" ? i : i.title && t[i.title] <= 1 ? i.title : i.format && t[i.format] <= 1 ? i.format : i.type && t[i.type] <= 1 ? i.type : i.description && t[i.description] <= 1 ? i.description : i.title ? i.title : i.format ? i.format : i.type ? i.type : i.description ? i.description : JSON.stringify(i).length < 500 ? JSON.stringify(i) : "type", s.push(c);
          });
          var e = {};
          return s.forEach(function(i, c) {
            e[i] = e[i] || 0, e[i]++, t[i] > 1 && (s[c] = "".concat(i, " ").concat(e[i]));
          }), s;
        } }, { key: "getValidId", value: function(r) {
          return (r = r === void 0 ? "" : r.toString()).replace(/\s+/g, "-");
        } }, { key: "setInputAttributes", value: function(r, s) {
          if (this.schema.options && this.schema.options.inputAttributes) {
            var t = this.schema.options.inputAttributes, e = ["name", "type"].concat(r), i = s || this.input;
            Object.keys(t).forEach(function(c) {
              e.includes(c.toLowerCase()) || i.setAttribute(c, t[c]);
            });
          }
        } }, { key: "setContainerAttributes", value: function() {
          var r = this;
          if (this.schema.options && this.schema.options.containerAttributes) {
            var s = this.schema.options.containerAttributes, t = ["data-schemapath", "data-schematype", "data-schemaid"];
            Object.keys(s).forEach(function(e) {
              t.includes(e.toLowerCase()) || r.container.setAttribute(e, s[e]);
            });
          }
        } }, { key: "expandCallbacks", value: function(r, s) {
          var t = this, e = this.defaults.callbacks[r];
          return Object.entries(s).forEach(function(i) {
            var c, h, b = (h = 2, function(I) {
              if (Array.isArray(I)) return I;
            }(c = i) || function(I, $) {
              var W = I == null ? null : typeof Symbol < "u" && I[Symbol.iterator] || I["@@iterator"];
              if (W != null) {
                var X, dt, jt, xt, It = [], Ht = !0, $t = !1;
                try {
                  if (jt = (W = W.call(I)).next, $ === 0) {
                    if (Object(W) !== W) return;
                    Ht = !1;
                  } else for (; !(Ht = (X = jt.call(W)).done) && (It.push(X.value), It.length !== $); Ht = !0) ;
                } catch (vt) {
                  $t = !0, dt = vt;
                } finally {
                  try {
                    if (!Ht && W.return != null && (xt = W.return(), Object(xt) !== xt)) return;
                  } finally {
                    if ($t) throw dt;
                  }
                }
                return It;
              }
            }(c, h) || function(I, $) {
              if (I) {
                if (typeof I == "string") return D(I, $);
                var W = Object.prototype.toString.call(I).slice(8, -1);
                return W === "Object" && I.constructor && (W = I.constructor.name), W === "Map" || W === "Set" ? Array.from(I) : W === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(W) ? D(I, $) : void 0;
              }
            }(c, h) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), k = b[0], E = b[1];
            E === Object(E) ? s[k] = t.expandCallbacks(r, E) : typeof E == "string" && N(e) === "object" && typeof e[E] == "function" && (s[k] = e[E].bind(null, t));
          }), s;
        } }, { key: "showValidationErrors", value: function(r) {
        } }], n && H(o.prototype, n), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, n;
      }();
      function U(o) {
        return U = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, U(o);
      }
      function q(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Z(s.key), s);
        }
      }
      function Z(o) {
        var n = function(r, s) {
          if (U(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (U(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return U(n) == "symbol" ? n : n + "";
      }
      function K(o, n, r) {
        return n = nt(n), function(s, t) {
          if (t && (U(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, tt() ? Reflect.construct(n, r || [], nt(o).constructor) : n.apply(o, r));
      }
      function tt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (tt = function() {
          return !!o;
        })();
      }
      function at() {
        return at = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = nt(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, at.apply(this, arguments);
      }
      function nt(o) {
        return nt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, nt(o);
      }
      function rt(o, n) {
        return rt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, rt(o, n);
      }
      var lt = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), K(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && rt(t, e);
        }(n, o), r = n, (s = [{ key: "register", value: function() {
          at(nt(n.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          at(nt(n.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(t, e, i) {
          if (t = this.applyConstFilter(t), (!this.template || i) && (this.shouldBeUnset() || t != null ? U(t) === "object" ? t = JSON.stringify(t) : this.shouldBeUnset() || typeof t == "string" || (t = "".concat(t)) : t = "", t !== this.serialized)) {
            var c = this.sanitize(t);
            if (this.input.value !== c) {
              if (this.setValueToInputField(c), this.format === "range") {
                var h = this.control.querySelector("output");
                h && (h.value = c);
              }
              var b = i || this.getValue() !== t;
              return this.refreshValue(), e ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), b && this.onChange(!0, i), { changed: b, value: c };
            }
          }
        } }, { key: "setValueToInputField", value: function(t) {
          this.input.value = t === void 0 ? "" : t;
        } }, { key: "getNumColumns", value: function() {
          var t, e = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5);
          return t = this.input_type === "textarea" ? 6 : ["text", "email"].includes(this.input_type) ? 4 : 2, Math.min(12, Math.max(e, t));
        } }, { key: "build", value: function() {
          var t, e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.format = this.schema.format, !this.format && this.schema.media && this.schema.media.type && (this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, "")), !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.format) if (this.format === "textarea") this.input_type = "textarea", this.input = this.theme.getTextareaInput();
          else if (this.format === "range") {
            this.input_type = "range";
            var i = this.schema.minimum || 0, c = this.schema.maximum || Math.max(100, i + 1), h = 1;
            this.schema.multipleOf && (i % this.schema.multipleOf && (i = Math.ceil(i / this.schema.multipleOf) * this.schema.multipleOf), c % this.schema.multipleOf && (c = Math.floor(c / this.schema.multipleOf) * this.schema.multipleOf), h = this.schema.multipleOf), this.input = this.theme.getRangeInput(i, c, h, this.description, this.formname), this.input.setAttribute("id", this.formname);
          } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(this.format) && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
          else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function($) {
            if ($.preventDefault(), $.stopPropagation(), e.schema.template) $.currentTarget.value = e.value;
            else {
              var W = $.currentTarget.value, X = e.sanitize(W);
              W !== X && ($.currentTarget.value = X), e.is_dirty = !0, e.refreshValue(), e.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function($) {
            if ($) {
              var W, X = $.offsetHeight;
              if ($.offsetHeight < $.scrollHeight) for (W = 0; $.offsetHeight < $.scrollHeight + 3 && !(W > 100); ) W++, X++, $.style.height = "".concat(X, "px");
              else {
                for (W = 0; $.offsetHeight >= $.scrollHeight + 3 && !(W > 100); ) W++, X--, $.style.height = "".concat(X, "px");
                $.style.height = "".concat(X + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function($) {
            e.adjust_height($.currentTarget);
          }), this.input.addEventListener("change", function($) {
            e.adjust_height($.currentTarget);
          }), this.adjust_height());
          var b = (t = this.options.prompt_paste_max_length_reached) !== null && t !== void 0 ? t : this.jsoneditor.options.prompt_paste_max_length_reached, k = this.schema.maxLength !== void 0;
          b && k && this.input.addEventListener("paste", function($) {
            ($.clipboardData || window.clipboardData).getData("text").length + e.input.value.length > e.schema.maxLength && alert(e.translate("paste_max_length_reached", [e.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var E = this.input;
          if (this.format === "range" && (E = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, E, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady(), e.adjust_height && e.adjust_height(e.input), e.format === "range" && (e.control.querySelector("output").value = e.input.value);
          }), this.schema.template) {
            var I = this.expandCallbacks("template", { template: this.schema.template });
            typeof I.template == "function" ? this.template = I.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }, { key: "setupCleave", value: function(t) {
          var e = this.expandCallbacks("cleave", v({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
          U(e) === "object" && Object.keys(e).length > 0 && (this.cleave_instance = new window.Cleave(t, e));
        } }, { key: "setupImask", value: function(t) {
          var e = this.expandCallbacks("imask", v({}, this.defaults.options.imask || {}, this.options.imask || {}));
          U(e) === "object" && Object.keys(e).length > 0 && (this.imask_instance = window.IMask(t, this.ajustIMaskOptions(e)));
        } }, { key: "ajustIMaskOptions", value: function(t) {
          var e = this;
          return Object.keys(t).forEach(function(i) {
            if (t[i] === Object(t[i])) t[i] = e.ajustIMaskOptions(t[i]);
            else if (i === "mask") if (t[i].substr(0, 6) === "regex:") {
              var c = t[i].match(/^regex:\/(.*)\/([gimsuy]*)$/);
              if (c !== null) try {
                t[i] = new RegExp(c[1], c[2]);
              } catch {
              }
            } else t[i] = e.getGlobalPropertyFromString(t[i]);
          }), t;
        } }, { key: "getGlobalPropertyFromString", value: function(t) {
          if (t.includes(".")) {
            var e = t.split("."), i = e[0], c = e[1];
            if (window[i] !== void 0 && window[i][c] !== void 0) return window[i][c];
          } else if (window[t] !== void 0) return window[t];
          return t;
        } }, { key: "shouldBeUnset", value: function() {
          return !this.jsoneditor.options.use_default_values && !this.is_dirty;
        } }, { key: "getValue", value: function() {
          var t = !(!this.input || !this.input.value);
          if (!this.shouldBeUnset() || t) return this.imask_instance && this.dependenciesFulfilled && this.options.imask.returnUnmasked ? this.imask_instance.unmaskedValue : at(nt(n.prototype), "getValue", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, at(nt(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.input.disabled = !0, at(nt(n.prototype), "disable", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input), window.Cleave && !this.cleave_instance ? this.setupCleave(this.input) : window.IMask && !this.imask_instance && this.setupImask(this.input);
        } }, { key: "refreshValue", value: function() {
          this.input && (this.value = this.input.value, typeof this.value == "string" || this.shouldBeUnset() || (this.value = ""), this.serialized = this.value);
        } }, { key: "destroy", value: function() {
          this.cleave_instance && this.cleave_instance.destroy(), this.imask_instance && this.imask_instance.destroy(), this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), at(nt(n.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(t) {
          return t;
        } }, { key: "onWatchedFieldChange", value: function() {
          var t;
          this.template && (t = this.getWatchedFieldValues(), this.setValue(this.template(t), !1, !0)), at(nt(n.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this;
          if (this.jsoneditor.options.show_errors !== "always") {
            if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
          }
          this.previous_error_setting = this.jsoneditor.options.show_errors;
          var i = t.reduce(function(c, h) {
            return h.path === e.path && c.push(h.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && q(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function bt(o) {
        return bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, bt(o);
      }
      function Ct(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, St(s.key), s);
        }
      }
      function St(o) {
        var n = function(r, s) {
          if (bt(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (bt(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return bt(n) == "symbol" ? n : n + "";
      }
      function Pt(o, n, r) {
        return n = Et(n), function(s, t) {
          if (t && (bt(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, pt() ? Reflect.construct(n, r || [], Et(o).constructor) : n.apply(o, r));
      }
      function pt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pt = function() {
          return !!o;
        })();
      }
      function Tt() {
        return Tt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Et(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Tt.apply(this, arguments);
      }
      function Et(o) {
        return Et = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Et(o);
      }
      function Gt(o, n) {
        return Gt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Gt(o, n);
      }
      var Qt = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Pt(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Gt(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t);
          var c = Tt(Et(n.prototype), "setValue", this).call(this, t, e, i);
          c !== void 0 && c.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(c.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize());
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Tt(Et(n.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          if (window.ace) {
            var i = this.input_type;
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), t = this.expandCallbacks("ace", v({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, t), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
              e.input.value = e.ace_editor_instance.getValue(), e.refreshValue(), e.is_dirty = !0, e.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Tt(Et(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!1), Tt(Et(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!0), Tt(Et(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.ace_editor_instance && (this.ace_editor_instance.destroy(), this.ace_editor_instance = null), Tt(Et(n.prototype), "destroy", this).call(this);
        } }]) && Ct(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Zt(o) {
        return Zt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Zt(o);
      }
      function Mt(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Lt(s.key), s);
        }
      }
      function Lt(o) {
        var n = function(r, s) {
          if (Zt(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Zt(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Zt(n) == "symbol" ? n : n + "";
      }
      function Jt(o, n, r) {
        return n = G(n), function(s, t) {
          if (t && (Zt(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, T() ? Reflect.construct(n, r || [], G(o).constructor) : n.apply(o, r));
      }
      function T() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (T = function() {
          return !!o;
        })();
      }
      function B() {
        return B = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = G(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, B.apply(this, arguments);
      }
      function G(o) {
        return G = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, G(o);
      }
      function Y(o, n) {
        return Y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Y(o, n);
      }
      _(2008), _(4554);
      var et = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Jt(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Y(t, e);
        }(n, o), r = n, s = [{ key: "askConfirmation", value: function() {
          return this.jsoneditor.options.prompt_before_delete !== !0 || window.confirm(this.translate("button_delete_node_warning")) !== !1;
        } }, { key: "register", value: function() {
          B(G(n.prototype), "register", this).call(this), this.rows && this.rows.forEach(function(t) {
            return t.register();
          });
        } }, { key: "unregister", value: function() {
          B(G(n.prototype), "unregister", this).call(this), this.rows && this.rows.forEach(function(t) {
            return t.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          var t = this.getItemInfo(0);
          return this.tabs_holder && this.schema.format !== "tabs-top" ? Math.max(Math.min(12, t.width + 2), 4) : t.width;
        } }, { key: "enable", value: function() {
          var t = this;
          this.always_disabled || (this.setAvailability(this, !1), this.rows && this.rows.forEach(function(e) {
            e.enable(), t.setAvailability(e, !1);
          }), B(G(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          var e = this;
          t && (this.always_disabled = !0), this.setAvailability(this, !0), this.rows && this.rows.forEach(function(i) {
            i.disable(t), e.setAvailability(i, !0);
          }), B(G(n.prototype), "disable", this).call(this);
        } }, { key: "setAvailability", value: function(t, e) {
          t.add_row_button && (t.add_row_button.disabled = e), t.remove_all_rows_button && (t.remove_all_rows_button.disabled = e), t.delete_last_row_button && (t.delete_last_row_button.disabled = e), t.copy_button && (t.copy_button.disabled = e), t.delete_button && (t.delete_button.disabled = e), t.moveup_button && (t.moveup_button.disabled = e), t.movedown_button && (t.movedown_button.disabled = e);
        } }, { key: "preBuild", value: function() {
          B(G(n.prototype), "preBuild", this).call(this), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add, this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top;
        } }, { key: "build", value: function() {
          this.options.compact ? (this.title = this.theme.getHeader("", this.getPathDepth()), this.container.appendChild(this.title), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.schema.format === "tabs-top" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder), this.active_tab = null) : this.schema.format === "tabs" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls))), this.addControls();
        } }, { key: "postBuild", value: function() {
          B(G(n.prototype), "postBuild", this).call(this), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "onChildEditorChange", value: function(t, e) {
          this.refreshValue(), this.refreshTabs(!0), this.is_dirty = !0, B(G(n.prototype), "onChildEditorChange", this).call(this, t, e);
        } }, { key: "getItemTitle", value: function() {
          if (!this.item_title) if (this.schema.items && !Array.isArray(this.schema.items)) {
            var t = this.jsoneditor.expandRefs(this.schema.items);
            this.item_title = this.translateProperty(t.title) || this.translate("default_array_item_title");
          } else this.item_title = this.translate("default_array_item_title");
          return this.cleanText(this.item_title);
        } }, { key: "getItemSchema", value: function(t) {
          return Array.isArray(this.schema.items) ? t >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? v({}, this.schema.additionalItems) : void 0 : v({}, this.schema.items[t]) : this.schema.items ? v({}, this.schema.items) : {};
        } }, { key: "getItemInfo", value: function(t) {
          var e = this.getItemSchema(t);
          this.item_info = this.item_info || {};
          var i = JSON.stringify(e);
          return this.item_info[i] !== void 0 || (e = this.jsoneditor.expandRefs(e), this.item_info[i] = { title: this.translateProperty(e.title) || this.translate("default_array_item_title"), default: e.default, width: 12, child_editors: e.properties || e.items }), this.item_info[i];
        } }, { key: "getElementEditor", value: function(t) {
          var e = this.getItemInfo(t), i = this.getItemSchema(t);
          (i = this.jsoneditor.expandRefs(i)).title = "".concat(e.title, " ").concat(t + 1);
          var c, h = this.jsoneditor.getEditorClass(i);
          this.tabs_holder ? (c = this.schema.format === "tabs-top" ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = "".concat(this.path, ".").concat(t) : c = e.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(c);
          var b = this.jsoneditor.createEditor(h, { jsoneditor: this.jsoneditor, schema: i, container: c, path: "".concat(this.path, ".").concat(t), parent: this, required: !0 });
          return b.preBuild(), b.build(), b.postBuild(), b.title_controls || (b.array_controls = this.theme.getButtonHolder(), c.appendChild(b.array_controls)), b;
        } }, { key: "checkParent", value: function(t) {
          return t && t.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, B(G(n.prototype), "destroy", this).call(this);
        } }, { key: "empty", value: function(t) {
          var e = this;
          if (this.rows !== null) {
            if (this.rows.forEach(function(c, h) {
              t && (e.checkParent(c.tab) && c.tab.parentNode.removeChild(c.tab), e.destroyRow(c, !0), e.row_cache[h] = null), e.rows[h] = null;
            }), t) for (var i = this.rows.length; i < this.row_cache.length; i++) this.destroyRow(this.row_cache[i], !0), this.row_cache[i] = null;
            this.rows = [], t && (this.row_cache = []);
          }
        } }, { key: "destroyRow", value: function(t, e) {
          var i = t.container;
          e ? (t.destroy(), i.parentNode && i.parentNode.removeChild(i), this.checkParent(t.tab) && t.tab.parentNode.removeChild(t.tab)) : (t.tab && (t.tab.style.display = "none"), i.style.display = "none", t.unregister());
        } }, { key: "getMax", value: function() {
          return Array.isArray(this.schema.items) && this.schema.additionalItems === !1 ? Math.min(this.schema.items.length, this.schema.maxItems || 1 / 0) : this.schema.maxItems || 1 / 0;
        } }, { key: "refreshTabs", value: function(t) {
          var e = this;
          this.rows.forEach(function(i) {
            i.tab && (t ? i.tab_text.textContent = i.getHeaderText() : i.tab === e.active_tab ? e.theme.markTabActive(i) : e.theme.markTabInactive(i));
          });
        } }, { key: "ensureArraySize", value: function(t) {
          if (Array.isArray(t) || (t = [t]), this.schema.minItems) for (; t.length < this.schema.minItems; ) t.push(this.getItemInfo(t.length).default);
          return this.getMax() && t.length > this.getMax() && (t = t.slice(0, this.getMax())), t;
        } }, { key: "setValue", value: function() {
          var t = this, e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (e = this.applyConstFilter(e), e = this.ensureArraySize(e), JSON.stringify(e) !== this.serialized) {
            e.forEach(function(k, E) {
              if (t.rows[E]) t.rows[E].setValue(k, i);
              else if (t.row_cache[E]) t.rows[E] = t.row_cache[E], t.rows[E].setValue(k, i), t.rows[E].container.style.display = "", t.rows[E].tab && (t.rows[E].tab.style.display = ""), t.rows[E].register(), t.jsoneditor.trigger("addRow", t.rows[E]);
              else {
                var I = t.addRow(k, i);
                t.jsoneditor.trigger("addRow", I);
              }
            });
            for (var c = e.length; c < this.rows.length; c++) this.destroyRow(this.rows[c]), this.rows[c] = null;
            this.rows = this.rows.slice(0, e.length);
            var h = this.rows.find(function(k) {
              return k.tab === t.active_tab;
            }), b = h !== void 0 ? h.tab : null;
            !b && this.rows.length && (b = this.rows[0].tab), this.active_tab = b, this.refreshValue(i), this.refreshTabs(!0), this.refreshTabs(), this.onChange();
          } else i && this.refreshValue(i);
        } }, { key: "setButtonState", value: function(t, e) {
          switch (this.options.button_state_mode || this.jsoneditor.options.button_state_mode) {
            case 1:
            default:
              t.style.display = e ? "" : "none";
              break;
            case 2:
              t.disabled = !e;
          }
        } }, { key: "setupButtons", value: function(t) {
          var e = [];
          if (this.value.length) if (this.value.length === 1) {
            this.setButtonState(this.remove_all_rows_button, !1);
            var i = !(t || this.hide_delete_last_row_buttons);
            this.setButtonState(this.delete_last_row_button, i), e.push(i);
          } else {
            var c = !(t || this.hide_delete_last_row_buttons);
            this.setButtonState(this.delete_last_row_button, c), e.push(c);
            var h = !(t || this.hide_delete_all_rows_buttons);
            this.setButtonState(this.remove_all_rows_button, h), e.push(h);
          }
          else this.setButtonState(this.delete_last_row_button, !1), this.setButtonState(this.remove_all_rows_button, !1);
          var b = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, b), e.push(b), e.some(function(k) {
            return k;
          });
        } }, { key: "refreshValue", value: function(t) {
          var e = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(h) {
            return h.getValue();
          }), i !== this.value.length || t) {
            var c = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(h, b) {
              if (h.movedown_button) {
                var k = b !== e.rows.length - 1;
                e.setButtonState(h.movedown_button, k);
              }
              h.delete_button && e.setButtonState(h.delete_button, !c), e.value[b] = h.getValue();
            }), this.setupButtons(c) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(t, e) {
          var i = this, c = this.rows.length;
          this.rows[c] = this.getElementEditor(c), this.row_cache[c] = this.rows[c], this.tabs_holder ? (this.rows[c].tab_text = document.createElement("span"), this.rows[c].tab_text.textContent = this.rows[c].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[c].tab = this.theme.getTopTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTopTab(this.tabs_holder, this.rows[c].tab)) : (this.rows[c].tab = this.theme.getTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTab(this.tabs_holder, this.rows[c].tab)), this.rows[c].tab.addEventListener("click", function(b) {
            i.active_tab = i.rows[c].tab, i.refreshTabs(), b.preventDefault(), b.stopPropagation();
          }), this._supportDragDrop(this.rows[c].tab)) : this._supportDragDrop(this.rows[c].container, !0);
          var h = this.rows[c].title_controls || this.rows[c].array_controls;
          return this.hide_delete_buttons || (this.rows[c].delete_button = this._createDeleteButton(c, h)), this.show_copy_button && (this.rows[c].copy_button = this._createCopyButton(c, h)), c && !this.hide_move_buttons && (this.rows[c].moveup_button = this._createMoveUpButton(c, h)), this.hide_move_buttons || (this.rows[c].movedown_button = this._createMoveDownButton(c, h)), t !== void 0 && this.rows[c].setValue(t, e), this.refreshTabs(), this.rows[c];
        } }, { key: "_createDeleteButton", value: function(t, e) {
          var i = this, c = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue().filter(function($, W) {
              return W !== b;
            }), E = null, I = i.rows[b].getValue();
            i.setValue(k), i.rows[b] ? E = i.rows[b].tab : i.rows[b - 1] && (E = i.rows[b - 1].tab), E && (i.active_tab = E, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", I);
          }), e && e.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(t, e) {
          var i = this, c = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), h = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", t), c.addEventListener("click", function(b) {
            var k = i.getValue();
            b.preventDefault(), b.stopPropagation();
            var E = 1 * b.currentTarget.getAttribute("data-i");
            k.forEach(function(I, $) {
              if ($ === E) {
                if (h.items.type === "string" && h.items.format === "uuid") I = A();
                else if (h.items.type === "object" && h.items.properties) for (var W = 0, X = Object.keys(I); W < X.length; W++) {
                  var dt = X[W];
                  h.items.properties && h.items.properties[dt] && h.items.properties[dt].format === "uuid" && (I[dt] = A());
                }
                k.push(I);
              }
            }), i.setValue(k), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[E - 1]);
          }), e.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(t, e) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i");
            if (!(b <= 0)) {
              var k = i.getValue(), E = k[b - 1];
              k[b - 1] = k[b], k[b] = E, i.setValue(k), i.active_tab = i.rows[b - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
            }
          }), e && e.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(t, e) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            if (!(b >= k.length - 1)) {
              var E = k[b + 1];
              k[b + 1] = k[b], k[b] = E, i.setValue(k), i.active_tab = i.rows[b + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
            }
          }), e && e.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(t, e) {
          var i = this;
          it(t, function(c, h) {
            var b = i.getValue(), k = b[c];
            b.splice(c, 1), b.splice(h, 0, k), i.setValue(b), i.active_tab = i.rows[h].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[h]);
          }, { useTrigger: e });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
        } }, { key: "_createToggleButton", value: function() {
          var t = this, e = this.getButton("", "collapse", "button_collapse");
          e.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(e, this.title.childNodes[0]);
          var i = this.row_holder.style.display, c = this.controls.style.display;
          return e.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation(), t.panel && t.setButtonState(t.panel, t.collapsed), t.tabs_holder && t.setButtonState(t.tabs_holder, t.collapsed), t.collapsed ? (t.collapsed = !1, t.row_holder.style.display = i, t.controls.style.display = c, t.setButtonText(h.currentTarget, "", "collapse", "button_collapse")) : (t.collapsed = !0, t.row_holder.style.display = "none", t.controls.style.display = "none", t.setButtonText(h.currentTarget, "", "expand", "button_expand"));
          }), e;
        } }, { key: "_createAddRowButton", value: function() {
          var t = this, e = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return e.classList.add("json-editor-btntype-add"), e.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var c, h = t.rows.length;
            t.row_cache[h] ? (c = t.rows[h] = t.row_cache[h], t.rows[h].setValue(t.rows[h].getDefault(), !0), typeof t.rows[h].deactivateNonRequiredProperties == "function" && t.rows[h].deactivateNonRequiredProperties(!0), t.rows[h].container.style.display = "", t.rows[h].tab && (t.rows[h].tab.style.display = ""), t.rows[h].register()) : c = t.addRow(), t.active_tab = t.rows[h].tab, t.refreshTabs(), t.refreshValue(), t.onChange(!0), t.jsoneditor.trigger("addRow", c);
          }), this.controls.appendChild(e), e;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var t = this, e = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return e.classList.add("json-editor-btntype-deletelast"), e.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !t.askConfirmation()) return !1;
            var c = t.getValue(), h = null, b = c.pop();
            t.setValue(c), t.rows[t.rows.length - 1] && (h = t.rows[t.rows.length - 1].tab), h && (t.active_tab = h, t.refreshTabs()), t.onChange(!0), t.jsoneditor.trigger("deleteRow", b);
          }), this.controls.appendChild(e), e;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var t = this, e = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return e.classList.add("json-editor-btntype-deleteall"), e.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !t.askConfirmation()) return !1;
            var c = t.getValue();
            t.empty(!0), t.setValue([]), t.onChange(!0), t.jsoneditor.trigger("deleteAllRows", c);
          }), this.controls.appendChild(e), e;
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this, i = [], c = [];
          t.forEach(function(h) {
            h.path === e.path ? i.push(h) : c.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            e.error_holder.appendChild(e.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.rows.forEach(function(h) {
            return h.showValidationErrors(c);
          });
        } }], s && Mt(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function it(o, n) {
        (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).useTrigger ? o.addEventListener("mousedown", function(r) {
          if (r.ctrlKey) {
            o.draggable = !0;
            var s = function t(e) {
              o.draggable = !1, document.removeEventListener("dragend", t), document.removeEventListener("mouseup", t);
            };
            document.addEventListener("dragend", s), document.addEventListener("mouseup", s);
          }
        }) : o.draggable = !0, o.addEventListener("dragstart", function(r) {
          window.curDrag = o;
        }), o.addEventListener("dragover", function(r) {
          window.curDrag === null || window.curDrag === o || window.curDrag.parentElement !== o.parentElement ? r.dataTransfer.dropEffect = "none" : r.dataTransfer.dropEffect = "move", r.preventDefault();
        }), o.addEventListener("drop", function(r) {
          if (r.preventDefault(), r.stopPropagation(), window.curDrag !== null && window.curDrag !== o && window.curDrag.parentElement === o.parentElement) {
            var s = function(i) {
              for (var c = 0, h = i.parentElement.firstElementChild; h !== i && h !== null; ) h = h.nextSibling, ++c;
              return c;
            }, t = s(window.curDrag), e = s(o);
            n(t, e, window.curDrag, o), window.curDrag = null;
          }
        });
      }
      function ht(o) {
        return ht = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ht(o);
      }
      function ft(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, ut(s.key), s);
        }
      }
      function ut(o) {
        var n = function(r, s) {
          if (ht(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ht(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ht(n) == "symbol" ? n : n + "";
      }
      function st(o, n, r) {
        return n = _t(n), function(s, t) {
          if (t && (ht(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, wt() ? Reflect.construct(n, r || [], _t(o).constructor) : n.apply(o, r));
      }
      function wt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wt = function() {
          return !!o;
        })();
      }
      function yt() {
        return yt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = _t(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, yt.apply(this, arguments);
      }
      function _t(o) {
        return _t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, _t(o);
      }
      function Q(o, n) {
        return Q = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Q(o, n);
      }
      et.rules = { ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-array-control-btn": "width:100%25;text-align:left;margin-bottom:3px" };
      var ct = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), st(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Q(t, e);
        }(n, o), r = n, (s = [{ key: "onInputChange", value: function() {
          this.value = this.input.value, this.onChange(!0);
        } }, { key: "register", value: function() {
          yt(_t(n.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          yt(_t(n.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          var t = this, e = this.getTitle().length;
          return Object.keys(this.select_values).forEach(function(i) {
            return e = Math.max(e, "".concat(t.select_values[i]).length + 4);
          }), Math.min(12, Math.max(e / 7, 2));
        } }, { key: "preBuild", value: function() {
          var t;
          yt(_t(n.prototype), "preBuild", this).call(this), this.select_options = {}, this.select_values = {}, this.option_titles = [], this.option_keys = [], this.option_enum = [];
          var e = this.jsoneditor.expandRefs(this.schema.items || {}), i = e.enum || [], c = e.options && e.options.enum || [], h = e.options && e.options.enum_titles || [];
          for (t = 0; t < i.length; t++) if (this.sanitize(i[t]) === i[t]) {
            var b = c[t] || {};
            "title" in b || (b.title = "".concat(h[t] || i[t])), this.option_keys.push("".concat(i[t])), this.option_enum.push(b), this.select_values["".concat(i[t])] = i[t];
          }
        } }, { key: "build", value: function() {
          var t, e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || this.schema.format === "checkbox") {
            for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, t = 0; t < this.option_keys.length; t++) {
              var i = this.formname + t.toString();
              this.inputs[this.option_keys[t]] = this.theme.getCheckbox(), this.inputs[this.option_keys[t]].id = i, this.select_options[this.option_keys[t]] = this.inputs[this.option_keys[t]];
              var c = this.theme.getCheckboxLabel(this.option_enum[t].title);
              if (c.htmlFor = i, this.option_enum[t].infoText) {
                var h = this.theme.getInfoButton(this.translateProperty(this.option_enum[t].infoText));
                c.appendChild(h);
              }
              this.controls["_" + this.option_keys[t]] = this.theme.getFormControl(c, this.inputs[this.option_keys[t]]);
            }
            this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description, this.infoButton), this.inputs.controlgroup = this.inputs.controls = this.control;
          } else {
            for (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys, !0), this.theme.setSelectOptions(this.input, this.option_keys, this.option_enum.map(function(b) {
              return b.title;
            })), this.input.setAttribute("multiple", "multiple"), this.input.size = Math.min(10, this.option_keys.length), t = 0; t < this.option_keys.length; t++) this.select_options[this.option_keys[t]] = this.input.children[t];
            this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname);
          }
          (this.schema.readOnly || this.schema.readonly) && this.disable(!0), this.container.appendChild(this.control), this.multiselectChangeHandler = function(b) {
            var k = [];
            for (t = 0; t < e.option_keys.length; t++) e.select_options[e.option_keys[t]] && (e.select_options[e.option_keys[t]].selected || e.select_options[e.option_keys[t]].checked) && k.push(e.select_values[e.option_keys[t]]);
            e.updateValue(k), e.onChange(!0);
          }, this.control.addEventListener("change", this.multiselectChangeHandler, !1), window.requestAnimationFrame(function() {
            e.afterInputReady();
          });
        } }, { key: "postBuild", value: function() {
          yt(_t(n.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input || this.inputs);
        } }, { key: "setValue", value: function(t, e) {
          var i = this;
          t = (t = this.applyConstFilter(t)) || [], Array.isArray(t) || (t = [t]), t = t.map(function(c) {
            return "".concat(c);
          }), Object.keys(this.select_options).forEach(function(c) {
            i.select_options[c][i.input_type === "select" ? "selected" : "checked"] = t.includes(c);
          }), this.updateValue(t), this.onChange(!0);
        } }, { key: "removeValue", value: function(t) {
          t = [].concat(t), this.setValue(this.getValue().filter(function(e) {
            return !t.includes(e);
          }));
        } }, { key: "addValue", value: function(t) {
          this.setValue(this.getValue().concat(t));
        } }, { key: "updateValue", value: function(t) {
          for (var e = !1, i = [], c = 0; c < t.length; c++) if (this.select_options["".concat(t[c])]) {
            var h = this.sanitize(this.select_values[t[c]]);
            i.push(h), h !== t[c] && (e = !0);
          } else e = !0;
          return this.value = i, e;
        } }, { key: "sanitize", value: function(t) {
          return this.schema.items.type === "boolean" ? !!t : this.schema.items.type === "number" ? 1 * t || 0 : this.schema.items.type === "integer" ? Math.floor(1 * t || 0) : "".concat(t);
        } }, { key: "enable", value: function() {
          var t = this;
          this.always_disabled || (this.input ? this.input.disabled = !1 : this.inputs && Object.keys(this.inputs).forEach(function(e) {
            return t.inputs[e].disabled = !1;
          }), yt(_t(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          var e = this;
          t && (this.always_disabled = !0), this.input ? this.input.disabled = !0 : this.inputs && Object.keys(this.inputs).forEach(function(i) {
            return e.inputs[i].disabled = !0;
          }), yt(_t(n.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          yt(_t(n.prototype), "destroy", this).call(this);
        } }, { key: "escapeRegExp", value: function(t) {
          return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } }, { key: "showValidationErrors", value: function(t) {
          var e = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = t.reduce(function(c, h) {
            return h.path.match(e) && c.push(h.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && ft(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function mt(o) {
        return mt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, mt(o);
      }
      function Ot(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Bt(s.key), s);
        }
      }
      function Bt(o) {
        var n = function(r, s) {
          if (mt(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (mt(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return mt(n) == "symbol" ? n : n + "";
      }
      function Kt(o, n, r) {
        return n = re(n), function(s, t) {
          if (t && (mt(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, ne() ? Reflect.construct(n, r || [], re(o).constructor) : n.apply(o, r));
      }
      function ne() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ne = function() {
          return !!o;
        })();
      }
      function Xt() {
        return Xt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = re(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Xt.apply(this, arguments);
      }
      function re(o) {
        return re = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, re(o);
      }
      function pe(o, n) {
        return pe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, pe(o, n);
      }
      var te = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Kt(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && pe(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          this.choices_instance ? (t = this.applyConstFilter(t), t = [].concat(t).map(function(i) {
            return "".concat(i);
          }), this.updateValue(t), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : Xt(re(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          var t = this;
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", v({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
            this.newEnumAllowed = !1, this.choices_instance = new window.Choices(this.input, e), this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              var c = t.choices_instance.getValue(!0);
              t.updateValue(c), t.onChange(!0);
            }, this.control.addEventListener("change", this.multiselectChangeHandler, !1);
          }
          Xt(re(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(t) {
          t = [].concat(t);
          for (var e = !1, i = [], c = 0; c < t.length; c++)
            if (!(!this.select_values["".concat(t[c])] && (e = !0, !this.newEnumAllowed || !this.addNewOption(t[c])))) {
              var h = this.sanitize(this.select_values[t[c]]);
              i.push(h), h !== t[c] && (e = !0);
            }
          return this.value = i, e;
        } }, { key: "addNewOption", value: function(t) {
          return this.option_keys.push("".concat(t)), this.option_titles.push("".concat(t)), this.select_values["".concat(t)] = t, this.schema.items.enum.push(t), this.choices_instance.setChoices([{ value: "".concat(t), label: "".concat(t) }], "value", "label", !1), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Xt(re(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.choices_instance && this.choices_instance.disable(), Xt(re(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Xt(re(n.prototype), "destroy", this).call(this);
        } }]) && Ot(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(ct);
      function ee(o) {
        return ee = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ee(o);
      }
      function Zn(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, $i(s.key), s);
        }
      }
      function $i(o) {
        var n = function(r, s) {
          if (ee(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ee(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ee(n) == "symbol" ? n : n + "";
      }
      function Nt(o, n, r) {
        return n = qt(n), function(s, t) {
          if (t && (ee(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, zt() ? Reflect.construct(n, r || [], qt(o).constructor) : n.apply(o, r));
      }
      function zt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (zt = function() {
          return !!o;
        })();
      }
      function Ft() {
        return Ft = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = qt(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Ft.apply(this, arguments);
      }
      function qt(o) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, qt(o);
      }
      function he(o, n) {
        return he = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, he(o, n);
      }
      var Gi = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Nt(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && he(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          t = this.applyConstFilter(t), this.select2_instance ? (t = [].concat(t).map(function(i) {
            return "".concat(i);
          }), this.updateValue(t), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : Ft(qt(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (t = this.expandCallbacks("select2", v({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = t.tags = !!t.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
            var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
            e.updateValue(i), e.onChange(!0);
          }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), Ft(qt(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(t) {
          t = [].concat(t);
          for (var e = !1, i = [], c = 0; c < t.length; c++)
            if (!(!this.select_values["".concat(t[c])] && (e = !0, !this.newEnumAllowed || !this.addNewOption(t[c])))) {
              var h = this.sanitize(this.select_values[t[c]]);
              i.push(h), h !== t[c] && (e = !0);
            }
          return this.value = i, e;
        } }, { key: "addNewOption", value: function(t) {
          this.option_keys.push("".concat(t)), this.option_titles.push("".concat(t)), this.select_values["".concat(t)] = t, this.schema.items.enum.push(t);
          var e = this.input.querySelector('option[value="'.concat(t, '"]'));
          return e ? e.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(t, t, !1, !1)).trigger("change"), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), Ft(qt(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), Ft(qt(n.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), Ft(qt(n.prototype), "destroy", this).call(this);
        } }]) && Zn(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(ct);
      function dn(o) {
        return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, dn(o);
      }
      function Pu(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Tu(s.key), s);
        }
      }
      function Tu(o) {
        var n = function(r, s) {
          if (dn(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (dn(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return dn(n) == "symbol" ? n : n + "";
      }
      function Lu(o, n, r) {
        return n = Je(n), function(s, t) {
          if (t && (dn(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Pa() ? Reflect.construct(n, r || [], Je(o).constructor) : n.apply(o, r));
      }
      function Pa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Pa = function() {
          return !!o;
        })();
      }
      function Yn() {
        return Yn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Je(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Yn.apply(this, arguments);
      }
      function Je(o) {
        return Je = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Je(o);
      }
      function Lo(o, n) {
        return Lo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Lo(o, n);
      }
      var Au = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Lu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Lo(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          t = this.applyConstFilter(t), this.selectize_instance ? (t = [].concat(t).map(function(i) {
            return "".concat(i);
          }), this.updateValue(t), this.selectize_instance.setValue(this.value), this.onChange(!0)) : Yn(Je(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            t = this.expandCallbacks("selectize", v({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = t.create = !!t.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(b) {
              var k = e.selectize_instance.getValue();
              e.updateValue(k), e.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
            var i = this.theme.getHiddenLabel(this.formname);
            this.input.setAttribute("id", this.formname + "-hidden-input"), i.setAttribute("for", this.formname + "-hidden-input"), this.input.parentNode.insertBefore(i, this.input);
            var c = this.selectize_instance.$control[0];
            if (c) {
              var h = this.theme.getHiddenLabel(this.formname);
              h.setAttribute("for", this.formname + "-selectized"), c.appendChild(h);
            }
          }
          Yn(Je(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(t) {
          t = [].concat(t);
          for (var e = !1, i = [], c = 0; c < t.length; c++)
            if (!(!this.select_values["".concat(t[c])] && (e = !0, !this.newEnumAllowed || !this.addNewOption(t[c])))) {
              var h = this.sanitize(this.select_values[t[c]]);
              i.push(h), h !== t[c] && (e = !0);
            }
          return this.value = i, e;
        } }, { key: "addNewOption", value: function(t) {
          return this.option_keys.push("".concat(t)), this.option_titles.push("".concat(t)), this.select_values["".concat(t)] = t, this.selectize_instance.addOption({ text: t, value: t }), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), Yn(Je(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.selectize_instance && this.selectize_instance.lock(), Yn(Je(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), Yn(Je(n.prototype), "destroy", this).call(this);
        } }]) && Pu(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(ct);
      function wr(o) {
        return wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, wr(o);
      }
      function Ru(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Iu(s.key), s);
        }
      }
      function Iu(o) {
        var n = function(r, s) {
          if (wr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (wr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return wr(n) == "symbol" ? n : n + "";
      }
      function Bu(o, n, r) {
        return n = xn(n), function(s, t) {
          if (t && (wr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ta() ? Reflect.construct(n, r || [], xn(o).constructor) : n.apply(o, r));
      }
      function Ta() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ta = function() {
          return !!o;
        })();
      }
      function yi() {
        return yi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = xn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, yi.apply(this, arguments);
      }
      function xn(o) {
        return xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, xn(o);
      }
      function Ao(o, n) {
        return Ao = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ao(o, n);
      }
      var Nu = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Bu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ao(t, e);
        }(n, o), r = n, (s = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), yi(xn(n.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          window.Autocomplete && !this.autocomplete_instance && (t = this.expandCallbacks("autocomplete", v({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            e.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(t.baseClass), this.autocomplete_dropdown.classList.add("".concat(t.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, t)), yi(xn(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), yi(xn(n.prototype), "destroy", this).call(this);
        } }]) && Ru(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function jr(o) {
        return jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, jr(o);
      }
      function Fu(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Du(s.key), s);
        }
      }
      function Du(o) {
        var n = function(r, s) {
          if (jr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (jr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return jr(n) == "symbol" ? n : n + "";
      }
      function Mu(o, n, r) {
        return n = On(n), function(s, t) {
          if (t && (jr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, La() ? Reflect.construct(n, r || [], On(o).constructor) : n.apply(o, r));
      }
      function La() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (La = function() {
          return !!o;
        })();
      }
      function mi() {
        return mi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = On(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, mi.apply(this, arguments);
      }
      function On(o) {
        return On = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, On(o);
      }
      function Ro(o, n) {
        return Ro = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ro(o, n);
      }
      var Hu = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Mu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ro(t, e);
        }(n, o), r = n, (s = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "setFileReaderListener", value: function(t) {
          var e = this;
          t.addEventListener("load", function(i) {
            if (e.count === e.current_item_index) e.value[e.count][e.key] = i.target.result;
            else {
              var c = {};
              for (var h in e.parent.schema.properties) c[h] = "";
              c[e.key] = i.target.result, e.value.splice(e.count, 0, c);
            }
            e.count += 1, e.count === e.total + e.current_item_index && e.arrayEditor.setValue(e.value);
          });
        } }, { key: "build", value: function() {
          var t = this;
          if (this.options.compact || (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
            if (!window.FileReader) throw new Error("FileReader required for base64 editor");
            this.uploader = this.theme.getFormInputField("file"), this.uploader.style.display = "none", this.schema.options && this.schema.options.multiple && this.schema.options.multiple === !0 && this.parent && this.parent.schema.type === "object" && this.parent.parent && this.parent.parent.schema.type === "array" && this.uploader.setAttribute("multiple", ""), this.uploader.addEventListener("change", function(i) {
              if (i.preventDefault(), i.stopPropagation(), i.currentTarget.files && i.currentTarget.files.length) if (i.currentTarget.files.length > 1 && t.schema.options && t.schema.options.multiple && t.schema.options.multiple === !0 && t.parent && t.parent.schema.type === "object" && t.parent.parent && t.parent.parent.schema.type === "array") {
                t.arrayEditor = t.jsoneditor.getEditor(t.parent.parent.path), t.value = t.arrayEditor.getValue(), t.total = i.currentTarget.files.length, t.current_item_index = parseInt(t.parent.key), t.count = t.current_item_index;
                for (var c = 0; c < t.total; c++) {
                  var h = new FileReader();
                  t.setFileReaderListener(h), h.readAsDataURL(i.currentTarget.files[c]);
                }
              } else {
                var b = new FileReader();
                b.onload = function(k) {
                  t.value = k.target.result, t.refreshPreview(), t.onChange(!0), b = null;
                }, b.readAsDataURL(i.currentTarget.files[0]);
              }
            });
          }
          this.preview = this.theme.getFormInputDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview, this.infoButton), this.container.appendChild(this.control);
          var e = this.getButton("button_upload", "upload", "button_upload");
          e.addEventListener("click", function() {
            t.uploader.click();
          }), this.control.appendChild(e), this.setInputAttributes(["multiple"], e);
        } }, { key: "refreshPreview", value: function() {
          if (this.last_preview !== this.value && (this.last_preview = this.value, this.preview.innerHTML = "", this.value)) {
            var t = this.value.match(/^data:([^;,]+)[;,]/);
            if (t && (t = t[1]), t) {
              if (this.preview.innerHTML = "<strong>Type:</strong> ".concat(t, ", <strong>Size:</strong> ").concat(Math.floor((this.value.length - this.value.split(",")[0].length - 1) / 1.33333), " bytes"), t.substr(0, 5) === "image") {
                this.preview.innerHTML += "<br>";
                var e = document.createElement("img");
                e.style.maxWidth = "100%", e.style.maxHeight = "100px", e.src = this.value, this.preview.appendChild(e);
              }
            } else this.preview.innerHTML = "<em>Invalid data URI</em>";
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), mi(On(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), mi(On(n.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(t) {
          t = this.applyConstFilter(t), this.value !== t && (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(t) ? this.value = this.schema.enum[0] : this.value = t, this.input.value = this.value, this.refreshPreview(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), mi(On(n.prototype), "destroy", this).call(this);
        } }]) && Fu(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function kr(o) {
        return kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, kr(o);
      }
      function Vu(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, zu(s.key), s);
        }
      }
      function zu(o) {
        var n = function(r, s) {
          if (kr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (kr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return kr(n) == "symbol" ? n : n + "";
      }
      function qu(o, n, r) {
        return n = Cn(n), function(s, t) {
          if (t && (kr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Aa() ? Reflect.construct(n, r, Cn(o).constructor) : n.apply(o, r));
      }
      function Aa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Aa = function() {
          return !!o;
        })();
      }
      function bi() {
        return bi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Cn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, bi.apply(this, arguments);
      }
      function Cn(o) {
        return Cn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Cn(o);
      }
      function Io(o, n) {
        return Io = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Io(o, n);
      }
      var Ra = function(o) {
        function n(t, e) {
          var i;
          return function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
          }(this, n), (i = qu(this, n, [t, e])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Io(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          var t = this;
          this.options.compact = !0;
          var e = this.expandCallbacks("button", v({}, { icon: "", validated: !1, align: "left", action: function(c, h) {
            window.alert('No button action defined for "'.concat(c.path, '"'));
          } }, this.defaults.options.button || {}, this.options.button || {})), i = this.translateProperty(e.text || this.schema.title) || this.key;
          this.input = this.getButton(i, e.icon, i), typeof e.action != "function" ? window.alert('No button action defined for "'.concat(this.path, '"')) : this.input.addEventListener("click", e.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(e.align), this.control.appendChild(this.input), this.container.appendChild(this.control), this.changeHandler = function() {
            t.jsoneditor.validate(t.jsoneditor.getValue()).length > 0 ? t.disable() : t.enable();
          }, e.validated && this.jsoneditor.on("change", this.changeHandler);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, bi(Cn(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.input.disabled = !0, bi(Cn(n.prototype), "disable", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "activate", value: function() {
          this.active = !1, this.enable();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.disable());
        } }, { key: "destroy", value: function() {
          this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, bi(Cn(n.prototype), "destroy", this).call(this);
        } }]) && Vu(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function xr(o) {
        return xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, xr(o);
      }
      function Uu(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, $u(s.key), s);
        }
      }
      function $u(o) {
        var n = function(r, s) {
          if (xr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (xr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return xr(n) == "symbol" ? n : n + "";
      }
      function Gu(o, n, r) {
        return n = Be(n), function(s, t) {
          if (t && (xr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ia() ? Reflect.construct(n, r || [], Be(o).constructor) : n.apply(o, r));
      }
      function Ia() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ia = function() {
          return !!o;
        })();
      }
      function En() {
        return En = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Be(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, En.apply(this, arguments);
      }
      function Be(o) {
        return Be = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Be(o);
      }
      function Bo(o, n) {
        return Bo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Bo(o, n);
      }
      var Wu = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Gu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Bo(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          t = !!(t = this.applyConstFilter(t));
          var i = this.getValue() !== t;
          this.value = t, this.input.checked = this.value, e || (this.is_dirty = !0), this.onChange(i);
        } }, { key: "register", value: function() {
          En(Be(n.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          En(Be(n.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          return Math.min(12, Math.max(this.getTitle().length / 7, 2));
        } }, { key: "setOptInCheckbox", value: function() {
          En(Be(n.prototype), "setOptInCheckbox", this).call(this), this.optInAppended && (this.container.insertBefore(this.optInContainer, this.container.firstChild), this.optInContainer.style.verticalAlign = "top", this.control.style.marginTop = "0");
        } }, { key: "build", value: function() {
          var t = this;
          this.parent.options.table_row || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.label.htmlFor = this.formname), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.input.id = this.formname, this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.control.style.display = "inline-block", (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.input.addEventListener("change", function(e) {
            e.preventDefault(), e.stopPropagation(), t.value = e.currentTarget.checked, t.is_dirty = !0, t.onChange(!0);
          }), this.container.appendChild(this.control);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, En(Be(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.input.disabled = !0, En(Be(n.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), En(Be(n.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this, i = this.jsoneditor.options.show_errors, c = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!c || this.is_dirty)) {
            var h = t.reduce(function(b, k) {
              return k.path === e.path && b.push(k.message), b;
            }, []);
            this.input.controlgroup = this.control, h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Uu(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Or(o) {
        return Or = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Or(o);
      }
      function Ju(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Ku(s.key), s);
        }
      }
      function Ku(o) {
        var n = function(r, s) {
          if (Or(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Or(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Or(n) == "symbol" ? n : n + "";
      }
      function Zu(o, n, r) {
        return n = Ne(n), function(s, t) {
          if (t && (Or(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ba() ? Reflect.construct(n, r || [], Ne(o).constructor) : n.apply(o, r));
      }
      function Ba() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ba = function() {
          return !!o;
        })();
      }
      function Sn() {
        return Sn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Ne(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Sn.apply(this, arguments);
      }
      function Ne(o) {
        return Ne = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ne(o);
      }
      function No(o, n) {
        return No = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, No(o, n);
      }
      _(6910);
      var vi = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Zu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && No(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          t = this.applyConstFilter(t);
          var i = this.typecast(t), c = this.enum_options.length > 0 && this.enum_values.includes(i), h = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || c && (!e || this.isRequired() || h) || (i = this.enum_values[0]), this.value !== i) {
            var b = this.enum_values.indexOf(i);
            c && b !== -1 ? this.input.value = this.enum_options[b] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, e || (this.is_dirty = !0), this.onChange(), this.change();
          }
        } }, { key: "register", value: function() {
          Sn(Ne(n.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Sn(Ne(n.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          if (!this.enum_options) return 3;
          for (var t = this.getTitle().length, e = 0; e < this.enum_options.length; e++) t = Math.max(t, this.enum_options[e].length + 4);
          return Math.min(12, Math.max(t / 7, 2));
        } }, { key: "typecast", value: function(t) {
          return this.schema.type === "boolean" ? t === "undefined" || t === void 0 ? void 0 : !!t : this.schema.type === "number" ? 1 * t || 0 : this.schema.type === "integer" ? Math.floor(1 * t || 0) : this.schema.enum && t === void 0 ? void 0 : "".concat(t);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.typecast(this.value);
        } }, { key: "preBuild", value: function() {
          var t, e, i, c, h = this;
          if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.hasPlaceholderOption = ((t = this.schema) === null || t === void 0 || (t = t.options) === null || t === void 0 ? void 0 : t.has_placeholder_option) || !1, this.placeholderOptionText = ((e = this.schema) === null || e === void 0 || (e = e.options) === null || e === void 0 ? void 0 : e.placeholder_option_text) || " ", this.enforceConst && this.schema.const) {
            var b = this.schema.const;
            this.enum_options = ["".concat(b)], this.enum_display = ["".concat(this.translateProperty(b) || b)], this.enum_values = [this.typecast(b)];
          } else if (this.schema.enum) {
            var k = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(E, I) {
              h.enum_options[I] = "".concat(E), h.enum_display[I] = "".concat(h.translateProperty(k[I]) || E), h.enum_values[I] = h.typecast(E);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = v({}, this.schema.enumSource[i]);
            else this.schema.enumValue ? this.enumSource = [{ source: this.schema.enumSource, value: this.schema.enumValue }] : this.enumSource = [{ source: this.schema.enumSource }];
            for (i = 0; i < this.enumSource.length; i++) this.enumSource[i].value && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].value })).template == "function" ? this.enumSource[i].value = c.template : this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine)), this.enumSource[i].title && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].title })).template == "function" ? this.enumSource[i].title = c.template : this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine)), this.enumSource[i].filter && this.enumSource[i].value && (typeof (c = this.expandCallbacks("template", { template: this.enumSource[i].filter })).template == "function" ? this.enumSource[i].filter = c.template : this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine));
          }
        } }, { key: "build", value: function() {
          var t = this;
          this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getSelectInput(this.enum_options, !1), this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display, this.hasPlaceholderOption, this.placeholderOptionText), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.setInputAttributes([]), this.input.addEventListener("change", function(e) {
            e.preventDefault(), e.stopPropagation(), t.onInputChange();
          }), this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), this.value = this.enum_values[0], window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady();
          });
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input);
        } }, { key: "onInputChange", value: function() {
          var t, e = this.typecast(this.input.value);
          (t = this.enum_values.includes(e) ? this.enum_values[this.enum_values.indexOf(e)] : this.enum_values[0]) !== this.value && (this.is_dirty = !0, this.value = t, this.onChange(!0));
        } }, { key: "onWatchedFieldChange", value: function() {
          var t, e, i = [], c = [];
          if (this.enumSource) {
            t = this.getWatchedFieldValues();
            for (var h = 0; h < this.enumSource.length; h++) if (Array.isArray(this.enumSource[h])) i = i.concat(this.enumSource[h]), c = c.concat(this.enumSource[h]);
            else {
              var b = [];
              if (b = Array.isArray(this.enumSource[h].source) ? this.enumSource[h].source : t[this.enumSource[h].source]) {
                if (this.enumSource[h].slice && (b = Array.prototype.slice.apply(b, this.enumSource[h].slice)), this.enumSource[h].filter) {
                  var k = [];
                  for (e = 0; e < b.length; e++) this.enumSource[h].filter({ i: e, item: b[e], watched: t }) && k.push(b[e]);
                  b = k;
                }
                var E = [], I = [];
                for (e = 0; e < b.length; e++) {
                  var $ = b[e];
                  this.enumSource[h].value ? I[e] = this.typecast(this.enumSource[h].value({ i: e, item: $ })) : I[e] = b[e], this.enumSource[h].title ? E[e] = this.enumSource[h].title({ i: e, item: $ }) : E[e] = I[e];
                }
                this.enumSource[h].sort && (function(X, dt, jt) {
                  X.map(function(xt, It) {
                    return { v: xt, t: dt[It] };
                  }).sort(function(xt, It) {
                    return xt.v < It.v ? -jt : xt.v === It.v ? 0 : jt;
                  }).forEach(function(xt, It) {
                    X[It] = xt.v, dt[It] = xt.t;
                  });
                }).bind(null, I, E, this.enumSource[h].sort === "desc" ? 1 : -1)(), i = i.concat(I), c = c.concat(E);
              }
            }
            var W = this.value;
            this.theme.setSelectOptions(this.input, i, c), this.enum_options = i, this.enum_display = c, this.enum_values = i, i.includes(W) || this.jsoneditor.options.enum_source_value_auto_select !== !1 ? (this.input.value = W, this.value = W) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path));
          }
          Sn(Ne(n.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Sn(Ne(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.input.disabled = !0, Sn(Ne(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Sn(Ne(n.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this, i = this.jsoneditor.options.show_errors, c = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!c || this.is_dirty)) {
            var h = t.reduce(function(b, k) {
              return k.path === e.path && b.push(k.message), b;
            }, []);
            h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Ju(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Cr(o) {
        return Cr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Cr(o);
      }
      function Yu(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Qu(s.key), s);
        }
      }
      function Qu(o) {
        var n = function(r, s) {
          if (Cr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Cr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Cr(n) == "symbol" ? n : n + "";
      }
      function Xu(o, n, r) {
        return n = Fe(n), function(s, t) {
          if (t && (Cr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Na() ? Reflect.construct(n, r || [], Fe(o).constructor) : n.apply(o, r));
      }
      function Na() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Na = function() {
          return !!o;
        })();
      }
      function Pn() {
        return Pn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Fe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Pn.apply(this, arguments);
      }
      function Fe(o) {
        return Fe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Fe(o);
      }
      function Fo(o, n) {
        return Fo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Fo(o, n);
      }
      var Fa = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Xu(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Fo(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          if (t = this.applyConstFilter(t), this.choices_instance) {
            var i = this.typecast(t || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            e ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else Pn(Fe(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var t = this.expandCallbacks("choices", v({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, t);
          }
          Pn(Fe(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var t = this;
          if (Pn(Fe(n.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var e = this.enum_options.map(function(i, c) {
              return { value: i, label: t.enum_display[c] };
            });
            this.choices_instance.setChoices(e, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Pn(Fe(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.choices_instance && this.choices_instance.disable(), Pn(Fe(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Pn(Fe(n.prototype), "destroy", this).call(this);
        } }]) && Yu(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(vi);
      function Qn(o) {
        return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Qn(o);
      }
      function th(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, eh(s.key), s);
        }
      }
      function eh(o) {
        var n = function(r, s) {
          if (Qn(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Qn(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Qn(n) == "symbol" ? n : n + "";
      }
      function nh(o, n, r) {
        return n = Tn(n), function(s, t) {
          if (t && (Qn(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Da() ? Reflect.construct(n, r || [], Tn(o).constructor) : n.apply(o, r));
      }
      function Da() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Da = function() {
          return !!o;
        })();
      }
      function gi() {
        return gi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Tn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, gi.apply(this, arguments);
      }
      function Tn(o) {
        return Tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Tn(o);
      }
      function Do(o, n) {
        return Do = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Do(o, n);
      }
      Fa.rules = { ".choices > *": "box-sizing:border-box" };
      var rh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), nh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Do(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          if (gi(Tn(n.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && Qn(this.options.flatpickr) === "object")) {
            this.options.flatpickr.enableTime = this.schema.format !== "date", this.options.flatpickr.noCalendar = this.schema.format === "time", this.schema.type === "integer" && (this.options.flatpickr.mode = "single"), this.input.setAttribute("data-input", "");
            var t = this.input;
            if (this.options.flatpickr.wrap === !0) {
              var e = [];
              if (this.options.flatpickr.showToggleButton !== !1) {
                var i = this.getButton("", this.schema.format === "time" ? "time" : "calendar", "flatpickr_toggle_button");
                i.setAttribute("data-toggle", ""), e.push(i);
              }
              if (this.options.flatpickr.showClearButton !== !1) {
                var c = this.getButton("", "clear", "flatpickr_clear_button");
                c.setAttribute("data-clear", ""), e.push(c);
              }
              var h = this.input.parentNode, b = this.input.nextSibling, k = this.theme.getInputGroup(this.input, e);
              k !== void 0 ? (this.options.flatpickr.inline = !1, h.insertBefore(k, b), t = k) : this.options.flatpickr.wrap = !1;
            }
            this.flatpickr = window.flatpickr(t, this.options.flatpickr), this.options.flatpickr.inline === !0 && this.options.flatpickr.inlineHideInput === !0 && this.input.setAttribute("type", "hidden");
          }
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            if (this.schema.type === "string") return this.value;
            if (this.value !== "" && this.value !== void 0) {
              var t = this.schema.format === "time" ? "1970-01-01 ".concat(this.value) : this.value;
              return parseInt(new Date(t).getTime() / 1e3);
            }
          }
        } }, { key: "setValue", value: function(t, e, i) {
          if (t = this.applyConstFilter(t), this.schema.type === "string") gi(Tn(n.prototype), "setValue", this).call(this, t, e, i), this.flatpickr && this.flatpickr.setDate(t);
          else if (t > 0) {
            var c = new Date(1e3 * t), h = c.getFullYear(), b = this.zeroPad(c.getMonth() + 1), k = this.zeroPad(c.getDate()), E = this.zeroPad(c.getHours()), I = this.zeroPad(c.getMinutes()), $ = this.zeroPad(c.getSeconds()), W = [h, b, k].join("-"), X = [E, I, $].join(":"), dt = "".concat(W, "T").concat(X);
            this.schema.format === "date" ? dt = W : this.schema.format === "time" && (dt = X), this.input.value = dt, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(dt);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, gi(Tn(n.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(t) {
          return "0".concat(t).slice(-2);
        } }]) && th(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Er(o) {
        return Er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Er(o);
      }
      function ih(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, oh(s.key), s);
        }
      }
      function oh(o) {
        var n = function(r, s) {
          if (Er(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Er(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Er(n) == "symbol" ? n : n + "";
      }
      function sh(o, n, r) {
        return n = De(n), function(s, t) {
          if (t && (Er(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ma() ? Reflect.construct(n, r || [], De(o).constructor) : n.apply(o, r));
      }
      function Ma() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ma = function() {
          return !!o;
        })();
      }
      function Ln() {
        return Ln = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = De(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Ln.apply(this, arguments);
      }
      function De(o) {
        return De = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, De(o);
      }
      function Mo(o, n) {
        return Mo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Mo(o, n);
      }
      var ah = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), sh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Mo(t, e);
        }(n, o), r = n, (s = [{ key: "register", value: function() {
          if (this.editors) {
            for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
            this.editors[this.currentEditor] && this.editors[this.currentEditor].register();
          }
          Ln(De(n.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Ln(De(n.prototype), "unregister", this).call(this), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].enable();
          Ln(De(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          if (this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable();
          Ln(De(n.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function() {
          var t = this, e = this.getWatchedFieldValues();
          if (e) {
            var i = document.location.origin + document.location.pathname + this.template(e);
            this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), this.editors.forEach(function(c, h) {
              c && (t.currentEditor === h ? c.container.style.display = "" : c.container.style.display = "none");
            }), this.refreshValue(), this.onChange(!0);
          }
        } }, { key: "buildChildEditor", value: function(t) {
          this.refs[t] = this.editors.length;
          var e = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(e);
          var i = v({}, this.schema, this.jsoneditor.refs[t]), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: e, path: this.path, parent: this, required: !0 });
          this.editors.push(h), h.preBuild(), h.build(), h.postBuild();
        } }, { key: "preBuild", value: function() {
          var t;
          for (this.refs = {}, this.editors = [], this.currentEditor = "", t = 0; t < this.schema.links.length; t++) if (this.schema.links[t].rel.toLowerCase() === "describedby") {
            this.template = this.jsoneditor.compileTemplate(this.schema.links[t].href, this.template_engine);
            break;
          }
          this.schema.links = this.schema.links.slice(0, t).concat(this.schema.links.slice(t + 1)), this.schema.links.length === 0 && delete this.schema.links, this.baseSchema = v({}, this.schema);
        } }, { key: "build", value: function() {
          this.editor_holder = document.createElement("div"), this.container.appendChild(this.editor_holder), this.switchEditor();
        } }, { key: "onWatchedFieldChange", value: function() {
          this.switchEditor();
        } }, { key: "onChildEditorChange", value: function(t, e) {
          this.editors[this.currentEditor] && this.refreshValue(), Ln(De(n.prototype), "onChildEditorChange", this).call(this, t, e);
        } }, { key: "refreshValue", value: function() {
          this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue());
        } }, { key: "setValue", value: function(t, e) {
          t = this.applyConstFilter(t), this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(t, e), this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(t) {
            t && t.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), Ln(De(n.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(t) {
          this.editors.forEach(function(e) {
            e && e.showValidationErrors(t);
          });
        } }]) && ih(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Xn(o) {
        return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Xn(o);
      }
      function Ha(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function lh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, ch(s.key), s);
        }
      }
      function ch(o) {
        var n = function(r, s) {
          if (Xn(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Xn(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Xn(n) == "symbol" ? n : n + "";
      }
      function uh(o, n, r) {
        return n = An(n), function(s, t) {
          if (t && (Xn(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Va() ? Reflect.construct(n, r || [], An(o).constructor) : n.apply(o, r));
      }
      function Va() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Va = function() {
          return !!o;
        })();
      }
      function _i() {
        return _i = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = An(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, _i.apply(this, arguments);
      }
      function An(o) {
        return An = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, An(o);
      }
      function Ho(o, n) {
        return Ho = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ho(o, n);
      }
      var hh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), uh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ho(t, e);
        }(n, o), r = n, (s = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var t = this;
          this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.container.appendChild(this.title), this.options.enum_titles = this.options.enum_titles || [], this.enforceConstEnabled && this.schema.const ? this.enum = [this.schema.const] : this.enum = this.schema.enum, this.selected = 0, this.select_options = [], this.html_values = [];
          for (var e = 0; e < this.enum.length; e++) this.select_options[e] = this.options.enum_titles[e] || "Value ".concat(e + 1), this.html_values[e] = this.getHTML(this.enum[e]);
          this.switcher = this.theme.getSwitcher(this.select_options), this.container.appendChild(this.switcher), this.display_area = this.theme.getIndentedPanel(), this.container.appendChild(this.display_area), this.options.hide_display && (this.display_area.style.display = "none"), this.switcher.addEventListener("change", function(i) {
            t.selected = t.select_options.indexOf(i.currentTarget.value), t.value = t.enum[t.selected], t.refreshValue(), t.onChange(!0);
          }), this.value = this.enum[0], this.refreshValue(), this.enum.length === 1 && (this.switcher.style.display = "none");
        } }, { key: "refreshValue", value: function() {
          var t = this;
          if (this.enum) {
            this.selected = -1;
            var e = JSON.stringify(this.value);
            this.enum.forEach(function(i, c) {
              if (e === JSON.stringify(i)) return t.selected = c, !1;
            }), this.selected < 0 ? this.setValue(this.enum[0]) : (this.switcher.value = this.select_options[this.selected], this.display_area.innerHTML = this.html_values[this.selected]);
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.switcher.disabled = !1, _i(An(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.switcher.disabled = !0, _i(An(n.prototype), "disable", this).call(this);
        } }, { key: "getHTML", value: function(t) {
          var e, i, c = this;
          if (t === null) return "<em>null</em>";
          if (Xn(t) === "object") {
            var h = "";
            return e = t, i = function(b, k) {
              var E = c.getHTML(k);
              Array.isArray(t) || (E = "<div><em>".concat(b, "</em>: ").concat(E, "</div>")), h += "<li>".concat(E, "</li>");
            }, Array.isArray(e) || typeof e.length == "number" && e.length > 0 && e.length - 1 in e ? Array.from(e).forEach(function(b, k) {
              return i(k, b);
            }) : Object.entries(e).forEach(function(b) {
              var k, E, I = (E = 2, function(X) {
                if (Array.isArray(X)) return X;
              }(k = b) || function(X, dt) {
                var jt = X == null ? null : typeof Symbol < "u" && X[Symbol.iterator] || X["@@iterator"];
                if (jt != null) {
                  var xt, It, Ht, $t, vt = [], kt = !0, Wt = !1;
                  try {
                    if (Ht = (jt = jt.call(X)).next, dt === 0) {
                      if (Object(jt) !== jt) return;
                      kt = !1;
                    } else for (; !(kt = (xt = Ht.call(jt)).done) && (vt.push(xt.value), vt.length !== dt); kt = !0) ;
                  } catch (oe) {
                    Wt = !0, It = oe;
                  } finally {
                    try {
                      if (!kt && jt.return != null && ($t = jt.return(), Object($t) !== $t)) return;
                    } finally {
                      if (Wt) throw It;
                    }
                  }
                  return vt;
                }
              }(k, E) || function(X, dt) {
                if (X) {
                  if (typeof X == "string") return Ha(X, dt);
                  var jt = Object.prototype.toString.call(X).slice(8, -1);
                  return jt === "Object" && X.constructor && (jt = X.constructor.name), jt === "Map" || jt === "Set" ? Array.from(X) : jt === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(jt) ? Ha(X, dt) : void 0;
                }
              }(k, E) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), $ = I[0], W = I[1];
              return i($, W);
            }), h = Array.isArray(t) ? "<ol>".concat(h, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(h, "</ul>");
          }
          return typeof t == "boolean" ? t ? "true" : "false" : typeof t == "string" ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : t;
        } }, { key: "setValue", value: function(t) {
          t = this.applyConstFilter(t), this.value !== t && (this.value = t, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), _i(An(n.prototype), "destroy", this).call(this);
        } }]) && lh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function tr(o) {
        return tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, tr(o);
      }
      function dh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, ph(s.key), s);
        }
      }
      function ph(o) {
        var n = function(r, s) {
          if (tr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (tr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return tr(n) == "symbol" ? n : n + "";
      }
      function fh(o, n, r) {
        return n = Me(n), function(s, t) {
          if (t && (tr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, za() ? Reflect.construct(n, r || [], Me(o).constructor) : n.apply(o, r));
      }
      function za() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (za = function() {
          return !!o;
        })();
      }
      function Rn() {
        return Rn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Me(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Rn.apply(this, arguments);
      }
      function Me(o) {
        return Me = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Me(o);
      }
      function Vo(o, n) {
        return Vo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Vo(o, n);
      }
      var yh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), fh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Vo(t, e);
        }(n, o), r = n, (s = [{ key: "register", value: function() {
          Rn(Me(n.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Rn(Me(n.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(t, e, i) {
          if (t = this.applyConstFilter(t), (!this.template || i) && (t == null ? t = "" : tr(t) === "object" ? t = JSON.stringify(t) : typeof t != "string" && (t = "".concat(t)), t !== this.serialized)) {
            var c = this.sanitize(t);
            if (this.input.value !== c) {
              this.input.value = c;
              var h = i || this.getValue() !== t;
              this.refreshValue(), e ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(h);
            }
          }
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "enable", value: function() {
          Rn(Me(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Rn(Me(n.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Rn(Me(n.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(t) {
          return t;
        } }, { key: "onWatchedFieldChange", value: function() {
          var t;
          this.template && (t = this.getWatchedFieldValues(), this.setValue(this.template(t), !1, !0)), Rn(Me(n.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var t = this.expandCallbacks("template", { template: this.schema.template });
            typeof t.template == "function" ? this.template = t.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && dh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Sr(o) {
        return Sr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Sr(o);
      }
      function mh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, bh(s.key), s);
        }
      }
      function bh(o) {
        var n = function(r, s) {
          if (Sr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Sr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Sr(n) == "symbol" ? n : n + "";
      }
      function vh(o, n, r) {
        return n = Wi(n), function(s, t) {
          if (t && (Sr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, qa() ? Reflect.construct(n, r || [], Wi(o).constructor) : n.apply(o, r));
      }
      function qa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (qa = function() {
          return !!o;
        })();
      }
      function Wi(o) {
        return Wi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Wi(o);
      }
      function zo(o, n) {
        return zo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, zo(o, n);
      }
      var gh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), vh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && zo(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          this.options.compact = !1, this.header = this.label = this.theme.getLabelLike(this.getTitle()), this.description = this.theme.getDescription(this.schema.description || ""), this.control = this.theme.getFormControl(this.label, this.description, null), this.container.appendChild(this.control);
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getNumColumns", value: function() {
          return 12;
        } }, { key: "disable", value: function() {
          return !1;
        } }, { key: "enable", value: function() {
          return !1;
        } }]) && mh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(Ra);
      function Pr(o) {
        return Pr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Pr(o);
      }
      function _h(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, wh(s.key), s);
        }
      }
      function wh(o) {
        var n = function(r, s) {
          if (Pr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Pr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Pr(n) == "symbol" ? n : n + "";
      }
      function jh(o, n, r) {
        return n = Tr(n), function(s, t) {
          if (t && (Pr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ua() ? Reflect.construct(n, r || [], Tr(o).constructor) : n.apply(o, r));
      }
      function Ua() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ua = function() {
          return !!o;
        })();
      }
      function qo() {
        return qo = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Tr(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, qo.apply(this, arguments);
      }
      function Tr(o) {
        return Tr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Tr(o);
      }
      function Uo(o, n) {
        return Uo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Uo(o, n);
      }
      var $a = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), jh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Uo(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          if (qo(Tr(n.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
            var t = this.schema.minimum;
            this.schema.exclusiveMinimum !== void 0 && (t += 1), this.input.setAttribute("min", t);
          }
          if (this.schema.maximum !== void 0) {
            var e = this.schema.maximum;
            this.schema.exclusiveMaximum !== void 0 && (e -= 1), this.input.setAttribute("max", e);
          }
          if (this.schema.step !== void 0) {
            var i = this.schema.step || 1;
            this.input.setAttribute("step", i);
          }
          this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(t) {
            if (t == null) return !1;
            var e = t.match(S), i = parseFloat(t);
            return e !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseFloat(this.value) : this.value : void (this.shouldBeUnset() && (this.input.value = ""));
        } }]) && _h(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Lr(o) {
        return Lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Lr(o);
      }
      function kh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, xh(s.key), s);
        }
      }
      function xh(o) {
        var n = function(r, s) {
          if (Lr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Lr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Lr(n) == "symbol" ? n : n + "";
      }
      function Oh(o, n, r) {
        return n = Ji(n), function(s, t) {
          if (t && (Lr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ga() ? Reflect.construct(n, r || [], Ji(o).constructor) : n.apply(o, r));
      }
      function Ga() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ga = function() {
          return !!o;
        })();
      }
      function Ji(o) {
        return Ji = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ji(o);
      }
      function $o(o, n) {
        return $o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, $o(o, n);
      }
      var Wa = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Oh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && $o(t, e);
        }(n, o), r = n, (s = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(t) {
            if (t == null) return !1;
            var e = t.match(P), i = parseInt(t);
            return e !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && kh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }($a);
      function Ar(o) {
        return Ar = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ar(o);
      }
      function Ch(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Eh(s.key), s);
        }
      }
      function Eh(o) {
        var n = function(r, s) {
          if (Ar(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Ar(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Ar(n) == "symbol" ? n : n + "";
      }
      function Sh(o, n, r) {
        return n = Rr(n), function(s, t) {
          if (t && (Ar(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ja() ? Reflect.construct(n, r || [], Rr(o).constructor) : n.apply(o, r));
      }
      function Ja() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ja = function() {
          return !!o;
        })();
      }
      function Go() {
        return Go = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Rr(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Go.apply(this, arguments);
      }
      function Rr(o) {
        return Rr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Rr(o);
      }
      function Wo(o, n) {
        return Wo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Wo(o, n);
      }
      var Ph = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Sh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Wo(t, e);
        }(n, o), r = n, (s = [{ key: "preBuild", value: function() {
          if (Go(Rr(n.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = v(this.options, this.schema.options || {});
        } }]) && Ch(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Ir(o) {
        return Ir = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ir(o);
      }
      function Th(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Lh(s.key), s);
        }
      }
      function Lh(o) {
        var n = function(r, s) {
          if (Ir(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Ir(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Ir(n) == "symbol" ? n : n + "";
      }
      function Ah(o, n, r) {
        return n = He(n), function(s, t) {
          if (t && (Ir(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ka() ? Reflect.construct(n, r || [], He(o).constructor) : n.apply(o, r));
      }
      function Ka() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ka = function() {
          return !!o;
        })();
      }
      function In() {
        return In = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = He(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, In.apply(this, arguments);
      }
      function He(o) {
        return He = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, He(o);
      }
      function Jo(o, n) {
        return Jo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Jo(o, n);
      }
      var Rh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Ah(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Jo(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t);
          var c = In(He(n.prototype), "setValue", this).call(this, t, e, i);
          c !== void 0 && c.changed && this.jodit_instance && this.jodit_instance.setEditorValue(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", In(He(n.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          window.Jodit ? (t = this.expandCallbacks("jodit", v({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, t), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            e.value = e.jodit_instance.getEditorValue(), e.is_dirty = !0, e.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : In(He(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), In(He(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), In(He(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), In(He(n.prototype), "destroy", this).call(this);
        } }]) && Th(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Ih(o, n, r, s) {
        try {
          switch (o.format) {
            case "ipv4":
              (function(t) {
                var e = t.split(".");
                if (e.length !== 4) throw new Error("error_ipv4");
                e.forEach(function(i) {
                  if (isNaN(+i) || +i < 0 || +i > 255) throw new Error("error_ipv4");
                });
              })(n);
              break;
            case "ipv6":
              (function(t) {
                if (!t.match("^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]).){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$")) throw new Error("error_ipv6");
              })(n);
              break;
            case "hostname":
              (function(t) {
                if (!t.match("(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9].)+[a-zA-Z]{2,63}$)")) throw new Error("error_hostname");
              })(n);
          }
          return [];
        } catch (t) {
          return [{ path: r, property: "format", message: s(t.message) }];
        }
      }
      function Za(o, n) {
        var r = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(o);
          n && (s = s.filter(function(t) {
            return Object.getOwnPropertyDescriptor(o, t).enumerable;
          })), r.push.apply(r, s);
        }
        return r;
      }
      function Bh(o, n, r) {
        return (n = Ya(n)) in o ? Object.defineProperty(o, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : o[n] = r, o;
      }
      function Ve(o) {
        return Ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ve(o);
      }
      function wi(o, n) {
        return function(r) {
          if (Array.isArray(r)) return r;
        }(o) || function(r, s) {
          var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
          if (t != null) {
            var e, i, c, h, b = [], k = !0, E = !1;
            try {
              if (c = (t = t.call(r)).next, s !== 0) for (; !(k = (e = c.call(t)).done) && (b.push(e.value), b.length !== s); k = !0) ;
            } catch (I) {
              E = !0, i = I;
            } finally {
              try {
                if (!k && t.return != null && (h = t.return(), Object(h) !== h)) return;
              } finally {
                if (E) throw i;
              }
            }
            return b;
          }
        }(o, n) || Ko(o, n) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ue(o) {
        return function(n) {
          if (Array.isArray(n)) return Zo(n);
        }(o) || function(n) {
          if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
        }(o) || Ko(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Ko(o, n) {
        if (o) {
          if (typeof o == "string") return Zo(o, n);
          var r = Object.prototype.toString.call(o).slice(8, -1);
          return r === "Object" && o.constructor && (r = o.constructor.name), r === "Map" || r === "Set" ? Array.from(o) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Zo(o, n) : void 0;
        }
      }
      function Zo(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function Nh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Ya(s.key), s);
        }
      }
      function Ya(o) {
        var n = function(r, s) {
          if (Ve(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Ve(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Ve(n) == "symbol" ? n : n + "";
      }
      _(8431), _(7945), _(1278);
      var Qa = function() {
        return o = function r(s, t, e, i) {
          (function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
          })(this, r), this.jsoneditor = s, this.schema = t || this.jsoneditor.schema, this.options = e || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(c, h, b) {
            var k = [];
            if (c.dependentRequired !== void 0) {
              var E = [];
              Object.keys(c.dependentRequired).forEach(function(I) {
                if (h[I] !== void 0) {
                  var $ = c.dependentRequired[I];
                  E = $.filter(function(W) {
                    return !x(h, W);
                  });
                }
              }), E.length > 0 && k.push({ message: "Must have the required properties: " + E.join(", "), path: b });
            }
            return k;
          }, dependentSchemas: function(c, h, b) {
            var k = this, E = [];
            return Object.keys(c.dependentSchemas).forEach(function(I) {
              if (h[I] !== void 0) {
                var $ = c.dependentSchemas[I], W = k._validateSchema($, h, b);
                E = [].concat(ue(E), ue(W));
              }
            }), E;
          }, contains: function(c, h, b) {
            var k = this, E = [], I = 0;
            h.forEach(function(W) {
              k._validateSchema(c.contains, W, b).length === 0 && I++;
            });
            var $ = I === 0;
            return c.minContains !== void 0 ? I < c.minContains && E.push({ message: this.translate("error_minContains", [I, c.minContains], c), path: b }) : $ && E.push({ message: this.translate("error_contains", null, c), path: b }), c.maxContains !== void 0 && I > c.maxContains && E.push({ message: this.translate("error_maxContains", [I, c.maxContains], c), path: b }), E;
          }, if: function(c, h, b) {
            if (c.then === void 0 && c.else === void 0) return [];
            var k = this._validateSchema(c.if, h, b), E = [], I = [];
            return c.then !== void 0 && (E = this._validateSchema(c.then, h, b)), c.else !== void 0 && (I = this._validateSchema(c.else, h, b)), c.if === !0 ? E : c.if === !1 ? I : k.length === 0 ? E : k.length > 0 ? I : [];
          }, const: function(c, h, b) {
            return JSON.stringify(c.const) === JSON.stringify(h) ? [] : [{ path: b, property: "const", message: this.translate("error_const", null, c) }];
          }, enum: function(c, h, b) {
            var k = JSON.stringify(h);
            return c.enum.some(function(E) {
              return k === JSON.stringify(E);
            }) ? [] : [{ path: b, property: "enum", message: this.translate("error_enum", null, c) }];
          }, extends: function(c, h, b) {
            var k = this;
            return c.extends.reduce(function(E, I) {
              return E.push.apply(E, ue(k._validateSchema(I, h, b))), E;
            }, []);
          }, allOf: function(c, h, b) {
            var k = this;
            return c.allOf.reduce(function(E, I) {
              return E.push.apply(E, ue(k._validateSchema(I, h, b))), E;
            }, []);
          }, anyOf: function(c, h, b) {
            var k = this;
            return c.anyOf.some(function(E) {
              return !k._validateSchema(E, h, b).length;
            }) ? [] : [{ path: b, property: "anyOf", message: this.translate("error_anyOf", null, c) }];
          }, oneOf: function(c, h, b) {
            var k = this, E = 0, I = [];
            c.oneOf.forEach(function(W, X) {
              var dt = k._validateSchema(W, h, b);
              dt.length || E++, dt.forEach(function(jt) {
                jt.path = "".concat(b, ".oneOf[").concat(X, "]").concat(jt.path.substr(b.length));
              }), I.push.apply(I, ue(dt));
            });
            var $ = [];
            return E !== 1 && ($.push({ path: b, property: "oneOf", message: this.translate("error_oneOf", [E], c) }), $.push.apply($, I)), $;
          }, not: function(c, h, b) {
            return this._validateSchema(c.not, h, b).length ? [] : [{ path: b, property: "not", message: this.translate("error_not", null, c) }];
          }, type: function(c, h, b) {
            var k = this;
            if (Array.isArray(c.type)) {
              if (!c.type.some(function(E) {
                return k._checkType(E, h);
              })) return [{ path: b, property: "type", message: this.translate("error_type_union", null, c) }];
            } else if (["date", "time", "datetime-local"].includes(c.format) && c.type === "integer") {
              if (!this._checkType("string", "".concat(h))) return [{ path: b, property: "type", message: this.translate("error_type", [c.format], c) }];
            } else if (!this._checkType(c.type, h)) return [{ path: b, property: "type", message: this.translate("error_type", [c.type], c) }];
            return [];
          }, disallow: function(c, h, b) {
            var k = this;
            if (Array.isArray(c.disallow)) {
              if (c.disallow.some(function(E) {
                return k._checkType(E, h);
              })) return [{ path: b, property: "disallow", message: this.translate("error_disallow_union", null, c) }];
            } else if (this._checkType(c.disallow, h)) return [{ path: b, property: "disallow", message: this.translate("error_disallow", [c.disallow], c) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(c, h, b) {
            return this._validateNumberSubSchemaMultipleDivisible(c, h, b);
          }, divisibleBy: function(c, h, b) {
            return this._validateNumberSubSchemaMultipleDivisible(c, h, b);
          }, maximum: function(c, h, b) {
            var k = c.exclusiveMaximum ? h < c.maximum : h <= c.maximum;
            return window.math ? k = window.math[c.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(h), window.math.bignumber(c.maximum)) : window.Decimal && (k = new window.Decimal(h)[c.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(c.maximum))), k ? [] : [{ path: b, property: "maximum", message: this.translate(c.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [c.maximum], c) }];
          }, minimum: function(c, h, b) {
            var k = c.exclusiveMinimum ? h > c.minimum : h >= c.minimum;
            return window.math ? k = window.math[c.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(h), window.math.bignumber(c.minimum)) : window.Decimal && (k = new window.Decimal(h)[c.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(c.minimum))), k ? [] : [{ path: b, property: "minimum", message: this.translate(c.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [c.minimum], c) }];
          } }, this._validateStringSubSchema = { maxLength: function(c, h, b) {
            var k = [];
            return "".concat(h).length > c.maxLength && k.push({ path: b, property: "maxLength", message: this.translate("error_maxLength", [c.maxLength], c) }), k;
          }, minLength: function(c, h, b) {
            return "".concat(h).length < c.minLength ? [{ path: b, property: "minLength", message: this.translate(c.minLength === 1 ? "error_notempty" : "error_minLength", [c.minLength], c) }] : [];
          }, pattern: function(c, h, b) {
            return new RegExp(c.pattern).test(h) ? [] : [{ path: b, property: "pattern", message: c.options && c.options.patternmessage ? c.options.patternmessage : this.translate("error_pattern", [c.pattern], c) }];
          } }, this._validateArraySubSchema = { items: function(c, h, b) {
            var k = this, E = [];
            if (Array.isArray(c.items)) for (var I = 0; I < h.length; I++) if (c.items[I]) E.push.apply(E, ue(this._validateSchema(c.items[I], h[I], "".concat(b, ".").concat(I))));
            else {
              if (c.additionalItems === !0) break;
              if (!c.additionalItems) {
                if (c.additionalItems === !1) {
                  E.push({ path: b, property: "additionalItems", message: this.translate("error_additionalItems", null, c) });
                  break;
                }
                break;
              }
              E.push.apply(E, ue(this._validateSchema(c.additionalItems, h[I], "".concat(b, ".").concat(I))));
            }
            else h.forEach(function($, W) {
              E.push.apply(E, ue(k._validateSchema(c.items, $, "".concat(b, ".").concat(W))));
            });
            return E;
          }, maxItems: function(c, h, b) {
            return h.length > c.maxItems ? [{ path: b, property: "maxItems", message: this.translate("error_maxItems", [c.maxItems], c) }] : [];
          }, minItems: function(c, h, b) {
            return h.length < c.minItems ? [{ path: b, property: "minItems", message: this.translate("error_minItems", [c.minItems], c) }] : [];
          }, uniqueItems: function(c, h, b) {
            for (var k = {}, E = 0; E < h.length; E++) {
              var I = JSON.stringify(h[E]);
              if (k[I]) return [{ path: b, property: "uniqueItems", message: this.translate("error_uniqueItems", null, c) }];
              k[I] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(c, h, b) {
            return Object.keys(h).length > c.maxProperties ? [{ path: b, property: "maxProperties", message: this.translate("error_maxProperties", [c.maxProperties], c) }] : [];
          }, minProperties: function(c, h, b) {
            return Object.keys(h).length < c.minProperties ? [{ path: b, property: "minProperties", message: this.translate("error_minProperties", [c.minProperties], c) }] : [];
          }, required: function(c, h, b) {
            var k = this, E = [];
            return Array.isArray(c.required) && c.required.forEach(function(I) {
              if (h[I] === void 0) {
                var $ = k.jsoneditor.getEditor("".concat(b, ".").concat(I));
                $ && $.dependenciesFulfilled === !1 || $ && ["button", "info"].includes($.schema.format || $.schema.type) || E.push({ path: b, property: "required", message: k.translate("error_required", [c && c.properties && c.properties[I] && c.properties[I].title ? c.properties[I].title : I], c) });
              }
            }), E;
          }, properties: function(c, h, b, k) {
            var E = this, I = [];
            return Object.entries(c.properties).forEach(function($) {
              var W = wi($, 2), X = W[0], dt = W[1];
              k[X] = !0, I.push.apply(I, ue(E._validateSchema(dt, h[X], "".concat(b, ".").concat(X))));
            }), I;
          }, patternProperties: function(c, h, b, k) {
            var E = this, I = [];
            return Object.entries(c.patternProperties).forEach(function($) {
              var W = wi($, 2), X = W[0], dt = W[1], jt = new RegExp(X);
              Object.entries(h).forEach(function(xt) {
                var It = wi(xt, 2), Ht = It[0], $t = It[1];
                jt.test(Ht) && (k[Ht] = !0, I.push.apply(I, ue(E._validateSchema(dt, $t, "".concat(b, ".").concat(Ht)))));
              });
            }), I;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(c, h, b, k) {
            for (var E, I = this, $ = [], W = Object.keys(h), X = null, dt = function() {
              var xt = "";
              return X = W[jt], typeof c.propertyNames == "boolean" ? c.propertyNames === !0 ? 0 : ($.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_false", [X], c) }), 1) : Object.entries(c.propertyNames).every(function(It) {
                var Ht = wi(It, 2), $t = Ht[0], vt = Ht[1], kt = !1;
                switch ($t) {
                  case "maxLength":
                    if (typeof vt != "number") {
                      xt = "error_property_names_maxlength";
                      break;
                    }
                    if (X.length > vt) {
                      xt = "error_property_names_exceeds_maxlength";
                      break;
                    }
                    return !0;
                  case "const":
                    if (vt !== X) {
                      xt = "error_property_names_const_mismatch";
                      break;
                    }
                    return !0;
                  case "enum":
                    if (!Array.isArray(vt)) {
                      xt = "error_property_names_enum";
                      break;
                    }
                    if (vt.forEach(function(Wt) {
                      Wt === X && (kt = !0);
                    }), !kt) {
                      xt = "error_property_names_enum_mismatch";
                      break;
                    }
                    return !0;
                  case "pattern":
                    if (typeof vt != "string") {
                      xt = "error_property_names_pattern";
                      break;
                    }
                    if (!new RegExp(vt).test(X)) {
                      xt = "error_property_names_pattern_mismatch";
                      break;
                    }
                    return !0;
                  default:
                    return $.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_unsupported", [$t], c) }), !1;
                }
                return $.push({ path: b, property: "propertyNames", message: I.translate(xt, [X], c) }), !1;
              }) ? void 0 : 1;
            }, jt = 0; jt < W.length && ((E = dt()) === 0 || E !== 1); jt++) ;
            return $;
          }, additionalProperties: function(c, h, b, k) {
            for (var E = [], I = Object.keys(h), $ = 0; $ < I.length; $++) {
              var W = I[$];
              if (!k[W]) {
                if (!c.additionalProperties) {
                  E.push({ path: b, property: "additionalProperties", message: this.translate("error_additional_properties", [W], c) });
                  break;
                }
                if (c.additionalProperties === !0) break;
                E.push.apply(E, ue(this._validateSchema(c.additionalProperties, h[W], "".concat(b, ".").concat(W))));
              }
            }
            return E;
          }, dependencies: function(c, h, b) {
            var k = this, E = [];
            return Object.entries(c.dependencies).forEach(function(I) {
              var $ = wi(I, 2), W = $[0], X = $[1];
              h[W] !== void 0 && (Array.isArray(X) ? X.forEach(function(dt) {
                h[dt] === void 0 && E.push({ path: b, property: "dependencies", message: k.translate("error_dependency", [dt], c) });
              }) : E.push.apply(E, ue(k._validateSchema(X, h, b))));
            }), E;
          } };
        }, n = [{ key: "fitTest", value: function(r, s) {
          var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, e = { match: 0, extra: 0 };
          if (Ve(r) === "object" && r !== null) {
            var i = this._getSchema(s);
            if (i.anyOf) {
              var c, h = function(X) {
                for (var dt = 1; dt < arguments.length; dt++) {
                  var jt = arguments[dt] != null ? arguments[dt] : {};
                  dt % 2 ? Za(Object(jt), !0).forEach(function(xt) {
                    Bh(X, xt, jt[xt]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(X, Object.getOwnPropertyDescriptors(jt)) : Za(Object(jt)).forEach(function(xt) {
                    Object.defineProperty(X, xt, Object.getOwnPropertyDescriptor(jt, xt));
                  });
                }
                return X;
              }({}, e), b = function(X, dt) {
                var jt = typeof Symbol < "u" && X[Symbol.iterator] || X["@@iterator"];
                if (!jt) {
                  if (Array.isArray(X) || (jt = Ko(X))) {
                    jt && (X = jt);
                    var xt = 0, It = function() {
                    };
                    return { s: It, n: function() {
                      return xt >= X.length ? { done: !0 } : { done: !1, value: X[xt++] };
                    }, e: function(kt) {
                      throw kt;
                    }, f: It };
                  }
                  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
                }
                var Ht, $t = !0, vt = !1;
                return { s: function() {
                  jt = jt.call(X);
                }, n: function() {
                  var kt = jt.next();
                  return $t = kt.done, kt;
                }, e: function(kt) {
                  vt = !0, Ht = kt;
                }, f: function() {
                  try {
                    $t || jt.return == null || jt.return();
                  } finally {
                    if (vt) throw Ht;
                  }
                } };
              }(i.anyOf);
              try {
                for (b.s(); !(c = b.n()).done; ) {
                  var k = c.value, E = this.fitTest(r, k, t);
                  (E.match > h.match || E.match === h.match && E.extra < h.extra) && (h = E);
                }
              } catch (X) {
                b.e(X);
              } finally {
                b.f();
              }
              return h;
            }
            var I = this._getSchema(s).properties;
            for (var $ in I) if (x(I, $)) {
              if (Ve(r[$]) === "object" && Ve(I[$]) === "object" && Ve(I[$].properties) === "object") {
                var W = this.fitTest(r[$], I[$], t / 100);
                e.match += W.match, e.extra += W.extra;
              }
              r[$] !== void 0 && (e.match += t);
            } else e.extra += t;
          }
          return e;
        } }, { key: "_getSchema", value: function(r) {
          return r === void 0 ? v({}, this.jsoneditor.expandRefs(this.schema)) : r;
        } }, { key: "validate", value: function(r) {
          return this._validateSchema(this.schema, r);
        } }, { key: "_validateSchema", value: function(r, s, t) {
          var e = this, i = [];
          return t = t || this.jsoneditor.root.formname, r = v({}, this.jsoneditor.expandRefs(r)), s === void 0 ? this._validateV3Required(r, s, t) : (Object.keys(r).forEach(function(c) {
            e._validateSubSchema[c] && i.push.apply(i, ue(e._validateSubSchema[c].call(e, r, s, t)));
          }), i.push.apply(i, ue(this._validateByValueType(r, s, t))), r.links && r.links.forEach(function(c, h) {
            c.rel && c.rel.toLowerCase() === "describedby" && (r = e._expandSchemaLink(r, h), i.push.apply(i, ue(e._validateSchema(r, s, t, e.translate))));
          }), ["date", "time", "datetime-local"].includes(r.format) && i.push.apply(i, ue(this._validateDateTimeSubSchema(r, s, t))), ["uuid"].includes(r.format) && i.push.apply(i, ue(this._validateUUIDSchema(r, s, t))), i.push.apply(i, ue(this._validateCustomValidator(r, s, t))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(r, s) {
          var t = r.links[s].href, e = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(t, this.jsoneditor.template), c = document.location.origin + document.location.pathname + i(e);
          return r.links = r.links.slice(0, s).concat(r.links.slice(s + 1)), v({}, r, this.jsoneditor.refs[c]);
        } }, { key: "_validateV3Required", value: function(r, s, t) {
          return (r.required !== void 0 && r.required === !0 || r.required === void 0 && this.jsoneditor.options.required_by_default === !0) && r.type !== "info" ? [{ path: t, property: "required", message: this.translate("error_notset", null, r) }] : [];
        } }, { key: "_validateByValueType", value: function(r, s, t) {
          var e = this, i = [];
          if (s === null) return i;
          if (typeof s == "number") Object.keys(r).forEach(function(h) {
            e._validateNumberSubSchema[h] && i.push.apply(i, ue(e._validateNumberSubSchema[h].call(e, r, s, t)));
          });
          else if (typeof s == "string") Object.keys(r).forEach(function(h) {
            e._validateStringSubSchema[h] && i.push.apply(i, ue(e._validateStringSubSchema[h].call(e, r, s, t)));
          });
          else if (Array.isArray(s)) Object.keys(r).forEach(function(h) {
            e._validateArraySubSchema[h] && i.push.apply(i, ue(e._validateArraySubSchema[h].call(e, r, s, t)));
          });
          else if (Ve(s) === "object") {
            var c = {};
            Object.keys(r).forEach(function(h) {
              e._validateObjectSubSchema[h] && i.push.apply(i, ue(e._validateObjectSubSchema[h].call(e, r, s, t, c)));
            }), r.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || r.oneOf || r.anyOf || r.allOf || (r.additionalProperties = !1), Object.keys(r).forEach(function(h) {
              e._validateObjectSubSchema2[h] !== void 0 && i.push.apply(i, ue(e._validateObjectSubSchema2[h].call(e, r, s, t, c)));
            });
          }
          return i;
        } }, { key: "_validateUUIDSchema", value: function(r, s, t) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s) ? [] : [{ path: t, property: "format", message: this.translate("error_pattern", ["^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"], r) }];
        } }, { key: "_validateNumberSubSchemaMultipleDivisible", value: function(r, s, t) {
          var e = r.multipleOf || r.divisibleBy, i = s / e === Math.floor(s / e);
          return window.math ? i = window.math.mod(window.math.bignumber(s), window.math.bignumber(e)).equals(0) : window.Decimal && (i = new window.Decimal(s).mod(new window.Decimal(e)).equals(0)), i ? [] : [{ path: t, property: r.multipleOf ? "multipleOf" : "divisibleBy", message: this.translate("error_multipleOf", [e], r) }];
        } }, { key: "_validateDateTimeSubSchema", value: function(r, s, t) {
          var e = this, i = this.jsoneditor.getEditor(t), c = i && i.flatpickr ? i.flatpickr.config.dateFormat : { date: '"YYYY-MM-DD"', time: '"HH:MM"', "datetime-local": '"YYYY-MM-DD HH:MM"' }[r.format];
          if (r.type === "integer") return function(h, b, k) {
            return 1 * b < 1 ? [{ path: k, property: "format", message: e.translate("error_invalid_epoch", null, h) }] : b !== Math.abs(parseInt(b)) ? [{ path: k, property: "format", message: e.translate("error_".concat(h.format.replace(/-/g, "_")), [c], h) }] : [];
          }(r, s, t);
          if (i && i.flatpickr) {
            if (i) return function(h, b, k, E) {
              if (b !== "") {
                var I;
                if (E.flatpickr.config.mode !== "single") {
                  var $ = E.flatpickr.config.mode === "range" ? E.flatpickr.l10n.rangeSeparator : ", ";
                  I = E.flatpickr.selectedDates.map(function(X) {
                    return E.flatpickr.formatDate(X, E.flatpickr.config.dateFormat);
                  }).join($);
                }
                try {
                  if (I) {
                    if (I !== b) throw new Error("".concat(E.flatpickr.config.mode, " mismatch"));
                  } else if (E.flatpickr.formatDate(E.flatpickr.parseDate(b, E.flatpickr.config.dateFormat), E.flatpickr.config.dateFormat) !== b) throw new Error("mismatch");
                } catch {
                  var W = E.flatpickr.config.errorDateFormat !== void 0 ? E.flatpickr.config.errorDateFormat : E.flatpickr.config.dateFormat;
                  return [{ path: k, property: "format", message: e.translate("error_".concat(E.format.replace(/-/g, "_")), [W], h) }];
                }
              }
              return [];
            }(r, s, t, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[r.format].test(s)) return [{ path: t, property: "format", message: this.translate("error_".concat(r.format.replace(/-/g, "_")), [c], r) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(r, s, t) {
          var e = this, i = [];
          i.push.apply(i, ue(Ih.call(this, r, s, t, this.translate)));
          var c = function(h) {
            i.push.apply(i, ue(h.call(e, r, s, t)));
          };
          return this.defaults.custom_validators.forEach(c), this.options.custom_validators && this.options.custom_validators.forEach(c), i;
        } }, { key: "_removeDuplicateErrors", value: function(r) {
          return r.reduce(function(s, t) {
            var e = !0;
            return s || (s = []), s.forEach(function(i) {
              i.message === t.message && i.path === t.path && i.property === t.property && (i.errorcount++, e = !1);
            }), e && (t.errorcount = 1, s.push(t)), s;
          }, []);
        } }, { key: "_checkType", value: function(r, s) {
          var t = { string: function(e) {
            return typeof e == "string";
          }, number: function(e) {
            return typeof e == "number";
          }, integer: function(e) {
            return typeof e == "number" && e === Math.floor(e);
          }, boolean: function(e) {
            return typeof e == "boolean";
          }, array: function(e) {
            return Array.isArray(e);
          }, object: function(e) {
            return e !== null && !Array.isArray(e) && Ve(e) === "object";
          }, null: function(e) {
            return e === null;
          } };
          return typeof r == "string" ? !t[r] || t[r](s) : !this._validateSchema(r, s).length;
        } }], n && Nh(o.prototype, n), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, n;
      }();
      function er(o) {
        return er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, er(o);
      }
      function Fh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Dh(s.key), s);
        }
      }
      function Dh(o) {
        var n = function(r, s) {
          if (er(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (er(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return er(n) == "symbol" ? n : n + "";
      }
      function Mh(o, n, r) {
        return n = ze(n), function(s, t) {
          if (t && (er(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Xa() ? Reflect.construct(n, r || [], ze(o).constructor) : n.apply(o, r));
      }
      function Xa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Xa = function() {
          return !!o;
        })();
      }
      function Bn() {
        return Bn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = ze(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Bn.apply(this, arguments);
      }
      function ze(o) {
        return ze = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, ze(o);
      }
      function Yo(o, n) {
        return Yo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Yo(o, n);
      }
      var Hh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Mh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Yo(t, e);
        }(n, o), r = n, (s = [{ key: "register", value: function() {
          if (this.editors) {
            for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
            this.editors[this.type] && this.editors[this.type].register();
          }
          Bn(ze(n.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Bn(ze(n.prototype), "unregister", this).call(this), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            if (this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].enable();
            this.switcher.disabled = !1, Bn(ze(n.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(t) {
          if (t && (this.always_disabled = !0), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable(t);
          this.switcher.disabled = !0, Bn(ze(n.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function(t) {
          var e = this;
          this.lastType = this.type, this.editors[t] || this.buildChildEditor(t);
          var i = this.getValue();
          this.type = t, this.register(), this.editors.forEach(function(c, h) {
            var b, k;
            c && (e.type === h ? (e.keep_only_existing_values && (b = c.getValue(), k = i, Object.keys(k).forEach(function(E) {
              E in b && (b[E] = k[E]);
            }), i = b), (e.keep_values || e.if) && c.setValue(i, !0), c.container.style.display = "") : c.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[t].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(t) {
          var e, i, c = this, h = this.types[t], b = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(b), typeof h == "string" ? (i = v({}, this.schema)).type = h : (i = v({}, this.schema, h), i = this.jsoneditor.expandRefs(i), h && h.required && Array.isArray(h.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(h.required))), (e = i) !== null && e !== void 0 && (e = e.options) !== null && e !== void 0 && e.dependencies && delete i.options.dependencies;
          var k = this.jsoneditor.getEditorClass(i);
          this.editors[t] = this.jsoneditor.createEditor(k, { jsoneditor: this.jsoneditor, schema: i, container: b, path: this.path, parent: this, required: !0 }), this.editors[t].preBuild(), this.editors[t].build(), this.editors[t].postBuild(), this.editors[t].header && this.theme.visuallyHidden(this.editors[t].header), this.editors[t].option = this.switcher_options[t], b.addEventListener("change_header_text", function() {
            c.refreshHeaderText();
          }), t !== this.type && (b.style.display = "none");
        } }, { key: "preBuild", value: function() {
          if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, this.jsoneditor.options.keep_oneof_values !== void 0 && (this.keep_values = this.jsoneditor.options.keep_oneof_values), this.options.keep_oneof_values !== void 0 && (this.keep_values = this.options.keep_oneof_values), this.keep_only_existing_values = !1, this.jsoneditor.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.jsoneditor.options.keep_only_existing_values), this.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.options.keep_only_existing_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
          else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
          else if (this.schema.if) this.if = !0, this.ifSchema = JSON.parse(JSON.stringify(this.schema.if)), this.thenSchema = { title: "then" }, this.elseSchema = { title: "else" }, this.types = [], this.schema.then && L(this.thenSchema, this.schema, this.schema.then), this.schema.else && L(this.elseSchema, this.schema, this.schema.else), this.types.push(this.thenSchema), this.types.push(this.elseSchema), this.types.forEach(function(i) {
            delete i.if, delete i.then, delete i.else;
          }), delete this.schema.if;
          else {
            if (this.schema.type && this.schema.type !== "any") Array.isArray(this.schema.type) ? this.types = this.schema.type : this.types = [this.schema.type];
            else if (this.types = ["string", "number", "integer", "boolean", "object", "array", "null"], this.schema.disallow) {
              var t = this.schema.disallow;
              er(t) === "object" && Array.isArray(t) || (t = [t]);
              var e = [];
              this.types.forEach(function(i) {
                t.includes(i) || e.push(i);
              }), this.types = e;
            }
            delete this.schema.type;
          }
          this.display_text = this.getDisplayText(this.types);
        } }, { key: "build", value: function() {
          var t = this, e = this.container;
          this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired()), this.switcher = this.theme.getSwitcher(this.display_text), this.switcher.setAttribute("id", this.formname + "switcher"), this.switcherLabel = this.theme.getHiddenLabel(this.formname + " switcher"), this.switcherLabel.setAttribute("for", this.formname + "switcher"), this.if || (this.container.appendChild(this.header), e.appendChild(this.switcherLabel), e.appendChild(this.switcher)), this.switcher.addEventListener("change", function(c) {
            c.preventDefault(), c.stopPropagation(), t.switchEditor(t.display_text.indexOf(c.currentTarget.value)), t.onChange(!0);
          }), this.editor_holder = document.createElement("div"), e.appendChild(this.editor_holder);
          var i = {};
          this.jsoneditor.options.custom_validators && (i.custom_validators = this.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), this.types.forEach(function(c, h) {
            var b;
            t.editors[h] = !1, typeof c == "string" ? (b = v({}, t.schema)).type = c : (b = v({}, t.schema, c), c.required && Array.isArray(c.required) && t.schema.required && Array.isArray(t.schema.required) && (b.required = t.schema.required.concat(c.required))), t.validators[h] = new Qa(t.jsoneditor, b, i, t.defaults);
          }), this.jsoneditor.on("change", function() {
            t.switchIf();
          }), this.switchEditor(0);
        } }, { key: "onChildEditorChange", value: function(t, e) {
          this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), Bn(ze(n.prototype), "onChildEditorChange", this).call(this, t, e);
        } }, { key: "refreshHeaderText", value: function() {
          var t = this.getDisplayText(this.types);
          Array.from(this.switcher_options).forEach(function(e, i) {
            e.textContent = t[i];
          });
        } }, { key: "refreshValue", value: function() {
          this.editors[this.type] && (this.value = this.editors[this.type].getValue());
        } }, { key: "switchIf", value: function() {
          if (this.ifSchema && this.value) {
            var t = this.getIfType(this.value);
            this.lastType !== t && (this.switchEditor(t), this.editors[this.type].setValue(this.value, !0)), this.switcher.value = this.display_text[this.type];
          }
        } }, { key: "getIfType", value: function(t) {
          return this.jsoneditor.validator._validateSchema(this.ifSchema, t).length === 0 ? 0 : 1;
        } }, { key: "setValue", value: function(t, e) {
          var i = this;
          t = this.applyConstFilter(t);
          var c = this.type, h = { match: 0, extra: 0, i: this.type }, b = { match: 0, i: null };
          this.validators.forEach(function(I, $) {
            var W = null;
            i.anyOf !== void 0 && i.anyOf && (W = I.fitTest(t), (h.match < W.match || h.match === W.match && h.extra > W.extra) && ((h = W).i = $)), I.validate(t).length || b.i !== null ? h = b : (b.i = $, W !== null && (b.match = W.match));
          });
          var k = b.i;
          this.anyOf !== void 0 && this.anyOf && b.match < h.match && (k = h.i), this.if && (k = this.getIfType(t)), k === null && (k = this.type), this.type = k, this.switcher.value = this.display_text[k];
          var E = this.type !== c;
          E && (this.switchEditor(this.type), this.editors[this.type].setValue(t, e)), t !== void 0 && this.editors[this.type].setValue(t, e), this.refreshValue(), this.onChange(E);
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(t) {
            t && t.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Bn(ze(n.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this;
          if (this.oneOf || this.anyOf) {
            var i = this.oneOf ? "oneOf" : "anyOf";
            this.editors.forEach(function(c, h) {
              if (c) {
                var b = "".concat(e.path, ".").concat(i, "[").concat(h, "]");
                c.showValidationErrors(t.reduce(function(k, E) {
                  if (E.path.startsWith(b) || E.path === b.substr(0, E.path.length)) {
                    var I = v({}, E);
                    E.path.startsWith(b) && (I.path = e.path + I.path.substr(b.length)), k.push(I);
                  }
                  return k;
                }, []));
              }
            });
          } else this.editors.forEach(function(c) {
            c && c.showValidationErrors(t);
          });
        } }, { key: "addLinks", value: function() {
        } }]) && Fh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Br(o) {
        return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Br(o);
      }
      function Vh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, zh(s.key), s);
        }
      }
      function zh(o) {
        var n = function(r, s) {
          if (Br(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Br(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Br(n) == "symbol" ? n : n + "";
      }
      function qh(o, n, r) {
        return n = Ki(n), function(s, t) {
          if (t && (Br(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, tl() ? Reflect.construct(n, r || [], Ki(o).constructor) : n.apply(o, r));
      }
      function tl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (tl = function() {
          return !!o;
        })();
      }
      function Ki(o) {
        return Ki = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ki(o);
      }
      function Qo(o, n) {
        return Qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Qo(o, n);
      }
      var Uh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), qh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Qo(t, e);
        }(n, o), r = n, (s = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && Vh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function el(o, n) {
        var r = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(o);
          n && (s = s.filter(function(t) {
            return Object.getOwnPropertyDescriptor(o, t).enumerable;
          })), r.push.apply(r, s);
        }
        return r;
      }
      function Nr(o) {
        for (var n = 1; n < arguments.length; n++) {
          var r = arguments[n] != null ? arguments[n] : {};
          n % 2 ? el(Object(r), !0).forEach(function(s) {
            Zi(o, s, r[s]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r)) : el(Object(r)).forEach(function(s) {
            Object.defineProperty(o, s, Object.getOwnPropertyDescriptor(r, s));
          });
        }
        return o;
      }
      function Zi(o, n, r) {
        return (n = rl(n)) in o ? Object.defineProperty(o, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : o[n] = r, o;
      }
      function Fr(o, n) {
        return function(r) {
          if (Array.isArray(r)) return r;
        }(o) || function(r, s) {
          var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
          if (t != null) {
            var e, i, c, h, b = [], k = !0, E = !1;
            try {
              if (c = (t = t.call(r)).next, s !== 0) for (; !(k = (e = c.call(t)).done) && (b.push(e.value), b.length !== s); k = !0) ;
            } catch (I) {
              E = !0, i = I;
            } finally {
              try {
                if (!k && t.return != null && (h = t.return(), Object(h) !== h)) return;
              } finally {
                if (E) throw i;
              }
            }
            return b;
          }
        }(o, n) || function(r, s) {
          if (r) {
            if (typeof r == "string") return nl(r, s);
            var t = Object.prototype.toString.call(r).slice(8, -1);
            return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? nl(r, s) : void 0;
          }
        }(o, n) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function nl(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function pn(o) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, pn(o);
      }
      function $h(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, rl(s.key), s);
        }
      }
      function rl(o) {
        var n = function(r, s) {
          if (pn(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (pn(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return pn(n) == "symbol" ? n : n + "";
      }
      function Gh(o, n, r) {
        return n = Pe(n), function(s, t) {
          if (t && (pn(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, il() ? Reflect.construct(n, r, Pe(o).constructor) : n.apply(o, r));
      }
      function il() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (il = function() {
          return !!o;
        })();
      }
      function Ke() {
        return Ke = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Pe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Ke.apply(this, arguments);
      }
      function Pe(o) {
        return Pe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Pe(o);
      }
      function Xo(o, n) {
        return Xo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Xo(o, n);
      }
      var ol = function(o) {
        function n(t, e, i) {
          var c;
          return function(h, b) {
            if (!(h instanceof b)) throw new TypeError("Cannot call a class as a function");
          }(this, n), (c = Gh(this, n, [t, e])).currentDepth = i, c;
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Xo(t, e);
        }(n, o), r = n, (s = [{ key: "getChildEditors", value: function() {
          return this.editors;
        } }, { key: "register", value: function() {
          Ke(Pe(n.prototype), "register", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            return t.register();
          });
        } }, { key: "unregister", value: function() {
          Ke(Pe(n.prototype), "unregister", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            return t.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.maxwidth), 3);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.editjson_control && (this.editjson_control.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), Ke(Pe(n.prototype), "enable", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            (t.isActive() || t.isUiOnly) && t.enable(), t.optInCheckbox && (t.optInCheckbox.disabled = !1);
          }));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.editjson_control && (this.editjson_control.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), Ke(Pe(n.prototype), "disable", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            (e.isActive() || e.isUiOnly) && e.disable(t), e.optInCheckbox.disabled = !0;
          });
        } }, { key: "layoutEditors", value: function() {
          var t, e, i = this;
          if (this.row_container) {
            var c;
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function($t, vt) {
              var kt = i.editors[$t].schema.propertyOrder, Wt = i.editors[vt].schema.propertyOrder;
              return typeof kt != "number" && (kt = 1e3), typeof Wt != "number" && (Wt = 1e3), kt - Wt;
            });
            var h, b = this.format === "categories", k = [], E = null, I = null;
            if (this.format === "grid-strict") {
              var $ = 0;
              if (h = [], this.property_order.forEach(function($t) {
                var vt = i.editors[$t];
                if (!vt.property_removed) {
                  var kt = vt.options.hidden ? 0 : vt.options.grid_columns || vt.getNumColumns(), Wt = vt.options.hidden ? 0 : vt.options.grid_offset || 0, oe = !vt.options.hidden && (vt.options.grid_break || !1), we = { key: $t, width: kt, offset: Wt, height: vt.options.hidden ? 0 : vt.container.offsetHeight };
                  h.push(we), k[$] = h, oe && ($++, h = []);
                }
              }), this.layout === JSON.stringify(k)) return !1;
              for (this.layout = JSON.stringify(k), c = document.createElement("div"), t = 0; t < k.length; t++) for (h = this.theme.getGridRow(), c.appendChild(h), e = 0; e < k[t].length; e++) E = k[t][e].key, (I = this.editors[E]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, k[t][e].width, k[t][e].offset), h.appendChild(I.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function($t) {
                var vt = i.editors[$t];
                if (!vt.property_removed) {
                  for (var kt = !1, Wt = vt.options.hidden ? 0 : vt.options.grid_columns || vt.getNumColumns(), oe = vt.options.hidden ? 0 : vt.container.offsetHeight, we = 0; we < k.length; we++) k[we].width + Wt <= 12 && (!oe || 0.5 * k[we].minh < oe && 2 * k[we].maxh > oe) && (kt = we);
                  kt === !1 && (k.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), kt = k.length - 1), k[kt].editors.push({ key: $t, width: Wt, height: oe }), k[kt].width += Wt, k[kt].minh = Math.min(k[kt].minh, oe), k[kt].maxh = Math.max(k[kt].maxh, oe);
                }
              }), t = 0; t < k.length; t++) if (k[t].width < 12) {
                var W = !1, X = 0;
                for (e = 0; e < k[t].editors.length; e++) (W === !1 || k[t].editors[e].width > k[t].editors[W].width) && (W = e), k[t].editors[e].width *= 12 / k[t].width, k[t].editors[e].width = Math.floor(k[t].editors[e].width), X += k[t].editors[e].width;
                X < 12 && (k[t].editors[W].width += 12 - X), k[t].width = 12;
              }
              if (this.layout === JSON.stringify(k)) return !1;
              for (this.layout = JSON.stringify(k), c = document.createElement("div"), t = 0; t < k.length; t++) for (h = this.theme.getGridRow(), c.appendChild(h), e = 0; e < k[t].editors.length; e++) E = k[t].editors[e].key, (I = this.editors[E]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, k[t].editors[e].width), h.appendChild(I.container);
            } else {
              if (c = document.createElement("div"), b) {
                var dt = document.createElement("div"), jt = this.theme.getTopTabHolder(this.translateProperty(this.schema.title)), xt = this.theme.getTopTabContentHolder(jt);
                for (this.property_order.forEach(function($t) {
                  var vt = i.editors[$t];
                  if (!vt.property_removed) {
                    var kt = i.theme.getTabContent(), Wt = vt.schema && (vt.schema.type === "object" || vt.schema.type === "array");
                    kt.isObjOrArray = Wt;
                    var oe = i.theme.getGridRow();
                    vt.tab || (i.basicPane === void 0 ? i.addRow(vt, jt, kt) : i.addRow(vt, jt, i.basicPane)), kt.id = i.getValidId(vt.tab_text.textContent), Wt ? (kt.appendChild(oe), xt.appendChild(kt), i.theme.addTopTab(jt, vt.tab)) : (dt.appendChild(oe), xt.childElementCount > 0 ? xt.firstChild.isObjOrArray && (kt.appendChild(dt), xt.insertBefore(kt, xt.firstChild), i.theme.insertBasicTopTab(vt.tab, jt), vt.basicPane = kt) : (kt.appendChild(dt), xt.appendChild(kt), i.theme.addTopTab(jt, vt.tab), vt.basicPane = kt)), vt.options.hidden ? vt.container.style.display = "none" : i.theme.setGridColumnSize(vt.container, 12), oe.appendChild(vt.container), vt.rowPane = kt;
                  }
                }); this.tabPanesContainer.firstChild; ) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                var It = this.tabs_holder.parentNode;
                It.removeChild(It.firstChild), It.appendChild(jt), this.tabPanesContainer = xt, this.tabs_holder = jt;
                var Ht = this.theme.getFirstTab(this.tabs_holder);
                return void (Ht && j(Ht, "click"));
              }
              this.property_order.forEach(function($t) {
                var vt = i.editors[$t];
                vt.property_removed || (h = i.theme.getGridRow(), c.appendChild(h), vt.options.hidden ? vt.container.style.display = "none" : i.theme.setGridColumnSize(vt.container, 12), h.appendChild(vt.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(c);
          }
        } }, { key: "getPropertySchema", value: function(t) {
          var e = this, i = this.schema.properties[t] || {};
          i = v({}, i);
          var c = !!this.schema.properties[t];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(h) {
            new RegExp(h).test(t) && (i.allOf = i.allOf || [], i.allOf.push(e.schema.patternProperties[h]), c = !0);
          }), !c && this.schema.additionalProperties && pn(this.schema.additionalProperties) === "object" && (i = v({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var t = this;
          if (Ke(Pe(n.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(e) {
            var i = Fr(e, 2), c = i[0], h = i[1], b = t.jsoneditor.getEditorClass(h);
            t.editors[c] = t.jsoneditor.createEditor(b, { jsoneditor: t.jsoneditor, schema: h, path: "".concat(t.path, ".").concat(c), parent: t, compact: !0, required: !0 }, t.currentDepth + 1), t.editors[c].preBuild();
            var k = t.editors[c].options.hidden ? 0 : t.editors[c].options.grid_columns || t.editors[c].getNumColumns();
            t.minwidth += k, t.maxwidth += k;
          }), this.no_link_holder = !0;
          else {
            if (this.options.table) throw new Error("Not supported yet");
            this.schema.defaultProperties || (this.jsoneditor.options.display_required_only || this.options.display_required_only ? this.schema.defaultProperties = Object.keys(this.schema.properties).filter(function(e) {
              return t.isRequiredObject({ key: e, schema: t.schema.properties[e] });
            }) : this.schema.defaultProperties = Object.keys(this.schema.properties)), this.maxwidth += 1, Array.isArray(this.schema.defaultProperties) && this.schema.defaultProperties.forEach(function(e) {
              t.addObjectProperty(e, !0), t.editors[e] && (t.minwidth = Math.max(t.minwidth, t.editors[e].options.grid_columns || t.editors[e].getNumColumns()), t.maxwidth += t.editors[e].options.grid_columns || t.editors[e].getNumColumns());
            });
          }
          this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(e, i) {
            var c = t.editors[e].schema.propertyOrder, h = t.editors[i].schema.propertyOrder;
            return typeof c != "number" && (c = 1e3), typeof h != "number" && (h = 1e3), c - h;
          });
        } }, { key: "addTab", value: function(t) {
          var e = this, i = this.rows[t].schema && (this.rows[t].schema.type === "object" || this.rows[t].schema.type === "array");
          this.tabs_holder && (this.rows[t].tab_text = document.createElement("span"), this.rows[t].tab_text.textContent = i ? this.rows[t].getHeaderText() : this.schema.basicCategoryTitle === void 0 ? "Basic" : this.schema.basicCategoryTitle, this.rows[t].tab = this.theme.getTopTab(this.rows[t].tab_text, this.getValidId(this.rows[t].tab_text.textContent)), this.rows[t].tab.addEventListener("click", function(c) {
            e.active_tab = e.rows[t].tab, e.refreshTabs(), c.preventDefault(), c.stopPropagation();
          }));
        } }, { key: "addRow", value: function(t, e, i) {
          var c = this.rows.length, h = t.schema.type === "object" || t.schema.type === "array";
          this.rows[c] = t, this.rows[c].rowPane = i, h ? (this.addTab(c), this.theme.addTopTab(e, this.rows[c].tab)) : this.basicTab === void 0 ? (this.addTab(c), this.basicTab = c, this.basicPane = i, this.theme.addTopTab(e, this.rows[c].tab)) : (this.rows[c].tab = this.rows[this.basicTab].tab, this.rows[c].tab_text = this.rows[this.basicTab].tab_text, this.rows[c].rowPane = this.rows[this.basicTab].rowPane);
        } }, { key: "refreshTabs", value: function(t) {
          var e = this, i = this.basicTab !== void 0, c = !1;
          this.rows.forEach(function(h) {
            h.tab && h.rowPane && h.rowPane.parentNode && (i && h.tab === e.rows[e.basicTab].tab && c || (t ? h.tab_text.textContent = h.getHeaderText() : (i && h.tab === e.rows[e.basicTab].tab && (c = !0), h.tab === e.active_tab ? e.theme.markTabActive(h) : e.theme.markTabInactive(h))));
          });
        } }, { key: "build", value: function() {
          var t = this, e = this.format === "categories";
          if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, Object.entries(this.editors).forEach(function(c) {
            var h = Fr(c, 2), b = h[0], k = h[1], E = t.theme.getTableCell();
            t.editor_holder.appendChild(E), k.setContainer(E), k.build(), k.postBuild(), k.setOptInCheckbox(k.header), k.setValue(k.getDefault(), !0), t.editors[b].options.hidden && (E.style.display = "none"), t.editors[b].options.input_width && (E.style.width = t.editors[b].options.input_width);
          });
          else {
            if (this.options.table) throw new Error("Not supported yet");
            this.header = "", this.options.compact || (this.header = document.createElement("span"), this.header.textContent = this.getTitle()), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.title.classList.add("je-object__title"), this.controls = this.theme.getButtonHolder(), this.controls.classList.add("je-object__controls"), this.container.appendChild(this.title), this.container.appendChild(this.controls), this.container.classList.add("je-object__container"), this.editjson_holder = this.theme.getModal(), this.editjson_textarea_label = this.theme.getHiddenLabel(this.translate("button_edit_json")), this.editjson_textarea_label.setAttribute("for", this.path + "-edit-json-textarea"), this.editjson_textarea = this.theme.getTextareaInput(), this.editjson_textarea.setAttribute("id", this.path + "-edit-json-textarea"), this.editjson_textarea.setAttribute("aria-labelledby", this.path + "-edit-json-textarea"), this.editjson_textarea.classList.add("je-edit-json--textarea"), this.editjson_save = this.getButton("button_save", "save", "button_save"), this.editjson_save.classList.add("json-editor-btntype-save"), this.editjson_save.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.saveJSON();
            }), this.editjson_copy = this.getButton("button_copy", "copy", "button_copy"), this.editjson_copy.classList.add("json-editor-btntype-copy"), this.editjson_copy.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.copyJSON();
            }), this.editjson_cancel = this.getButton("button_cancel", "cancel", "button_cancel"), this.editjson_cancel.classList.add("json-editor-btntype-cancel"), this.editjson_cancel.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.hideEditJSON();
            }), this.editjson_holder.appendChild(this.editjson_textarea_label), this.editjson_holder.appendChild(this.editjson_textarea), this.editjson_holder.appendChild(this.editjson_save), this.editjson_holder.appendChild(this.editjson_copy), this.editjson_holder.appendChild(this.editjson_cancel), this.addproperty_holder = this.theme.getModal(), this.addproperty_list = document.createElement("div"), this.addproperty_list.classList.add("property-selector"), this.addproperty_add = this.getButton("button_add", "add", "button_add"), this.addproperty_add.classList.add("json-editor-btntype-add"), this.addproperty_input = this.theme.getFormInputField("text"), this.addproperty_input.setAttribute("placeholder", "Property name..."), this.addproperty_input_label = this.theme.getHiddenLabel(this.translate("button_properties")), this.addproperty_input_label.setAttribute("for", this.path + "-property-selector"), this.addproperty_input.classList.add("property-selector-input"), this.addproperty_input.setAttribute("id", this.path + "-property-selector"), this.addproperty_input.setAttribute("aria-labelledby", this.path + "-property-selector"), this.addproperty_add.addEventListener("click", function(c) {
              if (c.preventDefault(), c.stopPropagation(), t.addproperty_input.value) {
                if (t.editors[t.addproperty_input.value]) return void window.alert("there is already a property with that name");
                t.addObjectProperty(t.addproperty_input.value), t.editors[t.addproperty_input.value] && t.editors[t.addproperty_input.value].disable();
                var h = t.editors[t.addproperty_input.value].key, b = t.editors[t.addproperty_input.value].type, k = t.editors[t.addproperty_input.value].path;
                t.onChange(!0, !1, { event: "add", data: { key: h, type: b, path: k } });
              }
            }), this.addproperty_input.addEventListener("input", function(c) {
              c.target.previousSibling.previousSibling.childNodes.forEach(function(h) {
                var b = h.innerText, k = c.target.value;
                t.options.case_sensitive_property_search || t.jsoneditor.options.case_sensitive_property_search || (b = b.toLowerCase(), k = k.toLowerCase()), b.includes(k) ? h.style.display = "" : h.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), e ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(c) {
              var h = t.theme.getTabContent(), b = t.theme.getGridColumn(), k = !(!c.schema || c.schema.type !== "object" && c.schema.type !== "array");
              if (h.isObjOrArray = k, e) {
                if (k) {
                  var E = t.theme.getGridContainer();
                  E.appendChild(b), h.appendChild(E), t.tabPanesContainer.appendChild(h), t.row_container = E;
                } else t.row_container_basic === void 0 && (t.row_container_basic = t.theme.getGridContainer(), h.appendChild(t.row_container_basic), t.tabPanesContainer.childElementCount === 0 ? t.tabPanesContainer.appendChild(h) : t.tabPanesContainer.insertBefore(h, t.tabPanesContainer.childNodes[1])), t.row_container_basic.appendChild(b);
                t.addRow(c, t.tabs_holder, h), h.id = t.getValidId(c.schema.title);
              } else t.row_container.appendChild(b);
              c.setContainer(b), c.build(), c.postBuild(), c.setOptInCheckbox(c.header);
            }), this.rows[0] && j(this.rows[0].tab, "click"), this.collapsed = !1, this.collapse_control = this.getButton("", "collapse", "button_collapse"), this.collapse_control.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(this.collapse_control, this.title.childNodes[0]), this.collapse_control.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.collapsed ? (t.editor_holder.style.display = "", t.collapsed = !1, t.setButtonText(t.collapse_control, "", "collapse", "button_collapse")) : (t.editor_holder.style.display = "none", t.collapsed = !0, t.setButtonText(t.collapse_control, "", "expand", "button_expand"));
            }), this.options.collapsed && j(this.collapse_control, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.collapse_control.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.collapse_control.style.display = "none"), this.editjson_control = this.getButton("JSON", "edit", "button_edit_json"), this.editjson_control.classList.add("json-editor-btntype-editjson"), this.editjson_control.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.toggleEditJSON();
            }), this.controls.appendChild(this.editjson_control), this.controls.insertBefore(this.editjson_holder, this.controls.childNodes[0]), this.schema.options && this.schema.options.disable_edit_json !== void 0 ? this.schema.options.disable_edit_json && (this.editjson_control.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_control.style.display = "none"), this.addproperty_button = this.getButton("properties", "edit_properties", "button_object_properties"), this.addproperty_button.classList.add("json-editor-btntype-properties"), this.addproperty_button.addEventListener("click", function(c) {
              c.preventDefault(), c.stopPropagation(), t.toggleAddProperty();
            }), this.controls.appendChild(this.addproperty_button), this.controls.insertBefore(this.addproperty_holder, this.controls.childNodes[1]), this.refreshAddProperties(), this.deactivateNonRequiredProperties(!1);
          }
          this.options.table_row ? (this.editor_holder = this.container, this.property_order.forEach(function(c) {
            t.editor_holder.appendChild(t.editors[c].container);
          })) : (this.layoutEditors(), this.layoutEditors()), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "deactivateNonRequiredProperties", value: function(t) {
          var e = this, i = this.jsoneditor.options.show_opt_in, c = this.options.show_opt_in !== void 0, h = c && this.options.show_opt_in === !0, b = c && this.options.show_opt_in === !1;
          (h || !b && i || !c && i) && Object.entries(this.editors).forEach(function(k) {
            var E = Fr(k, 2), I = E[0], $ = E[1];
            e.isRequiredObject($) || e.editors[I].deactivate(), t && typeof e.editors[I].deactivateNonRequiredProperties == "function" && e.editors[I].deactivateNonRequiredProperties(t);
          });
        } }, { key: "showEditJSON", value: function() {
          this.editjson_holder && (this.hideAddProperty(), this.editjson_holder.style.left = "".concat(this.editjson_control.offsetLeft, "px"), this.editjson_holder.style.top = "".concat(this.editjson_control.offsetTop + this.editjson_control.offsetHeight, "px"), this.editjson_textarea.value = JSON.stringify(this.getValue(), null, 2), this.disable(), this.editjson_holder.style.display = "", this.editjson_control.disabled = !1, this.editing_json = !0);
        } }, { key: "hideEditJSON", value: function() {
          this.editjson_holder && this.editing_json && (this.editjson_holder.style.display = "none", this.enable(), this.editing_json = !1);
        } }, { key: "copyJSON", value: function() {
          this.editjson_holder && navigator.clipboard.writeText(this.editjson_textarea.value).catch(function(t) {
            return window.alert(t);
          });
        } }, { key: "saveJSON", value: function() {
          if (this.editjson_holder) try {
            var t = JSON.parse(this.editjson_textarea.value);
            this.setValue(t), this.hideEditJSON(), this.onChange(!0);
          } catch (e) {
            throw window.alert("invalid JSON"), e;
          }
        } }, { key: "toggleEditJSON", value: function() {
          this.editing_json ? this.hideEditJSON() : this.showEditJSON();
        } }, { key: "insertPropertyControlUsingPropertyOrder", value: function(t, e, i) {
          var c;
          this.schema.properties[t] && (c = this.schema.properties[t].propertyOrder), typeof c != "number" && (c = 1e3), e.propertyOrder = c;
          for (var h = 0; h < i.childNodes.length; h++) {
            var b = i.childNodes[h];
            if (e.propertyOrder < b.propertyOrder) {
              this.addproperty_list.insertBefore(e, b), e = null;
              break;
            }
          }
          e && this.addproperty_list.appendChild(e);
        } }, { key: "addPropertyCheckbox", value: function(t) {
          var e, i = this, c = this.theme.getCheckbox();
          e = this.schema.properties[t] && this.schema.properties[t].title ? this.schema.properties[t].title : t;
          var h = this.theme.getCheckboxLabel(e), b = this.theme.getFormControl(h, c, null, null, this.path + "-" + t);
          return b.style.paddingBottom = b.style.marginBottom = b.style.paddingTop = b.style.marginTop = 0, b.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(t, b, this.addproperty_list), c.checked = t in this.editors, c.addEventListener("change", function() {
            c.checked ? i.addObjectProperty(t) : i.removeObjectProperty(t), i.onChange(!0);
          }), this.addproperty_checkboxes[t] = c, c;
        } }, { key: "showAddProperty", value: function() {
          this.addproperty_holder && (this.hideEditJSON(), this.addproperty_holder.style.left = "".concat(this.addproperty_button.offsetLeft, "px"), this.addproperty_holder.style.top = "".concat(this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight, "px"), this.disable(), this.adding_property = !0, this.addproperty_button.disabled = !1, this.addproperty_holder.style.display = "", this.refreshAddProperties());
        } }, { key: "hideAddProperty", value: function() {
          this.addproperty_holder && this.adding_property && (this.addproperty_holder.style.display = "none", this.enable(), this.adding_property = !1);
        } }, { key: "toggleAddProperty", value: function() {
          this.adding_property ? this.hideAddProperty() : this.showAddProperty();
        } }, { key: "removeObjectProperty", value: function(t) {
          if (this.editors[t]) {
            var e;
            if ((e = this.editors[t].schema) !== null && e !== void 0 && (e = e.options) !== null && e !== void 0 && e.dependencies) return;
            this.editors[t].unregister(), delete this.editors[t], this.refreshValue(), this.layoutEditors();
          }
        } }, { key: "getSchemaOnMaxDepth", value: function(t) {
          return Object.keys(t).reduce(function(e, i) {
            switch (i) {
              case "$ref":
                return e;
              case "properties":
              case "items":
                return Nr(Nr({}, e), {}, Zi({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return Nr(Nr({}, e), {}, Zi({}, i, !0));
              default:
                return Nr(Nr({}, e), {}, Zi({}, i, t[i]));
            }
          }, {});
        } }, { key: "addObjectProperty", value: function(t, e) {
          if (!this.editors[t]) {
            if (this.cached_editors[t]) {
              if (this.editors[t] = this.cached_editors[t], e) return;
              this.editors[t].register();
            } else {
              if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[t] || this.schema.patternProperties && Object.keys(this.schema.patternProperties).find(function(k) {
                return new RegExp(k).test(t);
              }))) return;
              var i = this.getPropertySchema(t);
              typeof i.propertyOrder != "number" && (i.propertyOrder = Object.keys(this.editors).length + 1e3);
              var c = this.jsoneditor.getEditorClass(i), h = this.jsoneditor.options.max_depth;
              if (this.editors[t] = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: h && this.currentDepth >= h ? this.getSchemaOnMaxDepth(i) : i, path: "".concat(this.path, ".").concat(t), parent: this }, this.currentDepth + 1), this.editors[t].preBuild(), !e) {
                var b = this.theme.getChildEditorHolder();
                this.editor_holder.appendChild(b), this.editors[t].setContainer(b), this.editors[t].build(), this.editors[t].postBuild(), this.editors[t].setOptInCheckbox(c.header), this.editors[t].activate();
              }
              this.cached_editors[t] = this.editors[t];
            }
            e || (this.refreshValue(), this.layoutEditors());
          }
        } }, { key: "onOutsideModalClick", value: function(t) {
          var e = t.path || t.composedPath && t.composedPath();
          this.addproperty_holder && !this.addproperty_holder.contains(e[0]) && this.adding_property && (t.preventDefault(), t.stopPropagation(), this.toggleAddProperty());
        } }, { key: "onChildEditorChange", value: function(t, e) {
          this.refreshValue(), Ke(Pe(n.prototype), "onChildEditorChange", this).call(this, t, e);
        } }, { key: "canHaveAdditionalProperties", value: function() {
          return typeof this.schema.additionalProperties == "boolean" ? this.schema.additionalProperties : pn(this.schema.additionalProperties) === "object" && this.schema.additionalProperties !== null || (typeof this.options.no_additional_properties == "boolean" ? !this.options.no_additional_properties : typeof this.jsoneditor.options.no_additional_properties != "boolean" || !this.jsoneditor.options.no_additional_properties);
        } }, { key: "destroy", value: function() {
          Object.values(this.cached_editors).forEach(function(t) {
            return t.destroy();
          }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClickListener, !0), Ke(Pe(n.prototype), "destroy", this).call(this);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            var t = Ke(Pe(n.prototype), "getValue", this).call(this);
            return t && (this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties) && Object.keys(t).forEach(function(e) {
              var i;
              ((i = t[e]) === void 0 || i === "" || i === Object(i) && Object.keys(i).length === 0 && i.constructor === Object) && delete t[e];
            }), t && (this.jsoneditor.options.remove_false_properties || this.options.remove_false_properties) && Object.keys(t).forEach(function(e) {
              t[e] === !1 && delete t[e];
            }), t;
          }
        } }, { key: "refreshValue", value: function() {
          var t = this;
          this.value = {}, this.editors && (Object.keys(this.editors).forEach(function(e) {
            t.editors[e].isActive() && (t.editors[e].refreshValue(), t.value[e] = t.editors[e].getValue());
          }), Object.keys(this.editors).forEach(function(e) {
            t.editors[e].isActive() && t.activateDependentRequired(t.editors[e].key);
          }), this.adding_property && this.refreshAddProperties());
        } }, { key: "activateDependentRequired", value: function(t) {
          var e = this;
          this.getDependentRequired(t).forEach(function(i) {
            var c;
            Object.entries(e.cached_editors).forEach(function(h) {
              var b = Fr(h, 2), k = (b[0], b[1]);
              k.key === i && (c = k);
            }), c && !c.isActive() && c.activate();
          });
        } }, { key: "getDependentRequired", value: function(t) {
          return this.schema.dependentRequired && x(this.schema.dependentRequired, t) ? this.schema.dependentRequired[t] : [];
        } }, { key: "refreshAddProperties", value: function() {
          var t = this;
          if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) this.addproperty_button.style.display = "none";
          else {
            var e, i = 0, c = !1;
            Object.keys(this.editors).forEach(function(h) {
              return i++;
            }), e = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(h) {
              t.addPropertyCheckbox(h), t.isRequiredObject(t.cached_editors[h]) && h in t.editors && (t.addproperty_checkboxes[h].disabled = !0), t.schema.minProperties !== void 0 && i <= t.schema.minProperties ? (t.addproperty_checkboxes[h].disabled = t.addproperty_checkboxes[h].checked, t.addproperty_checkboxes[h].checked || (c = !0)) : h in t.editors ? c = !0 : e || x(t.schema.properties, h) ? (t.addproperty_checkboxes[h].disabled = !1, c = !0) : t.addproperty_checkboxes[h].disabled = !0;
            }), this.canHaveAdditionalProperties() && (c = !0), Object.keys(this.schema.properties).forEach(function(h) {
              t.cached_editors[h] || (c = !0, t.addPropertyCheckbox(h));
            }), c ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !e : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(t) {
          if (t) return typeof t.schema.required == "boolean" ? t.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(t.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(t, e) {
          var i = this;
          (pn(t = (t = this.applyConstFilter(t)) || {}) !== "object" || Array.isArray(t)) && (t = {}), Object.entries(this.cached_editors).forEach(function(c) {
            var h = Fr(c, 2), b = h[0], k = h[1];
            t[b] !== void 0 ? (i.addObjectProperty(b), k.setValue(t[b], e), k.activate(), i.disabled && k.disable()) : e || i.isRequiredObject(k) ? k.setValue(k.getDefault(), e) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? k.deactivate() : i.removeObjectProperty(b);
          }), Object.entries(t).forEach(function(c) {
            var h = Fr(c, 2), b = h[0], k = h[1];
            i.cached_editors[b] || (i.addObjectProperty(b), i.editors[b] && i.editors[b].setValue(k, e, !!i.editors[b].template));
          }), this.refreshValue(), this.layoutEditors(), this.onChange();
        } }, { key: "showValidationErrors", value: function(t) {
          var e = this, i = [], c = [];
          t.forEach(function(h) {
            h.path === e.path ? i.push(h) : c.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            h.errorcount && h.errorcount > 1 && (h.message += " (".concat(h.errorcount, " errors)")), e.error_holder.appendChild(e.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), Object.values(this.editors).forEach(function(h) {
            h.showValidationErrors(c);
          });
        } }]) && $h(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F);
      function Dr(o) {
        return Dr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Dr(o);
      }
      function Wh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Jh(s.key), s);
        }
      }
      function Jh(o) {
        var n = function(r, s) {
          if (Dr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Dr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Dr(n) == "symbol" ? n : n + "";
      }
      function Kh(o, n, r) {
        return n = fn(n), function(s, t) {
          if (t && (Dr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, sl() ? Reflect.construct(n, r || [], fn(o).constructor) : n.apply(o, r));
      }
      function sl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (sl = function() {
          return !!o;
        })();
      }
      function Mr() {
        return Mr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = fn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Mr.apply(this, arguments);
      }
      function fn(o) {
        return fn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, fn(o);
      }
      function ts(o, n) {
        return ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ts(o, n);
      }
      ol.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var Zh = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Kh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ts(t, e);
        }(n, o), r = n, (s = [{ key: "preBuild", value: function() {
          Mr(fn(n.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          var t = this;
          this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
          for (var e = function(I) {
            t.setValue(I.currentTarget.value), t.onChange(!0), t.radioGroup.forEach(function($) {
              $.checked = $.value === t.getValue();
            });
          }, i = 0; i < this.enum_values.length; i++) {
            var c = { id: "".concat(this.formname, "[").concat(i, "]"), value: this.enum_values[i] };
            this.jsoneditor.options.use_name_attributes && (c.name = this.formname), this.input = this.theme.getFormRadio(c), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", e, !1), this.radioGroup.push(this.input);
            var h = this.theme.getFormRadioLabel(this.enum_display[i]);
            h.htmlFor = this.input.id;
            var b = this.theme.getFormRadioControl(h, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
            this.radioContainer.appendChild(b);
          }
          if (this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var k = 0; k < this.radioGroup.length; k++) this.radioGroup[k].disabled = !0;
            this.radioContainer.classList.add("readonly");
          }
          var E = this.theme.getContainer();
          E.appendChild(this.radioContainer), E.dataset.containerFor = "radio", this.input = E, this.control = this.theme.getFormControl(this.label, E, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady();
          });
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !1;
            this.radioContainer.classList.remove("readonly"), Mr(fn(n.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0);
          for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !0;
          this.radioContainer.classList.add("readonly"), Mr(fn(n.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Mr(fn(n.prototype), "destroy", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "setValue", value: function(t) {
          typeof (t = this.applyConstFilter(t)) != "string" && (t = String(t));
          for (var e = 0; e < this.radioGroup.length; e++) {
            if (this.radioGroup[e].value === t) {
              this.radioGroup[e].checked = !0;
              break;
            }
            this.radioGroup[e].checked = !1;
          }
          this.value = t, this.onChange();
        } }]) && Wh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(vi);
      function Hr(o) {
        return Hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Hr(o);
      }
      function Yh(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Qh(s.key), s);
        }
      }
      function Qh(o) {
        var n = function(r, s) {
          if (Hr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Hr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Hr(n) == "symbol" ? n : n + "";
      }
      function Xh(o, n, r) {
        return n = qe(n), function(s, t) {
          if (t && (Hr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, al() ? Reflect.construct(n, r || [], qe(o).constructor) : n.apply(o, r));
      }
      function al() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (al = function() {
          return !!o;
        })();
      }
      function Nn() {
        return Nn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = qe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Nn.apply(this, arguments);
      }
      function qe(o) {
        return qe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, qe(o);
      }
      function es(o, n) {
        return es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, es(o, n);
      }
      var td = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Xh(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && es(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t);
          var c = Nn(qe(n.prototype), "setValue", this).call(this, t, e, i);
          c !== void 0 && c.changed && this.sceditor_instance && this.sceditor_instance.val(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Nn(qe(n.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var t = this;
          if (window.sceditor) {
            var e = this.expandCallbacks("sceditor", v({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
            i === void 0 && window.sceditor.create(this.input, e), this.sceditor_instance = i || window.sceditor.instance(this.input), this.sceditor_instance.blur(function() {
              t.value = t.sceditor_instance.val(), t.sceditor_instance.updateOriginal(), t.is_dirty = !0, t.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Nn(qe(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), Nn(qe(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.sceditor_instance && this.sceditor_instance.readOnly(!0), Nn(qe(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), Nn(qe(n.prototype), "destroy", this).call(this);
        } }]) && Yh(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Vr(o) {
        return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Vr(o);
      }
      function ed(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, nd(s.key), s);
        }
      }
      function nd(o) {
        var n = function(r, s) {
          if (Vr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Vr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Vr(n) == "symbol" ? n : n + "";
      }
      function rd(o, n, r) {
        return n = Ze(n), function(s, t) {
          if (t && (Vr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, ll() ? Reflect.construct(n, r || [], Ze(o).constructor) : n.apply(o, r));
      }
      function ll() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ll = function() {
          return !!o;
        })();
      }
      function nr() {
        return nr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Ze(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, nr.apply(this, arguments);
      }
      function Ze(o) {
        return Ze = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ze(o);
      }
      function ns(o, n) {
        return ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ns(o, n);
      }
      var id = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), rd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ns(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          if (t = this.applyConstFilter(t), this.select2_instance) {
            e ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(t);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else nr(Ze(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          var t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var e = this.expandCallbacks("select2", v({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = e.tags = !!e.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
              t.updateValue(i), t.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          nr(Ze(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(t) {
          var e = this.enum_values[0];
          return t = this.typecast(t || ""), this.enum_values.includes(t) ? e = t : this.newEnumAllowed && (e = this.addNewOption(t) ? t : e), this.value = e, e;
        } }, { key: "addNewOption", value: function(t) {
          var e, i = this.typecast(t), c = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (e = this.input.querySelector('option[value="'.concat(i, '"]'))) ? e.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), c = !0), c;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), nr(Ze(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), nr(Ze(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), nr(Ze(n.prototype), "destroy", this).call(this);
        } }]) && ed(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(vi);
      function zr(o) {
        return zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, zr(o);
      }
      function od(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, sd(s.key), s);
        }
      }
      function sd(o) {
        var n = function(r, s) {
          if (zr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (zr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return zr(n) == "symbol" ? n : n + "";
      }
      function ad(o, n, r) {
        return n = Ue(n), function(s, t) {
          if (t && (zr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, cl() ? Reflect.construct(n, r || [], Ue(o).constructor) : n.apply(o, r));
      }
      function cl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (cl = function() {
          return !!o;
        })();
      }
      function Fn() {
        return Fn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Ue(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Fn.apply(this, arguments);
      }
      function Ue(o) {
        return Ue = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ue(o);
      }
      function rs(o, n) {
        return rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, rs(o, n);
      }
      var ld = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), ad(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && rs(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e) {
          if (t = this.applyConstFilter(t), this.selectize_instance) {
            e ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(t);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else Fn(Ue(n.prototype), "setValue", this).call(this, t, e);
        } }, { key: "afterInputReady", value: function() {
          var t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var e = this.expandCallbacks("selectize", v({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
            this.newEnumAllowed = e.create = !!e.create && this.schema.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              t.updateValue(i), t.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
          }
          Fn(Ue(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(t) {
          var e = this.enum_values[0];
          return t = this.typecast(t || ""), this.enum_values.includes(t) ? e = t : this.newEnumAllowed && (e = this.addNewOption(t) ? t : e), this.value = e, e;
        } }, { key: "addNewOption", value: function(t) {
          var e = this.typecast(t), i = !1;
          return this.enum_values.includes(e) || e === "" || (this.enum_options.push("".concat(e)), this.enum_display.push("".concat(e)), this.enum_values.push(e), this.schema.enum.push(e), this.selectize_instance.addItem(e), this.selectize_instance.refreshOptions(!1), i = !0), i;
        } }, { key: "onWatchedFieldChange", value: function() {
          var t = this;
          Fn(Ue(n.prototype), "onWatchedFieldChange", this).call(this), this.selectize_instance && (this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(e, i) {
            t.selectize_instance.addOption({ value: e, text: t.enum_display[i] });
          }), this.selectize_instance.addItem("".concat(this.value), !0));
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), Fn(Ue(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.selectize_instance && this.selectize_instance.lock(), Fn(Ue(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), Fn(Ue(n.prototype), "destroy", this).call(this);
        } }]) && od(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(vi);
      function qr(o) {
        return qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, qr(o);
      }
      function cd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, ud(s.key), s);
        }
      }
      function ud(o) {
        var n = function(r, s) {
          if (qr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (qr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return qr(n) == "symbol" ? n : n + "";
      }
      function hd(o, n, r) {
        return n = Yi(n), function(s, t) {
          if (t && (qr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, ul() ? Reflect.construct(n, r || [], Yi(o).constructor) : n.apply(o, r));
      }
      function ul() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ul = function() {
          return !!o;
        })();
      }
      function Yi(o) {
        return Yi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Yi(o);
      }
      function is(o, n) {
        return is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, is(o, n);
      }
      var dd = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), hd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && is(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          var t = this;
          this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description)));
          var e = this.formname.replace(/\W/g, "");
          if (typeof SignaturePad == "function") {
            this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input);
            var i = document.createElement("div");
            i.classList.add("signature-container");
            var c = document.createElement("canvas");
            this.jsoneditor.options.use_name_attributes && c.setAttribute("name", e), c.classList.add("signature"), i.appendChild(c), this.signaturePad = new window.SignaturePad(c), this.signaturePad.onEnd = function() {
              t.signaturePad.isEmpty() ? t.input.value = "" : t.input.value = t.signaturePad.toDataURL(), t.is_dirty = !0, t.refreshValue(), t.watch_listener(), t.jsoneditor.notifyWatchers(t.path), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange();
            };
            var h = document.createElement("div"), b = document.createElement("button");
            b.classList.add("tiny", "button"), b.innerHTML = "Clear signature", h.appendChild(b), i.appendChild(h), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(E) {
              c.setAttribute("readOnly", "readOnly"), E.disabled = !0;
            })), b.addEventListener("click", function(E) {
              E.preventDefault(), E.stopPropagation(), t.signaturePad.clear(), t.signaturePad.strokeEnd();
            }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), c.width = i.offsetWidth, this.options && this.options.canvas_height ? c.height = this.options.canvas_height : c.height = "300";
          } else {
            var k = document.createElement("p");
            k.innerHTML = "Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad", this.container.appendChild(k);
          }
        } }, { key: "setValue", value: function(t) {
          if (t = this.applyConstFilter(t), typeof SignaturePad == "function") {
            var e = this.sanitize(t);
            return this.value === e ? void 0 : (this.value = e, this.input.value = this.value, this.signaturePad.clear(), t && t !== "" && this.signaturePad.fromDataURL(t), this.watch_listener(), this.jsoneditor.notifyWatchers(this.path), !1);
          }
        } }, { key: "destroy", value: function() {
          this.signaturePad.off(), delete this.signaturePad;
        } }]) && cd(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Ur(o) {
        return Ur = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ur(o);
      }
      function pd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, fd(s.key), s);
        }
      }
      function fd(o) {
        var n = function(r, s) {
          if (Ur(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Ur(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Ur(n) == "symbol" ? n : n + "";
      }
      function yd(o, n, r) {
        return n = $e(n), function(s, t) {
          if (t && (Ur(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, hl() ? Reflect.construct(n, r || [], $e(o).constructor) : n.apply(o, r));
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
      function Dn() {
        return Dn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = $e(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Dn.apply(this, arguments);
      }
      function $e(o) {
        return $e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, $e(o);
      }
      function os(o, n) {
        return os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, os(o, n);
      }
      _(6031);
      var md = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), yd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && os(t, e);
        }(n, o), r = n, (s = [{ key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t);
          var c = Dn($e(n.prototype), "setValue", this).call(this, t, e, i);
          c !== void 0 && c.changed && this.simplemde_instance && this.simplemde_instance.value(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Dn($e(n.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var t, e = this;
          window.SimpleMDE ? (t = this.expandCallbacks("simplemde", v({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(t), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
            e.value = e.simplemde_instance.value(), e.is_dirty = !0, e.onChange(!0);
          }), t.autorefresh && this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 }), this.theme.afterInputReady(this.input)) : Dn($e(n.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), Dn($e(n.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(t) {
          this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), Dn($e(n.prototype), "disable", this).call(this, t);
        } }, { key: "destroy", value: function() {
          this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), Dn($e(n.prototype), "destroy", this).call(this);
        } }, { key: "startListening", value: function(t, e) {
          var i = this, c = function h() {
            t.display.wrapper.offsetHeight ? (i.stopListening(t, e), t.display.lastWrapHeight !== t.display.wrapper.clientHeight && t.refresh()) : e.timeout = window.setTimeout(h, e.delay);
          };
          e.timeout = window.setTimeout(c, e.delay), e.hurry = function() {
            window.clearTimeout(e.timeout), e.timeout = window.setTimeout(c, 50);
          }, t.on(window, "mouseup", e.hurry), t.on(window, "keyup", e.hurry);
        } }, { key: "stopListening", value: function(t, e) {
          window.clearTimeout(e.timeout), t.off(window, "mouseup", e.hurry), t.off(window, "keyup", e.hurry);
        } }]) && pd(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function $r(o) {
        return $r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, $r(o);
      }
      function bd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, vd(s.key), s);
        }
      }
      function vd(o) {
        var n = function(r, s) {
          if ($r(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if ($r(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return $r(n) == "symbol" ? n : n + "";
      }
      function gd(o, n, r) {
        return n = rr(n), function(s, t) {
          if (t && ($r(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, dl() ? Reflect.construct(n, r || [], rr(o).constructor) : n.apply(o, r));
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
      function Qi() {
        return Qi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = rr(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, Qi.apply(this, arguments);
      }
      function rr(o) {
        return rr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, rr(o);
      }
      function ss(o, n) {
        return ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ss(o, n);
      }
      var pl = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), gd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ss(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          var t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var e = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && e--, this.enum_values = [];
            for (var i = 0; i < e; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var c = function(X) {
            X.preventDefault(), X.stopPropagation(), t.setValue(X.currentTarget.value), t.onChange(!0);
          }, h = this.enum_values.length - 1; h > -1; h--) {
            var b = this.formname + (h + 1), k = this.theme.getFormInputField("radio");
            k.name = "".concat(this.formname, "[starrating]"), k.value = this.enum_values[h], k.id = b, k.addEventListener("change", c, !1), this.radioGroup.push(k);
            var E = document.createElement("label");
            E.htmlFor = b, E.title = this.enum_values[h], this.options.displayValue && E.classList.add("starrating-display-enabled");
            var I = this.theme.getHiddenText("label");
            I.textContent = h, E.appendChild(I), this.ratingContainer.appendChild(k), this.ratingContainer.appendChild(E);
          }
          if (this.options.displayValue && (this.displayRating = document.createElement("div"), this.displayRating.classList.add("starrating-display"), this.displayRating.innerText = this.enum_values[0], this.ratingContainer.appendChild(this.displayRating)), this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var $ = 0; $ < this.radioGroup.length; $++) this.radioGroup[$].disabled = !0;
            this.ratingContainer.classList.add("readonly");
          }
          var W = this.theme.getContainer();
          W.appendChild(this.ratingContainer), this.input = W, this.control = this.theme.getFormControl(this.label, W, this.description, this.infoButton), this.container.appendChild(this.control), this.refreshValue();
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !1;
            this.ratingContainer.classList.remove("readonly"), this.disabled = !1;
          }
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0);
          for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !0;
          this.ratingContainer.classList.add("readonly"), this.disabled = !0;
        } }, { key: "destroy", value: function() {
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Qi(rr(n.prototype), "destroy", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.type === "integer" ? this.value === "" ? 0 : parseInt(this.value) : this.value;
        } }, { key: "setValue", value: function(t) {
          t = this.applyConstFilter(t), this.value = t;
          for (var e = 0; e < this.radioGroup.length; e++) if (this.radioGroup[e].value === "".concat(t)) {
            this.radioGroup[e].checked = !0, this.value = t, this.options.displayValue && (this.displayRating.innerHTML = this.value);
            break;
          }
          Qi(rr(n.prototype), "setValue", this).call(this, this.value);
        } }]) && bd(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt);
      function Gr(o) {
        return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Gr(o);
      }
      function _d(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, wd(s.key), s);
        }
      }
      function wd(o) {
        var n = function(r, s) {
          if (Gr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Gr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Gr(n) == "symbol" ? n : n + "";
      }
      function jd(o, n, r) {
        return n = Mn(n), function(s, t) {
          if (t && (Gr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, fl() ? Reflect.construct(n, r || [], Mn(o).constructor) : n.apply(o, r));
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
      function ji() {
        return ji = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Mn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ji.apply(this, arguments);
      }
      function Mn(o) {
        return Mn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Mn(o);
      }
      function as(o, n) {
        return as = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, as(o, n);
      }
      pl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var kd = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), jd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && as(t, e);
        }(n, o), r = n, (s = [{ key: "build", value: function() {
          ji(Mn(n.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var t = this.theme.getStepperButtons(this.input);
          this.control.appendChild(t), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          ji(Mn(n.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          ji(Mn(n.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && _d(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(Wa);
      function Wr(o) {
        return Wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Wr(o);
      }
      function xd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Od(s.key), s);
        }
      }
      function Od(o) {
        var n = function(r, s) {
          if (Wr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Wr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Wr(n) == "symbol" ? n : n + "";
      }
      function Cd(o, n, r) {
        return n = Ye(n), function(s, t) {
          if (t && (Wr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, yl() ? Reflect.construct(n, r || [], Ye(o).constructor) : n.apply(o, r));
      }
      function yl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yl = function() {
          return !!o;
        })();
      }
      function ir() {
        return ir = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Ye(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ir.apply(this, arguments);
      }
      function Ye(o) {
        return Ye = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Ye(o);
      }
      function ls(o, n) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ls(o, n);
      }
      var Ed = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Cd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ls(t, e);
        }(n, o), r = n, s = [{ key: "register", value: function() {
          if (ir(Ye(n.prototype), "register", this).call(this), this.rows) for (var t = 0; t < this.rows.length; t++) this.rows[t].register();
        } }, { key: "unregister", value: function() {
          if (ir(Ye(n.prototype), "unregister", this).call(this), this.rows) for (var t = 0; t < this.rows.length; t++) this.rows[t].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var t = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = t.title || "row", this.item_default = t.default || null, this.item_has_child_editors = t.properties || t.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, ir(Ye(n.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          this.tableContainer = this.theme.getTableContainer(), this.table = this.theme.getTable(), this.tableContainer.appendChild(this.table), this.container.appendChild(this.tableContainer), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
          var t = this.getElementEditor(0, !0);
          if (this.item_default = t.getDefault(), this.width = t.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.tableContainer), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls), this.item_has_child_editors) for (var e = t.getChildEditors(), i = t.property_order || Object.keys(e), c = 0; c < i.length; c++) {
            var h = this.theme.getTableHeaderCell(e[i[c]].getTitle());
            e[i[c]].options.hidden && (h.style.display = "none"), this.header_row.appendChild(h);
          }
          else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
          t.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(this.translate("table_controls")), this.controls_header_cell.setAttribute("aria-hidden", "true"), this.controls_header_cell.style.visibility = "hidden", this.header_row.appendChild(this.controls_header_cell), this.addControls();
        } }, { key: "onChildEditorChange", value: function(t, e) {
          this.refreshValue(), ir(Ye(n.prototype), "onChildEditorChange", this).call(this, t, e);
        } }, { key: "getItemDefault", value: function() {
          return v({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(t, e) {
          var i = v({}, this.schema.items), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.row_holder.appendChild(this.theme.getTableRow()), b = h;
          this.item_has_child_editors || (b = this.theme.getTableCell(), h.appendChild(b));
          var k = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: b, path: "".concat(this.path, ".").concat(t), parent: this, compact: !0, table_row: !0 });
          return k.preBuild(), e || (k.build(), k.postBuild(), k.controls_cell = h.appendChild(this.theme.getTableCell()), k.row = h, k.table_controls = this.theme.getButtonHolder(), k.controls_cell.appendChild(k.table_controls), k.table_controls.style.margin = 0, k.table_controls.style.padding = 0), k;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, ir(Ye(n.prototype), "destroy", this).call(this);
        } }, { key: "ensureArraySize", value: function(t) {
          if (Array.isArray(t) || (t = [t]), this.schema.minItems) for (; t.length < this.schema.minItems; ) t.push(this.getItemDefault());
          return this.schema.maxItems && t.length > this.schema.maxItems && (t = t.slice(0, this.schema.maxItems)), t;
        } }, { key: "setValue", value: function() {
          var t = this, e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (e = this.applyConstFilter(e), e = this.ensureArraySize(e), JSON.stringify(e) !== this.serialized) {
            var c = !1;
            e.forEach(function(k, E) {
              t.rows[E] ? t.rows[E].setValue(k) : (t.addRow(k), c = !0);
            });
            for (var h = e.length; h < this.rows.length; h++) {
              var b = this.rows[h].container;
              this.item_has_child_editors || this.rows[h].row.parentNode.removeChild(this.rows[h].row), this.rows[h].destroy(), b.parentNode && b.parentNode.removeChild(b), this.rows[h] = null, c = !0;
            }
            this.rows = this.rows.slice(0, e.length), this.refreshValue(), (c || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var t = this, e = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, c = [];
          this.rows.forEach(function($, W) {
            if ($.delete_button) {
              var X = !e;
              t.setButtonState($.delete_button, X), c.push(X);
            }
            if ($.copy_button) {
              var dt = !i;
              t.setButtonState($.copy_button, dt), c.push(dt);
            }
            if ($.moveup_button) {
              var jt = W !== 0;
              t.setButtonState($.moveup_button, jt), c.push(jt);
            }
            if ($.movedown_button) {
              var xt = W !== t.rows.length - 1;
              t.setButtonState($.movedown_button, xt), c.push(xt);
            }
          });
          var h = c.some(function($) {
            return $;
          });
          this.rows.forEach(function($) {
            return t.setButtonState($.controls_cell, h);
          }), this.setButtonState(this.controls_header_cell, h), this.setButtonState(this.table, this.value.length);
          var b = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, b);
          var k = !(!this.value.length || e || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, k);
          var E = !(this.value.length <= 1 || e || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, E);
          var I = b || k || E;
          this.setButtonState(this.controls, I);
        } }, { key: "refreshValue", value: function() {
          var t = this;
          this.value = [], this.rows.forEach(function(e, i) {
            t.value[i] = e.getValue();
          }), this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(t) {
          var e = this.rows.length;
          this.rows[e] = this.getElementEditor(e);
          var i = this.rows[e].table_controls;
          return this.hide_delete_buttons || (this.rows[e].delete_button = this._createDeleteButton(e, i)), this.show_copy_button && (this.rows[e].copy_button = this._createCopyButton(e, i)), this.hide_move_buttons || (this.rows[e].moveup_button = this._createMoveUpButton(e, i)), this.hide_move_buttons || (this.rows[e].movedown_button = this._createMoveDownButton(e, i)), this._supportDragDrop(this.rows[e].row), t !== void 0 && this.rows[e].setValue(t), this.rows[e];
        } }, { key: "_createDeleteButton", value: function(t, e) {
          var i = this, c = this.getButton("", "delete", "button_delete_row_title_short");
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue(), E = i.getValue()[b];
            k.splice(b, 1), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("deleteRow", E);
          }), e.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(t, e) {
          var i = this, c = this.getButton("", "copy", "button_copy_row_title_short"), h = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", t), c.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation();
            var k = 1 * b.currentTarget.getAttribute("data-i"), E = i.getValue(), I = E[k];
            h.items.type === "string" && h.items.format === "uuid" ? I = A() : h.items.type === "object" && h.items.properties && E.forEach(function($, W) {
              if (k === W) for (var X = 0, dt = Object.keys($); X < dt.length; X++) {
                var jt = dt[X];
                h.items.properties && h.items.properties[jt] && h.items.properties[jt].format === "uuid" && ((I = Object.assign({}, E[k]))[jt] = A());
              }
            }), E.splice(k + 1, 0, I), i.setValue(E), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[k + 1]);
          }), e.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(t, e) {
          var i = this, c = this.getButton("", "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            k.splice(b - 1, 0, k.splice(b, 1)[0]), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
          }), e.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(t, e) {
          var i = this, c = this.getButton("", "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", t), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            k.splice(b + 1, 0, k.splice(b, 1)[0]), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
          }), e.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(t) {
          var e = this;
          it(t, function(i, c) {
            var h = e.getValue(), b = h[i];
            h.splice(i, 1), h.splice(c, 0, b), e.setValue(h), e.onChange(!0), e.jsoneditor.trigger("moveRow", e.rows[c]);
          }, { useTrigger: !0 });
        } }, { key: "addControls", value: function() {
          var t = this;
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.title_controls && (this.title.insertBefore(this.toggle_button, this.title.childNodes[0]), this.toggle_button.addEventListener("click", function(e) {
            e.preventDefault(), e.stopPropagation(), t.setButtonState(t.panel, t.collapsed), t.collapsed ? (t.collapsed = !1, t.setButtonText(e.currentTarget, "", "collapse", "button_collapse")) : (t.collapsed = !0, t.setButtonText(e.currentTarget, "", "expand", "button_expand"));
          }), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none")), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton();
        } }, { key: "_createToggleButton", value: function() {
          var t = this.getButton("", "collapse", "button_collapse");
          return t.classList.add("json-editor-btntype-toggle"), t;
        } }, { key: "_createAddRowButton", value: function() {
          var t = this, e = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return e.classList.add("json-editor-btntype-add"), e.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var c = t.addRow();
            t.refreshValue(), t.refreshRowButtons(), t.onChange(!0), t.jsoneditor.trigger("addRow", c);
          }), this.controls.appendChild(e), e;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var t = this, e = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return e.classList.add("json-editor-btntype-deletelast"), e.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !t.askConfirmation()) return !1;
            var c = t.getValue(), h = c.pop();
            t.setValue(c), t.onChange(!0), t.jsoneditor.trigger("deleteRow", h);
          }), this.controls.appendChild(e), e;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var t = this, e = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return e.classList.add("json-editor-btntype-deleteall"), e.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !t.askConfirmation()) return !1;
            var c = t.getValue();
            t.setValue([]), t.onChange(!0), t.jsoneditor.trigger("deleteAllRows", c);
          }), this.controls.appendChild(e), e;
        } }], s && xd(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(et);
      function Jr(o) {
        return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Jr(o);
      }
      function Sd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Pd(s.key), s);
        }
      }
      function Pd(o) {
        var n = function(r, s) {
          if (Jr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Jr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Jr(n) == "symbol" ? n : n + "";
      }
      function Td(o, n, r) {
        return n = Hn(n), function(s, t) {
          if (t && (Jr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, ml() ? Reflect.construct(n, r || [], Hn(o).constructor) : n.apply(o, r));
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
      function ki() {
        return ki = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Hn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ki.apply(this, arguments);
      }
      function Hn(o) {
        return Hn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Hn(o);
      }
      function cs(o, n) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, cs(o, n);
      }
      function Kr(o) {
        return Kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Kr(o);
      }
      function Ld(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Ad(s.key), s);
        }
      }
      function Ad(o) {
        var n = function(r, s) {
          if (Kr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Kr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Kr(n) == "symbol" ? n : n + "";
      }
      function Rd(o, n, r) {
        return n = Vn(n), function(s, t) {
          if (t && (Kr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, bl() ? Reflect.construct(n, r || [], Vn(o).constructor) : n.apply(o, r));
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
      function xi() {
        return xi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Vn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, xi.apply(this, arguments);
      }
      function Vn(o) {
        return Vn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Vn(o);
      }
      function us(o, n) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, us(o, n);
      }
      function Zr(o) {
        return Zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Zr(o);
      }
      function Id(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Bd(s.key), s);
        }
      }
      function Bd(o) {
        var n = function(r, s) {
          if (Zr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Zr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Zr(n) == "symbol" ? n : n + "";
      }
      function Nd(o, n, r) {
        return n = Qe(n), function(s, t) {
          if (t && (Zr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, vl() ? Reflect.construct(n, r || [], Qe(o).constructor) : n.apply(o, r));
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
      function or() {
        return or = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Qe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, or.apply(this, arguments);
      }
      function Qe(o) {
        return Qe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Qe(o);
      }
      function hs(o, n) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, hs(o, n);
      }
      _(9868);
      var Xi = { ace: Qt, array: et, arrayChoices: te, arraySelect2: Gi, arraySelectize: Au, autocomplete: Nu, base64: Hu, button: Ra, checkbox: Wu, choices: Fa, datetime: rh, describedBy: ah, enum: hh, hidden: yh, info: gh, integer: Wa, ip: Ph, jodit: Rh, multiple: Hh, multiselect: ct, null: Uh, number: $a, object: ol, radio: Zh, sceditor: td, select: vi, select2: id, selectize: ld, signature: dd, simplemde: md, starrating: pl, stepper: kd, string: lt, table: Ed, upload: function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Td(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && cs(t, e);
        }(n, o), r = n, (s = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", v({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(c, h, b, k) {
            window.alert('No upload_handler defined for "'.concat(c.path, '". You must create your own handler to enable upload to server'));
          } }, this.defaults.options.upload || {}, this.options.upload || {})), this.options.mime_type = this.options.mime_type ? [].concat(this.options.mime_type) : [], this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
            if (typeof this.options.upload_handler != "function") throw new Error("Upload handler required for upload editor");
            if (this.uploader = this.theme.getFormInputField("file"), this.uploader.style.display = "none", this.options.mime_type.length && this.uploader.setAttribute("accept", this.options.mime_type), this.options.enable_drag_drop === !0 && this.options.hide_input === !0 || (this.clickHandler = function(c) {
              t.uploader.dispatchEvent(new window.MouseEvent("click", { view: window, bubbles: !0, cancelable: !1 }));
            }, this.browseButton = this.getButton(this.options.title, this.options.icon, this.options.title), this.browseButton.addEventListener("click", this.clickHandler), this.fileDisplay = this.theme.getFormInputField("input"), this.fileDisplay.setAttribute("readonly", !0), this.fileDisplay.value = "No file selected.", this.fileDisplay.addEventListener("dblclick", this.clickHandler), this.fileUploadGroup = this.theme.getInputGroup(this.fileDisplay, [this.browseButton]), this.fileUploadGroup || (this.fileUploadGroup = document.createElement("div"), this.fileUploadGroup.appendChild(this.fileDisplay), this.fileUploadGroup.appendChild(this.browseButton))), this.options.enable_drag_drop === !0) {
              if (this.options.alt_drop_zone !== "") {
                if (this.altDropZone = document.querySelector(this.options.alt_drop_zone), !this.altDropZone) throw new Error('Error: alt_drop_zone selector "'.concat(this.options.alt_drop_zone, '" not found!'));
                this.dropZone = this.altDropZone;
              } else this.dropZone = this.theme.getDropZone(this.options.drop_zone_text);
              this.dropZone && (this.dropZone.classList.add("upload-dropzone"), this.dropZone.addEventListener("dblclick", this.clickHandler));
            }
            this.uploadHandler = function(c) {
              c.preventDefault(), c.stopPropagation();
              var h = c.target.files || c.dataTransfer.files;
              if (h && h.length) if (t.options.max_upload_size !== 0 && h[0].size > t.options.max_upload_size) t.theme.addInputError(t.uploader, "".concat(t.translate("upload_max_size"), " ").concat(t.options.max_upload_size));
              else if (t.options.mime_type.length === 0 || t.isValidMimeType(h[0].type, t.options.mime_type)) {
                t.fileDisplay && (t.fileDisplay.value = h[0].name);
                var b = new window.FileReader();
                b.onload = function(k) {
                  t.preview_value = k.target.result, t.refreshPreview(h), t.onChange(!0), b = null;
                }, b.readAsDataURL(h[0]);
              } else t.theme.addInputError(t.uploader, "".concat(t.translate("upload_wrong_file_format"), " ").concat(t.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(c) {
              var h = c.dataTransfer.items || c.dataTransfer.files, b = h && h.length && (t.options.mime_type.length === 0 || t.isValidMimeType(h[0].type, t.options.mime_type)), k = c.currentTarget.classList && c.currentTarget.classList.contains("upload-dropzone") && b;
              switch ((c.currentTarget === window ? "w_" : "e_") + c.type) {
                case "w_drop":
                case "w_dragover":
                  k || (c.dataTransfer.dropEffect = "none");
                  break;
                case "e_dragenter":
                  k ? (t.dropZone.classList.add("valid-dropzone"), c.dataTransfer.dropEffect = "copy") : t.dropZone.classList.add("invalid-dropzone");
                  break;
                case "e_dragover":
                  k && (c.dataTransfer.dropEffect = "copy");
                  break;
                case "e_dragleave":
                  t.dropZone.classList.remove("valid-dropzone", "invalid-dropzone");
                  break;
                case "e_drop":
                  t.dropZone.classList.remove("valid-dropzone", "invalid-dropzone"), k && t.uploadHandler(c);
              }
              k || c.preventDefault();
            }, this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(c) {
              window.addEventListener(c, t.dragHandler, !0);
            }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(c) {
              t.dropZone.addEventListener(c, t.dragHandler, !0);
            }));
          }
          this.preview = document.createElement("div"), this.control = this.input.controlgroup = this.theme.getFormControl(this.label, this.uploader || this.input, this.description, this.infoButton), this.uploader && (this.uploader.controlgroup = this.control);
          var e = this.uploader || this.input, i = document.createElement("div");
          this.dropZone && !this.altDropZone && this.options.drop_zone_top === !0 && i.appendChild(this.dropZone), this.fileUploadGroup && i.appendChild(this.fileUploadGroup), this.dropZone && !this.altDropZone && this.options.drop_zone_top !== !0 && i.appendChild(this.dropZone), i.appendChild(this.preview), e.parentNode.insertBefore(i, e.nextSibling), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.afterInputReady();
          });
        } }, { key: "afterInputReady", value: function() {
          var t = this;
          if (this.value) {
            var e = document.createElement("img");
            e.style.maxWidth = "100%", e.style.maxHeight = "100px", e.onload = function(i) {
              t.preview.appendChild(e);
            }, e.onerror = function(i) {
              console.error("upload error", i, i.currentTarget);
            }, e.src = this.container.querySelector("a").href;
          }
          this.theme.afterInputReady(this.input);
        } }, { key: "refreshPreview", value: function(t) {
          var e = this;
          if (this.last_preview !== this.preview_value && (this.last_preview = this.preview_value, this.preview.innerHTML = "", this.preview_value)) {
            var i = t[0], c = this.preview_value.match(/^data:([^;,]+)[;,]/);
            if (i.mimeType = c ? c[1] : "unknown", i.size > 0) {
              var h = Math.floor(Math.log(i.size) / Math.log(1024));
              i.formattedSize = "".concat(parseFloat((i.size / Math.pow(1024, h)).toFixed(2)), " ").concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][h]);
            } else i.formattedSize = "0 Bytes";
            var b = this.getButton("button_upload", "upload", "button_upload");
            b.addEventListener("click", function(k) {
              k.preventDefault(), b.setAttribute("disabled", "disabled"), e.theme.removeInputError(e.uploader), e.theme.getProgressBar && (e.progressBar = e.theme.getProgressBar(), e.preview.appendChild(e.progressBar)), e.options.upload_handler(e.path, i, { success: function(E) {
                e.setValue(E), e.parent ? e.parent.onChildEditorChange(e) : e.jsoneditor.onChange(), e.progressBar && e.preview.removeChild(e.progressBar), b.removeAttribute("disabled");
              }, failure: function(E) {
                e.theme.addInputError(e.uploader, E), e.progressBar && e.preview.removeChild(e.progressBar), b.removeAttribute("disabled");
              }, updateProgress: function(E) {
                e.progressBar && (E ? e.theme.updateProgressBar(e.progressBar, E) : e.theme.updateProgressBarUnknown(e.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, b, this.preview_value)), this.options.auto_upload && (b.dispatchEvent(new window.MouseEvent("click")), b.parentNode.removeChild(b));
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), ki(Hn(n.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(t) {
          t && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), ki(Hn(n.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(t) {
          t = this.applyConstFilter(t), this.value !== t && (this.value = t, this.input.value = this.value, this.onChange());
        } }, { key: "destroy", value: function() {
          var t = this;
          this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(e) {
            window.removeEventListener(e, t.dragHandler, !0);
          }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(e) {
            t.dropZone.removeEventListener(e, t.dragHandler, !0);
          }), this.dropZone.removeEventListener("dblclick", this.clickHandler), this.dropZone && this.dropZone.parentNode && this.dropZone.parentNode.removeChild(this.dropZone)), this.uploader && this.uploader.parentNode && (this.uploader.removeEventListener("change", this.uploadHandler), this.uploader.parentNode.removeChild(this.uploader)), this.browseButton && this.browseButton.parentNode && (this.browseButton.removeEventListener("click", this.clickHandler), this.browseButton.parentNode.removeChild(this.browseButton)), this.fileDisplay && this.fileDisplay.parentNode && (this.fileDisplay.removeEventListener("dblclick", this.clickHandler), this.fileDisplay.parentNode.removeChild(this.fileDisplay)), this.fileUploadGroup && this.fileUploadGroup.parentNode && this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup), this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.header && this.header.parentNode && this.header.parentNode.removeChild(this.header), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), ki(Hn(n.prototype), "destroy", this).call(this);
        } }, { key: "isValidMimeType", value: function(t, e) {
          return e.reduce(function(i, c) {
            return i || new RegExp(c.replace(/\*/g, ".*"), "gi").test(t);
          }, !1);
        } }]) && Sd(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(F), uuid: function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Rd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && us(t, e);
        }(n, o), r = n, (s = [{ key: "preBuild", value: function() {
          xi(Vn(n.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          xi(Vn(n.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(t) {
          return this.testUuid(t) || (t = this.uuid), t;
        } }, { key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t), this.testUuid(t) || (t = this.uuid), this.uuid = t, xi(Vn(n.prototype), "setValue", this).call(this, t, e, i);
        } }, { key: "getUuid", value: function() {
          return A();
        } }, { key: "testUuid", value: function(t) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t);
        } }]) && Ld(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt), colorpicker: function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Nd(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && hs(t, e);
        }(n, o), r = n, (s = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(t, e, i) {
          t = this.applyConstFilter(t);
          var c = or(Qe(n.prototype), "setValue", this).call(this, t, e, i);
          return this.picker_instance && this.picker_instance.domElement && c && c.changed && this.picker_instance.setColor(c.value, !0), c;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          or(Qe(n.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (or(Qe(n.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var t = this.picker_instance.domElement.querySelectorAll("button"), e = 0; e < t.length; e++) t[e].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (or(Qe(n.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var t = this.picker_instance.domElement.querySelectorAll("button"), e = 0; e < t.length; e++) t[e].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), or(Qe(n.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(t) {
          var e = this;
          if (t) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", v({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), c = function(h) {
                var b = e.picker_instance.settings.editorFormat, k = e.picker_instance.settings.alpha;
                e.setValue(b === "hex" ? k ? h.hex : h.hex.slice(0, 7) : h["".concat(b + (k ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = c) : i.onChange = c, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && Id(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(lt) };
      function gl(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      var _l = {}, ds = "en", Fd = ds;
      _l.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(Xi).forEach(function(o) {
        var n = function(t, e) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(t) || function(i, c) {
            var h = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (h != null) {
              var b, k, E, I, $ = [], W = !0, X = !1;
              try {
                if (E = (h = h.call(i)).next, c !== 0) for (; !(W = (b = E.call(h)).done) && ($.push(b.value), $.length !== c); W = !0) ;
              } catch (dt) {
                X = !0, k = dt;
              } finally {
                try {
                  if (!W && h.return != null && (I = h.return(), Object(I) !== I)) return;
                } finally {
                  if (X) throw k;
                }
              }
              return $;
            }
          }(t, e) || function(i, c) {
            if (i) {
              if (typeof i == "string") return gl(i, c);
              var h = Object.prototype.toString.call(i).slice(8, -1);
              return h === "Object" && i.constructor && (h = i.constructor.name), h === "Map" || h === "Set" ? Array.from(i) : h === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h) ? gl(i, c) : void 0;
            }
          }(t, e) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(o, 2), r = n[0], s = n[1];
        Xi[r].options = s.options || {};
      });
      var sr = { options: { upload: function(o, n, r) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: Xi, languages: _l, resolvers: g, custom_validators: [], default_language: ds, language: Fd, translate: function(o, n, r) {
        var s = {};
        r && r.options && r.options.error_messages && r.options.error_messages[sr.language] && (s = r.options.error_messages[sr.language]);
        var t = sr.languages[sr.language];
        if (!t) throw new Error("Unknown language ".concat(sr.language));
        var e = s[o] || t[o] || sr.languages[ds][o] || o;
        if (n) for (var i = 0; i < n.length; i++) e = e.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), n[i]);
        return e;
      }, translateProperty: function(o, n) {
        return o;
      } };
      function ar() {
        ar = function() {
          return n;
        };
        var o, n = {}, r = Object.prototype, s = r.hasOwnProperty, t = Object.defineProperty || function(z, V, J) {
          z[V] = J.value;
        }, e = typeof Symbol == "function" ? Symbol : {}, i = e.iterator || "@@iterator", c = e.asyncIterator || "@@asyncIterator", h = e.toStringTag || "@@toStringTag";
        function b(z, V, J) {
          return Object.defineProperty(z, V, { value: J, enumerable: !0, configurable: !0, writable: !0 }), z[V];
        }
        try {
          b({}, "");
        } catch {
          b = function(V, J, gt) {
            return V[J] = gt;
          };
        }
        function k(z, V, J, gt) {
          var ot = V && V.prototype instanceof jt ? V : jt, At = Object.create(ot.prototype), Ut = new rn(gt || []);
          return t(At, "_invoke", { value: we(z, J, Ut) }), At;
        }
        function E(z, V, J) {
          try {
            return { type: "normal", arg: z.call(V, J) };
          } catch (gt) {
            return { type: "throw", arg: gt };
          }
        }
        n.wrap = k;
        var I = "suspendedStart", $ = "suspendedYield", W = "executing", X = "completed", dt = {};
        function jt() {
        }
        function xt() {
        }
        function It() {
        }
        var Ht = {};
        b(Ht, i, function() {
          return this;
        });
        var $t = Object.getPrototypeOf, vt = $t && $t($t(je([])));
        vt && vt !== r && s.call(vt, i) && (Ht = vt);
        var kt = It.prototype = jt.prototype = Object.create(Ht);
        function Wt(z) {
          ["next", "throw", "return"].forEach(function(V) {
            b(z, V, function(J) {
              return this._invoke(V, J);
            });
          });
        }
        function oe(z, V) {
          function J(ot, At, Ut, se) {
            var ae = E(z[ot], z, At);
            if (ae.type !== "throw") {
              var Te = ae.arg, Ge = Te.value;
              return Ge && be(Ge) == "object" && s.call(Ge, "__await") ? V.resolve(Ge.__await).then(function(ke) {
                J("next", ke, Ut, se);
              }, function(ke) {
                J("throw", ke, Ut, se);
              }) : V.resolve(Ge).then(function(ke) {
                Te.value = ke, Ut(Te);
              }, function(ke) {
                return J("throw", ke, Ut, se);
              });
            }
            se(ae.arg);
          }
          var gt;
          t(this, "_invoke", { value: function(ot, At) {
            function Ut() {
              return new V(function(se, ae) {
                J(ot, At, se, ae);
              });
            }
            return gt = gt ? gt.then(Ut, Ut) : Ut();
          } });
        }
        function we(z, V, J) {
          var gt = I;
          return function(ot, At) {
            if (gt === W) throw Error("Generator is already running");
            if (gt === X) {
              if (ot === "throw") throw At;
              return { value: o, done: !0 };
            }
            for (J.method = ot, J.arg = At; ; ) {
              var Ut = J.delegate;
              if (Ut) {
                var se = zn(Ut, J);
                if (se) {
                  if (se === dt) continue;
                  return se;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (gt === I) throw gt = X, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              gt = W;
              var ae = E(z, V, J);
              if (ae.type === "normal") {
                if (gt = J.done ? X : $, ae.arg === dt) continue;
                return { value: ae.arg, done: J.done };
              }
              ae.type === "throw" && (gt = X, J.method = "throw", J.arg = ae.arg);
            }
          };
        }
        function zn(z, V) {
          var J = V.method, gt = z.iterator[J];
          if (gt === o) return V.delegate = null, J === "throw" && z.iterator.return && (V.method = "return", V.arg = o, zn(z, V), V.method === "throw") || J !== "return" && (V.method = "throw", V.arg = new TypeError("The iterator does not provide a '" + J + "' method")), dt;
          var ot = E(gt, z.iterator, V.arg);
          if (ot.type === "throw") return V.method = "throw", V.arg = ot.arg, V.delegate = null, dt;
          var At = ot.arg;
          return At ? At.done ? (V[z.resultName] = At.value, V.next = z.nextLoc, V.method !== "return" && (V.method = "next", V.arg = o), V.delegate = null, dt) : At : (V.method = "throw", V.arg = new TypeError("iterator result is not an object"), V.delegate = null, dt);
        }
        function si(z) {
          var V = { tryLoc: z[0] };
          1 in z && (V.catchLoc = z[1]), 2 in z && (V.finallyLoc = z[2], V.afterLoc = z[3]), this.tryEntries.push(V);
        }
        function Rt(z) {
          var V = z.completion || {};
          V.type = "normal", delete V.arg, z.completion = V;
        }
        function rn(z) {
          this.tryEntries = [{ tryLoc: "root" }], z.forEach(si, this), this.reset(!0);
        }
        function je(z) {
          if (z || z === "") {
            var V = z[i];
            if (V) return V.call(z);
            if (typeof z.next == "function") return z;
            if (!isNaN(z.length)) {
              var J = -1, gt = function ot() {
                for (; ++J < z.length; ) if (s.call(z, J)) return ot.value = z[J], ot.done = !1, ot;
                return ot.value = o, ot.done = !0, ot;
              };
              return gt.next = gt;
            }
          }
          throw new TypeError(be(z) + " is not iterable");
        }
        return xt.prototype = It, t(kt, "constructor", { value: It, configurable: !0 }), t(It, "constructor", { value: xt, configurable: !0 }), xt.displayName = b(It, h, "GeneratorFunction"), n.isGeneratorFunction = function(z) {
          var V = typeof z == "function" && z.constructor;
          return !!V && (V === xt || (V.displayName || V.name) === "GeneratorFunction");
        }, n.mark = function(z) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(z, It) : (z.__proto__ = It, b(z, h, "GeneratorFunction")), z.prototype = Object.create(kt), z;
        }, n.awrap = function(z) {
          return { __await: z };
        }, Wt(oe.prototype), b(oe.prototype, c, function() {
          return this;
        }), n.AsyncIterator = oe, n.async = function(z, V, J, gt, ot) {
          ot === void 0 && (ot = Promise);
          var At = new oe(k(z, V, J, gt), ot);
          return n.isGeneratorFunction(V) ? At : At.next().then(function(Ut) {
            return Ut.done ? Ut.value : At.next();
          });
        }, Wt(kt), b(kt, h, "Generator"), b(kt, i, function() {
          return this;
        }), b(kt, "toString", function() {
          return "[object Generator]";
        }), n.keys = function(z) {
          var V = Object(z), J = [];
          for (var gt in V) J.push(gt);
          return J.reverse(), function ot() {
            for (; J.length; ) {
              var At = J.pop();
              if (At in V) return ot.value = At, ot.done = !1, ot;
            }
            return ot.done = !0, ot;
          };
        }, n.values = je, rn.prototype = { constructor: rn, reset: function(z) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Rt), !z) for (var V in this) V.charAt(0) === "t" && s.call(this, V) && !isNaN(+V.slice(1)) && (this[V] = o);
        }, stop: function() {
          this.done = !0;
          var z = this.tryEntries[0].completion;
          if (z.type === "throw") throw z.arg;
          return this.rval;
        }, dispatchException: function(z) {
          if (this.done) throw z;
          var V = this;
          function J(ae, Te) {
            return At.type = "throw", At.arg = z, V.next = ae, Te && (V.method = "next", V.arg = o), !!Te;
          }
          for (var gt = this.tryEntries.length - 1; gt >= 0; --gt) {
            var ot = this.tryEntries[gt], At = ot.completion;
            if (ot.tryLoc === "root") return J("end");
            if (ot.tryLoc <= this.prev) {
              var Ut = s.call(ot, "catchLoc"), se = s.call(ot, "finallyLoc");
              if (Ut && se) {
                if (this.prev < ot.catchLoc) return J(ot.catchLoc, !0);
                if (this.prev < ot.finallyLoc) return J(ot.finallyLoc);
              } else if (Ut) {
                if (this.prev < ot.catchLoc) return J(ot.catchLoc, !0);
              } else {
                if (!se) throw Error("try statement without catch or finally");
                if (this.prev < ot.finallyLoc) return J(ot.finallyLoc);
              }
            }
          }
        }, abrupt: function(z, V) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var gt = this.tryEntries[J];
            if (gt.tryLoc <= this.prev && s.call(gt, "finallyLoc") && this.prev < gt.finallyLoc) {
              var ot = gt;
              break;
            }
          }
          ot && (z === "break" || z === "continue") && ot.tryLoc <= V && V <= ot.finallyLoc && (ot = null);
          var At = ot ? ot.completion : {};
          return At.type = z, At.arg = V, ot ? (this.method = "next", this.next = ot.finallyLoc, dt) : this.complete(At);
        }, complete: function(z, V) {
          if (z.type === "throw") throw z.arg;
          return z.type === "break" || z.type === "continue" ? this.next = z.arg : z.type === "return" ? (this.rval = this.arg = z.arg, this.method = "return", this.next = "end") : z.type === "normal" && V && (this.next = V), dt;
        }, finish: function(z) {
          for (var V = this.tryEntries.length - 1; V >= 0; --V) {
            var J = this.tryEntries[V];
            if (J.finallyLoc === z) return this.complete(J.completion, J.afterLoc), Rt(J), dt;
          }
        }, catch: function(z) {
          for (var V = this.tryEntries.length - 1; V >= 0; --V) {
            var J = this.tryEntries[V];
            if (J.tryLoc === z) {
              var gt = J.completion;
              if (gt.type === "throw") {
                var ot = gt.arg;
                Rt(J);
              }
              return ot;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(z, V, J) {
          return this.delegate = { iterator: je(z), resultName: V, nextLoc: J }, this.method === "next" && (this.arg = o), dt;
        } }, n;
      }
      function wl(o, n, r, s, t, e, i) {
        try {
          var c = o[e](i), h = c.value;
        } catch (b) {
          return void r(b);
        }
        c.done ? n(h) : Promise.resolve(h).then(s, t);
      }
      function jl(o) {
        return function() {
          var n = this, r = arguments;
          return new Promise(function(s, t) {
            var e = o.apply(n, r);
            function i(h) {
              wl(e, s, t, i, c, "next", h);
            }
            function c(h) {
              wl(e, s, t, i, c, "throw", h);
            }
            i(void 0);
          });
        };
      }
      function lr(o, n) {
        return function(r) {
          if (Array.isArray(r)) return r;
        }(o) || function(r, s) {
          var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
          if (t != null) {
            var e, i, c, h, b = [], k = !0, E = !1;
            try {
              if (c = (t = t.call(r)).next, s !== 0) for (; !(k = (e = c.call(t)).done) && (b.push(e.value), b.length !== s); k = !0) ;
            } catch (I) {
              E = !0, i = I;
            } finally {
              try {
                if (!k && t.return != null && (h = t.return(), Object(h) !== h)) return;
              } finally {
                if (E) throw i;
              }
            }
            return b;
          }
        }(o, n) || function(r, s) {
          if (r) {
            if (typeof r == "string") return kl(r, s);
            var t = Object.prototype.toString.call(r).slice(8, -1);
            return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? kl(r, s) : void 0;
          }
        }(o, n) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function kl(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function be(o) {
        return be = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, be(o);
      }
      function Dd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Md(s.key), s);
        }
      }
      function Md(o) {
        var n = function(r, s) {
          if (be(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (be(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return be(n) == "symbol" ? n : n + "";
      }
      _(1688);
      var Hd = function() {
        return o = function t(e) {
          (function(i, c) {
            if (!(i instanceof c)) throw new TypeError("Cannot call a class as a function");
          })(this, t), this.options = e || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            be(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            be(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var c = this;
            Object.entries(i.anyOf).forEach(function(h) {
              var b = lr(h, 2), k = b[0], E = b[1];
              i.anyOf[k] = c.expandSchema(E);
            });
          }, dependencies: function(i) {
            var c = this;
            Object.entries(i.dependencies).forEach(function(h) {
              var b = lr(h, 2), k = b[0], E = b[1];
              be(E) !== "object" || Array.isArray(E) || (i.dependencies[k] = c.expandSchema(E));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, c) {
            var h = this, b = v({}, c);
            return Object.entries(i.allOf).forEach(function(k) {
              var E = lr(k, 2), I = E[0], $ = E[1];
              i.allOf[I] = h.expandRefs($, !0), b = h.extendSchemas(b, h.expandSchema($));
            }), delete b.allOf, b;
          }, extends: function(i, c) {
            var h, b = this;
            return delete (h = Array.isArray(i.extends) ? i.extends.reduce(function(k, E, I) {
              return b.extendSchemas(k, b.expandSchema(E));
            }, c) : this.extendSchemas(c, this.expandSchema(i.extends))).extends, h;
          }, oneOf: function(i, c) {
            var h = this, b = v({}, c);
            return delete b.oneOf, i.oneOf.reduce(function(k, E, I) {
              return k.oneOf[I] = h.extendSchemas(h.expandSchema(E), b), k;
            }, c), c;
          } };
        }, n = [{ key: "load", value: (s = jl(ar().mark(function t(e, i, c) {
          return ar().wrap(function(h) {
            for (; ; ) switch (h.prev = h.next) {
              case 0:
                return this.schema = e, h.next = 3, this._asyncloadExternalRefs(e, i, this._getFileBase(c), !0);
              case 3:
                return h.abrupt("return", this.expandRefs(e));
              case 4:
              case "end":
                return h.stop();
            }
          }, t, this);
        })), function(t, e, i) {
          return s.apply(this, arguments);
        }) }, { key: "expandRefs", value: function(t, e) {
          var i = this, c = v({}, t);
          if (!c.$ref) return c;
          var h = c.$ref.split("#");
          if (h.length === 2 && !this.refs_with_info[c.$ref]) {
            var b = this.expandRecursivePointer(this.schema, h[1]), k = this.extendSchemas(c, this.expandSchema(b));
            return delete k.$ref, k;
          }
          var E = h.length > 2 ? this.refs_with_info["#" + h[1]] : this.refs_with_info[c.$ref];
          delete c.$ref;
          var I = E.$ref.startsWith("#") ? E.fetchUrl : "", $ = this._getRef(I, E);
          if (this.refs[$]) {
            if (e && x(this.refs[$], "allOf")) {
              var W = this.refs[$].allOf;
              Object.keys(W).forEach(function(X) {
                W[X] = i.expandRefs(W[X], !0);
              });
            }
          } else console.warn("reference:'".concat($, "' not found!"));
          return h.length > 2 ? this.extendSchemas(c, this.expandSchema(this.expandRecursivePointer(this.refs[$], h[2]))) : this.extendSchemas(c, this.expandSchema(this.refs[$]));
        } }, { key: "expandRecursivePointer", value: function(t, e) {
          var i = t;
          return e.split("/").slice(1).forEach(function(c) {
            i[c] && (i = i[c]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(t, i.$refs) : i;
        } }, { key: "expandSchema", value: function(t) {
          var e = this;
          Object.entries(this._subSchema1).forEach(function(c) {
            var h = lr(c, 2), b = h[0], k = h[1];
            t[b] && k.call(e, t);
          });
          var i = v({}, t);
          return Object.entries(this._subSchema2).forEach(function(c) {
            var h = lr(c, 2), b = h[0], k = h[1];
            t[b] && (i = k.call(e, t, i));
          }), this.expandRefs(i);
        } }, { key: "_getRef", value: function(t, e) {
          var i = t + e;
          return this.refs[i] ? i : t + decodeURIComponent(e.$ref);
        } }, { key: "_expandSubSchema", value: function(t) {
          var e = this;
          return Array.isArray(t) ? t.map(function(i) {
            return be(i) === "object" ? e.expandSchema(i) : i;
          }) : this.expandSchema(t);
        } }, { key: "_manageRecursivePointer", value: function(t, e) {
          Object.keys(t).forEach(function(i) {
            t[i] !== null && t[i].$ref && t[i].$ref.indexOf("#") === 0 && (t[i].$ref = e + t[i].$ref);
          });
        } }, { key: "_getExternalRefs", value: function(t, e) {
          var i = this, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
          c || this._manageRecursivePointer(t, e);
          var h = {}, b = function(W) {
            return Object.keys(W).forEach(function(X) {
              h[X] = !0;
            });
          };
          if (t.$ref && be(t.$ref) !== "object" && (t.$ref.indexOf("#") !== 0 || !c)) {
            var k = t.$ref, E = "";
            k.indexOf("#") > 0 && (k = k.substr(0, k.indexOf("#"))), k !== t.$ref && (E = t.$ref.substr(t.$ref.indexOf("#")));
            var I = this.refs_prefix + this.refs_counter++, $ = I + E;
            t.$ref.substr(0, 1) === "#" || this.refs[t.$ref] || (h[k] = !0), this.refs_with_info[I] = { fetchUrl: e, $ref: k }, t.$ref = $;
          }
          return Object.values(t).forEach(function(W) {
            W && be(W) === "object" && (Array.isArray(W) ? Object.values(W).forEach(function(X) {
              X && be(X) === "object" && b(i._getExternalRefs(X, e, c));
            }) : W.$ref && typeof W.$ref == "string" && W.$ref.startsWith("#") || b(i._getExternalRefs(W, e, c)));
          }), t.id && typeof t.id == "string" && t.id.substr(0, 4) === "urn:" ? this.refs[t.id] = t : t.$id && typeof t.$id == "string" && t.$id.substr(0, 4) === "urn:" && (this.refs[t.$id] = t), h;
        } }, { key: "_getFileBase", value: function(t) {
          if (!t) return "/";
          var e = this.options.ajaxBase;
          return e === void 0 ? this._getFileBaseFromFileLocation(t) : e;
        } }, { key: "_getFileBaseFromFileLocation", value: function(t) {
          var e = t.split("/");
          return e.pop(), "".concat(e.join("/"), "/");
        } }, { key: "_joinUrl", value: function(t, e) {
          var i = t;
          return t.substr(0, 7) !== "http://" && t.substr(0, 8) !== "https://" && t.substr(0, 5) !== "blob:" && t.substr(0, 5) !== "data:" && t.substr(0, 1) !== "#" && t.substr(0, 1) !== "/" && (i = e + t), i.indexOf("#") > 0 && (i = i.substr(0, i.indexOf("#"))), i;
        } }, { key: "_isUniformResourceName", value: function(t) {
          return t.substr(0, 4) === "urn:";
        } }, { key: "_asyncloadExternalRefs", value: (r = jl(ar().mark(function t(e, i, c) {
          var h, b, k, E, I, $, W = this, X = arguments;
          return ar().wrap(function(dt) {
            for (; ; ) switch (dt.prev = dt.next) {
              case 0:
                h = X.length > 3 && X[3] !== void 0 && X[3], b = this._getExternalRefs(e, i, h), k = 0, E = ar().mark(function jt() {
                  var xt, It, Ht, $t, vt, kt, Wt, oe, we, zn, si;
                  return ar().wrap(function(Rt) {
                    for (; ; ) switch (Rt.prev = Rt.next) {
                      case 0:
                        if ((xt = $[I]) !== void 0) {
                          Rt.next = 3;
                          break;
                        }
                        return Rt.abrupt("return", 0);
                      case 3:
                        if (!W.refs[xt]) {
                          Rt.next = 5;
                          break;
                        }
                        return Rt.abrupt("return", 0);
                      case 5:
                        if (!W._isUniformResourceName(xt)) {
                          Rt.next = 40;
                          break;
                        }
                        if (W.refs[xt] = "loading", k++, It = W.options.urn_resolver, Ht = xt, typeof It == "function") {
                          Rt.next = 13;
                          break;
                        }
                        throw console.log('No "urn_resolver" callback defined to resolve "'.concat(Ht, '"')), new Error("Must set urn_resolver option to a callback to resolve ".concat(Ht));
                      case 13:
                        return Ht.indexOf("#") > 0 && (Ht = Ht.substr(0, Ht.indexOf("#"))), Rt.prev = 14, Rt.next = 17, It(Ht);
                      case 17:
                        $t = Rt.sent, Rt.prev = 18, vt = JSON.parse($t), Rt.next = 26;
                        break;
                      case 22:
                        throw Rt.prev = 22, Rt.t0 = Rt.catch(18), console.log(Rt.t0), new Error("Failed to parse external ref ".concat(Ht));
                      case 26:
                        if (!(typeof vt != "boolean" && be(vt) !== "object" || vt === null || Array.isArray(vt))) {
                          Rt.next = 28;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(Ht));
                      case 28:
                        return W.refs[xt] = vt, Rt.next = 31, W._asyncloadExternalRefs(vt, xt, c);
                      case 31:
                        Rt.next = 37;
                        break;
                      case 33:
                        throw Rt.prev = 33, Rt.t1 = Rt.catch(14), console.log(Rt.t1), new Error("Failed to parse external ref ".concat(Ht));
                      case 37:
                        if (typeof $t != "boolean") {
                          Rt.next = 39;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(Ht));
                      case 39:
                        return Rt.abrupt("return", 0);
                      case 40:
                        if (W.options.ajax) {
                          Rt.next = 42;
                          break;
                        }
                        throw new Error("Must set ajax option to true to load external ref ".concat(xt));
                      case 42:
                        if (k++, kt = W._joinUrl(xt, c), W.options.ajax_cache_responses && (oe = W.cacheGet(kt)) && (Wt = oe), Wt) {
                          Rt.next = 61;
                          break;
                        }
                        return Rt.next = 48, new Promise(function(rn) {
                          var je = new XMLHttpRequest();
                          W.options.ajaxCredentials && (je.withCredentials = W.options.ajaxCredentials), je.overrideMimeType("application/json"), je.open("GET", kt, !0), je.onload = function() {
                            rn(je);
                          }, je.onerror = function(z) {
                            rn(void 0);
                          }, je.send();
                        });
                      case 48:
                        if ((we = Rt.sent) !== void 0) {
                          Rt.next = 51;
                          break;
                        }
                        throw new Error("Failed to fetch ref via ajax - ".concat(xt));
                      case 51:
                        Rt.prev = 51, Wt = JSON.parse(we.responseText), W.onSchemaLoaded({ schema: Wt, schemaUrl: kt }), W.options.ajax_cache_responses && W.cacheSet(kt, Wt), Rt.next = 61;
                        break;
                      case 57:
                        throw Rt.prev = 57, Rt.t2 = Rt.catch(51), console.log(Rt.t2), new Error("Failed to parse external ref ".concat(kt));
                      case 61:
                        if (!(typeof Wt != "boolean" && be(Wt) !== "object" || Wt === null || Array.isArray(Wt))) {
                          Rt.next = 63;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(kt));
                      case 63:
                        return W.refs[xt] = Wt, zn = W._getFileBaseFromFileLocation(kt), kt !== xt && (si = kt.split("/"), kt = (xt.substr(0, 1) === "/" ? "/" : "") + si.pop()), Rt.next = 68, W._asyncloadExternalRefs(Wt, kt, zn);
                      case 68:
                      case "end":
                        return Rt.stop();
                    }
                  }, jt, null, [[14, 33], [18, 22], [51, 57]]);
                }), I = 0, $ = Object.keys(b);
              case 5:
                if (!(I < $.length)) {
                  dt.next = 13;
                  break;
                }
                return dt.delegateYield(E(), "t0", 7);
              case 7:
                if (dt.t0 !== 0) {
                  dt.next = 10;
                  break;
                }
                return dt.abrupt("continue", 10);
              case 10:
                I++, dt.next = 5;
                break;
              case 13:
                if (k) {
                  dt.next = 15;
                  break;
                }
                return dt.abrupt("return", !0);
              case 15:
                this.onAllSchemasLoaded();
              case 16:
              case "end":
                return dt.stop();
            }
          }, t, this);
        })), function(t, e, i) {
          return r.apply(this, arguments);
        }) }, { key: "onSchemaLoaded", value: function(t) {
        } }, { key: "onAllSchemasLoaded", value: function() {
        } }, { key: "extendSchemas", value: function(t, e) {
          var i = this;
          t = v({}, t), e = v({}, e);
          var c = {}, h = function(b) {
            typeof b == "string" && (b = [b]), typeof e.type == "string" && (e.type = [e.type]), e.type && e.type.length ? c.type = b.filter(function(k) {
              return e.type.includes(k);
            }) : c.type = b, c.type.length === 1 && typeof c.type[0] == "string" ? c.type = c.type[0] : c.type.length === 0 && delete c.type;
          };
          return Object.entries(t).forEach(function(b) {
            var k = lr(b, 2), E = k[0], I = k[1];
            e[E] !== void 0 ? function($, W) {
              (function(X, dt) {
                return (X === "required" || X === "defaultProperties") && be(dt) === "object" && Array.isArray(dt);
              })($, W) ? c[$] = W.concat(e[$]).reduce(function(X, dt) {
                return X.includes(dt) || X.push(dt), X;
              }, []) : $ !== "type" || typeof W != "string" && !Array.isArray(W) ? be(W) !== "object" || Array.isArray(W) || W === null ? c[$] = W : c[$] = i.extendSchemas(W, e[$]) : h(W);
            }(E, I) : c[E] = I;
          }), Object.entries(e).forEach(function(b) {
            var k = lr(b, 2), E = k[0], I = k[1];
            t[E] === void 0 && (c[E] = I);
          }), c;
        } }, { key: "getCacheKey", value: function(t) {
          return ["je-cache", t].join("::");
        } }, { key: "getCacheBuster", value: function() {
          return this.options.ajax_cache_buster || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        } }, { key: "cacheSet", value: function(t, e) {
          try {
            window.localStorage.setItem(this.getCacheKey(t), JSON.stringify({ cacheBuster: this.getCacheBuster(), schema: e }));
          } catch (i) {
            console.error(i);
          }
        } }, { key: "cacheGet", value: function(t) {
          try {
            var e = window.localStorage.getItem(this.getCacheKey(t));
            if (e) {
              var i = JSON.parse(e);
              if (i.cacheBuster && i.schema && i.cacheBuster === this.getCacheBuster()) return i.schema;
              this.cacheDelete(t);
            }
          } catch (c) {
            console.error(c);
          }
        } }, { key: "cacheDelete", value: function(t) {
          window.localStorage.removeItem(this.getCacheKey(t));
        } }], n && Dd(o.prototype, n), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, n, r, s;
      }(), Vd = (_(2762), { default: function() {
        return { compile: function(o) {
          var n = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), r = n && n.length;
          if (!r) return function() {
            return o;
          };
          for (var s = [], t = function(i) {
            var c, h, b = n[i].replace(/[{}]+/g, "").trim().split("."), k = b.length;
            k > 1 ? c = function(E) {
              for (h = E, i = 0; i < k && (h = h[b[i]]); i++) ;
              return h;
            } : (b = b[0], c = function(E) {
              return E[b];
            }), s.push({ s: n[i], r: c });
          }, e = 0; e < r; e++) t(e);
          return function(i) {
            for (var c, h = "".concat(o), b = 0; b < r; b++) c = s[b], h = h.replace(c.s, c.r(i));
            return h;
          };
        } };
      }, ejs: function() {
        return !!window.EJS && { compile: function(o) {
          var n = new window.EJS({ text: o });
          return function(r) {
            return n.render(r);
          };
        } };
      }, handlebars: function() {
        return window.Handlebars;
      }, hogan: function() {
        return !!window.Hogan && { compile: function(o) {
          var n = window.Hogan.compile(o);
          return function(r) {
            return n.render(r);
          };
        } };
      }, lodash: function() {
        return !!window._ && { compile: function(o) {
          return function(n) {
            return window._.template(o)(n);
          };
        } };
      }, markup: function() {
        return !(!window.Mark || !window.Mark.up) && { compile: function(o) {
          return function(n) {
            return window.Mark.up(o, n);
          };
        } };
      }, mustache: function() {
        return !!window.Mustache && { compile: function(o) {
          return function(n) {
            return window.Mustache.render(o, n);
          };
        } };
      }, swig: function() {
        return window.swig;
      }, underscore: function() {
        return !!window._ && { compile: function(o) {
          return function(n) {
            return window._.template(o)(n);
          };
        } };
      } });
      function Oi(o) {
        return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Oi(o);
      }
      function ps(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function zd(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, qd(s.key), s);
        }
      }
      function qd(o) {
        var n = function(r, s) {
          if (Oi(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Oi(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Oi(n) == "symbol" ? n : n + "";
      }
      var Ud = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, yn = function() {
        return o = function r() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ud;
          (function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, r), this.mapping = t, this.icon_prefix = s;
        }, (n = [{ key: "getIconClass", value: function(r) {
          return this.mapping[r] ? this.icon_prefix + this.mapping[r] : this.icon_prefix + r;
        } }, { key: "getIcon", value: function(r) {
          var s, t = this.getIconClass(r);
          if (!t) return null;
          var e, i = document.createElement("i");
          return (s = i.classList).add.apply(s, function(c) {
            if (Array.isArray(c)) return ps(c);
          }(e = t.split(" ")) || function(c) {
            if (typeof Symbol < "u" && c[Symbol.iterator] != null || c["@@iterator"] != null) return Array.from(c);
          }(e) || function(c, h) {
            if (c) {
              if (typeof c == "string") return ps(c, h);
              var b = Object.prototype.toString.call(c).slice(8, -1);
              return b === "Object" && c.constructor && (b = c.constructor.name), b === "Map" || b === "Set" ? Array.from(c) : b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b) ? ps(c, h) : void 0;
            }
          }(e) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && zd(o.prototype, n), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, n;
      }();
      function fs(o) {
        return fs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, fs(o);
      }
      function $d(o, n, r) {
        return n = to(n), function(s, t) {
          if (t && (fs(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, xl() ? Reflect.construct(n, r, to(o).constructor) : n.apply(o, r));
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
      function to(o) {
        return to = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, to(o);
      }
      function ys(o, n) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ys(o, n);
      }
      var Gd = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Wd = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), $d(this, n, ["glyphicon glyphicon-", Gd]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && ys(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function ms(o) {
        return ms = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ms(o);
      }
      function Jd(o, n, r) {
        return n = eo(n), function(s, t) {
          if (t && (ms(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ol() ? Reflect.construct(n, r, eo(o).constructor) : n.apply(o, r));
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
      function eo(o) {
        return eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, eo(o);
      }
      function bs(o, n) {
        return bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, bs(o, n);
      }
      var Kd = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Zd = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Jd(this, n, ["icon-", Kd]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && bs(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function vs(o) {
        return vs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, vs(o);
      }
      function Yd(o, n, r) {
        return n = no(n), function(s, t) {
          if (t && (vs(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Cl() ? Reflect.construct(n, r, no(o).constructor) : n.apply(o, r));
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
      function no(o) {
        return no = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, no(o);
      }
      function gs(o, n) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, gs(o, n);
      }
      var Qd = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Xd = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Yd(this, n, ["fa fa-", Qd]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && gs(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function _s(o) {
        return _s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, _s(o);
      }
      function tp(o, n, r) {
        return n = ro(n), function(s, t) {
          if (t && (_s(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, El() ? Reflect.construct(n, r, ro(o).constructor) : n.apply(o, r));
      }
      function El() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (El = function() {
          return !!o;
        })();
      }
      function ro(o) {
        return ro = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, ro(o);
      }
      function ws(o, n) {
        return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ws(o, n);
      }
      var ep = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, np = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), tp(this, n, ["fas fa-", ep]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && ws(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function js(o) {
        return js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, js(o);
      }
      function rp(o, n, r) {
        return n = io(n), function(s, t) {
          if (t && (js(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Sl() ? Reflect.construct(n, r, io(o).constructor) : n.apply(o, r));
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
      function io(o) {
        return io = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, io(o);
      }
      function ks(o, n) {
        return ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, ks(o, n);
      }
      var ip = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, op = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), rp(this, n, ["ui-icon ui-icon-", ip]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && ks(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function xs(o) {
        return xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, xs(o);
      }
      function sp(o, n, r) {
        return n = oo(n), function(s, t) {
          if (t && (xs(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Pl() ? Reflect.construct(n, r, oo(o).constructor) : n.apply(o, r));
      }
      function Pl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Pl = function() {
          return !!o;
        })();
      }
      function oo(o) {
        return oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, oo(o);
      }
      function Os(o, n) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Os(o, n);
      }
      var ap = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, lp = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), sp(this, n, ["oi oi-", ap]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && Os(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function Cs(o) {
        return Cs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Cs(o);
      }
      function cp(o, n, r) {
        return n = so(n), function(s, t) {
          if (t && (Cs(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Tl() ? Reflect.construct(n, r, so(o).constructor) : n.apply(o, r));
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
      function so(o) {
        return so = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, so(o);
      }
      function Es(o, n) {
        return Es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Es(o, n);
      }
      var up = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, hp = function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), cp(this, n, ["icon icon-", up]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && Es(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn);
      function Ss(o) {
        return Ss = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ss(o);
      }
      function dp(o, n, r) {
        return n = ao(n), function(s, t) {
          if (t && (Ss(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ll() ? Reflect.construct(n, r, ao(o).constructor) : n.apply(o, r));
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
      function ao(o) {
        return ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, ao(o);
      }
      function Ps(o, n) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ps(o, n);
      }
      var pp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, fp = { bootstrap: function(o) {
        function n() {
          return function(s, t) {
            if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), dp(this, n, ["bi bi-", pp]);
        }
        return function(s, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          s.prototype = Object.create(t && t.prototype, { constructor: { value: s, writable: !0, configurable: !0 } }), Object.defineProperty(s, "prototype", { writable: !1 }), t && Ps(s, t);
        }(n, o), r = n, Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r;
      }(yn), bootstrap3: Wd, fontawesome3: Zd, fontawesome4: Xd, fontawesome5: np, jqueryui: op, openiconic: lp, spectre: hp };
      function Ci(o) {
        return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Ci(o);
      }
      function yp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, mp(s.key), s);
        }
      }
      function mp(o) {
        var n = function(r, s) {
          if (Ci(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Ci(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Ci(n) == "symbol" ? n : n + "";
      }
      var Al = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
        return o in document.documentElement;
      }), mn = function() {
        return o = function r(s) {
          var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { disable_theme_rules: !1 };
          (function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, r), this.jsoneditor = s, Object.keys(t).forEach(function(e) {
            s.options[e] !== void 0 && (t[e] = s.options[e]);
          }), this.options = t;
        }, n = [{ key: "getContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getOptInCheckbox", value: function(r) {
          var s = document.createElement("span"), t = this.getHiddenLabel(r + " opt-in");
          t.setAttribute("for", r + "-opt-in"), t.textContent = r + "-opt-in";
          var e = document.createElement("input");
          return e.setAttribute("type", "checkbox"), e.setAttribute("style", "margin: 0 10px 0 0;"), e.setAttribute("id", r + "-opt-in"), e.classList.add("json-editor-opt-in"), s.appendChild(e), s.appendChild(t), { label: t, checkbox: e, container: s };
        } }, { key: "getOptInSwitch", value: function(r) {
          return this.getOptInCheckbox();
        } }, { key: "getFloatRightLinkHolder", value: function() {
          var r = document.createElement("div");
          return r.classList.add("je-float-right-linkholder"), r;
        } }, { key: "getModal", value: function() {
          var r = document.createElement("div");
          return r.style.display = "none", r.classList.add("je-modal"), r;
        } }, { key: "getGridContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getGridRow", value: function() {
          var r = document.createElement("div");
          return r.classList.add("row"), r;
        } }, { key: "getGridColumn", value: function() {
          return document.createElement("div");
        } }, { key: "setGridColumnSize", value: function(r, s) {
        } }, { key: "getLink", value: function(r) {
          var s = document.createElement("a");
          return s.setAttribute("href", "#"), s.appendChild(document.createTextNode(r)), s;
        } }, { key: "disableHeader", value: function(r) {
          r.style.color = "#ccc";
        } }, { key: "disableLabel", value: function(r) {
          r.style.color = "#ccc";
        } }, { key: "enableHeader", value: function(r) {
          r.style.color = "";
        } }, { key: "enableLabel", value: function(r) {
          r.style.color = "";
        } }, { key: "getInfoButton", value: function(r) {
          var s = document.createElement("span");
          s.innerText = "ⓘ", s.classList.add("je-infobutton-icon");
          var t = document.createElement("span");
          return t.classList.add("je-infobutton-tooltip"), t.innerText = r, s.onmouseover = function() {
            t.style.visibility = "visible";
          }, s.onmouseleave = function() {
            t.style.visibility = "hidden";
          }, s.appendChild(t), s;
        } }, { key: "getFormInputLabel", value: function(r, s) {
          var t = document.createElement("label");
          return t.appendChild(document.createTextNode(r)), s && t.classList.add("required"), t;
        } }, { key: "getLabelLike", value: function(r, s) {
          var t = document.createElement("b");
          return t.appendChild(document.createTextNode(r)), s && t.classList.add("required"), t;
        } }, { key: "getHeader", value: function(r, s) {
          var t = document.createElement("span");
          return typeof r == "string" ? t.textContent = r : t.appendChild(r), t.classList.add("je-header"), t;
        } }, { key: "getCheckbox", value: function() {
          var r = this.getFormInputField("checkbox");
          return r.classList.add("je-checkbox"), r;
        } }, { key: "getCheckboxLabel", value: function(r, s) {
          var t = document.createElement("label");
          return t.appendChild(document.createTextNode(" ".concat(r))), s && t.classList.add("required"), t;
        } }, { key: "getMultiCheckboxHolder", value: function(r, s, t, e) {
          var i = document.createElement("div");
          return i.classList.add("control-group"), s && (s.style.display = "block", i.appendChild(s), e && s.appendChild(e)), Object.values(r).forEach(function(c) {
            c.style.display = "inline-block", c.style.marginRight = "20px", i.appendChild(c);
          }), t && i.appendChild(t), i;
        } }, { key: "getFormCheckboxControl", value: function(r, s, t) {
          var e = document.createElement("div");
          return e.appendChild(r), s.style.width = "auto", r.insertBefore(s, r.firstChild), t && e.classList.add("je-checkbox-control--compact"), e;
        } }, { key: "getFormRadio", value: function(r) {
          var s = this.getFormInputField("radio");
          return Object.keys(r).forEach(function(t) {
            return s.setAttribute(t, r[t]);
          }), s.classList.add("je-radio"), s;
        } }, { key: "getFormRadioLabel", value: function(r, s) {
          var t = document.createElement("label");
          return t.appendChild(document.createTextNode(" ".concat(r))), s && t.classList.add("required"), t;
        } }, { key: "getFormRadioControl", value: function(r, s, t, e) {
          var i = document.createElement("div");
          return i.appendChild(r), s.style.width = "auto", r.insertBefore(s, r.firstChild), t && i.classList.add("je-radio-control--compact"), s.tagName.toLowerCase() !== "div" && e && r && s && (s.setAttribute("id", e), s.setAttribute("aria-labelledby", e), r.setAttribute("for", e)), i;
        } }, { key: "getSelectInput", value: function(r, s) {
          var t = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], e = document.createElement("select");
          return r && this.setSelectOptions(e, r, [], t), e;
        } }, { key: "getSwitcher", value: function(r) {
          var s = this.getSelectInput(r, !1);
          return s.classList.add("je-switcher"), s;
        } }, { key: "getSwitcherOptions", value: function(r) {
          return r.getElementsByTagName("option");
        } }, { key: "setSwitcherOptions", value: function(r, s, t) {
          this.setSelectOptions(r, s, t);
        } }, { key: "setSelectOptions", value: function(r, s) {
          var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], e = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : " ";
          if (r.innerHTML = "", e) {
            var c = document.createElement("option");
            c.setAttribute("value", "_placeholder_"), c.textContent = i, c.setAttribute("disabled", ""), c.setAttribute("hidden", ""), r.appendChild(c);
          }
          for (var h = 0; h < s.length; h++) {
            var b = document.createElement("option");
            b.setAttribute("value", s[h]), b.textContent = t[h] || s[h], r.appendChild(b);
          }
        } }, { key: "getTextareaInput", value: function() {
          var r = document.createElement("textarea");
          return r.classList.add("je-textarea"), r;
        } }, { key: "getHiddenLabel", value: function(r) {
          var s = document.createElement("label");
          return s.textContent = r, s.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), s;
        } }, { key: "visuallyHidden", value: function(r) {
          r && r.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;");
        } }, { key: "getHiddenText", value: function(r) {
          var s = document.createElement("span");
          return s.textContent = r, s.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), s;
        } }, { key: "getRangeInput", value: function(r, s, t, e, i) {
          var c = this.getFormInputField("range");
          return c.setAttribute("min", r), c.setAttribute("max", s), c.setAttribute("step", t), e && (e.setAttribute("id", i + "-description"), c.setAttribute("aria-describedby", i + "-description")), c;
        } }, { key: "getStepperButtons", value: function(r) {
          var s = document.createElement("div"), t = document.createElement("button");
          t.setAttribute("type", "button"), t.classList.add("stepper-down");
          var e = document.createElement("button");
          e.setAttribute("type", "button"), e.classList.add("stepper-up"), r.getAttribute("readonly") && (t.setAttribute("disabled", !0), e.setAttribute("disabled", !0)), t.textContent = "-", e.textContent = "+";
          var i = function(b, k) {
            b.value = Number(k || b.value), b.setAttribute("initialized", "1");
          }, c = r.getAttribute("min"), h = r.getAttribute("max");
          return t.addEventListener("click", function() {
            r.getAttribute("initialized") ? c ? Number(r.value) > Number(c) && r.stepDown() : r.stepDown() : i(r, c), j(r, "change");
          }), e.addEventListener("click", function() {
            r.getAttribute("initialized") ? h ? Number(r.value) < Number(h) && r.stepUp() : r.stepUp() : i(r, c), j(r, "change");
          }), s.appendChild(t), s.appendChild(e), s;
        } }, { key: "getRangeOutput", value: function(r) {
          var s = document.createElement("output"), t = function(e) {
            s.value = e.currentTarget.value;
          };
          return r.addEventListener("change", t, !1), r.addEventListener("input", t, !1), s;
        } }, { key: "getRangeControl", value: function(r, s) {
          var t = document.createElement("div");
          return t.classList.add("je-range-control"), s && t.appendChild(s), t.appendChild(r), t;
        } }, { key: "getFormInputField", value: function(r) {
          var s = document.createElement("input");
          return s.setAttribute("type", r), s;
        } }, { key: "afterInputReady", value: function(r) {
        } }, { key: "getFormControl", value: function(r, s, t, e, i) {
          var c = document.createElement("div");
          return c.classList.add("form-control"), r && (c.appendChild(r), i && r.setAttribute("for", i)), s.type !== "checkbox" && s.type !== "radio" || !r ? (e && r && r.appendChild(e), c.appendChild(s)) : (s.style.width = "auto", r.insertBefore(s, r.firstChild), e && r.appendChild(e)), s.tagName.toLowerCase() !== "div" && s && r && i && (r.setAttribute("for", i), s.setAttribute("id", i)), s.tagName.toLowerCase() !== "div" && s && t && (t.setAttribute("id", i + "-description"), s.setAttribute("aria-describedby", i + "-description")), t && c.appendChild(t), c;
        } }, { key: "getIndentedPanel", value: function() {
          var r = document.createElement("div");
          return r.classList.add("je-indented-panel"), r;
        } }, { key: "getTopIndentedPanel", value: function() {
          var r = document.createElement("div");
          return r.classList.add("je-indented-panel--top"), r;
        } }, { key: "getChildEditorHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getDescription", value: function(r) {
          var s = document.createElement("p");
          return window.DOMPurify ? s.innerHTML = window.DOMPurify.sanitize(r) : s.textContent = this.cleanText(r), s;
        } }, { key: "getCheckboxDescription", value: function(r) {
          return this.getDescription(r);
        } }, { key: "getFormInputDescription", value: function(r) {
          return this.getDescription(r);
        } }, { key: "getButtonHolder", value: function() {
          return document.createElement("span");
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getFormButtonHolder", value: function(r) {
          return this.getButtonHolder();
        } }, { key: "getButton", value: function(r, s, t) {
          var e = document.createElement("button");
          return e.type = "button", this.setButtonText(e, r, s, t), e;
        } }, { key: "getFormButton", value: function(r, s, t) {
          return this.getButton(r, s, t);
        } }, { key: "setButtonText", value: function(r, s, t, e) {
          for (; r.firstChild; ) r.removeChild(r.firstChild);
          if (t && (r.appendChild(t), s = " ".concat(s)), !this.jsoneditor.options.iconlib || !this.jsoneditor.options.remove_button_labels || !t) {
            var i = document.createElement("span");
            i.appendChild(document.createTextNode(s)), r.appendChild(i);
          }
          e && r.setAttribute("title", e);
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
        } }, { key: "getTableHeaderCell", value: function(r) {
          var s = document.createElement("th");
          return s.textContent = r, s;
        } }, { key: "getTableCell", value: function() {
          return document.createElement("td");
        } }, { key: "getErrorMessage", value: function(r) {
          var s = document.createElement("p");
          return s.style = s.style || {}, s.style.color = "red", s.appendChild(document.createTextNode(r)), s;
        } }, { key: "addInputError", value: function(r, s) {
          r.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(r) {
        } }, { key: "addTableRowError", value: function(r) {
        } }, { key: "removeTableRowError", value: function(r) {
        } }, { key: "getTabHolder", value: function(r) {
          var s = r === void 0 ? "" : r, t = document.createElement("div");
          return t.innerHTML = "<div class='je-tabholder tabs'></div><div class='content' id='".concat(s, "'></div><div class='je-tabholder--clear'></div>"), t;
        } }, { key: "getTopTabHolder", value: function(r) {
          var s = r === void 0 ? "" : r, t = document.createElement("div");
          return t.innerHTML = "<div class='tabs je-tabholder--top'></div><div class='je-tabholder--clear'></div><div class='content' id='".concat(s, "'></div>"), t;
        } }, { key: "applyStyles", value: function(r, s) {
          Object.keys(s).forEach(function(t) {
            return r.style[t] = s[t];
          });
        } }, { key: "closest", value: function(r, s) {
          for (; r && r !== document; ) {
            if (!r[Al]) return !1;
            if (r[Al](s)) return r;
            r = r.parentNode;
          }
          return !1;
        } }, { key: "insertBasicTopTab", value: function(r, s) {
          s.firstChild.insertBefore(r, s.firstChild.firstChild);
        } }, { key: "getTab", value: function(r, s) {
          var t = document.createElement("div");
          return t.appendChild(r), t.id = s, t.classList.add("je-tab"), t;
        } }, { key: "getTopTab", value: function(r, s) {
          var t = document.createElement("div");
          return t.appendChild(r), t.id = s, t.classList.add("je-tab--top"), t;
        } }, { key: "getTabContentHolder", value: function(r) {
          return r.children[1];
        } }, { key: "getTopTabContentHolder", value: function(r) {
          return r.children[1];
        } }, { key: "getTabContent", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getTopTabContent", value: function() {
          return this.getTopIndentedPanel();
        } }, { key: "markTabActive", value: function(r) {
          this.applyStyles(r.tab, { opacity: 1, background: "white" }), r.rowPane !== void 0 ? r.rowPane.style.display = "" : r.container.style.display = "";
        } }, { key: "markTabInactive", value: function(r) {
          this.applyStyles(r.tab, { opacity: 0.5, background: "" }), r.rowPane !== void 0 ? r.rowPane.style.display = "none" : r.container.style.display = "none";
        } }, { key: "addTab", value: function(r, s) {
          r.children[0].appendChild(s);
        } }, { key: "addTopTab", value: function(r, s) {
          r.children[0].appendChild(s);
        } }, { key: "getBlockLink", value: function() {
          var r = document.createElement("a");
          return r.classList.add("je-block-link"), r;
        } }, { key: "getBlockLinkHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "createMediaLink", value: function(r, s, t) {
          r.appendChild(s), t.classList.add("je-media"), r.appendChild(t);
        } }, { key: "createImageLink", value: function(r, s, t) {
          r.appendChild(s), s.appendChild(t);
        } }, { key: "getFirstTab", value: function(r) {
          return r.firstChild.firstChild;
        } }, { key: "getInputGroup", value: function(r, s) {
        } }, { key: "cleanText", value: function(r) {
          var s = document.createElement("div");
          return s.innerHTML = r, s.textContent || s.innerText;
        } }, { key: "getDropZone", value: function(r) {
          var s = document.createElement("div");
          return s.setAttribute("data-text", r), s.classList.add("je-dropzone"), s;
        } }, { key: "getUploadPreview", value: function(r, s, t) {
          var e = document.createElement("div");
          if (e.classList.add("je-upload-preview"), r.mimeType.substr(0, 5) === "image") {
            var i = document.createElement("img");
            i.src = t, e.appendChild(i);
          }
          var c = document.createElement("div");
          c.innerHTML += "<strong>Name:</strong> ".concat(r.name, "<br><strong>Type:</strong> ").concat(r.type, "<br><strong>Size:</strong> ").concat(r.formattedSize), e.appendChild(c), e.appendChild(s);
          var h = document.createElement("div");
          return h.style.clear = "left", e.appendChild(h), e;
        } }, { key: "getProgressBar", value: function() {
          var r = document.createElement("progress");
          return r.setAttribute("max", 100), r.setAttribute("value", 0), r;
        } }, { key: "updateProgressBar", value: function(r, s) {
          r && r.setAttribute("value", s);
        } }, { key: "updateProgressBarUnknown", value: function(r) {
          r && r.removeAttribute("value");
        } }], n && yp(o.prototype, n), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, n;
      }();
      function Yr(o) {
        return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Yr(o);
      }
      function bp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, vp(s.key), s);
        }
      }
      function vp(o) {
        var n = function(r, s) {
          if (Yr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Yr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Yr(n) == "symbol" ? n : n + "";
      }
      function gp(o, n, r) {
        return n = Xe(n), function(s, t) {
          if (t && (Yr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Rl() ? Reflect.construct(n, r || [], Xe(o).constructor) : n.apply(o, r));
      }
      function Rl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Rl = function() {
          return !!o;
        })();
      }
      function cr() {
        return cr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = Xe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, cr.apply(this, arguments);
      }
      function Xe(o) {
        return Xe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, Xe(o);
      }
      function Ts(o, n) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ts(o, n);
      }
      var Il = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), gp(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ts(t, e);
        }(n, o), r = n, (s = [{ key: "getFormInputLabel", value: function(t, e) {
          var i = cr(Xe(n.prototype), "getFormInputLabel", this).call(this, t, e);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = cr(Xe(n.prototype), "getFormInputDescription", this).call(this, t);
          return e.classList.add("je-form-input-label"), e;
        } }, { key: "getIndentedPanel", value: function() {
          var t = cr(Xe(n.prototype), "getIndentedPanel", this).call(this);
          return t.classList.add("je-indented-panel"), t;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var t = cr(Xe(n.prototype), "getChildEditorHolder", this).call(this);
          return t.classList.add("je-child-editor-holder"), t;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var t = this.getButtonHolder();
          return t.classList.add("je-header-button-holder"), t;
        } }, { key: "getTable", value: function() {
          var t = cr(Xe(n.prototype), "getTable", this).call(this);
          return t.classList.add("je-table"), t;
        } }, { key: "addInputError", value: function(t, e) {
          var i = this.closest(t, ".form-control") || t.controlgroup;
          t.errmsg ? t.errmsg.style.display = "block" : (t.errmsg = document.createElement("div"), t.errmsg.setAttribute("class", "errmsg"), t.errmsg.style = t.errmsg.style || {}, t.errmsg.style.color = "red", i.appendChild(t.errmsg)), t.errmsg.innerHTML = "", t.errmsg.appendChild(document.createTextNode(e)), t.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(t) {
          t.style && (t.style.borderColor = ""), t.errmsg && (t.errmsg.style.display = "none");
        } }]) && bp(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function Qr(o) {
        return Qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Qr(o);
      }
      function _p(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, wp(s.key), s);
        }
      }
      function wp(o) {
        var n = function(r, s) {
          if (Qr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Qr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Qr(n) == "symbol" ? n : n + "";
      }
      function jp(o, n, r) {
        return n = tn(n), function(s, t) {
          if (t && (Qr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Bl() ? Reflect.construct(n, r || [], tn(o).constructor) : n.apply(o, r));
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
      function ur() {
        return ur = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = tn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ur.apply(this, arguments);
      }
      function tn(o) {
        return tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, tn(o);
      }
      function Ls(o, n) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ls(o, n);
      }
      Il.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Nl = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), jp(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ls(t, e);
        }(n, o), r = n, (s = [{ key: "getOptInSwitch", value: function(t) {
          var e = this.getHiddenLabel(t + " opt-in");
          e.setAttribute("for", t + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", t + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = t + "-opt-in", i.appendChild(b), i.appendChild(c), i.appendChild(h), { label: e, checkbox: c, container: i };
        } }, { key: "getSelectInput", value: function(t, e) {
          var i = ur(tn(n.prototype), "getSelectInput", this).call(this, t);
          return i.classList.add("form-control"), i;
        } }, { key: "setGridColumnSize", value: function(t, e, i) {
          t.classList.add("col-md-".concat(e)), i && t.classList.add("col-md-offset-".concat(i));
        } }, { key: "afterInputReady", value: function(t) {
          t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var t = document.createElement("textarea");
          return t.classList.add("form-control"), t;
        } }, { key: "getRangeInput", value: function(t, e, i, c, h) {
          return ur(tn(n.prototype), "getRangeInput", this).call(this, t, e, i, c, h);
        } }, { key: "getFormInputField", value: function(t) {
          var e = ur(tn(n.prototype), "getFormInputField", this).call(this, t);
          return t !== "checkbox" && t !== "radio" && e.classList.add("form-control"), e;
        } }, { key: "getHiddenLabel", value: function(t) {
          var e = document.createElement("label");
          return e.textContent = t, e.classList.add("sr-only"), e;
        } }, { key: "visuallyHidden", value: function(t) {
          t && t.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(t) {
          var e = document.createElement("span");
          return e.textContent = t, e.classList.add("sr-only"), e;
        } }, { key: "getFormControl", value: function(t, e, i, c, h) {
          var b = document.createElement("div");
          return !t || e.type !== "checkbox" && e.type !== "radio" ? (b.classList.add("form-group"), t && (t.classList.add("control-label"), b.appendChild(t), c && t.appendChild(c)), b.appendChild(e)) : (b.classList.add(e.type), c && t.appendChild(c), t.insertBefore(e, t.firstChild), b.appendChild(t)), i && b.appendChild(i), e.tagName.toLowerCase() !== "div" && e && t && h && (t.setAttribute("for", h), e.setAttribute("id", h)), e.tagName.toLowerCase() !== "div" && e && i && (i.setAttribute("id", h + "-description"), e.setAttribute("aria-describedby", h + "-description")), b;
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("well", "well-sm"), t.style.paddingBottom = 0, t;
        } }, { key: "getInfoButton", value: function(t) {
          var e = document.createElement("span");
          e.classList.add("glyphicon", "glyphicon-info-sign", "pull-right"), e.style.padding = ".25rem", e.style.position = "relative", e.style.display = "inline-block";
          var i = document.createElement("span");
          return i.style["font-family"] = "sans-serif", i.style.visibility = "hidden", i.style["background-color"] = "rgba(50, 50, 50, .75)", i.style.margin = "0 .25rem", i.style.color = "#FAFAFA", i.style.padding = ".5rem 1rem", i.style["border-radius"] = ".25rem", i.style.width = "25rem", i.style.position = "absolute", i.innerText = t, e.onmouseover = function() {
            i.style.visibility = "visible";
          }, e.onmouseleave = function() {
            i.style.visibility = "hidden";
          }, e.appendChild(i), e;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = document.createElement("p");
          return e.classList.add("help-block"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e;
        } }, { key: "getHeaderContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getHeader", value: function(t, e) {
          var i = document.createElement("span");
          return i.classList.add("h3"), typeof t == "string" ? i.textContent = t : i.appendChild(t), i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var t = this.getButtonHolder();
          return t.style.marginLeft = "10px", t;
        } }, { key: "getButtonHolder", value: function() {
          var t = document.createElement("span");
          return t.classList.add("btn-group"), t;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = ur(tn(n.prototype), "getButton", this).call(this, t, e, i);
          return c.classList.add("btn", "btn-default"), c;
        } }, { key: "getTableContainer", value: function() {
          var t = ur(tn(n.prototype), "getTableContainer", this).call(this);
          return t.classList.add("table-responsive"), t;
        } }, { key: "getTable", value: function() {
          var t = document.createElement("table");
          return t.classList.add("table", "table-bordered"), t.style.width = "auto", t.style.maxWidth = "none", t;
        } }, { key: "addInputError", value: function(t, e) {
          t.controlgroup && (t.controlgroup.classList.add("has-error"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("help-block", "errormsg"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e, t.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(t) {
          t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("has-error"));
        } }, { key: "getTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.innerHTML = "<ul class='col-md-2 nav nav-pills nav-stacked' id='".concat(e, "' role='tablist'></ul><div class='col-md-10 tab-content active well well-small'  id='").concat(e, "'></div>"), i;
        } }, { key: "getTopTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.innerHTML = "<ul class='nav nav-tabs' id='".concat(e, "' role='tablist'></ul><div class='tab-content active well well-small'  id='").concat(e, "'></div>"), i;
        } }, { key: "getTab", value: function(t, e) {
          var i = document.createElement("li");
          i.setAttribute("role", "presentation");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(e)), c.appendChild(t), c.setAttribute("aria-controls", e), c.setAttribute("role", "tab"), c.setAttribute("data-toggle", "tab"), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(t, e) {
          var i = document.createElement("li");
          i.setAttribute("role", "presentation");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(e)), c.appendChild(t), c.setAttribute("aria-controls", e), c.setAttribute("role", "tab"), c.setAttribute("data-toggle", "tab"), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "getTopTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "markTabActive", value: function(t) {
          t.tab.classList.add("active"), t.rowPane !== void 0 ? t.rowPane.classList.add("active") : t.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.classList.remove("active"), t.rowPane !== void 0 ? t.rowPane.classList.remove("active") : t.container.classList.remove("active");
        } }, { key: "getProgressBar", value: function() {
          var t = document.createElement("div");
          t.classList.add("progress");
          var e = document.createElement("div");
          return e.classList.add("progress-bar"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "".concat(0, "%"), t.appendChild(e), t;
        } }, { key: "updateProgressBar", value: function(t, e) {
          if (t) {
            var i = t.firstChild, c = "".concat(e, "%");
            i.setAttribute("aria-valuenow", e), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(t) {
          if (t) {
            var e = t.firstChild;
            t.classList.add("progress", "progress-striped", "active"), e.removeAttribute("aria-valuenow"), e.style.width = "100%", e.innerHTML = "";
          }
        } }, { key: "getInputGroup", value: function(t, e) {
          if (t) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(t);
            var c = document.createElement("div");
            c.classList.add("input-group-btn"), i.appendChild(c);
            for (var h = 0; h < e.length; h++) c.appendChild(e[h]);
            return i;
          }
        } }]) && _p(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function Xr(o) {
        return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, Xr(o);
      }
      function kp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, xp(s.key), s);
        }
      }
      function xp(o) {
        var n = function(r, s) {
          if (Xr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (Xr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return Xr(n) == "symbol" ? n : n + "";
      }
      function Op(o, n, r) {
        return n = en(n), function(s, t) {
          if (t && (Xr(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Fl() ? Reflect.construct(n, r, en(o).constructor) : n.apply(o, r));
      }
      function Fl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Fl = function() {
          return !!o;
        })();
      }
      function hr() {
        return hr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = en(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, hr.apply(this, arguments);
      }
      function en(o) {
        return en = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, en(o);
      }
      function As(o, n) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, As(o, n);
      }
      Nl.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Cp = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, Dl = function(o) {
        function n(t) {
          return function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Op(this, n, [t, Cp]);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && As(t, e);
        }(n, o), r = n, (s = [{ key: "getSelectInput", value: function(t, e) {
          var i = hr(en(n.prototype), "getSelectInput", this).call(this, t);
          return i.classList.add("form-control"), this.options.custom_forms === !1 ? (this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg")) : (i.classList.remove("form-control"), i.classList.add("custom-select"), this.options.input_size === "small" && i.classList.add("custom-select-sm"), this.options.input_size === "large" && i.classList.add("custom-select-lg")), i;
        } }, { key: "getContainer", value: function() {
          var t = document.createElement("div");
          return this.options.object_indent || t.classList.add("je-noindent"), t;
        } }, { key: "getOptInSwitch", value: function(t) {
          var e = this.getHiddenLabel(t + " opt-in");
          e.setAttribute("for", t + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("custom-control", "custom-switch", "d-inline-block", "fs-6");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", t + "-opt-in"), c.classList.add("custom-control-input", "json-editor-opt-in");
          var h = document.createElement("label");
          h.setAttribute("for", t + "-opt-in"), h.classList.add("custom-control-label");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = t + "-opt-in", h.appendChild(b), i.appendChild(c), i.appendChild(h), { label: e, checkbox: c, container: i };
        } }, { key: "setGridColumnSize", value: function(t, e, i) {
          t.classList.add("col-md-".concat(e)), i && t.classList.add("offset-md-".concat(i));
        } }, { key: "afterInputReady", value: function(t) {
          if (!t.controlgroup) {
            var e = t.name;
            t.id = e;
            var i = t.parentNode.parentNode.getElementsByTagName("label")[0];
            i && (i.htmlFor = e), t.controlgroup = this.closest(t, ".form-group");
          }
        } }, { key: "getTextareaInput", value: function() {
          var t = document.createElement("textarea");
          return t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg"), t;
        } }, { key: "getRangeInput", value: function(t, e, i, c, h) {
          var b = hr(en(n.prototype), "getRangeInput", this).call(this, t, e, i, c, h);
          return this.options.custom_forms === !0 && (b.classList.remove("form-control"), b.classList.add("custom-range")), b;
        } }, { key: "getStepperButtons", value: function(t) {
          var e = document.createElement("div"), i = document.createElement("div"), c = document.createElement("div"), h = document.createElement("button");
          h.setAttribute("type", "button");
          var b = document.createElement("button");
          b.setAttribute("type", "button"), e.appendChild(i), e.appendChild(t), e.appendChild(c), i.appendChild(h), c.appendChild(b), e.classList.add("input-group"), i.classList.add("input-group-prepend"), c.classList.add("input-group-append"), h.classList.add("btn"), h.classList.add("btn-secondary"), h.classList.add("stepper-down"), b.classList.add("btn"), b.classList.add("btn-secondary"), b.classList.add("stepper-up"), t.getAttribute("readonly") && (h.setAttribute("disabled", !0), b.setAttribute("disabled", !0)), h.textContent = "-", b.textContent = "+";
          var k = function($, W) {
            $.value = Number(W || $.value), $.setAttribute("initialized", "1");
          }, E = t.getAttribute("min"), I = t.getAttribute("max");
          return t.addEventListener("change", function() {
            t.getAttribute("initialized") || t.setAttribute("initialized", "1");
          }), h.addEventListener("click", function() {
            t.getAttribute("initialized") ? E ? Number(t.value) > Number(E) && t.stepDown() : t.stepDown() : k(t, E), j(t, "change");
          }), b.addEventListener("click", function() {
            t.getAttribute("initialized") ? I ? Number(t.value) < Number(I) && t.stepUp() : t.stepUp() : k(t, E), j(t, "change");
          }), e;
        } }, { key: "getFormInputField", value: function(t) {
          var e = hr(en(n.prototype), "getFormInputField", this).call(this, t);
          return t !== "checkbox" && t !== "radio" && t !== "file" && (e.classList.add("form-control"), this.options.input_size === "small" && e.classList.add("form-control-sm"), this.options.input_size === "large" && e.classList.add("form-control-lg")), t === "file" && e.classList.add("form-control-file"), e;
        } }, { key: "getHiddenLabel", value: function(t) {
          var e = document.createElement("label");
          return e.textContent = t, e.classList.add("sr-only"), e;
        } }, { key: "visuallyHidden", value: function(t) {
          t && t.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(t) {
          var e = document.createElement("span");
          return e.textContent = t, e.classList.add("sr-only"), e;
        } }, { key: "getFormControl", value: function(t, e, i, c, h) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !t || e.type !== "checkbox" && e.type !== "radio") t && (b.appendChild(t), c && b.appendChild(c)), b.appendChild(e);
          else {
            var k = document.createElement("div");
            this.options.custom_forms === !1 ? (k.classList.add("form-check"), e.classList.add("form-check-input"), t.classList.add("form-check-label")) : (k.classList.add("custom-control"), e.classList.add("custom-control-input"), t.classList.add("custom-control-label"), e.type === "checkbox" ? k.classList.add("custom-checkbox") : k.classList.add("custom-radio")), k.appendChild(e), k.appendChild(t), c && k.appendChild(c), b.appendChild(k);
          }
          return i && b.appendChild(i), e.tagName.toLowerCase() !== "div" && e && t && h && (t.setAttribute("for", h), e.setAttribute("id", h)), e.tagName.toLowerCase() !== "div" && e && i && (i.setAttribute("id", h + "-description"), e.setAttribute("aria-describedby", h + "-description")), b;
        } }, { key: "getInfoButton", value: function(t) {
          var e = document.createElement("button");
          e.type = "button", e.classList.add("ml-3", "jsoneditor-twbs4-text-button"), e.setAttribute("data-toggle", "tooltip"), e.setAttribute("data-placement", "auto"), e.title = t;
          var i = document.createTextNode("ⓘ");
          return e.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(e).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && e.classList.add("je-tooltip"), e;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(t, e, i, c) {
          var h = document.createElement("div");
          h.classList.add("form-group"), e && (h.appendChild(e), c && e.appendChild(c));
          var b = document.createElement("div");
          return Object.values(t).forEach(function(k) {
            var E = k.firstChild;
            b.appendChild(E);
          }), h.appendChild(b), i && h.appendChild(i), h;
        } }, { key: "getFormRadio", value: function(t) {
          var e = this.getFormInputField("radio");
          for (var i in t) e.setAttribute(i, t[i]);
          return this.options.custom_forms === !1 ? e.classList.add("form-check-input") : e.classList.add("custom-control-input"), e;
        } }, { key: "getFormRadioLabel", value: function(t, e) {
          var i = document.createElement("label");
          return this.options.custom_forms === !1 ? i.classList.add("form-check-label") : i.classList.add("custom-control-label"), i.appendChild(document.createTextNode(t)), i;
        } }, { key: "getFormRadioControl", value: function(t, e, i) {
          var c = document.createElement("div");
          return this.options.custom_forms === !1 ? c.classList.add("form-check") : c.classList.add("custom-control", "custom-radio"), c.appendChild(e), c.appendChild(t), i && (this.options.custom_forms === !1 ? c.classList.add("form-check-inline") : c.classList.add("custom-control-inline")), c;
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("card", "card-body", "mb-3"), this.options.object_background && t.classList.add(this.options.object_background), this.options.object_text && t.classList.add(this.options.object_text), t;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = document.createElement("small");
          return e.classList.add("form-text"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e;
        } }, { key: "getHeader", value: function(t, e) {
          var i = document.createElement("span");
          return i.classList.add("h3"), i.classList.add("card-title"), i.classList.add("level-" + e), typeof t == "string" ? i.textContent = t : i.appendChild(t), i.style.display = "inline-block", i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var t = document.createElement("span");
          return t.classList.add("btn-group"), t;
        } }, { key: "getFormButtonHolder", value: function(t) {
          var e = this.getButtonHolder();
          return e.classList.add("d-block"), t === "center" ? e.classList.add("text-center") : t === "right" && e.classList.add("text-right"), e;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = hr(en(n.prototype), "getButton", this).call(this, t, e, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var t = hr(en(n.prototype), "getTableContainer", this).call(this);
          return t.classList.add("table-responsive"), t;
        } }, { key: "getTable", value: function() {
          var t = document.createElement("table");
          return t.classList.add("table", "table-sm"), this.options.table_border && t.classList.add("table-bordered"), this.options.table_zebrastyle && t.classList.add("table-striped"), t;
        } }, { key: "getErrorMessage", value: function(t) {
          var e = document.createElement("div");
          return e.classList.add("alert", "alert-danger"), e.setAttribute("role", "alert"), e.appendChild(document.createTextNode(t)), e;
        } }, { key: "addInputError", value: function(t, e) {
          t.controlgroup && (t.controlgroup.classList.add("is-invalid"), t.errmsg || (t.errmsg = document.createElement("p"), t.errmsg.classList.add("invalid-feedback"), t.controlgroup.appendChild(t.errmsg), t.errmsg.style.display = "block"), t.errmsg.style.display = "block", t.errmsg.textContent = e, t.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(t) {
          t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("is-invalid"));
        } }, { key: "getTabHolder", value: function(t) {
          var e = document.createElement("div"), i = t === void 0 ? "" : t;
          return e.innerHTML = "<div class='col-md-2' id='".concat(i, "'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='").concat(i, "'></div></div>"), e.classList.add("row"), e;
        } }, { key: "addTab", value: function(t, e) {
          t.children[0].children[0].appendChild(e);
        } }, { key: "getTabContentHolder", value: function(t) {
          return t.children[1].children[0];
        } }, { key: "getTopTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.classList.add("card"), i.innerHTML = "<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='".concat(e, "'></ul></div><div class='card-body'><div class='tab-content' id='").concat(e, "'></div></div>"), i;
        } }, { key: "getTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "getTopTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "markTabActive", value: function(t) {
          t.tab.firstChild.classList.add("active"), t.rowPane !== void 0 ? t.rowPane.classList.add("active") : t.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.firstChild.classList.remove("active"), t.rowPane !== void 0 ? t.rowPane.classList.remove("active") : t.container.classList.remove("active");
        } }, { key: "insertBasicTopTab", value: function(t, e) {
          e.children[0].children[0].insertBefore(t, e.children[0].children[0].firstChild);
        } }, { key: "addTopTab", value: function(t, e) {
          t.children[0].children[0].appendChild(e);
        } }, { key: "getTopTabContentHolder", value: function(t) {
          return t.children[1].children[0];
        } }, { key: "getFirstTab", value: function(t) {
          return t.firstChild.firstChild.firstChild;
        } }, { key: "getProgressBar", value: function() {
          var t = document.createElement("div");
          t.classList.add("progress");
          var e = document.createElement("div");
          return e.classList.add("progress-bar"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "".concat(0, "%"), t.appendChild(e), t;
        } }, { key: "updateProgressBar", value: function(t, e) {
          if (t) {
            var i = t.firstChild, c = "".concat(e, "%");
            i.setAttribute("aria-valuenow", e), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(t) {
          if (t) {
            var e = t.firstChild;
            t.classList.add("progress", "progress-striped", "active"), e.removeAttribute("aria-valuenow"), e.style.width = "100%", e.innerHTML = "";
          }
        } }, { key: "getBlockLink", value: function() {
          var t = document.createElement("a");
          return t.classList.add("mb-3", "d-inline-block"), t;
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getInputGroup", value: function(t, e) {
          if (t) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(t);
            var c = document.createElement("div");
            c.classList.add("input-group-append"), i.appendChild(c);
            for (var h = 0; h < e.length; h++) e[h].classList.remove("mr-2", "btn-secondary"), e[h].classList.add("btn-outline-secondary"), c.appendChild(e[h]);
            return i;
          }
        } }]) && kp(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function ti(o) {
        return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ti(o);
      }
      function Ep(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Sp(s.key), s);
        }
      }
      function Sp(o) {
        var n = function(r, s) {
          if (ti(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ti(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ti(n) == "symbol" ? n : n + "";
      }
      function Pp(o, n, r) {
        return n = nn(n), function(s, t) {
          if (t && (ti(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Ml() ? Reflect.construct(n, r, nn(o).constructor) : n.apply(o, r));
      }
      function Ml() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ml = function() {
          return !!o;
        })();
      }
      function dr() {
        return dr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = nn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, dr.apply(this, arguments);
      }
      function nn(o) {
        return nn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, nn(o);
      }
      function Rs(o, n) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Rs(o, n);
      }
      Dl.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Tp = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, Hl = function(o) {
        function n(t) {
          return function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Pp(this, n, [t, Tp]);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Rs(t, e);
        }(n, o), r = n, (s = [{ key: "getSelectInput", value: function(t, e) {
          var i = dr(nn(n.prototype), "getSelectInput", this).call(this, t);
          return i.classList.add("form-control"), i.classList.add("form-select"), this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg"), i;
        } }, { key: "getContainer", value: function() {
          var t = document.createElement("div");
          return this.options.object_indent || t.classList.add("je-noindent"), t;
        } }, { key: "getOptInSwitch", value: function(t) {
          var e = this.getHiddenLabel(t + " opt-in");
          e.setAttribute("for", t + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("form-check", "form-switch", "d-inline-block", "fs-6");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("role", "switch"), c.setAttribute("id", t + "-opt-in"), c.classList.add("form-check-input", "json-editor-opt-in");
          var h = document.createElement("label");
          h.setAttribute("for", t + "-opt-in"), h.classList.add("form-check-label");
          var b = document.createElement("span");
          return b.classList.add("visually-hidden"), b.textContent = t + "-opt-in", h.appendChild(b), i.appendChild(c), i.appendChild(h), { label: e, checkbox: c, container: i };
        } }, { key: "setGridColumnSize", value: function(t, e, i) {
          t.classList.add("col-md-".concat(e)), i && t.classList.add("offset-md-".concat(i));
        } }, { key: "afterInputReady", value: function(t) {
          if (!t.controlgroup) {
            var e = t.name;
            t.id = e;
            var i = t.parentNode.parentNode.getElementsByTagName("label")[0];
            i && (i.classList.add("form-label"), i.htmlFor = e), t.controlgroup = this.closest(t, ".form-group");
          }
        } }, { key: "getTextareaInput", value: function() {
          var t = document.createElement("textarea");
          return t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg"), t;
        } }, { key: "getRangeInput", value: function(t, e, i, c, h) {
          var b = dr(nn(n.prototype), "getRangeInput", this).call(this, t, e, i, c, h);
          return b.classList.remove("form-control"), b.classList.add("form-range"), b;
        } }, { key: "getStepperButtons", value: function(t) {
          var e = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var c = document.createElement("button");
          c.setAttribute("type", "button"), e.appendChild(i), e.appendChild(t), e.appendChild(c), e.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), c.classList.add("btn"), c.classList.add("btn-secondary"), c.classList.add("stepper-up"), t.getAttribute("readonly") && (i.setAttribute("disabled", !0), c.setAttribute("disabled", !0)), i.textContent = "-", c.textContent = "+";
          var h = function(E, I) {
            E.value = Number(I || E.value), E.setAttribute("initialized", "1");
          }, b = t.getAttribute("min"), k = t.getAttribute("max");
          return t.addEventListener("change", function() {
            t.getAttribute("initialized") || t.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            t.getAttribute("initialized") ? b ? Number(t.value) > Number(b) && t.stepDown() : t.stepDown() : h(t, b), j(t, "change");
          }), c.addEventListener("click", function() {
            t.getAttribute("initialized") ? k ? Number(t.value) < Number(k) && t.stepUp() : t.stepUp() : h(t, b), j(t, "change");
          }), e;
        } }, { key: "getFormInputField", value: function(t) {
          var e = dr(nn(n.prototype), "getFormInputField", this).call(this, t);
          return t !== "checkbox" && t !== "radio" && (e.classList.add("form-control"), this.options.input_size === "small" && e.classList.add("form-control-sm"), this.options.input_size === "large" && e.classList.add("form-control-lg")), e;
        } }, { key: "getFormControl", value: function(t, e, i, c, h) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !t || e.type !== "checkbox" && e.type !== "radio") t && (t.classList.add("form-label"), b.appendChild(t), c && b.appendChild(c)), b.appendChild(e);
          else {
            var k = document.createElement("div");
            k.classList.add("form-check"), e.classList.add("form-check-input"), t.classList.add("form-check-label"), e.tagName.toLowerCase() !== "div" && e && t && h && (t.setAttribute("for", h), e.setAttribute("id", h)), e.tagName.toLowerCase() !== "div" && e && i && (i.setAttribute("id", h + "-description"), e.setAttribute("aria-describedby", h + "-description")), k.appendChild(e), k.appendChild(t), c && k.appendChild(c), b.appendChild(k);
          }
          return i && b.appendChild(i), b;
        } }, { key: "getHiddenLabel", value: function(t) {
          var e = document.createElement("label");
          return e.textContent = t, e.classList.add("visually-hidden"), e;
        } }, { key: "visuallyHidden", value: function(t) {
          t && t.classList.add("visually-hidden");
        } }, { key: "getHiddenText", value: function(t) {
          var e = document.createElement("span");
          return e.textContent = t, e.classList.add("sr-only"), e;
        } }, { key: "getInfoButton", value: function(t) {
          var e = document.createElement("button");
          e.type = "button", e.classList.add("ms-3", "jsoneditor-twbs5-text-button"), e.setAttribute("data-toggle", "tooltip"), e.setAttribute("data-placement", "auto"), e.title = t;
          var i = document.createTextNode("ⓘ");
          return e.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(e).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && e.classList.add("je-tooltip"), e;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(t, e, i, c) {
          var h = document.createElement("div");
          h.classList.add("form-group"), e && (h.appendChild(e), c && e.appendChild(c));
          var b = document.createElement("div");
          return Object.values(t).forEach(function(k) {
            var E = k.firstChild;
            b.appendChild(E);
          }), h.appendChild(b), i && h.appendChild(i), h;
        } }, { key: "getFormRadio", value: function(t) {
          var e = this.getFormInputField("radio");
          for (var i in t) e.setAttribute(i, t[i]);
          return e.classList.add("form-check-input"), e;
        } }, { key: "getFormRadioLabel", value: function(t, e) {
          var i = document.createElement("label");
          return i.classList.add("form-check-label"), i.appendChild(document.createTextNode(t)), i;
        } }, { key: "getFormRadioControl", value: function(t, e, i) {
          var c = document.createElement("div");
          return c.classList.add("form-check"), c.appendChild(e), c.appendChild(t), i && c.classList.add("form-check-inline"), c;
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("card", "card-body", "my-3"), this.options.object_background && t.classList.add(this.options.object_background), this.options.object_text && t.classList.add(this.options.object_text), t;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = document.createElement("small");
          return e.classList.add("form-text"), e.classList.add("d-block"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e;
        } }, { key: "getHeader", value: function(t, e) {
          var i = document.createElement("span");
          return i.classList.add("h3"), i.classList.add("card-title"), i.classList.add("level-" + e), typeof t == "string" ? i.textContent = t : i.appendChild(t), i.style.display = "inline-block", i;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var t = document.createElement("span");
          return t.classList.add("btn-group"), t;
        } }, { key: "getFormButtonHolder", value: function(t) {
          var e = this.getButtonHolder();
          return e.classList.add("d-block"), t === "center" ? e.classList.add("text-center") : t === "right" && e.classList.add("text-end"), e;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = dr(nn(n.prototype), "getButton", this).call(this, t, e, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var t = dr(nn(n.prototype), "getTableContainer", this).call(this);
          return t.classList.add("table-responsive"), t;
        } }, { key: "getTable", value: function() {
          var t = document.createElement("table");
          return t.classList.add("table", "table-sm"), this.options.table_border && t.classList.add("table-bordered"), this.options.table_zebrastyle && t.classList.add("table-striped"), t;
        } }, { key: "getErrorMessage", value: function(t) {
          var e = document.createElement("div");
          return e.classList.add("alert", "alert-danger"), e.setAttribute("role", "alert"), e.appendChild(document.createTextNode(t)), e;
        } }, { key: "addInputError", value: function(t, e) {
          t.controlgroup && (t.controlgroup.classList.add("is-invalid"), t.errmsg || (t.errmsg = document.createElement("p"), t.errmsg.classList.add("invalid-feedback"), t.controlgroup.appendChild(t.errmsg), t.errmsg.style.display = "block"), t.errmsg.style.display = "block", t.errmsg.textContent = e, t.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(t) {
          t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("is-invalid"));
        } }, { key: "getTabHolder", value: function(t) {
          var e = document.createElement("div"), i = t === void 0 ? "" : t;
          return e.innerHTML = "<div class='col-md-2' id='".concat(i, "'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='").concat(i, "'></div></div>"), e.classList.add("row"), e;
        } }, { key: "addTab", value: function(t, e) {
          t.children[0].children[0].appendChild(e);
        } }, { key: "getTabContentHolder", value: function(t) {
          return t.children[1].children[0];
        } }, { key: "getTopTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.classList.add("card"), i.innerHTML = "<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='".concat(e, "'></ul></div><div class='card-body'><div class='tab-content' id='").concat(e, "'></div></div>"), i;
        } }, { key: "getTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var c = document.createElement("a");
          return c.classList.add("nav-link"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "getTopTabContent", value: function() {
          var t = document.createElement("div");
          return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t;
        } }, { key: "markTabActive", value: function(t) {
          t.tab.firstChild.classList.add("active"), t.rowPane !== void 0 ? t.rowPane.classList.add("active") : t.container.classList.add("active");
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.firstChild.classList.remove("active"), t.rowPane !== void 0 ? t.rowPane.classList.remove("active") : t.container.classList.remove("active");
        } }, { key: "insertBasicTopTab", value: function(t, e) {
          e.children[0].children[0].insertBefore(t, e.children[0].children[0].firstChild);
        } }, { key: "addTopTab", value: function(t, e) {
          t.children[0].children[0].appendChild(e);
        } }, { key: "getTopTabContentHolder", value: function(t) {
          return t.children[1].children[0];
        } }, { key: "getFirstTab", value: function(t) {
          return t.firstChild.firstChild.firstChild;
        } }, { key: "getProgressBar", value: function() {
          var t = document.createElement("div");
          t.classList.add("progress");
          var e = document.createElement("div");
          return e.classList.add("progress-bar"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "".concat(0, "%"), t.appendChild(e), t;
        } }, { key: "updateProgressBar", value: function(t, e) {
          if (t) {
            var i = t.firstChild, c = "".concat(e, "%");
            i.setAttribute("aria-valuenow", e), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(t) {
          if (t) {
            var e = t.firstChild;
            t.classList.add("progress", "progress-striped", "active"), e.removeAttribute("aria-valuenow"), e.style.width = "100%", e.innerHTML = "";
          }
        } }, { key: "getBlockLink", value: function() {
          var t = document.createElement("a");
          return t.classList.add("mb-3", "d-inline-block"), t;
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getInputGroup", value: function(t, e) {
          if (t) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(t);
            for (var c = 0; c < e.length; c++) e[c].classList.remove("me-2", "btn-secondary"), e[c].classList.add("btn-outline-secondary"), i.appendChild(e[c]);
            return i;
          }
        } }]) && Ep(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function ei(o) {
        return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ei(o);
      }
      function Lp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Ap(s.key), s);
        }
      }
      function Ap(o) {
        var n = function(r, s) {
          if (ei(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ei(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ei(n) == "symbol" ? n : n + "";
      }
      function Rp(o, n, r) {
        return n = bn(n), function(s, t) {
          if (t && (ei(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Vl() ? Reflect.construct(n, r || [], bn(o).constructor) : n.apply(o, r));
      }
      function Vl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Vl = function() {
          return !!o;
        })();
      }
      function ni() {
        return ni = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = bn(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ni.apply(this, arguments);
      }
      function bn(o) {
        return bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, bn(o);
      }
      function Is(o, n) {
        return Is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Is(o, n);
      }
      Hl.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var zl = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Rp(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Is(t, e);
        }(n, o), r = n, (s = [{ key: "getTable", value: function() {
          var t = ni(bn(n.prototype), "getTable", this).call(this);
          return t.setAttribute("cellpadding", 5), t.setAttribute("cellspacing", 0), t;
        } }, { key: "getTableHeaderCell", value: function(t) {
          var e = ni(bn(n.prototype), "getTableHeaderCell", this).call(this, t);
          return e.classList.add("ui-state-active"), e.style.fontWeight = "bold", e;
        } }, { key: "getTableCell", value: function() {
          var t = ni(bn(n.prototype), "getTableCell", this).call(this);
          return t.classList.add("ui-widget-content"), t;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var t = this.getButtonHolder();
          return t.style.marginLeft = "10px", t.style.fontSize = ".6em", t.style.display = "inline-block", t;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = this.getDescription(t);
          return e.style.marginLeft = "10px", e.style.display = "inline-block", e;
        } }, { key: "getFormControl", value: function(t, e, i, c) {
          var h = ni(bn(n.prototype), "getFormControl", this).call(this, t, e, i, c);
          return e.type === "checkbox" ? (h.style.lineHeight = "25px", h.style.padding = "3px 0") : h.style.padding = "4px 0 8px 0", h;
        } }, { key: "getDescription", value: function(t) {
          var e = document.createElement("span");
          return e.style.fontSize = ".8em", e.style.fontStyle = "italic", window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e;
        } }, { key: "getButtonHolder", value: function() {
          var t = document.createElement("div");
          return t.classList.add("ui-buttonset"), t.style.fontSize = ".7em", t;
        } }, { key: "getFormInputLabel", value: function(t, e) {
          var i = document.createElement("label");
          return i.style.fontWeight = "bold", i.style.display = "block", i.textContent = t, e && i.classList.add("required"), i;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = document.createElement("button");
          c.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), e && !t ? (c.classList.add("ui-button-icon-only"), e.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(e)) : e ? (c.classList.add("ui-button-text-icon-primary"), e.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(e)) : c.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          return h.classList.add("ui-button-text"), h.textContent = t || i || ".", c.appendChild(h), c.setAttribute("title", i), c;
        } }, { key: "setButtonText", value: function(t, e, i, c) {
          t.innerHTML = "", t.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !e ? (t.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), t.appendChild(i)) : i ? (t.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), t.appendChild(i)) : t.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          h.classList.add("ui-button-text"), h.textContent = e || c || ".", t.appendChild(h), t.setAttribute("title", c);
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("ui-widget-content", "ui-corner-all"), t.style.padding = "1em 1.4em", t.style.marginBottom = "20px", t;
        } }, { key: "afterInputReady", value: function(t) {
          if (!t.controls && (t.controls = this.closest(t, ".form-control"), this.queuedInputErrorText)) {
            var e = this.queuedInputErrorText;
            delete this.queuedInputErrorText, this.addInputError(t, e);
          }
        } }, { key: "addInputError", value: function(t, e) {
          t.controls ? (t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("div"), t.errmsg.classList.add("ui-state-error"), t.controls.appendChild(t.errmsg)), t.errmsg.textContent = e) : this.queuedInputErrorText = e;
        } }, { key: "removeInputError", value: function(t) {
          t.controls || delete this.queuedInputErrorText, t.errmsg && (t.errmsg.style.display = "none");
        } }, { key: "markTabActive", value: function(t) {
          t.tab.classList.remove("ui-widget-header"), t.tab.classList.add("ui-state-active"), t.rowPane !== void 0 ? t.rowPane.style.display = "" : t.container.style.display = "";
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.classList.add("ui-widget-header"), t.tab.classList.remove("ui-state-active"), t.rowPane !== void 0 ? t.rowPane.style.display = "none" : t.container.style.display = "none";
        } }]) && Lp(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function ri(o) {
        return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ri(o);
      }
      function Ip(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Bp(s.key), s);
        }
      }
      function Bp(o) {
        var n = function(r, s) {
          if (ri(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ri(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ri(n) == "symbol" ? n : n + "";
      }
      function Np(o, n, r) {
        return n = lo(n), function(s, t) {
          if (t && (ri(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, ql() ? Reflect.construct(n, r || [], lo(o).constructor) : n.apply(o, r));
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
      function lo(o) {
        return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, lo(o);
      }
      function Bs(o, n) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Bs(o, n);
      }
      zl.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var Ul = function(o) {
        function n() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Np(this, n, arguments);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Bs(t, e);
        }(n, o), r = n, (s = [{ key: "addInputError", value: function(t, e) {
          if (t.errmsg) t.errmsg.style.display = "block";
          else {
            var i = this.closest(t, ".form-control");
            t.errmsg = document.createElement("div"), t.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(t.errmsg);
          }
          t.errmsg.innerHTML = "", t.errmsg.appendChild(document.createTextNode(e)), t.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(t) {
          t.style && (t.style.borderColor = ""), t.errmsg && (t.errmsg.style.display = "none");
        } }]) && Ip(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function ii(o) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, ii(o);
      }
      function Fp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Dp(s.key), s);
        }
      }
      function Dp(o) {
        var n = function(r, s) {
          if (ii(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (ii(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return ii(n) == "symbol" ? n : n + "";
      }
      function Mp(o, n, r) {
        return n = fe(n), function(s, t) {
          if (t && (ii(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, $l() ? Reflect.construct(n, r, fe(o).constructor) : n.apply(o, r));
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
      function ve() {
        return ve = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = fe(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ve.apply(this, arguments);
      }
      function fe(o) {
        return fe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, fe(o);
      }
      function Ns(o, n) {
        return Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Ns(o, n);
      }
      Ul.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Hp = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, Gl = function(o) {
        function n(t) {
          return function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, n), Mp(this, n, [t, Hp]);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Ns(t, e);
        }(n, o), r = n, (s = [{ key: "getOptInSwitch", value: function(t) {
          var e = document.createElement("span");
          e.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", t + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("i");
          h.classList.add("form-icon");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = t + "-opt-in", i.appendChild(b), i.appendChild(c), i.appendChild(h), e.appendChild(i), { label: i, checkbox: c, container: e };
        } }, { key: "setGridColumnSize", value: function(t, e, i) {
          t.classList.add("col-".concat(e)), i && t.classList.add("col-mx-auto");
        } }, { key: "getGridContainer", value: function() {
          var t = document.createElement("div");
          return t.classList.add("container"), this.options.object_indent || t.classList.add("je-noindent"), t;
        } }, { key: "getGridRow", value: function() {
          var t = document.createElement("div");
          return t.classList.add("columns"), t;
        } }, { key: "getGridColumn", value: function() {
          var t = document.createElement("div");
          return t.classList.add("column"), this.options.align_bottom && t.classList.add("je-align-bottom"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("je-panel"), this.options.object_border && t.classList.add("je-border"), t;
        } }, { key: "getTopIndentedPanel", value: function() {
          var t = document.createElement("div");
          return t.classList.add("je-panel-top"), this.options.object_border && t.classList.add("je-border"), t;
        } }, { key: "getHeaderButtonHolder", value: function() {
          return this.getButtonHolder();
        } }, { key: "getButtonHolder", value: function() {
          var t = ve(fe(n.prototype), "getButtonHolder", this).call(this);
          return t.classList.add("btn-group"), t;
        } }, { key: "getFormButtonHolder", value: function(t) {
          var e = ve(fe(n.prototype), "getFormButtonHolder", this).call(this);
          return e.classList.remove("btn-group"), e.classList.add("d-block"), t === "center" ? e.classList.add("text-center") : t === "right" ? e.classList.add("text-right") : e.classList.add("text-left"), e;
        } }, { key: "getFormButton", value: function(t, e, i) {
          var c = ve(fe(n.prototype), "getFormButton", this).call(this, t, e, i);
          return c.classList.add("btn", "btn-primary", "mx-2", "my-1"), this.options.input_size !== "small" && c.classList.remove("btn-sm"), this.options.input_size === "large" && c.classList.add("btn-lg"), c;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = ve(fe(n.prototype), "getButton", this).call(this, t, e, i);
          return c.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), c;
        } }, { key: "getHeader", value: function(t, e) {
          var i = document.createElement("span");
          return typeof t == "string" ? i.textContent = t : i.appendChild(t), i.style.display = "inline-block", i;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = ve(fe(n.prototype), "getFormInputDescription", this).call(this, t);
          return e.classList.add("je-desc", "hide-sm"), e;
        } }, { key: "getFormInputLabel", value: function(t, e) {
          var i = ve(fe(n.prototype), "getFormInputLabel", this).call(this, t, e);
          return this.options.label_bold && i.classList.add("je-label"), i;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getCheckboxLabel", value: function(t, e) {
          var i = ve(fe(n.prototype), "getCheckboxLabel", this).call(this, t, e), c = document.createElement("i");
          return c.classList.add("form-icon"), i.classList.add("form-checkbox", "pr-0"), i.insertBefore(c, i.firstChild), i;
        } }, { key: "getFormCheckboxControl", value: function(t, e, i) {
          return t.insertBefore(e, t.firstChild), i && t.classList.add("form-inline"), t;
        } }, { key: "getMultiCheckboxHolder", value: function(t, e, i, c) {
          return ve(fe(n.prototype), "getMultiCheckboxHolder", this).call(this, t, e, i, c);
        } }, { key: "getFormRadio", value: function(t) {
          var e = this.getFormInputField("radio");
          for (var i in t) e.setAttribute(i, t[i]);
          return e;
        } }, { key: "getFormRadioLabel", value: function(t, e) {
          var i = ve(fe(n.prototype), "getFormRadioLabel", this).call(this, t, e), c = document.createElement("i");
          return c.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(c, i.firstChild), i;
        } }, { key: "getFormRadioControl", value: function(t, e, i) {
          return t.insertBefore(e, t.firstChild), i && t.classList.add("form-inline"), t;
        } }, { key: "getFormInputField", value: function(t) {
          var e = ve(fe(n.prototype), "getFormInputField", this).call(this, t);
          return ["checkbox", "radio"].includes(t) || e.classList.add("form-input"), e;
        } }, { key: "getRangeInput", value: function(t, e, i, c, h) {
          var b = ve(fe(n.prototype), "getRangeInput", this).call(this, t, e, i, c, h);
          return b.classList.add("slider"), b.classList.remove("form-input"), b.setAttribute("oninput", 'this.setAttribute("value", this.value)'), b;
        } }, { key: "getRangeControl", value: function(t, e) {
          var i = ve(fe(n.prototype), "getRangeControl", this).call(this, t, e);
          return i.classList.add("text-center"), i;
        } }, { key: "getSelectInput", value: function(t, e) {
          var i = ve(fe(n.prototype), "getSelectInput", this).call(this, t);
          return i.classList.add("form-select"), i;
        } }, { key: "getTextareaInput", value: function() {
          var t = document.createElement("textarea");
          return t.classList.add("form-input"), t;
        } }, { key: "getFormControl", value: function(t, e, i, c, h) {
          var b = document.createElement("div");
          return b.classList.add("form-group"), !t || e.type !== "checkbox" && e.type !== "radio" ? (t && (t.classList.add("form-label"), b.appendChild(t), c && t.appendChild(c)), b.appendChild(e)) : (b.classList.add(e.type), c && t.appendChild(c), t.insertBefore(e, t.firstChild), b.appendChild(t)), this.options.input_size === "small" ? e.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && e.classList.add("input-lg", "select-lg"), e.type !== "checkbox" && b.appendChild(e), i && b.appendChild(i), e.tagName.toLowerCase() !== "div" && e && t && h && (t.setAttribute("for", h), e.setAttribute("id", h)), e.tagName.toLowerCase() !== "div" && e && i && (i.setAttribute("id", h + "-description"), e.setAttribute("aria-describedby", h + "-description")), b;
        } }, { key: "getInputGroup", value: function(t, e) {
          if (t) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(t);
            for (var c = 0; c < e.length; c++) e[c].classList.add("input-group-btn"), e[c].classList.remove("btn-sm", "mr-2", "my-1"), i.appendChild(e[c]);
            return i;
          }
        } }, { key: "getInfoButton", value: function(t) {
          var e = document.createElement("div");
          e.classList.add("popover", "popover-left", "float-right");
          var i = document.createElement("button");
          i.classList.add("btn", "btn-secondary", "btn-info", "btn-action", "s-circle"), i.setAttribute("tabindex", "-1"), e.appendChild(i);
          var c = document.createTextNode("I");
          i.appendChild(c);
          var h = document.createElement("div");
          h.classList.add("popover-container"), e.appendChild(h);
          var b = document.createElement("div");
          b.classList.add("card"), h.appendChild(b);
          var k = document.createElement("div");
          return k.classList.add("card-body"), k.innerHTML = t, b.appendChild(k), e;
        } }, { key: "getTable", value: function() {
          var t = ve(fe(n.prototype), "getTable", this).call(this);
          return t.classList.add("table", "table-scroll"), this.options.table_border && t.classList.add("je-table-border"), this.options.table_zebrastyle && t.classList.add("table-striped"), t;
        } }, { key: "getProgressBar", value: function() {
          var t = ve(fe(n.prototype), "getProgressBar", this).call(this);
          return t.classList.add("progress"), t;
        } }, { key: "getTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.classList.add("columns"), i.innerHTML = '<div class="column col-2"></div><div class="column col-10 content" id="'.concat(e, '"></div>'), i;
        } }, { key: "getTopTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.innerHTML = '<ul class="tab"></ul><div class="content" id="'.concat(e, '"></div>'), i;
        } }, { key: "getTab", value: function(t, e) {
          var i = document.createElement("a");
          return i.classList.add("btn", "btn-secondary", "btn-block"), i.setAttribute("href", "#".concat(e)), i.appendChild(t), i;
        } }, { key: "getTopTab", value: function(t, e) {
          var i = document.createElement("li");
          i.id = e, i.classList.add("tab-item");
          var c = document.createElement("a");
          return c.setAttribute("href", "#".concat(e)), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "markTabActive", value: function(t) {
          t.tab.classList.add("active"), t.rowPane !== void 0 ? t.rowPane.style.display = "" : t.container.style.display = "";
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.classList.remove("active"), t.rowPane !== void 0 ? t.rowPane.style.display = "none" : t.container.style.display = "none";
        } }, { key: "afterInputReady", value: function(t) {
          if (t.localName === "select") {
            if (t.classList.contains("selectized")) {
              var e = t.nextSibling;
              e && (e.classList.remove("form-select"), Array.from(e.querySelectorAll(".form-select")).forEach(function(c) {
                c.classList.remove("form-select");
              }));
            } else if (t.classList.contains("select2-hidden-accessible")) {
              var i = t.nextSibling;
              i && i.querySelector(".select2-selection--single") && i.classList.add("form-select");
            }
          }
          t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0));
        } }, { key: "addInputError", value: function(t, e) {
          t.controlgroup && (t.controlgroup.classList.add("has-error"), t.errmsg || (t.errmsg = document.createElement("p"), t.errmsg.classList.add("form-input-hint"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.classList.remove("d-hide"), t.errmsg.textContent = e, t.errmsg.setAttribute("role", "alert"));
        } }, { key: "removeInputError", value: function(t) {
          t.errmsg && (t.errmsg.classList.add("d-hide"), t.controlgroup.classList.remove("has-error"));
        } }]) && Fp(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      function oi(o) {
        return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, oi(o);
      }
      function Vp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, zp(s.key), s);
        }
      }
      function zp(o) {
        var n = function(r, s) {
          if (oi(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (oi(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return oi(n) == "symbol" ? n : n + "";
      }
      function qp(o, n, r) {
        return n = ye(n), function(s, t) {
          if (t && (oi(t) === "object" || typeof t == "function")) return t;
          if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }(s);
        }(o, Wl() ? Reflect.construct(n, r, ye(o).constructor) : n.apply(o, r));
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
      function ge() {
        return ge = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, n, r) {
          var s = function(e, i) {
            for (; !Object.prototype.hasOwnProperty.call(e, i) && (e = ye(e)) !== null; ) ;
            return e;
          }(o, n);
          if (s) {
            var t = Object.getOwnPropertyDescriptor(s, n);
            return t.get ? t.get.call(arguments.length < 3 ? o : r) : t.value;
          }
        }, ge.apply(this, arguments);
      }
      function ye(o) {
        return ye = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }, ye(o);
      }
      function Fs(o, n) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, s) {
          return r.__proto__ = s, r;
        }, Fs(o, n);
      }
      Gl.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Up = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, Jl = function(o) {
        function n(t) {
          return function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, n), qp(this, n, [t, Up]);
        }
        return function(t, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && Fs(t, e);
        }(n, o), r = n, (s = [{ key: "getOptInSwitch", value: function(t) {
          var e = this.getHiddenLabel(t + " opt-in");
          e.setAttribute("for", t + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", t + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider", "round");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = t + "-opt-in", i.appendChild(b), i.appendChild(c), i.appendChild(h), { label: e, checkbox: c, container: i };
        } }, { key: "getGridContainer", value: function() {
          var t = document.createElement("div");
          return t.classList.add("flex", "flex-col", "w-full"), this.options.object_indent || t.classList.add("je-noindent"), t;
        } }, { key: "getGridRow", value: function() {
          var t = document.createElement("div");
          return t.classList.add("flex", "flex-wrap", "w-full"), t;
        } }, { key: "getGridColumn", value: function() {
          var t = document.createElement("div");
          return t.classList.add("flex", "flex-col"), t;
        } }, { key: "setGridColumnSize", value: function(t, e, i) {
          e > 0 && e < 12 ? t.classList.add("w-".concat(e, "/12"), "px-1") : t.classList.add("w-full", "px-1"), i && (t.style.marginLeft = "".concat(100 / 12 * i, "%"));
        } }, { key: "getIndentedPanel", value: function() {
          var t = document.createElement("div");
          return this.options.object_panel_default ? t.classList.add("w-full", "p-1") : t.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && t.classList.add("je-border"), t;
        } }, { key: "getTopIndentedPanel", value: function() {
          var t = document.createElement("div");
          return this.options.object_panel_default ? t.classList.add("w-full", "m-2") : t.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && t.classList.add("je-border"), t;
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getSelectInput", value: function(t, e) {
          var i = ge(ye(n.prototype), "getSelectInput", this).call(this, t);
          return e ? i.classList.add("form-multiselect", "block", "py-0", "h-auto", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded") : i.classList.add("form-select", "block", "py-0", "h-6", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && i.classList.add("compact"), i;
        } }, { key: "afterInputReady", value: function(t) {
          t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var t = ge(ye(n.prototype), "getTextareaInput", this).call(this);
          return t.classList.add("block", "w-full", "px-1", "text-sm", "leading-normal", "bg-white", "text-black", "border", "border-grey", "rounded"), this.options.enable_compact && t.classList.add("compact"), t.style.height = 0, t;
        } }, { key: "getRangeInput", value: function(t, e, i) {
          var c = this.getFormInputField("range");
          return c.classList.add("slider"), this.options.enable_compact && c.classList.add("compact"), c.setAttribute("oninput", 'this.setAttribute("value", this.value)'), c.setAttribute("min", t), c.setAttribute("max", e), c.setAttribute("step", i), c;
        } }, { key: "getRangeControl", value: function(t, e) {
          var i = ge(ye(n.prototype), "getRangeControl", this).call(this, t, e);
          return i.classList.add("text-center", "text-black"), i;
        } }, { key: "getCheckbox", value: function() {
          var t = this.getFormInputField("checkbox");
          return t.classList.add("form-checkbox", "text-red-600"), t;
        } }, { key: "getCheckboxLabel", value: function(t, e) {
          var i = ge(ye(n.prototype), "getCheckboxLabel", this).call(this, t, e);
          return i.classList.add("inline-flex", "items-center"), i;
        } }, { key: "getFormCheckboxControl", value: function(t, e, i) {
          return t.insertBefore(e, t.firstChild), i && t.classList.add("inline-flex flex-row"), t;
        } }, { key: "getMultiCheckboxHolder", value: function(t, e, i, c) {
          var h = ge(ye(n.prototype), "getMultiCheckboxHolder", this).call(this, t, e, i, c);
          return h.classList.add("inline-flex", "flex-col"), h;
        } }, { key: "getFormRadio", value: function(t) {
          var e = this.getFormInputField("radio");
          for (var i in e.classList.add("form-radio", "text-red-600"), t) e.setAttribute(i, t[i]);
          return e;
        } }, { key: "getFormRadioLabel", value: function(t, e) {
          var i = ge(ye(n.prototype), "getFormRadioLabel", this).call(this, t, e);
          return i.classList.add("inline-flex", "items-center", "mr-2"), i;
        } }, { key: "getFormRadioControl", value: function(t, e, i) {
          return t.insertBefore(e, t.firstChild), i && t.classList.add("form-radio"), t;
        } }, { key: "getRadioHolder", value: function(t, e, i, c, h) {
          var b = ge(ye(n.prototype), "getRadioHolder", this).call(this, e, i, c, h);
          return t.options.layout === "h" ? b.classList.add("inline-flex", "flex-row") : b.classList.add("inline-flex", "flex-col"), b;
        } }, { key: "getFormInputLabel", value: function(t, e) {
          var i = ge(ye(n.prototype), "getFormInputLabel", this).call(this, t, e);
          return this.options.label_bold ? i.classList.add("font-bold") : i.classList.add("required"), i;
        } }, { key: "getFormInputField", value: function(t) {
          var e = ge(ye(n.prototype), "getFormInputField", this).call(this, t);
          return ["checkbox", "radio"].includes(t) || e.classList.add("block", "w-full", "px-1", "text-black", "text-sm", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && e.classList.add("compact"), e;
        } }, { key: "getFormInputDescription", value: function(t) {
          var e = document.createElement("p");
          return e.classList.add("block", "mt-1", "text-xs"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e;
        } }, { key: "getFormControl", value: function(t, e, i, c) {
          var h = document.createElement("div");
          return h.classList.add("form-group", "mb-1", "w-full"), t && (t.classList.add("text-xs"), e.type === "checkbox" && (e.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), t.classList.add("items-center", "flex"), t = this.getFormCheckboxControl(t, e, !1, c)), e.type === "radio" && (e.classList.add("form-radio", "text-red-600", "mr-1"), t.classList.add("items-center", "flex"), t = this.getFormRadioControl(t, e, !1, c)), h.appendChild(t), !["checkbox", "radio"].includes(e.type) && c && h.appendChild(c)), ["checkbox", "radio"].includes(e.type) || (this.options.input_size === "small" ? e.classList.add("text-xs") : this.options.input_size === "normal" ? e.classList.add("text-base") : this.options.input_size === "large" && e.classList.add("text-xl"), h.appendChild(e)), i && h.appendChild(i), h;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var t = this.getButtonHolder();
          return t.classList.add("text-sm"), t;
        } }, { key: "getButtonHolder", value: function() {
          var t = document.createElement("div");
          return t.classList.add("flex", "relative", "inline-flex", "align-middle"), t;
        } }, { key: "getButton", value: function(t, e, i) {
          var c = ge(ye(n.prototype), "getButton", this).call(this, t, e, i);
          return c.classList.add("inline-block", "align-middle", "text-center", "text-sm", "bg-blue-700", "text-white", "py-1", "pr-1", "m-2", "shadow", "select-none", "whitespace-no-wrap", "rounded"), c;
        } }, { key: "getInfoButton", value: function(t) {
          var e = document.createElement("a");
          e.classList.add("tooltips", "float-right"), e.innerHTML = "ⓘ";
          var i = document.createElement("span");
          return i.innerHTML = t, e.appendChild(i), e;
        } }, { key: "getTable", value: function() {
          var t = ge(ye(n.prototype), "getTable", this).call(this);
          return this.options.table_border ? t.classList.add("je-table-border") : t.classList.add("table", "border", "p-0"), t;
        } }, { key: "getTableRow", value: function() {
          var t = ge(ye(n.prototype), "getTableRow", this).call(this);
          return this.options.table_border && t.classList.add("je-table-border"), this.options.table_zebrastyle && t.classList.add("je-table-zebra"), t;
        } }, { key: "getTableHeaderCell", value: function(t) {
          var e = ge(ye(n.prototype), "getTableHeaderCell", this).call(this, t);
          return this.options.table_border ? e.classList.add("je-table-border") : this.options.table_hdiv ? e.classList.add("je-table-hdiv") : e.classList.add("text-xs", "border", "p-0", "m-0"), e;
        } }, { key: "getTableCell", value: function() {
          var t = ge(ye(n.prototype), "getTableCell", this).call(this);
          return this.options.table_border ? t.classList.add("je-table-border") : this.options.table_hdiv ? t.classList.add("je-table-hdiv") : t.classList.add("border-0", "p-0", "m-0"), t;
        } }, { key: "addInputError", value: function(t, e) {
          t.controlgroup && (t.controlgroup.classList.add("has-error"), t.controlgroup.classList.add("text-red-600"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("block", "mt-1", "text-xs", "text-red"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e);
        } }, { key: "removeInputError", value: function(t) {
          t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("text-red-600"), t.controlgroup.classList.remove("has-error"));
        } }, { key: "getTabHolder", value: function(t) {
          var e = document.createElement("div"), i = t === void 0 ? "" : t;
          return e.innerHTML = "<div class='w-2/12' id='".concat(i, "'><ul class='list-reset pl-0 mb-0'></ul></div><div class='w-10/12' id='").concat(i, "'></div>"), e.classList.add("flex"), e;
        } }, { key: "addTab", value: function(t, e) {
          t.children[0].children[0].appendChild(e);
        } }, { key: "getTopTabHolder", value: function(t) {
          var e = t === void 0 ? "" : t, i = document.createElement("div");
          return i.innerHTML = "<ul class='nav-tabs flex list-reset pl-0 mb-0 border-b border-grey-light' id='".concat(e, "'></ul><div class='p-6 block' id='").concat(e, "'></div>"), i;
        } }, { key: "getTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item", "flex-col", "text-center", "text-white", "bg-blue-500", "shadow-md", "border", "p-2", "mb-2", "mr-2", "hover:bg-blue-400", "rounded");
          var c = document.createElement("a");
          return c.classList.add("nav-link", "text-center"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTopTab", value: function(t, e) {
          var i = document.createElement("li");
          i.classList.add("nav-item", "flex", "border-l", "border-t", "border-r");
          var c = document.createElement("a");
          return c.classList.add("nav-link", "-mb-px", "flex-row", "text-center", "bg-white", "p-2", "hover:bg-blue-400", "rounded-t"), c.setAttribute("href", "#".concat(e)), c.setAttribute("data-toggle", "tab"), c.appendChild(t), i.appendChild(c), i;
        } }, { key: "getTabContent", value: function() {
          var t = document.createElement("div");
          return t.setAttribute("role", "tabpanel"), t;
        } }, { key: "getTopTabContent", value: function() {
          var t = document.createElement("div");
          return t.setAttribute("role", "tabpanel"), t;
        } }, { key: "markTabActive", value: function(t) {
          t.tab.firstChild.classList.add("block"), t.tab.firstChild.classList.contains("border-b") === !0 ? (t.tab.firstChild.classList.add("border-b-0"), t.tab.firstChild.classList.remove("border-b")) : t.tab.firstChild.classList.add("border-b-0"), t.container.classList.contains("hidden") === !0 && t.container.classList.remove("hidden"), t.container.classList.add("block");
        } }, { key: "markTabInactive", value: function(t) {
          t.tab.firstChild.classList.contains("border-b-0") === !0 ? (t.tab.firstChild.classList.add("border-b"), t.tab.firstChild.classList.remove("border-b-0")) : t.tab.firstChild.classList.add("border-b"), t.container.classList.contains("block") === !0 && (t.container.classList.remove("block"), t.container.classList.add("hidden"));
        } }, { key: "getProgressBar", value: function() {
          var t = document.createElement("div");
          t.classList.add("progress");
          var e = document.createElement("div");
          return e.classList.add("bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "".concat(0, "%"), t.appendChild(e), t;
        } }, { key: "updateProgressBar", value: function(t, e) {
          if (t) {
            var i = t.firstChild, c = "".concat(e, "%");
            i.setAttribute("aria-valuenow", e), i.style.width = c, i.innerHTML = c;
          }
        } }, { key: "updateProgressBarUnknown", value: function(t) {
          if (t) {
            var e = t.firstChild;
            t.classList.add("progress", "bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white", "block"), e.removeAttribute("aria-valuenow"), e.classList.add("w-full"), e.innerHTML = "";
          }
        } }, { key: "getInputGroup", value: function(t, e) {
          if (t) {
            var i = document.createElement("div");
            i.classList.add("relative", "items-stretch", "w-full"), i.appendChild(t);
            var c = document.createElement("div");
            c.classList.add("-mr-1"), i.appendChild(c);
            for (var h = 0; h < e.length; h++) c.appendChild(e[h]);
            return i;
          }
        } }]) && Vp(r.prototype, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, s;
      }(mn);
      Jl.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var $p = { html: Il, bootstrap3: Nl, bootstrap4: Dl, bootstrap5: Hl, jqueryui: zl, barebones: Ul, spectre: Gl, tailwind: Jl };
      const Gp = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function pr(o) {
        return pr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, pr(o);
      }
      function Ds(o, n) {
        (n == null || n > o.length) && (n = o.length);
        for (var r = 0, s = new Array(n); r < n; r++) s[r] = o[r];
        return s;
      }
      function Ms() {
        Ms = function() {
          return n;
        };
        var o, n = {}, r = Object.prototype, s = r.hasOwnProperty, t = Object.defineProperty || function(z, V, J) {
          z[V] = J.value;
        }, e = typeof Symbol == "function" ? Symbol : {}, i = e.iterator || "@@iterator", c = e.asyncIterator || "@@asyncIterator", h = e.toStringTag || "@@toStringTag";
        function b(z, V, J) {
          return Object.defineProperty(z, V, { value: J, enumerable: !0, configurable: !0, writable: !0 }), z[V];
        }
        try {
          b({}, "");
        } catch {
          b = function(V, J, gt) {
            return V[J] = gt;
          };
        }
        function k(z, V, J, gt) {
          var ot = V && V.prototype instanceof jt ? V : jt, At = Object.create(ot.prototype), Ut = new rn(gt || []);
          return t(At, "_invoke", { value: we(z, J, Ut) }), At;
        }
        function E(z, V, J) {
          try {
            return { type: "normal", arg: z.call(V, J) };
          } catch (gt) {
            return { type: "throw", arg: gt };
          }
        }
        n.wrap = k;
        var I = "suspendedStart", $ = "suspendedYield", W = "executing", X = "completed", dt = {};
        function jt() {
        }
        function xt() {
        }
        function It() {
        }
        var Ht = {};
        b(Ht, i, function() {
          return this;
        });
        var $t = Object.getPrototypeOf, vt = $t && $t($t(je([])));
        vt && vt !== r && s.call(vt, i) && (Ht = vt);
        var kt = It.prototype = jt.prototype = Object.create(Ht);
        function Wt(z) {
          ["next", "throw", "return"].forEach(function(V) {
            b(z, V, function(J) {
              return this._invoke(V, J);
            });
          });
        }
        function oe(z, V) {
          function J(ot, At, Ut, se) {
            var ae = E(z[ot], z, At);
            if (ae.type !== "throw") {
              var Te = ae.arg, Ge = Te.value;
              return Ge && pr(Ge) == "object" && s.call(Ge, "__await") ? V.resolve(Ge.__await).then(function(ke) {
                J("next", ke, Ut, se);
              }, function(ke) {
                J("throw", ke, Ut, se);
              }) : V.resolve(Ge).then(function(ke) {
                Te.value = ke, Ut(Te);
              }, function(ke) {
                return J("throw", ke, Ut, se);
              });
            }
            se(ae.arg);
          }
          var gt;
          t(this, "_invoke", { value: function(ot, At) {
            function Ut() {
              return new V(function(se, ae) {
                J(ot, At, se, ae);
              });
            }
            return gt = gt ? gt.then(Ut, Ut) : Ut();
          } });
        }
        function we(z, V, J) {
          var gt = I;
          return function(ot, At) {
            if (gt === W) throw Error("Generator is already running");
            if (gt === X) {
              if (ot === "throw") throw At;
              return { value: o, done: !0 };
            }
            for (J.method = ot, J.arg = At; ; ) {
              var Ut = J.delegate;
              if (Ut) {
                var se = zn(Ut, J);
                if (se) {
                  if (se === dt) continue;
                  return se;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (gt === I) throw gt = X, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              gt = W;
              var ae = E(z, V, J);
              if (ae.type === "normal") {
                if (gt = J.done ? X : $, ae.arg === dt) continue;
                return { value: ae.arg, done: J.done };
              }
              ae.type === "throw" && (gt = X, J.method = "throw", J.arg = ae.arg);
            }
          };
        }
        function zn(z, V) {
          var J = V.method, gt = z.iterator[J];
          if (gt === o) return V.delegate = null, J === "throw" && z.iterator.return && (V.method = "return", V.arg = o, zn(z, V), V.method === "throw") || J !== "return" && (V.method = "throw", V.arg = new TypeError("The iterator does not provide a '" + J + "' method")), dt;
          var ot = E(gt, z.iterator, V.arg);
          if (ot.type === "throw") return V.method = "throw", V.arg = ot.arg, V.delegate = null, dt;
          var At = ot.arg;
          return At ? At.done ? (V[z.resultName] = At.value, V.next = z.nextLoc, V.method !== "return" && (V.method = "next", V.arg = o), V.delegate = null, dt) : At : (V.method = "throw", V.arg = new TypeError("iterator result is not an object"), V.delegate = null, dt);
        }
        function si(z) {
          var V = { tryLoc: z[0] };
          1 in z && (V.catchLoc = z[1]), 2 in z && (V.finallyLoc = z[2], V.afterLoc = z[3]), this.tryEntries.push(V);
        }
        function Rt(z) {
          var V = z.completion || {};
          V.type = "normal", delete V.arg, z.completion = V;
        }
        function rn(z) {
          this.tryEntries = [{ tryLoc: "root" }], z.forEach(si, this), this.reset(!0);
        }
        function je(z) {
          if (z || z === "") {
            var V = z[i];
            if (V) return V.call(z);
            if (typeof z.next == "function") return z;
            if (!isNaN(z.length)) {
              var J = -1, gt = function ot() {
                for (; ++J < z.length; ) if (s.call(z, J)) return ot.value = z[J], ot.done = !1, ot;
                return ot.value = o, ot.done = !0, ot;
              };
              return gt.next = gt;
            }
          }
          throw new TypeError(pr(z) + " is not iterable");
        }
        return xt.prototype = It, t(kt, "constructor", { value: It, configurable: !0 }), t(It, "constructor", { value: xt, configurable: !0 }), xt.displayName = b(It, h, "GeneratorFunction"), n.isGeneratorFunction = function(z) {
          var V = typeof z == "function" && z.constructor;
          return !!V && (V === xt || (V.displayName || V.name) === "GeneratorFunction");
        }, n.mark = function(z) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(z, It) : (z.__proto__ = It, b(z, h, "GeneratorFunction")), z.prototype = Object.create(kt), z;
        }, n.awrap = function(z) {
          return { __await: z };
        }, Wt(oe.prototype), b(oe.prototype, c, function() {
          return this;
        }), n.AsyncIterator = oe, n.async = function(z, V, J, gt, ot) {
          ot === void 0 && (ot = Promise);
          var At = new oe(k(z, V, J, gt), ot);
          return n.isGeneratorFunction(V) ? At : At.next().then(function(Ut) {
            return Ut.done ? Ut.value : At.next();
          });
        }, Wt(kt), b(kt, h, "Generator"), b(kt, i, function() {
          return this;
        }), b(kt, "toString", function() {
          return "[object Generator]";
        }), n.keys = function(z) {
          var V = Object(z), J = [];
          for (var gt in V) J.push(gt);
          return J.reverse(), function ot() {
            for (; J.length; ) {
              var At = J.pop();
              if (At in V) return ot.value = At, ot.done = !1, ot;
            }
            return ot.done = !0, ot;
          };
        }, n.values = je, rn.prototype = { constructor: rn, reset: function(z) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Rt), !z) for (var V in this) V.charAt(0) === "t" && s.call(this, V) && !isNaN(+V.slice(1)) && (this[V] = o);
        }, stop: function() {
          this.done = !0;
          var z = this.tryEntries[0].completion;
          if (z.type === "throw") throw z.arg;
          return this.rval;
        }, dispatchException: function(z) {
          if (this.done) throw z;
          var V = this;
          function J(ae, Te) {
            return At.type = "throw", At.arg = z, V.next = ae, Te && (V.method = "next", V.arg = o), !!Te;
          }
          for (var gt = this.tryEntries.length - 1; gt >= 0; --gt) {
            var ot = this.tryEntries[gt], At = ot.completion;
            if (ot.tryLoc === "root") return J("end");
            if (ot.tryLoc <= this.prev) {
              var Ut = s.call(ot, "catchLoc"), se = s.call(ot, "finallyLoc");
              if (Ut && se) {
                if (this.prev < ot.catchLoc) return J(ot.catchLoc, !0);
                if (this.prev < ot.finallyLoc) return J(ot.finallyLoc);
              } else if (Ut) {
                if (this.prev < ot.catchLoc) return J(ot.catchLoc, !0);
              } else {
                if (!se) throw Error("try statement without catch or finally");
                if (this.prev < ot.finallyLoc) return J(ot.finallyLoc);
              }
            }
          }
        }, abrupt: function(z, V) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var gt = this.tryEntries[J];
            if (gt.tryLoc <= this.prev && s.call(gt, "finallyLoc") && this.prev < gt.finallyLoc) {
              var ot = gt;
              break;
            }
          }
          ot && (z === "break" || z === "continue") && ot.tryLoc <= V && V <= ot.finallyLoc && (ot = null);
          var At = ot ? ot.completion : {};
          return At.type = z, At.arg = V, ot ? (this.method = "next", this.next = ot.finallyLoc, dt) : this.complete(At);
        }, complete: function(z, V) {
          if (z.type === "throw") throw z.arg;
          return z.type === "break" || z.type === "continue" ? this.next = z.arg : z.type === "return" ? (this.rval = this.arg = z.arg, this.method = "return", this.next = "end") : z.type === "normal" && V && (this.next = V), dt;
        }, finish: function(z) {
          for (var V = this.tryEntries.length - 1; V >= 0; --V) {
            var J = this.tryEntries[V];
            if (J.finallyLoc === z) return this.complete(J.completion, J.afterLoc), Rt(J), dt;
          }
        }, catch: function(z) {
          for (var V = this.tryEntries.length - 1; V >= 0; --V) {
            var J = this.tryEntries[V];
            if (J.tryLoc === z) {
              var gt = J.completion;
              if (gt.type === "throw") {
                var ot = gt.arg;
                Rt(J);
              }
              return ot;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(z, V, J) {
          return this.delegate = { iterator: je(z), resultName: V, nextLoc: J }, this.method === "next" && (this.arg = o), dt;
        } }, n;
      }
      function Kl(o, n, r, s, t, e, i) {
        try {
          var c = o[e](i), h = c.value;
        } catch (b) {
          return void r(b);
        }
        c.done ? n(h) : Promise.resolve(h).then(s, t);
      }
      function Wp(o, n) {
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(o, Jp(s.key), s);
        }
      }
      function Jp(o) {
        var n = function(r, s) {
          if (pr(r) != "object" || !r) return r;
          var t = r[Symbol.toPrimitive];
          if (t !== void 0) {
            var e = t.call(r, "string");
            if (pr(e) != "object") return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        }(o);
        return pr(n) == "symbol" ? n : n + "";
      }
      var vn = function() {
        function o(e) {
          var i = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(W, X) {
            if (!(W instanceof X)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(e instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = e, this.options = v({}, o.defaults.options, c), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var h = this.options.theme || o.defaults.theme, b = o.defaults.themes[h];
          if (!b) throw new Error("Unknown theme ".concat(h));
          this.element.setAttribute("data-theme", h), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new b(this);
          var k = v(Gp, this.getEditorsRules()), E = function(W, X, dt) {
            return dt ? i.addNewStyleRulesToShadowRoot(W, X, dt) : i.addNewStyleRules(W, X);
          };
          if (!this.theme.options.disable_theme_rules) {
            var I = O(this.element);
            E("default", k, I), b.rules !== void 0 && E(h, b.rules, I);
          }
          var $ = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          $ && (this.iconlib = new $()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return n = o, r = [{ key: "load", value: (s = Ms().mark(function e() {
          var i, c, h, b, k, E, I = this;
          return Ms().wrap(function($) {
            for (; ; ) switch ($.prev = $.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (c = new Hd(this.options)).onSchemaLoaded = function(W) {
                  I.trigger("schemaLoaded", W);
                }, c.onAllSchemasLoaded = function() {
                  I.trigger("allSchemasLoaded");
                }, this.expandSchema = function(W) {
                  return c.expandSchema(W);
                }, this.expandRefs = function(W, X) {
                  return c.expandRefs(W, X);
                }, h = document.location.toString(), $.next = 9, c.load(this.schema, i, h);
              case 9:
                b = $.sent, k = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new Qa(this, null, k, o.defaults), E = this.getEditorClass(b), this.root = this.createEditor(E, { jsoneditor: this, schema: b, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), x(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  I.ready && (I.validation_results = I.validator.validate(I.root.getValue()), I.root.showValidationErrors(I.validation_results), I.trigger("ready"), I.trigger("change"));
                });
              case 24:
              case "end":
                return $.stop();
            }
          }, e, this);
        }), t = function() {
          var e = this, i = arguments;
          return new Promise(function(c, h) {
            var b = s.apply(e, i);
            function k(I) {
              Kl(b, c, h, k, E, "next", I);
            }
            function E(I) {
              Kl(b, c, h, k, E, "throw", I);
            }
            k(void 0);
          });
        }, function() {
          return t.apply(this, arguments);
        }) }, { key: "getValue", value: function() {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return this.root.getValue();
        } }, { key: "setValue", value: function(e) {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return this.root.setValue(e), this;
        } }, { key: "validate", value: function(e) {
          if (!this.ready) throw new Error("JSON Editor not ready yet. Make sure the load method is complete");
          return arguments.length === 1 ? this.validator.validate(e) : this.validation_results;
        } }, { key: "destroy", value: function() {
          this.destroyed || this.ready && (this.schema = null, this.options = null, this.root.destroy(), this.root = null, this.root_container = null, this.validator = null, this.validation_results = null, this.theme = null, this.iconlib = null, this.template = null, this.__data = null, this.ready = !1, this.element.innerHTML = "", this.element.removeAttribute("data-theme"), this.destroyed = !0);
        } }, { key: "on", value: function(e, i) {
          return this.callbacks = this.callbacks || {}, this.callbacks[e] = this.callbacks[e] || [], this.callbacks[e].push(i), this;
        } }, { key: "off", value: function(e, i) {
          if (e && i) {
            this.callbacks = this.callbacks || {}, this.callbacks[e] = this.callbacks[e] || [];
            for (var c = [], h = 0; h < this.callbacks[e].length; h++) this.callbacks[e][h] !== i && c.push(this.callbacks[e][h]);
            this.callbacks[e] = c;
          } else e ? (this.callbacks = this.callbacks || {}, this.callbacks[e] = []) : this.callbacks = {};
          return this;
        } }, { key: "trigger", value: function(e, i) {
          if (this.callbacks && this.callbacks[e] && this.callbacks[e].length) for (var c = 0; c < this.callbacks[e].length; c++) this.callbacks[e][c].apply(this, [i]);
          return this;
        } }, { key: "setOption", value: function(e, i) {
          if (e !== "show_errors") throw new Error("Option ".concat(e, " must be set during instantiation and cannot be changed later"));
          return this.options.show_errors = i, this.onChange(), this;
        } }, { key: "getEditorsRules", value: function() {
          return Object.values(o.defaults.editors).reduce(function(e, i) {
            return i.rules ? v(e, i.rules) : e;
          }, {});
        } }, { key: "getEditorClass", value: function(e) {
          var i, c = this;
          if (e = this.expandSchema(e), o.defaults.resolvers.find(function(h) {
            return (i = h(e, c)) && o.defaults.editors[i];
          }), !i) throw new Error("Unknown editor for schema ".concat(JSON.stringify(e)));
          if (!o.defaults.editors[i]) throw new Error("Unknown editor ".concat(i));
          return o.defaults.editors[i];
        } }, { key: "createEditor", value: function(e, i) {
          var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          return new e(i = v({}, e.options || {}, i), o.defaults, c);
        } }, { key: "onChange", value: function(e) {
          var i = this;
          if (this.ready && (e && this.trigger(e.event, e.data), !this.firing_change)) return this.firing_change = !0, window.requestAnimationFrame(function() {
            i.firing_change = !1, i.ready && (i.validation_results = i.validator.validate(i.root.getValue()), i.options.show_errors !== "never" ? i.root.showValidationErrors(i.validation_results) : i.root.showValidationErrors([]), i.trigger("change"));
          }), this;
        } }, { key: "compileTemplate", value: function(e) {
          var i, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : o.defaults.template;
          if (typeof c == "string") {
            if (!o.defaults.templates[c]) throw new Error("Unknown template engine ".concat(c));
            if (!(i = o.defaults.templates[c]())) throw new Error("Template engine ".concat(c, " missing required library."));
          } else i = c;
          if (!i) throw new Error("No template engine set");
          if (!i.compile) throw new Error("Invalid template engine set");
          return i.compile(e);
        } }, { key: "_data", value: function(e, i, c) {
          if (arguments.length !== 3) return e.hasAttribute("data-jsoneditor-".concat(i)) ? this.__data[e.getAttribute("data-jsoneditor-".concat(i))] : null;
          var h;
          e.hasAttribute("data-jsoneditor-".concat(i)) ? h = e.getAttribute("data-jsoneditor-".concat(i)) : (h = this.uuid++, e.setAttribute("data-jsoneditor-".concat(i), h)), this.__data[h] = c;
        } }, { key: "registerEditor", value: function(e) {
          return this.editors = this.editors || {}, this.editors[e.path] = e, this;
        } }, { key: "unregisterEditor", value: function(e) {
          return this.editors = this.editors || {}, this.editors[e.path] = null, this;
        } }, { key: "getEditor", value: function(e) {
          if (this.editors) return this.editors[e];
        } }, { key: "watch", value: function(e, i) {
          return this.watchlist = this.watchlist || {}, this.watchlist[e] = this.watchlist[e] || [], this.watchlist[e].push(i), this;
        } }, { key: "unwatch", value: function(e, i) {
          if (!this.watchlist || !this.watchlist[e]) return this;
          if (!i) return this.watchlist[e] = null, this;
          for (var c = [], h = 0; h < this.watchlist[e].length; h++) this.watchlist[e][h] !== i && c.push(this.watchlist[e][h]);
          return this.watchlist[e] = c.length ? c : null, this;
        } }, { key: "notifyWatchers", value: function(e) {
          if (!this.watchlist || !this.watchlist[e]) return this;
          for (var i = 0; i < this.watchlist[e].length; i++) this.watchlist[e][i]();
        } }, { key: "isEnabled", value: function() {
          return !this.root || this.root.isEnabled();
        } }, { key: "enable", value: function() {
          this.root.enable();
        } }, { key: "disable", value: function() {
          this.root.disable();
        } }, { key: "setCopyClipboardContents", value: function(e) {
          this.copyClipboard = e;
        } }, { key: "getCopyClipboardContents", value: function() {
          return this.copyClipboard;
        } }, { key: "addNewStyleRules", value: function(e, i) {
          var c = document.querySelector("#theme-".concat(e));
          c || ((c = document.createElement("style")).setAttribute("id", "theme-".concat(e)), c.appendChild(document.createTextNode("")), document.head.appendChild(c));
          for (var h = c.sheet ? c.sheet : c.styleSheet, b = this.element.nodeName.toLowerCase(); h.cssRules.length > 0; ) h.deleteRule(0);
          Object.keys(i).forEach(function(k) {
            var E = e === "default" ? k : "".concat(b, '[data-theme="').concat(e, '"] ').concat(k);
            h.insertRule ? h.insertRule(E + " {" + decodeURIComponent(i[k]) + "}", 0) : h.addRule && h.addRule(E, decodeURIComponent(i[k]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(e, i, c) {
          var h = this.element.nodeName.toLowerCase(), b = "";
          Object.keys(i).forEach(function(I) {
            var $ = e === "default" ? I : "".concat(h, '[data-theme="').concat(e, '"] ').concat(I);
            b += $ + " {" + decodeURIComponent(i[I]) + `}
`;
          });
          var k, E = new CSSStyleSheet();
          E.replaceSync(b), c.adoptedStyleSheets = [].concat(function(I) {
            if (Array.isArray(I)) return Ds(I);
          }(k = c.adoptedStyleSheets) || function(I) {
            if (typeof Symbol < "u" && I[Symbol.iterator] != null || I["@@iterator"] != null) return Array.from(I);
          }(k) || function(I, $) {
            if (I) {
              if (typeof I == "string") return Ds(I, $);
              var W = Object.prototype.toString.call(I).slice(8, -1);
              return W === "Object" && I.constructor && (W = I.constructor.name), W === "Map" || W === "Set" ? Array.from(I) : W === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(W) ? Ds(I, $) : void 0;
            }
          }(k) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }(), [E]);
        } }, { key: "showValidationErrors", value: function(e) {
          var i = e ?? this.validate();
          Object.values(this.editors).forEach(function(c) {
            c && (c.is_dirty = !0, c.showValidationErrors(i));
          });
        } }], r && Wp(n.prototype, r), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, r, s, t;
      }();
      vn.defaults = sr, vn.AbstractEditor = F, vn.AbstractTheme = mn, vn.AbstractIconLib = yn, Object.assign(vn.defaults.themes, $p), Object.assign(vn.defaults.editors, Xi), Object.assign(vn.defaults.templates, Vd), Object.assign(vn.defaults.iconlibs, fp);
    })(), C;
  })());
})(Su);
var mo = Su.exports;
const _m = (l, u) => {
  const y = l.__vccOpts || l;
  for (const [w, _] of u)
    y[w] = _;
  return y;
};
window.JSONFormEditor = mo.JSONEditor;
const wm = {
  name: "dm-json-form3",
  components: {},
  props: {
    options: {
      type: Object
    },
    schema: {
      type: Object
    },
    data: {
      type: Object
    },
    enabled: {
      type: Boolean,
      default: !0
    },
    ready: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    init() {
      console.debug("init: ", this.$el), this.editor.on("ready", () => {
        console.debug("JSONEditor is ready"), this.$emit("ready", !0);
      }), this.editor.on("change", () => {
        let l = this.editor.getValue();
        l === "" && (l = null), this.$emit("change", l);
      });
    },
    setValue(l) {
      console.debug("setValue: ", l), this.editor ? this.editor.setValue(l) : console.warn("Editor not initialized yet, skipping data update");
    },
    setOptions(l) {
      console.debug("setOptions: ", l), this.editor && this.editor.destroy(), this._options = { ...this._options, ...l }, this.editor = new mo.JSONEditor(this.$el, this._options), this.$emit("ready", !1), this.init();
    },
    setSchema(l) {
      console.debug("setSchema: ", l);
      var u = null;
      this.editor && (u = this.editor.getValue(), this.editor.destroy()), this._options = { ...this._options, schema: l, startval: u }, this.editor = new mo.JSONEditor(this.$el, this._options), this.$emit("ready", !1), this.init();
    }
  },
  mounted() {
    this._options = {
      theme: "bootstrap5",
      iconlib: "spectre",
      object_background: "",
      // prevent forced bg-light class
      remove_button_labels: !0,
      ajax: !0,
      ajax_cache_responses: !1,
      disable_collapse: !1,
      disable_edit_json: !0,
      disable_properties: !1,
      use_default_values: !0,
      required_by_default: !1,
      display_required_only: !0,
      show_opt_in: !1,
      show_errors: "always",
      disable_array_reorder: !1,
      disable_array_delete_all_rows: !1,
      disable_array_delete_last_row: !1,
      keep_oneof_values: !1,
      no_additional_properties: !0,
      case_sensitive_property_search: !1,
      ...this.options
    }, console.debug("Options: ", this._options), this.editor = new mo.JSONEditor(this.$el, this._options), console.debug("Editor: ", this.editor), this.init();
  },
  emits: ["onChange", "onReady"]
}, jm = {
  ref: "jsoneditor",
  id: "jsoneditor",
  class: "bootstrap-wrapper"
};
function km(l, u, y, w, _, C) {
  return Ly(), Iy("div", jm, [
    Ca("h2", null, Lc(y.title), 1)
  ], 512);
}
const xm = /* @__PURE__ */ _m(wm, [["render", km]]);
function Om({ model: l, el: u }) {
  const y = document.createElement("div");
  y.setAttribute("id", "jsoneditor-container"), u.append(y), console.debug("Create App");
  let w = l.get("options");
  w = w || {
    theme: "bootstrap5",
    iconlib: "spectre",
    schema: {
      title: "Editor Test",
      required: ["test"],
      properties: { test: { type: "string" } }
    }
    //   startval: this.data
  };
  const _ = l.get("value");
  _ != null && w.startval === void 0 && (w = { ...w, startval: _ });
  const d = bm(xm, {
    options: w,
    onChange: (g) => {
      console.debug("CHANGE", g), g instanceof Event || (l.set("value", g), l.save_changes());
    },
    onReady: (g) => {
      console.debug("JSONEditor is ready"), l.set("ready", g), l.save_changes();
    }
  }).mount(u);
  l.on("change:value", () => {
    d.setValue(l.get("value"));
  }), l.on("change:options", () => {
    d.setOptions(l.get("options"));
  }), l.on("change:schema", () => {
    d.setSchema(l.get("schema"));
  });
}
export {
  Om as render
};

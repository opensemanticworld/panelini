/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function _a(l) {
  const c = /* @__PURE__ */ Object.create(null);
  for (const y of l.split(",")) c[y] = 1;
  return (y) => y in c;
}
const at = {}, jn = [], fr = () => {
}, Du = () => !1, To = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // uppercase letter
(l.charCodeAt(2) > 122 || l.charCodeAt(2) < 97), Lo = (l) => l.startsWith("onUpdate:"), kt = Object.assign, wa = (l, c) => {
  const y = l.indexOf(c);
  y > -1 && l.splice(y, 1);
}, hf = Object.prototype.hasOwnProperty, et = (l, c) => hf.call(l, c), ze = Array.isArray, kn = (l) => Yi(l) === "[object Map]", ua = (l) => Yi(l) === "[object Set]", lu = (l) => Yi(l) === "[object Date]", Ue = (l) => typeof l == "function", pt = (l) => typeof l == "string", Xr = (l) => typeof l == "symbol", ut = (l) => l !== null && typeof l == "object", Mu = (l) => (ut(l) || Ue(l)) && Ue(l.then) && Ue(l.catch), df = Object.prototype.toString, Yi = (l) => df.call(l), pf = (l) => Yi(l).slice(8, -1), ff = (l) => Yi(l) === "[object Object]", ja = (l) => pt(l) && l !== "NaN" && l[0] !== "-" && "" + parseInt(l, 10) === l, Mi = /* @__PURE__ */ _a(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ao = (l) => {
  const c = /* @__PURE__ */ Object.create(null);
  return (y) => c[y] || (c[y] = l(y));
}, yf = /-\w/g, Wt = Ao(
  (l) => l.replace(yf, (c) => c.slice(1).toUpperCase())
), mf = /\B([A-Z])/g, Tn = Ao(
  (l) => l.replace(mf, "-$1").toLowerCase()
), Hu = Ao((l) => l.charAt(0).toUpperCase() + l.slice(1)), Zs = Ao(
  (l) => l ? `on${Hu(l)}` : ""
), dr = (l, c) => !Object.is(l, c), Ys = (l, ...c) => {
  for (let y = 0; y < l.length; y++)
    l[y](...c);
}, Vu = (l, c, y, _ = !1) => {
  Object.defineProperty(l, c, {
    configurable: !0,
    enumerable: !1,
    writable: _,
    value: y
  });
}, bf = (l) => {
  const c = parseFloat(l);
  return isNaN(c) ? l : c;
};
let uu;
const Ro = () => uu || (uu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ka(l) {
  if (ze(l)) {
    const c = {};
    for (let y = 0; y < l.length; y++) {
      const _ = l[y], g = pt(_) ? wf(_) : ka(_);
      if (g)
        for (const C in g)
          c[C] = g[C];
    }
    return c;
  } else if (pt(l) || ut(l))
    return l;
}
const vf = /;(?![^(]*\))/g, gf = /:([^]+)/, _f = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function wf(l) {
  const c = {};
  return l.replace(_f, (y) => y.startsWith("/*") ? "" : y).split(vf).forEach((y) => {
    if (y) {
      const _ = y.split(gf);
      _.length > 1 && (c[_[0].trim()] = _[1].trim());
    }
  }), c;
}
function xa(l) {
  let c = "";
  if (pt(l))
    c = l;
  else if (ze(l))
    for (let y = 0; y < l.length; y++) {
      const _ = xa(l[y]);
      _ && (c += _ + " ");
    }
  else if (ut(l))
    for (const y in l)
      l[y] && (c += y + " ");
  return c.trim();
}
const jf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", kf = /* @__PURE__ */ _a(jf);
function zu(l) {
  return !!l || l === "";
}
function xf(l, c, y) {
  if (l.length !== c.length) return !1;
  let _ = !0;
  for (let g = 0; _ && g < l.length; g++)
    _ = Io(l[g], c[g], y);
  return _;
}
function cu(l, c, y) {
  if (l.size !== c.size) return !1;
  const _ = Array.from(c), g = new Uint8Array(_.length);
  for (const C of l) {
    let p = -1;
    for (let w = 0; w < _.length; w++)
      if (!g[w] && Io(C, _[w], y)) {
        p = w;
        break;
      }
    if (p < 0) return !1;
    g[p] = 1;
  }
  return !0;
}
function Of(l, c, y) {
  let _ = kn(l), g = kn(c);
  if (_ || g || (_ = ua(l), g = ua(c), _ || g))
    return _ && g ? cu(l, c, y) : !1;
  const C = Object.keys(l).length, p = Object.keys(c).length;
  if (C !== p)
    return !1;
  for (const w in l) {
    const s = l.hasOwnProperty(w), d = c.hasOwnProperty(w);
    if (s && !d || !s && d || !Io(l[w], c[w], y))
      return !1;
  }
  return String(l) === String(c);
}
function hu(l, c, y, _) {
  y || (y = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [g, C] = y;
  if (g.has(l) || C.has(c))
    return g.get(l) === c && C.get(c) === l;
  g.set(l, c), C.set(c, l);
  const p = _(l, c, y);
  return g.delete(l), C.delete(c), p;
}
function Io(l, c, y) {
  if (l === c) return !0;
  let _ = lu(l), g = lu(c);
  return _ || g ? _ && g ? l.getTime() === c.getTime() : !1 : (_ = Xr(l), g = Xr(c), _ || g ? l === c : (_ = ze(l), g = ze(c), _ || g ? _ && g ? hu(l, c, y, xf) : !1 : (_ = ut(l), g = ut(c), _ || g ? !_ || !g ? !1 : hu(l, c, y, Of) : String(l) === String(c))));
}
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class Cf {
  // TODO isolatedDeclarations "__v_skip"
  constructor(c = !1) {
    this.detached = c, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !c && gt && (gt.active ? (this.parent = gt, this.index = (gt.scopes || (gt.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let c, y;
      if (this.scopes) {
        const _ = this.scopes.slice();
        for (c = 0, y = _.length; c < y; c++)
          _[c].pause();
      }
      for (c = 0, y = this.effects.length; c < y; c++)
        this.effects[c].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let c, y;
      if (this.scopes) {
        const g = this.scopes.slice();
        for (c = 0, y = g.length; c < y; c++)
          g[c].resume();
      }
      const _ = this.effects.slice();
      for (c = 0, y = _.length; c < y; c++)
        _[c].resume();
    }
  }
  run(c) {
    if (this._active) {
      const y = gt;
      try {
        return gt = this, c();
      } finally {
        gt = y;
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
        let c = gt;
        for (; c; ) {
          if (c.prevScope === this) {
            c.prevScope = this.prevScope;
            break;
          }
          c = c.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(c) {
    if (this._active) {
      this._active = !1;
      let y, _;
      for (y = 0, _ = this.effects.length; y < _; y++)
        this.effects[y].stop();
      for (this.effects.length = 0, y = 0, _ = this.cleanups.length; y < _; y++)
        this.cleanups[y]();
      if (this.cleanups.length = 0, this.scopes) {
        const g = this.scopes.slice();
        for (y = 0, _ = g.length; y < _; y++)
          g[y].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !c) {
        const g = this.parent.scopes.pop();
        g && g !== this && (this.parent.scopes[this.index] = g, g.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ef() {
  return gt;
}
let st;
const Qs = /* @__PURE__ */ new WeakSet();
class qu {
  constructor(c) {
    this.fn = c, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, gt && (gt.active ? gt.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Qs.has(this) && (Qs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || $u(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, du(this), Gu(this);
    const c = st, y = Jt;
    st = this, Jt = !0;
    try {
      return this.fn();
    } finally {
      Wu(this), st = c, Jt = y, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let c = this.deps; c; c = c.nextDep)
        Ea(c);
      this.deps = this.depsTail = void 0, du(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Qs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ca(this) && this.run();
  }
  get dirty() {
    return ca(this);
  }
}
let Uu = 0, Hi, Vi;
function $u(l, c = !1) {
  if (l.flags |= 8, c) {
    l.next = Vi, Vi = l;
    return;
  }
  l.next = Hi, Hi = l;
}
function Oa() {
  Uu++;
}
function Ca() {
  if (--Uu > 0)
    return;
  if (Vi) {
    let c = Vi;
    for (Vi = void 0; c; ) {
      const y = c.next;
      c.next = void 0, c.flags &= -9, c = y;
    }
  }
  let l;
  for (; Hi; ) {
    let c = Hi;
    for (Hi = void 0; c; ) {
      const y = c.next;
      if (c.next = void 0, c.flags &= -9, c.flags & 1)
        try {
          c.trigger();
        } catch (_) {
          l || (l = _);
        }
      c = y;
    }
  }
  if (l) throw l;
}
function Gu(l) {
  for (let c = l.deps; c; c = c.nextDep)
    c.version = -1, c.prevActiveLink = c.dep.activeLink, c.dep.activeLink = c;
}
function Wu(l) {
  let c, y = l.depsTail, _ = y;
  for (; _; ) {
    const g = _.prevDep;
    _.version === -1 ? (_ === y && (y = g), Ea(_), Sf(_)) : c = _, _.dep.activeLink = _.prevActiveLink, _.prevActiveLink = void 0, _ = g;
  }
  l.deps = c, l.depsTail = y;
}
function ca(l) {
  for (let c = l.deps; c; c = c.nextDep)
    if (c.dep.version !== c.version || c.dep.computed && (Ju(c.dep.computed) || c.dep.version !== c.version))
      return !0;
  return !!l._dirty;
}
function Ju(l) {
  if (l.flags & 4 && !(l.flags & 16) || (l.flags &= -17, l.globalVersion === $i) || (l.globalVersion = $i, !l.isSSR && l.flags & 128 && (!l.deps && !l._dirty || !ca(l))))
    return;
  l.flags |= 2;
  const c = l.dep, y = st, _ = Jt;
  st = l, Jt = !0;
  try {
    Gu(l);
    const g = l.fn(l._value);
    (c.version === 0 || dr(g, l._value)) && (l.flags |= 128, l._value = g, c.version++);
  } catch (g) {
    throw c.version++, g;
  } finally {
    st = y, Jt = _, Wu(l), l.flags &= -3;
  }
}
function Ea(l, c = !1) {
  const { dep: y, prevSub: _, nextSub: g } = l;
  if (_ && (_.nextSub = g, l.prevSub = void 0), g && (g.prevSub = _, l.nextSub = void 0), y.subs === l && (y.subs = _, !_ && y.computed)) {
    y.computed.flags &= -5;
    for (let C = y.computed.deps; C; C = C.nextDep)
      Ea(C, !0);
  }
  !c && !--y.sc && y.map && y.map.delete(y.key);
}
function Sf(l) {
  const { prevDep: c, nextDep: y } = l;
  c && (c.nextDep = y, l.prevDep = void 0), y && (y.prevDep = c, l.nextDep = void 0);
}
let Jt = !0;
const Ku = [];
function Sr() {
  Ku.push(Jt), Jt = !1;
}
function Pr() {
  const l = Ku.pop();
  Jt = l === void 0 ? !0 : l;
}
function du(l) {
  const { cleanup: c } = l;
  if (l.cleanup = void 0, c) {
    const y = st;
    st = void 0;
    try {
      c();
    } finally {
      st = y;
    }
  }
}
let $i = 0;
class Pf {
  constructor(c, y) {
    this.sub = c, this.dep = y, this.version = y.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Sa {
  // TODO isolatedDeclarations "__v_skip"
  constructor(c) {
    this.computed = c, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(c) {
    if (!st || !Jt || st === this.computed)
      return;
    let y = this.activeLink;
    if (y === void 0 || y.sub !== st)
      y = this.activeLink = new Pf(st, this), st.deps ? (y.prevDep = st.depsTail, st.depsTail.nextDep = y, st.depsTail = y) : st.deps = st.depsTail = y, Zu(y);
    else if (y.version === -1 && (y.version = this.version, y.nextDep)) {
      const _ = y.nextDep;
      _.prevDep = y.prevDep, y.prevDep && (y.prevDep.nextDep = _), y.prevDep = st.depsTail, y.nextDep = void 0, st.depsTail.nextDep = y, st.depsTail = y, st.deps === y && (st.deps = _);
    }
    return y;
  }
  trigger(c) {
    this.version++, $i++, this.notify(c);
  }
  notify(c) {
    Oa();
    try {
      for (let y = this.subs; y; y = y.prevSub)
        y.sub.notify() && y.sub.dep.notify();
    } finally {
      Ca();
    }
  }
}
function Zu(l) {
  if (l.dep.sc++, l.sub.flags & 4) {
    const c = l.dep.computed;
    if (c && !l.dep.subs) {
      c.flags |= 20;
      for (let _ = c.deps; _; _ = _.nextDep)
        Zu(_);
    }
    const y = l.dep.subs;
    y !== l && (l.prevSub = y, y && (y.nextSub = l)), l.dep.subs = l;
  }
}
const ha = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ Symbol(
  ""
), da = /* @__PURE__ */ Symbol(
  ""
), Gi = /* @__PURE__ */ Symbol(
  ""
);
function wt(l, c, y) {
  if (Jt && st) {
    let _ = ha.get(l);
    _ || ha.set(l, _ = /* @__PURE__ */ new Map());
    let g = _.get(y);
    g || (_.set(y, g = new Sa()), g.map = _, g.key = y), g.track();
  }
}
function Er(l, c, y, _, g, C) {
  const p = ha.get(l);
  if (!p) {
    $i++;
    return;
  }
  const w = (s) => {
    s && s.trigger();
  };
  if (Oa(), c === "clear")
    p.forEach(w);
  else {
    const s = ze(l), d = s && ja(y);
    if (s && y === "length") {
      const f = Number(_);
      p.forEach((m, v) => {
        (v === "length" || v === Gi || !Xr(v) && v >= f) && w(m);
      });
    } else
      switch ((y !== void 0 || p.has(void 0)) && w(p.get(y)), d && w(p.get(Gi)), c) {
        case "add":
          s ? d && w(p.get("length")) : (w(p.get(xn)), kn(l) && w(p.get(da)));
          break;
        case "delete":
          s || (w(p.get(xn)), kn(l) && w(p.get(da)));
          break;
        case "set":
          kn(l) && w(p.get(xn));
          break;
      }
  }
  Ca();
}
function vi(l) {
  const c = /* @__PURE__ */ Xe(l);
  return c === l || (wt(c, "iterate", Gi), /* @__PURE__ */ Kt(l)) ? c : /* @__PURE__ */ Tr(l) ? /* @__PURE__ */ On(l) ? c.map((y) => Sn(yr(y))) : c.map(Sn) : c.map(yr);
}
function Pa(l) {
  return wt(l = /* @__PURE__ */ Xe(l), "iterate", Gi), l;
}
function cr(l, c) {
  return /* @__PURE__ */ Tr(l) ? Sn(/* @__PURE__ */ On(l) ? yr(c) : c) : yr(c);
}
const Tf = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (l) => cr(this, l));
  },
  concat(...l) {
    return vi(this).concat(
      ...l.map((c) => ze(c) ? vi(c) : c)
    );
  },
  entries() {
    return Xs(this, "entries", (l) => (l[1] = cr(this, l[1]), l));
  },
  every(l, c) {
    return kr(this, "every", l, c, void 0, arguments);
  },
  filter(l, c) {
    return kr(
      this,
      "filter",
      l,
      c,
      (y) => y.map((_) => cr(this, _)),
      arguments
    );
  },
  find(l, c) {
    return kr(
      this,
      "find",
      l,
      c,
      (y) => cr(this, y),
      arguments
    );
  },
  findIndex(l, c) {
    return kr(this, "findIndex", l, c, void 0, arguments);
  },
  findLast(l, c) {
    return kr(
      this,
      "findLast",
      l,
      c,
      (y) => cr(this, y),
      arguments
    );
  },
  findLastIndex(l, c) {
    return kr(this, "findLastIndex", l, c, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(l, c) {
    return kr(this, "forEach", l, c, void 0, arguments);
  },
  includes(...l) {
    return ea(this, "includes", l);
  },
  indexOf(...l) {
    return ea(this, "indexOf", l);
  },
  join(l) {
    return vi(this).join(l);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...l) {
    return ea(this, "lastIndexOf", l);
  },
  map(l, c) {
    return kr(this, "map", l, c, void 0, arguments);
  },
  pop() {
    return Bi(this, "pop");
  },
  push(...l) {
    return Bi(this, "push", l);
  },
  reduce(l, ...c) {
    return pu(this, "reduce", l, c);
  },
  reduceRight(l, ...c) {
    return pu(this, "reduceRight", l, c);
  },
  shift() {
    return Bi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(l, c) {
    return kr(this, "some", l, c, void 0, arguments);
  },
  splice(...l) {
    return Bi(this, "splice", l);
  },
  toReversed() {
    return vi(this).toReversed();
  },
  toSorted(l) {
    return vi(this).toSorted(l);
  },
  toSpliced(...l) {
    return vi(this).toSpliced(...l);
  },
  unshift(...l) {
    return Bi(this, "unshift", l);
  },
  values() {
    return Xs(this, "values", (l) => cr(this, l));
  }
};
function Xs(l, c, y) {
  const _ = Pa(l), g = _[c]();
  return _ !== l && !/* @__PURE__ */ Kt(l) && (g._next = g.next, g.next = () => {
    const C = g._next();
    return C.done || (C.value = y(C.value)), C;
  }), g;
}
const Lf = Array.prototype;
function kr(l, c, y, _, g, C) {
  const p = Pa(l), w = p !== l && !/* @__PURE__ */ Kt(l), s = p[c];
  if (s !== Lf[c]) {
    const m = s.apply(l, C);
    return w ? yr(m) : m;
  }
  let d = y;
  p !== l && (w ? d = function(m, v) {
    return y.call(this, cr(l, m), v, l);
  } : y.length > 2 && (d = function(m, v) {
    return y.call(this, m, v, l);
  }));
  const f = s.call(p, d, _);
  return w && g ? g(f) : f;
}
function pu(l, c, y, _) {
  const g = Pa(l), C = g !== l && !/* @__PURE__ */ Kt(l);
  let p = y, w = !1;
  g !== l && (C ? (w = _.length === 0, p = function(d, f, m) {
    return w && (w = !1, d = cr(l, d)), y.call(this, d, cr(l, f), m, l);
  }) : y.length > 3 && (p = function(d, f, m) {
    return y.call(this, d, f, m, l);
  }));
  const s = g[c](p, ..._);
  return w ? cr(l, s) : s;
}
function ea(l, c, y) {
  const _ = /* @__PURE__ */ Xe(l);
  wt(_, "iterate", Gi);
  const g = _[c](...y);
  return (g === -1 || g === !1) && /* @__PURE__ */ Ra(y[0]) ? (y[0] = /* @__PURE__ */ Xe(y[0]), _[c](...y)) : g;
}
function Bi(l, c, y = []) {
  Sr(), Oa();
  const _ = (/* @__PURE__ */ Xe(l))[c].apply(l, y);
  return Ca(), Pr(), _;
}
const Af = /* @__PURE__ */ _a("__proto__,__v_isRef,__isVue"), Yu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((l) => l !== "arguments" && l !== "caller").map((l) => Symbol[l]).filter(Xr)
);
function Rf(l) {
  Xr(l) || (l = String(l));
  const c = /* @__PURE__ */ Xe(this);
  return wt(c, "has", l), c.hasOwnProperty(l);
}
class Qu {
  constructor(c = !1, y = !1) {
    this._isReadonly = c, this._isShallow = y;
  }
  get(c, y, _) {
    if (y === "__v_skip") return c.__v_skip;
    const g = this._isReadonly, C = this._isShallow;
    if (y === "__v_isReactive")
      return !g;
    if (y === "__v_isReadonly")
      return g;
    if (y === "__v_isShallow")
      return C;
    if (y === "__v_raw")
      return _ === (g ? C ? qf : rc : C ? tc : ec).get(c) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(c) === Object.getPrototypeOf(_) ? c : void 0;
    const p = ze(c);
    if (!g) {
      let s;
      if (p && (s = Tf[y]))
        return s;
      if (y === "hasOwnProperty")
        return Rf;
    }
    const w = Reflect.get(
      c,
      y,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ jt(c) ? c : _
    );
    if ((Xr(y) ? Yu.has(y) : Af(y)) || (g || wt(c, "get", y), C))
      return w;
    if (/* @__PURE__ */ jt(w)) {
      const s = p && ja(y) ? w : w.value;
      return g && ut(s) ? /* @__PURE__ */ fa(s) : s;
    }
    return ut(w) ? g ? /* @__PURE__ */ fa(w) : /* @__PURE__ */ La(w) : w;
  }
}
class Xu extends Qu {
  constructor(c = !1) {
    super(!1, c);
  }
  set(c, y, _, g) {
    let C = c[y];
    const p = ze(c) && ja(y);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Tr(C);
      if (!/* @__PURE__ */ Kt(_) && !/* @__PURE__ */ Tr(_) && (C = /* @__PURE__ */ Xe(C), _ = /* @__PURE__ */ Xe(_)), !p && /* @__PURE__ */ jt(C) && !/* @__PURE__ */ jt(_))
        return d || (C.value = _), !0;
    }
    const w = p ? Number(y) < c.length : et(c, y), s = Reflect.set(
      c,
      y,
      _,
      /* @__PURE__ */ jt(c) ? c : g
    );
    return c === /* @__PURE__ */ Xe(g) && s && (w ? dr(_, C) && Er(c, "set", y, _) : Er(c, "add", y, _)), s;
  }
  deleteProperty(c, y) {
    const _ = et(c, y);
    c[y];
    const g = Reflect.deleteProperty(c, y);
    return g && _ && Er(c, "delete", y, void 0), g;
  }
  has(c, y) {
    const _ = Reflect.has(c, y);
    return (!Xr(y) || !Yu.has(y)) && wt(c, "has", y), _;
  }
  ownKeys(c) {
    return wt(
      c,
      "iterate",
      ze(c) ? "length" : xn
    ), Reflect.ownKeys(c);
  }
}
class If extends Qu {
  constructor(c = !1) {
    super(!0, c);
  }
  set(c, y) {
    return !0;
  }
  deleteProperty(c, y) {
    return !0;
  }
}
const Bf = /* @__PURE__ */ new Xu(), Nf = /* @__PURE__ */ new If(), Ff = /* @__PURE__ */ new Xu(!0);
const pa = (l) => l, bo = (l) => Reflect.getPrototypeOf(l);
function Df(l, c, y) {
  return function(..._) {
    const g = this.__v_raw, C = /* @__PURE__ */ Xe(g), p = kn(C), w = l === "entries" || l === Symbol.iterator && p, s = l === "keys" && p, d = g[l](..._), f = y ? pa : c ? Sn : yr;
    return !c && wt(
      C,
      "iterate",
      s ? da : xn
    ), kt(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: m, done: v } = d.next();
          return v ? { value: m, done: v } : {
            value: w ? [f(m[0]), f(m[1])] : f(m),
            done: v
          };
        }
      }
    );
  };
}
function vo(l) {
  return function(...c) {
    return l === "delete" ? !1 : l === "clear" ? void 0 : this;
  };
}
function Mf(l, c) {
  const y = {
    get(g) {
      const C = this.__v_raw, p = /* @__PURE__ */ Xe(C), w = /* @__PURE__ */ Xe(g);
      l || (dr(g, w) && wt(p, "get", g), wt(p, "get", w));
      const { has: s } = bo(p), d = c ? pa : l ? Sn : yr;
      if (s.call(p, g))
        return d(C.get(g));
      if (s.call(p, w))
        return d(C.get(w));
      C !== p && C.get(g);
    },
    get size() {
      const g = this.__v_raw;
      return !l && wt(/* @__PURE__ */ Xe(g), "iterate", xn), g.size;
    },
    has(g) {
      const C = this.__v_raw, p = /* @__PURE__ */ Xe(C), w = /* @__PURE__ */ Xe(g);
      return l || (dr(g, w) && wt(p, "has", g), wt(p, "has", w)), g === w ? C.has(g) : C.has(g) || C.has(w);
    },
    forEach(g, C) {
      const p = this, w = p.__v_raw, s = /* @__PURE__ */ Xe(w), d = c ? pa : l ? Sn : yr;
      return !l && wt(s, "iterate", xn), w.forEach((f, m) => g.call(C, d(f), d(m), p));
    }
  };
  return kt(
    y,
    l ? {
      add: vo("add"),
      set: vo("set"),
      delete: vo("delete"),
      clear: vo("clear")
    } : {
      add(g) {
        const C = /* @__PURE__ */ Xe(this), p = bo(C), w = /* @__PURE__ */ Xe(g), s = !c && !/* @__PURE__ */ Kt(g) && !/* @__PURE__ */ Tr(g) ? w : g;
        return p.has.call(C, s) || dr(g, s) && p.has.call(C, g) || dr(w, s) && p.has.call(C, w) || (C.add(s), Er(C, "add", s, s)), this;
      },
      set(g, C) {
        !c && !/* @__PURE__ */ Kt(C) && !/* @__PURE__ */ Tr(C) && (C = /* @__PURE__ */ Xe(C));
        const p = /* @__PURE__ */ Xe(this), { has: w, get: s } = bo(p);
        let d = w.call(p, g);
        d || (g = /* @__PURE__ */ Xe(g), d = w.call(p, g));
        const f = s.call(p, g);
        return p.set(g, C), d ? dr(C, f) && Er(p, "set", g, C) : Er(p, "add", g, C), this;
      },
      delete(g) {
        const C = /* @__PURE__ */ Xe(this), { has: p, get: w } = bo(C);
        let s = p.call(C, g);
        s || (g = /* @__PURE__ */ Xe(g), s = p.call(C, g)), w && w.call(C, g);
        const d = C.delete(g);
        return s && Er(C, "delete", g, void 0), d;
      },
      clear() {
        const g = /* @__PURE__ */ Xe(this), C = g.size !== 0, p = g.clear();
        return C && Er(
          g,
          "clear",
          void 0,
          void 0
        ), p;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((g) => {
    y[g] = Df(g, l, c);
  }), y;
}
function Ta(l, c) {
  const y = Mf(l, c);
  return (_, g, C) => g === "__v_isReactive" ? !l : g === "__v_isReadonly" ? l : g === "__v_raw" ? _ : Reflect.get(
    et(y, g) && g in _ ? y : _,
    g,
    C
  );
}
const Hf = {
  get: /* @__PURE__ */ Ta(!1, !1)
}, Vf = {
  get: /* @__PURE__ */ Ta(!1, !0)
}, zf = {
  get: /* @__PURE__ */ Ta(!0, !1)
};
const ec = /* @__PURE__ */ new WeakMap(), tc = /* @__PURE__ */ new WeakMap(), rc = /* @__PURE__ */ new WeakMap(), qf = /* @__PURE__ */ new WeakMap();
function Uf(l) {
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
// @__NO_SIDE_EFFECTS__
function La(l) {
  return /* @__PURE__ */ Tr(l) ? l : Aa(
    l,
    !1,
    Bf,
    Hf,
    ec
  );
}
// @__NO_SIDE_EFFECTS__
function $f(l) {
  return Aa(
    l,
    !1,
    Ff,
    Vf,
    tc
  );
}
// @__NO_SIDE_EFFECTS__
function fa(l) {
  return Aa(
    l,
    !0,
    Nf,
    zf,
    rc
  );
}
function Aa(l, c, y, _, g) {
  if (!ut(l) || l.__v_raw && !(c && l.__v_isReactive) || l.__v_skip || !Object.isExtensible(l))
    return l;
  const C = g.get(l);
  if (C)
    return C;
  const p = Uf(pf(l));
  if (p === 0)
    return l;
  const w = new Proxy(
    l,
    p === 2 ? _ : y
  );
  return g.set(l, w), w;
}
// @__NO_SIDE_EFFECTS__
function On(l) {
  return /* @__PURE__ */ Tr(l) ? /* @__PURE__ */ On(l.__v_raw) : !!(l && l.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Tr(l) {
  return !!(l && l.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Kt(l) {
  return !!(l && l.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ra(l) {
  return l ? !!l.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Xe(l) {
  const c = l && l.__v_raw;
  return c ? /* @__PURE__ */ Xe(c) : l;
}
function Gf(l) {
  return !et(l, "__v_skip") && Object.isExtensible(l) && Vu(l, "__v_skip", !0), l;
}
const yr = (l) => ut(l) ? /* @__PURE__ */ La(l) : l, Sn = (l) => ut(l) ? /* @__PURE__ */ fa(l) : l;
// @__NO_SIDE_EFFECTS__
function jt(l) {
  return l ? l.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Wf(l) {
  return Jf(l, !1);
}
function Jf(l, c) {
  return /* @__PURE__ */ jt(l) ? l : new Kf(l, c);
}
class Kf {
  constructor(c, y) {
    this.dep = new Sa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = y ? c : /* @__PURE__ */ Xe(c), this._value = y ? c : yr(c), this.__v_isShallow = y;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(c) {
    const y = this._rawValue, _ = this.__v_isShallow || /* @__PURE__ */ Kt(c) || /* @__PURE__ */ Tr(c);
    c = _ ? c : /* @__PURE__ */ Xe(c), dr(c, y) && (this._rawValue = c, this._value = _ ? c : yr(c), this.dep.trigger());
  }
}
function Zf(l) {
  return /* @__PURE__ */ jt(l) ? l.value : l;
}
const Yf = {
  get: (l, c, y) => c === "__v_raw" ? l : Zf(Reflect.get(l, c, y)),
  set: (l, c, y, _) => {
    const g = l[c];
    return /* @__PURE__ */ jt(g) && !/* @__PURE__ */ jt(y) ? (g.value = y, !0) : Reflect.set(l, c, y, _);
  }
};
function nc(l) {
  return /* @__PURE__ */ On(l) ? l : new Proxy(l, Yf);
}
class Qf {
  constructor(c, y, _) {
    this.fn = c, this.setter = y, this._value = void 0, this.dep = new Sa(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = $i - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !y, this.isSSR = _;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    st !== this)
      return $u(this, !0), !0;
  }
  get value() {
    const c = this.dep.track();
    return Ju(this), c && (c.version = this.dep.version), this._value;
  }
  set value(c) {
    this.setter && this.setter(c);
  }
}
// @__NO_SIDE_EFFECTS__
function Xf(l, c, y = !1) {
  let _, g;
  return Ue(l) ? _ = l : (_ = l.get, g = l.set), new Qf(_, g, y);
}
const go = {}, ko = /* @__PURE__ */ new WeakMap();
let wn;
function ey(l, c = !1, y = wn) {
  if (y) {
    let _ = ko.get(y);
    _ || ko.set(y, _ = []), _.push(l);
  }
}
function ty(l, c, y = at) {
  const { immediate: _, deep: g, once: C, scheduler: p, augmentJob: w, call: s } = y, d = (R) => g ? R : /* @__PURE__ */ Kt(R) || g === !1 || g === 0 ? Qr(R, 1) : Qr(R);
  let f, m, v, j, O = !1, x = !1;
  if (/* @__PURE__ */ jt(l) ? (m = () => l.value, O = /* @__PURE__ */ Kt(l)) : /* @__PURE__ */ On(l) ? (m = () => d(l), O = !0) : ze(l) ? (x = !0, O = l.some((R) => /* @__PURE__ */ On(R) || /* @__PURE__ */ Kt(R)), m = () => l.map((R) => {
    if (/* @__PURE__ */ jt(R))
      return R.value;
    if (/* @__PURE__ */ On(R))
      return d(R);
    if (Ue(R))
      return s ? s(R, 2) : R();
  })) : Ue(l) ? c ? m = s ? () => s(l, 2) : l : m = () => {
    if (v) {
      Sr();
      try {
        v();
      } finally {
        Pr();
      }
    }
    const R = wn;
    wn = f;
    try {
      return s ? s(l, 3, [j]) : l(j);
    } finally {
      wn = R;
    }
  } : m = fr, c && g) {
    const R = m, N = g === !0 ? 1 / 0 : g;
    m = () => Qr(R(), N);
  }
  const E = Ef(), P = () => {
    f.stop(), E && E.active && wa(E.effects, f);
  };
  if (C && c) {
    const R = c;
    c = (...N) => {
      const F = R(...N);
      return P(), F;
    };
  }
  let L = x ? new Array(l.length).fill(go) : go;
  const A = (R) => {
    if (!(!(f.flags & 1) || !f.dirty && !R))
      if (c) {
        const N = f.run();
        if (R || g || O || (x ? N.some((F, H) => dr(F, L[H])) : dr(N, L))) {
          v && v();
          const F = wn;
          wn = f;
          try {
            const H = [
              N,
              // pass undefined as the old value when it's changed for the first time
              L === go ? void 0 : x && L[0] === go ? [] : L,
              j
            ];
            L = N, s ? s(c, 3, H) : (
              // @ts-expect-error
              c(...H)
            );
          } finally {
            wn = F;
          }
        }
      } else
        f.run();
  };
  return w && w(A), f = new qu(m), f.scheduler = p ? () => p(A, !1) : A, j = (R) => ey(R, !1, f), v = f.onStop = () => {
    const R = ko.get(f);
    if (R) {
      if (s)
        s(R, 4);
      else
        for (const N of R) N();
      ko.delete(f);
    }
  }, c ? _ ? A(!0) : L = f.run() : p ? p(A.bind(null, !0), !0) : f.run(), P.pause = f.pause.bind(f), P.resume = f.resume.bind(f), P.stop = P, P;
}
function Qr(l, c = 1 / 0, y) {
  if (c <= 0 || !ut(l) || l.__v_skip || (y = y || /* @__PURE__ */ new Map(), (y.get(l) || 0) >= c))
    return l;
  if (y.set(l, c), c--, /* @__PURE__ */ jt(l))
    Qr(l.value, c, y);
  else if (ze(l))
    for (let _ = 0; _ < l.length; _++)
      Qr(l[_], c, y);
  else if (ua(l) || kn(l))
    l.forEach((_) => {
      Qr(_, c, y);
    });
  else if (ff(l)) {
    for (const _ in l)
      Qr(l[_], c, y);
    for (const _ of Object.getOwnPropertySymbols(l))
      Object.prototype.propertyIsEnumerable.call(l, _) && Qr(l[_], c, y);
  }
  return l;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qi(l, c, y, _) {
  try {
    return _ ? l(..._) : l();
  } catch (g) {
    Bo(g, c, y);
  }
}
function Zt(l, c, y, _) {
  if (Ue(l)) {
    const g = Qi(l, c, y, _);
    return g && Mu(g) && g.catch((C) => {
      Bo(C, c, y);
    }), g;
  }
  if (ze(l)) {
    const g = [];
    for (let C = 0; C < l.length; C++)
      g.push(Zt(l[C], c, y, _));
    return g;
  }
}
function Bo(l, c, y, _ = !0) {
  const g = c ? c.vnode : null, { errorHandler: C, throwUnhandledErrorInProduction: p } = c && c.appContext.config || at;
  if (c) {
    let w = c.parent;
    const s = c.proxy, d = `https://vuejs.org/error-reference/#runtime-${y}`;
    for (; w; ) {
      const f = w.ec;
      if (f) {
        for (let m = 0; m < f.length; m++)
          if (f[m](l, s, d) === !1)
            return;
      }
      w = w.parent;
    }
    if (C) {
      Sr(), Qi(C, null, 10, [
        l,
        s,
        d
      ]), Pr();
      return;
    }
  }
  ry(l, y, g, _, p);
}
function ry(l, c, y, _ = !0, g = !1) {
  if (g)
    throw l;
  console.error(l);
}
const St = [];
let ur = -1;
const _i = [];
let Yr = null, gi = 0;
const ic = /* @__PURE__ */ Promise.resolve();
let xo = null;
function oc(l) {
  const c = xo || ic;
  return l ? c.then(this ? l.bind(this) : l) : c;
}
function ny(l) {
  let c = ur + 1, y = St.length;
  for (; c < y; ) {
    const _ = c + y >>> 1, g = St[_], C = Wi(g);
    C < l || C === l && g.flags & 2 ? c = _ + 1 : y = _;
  }
  return c;
}
function Ia(l) {
  if (!(l.flags & 1)) {
    const c = Wi(l), y = St[St.length - 1];
    !y || // fast path when the job id is larger than the tail
    !(l.flags & 2) && c >= Wi(y) ? St.push(l) : St.splice(ny(c), 0, l), l.flags |= 1, sc();
  }
}
function sc() {
  xo || (xo = ic.then(lc));
}
function iy(l) {
  if (!ze(l))
    Yr && l.id === -1 ? Yr.splice(gi + 1, 0, l) : l.flags & 1 || (_i.push(l), l.flags |= 1);
  else
    for (let c = 0; c < l.length; c++)
      _i.push(l[c]);
  sc();
}
function fu(l, c, y = ur + 1) {
  for (; y < St.length; y++) {
    const _ = St[y];
    if (_ && _.flags & 2) {
      if (l && _.id !== l.uid)
        continue;
      St.splice(y, 1), y--, _.flags & 4 && (_.flags &= -2), _(), _.flags & 4 || (_.flags &= -2);
    }
  }
}
function ac(l) {
  if (_i.length) {
    const c = [...new Set(_i)].sort(
      (y, _) => Wi(y) - Wi(_)
    );
    if (_i.length = 0, Yr) {
      for (let y = 0; y < c.length; y++)
        Yr.push(c[y]);
      return;
    }
    for (Yr = c, gi = 0; gi < Yr.length; gi++) {
      const y = Yr[gi];
      y.flags & 4 && (y.flags &= -2), y.flags & 8 || y(), y.flags &= -2;
    }
    Yr = null, gi = 0;
  }
}
const Wi = (l) => l.id == null ? l.flags & 2 ? -1 : 1 / 0 : l.id;
function lc(l) {
  try {
    for (ur = 0; ur < St.length; ur++) {
      const c = St[ur];
      c && !(c.flags & 8) && (c.flags & 4 && (c.flags &= -2), Qi(
        c,
        c.i,
        c.i ? 15 : 14
      ), c.flags & 4 || (c.flags &= -2));
    }
  } finally {
    for (; ur < St.length; ur++) {
      const c = St[ur];
      c && (c.flags &= -2);
    }
    ur = -1, St.length = 0, ac(), xo = null, (St.length || _i.length) && lc();
  }
}
let pr = null, uc = null;
function Oo(l) {
  const c = pr;
  return pr = l, uc = l && l.type.__scopeId || null, c;
}
function oy(l, c = pr, y) {
  if (!c || l._n)
    return l;
  const _ = (...g) => {
    _._d && Ou(-1);
    const C = Oo(c), p = Cn.length;
    let w;
    try {
      w = l(...g);
    } finally {
      for (let s = Cn.length; s > p; s--) Bc();
      Oo(C), _._d && Ou(1);
    }
    return w;
  };
  return _._n = !0, _._c = !0, _._d = !0, _;
}
function gn(l, c, y, _) {
  const g = l.dirs, C = c && c.dirs;
  for (let p = 0; p < g.length; p++) {
    const w = g[p];
    C && (w.oldValue = C[p].value);
    let s = w.dir[_];
    s && (Sr(), Zt(s, y, 8, [
      l.el,
      w,
      l,
      c
    ]), Pr());
  }
}
function sy(l, c) {
  if (Pt) {
    let y = Pt.provides;
    const _ = Pt.parent && Pt.parent.provides;
    _ === y && (y = Pt.provides = Object.create(_)), y[l] = c;
  }
}
function wo(l, c, y = !1) {
  const _ = om();
  if (_ || wi) {
    let g = wi ? wi._context.provides : _ ? _.parent == null || _.ce ? _.vnode.appContext && _.vnode.appContext.provides : _.parent.provides : void 0;
    if (g && l in g)
      return g[l];
    if (arguments.length > 1)
      return y && Ue(c) ? c.call(_ && _.proxy) : c;
  }
}
const ay = /* @__PURE__ */ Symbol.for("v-scx"), ly = () => wo(ay);
function ta(l, c, y) {
  return cc(l, c, y);
}
function cc(l, c, y = at) {
  const { immediate: _, deep: g, flush: C, once: p } = y, w = kt({}, y), s = c && _ || !c && C !== "post";
  let d;
  if (Zi) {
    if (C === "sync") {
      const j = ly();
      d = j.__watcherHandles || (j.__watcherHandles = []);
    } else if (!s) {
      const j = () => {
      };
      return j.stop = fr, j.resume = fr, j.pause = fr, j;
    }
  }
  const f = Pt;
  w.call = (j, O, x) => Zt(j, f, O, x);
  let m = !1;
  C === "post" ? w.scheduler = (j) => {
    Tt(j, f && f.suspense);
  } : C !== "sync" && (m = !0, w.scheduler = (j, O) => {
    O ? j() : Ia(j);
  }), w.augmentJob = (j) => {
    c && (j.flags |= 4), m && (j.flags |= 2, f && (j.id = f.uid, j.i = f));
  };
  const v = ty(l, c, w);
  return Zi && (d ? d.push(v) : s && v()), v;
}
function uy(l, c, y) {
  const _ = this.proxy, g = pt(l) ? l.includes(".") ? hc(_, l) : () => _[l] : l.bind(_, _);
  let C;
  Ue(c) ? C = c : (C = c.handler, y = c);
  const p = Xi(this), w = cc(g, C.bind(_), y);
  return p(), w;
}
function hc(l, c) {
  const y = c.split(".");
  return () => {
    let _ = l;
    for (let g = 0; g < y.length && _; g++)
      _ = _[y[g]];
    return _;
  };
}
const cy = /* @__PURE__ */ Symbol("_vte"), No = (l) => l.__isTeleport, ra = /* @__PURE__ */ Symbol("_leaveCb");
function hy(l) {
  let c = l[0];
  if (l.length > 1) {
    for (const y of l)
      if (y.type !== Pn) {
        c = y;
        break;
      }
  }
  return c;
}
function dc(l) {
  if (!Na(l))
    return No(l.type) && l.children ? hy(l.children) : l;
  if (l.component)
    return l.component.subTree;
  const { shapeFlag: c, children: y } = l;
  if (y) {
    if (c & 16)
      return y[0];
    if (c & 32 && Ue(y.default))
      return y.default();
  }
}
function Ba(l, c) {
  if (l.shapeFlag & 6 && l.component) {
    l.transition = c;
    const y = l.component.subTree;
    Ba(
      No(y.type) && dc(y) || y,
      c
    );
  } else l.shapeFlag & 128 ? (l.ssContent.transition = c.clone(l.ssContent), l.ssFallback.transition = c.clone(l.ssFallback)) : l.transition = c;
}
function pc(l) {
  l.ids = [l.ids[0] + l.ids[2]++ + "-", 0, 0];
}
function yu(l, c) {
  let y;
  return !!((y = Object.getOwnPropertyDescriptor(l, c)) && !y.configurable);
}
const Co = /* @__PURE__ */ new WeakMap();
function zi(l, c, y, _, g = !1) {
  if (ze(l)) {
    l.forEach(
      (x, E) => zi(
        x,
        c && (ze(c) ? c[E] : c),
        y,
        _,
        g
      )
    );
    return;
  }
  if (qi(_) && !g) {
    _.shapeFlag & 512 && _.type.__asyncResolved && _.component.subTree.component && zi(l, c, y, _.component.subTree);
    return;
  }
  const C = _.shapeFlag & 4 ? Ha(_.component) : _.el, p = g ? null : C, { i: w, r: s } = l, d = c && c.r, f = w.refs === at ? w.refs = {} : w.refs, m = w.setupState, v = /* @__PURE__ */ Xe(m), j = m === at ? Du : (x) => yu(f, x) ? !1 : et(v, x), O = (x, E) => !(E && yu(f, E));
  if (d != null && d !== s) {
    if (mu(c), pt(d))
      f[d] = null, j(d) && (m[d] = null);
    else if (/* @__PURE__ */ jt(d)) {
      const x = c;
      O(d, x.k) && (d.value = null), x.k && (f[x.k] = null);
    }
  }
  if (Ue(s))
    Qi(s, w, 12, [p, f]);
  else {
    const x = pt(s), E = /* @__PURE__ */ jt(s);
    if (x || E) {
      const P = () => {
        if (l.f) {
          const L = x ? j(s) ? m[s] : f[s] : O() || !l.k ? s.value : f[l.k];
          if (g)
            ze(L) && wa(L, C);
          else if (ze(L))
            L.includes(C) || L.push(C);
          else if (x)
            f[s] = [C], j(s) && (m[s] = f[s]);
          else {
            const A = [C];
            O(s, l.k) && (s.value = A), l.k && (f[l.k] = A);
          }
        } else x ? (f[s] = p, j(s) && (m[s] = p)) : E && (O(s, l.k) && (s.value = p), l.k && (f[l.k] = p));
      };
      if (p) {
        const L = () => {
          P(), Co.delete(l);
        };
        L.id = -1, Co.set(l, L), Tt(L, y);
      } else
        mu(l), P();
    }
  }
}
function mu(l) {
  const c = Co.get(l);
  c && (c.flags |= 8, Co.delete(l));
}
Ro().requestIdleCallback;
Ro().cancelIdleCallback;
const qi = (l) => !!l.type.__asyncLoader, Na = (l) => l.type.__isKeepAlive;
function dy(l, c) {
  fc(l, "a", c);
}
function py(l, c) {
  fc(l, "da", c);
}
function fc(l, c, y = Pt) {
  const _ = l.__wdc || (l.__wdc = () => {
    let g = y;
    for (; g; ) {
      if (g.isDeactivated)
        return;
      g = g.parent;
    }
    return l();
  });
  if (Fo(c, _, y), y) {
    let g = y.parent;
    for (; g && g.parent; )
      Na(g.parent.vnode) && fy(_, c, y, g), g = g.parent;
  }
}
function fy(l, c, y, _) {
  const g = Fo(
    c,
    l,
    _,
    !0
    /* prepend */
  );
  bc(() => {
    wa(_[c], g);
  }, y);
}
function Fo(l, c, y = Pt, _ = !1) {
  if (y) {
    const g = y[l] || (y[l] = []), C = c.__weh || (c.__weh = (...p) => {
      Sr();
      const w = Xi(y), s = Zt(c, y, l, p);
      return w(), Pr(), s;
    });
    return _ ? g.unshift(C) : g.push(C), C;
  }
}
const Lr = (l) => (c, y = Pt) => {
  (!Zi || l === "sp") && Fo(l, (..._) => c(..._), y);
}, yy = Lr("bm"), yc = Lr("m"), my = Lr(
  "bu"
), by = Lr("u"), mc = Lr(
  "bum"
), bc = Lr("um"), vy = Lr(
  "sp"
), gy = Lr("rtg"), _y = Lr("rtc");
function wy(l, c = Pt) {
  Fo("ec", l, c);
}
const jy = /* @__PURE__ */ Symbol.for("v-ndc"), ya = (l) => l ? Dc(l) ? Ha(l) : ya(l.parent) : null, Ui = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ kt(/* @__PURE__ */ Object.create(null), {
    $: (l) => l,
    $el: (l) => l.vnode.el,
    $data: (l) => l.data,
    $props: (l) => l.props,
    $attrs: (l) => l.attrs,
    $slots: (l) => l.slots,
    $refs: (l) => l.refs,
    $parent: (l) => ya(l.parent),
    $root: (l) => ya(l.root),
    $host: (l) => l.ce,
    $emit: (l) => l.emit,
    $options: (l) => gc(l),
    $forceUpdate: (l) => l.f || (l.f = () => {
      Ia(l.update);
    }),
    $nextTick: (l) => l.n || (l.n = oc.bind(l.proxy)),
    $watch: (l) => uy.bind(l)
  })
), na = (l, c) => l !== at && !l.__isScriptSetup && et(l, c), ky = {
  get({ _: l }, c) {
    if (c === "__v_skip")
      return !0;
    const { ctx: y, setupState: _, data: g, props: C, accessCache: p, type: w, appContext: s } = l;
    if (c[0] !== "$") {
      const v = p[c];
      if (v !== void 0)
        switch (v) {
          case 1:
            return _[c];
          case 2:
            return g[c];
          case 4:
            return y[c];
          case 3:
            return C[c];
        }
      else {
        if (na(_, c))
          return p[c] = 1, _[c];
        if (g !== at && et(g, c))
          return p[c] = 2, g[c];
        if (et(C, c))
          return p[c] = 3, C[c];
        if (y !== at && et(y, c))
          return p[c] = 4, y[c];
        ma && (p[c] = 0);
      }
    }
    const d = Ui[c];
    let f, m;
    if (d)
      return c === "$attrs" && wt(l.attrs, "get", ""), d(l);
    if (
      // css module (injected by vue-loader)
      (f = w.__cssModules) && (f = f[c])
    )
      return f;
    if (y !== at && et(y, c))
      return p[c] = 4, y[c];
    if (
      // global properties
      m = s.config.globalProperties, et(m, c)
    )
      return m[c];
  },
  set({ _: l }, c, y) {
    const { data: _, setupState: g, ctx: C } = l;
    return na(g, c) ? (g[c] = y, !0) : _ !== at && et(_, c) ? (_[c] = y, !0) : et(l.props, c) || c[0] === "$" && c.slice(1) in l ? !1 : (C[c] = y, !0);
  },
  has({
    _: { data: l, setupState: c, accessCache: y, ctx: _, appContext: g, props: C, type: p }
  }, w) {
    let s;
    return !!(y[w] || l !== at && w[0] !== "$" && et(l, w) || na(c, w) || et(C, w) || et(_, w) || et(Ui, w) || et(g.config.globalProperties, w) || (s = p.__cssModules) && s[w]);
  },
  defineProperty(l, c, y) {
    return y.get != null ? l._.accessCache[c] = 0 : et(y, "value") && this.set(l, c, y.value, null), Reflect.defineProperty(l, c, y);
  }
};
function bu(l) {
  return ze(l) ? l.reduce(
    (c, y) => (c[y] = null, c),
    {}
  ) : l;
}
let ma = !0;
function xy(l) {
  const c = gc(l), y = l.proxy, _ = l.ctx;
  ma = !1, c.beforeCreate && vu(c.beforeCreate, l, "bc");
  const {
    // state
    data: g,
    computed: C,
    methods: p,
    watch: w,
    provide: s,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: m,
    mounted: v,
    beforeUpdate: j,
    updated: O,
    activated: x,
    deactivated: E,
    beforeDestroy: P,
    beforeUnmount: L,
    destroyed: A,
    unmounted: R,
    render: N,
    renderTracked: F,
    renderTriggered: H,
    errorCaptured: D,
    serverPrefetch: M,
    // public API
    expose: U,
    inheritAttrs: V,
    // assets
    components: Z,
    directives: K,
    filters: re
  } = c;
  if (d && Oy(d, _, null), p)
    for (const ne in p) {
      const me = p[ne];
      Ue(me) && (_[ne] = me.bind(y));
    }
  if (g) {
    const ne = g.call(y, y);
    ut(ne) && (l.data = /* @__PURE__ */ La(ne));
  }
  if (ma = !0, C)
    for (const ne in C) {
      const me = C[ne], fe = Ue(me) ? me.bind(y, y) : Ue(me.get) ? me.get.bind(y, y) : fr, ke = !Ue(me) && Ue(me.set) ? me.set.bind(y) : fr, Ee = hm({
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
      vc(w[ne], _, y, ne);
  if (s) {
    const ne = Ue(s) ? s.call(y) : s;
    Reflect.ownKeys(ne).forEach((me) => {
      sy(me, ne[me]);
    });
  }
  f && vu(f, l, "c");
  function oe(ne, me) {
    ze(me) ? me.forEach((fe) => ne(fe.bind(y))) : me && ne(me.bind(y));
  }
  if (oe(yy, m), oe(yc, v), oe(my, j), oe(by, O), oe(dy, x), oe(py, E), oe(wy, D), oe(_y, F), oe(gy, H), oe(mc, L), oe(bc, R), oe(vy, M), ze(U))
    if (U.length) {
      const ne = l.exposed || (l.exposed = {});
      U.forEach((me) => {
        Object.defineProperty(ne, me, {
          get: () => y[me],
          set: (fe) => y[me] = fe,
          enumerable: !0
        });
      });
    } else l.exposed || (l.exposed = {});
  N && l.render === fr && (l.render = N), V != null && (l.inheritAttrs = V), Z && (l.components = Z), K && (l.directives = K), M && pc(l);
}
function Oy(l, c, y = fr) {
  ze(l) && (l = ba(l));
  for (const _ in l) {
    const g = l[_];
    let C;
    ut(g) ? "default" in g ? C = wo(
      g.from || _,
      g.default,
      !0
    ) : C = wo(g.from || _) : C = wo(g), /* @__PURE__ */ jt(C) ? Object.defineProperty(c, _, {
      enumerable: !0,
      configurable: !0,
      get: () => C.value,
      set: (p) => C.value = p
    }) : c[_] = C;
  }
}
function vu(l, c, y) {
  Zt(
    ze(l) ? l.map((_) => _.bind(c.proxy)) : l.bind(c.proxy),
    c,
    y
  );
}
function vc(l, c, y, _) {
  let g = _.includes(".") ? hc(y, _) : () => y[_];
  if (pt(l)) {
    const C = c[l];
    Ue(C) && ta(g, C);
  } else if (Ue(l))
    ta(g, l.bind(y));
  else if (ut(l))
    if (ze(l))
      l.forEach((C) => vc(C, c, y, _));
    else {
      const C = Ue(l.handler) ? l.handler.bind(y) : c[l.handler];
      Ue(C) && ta(g, C, l);
    }
}
function gc(l) {
  const c = l.type, { mixins: y, extends: _ } = c, {
    mixins: g,
    optionsCache: C,
    config: { optionMergeStrategies: p }
  } = l.appContext, w = C.get(c);
  let s;
  return w ? s = w : !g.length && !y && !_ ? s = c : (s = {}, g.length && g.forEach(
    (d) => Eo(s, d, p, !0)
  ), Eo(s, c, p)), ut(c) && C.set(c, s), s;
}
function Eo(l, c, y, _ = !1) {
  const { mixins: g, extends: C } = c;
  C && Eo(l, C, y, !0), g && g.forEach(
    (p) => Eo(l, p, y, !0)
  );
  for (const p in c)
    if (!(_ && p === "expose")) {
      const w = Cy[p] || y && y[p];
      l[p] = w ? w(l[p], c[p]) : c[p];
    }
  return l;
}
const Cy = {
  data: gu,
  props: _u,
  emits: _u,
  // objects
  methods: Fi,
  computed: Fi,
  // lifecycle
  beforeCreate: Et,
  created: Et,
  beforeMount: Et,
  mounted: Et,
  beforeUpdate: Et,
  updated: Et,
  beforeDestroy: Et,
  beforeUnmount: Et,
  destroyed: Et,
  unmounted: Et,
  activated: Et,
  deactivated: Et,
  errorCaptured: Et,
  serverPrefetch: Et,
  // assets
  components: Fi,
  directives: Fi,
  // watch
  watch: Sy,
  // provide / inject
  provide: gu,
  inject: Ey
};
function gu(l, c) {
  return c ? l ? function() {
    return kt(
      Ue(l) ? l.call(this, this) : l,
      Ue(c) ? c.call(this, this) : c
    );
  } : c : l;
}
function Ey(l, c) {
  return Fi(ba(l), ba(c));
}
function ba(l) {
  if (ze(l)) {
    const c = {};
    for (let y = 0; y < l.length; y++)
      c[l[y]] = l[y];
    return c;
  }
  return l;
}
function Et(l, c) {
  return l ? [...new Set([].concat(l, c))] : c;
}
function Fi(l, c) {
  return l ? kt(/* @__PURE__ */ Object.create(null), l, c) : c;
}
function _u(l, c) {
  return l ? ze(l) && ze(c) ? [.../* @__PURE__ */ new Set([...l, ...c])] : kt(
    /* @__PURE__ */ Object.create(null),
    bu(l),
    bu(c ?? {})
  ) : c;
}
function Sy(l, c) {
  if (!l) return c;
  if (!c) return l;
  const y = kt(/* @__PURE__ */ Object.create(null), l);
  for (const _ in c)
    y[_] = Et(l[_], c[_]);
  return y;
}
function _c() {
  return {
    app: null,
    config: {
      isNativeTag: Du,
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
let Py = 0;
function Ty(l, c) {
  return function(_, g = null) {
    Ue(_) || (_ = kt({}, _)), g != null && !ut(g) && (g = null);
    const C = _c(), p = /* @__PURE__ */ new WeakSet(), w = [];
    let s = !1;
    const d = C.app = {
      _uid: Py++,
      _component: _,
      _props: g,
      _container: null,
      _context: C,
      _instance: null,
      version: dm,
      get config() {
        return C.config;
      },
      set config(f) {
      },
      use(f, ...m) {
        return p.has(f) || (f && Ue(f.install) ? (p.add(f), f.install(d, ...m)) : Ue(f) && (p.add(f), f(d, ...m))), d;
      },
      mixin(f) {
        return C.mixins.includes(f) || C.mixins.push(f), d;
      },
      component(f, m) {
        return m ? (C.components[f] = m, d) : C.components[f];
      },
      directive(f, m) {
        return m ? (C.directives[f] = m, d) : C.directives[f];
      },
      mount(f, m, v) {
        if (!s) {
          const j = d._ceVNode || En(_, g);
          return j.appContext = C, v === !0 ? v = "svg" : v === !1 && (v = void 0), l(j, f, v), s = !0, d._container = f, f.__vue_app__ = d, Ha(j.component);
        }
      },
      onUnmount(f) {
        w.push(f);
      },
      unmount() {
        s && (Zt(
          w,
          d._instance,
          16
        ), l(null, d._container), delete d._container.__vue_app__);
      },
      provide(f, m) {
        return C.provides[f] = m, d;
      },
      runWithContext(f) {
        const m = wi;
        wi = d;
        try {
          return f();
        } finally {
          wi = m;
        }
      }
    };
    return d;
  };
}
let wi = null;
const Ly = (l, c) => c === "modelValue" || c === "model-value" ? l.modelModifiers : l[`${c}Modifiers`] || l[`${Wt(c)}Modifiers`] || l[`${Tn(c)}Modifiers`];
function Ay(l, c, ...y) {
  if (l.isUnmounted) return;
  const _ = l.vnode.props || at;
  let g = y;
  const C = c.startsWith("update:"), p = C && Ly(_, c.slice(7));
  p && (p.trim && (g = y.map((f) => pt(f) ? f.trim() : f)), p.number && (g = g.map(bf)));
  let w, s = _[w = Zs(c)] || // also try camelCase event handler (#2249)
  _[w = Zs(Wt(c))];
  !s && C && (s = _[w = Zs(Tn(c))]), s && Zt(
    s,
    l,
    6,
    g
  );
  const d = _[w + "Once"];
  if (d) {
    if (!l.emitted)
      l.emitted = {};
    else if (l.emitted[w])
      return;
    l.emitted[w] = !0, Zt(
      d,
      l,
      6,
      g
    );
  }
}
const Ry = /* @__PURE__ */ new WeakMap();
function wc(l, c, y = !1) {
  const _ = y ? Ry : c.emitsCache, g = _.get(l);
  if (g !== void 0)
    return g;
  const C = l.emits;
  let p = {}, w = !1;
  if (!Ue(l)) {
    const s = (d) => {
      const f = wc(d, c, !0);
      f && (w = !0, kt(p, f));
    };
    !y && c.mixins.length && c.mixins.forEach(s), l.extends && s(l.extends), l.mixins && l.mixins.forEach(s);
  }
  return !C && !w ? (ut(l) && _.set(l, null), null) : (ze(C) ? C.forEach((s) => p[s] = null) : kt(p, C), ut(l) && _.set(l, p), p);
}
function Do(l, c) {
  return !l || !To(c) ? !1 : (c = c.slice(2), c = c === "Once" ? c : c.replace(/Once$/, ""), et(l, c[0].toLowerCase() + c.slice(1)) || et(l, Tn(c)) || et(l, c));
}
function wu(l) {
  const {
    type: c,
    vnode: y,
    proxy: _,
    withProxy: g,
    propsOptions: [C],
    slots: p,
    attrs: w,
    emit: s,
    render: d,
    renderCache: f,
    props: m,
    data: v,
    setupState: j,
    ctx: O,
    inheritAttrs: x
  } = l, E = Oo(l);
  let P, L;
  try {
    if (y.shapeFlag & 4) {
      const R = g || _, N = R;
      P = hr(
        d.call(
          N,
          R,
          f,
          m,
          j,
          v,
          O
        )
      ), L = w;
    } else {
      const R = c;
      P = hr(
        R.length > 1 ? R(
          m,
          { attrs: w, slots: p, emit: s }
        ) : R(
          m,
          null
        )
      ), L = c.props ? w : Iy(w);
    }
  } catch (R) {
    Cn.length = 0, Bo(R, l, 1), P = En(Pn);
  }
  let A = P;
  if (L && x !== !1) {
    const R = Object.keys(L), { shapeFlag: N } = A;
    R.length && N & 7 && (C && R.some(Lo) && (L = By(
      L,
      C
    )), A = ji(A, L, !1, !0));
  }
  if (y.dirs && (A = ji(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(y.dirs) : y.dirs), y.transition) {
    const R = No(A.type) && dc(A) || A;
    Ba(R, y.transition);
  }
  return P = A, Oo(E), P;
}
const Iy = (l) => {
  let c;
  for (const y in l)
    (y === "class" || y === "style" || To(y)) && ((c || (c = {}))[y] = l[y]);
  return c;
}, By = (l, c) => {
  const y = {};
  for (const _ in l)
    (!Lo(_) || !(_.slice(9) in c)) && (y[_] = l[_]);
  return y;
};
function Ny(l, c, y) {
  const { props: _, children: g, component: C } = l, { props: p, children: w, patchFlag: s } = c, d = C.emitsOptions;
  if (c.dirs || c.transition)
    return !0;
  if (y && s >= 0) {
    if (s & 1024)
      return !0;
    if (s & 16)
      return _ ? ju(_, p, d) : !!p;
    if (s & 8) {
      const f = c.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const v = f[m];
        if (jc(p, _, v) && !Do(d, v))
          return !0;
      }
    }
  } else
    return (g || w) && (!w || !w.$stable) ? !0 : _ === p ? !1 : _ ? p ? ju(_, p, d) : !0 : !!p;
  return !1;
}
function ju(l, c, y) {
  const _ = Object.keys(c);
  if (_.length !== Object.keys(l).length)
    return !0;
  for (let g = 0; g < _.length; g++) {
    const C = _[g];
    if (jc(c, l, C) && !Do(y, C))
      return !0;
  }
  return !1;
}
function jc(l, c, y) {
  const _ = l[y], g = c[y];
  return y === "style" && ut(_) && ut(g) ? !Io(_, g) : _ !== g;
}
function Fy({ vnode: l, parent: c, suspense: y }, _) {
  for (; c; ) {
    const g = c.subTree;
    if (g.suspense && g.suspense.activeBranch === l && (g.suspense.vnode.el = g.el = _, l = g), g === l)
      (l = c.vnode).el = _, c = c.parent;
    else
      break;
  }
  y && y.activeBranch === l && (y.vnode.el = _);
}
const kc = {}, xc = () => Object.create(kc), Oc = (l) => Object.getPrototypeOf(l) === kc;
function Dy(l, c, y, _ = !1) {
  const g = {}, C = xc();
  l.propsDefaults = /* @__PURE__ */ Object.create(null), Cc(l, c, g, C);
  for (const p in l.propsOptions[0])
    p in g || (g[p] = void 0);
  y ? l.props = _ ? g : /* @__PURE__ */ $f(g) : l.type.props ? l.props = g : l.props = C, l.attrs = C;
}
function My(l, c, y, _) {
  const {
    props: g,
    attrs: C,
    vnode: { patchFlag: p }
  } = l, w = /* @__PURE__ */ Xe(g), [s] = l.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (_ || p > 0) && !(p & 16)
  ) {
    if (p & 8) {
      const f = l.vnode.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        let v = f[m];
        if (Do(l.emitsOptions, v))
          continue;
        const j = c[v];
        if (s)
          if (et(C, v))
            j !== C[v] && (C[v] = j, d = !0);
          else {
            const O = Wt(v);
            g[O] = va(
              s,
              w,
              O,
              j,
              l,
              !1
            );
          }
        else
          j !== C[v] && (C[v] = j, d = !0);
      }
    }
  } else {
    Cc(l, c, g, C) && (d = !0);
    let f;
    for (const m in w)
      (!c || // for camelCase
      !et(c, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Tn(m)) === m || !et(c, f))) && (s ? y && // for camelCase
      (y[m] !== void 0 || // for kebab-case
      y[f] !== void 0) && (g[m] = va(
        s,
        w,
        m,
        void 0,
        l,
        !0
      )) : delete g[m]);
    if (C !== w)
      for (const m in C)
        (!c || !et(c, m)) && (delete C[m], d = !0);
  }
  d && Er(l.attrs, "set", "");
}
function Cc(l, c, y, _) {
  const [g, C] = l.propsOptions;
  let p = !1, w;
  if (c)
    for (let s in c) {
      if (Mi(s))
        continue;
      const d = c[s];
      let f;
      g && et(g, f = Wt(s)) ? !C || !C.includes(f) ? y[f] = d : (w || (w = {}))[f] = d : Do(l.emitsOptions, s) || (!(s in _) || d !== _[s]) && (_[s] = d, p = !0);
    }
  if (C) {
    const s = /* @__PURE__ */ Xe(y), d = w || at;
    for (let f = 0; f < C.length; f++) {
      const m = C[f];
      y[m] = va(
        g,
        s,
        m,
        d[m],
        l,
        !et(d, m)
      );
    }
  }
  return p;
}
function va(l, c, y, _, g, C) {
  const p = l[y];
  if (p != null) {
    const w = et(p, "default");
    if (w && _ === void 0) {
      const s = p.default;
      if (p.type !== Function && !p.skipFactory && Ue(s)) {
        const { propsDefaults: d } = g;
        if (y in d)
          _ = d[y];
        else {
          const f = Xi(g);
          _ = d[y] = s.call(
            null,
            c
          ), f();
        }
      } else
        _ = s;
      g.ce && g.ce._setProp(y, _);
    }
    p[
      0
      /* shouldCast */
    ] && (C && !w ? _ = !1 : p[
      1
      /* shouldCastTrue */
    ] && (_ === "" || _ === Tn(y)) && (_ = !0));
  }
  return _;
}
const Hy = /* @__PURE__ */ new WeakMap();
function Ec(l, c, y = !1) {
  const _ = y ? Hy : c.propsCache, g = _.get(l);
  if (g)
    return g;
  const C = l.props, p = {}, w = [];
  let s = !1;
  if (!Ue(l)) {
    const f = (m) => {
      s = !0;
      const [v, j] = Ec(m, c, !0);
      kt(p, v), j && w.push(...j);
    };
    !y && c.mixins.length && c.mixins.forEach(f), l.extends && f(l.extends), l.mixins && l.mixins.forEach(f);
  }
  if (!C && !s)
    return ut(l) && _.set(l, jn), jn;
  if (ze(C))
    for (let f = 0; f < C.length; f++) {
      const m = Wt(C[f]);
      ku(m) && (p[m] = at);
    }
  else if (C)
    for (const f in C) {
      const m = Wt(f);
      if (ku(m)) {
        const v = C[f], j = p[m] = ze(v) || Ue(v) ? { type: v } : kt({}, v), O = j.type;
        let x = !1, E = !0;
        if (ze(O))
          for (let P = 0; P < O.length; ++P) {
            const L = O[P], A = Ue(L) && L.name;
            if (A === "Boolean") {
              x = !0;
              break;
            } else A === "String" && (E = !1);
          }
        else
          x = Ue(O) && O.name === "Boolean";
        j[
          0
          /* shouldCast */
        ] = x, j[
          1
          /* shouldCastTrue */
        ] = E, (x || et(j, "default")) && w.push(m);
      }
    }
  const d = [p, w];
  return ut(l) && _.set(l, d), d;
}
function ku(l) {
  return l[0] !== "$" && !Mi(l);
}
const Fa = (l) => l === "_" || l === "_ctx" || l === "$stable", Da = (l) => ze(l) ? l.map(hr) : [hr(l)], Vy = (l, c, y) => {
  if (c._n)
    return c;
  const _ = oy((...g) => Da(c(...g)), y);
  return _._c = !1, _;
}, Sc = (l, c, y) => {
  const _ = l._ctx;
  for (const g in l) {
    if (Fa(g)) continue;
    const C = l[g];
    if (Ue(C))
      c[g] = Vy(g, C, _);
    else if (C != null) {
      const p = Da(C);
      c[g] = () => p;
    }
  }
}, Pc = (l, c) => {
  const y = Da(c);
  l.slots.default = () => y;
}, Tc = (l, c, y) => {
  for (const _ in c)
    (y || !Fa(_)) && (l[_] = c[_]);
}, zy = (l, c, y) => {
  const _ = l.slots = xc();
  if (l.vnode.shapeFlag & 32) {
    const g = c._;
    g ? (Tc(_, c, y), y && Vu(_, "_", g, !0)) : Sc(c, _);
  } else c && Pc(l, c);
}, qy = (l, c, y) => {
  const { vnode: _, slots: g } = l;
  let C = !0, p = at;
  if (_.shapeFlag & 32) {
    const w = c._;
    w ? y && w === 1 ? C = !1 : Tc(g, c, y) : (C = !c.$stable, Sc(c, g)), p = c;
  } else c && (Pc(l, c), p = { default: 1 });
  if (C)
    for (const w in g)
      !Fa(w) && p[w] == null && delete g[w];
}, Tt = Jy;
function Uy(l) {
  return $y(l);
}
function $y(l, c) {
  const y = Ro();
  y.__VUE__ = !0;
  const {
    insert: _,
    remove: g,
    patchProp: C,
    createElement: p,
    createText: w,
    createComment: s,
    setText: d,
    setElementText: f,
    parentNode: m,
    nextSibling: v,
    setScopeId: j = fr,
    insertStaticContent: O
  } = l, x = (T, B, W, Y = null, Q = null, X = null, he = void 0, de = null, le = !!B.dynamicChildren) => {
    if (T === B)
      return;
    T && !Ni(T, B) && (Y = Ye(T), Se(T, Q, X, !0), T = null), B.patchFlag === -2 && (le = !1, B.dynamicChildren = null), B.dynamicChildren && T && T.dynamicChildren && T.dynamicChildren.hasOnce && (B.dynamicChildren === jn && (B.dynamicChildren = []), B.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: je, shapeFlag: be } = B;
    switch (ie) {
      case Mo:
        E(T, B, W, Y);
        break;
      case Pn:
        P(T, B, W, Y);
        break;
      case oa:
        T == null && L(B, W, Y, he);
        break;
      case Or:
        Z(
          T,
          B,
          W,
          Y,
          Q,
          X,
          he,
          de,
          le
        );
        break;
      default:
        be & 1 ? N(
          T,
          B,
          W,
          Y,
          Q,
          X,
          he,
          de,
          le
        ) : be & 6 ? K(
          T,
          B,
          W,
          Y,
          Q,
          X,
          he,
          de,
          le
        ) : (be & 64 || be & 128) && ie.process(
          T,
          B,
          W,
          Y,
          Q,
          X,
          he,
          de,
          le,
          Te
        );
    }
    je != null && Q ? zi(je, T && T.ref, X, B || T, !B) : je == null && T && T.ref != null && zi(T.ref, null, X, T, !0);
  }, E = (T, B, W, Y) => {
    if (T == null)
      _(
        B.el = w(B.children),
        W,
        Y
      );
    else {
      const Q = B.el = T.el;
      B.children !== T.children && d(Q, B.children);
    }
  }, P = (T, B, W, Y) => {
    T == null ? _(
      B.el = s(B.children || ""),
      W,
      Y
    ) : B.el = T.el;
  }, L = (T, B, W, Y) => {
    [T.el, T.anchor] = O(
      T.children,
      B,
      W,
      Y,
      T.el,
      T.anchor
    );
  }, A = ({ el: T, anchor: B }, W, Y) => {
    let Q;
    for (; T && T !== B; )
      Q = v(T), _(T, W, Y), T = Q;
    _(B, W, Y);
  }, R = ({ el: T, anchor: B }) => {
    let W;
    for (; T && T !== B; )
      W = v(T), g(T), T = W;
    g(B);
  }, N = (T, B, W, Y, Q, X, he, de, le) => {
    if (B.type === "svg" ? he = "svg" : B.type === "math" && (he = "mathml"), T == null)
      F(
        B,
        W,
        Y,
        Q,
        X,
        he,
        de,
        le
      );
    else {
      const ie = T.el && T.el._isVueCE ? T.el : null;
      try {
        ie && ie._beginPatch(), M(
          T,
          B,
          Q,
          X,
          he,
          de,
          le
        );
      } finally {
        ie && ie._endPatch();
      }
    }
  }, F = (T, B, W, Y, Q, X, he, de) => {
    let le, ie;
    const { props: je, shapeFlag: be, transition: Ce, dirs: te } = T;
    if (le = T.el = p(
      T.type,
      X,
      je && je.is,
      je
    ), be & 8 ? f(le, T.children) : be & 16 && D(
      T.children,
      le,
      null,
      Y,
      Q,
      ia(T, X),
      he,
      de
    ), te && gn(T, null, Y, "created"), H(le, T, T.scopeId, he, Y), je) {
      for (const ce in je)
        ce !== "value" && !Mi(ce) && C(le, ce, null, je[ce], X, Y);
      "value" in je && C(le, "value", null, je.value, X), (ie = je.onVnodeBeforeMount) && lr(ie, Y, T);
    }
    te && gn(T, null, Y, "beforeMount");
    const ae = Gy(Q, Ce);
    ae && Ce.beforeEnter(le), _(le, B, W), ((ie = je && je.onVnodeMounted) || ae || te) && Tt(() => {
      try {
        ie && lr(ie, Y, T), ae && Ce.enter(le), te && gn(T, null, Y, "mounted");
      } finally {
      }
    }, Q);
  }, H = (T, B, W, Y, Q) => {
    if (W && j(T, W), Y)
      for (let X = 0; X < Y.length; X++)
        j(T, Y[X]);
    if (Q) {
      let X = Q.subTree;
      if (B === X || Ic(X.type) && (X.ssContent === B || X.ssFallback === B)) {
        const he = Q.vnode;
        H(
          T,
          he,
          he.scopeId,
          he.slotScopeIds,
          Q.parent
        );
      }
    }
  }, D = (T, B, W, Y, Q, X, he, de, le = 0) => {
    for (let ie = le; ie < T.length; ie++) {
      const je = T[ie] = de ? Cr(T[ie]) : hr(T[ie]);
      x(
        null,
        je,
        B,
        W,
        Y,
        Q,
        X,
        he,
        de
      );
    }
  }, M = (T, B, W, Y, Q, X, he) => {
    const de = B.el = T.el;
    let { patchFlag: le, dynamicChildren: ie, dirs: je } = B;
    le |= T.patchFlag & 16;
    const be = T.props || at, Ce = B.props || at;
    let te;
    if (W && _n(W, !1), (te = Ce.onVnodeBeforeUpdate) && lr(te, W, B, T), je && gn(B, T, W, "beforeUpdate"), W && _n(W, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!T.dynamicChildren || T.dynamicChildren.length !== ie.length) && (le = 0, he = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && f(de, ""), ie ? U(
      T.dynamicChildren,
      ie,
      de,
      W,
      Y,
      ia(B, Q),
      X
    ) : he || me(
      T,
      B,
      de,
      null,
      W,
      Y,
      ia(B, Q),
      X,
      !1
    ), le > 0) {
      if (le & 16)
        V(de, be, Ce, W, Q);
      else if (le & 2 && be.class !== Ce.class && C(de, "class", null, Ce.class, Q), le & 4 && C(de, "style", be.style, Ce.style, Q), le & 8) {
        const ae = B.dynamicProps;
        for (let ce = 0; ce < ae.length; ce++) {
          const Oe = ae[ce], Ae = be[Oe], Ve = Ce[Oe];
          (Ve !== Ae || Oe === "value") && C(de, Oe, Ae, Ve, Q, W);
        }
      }
      le & 1 && T.children !== B.children && f(de, B.children);
    } else !he && ie == null && V(de, be, Ce, W, Q);
    ((te = Ce.onVnodeUpdated) || je) && Tt(() => {
      te && lr(te, W, B, T), je && gn(B, T, W, "updated");
    }, Y);
  }, U = (T, B, W, Y, Q, X, he) => {
    for (let de = 0; de < B.length; de++) {
      const le = T[de], ie = B[de], je = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === Or || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ni(le, ie) || // - In the case of a component, it could contain anything.
        le.shapeFlag & 198) ? m(le.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      x(
        le,
        ie,
        je,
        null,
        Y,
        Q,
        X,
        he,
        !0
      );
    }
  }, V = (T, B, W, Y, Q) => {
    if (B !== W) {
      if (B !== at)
        for (const X in B)
          !Mi(X) && !(X in W) && C(
            T,
            X,
            B[X],
            null,
            Q,
            Y
          );
      for (const X in W) {
        if (Mi(X)) continue;
        const he = W[X], de = B[X];
        he !== de && X !== "value" && C(T, X, de, he, Q, Y);
      }
      "value" in W && C(T, "value", B.value, W.value, Q);
    }
  }, Z = (T, B, W, Y, Q, X, he, de, le) => {
    const ie = B.el = T ? T.el : w(""), je = B.anchor = T ? T.anchor : w("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: te } = B;
    te && (de = de ? de.concat(te) : te), T == null ? (_(ie, W, Y), _(je, W, Y), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      B.children || [],
      W,
      je,
      Q,
      X,
      he,
      de,
      le
    )) : be > 0 && be & 64 && Ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    T.dynamicChildren && T.dynamicChildren.length === Ce.length ? (U(
      T.dynamicChildren,
      Ce,
      W,
      Q,
      X,
      he,
      de
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (B.key != null || Q && B === Q.subTree) && Lc(
      T,
      B,
      !0
      /* shallow */
    )) : me(
      T,
      B,
      W,
      je,
      Q,
      X,
      he,
      de,
      le
    );
  }, K = (T, B, W, Y, Q, X, he, de, le) => {
    B.slotScopeIds = de, T == null ? B.shapeFlag & 512 ? Q.ctx.activate(
      B,
      W,
      Y,
      he,
      le
    ) : re(
      B,
      W,
      Y,
      Q,
      X,
      he,
      le
    ) : ue(T, B, le);
  }, re = (T, B, W, Y, Q, X, he) => {
    const de = T.component = im(
      T,
      Y,
      Q
    );
    if (Na(T) && (de.ctx.renderer = Te), sm(de, !1, he), de.asyncDep) {
      if (Q && Q.registerDep(de, oe, he), !T.el) {
        const le = de.subTree = En(Pn);
        P(null, le, B, W), T.placeholder = le.el;
      }
    } else
      oe(
        de,
        T,
        B,
        W,
        Q,
        X,
        he
      );
  }, ue = (T, B, W) => {
    const Y = B.component = T.component;
    if (Ny(T, B, W))
      if (Y.asyncDep && !Y.asyncResolved) {
        B.el = T.el, ne(Y, B, W);
        return;
      } else
        Y.next = B, Y.update();
    else
      B.el = T.el, Y.vnode = B;
  }, oe = (T, B, W, Y, Q, X, he) => {
    const de = () => {
      if (T.isMounted) {
        let { next: be, bu: Ce, u: te, parent: ae, vnode: ce } = T;
        {
          const ct = Ac(T);
          if (ct) {
            be && (be.el = ce.el, ne(T, be, he)), ct.asyncDep.then(() => {
              Tt(() => {
                T.isUnmounted || ie();
              }, Q);
            });
            return;
          }
        }
        let Oe = be, Ae;
        _n(T, !1), be ? (be.el = ce.el, ne(T, be, he)) : be = ce, Ce && Ys(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && lr(Ae, ae, be, ce), _n(T, !0);
        const Ve = wu(T), rt = T.subTree;
        T.subTree = Ve, x(
          rt,
          Ve,
          // parent may have changed if it's in a teleport
          m(rt.el),
          // anchor may have changed if it's in a fragment
          Ye(rt),
          T,
          Q,
          X
        ), be.el = Ve.el, Oe === null && Fy(T, Ve.el), te && Tt(te, Q), (Ae = be.props && be.props.onVnodeUpdated) && Tt(
          () => lr(Ae, ae, be, ce),
          Q
        );
      } else {
        let be;
        const { el: Ce, props: te } = B, { bm: ae, m: ce, parent: Oe, root: Ae, type: Ve } = T, rt = qi(B);
        _n(T, !1), ae && Ys(ae), !rt && (be = te && te.onVnodeBeforeMount) && lr(be, Oe, B), _n(T, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(
            Ve,
            T.parent ? T.parent.type : void 0
          );
          const ct = T.subTree = wu(T);
          x(
            null,
            ct,
            W,
            Y,
            T,
            Q,
            X
          ), B.el = ct.el;
        }
        if (ce && Tt(ce, Q), !rt && (be = te && te.onVnodeMounted)) {
          const ct = B;
          Tt(
            () => lr(be, Oe, ct),
            Q
          );
        }
        (B.shapeFlag & 256 || Oe && qi(Oe.vnode) && Oe.vnode.shapeFlag & 256) && T.a && Tt(T.a, Q), T.isMounted = !0, B = W = Y = null;
      }
    };
    T.scope.on();
    const le = T.effect = new qu(de);
    T.scope.off();
    const ie = T.update = le.run.bind(le), je = T.job = le.runIfDirty.bind(le);
    je.i = T, je.id = T.uid, le.scheduler = () => Ia(je), _n(T, !0), ie();
  }, ne = (T, B, W) => {
    B.component = T;
    const Y = T.vnode.props;
    T.vnode = B, T.next = null, My(T, B.props, Y, W), qy(T, B.children, W), Sr(), fu(T), Pr();
  }, me = (T, B, W, Y, Q, X, he, de, le = !1) => {
    const ie = T && T.children, je = T ? T.shapeFlag : 0, be = B.children, { patchFlag: Ce, shapeFlag: te } = B;
    if (Ce > 0) {
      if (Ce & 128) {
        ke(
          ie,
          be,
          W,
          Y,
          Q,
          X,
          he,
          de,
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
          X,
          he,
          de,
          le
        );
        return;
      }
    }
    te & 8 ? (je & 16 && De(ie, Q, X), be !== ie && f(W, be)) : je & 16 ? te & 16 ? ke(
      ie,
      be,
      W,
      Y,
      Q,
      X,
      he,
      de,
      le
    ) : De(ie, Q, X, !0) : (je & 8 && f(W, ""), te & 16 && D(
      be,
      W,
      Y,
      Q,
      X,
      he,
      de,
      le
    ));
  }, fe = (T, B, W, Y, Q, X, he, de, le) => {
    T = T || jn, B = B || jn;
    const ie = T.length, je = B.length, be = Math.min(ie, je);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const te = B[Ce] = le ? Cr(B[Ce]) : hr(B[Ce]);
      x(
        T[Ce],
        te,
        W,
        null,
        Q,
        X,
        he,
        de,
        le
      );
    }
    ie > je ? De(
      T,
      Q,
      X,
      !0,
      !1,
      be
    ) : D(
      B,
      W,
      Y,
      Q,
      X,
      he,
      de,
      le,
      be
    );
  }, ke = (T, B, W, Y, Q, X, he, de, le) => {
    let ie = 0;
    const je = B.length;
    let be = T.length - 1, Ce = je - 1;
    for (; ie <= be && ie <= Ce; ) {
      const te = T[ie], ae = B[ie] = le ? Cr(B[ie]) : hr(B[ie]);
      if (Ni(te, ae))
        x(
          te,
          ae,
          W,
          null,
          Q,
          X,
          he,
          de,
          le
        );
      else
        break;
      ie++;
    }
    for (; ie <= be && ie <= Ce; ) {
      const te = T[be], ae = B[Ce] = le ? Cr(B[Ce]) : hr(B[Ce]);
      if (Ni(te, ae))
        x(
          te,
          ae,
          W,
          null,
          Q,
          X,
          he,
          de,
          le
        );
      else
        break;
      be--, Ce--;
    }
    if (ie > be) {
      if (ie <= Ce) {
        const te = Ce + 1, ae = te < je ? B[te].el : Y;
        for (; ie <= Ce; )
          x(
            null,
            B[ie] = le ? Cr(B[ie]) : hr(B[ie]),
            W,
            ae,
            Q,
            X,
            he,
            de,
            le
          ), ie++;
      }
    } else if (ie > Ce)
      for (; ie <= be; )
        Se(T[ie], Q, X, !0), ie++;
    else {
      const te = ie, ae = ie, ce = /* @__PURE__ */ new Map();
      for (ie = ae; ie <= Ce; ie++) {
        const Je = B[ie] = le ? Cr(B[ie]) : hr(B[ie]);
        Je.key != null && ce.set(Je.key, ie);
      }
      let Oe, Ae = 0;
      const Ve = Ce - ae + 1;
      let rt = !1, ct = 0;
      const ft = new Array(Ve);
      for (ie = 0; ie < Ve; ie++) ft[ie] = 0;
      for (ie = te; ie <= be; ie++) {
        const Je = T[ie];
        if (Ae >= Ve) {
          Se(Je, Q, X, !0);
          continue;
        }
        let Ze;
        if (Je.key != null)
          Ze = ce.get(Je.key);
        else
          for (Oe = ae; Oe <= Ce; Oe++)
            if (ft[Oe - ae] === 0 && Ni(Je, B[Oe])) {
              Ze = Oe;
              break;
            }
        Ze === void 0 ? Se(Je, Q, X, !0) : (ft[Ze - ae] = ie + 1, Ze >= ct ? ct = Ze : rt = !0, x(
          Je,
          B[Ze],
          W,
          null,
          Q,
          X,
          he,
          de,
          le
        ), Ae++);
      }
      const yt = rt ? Wy(ft) : jn;
      for (Oe = yt.length - 1, ie = Ve - 1; ie >= 0; ie--) {
        const Je = ae + ie, Ze = B[Je], mr = B[Je + 1], en = Je + 1 < je ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          mr.el || Rc(mr)
        ) : Y;
        ft[ie] === 0 ? x(
          null,
          Ze,
          W,
          en,
          Q,
          X,
          he,
          de,
          le
        ) : rt && (Oe < 0 || ie !== yt[Oe] ? Ee(Ze, W, en, 2) : Oe--);
      }
    }
  }, Ee = (T, B, W, Y, Q = null) => {
    const { el: X, type: he, transition: de, children: le, shapeFlag: ie } = T;
    if (ie & 6) {
      Ee(T.component.subTree, B, W, Y);
      return;
    }
    if (ie & 128) {
      T.suspense.move(B, W, Y);
      return;
    }
    if (ie & 64) {
      he.move(T, B, W, Te);
      return;
    }
    if (he === Or) {
      _(X, B, W);
      for (let be = 0; be < le.length; be++)
        Ee(le[be], B, W, Y);
      _(T.anchor, B, W);
      return;
    }
    if (he === oa) {
      A(T, B, W);
      return;
    }
    if (Y !== 2 && ie & 1 && de)
      if (Y === 0)
        de.persisted && !X[ra] ? _(X, B, W) : (de.beforeEnter(X), _(X, B, W), Tt(() => de.enter(X), Q));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: te } = de, ae = () => {
          T.ctx.isUnmounted ? g(X) : _(X, B, W);
        }, ce = () => {
          const Oe = X._isLeaving || !!X[ra];
          X._isLeaving && X[ra](
            !0
            /* cancelled */
          ), de.persisted && !Oe ? ae() : be(X, () => {
            ae(), te && te();
          });
        };
        Ce ? Ce(X, ae, ce) : ce();
      }
    else
      _(X, B, W);
  }, Se = (T, B, W, Y = !1, Q = !1) => {
    const {
      type: X,
      props: he,
      ref: de,
      children: le,
      dynamicChildren: ie,
      shapeFlag: je,
      patchFlag: be,
      dirs: Ce,
      cacheIndex: te,
      memo: ae
    } = T;
    if ((be === -2 || ie && ie.hasOnce) && (Q = !1), de != null && (Sr(), zi(de, null, W, T, !0), Pr()), te != null && (!T.ctx || T.ctx === B) && (B.renderCache[te] = void 0), je & 256) {
      B.ctx.deactivate(T);
      return;
    }
    const ce = je & 1 && Ce, Oe = !qi(T);
    let Ae;
    if (Oe && (Ae = he && he.onVnodeBeforeUnmount) && lr(Ae, B, T), je & 6)
      Pe(T.component, W, Y);
    else {
      if (je & 128) {
        T.suspense.unmount(W, Y);
        return;
      }
      ce && gn(T, null, B, "beforeUnmount"), je & 64 ? T.type.remove(
        T,
        B,
        W,
        Te,
        Y
      ) : ie && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !ie.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (X !== Or || be > 0 && be & 64) ? De(
        ie,
        B,
        W,
        !1,
        !0
      ) : (X === Or && be & 384 || !Q && je & 16) && De(le, B, W), Y && ye(T);
    }
    const Ve = ae != null && te == null;
    (Oe && (Ae = he && he.onVnodeUnmounted) || ce || Ve) && Tt(() => {
      Ae && lr(Ae, B, T), ce && gn(T, null, B, "unmounted"), Ve && (T.el = null);
    }, W);
  }, ye = (T) => {
    const { type: B, el: W, anchor: Y, transition: Q } = T;
    if (B === Or) {
      Re(W, Y);
      return;
    }
    if (B === oa) {
      R(T), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
      return;
    }
    const X = () => {
      g(W), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
    };
    if (T.shapeFlag & 1 && Q && !Q.persisted) {
      const { leave: he, delayLeave: de } = Q, le = () => he(W, X);
      de ? de(T.el, X, le) : le();
    } else
      X();
  }, Re = (T, B) => {
    let W;
    for (; T !== B; )
      W = v(T), g(T), T = W;
    g(B);
  }, Pe = (T, B, W) => {
    const { bum: Y, scope: Q, job: X, subTree: he, um: de, m: le, a: ie } = T;
    xu(le), xu(ie), Y && Ys(Y), Q.stop(), X ? (X.flags |= 8, Se(he, T, B, W)) : T.vnode.el && he && (he.transition = T.vnode.transition, Se(he, T, B, W)), de && Tt(de, B), Tt(() => {
      T.isUnmounted = !0;
    }, B);
  }, De = (T, B, W, Y = !1, Q = !1, X = 0) => {
    for (let he = X; he < T.length; he++)
      Se(T[he], B, W, Y, Q);
  }, Ye = (T) => {
    if (T.shapeFlag & 6)
      return Ye(T.component.subTree);
    if (T.shapeFlag & 128)
      return T.suspense.next();
    const B = v(T.anchor || T.el), W = B && B[cy];
    return W ? v(W) : B;
  };
  let tt = !1;
  const He = (T, B, W) => {
    let Y;
    T == null ? B._vnode && (Se(B._vnode, null, null, !0), Y = B._vnode.component) : x(
      B._vnode || null,
      T,
      B,
      null,
      null,
      null,
      W
    ), B._vnode = T, tt || (tt = !0, fu(Y), ac(), tt = !1);
  }, Te = {
    p: x,
    um: Se,
    m: Ee,
    r: ye,
    mt: re,
    mc: D,
    pc: me,
    pbc: U,
    n: Ye,
    o: l
  };
  return {
    render: He,
    hydrate: void 0,
    createApp: Ty(He)
  };
}
function ia({ type: l, props: c }, y) {
  return y === "svg" && l === "foreignObject" || y === "mathml" && l === "annotation-xml" && c && c.encoding && c.encoding.includes("html") ? void 0 : y;
}
function _n({ effect: l, job: c }, y) {
  y ? (l.flags |= 32, c.flags |= 4) : (l.flags &= -33, c.flags &= -5);
}
function Gy(l, c) {
  return (!l || l && !l.pendingBranch) && c && !c.persisted;
}
function Lc(l, c, y = !1) {
  const _ = l.children, g = c.children;
  if (ze(_) && ze(g))
    for (let C = 0; C < _.length; C++) {
      const p = _[C];
      let w = g[C];
      w.shapeFlag & 1 && !w.dynamicChildren && ((w.patchFlag <= 0 || w.patchFlag === 32) && (w = g[C] = Cr(g[C]), w.el = p.el), !y && w.patchFlag !== -2 && Lc(p, w)), w.type === Mo && (w.patchFlag === -1 && (w = g[C] = Cr(w)), w.el = p.el), w.type === Pn && !w.el && (w.el = p.el);
    }
}
function Wy(l) {
  const c = l.slice(), y = [0];
  let _, g, C, p, w;
  const s = l.length;
  for (_ = 0; _ < s; _++) {
    const d = l[_];
    if (d !== 0) {
      if (g = y[y.length - 1], l[g] < d) {
        c[_] = g, y.push(_);
        continue;
      }
      for (C = 0, p = y.length - 1; C < p; )
        w = C + p >> 1, l[y[w]] < d ? C = w + 1 : p = w;
      d < l[y[C]] && (C > 0 && (c[_] = y[C - 1]), y[C] = _);
    }
  }
  for (C = y.length, p = y[C - 1]; C-- > 0; )
    y[C] = p, p = c[p];
  return y;
}
function Ac(l) {
  const c = l.subTree.component;
  if (c)
    return c.asyncDep && !c.asyncResolved ? c : Ac(c);
}
function xu(l) {
  if (l)
    for (let c = 0; c < l.length; c++)
      l[c].flags |= 8;
}
function Rc(l) {
  if (l.placeholder)
    return l.placeholder;
  const c = l.component;
  return c ? Rc(c.subTree) : null;
}
const Ic = (l) => l.__isSuspense;
function Jy(l, c) {
  c && c.pendingBranch ? ze(l) ? c.effects.push(...l) : c.effects.push(l) : iy(l);
}
const Or = /* @__PURE__ */ Symbol.for("v-fgt"), Mo = /* @__PURE__ */ Symbol.for("v-txt"), Pn = /* @__PURE__ */ Symbol.for("v-cmt"), oa = /* @__PURE__ */ Symbol.for("v-stc"), Cn = [];
let It = null;
function Ky(l = !1) {
  Cn.push(It = l ? null : []);
}
function Bc() {
  Cn.pop(), It = Cn[Cn.length - 1] || null;
}
let Ji = 1;
function Ou(l, c = !1) {
  Ji += l, l < 0 && It && c && (It.hasOnce = !0);
}
function Zy(l) {
  return l.dynamicChildren = Ji > 0 ? It || jn : null, Bc(), Ji > 0 && It && It.push(l), l;
}
function Yy(l, c, y, _, g, C) {
  return Zy(
    Ma(
      l,
      c,
      y,
      _,
      g,
      C,
      !0
    )
  );
}
function Nc(l) {
  return l ? l.__v_isVNode === !0 : !1;
}
function Ni(l, c) {
  return l.type === c.type && l.key === c.key;
}
const Fc = ({ key: l }) => l ?? null, jo = ({
  ref: l,
  ref_key: c,
  ref_for: y
}) => (typeof l == "number" && (l = "" + l), l != null ? pt(l) || /* @__PURE__ */ jt(l) || Ue(l) ? { i: pr, r: l, k: c, f: !!y } : l : null);
function Ma(l, c = null, y = null, _ = 0, g = null, C = l === Or ? 0 : 1, p = !1, w = !1) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l,
    props: c,
    key: c && Fc(c),
    ref: c && jo(c),
    scopeId: uc,
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
    patchFlag: _,
    dynamicProps: g,
    dynamicChildren: null,
    appContext: null,
    ctx: pr
  };
  return w ? (So(s, y), C & 128 && l.normalize(s)) : y && (s.shapeFlag |= pt(y) ? 8 : 16), Ji > 0 && // avoid a block node from tracking itself
  !p && // has current parent block
  It && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (s.patchFlag > 0 || C & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  s.patchFlag !== 32 && It.push(s), s;
}
const En = Qy;
function Qy(l, c = null, y = null, _ = 0, g = null, C = !1) {
  if ((!l || l === jy) && (l = Pn), Nc(l)) {
    const w = ji(
      l,
      c,
      !0
      /* mergeRef: true */
    );
    return y && So(w, y), Ji > 0 && !C && It && (w.shapeFlag & 6 ? It[It.indexOf(l)] = w : It.push(w)), w.patchFlag = -2, w;
  }
  if (cm(l) && (l = l.__vccOpts), c) {
    c = Xy(c);
    let { class: w, style: s } = c;
    w && !pt(w) && (c.class = xa(w)), ut(s) && (/* @__PURE__ */ Ra(s) && !ze(s) && (s = kt({}, s)), c.style = ka(s));
  }
  const p = pt(l) ? 1 : Ic(l) ? 128 : No(l) ? 64 : ut(l) ? 4 : Ue(l) ? 2 : 0;
  return Ma(
    l,
    c,
    y,
    _,
    g,
    p,
    C,
    !0
  );
}
function Xy(l) {
  return l ? /* @__PURE__ */ Ra(l) || Oc(l) ? kt({}, l) : l : null;
}
function ji(l, c, y = !1, _ = !1) {
  const { props: g, ref: C, patchFlag: p, children: w, transition: s } = l, d = c ? tm(g || {}, c) : g, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l.type,
    props: d,
    key: d && Fc(d),
    ref: c && c.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      y && C ? ze(C) ? C.concat(jo(c)) : [C, jo(c)] : jo(c)
    ) : C,
    scopeId: l.scopeId,
    slotScopeIds: l.slotScopeIds,
    children: w,
    target: l.target,
    targetStart: l.targetStart,
    targetAnchor: l.targetAnchor,
    staticCount: l.staticCount,
    shapeFlag: l.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: c && l.type !== Or ? p === -1 ? 16 : p | 16 : p,
    dynamicProps: l.dynamicProps,
    dynamicChildren: l.dynamicChildren,
    appContext: l.appContext,
    dirs: l.dirs,
    transition: s,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: l.component,
    suspense: l.suspense,
    ssContent: l.ssContent && ji(l.ssContent),
    ssFallback: l.ssFallback && ji(l.ssFallback),
    placeholder: l.placeholder,
    el: l.el,
    anchor: l.anchor,
    ctx: l.ctx,
    ce: l.ce,
    cacheIndex: l.cacheIndex
  };
  return s && _ && Ba(
    f,
    s.clone(f)
  ), f;
}
function em(l = " ", c = 0) {
  return En(Mo, null, l, c);
}
function hr(l) {
  return l == null || typeof l == "boolean" ? En(Pn) : ze(l) ? En(
    Or,
    null,
    // #3666, avoid reference pollution when reusing vnode
    l.slice()
  ) : Nc(l) ? Cr(l) : En(Mo, null, String(l));
}
function Cr(l) {
  return l.el === null && l.patchFlag !== -1 || l.memo ? l : ji(l);
}
function So(l, c) {
  let y = 0;
  const { shapeFlag: _ } = l;
  if (c == null)
    c = null;
  else if (ze(c))
    y = 16;
  else if (typeof c == "object")
    if (_ & 65) {
      const g = c.default;
      g && (g._c && (g._d = !1), So(l, g()), g._c && (g._d = !0));
      return;
    } else {
      y = 32;
      const g = c._;
      !g && !Oc(c) ? c._ctx = pr : g === 3 && pr && (pr.slots._ === 1 ? c._ = 1 : (c._ = 2, l.patchFlag |= 1024));
    }
  else if (Ue(c)) {
    if (_ & 65) {
      So(l, { default: c });
      return;
    }
    c = { default: c, _ctx: pr }, y = 32;
  } else
    c = String(c), _ & 64 ? (y = 16, c = [em(c)]) : y = 8;
  l.children = c, l.shapeFlag |= y;
}
function tm(...l) {
  const c = {};
  for (let y = 0; y < l.length; y++) {
    const _ = l[y];
    for (const g in _)
      if (g === "class")
        c.class !== _.class && (c.class = xa([c.class, _.class]));
      else if (g === "style")
        c.style = ka([c.style, _.style]);
      else if (To(g)) {
        const C = c[g], p = _[g];
        p && C !== p && !(ze(C) && C.includes(p)) ? c[g] = C ? [].concat(C, p) : p : p == null && C == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Lo(g) && (c[g] = p);
      } else g !== "" && (c[g] = _[g]);
  }
  return c;
}
function lr(l, c, y, _ = null) {
  Zt(l, c, 7, [
    y,
    _
  ]);
}
const rm = _c();
let nm = 0;
function im(l, c, y) {
  const _ = l.type, g = (c ? c.appContext : l.appContext) || rm, C = {
    uid: nm++,
    vnode: l,
    type: _,
    parent: c,
    appContext: g,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Cf(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: c ? c.provides : Object.create(g.provides),
    ids: c ? c.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ec(_, g),
    emitsOptions: wc(_, g),
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
  return C.ctx = { _: C }, C.root = c ? c.root : C, C.emit = Ay.bind(null, C), l.ce && l.ce(C), C;
}
let Pt = null;
const om = () => Pt || pr;
let Po, Ki;
{
  const l = Ro(), c = (y, _) => {
    let g;
    return (g = l[y]) || (g = l[y] = []), g.push(_), (C) => {
      g.length > 1 ? g.forEach((p) => p(C)) : g[0](C);
    };
  };
  Po = c(
    "__VUE_INSTANCE_SETTERS__",
    (y) => Pt = y
  ), Ki = c(
    "__VUE_SSR_SETTERS__",
    (y) => Zi = y
  );
}
const Xi = (l) => {
  const c = Pt;
  return Po(l), l.scope.on(), () => {
    l.scope.off(), Po(c);
  };
}, Cu = () => {
  Pt && Pt.scope.off(), Po(null);
};
function Dc(l) {
  return l.vnode.shapeFlag & 4;
}
let Zi = !1;
function sm(l, c = !1, y = !1) {
  c && Ki(c);
  const { props: _, children: g } = l.vnode, C = Dc(l);
  Dy(l, _, C, c), zy(l, g, y || c);
  const p = C ? am(l, c) : void 0;
  return c && Ki(!1), p;
}
function am(l, c) {
  const y = l.type;
  l.accessCache = /* @__PURE__ */ Object.create(null), l.proxy = new Proxy(l.ctx, ky);
  const { setup: _ } = y;
  if (_) {
    Sr();
    const g = l.setupContext = _.length > 1 ? um(l) : null, C = Xi(l), p = Qi(
      _,
      l,
      0,
      [
        l.props,
        g
      ]
    ), w = Mu(p);
    if (Pr(), C(), (w || l.sp) && !qi(l) && pc(l), w) {
      if (p.then(Cu, Cu), c)
        return p.then((s) => {
          Ki(!0);
          try {
            Eu(l, s, c);
          } finally {
            Ki(!1);
          }
        }).catch((s) => {
          Bo(s, l, 0);
        });
      l.asyncDep = p;
    } else
      Eu(l, p);
  } else
    Mc(l);
}
function Eu(l, c, y) {
  Ue(c) ? l.type.__ssrInlineRender ? l.ssrRender = c : l.render = c : ut(c) && (l.setupState = nc(c)), Mc(l);
}
function Mc(l, c, y) {
  const _ = l.type;
  l.render || (l.render = _.render || fr);
  {
    const g = Xi(l);
    Sr();
    try {
      xy(l);
    } finally {
      Pr(), g();
    }
  }
}
const lm = {
  get(l, c) {
    return wt(l, "get", ""), l[c];
  }
};
function um(l) {
  const c = (y) => {
    l.exposed = y || {};
  };
  return {
    attrs: new Proxy(l.attrs, lm),
    slots: l.slots,
    emit: l.emit,
    expose: c
  };
}
function Ha(l) {
  return l.exposed ? l.exposeProxy || (l.exposeProxy = new Proxy(nc(Gf(l.exposed)), {
    get(c, y) {
      if (y in c)
        return c[y];
      if (y in Ui)
        return Ui[y](l);
    },
    has(c, y) {
      return y in c || y in Ui;
    }
  })) : l.proxy;
}
function cm(l) {
  return Ue(l) && "__vccOpts" in l;
}
const hm = (l, c) => /* @__PURE__ */ Xf(l, c, Zi), dm = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ga;
const Su = typeof window < "u" && window.trustedTypes;
if (Su)
  try {
    ga = /* @__PURE__ */ Su.createPolicy("vue", {
      createHTML: (l) => l
    });
  } catch {
  }
const Hc = ga ? (l) => ga.createHTML(l) : (l) => l, pm = "http://www.w3.org/2000/svg", fm = "http://www.w3.org/1998/Math/MathML", xr = typeof document < "u" ? document : null, Pu = xr && /* @__PURE__ */ xr.createElement("template"), ym = {
  insert: (l, c, y) => {
    c.insertBefore(l, y || null);
  },
  remove: (l) => {
    const c = l.parentNode;
    c && c.removeChild(l);
  },
  createElement: (l, c, y, _) => {
    const g = c === "svg" ? xr.createElementNS(pm, l) : c === "mathml" ? xr.createElementNS(fm, l) : y ? xr.createElement(l, { is: y }) : xr.createElement(l);
    return l === "select" && _ && _.multiple != null && g.setAttribute("multiple", _.multiple), g;
  },
  createText: (l) => xr.createTextNode(l),
  createComment: (l) => xr.createComment(l),
  setText: (l, c) => {
    l.nodeValue = c;
  },
  setElementText: (l, c) => {
    l.textContent = c;
  },
  parentNode: (l) => l.parentNode,
  nextSibling: (l) => l.nextSibling,
  querySelector: (l) => xr.querySelector(l),
  setScopeId(l, c) {
    l.setAttribute(c, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(l, c, y, _, g, C) {
    const p = y ? y.previousSibling : c.lastChild;
    if (g && (g === C || g.nextSibling))
      for (; c.insertBefore(g.cloneNode(!0), y), !(g === C || !(g = g.nextSibling)); )
        ;
    else {
      Pu.innerHTML = Hc(
        _ === "svg" ? `<svg>${l}</svg>` : _ === "mathml" ? `<math>${l}</math>` : l
      );
      const w = Pu.content;
      if (_ === "svg" || _ === "mathml") {
        const s = w.firstChild;
        for (; s.firstChild; )
          w.appendChild(s.firstChild);
        w.removeChild(s);
      }
      c.insertBefore(w, y);
    }
    return [
      // first
      p ? p.nextSibling : c.firstChild,
      // last
      y ? y.previousSibling : c.lastChild
    ];
  }
}, mm = /* @__PURE__ */ Symbol("_vtc");
function bm(l, c, y) {
  const _ = l[mm];
  _ && (c = (c ? [c, ..._] : [..._]).join(" ")), c == null ? l.removeAttribute("class") : y ? l.setAttribute("class", c) : l.className = c;
}
const Tu = /* @__PURE__ */ Symbol("_vod"), vm = /* @__PURE__ */ Symbol("_vsh"), gm = /* @__PURE__ */ Symbol(""), _m = /(?:^|;)\s*display\s*:/;
function wm(l, c, y) {
  const _ = l.style, g = pt(y);
  let C = !1;
  if (y && !g) {
    if (c)
      if (pt(c))
        for (const p of c.split(";")) {
          const w = p.slice(0, p.indexOf(":")).trim();
          y[w] == null && Di(_, w, "");
        }
      else
        for (const p in c)
          y[p] == null && Di(_, p, "");
    for (const p in y) {
      p === "display" && (C = !0);
      const w = y[p];
      w != null ? km(
        l,
        p,
        !pt(c) && c ? c[p] : void 0,
        w
      ) || Di(_, p, w) : Di(_, p, "");
    }
  } else if (g) {
    if (c !== y) {
      const p = _[gm];
      p && (y += ";" + p), _.cssText = y, C = _m.test(y);
    }
  } else c && l.removeAttribute("style");
  Tu in l && (l[Tu] = C ? _.display : "", l[vm] && (_.display = "none"));
}
const _o = /\s*!important$/;
function Di(l, c, y) {
  if (ze(y))
    y.forEach((_) => Di(l, c, _));
  else if (y == null && (y = ""), c.startsWith("--"))
    _o.test(y) ? l.setProperty(c, y.replace(_o, ""), "important") : l.setProperty(c, y);
  else {
    const _ = jm(l, c);
    _o.test(y) ? l.setProperty(
      Tn(_),
      y.replace(_o, ""),
      "important"
    ) : l[_] = y;
  }
}
const Lu = ["Webkit", "Moz", "ms"], sa = {};
function jm(l, c) {
  const y = sa[c];
  if (y)
    return y;
  let _ = Wt(c);
  if (_ !== "filter" && _ in l)
    return sa[c] = _;
  _ = Hu(_);
  for (let g = 0; g < Lu.length; g++) {
    const C = Lu[g] + _;
    if (C in l)
      return sa[c] = C;
  }
  return c;
}
function km(l, c, y, _) {
  return l.tagName === "TEXTAREA" && (c === "width" || c === "height") && pt(_) && y === _;
}
const Au = "http://www.w3.org/1999/xlink";
function Ru(l, c, y, _, g, C = kf(c)) {
  _ && c.startsWith("xlink:") ? y == null ? l.removeAttributeNS(Au, c.slice(6, c.length)) : l.setAttributeNS(Au, c, y) : y == null || C && !zu(y) ? l.removeAttribute(c) : l.setAttribute(
    c,
    C ? "" : Xr(y) ? String(y) : y
  );
}
function Iu(l, c, y, _, g) {
  if (c === "innerHTML" || c === "textContent") {
    y != null && (l[c] = c === "innerHTML" ? Hc(y) : y);
    return;
  }
  const C = l.tagName;
  if (c === "value" && C !== "PROGRESS" && // custom elements may use _value internally
  !C.includes("-")) {
    const w = C === "OPTION" ? l.getAttribute("value") || "" : l.value, s = y == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      l.type === "checkbox" ? "on" : ""
    ) : String(y);
    (w !== s || !("_value" in l)) && (l.value = s), y == null && l.removeAttribute(c), l._value = y;
    return;
  }
  let p = !1;
  if (y === "" || y == null) {
    const w = typeof l[c];
    w === "boolean" ? y = zu(y) : y == null && w === "string" ? (y = "", p = !0) : w === "number" && (y = 0, p = !0);
  }
  try {
    l[c] = y;
  } catch {
  }
  p && l.removeAttribute(g || c);
}
function xm(l, c, y, _) {
  l.addEventListener(c, y, _);
}
function Om(l, c, y, _) {
  l.removeEventListener(c, y, _);
}
const Bu = /* @__PURE__ */ Symbol("_vei");
function Cm(l, c, y, _, g = null) {
  const C = l[Bu] || (l[Bu] = {}), p = C[c];
  if (_ && p)
    p.value = _;
  else {
    const [w, s] = Pm(c);
    if (_) {
      const d = C[c] = Am(
        _,
        g
      );
      xm(l, w, d, s);
    } else p && (Om(l, w, p, s), C[c] = void 0);
  }
}
const Em = /(Once|Passive|Capture)$/, Sm = /^on:?(?:Once|Passive|Capture)$/;
function Pm(l) {
  let c, y;
  for (; (y = l.match(Em)) && !Sm.test(l); )
    c || (c = {}), l = l.slice(0, l.length - y[1].length), c[y[1].toLowerCase()] = !0;
  return [l[2] === ":" ? l.slice(3) : Tn(l.slice(2)), c];
}
let aa = 0;
const Tm = /* @__PURE__ */ Promise.resolve(), Lm = () => aa || (Tm.then(() => aa = 0), aa = Date.now());
function Am(l, c) {
  const y = (_) => {
    if (!_._vts)
      _._vts = Date.now();
    else if (_._vts <= y.attached)
      return;
    const g = y.value;
    if (ze(g)) {
      const C = _.stopImmediatePropagation;
      _.stopImmediatePropagation = () => {
        C.call(_), _._stopped = !0;
      };
      const p = g.slice(), w = [_];
      for (let s = 0; s < p.length && !_._stopped; s++) {
        const d = p[s];
        d && Zt(
          d,
          c,
          5,
          w
        );
      }
    } else
      Zt(
        g,
        c,
        5,
        [_]
      );
  };
  return y.value = l, y.attached = Lm(), y;
}
const Nu = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // lowercase letter
l.charCodeAt(2) > 96 && l.charCodeAt(2) < 123, Rm = (l, c, y, _, g, C) => {
  const p = g === "svg";
  c === "class" ? bm(l, _, p) : c === "style" ? wm(l, y, _) : To(c) ? Lo(c) || Cm(l, c, y, _, C) : (c[0] === "." ? (c = c.slice(1), !0) : c[0] === "^" ? (c = c.slice(1), !1) : Im(l, c, _, p)) ? (Iu(l, c, _), !l.tagName.includes("-") && (c === "value" || c === "checked" || c === "selected") && Ru(l, c, _, p, C, c !== "value")) : /* #11081 force set props for possible async custom element */ l._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Bm(l, c) || // @ts-expect-error _def is private
  l._def.__asyncLoader && (/[A-Z]/.test(c) || !pt(_))) ? Iu(l, Wt(c), _, C, c) : (c === "true-value" ? l._trueValue = _ : c === "false-value" && (l._falseValue = _), Ru(l, c, _, p));
};
function Im(l, c, y, _) {
  if (_)
    return !!(c === "innerHTML" || c === "textContent" || c in l && Nu(c) && Ue(y));
  if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA")
    return !1;
  if (c === "width" || c === "height") {
    const g = l.tagName;
    if (g === "IMG" || g === "VIDEO" || g === "CANVAS" || g === "SOURCE")
      return !1;
  }
  return Nu(c) && pt(y) ? !1 : c in l;
}
function Bm(l, c) {
  const y = (
    // @ts-expect-error _def is private
    l._def.props
  );
  if (!y)
    return !1;
  const _ = Wt(c);
  return Array.isArray(y) ? y.some((g) => Wt(g) === _) : Object.keys(y).some((g) => Wt(g) === _);
}
const Nm = /* @__PURE__ */ kt({ patchProp: Rm }, ym);
let Fu;
function Fm() {
  return Fu || (Fu = Uy(Nm));
}
const Dm = (...l) => {
  const c = Fm().createApp(...l), { mount: y } = c;
  return c.mount = (_) => {
    const g = Hm(_);
    if (!g) return;
    const C = c._component;
    !Ue(C) && !C.render && !C.template && (C.template = g.innerHTML), g.nodeType === 1 && (g.textContent = "");
    const p = y(g, !1, Mm(g));
    return g instanceof Element && (g.removeAttribute("v-cloak"), g.setAttribute("data-v-app", "")), p;
  }, c;
};
function Mm(l) {
  if (l instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && l instanceof MathMLElement)
    return "mathml";
}
function Hm(l) {
  return pt(l) ? document.querySelector(l) : l;
}
function Vm(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var Vc = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(l, c) {
  (function(y, _) {
    l.exports = _();
  })(self, () => (() => {
    var y = { 9306: (p, w, s) => {
      var d = s(4901), f = s(6823), m = TypeError;
      p.exports = function(v) {
        if (d(v)) return v;
        throw new m(f(v) + " is not a function");
      };
    }, 5548: (p, w, s) => {
      var d = s(3517), f = s(6823), m = TypeError;
      p.exports = function(v) {
        if (d(v)) return v;
        throw new m(f(v) + " is not a constructor");
      };
    }, 3506: (p, w, s) => {
      var d = s(3925), f = String, m = TypeError;
      p.exports = function(v) {
        if (d(v)) return v;
        throw new m("Can't set " + f(v) + " as a prototype");
      };
    }, 6469: (p, w, s) => {
      var d = s(8227), f = s(2360), m = s(4913).f, v = d("unscopables"), j = Array.prototype;
      j[v] === void 0 && m(j, v, { configurable: !0, value: f(null) }), p.exports = function(O) {
        j[v][O] = !0;
      };
    }, 7829: (p, w, s) => {
      var d = s(8183).charAt;
      p.exports = function(f, m, v) {
        return m + (v ? d(f, m).length : 1);
      };
    }, 679: (p, w, s) => {
      var d = s(1625), f = TypeError;
      p.exports = function(m, v) {
        if (d(v, m)) return m;
        throw new f("Incorrect invocation");
      };
    }, 8551: (p, w, s) => {
      var d = s(34), f = String, m = TypeError;
      p.exports = function(v) {
        if (d(v)) return v;
        throw new m(f(v) + " is not an object");
      };
    }, 235: (p, w, s) => {
      var d = s(9213).forEach, f = s(4598)("forEach");
      p.exports = f ? [].forEach : function(m) {
        return d(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (p, w, s) => {
      var d = s(6080), f = s(9565), m = s(8981), v = s(6319), j = s(4209), O = s(3517), x = s(6198), E = s(4659), P = s(81), L = s(851), A = Array;
      p.exports = function(R) {
        var N = m(R), F = O(this), H = arguments.length, D = H > 1 ? arguments[1] : void 0, M = D !== void 0;
        M && (D = d(D, H > 2 ? arguments[2] : void 0));
        var U, V, Z, K, re, ue, oe = L(N), ne = 0;
        if (!oe || this === A && j(oe)) for (U = x(N), V = F ? new this(U) : A(U); U > ne; ne++) ue = M ? D(N[ne], ne) : N[ne], E(V, ne, ue);
        else for (V = F ? new this() : [], re = (K = P(N, oe)).next; !(Z = f(re, K)).done; ne++) ue = M ? v(K, D, [Z.value, ne], !0) : Z.value, E(V, ne, ue);
        return V.length = ne, V;
      };
    }, 9617: (p, w, s) => {
      var d = s(5397), f = s(5610), m = s(6198), v = function(j) {
        return function(O, x, E) {
          var P = d(O), L = m(P);
          if (L === 0) return !j && -1;
          var A, R = f(E, L);
          if (j && x != x) {
            for (; L > R; ) if ((A = P[R++]) != A) return !0;
          } else for (; L > R; R++) if ((j || R in P) && P[R] === x) return j || R || 0;
          return !j && -1;
        };
      };
      p.exports = { includes: v(!0), indexOf: v(!1) };
    }, 9213: (p, w, s) => {
      var d = s(6080), f = s(9504), m = s(7055), v = s(8981), j = s(6198), O = s(1469), x = f([].push), E = function(P) {
        var L = P === 1, A = P === 2, R = P === 3, N = P === 4, F = P === 6, H = P === 7, D = P === 5 || F;
        return function(M, U, V, Z) {
          for (var K, re, ue = v(M), oe = m(ue), ne = j(oe), me = d(U, V), fe = 0, ke = Z || O, Ee = L ? ke(M, ne) : A || H ? ke(M, 0) : void 0; ne > fe; fe++) if ((D || fe in oe) && (re = me(K = oe[fe], fe, ue), P)) if (L) Ee[fe] = re;
          else if (re) switch (P) {
            case 3:
              return !0;
            case 5:
              return K;
            case 6:
              return fe;
            case 2:
              x(Ee, K);
          }
          else switch (P) {
            case 4:
              return !1;
            case 7:
              x(Ee, K);
          }
          return F ? -1 : R || N ? N : Ee;
        };
      };
      p.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (p, w, s) => {
      var d = s(9039), f = s(8227), m = s(7388), v = f("species");
      p.exports = function(j) {
        return m >= 51 || !d(function() {
          var O = [];
          return (O.constructor = {})[v] = function() {
            return { foo: 1 };
          }, O[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (p, w, s) => {
      var d = s(9039);
      p.exports = function(f, m) {
        var v = [][f];
        return !!v && d(function() {
          v.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (p, w, s) => {
      var d = s(9306), f = s(8981), m = s(7055), v = s(6198), j = TypeError, O = "Reduce of empty array with no initial value", x = function(E) {
        return function(P, L, A, R) {
          var N = f(P), F = m(N), H = v(N);
          if (d(L), H === 0 && A < 2) throw new j(O);
          var D = E ? H - 1 : 0, M = E ? -1 : 1;
          if (A < 2) for (; ; ) {
            if (D in F) {
              R = F[D], D += M;
              break;
            }
            if (D += M, E ? D < 0 : H <= D) throw new j(O);
          }
          for (; E ? D >= 0 : H > D; D += M) D in F && (R = L(R, F[D], D, N));
          return R;
        };
      };
      p.exports = { left: x(!1), right: x(!0) };
    }, 4527: (p, w, s) => {
      var d = s(3724), f = s(4376), m = TypeError, v = Object.getOwnPropertyDescriptor, j = d && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (O) {
          return O instanceof TypeError;
        }
      }();
      p.exports = j ? function(O, x) {
        if (f(O) && !v(O, "length").writable) throw new m("Cannot set read only .length");
        return O.length = x;
      } : function(O, x) {
        return O.length = x;
      };
    }, 7680: (p, w, s) => {
      var d = s(9504);
      p.exports = d([].slice);
    }, 4488: (p, w, s) => {
      var d = s(7680), f = Math.floor, m = function(v, j) {
        var O = v.length;
        if (O < 8) for (var x, E, P = 1; P < O; ) {
          for (E = P, x = v[P]; E && j(v[E - 1], x) > 0; ) v[E] = v[--E];
          E !== P++ && (v[E] = x);
        }
        else for (var L = f(O / 2), A = m(d(v, 0, L), j), R = m(d(v, L), j), N = A.length, F = R.length, H = 0, D = 0; H < N || D < F; ) v[H + D] = H < N && D < F ? j(A[H], R[D]) <= 0 ? A[H++] : R[D++] : H < N ? A[H++] : R[D++];
        return v;
      };
      p.exports = m;
    }, 7433: (p, w, s) => {
      var d = s(4376), f = s(3517), m = s(34), v = s(8227)("species"), j = Array;
      p.exports = function(O) {
        var x;
        return d(O) && (x = O.constructor, (f(x) && (x === j || d(x.prototype)) || m(x) && (x = x[v]) === null) && (x = void 0)), x === void 0 ? j : x;
      };
    }, 1469: (p, w, s) => {
      var d = s(7433);
      p.exports = function(f, m) {
        return new (d(f))(m === 0 ? 0 : m);
      };
    }, 6319: (p, w, s) => {
      var d = s(8551), f = s(9539);
      p.exports = function(m, v, j, O) {
        try {
          return O ? v(d(j)[0], j[1]) : v(j);
        } catch (x) {
          f(m, "throw", x);
        }
      };
    }, 4428: (p, w, s) => {
      var d = s(8227)("iterator"), f = !1;
      try {
        var m = 0, v = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          f = !0;
        } };
        v[d] = function() {
          return this;
        }, Array.from(v, function() {
          throw 2;
        });
      } catch {
      }
      p.exports = function(j, O) {
        try {
          if (!O && !f) return !1;
        } catch {
          return !1;
        }
        var x = !1;
        try {
          var E = {};
          E[d] = function() {
            return { next: function() {
              return { done: x = !0 };
            } };
          }, j(E);
        } catch {
        }
        return x;
      };
    }, 4576: (p, w, s) => {
      var d = s(9504), f = d({}.toString), m = d("".slice);
      p.exports = function(v) {
        return m(f(v), 8, -1);
      };
    }, 6955: (p, w, s) => {
      var d = s(2140), f = s(4901), m = s(4576), v = s(8227)("toStringTag"), j = Object, O = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      p.exports = d ? m : function(x) {
        var E, P, L;
        return x === void 0 ? "Undefined" : x === null ? "Null" : typeof (P = function(A, R) {
          try {
            return A[R];
          } catch {
          }
        }(E = j(x), v)) == "string" ? P : O ? m(E) : (L = m(E)) === "Object" && f(E.callee) ? "Arguments" : L;
      };
    }, 7740: (p, w, s) => {
      var d = s(9297), f = s(5031), m = s(7347), v = s(4913);
      p.exports = function(j, O, x) {
        for (var E = f(O), P = v.f, L = m.f, A = 0; A < E.length; A++) {
          var R = E[A];
          d(j, R) || x && d(x, R) || P(j, R, L(O, R));
        }
      };
    }, 1436: (p, w, s) => {
      var d = s(8227)("match");
      p.exports = function(f) {
        var m = /./;
        try {
          "/./"[f](m);
        } catch {
          try {
            return m[d] = !1, "/./"[f](m);
          } catch {
          }
        }
        return !1;
      };
    }, 2211: (p, w, s) => {
      var d = s(9039);
      p.exports = !d(function() {
        function f() {
        }
        return f.prototype.constructor = null, Object.getPrototypeOf(new f()) !== f.prototype;
      });
    }, 2529: (p) => {
      p.exports = function(w, s) {
        return { value: w, done: s };
      };
    }, 6699: (p, w, s) => {
      var d = s(3724), f = s(4913), m = s(6980);
      p.exports = d ? function(v, j, O) {
        return f.f(v, j, m(1, O));
      } : function(v, j, O) {
        return v[j] = O, v;
      };
    }, 6980: (p) => {
      p.exports = function(w, s) {
        return { enumerable: !(1 & w), configurable: !(2 & w), writable: !(4 & w), value: s };
      };
    }, 4659: (p, w, s) => {
      var d = s(3724), f = s(4913), m = s(6980);
      p.exports = function(v, j, O) {
        d ? f.f(v, j, m(0, O)) : v[j] = O;
      };
    }, 380: (p, w, s) => {
      var d = s(9504), f = s(9039), m = s(533).start, v = RangeError, j = isFinite, O = Math.abs, x = Date.prototype, E = x.toISOString, P = d(x.getTime), L = d(x.getUTCDate), A = d(x.getUTCFullYear), R = d(x.getUTCHours), N = d(x.getUTCMilliseconds), F = d(x.getUTCMinutes), H = d(x.getUTCMonth), D = d(x.getUTCSeconds);
      p.exports = f(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !f(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(P(this))) throw new v("Invalid time value");
        var M = this, U = A(M), V = N(M), Z = U < 0 ? "-" : U > 9999 ? "+" : "";
        return Z + m(O(U), Z ? 6 : 4, 0) + "-" + m(H(M) + 1, 2, 0) + "-" + m(L(M), 2, 0) + "T" + m(R(M), 2, 0) + ":" + m(F(M), 2, 0) + ":" + m(D(M), 2, 0) + "." + m(V, 3, 0) + "Z";
      } : E;
    }, 3640: (p, w, s) => {
      var d = s(8551), f = s(4270), m = TypeError;
      p.exports = function(v) {
        if (d(this), v === "string" || v === "default") v = "string";
        else if (v !== "number") throw new m("Incorrect hint");
        return f(this, v);
      };
    }, 2106: (p, w, s) => {
      var d = s(283), f = s(4913);
      p.exports = function(m, v, j) {
        return j.get && d(j.get, v, { getter: !0 }), j.set && d(j.set, v, { setter: !0 }), f.f(m, v, j);
      };
    }, 6840: (p, w, s) => {
      var d = s(4901), f = s(4913), m = s(283), v = s(9433);
      p.exports = function(j, O, x, E) {
        E || (E = {});
        var P = E.enumerable, L = E.name !== void 0 ? E.name : O;
        if (d(x) && m(x, L, E), E.global) P ? j[O] = x : v(O, x);
        else {
          try {
            E.unsafe ? j[O] && (P = !0) : delete j[O];
          } catch {
          }
          P ? j[O] = x : f.f(j, O, { value: x, enumerable: !1, configurable: !E.nonConfigurable, writable: !E.nonWritable });
        }
        return j;
      };
    }, 9433: (p, w, s) => {
      var d = s(4475), f = Object.defineProperty;
      p.exports = function(m, v) {
        try {
          f(d, m, { value: v, configurable: !0, writable: !0 });
        } catch {
          d[m] = v;
        }
        return v;
      };
    }, 4606: (p, w, s) => {
      var d = s(6823), f = TypeError;
      p.exports = function(m, v) {
        if (!delete m[v]) throw new f("Cannot delete property " + d(v) + " of " + d(m));
      };
    }, 3724: (p, w, s) => {
      var d = s(9039);
      p.exports = !d(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (p, w, s) => {
      var d = s(4475), f = s(34), m = d.document, v = f(m) && f(m.createElement);
      p.exports = function(j) {
        return v ? m.createElement(j) : {};
      };
    }, 6837: (p) => {
      var w = TypeError;
      p.exports = function(s) {
        if (s > 9007199254740991) throw w("Maximum allowed index exceeded");
        return s;
      };
    }, 7400: (p) => {
      p.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (p, w, s) => {
      var d = s(4055)("span").classList, f = d && d.constructor && d.constructor.prototype;
      p.exports = f === Object.prototype ? void 0 : f;
    }, 8834: (p, w, s) => {
      var d = s(9392).match(/firefox\/(\d+)/i);
      p.exports = !!d && +d[1];
    }, 7290: (p, w, s) => {
      var d = s(516), f = s(9088);
      p.exports = !d && !f && typeof window == "object" && typeof document == "object";
    }, 6763: (p) => {
      p.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (p) => {
      p.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (p, w, s) => {
      var d = s(9392);
      p.exports = /MSIE|Trident/.test(d);
    }, 28: (p, w, s) => {
      var d = s(9392);
      p.exports = /ipad|iphone|ipod/i.test(d) && typeof Pebble < "u";
    }, 8119: (p, w, s) => {
      var d = s(9392);
      p.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(d);
    }, 9088: (p, w, s) => {
      var d = s(4475), f = s(4576);
      p.exports = f(d.process) === "process";
    }, 6765: (p, w, s) => {
      var d = s(9392);
      p.exports = /web0s(?!.*chrome)/i.test(d);
    }, 9392: (p) => {
      p.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (p, w, s) => {
      var d, f, m = s(4475), v = s(9392), j = m.process, O = m.Deno, x = j && j.versions || O && O.version, E = x && x.v8;
      E && (f = (d = E.split("."))[0] > 0 && d[0] < 4 ? 1 : +(d[0] + d[1])), !f && v && (!(d = v.match(/Edge\/(\d+)/)) || d[1] >= 74) && (d = v.match(/Chrome\/(\d+)/)) && (f = +d[1]), p.exports = f;
    }, 9160: (p, w, s) => {
      var d = s(9392).match(/AppleWebKit\/(\d+)\./);
      p.exports = !!d && +d[1];
    }, 8727: (p) => {
      p.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (p, w, s) => {
      var d = s(4475), f = s(7347).f, m = s(6699), v = s(6840), j = s(9433), O = s(7740), x = s(2796);
      p.exports = function(E, P) {
        var L, A, R, N, F, H = E.target, D = E.global, M = E.stat;
        if (L = D ? d : M ? d[H] || j(H, {}) : d[H] && d[H].prototype) for (A in P) {
          if (N = P[A], R = E.dontCallGetSet ? (F = f(L, A)) && F.value : L[A], !x(D ? A : H + (M ? "." : "#") + A, E.forced) && R !== void 0) {
            if (typeof N == typeof R) continue;
            O(N, R);
          }
          (E.sham || R && R.sham) && m(N, "sham", !0), v(L, A, N, E);
        }
      };
    }, 9039: (p) => {
      p.exports = function(w) {
        try {
          return !!w();
        } catch {
          return !0;
        }
      };
    }, 9228: (p, w, s) => {
      s(7495);
      var d = s(9565), f = s(6840), m = s(7323), v = s(9039), j = s(8227), O = s(6699), x = j("species"), E = RegExp.prototype;
      p.exports = function(P, L, A, R) {
        var N = j(P), F = !v(function() {
          var U = {};
          return U[N] = function() {
            return 7;
          }, ""[P](U) !== 7;
        }), H = F && !v(function() {
          var U = !1, V = /a/;
          return P === "split" && ((V = {}).constructor = {}, V.constructor[x] = function() {
            return V;
          }, V.flags = "", V[N] = /./[N]), V.exec = function() {
            return U = !0, null;
          }, V[N](""), !U;
        });
        if (!F || !H || A) {
          var D = /./[N], M = L(N, ""[P], function(U, V, Z, K, re) {
            var ue = V.exec;
            return ue === m || ue === E.exec ? F && !re ? { done: !0, value: d(D, V, Z, K) } : { done: !0, value: d(U, Z, V, K) } : { done: !1 };
          });
          f(String.prototype, P, M[0]), f(E, N, M[1]);
        }
        R && O(E[N], "sham", !0);
      };
    }, 8745: (p, w, s) => {
      var d = s(616), f = Function.prototype, m = f.apply, v = f.call;
      p.exports = typeof Reflect == "object" && Reflect.apply || (d ? v.bind(m) : function() {
        return v.apply(m, arguments);
      });
    }, 6080: (p, w, s) => {
      var d = s(7476), f = s(9306), m = s(616), v = d(d.bind);
      p.exports = function(j, O) {
        return f(j), O === void 0 ? j : m ? v(j, O) : function() {
          return j.apply(O, arguments);
        };
      };
    }, 616: (p, w, s) => {
      var d = s(9039);
      p.exports = !d(function() {
        var f = (function() {
        }).bind();
        return typeof f != "function" || f.hasOwnProperty("prototype");
      });
    }, 566: (p, w, s) => {
      var d = s(9504), f = s(9306), m = s(34), v = s(9297), j = s(7680), O = s(616), x = Function, E = d([].concat), P = d([].join), L = {};
      p.exports = O ? x.bind : function(A) {
        var R = f(this), N = R.prototype, F = j(arguments, 1), H = function() {
          var D = E(F, j(arguments));
          return this instanceof H ? function(M, U, V) {
            if (!v(L, U)) {
              for (var Z = [], K = 0; K < U; K++) Z[K] = "a[" + K + "]";
              L[U] = x("C,a", "return new C(" + P(Z, ",") + ")");
            }
            return L[U](M, V);
          }(R, D.length, D) : R.apply(A, D);
        };
        return m(N) && (H.prototype = N), H;
      };
    }, 9565: (p, w, s) => {
      var d = s(616), f = Function.prototype.call;
      p.exports = d ? f.bind(f) : function() {
        return f.apply(f, arguments);
      };
    }, 350: (p, w, s) => {
      var d = s(3724), f = s(9297), m = Function.prototype, v = d && Object.getOwnPropertyDescriptor, j = f(m, "name"), O = j && (function() {
      }).name === "something", x = j && (!d || d && v(m, "name").configurable);
      p.exports = { EXISTS: j, PROPER: O, CONFIGURABLE: x };
    }, 6706: (p, w, s) => {
      var d = s(9504), f = s(9306);
      p.exports = function(m, v, j) {
        try {
          return d(f(Object.getOwnPropertyDescriptor(m, v)[j]));
        } catch {
        }
      };
    }, 7476: (p, w, s) => {
      var d = s(4576), f = s(9504);
      p.exports = function(m) {
        if (d(m) === "Function") return f(m);
      };
    }, 9504: (p, w, s) => {
      var d = s(616), f = Function.prototype, m = f.call, v = d && f.bind.bind(m, m);
      p.exports = d ? v : function(j) {
        return function() {
          return m.apply(j, arguments);
        };
      };
    }, 7751: (p, w, s) => {
      var d = s(4475), f = s(4901);
      p.exports = function(m, v) {
        return arguments.length < 2 ? (j = d[m], f(j) ? j : void 0) : d[m] && d[m][v];
        var j;
      };
    }, 851: (p, w, s) => {
      var d = s(6955), f = s(5966), m = s(4117), v = s(6269), j = s(8227)("iterator");
      p.exports = function(O) {
        if (!m(O)) return f(O, j) || f(O, "@@iterator") || v[d(O)];
      };
    }, 81: (p, w, s) => {
      var d = s(9565), f = s(9306), m = s(8551), v = s(6823), j = s(851), O = TypeError;
      p.exports = function(x, E) {
        var P = arguments.length < 2 ? j(x) : E;
        if (f(P)) return m(d(P, x));
        throw new O(v(x) + " is not iterable");
      };
    }, 6933: (p, w, s) => {
      var d = s(9504), f = s(4376), m = s(4901), v = s(4576), j = s(655), O = d([].push);
      p.exports = function(x) {
        if (m(x)) return x;
        if (f(x)) {
          for (var E = x.length, P = [], L = 0; L < E; L++) {
            var A = x[L];
            typeof A == "string" ? O(P, A) : typeof A != "number" && v(A) !== "Number" && v(A) !== "String" || O(P, j(A));
          }
          var R = P.length, N = !0;
          return function(F, H) {
            if (N) return N = !1, H;
            if (f(this)) return H;
            for (var D = 0; D < R; D++) if (P[D] === F) return H;
          };
        }
      };
    }, 5966: (p, w, s) => {
      var d = s(9306), f = s(4117);
      p.exports = function(m, v) {
        var j = m[v];
        return f(j) ? void 0 : d(j);
      };
    }, 2478: (p, w, s) => {
      var d = s(9504), f = s(8981), m = Math.floor, v = d("".charAt), j = d("".replace), O = d("".slice), x = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      p.exports = function(P, L, A, R, N, F) {
        var H = A + P.length, D = R.length, M = E;
        return N !== void 0 && (N = f(N), M = x), j(F, M, function(U, V) {
          var Z;
          switch (v(V, 0)) {
            case "$":
              return "$";
            case "&":
              return P;
            case "`":
              return O(L, 0, A);
            case "'":
              return O(L, H);
            case "<":
              Z = N[O(V, 1, -1)];
              break;
            default:
              var K = +V;
              if (K === 0) return U;
              if (K > D) {
                var re = m(K / 10);
                return re === 0 ? U : re <= D ? R[re - 1] === void 0 ? v(V, 1) : R[re - 1] + v(V, 1) : U;
              }
              Z = R[K - 1];
          }
          return Z === void 0 ? "" : Z;
        });
      };
    }, 4475: function(p, w, s) {
      var d = function(f) {
        return f && f.Math === Math && f;
      };
      p.exports = d(typeof globalThis == "object" && globalThis) || d(typeof window == "object" && window) || d(typeof self == "object" && self) || d(typeof s.g == "object" && s.g) || d(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (p, w, s) => {
      var d = s(9504), f = s(8981), m = d({}.hasOwnProperty);
      p.exports = Object.hasOwn || function(v, j) {
        return m(f(v), j);
      };
    }, 421: (p) => {
      p.exports = {};
    }, 3138: (p) => {
      p.exports = function(w, s) {
        try {
          arguments.length === 1 ? console.error(w) : console.error(w, s);
        } catch {
        }
      };
    }, 397: (p, w, s) => {
      var d = s(7751);
      p.exports = d("document", "documentElement");
    }, 5917: (p, w, s) => {
      var d = s(3724), f = s(9039), m = s(4055);
      p.exports = !d && !f(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (p, w, s) => {
      var d = s(9504), f = s(9039), m = s(4576), v = Object, j = d("".split);
      p.exports = f(function() {
        return !v("z").propertyIsEnumerable(0);
      }) ? function(O) {
        return m(O) === "String" ? j(O, "") : v(O);
      } : v;
    }, 3167: (p, w, s) => {
      var d = s(4901), f = s(34), m = s(2967);
      p.exports = function(v, j, O) {
        var x, E;
        return m && d(x = j.constructor) && x !== O && f(E = x.prototype) && E !== O.prototype && m(v, E), v;
      };
    }, 3706: (p, w, s) => {
      var d = s(9504), f = s(4901), m = s(7629), v = d(Function.toString);
      f(m.inspectSource) || (m.inspectSource = function(j) {
        return v(j);
      }), p.exports = m.inspectSource;
    }, 1181: (p, w, s) => {
      var d, f, m, v = s(8622), j = s(4475), O = s(34), x = s(6699), E = s(9297), P = s(7629), L = s(6119), A = s(421), R = "Object already initialized", N = j.TypeError, F = j.WeakMap;
      if (v || P.state) {
        var H = P.state || (P.state = new F());
        H.get = H.get, H.has = H.has, H.set = H.set, d = function(M, U) {
          if (H.has(M)) throw new N(R);
          return U.facade = M, H.set(M, U), U;
        }, f = function(M) {
          return H.get(M) || {};
        }, m = function(M) {
          return H.has(M);
        };
      } else {
        var D = L("state");
        A[D] = !0, d = function(M, U) {
          if (E(M, D)) throw new N(R);
          return U.facade = M, x(M, D, U), U;
        }, f = function(M) {
          return E(M, D) ? M[D] : {};
        }, m = function(M) {
          return E(M, D);
        };
      }
      p.exports = { set: d, get: f, has: m, enforce: function(M) {
        return m(M) ? f(M) : d(M, {});
      }, getterFor: function(M) {
        return function(U) {
          var V;
          if (!O(U) || (V = f(U)).type !== M) throw new N("Incompatible receiver, " + M + " required");
          return V;
        };
      } };
    }, 4209: (p, w, s) => {
      var d = s(8227), f = s(6269), m = d("iterator"), v = Array.prototype;
      p.exports = function(j) {
        return j !== void 0 && (f.Array === j || v[m] === j);
      };
    }, 4376: (p, w, s) => {
      var d = s(4576);
      p.exports = Array.isArray || function(f) {
        return d(f) === "Array";
      };
    }, 4901: (p) => {
      var w = typeof document == "object" && document.all;
      p.exports = w === void 0 && w !== void 0 ? function(s) {
        return typeof s == "function" || s === w;
      } : function(s) {
        return typeof s == "function";
      };
    }, 3517: (p, w, s) => {
      var d = s(9504), f = s(9039), m = s(4901), v = s(6955), j = s(7751), O = s(3706), x = function() {
      }, E = j("Reflect", "construct"), P = /^\s*(?:class|function)\b/, L = d(P.exec), A = !P.test(x), R = function(F) {
        if (!m(F)) return !1;
        try {
          return E(x, [], F), !0;
        } catch {
          return !1;
        }
      }, N = function(F) {
        if (!m(F)) return !1;
        switch (v(F)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return A || !!L(P, O(F));
        } catch {
          return !0;
        }
      };
      N.sham = !0, p.exports = !E || f(function() {
        var F;
        return R(R.call) || !R(Object) || !R(function() {
          F = !0;
        }) || F;
      }) ? N : R;
    }, 6575: (p, w, s) => {
      var d = s(9297);
      p.exports = function(f) {
        return f !== void 0 && (d(f, "value") || d(f, "writable"));
      };
    }, 2796: (p, w, s) => {
      var d = s(9039), f = s(4901), m = /#|\.prototype\./, v = function(P, L) {
        var A = O[j(P)];
        return A === E || A !== x && (f(L) ? d(L) : !!L);
      }, j = v.normalize = function(P) {
        return String(P).replace(m, ".").toLowerCase();
      }, O = v.data = {}, x = v.NATIVE = "N", E = v.POLYFILL = "P";
      p.exports = v;
    }, 4117: (p) => {
      p.exports = function(w) {
        return w == null;
      };
    }, 34: (p, w, s) => {
      var d = s(4901);
      p.exports = function(f) {
        return typeof f == "object" ? f !== null : d(f);
      };
    }, 3925: (p, w, s) => {
      var d = s(34);
      p.exports = function(f) {
        return d(f) || f === null;
      };
    }, 6395: (p) => {
      p.exports = !1;
    }, 788: (p, w, s) => {
      var d = s(34), f = s(4576), m = s(8227)("match");
      p.exports = function(v) {
        var j;
        return d(v) && ((j = v[m]) !== void 0 ? !!j : f(v) === "RegExp");
      };
    }, 757: (p, w, s) => {
      var d = s(7751), f = s(4901), m = s(1625), v = s(7040), j = Object;
      p.exports = v ? function(O) {
        return typeof O == "symbol";
      } : function(O) {
        var x = d("Symbol");
        return f(x) && m(x.prototype, j(O));
      };
    }, 2652: (p, w, s) => {
      var d = s(6080), f = s(9565), m = s(8551), v = s(6823), j = s(4209), O = s(6198), x = s(1625), E = s(81), P = s(851), L = s(9539), A = TypeError, R = function(F, H) {
        this.stopped = F, this.result = H;
      }, N = R.prototype;
      p.exports = function(F, H, D) {
        var M, U, V, Z, K, re, ue, oe = D && D.that, ne = !(!D || !D.AS_ENTRIES), me = !(!D || !D.IS_RECORD), fe = !(!D || !D.IS_ITERATOR), ke = !(!D || !D.INTERRUPTED), Ee = d(H, oe), Se = function(Re) {
          return M && L(M, "normal", Re), new R(!0, Re);
        }, ye = function(Re) {
          return ne ? (m(Re), ke ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : ke ? Ee(Re, Se) : Ee(Re);
        };
        if (me) M = F.iterator;
        else if (fe) M = F;
        else {
          if (!(U = P(F))) throw new A(v(F) + " is not iterable");
          if (j(U)) {
            for (V = 0, Z = O(F); Z > V; V++) if ((K = ye(F[V])) && x(N, K)) return K;
            return new R(!1);
          }
          M = E(F, U);
        }
        for (re = me ? F.next : M.next; !(ue = f(re, M)).done; ) {
          try {
            K = ye(ue.value);
          } catch (Re) {
            L(M, "throw", Re);
          }
          if (typeof K == "object" && K && x(N, K)) return K;
        }
        return new R(!1);
      };
    }, 9539: (p, w, s) => {
      var d = s(9565), f = s(8551), m = s(5966);
      p.exports = function(v, j, O) {
        var x, E;
        f(v);
        try {
          if (!(x = m(v, "return"))) {
            if (j === "throw") throw O;
            return O;
          }
          x = d(x, v);
        } catch (P) {
          E = !0, x = P;
        }
        if (j === "throw") throw O;
        if (E) throw x;
        return f(x), O;
      };
    }, 3994: (p, w, s) => {
      var d = s(7657).IteratorPrototype, f = s(2360), m = s(6980), v = s(687), j = s(6269), O = function() {
        return this;
      };
      p.exports = function(x, E, P, L) {
        var A = E + " Iterator";
        return x.prototype = f(d, { next: m(+!L, P) }), v(x, A, !1, !0), j[A] = O, x;
      };
    }, 1088: (p, w, s) => {
      var d = s(6518), f = s(9565), m = s(6395), v = s(350), j = s(4901), O = s(3994), x = s(2787), E = s(2967), P = s(687), L = s(6699), A = s(6840), R = s(8227), N = s(6269), F = s(7657), H = v.PROPER, D = v.CONFIGURABLE, M = F.IteratorPrototype, U = F.BUGGY_SAFARI_ITERATORS, V = R("iterator"), Z = "keys", K = "values", re = "entries", ue = function() {
        return this;
      };
      p.exports = function(oe, ne, me, fe, ke, Ee, Se) {
        O(me, ne, fe);
        var ye, Re, Pe, De = function(B) {
          if (B === ke && qe) return qe;
          if (!U && B && B in He) return He[B];
          switch (B) {
            case Z:
            case K:
            case re:
              return function() {
                return new me(this, B);
              };
          }
          return function() {
            return new me(this);
          };
        }, Ye = ne + " Iterator", tt = !1, He = oe.prototype, Te = He[V] || He["@@iterator"] || ke && He[ke], qe = !U && Te || De(ke), T = ne === "Array" && He.entries || Te;
        if (T && (ye = x(T.call(new oe()))) !== Object.prototype && ye.next && (m || x(ye) === M || (E ? E(ye, M) : j(ye[V]) || A(ye, V, ue)), P(ye, Ye, !0, !0), m && (N[Ye] = ue)), H && ke === K && Te && Te.name !== K && (!m && D ? L(He, "name", K) : (tt = !0, qe = function() {
          return f(Te, this);
        })), ke) if (Re = { values: De(K), keys: Ee ? qe : De(Z), entries: De(re) }, Se) for (Pe in Re) (U || tt || !(Pe in He)) && A(He, Pe, Re[Pe]);
        else d({ target: ne, proto: !0, forced: U || tt }, Re);
        return m && !Se || He[V] === qe || A(He, V, qe, { name: ke }), N[ne] = qe, Re;
      };
    }, 7657: (p, w, s) => {
      var d, f, m, v = s(9039), j = s(4901), O = s(34), x = s(2360), E = s(2787), P = s(6840), L = s(8227), A = s(6395), R = L("iterator"), N = !1;
      [].keys && ("next" in (m = [].keys()) ? (f = E(E(m))) !== Object.prototype && (d = f) : N = !0), !O(d) || v(function() {
        var F = {};
        return d[R].call(F) !== F;
      }) ? d = {} : A && (d = x(d)), j(d[R]) || P(d, R, function() {
        return this;
      }), p.exports = { IteratorPrototype: d, BUGGY_SAFARI_ITERATORS: N };
    }, 6269: (p) => {
      p.exports = {};
    }, 6198: (p, w, s) => {
      var d = s(8014);
      p.exports = function(f) {
        return d(f.length);
      };
    }, 283: (p, w, s) => {
      var d = s(9504), f = s(9039), m = s(4901), v = s(9297), j = s(3724), O = s(350).CONFIGURABLE, x = s(3706), E = s(1181), P = E.enforce, L = E.get, A = String, R = Object.defineProperty, N = d("".slice), F = d("".replace), H = d([].join), D = j && !f(function() {
        return R(function() {
        }, "length", { value: 8 }).length !== 8;
      }), M = String(String).split("String"), U = p.exports = function(V, Z, K) {
        N(A(Z), 0, 7) === "Symbol(" && (Z = "[" + F(A(Z), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), K && K.getter && (Z = "get " + Z), K && K.setter && (Z = "set " + Z), (!v(V, "name") || O && V.name !== Z) && (j ? R(V, "name", { value: Z, configurable: !0 }) : V.name = Z), D && K && v(K, "arity") && V.length !== K.arity && R(V, "length", { value: K.arity });
        try {
          K && v(K, "constructor") && K.constructor ? j && R(V, "prototype", { writable: !1 }) : V.prototype && (V.prototype = void 0);
        } catch {
        }
        var re = P(V);
        return v(re, "source") || (re.source = H(M, typeof Z == "string" ? Z : "")), V;
      };
      Function.prototype.toString = U(function() {
        return m(this) && L(this).source || x(this);
      }, "toString");
    }, 741: (p) => {
      var w = Math.ceil, s = Math.floor;
      p.exports = Math.trunc || function(d) {
        var f = +d;
        return (f > 0 ? s : w)(f);
      };
    }, 1955: (p, w, s) => {
      var d, f, m, v, j, O = s(4475), x = s(3389), E = s(6080), P = s(9225).set, L = s(8265), A = s(8119), R = s(28), N = s(6765), F = s(9088), H = O.MutationObserver || O.WebKitMutationObserver, D = O.document, M = O.process, U = O.Promise, V = x("queueMicrotask");
      if (!V) {
        var Z = new L(), K = function() {
          var re, ue;
          for (F && (re = M.domain) && re.exit(); ue = Z.get(); ) try {
            ue();
          } catch (oe) {
            throw Z.head && d(), oe;
          }
          re && re.enter();
        };
        A || F || N || !H || !D ? !R && U && U.resolve ? ((v = U.resolve(void 0)).constructor = U, j = E(v.then, v), d = function() {
          j(K);
        }) : F ? d = function() {
          M.nextTick(K);
        } : (P = E(P, O), d = function() {
          P(K);
        }) : (f = !0, m = D.createTextNode(""), new H(K).observe(m, { characterData: !0 }), d = function() {
          m.data = f = !f;
        }), V = function(re) {
          Z.head || d(), Z.add(re);
        };
      }
      p.exports = V;
    }, 6043: (p, w, s) => {
      var d = s(9306), f = TypeError, m = function(v) {
        var j, O;
        this.promise = new v(function(x, E) {
          if (j !== void 0 || O !== void 0) throw new f("Bad Promise constructor");
          j = x, O = E;
        }), this.resolve = d(j), this.reject = d(O);
      };
      p.exports.f = function(v) {
        return new m(v);
      };
    }, 5749: (p, w, s) => {
      var d = s(788), f = TypeError;
      p.exports = function(m) {
        if (d(m)) throw new f("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (p, w, s) => {
      var d = s(4475), f = s(9039), m = s(9504), v = s(655), j = s(3802).trim, O = s(7452), x = m("".charAt), E = d.parseFloat, P = d.Symbol, L = P && P.iterator, A = 1 / E(O + "-0") != -1 / 0 || L && !f(function() {
        E(Object(L));
      });
      p.exports = A ? function(R) {
        var N = j(v(R)), F = E(N);
        return F === 0 && x(N, 0) === "-" ? -0 : F;
      } : E;
    }, 2703: (p, w, s) => {
      var d = s(4475), f = s(9039), m = s(9504), v = s(655), j = s(3802).trim, O = s(7452), x = d.parseInt, E = d.Symbol, P = E && E.iterator, L = /^[+-]?0x/i, A = m(L.exec), R = x(O + "08") !== 8 || x(O + "0x16") !== 22 || P && !f(function() {
        x(Object(P));
      });
      p.exports = R ? function(N, F) {
        var H = j(v(N));
        return x(H, F >>> 0 || (A(L, H) ? 16 : 10));
      } : x;
    }, 4213: (p, w, s) => {
      var d = s(3724), f = s(9504), m = s(9565), v = s(9039), j = s(1072), O = s(3717), x = s(8773), E = s(8981), P = s(7055), L = Object.assign, A = Object.defineProperty, R = f([].concat);
      p.exports = !L || v(function() {
        if (d && L({ b: 1 }, L(A({}, "a", { enumerable: !0, get: function() {
          A(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var N = {}, F = {}, H = Symbol("assign detection"), D = "abcdefghijklmnopqrst";
        return N[H] = 7, D.split("").forEach(function(M) {
          F[M] = M;
        }), L({}, N)[H] !== 7 || j(L({}, F)).join("") !== D;
      }) ? function(N, F) {
        for (var H = E(N), D = arguments.length, M = 1, U = O.f, V = x.f; D > M; ) for (var Z, K = P(arguments[M++]), re = U ? R(j(K), U(K)) : j(K), ue = re.length, oe = 0; ue > oe; ) Z = re[oe++], d && !m(V, K, Z) || (H[Z] = K[Z]);
        return H;
      } : L;
    }, 2360: (p, w, s) => {
      var d, f = s(8551), m = s(6801), v = s(8727), j = s(421), O = s(397), x = s(4055), E = s(6119), P = "prototype", L = "script", A = E("IE_PROTO"), R = function() {
      }, N = function(D) {
        return "<" + L + ">" + D + "</" + L + ">";
      }, F = function(D) {
        D.write(N("")), D.close();
        var M = D.parentWindow.Object;
        return D = null, M;
      }, H = function() {
        try {
          d = new ActiveXObject("htmlfile");
        } catch {
        }
        var D, M, U;
        H = typeof document < "u" ? document.domain && d ? F(d) : (M = x("iframe"), U = "java" + L + ":", M.style.display = "none", O.appendChild(M), M.src = String(U), (D = M.contentWindow.document).open(), D.write(N("document.F=Object")), D.close(), D.F) : F(d);
        for (var V = v.length; V--; ) delete H[P][v[V]];
        return H();
      };
      j[A] = !0, p.exports = Object.create || function(D, M) {
        var U;
        return D !== null ? (R[P] = f(D), U = new R(), R[P] = null, U[A] = D) : U = H(), M === void 0 ? U : m.f(U, M);
      };
    }, 6801: (p, w, s) => {
      var d = s(3724), f = s(8686), m = s(4913), v = s(8551), j = s(5397), O = s(1072);
      w.f = d && !f ? Object.defineProperties : function(x, E) {
        v(x);
        for (var P, L = j(E), A = O(E), R = A.length, N = 0; R > N; ) m.f(x, P = A[N++], L[P]);
        return x;
      };
    }, 4913: (p, w, s) => {
      var d = s(3724), f = s(5917), m = s(8686), v = s(8551), j = s(6969), O = TypeError, x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, P = "enumerable", L = "configurable", A = "writable";
      w.f = d ? m ? function(R, N, F) {
        if (v(R), N = j(N), v(F), typeof R == "function" && N === "prototype" && "value" in F && A in F && !F[A]) {
          var H = E(R, N);
          H && H[A] && (R[N] = F.value, F = { configurable: L in F ? F[L] : H[L], enumerable: P in F ? F[P] : H[P], writable: !1 });
        }
        return x(R, N, F);
      } : x : function(R, N, F) {
        if (v(R), N = j(N), v(F), f) try {
          return x(R, N, F);
        } catch {
        }
        if ("get" in F || "set" in F) throw new O("Accessors not supported");
        return "value" in F && (R[N] = F.value), R;
      };
    }, 7347: (p, w, s) => {
      var d = s(3724), f = s(9565), m = s(8773), v = s(6980), j = s(5397), O = s(6969), x = s(9297), E = s(5917), P = Object.getOwnPropertyDescriptor;
      w.f = d ? P : function(L, A) {
        if (L = j(L), A = O(A), E) try {
          return P(L, A);
        } catch {
        }
        if (x(L, A)) return v(!f(m.f, L, A), L[A]);
      };
    }, 298: (p, w, s) => {
      var d = s(4576), f = s(5397), m = s(8480).f, v = s(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      p.exports.f = function(O) {
        return j && d(O) === "Window" ? function(x) {
          try {
            return m(x);
          } catch {
            return v(j);
          }
        }(O) : m(f(O));
      };
    }, 8480: (p, w, s) => {
      var d = s(1828), f = s(8727).concat("length", "prototype");
      w.f = Object.getOwnPropertyNames || function(m) {
        return d(m, f);
      };
    }, 3717: (p, w) => {
      w.f = Object.getOwnPropertySymbols;
    }, 2787: (p, w, s) => {
      var d = s(9297), f = s(4901), m = s(8981), v = s(6119), j = s(2211), O = v("IE_PROTO"), x = Object, E = x.prototype;
      p.exports = j ? x.getPrototypeOf : function(P) {
        var L = m(P);
        if (d(L, O)) return L[O];
        var A = L.constructor;
        return f(A) && L instanceof A ? A.prototype : L instanceof x ? E : null;
      };
    }, 1625: (p, w, s) => {
      var d = s(9504);
      p.exports = d({}.isPrototypeOf);
    }, 1828: (p, w, s) => {
      var d = s(9504), f = s(9297), m = s(5397), v = s(9617).indexOf, j = s(421), O = d([].push);
      p.exports = function(x, E) {
        var P, L = m(x), A = 0, R = [];
        for (P in L) !f(j, P) && f(L, P) && O(R, P);
        for (; E.length > A; ) f(L, P = E[A++]) && (~v(R, P) || O(R, P));
        return R;
      };
    }, 1072: (p, w, s) => {
      var d = s(1828), f = s(8727);
      p.exports = Object.keys || function(m) {
        return d(m, f);
      };
    }, 8773: (p, w) => {
      var s = {}.propertyIsEnumerable, d = Object.getOwnPropertyDescriptor, f = d && !s.call({ 1: 2 }, 1);
      w.f = f ? function(m) {
        var v = d(this, m);
        return !!v && v.enumerable;
      } : s;
    }, 2967: (p, w, s) => {
      var d = s(6706), f = s(34), m = s(7750), v = s(3506);
      p.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, O = !1, x = {};
        try {
          (j = d(Object.prototype, "__proto__", "set"))(x, []), O = x instanceof Array;
        } catch {
        }
        return function(E, P) {
          return m(E), v(P), f(E) && (O ? j(E, P) : E.__proto__ = P), E;
        };
      }() : void 0);
    }, 2357: (p, w, s) => {
      var d = s(3724), f = s(9039), m = s(9504), v = s(2787), j = s(1072), O = s(5397), x = m(s(8773).f), E = m([].push), P = d && f(function() {
        var A = /* @__PURE__ */ Object.create(null);
        return A[2] = 2, !x(A, 2);
      }), L = function(A) {
        return function(R) {
          for (var N, F = O(R), H = j(F), D = P && v(F) === null, M = H.length, U = 0, V = []; M > U; ) N = H[U++], d && !(D ? N in F : x(F, N)) || E(V, A ? [N, F[N]] : F[N]);
          return V;
        };
      };
      p.exports = { entries: L(!0), values: L(!1) };
    }, 3179: (p, w, s) => {
      var d = s(2140), f = s(6955);
      p.exports = d ? {}.toString : function() {
        return "[object " + f(this) + "]";
      };
    }, 4270: (p, w, s) => {
      var d = s(9565), f = s(4901), m = s(34), v = TypeError;
      p.exports = function(j, O) {
        var x, E;
        if (O === "string" && f(x = j.toString) && !m(E = d(x, j)) || f(x = j.valueOf) && !m(E = d(x, j)) || O !== "string" && f(x = j.toString) && !m(E = d(x, j))) return E;
        throw new v("Can't convert object to primitive value");
      };
    }, 5031: (p, w, s) => {
      var d = s(7751), f = s(9504), m = s(8480), v = s(3717), j = s(8551), O = f([].concat);
      p.exports = d("Reflect", "ownKeys") || function(x) {
        var E = m.f(j(x)), P = v.f;
        return P ? O(E, P(x)) : E;
      };
    }, 9167: (p, w, s) => {
      var d = s(4475);
      p.exports = d;
    }, 1103: (p) => {
      p.exports = function(w) {
        try {
          return { error: !1, value: w() };
        } catch (s) {
          return { error: !0, value: s };
        }
      };
    }, 916: (p, w, s) => {
      var d = s(4475), f = s(550), m = s(4901), v = s(2796), j = s(3706), O = s(8227), x = s(7290), E = s(516), P = s(6395), L = s(7388), A = f && f.prototype, R = O("species"), N = !1, F = m(d.PromiseRejectionEvent), H = v("Promise", function() {
        var D = j(f), M = D !== String(f);
        if (!M && L === 66 || P && (!A.catch || !A.finally)) return !0;
        if (!L || L < 51 || !/native code/.test(D)) {
          var U = new f(function(Z) {
            Z(1);
          }), V = function(Z) {
            Z(function() {
            }, function() {
            });
          };
          if ((U.constructor = {})[R] = V, !(N = U.then(function() {
          }) instanceof V)) return !0;
        }
        return !M && (x || E) && !F;
      });
      p.exports = { CONSTRUCTOR: H, REJECTION_EVENT: F, SUBCLASSING: N };
    }, 550: (p, w, s) => {
      var d = s(4475);
      p.exports = d.Promise;
    }, 3438: (p, w, s) => {
      var d = s(8551), f = s(34), m = s(6043);
      p.exports = function(v, j) {
        if (d(v), f(j) && j.constructor === v) return j;
        var O = m.f(v);
        return (0, O.resolve)(j), O.promise;
      };
    }, 537: (p, w, s) => {
      var d = s(550), f = s(4428), m = s(916).CONSTRUCTOR;
      p.exports = m || !f(function(v) {
        d.all(v).then(void 0, function() {
        });
      });
    }, 1056: (p, w, s) => {
      var d = s(4913).f;
      p.exports = function(f, m, v) {
        v in f || d(f, v, { configurable: !0, get: function() {
          return m[v];
        }, set: function(j) {
          m[v] = j;
        } });
      };
    }, 8265: (p) => {
      var w = function() {
        this.head = null, this.tail = null;
      };
      w.prototype = { add: function(s) {
        var d = { item: s, next: null }, f = this.tail;
        f ? f.next = d : this.head = d, this.tail = d;
      }, get: function() {
        var s = this.head;
        if (s) return (this.head = s.next) === null && (this.tail = null), s.item;
      } }, p.exports = w;
    }, 6682: (p, w, s) => {
      var d = s(9565), f = s(8551), m = s(4901), v = s(4576), j = s(7323), O = TypeError;
      p.exports = function(x, E) {
        var P = x.exec;
        if (m(P)) {
          var L = d(P, x, E);
          return L !== null && f(L), L;
        }
        if (v(x) === "RegExp") return d(j, x, E);
        throw new O("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (p, w, s) => {
      var d, f, m = s(9565), v = s(9504), j = s(655), O = s(7979), x = s(8429), E = s(5745), P = s(2360), L = s(1181).get, A = s(3635), R = s(8814), N = E("native-string-replace", String.prototype.replace), F = RegExp.prototype.exec, H = F, D = v("".charAt), M = v("".indexOf), U = v("".replace), V = v("".slice), Z = (f = /b*/g, m(F, d = /a/, "a"), m(F, f, "a"), d.lastIndex !== 0 || f.lastIndex !== 0), K = x.BROKEN_CARET, re = /()??/.exec("")[1] !== void 0;
      (Z || re || K || A || R) && (H = function(ue) {
        var oe, ne, me, fe, ke, Ee, Se, ye = this, Re = L(ye), Pe = j(ue), De = Re.raw;
        if (De) return De.lastIndex = ye.lastIndex, oe = m(H, De, Pe), ye.lastIndex = De.lastIndex, oe;
        var Ye = Re.groups, tt = K && ye.sticky, He = m(O, ye), Te = ye.source, qe = 0, T = Pe;
        if (tt && (He = U(He, "y", ""), M(He, "g") === -1 && (He += "g"), T = V(Pe, ye.lastIndex), ye.lastIndex > 0 && (!ye.multiline || ye.multiline && D(Pe, ye.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", T = " " + T, qe++), ne = new RegExp("^(?:" + Te + ")", He)), re && (ne = new RegExp("^" + Te + "$(?!\\s)", He)), Z && (me = ye.lastIndex), fe = m(F, tt ? ne : ye, T), tt ? fe ? (fe.input = V(fe.input, qe), fe[0] = V(fe[0], qe), fe.index = ye.lastIndex, ye.lastIndex += fe[0].length) : ye.lastIndex = 0 : Z && fe && (ye.lastIndex = ye.global ? fe.index + fe[0].length : me), re && fe && fe.length > 1 && m(N, fe[0], ne, function() {
          for (ke = 1; ke < arguments.length - 2; ke++) arguments[ke] === void 0 && (fe[ke] = void 0);
        }), fe && Ye) for (fe.groups = Ee = P(null), ke = 0; ke < Ye.length; ke++) Ee[(Se = Ye[ke])[0]] = fe[Se[1]];
        return fe;
      }), p.exports = H;
    }, 7979: (p, w, s) => {
      var d = s(8551);
      p.exports = function() {
        var f = d(this), m = "";
        return f.hasIndices && (m += "d"), f.global && (m += "g"), f.ignoreCase && (m += "i"), f.multiline && (m += "m"), f.dotAll && (m += "s"), f.unicode && (m += "u"), f.unicodeSets && (m += "v"), f.sticky && (m += "y"), m;
      };
    }, 1034: (p, w, s) => {
      var d = s(9565), f = s(9297), m = s(1625), v = s(7979), j = RegExp.prototype;
      p.exports = function(O) {
        var x = O.flags;
        return x !== void 0 || "flags" in j || f(O, "flags") || !m(j, O) ? x : d(v, O);
      };
    }, 8429: (p, w, s) => {
      var d = s(9039), f = s(4475).RegExp, m = d(function() {
        var O = f("a", "y");
        return O.lastIndex = 2, O.exec("abcd") !== null;
      }), v = m || d(function() {
        return !f("a", "y").sticky;
      }), j = m || d(function() {
        var O = f("^r", "gy");
        return O.lastIndex = 2, O.exec("str") !== null;
      });
      p.exports = { BROKEN_CARET: j, MISSED_STICKY: v, UNSUPPORTED_Y: m };
    }, 3635: (p, w, s) => {
      var d = s(9039), f = s(4475).RegExp;
      p.exports = d(function() {
        var m = f(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (p, w, s) => {
      var d = s(9039), f = s(4475).RegExp;
      p.exports = d(function() {
        var m = f("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (p, w, s) => {
      var d = s(4117), f = TypeError;
      p.exports = function(m) {
        if (d(m)) throw new f("Can't call method on " + m);
        return m;
      };
    }, 3389: (p, w, s) => {
      var d = s(4475), f = s(3724), m = Object.getOwnPropertyDescriptor;
      p.exports = function(v) {
        if (!f) return d[v];
        var j = m(d, v);
        return j && j.value;
      };
    }, 9472: (p, w, s) => {
      var d, f = s(4475), m = s(8745), v = s(4901), j = s(6763), O = s(9392), x = s(7680), E = s(2812), P = f.Function, L = /MSIE .\./.test(O) || j && ((d = f.Bun.version.split(".")).length < 3 || d[0] === "0" && (d[1] < 3 || d[1] === "3" && d[2] === "0"));
      p.exports = function(A, R) {
        var N = R ? 2 : 1;
        return L ? function(F, H) {
          var D = E(arguments.length, 1) > N, M = v(F) ? F : P(F), U = D ? x(arguments, N) : [], V = D ? function() {
            m(M, this, U);
          } : M;
          return R ? A(V, H) : A(V);
        } : A;
      };
    }, 7633: (p, w, s) => {
      var d = s(7751), f = s(2106), m = s(8227), v = s(3724), j = m("species");
      p.exports = function(O) {
        var x = d(O);
        v && x && !x[j] && f(x, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (p, w, s) => {
      var d = s(4913).f, f = s(9297), m = s(8227)("toStringTag");
      p.exports = function(v, j, O) {
        v && !O && (v = v.prototype), v && !f(v, m) && d(v, m, { configurable: !0, value: j });
      };
    }, 6119: (p, w, s) => {
      var d = s(5745), f = s(3392), m = d("keys");
      p.exports = function(v) {
        return m[v] || (m[v] = f(v));
      };
    }, 7629: (p, w, s) => {
      var d = s(6395), f = s(4475), m = s(9433), v = "__core-js_shared__", j = p.exports = f[v] || m(v, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: d ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (p, w, s) => {
      var d = s(7629);
      p.exports = function(f, m) {
        return d[f] || (d[f] = m || {});
      };
    }, 2293: (p, w, s) => {
      var d = s(8551), f = s(5548), m = s(4117), v = s(8227)("species");
      p.exports = function(j, O) {
        var x, E = d(j).constructor;
        return E === void 0 || m(x = d(E)[v]) ? O : f(x);
      };
    }, 8183: (p, w, s) => {
      var d = s(9504), f = s(1291), m = s(655), v = s(7750), j = d("".charAt), O = d("".charCodeAt), x = d("".slice), E = function(P) {
        return function(L, A) {
          var R, N, F = m(v(L)), H = f(A), D = F.length;
          return H < 0 || H >= D ? P ? "" : void 0 : (R = O(F, H)) < 55296 || R > 56319 || H + 1 === D || (N = O(F, H + 1)) < 56320 || N > 57343 ? P ? j(F, H) : R : P ? x(F, H, H + 2) : N - 56320 + (R - 55296 << 10) + 65536;
        };
      };
      p.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (p, w, s) => {
      var d = s(9504), f = s(8014), m = s(655), v = s(2333), j = s(7750), O = d(v), x = d("".slice), E = Math.ceil, P = function(L) {
        return function(A, R, N) {
          var F, H, D = m(j(A)), M = f(R), U = D.length, V = N === void 0 ? " " : m(N);
          return M <= U || V === "" ? D : ((H = O(V, E((F = M - U) / V.length))).length > F && (H = x(H, 0, F)), L ? D + H : H + D);
        };
      };
      p.exports = { start: P(!1), end: P(!0) };
    }, 2333: (p, w, s) => {
      var d = s(1291), f = s(655), m = s(7750), v = RangeError;
      p.exports = function(j) {
        var O = f(m(this)), x = "", E = d(j);
        if (E < 0 || E === 1 / 0) throw new v("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (O += O)) 1 & E && (x += O);
        return x;
      };
    }, 706: (p, w, s) => {
      var d = s(350).PROPER, f = s(9039), m = s(7452);
      p.exports = function(v) {
        return f(function() {
          return !!m[v]() || "​᠎"[v]() !== "​᠎" || d && m[v].name !== v;
        });
      };
    }, 3802: (p, w, s) => {
      var d = s(9504), f = s(7750), m = s(655), v = s(7452), j = d("".replace), O = RegExp("^[" + v + "]+"), x = RegExp("(^|[^" + v + "])[" + v + "]+$"), E = function(P) {
        return function(L) {
          var A = m(f(L));
          return 1 & P && (A = j(A, O, "")), 2 & P && (A = j(A, x, "$1")), A;
        };
      };
      p.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (p, w, s) => {
      var d = s(7388), f = s(9039), m = s(4475).String;
      p.exports = !!Object.getOwnPropertySymbols && !f(function() {
        var v = Symbol("symbol detection");
        return !m(v) || !(Object(v) instanceof Symbol) || !Symbol.sham && d && d < 41;
      });
    }, 8242: (p, w, s) => {
      var d = s(9565), f = s(7751), m = s(8227), v = s(6840);
      p.exports = function() {
        var j = f("Symbol"), O = j && j.prototype, x = O && O.valueOf, E = m("toPrimitive");
        O && !O[E] && v(O, E, function(P) {
          return d(x, this);
        }, { arity: 1 });
      };
    }, 1296: (p, w, s) => {
      var d = s(4495);
      p.exports = d && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (p, w, s) => {
      var d, f, m, v, j = s(4475), O = s(8745), x = s(6080), E = s(4901), P = s(9297), L = s(9039), A = s(397), R = s(7680), N = s(4055), F = s(2812), H = s(8119), D = s(9088), M = j.setImmediate, U = j.clearImmediate, V = j.process, Z = j.Dispatch, K = j.Function, re = j.MessageChannel, ue = j.String, oe = 0, ne = {}, me = "onreadystatechange";
      L(function() {
        d = j.location;
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
        j.postMessage(ue(ye), d.protocol + "//" + d.host);
      };
      M && U || (M = function(ye) {
        F(arguments.length, 1);
        var Re = E(ye) ? ye : K(ye), Pe = R(arguments, 1);
        return ne[++oe] = function() {
          O(Re, void 0, Pe);
        }, f(oe), oe;
      }, U = function(ye) {
        delete ne[ye];
      }, D ? f = function(ye) {
        V.nextTick(ke(ye));
      } : Z && Z.now ? f = function(ye) {
        Z.now(ke(ye));
      } : re && !H ? (v = (m = new re()).port2, m.port1.onmessage = Ee, f = x(v.postMessage, v)) : j.addEventListener && E(j.postMessage) && !j.importScripts && d && d.protocol !== "file:" && !L(Se) ? (f = Se, j.addEventListener("message", Ee, !1)) : f = me in N("script") ? function(ye) {
        A.appendChild(N("script"))[me] = function() {
          A.removeChild(this), fe(ye);
        };
      } : function(ye) {
        setTimeout(ke(ye), 0);
      }), p.exports = { set: M, clear: U };
    }, 1240: (p, w, s) => {
      var d = s(9504);
      p.exports = d(1 .valueOf);
    }, 5610: (p, w, s) => {
      var d = s(1291), f = Math.max, m = Math.min;
      p.exports = function(v, j) {
        var O = d(v);
        return O < 0 ? f(O + j, 0) : m(O, j);
      };
    }, 5397: (p, w, s) => {
      var d = s(7055), f = s(7750);
      p.exports = function(m) {
        return d(f(m));
      };
    }, 1291: (p, w, s) => {
      var d = s(741);
      p.exports = function(f) {
        var m = +f;
        return m != m || m === 0 ? 0 : d(m);
      };
    }, 8014: (p, w, s) => {
      var d = s(1291), f = Math.min;
      p.exports = function(m) {
        var v = d(m);
        return v > 0 ? f(v, 9007199254740991) : 0;
      };
    }, 8981: (p, w, s) => {
      var d = s(7750), f = Object;
      p.exports = function(m) {
        return f(d(m));
      };
    }, 2777: (p, w, s) => {
      var d = s(9565), f = s(34), m = s(757), v = s(5966), j = s(4270), O = s(8227), x = TypeError, E = O("toPrimitive");
      p.exports = function(P, L) {
        if (!f(P) || m(P)) return P;
        var A, R = v(P, E);
        if (R) {
          if (L === void 0 && (L = "default"), A = d(R, P, L), !f(A) || m(A)) return A;
          throw new x("Can't convert object to primitive value");
        }
        return L === void 0 && (L = "number"), j(P, L);
      };
    }, 6969: (p, w, s) => {
      var d = s(2777), f = s(757);
      p.exports = function(m) {
        var v = d(m, "string");
        return f(v) ? v : v + "";
      };
    }, 2140: (p, w, s) => {
      var d = {};
      d[s(8227)("toStringTag")] = "z", p.exports = String(d) === "[object z]";
    }, 655: (p, w, s) => {
      var d = s(6955), f = String;
      p.exports = function(m) {
        if (d(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return f(m);
      };
    }, 6823: (p) => {
      var w = String;
      p.exports = function(s) {
        try {
          return w(s);
        } catch {
          return "Object";
        }
      };
    }, 3392: (p, w, s) => {
      var d = s(9504), f = 0, m = Math.random(), v = d(1 .toString);
      p.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + v(++f + m, 36);
      };
    }, 7040: (p, w, s) => {
      var d = s(4495);
      p.exports = d && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (p, w, s) => {
      var d = s(3724), f = s(9039);
      p.exports = d && f(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (p) => {
      var w = TypeError;
      p.exports = function(s, d) {
        if (s < d) throw new w("Not enough arguments");
        return s;
      };
    }, 8622: (p, w, s) => {
      var d = s(4475), f = s(4901), m = d.WeakMap;
      p.exports = f(m) && /native code/.test(String(m));
    }, 511: (p, w, s) => {
      var d = s(9167), f = s(9297), m = s(1951), v = s(4913).f;
      p.exports = function(j) {
        var O = d.Symbol || (d.Symbol = {});
        f(O, j) || v(O, j, { value: m.f(j) });
      };
    }, 1951: (p, w, s) => {
      var d = s(8227);
      w.f = d;
    }, 8227: (p, w, s) => {
      var d = s(4475), f = s(5745), m = s(9297), v = s(3392), j = s(4495), O = s(7040), x = d.Symbol, E = f("wks"), P = O ? x.for || x : x && x.withoutSetter || v;
      p.exports = function(L) {
        return m(E, L) || (E[L] = j && m(x, L) ? x[L] : P("Symbol." + L)), E[L];
      };
    }, 7452: (p) => {
      p.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (p, w, s) => {
      var d = s(6518), f = s(9039), m = s(4376), v = s(34), j = s(8981), O = s(6198), x = s(6837), E = s(4659), P = s(1469), L = s(597), A = s(8227), R = s(7388), N = A("isConcatSpreadable"), F = R >= 51 || !f(function() {
        var D = [];
        return D[N] = !1, D.concat()[0] !== D;
      }), H = function(D) {
        if (!v(D)) return !1;
        var M = D[N];
        return M !== void 0 ? !!M : m(D);
      };
      d({ target: "Array", proto: !0, arity: 1, forced: !F || !L("concat") }, { concat: function(D) {
        var M, U, V, Z, K, re = j(this), ue = P(re, 0), oe = 0;
        for (M = -1, V = arguments.length; M < V; M++) if (H(K = M === -1 ? re : arguments[M])) for (Z = O(K), x(oe + Z), U = 0; U < Z; U++, oe++) U in K && E(ue, oe, K[U]);
        else x(oe + 1), E(ue, oe++, K);
        return ue.length = oe, ue;
      } });
    }, 8431: (p, w, s) => {
      var d = s(6518), f = s(9213).every;
      d({ target: "Array", proto: !0, forced: !s(4598)("every") }, { every: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (p, w, s) => {
      var d = s(6518), f = s(9213).filter;
      d({ target: "Array", proto: !0, forced: !s(597)("filter") }, { filter: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (p, w, s) => {
      var d = s(6518), f = s(9213).find, m = s(6469), v = "find", j = !0;
      v in [] && Array(1)[v](function() {
        j = !1;
      }), d({ target: "Array", proto: !0, forced: j }, { find: function(O) {
        return f(this, O, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(v);
    }, 1629: (p, w, s) => {
      var d = s(6518), f = s(235);
      d({ target: "Array", proto: !0, forced: [].forEach !== f }, { forEach: f });
    }, 3418: (p, w, s) => {
      var d = s(6518), f = s(7916);
      d({ target: "Array", stat: !0, forced: !s(4428)(function(m) {
        Array.from(m);
      }) }, { from: f });
    }, 4423: (p, w, s) => {
      var d = s(6518), f = s(9617).includes, m = s(9039), v = s(6469);
      d({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return f(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), v("includes");
    }, 5276: (p, w, s) => {
      var d = s(6518), f = s(7476), m = s(9617).indexOf, v = s(4598), j = f([].indexOf), O = !!j && 1 / j([1], 1, -0) < 0;
      d({ target: "Array", proto: !0, forced: O || !v("indexOf") }, { indexOf: function(x) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return O ? j(this, x, E) || 0 : m(this, x, E);
      } });
    }, 4346: (p, w, s) => {
      s(6518)({ target: "Array", stat: !0 }, { isArray: s(4376) });
    }, 3792: (p, w, s) => {
      var d = s(5397), f = s(6469), m = s(6269), v = s(1181), j = s(4913).f, O = s(1088), x = s(2529), E = s(6395), P = s(3724), L = "Array Iterator", A = v.set, R = v.getterFor(L);
      p.exports = O(Array, "Array", function(F, H) {
        A(this, { type: L, target: d(F), index: 0, kind: H });
      }, function() {
        var F = R(this), H = F.target, D = F.index++;
        if (!H || D >= H.length) return F.target = void 0, x(void 0, !0);
        switch (F.kind) {
          case "keys":
            return x(D, !1);
          case "values":
            return x(H[D], !1);
        }
        return x([D, H[D]], !1);
      }, "values");
      var N = m.Arguments = m.Array;
      if (f("keys"), f("values"), f("entries"), !E && P && N.name !== "values") try {
        j(N, "name", { value: "values" });
      } catch {
      }
    }, 8598: (p, w, s) => {
      var d = s(6518), f = s(9504), m = s(7055), v = s(5397), j = s(4598), O = f([].join);
      d({ target: "Array", proto: !0, forced: m !== Object || !j("join", ",") }, { join: function(x) {
        return O(v(this), x === void 0 ? "," : x);
      } });
    }, 2062: (p, w, s) => {
      var d = s(6518), f = s(9213).map;
      d({ target: "Array", proto: !0, forced: !s(597)("map") }, { map: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (p, w, s) => {
      var d = s(6518), f = s(926).left, m = s(4598), v = s(7388);
      d({ target: "Array", proto: !0, forced: !s(9088) && v > 79 && v < 83 || !m("reduce") }, { reduce: function(j) {
        var O = arguments.length;
        return f(this, j, O, O > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (p, w, s) => {
      var d = s(6518), f = s(9504), m = s(4376), v = f([].reverse), j = [1, 2];
      d({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), v(this);
      } });
    }, 4782: (p, w, s) => {
      var d = s(6518), f = s(4376), m = s(3517), v = s(34), j = s(5610), O = s(6198), x = s(5397), E = s(4659), P = s(8227), L = s(597), A = s(7680), R = L("slice"), N = P("species"), F = Array, H = Math.max;
      d({ target: "Array", proto: !0, forced: !R }, { slice: function(D, M) {
        var U, V, Z, K = x(this), re = O(K), ue = j(D, re), oe = j(M === void 0 ? re : M, re);
        if (f(K) && (U = K.constructor, (m(U) && (U === F || f(U.prototype)) || v(U) && (U = U[N]) === null) && (U = void 0), U === F || U === void 0)) return A(K, ue, oe);
        for (V = new (U === void 0 ? F : U)(H(oe - ue, 0)), Z = 0; ue < oe; ue++, Z++) ue in K && E(V, Z, K[ue]);
        return V.length = Z, V;
      } });
    }, 5086: (p, w, s) => {
      var d = s(6518), f = s(9213).some;
      d({ target: "Array", proto: !0, forced: !s(4598)("some") }, { some: function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (p, w, s) => {
      var d = s(6518), f = s(9504), m = s(9306), v = s(8981), j = s(6198), O = s(4606), x = s(655), E = s(9039), P = s(4488), L = s(4598), A = s(8834), R = s(3202), N = s(7388), F = s(9160), H = [], D = f(H.sort), M = f(H.push), U = E(function() {
        H.sort(void 0);
      }), V = E(function() {
        H.sort(null);
      }), Z = L("sort"), K = !E(function() {
        if (N) return N < 70;
        if (!(A && A > 3)) {
          if (R) return !0;
          if (F) return F < 603;
          var re, ue, oe, ne, me = "";
          for (re = 65; re < 76; re++) {
            switch (ue = String.fromCharCode(re), re) {
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
            for (ne = 0; ne < 47; ne++) H.push({ k: ue + ne, v: oe });
          }
          for (H.sort(function(fe, ke) {
            return ke.v - fe.v;
          }), ne = 0; ne < H.length; ne++) ue = H[ne].k.charAt(0), me.charAt(me.length - 1) !== ue && (me += ue);
          return me !== "DGBEFHACIJK";
        }
      });
      d({ target: "Array", proto: !0, forced: U || !V || !Z || !K }, { sort: function(re) {
        re !== void 0 && m(re);
        var ue = v(this);
        if (K) return re === void 0 ? D(ue) : D(ue, re);
        var oe, ne, me = [], fe = j(ue);
        for (ne = 0; ne < fe; ne++) ne in ue && M(me, ue[ne]);
        for (P(me, /* @__PURE__ */ function(ke) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : ke !== void 0 ? +ke(Ee, Se) || 0 : x(Ee) > x(Se) ? 1 : -1;
          };
        }(re)), oe = j(me), ne = 0; ne < oe; ) ue[ne] = me[ne++];
        for (; ne < fe; ) O(ue, ne++);
        return ue;
      } });
    }, 4554: (p, w, s) => {
      var d = s(6518), f = s(8981), m = s(5610), v = s(1291), j = s(6198), O = s(4527), x = s(6837), E = s(1469), P = s(4659), L = s(4606), A = s(597)("splice"), R = Math.max, N = Math.min;
      d({ target: "Array", proto: !0, forced: !A }, { splice: function(F, H) {
        var D, M, U, V, Z, K, re = f(this), ue = j(re), oe = m(F, ue), ne = arguments.length;
        for (ne === 0 ? D = M = 0 : ne === 1 ? (D = 0, M = ue - oe) : (D = ne - 2, M = N(R(v(H), 0), ue - oe)), x(ue + D - M), U = E(re, M), V = 0; V < M; V++) (Z = oe + V) in re && P(U, V, re[Z]);
        if (U.length = M, D < M) {
          for (V = oe; V < ue - M; V++) K = V + D, (Z = V + M) in re ? re[K] = re[Z] : L(re, K);
          for (V = ue; V > ue - M + D; V--) L(re, V - 1);
        } else if (D > M) for (V = ue - M; V > oe; V--) K = V + D - 1, (Z = V + M - 1) in re ? re[K] = re[Z] : L(re, K);
        for (V = 0; V < D; V++) re[V + oe] = arguments[V + 2];
        return O(re, ue - M + D), U;
      } });
    }, 1688: (p, w, s) => {
      var d = s(6518), f = s(380);
      d({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== f }, { toISOString: f });
    }, 739: (p, w, s) => {
      var d = s(6518), f = s(9039), m = s(8981), v = s(2777);
      d({ target: "Date", proto: !0, arity: 1, forced: f(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var O = m(this), x = v(O, "number");
        return typeof x != "number" || isFinite(x) ? O.toISOString() : null;
      } });
    }, 9572: (p, w, s) => {
      var d = s(9297), f = s(6840), m = s(3640), v = s(8227)("toPrimitive"), j = Date.prototype;
      d(j, v) || f(j, v, m);
    }, 3288: (p, w, s) => {
      var d = s(9504), f = s(6840), m = Date.prototype, v = "Invalid Date", j = "toString", O = d(m[j]), x = d(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== v && f(m, j, function() {
        var E = x(this);
        return E == E ? O(this) : v;
      });
    }, 4170: (p, w, s) => {
      var d = s(6518), f = s(566);
      d({ target: "Function", proto: !0, forced: Function.bind !== f }, { bind: f });
    }, 2010: (p, w, s) => {
      var d = s(3724), f = s(350).EXISTS, m = s(9504), v = s(2106), j = Function.prototype, O = m(j.toString), x = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = m(x.exec);
      d && !f && v(j, "name", { configurable: !0, get: function() {
        try {
          return E(x, O(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (p, w, s) => {
      var d = s(6518), f = s(7751), m = s(8745), v = s(9565), j = s(9504), O = s(9039), x = s(4901), E = s(757), P = s(7680), L = s(6933), A = s(4495), R = String, N = f("JSON", "stringify"), F = j(/./.exec), H = j("".charAt), D = j("".charCodeAt), M = j("".replace), U = j(1 .toString), V = /[\uD800-\uDFFF]/g, Z = /^[\uD800-\uDBFF]$/, K = /^[\uDC00-\uDFFF]$/, re = !A || O(function() {
        var me = f("Symbol")("stringify detection");
        return N([me]) !== "[null]" || N({ a: me }) !== "{}" || N(Object(me)) !== "{}";
      }), ue = O(function() {
        return N("\uDF06\uD834") !== '"\\udf06\\ud834"' || N("\uDEAD") !== '"\\udead"';
      }), oe = function(me, fe) {
        var ke = P(arguments), Ee = L(fe);
        if (x(Ee) || me !== void 0 && !E(me)) return ke[1] = function(Se, ye) {
          if (x(Ee) && (ye = v(Ee, this, R(Se), ye)), !E(ye)) return ye;
        }, m(N, null, ke);
      }, ne = function(me, fe, ke) {
        var Ee = H(ke, fe - 1), Se = H(ke, fe + 1);
        return F(Z, me) && !F(K, Se) || F(K, me) && !F(Z, Ee) ? "\\u" + U(D(me, 0), 16) : me;
      };
      N && d({ target: "JSON", stat: !0, arity: 3, forced: re || ue }, { stringify: function(me, fe, ke) {
        var Ee = P(arguments), Se = m(re ? oe : N, null, Ee);
        return ue && typeof Se == "string" ? M(Se, V, ne) : Se;
      } });
    }, 4731: (p, w, s) => {
      var d = s(4475);
      s(687)(d.JSON, "JSON", !0);
    }, 479: (p, w, s) => {
      s(687)(Math, "Math", !0);
    }, 2892: (p, w, s) => {
      var d = s(6518), f = s(6395), m = s(3724), v = s(4475), j = s(9167), O = s(9504), x = s(2796), E = s(9297), P = s(3167), L = s(1625), A = s(757), R = s(2777), N = s(9039), F = s(8480).f, H = s(7347).f, D = s(4913).f, M = s(1240), U = s(3802).trim, V = "Number", Z = v[V], K = j[V], re = Z.prototype, ue = v.TypeError, oe = O("".slice), ne = O("".charCodeAt), me = x(V, !Z(" 0o1") || !Z("0b1") || Z("+0x1")), fe = function(Ee) {
        var Se, ye = arguments.length < 1 ? 0 : Z(function(Re) {
          var Pe = R(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(De) {
            var Ye, tt, He, Te, qe, T, B, W, Y = R(De, "number");
            if (A(Y)) throw new ue("Cannot convert a Symbol value to a number");
            if (typeof Y == "string" && Y.length > 2) {
              if (Y = U(Y), (Ye = ne(Y, 0)) === 43 || Ye === 45) {
                if ((tt = ne(Y, 2)) === 88 || tt === 120) return NaN;
              } else if (Ye === 48) {
                switch (ne(Y, 1)) {
                  case 66:
                  case 98:
                    He = 2, Te = 49;
                    break;
                  case 79:
                  case 111:
                    He = 8, Te = 55;
                    break;
                  default:
                    return +Y;
                }
                for (T = (qe = oe(Y, 2)).length, B = 0; B < T; B++) if ((W = ne(qe, B)) < 48 || W > Te) return NaN;
                return parseInt(qe, He);
              }
            }
            return +Y;
          }(Pe);
        }(Ee));
        return L(re, Se = this) && N(function() {
          M(Se);
        }) ? P(Object(ye), this, fe) : ye;
      };
      fe.prototype = re, me && !f && (re.constructor = fe), d({ global: !0, constructor: !0, wrap: !0, forced: me }, { Number: fe });
      var ke = function(Ee, Se) {
        for (var ye, Re = m ? F(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, ye = Re[Pe]) && !E(Ee, ye) && D(Ee, ye, H(Se, ye));
      };
      f && K && ke(j[V], K), (me || f) && ke(j[V], Z);
    }, 9868: (p, w, s) => {
      var d = s(6518), f = s(9504), m = s(1291), v = s(1240), j = s(2333), O = s(9039), x = RangeError, E = String, P = Math.floor, L = f(j), A = f("".slice), R = f(1 .toFixed), N = function(M, U, V) {
        return U === 0 ? V : U % 2 == 1 ? N(M, U - 1, V * M) : N(M * M, U / 2, V);
      }, F = function(M, U, V) {
        for (var Z = -1, K = V; ++Z < 6; ) K += U * M[Z], M[Z] = K % 1e7, K = P(K / 1e7);
      }, H = function(M, U) {
        for (var V = 6, Z = 0; --V >= 0; ) Z += M[V], M[V] = P(Z / U), Z = Z % U * 1e7;
      }, D = function(M) {
        for (var U = 6, V = ""; --U >= 0; ) if (V !== "" || U === 0 || M[U] !== 0) {
          var Z = E(M[U]);
          V = V === "" ? Z : V + L("0", 7 - Z.length) + Z;
        }
        return V;
      };
      d({ target: "Number", proto: !0, forced: O(function() {
        return R(8e-5, 3) !== "0.000" || R(0.9, 0) !== "1" || R(1.255, 2) !== "1.25" || R(1000000000000000100, 0) !== "1000000000000000128";
      }) || !O(function() {
        R({});
      }) }, { toFixed: function(M) {
        var U, V, Z, K, re = v(this), ue = m(M), oe = [0, 0, 0, 0, 0, 0], ne = "", me = "0";
        if (ue < 0 || ue > 20) throw new x("Incorrect fraction digits");
        if (re != re) return "NaN";
        if (re <= -1e21 || re >= 1e21) return E(re);
        if (re < 0 && (ne = "-", re = -re), re > 1e-21) if (V = (U = function(fe) {
          for (var ke = 0, Ee = fe; Ee >= 4096; ) ke += 12, Ee /= 4096;
          for (; Ee >= 2; ) ke += 1, Ee /= 2;
          return ke;
        }(re * N(2, 69, 1)) - 69) < 0 ? re * N(2, -U, 1) : re / N(2, U, 1), V *= 4503599627370496, (U = 52 - U) > 0) {
          for (F(oe, 0, V), Z = ue; Z >= 7; ) F(oe, 1e7, 0), Z -= 7;
          for (F(oe, N(10, Z, 1), 0), Z = U - 1; Z >= 23; ) H(oe, 8388608), Z -= 23;
          H(oe, 1 << Z), F(oe, 1, 1), H(oe, 2), me = D(oe);
        } else F(oe, 0, V), F(oe, 1 << -U, 0), me = D(oe) + L("0", ue);
        return ue > 0 ? ne + ((K = me.length) <= ue ? "0." + L("0", ue - K) + me : A(me, 0, K - ue) + "." + A(me, K - ue)) : ne + me;
      } });
    }, 9085: (p, w, s) => {
      var d = s(6518), f = s(4213);
      d({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== f }, { assign: f });
    }, 9904: (p, w, s) => {
      s(6518)({ target: "Object", stat: !0, sham: !s(3724) }, { create: s(2360) });
    }, 7945: (p, w, s) => {
      var d = s(6518), f = s(3724), m = s(6801).f;
      d({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !f }, { defineProperties: m });
    }, 4185: (p, w, s) => {
      var d = s(6518), f = s(3724), m = s(4913).f;
      d({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !f }, { defineProperty: m });
    }, 5506: (p, w, s) => {
      var d = s(6518), f = s(2357).entries;
      d({ target: "Object", stat: !0 }, { entries: function(m) {
        return f(m);
      } });
    }, 3851: (p, w, s) => {
      var d = s(6518), f = s(9039), m = s(5397), v = s(7347).f, j = s(3724);
      d({ target: "Object", stat: !0, forced: !j || f(function() {
        v(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(O, x) {
        return v(m(O), x);
      } });
    }, 1278: (p, w, s) => {
      var d = s(6518), f = s(3724), m = s(5031), v = s(5397), j = s(7347), O = s(4659);
      d({ target: "Object", stat: !0, sham: !f }, { getOwnPropertyDescriptors: function(x) {
        for (var E, P, L = v(x), A = j.f, R = m(L), N = {}, F = 0; R.length > F; ) (P = A(L, E = R[F++])) !== void 0 && O(N, E, P);
        return N;
      } });
    }, 9773: (p, w, s) => {
      var d = s(6518), f = s(4495), m = s(9039), v = s(3717), j = s(8981);
      d({ target: "Object", stat: !0, forced: !f || m(function() {
        v.f(1);
      }) }, { getOwnPropertySymbols: function(O) {
        var x = v.f;
        return x ? x(j(O)) : [];
      } });
    }, 875: (p, w, s) => {
      var d = s(6518), f = s(9039), m = s(8981), v = s(2787), j = s(2211);
      d({ target: "Object", stat: !0, forced: f(function() {
        v(1);
      }), sham: !j }, { getPrototypeOf: function(O) {
        return v(m(O));
      } });
    }, 9432: (p, w, s) => {
      var d = s(6518), f = s(8981), m = s(1072);
      d({ target: "Object", stat: !0, forced: s(9039)(function() {
        m(1);
      }) }, { keys: function(v) {
        return m(f(v));
      } });
    }, 287: (p, w, s) => {
      s(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: s(2967) });
    }, 6099: (p, w, s) => {
      var d = s(2140), f = s(6840), m = s(3179);
      d || f(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (p, w, s) => {
      var d = s(6518), f = s(2357).values;
      d({ target: "Object", stat: !0 }, { values: function(m) {
        return f(m);
      } });
    }, 8459: (p, w, s) => {
      var d = s(6518), f = s(3904);
      d({ global: !0, forced: parseFloat !== f }, { parseFloat: f });
    }, 8940: (p, w, s) => {
      var d = s(6518), f = s(2703);
      d({ global: !0, forced: parseInt !== f }, { parseInt: f });
    }, 6499: (p, w, s) => {
      var d = s(6518), f = s(9565), m = s(9306), v = s(6043), j = s(1103), O = s(2652);
      d({ target: "Promise", stat: !0, forced: s(537) }, { all: function(x) {
        var E = this, P = v.f(E), L = P.resolve, A = P.reject, R = j(function() {
          var N = m(E.resolve), F = [], H = 0, D = 1;
          O(x, function(M) {
            var U = H++, V = !1;
            D++, f(N, E, M).then(function(Z) {
              V || (V = !0, F[U] = Z, --D || L(F));
            }, A);
          }), --D || L(F);
        });
        return R.error && A(R.value), P.promise;
      } });
    }, 2003: (p, w, s) => {
      var d = s(6518), f = s(6395), m = s(916).CONSTRUCTOR, v = s(550), j = s(7751), O = s(4901), x = s(6840), E = v && v.prototype;
      if (d({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(L) {
        return this.then(void 0, L);
      } }), !f && O(v)) {
        var P = j("Promise").prototype.catch;
        E.catch !== P && x(E, "catch", P, { unsafe: !0 });
      }
    }, 436: (p, w, s) => {
      var d, f, m, v = s(6518), j = s(6395), O = s(9088), x = s(4475), E = s(9565), P = s(6840), L = s(2967), A = s(687), R = s(7633), N = s(9306), F = s(4901), H = s(34), D = s(679), M = s(2293), U = s(9225).set, V = s(1955), Z = s(3138), K = s(1103), re = s(8265), ue = s(1181), oe = s(550), ne = s(916), me = s(6043), fe = "Promise", ke = ne.CONSTRUCTOR, Ee = ne.REJECTION_EVENT, Se = ne.SUBCLASSING, ye = ue.getterFor(fe), Re = ue.set, Pe = oe && oe.prototype, De = oe, Ye = Pe, tt = x.TypeError, He = x.document, Te = x.process, qe = me.f, T = qe, B = !!(He && He.createEvent && x.dispatchEvent), W = "unhandledrejection", Y = function(te) {
        var ae;
        return !(!H(te) || !F(ae = te.then)) && ae;
      }, Q = function(te, ae) {
        var ce, Oe, Ae, Ve = ae.value, rt = ae.state === 1, ct = rt ? te.ok : te.fail, ft = te.resolve, yt = te.reject, Je = te.domain;
        try {
          ct ? (rt || (ae.rejection === 2 && ie(ae), ae.rejection = 1), ct === !0 ? ce = Ve : (Je && Je.enter(), ce = ct(Ve), Je && (Je.exit(), Ae = !0)), ce === te.promise ? yt(new tt("Promise-chain cycle")) : (Oe = Y(ce)) ? E(Oe, ce, ft, yt) : ft(ce)) : yt(Ve);
        } catch (Ze) {
          Je && !Ae && Je.exit(), yt(Ze);
        }
      }, X = function(te, ae) {
        te.notified || (te.notified = !0, V(function() {
          for (var ce, Oe = te.reactions; ce = Oe.get(); ) Q(ce, te);
          te.notified = !1, ae && !te.rejection && de(te);
        }));
      }, he = function(te, ae, ce) {
        var Oe, Ae;
        B ? ((Oe = He.createEvent("Event")).promise = ae, Oe.reason = ce, Oe.initEvent(te, !1, !0), x.dispatchEvent(Oe)) : Oe = { promise: ae, reason: ce }, !Ee && (Ae = x["on" + te]) ? Ae(Oe) : te === W && Z("Unhandled promise rejection", ce);
      }, de = function(te) {
        E(U, x, function() {
          var ae, ce = te.facade, Oe = te.value;
          if (le(te) && (ae = K(function() {
            O ? Te.emit("unhandledRejection", Oe, ce) : he(W, ce, Oe);
          }), te.rejection = O || le(te) ? 2 : 1, ae.error)) throw ae.value;
        });
      }, le = function(te) {
        return te.rejection !== 1 && !te.parent;
      }, ie = function(te) {
        E(U, x, function() {
          var ae = te.facade;
          O ? Te.emit("rejectionHandled", ae) : he("rejectionhandled", ae, te.value);
        });
      }, je = function(te, ae, ce) {
        return function(Oe) {
          te(ae, Oe, ce);
        };
      }, be = function(te, ae, ce) {
        te.done || (te.done = !0, ce && (te = ce), te.value = ae, te.state = 2, X(te, !0));
      }, Ce = function(te, ae, ce) {
        if (!te.done) {
          te.done = !0, ce && (te = ce);
          try {
            if (te.facade === ae) throw new tt("Promise can't be resolved itself");
            var Oe = Y(ae);
            Oe ? V(function() {
              var Ae = { done: !1 };
              try {
                E(Oe, ae, je(Ce, Ae, te), je(be, Ae, te));
              } catch (Ve) {
                be(Ae, Ve, te);
              }
            }) : (te.value = ae, te.state = 1, X(te, !1));
          } catch (Ae) {
            be({ done: !1 }, Ae, te);
          }
        }
      };
      if (ke && (Ye = (De = function(te) {
        D(this, Ye), N(te), E(d, this);
        var ae = ye(this);
        try {
          te(je(Ce, ae), je(be, ae));
        } catch (ce) {
          be(ae, ce);
        }
      }).prototype, (d = function(te) {
        Re(this, { type: fe, done: !1, notified: !1, parent: !1, reactions: new re(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Ye, "then", function(te, ae) {
        var ce = ye(this), Oe = qe(M(this, De));
        return ce.parent = !0, Oe.ok = !F(te) || te, Oe.fail = F(ae) && ae, Oe.domain = O ? Te.domain : void 0, ce.state === 0 ? ce.reactions.add(Oe) : V(function() {
          Q(Oe, ce);
        }), Oe.promise;
      }), f = function() {
        var te = new d(), ae = ye(te);
        this.promise = te, this.resolve = je(Ce, ae), this.reject = je(be, ae);
      }, me.f = qe = function(te) {
        return te === De || te === void 0 ? new f(te) : T(te);
      }, !j && F(oe) && Pe !== Object.prototype)) {
        m = Pe.then, Se || P(Pe, "then", function(te, ae) {
          var ce = this;
          return new De(function(Oe, Ae) {
            E(m, ce, Oe, Ae);
          }).then(te, ae);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        L && L(Pe, Ye);
      }
      v({ global: !0, constructor: !0, wrap: !0, forced: ke }, { Promise: De }), A(De, fe, !1, !0), R(fe);
    }, 3362: (p, w, s) => {
      s(436), s(6499), s(2003), s(7743), s(1481), s(280);
    }, 7743: (p, w, s) => {
      var d = s(6518), f = s(9565), m = s(9306), v = s(6043), j = s(1103), O = s(2652);
      d({ target: "Promise", stat: !0, forced: s(537) }, { race: function(x) {
        var E = this, P = v.f(E), L = P.reject, A = j(function() {
          var R = m(E.resolve);
          O(x, function(N) {
            f(R, E, N).then(P.resolve, L);
          });
        });
        return A.error && L(A.value), P.promise;
      } });
    }, 1481: (p, w, s) => {
      var d = s(6518), f = s(6043);
      d({ target: "Promise", stat: !0, forced: s(916).CONSTRUCTOR }, { reject: function(m) {
        var v = f.f(this);
        return (0, v.reject)(m), v.promise;
      } });
    }, 280: (p, w, s) => {
      var d = s(6518), f = s(7751), m = s(6395), v = s(550), j = s(916).CONSTRUCTOR, O = s(3438), x = f("Promise"), E = m && !j;
      d({ target: "Promise", stat: !0, forced: m || j }, { resolve: function(P) {
        return O(E && this === x ? v : this, P);
      } });
    }, 825: (p, w, s) => {
      var d = s(6518), f = s(7751), m = s(8745), v = s(566), j = s(5548), O = s(8551), x = s(34), E = s(2360), P = s(9039), L = f("Reflect", "construct"), A = Object.prototype, R = [].push, N = P(function() {
        function D() {
        }
        return !(L(function() {
        }, [], D) instanceof D);
      }), F = !P(function() {
        L(function() {
        });
      }), H = N || F;
      d({ target: "Reflect", stat: !0, forced: H, sham: H }, { construct: function(D, M) {
        j(D), O(M);
        var U = arguments.length < 3 ? D : j(arguments[2]);
        if (F && !N) return L(D, M, U);
        if (D === U) {
          switch (M.length) {
            case 0:
              return new D();
            case 1:
              return new D(M[0]);
            case 2:
              return new D(M[0], M[1]);
            case 3:
              return new D(M[0], M[1], M[2]);
            case 4:
              return new D(M[0], M[1], M[2], M[3]);
          }
          var V = [null];
          return m(R, V, M), new (m(v, D, V))();
        }
        var Z = U.prototype, K = E(x(Z) ? Z : A), re = m(D, K, M);
        return x(re) ? re : K;
      } });
    }, 888: (p, w, s) => {
      var d = s(6518), f = s(9565), m = s(34), v = s(8551), j = s(6575), O = s(7347), x = s(2787);
      d({ target: "Reflect", stat: !0 }, { get: function E(P, L) {
        var A, R, N = arguments.length < 3 ? P : arguments[2];
        return v(P) === N ? P[L] : (A = O.f(P, L)) ? j(A) ? A.value : A.get === void 0 ? void 0 : f(A.get, N) : m(R = x(P)) ? E(R, L, N) : void 0;
      } });
    }, 4864: (p, w, s) => {
      var d = s(3724), f = s(4475), m = s(9504), v = s(2796), j = s(3167), O = s(6699), x = s(2360), E = s(8480).f, P = s(1625), L = s(788), A = s(655), R = s(1034), N = s(8429), F = s(1056), H = s(6840), D = s(9039), M = s(9297), U = s(1181).enforce, V = s(7633), Z = s(8227), K = s(3635), re = s(8814), ue = Z("match"), oe = f.RegExp, ne = oe.prototype, me = f.SyntaxError, fe = m(ne.exec), ke = m("".charAt), Ee = m("".replace), Se = m("".indexOf), ye = m("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, De = /a/g, Ye = new oe(Pe) !== Pe, tt = N.MISSED_STICKY, He = N.UNSUPPORTED_Y;
      if (v("RegExp", d && (!Ye || tt || K || re || D(function() {
        return De[ue] = !1, oe(Pe) !== Pe || oe(De) === De || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(B, W) {
          var Y, Q, X, he, de, le, ie = P(ne, this), je = L(B), be = W === void 0, Ce = [], te = B;
          if (!ie && je && be && B.constructor === Te) return B;
          if ((je || P(ne, B)) && (B = B.source, be && (W = R(te))), B = B === void 0 ? "" : A(B), W = W === void 0 ? "" : A(W), te = B, K && "dotAll" in Pe && (Q = !!W && Se(W, "s") > -1) && (W = Ee(W, /s/g, "")), Y = W, tt && "sticky" in Pe && (X = !!W && Se(W, "y") > -1) && He && (W = Ee(W, /y/g, "")), re && (he = function(ae) {
            for (var ce, Oe = ae.length, Ae = 0, Ve = "", rt = [], ct = x(null), ft = !1, yt = !1, Je = 0, Ze = ""; Ae <= Oe; Ae++) {
              if ((ce = ke(ae, Ae)) === "\\") ce += ke(ae, ++Ae);
              else if (ce === "]") ft = !1;
              else if (!ft) switch (!0) {
                case ce === "[":
                  ft = !0;
                  break;
                case ce === "(":
                  fe(Re, ye(ae, Ae + 1)) && (Ae += 2, yt = !0), Ve += ce, Je++;
                  continue;
                case (ce === ">" && yt):
                  if (Ze === "" || M(ct, Ze)) throw new me("Invalid capture group name");
                  ct[Ze] = !0, rt[rt.length] = [Ze, Je], yt = !1, Ze = "";
                  continue;
              }
              yt ? Ze += ce : Ve += ce;
            }
            return [Ve, rt];
          }(B), B = he[0], Ce = he[1]), de = j(oe(B, W), ie ? this : ne, Te), (Q || X || Ce.length) && (le = U(de), Q && (le.dotAll = !0, le.raw = Te(function(ae) {
            for (var ce, Oe = ae.length, Ae = 0, Ve = "", rt = !1; Ae <= Oe; Ae++) (ce = ke(ae, Ae)) !== "\\" ? rt || ce !== "." ? (ce === "[" ? rt = !0 : ce === "]" && (rt = !1), Ve += ce) : Ve += "[\\s\\S]" : Ve += ce + ke(ae, ++Ae);
            return Ve;
          }(B), Y)), X && (le.sticky = !0), Ce.length && (le.groups = Ce)), B !== te) try {
            O(de, "source", te === "" ? "(?:)" : te);
          } catch {
          }
          return de;
        }, qe = E(oe), T = 0; qe.length > T; ) F(Te, oe, qe[T++]);
        ne.constructor = Te, Te.prototype = ne, H(f, "RegExp", Te, { constructor: !0 });
      }
      V("RegExp");
    }, 7495: (p, w, s) => {
      var d = s(6518), f = s(7323);
      d({ target: "RegExp", proto: !0, forced: /./.exec !== f }, { exec: f });
    }, 8781: (p, w, s) => {
      var d = s(350).PROPER, f = s(6840), m = s(8551), v = s(655), j = s(9039), O = s(1034), x = "toString", E = RegExp.prototype, P = E[x], L = j(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), A = d && P.name !== x;
      (L || A) && f(E, x, function() {
        var R = m(this);
        return "/" + v(R.source) + "/" + v(O(R));
      }, { unsafe: !0 });
    }, 1699: (p, w, s) => {
      var d = s(6518), f = s(9504), m = s(5749), v = s(7750), j = s(655), O = s(1436), x = f("".indexOf);
      d({ target: "String", proto: !0, forced: !O("includes") }, { includes: function(E) {
        return !!~x(j(v(this)), j(m(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (p, w, s) => {
      var d = s(8183).charAt, f = s(655), m = s(1181), v = s(1088), j = s(2529), O = "String Iterator", x = m.set, E = m.getterFor(O);
      v(String, "String", function(P) {
        x(this, { type: O, string: f(P), index: 0 });
      }, function() {
        var P, L = E(this), A = L.string, R = L.index;
        return R >= A.length ? j(void 0, !0) : (P = d(A, R), L.index += P.length, j(P, !1));
      });
    }, 1761: (p, w, s) => {
      var d = s(9565), f = s(9228), m = s(8551), v = s(4117), j = s(8014), O = s(655), x = s(7750), E = s(5966), P = s(7829), L = s(6682);
      f("match", function(A, R, N) {
        return [function(F) {
          var H = x(this), D = v(F) ? void 0 : E(F, A);
          return D ? d(D, F, H) : new RegExp(F)[A](O(H));
        }, function(F) {
          var H = m(this), D = O(F), M = N(R, H, D);
          if (M.done) return M.value;
          if (!H.global) return L(H, D);
          var U = H.unicode;
          H.lastIndex = 0;
          for (var V, Z = [], K = 0; (V = L(H, D)) !== null; ) {
            var re = O(V[0]);
            Z[K] = re, re === "" && (H.lastIndex = P(D, j(H.lastIndex), U)), K++;
          }
          return K === 0 ? null : Z;
        }];
      });
    }, 5440: (p, w, s) => {
      var d = s(8745), f = s(9565), m = s(9504), v = s(9228), j = s(9039), O = s(8551), x = s(4901), E = s(4117), P = s(1291), L = s(8014), A = s(655), R = s(7750), N = s(7829), F = s(5966), H = s(2478), D = s(6682), M = s(8227)("replace"), U = Math.max, V = Math.min, Z = m([].concat), K = m([].push), re = m("".indexOf), ue = m("".slice), oe = "a".replace(/./, "$0") === "$0", ne = !!/./[M] && /./[M]("a", "$0") === "";
      v("replace", function(me, fe, ke) {
        var Ee = ne ? "$" : "$0";
        return [function(Se, ye) {
          var Re = R(this), Pe = E(Se) ? void 0 : F(Se, M);
          return Pe ? f(Pe, Se, Re, ye) : f(fe, A(Re), Se, ye);
        }, function(Se, ye) {
          var Re = O(this), Pe = A(Se);
          if (typeof ye == "string" && re(ye, Ee) === -1 && re(ye, "$<") === -1) {
            var De = ke(fe, Re, Pe, ye);
            if (De.done) return De.value;
          }
          var Ye = x(ye);
          Ye || (ye = A(ye));
          var tt, He = Re.global;
          He && (tt = Re.unicode, Re.lastIndex = 0);
          for (var Te, qe = []; (Te = D(Re, Pe)) !== null && (K(qe, Te), He); ) A(Te[0]) === "" && (Re.lastIndex = N(Pe, L(Re.lastIndex), tt));
          for (var T, B = "", W = 0, Y = 0; Y < qe.length; Y++) {
            for (var Q, X = A((Te = qe[Y])[0]), he = U(V(P(Te.index), Pe.length), 0), de = [], le = 1; le < Te.length; le++) K(de, (T = Te[le]) === void 0 ? T : String(T));
            var ie = Te.groups;
            if (Ye) {
              var je = Z([X], de, he, Pe);
              ie !== void 0 && K(je, ie), Q = A(d(ye, void 0, je));
            } else Q = H(X, Pe, he, de, ie, ye);
            he >= W && (B += ue(Pe, W, he) + Q, W = he + X.length);
          }
          return B + ue(Pe, W);
        }];
      }, !!j(function() {
        var me = /./;
        return me.exec = function() {
          var fe = [];
          return fe.groups = { a: "7" }, fe;
        }, "".replace(me, "$<a>") !== "7";
      }) || !oe || ne);
    }, 1392: (p, w, s) => {
      var d, f = s(6518), m = s(7476), v = s(7347).f, j = s(8014), O = s(655), x = s(5749), E = s(7750), P = s(1436), L = s(6395), A = m("".slice), R = Math.min, N = P("startsWith");
      f({ target: "String", proto: !0, forced: !(!L && !N && (d = v(String.prototype, "startsWith"), d && !d.writable) || N) }, { startsWith: function(F) {
        var H = O(E(this));
        x(F);
        var D = j(R(arguments.length > 1 ? arguments[1] : void 0, H.length)), M = O(F);
        return A(H, D, D + M.length) === M;
      } });
    }, 2762: (p, w, s) => {
      var d = s(6518), f = s(3802).trim;
      d({ target: "String", proto: !0, forced: s(706)("trim") }, { trim: function() {
        return f(this);
      } });
    }, 6412: (p, w, s) => {
      s(511)("asyncIterator");
    }, 6761: (p, w, s) => {
      var d = s(6518), f = s(4475), m = s(9565), v = s(9504), j = s(6395), O = s(3724), x = s(4495), E = s(9039), P = s(9297), L = s(1625), A = s(8551), R = s(5397), N = s(6969), F = s(655), H = s(6980), D = s(2360), M = s(1072), U = s(8480), V = s(298), Z = s(3717), K = s(7347), re = s(4913), ue = s(6801), oe = s(8773), ne = s(6840), me = s(2106), fe = s(5745), ke = s(6119), Ee = s(421), Se = s(3392), ye = s(8227), Re = s(1951), Pe = s(511), De = s(8242), Ye = s(687), tt = s(1181), He = s(9213).forEach, Te = ke("hidden"), qe = "Symbol", T = "prototype", B = tt.set, W = tt.getterFor(qe), Y = Object[T], Q = f.Symbol, X = Q && Q[T], he = f.RangeError, de = f.TypeError, le = f.QObject, ie = K.f, je = re.f, be = V.f, Ce = oe.f, te = v([].push), ae = fe("symbols"), ce = fe("op-symbols"), Oe = fe("wks"), Ae = !le || !le[T] || !le[T].findChild, Ve = function(Be, Ge, We) {
        var Qe = ie(Y, Ge);
        Qe && delete Y[Ge], je(Be, Ge, We), Qe && Be !== Y && je(Y, Ge, Qe);
      }, rt = O && E(function() {
        return D(je({}, "a", { get: function() {
          return je(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? Ve : je, ct = function(Be, Ge) {
        var We = ae[Be] = D(X);
        return B(We, { type: qe, tag: Be, description: Ge }), O || (We.description = Ge), We;
      }, ft = function(Be, Ge, We) {
        Be === Y && ft(ce, Ge, We), A(Be);
        var Qe = N(Ge);
        return A(We), P(ae, Qe) ? (We.enumerable ? (P(Be, Te) && Be[Te][Qe] && (Be[Te][Qe] = !1), We = D(We, { enumerable: H(0, !1) })) : (P(Be, Te) || je(Be, Te, H(1, D(null))), Be[Te][Qe] = !0), rt(Be, Qe, We)) : je(Be, Qe, We);
      }, yt = function(Be, Ge) {
        A(Be);
        var We = R(Ge), Qe = M(We).concat(en(We));
        return He(Qe, function(ht) {
          O && !m(Je, We, ht) || ft(Be, ht, We[ht]);
        }), Be;
      }, Je = function(Be) {
        var Ge = N(Be), We = m(Ce, this, Ge);
        return !(this === Y && P(ae, Ge) && !P(ce, Ge)) && (!(We || !P(this, Ge) || !P(ae, Ge) || P(this, Te) && this[Te][Ge]) || We);
      }, Ze = function(Be, Ge) {
        var We = R(Be), Qe = N(Ge);
        if (We !== Y || !P(ae, Qe) || P(ce, Qe)) {
          var ht = ie(We, Qe);
          return !ht || !P(ae, Qe) || P(We, Te) && We[Te][Qe] || (ht.enumerable = !0), ht;
        }
      }, mr = function(Be) {
        var Ge = be(R(Be)), We = [];
        return He(Ge, function(Qe) {
          P(ae, Qe) || P(Ee, Qe) || te(We, Qe);
        }), We;
      }, en = function(Be) {
        var Ge = Be === Y, We = be(Ge ? ce : R(Be)), Qe = [];
        return He(We, function(ht) {
          !P(ae, ht) || Ge && !P(Y, ht) || te(Qe, ae[ht]);
        }), Qe;
      };
      x || (ne(X = (Q = function() {
        if (L(X, this)) throw new de("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? F(arguments[0]) : void 0, Ge = Se(Be), We = function(Qe) {
          var ht = this === void 0 ? f : this;
          ht === Y && m(We, ce, Qe), P(ht, Te) && P(ht[Te], Ge) && (ht[Te][Ge] = !1);
          var Yt = H(1, Qe);
          try {
            rt(ht, Ge, Yt);
          } catch (Lt) {
            if (!(Lt instanceof he)) throw Lt;
            Ve(ht, Ge, Yt);
          }
        };
        return O && Ae && rt(Y, Ge, { configurable: !0, set: We }), ct(Ge, Be);
      })[T], "toString", function() {
        return W(this).tag;
      }), ne(Q, "withoutSetter", function(Be) {
        return ct(Se(Be), Be);
      }), oe.f = Je, re.f = ft, ue.f = yt, K.f = Ze, U.f = V.f = mr, Z.f = en, Re.f = function(Be) {
        return ct(ye(Be), Be);
      }, O && (me(X, "description", { configurable: !0, get: function() {
        return W(this).description;
      } }), j || ne(Y, "propertyIsEnumerable", Je, { unsafe: !0 }))), d({ global: !0, constructor: !0, wrap: !0, forced: !x, sham: !x }, { Symbol: Q }), He(M(Oe), function(Be) {
        Pe(Be);
      }), d({ target: qe, stat: !0, forced: !x }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), d({ target: "Object", stat: !0, forced: !x, sham: !O }, { create: function(Be, Ge) {
        return Ge === void 0 ? D(Be) : yt(D(Be), Ge);
      }, defineProperty: ft, defineProperties: yt, getOwnPropertyDescriptor: Ze }), d({ target: "Object", stat: !0, forced: !x }, { getOwnPropertyNames: mr }), De(), Ye(Q, qe), Ee[Te] = !0;
    }, 9463: (p, w, s) => {
      var d = s(6518), f = s(3724), m = s(4475), v = s(9504), j = s(9297), O = s(4901), x = s(1625), E = s(655), P = s(2106), L = s(7740), A = m.Symbol, R = A && A.prototype;
      if (f && O(A) && (!("description" in R) || A().description !== void 0)) {
        var N = {}, F = function() {
          var K = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), re = x(R, this) ? new A(K) : K === void 0 ? A() : A(K);
          return K === "" && (N[re] = !0), re;
        };
        L(F, A), F.prototype = R, R.constructor = F;
        var H = String(A("description detection")) === "Symbol(description detection)", D = v(R.valueOf), M = v(R.toString), U = /^Symbol\((.*)\)[^)]+$/, V = v("".replace), Z = v("".slice);
        P(R, "description", { configurable: !0, get: function() {
          var K = D(this);
          if (j(N, K)) return "";
          var re = M(K), ue = H ? Z(re, 7, -1) : V(re, U, "$1");
          return ue === "" ? void 0 : ue;
        } }), d({ global: !0, constructor: !0, forced: !0 }, { Symbol: F });
      }
    }, 1510: (p, w, s) => {
      var d = s(6518), f = s(7751), m = s(9297), v = s(655), j = s(5745), O = s(1296), x = j("string-to-symbol-registry"), E = j("symbol-to-string-registry");
      d({ target: "Symbol", stat: !0, forced: !O }, { for: function(P) {
        var L = v(P);
        if (m(x, L)) return x[L];
        var A = f("Symbol")(L);
        return x[L] = A, E[A] = L, A;
      } });
    }, 2259: (p, w, s) => {
      s(511)("iterator");
    }, 2675: (p, w, s) => {
      s(6761), s(1510), s(7812), s(3110), s(9773);
    }, 7812: (p, w, s) => {
      var d = s(6518), f = s(9297), m = s(757), v = s(6823), j = s(5745), O = s(1296), x = j("symbol-to-string-registry");
      d({ target: "Symbol", stat: !0, forced: !O }, { keyFor: function(E) {
        if (!m(E)) throw new TypeError(v(E) + " is not a symbol");
        if (f(x, E)) return x[E];
      } });
    }, 5700: (p, w, s) => {
      var d = s(511), f = s(8242);
      d("toPrimitive"), f();
    }, 8125: (p, w, s) => {
      var d = s(7751), f = s(511), m = s(687);
      f("toStringTag"), m(d("Symbol"), "Symbol");
    }, 3500: (p, w, s) => {
      var d = s(4475), f = s(7400), m = s(9296), v = s(235), j = s(6699), O = function(E) {
        if (E && E.forEach !== v) try {
          j(E, "forEach", v);
        } catch {
          E.forEach = v;
        }
      };
      for (var x in f) f[x] && O(d[x] && d[x].prototype);
      O(m);
    }, 2953: (p, w, s) => {
      var d = s(4475), f = s(7400), m = s(9296), v = s(3792), j = s(6699), O = s(687), x = s(8227)("iterator"), E = v.values, P = function(A, R) {
        if (A) {
          if (A[x] !== E) try {
            j(A, x, E);
          } catch {
            A[x] = E;
          }
          if (O(A, R, !0), f[R]) {
            for (var N in v) if (A[N] !== v[N]) try {
              j(A, N, v[N]);
            } catch {
              A[N] = v[N];
            }
          }
        }
      };
      for (var L in f) P(d[L] && d[L].prototype, L);
      P(m, "DOMTokenList");
    }, 5575: (p, w, s) => {
      var d = s(6518), f = s(4475), m = s(9472)(f.setInterval, !0);
      d({ global: !0, bind: !0, forced: f.setInterval !== m }, { setInterval: m });
    }, 4599: (p, w, s) => {
      var d = s(6518), f = s(4475), m = s(9472)(f.setTimeout, !0);
      d({ global: !0, bind: !0, forced: f.setTimeout !== m }, { setTimeout: m });
    }, 6031: (p, w, s) => {
      s(5575), s(4599);
    } }, _ = {};
    function g(p) {
      var w = _[p];
      if (w !== void 0) return w.exports;
      var s = _[p] = { exports: {} };
      return y[p].call(s.exports, s, s.exports, g), s.exports;
    }
    g.d = (p, w) => {
      for (var s in w) g.o(w, s) && !g.o(p, s) && Object.defineProperty(p, s, { enumerable: !0, get: w[s] });
    }, g.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), g.o = (p, w) => Object.prototype.hasOwnProperty.call(p, w), g.r = (p) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(p, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(p, "__esModule", { value: !0 });
    };
    var C = {};
    return (() => {
      g.r(C), g.d(C, { JSONEditor: () => jr }), g(2675), g(9463), g(6412), g(2259), g(5700), g(8125), g(8706), g(113), g(1629), g(3418), g(4346), g(3792), g(2712), g(4490), g(4782), g(739), g(9572), g(3288), g(2010), g(4731), g(479), g(2892), g(9085), g(9904), g(4185), g(875), g(9432), g(287), g(6099), g(6034), g(3362), g(7495), g(8781), g(7764), g(3500), g(2953), g(5506), g(4864), g(5440), g(4423);
      var p = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], w = [function(o) {
        return o.type === "string" && o.format === "color" && "colorpicker";
      }, function(o) {
        return o.type === "string" && ["ip", "ipv4", "ipv6", "hostname"].includes(o.format) && "ip";
      }, function(o) {
        return o.type === "string" && p.includes(o.format) && "ace";
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
      function s(o, r, n) {
        var a;
        return a = function(e, t) {
          if (d(e) != "object" || !e) return e;
          var i = e[Symbol.toPrimitive];
          if (i !== void 0) {
            var u = i.call(e, "string");
            if (d(u) != "object") return u;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(r), (r = d(a) == "symbol" ? a : a + "") in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function d(o) {
        return d = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, d(o);
      }
      function f(o) {
        return !(o === null || d(o) !== "object" || o.nodeType || o === o.window || o.constructor && !x(o.constructor.prototype, "isPrototypeOf"));
      }
      function m(o) {
        return f(o) ? v({}, o) : Array.isArray(o) ? o.map(m) : o;
      }
      function v(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && f(e[t]) ? (x(o, t) || (o[t] = {}), v(o[t], e[t])) : Array.isArray(e[t]) ? o[t] = m(e[t]) : o[t] = e[t];
          });
        }), o;
      }
      function j(o, r) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(r, !0, !0), o.dispatchEvent(n);
      }
      function O(o) {
        return o && (o.toString() === "[object ShadowRoot]" ? o : O(o.parentNode));
      }
      function x(o, r) {
        return o && Object.prototype.hasOwnProperty.call(o, r);
      }
      g(4170), g(3851), g(825), g(888), g(8598), g(1699), g(1761), g(5276), g(5086), g(1392), g(2062), g(8459), g(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function L() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function A(o) {
        return o && d(o) === "object" && !Array.isArray(o);
      }
      var R = ["__proto__", "constructor", "prototype"];
      function N(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        if (!n.length) return o;
        var e = n.shift();
        if (A(o) && A(e)) for (var t in e) x(e, t) && (R.includes(t) || (A(e[t]) ? (x(o, t) && A(o[t]) || Object.assign(o, s({}, t, {})), N(o[t], e[t])) : Object.assign(o, s({}, t, e[t]))));
        return N.apply(void 0, [o].concat(n));
      }
      function F(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function H(o) {
        return H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, H(o);
      }
      function D(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, M(a.key), a);
        }
      }
      function M(o) {
        var r = function(n, a) {
          if (H(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (H(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return H(r) == "symbol" ? r : r + "";
      }
      var U = function() {
        return o = function n(a, e) {
          var t, i;
          (function(u, h) {
            if (!(u instanceof h)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.defaults = e, this.jsoneditor = a.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = a.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = v({}, this.options || {}, this.schema.options || {}, a.schema.options || {}, a), this.enforceConstEnabled = (t = this.options.enforce_const) !== null && t !== void 0 ? t : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", a.path || this.schema.id || (this.schema.id = this.formname), this.path = a.path || this.formname, this.formname = a.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = a.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, a.container && this.setContainer(a.container), this.registerDependencies();
        }, r = [{ key: "onChildEditorChange", value: function(n, a) {
          this.onChange(!0, !1, a);
        } }, { key: "notify", value: function() {
          this.path && this.jsoneditor.notifyWatchers(this.path);
        } }, { key: "change", value: function(n) {
          this.parent ? this.parent.onChildEditorChange(this, n) : this.jsoneditor && this.jsoneditor.onChange(n);
        } }, { key: "onChange", value: function(n, a, e) {
          this.notify(), a || this.watch_listener && this.watch_listener(), n && this.change(e);
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
          var a = this.options.dependencies;
          a && Object.keys(a).forEach(function(e) {
            var t;
            e.startsWith(n.jsoneditor.root.path) ? t = e : ((t = n.path.split("."))[t.length - 1] = e, t = t.join(".")), n.jsoneditor.watch(t, function() {
              n.evaluateDependencies();
            });
          });
        } }, { key: "evaluateDependencies", value: function() {
          var n = this, a = this.container || this.control;
          if (a && this.jsoneditor !== null) {
            var e = this.options.dependencies;
            if (e) {
              var t = this.dependenciesFulfilled;
              this.dependenciesFulfilled = !0, Object.keys(e).forEach(function(u) {
                var h;
                u.startsWith(n.jsoneditor.root.path) ? h = u : ((h = n.path.split("."))[h.length - 1] = u, h = h.join("."));
                var b = e[u];
                n.checkDependency(h, b);
              }), this.dependenciesFulfilled !== t && this.notify();
              var i = this.dependenciesFulfilled ? "block" : "none";
              this.options.hidden && (i = "none"), a.tagName === "TD" ? Object.keys(a.childNodes).forEach(function(u) {
                return a.childNodes[u].style.display = i;
              }) : a.style.display = i;
            }
          }
        } }, { key: "checkDependency", value: function(n, a) {
          var e = this;
          if (this.path !== n && this.jsoneditor !== null) {
            var t = this.jsoneditor.getEditor(n), i = t ? t.getValue() : void 0;
            t && t.dependenciesFulfilled && i != null ? Array.isArray(a) ? this.dependenciesFulfilled = a.some(function(u) {
              if (JSON.stringify(i) === JSON.stringify(u)) return !0;
            }) : H(a) === "object" ? H(i) !== "object" ? this.dependenciesFulfilled = a === i : Object.keys(a).some(function(u) {
              return !!x(a, u) && (x(i, u) && a[u] === i[u] ? void 0 : (e.dependenciesFulfilled = !1, !0));
            }) : typeof a == "string" || typeof a == "number" ? this.dependenciesFulfilled = this.dependenciesFulfilled && i === a : typeof a == "boolean" && (this.dependenciesFulfilled = a ? this.dependenciesFulfilled && (i || i.length > 0) : this.dependenciesFulfilled && (!i || i.length === 0)) : this.dependenciesFulfilled = !1;
          }
        } }, { key: "setContainer", value: function(n) {
          this.container = n, this.setContainerAttributes(), this.schema.id && this.container.setAttribute("data-schemaid", this.schema.id), this.schema.type && typeof this.schema.type == "string" && this.container.setAttribute("data-schematype", this.schema.type), this.container.setAttribute("data-schemapath", this.path);
        } }, { key: "setOptInCheckbox", value: function() {
          var n, a = this;
          n = this.optInWidget === "switch" ? this.theme.getOptInSwitch(this.formname) : this.theme.getOptInCheckbox(this.formname), this.optInCheckbox = n.checkbox, this.optInContainer = n.container, this.optInCheckbox.addEventListener("click", function() {
            a.isActive() ? a.deactivate() : a.activate();
          });
          var e = this.jsoneditor.options.show_opt_in, t = this.parent.options.show_opt_in !== void 0, i = t && this.parent.options.show_opt_in === !0, u = t && this.parent.options.show_opt_in === !1;
          (i || !u && e || !t && e) && this.parent && this.parent.schema.type === "object" && !this.isRequired() && this.header && (this.header.insertBefore(this.optInContainer, this.header.firstChild), this.optInAppended = !0);
        } }, { key: "preBuild", value: function() {
        } }, { key: "build", value: function() {
        } }, { key: "postBuild", value: function() {
          this.setupWatchListeners(), this.addLinks(), this.register(), this.setValue(this.getDefault(), !0), this.updateHeaderText(), this.onWatchedFieldChange(), this.options.titleHidden && (this.theme.visuallyHidden(this.label), this.theme.visuallyHidden(this.header)), this.enforceConstEnabled && this.schema.const && this.disable();
        } }, { key: "setupWatchListeners", value: function() {
          var n = this;
          if (this.watched = {}, this.schema.vars && (this.schema.watch = this.schema.vars), this.watched_values = {}, this.watch_listener = function() {
            n.refreshWatchedFieldValues() && n.onWatchedFieldChange();
          }, x(this.schema, "watch")) {
            var a, e, t, i, u, h = this.container.getAttribute("data-schemapath");
            Object.keys(this.schema.watch).forEach(function(b) {
              if (a = n.schema.watch[b], Array.isArray(a)) {
                if (a.length < 2) return;
                e = [a[0]].concat(a[1].split("."));
              } else e = a.split("."), n.theme.closest(n.container, '[data-schemaid="'.concat(e[0], '"]')) || e.unshift("#");
              if ((t = e.shift()) === "#" && (t = n.jsoneditor.schema.id || n.jsoneditor.root.formname), !(i = n.theme.closest(n.container, '[data-schemaid="'.concat(t, '"]')))) throw new Error("Could not find ancestor node with id ".concat(t));
              u = "".concat(i.getAttribute("data-schemapath"), ".").concat(e.join(".")), h.startsWith(u) && (n.watchLoop = !0), n.jsoneditor.watch(u, n.watch_listener), n.watched[b] = u;
            });
          }
          this.schema.headerTemplate && (this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine));
        } }, { key: "addLinks", value: function() {
          if (!this.no_link_holder && (this.link_holder = this.theme.getLinksHolder(), this.description !== void 0 ? this.description.parentNode.insertBefore(this.link_holder, this.description) : this.container.appendChild(this.link_holder), this.schema.links)) for (var n = 0; n < this.schema.links.length; n++) this.addLink(this.getLink(this.schema.links[n]));
        } }, { key: "onMove", value: function() {
        } }, { key: "getButton", value: function(n, a, e) {
          var t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], i = "json-editor-btn-".concat(a);
          a = this.iconlib ? this.iconlib.getIcon(a) : null, n = this.translate(n, t), e = this.translate(e, t), !a && e && (n = e, e = null);
          var u = this.theme.getButton(n, a, e);
          return u.classList.add(i), u;
        } }, { key: "setButtonText", value: function(n, a, e, t) {
          var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
          return e = this.iconlib ? this.iconlib.getIcon(e) : null, a = this.translate(a, i), t = this.translate(t, i), !e && t && (a = t, t = null), this.theme.setButtonText(n, a, e, t);
        } }, { key: "addLink", value: function(n) {
          this.link_holder && this.link_holder.appendChild(n);
        } }, { key: "getLink", value: function(n) {
          var a, e, t = (n.mediaType || "application/javascript").split("/")[0], i = this.jsoneditor.compileTemplate(n.href, this.template_engine), u = this.jsoneditor.compileTemplate(n.rel ? n.rel : n.href, this.template_engine), h = null;
          if (n.download && (h = n.download), h && h !== !0 && (h = this.jsoneditor.compileTemplate(h, this.template_engine)), t === "image") {
            a = this.theme.getBlockLinkHolder(), (e = document.createElement("a")).setAttribute("target", "_blank");
            var b = document.createElement("img");
            this.theme.createImageLink(a, e, b), this.link_watchers.push(function(S) {
              var I = i(S), $ = u(S);
              e.setAttribute("href", I), e.setAttribute("title", $ || I), b.setAttribute("src", I);
            });
          } else if (["audio", "video"].includes(t)) {
            a = this.theme.getBlockLinkHolder(), (e = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var k = document.createElement(t);
            k.setAttribute("controls", "controls"), this.theme.createMediaLink(a, e, k), this.link_watchers.push(function(S) {
              var I = i(S), $ = u(S);
              e.setAttribute("href", I), e.textContent = $ || I, k.setAttribute("src", I);
            });
          } else e = a = this.theme.getBlockLink(), a.setAttribute("target", "_blank"), a.textContent = n.rel, a.style.display = "none", this.link_watchers.push(function(S) {
            var I = i(S), $ = u(S);
            I && (a.style.display = ""), a.setAttribute("href", I), a.textContent = $ || I;
          });
          return h && e && (h === !0 ? e.setAttribute("download", "") : this.link_watchers.push(function(S) {
            e.setAttribute("download", h(S));
          })), n.class && n.class.split(" ").forEach(function(S) {
            e.classList.add(S);
          }), a;
        } }, { key: "refreshWatchedFieldValues", value: function() {
          var n = this;
          if (this.watched_values) {
            var a = {}, e = !1;
            return this.watched && Object.keys(this.watched).forEach(function(t) {
              var i = n.jsoneditor.getEditor(n.watched[t]), u = i ? i.getValue() : null;
              n.watched_values[t] !== u && (e = !0), a[t] = u;
            }), a.self = this.getValue(), this.watched_values.self !== a.self && (e = !0), this.watched_values = a, e;
          }
        } }, { key: "getWatchedFieldValues", value: function() {
          return this.watched_values;
        } }, { key: "updateHeaderText", value: function() {
          if (this.header) {
            var n = this.getHeaderText();
            if (this.header.children.length) {
              for (var a = 0; a < this.header.childNodes.length; a++) if (this.header.childNodes[a].nodeType === 3) {
                this.header.childNodes[a].nodeValue = this.cleanText(n);
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
          var a = new window.DOMParser().parseFromString(n, "text/html");
          return a.body ? a.body.textContent : "";
        } }, { key: "onWatchedFieldChange", value: function() {
          var n, a = this;
          if (this.header_template) {
            n = v(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (n.properties = {}, Object.keys(this.editors).forEach(function(i) {
              var u = a.editors[i];
              if (u.schema && u.schema.enum && u.schema.options && u.schema.options.enum_titles) {
                var h = u.schema.enum.indexOf(u.value), b = u.options.enum_titles[h];
                n.properties[i] = { enumTitle: b };
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
          this.unregister(this), this.watched && Object.values(this.watched).forEach(function(a) {
            return n.jsoneditor.unwatch(a, n.watch_listener);
          }), this.watched = null, this.watched_values = null, this.watch_listener = null, this.header_text = null, this.header_template = null, this.value = null, this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.jsoneditor = null, this.schema = null, this.path = null, this.key = null, this.parent = null;
        } }, { key: "isDefaultRequired", value: function() {
          return this.isRequired() || !!this.jsoneditor.options.use_default_values;
        } }, { key: "getDefault", value: function() {
          if (this.enforceConstEnabled && this.schema.const) return this.schema.const;
          if (this.schema.default !== void 0) return this.schema.default;
          if (this.schema.enum !== void 0) return this.schema.enum[0];
          var n = this.schema.type || this.schema.oneOf;
          if (n && Array.isArray(n) && (n = n[0]), n && H(n) === "object" && (n = n.type), n && Array.isArray(n) && (n = n[0]), typeof n == "string") {
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
          var a = [], e = {};
          n.forEach(function(i) {
            i.title && (e[i.title] = e[i.title] || 0, e[i.title]++), i.description && (e[i.description] = e[i.description] || 0, e[i.description]++), i.format && (e[i.format] = e[i.format] || 0, e[i.format]++), i.type && (e[i.type] = e[i.type] || 0, e[i.type]++);
          }), n.forEach(function(i) {
            var u;
            u = typeof i == "string" ? i : i.title && e[i.title] <= 1 ? i.title : i.format && e[i.format] <= 1 ? i.format : i.type && e[i.type] <= 1 ? i.type : i.description && e[i.description] <= 1 ? i.description : i.title ? i.title : i.format ? i.format : i.type ? i.type : i.description ? i.description : JSON.stringify(i).length < 500 ? JSON.stringify(i) : "type", a.push(u);
          });
          var t = {};
          return a.forEach(function(i, u) {
            t[i] = t[i] || 0, t[i]++, e[i] > 1 && (a[u] = "".concat(i, " ").concat(t[i]));
          }), a;
        } }, { key: "getValidId", value: function(n) {
          return (n = n === void 0 ? "" : n.toString()).replace(/\s+/g, "-");
        } }, { key: "setInputAttributes", value: function(n, a) {
          if (this.schema.options && this.schema.options.inputAttributes) {
            var e = this.schema.options.inputAttributes, t = ["name", "type"].concat(n), i = a || this.input;
            Object.keys(e).forEach(function(u) {
              t.includes(u.toLowerCase()) || i.setAttribute(u, e[u]);
            });
          }
        } }, { key: "setContainerAttributes", value: function() {
          var n = this;
          if (this.schema.options && this.schema.options.containerAttributes) {
            var a = this.schema.options.containerAttributes, e = ["data-schemapath", "data-schematype", "data-schemaid"];
            Object.keys(a).forEach(function(t) {
              e.includes(t.toLowerCase()) || n.container.setAttribute(t, a[t]);
            });
          }
        } }, { key: "expandCallbacks", value: function(n, a) {
          var e = this, t = this.defaults.callbacks[n];
          return Object.entries(a).forEach(function(i) {
            var u, h, b = (h = 2, function(I) {
              if (Array.isArray(I)) return I;
            }(u = i) || function(I, $) {
              var G = I == null ? null : typeof Symbol < "u" && I[Symbol.iterator] || I["@@iterator"];
              if (G != null) {
                var ee, pe, _e, we, Ie = [], Fe = !0, Me = !1;
                try {
                  if (_e = (G = G.call(I)).next, $ === 0) {
                    if (Object(G) !== G) return;
                    Fe = !1;
                  } else for (; !(Fe = (ee = _e.call(G)).done) && (Ie.push(ee.value), Ie.length !== $); Fe = !0) ;
                } catch (ve) {
                  Me = !0, pe = ve;
                } finally {
                  try {
                    if (!Fe && G.return != null && (we = G.return(), Object(we) !== we)) return;
                  } finally {
                    if (Me) throw pe;
                  }
                }
                return Ie;
              }
            }(u, h) || function(I, $) {
              if (I) {
                if (typeof I == "string") return F(I, $);
                var G = Object.prototype.toString.call(I).slice(8, -1);
                return G === "Object" && I.constructor && (G = I.constructor.name), G === "Map" || G === "Set" ? Array.from(I) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? F(I, $) : void 0;
              }
            }(u, h) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), k = b[0], S = b[1];
            S === Object(S) ? a[k] = e.expandCallbacks(n, S) : typeof S == "string" && H(t) === "object" && typeof t[S] == "function" && (a[k] = t[S].bind(null, e));
          }), a;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && D(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
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
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, K(a.key), a);
        }
      }
      function K(o) {
        var r = function(n, a) {
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
      function re(o, r, n) {
        return r = ne(r), function(a, e) {
          if (e && (V(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ue() ? Reflect.construct(r, n || [], ne(o).constructor) : r.apply(o, n));
      }
      function ue() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ue = function() {
          return !!o;
        })();
      }
      function oe() {
        return oe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ne(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
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
        return me = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, me(o, r);
      }
      var fe = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), re(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && me(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          oe(ne(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          oe(ne(r.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.purify(e), e = this.applyConstFilter(e), (!this.template || i) && (this.shouldBeUnset() || e != null ? V(e) === "object" ? e = JSON.stringify(e) : this.shouldBeUnset() || typeof e == "string" || (e = "".concat(e)) : e = "", e !== this.serialized)) {
            var u = this.sanitize(e);
            if (this.input.value !== u) {
              if (this.setValueToInputField(u), this.format === "range") {
                var h = this.control.querySelector("output");
                h && (h.value = u);
              }
              var b = i || this.getValue() !== e;
              return this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), b && this.onChange(!0, i), { changed: b, value: u };
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
            var i = this.schema.minimum || 0, u = this.schema.maximum || Math.max(100, i + 1), h = 1;
            this.schema.multipleOf && (i % this.schema.multipleOf && (i = Math.ceil(i / this.schema.multipleOf) * this.schema.multipleOf), u % this.schema.multipleOf && (u = Math.floor(u / this.schema.multipleOf) * this.schema.multipleOf), h = this.schema.multipleOf), this.input = this.theme.getRangeInput(i, u, h, this.description, this.formname), this.input.setAttribute("id", this.formname);
          } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(this.format) && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
          else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function($) {
            if ($.preventDefault(), $.stopPropagation(), t.schema.template) $.currentTarget.value = t.value;
            else {
              var G = $.currentTarget.value, ee = t.sanitize(G);
              G !== ee && ($.currentTarget.value = ee), t.is_dirty = !0, t.refreshValue(), t.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function($) {
            if ($) {
              var G, ee = $.offsetHeight;
              if ($.offsetHeight < $.scrollHeight) for (G = 0; $.offsetHeight < $.scrollHeight + 3 && !(G > 100); ) G++, ee++, $.style.height = "".concat(ee, "px");
              else {
                for (G = 0; $.offsetHeight >= $.scrollHeight + 3 && !(G > 100); ) G++, ee--, $.style.height = "".concat(ee, "px");
                $.style.height = "".concat(ee + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function($) {
            t.adjust_height($.currentTarget);
          }), this.input.addEventListener("change", function($) {
            t.adjust_height($.currentTarget);
          }), this.adjust_height());
          var b = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, k = this.schema.maxLength !== void 0;
          b && k && this.input.addEventListener("paste", function($) {
            ($.clipboardData || window.clipboardData).getData("text").length + t.input.value.length > t.schema.maxLength && alert(t.translate("paste_max_length_reached", [t.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var S = this.input;
          if (this.format === "range" && (S = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input), t.format === "range" && (t.control.querySelector("output").value = t.input.value);
          }), this.schema.template) {
            var I = this.expandCallbacks("template", { template: this.schema.template });
            typeof I.template == "function" ? this.template = I.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
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
              var u = e[i].match(/^regex:\/(.*)\/([gimsuy]*)$/);
              if (u !== null) try {
                e[i] = new RegExp(u[1], u[2]);
              } catch {
              }
            } else e[i] = t.getGlobalPropertyFromString(e[i]);
          }), e;
        } }, { key: "getGlobalPropertyFromString", value: function(e) {
          if (e.includes(".")) {
            var t = e.split("."), i = t[0], u = t[1];
            if (window[i] !== void 0 && window[i][u] !== void 0) return window[i][u];
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
          var i = e.reduce(function(u, h) {
            return h.path === t.path && u.push(h.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && Z(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function ke(o) {
        return ke = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ke(o);
      }
      function Ee(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Se(a.key), a);
        }
      }
      function Se(o) {
        var r = function(n, a) {
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
        return r = De(r), function(a, e) {
          if (e && (ke(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Re() ? Reflect.construct(r, n || [], De(o).constructor) : r.apply(o, n));
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
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = De(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Pe.apply(this, arguments);
      }
      function De(o) {
        return De = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, De(o);
      }
      function Ye(o, r) {
        return Ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
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
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Pe(De(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(u.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize());
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Pe(De(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.ace) {
            var i = this.input_type;
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), e = this.expandCallbacks("ace", v({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, e), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
              t.input.value = t.ace_editor_instance.getValue(), t.refreshValue(), t.is_dirty = !0, t.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Pe(De(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!1), Pe(De(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!0), Pe(De(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.ace_editor_instance && (this.ace_editor_instance.destroy(), this.ace_editor_instance = null), Pe(De(r.prototype), "destroy", this).call(this);
        } }]) && Ee(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function He(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function Te(o, r, n) {
        return (r = B(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function qe(o) {
        return qe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qe(o);
      }
      function T(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, B(a.key), a);
        }
      }
      function B(o) {
        var r = function(n, a) {
          if (qe(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (qe(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return qe(r) == "symbol" ? r : r + "";
      }
      function W(o, r, n) {
        return r = X(r), function(a, e) {
          if (e && (qe(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Y() ? Reflect.construct(r, n || [], X(o).constructor) : r.apply(o, n));
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
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = X(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Q.apply(this, arguments);
      }
      function X(o) {
        return X = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, X(o);
      }
      function he(o, r) {
        return he = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, he(o, r);
      }
      g(2008), g(4554), g(7945), g(1278);
      var de = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), W(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && he(e, t);
        }(r, o), n = r, a = [{ key: "askConfirmation", value: function() {
          return this.jsoneditor.options.prompt_before_delete !== !0 || window.confirm(this.translate("button_delete_node_warning")) !== !1;
        } }, { key: "register", value: function() {
          Q(X(r.prototype), "register", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          Q(X(r.prototype), "unregister", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          var e = this.getItemInfo(0);
          return this.tabs_holder && this.schema.format !== "tabs-top" ? Math.max(Math.min(12, e.width + 2), 4) : e.width;
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.setAvailability(this, !1), this.rows && this.rows.forEach(function(t) {
            t.enable(), e.setAvailability(t, !1);
          }), Q(X(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.setAvailability(this, !0), this.rows && this.rows.forEach(function(i) {
            i.disable(e), t.setAvailability(i, !0);
          }), Q(X(r.prototype), "disable", this).call(this);
        } }, { key: "setAvailability", value: function(e, t) {
          e.add_row_button && (e.add_row_button.disabled = t), e.remove_all_rows_button && (e.remove_all_rows_button.disabled = t), e.delete_last_row_button && (e.delete_last_row_button.disabled = t), e.copy_button && (e.copy_button.disabled = t), e.delete_button && (e.delete_button.disabled = t), e.moveup_button && (e.moveup_button.disabled = t), e.movedown_button && (e.movedown_button.disabled = t);
        } }, { key: "preBuild", value: function() {
          Q(X(r.prototype), "preBuild", this).call(this), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add, this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top;
        } }, { key: "build", value: function() {
          this.options.compact ? (this.title = this.theme.getHeader("", this.getPathDepth()), this.container.appendChild(this.title), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.schema.format === "tabs-top" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder), this.active_tab = null) : this.schema.format === "tabs" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls))), this.addControls();
        } }, { key: "postBuild", value: function() {
          Q(X(r.prototype), "postBuild", this).call(this), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), this.refreshTabs(!0), this.is_dirty = !0, Q(X(r.prototype), "onChildEditorChange", this).call(this, e, t);
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
          var u, h = this.jsoneditor.getEditorClass(i);
          this.tabs_holder ? (u = this.schema.format === "tabs-top" ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = "".concat(this.path, ".").concat(e) : u = t.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(u);
          var b = this.jsoneditor.createEditor(h, { jsoneditor: this.jsoneditor, schema: i, container: u, path: "".concat(this.path, ".").concat(e), parent: this, required: !0 });
          return b.preBuild(), b.build(), b.postBuild(), b.title_controls || (b.array_controls = this.theme.getButtonHolder(), u.appendChild(b.array_controls)), b;
        } }, { key: "checkParent", value: function(e) {
          return e && e.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, Q(X(r.prototype), "destroy", this).call(this);
        } }, { key: "empty", value: function(e) {
          var t = this;
          if (this.rows !== null) {
            if (this.rows.forEach(function(u, h) {
              e && (t.checkParent(u.tab) && u.tab.parentNode.removeChild(u.tab), t.destroyRow(u, !0), t.row_cache[h] = null), t.rows[h] = null;
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
            t.forEach(function(k, S) {
              if (e.rows[S]) e.rows[S].setValue(k, i);
              else if (e.row_cache[S]) e.rows[S] = e.row_cache[S], e.rows[S].setValue(k, i), e.rows[S].container.style.display = "", e.rows[S].tab && (e.rows[S].tab.style.display = ""), e.rows[S].register(), e.jsoneditor.trigger("addRow", e.rows[S]);
              else {
                var I = e.addRow(k, i);
                e.jsoneditor.trigger("addRow", I);
              }
            });
            for (var u = t.length; u < this.rows.length; u++) this.destroyRow(this.rows[u]), this.rows[u] = null;
            this.rows = this.rows.slice(0, t.length);
            var h = this.rows.find(function(k) {
              return k.tab === e.active_tab;
            }), b = h !== void 0 ? h.tab : null;
            !b && this.rows.length && (b = this.rows[0].tab), this.active_tab = b, this.refreshValue(i), this.refreshTabs(!0), this.refreshTabs(), this.onChange();
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
            var u = !(e || this.hide_delete_last_row_buttons);
            this.setButtonState(this.delete_last_row_button, u), t.push(u);
            var h = !(e || this.hide_delete_all_rows_buttons);
            this.setButtonState(this.remove_all_rows_button, h), t.push(h);
          }
          else this.setButtonState(this.delete_last_row_button, !1), this.setButtonState(this.remove_all_rows_button, !1);
          var b = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, b), t.push(b), t.some(function(k) {
            return k;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(h) {
            return h.getValue();
          }), i !== this.value.length || e) {
            var u = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(h, b) {
              if (h.movedown_button) {
                var k = b !== t.rows.length - 1;
                t.setButtonState(h.movedown_button, k);
              }
              h.delete_button && t.setButtonState(h.delete_button, !u), t.value[b] = h.getValue();
            }), this.setupButtons(u) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e, t) {
          var i = this, u = this.rows.length;
          this.rows[u] = this.getElementEditor(u), this.row_cache[u] = this.rows[u], this.tabs_holder ? (this.rows[u].tab_text = document.createElement("span"), this.rows[u].tab_text.textContent = this.rows[u].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[u].tab = this.theme.getTopTab(this.rows[u].tab_text, this.getValidId(this.rows[u].path)), this.theme.addTopTab(this.tabs_holder, this.rows[u].tab)) : (this.rows[u].tab = this.theme.getTab(this.rows[u].tab_text, this.getValidId(this.rows[u].path)), this.theme.addTab(this.tabs_holder, this.rows[u].tab)), this.rows[u].tab.addEventListener("click", function(b) {
            i.active_tab = i.rows[u].tab, i.refreshTabs(), b.preventDefault(), b.stopPropagation();
          }), this._supportDragDrop(this.rows[u].tab)) : this._supportDragDrop(this.rows[u].container, !0);
          var h = this.rows[u].title_controls || this.rows[u].array_controls;
          return this.hide_delete_buttons || (this.rows[u].delete_button = this._createDeleteButton(u, h)), this.show_copy_button && (this.rows[u].copy_button = this._createCopyButton(u, h)), u && !this.hide_move_buttons && (this.rows[u].moveup_button = this._createMoveUpButton(u, h)), this.hide_move_buttons || (this.rows[u].movedown_button = this._createMoveDownButton(u, h)), e !== void 0 && this.rows[u].setValue(e, t), this.refreshTabs(), this.rows[u];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, u = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return u.classList.add("delete", "json-editor-btntype-delete"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue().filter(function($, G) {
              return G !== b;
            }), S = null, I = i.rows[b].getValue();
            i.setValue(k), i.rows[b] ? S = i.rows[b].tab : i.rows[b - 1] && (S = i.rows[b - 1].tab), S && (i.active_tab = S, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", I);
          }), t && t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), h = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            var k = i.getValue();
            b.preventDefault(), b.stopPropagation();
            var S = 1 * b.currentTarget.getAttribute("data-i");
            k.forEach(function(I, $) {
              if ($ === S) {
                var G = qe(I) === "object" && I !== null ? function(we) {
                  for (var Ie = 1; Ie < arguments.length; Ie++) {
                    var Fe = arguments[Ie] != null ? arguments[Ie] : {};
                    Ie % 2 ? He(Object(Fe), !0).forEach(function(Me) {
                      Te(we, Me, Fe[Me]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(we, Object.getOwnPropertyDescriptors(Fe)) : He(Object(Fe)).forEach(function(Me) {
                      Object.defineProperty(we, Me, Object.getOwnPropertyDescriptor(Fe, Me));
                    });
                  }
                  return we;
                }({}, I) : I;
                if (h.items.type === "string" && h.items.format === "uuid") G = L();
                else if (h.items.type === "object" && h.items.properties) for (var ee = 0, pe = Object.keys(G); ee < pe.length; ee++) {
                  var _e = pe[ee];
                  h.items.properties && h.items.properties[_e] && h.items.properties[_e].format === "uuid" && (G[_e] = L());
                }
                k.push(G);
              }
            }), i.setValue(k), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[S - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i");
            if (!(b <= 0)) {
              var k = i.getValue(), S = k[b - 1];
              k[b - 1] = k[b], k[b] = S, i.setValue(k), i.active_tab = i.rows[b - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            if (!(b >= k.length - 1)) {
              var S = k[b + 1];
              k[b + 1] = k[b], k[b] = S, i.setValue(k), i.active_tab = i.rows[b + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          le(e, function(u, h) {
            var b = i.getValue(), k = b[u];
            b.splice(u, 1), b.splice(h, 0, k), i.setValue(b), i.active_tab = i.rows[h].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[h]);
          }, { useTrigger: t });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
        } }, { key: "_createToggleButton", value: function() {
          var e = this, t = this.getButton("", "collapse", "button_collapse");
          t.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(t, this.title.childNodes[0]);
          var i = this.row_holder.style.display, u = this.controls.style.display;
          return t.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation(), e.panel && e.setButtonState(e.panel, e.collapsed), e.tabs_holder && e.setButtonState(e.tabs_holder, e.collapsed), e.collapsed ? (e.collapsed = !1, e.row_holder.style.display = i, e.controls.style.display = u, e.setButtonText(h.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.row_holder.style.display = "none", e.controls.style.display = "none", e.setButtonText(h.currentTarget, "", "expand", "button_expand"));
          }), t;
        } }, { key: "_createAddRowButton", value: function() {
          var e = this, t = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-add"), t.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var u, h = e.rows.length;
            e.row_cache[h] ? (u = e.rows[h] = e.row_cache[h], e.rows[h].setValue(e.rows[h].getDefault(), !0), typeof e.rows[h].deactivateNonRequiredProperties == "function" && e.rows[h].deactivateNonRequiredProperties(!0), e.rows[h].container.style.display = "", e.rows[h].tab && (e.rows[h].tab.style.display = ""), e.rows[h].register()) : u = e.addRow(), e.active_tab = e.rows[h].tab, e.refreshTabs(), e.refreshValue(), e.onChange(!0), e.jsoneditor.trigger("addRow", u);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue(), h = null, b = u.pop();
            e.setValue(u), e.rows[e.rows.length - 1] && (h = e.rows[e.rows.length - 1].tab), h && (e.active_tab = h, e.refreshTabs()), e.onChange(!0), e.jsoneditor.trigger("deleteRow", b);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue();
            e.empty(!0), e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", u);
          }), this.controls.appendChild(t), t;
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], u = [];
          e.forEach(function(h) {
            h.path === t.path ? i.push(h) : u.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            t.error_holder.appendChild(t.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.rows.forEach(function(h) {
            return h.showValidationErrors(u);
          });
        } }], a && T(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function le(o, r) {
        (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).useTrigger ? o.addEventListener("mousedown", function(n) {
          if (n.ctrlKey) {
            o.draggable = !0;
            var a = function e(t) {
              o.draggable = !1, document.removeEventListener("dragend", e), document.removeEventListener("mouseup", e);
            };
            document.addEventListener("dragend", a), document.addEventListener("mouseup", a);
          }
        }) : o.draggable = !0, o.addEventListener("dragstart", function(n) {
          window.curDrag = o;
        }), o.addEventListener("dragover", function(n) {
          window.curDrag === null || window.curDrag === o || window.curDrag.parentElement !== o.parentElement ? n.dataTransfer.dropEffect = "none" : n.dataTransfer.dropEffect = "move", n.preventDefault();
        }), o.addEventListener("drop", function(n) {
          if (n.preventDefault(), n.stopPropagation(), window.curDrag !== null && window.curDrag !== o && window.curDrag.parentElement === o.parentElement) {
            var a = function(i) {
              for (var u = 0, h = i.parentElement.firstElementChild; h !== i && h !== null; ) h = h.nextSibling, ++u;
              return u;
            }, e = a(window.curDrag), t = a(o);
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
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, be(a.key), a);
        }
      }
      function be(o) {
        var r = function(n, a) {
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
        return r = ce(r), function(a, e) {
          if (e && (ie(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, te() ? Reflect.construct(r, n || [], ce(o).constructor) : r.apply(o, n));
      }
      function te() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (te = function() {
          return !!o;
        })();
      }
      function ae() {
        return ae = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ce(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ae.apply(this, arguments);
      }
      function ce(o) {
        return ce = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ce(o);
      }
      function Oe(o, r) {
        return Oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Oe(o, r);
      }
      de.rules = { ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-array-control-btn": "width:100%25;text-align:left;margin-bottom:3px" };
      var Ae = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ce(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Oe(e, t);
        }(r, o), n = r, (a = [{ key: "onInputChange", value: function() {
          this.value = this.input.value, this.onChange(!0);
        } }, { key: "register", value: function() {
          ae(ce(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          ae(ce(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          var e = this, t = this.getTitle().length;
          return Object.keys(this.select_values).forEach(function(i) {
            return t = Math.max(t, "".concat(e.select_values[i]).length + 4);
          }), Math.min(12, Math.max(t / 7, 2));
        } }, { key: "preBuild", value: function() {
          var e;
          ae(ce(r.prototype), "preBuild", this).call(this), this.select_options = {}, this.select_values = {}, this.option_titles = [], this.option_keys = [], this.option_enum = [];
          var t = this.jsoneditor.expandRefs(this.schema.items || {}), i = t.enum || [], u = t.options && t.options.enum || [], h = t.options && t.options.enum_titles || [];
          for (e = 0; e < i.length; e++) if (this.sanitize(i[e]) === i[e]) {
            var b = u[e] || {};
            "title" in b || (b.title = "".concat(h[e] || i[e])), this.option_keys.push("".concat(i[e])), this.option_enum.push(b), this.select_values["".concat(i[e])] = i[e];
          }
        } }, { key: "build", value: function() {
          var e, t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || this.schema.format === "checkbox") {
            for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, e = 0; e < this.option_keys.length; e++) {
              var i = this.formname + e.toString();
              this.inputs[this.option_keys[e]] = this.theme.getCheckbox(), this.inputs[this.option_keys[e]].id = i, this.select_options[this.option_keys[e]] = this.inputs[this.option_keys[e]];
              var u = this.theme.getCheckboxLabel(this.option_enum[e].title);
              if (u.htmlFor = i, this.option_enum[e].infoText) {
                var h = this.theme.getInfoButton(this.translateProperty(this.option_enum[e].infoText));
                u.appendChild(h);
              }
              this.controls["_" + this.option_keys[e]] = this.theme.getFormControl(u, this.inputs[this.option_keys[e]]);
            }
            this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description, this.infoButton), this.inputs.controlgroup = this.inputs.controls = this.control;
          } else {
            for (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys, !0), this.theme.setSelectOptions(this.input, this.option_keys, this.option_enum.map(function(b) {
              return b.title;
            })), this.input.setAttribute("multiple", "multiple"), this.input.size = Math.min(10, this.option_keys.length), e = 0; e < this.option_keys.length; e++) this.select_options[this.option_keys[e]] = this.input.children[e];
            this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname);
          }
          (this.schema.readOnly || this.schema.readonly) && this.disable(!0), this.container.appendChild(this.control), this.multiselectChangeHandler = function(b) {
            var k = [];
            for (e = 0; e < t.option_keys.length; e++) t.select_options[t.option_keys[e]] && (t.select_options[t.option_keys[e]].selected || t.select_options[t.option_keys[e]].checked) && k.push(t.select_values[t.option_keys[e]]);
            t.updateValue(k), t.onChange(!0);
          }, this.control.addEventListener("change", this.multiselectChangeHandler, !1), window.requestAnimationFrame(function() {
            t.afterInputReady();
          });
        } }, { key: "postBuild", value: function() {
          ae(ce(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input || this.inputs);
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          e = (e = this.applyConstFilter(e)) || [], Array.isArray(e) || (e = [e]), e = e.map(function(u) {
            return "".concat(u);
          }), Object.keys(this.select_options).forEach(function(u) {
            i.select_options[u][i.input_type === "select" ? "selected" : "checked"] = e.includes(u);
          }), this.updateValue(e), this.onChange(!0);
        } }, { key: "removeValue", value: function(e) {
          e = [].concat(e), this.setValue(this.getValue().filter(function(t) {
            return !e.includes(t);
          }));
        } }, { key: "addValue", value: function(e) {
          this.setValue(this.getValue().concat(e));
        } }, { key: "updateValue", value: function(e) {
          for (var t = !1, i = [], u = 0; u < e.length; u++) if (this.select_options["".concat(e[u])]) {
            var h = this.sanitize(this.select_values[e[u]]);
            i.push(h), h !== e[u] && (t = !0);
          } else t = !0;
          return this.value = i, t;
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.schema.items.type === "boolean" ? !!e : this.schema.items.type === "number" ? 1 * e || 0 : this.schema.items.type === "integer" ? Math.floor(1 * e || 0) : "".concat(e);
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.input ? this.input.disabled = !1 : this.inputs && Object.keys(this.inputs).forEach(function(t) {
            return e.inputs[t].disabled = !1;
          }), ae(ce(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.input ? this.input.disabled = !0 : this.inputs && Object.keys(this.inputs).forEach(function(i) {
            return t.inputs[i].disabled = !0;
          }), ae(ce(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          ae(ce(r.prototype), "destroy", this).call(this);
        } }, { key: "escapeRegExp", value: function(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } }, { key: "showValidationErrors", value: function(e) {
          var t = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = e.reduce(function(u, h) {
            return h.path.match(t) && u.push(h.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && je(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Ve(o) {
        return Ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ve(o);
      }
      function rt(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ct(a.key), a);
        }
      }
      function ct(o) {
        var r = function(n, a) {
          if (Ve(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ve(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ve(r) == "symbol" ? r : r + "";
      }
      function ft(o, r, n) {
        return r = Ze(r), function(a, e) {
          if (e && (Ve(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
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
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ze(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Je.apply(this, arguments);
      }
      function Ze(o) {
        return Ze = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ze(o);
      }
      function mr(o, r) {
        return mr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, mr(o, r);
      }
      var en = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ft(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mr(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          this.choices_instance ? (e = this.applyConstFilter(e), e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : Je(Ze(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.Choices && !this.choices_instance) {
            var t = this.expandCallbacks("choices", v({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
            this.newEnumAllowed = !1, this.choices_instance = new window.Choices(this.input, t), this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              var u = e.choices_instance.getValue(!0);
              e.updateValue(u), e.onChange(!0);
            }, this.control.addEventListener("change", this.multiselectChangeHandler, !1);
          }
          Je(Ze(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var h = this.sanitize(this.select_values[e[u]]);
              i.push(h), h !== e[u] && (t = !0);
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
        } }]) && rt(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
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
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, We(a.key), a);
        }
      }
      function We(o) {
        var r = function(n, a) {
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
        return r = Lt(r), function(a, e) {
          if (e && (Be(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ht() ? Reflect.construct(r, n || [], Lt(o).constructor) : r.apply(o, n));
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
      function Yt() {
        return Yt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Lt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Yt.apply(this, arguments);
      }
      function Lt(o) {
        return Lt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Lt(o);
      }
      function Ho(o, r) {
        return Ho = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ho(o, r);
      }
      var qc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ho(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.select2_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : Yt(Lt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (e = this.expandCallbacks("select2", v({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = e.tags = !!e.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
            var i = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
            t.updateValue(i), t.onChange(!0);
          }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), Yt(Lt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var h = this.sanitize(this.select_values[e[u]]);
              i.push(h), h !== e[u] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.schema.items.enum.push(e);
          var t = this.input.querySelector('option[value="'.concat(e, '"]'));
          return t ? t.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(e, e, !1, !1)).trigger("change"), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), Yt(Lt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), Yt(Lt(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), Yt(Lt(r.prototype), "destroy", this).call(this);
        } }]) && Ge(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ae);
      function Ln(o) {
        return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ln(o);
      }
      function Uc(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, $c(a.key), a);
        }
      }
      function $c(o) {
        var r = function(n, a) {
          if (Ln(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ln(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ln(r) == "symbol" ? r : r + "";
      }
      function Gc(o, r, n) {
        return r = Qt(r), function(a, e) {
          if (e && (Ln(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Va() ? Reflect.construct(r, n || [], Qt(o).constructor) : r.apply(o, n));
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
      function tn() {
        return tn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Qt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, tn.apply(this, arguments);
      }
      function Qt(o) {
        return Qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Qt(o);
      }
      function Vo(o, r) {
        return Vo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Vo(o, r);
      }
      var Wc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gc(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vo(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.selectize_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.selectize_instance.setValue(this.value), this.onChange(!0)) : tn(Qt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            e = this.expandCallbacks("selectize", v({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = e.create = !!e.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(b) {
              var k = t.selectize_instance.getValue();
              t.updateValue(k), t.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
            var i = this.theme.getHiddenLabel(this.formname);
            this.input.setAttribute("id", this.formname + "-hidden-input"), i.setAttribute("for", this.formname + "-hidden-input"), this.input.parentNode.insertBefore(i, this.input);
            var u = this.selectize_instance.$control[0];
            if (u) {
              var h = this.theme.getHiddenLabel(this.formname);
              h.setAttribute("for", this.formname + "-selectized"), u.appendChild(h);
            }
          }
          tn(Qt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var h = this.sanitize(this.select_values[e[u]]);
              i.push(h), h !== e[u] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          return this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.selectize_instance.addOption({ text: e, value: e }), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), tn(Qt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), tn(Qt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), tn(Qt(r.prototype), "destroy", this).call(this);
        } }]) && Uc(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ae);
      function An(o) {
        return An = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, An(o);
      }
      function Jc(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Kc(a.key), a);
        }
      }
      function Kc(o) {
        var r = function(n, a) {
          if (An(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (An(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return An(r) == "symbol" ? r : r + "";
      }
      function Zc(o, r, n) {
        return r = Ar(r), function(a, e) {
          if (e && (An(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, za() ? Reflect.construct(r, n || [], Ar(o).constructor) : r.apply(o, n));
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
      function ki() {
        return ki = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ar(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ki.apply(this, arguments);
      }
      function Ar(o) {
        return Ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ar(o);
      }
      function zo(o, r) {
        return zo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, zo(o, r);
      }
      var Yc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zc(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zo(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), ki(Ar(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Autocomplete && !this.autocomplete_instance && (e = this.expandCallbacks("autocomplete", v({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            t.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(e.baseClass), this.autocomplete_dropdown.classList.add("".concat(e.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, e)), ki(Ar(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), ki(Ar(r.prototype), "destroy", this).call(this);
        } }]) && Jc(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Rn(o) {
        return Rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Rn(o);
      }
      function Qc(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Xc(a.key), a);
        }
      }
      function Xc(o) {
        var r = function(n, a) {
          if (Rn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Rn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Rn(r) == "symbol" ? r : r + "";
      }
      function eh(o, r, n) {
        return r = Rr(r), function(a, e) {
          if (e && (Rn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, qa() ? Reflect.construct(r, n || [], Rr(o).constructor) : r.apply(o, n));
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
      function xi() {
        return xi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Rr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, xi.apply(this, arguments);
      }
      function Rr(o) {
        return Rr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Rr(o);
      }
      function qo(o, r) {
        return qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, qo(o, r);
      }
      var th = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), eh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qo(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "setFileReaderListener", value: function(e) {
          var t = this;
          e.addEventListener("load", function(i) {
            if (t.count === t.current_item_index) t.value[t.count][t.key] = i.target.result;
            else {
              var u = {};
              for (var h in t.parent.schema.properties) u[h] = "";
              u[t.key] = i.target.result, t.value.splice(t.count, 0, u);
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
                for (var u = 0; u < e.total; u++) {
                  var h = new FileReader();
                  e.setFileReaderListener(h), h.readAsDataURL(i.currentTarget.files[u]);
                }
              } else {
                var b = new FileReader();
                b.onload = function(k) {
                  e.value = k.target.result, e.refreshPreview(), e.onChange(!0), b = null;
                }, b.readAsDataURL(i.currentTarget.files[0]);
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
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), xi(Rr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), xi(Rr(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(e) ? this.value = this.schema.enum[0] : this.value = e, this.input.value = this.value, this.refreshPreview(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), xi(Rr(r.prototype), "destroy", this).call(this);
        } }]) && Qc(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function In(o) {
        return In = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, In(o);
      }
      function rh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, nh(a.key), a);
        }
      }
      function nh(o) {
        var r = function(n, a) {
          if (In(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (In(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return In(r) == "symbol" ? r : r + "";
      }
      function ih(o, r, n) {
        return r = Ir(r), function(a, e) {
          if (e && (In(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ua() ? Reflect.construct(r, n || [], Ir(o).constructor) : r.apply(o, n));
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
      function Oi() {
        return Oi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ir(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Oi.apply(this, arguments);
      }
      function Ir(o) {
        return Ir = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ir(o);
      }
      function Uo(o, r) {
        return Uo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Uo(o, r);
      }
      var $a = function(o) {
        function r(e, t) {
          var i;
          return function(u, h) {
            if (!(u instanceof h)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = ih(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Uo(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", v({}, { icon: "", validated: !1, align: "left", action: function(u, h) {
            window.alert('No button action defined for "'.concat(u.path, '"'));
          } }, this.defaults.options.button || {}, this.options.button || {})), i = this.translateProperty(t.text || this.schema.title) || this.key;
          this.input = this.getButton(i, t.icon, i), typeof t.action != "function" ? window.alert('No button action defined for "'.concat(this.path, '"')) : this.input.addEventListener("click", t.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(t.align), this.control.appendChild(this.input), this.container.appendChild(this.control), this.changeHandler = function() {
            e.jsoneditor.validate(e.jsoneditor.getValue()).length > 0 ? e.disable() : e.enable();
          }, t.validated && this.jsoneditor.on("change", this.changeHandler);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Oi(Ir(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Oi(Ir(r.prototype), "disable", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "activate", value: function() {
          this.active = !1, this.enable();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.disable());
        } }, { key: "destroy", value: function() {
          this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, Oi(Ir(r.prototype), "destroy", this).call(this);
        } }]) && rh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Bn(o) {
        return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Bn(o);
      }
      function oh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, sh(a.key), a);
        }
      }
      function sh(o) {
        var r = function(n, a) {
          if (Bn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Bn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Bn(r) == "symbol" ? r : r + "";
      }
      function ah(o, r, n) {
        return r = Bt(r), function(a, e) {
          if (e && (Bn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ga() ? Reflect.construct(r, n || [], Bt(o).constructor) : r.apply(o, n));
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
      function Br() {
        return Br = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Bt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Br.apply(this, arguments);
      }
      function Bt(o) {
        return Bt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Bt(o);
      }
      function $o(o, r) {
        return $o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, $o(o, r);
      }
      var lh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && $o(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = !!(e = this.applyConstFilter(e));
          var i = this.getValue() !== e;
          this.value = e, this.input.checked = this.value, t || (this.is_dirty = !0), this.onChange(i);
        } }, { key: "register", value: function() {
          Br(Bt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Br(Bt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          return Math.min(12, Math.max(this.getTitle().length / 7, 2));
        } }, { key: "setOptInCheckbox", value: function() {
          Br(Bt(r.prototype), "setOptInCheckbox", this).call(this), this.optInAppended && (this.container.insertBefore(this.optInContainer, this.container.firstChild), this.optInContainer.style.verticalAlign = "top", this.control.style.marginTop = "0");
        } }, { key: "build", value: function() {
          var e = this;
          this.parent.options.table_row || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.label.htmlFor = this.formname), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.input.id = this.formname, this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.control.style.display = "inline-block", (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.input.addEventListener("change", function(t) {
            t.preventDefault(), t.stopPropagation(), e.value = t.currentTarget.checked, e.is_dirty = !0, e.onChange(!0);
          }), this.container.appendChild(this.control);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Br(Bt(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Br(Bt(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Br(Bt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var h = e.reduce(function(b, k) {
              return k.path === t.path && b.push(k.message), b;
            }, []);
            this.input.controlgroup = this.control, h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && oh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Nn(o) {
        return Nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Nn(o);
      }
      function uh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ch(a.key), a);
        }
      }
      function ch(o) {
        var r = function(n, a) {
          if (Nn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Nn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Nn(r) == "symbol" ? r : r + "";
      }
      function hh(o, r, n) {
        return r = Nt(r), function(a, e) {
          if (e && (Nn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Wa() ? Reflect.construct(r, n || [], Nt(o).constructor) : r.apply(o, n));
      }
      function Wa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Wa = function() {
          return !!o;
        })();
      }
      function Nr() {
        return Nr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Nt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Nr.apply(this, arguments);
      }
      function Nt(o) {
        return Nt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Nt(o);
      }
      function Go(o, r) {
        return Go = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Go(o, r);
      }
      g(6910);
      var Ci = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Go(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), u = this.enum_options.length > 0 && this.enum_values.includes(i), h = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || u && (!t || this.isRequired() || h) || (i = this.enum_values[0]), this.value !== i) {
            var b = this.enum_values.indexOf(i);
            u && b !== -1 ? this.input.value = this.enum_options[b] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, t || (this.is_dirty = !0), this.onChange(), this.change();
          }
        } }, { key: "register", value: function() {
          Nr(Nt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Nr(Nt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          if (!this.enum_options) return 3;
          for (var e = this.getTitle().length, t = 0; t < this.enum_options.length; t++) e = Math.max(e, this.enum_options[t].length + 4);
          return Math.min(12, Math.max(e / 7, 2));
        } }, { key: "typecast", value: function(e) {
          return this.schema.type === "boolean" ? e === "undefined" || e === void 0 ? void 0 : !!e : this.schema.type === "number" ? 1 * e || 0 : this.schema.type === "integer" ? Math.floor(1 * e || 0) : this.schema.enum && e === void 0 ? void 0 : "".concat(e);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.typecast(this.value);
        } }, { key: "preBuild", value: function() {
          var e, t, i, u, h = this;
          if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.hasPlaceholderOption = ((e = this.schema) === null || e === void 0 || (e = e.options) === null || e === void 0 ? void 0 : e.has_placeholder_option) || !1, this.placeholderOptionText = ((t = this.schema) === null || t === void 0 || (t = t.options) === null || t === void 0 ? void 0 : t.placeholder_option_text) || " ", this.enforceConst && this.schema.const) {
            var b = this.schema.const;
            this.enum_options = ["".concat(b)], this.enum_display = ["".concat(this.translateProperty(b) || b)], this.enum_values = [this.typecast(b)];
          } else if (this.schema.enum) {
            var k = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(S, I) {
              h.enum_options[I] = "".concat(S), h.enum_display[I] = "".concat(h.translateProperty(k[I]) || S), h.enum_values[I] = h.typecast(S);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = v({}, this.schema.enumSource[i]);
            else this.schema.enumValue ? this.enumSource = [{ source: this.schema.enumSource, value: this.schema.enumValue }] : this.enumSource = [{ source: this.schema.enumSource }];
            for (i = 0; i < this.enumSource.length; i++) this.enumSource[i].value && (typeof (u = this.expandCallbacks("template", { template: this.enumSource[i].value })).template == "function" ? this.enumSource[i].value = u.template : this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine)), this.enumSource[i].title && (typeof (u = this.expandCallbacks("template", { template: this.enumSource[i].title })).template == "function" ? this.enumSource[i].title = u.template : this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine)), this.enumSource[i].filter && this.enumSource[i].value && (typeof (u = this.expandCallbacks("template", { template: this.enumSource[i].filter })).template == "function" ? this.enumSource[i].filter = u.template : this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine));
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
          var e, t, i = [], u = [];
          if (this.enumSource) {
            e = this.getWatchedFieldValues();
            for (var h = 0; h < this.enumSource.length; h++) if (Array.isArray(this.enumSource[h])) i = i.concat(this.enumSource[h]), u = u.concat(this.enumSource[h]);
            else {
              var b = [];
              if (b = Array.isArray(this.enumSource[h].source) ? this.enumSource[h].source : e[this.enumSource[h].source]) {
                if (this.enumSource[h].slice && (b = Array.prototype.slice.apply(b, this.enumSource[h].slice)), this.enumSource[h].filter) {
                  var k = [];
                  for (t = 0; t < b.length; t++) this.enumSource[h].filter({ i: t, item: b[t], watched: e }) && k.push(b[t]);
                  b = k;
                }
                var S = [], I = [];
                for (t = 0; t < b.length; t++) {
                  var $ = b[t];
                  this.enumSource[h].value ? I[t] = this.typecast(this.enumSource[h].value({ i: t, item: $ })) : I[t] = b[t], this.enumSource[h].title ? S[t] = this.enumSource[h].title({ i: t, item: $ }) : S[t] = I[t];
                }
                this.enumSource[h].sort && (function(ee, pe, _e) {
                  ee.map(function(we, Ie) {
                    return { v: we, t: pe[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    ee[Ie] = we.v, pe[Ie] = we.t;
                  });
                }).bind(null, I, S, this.enumSource[h].sort === "desc" ? 1 : -1)(), i = i.concat(I), u = u.concat(S);
              }
            }
            var G = this.value;
            this.theme.setSelectOptions(this.input, i, u), this.enum_options = i, this.enum_display = u, this.enum_values = i, i.includes(G) || this.jsoneditor.options.enum_source_value_auto_select !== !1 ? (this.input.value = G, this.value = G) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path));
          }
          Nr(Nt(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Nr(Nt(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Nr(Nt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Nr(Nt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var h = e.reduce(function(b, k) {
              return k.path === t.path && b.push(k.message), b;
            }, []);
            h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && uh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Fn(o) {
        return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Fn(o);
      }
      function dh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ph(a.key), a);
        }
      }
      function ph(o) {
        var r = function(n, a) {
          if (Fn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Fn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Fn(r) == "symbol" ? r : r + "";
      }
      function fh(o, r, n) {
        return r = Ft(r), function(a, e) {
          if (e && (Fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ja() ? Reflect.construct(r, n || [], Ft(o).constructor) : r.apply(o, n));
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
      function Fr() {
        return Fr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ft(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Fr.apply(this, arguments);
      }
      function Ft(o) {
        return Ft = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ft(o);
      }
      function Wo(o, r) {
        return Wo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Wo(o, r);
      }
      var Ka = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), fh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Wo(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else Fr(Ft(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", v({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, e);
          }
          Fr(Ft(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          if (Fr(Ft(r.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var t = this.enum_options.map(function(i, u) {
              return { value: i, label: e.enum_display[u] };
            });
            this.choices_instance.setChoices(t, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Fr(Ft(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), Fr(Ft(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Fr(Ft(r.prototype), "destroy", this).call(this);
        } }]) && dh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ci);
      function rn(o) {
        return rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, rn(o);
      }
      function yh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, mh(a.key), a);
        }
      }
      function mh(o) {
        var r = function(n, a) {
          if (rn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (rn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return rn(r) == "symbol" ? r : r + "";
      }
      function bh(o, r, n) {
        return r = Dr(r), function(a, e) {
          if (e && (rn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Za() ? Reflect.construct(r, n || [], Dr(o).constructor) : r.apply(o, n));
      }
      function Za() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Za = function() {
          return !!o;
        })();
      }
      function Ei() {
        return Ei = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Dr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ei.apply(this, arguments);
      }
      function Dr(o) {
        return Dr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Dr(o);
      }
      function Jo(o, r) {
        return Jo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Jo(o, r);
      }
      Ka.rules = { ".choices > *": "box-sizing:border-box" };
      var vh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), bh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jo(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (Ei(Dr(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && rn(this.options.flatpickr) === "object")) {
            this.options.flatpickr.enableTime = this.schema.format !== "date", this.options.flatpickr.noCalendar = this.schema.format === "time", this.schema.type === "integer" && (this.options.flatpickr.mode = "single"), this.input.setAttribute("data-input", "");
            var e = this.input;
            if (this.options.flatpickr.wrap === !0) {
              var t = [];
              if (this.options.flatpickr.showToggleButton !== !1) {
                var i = this.getButton("", this.schema.format === "time" ? "time" : "calendar", "flatpickr_toggle_button");
                i.setAttribute("data-toggle", ""), t.push(i);
              }
              if (this.options.flatpickr.showClearButton !== !1) {
                var u = this.getButton("", "clear", "flatpickr_clear_button");
                u.setAttribute("data-clear", ""), t.push(u);
              }
              var h = this.input.parentNode, b = this.input.nextSibling, k = this.theme.getInputGroup(this.input, t);
              k !== void 0 ? (this.options.flatpickr.inline = !1, h.insertBefore(k, b), e = k) : this.options.flatpickr.wrap = !1;
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
          if (e = this.applyConstFilter(e), this.schema.type === "string") Ei(Dr(r.prototype), "setValue", this).call(this, e, t, i), this.flatpickr && this.flatpickr.setDate(e);
          else if (e > 0) {
            var u = new Date(1e3 * e), h = u.getFullYear(), b = this.zeroPad(u.getMonth() + 1), k = this.zeroPad(u.getDate()), S = this.zeroPad(u.getHours()), I = this.zeroPad(u.getMinutes()), $ = this.zeroPad(u.getSeconds()), G = [h, b, k].join("-"), ee = [S, I, $].join(":"), pe = "".concat(G, "T").concat(ee);
            this.schema.format === "date" ? pe = G : this.schema.format === "time" && (pe = ee), this.input.value = pe, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(pe);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Ei(Dr(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && yh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Dn(o) {
        return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Dn(o);
      }
      function gh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, _h(a.key), a);
        }
      }
      function _h(o) {
        var r = function(n, a) {
          if (Dn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Dn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Dn(r) == "symbol" ? r : r + "";
      }
      function wh(o, r, n) {
        return r = Dt(r), function(a, e) {
          if (e && (Dn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ya() ? Reflect.construct(r, n || [], Dt(o).constructor) : r.apply(o, n));
      }
      function Ya() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ya = function() {
          return !!o;
        })();
      }
      function Mr() {
        return Mr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Dt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Mr.apply(this, arguments);
      }
      function Dt(o) {
        return Dt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Dt(o);
      }
      function Ko(o, r) {
        return Ko = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ko(o, r);
      }
      var jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ko(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.currentEditor] && this.editors[this.currentEditor].register();
          }
          Mr(Dt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Mr(Dt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
          Mr(Dt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable();
          Mr(Dt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function() {
          var e = this, t = this.getWatchedFieldValues();
          if (t) {
            var i = document.location.origin + document.location.pathname + this.template(t);
            this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), this.editors.forEach(function(u, h) {
              u && (e.currentEditor === h ? u.container.style.display = "" : u.container.style.display = "none");
            }), this.refreshValue(), this.onChange(!0);
          }
        } }, { key: "buildChildEditor", value: function(e) {
          this.refs[e] = this.editors.length;
          var t = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(t);
          var i = v({}, this.schema, this.jsoneditor.refs[e]), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
          this.editors.push(h), h.preBuild(), h.build(), h.postBuild();
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
          this.editors[this.currentEditor] && this.refreshValue(), Mr(Dt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "refreshValue", value: function() {
          this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue());
        } }, { key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(e, t), this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), Mr(Dt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          this.editors.forEach(function(t) {
            t && t.showValidationErrors(e);
          });
        } }]) && gh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function nn(o) {
        return nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, nn(o);
      }
      function Qa(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function kh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, xh(a.key), a);
        }
      }
      function xh(o) {
        var r = function(n, a) {
          if (nn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (nn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return nn(r) == "symbol" ? r : r + "";
      }
      function Oh(o, r, n) {
        return r = Hr(r), function(a, e) {
          if (e && (nn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Xa() ? Reflect.construct(r, n || [], Hr(o).constructor) : r.apply(o, n));
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
      function Si() {
        return Si = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Hr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Si.apply(this, arguments);
      }
      function Hr(o) {
        return Hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Hr(o);
      }
      function Zo(o, r) {
        return Zo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Zo(o, r);
      }
      var Ch = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Oh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zo(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
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
            this.enum.forEach(function(i, u) {
              if (t === JSON.stringify(i)) return e.selected = u, !1;
            }), this.selected < 0 ? this.setValue(this.enum[0]) : (this.switcher.value = this.select_options[this.selected], this.display_area.innerHTML = this.html_values[this.selected]);
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.switcher.disabled = !1, Si(Hr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.switcher.disabled = !0, Si(Hr(r.prototype), "disable", this).call(this);
        } }, { key: "getHTML", value: function(e) {
          var t, i, u = this;
          if (e === null) return "<em>null</em>";
          if (nn(e) === "object") {
            var h = "";
            return t = e, i = function(b, k) {
              var S = u.getHTML(k);
              Array.isArray(e) || (S = "<div><em>".concat(b, "</em>: ").concat(S, "</div>")), h += "<li>".concat(S, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(b, k) {
              return i(k, b);
            }) : Object.entries(t).forEach(function(b) {
              var k, S, I = (S = 2, function(ee) {
                if (Array.isArray(ee)) return ee;
              }(k = b) || function(ee, pe) {
                var _e = ee == null ? null : typeof Symbol < "u" && ee[Symbol.iterator] || ee["@@iterator"];
                if (_e != null) {
                  var we, Ie, Fe, Me, ve = [], xe = !0, Ke = !1;
                  try {
                    if (Fe = (_e = _e.call(ee)).next, pe === 0) {
                      if (Object(_e) !== _e) return;
                      xe = !1;
                    } else for (; !(xe = (we = Fe.call(_e)).done) && (ve.push(we.value), ve.length !== pe); xe = !0) ;
                  } catch (nt) {
                    Ke = !0, Ie = nt;
                  } finally {
                    try {
                      if (!xe && _e.return != null && (Me = _e.return(), Object(Me) !== Me)) return;
                    } finally {
                      if (Ke) throw Ie;
                    }
                  }
                  return ve;
                }
              }(k, S) || function(ee, pe) {
                if (ee) {
                  if (typeof ee == "string") return Qa(ee, pe);
                  var _e = Object.prototype.toString.call(ee).slice(8, -1);
                  return _e === "Object" && ee.constructor && (_e = ee.constructor.name), _e === "Map" || _e === "Set" ? Array.from(ee) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? Qa(ee, pe) : void 0;
                }
              }(k, S) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), $ = I[0], G = I[1];
              return i($, G);
            }), h = Array.isArray(e) ? "<ol>".concat(h, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(h, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Si(Hr(r.prototype), "destroy", this).call(this);
        } }]) && kh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function on(o) {
        return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, on(o);
      }
      function Eh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Sh(a.key), a);
        }
      }
      function Sh(o) {
        var r = function(n, a) {
          if (on(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (on(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return on(r) == "symbol" ? r : r + "";
      }
      function Ph(o, r, n) {
        return r = Mt(r), function(a, e) {
          if (e && (on(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, el() ? Reflect.construct(r, n || [], Mt(o).constructor) : r.apply(o, n));
      }
      function el() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (el = function() {
          return !!o;
        })();
      }
      function Vr() {
        return Vr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Mt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Vr.apply(this, arguments);
      }
      function Mt(o) {
        return Mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Mt(o);
      }
      function Yo(o, r) {
        return Yo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Yo(o, r);
      }
      var Th = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ph(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yo(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          Vr(Mt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Vr(Mt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), (!this.template || i) && (e == null ? e = "" : on(e) === "object" ? e = JSON.stringify(e) : typeof e != "string" && (e = "".concat(e)), e !== this.serialized)) {
            var u = this.sanitize(e);
            if (this.input.value !== u) {
              this.input.value = u;
              var h = i || this.getValue() !== e;
              this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(h);
            }
          }
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "enable", value: function() {
          Vr(Mt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Vr(Mt(r.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Vr(Mt(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), Vr(Mt(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var e = this.expandCallbacks("template", { template: this.schema.template });
            typeof e.template == "function" ? this.template = e.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && Eh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Mn(o) {
        return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Mn(o);
      }
      function Lh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ah(a.key), a);
        }
      }
      function Ah(o) {
        var r = function(n, a) {
          if (Mn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Mn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Mn(r) == "symbol" ? r : r + "";
      }
      function Rh(o, r, n) {
        return r = eo(r), function(a, e) {
          if (e && (Mn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, tl() ? Reflect.construct(r, n || [], eo(o).constructor) : r.apply(o, n));
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
      function eo(o) {
        return eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, eo(o);
      }
      function Qo(o, r) {
        return Qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Qo(o, r);
      }
      var Ih = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qo(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          this.options.compact = !1, this.header = this.label = this.theme.getLabelLike(this.getTitle()), this.description = this.theme.getDescription(this.schema.description || ""), this.control = this.theme.getFormControl(this.label, this.description, null), this.container.appendChild(this.control);
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getNumColumns", value: function() {
          return 12;
        } }, { key: "disable", value: function() {
          return !1;
        } }, { key: "enable", value: function() {
          return !1;
        } }]) && Lh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }($a);
      function Hn(o) {
        return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hn(o);
      }
      function Bh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Nh(a.key), a);
        }
      }
      function Nh(o) {
        var r = function(n, a) {
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
      function Fh(o, r, n) {
        return r = Vn(r), function(a, e) {
          if (e && (Hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, rl() ? Reflect.construct(r, n || [], Vn(o).constructor) : r.apply(o, n));
      }
      function rl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (rl = function() {
          return !!o;
        })();
      }
      function Xo() {
        return Xo = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Xo.apply(this, arguments);
      }
      function Vn(o) {
        return Vn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vn(o);
      }
      function es(o, r) {
        return es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, es(o, r);
      }
      var nl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && es(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (Xo(Vn(r.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
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
        } }]) && Bh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function zn(o) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(o);
      }
      function Dh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Mh(a.key), a);
        }
      }
      function Mh(o) {
        var r = function(n, a) {
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
      function Hh(o, r, n) {
        return r = to(r), function(a, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, il() ? Reflect.construct(r, n || [], to(o).constructor) : r.apply(o, n));
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
      function to(o) {
        return to = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, to(o);
      }
      function ts(o, r) {
        return ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ts(o, r);
      }
      var ol = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Hh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ts(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(P), i = parseInt(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && Dh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(nl);
      function qn(o) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(o);
      }
      function Vh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, zh(a.key), a);
        }
      }
      function zh(o) {
        var r = function(n, a) {
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
      function qh(o, r, n) {
        return r = Un(r), function(a, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, sl() ? Reflect.construct(r, n || [], Un(o).constructor) : r.apply(o, n));
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
      function rs() {
        return rs = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Un(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, rs.apply(this, arguments);
      }
      function Un(o) {
        return Un = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Un(o);
      }
      function ns(o, r) {
        return ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ns(o, r);
      }
      var Uh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ns(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          if (rs(Un(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = v(this.options, this.schema.options || {});
        } }]) && Vh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function $n(o) {
        return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $n(o);
      }
      function $h(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Gh(a.key), a);
        }
      }
      function Gh(o) {
        var r = function(n, a) {
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
      function Wh(o, r, n) {
        return r = Ht(r), function(a, e) {
          if (e && ($n(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, al() ? Reflect.construct(r, n || [], Ht(o).constructor) : r.apply(o, n));
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
      function zr() {
        return zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ht(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, zr.apply(this, arguments);
      }
      function Ht(o) {
        return Ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ht(o);
      }
      function is(o, r) {
        return is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, is(o, r);
      }
      var Jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && is(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = zr(Ht(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.jodit_instance && this.jodit_instance.setEditorValue(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", zr(Ht(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", v({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            t.value = t.jodit_instance.getEditorValue(), t.is_dirty = !0, t.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : zr(Ht(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), zr(Ht(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), zr(Ht(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), zr(Ht(r.prototype), "destroy", this).call(this);
        } }]) && $h(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Kh(o, r, n, a) {
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
          return [{ path: n, property: "format", message: a(e.message) }];
        }
      }
      function ll(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function Zh(o, r, n) {
        return (r = ul(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Vt(o) {
        return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vt(o);
      }
      function Pi(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, h, b = [], k = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(k = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); k = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!k && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || os(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function lt(o) {
        return function(r) {
          if (Array.isArray(r)) return ss(r);
        }(o) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(o) || os(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function os(o, r) {
        if (o) {
          if (typeof o == "string") return ss(o, r);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set" ? Array.from(o) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ss(o, r) : void 0;
        }
      }
      function ss(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function Yh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ul(a.key), a);
        }
      }
      function ul(o) {
        var r = function(n, a) {
          if (Vt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Vt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Vt(r) == "symbol" ? r : r + "";
      }
      g(8431);
      var cl = function() {
        return o = function n(a, e, t, i) {
          (function(u, h) {
            if (!(u instanceof h)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = a, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(u, h, b) {
            var k = [];
            if (u.dependentRequired !== void 0) {
              var S = [];
              Object.keys(u.dependentRequired).forEach(function(I) {
                if (h[I] !== void 0) {
                  var $ = u.dependentRequired[I];
                  S = $.filter(function(G) {
                    return !x(h, G);
                  });
                }
              }), S.length > 0 && k.push({ message: "Must have the required properties: " + S.join(", "), path: b });
            }
            return k;
          }, dependentSchemas: function(u, h, b) {
            var k = this, S = [];
            return Object.keys(u.dependentSchemas).forEach(function(I) {
              if (h[I] !== void 0) {
                var $ = u.dependentSchemas[I], G = k._validateSchema($, h, b);
                S = [].concat(lt(S), lt(G));
              }
            }), S;
          }, contains: function(u, h, b) {
            var k = this, S = [], I = 0;
            h.forEach(function(G) {
              k._validateSchema(u.contains, G, b).length === 0 && I++;
            });
            var $ = I === 0;
            return u.minContains !== void 0 ? I < u.minContains && S.push({ message: this.translate("error_minContains", [I, u.minContains], u), path: b }) : $ && S.push({ message: this.translate("error_contains", null, u), path: b }), u.maxContains !== void 0 && I > u.maxContains && S.push({ message: this.translate("error_maxContains", [I, u.maxContains], u), path: b }), S;
          }, if: function(u, h, b) {
            if (u.then === void 0 && u.else === void 0) return [];
            var k = this._validateSchema(u.if, h, b), S = [], I = [];
            return u.then !== void 0 && (S = this._validateSchema(u.then, h, b)), u.else !== void 0 && (I = this._validateSchema(u.else, h, b)), u.if === !0 ? S : u.if === !1 ? I : k.length === 0 ? S : k.length > 0 ? I : [];
          }, const: function(u, h, b) {
            return JSON.stringify(u.const) === JSON.stringify(h) ? [] : [{ path: b, property: "const", message: this.translate("error_const", null, u) }];
          }, enum: function(u, h, b) {
            var k = JSON.stringify(h);
            return u.enum.some(function(S) {
              return k === JSON.stringify(S);
            }) ? [] : [{ path: b, property: "enum", message: this.translate("error_enum", null, u) }];
          }, extends: function(u, h, b) {
            var k = this;
            return u.extends.reduce(function(S, I) {
              return S.push.apply(S, lt(k._validateSchema(I, h, b))), S;
            }, []);
          }, allOf: function(u, h, b) {
            var k = this;
            return u.allOf.reduce(function(S, I) {
              return S.push.apply(S, lt(k._validateSchema(I, h, b))), S;
            }, []);
          }, anyOf: function(u, h, b) {
            var k = this;
            return u.anyOf.some(function(S) {
              return !k._validateSchema(S, h, b).length;
            }) ? [] : [{ path: b, property: "anyOf", message: this.translate("error_anyOf", null, u) }];
          }, oneOf: function(u, h, b) {
            var k = this, S = 0, I = [];
            u.oneOf.forEach(function(G, ee) {
              var pe = k._validateSchema(G, h, b);
              pe.length || S++, pe.forEach(function(_e) {
                _e.path = "".concat(b, ".oneOf[").concat(ee, "]").concat(_e.path.substr(b.length));
              }), I.push.apply(I, lt(pe));
            });
            var $ = [];
            return S !== 1 && ($.push({ path: b, property: "oneOf", message: this.translate("error_oneOf", [S], u) }), $.push.apply($, I)), $;
          }, not: function(u, h, b) {
            return this._validateSchema(u.not, h, b).length ? [] : [{ path: b, property: "not", message: this.translate("error_not", null, u) }];
          }, type: function(u, h, b) {
            var k = this;
            if (Array.isArray(u.type)) {
              if (!u.type.some(function(S) {
                return k._checkType(S, h);
              })) return [{ path: b, property: "type", message: this.translate("error_type_union", null, u) }];
            } else if (["date", "time", "datetime-local"].includes(u.format) && u.type === "integer") {
              if (!this._checkType("string", "".concat(h))) return [{ path: b, property: "type", message: this.translate("error_type", [u.format], u) }];
            } else if (!this._checkType(u.type, h)) return [{ path: b, property: "type", message: this.translate("error_type", [u.type], u) }];
            return [];
          }, disallow: function(u, h, b) {
            var k = this;
            if (Array.isArray(u.disallow)) {
              if (u.disallow.some(function(S) {
                return k._checkType(S, h);
              })) return [{ path: b, property: "disallow", message: this.translate("error_disallow_union", null, u) }];
            } else if (this._checkType(u.disallow, h)) return [{ path: b, property: "disallow", message: this.translate("error_disallow", [u.disallow], u) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(u, h, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, h, b);
          }, divisibleBy: function(u, h, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, h, b);
          }, maximum: function(u, h, b) {
            var k = u.exclusiveMaximum ? h < u.maximum : h <= u.maximum;
            return window.math ? k = window.math[u.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(h), window.math.bignumber(u.maximum)) : window.Decimal && (k = new window.Decimal(h)[u.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(u.maximum))), k ? [] : [{ path: b, property: "maximum", message: this.translate(u.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [u.maximum], u) }];
          }, minimum: function(u, h, b) {
            var k = u.exclusiveMinimum ? h > u.minimum : h >= u.minimum;
            return window.math ? k = window.math[u.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(h), window.math.bignumber(u.minimum)) : window.Decimal && (k = new window.Decimal(h)[u.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(u.minimum))), k ? [] : [{ path: b, property: "minimum", message: this.translate(u.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [u.minimum], u) }];
          } }, this._validateStringSubSchema = { maxLength: function(u, h, b) {
            var k = [];
            return "".concat(h).length > u.maxLength && k.push({ path: b, property: "maxLength", message: this.translate("error_maxLength", [u.maxLength], u) }), k;
          }, minLength: function(u, h, b) {
            return "".concat(h).length < u.minLength ? [{ path: b, property: "minLength", message: this.translate(u.minLength === 1 ? "error_notempty" : "error_minLength", [u.minLength], u) }] : [];
          }, pattern: function(u, h, b) {
            return new RegExp(u.pattern).test(h) ? [] : [{ path: b, property: "pattern", message: u.options && u.options.patternmessage ? u.options.patternmessage : this.translate("error_pattern", [u.pattern], u) }];
          } }, this._validateArraySubSchema = { items: function(u, h, b) {
            var k = this, S = [];
            if (Array.isArray(u.items)) for (var I = 0; I < h.length; I++) if (u.items[I]) S.push.apply(S, lt(this._validateSchema(u.items[I], h[I], "".concat(b, ".").concat(I))));
            else {
              if (u.additionalItems === !0) break;
              if (!u.additionalItems) {
                if (u.additionalItems === !1) {
                  S.push({ path: b, property: "additionalItems", message: this.translate("error_additionalItems", null, u) });
                  break;
                }
                break;
              }
              S.push.apply(S, lt(this._validateSchema(u.additionalItems, h[I], "".concat(b, ".").concat(I))));
            }
            else h.forEach(function($, G) {
              S.push.apply(S, lt(k._validateSchema(u.items, $, "".concat(b, ".").concat(G))));
            });
            return S;
          }, maxItems: function(u, h, b) {
            return h.length > u.maxItems ? [{ path: b, property: "maxItems", message: this.translate("error_maxItems", [u.maxItems], u) }] : [];
          }, minItems: function(u, h, b) {
            return h.length < u.minItems ? [{ path: b, property: "minItems", message: this.translate("error_minItems", [u.minItems], u) }] : [];
          }, uniqueItems: function(u, h, b) {
            for (var k = {}, S = 0; S < h.length; S++) {
              var I = JSON.stringify(h[S]);
              if (k[I]) return [{ path: b, property: "uniqueItems", message: this.translate("error_uniqueItems", null, u) }];
              k[I] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(u, h, b) {
            return Object.keys(h).length > u.maxProperties ? [{ path: b, property: "maxProperties", message: this.translate("error_maxProperties", [u.maxProperties], u) }] : [];
          }, minProperties: function(u, h, b) {
            return Object.keys(h).length < u.minProperties ? [{ path: b, property: "minProperties", message: this.translate("error_minProperties", [u.minProperties], u) }] : [];
          }, required: function(u, h, b) {
            var k = this, S = [];
            return Array.isArray(u.required) && u.required.forEach(function(I) {
              if (h[I] === void 0) {
                var $ = k.jsoneditor.getEditor("".concat(b, ".").concat(I));
                $ && $.dependenciesFulfilled === !1 || $ && ["button", "info"].includes($.schema.format || $.schema.type) || S.push({ path: b, property: "required", message: k.translate("error_required", [u && u.properties && u.properties[I] && u.properties[I].title ? u.properties[I].title : I], u) });
              }
            }), S;
          }, properties: function(u, h, b, k) {
            var S = this, I = [];
            return Object.entries(u.properties).forEach(function($) {
              var G = Pi($, 2), ee = G[0], pe = G[1];
              k[ee] = !0, I.push.apply(I, lt(S._validateSchema(pe, h[ee], "".concat(b, ".").concat(ee))));
            }), I;
          }, patternProperties: function(u, h, b, k) {
            var S = this, I = [];
            return Object.entries(u.patternProperties).forEach(function($) {
              var G = Pi($, 2), ee = G[0], pe = G[1], _e = new RegExp(ee);
              Object.entries(h).forEach(function(we) {
                var Ie = Pi(we, 2), Fe = Ie[0], Me = Ie[1];
                _e.test(Fe) && (k[Fe] = !0, I.push.apply(I, lt(S._validateSchema(pe, Me, "".concat(b, ".").concat(Fe)))));
              });
            }), I;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(u, h, b, k) {
            for (var S, I = this, $ = [], G = Object.keys(h), ee = null, pe = function() {
              var we = "";
              return ee = G[_e], typeof u.propertyNames == "boolean" ? u.propertyNames === !0 ? 0 : ($.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_false", [ee], u) }), 1) : Object.entries(u.propertyNames).every(function(Ie) {
                var Fe = Pi(Ie, 2), Me = Fe[0], ve = Fe[1], xe = !1;
                switch (Me) {
                  case "maxLength":
                    if (typeof ve != "number") {
                      we = "error_property_names_maxlength";
                      break;
                    }
                    if (ee.length > ve) {
                      we = "error_property_names_exceeds_maxlength";
                      break;
                    }
                    return !0;
                  case "const":
                    if (ve !== ee) {
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
                      Ke === ee && (xe = !0);
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
                    if (!new RegExp(ve).test(ee)) {
                      we = "error_property_names_pattern_mismatch";
                      break;
                    }
                    return !0;
                  default:
                    return $.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_unsupported", [Me], u) }), !1;
                }
                return $.push({ path: b, property: "propertyNames", message: I.translate(we, [ee], u) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < G.length && ((S = pe()) === 0 || S !== 1); _e++) ;
            return $;
          }, additionalProperties: function(u, h, b, k) {
            for (var S = [], I = Object.keys(h), $ = 0; $ < I.length; $++) {
              var G = I[$];
              if (!k[G]) {
                if (!u.additionalProperties) {
                  S.push({ path: b, property: "additionalProperties", message: this.translate("error_additional_properties", [G], u) });
                  break;
                }
                if (u.additionalProperties === !0) break;
                S.push.apply(S, lt(this._validateSchema(u.additionalProperties, h[G], "".concat(b, ".").concat(G))));
              }
            }
            return S;
          }, dependencies: function(u, h, b) {
            var k = this, S = [];
            return Object.entries(u.dependencies).forEach(function(I) {
              var $ = Pi(I, 2), G = $[0], ee = $[1];
              h[G] !== void 0 && (Array.isArray(ee) ? ee.forEach(function(pe) {
                h[pe] === void 0 && S.push({ path: b, property: "dependencies", message: k.translate("error_dependency", [pe], u) });
              }) : S.push.apply(S, lt(k._validateSchema(ee, h, b))));
            }), S;
          } };
        }, r = [{ key: "fitTest", value: function(n, a) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if (Vt(n) === "object" && n !== null) {
            var i = this._getSchema(a);
            if (i.anyOf) {
              var u, h = function(ee) {
                for (var pe = 1; pe < arguments.length; pe++) {
                  var _e = arguments[pe] != null ? arguments[pe] : {};
                  pe % 2 ? ll(Object(_e), !0).forEach(function(we) {
                    Zh(ee, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(ee, Object.getOwnPropertyDescriptors(_e)) : ll(Object(_e)).forEach(function(we) {
                    Object.defineProperty(ee, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return ee;
              }({}, t), b = function(ee, pe) {
                var _e = typeof Symbol < "u" && ee[Symbol.iterator] || ee["@@iterator"];
                if (!_e) {
                  if (Array.isArray(ee) || (_e = os(ee))) {
                    _e && (ee = _e);
                    var we = 0, Ie = function() {
                    };
                    return { s: Ie, n: function() {
                      return we >= ee.length ? { done: !0 } : { done: !1, value: ee[we++] };
                    }, e: function(xe) {
                      throw xe;
                    }, f: Ie };
                  }
                  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
                }
                var Fe, Me = !0, ve = !1;
                return { s: function() {
                  _e = _e.call(ee);
                }, n: function() {
                  var xe = _e.next();
                  return Me = xe.done, xe;
                }, e: function(xe) {
                  ve = !0, Fe = xe;
                }, f: function() {
                  try {
                    Me || _e.return == null || _e.return();
                  } finally {
                    if (ve) throw Fe;
                  }
                } };
              }(i.anyOf);
              try {
                for (b.s(); !(u = b.n()).done; ) {
                  var k = u.value, S = this.fitTest(n, k, e);
                  (S.match > h.match || S.match === h.match && S.extra < h.extra) && (h = S);
                }
              } catch (ee) {
                b.e(ee);
              } finally {
                b.f();
              }
              return h;
            }
            var I = this._getSchema(a).properties;
            for (var $ in I) if (x(I, $)) {
              if (Vt(n[$]) === "object" && Vt(I[$]) === "object" && Vt(I[$].properties) === "object") {
                var G = this.fitTest(n[$], I[$], e / 100);
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
        } }, { key: "_validateSchema", value: function(n, a, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = v({}, this.jsoneditor.expandRefs(n)), a === void 0 ? this._validateV3Required(n, a, e) : (Object.keys(n).forEach(function(u) {
            t._validateSubSchema[u] && i.push.apply(i, lt(t._validateSubSchema[u].call(t, n, a, e)));
          }), i.push.apply(i, lt(this._validateByValueType(n, a, e))), n.links && n.links.forEach(function(u, h) {
            u.rel && u.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, h), i.push.apply(i, lt(t._validateSchema(n, a, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, lt(this._validateDateTimeSubSchema(n, a, e))), ["uuid"].includes(n.format) && i.push.apply(i, lt(this._validateUUIDSchema(n, a, e))), i.push.apply(i, lt(this._validateCustomValidator(n, a, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, a) {
          var e = n.links[a].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), u = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, a).concat(n.links.slice(a + 1)), v({}, n, this.jsoneditor.refs[u]);
        } }, { key: "_validateV3Required", value: function(n, a, e) {
          return (n.required !== void 0 && n.required === !0 || n.required === void 0 && this.jsoneditor.options.required_by_default === !0) && n.type !== "info" ? [{ path: e, property: "required", message: this.translate("error_notset", null, n) }] : [];
        } }, { key: "_validateByValueType", value: function(n, a, e) {
          var t = this, i = [];
          if (a === null) return i;
          if (typeof a == "number") Object.keys(n).forEach(function(h) {
            t._validateNumberSubSchema[h] && i.push.apply(i, lt(t._validateNumberSubSchema[h].call(t, n, a, e)));
          });
          else if (typeof a == "string") Object.keys(n).forEach(function(h) {
            t._validateStringSubSchema[h] && i.push.apply(i, lt(t._validateStringSubSchema[h].call(t, n, a, e)));
          });
          else if (Array.isArray(a)) Object.keys(n).forEach(function(h) {
            t._validateArraySubSchema[h] && i.push.apply(i, lt(t._validateArraySubSchema[h].call(t, n, a, e)));
          });
          else if (Vt(a) === "object") {
            var u = {};
            Object.keys(n).forEach(function(h) {
              t._validateObjectSubSchema[h] && i.push.apply(i, lt(t._validateObjectSubSchema[h].call(t, n, a, e, u)));
            }), n.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || n.oneOf || n.anyOf || n.allOf || (n.additionalProperties = !1), Object.keys(n).forEach(function(h) {
              t._validateObjectSubSchema2[h] !== void 0 && i.push.apply(i, lt(t._validateObjectSubSchema2[h].call(t, n, a, e, u)));
            });
          }
          return i;
        } }, { key: "_validateUUIDSchema", value: function(n, a, e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(a) ? [] : [{ path: e, property: "format", message: this.translate("error_pattern", ["^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"], n) }];
        } }, { key: "_validateNumberSubSchemaMultipleDivisible", value: function(n, a, e) {
          var t = n.multipleOf || n.divisibleBy, i = a / t === Math.floor(a / t);
          return window.math ? i = window.math.mod(window.math.bignumber(a), window.math.bignumber(t)).equals(0) : window.Decimal && (i = new window.Decimal(a).mod(new window.Decimal(t)).equals(0)), i ? [] : [{ path: e, property: n.multipleOf ? "multipleOf" : "divisibleBy", message: this.translate("error_multipleOf", [t], n) }];
        } }, { key: "_validateDateTimeSubSchema", value: function(n, a, e) {
          var t = this, i = this.jsoneditor.getEditor(e), u = i && i.flatpickr ? i.flatpickr.config.dateFormat : { date: '"YYYY-MM-DD"', time: '"HH:MM"', "datetime-local": '"YYYY-MM-DD HH:MM"' }[n.format];
          if (n.type === "integer") return function(h, b, k) {
            return 1 * b < 1 ? [{ path: k, property: "format", message: t.translate("error_invalid_epoch", null, h) }] : b !== Math.abs(parseInt(b)) ? [{ path: k, property: "format", message: t.translate("error_".concat(h.format.replace(/-/g, "_")), [u], h) }] : [];
          }(n, a, e);
          if (i && i.flatpickr) {
            if (i) return function(h, b, k, S) {
              if (b !== "") {
                var I;
                if (S.flatpickr.config.mode !== "single") {
                  var $ = S.flatpickr.config.mode === "range" ? S.flatpickr.l10n.rangeSeparator : ", ";
                  I = S.flatpickr.selectedDates.map(function(ee) {
                    return S.flatpickr.formatDate(ee, S.flatpickr.config.dateFormat);
                  }).join($);
                }
                try {
                  if (I) {
                    if (I !== b) throw new Error("".concat(S.flatpickr.config.mode, " mismatch"));
                  } else if (S.flatpickr.formatDate(S.flatpickr.parseDate(b, S.flatpickr.config.dateFormat), S.flatpickr.config.dateFormat) !== b) throw new Error("mismatch");
                } catch {
                  var G = S.flatpickr.config.errorDateFormat !== void 0 ? S.flatpickr.config.errorDateFormat : S.flatpickr.config.dateFormat;
                  return [{ path: k, property: "format", message: t.translate("error_".concat(S.format.replace(/-/g, "_")), [G], h) }];
                }
              }
              return [];
            }(n, a, e, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[n.format].test(a)) return [{ path: e, property: "format", message: this.translate("error_".concat(n.format.replace(/-/g, "_")), [u], n) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(n, a, e) {
          var t = this, i = [];
          i.push.apply(i, lt(Kh.call(this, n, a, e, this.translate)));
          var u = function(h) {
            i.push.apply(i, lt(h.call(t, n, a, e)));
          };
          return this.defaults.custom_validators.forEach(u), this.options.custom_validators && this.options.custom_validators.forEach(u), i;
        } }, { key: "_removeDuplicateErrors", value: function(n) {
          return n.reduce(function(a, e) {
            var t = !0;
            return a || (a = []), a.forEach(function(i) {
              i.message === e.message && i.path === e.path && i.property === e.property && (i.errorcount++, t = !1);
            }), t && (e.errorcount = 1, a.push(e)), a;
          }, []);
        } }, { key: "_checkType", value: function(n, a) {
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
            return t !== null && !Array.isArray(t) && Vt(t) === "object";
          }, null: function(t) {
            return t === null;
          } };
          return typeof n == "string" ? !e[n] || e[n](a) : !this._validateSchema(n, a).length;
        } }], r && Yh(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function sn(o) {
        return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, sn(o);
      }
      function Qh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Xh(a.key), a);
        }
      }
      function Xh(o) {
        var r = function(n, a) {
          if (sn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (sn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return sn(r) == "symbol" ? r : r + "";
      }
      function ed(o, r, n) {
        return r = zt(r), function(a, e) {
          if (e && (sn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, hl() ? Reflect.construct(r, n || [], zt(o).constructor) : r.apply(o, n));
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
      function qr() {
        return qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, qr.apply(this, arguments);
      }
      function zt(o) {
        return zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, zt(o);
      }
      function as(o, r) {
        return as = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, as(o, r);
      }
      var td = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ed(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && as(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.type] && this.editors[this.type].register();
          }
          qr(zt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (qr(zt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
            this.switcher.disabled = !1, qr(zt(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          if (e && (this.always_disabled = !0), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable(e);
          this.switcher.disabled = !0, qr(zt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function(e) {
          var t = this;
          this.lastType = this.type, this.editors[e] || this.buildChildEditor(e);
          var i = this.getValue();
          this.type = e, this.register(), this.editors.forEach(function(u, h) {
            var b, k;
            u && (t.type === h ? (t.keep_only_existing_values && (b = u.getValue(), k = i, Object.keys(k).forEach(function(S) {
              R.includes(S) || S in b && (b[S] = k[S]);
            }), i = b), (t.keep_values || t.if) && u.setValue(i, !0), u.container.style.display = "") : u.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, u = this, h = this.types[e], b = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(b), typeof h == "string" ? (i = v({}, this.schema)).type = h : (i = v({}, this.schema, h), i = this.jsoneditor.expandRefs(i), h && h.required && Array.isArray(h.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(h.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
          var k = this.jsoneditor.getEditorClass(i);
          this.editors[e] = this.jsoneditor.createEditor(k, { jsoneditor: this.jsoneditor, schema: i, container: b, path: this.path, parent: this, required: !0 }), this.editors[e].preBuild(), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].header && this.theme.visuallyHidden(this.editors[e].header), this.editors[e].option = this.switcher_options[e], b.addEventListener("change_header_text", function() {
            u.refreshHeaderText();
          }), e !== this.type && (b.style.display = "none");
        } }, { key: "preBuild", value: function() {
          if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, this.jsoneditor.options.keep_oneof_values !== void 0 && (this.keep_values = this.jsoneditor.options.keep_oneof_values), this.options.keep_oneof_values !== void 0 && (this.keep_values = this.options.keep_oneof_values), this.keep_only_existing_values = !1, this.jsoneditor.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.jsoneditor.options.keep_only_existing_values), this.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.options.keep_only_existing_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
          else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
          else if (this.schema.if) this.if = !0, this.ifSchema = JSON.parse(JSON.stringify(this.schema.if)), this.thenSchema = { title: "then" }, this.elseSchema = { title: "else" }, this.types = [], this.schema.then && N(this.thenSchema, this.schema, this.schema.then), this.schema.else && N(this.elseSchema, this.schema, this.schema.else), this.types.push(this.thenSchema), this.types.push(this.elseSchema), this.types.forEach(function(i) {
            delete i.if, delete i.then, delete i.else;
          }), delete this.schema.if;
          else {
            if (this.schema.type && this.schema.type !== "any") Array.isArray(this.schema.type) ? this.types = this.schema.type : this.types = [this.schema.type];
            else if (this.types = ["string", "number", "integer", "boolean", "object", "array", "null"], this.schema.disallow) {
              var e = this.schema.disallow;
              sn(e) === "object" && Array.isArray(e) || (e = [e]);
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
          this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired()), this.switcher = this.theme.getSwitcher(this.display_text), this.switcher.setAttribute("id", this.formname + "switcher"), this.switcherLabel = this.theme.getHiddenLabel(this.formname + " switcher"), this.switcherLabel.setAttribute("for", this.formname + "switcher"), this.if || (this.container.appendChild(this.header), t.appendChild(this.switcherLabel), t.appendChild(this.switcher)), this.switcher.addEventListener("change", function(u) {
            u.preventDefault(), u.stopPropagation(), e.switchEditor(e.display_text.indexOf(u.currentTarget.value)), e.onChange(!0);
          }), this.editor_holder = document.createElement("div"), t.appendChild(this.editor_holder);
          var i = {};
          this.jsoneditor.options.custom_validators && (i.custom_validators = this.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), this.types.forEach(function(u, h) {
            var b;
            e.editors[h] = !1, typeof u == "string" ? (b = v({}, e.schema)).type = u : (b = v({}, e.schema, u), u.required && Array.isArray(u.required) && e.schema.required && Array.isArray(e.schema.required) && (b.required = e.schema.required.concat(u.required))), e.validators[h] = new cl(e.jsoneditor, b, i, e.defaults);
          }), this.jsoneditor.on("change", function() {
            e.switchIf();
          }), this.switchEditor(0);
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), qr(zt(r.prototype), "onChildEditorChange", this).call(this, e, t);
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
          var u = this.type, h = { match: 0, extra: 0, i: this.type }, b = { match: 0, i: null };
          this.validators.forEach(function(I, $) {
            var G = null;
            i.anyOf !== void 0 && i.anyOf && (G = I.fitTest(e), (h.match < G.match || h.match === G.match && h.extra > G.extra) && ((h = G).i = $)), I.validate(e).length || b.i !== null ? h = b : (b.i = $, G !== null && (b.match = G.match));
          });
          var k = b.i;
          this.anyOf !== void 0 && this.anyOf && b.match < h.match && (k = h.i), this.if && (k = this.getIfType(e)), k === null && (k = this.type), this.type = k, this.switcher.value = this.display_text[k];
          var S = this.type !== u;
          S && (this.switchEditor(this.type), this.editors[this.type].setValue(e, t)), e !== void 0 && this.editors[this.type].setValue(e, t), this.refreshValue(), this.onChange(S);
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), qr(zt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.oneOf || this.anyOf) {
            var i = this.oneOf ? "oneOf" : "anyOf";
            this.editors.forEach(function(u, h) {
              if (u) {
                var b = "".concat(t.path, ".").concat(i, "[").concat(h, "]");
                u.showValidationErrors(e.reduce(function(k, S) {
                  if (S.path.startsWith(b) || S.path === b.substr(0, S.path.length)) {
                    var I = v({}, S);
                    S.path.startsWith(b) && (I.path = t.path + I.path.substr(b.length)), k.push(I);
                  }
                  return k;
                }, []));
              }
            });
          } else this.editors.forEach(function(u) {
            u && u.showValidationErrors(e);
          });
        } }, { key: "addLinks", value: function() {
        } }]) && Qh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Gn(o) {
        return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gn(o);
      }
      function rd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, nd(a.key), a);
        }
      }
      function nd(o) {
        var r = function(n, a) {
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
      function id(o, r, n) {
        return r = ro(r), function(a, e) {
          if (e && (Gn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, dl() ? Reflect.construct(r, n || [], ro(o).constructor) : r.apply(o, n));
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
      function ro(o) {
        return ro = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ro(o);
      }
      function ls(o, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ls(o, r);
      }
      var od = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), id(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
        }(r, o), n = r, (a = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && rd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function pl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function Wn(o) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? pl(Object(n), !0).forEach(function(a) {
            no(o, a, n[a]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : pl(Object(n)).forEach(function(a) {
            Object.defineProperty(o, a, Object.getOwnPropertyDescriptor(n, a));
          });
        }
        return o;
      }
      function no(o, r, n) {
        return (r = yl(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Jn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, h, b = [], k = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(k = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); k = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!k && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return fl(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? fl(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function fl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function br(o) {
        return br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, br(o);
      }
      function sd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, yl(a.key), a);
        }
      }
      function yl(o) {
        var r = function(n, a) {
          if (br(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (br(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return br(r) == "symbol" ? r : r + "";
      }
      function ad(o, r, n) {
        return r = At(r), function(a, e) {
          if (e && (br(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ml() ? Reflect.construct(r, n || [], At(o).constructor) : r.apply(o, n));
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
      function Xt() {
        return Xt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = At(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Xt.apply(this, arguments);
      }
      function At(o) {
        return At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, At(o);
      }
      function us(o, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, us(o, r);
      }
      var bl = function(o) {
        function r(e, t, i) {
          var u;
          return function(h, b) {
            if (!(h instanceof b)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (u = ad(this, r, [e, t])).currentDepth = i, u;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && us(e, t);
        }(r, o), n = r, (a = [{ key: "getChildEditors", value: function() {
          return this.editors;
        } }, { key: "register", value: function() {
          Xt(At(r.prototype), "register", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          Xt(At(r.prototype), "unregister", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.maxwidth), 3);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.editjson_control && (this.editjson_control.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), Xt(At(r.prototype), "enable", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            (e.isActive() || e.isUiOnly) && e.enable(), e.optInCheckbox && (e.optInCheckbox.disabled = !1);
          }));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.editjson_control && (this.editjson_control.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), Xt(At(r.prototype), "disable", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            (t.isActive() || t.isUiOnly) && t.disable(e), t.optInCheckbox.disabled = !0;
          });
        } }, { key: "layoutEditors", value: function() {
          var e, t, i = this;
          if (this.row_container) {
            var u;
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(Me, ve) {
              var xe = i.editors[Me].schema.propertyOrder, Ke = i.editors[ve].schema.propertyOrder;
              return typeof xe != "number" && (xe = 1e3), typeof Ke != "number" && (Ke = 1e3), xe - Ke;
            });
            var h, b = this.format === "categories", k = [], S = null, I = null;
            if (this.format === "grid-strict") {
              var $ = 0;
              if (h = [], this.property_order.forEach(function(Me) {
                var ve = i.editors[Me];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ke = ve.options.hidden ? 0 : ve.options.grid_offset || 0, nt = !ve.options.hidden && (ve.options.grid_break || !1), xt = { key: Me, width: xe, offset: Ke, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  h.push(xt), k[$] = h, nt && ($++, h = []);
                }
              }), this.layout === JSON.stringify(k)) return !1;
              for (this.layout = JSON.stringify(k), u = document.createElement("div"), e = 0; e < k.length; e++) for (h = this.theme.getGridRow(), u.appendChild(h), t = 0; t < k[e].length; t++) S = k[e][t].key, (I = this.editors[S]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, k[e][t].width, k[e][t].offset), h.appendChild(I.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function(Me) {
                var ve = i.editors[Me];
                if (!ve.property_removed) {
                  for (var xe = !1, Ke = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), nt = ve.options.hidden ? 0 : ve.container.offsetHeight, xt = 0; xt < k.length; xt++) k[xt].width + Ke <= 12 && (!nt || 0.5 * k[xt].minh < nt && 2 * k[xt].maxh > nt) && (xe = xt);
                  xe === !1 && (k.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), xe = k.length - 1), k[xe].editors.push({ key: Me, width: Ke, height: nt }), k[xe].width += Ke, k[xe].minh = Math.min(k[xe].minh, nt), k[xe].maxh = Math.max(k[xe].maxh, nt);
                }
              }), e = 0; e < k.length; e++) if (k[e].width < 12) {
                var G = !1, ee = 0;
                for (t = 0; t < k[e].editors.length; t++) (G === !1 || k[e].editors[t].width > k[e].editors[G].width) && (G = t), k[e].editors[t].width *= 12 / k[e].width, k[e].editors[t].width = Math.floor(k[e].editors[t].width), ee += k[e].editors[t].width;
                ee < 12 && (k[e].editors[G].width += 12 - ee), k[e].width = 12;
              }
              if (this.layout === JSON.stringify(k)) return !1;
              for (this.layout = JSON.stringify(k), u = document.createElement("div"), e = 0; e < k.length; e++) for (h = this.theme.getGridRow(), u.appendChild(h), t = 0; t < k[e].editors.length; t++) S = k[e].editors[t].key, (I = this.editors[S]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, k[e].editors[t].width), h.appendChild(I.container);
            } else {
              if (u = document.createElement("div"), b) {
                var pe = document.createElement("div"), _e = this.theme.getTopTabHolder(this.translateProperty(this.schema.title)), we = this.theme.getTopTabContentHolder(_e);
                for (this.property_order.forEach(function(Me) {
                  var ve = i.editors[Me];
                  if (!ve.property_removed) {
                    var xe = i.theme.getTabContent(), Ke = ve.schema && (ve.schema.type === "object" || ve.schema.type === "array");
                    xe.isObjOrArray = Ke;
                    var nt = i.theme.getGridRow();
                    ve.tab || (i.basicPane === void 0 ? i.addRow(ve, _e, xe) : i.addRow(ve, _e, i.basicPane)), xe.id = i.getValidId(ve.tab_text.textContent), Ke ? (xe.appendChild(nt), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab)) : (pe.appendChild(nt), we.childElementCount > 0 ? we.firstChild.isObjOrArray && (xe.appendChild(pe), we.insertBefore(xe, we.firstChild), i.theme.insertBasicTopTab(ve.tab, _e), ve.basicPane = xe) : (xe.appendChild(pe), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab), ve.basicPane = xe)), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), nt.appendChild(ve.container), ve.rowPane = xe;
                  }
                }); this.tabPanesContainer.firstChild; ) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                var Ie = this.tabs_holder.parentNode;
                Ie.removeChild(Ie.firstChild), Ie.appendChild(_e), this.tabPanesContainer = we, this.tabs_holder = _e;
                var Fe = this.theme.getFirstTab(this.tabs_holder);
                return void (Fe && j(Fe, "click"));
              }
              this.property_order.forEach(function(Me) {
                var ve = i.editors[Me];
                ve.property_removed || (h = i.theme.getGridRow(), u.appendChild(h), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), h.appendChild(ve.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(u);
          }
        } }, { key: "getPropertySchema", value: function(e) {
          var t = this, i = this.schema.properties[e] || {};
          i = v({}, i);
          var u = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(h) {
            new RegExp(h).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[h]), u = !0);
          }), !u && this.schema.additionalProperties && br(this.schema.additionalProperties) === "object" && (i = v({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (Xt(At(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = Jn(t, 2), u = i[0], h = i[1], b = e.jsoneditor.getEditorClass(h);
            e.editors[u] = e.jsoneditor.createEditor(b, { jsoneditor: e.jsoneditor, schema: h, path: "".concat(e.path, ".").concat(u), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[u].preBuild();
            var k = e.editors[u].options.hidden ? 0 : e.editors[u].options.grid_columns || e.editors[u].getNumColumns();
            e.minwidth += k, e.maxwidth += k;
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
            var u = e.editors[t].schema.propertyOrder, h = e.editors[i].schema.propertyOrder;
            return typeof u != "number" && (u = 1e3), typeof h != "number" && (h = 1e3), u - h;
          });
        } }, { key: "addTab", value: function(e) {
          var t = this, i = this.rows[e].schema && (this.rows[e].schema.type === "object" || this.rows[e].schema.type === "array");
          this.tabs_holder && (this.rows[e].tab_text = document.createElement("span"), this.rows[e].tab_text.textContent = i ? this.rows[e].getHeaderText() : this.schema.basicCategoryTitle === void 0 ? "Basic" : this.schema.basicCategoryTitle, this.rows[e].tab = this.theme.getTopTab(this.rows[e].tab_text, this.getValidId(this.rows[e].tab_text.textContent)), this.rows[e].tab.addEventListener("click", function(u) {
            t.active_tab = t.rows[e].tab, t.refreshTabs(), u.preventDefault(), u.stopPropagation();
          }));
        } }, { key: "addRow", value: function(e, t, i) {
          var u = this.rows.length, h = e.schema.type === "object" || e.schema.type === "array";
          this.rows[u] = e, this.rows[u].rowPane = i, h ? (this.addTab(u), this.theme.addTopTab(t, this.rows[u].tab)) : this.basicTab === void 0 ? (this.addTab(u), this.basicTab = u, this.basicPane = i, this.theme.addTopTab(t, this.rows[u].tab)) : (this.rows[u].tab = this.rows[this.basicTab].tab, this.rows[u].tab_text = this.rows[this.basicTab].tab_text, this.rows[u].rowPane = this.rows[this.basicTab].rowPane);
        } }, { key: "refreshTabs", value: function(e) {
          var t = this, i = this.basicTab !== void 0, u = !1;
          this.rows.forEach(function(h) {
            h.tab && h.rowPane && h.rowPane.parentNode && (i && h.tab === t.rows[t.basicTab].tab && u || (e ? h.tab_text.textContent = h.getHeaderText() : (i && h.tab === t.rows[t.basicTab].tab && (u = !0), h.tab === t.active_tab ? t.theme.markTabActive(h) : t.theme.markTabInactive(h))));
          });
        } }, { key: "build", value: function() {
          var e = this, t = this.format === "categories";
          if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, Object.entries(this.editors).forEach(function(u) {
            var h = Jn(u, 2), b = h[0], k = h[1], S = e.theme.getTableCell();
            e.editor_holder.appendChild(S), k.setContainer(S), k.build(), k.postBuild(), k.setOptInCheckbox(k.header), k.setValue(k.getDefault(), !0), e.editors[b].options.hidden && (S.style.display = "none"), e.editors[b].options.input_width && (S.style.width = e.editors[b].options.input_width);
          });
          else {
            if (this.options.table) throw new Error("Not supported yet");
            this.header = "", this.options.compact || (this.header = document.createElement("span"), this.header.textContent = this.getTitle()), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.title.classList.add("je-object__title"), this.controls = this.theme.getButtonHolder(), this.controls.classList.add("je-object__controls"), this.container.appendChild(this.title), this.container.appendChild(this.controls), this.container.classList.add("je-object__container"), this.editjson_holder = this.theme.getModal(), this.editjson_textarea_label = this.theme.getHiddenLabel(this.translate("button_edit_json")), this.editjson_textarea_label.setAttribute("for", this.path + "-edit-json-textarea"), this.editjson_textarea = this.theme.getTextareaInput(), this.editjson_textarea.setAttribute("id", this.path + "-edit-json-textarea"), this.editjson_textarea.setAttribute("aria-labelledby", this.path + "-edit-json-textarea"), this.editjson_textarea.classList.add("je-edit-json--textarea"), this.editjson_save = this.getButton("button_save", "save", "button_save"), this.editjson_save.classList.add("json-editor-btntype-save"), this.editjson_save.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.saveJSON();
            }), this.editjson_copy = this.getButton("button_copy", "copy", "button_copy"), this.editjson_copy.classList.add("json-editor-btntype-copy"), this.editjson_copy.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.copyJSON();
            }), this.editjson_cancel = this.getButton("button_cancel", "cancel", "button_cancel"), this.editjson_cancel.classList.add("json-editor-btntype-cancel"), this.editjson_cancel.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.hideEditJSON();
            }), this.editjson_holder.appendChild(this.editjson_textarea_label), this.editjson_holder.appendChild(this.editjson_textarea), this.editjson_holder.appendChild(this.editjson_save), this.editjson_holder.appendChild(this.editjson_copy), this.editjson_holder.appendChild(this.editjson_cancel), this.addproperty_holder = this.theme.getModal(), this.addproperty_list = document.createElement("div"), this.addproperty_list.classList.add("property-selector"), this.addproperty_add = this.getButton("button_add", "add", "button_add"), this.addproperty_add.classList.add("json-editor-btntype-add"), this.addproperty_input = this.theme.getFormInputField("text"), this.addproperty_input.setAttribute("placeholder", "Property name..."), this.addproperty_input_label = this.theme.getHiddenLabel(this.translate("button_properties")), this.addproperty_input_label.setAttribute("for", this.path + "-property-selector"), this.addproperty_input.classList.add("property-selector-input"), this.addproperty_input.setAttribute("id", this.path + "-property-selector"), this.addproperty_input.setAttribute("aria-labelledby", this.path + "-property-selector"), this.addproperty_add.addEventListener("click", function(u) {
              if (u.preventDefault(), u.stopPropagation(), e.addproperty_input.value) {
                if (e.editors[e.addproperty_input.value]) return void window.alert("there is already a property with that name");
                e.addObjectProperty(e.addproperty_input.value), e.editors[e.addproperty_input.value] && e.editors[e.addproperty_input.value].disable();
                var h = e.editors[e.addproperty_input.value].key, b = e.editors[e.addproperty_input.value].type, k = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: h, type: b, path: k } });
              }
            }), this.addproperty_input.addEventListener("input", function(u) {
              u.target.previousSibling.previousSibling.childNodes.forEach(function(h) {
                var b = h.innerText, k = u.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (b = b.toLowerCase(), k = k.toLowerCase()), b.includes(k) ? h.style.display = "" : h.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(u) {
              var h = e.theme.getTabContent(), b = e.theme.getGridColumn(), k = !(!u.schema || u.schema.type !== "object" && u.schema.type !== "array");
              if (h.isObjOrArray = k, t) {
                if (k) {
                  var S = e.theme.getGridContainer();
                  S.appendChild(b), h.appendChild(S), e.tabPanesContainer.appendChild(h), e.row_container = S;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), h.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(h) : e.tabPanesContainer.insertBefore(h, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(b);
                e.addRow(u, e.tabs_holder, h), h.id = e.getValidId(u.schema.title);
              } else e.row_container.appendChild(b);
              u.setContainer(b), u.build(), u.postBuild(), u.setOptInCheckbox(u.header);
            }), this.rows[0] && j(this.rows[0].tab, "click"), this.collapsed = !1, this.collapse_control = this.getButton("", "collapse", "button_collapse"), this.collapse_control.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(this.collapse_control, this.title.childNodes[0]), this.collapse_control.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.collapsed ? (e.editor_holder.style.display = "", e.collapsed = !1, e.setButtonText(e.collapse_control, "", "collapse", "button_collapse")) : (e.editor_holder.style.display = "none", e.collapsed = !0, e.setButtonText(e.collapse_control, "", "expand", "button_expand"));
            }), this.options.collapsed && j(this.collapse_control, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.collapse_control.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.collapse_control.style.display = "none"), this.editjson_control = this.getButton("JSON", "edit", "button_edit_json"), this.editjson_control.classList.add("json-editor-btntype-editjson"), this.editjson_control.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.toggleEditJSON();
            }), this.controls.appendChild(this.editjson_control), this.controls.insertBefore(this.editjson_holder, this.controls.childNodes[0]), this.schema.options && this.schema.options.disable_edit_json !== void 0 ? this.schema.options.disable_edit_json && (this.editjson_control.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_control.style.display = "none"), this.addproperty_button = this.getButton("button_properties", "edit_properties", "button_object_properties"), this.addproperty_button.classList.add("json-editor-btntype-properties"), this.addproperty_button.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.toggleAddProperty();
            }), this.controls.appendChild(this.addproperty_button), this.controls.insertBefore(this.addproperty_holder, this.controls.childNodes[1]), this.refreshAddProperties(), this.deactivateNonRequiredProperties(!1);
          }
          this.options.table_row ? (this.editor_holder = this.container, this.property_order.forEach(function(u) {
            e.editor_holder.appendChild(e.editors[u].container);
          })) : (this.layoutEditors(), this.layoutEditors()), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "deactivateNonRequiredProperties", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_opt_in, u = this.options.show_opt_in !== void 0, h = u && this.options.show_opt_in === !0, b = u && this.options.show_opt_in === !1;
          (h || !b && i || !u && i) && Object.entries(this.editors).forEach(function(k) {
            var S = Jn(k, 2), I = S[0], $ = S[1];
            t.isRequiredObject($) || t.editors[I].deactivate(), e && typeof t.editors[I].deactivateNonRequiredProperties == "function" && t.editors[I].deactivateNonRequiredProperties(e);
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
          var u;
          this.schema.properties[e] && (u = this.schema.properties[e].propertyOrder), typeof u != "number" && (u = 1e3), t.propertyOrder = u;
          for (var h = 0; h < i.childNodes.length; h++) {
            var b = i.childNodes[h];
            if (t.propertyOrder < b.propertyOrder) {
              this.addproperty_list.insertBefore(t, b), t = null;
              break;
            }
          }
          t && this.addproperty_list.appendChild(t);
        } }, { key: "addPropertyCheckbox", value: function(e) {
          var t, i = this, u = this.theme.getCheckbox();
          t = this.schema.properties[e] && this.schema.properties[e].title ? this.schema.properties[e].title : e;
          var h = this.theme.getCheckboxLabel(t), b = this.theme.getFormControl(h, u, null, null, this.path + "-" + e);
          return b.style.paddingBottom = b.style.marginBottom = b.style.paddingTop = b.style.marginTop = 0, b.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(e, b, this.addproperty_list), u.checked = e in this.editors, u.addEventListener("change", function() {
            u.checked ? i.addObjectProperty(e) : i.removeObjectProperty(e), i.onChange(!0);
          }), this.addproperty_checkboxes[e] = u, u;
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
                return Wn(Wn({}, t), {}, no({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return Wn(Wn({}, t), {}, no({}, i, !0));
              default:
                return Wn(Wn({}, t), {}, no({}, i, e[i]));
            }
          }, {});
        } }, { key: "addObjectProperty", value: function(e, t) {
          if (!this.editors[e]) {
            if (this.cached_editors[e]) {
              if (this.editors[e] = this.cached_editors[e], t) return;
              this.editors[e].register();
            } else {
              if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[e] || this.schema.patternProperties && Object.keys(this.schema.patternProperties).find(function(k) {
                return new RegExp(k).test(e);
              }))) return;
              var i = this.getPropertySchema(e);
              typeof i.propertyOrder != "number" && (i.propertyOrder = Object.keys(this.editors).length + 1e3);
              var u = this.jsoneditor.getEditorClass(i), h = this.jsoneditor.options.max_depth;
              if (this.editors[e] = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: h && this.currentDepth >= h ? this.getSchemaOnMaxDepth(i) : i, path: "".concat(this.path, ".").concat(e), parent: this }, this.currentDepth + 1), this.editors[e].preBuild(), !t) {
                var b = this.theme.getChildEditorHolder();
                this.editor_holder.appendChild(b), this.editors[e].setContainer(b), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].setOptInCheckbox(u.header), this.editors[e].activate();
              }
              this.cached_editors[e] = this.editors[e];
            }
            t || (this.refreshValue(), this.layoutEditors());
          }
        } }, { key: "onOutsideModalClick", value: function(e) {
          var t = e.path || e.composedPath && e.composedPath();
          this.addproperty_holder && !this.addproperty_holder.contains(t[0]) && this.adding_property && (e.preventDefault(), e.stopPropagation(), this.toggleAddProperty());
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), Xt(At(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "canHaveAdditionalProperties", value: function() {
          return typeof this.schema.additionalProperties == "boolean" ? this.schema.additionalProperties : br(this.schema.additionalProperties) === "object" && this.schema.additionalProperties !== null || (typeof this.options.no_additional_properties == "boolean" ? !this.options.no_additional_properties : typeof this.jsoneditor.options.no_additional_properties != "boolean" || !this.jsoneditor.options.no_additional_properties);
        } }, { key: "destroy", value: function() {
          Object.values(this.cached_editors).forEach(function(e) {
            return e.destroy();
          }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClickListener, !0), Xt(At(r.prototype), "destroy", this).call(this);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            var e = Xt(At(r.prototype), "getValue", this).call(this);
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
            var u;
            Object.entries(t.cached_editors).forEach(function(h) {
              var b = Jn(h, 2), k = (b[0], b[1]);
              k.key === i && (u = k);
            }), u && !u.isActive() && u.activate();
          });
        } }, { key: "getDependentRequired", value: function(e) {
          return this.schema.dependentRequired && x(this.schema.dependentRequired, e) ? this.schema.dependentRequired[e] : [];
        } }, { key: "refreshAddProperties", value: function() {
          var e = this;
          if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) this.addproperty_button.style.display = "none";
          else {
            var t, i = 0, u = !1;
            Object.keys(this.editors).forEach(function(h) {
              return i++;
            }), t = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(h) {
              e.addPropertyCheckbox(h), e.isRequiredObject(e.cached_editors[h]) && h in e.editors && (e.addproperty_checkboxes[h].disabled = !0), e.schema.minProperties !== void 0 && i <= e.schema.minProperties ? (e.addproperty_checkboxes[h].disabled = e.addproperty_checkboxes[h].checked, e.addproperty_checkboxes[h].checked || (u = !0)) : h in e.editors ? u = !0 : t || x(e.schema.properties, h) ? (e.addproperty_checkboxes[h].disabled = !1, u = !0) : e.addproperty_checkboxes[h].disabled = !0;
            }), this.canHaveAdditionalProperties() && (u = !0), Object.keys(this.schema.properties).forEach(function(h) {
              e.cached_editors[h] || (u = !0, e.addPropertyCheckbox(h));
            }), u ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(e) {
          if (e) return typeof e.schema.required == "boolean" ? e.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(e.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          (br(e = (e = this.applyConstFilter(e)) || {}) !== "object" || Array.isArray(e)) && (e = {}), Object.entries(this.cached_editors).forEach(function(u) {
            var h = Jn(u, 2), b = h[0], k = h[1];
            e[b] !== void 0 ? (i.addObjectProperty(b), k.setValue(e[b], t), k.activate(), i.disabled && k.disable()) : t || i.isRequiredObject(k) ? k.setValue(k.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? k.deactivate() : i.removeObjectProperty(b);
          }), Object.entries(e).forEach(function(u) {
            var h = Jn(u, 2), b = h[0], k = h[1];
            i.cached_editors[b] || (i.addObjectProperty(b), i.editors[b] && i.editors[b].setValue(k, t, !!i.editors[b].template));
          }), this.refreshValue(), this.layoutEditors(), this.onChange();
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], u = [];
          e.forEach(function(h) {
            h.path === t.path ? i.push(h) : u.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            h.errorcount && h.errorcount > 1 && (h.message += " (".concat(h.errorcount, " errors)")), t.error_holder.appendChild(t.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), Object.values(this.editors).forEach(function(h) {
            h.showValidationErrors(u);
          });
        } }]) && sd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U);
      function Kn(o) {
        return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Kn(o);
      }
      function ld(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ud(a.key), a);
        }
      }
      function ud(o) {
        var r = function(n, a) {
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
      function cd(o, r, n) {
        return r = vr(r), function(a, e) {
          if (e && (Kn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, vl() ? Reflect.construct(r, n || [], vr(o).constructor) : r.apply(o, n));
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
      function Zn() {
        return Zn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = vr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Zn.apply(this, arguments);
      }
      function vr(o) {
        return vr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, vr(o);
      }
      function cs(o, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, cs(o, r);
      }
      bl.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var hd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), cd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          Zn(vr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          var e = this;
          this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
          for (var t = function(I) {
            e.setValue(I.currentTarget.value), e.onChange(!0), e.radioGroup.forEach(function($) {
              $.checked = $.value === e.getValue();
            });
          }, i = 0; i < this.enum_values.length; i++) {
            var u = { id: "".concat(this.formname, "[").concat(i, "]"), value: this.enum_values[i] };
            this.jsoneditor.options.use_name_attributes && (u.name = this.formname), this.input = this.theme.getFormRadio(u), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", t, !1), this.radioGroup.push(this.input);
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
          var S = this.theme.getContainer();
          S.appendChild(this.radioContainer), S.dataset.containerFor = "radio", this.input = S, this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady();
          });
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !1;
            this.radioContainer.classList.remove("readonly"), Zn(vr(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.radioContainer.classList.add("readonly"), Zn(vr(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Zn(vr(r.prototype), "destroy", this).call(this);
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
        } }]) && ld(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ci);
      function Yn(o) {
        return Yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Yn(o);
      }
      function dd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, pd(a.key), a);
        }
      }
      function pd(o) {
        var r = function(n, a) {
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
      function fd(o, r, n) {
        return r = qt(r), function(a, e) {
          if (e && (Yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, gl() ? Reflect.construct(r, n || [], qt(o).constructor) : r.apply(o, n));
      }
      function gl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (gl = function() {
          return !!o;
        })();
      }
      function Ur() {
        return Ur = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = qt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ur.apply(this, arguments);
      }
      function qt(o) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, qt(o);
      }
      function hs(o, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, hs(o, r);
      }
      var yd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), fd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Ur(qt(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.sceditor_instance && this.sceditor_instance.val(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Ur(qt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.sceditor) {
            var t = this.expandCallbacks("sceditor", v({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
            i === void 0 && window.sceditor.create(this.input, t), this.sceditor_instance = i || window.sceditor.instance(this.input), this.sceditor_instance.blur(function() {
              e.value = e.sceditor_instance.val(), e.sceditor_instance.updateOriginal(), e.is_dirty = !0, e.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Ur(qt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), Ur(qt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.sceditor_instance && this.sceditor_instance.readOnly(!0), Ur(qt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), Ur(qt(r.prototype), "destroy", this).call(this);
        } }]) && dd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Qn(o) {
        return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qn(o);
      }
      function md(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, bd(a.key), a);
        }
      }
      function bd(o) {
        var r = function(n, a) {
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
      function vd(o, r, n) {
        return r = er(r), function(a, e) {
          if (e && (Qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, _l() ? Reflect.construct(r, n || [], er(o).constructor) : r.apply(o, n));
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
      function an() {
        return an = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = er(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, an.apply(this, arguments);
      }
      function er(o) {
        return er = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, er(o);
      }
      function ds(o, r) {
        return ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ds(o, r);
      }
      var gd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), vd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ds(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else an(er(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", v({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = t.tags = !!t.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
              e.updateValue(i), e.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          an(er(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t, i = this.typecast(e), u = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (t = this.input.querySelector('option[value="'.concat(i, '"]'))) ? t.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), u = !0), u;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), an(er(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), an(er(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), an(er(r.prototype), "destroy", this).call(this);
        } }]) && md(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ci);
      function Xn(o) {
        return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Xn(o);
      }
      function _d(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, wd(a.key), a);
        }
      }
      function wd(o) {
        var r = function(n, a) {
          if (Xn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Xn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Xn(r) == "symbol" ? r : r + "";
      }
      function jd(o, r, n) {
        return r = Ut(r), function(a, e) {
          if (e && (Xn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, wl() ? Reflect.construct(r, n || [], Ut(o).constructor) : r.apply(o, n));
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
      function $r() {
        return $r = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, $r.apply(this, arguments);
      }
      function Ut(o) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(o);
      }
      function ps(o, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ps(o, r);
      }
      var kd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), jd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.selectize_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else $r(Ut(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var t = this.expandCallbacks("selectize", v({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
            this.newEnumAllowed = t.create = !!t.create && this.schema.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              e.updateValue(i), e.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
          }
          $r(Ut(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t = this.typecast(e), i = !1;
          return this.enum_values.includes(t) || t === "" || (this.enum_options.push("".concat(t)), this.enum_display.push("".concat(t)), this.enum_values.push(t), this.schema.enum.push(t), this.selectize_instance.addItem(t), this.selectize_instance.refreshOptions(!1), i = !0), i;
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          $r(Ut(r.prototype), "onWatchedFieldChange", this).call(this), this.selectize_instance && (this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(t, i) {
            e.selectize_instance.addOption({ value: t, text: e.enum_display[i] });
          }), this.selectize_instance.addItem("".concat(this.value), !0));
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), $r(Ut(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), $r(Ut(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), $r(Ut(r.prototype), "destroy", this).call(this);
        } }]) && _d(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ci);
      function ei(o) {
        return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ei(o);
      }
      function xd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Od(a.key), a);
        }
      }
      function Od(o) {
        var r = function(n, a) {
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
      function Cd(o, r, n) {
        return r = io(r), function(a, e) {
          if (e && (ei(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, jl() ? Reflect.construct(r, n || [], io(o).constructor) : r.apply(o, n));
      }
      function jl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (jl = function() {
          return !!o;
        })();
      }
      function io(o) {
        return io = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, io(o);
      }
      function fs(o, r) {
        return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, fs(o, r);
      }
      var Ed = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description)));
          var t = this.formname.replace(/\W/g, "");
          if (typeof SignaturePad == "function") {
            this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input);
            var i = document.createElement("div");
            i.classList.add("signature-container");
            var u = document.createElement("canvas");
            this.jsoneditor.options.use_name_attributes && u.setAttribute("name", t), u.classList.add("signature"), i.appendChild(u), this.signaturePad = new window.SignaturePad(u), this.signaturePad.onEnd = function() {
              e.signaturePad.isEmpty() ? e.input.value = "" : e.input.value = e.signaturePad.toDataURL(), e.is_dirty = !0, e.refreshValue(), e.watch_listener(), e.jsoneditor.notifyWatchers(e.path), e.parent ? e.parent.onChildEditorChange(e) : e.jsoneditor.onChange();
            };
            var h = document.createElement("div"), b = document.createElement("button");
            b.classList.add("tiny", "button"), b.innerHTML = "Clear signature", h.appendChild(b), i.appendChild(h), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(S) {
              u.setAttribute("readOnly", "readOnly"), S.disabled = !0;
            })), b.addEventListener("click", function(S) {
              S.preventDefault(), S.stopPropagation(), e.signaturePad.clear(), e.signaturePad.strokeEnd();
            }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), u.width = i.offsetWidth, this.options && this.options.canvas_height ? u.height = this.options.canvas_height : u.height = "300";
          } else {
            var k = document.createElement("p");
            k.innerHTML = "Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad", this.container.appendChild(k);
          }
        } }, { key: "setValue", value: function(e) {
          if (e = this.applyConstFilter(e), typeof SignaturePad == "function") {
            var t = this.sanitize(e);
            return this.value === t ? void 0 : (this.value = t, this.input.value = this.value, this.signaturePad.clear(), e && e !== "" && this.signaturePad.fromDataURL(e), this.watch_listener(), this.jsoneditor.notifyWatchers(this.path), !1);
          }
        } }, { key: "destroy", value: function() {
          this.signaturePad.off(), delete this.signaturePad;
        } }]) && xd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function ti(o) {
        return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ti(o);
      }
      function Sd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Pd(a.key), a);
        }
      }
      function Pd(o) {
        var r = function(n, a) {
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
      function Td(o, r, n) {
        return r = $t(r), function(a, e) {
          if (e && (ti(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, kl() ? Reflect.construct(r, n || [], $t(o).constructor) : r.apply(o, n));
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
      function Gr() {
        return Gr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $t(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Gr.apply(this, arguments);
      }
      function $t(o) {
        return $t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $t(o);
      }
      function ys(o, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ys(o, r);
      }
      g(6031);
      var Ld = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Td(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Gr($t(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.simplemde_instance && this.simplemde_instance.value(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Gr($t(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.SimpleMDE ? (e = this.expandCallbacks("simplemde", v({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
            t.value = t.simplemde_instance.value(), t.is_dirty = !0, t.onChange(!0);
          }), e.autorefresh && this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 }), this.theme.afterInputReady(this.input)) : Gr($t(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), Gr($t(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), Gr($t(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), Gr($t(r.prototype), "destroy", this).call(this);
        } }, { key: "startListening", value: function(e, t) {
          var i = this, u = function h() {
            e.display.wrapper.offsetHeight ? (i.stopListening(e, t), e.display.lastWrapHeight !== e.display.wrapper.clientHeight && e.refresh()) : t.timeout = window.setTimeout(h, t.delay);
          };
          t.timeout = window.setTimeout(u, t.delay), t.hurry = function() {
            window.clearTimeout(t.timeout), t.timeout = window.setTimeout(u, 50);
          }, e.on(window, "mouseup", t.hurry), e.on(window, "keyup", t.hurry);
        } }, { key: "stopListening", value: function(e, t) {
          window.clearTimeout(t.timeout), e.off(window, "mouseup", t.hurry), e.off(window, "keyup", t.hurry);
        } }]) && Sd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function ri(o) {
        return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ri(o);
      }
      function Ad(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Rd(a.key), a);
        }
      }
      function Rd(o) {
        var r = function(n, a) {
          if (ri(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ri(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ri(r) == "symbol" ? r : r + "";
      }
      function Id(o, r, n) {
        return r = ln(r), function(a, e) {
          if (e && (ri(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, xl() ? Reflect.construct(r, n || [], ln(o).constructor) : r.apply(o, n));
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
      function oo() {
        return oo = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ln(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, oo.apply(this, arguments);
      }
      function ln(o) {
        return ln = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ln(o);
      }
      function ms(o, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ms(o, r);
      }
      var Ol = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Id(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var t = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && t--, this.enum_values = [];
            for (var i = 0; i < t; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var u = function(ee) {
            ee.preventDefault(), ee.stopPropagation(), e.setValue(ee.currentTarget.value), e.onChange(!0);
          }, h = this.enum_values.length - 1; h > -1; h--) {
            var b = this.formname + (h + 1), k = this.theme.getFormInputField("radio");
            k.name = "".concat(this.formname, "[starrating]"), k.value = this.enum_values[h], k.id = b, k.addEventListener("change", u, !1), this.radioGroup.push(k);
            var S = document.createElement("label");
            S.htmlFor = b, S.title = this.enum_values[h], this.options.displayValue && S.classList.add("starrating-display-enabled");
            var I = this.theme.getHiddenText("label");
            I.textContent = h, S.appendChild(I), this.ratingContainer.appendChild(k), this.ratingContainer.appendChild(S);
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
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), oo(ln(r.prototype), "destroy", this).call(this);
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
          oo(ln(r.prototype), "setValue", this).call(this, this.value);
        } }]) && Ad(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function ni(o) {
        return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ni(o);
      }
      function Bd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Nd(a.key), a);
        }
      }
      function Nd(o) {
        var r = function(n, a) {
          if (ni(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ni(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ni(r) == "symbol" ? r : r + "";
      }
      function Fd(o, r, n) {
        return r = Wr(r), function(a, e) {
          if (e && (ni(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Cl() ? Reflect.construct(r, n || [], Wr(o).constructor) : r.apply(o, n));
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
      function Ti() {
        return Ti = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ti.apply(this, arguments);
      }
      function Wr(o) {
        return Wr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wr(o);
      }
      function bs(o, r) {
        return bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, bs(o, r);
      }
      Ol.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var Dd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && bs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          Ti(Wr(r.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var e = this.theme.getStepperButtons(this.input);
          this.control.appendChild(e), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          Ti(Wr(r.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          Ti(Wr(r.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && Bd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(ol);
      function ii(o) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ii(o);
      }
      function Md(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Hd(a.key), a);
        }
      }
      function Hd(o) {
        var r = function(n, a) {
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
      function Vd(o, r, n) {
        return r = tr(r), function(a, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, El() ? Reflect.construct(r, n || [], tr(o).constructor) : r.apply(o, n));
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
      function un() {
        return un = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = tr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, un.apply(this, arguments);
      }
      function tr(o) {
        return tr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, tr(o);
      }
      function vs(o, r) {
        return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, vs(o, r);
      }
      var zd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Vd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vs(e, t);
        }(r, o), n = r, a = [{ key: "register", value: function() {
          if (un(tr(r.prototype), "register", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].register();
        } }, { key: "unregister", value: function() {
          if (un(tr(r.prototype), "unregister", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var e = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = e.title || "row", this.item_default = e.default || null, this.item_has_child_editors = e.properties || e.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, un(tr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          this.tableContainer = this.theme.getTableContainer(), this.table = this.theme.getTable(), this.tableContainer.appendChild(this.table), this.container.appendChild(this.tableContainer), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
          var e = this.getElementEditor(0, !0);
          if (this.item_default = e.getDefault(), this.width = e.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.tableContainer), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls), this.item_has_child_editors) for (var t = e.getChildEditors(), i = e.property_order || Object.keys(t), u = 0; u < i.length; u++) {
            var h = this.theme.getTableHeaderCell(t[i[u]].getTitle());
            t[i[u]].options.hidden && (h.style.display = "none"), this.header_row.appendChild(h);
          }
          else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
          e.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(this.translate("table_controls")), this.controls_header_cell.setAttribute("aria-hidden", "true"), this.controls_header_cell.style.visibility = "hidden", this.header_row.appendChild(this.controls_header_cell), this.addControls();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), un(tr(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemDefault", value: function() {
          return v({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = v({}, this.schema.items), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.row_holder.appendChild(this.theme.getTableRow()), b = h;
          this.item_has_child_editors || (b = this.theme.getTableCell(), h.appendChild(b));
          var k = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: b, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
          return k.preBuild(), t || (k.build(), k.postBuild(), k.controls_cell = h.appendChild(this.theme.getTableCell()), k.row = h, k.table_controls = this.theme.getButtonHolder(), k.controls_cell.appendChild(k.table_controls), k.table_controls.style.margin = 0, k.table_controls.style.padding = 0), k;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, un(tr(r.prototype), "destroy", this).call(this);
        } }, { key: "ensureArraySize", value: function(e) {
          if (Array.isArray(e) || (e = [e]), this.schema.minItems) for (; e.length < this.schema.minItems; ) e.push(this.getItemDefault());
          return this.schema.maxItems && e.length > this.schema.maxItems && (e = e.slice(0, this.schema.maxItems)), e;
        } }, { key: "setValue", value: function() {
          var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (t = this.applyConstFilter(t), t = this.ensureArraySize(t), JSON.stringify(t) !== this.serialized) {
            var u = !1;
            t.forEach(function(k, S) {
              e.rows[S] ? e.rows[S].setValue(k) : (e.addRow(k), u = !0);
            });
            for (var h = t.length; h < this.rows.length; h++) {
              var b = this.rows[h].container;
              this.item_has_child_editors || this.rows[h].row.parentNode.removeChild(this.rows[h].row), this.rows[h].destroy(), b.parentNode && b.parentNode.removeChild(b), this.rows[h] = null, u = !0;
            }
            this.rows = this.rows.slice(0, t.length), this.refreshValue(), (u || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var e = this, t = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, u = [];
          this.rows.forEach(function($, G) {
            if ($.delete_button) {
              var ee = !t;
              e.setButtonState($.delete_button, ee), u.push(ee);
            }
            if ($.copy_button) {
              var pe = !i;
              e.setButtonState($.copy_button, pe), u.push(pe);
            }
            if ($.moveup_button) {
              var _e = G !== 0;
              e.setButtonState($.moveup_button, _e), u.push(_e);
            }
            if ($.movedown_button) {
              var we = G !== e.rows.length - 1;
              e.setButtonState($.movedown_button, we), u.push(we);
            }
          });
          var h = u.some(function($) {
            return $;
          });
          this.rows.forEach(function($) {
            return e.setButtonState($.controls_cell, h);
          }), this.setButtonState(this.controls_header_cell, h), this.setButtonState(this.table, this.value.length);
          var b = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, b);
          var k = !(!this.value.length || t || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, k);
          var S = !(this.value.length <= 1 || t || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, S);
          var I = b || k || S;
          this.setButtonState(this.controls, I);
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
          var i = this, u = this.getButton("", "delete", "button_delete_row_title_short");
          return u.classList.add("delete", "json-editor-btntype-delete"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue(), S = i.getValue()[b];
            k.splice(b, 1), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("deleteRow", S);
          }), t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton("", "copy", "button_copy_row_title_short"), h = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation();
            var k = 1 * b.currentTarget.getAttribute("data-i"), S = i.getValue(), I = S[k];
            h.items.type === "string" && h.items.format === "uuid" ? I = L() : h.items.type === "object" && h.items.properties && S.forEach(function($, G) {
              if (k === G) for (var ee = 0, pe = Object.keys($); ee < pe.length; ee++) {
                var _e = pe[ee];
                h.items.properties && h.items.properties[_e] && h.items.properties[_e].format === "uuid" && ((I = Object.assign({}, S[k]))[_e] = L());
              }
            }), S.splice(k + 1, 0, I), i.setValue(S), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[k + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            k.splice(b - 1, 0, k.splice(b, 1)[0]), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var b = 1 * h.currentTarget.getAttribute("data-i"), k = i.getValue();
            k.splice(b + 1, 0, k.splice(b, 1)[0]), i.setValue(k), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          le(e, function(i, u) {
            var h = t.getValue(), b = h[i];
            h.splice(i, 1), h.splice(u, 0, b), t.setValue(h), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[u]);
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
            var u = e.addRow();
            e.refreshValue(), e.refreshRowButtons(), e.onChange(!0), e.jsoneditor.trigger("addRow", u);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue(), h = u.pop();
            e.setValue(u), e.onChange(!0), e.jsoneditor.trigger("deleteRow", h);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue();
            e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", u);
          }), this.controls.appendChild(t), t;
        } }], a && Md(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(de);
      function oi(o) {
        return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, oi(o);
      }
      function qd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ud(a.key), a);
        }
      }
      function Ud(o) {
        var r = function(n, a) {
          if (oi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (oi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return oi(r) == "symbol" ? r : r + "";
      }
      function $d(o, r, n) {
        return r = Jr(r), function(a, e) {
          if (e && (oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Sl() ? Reflect.construct(r, n || [], Jr(o).constructor) : r.apply(o, n));
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
      function Li() {
        return Li = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Li.apply(this, arguments);
      }
      function Jr(o) {
        return Jr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jr(o);
      }
      function gs(o, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, gs(o, r);
      }
      function si(o) {
        return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, si(o);
      }
      function Gd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Wd(a.key), a);
        }
      }
      function Wd(o) {
        var r = function(n, a) {
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
      function Jd(o, r, n) {
        return r = Kr(r), function(a, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Pl() ? Reflect.construct(r, n || [], Kr(o).constructor) : r.apply(o, n));
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
      function Ai() {
        return Ai = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ai.apply(this, arguments);
      }
      function Kr(o) {
        return Kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kr(o);
      }
      function _s(o, r) {
        return _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, _s(o, r);
      }
      function ai(o) {
        return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ai(o);
      }
      function Kd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Zd(a.key), a);
        }
      }
      function Zd(o) {
        var r = function(n, a) {
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
      function Yd(o, r, n) {
        return r = rr(r), function(a, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Tl() ? Reflect.construct(r, n || [], rr(o).constructor) : r.apply(o, n));
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
      function cn() {
        return cn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = rr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, cn.apply(this, arguments);
      }
      function rr(o) {
        return rr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, rr(o);
      }
      function ws(o, r) {
        return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ws(o, r);
      }
      g(9868);
      var so = { ace: tt, array: de, arrayChoices: en, arraySelect2: qc, arraySelectize: Wc, autocomplete: Yc, base64: th, button: $a, checkbox: lh, choices: Ka, datetime: vh, describedBy: jh, enum: Ch, hidden: Th, info: Ih, integer: ol, ip: Uh, jodit: Jh, multiple: td, multiselect: Ae, null: od, number: nl, object: bl, radio: hd, sceditor: yd, select: Ci, select2: gd, selectize: kd, signature: Ed, simplemde: Ld, starrating: Ol, stepper: Dd, string: fe, table: zd, upload: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), $d(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", v({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(u, h, b, k) {
            window.alert('No upload_handler defined for "'.concat(u.path, '". You must create your own handler to enable upload to server'));
          } }, this.defaults.options.upload || {}, this.options.upload || {})), this.options.mime_type = this.options.mime_type ? [].concat(this.options.mime_type) : [], this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
            if (typeof this.options.upload_handler != "function") throw new Error("Upload handler required for upload editor");
            if (this.uploader = this.theme.getFormInputField("file"), this.uploader.style.display = "none", this.options.mime_type.length && this.uploader.setAttribute("accept", this.options.mime_type), this.options.enable_drag_drop === !0 && this.options.hide_input === !0 || (this.clickHandler = function(u) {
              e.uploader.dispatchEvent(new window.MouseEvent("click", { view: window, bubbles: !0, cancelable: !1 }));
            }, this.browseButton = this.getButton(this.options.title, this.options.icon, this.options.title), this.browseButton.addEventListener("click", this.clickHandler), this.fileDisplay = this.theme.getFormInputField("input"), this.fileDisplay.setAttribute("readonly", !0), this.fileDisplay.value = "No file selected.", this.fileDisplay.addEventListener("dblclick", this.clickHandler), this.fileUploadGroup = this.theme.getInputGroup(this.fileDisplay, [this.browseButton]), this.fileUploadGroup || (this.fileUploadGroup = document.createElement("div"), this.fileUploadGroup.appendChild(this.fileDisplay), this.fileUploadGroup.appendChild(this.browseButton))), this.options.enable_drag_drop === !0) {
              if (this.options.alt_drop_zone !== "") {
                if (this.altDropZone = document.querySelector(this.options.alt_drop_zone), !this.altDropZone) throw new Error('Error: alt_drop_zone selector "'.concat(this.options.alt_drop_zone, '" not found!'));
                this.dropZone = this.altDropZone;
              } else this.dropZone = this.theme.getDropZone(this.options.drop_zone_text);
              this.dropZone && (this.dropZone.classList.add("upload-dropzone"), this.dropZone.addEventListener("dblclick", this.clickHandler));
            }
            this.uploadHandler = function(u) {
              u.preventDefault(), u.stopPropagation();
              var h = u.target.files || u.dataTransfer.files;
              if (h && h.length) if (e.options.max_upload_size !== 0 && h[0].size > e.options.max_upload_size) e.theme.addInputError(e.uploader, "".concat(e.translate("upload_max_size"), " ").concat(e.options.max_upload_size));
              else if (e.options.mime_type.length === 0 || e.isValidMimeType(h[0].type, e.options.mime_type)) {
                e.fileDisplay && (e.fileDisplay.value = h[0].name);
                var b = new window.FileReader();
                b.onload = function(k) {
                  e.preview_value = k.target.result, e.refreshPreview(h), e.onChange(!0), b = null;
                }, b.readAsDataURL(h[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(u) {
              var h = u.dataTransfer.items || u.dataTransfer.files, b = h && h.length && (e.options.mime_type.length === 0 || e.isValidMimeType(h[0].type, e.options.mime_type)), k = u.currentTarget.classList && u.currentTarget.classList.contains("upload-dropzone") && b;
              switch ((u.currentTarget === window ? "w_" : "e_") + u.type) {
                case "w_drop":
                case "w_dragover":
                  k || (u.dataTransfer.dropEffect = "none");
                  break;
                case "e_dragenter":
                  k ? (e.dropZone.classList.add("valid-dropzone"), u.dataTransfer.dropEffect = "copy") : e.dropZone.classList.add("invalid-dropzone");
                  break;
                case "e_dragover":
                  k && (u.dataTransfer.dropEffect = "copy");
                  break;
                case "e_dragleave":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone");
                  break;
                case "e_drop":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone"), k && e.uploadHandler(u);
              }
              k || u.preventDefault();
            }, this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(u) {
              window.addEventListener(u, e.dragHandler, !0);
            }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(u) {
              e.dropZone.addEventListener(u, e.dragHandler, !0);
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
            var i = e[0], u = this.preview_value.match(/^data:([^;,]+)[;,]/);
            if (i.mimeType = u ? u[1] : "unknown", i.size > 0) {
              var h = Math.floor(Math.log(i.size) / Math.log(1024));
              i.formattedSize = "".concat(parseFloat((i.size / Math.pow(1024, h)).toFixed(2)), " ").concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][h]);
            } else i.formattedSize = "0 Bytes";
            var b = this.getButton("button_upload", "upload", "button_upload");
            b.addEventListener("click", function(k) {
              k.preventDefault(), b.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.options.upload_handler(t.path, i, { success: function(S) {
                t.setValue(S), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, failure: function(S) {
                t.theme.addInputError(t.uploader, S), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, updateProgress: function(S) {
                t.progressBar && (S ? t.theme.updateProgressBar(t.progressBar, S) : t.theme.updateProgressBarUnknown(t.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, b, this.preview_value)), this.options.auto_upload && (b.dispatchEvent(new window.MouseEvent("click")), b.parentNode.removeChild(b));
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Li(Jr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Li(Jr(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.input.value = this.value, this.onChange());
        } }, { key: "destroy", value: function() {
          var e = this;
          this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(t) {
            window.removeEventListener(t, e.dragHandler, !0);
          }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(t) {
            e.dropZone.removeEventListener(t, e.dragHandler, !0);
          }), this.dropZone.removeEventListener("dblclick", this.clickHandler), this.dropZone && this.dropZone.parentNode && this.dropZone.parentNode.removeChild(this.dropZone)), this.uploader && this.uploader.parentNode && (this.uploader.removeEventListener("change", this.uploadHandler), this.uploader.parentNode.removeChild(this.uploader)), this.browseButton && this.browseButton.parentNode && (this.browseButton.removeEventListener("click", this.clickHandler), this.browseButton.parentNode.removeChild(this.browseButton)), this.fileDisplay && this.fileDisplay.parentNode && (this.fileDisplay.removeEventListener("dblclick", this.clickHandler), this.fileDisplay.parentNode.removeChild(this.fileDisplay)), this.fileUploadGroup && this.fileUploadGroup.parentNode && this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup), this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.header && this.header.parentNode && this.header.parentNode.removeChild(this.header), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Li(Jr(r.prototype), "destroy", this).call(this);
        } }, { key: "isValidMimeType", value: function(e, t) {
          return t.reduce(function(i, u) {
            return i || new RegExp(u.replace(/\*/g, ".*"), "gi").test(e);
          }, !1);
        } }]) && qd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(U), uuid: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Jd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _s(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          Ai(Kr(r.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          Ai(Kr(r.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.testUuid(e) || (e = this.uuid), e;
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e), this.testUuid(e) || (e = this.uuid), this.uuid = e, Ai(Kr(r.prototype), "setValue", this).call(this, e, t, i);
        } }, { key: "getUuid", value: function() {
          return L();
        } }, { key: "testUuid", value: function(e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e);
        } }]) && Gd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe), colorpicker: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ws(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = cn(rr(r.prototype), "setValue", this).call(this, e, t, i);
          return this.picker_instance && this.picker_instance.domElement && u && u.changed && this.picker_instance.setColor(u.value, !0), u;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          cn(rr(r.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (cn(rr(r.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (cn(rr(r.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), cn(rr(r.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(e) {
          var t = this;
          if (e) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", v({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), u = function(h) {
                var b = t.picker_instance.settings.editorFormat, k = t.picker_instance.settings.alpha;
                t.setValue(b === "hex" ? k ? h.hex : h.hex.slice(0, 7) : h["".concat(b + (k ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = u) : i.onChange = u, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && Kd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe) };
      function Ll(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      var Al = {}, js = "en", Qd = js;
      Al.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(so).forEach(function(o) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, u) {
            var h = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (h != null) {
              var b, k, S, I, $ = [], G = !0, ee = !1;
              try {
                if (S = (h = h.call(i)).next, u !== 0) for (; !(G = (b = S.call(h)).done) && ($.push(b.value), $.length !== u); G = !0) ;
              } catch (pe) {
                ee = !0, k = pe;
              } finally {
                try {
                  if (!G && h.return != null && (I = h.return(), Object(I) !== I)) return;
                } finally {
                  if (ee) throw k;
                }
              }
              return $;
            }
          }(e, t) || function(i, u) {
            if (i) {
              if (typeof i == "string") return Ll(i, u);
              var h = Object.prototype.toString.call(i).slice(8, -1);
              return h === "Object" && i.constructor && (h = i.constructor.name), h === "Map" || h === "Set" ? Array.from(i) : h === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h) ? Ll(i, u) : void 0;
            }
          }(e, t) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(o, 2), n = r[0], a = r[1];
        so[n].options = a.options || {};
      });
      var hn = { options: { upload: function(o, r, n) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: so, languages: Al, resolvers: w, custom_validators: [], default_language: js, language: Qd, translate: function(o, r, n) {
        var a = {};
        n && n.options && n.options.error_messages && n.options.error_messages[hn.language] && (a = n.options.error_messages[hn.language]);
        var e = hn.languages[hn.language];
        if (!e) throw new Error("Unknown language ".concat(hn.language));
        var t = a[o] || e[o] || hn.languages[js][o] || o;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(o, r) {
        return o;
      } };
      function dn() {
        dn = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(q, z, J) {
          q[z] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", h = t.toStringTag || "@@toStringTag";
        function b(q, z, J) {
          return Object.defineProperty(q, z, { value: J, enumerable: !0, configurable: !0, writable: !0 }), q[z];
        }
        try {
          b({}, "");
        } catch {
          b = function(z, J, ge) {
            return z[J] = ge;
          };
        }
        function k(q, z, J, ge) {
          var se = z && z.prototype instanceof _e ? z : _e, Le = Object.create(se.prototype), $e = new ar(ge || []);
          return e(Le, "_invoke", { value: xt(q, J, $e) }), Le;
        }
        function S(q, z, J) {
          try {
            return { type: "normal", arg: q.call(z, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = k;
        var I = "suspendedStart", $ = "suspendedYield", G = "executing", ee = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var Fe = {};
        b(Fe, i, function() {
          return this;
        });
        var Me = Object.getPrototypeOf, ve = Me && Me(Me(Ot([])));
        ve && ve !== n && a.call(ve, i) && (Fe = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(Fe);
        function Ke(q) {
          ["next", "throw", "return"].forEach(function(z) {
            b(q, z, function(J) {
              return this._invoke(z, J);
            });
          });
        }
        function nt(q, z) {
          function J(se, Le, $e, it) {
            var ot = S(q[se], q, Le);
            if (ot.type !== "throw") {
              var Rt = ot.arg, Gt = Rt.value;
              return Gt && bt(Gt) == "object" && a.call(Gt, "__await") ? z.resolve(Gt.__await).then(function(Ct) {
                J("next", Ct, $e, it);
              }, function(Ct) {
                J("throw", Ct, $e, it);
              }) : z.resolve(Gt).then(function(Ct) {
                Rt.value = Ct, $e(Rt);
              }, function(Ct) {
                return J("throw", Ct, $e, it);
              });
            }
            it(ot.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new z(function(it, ot) {
                J(se, Le, it, ot);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function xt(q, z, J) {
          var ge = I;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === ee) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (J.method = se, J.arg = Le; ; ) {
              var $e = J.delegate;
              if ($e) {
                var it = Zr($e, J);
                if (it) {
                  if (it === pe) continue;
                  return it;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === I) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var ot = S(q, z, J);
              if (ot.type === "normal") {
                if (ge = J.done ? ee : $, ot.arg === pe) continue;
                return { value: ot.arg, done: J.done };
              }
              ot.type === "throw" && (ge = ee, J.method = "throw", J.arg = ot.arg);
            }
          };
        }
        function Zr(q, z) {
          var J = z.method, ge = q.iterator[J];
          if (ge === o) return z.delegate = null, J === "throw" && q.iterator.return && (z.method = "return", z.arg = o, Zr(q, z), z.method === "throw") || J !== "return" && (z.method = "throw", z.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = S(ge, q.iterator, z.arg);
          if (se.type === "throw") return z.method = "throw", z.arg = se.arg, z.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (z[q.resultName] = Le.value, z.next = q.nextLoc, z.method !== "return" && (z.method = "next", z.arg = o), z.delegate = null, pe) : Le : (z.method = "throw", z.arg = new TypeError("iterator result is not an object"), z.delegate = null, pe);
        }
        function bi(q) {
          var z = { tryLoc: q[0] };
          1 in q && (z.catchLoc = q[1]), 2 in q && (z.finallyLoc = q[2], z.afterLoc = q[3]), this.tryEntries.push(z);
        }
        function Ne(q) {
          var z = q.completion || {};
          z.type = "normal", delete z.arg, q.completion = z;
        }
        function ar(q) {
          this.tryEntries = [{ tryLoc: "root" }], q.forEach(bi, this), this.reset(!0);
        }
        function Ot(q) {
          if (q || q === "") {
            var z = q[i];
            if (z) return z.call(q);
            if (typeof q.next == "function") return q;
            if (!isNaN(q.length)) {
              var J = -1, ge = function se() {
                for (; ++J < q.length; ) if (a.call(q, J)) return se.value = q[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(bt(q) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, h, "GeneratorFunction"), r.isGeneratorFunction = function(q) {
          var z = typeof q == "function" && q.constructor;
          return !!z && (z === we || (z.displayName || z.name) === "GeneratorFunction");
        }, r.mark = function(q) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(q, Ie) : (q.__proto__ = Ie, b(q, h, "GeneratorFunction")), q.prototype = Object.create(xe), q;
        }, r.awrap = function(q) {
          return { __await: q };
        }, Ke(nt.prototype), b(nt.prototype, u, function() {
          return this;
        }), r.AsyncIterator = nt, r.async = function(q, z, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new nt(k(q, z, J, ge), se);
          return r.isGeneratorFunction(z) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), b(xe, h, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(q) {
          var z = Object(q), J = [];
          for (var ge in z) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in z) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ot, ar.prototype = { constructor: ar, reset: function(q) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !q) for (var z in this) z.charAt(0) === "t" && a.call(this, z) && !isNaN(+z.slice(1)) && (this[z] = o);
        }, stop: function() {
          this.done = !0;
          var q = this.tryEntries[0].completion;
          if (q.type === "throw") throw q.arg;
          return this.rval;
        }, dispatchException: function(q) {
          if (this.done) throw q;
          var z = this;
          function J(ot, Rt) {
            return Le.type = "throw", Le.arg = q, z.next = ot, Rt && (z.method = "next", z.arg = o), !!Rt;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), it = a.call(se, "finallyLoc");
              if ($e && it) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!it) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(q, z) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (q === "break" || q === "continue") && se.tryLoc <= z && z <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = q, Le.arg = z, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function(q, z) {
          if (q.type === "throw") throw q.arg;
          return q.type === "break" || q.type === "continue" ? this.next = q.arg : q.type === "return" ? (this.rval = this.arg = q.arg, this.method = "return", this.next = "end") : q.type === "normal" && z && (this.next = z), pe;
        }, finish: function(q) {
          for (var z = this.tryEntries.length - 1; z >= 0; --z) {
            var J = this.tryEntries[z];
            if (J.finallyLoc === q) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function(q) {
          for (var z = this.tryEntries.length - 1; z >= 0; --z) {
            var J = this.tryEntries[z];
            if (J.tryLoc === q) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(q, z, J) {
          return this.delegate = { iterator: Ot(q), resultName: z, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function Rl(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), h = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(h) : Promise.resolve(h).then(a, e);
      }
      function Il(o) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(a, e) {
            var t = o.apply(r, n);
            function i(h) {
              Rl(t, a, e, i, u, "next", h);
            }
            function u(h) {
              Rl(t, a, e, i, u, "throw", h);
            }
            i(void 0);
          });
        };
      }
      function pn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, h, b = [], k = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(k = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); k = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!k && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return Bl(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Bl(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Bl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function bt(o) {
        return bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bt(o);
      }
      function Xd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ep(a.key), a);
        }
      }
      function ep(o) {
        var r = function(n, a) {
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
      g(1688);
      var tp = function() {
        return o = function e(t) {
          (function(i, u) {
            if (!(i instanceof u)) throw new TypeError("Cannot call a class as a function");
          })(this, e), this.options = t || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            bt(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            bt(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var u = this;
            Object.entries(i.anyOf).forEach(function(h) {
              var b = pn(h, 2), k = b[0], S = b[1];
              i.anyOf[k] = u.expandSchema(S);
            });
          }, dependencies: function(i) {
            var u = this;
            Object.entries(i.dependencies).forEach(function(h) {
              var b = pn(h, 2), k = b[0], S = b[1];
              bt(S) !== "object" || Array.isArray(S) || (i.dependencies[k] = u.expandSchema(S));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, u) {
            var h = this, b = v({}, u);
            return Object.entries(i.allOf).forEach(function(k) {
              var S = pn(k, 2), I = S[0], $ = S[1];
              i.allOf[I] = h.expandRefs($, !0), b = h.extendSchemas(b, h.expandSchema($));
            }), delete b.allOf, b;
          }, extends: function(i, u) {
            var h, b = this;
            return delete (h = Array.isArray(i.extends) ? i.extends.reduce(function(k, S, I) {
              return b.extendSchemas(k, b.expandSchema(S));
            }, u) : this.extendSchemas(u, this.expandSchema(i.extends))).extends, h;
          }, oneOf: function(i, u) {
            var h = this, b = v({}, u);
            return delete b.oneOf, i.oneOf.reduce(function(k, S, I) {
              return k.oneOf[I] = h.extendSchemas(h.expandSchema(S), b), k;
            }, u), u;
          } };
        }, r = [{ key: "load", value: (a = Il(dn().mark(function e(t, i, u) {
          return dn().wrap(function(h) {
            for (; ; ) switch (h.prev = h.next) {
              case 0:
                return this.schema = t, h.next = 3, this._asyncloadExternalRefs(t, i, this._getFileBase(u), !0);
              case 3:
                return h.abrupt("return", this.expandRefs(t));
              case 4:
              case "end":
                return h.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return a.apply(this, arguments);
        }) }, { key: "expandRefs", value: function(e, t) {
          var i = this, u = v({}, e);
          if (!u.$ref) return u;
          var h = u.$ref.split("#");
          if (h.length === 2 && !this.refs_with_info[u.$ref]) {
            var b = this.expandRecursivePointer(this.schema, h[1]), k = this.extendSchemas(u, this.expandSchema(b));
            return delete k.$ref, k;
          }
          var S = h.length > 2 ? this.refs_with_info["#" + h[1]] : this.refs_with_info[u.$ref];
          delete u.$ref;
          var I = S.$ref.startsWith("#") ? S.fetchUrl : "", $ = this._getRef(I, S);
          if (this.refs[$]) {
            if (t && x(this.refs[$], "allOf")) {
              var G = this.refs[$].allOf;
              Object.keys(G).forEach(function(ee) {
                G[ee] = i.expandRefs(G[ee], !0);
              });
            }
          } else console.warn("reference:'".concat($, "' not found!"));
          return h.length > 2 ? this.extendSchemas(u, this.expandSchema(this.expandRecursivePointer(this.refs[$], h[2]))) : this.extendSchemas(u, this.expandSchema(this.refs[$]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(u) {
            i[u] && (i = i[u]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(u) {
            var h = pn(u, 2), b = h[0], k = h[1];
            e[b] && k.call(t, e);
          });
          var i = v({}, e);
          return Object.entries(this._subSchema2).forEach(function(u) {
            var h = pn(u, 2), b = h[0], k = h[1];
            e[b] && (i = k.call(t, e, i));
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
          var i = this, u = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
          u || this._manageRecursivePointer(e, t);
          var h = {}, b = function(G) {
            return Object.keys(G).forEach(function(ee) {
              h[ee] = !0;
            });
          };
          if (e.$ref && bt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !u)) {
            var k = e.$ref, S = "";
            k.indexOf("#") > 0 && (k = k.substr(0, k.indexOf("#"))), k !== e.$ref && (S = e.$ref.substr(e.$ref.indexOf("#")));
            var I = this.refs_prefix + this.refs_counter++, $ = I + S;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (h[k] = !0), this.refs_with_info[I] = { fetchUrl: t, $ref: k }, e.$ref = $;
          }
          return Object.values(e).forEach(function(G) {
            G && bt(G) === "object" && (Array.isArray(G) ? Object.values(G).forEach(function(ee) {
              ee && bt(ee) === "object" && b(i._getExternalRefs(ee, t, u));
            }) : G.$ref && typeof G.$ref == "string" && G.$ref.startsWith("#") || b(i._getExternalRefs(G, t, u)));
          }), e.id && typeof e.id == "string" && e.id.substr(0, 4) === "urn:" ? this.refs[e.id] = e : e.$id && typeof e.$id == "string" && e.$id.substr(0, 4) === "urn:" && (this.refs[e.$id] = e), h;
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
        } }, { key: "_asyncloadExternalRefs", value: (n = Il(dn().mark(function e(t, i, u) {
          var h, b, k, S, I, $, G = this, ee = arguments;
          return dn().wrap(function(pe) {
            for (; ; ) switch (pe.prev = pe.next) {
              case 0:
                h = ee.length > 3 && ee[3] !== void 0 && ee[3], b = this._getExternalRefs(t, i, h), k = 0, S = dn().mark(function _e() {
                  var we, Ie, Fe, Me, ve, xe, Ke, nt, xt, Zr, bi;
                  return dn().wrap(function(Ne) {
                    for (; ; ) switch (Ne.prev = Ne.next) {
                      case 0:
                        if ((we = $[I]) !== void 0) {
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
                        if (G.refs[we] = "loading", k++, Ie = G.options.urn_resolver, Fe = we, typeof Ie == "function") {
                          Ne.next = 13;
                          break;
                        }
                        throw console.log('No "urn_resolver" callback defined to resolve "'.concat(Fe, '"')), new Error("Must set urn_resolver option to a callback to resolve ".concat(Fe));
                      case 13:
                        return Fe.indexOf("#") > 0 && (Fe = Fe.substr(0, Fe.indexOf("#"))), Ne.prev = 14, Ne.next = 17, Ie(Fe);
                      case 17:
                        Me = Ne.sent, Ne.prev = 18, ve = JSON.parse(Me), Ne.next = 26;
                        break;
                      case 22:
                        throw Ne.prev = 22, Ne.t0 = Ne.catch(18), console.log(Ne.t0), new Error("Failed to parse external ref ".concat(Fe));
                      case 26:
                        if (!(typeof ve != "boolean" && bt(ve) !== "object" || ve === null || Array.isArray(ve))) {
                          Ne.next = 28;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(Fe));
                      case 28:
                        return G.refs[we] = ve, Ne.next = 31, G._asyncloadExternalRefs(ve, we, u);
                      case 31:
                        Ne.next = 37;
                        break;
                      case 33:
                        throw Ne.prev = 33, Ne.t1 = Ne.catch(14), console.log(Ne.t1), new Error("Failed to parse external ref ".concat(Fe));
                      case 37:
                        if (typeof Me != "boolean") {
                          Ne.next = 39;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(Fe));
                      case 39:
                        return Ne.abrupt("return", 0);
                      case 40:
                        if (G.options.ajax) {
                          Ne.next = 42;
                          break;
                        }
                        throw new Error("Must set ajax option to true to load external ref ".concat(we));
                      case 42:
                        if (k++, xe = G._joinUrl(we, u), G.options.ajax_cache_responses && (nt = G.cacheGet(xe)) && (Ke = nt), Ke) {
                          Ne.next = 61;
                          break;
                        }
                        return Ne.next = 48, new Promise(function(ar) {
                          var Ot = new XMLHttpRequest();
                          G.options.ajaxCredentials && (Ot.withCredentials = G.options.ajaxCredentials), Ot.overrideMimeType("application/json"), Ot.open("GET", xe, !0), Ot.onload = function() {
                            ar(Ot);
                          }, Ot.onerror = function(q) {
                            ar(void 0);
                          }, Ot.send();
                        });
                      case 48:
                        if ((xt = Ne.sent) !== void 0) {
                          Ne.next = 51;
                          break;
                        }
                        throw new Error("Failed to fetch ref via ajax - ".concat(we));
                      case 51:
                        Ne.prev = 51, Ke = JSON.parse(xt.responseText), G.onSchemaLoaded({ schema: Ke, schemaUrl: xe }), G.options.ajax_cache_responses && G.cacheSet(xe, Ke), Ne.next = 61;
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
                        return G.refs[we] = Ke, Zr = G._getFileBaseFromFileLocation(xe), xe !== we && (bi = xe.split("/"), xe = (we.substr(0, 1) === "/" ? "/" : "") + bi.pop()), Ne.next = 68, G._asyncloadExternalRefs(Ke, xe, Zr);
                      case 68:
                      case "end":
                        return Ne.stop();
                    }
                  }, _e, null, [[14, 33], [18, 22], [51, 57]]);
                }), I = 0, $ = Object.keys(b);
              case 5:
                if (!(I < $.length)) {
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
                I++, pe.next = 5;
                break;
              case 13:
                if (k) {
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
          var u = {}, h = function(b) {
            typeof b == "string" && (b = [b]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? u.type = b.filter(function(k) {
              return t.type.includes(k);
            }) : u.type = b, u.type.length === 1 && typeof u.type[0] == "string" ? u.type = u.type[0] : u.type.length === 0 && delete u.type;
          };
          return Object.entries(e).forEach(function(b) {
            var k = pn(b, 2), S = k[0], I = k[1];
            t[S] !== void 0 ? function($, G) {
              (function(ee, pe) {
                return (ee === "required" || ee === "defaultProperties") && bt(pe) === "object" && Array.isArray(pe);
              })($, G) ? u[$] = G.concat(t[$]).reduce(function(ee, pe) {
                return ee.includes(pe) || ee.push(pe), ee;
              }, []) : $ !== "type" || typeof G != "string" && !Array.isArray(G) ? bt(G) !== "object" || Array.isArray(G) || G === null ? u[$] = G : u[$] = i.extendSchemas(G, t[$]) : h(G);
            }(S, I) : u[S] = I;
          }), Object.entries(t).forEach(function(b) {
            var k = pn(b, 2), S = k[0], I = k[1];
            e[S] === void 0 && (u[S] = I);
          }), u;
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
          } catch (u) {
            console.error(u);
          }
        } }, { key: "cacheDelete", value: function(e) {
          window.localStorage.removeItem(this.getCacheKey(e));
        } }], r && Xd(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r, n, a;
      }(), rp = (g(2762), { default: function() {
        return { compile: function(o) {
          var r = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return o;
          };
          for (var a = [], e = function(i) {
            var u, h, b = r[i].replace(/[{}]+/g, "").trim().split("."), k = b.length;
            k > 1 ? u = function(S) {
              for (h = S, i = 0; i < k && (h = h[b[i]]); i++) ;
              return h;
            } : (b = b[0], u = function(S) {
              return S[b];
            }), a.push({ s: r[i], r: u });
          }, t = 0; t < n; t++) e(t);
          return function(i) {
            for (var u, h = "".concat(o), b = 0; b < n; b++) u = a[b], h = h.replace(u.s, u.r(i));
            return h;
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
      function Ri(o) {
        return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ri(o);
      }
      function ks(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function np(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ip(a.key), a);
        }
      }
      function ip(o) {
        var r = function(n, a) {
          if (Ri(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ri(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ri(r) == "symbol" ? r : r + "";
      }
      var op = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, gr = function() {
        return o = function n() {
          var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : op;
          (function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.mapping = e, this.icon_prefix = a;
        }, (r = [{ key: "getIconClass", value: function(n) {
          return this.mapping[n] ? this.icon_prefix + this.mapping[n] : this.icon_prefix + n;
        } }, { key: "getIcon", value: function(n) {
          var a, e = this.getIconClass(n);
          if (!e) return null;
          var t, i = document.createElement("i");
          return (a = i.classList).add.apply(a, function(u) {
            if (Array.isArray(u)) return ks(u);
          }(t = e.split(" ")) || function(u) {
            if (typeof Symbol < "u" && u[Symbol.iterator] != null || u["@@iterator"] != null) return Array.from(u);
          }(t) || function(u, h) {
            if (u) {
              if (typeof u == "string") return ks(u, h);
              var b = Object.prototype.toString.call(u).slice(8, -1);
              return b === "Object" && u.constructor && (b = u.constructor.name), b === "Map" || b === "Set" ? Array.from(u) : b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b) ? ks(u, h) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && np(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function xs(o) {
        return xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, xs(o);
      }
      function sp(o, r, n) {
        return r = ao(r), function(a, e) {
          if (e && (xs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Nl() ? Reflect.construct(r, n || [], ao(o).constructor) : r.apply(o, n));
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
      function ao(o) {
        return ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ao(o);
      }
      function Os(o, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Os(o, r);
      }
      var ap = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, lp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), sp(this, r, ["glyphicon glyphicon-", ap]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Os(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Cs(o) {
        return Cs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Cs(o);
      }
      function up(o, r, n) {
        return r = lo(r), function(a, e) {
          if (e && (Cs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Fl() ? Reflect.construct(r, n || [], lo(o).constructor) : r.apply(o, n));
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
      function lo(o) {
        return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lo(o);
      }
      function Es(o, r) {
        return Es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Es(o, r);
      }
      var cp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, hp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), up(this, r, ["icon-", cp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Es(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Ss(o) {
        return Ss = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ss(o);
      }
      function dp(o, r, n) {
        return r = uo(r), function(a, e) {
          if (e && (Ss(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Dl() ? Reflect.construct(r, n || [], uo(o).constructor) : r.apply(o, n));
      }
      function Dl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Dl = function() {
          return !!o;
        })();
      }
      function uo(o) {
        return uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, uo(o);
      }
      function Ps(o, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ps(o, r);
      }
      var pp = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, fp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), dp(this, r, ["fa fa-", pp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ps(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Ts(o) {
        return Ts = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ts(o);
      }
      function yp(o, r, n) {
        return r = co(r), function(a, e) {
          if (e && (Ts(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ml() ? Reflect.construct(r, n || [], co(o).constructor) : r.apply(o, n));
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
      function co(o) {
        return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, co(o);
      }
      function Ls(o, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ls(o, r);
      }
      var mp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, bp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yp(this, r, ["fas fa-", mp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ls(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function As(o) {
        return As = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, As(o);
      }
      function vp(o, r, n) {
        return r = ho(r), function(a, e) {
          if (e && (As(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Hl() ? Reflect.construct(r, n || [], ho(o).constructor) : r.apply(o, n));
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
      function ho(o) {
        return ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ho(o);
      }
      function Rs(o, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Rs(o, r);
      }
      var gp = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, _p = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), vp(this, r, ["ui-icon ui-icon-", gp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Rs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Is(o) {
        return Is = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Is(o);
      }
      function wp(o, r, n) {
        return r = po(r), function(a, e) {
          if (e && (Is(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Vl() ? Reflect.construct(r, n || [], po(o).constructor) : r.apply(o, n));
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
      function po(o) {
        return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, po(o);
      }
      function Bs(o, r) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Bs(o, r);
      }
      var jp = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, kp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wp(this, r, ["oi oi-", jp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Bs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Ns(o) {
        return Ns = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ns(o);
      }
      function xp(o, r, n) {
        return r = fo(r), function(a, e) {
          if (e && (Ns(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, zl() ? Reflect.construct(r, n || [], fo(o).constructor) : r.apply(o, n));
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
      function fo(o) {
        return fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, fo(o);
      }
      function Fs(o, r) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Fs(o, r);
      }
      var Op = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, Cp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), xp(this, r, ["icon icon-", Op]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Fs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr);
      function Ds(o) {
        return Ds = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ds(o);
      }
      function Ep(o, r, n) {
        return r = yo(r), function(a, e) {
          if (e && (Ds(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ql() ? Reflect.construct(r, n || [], yo(o).constructor) : r.apply(o, n));
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
      function yo(o) {
        return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, yo(o);
      }
      function Ms(o, r) {
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ms(o, r);
      }
      var Sp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, Pp = { bootstrap: function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ep(this, r, ["bi bi-", Sp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ms(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(gr), bootstrap3: lp, fontawesome3: hp, fontawesome4: fp, fontawesome5: bp, jqueryui: _p, openiconic: kp, spectre: Cp };
      function Ii(o) {
        return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ii(o);
      }
      function Tp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Lp(a.key), a);
        }
      }
      function Lp(o) {
        var r = function(n, a) {
          if (Ii(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ii(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Ii(r) == "symbol" ? r : r + "";
      }
      var Ul = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
        return o in document.documentElement;
      }), _r = function() {
        return o = function n(a) {
          var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { disable_theme_rules: !1 };
          (function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = a, Object.keys(e).forEach(function(t) {
            a.options[t] !== void 0 && (e[t] = a.options[t]);
          }), this.options = e;
        }, r = [{ key: "getContainer", value: function() {
          return document.createElement("div");
        } }, { key: "getOptInCheckbox", value: function(n) {
          var a = document.createElement("span"), e = this.getHiddenLabel(n + " opt-in");
          e.setAttribute("for", n + "-opt-in"), e.textContent = n + "-opt-in";
          var t = document.createElement("input");
          return t.setAttribute("type", "checkbox"), t.setAttribute("style", "margin: 0 10px 0 0;"), t.setAttribute("id", n + "-opt-in"), t.classList.add("json-editor-opt-in"), a.appendChild(t), a.appendChild(e), { label: e, checkbox: t, container: a };
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
        } }, { key: "setGridColumnSize", value: function(n, a) {
        } }, { key: "getLink", value: function(n) {
          var a = document.createElement("a");
          return a.setAttribute("href", "#"), a.appendChild(document.createTextNode(n)), a;
        } }, { key: "disableHeader", value: function(n) {
          n.style.color = "#ccc";
        } }, { key: "disableLabel", value: function(n) {
          n.style.color = "#ccc";
        } }, { key: "enableHeader", value: function(n) {
          n.style.color = "";
        } }, { key: "enableLabel", value: function(n) {
          n.style.color = "";
        } }, { key: "getInfoButton", value: function(n) {
          var a = document.createElement("span");
          a.innerText = "ⓘ", a.classList.add("je-infobutton-icon");
          var e = document.createElement("span");
          return e.classList.add("je-infobutton-tooltip"), e.innerText = n, a.onmouseover = function() {
            e.style.visibility = "visible";
          }, a.onmouseleave = function() {
            e.style.visibility = "hidden";
          }, a.appendChild(e), a;
        } }, { key: "getFormInputLabel", value: function(n, a) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(n)), a && e.classList.add("required"), e;
        } }, { key: "getLabelLike", value: function(n, a) {
          var e = document.createElement("b");
          return e.appendChild(document.createTextNode(n)), a && e.classList.add("required"), e;
        } }, { key: "getHeader", value: function(n, a) {
          var e = document.createElement("span");
          return typeof n == "string" ? e.textContent = n : e.appendChild(n), e.classList.add("je-header"), e;
        } }, { key: "getCheckbox", value: function() {
          var n = this.getFormInputField("checkbox");
          return n.classList.add("je-checkbox"), n;
        } }, { key: "getCheckboxLabel", value: function(n, a) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(" ".concat(n))), a && e.classList.add("required"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(n, a, e, t) {
          var i = document.createElement("div");
          return i.classList.add("control-group"), a && (a.style.display = "block", i.appendChild(a), t && a.appendChild(t)), Object.values(n).forEach(function(u) {
            u.style.display = "inline-block", u.style.marginRight = "20px", i.appendChild(u);
          }), e && i.appendChild(e), i;
        } }, { key: "getFormCheckboxControl", value: function(n, a, e) {
          var t = document.createElement("div");
          return t.appendChild(n), a.style.width = "auto", n.insertBefore(a, n.firstChild), e && t.classList.add("je-checkbox-control--compact"), t;
        } }, { key: "getFormRadio", value: function(n) {
          var a = this.getFormInputField("radio");
          return Object.keys(n).forEach(function(e) {
            return a.setAttribute(e, n[e]);
          }), a.classList.add("je-radio"), a;
        } }, { key: "getFormRadioLabel", value: function(n, a) {
          var e = document.createElement("label");
          return e.appendChild(document.createTextNode(" ".concat(n))), a && e.classList.add("required"), e;
        } }, { key: "getFormRadioControl", value: function(n, a, e, t) {
          var i = document.createElement("div");
          return i.appendChild(n), a.style.width = "auto", n.insertBefore(a, n.firstChild), e && i.classList.add("je-radio-control--compact"), a.tagName.toLowerCase() !== "div" && t && n && a && (a.setAttribute("id", t), a.setAttribute("aria-labelledby", t), n.setAttribute("for", t)), i;
        } }, { key: "getSelectInput", value: function(n, a) {
          var e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], t = document.createElement("select");
          return n && this.setSelectOptions(t, n, [], e), t;
        } }, { key: "getSwitcher", value: function(n) {
          var a = this.getSelectInput(n, !1);
          return a.classList.add("je-switcher"), a;
        } }, { key: "getSwitcherOptions", value: function(n) {
          return n.getElementsByTagName("option");
        } }, { key: "setSwitcherOptions", value: function(n, a, e) {
          this.setSelectOptions(n, a, e);
        } }, { key: "setSelectOptions", value: function(n, a) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], t = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : " ";
          if (n.innerHTML = "", t) {
            var u = document.createElement("option");
            u.setAttribute("value", "_placeholder_"), u.textContent = i, u.setAttribute("disabled", ""), u.setAttribute("hidden", ""), n.appendChild(u);
          }
          for (var h = 0; h < a.length; h++) {
            var b = document.createElement("option");
            b.setAttribute("value", a[h]), b.textContent = e[h] || a[h], n.appendChild(b);
          }
        } }, { key: "getTextareaInput", value: function() {
          var n = document.createElement("textarea");
          return n.classList.add("je-textarea"), n;
        } }, { key: "getHiddenLabel", value: function(n) {
          var a = document.createElement("label");
          return a.textContent = n, a.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), a;
        } }, { key: "visuallyHidden", value: function(n) {
          n && n.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;");
        } }, { key: "getHiddenText", value: function(n) {
          var a = document.createElement("span");
          return a.textContent = n, a.setAttribute("style", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"), a;
        } }, { key: "getRangeInput", value: function(n, a, e, t, i) {
          var u = this.getFormInputField("range");
          return u.setAttribute("min", n), u.setAttribute("max", a), u.setAttribute("step", e), t && (t.setAttribute("id", i + "-description"), u.setAttribute("aria-describedby", i + "-description")), u;
        } }, { key: "getStepperButtons", value: function(n) {
          var a = document.createElement("div"), e = document.createElement("button");
          e.setAttribute("type", "button"), e.classList.add("stepper-down");
          var t = document.createElement("button");
          t.setAttribute("type", "button"), t.classList.add("stepper-up"), n.getAttribute("readonly") && (e.setAttribute("disabled", !0), t.setAttribute("disabled", !0)), e.textContent = "-", t.textContent = "+";
          var i = function(b, k) {
            b.value = Number(k || b.value), b.setAttribute("initialized", "1");
          }, u = n.getAttribute("min"), h = n.getAttribute("max");
          return e.addEventListener("click", function() {
            n.getAttribute("initialized") ? u ? Number(n.value) > Number(u) && n.stepDown() : n.stepDown() : i(n, u), j(n, "change");
          }), t.addEventListener("click", function() {
            n.getAttribute("initialized") ? h ? Number(n.value) < Number(h) && n.stepUp() : n.stepUp() : i(n, u), j(n, "change");
          }), a.appendChild(e), a.appendChild(t), a;
        } }, { key: "getRangeOutput", value: function(n) {
          var a = document.createElement("output"), e = function(t) {
            a.value = t.currentTarget.value;
          };
          return n.addEventListener("change", e, !1), n.addEventListener("input", e, !1), a;
        } }, { key: "getRangeControl", value: function(n, a) {
          var e = document.createElement("div");
          return e.classList.add("je-range-control"), a && e.appendChild(a), e.appendChild(n), e;
        } }, { key: "getFormInputField", value: function(n) {
          var a = document.createElement("input");
          return a.setAttribute("type", n), a;
        } }, { key: "afterInputReady", value: function(n) {
        } }, { key: "getFormControl", value: function(n, a, e, t, i) {
          var u = document.createElement("div");
          return u.classList.add("form-control"), n && (u.appendChild(n), i && n.setAttribute("for", i)), a.type !== "checkbox" && a.type !== "radio" || !n ? (t && n && n.appendChild(t), u.appendChild(a)) : (a.style.width = "auto", n.insertBefore(a, n.firstChild), t && n.appendChild(t)), a.tagName.toLowerCase() !== "div" && a && n && i && (n.setAttribute("for", i), a.setAttribute("id", i)), a.tagName.toLowerCase() !== "div" && a && e && (e.setAttribute("id", i + "-description"), a.setAttribute("aria-describedby", i + "-description")), e && u.appendChild(e), u;
        } }, { key: "getIndentedPanel", value: function() {
          var n = document.createElement("div");
          return n.classList.add("je-indented-panel"), n;
        } }, { key: "getTopIndentedPanel", value: function() {
          var n = document.createElement("div");
          return n.classList.add("je-indented-panel--top"), n;
        } }, { key: "getChildEditorHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getDescription", value: function(n) {
          var a = document.createElement("p");
          return window.DOMPurify ? a.innerHTML = window.DOMPurify.sanitize(n) : a.textContent = this.cleanText(n), a;
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
        } }, { key: "getButton", value: function(n, a, e) {
          var t = document.createElement("button");
          return t.type = "button", this.setButtonText(t, n, a, e), t;
        } }, { key: "getFormButton", value: function(n, a, e) {
          return this.getButton(n, a, e);
        } }, { key: "setButtonText", value: function(n, a, e, t) {
          for (; n.firstChild; ) n.removeChild(n.firstChild);
          if (e && (n.appendChild(e), a = " ".concat(a)), !this.jsoneditor.options.iconlib || !this.jsoneditor.options.remove_button_labels || !e) {
            var i = document.createElement("span");
            i.appendChild(document.createTextNode(a)), n.appendChild(i);
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
          var a = document.createElement("th");
          return a.textContent = n, a;
        } }, { key: "getTableCell", value: function() {
          return document.createElement("td");
        } }, { key: "getErrorMessage", value: function(n) {
          var a = document.createElement("p");
          return a.style = a.style || {}, a.style.color = "red", a.appendChild(document.createTextNode(n)), a;
        } }, { key: "addInputError", value: function(n, a) {
          n.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(n) {
        } }, { key: "addTableRowError", value: function(n) {
        } }, { key: "removeTableRowError", value: function(n) {
        } }, { key: "getTabHolder", value: function(n) {
          var a = n === void 0 ? "" : n, e = document.createElement("div");
          return e.innerHTML = "<div class='je-tabholder tabs'></div><div class='content' id='".concat(a, "'></div><div class='je-tabholder--clear'></div>"), e;
        } }, { key: "getTopTabHolder", value: function(n) {
          var a = n === void 0 ? "" : n, e = document.createElement("div");
          return e.innerHTML = "<div class='tabs je-tabholder--top'></div><div class='je-tabholder--clear'></div><div class='content' id='".concat(a, "'></div>"), e;
        } }, { key: "applyStyles", value: function(n, a) {
          Object.keys(a).forEach(function(e) {
            return n.style[e] = a[e];
          });
        } }, { key: "closest", value: function(n, a) {
          for (; n && n !== document; ) {
            if (!n[Ul]) return !1;
            if (n[Ul](a)) return n;
            n = n.parentNode;
          }
          return !1;
        } }, { key: "insertBasicTopTab", value: function(n, a) {
          a.firstChild.insertBefore(n, a.firstChild.firstChild);
        } }, { key: "getTab", value: function(n, a) {
          var e = document.createElement("div");
          return e.appendChild(n), e.id = a, e.classList.add("je-tab"), e;
        } }, { key: "getTopTab", value: function(n, a) {
          var e = document.createElement("div");
          return e.appendChild(n), e.id = a, e.classList.add("je-tab--top"), e;
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
        } }, { key: "addTab", value: function(n, a) {
          n.children[0].appendChild(a);
        } }, { key: "addTopTab", value: function(n, a) {
          n.children[0].appendChild(a);
        } }, { key: "getBlockLink", value: function() {
          var n = document.createElement("a");
          return n.classList.add("je-block-link"), n;
        } }, { key: "getBlockLinkHolder", value: function() {
          return document.createElement("div");
        } }, { key: "getLinksHolder", value: function() {
          return document.createElement("div");
        } }, { key: "createMediaLink", value: function(n, a, e) {
          n.appendChild(a), e.classList.add("je-media"), n.appendChild(e);
        } }, { key: "createImageLink", value: function(n, a, e) {
          n.appendChild(a), a.appendChild(e);
        } }, { key: "getFirstTab", value: function(n) {
          return n.firstChild.firstChild;
        } }, { key: "getInputGroup", value: function(n, a) {
        } }, { key: "cleanText", value: function(n) {
          var a = new window.DOMParser().parseFromString(n, "text/html");
          return a.body ? a.body.textContent : "";
        } }, { key: "getDropZone", value: function(n) {
          var a = document.createElement("div");
          return a.setAttribute("data-text", n), a.classList.add("je-dropzone"), a;
        } }, { key: "getUploadPreview", value: function(n, a, e) {
          var t = document.createElement("div");
          if (t.classList.add("je-upload-preview"), n.mimeType.substr(0, 5) === "image") {
            var i = document.createElement("img");
            i.src = e, t.appendChild(i);
          }
          var u = document.createElement("div");
          u.innerHTML += "<strong>Name:</strong> ".concat(n.name, "<br><strong>Type:</strong> ").concat(n.type, "<br><strong>Size:</strong> ").concat(n.formattedSize), t.appendChild(u), t.appendChild(a);
          var h = document.createElement("div");
          return h.style.clear = "left", t.appendChild(h), t;
        } }, { key: "getProgressBar", value: function() {
          var n = document.createElement("progress");
          return n.setAttribute("max", 100), n.setAttribute("value", 0), n;
        } }, { key: "updateProgressBar", value: function(n, a) {
          n && n.setAttribute("value", a);
        } }, { key: "updateProgressBarUnknown", value: function(n) {
          n && n.removeAttribute("value");
        } }], r && Tp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function li(o) {
        return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, li(o);
      }
      function Ap(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Rp(a.key), a);
        }
      }
      function Rp(o) {
        var r = function(n, a) {
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
      function Ip(o, r, n) {
        return r = nr(r), function(a, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, $l() ? Reflect.construct(r, n || [], nr(o).constructor) : r.apply(o, n));
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
      function fn() {
        return fn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = nr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, fn.apply(this, arguments);
      }
      function nr(o) {
        return nr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, nr(o);
      }
      function Hs(o, r) {
        return Hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Hs(o, r);
      }
      var Gl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ip(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hs(e, t);
        }(r, o), n = r, (a = [{ key: "getFormInputLabel", value: function(e, t) {
          var i = fn(nr(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = fn(nr(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-form-input-label"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var e = fn(nr(r.prototype), "getIndentedPanel", this).call(this);
          return e.classList.add("je-indented-panel"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var e = fn(nr(r.prototype), "getChildEditorHolder", this).call(this);
          return e.classList.add("je-child-editor-holder"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("je-header-button-holder"), e;
        } }, { key: "getTable", value: function() {
          var e = fn(nr(r.prototype), "getTable", this).call(this);
          return e.classList.add("je-table"), e;
        } }, { key: "addInputError", value: function(e, t) {
          var i = this.closest(e, ".form-control") || e.controlgroup;
          e.errmsg ? e.errmsg.style.display = "block" : (e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), e.errmsg.style = e.errmsg.style || {}, e.errmsg.style.color = "red", i.appendChild(e.errmsg)), e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && Ap(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function ui(o) {
        return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ui(o);
      }
      function Bp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Np(a.key), a);
        }
      }
      function Np(o) {
        var r = function(n, a) {
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
      function Fp(o, r, n) {
        return r = ir(r), function(a, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Wl() ? Reflect.construct(r, n || [], ir(o).constructor) : r.apply(o, n));
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
      function yn() {
        return yn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ir(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, yn.apply(this, arguments);
      }
      function ir(o) {
        return ir = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ir(o);
      }
      function Vs(o, r) {
        return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Vs(o, r);
      }
      Gl.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Jl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vs(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(h), { label: t, checkbox: u, container: i };
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = yn(ir(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i;
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("col-md-offset-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, u, h) {
          return yn(ir(r.prototype), "getRangeInput", this).call(this, e, t, i, u, h);
        } }, { key: "getFormInputField", value: function(e) {
          var t = yn(ir(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && t.classList.add("form-control"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, h) {
          var b = document.createElement("div");
          return !e || t.type !== "checkbox" && t.type !== "radio" ? (b.classList.add("form-group"), e && (e.classList.add("control-label"), b.appendChild(e), u && e.appendChild(u)), b.appendChild(t)) : (b.classList.add(t.type), u && e.appendChild(u), e.insertBefore(t, e.firstChild), b.appendChild(e)), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), b;
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
          var u = yn(ir(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-default"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = yn(ir(r.prototype), "getTableContainer", this).call(this);
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
          var u = document.createElement("a");
          return u.setAttribute("href", "#".concat(t)), u.appendChild(e), u.setAttribute("aria-controls", t), u.setAttribute("role", "tab"), u.setAttribute("data-toggle", "tab"), i.appendChild(u), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.setAttribute("role", "presentation");
          var u = document.createElement("a");
          return u.setAttribute("href", "#".concat(t)), u.appendChild(e), u.setAttribute("aria-controls", t), u.setAttribute("role", "tab"), u.setAttribute("data-toggle", "tab"), i.appendChild(u), i;
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
            var i = e.firstChild, u = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = u, i.innerHTML = u;
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
            var u = document.createElement("div");
            u.classList.add("input-group-btn"), i.appendChild(u);
            for (var h = 0; h < t.length; h++) u.appendChild(t[h]);
            return i;
          }
        } }]) && Bp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function ci(o) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(o);
      }
      function Dp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Mp(a.key), a);
        }
      }
      function Mp(o) {
        var r = function(n, a) {
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
      function Hp(o, r, n) {
        return r = or(r), function(a, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Kl() ? Reflect.construct(r, n || [], or(o).constructor) : r.apply(o, n));
      }
      function Kl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Kl = function() {
          return !!o;
        })();
      }
      function mn() {
        return mn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = or(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, mn.apply(this, arguments);
      }
      function or(o) {
        return or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, or(o);
      }
      function zs(o, r) {
        return zs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, zs(o, r);
      }
      Jl.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Vp = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, Zl = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Hp(this, r, [e, Vp]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zs(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = mn(or(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), this.options.custom_forms === !1 ? (this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg")) : (i.classList.remove("form-control"), i.classList.add("custom-select"), this.options.input_size === "small" && i.classList.add("custom-select-sm"), this.options.input_size === "large" && i.classList.add("custom-select-lg")), i;
        } }, { key: "getContainer", value: function() {
          var e = document.createElement("div");
          return this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("custom-control", "custom-switch", "d-inline-block", "fs-6");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("custom-control-input", "json-editor-opt-in");
          var h = document.createElement("label");
          h.setAttribute("for", e + "-opt-in"), h.classList.add("custom-control-label");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", h.appendChild(b), i.appendChild(u), i.appendChild(h), { label: t, checkbox: u, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, u, h) {
          var b = mn(or(r.prototype), "getRangeInput", this).call(this, e, t, i, u, h);
          return this.options.custom_forms === !0 && (b.classList.remove("form-control"), b.classList.add("custom-range")), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), u = document.createElement("div"), h = document.createElement("button");
          h.setAttribute("type", "button");
          var b = document.createElement("button");
          b.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), i.appendChild(h), u.appendChild(b), t.classList.add("input-group"), i.classList.add("input-group-prepend"), u.classList.add("input-group-append"), h.classList.add("btn"), h.classList.add("btn-secondary"), h.classList.add("stepper-down"), b.classList.add("btn"), b.classList.add("btn-secondary"), b.classList.add("stepper-up"), e.getAttribute("readonly") && (h.setAttribute("disabled", !0), b.setAttribute("disabled", !0)), h.textContent = "-", b.textContent = "+";
          var k = function($, G) {
            $.value = Number(G || $.value), $.setAttribute("initialized", "1");
          }, S = e.getAttribute("min"), I = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), h.addEventListener("click", function() {
            e.getAttribute("initialized") ? S ? Number(e.value) > Number(S) && e.stepDown() : e.stepDown() : k(e, S), j(e, "change");
          }), b.addEventListener("click", function() {
            e.getAttribute("initialized") ? I ? Number(e.value) < Number(I) && e.stepUp() : e.stepUp() : k(e, S), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = mn(or(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && e !== "file" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), e === "file" && t.classList.add("form-control-file"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, h) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (b.appendChild(e), u && b.appendChild(u)), b.appendChild(t);
          else {
            var k = document.createElement("div");
            this.options.custom_forms === !1 ? (k.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (k.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? k.classList.add("custom-checkbox") : k.classList.add("custom-radio")), k.appendChild(t), k.appendChild(e), u && k.appendChild(u), b.appendChild(k);
          }
          return i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), b;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("button");
          t.type = "button", t.classList.add("ml-3", "jsoneditor-twbs4-text-button"), t.setAttribute("data-toggle", "tooltip"), t.setAttribute("data-placement", "auto"), t.title = e;
          var i = document.createTextNode("ⓘ");
          return t.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(t).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && t.classList.add("je-tooltip"), t;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          var h = document.createElement("div");
          h.classList.add("form-group"), t && (h.appendChild(t), u && t.appendChild(u));
          var b = document.createElement("div");
          return Object.values(e).forEach(function(k) {
            var S = k.firstChild;
            b.appendChild(S);
          }), h.appendChild(b), i && h.appendChild(i), h;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return this.options.custom_forms === !1 ? t.classList.add("form-check-input") : t.classList.add("custom-control-input"), t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = document.createElement("label");
          return this.options.custom_forms === !1 ? i.classList.add("form-check-label") : i.classList.add("custom-control-label"), i.appendChild(document.createTextNode(e)), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          var u = document.createElement("div");
          return this.options.custom_forms === !1 ? u.classList.add("form-check") : u.classList.add("custom-control", "custom-radio"), u.appendChild(t), u.appendChild(e), i && (this.options.custom_forms === !1 ? u.classList.add("form-check-inline") : u.classList.add("custom-control-inline")), u;
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
          var u = mn(or(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = mn(or(r.prototype), "getTableContainer", this).call(this);
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
          var u = document.createElement("a");
          return u.classList.add("nav-link"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var u = document.createElement("a");
          return u.classList.add("nav-link"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
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
            var i = e.firstChild, u = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = u, i.innerHTML = u;
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
            var u = document.createElement("div");
            u.classList.add("input-group-append"), i.appendChild(u);
            for (var h = 0; h < t.length; h++) t[h].classList.remove("mr-2", "btn-secondary"), t[h].classList.add("btn-outline-secondary"), u.appendChild(t[h]);
            return i;
          }
        } }]) && Dp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function hi(o) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(o);
      }
      function zp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, qp(a.key), a);
        }
      }
      function qp(o) {
        var r = function(n, a) {
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
      function Up(o, r, n) {
        return r = sr(r), function(a, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
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
      function bn() {
        return bn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = sr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, bn.apply(this, arguments);
      }
      function sr(o) {
        return sr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, sr(o);
      }
      function qs(o, r) {
        return qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, qs(o, r);
      }
      Zl.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var $p = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, Ql = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Up(this, r, [e, $p]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qs(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = bn(sr(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i.classList.add("form-select"), this.options.input_size === "small" && i.classList.add("form-control-sm"), this.options.input_size === "large" && i.classList.add("form-control-lg"), i;
        } }, { key: "getContainer", value: function() {
          var e = document.createElement("div");
          return this.options.object_indent || e.classList.add("je-noindent"), e;
        } }, { key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("div");
          i.classList.add("form-check", "form-switch", "d-inline-block", "fs-6");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("role", "switch"), u.setAttribute("id", e + "-opt-in"), u.classList.add("form-check-input", "json-editor-opt-in");
          var h = document.createElement("label");
          h.setAttribute("for", e + "-opt-in"), h.classList.add("form-check-label");
          var b = document.createElement("span");
          return b.classList.add("visually-hidden"), b.textContent = e + "-opt-in", h.appendChild(b), i.appendChild(u), i.appendChild(h), { label: t, checkbox: u, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, u, h) {
          var b = bn(sr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, h);
          return b.classList.remove("form-control"), b.classList.add("form-range"), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var u = document.createElement("button");
          u.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), u.classList.add("btn"), u.classList.add("btn-secondary"), u.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), u.setAttribute("disabled", !0)), i.textContent = "-", u.textContent = "+";
          var h = function(S, I) {
            S.value = Number(I || S.value), S.setAttribute("initialized", "1");
          }, b = e.getAttribute("min"), k = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? b ? Number(e.value) > Number(b) && e.stepDown() : e.stepDown() : h(e, b), j(e, "change");
          }), u.addEventListener("click", function() {
            e.getAttribute("initialized") ? k ? Number(e.value) < Number(k) && e.stepUp() : e.stepUp() : h(e, b), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = bn(sr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, h) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), b.appendChild(e), u && b.appendChild(u)), b.appendChild(t);
          else {
            var k = document.createElement("div");
            k.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), k.appendChild(t), k.appendChild(e), u && k.appendChild(u), b.appendChild(k);
          }
          return i && b.appendChild(i), b;
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
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          var h = document.createElement("div");
          h.classList.add("form-group"), t && (h.appendChild(t), u && t.appendChild(u));
          var b = document.createElement("div");
          return Object.values(e).forEach(function(k) {
            var S = k.firstChild;
            b.appendChild(S);
          }), h.appendChild(b), i && h.appendChild(i), h;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t.classList.add("form-check-input"), t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = document.createElement("label");
          return i.classList.add("form-check-label"), i.appendChild(document.createTextNode(e)), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          var u = document.createElement("div");
          return u.classList.add("form-check"), u.appendChild(t), u.appendChild(e), i && u.classList.add("form-check-inline"), u;
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
          var u = bn(sr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = bn(sr(r.prototype), "getTableContainer", this).call(this);
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
          var u = document.createElement("a");
          return u.classList.add("nav-link"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item");
          var u = document.createElement("a");
          return u.classList.add("nav-link"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
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
            var i = e.firstChild, u = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = u, i.innerHTML = u;
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
            for (var u = 0; u < t.length; u++) t[u].classList.remove("me-2", "btn-secondary"), t[u].classList.add("btn-outline-secondary"), i.appendChild(t[u]);
            return i;
          }
        } }]) && zp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function di(o) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(o);
      }
      function Gp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Wp(a.key), a);
        }
      }
      function Wp(o) {
        var r = function(n, a) {
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
      function Jp(o, r, n) {
        return r = wr(r), function(a, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Xl() ? Reflect.construct(r, n || [], wr(o).constructor) : r.apply(o, n));
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
      function pi() {
        return pi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = wr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, pi.apply(this, arguments);
      }
      function wr(o) {
        return wr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, wr(o);
      }
      function Us(o, r) {
        return Us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Us(o, r);
      }
      Ql.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var eu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Jp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Us(e, t);
        }(r, o), n = r, (a = [{ key: "getTable", value: function() {
          var e = pi(wr(r.prototype), "getTable", this).call(this);
          return e.setAttribute("cellpadding", 5), e.setAttribute("cellspacing", 0), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = pi(wr(r.prototype), "getTableHeaderCell", this).call(this, e);
          return t.classList.add("ui-state-active"), t.style.fontWeight = "bold", t;
        } }, { key: "getTableCell", value: function() {
          var e = pi(wr(r.prototype), "getTableCell", this).call(this);
          return e.classList.add("ui-widget-content"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e.style.fontSize = ".6em", e.style.display = "inline-block", e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = this.getDescription(e);
          return t.style.marginLeft = "10px", t.style.display = "inline-block", t;
        } }, { key: "getFormControl", value: function(e, t, i, u) {
          var h = pi(wr(r.prototype), "getFormControl", this).call(this, e, t, i, u);
          return t.type === "checkbox" ? (h.style.lineHeight = "25px", h.style.padding = "3px 0") : h.style.padding = "4px 0 8px 0", h;
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
          var u = document.createElement("button");
          u.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), t && !e ? (u.classList.add("ui-button-icon-only"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), u.appendChild(t)) : t ? (u.classList.add("ui-button-text-icon-primary"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), u.appendChild(t)) : u.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          return h.classList.add("ui-button-text"), h.textContent = e || i || ".", u.appendChild(h), u.setAttribute("title", i), u;
        } }, { key: "setButtonText", value: function(e, t, i, u) {
          e.innerHTML = "", e.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !t ? (e.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : i ? (e.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : e.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          h.classList.add("ui-button-text"), h.textContent = t || u || ".", e.appendChild(h), e.setAttribute("title", u);
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
        } }]) && Gp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function fi(o) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(o);
      }
      function Kp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Zp(a.key), a);
        }
      }
      function Zp(o) {
        var r = function(n, a) {
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
      function Yp(o, r, n) {
        return r = mo(r), function(a, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, tu() ? Reflect.construct(r, n || [], mo(o).constructor) : r.apply(o, n));
      }
      function tu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (tu = function() {
          return !!o;
        })();
      }
      function mo(o) {
        return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mo(o);
      }
      function $s(o, r) {
        return $s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, $s(o, r);
      }
      eu.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var ru = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && $s(e, t);
        }(r, o), n = r, (a = [{ key: "addInputError", value: function(e, t) {
          if (e.errmsg) e.errmsg.style.display = "block";
          else {
            var i = this.closest(e, ".form-control");
            e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(e.errmsg);
          }
          e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && Kp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function yi(o) {
        return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yi(o);
      }
      function Qp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Xp(a.key), a);
        }
      }
      function Xp(o) {
        var r = function(n, a) {
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
      function ef(o, r, n) {
        return r = dt(r), function(a, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, nu() ? Reflect.construct(r, n || [], dt(o).constructor) : r.apply(o, n));
      }
      function nu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (nu = function() {
          return !!o;
        })();
      }
      function vt() {
        return vt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = dt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vt.apply(this, arguments);
      }
      function dt(o) {
        return dt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, dt(o);
      }
      function Gs(o, r) {
        return Gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Gs(o, r);
      }
      ru.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var tf = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, iu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ef(this, r, [e, tf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Gs(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var h = document.createElement("i");
          h.classList.add("form-icon");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(h), t.appendChild(i), { label: i, checkbox: u, container: t };
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
          var e = vt(dt(r.prototype), "getButtonHolder", this).call(this);
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = vt(dt(r.prototype), "getFormButtonHolder", this).call(this);
          return t.classList.remove("btn-group"), t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" ? t.classList.add("text-right") : t.classList.add("text-left"), t;
        } }, { key: "getFormButton", value: function(e, t, i) {
          var u = vt(dt(r.prototype), "getFormButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-primary", "mx-2", "my-1"), this.options.input_size !== "small" && u.classList.remove("btn-sm"), this.options.input_size === "large" && u.classList.add("btn-lg"), u;
        } }, { key: "getButton", value: function(e, t, i) {
          var u = vt(dt(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), u;
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return typeof e == "string" ? i.textContent = e : i.appendChild(e), i.style.display = "inline-block", i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = vt(dt(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-desc", "hide-sm"), t;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = vt(dt(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold && i.classList.add("je-label"), i;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getCheckboxLabel", value: function(e, t) {
          var i = vt(dt(r.prototype), "getCheckboxLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-checkbox", "pr-0"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          return vt(dt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = vt(dt(r.prototype), "getFormRadioLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getFormInputField", value: function(e) {
          var t = vt(dt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("form-input"), t;
        } }, { key: "getRangeInput", value: function(e, t, i, u, h) {
          var b = vt(dt(r.prototype), "getRangeInput", this).call(this, e, t, i, u, h);
          return b.classList.add("slider"), b.classList.remove("form-input"), b.setAttribute("oninput", 'this.setAttribute("value", this.value)'), b;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = vt(dt(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center"), i;
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = vt(dt(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-select"), i;
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-input"), e;
        } }, { key: "getFormControl", value: function(e, t, i, u, h) {
          var b = document.createElement("div");
          return b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio" ? (e && (e.classList.add("form-label"), b.appendChild(e), u && e.appendChild(u)), b.appendChild(t)) : (b.classList.add(t.type), u && e.appendChild(u), e.insertBefore(t, e.firstChild), b.appendChild(e)), this.options.input_size === "small" ? t.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && t.classList.add("input-lg", "select-lg"), t.type !== "checkbox" && b.appendChild(t), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), b;
        } }, { key: "getInputGroup", value: function(e, t) {
          if (e) {
            var i = document.createElement("div");
            i.classList.add("input-group"), i.appendChild(e);
            for (var u = 0; u < t.length; u++) t[u].classList.add("input-group-btn"), t[u].classList.remove("btn-sm", "mr-2", "my-1"), i.appendChild(t[u]);
            return i;
          }
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("div");
          t.classList.add("popover", "popover-left", "float-right");
          var i = document.createElement("button");
          i.classList.add("btn", "btn-secondary", "btn-info", "btn-action", "s-circle"), i.setAttribute("tabindex", "-1"), t.appendChild(i);
          var u = document.createTextNode("I");
          i.appendChild(u);
          var h = document.createElement("div");
          h.classList.add("popover-container"), t.appendChild(h);
          var b = document.createElement("div");
          b.classList.add("card"), h.appendChild(b);
          var k = document.createElement("div");
          return k.classList.add("card-body"), k.innerHTML = e, b.appendChild(k), t;
        } }, { key: "getTable", value: function() {
          var e = vt(dt(r.prototype), "getTable", this).call(this);
          return e.classList.add("table", "table-scroll"), this.options.table_border && e.classList.add("je-table-border"), this.options.table_zebrastyle && e.classList.add("table-striped"), e;
        } }, { key: "getProgressBar", value: function() {
          var e = vt(dt(r.prototype), "getProgressBar", this).call(this);
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
          var u = document.createElement("a");
          return u.setAttribute("href", "#".concat(t)), u.appendChild(e), i.appendChild(u), i;
        } }, { key: "markTabActive", value: function(e) {
          e.tab.classList.add("active"), e.rowPane !== void 0 ? e.rowPane.style.display = "" : e.container.style.display = "";
        } }, { key: "markTabInactive", value: function(e) {
          e.tab.classList.remove("active"), e.rowPane !== void 0 ? e.rowPane.style.display = "none" : e.container.style.display = "none";
        } }, { key: "afterInputReady", value: function(e) {
          if (e.localName === "select") {
            if (e.classList.contains("selectized")) {
              var t = e.nextSibling;
              t && (t.classList.remove("form-select"), Array.from(t.querySelectorAll(".form-select")).forEach(function(u) {
                u.classList.remove("form-select");
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
        } }]) && Qp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      function mi(o) {
        return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mi(o);
      }
      function rf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, nf(a.key), a);
        }
      }
      function nf(o) {
        var r = function(n, a) {
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
      function of(o, r, n) {
        return r = mt(r), function(a, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ou() ? Reflect.construct(r, n || [], mt(o).constructor) : r.apply(o, n));
      }
      function ou() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ou = function() {
          return !!o;
        })();
      }
      function _t() {
        return _t = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = mt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _t.apply(this, arguments);
      }
      function mt(o) {
        return mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mt(o);
      }
      function Ws(o, r) {
        return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ws(o, r);
      }
      iu.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var sf = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, su = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), of(this, r, [e, sf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ws(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider", "round");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(h), { label: t, checkbox: u, container: i };
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
          var u = this.getFormInputField("range");
          return u.classList.add("slider"), this.options.enable_compact && u.classList.add("compact"), u.setAttribute("oninput", 'this.setAttribute("value", this.value)'), u.setAttribute("min", e), u.setAttribute("max", t), u.setAttribute("step", i), u;
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
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          var h = _t(mt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
          return h.classList.add("inline-flex", "flex-col"), h;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in t.classList.add("form-radio", "text-red-600"), e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = _t(mt(r.prototype), "getFormRadioLabel", this).call(this, e, t);
          return i.classList.add("inline-flex", "items-center", "mr-2"), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-radio"), e;
        } }, { key: "getRadioHolder", value: function(e, t, i, u, h) {
          var b = _t(mt(r.prototype), "getRadioHolder", this).call(this, t, i, u, h);
          return e.options.layout === "h" ? b.classList.add("inline-flex", "flex-row") : b.classList.add("inline-flex", "flex-col"), b;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = _t(mt(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold ? i.classList.add("font-bold") : i.classList.add("required"), i;
        } }, { key: "getFormInputField", value: function(e) {
          var t = _t(mt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("block", "w-full", "px-1", "text-black", "text-sm", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && t.classList.add("compact"), t;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("p");
          return t.classList.add("block", "mt-1", "text-xs"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, h) {
          var b = document.createElement("div");
          return b.classList.add("form-group", "mb-1", "w-full"), e && (e.classList.add("text-xs"), t.type === "checkbox" && (t.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormCheckboxControl(e, t, !1, u)), t.type === "radio" && (t.classList.add("form-radio", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormRadioControl(e, t, !1, u)), b.appendChild(e), !["checkbox", "radio"].includes(t.type) && u && b.appendChild(u)), ["checkbox", "radio"].includes(t.type) || (this.options.input_size === "small" ? t.classList.add("text-xs") : this.options.input_size === "normal" ? t.classList.add("text-base") : this.options.input_size === "large" && t.classList.add("text-xl"), b.appendChild(t)), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), b;
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
          var u = _t(mt(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("inline-block", "align-middle", "text-center", "text-sm", "bg-blue-700", "text-white", "py-1", "pr-1", "m-2", "shadow", "select-none", "whitespace-no-wrap", "rounded"), u;
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
          var u = document.createElement("a");
          return u.classList.add("nav-link", "text-center"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
        } }, { key: "getTopTab", value: function(e, t) {
          var i = document.createElement("li");
          i.classList.add("nav-item", "flex", "border-l", "border-t", "border-r");
          var u = document.createElement("a");
          return u.classList.add("nav-link", "-mb-px", "flex-row", "text-center", "bg-white", "p-2", "hover:bg-blue-400", "rounded-t"), u.setAttribute("href", "#".concat(t)), u.setAttribute("data-toggle", "tab"), u.appendChild(e), i.appendChild(u), i;
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
            var i = e.firstChild, u = "".concat(t, "%");
            i.setAttribute("aria-valuenow", t), i.style.width = u, i.innerHTML = u;
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
            var u = document.createElement("div");
            u.classList.add("-mr-1"), i.appendChild(u);
            for (var h = 0; h < t.length; h++) u.appendChild(t[h]);
            return i;
          }
        } }]) && rf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(_r);
      su.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var af = { html: Gl, bootstrap3: Jl, bootstrap4: Zl, bootstrap5: Ql, jqueryui: eu, barebones: ru, spectre: iu, tailwind: su };
      const lf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function vn(o) {
        return vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vn(o);
      }
      function Js(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function Ks() {
        Ks = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(q, z, J) {
          q[z] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", h = t.toStringTag || "@@toStringTag";
        function b(q, z, J) {
          return Object.defineProperty(q, z, { value: J, enumerable: !0, configurable: !0, writable: !0 }), q[z];
        }
        try {
          b({}, "");
        } catch {
          b = function(z, J, ge) {
            return z[J] = ge;
          };
        }
        function k(q, z, J, ge) {
          var se = z && z.prototype instanceof _e ? z : _e, Le = Object.create(se.prototype), $e = new ar(ge || []);
          return e(Le, "_invoke", { value: xt(q, J, $e) }), Le;
        }
        function S(q, z, J) {
          try {
            return { type: "normal", arg: q.call(z, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = k;
        var I = "suspendedStart", $ = "suspendedYield", G = "executing", ee = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var Fe = {};
        b(Fe, i, function() {
          return this;
        });
        var Me = Object.getPrototypeOf, ve = Me && Me(Me(Ot([])));
        ve && ve !== n && a.call(ve, i) && (Fe = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(Fe);
        function Ke(q) {
          ["next", "throw", "return"].forEach(function(z) {
            b(q, z, function(J) {
              return this._invoke(z, J);
            });
          });
        }
        function nt(q, z) {
          function J(se, Le, $e, it) {
            var ot = S(q[se], q, Le);
            if (ot.type !== "throw") {
              var Rt = ot.arg, Gt = Rt.value;
              return Gt && vn(Gt) == "object" && a.call(Gt, "__await") ? z.resolve(Gt.__await).then(function(Ct) {
                J("next", Ct, $e, it);
              }, function(Ct) {
                J("throw", Ct, $e, it);
              }) : z.resolve(Gt).then(function(Ct) {
                Rt.value = Ct, $e(Rt);
              }, function(Ct) {
                return J("throw", Ct, $e, it);
              });
            }
            it(ot.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new z(function(it, ot) {
                J(se, Le, it, ot);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function xt(q, z, J) {
          var ge = I;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === ee) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (J.method = se, J.arg = Le; ; ) {
              var $e = J.delegate;
              if ($e) {
                var it = Zr($e, J);
                if (it) {
                  if (it === pe) continue;
                  return it;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === I) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var ot = S(q, z, J);
              if (ot.type === "normal") {
                if (ge = J.done ? ee : $, ot.arg === pe) continue;
                return { value: ot.arg, done: J.done };
              }
              ot.type === "throw" && (ge = ee, J.method = "throw", J.arg = ot.arg);
            }
          };
        }
        function Zr(q, z) {
          var J = z.method, ge = q.iterator[J];
          if (ge === o) return z.delegate = null, J === "throw" && q.iterator.return && (z.method = "return", z.arg = o, Zr(q, z), z.method === "throw") || J !== "return" && (z.method = "throw", z.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = S(ge, q.iterator, z.arg);
          if (se.type === "throw") return z.method = "throw", z.arg = se.arg, z.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (z[q.resultName] = Le.value, z.next = q.nextLoc, z.method !== "return" && (z.method = "next", z.arg = o), z.delegate = null, pe) : Le : (z.method = "throw", z.arg = new TypeError("iterator result is not an object"), z.delegate = null, pe);
        }
        function bi(q) {
          var z = { tryLoc: q[0] };
          1 in q && (z.catchLoc = q[1]), 2 in q && (z.finallyLoc = q[2], z.afterLoc = q[3]), this.tryEntries.push(z);
        }
        function Ne(q) {
          var z = q.completion || {};
          z.type = "normal", delete z.arg, q.completion = z;
        }
        function ar(q) {
          this.tryEntries = [{ tryLoc: "root" }], q.forEach(bi, this), this.reset(!0);
        }
        function Ot(q) {
          if (q || q === "") {
            var z = q[i];
            if (z) return z.call(q);
            if (typeof q.next == "function") return q;
            if (!isNaN(q.length)) {
              var J = -1, ge = function se() {
                for (; ++J < q.length; ) if (a.call(q, J)) return se.value = q[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(vn(q) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, h, "GeneratorFunction"), r.isGeneratorFunction = function(q) {
          var z = typeof q == "function" && q.constructor;
          return !!z && (z === we || (z.displayName || z.name) === "GeneratorFunction");
        }, r.mark = function(q) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(q, Ie) : (q.__proto__ = Ie, b(q, h, "GeneratorFunction")), q.prototype = Object.create(xe), q;
        }, r.awrap = function(q) {
          return { __await: q };
        }, Ke(nt.prototype), b(nt.prototype, u, function() {
          return this;
        }), r.AsyncIterator = nt, r.async = function(q, z, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new nt(k(q, z, J, ge), se);
          return r.isGeneratorFunction(z) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), b(xe, h, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(q) {
          var z = Object(q), J = [];
          for (var ge in z) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in z) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ot, ar.prototype = { constructor: ar, reset: function(q) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !q) for (var z in this) z.charAt(0) === "t" && a.call(this, z) && !isNaN(+z.slice(1)) && (this[z] = o);
        }, stop: function() {
          this.done = !0;
          var q = this.tryEntries[0].completion;
          if (q.type === "throw") throw q.arg;
          return this.rval;
        }, dispatchException: function(q) {
          if (this.done) throw q;
          var z = this;
          function J(ot, Rt) {
            return Le.type = "throw", Le.arg = q, z.next = ot, Rt && (z.method = "next", z.arg = o), !!Rt;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), it = a.call(se, "finallyLoc");
              if ($e && it) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!it) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(q, z) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (q === "break" || q === "continue") && se.tryLoc <= z && z <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = q, Le.arg = z, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function(q, z) {
          if (q.type === "throw") throw q.arg;
          return q.type === "break" || q.type === "continue" ? this.next = q.arg : q.type === "return" ? (this.rval = this.arg = q.arg, this.method = "return", this.next = "end") : q.type === "normal" && z && (this.next = z), pe;
        }, finish: function(q) {
          for (var z = this.tryEntries.length - 1; z >= 0; --z) {
            var J = this.tryEntries[z];
            if (J.finallyLoc === q) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function(q) {
          for (var z = this.tryEntries.length - 1; z >= 0; --z) {
            var J = this.tryEntries[z];
            if (J.tryLoc === q) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(q, z, J) {
          return this.delegate = { iterator: Ot(q), resultName: z, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function au(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), h = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(h) : Promise.resolve(h).then(a, e);
      }
      function uf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, cf(a.key), a);
        }
      }
      function cf(o) {
        var r = function(n, a) {
          if (vn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (vn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return vn(r) == "symbol" ? r : r + "";
      }
      var jr = function() {
        function o(t) {
          var i = this, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(G, ee) {
            if (!(G instanceof ee)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = v({}, o.defaults.options, u), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var h = this.options.theme || o.defaults.theme, b = o.defaults.themes[h];
          if (!b) throw new Error("Unknown theme ".concat(h));
          this.element.setAttribute("data-theme", h), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new b(this);
          var k = v(lf, this.getEditorsRules()), S = function(G, ee, pe) {
            return pe ? i.addNewStyleRulesToShadowRoot(G, ee, pe) : i.addNewStyleRules(G, ee);
          };
          if (!this.theme.options.disable_theme_rules) {
            var I = O(this.element);
            S("default", k, I), b.rules !== void 0 && S(h, b.rules, I);
          }
          var $ = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          $ && (this.iconlib = new $()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = o, n = [{ key: "load", value: (a = Ks().mark(function t() {
          var i, u, h, b, k, S, I = this;
          return Ks().wrap(function($) {
            for (; ; ) switch ($.prev = $.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (u = new tp(this.options)).onSchemaLoaded = function(G) {
                  I.trigger("schemaLoaded", G);
                }, u.onAllSchemasLoaded = function() {
                  I.trigger("allSchemasLoaded");
                }, this.expandSchema = function(G) {
                  return u.expandSchema(G);
                }, this.expandRefs = function(G, ee) {
                  return u.expandRefs(G, ee);
                }, h = document.location.toString(), $.next = 9, u.load(this.schema, i, h);
              case 9:
                b = $.sent, k = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new cl(this, null, k, o.defaults), S = this.getEditorClass(b), this.root = this.createEditor(S, { jsoneditor: this, schema: b, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), x(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  I.ready && (I.validation_results = I.validator.validate(I.root.getValue()), I.root.showValidationErrors(I.validation_results), I.trigger("ready"), I.trigger("change"));
                });
              case 24:
              case "end":
                return $.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(u, h) {
            var b = a.apply(t, i);
            function k(I) {
              au(b, u, h, k, S, "next", I);
            }
            function S(I) {
              au(b, u, h, k, S, "throw", I);
            }
            k(void 0);
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
            for (var u = [], h = 0; h < this.callbacks[t].length; h++) this.callbacks[t][h] !== i && u.push(this.callbacks[t][h]);
            this.callbacks[t] = u;
          } else t ? (this.callbacks = this.callbacks || {}, this.callbacks[t] = []) : this.callbacks = {};
          return this;
        } }, { key: "trigger", value: function(t, i) {
          if (this.callbacks && this.callbacks[t] && this.callbacks[t].length) for (var u = 0; u < this.callbacks[t].length; u++) this.callbacks[t][u].apply(this, [i]);
          return this;
        } }, { key: "setOption", value: function(t, i) {
          if (t !== "show_errors") throw new Error("Option ".concat(t, " must be set during instantiation and cannot be changed later"));
          return this.options.show_errors = i, this.onChange(), this;
        } }, { key: "getEditorsRules", value: function() {
          return Object.values(o.defaults.editors).reduce(function(t, i) {
            return i.rules ? v(t, i.rules) : t;
          }, {});
        } }, { key: "getEditorClass", value: function(t) {
          var i, u = this;
          if (t = this.expandSchema(t), o.defaults.resolvers.find(function(h) {
            return (i = h(t, u)) && o.defaults.editors[i];
          }), !i) throw new Error("Unknown editor for schema ".concat(JSON.stringify(t)));
          if (!o.defaults.editors[i]) throw new Error("Unknown editor ".concat(i));
          return o.defaults.editors[i];
        } }, { key: "createEditor", value: function(t, i) {
          var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          return new t(i = v({}, t.options || {}, i), o.defaults, u);
        } }, { key: "onChange", value: function(t) {
          var i = this;
          if (this.ready && (t && this.trigger(t.event, t.data), !this.firing_change)) return this.firing_change = !0, window.requestAnimationFrame(function() {
            i.firing_change = !1, i.ready && (i.validation_results = i.validator.validate(i.root.getValue()), i.options.show_errors !== "never" ? i.root.showValidationErrors(i.validation_results) : i.root.showValidationErrors([]), i.trigger("change"));
          }), this;
        } }, { key: "compileTemplate", value: function(t) {
          var i, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : o.defaults.template;
          if (typeof u == "string") {
            if (!o.defaults.templates[u]) throw new Error("Unknown template engine ".concat(u));
            if (!(i = o.defaults.templates[u]())) throw new Error("Template engine ".concat(u, " missing required library."));
          } else i = u;
          if (!i) throw new Error("No template engine set");
          if (!i.compile) throw new Error("Invalid template engine set");
          return i.compile(t);
        } }, { key: "_data", value: function(t, i, u) {
          if (arguments.length !== 3) return t.hasAttribute("data-jsoneditor-".concat(i)) ? this.__data[t.getAttribute("data-jsoneditor-".concat(i))] : null;
          var h;
          t.hasAttribute("data-jsoneditor-".concat(i)) ? h = t.getAttribute("data-jsoneditor-".concat(i)) : (h = this.uuid++, t.setAttribute("data-jsoneditor-".concat(i), h)), this.__data[h] = u;
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
          for (var u = [], h = 0; h < this.watchlist[t].length; h++) this.watchlist[t][h] !== i && u.push(this.watchlist[t][h]);
          return this.watchlist[t] = u.length ? u : null, this;
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
          var u = document.querySelector("#theme-".concat(t));
          u || ((u = document.createElement("style")).setAttribute("id", "theme-".concat(t)), u.appendChild(document.createTextNode("")), document.head.appendChild(u));
          for (var h = u.sheet ? u.sheet : u.styleSheet, b = this.element.nodeName.toLowerCase(); h.cssRules.length > 0; ) h.deleteRule(0);
          Object.keys(i).forEach(function(k) {
            var S = t === "default" ? k : "".concat(b, '[data-theme="').concat(t, '"] ').concat(k);
            h.insertRule ? h.insertRule(S + " {" + decodeURIComponent(i[k]) + "}", 0) : h.addRule && h.addRule(S, decodeURIComponent(i[k]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, u) {
          var h = this.element.nodeName.toLowerCase(), b = "";
          Object.keys(i).forEach(function(I) {
            var $ = t === "default" ? I : "".concat(h, '[data-theme="').concat(t, '"] ').concat(I);
            b += $ + " {" + decodeURIComponent(i[I]) + `}
`;
          });
          var k, S = new CSSStyleSheet();
          S.replaceSync(b), u.adoptedStyleSheets = [].concat(function(I) {
            if (Array.isArray(I)) return Js(I);
          }(k = u.adoptedStyleSheets) || function(I) {
            if (typeof Symbol < "u" && I[Symbol.iterator] != null || I["@@iterator"] != null) return Array.from(I);
          }(k) || function(I, $) {
            if (I) {
              if (typeof I == "string") return Js(I, $);
              var G = Object.prototype.toString.call(I).slice(8, -1);
              return G === "Object" && I.constructor && (G = I.constructor.name), G === "Map" || G === "Set" ? Array.from(I) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? Js(I, $) : void 0;
            }
          }(k) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }(), [S]);
        } }, { key: "showValidationErrors", value: function(t) {
          var i = t ?? this.validate();
          Object.values(this.editors).forEach(function(u) {
            u && (u.is_dirty = !0, u.showValidationErrors(i));
          });
        } }], n && uf(r.prototype, n), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, n, a, e;
      }();
      jr.defaults = hn, jr.AbstractEditor = U, jr.AbstractTheme = _r, jr.AbstractIconLib = gr, Object.assign(jr.defaults.themes, af), Object.assign(jr.defaults.editors, so), Object.assign(jr.defaults.templates, rp), Object.assign(jr.defaults.iconlibs, Pp);
    })(), C;
  })());
})(Vc);
var zc = Vc.exports;
const la = /* @__PURE__ */ Vm(zc), zm = {
  class: "json-editor-scroll-area h-100",
  "data-bs-theme": "light"
}, qm = {
  __name: "table",
  props: {
    model: Object
  },
  setup(l) {
    const c = l, y = /* @__PURE__ */ Wf(null);
    let _ = null, g = null, C = !0;
    const p = (d, f) => {
      if (f && !f.querySelector(`link[href="${d}"]`)) {
        const m = document.createElement("link");
        m.rel = "stylesheet", m.href = d, f.appendChild(m);
      }
    }, w = (d) => {
      if (d.error)
        return { type: "string", title: "Error", default: d.error };
      const f = d.headers || [], m = {};
      return f.forEach((v) => {
        m[v] = { type: "string", title: v };
      }), {
        type: "array",
        title: "Results",
        format: "table",
        options: {
          disable_add: !0,
          disable_delete: !0,
          disable_edit_json: !0,
          disable_properties: !0,
          disable_collapse: !0
        },
        items: { type: "object", properties: m }
      };
    }, s = (d) => {
      y.value.querySelectorAll("table thead th").forEach((m, v) => {
        d[v] && (m.style.cursor = "pointer", m.style.userSelect = "none", m.style.whiteSpace = "nowrap", g === d[v] ? m.innerHTML = `${d[v]} <span style="font-size: 0.8em; margin-left: 5px;">${C ? "▲" : "▼"}</span>` : m.innerHTML = `${d[v]} <span style="font-size: 0.8em; margin-left: 5px; color: #ccc;">↕</span>`, m.onclick = () => {
          const j = d[v];
          g === j ? C = !C : (g = j, C = !0);
          let O = _.getValue();
          O.sort((x, E) => {
            let P = String(x[j] || ""), L = String(E[j] || "");
            return C ? P.localeCompare(L) : L.localeCompare(P);
          }), _.setValue(O), _.disable(), s(d);
        });
      });
    };
    return yc(async () => {
      var v, j;
      await oc();
      const d = y.value.getRootNode();
      p("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", d), p("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", document.head);
      const f = zc.JSONEditor || (la == null ? void 0 : la.JSONEditor) || window.JSONEditor, m = ((v = c.model) == null ? void 0 : v.get("value")) || { headers: [], data: [] };
      _ = new f(y.value, {
        theme: "bootstrap5",
        schema: w(m),
        startval: m.data || []
      }), _.on("ready", () => {
        _.disable(), m.headers && m.headers.length > 0 && s(m.headers);
      }), (j = c.model) == null || j.on("change:value", () => {
        const O = c.model.get("value");
        !_ || !O || (g = null, _.destroy(), _ = new f(y.value, {
          theme: "bootstrap5",
          schema: w(O),
          startval: O.data || []
        }), _.on("ready", () => {
          _.disable(), O.headers && O.headers.length > 0 && s(O.headers);
        }));
      });
    }), mc(() => {
      _ && _.destroy();
    }), (d, f) => (Ky(), Yy("div", zm, [
      Ma("div", {
        ref_key: "editorHolder",
        ref: y
      }, null, 512)
    ]));
  }
}, Um = ".json-editor-scroll-area{height:100%;overflow-x:auto;overflow-y:auto}.json-editor-scroll-area .card-title,.json-editor-scroll-area .je-object__controls,.json-editor-scroll-area .btn-group{display:none!important}.json-editor-scroll-area .card{border:none;background:transparent!important}";
function $m({ model: l, el: c }) {
  const y = document.createElement("style");
  y.innerHTML = Um, c.append(y);
  const _ = document.createElement("div");
  _.setAttribute("id", "table-vue-app"), c.append(_);
  const g = Dm(qm, { model: l });
  return g.mount(_), () => {
    g.unmount();
  };
}
export {
  $m as render
};

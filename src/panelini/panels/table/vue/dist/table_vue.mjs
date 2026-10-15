/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ra(l) {
  const c = /* @__PURE__ */ Object.create(null);
  for (const f of l.split(",")) c[f] = 1;
  return (f) => f in c;
}
const lt = {}, Ln = [], _r = () => {
}, Yu = () => !1, Vo = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // uppercase letter
(l.charCodeAt(2) > 122 || l.charCodeAt(2) < 97), zo = (l) => l.startsWith("onUpdate:"), xt = Object.assign, Ia = (l, c) => {
  const f = l.indexOf(c);
  f > -1 && l.splice(f, 1);
}, Af = Object.prototype.hasOwnProperty, tt = (l, c) => Af.call(l, c), Fe = Array.isArray, an = (l) => oo(l) === "[object Map]", Ei = (l) => oo(l) === "[object Set]", gu = (l) => oo(l) === "[object Date]", qe = (l) => typeof l == "function", ht = (l) => typeof l == "string", wr = (l) => typeof l == "symbol", nt = (l) => l !== null && typeof l == "object", Qu = (l) => (nt(l) || qe(l)) && qe(l.then) && qe(l.catch), Xu = Object.prototype.toString, oo = (l) => Xu.call(l), Rf = (l) => oo(l).slice(8, -1), ec = (l) => oo(l) === "[object Object]", Ba = (l) => ht(l) && l !== "NaN" && l[0] !== "-" && "" + parseInt(l, 10) === l, Gi = /* @__PURE__ */ Ra(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), qo = (l) => {
  const c = /* @__PURE__ */ Object.create(null);
  return (f) => c[f] || (c[f] = l(f));
}, If = /-\w/g, Xt = qo(
  (l) => l.replace(If, (c) => c.slice(1).toUpperCase())
), Bf = /\B([A-Z])/g, In = qo(
  (l) => l.replace(Bf, "-$1").toLowerCase()
), tc = qo((l) => l.charAt(0).toUpperCase() + l.slice(1)), la = qo(
  (l) => l ? `on${tc(l)}` : ""
), vr = (l, c) => !Object.is(l, c), Po = (l, ...c) => {
  for (let f = 0; f < l.length; f++)
    l[f](...c);
}, rc = (l, c, f, _ = !1) => {
  Object.defineProperty(l, c, {
    configurable: !0,
    enumerable: !1,
    writable: _,
    value: f
  });
}, Nf = (l) => {
  const c = parseFloat(l);
  return isNaN(c) ? l : c;
};
let _u;
const Uo = () => _u || (_u = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Na(l) {
  if (Fe(l)) {
    const c = {};
    for (let f = 0; f < l.length; f++) {
      const _ = l[f], v = ht(_) ? Hf(_) : Na(_);
      if (v)
        for (const O in v)
          c[O] = v[O];
    }
    return c;
  } else if (ht(l) || nt(l))
    return l;
}
const Df = /;(?![^(]*\))/g, Ff = /:([^]+)/, Mf = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Hf(l) {
  const c = {};
  return l.replace(Mf, (f) => f.startsWith("/*") ? "" : f).split(Df).forEach((f) => {
    if (f) {
      const _ = f.split(Ff);
      _.length > 1 && (c[_[0].trim()] = _[1].trim());
    }
  }), c;
}
function Da(l) {
  let c = "";
  if (ht(l))
    c = l;
  else if (Fe(l))
    for (let f = 0; f < l.length; f++) {
      const _ = Da(l[f]);
      _ && (c += _ + " ");
    }
  else if (nt(l))
    for (const f in l)
      l[f] && (c += f + " ");
  return c.trim();
}
const Vf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zf = /* @__PURE__ */ Ra(Vf);
function nc(l) {
  return !!l || l === "";
}
function qf(l, c, f) {
  if (l.length !== c.length) return !1;
  let _ = !0;
  for (let v = 0; _ && v < l.length; v++)
    _ = Pi(l[v], c[v], f);
  return _;
}
function wu(l, c, f) {
  if (l.size !== c.size) return !1;
  const _ = Array.from(c), v = new Uint8Array(_.length);
  for (const O of l) {
    let h = -1;
    for (let g = 0; g < _.length; g++)
      if (!v[g] && Pi(O, _[g], f)) {
        h = g;
        break;
      }
    if (h < 0) return !1;
    v[h] = 1;
  }
  return !0;
}
function Uf(l, c, f) {
  let _ = an(l), v = an(c);
  if (_ || v || (_ = Ei(l), v = Ei(c), _ || v))
    return _ && v ? wu(l, c, f) : !1;
  const O = Object.keys(l).length, h = Object.keys(c).length;
  if (O !== h)
    return !1;
  for (const g in l) {
    const s = l.hasOwnProperty(g), p = c.hasOwnProperty(g);
    if (s && !p || !s && p || !Pi(l[g], c[g], f))
      return !1;
  }
  return String(l) === String(c);
}
function ku(l, c, f, _) {
  f || (f = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [v, O] = f;
  if (v.has(l) || O.has(c))
    return v.get(l) === c && O.get(c) === l;
  v.set(l, c), O.set(c, l);
  const h = _(l, c, f);
  return v.delete(l), O.delete(c), h;
}
function Pi(l, c, f) {
  if (l === c) return !0;
  let _ = gu(l), v = gu(c);
  return _ || v ? _ && v ? l.getTime() === c.getTime() : !1 : (_ = wr(l), v = wr(c), _ || v ? l === c : (_ = Fe(l), v = Fe(c), _ || v ? _ && v ? ku(l, c, f, qf) : !1 : (_ = nt(l), v = nt(c), _ || v ? !_ || !v ? !1 : ku(l, c, f, Uf) : String(l) === String(c))));
}
function ic(l, c) {
  return l.findIndex((f) => Pi(f, c));
}
const oc = (l) => !!(l && l.__v_isRef === !0), Qi = (l) => ht(l) ? l : l == null ? "" : Fe(l) || nt(l) && (l.toString === Xu || !qe(l.toString)) ? oc(l) ? Qi(l.value) : JSON.stringify(l, sc, 2) : String(l), sc = (l, c) => oc(c) ? sc(l, c.value) : an(c) ? {
  [`Map(${c.size})`]: [...c.entries()].reduce(
    (f, [_, v], O) => (f[ua(_, O) + " =>"] = v, f),
    {}
  )
} : Ei(c) ? {
  [`Set(${c.size})`]: [...c.values()].map((f) => ua(f))
} : wr(c) ? ua(c) : nt(c) && !Fe(c) && !ec(c) ? String(c) : c, ua = (l, c = "") => {
  var f;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    wr(l) ? `Symbol(${(f = l.description) != null ? f : c})` : l
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let _t;
class $f {
  // TODO isolatedDeclarations "__v_skip"
  constructor(c = !1) {
    this.detached = c, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !c && _t && (_t.active ? (this.parent = _t, this.index = (_t.scopes || (_t.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let c, f;
      if (this.scopes) {
        const _ = this.scopes.slice();
        for (c = 0, f = _.length; c < f; c++)
          _[c].pause();
      }
      for (c = 0, f = this.effects.length; c < f; c++)
        this.effects[c].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let c, f;
      if (this.scopes) {
        const v = this.scopes.slice();
        for (c = 0, f = v.length; c < f; c++)
          v[c].resume();
      }
      const _ = this.effects.slice();
      for (c = 0, f = _.length; c < f; c++)
        _[c].resume();
    }
  }
  run(c) {
    if (this._active) {
      const f = _t;
      try {
        return _t = this, c();
      } finally {
        _t = f;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _t, _t = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (_t === this)
        _t = this.prevScope;
      else {
        let c = _t;
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
      let f, _;
      for (f = 0, _ = this.effects.length; f < _; f++)
        this.effects[f].stop();
      for (this.effects.length = 0, f = 0, _ = this.cleanups.length; f < _; f++)
        this.cleanups[f]();
      if (this.cleanups.length = 0, this.scopes) {
        const v = this.scopes.slice();
        for (f = 0, _ = v.length; f < _; f++)
          v[f].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !c) {
        const v = this.parent.scopes.pop();
        v && v !== this && (this.parent.scopes[this.index] = v, v.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Gf() {
  return _t;
}
let ut;
const ca = /* @__PURE__ */ new WeakSet();
class ac {
  constructor(c) {
    this.fn = c, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _t && (_t.active ? _t.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ca.has(this) && (ca.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || uc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ju(this), cc(this);
    const c = ut, f = er;
    ut = this, er = !0;
    try {
      return this.fn();
    } finally {
      dc(this), ut = c, er = f, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let c = this.deps; c; c = c.nextDep)
        Ha(c);
      this.deps = this.depsTail = void 0, ju(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ca.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    wa(this) && this.run();
  }
  get dirty() {
    return wa(this);
  }
}
let lc = 0, Wi, Ji;
function uc(l, c = !1) {
  if (l.flags |= 8, c) {
    l.next = Ji, Ji = l;
    return;
  }
  l.next = Wi, Wi = l;
}
function Fa() {
  lc++;
}
function Ma() {
  if (--lc > 0)
    return;
  if (Ji) {
    let c = Ji;
    for (Ji = void 0; c; ) {
      const f = c.next;
      c.next = void 0, c.flags &= -9, c = f;
    }
  }
  let l;
  for (; Wi; ) {
    let c = Wi;
    for (Wi = void 0; c; ) {
      const f = c.next;
      if (c.next = void 0, c.flags &= -9, c.flags & 1)
        try {
          c.trigger();
        } catch (_) {
          l || (l = _);
        }
      c = f;
    }
  }
  if (l) throw l;
}
function cc(l) {
  for (let c = l.deps; c; c = c.nextDep)
    c.version = -1, c.prevActiveLink = c.dep.activeLink, c.dep.activeLink = c;
}
function dc(l) {
  let c, f = l.depsTail, _ = f;
  for (; _; ) {
    const v = _.prevDep;
    _.version === -1 ? (_ === f && (f = v), Ha(_), Wf(_)) : c = _, _.dep.activeLink = _.prevActiveLink, _.prevActiveLink = void 0, _ = v;
  }
  l.deps = c, l.depsTail = f;
}
function wa(l) {
  for (let c = l.deps; c; c = c.nextDep)
    if (c.dep.version !== c.version || c.dep.computed && (hc(c.dep.computed) || c.dep.version !== c.version))
      return !0;
  return !!l._dirty;
}
function hc(l) {
  if (l.flags & 4 && !(l.flags & 16) || (l.flags &= -17, l.globalVersion === Xi) || (l.globalVersion = Xi, !l.isSSR && l.flags & 128 && (!l.deps && !l._dirty || !wa(l))))
    return;
  l.flags |= 2;
  const c = l.dep, f = ut, _ = er;
  ut = l, er = !0;
  try {
    cc(l);
    const v = l.fn(l._value);
    (c.version === 0 || vr(v, l._value)) && (l.flags |= 128, l._value = v, c.version++);
  } catch (v) {
    throw c.version++, v;
  } finally {
    ut = f, er = _, dc(l), l.flags &= -3;
  }
}
function Ha(l, c = !1) {
  const { dep: f, prevSub: _, nextSub: v } = l;
  if (_ && (_.nextSub = v, l.prevSub = void 0), v && (v.prevSub = _, l.nextSub = void 0), f.subs === l && (f.subs = _, !_ && f.computed)) {
    f.computed.flags &= -5;
    for (let O = f.computed.deps; O; O = O.nextDep)
      Ha(O, !0);
  }
  !c && !--f.sc && f.map && f.map.delete(f.key);
}
function Wf(l) {
  const { prevDep: c, nextDep: f } = l;
  c && (c.nextDep = f, l.prevDep = void 0), f && (f.prevDep = c, l.nextDep = void 0);
}
let er = !0;
const pc = [];
function Nr() {
  pc.push(er), er = !1;
}
function Dr() {
  const l = pc.pop();
  er = l === void 0 ? !0 : l;
}
function ju(l) {
  const { cleanup: c } = l;
  if (l.cleanup = void 0, c) {
    const f = ut;
    ut = void 0;
    try {
      c();
    } finally {
      ut = f;
    }
  }
}
let Xi = 0;
class Jf {
  constructor(c, f) {
    this.sub = c, this.dep = f, this.version = f.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Va {
  // TODO isolatedDeclarations "__v_skip"
  constructor(c) {
    this.computed = c, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(c) {
    if (!ut || !er || ut === this.computed)
      return;
    let f = this.activeLink;
    if (f === void 0 || f.sub !== ut)
      f = this.activeLink = new Jf(ut, this), ut.deps ? (f.prevDep = ut.depsTail, ut.depsTail.nextDep = f, ut.depsTail = f) : ut.deps = ut.depsTail = f, fc(f);
    else if (f.version === -1 && (f.version = this.version, f.nextDep)) {
      const _ = f.nextDep;
      _.prevDep = f.prevDep, f.prevDep && (f.prevDep.nextDep = _), f.prevDep = ut.depsTail, f.nextDep = void 0, ut.depsTail.nextDep = f, ut.depsTail = f, ut.deps === f && (ut.deps = _);
    }
    return f;
  }
  trigger(c) {
    this.version++, Xi++, this.notify(c);
  }
  notify(c) {
    Fa();
    try {
      for (let f = this.subs; f; f = f.prevSub)
        f.sub.notify() && f.sub.dep.notify();
    } finally {
      Ma();
    }
  }
}
function fc(l) {
  if (l.dep.sc++, l.sub.flags & 4) {
    const c = l.dep.computed;
    if (c && !l.dep.subs) {
      c.flags |= 20;
      for (let _ = c.deps; _; _ = _.nextDep)
        fc(_);
    }
    const f = l.dep.subs;
    f !== l && (l.prevSub = f, f && (f.nextSub = l)), l.dep.subs = l;
  }
}
const ka = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ Symbol(
  ""
), ja = /* @__PURE__ */ Symbol(
  ""
), eo = /* @__PURE__ */ Symbol(
  ""
);
function kt(l, c, f) {
  if (er && ut) {
    let _ = ka.get(l);
    _ || ka.set(l, _ = /* @__PURE__ */ new Map());
    let v = _.get(f);
    v || (_.set(f, v = new Va()), v.map = _, v.key = f), v.track();
  }
}
function Rr(l, c, f, _, v, O) {
  const h = ka.get(l);
  if (!h) {
    Xi++;
    return;
  }
  const g = (s) => {
    s && s.trigger();
  };
  if (Fa(), c === "clear")
    h.forEach(g);
  else {
    const s = Fe(l), p = s && Ba(f);
    if (s && f === "length") {
      const y = Number(_);
      h.forEach((m, w) => {
        (w === "length" || w === eo || !wr(w) && w >= y) && g(m);
      });
    } else
      switch ((f !== void 0 || h.has(void 0)) && g(h.get(f)), p && g(h.get(eo)), c) {
        case "add":
          s ? p && g(h.get("length")) : (g(h.get(An)), an(l) && g(h.get(ja)));
          break;
        case "delete":
          s || (g(h.get(An)), an(l) && g(h.get(ja)));
          break;
        case "set":
          an(l) && g(h.get(An));
          break;
      }
  }
  Ma();
}
function ki(l) {
  const c = /* @__PURE__ */ et(l);
  return c === l || (kt(c, "iterate", eo), /* @__PURE__ */ Dt(l)) ? c : /* @__PURE__ */ kr(l) ? /* @__PURE__ */ ln(l) ? c.map((f) => un(Ft(f))) : c.map(un) : c.map(Ft);
}
function $o(l) {
  return kt(l = /* @__PURE__ */ et(l), "iterate", eo), l;
}
function mr(l, c) {
  return /* @__PURE__ */ kr(l) ? un(/* @__PURE__ */ ln(l) ? Ft(c) : c) : Ft(c);
}
const Kf = {
  __proto__: null,
  [Symbol.iterator]() {
    return da(this, Symbol.iterator, (l) => mr(this, l));
  },
  concat(...l) {
    return ki(this).concat(
      ...l.map((c) => Fe(c) ? ki(c) : c)
    );
  },
  entries() {
    return da(this, "entries", (l) => (l[1] = mr(this, l[1]), l));
  },
  every(l, c) {
    return Tr(this, "every", l, c, void 0, arguments);
  },
  filter(l, c) {
    return Tr(
      this,
      "filter",
      l,
      c,
      (f) => f.map((_) => mr(this, _)),
      arguments
    );
  },
  find(l, c) {
    return Tr(
      this,
      "find",
      l,
      c,
      (f) => mr(this, f),
      arguments
    );
  },
  findIndex(l, c) {
    return Tr(this, "findIndex", l, c, void 0, arguments);
  },
  findLast(l, c) {
    return Tr(
      this,
      "findLast",
      l,
      c,
      (f) => mr(this, f),
      arguments
    );
  },
  findLastIndex(l, c) {
    return Tr(this, "findLastIndex", l, c, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(l, c) {
    return Tr(this, "forEach", l, c, void 0, arguments);
  },
  includes(...l) {
    return ha(this, "includes", l);
  },
  indexOf(...l) {
    return ha(this, "indexOf", l);
  },
  join(l) {
    return ki(this).join(l);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...l) {
    return ha(this, "lastIndexOf", l);
  },
  map(l, c) {
    return Tr(this, "map", l, c, void 0, arguments);
  },
  pop() {
    return zi(this, "pop");
  },
  push(...l) {
    return zi(this, "push", l);
  },
  reduce(l, ...c) {
    return xu(this, "reduce", l, c);
  },
  reduceRight(l, ...c) {
    return xu(this, "reduceRight", l, c);
  },
  shift() {
    return zi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(l, c) {
    return Tr(this, "some", l, c, void 0, arguments);
  },
  splice(...l) {
    return zi(this, "splice", l);
  },
  toReversed() {
    return ki(this).toReversed();
  },
  toSorted(l) {
    return ki(this).toSorted(l);
  },
  toSpliced(...l) {
    return ki(this).toSpliced(...l);
  },
  unshift(...l) {
    return zi(this, "unshift", l);
  },
  values() {
    return da(this, "values", (l) => mr(this, l));
  }
};
function da(l, c, f) {
  const _ = $o(l), v = _[c]();
  return _ !== l && !/* @__PURE__ */ Dt(l) && (v._next = v.next, v.next = () => {
    const O = v._next();
    return O.done || (O.value = f(O.value)), O;
  }), v;
}
const Zf = Array.prototype;
function Tr(l, c, f, _, v, O) {
  const h = $o(l), g = h !== l && !/* @__PURE__ */ Dt(l), s = h[c];
  if (s !== Zf[c]) {
    const m = s.apply(l, O);
    return g ? Ft(m) : m;
  }
  let p = f;
  h !== l && (g ? p = function(m, w) {
    return f.call(this, mr(l, m), w, l);
  } : f.length > 2 && (p = function(m, w) {
    return f.call(this, m, w, l);
  }));
  const y = s.call(h, p, _);
  return g && v ? v(y) : y;
}
function xu(l, c, f, _) {
  const v = $o(l), O = v !== l && !/* @__PURE__ */ Dt(l);
  let h = f, g = !1;
  v !== l && (O ? (g = _.length === 0, h = function(p, y, m) {
    return g && (g = !1, p = mr(l, p)), f.call(this, p, mr(l, y), m, l);
  }) : f.length > 3 && (h = function(p, y, m) {
    return f.call(this, p, y, m, l);
  }));
  const s = v[c](h, ..._);
  return g ? mr(l, s) : s;
}
function ha(l, c, f) {
  const _ = /* @__PURE__ */ et(l);
  kt(_, "iterate", eo);
  const v = _[c](...f);
  return (v === -1 || v === !1) && /* @__PURE__ */ $a(f[0]) ? (f[0] = /* @__PURE__ */ et(f[0]), _[c](...f)) : v;
}
function zi(l, c, f = []) {
  Nr(), Fa();
  const _ = (/* @__PURE__ */ et(l))[c].apply(l, f);
  return Ma(), Dr(), _;
}
const Yf = /* @__PURE__ */ Ra("__proto__,__v_isRef,__isVue"), yc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((l) => l !== "arguments" && l !== "caller").map((l) => Symbol[l]).filter(wr)
);
function Qf(l) {
  wr(l) || (l = String(l));
  const c = /* @__PURE__ */ et(this);
  return kt(c, "has", l), c.hasOwnProperty(l);
}
class mc {
  constructor(c = !1, f = !1) {
    this._isReadonly = c, this._isShallow = f;
  }
  get(c, f, _) {
    if (f === "__v_skip") return c.__v_skip;
    const v = this._isReadonly, O = this._isShallow;
    if (f === "__v_isReactive")
      return !v;
    if (f === "__v_isReadonly")
      return v;
    if (f === "__v_isShallow")
      return O;
    if (f === "__v_raw")
      return _ === (v ? O ? ly : _c : O ? gc : vc).get(c) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(c) === Object.getPrototypeOf(_) ? c : void 0;
    const h = Fe(c);
    if (!v) {
      let s;
      if (h && (s = Kf[f]))
        return s;
      if (f === "hasOwnProperty")
        return Qf;
    }
    const g = Reflect.get(
      c,
      f,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ jt(c) ? c : _
    );
    if ((wr(f) ? yc.has(f) : Yf(f)) || (v || kt(c, "get", f), O))
      return g;
    if (/* @__PURE__ */ jt(g)) {
      const s = h && Ba(f) ? g : g.value;
      return v && nt(s) ? /* @__PURE__ */ Oa(s) : s;
    }
    return nt(g) ? v ? /* @__PURE__ */ Oa(g) : /* @__PURE__ */ qa(g) : g;
  }
}
class bc extends mc {
  constructor(c = !1) {
    super(!1, c);
  }
  set(c, f, _, v) {
    let O = c[f];
    const h = Fe(c) && Ba(f);
    if (!this._isShallow) {
      const p = /* @__PURE__ */ kr(O);
      if (!/* @__PURE__ */ Dt(_) && !/* @__PURE__ */ kr(_) && (O = /* @__PURE__ */ et(O), _ = /* @__PURE__ */ et(_)), !h && /* @__PURE__ */ jt(O) && !/* @__PURE__ */ jt(_))
        return p || (O.value = _), !0;
    }
    const g = h ? Number(f) < c.length : tt(c, f), s = Reflect.set(
      c,
      f,
      _,
      /* @__PURE__ */ jt(c) ? c : v
    );
    return c === /* @__PURE__ */ et(v) && s && (g ? vr(_, O) && Rr(c, "set", f, _) : Rr(c, "add", f, _)), s;
  }
  deleteProperty(c, f) {
    const _ = tt(c, f);
    c[f];
    const v = Reflect.deleteProperty(c, f);
    return v && _ && Rr(c, "delete", f, void 0), v;
  }
  has(c, f) {
    const _ = Reflect.has(c, f);
    return (!wr(f) || !yc.has(f)) && kt(c, "has", f), _;
  }
  ownKeys(c) {
    return kt(
      c,
      "iterate",
      Fe(c) ? "length" : An
    ), Reflect.ownKeys(c);
  }
}
class Xf extends mc {
  constructor(c = !1) {
    super(!0, c);
  }
  set(c, f) {
    return !0;
  }
  deleteProperty(c, f) {
    return !0;
  }
}
const ey = /* @__PURE__ */ new bc(), ty = /* @__PURE__ */ new Xf(), ry = /* @__PURE__ */ new bc(!0);
const xa = (l) => l, Oo = (l) => Reflect.getPrototypeOf(l);
function ny(l, c, f) {
  return function(..._) {
    const v = this.__v_raw, O = /* @__PURE__ */ et(v), h = an(O), g = l === "entries" || l === Symbol.iterator && h, s = l === "keys" && h, p = v[l](..._), y = f ? xa : c ? un : Ft;
    return !c && kt(
      O,
      "iterate",
      s ? ja : An
    ), xt(
      // inheriting all iterator properties
      Object.create(p),
      {
        // iterator protocol
        next() {
          const { value: m, done: w } = p.next();
          return w ? { value: m, done: w } : {
            value: g ? [y(m[0]), y(m[1])] : y(m),
            done: w
          };
        }
      }
    );
  };
}
function Co(l) {
  return function(...c) {
    return l === "delete" ? !1 : l === "clear" ? void 0 : this;
  };
}
function iy(l, c) {
  const f = {
    get(v) {
      const O = this.__v_raw, h = /* @__PURE__ */ et(O), g = /* @__PURE__ */ et(v);
      l || (vr(v, g) && kt(h, "get", v), kt(h, "get", g));
      const { has: s } = Oo(h), p = c ? xa : l ? un : Ft;
      if (s.call(h, v))
        return p(O.get(v));
      if (s.call(h, g))
        return p(O.get(g));
      O !== h && O.get(v);
    },
    get size() {
      const v = this.__v_raw;
      return !l && kt(/* @__PURE__ */ et(v), "iterate", An), v.size;
    },
    has(v) {
      const O = this.__v_raw, h = /* @__PURE__ */ et(O), g = /* @__PURE__ */ et(v);
      return l || (vr(v, g) && kt(h, "has", v), kt(h, "has", g)), v === g ? O.has(v) : O.has(v) || O.has(g);
    },
    forEach(v, O) {
      const h = this, g = h.__v_raw, s = /* @__PURE__ */ et(g), p = c ? xa : l ? un : Ft;
      return !l && kt(s, "iterate", An), g.forEach((y, m) => v.call(O, p(y), p(m), h));
    }
  };
  return xt(
    f,
    l ? {
      add: Co("add"),
      set: Co("set"),
      delete: Co("delete"),
      clear: Co("clear")
    } : {
      add(v) {
        const O = /* @__PURE__ */ et(this), h = Oo(O), g = /* @__PURE__ */ et(v), s = !c && !/* @__PURE__ */ Dt(v) && !/* @__PURE__ */ kr(v) ? g : v;
        return h.has.call(O, s) || vr(v, s) && h.has.call(O, v) || vr(g, s) && h.has.call(O, g) || (O.add(s), Rr(O, "add", s, s)), this;
      },
      set(v, O) {
        !c && !/* @__PURE__ */ Dt(O) && !/* @__PURE__ */ kr(O) && (O = /* @__PURE__ */ et(O));
        const h = /* @__PURE__ */ et(this), { has: g, get: s } = Oo(h);
        let p = g.call(h, v);
        p || (v = /* @__PURE__ */ et(v), p = g.call(h, v));
        const y = s.call(h, v);
        return h.set(v, O), p ? vr(O, y) && Rr(h, "set", v, O) : Rr(h, "add", v, O), this;
      },
      delete(v) {
        const O = /* @__PURE__ */ et(this), { has: h, get: g } = Oo(O);
        let s = h.call(O, v);
        s || (v = /* @__PURE__ */ et(v), s = h.call(O, v)), g && g.call(O, v);
        const p = O.delete(v);
        return s && Rr(O, "delete", v, void 0), p;
      },
      clear() {
        const v = /* @__PURE__ */ et(this), O = v.size !== 0, h = v.clear();
        return O && Rr(
          v,
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
  ].forEach((v) => {
    f[v] = ny(v, l, c);
  }), f;
}
function za(l, c) {
  const f = iy(l, c);
  return (_, v, O) => v === "__v_isReactive" ? !l : v === "__v_isReadonly" ? l : v === "__v_raw" ? _ : Reflect.get(
    tt(f, v) && v in _ ? f : _,
    v,
    O
  );
}
const oy = {
  get: /* @__PURE__ */ za(!1, !1)
}, sy = {
  get: /* @__PURE__ */ za(!1, !0)
}, ay = {
  get: /* @__PURE__ */ za(!0, !1)
};
const vc = /* @__PURE__ */ new WeakMap(), gc = /* @__PURE__ */ new WeakMap(), _c = /* @__PURE__ */ new WeakMap(), ly = /* @__PURE__ */ new WeakMap();
function uy(l) {
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
function qa(l) {
  return /* @__PURE__ */ kr(l) ? l : Ua(
    l,
    !1,
    ey,
    oy,
    vc
  );
}
// @__NO_SIDE_EFFECTS__
function cy(l) {
  return Ua(
    l,
    !1,
    ry,
    sy,
    gc
  );
}
// @__NO_SIDE_EFFECTS__
function Oa(l) {
  return Ua(
    l,
    !0,
    ty,
    ay,
    _c
  );
}
function Ua(l, c, f, _, v) {
  if (!nt(l) || l.__v_raw && !(c && l.__v_isReactive) || l.__v_skip || !Object.isExtensible(l))
    return l;
  const O = v.get(l);
  if (O)
    return O;
  const h = uy(Rf(l));
  if (h === 0)
    return l;
  const g = new Proxy(
    l,
    h === 2 ? _ : f
  );
  return v.set(l, g), g;
}
// @__NO_SIDE_EFFECTS__
function ln(l) {
  return /* @__PURE__ */ kr(l) ? /* @__PURE__ */ ln(l.__v_raw) : !!(l && l.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function kr(l) {
  return !!(l && l.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Dt(l) {
  return !!(l && l.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $a(l) {
  return l ? !!l.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function et(l) {
  const c = l && l.__v_raw;
  return c ? /* @__PURE__ */ et(c) : l;
}
function dy(l) {
  return !tt(l, "__v_skip") && Object.isExtensible(l) && rc(l, "__v_skip", !0), l;
}
const Ft = (l) => nt(l) ? /* @__PURE__ */ qa(l) : l, un = (l) => nt(l) ? /* @__PURE__ */ Oa(l) : l;
// @__NO_SIDE_EFFECTS__
function jt(l) {
  return l ? l.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Yt(l) {
  return hy(l, !1);
}
function hy(l, c) {
  return /* @__PURE__ */ jt(l) ? l : new py(l, c);
}
class py {
  constructor(c, f) {
    this.dep = new Va(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = f ? c : /* @__PURE__ */ et(c), this._value = f ? c : Ft(c), this.__v_isShallow = f;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(c) {
    const f = this._rawValue, _ = this.__v_isShallow || /* @__PURE__ */ Dt(c) || /* @__PURE__ */ kr(c);
    c = _ ? c : /* @__PURE__ */ et(c), vr(c, f) && (this._rawValue = c, this._value = _ ? c : Ft(c), this.dep.trigger());
  }
}
function fy(l) {
  return /* @__PURE__ */ jt(l) ? l.value : l;
}
const yy = {
  get: (l, c, f) => c === "__v_raw" ? l : fy(Reflect.get(l, c, f)),
  set: (l, c, f, _) => {
    const v = l[c];
    return /* @__PURE__ */ jt(v) && !/* @__PURE__ */ jt(f) ? (v.value = f, !0) : Reflect.set(l, c, f, _);
  }
};
function wc(l) {
  return /* @__PURE__ */ ln(l) ? l : new Proxy(l, yy);
}
class my {
  constructor(c, f, _) {
    this.fn = c, this.setter = f, this._value = void 0, this.dep = new Va(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Xi - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !f, this.isSSR = _;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ut !== this)
      return uc(this, !0), !0;
  }
  get value() {
    const c = this.dep.track();
    return hc(this), c && (c.version = this.dep.version), this._value;
  }
  set value(c) {
    this.setter && this.setter(c);
  }
}
// @__NO_SIDE_EFFECTS__
function by(l, c, f = !1) {
  let _, v;
  return qe(l) ? _ = l : (_ = l.get, v = l.set), new my(_, v, f);
}
const Eo = {}, Ro = /* @__PURE__ */ new WeakMap();
let Tn;
function vy(l, c = !1, f = Tn) {
  if (f) {
    let _ = Ro.get(f);
    _ || Ro.set(f, _ = []), _.push(l);
  }
}
function gy(l, c, f = lt) {
  const { immediate: _, deep: v, once: O, scheduler: h, augmentJob: g, call: s } = f, p = (R) => v ? R : /* @__PURE__ */ Dt(R) || v === !1 || v === 0 ? Ir(R, 1) : Ir(R);
  let y, m, w, k, C = !1, x = !1;
  if (/* @__PURE__ */ jt(l) ? (m = () => l.value, C = /* @__PURE__ */ Dt(l)) : /* @__PURE__ */ ln(l) ? (m = () => p(l), C = !0) : Fe(l) ? (x = !0, C = l.some((R) => /* @__PURE__ */ ln(R) || /* @__PURE__ */ Dt(R)), m = () => l.map((R) => {
    if (/* @__PURE__ */ jt(R))
      return R.value;
    if (/* @__PURE__ */ ln(R))
      return p(R);
    if (qe(R))
      return s ? s(R, 2) : R();
  })) : qe(l) ? c ? m = s ? () => s(l, 2) : l : m = () => {
    if (w) {
      Nr();
      try {
        w();
      } finally {
        Dr();
      }
    }
    const R = Tn;
    Tn = y;
    try {
      return s ? s(l, 3, [k]) : l(k);
    } finally {
      Tn = R;
    }
  } : m = _r, c && v) {
    const R = m, F = v === !0 ? 1 / 0 : v;
    m = () => Ir(R(), F);
  }
  const E = Gf(), P = () => {
    y.stop(), E && E.active && Ia(E.effects, y);
  };
  if (O && c) {
    const R = c;
    c = (...F) => {
      const M = R(...F);
      return P(), M;
    };
  }
  let L = x ? new Array(l.length).fill(Eo) : Eo;
  const A = (R) => {
    if (!(!(y.flags & 1) || !y.dirty && !R))
      if (c) {
        const F = y.run();
        if (R || v || C || (x ? F.some((M, z) => vr(M, L[z])) : vr(F, L))) {
          w && w();
          const M = Tn;
          Tn = y;
          try {
            const z = [
              F,
              // pass undefined as the old value when it's changed for the first time
              L === Eo ? void 0 : x && L[0] === Eo ? [] : L,
              k
            ];
            L = F, s ? s(c, 3, z) : (
              // @ts-expect-error
              c(...z)
            );
          } finally {
            Tn = M;
          }
        }
      } else
        y.run();
  };
  return g && g(A), y = new ac(m), y.scheduler = h ? () => h(A, !1) : A, k = (R) => vy(R, !1, y), w = y.onStop = () => {
    const R = Ro.get(y);
    if (R) {
      if (s)
        s(R, 4);
      else
        for (const F of R) F();
      Ro.delete(y);
    }
  }, c ? _ ? A(!0) : L = y.run() : h ? h(A.bind(null, !0), !0) : y.run(), P.pause = y.pause.bind(y), P.resume = y.resume.bind(y), P.stop = P, P;
}
function Ir(l, c = 1 / 0, f) {
  if (c <= 0 || !nt(l) || l.__v_skip || (f = f || /* @__PURE__ */ new Map(), (f.get(l) || 0) >= c))
    return l;
  if (f.set(l, c), c--, /* @__PURE__ */ jt(l))
    Ir(l.value, c, f);
  else if (Fe(l))
    for (let _ = 0; _ < l.length; _++)
      Ir(l[_], c, f);
  else if (Ei(l) || an(l))
    l.forEach((_) => {
      Ir(_, c, f);
    });
  else if (ec(l)) {
    for (const _ in l)
      Ir(l[_], c, f);
    for (const _ of Object.getOwnPropertySymbols(l))
      Object.prototype.propertyIsEnumerable.call(l, _) && Ir(l[_], c, f);
  }
  return l;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function so(l, c, f, _) {
  try {
    return _ ? l(..._) : l();
  } catch (v) {
    Go(v, c, f);
  }
}
function rr(l, c, f, _) {
  if (qe(l)) {
    const v = so(l, c, f, _);
    return v && Qu(v) && v.catch((O) => {
      Go(O, c, f);
    }), v;
  }
  if (Fe(l)) {
    const v = [];
    for (let O = 0; O < l.length; O++)
      v.push(rr(l[O], c, f, _));
    return v;
  }
}
function Go(l, c, f, _ = !0) {
  const v = c ? c.vnode : null, { errorHandler: O, throwUnhandledErrorInProduction: h } = c && c.appContext.config || lt;
  if (c) {
    let g = c.parent;
    const s = c.proxy, p = `https://vuejs.org/error-reference/#runtime-${f}`;
    for (; g; ) {
      const y = g.ec;
      if (y) {
        for (let m = 0; m < y.length; m++)
          if (y[m](l, s, p) === !1)
            return;
      }
      g = g.parent;
    }
    if (O) {
      Nr(), so(O, null, 10, [
        l,
        s,
        p
      ]), Dr();
      return;
    }
  }
  _y(l, f, v, _, h);
}
function _y(l, c, f, _ = !0, v = !1) {
  if (v)
    throw l;
  console.error(l);
}
const Pt = [];
let yr = -1;
const Oi = [];
let sn = null, xi = 0;
const kc = /* @__PURE__ */ Promise.resolve();
let Io = null;
function Ca(l) {
  const c = Io || kc;
  return l ? c.then(this ? l.bind(this) : l) : c;
}
function wy(l) {
  let c = yr + 1, f = Pt.length;
  for (; c < f; ) {
    const _ = c + f >>> 1, v = Pt[_], O = to(v);
    O < l || O === l && v.flags & 2 ? c = _ + 1 : f = _;
  }
  return c;
}
function Ga(l) {
  if (!(l.flags & 1)) {
    const c = to(l), f = Pt[Pt.length - 1];
    !f || // fast path when the job id is larger than the tail
    !(l.flags & 2) && c >= to(f) ? Pt.push(l) : Pt.splice(wy(c), 0, l), l.flags |= 1, jc();
  }
}
function jc() {
  Io || (Io = kc.then(Oc));
}
function ky(l) {
  if (!Fe(l))
    sn && l.id === -1 ? sn.splice(xi + 1, 0, l) : l.flags & 1 || (Oi.push(l), l.flags |= 1);
  else
    for (let c = 0; c < l.length; c++)
      Oi.push(l[c]);
  jc();
}
function Ou(l, c, f = yr + 1) {
  for (; f < Pt.length; f++) {
    const _ = Pt[f];
    if (_ && _.flags & 2) {
      if (l && _.id !== l.uid)
        continue;
      Pt.splice(f, 1), f--, _.flags & 4 && (_.flags &= -2), _(), _.flags & 4 || (_.flags &= -2);
    }
  }
}
function xc(l) {
  if (Oi.length) {
    const c = [...new Set(Oi)].sort(
      (f, _) => to(f) - to(_)
    );
    if (Oi.length = 0, sn) {
      for (let f = 0; f < c.length; f++)
        sn.push(c[f]);
      return;
    }
    for (sn = c, xi = 0; xi < sn.length; xi++) {
      const f = sn[xi];
      f.flags & 4 && (f.flags &= -2), f.flags & 8 || f(), f.flags &= -2;
    }
    sn = null, xi = 0;
  }
}
const to = (l) => l.id == null ? l.flags & 2 ? -1 : 1 / 0 : l.id;
function Oc(l) {
  try {
    for (yr = 0; yr < Pt.length; yr++) {
      const c = Pt[yr];
      c && !(c.flags & 8) && (c.flags & 4 && (c.flags &= -2), so(
        c,
        c.i,
        c.i ? 15 : 14
      ), c.flags & 4 || (c.flags &= -2));
    }
  } finally {
    for (; yr < Pt.length; yr++) {
      const c = Pt[yr];
      c && (c.flags &= -2);
    }
    yr = -1, Pt.length = 0, xc(), Io = null, (Pt.length || Oi.length) && Oc();
  }
}
let Nt = null, Cc = null;
function Bo(l) {
  const c = Nt;
  return Nt = l, Cc = l && l.type.__scopeId || null, c;
}
function jy(l, c = Nt, f) {
  if (!c || l._n)
    return l;
  const _ = (...v) => {
    _._d && Nu(-1);
    const O = Bo(c), h = Rn.length;
    let g;
    try {
      g = l(...v);
    } finally {
      for (let s = Rn.length; s > h; s--) Xc();
      Bo(O), _._d && Nu(1);
    }
    return g;
  };
  return _._n = !0, _._c = !0, _._d = !0, _;
}
function xy(l, c) {
  if (Nt === null)
    return l;
  const f = Yo(Nt), _ = l.dirs || (l.dirs = []);
  for (let v = 0; v < c.length; v++) {
    let [O, h, g, s = lt] = c[v];
    O && (qe(O) && (O = {
      mounted: O,
      updated: O
    }), O.deep && Ir(h), _.push({
      dir: O,
      instance: f,
      value: h,
      oldValue: void 0,
      arg: g,
      modifiers: s
    }));
  }
  return l;
}
function Sn(l, c, f, _) {
  const v = l.dirs, O = c && c.dirs;
  for (let h = 0; h < v.length; h++) {
    const g = v[h];
    O && (g.oldValue = O[h].value);
    let s = g.dir[_];
    s && (Nr(), rr(s, f, 8, [
      l.el,
      g,
      l,
      c
    ]), Dr());
  }
}
function Oy(l, c) {
  if (Tt) {
    let f = Tt.provides;
    const _ = Tt.parent && Tt.parent.provides;
    _ === f && (f = Tt.provides = Object.create(_)), f[l] = c;
  }
}
function To(l, c, f = !1) {
  const _ = wm();
  if (_ || Ci) {
    let v = Ci ? Ci._context.provides : _ ? _.parent == null || _.ce ? _.vnode.appContext && _.vnode.appContext.provides : _.parent.provides : void 0;
    if (v && l in v)
      return v[l];
    if (arguments.length > 1)
      return f && qe(c) ? c.call(_ && _.proxy) : c;
  }
}
const Cy = /* @__PURE__ */ Symbol.for("v-scx"), Ey = () => To(Cy);
function Lo(l, c, f) {
  return Ec(l, c, f);
}
function Ec(l, c, f = lt) {
  const { immediate: _, deep: v, flush: O, once: h } = f, g = xt({}, f), s = c && _ || !c && O !== "post";
  let p;
  if (io) {
    if (O === "sync") {
      const k = Ey();
      p = k.__watcherHandles || (k.__watcherHandles = []);
    } else if (!s) {
      const k = () => {
      };
      return k.stop = _r, k.resume = _r, k.pause = _r, k;
    }
  }
  const y = Tt;
  g.call = (k, C, x) => rr(k, y, C, x);
  let m = !1;
  O === "post" ? g.scheduler = (k) => {
    Lt(k, y && y.suspense);
  } : O !== "sync" && (m = !0, g.scheduler = (k, C) => {
    C ? k() : Ga(k);
  }), g.augmentJob = (k) => {
    c && (k.flags |= 4), m && (k.flags |= 2, y && (k.id = y.uid, k.i = y));
  };
  const w = gy(l, c, g);
  return io && (p ? p.push(w) : s && w()), w;
}
function Sy(l, c, f) {
  const _ = this.proxy, v = ht(l) ? l.includes(".") ? Sc(_, l) : () => _[l] : l.bind(_, _);
  let O;
  qe(c) ? O = c : (O = c.handler, f = c);
  const h = ao(this), g = Ec(v, O.bind(_), f);
  return h(), g;
}
function Sc(l, c) {
  const f = c.split(".");
  return () => {
    let _ = l;
    for (let v = 0; v < f.length && _; v++)
      _ = _[f[v]];
    return _;
  };
}
const Py = /* @__PURE__ */ Symbol("_vte"), Wo = (l) => l.__isTeleport, pa = /* @__PURE__ */ Symbol("_leaveCb");
function Ty(l) {
  let c = l[0];
  if (l.length > 1) {
    for (const f of l)
      if (f.type !== Fr) {
        c = f;
        break;
      }
  }
  return c;
}
function Pc(l) {
  if (!Ja(l))
    return Wo(l.type) && l.children ? Ty(l.children) : l;
  if (l.component)
    return l.component.subTree;
  const { shapeFlag: c, children: f } = l;
  if (f) {
    if (c & 16)
      return f[0];
    if (c & 32 && qe(f.default))
      return f.default();
  }
}
function Wa(l, c) {
  if (l.shapeFlag & 6 && l.component) {
    l.transition = c;
    const f = l.component.subTree;
    Wa(
      Wo(f.type) && Pc(f) || f,
      c
    );
  } else l.shapeFlag & 128 ? (l.ssContent.transition = c.clone(l.ssContent), l.ssFallback.transition = c.clone(l.ssFallback)) : l.transition = c;
}
function Tc(l) {
  l.ids = [l.ids[0] + l.ids[2]++ + "-", 0, 0];
}
function Cu(l, c) {
  let f;
  return !!((f = Object.getOwnPropertyDescriptor(l, c)) && !f.configurable);
}
const No = /* @__PURE__ */ new WeakMap();
function Ki(l, c, f, _, v = !1) {
  if (Fe(l)) {
    l.forEach(
      (x, E) => Ki(
        x,
        c && (Fe(c) ? c[E] : c),
        f,
        _,
        v
      )
    );
    return;
  }
  if (Zi(_) && !v) {
    _.shapeFlag & 512 && _.type.__asyncResolved && _.component.subTree.component && Ki(l, c, f, _.component.subTree);
    return;
  }
  const O = _.shapeFlag & 4 ? Yo(_.component) : _.el, h = v ? null : O, { i: g, r: s } = l, p = c && c.r, y = g.refs === lt ? g.refs = {} : g.refs, m = g.setupState, w = /* @__PURE__ */ et(m), k = m === lt ? Yu : (x) => Cu(y, x) ? !1 : tt(w, x), C = (x, E) => !(E && Cu(y, E));
  if (p != null && p !== s) {
    if (Eu(c), ht(p))
      y[p] = null, k(p) && (m[p] = null);
    else if (/* @__PURE__ */ jt(p)) {
      const x = c;
      C(p, x.k) && (p.value = null), x.k && (y[x.k] = null);
    }
  }
  if (qe(s))
    so(s, g, 12, [h, y]);
  else {
    const x = ht(s), E = /* @__PURE__ */ jt(s);
    if (x || E) {
      const P = () => {
        if (l.f) {
          const L = x ? k(s) ? m[s] : y[s] : C() || !l.k ? s.value : y[l.k];
          if (v)
            Fe(L) && Ia(L, O);
          else if (Fe(L))
            L.includes(O) || L.push(O);
          else if (x)
            y[s] = [O], k(s) && (m[s] = y[s]);
          else {
            const A = [O];
            C(s, l.k) && (s.value = A), l.k && (y[l.k] = A);
          }
        } else x ? (y[s] = h, k(s) && (m[s] = h)) : E && (C(s, l.k) && (s.value = h), l.k && (y[l.k] = h));
      };
      if (h) {
        const L = () => {
          P(), No.delete(l);
        };
        L.id = -1, No.set(l, L), Lt(L, f);
      } else
        Eu(l), P();
    }
  }
}
function Eu(l) {
  const c = No.get(l);
  c && (c.flags |= 8, No.delete(l));
}
Uo().requestIdleCallback;
Uo().cancelIdleCallback;
const Zi = (l) => !!l.type.__asyncLoader, Ja = (l) => l.type.__isKeepAlive;
function Ly(l, c) {
  Lc(l, "a", c);
}
function Ay(l, c) {
  Lc(l, "da", c);
}
function Lc(l, c, f = Tt) {
  const _ = l.__wdc || (l.__wdc = () => {
    let v = f;
    for (; v; ) {
      if (v.isDeactivated)
        return;
      v = v.parent;
    }
    return l();
  });
  if (Jo(c, _, f), f) {
    let v = f.parent;
    for (; v && v.parent; )
      Ja(v.parent.vnode) && Ry(_, c, f, v), v = v.parent;
  }
}
function Ry(l, c, f, _) {
  const v = Jo(
    c,
    l,
    _,
    !0
    /* prepend */
  );
  Ic(() => {
    Ia(_[c], v);
  }, f);
}
function Jo(l, c, f = Tt, _ = !1) {
  if (f) {
    const v = f[l] || (f[l] = []), O = c.__weh || (c.__weh = (...h) => {
      Nr();
      const g = ao(f), s = rr(c, f, l, h);
      return g(), Dr(), s;
    });
    return _ ? v.unshift(O) : v.push(O), O;
  }
}
const Mr = (l) => (c, f = Tt) => {
  (!io || l === "sp") && Jo(l, (..._) => c(..._), f);
}, Iy = Mr("bm"), Ac = Mr("m"), By = Mr(
  "bu"
), Ny = Mr("u"), Rc = Mr(
  "bum"
), Ic = Mr("um"), Dy = Mr(
  "sp"
), Fy = Mr("rtg"), My = Mr("rtc");
function Hy(l, c = Tt) {
  Jo("ec", l, c);
}
const Vy = /* @__PURE__ */ Symbol.for("v-ndc");
function Bc(l, c, f, _) {
  let v;
  const O = f, h = Fe(l);
  if (h || ht(l)) {
    const g = h && /* @__PURE__ */ ln(l);
    let s = !1, p = !1;
    g && (s = !/* @__PURE__ */ Dt(l), p = /* @__PURE__ */ kr(l), l = $o(l)), v = new Array(l.length);
    for (let y = 0, m = l.length; y < m; y++)
      v[y] = c(
        s ? p ? un(Ft(l[y])) : Ft(l[y]) : l[y],
        y,
        void 0,
        O
      );
  } else if (typeof l == "number") {
    v = new Array(l);
    for (let g = 0; g < l; g++)
      v[g] = c(g + 1, g, void 0, O);
  } else if (nt(l))
    if (l[Symbol.iterator])
      v = Array.from(
        l,
        (g, s) => c(g, s, void 0, O)
      );
    else {
      const g = Object.keys(l);
      v = new Array(g.length);
      for (let s = 0, p = g.length; s < p; s++) {
        const y = g[s];
        v[s] = c(l[y], y, s, O);
      }
    }
  else
    v = [];
  return v;
}
const Ea = (l) => l ? nd(l) ? Yo(l) : Ea(l.parent) : null, Yi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xt(/* @__PURE__ */ Object.create(null), {
    $: (l) => l,
    $el: (l) => l.vnode.el,
    $data: (l) => l.data,
    $props: (l) => l.props,
    $attrs: (l) => l.attrs,
    $slots: (l) => l.slots,
    $refs: (l) => l.refs,
    $parent: (l) => Ea(l.parent),
    $root: (l) => Ea(l.root),
    $host: (l) => l.ce,
    $emit: (l) => l.emit,
    $options: (l) => Dc(l),
    $forceUpdate: (l) => l.f || (l.f = () => {
      Ga(l.update);
    }),
    $nextTick: (l) => l.n || (l.n = Ca.bind(l.proxy)),
    $watch: (l) => Sy.bind(l)
  })
), fa = (l, c) => l !== lt && !l.__isScriptSetup && tt(l, c), zy = {
  get({ _: l }, c) {
    if (c === "__v_skip")
      return !0;
    const { ctx: f, setupState: _, data: v, props: O, accessCache: h, type: g, appContext: s } = l;
    if (c[0] !== "$") {
      const w = h[c];
      if (w !== void 0)
        switch (w) {
          case 1:
            return _[c];
          case 2:
            return v[c];
          case 4:
            return f[c];
          case 3:
            return O[c];
        }
      else {
        if (fa(_, c))
          return h[c] = 1, _[c];
        if (v !== lt && tt(v, c))
          return h[c] = 2, v[c];
        if (tt(O, c))
          return h[c] = 3, O[c];
        if (f !== lt && tt(f, c))
          return h[c] = 4, f[c];
        Sa && (h[c] = 0);
      }
    }
    const p = Yi[c];
    let y, m;
    if (p)
      return c === "$attrs" && kt(l.attrs, "get", ""), p(l);
    if (
      // css module (injected by vue-loader)
      (y = g.__cssModules) && (y = y[c])
    )
      return y;
    if (f !== lt && tt(f, c))
      return h[c] = 4, f[c];
    if (
      // global properties
      m = s.config.globalProperties, tt(m, c)
    )
      return m[c];
  },
  set({ _: l }, c, f) {
    const { data: _, setupState: v, ctx: O } = l;
    return fa(v, c) ? (v[c] = f, !0) : _ !== lt && tt(_, c) ? (_[c] = f, !0) : tt(l.props, c) || c[0] === "$" && c.slice(1) in l ? !1 : (O[c] = f, !0);
  },
  has({
    _: { data: l, setupState: c, accessCache: f, ctx: _, appContext: v, props: O, type: h }
  }, g) {
    let s;
    return !!(f[g] || l !== lt && g[0] !== "$" && tt(l, g) || fa(c, g) || tt(O, g) || tt(_, g) || tt(Yi, g) || tt(v.config.globalProperties, g) || (s = h.__cssModules) && s[g]);
  },
  defineProperty(l, c, f) {
    return f.get != null ? l._.accessCache[c] = 0 : tt(f, "value") && this.set(l, c, f.value, null), Reflect.defineProperty(l, c, f);
  }
};
function Su(l) {
  return Fe(l) ? l.reduce(
    (c, f) => (c[f] = null, c),
    {}
  ) : l;
}
let Sa = !0;
function qy(l) {
  const c = Dc(l), f = l.proxy, _ = l.ctx;
  Sa = !1, c.beforeCreate && Pu(c.beforeCreate, l, "bc");
  const {
    // state
    data: v,
    computed: O,
    methods: h,
    watch: g,
    provide: s,
    inject: p,
    // lifecycle
    created: y,
    beforeMount: m,
    mounted: w,
    beforeUpdate: k,
    updated: C,
    activated: x,
    deactivated: E,
    beforeDestroy: P,
    beforeUnmount: L,
    destroyed: A,
    unmounted: R,
    render: F,
    renderTracked: M,
    renderTriggered: z,
    errorCaptured: H,
    serverPrefetch: V,
    // public API
    expose: D,
    inheritAttrs: N,
    // assets
    components: G,
    directives: $,
    filters: Y
  } = c;
  if (p && Uy(p, _, null), h)
    for (const re in h) {
      const pe = h[re];
      qe(pe) && (_[re] = pe.bind(f));
    }
  if (v) {
    const re = v.call(f, f);
    nt(re) && (l.data = /* @__PURE__ */ qa(re));
  }
  if (Sa = !0, O)
    for (const re in O) {
      const pe = O[re], fe = qe(pe) ? pe.bind(f, f) : qe(pe.get) ? pe.get.bind(f, f) : _r, je = !qe(pe) && qe(pe.set) ? pe.set.bind(f) : _r, Ee = od({
        get: fe,
        set: je
      });
      Object.defineProperty(_, re, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (Se) => Ee.value = Se
      });
    }
  if (g)
    for (const re in g)
      Nc(g[re], _, f, re);
  if (s) {
    const re = qe(s) ? s.call(f) : s;
    Reflect.ownKeys(re).forEach((pe) => {
      Oy(pe, re[pe]);
    });
  }
  y && Pu(y, l, "c");
  function oe(re, pe) {
    Fe(pe) ? pe.forEach((fe) => re(fe.bind(f))) : pe && re(pe.bind(f));
  }
  if (oe(Iy, m), oe(Ac, w), oe(By, k), oe(Ny, C), oe(Ly, x), oe(Ay, E), oe(Hy, H), oe(My, M), oe(Fy, z), oe(Rc, L), oe(Ic, R), oe(Dy, V), Fe(D))
    if (D.length) {
      const re = l.exposed || (l.exposed = {});
      D.forEach((pe) => {
        Object.defineProperty(re, pe, {
          get: () => f[pe],
          set: (fe) => f[pe] = fe,
          enumerable: !0
        });
      });
    } else l.exposed || (l.exposed = {});
  F && l.render === _r && (l.render = F), N != null && (l.inheritAttrs = N), G && (l.components = G), $ && (l.directives = $), V && Tc(l);
}
function Uy(l, c, f = _r) {
  Fe(l) && (l = Pa(l));
  for (const _ in l) {
    const v = l[_];
    let O;
    nt(v) ? "default" in v ? O = To(
      v.from || _,
      v.default,
      !0
    ) : O = To(v.from || _) : O = To(v), /* @__PURE__ */ jt(O) ? Object.defineProperty(c, _, {
      enumerable: !0,
      configurable: !0,
      get: () => O.value,
      set: (h) => O.value = h
    }) : c[_] = O;
  }
}
function Pu(l, c, f) {
  rr(
    Fe(l) ? l.map((_) => _.bind(c.proxy)) : l.bind(c.proxy),
    c,
    f
  );
}
function Nc(l, c, f, _) {
  let v = _.includes(".") ? Sc(f, _) : () => f[_];
  if (ht(l)) {
    const O = c[l];
    qe(O) && Lo(v, O);
  } else if (qe(l))
    Lo(v, l.bind(f));
  else if (nt(l))
    if (Fe(l))
      l.forEach((O) => Nc(O, c, f, _));
    else {
      const O = qe(l.handler) ? l.handler.bind(f) : c[l.handler];
      qe(O) && Lo(v, O, l);
    }
}
function Dc(l) {
  const c = l.type, { mixins: f, extends: _ } = c, {
    mixins: v,
    optionsCache: O,
    config: { optionMergeStrategies: h }
  } = l.appContext, g = O.get(c);
  let s;
  return g ? s = g : !v.length && !f && !_ ? s = c : (s = {}, v.length && v.forEach(
    (p) => Do(s, p, h, !0)
  ), Do(s, c, h)), nt(c) && O.set(c, s), s;
}
function Do(l, c, f, _ = !1) {
  const { mixins: v, extends: O } = c;
  O && Do(l, O, f, !0), v && v.forEach(
    (h) => Do(l, h, f, !0)
  );
  for (const h in c)
    if (!(_ && h === "expose")) {
      const g = $y[h] || f && f[h];
      l[h] = g ? g(l[h], c[h]) : c[h];
    }
  return l;
}
const $y = {
  data: Tu,
  props: Lu,
  emits: Lu,
  // objects
  methods: Ui,
  computed: Ui,
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
  components: Ui,
  directives: Ui,
  // watch
  watch: Wy,
  // provide / inject
  provide: Tu,
  inject: Gy
};
function Tu(l, c) {
  return c ? l ? function() {
    return xt(
      qe(l) ? l.call(this, this) : l,
      qe(c) ? c.call(this, this) : c
    );
  } : c : l;
}
function Gy(l, c) {
  return Ui(Pa(l), Pa(c));
}
function Pa(l) {
  if (Fe(l)) {
    const c = {};
    for (let f = 0; f < l.length; f++)
      c[l[f]] = l[f];
    return c;
  }
  return l;
}
function St(l, c) {
  return l ? [...new Set([].concat(l, c))] : c;
}
function Ui(l, c) {
  return l ? xt(/* @__PURE__ */ Object.create(null), l, c) : c;
}
function Lu(l, c) {
  return l ? Fe(l) && Fe(c) ? [.../* @__PURE__ */ new Set([...l, ...c])] : xt(
    /* @__PURE__ */ Object.create(null),
    Su(l),
    Su(c ?? {})
  ) : c;
}
function Wy(l, c) {
  if (!l) return c;
  if (!c) return l;
  const f = xt(/* @__PURE__ */ Object.create(null), l);
  for (const _ in c)
    f[_] = St(l[_], c[_]);
  return f;
}
function Fc() {
  return {
    app: null,
    config: {
      isNativeTag: Yu,
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
let Jy = 0;
function Ky(l, c) {
  return function(_, v = null) {
    qe(_) || (_ = xt({}, _)), v != null && !nt(v) && (v = null);
    const O = Fc(), h = /* @__PURE__ */ new WeakSet(), g = [];
    let s = !1;
    const p = O.app = {
      _uid: Jy++,
      _component: _,
      _props: v,
      _container: null,
      _context: O,
      _instance: null,
      version: Em,
      get config() {
        return O.config;
      },
      set config(y) {
      },
      use(y, ...m) {
        return h.has(y) || (y && qe(y.install) ? (h.add(y), y.install(p, ...m)) : qe(y) && (h.add(y), y(p, ...m))), p;
      },
      mixin(y) {
        return O.mixins.includes(y) || O.mixins.push(y), p;
      },
      component(y, m) {
        return m ? (O.components[y] = m, p) : O.components[y];
      },
      directive(y, m) {
        return m ? (O.directives[y] = m, p) : O.directives[y];
      },
      mount(y, m, w) {
        if (!s) {
          const k = p._ceVNode || tr(_, v);
          return k.appContext = O, w === !0 ? w = "svg" : w === !1 && (w = void 0), l(k, y, w), s = !0, p._container = y, y.__vue_app__ = p, Yo(k.component);
        }
      },
      onUnmount(y) {
        g.push(y);
      },
      unmount() {
        s && (rr(
          g,
          p._instance,
          16
        ), l(null, p._container), delete p._container.__vue_app__);
      },
      provide(y, m) {
        return O.provides[y] = m, p;
      },
      runWithContext(y) {
        const m = Ci;
        Ci = p;
        try {
          return y();
        } finally {
          Ci = m;
        }
      }
    };
    return p;
  };
}
let Ci = null;
const Zy = (l, c) => c === "modelValue" || c === "model-value" ? l.modelModifiers : l[`${c}Modifiers`] || l[`${Xt(c)}Modifiers`] || l[`${In(c)}Modifiers`];
function Yy(l, c, ...f) {
  if (l.isUnmounted) return;
  const _ = l.vnode.props || lt;
  let v = f;
  const O = c.startsWith("update:"), h = O && Zy(_, c.slice(7));
  h && (h.trim && (v = f.map((y) => ht(y) ? y.trim() : y)), h.number && (v = v.map(Nf)));
  let g, s = _[g = la(c)] || // also try camelCase event handler (#2249)
  _[g = la(Xt(c))];
  !s && O && (s = _[g = la(In(c))]), s && rr(
    s,
    l,
    6,
    v
  );
  const p = _[g + "Once"];
  if (p) {
    if (!l.emitted)
      l.emitted = {};
    else if (l.emitted[g])
      return;
    l.emitted[g] = !0, rr(
      p,
      l,
      6,
      v
    );
  }
}
const Qy = /* @__PURE__ */ new WeakMap();
function Mc(l, c, f = !1) {
  const _ = f ? Qy : c.emitsCache, v = _.get(l);
  if (v !== void 0)
    return v;
  const O = l.emits;
  let h = {}, g = !1;
  if (!qe(l)) {
    const s = (p) => {
      const y = Mc(p, c, !0);
      y && (g = !0, xt(h, y));
    };
    !f && c.mixins.length && c.mixins.forEach(s), l.extends && s(l.extends), l.mixins && l.mixins.forEach(s);
  }
  return !O && !g ? (nt(l) && _.set(l, null), null) : (Fe(O) ? O.forEach((s) => h[s] = null) : xt(h, O), nt(l) && _.set(l, h), h);
}
function Ko(l, c) {
  return !l || !Vo(c) ? !1 : (c = c.slice(2), c = c === "Once" ? c : c.replace(/Once$/, ""), tt(l, c[0].toLowerCase() + c.slice(1)) || tt(l, In(c)) || tt(l, c));
}
function Au(l) {
  const {
    type: c,
    vnode: f,
    proxy: _,
    withProxy: v,
    propsOptions: [O],
    slots: h,
    attrs: g,
    emit: s,
    render: p,
    renderCache: y,
    props: m,
    data: w,
    setupState: k,
    ctx: C,
    inheritAttrs: x
  } = l, E = Bo(l);
  let P, L;
  try {
    if (f.shapeFlag & 4) {
      const R = v || _, F = R;
      P = br(
        p.call(
          F,
          R,
          y,
          m,
          k,
          w,
          C
        )
      ), L = g;
    } else {
      const R = c;
      P = br(
        R.length > 1 ? R(
          m,
          { attrs: g, slots: h, emit: s }
        ) : R(
          m,
          null
        )
      ), L = c.props ? g : Xy(g);
    }
  } catch (R) {
    Rn.length = 0, Go(R, l, 1), P = tr(Fr);
  }
  let A = P;
  if (L && x !== !1) {
    const R = Object.keys(L), { shapeFlag: F } = A;
    R.length && F & 7 && (O && R.some(zo) && (L = em(
      L,
      O
    )), A = Si(A, L, !1, !0));
  }
  if (f.dirs && (A = Si(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(f.dirs) : f.dirs), f.transition) {
    const R = Wo(A.type) && Pc(A) || A;
    Wa(R, f.transition);
  }
  return P = A, Bo(E), P;
}
const Xy = (l) => {
  let c;
  for (const f in l)
    (f === "class" || f === "style" || Vo(f)) && ((c || (c = {}))[f] = l[f]);
  return c;
}, em = (l, c) => {
  const f = {};
  for (const _ in l)
    (!zo(_) || !(_.slice(9) in c)) && (f[_] = l[_]);
  return f;
};
function tm(l, c, f) {
  const { props: _, children: v, component: O } = l, { props: h, children: g, patchFlag: s } = c, p = O.emitsOptions;
  if (c.dirs || c.transition)
    return !0;
  if (f && s >= 0) {
    if (s & 1024)
      return !0;
    if (s & 16)
      return _ ? Ru(_, h, p) : !!h;
    if (s & 8) {
      const y = c.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        const w = y[m];
        if (Hc(h, _, w) && !Ko(p, w))
          return !0;
      }
    }
  } else
    return (v || g) && (!g || !g.$stable) ? !0 : _ === h ? !1 : _ ? h ? Ru(_, h, p) : !0 : !!h;
  return !1;
}
function Ru(l, c, f) {
  const _ = Object.keys(c);
  if (_.length !== Object.keys(l).length)
    return !0;
  for (let v = 0; v < _.length; v++) {
    const O = _[v];
    if (Hc(c, l, O) && !Ko(f, O))
      return !0;
  }
  return !1;
}
function Hc(l, c, f) {
  const _ = l[f], v = c[f];
  return f === "style" && nt(_) && nt(v) ? !Pi(_, v) : _ !== v;
}
function rm({ vnode: l, parent: c, suspense: f }, _) {
  for (; c; ) {
    const v = c.subTree;
    if (v.suspense && v.suspense.activeBranch === l && (v.suspense.vnode.el = v.el = _, l = v), v === l)
      (l = c.vnode).el = _, c = c.parent;
    else
      break;
  }
  f && f.activeBranch === l && (f.vnode.el = _);
}
const Vc = {}, zc = () => Object.create(Vc), qc = (l) => Object.getPrototypeOf(l) === Vc;
function nm(l, c, f, _ = !1) {
  const v = {}, O = zc();
  l.propsDefaults = /* @__PURE__ */ Object.create(null), Uc(l, c, v, O);
  for (const h in l.propsOptions[0])
    h in v || (v[h] = void 0);
  f ? l.props = _ ? v : /* @__PURE__ */ cy(v) : l.type.props ? l.props = v : l.props = O, l.attrs = O;
}
function im(l, c, f, _) {
  const {
    props: v,
    attrs: O,
    vnode: { patchFlag: h }
  } = l, g = /* @__PURE__ */ et(v), [s] = l.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (_ || h > 0) && !(h & 16)
  ) {
    if (h & 8) {
      const y = l.vnode.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        let w = y[m];
        if (Ko(l.emitsOptions, w))
          continue;
        const k = c[w];
        if (s)
          if (tt(O, w))
            k !== O[w] && (O[w] = k, p = !0);
          else {
            const C = Xt(w);
            v[C] = Ta(
              s,
              g,
              C,
              k,
              l,
              !1
            );
          }
        else
          k !== O[w] && (O[w] = k, p = !0);
      }
    }
  } else {
    Uc(l, c, v, O) && (p = !0);
    let y;
    for (const m in g)
      (!c || // for camelCase
      !tt(c, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = In(m)) === m || !tt(c, y))) && (s ? f && // for camelCase
      (f[m] !== void 0 || // for kebab-case
      f[y] !== void 0) && (v[m] = Ta(
        s,
        g,
        m,
        void 0,
        l,
        !0
      )) : delete v[m]);
    if (O !== g)
      for (const m in O)
        (!c || !tt(c, m)) && (delete O[m], p = !0);
  }
  p && Rr(l.attrs, "set", "");
}
function Uc(l, c, f, _) {
  const [v, O] = l.propsOptions;
  let h = !1, g;
  if (c)
    for (let s in c) {
      if (Gi(s))
        continue;
      const p = c[s];
      let y;
      v && tt(v, y = Xt(s)) ? !O || !O.includes(y) ? f[y] = p : (g || (g = {}))[y] = p : Ko(l.emitsOptions, s) || (!(s in _) || p !== _[s]) && (_[s] = p, h = !0);
    }
  if (O) {
    const s = /* @__PURE__ */ et(f), p = g || lt;
    for (let y = 0; y < O.length; y++) {
      const m = O[y];
      f[m] = Ta(
        v,
        s,
        m,
        p[m],
        l,
        !tt(p, m)
      );
    }
  }
  return h;
}
function Ta(l, c, f, _, v, O) {
  const h = l[f];
  if (h != null) {
    const g = tt(h, "default");
    if (g && _ === void 0) {
      const s = h.default;
      if (h.type !== Function && !h.skipFactory && qe(s)) {
        const { propsDefaults: p } = v;
        if (f in p)
          _ = p[f];
        else {
          const y = ao(v);
          _ = p[f] = s.call(
            null,
            c
          ), y();
        }
      } else
        _ = s;
      v.ce && v.ce._setProp(f, _);
    }
    h[
      0
      /* shouldCast */
    ] && (O && !g ? _ = !1 : h[
      1
      /* shouldCastTrue */
    ] && (_ === "" || _ === In(f)) && (_ = !0));
  }
  return _;
}
const om = /* @__PURE__ */ new WeakMap();
function $c(l, c, f = !1) {
  const _ = f ? om : c.propsCache, v = _.get(l);
  if (v)
    return v;
  const O = l.props, h = {}, g = [];
  let s = !1;
  if (!qe(l)) {
    const y = (m) => {
      s = !0;
      const [w, k] = $c(m, c, !0);
      xt(h, w), k && g.push(...k);
    };
    !f && c.mixins.length && c.mixins.forEach(y), l.extends && y(l.extends), l.mixins && l.mixins.forEach(y);
  }
  if (!O && !s)
    return nt(l) && _.set(l, Ln), Ln;
  if (Fe(O))
    for (let y = 0; y < O.length; y++) {
      const m = Xt(O[y]);
      Iu(m) && (h[m] = lt);
    }
  else if (O)
    for (const y in O) {
      const m = Xt(y);
      if (Iu(m)) {
        const w = O[y], k = h[m] = Fe(w) || qe(w) ? { type: w } : xt({}, w), C = k.type;
        let x = !1, E = !0;
        if (Fe(C))
          for (let P = 0; P < C.length; ++P) {
            const L = C[P], A = qe(L) && L.name;
            if (A === "Boolean") {
              x = !0;
              break;
            } else A === "String" && (E = !1);
          }
        else
          x = qe(C) && C.name === "Boolean";
        k[
          0
          /* shouldCast */
        ] = x, k[
          1
          /* shouldCastTrue */
        ] = E, (x || tt(k, "default")) && g.push(m);
      }
    }
  const p = [h, g];
  return nt(l) && _.set(l, p), p;
}
function Iu(l) {
  return l[0] !== "$" && !Gi(l);
}
const Ka = (l) => l === "_" || l === "_ctx" || l === "$stable", Za = (l) => Fe(l) ? l.map(br) : [br(l)], sm = (l, c, f) => {
  if (c._n)
    return c;
  const _ = jy((...v) => Za(c(...v)), f);
  return _._c = !1, _;
}, Gc = (l, c, f) => {
  const _ = l._ctx;
  for (const v in l) {
    if (Ka(v)) continue;
    const O = l[v];
    if (qe(O))
      c[v] = sm(v, O, _);
    else if (O != null) {
      const h = Za(O);
      c[v] = () => h;
    }
  }
}, Wc = (l, c) => {
  const f = Za(c);
  l.slots.default = () => f;
}, Jc = (l, c, f) => {
  for (const _ in c)
    (f || !Ka(_)) && (l[_] = c[_]);
}, am = (l, c, f) => {
  const _ = l.slots = zc();
  if (l.vnode.shapeFlag & 32) {
    const v = c._;
    v ? (Jc(_, c, f), f && rc(_, "_", v, !0)) : Gc(c, _);
  } else c && Wc(l, c);
}, lm = (l, c, f) => {
  const { vnode: _, slots: v } = l;
  let O = !0, h = lt;
  if (_.shapeFlag & 32) {
    const g = c._;
    g ? f && g === 1 ? O = !1 : Jc(v, c, f) : (O = !c.$stable, Gc(c, v)), h = c;
  } else c && (Wc(l, c), h = { default: 1 });
  if (O)
    for (const g in v)
      !Ka(g) && h[g] == null && delete v[g];
}, Lt = pm;
function um(l) {
  return cm(l);
}
function cm(l, c) {
  const f = Uo();
  f.__VUE__ = !0;
  const {
    insert: _,
    remove: v,
    patchProp: O,
    createElement: h,
    createText: g,
    createComment: s,
    setText: p,
    setElementText: y,
    parentNode: m,
    nextSibling: w,
    setScopeId: k = _r,
    insertStaticContent: C
  } = l, x = (T, B, K, Q = null, X = null, ee = null, de = void 0, he = null, ue = !!B.dynamicChildren) => {
    if (T === B)
      return;
    T && !qi(T, B) && (Q = Qe(T), Se(T, X, ee, !0), T = null), B.patchFlag === -2 && (ue = !1, B.dynamicChildren = null), B.dynamicChildren && T && T.dynamicChildren && T.dynamicChildren.hasOnce && (B.dynamicChildren === Ln && (B.dynamicChildren = []), B.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: ke, shapeFlag: be } = B;
    switch (ie) {
      case Zo:
        E(T, B, K, Q);
        break;
      case Fr:
        P(T, B, K, Q);
        break;
      case ma:
        T == null && L(B, K, Q, de);
        break;
      case Qt:
        G(
          T,
          B,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue
        );
        break;
      default:
        be & 1 ? F(
          T,
          B,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue
        ) : be & 6 ? $(
          T,
          B,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue
        ) : (be & 64 || be & 128) && ie.process(
          T,
          B,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue,
          Te
        );
    }
    ke != null && X ? Ki(ke, T && T.ref, ee, B || T, !B) : ke == null && T && T.ref != null && Ki(T.ref, null, ee, T, !0);
  }, E = (T, B, K, Q) => {
    if (T == null)
      _(
        B.el = g(B.children),
        K,
        Q
      );
    else {
      const X = B.el = T.el;
      B.children !== T.children && p(X, B.children);
    }
  }, P = (T, B, K, Q) => {
    T == null ? _(
      B.el = s(B.children || ""),
      K,
      Q
    ) : B.el = T.el;
  }, L = (T, B, K, Q) => {
    [T.el, T.anchor] = C(
      T.children,
      B,
      K,
      Q,
      T.el,
      T.anchor
    );
  }, A = ({ el: T, anchor: B }, K, Q) => {
    let X;
    for (; T && T !== B; )
      X = w(T), _(T, K, Q), T = X;
    _(B, K, Q);
  }, R = ({ el: T, anchor: B }) => {
    let K;
    for (; T && T !== B; )
      K = w(T), v(T), T = K;
    v(B);
  }, F = (T, B, K, Q, X, ee, de, he, ue) => {
    if (B.type === "svg" ? de = "svg" : B.type === "math" && (de = "mathml"), T == null)
      M(
        B,
        K,
        Q,
        X,
        ee,
        de,
        he,
        ue
      );
    else {
      const ie = T.el && T.el._isVueCE ? T.el : null;
      try {
        ie && ie._beginPatch(), V(
          T,
          B,
          X,
          ee,
          de,
          he,
          ue
        );
      } finally {
        ie && ie._endPatch();
      }
    }
  }, M = (T, B, K, Q, X, ee, de, he) => {
    let ue, ie;
    const { props: ke, shapeFlag: be, transition: Ce, dirs: ne } = T;
    if (ue = T.el = h(
      T.type,
      ee,
      ke && ke.is,
      ke
    ), be & 8 ? y(ue, T.children) : be & 16 && H(
      T.children,
      ue,
      null,
      Q,
      X,
      ya(T, ee),
      de,
      he
    ), ne && Sn(T, null, Q, "created"), z(ue, T, T.scopeId, de, Q), ke) {
      for (const ce in ke)
        ce !== "value" && !Gi(ce) && O(ue, ce, null, ke[ce], ee, Q);
      "value" in ke && O(ue, "value", null, ke.value, ee), (ie = ke.onVnodeBeforeMount) && fr(ie, Q, T);
    }
    ne && Sn(T, null, Q, "beforeMount");
    const le = dm(X, Ce);
    le && Ce.beforeEnter(ue), _(ue, B, K), ((ie = ke && ke.onVnodeMounted) || le || ne) && Lt(() => {
      try {
        ie && fr(ie, Q, T), le && Ce.enter(ue), ne && Sn(T, null, Q, "mounted");
      } finally {
      }
    }, X);
  }, z = (T, B, K, Q, X) => {
    if (K && k(T, K), Q)
      for (let ee = 0; ee < Q.length; ee++)
        k(T, Q[ee]);
    if (X) {
      let ee = X.subTree;
      if (B === ee || Qc(ee.type) && (ee.ssContent === B || ee.ssFallback === B)) {
        const de = X.vnode;
        z(
          T,
          de,
          de.scopeId,
          de.slotScopeIds,
          X.parent
        );
      }
    }
  }, H = (T, B, K, Q, X, ee, de, he, ue = 0) => {
    for (let ie = ue; ie < T.length; ie++) {
      const ke = T[ie] = he ? Ar(T[ie]) : br(T[ie]);
      x(
        null,
        ke,
        B,
        K,
        Q,
        X,
        ee,
        de,
        he
      );
    }
  }, V = (T, B, K, Q, X, ee, de) => {
    const he = B.el = T.el;
    let { patchFlag: ue, dynamicChildren: ie, dirs: ke } = B;
    ue |= T.patchFlag & 16;
    const be = T.props || lt, Ce = B.props || lt;
    let ne;
    if (K && Pn(K, !1), (ne = Ce.onVnodeBeforeUpdate) && fr(ne, K, B, T), ke && Sn(B, T, K, "beforeUpdate"), K && Pn(K, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!T.dynamicChildren || T.dynamicChildren.length !== ie.length) && (ue = 0, de = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && y(he, ""), ie ? D(
      T.dynamicChildren,
      ie,
      he,
      K,
      Q,
      ya(B, X),
      ee
    ) : de || pe(
      T,
      B,
      he,
      null,
      K,
      Q,
      ya(B, X),
      ee,
      !1
    ), ue > 0) {
      if (ue & 16)
        N(he, be, Ce, K, X);
      else if (ue & 2 && be.class !== Ce.class && O(he, "class", null, Ce.class, X), ue & 4 && O(he, "style", be.style, Ce.style, X), ue & 8) {
        const le = B.dynamicProps;
        for (let ce = 0; ce < le.length; ce++) {
          const Oe = le[ce], Ae = be[Oe], ze = Ce[Oe];
          (ze !== Ae || Oe === "value") && O(he, Oe, Ae, ze, X, K);
        }
      }
      ue & 1 && T.children !== B.children && y(he, B.children);
    } else !de && ie == null && N(he, be, Ce, K, X);
    ((ne = Ce.onVnodeUpdated) || ke) && Lt(() => {
      ne && fr(ne, K, B, T), ke && Sn(B, T, K, "updated");
    }, Q);
  }, D = (T, B, K, Q, X, ee, de) => {
    for (let he = 0; he < B.length; he++) {
      const ue = T[he], ie = B[he], ke = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ue.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ue.type === Qt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !qi(ue, ie) || // - In the case of a component, it could contain anything.
        ue.shapeFlag & 198) ? m(ue.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          K
        )
      );
      x(
        ue,
        ie,
        ke,
        null,
        Q,
        X,
        ee,
        de,
        !0
      );
    }
  }, N = (T, B, K, Q, X) => {
    if (B !== K) {
      if (B !== lt)
        for (const ee in B)
          !Gi(ee) && !(ee in K) && O(
            T,
            ee,
            B[ee],
            null,
            X,
            Q
          );
      for (const ee in K) {
        if (Gi(ee)) continue;
        const de = K[ee], he = B[ee];
        de !== he && ee !== "value" && O(T, ee, he, de, X, Q);
      }
      "value" in K && O(T, "value", B.value, K.value, X);
    }
  }, G = (T, B, K, Q, X, ee, de, he, ue) => {
    const ie = B.el = T ? T.el : g(""), ke = B.anchor = T ? T.anchor : g("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: ne } = B;
    ne && (he = he ? he.concat(ne) : ne), T == null ? (_(ie, K, Q), _(ke, K, Q), H(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      B.children || [],
      K,
      ke,
      X,
      ee,
      de,
      he,
      ue
    )) : be > 0 && be & 64 && Ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    T.dynamicChildren && T.dynamicChildren.length === Ce.length ? (D(
      T.dynamicChildren,
      Ce,
      K,
      X,
      ee,
      de,
      he
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (B.key != null || X && B === X.subTree) && Kc(
      T,
      B,
      !0
      /* shallow */
    )) : pe(
      T,
      B,
      K,
      ke,
      X,
      ee,
      de,
      he,
      ue
    );
  }, $ = (T, B, K, Q, X, ee, de, he, ue) => {
    B.slotScopeIds = he, T == null ? B.shapeFlag & 512 ? X.ctx.activate(
      B,
      K,
      Q,
      de,
      ue
    ) : Y(
      B,
      K,
      Q,
      X,
      ee,
      de,
      ue
    ) : ae(T, B, ue);
  }, Y = (T, B, K, Q, X, ee, de) => {
    const he = T.component = _m(
      T,
      Q,
      X
    );
    if (Ja(T) && (he.ctx.renderer = Te), km(he, !1, de), he.asyncDep) {
      if (X && X.registerDep(he, oe, de), !T.el) {
        const ue = he.subTree = tr(Fr);
        P(null, ue, B, K), T.placeholder = ue.el;
      }
    } else
      oe(
        he,
        T,
        B,
        K,
        X,
        ee,
        de
      );
  }, ae = (T, B, K) => {
    const Q = B.component = T.component;
    if (tm(T, B, K))
      if (Q.asyncDep && !Q.asyncResolved) {
        B.el = T.el, re(Q, B, K);
        return;
      } else
        Q.next = B, Q.update();
    else
      B.el = T.el, Q.vnode = B;
  }, oe = (T, B, K, Q, X, ee, de) => {
    const he = () => {
      if (T.isMounted) {
        let { next: be, bu: Ce, u: ne, parent: le, vnode: ce } = T;
        {
          const dt = Zc(T);
          if (dt) {
            be && (be.el = ce.el, re(T, be, de)), dt.asyncDep.then(() => {
              Lt(() => {
                T.isUnmounted || ie();
              }, X);
            });
            return;
          }
        }
        let Oe = be, Ae;
        Pn(T, !1), be ? (be.el = ce.el, re(T, be, de)) : be = ce, Ce && Po(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && fr(Ae, le, be, ce), Pn(T, !0);
        const ze = Au(T), it = T.subTree;
        T.subTree = ze, x(
          it,
          ze,
          // parent may have changed if it's in a teleport
          m(it.el),
          // anchor may have changed if it's in a fragment
          Qe(it),
          T,
          X,
          ee
        ), be.el = ze.el, Oe === null && rm(T, ze.el), ne && Lt(ne, X), (Ae = be.props && be.props.onVnodeUpdated) && Lt(
          () => fr(Ae, le, be, ce),
          X
        );
      } else {
        let be;
        const { el: Ce, props: ne } = B, { bm: le, m: ce, parent: Oe, root: Ae, type: ze } = T, it = Zi(B);
        Pn(T, !1), le && Po(le), !it && (be = ne && ne.onVnodeBeforeMount) && fr(be, Oe, B), Pn(T, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(
            ze,
            T.parent ? T.parent.type : void 0
          );
          const dt = T.subTree = Au(T);
          x(
            null,
            dt,
            K,
            Q,
            T,
            X,
            ee
          ), B.el = dt.el;
        }
        if (ce && Lt(ce, X), !it && (be = ne && ne.onVnodeMounted)) {
          const dt = B;
          Lt(
            () => fr(be, Oe, dt),
            X
          );
        }
        (B.shapeFlag & 256 || Oe && Zi(Oe.vnode) && Oe.vnode.shapeFlag & 256) && T.a && Lt(T.a, X), T.isMounted = !0, B = K = Q = null;
      }
    };
    T.scope.on();
    const ue = T.effect = new ac(he);
    T.scope.off();
    const ie = T.update = ue.run.bind(ue), ke = T.job = ue.runIfDirty.bind(ue);
    ke.i = T, ke.id = T.uid, ue.scheduler = () => Ga(ke), Pn(T, !0), ie();
  }, re = (T, B, K) => {
    B.component = T;
    const Q = T.vnode.props;
    T.vnode = B, T.next = null, im(T, B.props, Q, K), lm(T, B.children, K), Nr(), Ou(T), Dr();
  }, pe = (T, B, K, Q, X, ee, de, he, ue = !1) => {
    const ie = T && T.children, ke = T ? T.shapeFlag : 0, be = B.children, { patchFlag: Ce, shapeFlag: ne } = B;
    if (Ce > 0) {
      if (Ce & 128) {
        je(
          ie,
          be,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue
        );
        return;
      } else if (Ce & 256) {
        fe(
          ie,
          be,
          K,
          Q,
          X,
          ee,
          de,
          he,
          ue
        );
        return;
      }
    }
    ne & 8 ? (ke & 16 && Me(ie, X, ee), be !== ie && y(K, be)) : ke & 16 ? ne & 16 ? je(
      ie,
      be,
      K,
      Q,
      X,
      ee,
      de,
      he,
      ue
    ) : Me(ie, X, ee, !0) : (ke & 8 && y(K, ""), ne & 16 && H(
      be,
      K,
      Q,
      X,
      ee,
      de,
      he,
      ue
    ));
  }, fe = (T, B, K, Q, X, ee, de, he, ue) => {
    T = T || Ln, B = B || Ln;
    const ie = T.length, ke = B.length, be = Math.min(ie, ke);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const ne = B[Ce] = ue ? Ar(B[Ce]) : br(B[Ce]);
      x(
        T[Ce],
        ne,
        K,
        null,
        X,
        ee,
        de,
        he,
        ue
      );
    }
    ie > ke ? Me(
      T,
      X,
      ee,
      !0,
      !1,
      be
    ) : H(
      B,
      K,
      Q,
      X,
      ee,
      de,
      he,
      ue,
      be
    );
  }, je = (T, B, K, Q, X, ee, de, he, ue) => {
    let ie = 0;
    const ke = B.length;
    let be = T.length - 1, Ce = ke - 1;
    for (; ie <= be && ie <= Ce; ) {
      const ne = T[ie], le = B[ie] = ue ? Ar(B[ie]) : br(B[ie]);
      if (qi(ne, le))
        x(
          ne,
          le,
          K,
          null,
          X,
          ee,
          de,
          he,
          ue
        );
      else
        break;
      ie++;
    }
    for (; ie <= be && ie <= Ce; ) {
      const ne = T[be], le = B[Ce] = ue ? Ar(B[Ce]) : br(B[Ce]);
      if (qi(ne, le))
        x(
          ne,
          le,
          K,
          null,
          X,
          ee,
          de,
          he,
          ue
        );
      else
        break;
      be--, Ce--;
    }
    if (ie > be) {
      if (ie <= Ce) {
        const ne = Ce + 1, le = ne < ke ? B[ne].el : Q;
        for (; ie <= Ce; )
          x(
            null,
            B[ie] = ue ? Ar(B[ie]) : br(B[ie]),
            K,
            le,
            X,
            ee,
            de,
            he,
            ue
          ), ie++;
      }
    } else if (ie > Ce)
      for (; ie <= be; )
        Se(T[ie], X, ee, !0), ie++;
    else {
      const ne = ie, le = ie, ce = /* @__PURE__ */ new Map();
      for (ie = le; ie <= Ce; ie++) {
        const Ke = B[ie] = ue ? Ar(B[ie]) : br(B[ie]);
        Ke.key != null && ce.set(Ke.key, ie);
      }
      let Oe, Ae = 0;
      const ze = Ce - le + 1;
      let it = !1, dt = 0;
      const yt = new Array(ze);
      for (ie = 0; ie < ze; ie++) yt[ie] = 0;
      for (ie = ne; ie <= be; ie++) {
        const Ke = T[ie];
        if (Ae >= ze) {
          Se(Ke, X, ee, !0);
          continue;
        }
        let Ye;
        if (Ke.key != null)
          Ye = ce.get(Ke.key);
        else
          for (Oe = le; Oe <= Ce; Oe++)
            if (yt[Oe - le] === 0 && qi(Ke, B[Oe])) {
              Ye = Oe;
              break;
            }
        Ye === void 0 ? Se(Ke, X, ee, !0) : (yt[Ye - le] = ie + 1, Ye >= dt ? dt = Ye : it = !0, x(
          Ke,
          B[Ye],
          K,
          null,
          X,
          ee,
          de,
          he,
          ue
        ), Ae++);
      }
      const mt = it ? hm(yt) : Ln;
      for (Oe = mt.length - 1, ie = ze - 1; ie >= 0; ie--) {
        const Ke = le + ie, Ye = B[Ke], jr = B[Ke + 1], cn = Ke + 1 < ke ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jr.el || Yc(jr)
        ) : Q;
        yt[ie] === 0 ? x(
          null,
          Ye,
          K,
          cn,
          X,
          ee,
          de,
          he,
          ue
        ) : it && (Oe < 0 || ie !== mt[Oe] ? Ee(Ye, K, cn, 2) : Oe--);
      }
    }
  }, Ee = (T, B, K, Q, X = null) => {
    const { el: ee, type: de, transition: he, children: ue, shapeFlag: ie } = T;
    if (ie & 6) {
      Ee(T.component.subTree, B, K, Q);
      return;
    }
    if (ie & 128) {
      T.suspense.move(B, K, Q);
      return;
    }
    if (ie & 64) {
      de.move(T, B, K, Te);
      return;
    }
    if (de === Qt) {
      _(ee, B, K);
      for (let be = 0; be < ue.length; be++)
        Ee(ue[be], B, K, Q);
      _(T.anchor, B, K);
      return;
    }
    if (de === ma) {
      A(T, B, K);
      return;
    }
    if (Q !== 2 && ie & 1 && he)
      if (Q === 0)
        he.persisted && !ee[pa] ? _(ee, B, K) : (he.beforeEnter(ee), _(ee, B, K), Lt(() => he.enter(ee), X));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: ne } = he, le = () => {
          T.ctx.isUnmounted ? v(ee) : _(ee, B, K);
        }, ce = () => {
          const Oe = ee._isLeaving || !!ee[pa];
          ee._isLeaving && ee[pa](
            !0
            /* cancelled */
          ), he.persisted && !Oe ? le() : be(ee, () => {
            le(), ne && ne();
          });
        };
        Ce ? Ce(ee, le, ce) : ce();
      }
    else
      _(ee, B, K);
  }, Se = (T, B, K, Q = !1, X = !1) => {
    const {
      type: ee,
      props: de,
      ref: he,
      children: ue,
      dynamicChildren: ie,
      shapeFlag: ke,
      patchFlag: be,
      dirs: Ce,
      cacheIndex: ne,
      memo: le
    } = T;
    if ((be === -2 || ie && ie.hasOnce) && (X = !1), he != null && (Nr(), Ki(he, null, K, T, !0), Dr()), ne != null && (!T.ctx || T.ctx === B) && (B.renderCache[ne] = void 0), ke & 256) {
      B.ctx.deactivate(T);
      return;
    }
    const ce = ke & 1 && Ce, Oe = !Zi(T);
    let Ae;
    if (Oe && (Ae = de && de.onVnodeBeforeUnmount) && fr(Ae, B, T), ke & 6)
      Pe(T.component, K, Q);
    else {
      if (ke & 128) {
        T.suspense.unmount(K, Q);
        return;
      }
      ce && Sn(T, null, B, "beforeUnmount"), ke & 64 ? T.type.remove(
        T,
        B,
        K,
        Te,
        Q
      ) : ie && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !ie.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ee !== Qt || be > 0 && be & 64) ? Me(
        ie,
        B,
        K,
        !1,
        !0
      ) : (ee === Qt && be & 384 || !X && ke & 16) && Me(ue, B, K), Q && me(T);
    }
    const ze = le != null && ne == null;
    (Oe && (Ae = de && de.onVnodeUnmounted) || ce || ze) && Lt(() => {
      Ae && fr(Ae, B, T), ce && Sn(T, null, B, "unmounted"), ze && (T.el = null);
    }, K);
  }, me = (T) => {
    const { type: B, el: K, anchor: Q, transition: X } = T;
    if (B === Qt) {
      Re(K, Q);
      return;
    }
    if (B === ma) {
      R(T), X && !X.persisted && X.afterLeave && X.afterLeave();
      return;
    }
    const ee = () => {
      v(K), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (T.shapeFlag & 1 && X && !X.persisted) {
      const { leave: de, delayLeave: he } = X, ue = () => de(K, ee);
      he ? he(T.el, ee, ue) : ue();
    } else
      ee();
  }, Re = (T, B) => {
    let K;
    for (; T !== B; )
      K = w(T), v(T), T = K;
    v(B);
  }, Pe = (T, B, K) => {
    const { bum: Q, scope: X, job: ee, subTree: de, um: he, m: ue, a: ie } = T;
    Bu(ue), Bu(ie), Q && Po(Q), X.stop(), ee ? (ee.flags |= 8, Se(de, T, B, K)) : T.vnode.el && de && (de.transition = T.vnode.transition, Se(de, T, B, K)), he && Lt(he, B), Lt(() => {
      T.isUnmounted = !0;
    }, B);
  }, Me = (T, B, K, Q = !1, X = !1, ee = 0) => {
    for (let de = ee; de < T.length; de++)
      Se(T[de], B, K, Q, X);
  }, Qe = (T) => {
    if (T.shapeFlag & 6)
      return Qe(T.component.subTree);
    if (T.shapeFlag & 128)
      return T.suspense.next();
    const B = w(T.anchor || T.el), K = B && B[Py];
    return K ? w(K) : B;
  };
  let rt = !1;
  const Ve = (T, B, K) => {
    let Q;
    T == null ? B._vnode && (Se(B._vnode, null, null, !0), Q = B._vnode.component) : x(
      B._vnode || null,
      T,
      B,
      null,
      null,
      null,
      K
    ), B._vnode = T, rt || (rt = !0, Ou(Q), xc(), rt = !1);
  }, Te = {
    p: x,
    um: Se,
    m: Ee,
    r: me,
    mt: Y,
    mc: H,
    pc: pe,
    pbc: D,
    n: Qe,
    o: l
  };
  return {
    render: Ve,
    hydrate: void 0,
    createApp: Ky(Ve)
  };
}
function ya({ type: l, props: c }, f) {
  return f === "svg" && l === "foreignObject" || f === "mathml" && l === "annotation-xml" && c && c.encoding && c.encoding.includes("html") ? void 0 : f;
}
function Pn({ effect: l, job: c }, f) {
  f ? (l.flags |= 32, c.flags |= 4) : (l.flags &= -33, c.flags &= -5);
}
function dm(l, c) {
  return (!l || l && !l.pendingBranch) && c && !c.persisted;
}
function Kc(l, c, f = !1) {
  const _ = l.children, v = c.children;
  if (Fe(_) && Fe(v))
    for (let O = 0; O < _.length; O++) {
      const h = _[O];
      let g = v[O];
      g.shapeFlag & 1 && !g.dynamicChildren && ((g.patchFlag <= 0 || g.patchFlag === 32) && (g = v[O] = Ar(v[O]), g.el = h.el), !f && g.patchFlag !== -2 && Kc(h, g)), g.type === Zo && (g.patchFlag === -1 && (g = v[O] = Ar(g)), g.el = h.el), g.type === Fr && !g.el && (g.el = h.el);
    }
}
function hm(l) {
  const c = l.slice(), f = [0];
  let _, v, O, h, g;
  const s = l.length;
  for (_ = 0; _ < s; _++) {
    const p = l[_];
    if (p !== 0) {
      if (v = f[f.length - 1], l[v] < p) {
        c[_] = v, f.push(_);
        continue;
      }
      for (O = 0, h = f.length - 1; O < h; )
        g = O + h >> 1, l[f[g]] < p ? O = g + 1 : h = g;
      p < l[f[O]] && (O > 0 && (c[_] = f[O - 1]), f[O] = _);
    }
  }
  for (O = f.length, h = f[O - 1]; O-- > 0; )
    f[O] = h, h = c[h];
  return f;
}
function Zc(l) {
  const c = l.subTree.component;
  if (c)
    return c.asyncDep && !c.asyncResolved ? c : Zc(c);
}
function Bu(l) {
  if (l)
    for (let c = 0; c < l.length; c++)
      l[c].flags |= 8;
}
function Yc(l) {
  if (l.placeholder)
    return l.placeholder;
  const c = l.component;
  return c ? Yc(c.subTree) : null;
}
const Qc = (l) => l.__isSuspense;
function pm(l, c) {
  c && c.pendingBranch ? Fe(l) ? c.effects.push(...l) : c.effects.push(l) : ky(l);
}
const Qt = /* @__PURE__ */ Symbol.for("v-fgt"), Zo = /* @__PURE__ */ Symbol.for("v-txt"), Fr = /* @__PURE__ */ Symbol.for("v-cmt"), ma = /* @__PURE__ */ Symbol.for("v-stc"), Rn = [];
let Bt = null;
function gr(l = !1) {
  Rn.push(Bt = l ? null : []);
}
function Xc() {
  Rn.pop(), Bt = Rn[Rn.length - 1] || null;
}
let ro = 1;
function Nu(l, c = !1) {
  ro += l, l < 0 && Bt && c && (Bt.hasOnce = !0);
}
function ed(l) {
  return l.dynamicChildren = ro > 0 ? Bt || Ln : null, Xc(), ro > 0 && Bt && Bt.push(l), l;
}
function Br(l, c, f, _, v, O) {
  return ed(
    We(
      l,
      c,
      f,
      _,
      v,
      O,
      !0
    )
  );
}
function fm(l, c, f, _, v) {
  return ed(
    tr(
      l,
      c,
      f,
      _,
      v,
      !0
    )
  );
}
function td(l) {
  return l ? l.__v_isVNode === !0 : !1;
}
function qi(l, c) {
  return l.type === c.type && l.key === c.key;
}
const rd = ({ key: l }) => l ?? null, Ao = ({
  ref: l,
  ref_key: c,
  ref_for: f
}) => (typeof l == "number" && (l = "" + l), l != null ? ht(l) || /* @__PURE__ */ jt(l) || qe(l) ? { i: Nt, r: l, k: c, f: !!f } : l : null);
function We(l, c = null, f = null, _ = 0, v = null, O = l === Qt ? 0 : 1, h = !1, g = !1) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l,
    props: c,
    key: c && rd(c),
    ref: c && Ao(c),
    scopeId: Cc,
    slotScopeIds: null,
    children: f,
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
    dynamicProps: v,
    dynamicChildren: null,
    appContext: null,
    ctx: Nt
  };
  return g ? (Mo(s, f), O & 128 && l.normalize(s)) : f && (s.shapeFlag |= ht(f) ? 8 : 16), ro > 0 && // avoid a block node from tracking itself
  !h && // has current parent block
  Bt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (s.patchFlag > 0 || O & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  s.patchFlag !== 32 && Bt.push(s), s;
}
const tr = ym;
function ym(l, c = null, f = null, _ = 0, v = null, O = !1) {
  if ((!l || l === Vy) && (l = Fr), td(l)) {
    const g = Si(
      l,
      c,
      !0
      /* mergeRef: true */
    );
    return f && Mo(g, f), ro > 0 && !O && Bt && (g.shapeFlag & 6 ? Bt[Bt.indexOf(l)] = g : Bt.push(g)), g.patchFlag = -2, g;
  }
  if (Cm(l) && (l = l.__vccOpts), c) {
    c = mm(c);
    let { class: g, style: s } = c;
    g && !ht(g) && (c.class = Da(g)), nt(s) && (/* @__PURE__ */ $a(s) && !Fe(s) && (s = xt({}, s)), c.style = Na(s));
  }
  const h = ht(l) ? 1 : Qc(l) ? 128 : Wo(l) ? 64 : nt(l) ? 4 : qe(l) ? 2 : 0;
  return We(
    l,
    c,
    f,
    _,
    v,
    h,
    O,
    !0
  );
}
function mm(l) {
  return l ? /* @__PURE__ */ $a(l) || qc(l) ? xt({}, l) : l : null;
}
function Si(l, c, f = !1, _ = !1) {
  const { props: v, ref: O, patchFlag: h, children: g, transition: s } = l, p = c ? bm(v || {}, c) : v, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l.type,
    props: p,
    key: p && rd(p),
    ref: c && c.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      f && O ? Fe(O) ? O.concat(Ao(c)) : [O, Ao(c)] : Ao(c)
    ) : O,
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
    patchFlag: c && l.type !== Qt ? h === -1 ? 16 : h | 16 : h,
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
    ssContent: l.ssContent && Si(l.ssContent),
    ssFallback: l.ssFallback && Si(l.ssFallback),
    placeholder: l.placeholder,
    el: l.el,
    anchor: l.anchor,
    ctx: l.ctx,
    ce: l.ce,
    cacheIndex: l.cacheIndex
  };
  return s && _ && Wa(
    y,
    s.clone(y)
  ), y;
}
function Ya(l = " ", c = 0) {
  return tr(Zo, null, l, c);
}
function Fo(l = "", c = !1) {
  return c ? (gr(), fm(Fr, null, l)) : tr(Fr, null, l);
}
function br(l) {
  return l == null || typeof l == "boolean" ? tr(Fr) : Fe(l) ? tr(
    Qt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    l.slice()
  ) : td(l) ? Ar(l) : tr(Zo, null, String(l));
}
function Ar(l) {
  return l.el === null && l.patchFlag !== -1 || l.memo ? l : Si(l);
}
function Mo(l, c) {
  let f = 0;
  const { shapeFlag: _ } = l;
  if (c == null)
    c = null;
  else if (Fe(c))
    f = 16;
  else if (typeof c == "object")
    if (_ & 65) {
      const v = c.default;
      v && (v._c && (v._d = !1), Mo(l, v()), v._c && (v._d = !0));
      return;
    } else {
      f = 32;
      const v = c._;
      !v && !qc(c) ? c._ctx = Nt : v === 3 && Nt && (Nt.slots._ === 1 ? c._ = 1 : (c._ = 2, l.patchFlag |= 1024));
    }
  else if (qe(c)) {
    if (_ & 65) {
      Mo(l, { default: c });
      return;
    }
    c = { default: c, _ctx: Nt }, f = 32;
  } else
    c = String(c), _ & 64 ? (f = 16, c = [Ya(c)]) : f = 8;
  l.children = c, l.shapeFlag |= f;
}
function bm(...l) {
  const c = {};
  for (let f = 0; f < l.length; f++) {
    const _ = l[f];
    for (const v in _)
      if (v === "class")
        c.class !== _.class && (c.class = Da([c.class, _.class]));
      else if (v === "style")
        c.style = Na([c.style, _.style]);
      else if (Vo(v)) {
        const O = c[v], h = _[v];
        h && O !== h && !(Fe(O) && O.includes(h)) ? c[v] = O ? [].concat(O, h) : h : h == null && O == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !zo(v) && (c[v] = h);
      } else v !== "" && (c[v] = _[v]);
  }
  return c;
}
function fr(l, c, f, _ = null) {
  rr(l, c, 7, [
    f,
    _
  ]);
}
const vm = Fc();
let gm = 0;
function _m(l, c, f) {
  const _ = l.type, v = (c ? c.appContext : l.appContext) || vm, O = {
    uid: gm++,
    vnode: l,
    type: _,
    parent: c,
    appContext: v,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new $f(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: c ? c.provides : Object.create(v.provides),
    ids: c ? c.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: $c(_, v),
    emitsOptions: Mc(_, v),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: lt,
    // inheritAttrs
    inheritAttrs: _.inheritAttrs,
    // state
    ctx: lt,
    data: lt,
    props: lt,
    attrs: lt,
    slots: lt,
    refs: lt,
    setupState: lt,
    setupContext: null,
    // suspense related
    suspense: f,
    suspenseId: f ? f.pendingId : 0,
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
  return O.ctx = { _: O }, O.root = c ? c.root : O, O.emit = Yy.bind(null, O), l.ce && l.ce(O), O;
}
let Tt = null;
const wm = () => Tt || Nt;
let Ho, no;
{
  const l = Uo(), c = (f, _) => {
    let v;
    return (v = l[f]) || (v = l[f] = []), v.push(_), (O) => {
      v.length > 1 ? v.forEach((h) => h(O)) : v[0](O);
    };
  };
  Ho = c(
    "__VUE_INSTANCE_SETTERS__",
    (f) => Tt = f
  ), no = c(
    "__VUE_SSR_SETTERS__",
    (f) => io = f
  );
}
const ao = (l) => {
  const c = Tt;
  return Ho(l), l.scope.on(), () => {
    l.scope.off(), Ho(c);
  };
}, Du = () => {
  Tt && Tt.scope.off(), Ho(null);
};
function nd(l) {
  return l.vnode.shapeFlag & 4;
}
let io = !1;
function km(l, c = !1, f = !1) {
  c && no(c);
  const { props: _, children: v } = l.vnode, O = nd(l);
  nm(l, _, O, c), am(l, v, f || c);
  const h = O ? jm(l, c) : void 0;
  return c && no(!1), h;
}
function jm(l, c) {
  const f = l.type;
  l.accessCache = /* @__PURE__ */ Object.create(null), l.proxy = new Proxy(l.ctx, zy);
  const { setup: _ } = f;
  if (_) {
    Nr();
    const v = l.setupContext = _.length > 1 ? Om(l) : null, O = ao(l), h = so(
      _,
      l,
      0,
      [
        l.props,
        v
      ]
    ), g = Qu(h);
    if (Dr(), O(), (g || l.sp) && !Zi(l) && Tc(l), g) {
      if (h.then(Du, Du), c)
        return h.then((s) => {
          no(!0);
          try {
            Fu(l, s, c);
          } finally {
            no(!1);
          }
        }).catch((s) => {
          Go(s, l, 0);
        });
      l.asyncDep = h;
    } else
      Fu(l, h);
  } else
    id(l);
}
function Fu(l, c, f) {
  qe(c) ? l.type.__ssrInlineRender ? l.ssrRender = c : l.render = c : nt(c) && (l.setupState = wc(c)), id(l);
}
function id(l, c, f) {
  const _ = l.type;
  l.render || (l.render = _.render || _r);
  {
    const v = ao(l);
    Nr();
    try {
      qy(l);
    } finally {
      Dr(), v();
    }
  }
}
const xm = {
  get(l, c) {
    return kt(l, "get", ""), l[c];
  }
};
function Om(l) {
  const c = (f) => {
    l.exposed = f || {};
  };
  return {
    attrs: new Proxy(l.attrs, xm),
    slots: l.slots,
    emit: l.emit,
    expose: c
  };
}
function Yo(l) {
  return l.exposed ? l.exposeProxy || (l.exposeProxy = new Proxy(wc(dy(l.exposed)), {
    get(c, f) {
      if (f in c)
        return c[f];
      if (f in Yi)
        return Yi[f](l);
    },
    has(c, f) {
      return f in c || f in Yi;
    }
  })) : l.proxy;
}
function Cm(l) {
  return qe(l) && "__vccOpts" in l;
}
const od = (l, c) => /* @__PURE__ */ by(l, c, io), Em = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let La;
const Mu = typeof window < "u" && window.trustedTypes;
if (Mu)
  try {
    La = /* @__PURE__ */ Mu.createPolicy("vue", {
      createHTML: (l) => l
    });
  } catch {
  }
const sd = La ? (l) => La.createHTML(l) : (l) => l, Sm = "http://www.w3.org/2000/svg", Pm = "http://www.w3.org/1998/Math/MathML", Lr = typeof document < "u" ? document : null, Hu = Lr && /* @__PURE__ */ Lr.createElement("template"), Tm = {
  insert: (l, c, f) => {
    c.insertBefore(l, f || null);
  },
  remove: (l) => {
    const c = l.parentNode;
    c && c.removeChild(l);
  },
  createElement: (l, c, f, _) => {
    const v = c === "svg" ? Lr.createElementNS(Sm, l) : c === "mathml" ? Lr.createElementNS(Pm, l) : f ? Lr.createElement(l, { is: f }) : Lr.createElement(l);
    return l === "select" && _ && _.multiple != null && v.setAttribute("multiple", _.multiple), v;
  },
  createText: (l) => Lr.createTextNode(l),
  createComment: (l) => Lr.createComment(l),
  setText: (l, c) => {
    l.nodeValue = c;
  },
  setElementText: (l, c) => {
    l.textContent = c;
  },
  parentNode: (l) => l.parentNode,
  nextSibling: (l) => l.nextSibling,
  querySelector: (l) => Lr.querySelector(l),
  setScopeId(l, c) {
    l.setAttribute(c, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(l, c, f, _, v, O) {
    const h = f ? f.previousSibling : c.lastChild;
    if (v && (v === O || v.nextSibling))
      for (; c.insertBefore(v.cloneNode(!0), f), !(v === O || !(v = v.nextSibling)); )
        ;
    else {
      Hu.innerHTML = sd(
        _ === "svg" ? `<svg>${l}</svg>` : _ === "mathml" ? `<math>${l}</math>` : l
      );
      const g = Hu.content;
      if (_ === "svg" || _ === "mathml") {
        const s = g.firstChild;
        for (; s.firstChild; )
          g.appendChild(s.firstChild);
        g.removeChild(s);
      }
      c.insertBefore(g, f);
    }
    return [
      // first
      h ? h.nextSibling : c.firstChild,
      // last
      f ? f.previousSibling : c.lastChild
    ];
  }
}, Lm = /* @__PURE__ */ Symbol("_vtc");
function Am(l, c, f) {
  const _ = l[Lm];
  _ && (c = (c ? [c, ..._] : [..._]).join(" ")), c == null ? l.removeAttribute("class") : f ? l.setAttribute("class", c) : l.className = c;
}
const Vu = /* @__PURE__ */ Symbol("_vod"), Rm = /* @__PURE__ */ Symbol("_vsh"), Im = /* @__PURE__ */ Symbol(""), Bm = /(?:^|;)\s*display\s*:/;
function Nm(l, c, f) {
  const _ = l.style, v = ht(f);
  let O = !1;
  if (f && !v) {
    if (c)
      if (ht(c))
        for (const h of c.split(";")) {
          const g = h.slice(0, h.indexOf(":")).trim();
          f[g] == null && $i(_, g, "");
        }
      else
        for (const h in c)
          f[h] == null && $i(_, h, "");
    for (const h in f) {
      h === "display" && (O = !0);
      const g = f[h];
      g != null ? Fm(
        l,
        h,
        !ht(c) && c ? c[h] : void 0,
        g
      ) || $i(_, h, g) : $i(_, h, "");
    }
  } else if (v) {
    if (c !== f) {
      const h = _[Im];
      h && (f += ";" + h), _.cssText = f, O = Bm.test(f);
    }
  } else c && l.removeAttribute("style");
  Vu in l && (l[Vu] = O ? _.display : "", l[Rm] && (_.display = "none"));
}
const So = /\s*!important$/;
function $i(l, c, f) {
  if (Fe(f))
    f.forEach((_) => $i(l, c, _));
  else if (f == null && (f = ""), c.startsWith("--"))
    So.test(f) ? l.setProperty(c, f.replace(So, ""), "important") : l.setProperty(c, f);
  else {
    const _ = Dm(l, c);
    So.test(f) ? l.setProperty(
      In(_),
      f.replace(So, ""),
      "important"
    ) : l[_] = f;
  }
}
const zu = ["Webkit", "Moz", "ms"], ba = {};
function Dm(l, c) {
  const f = ba[c];
  if (f)
    return f;
  let _ = Xt(c);
  if (_ !== "filter" && _ in l)
    return ba[c] = _;
  _ = tc(_);
  for (let v = 0; v < zu.length; v++) {
    const O = zu[v] + _;
    if (O in l)
      return ba[c] = O;
  }
  return c;
}
function Fm(l, c, f, _) {
  return l.tagName === "TEXTAREA" && (c === "width" || c === "height") && ht(_) && f === _;
}
const qu = "http://www.w3.org/1999/xlink";
function Uu(l, c, f, _, v, O = zf(c)) {
  _ && c.startsWith("xlink:") ? f == null ? l.removeAttributeNS(qu, c.slice(6, c.length)) : l.setAttributeNS(qu, c, f) : f == null || O && !nc(f) ? l.removeAttribute(c) : l.setAttribute(
    c,
    O ? "" : wr(f) ? String(f) : f
  );
}
function $u(l, c, f, _, v) {
  if (c === "innerHTML" || c === "textContent") {
    f != null && (l[c] = c === "innerHTML" ? sd(f) : f);
    return;
  }
  const O = l.tagName;
  if (c === "value" && O !== "PROGRESS" && // custom elements may use _value internally
  !O.includes("-")) {
    const g = O === "OPTION" ? l.getAttribute("value") || "" : l.value, s = f == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      l.type === "checkbox" ? "on" : ""
    ) : String(f);
    (g !== s || !("_value" in l)) && (l.value = s), f == null && l.removeAttribute(c), l._value = f;
    return;
  }
  let h = !1;
  if (f === "" || f == null) {
    const g = typeof l[c];
    g === "boolean" ? f = nc(f) : f == null && g === "string" ? (f = "", h = !0) : g === "number" && (f = 0, h = !0);
  }
  try {
    l[c] = f;
  } catch {
  }
  h && l.removeAttribute(v || c);
}
function ad(l, c, f, _) {
  l.addEventListener(c, f, _);
}
function Mm(l, c, f, _) {
  l.removeEventListener(c, f, _);
}
const Gu = /* @__PURE__ */ Symbol("_vei");
function Hm(l, c, f, _, v = null) {
  const O = l[Gu] || (l[Gu] = {}), h = O[c];
  if (_ && h)
    h.value = _;
  else {
    const [g, s] = qm(c);
    if (_) {
      const p = O[c] = Gm(
        _,
        v
      );
      ad(l, g, p, s);
    } else h && (Mm(l, g, h, s), O[c] = void 0);
  }
}
const Vm = /(Once|Passive|Capture)$/, zm = /^on:?(?:Once|Passive|Capture)$/;
function qm(l) {
  let c, f;
  for (; (f = l.match(Vm)) && !zm.test(l); )
    c || (c = {}), l = l.slice(0, l.length - f[1].length), c[f[1].toLowerCase()] = !0;
  return [l[2] === ":" ? l.slice(3) : In(l.slice(2)), c];
}
let va = 0;
const Um = /* @__PURE__ */ Promise.resolve(), $m = () => va || (Um.then(() => va = 0), va = Date.now());
function Gm(l, c) {
  const f = (_) => {
    if (!_._vts)
      _._vts = Date.now();
    else if (_._vts <= f.attached)
      return;
    const v = f.value;
    if (Fe(v)) {
      const O = _.stopImmediatePropagation;
      _.stopImmediatePropagation = () => {
        O.call(_), _._stopped = !0;
      };
      const h = v.slice(), g = [_];
      for (let s = 0; s < h.length && !_._stopped; s++) {
        const p = h[s];
        p && rr(
          p,
          c,
          5,
          g
        );
      }
    } else
      rr(
        v,
        c,
        5,
        [_]
      );
  };
  return f.value = l, f.attached = $m(), f;
}
const Wu = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // lowercase letter
l.charCodeAt(2) > 96 && l.charCodeAt(2) < 123, Wm = (l, c, f, _, v, O) => {
  const h = v === "svg";
  c === "class" ? Am(l, _, h) : c === "style" ? Nm(l, f, _) : Vo(c) ? zo(c) || Hm(l, c, f, _, O) : (c[0] === "." ? (c = c.slice(1), !0) : c[0] === "^" ? (c = c.slice(1), !1) : Jm(l, c, _, h)) ? ($u(l, c, _), !l.tagName.includes("-") && (c === "value" || c === "checked" || c === "selected") && Uu(l, c, _, h, O, c !== "value")) : /* #11081 force set props for possible async custom element */ l._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Km(l, c) || // @ts-expect-error _def is private
  l._def.__asyncLoader && (/[A-Z]/.test(c) || !ht(_))) ? $u(l, Xt(c), _, O, c) : (c === "true-value" ? l._trueValue = _ : c === "false-value" && (l._falseValue = _), Uu(l, c, _, h));
};
function Jm(l, c, f, _) {
  if (_)
    return !!(c === "innerHTML" || c === "textContent" || c in l && Wu(c) && qe(f));
  if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA")
    return !1;
  if (c === "width" || c === "height") {
    const v = l.tagName;
    if (v === "IMG" || v === "VIDEO" || v === "CANVAS" || v === "SOURCE")
      return !1;
  }
  return Wu(c) && ht(f) ? !1 : c in l;
}
function Km(l, c) {
  const f = (
    // @ts-expect-error _def is private
    l._def.props
  );
  if (!f)
    return !1;
  const _ = Xt(c);
  return Array.isArray(f) ? f.some((v) => Xt(v) === _) : Object.keys(f).some((v) => Xt(v) === _);
}
const Ju = (l) => {
  const c = l.props["onUpdate:modelValue"] || !1;
  return Fe(c) ? (f) => Po(c, f) : c;
}, ga = /* @__PURE__ */ Symbol("_assign"), Zm = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(l, c, f) {
    l[ga] = Ju(f), ad(l, "change", () => {
      const _ = l._modelValue, v = Ym(l), O = l.checked, h = l[ga];
      if (Fe(_)) {
        const g = ic(_, v), s = g !== -1;
        if (O && !s)
          h(_.concat(v));
        else if (!O && s) {
          const p = [..._];
          p.splice(g, 1), h(p);
        }
      } else if (Ei(_)) {
        const g = new Set(_);
        O ? g.add(v) : g.delete(v), h(g);
      } else
        h(ld(l, O));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ku,
  beforeUpdate(l, c, f) {
    l[ga] = Ju(f), Ku(l, c, f);
  }
};
function Ku(l, { value: c, oldValue: f }, _) {
  l._modelValue = c;
  let v;
  if (Fe(c))
    v = ic(c, _.props.value) > -1;
  else if (Ei(c))
    v = c.has(_.props.value);
  else {
    if (c === f) return;
    v = Pi(c, ld(l, !0));
  }
  l.checked !== v && (l.checked = v);
}
function Ym(l) {
  return "_value" in l ? l._value : l.value;
}
function ld(l, c) {
  const f = c ? "_trueValue" : "_falseValue";
  return f in l ? l[f] : c;
}
const Qm = /* @__PURE__ */ xt({ patchProp: Wm }, Tm);
let Zu;
function Xm() {
  return Zu || (Zu = um(Qm));
}
const eb = (...l) => {
  const c = Xm().createApp(...l), { mount: f } = c;
  return c.mount = (_) => {
    const v = rb(_);
    if (!v) return;
    const O = c._component;
    !qe(O) && !O.render && !O.template && (O.template = v.innerHTML), v.nodeType === 1 && (v.textContent = "");
    const h = f(v, !1, tb(v));
    return v instanceof Element && (v.removeAttribute("v-cloak"), v.setAttribute("data-v-app", "")), h;
  }, c;
};
function tb(l) {
  if (l instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && l instanceof MathMLElement)
    return "mathml";
}
function rb(l) {
  return ht(l) ? document.querySelector(l) : l;
}
function nb(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var ud = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(l, c) {
  (function(f, _) {
    l.exports = _();
  })(self, () => (() => {
    var f = { 9306: (h, g, s) => {
      var p = s(4901), y = s(6823), m = TypeError;
      h.exports = function(w) {
        if (p(w)) return w;
        throw new m(y(w) + " is not a function");
      };
    }, 5548: (h, g, s) => {
      var p = s(3517), y = s(6823), m = TypeError;
      h.exports = function(w) {
        if (p(w)) return w;
        throw new m(y(w) + " is not a constructor");
      };
    }, 3506: (h, g, s) => {
      var p = s(3925), y = String, m = TypeError;
      h.exports = function(w) {
        if (p(w)) return w;
        throw new m("Can't set " + y(w) + " as a prototype");
      };
    }, 6469: (h, g, s) => {
      var p = s(8227), y = s(2360), m = s(4913).f, w = p("unscopables"), k = Array.prototype;
      k[w] === void 0 && m(k, w, { configurable: !0, value: y(null) }), h.exports = function(C) {
        k[w][C] = !0;
      };
    }, 7829: (h, g, s) => {
      var p = s(8183).charAt;
      h.exports = function(y, m, w) {
        return m + (w ? p(y, m).length : 1);
      };
    }, 679: (h, g, s) => {
      var p = s(1625), y = TypeError;
      h.exports = function(m, w) {
        if (p(w, m)) return m;
        throw new y("Incorrect invocation");
      };
    }, 8551: (h, g, s) => {
      var p = s(34), y = String, m = TypeError;
      h.exports = function(w) {
        if (p(w)) return w;
        throw new m(y(w) + " is not an object");
      };
    }, 235: (h, g, s) => {
      var p = s(9213).forEach, y = s(4598)("forEach");
      h.exports = y ? [].forEach : function(m) {
        return p(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (h, g, s) => {
      var p = s(6080), y = s(9565), m = s(8981), w = s(6319), k = s(4209), C = s(3517), x = s(6198), E = s(4659), P = s(81), L = s(851), A = Array;
      h.exports = function(R) {
        var F = m(R), M = C(this), z = arguments.length, H = z > 1 ? arguments[1] : void 0, V = H !== void 0;
        V && (H = p(H, z > 2 ? arguments[2] : void 0));
        var D, N, G, $, Y, ae, oe = L(F), re = 0;
        if (!oe || this === A && k(oe)) for (D = x(F), N = M ? new this(D) : A(D); D > re; re++) ae = V ? H(F[re], re) : F[re], E(N, re, ae);
        else for (N = M ? new this() : [], Y = ($ = P(F, oe)).next; !(G = y(Y, $)).done; re++) ae = V ? w($, H, [G.value, re], !0) : G.value, E(N, re, ae);
        return N.length = re, N;
      };
    }, 9617: (h, g, s) => {
      var p = s(5397), y = s(5610), m = s(6198), w = function(k) {
        return function(C, x, E) {
          var P = p(C), L = m(P);
          if (L === 0) return !k && -1;
          var A, R = y(E, L);
          if (k && x != x) {
            for (; L > R; ) if ((A = P[R++]) != A) return !0;
          } else for (; L > R; R++) if ((k || R in P) && P[R] === x) return k || R || 0;
          return !k && -1;
        };
      };
      h.exports = { includes: w(!0), indexOf: w(!1) };
    }, 9213: (h, g, s) => {
      var p = s(6080), y = s(9504), m = s(7055), w = s(8981), k = s(6198), C = s(1469), x = y([].push), E = function(P) {
        var L = P === 1, A = P === 2, R = P === 3, F = P === 4, M = P === 6, z = P === 7, H = P === 5 || M;
        return function(V, D, N, G) {
          for (var $, Y, ae = w(V), oe = m(ae), re = k(oe), pe = p(D, N), fe = 0, je = G || C, Ee = L ? je(V, re) : A || z ? je(V, 0) : void 0; re > fe; fe++) if ((H || fe in oe) && (Y = pe($ = oe[fe], fe, ae), P)) if (L) Ee[fe] = Y;
          else if (Y) switch (P) {
            case 3:
              return !0;
            case 5:
              return $;
            case 6:
              return fe;
            case 2:
              x(Ee, $);
          }
          else switch (P) {
            case 4:
              return !1;
            case 7:
              x(Ee, $);
          }
          return M ? -1 : R || F ? F : Ee;
        };
      };
      h.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (h, g, s) => {
      var p = s(9039), y = s(8227), m = s(7388), w = y("species");
      h.exports = function(k) {
        return m >= 51 || !p(function() {
          var C = [];
          return (C.constructor = {})[w] = function() {
            return { foo: 1 };
          }, C[k](Boolean).foo !== 1;
        });
      };
    }, 4598: (h, g, s) => {
      var p = s(9039);
      h.exports = function(y, m) {
        var w = [][y];
        return !!w && p(function() {
          w.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (h, g, s) => {
      var p = s(9306), y = s(8981), m = s(7055), w = s(6198), k = TypeError, C = "Reduce of empty array with no initial value", x = function(E) {
        return function(P, L, A, R) {
          var F = y(P), M = m(F), z = w(F);
          if (p(L), z === 0 && A < 2) throw new k(C);
          var H = E ? z - 1 : 0, V = E ? -1 : 1;
          if (A < 2) for (; ; ) {
            if (H in M) {
              R = M[H], H += V;
              break;
            }
            if (H += V, E ? H < 0 : z <= H) throw new k(C);
          }
          for (; E ? H >= 0 : z > H; H += V) H in M && (R = L(R, M[H], H, F));
          return R;
        };
      };
      h.exports = { left: x(!1), right: x(!0) };
    }, 4527: (h, g, s) => {
      var p = s(3724), y = s(4376), m = TypeError, w = Object.getOwnPropertyDescriptor, k = p && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (C) {
          return C instanceof TypeError;
        }
      }();
      h.exports = k ? function(C, x) {
        if (y(C) && !w(C, "length").writable) throw new m("Cannot set read only .length");
        return C.length = x;
      } : function(C, x) {
        return C.length = x;
      };
    }, 7680: (h, g, s) => {
      var p = s(9504);
      h.exports = p([].slice);
    }, 4488: (h, g, s) => {
      var p = s(7680), y = Math.floor, m = function(w, k) {
        var C = w.length;
        if (C < 8) for (var x, E, P = 1; P < C; ) {
          for (E = P, x = w[P]; E && k(w[E - 1], x) > 0; ) w[E] = w[--E];
          E !== P++ && (w[E] = x);
        }
        else for (var L = y(C / 2), A = m(p(w, 0, L), k), R = m(p(w, L), k), F = A.length, M = R.length, z = 0, H = 0; z < F || H < M; ) w[z + H] = z < F && H < M ? k(A[z], R[H]) <= 0 ? A[z++] : R[H++] : z < F ? A[z++] : R[H++];
        return w;
      };
      h.exports = m;
    }, 7433: (h, g, s) => {
      var p = s(4376), y = s(3517), m = s(34), w = s(8227)("species"), k = Array;
      h.exports = function(C) {
        var x;
        return p(C) && (x = C.constructor, (y(x) && (x === k || p(x.prototype)) || m(x) && (x = x[w]) === null) && (x = void 0)), x === void 0 ? k : x;
      };
    }, 1469: (h, g, s) => {
      var p = s(7433);
      h.exports = function(y, m) {
        return new (p(y))(m === 0 ? 0 : m);
      };
    }, 6319: (h, g, s) => {
      var p = s(8551), y = s(9539);
      h.exports = function(m, w, k, C) {
        try {
          return C ? w(p(k)[0], k[1]) : w(k);
        } catch (x) {
          y(m, "throw", x);
        }
      };
    }, 4428: (h, g, s) => {
      var p = s(8227)("iterator"), y = !1;
      try {
        var m = 0, w = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          y = !0;
        } };
        w[p] = function() {
          return this;
        }, Array.from(w, function() {
          throw 2;
        });
      } catch {
      }
      h.exports = function(k, C) {
        try {
          if (!C && !y) return !1;
        } catch {
          return !1;
        }
        var x = !1;
        try {
          var E = {};
          E[p] = function() {
            return { next: function() {
              return { done: x = !0 };
            } };
          }, k(E);
        } catch {
        }
        return x;
      };
    }, 4576: (h, g, s) => {
      var p = s(9504), y = p({}.toString), m = p("".slice);
      h.exports = function(w) {
        return m(y(w), 8, -1);
      };
    }, 6955: (h, g, s) => {
      var p = s(2140), y = s(4901), m = s(4576), w = s(8227)("toStringTag"), k = Object, C = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      h.exports = p ? m : function(x) {
        var E, P, L;
        return x === void 0 ? "Undefined" : x === null ? "Null" : typeof (P = function(A, R) {
          try {
            return A[R];
          } catch {
          }
        }(E = k(x), w)) == "string" ? P : C ? m(E) : (L = m(E)) === "Object" && y(E.callee) ? "Arguments" : L;
      };
    }, 7740: (h, g, s) => {
      var p = s(9297), y = s(5031), m = s(7347), w = s(4913);
      h.exports = function(k, C, x) {
        for (var E = y(C), P = w.f, L = m.f, A = 0; A < E.length; A++) {
          var R = E[A];
          p(k, R) || x && p(x, R) || P(k, R, L(C, R));
        }
      };
    }, 1436: (h, g, s) => {
      var p = s(8227)("match");
      h.exports = function(y) {
        var m = /./;
        try {
          "/./"[y](m);
        } catch {
          try {
            return m[p] = !1, "/./"[y](m);
          } catch {
          }
        }
        return !1;
      };
    }, 2211: (h, g, s) => {
      var p = s(9039);
      h.exports = !p(function() {
        function y() {
        }
        return y.prototype.constructor = null, Object.getPrototypeOf(new y()) !== y.prototype;
      });
    }, 2529: (h) => {
      h.exports = function(g, s) {
        return { value: g, done: s };
      };
    }, 6699: (h, g, s) => {
      var p = s(3724), y = s(4913), m = s(6980);
      h.exports = p ? function(w, k, C) {
        return y.f(w, k, m(1, C));
      } : function(w, k, C) {
        return w[k] = C, w;
      };
    }, 6980: (h) => {
      h.exports = function(g, s) {
        return { enumerable: !(1 & g), configurable: !(2 & g), writable: !(4 & g), value: s };
      };
    }, 4659: (h, g, s) => {
      var p = s(3724), y = s(4913), m = s(6980);
      h.exports = function(w, k, C) {
        p ? y.f(w, k, m(0, C)) : w[k] = C;
      };
    }, 380: (h, g, s) => {
      var p = s(9504), y = s(9039), m = s(533).start, w = RangeError, k = isFinite, C = Math.abs, x = Date.prototype, E = x.toISOString, P = p(x.getTime), L = p(x.getUTCDate), A = p(x.getUTCFullYear), R = p(x.getUTCHours), F = p(x.getUTCMilliseconds), M = p(x.getUTCMinutes), z = p(x.getUTCMonth), H = p(x.getUTCSeconds);
      h.exports = y(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !y(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!k(P(this))) throw new w("Invalid time value");
        var V = this, D = A(V), N = F(V), G = D < 0 ? "-" : D > 9999 ? "+" : "";
        return G + m(C(D), G ? 6 : 4, 0) + "-" + m(z(V) + 1, 2, 0) + "-" + m(L(V), 2, 0) + "T" + m(R(V), 2, 0) + ":" + m(M(V), 2, 0) + ":" + m(H(V), 2, 0) + "." + m(N, 3, 0) + "Z";
      } : E;
    }, 3640: (h, g, s) => {
      var p = s(8551), y = s(4270), m = TypeError;
      h.exports = function(w) {
        if (p(this), w === "string" || w === "default") w = "string";
        else if (w !== "number") throw new m("Incorrect hint");
        return y(this, w);
      };
    }, 2106: (h, g, s) => {
      var p = s(283), y = s(4913);
      h.exports = function(m, w, k) {
        return k.get && p(k.get, w, { getter: !0 }), k.set && p(k.set, w, { setter: !0 }), y.f(m, w, k);
      };
    }, 6840: (h, g, s) => {
      var p = s(4901), y = s(4913), m = s(283), w = s(9433);
      h.exports = function(k, C, x, E) {
        E || (E = {});
        var P = E.enumerable, L = E.name !== void 0 ? E.name : C;
        if (p(x) && m(x, L, E), E.global) P ? k[C] = x : w(C, x);
        else {
          try {
            E.unsafe ? k[C] && (P = !0) : delete k[C];
          } catch {
          }
          P ? k[C] = x : y.f(k, C, { value: x, enumerable: !1, configurable: !E.nonConfigurable, writable: !E.nonWritable });
        }
        return k;
      };
    }, 9433: (h, g, s) => {
      var p = s(4475), y = Object.defineProperty;
      h.exports = function(m, w) {
        try {
          y(p, m, { value: w, configurable: !0, writable: !0 });
        } catch {
          p[m] = w;
        }
        return w;
      };
    }, 4606: (h, g, s) => {
      var p = s(6823), y = TypeError;
      h.exports = function(m, w) {
        if (!delete m[w]) throw new y("Cannot delete property " + p(w) + " of " + p(m));
      };
    }, 3724: (h, g, s) => {
      var p = s(9039);
      h.exports = !p(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (h, g, s) => {
      var p = s(4475), y = s(34), m = p.document, w = y(m) && y(m.createElement);
      h.exports = function(k) {
        return w ? m.createElement(k) : {};
      };
    }, 6837: (h) => {
      var g = TypeError;
      h.exports = function(s) {
        if (s > 9007199254740991) throw g("Maximum allowed index exceeded");
        return s;
      };
    }, 7400: (h) => {
      h.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (h, g, s) => {
      var p = s(4055)("span").classList, y = p && p.constructor && p.constructor.prototype;
      h.exports = y === Object.prototype ? void 0 : y;
    }, 8834: (h, g, s) => {
      var p = s(9392).match(/firefox\/(\d+)/i);
      h.exports = !!p && +p[1];
    }, 7290: (h, g, s) => {
      var p = s(516), y = s(9088);
      h.exports = !p && !y && typeof window == "object" && typeof document == "object";
    }, 6763: (h) => {
      h.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (h) => {
      h.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (h, g, s) => {
      var p = s(9392);
      h.exports = /MSIE|Trident/.test(p);
    }, 28: (h, g, s) => {
      var p = s(9392);
      h.exports = /ipad|iphone|ipod/i.test(p) && typeof Pebble < "u";
    }, 8119: (h, g, s) => {
      var p = s(9392);
      h.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(p);
    }, 9088: (h, g, s) => {
      var p = s(4475), y = s(4576);
      h.exports = y(p.process) === "process";
    }, 6765: (h, g, s) => {
      var p = s(9392);
      h.exports = /web0s(?!.*chrome)/i.test(p);
    }, 9392: (h) => {
      h.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (h, g, s) => {
      var p, y, m = s(4475), w = s(9392), k = m.process, C = m.Deno, x = k && k.versions || C && C.version, E = x && x.v8;
      E && (y = (p = E.split("."))[0] > 0 && p[0] < 4 ? 1 : +(p[0] + p[1])), !y && w && (!(p = w.match(/Edge\/(\d+)/)) || p[1] >= 74) && (p = w.match(/Chrome\/(\d+)/)) && (y = +p[1]), h.exports = y;
    }, 9160: (h, g, s) => {
      var p = s(9392).match(/AppleWebKit\/(\d+)\./);
      h.exports = !!p && +p[1];
    }, 8727: (h) => {
      h.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (h, g, s) => {
      var p = s(4475), y = s(7347).f, m = s(6699), w = s(6840), k = s(9433), C = s(7740), x = s(2796);
      h.exports = function(E, P) {
        var L, A, R, F, M, z = E.target, H = E.global, V = E.stat;
        if (L = H ? p : V ? p[z] || k(z, {}) : p[z] && p[z].prototype) for (A in P) {
          if (F = P[A], R = E.dontCallGetSet ? (M = y(L, A)) && M.value : L[A], !x(H ? A : z + (V ? "." : "#") + A, E.forced) && R !== void 0) {
            if (typeof F == typeof R) continue;
            C(F, R);
          }
          (E.sham || R && R.sham) && m(F, "sham", !0), w(L, A, F, E);
        }
      };
    }, 9039: (h) => {
      h.exports = function(g) {
        try {
          return !!g();
        } catch {
          return !0;
        }
      };
    }, 9228: (h, g, s) => {
      s(7495);
      var p = s(9565), y = s(6840), m = s(7323), w = s(9039), k = s(8227), C = s(6699), x = k("species"), E = RegExp.prototype;
      h.exports = function(P, L, A, R) {
        var F = k(P), M = !w(function() {
          var D = {};
          return D[F] = function() {
            return 7;
          }, ""[P](D) !== 7;
        }), z = M && !w(function() {
          var D = !1, N = /a/;
          return P === "split" && ((N = {}).constructor = {}, N.constructor[x] = function() {
            return N;
          }, N.flags = "", N[F] = /./[F]), N.exec = function() {
            return D = !0, null;
          }, N[F](""), !D;
        });
        if (!M || !z || A) {
          var H = /./[F], V = L(F, ""[P], function(D, N, G, $, Y) {
            var ae = N.exec;
            return ae === m || ae === E.exec ? M && !Y ? { done: !0, value: p(H, N, G, $) } : { done: !0, value: p(D, G, N, $) } : { done: !1 };
          });
          y(String.prototype, P, V[0]), y(E, F, V[1]);
        }
        R && C(E[F], "sham", !0);
      };
    }, 8745: (h, g, s) => {
      var p = s(616), y = Function.prototype, m = y.apply, w = y.call;
      h.exports = typeof Reflect == "object" && Reflect.apply || (p ? w.bind(m) : function() {
        return w.apply(m, arguments);
      });
    }, 6080: (h, g, s) => {
      var p = s(7476), y = s(9306), m = s(616), w = p(p.bind);
      h.exports = function(k, C) {
        return y(k), C === void 0 ? k : m ? w(k, C) : function() {
          return k.apply(C, arguments);
        };
      };
    }, 616: (h, g, s) => {
      var p = s(9039);
      h.exports = !p(function() {
        var y = (function() {
        }).bind();
        return typeof y != "function" || y.hasOwnProperty("prototype");
      });
    }, 566: (h, g, s) => {
      var p = s(9504), y = s(9306), m = s(34), w = s(9297), k = s(7680), C = s(616), x = Function, E = p([].concat), P = p([].join), L = {};
      h.exports = C ? x.bind : function(A) {
        var R = y(this), F = R.prototype, M = k(arguments, 1), z = function() {
          var H = E(M, k(arguments));
          return this instanceof z ? function(V, D, N) {
            if (!w(L, D)) {
              for (var G = [], $ = 0; $ < D; $++) G[$] = "a[" + $ + "]";
              L[D] = x("C,a", "return new C(" + P(G, ",") + ")");
            }
            return L[D](V, N);
          }(R, H.length, H) : R.apply(A, H);
        };
        return m(F) && (z.prototype = F), z;
      };
    }, 9565: (h, g, s) => {
      var p = s(616), y = Function.prototype.call;
      h.exports = p ? y.bind(y) : function() {
        return y.apply(y, arguments);
      };
    }, 350: (h, g, s) => {
      var p = s(3724), y = s(9297), m = Function.prototype, w = p && Object.getOwnPropertyDescriptor, k = y(m, "name"), C = k && (function() {
      }).name === "something", x = k && (!p || p && w(m, "name").configurable);
      h.exports = { EXISTS: k, PROPER: C, CONFIGURABLE: x };
    }, 6706: (h, g, s) => {
      var p = s(9504), y = s(9306);
      h.exports = function(m, w, k) {
        try {
          return p(y(Object.getOwnPropertyDescriptor(m, w)[k]));
        } catch {
        }
      };
    }, 7476: (h, g, s) => {
      var p = s(4576), y = s(9504);
      h.exports = function(m) {
        if (p(m) === "Function") return y(m);
      };
    }, 9504: (h, g, s) => {
      var p = s(616), y = Function.prototype, m = y.call, w = p && y.bind.bind(m, m);
      h.exports = p ? w : function(k) {
        return function() {
          return m.apply(k, arguments);
        };
      };
    }, 7751: (h, g, s) => {
      var p = s(4475), y = s(4901);
      h.exports = function(m, w) {
        return arguments.length < 2 ? (k = p[m], y(k) ? k : void 0) : p[m] && p[m][w];
        var k;
      };
    }, 851: (h, g, s) => {
      var p = s(6955), y = s(5966), m = s(4117), w = s(6269), k = s(8227)("iterator");
      h.exports = function(C) {
        if (!m(C)) return y(C, k) || y(C, "@@iterator") || w[p(C)];
      };
    }, 81: (h, g, s) => {
      var p = s(9565), y = s(9306), m = s(8551), w = s(6823), k = s(851), C = TypeError;
      h.exports = function(x, E) {
        var P = arguments.length < 2 ? k(x) : E;
        if (y(P)) return m(p(P, x));
        throw new C(w(x) + " is not iterable");
      };
    }, 6933: (h, g, s) => {
      var p = s(9504), y = s(4376), m = s(4901), w = s(4576), k = s(655), C = p([].push);
      h.exports = function(x) {
        if (m(x)) return x;
        if (y(x)) {
          for (var E = x.length, P = [], L = 0; L < E; L++) {
            var A = x[L];
            typeof A == "string" ? C(P, A) : typeof A != "number" && w(A) !== "Number" && w(A) !== "String" || C(P, k(A));
          }
          var R = P.length, F = !0;
          return function(M, z) {
            if (F) return F = !1, z;
            if (y(this)) return z;
            for (var H = 0; H < R; H++) if (P[H] === M) return z;
          };
        }
      };
    }, 5966: (h, g, s) => {
      var p = s(9306), y = s(4117);
      h.exports = function(m, w) {
        var k = m[w];
        return y(k) ? void 0 : p(k);
      };
    }, 2478: (h, g, s) => {
      var p = s(9504), y = s(8981), m = Math.floor, w = p("".charAt), k = p("".replace), C = p("".slice), x = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      h.exports = function(P, L, A, R, F, M) {
        var z = A + P.length, H = R.length, V = E;
        return F !== void 0 && (F = y(F), V = x), k(M, V, function(D, N) {
          var G;
          switch (w(N, 0)) {
            case "$":
              return "$";
            case "&":
              return P;
            case "`":
              return C(L, 0, A);
            case "'":
              return C(L, z);
            case "<":
              G = F[C(N, 1, -1)];
              break;
            default:
              var $ = +N;
              if ($ === 0) return D;
              if ($ > H) {
                var Y = m($ / 10);
                return Y === 0 ? D : Y <= H ? R[Y - 1] === void 0 ? w(N, 1) : R[Y - 1] + w(N, 1) : D;
              }
              G = R[$ - 1];
          }
          return G === void 0 ? "" : G;
        });
      };
    }, 4475: function(h, g, s) {
      var p = function(y) {
        return y && y.Math === Math && y;
      };
      h.exports = p(typeof globalThis == "object" && globalThis) || p(typeof window == "object" && window) || p(typeof self == "object" && self) || p(typeof s.g == "object" && s.g) || p(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (h, g, s) => {
      var p = s(9504), y = s(8981), m = p({}.hasOwnProperty);
      h.exports = Object.hasOwn || function(w, k) {
        return m(y(w), k);
      };
    }, 421: (h) => {
      h.exports = {};
    }, 3138: (h) => {
      h.exports = function(g, s) {
        try {
          arguments.length === 1 ? console.error(g) : console.error(g, s);
        } catch {
        }
      };
    }, 397: (h, g, s) => {
      var p = s(7751);
      h.exports = p("document", "documentElement");
    }, 5917: (h, g, s) => {
      var p = s(3724), y = s(9039), m = s(4055);
      h.exports = !p && !y(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (h, g, s) => {
      var p = s(9504), y = s(9039), m = s(4576), w = Object, k = p("".split);
      h.exports = y(function() {
        return !w("z").propertyIsEnumerable(0);
      }) ? function(C) {
        return m(C) === "String" ? k(C, "") : w(C);
      } : w;
    }, 3167: (h, g, s) => {
      var p = s(4901), y = s(34), m = s(2967);
      h.exports = function(w, k, C) {
        var x, E;
        return m && p(x = k.constructor) && x !== C && y(E = x.prototype) && E !== C.prototype && m(w, E), w;
      };
    }, 3706: (h, g, s) => {
      var p = s(9504), y = s(4901), m = s(7629), w = p(Function.toString);
      y(m.inspectSource) || (m.inspectSource = function(k) {
        return w(k);
      }), h.exports = m.inspectSource;
    }, 1181: (h, g, s) => {
      var p, y, m, w = s(8622), k = s(4475), C = s(34), x = s(6699), E = s(9297), P = s(7629), L = s(6119), A = s(421), R = "Object already initialized", F = k.TypeError, M = k.WeakMap;
      if (w || P.state) {
        var z = P.state || (P.state = new M());
        z.get = z.get, z.has = z.has, z.set = z.set, p = function(V, D) {
          if (z.has(V)) throw new F(R);
          return D.facade = V, z.set(V, D), D;
        }, y = function(V) {
          return z.get(V) || {};
        }, m = function(V) {
          return z.has(V);
        };
      } else {
        var H = L("state");
        A[H] = !0, p = function(V, D) {
          if (E(V, H)) throw new F(R);
          return D.facade = V, x(V, H, D), D;
        }, y = function(V) {
          return E(V, H) ? V[H] : {};
        }, m = function(V) {
          return E(V, H);
        };
      }
      h.exports = { set: p, get: y, has: m, enforce: function(V) {
        return m(V) ? y(V) : p(V, {});
      }, getterFor: function(V) {
        return function(D) {
          var N;
          if (!C(D) || (N = y(D)).type !== V) throw new F("Incompatible receiver, " + V + " required");
          return N;
        };
      } };
    }, 4209: (h, g, s) => {
      var p = s(8227), y = s(6269), m = p("iterator"), w = Array.prototype;
      h.exports = function(k) {
        return k !== void 0 && (y.Array === k || w[m] === k);
      };
    }, 4376: (h, g, s) => {
      var p = s(4576);
      h.exports = Array.isArray || function(y) {
        return p(y) === "Array";
      };
    }, 4901: (h) => {
      var g = typeof document == "object" && document.all;
      h.exports = g === void 0 && g !== void 0 ? function(s) {
        return typeof s == "function" || s === g;
      } : function(s) {
        return typeof s == "function";
      };
    }, 3517: (h, g, s) => {
      var p = s(9504), y = s(9039), m = s(4901), w = s(6955), k = s(7751), C = s(3706), x = function() {
      }, E = k("Reflect", "construct"), P = /^\s*(?:class|function)\b/, L = p(P.exec), A = !P.test(x), R = function(M) {
        if (!m(M)) return !1;
        try {
          return E(x, [], M), !0;
        } catch {
          return !1;
        }
      }, F = function(M) {
        if (!m(M)) return !1;
        switch (w(M)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return A || !!L(P, C(M));
        } catch {
          return !0;
        }
      };
      F.sham = !0, h.exports = !E || y(function() {
        var M;
        return R(R.call) || !R(Object) || !R(function() {
          M = !0;
        }) || M;
      }) ? F : R;
    }, 6575: (h, g, s) => {
      var p = s(9297);
      h.exports = function(y) {
        return y !== void 0 && (p(y, "value") || p(y, "writable"));
      };
    }, 2796: (h, g, s) => {
      var p = s(9039), y = s(4901), m = /#|\.prototype\./, w = function(P, L) {
        var A = C[k(P)];
        return A === E || A !== x && (y(L) ? p(L) : !!L);
      }, k = w.normalize = function(P) {
        return String(P).replace(m, ".").toLowerCase();
      }, C = w.data = {}, x = w.NATIVE = "N", E = w.POLYFILL = "P";
      h.exports = w;
    }, 4117: (h) => {
      h.exports = function(g) {
        return g == null;
      };
    }, 34: (h, g, s) => {
      var p = s(4901);
      h.exports = function(y) {
        return typeof y == "object" ? y !== null : p(y);
      };
    }, 3925: (h, g, s) => {
      var p = s(34);
      h.exports = function(y) {
        return p(y) || y === null;
      };
    }, 6395: (h) => {
      h.exports = !1;
    }, 788: (h, g, s) => {
      var p = s(34), y = s(4576), m = s(8227)("match");
      h.exports = function(w) {
        var k;
        return p(w) && ((k = w[m]) !== void 0 ? !!k : y(w) === "RegExp");
      };
    }, 757: (h, g, s) => {
      var p = s(7751), y = s(4901), m = s(1625), w = s(7040), k = Object;
      h.exports = w ? function(C) {
        return typeof C == "symbol";
      } : function(C) {
        var x = p("Symbol");
        return y(x) && m(x.prototype, k(C));
      };
    }, 2652: (h, g, s) => {
      var p = s(6080), y = s(9565), m = s(8551), w = s(6823), k = s(4209), C = s(6198), x = s(1625), E = s(81), P = s(851), L = s(9539), A = TypeError, R = function(M, z) {
        this.stopped = M, this.result = z;
      }, F = R.prototype;
      h.exports = function(M, z, H) {
        var V, D, N, G, $, Y, ae, oe = H && H.that, re = !(!H || !H.AS_ENTRIES), pe = !(!H || !H.IS_RECORD), fe = !(!H || !H.IS_ITERATOR), je = !(!H || !H.INTERRUPTED), Ee = p(z, oe), Se = function(Re) {
          return V && L(V, "normal", Re), new R(!0, Re);
        }, me = function(Re) {
          return re ? (m(Re), je ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : je ? Ee(Re, Se) : Ee(Re);
        };
        if (pe) V = M.iterator;
        else if (fe) V = M;
        else {
          if (!(D = P(M))) throw new A(w(M) + " is not iterable");
          if (k(D)) {
            for (N = 0, G = C(M); G > N; N++) if (($ = me(M[N])) && x(F, $)) return $;
            return new R(!1);
          }
          V = E(M, D);
        }
        for (Y = pe ? M.next : V.next; !(ae = y(Y, V)).done; ) {
          try {
            $ = me(ae.value);
          } catch (Re) {
            L(V, "throw", Re);
          }
          if (typeof $ == "object" && $ && x(F, $)) return $;
        }
        return new R(!1);
      };
    }, 9539: (h, g, s) => {
      var p = s(9565), y = s(8551), m = s(5966);
      h.exports = function(w, k, C) {
        var x, E;
        y(w);
        try {
          if (!(x = m(w, "return"))) {
            if (k === "throw") throw C;
            return C;
          }
          x = p(x, w);
        } catch (P) {
          E = !0, x = P;
        }
        if (k === "throw") throw C;
        if (E) throw x;
        return y(x), C;
      };
    }, 3994: (h, g, s) => {
      var p = s(7657).IteratorPrototype, y = s(2360), m = s(6980), w = s(687), k = s(6269), C = function() {
        return this;
      };
      h.exports = function(x, E, P, L) {
        var A = E + " Iterator";
        return x.prototype = y(p, { next: m(+!L, P) }), w(x, A, !1, !0), k[A] = C, x;
      };
    }, 1088: (h, g, s) => {
      var p = s(6518), y = s(9565), m = s(6395), w = s(350), k = s(4901), C = s(3994), x = s(2787), E = s(2967), P = s(687), L = s(6699), A = s(6840), R = s(8227), F = s(6269), M = s(7657), z = w.PROPER, H = w.CONFIGURABLE, V = M.IteratorPrototype, D = M.BUGGY_SAFARI_ITERATORS, N = R("iterator"), G = "keys", $ = "values", Y = "entries", ae = function() {
        return this;
      };
      h.exports = function(oe, re, pe, fe, je, Ee, Se) {
        C(pe, re, fe);
        var me, Re, Pe, Me = function(B) {
          if (B === je && Ue) return Ue;
          if (!D && B && B in Ve) return Ve[B];
          switch (B) {
            case G:
            case $:
            case Y:
              return function() {
                return new pe(this, B);
              };
          }
          return function() {
            return new pe(this);
          };
        }, Qe = re + " Iterator", rt = !1, Ve = oe.prototype, Te = Ve[N] || Ve["@@iterator"] || je && Ve[je], Ue = !D && Te || Me(je), T = re === "Array" && Ve.entries || Te;
        if (T && (me = x(T.call(new oe()))) !== Object.prototype && me.next && (m || x(me) === V || (E ? E(me, V) : k(me[N]) || A(me, N, ae)), P(me, Qe, !0, !0), m && (F[Qe] = ae)), z && je === $ && Te && Te.name !== $ && (!m && H ? L(Ve, "name", $) : (rt = !0, Ue = function() {
          return y(Te, this);
        })), je) if (Re = { values: Me($), keys: Ee ? Ue : Me(G), entries: Me(Y) }, Se) for (Pe in Re) (D || rt || !(Pe in Ve)) && A(Ve, Pe, Re[Pe]);
        else p({ target: re, proto: !0, forced: D || rt }, Re);
        return m && !Se || Ve[N] === Ue || A(Ve, N, Ue, { name: je }), F[re] = Ue, Re;
      };
    }, 7657: (h, g, s) => {
      var p, y, m, w = s(9039), k = s(4901), C = s(34), x = s(2360), E = s(2787), P = s(6840), L = s(8227), A = s(6395), R = L("iterator"), F = !1;
      [].keys && ("next" in (m = [].keys()) ? (y = E(E(m))) !== Object.prototype && (p = y) : F = !0), !C(p) || w(function() {
        var M = {};
        return p[R].call(M) !== M;
      }) ? p = {} : A && (p = x(p)), k(p[R]) || P(p, R, function() {
        return this;
      }), h.exports = { IteratorPrototype: p, BUGGY_SAFARI_ITERATORS: F };
    }, 6269: (h) => {
      h.exports = {};
    }, 6198: (h, g, s) => {
      var p = s(8014);
      h.exports = function(y) {
        return p(y.length);
      };
    }, 283: (h, g, s) => {
      var p = s(9504), y = s(9039), m = s(4901), w = s(9297), k = s(3724), C = s(350).CONFIGURABLE, x = s(3706), E = s(1181), P = E.enforce, L = E.get, A = String, R = Object.defineProperty, F = p("".slice), M = p("".replace), z = p([].join), H = k && !y(function() {
        return R(function() {
        }, "length", { value: 8 }).length !== 8;
      }), V = String(String).split("String"), D = h.exports = function(N, G, $) {
        F(A(G), 0, 7) === "Symbol(" && (G = "[" + M(A(G), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), $ && $.getter && (G = "get " + G), $ && $.setter && (G = "set " + G), (!w(N, "name") || C && N.name !== G) && (k ? R(N, "name", { value: G, configurable: !0 }) : N.name = G), H && $ && w($, "arity") && N.length !== $.arity && R(N, "length", { value: $.arity });
        try {
          $ && w($, "constructor") && $.constructor ? k && R(N, "prototype", { writable: !1 }) : N.prototype && (N.prototype = void 0);
        } catch {
        }
        var Y = P(N);
        return w(Y, "source") || (Y.source = z(V, typeof G == "string" ? G : "")), N;
      };
      Function.prototype.toString = D(function() {
        return m(this) && L(this).source || x(this);
      }, "toString");
    }, 741: (h) => {
      var g = Math.ceil, s = Math.floor;
      h.exports = Math.trunc || function(p) {
        var y = +p;
        return (y > 0 ? s : g)(y);
      };
    }, 1955: (h, g, s) => {
      var p, y, m, w, k, C = s(4475), x = s(3389), E = s(6080), P = s(9225).set, L = s(8265), A = s(8119), R = s(28), F = s(6765), M = s(9088), z = C.MutationObserver || C.WebKitMutationObserver, H = C.document, V = C.process, D = C.Promise, N = x("queueMicrotask");
      if (!N) {
        var G = new L(), $ = function() {
          var Y, ae;
          for (M && (Y = V.domain) && Y.exit(); ae = G.get(); ) try {
            ae();
          } catch (oe) {
            throw G.head && p(), oe;
          }
          Y && Y.enter();
        };
        A || M || F || !z || !H ? !R && D && D.resolve ? ((w = D.resolve(void 0)).constructor = D, k = E(w.then, w), p = function() {
          k($);
        }) : M ? p = function() {
          V.nextTick($);
        } : (P = E(P, C), p = function() {
          P($);
        }) : (y = !0, m = H.createTextNode(""), new z($).observe(m, { characterData: !0 }), p = function() {
          m.data = y = !y;
        }), N = function(Y) {
          G.head || p(), G.add(Y);
        };
      }
      h.exports = N;
    }, 6043: (h, g, s) => {
      var p = s(9306), y = TypeError, m = function(w) {
        var k, C;
        this.promise = new w(function(x, E) {
          if (k !== void 0 || C !== void 0) throw new y("Bad Promise constructor");
          k = x, C = E;
        }), this.resolve = p(k), this.reject = p(C);
      };
      h.exports.f = function(w) {
        return new m(w);
      };
    }, 5749: (h, g, s) => {
      var p = s(788), y = TypeError;
      h.exports = function(m) {
        if (p(m)) throw new y("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (h, g, s) => {
      var p = s(4475), y = s(9039), m = s(9504), w = s(655), k = s(3802).trim, C = s(7452), x = m("".charAt), E = p.parseFloat, P = p.Symbol, L = P && P.iterator, A = 1 / E(C + "-0") != -1 / 0 || L && !y(function() {
        E(Object(L));
      });
      h.exports = A ? function(R) {
        var F = k(w(R)), M = E(F);
        return M === 0 && x(F, 0) === "-" ? -0 : M;
      } : E;
    }, 2703: (h, g, s) => {
      var p = s(4475), y = s(9039), m = s(9504), w = s(655), k = s(3802).trim, C = s(7452), x = p.parseInt, E = p.Symbol, P = E && E.iterator, L = /^[+-]?0x/i, A = m(L.exec), R = x(C + "08") !== 8 || x(C + "0x16") !== 22 || P && !y(function() {
        x(Object(P));
      });
      h.exports = R ? function(F, M) {
        var z = k(w(F));
        return x(z, M >>> 0 || (A(L, z) ? 16 : 10));
      } : x;
    }, 4213: (h, g, s) => {
      var p = s(3724), y = s(9504), m = s(9565), w = s(9039), k = s(1072), C = s(3717), x = s(8773), E = s(8981), P = s(7055), L = Object.assign, A = Object.defineProperty, R = y([].concat);
      h.exports = !L || w(function() {
        if (p && L({ b: 1 }, L(A({}, "a", { enumerable: !0, get: function() {
          A(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var F = {}, M = {}, z = Symbol("assign detection"), H = "abcdefghijklmnopqrst";
        return F[z] = 7, H.split("").forEach(function(V) {
          M[V] = V;
        }), L({}, F)[z] !== 7 || k(L({}, M)).join("") !== H;
      }) ? function(F, M) {
        for (var z = E(F), H = arguments.length, V = 1, D = C.f, N = x.f; H > V; ) for (var G, $ = P(arguments[V++]), Y = D ? R(k($), D($)) : k($), ae = Y.length, oe = 0; ae > oe; ) G = Y[oe++], p && !m(N, $, G) || (z[G] = $[G]);
        return z;
      } : L;
    }, 2360: (h, g, s) => {
      var p, y = s(8551), m = s(6801), w = s(8727), k = s(421), C = s(397), x = s(4055), E = s(6119), P = "prototype", L = "script", A = E("IE_PROTO"), R = function() {
      }, F = function(H) {
        return "<" + L + ">" + H + "</" + L + ">";
      }, M = function(H) {
        H.write(F("")), H.close();
        var V = H.parentWindow.Object;
        return H = null, V;
      }, z = function() {
        try {
          p = new ActiveXObject("htmlfile");
        } catch {
        }
        var H, V, D;
        z = typeof document < "u" ? document.domain && p ? M(p) : (V = x("iframe"), D = "java" + L + ":", V.style.display = "none", C.appendChild(V), V.src = String(D), (H = V.contentWindow.document).open(), H.write(F("document.F=Object")), H.close(), H.F) : M(p);
        for (var N = w.length; N--; ) delete z[P][w[N]];
        return z();
      };
      k[A] = !0, h.exports = Object.create || function(H, V) {
        var D;
        return H !== null ? (R[P] = y(H), D = new R(), R[P] = null, D[A] = H) : D = z(), V === void 0 ? D : m.f(D, V);
      };
    }, 6801: (h, g, s) => {
      var p = s(3724), y = s(8686), m = s(4913), w = s(8551), k = s(5397), C = s(1072);
      g.f = p && !y ? Object.defineProperties : function(x, E) {
        w(x);
        for (var P, L = k(E), A = C(E), R = A.length, F = 0; R > F; ) m.f(x, P = A[F++], L[P]);
        return x;
      };
    }, 4913: (h, g, s) => {
      var p = s(3724), y = s(5917), m = s(8686), w = s(8551), k = s(6969), C = TypeError, x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, P = "enumerable", L = "configurable", A = "writable";
      g.f = p ? m ? function(R, F, M) {
        if (w(R), F = k(F), w(M), typeof R == "function" && F === "prototype" && "value" in M && A in M && !M[A]) {
          var z = E(R, F);
          z && z[A] && (R[F] = M.value, M = { configurable: L in M ? M[L] : z[L], enumerable: P in M ? M[P] : z[P], writable: !1 });
        }
        return x(R, F, M);
      } : x : function(R, F, M) {
        if (w(R), F = k(F), w(M), y) try {
          return x(R, F, M);
        } catch {
        }
        if ("get" in M || "set" in M) throw new C("Accessors not supported");
        return "value" in M && (R[F] = M.value), R;
      };
    }, 7347: (h, g, s) => {
      var p = s(3724), y = s(9565), m = s(8773), w = s(6980), k = s(5397), C = s(6969), x = s(9297), E = s(5917), P = Object.getOwnPropertyDescriptor;
      g.f = p ? P : function(L, A) {
        if (L = k(L), A = C(A), E) try {
          return P(L, A);
        } catch {
        }
        if (x(L, A)) return w(!y(m.f, L, A), L[A]);
      };
    }, 298: (h, g, s) => {
      var p = s(4576), y = s(5397), m = s(8480).f, w = s(7680), k = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      h.exports.f = function(C) {
        return k && p(C) === "Window" ? function(x) {
          try {
            return m(x);
          } catch {
            return w(k);
          }
        }(C) : m(y(C));
      };
    }, 8480: (h, g, s) => {
      var p = s(1828), y = s(8727).concat("length", "prototype");
      g.f = Object.getOwnPropertyNames || function(m) {
        return p(m, y);
      };
    }, 3717: (h, g) => {
      g.f = Object.getOwnPropertySymbols;
    }, 2787: (h, g, s) => {
      var p = s(9297), y = s(4901), m = s(8981), w = s(6119), k = s(2211), C = w("IE_PROTO"), x = Object, E = x.prototype;
      h.exports = k ? x.getPrototypeOf : function(P) {
        var L = m(P);
        if (p(L, C)) return L[C];
        var A = L.constructor;
        return y(A) && L instanceof A ? A.prototype : L instanceof x ? E : null;
      };
    }, 1625: (h, g, s) => {
      var p = s(9504);
      h.exports = p({}.isPrototypeOf);
    }, 1828: (h, g, s) => {
      var p = s(9504), y = s(9297), m = s(5397), w = s(9617).indexOf, k = s(421), C = p([].push);
      h.exports = function(x, E) {
        var P, L = m(x), A = 0, R = [];
        for (P in L) !y(k, P) && y(L, P) && C(R, P);
        for (; E.length > A; ) y(L, P = E[A++]) && (~w(R, P) || C(R, P));
        return R;
      };
    }, 1072: (h, g, s) => {
      var p = s(1828), y = s(8727);
      h.exports = Object.keys || function(m) {
        return p(m, y);
      };
    }, 8773: (h, g) => {
      var s = {}.propertyIsEnumerable, p = Object.getOwnPropertyDescriptor, y = p && !s.call({ 1: 2 }, 1);
      g.f = y ? function(m) {
        var w = p(this, m);
        return !!w && w.enumerable;
      } : s;
    }, 2967: (h, g, s) => {
      var p = s(6706), y = s(34), m = s(7750), w = s(3506);
      h.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var k, C = !1, x = {};
        try {
          (k = p(Object.prototype, "__proto__", "set"))(x, []), C = x instanceof Array;
        } catch {
        }
        return function(E, P) {
          return m(E), w(P), y(E) && (C ? k(E, P) : E.__proto__ = P), E;
        };
      }() : void 0);
    }, 2357: (h, g, s) => {
      var p = s(3724), y = s(9039), m = s(9504), w = s(2787), k = s(1072), C = s(5397), x = m(s(8773).f), E = m([].push), P = p && y(function() {
        var A = /* @__PURE__ */ Object.create(null);
        return A[2] = 2, !x(A, 2);
      }), L = function(A) {
        return function(R) {
          for (var F, M = C(R), z = k(M), H = P && w(M) === null, V = z.length, D = 0, N = []; V > D; ) F = z[D++], p && !(H ? F in M : x(M, F)) || E(N, A ? [F, M[F]] : M[F]);
          return N;
        };
      };
      h.exports = { entries: L(!0), values: L(!1) };
    }, 3179: (h, g, s) => {
      var p = s(2140), y = s(6955);
      h.exports = p ? {}.toString : function() {
        return "[object " + y(this) + "]";
      };
    }, 4270: (h, g, s) => {
      var p = s(9565), y = s(4901), m = s(34), w = TypeError;
      h.exports = function(k, C) {
        var x, E;
        if (C === "string" && y(x = k.toString) && !m(E = p(x, k)) || y(x = k.valueOf) && !m(E = p(x, k)) || C !== "string" && y(x = k.toString) && !m(E = p(x, k))) return E;
        throw new w("Can't convert object to primitive value");
      };
    }, 5031: (h, g, s) => {
      var p = s(7751), y = s(9504), m = s(8480), w = s(3717), k = s(8551), C = y([].concat);
      h.exports = p("Reflect", "ownKeys") || function(x) {
        var E = m.f(k(x)), P = w.f;
        return P ? C(E, P(x)) : E;
      };
    }, 9167: (h, g, s) => {
      var p = s(4475);
      h.exports = p;
    }, 1103: (h) => {
      h.exports = function(g) {
        try {
          return { error: !1, value: g() };
        } catch (s) {
          return { error: !0, value: s };
        }
      };
    }, 916: (h, g, s) => {
      var p = s(4475), y = s(550), m = s(4901), w = s(2796), k = s(3706), C = s(8227), x = s(7290), E = s(516), P = s(6395), L = s(7388), A = y && y.prototype, R = C("species"), F = !1, M = m(p.PromiseRejectionEvent), z = w("Promise", function() {
        var H = k(y), V = H !== String(y);
        if (!V && L === 66 || P && (!A.catch || !A.finally)) return !0;
        if (!L || L < 51 || !/native code/.test(H)) {
          var D = new y(function(G) {
            G(1);
          }), N = function(G) {
            G(function() {
            }, function() {
            });
          };
          if ((D.constructor = {})[R] = N, !(F = D.then(function() {
          }) instanceof N)) return !0;
        }
        return !V && (x || E) && !M;
      });
      h.exports = { CONSTRUCTOR: z, REJECTION_EVENT: M, SUBCLASSING: F };
    }, 550: (h, g, s) => {
      var p = s(4475);
      h.exports = p.Promise;
    }, 3438: (h, g, s) => {
      var p = s(8551), y = s(34), m = s(6043);
      h.exports = function(w, k) {
        if (p(w), y(k) && k.constructor === w) return k;
        var C = m.f(w);
        return (0, C.resolve)(k), C.promise;
      };
    }, 537: (h, g, s) => {
      var p = s(550), y = s(4428), m = s(916).CONSTRUCTOR;
      h.exports = m || !y(function(w) {
        p.all(w).then(void 0, function() {
        });
      });
    }, 1056: (h, g, s) => {
      var p = s(4913).f;
      h.exports = function(y, m, w) {
        w in y || p(y, w, { configurable: !0, get: function() {
          return m[w];
        }, set: function(k) {
          m[w] = k;
        } });
      };
    }, 8265: (h) => {
      var g = function() {
        this.head = null, this.tail = null;
      };
      g.prototype = { add: function(s) {
        var p = { item: s, next: null }, y = this.tail;
        y ? y.next = p : this.head = p, this.tail = p;
      }, get: function() {
        var s = this.head;
        if (s) return (this.head = s.next) === null && (this.tail = null), s.item;
      } }, h.exports = g;
    }, 6682: (h, g, s) => {
      var p = s(9565), y = s(8551), m = s(4901), w = s(4576), k = s(7323), C = TypeError;
      h.exports = function(x, E) {
        var P = x.exec;
        if (m(P)) {
          var L = p(P, x, E);
          return L !== null && y(L), L;
        }
        if (w(x) === "RegExp") return p(k, x, E);
        throw new C("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (h, g, s) => {
      var p, y, m = s(9565), w = s(9504), k = s(655), C = s(7979), x = s(8429), E = s(5745), P = s(2360), L = s(1181).get, A = s(3635), R = s(8814), F = E("native-string-replace", String.prototype.replace), M = RegExp.prototype.exec, z = M, H = w("".charAt), V = w("".indexOf), D = w("".replace), N = w("".slice), G = (y = /b*/g, m(M, p = /a/, "a"), m(M, y, "a"), p.lastIndex !== 0 || y.lastIndex !== 0), $ = x.BROKEN_CARET, Y = /()??/.exec("")[1] !== void 0;
      (G || Y || $ || A || R) && (z = function(ae) {
        var oe, re, pe, fe, je, Ee, Se, me = this, Re = L(me), Pe = k(ae), Me = Re.raw;
        if (Me) return Me.lastIndex = me.lastIndex, oe = m(z, Me, Pe), me.lastIndex = Me.lastIndex, oe;
        var Qe = Re.groups, rt = $ && me.sticky, Ve = m(C, me), Te = me.source, Ue = 0, T = Pe;
        if (rt && (Ve = D(Ve, "y", ""), V(Ve, "g") === -1 && (Ve += "g"), T = N(Pe, me.lastIndex), me.lastIndex > 0 && (!me.multiline || me.multiline && H(Pe, me.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", T = " " + T, Ue++), re = new RegExp("^(?:" + Te + ")", Ve)), Y && (re = new RegExp("^" + Te + "$(?!\\s)", Ve)), G && (pe = me.lastIndex), fe = m(M, rt ? re : me, T), rt ? fe ? (fe.input = N(fe.input, Ue), fe[0] = N(fe[0], Ue), fe.index = me.lastIndex, me.lastIndex += fe[0].length) : me.lastIndex = 0 : G && fe && (me.lastIndex = me.global ? fe.index + fe[0].length : pe), Y && fe && fe.length > 1 && m(F, fe[0], re, function() {
          for (je = 1; je < arguments.length - 2; je++) arguments[je] === void 0 && (fe[je] = void 0);
        }), fe && Qe) for (fe.groups = Ee = P(null), je = 0; je < Qe.length; je++) Ee[(Se = Qe[je])[0]] = fe[Se[1]];
        return fe;
      }), h.exports = z;
    }, 7979: (h, g, s) => {
      var p = s(8551);
      h.exports = function() {
        var y = p(this), m = "";
        return y.hasIndices && (m += "d"), y.global && (m += "g"), y.ignoreCase && (m += "i"), y.multiline && (m += "m"), y.dotAll && (m += "s"), y.unicode && (m += "u"), y.unicodeSets && (m += "v"), y.sticky && (m += "y"), m;
      };
    }, 1034: (h, g, s) => {
      var p = s(9565), y = s(9297), m = s(1625), w = s(7979), k = RegExp.prototype;
      h.exports = function(C) {
        var x = C.flags;
        return x !== void 0 || "flags" in k || y(C, "flags") || !m(k, C) ? x : p(w, C);
      };
    }, 8429: (h, g, s) => {
      var p = s(9039), y = s(4475).RegExp, m = p(function() {
        var C = y("a", "y");
        return C.lastIndex = 2, C.exec("abcd") !== null;
      }), w = m || p(function() {
        return !y("a", "y").sticky;
      }), k = m || p(function() {
        var C = y("^r", "gy");
        return C.lastIndex = 2, C.exec("str") !== null;
      });
      h.exports = { BROKEN_CARET: k, MISSED_STICKY: w, UNSUPPORTED_Y: m };
    }, 3635: (h, g, s) => {
      var p = s(9039), y = s(4475).RegExp;
      h.exports = p(function() {
        var m = y(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (h, g, s) => {
      var p = s(9039), y = s(4475).RegExp;
      h.exports = p(function() {
        var m = y("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (h, g, s) => {
      var p = s(4117), y = TypeError;
      h.exports = function(m) {
        if (p(m)) throw new y("Can't call method on " + m);
        return m;
      };
    }, 3389: (h, g, s) => {
      var p = s(4475), y = s(3724), m = Object.getOwnPropertyDescriptor;
      h.exports = function(w) {
        if (!y) return p[w];
        var k = m(p, w);
        return k && k.value;
      };
    }, 9472: (h, g, s) => {
      var p, y = s(4475), m = s(8745), w = s(4901), k = s(6763), C = s(9392), x = s(7680), E = s(2812), P = y.Function, L = /MSIE .\./.test(C) || k && ((p = y.Bun.version.split(".")).length < 3 || p[0] === "0" && (p[1] < 3 || p[1] === "3" && p[2] === "0"));
      h.exports = function(A, R) {
        var F = R ? 2 : 1;
        return L ? function(M, z) {
          var H = E(arguments.length, 1) > F, V = w(M) ? M : P(M), D = H ? x(arguments, F) : [], N = H ? function() {
            m(V, this, D);
          } : V;
          return R ? A(N, z) : A(N);
        } : A;
      };
    }, 7633: (h, g, s) => {
      var p = s(7751), y = s(2106), m = s(8227), w = s(3724), k = m("species");
      h.exports = function(C) {
        var x = p(C);
        w && x && !x[k] && y(x, k, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (h, g, s) => {
      var p = s(4913).f, y = s(9297), m = s(8227)("toStringTag");
      h.exports = function(w, k, C) {
        w && !C && (w = w.prototype), w && !y(w, m) && p(w, m, { configurable: !0, value: k });
      };
    }, 6119: (h, g, s) => {
      var p = s(5745), y = s(3392), m = p("keys");
      h.exports = function(w) {
        return m[w] || (m[w] = y(w));
      };
    }, 7629: (h, g, s) => {
      var p = s(6395), y = s(4475), m = s(9433), w = "__core-js_shared__", k = h.exports = y[w] || m(w, {});
      (k.versions || (k.versions = [])).push({ version: "3.36.1", mode: p ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (h, g, s) => {
      var p = s(7629);
      h.exports = function(y, m) {
        return p[y] || (p[y] = m || {});
      };
    }, 2293: (h, g, s) => {
      var p = s(8551), y = s(5548), m = s(4117), w = s(8227)("species");
      h.exports = function(k, C) {
        var x, E = p(k).constructor;
        return E === void 0 || m(x = p(E)[w]) ? C : y(x);
      };
    }, 8183: (h, g, s) => {
      var p = s(9504), y = s(1291), m = s(655), w = s(7750), k = p("".charAt), C = p("".charCodeAt), x = p("".slice), E = function(P) {
        return function(L, A) {
          var R, F, M = m(w(L)), z = y(A), H = M.length;
          return z < 0 || z >= H ? P ? "" : void 0 : (R = C(M, z)) < 55296 || R > 56319 || z + 1 === H || (F = C(M, z + 1)) < 56320 || F > 57343 ? P ? k(M, z) : R : P ? x(M, z, z + 2) : F - 56320 + (R - 55296 << 10) + 65536;
        };
      };
      h.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (h, g, s) => {
      var p = s(9504), y = s(8014), m = s(655), w = s(2333), k = s(7750), C = p(w), x = p("".slice), E = Math.ceil, P = function(L) {
        return function(A, R, F) {
          var M, z, H = m(k(A)), V = y(R), D = H.length, N = F === void 0 ? " " : m(F);
          return V <= D || N === "" ? H : ((z = C(N, E((M = V - D) / N.length))).length > M && (z = x(z, 0, M)), L ? H + z : z + H);
        };
      };
      h.exports = { start: P(!1), end: P(!0) };
    }, 2333: (h, g, s) => {
      var p = s(1291), y = s(655), m = s(7750), w = RangeError;
      h.exports = function(k) {
        var C = y(m(this)), x = "", E = p(k);
        if (E < 0 || E === 1 / 0) throw new w("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (C += C)) 1 & E && (x += C);
        return x;
      };
    }, 706: (h, g, s) => {
      var p = s(350).PROPER, y = s(9039), m = s(7452);
      h.exports = function(w) {
        return y(function() {
          return !!m[w]() || "​᠎"[w]() !== "​᠎" || p && m[w].name !== w;
        });
      };
    }, 3802: (h, g, s) => {
      var p = s(9504), y = s(7750), m = s(655), w = s(7452), k = p("".replace), C = RegExp("^[" + w + "]+"), x = RegExp("(^|[^" + w + "])[" + w + "]+$"), E = function(P) {
        return function(L) {
          var A = m(y(L));
          return 1 & P && (A = k(A, C, "")), 2 & P && (A = k(A, x, "$1")), A;
        };
      };
      h.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (h, g, s) => {
      var p = s(7388), y = s(9039), m = s(4475).String;
      h.exports = !!Object.getOwnPropertySymbols && !y(function() {
        var w = Symbol("symbol detection");
        return !m(w) || !(Object(w) instanceof Symbol) || !Symbol.sham && p && p < 41;
      });
    }, 8242: (h, g, s) => {
      var p = s(9565), y = s(7751), m = s(8227), w = s(6840);
      h.exports = function() {
        var k = y("Symbol"), C = k && k.prototype, x = C && C.valueOf, E = m("toPrimitive");
        C && !C[E] && w(C, E, function(P) {
          return p(x, this);
        }, { arity: 1 });
      };
    }, 1296: (h, g, s) => {
      var p = s(4495);
      h.exports = p && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (h, g, s) => {
      var p, y, m, w, k = s(4475), C = s(8745), x = s(6080), E = s(4901), P = s(9297), L = s(9039), A = s(397), R = s(7680), F = s(4055), M = s(2812), z = s(8119), H = s(9088), V = k.setImmediate, D = k.clearImmediate, N = k.process, G = k.Dispatch, $ = k.Function, Y = k.MessageChannel, ae = k.String, oe = 0, re = {}, pe = "onreadystatechange";
      L(function() {
        p = k.location;
      });
      var fe = function(me) {
        if (P(re, me)) {
          var Re = re[me];
          delete re[me], Re();
        }
      }, je = function(me) {
        return function() {
          fe(me);
        };
      }, Ee = function(me) {
        fe(me.data);
      }, Se = function(me) {
        k.postMessage(ae(me), p.protocol + "//" + p.host);
      };
      V && D || (V = function(me) {
        M(arguments.length, 1);
        var Re = E(me) ? me : $(me), Pe = R(arguments, 1);
        return re[++oe] = function() {
          C(Re, void 0, Pe);
        }, y(oe), oe;
      }, D = function(me) {
        delete re[me];
      }, H ? y = function(me) {
        N.nextTick(je(me));
      } : G && G.now ? y = function(me) {
        G.now(je(me));
      } : Y && !z ? (w = (m = new Y()).port2, m.port1.onmessage = Ee, y = x(w.postMessage, w)) : k.addEventListener && E(k.postMessage) && !k.importScripts && p && p.protocol !== "file:" && !L(Se) ? (y = Se, k.addEventListener("message", Ee, !1)) : y = pe in F("script") ? function(me) {
        A.appendChild(F("script"))[pe] = function() {
          A.removeChild(this), fe(me);
        };
      } : function(me) {
        setTimeout(je(me), 0);
      }), h.exports = { set: V, clear: D };
    }, 1240: (h, g, s) => {
      var p = s(9504);
      h.exports = p(1 .valueOf);
    }, 5610: (h, g, s) => {
      var p = s(1291), y = Math.max, m = Math.min;
      h.exports = function(w, k) {
        var C = p(w);
        return C < 0 ? y(C + k, 0) : m(C, k);
      };
    }, 5397: (h, g, s) => {
      var p = s(7055), y = s(7750);
      h.exports = function(m) {
        return p(y(m));
      };
    }, 1291: (h, g, s) => {
      var p = s(741);
      h.exports = function(y) {
        var m = +y;
        return m != m || m === 0 ? 0 : p(m);
      };
    }, 8014: (h, g, s) => {
      var p = s(1291), y = Math.min;
      h.exports = function(m) {
        var w = p(m);
        return w > 0 ? y(w, 9007199254740991) : 0;
      };
    }, 8981: (h, g, s) => {
      var p = s(7750), y = Object;
      h.exports = function(m) {
        return y(p(m));
      };
    }, 2777: (h, g, s) => {
      var p = s(9565), y = s(34), m = s(757), w = s(5966), k = s(4270), C = s(8227), x = TypeError, E = C("toPrimitive");
      h.exports = function(P, L) {
        if (!y(P) || m(P)) return P;
        var A, R = w(P, E);
        if (R) {
          if (L === void 0 && (L = "default"), A = p(R, P, L), !y(A) || m(A)) return A;
          throw new x("Can't convert object to primitive value");
        }
        return L === void 0 && (L = "number"), k(P, L);
      };
    }, 6969: (h, g, s) => {
      var p = s(2777), y = s(757);
      h.exports = function(m) {
        var w = p(m, "string");
        return y(w) ? w : w + "";
      };
    }, 2140: (h, g, s) => {
      var p = {};
      p[s(8227)("toStringTag")] = "z", h.exports = String(p) === "[object z]";
    }, 655: (h, g, s) => {
      var p = s(6955), y = String;
      h.exports = function(m) {
        if (p(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return y(m);
      };
    }, 6823: (h) => {
      var g = String;
      h.exports = function(s) {
        try {
          return g(s);
        } catch {
          return "Object";
        }
      };
    }, 3392: (h, g, s) => {
      var p = s(9504), y = 0, m = Math.random(), w = p(1 .toString);
      h.exports = function(k) {
        return "Symbol(" + (k === void 0 ? "" : k) + ")_" + w(++y + m, 36);
      };
    }, 7040: (h, g, s) => {
      var p = s(4495);
      h.exports = p && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (h, g, s) => {
      var p = s(3724), y = s(9039);
      h.exports = p && y(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (h) => {
      var g = TypeError;
      h.exports = function(s, p) {
        if (s < p) throw new g("Not enough arguments");
        return s;
      };
    }, 8622: (h, g, s) => {
      var p = s(4475), y = s(4901), m = p.WeakMap;
      h.exports = y(m) && /native code/.test(String(m));
    }, 511: (h, g, s) => {
      var p = s(9167), y = s(9297), m = s(1951), w = s(4913).f;
      h.exports = function(k) {
        var C = p.Symbol || (p.Symbol = {});
        y(C, k) || w(C, k, { value: m.f(k) });
      };
    }, 1951: (h, g, s) => {
      var p = s(8227);
      g.f = p;
    }, 8227: (h, g, s) => {
      var p = s(4475), y = s(5745), m = s(9297), w = s(3392), k = s(4495), C = s(7040), x = p.Symbol, E = y("wks"), P = C ? x.for || x : x && x.withoutSetter || w;
      h.exports = function(L) {
        return m(E, L) || (E[L] = k && m(x, L) ? x[L] : P("Symbol." + L)), E[L];
      };
    }, 7452: (h) => {
      h.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (h, g, s) => {
      var p = s(6518), y = s(9039), m = s(4376), w = s(34), k = s(8981), C = s(6198), x = s(6837), E = s(4659), P = s(1469), L = s(597), A = s(8227), R = s(7388), F = A("isConcatSpreadable"), M = R >= 51 || !y(function() {
        var H = [];
        return H[F] = !1, H.concat()[0] !== H;
      }), z = function(H) {
        if (!w(H)) return !1;
        var V = H[F];
        return V !== void 0 ? !!V : m(H);
      };
      p({ target: "Array", proto: !0, arity: 1, forced: !M || !L("concat") }, { concat: function(H) {
        var V, D, N, G, $, Y = k(this), ae = P(Y, 0), oe = 0;
        for (V = -1, N = arguments.length; V < N; V++) if (z($ = V === -1 ? Y : arguments[V])) for (G = C($), x(oe + G), D = 0; D < G; D++, oe++) D in $ && E(ae, oe, $[D]);
        else x(oe + 1), E(ae, oe++, $);
        return ae.length = oe, ae;
      } });
    }, 8431: (h, g, s) => {
      var p = s(6518), y = s(9213).every;
      p({ target: "Array", proto: !0, forced: !s(4598)("every") }, { every: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (h, g, s) => {
      var p = s(6518), y = s(9213).filter;
      p({ target: "Array", proto: !0, forced: !s(597)("filter") }, { filter: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (h, g, s) => {
      var p = s(6518), y = s(9213).find, m = s(6469), w = "find", k = !0;
      w in [] && Array(1)[w](function() {
        k = !1;
      }), p({ target: "Array", proto: !0, forced: k }, { find: function(C) {
        return y(this, C, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(w);
    }, 1629: (h, g, s) => {
      var p = s(6518), y = s(235);
      p({ target: "Array", proto: !0, forced: [].forEach !== y }, { forEach: y });
    }, 3418: (h, g, s) => {
      var p = s(6518), y = s(7916);
      p({ target: "Array", stat: !0, forced: !s(4428)(function(m) {
        Array.from(m);
      }) }, { from: y });
    }, 4423: (h, g, s) => {
      var p = s(6518), y = s(9617).includes, m = s(9039), w = s(6469);
      p({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(k) {
        return y(this, k, arguments.length > 1 ? arguments[1] : void 0);
      } }), w("includes");
    }, 5276: (h, g, s) => {
      var p = s(6518), y = s(7476), m = s(9617).indexOf, w = s(4598), k = y([].indexOf), C = !!k && 1 / k([1], 1, -0) < 0;
      p({ target: "Array", proto: !0, forced: C || !w("indexOf") }, { indexOf: function(x) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return C ? k(this, x, E) || 0 : m(this, x, E);
      } });
    }, 4346: (h, g, s) => {
      s(6518)({ target: "Array", stat: !0 }, { isArray: s(4376) });
    }, 3792: (h, g, s) => {
      var p = s(5397), y = s(6469), m = s(6269), w = s(1181), k = s(4913).f, C = s(1088), x = s(2529), E = s(6395), P = s(3724), L = "Array Iterator", A = w.set, R = w.getterFor(L);
      h.exports = C(Array, "Array", function(M, z) {
        A(this, { type: L, target: p(M), index: 0, kind: z });
      }, function() {
        var M = R(this), z = M.target, H = M.index++;
        if (!z || H >= z.length) return M.target = void 0, x(void 0, !0);
        switch (M.kind) {
          case "keys":
            return x(H, !1);
          case "values":
            return x(z[H], !1);
        }
        return x([H, z[H]], !1);
      }, "values");
      var F = m.Arguments = m.Array;
      if (y("keys"), y("values"), y("entries"), !E && P && F.name !== "values") try {
        k(F, "name", { value: "values" });
      } catch {
      }
    }, 8598: (h, g, s) => {
      var p = s(6518), y = s(9504), m = s(7055), w = s(5397), k = s(4598), C = y([].join);
      p({ target: "Array", proto: !0, forced: m !== Object || !k("join", ",") }, { join: function(x) {
        return C(w(this), x === void 0 ? "," : x);
      } });
    }, 2062: (h, g, s) => {
      var p = s(6518), y = s(9213).map;
      p({ target: "Array", proto: !0, forced: !s(597)("map") }, { map: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (h, g, s) => {
      var p = s(6518), y = s(926).left, m = s(4598), w = s(7388);
      p({ target: "Array", proto: !0, forced: !s(9088) && w > 79 && w < 83 || !m("reduce") }, { reduce: function(k) {
        var C = arguments.length;
        return y(this, k, C, C > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (h, g, s) => {
      var p = s(6518), y = s(9504), m = s(4376), w = y([].reverse), k = [1, 2];
      p({ target: "Array", proto: !0, forced: String(k) === String(k.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), w(this);
      } });
    }, 4782: (h, g, s) => {
      var p = s(6518), y = s(4376), m = s(3517), w = s(34), k = s(5610), C = s(6198), x = s(5397), E = s(4659), P = s(8227), L = s(597), A = s(7680), R = L("slice"), F = P("species"), M = Array, z = Math.max;
      p({ target: "Array", proto: !0, forced: !R }, { slice: function(H, V) {
        var D, N, G, $ = x(this), Y = C($), ae = k(H, Y), oe = k(V === void 0 ? Y : V, Y);
        if (y($) && (D = $.constructor, (m(D) && (D === M || y(D.prototype)) || w(D) && (D = D[F]) === null) && (D = void 0), D === M || D === void 0)) return A($, ae, oe);
        for (N = new (D === void 0 ? M : D)(z(oe - ae, 0)), G = 0; ae < oe; ae++, G++) ae in $ && E(N, G, $[ae]);
        return N.length = G, N;
      } });
    }, 5086: (h, g, s) => {
      var p = s(6518), y = s(9213).some;
      p({ target: "Array", proto: !0, forced: !s(4598)("some") }, { some: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (h, g, s) => {
      var p = s(6518), y = s(9504), m = s(9306), w = s(8981), k = s(6198), C = s(4606), x = s(655), E = s(9039), P = s(4488), L = s(4598), A = s(8834), R = s(3202), F = s(7388), M = s(9160), z = [], H = y(z.sort), V = y(z.push), D = E(function() {
        z.sort(void 0);
      }), N = E(function() {
        z.sort(null);
      }), G = L("sort"), $ = !E(function() {
        if (F) return F < 70;
        if (!(A && A > 3)) {
          if (R) return !0;
          if (M) return M < 603;
          var Y, ae, oe, re, pe = "";
          for (Y = 65; Y < 76; Y++) {
            switch (ae = String.fromCharCode(Y), Y) {
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
            for (re = 0; re < 47; re++) z.push({ k: ae + re, v: oe });
          }
          for (z.sort(function(fe, je) {
            return je.v - fe.v;
          }), re = 0; re < z.length; re++) ae = z[re].k.charAt(0), pe.charAt(pe.length - 1) !== ae && (pe += ae);
          return pe !== "DGBEFHACIJK";
        }
      });
      p({ target: "Array", proto: !0, forced: D || !N || !G || !$ }, { sort: function(Y) {
        Y !== void 0 && m(Y);
        var ae = w(this);
        if ($) return Y === void 0 ? H(ae) : H(ae, Y);
        var oe, re, pe = [], fe = k(ae);
        for (re = 0; re < fe; re++) re in ae && V(pe, ae[re]);
        for (P(pe, /* @__PURE__ */ function(je) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : je !== void 0 ? +je(Ee, Se) || 0 : x(Ee) > x(Se) ? 1 : -1;
          };
        }(Y)), oe = k(pe), re = 0; re < oe; ) ae[re] = pe[re++];
        for (; re < fe; ) C(ae, re++);
        return ae;
      } });
    }, 4554: (h, g, s) => {
      var p = s(6518), y = s(8981), m = s(5610), w = s(1291), k = s(6198), C = s(4527), x = s(6837), E = s(1469), P = s(4659), L = s(4606), A = s(597)("splice"), R = Math.max, F = Math.min;
      p({ target: "Array", proto: !0, forced: !A }, { splice: function(M, z) {
        var H, V, D, N, G, $, Y = y(this), ae = k(Y), oe = m(M, ae), re = arguments.length;
        for (re === 0 ? H = V = 0 : re === 1 ? (H = 0, V = ae - oe) : (H = re - 2, V = F(R(w(z), 0), ae - oe)), x(ae + H - V), D = E(Y, V), N = 0; N < V; N++) (G = oe + N) in Y && P(D, N, Y[G]);
        if (D.length = V, H < V) {
          for (N = oe; N < ae - V; N++) $ = N + H, (G = N + V) in Y ? Y[$] = Y[G] : L(Y, $);
          for (N = ae; N > ae - V + H; N--) L(Y, N - 1);
        } else if (H > V) for (N = ae - V; N > oe; N--) $ = N + H - 1, (G = N + V - 1) in Y ? Y[$] = Y[G] : L(Y, $);
        for (N = 0; N < H; N++) Y[N + oe] = arguments[N + 2];
        return C(Y, ae - V + H), D;
      } });
    }, 1688: (h, g, s) => {
      var p = s(6518), y = s(380);
      p({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== y }, { toISOString: y });
    }, 739: (h, g, s) => {
      var p = s(6518), y = s(9039), m = s(8981), w = s(2777);
      p({ target: "Date", proto: !0, arity: 1, forced: y(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(k) {
        var C = m(this), x = w(C, "number");
        return typeof x != "number" || isFinite(x) ? C.toISOString() : null;
      } });
    }, 9572: (h, g, s) => {
      var p = s(9297), y = s(6840), m = s(3640), w = s(8227)("toPrimitive"), k = Date.prototype;
      p(k, w) || y(k, w, m);
    }, 3288: (h, g, s) => {
      var p = s(9504), y = s(6840), m = Date.prototype, w = "Invalid Date", k = "toString", C = p(m[k]), x = p(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== w && y(m, k, function() {
        var E = x(this);
        return E == E ? C(this) : w;
      });
    }, 4170: (h, g, s) => {
      var p = s(6518), y = s(566);
      p({ target: "Function", proto: !0, forced: Function.bind !== y }, { bind: y });
    }, 2010: (h, g, s) => {
      var p = s(3724), y = s(350).EXISTS, m = s(9504), w = s(2106), k = Function.prototype, C = m(k.toString), x = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = m(x.exec);
      p && !y && w(k, "name", { configurable: !0, get: function() {
        try {
          return E(x, C(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (h, g, s) => {
      var p = s(6518), y = s(7751), m = s(8745), w = s(9565), k = s(9504), C = s(9039), x = s(4901), E = s(757), P = s(7680), L = s(6933), A = s(4495), R = String, F = y("JSON", "stringify"), M = k(/./.exec), z = k("".charAt), H = k("".charCodeAt), V = k("".replace), D = k(1 .toString), N = /[\uD800-\uDFFF]/g, G = /^[\uD800-\uDBFF]$/, $ = /^[\uDC00-\uDFFF]$/, Y = !A || C(function() {
        var pe = y("Symbol")("stringify detection");
        return F([pe]) !== "[null]" || F({ a: pe }) !== "{}" || F(Object(pe)) !== "{}";
      }), ae = C(function() {
        return F("\uDF06\uD834") !== '"\\udf06\\ud834"' || F("\uDEAD") !== '"\\udead"';
      }), oe = function(pe, fe) {
        var je = P(arguments), Ee = L(fe);
        if (x(Ee) || pe !== void 0 && !E(pe)) return je[1] = function(Se, me) {
          if (x(Ee) && (me = w(Ee, this, R(Se), me)), !E(me)) return me;
        }, m(F, null, je);
      }, re = function(pe, fe, je) {
        var Ee = z(je, fe - 1), Se = z(je, fe + 1);
        return M(G, pe) && !M($, Se) || M($, pe) && !M(G, Ee) ? "\\u" + D(H(pe, 0), 16) : pe;
      };
      F && p({ target: "JSON", stat: !0, arity: 3, forced: Y || ae }, { stringify: function(pe, fe, je) {
        var Ee = P(arguments), Se = m(Y ? oe : F, null, Ee);
        return ae && typeof Se == "string" ? V(Se, N, re) : Se;
      } });
    }, 4731: (h, g, s) => {
      var p = s(4475);
      s(687)(p.JSON, "JSON", !0);
    }, 479: (h, g, s) => {
      s(687)(Math, "Math", !0);
    }, 2892: (h, g, s) => {
      var p = s(6518), y = s(6395), m = s(3724), w = s(4475), k = s(9167), C = s(9504), x = s(2796), E = s(9297), P = s(3167), L = s(1625), A = s(757), R = s(2777), F = s(9039), M = s(8480).f, z = s(7347).f, H = s(4913).f, V = s(1240), D = s(3802).trim, N = "Number", G = w[N], $ = k[N], Y = G.prototype, ae = w.TypeError, oe = C("".slice), re = C("".charCodeAt), pe = x(N, !G(" 0o1") || !G("0b1") || G("+0x1")), fe = function(Ee) {
        var Se, me = arguments.length < 1 ? 0 : G(function(Re) {
          var Pe = R(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(Me) {
            var Qe, rt, Ve, Te, Ue, T, B, K, Q = R(Me, "number");
            if (A(Q)) throw new ae("Cannot convert a Symbol value to a number");
            if (typeof Q == "string" && Q.length > 2) {
              if (Q = D(Q), (Qe = re(Q, 0)) === 43 || Qe === 45) {
                if ((rt = re(Q, 2)) === 88 || rt === 120) return NaN;
              } else if (Qe === 48) {
                switch (re(Q, 1)) {
                  case 66:
                  case 98:
                    Ve = 2, Te = 49;
                    break;
                  case 79:
                  case 111:
                    Ve = 8, Te = 55;
                    break;
                  default:
                    return +Q;
                }
                for (T = (Ue = oe(Q, 2)).length, B = 0; B < T; B++) if ((K = re(Ue, B)) < 48 || K > Te) return NaN;
                return parseInt(Ue, Ve);
              }
            }
            return +Q;
          }(Pe);
        }(Ee));
        return L(Y, Se = this) && F(function() {
          V(Se);
        }) ? P(Object(me), this, fe) : me;
      };
      fe.prototype = Y, pe && !y && (Y.constructor = fe), p({ global: !0, constructor: !0, wrap: !0, forced: pe }, { Number: fe });
      var je = function(Ee, Se) {
        for (var me, Re = m ? M(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, me = Re[Pe]) && !E(Ee, me) && H(Ee, me, z(Se, me));
      };
      y && $ && je(k[N], $), (pe || y) && je(k[N], G);
    }, 9868: (h, g, s) => {
      var p = s(6518), y = s(9504), m = s(1291), w = s(1240), k = s(2333), C = s(9039), x = RangeError, E = String, P = Math.floor, L = y(k), A = y("".slice), R = y(1 .toFixed), F = function(V, D, N) {
        return D === 0 ? N : D % 2 == 1 ? F(V, D - 1, N * V) : F(V * V, D / 2, N);
      }, M = function(V, D, N) {
        for (var G = -1, $ = N; ++G < 6; ) $ += D * V[G], V[G] = $ % 1e7, $ = P($ / 1e7);
      }, z = function(V, D) {
        for (var N = 6, G = 0; --N >= 0; ) G += V[N], V[N] = P(G / D), G = G % D * 1e7;
      }, H = function(V) {
        for (var D = 6, N = ""; --D >= 0; ) if (N !== "" || D === 0 || V[D] !== 0) {
          var G = E(V[D]);
          N = N === "" ? G : N + L("0", 7 - G.length) + G;
        }
        return N;
      };
      p({ target: "Number", proto: !0, forced: C(function() {
        return R(8e-5, 3) !== "0.000" || R(0.9, 0) !== "1" || R(1.255, 2) !== "1.25" || R(1000000000000000100, 0) !== "1000000000000000128";
      }) || !C(function() {
        R({});
      }) }, { toFixed: function(V) {
        var D, N, G, $, Y = w(this), ae = m(V), oe = [0, 0, 0, 0, 0, 0], re = "", pe = "0";
        if (ae < 0 || ae > 20) throw new x("Incorrect fraction digits");
        if (Y != Y) return "NaN";
        if (Y <= -1e21 || Y >= 1e21) return E(Y);
        if (Y < 0 && (re = "-", Y = -Y), Y > 1e-21) if (N = (D = function(fe) {
          for (var je = 0, Ee = fe; Ee >= 4096; ) je += 12, Ee /= 4096;
          for (; Ee >= 2; ) je += 1, Ee /= 2;
          return je;
        }(Y * F(2, 69, 1)) - 69) < 0 ? Y * F(2, -D, 1) : Y / F(2, D, 1), N *= 4503599627370496, (D = 52 - D) > 0) {
          for (M(oe, 0, N), G = ae; G >= 7; ) M(oe, 1e7, 0), G -= 7;
          for (M(oe, F(10, G, 1), 0), G = D - 1; G >= 23; ) z(oe, 8388608), G -= 23;
          z(oe, 1 << G), M(oe, 1, 1), z(oe, 2), pe = H(oe);
        } else M(oe, 0, N), M(oe, 1 << -D, 0), pe = H(oe) + L("0", ae);
        return ae > 0 ? re + (($ = pe.length) <= ae ? "0." + L("0", ae - $) + pe : A(pe, 0, $ - ae) + "." + A(pe, $ - ae)) : re + pe;
      } });
    }, 9085: (h, g, s) => {
      var p = s(6518), y = s(4213);
      p({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== y }, { assign: y });
    }, 9904: (h, g, s) => {
      s(6518)({ target: "Object", stat: !0, sham: !s(3724) }, { create: s(2360) });
    }, 7945: (h, g, s) => {
      var p = s(6518), y = s(3724), m = s(6801).f;
      p({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !y }, { defineProperties: m });
    }, 4185: (h, g, s) => {
      var p = s(6518), y = s(3724), m = s(4913).f;
      p({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !y }, { defineProperty: m });
    }, 5506: (h, g, s) => {
      var p = s(6518), y = s(2357).entries;
      p({ target: "Object", stat: !0 }, { entries: function(m) {
        return y(m);
      } });
    }, 3851: (h, g, s) => {
      var p = s(6518), y = s(9039), m = s(5397), w = s(7347).f, k = s(3724);
      p({ target: "Object", stat: !0, forced: !k || y(function() {
        w(1);
      }), sham: !k }, { getOwnPropertyDescriptor: function(C, x) {
        return w(m(C), x);
      } });
    }, 1278: (h, g, s) => {
      var p = s(6518), y = s(3724), m = s(5031), w = s(5397), k = s(7347), C = s(4659);
      p({ target: "Object", stat: !0, sham: !y }, { getOwnPropertyDescriptors: function(x) {
        for (var E, P, L = w(x), A = k.f, R = m(L), F = {}, M = 0; R.length > M; ) (P = A(L, E = R[M++])) !== void 0 && C(F, E, P);
        return F;
      } });
    }, 9773: (h, g, s) => {
      var p = s(6518), y = s(4495), m = s(9039), w = s(3717), k = s(8981);
      p({ target: "Object", stat: !0, forced: !y || m(function() {
        w.f(1);
      }) }, { getOwnPropertySymbols: function(C) {
        var x = w.f;
        return x ? x(k(C)) : [];
      } });
    }, 875: (h, g, s) => {
      var p = s(6518), y = s(9039), m = s(8981), w = s(2787), k = s(2211);
      p({ target: "Object", stat: !0, forced: y(function() {
        w(1);
      }), sham: !k }, { getPrototypeOf: function(C) {
        return w(m(C));
      } });
    }, 9432: (h, g, s) => {
      var p = s(6518), y = s(8981), m = s(1072);
      p({ target: "Object", stat: !0, forced: s(9039)(function() {
        m(1);
      }) }, { keys: function(w) {
        return m(y(w));
      } });
    }, 287: (h, g, s) => {
      s(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: s(2967) });
    }, 6099: (h, g, s) => {
      var p = s(2140), y = s(6840), m = s(3179);
      p || y(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (h, g, s) => {
      var p = s(6518), y = s(2357).values;
      p({ target: "Object", stat: !0 }, { values: function(m) {
        return y(m);
      } });
    }, 8459: (h, g, s) => {
      var p = s(6518), y = s(3904);
      p({ global: !0, forced: parseFloat !== y }, { parseFloat: y });
    }, 8940: (h, g, s) => {
      var p = s(6518), y = s(2703);
      p({ global: !0, forced: parseInt !== y }, { parseInt: y });
    }, 6499: (h, g, s) => {
      var p = s(6518), y = s(9565), m = s(9306), w = s(6043), k = s(1103), C = s(2652);
      p({ target: "Promise", stat: !0, forced: s(537) }, { all: function(x) {
        var E = this, P = w.f(E), L = P.resolve, A = P.reject, R = k(function() {
          var F = m(E.resolve), M = [], z = 0, H = 1;
          C(x, function(V) {
            var D = z++, N = !1;
            H++, y(F, E, V).then(function(G) {
              N || (N = !0, M[D] = G, --H || L(M));
            }, A);
          }), --H || L(M);
        });
        return R.error && A(R.value), P.promise;
      } });
    }, 2003: (h, g, s) => {
      var p = s(6518), y = s(6395), m = s(916).CONSTRUCTOR, w = s(550), k = s(7751), C = s(4901), x = s(6840), E = w && w.prototype;
      if (p({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(L) {
        return this.then(void 0, L);
      } }), !y && C(w)) {
        var P = k("Promise").prototype.catch;
        E.catch !== P && x(E, "catch", P, { unsafe: !0 });
      }
    }, 436: (h, g, s) => {
      var p, y, m, w = s(6518), k = s(6395), C = s(9088), x = s(4475), E = s(9565), P = s(6840), L = s(2967), A = s(687), R = s(7633), F = s(9306), M = s(4901), z = s(34), H = s(679), V = s(2293), D = s(9225).set, N = s(1955), G = s(3138), $ = s(1103), Y = s(8265), ae = s(1181), oe = s(550), re = s(916), pe = s(6043), fe = "Promise", je = re.CONSTRUCTOR, Ee = re.REJECTION_EVENT, Se = re.SUBCLASSING, me = ae.getterFor(fe), Re = ae.set, Pe = oe && oe.prototype, Me = oe, Qe = Pe, rt = x.TypeError, Ve = x.document, Te = x.process, Ue = pe.f, T = Ue, B = !!(Ve && Ve.createEvent && x.dispatchEvent), K = "unhandledrejection", Q = function(ne) {
        var le;
        return !(!z(ne) || !M(le = ne.then)) && le;
      }, X = function(ne, le) {
        var ce, Oe, Ae, ze = le.value, it = le.state === 1, dt = it ? ne.ok : ne.fail, yt = ne.resolve, mt = ne.reject, Ke = ne.domain;
        try {
          dt ? (it || (le.rejection === 2 && ie(le), le.rejection = 1), dt === !0 ? ce = ze : (Ke && Ke.enter(), ce = dt(ze), Ke && (Ke.exit(), Ae = !0)), ce === ne.promise ? mt(new rt("Promise-chain cycle")) : (Oe = Q(ce)) ? E(Oe, ce, yt, mt) : yt(ce)) : mt(ze);
        } catch (Ye) {
          Ke && !Ae && Ke.exit(), mt(Ye);
        }
      }, ee = function(ne, le) {
        ne.notified || (ne.notified = !0, N(function() {
          for (var ce, Oe = ne.reactions; ce = Oe.get(); ) X(ce, ne);
          ne.notified = !1, le && !ne.rejection && he(ne);
        }));
      }, de = function(ne, le, ce) {
        var Oe, Ae;
        B ? ((Oe = Ve.createEvent("Event")).promise = le, Oe.reason = ce, Oe.initEvent(ne, !1, !0), x.dispatchEvent(Oe)) : Oe = { promise: le, reason: ce }, !Ee && (Ae = x["on" + ne]) ? Ae(Oe) : ne === K && G("Unhandled promise rejection", ce);
      }, he = function(ne) {
        E(D, x, function() {
          var le, ce = ne.facade, Oe = ne.value;
          if (ue(ne) && (le = $(function() {
            C ? Te.emit("unhandledRejection", Oe, ce) : de(K, ce, Oe);
          }), ne.rejection = C || ue(ne) ? 2 : 1, le.error)) throw le.value;
        });
      }, ue = function(ne) {
        return ne.rejection !== 1 && !ne.parent;
      }, ie = function(ne) {
        E(D, x, function() {
          var le = ne.facade;
          C ? Te.emit("rejectionHandled", le) : de("rejectionhandled", le, ne.value);
        });
      }, ke = function(ne, le, ce) {
        return function(Oe) {
          ne(le, Oe, ce);
        };
      }, be = function(ne, le, ce) {
        ne.done || (ne.done = !0, ce && (ne = ce), ne.value = le, ne.state = 2, ee(ne, !0));
      }, Ce = function(ne, le, ce) {
        if (!ne.done) {
          ne.done = !0, ce && (ne = ce);
          try {
            if (ne.facade === le) throw new rt("Promise can't be resolved itself");
            var Oe = Q(le);
            Oe ? N(function() {
              var Ae = { done: !1 };
              try {
                E(Oe, le, ke(Ce, Ae, ne), ke(be, Ae, ne));
              } catch (ze) {
                be(Ae, ze, ne);
              }
            }) : (ne.value = le, ne.state = 1, ee(ne, !1));
          } catch (Ae) {
            be({ done: !1 }, Ae, ne);
          }
        }
      };
      if (je && (Qe = (Me = function(ne) {
        H(this, Qe), F(ne), E(p, this);
        var le = me(this);
        try {
          ne(ke(Ce, le), ke(be, le));
        } catch (ce) {
          be(le, ce);
        }
      }).prototype, (p = function(ne) {
        Re(this, { type: fe, done: !1, notified: !1, parent: !1, reactions: new Y(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Qe, "then", function(ne, le) {
        var ce = me(this), Oe = Ue(V(this, Me));
        return ce.parent = !0, Oe.ok = !M(ne) || ne, Oe.fail = M(le) && le, Oe.domain = C ? Te.domain : void 0, ce.state === 0 ? ce.reactions.add(Oe) : N(function() {
          X(Oe, ce);
        }), Oe.promise;
      }), y = function() {
        var ne = new p(), le = me(ne);
        this.promise = ne, this.resolve = ke(Ce, le), this.reject = ke(be, le);
      }, pe.f = Ue = function(ne) {
        return ne === Me || ne === void 0 ? new y(ne) : T(ne);
      }, !k && M(oe) && Pe !== Object.prototype)) {
        m = Pe.then, Se || P(Pe, "then", function(ne, le) {
          var ce = this;
          return new Me(function(Oe, Ae) {
            E(m, ce, Oe, Ae);
          }).then(ne, le);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        L && L(Pe, Qe);
      }
      w({ global: !0, constructor: !0, wrap: !0, forced: je }, { Promise: Me }), A(Me, fe, !1, !0), R(fe);
    }, 3362: (h, g, s) => {
      s(436), s(6499), s(2003), s(7743), s(1481), s(280);
    }, 7743: (h, g, s) => {
      var p = s(6518), y = s(9565), m = s(9306), w = s(6043), k = s(1103), C = s(2652);
      p({ target: "Promise", stat: !0, forced: s(537) }, { race: function(x) {
        var E = this, P = w.f(E), L = P.reject, A = k(function() {
          var R = m(E.resolve);
          C(x, function(F) {
            y(R, E, F).then(P.resolve, L);
          });
        });
        return A.error && L(A.value), P.promise;
      } });
    }, 1481: (h, g, s) => {
      var p = s(6518), y = s(6043);
      p({ target: "Promise", stat: !0, forced: s(916).CONSTRUCTOR }, { reject: function(m) {
        var w = y.f(this);
        return (0, w.reject)(m), w.promise;
      } });
    }, 280: (h, g, s) => {
      var p = s(6518), y = s(7751), m = s(6395), w = s(550), k = s(916).CONSTRUCTOR, C = s(3438), x = y("Promise"), E = m && !k;
      p({ target: "Promise", stat: !0, forced: m || k }, { resolve: function(P) {
        return C(E && this === x ? w : this, P);
      } });
    }, 825: (h, g, s) => {
      var p = s(6518), y = s(7751), m = s(8745), w = s(566), k = s(5548), C = s(8551), x = s(34), E = s(2360), P = s(9039), L = y("Reflect", "construct"), A = Object.prototype, R = [].push, F = P(function() {
        function H() {
        }
        return !(L(function() {
        }, [], H) instanceof H);
      }), M = !P(function() {
        L(function() {
        });
      }), z = F || M;
      p({ target: "Reflect", stat: !0, forced: z, sham: z }, { construct: function(H, V) {
        k(H), C(V);
        var D = arguments.length < 3 ? H : k(arguments[2]);
        if (M && !F) return L(H, V, D);
        if (H === D) {
          switch (V.length) {
            case 0:
              return new H();
            case 1:
              return new H(V[0]);
            case 2:
              return new H(V[0], V[1]);
            case 3:
              return new H(V[0], V[1], V[2]);
            case 4:
              return new H(V[0], V[1], V[2], V[3]);
          }
          var N = [null];
          return m(R, N, V), new (m(w, H, N))();
        }
        var G = D.prototype, $ = E(x(G) ? G : A), Y = m(H, $, V);
        return x(Y) ? Y : $;
      } });
    }, 888: (h, g, s) => {
      var p = s(6518), y = s(9565), m = s(34), w = s(8551), k = s(6575), C = s(7347), x = s(2787);
      p({ target: "Reflect", stat: !0 }, { get: function E(P, L) {
        var A, R, F = arguments.length < 3 ? P : arguments[2];
        return w(P) === F ? P[L] : (A = C.f(P, L)) ? k(A) ? A.value : A.get === void 0 ? void 0 : y(A.get, F) : m(R = x(P)) ? E(R, L, F) : void 0;
      } });
    }, 4864: (h, g, s) => {
      var p = s(3724), y = s(4475), m = s(9504), w = s(2796), k = s(3167), C = s(6699), x = s(2360), E = s(8480).f, P = s(1625), L = s(788), A = s(655), R = s(1034), F = s(8429), M = s(1056), z = s(6840), H = s(9039), V = s(9297), D = s(1181).enforce, N = s(7633), G = s(8227), $ = s(3635), Y = s(8814), ae = G("match"), oe = y.RegExp, re = oe.prototype, pe = y.SyntaxError, fe = m(re.exec), je = m("".charAt), Ee = m("".replace), Se = m("".indexOf), me = m("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, Me = /a/g, Qe = new oe(Pe) !== Pe, rt = F.MISSED_STICKY, Ve = F.UNSUPPORTED_Y;
      if (w("RegExp", p && (!Qe || rt || $ || Y || H(function() {
        return Me[ae] = !1, oe(Pe) !== Pe || oe(Me) === Me || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(B, K) {
          var Q, X, ee, de, he, ue, ie = P(re, this), ke = L(B), be = K === void 0, Ce = [], ne = B;
          if (!ie && ke && be && B.constructor === Te) return B;
          if ((ke || P(re, B)) && (B = B.source, be && (K = R(ne))), B = B === void 0 ? "" : A(B), K = K === void 0 ? "" : A(K), ne = B, $ && "dotAll" in Pe && (X = !!K && Se(K, "s") > -1) && (K = Ee(K, /s/g, "")), Q = K, rt && "sticky" in Pe && (ee = !!K && Se(K, "y") > -1) && Ve && (K = Ee(K, /y/g, "")), Y && (de = function(le) {
            for (var ce, Oe = le.length, Ae = 0, ze = "", it = [], dt = x(null), yt = !1, mt = !1, Ke = 0, Ye = ""; Ae <= Oe; Ae++) {
              if ((ce = je(le, Ae)) === "\\") ce += je(le, ++Ae);
              else if (ce === "]") yt = !1;
              else if (!yt) switch (!0) {
                case ce === "[":
                  yt = !0;
                  break;
                case ce === "(":
                  fe(Re, me(le, Ae + 1)) && (Ae += 2, mt = !0), ze += ce, Ke++;
                  continue;
                case (ce === ">" && mt):
                  if (Ye === "" || V(dt, Ye)) throw new pe("Invalid capture group name");
                  dt[Ye] = !0, it[it.length] = [Ye, Ke], mt = !1, Ye = "";
                  continue;
              }
              mt ? Ye += ce : ze += ce;
            }
            return [ze, it];
          }(B), B = de[0], Ce = de[1]), he = k(oe(B, K), ie ? this : re, Te), (X || ee || Ce.length) && (ue = D(he), X && (ue.dotAll = !0, ue.raw = Te(function(le) {
            for (var ce, Oe = le.length, Ae = 0, ze = "", it = !1; Ae <= Oe; Ae++) (ce = je(le, Ae)) !== "\\" ? it || ce !== "." ? (ce === "[" ? it = !0 : ce === "]" && (it = !1), ze += ce) : ze += "[\\s\\S]" : ze += ce + je(le, ++Ae);
            return ze;
          }(B), Q)), ee && (ue.sticky = !0), Ce.length && (ue.groups = Ce)), B !== ne) try {
            C(he, "source", ne === "" ? "(?:)" : ne);
          } catch {
          }
          return he;
        }, Ue = E(oe), T = 0; Ue.length > T; ) M(Te, oe, Ue[T++]);
        re.constructor = Te, Te.prototype = re, z(y, "RegExp", Te, { constructor: !0 });
      }
      N("RegExp");
    }, 7495: (h, g, s) => {
      var p = s(6518), y = s(7323);
      p({ target: "RegExp", proto: !0, forced: /./.exec !== y }, { exec: y });
    }, 8781: (h, g, s) => {
      var p = s(350).PROPER, y = s(6840), m = s(8551), w = s(655), k = s(9039), C = s(1034), x = "toString", E = RegExp.prototype, P = E[x], L = k(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), A = p && P.name !== x;
      (L || A) && y(E, x, function() {
        var R = m(this);
        return "/" + w(R.source) + "/" + w(C(R));
      }, { unsafe: !0 });
    }, 1699: (h, g, s) => {
      var p = s(6518), y = s(9504), m = s(5749), w = s(7750), k = s(655), C = s(1436), x = y("".indexOf);
      p({ target: "String", proto: !0, forced: !C("includes") }, { includes: function(E) {
        return !!~x(k(w(this)), k(m(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (h, g, s) => {
      var p = s(8183).charAt, y = s(655), m = s(1181), w = s(1088), k = s(2529), C = "String Iterator", x = m.set, E = m.getterFor(C);
      w(String, "String", function(P) {
        x(this, { type: C, string: y(P), index: 0 });
      }, function() {
        var P, L = E(this), A = L.string, R = L.index;
        return R >= A.length ? k(void 0, !0) : (P = p(A, R), L.index += P.length, k(P, !1));
      });
    }, 1761: (h, g, s) => {
      var p = s(9565), y = s(9228), m = s(8551), w = s(4117), k = s(8014), C = s(655), x = s(7750), E = s(5966), P = s(7829), L = s(6682);
      y("match", function(A, R, F) {
        return [function(M) {
          var z = x(this), H = w(M) ? void 0 : E(M, A);
          return H ? p(H, M, z) : new RegExp(M)[A](C(z));
        }, function(M) {
          var z = m(this), H = C(M), V = F(R, z, H);
          if (V.done) return V.value;
          if (!z.global) return L(z, H);
          var D = z.unicode;
          z.lastIndex = 0;
          for (var N, G = [], $ = 0; (N = L(z, H)) !== null; ) {
            var Y = C(N[0]);
            G[$] = Y, Y === "" && (z.lastIndex = P(H, k(z.lastIndex), D)), $++;
          }
          return $ === 0 ? null : G;
        }];
      });
    }, 5440: (h, g, s) => {
      var p = s(8745), y = s(9565), m = s(9504), w = s(9228), k = s(9039), C = s(8551), x = s(4901), E = s(4117), P = s(1291), L = s(8014), A = s(655), R = s(7750), F = s(7829), M = s(5966), z = s(2478), H = s(6682), V = s(8227)("replace"), D = Math.max, N = Math.min, G = m([].concat), $ = m([].push), Y = m("".indexOf), ae = m("".slice), oe = "a".replace(/./, "$0") === "$0", re = !!/./[V] && /./[V]("a", "$0") === "";
      w("replace", function(pe, fe, je) {
        var Ee = re ? "$" : "$0";
        return [function(Se, me) {
          var Re = R(this), Pe = E(Se) ? void 0 : M(Se, V);
          return Pe ? y(Pe, Se, Re, me) : y(fe, A(Re), Se, me);
        }, function(Se, me) {
          var Re = C(this), Pe = A(Se);
          if (typeof me == "string" && Y(me, Ee) === -1 && Y(me, "$<") === -1) {
            var Me = je(fe, Re, Pe, me);
            if (Me.done) return Me.value;
          }
          var Qe = x(me);
          Qe || (me = A(me));
          var rt, Ve = Re.global;
          Ve && (rt = Re.unicode, Re.lastIndex = 0);
          for (var Te, Ue = []; (Te = H(Re, Pe)) !== null && ($(Ue, Te), Ve); ) A(Te[0]) === "" && (Re.lastIndex = F(Pe, L(Re.lastIndex), rt));
          for (var T, B = "", K = 0, Q = 0; Q < Ue.length; Q++) {
            for (var X, ee = A((Te = Ue[Q])[0]), de = D(N(P(Te.index), Pe.length), 0), he = [], ue = 1; ue < Te.length; ue++) $(he, (T = Te[ue]) === void 0 ? T : String(T));
            var ie = Te.groups;
            if (Qe) {
              var ke = G([ee], he, de, Pe);
              ie !== void 0 && $(ke, ie), X = A(p(me, void 0, ke));
            } else X = z(ee, Pe, de, he, ie, me);
            de >= K && (B += ae(Pe, K, de) + X, K = de + ee.length);
          }
          return B + ae(Pe, K);
        }];
      }, !!k(function() {
        var pe = /./;
        return pe.exec = function() {
          var fe = [];
          return fe.groups = { a: "7" }, fe;
        }, "".replace(pe, "$<a>") !== "7";
      }) || !oe || re);
    }, 1392: (h, g, s) => {
      var p, y = s(6518), m = s(7476), w = s(7347).f, k = s(8014), C = s(655), x = s(5749), E = s(7750), P = s(1436), L = s(6395), A = m("".slice), R = Math.min, F = P("startsWith");
      y({ target: "String", proto: !0, forced: !(!L && !F && (p = w(String.prototype, "startsWith"), p && !p.writable) || F) }, { startsWith: function(M) {
        var z = C(E(this));
        x(M);
        var H = k(R(arguments.length > 1 ? arguments[1] : void 0, z.length)), V = C(M);
        return A(z, H, H + V.length) === V;
      } });
    }, 2762: (h, g, s) => {
      var p = s(6518), y = s(3802).trim;
      p({ target: "String", proto: !0, forced: s(706)("trim") }, { trim: function() {
        return y(this);
      } });
    }, 6412: (h, g, s) => {
      s(511)("asyncIterator");
    }, 6761: (h, g, s) => {
      var p = s(6518), y = s(4475), m = s(9565), w = s(9504), k = s(6395), C = s(3724), x = s(4495), E = s(9039), P = s(9297), L = s(1625), A = s(8551), R = s(5397), F = s(6969), M = s(655), z = s(6980), H = s(2360), V = s(1072), D = s(8480), N = s(298), G = s(3717), $ = s(7347), Y = s(4913), ae = s(6801), oe = s(8773), re = s(6840), pe = s(2106), fe = s(5745), je = s(6119), Ee = s(421), Se = s(3392), me = s(8227), Re = s(1951), Pe = s(511), Me = s(8242), Qe = s(687), rt = s(1181), Ve = s(9213).forEach, Te = je("hidden"), Ue = "Symbol", T = "prototype", B = rt.set, K = rt.getterFor(Ue), Q = Object[T], X = y.Symbol, ee = X && X[T], de = y.RangeError, he = y.TypeError, ue = y.QObject, ie = $.f, ke = Y.f, be = N.f, Ce = oe.f, ne = w([].push), le = fe("symbols"), ce = fe("op-symbols"), Oe = fe("wks"), Ae = !ue || !ue[T] || !ue[T].findChild, ze = function(Be, Ge, Je) {
        var Xe = ie(Q, Ge);
        Xe && delete Q[Ge], ke(Be, Ge, Je), Xe && Be !== Q && ke(Q, Ge, Xe);
      }, it = C && E(function() {
        return H(ke({}, "a", { get: function() {
          return ke(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? ze : ke, dt = function(Be, Ge) {
        var Je = le[Be] = H(ee);
        return B(Je, { type: Ue, tag: Be, description: Ge }), C || (Je.description = Ge), Je;
      }, yt = function(Be, Ge, Je) {
        Be === Q && yt(ce, Ge, Je), A(Be);
        var Xe = F(Ge);
        return A(Je), P(le, Xe) ? (Je.enumerable ? (P(Be, Te) && Be[Te][Xe] && (Be[Te][Xe] = !1), Je = H(Je, { enumerable: z(0, !1) })) : (P(Be, Te) || ke(Be, Te, z(1, H(null))), Be[Te][Xe] = !0), it(Be, Xe, Je)) : ke(Be, Xe, Je);
      }, mt = function(Be, Ge) {
        A(Be);
        var Je = R(Ge), Xe = V(Je).concat(cn(Je));
        return Ve(Xe, function(pt) {
          C && !m(Ke, Je, pt) || yt(Be, pt, Je[pt]);
        }), Be;
      }, Ke = function(Be) {
        var Ge = F(Be), Je = m(Ce, this, Ge);
        return !(this === Q && P(le, Ge) && !P(ce, Ge)) && (!(Je || !P(this, Ge) || !P(le, Ge) || P(this, Te) && this[Te][Ge]) || Je);
      }, Ye = function(Be, Ge) {
        var Je = R(Be), Xe = F(Ge);
        if (Je !== Q || !P(le, Xe) || P(ce, Xe)) {
          var pt = ie(Je, Xe);
          return !pt || !P(le, Xe) || P(Je, Te) && Je[Te][Xe] || (pt.enumerable = !0), pt;
        }
      }, jr = function(Be) {
        var Ge = be(R(Be)), Je = [];
        return Ve(Ge, function(Xe) {
          P(le, Xe) || P(Ee, Xe) || ne(Je, Xe);
        }), Je;
      }, cn = function(Be) {
        var Ge = Be === Q, Je = be(Ge ? ce : R(Be)), Xe = [];
        return Ve(Je, function(pt) {
          !P(le, pt) || Ge && !P(Q, pt) || ne(Xe, le[pt]);
        }), Xe;
      };
      x || (re(ee = (X = function() {
        if (L(ee, this)) throw new he("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? M(arguments[0]) : void 0, Ge = Se(Be), Je = function(Xe) {
          var pt = this === void 0 ? y : this;
          pt === Q && m(Je, ce, Xe), P(pt, Te) && P(pt[Te], Ge) && (pt[Te][Ge] = !1);
          var nr = z(1, Xe);
          try {
            it(pt, Ge, nr);
          } catch (At) {
            if (!(At instanceof de)) throw At;
            ze(pt, Ge, nr);
          }
        };
        return C && Ae && it(Q, Ge, { configurable: !0, set: Je }), dt(Ge, Be);
      })[T], "toString", function() {
        return K(this).tag;
      }), re(X, "withoutSetter", function(Be) {
        return dt(Se(Be), Be);
      }), oe.f = Ke, Y.f = yt, ae.f = mt, $.f = Ye, D.f = N.f = jr, G.f = cn, Re.f = function(Be) {
        return dt(me(Be), Be);
      }, C && (pe(ee, "description", { configurable: !0, get: function() {
        return K(this).description;
      } }), k || re(Q, "propertyIsEnumerable", Ke, { unsafe: !0 }))), p({ global: !0, constructor: !0, wrap: !0, forced: !x, sham: !x }, { Symbol: X }), Ve(V(Oe), function(Be) {
        Pe(Be);
      }), p({ target: Ue, stat: !0, forced: !x }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), p({ target: "Object", stat: !0, forced: !x, sham: !C }, { create: function(Be, Ge) {
        return Ge === void 0 ? H(Be) : mt(H(Be), Ge);
      }, defineProperty: yt, defineProperties: mt, getOwnPropertyDescriptor: Ye }), p({ target: "Object", stat: !0, forced: !x }, { getOwnPropertyNames: jr }), Me(), Qe(X, Ue), Ee[Te] = !0;
    }, 9463: (h, g, s) => {
      var p = s(6518), y = s(3724), m = s(4475), w = s(9504), k = s(9297), C = s(4901), x = s(1625), E = s(655), P = s(2106), L = s(7740), A = m.Symbol, R = A && A.prototype;
      if (y && C(A) && (!("description" in R) || A().description !== void 0)) {
        var F = {}, M = function() {
          var $ = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), Y = x(R, this) ? new A($) : $ === void 0 ? A() : A($);
          return $ === "" && (F[Y] = !0), Y;
        };
        L(M, A), M.prototype = R, R.constructor = M;
        var z = String(A("description detection")) === "Symbol(description detection)", H = w(R.valueOf), V = w(R.toString), D = /^Symbol\((.*)\)[^)]+$/, N = w("".replace), G = w("".slice);
        P(R, "description", { configurable: !0, get: function() {
          var $ = H(this);
          if (k(F, $)) return "";
          var Y = V($), ae = z ? G(Y, 7, -1) : N(Y, D, "$1");
          return ae === "" ? void 0 : ae;
        } }), p({ global: !0, constructor: !0, forced: !0 }, { Symbol: M });
      }
    }, 1510: (h, g, s) => {
      var p = s(6518), y = s(7751), m = s(9297), w = s(655), k = s(5745), C = s(1296), x = k("string-to-symbol-registry"), E = k("symbol-to-string-registry");
      p({ target: "Symbol", stat: !0, forced: !C }, { for: function(P) {
        var L = w(P);
        if (m(x, L)) return x[L];
        var A = y("Symbol")(L);
        return x[L] = A, E[A] = L, A;
      } });
    }, 2259: (h, g, s) => {
      s(511)("iterator");
    }, 2675: (h, g, s) => {
      s(6761), s(1510), s(7812), s(3110), s(9773);
    }, 7812: (h, g, s) => {
      var p = s(6518), y = s(9297), m = s(757), w = s(6823), k = s(5745), C = s(1296), x = k("symbol-to-string-registry");
      p({ target: "Symbol", stat: !0, forced: !C }, { keyFor: function(E) {
        if (!m(E)) throw new TypeError(w(E) + " is not a symbol");
        if (y(x, E)) return x[E];
      } });
    }, 5700: (h, g, s) => {
      var p = s(511), y = s(8242);
      p("toPrimitive"), y();
    }, 8125: (h, g, s) => {
      var p = s(7751), y = s(511), m = s(687);
      y("toStringTag"), m(p("Symbol"), "Symbol");
    }, 3500: (h, g, s) => {
      var p = s(4475), y = s(7400), m = s(9296), w = s(235), k = s(6699), C = function(E) {
        if (E && E.forEach !== w) try {
          k(E, "forEach", w);
        } catch {
          E.forEach = w;
        }
      };
      for (var x in y) y[x] && C(p[x] && p[x].prototype);
      C(m);
    }, 2953: (h, g, s) => {
      var p = s(4475), y = s(7400), m = s(9296), w = s(3792), k = s(6699), C = s(687), x = s(8227)("iterator"), E = w.values, P = function(A, R) {
        if (A) {
          if (A[x] !== E) try {
            k(A, x, E);
          } catch {
            A[x] = E;
          }
          if (C(A, R, !0), y[R]) {
            for (var F in w) if (A[F] !== w[F]) try {
              k(A, F, w[F]);
            } catch {
              A[F] = w[F];
            }
          }
        }
      };
      for (var L in y) P(p[L] && p[L].prototype, L);
      P(m, "DOMTokenList");
    }, 5575: (h, g, s) => {
      var p = s(6518), y = s(4475), m = s(9472)(y.setInterval, !0);
      p({ global: !0, bind: !0, forced: y.setInterval !== m }, { setInterval: m });
    }, 4599: (h, g, s) => {
      var p = s(6518), y = s(4475), m = s(9472)(y.setTimeout, !0);
      p({ global: !0, bind: !0, forced: y.setTimeout !== m }, { setTimeout: m });
    }, 6031: (h, g, s) => {
      s(5575), s(4599);
    } }, _ = {};
    function v(h) {
      var g = _[h];
      if (g !== void 0) return g.exports;
      var s = _[h] = { exports: {} };
      return f[h].call(s.exports, s, s.exports, v), s.exports;
    }
    v.d = (h, g) => {
      for (var s in g) v.o(g, s) && !v.o(h, s) && Object.defineProperty(h, s, { enumerable: !0, get: g[s] });
    }, v.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), v.o = (h, g) => Object.prototype.hasOwnProperty.call(h, g), v.r = (h) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(h, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(h, "__esModule", { value: !0 });
    };
    var O = {};
    return (() => {
      v.r(O), v.d(O, { JSONEditor: () => Pr }), v(2675), v(9463), v(6412), v(2259), v(5700), v(8125), v(8706), v(113), v(1629), v(3418), v(4346), v(3792), v(2712), v(4490), v(4782), v(739), v(9572), v(3288), v(2010), v(4731), v(479), v(2892), v(9085), v(9904), v(4185), v(875), v(9432), v(287), v(6099), v(6034), v(3362), v(7495), v(8781), v(7764), v(3500), v(2953), v(5506), v(4864), v(5440), v(4423);
      var h = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], g = [function(o) {
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
      function s(o, r, n) {
        var a;
        return a = function(e, t) {
          if (p(e) != "object" || !e) return e;
          var i = e[Symbol.toPrimitive];
          if (i !== void 0) {
            var u = i.call(e, "string");
            if (p(u) != "object") return u;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(r), (r = p(a) == "symbol" ? a : a + "") in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function p(o) {
        return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, p(o);
      }
      function y(o) {
        return !(o === null || p(o) !== "object" || o.nodeType || o === o.window || o.constructor && !x(o.constructor.prototype, "isPrototypeOf"));
      }
      function m(o) {
        return y(o) ? w({}, o) : Array.isArray(o) ? o.map(m) : o;
      }
      function w(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && y(e[t]) ? (x(o, t) || (o[t] = {}), w(o[t], e[t])) : Array.isArray(e[t]) ? o[t] = m(e[t]) : o[t] = e[t];
          });
        }), o;
      }
      function k(o, r) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(r, !0, !0), o.dispatchEvent(n);
      }
      function C(o) {
        return o && (o.toString() === "[object ShadowRoot]" ? o : C(o.parentNode));
      }
      function x(o, r) {
        return o && Object.prototype.hasOwnProperty.call(o, r);
      }
      v(4170), v(3851), v(825), v(888), v(8598), v(1699), v(1761), v(5276), v(5086), v(1392), v(2062), v(8459), v(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function L() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function A(o) {
        return o && p(o) === "object" && !Array.isArray(o);
      }
      var R = ["__proto__", "constructor", "prototype"];
      function F(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        if (!n.length) return o;
        var e = n.shift();
        if (A(o) && A(e)) for (var t in e) x(e, t) && (R.includes(t) || (A(e[t]) ? (x(o, t) && A(o[t]) || Object.assign(o, s({}, t, {})), F(o[t], e[t])) : Object.assign(o, s({}, t, e[t]))));
        return F.apply(void 0, [o].concat(n));
      }
      function M(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function z(o) {
        return z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, z(o);
      }
      function H(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, V(a.key), a);
        }
      }
      function V(o) {
        var r = function(n, a) {
          if (z(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (z(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return z(r) == "symbol" ? r : r + "";
      }
      var D = function() {
        return o = function n(a, e) {
          var t, i;
          (function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.defaults = e, this.jsoneditor = a.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = a.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = w({}, this.options || {}, this.schema.options || {}, a.schema.options || {}, a), this.enforceConstEnabled = (t = this.options.enforce_const) !== null && t !== void 0 ? t : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", a.path || this.schema.id || (this.schema.id = this.formname), this.path = a.path || this.formname, this.formname = a.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = a.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, a.container && this.setContainer(a.container), this.registerDependencies();
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
                var d;
                u.startsWith(n.jsoneditor.root.path) ? d = u : ((d = n.path.split("."))[d.length - 1] = u, d = d.join("."));
                var b = e[u];
                n.checkDependency(d, b);
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
            }) : z(a) === "object" ? z(i) !== "object" ? this.dependenciesFulfilled = a === i : Object.keys(a).some(function(u) {
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
            var a, e, t, i, u, d = this.container.getAttribute("data-schemapath");
            Object.keys(this.schema.watch).forEach(function(b) {
              if (a = n.schema.watch[b], Array.isArray(a)) {
                if (a.length < 2) return;
                e = [a[0]].concat(a[1].split("."));
              } else e = a.split("."), n.theme.closest(n.container, '[data-schemaid="'.concat(e[0], '"]')) || e.unshift("#");
              if ((t = e.shift()) === "#" && (t = n.jsoneditor.schema.id || n.jsoneditor.root.formname), !(i = n.theme.closest(n.container, '[data-schemaid="'.concat(t, '"]')))) throw new Error("Could not find ancestor node with id ".concat(t));
              u = "".concat(i.getAttribute("data-schemapath"), ".").concat(e.join(".")), d.startsWith(u) && (n.watchLoop = !0), n.jsoneditor.watch(u, n.watch_listener), n.watched[b] = u;
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
          var a, e, t = (n.mediaType || "application/javascript").split("/")[0], i = this.jsoneditor.compileTemplate(n.href, this.template_engine), u = this.jsoneditor.compileTemplate(n.rel ? n.rel : n.href, this.template_engine), d = null;
          if (n.download && (d = n.download), d && d !== !0 && (d = this.jsoneditor.compileTemplate(d, this.template_engine)), t === "image") {
            a = this.theme.getBlockLinkHolder(), (e = document.createElement("a")).setAttribute("target", "_blank");
            var b = document.createElement("img");
            this.theme.createImageLink(a, e, b), this.link_watchers.push(function(S) {
              var I = i(S), W = u(S);
              e.setAttribute("href", I), e.setAttribute("title", W || I), b.setAttribute("src", I);
            });
          } else if (["audio", "video"].includes(t)) {
            a = this.theme.getBlockLinkHolder(), (e = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var j = document.createElement(t);
            j.setAttribute("controls", "controls"), this.theme.createMediaLink(a, e, j), this.link_watchers.push(function(S) {
              var I = i(S), W = u(S);
              e.setAttribute("href", I), e.textContent = W || I, j.setAttribute("src", I);
            });
          } else e = a = this.theme.getBlockLink(), a.setAttribute("target", "_blank"), a.textContent = n.rel, a.style.display = "none", this.link_watchers.push(function(S) {
            var I = i(S), W = u(S);
            I && (a.style.display = ""), a.setAttribute("href", I), a.textContent = W || I;
          });
          return d && e && (d === !0 ? e.setAttribute("download", "") : this.link_watchers.push(function(S) {
            e.setAttribute("download", d(S));
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
            n = w(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (n.properties = {}, Object.keys(this.editors).forEach(function(i) {
              var u = a.editors[i];
              if (u.schema && u.schema.enum && u.schema.options && u.schema.options.enum_titles) {
                var d = u.schema.enum.indexOf(u.value), b = u.options.enum_titles[d];
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
          if (n && Array.isArray(n) && (n = n[0]), n && z(n) === "object" && (n = n.type), n && Array.isArray(n) && (n = n[0]), typeof n == "string") {
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
            var u, d, b = (d = 2, function(I) {
              if (Array.isArray(I)) return I;
            }(u = i) || function(I, W) {
              var J = I == null ? null : typeof Symbol < "u" && I[Symbol.iterator] || I["@@iterator"];
              if (J != null) {
                var te, ye, _e, we, Ie = [], De = !0, He = !1;
                try {
                  if (_e = (J = J.call(I)).next, W === 0) {
                    if (Object(J) !== J) return;
                    De = !1;
                  } else for (; !(De = (te = _e.call(J)).done) && (Ie.push(te.value), Ie.length !== W); De = !0) ;
                } catch (ve) {
                  He = !0, ye = ve;
                } finally {
                  try {
                    if (!De && J.return != null && (we = J.return(), Object(we) !== we)) return;
                  } finally {
                    if (He) throw ye;
                  }
                }
                return Ie;
              }
            }(u, d) || function(I, W) {
              if (I) {
                if (typeof I == "string") return M(I, W);
                var J = Object.prototype.toString.call(I).slice(8, -1);
                return J === "Object" && I.constructor && (J = I.constructor.name), J === "Map" || J === "Set" ? Array.from(I) : J === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(J) ? M(I, W) : void 0;
              }
            }(u, d) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), j = b[0], S = b[1];
            S === Object(S) ? a[j] = e.expandCallbacks(n, S) : typeof S == "string" && z(t) === "object" && typeof t[S] == "function" && (a[j] = t[S].bind(null, e));
          }), a;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && H(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function N(o) {
        return N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, N(o);
      }
      function G(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, $(a.key), a);
        }
      }
      function $(o) {
        var r = function(n, a) {
          if (N(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (N(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return N(r) == "symbol" ? r : r + "";
      }
      function Y(o, r, n) {
        return r = re(r), function(a, e) {
          if (e && (N(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ae() ? Reflect.construct(r, n || [], re(o).constructor) : r.apply(o, n));
      }
      function ae() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ae = function() {
          return !!o;
        })();
      }
      function oe() {
        return oe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = re(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, oe.apply(this, arguments);
      }
      function re(o) {
        return re = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, re(o);
      }
      function pe(o, r) {
        return pe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, pe(o, r);
      }
      var fe = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Y(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && pe(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          oe(re(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          oe(re(r.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.purify(e), e = this.applyConstFilter(e), (!this.template || i) && (this.shouldBeUnset() || e != null ? N(e) === "object" ? e = JSON.stringify(e) : this.shouldBeUnset() || typeof e == "string" || (e = "".concat(e)) : e = "", e !== this.serialized)) {
            var u = this.sanitize(e);
            if (this.input.value !== u) {
              if (this.setValueToInputField(u), this.format === "range") {
                var d = this.control.querySelector("output");
                d && (d.value = u);
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
            var i = this.schema.minimum || 0, u = this.schema.maximum || Math.max(100, i + 1), d = 1;
            this.schema.multipleOf && (i % this.schema.multipleOf && (i = Math.ceil(i / this.schema.multipleOf) * this.schema.multipleOf), u % this.schema.multipleOf && (u = Math.floor(u / this.schema.multipleOf) * this.schema.multipleOf), d = this.schema.multipleOf), this.input = this.theme.getRangeInput(i, u, d, this.description, this.formname), this.input.setAttribute("id", this.formname);
          } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(this.format) && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
          else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function(W) {
            if (W.preventDefault(), W.stopPropagation(), t.schema.template) W.currentTarget.value = t.value;
            else {
              var J = W.currentTarget.value, te = t.sanitize(J);
              J !== te && (W.currentTarget.value = te), t.is_dirty = !0, t.refreshValue(), t.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function(W) {
            if (W) {
              var J, te = W.offsetHeight;
              if (W.offsetHeight < W.scrollHeight) for (J = 0; W.offsetHeight < W.scrollHeight + 3 && !(J > 100); ) J++, te++, W.style.height = "".concat(te, "px");
              else {
                for (J = 0; W.offsetHeight >= W.scrollHeight + 3 && !(J > 100); ) J++, te--, W.style.height = "".concat(te, "px");
                W.style.height = "".concat(te + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function(W) {
            t.adjust_height(W.currentTarget);
          }), this.input.addEventListener("change", function(W) {
            t.adjust_height(W.currentTarget);
          }), this.adjust_height());
          var b = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, j = this.schema.maxLength !== void 0;
          b && j && this.input.addEventListener("paste", function(W) {
            (W.clipboardData || window.clipboardData).getData("text").length + t.input.value.length > t.schema.maxLength && alert(t.translate("paste_max_length_reached", [t.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var S = this.input;
          if (this.format === "range" && (S = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input), t.format === "range" && (t.control.querySelector("output").value = t.input.value);
          }), this.schema.template) {
            var I = this.expandCallbacks("template", { template: this.schema.template });
            typeof I.template == "function" ? this.template = I.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }, { key: "setupCleave", value: function(e) {
          var t = this.expandCallbacks("cleave", w({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
          N(t) === "object" && Object.keys(t).length > 0 && (this.cleave_instance = new window.Cleave(e, t));
        } }, { key: "setupImask", value: function(e) {
          var t = this.expandCallbacks("imask", w({}, this.defaults.options.imask || {}, this.options.imask || {}));
          N(t) === "object" && Object.keys(t).length > 0 && (this.imask_instance = window.IMask(e, this.ajustIMaskOptions(t)));
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
          if (!this.shouldBeUnset() || e) return this.imask_instance && this.dependenciesFulfilled && this.options.imask.returnUnmasked ? this.imask_instance.unmaskedValue : oe(re(r.prototype), "getValue", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, oe(re(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, oe(re(r.prototype), "disable", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          this.theme.afterInputReady(this.input), window.Cleave && !this.cleave_instance ? this.setupCleave(this.input) : window.IMask && !this.imask_instance && this.setupImask(this.input);
        } }, { key: "refreshValue", value: function() {
          this.input && (this.value = this.input.value, typeof this.value == "string" || this.shouldBeUnset() || (this.value = ""), this.serialized = this.value);
        } }, { key: "destroy", value: function() {
          this.cleave_instance && this.cleave_instance.destroy(), this.imask_instance && this.imask_instance.destroy(), this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), oe(re(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), oe(re(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.jsoneditor.options.show_errors !== "always") {
            if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
          }
          this.previous_error_setting = this.jsoneditor.options.show_errors;
          var i = e.reduce(function(u, d) {
            return d.path === t.path && u.push(d.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && G(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function je(o) {
        return je = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, je(o);
      }
      function Ee(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Se(a.key), a);
        }
      }
      function Se(o) {
        var r = function(n, a) {
          if (je(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (je(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return je(r) == "symbol" ? r : r + "";
      }
      function me(o, r, n) {
        return r = Me(r), function(a, e) {
          if (e && (je(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Re() ? Reflect.construct(r, n || [], Me(o).constructor) : r.apply(o, n));
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
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Me(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Pe.apply(this, arguments);
      }
      function Me(o) {
        return Me = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Me(o);
      }
      function Qe(o, r) {
        return Qe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Qe(o, r);
      }
      var rt = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), me(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qe(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Pe(Me(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(u.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize());
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Pe(Me(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.ace) {
            var i = this.input_type;
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), e = this.expandCallbacks("ace", w({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, e), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
              t.input.value = t.ace_editor_instance.getValue(), t.refreshValue(), t.is_dirty = !0, t.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Pe(Me(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!1), Pe(Me(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!0), Pe(Me(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.ace_editor_instance && (this.ace_editor_instance.destroy(), this.ace_editor_instance = null), Pe(Me(r.prototype), "destroy", this).call(this);
        } }]) && Ee(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Ve(o, r) {
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
      function Ue(o) {
        return Ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ue(o);
      }
      function T(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, B(a.key), a);
        }
      }
      function B(o) {
        var r = function(n, a) {
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
      function K(o, r, n) {
        return r = ee(r), function(a, e) {
          if (e && (Ue(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Q() ? Reflect.construct(r, n || [], ee(o).constructor) : r.apply(o, n));
      }
      function Q() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Q = function() {
          return !!o;
        })();
      }
      function X() {
        return X = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ee(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, X.apply(this, arguments);
      }
      function ee(o) {
        return ee = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ee(o);
      }
      function de(o, r) {
        return de = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, de(o, r);
      }
      v(2008), v(4554), v(7945), v(1278);
      var he = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), K(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && de(e, t);
        }(r, o), n = r, a = [{ key: "askConfirmation", value: function() {
          return this.jsoneditor.options.prompt_before_delete !== !0 || window.confirm(this.translate("button_delete_node_warning")) !== !1;
        } }, { key: "register", value: function() {
          X(ee(r.prototype), "register", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          X(ee(r.prototype), "unregister", this).call(this), this.rows && this.rows.forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          var e = this.getItemInfo(0);
          return this.tabs_holder && this.schema.format !== "tabs-top" ? Math.max(Math.min(12, e.width + 2), 4) : e.width;
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.setAvailability(this, !1), this.rows && this.rows.forEach(function(t) {
            t.enable(), e.setAvailability(t, !1);
          }), X(ee(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.setAvailability(this, !0), this.rows && this.rows.forEach(function(i) {
            i.disable(e), t.setAvailability(i, !0);
          }), X(ee(r.prototype), "disable", this).call(this);
        } }, { key: "setAvailability", value: function(e, t) {
          e.add_row_button && (e.add_row_button.disabled = t), e.remove_all_rows_button && (e.remove_all_rows_button.disabled = t), e.delete_last_row_button && (e.delete_last_row_button.disabled = t), e.copy_button && (e.copy_button.disabled = t), e.delete_button && (e.delete_button.disabled = t), e.moveup_button && (e.moveup_button.disabled = t), e.movedown_button && (e.movedown_button.disabled = t);
        } }, { key: "preBuild", value: function() {
          X(ee(r.prototype), "preBuild", this).call(this), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add, this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top;
        } }, { key: "build", value: function() {
          this.options.compact ? (this.title = this.theme.getHeader("", this.getPathDepth()), this.container.appendChild(this.title), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.schema.format === "tabs-top" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder), this.active_tab = null) : this.schema.format === "tabs" ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls))), this.addControls();
        } }, { key: "postBuild", value: function() {
          X(ee(r.prototype), "postBuild", this).call(this), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), this.refreshTabs(!0), this.is_dirty = !0, X(ee(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemTitle", value: function() {
          if (!this.item_title) if (this.schema.items && !Array.isArray(this.schema.items)) {
            var e = this.jsoneditor.expandRefs(this.schema.items);
            this.item_title = this.translateProperty(e.title) || this.translate("default_array_item_title");
          } else this.item_title = this.translate("default_array_item_title");
          return this.cleanText(this.item_title);
        } }, { key: "getItemSchema", value: function(e) {
          return Array.isArray(this.schema.items) ? e >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? w({}, this.schema.additionalItems) : void 0 : w({}, this.schema.items[e]) : this.schema.items ? w({}, this.schema.items) : {};
        } }, { key: "getItemInfo", value: function(e) {
          var t = this.getItemSchema(e);
          this.item_info = this.item_info || {};
          var i = JSON.stringify(t);
          return this.item_info[i] !== void 0 || (t = this.jsoneditor.expandRefs(t), this.item_info[i] = { title: this.translateProperty(t.title) || this.translate("default_array_item_title"), default: t.default, width: 12, child_editors: t.properties || t.items }), this.item_info[i];
        } }, { key: "getElementEditor", value: function(e) {
          var t = this.getItemInfo(e), i = this.getItemSchema(e);
          (i = this.jsoneditor.expandRefs(i)).title = "".concat(t.title, " ").concat(e + 1);
          var u, d = this.jsoneditor.getEditorClass(i);
          this.tabs_holder ? (u = this.schema.format === "tabs-top" ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = "".concat(this.path, ".").concat(e) : u = t.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(u);
          var b = this.jsoneditor.createEditor(d, { jsoneditor: this.jsoneditor, schema: i, container: u, path: "".concat(this.path, ".").concat(e), parent: this, required: !0 });
          return b.preBuild(), b.build(), b.postBuild(), b.title_controls || (b.array_controls = this.theme.getButtonHolder(), u.appendChild(b.array_controls)), b;
        } }, { key: "checkParent", value: function(e) {
          return e && e.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, X(ee(r.prototype), "destroy", this).call(this);
        } }, { key: "empty", value: function(e) {
          var t = this;
          if (this.rows !== null) {
            if (this.rows.forEach(function(u, d) {
              e && (t.checkParent(u.tab) && u.tab.parentNode.removeChild(u.tab), t.destroyRow(u, !0), t.row_cache[d] = null), t.rows[d] = null;
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
            t.forEach(function(j, S) {
              if (e.rows[S]) e.rows[S].setValue(j, i);
              else if (e.row_cache[S]) e.rows[S] = e.row_cache[S], e.rows[S].setValue(j, i), e.rows[S].container.style.display = "", e.rows[S].tab && (e.rows[S].tab.style.display = ""), e.rows[S].register(), e.jsoneditor.trigger("addRow", e.rows[S]);
              else {
                var I = e.addRow(j, i);
                e.jsoneditor.trigger("addRow", I);
              }
            });
            for (var u = t.length; u < this.rows.length; u++) this.destroyRow(this.rows[u]), this.rows[u] = null;
            this.rows = this.rows.slice(0, t.length);
            var d = this.rows.find(function(j) {
              return j.tab === e.active_tab;
            }), b = d !== void 0 ? d.tab : null;
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
            var d = !(e || this.hide_delete_all_rows_buttons);
            this.setButtonState(this.remove_all_rows_button, d), t.push(d);
          }
          else this.setButtonState(this.delete_last_row_button, !1), this.setButtonState(this.remove_all_rows_button, !1);
          var b = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, b), t.push(b), t.some(function(j) {
            return j;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(d) {
            return d.getValue();
          }), i !== this.value.length || e) {
            var u = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(d, b) {
              if (d.movedown_button) {
                var j = b !== t.rows.length - 1;
                t.setButtonState(d.movedown_button, j);
              }
              d.delete_button && t.setButtonState(d.delete_button, !u), t.value[b] = d.getValue();
            }), this.setupButtons(u) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e, t) {
          var i = this, u = this.rows.length;
          this.rows[u] = this.getElementEditor(u), this.row_cache[u] = this.rows[u], this.tabs_holder ? (this.rows[u].tab_text = document.createElement("span"), this.rows[u].tab_text.textContent = this.rows[u].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[u].tab = this.theme.getTopTab(this.rows[u].tab_text, this.getValidId(this.rows[u].path)), this.theme.addTopTab(this.tabs_holder, this.rows[u].tab)) : (this.rows[u].tab = this.theme.getTab(this.rows[u].tab_text, this.getValidId(this.rows[u].path)), this.theme.addTab(this.tabs_holder, this.rows[u].tab)), this.rows[u].tab.addEventListener("click", function(b) {
            i.active_tab = i.rows[u].tab, i.refreshTabs(), b.preventDefault(), b.stopPropagation();
          }), this._supportDragDrop(this.rows[u].tab)) : this._supportDragDrop(this.rows[u].container, !0);
          var d = this.rows[u].title_controls || this.rows[u].array_controls;
          return this.hide_delete_buttons || (this.rows[u].delete_button = this._createDeleteButton(u, d)), this.show_copy_button && (this.rows[u].copy_button = this._createCopyButton(u, d)), u && !this.hide_move_buttons && (this.rows[u].moveup_button = this._createMoveUpButton(u, d)), this.hide_move_buttons || (this.rows[u].movedown_button = this._createMoveDownButton(u, d)), e !== void 0 && this.rows[u].setValue(e, t), this.refreshTabs(), this.rows[u];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, u = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return u.classList.add("delete", "json-editor-btntype-delete"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            if (d.preventDefault(), d.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * d.currentTarget.getAttribute("data-i"), j = i.getValue().filter(function(W, J) {
              return J !== b;
            }), S = null, I = i.rows[b].getValue();
            i.setValue(j), i.rows[b] ? S = i.rows[b].tab : i.rows[b - 1] && (S = i.rows[b - 1].tab), S && (i.active_tab = S, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", I);
          }), t && t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), d = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            var j = i.getValue();
            b.preventDefault(), b.stopPropagation();
            var S = 1 * b.currentTarget.getAttribute("data-i");
            j.forEach(function(I, W) {
              if (W === S) {
                var J = Ue(I) === "object" && I !== null ? function(we) {
                  for (var Ie = 1; Ie < arguments.length; Ie++) {
                    var De = arguments[Ie] != null ? arguments[Ie] : {};
                    Ie % 2 ? Ve(Object(De), !0).forEach(function(He) {
                      Te(we, He, De[He]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(we, Object.getOwnPropertyDescriptors(De)) : Ve(Object(De)).forEach(function(He) {
                      Object.defineProperty(we, He, Object.getOwnPropertyDescriptor(De, He));
                    });
                  }
                  return we;
                }({}, I) : I;
                if (d.items.type === "string" && d.items.format === "uuid") J = L();
                else if (d.items.type === "object" && d.items.properties) for (var te = 0, ye = Object.keys(J); te < ye.length; te++) {
                  var _e = ye[te];
                  d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && (J[_e] = L());
                }
                j.push(J);
              }
            }), i.setValue(j), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[S - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i");
            if (!(b <= 0)) {
              var j = i.getValue(), S = j[b - 1];
              j[b - 1] = j[b], j[b] = S, i.setValue(j), i.active_tab = i.rows[b - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), j = i.getValue();
            if (!(b >= j.length - 1)) {
              var S = j[b + 1];
              j[b + 1] = j[b], j[b] = S, i.setValue(j), i.active_tab = i.rows[b + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          ue(e, function(u, d) {
            var b = i.getValue(), j = b[u];
            b.splice(u, 1), b.splice(d, 0, j), i.setValue(b), i.active_tab = i.rows[d].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[d]);
          }, { useTrigger: t });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && k(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
        } }, { key: "_createToggleButton", value: function() {
          var e = this, t = this.getButton("", "collapse", "button_collapse");
          t.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(t, this.title.childNodes[0]);
          var i = this.row_holder.style.display, u = this.controls.style.display;
          return t.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation(), e.panel && e.setButtonState(e.panel, e.collapsed), e.tabs_holder && e.setButtonState(e.tabs_holder, e.collapsed), e.collapsed ? (e.collapsed = !1, e.row_holder.style.display = i, e.controls.style.display = u, e.setButtonText(d.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.row_holder.style.display = "none", e.controls.style.display = "none", e.setButtonText(d.currentTarget, "", "expand", "button_expand"));
          }), t;
        } }, { key: "_createAddRowButton", value: function() {
          var e = this, t = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-add"), t.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var u, d = e.rows.length;
            e.row_cache[d] ? (u = e.rows[d] = e.row_cache[d], e.rows[d].setValue(e.rows[d].getDefault(), !0), typeof e.rows[d].deactivateNonRequiredProperties == "function" && e.rows[d].deactivateNonRequiredProperties(!0), e.rows[d].container.style.display = "", e.rows[d].tab && (e.rows[d].tab.style.display = ""), e.rows[d].register()) : u = e.addRow(), e.active_tab = e.rows[d].tab, e.refreshTabs(), e.refreshValue(), e.onChange(!0), e.jsoneditor.trigger("addRow", u);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue(), d = null, b = u.pop();
            e.setValue(u), e.rows[e.rows.length - 1] && (d = e.rows[e.rows.length - 1].tab), d && (e.active_tab = d, e.refreshTabs()), e.onChange(!0), e.jsoneditor.trigger("deleteRow", b);
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
          e.forEach(function(d) {
            d.path === t.path ? i.push(d) : u.push(d);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(d) {
            t.error_holder.appendChild(t.theme.getErrorMessage(d.message));
          })) : this.error_holder.style.display = "none"), this.rows.forEach(function(d) {
            return d.showValidationErrors(u);
          });
        } }], a && T(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function ue(o, r) {
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
              for (var u = 0, d = i.parentElement.firstElementChild; d !== i && d !== null; ) d = d.nextSibling, ++u;
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
      function ke(o, r) {
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
        }(o, ne() ? Reflect.construct(r, n || [], ce(o).constructor) : r.apply(o, n));
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
      function le() {
        return le = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ce(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, le.apply(this, arguments);
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
        }(r, o), n = r, (a = [{ key: "onInputChange", value: function() {
          this.value = this.input.value, this.onChange(!0);
        } }, { key: "register", value: function() {
          le(ce(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          le(ce(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          var e = this, t = this.getTitle().length;
          return Object.keys(this.select_values).forEach(function(i) {
            return t = Math.max(t, "".concat(e.select_values[i]).length + 4);
          }), Math.min(12, Math.max(t / 7, 2));
        } }, { key: "preBuild", value: function() {
          var e;
          le(ce(r.prototype), "preBuild", this).call(this), this.select_options = {}, this.select_values = {}, this.option_titles = [], this.option_keys = [], this.option_enum = [];
          var t = this.jsoneditor.expandRefs(this.schema.items || {}), i = t.enum || [], u = t.options && t.options.enum || [], d = t.options && t.options.enum_titles || [];
          for (e = 0; e < i.length; e++) if (this.sanitize(i[e]) === i[e]) {
            var b = u[e] || {};
            "title" in b || (b.title = "".concat(d[e] || i[e])), this.option_keys.push("".concat(i[e])), this.option_enum.push(b), this.select_values["".concat(i[e])] = i[e];
          }
        } }, { key: "build", value: function() {
          var e, t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || this.schema.format === "checkbox") {
            for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, e = 0; e < this.option_keys.length; e++) {
              var i = this.formname + e.toString();
              this.inputs[this.option_keys[e]] = this.theme.getCheckbox(), this.inputs[this.option_keys[e]].id = i, this.select_options[this.option_keys[e]] = this.inputs[this.option_keys[e]];
              var u = this.theme.getCheckboxLabel(this.option_enum[e].title);
              if (u.htmlFor = i, this.option_enum[e].infoText) {
                var d = this.theme.getInfoButton(this.translateProperty(this.option_enum[e].infoText));
                u.appendChild(d);
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
            var j = [];
            for (e = 0; e < t.option_keys.length; e++) t.select_options[t.option_keys[e]] && (t.select_options[t.option_keys[e]].selected || t.select_options[t.option_keys[e]].checked) && j.push(t.select_values[t.option_keys[e]]);
            t.updateValue(j), t.onChange(!0);
          }, this.control.addEventListener("change", this.multiselectChangeHandler, !1), window.requestAnimationFrame(function() {
            t.afterInputReady();
          });
        } }, { key: "postBuild", value: function() {
          le(ce(r.prototype), "postBuild", this).call(this);
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
            var d = this.sanitize(this.select_values[e[u]]);
            i.push(d), d !== e[u] && (t = !0);
          } else t = !0;
          return this.value = i, t;
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.schema.items.type === "boolean" ? !!e : this.schema.items.type === "number" ? 1 * e || 0 : this.schema.items.type === "integer" ? Math.floor(1 * e || 0) : "".concat(e);
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.input ? this.input.disabled = !1 : this.inputs && Object.keys(this.inputs).forEach(function(t) {
            return e.inputs[t].disabled = !1;
          }), le(ce(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.input ? this.input.disabled = !0 : this.inputs && Object.keys(this.inputs).forEach(function(i) {
            return t.inputs[i].disabled = !0;
          }), le(ce(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          le(ce(r.prototype), "destroy", this).call(this);
        } }, { key: "escapeRegExp", value: function(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } }, { key: "showValidationErrors", value: function(e) {
          var t = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = e.reduce(function(u, d) {
            return d.path.match(t) && u.push(d.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && ke(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function ze(o) {
        return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ze(o);
      }
      function it(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, dt(a.key), a);
        }
      }
      function dt(o) {
        var r = function(n, a) {
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
      function yt(o, r, n) {
        return r = Ye(r), function(a, e) {
          if (e && (ze(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, mt() ? Reflect.construct(r, n || [], Ye(o).constructor) : r.apply(o, n));
      }
      function mt() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (mt = function() {
          return !!o;
        })();
      }
      function Ke() {
        return Ke = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ye(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ke.apply(this, arguments);
      }
      function Ye(o) {
        return Ye = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ye(o);
      }
      function jr(o, r) {
        return jr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, jr(o, r);
      }
      var cn = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yt(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && jr(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          this.choices_instance ? (e = this.applyConstFilter(e), e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : Ke(Ye(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.Choices && !this.choices_instance) {
            var t = this.expandCallbacks("choices", w({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
            this.newEnumAllowed = !1, this.choices_instance = new window.Choices(this.input, t), this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              var u = e.choices_instance.getValue(!0);
              e.updateValue(u), e.onChange(!0);
            }, this.control.addEventListener("change", this.multiselectChangeHandler, !1);
          }
          Ke(Ye(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var d = this.sanitize(this.select_values[e[u]]);
              i.push(d), d !== e[u] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          return this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.schema.items.enum.push(e), this.choices_instance.setChoices([{ value: "".concat(e), label: "".concat(e) }], "value", "label", !1), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), Ke(Ye(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), Ke(Ye(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), Ke(Ye(r.prototype), "destroy", this).call(this);
        } }]) && it(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
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
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Je(a.key), a);
        }
      }
      function Je(o) {
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
      function Xe(o, r, n) {
        return r = At(r), function(a, e) {
          if (e && (Be(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, pt() ? Reflect.construct(r, n || [], At(o).constructor) : r.apply(o, n));
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
      function nr() {
        return nr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = At(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, nr.apply(this, arguments);
      }
      function At(o) {
        return At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, At(o);
      }
      function Qo(o, r) {
        return Qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Qo(o, r);
      }
      var cd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Xe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qo(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.select2_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : nr(At(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (e = this.expandCallbacks("select2", w({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = e.tags = !!e.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
            var i = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
            t.updateValue(i), t.onChange(!0);
          }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), nr(At(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var d = this.sanitize(this.select_values[e[u]]);
              i.push(d), d !== e[u] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.schema.items.enum.push(e);
          var t = this.input.querySelector('option[value="'.concat(e, '"]'));
          return t ? t.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(e, e, !1, !1)).trigger("change"), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), nr(At(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), nr(At(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), nr(At(r.prototype), "destroy", this).call(this);
        } }]) && Ge(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ae);
      function Bn(o) {
        return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Bn(o);
      }
      function dd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, hd(a.key), a);
        }
      }
      function hd(o) {
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
      function pd(o, r, n) {
        return r = ir(r), function(a, e) {
          if (e && (Bn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Qa() ? Reflect.construct(r, n || [], ir(o).constructor) : r.apply(o, n));
      }
      function Qa() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Qa = function() {
          return !!o;
        })();
      }
      function dn() {
        return dn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ir(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, dn.apply(this, arguments);
      }
      function ir(o) {
        return ir = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ir(o);
      }
      function Xo(o, r) {
        return Xo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Xo(o, r);
      }
      var fd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), pd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xo(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.selectize_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.selectize_instance.setValue(this.value), this.onChange(!0)) : dn(ir(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            e = this.expandCallbacks("selectize", w({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = e.create = !!e.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(b) {
              var j = t.selectize_instance.getValue();
              t.updateValue(j), t.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
            var i = this.theme.getHiddenLabel(this.formname);
            this.input.setAttribute("id", this.formname + "-hidden-input"), i.setAttribute("for", this.formname + "-hidden-input"), this.input.parentNode.insertBefore(i, this.input);
            var u = this.selectize_instance.$control[0];
            if (u) {
              var d = this.theme.getHiddenLabel(this.formname);
              d.setAttribute("for", this.formname + "-selectized"), u.appendChild(d);
            }
          }
          dn(ir(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], u = 0; u < e.length; u++)
            if (!(!this.select_values["".concat(e[u])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[u])))) {
              var d = this.sanitize(this.select_values[e[u]]);
              i.push(d), d !== e[u] && (t = !0);
            }
          return this.value = i, t;
        } }, { key: "addNewOption", value: function(e) {
          return this.option_keys.push("".concat(e)), this.option_titles.push("".concat(e)), this.select_values["".concat(e)] = e, this.selectize_instance.addOption({ text: e, value: e }), !0;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), dn(ir(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), dn(ir(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), dn(ir(r.prototype), "destroy", this).call(this);
        } }]) && dd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ae);
      function Nn(o) {
        return Nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Nn(o);
      }
      function yd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, md(a.key), a);
        }
      }
      function md(o) {
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
      function bd(o, r, n) {
        return r = Hr(r), function(a, e) {
          if (e && (Nn(e) === "object" || typeof e == "function")) return e;
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
      function Ti() {
        return Ti = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Hr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ti.apply(this, arguments);
      }
      function Hr(o) {
        return Hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Hr(o);
      }
      function es(o, r) {
        return es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, es(o, r);
      }
      var vd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), bd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && es(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), Ti(Hr(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Autocomplete && !this.autocomplete_instance && (e = this.expandCallbacks("autocomplete", w({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            t.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(e.baseClass), this.autocomplete_dropdown.classList.add("".concat(e.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, e)), Ti(Hr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), Ti(Hr(r.prototype), "destroy", this).call(this);
        } }]) && yd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Dn(o) {
        return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Dn(o);
      }
      function gd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, _d(a.key), a);
        }
      }
      function _d(o) {
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
      function wd(o, r, n) {
        return r = Vr(r), function(a, e) {
          if (e && (Dn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, el() ? Reflect.construct(r, n || [], Vr(o).constructor) : r.apply(o, n));
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
      function Li() {
        return Li = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Li.apply(this, arguments);
      }
      function Vr(o) {
        return Vr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vr(o);
      }
      function ts(o, r) {
        return ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ts(o, r);
      }
      var kd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ts(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "setFileReaderListener", value: function(e) {
          var t = this;
          e.addEventListener("load", function(i) {
            if (t.count === t.current_item_index) t.value[t.count][t.key] = i.target.result;
            else {
              var u = {};
              for (var d in t.parent.schema.properties) u[d] = "";
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
                  var d = new FileReader();
                  e.setFileReaderListener(d), d.readAsDataURL(i.currentTarget.files[u]);
                }
              } else {
                var b = new FileReader();
                b.onload = function(j) {
                  e.value = j.target.result, e.refreshPreview(), e.onChange(!0), b = null;
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
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Li(Vr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Li(Vr(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(e) ? this.value = this.schema.enum[0] : this.value = e, this.input.value = this.value, this.refreshPreview(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), Li(Vr(r.prototype), "destroy", this).call(this);
        } }]) && gd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Fn(o) {
        return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Fn(o);
      }
      function jd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, xd(a.key), a);
        }
      }
      function xd(o) {
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
      function Od(o, r, n) {
        return r = zr(r), function(a, e) {
          if (e && (Fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, tl() ? Reflect.construct(r, n || [], zr(o).constructor) : r.apply(o, n));
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
      function Ai() {
        return Ai = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ai.apply(this, arguments);
      }
      function zr(o) {
        return zr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, zr(o);
      }
      function rs(o, r) {
        return rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, rs(o, r);
      }
      var rl = function(o) {
        function r(e, t) {
          var i;
          return function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = Od(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", w({}, { icon: "", validated: !1, align: "left", action: function(u, d) {
            window.alert('No button action defined for "'.concat(u.path, '"'));
          } }, this.defaults.options.button || {}, this.options.button || {})), i = this.translateProperty(t.text || this.schema.title) || this.key;
          this.input = this.getButton(i, t.icon, i), typeof t.action != "function" ? window.alert('No button action defined for "'.concat(this.path, '"')) : this.input.addEventListener("click", t.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(t.align), this.control.appendChild(this.input), this.container.appendChild(this.control), this.changeHandler = function() {
            e.jsoneditor.validate(e.jsoneditor.getValue()).length > 0 ? e.disable() : e.enable();
          }, t.validated && this.jsoneditor.on("change", this.changeHandler);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Ai(zr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Ai(zr(r.prototype), "disable", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "activate", value: function() {
          this.active = !1, this.enable();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.disable());
        } }, { key: "destroy", value: function() {
          this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, Ai(zr(r.prototype), "destroy", this).call(this);
        } }]) && jd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Mn(o) {
        return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Mn(o);
      }
      function Cd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ed(a.key), a);
        }
      }
      function Ed(o) {
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
      function Sd(o, r, n) {
        return r = Mt(r), function(a, e) {
          if (e && (Mn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, nl() ? Reflect.construct(r, n || [], Mt(o).constructor) : r.apply(o, n));
      }
      function nl() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (nl = function() {
          return !!o;
        })();
      }
      function qr() {
        return qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Mt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, qr.apply(this, arguments);
      }
      function Mt(o) {
        return Mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Mt(o);
      }
      function ns(o, r) {
        return ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ns(o, r);
      }
      var Pd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Sd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ns(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = !!(e = this.applyConstFilter(e));
          var i = this.getValue() !== e;
          this.value = e, this.input.checked = this.value, t || (this.is_dirty = !0), this.onChange(i);
        } }, { key: "register", value: function() {
          qr(Mt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          qr(Mt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          return Math.min(12, Math.max(this.getTitle().length / 7, 2));
        } }, { key: "setOptInCheckbox", value: function() {
          qr(Mt(r.prototype), "setOptInCheckbox", this).call(this), this.optInAppended && (this.container.insertBefore(this.optInContainer, this.container.firstChild), this.optInContainer.style.verticalAlign = "top", this.control.style.marginTop = "0");
        } }, { key: "build", value: function() {
          var e = this;
          this.parent.options.table_row || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.label.htmlFor = this.formname), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.input.id = this.formname, this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.control.style.display = "inline-block", (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.input.addEventListener("change", function(t) {
            t.preventDefault(), t.stopPropagation(), e.value = t.currentTarget.checked, e.is_dirty = !0, e.onChange(!0);
          }), this.container.appendChild(this.control);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, qr(Mt(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, qr(Mt(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), qr(Mt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var d = e.reduce(function(b, j) {
              return j.path === t.path && b.push(j.message), b;
            }, []);
            this.input.controlgroup = this.control, d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Cd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Hn(o) {
        return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hn(o);
      }
      function Td(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ld(a.key), a);
        }
      }
      function Ld(o) {
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
      function Ad(o, r, n) {
        return r = Ht(r), function(a, e) {
          if (e && (Hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, il() ? Reflect.construct(r, n || [], Ht(o).constructor) : r.apply(o, n));
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
      function Ur() {
        return Ur = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ht(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ur.apply(this, arguments);
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
      v(6910);
      var Ri = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ad(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && is(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), u = this.enum_options.length > 0 && this.enum_values.includes(i), d = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || u && (!t || this.isRequired() || d) || (i = this.enum_values[0]), this.value !== i) {
            var b = this.enum_values.indexOf(i);
            u && b !== -1 ? this.input.value = this.enum_options[b] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, t || (this.is_dirty = !0), this.onChange(), this.change();
          }
        } }, { key: "register", value: function() {
          Ur(Ht(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Ur(Ht(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          if (!this.enum_options) return 3;
          for (var e = this.getTitle().length, t = 0; t < this.enum_options.length; t++) e = Math.max(e, this.enum_options[t].length + 4);
          return Math.min(12, Math.max(e / 7, 2));
        } }, { key: "typecast", value: function(e) {
          return this.schema.type === "boolean" ? e === "undefined" || e === void 0 ? void 0 : !!e : this.schema.type === "number" ? 1 * e || 0 : this.schema.type === "integer" ? Math.floor(1 * e || 0) : this.schema.enum && e === void 0 ? void 0 : "".concat(e);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.typecast(this.value);
        } }, { key: "preBuild", value: function() {
          var e, t, i, u, d = this;
          if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.hasPlaceholderOption = ((e = this.schema) === null || e === void 0 || (e = e.options) === null || e === void 0 ? void 0 : e.has_placeholder_option) || !1, this.placeholderOptionText = ((t = this.schema) === null || t === void 0 || (t = t.options) === null || t === void 0 ? void 0 : t.placeholder_option_text) || " ", this.enforceConst && this.schema.const) {
            var b = this.schema.const;
            this.enum_options = ["".concat(b)], this.enum_display = ["".concat(this.translateProperty(b) || b)], this.enum_values = [this.typecast(b)];
          } else if (this.schema.enum) {
            var j = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(S, I) {
              d.enum_options[I] = "".concat(S), d.enum_display[I] = "".concat(d.translateProperty(j[I]) || S), d.enum_values[I] = d.typecast(S);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = w({}, this.schema.enumSource[i]);
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
            for (var d = 0; d < this.enumSource.length; d++) if (Array.isArray(this.enumSource[d])) i = i.concat(this.enumSource[d]), u = u.concat(this.enumSource[d]);
            else {
              var b = [];
              if (b = Array.isArray(this.enumSource[d].source) ? this.enumSource[d].source : e[this.enumSource[d].source]) {
                if (this.enumSource[d].slice && (b = Array.prototype.slice.apply(b, this.enumSource[d].slice)), this.enumSource[d].filter) {
                  var j = [];
                  for (t = 0; t < b.length; t++) this.enumSource[d].filter({ i: t, item: b[t], watched: e }) && j.push(b[t]);
                  b = j;
                }
                var S = [], I = [];
                for (t = 0; t < b.length; t++) {
                  var W = b[t];
                  this.enumSource[d].value ? I[t] = this.typecast(this.enumSource[d].value({ i: t, item: W })) : I[t] = b[t], this.enumSource[d].title ? S[t] = this.enumSource[d].title({ i: t, item: W }) : S[t] = I[t];
                }
                this.enumSource[d].sort && (function(te, ye, _e) {
                  te.map(function(we, Ie) {
                    return { v: we, t: ye[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    te[Ie] = we.v, ye[Ie] = we.t;
                  });
                }).bind(null, I, S, this.enumSource[d].sort === "desc" ? 1 : -1)(), i = i.concat(I), u = u.concat(S);
              }
            }
            var J = this.value;
            this.theme.setSelectOptions(this.input, i, u), this.enum_options = i, this.enum_display = u, this.enum_values = i, i.includes(J) || this.jsoneditor.options.enum_source_value_auto_select !== !1 ? (this.input.value = J, this.value = J) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path));
          }
          Ur(Ht(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Ur(Ht(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Ur(Ht(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Ur(Ht(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var d = e.reduce(function(b, j) {
              return j.path === t.path && b.push(j.message), b;
            }, []);
            d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Td(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Vn(o) {
        return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vn(o);
      }
      function Rd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Id(a.key), a);
        }
      }
      function Id(o) {
        var r = function(n, a) {
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
      function Bd(o, r, n) {
        return r = Vt(r), function(a, e) {
          if (e && (Vn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ol() ? Reflect.construct(r, n || [], Vt(o).constructor) : r.apply(o, n));
      }
      function ol() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ol = function() {
          return !!o;
        })();
      }
      function $r() {
        return $r = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, $r.apply(this, arguments);
      }
      function Vt(o) {
        return Vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vt(o);
      }
      function os(o, r) {
        return os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, os(o, r);
      }
      var sl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Bd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && os(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else $r(Vt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", w({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, e);
          }
          $r(Vt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          if ($r(Vt(r.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var t = this.enum_options.map(function(i, u) {
              return { value: i, label: e.enum_display[u] };
            });
            this.choices_instance.setChoices(t, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), $r(Vt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), $r(Vt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), $r(Vt(r.prototype), "destroy", this).call(this);
        } }]) && Rd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ri);
      function hn(o) {
        return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hn(o);
      }
      function Nd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Dd(a.key), a);
        }
      }
      function Dd(o) {
        var r = function(n, a) {
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
      function Fd(o, r, n) {
        return r = Gr(r), function(a, e) {
          if (e && (hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, al() ? Reflect.construct(r, n || [], Gr(o).constructor) : r.apply(o, n));
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
      function Ii() {
        return Ii = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Gr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ii.apply(this, arguments);
      }
      function Gr(o) {
        return Gr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Gr(o);
      }
      function ss(o, r) {
        return ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ss(o, r);
      }
      sl.rules = { ".choices > *": "box-sizing:border-box" };
      var Md = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ss(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (Ii(Gr(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && hn(this.options.flatpickr) === "object")) {
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
              var d = this.input.parentNode, b = this.input.nextSibling, j = this.theme.getInputGroup(this.input, t);
              j !== void 0 ? (this.options.flatpickr.inline = !1, d.insertBefore(j, b), e = j) : this.options.flatpickr.wrap = !1;
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
          if (e = this.applyConstFilter(e), this.schema.type === "string") Ii(Gr(r.prototype), "setValue", this).call(this, e, t, i), this.flatpickr && this.flatpickr.setDate(e);
          else if (e > 0) {
            var u = new Date(1e3 * e), d = u.getFullYear(), b = this.zeroPad(u.getMonth() + 1), j = this.zeroPad(u.getDate()), S = this.zeroPad(u.getHours()), I = this.zeroPad(u.getMinutes()), W = this.zeroPad(u.getSeconds()), J = [d, b, j].join("-"), te = [S, I, W].join(":"), ye = "".concat(J, "T").concat(te);
            this.schema.format === "date" ? ye = J : this.schema.format === "time" && (ye = te), this.input.value = ye, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(ye);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Ii(Gr(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && Nd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function zn(o) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(o);
      }
      function Hd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Vd(a.key), a);
        }
      }
      function Vd(o) {
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
      function zd(o, r, n) {
        return r = zt(r), function(a, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ll() ? Reflect.construct(r, n || [], zt(o).constructor) : r.apply(o, n));
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
      function Wr() {
        return Wr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Wr.apply(this, arguments);
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
      var qd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && as(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.currentEditor] && this.editors[this.currentEditor].register();
          }
          Wr(zt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Wr(zt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
          Wr(zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable();
          Wr(zt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function() {
          var e = this, t = this.getWatchedFieldValues();
          if (t) {
            var i = document.location.origin + document.location.pathname + this.template(t);
            this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), this.editors.forEach(function(u, d) {
              u && (e.currentEditor === d ? u.container.style.display = "" : u.container.style.display = "none");
            }), this.refreshValue(), this.onChange(!0);
          }
        } }, { key: "buildChildEditor", value: function(e) {
          this.refs[e] = this.editors.length;
          var t = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(t);
          var i = w({}, this.schema, this.jsoneditor.refs[e]), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
          this.editors.push(d), d.preBuild(), d.build(), d.postBuild();
        } }, { key: "preBuild", value: function() {
          var e;
          for (this.refs = {}, this.editors = [], this.currentEditor = "", e = 0; e < this.schema.links.length; e++) if (this.schema.links[e].rel.toLowerCase() === "describedby") {
            this.template = this.jsoneditor.compileTemplate(this.schema.links[e].href, this.template_engine);
            break;
          }
          this.schema.links = this.schema.links.slice(0, e).concat(this.schema.links.slice(e + 1)), this.schema.links.length === 0 && delete this.schema.links, this.baseSchema = w({}, this.schema);
        } }, { key: "build", value: function() {
          this.editor_holder = document.createElement("div"), this.container.appendChild(this.editor_holder), this.switchEditor();
        } }, { key: "onWatchedFieldChange", value: function() {
          this.switchEditor();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.currentEditor] && this.refreshValue(), Wr(zt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "refreshValue", value: function() {
          this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue());
        } }, { key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(e, t), this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), Wr(zt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          this.editors.forEach(function(t) {
            t && t.showValidationErrors(e);
          });
        } }]) && Hd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function pn(o) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pn(o);
      }
      function ul(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function Ud(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, $d(a.key), a);
        }
      }
      function $d(o) {
        var r = function(n, a) {
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
      function Gd(o, r, n) {
        return r = Jr(r), function(a, e) {
          if (e && (pn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, cl() ? Reflect.construct(r, n || [], Jr(o).constructor) : r.apply(o, n));
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
      function Bi() {
        return Bi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Bi.apply(this, arguments);
      }
      function Jr(o) {
        return Jr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jr(o);
      }
      function ls(o, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ls(o, r);
      }
      var Wd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
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
          this.always_disabled || (this.switcher.disabled = !1, Bi(Jr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.switcher.disabled = !0, Bi(Jr(r.prototype), "disable", this).call(this);
        } }, { key: "getHTML", value: function(e) {
          var t, i, u = this;
          if (e === null) return "<em>null</em>";
          if (pn(e) === "object") {
            var d = "";
            return t = e, i = function(b, j) {
              var S = u.getHTML(j);
              Array.isArray(e) || (S = "<div><em>".concat(b, "</em>: ").concat(S, "</div>")), d += "<li>".concat(S, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(b, j) {
              return i(j, b);
            }) : Object.entries(t).forEach(function(b) {
              var j, S, I = (S = 2, function(te) {
                if (Array.isArray(te)) return te;
              }(j = b) || function(te, ye) {
                var _e = te == null ? null : typeof Symbol < "u" && te[Symbol.iterator] || te["@@iterator"];
                if (_e != null) {
                  var we, Ie, De, He, ve = [], xe = !0, Ze = !1;
                  try {
                    if (De = (_e = _e.call(te)).next, ye === 0) {
                      if (Object(_e) !== _e) return;
                      xe = !1;
                    } else for (; !(xe = (we = De.call(_e)).done) && (ve.push(we.value), ve.length !== ye); xe = !0) ;
                  } catch (ot) {
                    Ze = !0, Ie = ot;
                  } finally {
                    try {
                      if (!xe && _e.return != null && (He = _e.return(), Object(He) !== He)) return;
                    } finally {
                      if (Ze) throw Ie;
                    }
                  }
                  return ve;
                }
              }(j, S) || function(te, ye) {
                if (te) {
                  if (typeof te == "string") return ul(te, ye);
                  var _e = Object.prototype.toString.call(te).slice(8, -1);
                  return _e === "Object" && te.constructor && (_e = te.constructor.name), _e === "Map" || _e === "Set" ? Array.from(te) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? ul(te, ye) : void 0;
                }
              }(j, S) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), W = I[0], J = I[1];
              return i(W, J);
            }), d = Array.isArray(e) ? "<ol>".concat(d, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(d, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Bi(Jr(r.prototype), "destroy", this).call(this);
        } }]) && Ud(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function fn(o) {
        return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fn(o);
      }
      function Jd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Kd(a.key), a);
        }
      }
      function Kd(o) {
        var r = function(n, a) {
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
      function Zd(o, r, n) {
        return r = qt(r), function(a, e) {
          if (e && (fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, dl() ? Reflect.construct(r, n || [], qt(o).constructor) : r.apply(o, n));
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
      function Kr() {
        return Kr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = qt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Kr.apply(this, arguments);
      }
      function qt(o) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, qt(o);
      }
      function us(o, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, us(o, r);
      }
      var Yd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && us(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          Kr(qt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Kr(qt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), (!this.template || i) && (e == null ? e = "" : fn(e) === "object" ? e = JSON.stringify(e) : typeof e != "string" && (e = "".concat(e)), e !== this.serialized)) {
            var u = this.sanitize(e);
            if (this.input.value !== u) {
              this.input.value = u;
              var d = i || this.getValue() !== e;
              this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(d);
            }
          }
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "enable", value: function() {
          Kr(qt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Kr(qt(r.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Kr(qt(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), Kr(qt(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var e = this.expandCallbacks("template", { template: this.schema.template });
            typeof e.template == "function" ? this.template = e.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && Jd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function qn(o) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(o);
      }
      function Qd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Xd(a.key), a);
        }
      }
      function Xd(o) {
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
      function eh(o, r, n) {
        return r = lo(r), function(a, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, hl() ? Reflect.construct(r, n || [], lo(o).constructor) : r.apply(o, n));
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
      function lo(o) {
        return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lo(o);
      }
      function cs(o, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, cs(o, r);
      }
      var th = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), eh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
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
        } }]) && Qd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(rl);
      function Un(o) {
        return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Un(o);
      }
      function rh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, nh(a.key), a);
        }
      }
      function nh(o) {
        var r = function(n, a) {
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
      function ih(o, r, n) {
        return r = $n(r), function(a, e) {
          if (e && (Un(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, pl() ? Reflect.construct(r, n || [], $n(o).constructor) : r.apply(o, n));
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
      function ds() {
        return ds = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $n(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ds.apply(this, arguments);
      }
      function $n(o) {
        return $n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $n(o);
      }
      function hs(o, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, hs(o, r);
      }
      var fl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ih(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (ds($n(r.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
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
        } }]) && rh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Gn(o) {
        return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gn(o);
      }
      function oh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, sh(a.key), a);
        }
      }
      function sh(o) {
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
      function ah(o, r, n) {
        return r = uo(r), function(a, e) {
          if (e && (Gn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, yl() ? Reflect.construct(r, n || [], uo(o).constructor) : r.apply(o, n));
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
      function uo(o) {
        return uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, uo(o);
      }
      function ps(o, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ps(o, r);
      }
      var ml = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(P), i = parseInt(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && oh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fl);
      function Wn(o) {
        return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Wn(o);
      }
      function lh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, uh(a.key), a);
        }
      }
      function uh(o) {
        var r = function(n, a) {
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
      function ch(o, r, n) {
        return r = Jn(r), function(a, e) {
          if (e && (Wn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, bl() ? Reflect.construct(r, n || [], Jn(o).constructor) : r.apply(o, n));
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
      function fs() {
        return fs = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, fs.apply(this, arguments);
      }
      function Jn(o) {
        return Jn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jn(o);
      }
      function ys(o, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ys(o, r);
      }
      var dh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ch(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          if (fs(Jn(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = w(this.options, this.schema.options || {});
        } }]) && lh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Kn(o) {
        return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Kn(o);
      }
      function hh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ph(a.key), a);
        }
      }
      function ph(o) {
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
      function fh(o, r, n) {
        return r = Ut(r), function(a, e) {
          if (e && (Kn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, vl() ? Reflect.construct(r, n || [], Ut(o).constructor) : r.apply(o, n));
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
      function Zr() {
        return Zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Zr.apply(this, arguments);
      }
      function Ut(o) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(o);
      }
      function ms(o, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ms(o, r);
      }
      var yh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), fh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Zr(Ut(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.jodit_instance && this.jodit_instance.setEditorValue(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Zr(Ut(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", w({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            t.value = t.jodit_instance.getEditorValue(), t.is_dirty = !0, t.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : Zr(Ut(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), Zr(Ut(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), Zr(Ut(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), Zr(Ut(r.prototype), "destroy", this).call(this);
        } }]) && hh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function mh(o, r, n, a) {
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
      function gl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function bh(o, r, n) {
        return (r = _l(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function $t(o) {
        return $t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $t(o);
      }
      function Ni(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], j = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(j = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); j = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!j && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || bs(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ct(o) {
        return function(r) {
          if (Array.isArray(r)) return vs(r);
        }(o) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(o) || bs(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function bs(o, r) {
        if (o) {
          if (typeof o == "string") return vs(o, r);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set" ? Array.from(o) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vs(o, r) : void 0;
        }
      }
      function vs(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function vh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, _l(a.key), a);
        }
      }
      function _l(o) {
        var r = function(n, a) {
          if ($t(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($t(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return $t(r) == "symbol" ? r : r + "";
      }
      v(8431);
      var wl = function() {
        return o = function n(a, e, t, i) {
          (function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = a, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(u, d, b) {
            var j = [];
            if (u.dependentRequired !== void 0) {
              var S = [];
              Object.keys(u.dependentRequired).forEach(function(I) {
                if (d[I] !== void 0) {
                  var W = u.dependentRequired[I];
                  S = W.filter(function(J) {
                    return !x(d, J);
                  });
                }
              }), S.length > 0 && j.push({ message: "Must have the required properties: " + S.join(", "), path: b });
            }
            return j;
          }, dependentSchemas: function(u, d, b) {
            var j = this, S = [];
            return Object.keys(u.dependentSchemas).forEach(function(I) {
              if (d[I] !== void 0) {
                var W = u.dependentSchemas[I], J = j._validateSchema(W, d, b);
                S = [].concat(ct(S), ct(J));
              }
            }), S;
          }, contains: function(u, d, b) {
            var j = this, S = [], I = 0;
            d.forEach(function(J) {
              j._validateSchema(u.contains, J, b).length === 0 && I++;
            });
            var W = I === 0;
            return u.minContains !== void 0 ? I < u.minContains && S.push({ message: this.translate("error_minContains", [I, u.minContains], u), path: b }) : W && S.push({ message: this.translate("error_contains", null, u), path: b }), u.maxContains !== void 0 && I > u.maxContains && S.push({ message: this.translate("error_maxContains", [I, u.maxContains], u), path: b }), S;
          }, if: function(u, d, b) {
            if (u.then === void 0 && u.else === void 0) return [];
            var j = this._validateSchema(u.if, d, b), S = [], I = [];
            return u.then !== void 0 && (S = this._validateSchema(u.then, d, b)), u.else !== void 0 && (I = this._validateSchema(u.else, d, b)), u.if === !0 ? S : u.if === !1 ? I : j.length === 0 ? S : j.length > 0 ? I : [];
          }, const: function(u, d, b) {
            return JSON.stringify(u.const) === JSON.stringify(d) ? [] : [{ path: b, property: "const", message: this.translate("error_const", null, u) }];
          }, enum: function(u, d, b) {
            var j = JSON.stringify(d);
            return u.enum.some(function(S) {
              return j === JSON.stringify(S);
            }) ? [] : [{ path: b, property: "enum", message: this.translate("error_enum", null, u) }];
          }, extends: function(u, d, b) {
            var j = this;
            return u.extends.reduce(function(S, I) {
              return S.push.apply(S, ct(j._validateSchema(I, d, b))), S;
            }, []);
          }, allOf: function(u, d, b) {
            var j = this;
            return u.allOf.reduce(function(S, I) {
              return S.push.apply(S, ct(j._validateSchema(I, d, b))), S;
            }, []);
          }, anyOf: function(u, d, b) {
            var j = this;
            return u.anyOf.some(function(S) {
              return !j._validateSchema(S, d, b).length;
            }) ? [] : [{ path: b, property: "anyOf", message: this.translate("error_anyOf", null, u) }];
          }, oneOf: function(u, d, b) {
            var j = this, S = 0, I = [];
            u.oneOf.forEach(function(J, te) {
              var ye = j._validateSchema(J, d, b);
              ye.length || S++, ye.forEach(function(_e) {
                _e.path = "".concat(b, ".oneOf[").concat(te, "]").concat(_e.path.substr(b.length));
              }), I.push.apply(I, ct(ye));
            });
            var W = [];
            return S !== 1 && (W.push({ path: b, property: "oneOf", message: this.translate("error_oneOf", [S], u) }), W.push.apply(W, I)), W;
          }, not: function(u, d, b) {
            return this._validateSchema(u.not, d, b).length ? [] : [{ path: b, property: "not", message: this.translate("error_not", null, u) }];
          }, type: function(u, d, b) {
            var j = this;
            if (Array.isArray(u.type)) {
              if (!u.type.some(function(S) {
                return j._checkType(S, d);
              })) return [{ path: b, property: "type", message: this.translate("error_type_union", null, u) }];
            } else if (["date", "time", "datetime-local"].includes(u.format) && u.type === "integer") {
              if (!this._checkType("string", "".concat(d))) return [{ path: b, property: "type", message: this.translate("error_type", [u.format], u) }];
            } else if (!this._checkType(u.type, d)) return [{ path: b, property: "type", message: this.translate("error_type", [u.type], u) }];
            return [];
          }, disallow: function(u, d, b) {
            var j = this;
            if (Array.isArray(u.disallow)) {
              if (u.disallow.some(function(S) {
                return j._checkType(S, d);
              })) return [{ path: b, property: "disallow", message: this.translate("error_disallow_union", null, u) }];
            } else if (this._checkType(u.disallow, d)) return [{ path: b, property: "disallow", message: this.translate("error_disallow", [u.disallow], u) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(u, d, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, d, b);
          }, divisibleBy: function(u, d, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, d, b);
          }, maximum: function(u, d, b) {
            var j = u.exclusiveMaximum ? d < u.maximum : d <= u.maximum;
            return window.math ? j = window.math[u.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(d), window.math.bignumber(u.maximum)) : window.Decimal && (j = new window.Decimal(d)[u.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(u.maximum))), j ? [] : [{ path: b, property: "maximum", message: this.translate(u.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [u.maximum], u) }];
          }, minimum: function(u, d, b) {
            var j = u.exclusiveMinimum ? d > u.minimum : d >= u.minimum;
            return window.math ? j = window.math[u.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(d), window.math.bignumber(u.minimum)) : window.Decimal && (j = new window.Decimal(d)[u.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(u.minimum))), j ? [] : [{ path: b, property: "minimum", message: this.translate(u.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [u.minimum], u) }];
          } }, this._validateStringSubSchema = { maxLength: function(u, d, b) {
            var j = [];
            return "".concat(d).length > u.maxLength && j.push({ path: b, property: "maxLength", message: this.translate("error_maxLength", [u.maxLength], u) }), j;
          }, minLength: function(u, d, b) {
            return "".concat(d).length < u.minLength ? [{ path: b, property: "minLength", message: this.translate(u.minLength === 1 ? "error_notempty" : "error_minLength", [u.minLength], u) }] : [];
          }, pattern: function(u, d, b) {
            return new RegExp(u.pattern).test(d) ? [] : [{ path: b, property: "pattern", message: u.options && u.options.patternmessage ? u.options.patternmessage : this.translate("error_pattern", [u.pattern], u) }];
          } }, this._validateArraySubSchema = { items: function(u, d, b) {
            var j = this, S = [];
            if (Array.isArray(u.items)) for (var I = 0; I < d.length; I++) if (u.items[I]) S.push.apply(S, ct(this._validateSchema(u.items[I], d[I], "".concat(b, ".").concat(I))));
            else {
              if (u.additionalItems === !0) break;
              if (!u.additionalItems) {
                if (u.additionalItems === !1) {
                  S.push({ path: b, property: "additionalItems", message: this.translate("error_additionalItems", null, u) });
                  break;
                }
                break;
              }
              S.push.apply(S, ct(this._validateSchema(u.additionalItems, d[I], "".concat(b, ".").concat(I))));
            }
            else d.forEach(function(W, J) {
              S.push.apply(S, ct(j._validateSchema(u.items, W, "".concat(b, ".").concat(J))));
            });
            return S;
          }, maxItems: function(u, d, b) {
            return d.length > u.maxItems ? [{ path: b, property: "maxItems", message: this.translate("error_maxItems", [u.maxItems], u) }] : [];
          }, minItems: function(u, d, b) {
            return d.length < u.minItems ? [{ path: b, property: "minItems", message: this.translate("error_minItems", [u.minItems], u) }] : [];
          }, uniqueItems: function(u, d, b) {
            for (var j = {}, S = 0; S < d.length; S++) {
              var I = JSON.stringify(d[S]);
              if (j[I]) return [{ path: b, property: "uniqueItems", message: this.translate("error_uniqueItems", null, u) }];
              j[I] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(u, d, b) {
            return Object.keys(d).length > u.maxProperties ? [{ path: b, property: "maxProperties", message: this.translate("error_maxProperties", [u.maxProperties], u) }] : [];
          }, minProperties: function(u, d, b) {
            return Object.keys(d).length < u.minProperties ? [{ path: b, property: "minProperties", message: this.translate("error_minProperties", [u.minProperties], u) }] : [];
          }, required: function(u, d, b) {
            var j = this, S = [];
            return Array.isArray(u.required) && u.required.forEach(function(I) {
              if (d[I] === void 0) {
                var W = j.jsoneditor.getEditor("".concat(b, ".").concat(I));
                W && W.dependenciesFulfilled === !1 || W && ["button", "info"].includes(W.schema.format || W.schema.type) || S.push({ path: b, property: "required", message: j.translate("error_required", [u && u.properties && u.properties[I] && u.properties[I].title ? u.properties[I].title : I], u) });
              }
            }), S;
          }, properties: function(u, d, b, j) {
            var S = this, I = [];
            return Object.entries(u.properties).forEach(function(W) {
              var J = Ni(W, 2), te = J[0], ye = J[1];
              j[te] = !0, I.push.apply(I, ct(S._validateSchema(ye, d[te], "".concat(b, ".").concat(te))));
            }), I;
          }, patternProperties: function(u, d, b, j) {
            var S = this, I = [];
            return Object.entries(u.patternProperties).forEach(function(W) {
              var J = Ni(W, 2), te = J[0], ye = J[1], _e = new RegExp(te);
              Object.entries(d).forEach(function(we) {
                var Ie = Ni(we, 2), De = Ie[0], He = Ie[1];
                _e.test(De) && (j[De] = !0, I.push.apply(I, ct(S._validateSchema(ye, He, "".concat(b, ".").concat(De)))));
              });
            }), I;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(u, d, b, j) {
            for (var S, I = this, W = [], J = Object.keys(d), te = null, ye = function() {
              var we = "";
              return te = J[_e], typeof u.propertyNames == "boolean" ? u.propertyNames === !0 ? 0 : (W.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_false", [te], u) }), 1) : Object.entries(u.propertyNames).every(function(Ie) {
                var De = Ni(Ie, 2), He = De[0], ve = De[1], xe = !1;
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
                    if (ve.forEach(function(Ze) {
                      Ze === te && (xe = !0);
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
                    return W.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_unsupported", [He], u) }), !1;
                }
                return W.push({ path: b, property: "propertyNames", message: I.translate(we, [te], u) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < J.length && ((S = ye()) === 0 || S !== 1); _e++) ;
            return W;
          }, additionalProperties: function(u, d, b, j) {
            for (var S = [], I = Object.keys(d), W = 0; W < I.length; W++) {
              var J = I[W];
              if (!j[J]) {
                if (!u.additionalProperties) {
                  S.push({ path: b, property: "additionalProperties", message: this.translate("error_additional_properties", [J], u) });
                  break;
                }
                if (u.additionalProperties === !0) break;
                S.push.apply(S, ct(this._validateSchema(u.additionalProperties, d[J], "".concat(b, ".").concat(J))));
              }
            }
            return S;
          }, dependencies: function(u, d, b) {
            var j = this, S = [];
            return Object.entries(u.dependencies).forEach(function(I) {
              var W = Ni(I, 2), J = W[0], te = W[1];
              d[J] !== void 0 && (Array.isArray(te) ? te.forEach(function(ye) {
                d[ye] === void 0 && S.push({ path: b, property: "dependencies", message: j.translate("error_dependency", [ye], u) });
              }) : S.push.apply(S, ct(j._validateSchema(te, d, b))));
            }), S;
          } };
        }, r = [{ key: "fitTest", value: function(n, a) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if ($t(n) === "object" && n !== null) {
            var i = this._getSchema(a);
            if (i.anyOf) {
              var u, d = function(te) {
                for (var ye = 1; ye < arguments.length; ye++) {
                  var _e = arguments[ye] != null ? arguments[ye] : {};
                  ye % 2 ? gl(Object(_e), !0).forEach(function(we) {
                    bh(te, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(te, Object.getOwnPropertyDescriptors(_e)) : gl(Object(_e)).forEach(function(we) {
                    Object.defineProperty(te, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return te;
              }({}, t), b = function(te, ye) {
                var _e = typeof Symbol < "u" && te[Symbol.iterator] || te["@@iterator"];
                if (!_e) {
                  if (Array.isArray(te) || (_e = bs(te))) {
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
                for (b.s(); !(u = b.n()).done; ) {
                  var j = u.value, S = this.fitTest(n, j, e);
                  (S.match > d.match || S.match === d.match && S.extra < d.extra) && (d = S);
                }
              } catch (te) {
                b.e(te);
              } finally {
                b.f();
              }
              return d;
            }
            var I = this._getSchema(a).properties;
            for (var W in I) if (x(I, W)) {
              if ($t(n[W]) === "object" && $t(I[W]) === "object" && $t(I[W].properties) === "object") {
                var J = this.fitTest(n[W], I[W], e / 100);
                t.match += J.match, t.extra += J.extra;
              }
              n[W] !== void 0 && (t.match += e);
            } else t.extra += e;
          }
          return t;
        } }, { key: "_getSchema", value: function(n) {
          return n === void 0 ? w({}, this.jsoneditor.expandRefs(this.schema)) : n;
        } }, { key: "validate", value: function(n) {
          return this._validateSchema(this.schema, n);
        } }, { key: "_validateSchema", value: function(n, a, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = w({}, this.jsoneditor.expandRefs(n)), a === void 0 ? this._validateV3Required(n, a, e) : (Object.keys(n).forEach(function(u) {
            t._validateSubSchema[u] && i.push.apply(i, ct(t._validateSubSchema[u].call(t, n, a, e)));
          }), i.push.apply(i, ct(this._validateByValueType(n, a, e))), n.links && n.links.forEach(function(u, d) {
            u.rel && u.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, d), i.push.apply(i, ct(t._validateSchema(n, a, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, ct(this._validateDateTimeSubSchema(n, a, e))), ["uuid"].includes(n.format) && i.push.apply(i, ct(this._validateUUIDSchema(n, a, e))), i.push.apply(i, ct(this._validateCustomValidator(n, a, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, a) {
          var e = n.links[a].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), u = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, a).concat(n.links.slice(a + 1)), w({}, n, this.jsoneditor.refs[u]);
        } }, { key: "_validateV3Required", value: function(n, a, e) {
          return (n.required !== void 0 && n.required === !0 || n.required === void 0 && this.jsoneditor.options.required_by_default === !0) && n.type !== "info" ? [{ path: e, property: "required", message: this.translate("error_notset", null, n) }] : [];
        } }, { key: "_validateByValueType", value: function(n, a, e) {
          var t = this, i = [];
          if (a === null) return i;
          if (typeof a == "number") Object.keys(n).forEach(function(d) {
            t._validateNumberSubSchema[d] && i.push.apply(i, ct(t._validateNumberSubSchema[d].call(t, n, a, e)));
          });
          else if (typeof a == "string") Object.keys(n).forEach(function(d) {
            t._validateStringSubSchema[d] && i.push.apply(i, ct(t._validateStringSubSchema[d].call(t, n, a, e)));
          });
          else if (Array.isArray(a)) Object.keys(n).forEach(function(d) {
            t._validateArraySubSchema[d] && i.push.apply(i, ct(t._validateArraySubSchema[d].call(t, n, a, e)));
          });
          else if ($t(a) === "object") {
            var u = {};
            Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema[d] && i.push.apply(i, ct(t._validateObjectSubSchema[d].call(t, n, a, e, u)));
            }), n.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || n.oneOf || n.anyOf || n.allOf || (n.additionalProperties = !1), Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema2[d] !== void 0 && i.push.apply(i, ct(t._validateObjectSubSchema2[d].call(t, n, a, e, u)));
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
          if (n.type === "integer") return function(d, b, j) {
            return 1 * b < 1 ? [{ path: j, property: "format", message: t.translate("error_invalid_epoch", null, d) }] : b !== Math.abs(parseInt(b)) ? [{ path: j, property: "format", message: t.translate("error_".concat(d.format.replace(/-/g, "_")), [u], d) }] : [];
          }(n, a, e);
          if (i && i.flatpickr) {
            if (i) return function(d, b, j, S) {
              if (b !== "") {
                var I;
                if (S.flatpickr.config.mode !== "single") {
                  var W = S.flatpickr.config.mode === "range" ? S.flatpickr.l10n.rangeSeparator : ", ";
                  I = S.flatpickr.selectedDates.map(function(te) {
                    return S.flatpickr.formatDate(te, S.flatpickr.config.dateFormat);
                  }).join(W);
                }
                try {
                  if (I) {
                    if (I !== b) throw new Error("".concat(S.flatpickr.config.mode, " mismatch"));
                  } else if (S.flatpickr.formatDate(S.flatpickr.parseDate(b, S.flatpickr.config.dateFormat), S.flatpickr.config.dateFormat) !== b) throw new Error("mismatch");
                } catch {
                  var J = S.flatpickr.config.errorDateFormat !== void 0 ? S.flatpickr.config.errorDateFormat : S.flatpickr.config.dateFormat;
                  return [{ path: j, property: "format", message: t.translate("error_".concat(S.format.replace(/-/g, "_")), [J], d) }];
                }
              }
              return [];
            }(n, a, e, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[n.format].test(a)) return [{ path: e, property: "format", message: this.translate("error_".concat(n.format.replace(/-/g, "_")), [u], n) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(n, a, e) {
          var t = this, i = [];
          i.push.apply(i, ct(mh.call(this, n, a, e, this.translate)));
          var u = function(d) {
            i.push.apply(i, ct(d.call(t, n, a, e)));
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
            return t !== null && !Array.isArray(t) && $t(t) === "object";
          }, null: function(t) {
            return t === null;
          } };
          return typeof n == "string" ? !e[n] || e[n](a) : !this._validateSchema(n, a).length;
        } }], r && vh(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function yn(o) {
        return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yn(o);
      }
      function gh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, _h(a.key), a);
        }
      }
      function _h(o) {
        var r = function(n, a) {
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
      function wh(o, r, n) {
        return r = Gt(r), function(a, e) {
          if (e && (yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, kl() ? Reflect.construct(r, n || [], Gt(o).constructor) : r.apply(o, n));
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
      function Yr() {
        return Yr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Gt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Yr.apply(this, arguments);
      }
      function Gt(o) {
        return Gt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Gt(o);
      }
      function gs(o, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, gs(o, r);
      }
      var kh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.type] && this.editors[this.type].register();
          }
          Yr(Gt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Yr(Gt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
            this.switcher.disabled = !1, Yr(Gt(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          if (e && (this.always_disabled = !0), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable(e);
          this.switcher.disabled = !0, Yr(Gt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function(e) {
          var t = this;
          this.lastType = this.type, this.editors[e] || this.buildChildEditor(e);
          var i = this.getValue();
          this.type = e, this.register(), this.editors.forEach(function(u, d) {
            var b, j;
            u && (t.type === d ? (t.keep_only_existing_values && (b = u.getValue(), j = i, Object.keys(j).forEach(function(S) {
              R.includes(S) || S in b && (b[S] = j[S]);
            }), i = b), (t.keep_values || t.if) && u.setValue(i, !0), u.container.style.display = "") : u.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, u = this, d = this.types[e], b = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(b), typeof d == "string" ? (i = w({}, this.schema)).type = d : (i = w({}, this.schema, d), i = this.jsoneditor.expandRefs(i), d && d.required && Array.isArray(d.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(d.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
          var j = this.jsoneditor.getEditorClass(i);
          this.editors[e] = this.jsoneditor.createEditor(j, { jsoneditor: this.jsoneditor, schema: i, container: b, path: this.path, parent: this, required: !0 }), this.editors[e].preBuild(), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].header && this.theme.visuallyHidden(this.editors[e].header), this.editors[e].option = this.switcher_options[e], b.addEventListener("change_header_text", function() {
            u.refreshHeaderText();
          }), e !== this.type && (b.style.display = "none");
        } }, { key: "preBuild", value: function() {
          if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, this.jsoneditor.options.keep_oneof_values !== void 0 && (this.keep_values = this.jsoneditor.options.keep_oneof_values), this.options.keep_oneof_values !== void 0 && (this.keep_values = this.options.keep_oneof_values), this.keep_only_existing_values = !1, this.jsoneditor.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.jsoneditor.options.keep_only_existing_values), this.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.options.keep_only_existing_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
          else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
          else if (this.schema.if) this.if = !0, this.ifSchema = JSON.parse(JSON.stringify(this.schema.if)), this.thenSchema = { title: "then" }, this.elseSchema = { title: "else" }, this.types = [], this.schema.then && F(this.thenSchema, this.schema, this.schema.then), this.schema.else && F(this.elseSchema, this.schema, this.schema.else), this.types.push(this.thenSchema), this.types.push(this.elseSchema), this.types.forEach(function(i) {
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
          this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired()), this.switcher = this.theme.getSwitcher(this.display_text), this.switcher.setAttribute("id", this.formname + "switcher"), this.switcherLabel = this.theme.getHiddenLabel(this.formname + " switcher"), this.switcherLabel.setAttribute("for", this.formname + "switcher"), this.if || (this.container.appendChild(this.header), t.appendChild(this.switcherLabel), t.appendChild(this.switcher)), this.switcher.addEventListener("change", function(u) {
            u.preventDefault(), u.stopPropagation(), e.switchEditor(e.display_text.indexOf(u.currentTarget.value)), e.onChange(!0);
          }), this.editor_holder = document.createElement("div"), t.appendChild(this.editor_holder);
          var i = {};
          this.jsoneditor.options.custom_validators && (i.custom_validators = this.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), this.types.forEach(function(u, d) {
            var b;
            e.editors[d] = !1, typeof u == "string" ? (b = w({}, e.schema)).type = u : (b = w({}, e.schema, u), u.required && Array.isArray(u.required) && e.schema.required && Array.isArray(e.schema.required) && (b.required = e.schema.required.concat(u.required))), e.validators[d] = new wl(e.jsoneditor, b, i, e.defaults);
          }), this.jsoneditor.on("change", function() {
            e.switchIf();
          }), this.switchEditor(0);
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), Yr(Gt(r.prototype), "onChildEditorChange", this).call(this, e, t);
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
          var u = this.type, d = { match: 0, extra: 0, i: this.type }, b = { match: 0, i: null };
          this.validators.forEach(function(I, W) {
            var J = null;
            i.anyOf !== void 0 && i.anyOf && (J = I.fitTest(e), (d.match < J.match || d.match === J.match && d.extra > J.extra) && ((d = J).i = W)), I.validate(e).length || b.i !== null ? d = b : (b.i = W, J !== null && (b.match = J.match));
          });
          var j = b.i;
          this.anyOf !== void 0 && this.anyOf && b.match < d.match && (j = d.i), this.if && (j = this.getIfType(e)), j === null && (j = this.type), this.type = j, this.switcher.value = this.display_text[j];
          var S = this.type !== u;
          S && (this.switchEditor(this.type), this.editors[this.type].setValue(e, t)), e !== void 0 && this.editors[this.type].setValue(e, t), this.refreshValue(), this.onChange(S);
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Yr(Gt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.oneOf || this.anyOf) {
            var i = this.oneOf ? "oneOf" : "anyOf";
            this.editors.forEach(function(u, d) {
              if (u) {
                var b = "".concat(t.path, ".").concat(i, "[").concat(d, "]");
                u.showValidationErrors(e.reduce(function(j, S) {
                  if (S.path.startsWith(b) || S.path === b.substr(0, S.path.length)) {
                    var I = w({}, S);
                    S.path.startsWith(b) && (I.path = t.path + I.path.substr(b.length)), j.push(I);
                  }
                  return j;
                }, []));
              }
            });
          } else this.editors.forEach(function(u) {
            u && u.showValidationErrors(e);
          });
        } }, { key: "addLinks", value: function() {
        } }]) && gh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Zn(o) {
        return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zn(o);
      }
      function jh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, xh(a.key), a);
        }
      }
      function xh(o) {
        var r = function(n, a) {
          if (Zn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Zn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Zn(r) == "symbol" ? r : r + "";
      }
      function Oh(o, r, n) {
        return r = co(r), function(a, e) {
          if (e && (Zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, jl() ? Reflect.construct(r, n || [], co(o).constructor) : r.apply(o, n));
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
      function co(o) {
        return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, co(o);
      }
      function _s(o, r) {
        return _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, _s(o, r);
      }
      var Ch = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Oh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _s(e, t);
        }(r, o), n = r, (a = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && jh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function xl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function Yn(o) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? xl(Object(n), !0).forEach(function(a) {
            ho(o, a, n[a]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : xl(Object(n)).forEach(function(a) {
            Object.defineProperty(o, a, Object.getOwnPropertyDescriptor(n, a));
          });
        }
        return o;
      }
      function ho(o, r, n) {
        return (r = Cl(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Qn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], j = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(j = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); j = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!j && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return Ol(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Ol(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Ol(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function xr(o) {
        return xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, xr(o);
      }
      function Eh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Cl(a.key), a);
        }
      }
      function Cl(o) {
        var r = function(n, a) {
          if (xr(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (xr(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return xr(r) == "symbol" ? r : r + "";
      }
      function Sh(o, r, n) {
        return r = Rt(r), function(a, e) {
          if (e && (xr(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, El() ? Reflect.construct(r, n || [], Rt(o).constructor) : r.apply(o, n));
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
      function or() {
        return or = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Rt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, or.apply(this, arguments);
      }
      function Rt(o) {
        return Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Rt(o);
      }
      function ws(o, r) {
        return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ws(o, r);
      }
      var Sl = function(o) {
        function r(e, t, i) {
          var u;
          return function(d, b) {
            if (!(d instanceof b)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (u = Sh(this, r, [e, t])).currentDepth = i, u;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ws(e, t);
        }(r, o), n = r, (a = [{ key: "getChildEditors", value: function() {
          return this.editors;
        } }, { key: "register", value: function() {
          or(Rt(r.prototype), "register", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          or(Rt(r.prototype), "unregister", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.maxwidth), 3);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.editjson_control && (this.editjson_control.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), or(Rt(r.prototype), "enable", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            (e.isActive() || e.isUiOnly) && e.enable(), e.optInCheckbox && (e.optInCheckbox.disabled = !1);
          }));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.editjson_control && (this.editjson_control.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), or(Rt(r.prototype), "disable", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            (t.isActive() || t.isUiOnly) && t.disable(e), t.optInCheckbox.disabled = !0;
          });
        } }, { key: "layoutEditors", value: function() {
          var e, t, i = this;
          if (this.row_container) {
            var u;
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(He, ve) {
              var xe = i.editors[He].schema.propertyOrder, Ze = i.editors[ve].schema.propertyOrder;
              return typeof xe != "number" && (xe = 1e3), typeof Ze != "number" && (Ze = 1e3), xe - Ze;
            });
            var d, b = this.format === "categories", j = [], S = null, I = null;
            if (this.format === "grid-strict") {
              var W = 0;
              if (d = [], this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ze = ve.options.hidden ? 0 : ve.options.grid_offset || 0, ot = !ve.options.hidden && (ve.options.grid_break || !1), Ot = { key: He, width: xe, offset: Ze, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  d.push(Ot), j[W] = d, ot && (W++, d = []);
                }
              }), this.layout === JSON.stringify(j)) return !1;
              for (this.layout = JSON.stringify(j), u = document.createElement("div"), e = 0; e < j.length; e++) for (d = this.theme.getGridRow(), u.appendChild(d), t = 0; t < j[e].length; t++) S = j[e][t].key, (I = this.editors[S]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, j[e][t].width, j[e][t].offset), d.appendChild(I.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  for (var xe = !1, Ze = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), ot = ve.options.hidden ? 0 : ve.container.offsetHeight, Ot = 0; Ot < j.length; Ot++) j[Ot].width + Ze <= 12 && (!ot || 0.5 * j[Ot].minh < ot && 2 * j[Ot].maxh > ot) && (xe = Ot);
                  xe === !1 && (j.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), xe = j.length - 1), j[xe].editors.push({ key: He, width: Ze, height: ot }), j[xe].width += Ze, j[xe].minh = Math.min(j[xe].minh, ot), j[xe].maxh = Math.max(j[xe].maxh, ot);
                }
              }), e = 0; e < j.length; e++) if (j[e].width < 12) {
                var J = !1, te = 0;
                for (t = 0; t < j[e].editors.length; t++) (J === !1 || j[e].editors[t].width > j[e].editors[J].width) && (J = t), j[e].editors[t].width *= 12 / j[e].width, j[e].editors[t].width = Math.floor(j[e].editors[t].width), te += j[e].editors[t].width;
                te < 12 && (j[e].editors[J].width += 12 - te), j[e].width = 12;
              }
              if (this.layout === JSON.stringify(j)) return !1;
              for (this.layout = JSON.stringify(j), u = document.createElement("div"), e = 0; e < j.length; e++) for (d = this.theme.getGridRow(), u.appendChild(d), t = 0; t < j[e].editors.length; t++) S = j[e].editors[t].key, (I = this.editors[S]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, j[e].editors[t].width), d.appendChild(I.container);
            } else {
              if (u = document.createElement("div"), b) {
                var ye = document.createElement("div"), _e = this.theme.getTopTabHolder(this.translateProperty(this.schema.title)), we = this.theme.getTopTabContentHolder(_e);
                for (this.property_order.forEach(function(He) {
                  var ve = i.editors[He];
                  if (!ve.property_removed) {
                    var xe = i.theme.getTabContent(), Ze = ve.schema && (ve.schema.type === "object" || ve.schema.type === "array");
                    xe.isObjOrArray = Ze;
                    var ot = i.theme.getGridRow();
                    ve.tab || (i.basicPane === void 0 ? i.addRow(ve, _e, xe) : i.addRow(ve, _e, i.basicPane)), xe.id = i.getValidId(ve.tab_text.textContent), Ze ? (xe.appendChild(ot), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab)) : (ye.appendChild(ot), we.childElementCount > 0 ? we.firstChild.isObjOrArray && (xe.appendChild(ye), we.insertBefore(xe, we.firstChild), i.theme.insertBasicTopTab(ve.tab, _e), ve.basicPane = xe) : (xe.appendChild(ye), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab), ve.basicPane = xe)), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), ot.appendChild(ve.container), ve.rowPane = xe;
                  }
                }); this.tabPanesContainer.firstChild; ) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                var Ie = this.tabs_holder.parentNode;
                Ie.removeChild(Ie.firstChild), Ie.appendChild(_e), this.tabPanesContainer = we, this.tabs_holder = _e;
                var De = this.theme.getFirstTab(this.tabs_holder);
                return void (De && k(De, "click"));
              }
              this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                ve.property_removed || (d = i.theme.getGridRow(), u.appendChild(d), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), d.appendChild(ve.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(u);
          }
        } }, { key: "getPropertySchema", value: function(e) {
          var t = this, i = this.schema.properties[e] || {};
          i = w({}, i);
          var u = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(d) {
            new RegExp(d).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[d]), u = !0);
          }), !u && this.schema.additionalProperties && xr(this.schema.additionalProperties) === "object" && (i = w({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (or(Rt(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = Qn(t, 2), u = i[0], d = i[1], b = e.jsoneditor.getEditorClass(d);
            e.editors[u] = e.jsoneditor.createEditor(b, { jsoneditor: e.jsoneditor, schema: d, path: "".concat(e.path, ".").concat(u), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[u].preBuild();
            var j = e.editors[u].options.hidden ? 0 : e.editors[u].options.grid_columns || e.editors[u].getNumColumns();
            e.minwidth += j, e.maxwidth += j;
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
            var u = e.editors[t].schema.propertyOrder, d = e.editors[i].schema.propertyOrder;
            return typeof u != "number" && (u = 1e3), typeof d != "number" && (d = 1e3), u - d;
          });
        } }, { key: "addTab", value: function(e) {
          var t = this, i = this.rows[e].schema && (this.rows[e].schema.type === "object" || this.rows[e].schema.type === "array");
          this.tabs_holder && (this.rows[e].tab_text = document.createElement("span"), this.rows[e].tab_text.textContent = i ? this.rows[e].getHeaderText() : this.schema.basicCategoryTitle === void 0 ? "Basic" : this.schema.basicCategoryTitle, this.rows[e].tab = this.theme.getTopTab(this.rows[e].tab_text, this.getValidId(this.rows[e].tab_text.textContent)), this.rows[e].tab.addEventListener("click", function(u) {
            t.active_tab = t.rows[e].tab, t.refreshTabs(), u.preventDefault(), u.stopPropagation();
          }));
        } }, { key: "addRow", value: function(e, t, i) {
          var u = this.rows.length, d = e.schema.type === "object" || e.schema.type === "array";
          this.rows[u] = e, this.rows[u].rowPane = i, d ? (this.addTab(u), this.theme.addTopTab(t, this.rows[u].tab)) : this.basicTab === void 0 ? (this.addTab(u), this.basicTab = u, this.basicPane = i, this.theme.addTopTab(t, this.rows[u].tab)) : (this.rows[u].tab = this.rows[this.basicTab].tab, this.rows[u].tab_text = this.rows[this.basicTab].tab_text, this.rows[u].rowPane = this.rows[this.basicTab].rowPane);
        } }, { key: "refreshTabs", value: function(e) {
          var t = this, i = this.basicTab !== void 0, u = !1;
          this.rows.forEach(function(d) {
            d.tab && d.rowPane && d.rowPane.parentNode && (i && d.tab === t.rows[t.basicTab].tab && u || (e ? d.tab_text.textContent = d.getHeaderText() : (i && d.tab === t.rows[t.basicTab].tab && (u = !0), d.tab === t.active_tab ? t.theme.markTabActive(d) : t.theme.markTabInactive(d))));
          });
        } }, { key: "build", value: function() {
          var e = this, t = this.format === "categories";
          if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, Object.entries(this.editors).forEach(function(u) {
            var d = Qn(u, 2), b = d[0], j = d[1], S = e.theme.getTableCell();
            e.editor_holder.appendChild(S), j.setContainer(S), j.build(), j.postBuild(), j.setOptInCheckbox(j.header), j.setValue(j.getDefault(), !0), e.editors[b].options.hidden && (S.style.display = "none"), e.editors[b].options.input_width && (S.style.width = e.editors[b].options.input_width);
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
                var d = e.editors[e.addproperty_input.value].key, b = e.editors[e.addproperty_input.value].type, j = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: d, type: b, path: j } });
              }
            }), this.addproperty_input.addEventListener("input", function(u) {
              u.target.previousSibling.previousSibling.childNodes.forEach(function(d) {
                var b = d.innerText, j = u.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (b = b.toLowerCase(), j = j.toLowerCase()), b.includes(j) ? d.style.display = "" : d.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(u) {
              var d = e.theme.getTabContent(), b = e.theme.getGridColumn(), j = !(!u.schema || u.schema.type !== "object" && u.schema.type !== "array");
              if (d.isObjOrArray = j, t) {
                if (j) {
                  var S = e.theme.getGridContainer();
                  S.appendChild(b), d.appendChild(S), e.tabPanesContainer.appendChild(d), e.row_container = S;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), d.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(d) : e.tabPanesContainer.insertBefore(d, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(b);
                e.addRow(u, e.tabs_holder, d), d.id = e.getValidId(u.schema.title);
              } else e.row_container.appendChild(b);
              u.setContainer(b), u.build(), u.postBuild(), u.setOptInCheckbox(u.header);
            }), this.rows[0] && k(this.rows[0].tab, "click"), this.collapsed = !1, this.collapse_control = this.getButton("", "collapse", "button_collapse"), this.collapse_control.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(this.collapse_control, this.title.childNodes[0]), this.collapse_control.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.collapsed ? (e.editor_holder.style.display = "", e.collapsed = !1, e.setButtonText(e.collapse_control, "", "collapse", "button_collapse")) : (e.editor_holder.style.display = "none", e.collapsed = !0, e.setButtonText(e.collapse_control, "", "expand", "button_expand"));
            }), this.options.collapsed && k(this.collapse_control, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.collapse_control.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.collapse_control.style.display = "none"), this.editjson_control = this.getButton("JSON", "edit", "button_edit_json"), this.editjson_control.classList.add("json-editor-btntype-editjson"), this.editjson_control.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.toggleEditJSON();
            }), this.controls.appendChild(this.editjson_control), this.controls.insertBefore(this.editjson_holder, this.controls.childNodes[0]), this.schema.options && this.schema.options.disable_edit_json !== void 0 ? this.schema.options.disable_edit_json && (this.editjson_control.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_control.style.display = "none"), this.addproperty_button = this.getButton("button_properties", "edit_properties", "button_object_properties"), this.addproperty_button.classList.add("json-editor-btntype-properties"), this.addproperty_button.addEventListener("click", function(u) {
              u.preventDefault(), u.stopPropagation(), e.toggleAddProperty();
            }), this.controls.appendChild(this.addproperty_button), this.controls.insertBefore(this.addproperty_holder, this.controls.childNodes[1]), this.refreshAddProperties(), this.deactivateNonRequiredProperties(!1);
          }
          this.options.table_row ? (this.editor_holder = this.container, this.property_order.forEach(function(u) {
            e.editor_holder.appendChild(e.editors[u].container);
          })) : (this.layoutEditors(), this.layoutEditors()), (this.schema.readOnly || this.schema.readonly) && this.disable();
        } }, { key: "deactivateNonRequiredProperties", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_opt_in, u = this.options.show_opt_in !== void 0, d = u && this.options.show_opt_in === !0, b = u && this.options.show_opt_in === !1;
          (d || !b && i || !u && i) && Object.entries(this.editors).forEach(function(j) {
            var S = Qn(j, 2), I = S[0], W = S[1];
            t.isRequiredObject(W) || t.editors[I].deactivate(), e && typeof t.editors[I].deactivateNonRequiredProperties == "function" && t.editors[I].deactivateNonRequiredProperties(e);
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
          for (var d = 0; d < i.childNodes.length; d++) {
            var b = i.childNodes[d];
            if (t.propertyOrder < b.propertyOrder) {
              this.addproperty_list.insertBefore(t, b), t = null;
              break;
            }
          }
          t && this.addproperty_list.appendChild(t);
        } }, { key: "addPropertyCheckbox", value: function(e) {
          var t, i = this, u = this.theme.getCheckbox();
          t = this.schema.properties[e] && this.schema.properties[e].title ? this.schema.properties[e].title : e;
          var d = this.theme.getCheckboxLabel(t), b = this.theme.getFormControl(d, u, null, null, this.path + "-" + e);
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
                return Yn(Yn({}, t), {}, ho({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return Yn(Yn({}, t), {}, ho({}, i, !0));
              default:
                return Yn(Yn({}, t), {}, ho({}, i, e[i]));
            }
          }, {});
        } }, { key: "addObjectProperty", value: function(e, t) {
          if (!this.editors[e]) {
            if (this.cached_editors[e]) {
              if (this.editors[e] = this.cached_editors[e], t) return;
              this.editors[e].register();
            } else {
              if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[e] || this.schema.patternProperties && Object.keys(this.schema.patternProperties).find(function(j) {
                return new RegExp(j).test(e);
              }))) return;
              var i = this.getPropertySchema(e);
              typeof i.propertyOrder != "number" && (i.propertyOrder = Object.keys(this.editors).length + 1e3);
              var u = this.jsoneditor.getEditorClass(i), d = this.jsoneditor.options.max_depth;
              if (this.editors[e] = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: d && this.currentDepth >= d ? this.getSchemaOnMaxDepth(i) : i, path: "".concat(this.path, ".").concat(e), parent: this }, this.currentDepth + 1), this.editors[e].preBuild(), !t) {
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
          this.refreshValue(), or(Rt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "canHaveAdditionalProperties", value: function() {
          return typeof this.schema.additionalProperties == "boolean" ? this.schema.additionalProperties : xr(this.schema.additionalProperties) === "object" && this.schema.additionalProperties !== null || (typeof this.options.no_additional_properties == "boolean" ? !this.options.no_additional_properties : typeof this.jsoneditor.options.no_additional_properties != "boolean" || !this.jsoneditor.options.no_additional_properties);
        } }, { key: "destroy", value: function() {
          Object.values(this.cached_editors).forEach(function(e) {
            return e.destroy();
          }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClickListener, !0), or(Rt(r.prototype), "destroy", this).call(this);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            var e = or(Rt(r.prototype), "getValue", this).call(this);
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
            Object.entries(t.cached_editors).forEach(function(d) {
              var b = Qn(d, 2), j = (b[0], b[1]);
              j.key === i && (u = j);
            }), u && !u.isActive() && u.activate();
          });
        } }, { key: "getDependentRequired", value: function(e) {
          return this.schema.dependentRequired && x(this.schema.dependentRequired, e) ? this.schema.dependentRequired[e] : [];
        } }, { key: "refreshAddProperties", value: function() {
          var e = this;
          if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) this.addproperty_button.style.display = "none";
          else {
            var t, i = 0, u = !1;
            Object.keys(this.editors).forEach(function(d) {
              return i++;
            }), t = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(d) {
              e.addPropertyCheckbox(d), e.isRequiredObject(e.cached_editors[d]) && d in e.editors && (e.addproperty_checkboxes[d].disabled = !0), e.schema.minProperties !== void 0 && i <= e.schema.minProperties ? (e.addproperty_checkboxes[d].disabled = e.addproperty_checkboxes[d].checked, e.addproperty_checkboxes[d].checked || (u = !0)) : d in e.editors ? u = !0 : t || x(e.schema.properties, d) ? (e.addproperty_checkboxes[d].disabled = !1, u = !0) : e.addproperty_checkboxes[d].disabled = !0;
            }), this.canHaveAdditionalProperties() && (u = !0), Object.keys(this.schema.properties).forEach(function(d) {
              e.cached_editors[d] || (u = !0, e.addPropertyCheckbox(d));
            }), u ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(e) {
          if (e) return typeof e.schema.required == "boolean" ? e.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(e.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          (xr(e = (e = this.applyConstFilter(e)) || {}) !== "object" || Array.isArray(e)) && (e = {}), Object.entries(this.cached_editors).forEach(function(u) {
            var d = Qn(u, 2), b = d[0], j = d[1];
            e[b] !== void 0 ? (i.addObjectProperty(b), j.setValue(e[b], t), j.activate(), i.disabled && j.disable()) : t || i.isRequiredObject(j) ? j.setValue(j.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? j.deactivate() : i.removeObjectProperty(b);
          }), Object.entries(e).forEach(function(u) {
            var d = Qn(u, 2), b = d[0], j = d[1];
            i.cached_editors[b] || (i.addObjectProperty(b), i.editors[b] && i.editors[b].setValue(j, t, !!i.editors[b].template));
          }), this.refreshValue(), this.layoutEditors(), this.onChange();
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], u = [];
          e.forEach(function(d) {
            d.path === t.path ? i.push(d) : u.push(d);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(d) {
            d.errorcount && d.errorcount > 1 && (d.message += " (".concat(d.errorcount, " errors)")), t.error_holder.appendChild(t.theme.getErrorMessage(d.message));
          })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), Object.values(this.editors).forEach(function(d) {
            d.showValidationErrors(u);
          });
        } }]) && Eh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D);
      function Xn(o) {
        return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Xn(o);
      }
      function Ph(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Th(a.key), a);
        }
      }
      function Th(o) {
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
      function Lh(o, r, n) {
        return r = Or(r), function(a, e) {
          if (e && (Xn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Pl() ? Reflect.construct(r, n || [], Or(o).constructor) : r.apply(o, n));
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
      function ei() {
        return ei = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Or(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ei.apply(this, arguments);
      }
      function Or(o) {
        return Or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Or(o);
      }
      function ks(o, r) {
        return ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ks(o, r);
      }
      Sl.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var Ah = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Lh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ks(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          ei(Or(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          var e = this;
          this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
          for (var t = function(I) {
            e.setValue(I.currentTarget.value), e.onChange(!0), e.radioGroup.forEach(function(W) {
              W.checked = W.value === e.getValue();
            });
          }, i = 0; i < this.enum_values.length; i++) {
            var u = { id: "".concat(this.formname, "[").concat(i, "]"), value: this.enum_values[i] };
            this.jsoneditor.options.use_name_attributes && (u.name = this.formname), this.input = this.theme.getFormRadio(u), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", t, !1), this.radioGroup.push(this.input);
            var d = this.theme.getFormRadioLabel(this.enum_display[i]);
            d.htmlFor = this.input.id;
            var b = this.theme.getFormRadioControl(d, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
            this.radioContainer.appendChild(b);
          }
          if (this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var j = 0; j < this.radioGroup.length; j++) this.radioGroup[j].disabled = !0;
            this.radioContainer.classList.add("readonly");
          }
          var S = this.theme.getContainer();
          S.appendChild(this.radioContainer), S.dataset.containerFor = "radio", this.input = S, this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady();
          });
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !1;
            this.radioContainer.classList.remove("readonly"), ei(Or(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.radioContainer.classList.add("readonly"), ei(Or(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), ei(Or(r.prototype), "destroy", this).call(this);
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
        } }]) && Ph(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ri);
      function ti(o) {
        return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ti(o);
      }
      function Rh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ih(a.key), a);
        }
      }
      function Ih(o) {
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
      function Bh(o, r, n) {
        return r = Wt(r), function(a, e) {
          if (e && (ti(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Tl() ? Reflect.construct(r, n || [], Wt(o).constructor) : r.apply(o, n));
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
      function Qr() {
        return Qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Qr.apply(this, arguments);
      }
      function Wt(o) {
        return Wt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wt(o);
      }
      function js(o, r) {
        return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, js(o, r);
      }
      var Nh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Bh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && js(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Qr(Wt(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.sceditor_instance && this.sceditor_instance.val(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Qr(Wt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.sceditor) {
            var t = this.expandCallbacks("sceditor", w({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
            i === void 0 && window.sceditor.create(this.input, t), this.sceditor_instance = i || window.sceditor.instance(this.input), this.sceditor_instance.blur(function() {
              e.value = e.sceditor_instance.val(), e.sceditor_instance.updateOriginal(), e.is_dirty = !0, e.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Qr(Wt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), Qr(Wt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.sceditor_instance && this.sceditor_instance.readOnly(!0), Qr(Wt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), Qr(Wt(r.prototype), "destroy", this).call(this);
        } }]) && Rh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function ri(o) {
        return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ri(o);
      }
      function Dh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Fh(a.key), a);
        }
      }
      function Fh(o) {
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
      function Mh(o, r, n) {
        return r = sr(r), function(a, e) {
          if (e && (ri(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ll() ? Reflect.construct(r, n || [], sr(o).constructor) : r.apply(o, n));
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
      function mn() {
        return mn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = sr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, mn.apply(this, arguments);
      }
      function sr(o) {
        return sr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, sr(o);
      }
      function xs(o, r) {
        return xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, xs(o, r);
      }
      var Hh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Mh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xs(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else mn(sr(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", w({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = t.tags = !!t.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = x(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
              e.updateValue(i), e.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          mn(sr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t, i = this.typecast(e), u = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (t = this.input.querySelector('option[value="'.concat(i, '"]'))) ? t.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), u = !0), u;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), mn(sr(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), mn(sr(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), mn(sr(r.prototype), "destroy", this).call(this);
        } }]) && Dh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ri);
      function ni(o) {
        return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ni(o);
      }
      function Vh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, zh(a.key), a);
        }
      }
      function zh(o) {
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
      function qh(o, r, n) {
        return r = Jt(r), function(a, e) {
          if (e && (ni(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Al() ? Reflect.construct(r, n || [], Jt(o).constructor) : r.apply(o, n));
      }
      function Al() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Al = function() {
          return !!o;
        })();
      }
      function Xr() {
        return Xr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Xr.apply(this, arguments);
      }
      function Jt(o) {
        return Jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jt(o);
      }
      function Os(o, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Os(o, r);
      }
      var Uh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Os(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.selectize_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else Xr(Jt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var t = this.expandCallbacks("selectize", w({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
            this.newEnumAllowed = t.create = !!t.create && this.schema.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              e.updateValue(i), e.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
          }
          Xr(Jt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t = this.typecast(e), i = !1;
          return this.enum_values.includes(t) || t === "" || (this.enum_options.push("".concat(t)), this.enum_display.push("".concat(t)), this.enum_values.push(t), this.schema.enum.push(t), this.selectize_instance.addItem(t), this.selectize_instance.refreshOptions(!1), i = !0), i;
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          Xr(Jt(r.prototype), "onWatchedFieldChange", this).call(this), this.selectize_instance && (this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(t, i) {
            e.selectize_instance.addOption({ value: t, text: e.enum_display[i] });
          }), this.selectize_instance.addItem("".concat(this.value), !0));
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), Xr(Jt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), Xr(Jt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), Xr(Jt(r.prototype), "destroy", this).call(this);
        } }]) && Vh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ri);
      function ii(o) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ii(o);
      }
      function $h(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Gh(a.key), a);
        }
      }
      function Gh(o) {
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
      function Wh(o, r, n) {
        return r = po(r), function(a, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Rl() ? Reflect.construct(r, n || [], po(o).constructor) : r.apply(o, n));
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
      function po(o) {
        return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, po(o);
      }
      function Cs(o, r) {
        return Cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Cs(o, r);
      }
      var Jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cs(e, t);
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
            var d = document.createElement("div"), b = document.createElement("button");
            b.classList.add("tiny", "button"), b.innerHTML = "Clear signature", d.appendChild(b), i.appendChild(d), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(S) {
              u.setAttribute("readOnly", "readOnly"), S.disabled = !0;
            })), b.addEventListener("click", function(S) {
              S.preventDefault(), S.stopPropagation(), e.signaturePad.clear(), e.signaturePad.strokeEnd();
            }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), u.width = i.offsetWidth, this.options && this.options.canvas_height ? u.height = this.options.canvas_height : u.height = "300";
          } else {
            var j = document.createElement("p");
            j.innerHTML = "Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad", this.container.appendChild(j);
          }
        } }, { key: "setValue", value: function(e) {
          if (e = this.applyConstFilter(e), typeof SignaturePad == "function") {
            var t = this.sanitize(e);
            return this.value === t ? void 0 : (this.value = t, this.input.value = this.value, this.signaturePad.clear(), e && e !== "" && this.signaturePad.fromDataURL(e), this.watch_listener(), this.jsoneditor.notifyWatchers(this.path), !1);
          }
        } }, { key: "destroy", value: function() {
          this.signaturePad.off(), delete this.signaturePad;
        } }]) && $h(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function oi(o) {
        return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, oi(o);
      }
      function Kh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Zh(a.key), a);
        }
      }
      function Zh(o) {
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
      function Yh(o, r, n) {
        return r = Kt(r), function(a, e) {
          if (e && (oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Il() ? Reflect.construct(r, n || [], Kt(o).constructor) : r.apply(o, n));
      }
      function Il() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Il = function() {
          return !!o;
        })();
      }
      function en() {
        return en = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, en.apply(this, arguments);
      }
      function Kt(o) {
        return Kt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kt(o);
      }
      function Es(o, r) {
        return Es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Es(o, r);
      }
      v(6031);
      var Qh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Es(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = en(Kt(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.simplemde_instance && this.simplemde_instance.value(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", en(Kt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.SimpleMDE ? (e = this.expandCallbacks("simplemde", w({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
            t.value = t.simplemde_instance.value(), t.is_dirty = !0, t.onChange(!0);
          }), e.autorefresh && this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 }), this.theme.afterInputReady(this.input)) : en(Kt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), en(Kt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), en(Kt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), en(Kt(r.prototype), "destroy", this).call(this);
        } }, { key: "startListening", value: function(e, t) {
          var i = this, u = function d() {
            e.display.wrapper.offsetHeight ? (i.stopListening(e, t), e.display.lastWrapHeight !== e.display.wrapper.clientHeight && e.refresh()) : t.timeout = window.setTimeout(d, t.delay);
          };
          t.timeout = window.setTimeout(u, t.delay), t.hurry = function() {
            window.clearTimeout(t.timeout), t.timeout = window.setTimeout(u, 50);
          }, e.on(window, "mouseup", t.hurry), e.on(window, "keyup", t.hurry);
        } }, { key: "stopListening", value: function(e, t) {
          window.clearTimeout(t.timeout), e.off(window, "mouseup", t.hurry), e.off(window, "keyup", t.hurry);
        } }]) && Kh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function si(o) {
        return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, si(o);
      }
      function Xh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ep(a.key), a);
        }
      }
      function ep(o) {
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
      function tp(o, r, n) {
        return r = bn(r), function(a, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Bl() ? Reflect.construct(r, n || [], bn(o).constructor) : r.apply(o, n));
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
      function fo() {
        return fo = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = bn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, fo.apply(this, arguments);
      }
      function bn(o) {
        return bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bn(o);
      }
      function Ss(o, r) {
        return Ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ss(o, r);
      }
      var Nl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), tp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ss(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var t = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && t--, this.enum_values = [];
            for (var i = 0; i < t; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var u = function(te) {
            te.preventDefault(), te.stopPropagation(), e.setValue(te.currentTarget.value), e.onChange(!0);
          }, d = this.enum_values.length - 1; d > -1; d--) {
            var b = this.formname + (d + 1), j = this.theme.getFormInputField("radio");
            j.name = "".concat(this.formname, "[starrating]"), j.value = this.enum_values[d], j.id = b, j.addEventListener("change", u, !1), this.radioGroup.push(j);
            var S = document.createElement("label");
            S.htmlFor = b, S.title = this.enum_values[d], this.options.displayValue && S.classList.add("starrating-display-enabled");
            var I = this.theme.getHiddenText("label");
            I.textContent = d, S.appendChild(I), this.ratingContainer.appendChild(j), this.ratingContainer.appendChild(S);
          }
          if (this.options.displayValue && (this.displayRating = document.createElement("div"), this.displayRating.classList.add("starrating-display"), this.displayRating.innerText = this.enum_values[0], this.ratingContainer.appendChild(this.displayRating)), this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var W = 0; W < this.radioGroup.length; W++) this.radioGroup[W].disabled = !0;
            this.ratingContainer.classList.add("readonly");
          }
          var J = this.theme.getContainer();
          J.appendChild(this.ratingContainer), this.input = J, this.control = this.theme.getFormControl(this.label, J, this.description, this.infoButton), this.container.appendChild(this.control), this.refreshValue();
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
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), fo(bn(r.prototype), "destroy", this).call(this);
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
          fo(bn(r.prototype), "setValue", this).call(this, this.value);
        } }]) && Xh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function ai(o) {
        return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ai(o);
      }
      function rp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, np(a.key), a);
        }
      }
      function np(o) {
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
      function ip(o, r, n) {
        return r = tn(r), function(a, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Dl() ? Reflect.construct(r, n || [], tn(o).constructor) : r.apply(o, n));
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
      function Di() {
        return Di = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = tn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Di.apply(this, arguments);
      }
      function tn(o) {
        return tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, tn(o);
      }
      function Ps(o, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ps(o, r);
      }
      Nl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var op = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ip(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ps(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          Di(tn(r.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var e = this.theme.getStepperButtons(this.input);
          this.control.appendChild(e), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          Di(tn(r.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          Di(tn(r.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && rp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(ml);
      function li(o) {
        return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, li(o);
      }
      function sp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ap(a.key), a);
        }
      }
      function ap(o) {
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
      function lp(o, r, n) {
        return r = ar(r), function(a, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Fl() ? Reflect.construct(r, n || [], ar(o).constructor) : r.apply(o, n));
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
      function vn() {
        return vn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ar(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vn.apply(this, arguments);
      }
      function ar(o) {
        return ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ar(o);
      }
      function Ts(o, r) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ts(o, r);
      }
      var up = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ts(e, t);
        }(r, o), n = r, a = [{ key: "register", value: function() {
          if (vn(ar(r.prototype), "register", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].register();
        } }, { key: "unregister", value: function() {
          if (vn(ar(r.prototype), "unregister", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var e = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = e.title || "row", this.item_default = e.default || null, this.item_has_child_editors = e.properties || e.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, vn(ar(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          this.tableContainer = this.theme.getTableContainer(), this.table = this.theme.getTable(), this.tableContainer.appendChild(this.table), this.container.appendChild(this.tableContainer), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
          var e = this.getElementEditor(0, !0);
          if (this.item_default = e.getDefault(), this.width = e.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.tableContainer), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls), this.item_has_child_editors) for (var t = e.getChildEditors(), i = e.property_order || Object.keys(t), u = 0; u < i.length; u++) {
            var d = this.theme.getTableHeaderCell(t[i[u]].getTitle());
            t[i[u]].options.hidden && (d.style.display = "none"), this.header_row.appendChild(d);
          }
          else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
          e.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(this.translate("table_controls")), this.controls_header_cell.setAttribute("aria-hidden", "true"), this.controls_header_cell.style.visibility = "hidden", this.header_row.appendChild(this.controls_header_cell), this.addControls();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), vn(ar(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemDefault", value: function() {
          return w({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = w({}, this.schema.items), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.row_holder.appendChild(this.theme.getTableRow()), b = d;
          this.item_has_child_editors || (b = this.theme.getTableCell(), d.appendChild(b));
          var j = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: b, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
          return j.preBuild(), t || (j.build(), j.postBuild(), j.controls_cell = d.appendChild(this.theme.getTableCell()), j.row = d, j.table_controls = this.theme.getButtonHolder(), j.controls_cell.appendChild(j.table_controls), j.table_controls.style.margin = 0, j.table_controls.style.padding = 0), j;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, vn(ar(r.prototype), "destroy", this).call(this);
        } }, { key: "ensureArraySize", value: function(e) {
          if (Array.isArray(e) || (e = [e]), this.schema.minItems) for (; e.length < this.schema.minItems; ) e.push(this.getItemDefault());
          return this.schema.maxItems && e.length > this.schema.maxItems && (e = e.slice(0, this.schema.maxItems)), e;
        } }, { key: "setValue", value: function() {
          var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (t = this.applyConstFilter(t), t = this.ensureArraySize(t), JSON.stringify(t) !== this.serialized) {
            var u = !1;
            t.forEach(function(j, S) {
              e.rows[S] ? e.rows[S].setValue(j) : (e.addRow(j), u = !0);
            });
            for (var d = t.length; d < this.rows.length; d++) {
              var b = this.rows[d].container;
              this.item_has_child_editors || this.rows[d].row.parentNode.removeChild(this.rows[d].row), this.rows[d].destroy(), b.parentNode && b.parentNode.removeChild(b), this.rows[d] = null, u = !0;
            }
            this.rows = this.rows.slice(0, t.length), this.refreshValue(), (u || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var e = this, t = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, u = [];
          this.rows.forEach(function(W, J) {
            if (W.delete_button) {
              var te = !t;
              e.setButtonState(W.delete_button, te), u.push(te);
            }
            if (W.copy_button) {
              var ye = !i;
              e.setButtonState(W.copy_button, ye), u.push(ye);
            }
            if (W.moveup_button) {
              var _e = J !== 0;
              e.setButtonState(W.moveup_button, _e), u.push(_e);
            }
            if (W.movedown_button) {
              var we = J !== e.rows.length - 1;
              e.setButtonState(W.movedown_button, we), u.push(we);
            }
          });
          var d = u.some(function(W) {
            return W;
          });
          this.rows.forEach(function(W) {
            return e.setButtonState(W.controls_cell, d);
          }), this.setButtonState(this.controls_header_cell, d), this.setButtonState(this.table, this.value.length);
          var b = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, b);
          var j = !(!this.value.length || t || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, j);
          var S = !(this.value.length <= 1 || t || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, S);
          var I = b || j || S;
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
          return u.classList.add("delete", "json-editor-btntype-delete"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            if (d.preventDefault(), d.stopPropagation(), !i.askConfirmation()) return !1;
            var b = 1 * d.currentTarget.getAttribute("data-i"), j = i.getValue(), S = i.getValue()[b];
            j.splice(b, 1), i.setValue(j), i.onChange(!0), i.jsoneditor.trigger("deleteRow", S);
          }), t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton("", "copy", "button_copy_row_title_short"), d = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation();
            var j = 1 * b.currentTarget.getAttribute("data-i"), S = i.getValue(), I = S[j];
            d.items.type === "string" && d.items.format === "uuid" ? I = L() : d.items.type === "object" && d.items.properties && S.forEach(function(W, J) {
              if (j === J) for (var te = 0, ye = Object.keys(W); te < ye.length; te++) {
                var _e = ye[te];
                d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && ((I = Object.assign({}, S[j]))[_e] = L());
              }
            }), S.splice(j + 1, 0, I), i.setValue(S), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[j + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), j = i.getValue();
            j.splice(b - 1, 0, j.splice(b, 1)[0]), i.setValue(j), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), j = i.getValue();
            j.splice(b + 1, 0, j.splice(b, 1)[0]), i.setValue(j), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          ue(e, function(i, u) {
            var d = t.getValue(), b = d[i];
            d.splice(i, 1), d.splice(u, 0, b), t.setValue(d), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[u]);
          }, { useTrigger: !0 });
        } }, { key: "addControls", value: function() {
          var e = this;
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.title_controls && (this.title.insertBefore(this.toggle_button, this.title.childNodes[0]), this.toggle_button.addEventListener("click", function(t) {
            t.preventDefault(), t.stopPropagation(), e.setButtonState(e.panel, e.collapsed), e.collapsed ? (e.collapsed = !1, e.setButtonText(t.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.setButtonText(t.currentTarget, "", "expand", "button_expand"));
          }), this.options.collapsed && k(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none")), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton();
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
            var u = e.getValue(), d = u.pop();
            e.setValue(u), e.onChange(!0), e.jsoneditor.trigger("deleteRow", d);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var u = e.getValue();
            e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", u);
          }), this.controls.appendChild(t), t;
        } }], a && sp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(he);
      function ui(o) {
        return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ui(o);
      }
      function cp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, dp(a.key), a);
        }
      }
      function dp(o) {
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
      function hp(o, r, n) {
        return r = rn(r), function(a, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ml() ? Reflect.construct(r, n || [], rn(o).constructor) : r.apply(o, n));
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
      function Fi() {
        return Fi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = rn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Fi.apply(this, arguments);
      }
      function rn(o) {
        return rn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, rn(o);
      }
      function Ls(o, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ls(o, r);
      }
      function ci(o) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(o);
      }
      function pp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, fp(a.key), a);
        }
      }
      function fp(o) {
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
      function yp(o, r, n) {
        return r = nn(r), function(a, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Hl() ? Reflect.construct(r, n || [], nn(o).constructor) : r.apply(o, n));
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
      function Mi() {
        return Mi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = nn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Mi.apply(this, arguments);
      }
      function nn(o) {
        return nn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, nn(o);
      }
      function As(o, r) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, As(o, r);
      }
      function di(o) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(o);
      }
      function mp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, bp(a.key), a);
        }
      }
      function bp(o) {
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
      function vp(o, r, n) {
        return r = lr(r), function(a, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Vl() ? Reflect.construct(r, n || [], lr(o).constructor) : r.apply(o, n));
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
      function gn() {
        return gn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = lr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, gn.apply(this, arguments);
      }
      function lr(o) {
        return lr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lr(o);
      }
      function Rs(o, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Rs(o, r);
      }
      v(9868);
      var yo = { ace: rt, array: he, arrayChoices: cn, arraySelect2: cd, arraySelectize: fd, autocomplete: vd, base64: kd, button: rl, checkbox: Pd, choices: sl, datetime: Md, describedBy: qd, enum: Wd, hidden: Yd, info: th, integer: ml, ip: dh, jodit: yh, multiple: kh, multiselect: Ae, null: Ch, number: fl, object: Sl, radio: Ah, sceditor: Nh, select: Ri, select2: Hh, selectize: Uh, signature: Jh, simplemde: Qh, starrating: Nl, stepper: op, string: fe, table: up, upload: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ls(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", w({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(u, d, b, j) {
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
              var d = u.target.files || u.dataTransfer.files;
              if (d && d.length) if (e.options.max_upload_size !== 0 && d[0].size > e.options.max_upload_size) e.theme.addInputError(e.uploader, "".concat(e.translate("upload_max_size"), " ").concat(e.options.max_upload_size));
              else if (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)) {
                e.fileDisplay && (e.fileDisplay.value = d[0].name);
                var b = new window.FileReader();
                b.onload = function(j) {
                  e.preview_value = j.target.result, e.refreshPreview(d), e.onChange(!0), b = null;
                }, b.readAsDataURL(d[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(u) {
              var d = u.dataTransfer.items || u.dataTransfer.files, b = d && d.length && (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)), j = u.currentTarget.classList && u.currentTarget.classList.contains("upload-dropzone") && b;
              switch ((u.currentTarget === window ? "w_" : "e_") + u.type) {
                case "w_drop":
                case "w_dragover":
                  j || (u.dataTransfer.dropEffect = "none");
                  break;
                case "e_dragenter":
                  j ? (e.dropZone.classList.add("valid-dropzone"), u.dataTransfer.dropEffect = "copy") : e.dropZone.classList.add("invalid-dropzone");
                  break;
                case "e_dragover":
                  j && (u.dataTransfer.dropEffect = "copy");
                  break;
                case "e_dragleave":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone");
                  break;
                case "e_drop":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone"), j && e.uploadHandler(u);
              }
              j || u.preventDefault();
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
              var d = Math.floor(Math.log(i.size) / Math.log(1024));
              i.formattedSize = "".concat(parseFloat((i.size / Math.pow(1024, d)).toFixed(2)), " ").concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]);
            } else i.formattedSize = "0 Bytes";
            var b = this.getButton("button_upload", "upload", "button_upload");
            b.addEventListener("click", function(j) {
              j.preventDefault(), b.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.options.upload_handler(t.path, i, { success: function(S) {
                t.setValue(S), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, failure: function(S) {
                t.theme.addInputError(t.uploader, S), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, updateProgress: function(S) {
                t.progressBar && (S ? t.theme.updateProgressBar(t.progressBar, S) : t.theme.updateProgressBarUnknown(t.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, b, this.preview_value)), this.options.auto_upload && (b.dispatchEvent(new window.MouseEvent("click")), b.parentNode.removeChild(b));
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Fi(rn(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Fi(rn(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.input.value = this.value, this.onChange());
        } }, { key: "destroy", value: function() {
          var e = this;
          this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(t) {
            window.removeEventListener(t, e.dragHandler, !0);
          }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(t) {
            e.dropZone.removeEventListener(t, e.dragHandler, !0);
          }), this.dropZone.removeEventListener("dblclick", this.clickHandler), this.dropZone && this.dropZone.parentNode && this.dropZone.parentNode.removeChild(this.dropZone)), this.uploader && this.uploader.parentNode && (this.uploader.removeEventListener("change", this.uploadHandler), this.uploader.parentNode.removeChild(this.uploader)), this.browseButton && this.browseButton.parentNode && (this.browseButton.removeEventListener("click", this.clickHandler), this.browseButton.parentNode.removeChild(this.browseButton)), this.fileDisplay && this.fileDisplay.parentNode && (this.fileDisplay.removeEventListener("dblclick", this.clickHandler), this.fileDisplay.parentNode.removeChild(this.fileDisplay)), this.fileUploadGroup && this.fileUploadGroup.parentNode && this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup), this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.header && this.header.parentNode && this.header.parentNode.removeChild(this.header), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Fi(rn(r.prototype), "destroy", this).call(this);
        } }, { key: "isValidMimeType", value: function(e, t) {
          return t.reduce(function(i, u) {
            return i || new RegExp(u.replace(/\*/g, ".*"), "gi").test(e);
          }, !1);
        } }]) && cp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(D), uuid: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && As(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          Mi(nn(r.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          Mi(nn(r.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.testUuid(e) || (e = this.uuid), e;
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e), this.testUuid(e) || (e = this.uuid), this.uuid = e, Mi(nn(r.prototype), "setValue", this).call(this, e, t, i);
        } }, { key: "getUuid", value: function() {
          return L();
        } }, { key: "testUuid", value: function(e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e);
        } }]) && pp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe), colorpicker: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), vp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rs(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = gn(lr(r.prototype), "setValue", this).call(this, e, t, i);
          return this.picker_instance && this.picker_instance.domElement && u && u.changed && this.picker_instance.setColor(u.value, !0), u;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          gn(lr(r.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (gn(lr(r.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (gn(lr(r.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), gn(lr(r.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(e) {
          var t = this;
          if (e) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", w({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), u = function(d) {
                var b = t.picker_instance.settings.editorFormat, j = t.picker_instance.settings.alpha;
                t.setValue(b === "hex" ? j ? d.hex : d.hex.slice(0, 7) : d["".concat(b + (j ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = u) : i.onChange = u, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && mp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe) };
      function zl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      var ql = {}, Is = "en", gp = Is;
      ql.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(yo).forEach(function(o) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, u) {
            var d = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (d != null) {
              var b, j, S, I, W = [], J = !0, te = !1;
              try {
                if (S = (d = d.call(i)).next, u !== 0) for (; !(J = (b = S.call(d)).done) && (W.push(b.value), W.length !== u); J = !0) ;
              } catch (ye) {
                te = !0, j = ye;
              } finally {
                try {
                  if (!J && d.return != null && (I = d.return(), Object(I) !== I)) return;
                } finally {
                  if (te) throw j;
                }
              }
              return W;
            }
          }(e, t) || function(i, u) {
            if (i) {
              if (typeof i == "string") return zl(i, u);
              var d = Object.prototype.toString.call(i).slice(8, -1);
              return d === "Object" && i.constructor && (d = i.constructor.name), d === "Map" || d === "Set" ? Array.from(i) : d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? zl(i, u) : void 0;
            }
          }(e, t) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(o, 2), n = r[0], a = r[1];
        yo[n].options = a.options || {};
      });
      var _n = { options: { upload: function(o, r, n) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: yo, languages: ql, resolvers: g, custom_validators: [], default_language: Is, language: gp, translate: function(o, r, n) {
        var a = {};
        n && n.options && n.options.error_messages && n.options.error_messages[_n.language] && (a = n.options.error_messages[_n.language]);
        var e = _n.languages[_n.language];
        if (!e) throw new Error("Unknown language ".concat(_n.language));
        var t = a[o] || e[o] || _n.languages[Is][o] || o;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(o, r) {
        return o;
      } };
      function wn() {
        wn = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(U, q, Z) {
          U[q] = Z.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function b(U, q, Z) {
          return Object.defineProperty(U, q, { value: Z, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          b({}, "");
        } catch {
          b = function(q, Z, ge) {
            return q[Z] = ge;
          };
        }
        function j(U, q, Z, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new pr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, Z, $e) }), Le;
        }
        function S(U, q, Z) {
          try {
            return { type: "normal", arg: U.call(q, Z) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = j;
        var I = "suspendedStart", W = "suspendedYield", J = "executing", te = "completed", ye = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        b(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ct([])));
        ve && ve !== n && a.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ze(U) {
          ["next", "throw", "return"].forEach(function(q) {
            b(U, q, function(Z) {
              return this._invoke(q, Z);
            });
          });
        }
        function ot(U, q) {
          function Z(se, Le, $e, st) {
            var at = S(U[se], U, Le);
            if (at.type !== "throw") {
              var It = at.arg, Zt = It.value;
              return Zt && vt(Zt) == "object" && a.call(Zt, "__await") ? q.resolve(Zt.__await).then(function(Et) {
                Z("next", Et, $e, st);
              }, function(Et) {
                Z("throw", Et, $e, st);
              }) : q.resolve(Zt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return Z("throw", Et, $e, st);
              });
            }
            st(at.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(st, at) {
                Z(se, Le, st, at);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, Z) {
          var ge = I;
          return function(se, Le) {
            if (ge === J) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (Z.method = se, Z.arg = Le; ; ) {
              var $e = Z.delegate;
              if ($e) {
                var st = on($e, Z);
                if (st) {
                  if (st === ye) continue;
                  return st;
                }
              }
              if (Z.method === "next") Z.sent = Z._sent = Z.arg;
              else if (Z.method === "throw") {
                if (ge === I) throw ge = te, Z.arg;
                Z.dispatchException(Z.arg);
              } else Z.method === "return" && Z.abrupt("return", Z.arg);
              ge = J;
              var at = S(U, q, Z);
              if (at.type === "normal") {
                if (ge = Z.done ? te : W, at.arg === ye) continue;
                return { value: at.arg, done: Z.done };
              }
              at.type === "throw" && (ge = te, Z.method = "throw", Z.arg = at.arg);
            }
          };
        }
        function on(U, q) {
          var Z = q.method, ge = U.iterator[Z];
          if (ge === o) return q.delegate = null, Z === "throw" && U.iterator.return && (q.method = "return", q.arg = o, on(U, q), q.method === "throw") || Z !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + Z + "' method")), ye;
          var se = S(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, ye;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, ye) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, ye);
        }
        function wi(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function pr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(wi, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var Z = -1, ge = function se() {
                for (; ++Z < U.length; ) if (a.call(U, Z)) return se.value = U[Z], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(vt(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, b(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ze(ot.prototype), b(ot.prototype, u, function() {
          return this;
        }), r.AsyncIterator = ot, r.async = function(U, q, Z, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new ot(j(U, q, Z, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ze(xe), b(xe, d, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), Z = [];
          for (var ge in q) Z.push(ge);
          return Z.reverse(), function se() {
            for (; Z.length; ) {
              var Le = Z.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, pr.prototype = { constructor: pr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && a.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function Z(at, It) {
            return Le.type = "throw", Le.arg = U, q.next = at, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return Z("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), st = a.call(se, "finallyLoc");
              if ($e && st) {
                if (this.prev < se.catchLoc) return Z(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return Z(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return Z(se.catchLoc, !0);
              } else {
                if (!st) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return Z(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var Z = this.tryEntries.length - 1; Z >= 0; --Z) {
            var ge = this.tryEntries[Z];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (U === "break" || U === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = U, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, ye) : this.complete(Le);
        }, complete: function(U, q) {
          if (U.type === "throw") throw U.arg;
          return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && q && (this.next = q), ye;
        }, finish: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var Z = this.tryEntries[q];
            if (Z.finallyLoc === U) return this.complete(Z.completion, Z.afterLoc), Ne(Z), ye;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var Z = this.tryEntries[q];
            if (Z.tryLoc === U) {
              var ge = Z.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(Z);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, Z) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: Z }, this.method === "next" && (this.arg = o), ye;
        } }, r;
      }
      function Ul(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), d = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(d) : Promise.resolve(d).then(a, e);
      }
      function $l(o) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(a, e) {
            var t = o.apply(r, n);
            function i(d) {
              Ul(t, a, e, i, u, "next", d);
            }
            function u(d) {
              Ul(t, a, e, i, u, "throw", d);
            }
            i(void 0);
          });
        };
      }
      function kn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], j = !0, S = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(j = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); j = !0) ;
            } catch (I) {
              S = !0, i = I;
            } finally {
              try {
                if (!j && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return Gl(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Gl(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Gl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function vt(o) {
        return vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vt(o);
      }
      function _p(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, wp(a.key), a);
        }
      }
      function wp(o) {
        var r = function(n, a) {
          if (vt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (vt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return vt(r) == "symbol" ? r : r + "";
      }
      v(1688);
      var kp = function() {
        return o = function e(t) {
          (function(i, u) {
            if (!(i instanceof u)) throw new TypeError("Cannot call a class as a function");
          })(this, e), this.options = t || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            vt(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            vt(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var u = this;
            Object.entries(i.anyOf).forEach(function(d) {
              var b = kn(d, 2), j = b[0], S = b[1];
              i.anyOf[j] = u.expandSchema(S);
            });
          }, dependencies: function(i) {
            var u = this;
            Object.entries(i.dependencies).forEach(function(d) {
              var b = kn(d, 2), j = b[0], S = b[1];
              vt(S) !== "object" || Array.isArray(S) || (i.dependencies[j] = u.expandSchema(S));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, u) {
            var d = this, b = w({}, u);
            return Object.entries(i.allOf).forEach(function(j) {
              var S = kn(j, 2), I = S[0], W = S[1];
              i.allOf[I] = d.expandRefs(W, !0), b = d.extendSchemas(b, d.expandSchema(W));
            }), delete b.allOf, b;
          }, extends: function(i, u) {
            var d, b = this;
            return delete (d = Array.isArray(i.extends) ? i.extends.reduce(function(j, S, I) {
              return b.extendSchemas(j, b.expandSchema(S));
            }, u) : this.extendSchemas(u, this.expandSchema(i.extends))).extends, d;
          }, oneOf: function(i, u) {
            var d = this, b = w({}, u);
            return delete b.oneOf, i.oneOf.reduce(function(j, S, I) {
              return j.oneOf[I] = d.extendSchemas(d.expandSchema(S), b), j;
            }, u), u;
          } };
        }, r = [{ key: "load", value: (a = $l(wn().mark(function e(t, i, u) {
          return wn().wrap(function(d) {
            for (; ; ) switch (d.prev = d.next) {
              case 0:
                return this.schema = t, d.next = 3, this._asyncloadExternalRefs(t, i, this._getFileBase(u), !0);
              case 3:
                return d.abrupt("return", this.expandRefs(t));
              case 4:
              case "end":
                return d.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return a.apply(this, arguments);
        }) }, { key: "expandRefs", value: function(e, t) {
          var i = this, u = w({}, e);
          if (!u.$ref) return u;
          var d = u.$ref.split("#");
          if (d.length === 2 && !this.refs_with_info[u.$ref]) {
            var b = this.expandRecursivePointer(this.schema, d[1]), j = this.extendSchemas(u, this.expandSchema(b));
            return delete j.$ref, j;
          }
          var S = d.length > 2 ? this.refs_with_info["#" + d[1]] : this.refs_with_info[u.$ref];
          delete u.$ref;
          var I = S.$ref.startsWith("#") ? S.fetchUrl : "", W = this._getRef(I, S);
          if (this.refs[W]) {
            if (t && x(this.refs[W], "allOf")) {
              var J = this.refs[W].allOf;
              Object.keys(J).forEach(function(te) {
                J[te] = i.expandRefs(J[te], !0);
              });
            }
          } else console.warn("reference:'".concat(W, "' not found!"));
          return d.length > 2 ? this.extendSchemas(u, this.expandSchema(this.expandRecursivePointer(this.refs[W], d[2]))) : this.extendSchemas(u, this.expandSchema(this.refs[W]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(u) {
            i[u] && (i = i[u]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(u) {
            var d = kn(u, 2), b = d[0], j = d[1];
            e[b] && j.call(t, e);
          });
          var i = w({}, e);
          return Object.entries(this._subSchema2).forEach(function(u) {
            var d = kn(u, 2), b = d[0], j = d[1];
            e[b] && (i = j.call(t, e, i));
          }), this.expandRefs(i);
        } }, { key: "_getRef", value: function(e, t) {
          var i = e + t;
          return this.refs[i] ? i : e + decodeURIComponent(t.$ref);
        } }, { key: "_expandSubSchema", value: function(e) {
          var t = this;
          return Array.isArray(e) ? e.map(function(i) {
            return vt(i) === "object" ? t.expandSchema(i) : i;
          }) : this.expandSchema(e);
        } }, { key: "_manageRecursivePointer", value: function(e, t) {
          Object.keys(e).forEach(function(i) {
            e[i] !== null && e[i].$ref && e[i].$ref.indexOf("#") === 0 && (e[i].$ref = t + e[i].$ref);
          });
        } }, { key: "_getExternalRefs", value: function(e, t) {
          var i = this, u = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
          u || this._manageRecursivePointer(e, t);
          var d = {}, b = function(J) {
            return Object.keys(J).forEach(function(te) {
              d[te] = !0;
            });
          };
          if (e.$ref && vt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !u)) {
            var j = e.$ref, S = "";
            j.indexOf("#") > 0 && (j = j.substr(0, j.indexOf("#"))), j !== e.$ref && (S = e.$ref.substr(e.$ref.indexOf("#")));
            var I = this.refs_prefix + this.refs_counter++, W = I + S;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (d[j] = !0), this.refs_with_info[I] = { fetchUrl: t, $ref: j }, e.$ref = W;
          }
          return Object.values(e).forEach(function(J) {
            J && vt(J) === "object" && (Array.isArray(J) ? Object.values(J).forEach(function(te) {
              te && vt(te) === "object" && b(i._getExternalRefs(te, t, u));
            }) : J.$ref && typeof J.$ref == "string" && J.$ref.startsWith("#") || b(i._getExternalRefs(J, t, u)));
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
        } }, { key: "_asyncloadExternalRefs", value: (n = $l(wn().mark(function e(t, i, u) {
          var d, b, j, S, I, W, J = this, te = arguments;
          return wn().wrap(function(ye) {
            for (; ; ) switch (ye.prev = ye.next) {
              case 0:
                d = te.length > 3 && te[3] !== void 0 && te[3], b = this._getExternalRefs(t, i, d), j = 0, S = wn().mark(function _e() {
                  var we, Ie, De, He, ve, xe, Ze, ot, Ot, on, wi;
                  return wn().wrap(function(Ne) {
                    for (; ; ) switch (Ne.prev = Ne.next) {
                      case 0:
                        if ((we = W[I]) !== void 0) {
                          Ne.next = 3;
                          break;
                        }
                        return Ne.abrupt("return", 0);
                      case 3:
                        if (!J.refs[we]) {
                          Ne.next = 5;
                          break;
                        }
                        return Ne.abrupt("return", 0);
                      case 5:
                        if (!J._isUniformResourceName(we)) {
                          Ne.next = 40;
                          break;
                        }
                        if (J.refs[we] = "loading", j++, Ie = J.options.urn_resolver, De = we, typeof Ie == "function") {
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
                        if (!(typeof ve != "boolean" && vt(ve) !== "object" || ve === null || Array.isArray(ve))) {
                          Ne.next = 28;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(De));
                      case 28:
                        return J.refs[we] = ve, Ne.next = 31, J._asyncloadExternalRefs(ve, we, u);
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
                        if (J.options.ajax) {
                          Ne.next = 42;
                          break;
                        }
                        throw new Error("Must set ajax option to true to load external ref ".concat(we));
                      case 42:
                        if (j++, xe = J._joinUrl(we, u), J.options.ajax_cache_responses && (ot = J.cacheGet(xe)) && (Ze = ot), Ze) {
                          Ne.next = 61;
                          break;
                        }
                        return Ne.next = 48, new Promise(function(pr) {
                          var Ct = new XMLHttpRequest();
                          J.options.ajaxCredentials && (Ct.withCredentials = J.options.ajaxCredentials), Ct.overrideMimeType("application/json"), Ct.open("GET", xe, !0), Ct.onload = function() {
                            pr(Ct);
                          }, Ct.onerror = function(U) {
                            pr(void 0);
                          }, Ct.send();
                        });
                      case 48:
                        if ((Ot = Ne.sent) !== void 0) {
                          Ne.next = 51;
                          break;
                        }
                        throw new Error("Failed to fetch ref via ajax - ".concat(we));
                      case 51:
                        Ne.prev = 51, Ze = JSON.parse(Ot.responseText), J.onSchemaLoaded({ schema: Ze, schemaUrl: xe }), J.options.ajax_cache_responses && J.cacheSet(xe, Ze), Ne.next = 61;
                        break;
                      case 57:
                        throw Ne.prev = 57, Ne.t2 = Ne.catch(51), console.log(Ne.t2), new Error("Failed to parse external ref ".concat(xe));
                      case 61:
                        if (!(typeof Ze != "boolean" && vt(Ze) !== "object" || Ze === null || Array.isArray(Ze))) {
                          Ne.next = 63;
                          break;
                        }
                        throw new Error("External ref does not contain a valid schema - ".concat(xe));
                      case 63:
                        return J.refs[we] = Ze, on = J._getFileBaseFromFileLocation(xe), xe !== we && (wi = xe.split("/"), xe = (we.substr(0, 1) === "/" ? "/" : "") + wi.pop()), Ne.next = 68, J._asyncloadExternalRefs(Ze, xe, on);
                      case 68:
                      case "end":
                        return Ne.stop();
                    }
                  }, _e, null, [[14, 33], [18, 22], [51, 57]]);
                }), I = 0, W = Object.keys(b);
              case 5:
                if (!(I < W.length)) {
                  ye.next = 13;
                  break;
                }
                return ye.delegateYield(S(), "t0", 7);
              case 7:
                if (ye.t0 !== 0) {
                  ye.next = 10;
                  break;
                }
                return ye.abrupt("continue", 10);
              case 10:
                I++, ye.next = 5;
                break;
              case 13:
                if (j) {
                  ye.next = 15;
                  break;
                }
                return ye.abrupt("return", !0);
              case 15:
                this.onAllSchemasLoaded();
              case 16:
              case "end":
                return ye.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return n.apply(this, arguments);
        }) }, { key: "onSchemaLoaded", value: function(e) {
        } }, { key: "onAllSchemasLoaded", value: function() {
        } }, { key: "extendSchemas", value: function(e, t) {
          var i = this;
          e = w({}, e), t = w({}, t);
          var u = {}, d = function(b) {
            typeof b == "string" && (b = [b]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? u.type = b.filter(function(j) {
              return t.type.includes(j);
            }) : u.type = b, u.type.length === 1 && typeof u.type[0] == "string" ? u.type = u.type[0] : u.type.length === 0 && delete u.type;
          };
          return Object.entries(e).forEach(function(b) {
            var j = kn(b, 2), S = j[0], I = j[1];
            t[S] !== void 0 ? function(W, J) {
              (function(te, ye) {
                return (te === "required" || te === "defaultProperties") && vt(ye) === "object" && Array.isArray(ye);
              })(W, J) ? u[W] = J.concat(t[W]).reduce(function(te, ye) {
                return te.includes(ye) || te.push(ye), te;
              }, []) : W !== "type" || typeof J != "string" && !Array.isArray(J) ? vt(J) !== "object" || Array.isArray(J) || J === null ? u[W] = J : u[W] = i.extendSchemas(J, t[W]) : d(J);
            }(S, I) : u[S] = I;
          }), Object.entries(t).forEach(function(b) {
            var j = kn(b, 2), S = j[0], I = j[1];
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
        } }], r && _p(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r, n, a;
      }(), jp = (v(2762), { default: function() {
        return { compile: function(o) {
          var r = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return o;
          };
          for (var a = [], e = function(i) {
            var u, d, b = r[i].replace(/[{}]+/g, "").trim().split("."), j = b.length;
            j > 1 ? u = function(S) {
              for (d = S, i = 0; i < j && (d = d[b[i]]); i++) ;
              return d;
            } : (b = b[0], u = function(S) {
              return S[b];
            }), a.push({ s: r[i], r: u });
          }, t = 0; t < n; t++) e(t);
          return function(i) {
            for (var u, d = "".concat(o), b = 0; b < n; b++) u = a[b], d = d.replace(u.s, u.r(i));
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
      function Hi(o) {
        return Hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hi(o);
      }
      function Bs(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function xp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Op(a.key), a);
        }
      }
      function Op(o) {
        var r = function(n, a) {
          if (Hi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Hi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Hi(r) == "symbol" ? r : r + "";
      }
      var Cp = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, Cr = function() {
        return o = function n() {
          var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Cp;
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
            if (Array.isArray(u)) return Bs(u);
          }(t = e.split(" ")) || function(u) {
            if (typeof Symbol < "u" && u[Symbol.iterator] != null || u["@@iterator"] != null) return Array.from(u);
          }(t) || function(u, d) {
            if (u) {
              if (typeof u == "string") return Bs(u, d);
              var b = Object.prototype.toString.call(u).slice(8, -1);
              return b === "Object" && u.constructor && (b = u.constructor.name), b === "Map" || b === "Set" ? Array.from(u) : b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b) ? Bs(u, d) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && xp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function Ns(o) {
        return Ns = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ns(o);
      }
      function Ep(o, r, n) {
        return r = mo(r), function(a, e) {
          if (e && (Ns(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Wl() ? Reflect.construct(r, n || [], mo(o).constructor) : r.apply(o, n));
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
      function mo(o) {
        return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mo(o);
      }
      function Ds(o, r) {
        return Ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ds(o, r);
      }
      var Sp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Pp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ep(this, r, ["glyphicon glyphicon-", Sp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ds(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Fs(o) {
        return Fs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Fs(o);
      }
      function Tp(o, r, n) {
        return r = bo(r), function(a, e) {
          if (e && (Fs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Jl() ? Reflect.construct(r, n || [], bo(o).constructor) : r.apply(o, n));
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
      function bo(o) {
        return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bo(o);
      }
      function Ms(o, r) {
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ms(o, r);
      }
      var Lp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Ap = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Tp(this, r, ["icon-", Lp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ms(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Hs(o) {
        return Hs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hs(o);
      }
      function Rp(o, r, n) {
        return r = vo(r), function(a, e) {
          if (e && (Hs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Kl() ? Reflect.construct(r, n || [], vo(o).constructor) : r.apply(o, n));
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
      function vo(o) {
        return vo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, vo(o);
      }
      function Vs(o, r) {
        return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Vs(o, r);
      }
      var Ip = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Bp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rp(this, r, ["fa fa-", Ip]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Vs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function zs(o) {
        return zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zs(o);
      }
      function Np(o, r, n) {
        return r = go(r), function(a, e) {
          if (e && (zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Zl() ? Reflect.construct(r, n || [], go(o).constructor) : r.apply(o, n));
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
      function go(o) {
        return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, go(o);
      }
      function qs(o, r) {
        return qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, qs(o, r);
      }
      var Dp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, Fp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Np(this, r, ["fas fa-", Dp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && qs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Us(o) {
        return Us = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Us(o);
      }
      function Mp(o, r, n) {
        return r = _o(r), function(a, e) {
          if (e && (Us(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Yl() ? Reflect.construct(r, n || [], _o(o).constructor) : r.apply(o, n));
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
      function _o(o) {
        return _o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, _o(o);
      }
      function $s(o, r) {
        return $s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, $s(o, r);
      }
      var Hp = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, Vp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Mp(this, r, ["ui-icon ui-icon-", Hp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && $s(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Gs(o) {
        return Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gs(o);
      }
      function zp(o, r, n) {
        return r = wo(r), function(a, e) {
          if (e && (Gs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ql() ? Reflect.construct(r, n || [], wo(o).constructor) : r.apply(o, n));
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
      function wo(o) {
        return wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, wo(o);
      }
      function Ws(o, r) {
        return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ws(o, r);
      }
      var qp = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, Up = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zp(this, r, ["oi oi-", qp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ws(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Js(o) {
        return Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Js(o);
      }
      function $p(o, r, n) {
        return r = ko(r), function(a, e) {
          if (e && (Js(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Xl() ? Reflect.construct(r, n || [], ko(o).constructor) : r.apply(o, n));
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
      function ko(o) {
        return ko = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ko(o);
      }
      function Ks(o, r) {
        return Ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ks(o, r);
      }
      var Gp = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, Wp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), $p(this, r, ["icon icon-", Gp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ks(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr);
      function Zs(o) {
        return Zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zs(o);
      }
      function Jp(o, r, n) {
        return r = jo(r), function(a, e) {
          if (e && (Zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, eu() ? Reflect.construct(r, n || [], jo(o).constructor) : r.apply(o, n));
      }
      function eu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (eu = function() {
          return !!o;
        })();
      }
      function jo(o) {
        return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jo(o);
      }
      function Ys(o, r) {
        return Ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ys(o, r);
      }
      var Kp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, Zp = { bootstrap: function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Jp(this, r, ["bi bi-", Kp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ys(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(Cr), bootstrap3: Pp, fontawesome3: Ap, fontawesome4: Bp, fontawesome5: Fp, jqueryui: Vp, openiconic: Up, spectre: Wp };
      function Vi(o) {
        return Vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vi(o);
      }
      function Yp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Qp(a.key), a);
        }
      }
      function Qp(o) {
        var r = function(n, a) {
          if (Vi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Vi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Vi(r) == "symbol" ? r : r + "";
      }
      var tu = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
        return o in document.documentElement;
      }), Er = function() {
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
          for (var d = 0; d < a.length; d++) {
            var b = document.createElement("option");
            b.setAttribute("value", a[d]), b.textContent = e[d] || a[d], n.appendChild(b);
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
          var i = function(b, j) {
            b.value = Number(j || b.value), b.setAttribute("initialized", "1");
          }, u = n.getAttribute("min"), d = n.getAttribute("max");
          return e.addEventListener("click", function() {
            n.getAttribute("initialized") ? u ? Number(n.value) > Number(u) && n.stepDown() : n.stepDown() : i(n, u), k(n, "change");
          }), t.addEventListener("click", function() {
            n.getAttribute("initialized") ? d ? Number(n.value) < Number(d) && n.stepUp() : n.stepUp() : i(n, u), k(n, "change");
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
            if (!n[tu]) return !1;
            if (n[tu](a)) return n;
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
          var d = document.createElement("div");
          return d.style.clear = "left", t.appendChild(d), t;
        } }, { key: "getProgressBar", value: function() {
          var n = document.createElement("progress");
          return n.setAttribute("max", 100), n.setAttribute("value", 0), n;
        } }, { key: "updateProgressBar", value: function(n, a) {
          n && n.setAttribute("value", a);
        } }, { key: "updateProgressBarUnknown", value: function(n) {
          n && n.removeAttribute("value");
        } }], r && Yp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function hi(o) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(o);
      }
      function Xp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ef(a.key), a);
        }
      }
      function ef(o) {
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
      function tf(o, r, n) {
        return r = ur(r), function(a, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ru() ? Reflect.construct(r, n || [], ur(o).constructor) : r.apply(o, n));
      }
      function ru() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ru = function() {
          return !!o;
        })();
      }
      function jn() {
        return jn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ur(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, jn.apply(this, arguments);
      }
      function ur(o) {
        return ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ur(o);
      }
      function Qs(o, r) {
        return Qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Qs(o, r);
      }
      var nu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), tf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qs(e, t);
        }(r, o), n = r, (a = [{ key: "getFormInputLabel", value: function(e, t) {
          var i = jn(ur(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = jn(ur(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-form-input-label"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var e = jn(ur(r.prototype), "getIndentedPanel", this).call(this);
          return e.classList.add("je-indented-panel"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var e = jn(ur(r.prototype), "getChildEditorHolder", this).call(this);
          return e.classList.add("je-child-editor-holder"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("je-header-button-holder"), e;
        } }, { key: "getTable", value: function() {
          var e = jn(ur(r.prototype), "getTable", this).call(this);
          return e.classList.add("je-table"), e;
        } }, { key: "addInputError", value: function(e, t) {
          var i = this.closest(e, ".form-control") || e.controlgroup;
          e.errmsg ? e.errmsg.style.display = "block" : (e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), e.errmsg.style = e.errmsg.style || {}, e.errmsg.style.color = "red", i.appendChild(e.errmsg)), e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && Xp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function pi(o) {
        return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pi(o);
      }
      function rf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, nf(a.key), a);
        }
      }
      function nf(o) {
        var r = function(n, a) {
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
      function of(o, r, n) {
        return r = cr(r), function(a, e) {
          if (e && (pi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, iu() ? Reflect.construct(r, n || [], cr(o).constructor) : r.apply(o, n));
      }
      function iu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (iu = function() {
          return !!o;
        })();
      }
      function xn() {
        return xn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = cr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, xn.apply(this, arguments);
      }
      function cr(o) {
        return cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, cr(o);
      }
      function Xs(o, r) {
        return Xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Xs(o, r);
      }
      nu.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var ou = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), of(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xs(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(d), { label: t, checkbox: u, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          return xn(cr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
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
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          return !e || t.type !== "checkbox" && t.type !== "radio" ? (b.classList.add("form-group"), e && (e.classList.add("control-label"), b.appendChild(e), u && e.appendChild(u)), b.appendChild(t)) : (b.classList.add(t.type), u && e.appendChild(u), e.insertBefore(t, e.firstChild), b.appendChild(e)), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), b;
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
          var u = xn(cr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-default"), u;
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
            for (var d = 0; d < t.length; d++) u.appendChild(t[d]);
            return i;
          }
        } }]) && rf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function fi(o) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(o);
      }
      function sf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, af(a.key), a);
        }
      }
      function af(o) {
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
      function lf(o, r, n) {
        return r = dr(r), function(a, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, su() ? Reflect.construct(r, n || [], dr(o).constructor) : r.apply(o, n));
      }
      function su() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (su = function() {
          return !!o;
        })();
      }
      function On() {
        return On = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = dr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, On.apply(this, arguments);
      }
      function dr(o) {
        return dr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, dr(o);
      }
      function ea(o, r) {
        return ea = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ea(o, r);
      }
      ou.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var uf = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, au = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lf(this, r, [e, uf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ea(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = On(dr(r.prototype), "getSelectInput", this).call(this, e);
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
          var d = document.createElement("label");
          d.setAttribute("for", e + "-opt-in"), d.classList.add("custom-control-label");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", d.appendChild(b), i.appendChild(u), i.appendChild(d), { label: t, checkbox: u, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          var b = On(dr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return this.options.custom_forms === !0 && (b.classList.remove("form-control"), b.classList.add("custom-range")), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), u = document.createElement("div"), d = document.createElement("button");
          d.setAttribute("type", "button");
          var b = document.createElement("button");
          b.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), i.appendChild(d), u.appendChild(b), t.classList.add("input-group"), i.classList.add("input-group-prepend"), u.classList.add("input-group-append"), d.classList.add("btn"), d.classList.add("btn-secondary"), d.classList.add("stepper-down"), b.classList.add("btn"), b.classList.add("btn-secondary"), b.classList.add("stepper-up"), e.getAttribute("readonly") && (d.setAttribute("disabled", !0), b.setAttribute("disabled", !0)), d.textContent = "-", b.textContent = "+";
          var j = function(W, J) {
            W.value = Number(J || W.value), W.setAttribute("initialized", "1");
          }, S = e.getAttribute("min"), I = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), d.addEventListener("click", function() {
            e.getAttribute("initialized") ? S ? Number(e.value) > Number(S) && e.stepDown() : e.stepDown() : j(e, S), k(e, "change");
          }), b.addEventListener("click", function() {
            e.getAttribute("initialized") ? I ? Number(e.value) < Number(I) && e.stepUp() : e.stepUp() : j(e, S), k(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = On(dr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && e !== "file" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), e === "file" && t.classList.add("form-control-file"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (b.appendChild(e), u && b.appendChild(u)), b.appendChild(t);
          else {
            var j = document.createElement("div");
            this.options.custom_forms === !1 ? (j.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (j.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? j.classList.add("custom-checkbox") : j.classList.add("custom-radio")), j.appendChild(t), j.appendChild(e), u && j.appendChild(u), b.appendChild(j);
          }
          return i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), b;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("button");
          t.type = "button", t.classList.add("ml-3", "jsoneditor-twbs4-text-button"), t.setAttribute("data-toggle", "tooltip"), t.setAttribute("data-placement", "auto"), t.title = e;
          var i = document.createTextNode("ⓘ");
          return t.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(t).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && t.classList.add("je-tooltip"), t;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          var d = document.createElement("div");
          d.classList.add("form-group"), t && (d.appendChild(t), u && t.appendChild(u));
          var b = document.createElement("div");
          return Object.values(e).forEach(function(j) {
            var S = j.firstChild;
            b.appendChild(S);
          }), d.appendChild(b), i && d.appendChild(i), d;
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
          var u = On(dr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = On(dr(r.prototype), "getTableContainer", this).call(this);
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
            for (var d = 0; d < t.length; d++) t[d].classList.remove("mr-2", "btn-secondary"), t[d].classList.add("btn-outline-secondary"), u.appendChild(t[d]);
            return i;
          }
        } }]) && sf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function yi(o) {
        return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yi(o);
      }
      function cf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, df(a.key), a);
        }
      }
      function df(o) {
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
      function hf(o, r, n) {
        return r = hr(r), function(a, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, lu() ? Reflect.construct(r, n || [], hr(o).constructor) : r.apply(o, n));
      }
      function lu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (lu = function() {
          return !!o;
        })();
      }
      function Cn() {
        return Cn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = hr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Cn.apply(this, arguments);
      }
      function hr(o) {
        return hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, hr(o);
      }
      function ta(o, r) {
        return ta = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ta(o, r);
      }
      au.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var pf = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, uu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hf(this, r, [e, pf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ta(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = Cn(hr(r.prototype), "getSelectInput", this).call(this, e);
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
          var d = document.createElement("label");
          d.setAttribute("for", e + "-opt-in"), d.classList.add("form-check-label");
          var b = document.createElement("span");
          return b.classList.add("visually-hidden"), b.textContent = e + "-opt-in", d.appendChild(b), i.appendChild(u), i.appendChild(d), { label: t, checkbox: u, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          var b = Cn(hr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return b.classList.remove("form-control"), b.classList.add("form-range"), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var u = document.createElement("button");
          u.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), u.classList.add("btn"), u.classList.add("btn-secondary"), u.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), u.setAttribute("disabled", !0)), i.textContent = "-", u.textContent = "+";
          var d = function(S, I) {
            S.value = Number(I || S.value), S.setAttribute("initialized", "1");
          }, b = e.getAttribute("min"), j = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? b ? Number(e.value) > Number(b) && e.stepDown() : e.stepDown() : d(e, b), k(e, "change");
          }), u.addEventListener("click", function() {
            e.getAttribute("initialized") ? j ? Number(e.value) < Number(j) && e.stepUp() : e.stepUp() : d(e, b), k(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = Cn(hr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), b.appendChild(e), u && b.appendChild(u)), b.appendChild(t);
          else {
            var j = document.createElement("div");
            j.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), j.appendChild(t), j.appendChild(e), u && j.appendChild(u), b.appendChild(j);
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
          var d = document.createElement("div");
          d.classList.add("form-group"), t && (d.appendChild(t), u && t.appendChild(u));
          var b = document.createElement("div");
          return Object.values(e).forEach(function(j) {
            var S = j.firstChild;
            b.appendChild(S);
          }), d.appendChild(b), i && d.appendChild(i), d;
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
          var u = Cn(hr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = Cn(hr(r.prototype), "getTableContainer", this).call(this);
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
        } }]) && cf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function mi(o) {
        return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mi(o);
      }
      function ff(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, yf(a.key), a);
        }
      }
      function yf(o) {
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
      function mf(o, r, n) {
        return r = Sr(r), function(a, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, cu() ? Reflect.construct(r, n || [], Sr(o).constructor) : r.apply(o, n));
      }
      function cu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (cu = function() {
          return !!o;
        })();
      }
      function bi() {
        return bi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Sr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, bi.apply(this, arguments);
      }
      function Sr(o) {
        return Sr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Sr(o);
      }
      function ra(o, r) {
        return ra = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ra(o, r);
      }
      uu.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var du = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ra(e, t);
        }(r, o), n = r, (a = [{ key: "getTable", value: function() {
          var e = bi(Sr(r.prototype), "getTable", this).call(this);
          return e.setAttribute("cellpadding", 5), e.setAttribute("cellspacing", 0), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = bi(Sr(r.prototype), "getTableHeaderCell", this).call(this, e);
          return t.classList.add("ui-state-active"), t.style.fontWeight = "bold", t;
        } }, { key: "getTableCell", value: function() {
          var e = bi(Sr(r.prototype), "getTableCell", this).call(this);
          return e.classList.add("ui-widget-content"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e.style.fontSize = ".6em", e.style.display = "inline-block", e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = this.getDescription(e);
          return t.style.marginLeft = "10px", t.style.display = "inline-block", t;
        } }, { key: "getFormControl", value: function(e, t, i, u) {
          var d = bi(Sr(r.prototype), "getFormControl", this).call(this, e, t, i, u);
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
          var u = document.createElement("button");
          u.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), t && !e ? (u.classList.add("ui-button-icon-only"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), u.appendChild(t)) : t ? (u.classList.add("ui-button-text-icon-primary"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), u.appendChild(t)) : u.classList.add("ui-button-text-only");
          var d = document.createElement("span");
          return d.classList.add("ui-button-text"), d.textContent = e || i || ".", u.appendChild(d), u.setAttribute("title", i), u;
        } }, { key: "setButtonText", value: function(e, t, i, u) {
          e.innerHTML = "", e.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !t ? (e.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : i ? (e.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : e.classList.add("ui-button-text-only");
          var d = document.createElement("span");
          d.classList.add("ui-button-text"), d.textContent = t || u || ".", e.appendChild(d), e.setAttribute("title", u);
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
        } }]) && ff(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function vi(o) {
        return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vi(o);
      }
      function bf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, vf(a.key), a);
        }
      }
      function vf(o) {
        var r = function(n, a) {
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
      function gf(o, r, n) {
        return r = xo(r), function(a, e) {
          if (e && (vi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, hu() ? Reflect.construct(r, n || [], xo(o).constructor) : r.apply(o, n));
      }
      function hu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (hu = function() {
          return !!o;
        })();
      }
      function xo(o) {
        return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, xo(o);
      }
      function na(o, r) {
        return na = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, na(o, r);
      }
      du.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var pu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && na(e, t);
        }(r, o), n = r, (a = [{ key: "addInputError", value: function(e, t) {
          if (e.errmsg) e.errmsg.style.display = "block";
          else {
            var i = this.closest(e, ".form-control");
            e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(e.errmsg);
          }
          e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && bf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function gi(o) {
        return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, gi(o);
      }
      function _f(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, wf(a.key), a);
        }
      }
      function wf(o) {
        var r = function(n, a) {
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
      function kf(o, r, n) {
        return r = ft(r), function(a, e) {
          if (e && (gi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, fu() ? Reflect.construct(r, n || [], ft(o).constructor) : r.apply(o, n));
      }
      function fu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (fu = function() {
          return !!o;
        })();
      }
      function gt() {
        return gt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ft(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, gt.apply(this, arguments);
      }
      function ft(o) {
        return ft = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ft(o);
      }
      function ia(o, r) {
        return ia = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ia(o, r);
      }
      pu.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var jf = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, yu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kf(this, r, [e, jf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ia(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var d = document.createElement("i");
          d.classList.add("form-icon");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(d), t.appendChild(i), { label: i, checkbox: u, container: t };
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
          var e = gt(ft(r.prototype), "getButtonHolder", this).call(this);
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = gt(ft(r.prototype), "getFormButtonHolder", this).call(this);
          return t.classList.remove("btn-group"), t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" ? t.classList.add("text-right") : t.classList.add("text-left"), t;
        } }, { key: "getFormButton", value: function(e, t, i) {
          var u = gt(ft(r.prototype), "getFormButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-primary", "mx-2", "my-1"), this.options.input_size !== "small" && u.classList.remove("btn-sm"), this.options.input_size === "large" && u.classList.add("btn-lg"), u;
        } }, { key: "getButton", value: function(e, t, i) {
          var u = gt(ft(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), u;
        } }, { key: "getHeader", value: function(e, t) {
          var i = document.createElement("span");
          return typeof e == "string" ? i.textContent = e : i.appendChild(e), i.style.display = "inline-block", i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = gt(ft(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-desc", "hide-sm"), t;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = gt(ft(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold && i.classList.add("je-label"), i;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getCheckboxLabel", value: function(e, t) {
          var i = gt(ft(r.prototype), "getCheckboxLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-checkbox", "pr-0"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          return gt(ft(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = gt(ft(r.prototype), "getFormRadioLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getFormInputField", value: function(e) {
          var t = gt(ft(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("form-input"), t;
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          var b = gt(ft(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return b.classList.add("slider"), b.classList.remove("form-input"), b.setAttribute("oninput", 'this.setAttribute("value", this.value)'), b;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = gt(ft(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center"), i;
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = gt(ft(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-select"), i;
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-input"), e;
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          return b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio" ? (e && (e.classList.add("form-label"), b.appendChild(e), u && e.appendChild(u)), b.appendChild(t)) : (b.classList.add(t.type), u && e.appendChild(u), e.insertBefore(t, e.firstChild), b.appendChild(e)), this.options.input_size === "small" ? t.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && t.classList.add("input-lg", "select-lg"), t.type !== "checkbox" && b.appendChild(t), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), b;
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
          var d = document.createElement("div");
          d.classList.add("popover-container"), t.appendChild(d);
          var b = document.createElement("div");
          b.classList.add("card"), d.appendChild(b);
          var j = document.createElement("div");
          return j.classList.add("card-body"), j.innerHTML = e, b.appendChild(j), t;
        } }, { key: "getTable", value: function() {
          var e = gt(ft(r.prototype), "getTable", this).call(this);
          return e.classList.add("table", "table-scroll"), this.options.table_border && e.classList.add("je-table-border"), this.options.table_zebrastyle && e.classList.add("table-striped"), e;
        } }, { key: "getProgressBar", value: function() {
          var e = gt(ft(r.prototype), "getProgressBar", this).call(this);
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
        } }]) && _f(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      function _i(o) {
        return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _i(o);
      }
      function xf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Of(a.key), a);
        }
      }
      function Of(o) {
        var r = function(n, a) {
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
      function Cf(o, r, n) {
        return r = bt(r), function(a, e) {
          if (e && (_i(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, mu() ? Reflect.construct(r, n || [], bt(o).constructor) : r.apply(o, n));
      }
      function mu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (mu = function() {
          return !!o;
        })();
      }
      function wt() {
        return wt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = bt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, wt.apply(this, arguments);
      }
      function bt(o) {
        return bt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bt(o);
      }
      function oa(o, r) {
        return oa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, oa(o, r);
      }
      yu.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Ef = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, bu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cf(this, r, [e, Ef]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && oa(e, t);
        }(r, o), n = r, (a = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var u = document.createElement("input");
          u.setAttribute("type", "checkbox"), u.setAttribute("id", e + "-opt-in"), u.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider", "round");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(d), { label: t, checkbox: u, container: i };
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
          var i = wt(bt(r.prototype), "getSelectInput", this).call(this, e);
          return t ? i.classList.add("form-multiselect", "block", "py-0", "h-auto", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded") : i.classList.add("form-select", "block", "py-0", "h-6", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && i.classList.add("compact"), i;
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = wt(bt(r.prototype), "getTextareaInput", this).call(this);
          return e.classList.add("block", "w-full", "px-1", "text-sm", "leading-normal", "bg-white", "text-black", "border", "border-grey", "rounded"), this.options.enable_compact && e.classList.add("compact"), e.style.height = 0, e;
        } }, { key: "getRangeInput", value: function(e, t, i) {
          var u = this.getFormInputField("range");
          return u.classList.add("slider"), this.options.enable_compact && u.classList.add("compact"), u.setAttribute("oninput", 'this.setAttribute("value", this.value)'), u.setAttribute("min", e), u.setAttribute("max", t), u.setAttribute("step", i), u;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = wt(bt(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center", "text-black"), i;
        } }, { key: "getCheckbox", value: function() {
          var e = this.getFormInputField("checkbox");
          return e.classList.add("form-checkbox", "text-red-600"), e;
        } }, { key: "getCheckboxLabel", value: function(e, t) {
          var i = wt(bt(r.prototype), "getCheckboxLabel", this).call(this, e, t);
          return i.classList.add("inline-flex", "items-center"), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("inline-flex flex-row"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          var d = wt(bt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
          return d.classList.add("inline-flex", "flex-col"), d;
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in t.classList.add("form-radio", "text-red-600"), e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = wt(bt(r.prototype), "getFormRadioLabel", this).call(this, e, t);
          return i.classList.add("inline-flex", "items-center", "mr-2"), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-radio"), e;
        } }, { key: "getRadioHolder", value: function(e, t, i, u, d) {
          var b = wt(bt(r.prototype), "getRadioHolder", this).call(this, t, i, u, d);
          return e.options.layout === "h" ? b.classList.add("inline-flex", "flex-row") : b.classList.add("inline-flex", "flex-col"), b;
        } }, { key: "getFormInputLabel", value: function(e, t) {
          var i = wt(bt(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return this.options.label_bold ? i.classList.add("font-bold") : i.classList.add("required"), i;
        } }, { key: "getFormInputField", value: function(e) {
          var t = wt(bt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("block", "w-full", "px-1", "text-black", "text-sm", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && t.classList.add("compact"), t;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = document.createElement("p");
          return t.classList.add("block", "mt-1", "text-xs"), window.DOMPurify ? t.innerHTML = window.DOMPurify.sanitize(e) : t.textContent = this.cleanText(e), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          return b.classList.add("form-group", "mb-1", "w-full"), e && (e.classList.add("text-xs"), t.type === "checkbox" && (t.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormCheckboxControl(e, t, !1, u)), t.type === "radio" && (t.classList.add("form-radio", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormRadioControl(e, t, !1, u)), b.appendChild(e), !["checkbox", "radio"].includes(t.type) && u && b.appendChild(u)), ["checkbox", "radio"].includes(t.type) || (this.options.input_size === "small" ? t.classList.add("text-xs") : this.options.input_size === "normal" ? t.classList.add("text-base") : this.options.input_size === "large" && t.classList.add("text-xl"), b.appendChild(t)), i && b.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), b;
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
          var u = wt(bt(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("inline-block", "align-middle", "text-center", "text-sm", "bg-blue-700", "text-white", "py-1", "pr-1", "m-2", "shadow", "select-none", "whitespace-no-wrap", "rounded"), u;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("a");
          t.classList.add("tooltips", "float-right"), t.innerHTML = "ⓘ";
          var i = document.createElement("span");
          return i.innerHTML = e, t.appendChild(i), t;
        } }, { key: "getTable", value: function() {
          var e = wt(bt(r.prototype), "getTable", this).call(this);
          return this.options.table_border ? e.classList.add("je-table-border") : e.classList.add("table", "border", "p-0"), e;
        } }, { key: "getTableRow", value: function() {
          var e = wt(bt(r.prototype), "getTableRow", this).call(this);
          return this.options.table_border && e.classList.add("je-table-border"), this.options.table_zebrastyle && e.classList.add("je-table-zebra"), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = wt(bt(r.prototype), "getTableHeaderCell", this).call(this, e);
          return this.options.table_border ? t.classList.add("je-table-border") : this.options.table_hdiv ? t.classList.add("je-table-hdiv") : t.classList.add("text-xs", "border", "p-0", "m-0"), t;
        } }, { key: "getTableCell", value: function() {
          var e = wt(bt(r.prototype), "getTableCell", this).call(this);
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
            for (var d = 0; d < t.length; d++) u.appendChild(t[d]);
            return i;
          }
        } }]) && xf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Er);
      bu.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Sf = { html: nu, bootstrap3: ou, bootstrap4: au, bootstrap5: uu, jqueryui: du, barebones: pu, spectre: yu, tailwind: bu };
      const Pf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function En(o) {
        return En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, En(o);
      }
      function sa(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function aa() {
        aa = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(U, q, Z) {
          U[q] = Z.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function b(U, q, Z) {
          return Object.defineProperty(U, q, { value: Z, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          b({}, "");
        } catch {
          b = function(q, Z, ge) {
            return q[Z] = ge;
          };
        }
        function j(U, q, Z, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new pr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, Z, $e) }), Le;
        }
        function S(U, q, Z) {
          try {
            return { type: "normal", arg: U.call(q, Z) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = j;
        var I = "suspendedStart", W = "suspendedYield", J = "executing", te = "completed", ye = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        b(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ct([])));
        ve && ve !== n && a.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ze(U) {
          ["next", "throw", "return"].forEach(function(q) {
            b(U, q, function(Z) {
              return this._invoke(q, Z);
            });
          });
        }
        function ot(U, q) {
          function Z(se, Le, $e, st) {
            var at = S(U[se], U, Le);
            if (at.type !== "throw") {
              var It = at.arg, Zt = It.value;
              return Zt && En(Zt) == "object" && a.call(Zt, "__await") ? q.resolve(Zt.__await).then(function(Et) {
                Z("next", Et, $e, st);
              }, function(Et) {
                Z("throw", Et, $e, st);
              }) : q.resolve(Zt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return Z("throw", Et, $e, st);
              });
            }
            st(at.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(st, at) {
                Z(se, Le, st, at);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, Z) {
          var ge = I;
          return function(se, Le) {
            if (ge === J) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (Z.method = se, Z.arg = Le; ; ) {
              var $e = Z.delegate;
              if ($e) {
                var st = on($e, Z);
                if (st) {
                  if (st === ye) continue;
                  return st;
                }
              }
              if (Z.method === "next") Z.sent = Z._sent = Z.arg;
              else if (Z.method === "throw") {
                if (ge === I) throw ge = te, Z.arg;
                Z.dispatchException(Z.arg);
              } else Z.method === "return" && Z.abrupt("return", Z.arg);
              ge = J;
              var at = S(U, q, Z);
              if (at.type === "normal") {
                if (ge = Z.done ? te : W, at.arg === ye) continue;
                return { value: at.arg, done: Z.done };
              }
              at.type === "throw" && (ge = te, Z.method = "throw", Z.arg = at.arg);
            }
          };
        }
        function on(U, q) {
          var Z = q.method, ge = U.iterator[Z];
          if (ge === o) return q.delegate = null, Z === "throw" && U.iterator.return && (q.method = "return", q.arg = o, on(U, q), q.method === "throw") || Z !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + Z + "' method")), ye;
          var se = S(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, ye;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, ye) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, ye);
        }
        function wi(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function pr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(wi, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var Z = -1, ge = function se() {
                for (; ++Z < U.length; ) if (a.call(U, Z)) return se.value = U[Z], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(En(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, b(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ze(ot.prototype), b(ot.prototype, u, function() {
          return this;
        }), r.AsyncIterator = ot, r.async = function(U, q, Z, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new ot(j(U, q, Z, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ze(xe), b(xe, d, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), Z = [];
          for (var ge in q) Z.push(ge);
          return Z.reverse(), function se() {
            for (; Z.length; ) {
              var Le = Z.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, pr.prototype = { constructor: pr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && a.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function Z(at, It) {
            return Le.type = "throw", Le.arg = U, q.next = at, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return Z("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), st = a.call(se, "finallyLoc");
              if ($e && st) {
                if (this.prev < se.catchLoc) return Z(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return Z(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return Z(se.catchLoc, !0);
              } else {
                if (!st) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return Z(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var Z = this.tryEntries.length - 1; Z >= 0; --Z) {
            var ge = this.tryEntries[Z];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && (U === "break" || U === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = U, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, ye) : this.complete(Le);
        }, complete: function(U, q) {
          if (U.type === "throw") throw U.arg;
          return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && q && (this.next = q), ye;
        }, finish: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var Z = this.tryEntries[q];
            if (Z.finallyLoc === U) return this.complete(Z.completion, Z.afterLoc), Ne(Z), ye;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var Z = this.tryEntries[q];
            if (Z.tryLoc === U) {
              var ge = Z.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(Z);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, Z) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: Z }, this.method === "next" && (this.arg = o), ye;
        } }, r;
      }
      function vu(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), d = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(d) : Promise.resolve(d).then(a, e);
      }
      function Tf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Lf(a.key), a);
        }
      }
      function Lf(o) {
        var r = function(n, a) {
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
      var Pr = function() {
        function o(t) {
          var i = this, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(J, te) {
            if (!(J instanceof te)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = w({}, o.defaults.options, u), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var d = this.options.theme || o.defaults.theme, b = o.defaults.themes[d];
          if (!b) throw new Error("Unknown theme ".concat(d));
          this.element.setAttribute("data-theme", d), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new b(this);
          var j = w(Pf, this.getEditorsRules()), S = function(J, te, ye) {
            return ye ? i.addNewStyleRulesToShadowRoot(J, te, ye) : i.addNewStyleRules(J, te);
          };
          if (!this.theme.options.disable_theme_rules) {
            var I = C(this.element);
            S("default", j, I), b.rules !== void 0 && S(d, b.rules, I);
          }
          var W = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          W && (this.iconlib = new W()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = o, n = [{ key: "load", value: (a = aa().mark(function t() {
          var i, u, d, b, j, S, I = this;
          return aa().wrap(function(W) {
            for (; ; ) switch (W.prev = W.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (u = new kp(this.options)).onSchemaLoaded = function(J) {
                  I.trigger("schemaLoaded", J);
                }, u.onAllSchemasLoaded = function() {
                  I.trigger("allSchemasLoaded");
                }, this.expandSchema = function(J) {
                  return u.expandSchema(J);
                }, this.expandRefs = function(J, te) {
                  return u.expandRefs(J, te);
                }, d = document.location.toString(), W.next = 9, u.load(this.schema, i, d);
              case 9:
                b = W.sent, j = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new wl(this, null, j, o.defaults), S = this.getEditorClass(b), this.root = this.createEditor(S, { jsoneditor: this, schema: b, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), x(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  I.ready && (I.validation_results = I.validator.validate(I.root.getValue()), I.root.showValidationErrors(I.validation_results), I.trigger("ready"), I.trigger("change"));
                });
              case 24:
              case "end":
                return W.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(u, d) {
            var b = a.apply(t, i);
            function j(I) {
              vu(b, u, d, j, S, "next", I);
            }
            function S(I) {
              vu(b, u, d, j, S, "throw", I);
            }
            j(void 0);
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
            for (var u = [], d = 0; d < this.callbacks[t].length; d++) this.callbacks[t][d] !== i && u.push(this.callbacks[t][d]);
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
            return i.rules ? w(t, i.rules) : t;
          }, {});
        } }, { key: "getEditorClass", value: function(t) {
          var i, u = this;
          if (t = this.expandSchema(t), o.defaults.resolvers.find(function(d) {
            return (i = d(t, u)) && o.defaults.editors[i];
          }), !i) throw new Error("Unknown editor for schema ".concat(JSON.stringify(t)));
          if (!o.defaults.editors[i]) throw new Error("Unknown editor ".concat(i));
          return o.defaults.editors[i];
        } }, { key: "createEditor", value: function(t, i) {
          var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          return new t(i = w({}, t.options || {}, i), o.defaults, u);
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
          var d;
          t.hasAttribute("data-jsoneditor-".concat(i)) ? d = t.getAttribute("data-jsoneditor-".concat(i)) : (d = this.uuid++, t.setAttribute("data-jsoneditor-".concat(i), d)), this.__data[d] = u;
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
          for (var u = [], d = 0; d < this.watchlist[t].length; d++) this.watchlist[t][d] !== i && u.push(this.watchlist[t][d]);
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
          for (var d = u.sheet ? u.sheet : u.styleSheet, b = this.element.nodeName.toLowerCase(); d.cssRules.length > 0; ) d.deleteRule(0);
          Object.keys(i).forEach(function(j) {
            var S = t === "default" ? j : "".concat(b, '[data-theme="').concat(t, '"] ').concat(j);
            d.insertRule ? d.insertRule(S + " {" + decodeURIComponent(i[j]) + "}", 0) : d.addRule && d.addRule(S, decodeURIComponent(i[j]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, u) {
          var d = this.element.nodeName.toLowerCase(), b = "";
          Object.keys(i).forEach(function(I) {
            var W = t === "default" ? I : "".concat(d, '[data-theme="').concat(t, '"] ').concat(I);
            b += W + " {" + decodeURIComponent(i[I]) + `}
`;
          });
          var j, S = new CSSStyleSheet();
          S.replaceSync(b), u.adoptedStyleSheets = [].concat(function(I) {
            if (Array.isArray(I)) return sa(I);
          }(j = u.adoptedStyleSheets) || function(I) {
            if (typeof Symbol < "u" && I[Symbol.iterator] != null || I["@@iterator"] != null) return Array.from(I);
          }(j) || function(I, W) {
            if (I) {
              if (typeof I == "string") return sa(I, W);
              var J = Object.prototype.toString.call(I).slice(8, -1);
              return J === "Object" && I.constructor && (J = I.constructor.name), J === "Map" || J === "Set" ? Array.from(I) : J === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(J) ? sa(I, W) : void 0;
            }
          }(j) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }(), [S]);
        } }, { key: "showValidationErrors", value: function(t) {
          var i = t ?? this.validate();
          Object.values(this.editors).forEach(function(u) {
            u && (u.is_dirty = !0, u.showValidationErrors(i));
          });
        } }], n && Tf(r.prototype, n), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, n, a, e;
      }();
      Pr.defaults = _n, Pr.AbstractEditor = D, Pr.AbstractTheme = Er, Pr.AbstractIconLib = Cr, Object.assign(Pr.defaults.themes, Sf), Object.assign(Pr.defaults.editors, yo), Object.assign(Pr.defaults.templates, jp), Object.assign(Pr.defaults.iconlibs, Zp);
    })(), O;
  })());
})(ud);
var Aa = ud.exports;
const ji = /* @__PURE__ */ nb(Aa), ib = {
  key: 0,
  class: "modal d-block bg-black bg-opacity-50",
  tabindex: "-1"
}, ob = { class: "modal-dialog modal-dialog-centered" }, sb = { class: "modal-content" }, ab = {
  class: "modal-body overflow-y-auto",
  style: { "max-height": "60vh" }
}, lb = ["value", "id"], ub = ["for"], cb = {
  __name: "filter_modal",
  props: {
    show: Boolean,
    allHeaders: Array,
    visibleColumns: Array
  },
  emits: ["update:show", "apply"],
  setup(l, { emit: c }) {
    const f = l, _ = c, v = /* @__PURE__ */ Yt([...f.visibleColumns]);
    Lo(() => f.show, (p) => {
      p && (v.value = [...f.visibleColumns]);
    });
    const O = () => _("update:show", !1), h = () => {
      const p = [...v.value].sort((y, m) => f.allHeaders.indexOf(y) - f.allHeaders.indexOf(m));
      _("apply", p), O();
    }, g = () => {
      v.value = [...f.allHeaders];
    }, s = () => {
      v.value = [];
    };
    return (p, y) => l.show ? (gr(), Br("div", ib, [
      We("div", ob, [
        We("div", sb, [
          We("div", { class: "modal-header" }, [
            y[1] || (y[1] = We("h5", { class: "modal-title" }, "Select Columns", -1)),
            We("button", {
              type: "button",
              class: "btn-close",
              onClick: O
            })
          ]),
          We("div", ab, [
            We("div", { class: "d-flex mb-3 gap-2 border-bottom pb-3" }, [
              We("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: g
              }, "Select All"),
              We("button", {
                class: "btn btn-sm btn-outline-secondary",
                onClick: s
              }, "Deselect All")
            ]),
            (gr(!0), Br(Qt, null, Bc(l.allHeaders, (m) => (gr(), Br("div", {
              key: m,
              class: "form-check"
            }, [
              xy(We("input", {
                class: "form-check-input",
                type: "checkbox",
                value: m,
                "onUpdate:modelValue": y[0] || (y[0] = (w) => v.value = w),
                id: "col-" + m
              }, null, 8, lb), [
                [Zm, v.value]
              ]),
              We("label", {
                class: "form-check-label",
                for: "col-" + m
              }, Qi(m), 9, ub)
            ]))), 128))
          ]),
          We("div", { class: "modal-footer" }, [
            We("button", {
              type: "button",
              class: "btn btn-primary",
              onClick: h
            }, "Apply")
          ])
        ])
      ])
    ])) : Fo("", !0);
  }
}, db = {
  key: 0,
  class: "modal d-block bg-black bg-opacity-50",
  tabindex: "-1"
}, hb = { class: "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable h-100 my-0 py-4" }, pb = { class: "modal-content shadow-lg mh-100" }, fb = { class: "modal-body p-0" }, yb = { class: "table m-0" }, mb = { class: "fw-bold text-break text-secondary" }, bb = { class: "text-break font-monospace" }, vb = { key: 0 }, gb = {
  __name: "details_modal",
  props: {
    show: Boolean,
    rowData: Object
  },
  emits: ["update:show"],
  setup(l, { emit: c }) {
    const f = c, _ = () => {
      f("update:show", !1);
    };
    return (v, O) => l.show ? (gr(), Br("div", db, [
      We("div", hb, [
        We("div", pb, [
          We("div", { class: "modal-header bg-light" }, [
            O[0] || (O[0] = We("h5", { class: "modal-title fw-bold" }, [
              We("i", { class: "fas fa-list me-2 text-primary" }),
              Ya(" Row Details ")
            ], -1)),
            We("button", {
              type: "button",
              class: "btn-close",
              onClick: _,
              "aria-label": "Close"
            })
          ]),
          We("div", fb, [
            We("table", yb, [
              O[2] || (O[2] = We("thead", { class: "table-light sticky-top" }, [
                We("tr", null, [
                  We("th", null, "Column"),
                  We("th", null, "Value")
                ])
              ], -1)),
              We("tbody", null, [
                (gr(!0), Br(Qt, null, Bc(l.rowData, (h, g) => (gr(), Br("tr", { key: g }, [
                  We("td", mb, Qi(g), 1),
                  We("td", bb, Qi(h !== "" && h !== null ? h : "-"), 1)
                ]))), 128)),
                !l.rowData || Object.keys(l.rowData).length === 0 ? (gr(), Br("tr", vb, [...O[1] || (O[1] = [
                  We("td", {
                    colspan: "2",
                    class: "text-center py-4 text-muted"
                  }, " No data available for this row. ", -1)
                ])])) : Fo("", !0)
              ])
            ])
          ]),
          We("div", { class: "modal-footer bg-light py-2" }, [
            We("button", {
              type: "button",
              class: "btn btn-secondary",
              onClick: _
            }, "Close")
          ])
        ])
      ])
    ])) : Fo("", !0);
  }
}, _b = {
  class: "d-flex flex-column h-100 w-100",
  "data-bs-theme": "light"
}, wb = {
  key: 0,
  class: "d-flex justify-content-between align-items-center"
}, _a = 200, kb = 60, jb = 48, xb = {
  __name: "table",
  props: {
    model: Object
  },
  setup(l) {
    const c = l, f = /* @__PURE__ */ Yt(null);
    let _ = null;
    const v = /* @__PURE__ */ Yt(!1), O = /* @__PURE__ */ Yt([]), h = od(() => O.value.length), g = /* @__PURE__ */ Yt(null), s = /* @__PURE__ */ Yt(!0), p = /* @__PURE__ */ Yt([]), y = /* @__PURE__ */ Yt([]), m = /* @__PURE__ */ Yt(!1), w = /* @__PURE__ */ Yt(!1), k = /* @__PURE__ */ Yt({}), C = {}, x = (D, N) => {
      if (N && !N.querySelector(`link[href="${D}"]`)) {
        const G = document.createElement("link");
        G.rel = "stylesheet", G.href = D, N.appendChild(G);
      }
    }, E = (D) => {
      if (D.defaults.editors.actionBtn) return;
      class N extends D.AbstractEditor {
        build() {
          this.btn = document.createElement("button"), this.btn.className = "btn btn-sm btn-outline-secondary py-0", this.btn.innerHTML = '<i class="fas fa-search"></i>', this.btn.type = "button", this.container.appendChild(this.btn), this.btn.addEventListener("click", (Y) => {
            Y.preventDefault();
            const ae = new CustomEvent("action-click", {
              bubbles: !0,
              composed: !0,
              // CRITICAL: Allows event to pierce Panel's Shadow DOM
              detail: this.parent.getValue()
            });
            this.container.dispatchEvent(ae);
          });
        }
        setValue() {
        }
        getValue() {
          return "";
        }
        disable() {
          this.btn && (this.btn.disabled = !1);
        }
        enable() {
          this.btn && (this.btn.disabled = !1);
        }
        showValidationErrors() {
        }
        destroy() {
          this.btn && this.btn.parentNode && this.btn.parentNode.removeChild(this.btn), super.destroy();
        }
      }
      class G extends D.AbstractEditor {
        build() {
          this.textNode = document.createElement("div"), this.textNode.className = "truncate-cell", this.container.appendChild(this.textNode);
        }
        setValue(Y) {
          this.value = Y;
          const ae = Y != null ? String(Y) : "";
          this.textNode.textContent = ae, this.textNode.title = ae;
        }
        getValue() {
          return this.value;
        }
        disable() {
        }
        enable() {
        }
        showValidationErrors() {
        }
        destroy() {
          this.textNode && this.textNode.parentNode && this.textNode.parentNode.removeChild(this.textNode), super.destroy();
        }
      }
      D.defaults.editors.actionBtn = N, D.defaults.editors.readonlyText = G, D.defaults.resolvers.unshift(($) => {
        if ($.type === "string" && $.format === "action") return "actionBtn";
        if ($.type === "string" && $.format === "readonlyText") return "readonlyText";
      });
    }, P = () => {
      const D = {};
      return D._action = { type: "string", title: " ", format: "action", default: "" }, D._rowIndex = { type: "integer", options: { hidden: !0 } }, y.value.forEach((N) => {
        D[N] = { type: "string", title: N, format: "readonlyText", default: "" };
      }), {
        type: "array",
        title: "",
        format: "table",
        options: {
          titleHidden: !0,
          disable_array_add: !0,
          disable_array_delete: !0,
          disable_array_delete_all_rows: !0,
          disable_array_delete_last_row: !0,
          disable_array_reorder: !0,
          disable_collapse: !0,
          disable_properties: !0,
          className: "m-0"
        },
        items: {
          type: "object",
          properties: D,
          additionalProperties: !1
          // CRITICAL: Stops JSON-Editor from rendering hidden columns as huge UI blocks, fixing performance instantly
        }
      };
    }, L = () => O.value.map((D, N) => ({ ...D, _rowIndex: N })), A = () => {
      var G;
      const D = (G = f.value) == null ? void 0 : G.querySelector("table");
      if (!D) return;
      let N = 0;
      D.querySelectorAll("thead th").forEach(($) => {
        getComputedStyle($).display !== "none" && (N += parseFloat($.style.width) || $.offsetWidth);
      }), D.style.width = `${N}px`;
    }, R = (D, N) => {
      const G = document.createElement("span");
      G.className = "col-resizer", G.title = "Drag to resize, double-click to reset", G.addEventListener("click", ($) => $.stopPropagation()), G.addEventListener("dblclick", ($) => {
        $.stopPropagation(), C[N] = _a, D.style.width = `${_a}px`, A();
      }), G.addEventListener("pointerdown", ($) => {
        $.preventDefault(), $.stopPropagation();
        const Y = $.clientX, ae = D.offsetWidth;
        G.setPointerCapture($.pointerId), G.classList.add("active");
        const oe = (pe) => {
          const fe = Math.max(kb, Math.round(ae + pe.clientX - Y));
          C[N] = fe, D.style.width = `${fe}px`, A();
        }, re = (pe) => {
          G.releasePointerCapture(pe.pointerId), G.classList.remove("active"), G.removeEventListener("pointermove", oe), G.removeEventListener("pointerup", re), G.removeEventListener("pointercancel", re);
        };
        G.addEventListener("pointermove", oe), G.addEventListener("pointerup", re), G.addEventListener("pointercancel", re);
      }), D.appendChild(G);
    }, F = () => {
      f.value.querySelectorAll("table thead th").forEach((N, G) => {
        if (G === 0) {
          N.style.width = `${jb}px`;
          return;
        }
        if (G === 1) return;
        const $ = y.value[G - 2];
        $ && (N.style.width = `${C[$] ?? _a}px`, N.style.cursor = "pointer", N.style.userSelect = "none", N.style.whiteSpace = "nowrap", g.value === $ ? N.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between w-100 min-w-0">
                        <span class="text-truncate">${$}</span>
                        <span class="small ms-2 flex-shrink-0">${s.value ? "▲" : "▼"}</span>
                    </div>
                ` : N.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between w-100 min-w-0">
                        <span class="text-truncate">${$}</span>
                        <span class="small ms-2 flex-shrink-0 text-muted">↕</span>
                    </div>
                `, R(N, $), N.onclick = () => {
          g.value === $ ? s.value = !s.value : (g.value = $, s.value = !0), O.value.sort((Y, ae) => {
            let oe = String(Y[$] || ""), re = String(ae[$] || "");
            return s.value ? oe.localeCompare(re) : re.localeCompare(oe);
          }), M();
        });
      }), A();
    }, M = () => {
      _ && (_.setValue(L()), _.disable(), Ca(() => {
        F();
      }));
    }, z = () => {
      _ && _.destroy();
      const D = Aa.JSONEditor || (ji == null ? void 0 : ji.JSONEditor) || window.JSONEditor;
      _ = new D(f.value, {
        theme: "bootstrap5",
        schema: P(),
        startval: L()
      }), _.on("ready", () => {
        _.disable(), y.value.length > 0 && F();
      });
    }, H = (D) => {
      y.value = D, z();
    }, V = (D) => {
      const N = D.detail, G = O.value[N._rowIndex];
      if (G) {
        const $ = { ...G };
        delete $._action, delete $._rowIndex, k.value = $, w.value = !0;
      }
    };
    return Ac(async () => {
      var G;
      await Ca();
      const D = f.value.getRootNode();
      f.value.addEventListener("action-click", V), x("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", D), x("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", D), x("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", document.head);
      const N = Aa.JSONEditor || (ji == null ? void 0 : ji.JSONEditor) || window.JSONEditor;
      E(N), (G = c.model) == null || G.on("change:value", () => {
        const $ = c.model.get("value");
        if ($) {
          if (v.value = !!$.has_run, O.value = $.data || [], $.headers && $.headers.length > 0) {
            const Y = [...new Set($.headers)];
            p.value = Y, y.value = [...Y];
          }
          g.value = null, z();
        }
      });
    }), Rc(() => {
      var D;
      (D = f.value) == null || D.removeEventListener("action-click", V), _ && _.destroy();
    }), (D, N) => (gr(), Br("div", _b, [
      v.value ? (gr(), Br("div", wb, [
        We("div", null, " Results: " + Qi(h.value), 1),
        We("button", {
          class: "btn btn-sm btn-outline-primary",
          onClick: N[0] || (N[0] = (G) => m.value = !0)
        }, [...N[3] || (N[3] = [
          We("i", { class: "fas fa-filter me-1" }, null, -1),
          Ya(" Columns ", -1)
        ])])
      ])) : Fo("", !0),
      We("div", null, [
        We("div", {
          ref_key: "editorHolder",
          ref: f
        }, null, 512)
      ]),
      tr(cb, {
        show: m.value,
        "onUpdate:show": N[1] || (N[1] = (G) => m.value = G),
        "all-headers": p.value,
        "visible-columns": y.value,
        onApply: H
      }, null, 8, ["show", "all-headers", "visible-columns"]),
      tr(gb, {
        show: w.value,
        "onUpdate:show": N[2] || (N[2] = (G) => w.value = G),
        "row-data": k.value
      }, null, 8, ["show", "row-data"])
    ]));
  }
}, Ob = ".je-ready .card{border:none!important;background:transparent!important;padding:0!important;margin:0!important}.je-ready .card-title{display:none!important}.je-ready table{table-layout:fixed}.je-ready table th,.je-ready table td{vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.je-ready .truncate-cell{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.je-ready table thead th{position:relative}.je-ready .col-resizer{position:absolute;top:0;right:0;bottom:0;width:6px;cursor:col-resize;-webkit-user-select:none;user-select:none;touch-action:none}.je-ready .col-resizer:hover,.je-ready .col-resizer.active{background:#0d6efd80}";
function Cb({ model: l, el: c }) {
  const f = document.createElement("style");
  f.innerHTML = Ob, c.append(f);
  const _ = document.createElement("div");
  _.setAttribute("id", "table-vue-app"), c.append(_);
  const v = eb(xb, { model: l });
  return v.mount(_), () => {
    v.unmount();
  };
}
export {
  Cb as render
};

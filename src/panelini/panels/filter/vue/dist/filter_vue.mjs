/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function qa(s) {
  const u = /* @__PURE__ */ Object.create(null);
  for (const p of s.split(",")) u[p] = 1;
  return (p) => p in u;
}
const at = {}, Rn = [], vr = () => {
}, uu = () => !1, Ko = (s) => s.charCodeAt(0) === 111 && s.charCodeAt(1) === 110 && // uppercase letter
(s.charCodeAt(2) > 122 || s.charCodeAt(2) < 97), Zo = (s) => s.startsWith("onUpdate:"), kt = Object.assign, $a = (s, u) => {
  const p = s.indexOf(u);
  p > -1 && s.splice(p, 1);
}, qf = Object.prototype.hasOwnProperty, et = (s, u) => qf.call(s, u), Me = Array.isArray, an = (s) => ho(s) === "[object Map]", Vo = (s) => ho(s) === "[object Set]", Tc = (s) => ho(s) === "[object Date]", qe = (s) => typeof s == "function", dt = (s) => typeof s == "string", gr = (s) => typeof s == "symbol", rt = (s) => s !== null && typeof s == "object", du = (s) => (rt(s) || qe(s)) && qe(s.then) && qe(s.catch), hu = Object.prototype.toString, ho = (s) => hu.call(s), $f = (s) => ho(s).slice(8, -1), pu = (s) => ho(s) === "[object Object]", Ua = (s) => dt(s) && s !== "NaN" && s[0] !== "-" && "" + parseInt(s, 10) === s, Yi = /* @__PURE__ */ qa(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Yo = (s) => {
  const u = /* @__PURE__ */ Object.create(null);
  return (p) => u[p] || (u[p] = s(p));
}, Uf = /-\w/g, Xt = Yo(
  (s) => s.replace(Uf, (u) => u.slice(1).toUpperCase())
), Gf = /\B([A-Z])/g, Dn = Yo(
  (s) => s.replace(Gf, "-$1").toLowerCase()
), fu = Yo((s) => s.charAt(0).toUpperCase() + s.slice(1)), ba = Yo(
  (s) => s ? `on${fu(s)}` : ""
), br = (s, u) => !Object.is(s, u), Fo = (s, ...u) => {
  for (let p = 0; p < s.length; p++)
    s[p](...u);
}, yu = (s, u, p, g = !1) => {
  Object.defineProperty(s, u, {
    configurable: !0,
    enumerable: !1,
    writable: g,
    value: p
  });
}, Ga = (s) => {
  const u = parseFloat(s);
  return isNaN(u) ? s : u;
};
let Lc;
const Qo = () => Lc || (Lc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pi(s) {
  if (Me(s)) {
    const u = {};
    for (let p = 0; p < s.length; p++) {
      const g = s[p], m = dt(g) ? Zf(g) : Pi(g);
      if (m)
        for (const O in m)
          u[O] = m[O];
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
      const g = p.split(Jf);
      g.length > 1 && (u[g[0].trim()] = g[1].trim());
    }
  }), u;
}
function In(s) {
  let u = "";
  if (dt(s))
    u = s;
  else if (Me(s))
    for (let p = 0; p < s.length; p++) {
      const g = In(s[p]);
      g && (u += g + " ");
    }
  else if (rt(s))
    for (const p in s)
      s[p] && (u += p + " ");
  return u.trim();
}
const Yf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qf = /* @__PURE__ */ qa(Yf);
function mu(s) {
  return !!s || s === "";
}
function Xf(s, u, p) {
  if (s.length !== u.length) return !1;
  let g = !0;
  for (let m = 0; g && m < s.length; m++)
    g = Xo(s[m], u[m], p);
  return g;
}
function Ac(s, u, p) {
  if (s.size !== u.size) return !1;
  const g = Array.from(u), m = new Uint8Array(g.length);
  for (const O of s) {
    let h = -1;
    for (let _ = 0; _ < g.length; _++)
      if (!m[_] && Xo(O, g[_], p)) {
        h = _;
        break;
      }
    if (h < 0) return !1;
    m[h] = 1;
  }
  return !0;
}
function ey(s, u, p) {
  let g = an(s), m = an(u);
  if (g || m || (g = Vo(s), m = Vo(u), g || m))
    return g && m ? Ac(s, u, p) : !1;
  const O = Object.keys(s).length, h = Object.keys(u).length;
  if (O !== h)
    return !1;
  for (const _ in s) {
    const a = s.hasOwnProperty(_), f = u.hasOwnProperty(_);
    if (a && !f || !a && f || !Xo(s[_], u[_], p))
      return !1;
  }
  return String(s) === String(u);
}
function Rc(s, u, p, g) {
  p || (p = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [m, O] = p;
  if (m.has(s) || O.has(u))
    return m.get(s) === u && O.get(u) === s;
  m.set(s, u), O.set(u, s);
  const h = g(s, u, p);
  return m.delete(s), O.delete(u), h;
}
function Xo(s, u, p) {
  if (s === u) return !0;
  let g = Tc(s), m = Tc(u);
  return g || m ? g && m ? s.getTime() === u.getTime() : !1 : (g = gr(s), m = gr(u), g || m ? s === u : (g = Me(s), m = Me(u), g || m ? g && m ? Rc(s, u, p, Xf) : !1 : (g = rt(s), m = rt(u), g || m ? !g || !m ? !1 : Rc(s, u, p, ey) : String(s) === String(u))));
}
const bu = (s) => !!(s && s.__v_isRef === !0), Qi = (s) => dt(s) ? s : s == null ? "" : Me(s) || rt(s) && (s.toString === hu || !qe(s.toString)) ? bu(s) ? Qi(s.value) : JSON.stringify(s, vu, 2) : String(s), vu = (s, u) => bu(u) ? vu(s, u.value) : an(u) ? {
  [`Map(${u.size})`]: [...u.entries()].reduce(
    (p, [g, m], O) => (p[va(g, O) + " =>"] = m, p),
    {}
  )
} : Vo(u) ? {
  [`Set(${u.size})`]: [...u.values()].map((p) => va(p))
} : gr(u) ? va(u) : rt(u) && !Me(u) && !pu(u) ? String(u) : u, va = (s, u = "") => {
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
        const g = this.scopes.slice();
        for (u = 0, p = g.length; u < p; u++)
          g[u].pause();
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
        const m = this.scopes.slice();
        for (u = 0, p = m.length; u < p; u++)
          m[u].resume();
      }
      const g = this.effects.slice();
      for (u = 0, p = g.length; u < p; u++)
        g[u].resume();
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
      let p, g;
      for (p = 0, g = this.effects.length; p < g; p++)
        this.effects[p].stop();
      for (this.effects.length = 0, p = 0, g = this.cleanups.length; p < g; p++)
        this.cleanups[p]();
      if (this.cleanups.length = 0, this.scopes) {
        const m = this.scopes.slice();
        for (p = 0, g = m.length; p < g; p++)
          m[p].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !u) {
        const m = this.parent.scopes.pop();
        m && m !== this && (this.parent.scopes[this.index] = m, m.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ry() {
  return gt;
}
let lt;
const ga = /* @__PURE__ */ new WeakSet();
class gu {
  constructor(u) {
    this.fn = u, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, gt && (gt.active ? gt.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ga.has(this) && (ga.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || wu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ic(this), ju(this);
    const u = lt, p = er;
    lt = this, er = !0;
    try {
      return this.fn();
    } finally {
      ku(this), lt = u, er = p, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let u = this.deps; u; u = u.nextDep)
        Ka(u);
      this.deps = this.depsTail = void 0, Ic(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ga.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ta(this) && this.run();
  }
  get dirty() {
    return Ta(this);
  }
}
let _u = 0, Xi, eo;
function wu(s, u = !1) {
  if (s.flags |= 8, u) {
    s.next = eo, eo = s;
    return;
  }
  s.next = Xi, Xi = s;
}
function Wa() {
  _u++;
}
function Ja() {
  if (--_u > 0)
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
        } catch (g) {
          s || (s = g);
        }
      u = p;
    }
  }
  if (s) throw s;
}
function ju(s) {
  for (let u = s.deps; u; u = u.nextDep)
    u.version = -1, u.prevActiveLink = u.dep.activeLink, u.dep.activeLink = u;
}
function ku(s) {
  let u, p = s.depsTail, g = p;
  for (; g; ) {
    const m = g.prevDep;
    g.version === -1 ? (g === p && (p = m), Ka(g), ny(g)) : u = g, g.dep.activeLink = g.prevActiveLink, g.prevActiveLink = void 0, g = m;
  }
  s.deps = u, s.depsTail = p;
}
function Ta(s) {
  for (let u = s.deps; u; u = u.nextDep)
    if (u.dep.version !== u.version || u.dep.computed && (xu(u.dep.computed) || u.dep.version !== u.version))
      return !0;
  return !!s._dirty;
}
function xu(s) {
  if (s.flags & 4 && !(s.flags & 16) || (s.flags &= -17, s.globalVersion === oo) || (s.globalVersion = oo, !s.isSSR && s.flags & 128 && (!s.deps && !s._dirty || !Ta(s))))
    return;
  s.flags |= 2;
  const u = s.dep, p = lt, g = er;
  lt = s, er = !0;
  try {
    ju(s);
    const m = s.fn(s._value);
    (u.version === 0 || br(m, s._value)) && (s.flags |= 128, s._value = m, u.version++);
  } catch (m) {
    throw u.version++, m;
  } finally {
    lt = p, er = g, ku(s), s.flags &= -3;
  }
}
function Ka(s, u = !1) {
  const { dep: p, prevSub: g, nextSub: m } = s;
  if (g && (g.nextSub = m, s.prevSub = void 0), m && (m.prevSub = g, s.nextSub = void 0), p.subs === s && (p.subs = g, !g && p.computed)) {
    p.computed.flags &= -5;
    for (let O = p.computed.deps; O; O = O.nextDep)
      Ka(O, !0);
  }
  !u && !--p.sc && p.map && p.map.delete(p.key);
}
function ny(s) {
  const { prevDep: u, nextDep: p } = s;
  u && (u.nextDep = p, s.prevDep = void 0), p && (p.prevDep = u, s.nextDep = void 0);
}
let er = !0;
const Ou = [];
function Br() {
  Ou.push(er), er = !1;
}
function Nr() {
  const s = Ou.pop();
  er = s === void 0 ? !0 : s;
}
function Ic(s) {
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
class Za {
  // TODO isolatedDeclarations "__v_skip"
  constructor(u) {
    this.computed = u, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(u) {
    if (!lt || !er || lt === this.computed)
      return;
    let p = this.activeLink;
    if (p === void 0 || p.sub !== lt)
      p = this.activeLink = new iy(lt, this), lt.deps ? (p.prevDep = lt.depsTail, lt.depsTail.nextDep = p, lt.depsTail = p) : lt.deps = lt.depsTail = p, Cu(p);
    else if (p.version === -1 && (p.version = this.version, p.nextDep)) {
      const g = p.nextDep;
      g.prevDep = p.prevDep, p.prevDep && (p.prevDep.nextDep = g), p.prevDep = lt.depsTail, p.nextDep = void 0, lt.depsTail.nextDep = p, lt.depsTail = p, lt.deps === p && (lt.deps = g);
    }
    return p;
  }
  trigger(u) {
    this.version++, oo++, this.notify(u);
  }
  notify(u) {
    Wa();
    try {
      for (let p = this.subs; p; p = p.prevSub)
        p.sub.notify() && p.sub.dep.notify();
    } finally {
      Ja();
    }
  }
}
function Cu(s) {
  if (s.dep.sc++, s.sub.flags & 4) {
    const u = s.dep.computed;
    if (u && !s.dep.subs) {
      u.flags |= 20;
      for (let g = u.deps; g; g = g.nextDep)
        Cu(g);
    }
    const p = s.dep.subs;
    p !== s && (s.prevSub = p, p && (p.nextSub = s)), s.dep.subs = s;
  }
}
const La = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ Symbol(
  ""
), Aa = /* @__PURE__ */ Symbol(
  ""
), so = /* @__PURE__ */ Symbol(
  ""
);
function wt(s, u, p) {
  if (er && lt) {
    let g = La.get(s);
    g || La.set(s, g = /* @__PURE__ */ new Map());
    let m = g.get(p);
    m || (g.set(p, m = new Za()), m.map = g, m.key = p), m.track();
  }
}
function Ar(s, u, p, g, m, O) {
  const h = La.get(s);
  if (!h) {
    oo++;
    return;
  }
  const _ = (a) => {
    a && a.trigger();
  };
  if (Wa(), u === "clear")
    h.forEach(_);
  else {
    const a = Me(s), f = a && Ua(p);
    if (a && p === "length") {
      const y = Number(g);
      h.forEach((b, w) => {
        (w === "length" || w === so || !gr(w) && w >= y) && _(b);
      });
    } else
      switch ((p !== void 0 || h.has(void 0)) && _(h.get(p)), f && _(h.get(so)), u) {
        case "add":
          a ? f && _(h.get("length")) : (_(h.get(Bn)), an(s) && _(h.get(Aa)));
          break;
        case "delete":
          a || (_(h.get(Bn)), an(s) && _(h.get(Aa)));
          break;
        case "set":
          an(s) && _(h.get(Bn));
          break;
      }
  }
  Ja();
}
function Oi(s) {
  const u = /* @__PURE__ */ Xe(s);
  return u === s || (wt(u, "iterate", so), /* @__PURE__ */ Ft(s)) ? u : /* @__PURE__ */ _r(s) ? /* @__PURE__ */ ln(s) ? u.map((p) => cn(Mt(p))) : u.map(cn) : u.map(Mt);
}
function es(s) {
  return wt(s = /* @__PURE__ */ Xe(s), "iterate", so), s;
}
function yr(s, u) {
  return /* @__PURE__ */ _r(s) ? cn(/* @__PURE__ */ ln(s) ? Mt(u) : u) : Mt(u);
}
const oy = {
  __proto__: null,
  [Symbol.iterator]() {
    return _a(this, Symbol.iterator, (s) => yr(this, s));
  },
  concat(...s) {
    return Oi(this).concat(
      ...s.map((u) => Me(u) ? Oi(u) : u)
    );
  },
  entries() {
    return _a(this, "entries", (s) => (s[1] = yr(this, s[1]), s));
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
      (p) => p.map((g) => yr(this, g)),
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
    return wa(this, "includes", s);
  },
  indexOf(...s) {
    return wa(this, "indexOf", s);
  },
  join(s) {
    return Oi(this).join(s);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...s) {
    return wa(this, "lastIndexOf", s);
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
    return Bc(this, "reduce", s, u);
  },
  reduceRight(s, ...u) {
    return Bc(this, "reduceRight", s, u);
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
    return Oi(this).toReversed();
  },
  toSorted(s) {
    return Oi(this).toSorted(s);
  },
  toSpliced(...s) {
    return Oi(this).toSpliced(...s);
  },
  unshift(...s) {
    return Gi(this, "unshift", s);
  },
  values() {
    return _a(this, "values", (s) => yr(this, s));
  }
};
function _a(s, u, p) {
  const g = es(s), m = g[u]();
  return g !== s && !/* @__PURE__ */ Ft(s) && (m._next = m.next, m.next = () => {
    const O = m._next();
    return O.done || (O.value = p(O.value)), O;
  }), m;
}
const sy = Array.prototype;
function Sr(s, u, p, g, m, O) {
  const h = es(s), _ = h !== s && !/* @__PURE__ */ Ft(s), a = h[u];
  if (a !== sy[u]) {
    const b = a.apply(s, O);
    return _ ? Mt(b) : b;
  }
  let f = p;
  h !== s && (_ ? f = function(b, w) {
    return p.call(this, yr(s, b), w, s);
  } : p.length > 2 && (f = function(b, w) {
    return p.call(this, b, w, s);
  }));
  const y = a.call(h, f, g);
  return _ && m ? m(y) : y;
}
function Bc(s, u, p, g) {
  const m = es(s), O = m !== s && !/* @__PURE__ */ Ft(s);
  let h = p, _ = !1;
  m !== s && (O ? (_ = g.length === 0, h = function(f, y, b) {
    return _ && (_ = !1, f = yr(s, f)), p.call(this, f, yr(s, y), b, s);
  }) : p.length > 3 && (h = function(f, y, b) {
    return p.call(this, f, y, b, s);
  }));
  const a = m[u](h, ...g);
  return _ ? yr(s, a) : a;
}
function wa(s, u, p) {
  const g = /* @__PURE__ */ Xe(s);
  wt(g, "iterate", so);
  const m = g[u](...p);
  return (m === -1 || m === !1) && /* @__PURE__ */ el(p[0]) ? (p[0] = /* @__PURE__ */ Xe(p[0]), g[u](...p)) : m;
}
function Gi(s, u, p = []) {
  Br(), Wa();
  const g = (/* @__PURE__ */ Xe(s))[u].apply(s, p);
  return Ja(), Nr(), g;
}
const ay = /* @__PURE__ */ qa("__proto__,__v_isRef,__isVue"), Eu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((s) => s !== "arguments" && s !== "caller").map((s) => Symbol[s]).filter(gr)
);
function ly(s) {
  gr(s) || (s = String(s));
  const u = /* @__PURE__ */ Xe(this);
  return wt(u, "has", s), u.hasOwnProperty(s);
}
class Su {
  constructor(u = !1, p = !1) {
    this._isReadonly = u, this._isShallow = p;
  }
  get(u, p, g) {
    if (p === "__v_skip") return u.__v_skip;
    const m = this._isReadonly, O = this._isShallow;
    if (p === "__v_isReactive")
      return !m;
    if (p === "__v_isReadonly")
      return m;
    if (p === "__v_isShallow")
      return O;
    if (p === "__v_raw")
      return g === (m ? O ? vy : Au : O ? Lu : Tu).get(u) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(u) === Object.getPrototypeOf(g) ? u : void 0;
    const h = Me(u);
    if (!m) {
      let a;
      if (h && (a = oy[p]))
        return a;
      if (p === "hasOwnProperty")
        return ly;
    }
    const _ = Reflect.get(
      u,
      p,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ jt(u) ? u : g
    );
    if ((gr(p) ? Eu.has(p) : ay(p)) || (m || wt(u, "get", p), O))
      return _;
    if (/* @__PURE__ */ jt(_)) {
      const a = h && Ua(p) ? _ : _.value;
      return m && rt(a) ? /* @__PURE__ */ Ia(a) : a;
    }
    return rt(_) ? m ? /* @__PURE__ */ Ia(_) : /* @__PURE__ */ Qa(_) : _;
  }
}
class Pu extends Su {
  constructor(u = !1) {
    super(!1, u);
  }
  set(u, p, g, m) {
    let O = u[p];
    const h = Me(u) && Ua(p);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ _r(O);
      if (!/* @__PURE__ */ Ft(g) && !/* @__PURE__ */ _r(g) && (O = /* @__PURE__ */ Xe(O), g = /* @__PURE__ */ Xe(g)), !h && /* @__PURE__ */ jt(O) && !/* @__PURE__ */ jt(g))
        return f || (O.value = g), !0;
    }
    const _ = h ? Number(p) < u.length : et(u, p), a = Reflect.set(
      u,
      p,
      g,
      /* @__PURE__ */ jt(u) ? u : m
    );
    return u === /* @__PURE__ */ Xe(m) && a && (_ ? br(g, O) && Ar(u, "set", p, g) : Ar(u, "add", p, g)), a;
  }
  deleteProperty(u, p) {
    const g = et(u, p);
    u[p];
    const m = Reflect.deleteProperty(u, p);
    return m && g && Ar(u, "delete", p, void 0), m;
  }
  has(u, p) {
    const g = Reflect.has(u, p);
    return (!gr(p) || !Eu.has(p)) && wt(u, "has", p), g;
  }
  ownKeys(u) {
    return wt(
      u,
      "iterate",
      Me(u) ? "length" : Bn
    ), Reflect.ownKeys(u);
  }
}
class cy extends Su {
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
const uy = /* @__PURE__ */ new Pu(), dy = /* @__PURE__ */ new cy(), hy = /* @__PURE__ */ new Pu(!0);
const Ra = (s) => s, Lo = (s) => Reflect.getPrototypeOf(s);
function py(s, u, p) {
  return function(...g) {
    const m = this.__v_raw, O = /* @__PURE__ */ Xe(m), h = an(O), _ = s === "entries" || s === Symbol.iterator && h, a = s === "keys" && h, f = m[s](...g), y = p ? Ra : u ? cn : Mt;
    return !u && wt(
      O,
      "iterate",
      a ? Aa : Bn
    ), kt(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: b, done: w } = f.next();
          return w ? { value: b, done: w } : {
            value: _ ? [y(b[0]), y(b[1])] : y(b),
            done: w
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
    get(m) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), _ = /* @__PURE__ */ Xe(m);
      s || (br(m, _) && wt(h, "get", m), wt(h, "get", _));
      const { has: a } = Lo(h), f = u ? Ra : s ? cn : Mt;
      if (a.call(h, m))
        return f(O.get(m));
      if (a.call(h, _))
        return f(O.get(_));
      O !== h && O.get(m);
    },
    get size() {
      const m = this.__v_raw;
      return !s && wt(/* @__PURE__ */ Xe(m), "iterate", Bn), m.size;
    },
    has(m) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), _ = /* @__PURE__ */ Xe(m);
      return s || (br(m, _) && wt(h, "has", m), wt(h, "has", _)), m === _ ? O.has(m) : O.has(m) || O.has(_);
    },
    forEach(m, O) {
      const h = this, _ = h.__v_raw, a = /* @__PURE__ */ Xe(_), f = u ? Ra : s ? cn : Mt;
      return !s && wt(a, "iterate", Bn), _.forEach((y, b) => m.call(O, f(y), f(b), h));
    }
  };
  return kt(
    p,
    s ? {
      add: Ao("add"),
      set: Ao("set"),
      delete: Ao("delete"),
      clear: Ao("clear")
    } : {
      add(m) {
        const O = /* @__PURE__ */ Xe(this), h = Lo(O), _ = /* @__PURE__ */ Xe(m), a = !u && !/* @__PURE__ */ Ft(m) && !/* @__PURE__ */ _r(m) ? _ : m;
        return h.has.call(O, a) || br(m, a) && h.has.call(O, m) || br(_, a) && h.has.call(O, _) || (O.add(a), Ar(O, "add", a, a)), this;
      },
      set(m, O) {
        !u && !/* @__PURE__ */ Ft(O) && !/* @__PURE__ */ _r(O) && (O = /* @__PURE__ */ Xe(O));
        const h = /* @__PURE__ */ Xe(this), { has: _, get: a } = Lo(h);
        let f = _.call(h, m);
        f || (m = /* @__PURE__ */ Xe(m), f = _.call(h, m));
        const y = a.call(h, m);
        return h.set(m, O), f ? br(O, y) && Ar(h, "set", m, O) : Ar(h, "add", m, O), this;
      },
      delete(m) {
        const O = /* @__PURE__ */ Xe(this), { has: h, get: _ } = Lo(O);
        let a = h.call(O, m);
        a || (m = /* @__PURE__ */ Xe(m), a = h.call(O, m)), _ && _.call(O, m);
        const f = O.delete(m);
        return a && Ar(O, "delete", m, void 0), f;
      },
      clear() {
        const m = /* @__PURE__ */ Xe(this), O = m.size !== 0, h = m.clear();
        return O && Ar(
          m,
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
  ].forEach((m) => {
    p[m] = py(m, s, u);
  }), p;
}
function Ya(s, u) {
  const p = fy(s, u);
  return (g, m, O) => m === "__v_isReactive" ? !s : m === "__v_isReadonly" ? s : m === "__v_raw" ? g : Reflect.get(
    et(p, m) && m in g ? p : g,
    m,
    O
  );
}
const yy = {
  get: /* @__PURE__ */ Ya(!1, !1)
}, my = {
  get: /* @__PURE__ */ Ya(!1, !0)
}, by = {
  get: /* @__PURE__ */ Ya(!0, !1)
};
const Tu = /* @__PURE__ */ new WeakMap(), Lu = /* @__PURE__ */ new WeakMap(), Au = /* @__PURE__ */ new WeakMap(), vy = /* @__PURE__ */ new WeakMap();
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
function Qa(s) {
  return /* @__PURE__ */ _r(s) ? s : Xa(
    s,
    !1,
    uy,
    yy,
    Tu
  );
}
// @__NO_SIDE_EFFECTS__
function _y(s) {
  return Xa(
    s,
    !1,
    hy,
    my,
    Lu
  );
}
// @__NO_SIDE_EFFECTS__
function Ia(s) {
  return Xa(
    s,
    !0,
    dy,
    by,
    Au
  );
}
function Xa(s, u, p, g, m) {
  if (!rt(s) || s.__v_raw && !(u && s.__v_isReactive) || s.__v_skip || !Object.isExtensible(s))
    return s;
  const O = m.get(s);
  if (O)
    return O;
  const h = gy($f(s));
  if (h === 0)
    return s;
  const _ = new Proxy(
    s,
    h === 2 ? g : p
  );
  return m.set(s, _), _;
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
function el(s) {
  return s ? !!s.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Xe(s) {
  const u = s && s.__v_raw;
  return u ? /* @__PURE__ */ Xe(u) : s;
}
function wy(s) {
  return !et(s, "__v_skip") && Object.isExtensible(s) && yu(s, "__v_skip", !0), s;
}
const Mt = (s) => rt(s) ? /* @__PURE__ */ Qa(s) : s, cn = (s) => rt(s) ? /* @__PURE__ */ Ia(s) : s;
// @__NO_SIDE_EFFECTS__
function jt(s) {
  return s ? s.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ln(s) {
  return jy(s, !1);
}
function jy(s, u) {
  return /* @__PURE__ */ jt(s) ? s : new ky(s, u);
}
class ky {
  constructor(u, p) {
    this.dep = new Za(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = p ? u : /* @__PURE__ */ Xe(u), this._value = p ? u : Mt(u), this.__v_isShallow = p;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(u) {
    const p = this._rawValue, g = this.__v_isShallow || /* @__PURE__ */ Ft(u) || /* @__PURE__ */ _r(u);
    u = g ? u : /* @__PURE__ */ Xe(u), br(u, p) && (this._rawValue = u, this._value = g ? u : Mt(u), this.dep.trigger());
  }
}
function xy(s) {
  return /* @__PURE__ */ jt(s) ? s.value : s;
}
const Oy = {
  get: (s, u, p) => u === "__v_raw" ? s : xy(Reflect.get(s, u, p)),
  set: (s, u, p, g) => {
    const m = s[u];
    return /* @__PURE__ */ jt(m) && !/* @__PURE__ */ jt(p) ? (m.value = p, !0) : Reflect.set(s, u, p, g);
  }
};
function Ru(s) {
  return /* @__PURE__ */ ln(s) ? s : new Proxy(s, Oy);
}
class Cy {
  constructor(u, p, g) {
    this.fn = u, this.setter = p, this._value = void 0, this.dep = new Za(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = oo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !p, this.isSSR = g;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    lt !== this)
      return wu(this, !0), !0;
  }
  get value() {
    const u = this.dep.track();
    return xu(this), u && (u.version = this.dep.version), this._value;
  }
  set value(u) {
    this.setter && this.setter(u);
  }
}
// @__NO_SIDE_EFFECTS__
function Ey(s, u, p = !1) {
  let g, m;
  return qe(s) ? g = s : (g = s.get, m = s.set), new Cy(g, m, p);
}
const Ro = {}, zo = /* @__PURE__ */ new WeakMap();
let Tn;
function Sy(s, u = !1, p = Tn) {
  if (p) {
    let g = zo.get(p);
    g || zo.set(p, g = []), g.push(s);
  }
}
function Py(s, u, p = at) {
  const { immediate: g, deep: m, once: O, scheduler: h, augmentJob: _, call: a } = p, f = (T) => m ? T : /* @__PURE__ */ Ft(T) || m === !1 || m === 0 ? Rr(T, 1) : Rr(T);
  let y, b, w, j, C = !1, k = !1;
  if (/* @__PURE__ */ jt(s) ? (b = () => s.value, C = /* @__PURE__ */ Ft(s)) : /* @__PURE__ */ ln(s) ? (b = () => f(s), C = !0) : Me(s) ? (k = !0, C = s.some((T) => /* @__PURE__ */ ln(T) || /* @__PURE__ */ Ft(T)), b = () => s.map((T) => {
    if (/* @__PURE__ */ jt(T))
      return T.value;
    if (/* @__PURE__ */ ln(T))
      return f(T);
    if (qe(T))
      return a ? a(T, 2) : T();
  })) : qe(s) ? u ? b = a ? () => a(s, 2) : s : b = () => {
    if (w) {
      Br();
      try {
        w();
      } finally {
        Nr();
      }
    }
    const T = Tn;
    Tn = y;
    try {
      return a ? a(s, 3, [j]) : s(j);
    } finally {
      Tn = T;
    }
  } : b = vr, u && m) {
    const T = b, I = m === !0 ? 1 / 0 : m;
    b = () => Rr(T(), I);
  }
  const E = ry(), P = () => {
    y.stop(), E && E.active && $a(E.effects, y);
  };
  if (O && u) {
    const T = u;
    u = (...I) => {
      const B = T(...I);
      return P(), B;
    };
  }
  let L = k ? new Array(s.length).fill(Ro) : Ro;
  const R = (T) => {
    if (!(!(y.flags & 1) || !y.dirty && !T))
      if (u) {
        const I = y.run();
        if (T || m || C || (k ? I.some((B, F) => br(B, L[F])) : br(I, L))) {
          w && w();
          const B = Tn;
          Tn = y;
          try {
            const F = [
              I,
              // pass undefined as the old value when it's changed for the first time
              L === Ro ? void 0 : k && L[0] === Ro ? [] : L,
              j
            ];
            L = I, a ? a(u, 3, F) : (
              // @ts-expect-error
              u(...F)
            );
          } finally {
            Tn = B;
          }
        }
      } else
        y.run();
  };
  return _ && _(R), y = new gu(b), y.scheduler = h ? () => h(R, !1) : R, j = (T) => Sy(T, !1, y), w = y.onStop = () => {
    const T = zo.get(y);
    if (T) {
      if (a)
        a(T, 4);
      else
        for (const I of T) I();
      zo.delete(y);
    }
  }, u ? g ? R(!0) : L = y.run() : h ? h(R.bind(null, !0), !0) : y.run(), P.pause = y.pause.bind(y), P.resume = y.resume.bind(y), P.stop = P, P;
}
function Rr(s, u = 1 / 0, p) {
  if (u <= 0 || !rt(s) || s.__v_skip || (p = p || /* @__PURE__ */ new Map(), (p.get(s) || 0) >= u))
    return s;
  if (p.set(s, u), u--, /* @__PURE__ */ jt(s))
    Rr(s.value, u, p);
  else if (Me(s))
    for (let g = 0; g < s.length; g++)
      Rr(s[g], u, p);
  else if (Vo(s) || an(s))
    s.forEach((g) => {
      Rr(g, u, p);
    });
  else if (pu(s)) {
    for (const g in s)
      Rr(s[g], u, p);
    for (const g of Object.getOwnPropertySymbols(s))
      Object.prototype.propertyIsEnumerable.call(s, g) && Rr(s[g], u, p);
  }
  return s;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function po(s, u, p, g) {
  try {
    return g ? s(...g) : s();
  } catch (m) {
    ts(m, u, p);
  }
}
function tr(s, u, p, g) {
  if (qe(s)) {
    const m = po(s, u, p, g);
    return m && du(m) && m.catch((O) => {
      ts(O, u, p);
    }), m;
  }
  if (Me(s)) {
    const m = [];
    for (let O = 0; O < s.length; O++)
      m.push(tr(s[O], u, p, g));
    return m;
  }
}
function ts(s, u, p, g = !0) {
  const m = u ? u.vnode : null, { errorHandler: O, throwUnhandledErrorInProduction: h } = u && u.appContext.config || at;
  if (u) {
    let _ = u.parent;
    const a = u.proxy, f = `https://vuejs.org/error-reference/#runtime-${p}`;
    for (; _; ) {
      const y = _.ec;
      if (y) {
        for (let b = 0; b < y.length; b++)
          if (y[b](s, a, f) === !1)
            return;
      }
      _ = _.parent;
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
  Ty(s, p, m, g, h);
}
function Ty(s, u, p, g = !0, m = !1) {
  if (m)
    throw s;
  console.error(s);
}
const Tt = [];
let fr = -1;
const Ti = [];
let sn = null, Ei = 0;
const Iu = /* @__PURE__ */ Promise.resolve();
let qo = null;
function Li(s) {
  const u = qo || Iu;
  return s ? u.then(this ? s.bind(this) : s) : u;
}
function Ly(s) {
  let u = fr + 1, p = Tt.length;
  for (; u < p; ) {
    const g = u + p >>> 1, m = Tt[g], O = ao(m);
    O < s || O === s && m.flags & 2 ? u = g + 1 : p = g;
  }
  return u;
}
function tl(s) {
  if (!(s.flags & 1)) {
    const u = ao(s), p = Tt[Tt.length - 1];
    !p || // fast path when the job id is larger than the tail
    !(s.flags & 2) && u >= ao(p) ? Tt.push(s) : Tt.splice(Ly(u), 0, s), s.flags |= 1, Bu();
  }
}
function Bu() {
  qo || (qo = Iu.then(Du));
}
function Ay(s) {
  if (!Me(s))
    sn && s.id === -1 ? sn.splice(Ei + 1, 0, s) : s.flags & 1 || (Ti.push(s), s.flags |= 1);
  else
    for (let u = 0; u < s.length; u++)
      Ti.push(s[u]);
  Bu();
}
function Nc(s, u, p = fr + 1) {
  for (; p < Tt.length; p++) {
    const g = Tt[p];
    if (g && g.flags & 2) {
      if (s && g.id !== s.uid)
        continue;
      Tt.splice(p, 1), p--, g.flags & 4 && (g.flags &= -2), g(), g.flags & 4 || (g.flags &= -2);
    }
  }
}
function Nu(s) {
  if (Ti.length) {
    const u = [...new Set(Ti)].sort(
      (p, g) => ao(p) - ao(g)
    );
    if (Ti.length = 0, sn) {
      for (let p = 0; p < u.length; p++)
        sn.push(u[p]);
      return;
    }
    for (sn = u, Ei = 0; Ei < sn.length; Ei++) {
      const p = sn[Ei];
      p.flags & 4 && (p.flags &= -2), p.flags & 8 || p(), p.flags &= -2;
    }
    sn = null, Ei = 0;
  }
}
const ao = (s) => s.id == null ? s.flags & 2 ? -1 : 1 / 0 : s.id;
function Du(s) {
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
    fr = -1, Tt.length = 0, Nu(), qo = null, (Tt.length || Ti.length) && Du();
  }
}
let Dt = null, Fu = null;
function $o(s) {
  const u = Dt;
  return Dt = s, Fu = s && s.type.__scopeId || null, u;
}
function Ry(s, u = Dt, p) {
  if (!u || s._n)
    return s;
  const g = (...m) => {
    g._d && Kc(-1);
    const O = $o(u), h = Nn.length;
    let _;
    try {
      _ = s(...m);
    } finally {
      for (let a = Nn.length; a > h; a--) ld();
      $o(O), g._d && Kc(1);
    }
    return _;
  };
  return g._n = !0, g._c = !0, g._d = !0, g;
}
function Iy(s, u) {
  if (Dt === null)
    return s;
  const p = ss(Dt), g = s.dirs || (s.dirs = []);
  for (let m = 0; m < u.length; m++) {
    let [O, h, _, a = at] = u[m];
    O && (qe(O) && (O = {
      mounted: O,
      updated: O
    }), O.deep && Rr(h), g.push({
      dir: O,
      instance: p,
      value: h,
      oldValue: void 0,
      arg: _,
      modifiers: a
    }));
  }
  return s;
}
function Sn(s, u, p, g) {
  const m = s.dirs, O = u && u.dirs;
  for (let h = 0; h < m.length; h++) {
    const _ = m[h];
    O && (_.oldValue = O[h].value);
    let a = _.dir[g];
    a && (Br(), tr(a, p, 8, [
      s.el,
      _,
      s,
      u
    ]), Nr());
  }
}
function By(s, u) {
  if (Lt) {
    let p = Lt.provides;
    const g = Lt.parent && Lt.parent.provides;
    g === p && (p = Lt.provides = Object.create(g)), p[s] = u;
  }
}
function Mo(s, u, p = !1) {
  const g = Im();
  if (g || Ai) {
    let m = Ai ? Ai._context.provides : g ? g.parent == null || g.ce ? g.vnode.appContext && g.vnode.appContext.provides : g.parent.provides : void 0;
    if (m && s in m)
      return m[s];
    if (arguments.length > 1)
      return p && qe(u) ? u.call(g && g.proxy) : u;
  }
}
const Ny = /* @__PURE__ */ Symbol.for("v-scx"), Dy = () => Mo(Ny);
function to(s, u, p) {
  return Mu(s, u, p);
}
function Mu(s, u, p = at) {
  const { immediate: g, deep: m, flush: O, once: h } = p, _ = kt({}, p), a = u && g || !u && O !== "post";
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
  _.call = (j, C, k) => tr(j, y, C, k);
  let b = !1;
  O === "post" ? _.scheduler = (j) => {
    St(j, y && y.suspense);
  } : O !== "sync" && (b = !0, _.scheduler = (j, C) => {
    C ? j() : tl(j);
  }), _.augmentJob = (j) => {
    u && (j.flags |= 4), b && (j.flags |= 2, y && (j.id = y.uid, j.i = y));
  };
  const w = Py(s, u, _);
  return uo && (f ? f.push(w) : a && w()), w;
}
function Fy(s, u, p) {
  const g = this.proxy, m = dt(s) ? s.includes(".") ? Hu(g, s) : () => g[s] : s.bind(g, g);
  let O;
  qe(u) ? O = u : (O = u.handler, p = u);
  const h = fo(this), _ = Mu(m, O.bind(g), p);
  return h(), _;
}
function Hu(s, u) {
  const p = u.split(".");
  return () => {
    let g = s;
    for (let m = 0; m < p.length && g; m++)
      g = g[p[m]];
    return g;
  };
}
const on = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ Symbol("_vte"), rs = (s) => s.__isTeleport, An = (s) => s && (s.disabled || s.disabled === ""), My = (s) => s && (s.defer || s.defer === ""), Dc = (s) => typeof SVGElement < "u" && s instanceof SVGElement, Fc = (s) => typeof MathMLElement == "function" && s instanceof MathMLElement, Ba = (s, u) => {
  const p = s && s.to;
  return dt(p) ? u ? u(p) : null : p;
}, Hy = {
  name: "Teleport",
  __isTeleport: !0,
  process(s, u, p, g, m, O, h, _, a, f) {
    const {
      mc: y,
      pc: b,
      pbc: w,
      o: { insert: j, querySelector: C, createText: k, createComment: E, parentNode: P }
    } = f, L = An(u.props);
    let { dynamicChildren: R } = u;
    const T = (F, N, H) => {
      F.shapeFlag & 16 && y(
        F.children,
        N,
        H,
        m,
        O,
        h,
        _,
        a
      );
    }, I = (F = u) => {
      const N = An(F.props), H = F.target = Ba(F.props, C), V = Na(H, F, k, j);
      H && (h !== "svg" && Dc(H) ? h = "svg" : h !== "mathml" && Fc(H) && (h = "mathml"), m && m.isCE && (m.ce._teleportTargets || (m.ce._teleportTargets = /* @__PURE__ */ new Set())).add(H), N || (T(F, H, V), Ji(F, !1)));
    }, B = (F) => {
      const N = () => {
        if (on.get(F) === N) {
          if (on.delete(F), An(F.props)) {
            const H = P(F.el) || p;
            T(F, H, F.anchor), Ji(F, !0);
          }
          I(F);
        }
      };
      on.set(F, N), St(N, O);
    };
    if (s == null) {
      const F = u.el = k(""), N = u.anchor = k("");
      if (j(F, p, g), j(N, p, g), My(u.props) || O && O.pendingBranch) {
        B(u);
        return;
      }
      L && (T(u, p, N), Ji(u, !0)), I();
    } else {
      u.el = s.el;
      const F = u.anchor = s.anchor, N = on.get(s);
      if (N) {
        N.flags |= 8, on.delete(s), B(u);
        return;
      }
      u.targetStart = s.targetStart;
      const H = u.target = s.target, V = u.targetAnchor = s.targetAnchor, z = An(s.props), K = z ? p : H, Z = z ? F : V;
      if (h === "svg" || Dc(H) ? h = "svg" : (h === "mathml" || Fc(H)) && (h = "mathml"), R ? (w(
        s.dynamicChildren,
        R,
        K,
        m,
        O,
        h,
        _
      ), ll(s, u, !0)) : a || b(
        s,
        u,
        K,
        Z,
        m,
        O,
        h,
        _,
        !1
      ), L)
        z ? u.props && s.props && u.props.to !== s.props.to && (u.props.to = s.props.to) : Io(
          u,
          p,
          F,
          f,
          1
        );
      else if ((u.props && u.props.to) !== (s.props && s.props.to)) {
        const re = Ba(u.props, C);
        re && (u.target = re, Io(
          u,
          re,
          null,
          f,
          0
        ));
      } else z && Io(
        u,
        H,
        V,
        f,
        1
      );
      Ji(u, L);
    }
  },
  remove(s, u, p, { um: g, o: { remove: m } }, O) {
    const {
      shapeFlag: h,
      children: _,
      anchor: a,
      targetStart: f,
      targetAnchor: y,
      target: b,
      props: w
    } = s, j = An(w), C = O || !j, k = on.get(s);
    if (k && (k.flags |= 8, on.delete(s)), b && (m(f), m(y)), O && m(a), !k && (j || b) && h & 16)
      for (let E = 0; E < _.length; E++) {
        const P = _[E];
        g(
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
function Io(s, u, p, { o: { insert: g }, m }, O = 2) {
  O === 0 && g(s.targetAnchor, u, p);
  const { el: h, anchor: _, shapeFlag: a, children: f, props: y } = s, b = O === 2;
  if (b && g(h, u, p), !on.has(s) && (!b || An(y)) && a & 16)
    for (let w = 0; w < f.length; w++)
      m(
        f[w],
        u,
        p,
        2
      );
  b && g(_, u, p);
}
function Vy(s, u, p, g, m, O, {
  o: { nextSibling: h, parentNode: _, querySelector: a, insert: f, createText: y }
}, b) {
  function w(E, P) {
    let L = P;
    for (; L; ) {
      if (L && L.nodeType === 8) {
        if (L.data === "teleport start anchor")
          u.targetStart = L;
        else if (L.data === "teleport anchor") {
          u.targetAnchor = L, E._lpa = u.targetAnchor && h(u.targetAnchor);
          break;
        }
      }
      L = h(L);
    }
  }
  function j(E, P) {
    P.anchor = b(
      h(E),
      P,
      _(E),
      p,
      g,
      m,
      O
    );
  }
  const C = u.target = Ba(
    u.props,
    a
  ), k = An(u.props);
  if (C) {
    const E = C._lpa || C.firstChild;
    u.shapeFlag & 16 && (k ? (j(s, u), w(C, E), u.targetAnchor || Na(
      C,
      u,
      y,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      _(s) === C ? s : null
    )) : (u.anchor = h(s), w(C, E), u.targetAnchor || Na(C, u, y, f), b(
      E && h(E),
      u,
      C,
      p,
      g,
      m,
      O
    ))), Ji(u, k);
  } else k && u.shapeFlag & 16 && (j(s, u), u.targetStart = s, u.targetAnchor = h(s));
  return u.anchor && h(u.anchor);
}
const zy = Hy;
function Ji(s, u) {
  const p = s.ctx;
  if (p && p.ut) {
    let g, m;
    for (u ? (g = s.el, m = s.anchor) : (g = s.targetStart, m = s.targetAnchor); g && g !== m; )
      g.nodeType === 1 && g.setAttribute("data-v-owner", p.uid), g = g.nextSibling;
    p.ut();
  }
}
function Na(s, u, p, g, m = null) {
  const O = u.targetStart = p(""), h = u.targetAnchor = p("");
  return O[Vu] = h, s && (g(O, s, m), g(h, s, m)), h;
}
const ja = /* @__PURE__ */ Symbol("_leaveCb");
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
function zu(s) {
  if (!nl(s))
    return rs(s.type) && s.children ? qy(s.children) : s;
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
function rl(s, u) {
  if (s.shapeFlag & 6 && s.component) {
    s.transition = u;
    const p = s.component.subTree;
    rl(
      rs(p.type) && zu(p) || p,
      u
    );
  } else s.shapeFlag & 128 ? (s.ssContent.transition = u.clone(s.ssContent), s.ssFallback.transition = u.clone(s.ssFallback)) : s.transition = u;
}
function qu(s) {
  s.ids = [s.ids[0] + s.ids[2]++ + "-", 0, 0];
}
function Mc(s, u) {
  let p;
  return !!((p = Object.getOwnPropertyDescriptor(s, u)) && !p.configurable);
}
const Uo = /* @__PURE__ */ new WeakMap();
function ro(s, u, p, g, m = !1) {
  if (Me(s)) {
    s.forEach(
      (k, E) => ro(
        k,
        u && (Me(u) ? u[E] : u),
        p,
        g,
        m
      )
    );
    return;
  }
  if (no(g) && !m) {
    g.shapeFlag & 512 && g.type.__asyncResolved && g.component.subTree.component && ro(s, u, p, g.component.subTree);
    return;
  }
  const O = g.shapeFlag & 4 ? ss(g.component) : g.el, h = m ? null : O, { i: _, r: a } = s, f = u && u.r, y = _.refs === at ? _.refs = {} : _.refs, b = _.setupState, w = /* @__PURE__ */ Xe(b), j = b === at ? uu : (k) => Mc(y, k) ? !1 : et(w, k), C = (k, E) => !(E && Mc(y, E));
  if (f != null && f !== a) {
    if (Hc(u), dt(f))
      y[f] = null, j(f) && (b[f] = null);
    else if (/* @__PURE__ */ jt(f)) {
      const k = u;
      C(f, k.k) && (f.value = null), k.k && (y[k.k] = null);
    }
  }
  if (qe(a))
    po(a, _, 12, [h, y]);
  else {
    const k = dt(a), E = /* @__PURE__ */ jt(a);
    if (k || E) {
      const P = () => {
        if (s.f) {
          const L = k ? j(a) ? b[a] : y[a] : C() || !s.k ? a.value : y[s.k];
          if (m)
            Me(L) && $a(L, O);
          else if (Me(L))
            L.includes(O) || L.push(O);
          else if (k)
            y[a] = [O], j(a) && (b[a] = y[a]);
          else {
            const R = [O];
            C(a, s.k) && (a.value = R), s.k && (y[s.k] = R);
          }
        } else k ? (y[a] = h, j(a) && (b[a] = h)) : E && (C(a, s.k) && (a.value = h), s.k && (y[s.k] = h));
      };
      if (h) {
        const L = () => {
          P(), Uo.delete(s);
        };
        L.id = -1, Uo.set(s, L), St(L, p);
      } else
        Hc(s), P();
    }
  }
}
function Hc(s) {
  const u = Uo.get(s);
  u && (u.flags |= 8, Uo.delete(s));
}
Qo().requestIdleCallback;
Qo().cancelIdleCallback;
const no = (s) => !!s.type.__asyncLoader, nl = (s) => s.type.__isKeepAlive;
function $y(s, u) {
  $u(s, "a", u);
}
function Uy(s, u) {
  $u(s, "da", u);
}
function $u(s, u, p = Lt) {
  const g = s.__wdc || (s.__wdc = () => {
    let m = p;
    for (; m; ) {
      if (m.isDeactivated)
        return;
      m = m.parent;
    }
    return s();
  });
  if (ns(u, g, p), p) {
    let m = p.parent;
    for (; m && m.parent; )
      nl(m.parent.vnode) && Gy(g, u, p, m), m = m.parent;
  }
}
function Gy(s, u, p, g) {
  const m = ns(
    u,
    s,
    g,
    !0
    /* prepend */
  );
  Uu(() => {
    $a(g[u], m);
  }, p);
}
function ns(s, u, p = Lt, g = !1) {
  if (p) {
    const m = p[s] || (p[s] = []), O = u.__weh || (u.__weh = (...h) => {
      Br();
      const _ = fo(p), a = tr(u, p, s, h);
      return _(), Nr(), a;
    });
    return g ? m.unshift(O) : m.push(O), O;
  }
}
const Fr = (s) => (u, p = Lt) => {
  (!uo || s === "sp") && ns(s, (...g) => u(...g), p);
}, Wy = Fr("bm"), il = Fr("m"), Jy = Fr(
  "bu"
), Ky = Fr("u"), ol = Fr(
  "bum"
), Uu = Fr("um"), Zy = Fr(
  "sp"
), Yy = Fr("rtg"), Qy = Fr("rtc");
function Xy(s, u = Lt) {
  ns("ec", s, u);
}
const em = /* @__PURE__ */ Symbol.for("v-ndc");
function tm(s, u, p, g) {
  let m;
  const O = p, h = Me(s);
  if (h || dt(s)) {
    const _ = h && /* @__PURE__ */ ln(s);
    let a = !1, f = !1;
    _ && (a = !/* @__PURE__ */ Ft(s), f = /* @__PURE__ */ _r(s), s = es(s)), m = new Array(s.length);
    for (let y = 0, b = s.length; y < b; y++)
      m[y] = u(
        a ? f ? cn(Mt(s[y])) : Mt(s[y]) : s[y],
        y,
        void 0,
        O
      );
  } else if (typeof s == "number") {
    m = new Array(s);
    for (let _ = 0; _ < s; _++)
      m[_] = u(_ + 1, _, void 0, O);
  } else if (rt(s))
    if (s[Symbol.iterator])
      m = Array.from(
        s,
        (_, a) => u(_, a, void 0, O)
      );
    else {
      const _ = Object.keys(s);
      m = new Array(_.length);
      for (let a = 0, f = _.length; a < f; a++) {
        const y = _[a];
        m[a] = u(s[y], y, a, O);
      }
    }
  else
    m = [];
  return m;
}
const Da = (s) => s ? fd(s) ? ss(s) : Da(s.parent) : null, io = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ kt(/* @__PURE__ */ Object.create(null), {
    $: (s) => s,
    $el: (s) => s.vnode.el,
    $data: (s) => s.data,
    $props: (s) => s.props,
    $attrs: (s) => s.attrs,
    $slots: (s) => s.slots,
    $refs: (s) => s.refs,
    $parent: (s) => Da(s.parent),
    $root: (s) => Da(s.root),
    $host: (s) => s.ce,
    $emit: (s) => s.emit,
    $options: (s) => Wu(s),
    $forceUpdate: (s) => s.f || (s.f = () => {
      tl(s.update);
    }),
    $nextTick: (s) => s.n || (s.n = Li.bind(s.proxy)),
    $watch: (s) => Fy.bind(s)
  })
), ka = (s, u) => s !== at && !s.__isScriptSetup && et(s, u), rm = {
  get({ _: s }, u) {
    if (u === "__v_skip")
      return !0;
    const { ctx: p, setupState: g, data: m, props: O, accessCache: h, type: _, appContext: a } = s;
    if (u[0] !== "$") {
      const w = h[u];
      if (w !== void 0)
        switch (w) {
          case 1:
            return g[u];
          case 2:
            return m[u];
          case 4:
            return p[u];
          case 3:
            return O[u];
        }
      else {
        if (ka(g, u))
          return h[u] = 1, g[u];
        if (m !== at && et(m, u))
          return h[u] = 2, m[u];
        if (et(O, u))
          return h[u] = 3, O[u];
        if (p !== at && et(p, u))
          return h[u] = 4, p[u];
        Fa && (h[u] = 0);
      }
    }
    const f = io[u];
    let y, b;
    if (f)
      return u === "$attrs" && wt(s.attrs, "get", ""), f(s);
    if (
      // css module (injected by vue-loader)
      (y = _.__cssModules) && (y = y[u])
    )
      return y;
    if (p !== at && et(p, u))
      return h[u] = 4, p[u];
    if (
      // global properties
      b = a.config.globalProperties, et(b, u)
    )
      return b[u];
  },
  set({ _: s }, u, p) {
    const { data: g, setupState: m, ctx: O } = s;
    return ka(m, u) ? (m[u] = p, !0) : g !== at && et(g, u) ? (g[u] = p, !0) : et(s.props, u) || u[0] === "$" && u.slice(1) in s ? !1 : (O[u] = p, !0);
  },
  has({
    _: { data: s, setupState: u, accessCache: p, ctx: g, appContext: m, props: O, type: h }
  }, _) {
    let a;
    return !!(p[_] || s !== at && _[0] !== "$" && et(s, _) || ka(u, _) || et(O, _) || et(g, _) || et(io, _) || et(m.config.globalProperties, _) || (a = h.__cssModules) && a[_]);
  },
  defineProperty(s, u, p) {
    return p.get != null ? s._.accessCache[u] = 0 : et(p, "value") && this.set(s, u, p.value, null), Reflect.defineProperty(s, u, p);
  }
};
function Vc(s) {
  return Me(s) ? s.reduce(
    (u, p) => (u[p] = null, u),
    {}
  ) : s;
}
let Fa = !0;
function nm(s) {
  const u = Wu(s), p = s.proxy, g = s.ctx;
  Fa = !1, u.beforeCreate && zc(u.beforeCreate, s, "bc");
  const {
    // state
    data: m,
    computed: O,
    methods: h,
    watch: _,
    provide: a,
    inject: f,
    // lifecycle
    created: y,
    beforeMount: b,
    mounted: w,
    beforeUpdate: j,
    updated: C,
    activated: k,
    deactivated: E,
    beforeDestroy: P,
    beforeUnmount: L,
    destroyed: R,
    unmounted: T,
    render: I,
    renderTracked: B,
    renderTriggered: F,
    errorCaptured: N,
    serverPrefetch: H,
    // public API
    expose: V,
    inheritAttrs: z,
    // assets
    components: K,
    directives: Z,
    filters: re
  } = u;
  if (f && im(f, g, null), h)
    for (const ne in h) {
      const me = h[ne];
      qe(me) && (g[ne] = me.bind(p));
    }
  if (m) {
    const ne = m.call(p, p);
    rt(ne) && (s.data = /* @__PURE__ */ Qa(ne));
  }
  if (Fa = !0, O)
    for (const ne in O) {
      const me = O[ne], fe = qe(me) ? me.bind(p, p) : qe(me.get) ? me.get.bind(p, p) : vr, ke = !qe(me) && qe(me.set) ? me.set.bind(p) : vr, Ee = md({
        get: fe,
        set: ke
      });
      Object.defineProperty(g, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (Se) => Ee.value = Se
      });
    }
  if (_)
    for (const ne in _)
      Gu(_[ne], g, p, ne);
  if (a) {
    const ne = qe(a) ? a.call(p) : a;
    Reflect.ownKeys(ne).forEach((me) => {
      By(me, ne[me]);
    });
  }
  y && zc(y, s, "c");
  function oe(ne, me) {
    Me(me) ? me.forEach((fe) => ne(fe.bind(p))) : me && ne(me.bind(p));
  }
  if (oe(Wy, b), oe(il, w), oe(Jy, j), oe(Ky, C), oe($y, k), oe(Uy, E), oe(Xy, N), oe(Qy, B), oe(Yy, F), oe(ol, L), oe(Uu, T), oe(Zy, H), Me(V))
    if (V.length) {
      const ne = s.exposed || (s.exposed = {});
      V.forEach((me) => {
        Object.defineProperty(ne, me, {
          get: () => p[me],
          set: (fe) => p[me] = fe,
          enumerable: !0
        });
      });
    } else s.exposed || (s.exposed = {});
  I && s.render === vr && (s.render = I), z != null && (s.inheritAttrs = z), K && (s.components = K), Z && (s.directives = Z), H && qu(s);
}
function im(s, u, p = vr) {
  Me(s) && (s = Ma(s));
  for (const g in s) {
    const m = s[g];
    let O;
    rt(m) ? "default" in m ? O = Mo(
      m.from || g,
      m.default,
      !0
    ) : O = Mo(m.from || g) : O = Mo(m), /* @__PURE__ */ jt(O) ? Object.defineProperty(u, g, {
      enumerable: !0,
      configurable: !0,
      get: () => O.value,
      set: (h) => O.value = h
    }) : u[g] = O;
  }
}
function zc(s, u, p) {
  tr(
    Me(s) ? s.map((g) => g.bind(u.proxy)) : s.bind(u.proxy),
    u,
    p
  );
}
function Gu(s, u, p, g) {
  let m = g.includes(".") ? Hu(p, g) : () => p[g];
  if (dt(s)) {
    const O = u[s];
    qe(O) && to(m, O);
  } else if (qe(s))
    to(m, s.bind(p));
  else if (rt(s))
    if (Me(s))
      s.forEach((O) => Gu(O, u, p, g));
    else {
      const O = qe(s.handler) ? s.handler.bind(p) : u[s.handler];
      qe(O) && to(m, O, s);
    }
}
function Wu(s) {
  const u = s.type, { mixins: p, extends: g } = u, {
    mixins: m,
    optionsCache: O,
    config: { optionMergeStrategies: h }
  } = s.appContext, _ = O.get(u);
  let a;
  return _ ? a = _ : !m.length && !p && !g ? a = u : (a = {}, m.length && m.forEach(
    (f) => Go(a, f, h, !0)
  ), Go(a, u, h)), rt(u) && O.set(u, a), a;
}
function Go(s, u, p, g = !1) {
  const { mixins: m, extends: O } = u;
  O && Go(s, O, p, !0), m && m.forEach(
    (h) => Go(s, h, p, !0)
  );
  for (const h in u)
    if (!(g && h === "expose")) {
      const _ = om[h] || p && p[h];
      s[h] = _ ? _(s[h], u[h]) : u[h];
    }
  return s;
}
const om = {
  data: qc,
  props: $c,
  emits: $c,
  // objects
  methods: Ki,
  computed: Ki,
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
  components: Ki,
  directives: Ki,
  // watch
  watch: am,
  // provide / inject
  provide: qc,
  inject: sm
};
function qc(s, u) {
  return u ? s ? function() {
    return kt(
      qe(s) ? s.call(this, this) : s,
      qe(u) ? u.call(this, this) : u
    );
  } : u : s;
}
function sm(s, u) {
  return Ki(Ma(s), Ma(u));
}
function Ma(s) {
  if (Me(s)) {
    const u = {};
    for (let p = 0; p < s.length; p++)
      u[s[p]] = s[p];
    return u;
  }
  return s;
}
function Et(s, u) {
  return s ? [...new Set([].concat(s, u))] : u;
}
function Ki(s, u) {
  return s ? kt(/* @__PURE__ */ Object.create(null), s, u) : u;
}
function $c(s, u) {
  return s ? Me(s) && Me(u) ? [.../* @__PURE__ */ new Set([...s, ...u])] : kt(
    /* @__PURE__ */ Object.create(null),
    Vc(s),
    Vc(u ?? {})
  ) : u;
}
function am(s, u) {
  if (!s) return u;
  if (!u) return s;
  const p = kt(/* @__PURE__ */ Object.create(null), s);
  for (const g in u)
    p[g] = Et(s[g], u[g]);
  return p;
}
function Ju() {
  return {
    app: null,
    config: {
      isNativeTag: uu,
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
  return function(g, m = null) {
    qe(g) || (g = kt({}, g)), m != null && !rt(m) && (m = null);
    const O = Ju(), h = /* @__PURE__ */ new WeakSet(), _ = [];
    let a = !1;
    const f = O.app = {
      _uid: lm++,
      _component: g,
      _props: m,
      _container: null,
      _context: O,
      _instance: null,
      version: Hm,
      get config() {
        return O.config;
      },
      set config(y) {
      },
      use(y, ...b) {
        return h.has(y) || (y && qe(y.install) ? (h.add(y), y.install(f, ...b)) : qe(y) && (h.add(y), y(f, ...b))), f;
      },
      mixin(y) {
        return O.mixins.includes(y) || O.mixins.push(y), f;
      },
      component(y, b) {
        return b ? (O.components[y] = b, f) : O.components[y];
      },
      directive(y, b) {
        return b ? (O.directives[y] = b, f) : O.directives[y];
      },
      mount(y, b, w) {
        if (!a) {
          const j = f._ceVNode || Ir(g, m);
          return j.appContext = O, w === !0 ? w = "svg" : w === !1 && (w = void 0), s(j, y, w), a = !0, f._container = y, y.__vue_app__ = f, ss(j.component);
        }
      },
      onUnmount(y) {
        _.push(y);
      },
      unmount() {
        a && (tr(
          _,
          f._instance,
          16
        ), s(null, f._container), delete f._container.__vue_app__);
      },
      provide(y, b) {
        return O.provides[y] = b, f;
      },
      runWithContext(y) {
        const b = Ai;
        Ai = f;
        try {
          return y();
        } finally {
          Ai = b;
        }
      }
    };
    return f;
  };
}
let Ai = null;
const um = (s, u) => u === "modelValue" || u === "model-value" ? s.modelModifiers : s[`${u}Modifiers`] || s[`${Xt(u)}Modifiers`] || s[`${Dn(u)}Modifiers`];
function dm(s, u, ...p) {
  if (s.isUnmounted) return;
  const g = s.vnode.props || at;
  let m = p;
  const O = u.startsWith("update:"), h = O && um(g, u.slice(7));
  h && (h.trim && (m = p.map((y) => dt(y) ? y.trim() : y)), h.number && (m = m.map(Ga)));
  let _, a = g[_ = ba(u)] || // also try camelCase event handler (#2249)
  g[_ = ba(Xt(u))];
  !a && O && (a = g[_ = ba(Dn(u))]), a && tr(
    a,
    s,
    6,
    m
  );
  const f = g[_ + "Once"];
  if (f) {
    if (!s.emitted)
      s.emitted = {};
    else if (s.emitted[_])
      return;
    s.emitted[_] = !0, tr(
      f,
      s,
      6,
      m
    );
  }
}
const hm = /* @__PURE__ */ new WeakMap();
function Ku(s, u, p = !1) {
  const g = p ? hm : u.emitsCache, m = g.get(s);
  if (m !== void 0)
    return m;
  const O = s.emits;
  let h = {}, _ = !1;
  if (!qe(s)) {
    const a = (f) => {
      const y = Ku(f, u, !0);
      y && (_ = !0, kt(h, y));
    };
    !p && u.mixins.length && u.mixins.forEach(a), s.extends && a(s.extends), s.mixins && s.mixins.forEach(a);
  }
  return !O && !_ ? (rt(s) && g.set(s, null), null) : (Me(O) ? O.forEach((a) => h[a] = null) : kt(h, O), rt(s) && g.set(s, h), h);
}
function is(s, u) {
  return !s || !Ko(u) ? !1 : (u = u.slice(2), u = u === "Once" ? u : u.replace(/Once$/, ""), et(s, u[0].toLowerCase() + u.slice(1)) || et(s, Dn(u)) || et(s, u));
}
function Uc(s) {
  const {
    type: u,
    vnode: p,
    proxy: g,
    withProxy: m,
    propsOptions: [O],
    slots: h,
    attrs: _,
    emit: a,
    render: f,
    renderCache: y,
    props: b,
    data: w,
    setupState: j,
    ctx: C,
    inheritAttrs: k
  } = s, E = $o(s);
  let P, L;
  try {
    if (p.shapeFlag & 4) {
      const T = m || g, I = T;
      P = mr(
        f.call(
          I,
          T,
          y,
          b,
          j,
          w,
          C
        )
      ), L = _;
    } else {
      const T = u;
      P = mr(
        T.length > 1 ? T(
          b,
          { attrs: _, slots: h, emit: a }
        ) : T(
          b,
          null
        )
      ), L = u.props ? _ : pm(_);
    }
  } catch (T) {
    Nn.length = 0, ts(T, s, 1), P = Ir(Dr);
  }
  let R = P;
  if (L && k !== !1) {
    const T = Object.keys(L), { shapeFlag: I } = R;
    T.length && I & 7 && (O && T.some(Zo) && (L = fm(
      L,
      O
    )), R = Ri(R, L, !1, !0));
  }
  if (p.dirs && (R = Ri(R, null, !1, !0), R.dirs = R.dirs ? R.dirs.concat(p.dirs) : p.dirs), p.transition) {
    const T = rs(R.type) && zu(R) || R;
    rl(T, p.transition);
  }
  return P = R, $o(E), P;
}
const pm = (s) => {
  let u;
  for (const p in s)
    (p === "class" || p === "style" || Ko(p)) && ((u || (u = {}))[p] = s[p]);
  return u;
}, fm = (s, u) => {
  const p = {};
  for (const g in s)
    (!Zo(g) || !(g.slice(9) in u)) && (p[g] = s[g]);
  return p;
};
function ym(s, u, p) {
  const { props: g, children: m, component: O } = s, { props: h, children: _, patchFlag: a } = u, f = O.emitsOptions;
  if (u.dirs || u.transition)
    return !0;
  if (p && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return g ? Gc(g, h, f) : !!h;
    if (a & 8) {
      const y = u.dynamicProps;
      for (let b = 0; b < y.length; b++) {
        const w = y[b];
        if (Zu(h, g, w) && !is(f, w))
          return !0;
      }
    }
  } else
    return (m || _) && (!_ || !_.$stable) ? !0 : g === h ? !1 : g ? h ? Gc(g, h, f) : !0 : !!h;
  return !1;
}
function Gc(s, u, p) {
  const g = Object.keys(u);
  if (g.length !== Object.keys(s).length)
    return !0;
  for (let m = 0; m < g.length; m++) {
    const O = g[m];
    if (Zu(u, s, O) && !is(p, O))
      return !0;
  }
  return !1;
}
function Zu(s, u, p) {
  const g = s[p], m = u[p];
  return p === "style" && rt(g) && rt(m) ? !Xo(g, m) : g !== m;
}
function mm({ vnode: s, parent: u, suspense: p }, g) {
  for (; u; ) {
    const m = u.subTree;
    if (m.suspense && m.suspense.activeBranch === s && (m.suspense.vnode.el = m.el = g, s = m), m === s)
      (s = u.vnode).el = g, u = u.parent;
    else
      break;
  }
  p && p.activeBranch === s && (p.vnode.el = g);
}
const Yu = {}, Qu = () => Object.create(Yu), Xu = (s) => Object.getPrototypeOf(s) === Yu;
function bm(s, u, p, g = !1) {
  const m = {}, O = Qu();
  s.propsDefaults = /* @__PURE__ */ Object.create(null), ed(s, u, m, O);
  for (const h in s.propsOptions[0])
    h in m || (m[h] = void 0);
  p ? s.props = g ? m : /* @__PURE__ */ _y(m) : s.type.props ? s.props = m : s.props = O, s.attrs = O;
}
function vm(s, u, p, g) {
  const {
    props: m,
    attrs: O,
    vnode: { patchFlag: h }
  } = s, _ = /* @__PURE__ */ Xe(m), [a] = s.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (g || h > 0) && !(h & 16)
  ) {
    if (h & 8) {
      const y = s.vnode.dynamicProps;
      for (let b = 0; b < y.length; b++) {
        let w = y[b];
        if (is(s.emitsOptions, w))
          continue;
        const j = u[w];
        if (a)
          if (et(O, w))
            j !== O[w] && (O[w] = j, f = !0);
          else {
            const C = Xt(w);
            m[C] = Ha(
              a,
              _,
              C,
              j,
              s,
              !1
            );
          }
        else
          j !== O[w] && (O[w] = j, f = !0);
      }
    }
  } else {
    ed(s, u, m, O) && (f = !0);
    let y;
    for (const b in _)
      (!u || // for camelCase
      !et(u, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = Dn(b)) === b || !et(u, y))) && (a ? p && // for camelCase
      (p[b] !== void 0 || // for kebab-case
      p[y] !== void 0) && (m[b] = Ha(
        a,
        _,
        b,
        void 0,
        s,
        !0
      )) : delete m[b]);
    if (O !== _)
      for (const b in O)
        (!u || !et(u, b)) && (delete O[b], f = !0);
  }
  f && Ar(s.attrs, "set", "");
}
function ed(s, u, p, g) {
  const [m, O] = s.propsOptions;
  let h = !1, _;
  if (u)
    for (let a in u) {
      if (Yi(a))
        continue;
      const f = u[a];
      let y;
      m && et(m, y = Xt(a)) ? !O || !O.includes(y) ? p[y] = f : (_ || (_ = {}))[y] = f : is(s.emitsOptions, a) || (!(a in g) || f !== g[a]) && (g[a] = f, h = !0);
    }
  if (O) {
    const a = /* @__PURE__ */ Xe(p), f = _ || at;
    for (let y = 0; y < O.length; y++) {
      const b = O[y];
      p[b] = Ha(
        m,
        a,
        b,
        f[b],
        s,
        !et(f, b)
      );
    }
  }
  return h;
}
function Ha(s, u, p, g, m, O) {
  const h = s[p];
  if (h != null) {
    const _ = et(h, "default");
    if (_ && g === void 0) {
      const a = h.default;
      if (h.type !== Function && !h.skipFactory && qe(a)) {
        const { propsDefaults: f } = m;
        if (p in f)
          g = f[p];
        else {
          const y = fo(m);
          g = f[p] = a.call(
            null,
            u
          ), y();
        }
      } else
        g = a;
      m.ce && m.ce._setProp(p, g);
    }
    h[
      0
      /* shouldCast */
    ] && (O && !_ ? g = !1 : h[
      1
      /* shouldCastTrue */
    ] && (g === "" || g === Dn(p)) && (g = !0));
  }
  return g;
}
const gm = /* @__PURE__ */ new WeakMap();
function td(s, u, p = !1) {
  const g = p ? gm : u.propsCache, m = g.get(s);
  if (m)
    return m;
  const O = s.props, h = {}, _ = [];
  let a = !1;
  if (!qe(s)) {
    const y = (b) => {
      a = !0;
      const [w, j] = td(b, u, !0);
      kt(h, w), j && _.push(...j);
    };
    !p && u.mixins.length && u.mixins.forEach(y), s.extends && y(s.extends), s.mixins && s.mixins.forEach(y);
  }
  if (!O && !a)
    return rt(s) && g.set(s, Rn), Rn;
  if (Me(O))
    for (let y = 0; y < O.length; y++) {
      const b = Xt(O[y]);
      Wc(b) && (h[b] = at);
    }
  else if (O)
    for (const y in O) {
      const b = Xt(y);
      if (Wc(b)) {
        const w = O[y], j = h[b] = Me(w) || qe(w) ? { type: w } : kt({}, w), C = j.type;
        let k = !1, E = !0;
        if (Me(C))
          for (let P = 0; P < C.length; ++P) {
            const L = C[P], R = qe(L) && L.name;
            if (R === "Boolean") {
              k = !0;
              break;
            } else R === "String" && (E = !1);
          }
        else
          k = qe(C) && C.name === "Boolean";
        j[
          0
          /* shouldCast */
        ] = k, j[
          1
          /* shouldCastTrue */
        ] = E, (k || et(j, "default")) && _.push(b);
      }
    }
  const f = [h, _];
  return rt(s) && g.set(s, f), f;
}
function Wc(s) {
  return s[0] !== "$" && !Yi(s);
}
const sl = (s) => s === "_" || s === "_ctx" || s === "$stable", al = (s) => Me(s) ? s.map(mr) : [mr(s)], _m = (s, u, p) => {
  if (u._n)
    return u;
  const g = Ry((...m) => al(u(...m)), p);
  return g._c = !1, g;
}, rd = (s, u, p) => {
  const g = s._ctx;
  for (const m in s) {
    if (sl(m)) continue;
    const O = s[m];
    if (qe(O))
      u[m] = _m(m, O, g);
    else if (O != null) {
      const h = al(O);
      u[m] = () => h;
    }
  }
}, nd = (s, u) => {
  const p = al(u);
  s.slots.default = () => p;
}, id = (s, u, p) => {
  for (const g in u)
    (p || !sl(g)) && (s[g] = u[g]);
}, wm = (s, u, p) => {
  const g = s.slots = Qu();
  if (s.vnode.shapeFlag & 32) {
    const m = u._;
    m ? (id(g, u, p), p && yu(g, "_", m, !0)) : rd(u, g);
  } else u && nd(s, u);
}, jm = (s, u, p) => {
  const { vnode: g, slots: m } = s;
  let O = !0, h = at;
  if (g.shapeFlag & 32) {
    const _ = u._;
    _ ? p && _ === 1 ? O = !1 : id(m, u, p) : (O = !u.$stable, rd(u, m)), h = u;
  } else u && (nd(s, u), h = { default: 1 });
  if (O)
    for (const _ in m)
      !sl(_) && h[_] == null && delete m[_];
}, St = Em;
function km(s) {
  return xm(s);
}
function xm(s, u) {
  const p = Qo();
  p.__VUE__ = !0;
  const {
    insert: g,
    remove: m,
    patchProp: O,
    createElement: h,
    createText: _,
    createComment: a,
    setText: f,
    setElementText: y,
    parentNode: b,
    nextSibling: w,
    setScopeId: j = vr,
    insertStaticContent: C
  } = s, k = (A, M, W, Y = null, Q = null, X = null, de = void 0, he = null, le = !!M.dynamicChildren) => {
    if (A === M)
      return;
    A && !Wi(A, M) && (Y = Ye(A), Se(A, Q, X, !0), A = null), M.patchFlag === -2 && (le = !1, M.dynamicChildren = null), M.dynamicChildren && A && A.dynamicChildren && A.dynamicChildren.hasOnce && (M.dynamicChildren === Rn && (M.dynamicChildren = []), M.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: je, shapeFlag: be } = M;
    switch (ie) {
      case os:
        E(A, M, W, Y);
        break;
      case Dr:
        P(A, M, W, Y);
        break;
      case Oa:
        A == null && L(M, W, Y, de);
        break;
      case Nt:
        K(
          A,
          M,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le
        );
        break;
      default:
        be & 1 ? I(
          A,
          M,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le
        ) : be & 6 ? Z(
          A,
          M,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le
        ) : (be & 64 || be & 128) && ie.process(
          A,
          M,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le,
          Te
        );
    }
    je != null && Q ? ro(je, A && A.ref, X, M || A, !M) : je == null && A && A.ref != null && ro(A.ref, null, X, A, !0);
  }, E = (A, M, W, Y) => {
    if (A == null)
      g(
        M.el = _(M.children),
        W,
        Y
      );
    else {
      const Q = M.el = A.el;
      M.children !== A.children && f(Q, M.children);
    }
  }, P = (A, M, W, Y) => {
    A == null ? g(
      M.el = a(M.children || ""),
      W,
      Y
    ) : M.el = A.el;
  }, L = (A, M, W, Y) => {
    [A.el, A.anchor] = C(
      A.children,
      M,
      W,
      Y,
      A.el,
      A.anchor
    );
  }, R = ({ el: A, anchor: M }, W, Y) => {
    let Q;
    for (; A && A !== M; )
      Q = w(A), g(A, W, Y), A = Q;
    g(M, W, Y);
  }, T = ({ el: A, anchor: M }) => {
    let W;
    for (; A && A !== M; )
      W = w(A), m(A), A = W;
    m(M);
  }, I = (A, M, W, Y, Q, X, de, he, le) => {
    if (M.type === "svg" ? de = "svg" : M.type === "math" && (de = "mathml"), A == null)
      B(
        M,
        W,
        Y,
        Q,
        X,
        de,
        he,
        le
      );
    else {
      const ie = A.el && A.el._isVueCE ? A.el : null;
      try {
        ie && ie._beginPatch(), H(
          A,
          M,
          Q,
          X,
          de,
          he,
          le
        );
      } finally {
        ie && ie._endPatch();
      }
    }
  }, B = (A, M, W, Y, Q, X, de, he) => {
    let le, ie;
    const { props: je, shapeFlag: be, transition: Ce, dirs: te } = A;
    if (le = A.el = h(
      A.type,
      X,
      je && je.is,
      je
    ), be & 8 ? y(le, A.children) : be & 16 && N(
      A.children,
      le,
      null,
      Y,
      Q,
      xa(A, X),
      de,
      he
    ), te && Sn(A, null, Y, "created"), F(le, A, A.scopeId, de, Y), je) {
      for (const ue in je)
        ue !== "value" && !Yi(ue) && O(le, ue, null, je[ue], X, Y);
      "value" in je && O(le, "value", null, je.value, X), (ie = je.onVnodeBeforeMount) && pr(ie, Y, A);
    }
    te && Sn(A, null, Y, "beforeMount");
    const ae = Om(Q, Ce);
    ae && Ce.beforeEnter(le), g(le, M, W), ((ie = je && je.onVnodeMounted) || ae || te) && St(() => {
      try {
        ie && pr(ie, Y, A), ae && Ce.enter(le), te && Sn(A, null, Y, "mounted");
      } finally {
      }
    }, Q);
  }, F = (A, M, W, Y, Q) => {
    if (W && j(A, W), Y)
      for (let X = 0; X < Y.length; X++)
        j(A, Y[X]);
    if (Q) {
      let X = Q.subTree;
      if (M === X || ad(X.type) && (X.ssContent === M || X.ssFallback === M)) {
        const de = Q.vnode;
        F(
          A,
          de,
          de.scopeId,
          de.slotScopeIds,
          Q.parent
        );
      }
    }
  }, N = (A, M, W, Y, Q, X, de, he, le = 0) => {
    for (let ie = le; ie < A.length; ie++) {
      const je = A[ie] = he ? Lr(A[ie]) : mr(A[ie]);
      k(
        null,
        je,
        M,
        W,
        Y,
        Q,
        X,
        de,
        he
      );
    }
  }, H = (A, M, W, Y, Q, X, de) => {
    const he = M.el = A.el;
    let { patchFlag: le, dynamicChildren: ie, dirs: je } = M;
    le |= A.patchFlag & 16;
    const be = A.props || at, Ce = M.props || at;
    let te;
    if (W && Pn(W, !1), (te = Ce.onVnodeBeforeUpdate) && pr(te, W, M, A), je && Sn(M, A, W, "beforeUpdate"), W && Pn(W, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!A.dynamicChildren || A.dynamicChildren.length !== ie.length) && (le = 0, de = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && y(he, ""), ie ? V(
      A.dynamicChildren,
      ie,
      he,
      W,
      Y,
      xa(M, Q),
      X
    ) : de || me(
      A,
      M,
      he,
      null,
      W,
      Y,
      xa(M, Q),
      X,
      !1
    ), le > 0) {
      if (le & 16)
        z(he, be, Ce, W, Q);
      else if (le & 2 && be.class !== Ce.class && O(he, "class", null, Ce.class, Q), le & 4 && O(he, "style", be.style, Ce.style, Q), le & 8) {
        const ae = M.dynamicProps;
        for (let ue = 0; ue < ae.length; ue++) {
          const Oe = ae[ue], Ae = be[Oe], ze = Ce[Oe];
          (ze !== Ae || Oe === "value") && O(he, Oe, Ae, ze, Q, W);
        }
      }
      le & 1 && A.children !== M.children && y(he, M.children);
    } else !de && ie == null && z(he, be, Ce, W, Q);
    ((te = Ce.onVnodeUpdated) || je) && St(() => {
      te && pr(te, W, M, A), je && Sn(M, A, W, "updated");
    }, Y);
  }, V = (A, M, W, Y, Q, X, de) => {
    for (let he = 0; he < M.length; he++) {
      const le = A[he], ie = M[he], je = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === Nt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wi(le, ie) || // - In the case of a component, it could contain anything.
        le.shapeFlag & 198) ? b(le.el) : (
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
        X,
        de,
        !0
      );
    }
  }, z = (A, M, W, Y, Q) => {
    if (M !== W) {
      if (M !== at)
        for (const X in M)
          !Yi(X) && !(X in W) && O(
            A,
            X,
            M[X],
            null,
            Q,
            Y
          );
      for (const X in W) {
        if (Yi(X)) continue;
        const de = W[X], he = M[X];
        de !== he && X !== "value" && O(A, X, he, de, Q, Y);
      }
      "value" in W && O(A, "value", M.value, W.value, Q);
    }
  }, K = (A, M, W, Y, Q, X, de, he, le) => {
    const ie = M.el = A ? A.el : _(""), je = M.anchor = A ? A.anchor : _("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: te } = M;
    te && (he = he ? he.concat(te) : te), A == null ? (g(ie, W, Y), g(je, W, Y), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      M.children || [],
      W,
      je,
      Q,
      X,
      de,
      he,
      le
    )) : be > 0 && be & 64 && Ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    A.dynamicChildren && A.dynamicChildren.length === Ce.length ? (V(
      A.dynamicChildren,
      Ce,
      W,
      Q,
      X,
      de,
      he
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (M.key != null || Q && M === Q.subTree) && ll(
      A,
      M,
      !0
      /* shallow */
    )) : me(
      A,
      M,
      W,
      je,
      Q,
      X,
      de,
      he,
      le
    );
  }, Z = (A, M, W, Y, Q, X, de, he, le) => {
    M.slotScopeIds = he, A == null ? M.shapeFlag & 512 ? Q.ctx.activate(
      M,
      W,
      Y,
      de,
      le
    ) : re(
      M,
      W,
      Y,
      Q,
      X,
      de,
      le
    ) : ce(A, M, le);
  }, re = (A, M, W, Y, Q, X, de) => {
    const he = A.component = Rm(
      A,
      Y,
      Q
    );
    if (nl(A) && (he.ctx.renderer = Te), Bm(he, !1, de), he.asyncDep) {
      if (Q && Q.registerDep(he, oe, de), !A.el) {
        const le = he.subTree = Ir(Dr);
        P(null, le, M, W), A.placeholder = le.el;
      }
    } else
      oe(
        he,
        A,
        M,
        W,
        Q,
        X,
        de
      );
  }, ce = (A, M, W) => {
    const Y = M.component = A.component;
    if (ym(A, M, W))
      if (Y.asyncDep && !Y.asyncResolved) {
        M.el = A.el, ne(Y, M, W);
        return;
      } else
        Y.next = M, Y.update();
    else
      M.el = A.el, Y.vnode = M;
  }, oe = (A, M, W, Y, Q, X, de) => {
    const he = () => {
      if (A.isMounted) {
        let { next: be, bu: Ce, u: te, parent: ae, vnode: ue } = A;
        {
          const ut = od(A);
          if (ut) {
            be && (be.el = ue.el, ne(A, be, de)), ut.asyncDep.then(() => {
              St(() => {
                A.isUnmounted || ie();
              }, Q);
            });
            return;
          }
        }
        let Oe = be, Ae;
        Pn(A, !1), be ? (be.el = ue.el, ne(A, be, de)) : be = ue, Ce && Fo(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && pr(Ae, ae, be, ue), Pn(A, !0);
        const ze = Uc(A), nt = A.subTree;
        A.subTree = ze, k(
          nt,
          ze,
          // parent may have changed if it's in a teleport
          b(nt.el),
          // anchor may have changed if it's in a fragment
          Ye(nt),
          A,
          Q,
          X
        ), be.el = ze.el, Oe === null && mm(A, ze.el), te && St(te, Q), (Ae = be.props && be.props.onVnodeUpdated) && St(
          () => pr(Ae, ae, be, ue),
          Q
        );
      } else {
        let be;
        const { el: Ce, props: te } = M, { bm: ae, m: ue, parent: Oe, root: Ae, type: ze } = A, nt = no(M);
        Pn(A, !1), ae && Fo(ae), !nt && (be = te && te.onVnodeBeforeMount) && pr(be, Oe, M), Pn(A, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(
            ze,
            A.parent ? A.parent.type : void 0
          );
          const ut = A.subTree = Uc(A);
          k(
            null,
            ut,
            W,
            Y,
            A,
            Q,
            X
          ), M.el = ut.el;
        }
        if (ue && St(ue, Q), !nt && (be = te && te.onVnodeMounted)) {
          const ut = M;
          St(
            () => pr(be, Oe, ut),
            Q
          );
        }
        (M.shapeFlag & 256 || Oe && no(Oe.vnode) && Oe.vnode.shapeFlag & 256) && A.a && St(A.a, Q), A.isMounted = !0, M = W = Y = null;
      }
    };
    A.scope.on();
    const le = A.effect = new gu(he);
    A.scope.off();
    const ie = A.update = le.run.bind(le), je = A.job = le.runIfDirty.bind(le);
    je.i = A, je.id = A.uid, le.scheduler = () => tl(je), Pn(A, !0), ie();
  }, ne = (A, M, W) => {
    M.component = A;
    const Y = A.vnode.props;
    A.vnode = M, A.next = null, vm(A, M.props, Y, W), jm(A, M.children, W), Br(), Nc(A), Nr();
  }, me = (A, M, W, Y, Q, X, de, he, le = !1) => {
    const ie = A && A.children, je = A ? A.shapeFlag : 0, be = M.children, { patchFlag: Ce, shapeFlag: te } = M;
    if (Ce > 0) {
      if (Ce & 128) {
        ke(
          ie,
          be,
          W,
          Y,
          Q,
          X,
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
          X,
          de,
          he,
          le
        );
        return;
      }
    }
    te & 8 ? (je & 16 && Fe(ie, Q, X), be !== ie && y(W, be)) : je & 16 ? te & 16 ? ke(
      ie,
      be,
      W,
      Y,
      Q,
      X,
      de,
      he,
      le
    ) : Fe(ie, Q, X, !0) : (je & 8 && y(W, ""), te & 16 && N(
      be,
      W,
      Y,
      Q,
      X,
      de,
      he,
      le
    ));
  }, fe = (A, M, W, Y, Q, X, de, he, le) => {
    A = A || Rn, M = M || Rn;
    const ie = A.length, je = M.length, be = Math.min(ie, je);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const te = M[Ce] = le ? Lr(M[Ce]) : mr(M[Ce]);
      k(
        A[Ce],
        te,
        W,
        null,
        Q,
        X,
        de,
        he,
        le
      );
    }
    ie > je ? Fe(
      A,
      Q,
      X,
      !0,
      !1,
      be
    ) : N(
      M,
      W,
      Y,
      Q,
      X,
      de,
      he,
      le,
      be
    );
  }, ke = (A, M, W, Y, Q, X, de, he, le) => {
    let ie = 0;
    const je = M.length;
    let be = A.length - 1, Ce = je - 1;
    for (; ie <= be && ie <= Ce; ) {
      const te = A[ie], ae = M[ie] = le ? Lr(M[ie]) : mr(M[ie]);
      if (Wi(te, ae))
        k(
          te,
          ae,
          W,
          null,
          Q,
          X,
          de,
          he,
          le
        );
      else
        break;
      ie++;
    }
    for (; ie <= be && ie <= Ce; ) {
      const te = A[be], ae = M[Ce] = le ? Lr(M[Ce]) : mr(M[Ce]);
      if (Wi(te, ae))
        k(
          te,
          ae,
          W,
          null,
          Q,
          X,
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
        const te = Ce + 1, ae = te < je ? M[te].el : Y;
        for (; ie <= Ce; )
          k(
            null,
            M[ie] = le ? Lr(M[ie]) : mr(M[ie]),
            W,
            ae,
            Q,
            X,
            de,
            he,
            le
          ), ie++;
      }
    } else if (ie > Ce)
      for (; ie <= be; )
        Se(A[ie], Q, X, !0), ie++;
    else {
      const te = ie, ae = ie, ue = /* @__PURE__ */ new Map();
      for (ie = ae; ie <= Ce; ie++) {
        const Je = M[ie] = le ? Lr(M[ie]) : mr(M[ie]);
        Je.key != null && ue.set(Je.key, ie);
      }
      let Oe, Ae = 0;
      const ze = Ce - ae + 1;
      let nt = !1, ut = 0;
      const ft = new Array(ze);
      for (ie = 0; ie < ze; ie++) ft[ie] = 0;
      for (ie = te; ie <= be; ie++) {
        const Je = A[ie];
        if (Ae >= ze) {
          Se(Je, Q, X, !0);
          continue;
        }
        let Ze;
        if (Je.key != null)
          Ze = ue.get(Je.key);
        else
          for (Oe = ae; Oe <= Ce; Oe++)
            if (ft[Oe - ae] === 0 && Wi(Je, M[Oe])) {
              Ze = Oe;
              break;
            }
        Ze === void 0 ? Se(Je, Q, X, !0) : (ft[Ze - ae] = ie + 1, Ze >= ut ? ut = Ze : nt = !0, k(
          Je,
          M[Ze],
          W,
          null,
          Q,
          X,
          de,
          he,
          le
        ), Ae++);
      }
      const yt = nt ? Cm(ft) : Rn;
      for (Oe = yt.length - 1, ie = ze - 1; ie >= 0; ie--) {
        const Je = ae + ie, Ze = M[Je], wr = M[Je + 1], un = Je + 1 < je ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          wr.el || sd(wr)
        ) : Y;
        ft[ie] === 0 ? k(
          null,
          Ze,
          W,
          un,
          Q,
          X,
          de,
          he,
          le
        ) : nt && (Oe < 0 || ie !== yt[Oe] ? Ee(Ze, W, un, 2) : Oe--);
      }
    }
  }, Ee = (A, M, W, Y, Q = null) => {
    const { el: X, type: de, transition: he, children: le, shapeFlag: ie } = A;
    if (ie & 6) {
      Ee(A.component.subTree, M, W, Y);
      return;
    }
    if (ie & 128) {
      A.suspense.move(M, W, Y);
      return;
    }
    if (ie & 64) {
      de.move(A, M, W, Te);
      return;
    }
    if (de === Nt) {
      g(X, M, W);
      for (let be = 0; be < le.length; be++)
        Ee(le[be], M, W, Y);
      g(A.anchor, M, W);
      return;
    }
    if (de === Oa) {
      R(A, M, W);
      return;
    }
    if (Y !== 2 && ie & 1 && he)
      if (Y === 0)
        he.persisted && !X[ja] ? g(X, M, W) : (he.beforeEnter(X), g(X, M, W), St(() => he.enter(X), Q));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: te } = he, ae = () => {
          A.ctx.isUnmounted ? m(X) : g(X, M, W);
        }, ue = () => {
          const Oe = X._isLeaving || !!X[ja];
          X._isLeaving && X[ja](
            !0
            /* cancelled */
          ), he.persisted && !Oe ? ae() : be(X, () => {
            ae(), te && te();
          });
        };
        Ce ? Ce(X, ae, ue) : ue();
      }
    else
      g(X, M, W);
  }, Se = (A, M, W, Y = !1, Q = !1) => {
    const {
      type: X,
      props: de,
      ref: he,
      children: le,
      dynamicChildren: ie,
      shapeFlag: je,
      patchFlag: be,
      dirs: Ce,
      cacheIndex: te,
      memo: ae
    } = A;
    if ((be === -2 || ie && ie.hasOnce) && (Q = !1), he != null && (Br(), ro(he, null, W, A, !0), Nr()), te != null && (!A.ctx || A.ctx === M) && (M.renderCache[te] = void 0), je & 256) {
      M.ctx.deactivate(A);
      return;
    }
    const ue = je & 1 && Ce, Oe = !no(A);
    let Ae;
    if (Oe && (Ae = de && de.onVnodeBeforeUnmount) && pr(Ae, M, A), je & 6)
      Pe(A.component, W, Y);
    else {
      if (je & 128) {
        A.suspense.unmount(W, Y);
        return;
      }
      ue && Sn(A, null, M, "beforeUnmount"), je & 64 ? A.type.remove(
        A,
        M,
        W,
        Te,
        Y
      ) : ie && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !ie.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (X !== Nt || be > 0 && be & 64) ? Fe(
        ie,
        M,
        W,
        !1,
        !0
      ) : (X === Nt && be & 384 || !Q && je & 16) && Fe(le, M, W), Y && ye(A);
    }
    const ze = ae != null && te == null;
    (Oe && (Ae = de && de.onVnodeUnmounted) || ue || ze) && St(() => {
      Ae && pr(Ae, M, A), ue && Sn(A, null, M, "unmounted"), ze && (A.el = null);
    }, W);
  }, ye = (A) => {
    const { type: M, el: W, anchor: Y, transition: Q } = A;
    if (M === Nt) {
      Re(W, Y);
      return;
    }
    if (M === Oa) {
      T(A), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
      return;
    }
    const X = () => {
      m(W), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
    };
    if (A.shapeFlag & 1 && Q && !Q.persisted) {
      const { leave: de, delayLeave: he } = Q, le = () => de(W, X);
      he ? he(A.el, X, le) : le();
    } else
      X();
  }, Re = (A, M) => {
    let W;
    for (; A !== M; )
      W = w(A), m(A), A = W;
    m(M);
  }, Pe = (A, M, W) => {
    const { bum: Y, scope: Q, job: X, subTree: de, um: he, m: le, a: ie } = A;
    Jc(le), Jc(ie), Y && Fo(Y), Q.stop(), X ? (X.flags |= 8, Se(de, A, M, W)) : A.vnode.el && de && (de.transition = A.vnode.transition, Se(de, A, M, W)), he && St(he, M), St(() => {
      A.isUnmounted = !0;
    }, M);
  }, Fe = (A, M, W, Y = !1, Q = !1, X = 0) => {
    for (let de = X; de < A.length; de++)
      Se(A[de], M, W, Y, Q);
  }, Ye = (A) => {
    if (A.shapeFlag & 6)
      return Ye(A.component.subTree);
    if (A.shapeFlag & 128)
      return A.suspense.next();
    const M = w(A.anchor || A.el), W = M && M[Vu];
    return W ? w(W) : M;
  };
  let tt = !1;
  const Ve = (A, M, W) => {
    let Y;
    A == null ? M._vnode && (Se(M._vnode, null, null, !0), Y = M._vnode.component) : k(
      M._vnode || null,
      A,
      M,
      null,
      null,
      null,
      W
    ), M._vnode = A, tt || (tt = !0, Nc(Y), Nu(), tt = !1);
  }, Te = {
    p: k,
    um: Se,
    m: Ee,
    r: ye,
    mt: re,
    mc: N,
    pc: me,
    pbc: V,
    n: Ye,
    o: s
  };
  return {
    render: Ve,
    hydrate: void 0,
    createApp: cm(Ve)
  };
}
function xa({ type: s, props: u }, p) {
  return p === "svg" && s === "foreignObject" || p === "mathml" && s === "annotation-xml" && u && u.encoding && u.encoding.includes("html") ? void 0 : p;
}
function Pn({ effect: s, job: u }, p) {
  p ? (s.flags |= 32, u.flags |= 4) : (s.flags &= -33, u.flags &= -5);
}
function Om(s, u) {
  return (!s || s && !s.pendingBranch) && u && !u.persisted;
}
function ll(s, u, p = !1) {
  const g = s.children, m = u.children;
  if (Me(g) && Me(m))
    for (let O = 0; O < g.length; O++) {
      const h = g[O];
      let _ = m[O];
      _.shapeFlag & 1 && !_.dynamicChildren && ((_.patchFlag <= 0 || _.patchFlag === 32) && (_ = m[O] = Lr(m[O]), _.el = h.el), !p && _.patchFlag !== -2 && ll(h, _)), _.type === os && (_.patchFlag === -1 && (_ = m[O] = Lr(_)), _.el = h.el), _.type === Dr && !_.el && (_.el = h.el);
    }
}
function Cm(s) {
  const u = s.slice(), p = [0];
  let g, m, O, h, _;
  const a = s.length;
  for (g = 0; g < a; g++) {
    const f = s[g];
    if (f !== 0) {
      if (m = p[p.length - 1], s[m] < f) {
        u[g] = m, p.push(g);
        continue;
      }
      for (O = 0, h = p.length - 1; O < h; )
        _ = O + h >> 1, s[p[_]] < f ? O = _ + 1 : h = _;
      f < s[p[O]] && (O > 0 && (u[g] = p[O - 1]), p[O] = g);
    }
  }
  for (O = p.length, h = p[O - 1]; O-- > 0; )
    p[O] = h, h = u[h];
  return p;
}
function od(s) {
  const u = s.subTree.component;
  if (u)
    return u.asyncDep && !u.asyncResolved ? u : od(u);
}
function Jc(s) {
  if (s)
    for (let u = 0; u < s.length; u++)
      s[u].flags |= 8;
}
function sd(s) {
  if (s.placeholder)
    return s.placeholder;
  const u = s.component;
  return u ? sd(u.subTree) : null;
}
const ad = (s) => s.__isSuspense;
function Em(s, u) {
  u && u.pendingBranch ? Me(s) ? u.effects.push(...s) : u.effects.push(s) : Ay(s);
}
const Nt = /* @__PURE__ */ Symbol.for("v-fgt"), os = /* @__PURE__ */ Symbol.for("v-txt"), Dr = /* @__PURE__ */ Symbol.for("v-cmt"), Oa = /* @__PURE__ */ Symbol.for("v-stc"), Nn = [];
let Bt = null;
function Qt(s = !1) {
  Nn.push(Bt = s ? null : []);
}
function ld() {
  Nn.pop(), Bt = Nn[Nn.length - 1] || null;
}
let lo = 1;
function Kc(s, u = !1) {
  lo += s, s < 0 && Bt && u && (Bt.hasOnce = !0);
}
function cd(s) {
  return s.dynamicChildren = lo > 0 ? Bt || Rn : null, ld(), lo > 0 && Bt && Bt.push(s), s;
}
function Pr(s, u, p, g, m, O) {
  return cd(
    Pt(
      s,
      u,
      p,
      g,
      m,
      O,
      !0
    )
  );
}
function ud(s, u, p, g, m) {
  return cd(
    Ir(
      s,
      u,
      p,
      g,
      m,
      !0
    )
  );
}
function dd(s) {
  return s ? s.__v_isVNode === !0 : !1;
}
function Wi(s, u) {
  return s.type === u.type && s.key === u.key;
}
const hd = ({ key: s }) => s ?? null, Ho = ({
  ref: s,
  ref_key: u,
  ref_for: p
}) => (typeof s == "number" && (s = "" + s), s != null ? dt(s) || /* @__PURE__ */ jt(s) || qe(s) ? { i: Dt, r: s, k: u, f: !!p } : s : null);
function Pt(s, u = null, p = null, g = 0, m = null, O = s === Nt ? 0 : 1, h = !1, _ = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: s,
    props: u,
    key: u && hd(u),
    ref: u && Ho(u),
    scopeId: Fu,
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
    patchFlag: g,
    dynamicProps: m,
    dynamicChildren: null,
    appContext: null,
    ctx: Dt
  };
  return _ ? (Wo(a, p), O & 128 && s.normalize(a)) : p && (a.shapeFlag |= dt(p) ? 8 : 16), lo > 0 && // avoid a block node from tracking itself
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
function Sm(s, u = null, p = null, g = 0, m = null, O = !1) {
  if ((!s || s === em) && (s = Dr), dd(s)) {
    const _ = Ri(
      s,
      u,
      !0
      /* mergeRef: true */
    );
    return p && Wo(_, p), lo > 0 && !O && Bt && (_.shapeFlag & 6 ? Bt[Bt.indexOf(s)] = _ : Bt.push(_)), _.patchFlag = -2, _;
  }
  if (Mm(s) && (s = s.__vccOpts), u) {
    u = Pm(u);
    let { class: _, style: a } = u;
    _ && !dt(_) && (u.class = In(_)), rt(a) && (/* @__PURE__ */ el(a) && !Me(a) && (a = kt({}, a)), u.style = Pi(a));
  }
  const h = dt(s) ? 1 : ad(s) ? 128 : rs(s) ? 64 : rt(s) ? 4 : qe(s) ? 2 : 0;
  return Pt(
    s,
    u,
    p,
    g,
    m,
    h,
    O,
    !0
  );
}
function Pm(s) {
  return s ? /* @__PURE__ */ el(s) || Xu(s) ? kt({}, s) : s : null;
}
function Ri(s, u, p = !1, g = !1) {
  const { props: m, ref: O, patchFlag: h, children: _, transition: a } = s, f = u ? Tm(m || {}, u) : m, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: s.type,
    props: f,
    key: f && hd(f),
    ref: u && u.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      p && O ? Me(O) ? O.concat(Ho(u)) : [O, Ho(u)] : Ho(u)
    ) : O,
    scopeId: s.scopeId,
    slotScopeIds: s.slotScopeIds,
    children: _,
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
  return a && g && rl(
    y,
    a.clone(y)
  ), y;
}
function pd(s = " ", u = 0) {
  return Ir(os, null, s, u);
}
function Va(s = "", u = !1) {
  return u ? (Qt(), ud(Dr, null, s)) : Ir(Dr, null, s);
}
function mr(s) {
  return s == null || typeof s == "boolean" ? Ir(Dr) : Me(s) ? Ir(
    Nt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    s.slice()
  ) : dd(s) ? Lr(s) : Ir(os, null, String(s));
}
function Lr(s) {
  return s.el === null && s.patchFlag !== -1 || s.memo ? s : Ri(s);
}
function Wo(s, u) {
  let p = 0;
  const { shapeFlag: g } = s;
  if (u == null)
    u = null;
  else if (Me(u))
    p = 16;
  else if (typeof u == "object")
    if (g & 65) {
      const m = u.default;
      m && (m._c && (m._d = !1), Wo(s, m()), m._c && (m._d = !0));
      return;
    } else {
      p = 32;
      const m = u._;
      !m && !Xu(u) ? u._ctx = Dt : m === 3 && Dt && (Dt.slots._ === 1 ? u._ = 1 : (u._ = 2, s.patchFlag |= 1024));
    }
  else if (qe(u)) {
    if (g & 65) {
      Wo(s, { default: u });
      return;
    }
    u = { default: u, _ctx: Dt }, p = 32;
  } else
    u = String(u), g & 64 ? (p = 16, u = [pd(u)]) : p = 8;
  s.children = u, s.shapeFlag |= p;
}
function Tm(...s) {
  const u = {};
  for (let p = 0; p < s.length; p++) {
    const g = s[p];
    for (const m in g)
      if (m === "class")
        u.class !== g.class && (u.class = In([u.class, g.class]));
      else if (m === "style")
        u.style = Pi([u.style, g.style]);
      else if (Ko(m)) {
        const O = u[m], h = g[m];
        h && O !== h && !(Me(O) && O.includes(h)) ? u[m] = O ? [].concat(O, h) : h : h == null && O == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Zo(m) && (u[m] = h);
      } else m !== "" && (u[m] = g[m]);
  }
  return u;
}
function pr(s, u, p, g = null) {
  tr(s, u, 7, [
    p,
    g
  ]);
}
const Lm = Ju();
let Am = 0;
function Rm(s, u, p) {
  const g = s.type, m = (u ? u.appContext : s.appContext) || Lm, O = {
    uid: Am++,
    vnode: s,
    type: g,
    parent: u,
    appContext: m,
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
    provides: u ? u.provides : Object.create(m.provides),
    ids: u ? u.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: td(g, m),
    emitsOptions: Ku(g, m),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: at,
    // inheritAttrs
    inheritAttrs: g.inheritAttrs,
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
let Jo, co;
{
  const s = Qo(), u = (p, g) => {
    let m;
    return (m = s[p]) || (m = s[p] = []), m.push(g), (O) => {
      m.length > 1 ? m.forEach((h) => h(O)) : m[0](O);
    };
  };
  Jo = u(
    "__VUE_INSTANCE_SETTERS__",
    (p) => Lt = p
  ), co = u(
    "__VUE_SSR_SETTERS__",
    (p) => uo = p
  );
}
const fo = (s) => {
  const u = Lt;
  return Jo(s), s.scope.on(), () => {
    s.scope.off(), Jo(u);
  };
}, Zc = () => {
  Lt && Lt.scope.off(), Jo(null);
};
function fd(s) {
  return s.vnode.shapeFlag & 4;
}
let uo = !1;
function Bm(s, u = !1, p = !1) {
  u && co(u);
  const { props: g, children: m } = s.vnode, O = fd(s);
  bm(s, g, O, u), wm(s, m, p || u);
  const h = O ? Nm(s, u) : void 0;
  return u && co(!1), h;
}
function Nm(s, u) {
  const p = s.type;
  s.accessCache = /* @__PURE__ */ Object.create(null), s.proxy = new Proxy(s.ctx, rm);
  const { setup: g } = p;
  if (g) {
    Br();
    const m = s.setupContext = g.length > 1 ? Fm(s) : null, O = fo(s), h = po(
      g,
      s,
      0,
      [
        s.props,
        m
      ]
    ), _ = du(h);
    if (Nr(), O(), (_ || s.sp) && !no(s) && qu(s), _) {
      if (h.then(Zc, Zc), u)
        return h.then((a) => {
          co(!0);
          try {
            Yc(s, a, u);
          } finally {
            co(!1);
          }
        }).catch((a) => {
          ts(a, s, 0);
        });
      s.asyncDep = h;
    } else
      Yc(s, h);
  } else
    yd(s);
}
function Yc(s, u, p) {
  qe(u) ? s.type.__ssrInlineRender ? s.ssrRender = u : s.render = u : rt(u) && (s.setupState = Ru(u)), yd(s);
}
function yd(s, u, p) {
  const g = s.type;
  s.render || (s.render = g.render || vr);
  {
    const m = fo(s);
    Br();
    try {
      nm(s);
    } finally {
      Nr(), m();
    }
  }
}
const Dm = {
  get(s, u) {
    return wt(s, "get", ""), s[u];
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
function ss(s) {
  return s.exposed ? s.exposeProxy || (s.exposeProxy = new Proxy(Ru(wy(s.exposed)), {
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
const md = (s, u) => /* @__PURE__ */ Ey(s, u, uo), Hm = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let za;
const Qc = typeof window < "u" && window.trustedTypes;
if (Qc)
  try {
    za = /* @__PURE__ */ Qc.createPolicy("vue", {
      createHTML: (s) => s
    });
  } catch {
  }
const bd = za ? (s) => za.createHTML(s) : (s) => s, Vm = "http://www.w3.org/2000/svg", zm = "http://www.w3.org/1998/Math/MathML", Tr = typeof document < "u" ? document : null, Xc = Tr && /* @__PURE__ */ Tr.createElement("template"), qm = {
  insert: (s, u, p) => {
    u.insertBefore(s, p || null);
  },
  remove: (s) => {
    const u = s.parentNode;
    u && u.removeChild(s);
  },
  createElement: (s, u, p, g) => {
    const m = u === "svg" ? Tr.createElementNS(Vm, s) : u === "mathml" ? Tr.createElementNS(zm, s) : p ? Tr.createElement(s, { is: p }) : Tr.createElement(s);
    return s === "select" && g && g.multiple != null && m.setAttribute("multiple", g.multiple), m;
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
  insertStaticContent(s, u, p, g, m, O) {
    const h = p ? p.previousSibling : u.lastChild;
    if (m && (m === O || m.nextSibling))
      for (; u.insertBefore(m.cloneNode(!0), p), !(m === O || !(m = m.nextSibling)); )
        ;
    else {
      Xc.innerHTML = bd(
        g === "svg" ? `<svg>${s}</svg>` : g === "mathml" ? `<math>${s}</math>` : s
      );
      const _ = Xc.content;
      if (g === "svg" || g === "mathml") {
        const a = _.firstChild;
        for (; a.firstChild; )
          _.appendChild(a.firstChild);
        _.removeChild(a);
      }
      u.insertBefore(_, p);
    }
    return [
      // first
      h ? h.nextSibling : u.firstChild,
      // last
      p ? p.previousSibling : u.lastChild
    ];
  }
}, $m = /* @__PURE__ */ Symbol("_vtc");
function Um(s, u, p) {
  const g = s[$m];
  g && (u = (u ? [u, ...g] : [...g]).join(" ")), u == null ? s.removeAttribute("class") : p ? s.setAttribute("class", u) : s.className = u;
}
const eu = /* @__PURE__ */ Symbol("_vod"), Gm = /* @__PURE__ */ Symbol("_vsh"), Wm = /* @__PURE__ */ Symbol(""), Jm = /(?:^|;)\s*display\s*:/;
function Km(s, u, p) {
  const g = s.style, m = dt(p);
  let O = !1;
  if (p && !m) {
    if (u)
      if (dt(u))
        for (const h of u.split(";")) {
          const _ = h.slice(0, h.indexOf(":")).trim();
          p[_] == null && Zi(g, _, "");
        }
      else
        for (const h in u)
          p[h] == null && Zi(g, h, "");
    for (const h in p) {
      h === "display" && (O = !0);
      const _ = p[h];
      _ != null ? Ym(
        s,
        h,
        !dt(u) && u ? u[h] : void 0,
        _
      ) || Zi(g, h, _) : Zi(g, h, "");
    }
  } else if (m) {
    if (u !== p) {
      const h = g[Wm];
      h && (p += ";" + h), g.cssText = p, O = Jm.test(p);
    }
  } else u && s.removeAttribute("style");
  eu in s && (s[eu] = O ? g.display : "", s[Gm] && (g.display = "none"));
}
const Bo = /\s*!important$/;
function Zi(s, u, p) {
  if (Me(p))
    p.forEach((g) => Zi(s, u, g));
  else if (p == null && (p = ""), u.startsWith("--"))
    Bo.test(p) ? s.setProperty(u, p.replace(Bo, ""), "important") : s.setProperty(u, p);
  else {
    const g = Zm(s, u);
    Bo.test(p) ? s.setProperty(
      Dn(g),
      p.replace(Bo, ""),
      "important"
    ) : s[g] = p;
  }
}
const tu = ["Webkit", "Moz", "ms"], Ca = {};
function Zm(s, u) {
  const p = Ca[u];
  if (p)
    return p;
  let g = Xt(u);
  if (g !== "filter" && g in s)
    return Ca[u] = g;
  g = fu(g);
  for (let m = 0; m < tu.length; m++) {
    const O = tu[m] + g;
    if (O in s)
      return Ca[u] = O;
  }
  return u;
}
function Ym(s, u, p, g) {
  return s.tagName === "TEXTAREA" && (u === "width" || u === "height") && dt(g) && p === g;
}
const ru = "http://www.w3.org/1999/xlink";
function nu(s, u, p, g, m, O = Qf(u)) {
  g && u.startsWith("xlink:") ? p == null ? s.removeAttributeNS(ru, u.slice(6, u.length)) : s.setAttributeNS(ru, u, p) : p == null || O && !mu(p) ? s.removeAttribute(u) : s.setAttribute(
    u,
    O ? "" : gr(p) ? String(p) : p
  );
}
function iu(s, u, p, g, m) {
  if (u === "innerHTML" || u === "textContent") {
    p != null && (s[u] = u === "innerHTML" ? bd(p) : p);
    return;
  }
  const O = s.tagName;
  if (u === "value" && O !== "PROGRESS" && // custom elements may use _value internally
  !O.includes("-")) {
    const _ = O === "OPTION" ? s.getAttribute("value") || "" : s.value, a = p == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      s.type === "checkbox" ? "on" : ""
    ) : String(p);
    (_ !== a || !("_value" in s)) && (s.value = a), p == null && s.removeAttribute(u), s._value = p;
    return;
  }
  let h = !1;
  if (p === "" || p == null) {
    const _ = typeof s[u];
    _ === "boolean" ? p = mu(p) : p == null && _ === "string" ? (p = "", h = !0) : _ === "number" && (p = 0, h = !0);
  }
  try {
    s[u] = p;
  } catch {
  }
  h && s.removeAttribute(m || u);
}
function Si(s, u, p, g) {
  s.addEventListener(u, p, g);
}
function Qm(s, u, p, g) {
  s.removeEventListener(u, p, g);
}
const ou = /* @__PURE__ */ Symbol("_vei");
function Xm(s, u, p, g, m = null) {
  const O = s[ou] || (s[ou] = {}), h = O[u];
  if (g && h)
    h.value = g;
  else {
    const [_, a] = rb(u);
    if (g) {
      const f = O[u] = ob(
        g,
        m
      );
      Si(s, _, f, a);
    } else h && (Qm(s, _, h, a), O[u] = void 0);
  }
}
const eb = /(Once|Passive|Capture)$/, tb = /^on:?(?:Once|Passive|Capture)$/;
function rb(s) {
  let u, p;
  for (; (p = s.match(eb)) && !tb.test(s); )
    u || (u = {}), s = s.slice(0, s.length - p[1].length), u[p[1].toLowerCase()] = !0;
  return [s[2] === ":" ? s.slice(3) : Dn(s.slice(2)), u];
}
let Ea = 0;
const nb = /* @__PURE__ */ Promise.resolve(), ib = () => Ea || (nb.then(() => Ea = 0), Ea = Date.now());
function ob(s, u) {
  const p = (g) => {
    if (!g._vts)
      g._vts = Date.now();
    else if (g._vts <= p.attached)
      return;
    const m = p.value;
    if (Me(m)) {
      const O = g.stopImmediatePropagation;
      g.stopImmediatePropagation = () => {
        O.call(g), g._stopped = !0;
      };
      const h = m.slice(), _ = [g];
      for (let a = 0; a < h.length && !g._stopped; a++) {
        const f = h[a];
        f && tr(
          f,
          u,
          5,
          _
        );
      }
    } else
      tr(
        m,
        u,
        5,
        [g]
      );
  };
  return p.value = s, p.attached = ib(), p;
}
const su = (s) => s.charCodeAt(0) === 111 && s.charCodeAt(1) === 110 && // lowercase letter
s.charCodeAt(2) > 96 && s.charCodeAt(2) < 123, sb = (s, u, p, g, m, O) => {
  const h = m === "svg";
  u === "class" ? Um(s, g, h) : u === "style" ? Km(s, p, g) : Ko(u) ? Zo(u) || Xm(s, u, p, g, O) : (u[0] === "." ? (u = u.slice(1), !0) : u[0] === "^" ? (u = u.slice(1), !1) : ab(s, u, g, h)) ? (iu(s, u, g), !s.tagName.includes("-") && (u === "value" || u === "checked" || u === "selected") && nu(s, u, g, h, O, u !== "value")) : /* #11081 force set props for possible async custom element */ s._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (lb(s, u) || // @ts-expect-error _def is private
  s._def.__asyncLoader && (/[A-Z]/.test(u) || !dt(g))) ? iu(s, Xt(u), g, O, u) : (u === "true-value" ? s._trueValue = g : u === "false-value" && (s._falseValue = g), nu(s, u, g, h));
};
function ab(s, u, p, g) {
  if (g)
    return !!(u === "innerHTML" || u === "textContent" || u in s && su(u) && qe(p));
  if (u === "spellcheck" || u === "draggable" || u === "translate" || u === "autocorrect" || u === "sandbox" && s.tagName === "IFRAME" || u === "form" || u === "list" && s.tagName === "INPUT" || u === "type" && s.tagName === "TEXTAREA")
    return !1;
  if (u === "width" || u === "height") {
    const m = s.tagName;
    if (m === "IMG" || m === "VIDEO" || m === "CANVAS" || m === "SOURCE")
      return !1;
  }
  return su(u) && dt(p) ? !1 : u in s;
}
function lb(s, u) {
  const p = (
    // @ts-expect-error _def is private
    s._def.props
  );
  if (!p)
    return !1;
  const g = Xt(u);
  return Array.isArray(p) ? p.some((m) => Xt(m) === g) : Object.keys(p).some((m) => Xt(m) === g);
}
const au = (s) => {
  const u = s.props["onUpdate:modelValue"] || !1;
  return Me(u) ? (p) => Fo(u, p) : u;
};
function cb(s) {
  s.target.composing = !0;
}
function lu(s) {
  const u = s.target;
  u.composing && (u.composing = !1, u.dispatchEvent(new Event("input")));
}
const No = /* @__PURE__ */ Symbol("_assign"), Do = /* @__PURE__ */ Symbol("_initialValue");
function Sa(s, u, p) {
  return u && (s = s.trim()), p && (s = Ga(s)), s;
}
const ub = {
  created(s, { modifiers: { lazy: u, trim: p, number: g } }, m) {
    s.parentNode && (s.type === "text" ? s[Do] = s.defaultValue.replace(/[\r\n]/g, "") : s.type === "textarea" && (s[Do] = s.defaultValue.replace(/\r\n?/g, `
`))), s[No] = au(m);
    const O = g || m.props && m.props.type === "number";
    Si(s, u ? "change" : "input", (h) => {
      h.target.composing || s[No](Sa(s.value, p, O));
    }), (p || O) && Si(s, "change", () => {
      s.value = Sa(s.value, p, O);
    }), u || (Si(s, "compositionstart", cb), Si(s, "compositionend", lu), Si(s, "change", lu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(s, { value: u, modifiers: { trim: p, number: g } }) {
    const m = u ?? "", O = s[Do];
    delete s[Do], O !== void 0 && (s.type === "text" || s.type === "textarea") && s.value !== O ? s[No](Sa(s.value, p, g)) : s.value = m;
  },
  beforeUpdate(s, { value: u, oldValue: p, modifiers: { lazy: g, trim: m, number: O } }, h) {
    if (s[No] = au(h), s.composing) return;
    const _ = (O || s.type === "number") && !/^0\d/.test(s.value) ? Ga(s.value) : s.value, a = u ?? "";
    if (_ === a)
      return;
    const f = s.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === s && s.type !== "range" && (g && u === p || m && s.value.trim() === a) || (s.value = a);
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
}, Ci = (s, u) => {
  if (!s) return s;
  const p = s._withMods || (s._withMods = {}), g = u.join(".");
  return p[g] || (p[g] = (m, ...O) => {
    for (let h = 0; h < u.length; h++) {
      const _ = hb[u[h]];
      if (_ && _(m, u)) return;
    }
    return s(m, ...O);
  });
}, pb = /* @__PURE__ */ kt({ patchProp: sb }, qm);
let cu;
function fb() {
  return cu || (cu = km(pb));
}
const vd = (...s) => {
  const u = fb().createApp(...s), { mount: p } = u;
  return u.mount = (g) => {
    const m = mb(g);
    if (!m) return;
    const O = u._component;
    !qe(O) && !O.render && !O.template && (O.template = m.innerHTML), m.nodeType === 1 && (m.textContent = "");
    const h = p(m, !1, yb(m));
    return m instanceof Element && (m.removeAttribute("v-cloak"), m.setAttribute("data-v-app", "")), h;
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
  (function(p, g) {
    s.exports = g();
  })(self, () => (() => {
    var p = { 9306: (h, _, a) => {
      var f = a(4901), y = a(6823), b = TypeError;
      h.exports = function(w) {
        if (f(w)) return w;
        throw new b(y(w) + " is not a function");
      };
    }, 5548: (h, _, a) => {
      var f = a(3517), y = a(6823), b = TypeError;
      h.exports = function(w) {
        if (f(w)) return w;
        throw new b(y(w) + " is not a constructor");
      };
    }, 3506: (h, _, a) => {
      var f = a(3925), y = String, b = TypeError;
      h.exports = function(w) {
        if (f(w)) return w;
        throw new b("Can't set " + y(w) + " as a prototype");
      };
    }, 6469: (h, _, a) => {
      var f = a(8227), y = a(2360), b = a(4913).f, w = f("unscopables"), j = Array.prototype;
      j[w] === void 0 && b(j, w, { configurable: !0, value: y(null) }), h.exports = function(C) {
        j[w][C] = !0;
      };
    }, 7829: (h, _, a) => {
      var f = a(8183).charAt;
      h.exports = function(y, b, w) {
        return b + (w ? f(y, b).length : 1);
      };
    }, 679: (h, _, a) => {
      var f = a(1625), y = TypeError;
      h.exports = function(b, w) {
        if (f(w, b)) return b;
        throw new y("Incorrect invocation");
      };
    }, 8551: (h, _, a) => {
      var f = a(34), y = String, b = TypeError;
      h.exports = function(w) {
        if (f(w)) return w;
        throw new b(y(w) + " is not an object");
      };
    }, 235: (h, _, a) => {
      var f = a(9213).forEach, y = a(4598)("forEach");
      h.exports = y ? [].forEach : function(b) {
        return f(this, b, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (h, _, a) => {
      var f = a(6080), y = a(9565), b = a(8981), w = a(6319), j = a(4209), C = a(3517), k = a(6198), E = a(4659), P = a(81), L = a(851), R = Array;
      h.exports = function(T) {
        var I = b(T), B = C(this), F = arguments.length, N = F > 1 ? arguments[1] : void 0, H = N !== void 0;
        H && (N = f(N, F > 2 ? arguments[2] : void 0));
        var V, z, K, Z, re, ce, oe = L(I), ne = 0;
        if (!oe || this === R && j(oe)) for (V = k(I), z = B ? new this(V) : R(V); V > ne; ne++) ce = H ? N(I[ne], ne) : I[ne], E(z, ne, ce);
        else for (z = B ? new this() : [], re = (Z = P(I, oe)).next; !(K = y(re, Z)).done; ne++) ce = H ? w(Z, N, [K.value, ne], !0) : K.value, E(z, ne, ce);
        return z.length = ne, z;
      };
    }, 9617: (h, _, a) => {
      var f = a(5397), y = a(5610), b = a(6198), w = function(j) {
        return function(C, k, E) {
          var P = f(C), L = b(P);
          if (L === 0) return !j && -1;
          var R, T = y(E, L);
          if (j && k != k) {
            for (; L > T; ) if ((R = P[T++]) != R) return !0;
          } else for (; L > T; T++) if ((j || T in P) && P[T] === k) return j || T || 0;
          return !j && -1;
        };
      };
      h.exports = { includes: w(!0), indexOf: w(!1) };
    }, 9213: (h, _, a) => {
      var f = a(6080), y = a(9504), b = a(7055), w = a(8981), j = a(6198), C = a(1469), k = y([].push), E = function(P) {
        var L = P === 1, R = P === 2, T = P === 3, I = P === 4, B = P === 6, F = P === 7, N = P === 5 || B;
        return function(H, V, z, K) {
          for (var Z, re, ce = w(H), oe = b(ce), ne = j(oe), me = f(V, z), fe = 0, ke = K || C, Ee = L ? ke(H, ne) : R || F ? ke(H, 0) : void 0; ne > fe; fe++) if ((N || fe in oe) && (re = me(Z = oe[fe], fe, ce), P)) if (L) Ee[fe] = re;
          else if (re) switch (P) {
            case 3:
              return !0;
            case 5:
              return Z;
            case 6:
              return fe;
            case 2:
              k(Ee, Z);
          }
          else switch (P) {
            case 4:
              return !1;
            case 7:
              k(Ee, Z);
          }
          return B ? -1 : T || I ? I : Ee;
        };
      };
      h.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (h, _, a) => {
      var f = a(9039), y = a(8227), b = a(7388), w = y("species");
      h.exports = function(j) {
        return b >= 51 || !f(function() {
          var C = [];
          return (C.constructor = {})[w] = function() {
            return { foo: 1 };
          }, C[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (h, _, a) => {
      var f = a(9039);
      h.exports = function(y, b) {
        var w = [][y];
        return !!w && f(function() {
          w.call(null, b || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (h, _, a) => {
      var f = a(9306), y = a(8981), b = a(7055), w = a(6198), j = TypeError, C = "Reduce of empty array with no initial value", k = function(E) {
        return function(P, L, R, T) {
          var I = y(P), B = b(I), F = w(I);
          if (f(L), F === 0 && R < 2) throw new j(C);
          var N = E ? F - 1 : 0, H = E ? -1 : 1;
          if (R < 2) for (; ; ) {
            if (N in B) {
              T = B[N], N += H;
              break;
            }
            if (N += H, E ? N < 0 : F <= N) throw new j(C);
          }
          for (; E ? N >= 0 : F > N; N += H) N in B && (T = L(T, B[N], N, I));
          return T;
        };
      };
      h.exports = { left: k(!1), right: k(!0) };
    }, 4527: (h, _, a) => {
      var f = a(3724), y = a(4376), b = TypeError, w = Object.getOwnPropertyDescriptor, j = f && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (C) {
          return C instanceof TypeError;
        }
      }();
      h.exports = j ? function(C, k) {
        if (y(C) && !w(C, "length").writable) throw new b("Cannot set read only .length");
        return C.length = k;
      } : function(C, k) {
        return C.length = k;
      };
    }, 7680: (h, _, a) => {
      var f = a(9504);
      h.exports = f([].slice);
    }, 4488: (h, _, a) => {
      var f = a(7680), y = Math.floor, b = function(w, j) {
        var C = w.length;
        if (C < 8) for (var k, E, P = 1; P < C; ) {
          for (E = P, k = w[P]; E && j(w[E - 1], k) > 0; ) w[E] = w[--E];
          E !== P++ && (w[E] = k);
        }
        else for (var L = y(C / 2), R = b(f(w, 0, L), j), T = b(f(w, L), j), I = R.length, B = T.length, F = 0, N = 0; F < I || N < B; ) w[F + N] = F < I && N < B ? j(R[F], T[N]) <= 0 ? R[F++] : T[N++] : F < I ? R[F++] : T[N++];
        return w;
      };
      h.exports = b;
    }, 7433: (h, _, a) => {
      var f = a(4376), y = a(3517), b = a(34), w = a(8227)("species"), j = Array;
      h.exports = function(C) {
        var k;
        return f(C) && (k = C.constructor, (y(k) && (k === j || f(k.prototype)) || b(k) && (k = k[w]) === null) && (k = void 0)), k === void 0 ? j : k;
      };
    }, 1469: (h, _, a) => {
      var f = a(7433);
      h.exports = function(y, b) {
        return new (f(y))(b === 0 ? 0 : b);
      };
    }, 6319: (h, _, a) => {
      var f = a(8551), y = a(9539);
      h.exports = function(b, w, j, C) {
        try {
          return C ? w(f(j)[0], j[1]) : w(j);
        } catch (k) {
          y(b, "throw", k);
        }
      };
    }, 4428: (h, _, a) => {
      var f = a(8227)("iterator"), y = !1;
      try {
        var b = 0, w = { next: function() {
          return { done: !!b++ };
        }, return: function() {
          y = !0;
        } };
        w[f] = function() {
          return this;
        }, Array.from(w, function() {
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
    }, 4576: (h, _, a) => {
      var f = a(9504), y = f({}.toString), b = f("".slice);
      h.exports = function(w) {
        return b(y(w), 8, -1);
      };
    }, 6955: (h, _, a) => {
      var f = a(2140), y = a(4901), b = a(4576), w = a(8227)("toStringTag"), j = Object, C = b(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      h.exports = f ? b : function(k) {
        var E, P, L;
        return k === void 0 ? "Undefined" : k === null ? "Null" : typeof (P = function(R, T) {
          try {
            return R[T];
          } catch {
          }
        }(E = j(k), w)) == "string" ? P : C ? b(E) : (L = b(E)) === "Object" && y(E.callee) ? "Arguments" : L;
      };
    }, 7740: (h, _, a) => {
      var f = a(9297), y = a(5031), b = a(7347), w = a(4913);
      h.exports = function(j, C, k) {
        for (var E = y(C), P = w.f, L = b.f, R = 0; R < E.length; R++) {
          var T = E[R];
          f(j, T) || k && f(k, T) || P(j, T, L(C, T));
        }
      };
    }, 1436: (h, _, a) => {
      var f = a(8227)("match");
      h.exports = function(y) {
        var b = /./;
        try {
          "/./"[y](b);
        } catch {
          try {
            return b[f] = !1, "/./"[y](b);
          } catch {
          }
        }
        return !1;
      };
    }, 2211: (h, _, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        function y() {
        }
        return y.prototype.constructor = null, Object.getPrototypeOf(new y()) !== y.prototype;
      });
    }, 2529: (h) => {
      h.exports = function(_, a) {
        return { value: _, done: a };
      };
    }, 6699: (h, _, a) => {
      var f = a(3724), y = a(4913), b = a(6980);
      h.exports = f ? function(w, j, C) {
        return y.f(w, j, b(1, C));
      } : function(w, j, C) {
        return w[j] = C, w;
      };
    }, 6980: (h) => {
      h.exports = function(_, a) {
        return { enumerable: !(1 & _), configurable: !(2 & _), writable: !(4 & _), value: a };
      };
    }, 4659: (h, _, a) => {
      var f = a(3724), y = a(4913), b = a(6980);
      h.exports = function(w, j, C) {
        f ? y.f(w, j, b(0, C)) : w[j] = C;
      };
    }, 380: (h, _, a) => {
      var f = a(9504), y = a(9039), b = a(533).start, w = RangeError, j = isFinite, C = Math.abs, k = Date.prototype, E = k.toISOString, P = f(k.getTime), L = f(k.getUTCDate), R = f(k.getUTCFullYear), T = f(k.getUTCHours), I = f(k.getUTCMilliseconds), B = f(k.getUTCMinutes), F = f(k.getUTCMonth), N = f(k.getUTCSeconds);
      h.exports = y(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !y(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(P(this))) throw new w("Invalid time value");
        var H = this, V = R(H), z = I(H), K = V < 0 ? "-" : V > 9999 ? "+" : "";
        return K + b(C(V), K ? 6 : 4, 0) + "-" + b(F(H) + 1, 2, 0) + "-" + b(L(H), 2, 0) + "T" + b(T(H), 2, 0) + ":" + b(B(H), 2, 0) + ":" + b(N(H), 2, 0) + "." + b(z, 3, 0) + "Z";
      } : E;
    }, 3640: (h, _, a) => {
      var f = a(8551), y = a(4270), b = TypeError;
      h.exports = function(w) {
        if (f(this), w === "string" || w === "default") w = "string";
        else if (w !== "number") throw new b("Incorrect hint");
        return y(this, w);
      };
    }, 2106: (h, _, a) => {
      var f = a(283), y = a(4913);
      h.exports = function(b, w, j) {
        return j.get && f(j.get, w, { getter: !0 }), j.set && f(j.set, w, { setter: !0 }), y.f(b, w, j);
      };
    }, 6840: (h, _, a) => {
      var f = a(4901), y = a(4913), b = a(283), w = a(9433);
      h.exports = function(j, C, k, E) {
        E || (E = {});
        var P = E.enumerable, L = E.name !== void 0 ? E.name : C;
        if (f(k) && b(k, L, E), E.global) P ? j[C] = k : w(C, k);
        else {
          try {
            E.unsafe ? j[C] && (P = !0) : delete j[C];
          } catch {
          }
          P ? j[C] = k : y.f(j, C, { value: k, enumerable: !1, configurable: !E.nonConfigurable, writable: !E.nonWritable });
        }
        return j;
      };
    }, 9433: (h, _, a) => {
      var f = a(4475), y = Object.defineProperty;
      h.exports = function(b, w) {
        try {
          y(f, b, { value: w, configurable: !0, writable: !0 });
        } catch {
          f[b] = w;
        }
        return w;
      };
    }, 4606: (h, _, a) => {
      var f = a(6823), y = TypeError;
      h.exports = function(b, w) {
        if (!delete b[w]) throw new y("Cannot delete property " + f(w) + " of " + f(b));
      };
    }, 3724: (h, _, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (h, _, a) => {
      var f = a(4475), y = a(34), b = f.document, w = y(b) && y(b.createElement);
      h.exports = function(j) {
        return w ? b.createElement(j) : {};
      };
    }, 6837: (h) => {
      var _ = TypeError;
      h.exports = function(a) {
        if (a > 9007199254740991) throw _("Maximum allowed index exceeded");
        return a;
      };
    }, 7400: (h) => {
      h.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (h, _, a) => {
      var f = a(4055)("span").classList, y = f && f.constructor && f.constructor.prototype;
      h.exports = y === Object.prototype ? void 0 : y;
    }, 8834: (h, _, a) => {
      var f = a(9392).match(/firefox\/(\d+)/i);
      h.exports = !!f && +f[1];
    }, 7290: (h, _, a) => {
      var f = a(516), y = a(9088);
      h.exports = !f && !y && typeof window == "object" && typeof document == "object";
    }, 6763: (h) => {
      h.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (h) => {
      h.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (h, _, a) => {
      var f = a(9392);
      h.exports = /MSIE|Trident/.test(f);
    }, 28: (h, _, a) => {
      var f = a(9392);
      h.exports = /ipad|iphone|ipod/i.test(f) && typeof Pebble < "u";
    }, 8119: (h, _, a) => {
      var f = a(9392);
      h.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(f);
    }, 9088: (h, _, a) => {
      var f = a(4475), y = a(4576);
      h.exports = y(f.process) === "process";
    }, 6765: (h, _, a) => {
      var f = a(9392);
      h.exports = /web0s(?!.*chrome)/i.test(f);
    }, 9392: (h) => {
      h.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (h, _, a) => {
      var f, y, b = a(4475), w = a(9392), j = b.process, C = b.Deno, k = j && j.versions || C && C.version, E = k && k.v8;
      E && (y = (f = E.split("."))[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1])), !y && w && (!(f = w.match(/Edge\/(\d+)/)) || f[1] >= 74) && (f = w.match(/Chrome\/(\d+)/)) && (y = +f[1]), h.exports = y;
    }, 9160: (h, _, a) => {
      var f = a(9392).match(/AppleWebKit\/(\d+)\./);
      h.exports = !!f && +f[1];
    }, 8727: (h) => {
      h.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (h, _, a) => {
      var f = a(4475), y = a(7347).f, b = a(6699), w = a(6840), j = a(9433), C = a(7740), k = a(2796);
      h.exports = function(E, P) {
        var L, R, T, I, B, F = E.target, N = E.global, H = E.stat;
        if (L = N ? f : H ? f[F] || j(F, {}) : f[F] && f[F].prototype) for (R in P) {
          if (I = P[R], T = E.dontCallGetSet ? (B = y(L, R)) && B.value : L[R], !k(N ? R : F + (H ? "." : "#") + R, E.forced) && T !== void 0) {
            if (typeof I == typeof T) continue;
            C(I, T);
          }
          (E.sham || T && T.sham) && b(I, "sham", !0), w(L, R, I, E);
        }
      };
    }, 9039: (h) => {
      h.exports = function(_) {
        try {
          return !!_();
        } catch {
          return !0;
        }
      };
    }, 9228: (h, _, a) => {
      a(7495);
      var f = a(9565), y = a(6840), b = a(7323), w = a(9039), j = a(8227), C = a(6699), k = j("species"), E = RegExp.prototype;
      h.exports = function(P, L, R, T) {
        var I = j(P), B = !w(function() {
          var V = {};
          return V[I] = function() {
            return 7;
          }, ""[P](V) !== 7;
        }), F = B && !w(function() {
          var V = !1, z = /a/;
          return P === "split" && ((z = {}).constructor = {}, z.constructor[k] = function() {
            return z;
          }, z.flags = "", z[I] = /./[I]), z.exec = function() {
            return V = !0, null;
          }, z[I](""), !V;
        });
        if (!B || !F || R) {
          var N = /./[I], H = L(I, ""[P], function(V, z, K, Z, re) {
            var ce = z.exec;
            return ce === b || ce === E.exec ? B && !re ? { done: !0, value: f(N, z, K, Z) } : { done: !0, value: f(V, K, z, Z) } : { done: !1 };
          });
          y(String.prototype, P, H[0]), y(E, I, H[1]);
        }
        T && C(E[I], "sham", !0);
      };
    }, 8745: (h, _, a) => {
      var f = a(616), y = Function.prototype, b = y.apply, w = y.call;
      h.exports = typeof Reflect == "object" && Reflect.apply || (f ? w.bind(b) : function() {
        return w.apply(b, arguments);
      });
    }, 6080: (h, _, a) => {
      var f = a(7476), y = a(9306), b = a(616), w = f(f.bind);
      h.exports = function(j, C) {
        return y(j), C === void 0 ? j : b ? w(j, C) : function() {
          return j.apply(C, arguments);
        };
      };
    }, 616: (h, _, a) => {
      var f = a(9039);
      h.exports = !f(function() {
        var y = (function() {
        }).bind();
        return typeof y != "function" || y.hasOwnProperty("prototype");
      });
    }, 566: (h, _, a) => {
      var f = a(9504), y = a(9306), b = a(34), w = a(9297), j = a(7680), C = a(616), k = Function, E = f([].concat), P = f([].join), L = {};
      h.exports = C ? k.bind : function(R) {
        var T = y(this), I = T.prototype, B = j(arguments, 1), F = function() {
          var N = E(B, j(arguments));
          return this instanceof F ? function(H, V, z) {
            if (!w(L, V)) {
              for (var K = [], Z = 0; Z < V; Z++) K[Z] = "a[" + Z + "]";
              L[V] = k("C,a", "return new C(" + P(K, ",") + ")");
            }
            return L[V](H, z);
          }(T, N.length, N) : T.apply(R, N);
        };
        return b(I) && (F.prototype = I), F;
      };
    }, 9565: (h, _, a) => {
      var f = a(616), y = Function.prototype.call;
      h.exports = f ? y.bind(y) : function() {
        return y.apply(y, arguments);
      };
    }, 350: (h, _, a) => {
      var f = a(3724), y = a(9297), b = Function.prototype, w = f && Object.getOwnPropertyDescriptor, j = y(b, "name"), C = j && (function() {
      }).name === "something", k = j && (!f || f && w(b, "name").configurable);
      h.exports = { EXISTS: j, PROPER: C, CONFIGURABLE: k };
    }, 6706: (h, _, a) => {
      var f = a(9504), y = a(9306);
      h.exports = function(b, w, j) {
        try {
          return f(y(Object.getOwnPropertyDescriptor(b, w)[j]));
        } catch {
        }
      };
    }, 7476: (h, _, a) => {
      var f = a(4576), y = a(9504);
      h.exports = function(b) {
        if (f(b) === "Function") return y(b);
      };
    }, 9504: (h, _, a) => {
      var f = a(616), y = Function.prototype, b = y.call, w = f && y.bind.bind(b, b);
      h.exports = f ? w : function(j) {
        return function() {
          return b.apply(j, arguments);
        };
      };
    }, 7751: (h, _, a) => {
      var f = a(4475), y = a(4901);
      h.exports = function(b, w) {
        return arguments.length < 2 ? (j = f[b], y(j) ? j : void 0) : f[b] && f[b][w];
        var j;
      };
    }, 851: (h, _, a) => {
      var f = a(6955), y = a(5966), b = a(4117), w = a(6269), j = a(8227)("iterator");
      h.exports = function(C) {
        if (!b(C)) return y(C, j) || y(C, "@@iterator") || w[f(C)];
      };
    }, 81: (h, _, a) => {
      var f = a(9565), y = a(9306), b = a(8551), w = a(6823), j = a(851), C = TypeError;
      h.exports = function(k, E) {
        var P = arguments.length < 2 ? j(k) : E;
        if (y(P)) return b(f(P, k));
        throw new C(w(k) + " is not iterable");
      };
    }, 6933: (h, _, a) => {
      var f = a(9504), y = a(4376), b = a(4901), w = a(4576), j = a(655), C = f([].push);
      h.exports = function(k) {
        if (b(k)) return k;
        if (y(k)) {
          for (var E = k.length, P = [], L = 0; L < E; L++) {
            var R = k[L];
            typeof R == "string" ? C(P, R) : typeof R != "number" && w(R) !== "Number" && w(R) !== "String" || C(P, j(R));
          }
          var T = P.length, I = !0;
          return function(B, F) {
            if (I) return I = !1, F;
            if (y(this)) return F;
            for (var N = 0; N < T; N++) if (P[N] === B) return F;
          };
        }
      };
    }, 5966: (h, _, a) => {
      var f = a(9306), y = a(4117);
      h.exports = function(b, w) {
        var j = b[w];
        return y(j) ? void 0 : f(j);
      };
    }, 2478: (h, _, a) => {
      var f = a(9504), y = a(8981), b = Math.floor, w = f("".charAt), j = f("".replace), C = f("".slice), k = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      h.exports = function(P, L, R, T, I, B) {
        var F = R + P.length, N = T.length, H = E;
        return I !== void 0 && (I = y(I), H = k), j(B, H, function(V, z) {
          var K;
          switch (w(z, 0)) {
            case "$":
              return "$";
            case "&":
              return P;
            case "`":
              return C(L, 0, R);
            case "'":
              return C(L, F);
            case "<":
              K = I[C(z, 1, -1)];
              break;
            default:
              var Z = +z;
              if (Z === 0) return V;
              if (Z > N) {
                var re = b(Z / 10);
                return re === 0 ? V : re <= N ? T[re - 1] === void 0 ? w(z, 1) : T[re - 1] + w(z, 1) : V;
              }
              K = T[Z - 1];
          }
          return K === void 0 ? "" : K;
        });
      };
    }, 4475: function(h, _, a) {
      var f = function(y) {
        return y && y.Math === Math && y;
      };
      h.exports = f(typeof globalThis == "object" && globalThis) || f(typeof window == "object" && window) || f(typeof self == "object" && self) || f(typeof a.g == "object" && a.g) || f(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (h, _, a) => {
      var f = a(9504), y = a(8981), b = f({}.hasOwnProperty);
      h.exports = Object.hasOwn || function(w, j) {
        return b(y(w), j);
      };
    }, 421: (h) => {
      h.exports = {};
    }, 3138: (h) => {
      h.exports = function(_, a) {
        try {
          arguments.length === 1 ? console.error(_) : console.error(_, a);
        } catch {
        }
      };
    }, 397: (h, _, a) => {
      var f = a(7751);
      h.exports = f("document", "documentElement");
    }, 5917: (h, _, a) => {
      var f = a(3724), y = a(9039), b = a(4055);
      h.exports = !f && !y(function() {
        return Object.defineProperty(b("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (h, _, a) => {
      var f = a(9504), y = a(9039), b = a(4576), w = Object, j = f("".split);
      h.exports = y(function() {
        return !w("z").propertyIsEnumerable(0);
      }) ? function(C) {
        return b(C) === "String" ? j(C, "") : w(C);
      } : w;
    }, 3167: (h, _, a) => {
      var f = a(4901), y = a(34), b = a(2967);
      h.exports = function(w, j, C) {
        var k, E;
        return b && f(k = j.constructor) && k !== C && y(E = k.prototype) && E !== C.prototype && b(w, E), w;
      };
    }, 3706: (h, _, a) => {
      var f = a(9504), y = a(4901), b = a(7629), w = f(Function.toString);
      y(b.inspectSource) || (b.inspectSource = function(j) {
        return w(j);
      }), h.exports = b.inspectSource;
    }, 1181: (h, _, a) => {
      var f, y, b, w = a(8622), j = a(4475), C = a(34), k = a(6699), E = a(9297), P = a(7629), L = a(6119), R = a(421), T = "Object already initialized", I = j.TypeError, B = j.WeakMap;
      if (w || P.state) {
        var F = P.state || (P.state = new B());
        F.get = F.get, F.has = F.has, F.set = F.set, f = function(H, V) {
          if (F.has(H)) throw new I(T);
          return V.facade = H, F.set(H, V), V;
        }, y = function(H) {
          return F.get(H) || {};
        }, b = function(H) {
          return F.has(H);
        };
      } else {
        var N = L("state");
        R[N] = !0, f = function(H, V) {
          if (E(H, N)) throw new I(T);
          return V.facade = H, k(H, N, V), V;
        }, y = function(H) {
          return E(H, N) ? H[N] : {};
        }, b = function(H) {
          return E(H, N);
        };
      }
      h.exports = { set: f, get: y, has: b, enforce: function(H) {
        return b(H) ? y(H) : f(H, {});
      }, getterFor: function(H) {
        return function(V) {
          var z;
          if (!C(V) || (z = y(V)).type !== H) throw new I("Incompatible receiver, " + H + " required");
          return z;
        };
      } };
    }, 4209: (h, _, a) => {
      var f = a(8227), y = a(6269), b = f("iterator"), w = Array.prototype;
      h.exports = function(j) {
        return j !== void 0 && (y.Array === j || w[b] === j);
      };
    }, 4376: (h, _, a) => {
      var f = a(4576);
      h.exports = Array.isArray || function(y) {
        return f(y) === "Array";
      };
    }, 4901: (h) => {
      var _ = typeof document == "object" && document.all;
      h.exports = _ === void 0 && _ !== void 0 ? function(a) {
        return typeof a == "function" || a === _;
      } : function(a) {
        return typeof a == "function";
      };
    }, 3517: (h, _, a) => {
      var f = a(9504), y = a(9039), b = a(4901), w = a(6955), j = a(7751), C = a(3706), k = function() {
      }, E = j("Reflect", "construct"), P = /^\s*(?:class|function)\b/, L = f(P.exec), R = !P.test(k), T = function(B) {
        if (!b(B)) return !1;
        try {
          return E(k, [], B), !0;
        } catch {
          return !1;
        }
      }, I = function(B) {
        if (!b(B)) return !1;
        switch (w(B)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return R || !!L(P, C(B));
        } catch {
          return !0;
        }
      };
      I.sham = !0, h.exports = !E || y(function() {
        var B;
        return T(T.call) || !T(Object) || !T(function() {
          B = !0;
        }) || B;
      }) ? I : T;
    }, 6575: (h, _, a) => {
      var f = a(9297);
      h.exports = function(y) {
        return y !== void 0 && (f(y, "value") || f(y, "writable"));
      };
    }, 2796: (h, _, a) => {
      var f = a(9039), y = a(4901), b = /#|\.prototype\./, w = function(P, L) {
        var R = C[j(P)];
        return R === E || R !== k && (y(L) ? f(L) : !!L);
      }, j = w.normalize = function(P) {
        return String(P).replace(b, ".").toLowerCase();
      }, C = w.data = {}, k = w.NATIVE = "N", E = w.POLYFILL = "P";
      h.exports = w;
    }, 4117: (h) => {
      h.exports = function(_) {
        return _ == null;
      };
    }, 34: (h, _, a) => {
      var f = a(4901);
      h.exports = function(y) {
        return typeof y == "object" ? y !== null : f(y);
      };
    }, 3925: (h, _, a) => {
      var f = a(34);
      h.exports = function(y) {
        return f(y) || y === null;
      };
    }, 6395: (h) => {
      h.exports = !1;
    }, 788: (h, _, a) => {
      var f = a(34), y = a(4576), b = a(8227)("match");
      h.exports = function(w) {
        var j;
        return f(w) && ((j = w[b]) !== void 0 ? !!j : y(w) === "RegExp");
      };
    }, 757: (h, _, a) => {
      var f = a(7751), y = a(4901), b = a(1625), w = a(7040), j = Object;
      h.exports = w ? function(C) {
        return typeof C == "symbol";
      } : function(C) {
        var k = f("Symbol");
        return y(k) && b(k.prototype, j(C));
      };
    }, 2652: (h, _, a) => {
      var f = a(6080), y = a(9565), b = a(8551), w = a(6823), j = a(4209), C = a(6198), k = a(1625), E = a(81), P = a(851), L = a(9539), R = TypeError, T = function(B, F) {
        this.stopped = B, this.result = F;
      }, I = T.prototype;
      h.exports = function(B, F, N) {
        var H, V, z, K, Z, re, ce, oe = N && N.that, ne = !(!N || !N.AS_ENTRIES), me = !(!N || !N.IS_RECORD), fe = !(!N || !N.IS_ITERATOR), ke = !(!N || !N.INTERRUPTED), Ee = f(F, oe), Se = function(Re) {
          return H && L(H, "normal", Re), new T(!0, Re);
        }, ye = function(Re) {
          return ne ? (b(Re), ke ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : ke ? Ee(Re, Se) : Ee(Re);
        };
        if (me) H = B.iterator;
        else if (fe) H = B;
        else {
          if (!(V = P(B))) throw new R(w(B) + " is not iterable");
          if (j(V)) {
            for (z = 0, K = C(B); K > z; z++) if ((Z = ye(B[z])) && k(I, Z)) return Z;
            return new T(!1);
          }
          H = E(B, V);
        }
        for (re = me ? B.next : H.next; !(ce = y(re, H)).done; ) {
          try {
            Z = ye(ce.value);
          } catch (Re) {
            L(H, "throw", Re);
          }
          if (typeof Z == "object" && Z && k(I, Z)) return Z;
        }
        return new T(!1);
      };
    }, 9539: (h, _, a) => {
      var f = a(9565), y = a(8551), b = a(5966);
      h.exports = function(w, j, C) {
        var k, E;
        y(w);
        try {
          if (!(k = b(w, "return"))) {
            if (j === "throw") throw C;
            return C;
          }
          k = f(k, w);
        } catch (P) {
          E = !0, k = P;
        }
        if (j === "throw") throw C;
        if (E) throw k;
        return y(k), C;
      };
    }, 3994: (h, _, a) => {
      var f = a(7657).IteratorPrototype, y = a(2360), b = a(6980), w = a(687), j = a(6269), C = function() {
        return this;
      };
      h.exports = function(k, E, P, L) {
        var R = E + " Iterator";
        return k.prototype = y(f, { next: b(+!L, P) }), w(k, R, !1, !0), j[R] = C, k;
      };
    }, 1088: (h, _, a) => {
      var f = a(6518), y = a(9565), b = a(6395), w = a(350), j = a(4901), C = a(3994), k = a(2787), E = a(2967), P = a(687), L = a(6699), R = a(6840), T = a(8227), I = a(6269), B = a(7657), F = w.PROPER, N = w.CONFIGURABLE, H = B.IteratorPrototype, V = B.BUGGY_SAFARI_ITERATORS, z = T("iterator"), K = "keys", Z = "values", re = "entries", ce = function() {
        return this;
      };
      h.exports = function(oe, ne, me, fe, ke, Ee, Se) {
        C(me, ne, fe);
        var ye, Re, Pe, Fe = function(M) {
          if (M === ke && $e) return $e;
          if (!V && M && M in Ve) return Ve[M];
          switch (M) {
            case K:
            case Z:
            case re:
              return function() {
                return new me(this, M);
              };
          }
          return function() {
            return new me(this);
          };
        }, Ye = ne + " Iterator", tt = !1, Ve = oe.prototype, Te = Ve[z] || Ve["@@iterator"] || ke && Ve[ke], $e = !V && Te || Fe(ke), A = ne === "Array" && Ve.entries || Te;
        if (A && (ye = k(A.call(new oe()))) !== Object.prototype && ye.next && (b || k(ye) === H || (E ? E(ye, H) : j(ye[z]) || R(ye, z, ce)), P(ye, Ye, !0, !0), b && (I[Ye] = ce)), F && ke === Z && Te && Te.name !== Z && (!b && N ? L(Ve, "name", Z) : (tt = !0, $e = function() {
          return y(Te, this);
        })), ke) if (Re = { values: Fe(Z), keys: Ee ? $e : Fe(K), entries: Fe(re) }, Se) for (Pe in Re) (V || tt || !(Pe in Ve)) && R(Ve, Pe, Re[Pe]);
        else f({ target: ne, proto: !0, forced: V || tt }, Re);
        return b && !Se || Ve[z] === $e || R(Ve, z, $e, { name: ke }), I[ne] = $e, Re;
      };
    }, 7657: (h, _, a) => {
      var f, y, b, w = a(9039), j = a(4901), C = a(34), k = a(2360), E = a(2787), P = a(6840), L = a(8227), R = a(6395), T = L("iterator"), I = !1;
      [].keys && ("next" in (b = [].keys()) ? (y = E(E(b))) !== Object.prototype && (f = y) : I = !0), !C(f) || w(function() {
        var B = {};
        return f[T].call(B) !== B;
      }) ? f = {} : R && (f = k(f)), j(f[T]) || P(f, T, function() {
        return this;
      }), h.exports = { IteratorPrototype: f, BUGGY_SAFARI_ITERATORS: I };
    }, 6269: (h) => {
      h.exports = {};
    }, 6198: (h, _, a) => {
      var f = a(8014);
      h.exports = function(y) {
        return f(y.length);
      };
    }, 283: (h, _, a) => {
      var f = a(9504), y = a(9039), b = a(4901), w = a(9297), j = a(3724), C = a(350).CONFIGURABLE, k = a(3706), E = a(1181), P = E.enforce, L = E.get, R = String, T = Object.defineProperty, I = f("".slice), B = f("".replace), F = f([].join), N = j && !y(function() {
        return T(function() {
        }, "length", { value: 8 }).length !== 8;
      }), H = String(String).split("String"), V = h.exports = function(z, K, Z) {
        I(R(K), 0, 7) === "Symbol(" && (K = "[" + B(R(K), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), Z && Z.getter && (K = "get " + K), Z && Z.setter && (K = "set " + K), (!w(z, "name") || C && z.name !== K) && (j ? T(z, "name", { value: K, configurable: !0 }) : z.name = K), N && Z && w(Z, "arity") && z.length !== Z.arity && T(z, "length", { value: Z.arity });
        try {
          Z && w(Z, "constructor") && Z.constructor ? j && T(z, "prototype", { writable: !1 }) : z.prototype && (z.prototype = void 0);
        } catch {
        }
        var re = P(z);
        return w(re, "source") || (re.source = F(H, typeof K == "string" ? K : "")), z;
      };
      Function.prototype.toString = V(function() {
        return b(this) && L(this).source || k(this);
      }, "toString");
    }, 741: (h) => {
      var _ = Math.ceil, a = Math.floor;
      h.exports = Math.trunc || function(f) {
        var y = +f;
        return (y > 0 ? a : _)(y);
      };
    }, 1955: (h, _, a) => {
      var f, y, b, w, j, C = a(4475), k = a(3389), E = a(6080), P = a(9225).set, L = a(8265), R = a(8119), T = a(28), I = a(6765), B = a(9088), F = C.MutationObserver || C.WebKitMutationObserver, N = C.document, H = C.process, V = C.Promise, z = k("queueMicrotask");
      if (!z) {
        var K = new L(), Z = function() {
          var re, ce;
          for (B && (re = H.domain) && re.exit(); ce = K.get(); ) try {
            ce();
          } catch (oe) {
            throw K.head && f(), oe;
          }
          re && re.enter();
        };
        R || B || I || !F || !N ? !T && V && V.resolve ? ((w = V.resolve(void 0)).constructor = V, j = E(w.then, w), f = function() {
          j(Z);
        }) : B ? f = function() {
          H.nextTick(Z);
        } : (P = E(P, C), f = function() {
          P(Z);
        }) : (y = !0, b = N.createTextNode(""), new F(Z).observe(b, { characterData: !0 }), f = function() {
          b.data = y = !y;
        }), z = function(re) {
          K.head || f(), K.add(re);
        };
      }
      h.exports = z;
    }, 6043: (h, _, a) => {
      var f = a(9306), y = TypeError, b = function(w) {
        var j, C;
        this.promise = new w(function(k, E) {
          if (j !== void 0 || C !== void 0) throw new y("Bad Promise constructor");
          j = k, C = E;
        }), this.resolve = f(j), this.reject = f(C);
      };
      h.exports.f = function(w) {
        return new b(w);
      };
    }, 5749: (h, _, a) => {
      var f = a(788), y = TypeError;
      h.exports = function(b) {
        if (f(b)) throw new y("The method doesn't accept regular expressions");
        return b;
      };
    }, 3904: (h, _, a) => {
      var f = a(4475), y = a(9039), b = a(9504), w = a(655), j = a(3802).trim, C = a(7452), k = b("".charAt), E = f.parseFloat, P = f.Symbol, L = P && P.iterator, R = 1 / E(C + "-0") != -1 / 0 || L && !y(function() {
        E(Object(L));
      });
      h.exports = R ? function(T) {
        var I = j(w(T)), B = E(I);
        return B === 0 && k(I, 0) === "-" ? -0 : B;
      } : E;
    }, 2703: (h, _, a) => {
      var f = a(4475), y = a(9039), b = a(9504), w = a(655), j = a(3802).trim, C = a(7452), k = f.parseInt, E = f.Symbol, P = E && E.iterator, L = /^[+-]?0x/i, R = b(L.exec), T = k(C + "08") !== 8 || k(C + "0x16") !== 22 || P && !y(function() {
        k(Object(P));
      });
      h.exports = T ? function(I, B) {
        var F = j(w(I));
        return k(F, B >>> 0 || (R(L, F) ? 16 : 10));
      } : k;
    }, 4213: (h, _, a) => {
      var f = a(3724), y = a(9504), b = a(9565), w = a(9039), j = a(1072), C = a(3717), k = a(8773), E = a(8981), P = a(7055), L = Object.assign, R = Object.defineProperty, T = y([].concat);
      h.exports = !L || w(function() {
        if (f && L({ b: 1 }, L(R({}, "a", { enumerable: !0, get: function() {
          R(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var I = {}, B = {}, F = Symbol("assign detection"), N = "abcdefghijklmnopqrst";
        return I[F] = 7, N.split("").forEach(function(H) {
          B[H] = H;
        }), L({}, I)[F] !== 7 || j(L({}, B)).join("") !== N;
      }) ? function(I, B) {
        for (var F = E(I), N = arguments.length, H = 1, V = C.f, z = k.f; N > H; ) for (var K, Z = P(arguments[H++]), re = V ? T(j(Z), V(Z)) : j(Z), ce = re.length, oe = 0; ce > oe; ) K = re[oe++], f && !b(z, Z, K) || (F[K] = Z[K]);
        return F;
      } : L;
    }, 2360: (h, _, a) => {
      var f, y = a(8551), b = a(6801), w = a(8727), j = a(421), C = a(397), k = a(4055), E = a(6119), P = "prototype", L = "script", R = E("IE_PROTO"), T = function() {
      }, I = function(N) {
        return "<" + L + ">" + N + "</" + L + ">";
      }, B = function(N) {
        N.write(I("")), N.close();
        var H = N.parentWindow.Object;
        return N = null, H;
      }, F = function() {
        try {
          f = new ActiveXObject("htmlfile");
        } catch {
        }
        var N, H, V;
        F = typeof document < "u" ? document.domain && f ? B(f) : (H = k("iframe"), V = "java" + L + ":", H.style.display = "none", C.appendChild(H), H.src = String(V), (N = H.contentWindow.document).open(), N.write(I("document.F=Object")), N.close(), N.F) : B(f);
        for (var z = w.length; z--; ) delete F[P][w[z]];
        return F();
      };
      j[R] = !0, h.exports = Object.create || function(N, H) {
        var V;
        return N !== null ? (T[P] = y(N), V = new T(), T[P] = null, V[R] = N) : V = F(), H === void 0 ? V : b.f(V, H);
      };
    }, 6801: (h, _, a) => {
      var f = a(3724), y = a(8686), b = a(4913), w = a(8551), j = a(5397), C = a(1072);
      _.f = f && !y ? Object.defineProperties : function(k, E) {
        w(k);
        for (var P, L = j(E), R = C(E), T = R.length, I = 0; T > I; ) b.f(k, P = R[I++], L[P]);
        return k;
      };
    }, 4913: (h, _, a) => {
      var f = a(3724), y = a(5917), b = a(8686), w = a(8551), j = a(6969), C = TypeError, k = Object.defineProperty, E = Object.getOwnPropertyDescriptor, P = "enumerable", L = "configurable", R = "writable";
      _.f = f ? b ? function(T, I, B) {
        if (w(T), I = j(I), w(B), typeof T == "function" && I === "prototype" && "value" in B && R in B && !B[R]) {
          var F = E(T, I);
          F && F[R] && (T[I] = B.value, B = { configurable: L in B ? B[L] : F[L], enumerable: P in B ? B[P] : F[P], writable: !1 });
        }
        return k(T, I, B);
      } : k : function(T, I, B) {
        if (w(T), I = j(I), w(B), y) try {
          return k(T, I, B);
        } catch {
        }
        if ("get" in B || "set" in B) throw new C("Accessors not supported");
        return "value" in B && (T[I] = B.value), T;
      };
    }, 7347: (h, _, a) => {
      var f = a(3724), y = a(9565), b = a(8773), w = a(6980), j = a(5397), C = a(6969), k = a(9297), E = a(5917), P = Object.getOwnPropertyDescriptor;
      _.f = f ? P : function(L, R) {
        if (L = j(L), R = C(R), E) try {
          return P(L, R);
        } catch {
        }
        if (k(L, R)) return w(!y(b.f, L, R), L[R]);
      };
    }, 298: (h, _, a) => {
      var f = a(4576), y = a(5397), b = a(8480).f, w = a(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      h.exports.f = function(C) {
        return j && f(C) === "Window" ? function(k) {
          try {
            return b(k);
          } catch {
            return w(j);
          }
        }(C) : b(y(C));
      };
    }, 8480: (h, _, a) => {
      var f = a(1828), y = a(8727).concat("length", "prototype");
      _.f = Object.getOwnPropertyNames || function(b) {
        return f(b, y);
      };
    }, 3717: (h, _) => {
      _.f = Object.getOwnPropertySymbols;
    }, 2787: (h, _, a) => {
      var f = a(9297), y = a(4901), b = a(8981), w = a(6119), j = a(2211), C = w("IE_PROTO"), k = Object, E = k.prototype;
      h.exports = j ? k.getPrototypeOf : function(P) {
        var L = b(P);
        if (f(L, C)) return L[C];
        var R = L.constructor;
        return y(R) && L instanceof R ? R.prototype : L instanceof k ? E : null;
      };
    }, 1625: (h, _, a) => {
      var f = a(9504);
      h.exports = f({}.isPrototypeOf);
    }, 1828: (h, _, a) => {
      var f = a(9504), y = a(9297), b = a(5397), w = a(9617).indexOf, j = a(421), C = f([].push);
      h.exports = function(k, E) {
        var P, L = b(k), R = 0, T = [];
        for (P in L) !y(j, P) && y(L, P) && C(T, P);
        for (; E.length > R; ) y(L, P = E[R++]) && (~w(T, P) || C(T, P));
        return T;
      };
    }, 1072: (h, _, a) => {
      var f = a(1828), y = a(8727);
      h.exports = Object.keys || function(b) {
        return f(b, y);
      };
    }, 8773: (h, _) => {
      var a = {}.propertyIsEnumerable, f = Object.getOwnPropertyDescriptor, y = f && !a.call({ 1: 2 }, 1);
      _.f = y ? function(b) {
        var w = f(this, b);
        return !!w && w.enumerable;
      } : a;
    }, 2967: (h, _, a) => {
      var f = a(6706), y = a(34), b = a(7750), w = a(3506);
      h.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, C = !1, k = {};
        try {
          (j = f(Object.prototype, "__proto__", "set"))(k, []), C = k instanceof Array;
        } catch {
        }
        return function(E, P) {
          return b(E), w(P), y(E) && (C ? j(E, P) : E.__proto__ = P), E;
        };
      }() : void 0);
    }, 2357: (h, _, a) => {
      var f = a(3724), y = a(9039), b = a(9504), w = a(2787), j = a(1072), C = a(5397), k = b(a(8773).f), E = b([].push), P = f && y(function() {
        var R = /* @__PURE__ */ Object.create(null);
        return R[2] = 2, !k(R, 2);
      }), L = function(R) {
        return function(T) {
          for (var I, B = C(T), F = j(B), N = P && w(B) === null, H = F.length, V = 0, z = []; H > V; ) I = F[V++], f && !(N ? I in B : k(B, I)) || E(z, R ? [I, B[I]] : B[I]);
          return z;
        };
      };
      h.exports = { entries: L(!0), values: L(!1) };
    }, 3179: (h, _, a) => {
      var f = a(2140), y = a(6955);
      h.exports = f ? {}.toString : function() {
        return "[object " + y(this) + "]";
      };
    }, 4270: (h, _, a) => {
      var f = a(9565), y = a(4901), b = a(34), w = TypeError;
      h.exports = function(j, C) {
        var k, E;
        if (C === "string" && y(k = j.toString) && !b(E = f(k, j)) || y(k = j.valueOf) && !b(E = f(k, j)) || C !== "string" && y(k = j.toString) && !b(E = f(k, j))) return E;
        throw new w("Can't convert object to primitive value");
      };
    }, 5031: (h, _, a) => {
      var f = a(7751), y = a(9504), b = a(8480), w = a(3717), j = a(8551), C = y([].concat);
      h.exports = f("Reflect", "ownKeys") || function(k) {
        var E = b.f(j(k)), P = w.f;
        return P ? C(E, P(k)) : E;
      };
    }, 9167: (h, _, a) => {
      var f = a(4475);
      h.exports = f;
    }, 1103: (h) => {
      h.exports = function(_) {
        try {
          return { error: !1, value: _() };
        } catch (a) {
          return { error: !0, value: a };
        }
      };
    }, 916: (h, _, a) => {
      var f = a(4475), y = a(550), b = a(4901), w = a(2796), j = a(3706), C = a(8227), k = a(7290), E = a(516), P = a(6395), L = a(7388), R = y && y.prototype, T = C("species"), I = !1, B = b(f.PromiseRejectionEvent), F = w("Promise", function() {
        var N = j(y), H = N !== String(y);
        if (!H && L === 66 || P && (!R.catch || !R.finally)) return !0;
        if (!L || L < 51 || !/native code/.test(N)) {
          var V = new y(function(K) {
            K(1);
          }), z = function(K) {
            K(function() {
            }, function() {
            });
          };
          if ((V.constructor = {})[T] = z, !(I = V.then(function() {
          }) instanceof z)) return !0;
        }
        return !H && (k || E) && !B;
      });
      h.exports = { CONSTRUCTOR: F, REJECTION_EVENT: B, SUBCLASSING: I };
    }, 550: (h, _, a) => {
      var f = a(4475);
      h.exports = f.Promise;
    }, 3438: (h, _, a) => {
      var f = a(8551), y = a(34), b = a(6043);
      h.exports = function(w, j) {
        if (f(w), y(j) && j.constructor === w) return j;
        var C = b.f(w);
        return (0, C.resolve)(j), C.promise;
      };
    }, 537: (h, _, a) => {
      var f = a(550), y = a(4428), b = a(916).CONSTRUCTOR;
      h.exports = b || !y(function(w) {
        f.all(w).then(void 0, function() {
        });
      });
    }, 1056: (h, _, a) => {
      var f = a(4913).f;
      h.exports = function(y, b, w) {
        w in y || f(y, w, { configurable: !0, get: function() {
          return b[w];
        }, set: function(j) {
          b[w] = j;
        } });
      };
    }, 8265: (h) => {
      var _ = function() {
        this.head = null, this.tail = null;
      };
      _.prototype = { add: function(a) {
        var f = { item: a, next: null }, y = this.tail;
        y ? y.next = f : this.head = f, this.tail = f;
      }, get: function() {
        var a = this.head;
        if (a) return (this.head = a.next) === null && (this.tail = null), a.item;
      } }, h.exports = _;
    }, 6682: (h, _, a) => {
      var f = a(9565), y = a(8551), b = a(4901), w = a(4576), j = a(7323), C = TypeError;
      h.exports = function(k, E) {
        var P = k.exec;
        if (b(P)) {
          var L = f(P, k, E);
          return L !== null && y(L), L;
        }
        if (w(k) === "RegExp") return f(j, k, E);
        throw new C("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (h, _, a) => {
      var f, y, b = a(9565), w = a(9504), j = a(655), C = a(7979), k = a(8429), E = a(5745), P = a(2360), L = a(1181).get, R = a(3635), T = a(8814), I = E("native-string-replace", String.prototype.replace), B = RegExp.prototype.exec, F = B, N = w("".charAt), H = w("".indexOf), V = w("".replace), z = w("".slice), K = (y = /b*/g, b(B, f = /a/, "a"), b(B, y, "a"), f.lastIndex !== 0 || y.lastIndex !== 0), Z = k.BROKEN_CARET, re = /()??/.exec("")[1] !== void 0;
      (K || re || Z || R || T) && (F = function(ce) {
        var oe, ne, me, fe, ke, Ee, Se, ye = this, Re = L(ye), Pe = j(ce), Fe = Re.raw;
        if (Fe) return Fe.lastIndex = ye.lastIndex, oe = b(F, Fe, Pe), ye.lastIndex = Fe.lastIndex, oe;
        var Ye = Re.groups, tt = Z && ye.sticky, Ve = b(C, ye), Te = ye.source, $e = 0, A = Pe;
        if (tt && (Ve = V(Ve, "y", ""), H(Ve, "g") === -1 && (Ve += "g"), A = z(Pe, ye.lastIndex), ye.lastIndex > 0 && (!ye.multiline || ye.multiline && N(Pe, ye.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", A = " " + A, $e++), ne = new RegExp("^(?:" + Te + ")", Ve)), re && (ne = new RegExp("^" + Te + "$(?!\\s)", Ve)), K && (me = ye.lastIndex), fe = b(B, tt ? ne : ye, A), tt ? fe ? (fe.input = z(fe.input, $e), fe[0] = z(fe[0], $e), fe.index = ye.lastIndex, ye.lastIndex += fe[0].length) : ye.lastIndex = 0 : K && fe && (ye.lastIndex = ye.global ? fe.index + fe[0].length : me), re && fe && fe.length > 1 && b(I, fe[0], ne, function() {
          for (ke = 1; ke < arguments.length - 2; ke++) arguments[ke] === void 0 && (fe[ke] = void 0);
        }), fe && Ye) for (fe.groups = Ee = P(null), ke = 0; ke < Ye.length; ke++) Ee[(Se = Ye[ke])[0]] = fe[Se[1]];
        return fe;
      }), h.exports = F;
    }, 7979: (h, _, a) => {
      var f = a(8551);
      h.exports = function() {
        var y = f(this), b = "";
        return y.hasIndices && (b += "d"), y.global && (b += "g"), y.ignoreCase && (b += "i"), y.multiline && (b += "m"), y.dotAll && (b += "s"), y.unicode && (b += "u"), y.unicodeSets && (b += "v"), y.sticky && (b += "y"), b;
      };
    }, 1034: (h, _, a) => {
      var f = a(9565), y = a(9297), b = a(1625), w = a(7979), j = RegExp.prototype;
      h.exports = function(C) {
        var k = C.flags;
        return k !== void 0 || "flags" in j || y(C, "flags") || !b(j, C) ? k : f(w, C);
      };
    }, 8429: (h, _, a) => {
      var f = a(9039), y = a(4475).RegExp, b = f(function() {
        var C = y("a", "y");
        return C.lastIndex = 2, C.exec("abcd") !== null;
      }), w = b || f(function() {
        return !y("a", "y").sticky;
      }), j = b || f(function() {
        var C = y("^r", "gy");
        return C.lastIndex = 2, C.exec("str") !== null;
      });
      h.exports = { BROKEN_CARET: j, MISSED_STICKY: w, UNSUPPORTED_Y: b };
    }, 3635: (h, _, a) => {
      var f = a(9039), y = a(4475).RegExp;
      h.exports = f(function() {
        var b = y(".", "s");
        return !(b.dotAll && b.test(`
`) && b.flags === "s");
      });
    }, 8814: (h, _, a) => {
      var f = a(9039), y = a(4475).RegExp;
      h.exports = f(function() {
        var b = y("(?<a>b)", "g");
        return b.exec("b").groups.a !== "b" || "b".replace(b, "$<a>c") !== "bc";
      });
    }, 7750: (h, _, a) => {
      var f = a(4117), y = TypeError;
      h.exports = function(b) {
        if (f(b)) throw new y("Can't call method on " + b);
        return b;
      };
    }, 3389: (h, _, a) => {
      var f = a(4475), y = a(3724), b = Object.getOwnPropertyDescriptor;
      h.exports = function(w) {
        if (!y) return f[w];
        var j = b(f, w);
        return j && j.value;
      };
    }, 9472: (h, _, a) => {
      var f, y = a(4475), b = a(8745), w = a(4901), j = a(6763), C = a(9392), k = a(7680), E = a(2812), P = y.Function, L = /MSIE .\./.test(C) || j && ((f = y.Bun.version.split(".")).length < 3 || f[0] === "0" && (f[1] < 3 || f[1] === "3" && f[2] === "0"));
      h.exports = function(R, T) {
        var I = T ? 2 : 1;
        return L ? function(B, F) {
          var N = E(arguments.length, 1) > I, H = w(B) ? B : P(B), V = N ? k(arguments, I) : [], z = N ? function() {
            b(H, this, V);
          } : H;
          return T ? R(z, F) : R(z);
        } : R;
      };
    }, 7633: (h, _, a) => {
      var f = a(7751), y = a(2106), b = a(8227), w = a(3724), j = b("species");
      h.exports = function(C) {
        var k = f(C);
        w && k && !k[j] && y(k, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (h, _, a) => {
      var f = a(4913).f, y = a(9297), b = a(8227)("toStringTag");
      h.exports = function(w, j, C) {
        w && !C && (w = w.prototype), w && !y(w, b) && f(w, b, { configurable: !0, value: j });
      };
    }, 6119: (h, _, a) => {
      var f = a(5745), y = a(3392), b = f("keys");
      h.exports = function(w) {
        return b[w] || (b[w] = y(w));
      };
    }, 7629: (h, _, a) => {
      var f = a(6395), y = a(4475), b = a(9433), w = "__core-js_shared__", j = h.exports = y[w] || b(w, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: f ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (h, _, a) => {
      var f = a(7629);
      h.exports = function(y, b) {
        return f[y] || (f[y] = b || {});
      };
    }, 2293: (h, _, a) => {
      var f = a(8551), y = a(5548), b = a(4117), w = a(8227)("species");
      h.exports = function(j, C) {
        var k, E = f(j).constructor;
        return E === void 0 || b(k = f(E)[w]) ? C : y(k);
      };
    }, 8183: (h, _, a) => {
      var f = a(9504), y = a(1291), b = a(655), w = a(7750), j = f("".charAt), C = f("".charCodeAt), k = f("".slice), E = function(P) {
        return function(L, R) {
          var T, I, B = b(w(L)), F = y(R), N = B.length;
          return F < 0 || F >= N ? P ? "" : void 0 : (T = C(B, F)) < 55296 || T > 56319 || F + 1 === N || (I = C(B, F + 1)) < 56320 || I > 57343 ? P ? j(B, F) : T : P ? k(B, F, F + 2) : I - 56320 + (T - 55296 << 10) + 65536;
        };
      };
      h.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (h, _, a) => {
      var f = a(9504), y = a(8014), b = a(655), w = a(2333), j = a(7750), C = f(w), k = f("".slice), E = Math.ceil, P = function(L) {
        return function(R, T, I) {
          var B, F, N = b(j(R)), H = y(T), V = N.length, z = I === void 0 ? " " : b(I);
          return H <= V || z === "" ? N : ((F = C(z, E((B = H - V) / z.length))).length > B && (F = k(F, 0, B)), L ? N + F : F + N);
        };
      };
      h.exports = { start: P(!1), end: P(!0) };
    }, 2333: (h, _, a) => {
      var f = a(1291), y = a(655), b = a(7750), w = RangeError;
      h.exports = function(j) {
        var C = y(b(this)), k = "", E = f(j);
        if (E < 0 || E === 1 / 0) throw new w("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (C += C)) 1 & E && (k += C);
        return k;
      };
    }, 706: (h, _, a) => {
      var f = a(350).PROPER, y = a(9039), b = a(7452);
      h.exports = function(w) {
        return y(function() {
          return !!b[w]() || "​᠎"[w]() !== "​᠎" || f && b[w].name !== w;
        });
      };
    }, 3802: (h, _, a) => {
      var f = a(9504), y = a(7750), b = a(655), w = a(7452), j = f("".replace), C = RegExp("^[" + w + "]+"), k = RegExp("(^|[^" + w + "])[" + w + "]+$"), E = function(P) {
        return function(L) {
          var R = b(y(L));
          return 1 & P && (R = j(R, C, "")), 2 & P && (R = j(R, k, "$1")), R;
        };
      };
      h.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (h, _, a) => {
      var f = a(7388), y = a(9039), b = a(4475).String;
      h.exports = !!Object.getOwnPropertySymbols && !y(function() {
        var w = Symbol("symbol detection");
        return !b(w) || !(Object(w) instanceof Symbol) || !Symbol.sham && f && f < 41;
      });
    }, 8242: (h, _, a) => {
      var f = a(9565), y = a(7751), b = a(8227), w = a(6840);
      h.exports = function() {
        var j = y("Symbol"), C = j && j.prototype, k = C && C.valueOf, E = b("toPrimitive");
        C && !C[E] && w(C, E, function(P) {
          return f(k, this);
        }, { arity: 1 });
      };
    }, 1296: (h, _, a) => {
      var f = a(4495);
      h.exports = f && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (h, _, a) => {
      var f, y, b, w, j = a(4475), C = a(8745), k = a(6080), E = a(4901), P = a(9297), L = a(9039), R = a(397), T = a(7680), I = a(4055), B = a(2812), F = a(8119), N = a(9088), H = j.setImmediate, V = j.clearImmediate, z = j.process, K = j.Dispatch, Z = j.Function, re = j.MessageChannel, ce = j.String, oe = 0, ne = {}, me = "onreadystatechange";
      L(function() {
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
      H && V || (H = function(ye) {
        B(arguments.length, 1);
        var Re = E(ye) ? ye : Z(ye), Pe = T(arguments, 1);
        return ne[++oe] = function() {
          C(Re, void 0, Pe);
        }, y(oe), oe;
      }, V = function(ye) {
        delete ne[ye];
      }, N ? y = function(ye) {
        z.nextTick(ke(ye));
      } : K && K.now ? y = function(ye) {
        K.now(ke(ye));
      } : re && !F ? (w = (b = new re()).port2, b.port1.onmessage = Ee, y = k(w.postMessage, w)) : j.addEventListener && E(j.postMessage) && !j.importScripts && f && f.protocol !== "file:" && !L(Se) ? (y = Se, j.addEventListener("message", Ee, !1)) : y = me in I("script") ? function(ye) {
        R.appendChild(I("script"))[me] = function() {
          R.removeChild(this), fe(ye);
        };
      } : function(ye) {
        setTimeout(ke(ye), 0);
      }), h.exports = { set: H, clear: V };
    }, 1240: (h, _, a) => {
      var f = a(9504);
      h.exports = f(1 .valueOf);
    }, 5610: (h, _, a) => {
      var f = a(1291), y = Math.max, b = Math.min;
      h.exports = function(w, j) {
        var C = f(w);
        return C < 0 ? y(C + j, 0) : b(C, j);
      };
    }, 5397: (h, _, a) => {
      var f = a(7055), y = a(7750);
      h.exports = function(b) {
        return f(y(b));
      };
    }, 1291: (h, _, a) => {
      var f = a(741);
      h.exports = function(y) {
        var b = +y;
        return b != b || b === 0 ? 0 : f(b);
      };
    }, 8014: (h, _, a) => {
      var f = a(1291), y = Math.min;
      h.exports = function(b) {
        var w = f(b);
        return w > 0 ? y(w, 9007199254740991) : 0;
      };
    }, 8981: (h, _, a) => {
      var f = a(7750), y = Object;
      h.exports = function(b) {
        return y(f(b));
      };
    }, 2777: (h, _, a) => {
      var f = a(9565), y = a(34), b = a(757), w = a(5966), j = a(4270), C = a(8227), k = TypeError, E = C("toPrimitive");
      h.exports = function(P, L) {
        if (!y(P) || b(P)) return P;
        var R, T = w(P, E);
        if (T) {
          if (L === void 0 && (L = "default"), R = f(T, P, L), !y(R) || b(R)) return R;
          throw new k("Can't convert object to primitive value");
        }
        return L === void 0 && (L = "number"), j(P, L);
      };
    }, 6969: (h, _, a) => {
      var f = a(2777), y = a(757);
      h.exports = function(b) {
        var w = f(b, "string");
        return y(w) ? w : w + "";
      };
    }, 2140: (h, _, a) => {
      var f = {};
      f[a(8227)("toStringTag")] = "z", h.exports = String(f) === "[object z]";
    }, 655: (h, _, a) => {
      var f = a(6955), y = String;
      h.exports = function(b) {
        if (f(b) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return y(b);
      };
    }, 6823: (h) => {
      var _ = String;
      h.exports = function(a) {
        try {
          return _(a);
        } catch {
          return "Object";
        }
      };
    }, 3392: (h, _, a) => {
      var f = a(9504), y = 0, b = Math.random(), w = f(1 .toString);
      h.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + w(++y + b, 36);
      };
    }, 7040: (h, _, a) => {
      var f = a(4495);
      h.exports = f && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (h, _, a) => {
      var f = a(3724), y = a(9039);
      h.exports = f && y(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (h) => {
      var _ = TypeError;
      h.exports = function(a, f) {
        if (a < f) throw new _("Not enough arguments");
        return a;
      };
    }, 8622: (h, _, a) => {
      var f = a(4475), y = a(4901), b = f.WeakMap;
      h.exports = y(b) && /native code/.test(String(b));
    }, 511: (h, _, a) => {
      var f = a(9167), y = a(9297), b = a(1951), w = a(4913).f;
      h.exports = function(j) {
        var C = f.Symbol || (f.Symbol = {});
        y(C, j) || w(C, j, { value: b.f(j) });
      };
    }, 1951: (h, _, a) => {
      var f = a(8227);
      _.f = f;
    }, 8227: (h, _, a) => {
      var f = a(4475), y = a(5745), b = a(9297), w = a(3392), j = a(4495), C = a(7040), k = f.Symbol, E = y("wks"), P = C ? k.for || k : k && k.withoutSetter || w;
      h.exports = function(L) {
        return b(E, L) || (E[L] = j && b(k, L) ? k[L] : P("Symbol." + L)), E[L];
      };
    }, 7452: (h) => {
      h.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (h, _, a) => {
      var f = a(6518), y = a(9039), b = a(4376), w = a(34), j = a(8981), C = a(6198), k = a(6837), E = a(4659), P = a(1469), L = a(597), R = a(8227), T = a(7388), I = R("isConcatSpreadable"), B = T >= 51 || !y(function() {
        var N = [];
        return N[I] = !1, N.concat()[0] !== N;
      }), F = function(N) {
        if (!w(N)) return !1;
        var H = N[I];
        return H !== void 0 ? !!H : b(N);
      };
      f({ target: "Array", proto: !0, arity: 1, forced: !B || !L("concat") }, { concat: function(N) {
        var H, V, z, K, Z, re = j(this), ce = P(re, 0), oe = 0;
        for (H = -1, z = arguments.length; H < z; H++) if (F(Z = H === -1 ? re : arguments[H])) for (K = C(Z), k(oe + K), V = 0; V < K; V++, oe++) V in Z && E(ce, oe, Z[V]);
        else k(oe + 1), E(ce, oe++, Z);
        return ce.length = oe, ce;
      } });
    }, 8431: (h, _, a) => {
      var f = a(6518), y = a(9213).every;
      f({ target: "Array", proto: !0, forced: !a(4598)("every") }, { every: function(b) {
        return y(this, b, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (h, _, a) => {
      var f = a(6518), y = a(9213).filter;
      f({ target: "Array", proto: !0, forced: !a(597)("filter") }, { filter: function(b) {
        return y(this, b, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (h, _, a) => {
      var f = a(6518), y = a(9213).find, b = a(6469), w = "find", j = !0;
      w in [] && Array(1)[w](function() {
        j = !1;
      }), f({ target: "Array", proto: !0, forced: j }, { find: function(C) {
        return y(this, C, arguments.length > 1 ? arguments[1] : void 0);
      } }), b(w);
    }, 1629: (h, _, a) => {
      var f = a(6518), y = a(235);
      f({ target: "Array", proto: !0, forced: [].forEach !== y }, { forEach: y });
    }, 3418: (h, _, a) => {
      var f = a(6518), y = a(7916);
      f({ target: "Array", stat: !0, forced: !a(4428)(function(b) {
        Array.from(b);
      }) }, { from: y });
    }, 4423: (h, _, a) => {
      var f = a(6518), y = a(9617).includes, b = a(9039), w = a(6469);
      f({ target: "Array", proto: !0, forced: b(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return y(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), w("includes");
    }, 5276: (h, _, a) => {
      var f = a(6518), y = a(7476), b = a(9617).indexOf, w = a(4598), j = y([].indexOf), C = !!j && 1 / j([1], 1, -0) < 0;
      f({ target: "Array", proto: !0, forced: C || !w("indexOf") }, { indexOf: function(k) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return C ? j(this, k, E) || 0 : b(this, k, E);
      } });
    }, 4346: (h, _, a) => {
      a(6518)({ target: "Array", stat: !0 }, { isArray: a(4376) });
    }, 3792: (h, _, a) => {
      var f = a(5397), y = a(6469), b = a(6269), w = a(1181), j = a(4913).f, C = a(1088), k = a(2529), E = a(6395), P = a(3724), L = "Array Iterator", R = w.set, T = w.getterFor(L);
      h.exports = C(Array, "Array", function(B, F) {
        R(this, { type: L, target: f(B), index: 0, kind: F });
      }, function() {
        var B = T(this), F = B.target, N = B.index++;
        if (!F || N >= F.length) return B.target = void 0, k(void 0, !0);
        switch (B.kind) {
          case "keys":
            return k(N, !1);
          case "values":
            return k(F[N], !1);
        }
        return k([N, F[N]], !1);
      }, "values");
      var I = b.Arguments = b.Array;
      if (y("keys"), y("values"), y("entries"), !E && P && I.name !== "values") try {
        j(I, "name", { value: "values" });
      } catch {
      }
    }, 8598: (h, _, a) => {
      var f = a(6518), y = a(9504), b = a(7055), w = a(5397), j = a(4598), C = y([].join);
      f({ target: "Array", proto: !0, forced: b !== Object || !j("join", ",") }, { join: function(k) {
        return C(w(this), k === void 0 ? "," : k);
      } });
    }, 2062: (h, _, a) => {
      var f = a(6518), y = a(9213).map;
      f({ target: "Array", proto: !0, forced: !a(597)("map") }, { map: function(b) {
        return y(this, b, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (h, _, a) => {
      var f = a(6518), y = a(926).left, b = a(4598), w = a(7388);
      f({ target: "Array", proto: !0, forced: !a(9088) && w > 79 && w < 83 || !b("reduce") }, { reduce: function(j) {
        var C = arguments.length;
        return y(this, j, C, C > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (h, _, a) => {
      var f = a(6518), y = a(9504), b = a(4376), w = y([].reverse), j = [1, 2];
      f({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return b(this) && (this.length = this.length), w(this);
      } });
    }, 4782: (h, _, a) => {
      var f = a(6518), y = a(4376), b = a(3517), w = a(34), j = a(5610), C = a(6198), k = a(5397), E = a(4659), P = a(8227), L = a(597), R = a(7680), T = L("slice"), I = P("species"), B = Array, F = Math.max;
      f({ target: "Array", proto: !0, forced: !T }, { slice: function(N, H) {
        var V, z, K, Z = k(this), re = C(Z), ce = j(N, re), oe = j(H === void 0 ? re : H, re);
        if (y(Z) && (V = Z.constructor, (b(V) && (V === B || y(V.prototype)) || w(V) && (V = V[I]) === null) && (V = void 0), V === B || V === void 0)) return R(Z, ce, oe);
        for (z = new (V === void 0 ? B : V)(F(oe - ce, 0)), K = 0; ce < oe; ce++, K++) ce in Z && E(z, K, Z[ce]);
        return z.length = K, z;
      } });
    }, 5086: (h, _, a) => {
      var f = a(6518), y = a(9213).some;
      f({ target: "Array", proto: !0, forced: !a(4598)("some") }, { some: function(b) {
        return y(this, b, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (h, _, a) => {
      var f = a(6518), y = a(9504), b = a(9306), w = a(8981), j = a(6198), C = a(4606), k = a(655), E = a(9039), P = a(4488), L = a(4598), R = a(8834), T = a(3202), I = a(7388), B = a(9160), F = [], N = y(F.sort), H = y(F.push), V = E(function() {
        F.sort(void 0);
      }), z = E(function() {
        F.sort(null);
      }), K = L("sort"), Z = !E(function() {
        if (I) return I < 70;
        if (!(R && R > 3)) {
          if (T) return !0;
          if (B) return B < 603;
          var re, ce, oe, ne, me = "";
          for (re = 65; re < 76; re++) {
            switch (ce = String.fromCharCode(re), re) {
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
            for (ne = 0; ne < 47; ne++) F.push({ k: ce + ne, v: oe });
          }
          for (F.sort(function(fe, ke) {
            return ke.v - fe.v;
          }), ne = 0; ne < F.length; ne++) ce = F[ne].k.charAt(0), me.charAt(me.length - 1) !== ce && (me += ce);
          return me !== "DGBEFHACIJK";
        }
      });
      f({ target: "Array", proto: !0, forced: V || !z || !K || !Z }, { sort: function(re) {
        re !== void 0 && b(re);
        var ce = w(this);
        if (Z) return re === void 0 ? N(ce) : N(ce, re);
        var oe, ne, me = [], fe = j(ce);
        for (ne = 0; ne < fe; ne++) ne in ce && H(me, ce[ne]);
        for (P(me, /* @__PURE__ */ function(ke) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : ke !== void 0 ? +ke(Ee, Se) || 0 : k(Ee) > k(Se) ? 1 : -1;
          };
        }(re)), oe = j(me), ne = 0; ne < oe; ) ce[ne] = me[ne++];
        for (; ne < fe; ) C(ce, ne++);
        return ce;
      } });
    }, 4554: (h, _, a) => {
      var f = a(6518), y = a(8981), b = a(5610), w = a(1291), j = a(6198), C = a(4527), k = a(6837), E = a(1469), P = a(4659), L = a(4606), R = a(597)("splice"), T = Math.max, I = Math.min;
      f({ target: "Array", proto: !0, forced: !R }, { splice: function(B, F) {
        var N, H, V, z, K, Z, re = y(this), ce = j(re), oe = b(B, ce), ne = arguments.length;
        for (ne === 0 ? N = H = 0 : ne === 1 ? (N = 0, H = ce - oe) : (N = ne - 2, H = I(T(w(F), 0), ce - oe)), k(ce + N - H), V = E(re, H), z = 0; z < H; z++) (K = oe + z) in re && P(V, z, re[K]);
        if (V.length = H, N < H) {
          for (z = oe; z < ce - H; z++) Z = z + N, (K = z + H) in re ? re[Z] = re[K] : L(re, Z);
          for (z = ce; z > ce - H + N; z--) L(re, z - 1);
        } else if (N > H) for (z = ce - H; z > oe; z--) Z = z + N - 1, (K = z + H - 1) in re ? re[Z] = re[K] : L(re, Z);
        for (z = 0; z < N; z++) re[z + oe] = arguments[z + 2];
        return C(re, ce - H + N), V;
      } });
    }, 1688: (h, _, a) => {
      var f = a(6518), y = a(380);
      f({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== y }, { toISOString: y });
    }, 739: (h, _, a) => {
      var f = a(6518), y = a(9039), b = a(8981), w = a(2777);
      f({ target: "Date", proto: !0, arity: 1, forced: y(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var C = b(this), k = w(C, "number");
        return typeof k != "number" || isFinite(k) ? C.toISOString() : null;
      } });
    }, 9572: (h, _, a) => {
      var f = a(9297), y = a(6840), b = a(3640), w = a(8227)("toPrimitive"), j = Date.prototype;
      f(j, w) || y(j, w, b);
    }, 3288: (h, _, a) => {
      var f = a(9504), y = a(6840), b = Date.prototype, w = "Invalid Date", j = "toString", C = f(b[j]), k = f(b.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== w && y(b, j, function() {
        var E = k(this);
        return E == E ? C(this) : w;
      });
    }, 4170: (h, _, a) => {
      var f = a(6518), y = a(566);
      f({ target: "Function", proto: !0, forced: Function.bind !== y }, { bind: y });
    }, 2010: (h, _, a) => {
      var f = a(3724), y = a(350).EXISTS, b = a(9504), w = a(2106), j = Function.prototype, C = b(j.toString), k = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = b(k.exec);
      f && !y && w(j, "name", { configurable: !0, get: function() {
        try {
          return E(k, C(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (h, _, a) => {
      var f = a(6518), y = a(7751), b = a(8745), w = a(9565), j = a(9504), C = a(9039), k = a(4901), E = a(757), P = a(7680), L = a(6933), R = a(4495), T = String, I = y("JSON", "stringify"), B = j(/./.exec), F = j("".charAt), N = j("".charCodeAt), H = j("".replace), V = j(1 .toString), z = /[\uD800-\uDFFF]/g, K = /^[\uD800-\uDBFF]$/, Z = /^[\uDC00-\uDFFF]$/, re = !R || C(function() {
        var me = y("Symbol")("stringify detection");
        return I([me]) !== "[null]" || I({ a: me }) !== "{}" || I(Object(me)) !== "{}";
      }), ce = C(function() {
        return I("\uDF06\uD834") !== '"\\udf06\\ud834"' || I("\uDEAD") !== '"\\udead"';
      }), oe = function(me, fe) {
        var ke = P(arguments), Ee = L(fe);
        if (k(Ee) || me !== void 0 && !E(me)) return ke[1] = function(Se, ye) {
          if (k(Ee) && (ye = w(Ee, this, T(Se), ye)), !E(ye)) return ye;
        }, b(I, null, ke);
      }, ne = function(me, fe, ke) {
        var Ee = F(ke, fe - 1), Se = F(ke, fe + 1);
        return B(K, me) && !B(Z, Se) || B(Z, me) && !B(K, Ee) ? "\\u" + V(N(me, 0), 16) : me;
      };
      I && f({ target: "JSON", stat: !0, arity: 3, forced: re || ce }, { stringify: function(me, fe, ke) {
        var Ee = P(arguments), Se = b(re ? oe : I, null, Ee);
        return ce && typeof Se == "string" ? H(Se, z, ne) : Se;
      } });
    }, 4731: (h, _, a) => {
      var f = a(4475);
      a(687)(f.JSON, "JSON", !0);
    }, 479: (h, _, a) => {
      a(687)(Math, "Math", !0);
    }, 2892: (h, _, a) => {
      var f = a(6518), y = a(6395), b = a(3724), w = a(4475), j = a(9167), C = a(9504), k = a(2796), E = a(9297), P = a(3167), L = a(1625), R = a(757), T = a(2777), I = a(9039), B = a(8480).f, F = a(7347).f, N = a(4913).f, H = a(1240), V = a(3802).trim, z = "Number", K = w[z], Z = j[z], re = K.prototype, ce = w.TypeError, oe = C("".slice), ne = C("".charCodeAt), me = k(z, !K(" 0o1") || !K("0b1") || K("+0x1")), fe = function(Ee) {
        var Se, ye = arguments.length < 1 ? 0 : K(function(Re) {
          var Pe = T(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(Fe) {
            var Ye, tt, Ve, Te, $e, A, M, W, Y = T(Fe, "number");
            if (R(Y)) throw new ce("Cannot convert a Symbol value to a number");
            if (typeof Y == "string" && Y.length > 2) {
              if (Y = V(Y), (Ye = ne(Y, 0)) === 43 || Ye === 45) {
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
                for (A = ($e = oe(Y, 2)).length, M = 0; M < A; M++) if ((W = ne($e, M)) < 48 || W > Te) return NaN;
                return parseInt($e, Ve);
              }
            }
            return +Y;
          }(Pe);
        }(Ee));
        return L(re, Se = this) && I(function() {
          H(Se);
        }) ? P(Object(ye), this, fe) : ye;
      };
      fe.prototype = re, me && !y && (re.constructor = fe), f({ global: !0, constructor: !0, wrap: !0, forced: me }, { Number: fe });
      var ke = function(Ee, Se) {
        for (var ye, Re = b ? B(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, ye = Re[Pe]) && !E(Ee, ye) && N(Ee, ye, F(Se, ye));
      };
      y && Z && ke(j[z], Z), (me || y) && ke(j[z], K);
    }, 9868: (h, _, a) => {
      var f = a(6518), y = a(9504), b = a(1291), w = a(1240), j = a(2333), C = a(9039), k = RangeError, E = String, P = Math.floor, L = y(j), R = y("".slice), T = y(1 .toFixed), I = function(H, V, z) {
        return V === 0 ? z : V % 2 == 1 ? I(H, V - 1, z * H) : I(H * H, V / 2, z);
      }, B = function(H, V, z) {
        for (var K = -1, Z = z; ++K < 6; ) Z += V * H[K], H[K] = Z % 1e7, Z = P(Z / 1e7);
      }, F = function(H, V) {
        for (var z = 6, K = 0; --z >= 0; ) K += H[z], H[z] = P(K / V), K = K % V * 1e7;
      }, N = function(H) {
        for (var V = 6, z = ""; --V >= 0; ) if (z !== "" || V === 0 || H[V] !== 0) {
          var K = E(H[V]);
          z = z === "" ? K : z + L("0", 7 - K.length) + K;
        }
        return z;
      };
      f({ target: "Number", proto: !0, forced: C(function() {
        return T(8e-5, 3) !== "0.000" || T(0.9, 0) !== "1" || T(1.255, 2) !== "1.25" || T(1000000000000000100, 0) !== "1000000000000000128";
      }) || !C(function() {
        T({});
      }) }, { toFixed: function(H) {
        var V, z, K, Z, re = w(this), ce = b(H), oe = [0, 0, 0, 0, 0, 0], ne = "", me = "0";
        if (ce < 0 || ce > 20) throw new k("Incorrect fraction digits");
        if (re != re) return "NaN";
        if (re <= -1e21 || re >= 1e21) return E(re);
        if (re < 0 && (ne = "-", re = -re), re > 1e-21) if (z = (V = function(fe) {
          for (var ke = 0, Ee = fe; Ee >= 4096; ) ke += 12, Ee /= 4096;
          for (; Ee >= 2; ) ke += 1, Ee /= 2;
          return ke;
        }(re * I(2, 69, 1)) - 69) < 0 ? re * I(2, -V, 1) : re / I(2, V, 1), z *= 4503599627370496, (V = 52 - V) > 0) {
          for (B(oe, 0, z), K = ce; K >= 7; ) B(oe, 1e7, 0), K -= 7;
          for (B(oe, I(10, K, 1), 0), K = V - 1; K >= 23; ) F(oe, 8388608), K -= 23;
          F(oe, 1 << K), B(oe, 1, 1), F(oe, 2), me = N(oe);
        } else B(oe, 0, z), B(oe, 1 << -V, 0), me = N(oe) + L("0", ce);
        return ce > 0 ? ne + ((Z = me.length) <= ce ? "0." + L("0", ce - Z) + me : R(me, 0, Z - ce) + "." + R(me, Z - ce)) : ne + me;
      } });
    }, 9085: (h, _, a) => {
      var f = a(6518), y = a(4213);
      f({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== y }, { assign: y });
    }, 9904: (h, _, a) => {
      a(6518)({ target: "Object", stat: !0, sham: !a(3724) }, { create: a(2360) });
    }, 7945: (h, _, a) => {
      var f = a(6518), y = a(3724), b = a(6801).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperties !== b, sham: !y }, { defineProperties: b });
    }, 4185: (h, _, a) => {
      var f = a(6518), y = a(3724), b = a(4913).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperty !== b, sham: !y }, { defineProperty: b });
    }, 5506: (h, _, a) => {
      var f = a(6518), y = a(2357).entries;
      f({ target: "Object", stat: !0 }, { entries: function(b) {
        return y(b);
      } });
    }, 3851: (h, _, a) => {
      var f = a(6518), y = a(9039), b = a(5397), w = a(7347).f, j = a(3724);
      f({ target: "Object", stat: !0, forced: !j || y(function() {
        w(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(C, k) {
        return w(b(C), k);
      } });
    }, 1278: (h, _, a) => {
      var f = a(6518), y = a(3724), b = a(5031), w = a(5397), j = a(7347), C = a(4659);
      f({ target: "Object", stat: !0, sham: !y }, { getOwnPropertyDescriptors: function(k) {
        for (var E, P, L = w(k), R = j.f, T = b(L), I = {}, B = 0; T.length > B; ) (P = R(L, E = T[B++])) !== void 0 && C(I, E, P);
        return I;
      } });
    }, 9773: (h, _, a) => {
      var f = a(6518), y = a(4495), b = a(9039), w = a(3717), j = a(8981);
      f({ target: "Object", stat: !0, forced: !y || b(function() {
        w.f(1);
      }) }, { getOwnPropertySymbols: function(C) {
        var k = w.f;
        return k ? k(j(C)) : [];
      } });
    }, 875: (h, _, a) => {
      var f = a(6518), y = a(9039), b = a(8981), w = a(2787), j = a(2211);
      f({ target: "Object", stat: !0, forced: y(function() {
        w(1);
      }), sham: !j }, { getPrototypeOf: function(C) {
        return w(b(C));
      } });
    }, 9432: (h, _, a) => {
      var f = a(6518), y = a(8981), b = a(1072);
      f({ target: "Object", stat: !0, forced: a(9039)(function() {
        b(1);
      }) }, { keys: function(w) {
        return b(y(w));
      } });
    }, 287: (h, _, a) => {
      a(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: a(2967) });
    }, 6099: (h, _, a) => {
      var f = a(2140), y = a(6840), b = a(3179);
      f || y(Object.prototype, "toString", b, { unsafe: !0 });
    }, 6034: (h, _, a) => {
      var f = a(6518), y = a(2357).values;
      f({ target: "Object", stat: !0 }, { values: function(b) {
        return y(b);
      } });
    }, 8459: (h, _, a) => {
      var f = a(6518), y = a(3904);
      f({ global: !0, forced: parseFloat !== y }, { parseFloat: y });
    }, 8940: (h, _, a) => {
      var f = a(6518), y = a(2703);
      f({ global: !0, forced: parseInt !== y }, { parseInt: y });
    }, 6499: (h, _, a) => {
      var f = a(6518), y = a(9565), b = a(9306), w = a(6043), j = a(1103), C = a(2652);
      f({ target: "Promise", stat: !0, forced: a(537) }, { all: function(k) {
        var E = this, P = w.f(E), L = P.resolve, R = P.reject, T = j(function() {
          var I = b(E.resolve), B = [], F = 0, N = 1;
          C(k, function(H) {
            var V = F++, z = !1;
            N++, y(I, E, H).then(function(K) {
              z || (z = !0, B[V] = K, --N || L(B));
            }, R);
          }), --N || L(B);
        });
        return T.error && R(T.value), P.promise;
      } });
    }, 2003: (h, _, a) => {
      var f = a(6518), y = a(6395), b = a(916).CONSTRUCTOR, w = a(550), j = a(7751), C = a(4901), k = a(6840), E = w && w.prototype;
      if (f({ target: "Promise", proto: !0, forced: b, real: !0 }, { catch: function(L) {
        return this.then(void 0, L);
      } }), !y && C(w)) {
        var P = j("Promise").prototype.catch;
        E.catch !== P && k(E, "catch", P, { unsafe: !0 });
      }
    }, 436: (h, _, a) => {
      var f, y, b, w = a(6518), j = a(6395), C = a(9088), k = a(4475), E = a(9565), P = a(6840), L = a(2967), R = a(687), T = a(7633), I = a(9306), B = a(4901), F = a(34), N = a(679), H = a(2293), V = a(9225).set, z = a(1955), K = a(3138), Z = a(1103), re = a(8265), ce = a(1181), oe = a(550), ne = a(916), me = a(6043), fe = "Promise", ke = ne.CONSTRUCTOR, Ee = ne.REJECTION_EVENT, Se = ne.SUBCLASSING, ye = ce.getterFor(fe), Re = ce.set, Pe = oe && oe.prototype, Fe = oe, Ye = Pe, tt = k.TypeError, Ve = k.document, Te = k.process, $e = me.f, A = $e, M = !!(Ve && Ve.createEvent && k.dispatchEvent), W = "unhandledrejection", Y = function(te) {
        var ae;
        return !(!F(te) || !B(ae = te.then)) && ae;
      }, Q = function(te, ae) {
        var ue, Oe, Ae, ze = ae.value, nt = ae.state === 1, ut = nt ? te.ok : te.fail, ft = te.resolve, yt = te.reject, Je = te.domain;
        try {
          ut ? (nt || (ae.rejection === 2 && ie(ae), ae.rejection = 1), ut === !0 ? ue = ze : (Je && Je.enter(), ue = ut(ze), Je && (Je.exit(), Ae = !0)), ue === te.promise ? yt(new tt("Promise-chain cycle")) : (Oe = Y(ue)) ? E(Oe, ue, ft, yt) : ft(ue)) : yt(ze);
        } catch (Ze) {
          Je && !Ae && Je.exit(), yt(Ze);
        }
      }, X = function(te, ae) {
        te.notified || (te.notified = !0, z(function() {
          for (var ue, Oe = te.reactions; ue = Oe.get(); ) Q(ue, te);
          te.notified = !1, ae && !te.rejection && he(te);
        }));
      }, de = function(te, ae, ue) {
        var Oe, Ae;
        M ? ((Oe = Ve.createEvent("Event")).promise = ae, Oe.reason = ue, Oe.initEvent(te, !1, !0), k.dispatchEvent(Oe)) : Oe = { promise: ae, reason: ue }, !Ee && (Ae = k["on" + te]) ? Ae(Oe) : te === W && K("Unhandled promise rejection", ue);
      }, he = function(te) {
        E(V, k, function() {
          var ae, ue = te.facade, Oe = te.value;
          if (le(te) && (ae = Z(function() {
            C ? Te.emit("unhandledRejection", Oe, ue) : de(W, ue, Oe);
          }), te.rejection = C || le(te) ? 2 : 1, ae.error)) throw ae.value;
        });
      }, le = function(te) {
        return te.rejection !== 1 && !te.parent;
      }, ie = function(te) {
        E(V, k, function() {
          var ae = te.facade;
          C ? Te.emit("rejectionHandled", ae) : de("rejectionhandled", ae, te.value);
        });
      }, je = function(te, ae, ue) {
        return function(Oe) {
          te(ae, Oe, ue);
        };
      }, be = function(te, ae, ue) {
        te.done || (te.done = !0, ue && (te = ue), te.value = ae, te.state = 2, X(te, !0));
      }, Ce = function(te, ae, ue) {
        if (!te.done) {
          te.done = !0, ue && (te = ue);
          try {
            if (te.facade === ae) throw new tt("Promise can't be resolved itself");
            var Oe = Y(ae);
            Oe ? z(function() {
              var Ae = { done: !1 };
              try {
                E(Oe, ae, je(Ce, Ae, te), je(be, Ae, te));
              } catch (ze) {
                be(Ae, ze, te);
              }
            }) : (te.value = ae, te.state = 1, X(te, !1));
          } catch (Ae) {
            be({ done: !1 }, Ae, te);
          }
        }
      };
      if (ke && (Ye = (Fe = function(te) {
        N(this, Ye), I(te), E(f, this);
        var ae = ye(this);
        try {
          te(je(Ce, ae), je(be, ae));
        } catch (ue) {
          be(ae, ue);
        }
      }).prototype, (f = function(te) {
        Re(this, { type: fe, done: !1, notified: !1, parent: !1, reactions: new re(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Ye, "then", function(te, ae) {
        var ue = ye(this), Oe = $e(H(this, Fe));
        return ue.parent = !0, Oe.ok = !B(te) || te, Oe.fail = B(ae) && ae, Oe.domain = C ? Te.domain : void 0, ue.state === 0 ? ue.reactions.add(Oe) : z(function() {
          Q(Oe, ue);
        }), Oe.promise;
      }), y = function() {
        var te = new f(), ae = ye(te);
        this.promise = te, this.resolve = je(Ce, ae), this.reject = je(be, ae);
      }, me.f = $e = function(te) {
        return te === Fe || te === void 0 ? new y(te) : A(te);
      }, !j && B(oe) && Pe !== Object.prototype)) {
        b = Pe.then, Se || P(Pe, "then", function(te, ae) {
          var ue = this;
          return new Fe(function(Oe, Ae) {
            E(b, ue, Oe, Ae);
          }).then(te, ae);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        L && L(Pe, Ye);
      }
      w({ global: !0, constructor: !0, wrap: !0, forced: ke }, { Promise: Fe }), R(Fe, fe, !1, !0), T(fe);
    }, 3362: (h, _, a) => {
      a(436), a(6499), a(2003), a(7743), a(1481), a(280);
    }, 7743: (h, _, a) => {
      var f = a(6518), y = a(9565), b = a(9306), w = a(6043), j = a(1103), C = a(2652);
      f({ target: "Promise", stat: !0, forced: a(537) }, { race: function(k) {
        var E = this, P = w.f(E), L = P.reject, R = j(function() {
          var T = b(E.resolve);
          C(k, function(I) {
            y(T, E, I).then(P.resolve, L);
          });
        });
        return R.error && L(R.value), P.promise;
      } });
    }, 1481: (h, _, a) => {
      var f = a(6518), y = a(6043);
      f({ target: "Promise", stat: !0, forced: a(916).CONSTRUCTOR }, { reject: function(b) {
        var w = y.f(this);
        return (0, w.reject)(b), w.promise;
      } });
    }, 280: (h, _, a) => {
      var f = a(6518), y = a(7751), b = a(6395), w = a(550), j = a(916).CONSTRUCTOR, C = a(3438), k = y("Promise"), E = b && !j;
      f({ target: "Promise", stat: !0, forced: b || j }, { resolve: function(P) {
        return C(E && this === k ? w : this, P);
      } });
    }, 825: (h, _, a) => {
      var f = a(6518), y = a(7751), b = a(8745), w = a(566), j = a(5548), C = a(8551), k = a(34), E = a(2360), P = a(9039), L = y("Reflect", "construct"), R = Object.prototype, T = [].push, I = P(function() {
        function N() {
        }
        return !(L(function() {
        }, [], N) instanceof N);
      }), B = !P(function() {
        L(function() {
        });
      }), F = I || B;
      f({ target: "Reflect", stat: !0, forced: F, sham: F }, { construct: function(N, H) {
        j(N), C(H);
        var V = arguments.length < 3 ? N : j(arguments[2]);
        if (B && !I) return L(N, H, V);
        if (N === V) {
          switch (H.length) {
            case 0:
              return new N();
            case 1:
              return new N(H[0]);
            case 2:
              return new N(H[0], H[1]);
            case 3:
              return new N(H[0], H[1], H[2]);
            case 4:
              return new N(H[0], H[1], H[2], H[3]);
          }
          var z = [null];
          return b(T, z, H), new (b(w, N, z))();
        }
        var K = V.prototype, Z = E(k(K) ? K : R), re = b(N, Z, H);
        return k(re) ? re : Z;
      } });
    }, 888: (h, _, a) => {
      var f = a(6518), y = a(9565), b = a(34), w = a(8551), j = a(6575), C = a(7347), k = a(2787);
      f({ target: "Reflect", stat: !0 }, { get: function E(P, L) {
        var R, T, I = arguments.length < 3 ? P : arguments[2];
        return w(P) === I ? P[L] : (R = C.f(P, L)) ? j(R) ? R.value : R.get === void 0 ? void 0 : y(R.get, I) : b(T = k(P)) ? E(T, L, I) : void 0;
      } });
    }, 4864: (h, _, a) => {
      var f = a(3724), y = a(4475), b = a(9504), w = a(2796), j = a(3167), C = a(6699), k = a(2360), E = a(8480).f, P = a(1625), L = a(788), R = a(655), T = a(1034), I = a(8429), B = a(1056), F = a(6840), N = a(9039), H = a(9297), V = a(1181).enforce, z = a(7633), K = a(8227), Z = a(3635), re = a(8814), ce = K("match"), oe = y.RegExp, ne = oe.prototype, me = y.SyntaxError, fe = b(ne.exec), ke = b("".charAt), Ee = b("".replace), Se = b("".indexOf), ye = b("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, Fe = /a/g, Ye = new oe(Pe) !== Pe, tt = I.MISSED_STICKY, Ve = I.UNSUPPORTED_Y;
      if (w("RegExp", f && (!Ye || tt || Z || re || N(function() {
        return Fe[ce] = !1, oe(Pe) !== Pe || oe(Fe) === Fe || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(M, W) {
          var Y, Q, X, de, he, le, ie = P(ne, this), je = L(M), be = W === void 0, Ce = [], te = M;
          if (!ie && je && be && M.constructor === Te) return M;
          if ((je || P(ne, M)) && (M = M.source, be && (W = T(te))), M = M === void 0 ? "" : R(M), W = W === void 0 ? "" : R(W), te = M, Z && "dotAll" in Pe && (Q = !!W && Se(W, "s") > -1) && (W = Ee(W, /s/g, "")), Y = W, tt && "sticky" in Pe && (X = !!W && Se(W, "y") > -1) && Ve && (W = Ee(W, /y/g, "")), re && (de = function(ae) {
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
                  if (Ze === "" || H(ut, Ze)) throw new me("Invalid capture group name");
                  ut[Ze] = !0, nt[nt.length] = [Ze, Je], yt = !1, Ze = "";
                  continue;
              }
              yt ? Ze += ue : ze += ue;
            }
            return [ze, nt];
          }(M), M = de[0], Ce = de[1]), he = j(oe(M, W), ie ? this : ne, Te), (Q || X || Ce.length) && (le = V(he), Q && (le.dotAll = !0, le.raw = Te(function(ae) {
            for (var ue, Oe = ae.length, Ae = 0, ze = "", nt = !1; Ae <= Oe; Ae++) (ue = ke(ae, Ae)) !== "\\" ? nt || ue !== "." ? (ue === "[" ? nt = !0 : ue === "]" && (nt = !1), ze += ue) : ze += "[\\s\\S]" : ze += ue + ke(ae, ++Ae);
            return ze;
          }(M), Y)), X && (le.sticky = !0), Ce.length && (le.groups = Ce)), M !== te) try {
            C(he, "source", te === "" ? "(?:)" : te);
          } catch {
          }
          return he;
        }, $e = E(oe), A = 0; $e.length > A; ) B(Te, oe, $e[A++]);
        ne.constructor = Te, Te.prototype = ne, F(y, "RegExp", Te, { constructor: !0 });
      }
      z("RegExp");
    }, 7495: (h, _, a) => {
      var f = a(6518), y = a(7323);
      f({ target: "RegExp", proto: !0, forced: /./.exec !== y }, { exec: y });
    }, 8781: (h, _, a) => {
      var f = a(350).PROPER, y = a(6840), b = a(8551), w = a(655), j = a(9039), C = a(1034), k = "toString", E = RegExp.prototype, P = E[k], L = j(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), R = f && P.name !== k;
      (L || R) && y(E, k, function() {
        var T = b(this);
        return "/" + w(T.source) + "/" + w(C(T));
      }, { unsafe: !0 });
    }, 1699: (h, _, a) => {
      var f = a(6518), y = a(9504), b = a(5749), w = a(7750), j = a(655), C = a(1436), k = y("".indexOf);
      f({ target: "String", proto: !0, forced: !C("includes") }, { includes: function(E) {
        return !!~k(j(w(this)), j(b(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (h, _, a) => {
      var f = a(8183).charAt, y = a(655), b = a(1181), w = a(1088), j = a(2529), C = "String Iterator", k = b.set, E = b.getterFor(C);
      w(String, "String", function(P) {
        k(this, { type: C, string: y(P), index: 0 });
      }, function() {
        var P, L = E(this), R = L.string, T = L.index;
        return T >= R.length ? j(void 0, !0) : (P = f(R, T), L.index += P.length, j(P, !1));
      });
    }, 1761: (h, _, a) => {
      var f = a(9565), y = a(9228), b = a(8551), w = a(4117), j = a(8014), C = a(655), k = a(7750), E = a(5966), P = a(7829), L = a(6682);
      y("match", function(R, T, I) {
        return [function(B) {
          var F = k(this), N = w(B) ? void 0 : E(B, R);
          return N ? f(N, B, F) : new RegExp(B)[R](C(F));
        }, function(B) {
          var F = b(this), N = C(B), H = I(T, F, N);
          if (H.done) return H.value;
          if (!F.global) return L(F, N);
          var V = F.unicode;
          F.lastIndex = 0;
          for (var z, K = [], Z = 0; (z = L(F, N)) !== null; ) {
            var re = C(z[0]);
            K[Z] = re, re === "" && (F.lastIndex = P(N, j(F.lastIndex), V)), Z++;
          }
          return Z === 0 ? null : K;
        }];
      });
    }, 5440: (h, _, a) => {
      var f = a(8745), y = a(9565), b = a(9504), w = a(9228), j = a(9039), C = a(8551), k = a(4901), E = a(4117), P = a(1291), L = a(8014), R = a(655), T = a(7750), I = a(7829), B = a(5966), F = a(2478), N = a(6682), H = a(8227)("replace"), V = Math.max, z = Math.min, K = b([].concat), Z = b([].push), re = b("".indexOf), ce = b("".slice), oe = "a".replace(/./, "$0") === "$0", ne = !!/./[H] && /./[H]("a", "$0") === "";
      w("replace", function(me, fe, ke) {
        var Ee = ne ? "$" : "$0";
        return [function(Se, ye) {
          var Re = T(this), Pe = E(Se) ? void 0 : B(Se, H);
          return Pe ? y(Pe, Se, Re, ye) : y(fe, R(Re), Se, ye);
        }, function(Se, ye) {
          var Re = C(this), Pe = R(Se);
          if (typeof ye == "string" && re(ye, Ee) === -1 && re(ye, "$<") === -1) {
            var Fe = ke(fe, Re, Pe, ye);
            if (Fe.done) return Fe.value;
          }
          var Ye = k(ye);
          Ye || (ye = R(ye));
          var tt, Ve = Re.global;
          Ve && (tt = Re.unicode, Re.lastIndex = 0);
          for (var Te, $e = []; (Te = N(Re, Pe)) !== null && (Z($e, Te), Ve); ) R(Te[0]) === "" && (Re.lastIndex = I(Pe, L(Re.lastIndex), tt));
          for (var A, M = "", W = 0, Y = 0; Y < $e.length; Y++) {
            for (var Q, X = R((Te = $e[Y])[0]), de = V(z(P(Te.index), Pe.length), 0), he = [], le = 1; le < Te.length; le++) Z(he, (A = Te[le]) === void 0 ? A : String(A));
            var ie = Te.groups;
            if (Ye) {
              var je = K([X], he, de, Pe);
              ie !== void 0 && Z(je, ie), Q = R(f(ye, void 0, je));
            } else Q = F(X, Pe, de, he, ie, ye);
            de >= W && (M += ce(Pe, W, de) + Q, W = de + X.length);
          }
          return M + ce(Pe, W);
        }];
      }, !!j(function() {
        var me = /./;
        return me.exec = function() {
          var fe = [];
          return fe.groups = { a: "7" }, fe;
        }, "".replace(me, "$<a>") !== "7";
      }) || !oe || ne);
    }, 1392: (h, _, a) => {
      var f, y = a(6518), b = a(7476), w = a(7347).f, j = a(8014), C = a(655), k = a(5749), E = a(7750), P = a(1436), L = a(6395), R = b("".slice), T = Math.min, I = P("startsWith");
      y({ target: "String", proto: !0, forced: !(!L && !I && (f = w(String.prototype, "startsWith"), f && !f.writable) || I) }, { startsWith: function(B) {
        var F = C(E(this));
        k(B);
        var N = j(T(arguments.length > 1 ? arguments[1] : void 0, F.length)), H = C(B);
        return R(F, N, N + H.length) === H;
      } });
    }, 2762: (h, _, a) => {
      var f = a(6518), y = a(3802).trim;
      f({ target: "String", proto: !0, forced: a(706)("trim") }, { trim: function() {
        return y(this);
      } });
    }, 6412: (h, _, a) => {
      a(511)("asyncIterator");
    }, 6761: (h, _, a) => {
      var f = a(6518), y = a(4475), b = a(9565), w = a(9504), j = a(6395), C = a(3724), k = a(4495), E = a(9039), P = a(9297), L = a(1625), R = a(8551), T = a(5397), I = a(6969), B = a(655), F = a(6980), N = a(2360), H = a(1072), V = a(8480), z = a(298), K = a(3717), Z = a(7347), re = a(4913), ce = a(6801), oe = a(8773), ne = a(6840), me = a(2106), fe = a(5745), ke = a(6119), Ee = a(421), Se = a(3392), ye = a(8227), Re = a(1951), Pe = a(511), Fe = a(8242), Ye = a(687), tt = a(1181), Ve = a(9213).forEach, Te = ke("hidden"), $e = "Symbol", A = "prototype", M = tt.set, W = tt.getterFor($e), Y = Object[A], Q = y.Symbol, X = Q && Q[A], de = y.RangeError, he = y.TypeError, le = y.QObject, ie = Z.f, je = re.f, be = z.f, Ce = oe.f, te = w([].push), ae = fe("symbols"), ue = fe("op-symbols"), Oe = fe("wks"), Ae = !le || !le[A] || !le[A].findChild, ze = function(Be, Ge, We) {
        var Qe = ie(Y, Ge);
        Qe && delete Y[Ge], je(Be, Ge, We), Qe && Be !== Y && je(Y, Ge, Qe);
      }, nt = C && E(function() {
        return N(je({}, "a", { get: function() {
          return je(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? ze : je, ut = function(Be, Ge) {
        var We = ae[Be] = N(X);
        return M(We, { type: $e, tag: Be, description: Ge }), C || (We.description = Ge), We;
      }, ft = function(Be, Ge, We) {
        Be === Y && ft(ue, Ge, We), R(Be);
        var Qe = I(Ge);
        return R(We), P(ae, Qe) ? (We.enumerable ? (P(Be, Te) && Be[Te][Qe] && (Be[Te][Qe] = !1), We = N(We, { enumerable: F(0, !1) })) : (P(Be, Te) || je(Be, Te, F(1, N(null))), Be[Te][Qe] = !0), nt(Be, Qe, We)) : je(Be, Qe, We);
      }, yt = function(Be, Ge) {
        R(Be);
        var We = T(Ge), Qe = H(We).concat(un(We));
        return Ve(Qe, function(ht) {
          C && !b(Je, We, ht) || ft(Be, ht, We[ht]);
        }), Be;
      }, Je = function(Be) {
        var Ge = I(Be), We = b(Ce, this, Ge);
        return !(this === Y && P(ae, Ge) && !P(ue, Ge)) && (!(We || !P(this, Ge) || !P(ae, Ge) || P(this, Te) && this[Te][Ge]) || We);
      }, Ze = function(Be, Ge) {
        var We = T(Be), Qe = I(Ge);
        if (We !== Y || !P(ae, Qe) || P(ue, Qe)) {
          var ht = ie(We, Qe);
          return !ht || !P(ae, Qe) || P(We, Te) && We[Te][Qe] || (ht.enumerable = !0), ht;
        }
      }, wr = function(Be) {
        var Ge = be(T(Be)), We = [];
        return Ve(Ge, function(Qe) {
          P(ae, Qe) || P(Ee, Qe) || te(We, Qe);
        }), We;
      }, un = function(Be) {
        var Ge = Be === Y, We = be(Ge ? ue : T(Be)), Qe = [];
        return Ve(We, function(ht) {
          !P(ae, ht) || Ge && !P(Y, ht) || te(Qe, ae[ht]);
        }), Qe;
      };
      k || (ne(X = (Q = function() {
        if (L(X, this)) throw new he("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? B(arguments[0]) : void 0, Ge = Se(Be), We = function(Qe) {
          var ht = this === void 0 ? y : this;
          ht === Y && b(We, ue, Qe), P(ht, Te) && P(ht[Te], Ge) && (ht[Te][Ge] = !1);
          var rr = F(1, Qe);
          try {
            nt(ht, Ge, rr);
          } catch (At) {
            if (!(At instanceof de)) throw At;
            ze(ht, Ge, rr);
          }
        };
        return C && Ae && nt(Y, Ge, { configurable: !0, set: We }), ut(Ge, Be);
      })[A], "toString", function() {
        return W(this).tag;
      }), ne(Q, "withoutSetter", function(Be) {
        return ut(Se(Be), Be);
      }), oe.f = Je, re.f = ft, ce.f = yt, Z.f = Ze, V.f = z.f = wr, K.f = un, Re.f = function(Be) {
        return ut(ye(Be), Be);
      }, C && (me(X, "description", { configurable: !0, get: function() {
        return W(this).description;
      } }), j || ne(Y, "propertyIsEnumerable", Je, { unsafe: !0 }))), f({ global: !0, constructor: !0, wrap: !0, forced: !k, sham: !k }, { Symbol: Q }), Ve(H(Oe), function(Be) {
        Pe(Be);
      }), f({ target: $e, stat: !0, forced: !k }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), f({ target: "Object", stat: !0, forced: !k, sham: !C }, { create: function(Be, Ge) {
        return Ge === void 0 ? N(Be) : yt(N(Be), Ge);
      }, defineProperty: ft, defineProperties: yt, getOwnPropertyDescriptor: Ze }), f({ target: "Object", stat: !0, forced: !k }, { getOwnPropertyNames: wr }), Fe(), Ye(Q, $e), Ee[Te] = !0;
    }, 9463: (h, _, a) => {
      var f = a(6518), y = a(3724), b = a(4475), w = a(9504), j = a(9297), C = a(4901), k = a(1625), E = a(655), P = a(2106), L = a(7740), R = b.Symbol, T = R && R.prototype;
      if (y && C(R) && (!("description" in T) || R().description !== void 0)) {
        var I = {}, B = function() {
          var Z = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), re = k(T, this) ? new R(Z) : Z === void 0 ? R() : R(Z);
          return Z === "" && (I[re] = !0), re;
        };
        L(B, R), B.prototype = T, T.constructor = B;
        var F = String(R("description detection")) === "Symbol(description detection)", N = w(T.valueOf), H = w(T.toString), V = /^Symbol\((.*)\)[^)]+$/, z = w("".replace), K = w("".slice);
        P(T, "description", { configurable: !0, get: function() {
          var Z = N(this);
          if (j(I, Z)) return "";
          var re = H(Z), ce = F ? K(re, 7, -1) : z(re, V, "$1");
          return ce === "" ? void 0 : ce;
        } }), f({ global: !0, constructor: !0, forced: !0 }, { Symbol: B });
      }
    }, 1510: (h, _, a) => {
      var f = a(6518), y = a(7751), b = a(9297), w = a(655), j = a(5745), C = a(1296), k = j("string-to-symbol-registry"), E = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { for: function(P) {
        var L = w(P);
        if (b(k, L)) return k[L];
        var R = y("Symbol")(L);
        return k[L] = R, E[R] = L, R;
      } });
    }, 2259: (h, _, a) => {
      a(511)("iterator");
    }, 2675: (h, _, a) => {
      a(6761), a(1510), a(7812), a(3110), a(9773);
    }, 7812: (h, _, a) => {
      var f = a(6518), y = a(9297), b = a(757), w = a(6823), j = a(5745), C = a(1296), k = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { keyFor: function(E) {
        if (!b(E)) throw new TypeError(w(E) + " is not a symbol");
        if (y(k, E)) return k[E];
      } });
    }, 5700: (h, _, a) => {
      var f = a(511), y = a(8242);
      f("toPrimitive"), y();
    }, 8125: (h, _, a) => {
      var f = a(7751), y = a(511), b = a(687);
      y("toStringTag"), b(f("Symbol"), "Symbol");
    }, 3500: (h, _, a) => {
      var f = a(4475), y = a(7400), b = a(9296), w = a(235), j = a(6699), C = function(E) {
        if (E && E.forEach !== w) try {
          j(E, "forEach", w);
        } catch {
          E.forEach = w;
        }
      };
      for (var k in y) y[k] && C(f[k] && f[k].prototype);
      C(b);
    }, 2953: (h, _, a) => {
      var f = a(4475), y = a(7400), b = a(9296), w = a(3792), j = a(6699), C = a(687), k = a(8227)("iterator"), E = w.values, P = function(R, T) {
        if (R) {
          if (R[k] !== E) try {
            j(R, k, E);
          } catch {
            R[k] = E;
          }
          if (C(R, T, !0), y[T]) {
            for (var I in w) if (R[I] !== w[I]) try {
              j(R, I, w[I]);
            } catch {
              R[I] = w[I];
            }
          }
        }
      };
      for (var L in y) P(f[L] && f[L].prototype, L);
      P(b, "DOMTokenList");
    }, 5575: (h, _, a) => {
      var f = a(6518), y = a(4475), b = a(9472)(y.setInterval, !0);
      f({ global: !0, bind: !0, forced: y.setInterval !== b }, { setInterval: b });
    }, 4599: (h, _, a) => {
      var f = a(6518), y = a(4475), b = a(9472)(y.setTimeout, !0);
      f({ global: !0, bind: !0, forced: y.setTimeout !== b }, { setTimeout: b });
    }, 6031: (h, _, a) => {
      a(5575), a(4599);
    } }, g = {};
    function m(h) {
      var _ = g[h];
      if (_ !== void 0) return _.exports;
      var a = g[h] = { exports: {} };
      return p[h].call(a.exports, a, a.exports, m), a.exports;
    }
    m.d = (h, _) => {
      for (var a in _) m.o(_, a) && !m.o(h, a) && Object.defineProperty(h, a, { enumerable: !0, get: _[a] });
    }, m.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), m.o = (h, _) => Object.prototype.hasOwnProperty.call(h, _), m.r = (h) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(h, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(h, "__esModule", { value: !0 });
    };
    var O = {};
    return (() => {
      m.r(O), m.d(O, { JSONEditor: () => Er }), m(2675), m(9463), m(6412), m(2259), m(5700), m(8125), m(8706), m(113), m(1629), m(3418), m(4346), m(3792), m(2712), m(4490), m(4782), m(739), m(9572), m(3288), m(2010), m(4731), m(479), m(2892), m(9085), m(9904), m(4185), m(875), m(9432), m(287), m(6099), m(6034), m(3362), m(7495), m(8781), m(7764), m(3500), m(2953), m(5506), m(4864), m(5440), m(4423);
      var h = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], _ = [function(o) {
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
      function b(o) {
        return y(o) ? w({}, o) : Array.isArray(o) ? o.map(b) : o;
      }
      function w(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && y(e[t]) ? (k(o, t) || (o[t] = {}), w(o[t], e[t])) : Array.isArray(e[t]) ? o[t] = b(e[t]) : o[t] = e[t];
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
      m(4170), m(3851), m(825), m(888), m(8598), m(1699), m(1761), m(5276), m(5086), m(1392), m(2062), m(8459), m(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function L() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function R(o) {
        return o && f(o) === "object" && !Array.isArray(o);
      }
      var T = ["__proto__", "constructor", "prototype"];
      function I(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        if (!n.length) return o;
        var e = n.shift();
        if (R(o) && R(e)) for (var t in e) k(e, t) && (T.includes(t) || (R(e[t]) ? (k(o, t) && R(o[t]) || Object.assign(o, a({}, t, {})), I(o[t], e[t])) : Object.assign(o, a({}, t, e[t]))));
        return I.apply(void 0, [o].concat(n));
      }
      function B(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function F(o) {
        return F = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, F(o);
      }
      function N(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, H(l.key), l);
        }
      }
      function H(o) {
        var r = function(n, l) {
          if (F(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (F(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return F(r) == "symbol" ? r : r + "";
      }
      var V = function() {
        return o = function n(l, e) {
          var t, i;
          (function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.defaults = e, this.jsoneditor = l.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = l.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = w({}, this.options || {}, this.schema.options || {}, l.schema.options || {}, l), this.enforceConstEnabled = (t = this.options.enforce_const) !== null && t !== void 0 ? t : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", l.path || this.schema.id || (this.schema.id = this.formname), this.path = l.path || this.formname, this.formname = l.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = l.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, l.container && this.setContainer(l.container), this.registerDependencies();
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
                var v = e[c];
                n.checkDependency(d, v);
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
            }) : F(l) === "object" ? F(i) !== "object" ? this.dependenciesFulfilled = l === i : Object.keys(l).some(function(c) {
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
            Object.keys(this.schema.watch).forEach(function(v) {
              if (l = n.schema.watch[v], Array.isArray(l)) {
                if (l.length < 2) return;
                e = [l[0]].concat(l[1].split("."));
              } else e = l.split("."), n.theme.closest(n.container, '[data-schemaid="'.concat(e[0], '"]')) || e.unshift("#");
              if ((t = e.shift()) === "#" && (t = n.jsoneditor.schema.id || n.jsoneditor.root.formname), !(i = n.theme.closest(n.container, '[data-schemaid="'.concat(t, '"]')))) throw new Error("Could not find ancestor node with id ".concat(t));
              c = "".concat(i.getAttribute("data-schemapath"), ".").concat(e.join(".")), d.startsWith(c) && (n.watchLoop = !0), n.jsoneditor.watch(c, n.watch_listener), n.watched[v] = c;
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
            var v = document.createElement("img");
            this.theme.createImageLink(l, e, v), this.link_watchers.push(function(S) {
              var D = i(S), U = c(S);
              e.setAttribute("href", D), e.setAttribute("title", U || D), v.setAttribute("src", D);
            });
          } else if (["audio", "video"].includes(t)) {
            l = this.theme.getBlockLinkHolder(), (e = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var x = document.createElement(t);
            x.setAttribute("controls", "controls"), this.theme.createMediaLink(l, e, x), this.link_watchers.push(function(S) {
              var D = i(S), U = c(S);
              e.setAttribute("href", D), e.textContent = U || D, x.setAttribute("src", D);
            });
          } else e = l = this.theme.getBlockLink(), l.setAttribute("target", "_blank"), l.textContent = n.rel, l.style.display = "none", this.link_watchers.push(function(S) {
            var D = i(S), U = c(S);
            D && (l.style.display = ""), l.setAttribute("href", D), l.textContent = U || D;
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
            n = w(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (n.properties = {}, Object.keys(this.editors).forEach(function(i) {
              var c = l.editors[i];
              if (c.schema && c.schema.enum && c.schema.options && c.schema.options.enum_titles) {
                var d = c.schema.enum.indexOf(c.value), v = c.options.enum_titles[d];
                n.properties[i] = { enumTitle: v };
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
          if (n && Array.isArray(n) && (n = n[0]), n && F(n) === "object" && (n = n.type), n && Array.isArray(n) && (n = n[0]), typeof n == "string") {
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
            var c, d, v = (d = 2, function(D) {
              if (Array.isArray(D)) return D;
            }(c = i) || function(D, U) {
              var G = D == null ? null : typeof Symbol < "u" && D[Symbol.iterator] || D["@@iterator"];
              if (G != null) {
                var ee, pe, _e, we, Ie = [], De = !0, He = !1;
                try {
                  if (_e = (G = G.call(D)).next, U === 0) {
                    if (Object(G) !== G) return;
                    De = !1;
                  } else for (; !(De = (ee = _e.call(G)).done) && (Ie.push(ee.value), Ie.length !== U); De = !0) ;
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
            }(c, d) || function(D, U) {
              if (D) {
                if (typeof D == "string") return B(D, U);
                var G = Object.prototype.toString.call(D).slice(8, -1);
                return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? B(D, U) : void 0;
              }
            }(c, d) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), x = v[0], S = v[1];
            S === Object(S) ? l[x] = e.expandCallbacks(n, S) : typeof S == "string" && F(t) === "object" && typeof t[S] == "function" && (l[x] = t[S].bind(null, e));
          }), l;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && N(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function z(o) {
        return z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, z(o);
      }
      function K(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Z(l.key), l);
        }
      }
      function Z(o) {
        var r = function(n, l) {
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
      function re(o, r, n) {
        return r = ne(r), function(l, e) {
          if (e && (z(e) === "object" || typeof e == "function")) return e;
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
          }(this, r), re(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && me(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          oe(ne(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          oe(ne(r.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.purify(e), e = this.applyConstFilter(e), (!this.template || i) && (this.shouldBeUnset() || e != null ? z(e) === "object" ? e = JSON.stringify(e) : this.shouldBeUnset() || typeof e == "string" || (e = "".concat(e)) : e = "", e !== this.serialized)) {
            var c = this.sanitize(e);
            if (this.input.value !== c) {
              if (this.setValueToInputField(c), this.format === "range") {
                var d = this.control.querySelector("output");
                d && (d.value = c);
              }
              var v = i || this.getValue() !== e;
              return this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), v && this.onChange(!0, i), { changed: v, value: c };
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
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function(U) {
            if (U.preventDefault(), U.stopPropagation(), t.schema.template) U.currentTarget.value = t.value;
            else {
              var G = U.currentTarget.value, ee = t.sanitize(G);
              G !== ee && (U.currentTarget.value = ee), t.is_dirty = !0, t.refreshValue(), t.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function(U) {
            if (U) {
              var G, ee = U.offsetHeight;
              if (U.offsetHeight < U.scrollHeight) for (G = 0; U.offsetHeight < U.scrollHeight + 3 && !(G > 100); ) G++, ee++, U.style.height = "".concat(ee, "px");
              else {
                for (G = 0; U.offsetHeight >= U.scrollHeight + 3 && !(G > 100); ) G++, ee--, U.style.height = "".concat(ee, "px");
                U.style.height = "".concat(ee + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function(U) {
            t.adjust_height(U.currentTarget);
          }), this.input.addEventListener("change", function(U) {
            t.adjust_height(U.currentTarget);
          }), this.adjust_height());
          var v = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, x = this.schema.maxLength !== void 0;
          v && x && this.input.addEventListener("paste", function(U) {
            (U.clipboardData || window.clipboardData).getData("text").length + t.input.value.length > t.schema.maxLength && alert(t.translate("paste_max_length_reached", [t.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var S = this.input;
          if (this.format === "range" && (S = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, S, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input), t.format === "range" && (t.control.querySelector("output").value = t.input.value);
          }), this.schema.template) {
            var D = this.expandCallbacks("template", { template: this.schema.template });
            typeof D.template == "function" ? this.template = D.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }, { key: "setupCleave", value: function(e) {
          var t = this.expandCallbacks("cleave", w({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
          z(t) === "object" && Object.keys(t).length > 0 && (this.cleave_instance = new window.Cleave(e, t));
        } }, { key: "setupImask", value: function(e) {
          var t = this.expandCallbacks("imask", w({}, this.defaults.options.imask || {}, this.options.imask || {}));
          z(t) === "object" && Object.keys(t).length > 0 && (this.imask_instance = window.IMask(e, this.ajustIMaskOptions(t)));
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
        } }]) && K(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
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
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), e = this.expandCallbacks("ace", w({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, e), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
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
        return (r = M(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function $e(o) {
        return $e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $e(o);
      }
      function A(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, M(l.key), l);
        }
      }
      function M(o) {
        var r = function(n, l) {
          if ($e(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($e(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return $e(r) == "symbol" ? r : r + "";
      }
      function W(o, r, n) {
        return r = X(r), function(l, e) {
          if (e && ($e(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
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
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = X(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Q.apply(this, arguments);
      }
      function X(o) {
        return X = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, X(o);
      }
      function de(o, r) {
        return de = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, de(o, r);
      }
      m(2008), m(4554), m(7945), m(1278);
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
          return Array.isArray(this.schema.items) ? e >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? w({}, this.schema.additionalItems) : void 0 : w({}, this.schema.items[e]) : this.schema.items ? w({}, this.schema.items) : {};
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
          var v = this.jsoneditor.createEditor(d, { jsoneditor: this.jsoneditor, schema: i, container: c, path: "".concat(this.path, ".").concat(e), parent: this, required: !0 });
          return v.preBuild(), v.build(), v.postBuild(), v.title_controls || (v.array_controls = this.theme.getButtonHolder(), c.appendChild(v.array_controls)), v;
        } }, { key: "checkParent", value: function(e) {
          return e && e.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, Q(X(r.prototype), "destroy", this).call(this);
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
            }), v = d !== void 0 ? d.tab : null;
            !v && this.rows.length && (v = this.rows[0].tab), this.active_tab = v, this.refreshValue(i), this.refreshTabs(!0), this.refreshTabs(), this.onChange();
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
          var v = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, v), t.push(v), t.some(function(x) {
            return x;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(d) {
            return d.getValue();
          }), i !== this.value.length || e) {
            var c = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(d, v) {
              if (d.movedown_button) {
                var x = v !== t.rows.length - 1;
                t.setButtonState(d.movedown_button, x);
              }
              d.delete_button && t.setButtonState(d.delete_button, !c), t.value[v] = d.getValue();
            }), this.setupButtons(c) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e, t) {
          var i = this, c = this.rows.length;
          this.rows[c] = this.getElementEditor(c), this.row_cache[c] = this.rows[c], this.tabs_holder ? (this.rows[c].tab_text = document.createElement("span"), this.rows[c].tab_text.textContent = this.rows[c].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[c].tab = this.theme.getTopTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTopTab(this.tabs_holder, this.rows[c].tab)) : (this.rows[c].tab = this.theme.getTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTab(this.tabs_holder, this.rows[c].tab)), this.rows[c].tab.addEventListener("click", function(v) {
            i.active_tab = i.rows[c].tab, i.refreshTabs(), v.preventDefault(), v.stopPropagation();
          }), this._supportDragDrop(this.rows[c].tab)) : this._supportDragDrop(this.rows[c].container, !0);
          var d = this.rows[c].title_controls || this.rows[c].array_controls;
          return this.hide_delete_buttons || (this.rows[c].delete_button = this._createDeleteButton(c, d)), this.show_copy_button && (this.rows[c].copy_button = this._createCopyButton(c, d)), c && !this.hide_move_buttons && (this.rows[c].moveup_button = this._createMoveUpButton(c, d)), this.hide_move_buttons || (this.rows[c].movedown_button = this._createMoveDownButton(c, d)), e !== void 0 && this.rows[c].setValue(e, t), this.refreshTabs(), this.rows[c];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            if (d.preventDefault(), d.stopPropagation(), !i.askConfirmation()) return !1;
            var v = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue().filter(function(U, G) {
              return G !== v;
            }), S = null, D = i.rows[v].getValue();
            i.setValue(x), i.rows[v] ? S = i.rows[v].tab : i.rows[v - 1] && (S = i.rows[v - 1].tab), S && (i.active_tab = S, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", D);
          }), t && t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), d = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(v) {
            var x = i.getValue();
            v.preventDefault(), v.stopPropagation();
            var S = 1 * v.currentTarget.getAttribute("data-i");
            x.forEach(function(D, U) {
              if (U === S) {
                var G = $e(D) === "object" && D !== null ? function(we) {
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
                if (d.items.type === "string" && d.items.format === "uuid") G = L();
                else if (d.items.type === "object" && d.items.properties) for (var ee = 0, pe = Object.keys(G); ee < pe.length; ee++) {
                  var _e = pe[ee];
                  d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && (G[_e] = L());
                }
                x.push(G);
              }
            }), i.setValue(x), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[S - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var v = 1 * d.currentTarget.getAttribute("data-i");
            if (!(v <= 0)) {
              var x = i.getValue(), S = x[v - 1];
              x[v - 1] = x[v], x[v] = S, i.setValue(x), i.active_tab = i.rows[v - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[v - 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var v = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            if (!(v >= x.length - 1)) {
              var S = x[v + 1];
              x[v + 1] = x[v], x[v] = S, i.setValue(x), i.active_tab = i.rows[v + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[v + 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          le(e, function(c, d) {
            var v = i.getValue(), x = v[c];
            v.splice(c, 1), v.splice(d, 0, x), i.setValue(v), i.active_tab = i.rows[d].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[d]);
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
            var c = e.getValue(), d = null, v = c.pop();
            e.setValue(c), e.rows[e.rows.length - 1] && (d = e.rows[e.rows.length - 1].tab), d && (e.active_tab = d, e.refreshTabs()), e.onChange(!0), e.jsoneditor.trigger("deleteRow", v);
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
        } }], l && A(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
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
        }(o, te() ? Reflect.construct(r, n || [], ue(o).constructor) : r.apply(o, n));
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
            var v = c[e] || {};
            "title" in v || (v.title = "".concat(d[e] || i[e])), this.option_keys.push("".concat(i[e])), this.option_enum.push(v), this.select_values["".concat(i[e])] = i[e];
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
            for (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys, !0), this.theme.setSelectOptions(this.input, this.option_keys, this.option_enum.map(function(v) {
              return v.title;
            })), this.input.setAttribute("multiple", "multiple"), this.input.size = Math.min(10, this.option_keys.length), e = 0; e < this.option_keys.length; e++) this.select_options[this.option_keys[e]] = this.input.children[e];
            this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton, this.formname);
          }
          (this.schema.readOnly || this.schema.readonly) && this.disable(!0), this.container.appendChild(this.control), this.multiselectChangeHandler = function(v) {
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
      }(V);
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
            var t = this.expandCallbacks("choices", w({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
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
      function as(o, r) {
        return as = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, as(o, r);
      }
      var wd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && as(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.select2_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : rr(At(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (e = this.expandCallbacks("select2", w({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = e.tags = !!e.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
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
      function Fn(o) {
        return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Fn(o);
      }
      function jd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, kd(l.key), l);
        }
      }
      function kd(o) {
        var r = function(n, l) {
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
      function xd(o, r, n) {
        return r = nr(r), function(l, e) {
          if (e && (Fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, cl() ? Reflect.construct(r, n || [], nr(o).constructor) : r.apply(o, n));
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
      function ls(o, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ls(o, r);
      }
      var Od = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), xd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.selectize_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.selectize_instance.setValue(this.value), this.onChange(!0)) : dn(nr(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            e = this.expandCallbacks("selectize", w({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = e.create = !!e.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(v) {
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
      function Mn(o) {
        return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Mn(o);
      }
      function Cd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ed(l.key), l);
        }
      }
      function Ed(o) {
        var r = function(n, l) {
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
        return r = Mr(r), function(l, e) {
          if (e && (Mn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ul() ? Reflect.construct(r, n || [], Mr(o).constructor) : r.apply(o, n));
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
      function cs(o, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, cs(o, r);
      }
      var Pd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Sd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
        }(r, o), n = r, (l = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), Ii(Mr(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Autocomplete && !this.autocomplete_instance && (e = this.expandCallbacks("autocomplete", w({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            t.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(e.baseClass), this.autocomplete_dropdown.classList.add("".concat(e.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, e)), Ii(Mr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), Ii(Mr(r.prototype), "destroy", this).call(this);
        } }]) && Cd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Hn(o) {
        return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hn(o);
      }
      function Td(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ld(l.key), l);
        }
      }
      function Ld(o) {
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
      function Ad(o, r, n) {
        return r = Hr(r), function(l, e) {
          if (e && (Hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, dl() ? Reflect.construct(r, n || [], Hr(o).constructor) : r.apply(o, n));
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
      function us(o, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, us(o, r);
      }
      var Rd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ad(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && us(e, t);
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
                var v = new FileReader();
                v.onload = function(x) {
                  e.value = x.target.result, e.refreshPreview(), e.onChange(!0), v = null;
                }, v.readAsDataURL(i.currentTarget.files[0]);
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
      }(V);
      function Vn(o) {
        return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vn(o);
      }
      function Id(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Bd(l.key), l);
        }
      }
      function Bd(o) {
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
      function Nd(o, r, n) {
        return r = Vr(r), function(l, e) {
          if (e && (Vn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, hl() ? Reflect.construct(r, n || [], Vr(o).constructor) : r.apply(o, n));
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
      function ds(o, r) {
        return ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ds(o, r);
      }
      var pl = function(o) {
        function r(e, t) {
          var i;
          return function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = Nd(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ds(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", w({}, { icon: "", validated: !1, align: "left", action: function(c, d) {
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
      }(V);
      function zn(o) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(o);
      }
      function Dd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Fd(l.key), l);
        }
      }
      function Fd(o) {
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
      function Md(o, r, n) {
        return r = Ht(r), function(l, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, fl() ? Reflect.construct(r, n || [], Ht(o).constructor) : r.apply(o, n));
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
      function hs(o, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, hs(o, r);
      }
      var Hd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Md(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
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
            var d = e.reduce(function(v, x) {
              return x.path === t.path && v.push(x.message), v;
            }, []);
            this.input.controlgroup = this.control, d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Dd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
      function qn(o) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(o);
      }
      function Vd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, zd(l.key), l);
        }
      }
      function zd(o) {
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
      function qd(o, r, n) {
        return r = Vt(r), function(l, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, yl() ? Reflect.construct(r, n || [], Vt(o).constructor) : r.apply(o, n));
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
      function ps(o, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ps(o, r);
      }
      m(6910);
      var Di = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), c = this.enum_options.length > 0 && this.enum_values.includes(i), d = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || c && (!t || this.isRequired() || d) || (i = this.enum_values[0]), this.value !== i) {
            var v = this.enum_values.indexOf(i);
            c && v !== -1 ? this.input.value = this.enum_options[v] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, t || (this.is_dirty = !0), this.onChange(), this.change();
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
            var v = this.schema.const;
            this.enum_options = ["".concat(v)], this.enum_display = ["".concat(this.translateProperty(v) || v)], this.enum_values = [this.typecast(v)];
          } else if (this.schema.enum) {
            var x = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(S, D) {
              d.enum_options[D] = "".concat(S), d.enum_display[D] = "".concat(d.translateProperty(x[D]) || S), d.enum_values[D] = d.typecast(S);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = w({}, this.schema.enumSource[i]);
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
              var v = [];
              if (v = Array.isArray(this.enumSource[d].source) ? this.enumSource[d].source : e[this.enumSource[d].source]) {
                if (this.enumSource[d].slice && (v = Array.prototype.slice.apply(v, this.enumSource[d].slice)), this.enumSource[d].filter) {
                  var x = [];
                  for (t = 0; t < v.length; t++) this.enumSource[d].filter({ i: t, item: v[t], watched: e }) && x.push(v[t]);
                  v = x;
                }
                var S = [], D = [];
                for (t = 0; t < v.length; t++) {
                  var U = v[t];
                  this.enumSource[d].value ? D[t] = this.typecast(this.enumSource[d].value({ i: t, item: U })) : D[t] = v[t], this.enumSource[d].title ? S[t] = this.enumSource[d].title({ i: t, item: U }) : S[t] = D[t];
                }
                this.enumSource[d].sort && (function(ee, pe, _e) {
                  ee.map(function(we, Ie) {
                    return { v: we, t: pe[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    ee[Ie] = we.v, pe[Ie] = we.t;
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
            var d = e.reduce(function(v, x) {
              return x.path === t.path && v.push(x.message), v;
            }, []);
            d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Vd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
      function $n(o) {
        return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $n(o);
      }
      function $d(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ud(l.key), l);
        }
      }
      function Ud(o) {
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
      function Gd(o, r, n) {
        return r = zt(r), function(l, e) {
          if (e && ($n(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ml() ? Reflect.construct(r, n || [], zt(o).constructor) : r.apply(o, n));
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
      function $r() {
        return $r = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, $r.apply(this, arguments);
      }
      function zt(o) {
        return zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, zt(o);
      }
      function fs(o, r) {
        return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fs(o, r);
      }
      var bl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else $r(zt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", w({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, e);
          }
          $r(zt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          if ($r(zt(r.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var t = this.enum_options.map(function(i, c) {
              return { value: i, label: e.enum_display[c] };
            });
            this.choices_instance.setChoices(t, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), $r(zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), $r(zt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), $r(zt(r.prototype), "destroy", this).call(this);
        } }]) && $d(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
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
        return r = Ur(r), function(l, e) {
          if (e && (hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, vl() ? Reflect.construct(r, n || [], Ur(o).constructor) : r.apply(o, n));
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
      function Fi() {
        return Fi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ur(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Fi.apply(this, arguments);
      }
      function Ur(o) {
        return Ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ur(o);
      }
      function ys(o, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ys(o, r);
      }
      bl.rules = { ".choices > *": "box-sizing:border-box" };
      var Zd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Kd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          if (Fi(Ur(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && hn(this.options.flatpickr) === "object")) {
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
              var d = this.input.parentNode, v = this.input.nextSibling, x = this.theme.getInputGroup(this.input, t);
              x !== void 0 ? (this.options.flatpickr.inline = !1, d.insertBefore(x, v), e = x) : this.options.flatpickr.wrap = !1;
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
          if (e = this.applyConstFilter(e), this.schema.type === "string") Fi(Ur(r.prototype), "setValue", this).call(this, e, t, i), this.flatpickr && this.flatpickr.setDate(e);
          else if (e > 0) {
            var c = new Date(1e3 * e), d = c.getFullYear(), v = this.zeroPad(c.getMonth() + 1), x = this.zeroPad(c.getDate()), S = this.zeroPad(c.getHours()), D = this.zeroPad(c.getMinutes()), U = this.zeroPad(c.getSeconds()), G = [d, v, x].join("-"), ee = [S, D, U].join(":"), pe = "".concat(G, "T").concat(ee);
            this.schema.format === "date" ? pe = G : this.schema.format === "time" && (pe = ee), this.input.value = pe, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(pe);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Fi(Ur(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && Wd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Un(o) {
        return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Un(o);
      }
      function Yd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Qd(l.key), l);
        }
      }
      function Qd(o) {
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
      function Xd(o, r, n) {
        return r = qt(r), function(l, e) {
          if (e && (Un(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
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
      function ms(o, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ms(o, r);
      }
      var eh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Xd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
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
          var i = w({}, this.schema, this.jsoneditor.refs[e]), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
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
      }(V);
      function pn(o) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pn(o);
      }
      function _l(o, r) {
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
        }(o, wl() ? Reflect.construct(r, n || [], Wr(o).constructor) : r.apply(o, n));
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
      function bs(o, r) {
        return bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, bs(o, r);
      }
      var ih = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), nh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && bs(e, t);
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
            return t = e, i = function(v, x) {
              var S = c.getHTML(x);
              Array.isArray(e) || (S = "<div><em>".concat(v, "</em>: ").concat(S, "</div>")), d += "<li>".concat(S, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(v, x) {
              return i(x, v);
            }) : Object.entries(t).forEach(function(v) {
              var x, S, D = (S = 2, function(ee) {
                if (Array.isArray(ee)) return ee;
              }(x = v) || function(ee, pe) {
                var _e = ee == null ? null : typeof Symbol < "u" && ee[Symbol.iterator] || ee["@@iterator"];
                if (_e != null) {
                  var we, Ie, De, He, ve = [], xe = !0, Ke = !1;
                  try {
                    if (De = (_e = _e.call(ee)).next, pe === 0) {
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
              }(x, S) || function(ee, pe) {
                if (ee) {
                  if (typeof ee == "string") return _l(ee, pe);
                  var _e = Object.prototype.toString.call(ee).slice(8, -1);
                  return _e === "Object" && ee.constructor && (_e = ee.constructor.name), _e === "Map" || _e === "Set" ? Array.from(ee) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? _l(ee, pe) : void 0;
                }
              }(x, S) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), U = D[0], G = D[1];
              return i(U, G);
            }), d = Array.isArray(e) ? "<ol>".concat(d, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(d, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Mi(Wr(r.prototype), "destroy", this).call(this);
        } }]) && th(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
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
        return r = $t(r), function(l, e) {
          if (e && (fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, jl() ? Reflect.construct(r, n || [], $t(o).constructor) : r.apply(o, n));
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
      function Jr() {
        return Jr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $t(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Jr.apply(this, arguments);
      }
      function $t(o) {
        return $t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $t(o);
      }
      function vs(o, r) {
        return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, vs(o, r);
      }
      var lh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vs(e, t);
        }(r, o), n = r, (l = [{ key: "register", value: function() {
          Jr($t(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Jr($t(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
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
          Jr($t(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Jr($t(r.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Jr($t(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), Jr($t(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var e = this.expandCallbacks("template", { template: this.schema.template });
            typeof e.template == "function" ? this.template = e.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && oh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
      function Gn(o) {
        return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gn(o);
      }
      function ch(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, uh(l.key), l);
        }
      }
      function uh(o) {
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
      function dh(o, r, n) {
        return r = yo(r), function(l, e) {
          if (e && (Gn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, kl() ? Reflect.construct(r, n || [], yo(o).constructor) : r.apply(o, n));
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
      function yo(o) {
        return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, yo(o);
      }
      function gs(o, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, gs(o, r);
      }
      var hh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), dh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
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
      }(pl);
      function Wn(o) {
        return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Wn(o);
      }
      function ph(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, fh(l.key), l);
        }
      }
      function fh(o) {
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
      function yh(o, r, n) {
        return r = Jn(r), function(l, e) {
          if (e && (Wn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, xl() ? Reflect.construct(r, n || [], Jn(o).constructor) : r.apply(o, n));
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
      function _s() {
        return _s = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _s.apply(this, arguments);
      }
      function Jn(o) {
        return Jn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jn(o);
      }
      function ws(o, r) {
        return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ws(o, r);
      }
      var Ol = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ws(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          if (_s(Jn(r.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
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
      function Kn(o) {
        return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Kn(o);
      }
      function mh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, bh(l.key), l);
        }
      }
      function bh(o) {
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
      function vh(o, r, n) {
        return r = mo(r), function(l, e) {
          if (e && (Kn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Cl() ? Reflect.construct(r, n || [], mo(o).constructor) : r.apply(o, n));
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
      function mo(o) {
        return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mo(o);
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
          }(this, r), vh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && js(e, t);
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
      }(Ol);
      function Zn(o) {
        return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zn(o);
      }
      function gh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, _h(l.key), l);
        }
      }
      function _h(o) {
        var r = function(n, l) {
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
      function wh(o, r, n) {
        return r = Yn(r), function(l, e) {
          if (e && (Zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Sl() ? Reflect.construct(r, n || [], Yn(o).constructor) : r.apply(o, n));
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
      function ks() {
        return ks = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Yn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ks.apply(this, arguments);
      }
      function Yn(o) {
        return Yn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Yn(o);
      }
      function xs(o, r) {
        return xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, xs(o, r);
      }
      var jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xs(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          if (ks(Yn(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = w(this.options, this.schema.options || {});
        } }]) && gh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function Qn(o) {
        return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qn(o);
      }
      function kh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, xh(l.key), l);
        }
      }
      function xh(o) {
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
      function Oh(o, r, n) {
        return r = Ut(r), function(l, e) {
          if (e && (Qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Pl() ? Reflect.construct(r, n || [], Ut(o).constructor) : r.apply(o, n));
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
      function Kr() {
        return Kr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Kr.apply(this, arguments);
      }
      function Ut(o) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(o);
      }
      function Os(o, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Os(o, r);
      }
      var Ch = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Oh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Os(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Kr(Ut(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.jodit_instance && this.jodit_instance.setEditorValue(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Kr(Ut(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", w({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            t.value = t.jodit_instance.getEditorValue(), t.is_dirty = !0, t.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : Kr(Ut(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), Kr(Ut(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), Kr(Ut(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), Kr(Ut(r.prototype), "destroy", this).call(this);
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
      function Tl(o, r) {
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
        return (r = Ll(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
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
            var t, i, c, d, v = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (v.push(t.value), v.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return v;
          }
        }(o, r) || Cs(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ct(o) {
        return function(r) {
          if (Array.isArray(r)) return Es(r);
        }(o) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(o) || Cs(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Cs(o, r) {
        if (o) {
          if (typeof o == "string") return Es(o, r);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set" ? Array.from(o) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Es(o, r) : void 0;
        }
      }
      function Es(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function Ph(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Ll(l.key), l);
        }
      }
      function Ll(o) {
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
      m(8431);
      var Al = function() {
        return o = function n(l, e, t, i) {
          (function(c, d) {
            if (!(c instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = l, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(c, d, v) {
            var x = [];
            if (c.dependentRequired !== void 0) {
              var S = [];
              Object.keys(c.dependentRequired).forEach(function(D) {
                if (d[D] !== void 0) {
                  var U = c.dependentRequired[D];
                  S = U.filter(function(G) {
                    return !k(d, G);
                  });
                }
              }), S.length > 0 && x.push({ message: "Must have the required properties: " + S.join(", "), path: v });
            }
            return x;
          }, dependentSchemas: function(c, d, v) {
            var x = this, S = [];
            return Object.keys(c.dependentSchemas).forEach(function(D) {
              if (d[D] !== void 0) {
                var U = c.dependentSchemas[D], G = x._validateSchema(U, d, v);
                S = [].concat(ct(S), ct(G));
              }
            }), S;
          }, contains: function(c, d, v) {
            var x = this, S = [], D = 0;
            d.forEach(function(G) {
              x._validateSchema(c.contains, G, v).length === 0 && D++;
            });
            var U = D === 0;
            return c.minContains !== void 0 ? D < c.minContains && S.push({ message: this.translate("error_minContains", [D, c.minContains], c), path: v }) : U && S.push({ message: this.translate("error_contains", null, c), path: v }), c.maxContains !== void 0 && D > c.maxContains && S.push({ message: this.translate("error_maxContains", [D, c.maxContains], c), path: v }), S;
          }, if: function(c, d, v) {
            if (c.then === void 0 && c.else === void 0) return [];
            var x = this._validateSchema(c.if, d, v), S = [], D = [];
            return c.then !== void 0 && (S = this._validateSchema(c.then, d, v)), c.else !== void 0 && (D = this._validateSchema(c.else, d, v)), c.if === !0 ? S : c.if === !1 ? D : x.length === 0 ? S : x.length > 0 ? D : [];
          }, const: function(c, d, v) {
            return JSON.stringify(c.const) === JSON.stringify(d) ? [] : [{ path: v, property: "const", message: this.translate("error_const", null, c) }];
          }, enum: function(c, d, v) {
            var x = JSON.stringify(d);
            return c.enum.some(function(S) {
              return x === JSON.stringify(S);
            }) ? [] : [{ path: v, property: "enum", message: this.translate("error_enum", null, c) }];
          }, extends: function(c, d, v) {
            var x = this;
            return c.extends.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, d, v))), S;
            }, []);
          }, allOf: function(c, d, v) {
            var x = this;
            return c.allOf.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, d, v))), S;
            }, []);
          }, anyOf: function(c, d, v) {
            var x = this;
            return c.anyOf.some(function(S) {
              return !x._validateSchema(S, d, v).length;
            }) ? [] : [{ path: v, property: "anyOf", message: this.translate("error_anyOf", null, c) }];
          }, oneOf: function(c, d, v) {
            var x = this, S = 0, D = [];
            c.oneOf.forEach(function(G, ee) {
              var pe = x._validateSchema(G, d, v);
              pe.length || S++, pe.forEach(function(_e) {
                _e.path = "".concat(v, ".oneOf[").concat(ee, "]").concat(_e.path.substr(v.length));
              }), D.push.apply(D, ct(pe));
            });
            var U = [];
            return S !== 1 && (U.push({ path: v, property: "oneOf", message: this.translate("error_oneOf", [S], c) }), U.push.apply(U, D)), U;
          }, not: function(c, d, v) {
            return this._validateSchema(c.not, d, v).length ? [] : [{ path: v, property: "not", message: this.translate("error_not", null, c) }];
          }, type: function(c, d, v) {
            var x = this;
            if (Array.isArray(c.type)) {
              if (!c.type.some(function(S) {
                return x._checkType(S, d);
              })) return [{ path: v, property: "type", message: this.translate("error_type_union", null, c) }];
            } else if (["date", "time", "datetime-local"].includes(c.format) && c.type === "integer") {
              if (!this._checkType("string", "".concat(d))) return [{ path: v, property: "type", message: this.translate("error_type", [c.format], c) }];
            } else if (!this._checkType(c.type, d)) return [{ path: v, property: "type", message: this.translate("error_type", [c.type], c) }];
            return [];
          }, disallow: function(c, d, v) {
            var x = this;
            if (Array.isArray(c.disallow)) {
              if (c.disallow.some(function(S) {
                return x._checkType(S, d);
              })) return [{ path: v, property: "disallow", message: this.translate("error_disallow_union", null, c) }];
            } else if (this._checkType(c.disallow, d)) return [{ path: v, property: "disallow", message: this.translate("error_disallow", [c.disallow], c) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(c, d, v) {
            return this._validateNumberSubSchemaMultipleDivisible(c, d, v);
          }, divisibleBy: function(c, d, v) {
            return this._validateNumberSubSchemaMultipleDivisible(c, d, v);
          }, maximum: function(c, d, v) {
            var x = c.exclusiveMaximum ? d < c.maximum : d <= c.maximum;
            return window.math ? x = window.math[c.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(d), window.math.bignumber(c.maximum)) : window.Decimal && (x = new window.Decimal(d)[c.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(c.maximum))), x ? [] : [{ path: v, property: "maximum", message: this.translate(c.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [c.maximum], c) }];
          }, minimum: function(c, d, v) {
            var x = c.exclusiveMinimum ? d > c.minimum : d >= c.minimum;
            return window.math ? x = window.math[c.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(d), window.math.bignumber(c.minimum)) : window.Decimal && (x = new window.Decimal(d)[c.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(c.minimum))), x ? [] : [{ path: v, property: "minimum", message: this.translate(c.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [c.minimum], c) }];
          } }, this._validateStringSubSchema = { maxLength: function(c, d, v) {
            var x = [];
            return "".concat(d).length > c.maxLength && x.push({ path: v, property: "maxLength", message: this.translate("error_maxLength", [c.maxLength], c) }), x;
          }, minLength: function(c, d, v) {
            return "".concat(d).length < c.minLength ? [{ path: v, property: "minLength", message: this.translate(c.minLength === 1 ? "error_notempty" : "error_minLength", [c.minLength], c) }] : [];
          }, pattern: function(c, d, v) {
            return new RegExp(c.pattern).test(d) ? [] : [{ path: v, property: "pattern", message: c.options && c.options.patternmessage ? c.options.patternmessage : this.translate("error_pattern", [c.pattern], c) }];
          } }, this._validateArraySubSchema = { items: function(c, d, v) {
            var x = this, S = [];
            if (Array.isArray(c.items)) for (var D = 0; D < d.length; D++) if (c.items[D]) S.push.apply(S, ct(this._validateSchema(c.items[D], d[D], "".concat(v, ".").concat(D))));
            else {
              if (c.additionalItems === !0) break;
              if (!c.additionalItems) {
                if (c.additionalItems === !1) {
                  S.push({ path: v, property: "additionalItems", message: this.translate("error_additionalItems", null, c) });
                  break;
                }
                break;
              }
              S.push.apply(S, ct(this._validateSchema(c.additionalItems, d[D], "".concat(v, ".").concat(D))));
            }
            else d.forEach(function(U, G) {
              S.push.apply(S, ct(x._validateSchema(c.items, U, "".concat(v, ".").concat(G))));
            });
            return S;
          }, maxItems: function(c, d, v) {
            return d.length > c.maxItems ? [{ path: v, property: "maxItems", message: this.translate("error_maxItems", [c.maxItems], c) }] : [];
          }, minItems: function(c, d, v) {
            return d.length < c.minItems ? [{ path: v, property: "minItems", message: this.translate("error_minItems", [c.minItems], c) }] : [];
          }, uniqueItems: function(c, d, v) {
            for (var x = {}, S = 0; S < d.length; S++) {
              var D = JSON.stringify(d[S]);
              if (x[D]) return [{ path: v, property: "uniqueItems", message: this.translate("error_uniqueItems", null, c) }];
              x[D] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(c, d, v) {
            return Object.keys(d).length > c.maxProperties ? [{ path: v, property: "maxProperties", message: this.translate("error_maxProperties", [c.maxProperties], c) }] : [];
          }, minProperties: function(c, d, v) {
            return Object.keys(d).length < c.minProperties ? [{ path: v, property: "minProperties", message: this.translate("error_minProperties", [c.minProperties], c) }] : [];
          }, required: function(c, d, v) {
            var x = this, S = [];
            return Array.isArray(c.required) && c.required.forEach(function(D) {
              if (d[D] === void 0) {
                var U = x.jsoneditor.getEditor("".concat(v, ".").concat(D));
                U && U.dependenciesFulfilled === !1 || U && ["button", "info"].includes(U.schema.format || U.schema.type) || S.push({ path: v, property: "required", message: x.translate("error_required", [c && c.properties && c.properties[D] && c.properties[D].title ? c.properties[D].title : D], c) });
              }
            }), S;
          }, properties: function(c, d, v, x) {
            var S = this, D = [];
            return Object.entries(c.properties).forEach(function(U) {
              var G = Hi(U, 2), ee = G[0], pe = G[1];
              x[ee] = !0, D.push.apply(D, ct(S._validateSchema(pe, d[ee], "".concat(v, ".").concat(ee))));
            }), D;
          }, patternProperties: function(c, d, v, x) {
            var S = this, D = [];
            return Object.entries(c.patternProperties).forEach(function(U) {
              var G = Hi(U, 2), ee = G[0], pe = G[1], _e = new RegExp(ee);
              Object.entries(d).forEach(function(we) {
                var Ie = Hi(we, 2), De = Ie[0], He = Ie[1];
                _e.test(De) && (x[De] = !0, D.push.apply(D, ct(S._validateSchema(pe, He, "".concat(v, ".").concat(De)))));
              });
            }), D;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(c, d, v, x) {
            for (var S, D = this, U = [], G = Object.keys(d), ee = null, pe = function() {
              var we = "";
              return ee = G[_e], typeof c.propertyNames == "boolean" ? c.propertyNames === !0 ? 0 : (U.push({ path: v, property: "propertyNames", message: D.translate("error_property_names_false", [ee], c) }), 1) : Object.entries(c.propertyNames).every(function(Ie) {
                var De = Hi(Ie, 2), He = De[0], ve = De[1], xe = !1;
                switch (He) {
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
                    return U.push({ path: v, property: "propertyNames", message: D.translate("error_property_names_unsupported", [He], c) }), !1;
                }
                return U.push({ path: v, property: "propertyNames", message: D.translate(we, [ee], c) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < G.length && ((S = pe()) === 0 || S !== 1); _e++) ;
            return U;
          }, additionalProperties: function(c, d, v, x) {
            for (var S = [], D = Object.keys(d), U = 0; U < D.length; U++) {
              var G = D[U];
              if (!x[G]) {
                if (!c.additionalProperties) {
                  S.push({ path: v, property: "additionalProperties", message: this.translate("error_additional_properties", [G], c) });
                  break;
                }
                if (c.additionalProperties === !0) break;
                S.push.apply(S, ct(this._validateSchema(c.additionalProperties, d[G], "".concat(v, ".").concat(G))));
              }
            }
            return S;
          }, dependencies: function(c, d, v) {
            var x = this, S = [];
            return Object.entries(c.dependencies).forEach(function(D) {
              var U = Hi(D, 2), G = U[0], ee = U[1];
              d[G] !== void 0 && (Array.isArray(ee) ? ee.forEach(function(pe) {
                d[pe] === void 0 && S.push({ path: v, property: "dependencies", message: x.translate("error_dependency", [pe], c) });
              }) : S.push.apply(S, ct(x._validateSchema(ee, d, v))));
            }), S;
          } };
        }, r = [{ key: "fitTest", value: function(n, l) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if (Gt(n) === "object" && n !== null) {
            var i = this._getSchema(l);
            if (i.anyOf) {
              var c, d = function(ee) {
                for (var pe = 1; pe < arguments.length; pe++) {
                  var _e = arguments[pe] != null ? arguments[pe] : {};
                  pe % 2 ? Tl(Object(_e), !0).forEach(function(we) {
                    Sh(ee, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(ee, Object.getOwnPropertyDescriptors(_e)) : Tl(Object(_e)).forEach(function(we) {
                    Object.defineProperty(ee, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return ee;
              }({}, t), v = function(ee, pe) {
                var _e = typeof Symbol < "u" && ee[Symbol.iterator] || ee["@@iterator"];
                if (!_e) {
                  if (Array.isArray(ee) || (_e = Cs(ee))) {
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
                var De, He = !0, ve = !1;
                return { s: function() {
                  _e = _e.call(ee);
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
                for (v.s(); !(c = v.n()).done; ) {
                  var x = c.value, S = this.fitTest(n, x, e);
                  (S.match > d.match || S.match === d.match && S.extra < d.extra) && (d = S);
                }
              } catch (ee) {
                v.e(ee);
              } finally {
                v.f();
              }
              return d;
            }
            var D = this._getSchema(l).properties;
            for (var U in D) if (k(D, U)) {
              if (Gt(n[U]) === "object" && Gt(D[U]) === "object" && Gt(D[U].properties) === "object") {
                var G = this.fitTest(n[U], D[U], e / 100);
                t.match += G.match, t.extra += G.extra;
              }
              n[U] !== void 0 && (t.match += e);
            } else t.extra += e;
          }
          return t;
        } }, { key: "_getSchema", value: function(n) {
          return n === void 0 ? w({}, this.jsoneditor.expandRefs(this.schema)) : n;
        } }, { key: "validate", value: function(n) {
          return this._validateSchema(this.schema, n);
        } }, { key: "_validateSchema", value: function(n, l, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = w({}, this.jsoneditor.expandRefs(n)), l === void 0 ? this._validateV3Required(n, l, e) : (Object.keys(n).forEach(function(c) {
            t._validateSubSchema[c] && i.push.apply(i, ct(t._validateSubSchema[c].call(t, n, l, e)));
          }), i.push.apply(i, ct(this._validateByValueType(n, l, e))), n.links && n.links.forEach(function(c, d) {
            c.rel && c.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, d), i.push.apply(i, ct(t._validateSchema(n, l, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, ct(this._validateDateTimeSubSchema(n, l, e))), ["uuid"].includes(n.format) && i.push.apply(i, ct(this._validateUUIDSchema(n, l, e))), i.push.apply(i, ct(this._validateCustomValidator(n, l, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, l) {
          var e = n.links[l].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), c = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, l).concat(n.links.slice(l + 1)), w({}, n, this.jsoneditor.refs[c]);
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
          if (n.type === "integer") return function(d, v, x) {
            return 1 * v < 1 ? [{ path: x, property: "format", message: t.translate("error_invalid_epoch", null, d) }] : v !== Math.abs(parseInt(v)) ? [{ path: x, property: "format", message: t.translate("error_".concat(d.format.replace(/-/g, "_")), [c], d) }] : [];
          }(n, l, e);
          if (i && i.flatpickr) {
            if (i) return function(d, v, x, S) {
              if (v !== "") {
                var D;
                if (S.flatpickr.config.mode !== "single") {
                  var U = S.flatpickr.config.mode === "range" ? S.flatpickr.l10n.rangeSeparator : ", ";
                  D = S.flatpickr.selectedDates.map(function(ee) {
                    return S.flatpickr.formatDate(ee, S.flatpickr.config.dateFormat);
                  }).join(U);
                }
                try {
                  if (D) {
                    if (D !== v) throw new Error("".concat(S.flatpickr.config.mode, " mismatch"));
                  } else if (S.flatpickr.formatDate(S.flatpickr.parseDate(v, S.flatpickr.config.dateFormat), S.flatpickr.config.dateFormat) !== v) throw new Error("mismatch");
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
        }(o, Rl() ? Reflect.construct(r, n || [], Wt(o).constructor) : r.apply(o, n));
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
      function Ss(o, r) {
        return Ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ss(o, r);
      }
      var Rh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ah(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ss(e, t);
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
            var v, x;
            c && (t.type === d ? (t.keep_only_existing_values && (v = c.getValue(), x = i, Object.keys(x).forEach(function(S) {
              T.includes(S) || S in v && (v[S] = x[S]);
            }), i = v), (t.keep_values || t.if) && c.setValue(i, !0), c.container.style.display = "") : c.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, c = this, d = this.types[e], v = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(v), typeof d == "string" ? (i = w({}, this.schema)).type = d : (i = w({}, this.schema, d), i = this.jsoneditor.expandRefs(i), d && d.required && Array.isArray(d.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(d.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
          var x = this.jsoneditor.getEditorClass(i);
          this.editors[e] = this.jsoneditor.createEditor(x, { jsoneditor: this.jsoneditor, schema: i, container: v, path: this.path, parent: this, required: !0 }), this.editors[e].preBuild(), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].header && this.theme.visuallyHidden(this.editors[e].header), this.editors[e].option = this.switcher_options[e], v.addEventListener("change_header_text", function() {
            c.refreshHeaderText();
          }), e !== this.type && (v.style.display = "none");
        } }, { key: "preBuild", value: function() {
          if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, this.jsoneditor.options.keep_oneof_values !== void 0 && (this.keep_values = this.jsoneditor.options.keep_oneof_values), this.options.keep_oneof_values !== void 0 && (this.keep_values = this.options.keep_oneof_values), this.keep_only_existing_values = !1, this.jsoneditor.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.jsoneditor.options.keep_only_existing_values), this.options.keep_only_existing_values !== void 0 && (this.keep_only_existing_values = this.options.keep_only_existing_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
          else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
          else if (this.schema.if) this.if = !0, this.ifSchema = JSON.parse(JSON.stringify(this.schema.if)), this.thenSchema = { title: "then" }, this.elseSchema = { title: "else" }, this.types = [], this.schema.then && I(this.thenSchema, this.schema, this.schema.then), this.schema.else && I(this.elseSchema, this.schema, this.schema.else), this.types.push(this.thenSchema), this.types.push(this.elseSchema), this.types.forEach(function(i) {
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
            var v;
            e.editors[d] = !1, typeof c == "string" ? (v = w({}, e.schema)).type = c : (v = w({}, e.schema, c), c.required && Array.isArray(c.required) && e.schema.required && Array.isArray(e.schema.required) && (v.required = e.schema.required.concat(c.required))), e.validators[d] = new Al(e.jsoneditor, v, i, e.defaults);
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
          var c = this.type, d = { match: 0, extra: 0, i: this.type }, v = { match: 0, i: null };
          this.validators.forEach(function(D, U) {
            var G = null;
            i.anyOf !== void 0 && i.anyOf && (G = D.fitTest(e), (d.match < G.match || d.match === G.match && d.extra > G.extra) && ((d = G).i = U)), D.validate(e).length || v.i !== null ? d = v : (v.i = U, G !== null && (v.match = G.match));
          });
          var x = v.i;
          this.anyOf !== void 0 && this.anyOf && v.match < d.match && (x = d.i), this.if && (x = this.getIfType(e)), x === null && (x = this.type), this.type = x, this.switcher.value = this.display_text[x];
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
                var v = "".concat(t.path, ".").concat(i, "[").concat(d, "]");
                c.showValidationErrors(e.reduce(function(x, S) {
                  if (S.path.startsWith(v) || S.path === v.substr(0, S.path.length)) {
                    var D = w({}, S);
                    S.path.startsWith(v) && (D.path = t.path + D.path.substr(v.length)), x.push(D);
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
      }(V);
      function Xn(o) {
        return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Xn(o);
      }
      function Ih(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Bh(l.key), l);
        }
      }
      function Bh(o) {
        var r = function(n, l) {
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
      function Nh(o, r, n) {
        return r = bo(r), function(l, e) {
          if (e && (Xn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Il() ? Reflect.construct(r, n || [], bo(o).constructor) : r.apply(o, n));
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
      function bo(o) {
        return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bo(o);
      }
      function Ps(o, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ps(o, r);
      }
      var Dh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Nh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ps(e, t);
        }(r, o), n = r, (l = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && Ih(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(V);
      function Bl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(o);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function ei(o) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? Bl(Object(n), !0).forEach(function(l) {
            vo(o, l, n[l]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : Bl(Object(n)).forEach(function(l) {
            Object.defineProperty(o, l, Object.getOwnPropertyDescriptor(n, l));
          });
        }
        return o;
      }
      function vo(o, r, n) {
        return (r = Dl(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function ti(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, d, v = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (v.push(t.value), v.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return v;
          }
        }(o, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return Nl(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Nl(n, l) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Nl(o, r) {
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
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Dl(l.key), l);
        }
      }
      function Dl(o) {
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
        }(o, Fl() ? Reflect.construct(r, n || [], Rt(o).constructor) : r.apply(o, n));
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
      function Ts(o, r) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ts(o, r);
      }
      var Ml = function(o) {
        function r(e, t, i) {
          var c;
          return function(d, v) {
            if (!(d instanceof v)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (c = Mh(this, r, [e, t])).currentDepth = i, c;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ts(e, t);
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
            var d, v = this.format === "categories", x = [], S = null, D = null;
            if (this.format === "grid-strict") {
              var U = 0;
              if (d = [], this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ke = ve.options.hidden ? 0 : ve.options.grid_offset || 0, it = !ve.options.hidden && (ve.options.grid_break || !1), xt = { key: He, width: xe, offset: Ke, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  d.push(xt), x[U] = d, it && (U++, d = []);
                }
              }), this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), c.appendChild(d), t = 0; t < x[e].length; t++) S = x[e][t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e][t].width, x[e][t].offset), d.appendChild(D.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  for (var xe = !1, Ke = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), it = ve.options.hidden ? 0 : ve.container.offsetHeight, xt = 0; xt < x.length; xt++) x[xt].width + Ke <= 12 && (!it || 0.5 * x[xt].minh < it && 2 * x[xt].maxh > it) && (xe = xt);
                  xe === !1 && (x.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), xe = x.length - 1), x[xe].editors.push({ key: He, width: Ke, height: it }), x[xe].width += Ke, x[xe].minh = Math.min(x[xe].minh, it), x[xe].maxh = Math.max(x[xe].maxh, it);
                }
              }), e = 0; e < x.length; e++) if (x[e].width < 12) {
                var G = !1, ee = 0;
                for (t = 0; t < x[e].editors.length; t++) (G === !1 || x[e].editors[t].width > x[e].editors[G].width) && (G = t), x[e].editors[t].width *= 12 / x[e].width, x[e].editors[t].width = Math.floor(x[e].editors[t].width), ee += x[e].editors[t].width;
                ee < 12 && (x[e].editors[G].width += 12 - ee), x[e].width = 12;
              }
              if (this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), c.appendChild(d), t = 0; t < x[e].editors.length; t++) S = x[e].editors[t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e].editors[t].width), d.appendChild(D.container);
            } else {
              if (c = document.createElement("div"), v) {
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
          i = w({}, i);
          var c = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(d) {
            new RegExp(d).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[d]), c = !0);
          }), !c && this.schema.additionalProperties && jr(this.schema.additionalProperties) === "object" && (i = w({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (ir(Rt(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = ti(t, 2), c = i[0], d = i[1], v = e.jsoneditor.getEditorClass(d);
            e.editors[c] = e.jsoneditor.createEditor(v, { jsoneditor: e.jsoneditor, schema: d, path: "".concat(e.path, ".").concat(c), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[c].preBuild();
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
            var d = ti(c, 2), v = d[0], x = d[1], S = e.theme.getTableCell();
            e.editor_holder.appendChild(S), x.setContainer(S), x.build(), x.postBuild(), x.setOptInCheckbox(x.header), x.setValue(x.getDefault(), !0), e.editors[v].options.hidden && (S.style.display = "none"), e.editors[v].options.input_width && (S.style.width = e.editors[v].options.input_width);
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
                var d = e.editors[e.addproperty_input.value].key, v = e.editors[e.addproperty_input.value].type, x = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: d, type: v, path: x } });
              }
            }), this.addproperty_input.addEventListener("input", function(c) {
              c.target.previousSibling.previousSibling.childNodes.forEach(function(d) {
                var v = d.innerText, x = c.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (v = v.toLowerCase(), x = x.toLowerCase()), v.includes(x) ? d.style.display = "" : d.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(c) {
              var d = e.theme.getTabContent(), v = e.theme.getGridColumn(), x = !(!c.schema || c.schema.type !== "object" && c.schema.type !== "array");
              if (d.isObjOrArray = x, t) {
                if (x) {
                  var S = e.theme.getGridContainer();
                  S.appendChild(v), d.appendChild(S), e.tabPanesContainer.appendChild(d), e.row_container = S;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), d.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(d) : e.tabPanesContainer.insertBefore(d, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(v);
                e.addRow(c, e.tabs_holder, d), d.id = e.getValidId(c.schema.title);
              } else e.row_container.appendChild(v);
              c.setContainer(v), c.build(), c.postBuild(), c.setOptInCheckbox(c.header);
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
          var t = this, i = this.jsoneditor.options.show_opt_in, c = this.options.show_opt_in !== void 0, d = c && this.options.show_opt_in === !0, v = c && this.options.show_opt_in === !1;
          (d || !v && i || !c && i) && Object.entries(this.editors).forEach(function(x) {
            var S = ti(x, 2), D = S[0], U = S[1];
            t.isRequiredObject(U) || t.editors[D].deactivate(), e && typeof t.editors[D].deactivateNonRequiredProperties == "function" && t.editors[D].deactivateNonRequiredProperties(e);
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
            var v = i.childNodes[d];
            if (t.propertyOrder < v.propertyOrder) {
              this.addproperty_list.insertBefore(t, v), t = null;
              break;
            }
          }
          t && this.addproperty_list.appendChild(t);
        } }, { key: "addPropertyCheckbox", value: function(e) {
          var t, i = this, c = this.theme.getCheckbox();
          t = this.schema.properties[e] && this.schema.properties[e].title ? this.schema.properties[e].title : e;
          var d = this.theme.getCheckboxLabel(t), v = this.theme.getFormControl(d, c, null, null, this.path + "-" + e);
          return v.style.paddingBottom = v.style.marginBottom = v.style.paddingTop = v.style.marginTop = 0, v.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(e, v, this.addproperty_list), c.checked = e in this.editors, c.addEventListener("change", function() {
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
                return ei(ei({}, t), {}, vo({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return ei(ei({}, t), {}, vo({}, i, !0));
              default:
                return ei(ei({}, t), {}, vo({}, i, e[i]));
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
                var v = this.theme.getChildEditorHolder();
                this.editor_holder.appendChild(v), this.editors[e].setContainer(v), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].setOptInCheckbox(c.header), this.editors[e].activate();
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
              var v = ti(d, 2), x = (v[0], v[1]);
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
            var d = ti(c, 2), v = d[0], x = d[1];
            e[v] !== void 0 ? (i.addObjectProperty(v), x.setValue(e[v], t), x.activate(), i.disabled && x.disable()) : t || i.isRequiredObject(x) ? x.setValue(x.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? x.deactivate() : i.removeObjectProperty(v);
          }), Object.entries(e).forEach(function(c) {
            var d = ti(c, 2), v = d[0], x = d[1];
            i.cached_editors[v] || (i.addObjectProperty(v), i.editors[v] && i.editors[v].setValue(x, t, !!i.editors[v].template));
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
      }(V);
      function ri(o) {
        return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ri(o);
      }
      function Hh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Vh(l.key), l);
        }
      }
      function Vh(o) {
        var r = function(n, l) {
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
      function zh(o, r, n) {
        return r = kr(r), function(l, e) {
          if (e && (ri(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Hl() ? Reflect.construct(r, n || [], kr(o).constructor) : r.apply(o, n));
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
      function ni() {
        return ni = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = kr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ni.apply(this, arguments);
      }
      function kr(o) {
        return kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, kr(o);
      }
      function Ls(o, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ls(o, r);
      }
      Ml.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var qh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ls(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          ni(kr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          var e = this;
          this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
          for (var t = function(D) {
            e.setValue(D.currentTarget.value), e.onChange(!0), e.radioGroup.forEach(function(U) {
              U.checked = U.value === e.getValue();
            });
          }, i = 0; i < this.enum_values.length; i++) {
            var c = { id: "".concat(this.formname, "[").concat(i, "]"), value: this.enum_values[i] };
            this.jsoneditor.options.use_name_attributes && (c.name = this.formname), this.input = this.theme.getFormRadio(c), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", t, !1), this.radioGroup.push(this.input);
            var d = this.theme.getFormRadioLabel(this.enum_display[i]);
            d.htmlFor = this.input.id;
            var v = this.theme.getFormRadioControl(d, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
            this.radioContainer.appendChild(v);
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
            this.radioContainer.classList.remove("readonly"), ni(kr(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.radioContainer.classList.add("readonly"), ni(kr(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), ni(kr(r.prototype), "destroy", this).call(this);
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
      function ii(o) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ii(o);
      }
      function $h(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Uh(l.key), l);
        }
      }
      function Uh(o) {
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
      function Gh(o, r, n) {
        return r = Jt(r), function(l, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Vl() ? Reflect.construct(r, n || [], Jt(o).constructor) : r.apply(o, n));
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
      function As(o, r) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, As(o, r);
      }
      var Wh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && As(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Yr(Jt(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.sceditor_instance && this.sceditor_instance.val(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Yr(Jt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.sceditor) {
            var t = this.expandCallbacks("sceditor", w({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
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
        } }]) && $h(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe);
      function oi(o) {
        return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, oi(o);
      }
      function Jh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Kh(l.key), l);
        }
      }
      function Kh(o) {
        var r = function(n, l) {
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
      function Zh(o, r, n) {
        return r = or(r), function(l, e) {
          if (e && (oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, zl() ? Reflect.construct(r, n || [], or(o).constructor) : r.apply(o, n));
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
      function Rs(o, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Rs(o, r);
      }
      var Yh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rs(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else mn(or(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", w({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
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
      function si(o) {
        return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, si(o);
      }
      function Qh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Xh(l.key), l);
        }
      }
      function Xh(o) {
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
      function ep(o, r, n) {
        return r = Kt(r), function(l, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ql() ? Reflect.construct(r, n || [], Kt(o).constructor) : r.apply(o, n));
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
      function Is(o, r) {
        return Is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Is(o, r);
      }
      var tp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ep(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Is(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.selectize_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else Qr(Kt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var t = this.expandCallbacks("selectize", w({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
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
      function ai(o) {
        return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ai(o);
      }
      function rp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, np(l.key), l);
        }
      }
      function np(o) {
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
      function ip(o, r, n) {
        return r = go(r), function(l, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, $l() ? Reflect.construct(r, n || [], go(o).constructor) : r.apply(o, n));
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
      function go(o) {
        return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, go(o);
      }
      function Bs(o, r) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Bs(o, r);
      }
      var op = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ip(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Bs(e, t);
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
            var d = document.createElement("div"), v = document.createElement("button");
            v.classList.add("tiny", "button"), v.innerHTML = "Clear signature", d.appendChild(v), i.appendChild(d), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(S) {
              c.setAttribute("readOnly", "readOnly"), S.disabled = !0;
            })), v.addEventListener("click", function(S) {
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
      function li(o) {
        return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, li(o);
      }
      function sp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, ap(l.key), l);
        }
      }
      function ap(o) {
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
      function lp(o, r, n) {
        return r = Zt(r), function(l, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ul() ? Reflect.construct(r, n || [], Zt(o).constructor) : r.apply(o, n));
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
      function Ns(o, r) {
        return Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ns(o, r);
      }
      m(6031);
      var cp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ns(e, t);
        }(r, o), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Xr(Zt(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.simplemde_instance && this.simplemde_instance.value(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Xr(Zt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.SimpleMDE ? (e = this.expandCallbacks("simplemde", w({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
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
      function ci(o) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(o);
      }
      function up(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, dp(l.key), l);
        }
      }
      function dp(o) {
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
      function hp(o, r, n) {
        return r = bn(r), function(l, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Gl() ? Reflect.construct(r, n || [], bn(o).constructor) : r.apply(o, n));
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
      function Ds(o, r) {
        return Ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ds(o, r);
      }
      var Wl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ds(e, t);
        }(r, o), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var t = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && t--, this.enum_values = [];
            for (var i = 0; i < t; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var c = function(ee) {
            ee.preventDefault(), ee.stopPropagation(), e.setValue(ee.currentTarget.value), e.onChange(!0);
          }, d = this.enum_values.length - 1; d > -1; d--) {
            var v = this.formname + (d + 1), x = this.theme.getFormInputField("radio");
            x.name = "".concat(this.formname, "[starrating]"), x.value = this.enum_values[d], x.id = v, x.addEventListener("change", c, !1), this.radioGroup.push(x);
            var S = document.createElement("label");
            S.htmlFor = v, S.title = this.enum_values[d], this.options.displayValue && S.classList.add("starrating-display-enabled");
            var D = this.theme.getHiddenText("label");
            D.textContent = d, S.appendChild(D), this.ratingContainer.appendChild(x), this.ratingContainer.appendChild(S);
          }
          if (this.options.displayValue && (this.displayRating = document.createElement("div"), this.displayRating.classList.add("starrating-display"), this.displayRating.innerText = this.enum_values[0], this.ratingContainer.appendChild(this.displayRating)), this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var U = 0; U < this.radioGroup.length; U++) this.radioGroup[U].disabled = !0;
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
      function ui(o) {
        return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ui(o);
      }
      function pp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, fp(l.key), l);
        }
      }
      function fp(o) {
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
      function yp(o, r, n) {
        return r = en(r), function(l, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Jl() ? Reflect.construct(r, n || [], en(o).constructor) : r.apply(o, n));
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
      function Fs(o, r) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Fs(o, r);
      }
      Wl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var mp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), yp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Fs(e, t);
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
      }(El);
      function di(o) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(o);
      }
      function bp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, vp(l.key), l);
        }
      }
      function vp(o) {
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
      function gp(o, r, n) {
        return r = sr(r), function(l, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Kl() ? Reflect.construct(r, n || [], sr(o).constructor) : r.apply(o, n));
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
      function Ms(o, r) {
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ms(o, r);
      }
      var _p = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ms(e, t);
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
          return w({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = w({}, this.schema.items), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.row_holder.appendChild(this.theme.getTableRow()), v = d;
          this.item_has_child_editors || (v = this.theme.getTableCell(), d.appendChild(v));
          var x = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: v, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
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
              var v = this.rows[d].container;
              this.item_has_child_editors || this.rows[d].row.parentNode.removeChild(this.rows[d].row), this.rows[d].destroy(), v.parentNode && v.parentNode.removeChild(v), this.rows[d] = null, c = !0;
            }
            this.rows = this.rows.slice(0, t.length), this.refreshValue(), (c || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var e = this, t = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, c = [];
          this.rows.forEach(function(U, G) {
            if (U.delete_button) {
              var ee = !t;
              e.setButtonState(U.delete_button, ee), c.push(ee);
            }
            if (U.copy_button) {
              var pe = !i;
              e.setButtonState(U.copy_button, pe), c.push(pe);
            }
            if (U.moveup_button) {
              var _e = G !== 0;
              e.setButtonState(U.moveup_button, _e), c.push(_e);
            }
            if (U.movedown_button) {
              var we = G !== e.rows.length - 1;
              e.setButtonState(U.movedown_button, we), c.push(we);
            }
          });
          var d = c.some(function(U) {
            return U;
          });
          this.rows.forEach(function(U) {
            return e.setButtonState(U.controls_cell, d);
          }), this.setButtonState(this.controls_header_cell, d), this.setButtonState(this.table, this.value.length);
          var v = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, v);
          var x = !(!this.value.length || t || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, x);
          var S = !(this.value.length <= 1 || t || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, S);
          var D = v || x || S;
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
            var v = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue(), S = i.getValue()[v];
            x.splice(v, 1), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("deleteRow", S);
          }), t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton("", "copy", "button_copy_row_title_short"), d = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(v) {
            v.preventDefault(), v.stopPropagation();
            var x = 1 * v.currentTarget.getAttribute("data-i"), S = i.getValue(), D = S[x];
            d.items.type === "string" && d.items.format === "uuid" ? D = L() : d.items.type === "object" && d.items.properties && S.forEach(function(U, G) {
              if (x === G) for (var ee = 0, pe = Object.keys(U); ee < pe.length; ee++) {
                var _e = pe[ee];
                d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && ((D = Object.assign({}, S[x]))[_e] = L());
              }
            }), S.splice(x + 1, 0, D), i.setValue(S), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[x + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var v = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(v - 1, 0, x.splice(v, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[v - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var v = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(v + 1, 0, x.splice(v, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[v + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          le(e, function(i, c) {
            var d = t.getValue(), v = d[i];
            d.splice(i, 1), d.splice(c, 0, v), t.setValue(d), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[c]);
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
      function hi(o) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(o);
      }
      function wp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, jp(l.key), l);
        }
      }
      function jp(o) {
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
      function kp(o, r, n) {
        return r = tn(r), function(l, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Zl() ? Reflect.construct(r, n || [], tn(o).constructor) : r.apply(o, n));
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
      function Hs(o, r) {
        return Hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Hs(o, r);
      }
      function pi(o) {
        return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pi(o);
      }
      function xp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Op(l.key), l);
        }
      }
      function Op(o) {
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
      function Cp(o, r, n) {
        return r = rn(r), function(l, e) {
          if (e && (pi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Yl() ? Reflect.construct(r, n || [], rn(o).constructor) : r.apply(o, n));
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
      function Vs(o, r) {
        return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Vs(o, r);
      }
      function fi(o) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(o);
      }
      function Ep(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Sp(l.key), l);
        }
      }
      function Sp(o) {
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
      function Pp(o, r, n) {
        return r = ar(r), function(l, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ql() ? Reflect.construct(r, n || [], ar(o).constructor) : r.apply(o, n));
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
      function zs(o, r) {
        return zs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, zs(o, r);
      }
      m(9868);
      var wo = { ace: tt, array: he, arrayChoices: un, arraySelect2: wd, arraySelectize: Od, autocomplete: Pd, base64: Rd, button: pl, checkbox: Hd, choices: bl, datetime: Zd, describedBy: eh, enum: ih, hidden: lh, info: hh, integer: El, ip: jh, jodit: Ch, multiple: Rh, multiselect: Ae, null: Dh, number: Ol, object: Ml, radio: qh, sceditor: Wh, select: Di, select2: Yh, selectize: tp, signature: op, simplemde: cp, starrating: Wl, stepper: mp, string: fe, table: _p, upload: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hs(e, t);
        }(r, o), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", w({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(c, d, v, x) {
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
                var v = new window.FileReader();
                v.onload = function(x) {
                  e.preview_value = x.target.result, e.refreshPreview(d), e.onChange(!0), v = null;
                }, v.readAsDataURL(d[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(c) {
              var d = c.dataTransfer.items || c.dataTransfer.files, v = d && d.length && (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)), x = c.currentTarget.classList && c.currentTarget.classList.contains("upload-dropzone") && v;
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
            var v = this.getButton("button_upload", "upload", "button_upload");
            v.addEventListener("click", function(x) {
              x.preventDefault(), v.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.options.upload_handler(t.path, i, { success: function(S) {
                t.setValue(S), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), v.removeAttribute("disabled");
              }, failure: function(S) {
                t.theme.addInputError(t.uploader, S), t.progressBar && t.preview.removeChild(t.progressBar), v.removeAttribute("disabled");
              }, updateProgress: function(S) {
                t.progressBar && (S ? t.theme.updateProgressBar(t.progressBar, S) : t.theme.updateProgressBarUnknown(t.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, v, this.preview_value)), this.options.auto_upload && (v.dispatchEvent(new window.MouseEvent("click")), v.parentNode.removeChild(v));
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
      }(V), uuid: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vs(e, t);
        }(r, o), n = r, (l = [{ key: "preBuild", value: function() {
          qi(rn(r.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          qi(rn(r.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.testUuid(e) || (e = this.uuid), e;
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e), this.testUuid(e) || (e = this.uuid), this.uuid = e, qi(rn(r.prototype), "setValue", this).call(this, e, t, i);
        } }, { key: "getUuid", value: function() {
          return L();
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
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zs(e, t);
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
              var i = this.expandCallbacks("colorpicker", w({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), c = function(d) {
                var v = t.picker_instance.settings.editorFormat, x = t.picker_instance.settings.alpha;
                t.setValue(v === "hex" ? x ? d.hex : d.hex.slice(0, 7) : d["".concat(v + (x ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = c) : i.onChange = c, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && Ep(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(fe) };
      function Xl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      var ec = {}, qs = "en", Tp = qs;
      ec.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(wo).forEach(function(o) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, c) {
            var d = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (d != null) {
              var v, x, S, D, U = [], G = !0, ee = !1;
              try {
                if (S = (d = d.call(i)).next, c !== 0) for (; !(G = (v = S.call(d)).done) && (U.push(v.value), U.length !== c); G = !0) ;
              } catch (pe) {
                ee = !0, x = pe;
              } finally {
                try {
                  if (!G && d.return != null && (D = d.return(), Object(D) !== D)) return;
                } finally {
                  if (ee) throw x;
                }
              }
              return U;
            }
          }(e, t) || function(i, c) {
            if (i) {
              if (typeof i == "string") return Xl(i, c);
              var d = Object.prototype.toString.call(i).slice(8, -1);
              return d === "Object" && i.constructor && (d = i.constructor.name), d === "Map" || d === "Set" ? Array.from(i) : d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? Xl(i, c) : void 0;
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
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: wo, languages: ec, resolvers: _, custom_validators: [], default_language: qs, language: Tp, translate: function(o, r, n) {
        var l = {};
        n && n.options && n.options.error_messages && n.options.error_messages[_n.language] && (l = n.options.error_messages[_n.language]);
        var e = _n.languages[_n.language];
        if (!e) throw new Error("Unknown language ".concat(_n.language));
        var t = l[o] || e[o] || _n.languages[qs][o] || o;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(o, r) {
        return o;
      } };
      function wn() {
        wn = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function($, q, J) {
          $[q] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function v($, q, J) {
          return Object.defineProperty($, q, { value: J, enumerable: !0, configurable: !0, writable: !0 }), $[q];
        }
        try {
          v({}, "");
        } catch {
          v = function(q, J, ge) {
            return q[J] = ge;
          };
        }
        function x($, q, J, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), Ue = new hr(ge || []);
          return e(Le, "_invoke", { value: xt($, J, Ue) }), Le;
        }
        function S($, q, J) {
          try {
            return { type: "normal", arg: $.call(q, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", U = "suspendedYield", G = "executing", ee = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        v(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ot([])));
        ve && ve !== n && l.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ke($) {
          ["next", "throw", "return"].forEach(function(q) {
            v($, q, function(J) {
              return this._invoke(q, J);
            });
          });
        }
        function it($, q) {
          function J(se, Le, Ue, ot) {
            var st = S($[se], $, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && bt(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Ct) {
                J("next", Ct, Ue, ot);
              }, function(Ct) {
                J("throw", Ct, Ue, ot);
              }) : q.resolve(Yt).then(function(Ct) {
                It.value = Ct, Ue(It);
              }, function(Ct) {
                return J("throw", Ct, Ue, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function Ue() {
              return new q(function(ot, st) {
                J(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then(Ue, Ue) : Ue();
          } });
        }
        function xt($, q, J) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === ee) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (J.method = se, J.arg = Le; ; ) {
              var Ue = J.delegate;
              if (Ue) {
                var ot = nn(Ue, J);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === D) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var st = S($, q, J);
              if (st.type === "normal") {
                if (ge = J.done ? ee : U, st.arg === pe) continue;
                return { value: st.arg, done: J.done };
              }
              st.type === "throw" && (ge = ee, J.method = "throw", J.arg = st.arg);
            }
          };
        }
        function nn($, q) {
          var J = q.method, ge = $.iterator[J];
          if (ge === o) return q.delegate = null, J === "throw" && $.iterator.return && (q.method = "return", q.arg = o, nn($, q), q.method === "throw") || J !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = S(ge, $.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[$.resultName] = Le.value, q.next = $.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function xi($) {
          var q = { tryLoc: $[0] };
          1 in $ && (q.catchLoc = $[1]), 2 in $ && (q.finallyLoc = $[2], q.afterLoc = $[3]), this.tryEntries.push(q);
        }
        function Ne($) {
          var q = $.completion || {};
          q.type = "normal", delete q.arg, $.completion = q;
        }
        function hr($) {
          this.tryEntries = [{ tryLoc: "root" }], $.forEach(xi, this), this.reset(!0);
        }
        function Ot($) {
          if ($ || $ === "") {
            var q = $[i];
            if (q) return q.call($);
            if (typeof $.next == "function") return $;
            if (!isNaN($.length)) {
              var J = -1, ge = function se() {
                for (; ++J < $.length; ) if (l.call($, J)) return se.value = $[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(bt($) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = v(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function($) {
          var q = typeof $ == "function" && $.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function($) {
          return Object.setPrototypeOf ? Object.setPrototypeOf($, Ie) : ($.__proto__ = Ie, v($, d, "GeneratorFunction")), $.prototype = Object.create(xe), $;
        }, r.awrap = function($) {
          return { __await: $ };
        }, Ke(it.prototype), v(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function($, q, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x($, q, J, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function(Ue) {
            return Ue.done ? Ue.value : Le.next();
          });
        }, Ke(xe), v(xe, d, "Generator"), v(xe, i, function() {
          return this;
        }), v(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function($) {
          var q = Object($), J = [];
          for (var ge in q) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ot, hr.prototype = { constructor: hr, reset: function($) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !$) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var $ = this.tryEntries[0].completion;
          if ($.type === "throw") throw $.arg;
          return this.rval;
        }, dispatchException: function($) {
          if (this.done) throw $;
          var q = this;
          function J(st, It) {
            return Le.type = "throw", Le.arg = $, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var Ue = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if (Ue && ot) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if (Ue) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function($, q) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && ($ === "break" || $ === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = $, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function($, q) {
          if ($.type === "throw") throw $.arg;
          return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && q && (this.next = q), pe;
        }, finish: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.finallyLoc === $) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.tryLoc === $) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function($, q, J) {
          return this.delegate = { iterator: Ot($), resultName: q, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function tc(o, r, n, l, e, t, i) {
        try {
          var c = o[t](i), d = c.value;
        } catch (v) {
          return void n(v);
        }
        c.done ? r(d) : Promise.resolve(d).then(l, e);
      }
      function rc(o) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(l, e) {
            var t = o.apply(r, n);
            function i(d) {
              tc(t, l, e, i, c, "next", d);
            }
            function c(d) {
              tc(t, l, e, i, c, "throw", d);
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
            var t, i, c, d, v = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (v.push(t.value), v.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (S) throw i;
              }
            }
            return v;
          }
        }(o, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return nc(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? nc(n, l) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function nc(o, r) {
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
      m(1688);
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
              var v = jn(d, 2), x = v[0], S = v[1];
              i.anyOf[x] = c.expandSchema(S);
            });
          }, dependencies: function(i) {
            var c = this;
            Object.entries(i.dependencies).forEach(function(d) {
              var v = jn(d, 2), x = v[0], S = v[1];
              bt(S) !== "object" || Array.isArray(S) || (i.dependencies[x] = c.expandSchema(S));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, c) {
            var d = this, v = w({}, c);
            return Object.entries(i.allOf).forEach(function(x) {
              var S = jn(x, 2), D = S[0], U = S[1];
              i.allOf[D] = d.expandRefs(U, !0), v = d.extendSchemas(v, d.expandSchema(U));
            }), delete v.allOf, v;
          }, extends: function(i, c) {
            var d, v = this;
            return delete (d = Array.isArray(i.extends) ? i.extends.reduce(function(x, S, D) {
              return v.extendSchemas(x, v.expandSchema(S));
            }, c) : this.extendSchemas(c, this.expandSchema(i.extends))).extends, d;
          }, oneOf: function(i, c) {
            var d = this, v = w({}, c);
            return delete v.oneOf, i.oneOf.reduce(function(x, S, D) {
              return x.oneOf[D] = d.extendSchemas(d.expandSchema(S), v), x;
            }, c), c;
          } };
        }, r = [{ key: "load", value: (l = rc(wn().mark(function e(t, i, c) {
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
          var i = this, c = w({}, e);
          if (!c.$ref) return c;
          var d = c.$ref.split("#");
          if (d.length === 2 && !this.refs_with_info[c.$ref]) {
            var v = this.expandRecursivePointer(this.schema, d[1]), x = this.extendSchemas(c, this.expandSchema(v));
            return delete x.$ref, x;
          }
          var S = d.length > 2 ? this.refs_with_info["#" + d[1]] : this.refs_with_info[c.$ref];
          delete c.$ref;
          var D = S.$ref.startsWith("#") ? S.fetchUrl : "", U = this._getRef(D, S);
          if (this.refs[U]) {
            if (t && k(this.refs[U], "allOf")) {
              var G = this.refs[U].allOf;
              Object.keys(G).forEach(function(ee) {
                G[ee] = i.expandRefs(G[ee], !0);
              });
            }
          } else console.warn("reference:'".concat(U, "' not found!"));
          return d.length > 2 ? this.extendSchemas(c, this.expandSchema(this.expandRecursivePointer(this.refs[U], d[2]))) : this.extendSchemas(c, this.expandSchema(this.refs[U]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(c) {
            i[c] && (i = i[c]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(c) {
            var d = jn(c, 2), v = d[0], x = d[1];
            e[v] && x.call(t, e);
          });
          var i = w({}, e);
          return Object.entries(this._subSchema2).forEach(function(c) {
            var d = jn(c, 2), v = d[0], x = d[1];
            e[v] && (i = x.call(t, e, i));
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
          var d = {}, v = function(G) {
            return Object.keys(G).forEach(function(ee) {
              d[ee] = !0;
            });
          };
          if (e.$ref && bt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !c)) {
            var x = e.$ref, S = "";
            x.indexOf("#") > 0 && (x = x.substr(0, x.indexOf("#"))), x !== e.$ref && (S = e.$ref.substr(e.$ref.indexOf("#")));
            var D = this.refs_prefix + this.refs_counter++, U = D + S;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (d[x] = !0), this.refs_with_info[D] = { fetchUrl: t, $ref: x }, e.$ref = U;
          }
          return Object.values(e).forEach(function(G) {
            G && bt(G) === "object" && (Array.isArray(G) ? Object.values(G).forEach(function(ee) {
              ee && bt(ee) === "object" && v(i._getExternalRefs(ee, t, c));
            }) : G.$ref && typeof G.$ref == "string" && G.$ref.startsWith("#") || v(i._getExternalRefs(G, t, c)));
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
        } }, { key: "_asyncloadExternalRefs", value: (n = rc(wn().mark(function e(t, i, c) {
          var d, v, x, S, D, U, G = this, ee = arguments;
          return wn().wrap(function(pe) {
            for (; ; ) switch (pe.prev = pe.next) {
              case 0:
                d = ee.length > 3 && ee[3] !== void 0 && ee[3], v = this._getExternalRefs(t, i, d), x = 0, S = wn().mark(function _e() {
                  var we, Ie, De, He, ve, xe, Ke, it, xt, nn, xi;
                  return wn().wrap(function(Ne) {
                    for (; ; ) switch (Ne.prev = Ne.next) {
                      case 0:
                        if ((we = U[D]) !== void 0) {
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
                          var Ot = new XMLHttpRequest();
                          G.options.ajaxCredentials && (Ot.withCredentials = G.options.ajaxCredentials), Ot.overrideMimeType("application/json"), Ot.open("GET", xe, !0), Ot.onload = function() {
                            hr(Ot);
                          }, Ot.onerror = function($) {
                            hr(void 0);
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
                        return G.refs[we] = Ke, nn = G._getFileBaseFromFileLocation(xe), xe !== we && (xi = xe.split("/"), xe = (we.substr(0, 1) === "/" ? "/" : "") + xi.pop()), Ne.next = 68, G._asyncloadExternalRefs(Ke, xe, nn);
                      case 68:
                      case "end":
                        return Ne.stop();
                    }
                  }, _e, null, [[14, 33], [18, 22], [51, 57]]);
                }), D = 0, U = Object.keys(v);
              case 5:
                if (!(D < U.length)) {
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
          e = w({}, e), t = w({}, t);
          var c = {}, d = function(v) {
            typeof v == "string" && (v = [v]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? c.type = v.filter(function(x) {
              return t.type.includes(x);
            }) : c.type = v, c.type.length === 1 && typeof c.type[0] == "string" ? c.type = c.type[0] : c.type.length === 0 && delete c.type;
          };
          return Object.entries(e).forEach(function(v) {
            var x = jn(v, 2), S = x[0], D = x[1];
            t[S] !== void 0 ? function(U, G) {
              (function(ee, pe) {
                return (ee === "required" || ee === "defaultProperties") && bt(pe) === "object" && Array.isArray(pe);
              })(U, G) ? c[U] = G.concat(t[U]).reduce(function(ee, pe) {
                return ee.includes(pe) || ee.push(pe), ee;
              }, []) : U !== "type" || typeof G != "string" && !Array.isArray(G) ? bt(G) !== "object" || Array.isArray(G) || G === null ? c[U] = G : c[U] = i.extendSchemas(G, t[U]) : d(G);
            }(S, D) : c[S] = D;
          }), Object.entries(t).forEach(function(v) {
            var x = jn(v, 2), S = x[0], D = x[1];
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
      }(), Ip = (m(2762), { default: function() {
        return { compile: function(o) {
          var r = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return o;
          };
          for (var l = [], e = function(i) {
            var c, d, v = r[i].replace(/[{}]+/g, "").trim().split("."), x = v.length;
            x > 1 ? c = function(S) {
              for (d = S, i = 0; i < x && (d = d[v[i]]); i++) ;
              return d;
            } : (v = v[0], c = function(S) {
              return S[v];
            }), l.push({ s: r[i], r: c });
          }, t = 0; t < n; t++) e(t);
          return function(i) {
            for (var c, d = "".concat(o), v = 0; v < n; v++) c = l[v], d = d.replace(c.s, c.r(i));
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
      function $i(o) {
        return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $i(o);
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
              var v = Object.prototype.toString.call(c).slice(8, -1);
              return v === "Object" && c.constructor && (v = c.constructor.name), v === "Map" || v === "Set" ? Array.from(c) : v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v) ? $s(c, d) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && Bp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function Us(o) {
        return Us = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Us(o);
      }
      function Fp(o, r, n) {
        return r = jo(r), function(l, e) {
          if (e && (Us(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ic() ? Reflect.construct(r, n || [], jo(o).constructor) : r.apply(o, n));
      }
      function ic() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ic = function() {
          return !!o;
        })();
      }
      function jo(o) {
        return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jo(o);
      }
      function Gs(o, r) {
        return Gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Gs(o, r);
      }
      var Mp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Hp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Fp(this, r, ["glyphicon glyphicon-", Mp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Gs(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Ws(o) {
        return Ws = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ws(o);
      }
      function Vp(o, r, n) {
        return r = ko(r), function(l, e) {
          if (e && (Ws(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, oc() ? Reflect.construct(r, n || [], ko(o).constructor) : r.apply(o, n));
      }
      function oc() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (oc = function() {
          return !!o;
        })();
      }
      function ko(o) {
        return ko = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ko(o);
      }
      function Js(o, r) {
        return Js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Js(o, r);
      }
      var zp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, qp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Vp(this, r, ["icon-", zp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Js(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Ks(o) {
        return Ks = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ks(o);
      }
      function $p(o, r, n) {
        return r = xo(r), function(l, e) {
          if (e && (Ks(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, sc() ? Reflect.construct(r, n || [], xo(o).constructor) : r.apply(o, n));
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
      function xo(o) {
        return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, xo(o);
      }
      function Zs(o, r) {
        return Zs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Zs(o, r);
      }
      var Up = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Gp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), $p(this, r, ["fa fa-", Up]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Zs(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Ys(o) {
        return Ys = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ys(o);
      }
      function Wp(o, r, n) {
        return r = Oo(r), function(l, e) {
          if (e && (Ys(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, ac() ? Reflect.construct(r, n || [], Oo(o).constructor) : r.apply(o, n));
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
      function Oo(o) {
        return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Oo(o);
      }
      function Qs(o, r) {
        return Qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Qs(o, r);
      }
      var Jp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, Kp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wp(this, r, ["fas fa-", Jp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Qs(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Xs(o) {
        return Xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Xs(o);
      }
      function Zp(o, r, n) {
        return r = Co(r), function(l, e) {
          if (e && (Xs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, lc() ? Reflect.construct(r, n || [], Co(o).constructor) : r.apply(o, n));
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
      function Co(o) {
        return Co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Co(o);
      }
      function ea(o, r) {
        return ea = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ea(o, r);
      }
      var Yp = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, Qp = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zp(this, r, ["ui-icon ui-icon-", Yp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && ea(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ta(o) {
        return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ta(o);
      }
      function Xp(o, r, n) {
        return r = Eo(r), function(l, e) {
          if (e && (ta(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, cc() ? Reflect.construct(r, n || [], Eo(o).constructor) : r.apply(o, n));
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
      function Eo(o) {
        return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Eo(o);
      }
      function ra(o, r) {
        return ra = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ra(o, r);
      }
      var ef = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, tf = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Xp(this, r, ["oi oi-", ef]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && ra(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function na(o) {
        return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, na(o);
      }
      function rf(o, r, n) {
        return r = So(r), function(l, e) {
          if (e && (na(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, uc() ? Reflect.construct(r, n || [], So(o).constructor) : r.apply(o, n));
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
      function So(o) {
        return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, So(o);
      }
      function ia(o, r) {
        return ia = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ia(o, r);
      }
      var nf = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, of = function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), rf(this, r, ["icon icon-", nf]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && ia(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function oa(o) {
        return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, oa(o);
      }
      function sf(o, r, n) {
        return r = Po(r), function(l, e) {
          if (e && (oa(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, dc() ? Reflect.construct(r, n || [], Po(o).constructor) : r.apply(o, n));
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
      function Po(o) {
        return Po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Po(o);
      }
      function sa(o, r) {
        return sa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, sa(o, r);
      }
      var af = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, lf = { bootstrap: function(o) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), sf(this, r, ["bi bi-", af]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && sa(l, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr), bootstrap3: Hp, fontawesome3: qp, fontawesome4: Gp, fontawesome5: Kp, jqueryui: Qp, openiconic: tf, spectre: of };
      function Ui(o) {
        return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ui(o);
      }
      function cf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, uf(l.key), l);
        }
      }
      function uf(o) {
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
      var hc = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
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
            var v = document.createElement("option");
            v.setAttribute("value", l[d]), v.textContent = e[d] || l[d], n.appendChild(v);
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
          var i = function(v, x) {
            v.value = Number(x || v.value), v.setAttribute("initialized", "1");
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
            if (!n[hc]) return !1;
            if (n[hc](l)) return n;
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
      function yi(o) {
        return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yi(o);
      }
      function df(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, hf(l.key), l);
        }
      }
      function hf(o) {
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
      function pf(o, r, n) {
        return r = lr(r), function(l, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, pc() ? Reflect.construct(r, n || [], lr(o).constructor) : r.apply(o, n));
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
      function aa(o, r) {
        return aa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, aa(o, r);
      }
      var fc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), pf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && aa(e, t);
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
      function mi(o) {
        return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mi(o);
      }
      function ff(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, yf(l.key), l);
        }
      }
      function yf(o) {
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
      function mf(o, r, n) {
        return r = cr(r), function(l, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, yc() ? Reflect.construct(r, n || [], cr(o).constructor) : r.apply(o, n));
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
      function la(o, r) {
        return la = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, la(o, r);
      }
      fc.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var mc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && la(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider");
          var v = document.createElement("span");
          return v.classList.add("sr-only"), v.textContent = e + "-opt-in", i.appendChild(v), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
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
          var v = document.createElement("div");
          return !e || t.type !== "checkbox" && t.type !== "radio" ? (v.classList.add("form-group"), e && (e.classList.add("control-label"), v.appendChild(e), c && e.appendChild(c)), v.appendChild(t)) : (v.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), v.appendChild(e)), i && v.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), v;
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
      function bi(o) {
        return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bi(o);
      }
      function bf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, vf(l.key), l);
        }
      }
      function vf(o) {
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
      function gf(o, r, n) {
        return r = ur(r), function(l, e) {
          if (e && (bi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, bc() ? Reflect.construct(r, n || [], ur(o).constructor) : r.apply(o, n));
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
      function ca(o, r) {
        return ca = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ca(o, r);
      }
      mc.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var _f = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, vc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gf(this, r, [e, _f]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ca(e, t);
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
          var v = document.createElement("span");
          return v.classList.add("sr-only"), v.textContent = e + "-opt-in", d.appendChild(v), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
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
          var v = On(ur(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return this.options.custom_forms === !0 && (v.classList.remove("form-control"), v.classList.add("custom-range")), v;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), c = document.createElement("div"), d = document.createElement("button");
          d.setAttribute("type", "button");
          var v = document.createElement("button");
          v.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), i.appendChild(d), c.appendChild(v), t.classList.add("input-group"), i.classList.add("input-group-prepend"), c.classList.add("input-group-append"), d.classList.add("btn"), d.classList.add("btn-secondary"), d.classList.add("stepper-down"), v.classList.add("btn"), v.classList.add("btn-secondary"), v.classList.add("stepper-up"), e.getAttribute("readonly") && (d.setAttribute("disabled", !0), v.setAttribute("disabled", !0)), d.textContent = "-", v.textContent = "+";
          var x = function(U, G) {
            U.value = Number(G || U.value), U.setAttribute("initialized", "1");
          }, S = e.getAttribute("min"), D = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), d.addEventListener("click", function() {
            e.getAttribute("initialized") ? S ? Number(e.value) > Number(S) && e.stepDown() : e.stepDown() : x(e, S), j(e, "change");
          }), v.addEventListener("click", function() {
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
          var v = document.createElement("div");
          if (v.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (v.appendChild(e), c && v.appendChild(c)), v.appendChild(t);
          else {
            var x = document.createElement("div");
            this.options.custom_forms === !1 ? (x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (x.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? x.classList.add("custom-checkbox") : x.classList.add("custom-radio")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), v.appendChild(x);
          }
          return i && v.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), v;
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
          var v = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            v.appendChild(S);
          }), d.appendChild(v), i && d.appendChild(i), d;
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
      function vi(o) {
        return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vi(o);
      }
      function wf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, jf(l.key), l);
        }
      }
      function jf(o) {
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
      function kf(o, r, n) {
        return r = dr(r), function(l, e) {
          if (e && (vi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, gc() ? Reflect.construct(r, n || [], dr(o).constructor) : r.apply(o, n));
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
      function ua(o, r) {
        return ua = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ua(o, r);
      }
      vc.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var xf = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, _c = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kf(this, r, [e, xf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ua(e, t);
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
          var v = document.createElement("span");
          return v.classList.add("visually-hidden"), v.textContent = e + "-opt-in", d.appendChild(v), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
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
          var v = Cn(dr(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return v.classList.remove("form-control"), v.classList.add("form-range"), v;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var c = document.createElement("button");
          c.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), c.classList.add("btn"), c.classList.add("btn-secondary"), c.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), c.setAttribute("disabled", !0)), i.textContent = "-", c.textContent = "+";
          var d = function(S, D) {
            S.value = Number(D || S.value), S.setAttribute("initialized", "1");
          }, v = e.getAttribute("min"), x = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? v ? Number(e.value) > Number(v) && e.stepDown() : e.stepDown() : d(e, v), j(e, "change");
          }), c.addEventListener("click", function() {
            e.getAttribute("initialized") ? x ? Number(e.value) < Number(x) && e.stepUp() : e.stepUp() : d(e, v), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = Cn(dr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, d) {
          var v = document.createElement("div");
          if (v.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), v.appendChild(e), c && v.appendChild(c)), v.appendChild(t);
          else {
            var x = document.createElement("div");
            x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), v.appendChild(x);
          }
          return i && v.appendChild(i), v;
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
          var v = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            v.appendChild(S);
          }), d.appendChild(v), i && d.appendChild(i), d;
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
      function gi(o) {
        return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, gi(o);
      }
      function Of(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Cf(l.key), l);
        }
      }
      function Cf(o) {
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
      function Ef(o, r, n) {
        return r = Cr(r), function(l, e) {
          if (e && (gi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, wc() ? Reflect.construct(r, n || [], Cr(o).constructor) : r.apply(o, n));
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
      function _i() {
        return _i = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Cr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _i.apply(this, arguments);
      }
      function Cr(o) {
        return Cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Cr(o);
      }
      function da(o, r) {
        return da = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, da(o, r);
      }
      _c.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var jc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ef(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && da(e, t);
        }(r, o), n = r, (l = [{ key: "getTable", value: function() {
          var e = _i(Cr(r.prototype), "getTable", this).call(this);
          return e.setAttribute("cellpadding", 5), e.setAttribute("cellspacing", 0), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = _i(Cr(r.prototype), "getTableHeaderCell", this).call(this, e);
          return t.classList.add("ui-state-active"), t.style.fontWeight = "bold", t;
        } }, { key: "getTableCell", value: function() {
          var e = _i(Cr(r.prototype), "getTableCell", this).call(this);
          return e.classList.add("ui-widget-content"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e.style.fontSize = ".6em", e.style.display = "inline-block", e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = this.getDescription(e);
          return t.style.marginLeft = "10px", t.style.display = "inline-block", t;
        } }, { key: "getFormControl", value: function(e, t, i, c) {
          var d = _i(Cr(r.prototype), "getFormControl", this).call(this, e, t, i, c);
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
      function wi(o) {
        return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, wi(o);
      }
      function Sf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Pf(l.key), l);
        }
      }
      function Pf(o) {
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
      function Tf(o, r, n) {
        return r = To(r), function(l, e) {
          if (e && (wi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, kc() ? Reflect.construct(r, n || [], To(o).constructor) : r.apply(o, n));
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
      function To(o) {
        return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, To(o);
      }
      function ha(o, r) {
        return ha = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ha(o, r);
      }
      jc.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var xc = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Tf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ha(e, t);
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
      function ji(o) {
        return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ji(o);
      }
      function Lf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Af(l.key), l);
        }
      }
      function Af(o) {
        var r = function(n, l) {
          if (ji(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ji(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return ji(r) == "symbol" ? r : r + "";
      }
      function Rf(o, r, n) {
        return r = pt(r), function(l, e) {
          if (e && (ji(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Oc() ? Reflect.construct(r, n || [], pt(o).constructor) : r.apply(o, n));
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
      function pa(o, r) {
        return pa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, pa(o, r);
      }
      xc.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var If = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, Cc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rf(this, r, [e, If]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && pa(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("i");
          d.classList.add("form-icon");
          var v = document.createElement("span");
          return v.classList.add("sr-only"), v.textContent = e + "-opt-in", i.appendChild(v), i.appendChild(c), i.appendChild(d), t.appendChild(i), { label: i, checkbox: c, container: t };
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
          var v = vt(pt(r.prototype), "getRangeInput", this).call(this, e, t, i, c, d);
          return v.classList.add("slider"), v.classList.remove("form-input"), v.setAttribute("oninput", 'this.setAttribute("value", this.value)'), v;
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
          var v = document.createElement("div");
          return v.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio" ? (e && (e.classList.add("form-label"), v.appendChild(e), c && e.appendChild(c)), v.appendChild(t)) : (v.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), v.appendChild(e)), this.options.input_size === "small" ? t.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && t.classList.add("input-lg", "select-lg"), t.type !== "checkbox" && v.appendChild(t), i && v.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), v;
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
          var v = document.createElement("div");
          v.classList.add("card"), d.appendChild(v);
          var x = document.createElement("div");
          return x.classList.add("card-body"), x.innerHTML = e, v.appendChild(x), t;
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
      function ki(o) {
        return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ki(o);
      }
      function Bf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(o, Nf(l.key), l);
        }
      }
      function Nf(o) {
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
      function Df(o, r, n) {
        return r = mt(r), function(l, e) {
          if (e && (ki(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(o, Ec() ? Reflect.construct(r, n || [], mt(o).constructor) : r.apply(o, n));
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
      function fa(o, r) {
        return fa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fa(o, r);
      }
      Cc.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Ff = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, Sc = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Df(this, r, [e, Ff]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fa(e, t);
        }(r, o), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var d = document.createElement("span");
          d.classList.add("switch-slider", "round");
          var v = document.createElement("span");
          return v.classList.add("sr-only"), v.textContent = e + "-opt-in", i.appendChild(v), i.appendChild(c), i.appendChild(d), { label: t, checkbox: c, container: i };
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
          var v = _t(mt(r.prototype), "getRadioHolder", this).call(this, t, i, c, d);
          return e.options.layout === "h" ? v.classList.add("inline-flex", "flex-row") : v.classList.add("inline-flex", "flex-col"), v;
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
          var v = document.createElement("div");
          return v.classList.add("form-group", "mb-1", "w-full"), e && (e.classList.add("text-xs"), t.type === "checkbox" && (t.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormCheckboxControl(e, t, !1, c)), t.type === "radio" && (t.classList.add("form-radio", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormRadioControl(e, t, !1, c)), v.appendChild(e), !["checkbox", "radio"].includes(t.type) && c && v.appendChild(c)), ["checkbox", "radio"].includes(t.type) || (this.options.input_size === "small" ? t.classList.add("text-xs") : this.options.input_size === "normal" ? t.classList.add("text-base") : this.options.input_size === "large" && t.classList.add("text-xl"), v.appendChild(t)), i && v.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), v;
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
      Sc.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Mf = { html: fc, bootstrap3: mc, bootstrap4: vc, bootstrap5: _c, jqueryui: jc, barebones: xc, spectre: Cc, tailwind: Sc };
      const Hf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function En(o) {
        return En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, En(o);
      }
      function ya(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = o[n];
        return l;
      }
      function ma() {
        ma = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function($, q, J) {
          $[q] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function v($, q, J) {
          return Object.defineProperty($, q, { value: J, enumerable: !0, configurable: !0, writable: !0 }), $[q];
        }
        try {
          v({}, "");
        } catch {
          v = function(q, J, ge) {
            return q[J] = ge;
          };
        }
        function x($, q, J, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), Ue = new hr(ge || []);
          return e(Le, "_invoke", { value: xt($, J, Ue) }), Le;
        }
        function S($, q, J) {
          try {
            return { type: "normal", arg: $.call(q, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", U = "suspendedYield", G = "executing", ee = "completed", pe = {};
        function _e() {
        }
        function we() {
        }
        function Ie() {
        }
        var De = {};
        v(De, i, function() {
          return this;
        });
        var He = Object.getPrototypeOf, ve = He && He(He(Ot([])));
        ve && ve !== n && l.call(ve, i) && (De = ve);
        var xe = Ie.prototype = _e.prototype = Object.create(De);
        function Ke($) {
          ["next", "throw", "return"].forEach(function(q) {
            v($, q, function(J) {
              return this._invoke(q, J);
            });
          });
        }
        function it($, q) {
          function J(se, Le, Ue, ot) {
            var st = S($[se], $, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && En(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Ct) {
                J("next", Ct, Ue, ot);
              }, function(Ct) {
                J("throw", Ct, Ue, ot);
              }) : q.resolve(Yt).then(function(Ct) {
                It.value = Ct, Ue(It);
              }, function(Ct) {
                return J("throw", Ct, Ue, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function Ue() {
              return new q(function(ot, st) {
                J(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then(Ue, Ue) : Ue();
          } });
        }
        function xt($, q, J) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === ee) {
              if (se === "throw") throw Le;
              return { value: o, done: !0 };
            }
            for (J.method = se, J.arg = Le; ; ) {
              var Ue = J.delegate;
              if (Ue) {
                var ot = nn(Ue, J);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === D) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var st = S($, q, J);
              if (st.type === "normal") {
                if (ge = J.done ? ee : U, st.arg === pe) continue;
                return { value: st.arg, done: J.done };
              }
              st.type === "throw" && (ge = ee, J.method = "throw", J.arg = st.arg);
            }
          };
        }
        function nn($, q) {
          var J = q.method, ge = $.iterator[J];
          if (ge === o) return q.delegate = null, J === "throw" && $.iterator.return && (q.method = "return", q.arg = o, nn($, q), q.method === "throw") || J !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = S(ge, $.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[$.resultName] = Le.value, q.next = $.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function xi($) {
          var q = { tryLoc: $[0] };
          1 in $ && (q.catchLoc = $[1]), 2 in $ && (q.finallyLoc = $[2], q.afterLoc = $[3]), this.tryEntries.push(q);
        }
        function Ne($) {
          var q = $.completion || {};
          q.type = "normal", delete q.arg, $.completion = q;
        }
        function hr($) {
          this.tryEntries = [{ tryLoc: "root" }], $.forEach(xi, this), this.reset(!0);
        }
        function Ot($) {
          if ($ || $ === "") {
            var q = $[i];
            if (q) return q.call($);
            if (typeof $.next == "function") return $;
            if (!isNaN($.length)) {
              var J = -1, ge = function se() {
                for (; ++J < $.length; ) if (l.call($, J)) return se.value = $[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(En($) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = v(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function($) {
          var q = typeof $ == "function" && $.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function($) {
          return Object.setPrototypeOf ? Object.setPrototypeOf($, Ie) : ($.__proto__ = Ie, v($, d, "GeneratorFunction")), $.prototype = Object.create(xe), $;
        }, r.awrap = function($) {
          return { __await: $ };
        }, Ke(it.prototype), v(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function($, q, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x($, q, J, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function(Ue) {
            return Ue.done ? Ue.value : Le.next();
          });
        }, Ke(xe), v(xe, d, "Generator"), v(xe, i, function() {
          return this;
        }), v(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function($) {
          var q = Object($), J = [];
          for (var ge in q) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ot, hr.prototype = { constructor: hr, reset: function($) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !$) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var $ = this.tryEntries[0].completion;
          if ($.type === "throw") throw $.arg;
          return this.rval;
        }, dispatchException: function($) {
          if (this.done) throw $;
          var q = this;
          function J(st, It) {
            return Le.type = "throw", Le.arg = $, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var Ue = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if (Ue && ot) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if (Ue) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function($, q) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && ($ === "break" || $ === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = $, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, pe) : this.complete(Le);
        }, complete: function($, q) {
          if ($.type === "throw") throw $.arg;
          return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && q && (this.next = q), pe;
        }, finish: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.finallyLoc === $) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.tryLoc === $) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function($, q, J) {
          return this.delegate = { iterator: Ot($), resultName: q, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function Pc(o, r, n, l, e, t, i) {
        try {
          var c = o[t](i), d = c.value;
        } catch (v) {
          return void n(v);
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
          if (function(G, ee) {
            if (!(G instanceof ee)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = w({}, o.defaults.options, c), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var d = this.options.theme || o.defaults.theme, v = o.defaults.themes[d];
          if (!v) throw new Error("Unknown theme ".concat(d));
          this.element.setAttribute("data-theme", d), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new v(this);
          var x = w(Hf, this.getEditorsRules()), S = function(G, ee, pe) {
            return pe ? i.addNewStyleRulesToShadowRoot(G, ee, pe) : i.addNewStyleRules(G, ee);
          };
          if (!this.theme.options.disable_theme_rules) {
            var D = C(this.element);
            S("default", x, D), v.rules !== void 0 && S(d, v.rules, D);
          }
          var U = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          U && (this.iconlib = new U()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = o, n = [{ key: "load", value: (l = ma().mark(function t() {
          var i, c, d, v, x, S, D = this;
          return ma().wrap(function(U) {
            for (; ; ) switch (U.prev = U.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (c = new Rp(this.options)).onSchemaLoaded = function(G) {
                  D.trigger("schemaLoaded", G);
                }, c.onAllSchemasLoaded = function() {
                  D.trigger("allSchemasLoaded");
                }, this.expandSchema = function(G) {
                  return c.expandSchema(G);
                }, this.expandRefs = function(G, ee) {
                  return c.expandRefs(G, ee);
                }, d = document.location.toString(), U.next = 9, c.load(this.schema, i, d);
              case 9:
                v = U.sent, x = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new Al(this, null, x, o.defaults), S = this.getEditorClass(v), this.root = this.createEditor(S, { jsoneditor: this, schema: v, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), k(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  D.ready && (D.validation_results = D.validator.validate(D.root.getValue()), D.root.showValidationErrors(D.validation_results), D.trigger("ready"), D.trigger("change"));
                });
              case 24:
              case "end":
                return U.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(c, d) {
            var v = l.apply(t, i);
            function x(D) {
              Pc(v, c, d, x, S, "next", D);
            }
            function S(D) {
              Pc(v, c, d, x, S, "throw", D);
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
            return i.rules ? w(t, i.rules) : t;
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
          return new t(i = w({}, t.options || {}, i), o.defaults, c);
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
          for (var d = c.sheet ? c.sheet : c.styleSheet, v = this.element.nodeName.toLowerCase(); d.cssRules.length > 0; ) d.deleteRule(0);
          Object.keys(i).forEach(function(x) {
            var S = t === "default" ? x : "".concat(v, '[data-theme="').concat(t, '"] ').concat(x);
            d.insertRule ? d.insertRule(S + " {" + decodeURIComponent(i[x]) + "}", 0) : d.addRule && d.addRule(S, decodeURIComponent(i[x]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, c) {
          var d = this.element.nodeName.toLowerCase(), v = "";
          Object.keys(i).forEach(function(D) {
            var U = t === "default" ? D : "".concat(d, '[data-theme="').concat(t, '"] ').concat(D);
            v += U + " {" + decodeURIComponent(i[D]) + `}
`;
          });
          var x, S = new CSSStyleSheet();
          S.replaceSync(v), c.adoptedStyleSheets = [].concat(function(D) {
            if (Array.isArray(D)) return ya(D);
          }(x = c.adoptedStyleSheets) || function(D) {
            if (typeof Symbol < "u" && D[Symbol.iterator] != null || D["@@iterator"] != null) return Array.from(D);
          }(x) || function(D, U) {
            if (D) {
              if (typeof D == "string") return ya(D, U);
              var G = Object.prototype.toString.call(D).slice(8, -1);
              return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? ya(D, U) : void 0;
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
      Er.defaults = _n, Er.AbstractEditor = V, Er.AbstractTheme = Or, Er.AbstractIconLib = xr, Object.assign(Er.defaults.themes, Mf), Object.assign(Er.defaults.editors, wo), Object.assign(Er.defaults.templates, Ip), Object.assign(Er.defaults.iconlibs, lf);
    })(), O;
  })());
})(gd);
var _d = gd.exports;
const Pa = /* @__PURE__ */ bb(_d), vb = ["placeholder"], gb = ["onClick"], _b = ["title"], wb = ["onClick"], jb = ["title"], kb = {
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
  setup(s, { emit: u }) {
    const p = s, g = u, m = /* @__PURE__ */ Ln(null), O = /* @__PURE__ */ Ln(!1), h = /* @__PURE__ */ Ln(""), _ = /* @__PURE__ */ Ln(/* @__PURE__ */ new Set()), a = /* @__PURE__ */ Ln({}), f = () => {
      if (m.value && O.value) {
        const T = m.value.getBoundingClientRect();
        a.value = {
          position: "fixed",
          top: `${T.bottom + 4}px`,
          left: `${T.left}px`,
          width: `${T.width}px`,
          zIndex: 999999,
          backgroundColor: "#ffffff",
          border: "1px solid #ced4da",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
          maxHeight: "250px",
          overflowY: "auto"
        };
      }
    };
    to(() => p.modelValue, (T) => {
      if (T !== h.value) {
        const I = (B) => {
          for (const F of B) {
            if (!F.children && F.value === T) return F.label;
            if (F.children) {
              const N = I(F.children);
              if (N) return N;
            }
          }
          return null;
        };
        h.value = I(p.options) || T || "";
      }
    }, { immediate: !0 }), to(O, (T) => {
      T && Li(f);
    });
    const y = () => {
      g("update:modelValue", h.value);
    }, b = md(() => {
      const T = h.value.toLowerCase(), I = (B, F = 0, N = !1) => {
        let H = [];
        for (const V of B) {
          const z = V.label.toLowerCase().includes(T), K = V.children ? w(V.children, T) : !1;
          if (!T || z || K)
            if (V.children) {
              const Z = N || !!T || _.value.has(V.id);
              H.push({ ...V, isGroup: !0, level: F, expanded: Z }), Z && H.push(...I(V.children, F + 1, N));
            } else
              H.push({ ...V, isGroup: !1, level: F });
        }
        return H;
      };
      return I(p.options);
    }), w = (T, I) => {
      for (const B of T)
        if (B.label.toLowerCase().includes(I) || B.children && w(B.children, I)) return !0;
      return !1;
    }, j = () => {
      O.value = !0, Li(f);
    }, C = () => {
      O.value = !O.value, O.value && Li(f);
    }, k = () => {
      O.value = !1;
    }, E = (T) => {
      _.value.has(T) ? _.value.delete(T) : _.value.add(T), _.value = new Set(_.value);
    }, P = (T) => {
      h.value = T.label, g("update:modelValue", T.value), k();
    }, L = (T, I) => {
      const B = I ? "group" : "element";
      return T === 0 ? B : T === 1 ? `sub${B}` : T === 2 ? `subsub${B}` : `${B}-level-${T}`;
    }, R = (T) => {
      if (O.value && m.value) {
        const I = T.composedPath(), B = document.querySelector(".ontocombo-dropdown");
        !I.includes(m.value) && (!B || !I.includes(B)) && k();
      }
    };
    return il(() => {
      document.addEventListener("click", R), document.addEventListener("mousedown", R), window.addEventListener("scroll", f, !0), window.addEventListener("resize", f);
    }), ol(() => {
      document.removeEventListener("click", R), document.removeEventListener("mousedown", R), window.removeEventListener("scroll", f, !0), window.removeEventListener("resize", f);
    }), (T, I) => (Qt(), Pr("div", {
      class: "ontocombo",
      ref_key: "containerRef",
      ref: m
    }, [
      Pt("div", {
        class: "ontocombo-header form-control p-0 d-flex align-items-stretch",
        onClick: Ci(j, ["stop"])
      }, [
        Iy(Pt("input", {
          type: "text",
          class: "ontocombo-input flex-grow-1 px-2 border-0 bg-transparent",
          "onUpdate:modelValue": I[0] || (I[0] = (B) => h.value = B),
          onFocus: j,
          onClick: Ci(j, ["stop"]),
          onInput: y,
          placeholder: s.placeholder,
          style: { outline: "none !important", "box-shadow": "none !important", "min-width": "0" }
        }, null, 40, vb), [
          [ub, h.value]
        ]),
        Pt("div", {
          class: "ontocombo-arrow d-flex align-items-center px-2 flex-shrink-0",
          onClick: Ci(C, ["stop"]),
          style: { cursor: "pointer" }
        }, [
          Pt("i", {
            class: In(["fas", O.value ? "fa-caret-down" : "fa-caret-right"])
          }, null, 2)
        ])
      ]),
      (Qt(), ud(zy, { to: "body" }, [
        O.value ? (Qt(), Pr("div", {
          key: 0,
          class: "ontocombo-dropdown",
          style: Pi(a.value),
          onClick: I[1] || (I[1] = Ci(() => {
          }, ["stop"]))
        }, [
          (Qt(!0), Pr(Nt, null, tm(b.value, (B) => (Qt(), Pr(Nt, {
            key: B.id
          }, [
            B.isGroup ? (Qt(), Pr("div", {
              key: 0,
              class: In(["ontocombo-row is-group", L(B.level, !0)]),
              style: Pi({ display: "flex", cursor: "pointer", "align-items": "center", padding: `0 ${B.level * 16 + 8}px` }),
              onClick: Ci((F) => E(B.id), ["stop"])
            }, [
              Pt("span", {
                class: "row-label flex-grow-1 text-start",
                title: B.label
              }, Qi(B.label), 9, _b),
              Pt("i", {
                class: In(["fas row-toggle", B.expanded ? "fa-caret-down" : "fa-caret-right"])
              }, null, 2)
            ], 14, gb)) : (Qt(), Pr("div", {
              key: 1,
              class: In(["ontocombo-row is-element", L(B.level, !1)]),
              style: Pi({ cursor: "pointer", paddingLeft: `${B.level * 16 + 8}px` }),
              onClick: Ci((F) => P(B), ["stop"])
            }, [
              Pt("span", {
                class: "row-label flex-grow-1 text-start",
                title: B.label
              }, Qi(B.label), 9, jb)
            ], 14, wb))
          ], 64))), 128)),
          b.value.length === 0 ? (Qt(), Pr("div", kb, ' Using custom value: "' + Qi(h.value) + '" ', 1)) : Va("", !0)
        ], 4)) : Va("", !0)
      ]))
    ], 512));
  }
};
function Ob(s, u) {
  s.defaults.editors.ontocombo = class extends s.defaults.editors.string {
    build() {
      var g;
      super.build(), this.input && (this.input.type = "hidden", this.input.style.setProperty("display", "none", "important")), this.vueContainer = document.createElement("div"), this.vueContainer.style.width = "100%", this.input.parentNode.insertBefore(this.vueContainer, this.input.nextSibling);
      const p = ((g = this.schema.options) == null ? void 0 : g.ontology_data) || [];
      this.vueApp = u(xb, {
        options: p,
        modelValue: this.value,
        placeholder: "",
        "onUpdate:modelValue": (m) => {
          this.value = m, this.input && (this.input.value = m), this.onChange(!0);
        }
      }), this.vueInstance = this.vueApp.mount(this.vueContainer);
    }
    setValue(p) {
      super.setValue(p), this.vueInstance && (this.vueInstance.$props.modelValue = p);
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
    const u = s, p = /* @__PURE__ */ Ln(null), g = /* @__PURE__ */ Ln("");
    let m = null, O = !1;
    const h = { class: "form-select" }, _ = {
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
                enum: ["AND", "OR"],
                default: "AND",
                options: { grid_columns: 2, inputAttributes: h }
              },
              modifier: {
                type: "string",
                title: "Modifier",
                enum: ["", "NOT"],
                default: "",
                options: { grid_columns: 2, inputAttributes: h }
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
    }, a = (j, C) => {
      if (C && !C.querySelector(`link[href="${j}"]`)) {
        const k = document.createElement("link");
        k.rel = "stylesheet", k.href = j, C.appendChild(k);
      }
    }, f = (j) => {
      const C = j == null ? void 0 : j.querySelector(".nav-tabs .nav-link.active");
      return C ? C.textContent.trim() : "Basic";
    }, y = () => {
      if (u.model && m) {
        O = !0;
        const j = m.getEditor("root.Basic");
        j && j.setValue([{ predicate: "", object: "" }]);
        const C = m.getEditor("root.Simple");
        C && C.setValue([{ subject: "", predicate: "", object: "", logic: "AND", modifier: "" }]);
        const k = m.getEditor("root.Advanced.query");
        k && k.setValue(`SELECT * WHERE {
  ?s ?p ?o .
}`), w(), setTimeout(() => {
          var L;
          let E = m.getValue();
          E = JSON.parse(JSON.stringify(E || {}));
          const P = u.model.get("value") || {};
          E._trigger_apply = P._trigger_apply || 0, E._trigger_cancel = Date.now(), E.active_tab = f((L = p.value) == null ? void 0 : L.getRootNode()), u.model.set("value", E), u.model.save_changes(), O = !1;
        }, 50);
      }
    }, b = () => {
      u.model && m && setTimeout(() => {
        var k;
        let j = m.getValue();
        j = JSON.parse(JSON.stringify(j || {}));
        const C = u.model.get("value") || {};
        j._trigger_cancel = C._trigger_cancel || 0, j._trigger_apply = Date.now(), j.active_tab = f((k = p.value) == null ? void 0 : k.getRootNode()), u.model.set("value", j), u.model.save_changes();
      }, 50);
    }, w = () => {
      Li(() => {
        var E, P;
        const j = (E = p.value) == null ? void 0 : E.getRootNode();
        if (!j || !m) return;
        const C = m.getValue(), k = ((P = C == null ? void 0 : C.Simple) == null ? void 0 : P.length) || 0;
        for (let L = 0; L < k; L++) {
          const R = L === k - 1, T = j.querySelector(`[data-schemapath="root.Simple.${L}.logic"]`), I = j.querySelector(`[data-schemapath="root.Simple.${L}.modifier"]`);
          T && (R ? T.classList.add("d-none") : T.classList.remove("d-none")), I && (R ? I.classList.add("d-none") : I.classList.remove("d-none"));
        }
      });
    };
    return il(async () => {
      var C;
      await Li();
      const j = p.value.getRootNode();
      a("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", j), a("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", j), a("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", document.head), a("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", document.head);
      try {
        const k = _d.JSONEditor || (Pa == null ? void 0 : Pa.JSONEditor) || window.JSONEditor;
        Ob(k, vd);
        const E = ((C = u.model) == null ? void 0 : C.get("schema")) || {}, P = E.entities || [], L = E.predicates || [], R = _.properties.Basic.items.properties;
        R.predicate.options.ontology_data = L, R.object.options.ontology_data = P;
        const T = _.properties.Simple.items.properties;
        T.subject.options.ontology_data = P, T.object.options.ontology_data = P, T.predicate.options.ontology_data = L, m = new k(p.value, {
          theme: "bootstrap5",
          iconlib: "fontawesome5",
          schema: _,
          disable_collapse: !0,
          disable_edit_json: !0,
          disable_properties: !0,
          show_opt_in: !1,
          disable_array_reorder: !0,
          disable_array_delete_all_rows: !0,
          remove_button_labels: !0,
          prompt_before_delete: !1
        }), m.on("ready", () => {
          j.querySelectorAll(".nav-tabs .nav-link").forEach((B) => {
            B.textContent.trim() === "Basic" && B.click();
          }), w();
        }), m.on("change", () => {
          if (O) return;
          let I = m.getValue(), B = !1;
          if (j.querySelectorAll(".nav-tabs .nav-link").forEach((N) => {
            N.textContent.trim() === "Simple" && N.classList.contains("active") && (B = !0);
          }), B && I && I.Simple && Array.isArray(I.Simple)) {
            let N = [];
            I.Simple.forEach((V, z) => {
              let K = `${V.subject || "?s"} ${V.predicate || "?p"} ${V.object || "?o"}`;
              if (z > 0) {
                let Z = I.Simple[z - 1];
                Z.modifier === "NOT" && (K = `FILTER NOT EXISTS { ${K} }`);
                let re = Z.logic === "OR" ? ` } UNION {
    ` : ` .
    `;
                N.push(re);
              } else
                V.modifier === "NOT" && (K = `FILTER NOT EXISTS { ${K} }`);
              N.push(K);
            });
            const H = `SELECT * WHERE {
  ${N.join("")} 
}`;
            if (I.Advanced || (I.Advanced = {}), I.Advanced.query !== H) {
              O = !0;
              const V = m.getEditor("root.Advanced.query");
              V && V.setValue(H), I.Advanced.query = H, O = !1;
            }
          }
          if (w(), u.model) {
            I = JSON.parse(JSON.stringify(I || {}));
            const N = u.model.get("value") || {};
            N._trigger_apply && (I._trigger_apply = N._trigger_apply), N._trigger_cancel && (I._trigger_cancel = N._trigger_cancel), I.active_tab = f(j), u.model.set("value", I), u.model.save_changes();
          }
        });
      } catch (k) {
        console.error("Failed to initialize JSON Editor:", k), g.value = String(k);
      }
    }), ol(() => {
      m && m.destroy();
    }), (j, C) => (Qt(), Pr(Nt, null, [
      g.value ? (Qt(), Pr("div", Cb, [
        C[0] || (C[0] = Pt("strong", null, "Error:", -1)),
        pd(" " + Qi(g.value), 1)
      ])) : Va("", !0),
      Pt("div", Eb, [
        Pt("div", {
          ref_key: "editorHolder",
          ref: p,
          class: "flex-grow-1"
        }, null, 512),
        Pt("div", { class: "m-3 d-flex justify-content-end border-top pt-3" }, [
          Pt("button", {
            class: "btn btn-secondary col-3 me-2",
            onClick: y
          }, "Cancel"),
          Pt("button", {
            class: "btn btn-primary col-3",
            onClick: b
          }, "Apply")
        ])
      ])
    ], 64));
  }
}, Pb = ".json-editor-scroll-area{max-height:calc(100vh - 88px);overflow-x:hidden;overflow-y:auto}.json-editor-scroll-area .card{border:none!important;background:transparent!important;padding:0 2px!important;margin:0!important}.json-editor-scroll-area .card-header{margin-bottom:10px}.json-editor-scroll-area .card-title{display:none!important}.json-editor-scroll-area .card-body{padding-top:0;padding-bottom:0}.json-editor-scroll-area .btn-group,.json-editor-scroll-area .je-object__controls{display:none}.json-editor-scroll-area .json-editor-btntype-add{background-color:#fff;border-color:var(--bs-success);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-success);margin-right:1rem}.json-editor-scroll-area .json-editor-btntype-add:active,.json-editor-scroll-area .json-editor-btntype-add:focus-visible,.json-editor-scroll-area .json-editor-btntype-add:hover{background-color:var(--bs-success);border-color:var(--bs-success);color:#fff}.json-editor-scroll-area .json-editor-btntype-deletelast{background-color:#fff;border-color:var(--bs-danger);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-danger)}.json-editor-scroll-area .json-editor-btntype-deletelast:active,.json-editor-scroll-area .json-editor-btntype-deletelast:focus-visible,.json-editor-scroll-area .json-editor-btntype-deletelast:hover{background-color:var(--bs-danger);border-color:var(--bs-danger);color:#fff}";
function Tb({ model: s, el: u }) {
  const p = document.createElement("style");
  p.innerHTML = Pb, u.append(p);
  const g = document.createElement("div");
  g.setAttribute("id", "filter-vue-app"), u.append(g);
  const m = vd(Sb, { model: s });
  return m.mount(g), () => {
    m.unmount();
  };
}
export {
  Tb as render
};

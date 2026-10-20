/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ua(o) {
  const u = /* @__PURE__ */ Object.create(null);
  for (const p of o.split(",")) u[p] = 1;
  return (p) => p in u;
}
const at = {}, In = [], vr = () => {
}, pu = () => !1, Zo = (o) => o.charCodeAt(0) === 111 && o.charCodeAt(1) === 110 && // uppercase letter
(o.charCodeAt(2) > 122 || o.charCodeAt(2) < 97), Yo = (o) => o.startsWith("onUpdate:"), xt = Object.assign, Ga = (o, u) => {
  const p = o.indexOf(u);
  p > -1 && o.splice(p, 1);
}, $f = Object.prototype.hasOwnProperty, et = (o, u) => $f.call(o, u), Me = Array.isArray, an = (o) => ho(o) === "[object Map]", Vo = (o) => ho(o) === "[object Set]", Ac = (o) => ho(o) === "[object Date]", qe = (o) => typeof o == "function", ht = (o) => typeof o == "string", gr = (o) => typeof o == "symbol", rt = (o) => o !== null && typeof o == "object", fu = (o) => (rt(o) || qe(o)) && qe(o.then) && qe(o.catch), yu = Object.prototype.toString, ho = (o) => yu.call(o), Uf = (o) => ho(o).slice(8, -1), mu = (o) => ho(o) === "[object Object]", Wa = (o) => ht(o) && o !== "NaN" && o[0] !== "-" && "" + parseInt(o, 10) === o, Yi = /* @__PURE__ */ Ua(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Qo = (o) => {
  const u = /* @__PURE__ */ Object.create(null);
  return (p) => u[p] || (u[p] = o(p));
}, Gf = /-\w/g, Xt = Qo(
  (o) => o.replace(Gf, (u) => u.slice(1).toUpperCase())
), Wf = /\B([A-Z])/g, un = Qo(
  (o) => o.replace(Wf, "-$1").toLowerCase()
), bu = Qo((o) => o.charAt(0).toUpperCase() + o.slice(1)), va = Qo(
  (o) => o ? `on${bu(o)}` : ""
), br = (o, u) => !Object.is(o, u), Fo = (o, ...u) => {
  for (let p = 0; p < o.length; p++)
    o[p](...u);
}, vu = (o, u, p, _ = !1) => {
  Object.defineProperty(o, u, {
    configurable: !0,
    enumerable: !1,
    writable: _,
    value: p
  });
}, Ja = (o) => {
  const u = parseFloat(o);
  return isNaN(u) ? o : u;
};
let Rc;
const Xo = () => Rc || (Rc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bn(o) {
  if (Me(o)) {
    const u = {};
    for (let p = 0; p < o.length; p++) {
      const _ = o[p], b = ht(_) ? Yf(_) : Bn(_);
      if (b)
        for (const O in b)
          u[O] = b[O];
    }
    return u;
  } else if (ht(o) || rt(o))
    return o;
}
const Jf = /;(?![^(]*\))/g, Kf = /:([^]+)/, Zf = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Yf(o) {
  const u = {};
  return o.replace(Zf, (p) => p.startsWith("/*") ? "" : p).split(Jf).forEach((p) => {
    if (p) {
      const _ = p.split(Kf);
      _.length > 1 && (u[_[0].trim()] = _[1].trim());
    }
  }), u;
}
function Nn(o) {
  let u = "";
  if (ht(o))
    u = o;
  else if (Me(o))
    for (let p = 0; p < o.length; p++) {
      const _ = Nn(o[p]);
      _ && (u += _ + " ");
    }
  else if (rt(o))
    for (const p in o)
      o[p] && (u += p + " ");
  return u.trim();
}
const Qf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xf = /* @__PURE__ */ Ua(Qf);
function gu(o) {
  return !!o || o === "";
}
function ey(o, u, p) {
  if (o.length !== u.length) return !1;
  let _ = !0;
  for (let b = 0; _ && b < o.length; b++)
    _ = es(o[b], u[b], p);
  return _;
}
function Ic(o, u, p) {
  if (o.size !== u.size) return !1;
  const _ = Array.from(u), b = new Uint8Array(_.length);
  for (const O of o) {
    let d = -1;
    for (let w = 0; w < _.length; w++)
      if (!b[w] && es(O, _[w], p)) {
        d = w;
        break;
      }
    if (d < 0) return !1;
    b[d] = 1;
  }
  return !0;
}
function ty(o, u, p) {
  let _ = an(o), b = an(u);
  if (_ || b || (_ = Vo(o), b = Vo(u), _ || b))
    return _ && b ? Ic(o, u, p) : !1;
  const O = Object.keys(o).length, d = Object.keys(u).length;
  if (O !== d)
    return !1;
  for (const w in o) {
    const a = o.hasOwnProperty(w), f = u.hasOwnProperty(w);
    if (a && !f || !a && f || !es(o[w], u[w], p))
      return !1;
  }
  return String(o) === String(u);
}
function Bc(o, u, p, _) {
  p || (p = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [b, O] = p;
  if (b.has(o) || O.has(u))
    return b.get(o) === u && O.get(u) === o;
  b.set(o, u), O.set(u, o);
  const d = _(o, u, p);
  return b.delete(o), O.delete(u), d;
}
function es(o, u, p) {
  if (o === u) return !0;
  let _ = Ac(o), b = Ac(u);
  return _ || b ? _ && b ? o.getTime() === u.getTime() : !1 : (_ = gr(o), b = gr(u), _ || b ? o === u : (_ = Me(o), b = Me(u), _ || b ? _ && b ? Bc(o, u, p, ey) : !1 : (_ = rt(o), b = rt(u), _ || b ? !_ || !b ? !1 : Bc(o, u, p, ty) : String(o) === String(u))));
}
const _u = (o) => !!(o && o.__v_isRef === !0), Qi = (o) => ht(o) ? o : o == null ? "" : Me(o) || rt(o) && (o.toString === yu || !qe(o.toString)) ? _u(o) ? Qi(o.value) : JSON.stringify(o, wu, 2) : String(o), wu = (o, u) => _u(u) ? wu(o, u.value) : an(u) ? {
  [`Map(${u.size})`]: [...u.entries()].reduce(
    (p, [_, b], O) => (p[ga(_, O) + " =>"] = b, p),
    {}
  )
} : Vo(u) ? {
  [`Set(${u.size})`]: [...u.values()].map((p) => ga(p))
} : gr(u) ? ga(u) : rt(u) && !Me(u) && !mu(u) ? String(u) : u, ga = (o, u = "") => {
  var p;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    gr(o) ? `Symbol(${(p = o.description) != null ? p : u})` : o
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class ry {
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
function ny() {
  return gt;
}
let lt;
const _a = /* @__PURE__ */ new WeakSet();
class ju {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || xu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Nc(this), Ou(this);
    const u = lt, p = er;
    lt = this, er = !0;
    try {
      return this.fn();
    } finally {
      Cu(this), lt = u, er = p, this.flags &= -3;
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
let ku = 0, Xi, eo;
function xu(o, u = !1) {
  if (o.flags |= 8, u) {
    o.next = eo, eo = o;
    return;
  }
  o.next = Xi, Xi = o;
}
function Ka() {
  ku++;
}
function Za() {
  if (--ku > 0)
    return;
  if (eo) {
    let u = eo;
    for (eo = void 0; u; ) {
      const p = u.next;
      u.next = void 0, u.flags &= -9, u = p;
    }
  }
  let o;
  for (; Xi; ) {
    let u = Xi;
    for (Xi = void 0; u; ) {
      const p = u.next;
      if (u.next = void 0, u.flags &= -9, u.flags & 1)
        try {
          u.trigger();
        } catch (_) {
          o || (o = _);
        }
      u = p;
    }
  }
  if (o) throw o;
}
function Ou(o) {
  for (let u = o.deps; u; u = u.nextDep)
    u.version = -1, u.prevActiveLink = u.dep.activeLink, u.dep.activeLink = u;
}
function Cu(o) {
  let u, p = o.depsTail, _ = p;
  for (; _; ) {
    const b = _.prevDep;
    _.version === -1 ? (_ === p && (p = b), Ya(_), iy(_)) : u = _, _.dep.activeLink = _.prevActiveLink, _.prevActiveLink = void 0, _ = b;
  }
  o.deps = u, o.depsTail = p;
}
function La(o) {
  for (let u = o.deps; u; u = u.nextDep)
    if (u.dep.version !== u.version || u.dep.computed && (Eu(u.dep.computed) || u.dep.version !== u.version))
      return !0;
  return !!o._dirty;
}
function Eu(o) {
  if (o.flags & 4 && !(o.flags & 16) || (o.flags &= -17, o.globalVersion === oo) || (o.globalVersion = oo, !o.isSSR && o.flags & 128 && (!o.deps && !o._dirty || !La(o))))
    return;
  o.flags |= 2;
  const u = o.dep, p = lt, _ = er;
  lt = o, er = !0;
  try {
    Ou(o);
    const b = o.fn(o._value);
    (u.version === 0 || br(b, o._value)) && (o.flags |= 128, o._value = b, u.version++);
  } catch (b) {
    throw u.version++, b;
  } finally {
    lt = p, er = _, Cu(o), o.flags &= -3;
  }
}
function Ya(o, u = !1) {
  const { dep: p, prevSub: _, nextSub: b } = o;
  if (_ && (_.nextSub = b, o.prevSub = void 0), b && (b.prevSub = _, o.nextSub = void 0), p.subs === o && (p.subs = _, !_ && p.computed)) {
    p.computed.flags &= -5;
    for (let O = p.computed.deps; O; O = O.nextDep)
      Ya(O, !0);
  }
  !u && !--p.sc && p.map && p.map.delete(p.key);
}
function iy(o) {
  const { prevDep: u, nextDep: p } = o;
  u && (u.nextDep = p, o.prevDep = void 0), p && (p.prevDep = u, o.nextDep = void 0);
}
let er = !0;
const Su = [];
function Br() {
  Su.push(er), er = !1;
}
function Nr() {
  const o = Su.pop();
  er = o === void 0 ? !0 : o;
}
function Nc(o) {
  const { cleanup: u } = o;
  if (o.cleanup = void 0, u) {
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
class oy {
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
      p = this.activeLink = new oy(lt, this), lt.deps ? (p.prevDep = lt.depsTail, lt.depsTail.nextDep = p, lt.depsTail = p) : lt.deps = lt.depsTail = p, Pu(p);
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
function Pu(o) {
  if (o.dep.sc++, o.sub.flags & 4) {
    const u = o.dep.computed;
    if (u && !o.dep.subs) {
      u.flags |= 20;
      for (let _ = u.deps; _; _ = _.nextDep)
        Pu(_);
    }
    const p = o.dep.subs;
    p !== o && (o.prevSub = p, p && (p.nextSub = o)), o.dep.subs = o;
  }
}
const Aa = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ Symbol(
  ""
), Ra = /* @__PURE__ */ Symbol(
  ""
), so = /* @__PURE__ */ Symbol(
  ""
);
function jt(o, u, p) {
  if (er && lt) {
    let _ = Aa.get(o);
    _ || Aa.set(o, _ = /* @__PURE__ */ new Map());
    let b = _.get(p);
    b || (_.set(p, b = new Qa()), b.map = _, b.key = p), b.track();
  }
}
function Ar(o, u, p, _, b, O) {
  const d = Aa.get(o);
  if (!d) {
    oo++;
    return;
  }
  const w = (a) => {
    a && a.trigger();
  };
  if (Ka(), u === "clear")
    d.forEach(w);
  else {
    const a = Me(o), f = a && Wa(p);
    if (a && p === "length") {
      const y = Number(_);
      d.forEach((m, v) => {
        (v === "length" || v === so || !gr(v) && v >= y) && w(m);
      });
    } else
      switch ((p !== void 0 || d.has(void 0)) && w(d.get(p)), f && w(d.get(so)), u) {
        case "add":
          a ? f && w(d.get("length")) : (w(d.get(Dn)), an(o) && w(d.get(Ra)));
          break;
        case "delete":
          a || (w(d.get(Dn)), an(o) && w(d.get(Ra)));
          break;
        case "set":
          an(o) && w(d.get(Dn));
          break;
      }
  }
  Za();
}
function Ei(o) {
  const u = /* @__PURE__ */ Xe(o);
  return u === o || (jt(u, "iterate", so), /* @__PURE__ */ Ft(o)) ? u : /* @__PURE__ */ _r(o) ? /* @__PURE__ */ ln(o) ? u.map((p) => cn(Mt(p))) : u.map(cn) : u.map(Mt);
}
function ts(o) {
  return jt(o = /* @__PURE__ */ Xe(o), "iterate", so), o;
}
function yr(o, u) {
  return /* @__PURE__ */ _r(o) ? cn(/* @__PURE__ */ ln(o) ? Mt(u) : u) : Mt(u);
}
const sy = {
  __proto__: null,
  [Symbol.iterator]() {
    return wa(this, Symbol.iterator, (o) => yr(this, o));
  },
  concat(...o) {
    return Ei(this).concat(
      ...o.map((u) => Me(u) ? Ei(u) : u)
    );
  },
  entries() {
    return wa(this, "entries", (o) => (o[1] = yr(this, o[1]), o));
  },
  every(o, u) {
    return Sr(this, "every", o, u, void 0, arguments);
  },
  filter(o, u) {
    return Sr(
      this,
      "filter",
      o,
      u,
      (p) => p.map((_) => yr(this, _)),
      arguments
    );
  },
  find(o, u) {
    return Sr(
      this,
      "find",
      o,
      u,
      (p) => yr(this, p),
      arguments
    );
  },
  findIndex(o, u) {
    return Sr(this, "findIndex", o, u, void 0, arguments);
  },
  findLast(o, u) {
    return Sr(
      this,
      "findLast",
      o,
      u,
      (p) => yr(this, p),
      arguments
    );
  },
  findLastIndex(o, u) {
    return Sr(this, "findLastIndex", o, u, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(o, u) {
    return Sr(this, "forEach", o, u, void 0, arguments);
  },
  includes(...o) {
    return ja(this, "includes", o);
  },
  indexOf(...o) {
    return ja(this, "indexOf", o);
  },
  join(o) {
    return Ei(this).join(o);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...o) {
    return ja(this, "lastIndexOf", o);
  },
  map(o, u) {
    return Sr(this, "map", o, u, void 0, arguments);
  },
  pop() {
    return Gi(this, "pop");
  },
  push(...o) {
    return Gi(this, "push", o);
  },
  reduce(o, ...u) {
    return Dc(this, "reduce", o, u);
  },
  reduceRight(o, ...u) {
    return Dc(this, "reduceRight", o, u);
  },
  shift() {
    return Gi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(o, u) {
    return Sr(this, "some", o, u, void 0, arguments);
  },
  splice(...o) {
    return Gi(this, "splice", o);
  },
  toReversed() {
    return Ei(this).toReversed();
  },
  toSorted(o) {
    return Ei(this).toSorted(o);
  },
  toSpliced(...o) {
    return Ei(this).toSpliced(...o);
  },
  unshift(...o) {
    return Gi(this, "unshift", o);
  },
  values() {
    return wa(this, "values", (o) => yr(this, o));
  }
};
function wa(o, u, p) {
  const _ = ts(o), b = _[u]();
  return _ !== o && !/* @__PURE__ */ Ft(o) && (b._next = b.next, b.next = () => {
    const O = b._next();
    return O.done || (O.value = p(O.value)), O;
  }), b;
}
const ay = Array.prototype;
function Sr(o, u, p, _, b, O) {
  const d = ts(o), w = d !== o && !/* @__PURE__ */ Ft(o), a = d[u];
  if (a !== ay[u]) {
    const m = a.apply(o, O);
    return w ? Mt(m) : m;
  }
  let f = p;
  d !== o && (w ? f = function(m, v) {
    return p.call(this, yr(o, m), v, o);
  } : p.length > 2 && (f = function(m, v) {
    return p.call(this, m, v, o);
  }));
  const y = a.call(d, f, _);
  return w && b ? b(y) : y;
}
function Dc(o, u, p, _) {
  const b = ts(o), O = b !== o && !/* @__PURE__ */ Ft(o);
  let d = p, w = !1;
  b !== o && (O ? (w = _.length === 0, d = function(f, y, m) {
    return w && (w = !1, f = yr(o, f)), p.call(this, f, yr(o, y), m, o);
  }) : p.length > 3 && (d = function(f, y, m) {
    return p.call(this, f, y, m, o);
  }));
  const a = b[u](d, ..._);
  return w ? yr(o, a) : a;
}
function ja(o, u, p) {
  const _ = /* @__PURE__ */ Xe(o);
  jt(_, "iterate", so);
  const b = _[u](...p);
  return (b === -1 || b === !1) && /* @__PURE__ */ rl(p[0]) ? (p[0] = /* @__PURE__ */ Xe(p[0]), _[u](...p)) : b;
}
function Gi(o, u, p = []) {
  Br(), Ka();
  const _ = (/* @__PURE__ */ Xe(o))[u].apply(o, p);
  return Za(), Nr(), _;
}
const ly = /* @__PURE__ */ Ua("__proto__,__v_isRef,__isVue"), Tu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((o) => o !== "arguments" && o !== "caller").map((o) => Symbol[o]).filter(gr)
);
function cy(o) {
  gr(o) || (o = String(o));
  const u = /* @__PURE__ */ Xe(this);
  return jt(u, "has", o), u.hasOwnProperty(o);
}
class Lu {
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
      return _ === (b ? O ? gy : Bu : O ? Iu : Ru).get(u) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(u) === Object.getPrototypeOf(_) ? u : void 0;
    const d = Me(u);
    if (!b) {
      let a;
      if (d && (a = sy[p]))
        return a;
      if (p === "hasOwnProperty")
        return cy;
    }
    const w = Reflect.get(
      u,
      p,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ kt(u) ? u : _
    );
    if ((gr(p) ? Tu.has(p) : ly(p)) || (b || jt(u, "get", p), O))
      return w;
    if (/* @__PURE__ */ kt(w)) {
      const a = d && Wa(p) ? w : w.value;
      return b && rt(a) ? /* @__PURE__ */ Ba(a) : a;
    }
    return rt(w) ? b ? /* @__PURE__ */ Ba(w) : /* @__PURE__ */ el(w) : w;
  }
}
class Au extends Lu {
  constructor(u = !1) {
    super(!1, u);
  }
  set(u, p, _, b) {
    let O = u[p];
    const d = Me(u) && Wa(p);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ _r(O);
      if (!/* @__PURE__ */ Ft(_) && !/* @__PURE__ */ _r(_) && (O = /* @__PURE__ */ Xe(O), _ = /* @__PURE__ */ Xe(_)), !d && /* @__PURE__ */ kt(O) && !/* @__PURE__ */ kt(_))
        return f || (O.value = _), !0;
    }
    const w = d ? Number(p) < u.length : et(u, p), a = Reflect.set(
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
    return (!gr(p) || !Tu.has(p)) && jt(u, "has", p), _;
  }
  ownKeys(u) {
    return jt(
      u,
      "iterate",
      Me(u) ? "length" : Dn
    ), Reflect.ownKeys(u);
  }
}
class uy extends Lu {
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
const hy = /* @__PURE__ */ new Au(), dy = /* @__PURE__ */ new uy(), py = /* @__PURE__ */ new Au(!0);
const Ia = (o) => o, Lo = (o) => Reflect.getPrototypeOf(o);
function fy(o, u, p) {
  return function(..._) {
    const b = this.__v_raw, O = /* @__PURE__ */ Xe(b), d = an(O), w = o === "entries" || o === Symbol.iterator && d, a = o === "keys" && d, f = b[o](..._), y = p ? Ia : u ? cn : Mt;
    return !u && jt(
      O,
      "iterate",
      a ? Ra : Dn
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
function Ao(o) {
  return function(...u) {
    return o === "delete" ? !1 : o === "clear" ? void 0 : this;
  };
}
function yy(o, u) {
  const p = {
    get(b) {
      const O = this.__v_raw, d = /* @__PURE__ */ Xe(O), w = /* @__PURE__ */ Xe(b);
      o || (br(b, w) && jt(d, "get", b), jt(d, "get", w));
      const { has: a } = Lo(d), f = u ? Ia : o ? cn : Mt;
      if (a.call(d, b))
        return f(O.get(b));
      if (a.call(d, w))
        return f(O.get(w));
      O !== d && O.get(b);
    },
    get size() {
      const b = this.__v_raw;
      return !o && jt(/* @__PURE__ */ Xe(b), "iterate", Dn), b.size;
    },
    has(b) {
      const O = this.__v_raw, d = /* @__PURE__ */ Xe(O), w = /* @__PURE__ */ Xe(b);
      return o || (br(b, w) && jt(d, "has", b), jt(d, "has", w)), b === w ? O.has(b) : O.has(b) || O.has(w);
    },
    forEach(b, O) {
      const d = this, w = d.__v_raw, a = /* @__PURE__ */ Xe(w), f = u ? Ia : o ? cn : Mt;
      return !o && jt(a, "iterate", Dn), w.forEach((y, m) => b.call(O, f(y), f(m), d));
    }
  };
  return xt(
    p,
    o ? {
      add: Ao("add"),
      set: Ao("set"),
      delete: Ao("delete"),
      clear: Ao("clear")
    } : {
      add(b) {
        const O = /* @__PURE__ */ Xe(this), d = Lo(O), w = /* @__PURE__ */ Xe(b), a = !u && !/* @__PURE__ */ Ft(b) && !/* @__PURE__ */ _r(b) ? w : b;
        return d.has.call(O, a) || br(b, a) && d.has.call(O, b) || br(w, a) && d.has.call(O, w) || (O.add(a), Ar(O, "add", a, a)), this;
      },
      set(b, O) {
        !u && !/* @__PURE__ */ Ft(O) && !/* @__PURE__ */ _r(O) && (O = /* @__PURE__ */ Xe(O));
        const d = /* @__PURE__ */ Xe(this), { has: w, get: a } = Lo(d);
        let f = w.call(d, b);
        f || (b = /* @__PURE__ */ Xe(b), f = w.call(d, b));
        const y = a.call(d, b);
        return d.set(b, O), f ? br(O, y) && Ar(d, "set", b, O) : Ar(d, "add", b, O), this;
      },
      delete(b) {
        const O = /* @__PURE__ */ Xe(this), { has: d, get: w } = Lo(O);
        let a = d.call(O, b);
        a || (b = /* @__PURE__ */ Xe(b), a = d.call(O, b)), w && w.call(O, b);
        const f = O.delete(b);
        return a && Ar(O, "delete", b, void 0), f;
      },
      clear() {
        const b = /* @__PURE__ */ Xe(this), O = b.size !== 0, d = b.clear();
        return O && Ar(
          b,
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
  ].forEach((b) => {
    p[b] = fy(b, o, u);
  }), p;
}
function Xa(o, u) {
  const p = yy(o, u);
  return (_, b, O) => b === "__v_isReactive" ? !o : b === "__v_isReadonly" ? o : b === "__v_raw" ? _ : Reflect.get(
    et(p, b) && b in _ ? p : _,
    b,
    O
  );
}
const my = {
  get: /* @__PURE__ */ Xa(!1, !1)
}, by = {
  get: /* @__PURE__ */ Xa(!1, !0)
}, vy = {
  get: /* @__PURE__ */ Xa(!0, !1)
};
const Ru = /* @__PURE__ */ new WeakMap(), Iu = /* @__PURE__ */ new WeakMap(), Bu = /* @__PURE__ */ new WeakMap(), gy = /* @__PURE__ */ new WeakMap();
function _y(o) {
  switch (o) {
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
function el(o) {
  return /* @__PURE__ */ _r(o) ? o : tl(
    o,
    !1,
    hy,
    my,
    Ru
  );
}
// @__NO_SIDE_EFFECTS__
function wy(o) {
  return tl(
    o,
    !1,
    py,
    by,
    Iu
  );
}
// @__NO_SIDE_EFFECTS__
function Ba(o) {
  return tl(
    o,
    !0,
    dy,
    vy,
    Bu
  );
}
function tl(o, u, p, _, b) {
  if (!rt(o) || o.__v_raw && !(u && o.__v_isReactive) || o.__v_skip || !Object.isExtensible(o))
    return o;
  const O = b.get(o);
  if (O)
    return O;
  const d = _y(Uf(o));
  if (d === 0)
    return o;
  const w = new Proxy(
    o,
    d === 2 ? _ : p
  );
  return b.set(o, w), w;
}
// @__NO_SIDE_EFFECTS__
function ln(o) {
  return /* @__PURE__ */ _r(o) ? /* @__PURE__ */ ln(o.__v_raw) : !!(o && o.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _r(o) {
  return !!(o && o.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ft(o) {
  return !!(o && o.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function rl(o) {
  return o ? !!o.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Xe(o) {
  const u = o && o.__v_raw;
  return u ? /* @__PURE__ */ Xe(u) : o;
}
function jy(o) {
  return !et(o, "__v_skip") && Object.isExtensible(o) && vu(o, "__v_skip", !0), o;
}
const Mt = (o) => rt(o) ? /* @__PURE__ */ el(o) : o, cn = (o) => rt(o) ? /* @__PURE__ */ Ba(o) : o;
// @__NO_SIDE_EFFECTS__
function kt(o) {
  return o ? o.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function An(o) {
  return ky(o, !1);
}
function ky(o, u) {
  return /* @__PURE__ */ kt(o) ? o : new xy(o, u);
}
class xy {
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
function Oy(o) {
  return /* @__PURE__ */ kt(o) ? o.value : o;
}
const Cy = {
  get: (o, u, p) => u === "__v_raw" ? o : Oy(Reflect.get(o, u, p)),
  set: (o, u, p, _) => {
    const b = o[u];
    return /* @__PURE__ */ kt(b) && !/* @__PURE__ */ kt(p) ? (b.value = p, !0) : Reflect.set(o, u, p, _);
  }
};
function Nu(o) {
  return /* @__PURE__ */ ln(o) ? o : new Proxy(o, Cy);
}
class Ey {
  constructor(u, p, _) {
    this.fn = u, this.setter = p, this._value = void 0, this.dep = new Qa(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = oo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !p, this.isSSR = _;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    lt !== this)
      return xu(this, !0), !0;
  }
  get value() {
    const u = this.dep.track();
    return Eu(this), u && (u.version = this.dep.version), this._value;
  }
  set value(u) {
    this.setter && this.setter(u);
  }
}
// @__NO_SIDE_EFFECTS__
function Sy(o, u, p = !1) {
  let _, b;
  return qe(o) ? _ = o : (_ = o.get, b = o.set), new Ey(_, b, p);
}
const Ro = {}, zo = /* @__PURE__ */ new WeakMap();
let Ln;
function Py(o, u = !1, p = Ln) {
  if (p) {
    let _ = zo.get(p);
    _ || zo.set(p, _ = []), _.push(o);
  }
}
function Ty(o, u, p = at) {
  const { immediate: _, deep: b, once: O, scheduler: d, augmentJob: w, call: a } = p, f = (L) => b ? L : /* @__PURE__ */ Ft(L) || b === !1 || b === 0 ? Rr(L, 1) : Rr(L);
  let y, m, v, j, C = !1, k = !1;
  if (/* @__PURE__ */ kt(o) ? (m = () => o.value, C = /* @__PURE__ */ Ft(o)) : /* @__PURE__ */ ln(o) ? (m = () => f(o), C = !0) : Me(o) ? (k = !0, C = o.some((L) => /* @__PURE__ */ ln(L) || /* @__PURE__ */ Ft(L)), m = () => o.map((L) => {
    if (/* @__PURE__ */ kt(L))
      return L.value;
    if (/* @__PURE__ */ ln(L))
      return f(L);
    if (qe(L))
      return a ? a(L, 2) : L();
  })) : qe(o) ? u ? m = a ? () => a(o, 2) : o : m = () => {
    if (v) {
      Br();
      try {
        v();
      } finally {
        Nr();
      }
    }
    const L = Ln;
    Ln = y;
    try {
      return a ? a(o, 3, [j]) : o(j);
    } finally {
      Ln = L;
    }
  } : m = vr, u && b) {
    const L = m, M = b === !0 ? 1 / 0 : b;
    m = () => Rr(L(), M);
  }
  const E = ny(), P = () => {
    y.stop(), E && E.active && Ga(E.effects, y);
  };
  if (O && u) {
    const L = u;
    u = (...M) => {
      const H = L(...M);
      return P(), H;
    };
  }
  let T = k ? new Array(o.length).fill(Ro) : Ro;
  const I = (L) => {
    if (!(!(y.flags & 1) || !y.dirty && !L))
      if (u) {
        const M = y.run();
        if (L || b || C || (k ? M.some((H, A) => br(H, T[A])) : br(M, T))) {
          v && v();
          const H = Ln;
          Ln = y;
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
            Ln = H;
          }
        }
      } else
        y.run();
  };
  return w && w(I), y = new ju(m), y.scheduler = d ? () => d(I, !1) : I, j = (L) => Py(L, !1, y), v = y.onStop = () => {
    const L = zo.get(y);
    if (L) {
      if (a)
        a(L, 4);
      else
        for (const M of L) M();
      zo.delete(y);
    }
  }, u ? _ ? I(!0) : T = y.run() : d ? d(I.bind(null, !0), !0) : y.run(), P.pause = y.pause.bind(y), P.resume = y.resume.bind(y), P.stop = P, P;
}
function Rr(o, u = 1 / 0, p) {
  if (u <= 0 || !rt(o) || o.__v_skip || (p = p || /* @__PURE__ */ new Map(), (p.get(o) || 0) >= u))
    return o;
  if (p.set(o, u), u--, /* @__PURE__ */ kt(o))
    Rr(o.value, u, p);
  else if (Me(o))
    for (let _ = 0; _ < o.length; _++)
      Rr(o[_], u, p);
  else if (Vo(o) || an(o))
    o.forEach((_) => {
      Rr(_, u, p);
    });
  else if (mu(o)) {
    for (const _ in o)
      Rr(o[_], u, p);
    for (const _ of Object.getOwnPropertySymbols(o))
      Object.prototype.propertyIsEnumerable.call(o, _) && Rr(o[_], u, p);
  }
  return o;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function po(o, u, p, _) {
  try {
    return _ ? o(..._) : o();
  } catch (b) {
    rs(b, u, p);
  }
}
function tr(o, u, p, _) {
  if (qe(o)) {
    const b = po(o, u, p, _);
    return b && fu(b) && b.catch((O) => {
      rs(O, u, p);
    }), b;
  }
  if (Me(o)) {
    const b = [];
    for (let O = 0; O < o.length; O++)
      b.push(tr(o[O], u, p, _));
    return b;
  }
}
function rs(o, u, p, _ = !0) {
  const b = u ? u.vnode : null, { errorHandler: O, throwUnhandledErrorInProduction: d } = u && u.appContext.config || at;
  if (u) {
    let w = u.parent;
    const a = u.proxy, f = `https://vuejs.org/error-reference/#runtime-${p}`;
    for (; w; ) {
      const y = w.ec;
      if (y) {
        for (let m = 0; m < y.length; m++)
          if (y[m](o, a, f) === !1)
            return;
      }
      w = w.parent;
    }
    if (O) {
      Br(), po(O, null, 10, [
        o,
        a,
        f
      ]), Nr();
      return;
    }
  }
  Ly(o, p, b, _, d);
}
function Ly(o, u, p, _ = !0, b = !1) {
  if (b)
    throw o;
  console.error(o);
}
const Tt = [];
let fr = -1;
const Li = [];
let sn = null, Pi = 0;
const Du = /* @__PURE__ */ Promise.resolve();
let qo = null;
function Fn(o) {
  const u = qo || Du;
  return o ? u.then(this ? o.bind(this) : o) : u;
}
function Ay(o) {
  let u = fr + 1, p = Tt.length;
  for (; u < p; ) {
    const _ = u + p >>> 1, b = Tt[_], O = ao(b);
    O < o || O === o && b.flags & 2 ? u = _ + 1 : p = _;
  }
  return u;
}
function nl(o) {
  if (!(o.flags & 1)) {
    const u = ao(o), p = Tt[Tt.length - 1];
    !p || // fast path when the job id is larger than the tail
    !(o.flags & 2) && u >= ao(p) ? Tt.push(o) : Tt.splice(Ay(u), 0, o), o.flags |= 1, Fu();
  }
}
function Fu() {
  qo || (qo = Du.then(Hu));
}
function Ry(o) {
  if (!Me(o))
    sn && o.id === -1 ? sn.splice(Pi + 1, 0, o) : o.flags & 1 || (Li.push(o), o.flags |= 1);
  else
    for (let u = 0; u < o.length; u++)
      Li.push(o[u]);
  Fu();
}
function Fc(o, u, p = fr + 1) {
  for (; p < Tt.length; p++) {
    const _ = Tt[p];
    if (_ && _.flags & 2) {
      if (o && _.id !== o.uid)
        continue;
      Tt.splice(p, 1), p--, _.flags & 4 && (_.flags &= -2), _(), _.flags & 4 || (_.flags &= -2);
    }
  }
}
function Mu(o) {
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
const ao = (o) => o.id == null ? o.flags & 2 ? -1 : 1 / 0 : o.id;
function Hu(o) {
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
    fr = -1, Tt.length = 0, Mu(), qo = null, (Tt.length || Li.length) && Hu();
  }
}
let Dt = null, Vu = null;
function $o(o) {
  const u = Dt;
  return Dt = o, Vu = o && o.type.__scopeId || null, u;
}
function Iy(o, u = Dt, p) {
  if (!u || o._n)
    return o;
  const _ = (...b) => {
    _._d && Yc(-1);
    const O = $o(u), d = Mn.length;
    let w;
    try {
      w = o(...b);
    } finally {
      for (let a = Mn.length; a > d; a--) hh();
      $o(O), _._d && Yc(1);
    }
    return w;
  };
  return _._n = !0, _._c = !0, _._d = !0, _;
}
function By(o, u) {
  if (Dt === null)
    return o;
  const p = as(Dt), _ = o.dirs || (o.dirs = []);
  for (let b = 0; b < u.length; b++) {
    let [O, d, w, a = at] = u[b];
    O && (qe(O) && (O = {
      mounted: O,
      updated: O
    }), O.deep && Rr(d), _.push({
      dir: O,
      instance: p,
      value: d,
      oldValue: void 0,
      arg: w,
      modifiers: a
    }));
  }
  return o;
}
function Pn(o, u, p, _) {
  const b = o.dirs, O = u && u.dirs;
  for (let d = 0; d < b.length; d++) {
    const w = b[d];
    O && (w.oldValue = O[d].value);
    let a = w.dir[_];
    a && (Br(), tr(a, p, 8, [
      o.el,
      w,
      o,
      u
    ]), Nr());
  }
}
function Ny(o, u) {
  if (Lt) {
    let p = Lt.provides;
    const _ = Lt.parent && Lt.parent.provides;
    _ === p && (p = Lt.provides = Object.create(_)), p[o] = u;
  }
}
function Mo(o, u, p = !1) {
  const _ = Bm();
  if (_ || Ai) {
    let b = Ai ? Ai._context.provides : _ ? _.parent == null || _.ce ? _.vnode.appContext && _.vnode.appContext.provides : _.parent.provides : void 0;
    if (b && o in b)
      return b[o];
    if (arguments.length > 1)
      return p && qe(u) ? u.call(_ && _.proxy) : u;
  }
}
const Dy = /* @__PURE__ */ Symbol.for("v-scx"), Fy = () => Mo(Dy);
function to(o, u, p) {
  return zu(o, u, p);
}
function zu(o, u, p = at) {
  const { immediate: _, deep: b, flush: O, once: d } = p, w = xt({}, p), a = u && _ || !u && O !== "post";
  let f;
  if (uo) {
    if (O === "sync") {
      const j = Fy();
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
  const v = Ty(o, u, w);
  return uo && (f ? f.push(v) : a && v()), v;
}
function My(o, u, p) {
  const _ = this.proxy, b = ht(o) ? o.includes(".") ? qu(_, o) : () => _[o] : o.bind(_, _);
  let O;
  qe(u) ? O = u : (O = u.handler, p = u);
  const d = fo(this), w = zu(b, O.bind(_), p);
  return d(), w;
}
function qu(o, u) {
  const p = u.split(".");
  return () => {
    let _ = o;
    for (let b = 0; b < p.length && _; b++)
      _ = _[p[b]];
    return _;
  };
}
const on = /* @__PURE__ */ new WeakMap(), $u = /* @__PURE__ */ Symbol("_vte"), ns = (o) => o.__isTeleport, Rn = (o) => o && (o.disabled || o.disabled === ""), Hy = (o) => o && (o.defer || o.defer === ""), Mc = (o) => typeof SVGElement < "u" && o instanceof SVGElement, Hc = (o) => typeof MathMLElement == "function" && o instanceof MathMLElement, Na = (o, u) => {
  const p = o && o.to;
  return ht(p) ? u ? u(p) : null : p;
}, Vy = {
  name: "Teleport",
  __isTeleport: !0,
  process(o, u, p, _, b, O, d, w, a, f) {
    const {
      mc: y,
      pc: m,
      pbc: v,
      o: { insert: j, querySelector: C, createText: k, createComment: E, parentNode: P }
    } = f, T = Rn(u.props);
    let { dynamicChildren: I } = u;
    const L = (A, N, B) => {
      A.shapeFlag & 16 && y(
        A.children,
        N,
        B,
        b,
        O,
        d,
        w,
        a
      );
    }, M = (A = u) => {
      const N = Rn(A.props), B = A.target = Na(A.props, C), z = Da(B, A, k, j);
      B && (d !== "svg" && Mc(B) ? d = "svg" : d !== "mathml" && Hc(B) && (d = "mathml"), b && b.isCE && (b.ce._teleportTargets || (b.ce._teleportTargets = /* @__PURE__ */ new Set())).add(B), N || (L(A, B, z), Ji(A, !1)));
    }, H = (A) => {
      const N = () => {
        if (on.get(A) === N) {
          if (on.delete(A), Rn(A.props)) {
            const B = P(A.el) || p;
            L(A, B, A.anchor), Ji(A, !0);
          }
          M(A);
        }
      };
      on.set(A, N), Pt(N, O);
    };
    if (o == null) {
      const A = u.el = k(""), N = u.anchor = k("");
      if (j(A, p, _), j(N, p, _), Hy(u.props) || O && O.pendingBranch) {
        H(u);
        return;
      }
      T && (L(u, p, N), Ji(u, !0)), M();
    } else {
      u.el = o.el;
      const A = u.anchor = o.anchor, N = on.get(o);
      if (N) {
        N.flags |= 8, on.delete(o), H(u);
        return;
      }
      u.targetStart = o.targetStart;
      const B = u.target = o.target, z = u.targetAnchor = o.targetAnchor, V = Rn(o.props), Y = V ? p : B, J = V ? A : z;
      if (d === "svg" || Mc(B) ? d = "svg" : (d === "mathml" || Hc(B)) && (d = "mathml"), I ? (v(
        o.dynamicChildren,
        I,
        Y,
        b,
        O,
        d,
        w
      ), ul(o, u, !0)) : a || m(
        o,
        u,
        Y,
        J,
        b,
        O,
        d,
        w,
        !1
      ), T)
        V ? u.props && o.props && u.props.to !== o.props.to && (u.props.to = o.props.to) : Io(
          u,
          p,
          A,
          f,
          1
        );
      else if ((u.props && u.props.to) !== (o.props && o.props.to)) {
        const Z = Na(u.props, C);
        Z && (u.target = Z, Io(
          u,
          Z,
          null,
          f,
          0
        ));
      } else V && Io(
        u,
        B,
        z,
        f,
        1
      );
      Ji(u, T);
    }
  },
  remove(o, u, p, { um: _, o: { remove: b } }, O) {
    const {
      shapeFlag: d,
      children: w,
      anchor: a,
      targetStart: f,
      targetAnchor: y,
      target: m,
      props: v
    } = o, j = Rn(v), C = O || !j, k = on.get(o);
    if (k && (k.flags |= 8, on.delete(o)), m && (b(f), b(y)), O && b(a), !k && (j || m) && d & 16)
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
  hydrate: zy
};
function Io(o, u, p, { o: { insert: _ }, m: b }, O = 2) {
  O === 0 && _(o.targetAnchor, u, p);
  const { el: d, anchor: w, shapeFlag: a, children: f, props: y } = o, m = O === 2;
  if (m && _(d, u, p), !on.has(o) && (!m || Rn(y)) && a & 16)
    for (let v = 0; v < f.length; v++)
      b(
        f[v],
        u,
        p,
        2
      );
  m && _(w, u, p);
}
function zy(o, u, p, _, b, O, {
  o: { nextSibling: d, parentNode: w, querySelector: a, insert: f, createText: y }
}, m) {
  function v(E, P) {
    let T = P;
    for (; T; ) {
      if (T && T.nodeType === 8) {
        if (T.data === "teleport start anchor")
          u.targetStart = T;
        else if (T.data === "teleport anchor") {
          u.targetAnchor = T, E._lpa = u.targetAnchor && d(u.targetAnchor);
          break;
        }
      }
      T = d(T);
    }
  }
  function j(E, P) {
    P.anchor = m(
      d(E),
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
  ), k = Rn(u.props);
  if (C) {
    const E = C._lpa || C.firstChild;
    u.shapeFlag & 16 && (k ? (j(o, u), v(C, E), u.targetAnchor || Da(
      C,
      u,
      y,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      w(o) === C ? o : null
    )) : (u.anchor = d(o), v(C, E), u.targetAnchor || Da(C, u, y, f), m(
      E && d(E),
      u,
      C,
      p,
      _,
      b,
      O
    ))), Ji(u, k);
  } else k && u.shapeFlag & 16 && (j(o, u), u.targetStart = o, u.targetAnchor = d(o));
  return u.anchor && d(u.anchor);
}
const qy = Vy;
function Ji(o, u) {
  const p = o.ctx;
  if (p && p.ut) {
    let _, b;
    for (u ? (_ = o.el, b = o.anchor) : (_ = o.targetStart, b = o.targetAnchor); _ && _ !== b; )
      _.nodeType === 1 && _.setAttribute("data-v-owner", p.uid), _ = _.nextSibling;
    p.ut();
  }
}
function Da(o, u, p, _, b = null) {
  const O = u.targetStart = p(""), d = u.targetAnchor = p("");
  return O[$u] = d, o && (_(O, o, b), _(d, o, b)), d;
}
const ka = /* @__PURE__ */ Symbol("_leaveCb");
function $y(o) {
  let u = o[0];
  if (o.length > 1) {
    for (const p of o)
      if (p.type !== Dr) {
        u = p;
        break;
      }
  }
  return u;
}
function Uu(o) {
  if (!ol(o))
    return ns(o.type) && o.children ? $y(o.children) : o;
  if (o.component)
    return o.component.subTree;
  const { shapeFlag: u, children: p } = o;
  if (p) {
    if (u & 16)
      return p[0];
    if (u & 32 && qe(p.default))
      return p.default();
  }
}
function il(o, u) {
  if (o.shapeFlag & 6 && o.component) {
    o.transition = u;
    const p = o.component.subTree;
    il(
      ns(p.type) && Uu(p) || p,
      u
    );
  } else o.shapeFlag & 128 ? (o.ssContent.transition = u.clone(o.ssContent), o.ssFallback.transition = u.clone(o.ssFallback)) : o.transition = u;
}
function Gu(o) {
  o.ids = [o.ids[0] + o.ids[2]++ + "-", 0, 0];
}
function Vc(o, u) {
  let p;
  return !!((p = Object.getOwnPropertyDescriptor(o, u)) && !p.configurable);
}
const Uo = /* @__PURE__ */ new WeakMap();
function ro(o, u, p, _, b = !1) {
  if (Me(o)) {
    o.forEach(
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
    _.shapeFlag & 512 && _.type.__asyncResolved && _.component.subTree.component && ro(o, u, p, _.component.subTree);
    return;
  }
  const O = _.shapeFlag & 4 ? as(_.component) : _.el, d = b ? null : O, { i: w, r: a } = o, f = u && u.r, y = w.refs === at ? w.refs = {} : w.refs, m = w.setupState, v = /* @__PURE__ */ Xe(m), j = m === at ? pu : (k) => Vc(y, k) ? !1 : et(v, k), C = (k, E) => !(E && Vc(y, E));
  if (f != null && f !== a) {
    if (zc(u), ht(f))
      y[f] = null, j(f) && (m[f] = null);
    else if (/* @__PURE__ */ kt(f)) {
      const k = u;
      C(f, k.k) && (f.value = null), k.k && (y[k.k] = null);
    }
  }
  if (qe(a))
    po(a, w, 12, [d, y]);
  else {
    const k = ht(a), E = /* @__PURE__ */ kt(a);
    if (k || E) {
      const P = () => {
        if (o.f) {
          const T = k ? j(a) ? m[a] : y[a] : C() || !o.k ? a.value : y[o.k];
          if (b)
            Me(T) && Ga(T, O);
          else if (Me(T))
            T.includes(O) || T.push(O);
          else if (k)
            y[a] = [O], j(a) && (m[a] = y[a]);
          else {
            const I = [O];
            C(a, o.k) && (a.value = I), o.k && (y[o.k] = I);
          }
        } else k ? (y[a] = d, j(a) && (m[a] = d)) : E && (C(a, o.k) && (a.value = d), o.k && (y[o.k] = d));
      };
      if (d) {
        const T = () => {
          P(), Uo.delete(o);
        };
        T.id = -1, Uo.set(o, T), Pt(T, p);
      } else
        zc(o), P();
    }
  }
}
function zc(o) {
  const u = Uo.get(o);
  u && (u.flags |= 8, Uo.delete(o));
}
Xo().requestIdleCallback;
Xo().cancelIdleCallback;
const no = (o) => !!o.type.__asyncLoader, ol = (o) => o.type.__isKeepAlive;
function Uy(o, u) {
  Wu(o, "a", u);
}
function Gy(o, u) {
  Wu(o, "da", u);
}
function Wu(o, u, p = Lt) {
  const _ = o.__wdc || (o.__wdc = () => {
    let b = p;
    for (; b; ) {
      if (b.isDeactivated)
        return;
      b = b.parent;
    }
    return o();
  });
  if (is(u, _, p), p) {
    let b = p.parent;
    for (; b && b.parent; )
      ol(b.parent.vnode) && Wy(_, u, p, b), b = b.parent;
  }
}
function Wy(o, u, p, _) {
  const b = is(
    u,
    o,
    _,
    !0
    /* prepend */
  );
  Ju(() => {
    Ga(_[u], b);
  }, p);
}
function is(o, u, p = Lt, _ = !1) {
  if (p) {
    const b = p[o] || (p[o] = []), O = u.__weh || (u.__weh = (...d) => {
      Br();
      const w = fo(p), a = tr(u, p, o, d);
      return w(), Nr(), a;
    });
    return _ ? b.unshift(O) : b.push(O), O;
  }
}
const Fr = (o) => (u, p = Lt) => {
  (!uo || o === "sp") && is(o, (..._) => u(..._), p);
}, Jy = Fr("bm"), sl = Fr("m"), Ky = Fr(
  "bu"
), Zy = Fr("u"), al = Fr(
  "bum"
), Ju = Fr("um"), Yy = Fr(
  "sp"
), Qy = Fr("rtg"), Xy = Fr("rtc");
function em(o, u = Lt) {
  is("ec", o, u);
}
const tm = /* @__PURE__ */ Symbol.for("v-ndc");
function rm(o, u, p, _) {
  let b;
  const O = p, d = Me(o);
  if (d || ht(o)) {
    const w = d && /* @__PURE__ */ ln(o);
    let a = !1, f = !1;
    w && (a = !/* @__PURE__ */ Ft(o), f = /* @__PURE__ */ _r(o), o = ts(o)), b = new Array(o.length);
    for (let y = 0, m = o.length; y < m; y++)
      b[y] = u(
        a ? f ? cn(Mt(o[y])) : Mt(o[y]) : o[y],
        y,
        void 0,
        O
      );
  } else if (typeof o == "number") {
    b = new Array(o);
    for (let w = 0; w < o; w++)
      b[w] = u(w + 1, w, void 0, O);
  } else if (rt(o))
    if (o[Symbol.iterator])
      b = Array.from(
        o,
        (w, a) => u(w, a, void 0, O)
      );
    else {
      const w = Object.keys(o);
      b = new Array(w.length);
      for (let a = 0, f = w.length; a < f; a++) {
        const y = w[a];
        b[a] = u(o[y], y, a, O);
      }
    }
  else
    b = [];
  return b;
}
const Fa = (o) => o ? mh(o) ? as(o) : Fa(o.parent) : null, io = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xt(/* @__PURE__ */ Object.create(null), {
    $: (o) => o,
    $el: (o) => o.vnode.el,
    $data: (o) => o.data,
    $props: (o) => o.props,
    $attrs: (o) => o.attrs,
    $slots: (o) => o.slots,
    $refs: (o) => o.refs,
    $parent: (o) => Fa(o.parent),
    $root: (o) => Fa(o.root),
    $host: (o) => o.ce,
    $emit: (o) => o.emit,
    $options: (o) => Zu(o),
    $forceUpdate: (o) => o.f || (o.f = () => {
      nl(o.update);
    }),
    $nextTick: (o) => o.n || (o.n = Fn.bind(o.proxy)),
    $watch: (o) => My.bind(o)
  })
), xa = (o, u) => o !== at && !o.__isScriptSetup && et(o, u), nm = {
  get({ _: o }, u) {
    if (u === "__v_skip")
      return !0;
    const { ctx: p, setupState: _, data: b, props: O, accessCache: d, type: w, appContext: a } = o;
    if (u[0] !== "$") {
      const v = d[u];
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
          return d[u] = 1, _[u];
        if (b !== at && et(b, u))
          return d[u] = 2, b[u];
        if (et(O, u))
          return d[u] = 3, O[u];
        if (p !== at && et(p, u))
          return d[u] = 4, p[u];
        Ma && (d[u] = 0);
      }
    }
    const f = io[u];
    let y, m;
    if (f)
      return u === "$attrs" && jt(o.attrs, "get", ""), f(o);
    if (
      // css module (injected by vue-loader)
      (y = w.__cssModules) && (y = y[u])
    )
      return y;
    if (p !== at && et(p, u))
      return d[u] = 4, p[u];
    if (
      // global properties
      m = a.config.globalProperties, et(m, u)
    )
      return m[u];
  },
  set({ _: o }, u, p) {
    const { data: _, setupState: b, ctx: O } = o;
    return xa(b, u) ? (b[u] = p, !0) : _ !== at && et(_, u) ? (_[u] = p, !0) : et(o.props, u) || u[0] === "$" && u.slice(1) in o ? !1 : (O[u] = p, !0);
  },
  has({
    _: { data: o, setupState: u, accessCache: p, ctx: _, appContext: b, props: O, type: d }
  }, w) {
    let a;
    return !!(p[w] || o !== at && w[0] !== "$" && et(o, w) || xa(u, w) || et(O, w) || et(_, w) || et(io, w) || et(b.config.globalProperties, w) || (a = d.__cssModules) && a[w]);
  },
  defineProperty(o, u, p) {
    return p.get != null ? o._.accessCache[u] = 0 : et(p, "value") && this.set(o, u, p.value, null), Reflect.defineProperty(o, u, p);
  }
};
function qc(o) {
  return Me(o) ? o.reduce(
    (u, p) => (u[p] = null, u),
    {}
  ) : o;
}
let Ma = !0;
function im(o) {
  const u = Zu(o), p = o.proxy, _ = o.ctx;
  Ma = !1, u.beforeCreate && $c(u.beforeCreate, o, "bc");
  const {
    // state
    data: b,
    computed: O,
    methods: d,
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
    errorCaptured: N,
    serverPrefetch: B,
    // public API
    expose: z,
    inheritAttrs: V,
    // assets
    components: Y,
    directives: J,
    filters: Z
  } = u;
  if (f && om(f, _, null), d)
    for (const ne in d) {
      const ye = d[ne];
      qe(ye) && (_[ne] = ye.bind(p));
    }
  if (b) {
    const ne = b.call(p, p);
    rt(ne) && (o.data = /* @__PURE__ */ el(ne));
  }
  if (Ma = !0, O)
    for (const ne in O) {
      const ye = O[ne], ue = qe(ye) ? ye.bind(p, p) : qe(ye.get) ? ye.get.bind(p, p) : vr, je = !qe(ye) && qe(ye.set) ? ye.set.bind(p) : vr, Ee = qa({
        get: ue,
        set: je
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
      Ku(w[ne], _, p, ne);
  if (a) {
    const ne = qe(a) ? a.call(p) : a;
    Reflect.ownKeys(ne).forEach((ye) => {
      Ny(ye, ne[ye]);
    });
  }
  y && $c(y, o, "c");
  function oe(ne, ye) {
    Me(ye) ? ye.forEach((ue) => ne(ue.bind(p))) : ye && ne(ye.bind(p));
  }
  if (oe(Jy, m), oe(sl, v), oe(Ky, j), oe(Zy, C), oe(Uy, k), oe(Gy, E), oe(em, N), oe(Xy, H), oe(Qy, A), oe(al, T), oe(Ju, L), oe(Yy, B), Me(z))
    if (z.length) {
      const ne = o.exposed || (o.exposed = {});
      z.forEach((ye) => {
        Object.defineProperty(ne, ye, {
          get: () => p[ye],
          set: (ue) => p[ye] = ue,
          enumerable: !0
        });
      });
    } else o.exposed || (o.exposed = {});
  M && o.render === vr && (o.render = M), V != null && (o.inheritAttrs = V), Y && (o.components = Y), J && (o.directives = J), B && Gu(o);
}
function om(o, u, p = vr) {
  Me(o) && (o = Ha(o));
  for (const _ in o) {
    const b = o[_];
    let O;
    rt(b) ? "default" in b ? O = Mo(
      b.from || _,
      b.default,
      !0
    ) : O = Mo(b.from || _) : O = Mo(b), /* @__PURE__ */ kt(O) ? Object.defineProperty(u, _, {
      enumerable: !0,
      configurable: !0,
      get: () => O.value,
      set: (d) => O.value = d
    }) : u[_] = O;
  }
}
function $c(o, u, p) {
  tr(
    Me(o) ? o.map((_) => _.bind(u.proxy)) : o.bind(u.proxy),
    u,
    p
  );
}
function Ku(o, u, p, _) {
  let b = _.includes(".") ? qu(p, _) : () => p[_];
  if (ht(o)) {
    const O = u[o];
    qe(O) && to(b, O);
  } else if (qe(o))
    to(b, o.bind(p));
  else if (rt(o))
    if (Me(o))
      o.forEach((O) => Ku(O, u, p, _));
    else {
      const O = qe(o.handler) ? o.handler.bind(p) : u[o.handler];
      qe(O) && to(b, O, o);
    }
}
function Zu(o) {
  const u = o.type, { mixins: p, extends: _ } = u, {
    mixins: b,
    optionsCache: O,
    config: { optionMergeStrategies: d }
  } = o.appContext, w = O.get(u);
  let a;
  return w ? a = w : !b.length && !p && !_ ? a = u : (a = {}, b.length && b.forEach(
    (f) => Go(a, f, d, !0)
  ), Go(a, u, d)), rt(u) && O.set(u, a), a;
}
function Go(o, u, p, _ = !1) {
  const { mixins: b, extends: O } = u;
  O && Go(o, O, p, !0), b && b.forEach(
    (d) => Go(o, d, p, !0)
  );
  for (const d in u)
    if (!(_ && d === "expose")) {
      const w = sm[d] || p && p[d];
      o[d] = w ? w(o[d], u[d]) : u[d];
    }
  return o;
}
const sm = {
  data: Uc,
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
  watch: lm,
  // provide / inject
  provide: Uc,
  inject: am
};
function Uc(o, u) {
  return u ? o ? function() {
    return xt(
      qe(o) ? o.call(this, this) : o,
      qe(u) ? u.call(this, this) : u
    );
  } : u : o;
}
function am(o, u) {
  return Ki(Ha(o), Ha(u));
}
function Ha(o) {
  if (Me(o)) {
    const u = {};
    for (let p = 0; p < o.length; p++)
      u[o[p]] = o[p];
    return u;
  }
  return o;
}
function St(o, u) {
  return o ? [...new Set([].concat(o, u))] : u;
}
function Ki(o, u) {
  return o ? xt(/* @__PURE__ */ Object.create(null), o, u) : u;
}
function Gc(o, u) {
  return o ? Me(o) && Me(u) ? [.../* @__PURE__ */ new Set([...o, ...u])] : xt(
    /* @__PURE__ */ Object.create(null),
    qc(o),
    qc(u ?? {})
  ) : u;
}
function lm(o, u) {
  if (!o) return u;
  if (!u) return o;
  const p = xt(/* @__PURE__ */ Object.create(null), o);
  for (const _ in u)
    p[_] = St(o[_], u[_]);
  return p;
}
function Yu() {
  return {
    app: null,
    config: {
      isNativeTag: pu,
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
let cm = 0;
function um(o, u) {
  return function(_, b = null) {
    qe(_) || (_ = xt({}, _)), b != null && !rt(b) && (b = null);
    const O = Yu(), d = /* @__PURE__ */ new WeakSet(), w = [];
    let a = !1;
    const f = O.app = {
      _uid: cm++,
      _component: _,
      _props: b,
      _container: null,
      _context: O,
      _instance: null,
      version: Vm,
      get config() {
        return O.config;
      },
      set config(y) {
      },
      use(y, ...m) {
        return d.has(y) || (y && qe(y.install) ? (d.add(y), y.install(f, ...m)) : qe(y) && (d.add(y), y(f, ...m))), f;
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
          return j.appContext = O, v === !0 ? v = "svg" : v === !1 && (v = void 0), o(j, y, v), a = !0, f._container = y, y.__vue_app__ = f, as(j.component);
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
        ), o(null, f._container), delete f._container.__vue_app__);
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
const hm = (o, u) => u === "modelValue" || u === "model-value" ? o.modelModifiers : o[`${u}Modifiers`] || o[`${Xt(u)}Modifiers`] || o[`${un(u)}Modifiers`];
function dm(o, u, ...p) {
  if (o.isUnmounted) return;
  const _ = o.vnode.props || at;
  let b = p;
  const O = u.startsWith("update:"), d = O && hm(_, u.slice(7));
  d && (d.trim && (b = p.map((y) => ht(y) ? y.trim() : y)), d.number && (b = b.map(Ja)));
  let w, a = _[w = va(u)] || // also try camelCase event handler (#2249)
  _[w = va(Xt(u))];
  !a && O && (a = _[w = va(un(u))]), a && tr(
    a,
    o,
    6,
    b
  );
  const f = _[w + "Once"];
  if (f) {
    if (!o.emitted)
      o.emitted = {};
    else if (o.emitted[w])
      return;
    o.emitted[w] = !0, tr(
      f,
      o,
      6,
      b
    );
  }
}
const pm = /* @__PURE__ */ new WeakMap();
function Qu(o, u, p = !1) {
  const _ = p ? pm : u.emitsCache, b = _.get(o);
  if (b !== void 0)
    return b;
  const O = o.emits;
  let d = {}, w = !1;
  if (!qe(o)) {
    const a = (f) => {
      const y = Qu(f, u, !0);
      y && (w = !0, xt(d, y));
    };
    !p && u.mixins.length && u.mixins.forEach(a), o.extends && a(o.extends), o.mixins && o.mixins.forEach(a);
  }
  return !O && !w ? (rt(o) && _.set(o, null), null) : (Me(O) ? O.forEach((a) => d[a] = null) : xt(d, O), rt(o) && _.set(o, d), d);
}
function os(o, u) {
  return !o || !Zo(u) ? !1 : (u = u.slice(2), u = u === "Once" ? u : u.replace(/Once$/, ""), et(o, u[0].toLowerCase() + u.slice(1)) || et(o, un(u)) || et(o, u));
}
function Wc(o) {
  const {
    type: u,
    vnode: p,
    proxy: _,
    withProxy: b,
    propsOptions: [O],
    slots: d,
    attrs: w,
    emit: a,
    render: f,
    renderCache: y,
    props: m,
    data: v,
    setupState: j,
    ctx: C,
    inheritAttrs: k
  } = o, E = $o(o);
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
          { attrs: w, slots: d, emit: a }
        ) : L(
          m,
          null
        )
      ), T = u.props ? w : fm(w);
    }
  } catch (L) {
    Mn.length = 0, rs(L, o, 1), P = Ir(Dr);
  }
  let I = P;
  if (T && k !== !1) {
    const L = Object.keys(T), { shapeFlag: M } = I;
    L.length && M & 7 && (O && L.some(Yo) && (T = ym(
      T,
      O
    )), I = Ri(I, T, !1, !0));
  }
  if (p.dirs && (I = Ri(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(p.dirs) : p.dirs), p.transition) {
    const L = ns(I.type) && Uu(I) || I;
    il(L, p.transition);
  }
  return P = I, $o(E), P;
}
const fm = (o) => {
  let u;
  for (const p in o)
    (p === "class" || p === "style" || Zo(p)) && ((u || (u = {}))[p] = o[p]);
  return u;
}, ym = (o, u) => {
  const p = {};
  for (const _ in o)
    (!Yo(_) || !(_.slice(9) in u)) && (p[_] = o[_]);
  return p;
};
function mm(o, u, p) {
  const { props: _, children: b, component: O } = o, { props: d, children: w, patchFlag: a } = u, f = O.emitsOptions;
  if (u.dirs || u.transition)
    return !0;
  if (p && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return _ ? Jc(_, d, f) : !!d;
    if (a & 8) {
      const y = u.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        const v = y[m];
        if (Xu(d, _, v) && !os(f, v))
          return !0;
      }
    }
  } else
    return (b || w) && (!w || !w.$stable) ? !0 : _ === d ? !1 : _ ? d ? Jc(_, d, f) : !0 : !!d;
  return !1;
}
function Jc(o, u, p) {
  const _ = Object.keys(u);
  if (_.length !== Object.keys(o).length)
    return !0;
  for (let b = 0; b < _.length; b++) {
    const O = _[b];
    if (Xu(u, o, O) && !os(p, O))
      return !0;
  }
  return !1;
}
function Xu(o, u, p) {
  const _ = o[p], b = u[p];
  return p === "style" && rt(_) && rt(b) ? !es(_, b) : _ !== b;
}
function bm({ vnode: o, parent: u, suspense: p }, _) {
  for (; u; ) {
    const b = u.subTree;
    if (b.suspense && b.suspense.activeBranch === o && (b.suspense.vnode.el = b.el = _, o = b), b === o)
      (o = u.vnode).el = _, u = u.parent;
    else
      break;
  }
  p && p.activeBranch === o && (p.vnode.el = _);
}
const eh = {}, th = () => Object.create(eh), rh = (o) => Object.getPrototypeOf(o) === eh;
function vm(o, u, p, _ = !1) {
  const b = {}, O = th();
  o.propsDefaults = /* @__PURE__ */ Object.create(null), nh(o, u, b, O);
  for (const d in o.propsOptions[0])
    d in b || (b[d] = void 0);
  p ? o.props = _ ? b : /* @__PURE__ */ wy(b) : o.type.props ? o.props = b : o.props = O, o.attrs = O;
}
function gm(o, u, p, _) {
  const {
    props: b,
    attrs: O,
    vnode: { patchFlag: d }
  } = o, w = /* @__PURE__ */ Xe(b), [a] = o.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (_ || d > 0) && !(d & 16)
  ) {
    if (d & 8) {
      const y = o.vnode.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        let v = y[m];
        if (os(o.emitsOptions, v))
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
              o,
              !1
            );
          }
        else
          j !== O[v] && (O[v] = j, f = !0);
      }
    }
  } else {
    nh(o, u, b, O) && (f = !0);
    let y;
    for (const m in w)
      (!u || // for camelCase
      !et(u, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = un(m)) === m || !et(u, y))) && (a ? p && // for camelCase
      (p[m] !== void 0 || // for kebab-case
      p[y] !== void 0) && (b[m] = Va(
        a,
        w,
        m,
        void 0,
        o,
        !0
      )) : delete b[m]);
    if (O !== w)
      for (const m in O)
        (!u || !et(u, m)) && (delete O[m], f = !0);
  }
  f && Ar(o.attrs, "set", "");
}
function nh(o, u, p, _) {
  const [b, O] = o.propsOptions;
  let d = !1, w;
  if (u)
    for (let a in u) {
      if (Yi(a))
        continue;
      const f = u[a];
      let y;
      b && et(b, y = Xt(a)) ? !O || !O.includes(y) ? p[y] = f : (w || (w = {}))[y] = f : os(o.emitsOptions, a) || (!(a in _) || f !== _[a]) && (_[a] = f, d = !0);
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
        o,
        !et(f, m)
      );
    }
  }
  return d;
}
function Va(o, u, p, _, b, O) {
  const d = o[p];
  if (d != null) {
    const w = et(d, "default");
    if (w && _ === void 0) {
      const a = d.default;
      if (d.type !== Function && !d.skipFactory && qe(a)) {
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
    d[
      0
      /* shouldCast */
    ] && (O && !w ? _ = !1 : d[
      1
      /* shouldCastTrue */
    ] && (_ === "" || _ === un(p)) && (_ = !0));
  }
  return _;
}
const _m = /* @__PURE__ */ new WeakMap();
function ih(o, u, p = !1) {
  const _ = p ? _m : u.propsCache, b = _.get(o);
  if (b)
    return b;
  const O = o.props, d = {}, w = [];
  let a = !1;
  if (!qe(o)) {
    const y = (m) => {
      a = !0;
      const [v, j] = ih(m, u, !0);
      xt(d, v), j && w.push(...j);
    };
    !p && u.mixins.length && u.mixins.forEach(y), o.extends && y(o.extends), o.mixins && o.mixins.forEach(y);
  }
  if (!O && !a)
    return rt(o) && _.set(o, In), In;
  if (Me(O))
    for (let y = 0; y < O.length; y++) {
      const m = Xt(O[y]);
      Kc(m) && (d[m] = at);
    }
  else if (O)
    for (const y in O) {
      const m = Xt(y);
      if (Kc(m)) {
        const v = O[y], j = d[m] = Me(v) || qe(v) ? { type: v } : xt({}, v), C = j.type;
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
  const f = [d, w];
  return rt(o) && _.set(o, f), f;
}
function Kc(o) {
  return o[0] !== "$" && !Yi(o);
}
const ll = (o) => o === "_" || o === "_ctx" || o === "$stable", cl = (o) => Me(o) ? o.map(mr) : [mr(o)], wm = (o, u, p) => {
  if (u._n)
    return u;
  const _ = Iy((...b) => cl(u(...b)), p);
  return _._c = !1, _;
}, oh = (o, u, p) => {
  const _ = o._ctx;
  for (const b in o) {
    if (ll(b)) continue;
    const O = o[b];
    if (qe(O))
      u[b] = wm(b, O, _);
    else if (O != null) {
      const d = cl(O);
      u[b] = () => d;
    }
  }
}, sh = (o, u) => {
  const p = cl(u);
  o.slots.default = () => p;
}, ah = (o, u, p) => {
  for (const _ in u)
    (p || !ll(_)) && (o[_] = u[_]);
}, jm = (o, u, p) => {
  const _ = o.slots = th();
  if (o.vnode.shapeFlag & 32) {
    const b = u._;
    b ? (ah(_, u, p), p && vu(_, "_", b, !0)) : oh(u, _);
  } else u && sh(o, u);
}, km = (o, u, p) => {
  const { vnode: _, slots: b } = o;
  let O = !0, d = at;
  if (_.shapeFlag & 32) {
    const w = u._;
    w ? p && w === 1 ? O = !1 : ah(b, u, p) : (O = !u.$stable, oh(u, b)), d = u;
  } else u && (sh(o, u), d = { default: 1 });
  if (O)
    for (const w in b)
      !ll(w) && d[w] == null && delete b[w];
}, Pt = Sm;
function xm(o) {
  return Om(o);
}
function Om(o, u) {
  const p = Xo();
  p.__VUE__ = !0;
  const {
    insert: _,
    remove: b,
    patchProp: O,
    createElement: d,
    createText: w,
    createComment: a,
    setText: f,
    setElementText: y,
    parentNode: m,
    nextSibling: v,
    setScopeId: j = vr,
    insertStaticContent: C
  } = o, k = (R, F, W, Q = null, X = null, ee = null, de = void 0, pe = null, ce = !!F.dynamicChildren) => {
    if (R === F)
      return;
    R && !Wi(R, F) && (Q = Ye(R), Se(R, X, ee, !0), R = null), F.patchFlag === -2 && (ce = !1, F.dynamicChildren = null), F.dynamicChildren && R && R.dynamicChildren && R.dynamicChildren.hasOnce && (F.dynamicChildren === In && (F.dynamicChildren = []), F.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: ke, shapeFlag: be } = F;
    switch (ie) {
      case ss:
        E(R, F, W, Q);
        break;
      case Dr:
        P(R, F, W, Q);
        break;
      case Ca:
        R == null && T(F, W, Q, de);
        break;
      case Nt:
        Y(
          R,
          F,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce
        );
        break;
      default:
        be & 1 ? M(
          R,
          F,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce
        ) : be & 6 ? J(
          R,
          F,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce
        ) : (be & 64 || be & 128) && ie.process(
          R,
          F,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce,
          Te
        );
    }
    ke != null && X ? ro(ke, R && R.ref, ee, F || R, !F) : ke == null && R && R.ref != null && ro(R.ref, null, ee, R, !0);
  }, E = (R, F, W, Q) => {
    if (R == null)
      _(
        F.el = w(F.children),
        W,
        Q
      );
    else {
      const X = F.el = R.el;
      F.children !== R.children && f(X, F.children);
    }
  }, P = (R, F, W, Q) => {
    R == null ? _(
      F.el = a(F.children || ""),
      W,
      Q
    ) : F.el = R.el;
  }, T = (R, F, W, Q) => {
    [R.el, R.anchor] = C(
      R.children,
      F,
      W,
      Q,
      R.el,
      R.anchor
    );
  }, I = ({ el: R, anchor: F }, W, Q) => {
    let X;
    for (; R && R !== F; )
      X = v(R), _(R, W, Q), R = X;
    _(F, W, Q);
  }, L = ({ el: R, anchor: F }) => {
    let W;
    for (; R && R !== F; )
      W = v(R), b(R), R = W;
    b(F);
  }, M = (R, F, W, Q, X, ee, de, pe, ce) => {
    if (F.type === "svg" ? de = "svg" : F.type === "math" && (de = "mathml"), R == null)
      H(
        F,
        W,
        Q,
        X,
        ee,
        de,
        pe,
        ce
      );
    else {
      const ie = R.el && R.el._isVueCE ? R.el : null;
      try {
        ie && ie._beginPatch(), B(
          R,
          F,
          X,
          ee,
          de,
          pe,
          ce
        );
      } finally {
        ie && ie._endPatch();
      }
    }
  }, H = (R, F, W, Q, X, ee, de, pe) => {
    let ce, ie;
    const { props: ke, shapeFlag: be, transition: Ce, dirs: re } = R;
    if (ce = R.el = d(
      R.type,
      ee,
      ke && ke.is,
      ke
    ), be & 8 ? y(ce, R.children) : be & 16 && N(
      R.children,
      ce,
      null,
      Q,
      X,
      Oa(R, ee),
      de,
      pe
    ), re && Pn(R, null, Q, "created"), A(ce, R, R.scopeId, de, Q), ke) {
      for (const he in ke)
        he !== "value" && !Yi(he) && O(ce, he, null, ke[he], ee, Q);
      "value" in ke && O(ce, "value", null, ke.value, ee), (ie = ke.onVnodeBeforeMount) && pr(ie, Q, R);
    }
    re && Pn(R, null, Q, "beforeMount");
    const ae = Cm(X, Ce);
    ae && Ce.beforeEnter(ce), _(ce, F, W), ((ie = ke && ke.onVnodeMounted) || ae || re) && Pt(() => {
      try {
        ie && pr(ie, Q, R), ae && Ce.enter(ce), re && Pn(R, null, Q, "mounted");
      } finally {
      }
    }, X);
  }, A = (R, F, W, Q, X) => {
    if (W && j(R, W), Q)
      for (let ee = 0; ee < Q.length; ee++)
        j(R, Q[ee]);
    if (X) {
      let ee = X.subTree;
      if (F === ee || uh(ee.type) && (ee.ssContent === F || ee.ssFallback === F)) {
        const de = X.vnode;
        A(
          R,
          de,
          de.scopeId,
          de.slotScopeIds,
          X.parent
        );
      }
    }
  }, N = (R, F, W, Q, X, ee, de, pe, ce = 0) => {
    for (let ie = ce; ie < R.length; ie++) {
      const ke = R[ie] = pe ? Lr(R[ie]) : mr(R[ie]);
      k(
        null,
        ke,
        F,
        W,
        Q,
        X,
        ee,
        de,
        pe
      );
    }
  }, B = (R, F, W, Q, X, ee, de) => {
    const pe = F.el = R.el;
    let { patchFlag: ce, dynamicChildren: ie, dirs: ke } = F;
    ce |= R.patchFlag & 16;
    const be = R.props || at, Ce = F.props || at;
    let re;
    if (W && Tn(W, !1), (re = Ce.onVnodeBeforeUpdate) && pr(re, W, F, R), ke && Pn(F, R, W, "beforeUpdate"), W && Tn(W, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!R.dynamicChildren || R.dynamicChildren.length !== ie.length) && (ce = 0, de = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && y(pe, ""), ie ? z(
      R.dynamicChildren,
      ie,
      pe,
      W,
      Q,
      Oa(F, X),
      ee
    ) : de || ye(
      R,
      F,
      pe,
      null,
      W,
      Q,
      Oa(F, X),
      ee,
      !1
    ), ce > 0) {
      if (ce & 16)
        V(pe, be, Ce, W, X);
      else if (ce & 2 && be.class !== Ce.class && O(pe, "class", null, Ce.class, X), ce & 4 && O(pe, "style", be.style, Ce.style, X), ce & 8) {
        const ae = F.dynamicProps;
        for (let he = 0; he < ae.length; he++) {
          const Oe = ae[he], Ae = be[Oe], ze = Ce[Oe];
          (ze !== Ae || Oe === "value") && O(pe, Oe, Ae, ze, X, W);
        }
      }
      ce & 1 && R.children !== F.children && y(pe, F.children);
    } else !de && ie == null && V(pe, be, Ce, W, X);
    ((re = Ce.onVnodeUpdated) || ke) && Pt(() => {
      re && pr(re, W, F, R), ke && Pn(F, R, W, "updated");
    }, Q);
  }, z = (R, F, W, Q, X, ee, de) => {
    for (let pe = 0; pe < F.length; pe++) {
      const ce = R[pe], ie = F[pe], ke = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ce.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ce.type === Nt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wi(ce, ie) || // - In the case of a component, it could contain anything.
        ce.shapeFlag & 198) ? m(ce.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      k(
        ce,
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
  }, V = (R, F, W, Q, X) => {
    if (F !== W) {
      if (F !== at)
        for (const ee in F)
          !Yi(ee) && !(ee in W) && O(
            R,
            ee,
            F[ee],
            null,
            X,
            Q
          );
      for (const ee in W) {
        if (Yi(ee)) continue;
        const de = W[ee], pe = F[ee];
        de !== pe && ee !== "value" && O(R, ee, pe, de, X, Q);
      }
      "value" in W && O(R, "value", F.value, W.value, X);
    }
  }, Y = (R, F, W, Q, X, ee, de, pe, ce) => {
    const ie = F.el = R ? R.el : w(""), ke = F.anchor = R ? R.anchor : w("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: re } = F;
    re && (pe = pe ? pe.concat(re) : re), R == null ? (_(ie, W, Q), _(ke, W, Q), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      F.children || [],
      W,
      ke,
      X,
      ee,
      de,
      pe,
      ce
    )) : be > 0 && be & 64 && Ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    R.dynamicChildren && R.dynamicChildren.length === Ce.length ? (z(
      R.dynamicChildren,
      Ce,
      W,
      X,
      ee,
      de,
      pe
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (F.key != null || X && F === X.subTree) && ul(
      R,
      F,
      !0
      /* shallow */
    )) : ye(
      R,
      F,
      W,
      ke,
      X,
      ee,
      de,
      pe,
      ce
    );
  }, J = (R, F, W, Q, X, ee, de, pe, ce) => {
    F.slotScopeIds = pe, R == null ? F.shapeFlag & 512 ? X.ctx.activate(
      F,
      W,
      Q,
      de,
      ce
    ) : Z(
      F,
      W,
      Q,
      X,
      ee,
      de,
      ce
    ) : le(R, F, ce);
  }, Z = (R, F, W, Q, X, ee, de) => {
    const pe = R.component = Im(
      R,
      Q,
      X
    );
    if (ol(R) && (pe.ctx.renderer = Te), Nm(pe, !1, de), pe.asyncDep) {
      if (X && X.registerDep(pe, oe, de), !R.el) {
        const ce = pe.subTree = Ir(Dr);
        P(null, ce, F, W), R.placeholder = ce.el;
      }
    } else
      oe(
        pe,
        R,
        F,
        W,
        X,
        ee,
        de
      );
  }, le = (R, F, W) => {
    const Q = F.component = R.component;
    if (mm(R, F, W))
      if (Q.asyncDep && !Q.asyncResolved) {
        F.el = R.el, ne(Q, F, W);
        return;
      } else
        Q.next = F, Q.update();
    else
      F.el = R.el, Q.vnode = F;
  }, oe = (R, F, W, Q, X, ee, de) => {
    const pe = () => {
      if (R.isMounted) {
        let { next: be, bu: Ce, u: re, parent: ae, vnode: he } = R;
        {
          const ut = lh(R);
          if (ut) {
            be && (be.el = he.el, ne(R, be, de)), ut.asyncDep.then(() => {
              Pt(() => {
                R.isUnmounted || ie();
              }, X);
            });
            return;
          }
        }
        let Oe = be, Ae;
        Tn(R, !1), be ? (be.el = he.el, ne(R, be, de)) : be = he, Ce && Fo(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && pr(Ae, ae, be, he), Tn(R, !0);
        const ze = Wc(R), nt = R.subTree;
        R.subTree = ze, k(
          nt,
          ze,
          // parent may have changed if it's in a teleport
          m(nt.el),
          // anchor may have changed if it's in a fragment
          Ye(nt),
          R,
          X,
          ee
        ), be.el = ze.el, Oe === null && bm(R, ze.el), re && Pt(re, X), (Ae = be.props && be.props.onVnodeUpdated) && Pt(
          () => pr(Ae, ae, be, he),
          X
        );
      } else {
        let be;
        const { el: Ce, props: re } = F, { bm: ae, m: he, parent: Oe, root: Ae, type: ze } = R, nt = no(F);
        Tn(R, !1), ae && Fo(ae), !nt && (be = re && re.onVnodeBeforeMount) && pr(be, Oe, F), Tn(R, !0);
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
            Q,
            R,
            X,
            ee
          ), F.el = ut.el;
        }
        if (he && Pt(he, X), !nt && (be = re && re.onVnodeMounted)) {
          const ut = F;
          Pt(
            () => pr(be, Oe, ut),
            X
          );
        }
        (F.shapeFlag & 256 || Oe && no(Oe.vnode) && Oe.vnode.shapeFlag & 256) && R.a && Pt(R.a, X), R.isMounted = !0, F = W = Q = null;
      }
    };
    R.scope.on();
    const ce = R.effect = new ju(pe);
    R.scope.off();
    const ie = R.update = ce.run.bind(ce), ke = R.job = ce.runIfDirty.bind(ce);
    ke.i = R, ke.id = R.uid, ce.scheduler = () => nl(ke), Tn(R, !0), ie();
  }, ne = (R, F, W) => {
    F.component = R;
    const Q = R.vnode.props;
    R.vnode = F, R.next = null, gm(R, F.props, Q, W), km(R, F.children, W), Br(), Fc(R), Nr();
  }, ye = (R, F, W, Q, X, ee, de, pe, ce = !1) => {
    const ie = R && R.children, ke = R ? R.shapeFlag : 0, be = F.children, { patchFlag: Ce, shapeFlag: re } = F;
    if (Ce > 0) {
      if (Ce & 128) {
        je(
          ie,
          be,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce
        );
        return;
      } else if (Ce & 256) {
        ue(
          ie,
          be,
          W,
          Q,
          X,
          ee,
          de,
          pe,
          ce
        );
        return;
      }
    }
    re & 8 ? (ke & 16 && Fe(ie, X, ee), be !== ie && y(W, be)) : ke & 16 ? re & 16 ? je(
      ie,
      be,
      W,
      Q,
      X,
      ee,
      de,
      pe,
      ce
    ) : Fe(ie, X, ee, !0) : (ke & 8 && y(W, ""), re & 16 && N(
      be,
      W,
      Q,
      X,
      ee,
      de,
      pe,
      ce
    ));
  }, ue = (R, F, W, Q, X, ee, de, pe, ce) => {
    R = R || In, F = F || In;
    const ie = R.length, ke = F.length, be = Math.min(ie, ke);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const re = F[Ce] = ce ? Lr(F[Ce]) : mr(F[Ce]);
      k(
        R[Ce],
        re,
        W,
        null,
        X,
        ee,
        de,
        pe,
        ce
      );
    }
    ie > ke ? Fe(
      R,
      X,
      ee,
      !0,
      !1,
      be
    ) : N(
      F,
      W,
      Q,
      X,
      ee,
      de,
      pe,
      ce,
      be
    );
  }, je = (R, F, W, Q, X, ee, de, pe, ce) => {
    let ie = 0;
    const ke = F.length;
    let be = R.length - 1, Ce = ke - 1;
    for (; ie <= be && ie <= Ce; ) {
      const re = R[ie], ae = F[ie] = ce ? Lr(F[ie]) : mr(F[ie]);
      if (Wi(re, ae))
        k(
          re,
          ae,
          W,
          null,
          X,
          ee,
          de,
          pe,
          ce
        );
      else
        break;
      ie++;
    }
    for (; ie <= be && ie <= Ce; ) {
      const re = R[be], ae = F[Ce] = ce ? Lr(F[Ce]) : mr(F[Ce]);
      if (Wi(re, ae))
        k(
          re,
          ae,
          W,
          null,
          X,
          ee,
          de,
          pe,
          ce
        );
      else
        break;
      be--, Ce--;
    }
    if (ie > be) {
      if (ie <= Ce) {
        const re = Ce + 1, ae = re < ke ? F[re].el : Q;
        for (; ie <= Ce; )
          k(
            null,
            F[ie] = ce ? Lr(F[ie]) : mr(F[ie]),
            W,
            ae,
            X,
            ee,
            de,
            pe,
            ce
          ), ie++;
      }
    } else if (ie > Ce)
      for (; ie <= be; )
        Se(R[ie], X, ee, !0), ie++;
    else {
      const re = ie, ae = ie, he = /* @__PURE__ */ new Map();
      for (ie = ae; ie <= Ce; ie++) {
        const Je = F[ie] = ce ? Lr(F[ie]) : mr(F[ie]);
        Je.key != null && he.set(Je.key, ie);
      }
      let Oe, Ae = 0;
      const ze = Ce - ae + 1;
      let nt = !1, ut = 0;
      const ft = new Array(ze);
      for (ie = 0; ie < ze; ie++) ft[ie] = 0;
      for (ie = re; ie <= be; ie++) {
        const Je = R[ie];
        if (Ae >= ze) {
          Se(Je, X, ee, !0);
          continue;
        }
        let Ze;
        if (Je.key != null)
          Ze = he.get(Je.key);
        else
          for (Oe = ae; Oe <= Ce; Oe++)
            if (ft[Oe - ae] === 0 && Wi(Je, F[Oe])) {
              Ze = Oe;
              break;
            }
        Ze === void 0 ? Se(Je, X, ee, !0) : (ft[Ze - ae] = ie + 1, Ze >= ut ? ut = Ze : nt = !0, k(
          Je,
          F[Ze],
          W,
          null,
          X,
          ee,
          de,
          pe,
          ce
        ), Ae++);
      }
      const yt = nt ? Em(ft) : In;
      for (Oe = yt.length - 1, ie = ze - 1; ie >= 0; ie--) {
        const Je = ae + ie, Ze = F[Je], wr = F[Je + 1], hn = Je + 1 < ke ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          wr.el || ch(wr)
        ) : Q;
        ft[ie] === 0 ? k(
          null,
          Ze,
          W,
          hn,
          X,
          ee,
          de,
          pe,
          ce
        ) : nt && (Oe < 0 || ie !== yt[Oe] ? Ee(Ze, W, hn, 2) : Oe--);
      }
    }
  }, Ee = (R, F, W, Q, X = null) => {
    const { el: ee, type: de, transition: pe, children: ce, shapeFlag: ie } = R;
    if (ie & 6) {
      Ee(R.component.subTree, F, W, Q);
      return;
    }
    if (ie & 128) {
      R.suspense.move(F, W, Q);
      return;
    }
    if (ie & 64) {
      de.move(R, F, W, Te);
      return;
    }
    if (de === Nt) {
      _(ee, F, W);
      for (let be = 0; be < ce.length; be++)
        Ee(ce[be], F, W, Q);
      _(R.anchor, F, W);
      return;
    }
    if (de === Ca) {
      I(R, F, W);
      return;
    }
    if (Q !== 2 && ie & 1 && pe)
      if (Q === 0)
        pe.persisted && !ee[ka] ? _(ee, F, W) : (pe.beforeEnter(ee), _(ee, F, W), Pt(() => pe.enter(ee), X));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: re } = pe, ae = () => {
          R.ctx.isUnmounted ? b(ee) : _(ee, F, W);
        }, he = () => {
          const Oe = ee._isLeaving || !!ee[ka];
          ee._isLeaving && ee[ka](
            !0
            /* cancelled */
          ), pe.persisted && !Oe ? ae() : be(ee, () => {
            ae(), re && re();
          });
        };
        Ce ? Ce(ee, ae, he) : he();
      }
    else
      _(ee, F, W);
  }, Se = (R, F, W, Q = !1, X = !1) => {
    const {
      type: ee,
      props: de,
      ref: pe,
      children: ce,
      dynamicChildren: ie,
      shapeFlag: ke,
      patchFlag: be,
      dirs: Ce,
      cacheIndex: re,
      memo: ae
    } = R;
    if ((be === -2 || ie && ie.hasOnce) && (X = !1), pe != null && (Br(), ro(pe, null, W, R, !0), Nr()), re != null && (!R.ctx || R.ctx === F) && (F.renderCache[re] = void 0), ke & 256) {
      F.ctx.deactivate(R);
      return;
    }
    const he = ke & 1 && Ce, Oe = !no(R);
    let Ae;
    if (Oe && (Ae = de && de.onVnodeBeforeUnmount) && pr(Ae, F, R), ke & 6)
      Pe(R.component, W, Q);
    else {
      if (ke & 128) {
        R.suspense.unmount(W, Q);
        return;
      }
      he && Pn(R, null, F, "beforeUnmount"), ke & 64 ? R.type.remove(
        R,
        F,
        W,
        Te,
        Q
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
      ) : (ee === Nt && be & 384 || !X && ke & 16) && Fe(ce, F, W), Q && me(R);
    }
    const ze = ae != null && re == null;
    (Oe && (Ae = de && de.onVnodeUnmounted) || he || ze) && Pt(() => {
      Ae && pr(Ae, F, R), he && Pn(R, null, F, "unmounted"), ze && (R.el = null);
    }, W);
  }, me = (R) => {
    const { type: F, el: W, anchor: Q, transition: X } = R;
    if (F === Nt) {
      Re(W, Q);
      return;
    }
    if (F === Ca) {
      L(R), X && !X.persisted && X.afterLeave && X.afterLeave();
      return;
    }
    const ee = () => {
      b(W), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (R.shapeFlag & 1 && X && !X.persisted) {
      const { leave: de, delayLeave: pe } = X, ce = () => de(W, ee);
      pe ? pe(R.el, ee, ce) : ce();
    } else
      ee();
  }, Re = (R, F) => {
    let W;
    for (; R !== F; )
      W = v(R), b(R), R = W;
    b(F);
  }, Pe = (R, F, W) => {
    const { bum: Q, scope: X, job: ee, subTree: de, um: pe, m: ce, a: ie } = R;
    Zc(ce), Zc(ie), Q && Fo(Q), X.stop(), ee ? (ee.flags |= 8, Se(de, R, F, W)) : R.vnode.el && de && (de.transition = R.vnode.transition, Se(de, R, F, W)), pe && Pt(pe, F), Pt(() => {
      R.isUnmounted = !0;
    }, F);
  }, Fe = (R, F, W, Q = !1, X = !1, ee = 0) => {
    for (let de = ee; de < R.length; de++)
      Se(R[de], F, W, Q, X);
  }, Ye = (R) => {
    if (R.shapeFlag & 6)
      return Ye(R.component.subTree);
    if (R.shapeFlag & 128)
      return R.suspense.next();
    const F = v(R.anchor || R.el), W = F && F[$u];
    return W ? v(W) : F;
  };
  let tt = !1;
  const Ve = (R, F, W) => {
    let Q;
    R == null ? F._vnode && (Se(F._vnode, null, null, !0), Q = F._vnode.component) : k(
      F._vnode || null,
      R,
      F,
      null,
      null,
      null,
      W
    ), F._vnode = R, tt || (tt = !0, Fc(Q), Mu(), tt = !1);
  }, Te = {
    p: k,
    um: Se,
    m: Ee,
    r: me,
    mt: Z,
    mc: N,
    pc: ye,
    pbc: z,
    n: Ye,
    o
  };
  return {
    render: Ve,
    hydrate: void 0,
    createApp: um(Ve)
  };
}
function Oa({ type: o, props: u }, p) {
  return p === "svg" && o === "foreignObject" || p === "mathml" && o === "annotation-xml" && u && u.encoding && u.encoding.includes("html") ? void 0 : p;
}
function Tn({ effect: o, job: u }, p) {
  p ? (o.flags |= 32, u.flags |= 4) : (o.flags &= -33, u.flags &= -5);
}
function Cm(o, u) {
  return (!o || o && !o.pendingBranch) && u && !u.persisted;
}
function ul(o, u, p = !1) {
  const _ = o.children, b = u.children;
  if (Me(_) && Me(b))
    for (let O = 0; O < _.length; O++) {
      const d = _[O];
      let w = b[O];
      w.shapeFlag & 1 && !w.dynamicChildren && ((w.patchFlag <= 0 || w.patchFlag === 32) && (w = b[O] = Lr(b[O]), w.el = d.el), !p && w.patchFlag !== -2 && ul(d, w)), w.type === ss && (w.patchFlag === -1 && (w = b[O] = Lr(w)), w.el = d.el), w.type === Dr && !w.el && (w.el = d.el);
    }
}
function Em(o) {
  const u = o.slice(), p = [0];
  let _, b, O, d, w;
  const a = o.length;
  for (_ = 0; _ < a; _++) {
    const f = o[_];
    if (f !== 0) {
      if (b = p[p.length - 1], o[b] < f) {
        u[_] = b, p.push(_);
        continue;
      }
      for (O = 0, d = p.length - 1; O < d; )
        w = O + d >> 1, o[p[w]] < f ? O = w + 1 : d = w;
      f < o[p[O]] && (O > 0 && (u[_] = p[O - 1]), p[O] = _);
    }
  }
  for (O = p.length, d = p[O - 1]; O-- > 0; )
    p[O] = d, d = u[d];
  return p;
}
function lh(o) {
  const u = o.subTree.component;
  if (u)
    return u.asyncDep && !u.asyncResolved ? u : lh(u);
}
function Zc(o) {
  if (o)
    for (let u = 0; u < o.length; u++)
      o[u].flags |= 8;
}
function ch(o) {
  if (o.placeholder)
    return o.placeholder;
  const u = o.component;
  return u ? ch(u.subTree) : null;
}
const uh = (o) => o.__isSuspense;
function Sm(o, u) {
  u && u.pendingBranch ? Me(o) ? u.effects.push(...o) : u.effects.push(o) : Ry(o);
}
const Nt = /* @__PURE__ */ Symbol.for("v-fgt"), ss = /* @__PURE__ */ Symbol.for("v-txt"), Dr = /* @__PURE__ */ Symbol.for("v-cmt"), Ca = /* @__PURE__ */ Symbol.for("v-stc"), Mn = [];
let Bt = null;
function Qt(o = !1) {
  Mn.push(Bt = o ? null : []);
}
function hh() {
  Mn.pop(), Bt = Mn[Mn.length - 1] || null;
}
let lo = 1;
function Yc(o, u = !1) {
  lo += o, o < 0 && Bt && u && (Bt.hasOnce = !0);
}
function dh(o) {
  return o.dynamicChildren = lo > 0 ? Bt || In : null, hh(), lo > 0 && Bt && Bt.push(o), o;
}
function Pr(o, u, p, _, b, O) {
  return dh(
    wt(
      o,
      u,
      p,
      _,
      b,
      O,
      !0
    )
  );
}
function ph(o, u, p, _, b) {
  return dh(
    Ir(
      o,
      u,
      p,
      _,
      b,
      !0
    )
  );
}
function fh(o) {
  return o ? o.__v_isVNode === !0 : !1;
}
function Wi(o, u) {
  return o.type === u.type && o.key === u.key;
}
const yh = ({ key: o }) => o ?? null, Ho = ({
  ref: o,
  ref_key: u,
  ref_for: p
}) => (typeof o == "number" && (o = "" + o), o != null ? ht(o) || /* @__PURE__ */ kt(o) || qe(o) ? { i: Dt, r: o, k: u, f: !!p } : o : null);
function wt(o, u = null, p = null, _ = 0, b = null, O = o === Nt ? 0 : 1, d = !1, w = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: o,
    props: u,
    key: u && yh(u),
    ref: u && Ho(u),
    scopeId: Vu,
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
  return w ? (Jo(a, p), O & 128 && o.normalize(a)) : p && (a.shapeFlag |= ht(p) ? 8 : 16), lo > 0 && // avoid a block node from tracking itself
  !d && // has current parent block
  Bt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || O & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Bt.push(a), a;
}
const Ir = Pm;
function Pm(o, u = null, p = null, _ = 0, b = null, O = !1) {
  if ((!o || o === tm) && (o = Dr), fh(o)) {
    const w = Ri(
      o,
      u,
      !0
      /* mergeRef: true */
    );
    return p && Jo(w, p), lo > 0 && !O && Bt && (w.shapeFlag & 6 ? Bt[Bt.indexOf(o)] = w : Bt.push(w)), w.patchFlag = -2, w;
  }
  if (Hm(o) && (o = o.__vccOpts), u) {
    u = Tm(u);
    let { class: w, style: a } = u;
    w && !ht(w) && (u.class = Nn(w)), rt(a) && (/* @__PURE__ */ rl(a) && !Me(a) && (a = xt({}, a)), u.style = Bn(a));
  }
  const d = ht(o) ? 1 : uh(o) ? 128 : ns(o) ? 64 : rt(o) ? 4 : qe(o) ? 2 : 0;
  return wt(
    o,
    u,
    p,
    _,
    b,
    d,
    O,
    !0
  );
}
function Tm(o) {
  return o ? /* @__PURE__ */ rl(o) || rh(o) ? xt({}, o) : o : null;
}
function Ri(o, u, p = !1, _ = !1) {
  const { props: b, ref: O, patchFlag: d, children: w, transition: a } = o, f = u ? Lm(b || {}, u) : b, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: o.type,
    props: f,
    key: f && yh(f),
    ref: u && u.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      p && O ? Me(O) ? O.concat(Ho(u)) : [O, Ho(u)] : Ho(u)
    ) : O,
    scopeId: o.scopeId,
    slotScopeIds: o.slotScopeIds,
    children: w,
    target: o.target,
    targetStart: o.targetStart,
    targetAnchor: o.targetAnchor,
    staticCount: o.staticCount,
    shapeFlag: o.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: u && o.type !== Nt ? d === -1 ? 16 : d | 16 : d,
    dynamicProps: o.dynamicProps,
    dynamicChildren: o.dynamicChildren,
    appContext: o.appContext,
    dirs: o.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: o.component,
    suspense: o.suspense,
    ssContent: o.ssContent && Ri(o.ssContent),
    ssFallback: o.ssFallback && Ri(o.ssFallback),
    placeholder: o.placeholder,
    el: o.el,
    anchor: o.anchor,
    ctx: o.ctx,
    ce: o.ce,
    cacheIndex: o.cacheIndex
  };
  return a && _ && il(
    y,
    a.clone(y)
  ), y;
}
function Wo(o = " ", u = 0) {
  return Ir(ss, null, o, u);
}
function za(o = "", u = !1) {
  return u ? (Qt(), ph(Dr, null, o)) : Ir(Dr, null, o);
}
function mr(o) {
  return o == null || typeof o == "boolean" ? Ir(Dr) : Me(o) ? Ir(
    Nt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    o.slice()
  ) : fh(o) ? Lr(o) : Ir(ss, null, String(o));
}
function Lr(o) {
  return o.el === null && o.patchFlag !== -1 || o.memo ? o : Ri(o);
}
function Jo(o, u) {
  let p = 0;
  const { shapeFlag: _ } = o;
  if (u == null)
    u = null;
  else if (Me(u))
    p = 16;
  else if (typeof u == "object")
    if (_ & 65) {
      const b = u.default;
      b && (b._c && (b._d = !1), Jo(o, b()), b._c && (b._d = !0));
      return;
    } else {
      p = 32;
      const b = u._;
      !b && !rh(u) ? u._ctx = Dt : b === 3 && Dt && (Dt.slots._ === 1 ? u._ = 1 : (u._ = 2, o.patchFlag |= 1024));
    }
  else if (qe(u)) {
    if (_ & 65) {
      Jo(o, { default: u });
      return;
    }
    u = { default: u, _ctx: Dt }, p = 32;
  } else
    u = String(u), _ & 64 ? (p = 16, u = [Wo(u)]) : p = 8;
  o.children = u, o.shapeFlag |= p;
}
function Lm(...o) {
  const u = {};
  for (let p = 0; p < o.length; p++) {
    const _ = o[p];
    for (const b in _)
      if (b === "class")
        u.class !== _.class && (u.class = Nn([u.class, _.class]));
      else if (b === "style")
        u.style = Bn([u.style, _.style]);
      else if (Zo(b)) {
        const O = u[b], d = _[b];
        d && O !== d && !(Me(O) && O.includes(d)) ? u[b] = O ? [].concat(O, d) : d : d == null && O == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Yo(b) && (u[b] = d);
      } else b !== "" && (u[b] = _[b]);
  }
  return u;
}
function pr(o, u, p, _ = null) {
  tr(o, u, 7, [
    p,
    _
  ]);
}
const Am = Yu();
let Rm = 0;
function Im(o, u, p) {
  const _ = o.type, b = (u ? u.appContext : o.appContext) || Am, O = {
    uid: Rm++,
    vnode: o,
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
    scope: new ry(
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
    propsOptions: ih(_, b),
    emitsOptions: Qu(_, b),
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
  return O.ctx = { _: O }, O.root = u ? u.root : O, O.emit = dm.bind(null, O), o.ce && o.ce(O), O;
}
let Lt = null;
const Bm = () => Lt || Dt;
let Ko, co;
{
  const o = Xo(), u = (p, _) => {
    let b;
    return (b = o[p]) || (b = o[p] = []), b.push(_), (O) => {
      b.length > 1 ? b.forEach((d) => d(O)) : b[0](O);
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
const fo = (o) => {
  const u = Lt;
  return Ko(o), o.scope.on(), () => {
    o.scope.off(), Ko(u);
  };
}, Qc = () => {
  Lt && Lt.scope.off(), Ko(null);
};
function mh(o) {
  return o.vnode.shapeFlag & 4;
}
let uo = !1;
function Nm(o, u = !1, p = !1) {
  u && co(u);
  const { props: _, children: b } = o.vnode, O = mh(o);
  vm(o, _, O, u), jm(o, b, p || u);
  const d = O ? Dm(o, u) : void 0;
  return u && co(!1), d;
}
function Dm(o, u) {
  const p = o.type;
  o.accessCache = /* @__PURE__ */ Object.create(null), o.proxy = new Proxy(o.ctx, nm);
  const { setup: _ } = p;
  if (_) {
    Br();
    const b = o.setupContext = _.length > 1 ? Mm(o) : null, O = fo(o), d = po(
      _,
      o,
      0,
      [
        o.props,
        b
      ]
    ), w = fu(d);
    if (Nr(), O(), (w || o.sp) && !no(o) && Gu(o), w) {
      if (d.then(Qc, Qc), u)
        return d.then((a) => {
          co(!0);
          try {
            Xc(o, a, u);
          } finally {
            co(!1);
          }
        }).catch((a) => {
          rs(a, o, 0);
        });
      o.asyncDep = d;
    } else
      Xc(o, d);
  } else
    bh(o);
}
function Xc(o, u, p) {
  qe(u) ? o.type.__ssrInlineRender ? o.ssrRender = u : o.render = u : rt(u) && (o.setupState = Nu(u)), bh(o);
}
function bh(o, u, p) {
  const _ = o.type;
  o.render || (o.render = _.render || vr);
  {
    const b = fo(o);
    Br();
    try {
      im(o);
    } finally {
      Nr(), b();
    }
  }
}
const Fm = {
  get(o, u) {
    return jt(o, "get", ""), o[u];
  }
};
function Mm(o) {
  const u = (p) => {
    o.exposed = p || {};
  };
  return {
    attrs: new Proxy(o.attrs, Fm),
    slots: o.slots,
    emit: o.emit,
    expose: u
  };
}
function as(o) {
  return o.exposed ? o.exposeProxy || (o.exposeProxy = new Proxy(Nu(jy(o.exposed)), {
    get(u, p) {
      if (p in u)
        return u[p];
      if (p in io)
        return io[p](o);
    },
    has(u, p) {
      return p in u || p in io;
    }
  })) : o.proxy;
}
function Hm(o) {
  return qe(o) && "__vccOpts" in o;
}
const qa = (o, u) => /* @__PURE__ */ Sy(o, u, uo), Vm = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let $a;
const eu = typeof window < "u" && window.trustedTypes;
if (eu)
  try {
    $a = /* @__PURE__ */ eu.createPolicy("vue", {
      createHTML: (o) => o
    });
  } catch {
  }
const vh = $a ? (o) => $a.createHTML(o) : (o) => o, zm = "http://www.w3.org/2000/svg", qm = "http://www.w3.org/1998/Math/MathML", Tr = typeof document < "u" ? document : null, tu = Tr && /* @__PURE__ */ Tr.createElement("template"), $m = {
  insert: (o, u, p) => {
    u.insertBefore(o, p || null);
  },
  remove: (o) => {
    const u = o.parentNode;
    u && u.removeChild(o);
  },
  createElement: (o, u, p, _) => {
    const b = u === "svg" ? Tr.createElementNS(zm, o) : u === "mathml" ? Tr.createElementNS(qm, o) : p ? Tr.createElement(o, { is: p }) : Tr.createElement(o);
    return o === "select" && _ && _.multiple != null && b.setAttribute("multiple", _.multiple), b;
  },
  createText: (o) => Tr.createTextNode(o),
  createComment: (o) => Tr.createComment(o),
  setText: (o, u) => {
    o.nodeValue = u;
  },
  setElementText: (o, u) => {
    o.textContent = u;
  },
  parentNode: (o) => o.parentNode,
  nextSibling: (o) => o.nextSibling,
  querySelector: (o) => Tr.querySelector(o),
  setScopeId(o, u) {
    o.setAttribute(u, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(o, u, p, _, b, O) {
    const d = p ? p.previousSibling : u.lastChild;
    if (b && (b === O || b.nextSibling))
      for (; u.insertBefore(b.cloneNode(!0), p), !(b === O || !(b = b.nextSibling)); )
        ;
    else {
      tu.innerHTML = vh(
        _ === "svg" ? `<svg>${o}</svg>` : _ === "mathml" ? `<math>${o}</math>` : o
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
      d ? d.nextSibling : u.firstChild,
      // last
      p ? p.previousSibling : u.lastChild
    ];
  }
}, Um = /* @__PURE__ */ Symbol("_vtc");
function Gm(o, u, p) {
  const _ = o[Um];
  _ && (u = (u ? [u, ..._] : [..._]).join(" ")), u == null ? o.removeAttribute("class") : p ? o.setAttribute("class", u) : o.className = u;
}
const ru = /* @__PURE__ */ Symbol("_vod"), Wm = /* @__PURE__ */ Symbol("_vsh"), Jm = /* @__PURE__ */ Symbol(""), Km = /(?:^|;)\s*display\s*:/;
function Zm(o, u, p) {
  const _ = o.style, b = ht(p);
  let O = !1;
  if (p && !b) {
    if (u)
      if (ht(u))
        for (const d of u.split(";")) {
          const w = d.slice(0, d.indexOf(":")).trim();
          p[w] == null && Zi(_, w, "");
        }
      else
        for (const d in u)
          p[d] == null && Zi(_, d, "");
    for (const d in p) {
      d === "display" && (O = !0);
      const w = p[d];
      w != null ? Qm(
        o,
        d,
        !ht(u) && u ? u[d] : void 0,
        w
      ) || Zi(_, d, w) : Zi(_, d, "");
    }
  } else if (b) {
    if (u !== p) {
      const d = _[Jm];
      d && (p += ";" + d), _.cssText = p, O = Km.test(p);
    }
  } else u && o.removeAttribute("style");
  ru in o && (o[ru] = O ? _.display : "", o[Wm] && (_.display = "none"));
}
const Bo = /\s*!important$/;
function Zi(o, u, p) {
  if (Me(p))
    p.forEach((_) => Zi(o, u, _));
  else if (p == null && (p = ""), u.startsWith("--"))
    Bo.test(p) ? o.setProperty(u, p.replace(Bo, ""), "important") : o.setProperty(u, p);
  else {
    const _ = Ym(o, u);
    Bo.test(p) ? o.setProperty(
      un(_),
      p.replace(Bo, ""),
      "important"
    ) : o[_] = p;
  }
}
const nu = ["Webkit", "Moz", "ms"], Ea = {};
function Ym(o, u) {
  const p = Ea[u];
  if (p)
    return p;
  let _ = Xt(u);
  if (_ !== "filter" && _ in o)
    return Ea[u] = _;
  _ = bu(_);
  for (let b = 0; b < nu.length; b++) {
    const O = nu[b] + _;
    if (O in o)
      return Ea[u] = O;
  }
  return u;
}
function Qm(o, u, p, _) {
  return o.tagName === "TEXTAREA" && (u === "width" || u === "height") && ht(_) && p === _;
}
const iu = "http://www.w3.org/1999/xlink";
function ou(o, u, p, _, b, O = Xf(u)) {
  _ && u.startsWith("xlink:") ? p == null ? o.removeAttributeNS(iu, u.slice(6, u.length)) : o.setAttributeNS(iu, u, p) : p == null || O && !gu(p) ? o.removeAttribute(u) : o.setAttribute(
    u,
    O ? "" : gr(p) ? String(p) : p
  );
}
function su(o, u, p, _, b) {
  if (u === "innerHTML" || u === "textContent") {
    p != null && (o[u] = u === "innerHTML" ? vh(p) : p);
    return;
  }
  const O = o.tagName;
  if (u === "value" && O !== "PROGRESS" && // custom elements may use _value internally
  !O.includes("-")) {
    const w = O === "OPTION" ? o.getAttribute("value") || "" : o.value, a = p == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      o.type === "checkbox" ? "on" : ""
    ) : String(p);
    (w !== a || !("_value" in o)) && (o.value = a), p == null && o.removeAttribute(u), o._value = p;
    return;
  }
  let d = !1;
  if (p === "" || p == null) {
    const w = typeof o[u];
    w === "boolean" ? p = gu(p) : p == null && w === "string" ? (p = "", d = !0) : w === "number" && (p = 0, d = !0);
  }
  try {
    o[u] = p;
  } catch {
  }
  d && o.removeAttribute(b || u);
}
function Ti(o, u, p, _) {
  o.addEventListener(u, p, _);
}
function Xm(o, u, p, _) {
  o.removeEventListener(u, p, _);
}
const au = /* @__PURE__ */ Symbol("_vei");
function eb(o, u, p, _, b = null) {
  const O = o[au] || (o[au] = {}), d = O[u];
  if (_ && d)
    d.value = _;
  else {
    const [w, a] = nb(u);
    if (_) {
      const f = O[u] = sb(
        _,
        b
      );
      Ti(o, w, f, a);
    } else d && (Xm(o, w, d, a), O[u] = void 0);
  }
}
const tb = /(Once|Passive|Capture)$/, rb = /^on:?(?:Once|Passive|Capture)$/;
function nb(o) {
  let u, p;
  for (; (p = o.match(tb)) && !rb.test(o); )
    u || (u = {}), o = o.slice(0, o.length - p[1].length), u[p[1].toLowerCase()] = !0;
  return [o[2] === ":" ? o.slice(3) : un(o.slice(2)), u];
}
let Sa = 0;
const ib = /* @__PURE__ */ Promise.resolve(), ob = () => Sa || (ib.then(() => Sa = 0), Sa = Date.now());
function sb(o, u) {
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
      const d = b.slice(), w = [_];
      for (let a = 0; a < d.length && !_._stopped; a++) {
        const f = d[a];
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
  return p.value = o, p.attached = ob(), p;
}
const lu = (o) => o.charCodeAt(0) === 111 && o.charCodeAt(1) === 110 && // lowercase letter
o.charCodeAt(2) > 96 && o.charCodeAt(2) < 123, ab = (o, u, p, _, b, O) => {
  const d = b === "svg";
  u === "class" ? Gm(o, _, d) : u === "style" ? Zm(o, p, _) : Zo(u) ? Yo(u) || eb(o, u, p, _, O) : (u[0] === "." ? (u = u.slice(1), !0) : u[0] === "^" ? (u = u.slice(1), !1) : lb(o, u, _, d)) ? (su(o, u, _), !o.tagName.includes("-") && (u === "value" || u === "checked" || u === "selected") && ou(o, u, _, d, O, u !== "value")) : /* #11081 force set props for possible async custom element */ o._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (cb(o, u) || // @ts-expect-error _def is private
  o._def.__asyncLoader && (/[A-Z]/.test(u) || !ht(_))) ? su(o, Xt(u), _, O, u) : (u === "true-value" ? o._trueValue = _ : u === "false-value" && (o._falseValue = _), ou(o, u, _, d));
};
function lb(o, u, p, _) {
  if (_)
    return !!(u === "innerHTML" || u === "textContent" || u in o && lu(u) && qe(p));
  if (u === "spellcheck" || u === "draggable" || u === "translate" || u === "autocorrect" || u === "sandbox" && o.tagName === "IFRAME" || u === "form" || u === "list" && o.tagName === "INPUT" || u === "type" && o.tagName === "TEXTAREA")
    return !1;
  if (u === "width" || u === "height") {
    const b = o.tagName;
    if (b === "IMG" || b === "VIDEO" || b === "CANVAS" || b === "SOURCE")
      return !1;
  }
  return lu(u) && ht(p) ? !1 : u in o;
}
function cb(o, u) {
  const p = (
    // @ts-expect-error _def is private
    o._def.props
  );
  if (!p)
    return !1;
  const _ = Xt(u);
  return Array.isArray(p) ? p.some((b) => Xt(b) === _) : Object.keys(p).some((b) => Xt(b) === _);
}
const cu = (o) => {
  const u = o.props["onUpdate:modelValue"] || !1;
  return Me(u) ? (p) => Fo(u, p) : u;
};
function ub(o) {
  o.target.composing = !0;
}
function uu(o) {
  const u = o.target;
  u.composing && (u.composing = !1, u.dispatchEvent(new Event("input")));
}
const No = /* @__PURE__ */ Symbol("_assign"), Do = /* @__PURE__ */ Symbol("_initialValue");
function Pa(o, u, p) {
  return u && (o = o.trim()), p && (o = Ja(o)), o;
}
const hb = {
  created(o, { modifiers: { lazy: u, trim: p, number: _ } }, b) {
    o.parentNode && (o.type === "text" ? o[Do] = o.defaultValue.replace(/[\r\n]/g, "") : o.type === "textarea" && (o[Do] = o.defaultValue.replace(/\r\n?/g, `
`))), o[No] = cu(b);
    const O = _ || b.props && b.props.type === "number";
    Ti(o, u ? "change" : "input", (d) => {
      d.target.composing || o[No](Pa(o.value, p, O));
    }), (p || O) && Ti(o, "change", () => {
      o.value = Pa(o.value, p, O);
    }), u || (Ti(o, "compositionstart", ub), Ti(o, "compositionend", uu), Ti(o, "change", uu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(o, { value: u, modifiers: { trim: p, number: _ } }) {
    const b = u ?? "", O = o[Do];
    delete o[Do], O !== void 0 && (o.type === "text" || o.type === "textarea") && o.value !== O ? o[No](Pa(o.value, p, _)) : o.value = b;
  },
  beforeUpdate(o, { value: u, oldValue: p, modifiers: { lazy: _, trim: b, number: O } }, d) {
    if (o[No] = cu(d), o.composing) return;
    const w = (O || o.type === "number") && !/^0\d/.test(o.value) ? Ja(o.value) : o.value, a = u ?? "";
    if (w === a)
      return;
    const f = o.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === o && o.type !== "range" && (_ && u === p || b && o.value.trim() === a) || (o.value = a);
  }
}, db = ["ctrl", "shift", "alt", "meta"], pb = {
  stop: (o) => o.stopPropagation(),
  prevent: (o) => o.preventDefault(),
  self: (o) => o.target !== o.currentTarget,
  ctrl: (o) => !o.ctrlKey,
  shift: (o) => !o.shiftKey,
  alt: (o) => !o.altKey,
  meta: (o) => !o.metaKey,
  left: (o) => "button" in o && o.button !== 0,
  middle: (o) => "button" in o && o.button !== 1,
  right: (o) => "button" in o && o.button !== 2,
  exact: (o, u) => db.some((p) => o[`${p}Key`] && !u.includes(p))
}, Si = (o, u) => {
  if (!o) return o;
  const p = o._withMods || (o._withMods = {}), _ = u.join(".");
  return p[_] || (p[_] = (b, ...O) => {
    for (let d = 0; d < u.length; d++) {
      const w = pb[u[d]];
      if (w && w(b, u)) return;
    }
    return o(b, ...O);
  });
}, fb = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, hu = (o, u) => {
  const p = o._withKeys || (o._withKeys = {}), _ = u.join(".");
  return p[_] || (p[_] = (b) => {
    if (!("key" in b))
      return;
    const O = un(b.key);
    if (u.some(
      (d) => d === O || fb[d] === O
    ))
      return o(b);
  });
}, yb = /* @__PURE__ */ xt({ patchProp: ab }, $m);
let du;
function mb() {
  return du || (du = xm(yb));
}
const gh = (...o) => {
  const u = mb().createApp(...o), { mount: p } = u;
  return u.mount = (_) => {
    const b = vb(_);
    if (!b) return;
    const O = u._component;
    !qe(O) && !O.render && !O.template && (O.template = b.innerHTML), b.nodeType === 1 && (b.textContent = "");
    const d = p(b, !1, bb(b));
    return b instanceof Element && (b.removeAttribute("v-cloak"), b.setAttribute("data-v-app", "")), d;
  }, u;
};
function bb(o) {
  if (o instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && o instanceof MathMLElement)
    return "mathml";
}
function vb(o) {
  return ht(o) ? document.querySelector(o) : o;
}
function gb(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var _h = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(o, u) {
  (function(p, _) {
    o.exports = _();
  })(self, () => (() => {
    var p = { 9306: (d, w, a) => {
      var f = a(4901), y = a(6823), m = TypeError;
      d.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not a function");
      };
    }, 5548: (d, w, a) => {
      var f = a(3517), y = a(6823), m = TypeError;
      d.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not a constructor");
      };
    }, 3506: (d, w, a) => {
      var f = a(3925), y = String, m = TypeError;
      d.exports = function(v) {
        if (f(v)) return v;
        throw new m("Can't set " + y(v) + " as a prototype");
      };
    }, 6469: (d, w, a) => {
      var f = a(8227), y = a(2360), m = a(4913).f, v = f("unscopables"), j = Array.prototype;
      j[v] === void 0 && m(j, v, { configurable: !0, value: y(null) }), d.exports = function(C) {
        j[v][C] = !0;
      };
    }, 7829: (d, w, a) => {
      var f = a(8183).charAt;
      d.exports = function(y, m, v) {
        return m + (v ? f(y, m).length : 1);
      };
    }, 679: (d, w, a) => {
      var f = a(1625), y = TypeError;
      d.exports = function(m, v) {
        if (f(v, m)) return m;
        throw new y("Incorrect invocation");
      };
    }, 8551: (d, w, a) => {
      var f = a(34), y = String, m = TypeError;
      d.exports = function(v) {
        if (f(v)) return v;
        throw new m(y(v) + " is not an object");
      };
    }, 235: (d, w, a) => {
      var f = a(9213).forEach, y = a(4598)("forEach");
      d.exports = y ? [].forEach : function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (d, w, a) => {
      var f = a(6080), y = a(9565), m = a(8981), v = a(6319), j = a(4209), C = a(3517), k = a(6198), E = a(4659), P = a(81), T = a(851), I = Array;
      d.exports = function(L) {
        var M = m(L), H = C(this), A = arguments.length, N = A > 1 ? arguments[1] : void 0, B = N !== void 0;
        B && (N = f(N, A > 2 ? arguments[2] : void 0));
        var z, V, Y, J, Z, le, oe = T(M), ne = 0;
        if (!oe || this === I && j(oe)) for (z = k(M), V = H ? new this(z) : I(z); z > ne; ne++) le = B ? N(M[ne], ne) : M[ne], E(V, ne, le);
        else for (V = H ? new this() : [], Z = (J = P(M, oe)).next; !(Y = y(Z, J)).done; ne++) le = B ? v(J, N, [Y.value, ne], !0) : Y.value, E(V, ne, le);
        return V.length = ne, V;
      };
    }, 9617: (d, w, a) => {
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
      d.exports = { includes: v(!0), indexOf: v(!1) };
    }, 9213: (d, w, a) => {
      var f = a(6080), y = a(9504), m = a(7055), v = a(8981), j = a(6198), C = a(1469), k = y([].push), E = function(P) {
        var T = P === 1, I = P === 2, L = P === 3, M = P === 4, H = P === 6, A = P === 7, N = P === 5 || H;
        return function(B, z, V, Y) {
          for (var J, Z, le = v(B), oe = m(le), ne = j(oe), ye = f(z, V), ue = 0, je = Y || C, Ee = T ? je(B, ne) : I || A ? je(B, 0) : void 0; ne > ue; ue++) if ((N || ue in oe) && (Z = ye(J = oe[ue], ue, le), P)) if (T) Ee[ue] = Z;
          else if (Z) switch (P) {
            case 3:
              return !0;
            case 5:
              return J;
            case 6:
              return ue;
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
      d.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (d, w, a) => {
      var f = a(9039), y = a(8227), m = a(7388), v = y("species");
      d.exports = function(j) {
        return m >= 51 || !f(function() {
          var C = [];
          return (C.constructor = {})[v] = function() {
            return { foo: 1 };
          }, C[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (d, w, a) => {
      var f = a(9039);
      d.exports = function(y, m) {
        var v = [][y];
        return !!v && f(function() {
          v.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (d, w, a) => {
      var f = a(9306), y = a(8981), m = a(7055), v = a(6198), j = TypeError, C = "Reduce of empty array with no initial value", k = function(E) {
        return function(P, T, I, L) {
          var M = y(P), H = m(M), A = v(M);
          if (f(T), A === 0 && I < 2) throw new j(C);
          var N = E ? A - 1 : 0, B = E ? -1 : 1;
          if (I < 2) for (; ; ) {
            if (N in H) {
              L = H[N], N += B;
              break;
            }
            if (N += B, E ? N < 0 : A <= N) throw new j(C);
          }
          for (; E ? N >= 0 : A > N; N += B) N in H && (L = T(L, H[N], N, M));
          return L;
        };
      };
      d.exports = { left: k(!1), right: k(!0) };
    }, 4527: (d, w, a) => {
      var f = a(3724), y = a(4376), m = TypeError, v = Object.getOwnPropertyDescriptor, j = f && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (C) {
          return C instanceof TypeError;
        }
      }();
      d.exports = j ? function(C, k) {
        if (y(C) && !v(C, "length").writable) throw new m("Cannot set read only .length");
        return C.length = k;
      } : function(C, k) {
        return C.length = k;
      };
    }, 7680: (d, w, a) => {
      var f = a(9504);
      d.exports = f([].slice);
    }, 4488: (d, w, a) => {
      var f = a(7680), y = Math.floor, m = function(v, j) {
        var C = v.length;
        if (C < 8) for (var k, E, P = 1; P < C; ) {
          for (E = P, k = v[P]; E && j(v[E - 1], k) > 0; ) v[E] = v[--E];
          E !== P++ && (v[E] = k);
        }
        else for (var T = y(C / 2), I = m(f(v, 0, T), j), L = m(f(v, T), j), M = I.length, H = L.length, A = 0, N = 0; A < M || N < H; ) v[A + N] = A < M && N < H ? j(I[A], L[N]) <= 0 ? I[A++] : L[N++] : A < M ? I[A++] : L[N++];
        return v;
      };
      d.exports = m;
    }, 7433: (d, w, a) => {
      var f = a(4376), y = a(3517), m = a(34), v = a(8227)("species"), j = Array;
      d.exports = function(C) {
        var k;
        return f(C) && (k = C.constructor, (y(k) && (k === j || f(k.prototype)) || m(k) && (k = k[v]) === null) && (k = void 0)), k === void 0 ? j : k;
      };
    }, 1469: (d, w, a) => {
      var f = a(7433);
      d.exports = function(y, m) {
        return new (f(y))(m === 0 ? 0 : m);
      };
    }, 6319: (d, w, a) => {
      var f = a(8551), y = a(9539);
      d.exports = function(m, v, j, C) {
        try {
          return C ? v(f(j)[0], j[1]) : v(j);
        } catch (k) {
          y(m, "throw", k);
        }
      };
    }, 4428: (d, w, a) => {
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
      d.exports = function(j, C) {
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
    }, 4576: (d, w, a) => {
      var f = a(9504), y = f({}.toString), m = f("".slice);
      d.exports = function(v) {
        return m(y(v), 8, -1);
      };
    }, 6955: (d, w, a) => {
      var f = a(2140), y = a(4901), m = a(4576), v = a(8227)("toStringTag"), j = Object, C = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      d.exports = f ? m : function(k) {
        var E, P, T;
        return k === void 0 ? "Undefined" : k === null ? "Null" : typeof (P = function(I, L) {
          try {
            return I[L];
          } catch {
          }
        }(E = j(k), v)) == "string" ? P : C ? m(E) : (T = m(E)) === "Object" && y(E.callee) ? "Arguments" : T;
      };
    }, 7740: (d, w, a) => {
      var f = a(9297), y = a(5031), m = a(7347), v = a(4913);
      d.exports = function(j, C, k) {
        for (var E = y(C), P = v.f, T = m.f, I = 0; I < E.length; I++) {
          var L = E[I];
          f(j, L) || k && f(k, L) || P(j, L, T(C, L));
        }
      };
    }, 1436: (d, w, a) => {
      var f = a(8227)("match");
      d.exports = function(y) {
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
    }, 2211: (d, w, a) => {
      var f = a(9039);
      d.exports = !f(function() {
        function y() {
        }
        return y.prototype.constructor = null, Object.getPrototypeOf(new y()) !== y.prototype;
      });
    }, 2529: (d) => {
      d.exports = function(w, a) {
        return { value: w, done: a };
      };
    }, 6699: (d, w, a) => {
      var f = a(3724), y = a(4913), m = a(6980);
      d.exports = f ? function(v, j, C) {
        return y.f(v, j, m(1, C));
      } : function(v, j, C) {
        return v[j] = C, v;
      };
    }, 6980: (d) => {
      d.exports = function(w, a) {
        return { enumerable: !(1 & w), configurable: !(2 & w), writable: !(4 & w), value: a };
      };
    }, 4659: (d, w, a) => {
      var f = a(3724), y = a(4913), m = a(6980);
      d.exports = function(v, j, C) {
        f ? y.f(v, j, m(0, C)) : v[j] = C;
      };
    }, 380: (d, w, a) => {
      var f = a(9504), y = a(9039), m = a(533).start, v = RangeError, j = isFinite, C = Math.abs, k = Date.prototype, E = k.toISOString, P = f(k.getTime), T = f(k.getUTCDate), I = f(k.getUTCFullYear), L = f(k.getUTCHours), M = f(k.getUTCMilliseconds), H = f(k.getUTCMinutes), A = f(k.getUTCMonth), N = f(k.getUTCSeconds);
      d.exports = y(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !y(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(P(this))) throw new v("Invalid time value");
        var B = this, z = I(B), V = M(B), Y = z < 0 ? "-" : z > 9999 ? "+" : "";
        return Y + m(C(z), Y ? 6 : 4, 0) + "-" + m(A(B) + 1, 2, 0) + "-" + m(T(B), 2, 0) + "T" + m(L(B), 2, 0) + ":" + m(H(B), 2, 0) + ":" + m(N(B), 2, 0) + "." + m(V, 3, 0) + "Z";
      } : E;
    }, 3640: (d, w, a) => {
      var f = a(8551), y = a(4270), m = TypeError;
      d.exports = function(v) {
        if (f(this), v === "string" || v === "default") v = "string";
        else if (v !== "number") throw new m("Incorrect hint");
        return y(this, v);
      };
    }, 2106: (d, w, a) => {
      var f = a(283), y = a(4913);
      d.exports = function(m, v, j) {
        return j.get && f(j.get, v, { getter: !0 }), j.set && f(j.set, v, { setter: !0 }), y.f(m, v, j);
      };
    }, 6840: (d, w, a) => {
      var f = a(4901), y = a(4913), m = a(283), v = a(9433);
      d.exports = function(j, C, k, E) {
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
    }, 9433: (d, w, a) => {
      var f = a(4475), y = Object.defineProperty;
      d.exports = function(m, v) {
        try {
          y(f, m, { value: v, configurable: !0, writable: !0 });
        } catch {
          f[m] = v;
        }
        return v;
      };
    }, 4606: (d, w, a) => {
      var f = a(6823), y = TypeError;
      d.exports = function(m, v) {
        if (!delete m[v]) throw new y("Cannot delete property " + f(v) + " of " + f(m));
      };
    }, 3724: (d, w, a) => {
      var f = a(9039);
      d.exports = !f(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (d, w, a) => {
      var f = a(4475), y = a(34), m = f.document, v = y(m) && y(m.createElement);
      d.exports = function(j) {
        return v ? m.createElement(j) : {};
      };
    }, 6837: (d) => {
      var w = TypeError;
      d.exports = function(a) {
        if (a > 9007199254740991) throw w("Maximum allowed index exceeded");
        return a;
      };
    }, 7400: (d) => {
      d.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, 9296: (d, w, a) => {
      var f = a(4055)("span").classList, y = f && f.constructor && f.constructor.prototype;
      d.exports = y === Object.prototype ? void 0 : y;
    }, 8834: (d, w, a) => {
      var f = a(9392).match(/firefox\/(\d+)/i);
      d.exports = !!f && +f[1];
    }, 7290: (d, w, a) => {
      var f = a(516), y = a(9088);
      d.exports = !f && !y && typeof window == "object" && typeof document == "object";
    }, 6763: (d) => {
      d.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (d) => {
      d.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (d, w, a) => {
      var f = a(9392);
      d.exports = /MSIE|Trident/.test(f);
    }, 28: (d, w, a) => {
      var f = a(9392);
      d.exports = /ipad|iphone|ipod/i.test(f) && typeof Pebble < "u";
    }, 8119: (d, w, a) => {
      var f = a(9392);
      d.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(f);
    }, 9088: (d, w, a) => {
      var f = a(4475), y = a(4576);
      d.exports = y(f.process) === "process";
    }, 6765: (d, w, a) => {
      var f = a(9392);
      d.exports = /web0s(?!.*chrome)/i.test(f);
    }, 9392: (d) => {
      d.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (d, w, a) => {
      var f, y, m = a(4475), v = a(9392), j = m.process, C = m.Deno, k = j && j.versions || C && C.version, E = k && k.v8;
      E && (y = (f = E.split("."))[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1])), !y && v && (!(f = v.match(/Edge\/(\d+)/)) || f[1] >= 74) && (f = v.match(/Chrome\/(\d+)/)) && (y = +f[1]), d.exports = y;
    }, 9160: (d, w, a) => {
      var f = a(9392).match(/AppleWebKit\/(\d+)\./);
      d.exports = !!f && +f[1];
    }, 8727: (d) => {
      d.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (d, w, a) => {
      var f = a(4475), y = a(7347).f, m = a(6699), v = a(6840), j = a(9433), C = a(7740), k = a(2796);
      d.exports = function(E, P) {
        var T, I, L, M, H, A = E.target, N = E.global, B = E.stat;
        if (T = N ? f : B ? f[A] || j(A, {}) : f[A] && f[A].prototype) for (I in P) {
          if (M = P[I], L = E.dontCallGetSet ? (H = y(T, I)) && H.value : T[I], !k(N ? I : A + (B ? "." : "#") + I, E.forced) && L !== void 0) {
            if (typeof M == typeof L) continue;
            C(M, L);
          }
          (E.sham || L && L.sham) && m(M, "sham", !0), v(T, I, M, E);
        }
      };
    }, 9039: (d) => {
      d.exports = function(w) {
        try {
          return !!w();
        } catch {
          return !0;
        }
      };
    }, 9228: (d, w, a) => {
      a(7495);
      var f = a(9565), y = a(6840), m = a(7323), v = a(9039), j = a(8227), C = a(6699), k = j("species"), E = RegExp.prototype;
      d.exports = function(P, T, I, L) {
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
          var N = /./[M], B = T(M, ""[P], function(z, V, Y, J, Z) {
            var le = V.exec;
            return le === m || le === E.exec ? H && !Z ? { done: !0, value: f(N, V, Y, J) } : { done: !0, value: f(z, Y, V, J) } : { done: !1 };
          });
          y(String.prototype, P, B[0]), y(E, M, B[1]);
        }
        L && C(E[M], "sham", !0);
      };
    }, 8745: (d, w, a) => {
      var f = a(616), y = Function.prototype, m = y.apply, v = y.call;
      d.exports = typeof Reflect == "object" && Reflect.apply || (f ? v.bind(m) : function() {
        return v.apply(m, arguments);
      });
    }, 6080: (d, w, a) => {
      var f = a(7476), y = a(9306), m = a(616), v = f(f.bind);
      d.exports = function(j, C) {
        return y(j), C === void 0 ? j : m ? v(j, C) : function() {
          return j.apply(C, arguments);
        };
      };
    }, 616: (d, w, a) => {
      var f = a(9039);
      d.exports = !f(function() {
        var y = (function() {
        }).bind();
        return typeof y != "function" || y.hasOwnProperty("prototype");
      });
    }, 566: (d, w, a) => {
      var f = a(9504), y = a(9306), m = a(34), v = a(9297), j = a(7680), C = a(616), k = Function, E = f([].concat), P = f([].join), T = {};
      d.exports = C ? k.bind : function(I) {
        var L = y(this), M = L.prototype, H = j(arguments, 1), A = function() {
          var N = E(H, j(arguments));
          return this instanceof A ? function(B, z, V) {
            if (!v(T, z)) {
              for (var Y = [], J = 0; J < z; J++) Y[J] = "a[" + J + "]";
              T[z] = k("C,a", "return new C(" + P(Y, ",") + ")");
            }
            return T[z](B, V);
          }(L, N.length, N) : L.apply(I, N);
        };
        return m(M) && (A.prototype = M), A;
      };
    }, 9565: (d, w, a) => {
      var f = a(616), y = Function.prototype.call;
      d.exports = f ? y.bind(y) : function() {
        return y.apply(y, arguments);
      };
    }, 350: (d, w, a) => {
      var f = a(3724), y = a(9297), m = Function.prototype, v = f && Object.getOwnPropertyDescriptor, j = y(m, "name"), C = j && (function() {
      }).name === "something", k = j && (!f || f && v(m, "name").configurable);
      d.exports = { EXISTS: j, PROPER: C, CONFIGURABLE: k };
    }, 6706: (d, w, a) => {
      var f = a(9504), y = a(9306);
      d.exports = function(m, v, j) {
        try {
          return f(y(Object.getOwnPropertyDescriptor(m, v)[j]));
        } catch {
        }
      };
    }, 7476: (d, w, a) => {
      var f = a(4576), y = a(9504);
      d.exports = function(m) {
        if (f(m) === "Function") return y(m);
      };
    }, 9504: (d, w, a) => {
      var f = a(616), y = Function.prototype, m = y.call, v = f && y.bind.bind(m, m);
      d.exports = f ? v : function(j) {
        return function() {
          return m.apply(j, arguments);
        };
      };
    }, 7751: (d, w, a) => {
      var f = a(4475), y = a(4901);
      d.exports = function(m, v) {
        return arguments.length < 2 ? (j = f[m], y(j) ? j : void 0) : f[m] && f[m][v];
        var j;
      };
    }, 851: (d, w, a) => {
      var f = a(6955), y = a(5966), m = a(4117), v = a(6269), j = a(8227)("iterator");
      d.exports = function(C) {
        if (!m(C)) return y(C, j) || y(C, "@@iterator") || v[f(C)];
      };
    }, 81: (d, w, a) => {
      var f = a(9565), y = a(9306), m = a(8551), v = a(6823), j = a(851), C = TypeError;
      d.exports = function(k, E) {
        var P = arguments.length < 2 ? j(k) : E;
        if (y(P)) return m(f(P, k));
        throw new C(v(k) + " is not iterable");
      };
    }, 6933: (d, w, a) => {
      var f = a(9504), y = a(4376), m = a(4901), v = a(4576), j = a(655), C = f([].push);
      d.exports = function(k) {
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
            for (var N = 0; N < L; N++) if (P[N] === H) return A;
          };
        }
      };
    }, 5966: (d, w, a) => {
      var f = a(9306), y = a(4117);
      d.exports = function(m, v) {
        var j = m[v];
        return y(j) ? void 0 : f(j);
      };
    }, 2478: (d, w, a) => {
      var f = a(9504), y = a(8981), m = Math.floor, v = f("".charAt), j = f("".replace), C = f("".slice), k = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      d.exports = function(P, T, I, L, M, H) {
        var A = I + P.length, N = L.length, B = E;
        return M !== void 0 && (M = y(M), B = k), j(H, B, function(z, V) {
          var Y;
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
              Y = M[C(V, 1, -1)];
              break;
            default:
              var J = +V;
              if (J === 0) return z;
              if (J > N) {
                var Z = m(J / 10);
                return Z === 0 ? z : Z <= N ? L[Z - 1] === void 0 ? v(V, 1) : L[Z - 1] + v(V, 1) : z;
              }
              Y = L[J - 1];
          }
          return Y === void 0 ? "" : Y;
        });
      };
    }, 4475: function(d, w, a) {
      var f = function(y) {
        return y && y.Math === Math && y;
      };
      d.exports = f(typeof globalThis == "object" && globalThis) || f(typeof window == "object" && window) || f(typeof self == "object" && self) || f(typeof a.g == "object" && a.g) || f(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (d, w, a) => {
      var f = a(9504), y = a(8981), m = f({}.hasOwnProperty);
      d.exports = Object.hasOwn || function(v, j) {
        return m(y(v), j);
      };
    }, 421: (d) => {
      d.exports = {};
    }, 3138: (d) => {
      d.exports = function(w, a) {
        try {
          arguments.length === 1 ? console.error(w) : console.error(w, a);
        } catch {
        }
      };
    }, 397: (d, w, a) => {
      var f = a(7751);
      d.exports = f("document", "documentElement");
    }, 5917: (d, w, a) => {
      var f = a(3724), y = a(9039), m = a(4055);
      d.exports = !f && !y(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (d, w, a) => {
      var f = a(9504), y = a(9039), m = a(4576), v = Object, j = f("".split);
      d.exports = y(function() {
        return !v("z").propertyIsEnumerable(0);
      }) ? function(C) {
        return m(C) === "String" ? j(C, "") : v(C);
      } : v;
    }, 3167: (d, w, a) => {
      var f = a(4901), y = a(34), m = a(2967);
      d.exports = function(v, j, C) {
        var k, E;
        return m && f(k = j.constructor) && k !== C && y(E = k.prototype) && E !== C.prototype && m(v, E), v;
      };
    }, 3706: (d, w, a) => {
      var f = a(9504), y = a(4901), m = a(7629), v = f(Function.toString);
      y(m.inspectSource) || (m.inspectSource = function(j) {
        return v(j);
      }), d.exports = m.inspectSource;
    }, 1181: (d, w, a) => {
      var f, y, m, v = a(8622), j = a(4475), C = a(34), k = a(6699), E = a(9297), P = a(7629), T = a(6119), I = a(421), L = "Object already initialized", M = j.TypeError, H = j.WeakMap;
      if (v || P.state) {
        var A = P.state || (P.state = new H());
        A.get = A.get, A.has = A.has, A.set = A.set, f = function(B, z) {
          if (A.has(B)) throw new M(L);
          return z.facade = B, A.set(B, z), z;
        }, y = function(B) {
          return A.get(B) || {};
        }, m = function(B) {
          return A.has(B);
        };
      } else {
        var N = T("state");
        I[N] = !0, f = function(B, z) {
          if (E(B, N)) throw new M(L);
          return z.facade = B, k(B, N, z), z;
        }, y = function(B) {
          return E(B, N) ? B[N] : {};
        }, m = function(B) {
          return E(B, N);
        };
      }
      d.exports = { set: f, get: y, has: m, enforce: function(B) {
        return m(B) ? y(B) : f(B, {});
      }, getterFor: function(B) {
        return function(z) {
          var V;
          if (!C(z) || (V = y(z)).type !== B) throw new M("Incompatible receiver, " + B + " required");
          return V;
        };
      } };
    }, 4209: (d, w, a) => {
      var f = a(8227), y = a(6269), m = f("iterator"), v = Array.prototype;
      d.exports = function(j) {
        return j !== void 0 && (y.Array === j || v[m] === j);
      };
    }, 4376: (d, w, a) => {
      var f = a(4576);
      d.exports = Array.isArray || function(y) {
        return f(y) === "Array";
      };
    }, 4901: (d) => {
      var w = typeof document == "object" && document.all;
      d.exports = w === void 0 && w !== void 0 ? function(a) {
        return typeof a == "function" || a === w;
      } : function(a) {
        return typeof a == "function";
      };
    }, 3517: (d, w, a) => {
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
      M.sham = !0, d.exports = !E || y(function() {
        var H;
        return L(L.call) || !L(Object) || !L(function() {
          H = !0;
        }) || H;
      }) ? M : L;
    }, 6575: (d, w, a) => {
      var f = a(9297);
      d.exports = function(y) {
        return y !== void 0 && (f(y, "value") || f(y, "writable"));
      };
    }, 2796: (d, w, a) => {
      var f = a(9039), y = a(4901), m = /#|\.prototype\./, v = function(P, T) {
        var I = C[j(P)];
        return I === E || I !== k && (y(T) ? f(T) : !!T);
      }, j = v.normalize = function(P) {
        return String(P).replace(m, ".").toLowerCase();
      }, C = v.data = {}, k = v.NATIVE = "N", E = v.POLYFILL = "P";
      d.exports = v;
    }, 4117: (d) => {
      d.exports = function(w) {
        return w == null;
      };
    }, 34: (d, w, a) => {
      var f = a(4901);
      d.exports = function(y) {
        return typeof y == "object" ? y !== null : f(y);
      };
    }, 3925: (d, w, a) => {
      var f = a(34);
      d.exports = function(y) {
        return f(y) || y === null;
      };
    }, 6395: (d) => {
      d.exports = !1;
    }, 788: (d, w, a) => {
      var f = a(34), y = a(4576), m = a(8227)("match");
      d.exports = function(v) {
        var j;
        return f(v) && ((j = v[m]) !== void 0 ? !!j : y(v) === "RegExp");
      };
    }, 757: (d, w, a) => {
      var f = a(7751), y = a(4901), m = a(1625), v = a(7040), j = Object;
      d.exports = v ? function(C) {
        return typeof C == "symbol";
      } : function(C) {
        var k = f("Symbol");
        return y(k) && m(k.prototype, j(C));
      };
    }, 2652: (d, w, a) => {
      var f = a(6080), y = a(9565), m = a(8551), v = a(6823), j = a(4209), C = a(6198), k = a(1625), E = a(81), P = a(851), T = a(9539), I = TypeError, L = function(H, A) {
        this.stopped = H, this.result = A;
      }, M = L.prototype;
      d.exports = function(H, A, N) {
        var B, z, V, Y, J, Z, le, oe = N && N.that, ne = !(!N || !N.AS_ENTRIES), ye = !(!N || !N.IS_RECORD), ue = !(!N || !N.IS_ITERATOR), je = !(!N || !N.INTERRUPTED), Ee = f(A, oe), Se = function(Re) {
          return B && T(B, "normal", Re), new L(!0, Re);
        }, me = function(Re) {
          return ne ? (m(Re), je ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : je ? Ee(Re, Se) : Ee(Re);
        };
        if (ye) B = H.iterator;
        else if (ue) B = H;
        else {
          if (!(z = P(H))) throw new I(v(H) + " is not iterable");
          if (j(z)) {
            for (V = 0, Y = C(H); Y > V; V++) if ((J = me(H[V])) && k(M, J)) return J;
            return new L(!1);
          }
          B = E(H, z);
        }
        for (Z = ye ? H.next : B.next; !(le = y(Z, B)).done; ) {
          try {
            J = me(le.value);
          } catch (Re) {
            T(B, "throw", Re);
          }
          if (typeof J == "object" && J && k(M, J)) return J;
        }
        return new L(!1);
      };
    }, 9539: (d, w, a) => {
      var f = a(9565), y = a(8551), m = a(5966);
      d.exports = function(v, j, C) {
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
    }, 3994: (d, w, a) => {
      var f = a(7657).IteratorPrototype, y = a(2360), m = a(6980), v = a(687), j = a(6269), C = function() {
        return this;
      };
      d.exports = function(k, E, P, T) {
        var I = E + " Iterator";
        return k.prototype = y(f, { next: m(+!T, P) }), v(k, I, !1, !0), j[I] = C, k;
      };
    }, 1088: (d, w, a) => {
      var f = a(6518), y = a(9565), m = a(6395), v = a(350), j = a(4901), C = a(3994), k = a(2787), E = a(2967), P = a(687), T = a(6699), I = a(6840), L = a(8227), M = a(6269), H = a(7657), A = v.PROPER, N = v.CONFIGURABLE, B = H.IteratorPrototype, z = H.BUGGY_SAFARI_ITERATORS, V = L("iterator"), Y = "keys", J = "values", Z = "entries", le = function() {
        return this;
      };
      d.exports = function(oe, ne, ye, ue, je, Ee, Se) {
        C(ye, ne, ue);
        var me, Re, Pe, Fe = function(F) {
          if (F === je && $e) return $e;
          if (!z && F && F in Ve) return Ve[F];
          switch (F) {
            case Y:
            case J:
            case Z:
              return function() {
                return new ye(this, F);
              };
          }
          return function() {
            return new ye(this);
          };
        }, Ye = ne + " Iterator", tt = !1, Ve = oe.prototype, Te = Ve[V] || Ve["@@iterator"] || je && Ve[je], $e = !z && Te || Fe(je), R = ne === "Array" && Ve.entries || Te;
        if (R && (me = k(R.call(new oe()))) !== Object.prototype && me.next && (m || k(me) === B || (E ? E(me, B) : j(me[V]) || I(me, V, le)), P(me, Ye, !0, !0), m && (M[Ye] = le)), A && je === J && Te && Te.name !== J && (!m && N ? T(Ve, "name", J) : (tt = !0, $e = function() {
          return y(Te, this);
        })), je) if (Re = { values: Fe(J), keys: Ee ? $e : Fe(Y), entries: Fe(Z) }, Se) for (Pe in Re) (z || tt || !(Pe in Ve)) && I(Ve, Pe, Re[Pe]);
        else f({ target: ne, proto: !0, forced: z || tt }, Re);
        return m && !Se || Ve[V] === $e || I(Ve, V, $e, { name: je }), M[ne] = $e, Re;
      };
    }, 7657: (d, w, a) => {
      var f, y, m, v = a(9039), j = a(4901), C = a(34), k = a(2360), E = a(2787), P = a(6840), T = a(8227), I = a(6395), L = T("iterator"), M = !1;
      [].keys && ("next" in (m = [].keys()) ? (y = E(E(m))) !== Object.prototype && (f = y) : M = !0), !C(f) || v(function() {
        var H = {};
        return f[L].call(H) !== H;
      }) ? f = {} : I && (f = k(f)), j(f[L]) || P(f, L, function() {
        return this;
      }), d.exports = { IteratorPrototype: f, BUGGY_SAFARI_ITERATORS: M };
    }, 6269: (d) => {
      d.exports = {};
    }, 6198: (d, w, a) => {
      var f = a(8014);
      d.exports = function(y) {
        return f(y.length);
      };
    }, 283: (d, w, a) => {
      var f = a(9504), y = a(9039), m = a(4901), v = a(9297), j = a(3724), C = a(350).CONFIGURABLE, k = a(3706), E = a(1181), P = E.enforce, T = E.get, I = String, L = Object.defineProperty, M = f("".slice), H = f("".replace), A = f([].join), N = j && !y(function() {
        return L(function() {
        }, "length", { value: 8 }).length !== 8;
      }), B = String(String).split("String"), z = d.exports = function(V, Y, J) {
        M(I(Y), 0, 7) === "Symbol(" && (Y = "[" + H(I(Y), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), J && J.getter && (Y = "get " + Y), J && J.setter && (Y = "set " + Y), (!v(V, "name") || C && V.name !== Y) && (j ? L(V, "name", { value: Y, configurable: !0 }) : V.name = Y), N && J && v(J, "arity") && V.length !== J.arity && L(V, "length", { value: J.arity });
        try {
          J && v(J, "constructor") && J.constructor ? j && L(V, "prototype", { writable: !1 }) : V.prototype && (V.prototype = void 0);
        } catch {
        }
        var Z = P(V);
        return v(Z, "source") || (Z.source = A(B, typeof Y == "string" ? Y : "")), V;
      };
      Function.prototype.toString = z(function() {
        return m(this) && T(this).source || k(this);
      }, "toString");
    }, 741: (d) => {
      var w = Math.ceil, a = Math.floor;
      d.exports = Math.trunc || function(f) {
        var y = +f;
        return (y > 0 ? a : w)(y);
      };
    }, 1955: (d, w, a) => {
      var f, y, m, v, j, C = a(4475), k = a(3389), E = a(6080), P = a(9225).set, T = a(8265), I = a(8119), L = a(28), M = a(6765), H = a(9088), A = C.MutationObserver || C.WebKitMutationObserver, N = C.document, B = C.process, z = C.Promise, V = k("queueMicrotask");
      if (!V) {
        var Y = new T(), J = function() {
          var Z, le;
          for (H && (Z = B.domain) && Z.exit(); le = Y.get(); ) try {
            le();
          } catch (oe) {
            throw Y.head && f(), oe;
          }
          Z && Z.enter();
        };
        I || H || M || !A || !N ? !L && z && z.resolve ? ((v = z.resolve(void 0)).constructor = z, j = E(v.then, v), f = function() {
          j(J);
        }) : H ? f = function() {
          B.nextTick(J);
        } : (P = E(P, C), f = function() {
          P(J);
        }) : (y = !0, m = N.createTextNode(""), new A(J).observe(m, { characterData: !0 }), f = function() {
          m.data = y = !y;
        }), V = function(Z) {
          Y.head || f(), Y.add(Z);
        };
      }
      d.exports = V;
    }, 6043: (d, w, a) => {
      var f = a(9306), y = TypeError, m = function(v) {
        var j, C;
        this.promise = new v(function(k, E) {
          if (j !== void 0 || C !== void 0) throw new y("Bad Promise constructor");
          j = k, C = E;
        }), this.resolve = f(j), this.reject = f(C);
      };
      d.exports.f = function(v) {
        return new m(v);
      };
    }, 5749: (d, w, a) => {
      var f = a(788), y = TypeError;
      d.exports = function(m) {
        if (f(m)) throw new y("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (d, w, a) => {
      var f = a(4475), y = a(9039), m = a(9504), v = a(655), j = a(3802).trim, C = a(7452), k = m("".charAt), E = f.parseFloat, P = f.Symbol, T = P && P.iterator, I = 1 / E(C + "-0") != -1 / 0 || T && !y(function() {
        E(Object(T));
      });
      d.exports = I ? function(L) {
        var M = j(v(L)), H = E(M);
        return H === 0 && k(M, 0) === "-" ? -0 : H;
      } : E;
    }, 2703: (d, w, a) => {
      var f = a(4475), y = a(9039), m = a(9504), v = a(655), j = a(3802).trim, C = a(7452), k = f.parseInt, E = f.Symbol, P = E && E.iterator, T = /^[+-]?0x/i, I = m(T.exec), L = k(C + "08") !== 8 || k(C + "0x16") !== 22 || P && !y(function() {
        k(Object(P));
      });
      d.exports = L ? function(M, H) {
        var A = j(v(M));
        return k(A, H >>> 0 || (I(T, A) ? 16 : 10));
      } : k;
    }, 4213: (d, w, a) => {
      var f = a(3724), y = a(9504), m = a(9565), v = a(9039), j = a(1072), C = a(3717), k = a(8773), E = a(8981), P = a(7055), T = Object.assign, I = Object.defineProperty, L = y([].concat);
      d.exports = !T || v(function() {
        if (f && T({ b: 1 }, T(I({}, "a", { enumerable: !0, get: function() {
          I(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var M = {}, H = {}, A = Symbol("assign detection"), N = "abcdefghijklmnopqrst";
        return M[A] = 7, N.split("").forEach(function(B) {
          H[B] = B;
        }), T({}, M)[A] !== 7 || j(T({}, H)).join("") !== N;
      }) ? function(M, H) {
        for (var A = E(M), N = arguments.length, B = 1, z = C.f, V = k.f; N > B; ) for (var Y, J = P(arguments[B++]), Z = z ? L(j(J), z(J)) : j(J), le = Z.length, oe = 0; le > oe; ) Y = Z[oe++], f && !m(V, J, Y) || (A[Y] = J[Y]);
        return A;
      } : T;
    }, 2360: (d, w, a) => {
      var f, y = a(8551), m = a(6801), v = a(8727), j = a(421), C = a(397), k = a(4055), E = a(6119), P = "prototype", T = "script", I = E("IE_PROTO"), L = function() {
      }, M = function(N) {
        return "<" + T + ">" + N + "</" + T + ">";
      }, H = function(N) {
        N.write(M("")), N.close();
        var B = N.parentWindow.Object;
        return N = null, B;
      }, A = function() {
        try {
          f = new ActiveXObject("htmlfile");
        } catch {
        }
        var N, B, z;
        A = typeof document < "u" ? document.domain && f ? H(f) : (B = k("iframe"), z = "java" + T + ":", B.style.display = "none", C.appendChild(B), B.src = String(z), (N = B.contentWindow.document).open(), N.write(M("document.F=Object")), N.close(), N.F) : H(f);
        for (var V = v.length; V--; ) delete A[P][v[V]];
        return A();
      };
      j[I] = !0, d.exports = Object.create || function(N, B) {
        var z;
        return N !== null ? (L[P] = y(N), z = new L(), L[P] = null, z[I] = N) : z = A(), B === void 0 ? z : m.f(z, B);
      };
    }, 6801: (d, w, a) => {
      var f = a(3724), y = a(8686), m = a(4913), v = a(8551), j = a(5397), C = a(1072);
      w.f = f && !y ? Object.defineProperties : function(k, E) {
        v(k);
        for (var P, T = j(E), I = C(E), L = I.length, M = 0; L > M; ) m.f(k, P = I[M++], T[P]);
        return k;
      };
    }, 4913: (d, w, a) => {
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
    }, 7347: (d, w, a) => {
      var f = a(3724), y = a(9565), m = a(8773), v = a(6980), j = a(5397), C = a(6969), k = a(9297), E = a(5917), P = Object.getOwnPropertyDescriptor;
      w.f = f ? P : function(T, I) {
        if (T = j(T), I = C(I), E) try {
          return P(T, I);
        } catch {
        }
        if (k(T, I)) return v(!y(m.f, T, I), T[I]);
      };
    }, 298: (d, w, a) => {
      var f = a(4576), y = a(5397), m = a(8480).f, v = a(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      d.exports.f = function(C) {
        return j && f(C) === "Window" ? function(k) {
          try {
            return m(k);
          } catch {
            return v(j);
          }
        }(C) : m(y(C));
      };
    }, 8480: (d, w, a) => {
      var f = a(1828), y = a(8727).concat("length", "prototype");
      w.f = Object.getOwnPropertyNames || function(m) {
        return f(m, y);
      };
    }, 3717: (d, w) => {
      w.f = Object.getOwnPropertySymbols;
    }, 2787: (d, w, a) => {
      var f = a(9297), y = a(4901), m = a(8981), v = a(6119), j = a(2211), C = v("IE_PROTO"), k = Object, E = k.prototype;
      d.exports = j ? k.getPrototypeOf : function(P) {
        var T = m(P);
        if (f(T, C)) return T[C];
        var I = T.constructor;
        return y(I) && T instanceof I ? I.prototype : T instanceof k ? E : null;
      };
    }, 1625: (d, w, a) => {
      var f = a(9504);
      d.exports = f({}.isPrototypeOf);
    }, 1828: (d, w, a) => {
      var f = a(9504), y = a(9297), m = a(5397), v = a(9617).indexOf, j = a(421), C = f([].push);
      d.exports = function(k, E) {
        var P, T = m(k), I = 0, L = [];
        for (P in T) !y(j, P) && y(T, P) && C(L, P);
        for (; E.length > I; ) y(T, P = E[I++]) && (~v(L, P) || C(L, P));
        return L;
      };
    }, 1072: (d, w, a) => {
      var f = a(1828), y = a(8727);
      d.exports = Object.keys || function(m) {
        return f(m, y);
      };
    }, 8773: (d, w) => {
      var a = {}.propertyIsEnumerable, f = Object.getOwnPropertyDescriptor, y = f && !a.call({ 1: 2 }, 1);
      w.f = y ? function(m) {
        var v = f(this, m);
        return !!v && v.enumerable;
      } : a;
    }, 2967: (d, w, a) => {
      var f = a(6706), y = a(34), m = a(7750), v = a(3506);
      d.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, C = !1, k = {};
        try {
          (j = f(Object.prototype, "__proto__", "set"))(k, []), C = k instanceof Array;
        } catch {
        }
        return function(E, P) {
          return m(E), v(P), y(E) && (C ? j(E, P) : E.__proto__ = P), E;
        };
      }() : void 0);
    }, 2357: (d, w, a) => {
      var f = a(3724), y = a(9039), m = a(9504), v = a(2787), j = a(1072), C = a(5397), k = m(a(8773).f), E = m([].push), P = f && y(function() {
        var I = /* @__PURE__ */ Object.create(null);
        return I[2] = 2, !k(I, 2);
      }), T = function(I) {
        return function(L) {
          for (var M, H = C(L), A = j(H), N = P && v(H) === null, B = A.length, z = 0, V = []; B > z; ) M = A[z++], f && !(N ? M in H : k(H, M)) || E(V, I ? [M, H[M]] : H[M]);
          return V;
        };
      };
      d.exports = { entries: T(!0), values: T(!1) };
    }, 3179: (d, w, a) => {
      var f = a(2140), y = a(6955);
      d.exports = f ? {}.toString : function() {
        return "[object " + y(this) + "]";
      };
    }, 4270: (d, w, a) => {
      var f = a(9565), y = a(4901), m = a(34), v = TypeError;
      d.exports = function(j, C) {
        var k, E;
        if (C === "string" && y(k = j.toString) && !m(E = f(k, j)) || y(k = j.valueOf) && !m(E = f(k, j)) || C !== "string" && y(k = j.toString) && !m(E = f(k, j))) return E;
        throw new v("Can't convert object to primitive value");
      };
    }, 5031: (d, w, a) => {
      var f = a(7751), y = a(9504), m = a(8480), v = a(3717), j = a(8551), C = y([].concat);
      d.exports = f("Reflect", "ownKeys") || function(k) {
        var E = m.f(j(k)), P = v.f;
        return P ? C(E, P(k)) : E;
      };
    }, 9167: (d, w, a) => {
      var f = a(4475);
      d.exports = f;
    }, 1103: (d) => {
      d.exports = function(w) {
        try {
          return { error: !1, value: w() };
        } catch (a) {
          return { error: !0, value: a };
        }
      };
    }, 916: (d, w, a) => {
      var f = a(4475), y = a(550), m = a(4901), v = a(2796), j = a(3706), C = a(8227), k = a(7290), E = a(516), P = a(6395), T = a(7388), I = y && y.prototype, L = C("species"), M = !1, H = m(f.PromiseRejectionEvent), A = v("Promise", function() {
        var N = j(y), B = N !== String(y);
        if (!B && T === 66 || P && (!I.catch || !I.finally)) return !0;
        if (!T || T < 51 || !/native code/.test(N)) {
          var z = new y(function(Y) {
            Y(1);
          }), V = function(Y) {
            Y(function() {
            }, function() {
            });
          };
          if ((z.constructor = {})[L] = V, !(M = z.then(function() {
          }) instanceof V)) return !0;
        }
        return !B && (k || E) && !H;
      });
      d.exports = { CONSTRUCTOR: A, REJECTION_EVENT: H, SUBCLASSING: M };
    }, 550: (d, w, a) => {
      var f = a(4475);
      d.exports = f.Promise;
    }, 3438: (d, w, a) => {
      var f = a(8551), y = a(34), m = a(6043);
      d.exports = function(v, j) {
        if (f(v), y(j) && j.constructor === v) return j;
        var C = m.f(v);
        return (0, C.resolve)(j), C.promise;
      };
    }, 537: (d, w, a) => {
      var f = a(550), y = a(4428), m = a(916).CONSTRUCTOR;
      d.exports = m || !y(function(v) {
        f.all(v).then(void 0, function() {
        });
      });
    }, 1056: (d, w, a) => {
      var f = a(4913).f;
      d.exports = function(y, m, v) {
        v in y || f(y, v, { configurable: !0, get: function() {
          return m[v];
        }, set: function(j) {
          m[v] = j;
        } });
      };
    }, 8265: (d) => {
      var w = function() {
        this.head = null, this.tail = null;
      };
      w.prototype = { add: function(a) {
        var f = { item: a, next: null }, y = this.tail;
        y ? y.next = f : this.head = f, this.tail = f;
      }, get: function() {
        var a = this.head;
        if (a) return (this.head = a.next) === null && (this.tail = null), a.item;
      } }, d.exports = w;
    }, 6682: (d, w, a) => {
      var f = a(9565), y = a(8551), m = a(4901), v = a(4576), j = a(7323), C = TypeError;
      d.exports = function(k, E) {
        var P = k.exec;
        if (m(P)) {
          var T = f(P, k, E);
          return T !== null && y(T), T;
        }
        if (v(k) === "RegExp") return f(j, k, E);
        throw new C("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (d, w, a) => {
      var f, y, m = a(9565), v = a(9504), j = a(655), C = a(7979), k = a(8429), E = a(5745), P = a(2360), T = a(1181).get, I = a(3635), L = a(8814), M = E("native-string-replace", String.prototype.replace), H = RegExp.prototype.exec, A = H, N = v("".charAt), B = v("".indexOf), z = v("".replace), V = v("".slice), Y = (y = /b*/g, m(H, f = /a/, "a"), m(H, y, "a"), f.lastIndex !== 0 || y.lastIndex !== 0), J = k.BROKEN_CARET, Z = /()??/.exec("")[1] !== void 0;
      (Y || Z || J || I || L) && (A = function(le) {
        var oe, ne, ye, ue, je, Ee, Se, me = this, Re = T(me), Pe = j(le), Fe = Re.raw;
        if (Fe) return Fe.lastIndex = me.lastIndex, oe = m(A, Fe, Pe), me.lastIndex = Fe.lastIndex, oe;
        var Ye = Re.groups, tt = J && me.sticky, Ve = m(C, me), Te = me.source, $e = 0, R = Pe;
        if (tt && (Ve = z(Ve, "y", ""), B(Ve, "g") === -1 && (Ve += "g"), R = V(Pe, me.lastIndex), me.lastIndex > 0 && (!me.multiline || me.multiline && N(Pe, me.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", R = " " + R, $e++), ne = new RegExp("^(?:" + Te + ")", Ve)), Z && (ne = new RegExp("^" + Te + "$(?!\\s)", Ve)), Y && (ye = me.lastIndex), ue = m(H, tt ? ne : me, R), tt ? ue ? (ue.input = V(ue.input, $e), ue[0] = V(ue[0], $e), ue.index = me.lastIndex, me.lastIndex += ue[0].length) : me.lastIndex = 0 : Y && ue && (me.lastIndex = me.global ? ue.index + ue[0].length : ye), Z && ue && ue.length > 1 && m(M, ue[0], ne, function() {
          for (je = 1; je < arguments.length - 2; je++) arguments[je] === void 0 && (ue[je] = void 0);
        }), ue && Ye) for (ue.groups = Ee = P(null), je = 0; je < Ye.length; je++) Ee[(Se = Ye[je])[0]] = ue[Se[1]];
        return ue;
      }), d.exports = A;
    }, 7979: (d, w, a) => {
      var f = a(8551);
      d.exports = function() {
        var y = f(this), m = "";
        return y.hasIndices && (m += "d"), y.global && (m += "g"), y.ignoreCase && (m += "i"), y.multiline && (m += "m"), y.dotAll && (m += "s"), y.unicode && (m += "u"), y.unicodeSets && (m += "v"), y.sticky && (m += "y"), m;
      };
    }, 1034: (d, w, a) => {
      var f = a(9565), y = a(9297), m = a(1625), v = a(7979), j = RegExp.prototype;
      d.exports = function(C) {
        var k = C.flags;
        return k !== void 0 || "flags" in j || y(C, "flags") || !m(j, C) ? k : f(v, C);
      };
    }, 8429: (d, w, a) => {
      var f = a(9039), y = a(4475).RegExp, m = f(function() {
        var C = y("a", "y");
        return C.lastIndex = 2, C.exec("abcd") !== null;
      }), v = m || f(function() {
        return !y("a", "y").sticky;
      }), j = m || f(function() {
        var C = y("^r", "gy");
        return C.lastIndex = 2, C.exec("str") !== null;
      });
      d.exports = { BROKEN_CARET: j, MISSED_STICKY: v, UNSUPPORTED_Y: m };
    }, 3635: (d, w, a) => {
      var f = a(9039), y = a(4475).RegExp;
      d.exports = f(function() {
        var m = y(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (d, w, a) => {
      var f = a(9039), y = a(4475).RegExp;
      d.exports = f(function() {
        var m = y("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (d, w, a) => {
      var f = a(4117), y = TypeError;
      d.exports = function(m) {
        if (f(m)) throw new y("Can't call method on " + m);
        return m;
      };
    }, 3389: (d, w, a) => {
      var f = a(4475), y = a(3724), m = Object.getOwnPropertyDescriptor;
      d.exports = function(v) {
        if (!y) return f[v];
        var j = m(f, v);
        return j && j.value;
      };
    }, 9472: (d, w, a) => {
      var f, y = a(4475), m = a(8745), v = a(4901), j = a(6763), C = a(9392), k = a(7680), E = a(2812), P = y.Function, T = /MSIE .\./.test(C) || j && ((f = y.Bun.version.split(".")).length < 3 || f[0] === "0" && (f[1] < 3 || f[1] === "3" && f[2] === "0"));
      d.exports = function(I, L) {
        var M = L ? 2 : 1;
        return T ? function(H, A) {
          var N = E(arguments.length, 1) > M, B = v(H) ? H : P(H), z = N ? k(arguments, M) : [], V = N ? function() {
            m(B, this, z);
          } : B;
          return L ? I(V, A) : I(V);
        } : I;
      };
    }, 7633: (d, w, a) => {
      var f = a(7751), y = a(2106), m = a(8227), v = a(3724), j = m("species");
      d.exports = function(C) {
        var k = f(C);
        v && k && !k[j] && y(k, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (d, w, a) => {
      var f = a(4913).f, y = a(9297), m = a(8227)("toStringTag");
      d.exports = function(v, j, C) {
        v && !C && (v = v.prototype), v && !y(v, m) && f(v, m, { configurable: !0, value: j });
      };
    }, 6119: (d, w, a) => {
      var f = a(5745), y = a(3392), m = f("keys");
      d.exports = function(v) {
        return m[v] || (m[v] = y(v));
      };
    }, 7629: (d, w, a) => {
      var f = a(6395), y = a(4475), m = a(9433), v = "__core-js_shared__", j = d.exports = y[v] || m(v, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: f ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (d, w, a) => {
      var f = a(7629);
      d.exports = function(y, m) {
        return f[y] || (f[y] = m || {});
      };
    }, 2293: (d, w, a) => {
      var f = a(8551), y = a(5548), m = a(4117), v = a(8227)("species");
      d.exports = function(j, C) {
        var k, E = f(j).constructor;
        return E === void 0 || m(k = f(E)[v]) ? C : y(k);
      };
    }, 8183: (d, w, a) => {
      var f = a(9504), y = a(1291), m = a(655), v = a(7750), j = f("".charAt), C = f("".charCodeAt), k = f("".slice), E = function(P) {
        return function(T, I) {
          var L, M, H = m(v(T)), A = y(I), N = H.length;
          return A < 0 || A >= N ? P ? "" : void 0 : (L = C(H, A)) < 55296 || L > 56319 || A + 1 === N || (M = C(H, A + 1)) < 56320 || M > 57343 ? P ? j(H, A) : L : P ? k(H, A, A + 2) : M - 56320 + (L - 55296 << 10) + 65536;
        };
      };
      d.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (d, w, a) => {
      var f = a(9504), y = a(8014), m = a(655), v = a(2333), j = a(7750), C = f(v), k = f("".slice), E = Math.ceil, P = function(T) {
        return function(I, L, M) {
          var H, A, N = m(j(I)), B = y(L), z = N.length, V = M === void 0 ? " " : m(M);
          return B <= z || V === "" ? N : ((A = C(V, E((H = B - z) / V.length))).length > H && (A = k(A, 0, H)), T ? N + A : A + N);
        };
      };
      d.exports = { start: P(!1), end: P(!0) };
    }, 2333: (d, w, a) => {
      var f = a(1291), y = a(655), m = a(7750), v = RangeError;
      d.exports = function(j) {
        var C = y(m(this)), k = "", E = f(j);
        if (E < 0 || E === 1 / 0) throw new v("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (C += C)) 1 & E && (k += C);
        return k;
      };
    }, 706: (d, w, a) => {
      var f = a(350).PROPER, y = a(9039), m = a(7452);
      d.exports = function(v) {
        return y(function() {
          return !!m[v]() || "​᠎"[v]() !== "​᠎" || f && m[v].name !== v;
        });
      };
    }, 3802: (d, w, a) => {
      var f = a(9504), y = a(7750), m = a(655), v = a(7452), j = f("".replace), C = RegExp("^[" + v + "]+"), k = RegExp("(^|[^" + v + "])[" + v + "]+$"), E = function(P) {
        return function(T) {
          var I = m(y(T));
          return 1 & P && (I = j(I, C, "")), 2 & P && (I = j(I, k, "$1")), I;
        };
      };
      d.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (d, w, a) => {
      var f = a(7388), y = a(9039), m = a(4475).String;
      d.exports = !!Object.getOwnPropertySymbols && !y(function() {
        var v = Symbol("symbol detection");
        return !m(v) || !(Object(v) instanceof Symbol) || !Symbol.sham && f && f < 41;
      });
    }, 8242: (d, w, a) => {
      var f = a(9565), y = a(7751), m = a(8227), v = a(6840);
      d.exports = function() {
        var j = y("Symbol"), C = j && j.prototype, k = C && C.valueOf, E = m("toPrimitive");
        C && !C[E] && v(C, E, function(P) {
          return f(k, this);
        }, { arity: 1 });
      };
    }, 1296: (d, w, a) => {
      var f = a(4495);
      d.exports = f && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (d, w, a) => {
      var f, y, m, v, j = a(4475), C = a(8745), k = a(6080), E = a(4901), P = a(9297), T = a(9039), I = a(397), L = a(7680), M = a(4055), H = a(2812), A = a(8119), N = a(9088), B = j.setImmediate, z = j.clearImmediate, V = j.process, Y = j.Dispatch, J = j.Function, Z = j.MessageChannel, le = j.String, oe = 0, ne = {}, ye = "onreadystatechange";
      T(function() {
        f = j.location;
      });
      var ue = function(me) {
        if (P(ne, me)) {
          var Re = ne[me];
          delete ne[me], Re();
        }
      }, je = function(me) {
        return function() {
          ue(me);
        };
      }, Ee = function(me) {
        ue(me.data);
      }, Se = function(me) {
        j.postMessage(le(me), f.protocol + "//" + f.host);
      };
      B && z || (B = function(me) {
        H(arguments.length, 1);
        var Re = E(me) ? me : J(me), Pe = L(arguments, 1);
        return ne[++oe] = function() {
          C(Re, void 0, Pe);
        }, y(oe), oe;
      }, z = function(me) {
        delete ne[me];
      }, N ? y = function(me) {
        V.nextTick(je(me));
      } : Y && Y.now ? y = function(me) {
        Y.now(je(me));
      } : Z && !A ? (v = (m = new Z()).port2, m.port1.onmessage = Ee, y = k(v.postMessage, v)) : j.addEventListener && E(j.postMessage) && !j.importScripts && f && f.protocol !== "file:" && !T(Se) ? (y = Se, j.addEventListener("message", Ee, !1)) : y = ye in M("script") ? function(me) {
        I.appendChild(M("script"))[ye] = function() {
          I.removeChild(this), ue(me);
        };
      } : function(me) {
        setTimeout(je(me), 0);
      }), d.exports = { set: B, clear: z };
    }, 1240: (d, w, a) => {
      var f = a(9504);
      d.exports = f(1 .valueOf);
    }, 5610: (d, w, a) => {
      var f = a(1291), y = Math.max, m = Math.min;
      d.exports = function(v, j) {
        var C = f(v);
        return C < 0 ? y(C + j, 0) : m(C, j);
      };
    }, 5397: (d, w, a) => {
      var f = a(7055), y = a(7750);
      d.exports = function(m) {
        return f(y(m));
      };
    }, 1291: (d, w, a) => {
      var f = a(741);
      d.exports = function(y) {
        var m = +y;
        return m != m || m === 0 ? 0 : f(m);
      };
    }, 8014: (d, w, a) => {
      var f = a(1291), y = Math.min;
      d.exports = function(m) {
        var v = f(m);
        return v > 0 ? y(v, 9007199254740991) : 0;
      };
    }, 8981: (d, w, a) => {
      var f = a(7750), y = Object;
      d.exports = function(m) {
        return y(f(m));
      };
    }, 2777: (d, w, a) => {
      var f = a(9565), y = a(34), m = a(757), v = a(5966), j = a(4270), C = a(8227), k = TypeError, E = C("toPrimitive");
      d.exports = function(P, T) {
        if (!y(P) || m(P)) return P;
        var I, L = v(P, E);
        if (L) {
          if (T === void 0 && (T = "default"), I = f(L, P, T), !y(I) || m(I)) return I;
          throw new k("Can't convert object to primitive value");
        }
        return T === void 0 && (T = "number"), j(P, T);
      };
    }, 6969: (d, w, a) => {
      var f = a(2777), y = a(757);
      d.exports = function(m) {
        var v = f(m, "string");
        return y(v) ? v : v + "";
      };
    }, 2140: (d, w, a) => {
      var f = {};
      f[a(8227)("toStringTag")] = "z", d.exports = String(f) === "[object z]";
    }, 655: (d, w, a) => {
      var f = a(6955), y = String;
      d.exports = function(m) {
        if (f(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return y(m);
      };
    }, 6823: (d) => {
      var w = String;
      d.exports = function(a) {
        try {
          return w(a);
        } catch {
          return "Object";
        }
      };
    }, 3392: (d, w, a) => {
      var f = a(9504), y = 0, m = Math.random(), v = f(1 .toString);
      d.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + v(++y + m, 36);
      };
    }, 7040: (d, w, a) => {
      var f = a(4495);
      d.exports = f && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (d, w, a) => {
      var f = a(3724), y = a(9039);
      d.exports = f && y(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (d) => {
      var w = TypeError;
      d.exports = function(a, f) {
        if (a < f) throw new w("Not enough arguments");
        return a;
      };
    }, 8622: (d, w, a) => {
      var f = a(4475), y = a(4901), m = f.WeakMap;
      d.exports = y(m) && /native code/.test(String(m));
    }, 511: (d, w, a) => {
      var f = a(9167), y = a(9297), m = a(1951), v = a(4913).f;
      d.exports = function(j) {
        var C = f.Symbol || (f.Symbol = {});
        y(C, j) || v(C, j, { value: m.f(j) });
      };
    }, 1951: (d, w, a) => {
      var f = a(8227);
      w.f = f;
    }, 8227: (d, w, a) => {
      var f = a(4475), y = a(5745), m = a(9297), v = a(3392), j = a(4495), C = a(7040), k = f.Symbol, E = y("wks"), P = C ? k.for || k : k && k.withoutSetter || v;
      d.exports = function(T) {
        return m(E, T) || (E[T] = j && m(k, T) ? k[T] : P("Symbol." + T)), E[T];
      };
    }, 7452: (d) => {
      d.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (d, w, a) => {
      var f = a(6518), y = a(9039), m = a(4376), v = a(34), j = a(8981), C = a(6198), k = a(6837), E = a(4659), P = a(1469), T = a(597), I = a(8227), L = a(7388), M = I("isConcatSpreadable"), H = L >= 51 || !y(function() {
        var N = [];
        return N[M] = !1, N.concat()[0] !== N;
      }), A = function(N) {
        if (!v(N)) return !1;
        var B = N[M];
        return B !== void 0 ? !!B : m(N);
      };
      f({ target: "Array", proto: !0, arity: 1, forced: !H || !T("concat") }, { concat: function(N) {
        var B, z, V, Y, J, Z = j(this), le = P(Z, 0), oe = 0;
        for (B = -1, V = arguments.length; B < V; B++) if (A(J = B === -1 ? Z : arguments[B])) for (Y = C(J), k(oe + Y), z = 0; z < Y; z++, oe++) z in J && E(le, oe, J[z]);
        else k(oe + 1), E(le, oe++, J);
        return le.length = oe, le;
      } });
    }, 8431: (d, w, a) => {
      var f = a(6518), y = a(9213).every;
      f({ target: "Array", proto: !0, forced: !a(4598)("every") }, { every: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (d, w, a) => {
      var f = a(6518), y = a(9213).filter;
      f({ target: "Array", proto: !0, forced: !a(597)("filter") }, { filter: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (d, w, a) => {
      var f = a(6518), y = a(9213).find, m = a(6469), v = "find", j = !0;
      v in [] && Array(1)[v](function() {
        j = !1;
      }), f({ target: "Array", proto: !0, forced: j }, { find: function(C) {
        return y(this, C, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(v);
    }, 1629: (d, w, a) => {
      var f = a(6518), y = a(235);
      f({ target: "Array", proto: !0, forced: [].forEach !== y }, { forEach: y });
    }, 3418: (d, w, a) => {
      var f = a(6518), y = a(7916);
      f({ target: "Array", stat: !0, forced: !a(4428)(function(m) {
        Array.from(m);
      }) }, { from: y });
    }, 4423: (d, w, a) => {
      var f = a(6518), y = a(9617).includes, m = a(9039), v = a(6469);
      f({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return y(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), v("includes");
    }, 5276: (d, w, a) => {
      var f = a(6518), y = a(7476), m = a(9617).indexOf, v = a(4598), j = y([].indexOf), C = !!j && 1 / j([1], 1, -0) < 0;
      f({ target: "Array", proto: !0, forced: C || !v("indexOf") }, { indexOf: function(k) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return C ? j(this, k, E) || 0 : m(this, k, E);
      } });
    }, 4346: (d, w, a) => {
      a(6518)({ target: "Array", stat: !0 }, { isArray: a(4376) });
    }, 3792: (d, w, a) => {
      var f = a(5397), y = a(6469), m = a(6269), v = a(1181), j = a(4913).f, C = a(1088), k = a(2529), E = a(6395), P = a(3724), T = "Array Iterator", I = v.set, L = v.getterFor(T);
      d.exports = C(Array, "Array", function(H, A) {
        I(this, { type: T, target: f(H), index: 0, kind: A });
      }, function() {
        var H = L(this), A = H.target, N = H.index++;
        if (!A || N >= A.length) return H.target = void 0, k(void 0, !0);
        switch (H.kind) {
          case "keys":
            return k(N, !1);
          case "values":
            return k(A[N], !1);
        }
        return k([N, A[N]], !1);
      }, "values");
      var M = m.Arguments = m.Array;
      if (y("keys"), y("values"), y("entries"), !E && P && M.name !== "values") try {
        j(M, "name", { value: "values" });
      } catch {
      }
    }, 8598: (d, w, a) => {
      var f = a(6518), y = a(9504), m = a(7055), v = a(5397), j = a(4598), C = y([].join);
      f({ target: "Array", proto: !0, forced: m !== Object || !j("join", ",") }, { join: function(k) {
        return C(v(this), k === void 0 ? "," : k);
      } });
    }, 2062: (d, w, a) => {
      var f = a(6518), y = a(9213).map;
      f({ target: "Array", proto: !0, forced: !a(597)("map") }, { map: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (d, w, a) => {
      var f = a(6518), y = a(926).left, m = a(4598), v = a(7388);
      f({ target: "Array", proto: !0, forced: !a(9088) && v > 79 && v < 83 || !m("reduce") }, { reduce: function(j) {
        var C = arguments.length;
        return y(this, j, C, C > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (d, w, a) => {
      var f = a(6518), y = a(9504), m = a(4376), v = y([].reverse), j = [1, 2];
      f({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), v(this);
      } });
    }, 4782: (d, w, a) => {
      var f = a(6518), y = a(4376), m = a(3517), v = a(34), j = a(5610), C = a(6198), k = a(5397), E = a(4659), P = a(8227), T = a(597), I = a(7680), L = T("slice"), M = P("species"), H = Array, A = Math.max;
      f({ target: "Array", proto: !0, forced: !L }, { slice: function(N, B) {
        var z, V, Y, J = k(this), Z = C(J), le = j(N, Z), oe = j(B === void 0 ? Z : B, Z);
        if (y(J) && (z = J.constructor, (m(z) && (z === H || y(z.prototype)) || v(z) && (z = z[M]) === null) && (z = void 0), z === H || z === void 0)) return I(J, le, oe);
        for (V = new (z === void 0 ? H : z)(A(oe - le, 0)), Y = 0; le < oe; le++, Y++) le in J && E(V, Y, J[le]);
        return V.length = Y, V;
      } });
    }, 5086: (d, w, a) => {
      var f = a(6518), y = a(9213).some;
      f({ target: "Array", proto: !0, forced: !a(4598)("some") }, { some: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (d, w, a) => {
      var f = a(6518), y = a(9504), m = a(9306), v = a(8981), j = a(6198), C = a(4606), k = a(655), E = a(9039), P = a(4488), T = a(4598), I = a(8834), L = a(3202), M = a(7388), H = a(9160), A = [], N = y(A.sort), B = y(A.push), z = E(function() {
        A.sort(void 0);
      }), V = E(function() {
        A.sort(null);
      }), Y = T("sort"), J = !E(function() {
        if (M) return M < 70;
        if (!(I && I > 3)) {
          if (L) return !0;
          if (H) return H < 603;
          var Z, le, oe, ne, ye = "";
          for (Z = 65; Z < 76; Z++) {
            switch (le = String.fromCharCode(Z), Z) {
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
            for (ne = 0; ne < 47; ne++) A.push({ k: le + ne, v: oe });
          }
          for (A.sort(function(ue, je) {
            return je.v - ue.v;
          }), ne = 0; ne < A.length; ne++) le = A[ne].k.charAt(0), ye.charAt(ye.length - 1) !== le && (ye += le);
          return ye !== "DGBEFHACIJK";
        }
      });
      f({ target: "Array", proto: !0, forced: z || !V || !Y || !J }, { sort: function(Z) {
        Z !== void 0 && m(Z);
        var le = v(this);
        if (J) return Z === void 0 ? N(le) : N(le, Z);
        var oe, ne, ye = [], ue = j(le);
        for (ne = 0; ne < ue; ne++) ne in le && B(ye, le[ne]);
        for (P(ye, /* @__PURE__ */ function(je) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : je !== void 0 ? +je(Ee, Se) || 0 : k(Ee) > k(Se) ? 1 : -1;
          };
        }(Z)), oe = j(ye), ne = 0; ne < oe; ) le[ne] = ye[ne++];
        for (; ne < ue; ) C(le, ne++);
        return le;
      } });
    }, 4554: (d, w, a) => {
      var f = a(6518), y = a(8981), m = a(5610), v = a(1291), j = a(6198), C = a(4527), k = a(6837), E = a(1469), P = a(4659), T = a(4606), I = a(597)("splice"), L = Math.max, M = Math.min;
      f({ target: "Array", proto: !0, forced: !I }, { splice: function(H, A) {
        var N, B, z, V, Y, J, Z = y(this), le = j(Z), oe = m(H, le), ne = arguments.length;
        for (ne === 0 ? N = B = 0 : ne === 1 ? (N = 0, B = le - oe) : (N = ne - 2, B = M(L(v(A), 0), le - oe)), k(le + N - B), z = E(Z, B), V = 0; V < B; V++) (Y = oe + V) in Z && P(z, V, Z[Y]);
        if (z.length = B, N < B) {
          for (V = oe; V < le - B; V++) J = V + N, (Y = V + B) in Z ? Z[J] = Z[Y] : T(Z, J);
          for (V = le; V > le - B + N; V--) T(Z, V - 1);
        } else if (N > B) for (V = le - B; V > oe; V--) J = V + N - 1, (Y = V + B - 1) in Z ? Z[J] = Z[Y] : T(Z, J);
        for (V = 0; V < N; V++) Z[V + oe] = arguments[V + 2];
        return C(Z, le - B + N), z;
      } });
    }, 1688: (d, w, a) => {
      var f = a(6518), y = a(380);
      f({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== y }, { toISOString: y });
    }, 739: (d, w, a) => {
      var f = a(6518), y = a(9039), m = a(8981), v = a(2777);
      f({ target: "Date", proto: !0, arity: 1, forced: y(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var C = m(this), k = v(C, "number");
        return typeof k != "number" || isFinite(k) ? C.toISOString() : null;
      } });
    }, 9572: (d, w, a) => {
      var f = a(9297), y = a(6840), m = a(3640), v = a(8227)("toPrimitive"), j = Date.prototype;
      f(j, v) || y(j, v, m);
    }, 3288: (d, w, a) => {
      var f = a(9504), y = a(6840), m = Date.prototype, v = "Invalid Date", j = "toString", C = f(m[j]), k = f(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== v && y(m, j, function() {
        var E = k(this);
        return E == E ? C(this) : v;
      });
    }, 4170: (d, w, a) => {
      var f = a(6518), y = a(566);
      f({ target: "Function", proto: !0, forced: Function.bind !== y }, { bind: y });
    }, 2010: (d, w, a) => {
      var f = a(3724), y = a(350).EXISTS, m = a(9504), v = a(2106), j = Function.prototype, C = m(j.toString), k = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = m(k.exec);
      f && !y && v(j, "name", { configurable: !0, get: function() {
        try {
          return E(k, C(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (d, w, a) => {
      var f = a(6518), y = a(7751), m = a(8745), v = a(9565), j = a(9504), C = a(9039), k = a(4901), E = a(757), P = a(7680), T = a(6933), I = a(4495), L = String, M = y("JSON", "stringify"), H = j(/./.exec), A = j("".charAt), N = j("".charCodeAt), B = j("".replace), z = j(1 .toString), V = /[\uD800-\uDFFF]/g, Y = /^[\uD800-\uDBFF]$/, J = /^[\uDC00-\uDFFF]$/, Z = !I || C(function() {
        var ye = y("Symbol")("stringify detection");
        return M([ye]) !== "[null]" || M({ a: ye }) !== "{}" || M(Object(ye)) !== "{}";
      }), le = C(function() {
        return M("\uDF06\uD834") !== '"\\udf06\\ud834"' || M("\uDEAD") !== '"\\udead"';
      }), oe = function(ye, ue) {
        var je = P(arguments), Ee = T(ue);
        if (k(Ee) || ye !== void 0 && !E(ye)) return je[1] = function(Se, me) {
          if (k(Ee) && (me = v(Ee, this, L(Se), me)), !E(me)) return me;
        }, m(M, null, je);
      }, ne = function(ye, ue, je) {
        var Ee = A(je, ue - 1), Se = A(je, ue + 1);
        return H(Y, ye) && !H(J, Se) || H(J, ye) && !H(Y, Ee) ? "\\u" + z(N(ye, 0), 16) : ye;
      };
      M && f({ target: "JSON", stat: !0, arity: 3, forced: Z || le }, { stringify: function(ye, ue, je) {
        var Ee = P(arguments), Se = m(Z ? oe : M, null, Ee);
        return le && typeof Se == "string" ? B(Se, V, ne) : Se;
      } });
    }, 4731: (d, w, a) => {
      var f = a(4475);
      a(687)(f.JSON, "JSON", !0);
    }, 479: (d, w, a) => {
      a(687)(Math, "Math", !0);
    }, 2892: (d, w, a) => {
      var f = a(6518), y = a(6395), m = a(3724), v = a(4475), j = a(9167), C = a(9504), k = a(2796), E = a(9297), P = a(3167), T = a(1625), I = a(757), L = a(2777), M = a(9039), H = a(8480).f, A = a(7347).f, N = a(4913).f, B = a(1240), z = a(3802).trim, V = "Number", Y = v[V], J = j[V], Z = Y.prototype, le = v.TypeError, oe = C("".slice), ne = C("".charCodeAt), ye = k(V, !Y(" 0o1") || !Y("0b1") || Y("+0x1")), ue = function(Ee) {
        var Se, me = arguments.length < 1 ? 0 : Y(function(Re) {
          var Pe = L(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(Fe) {
            var Ye, tt, Ve, Te, $e, R, F, W, Q = L(Fe, "number");
            if (I(Q)) throw new le("Cannot convert a Symbol value to a number");
            if (typeof Q == "string" && Q.length > 2) {
              if (Q = z(Q), (Ye = ne(Q, 0)) === 43 || Ye === 45) {
                if ((tt = ne(Q, 2)) === 88 || tt === 120) return NaN;
              } else if (Ye === 48) {
                switch (ne(Q, 1)) {
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
                for (R = ($e = oe(Q, 2)).length, F = 0; F < R; F++) if ((W = ne($e, F)) < 48 || W > Te) return NaN;
                return parseInt($e, Ve);
              }
            }
            return +Q;
          }(Pe);
        }(Ee));
        return T(Z, Se = this) && M(function() {
          B(Se);
        }) ? P(Object(me), this, ue) : me;
      };
      ue.prototype = Z, ye && !y && (Z.constructor = ue), f({ global: !0, constructor: !0, wrap: !0, forced: ye }, { Number: ue });
      var je = function(Ee, Se) {
        for (var me, Re = m ? H(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, me = Re[Pe]) && !E(Ee, me) && N(Ee, me, A(Se, me));
      };
      y && J && je(j[V], J), (ye || y) && je(j[V], Y);
    }, 9868: (d, w, a) => {
      var f = a(6518), y = a(9504), m = a(1291), v = a(1240), j = a(2333), C = a(9039), k = RangeError, E = String, P = Math.floor, T = y(j), I = y("".slice), L = y(1 .toFixed), M = function(B, z, V) {
        return z === 0 ? V : z % 2 == 1 ? M(B, z - 1, V * B) : M(B * B, z / 2, V);
      }, H = function(B, z, V) {
        for (var Y = -1, J = V; ++Y < 6; ) J += z * B[Y], B[Y] = J % 1e7, J = P(J / 1e7);
      }, A = function(B, z) {
        for (var V = 6, Y = 0; --V >= 0; ) Y += B[V], B[V] = P(Y / z), Y = Y % z * 1e7;
      }, N = function(B) {
        for (var z = 6, V = ""; --z >= 0; ) if (V !== "" || z === 0 || B[z] !== 0) {
          var Y = E(B[z]);
          V = V === "" ? Y : V + T("0", 7 - Y.length) + Y;
        }
        return V;
      };
      f({ target: "Number", proto: !0, forced: C(function() {
        return L(8e-5, 3) !== "0.000" || L(0.9, 0) !== "1" || L(1.255, 2) !== "1.25" || L(1000000000000000100, 0) !== "1000000000000000128";
      }) || !C(function() {
        L({});
      }) }, { toFixed: function(B) {
        var z, V, Y, J, Z = v(this), le = m(B), oe = [0, 0, 0, 0, 0, 0], ne = "", ye = "0";
        if (le < 0 || le > 20) throw new k("Incorrect fraction digits");
        if (Z != Z) return "NaN";
        if (Z <= -1e21 || Z >= 1e21) return E(Z);
        if (Z < 0 && (ne = "-", Z = -Z), Z > 1e-21) if (V = (z = function(ue) {
          for (var je = 0, Ee = ue; Ee >= 4096; ) je += 12, Ee /= 4096;
          for (; Ee >= 2; ) je += 1, Ee /= 2;
          return je;
        }(Z * M(2, 69, 1)) - 69) < 0 ? Z * M(2, -z, 1) : Z / M(2, z, 1), V *= 4503599627370496, (z = 52 - z) > 0) {
          for (H(oe, 0, V), Y = le; Y >= 7; ) H(oe, 1e7, 0), Y -= 7;
          for (H(oe, M(10, Y, 1), 0), Y = z - 1; Y >= 23; ) A(oe, 8388608), Y -= 23;
          A(oe, 1 << Y), H(oe, 1, 1), A(oe, 2), ye = N(oe);
        } else H(oe, 0, V), H(oe, 1 << -z, 0), ye = N(oe) + T("0", le);
        return le > 0 ? ne + ((J = ye.length) <= le ? "0." + T("0", le - J) + ye : I(ye, 0, J - le) + "." + I(ye, J - le)) : ne + ye;
      } });
    }, 9085: (d, w, a) => {
      var f = a(6518), y = a(4213);
      f({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== y }, { assign: y });
    }, 9904: (d, w, a) => {
      a(6518)({ target: "Object", stat: !0, sham: !a(3724) }, { create: a(2360) });
    }, 7945: (d, w, a) => {
      var f = a(6518), y = a(3724), m = a(6801).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !y }, { defineProperties: m });
    }, 4185: (d, w, a) => {
      var f = a(6518), y = a(3724), m = a(4913).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !y }, { defineProperty: m });
    }, 5506: (d, w, a) => {
      var f = a(6518), y = a(2357).entries;
      f({ target: "Object", stat: !0 }, { entries: function(m) {
        return y(m);
      } });
    }, 3851: (d, w, a) => {
      var f = a(6518), y = a(9039), m = a(5397), v = a(7347).f, j = a(3724);
      f({ target: "Object", stat: !0, forced: !j || y(function() {
        v(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(C, k) {
        return v(m(C), k);
      } });
    }, 1278: (d, w, a) => {
      var f = a(6518), y = a(3724), m = a(5031), v = a(5397), j = a(7347), C = a(4659);
      f({ target: "Object", stat: !0, sham: !y }, { getOwnPropertyDescriptors: function(k) {
        for (var E, P, T = v(k), I = j.f, L = m(T), M = {}, H = 0; L.length > H; ) (P = I(T, E = L[H++])) !== void 0 && C(M, E, P);
        return M;
      } });
    }, 9773: (d, w, a) => {
      var f = a(6518), y = a(4495), m = a(9039), v = a(3717), j = a(8981);
      f({ target: "Object", stat: !0, forced: !y || m(function() {
        v.f(1);
      }) }, { getOwnPropertySymbols: function(C) {
        var k = v.f;
        return k ? k(j(C)) : [];
      } });
    }, 875: (d, w, a) => {
      var f = a(6518), y = a(9039), m = a(8981), v = a(2787), j = a(2211);
      f({ target: "Object", stat: !0, forced: y(function() {
        v(1);
      }), sham: !j }, { getPrototypeOf: function(C) {
        return v(m(C));
      } });
    }, 9432: (d, w, a) => {
      var f = a(6518), y = a(8981), m = a(1072);
      f({ target: "Object", stat: !0, forced: a(9039)(function() {
        m(1);
      }) }, { keys: function(v) {
        return m(y(v));
      } });
    }, 287: (d, w, a) => {
      a(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: a(2967) });
    }, 6099: (d, w, a) => {
      var f = a(2140), y = a(6840), m = a(3179);
      f || y(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (d, w, a) => {
      var f = a(6518), y = a(2357).values;
      f({ target: "Object", stat: !0 }, { values: function(m) {
        return y(m);
      } });
    }, 8459: (d, w, a) => {
      var f = a(6518), y = a(3904);
      f({ global: !0, forced: parseFloat !== y }, { parseFloat: y });
    }, 8940: (d, w, a) => {
      var f = a(6518), y = a(2703);
      f({ global: !0, forced: parseInt !== y }, { parseInt: y });
    }, 6499: (d, w, a) => {
      var f = a(6518), y = a(9565), m = a(9306), v = a(6043), j = a(1103), C = a(2652);
      f({ target: "Promise", stat: !0, forced: a(537) }, { all: function(k) {
        var E = this, P = v.f(E), T = P.resolve, I = P.reject, L = j(function() {
          var M = m(E.resolve), H = [], A = 0, N = 1;
          C(k, function(B) {
            var z = A++, V = !1;
            N++, y(M, E, B).then(function(Y) {
              V || (V = !0, H[z] = Y, --N || T(H));
            }, I);
          }), --N || T(H);
        });
        return L.error && I(L.value), P.promise;
      } });
    }, 2003: (d, w, a) => {
      var f = a(6518), y = a(6395), m = a(916).CONSTRUCTOR, v = a(550), j = a(7751), C = a(4901), k = a(6840), E = v && v.prototype;
      if (f({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(T) {
        return this.then(void 0, T);
      } }), !y && C(v)) {
        var P = j("Promise").prototype.catch;
        E.catch !== P && k(E, "catch", P, { unsafe: !0 });
      }
    }, 436: (d, w, a) => {
      var f, y, m, v = a(6518), j = a(6395), C = a(9088), k = a(4475), E = a(9565), P = a(6840), T = a(2967), I = a(687), L = a(7633), M = a(9306), H = a(4901), A = a(34), N = a(679), B = a(2293), z = a(9225).set, V = a(1955), Y = a(3138), J = a(1103), Z = a(8265), le = a(1181), oe = a(550), ne = a(916), ye = a(6043), ue = "Promise", je = ne.CONSTRUCTOR, Ee = ne.REJECTION_EVENT, Se = ne.SUBCLASSING, me = le.getterFor(ue), Re = le.set, Pe = oe && oe.prototype, Fe = oe, Ye = Pe, tt = k.TypeError, Ve = k.document, Te = k.process, $e = ye.f, R = $e, F = !!(Ve && Ve.createEvent && k.dispatchEvent), W = "unhandledrejection", Q = function(re) {
        var ae;
        return !(!A(re) || !H(ae = re.then)) && ae;
      }, X = function(re, ae) {
        var he, Oe, Ae, ze = ae.value, nt = ae.state === 1, ut = nt ? re.ok : re.fail, ft = re.resolve, yt = re.reject, Je = re.domain;
        try {
          ut ? (nt || (ae.rejection === 2 && ie(ae), ae.rejection = 1), ut === !0 ? he = ze : (Je && Je.enter(), he = ut(ze), Je && (Je.exit(), Ae = !0)), he === re.promise ? yt(new tt("Promise-chain cycle")) : (Oe = Q(he)) ? E(Oe, he, ft, yt) : ft(he)) : yt(ze);
        } catch (Ze) {
          Je && !Ae && Je.exit(), yt(Ze);
        }
      }, ee = function(re, ae) {
        re.notified || (re.notified = !0, V(function() {
          for (var he, Oe = re.reactions; he = Oe.get(); ) X(he, re);
          re.notified = !1, ae && !re.rejection && pe(re);
        }));
      }, de = function(re, ae, he) {
        var Oe, Ae;
        F ? ((Oe = Ve.createEvent("Event")).promise = ae, Oe.reason = he, Oe.initEvent(re, !1, !0), k.dispatchEvent(Oe)) : Oe = { promise: ae, reason: he }, !Ee && (Ae = k["on" + re]) ? Ae(Oe) : re === W && Y("Unhandled promise rejection", he);
      }, pe = function(re) {
        E(z, k, function() {
          var ae, he = re.facade, Oe = re.value;
          if (ce(re) && (ae = J(function() {
            C ? Te.emit("unhandledRejection", Oe, he) : de(W, he, Oe);
          }), re.rejection = C || ce(re) ? 2 : 1, ae.error)) throw ae.value;
        });
      }, ce = function(re) {
        return re.rejection !== 1 && !re.parent;
      }, ie = function(re) {
        E(z, k, function() {
          var ae = re.facade;
          C ? Te.emit("rejectionHandled", ae) : de("rejectionhandled", ae, re.value);
        });
      }, ke = function(re, ae, he) {
        return function(Oe) {
          re(ae, Oe, he);
        };
      }, be = function(re, ae, he) {
        re.done || (re.done = !0, he && (re = he), re.value = ae, re.state = 2, ee(re, !0));
      }, Ce = function(re, ae, he) {
        if (!re.done) {
          re.done = !0, he && (re = he);
          try {
            if (re.facade === ae) throw new tt("Promise can't be resolved itself");
            var Oe = Q(ae);
            Oe ? V(function() {
              var Ae = { done: !1 };
              try {
                E(Oe, ae, ke(Ce, Ae, re), ke(be, Ae, re));
              } catch (ze) {
                be(Ae, ze, re);
              }
            }) : (re.value = ae, re.state = 1, ee(re, !1));
          } catch (Ae) {
            be({ done: !1 }, Ae, re);
          }
        }
      };
      if (je && (Ye = (Fe = function(re) {
        N(this, Ye), M(re), E(f, this);
        var ae = me(this);
        try {
          re(ke(Ce, ae), ke(be, ae));
        } catch (he) {
          be(ae, he);
        }
      }).prototype, (f = function(re) {
        Re(this, { type: ue, done: !1, notified: !1, parent: !1, reactions: new Z(), rejection: !1, state: 0, value: void 0 });
      }).prototype = P(Ye, "then", function(re, ae) {
        var he = me(this), Oe = $e(B(this, Fe));
        return he.parent = !0, Oe.ok = !H(re) || re, Oe.fail = H(ae) && ae, Oe.domain = C ? Te.domain : void 0, he.state === 0 ? he.reactions.add(Oe) : V(function() {
          X(Oe, he);
        }), Oe.promise;
      }), y = function() {
        var re = new f(), ae = me(re);
        this.promise = re, this.resolve = ke(Ce, ae), this.reject = ke(be, ae);
      }, ye.f = $e = function(re) {
        return re === Fe || re === void 0 ? new y(re) : R(re);
      }, !j && H(oe) && Pe !== Object.prototype)) {
        m = Pe.then, Se || P(Pe, "then", function(re, ae) {
          var he = this;
          return new Fe(function(Oe, Ae) {
            E(m, he, Oe, Ae);
          }).then(re, ae);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        T && T(Pe, Ye);
      }
      v({ global: !0, constructor: !0, wrap: !0, forced: je }, { Promise: Fe }), I(Fe, ue, !1, !0), L(ue);
    }, 3362: (d, w, a) => {
      a(436), a(6499), a(2003), a(7743), a(1481), a(280);
    }, 7743: (d, w, a) => {
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
    }, 1481: (d, w, a) => {
      var f = a(6518), y = a(6043);
      f({ target: "Promise", stat: !0, forced: a(916).CONSTRUCTOR }, { reject: function(m) {
        var v = y.f(this);
        return (0, v.reject)(m), v.promise;
      } });
    }, 280: (d, w, a) => {
      var f = a(6518), y = a(7751), m = a(6395), v = a(550), j = a(916).CONSTRUCTOR, C = a(3438), k = y("Promise"), E = m && !j;
      f({ target: "Promise", stat: !0, forced: m || j }, { resolve: function(P) {
        return C(E && this === k ? v : this, P);
      } });
    }, 825: (d, w, a) => {
      var f = a(6518), y = a(7751), m = a(8745), v = a(566), j = a(5548), C = a(8551), k = a(34), E = a(2360), P = a(9039), T = y("Reflect", "construct"), I = Object.prototype, L = [].push, M = P(function() {
        function N() {
        }
        return !(T(function() {
        }, [], N) instanceof N);
      }), H = !P(function() {
        T(function() {
        });
      }), A = M || H;
      f({ target: "Reflect", stat: !0, forced: A, sham: A }, { construct: function(N, B) {
        j(N), C(B);
        var z = arguments.length < 3 ? N : j(arguments[2]);
        if (H && !M) return T(N, B, z);
        if (N === z) {
          switch (B.length) {
            case 0:
              return new N();
            case 1:
              return new N(B[0]);
            case 2:
              return new N(B[0], B[1]);
            case 3:
              return new N(B[0], B[1], B[2]);
            case 4:
              return new N(B[0], B[1], B[2], B[3]);
          }
          var V = [null];
          return m(L, V, B), new (m(v, N, V))();
        }
        var Y = z.prototype, J = E(k(Y) ? Y : I), Z = m(N, J, B);
        return k(Z) ? Z : J;
      } });
    }, 888: (d, w, a) => {
      var f = a(6518), y = a(9565), m = a(34), v = a(8551), j = a(6575), C = a(7347), k = a(2787);
      f({ target: "Reflect", stat: !0 }, { get: function E(P, T) {
        var I, L, M = arguments.length < 3 ? P : arguments[2];
        return v(P) === M ? P[T] : (I = C.f(P, T)) ? j(I) ? I.value : I.get === void 0 ? void 0 : y(I.get, M) : m(L = k(P)) ? E(L, T, M) : void 0;
      } });
    }, 4864: (d, w, a) => {
      var f = a(3724), y = a(4475), m = a(9504), v = a(2796), j = a(3167), C = a(6699), k = a(2360), E = a(8480).f, P = a(1625), T = a(788), I = a(655), L = a(1034), M = a(8429), H = a(1056), A = a(6840), N = a(9039), B = a(9297), z = a(1181).enforce, V = a(7633), Y = a(8227), J = a(3635), Z = a(8814), le = Y("match"), oe = y.RegExp, ne = oe.prototype, ye = y.SyntaxError, ue = m(ne.exec), je = m("".charAt), Ee = m("".replace), Se = m("".indexOf), me = m("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, Fe = /a/g, Ye = new oe(Pe) !== Pe, tt = M.MISSED_STICKY, Ve = M.UNSUPPORTED_Y;
      if (v("RegExp", f && (!Ye || tt || J || Z || N(function() {
        return Fe[le] = !1, oe(Pe) !== Pe || oe(Fe) === Fe || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(F, W) {
          var Q, X, ee, de, pe, ce, ie = P(ne, this), ke = T(F), be = W === void 0, Ce = [], re = F;
          if (!ie && ke && be && F.constructor === Te) return F;
          if ((ke || P(ne, F)) && (F = F.source, be && (W = L(re))), F = F === void 0 ? "" : I(F), W = W === void 0 ? "" : I(W), re = F, J && "dotAll" in Pe && (X = !!W && Se(W, "s") > -1) && (W = Ee(W, /s/g, "")), Q = W, tt && "sticky" in Pe && (ee = !!W && Se(W, "y") > -1) && Ve && (W = Ee(W, /y/g, "")), Z && (de = function(ae) {
            for (var he, Oe = ae.length, Ae = 0, ze = "", nt = [], ut = k(null), ft = !1, yt = !1, Je = 0, Ze = ""; Ae <= Oe; Ae++) {
              if ((he = je(ae, Ae)) === "\\") he += je(ae, ++Ae);
              else if (he === "]") ft = !1;
              else if (!ft) switch (!0) {
                case he === "[":
                  ft = !0;
                  break;
                case he === "(":
                  ue(Re, me(ae, Ae + 1)) && (Ae += 2, yt = !0), ze += he, Je++;
                  continue;
                case (he === ">" && yt):
                  if (Ze === "" || B(ut, Ze)) throw new ye("Invalid capture group name");
                  ut[Ze] = !0, nt[nt.length] = [Ze, Je], yt = !1, Ze = "";
                  continue;
              }
              yt ? Ze += he : ze += he;
            }
            return [ze, nt];
          }(F), F = de[0], Ce = de[1]), pe = j(oe(F, W), ie ? this : ne, Te), (X || ee || Ce.length) && (ce = z(pe), X && (ce.dotAll = !0, ce.raw = Te(function(ae) {
            for (var he, Oe = ae.length, Ae = 0, ze = "", nt = !1; Ae <= Oe; Ae++) (he = je(ae, Ae)) !== "\\" ? nt || he !== "." ? (he === "[" ? nt = !0 : he === "]" && (nt = !1), ze += he) : ze += "[\\s\\S]" : ze += he + je(ae, ++Ae);
            return ze;
          }(F), Q)), ee && (ce.sticky = !0), Ce.length && (ce.groups = Ce)), F !== re) try {
            C(pe, "source", re === "" ? "(?:)" : re);
          } catch {
          }
          return pe;
        }, $e = E(oe), R = 0; $e.length > R; ) H(Te, oe, $e[R++]);
        ne.constructor = Te, Te.prototype = ne, A(y, "RegExp", Te, { constructor: !0 });
      }
      V("RegExp");
    }, 7495: (d, w, a) => {
      var f = a(6518), y = a(7323);
      f({ target: "RegExp", proto: !0, forced: /./.exec !== y }, { exec: y });
    }, 8781: (d, w, a) => {
      var f = a(350).PROPER, y = a(6840), m = a(8551), v = a(655), j = a(9039), C = a(1034), k = "toString", E = RegExp.prototype, P = E[k], T = j(function() {
        return P.call({ source: "a", flags: "b" }) !== "/a/b";
      }), I = f && P.name !== k;
      (T || I) && y(E, k, function() {
        var L = m(this);
        return "/" + v(L.source) + "/" + v(C(L));
      }, { unsafe: !0 });
    }, 1699: (d, w, a) => {
      var f = a(6518), y = a(9504), m = a(5749), v = a(7750), j = a(655), C = a(1436), k = y("".indexOf);
      f({ target: "String", proto: !0, forced: !C("includes") }, { includes: function(E) {
        return !!~k(j(v(this)), j(m(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (d, w, a) => {
      var f = a(8183).charAt, y = a(655), m = a(1181), v = a(1088), j = a(2529), C = "String Iterator", k = m.set, E = m.getterFor(C);
      v(String, "String", function(P) {
        k(this, { type: C, string: y(P), index: 0 });
      }, function() {
        var P, T = E(this), I = T.string, L = T.index;
        return L >= I.length ? j(void 0, !0) : (P = f(I, L), T.index += P.length, j(P, !1));
      });
    }, 1761: (d, w, a) => {
      var f = a(9565), y = a(9228), m = a(8551), v = a(4117), j = a(8014), C = a(655), k = a(7750), E = a(5966), P = a(7829), T = a(6682);
      y("match", function(I, L, M) {
        return [function(H) {
          var A = k(this), N = v(H) ? void 0 : E(H, I);
          return N ? f(N, H, A) : new RegExp(H)[I](C(A));
        }, function(H) {
          var A = m(this), N = C(H), B = M(L, A, N);
          if (B.done) return B.value;
          if (!A.global) return T(A, N);
          var z = A.unicode;
          A.lastIndex = 0;
          for (var V, Y = [], J = 0; (V = T(A, N)) !== null; ) {
            var Z = C(V[0]);
            Y[J] = Z, Z === "" && (A.lastIndex = P(N, j(A.lastIndex), z)), J++;
          }
          return J === 0 ? null : Y;
        }];
      });
    }, 5440: (d, w, a) => {
      var f = a(8745), y = a(9565), m = a(9504), v = a(9228), j = a(9039), C = a(8551), k = a(4901), E = a(4117), P = a(1291), T = a(8014), I = a(655), L = a(7750), M = a(7829), H = a(5966), A = a(2478), N = a(6682), B = a(8227)("replace"), z = Math.max, V = Math.min, Y = m([].concat), J = m([].push), Z = m("".indexOf), le = m("".slice), oe = "a".replace(/./, "$0") === "$0", ne = !!/./[B] && /./[B]("a", "$0") === "";
      v("replace", function(ye, ue, je) {
        var Ee = ne ? "$" : "$0";
        return [function(Se, me) {
          var Re = L(this), Pe = E(Se) ? void 0 : H(Se, B);
          return Pe ? y(Pe, Se, Re, me) : y(ue, I(Re), Se, me);
        }, function(Se, me) {
          var Re = C(this), Pe = I(Se);
          if (typeof me == "string" && Z(me, Ee) === -1 && Z(me, "$<") === -1) {
            var Fe = je(ue, Re, Pe, me);
            if (Fe.done) return Fe.value;
          }
          var Ye = k(me);
          Ye || (me = I(me));
          var tt, Ve = Re.global;
          Ve && (tt = Re.unicode, Re.lastIndex = 0);
          for (var Te, $e = []; (Te = N(Re, Pe)) !== null && (J($e, Te), Ve); ) I(Te[0]) === "" && (Re.lastIndex = M(Pe, T(Re.lastIndex), tt));
          for (var R, F = "", W = 0, Q = 0; Q < $e.length; Q++) {
            for (var X, ee = I((Te = $e[Q])[0]), de = z(V(P(Te.index), Pe.length), 0), pe = [], ce = 1; ce < Te.length; ce++) J(pe, (R = Te[ce]) === void 0 ? R : String(R));
            var ie = Te.groups;
            if (Ye) {
              var ke = Y([ee], pe, de, Pe);
              ie !== void 0 && J(ke, ie), X = I(f(me, void 0, ke));
            } else X = A(ee, Pe, de, pe, ie, me);
            de >= W && (F += le(Pe, W, de) + X, W = de + ee.length);
          }
          return F + le(Pe, W);
        }];
      }, !!j(function() {
        var ye = /./;
        return ye.exec = function() {
          var ue = [];
          return ue.groups = { a: "7" }, ue;
        }, "".replace(ye, "$<a>") !== "7";
      }) || !oe || ne);
    }, 1392: (d, w, a) => {
      var f, y = a(6518), m = a(7476), v = a(7347).f, j = a(8014), C = a(655), k = a(5749), E = a(7750), P = a(1436), T = a(6395), I = m("".slice), L = Math.min, M = P("startsWith");
      y({ target: "String", proto: !0, forced: !(!T && !M && (f = v(String.prototype, "startsWith"), f && !f.writable) || M) }, { startsWith: function(H) {
        var A = C(E(this));
        k(H);
        var N = j(L(arguments.length > 1 ? arguments[1] : void 0, A.length)), B = C(H);
        return I(A, N, N + B.length) === B;
      } });
    }, 2762: (d, w, a) => {
      var f = a(6518), y = a(3802).trim;
      f({ target: "String", proto: !0, forced: a(706)("trim") }, { trim: function() {
        return y(this);
      } });
    }, 6412: (d, w, a) => {
      a(511)("asyncIterator");
    }, 6761: (d, w, a) => {
      var f = a(6518), y = a(4475), m = a(9565), v = a(9504), j = a(6395), C = a(3724), k = a(4495), E = a(9039), P = a(9297), T = a(1625), I = a(8551), L = a(5397), M = a(6969), H = a(655), A = a(6980), N = a(2360), B = a(1072), z = a(8480), V = a(298), Y = a(3717), J = a(7347), Z = a(4913), le = a(6801), oe = a(8773), ne = a(6840), ye = a(2106), ue = a(5745), je = a(6119), Ee = a(421), Se = a(3392), me = a(8227), Re = a(1951), Pe = a(511), Fe = a(8242), Ye = a(687), tt = a(1181), Ve = a(9213).forEach, Te = je("hidden"), $e = "Symbol", R = "prototype", F = tt.set, W = tt.getterFor($e), Q = Object[R], X = y.Symbol, ee = X && X[R], de = y.RangeError, pe = y.TypeError, ce = y.QObject, ie = J.f, ke = Z.f, be = V.f, Ce = oe.f, re = v([].push), ae = ue("symbols"), he = ue("op-symbols"), Oe = ue("wks"), Ae = !ce || !ce[R] || !ce[R].findChild, ze = function(Be, Ge, We) {
        var Qe = ie(Q, Ge);
        Qe && delete Q[Ge], ke(Be, Ge, We), Qe && Be !== Q && ke(Q, Ge, Qe);
      }, nt = C && E(function() {
        return N(ke({}, "a", { get: function() {
          return ke(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? ze : ke, ut = function(Be, Ge) {
        var We = ae[Be] = N(ee);
        return F(We, { type: $e, tag: Be, description: Ge }), C || (We.description = Ge), We;
      }, ft = function(Be, Ge, We) {
        Be === Q && ft(he, Ge, We), I(Be);
        var Qe = M(Ge);
        return I(We), P(ae, Qe) ? (We.enumerable ? (P(Be, Te) && Be[Te][Qe] && (Be[Te][Qe] = !1), We = N(We, { enumerable: A(0, !1) })) : (P(Be, Te) || ke(Be, Te, A(1, N(null))), Be[Te][Qe] = !0), nt(Be, Qe, We)) : ke(Be, Qe, We);
      }, yt = function(Be, Ge) {
        I(Be);
        var We = L(Ge), Qe = B(We).concat(hn(We));
        return Ve(Qe, function(dt) {
          C && !m(Je, We, dt) || ft(Be, dt, We[dt]);
        }), Be;
      }, Je = function(Be) {
        var Ge = M(Be), We = m(Ce, this, Ge);
        return !(this === Q && P(ae, Ge) && !P(he, Ge)) && (!(We || !P(this, Ge) || !P(ae, Ge) || P(this, Te) && this[Te][Ge]) || We);
      }, Ze = function(Be, Ge) {
        var We = L(Be), Qe = M(Ge);
        if (We !== Q || !P(ae, Qe) || P(he, Qe)) {
          var dt = ie(We, Qe);
          return !dt || !P(ae, Qe) || P(We, Te) && We[Te][Qe] || (dt.enumerable = !0), dt;
        }
      }, wr = function(Be) {
        var Ge = be(L(Be)), We = [];
        return Ve(Ge, function(Qe) {
          P(ae, Qe) || P(Ee, Qe) || re(We, Qe);
        }), We;
      }, hn = function(Be) {
        var Ge = Be === Q, We = be(Ge ? he : L(Be)), Qe = [];
        return Ve(We, function(dt) {
          !P(ae, dt) || Ge && !P(Q, dt) || re(Qe, ae[dt]);
        }), Qe;
      };
      k || (ne(ee = (X = function() {
        if (T(ee, this)) throw new pe("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? H(arguments[0]) : void 0, Ge = Se(Be), We = function(Qe) {
          var dt = this === void 0 ? y : this;
          dt === Q && m(We, he, Qe), P(dt, Te) && P(dt[Te], Ge) && (dt[Te][Ge] = !1);
          var rr = A(1, Qe);
          try {
            nt(dt, Ge, rr);
          } catch (At) {
            if (!(At instanceof de)) throw At;
            ze(dt, Ge, rr);
          }
        };
        return C && Ae && nt(Q, Ge, { configurable: !0, set: We }), ut(Ge, Be);
      })[R], "toString", function() {
        return W(this).tag;
      }), ne(X, "withoutSetter", function(Be) {
        return ut(Se(Be), Be);
      }), oe.f = Je, Z.f = ft, le.f = yt, J.f = Ze, z.f = V.f = wr, Y.f = hn, Re.f = function(Be) {
        return ut(me(Be), Be);
      }, C && (ye(ee, "description", { configurable: !0, get: function() {
        return W(this).description;
      } }), j || ne(Q, "propertyIsEnumerable", Je, { unsafe: !0 }))), f({ global: !0, constructor: !0, wrap: !0, forced: !k, sham: !k }, { Symbol: X }), Ve(B(Oe), function(Be) {
        Pe(Be);
      }), f({ target: $e, stat: !0, forced: !k }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), f({ target: "Object", stat: !0, forced: !k, sham: !C }, { create: function(Be, Ge) {
        return Ge === void 0 ? N(Be) : yt(N(Be), Ge);
      }, defineProperty: ft, defineProperties: yt, getOwnPropertyDescriptor: Ze }), f({ target: "Object", stat: !0, forced: !k }, { getOwnPropertyNames: wr }), Fe(), Ye(X, $e), Ee[Te] = !0;
    }, 9463: (d, w, a) => {
      var f = a(6518), y = a(3724), m = a(4475), v = a(9504), j = a(9297), C = a(4901), k = a(1625), E = a(655), P = a(2106), T = a(7740), I = m.Symbol, L = I && I.prototype;
      if (y && C(I) && (!("description" in L) || I().description !== void 0)) {
        var M = {}, H = function() {
          var J = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), Z = k(L, this) ? new I(J) : J === void 0 ? I() : I(J);
          return J === "" && (M[Z] = !0), Z;
        };
        T(H, I), H.prototype = L, L.constructor = H;
        var A = String(I("description detection")) === "Symbol(description detection)", N = v(L.valueOf), B = v(L.toString), z = /^Symbol\((.*)\)[^)]+$/, V = v("".replace), Y = v("".slice);
        P(L, "description", { configurable: !0, get: function() {
          var J = N(this);
          if (j(M, J)) return "";
          var Z = B(J), le = A ? Y(Z, 7, -1) : V(Z, z, "$1");
          return le === "" ? void 0 : le;
        } }), f({ global: !0, constructor: !0, forced: !0 }, { Symbol: H });
      }
    }, 1510: (d, w, a) => {
      var f = a(6518), y = a(7751), m = a(9297), v = a(655), j = a(5745), C = a(1296), k = j("string-to-symbol-registry"), E = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { for: function(P) {
        var T = v(P);
        if (m(k, T)) return k[T];
        var I = y("Symbol")(T);
        return k[T] = I, E[I] = T, I;
      } });
    }, 2259: (d, w, a) => {
      a(511)("iterator");
    }, 2675: (d, w, a) => {
      a(6761), a(1510), a(7812), a(3110), a(9773);
    }, 7812: (d, w, a) => {
      var f = a(6518), y = a(9297), m = a(757), v = a(6823), j = a(5745), C = a(1296), k = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { keyFor: function(E) {
        if (!m(E)) throw new TypeError(v(E) + " is not a symbol");
        if (y(k, E)) return k[E];
      } });
    }, 5700: (d, w, a) => {
      var f = a(511), y = a(8242);
      f("toPrimitive"), y();
    }, 8125: (d, w, a) => {
      var f = a(7751), y = a(511), m = a(687);
      y("toStringTag"), m(f("Symbol"), "Symbol");
    }, 3500: (d, w, a) => {
      var f = a(4475), y = a(7400), m = a(9296), v = a(235), j = a(6699), C = function(E) {
        if (E && E.forEach !== v) try {
          j(E, "forEach", v);
        } catch {
          E.forEach = v;
        }
      };
      for (var k in y) y[k] && C(f[k] && f[k].prototype);
      C(m);
    }, 2953: (d, w, a) => {
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
    }, 5575: (d, w, a) => {
      var f = a(6518), y = a(4475), m = a(9472)(y.setInterval, !0);
      f({ global: !0, bind: !0, forced: y.setInterval !== m }, { setInterval: m });
    }, 4599: (d, w, a) => {
      var f = a(6518), y = a(4475), m = a(9472)(y.setTimeout, !0);
      f({ global: !0, bind: !0, forced: y.setTimeout !== m }, { setTimeout: m });
    }, 6031: (d, w, a) => {
      a(5575), a(4599);
    } }, _ = {};
    function b(d) {
      var w = _[d];
      if (w !== void 0) return w.exports;
      var a = _[d] = { exports: {} };
      return p[d].call(a.exports, a, a.exports, b), a.exports;
    }
    b.d = (d, w) => {
      for (var a in w) b.o(w, a) && !b.o(d, a) && Object.defineProperty(d, a, { enumerable: !0, get: w[a] });
    }, b.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), b.o = (d, w) => Object.prototype.hasOwnProperty.call(d, w), b.r = (d) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(d, "__esModule", { value: !0 });
    };
    var O = {};
    return (() => {
      b.r(O), b.d(O, { JSONEditor: () => Er }), b(2675), b(9463), b(6412), b(2259), b(5700), b(8125), b(8706), b(113), b(1629), b(3418), b(4346), b(3792), b(2712), b(4490), b(4782), b(739), b(9572), b(3288), b(2010), b(4731), b(479), b(2892), b(9085), b(9904), b(4185), b(875), b(9432), b(287), b(6099), b(6034), b(3362), b(7495), b(8781), b(7764), b(3500), b(2953), b(5506), b(4864), b(5440), b(4423);
      var d = ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "prql", "r", "ruby", "rust", "sass", "scala", "scss", "sh", "smarty", "sql", "sqlserver", "stylus", "svg", "typescript", "twig", "vbscript", "xml", "yaml", "zig"], w = [function(s) {
        return s.type === "string" && s.format === "color" && "colorpicker";
      }, function(s) {
        return s.type === "string" && ["ip", "ipv4", "ipv6", "hostname"].includes(s.format) && "ip";
      }, function(s) {
        return s.type === "string" && d.includes(s.format) && "ace";
      }, function(s) {
        return s.type === "string" && ["xhtml", "bbcode"].includes(s.format) && "sceditor";
      }, function(s) {
        return s.type === "string" && s.format === "markdown" && "simplemde";
      }, function(s) {
        return s.type === "string" && s.format === "jodit" && "jodit";
      }, function(s) {
        return s.type === "string" && s.format === "autocomplete" && "autocomplete";
      }, function(s) {
        return s.type === "string" && s.format === "uuid" && "uuid";
      }, function(s) {
        return s.format === "info" && "info";
      }, function(s) {
        return s.format === "button" && "button";
      }, function(s) {
        if ((s.type === "integer" || s.type === "number") && s.format === "stepper") return "stepper";
      }, function(s) {
        if (s.links) {
          for (var r = 0; r < s.links.length; r++) if (s.links[r].rel && s.links[r].rel.toLowerCase() === "describedby") return "describedBy";
        }
      }, function(s) {
        return ["string", "integer"].includes(s.type) && ["starrating", "rating"].includes(s.format) && "starrating";
      }, function(s) {
        return ["string", "integer"].includes(s.type) && ["date", "time", "datetime-local"].includes(s.format) && "datetime";
      }, function(s) {
        var r, n;
        return (s.oneOf || s.anyOf) && ((r = (n = s.options) === null || n === void 0 ? void 0 : n.switcher) === null || r === void 0 || r) === !0 && "multiple";
      }, function(s) {
        return s.if && "multiple";
      }, function(s, r) {
        if (s.items && (s.items = r.expandSchema(s.items)), s.type === "array" && s.items && !Array.isArray(s.items) && ["string", "number", "integer"].includes(s.items.type)) {
          if (s.format === "choices") return "arrayChoices";
          if (s.uniqueItems) {
            if (s.format === "selectize") return "arraySelectize";
            if (s.format === "select2") return "arraySelect2";
            if (s.items.enum && s.format !== "table") return "multiselect";
          }
        }
      }, function(s) {
        if (s.enum) {
          if (s.type === "array" || s.type === "object") return "enum";
          if (s.type === "number" || s.type === "integer" || s.type === "string") return s.format === "radio" ? "radio" : s.format === "select2" ? "select2" : s.format === "selectize" ? "selectize" : s.format === "choices" ? "choices" : "select";
        }
      }, function(s) {
        if (s.enumSource) return s.format === "radio" ? "radio" : s.format === "select2" ? "select2" : s.format === "selectize" ? "selectize" : s.format === "choices" ? "choices" : "select";
      }, function(s) {
        return s.type === "array" && s.format === "table" && "table";
      }, function(s) {
        return s.type === "string" && s.format === "url" && window.FileReader && s.options && s.options.upload === Object(s.options.upload) && "upload";
      }, function(s) {
        return s.type === "string" && s.media && s.media.binaryEncoding === "base64" && "base64";
      }, function(s) {
        return s.type === "any" && "multiple";
      }, function(s) {
        if (s.type === "boolean") return s.format === "checkbox" || s.options && s.options.checkbox ? "checkbox" : s.format === "select2" ? "select2" : s.format === "selectize" ? "selectize" : s.format === "choices" ? "choices" : "select";
      }, function(s) {
        return s.type === "string" && s.format === "signature" && "signature";
      }, function(s) {
        return typeof s.type == "string" && ["string", "number", "integer", "boolean", "null", "array", "object"].includes(s.type) && s.type;
      }, function(s) {
        return !s.type && s.properties && "object";
      }, function(s) {
        return typeof s.type != "string" && "multiple";
      }, function(s) {
        return typeof s.type == "string" && "string";
      }];
      function a(s, r, n) {
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
        }(r), (r = f(l) == "symbol" ? l : l + "") in s ? Object.defineProperty(s, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : s[r] = n, s;
      }
      function f(s) {
        return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, f(s);
      }
      function y(s) {
        return !(s === null || f(s) !== "object" || s.nodeType || s === s.window || s.constructor && !k(s.constructor.prototype, "isPrototypeOf"));
      }
      function m(s) {
        return y(s) ? v({}, s) : Array.isArray(s) ? s.map(m) : s;
      }
      function v(s) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && y(e[t]) ? (k(s, t) || (s[t] = {}), v(s[t], e[t])) : Array.isArray(e[t]) ? s[t] = m(e[t]) : s[t] = e[t];
          });
        }), s;
      }
      function j(s, r) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(r, !0, !0), s.dispatchEvent(n);
      }
      function C(s) {
        return s && (s.toString() === "[object ShadowRoot]" ? s : C(s.parentNode));
      }
      function k(s, r) {
        return s && Object.prototype.hasOwnProperty.call(s, r);
      }
      b(4170), b(3851), b(825), b(888), b(8598), b(1699), b(1761), b(5276), b(5086), b(1392), b(2062), b(8459), b(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, P = /^\s*(-|\+)?(\d+)\s*$/;
      function T() {
        var s = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (s += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (s + 16 * Math.random()) % 16 | 0;
          return s = Math.floor(s / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function I(s) {
        return s && f(s) === "object" && !Array.isArray(s);
      }
      var L = ["__proto__", "constructor", "prototype"];
      function M(s) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) n[l - 1] = arguments[l];
        if (!n.length) return s;
        var e = n.shift();
        if (I(s) && I(e)) for (var t in e) k(e, t) && (L.includes(t) || (I(e[t]) ? (k(s, t) && I(s[t]) || Object.assign(s, a({}, t, {})), M(s[t], e[t])) : Object.assign(s, a({}, t, e[t]))));
        return M.apply(void 0, [s].concat(n));
      }
      function H(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function A(s) {
        return A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, A(s);
      }
      function N(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, B(l.key), l);
        }
      }
      function B(s) {
        var r = function(n, l) {
          if (A(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (A(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return A(r) == "symbol" ? r : r + "";
      }
      var z = function() {
        return s = function n(l, e) {
          var t, i;
          (function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
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
                var h;
                c.startsWith(n.jsoneditor.root.path) ? h = c : ((h = n.path.split("."))[h.length - 1] = c, h = h.join("."));
                var g = e[c];
                n.checkDependency(h, g);
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
            var l, e, t, i, c, h = this.container.getAttribute("data-schemapath");
            Object.keys(this.schema.watch).forEach(function(g) {
              if (l = n.schema.watch[g], Array.isArray(l)) {
                if (l.length < 2) return;
                e = [l[0]].concat(l[1].split("."));
              } else e = l.split("."), n.theme.closest(n.container, '[data-schemaid="'.concat(e[0], '"]')) || e.unshift("#");
              if ((t = e.shift()) === "#" && (t = n.jsoneditor.schema.id || n.jsoneditor.root.formname), !(i = n.theme.closest(n.container, '[data-schemaid="'.concat(t, '"]')))) throw new Error("Could not find ancestor node with id ".concat(t));
              c = "".concat(i.getAttribute("data-schemapath"), ".").concat(e.join(".")), h.startsWith(c) && (n.watchLoop = !0), n.jsoneditor.watch(c, n.watch_listener), n.watched[g] = c;
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
          var l, e, t = (n.mediaType || "application/javascript").split("/")[0], i = this.jsoneditor.compileTemplate(n.href, this.template_engine), c = this.jsoneditor.compileTemplate(n.rel ? n.rel : n.href, this.template_engine), h = null;
          if (n.download && (h = n.download), h && h !== !0 && (h = this.jsoneditor.compileTemplate(h, this.template_engine)), t === "image") {
            l = this.theme.getBlockLinkHolder(), (e = document.createElement("a")).setAttribute("target", "_blank");
            var g = document.createElement("img");
            this.theme.createImageLink(l, e, g), this.link_watchers.push(function(S) {
              var D = i(S), U = c(S);
              e.setAttribute("href", D), e.setAttribute("title", U || D), g.setAttribute("src", D);
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
          return h && e && (h === !0 ? e.setAttribute("download", "") : this.link_watchers.push(function(S) {
            e.setAttribute("download", h(S));
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
                var h = c.schema.enum.indexOf(c.value), g = c.options.enum_titles[h];
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
            var c, h, g = (h = 2, function(D) {
              if (Array.isArray(D)) return D;
            }(c = i) || function(D, U) {
              var G = D == null ? null : typeof Symbol < "u" && D[Symbol.iterator] || D["@@iterator"];
              if (G != null) {
                var te, fe, _e, we, Ie = [], De = !0, He = !1;
                try {
                  if (_e = (G = G.call(D)).next, U === 0) {
                    if (Object(G) !== G) return;
                    De = !1;
                  } else for (; !(De = (te = _e.call(G)).done) && (Ie.push(te.value), Ie.length !== U); De = !0) ;
                } catch (ve) {
                  He = !0, fe = ve;
                } finally {
                  try {
                    if (!De && G.return != null && (we = G.return(), Object(we) !== we)) return;
                  } finally {
                    if (He) throw fe;
                  }
                }
                return Ie;
              }
            }(c, h) || function(D, U) {
              if (D) {
                if (typeof D == "string") return H(D, U);
                var G = Object.prototype.toString.call(D).slice(8, -1);
                return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? H(D, U) : void 0;
              }
            }(c, h) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), x = g[0], S = g[1];
            S === Object(S) ? l[x] = e.expandCallbacks(n, S) : typeof S == "string" && A(t) === "object" && typeof t[S] == "function" && (l[x] = t[S].bind(null, e));
          }), l;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && N(s.prototype, r), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        var s, r;
      }();
      function V(s) {
        return V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, V(s);
      }
      function Y(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, J(l.key), l);
        }
      }
      function J(s) {
        var r = function(n, l) {
          if (V(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (V(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return V(r) == "symbol" ? r : r + "";
      }
      function Z(s, r, n) {
        return r = ne(r), function(l, e) {
          if (e && (V(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, le() ? Reflect.construct(r, n || [], ne(s).constructor) : r.apply(s, n));
      }
      function le() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (le = function() {
          return !!s;
        })();
      }
      function oe() {
        return oe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ne(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, oe.apply(this, arguments);
      }
      function ne(s) {
        return ne = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ne(s);
      }
      function ye(s, r) {
        return ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ye(s, r);
      }
      var ue = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Z(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ye(e, t);
        }(r, s), n = r, (l = [{ key: "register", value: function() {
          oe(ne(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          oe(ne(r.prototype), "unregister", this).call(this), this.input && (this.input.removeAttribute("name"), this.input.removeAttribute("aria-label"));
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.purify(e), e = this.applyConstFilter(e), (!this.template || i) && (this.shouldBeUnset() || e != null ? V(e) === "object" ? e = JSON.stringify(e) : this.shouldBeUnset() || typeof e == "string" || (e = "".concat(e)) : e = "", e !== this.serialized)) {
            var c = this.sanitize(e);
            if (this.input.value !== c) {
              if (this.setValueToInputField(c), this.format === "range") {
                var h = this.control.querySelector("output");
                h && (h.value = c);
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
            var i = this.schema.minimum || 0, c = this.schema.maximum || Math.max(100, i + 1), h = 1;
            this.schema.multipleOf && (i % this.schema.multipleOf && (i = Math.ceil(i / this.schema.multipleOf) * this.schema.multipleOf), c % this.schema.multipleOf && (c = Math.floor(c / this.schema.multipleOf) * this.schema.multipleOf), h = this.schema.multipleOf), this.input = this.theme.getRangeInput(i, c, h, this.description, this.formname), this.input.setAttribute("id", this.formname);
          } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(this.format) && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
          else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
          this.schema.maxLength !== void 0 && this.input.setAttribute("maxlength", this.schema.maxLength), this.schema.pattern !== void 0 ? this.input.setAttribute("pattern", this.schema.pattern) : this.schema.minLength !== void 0 && this.input.setAttribute("pattern", ".{".concat(this.schema.minLength, ",}")), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function(U) {
            if (U.preventDefault(), U.stopPropagation(), t.schema.template) U.currentTarget.value = t.value;
            else {
              var G = U.currentTarget.value, te = t.sanitize(G);
              G !== te && (U.currentTarget.value = te), t.is_dirty = !0, t.refreshValue(), t.onChange(!0);
            }
          }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function(U) {
            if (U) {
              var G, te = U.offsetHeight;
              if (U.offsetHeight < U.scrollHeight) for (G = 0; U.offsetHeight < U.scrollHeight + 3 && !(G > 100); ) G++, te++, U.style.height = "".concat(te, "px");
              else {
                for (G = 0; U.offsetHeight >= U.scrollHeight + 3 && !(G > 100); ) G++, te--, U.style.height = "".concat(te, "px");
                U.style.height = "".concat(te + 1, "px");
              }
            }
          }, this.input.addEventListener("keyup", function(U) {
            t.adjust_height(U.currentTarget);
          }), this.input.addEventListener("change", function(U) {
            t.adjust_height(U.currentTarget);
          }), this.adjust_height());
          var g = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, x = this.schema.maxLength !== void 0;
          g && x && this.input.addEventListener("paste", function(U) {
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
          var i = e.reduce(function(c, h) {
            return h.path === t.path && c.push(h.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && Y(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function je(s) {
        return je = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, je(s);
      }
      function Ee(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Se(l.key), l);
        }
      }
      function Se(s) {
        var r = function(n, l) {
          if (je(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (je(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return je(r) == "symbol" ? r : r + "";
      }
      function me(s, r, n) {
        return r = Fe(r), function(l, e) {
          if (e && (je(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Re() ? Reflect.construct(r, n || [], Fe(s).constructor) : r.apply(s, n));
      }
      function Re() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Re = function() {
          return !!s;
        })();
      }
      function Pe() {
        return Pe = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Fe(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Pe.apply(this, arguments);
      }
      function Fe(s) {
        return Fe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Fe(s);
      }
      function Ye(s, r) {
        return Ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ye(s, r);
      }
      var tt = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), me(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ye(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
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
      }(ue);
      function Ve(s, r) {
        var n = Object.keys(s);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(s);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(s, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function Te(s, r, n) {
        return (r = F(r)) in s ? Object.defineProperty(s, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : s[r] = n, s;
      }
      function $e(s) {
        return $e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $e(s);
      }
      function R(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, F(l.key), l);
        }
      }
      function F(s) {
        var r = function(n, l) {
          if ($e(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($e(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return $e(r) == "symbol" ? r : r + "";
      }
      function W(s, r, n) {
        return r = ee(r), function(l, e) {
          if (e && ($e(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Q() ? Reflect.construct(r, n || [], ee(s).constructor) : r.apply(s, n));
      }
      function Q() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Q = function() {
          return !!s;
        })();
      }
      function X() {
        return X = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ee(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, X.apply(this, arguments);
      }
      function ee(s) {
        return ee = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ee(s);
      }
      function de(s, r) {
        return de = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, de(s, r);
      }
      b(2008), b(4554), b(7945), b(1278);
      var pe = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), W(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && de(e, t);
        }(r, s), n = r, l = [{ key: "askConfirmation", value: function() {
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
          return Array.isArray(this.schema.items) ? e >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? v({}, this.schema.additionalItems) : void 0 : v({}, this.schema.items[e]) : this.schema.items ? v({}, this.schema.items) : {};
        } }, { key: "getItemInfo", value: function(e) {
          var t = this.getItemSchema(e);
          this.item_info = this.item_info || {};
          var i = JSON.stringify(t);
          return this.item_info[i] !== void 0 || (t = this.jsoneditor.expandRefs(t), this.item_info[i] = { title: this.translateProperty(t.title) || this.translate("default_array_item_title"), default: t.default, width: 12, child_editors: t.properties || t.items }), this.item_info[i];
        } }, { key: "getElementEditor", value: function(e) {
          var t = this.getItemInfo(e), i = this.getItemSchema(e);
          (i = this.jsoneditor.expandRefs(i)).title = "".concat(t.title, " ").concat(e + 1);
          var c, h = this.jsoneditor.getEditorClass(i);
          this.tabs_holder ? (c = this.schema.format === "tabs-top" ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = "".concat(this.path, ".").concat(e) : c = t.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(c);
          var g = this.jsoneditor.createEditor(h, { jsoneditor: this.jsoneditor, schema: i, container: c, path: "".concat(this.path, ".").concat(e), parent: this, required: !0 });
          return g.preBuild(), g.build(), g.postBuild(), g.title_controls || (g.array_controls = this.theme.getButtonHolder(), c.appendChild(g.array_controls)), g;
        } }, { key: "checkParent", value: function(e) {
          return e && e.parentNode;
        } }, { key: "destroy", value: function() {
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, X(ee(r.prototype), "destroy", this).call(this);
        } }, { key: "empty", value: function(e) {
          var t = this;
          if (this.rows !== null) {
            if (this.rows.forEach(function(c, h) {
              e && (t.checkParent(c.tab) && c.tab.parentNode.removeChild(c.tab), t.destroyRow(c, !0), t.row_cache[h] = null), t.rows[h] = null;
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
            var h = this.rows.find(function(x) {
              return x.tab === e.active_tab;
            }), g = h !== void 0 ? h.tab : null;
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
            var h = !(e || this.hide_delete_all_rows_buttons);
            this.setButtonState(this.remove_all_rows_button, h), t.push(h);
          }
          else this.setButtonState(this.delete_last_row_button, !1), this.setButtonState(this.remove_all_rows_button, !1);
          var g = !(this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button);
          return this.setButtonState(this.add_row_button, g), t.push(g), t.some(function(x) {
            return x;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(h) {
            return h.getValue();
          }), i !== this.value.length || e) {
            var c = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(h, g) {
              if (h.movedown_button) {
                var x = g !== t.rows.length - 1;
                t.setButtonState(h.movedown_button, x);
              }
              h.delete_button && t.setButtonState(h.delete_button, !c), t.value[g] = h.getValue();
            }), this.setupButtons(c) && !this.collapsed ? this.controls.style.display = "inline-block" : this.controls.style.display = "none";
          }
          this.serialized = JSON.stringify(this.value);
        } }, { key: "addRow", value: function(e, t) {
          var i = this, c = this.rows.length;
          this.rows[c] = this.getElementEditor(c), this.row_cache[c] = this.rows[c], this.tabs_holder ? (this.rows[c].tab_text = document.createElement("span"), this.rows[c].tab_text.textContent = this.rows[c].getHeaderText(), this.schema.format === "tabs-top" ? (this.rows[c].tab = this.theme.getTopTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTopTab(this.tabs_holder, this.rows[c].tab)) : (this.rows[c].tab = this.theme.getTab(this.rows[c].tab_text, this.getValidId(this.rows[c].path)), this.theme.addTab(this.tabs_holder, this.rows[c].tab)), this.rows[c].tab.addEventListener("click", function(g) {
            i.active_tab = i.rows[c].tab, i.refreshTabs(), g.preventDefault(), g.stopPropagation();
          }), this._supportDragDrop(this.rows[c].tab)) : this._supportDragDrop(this.rows[c].container, !0);
          var h = this.rows[c].title_controls || this.rows[c].array_controls;
          return this.hide_delete_buttons || (this.rows[c].delete_button = this._createDeleteButton(c, h)), this.show_copy_button && (this.rows[c].copy_button = this._createCopyButton(c, h)), c && !this.hide_move_buttons && (this.rows[c].moveup_button = this._createMoveUpButton(c, h)), this.hide_move_buttons || (this.rows[c].movedown_button = this._createMoveDownButton(c, h)), e !== void 0 && this.rows[c].setValue(e, t), this.refreshTabs(), this.rows[c];
        } }, { key: "_createDeleteButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "delete", "button_delete_row_title", [this.getItemTitle()]);
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var g = 1 * h.currentTarget.getAttribute("data-i"), x = i.getValue().filter(function(U, G) {
              return G !== g;
            }), S = null, D = i.rows[g].getValue();
            i.setValue(x), i.rows[g] ? S = i.rows[g].tab : i.rows[g - 1] && (S = i.rows[g - 1].tab), S && (i.active_tab = S, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", D);
          }), t && t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), h = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(g) {
            var x = i.getValue();
            g.preventDefault(), g.stopPropagation();
            var S = 1 * g.currentTarget.getAttribute("data-i");
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
                if (h.items.type === "string" && h.items.format === "uuid") G = T();
                else if (h.items.type === "object" && h.items.properties) for (var te = 0, fe = Object.keys(G); te < fe.length; te++) {
                  var _e = fe[te];
                  h.items.properties && h.items.properties[_e] && h.items.properties[_e].format === "uuid" && (G[_e] = T());
                }
                x.push(G);
              }
            }), i.setValue(x), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[S - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var g = 1 * h.currentTarget.getAttribute("data-i");
            if (!(g <= 0)) {
              var x = i.getValue(), S = x[g - 1];
              x[g - 1] = x[g], x[g] = S, i.setValue(x), i.active_tab = i.rows[g - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g - 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var g = 1 * h.currentTarget.getAttribute("data-i"), x = i.getValue();
            if (!(g >= x.length - 1)) {
              var S = x[g + 1];
              x[g + 1] = x[g], x[g] = S, i.setValue(x), i.active_tab = i.rows[g + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g + 1]);
            }
          }), t && t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          ce(e, function(c, h) {
            var g = i.getValue(), x = g[c];
            g.splice(c, 1), g.splice(h, 0, x), i.setValue(g), i.active_tab = i.rows[h].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[h]);
          }, { useTrigger: t });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
        } }, { key: "_createToggleButton", value: function() {
          var e = this, t = this.getButton("", "collapse", "button_collapse");
          t.classList.add("json-editor-btntype-toggle"), this.title.insertBefore(t, this.title.childNodes[0]);
          var i = this.row_holder.style.display, c = this.controls.style.display;
          return t.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation(), e.panel && e.setButtonState(e.panel, e.collapsed), e.tabs_holder && e.setButtonState(e.tabs_holder, e.collapsed), e.collapsed ? (e.collapsed = !1, e.row_holder.style.display = i, e.controls.style.display = c, e.setButtonText(h.currentTarget, "", "collapse", "button_collapse")) : (e.collapsed = !0, e.row_holder.style.display = "none", e.controls.style.display = "none", e.setButtonText(h.currentTarget, "", "expand", "button_expand"));
          }), t;
        } }, { key: "_createAddRowButton", value: function() {
          var e = this, t = this.getButton(this.getItemTitle(), "add", "button_add_row_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-add"), t.addEventListener("click", function(i) {
            i.preventDefault(), i.stopPropagation();
            var c, h = e.rows.length;
            e.row_cache[h] ? (c = e.rows[h] = e.row_cache[h], e.rows[h].setValue(e.rows[h].getDefault(), !0), typeof e.rows[h].deactivateNonRequiredProperties == "function" && e.rows[h].deactivateNonRequiredProperties(!0), e.rows[h].container.style.display = "", e.rows[h].tab && (e.rows[h].tab.style.display = ""), e.rows[h].register()) : c = e.addRow(), e.active_tab = e.rows[h].tab, e.refreshTabs(), e.refreshValue(), e.onChange(!0), e.jsoneditor.trigger("addRow", c);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createDeleteLastRowButton", value: function() {
          var e = this, t = this.getButton("button_delete_last", "subtract", "button_delete_last_title", [this.getItemTitle()]);
          return t.classList.add("json-editor-btntype-deletelast"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue(), h = null, g = c.pop();
            e.setValue(c), e.rows[e.rows.length - 1] && (h = e.rows[e.rows.length - 1].tab), h && (e.active_tab = h, e.refreshTabs()), e.onChange(!0), e.jsoneditor.trigger("deleteRow", g);
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
          e.forEach(function(h) {
            h.path === t.path ? i.push(h) : c.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            t.error_holder.appendChild(t.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.rows.forEach(function(h) {
            return h.showValidationErrors(c);
          });
        } }], l && R(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ce(s, r) {
        (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).useTrigger ? s.addEventListener("mousedown", function(n) {
          if (n.ctrlKey) {
            s.draggable = !0;
            var l = function e(t) {
              s.draggable = !1, document.removeEventListener("dragend", e), document.removeEventListener("mouseup", e);
            };
            document.addEventListener("dragend", l), document.addEventListener("mouseup", l);
          }
        }) : s.draggable = !0, s.addEventListener("dragstart", function(n) {
          window.curDrag = s;
        }), s.addEventListener("dragover", function(n) {
          window.curDrag === null || window.curDrag === s || window.curDrag.parentElement !== s.parentElement ? n.dataTransfer.dropEffect = "none" : n.dataTransfer.dropEffect = "move", n.preventDefault();
        }), s.addEventListener("drop", function(n) {
          if (n.preventDefault(), n.stopPropagation(), window.curDrag !== null && window.curDrag !== s && window.curDrag.parentElement === s.parentElement) {
            var l = function(i) {
              for (var c = 0, h = i.parentElement.firstElementChild; h !== i && h !== null; ) h = h.nextSibling, ++c;
              return c;
            }, e = l(window.curDrag), t = l(s);
            r(e, t, window.curDrag, s), window.curDrag = null;
          }
        });
      }
      function ie(s) {
        return ie = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ie(s);
      }
      function ke(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, be(l.key), l);
        }
      }
      function be(s) {
        var r = function(n, l) {
          if (ie(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ie(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ie(r) == "symbol" ? r : r + "";
      }
      function Ce(s, r, n) {
        return r = he(r), function(l, e) {
          if (e && (ie(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, re() ? Reflect.construct(r, n || [], he(s).constructor) : r.apply(s, n));
      }
      function re() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (re = function() {
          return !!s;
        })();
      }
      function ae() {
        return ae = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = he(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, ae.apply(this, arguments);
      }
      function he(s) {
        return he = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, he(s);
      }
      function Oe(s, r) {
        return Oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Oe(s, r);
      }
      pe.rules = { ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-array-control-btn": "width:100%25;text-align:left;margin-bottom:3px" };
      var Ae = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ce(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Oe(e, t);
        }(r, s), n = r, (l = [{ key: "onInputChange", value: function() {
          this.value = this.input.value, this.onChange(!0);
        } }, { key: "register", value: function() {
          ae(he(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          ae(he(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          var e = this, t = this.getTitle().length;
          return Object.keys(this.select_values).forEach(function(i) {
            return t = Math.max(t, "".concat(e.select_values[i]).length + 4);
          }), Math.min(12, Math.max(t / 7, 2));
        } }, { key: "preBuild", value: function() {
          var e;
          ae(he(r.prototype), "preBuild", this).call(this), this.select_options = {}, this.select_values = {}, this.option_titles = [], this.option_keys = [], this.option_enum = [];
          var t = this.jsoneditor.expandRefs(this.schema.items || {}), i = t.enum || [], c = t.options && t.options.enum || [], h = t.options && t.options.enum_titles || [];
          for (e = 0; e < i.length; e++) if (this.sanitize(i[e]) === i[e]) {
            var g = c[e] || {};
            "title" in g || (g.title = "".concat(h[e] || i[e])), this.option_keys.push("".concat(i[e])), this.option_enum.push(g), this.select_values["".concat(i[e])] = i[e];
          }
        } }, { key: "build", value: function() {
          var e, t = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || this.schema.format === "checkbox") {
            for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, e = 0; e < this.option_keys.length; e++) {
              var i = this.formname + e.toString();
              this.inputs[this.option_keys[e]] = this.theme.getCheckbox(), this.inputs[this.option_keys[e]].id = i, this.select_options[this.option_keys[e]] = this.inputs[this.option_keys[e]];
              var c = this.theme.getCheckboxLabel(this.option_enum[e].title);
              if (c.htmlFor = i, this.option_enum[e].infoText) {
                var h = this.theme.getInfoButton(this.translateProperty(this.option_enum[e].infoText));
                c.appendChild(h);
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
          ae(he(r.prototype), "postBuild", this).call(this);
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
            var h = this.sanitize(this.select_values[e[c]]);
            i.push(h), h !== e[c] && (t = !0);
          } else t = !0;
          return this.value = i, t;
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.schema.items.type === "boolean" ? !!e : this.schema.items.type === "number" ? 1 * e || 0 : this.schema.items.type === "integer" ? Math.floor(1 * e || 0) : "".concat(e);
        } }, { key: "enable", value: function() {
          var e = this;
          this.always_disabled || (this.input ? this.input.disabled = !1 : this.inputs && Object.keys(this.inputs).forEach(function(t) {
            return e.inputs[t].disabled = !1;
          }), ae(he(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          var t = this;
          e && (this.always_disabled = !0), this.input ? this.input.disabled = !0 : this.inputs && Object.keys(this.inputs).forEach(function(i) {
            return t.inputs[i].disabled = !0;
          }), ae(he(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          ae(he(r.prototype), "destroy", this).call(this);
        } }, { key: "escapeRegExp", value: function(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } }, { key: "showValidationErrors", value: function(e) {
          var t = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = e.reduce(function(c, h) {
            return h.path.match(t) && c.push(h.message), c;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && ke(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ze(s) {
        return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ze(s);
      }
      function nt(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, ut(l.key), l);
        }
      }
      function ut(s) {
        var r = function(n, l) {
          if (ze(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ze(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ze(r) == "symbol" ? r : r + "";
      }
      function ft(s, r, n) {
        return r = Ze(r), function(l, e) {
          if (e && (ze(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, yt() ? Reflect.construct(r, n || [], Ze(s).constructor) : r.apply(s, n));
      }
      function yt() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yt = function() {
          return !!s;
        })();
      }
      function Je() {
        return Je = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ze(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Je.apply(this, arguments);
      }
      function Ze(s) {
        return Ze = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ze(s);
      }
      function wr(s, r) {
        return wr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, wr(s, r);
      }
      var hn = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ft(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && wr(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
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
              var h = this.sanitize(this.select_values[e[c]]);
              i.push(h), h !== e[c] && (t = !0);
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
      function Be(s) {
        return Be = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Be(s);
      }
      function Ge(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, We(l.key), l);
        }
      }
      function We(s) {
        var r = function(n, l) {
          if (Be(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Be(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Be(r) == "symbol" ? r : r + "";
      }
      function Qe(s, r, n) {
        return r = At(r), function(l, e) {
          if (e && (Be(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, dt() ? Reflect.construct(r, n || [], At(s).constructor) : r.apply(s, n));
      }
      function dt() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (dt = function() {
          return !!s;
        })();
      }
      function rr() {
        return rr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = At(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, rr.apply(this, arguments);
      }
      function At(s) {
        return At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, At(s);
      }
      function ls(s, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ls(s, r);
      }
      var jh = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
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
              var h = this.sanitize(this.select_values[e[c]]);
              i.push(h), h !== e[c] && (t = !0);
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
      function Hn(s) {
        return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hn(s);
      }
      function kh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, xh(l.key), l);
        }
      }
      function xh(s) {
        var r = function(n, l) {
          if (Hn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Hn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Hn(r) == "symbol" ? r : r + "";
      }
      function Oh(s, r, n) {
        return r = nr(r), function(l, e) {
          if (e && (Hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, hl() ? Reflect.construct(r, n || [], nr(s).constructor) : r.apply(s, n));
      }
      function hl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (hl = function() {
          return !!s;
        })();
      }
      function dn() {
        return dn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = nr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, dn.apply(this, arguments);
      }
      function nr(s) {
        return nr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, nr(s);
      }
      function cs(s, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, cs(s, r);
      }
      var Ch = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Oh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
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
              var h = this.theme.getHiddenLabel(this.formname);
              h.setAttribute("for", this.formname + "-selectized"), c.appendChild(h);
            }
          }
          dn(nr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          e = [].concat(e);
          for (var t = !1, i = [], c = 0; c < e.length; c++)
            if (!(!this.select_values["".concat(e[c])] && (t = !0, !this.newEnumAllowed || !this.addNewOption(e[c])))) {
              var h = this.sanitize(this.select_values[e[c]]);
              i.push(h), h !== e[c] && (t = !0);
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
        } }]) && kh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Ae);
      function Vn(s) {
        return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vn(s);
      }
      function Eh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Sh(l.key), l);
        }
      }
      function Sh(s) {
        var r = function(n, l) {
          if (Vn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Vn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Vn(r) == "symbol" ? r : r + "";
      }
      function Ph(s, r, n) {
        return r = Mr(r), function(l, e) {
          if (e && (Vn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, dl() ? Reflect.construct(r, n || [], Mr(s).constructor) : r.apply(s, n));
      }
      function dl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (dl = function() {
          return !!s;
        })();
      }
      function Ii() {
        return Ii = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Mr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Ii.apply(this, arguments);
      }
      function Mr(s) {
        return Mr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Mr(s);
      }
      function us(s, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, us(s, r);
      }
      var Th = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ph(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && us(e, t);
        }(r, s), n = r, (l = [{ key: "postBuild", value: function() {
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
        } }]) && Eh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function zn(s) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(s);
      }
      function Lh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Ah(l.key), l);
        }
      }
      function Ah(s) {
        var r = function(n, l) {
          if (zn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (zn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return zn(r) == "symbol" ? r : r + "";
      }
      function Rh(s, r, n) {
        return r = Hr(r), function(l, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, pl() ? Reflect.construct(r, n || [], Hr(s).constructor) : r.apply(s, n));
      }
      function pl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pl = function() {
          return !!s;
        })();
      }
      function Bi() {
        return Bi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Hr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Bi.apply(this, arguments);
      }
      function Hr(s) {
        return Hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Hr(s);
      }
      function hs(s, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, hs(s, r);
      }
      var Ih = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
        }(r, s), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "setFileReaderListener", value: function(e) {
          var t = this;
          e.addEventListener("load", function(i) {
            if (t.count === t.current_item_index) t.value[t.count][t.key] = i.target.result;
            else {
              var c = {};
              for (var h in t.parent.schema.properties) c[h] = "";
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
                  var h = new FileReader();
                  e.setFileReaderListener(h), h.readAsDataURL(i.currentTarget.files[c]);
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
        } }]) && Lh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function qn(s) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(s);
      }
      function Bh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Nh(l.key), l);
        }
      }
      function Nh(s) {
        var r = function(n, l) {
          if (qn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (qn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return qn(r) == "symbol" ? r : r + "";
      }
      function Dh(s, r, n) {
        return r = Vr(r), function(l, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, fl() ? Reflect.construct(r, n || [], Vr(s).constructor) : r.apply(s, n));
      }
      function fl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (fl = function() {
          return !!s;
        })();
      }
      function Ni() {
        return Ni = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Ni.apply(this, arguments);
      }
      function Vr(s) {
        return Vr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vr(s);
      }
      function ds(s, r) {
        return ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ds(s, r);
      }
      var yl = function(s) {
        function r(e, t) {
          var i;
          return function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = Dh(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ds(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", v({}, { icon: "", validated: !1, align: "left", action: function(c, h) {
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
        } }]) && Bh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function $n(s) {
        return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $n(s);
      }
      function Fh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Mh(l.key), l);
        }
      }
      function Mh(s) {
        var r = function(n, l) {
          if ($n(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($n(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return $n(r) == "symbol" ? r : r + "";
      }
      function Hh(s, r, n) {
        return r = Ht(r), function(l, e) {
          if (e && ($n(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, ml() ? Reflect.construct(r, n || [], Ht(s).constructor) : r.apply(s, n));
      }
      function ml() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ml = function() {
          return !!s;
        })();
      }
      function zr() {
        return zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ht(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, zr.apply(this, arguments);
      }
      function Ht(s) {
        return Ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ht(s);
      }
      function ps(s, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ps(s, r);
      }
      var Vh = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Hh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
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
            var h = e.reduce(function(g, x) {
              return x.path === t.path && g.push(x.message), g;
            }, []);
            this.input.controlgroup = this.control, h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Fh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Un(s) {
        return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Un(s);
      }
      function zh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, qh(l.key), l);
        }
      }
      function qh(s) {
        var r = function(n, l) {
          if (Un(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Un(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Un(r) == "symbol" ? r : r + "";
      }
      function $h(s, r, n) {
        return r = Vt(r), function(l, e) {
          if (e && (Un(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, bl() ? Reflect.construct(r, n || [], Vt(s).constructor) : r.apply(s, n));
      }
      function bl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (bl = function() {
          return !!s;
        })();
      }
      function qr() {
        return qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, qr.apply(this, arguments);
      }
      function Vt(s) {
        return Vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vt(s);
      }
      function fs(s, r) {
        return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fs(s, r);
      }
      b(6910);
      var Di = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), $h(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fs(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), c = this.enum_options.length > 0 && this.enum_values.includes(i), h = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || c && (!t || this.isRequired() || h) || (i = this.enum_values[0]), this.value !== i) {
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
          var e, t, i, c, h = this;
          if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.hasPlaceholderOption = ((e = this.schema) === null || e === void 0 || (e = e.options) === null || e === void 0 ? void 0 : e.has_placeholder_option) || !1, this.placeholderOptionText = ((t = this.schema) === null || t === void 0 || (t = t.options) === null || t === void 0 ? void 0 : t.placeholder_option_text) || " ", this.enforceConst && this.schema.const) {
            var g = this.schema.const;
            this.enum_options = ["".concat(g)], this.enum_display = ["".concat(this.translateProperty(g) || g)], this.enum_values = [this.typecast(g)];
          } else if (this.schema.enum) {
            var x = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(S, D) {
              h.enum_options[D] = "".concat(S), h.enum_display[D] = "".concat(h.translateProperty(x[D]) || S), h.enum_values[D] = h.typecast(S);
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
            for (var h = 0; h < this.enumSource.length; h++) if (Array.isArray(this.enumSource[h])) i = i.concat(this.enumSource[h]), c = c.concat(this.enumSource[h]);
            else {
              var g = [];
              if (g = Array.isArray(this.enumSource[h].source) ? this.enumSource[h].source : e[this.enumSource[h].source]) {
                if (this.enumSource[h].slice && (g = Array.prototype.slice.apply(g, this.enumSource[h].slice)), this.enumSource[h].filter) {
                  var x = [];
                  for (t = 0; t < g.length; t++) this.enumSource[h].filter({ i: t, item: g[t], watched: e }) && x.push(g[t]);
                  g = x;
                }
                var S = [], D = [];
                for (t = 0; t < g.length; t++) {
                  var U = g[t];
                  this.enumSource[h].value ? D[t] = this.typecast(this.enumSource[h].value({ i: t, item: U })) : D[t] = g[t], this.enumSource[h].title ? S[t] = this.enumSource[h].title({ i: t, item: U }) : S[t] = D[t];
                }
                this.enumSource[h].sort && (function(te, fe, _e) {
                  te.map(function(we, Ie) {
                    return { v: we, t: fe[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    te[Ie] = we.v, fe[Ie] = we.t;
                  });
                }).bind(null, D, S, this.enumSource[h].sort === "desc" ? 1 : -1)(), i = i.concat(D), c = c.concat(S);
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
            var h = e.reduce(function(g, x) {
              return x.path === t.path && g.push(x.message), g;
            }, []);
            h.length ? this.theme.addInputError(this.input, "".concat(h.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && zh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Gn(s) {
        return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gn(s);
      }
      function Uh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Gh(l.key), l);
        }
      }
      function Gh(s) {
        var r = function(n, l) {
          if (Gn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Gn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Gn(r) == "symbol" ? r : r + "";
      }
      function Wh(s, r, n) {
        return r = zt(r), function(l, e) {
          if (e && (Gn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, vl() ? Reflect.construct(r, n || [], zt(s).constructor) : r.apply(s, n));
      }
      function vl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (vl = function() {
          return !!s;
        })();
      }
      function $r() {
        return $r = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = zt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, $r.apply(this, arguments);
      }
      function zt(s) {
        return zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, zt(s);
      }
      function ys(s, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ys(s, r);
      }
      var gl = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else $r(zt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", v({}, this.defaults.options.choices || {}, this.options.choices || {}));
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
        } }]) && Uh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function pn(s) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pn(s);
      }
      function Jh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Kh(l.key), l);
        }
      }
      function Kh(s) {
        var r = function(n, l) {
          if (pn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (pn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return pn(r) == "symbol" ? r : r + "";
      }
      function Zh(s, r, n) {
        return r = Ur(r), function(l, e) {
          if (e && (pn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, _l() ? Reflect.construct(r, n || [], Ur(s).constructor) : r.apply(s, n));
      }
      function _l() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (_l = function() {
          return !!s;
        })();
      }
      function Fi() {
        return Fi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ur(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Fi.apply(this, arguments);
      }
      function Ur(s) {
        return Ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ur(s);
      }
      function ms(s, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ms(s, r);
      }
      gl.rules = { ".choices > *": "box-sizing:border-box" };
      var Yh = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
          if (Fi(Ur(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && pn(this.options.flatpickr) === "object")) {
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
              var h = this.input.parentNode, g = this.input.nextSibling, x = this.theme.getInputGroup(this.input, t);
              x !== void 0 ? (this.options.flatpickr.inline = !1, h.insertBefore(x, g), e = x) : this.options.flatpickr.wrap = !1;
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
            var c = new Date(1e3 * e), h = c.getFullYear(), g = this.zeroPad(c.getMonth() + 1), x = this.zeroPad(c.getDate()), S = this.zeroPad(c.getHours()), D = this.zeroPad(c.getMinutes()), U = this.zeroPad(c.getSeconds()), G = [h, g, x].join("-"), te = [S, D, U].join(":"), fe = "".concat(G, "T").concat(te);
            this.schema.format === "date" ? fe = G : this.schema.format === "time" && (fe = te), this.input.value = fe, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(fe);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Fi(Ur(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && Jh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function Wn(s) {
        return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Wn(s);
      }
      function Qh(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Xh(l.key), l);
        }
      }
      function Xh(s) {
        var r = function(n, l) {
          if (Wn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Wn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Wn(r) == "symbol" ? r : r + "";
      }
      function ed(s, r, n) {
        return r = qt(r), function(l, e) {
          if (e && (Wn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, wl() ? Reflect.construct(r, n || [], qt(s).constructor) : r.apply(s, n));
      }
      function wl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wl = function() {
          return !!s;
        })();
      }
      function Gr() {
        return Gr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = qt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Gr.apply(this, arguments);
      }
      function qt(s) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, qt(s);
      }
      function bs(s, r) {
        return bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, bs(s, r);
      }
      var td = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ed(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && bs(e, t);
        }(r, s), n = r, (l = [{ key: "register", value: function() {
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
            this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), this.editors.forEach(function(c, h) {
              c && (e.currentEditor === h ? c.container.style.display = "" : c.container.style.display = "none");
            }), this.refreshValue(), this.onChange(!0);
          }
        } }, { key: "buildChildEditor", value: function(e) {
          this.refs[e] = this.editors.length;
          var t = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(t);
          var i = v({}, this.schema, this.jsoneditor.refs[e]), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
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
        } }]) && Qh(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function fn(s) {
        return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fn(s);
      }
      function jl(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function rd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, nd(l.key), l);
        }
      }
      function nd(s) {
        var r = function(n, l) {
          if (fn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (fn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return fn(r) == "symbol" ? r : r + "";
      }
      function id(s, r, n) {
        return r = Wr(r), function(l, e) {
          if (e && (fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, kl() ? Reflect.construct(r, n || [], Wr(s).constructor) : r.apply(s, n));
      }
      function kl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (kl = function() {
          return !!s;
        })();
      }
      function Mi() {
        return Mi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Mi.apply(this, arguments);
      }
      function Wr(s) {
        return Wr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wr(s);
      }
      function vs(s, r) {
        return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, vs(s, r);
      }
      var od = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), id(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vs(e, t);
        }(r, s), n = r, (l = [{ key: "getNumColumns", value: function() {
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
          if (fn(e) === "object") {
            var h = "";
            return t = e, i = function(g, x) {
              var S = c.getHTML(x);
              Array.isArray(e) || (S = "<div><em>".concat(g, "</em>: ").concat(S, "</div>")), h += "<li>".concat(S, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(g, x) {
              return i(x, g);
            }) : Object.entries(t).forEach(function(g) {
              var x, S, D = (S = 2, function(te) {
                if (Array.isArray(te)) return te;
              }(x = g) || function(te, fe) {
                var _e = te == null ? null : typeof Symbol < "u" && te[Symbol.iterator] || te["@@iterator"];
                if (_e != null) {
                  var we, Ie, De, He, ve = [], xe = !0, Ke = !1;
                  try {
                    if (De = (_e = _e.call(te)).next, fe === 0) {
                      if (Object(_e) !== _e) return;
                      xe = !1;
                    } else for (; !(xe = (we = De.call(_e)).done) && (ve.push(we.value), ve.length !== fe); xe = !0) ;
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
              }(x, S) || function(te, fe) {
                if (te) {
                  if (typeof te == "string") return jl(te, fe);
                  var _e = Object.prototype.toString.call(te).slice(8, -1);
                  return _e === "Object" && te.constructor && (_e = te.constructor.name), _e === "Map" || _e === "Set" ? Array.from(te) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? jl(te, fe) : void 0;
                }
              }(x, S) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), U = D[0], G = D[1];
              return i(U, G);
            }), h = Array.isArray(e) ? "<ol>".concat(h, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(h, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Mi(Wr(r.prototype), "destroy", this).call(this);
        } }]) && rd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function yn(s) {
        return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yn(s);
      }
      function sd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, ad(l.key), l);
        }
      }
      function ad(s) {
        var r = function(n, l) {
          if (yn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (yn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return yn(r) == "symbol" ? r : r + "";
      }
      function ld(s, r, n) {
        return r = $t(r), function(l, e) {
          if (e && (yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, xl() ? Reflect.construct(r, n || [], $t(s).constructor) : r.apply(s, n));
      }
      function xl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (xl = function() {
          return !!s;
        })();
      }
      function Jr() {
        return Jr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $t(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Jr.apply(this, arguments);
      }
      function $t(s) {
        return $t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $t(s);
      }
      function gs(s, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, gs(s, r);
      }
      var cd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ld(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
        }(r, s), n = r, (l = [{ key: "register", value: function() {
          Jr($t(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Jr($t(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), (!this.template || i) && (e == null ? e = "" : yn(e) === "object" ? e = JSON.stringify(e) : typeof e != "string" && (e = "".concat(e)), e !== this.serialized)) {
            var c = this.sanitize(e);
            if (this.input.value !== c) {
              this.input.value = c;
              var h = i || this.getValue() !== e;
              this.refreshValue(), t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(h);
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
        } }]) && sd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Jn(s) {
        return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Jn(s);
      }
      function ud(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, hd(l.key), l);
        }
      }
      function hd(s) {
        var r = function(n, l) {
          if (Jn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Jn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Jn(r) == "symbol" ? r : r + "";
      }
      function dd(s, r, n) {
        return r = yo(r), function(l, e) {
          if (e && (Jn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Ol() ? Reflect.construct(r, n || [], yo(s).constructor) : r.apply(s, n));
      }
      function Ol() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ol = function() {
          return !!s;
        })();
      }
      function yo(s) {
        return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, yo(s);
      }
      function _s(s, r) {
        return _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, _s(s, r);
      }
      var pd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), dd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _s(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
          this.options.compact = !1, this.header = this.label = this.theme.getLabelLike(this.getTitle()), this.description = this.theme.getDescription(this.schema.description || ""), this.control = this.theme.getFormControl(this.label, this.description, null), this.container.appendChild(this.control);
        } }, { key: "getTitle", value: function() {
          return this.translateProperty(this.schema.title);
        } }, { key: "getNumColumns", value: function() {
          return 12;
        } }, { key: "disable", value: function() {
          return !1;
        } }, { key: "enable", value: function() {
          return !1;
        } }]) && ud(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(yl);
      function Kn(s) {
        return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Kn(s);
      }
      function fd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, yd(l.key), l);
        }
      }
      function yd(s) {
        var r = function(n, l) {
          if (Kn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Kn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Kn(r) == "symbol" ? r : r + "";
      }
      function md(s, r, n) {
        return r = Zn(r), function(l, e) {
          if (e && (Kn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Cl() ? Reflect.construct(r, n || [], Zn(s).constructor) : r.apply(s, n));
      }
      function Cl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Cl = function() {
          return !!s;
        })();
      }
      function ws() {
        return ws = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Zn(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, ws.apply(this, arguments);
      }
      function Zn(s) {
        return Zn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Zn(s);
      }
      function js(s, r) {
        return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, js(s, r);
      }
      var El = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), md(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && js(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
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
        } }]) && fd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function Yn(s) {
        return Yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Yn(s);
      }
      function bd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, vd(l.key), l);
        }
      }
      function vd(s) {
        var r = function(n, l) {
          if (Yn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Yn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Yn(r) == "symbol" ? r : r + "";
      }
      function gd(s, r, n) {
        return r = mo(r), function(l, e) {
          if (e && (Yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Sl() ? Reflect.construct(r, n || [], mo(s).constructor) : r.apply(s, n));
      }
      function Sl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Sl = function() {
          return !!s;
        })();
      }
      function mo(s) {
        return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mo(s);
      }
      function ks(s, r) {
        return ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ks(s, r);
      }
      var Pl = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ks(e, t);
        }(r, s), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(P), i = parseInt(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && bd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(El);
      function Qn(s) {
        return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qn(s);
      }
      function _d(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, wd(l.key), l);
        }
      }
      function wd(s) {
        var r = function(n, l) {
          if (Qn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Qn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Qn(r) == "symbol" ? r : r + "";
      }
      function jd(s, r, n) {
        return r = Xn(r), function(l, e) {
          if (e && (Qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Tl() ? Reflect.construct(r, n || [], Xn(s).constructor) : r.apply(s, n));
      }
      function Tl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Tl = function() {
          return !!s;
        })();
      }
      function xs() {
        return xs = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Xn(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, xs.apply(this, arguments);
      }
      function Xn(s) {
        return Xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Xn(s);
      }
      function Os(s, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Os(s, r);
      }
      var kd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), jd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Os(e, t);
        }(r, s), n = r, (l = [{ key: "preBuild", value: function() {
          if (xs(Xn(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = v(this.options, this.schema.options || {});
        } }]) && _d(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function ei(s) {
        return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ei(s);
      }
      function xd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Od(l.key), l);
        }
      }
      function Od(s) {
        var r = function(n, l) {
          if (ei(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ei(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ei(r) == "symbol" ? r : r + "";
      }
      function Cd(s, r, n) {
        return r = Ut(r), function(l, e) {
          if (e && (ei(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Ll() ? Reflect.construct(r, n || [], Ut(s).constructor) : r.apply(s, n));
      }
      function Ll() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ll = function() {
          return !!s;
        })();
      }
      function Kr() {
        return Kr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Kr.apply(this, arguments);
      }
      function Ut(s) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(s);
      }
      function Cs(s, r) {
        return Cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Cs(s, r);
      }
      var Ed = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cs(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = Kr(Ut(r.prototype), "setValue", this).call(this, e, t, i);
          c !== void 0 && c.changed && this.jodit_instance && this.jodit_instance.setEditorValue(c.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Kr(Ut(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", v({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
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
        } }]) && xd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function Sd(s, r, n, l) {
        try {
          switch (s.format) {
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
      function Al(s, r) {
        var n = Object.keys(s);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(s);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(s, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function Pd(s, r, n) {
        return (r = Rl(r)) in s ? Object.defineProperty(s, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : s[r] = n, s;
      }
      function Gt(s) {
        return Gt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gt(s);
      }
      function Hi(s, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(s) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, h, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(s, r) || Es(s, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ct(s) {
        return function(r) {
          if (Array.isArray(r)) return Ss(r);
        }(s) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(s) || Es(s) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Es(s, r) {
        if (s) {
          if (typeof s == "string") return Ss(s, r);
          var n = Object.prototype.toString.call(s).slice(8, -1);
          return n === "Object" && s.constructor && (n = s.constructor.name), n === "Map" || n === "Set" ? Array.from(s) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ss(s, r) : void 0;
        }
      }
      function Ss(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function Td(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Rl(l.key), l);
        }
      }
      function Rl(s) {
        var r = function(n, l) {
          if (Gt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Gt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Gt(r) == "symbol" ? r : r + "";
      }
      b(8431);
      var Il = function() {
        return s = function n(l, e, t, i) {
          (function(c, h) {
            if (!(c instanceof h)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = l, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(c, h, g) {
            var x = [];
            if (c.dependentRequired !== void 0) {
              var S = [];
              Object.keys(c.dependentRequired).forEach(function(D) {
                if (h[D] !== void 0) {
                  var U = c.dependentRequired[D];
                  S = U.filter(function(G) {
                    return !k(h, G);
                  });
                }
              }), S.length > 0 && x.push({ message: "Must have the required properties: " + S.join(", "), path: g });
            }
            return x;
          }, dependentSchemas: function(c, h, g) {
            var x = this, S = [];
            return Object.keys(c.dependentSchemas).forEach(function(D) {
              if (h[D] !== void 0) {
                var U = c.dependentSchemas[D], G = x._validateSchema(U, h, g);
                S = [].concat(ct(S), ct(G));
              }
            }), S;
          }, contains: function(c, h, g) {
            var x = this, S = [], D = 0;
            h.forEach(function(G) {
              x._validateSchema(c.contains, G, g).length === 0 && D++;
            });
            var U = D === 0;
            return c.minContains !== void 0 ? D < c.minContains && S.push({ message: this.translate("error_minContains", [D, c.minContains], c), path: g }) : U && S.push({ message: this.translate("error_contains", null, c), path: g }), c.maxContains !== void 0 && D > c.maxContains && S.push({ message: this.translate("error_maxContains", [D, c.maxContains], c), path: g }), S;
          }, if: function(c, h, g) {
            if (c.then === void 0 && c.else === void 0) return [];
            var x = this._validateSchema(c.if, h, g), S = [], D = [];
            return c.then !== void 0 && (S = this._validateSchema(c.then, h, g)), c.else !== void 0 && (D = this._validateSchema(c.else, h, g)), c.if === !0 ? S : c.if === !1 ? D : x.length === 0 ? S : x.length > 0 ? D : [];
          }, const: function(c, h, g) {
            return JSON.stringify(c.const) === JSON.stringify(h) ? [] : [{ path: g, property: "const", message: this.translate("error_const", null, c) }];
          }, enum: function(c, h, g) {
            var x = JSON.stringify(h);
            return c.enum.some(function(S) {
              return x === JSON.stringify(S);
            }) ? [] : [{ path: g, property: "enum", message: this.translate("error_enum", null, c) }];
          }, extends: function(c, h, g) {
            var x = this;
            return c.extends.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, h, g))), S;
            }, []);
          }, allOf: function(c, h, g) {
            var x = this;
            return c.allOf.reduce(function(S, D) {
              return S.push.apply(S, ct(x._validateSchema(D, h, g))), S;
            }, []);
          }, anyOf: function(c, h, g) {
            var x = this;
            return c.anyOf.some(function(S) {
              return !x._validateSchema(S, h, g).length;
            }) ? [] : [{ path: g, property: "anyOf", message: this.translate("error_anyOf", null, c) }];
          }, oneOf: function(c, h, g) {
            var x = this, S = 0, D = [];
            c.oneOf.forEach(function(G, te) {
              var fe = x._validateSchema(G, h, g);
              fe.length || S++, fe.forEach(function(_e) {
                _e.path = "".concat(g, ".oneOf[").concat(te, "]").concat(_e.path.substr(g.length));
              }), D.push.apply(D, ct(fe));
            });
            var U = [];
            return S !== 1 && (U.push({ path: g, property: "oneOf", message: this.translate("error_oneOf", [S], c) }), U.push.apply(U, D)), U;
          }, not: function(c, h, g) {
            return this._validateSchema(c.not, h, g).length ? [] : [{ path: g, property: "not", message: this.translate("error_not", null, c) }];
          }, type: function(c, h, g) {
            var x = this;
            if (Array.isArray(c.type)) {
              if (!c.type.some(function(S) {
                return x._checkType(S, h);
              })) return [{ path: g, property: "type", message: this.translate("error_type_union", null, c) }];
            } else if (["date", "time", "datetime-local"].includes(c.format) && c.type === "integer") {
              if (!this._checkType("string", "".concat(h))) return [{ path: g, property: "type", message: this.translate("error_type", [c.format], c) }];
            } else if (!this._checkType(c.type, h)) return [{ path: g, property: "type", message: this.translate("error_type", [c.type], c) }];
            return [];
          }, disallow: function(c, h, g) {
            var x = this;
            if (Array.isArray(c.disallow)) {
              if (c.disallow.some(function(S) {
                return x._checkType(S, h);
              })) return [{ path: g, property: "disallow", message: this.translate("error_disallow_union", null, c) }];
            } else if (this._checkType(c.disallow, h)) return [{ path: g, property: "disallow", message: this.translate("error_disallow", [c.disallow], c) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(c, h, g) {
            return this._validateNumberSubSchemaMultipleDivisible(c, h, g);
          }, divisibleBy: function(c, h, g) {
            return this._validateNumberSubSchemaMultipleDivisible(c, h, g);
          }, maximum: function(c, h, g) {
            var x = c.exclusiveMaximum ? h < c.maximum : h <= c.maximum;
            return window.math ? x = window.math[c.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(h), window.math.bignumber(c.maximum)) : window.Decimal && (x = new window.Decimal(h)[c.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(c.maximum))), x ? [] : [{ path: g, property: "maximum", message: this.translate(c.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [c.maximum], c) }];
          }, minimum: function(c, h, g) {
            var x = c.exclusiveMinimum ? h > c.minimum : h >= c.minimum;
            return window.math ? x = window.math[c.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(h), window.math.bignumber(c.minimum)) : window.Decimal && (x = new window.Decimal(h)[c.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(c.minimum))), x ? [] : [{ path: g, property: "minimum", message: this.translate(c.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [c.minimum], c) }];
          } }, this._validateStringSubSchema = { maxLength: function(c, h, g) {
            var x = [];
            return "".concat(h).length > c.maxLength && x.push({ path: g, property: "maxLength", message: this.translate("error_maxLength", [c.maxLength], c) }), x;
          }, minLength: function(c, h, g) {
            return "".concat(h).length < c.minLength ? [{ path: g, property: "minLength", message: this.translate(c.minLength === 1 ? "error_notempty" : "error_minLength", [c.minLength], c) }] : [];
          }, pattern: function(c, h, g) {
            return new RegExp(c.pattern).test(h) ? [] : [{ path: g, property: "pattern", message: c.options && c.options.patternmessage ? c.options.patternmessage : this.translate("error_pattern", [c.pattern], c) }];
          } }, this._validateArraySubSchema = { items: function(c, h, g) {
            var x = this, S = [];
            if (Array.isArray(c.items)) for (var D = 0; D < h.length; D++) if (c.items[D]) S.push.apply(S, ct(this._validateSchema(c.items[D], h[D], "".concat(g, ".").concat(D))));
            else {
              if (c.additionalItems === !0) break;
              if (!c.additionalItems) {
                if (c.additionalItems === !1) {
                  S.push({ path: g, property: "additionalItems", message: this.translate("error_additionalItems", null, c) });
                  break;
                }
                break;
              }
              S.push.apply(S, ct(this._validateSchema(c.additionalItems, h[D], "".concat(g, ".").concat(D))));
            }
            else h.forEach(function(U, G) {
              S.push.apply(S, ct(x._validateSchema(c.items, U, "".concat(g, ".").concat(G))));
            });
            return S;
          }, maxItems: function(c, h, g) {
            return h.length > c.maxItems ? [{ path: g, property: "maxItems", message: this.translate("error_maxItems", [c.maxItems], c) }] : [];
          }, minItems: function(c, h, g) {
            return h.length < c.minItems ? [{ path: g, property: "minItems", message: this.translate("error_minItems", [c.minItems], c) }] : [];
          }, uniqueItems: function(c, h, g) {
            for (var x = {}, S = 0; S < h.length; S++) {
              var D = JSON.stringify(h[S]);
              if (x[D]) return [{ path: g, property: "uniqueItems", message: this.translate("error_uniqueItems", null, c) }];
              x[D] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(c, h, g) {
            return Object.keys(h).length > c.maxProperties ? [{ path: g, property: "maxProperties", message: this.translate("error_maxProperties", [c.maxProperties], c) }] : [];
          }, minProperties: function(c, h, g) {
            return Object.keys(h).length < c.minProperties ? [{ path: g, property: "minProperties", message: this.translate("error_minProperties", [c.minProperties], c) }] : [];
          }, required: function(c, h, g) {
            var x = this, S = [];
            return Array.isArray(c.required) && c.required.forEach(function(D) {
              if (h[D] === void 0) {
                var U = x.jsoneditor.getEditor("".concat(g, ".").concat(D));
                U && U.dependenciesFulfilled === !1 || U && ["button", "info"].includes(U.schema.format || U.schema.type) || S.push({ path: g, property: "required", message: x.translate("error_required", [c && c.properties && c.properties[D] && c.properties[D].title ? c.properties[D].title : D], c) });
              }
            }), S;
          }, properties: function(c, h, g, x) {
            var S = this, D = [];
            return Object.entries(c.properties).forEach(function(U) {
              var G = Hi(U, 2), te = G[0], fe = G[1];
              x[te] = !0, D.push.apply(D, ct(S._validateSchema(fe, h[te], "".concat(g, ".").concat(te))));
            }), D;
          }, patternProperties: function(c, h, g, x) {
            var S = this, D = [];
            return Object.entries(c.patternProperties).forEach(function(U) {
              var G = Hi(U, 2), te = G[0], fe = G[1], _e = new RegExp(te);
              Object.entries(h).forEach(function(we) {
                var Ie = Hi(we, 2), De = Ie[0], He = Ie[1];
                _e.test(De) && (x[De] = !0, D.push.apply(D, ct(S._validateSchema(fe, He, "".concat(g, ".").concat(De)))));
              });
            }), D;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(c, h, g, x) {
            for (var S, D = this, U = [], G = Object.keys(h), te = null, fe = function() {
              var we = "";
              return te = G[_e], typeof c.propertyNames == "boolean" ? c.propertyNames === !0 ? 0 : (U.push({ path: g, property: "propertyNames", message: D.translate("error_property_names_false", [te], c) }), 1) : Object.entries(c.propertyNames).every(function(Ie) {
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
                    return U.push({ path: g, property: "propertyNames", message: D.translate("error_property_names_unsupported", [He], c) }), !1;
                }
                return U.push({ path: g, property: "propertyNames", message: D.translate(we, [te], c) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < G.length && ((S = fe()) === 0 || S !== 1); _e++) ;
            return U;
          }, additionalProperties: function(c, h, g, x) {
            for (var S = [], D = Object.keys(h), U = 0; U < D.length; U++) {
              var G = D[U];
              if (!x[G]) {
                if (!c.additionalProperties) {
                  S.push({ path: g, property: "additionalProperties", message: this.translate("error_additional_properties", [G], c) });
                  break;
                }
                if (c.additionalProperties === !0) break;
                S.push.apply(S, ct(this._validateSchema(c.additionalProperties, h[G], "".concat(g, ".").concat(G))));
              }
            }
            return S;
          }, dependencies: function(c, h, g) {
            var x = this, S = [];
            return Object.entries(c.dependencies).forEach(function(D) {
              var U = Hi(D, 2), G = U[0], te = U[1];
              h[G] !== void 0 && (Array.isArray(te) ? te.forEach(function(fe) {
                h[fe] === void 0 && S.push({ path: g, property: "dependencies", message: x.translate("error_dependency", [fe], c) });
              }) : S.push.apply(S, ct(x._validateSchema(te, h, g))));
            }), S;
          } };
        }, r = [{ key: "fitTest", value: function(n, l) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if (Gt(n) === "object" && n !== null) {
            var i = this._getSchema(l);
            if (i.anyOf) {
              var c, h = function(te) {
                for (var fe = 1; fe < arguments.length; fe++) {
                  var _e = arguments[fe] != null ? arguments[fe] : {};
                  fe % 2 ? Al(Object(_e), !0).forEach(function(we) {
                    Pd(te, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(te, Object.getOwnPropertyDescriptors(_e)) : Al(Object(_e)).forEach(function(we) {
                    Object.defineProperty(te, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return te;
              }({}, t), g = function(te, fe) {
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
                  (S.match > h.match || S.match === h.match && S.extra < h.extra) && (h = S);
                }
              } catch (te) {
                g.e(te);
              } finally {
                g.f();
              }
              return h;
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
          return n === void 0 ? v({}, this.jsoneditor.expandRefs(this.schema)) : n;
        } }, { key: "validate", value: function(n) {
          return this._validateSchema(this.schema, n);
        } }, { key: "_validateSchema", value: function(n, l, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = v({}, this.jsoneditor.expandRefs(n)), l === void 0 ? this._validateV3Required(n, l, e) : (Object.keys(n).forEach(function(c) {
            t._validateSubSchema[c] && i.push.apply(i, ct(t._validateSubSchema[c].call(t, n, l, e)));
          }), i.push.apply(i, ct(this._validateByValueType(n, l, e))), n.links && n.links.forEach(function(c, h) {
            c.rel && c.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, h), i.push.apply(i, ct(t._validateSchema(n, l, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, ct(this._validateDateTimeSubSchema(n, l, e))), ["uuid"].includes(n.format) && i.push.apply(i, ct(this._validateUUIDSchema(n, l, e))), i.push.apply(i, ct(this._validateCustomValidator(n, l, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, l) {
          var e = n.links[l].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), c = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, l).concat(n.links.slice(l + 1)), v({}, n, this.jsoneditor.refs[c]);
        } }, { key: "_validateV3Required", value: function(n, l, e) {
          return (n.required !== void 0 && n.required === !0 || n.required === void 0 && this.jsoneditor.options.required_by_default === !0) && n.type !== "info" ? [{ path: e, property: "required", message: this.translate("error_notset", null, n) }] : [];
        } }, { key: "_validateByValueType", value: function(n, l, e) {
          var t = this, i = [];
          if (l === null) return i;
          if (typeof l == "number") Object.keys(n).forEach(function(h) {
            t._validateNumberSubSchema[h] && i.push.apply(i, ct(t._validateNumberSubSchema[h].call(t, n, l, e)));
          });
          else if (typeof l == "string") Object.keys(n).forEach(function(h) {
            t._validateStringSubSchema[h] && i.push.apply(i, ct(t._validateStringSubSchema[h].call(t, n, l, e)));
          });
          else if (Array.isArray(l)) Object.keys(n).forEach(function(h) {
            t._validateArraySubSchema[h] && i.push.apply(i, ct(t._validateArraySubSchema[h].call(t, n, l, e)));
          });
          else if (Gt(l) === "object") {
            var c = {};
            Object.keys(n).forEach(function(h) {
              t._validateObjectSubSchema[h] && i.push.apply(i, ct(t._validateObjectSubSchema[h].call(t, n, l, e, c)));
            }), n.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || n.oneOf || n.anyOf || n.allOf || (n.additionalProperties = !1), Object.keys(n).forEach(function(h) {
              t._validateObjectSubSchema2[h] !== void 0 && i.push.apply(i, ct(t._validateObjectSubSchema2[h].call(t, n, l, e, c)));
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
          if (n.type === "integer") return function(h, g, x) {
            return 1 * g < 1 ? [{ path: x, property: "format", message: t.translate("error_invalid_epoch", null, h) }] : g !== Math.abs(parseInt(g)) ? [{ path: x, property: "format", message: t.translate("error_".concat(h.format.replace(/-/g, "_")), [c], h) }] : [];
          }(n, l, e);
          if (i && i.flatpickr) {
            if (i) return function(h, g, x, S) {
              if (g !== "") {
                var D;
                if (S.flatpickr.config.mode !== "single") {
                  var U = S.flatpickr.config.mode === "range" ? S.flatpickr.l10n.rangeSeparator : ", ";
                  D = S.flatpickr.selectedDates.map(function(te) {
                    return S.flatpickr.formatDate(te, S.flatpickr.config.dateFormat);
                  }).join(U);
                }
                try {
                  if (D) {
                    if (D !== g) throw new Error("".concat(S.flatpickr.config.mode, " mismatch"));
                  } else if (S.flatpickr.formatDate(S.flatpickr.parseDate(g, S.flatpickr.config.dateFormat), S.flatpickr.config.dateFormat) !== g) throw new Error("mismatch");
                } catch {
                  var G = S.flatpickr.config.errorDateFormat !== void 0 ? S.flatpickr.config.errorDateFormat : S.flatpickr.config.dateFormat;
                  return [{ path: x, property: "format", message: t.translate("error_".concat(S.format.replace(/-/g, "_")), [G], h) }];
                }
              }
              return [];
            }(n, l, e, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[n.format].test(l)) return [{ path: e, property: "format", message: this.translate("error_".concat(n.format.replace(/-/g, "_")), [c], n) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(n, l, e) {
          var t = this, i = [];
          i.push.apply(i, ct(Sd.call(this, n, l, e, this.translate)));
          var c = function(h) {
            i.push.apply(i, ct(h.call(t, n, l, e)));
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
        } }], r && Td(s.prototype, r), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        var s, r;
      }();
      function mn(s) {
        return mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mn(s);
      }
      function Ld(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Ad(l.key), l);
        }
      }
      function Ad(s) {
        var r = function(n, l) {
          if (mn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (mn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return mn(r) == "symbol" ? r : r + "";
      }
      function Rd(s, r, n) {
        return r = Wt(r), function(l, e) {
          if (e && (mn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Bl() ? Reflect.construct(r, n || [], Wt(s).constructor) : r.apply(s, n));
      }
      function Bl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Bl = function() {
          return !!s;
        })();
      }
      function Zr() {
        return Zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Zr.apply(this, arguments);
      }
      function Wt(s) {
        return Wt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wt(s);
      }
      function Ps(s, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ps(s, r);
      }
      var Id = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Rd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ps(e, t);
        }(r, s), n = r, (l = [{ key: "register", value: function() {
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
          this.type = e, this.register(), this.editors.forEach(function(c, h) {
            var g, x;
            c && (t.type === h ? (t.keep_only_existing_values && (g = c.getValue(), x = i, Object.keys(x).forEach(function(S) {
              L.includes(S) || S in g && (g[S] = x[S]);
            }), i = g), (t.keep_values || t.if) && c.setValue(i, !0), c.container.style.display = "") : c.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, c = this, h = this.types[e], g = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(g), typeof h == "string" ? (i = v({}, this.schema)).type = h : (i = v({}, this.schema, h), i = this.jsoneditor.expandRefs(i), h && h.required && Array.isArray(h.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(h.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
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
              mn(e) === "object" && Array.isArray(e) || (e = [e]);
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
          this.jsoneditor.options.custom_validators && (i.custom_validators = this.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), this.types.forEach(function(c, h) {
            var g;
            e.editors[h] = !1, typeof c == "string" ? (g = v({}, e.schema)).type = c : (g = v({}, e.schema, c), c.required && Array.isArray(c.required) && e.schema.required && Array.isArray(e.schema.required) && (g.required = e.schema.required.concat(c.required))), e.validators[h] = new Il(e.jsoneditor, g, i, e.defaults);
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
          var c = this.type, h = { match: 0, extra: 0, i: this.type }, g = { match: 0, i: null };
          this.validators.forEach(function(D, U) {
            var G = null;
            i.anyOf !== void 0 && i.anyOf && (G = D.fitTest(e), (h.match < G.match || h.match === G.match && h.extra > G.extra) && ((h = G).i = U)), D.validate(e).length || g.i !== null ? h = g : (g.i = U, G !== null && (g.match = G.match));
          });
          var x = g.i;
          this.anyOf !== void 0 && this.anyOf && g.match < h.match && (x = h.i), this.if && (x = this.getIfType(e)), x === null && (x = this.type), this.type = x, this.switcher.value = this.display_text[x];
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
            this.editors.forEach(function(c, h) {
              if (c) {
                var g = "".concat(t.path, ".").concat(i, "[").concat(h, "]");
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
        } }]) && Ld(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ti(s) {
        return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ti(s);
      }
      function Bd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Nd(l.key), l);
        }
      }
      function Nd(s) {
        var r = function(n, l) {
          if (ti(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ti(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ti(r) == "symbol" ? r : r + "";
      }
      function Dd(s, r, n) {
        return r = bo(r), function(l, e) {
          if (e && (ti(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Nl() ? Reflect.construct(r, n || [], bo(s).constructor) : r.apply(s, n));
      }
      function Nl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Nl = function() {
          return !!s;
        })();
      }
      function bo(s) {
        return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bo(s);
      }
      function Ts(s, r) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ts(s, r);
      }
      var Fd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Dd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ts(e, t);
        }(r, s), n = r, (l = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && Bd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function Dl(s, r) {
        var n = Object.keys(s);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(s);
          r && (l = l.filter(function(e) {
            return Object.getOwnPropertyDescriptor(s, e).enumerable;
          })), n.push.apply(n, l);
        }
        return n;
      }
      function ri(s) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? Dl(Object(n), !0).forEach(function(l) {
            vo(s, l, n[l]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(n)) : Dl(Object(n)).forEach(function(l) {
            Object.defineProperty(s, l, Object.getOwnPropertyDescriptor(n, l));
          });
        }
        return s;
      }
      function vo(s, r, n) {
        return (r = Ml(r)) in s ? Object.defineProperty(s, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : s[r] = n, s;
      }
      function ni(s, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(s) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, h, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(s, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return Fl(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Fl(n, l) : void 0;
          }
        }(s, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Fl(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function jr(s) {
        return jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, jr(s);
      }
      function Md(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Ml(l.key), l);
        }
      }
      function Ml(s) {
        var r = function(n, l) {
          if (jr(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (jr(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return jr(r) == "symbol" ? r : r + "";
      }
      function Hd(s, r, n) {
        return r = Rt(r), function(l, e) {
          if (e && (jr(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Hl() ? Reflect.construct(r, n || [], Rt(s).constructor) : r.apply(s, n));
      }
      function Hl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Hl = function() {
          return !!s;
        })();
      }
      function ir() {
        return ir = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Rt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, ir.apply(this, arguments);
      }
      function Rt(s) {
        return Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Rt(s);
      }
      function Ls(s, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ls(s, r);
      }
      var Vl = function(s) {
        function r(e, t, i) {
          var c;
          return function(h, g) {
            if (!(h instanceof g)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (c = Hd(this, r, [e, t])).currentDepth = i, c;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ls(e, t);
        }(r, s), n = r, (l = [{ key: "getChildEditors", value: function() {
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
            var h, g = this.format === "categories", x = [], S = null, D = null;
            if (this.format === "grid-strict") {
              var U = 0;
              if (h = [], this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ke = ve.options.hidden ? 0 : ve.options.grid_offset || 0, it = !ve.options.hidden && (ve.options.grid_break || !1), Ot = { key: He, width: xe, offset: Ke, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  h.push(Ot), x[U] = h, it && (U++, h = []);
                }
              }), this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (h = this.theme.getGridRow(), c.appendChild(h), t = 0; t < x[e].length; t++) S = x[e][t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e][t].width, x[e][t].offset), h.appendChild(D.container);
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
              for (this.layout = JSON.stringify(x), c = document.createElement("div"), e = 0; e < x.length; e++) for (h = this.theme.getGridRow(), c.appendChild(h), t = 0; t < x[e].editors.length; t++) S = x[e].editors[t].key, (D = this.editors[S]).options.hidden ? D.container.style.display = "none" : this.theme.setGridColumnSize(D.container, x[e].editors[t].width), h.appendChild(D.container);
            } else {
              if (c = document.createElement("div"), g) {
                var fe = document.createElement("div"), _e = this.theme.getTopTabHolder(this.translateProperty(this.schema.title)), we = this.theme.getTopTabContentHolder(_e);
                for (this.property_order.forEach(function(He) {
                  var ve = i.editors[He];
                  if (!ve.property_removed) {
                    var xe = i.theme.getTabContent(), Ke = ve.schema && (ve.schema.type === "object" || ve.schema.type === "array");
                    xe.isObjOrArray = Ke;
                    var it = i.theme.getGridRow();
                    ve.tab || (i.basicPane === void 0 ? i.addRow(ve, _e, xe) : i.addRow(ve, _e, i.basicPane)), xe.id = i.getValidId(ve.tab_text.textContent), Ke ? (xe.appendChild(it), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab)) : (fe.appendChild(it), we.childElementCount > 0 ? we.firstChild.isObjOrArray && (xe.appendChild(fe), we.insertBefore(xe, we.firstChild), i.theme.insertBasicTopTab(ve.tab, _e), ve.basicPane = xe) : (xe.appendChild(fe), we.appendChild(xe), i.theme.addTopTab(_e, ve.tab), ve.basicPane = xe)), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), it.appendChild(ve.container), ve.rowPane = xe;
                  }
                }); this.tabPanesContainer.firstChild; ) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                var Ie = this.tabs_holder.parentNode;
                Ie.removeChild(Ie.firstChild), Ie.appendChild(_e), this.tabPanesContainer = we, this.tabs_holder = _e;
                var De = this.theme.getFirstTab(this.tabs_holder);
                return void (De && j(De, "click"));
              }
              this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                ve.property_removed || (h = i.theme.getGridRow(), c.appendChild(h), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), h.appendChild(ve.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(c);
          }
        } }, { key: "getPropertySchema", value: function(e) {
          var t = this, i = this.schema.properties[e] || {};
          i = v({}, i);
          var c = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(h) {
            new RegExp(h).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[h]), c = !0);
          }), !c && this.schema.additionalProperties && jr(this.schema.additionalProperties) === "object" && (i = v({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (ir(Rt(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = ni(t, 2), c = i[0], h = i[1], g = e.jsoneditor.getEditorClass(h);
            e.editors[c] = e.jsoneditor.createEditor(g, { jsoneditor: e.jsoneditor, schema: h, path: "".concat(e.path, ".").concat(c), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[c].preBuild();
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
            var c = e.editors[t].schema.propertyOrder, h = e.editors[i].schema.propertyOrder;
            return typeof c != "number" && (c = 1e3), typeof h != "number" && (h = 1e3), c - h;
          });
        } }, { key: "addTab", value: function(e) {
          var t = this, i = this.rows[e].schema && (this.rows[e].schema.type === "object" || this.rows[e].schema.type === "array");
          this.tabs_holder && (this.rows[e].tab_text = document.createElement("span"), this.rows[e].tab_text.textContent = i ? this.rows[e].getHeaderText() : this.schema.basicCategoryTitle === void 0 ? "Basic" : this.schema.basicCategoryTitle, this.rows[e].tab = this.theme.getTopTab(this.rows[e].tab_text, this.getValidId(this.rows[e].tab_text.textContent)), this.rows[e].tab.addEventListener("click", function(c) {
            t.active_tab = t.rows[e].tab, t.refreshTabs(), c.preventDefault(), c.stopPropagation();
          }));
        } }, { key: "addRow", value: function(e, t, i) {
          var c = this.rows.length, h = e.schema.type === "object" || e.schema.type === "array";
          this.rows[c] = e, this.rows[c].rowPane = i, h ? (this.addTab(c), this.theme.addTopTab(t, this.rows[c].tab)) : this.basicTab === void 0 ? (this.addTab(c), this.basicTab = c, this.basicPane = i, this.theme.addTopTab(t, this.rows[c].tab)) : (this.rows[c].tab = this.rows[this.basicTab].tab, this.rows[c].tab_text = this.rows[this.basicTab].tab_text, this.rows[c].rowPane = this.rows[this.basicTab].rowPane);
        } }, { key: "refreshTabs", value: function(e) {
          var t = this, i = this.basicTab !== void 0, c = !1;
          this.rows.forEach(function(h) {
            h.tab && h.rowPane && h.rowPane.parentNode && (i && h.tab === t.rows[t.basicTab].tab && c || (e ? h.tab_text.textContent = h.getHeaderText() : (i && h.tab === t.rows[t.basicTab].tab && (c = !0), h.tab === t.active_tab ? t.theme.markTabActive(h) : t.theme.markTabInactive(h))));
          });
        } }, { key: "build", value: function() {
          var e = this, t = this.format === "categories";
          if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, Object.entries(this.editors).forEach(function(c) {
            var h = ni(c, 2), g = h[0], x = h[1], S = e.theme.getTableCell();
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
                var h = e.editors[e.addproperty_input.value].key, g = e.editors[e.addproperty_input.value].type, x = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: h, type: g, path: x } });
              }
            }), this.addproperty_input.addEventListener("input", function(c) {
              c.target.previousSibling.previousSibling.childNodes.forEach(function(h) {
                var g = h.innerText, x = c.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (g = g.toLowerCase(), x = x.toLowerCase()), g.includes(x) ? h.style.display = "" : h.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(c) {
              var h = e.theme.getTabContent(), g = e.theme.getGridColumn(), x = !(!c.schema || c.schema.type !== "object" && c.schema.type !== "array");
              if (h.isObjOrArray = x, t) {
                if (x) {
                  var S = e.theme.getGridContainer();
                  S.appendChild(g), h.appendChild(S), e.tabPanesContainer.appendChild(h), e.row_container = S;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), h.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(h) : e.tabPanesContainer.insertBefore(h, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(g);
                e.addRow(c, e.tabs_holder, h), h.id = e.getValidId(c.schema.title);
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
          var t = this, i = this.jsoneditor.options.show_opt_in, c = this.options.show_opt_in !== void 0, h = c && this.options.show_opt_in === !0, g = c && this.options.show_opt_in === !1;
          (h || !g && i || !c && i) && Object.entries(this.editors).forEach(function(x) {
            var S = ni(x, 2), D = S[0], U = S[1];
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
          for (var h = 0; h < i.childNodes.length; h++) {
            var g = i.childNodes[h];
            if (t.propertyOrder < g.propertyOrder) {
              this.addproperty_list.insertBefore(t, g), t = null;
              break;
            }
          }
          t && this.addproperty_list.appendChild(t);
        } }, { key: "addPropertyCheckbox", value: function(e) {
          var t, i = this, c = this.theme.getCheckbox();
          t = this.schema.properties[e] && this.schema.properties[e].title ? this.schema.properties[e].title : e;
          var h = this.theme.getCheckboxLabel(t), g = this.theme.getFormControl(h, c, null, null, this.path + "-" + e);
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
              var c = this.jsoneditor.getEditorClass(i), h = this.jsoneditor.options.max_depth;
              if (this.editors[e] = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: h && this.currentDepth >= h ? this.getSchemaOnMaxDepth(i) : i, path: "".concat(this.path, ".").concat(e), parent: this }, this.currentDepth + 1), this.editors[e].preBuild(), !t) {
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
            Object.entries(t.cached_editors).forEach(function(h) {
              var g = ni(h, 2), x = (g[0], g[1]);
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
            Object.keys(this.editors).forEach(function(h) {
              return i++;
            }), t = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(h) {
              e.addPropertyCheckbox(h), e.isRequiredObject(e.cached_editors[h]) && h in e.editors && (e.addproperty_checkboxes[h].disabled = !0), e.schema.minProperties !== void 0 && i <= e.schema.minProperties ? (e.addproperty_checkboxes[h].disabled = e.addproperty_checkboxes[h].checked, e.addproperty_checkboxes[h].checked || (c = !0)) : h in e.editors ? c = !0 : t || k(e.schema.properties, h) ? (e.addproperty_checkboxes[h].disabled = !1, c = !0) : e.addproperty_checkboxes[h].disabled = !0;
            }), this.canHaveAdditionalProperties() && (c = !0), Object.keys(this.schema.properties).forEach(function(h) {
              e.cached_editors[h] || (c = !0, e.addPropertyCheckbox(h));
            }), c ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(e) {
          if (e) return typeof e.schema.required == "boolean" ? e.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(e.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          (jr(e = (e = this.applyConstFilter(e)) || {}) !== "object" || Array.isArray(e)) && (e = {}), Object.entries(this.cached_editors).forEach(function(c) {
            var h = ni(c, 2), g = h[0], x = h[1];
            e[g] !== void 0 ? (i.addObjectProperty(g), x.setValue(e[g], t), x.activate(), i.disabled && x.disable()) : t || i.isRequiredObject(x) ? x.setValue(x.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? x.deactivate() : i.removeObjectProperty(g);
          }), Object.entries(e).forEach(function(c) {
            var h = ni(c, 2), g = h[0], x = h[1];
            i.cached_editors[g] || (i.addObjectProperty(g), i.editors[g] && i.editors[g].setValue(x, t, !!i.editors[g].template));
          }), this.refreshValue(), this.layoutEditors(), this.onChange();
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = [], c = [];
          e.forEach(function(h) {
            h.path === t.path ? i.push(h) : c.push(h);
          }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", i.forEach(function(h) {
            h.errorcount && h.errorcount > 1 && (h.message += " (".concat(h.errorcount, " errors)")), t.error_holder.appendChild(t.theme.getErrorMessage(h.message));
          })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), Object.values(this.editors).forEach(function(h) {
            h.showValidationErrors(c);
          });
        } }]) && Md(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z);
      function ii(s) {
        return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ii(s);
      }
      function Vd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, zd(l.key), l);
        }
      }
      function zd(s) {
        var r = function(n, l) {
          if (ii(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ii(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ii(r) == "symbol" ? r : r + "";
      }
      function qd(s, r, n) {
        return r = kr(r), function(l, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, zl() ? Reflect.construct(r, n || [], kr(s).constructor) : r.apply(s, n));
      }
      function zl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (zl = function() {
          return !!s;
        })();
      }
      function oi() {
        return oi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = kr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, oi.apply(this, arguments);
      }
      function kr(s) {
        return kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, kr(s);
      }
      function As(s, r) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, As(s, r);
      }
      Vl.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var $d = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && As(e, t);
        }(r, s), n = r, (l = [{ key: "preBuild", value: function() {
          oi(kr(r.prototype), "preBuild", this).call(this);
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
            var h = this.theme.getFormRadioLabel(this.enum_display[i]);
            h.htmlFor = this.input.id;
            var g = this.theme.getFormRadioControl(h, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
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
        } }]) && Vd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function si(s) {
        return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, si(s);
      }
      function Ud(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Gd(l.key), l);
        }
      }
      function Gd(s) {
        var r = function(n, l) {
          if (si(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (si(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return si(r) == "symbol" ? r : r + "";
      }
      function Wd(s, r, n) {
        return r = Jt(r), function(l, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, ql() ? Reflect.construct(r, n || [], Jt(s).constructor) : r.apply(s, n));
      }
      function ql() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ql = function() {
          return !!s;
        })();
      }
      function Yr() {
        return Yr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Yr.apply(this, arguments);
      }
      function Jt(s) {
        return Jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jt(s);
      }
      function Rs(s, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Rs(s, r);
      }
      var Jd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rs(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
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
        } }]) && Ud(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function ai(s) {
        return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ai(s);
      }
      function Kd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Zd(l.key), l);
        }
      }
      function Zd(s) {
        var r = function(n, l) {
          if (ai(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ai(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ai(r) == "symbol" ? r : r + "";
      }
      function Yd(s, r, n) {
        return r = or(r), function(l, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, $l() ? Reflect.construct(r, n || [], or(s).constructor) : r.apply(s, n));
      }
      function $l() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return ($l = function() {
          return !!s;
        })();
      }
      function bn() {
        return bn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = or(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, bn.apply(this, arguments);
      }
      function or(s) {
        return or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, or(s);
      }
      function Is(s, r) {
        return Is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Is(s, r);
      }
      var Qd = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Is(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else bn(or(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", v({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = t.tags = !!t.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
              e.updateValue(i), e.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          bn(or(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t, i = this.typecast(e), c = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (t = this.input.querySelector('option[value="'.concat(i, '"]'))) ? t.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), c = !0), c;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), bn(or(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), bn(or(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), bn(or(r.prototype), "destroy", this).call(this);
        } }]) && Kd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function li(s) {
        return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, li(s);
      }
      function Xd(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, ep(l.key), l);
        }
      }
      function ep(s) {
        var r = function(n, l) {
          if (li(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (li(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return li(r) == "symbol" ? r : r + "";
      }
      function tp(s, r, n) {
        return r = Kt(r), function(l, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Ul() ? Reflect.construct(r, n || [], Kt(s).constructor) : r.apply(s, n));
      }
      function Ul() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ul = function() {
          return !!s;
        })();
      }
      function Qr() {
        return Qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Qr.apply(this, arguments);
      }
      function Kt(s) {
        return Kt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kt(s);
      }
      function Bs(s, r) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Bs(s, r);
      }
      var rp = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), tp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Bs(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t) {
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
        } }]) && Xd(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Di);
      function ci(s) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(s);
      }
      function np(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, ip(l.key), l);
        }
      }
      function ip(s) {
        var r = function(n, l) {
          if (ci(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ci(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ci(r) == "symbol" ? r : r + "";
      }
      function op(s, r, n) {
        return r = go(r), function(l, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Gl() ? Reflect.construct(r, n || [], go(s).constructor) : r.apply(s, n));
      }
      function Gl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Gl = function() {
          return !!s;
        })();
      }
      function go(s) {
        return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, go(s);
      }
      function Ns(s, r) {
        return Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ns(s, r);
      }
      var sp = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), op(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ns(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
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
            var h = document.createElement("div"), g = document.createElement("button");
            g.classList.add("tiny", "button"), g.innerHTML = "Clear signature", h.appendChild(g), i.appendChild(h), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(S) {
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
        } }]) && np(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function ui(s) {
        return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ui(s);
      }
      function ap(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, lp(l.key), l);
        }
      }
      function lp(s) {
        var r = function(n, l) {
          if (ui(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ui(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ui(r) == "symbol" ? r : r + "";
      }
      function cp(s, r, n) {
        return r = Zt(r), function(l, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Wl() ? Reflect.construct(r, n || [], Zt(s).constructor) : r.apply(s, n));
      }
      function Wl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Wl = function() {
          return !!s;
        })();
      }
      function Xr() {
        return Xr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Zt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Xr.apply(this, arguments);
      }
      function Zt(s) {
        return Zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Zt(s);
      }
      function Ds(s, r) {
        return Ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ds(s, r);
      }
      b(6031);
      var up = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), cp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ds(e, t);
        }(r, s), n = r, (l = [{ key: "setValue", value: function(e, t, i) {
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
          var i = this, c = function h() {
            e.display.wrapper.offsetHeight ? (i.stopListening(e, t), e.display.lastWrapHeight !== e.display.wrapper.clientHeight && e.refresh()) : t.timeout = window.setTimeout(h, t.delay);
          };
          t.timeout = window.setTimeout(c, t.delay), t.hurry = function() {
            window.clearTimeout(t.timeout), t.timeout = window.setTimeout(c, 50);
          }, e.on(window, "mouseup", t.hurry), e.on(window, "keyup", t.hurry);
        } }, { key: "stopListening", value: function(e, t) {
          window.clearTimeout(t.timeout), e.off(window, "mouseup", t.hurry), e.off(window, "keyup", t.hurry);
        } }]) && ap(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function hi(s) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(s);
      }
      function hp(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, dp(l.key), l);
        }
      }
      function dp(s) {
        var r = function(n, l) {
          if (hi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (hi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return hi(r) == "symbol" ? r : r + "";
      }
      function pp(s, r, n) {
        return r = vn(r), function(l, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Jl() ? Reflect.construct(r, n || [], vn(s).constructor) : r.apply(s, n));
      }
      function Jl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Jl = function() {
          return !!s;
        })();
      }
      function _o() {
        return _o = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = vn(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, _o.apply(this, arguments);
      }
      function vn(s) {
        return vn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, vn(s);
      }
      function Fs(s, r) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Fs(s, r);
      }
      var Kl = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), pp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Fs(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getLabelLike(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), this.schema.enum === void 0) {
            var t = this.schema.maximum ? this.schema.maximum : 5;
            this.schema.exclusiveMaximum && t--, this.enum_values = [];
            for (var i = 0; i < t; i++) this.enum_values.push(i + 1);
          } else this.enum_values = this.schema.enum;
          this.radioGroup = [];
          for (var c = function(te) {
            te.preventDefault(), te.stopPropagation(), e.setValue(te.currentTarget.value), e.onChange(!0);
          }, h = this.enum_values.length - 1; h > -1; h--) {
            var g = this.formname + (h + 1), x = this.theme.getFormInputField("radio");
            x.name = "".concat(this.formname, "[starrating]"), x.value = this.enum_values[h], x.id = g, x.addEventListener("change", c, !1), this.radioGroup.push(x);
            var S = document.createElement("label");
            S.htmlFor = g, S.title = this.enum_values[h], this.options.displayValue && S.classList.add("starrating-display-enabled");
            var D = this.theme.getHiddenText("label");
            D.textContent = h, S.appendChild(D), this.ratingContainer.appendChild(x), this.ratingContainer.appendChild(S);
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
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), _o(vn(r.prototype), "destroy", this).call(this);
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
          _o(vn(r.prototype), "setValue", this).call(this, this.value);
        } }]) && hp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue);
      function di(s) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(s);
      }
      function fp(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, yp(l.key), l);
        }
      }
      function yp(s) {
        var r = function(n, l) {
          if (di(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (di(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return di(r) == "symbol" ? r : r + "";
      }
      function mp(s, r, n) {
        return r = en(r), function(l, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Zl() ? Reflect.construct(r, n || [], en(s).constructor) : r.apply(s, n));
      }
      function Zl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Zl = function() {
          return !!s;
        })();
      }
      function Vi() {
        return Vi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = en(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Vi.apply(this, arguments);
      }
      function en(s) {
        return en = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, en(s);
      }
      function Ms(s, r) {
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ms(s, r);
      }
      Kl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var bp = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ms(e, t);
        }(r, s), n = r, (l = [{ key: "build", value: function() {
          Vi(en(r.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var e = this.theme.getStepperButtons(this.input);
          this.control.appendChild(e), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          Vi(en(r.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          Vi(en(r.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && fp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Pl);
      function pi(s) {
        return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pi(s);
      }
      function vp(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, gp(l.key), l);
        }
      }
      function gp(s) {
        var r = function(n, l) {
          if (pi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (pi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return pi(r) == "symbol" ? r : r + "";
      }
      function _p(s, r, n) {
        return r = sr(r), function(l, e) {
          if (e && (pi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Yl() ? Reflect.construct(r, n || [], sr(s).constructor) : r.apply(s, n));
      }
      function Yl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Yl = function() {
          return !!s;
        })();
      }
      function gn() {
        return gn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = sr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, gn.apply(this, arguments);
      }
      function sr(s) {
        return sr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, sr(s);
      }
      function Hs(s, r) {
        return Hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Hs(s, r);
      }
      var wp = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), _p(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hs(e, t);
        }(r, s), n = r, l = [{ key: "register", value: function() {
          if (gn(sr(r.prototype), "register", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].register();
        } }, { key: "unregister", value: function() {
          if (gn(sr(r.prototype), "unregister", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var e = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = e.title || "row", this.item_default = e.default || null, this.item_has_child_editors = e.properties || e.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, gn(sr(r.prototype), "preBuild", this).call(this);
        } }, { key: "build", value: function() {
          this.tableContainer = this.theme.getTableContainer(), this.table = this.theme.getTable(), this.tableContainer.appendChild(this.table), this.container.appendChild(this.tableContainer), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
          var e = this.getElementEditor(0, !0);
          if (this.item_default = e.getDefault(), this.width = e.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header, this.getPathDepth()), this.container.appendChild(this.title), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText)), this.container.appendChild(this.infoButton)), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.tableContainer), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls), this.item_has_child_editors) for (var t = e.getChildEditors(), i = e.property_order || Object.keys(t), c = 0; c < i.length; c++) {
            var h = this.theme.getTableHeaderCell(t[i[c]].getTitle());
            t[i[c]].options.hidden && (h.style.display = "none"), this.header_row.appendChild(h);
          }
          else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
          e.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(this.translate("table_controls")), this.controls_header_cell.setAttribute("aria-hidden", "true"), this.controls_header_cell.style.visibility = "hidden", this.header_row.appendChild(this.controls_header_cell), this.addControls();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.refreshValue(), gn(sr(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemDefault", value: function() {
          return v({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = v({}, this.schema.items), c = this.jsoneditor.getEditorClass(i, this.jsoneditor), h = this.row_holder.appendChild(this.theme.getTableRow()), g = h;
          this.item_has_child_editors || (g = this.theme.getTableCell(), h.appendChild(g));
          var x = this.jsoneditor.createEditor(c, { jsoneditor: this.jsoneditor, schema: i, container: g, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
          return x.preBuild(), t || (x.build(), x.postBuild(), x.controls_cell = h.appendChild(this.theme.getTableCell()), x.row = h, x.table_controls = this.theme.getButtonHolder(), x.controls_cell.appendChild(x.table_controls), x.table_controls.style.margin = 0, x.table_controls.style.padding = 0), x;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, gn(sr(r.prototype), "destroy", this).call(this);
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
            for (var h = t.length; h < this.rows.length; h++) {
              var g = this.rows[h].container;
              this.item_has_child_editors || this.rows[h].row.parentNode.removeChild(this.rows[h].row), this.rows[h].destroy(), g.parentNode && g.parentNode.removeChild(g), this.rows[h] = null, c = !0;
            }
            this.rows = this.rows.slice(0, t.length), this.refreshValue(), (c || i) && this.refreshRowButtons(), this.onChange();
          }
        } }, { key: "refreshRowButtons", value: function() {
          var e = this, t = this.schema.minItems && this.schema.minItems >= this.rows.length, i = this.schema.maxItems && this.schema.maxItems <= this.rows.length, c = [];
          this.rows.forEach(function(U, G) {
            if (U.delete_button) {
              var te = !t;
              e.setButtonState(U.delete_button, te), c.push(te);
            }
            if (U.copy_button) {
              var fe = !i;
              e.setButtonState(U.copy_button, fe), c.push(fe);
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
          var h = c.some(function(U) {
            return U;
          });
          this.rows.forEach(function(U) {
            return e.setButtonState(U.controls_cell, h);
          }), this.setButtonState(this.controls_header_cell, h), this.setButtonState(this.table, this.value.length);
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
          return c.classList.add("delete", "json-editor-btntype-delete"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            if (h.preventDefault(), h.stopPropagation(), !i.askConfirmation()) return !1;
            var g = 1 * h.currentTarget.getAttribute("data-i"), x = i.getValue(), S = i.getValue()[g];
            x.splice(g, 1), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("deleteRow", S);
          }), t.appendChild(c), c;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, c = this.getButton("", "copy", "button_copy_row_title_short"), h = this.schema;
          return c.classList.add("copy", "json-editor-btntype-copy"), c.setAttribute("data-i", e), c.addEventListener("click", function(g) {
            g.preventDefault(), g.stopPropagation();
            var x = 1 * g.currentTarget.getAttribute("data-i"), S = i.getValue(), D = S[x];
            h.items.type === "string" && h.items.format === "uuid" ? D = T() : h.items.type === "object" && h.items.properties && S.forEach(function(U, G) {
              if (x === G) for (var te = 0, fe = Object.keys(U); te < fe.length; te++) {
                var _e = fe[te];
                h.items.properties && h.items.properties[_e] && h.items.properties[_e].format === "uuid" && ((D = Object.assign({}, S[x]))[_e] = T());
              }
            }), S.splice(x + 1, 0, D), i.setValue(S), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[x + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, c = this.getButton("", "moveup", "button_move_up_title");
          return c.classList.add("moveup", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var g = 1 * h.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(g - 1, 0, x.splice(g, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g - 1]);
          }), t.appendChild(c), c;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, c = this.getButton("", "movedown", "button_move_down_title");
          return c.classList.add("movedown", "json-editor-btntype-move"), c.setAttribute("data-i", e), c.addEventListener("click", function(h) {
            h.preventDefault(), h.stopPropagation();
            var g = 1 * h.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(g + 1, 0, x.splice(g, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[g + 1]);
          }), t.appendChild(c), c;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          ce(e, function(i, c) {
            var h = t.getValue(), g = h[i];
            h.splice(i, 1), h.splice(c, 0, g), t.setValue(h), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[c]);
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
            var c = e.getValue(), h = c.pop();
            e.setValue(c), e.onChange(!0), e.jsoneditor.trigger("deleteRow", h);
          }), this.controls.appendChild(t), t;
        } }, { key: "_createRemoveAllRowsButton", value: function() {
          var e = this, t = this.getButton("button_delete_all", "delete", "button_delete_all_title");
          return t.classList.add("json-editor-btntype-deleteall"), t.addEventListener("click", function(i) {
            if (i.preventDefault(), i.stopPropagation(), !e.askConfirmation()) return !1;
            var c = e.getValue();
            e.setValue([]), e.onChange(!0), e.jsoneditor.trigger("deleteAllRows", c);
          }), this.controls.appendChild(t), t;
        } }], l && vp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(pe);
      function fi(s) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(s);
      }
      function jp(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, kp(l.key), l);
        }
      }
      function kp(s) {
        var r = function(n, l) {
          if (fi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (fi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return fi(r) == "symbol" ? r : r + "";
      }
      function xp(s, r, n) {
        return r = tn(r), function(l, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Ql() ? Reflect.construct(r, n || [], tn(s).constructor) : r.apply(s, n));
      }
      function Ql() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ql = function() {
          return !!s;
        })();
      }
      function zi() {
        return zi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = tn(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, zi.apply(this, arguments);
      }
      function tn(s) {
        return tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, tn(s);
      }
      function Vs(s, r) {
        return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Vs(s, r);
      }
      function yi(s) {
        return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, yi(s);
      }
      function Op(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Cp(l.key), l);
        }
      }
      function Cp(s) {
        var r = function(n, l) {
          if (yi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (yi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return yi(r) == "symbol" ? r : r + "";
      }
      function Ep(s, r, n) {
        return r = rn(r), function(l, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Xl() ? Reflect.construct(r, n || [], rn(s).constructor) : r.apply(s, n));
      }
      function Xl() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Xl = function() {
          return !!s;
        })();
      }
      function qi() {
        return qi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = rn(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, qi.apply(this, arguments);
      }
      function rn(s) {
        return rn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, rn(s);
      }
      function zs(s, r) {
        return zs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, zs(s, r);
      }
      function mi(s) {
        return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, mi(s);
      }
      function Sp(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Pp(l.key), l);
        }
      }
      function Pp(s) {
        var r = function(n, l) {
          if (mi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (mi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return mi(r) == "symbol" ? r : r + "";
      }
      function Tp(s, r, n) {
        return r = ar(r), function(l, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, ec() ? Reflect.construct(r, n || [], ar(s).constructor) : r.apply(s, n));
      }
      function ec() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ec = function() {
          return !!s;
        })();
      }
      function _n() {
        return _n = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ar(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, _n.apply(this, arguments);
      }
      function ar(s) {
        return ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ar(s);
      }
      function qs(s, r) {
        return qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, qs(s, r);
      }
      b(9868);
      var wo = { ace: tt, array: pe, arrayChoices: hn, arraySelect2: jh, arraySelectize: Ch, autocomplete: Th, base64: Ih, button: yl, checkbox: Vh, choices: gl, datetime: Yh, describedBy: td, enum: od, hidden: cd, info: pd, integer: Pl, ip: kd, jodit: Ed, multiple: Id, multiselect: Ae, null: Fd, number: El, object: Vl, radio: $d, sceditor: Jd, select: Di, select2: Qd, selectize: rp, signature: sp, simplemde: up, starrating: Kl, stepper: bp, string: ue, table: wp, upload: function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), xp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vs(e, t);
        }(r, s), n = r, (l = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", v({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(c, h, g, x) {
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
              var h = c.target.files || c.dataTransfer.files;
              if (h && h.length) if (e.options.max_upload_size !== 0 && h[0].size > e.options.max_upload_size) e.theme.addInputError(e.uploader, "".concat(e.translate("upload_max_size"), " ").concat(e.options.max_upload_size));
              else if (e.options.mime_type.length === 0 || e.isValidMimeType(h[0].type, e.options.mime_type)) {
                e.fileDisplay && (e.fileDisplay.value = h[0].name);
                var g = new window.FileReader();
                g.onload = function(x) {
                  e.preview_value = x.target.result, e.refreshPreview(h), e.onChange(!0), g = null;
                }, g.readAsDataURL(h[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(c) {
              var h = c.dataTransfer.items || c.dataTransfer.files, g = h && h.length && (e.options.mime_type.length === 0 || e.isValidMimeType(h[0].type, e.options.mime_type)), x = c.currentTarget.classList && c.currentTarget.classList.contains("upload-dropzone") && g;
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
              var h = Math.floor(Math.log(i.size) / Math.log(1024));
              i.formattedSize = "".concat(parseFloat((i.size / Math.pow(1024, h)).toFixed(2)), " ").concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][h]);
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
        } }]) && jp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(z), uuid: function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ep(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zs(e, t);
        }(r, s), n = r, (l = [{ key: "preBuild", value: function() {
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
        } }]) && Op(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue), colorpicker: function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Tp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qs(e, t);
        }(r, s), n = r, (l = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var c = _n(ar(r.prototype), "setValue", this).call(this, e, t, i);
          return this.picker_instance && this.picker_instance.domElement && c && c.changed && this.picker_instance.setColor(c.value, !0), c;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          _n(ar(r.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (_n(ar(r.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (_n(ar(r.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), _n(ar(r.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(e) {
          var t = this;
          if (e) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", v({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), c = function(h) {
                var g = t.picker_instance.settings.editorFormat, x = t.picker_instance.settings.alpha;
                t.setValue(g === "hex" ? x ? h.hex : h.hex.slice(0, 7) : h["".concat(g + (x ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = c) : i.onChange = c, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && Sp(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(ue) };
      function tc(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      var rc = {}, $s = "en", Lp = $s;
      rc.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(wo).forEach(function(s) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, c) {
            var h = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (h != null) {
              var g, x, S, D, U = [], G = !0, te = !1;
              try {
                if (S = (h = h.call(i)).next, c !== 0) for (; !(G = (g = S.call(h)).done) && (U.push(g.value), U.length !== c); G = !0) ;
              } catch (fe) {
                te = !0, x = fe;
              } finally {
                try {
                  if (!G && h.return != null && (D = h.return(), Object(D) !== D)) return;
                } finally {
                  if (te) throw x;
                }
              }
              return U;
            }
          }(e, t) || function(i, c) {
            if (i) {
              if (typeof i == "string") return tc(i, c);
              var h = Object.prototype.toString.call(i).slice(8, -1);
              return h === "Object" && i.constructor && (h = i.constructor.name), h === "Map" || h === "Set" ? Array.from(i) : h === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h) ? tc(i, c) : void 0;
            }
          }(e, t) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(s, 2), n = r[0], l = r[1];
        wo[n].options = l.options || {};
      });
      var wn = { options: { upload: function(s, r, n) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: wo, languages: rc, resolvers: w, custom_validators: [], default_language: $s, language: Lp, translate: function(s, r, n) {
        var l = {};
        n && n.options && n.options.error_messages && n.options.error_messages[wn.language] && (l = n.options.error_messages[wn.language]);
        var e = wn.languages[wn.language];
        if (!e) throw new Error("Unknown language ".concat(wn.language));
        var t = l[s] || e[s] || wn.languages[$s][s] || s;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(s, r) {
        return s;
      } };
      function jn() {
        jn = function() {
          return r;
        };
        var s, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function($, q, K) {
          $[q] = K.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", h = t.toStringTag || "@@toStringTag";
        function g($, q, K) {
          return Object.defineProperty($, q, { value: K, enumerable: !0, configurable: !0, writable: !0 }), $[q];
        }
        try {
          g({}, "");
        } catch {
          g = function(q, K, ge) {
            return q[K] = ge;
          };
        }
        function x($, q, K, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), Ue = new dr(ge || []);
          return e(Le, "_invoke", { value: Ot($, K, Ue) }), Le;
        }
        function S($, q, K) {
          try {
            return { type: "normal", arg: $.call(q, K) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", U = "suspendedYield", G = "executing", te = "completed", fe = {};
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
        function Ke($) {
          ["next", "throw", "return"].forEach(function(q) {
            g($, q, function(K) {
              return this._invoke(q, K);
            });
          });
        }
        function it($, q) {
          function K(se, Le, Ue, ot) {
            var st = S($[se], $, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && bt(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                K("next", Et, Ue, ot);
              }, function(Et) {
                K("throw", Et, Ue, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, Ue(It);
              }, function(Et) {
                return K("throw", Et, Ue, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function Ue() {
              return new q(function(ot, st) {
                K(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then(Ue, Ue) : Ue();
          } });
        }
        function Ot($, q, K) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: s, done: !0 };
            }
            for (K.method = se, K.arg = Le; ; ) {
              var Ue = K.delegate;
              if (Ue) {
                var ot = nn(Ue, K);
                if (ot) {
                  if (ot === fe) continue;
                  return ot;
                }
              }
              if (K.method === "next") K.sent = K._sent = K.arg;
              else if (K.method === "throw") {
                if (ge === D) throw ge = te, K.arg;
                K.dispatchException(K.arg);
              } else K.method === "return" && K.abrupt("return", K.arg);
              ge = G;
              var st = S($, q, K);
              if (st.type === "normal") {
                if (ge = K.done ? te : U, st.arg === fe) continue;
                return { value: st.arg, done: K.done };
              }
              st.type === "throw" && (ge = te, K.method = "throw", K.arg = st.arg);
            }
          };
        }
        function nn($, q) {
          var K = q.method, ge = $.iterator[K];
          if (ge === s) return q.delegate = null, K === "throw" && $.iterator.return && (q.method = "return", q.arg = s, nn($, q), q.method === "throw") || K !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + K + "' method")), fe;
          var se = S(ge, $.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, fe;
          var Le = se.arg;
          return Le ? Le.done ? (q[$.resultName] = Le.value, q.next = $.nextLoc, q.method !== "return" && (q.method = "next", q.arg = s), q.delegate = null, fe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, fe);
        }
        function Ci($) {
          var q = { tryLoc: $[0] };
          1 in $ && (q.catchLoc = $[1]), 2 in $ && (q.finallyLoc = $[2], q.afterLoc = $[3]), this.tryEntries.push(q);
        }
        function Ne($) {
          var q = $.completion || {};
          q.type = "normal", delete q.arg, $.completion = q;
        }
        function dr($) {
          this.tryEntries = [{ tryLoc: "root" }], $.forEach(Ci, this), this.reset(!0);
        }
        function Ct($) {
          if ($ || $ === "") {
            var q = $[i];
            if (q) return q.call($);
            if (typeof $.next == "function") return $;
            if (!isNaN($.length)) {
              var K = -1, ge = function se() {
                for (; ++K < $.length; ) if (l.call($, K)) return se.value = $[K], se.done = !1, se;
                return se.value = s, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(bt($) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = g(Ie, h, "GeneratorFunction"), r.isGeneratorFunction = function($) {
          var q = typeof $ == "function" && $.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function($) {
          return Object.setPrototypeOf ? Object.setPrototypeOf($, Ie) : ($.__proto__ = Ie, g($, h, "GeneratorFunction")), $.prototype = Object.create(xe), $;
        }, r.awrap = function($) {
          return { __await: $ };
        }, Ke(it.prototype), g(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function($, q, K, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x($, q, K, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function(Ue) {
            return Ue.done ? Ue.value : Le.next();
          });
        }, Ke(xe), g(xe, h, "Generator"), g(xe, i, function() {
          return this;
        }), g(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function($) {
          var q = Object($), K = [];
          for (var ge in q) K.push(ge);
          return K.reverse(), function se() {
            for (; K.length; ) {
              var Le = K.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, dr.prototype = { constructor: dr, reset: function($) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = s, this.done = !1, this.delegate = null, this.method = "next", this.arg = s, this.tryEntries.forEach(Ne), !$) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = s);
        }, stop: function() {
          this.done = !0;
          var $ = this.tryEntries[0].completion;
          if ($.type === "throw") throw $.arg;
          return this.rval;
        }, dispatchException: function($) {
          if (this.done) throw $;
          var q = this;
          function K(st, It) {
            return Le.type = "throw", Le.arg = $, q.next = st, It && (q.method = "next", q.arg = s), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return K("end");
            if (se.tryLoc <= this.prev) {
              var Ue = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if (Ue && ot) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              } else if (Ue) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              }
            }
          }
        }, abrupt: function($, q) {
          for (var K = this.tryEntries.length - 1; K >= 0; --K) {
            var ge = this.tryEntries[K];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && ($ === "break" || $ === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = $, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, fe) : this.complete(Le);
        }, complete: function($, q) {
          if ($.type === "throw") throw $.arg;
          return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && q && (this.next = q), fe;
        }, finish: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.finallyLoc === $) return this.complete(K.completion, K.afterLoc), Ne(K), fe;
          }
        }, catch: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.tryLoc === $) {
              var ge = K.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(K);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function($, q, K) {
          return this.delegate = { iterator: Ct($), resultName: q, nextLoc: K }, this.method === "next" && (this.arg = s), fe;
        } }, r;
      }
      function nc(s, r, n, l, e, t, i) {
        try {
          var c = s[t](i), h = c.value;
        } catch (g) {
          return void n(g);
        }
        c.done ? r(h) : Promise.resolve(h).then(l, e);
      }
      function ic(s) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(l, e) {
            var t = s.apply(r, n);
            function i(h) {
              nc(t, l, e, i, c, "next", h);
            }
            function c(h) {
              nc(t, l, e, i, c, "throw", h);
            }
            i(void 0);
          });
        };
      }
      function kn(s, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(s) || function(n, l) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, c, h, g = [], x = !0, S = !1;
            try {
              if (c = (e = e.call(n)).next, l !== 0) for (; !(x = (t = c.call(e)).done) && (g.push(t.value), g.length !== l); x = !0) ;
            } catch (D) {
              S = !0, i = D;
            } finally {
              try {
                if (!x && e.return != null && (h = e.return(), Object(h) !== h)) return;
              } finally {
                if (S) throw i;
              }
            }
            return g;
          }
        }(s, r) || function(n, l) {
          if (n) {
            if (typeof n == "string") return oc(n, l);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? oc(n, l) : void 0;
          }
        }(s, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function oc(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function bt(s) {
        return bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bt(s);
      }
      function Ap(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Rp(l.key), l);
        }
      }
      function Rp(s) {
        var r = function(n, l) {
          if (bt(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (bt(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return bt(r) == "symbol" ? r : r + "";
      }
      b(1688);
      var Ip = function() {
        return s = function e(t) {
          (function(i, c) {
            if (!(i instanceof c)) throw new TypeError("Cannot call a class as a function");
          })(this, e), this.options = t || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            bt(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            bt(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var c = this;
            Object.entries(i.anyOf).forEach(function(h) {
              var g = kn(h, 2), x = g[0], S = g[1];
              i.anyOf[x] = c.expandSchema(S);
            });
          }, dependencies: function(i) {
            var c = this;
            Object.entries(i.dependencies).forEach(function(h) {
              var g = kn(h, 2), x = g[0], S = g[1];
              bt(S) !== "object" || Array.isArray(S) || (i.dependencies[x] = c.expandSchema(S));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, c) {
            var h = this, g = v({}, c);
            return Object.entries(i.allOf).forEach(function(x) {
              var S = kn(x, 2), D = S[0], U = S[1];
              i.allOf[D] = h.expandRefs(U, !0), g = h.extendSchemas(g, h.expandSchema(U));
            }), delete g.allOf, g;
          }, extends: function(i, c) {
            var h, g = this;
            return delete (h = Array.isArray(i.extends) ? i.extends.reduce(function(x, S, D) {
              return g.extendSchemas(x, g.expandSchema(S));
            }, c) : this.extendSchemas(c, this.expandSchema(i.extends))).extends, h;
          }, oneOf: function(i, c) {
            var h = this, g = v({}, c);
            return delete g.oneOf, i.oneOf.reduce(function(x, S, D) {
              return x.oneOf[D] = h.extendSchemas(h.expandSchema(S), g), x;
            }, c), c;
          } };
        }, r = [{ key: "load", value: (l = ic(jn().mark(function e(t, i, c) {
          return jn().wrap(function(h) {
            for (; ; ) switch (h.prev = h.next) {
              case 0:
                return this.schema = t, h.next = 3, this._asyncloadExternalRefs(t, i, this._getFileBase(c), !0);
              case 3:
                return h.abrupt("return", this.expandRefs(t));
              case 4:
              case "end":
                return h.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return l.apply(this, arguments);
        }) }, { key: "expandRefs", value: function(e, t) {
          var i = this, c = v({}, e);
          if (!c.$ref) return c;
          var h = c.$ref.split("#");
          if (h.length === 2 && !this.refs_with_info[c.$ref]) {
            var g = this.expandRecursivePointer(this.schema, h[1]), x = this.extendSchemas(c, this.expandSchema(g));
            return delete x.$ref, x;
          }
          var S = h.length > 2 ? this.refs_with_info["#" + h[1]] : this.refs_with_info[c.$ref];
          delete c.$ref;
          var D = S.$ref.startsWith("#") ? S.fetchUrl : "", U = this._getRef(D, S);
          if (this.refs[U]) {
            if (t && k(this.refs[U], "allOf")) {
              var G = this.refs[U].allOf;
              Object.keys(G).forEach(function(te) {
                G[te] = i.expandRefs(G[te], !0);
              });
            }
          } else console.warn("reference:'".concat(U, "' not found!"));
          return h.length > 2 ? this.extendSchemas(c, this.expandSchema(this.expandRecursivePointer(this.refs[U], h[2]))) : this.extendSchemas(c, this.expandSchema(this.refs[U]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(c) {
            i[c] && (i = i[c]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(c) {
            var h = kn(c, 2), g = h[0], x = h[1];
            e[g] && x.call(t, e);
          });
          var i = v({}, e);
          return Object.entries(this._subSchema2).forEach(function(c) {
            var h = kn(c, 2), g = h[0], x = h[1];
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
          var h = {}, g = function(G) {
            return Object.keys(G).forEach(function(te) {
              h[te] = !0;
            });
          };
          if (e.$ref && bt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !c)) {
            var x = e.$ref, S = "";
            x.indexOf("#") > 0 && (x = x.substr(0, x.indexOf("#"))), x !== e.$ref && (S = e.$ref.substr(e.$ref.indexOf("#")));
            var D = this.refs_prefix + this.refs_counter++, U = D + S;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (h[x] = !0), this.refs_with_info[D] = { fetchUrl: t, $ref: x }, e.$ref = U;
          }
          return Object.values(e).forEach(function(G) {
            G && bt(G) === "object" && (Array.isArray(G) ? Object.values(G).forEach(function(te) {
              te && bt(te) === "object" && g(i._getExternalRefs(te, t, c));
            }) : G.$ref && typeof G.$ref == "string" && G.$ref.startsWith("#") || g(i._getExternalRefs(G, t, c)));
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
        } }, { key: "_asyncloadExternalRefs", value: (n = ic(jn().mark(function e(t, i, c) {
          var h, g, x, S, D, U, G = this, te = arguments;
          return jn().wrap(function(fe) {
            for (; ; ) switch (fe.prev = fe.next) {
              case 0:
                h = te.length > 3 && te[3] !== void 0 && te[3], g = this._getExternalRefs(t, i, h), x = 0, S = jn().mark(function _e() {
                  var we, Ie, De, He, ve, xe, Ke, it, Ot, nn, Ci;
                  return jn().wrap(function(Ne) {
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
                        return Ne.next = 48, new Promise(function(dr) {
                          var Ct = new XMLHttpRequest();
                          G.options.ajaxCredentials && (Ct.withCredentials = G.options.ajaxCredentials), Ct.overrideMimeType("application/json"), Ct.open("GET", xe, !0), Ct.onload = function() {
                            dr(Ct);
                          }, Ct.onerror = function($) {
                            dr(void 0);
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
                }), D = 0, U = Object.keys(g);
              case 5:
                if (!(D < U.length)) {
                  fe.next = 13;
                  break;
                }
                return fe.delegateYield(S(), "t0", 7);
              case 7:
                if (fe.t0 !== 0) {
                  fe.next = 10;
                  break;
                }
                return fe.abrupt("continue", 10);
              case 10:
                D++, fe.next = 5;
                break;
              case 13:
                if (x) {
                  fe.next = 15;
                  break;
                }
                return fe.abrupt("return", !0);
              case 15:
                this.onAllSchemasLoaded();
              case 16:
              case "end":
                return fe.stop();
            }
          }, e, this);
        })), function(e, t, i) {
          return n.apply(this, arguments);
        }) }, { key: "onSchemaLoaded", value: function(e) {
        } }, { key: "onAllSchemasLoaded", value: function() {
        } }, { key: "extendSchemas", value: function(e, t) {
          var i = this;
          e = v({}, e), t = v({}, t);
          var c = {}, h = function(g) {
            typeof g == "string" && (g = [g]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? c.type = g.filter(function(x) {
              return t.type.includes(x);
            }) : c.type = g, c.type.length === 1 && typeof c.type[0] == "string" ? c.type = c.type[0] : c.type.length === 0 && delete c.type;
          };
          return Object.entries(e).forEach(function(g) {
            var x = kn(g, 2), S = x[0], D = x[1];
            t[S] !== void 0 ? function(U, G) {
              (function(te, fe) {
                return (te === "required" || te === "defaultProperties") && bt(fe) === "object" && Array.isArray(fe);
              })(U, G) ? c[U] = G.concat(t[U]).reduce(function(te, fe) {
                return te.includes(fe) || te.push(fe), te;
              }, []) : U !== "type" || typeof G != "string" && !Array.isArray(G) ? bt(G) !== "object" || Array.isArray(G) || G === null ? c[U] = G : c[U] = i.extendSchemas(G, t[U]) : h(G);
            }(S, D) : c[S] = D;
          }), Object.entries(t).forEach(function(g) {
            var x = kn(g, 2), S = x[0], D = x[1];
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
        } }], r && Ap(s.prototype, r), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        var s, r, n, l;
      }(), Bp = (b(2762), { default: function() {
        return { compile: function(s) {
          var r = s.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return s;
          };
          for (var l = [], e = function(i) {
            var c, h, g = r[i].replace(/[{}]+/g, "").trim().split("."), x = g.length;
            x > 1 ? c = function(S) {
              for (h = S, i = 0; i < x && (h = h[g[i]]); i++) ;
              return h;
            } : (g = g[0], c = function(S) {
              return S[g];
            }), l.push({ s: r[i], r: c });
          }, t = 0; t < n; t++) e(t);
          return function(i) {
            for (var c, h = "".concat(s), g = 0; g < n; g++) c = l[g], h = h.replace(c.s, c.r(i));
            return h;
          };
        } };
      }, ejs: function() {
        return !!window.EJS && { compile: function(s) {
          var r = new window.EJS({ text: s });
          return function(n) {
            return r.render(n);
          };
        } };
      }, handlebars: function() {
        return window.Handlebars;
      }, hogan: function() {
        return !!window.Hogan && { compile: function(s) {
          var r = window.Hogan.compile(s);
          return function(n) {
            return r.render(n);
          };
        } };
      }, lodash: function() {
        return !!window._ && { compile: function(s) {
          return function(r) {
            return window._.template(s)(r);
          };
        } };
      }, markup: function() {
        return !(!window.Mark || !window.Mark.up) && { compile: function(s) {
          return function(r) {
            return window.Mark.up(s, r);
          };
        } };
      }, mustache: function() {
        return !!window.Mustache && { compile: function(s) {
          return function(r) {
            return window.Mustache.render(s, r);
          };
        } };
      }, swig: function() {
        return window.swig;
      }, underscore: function() {
        return !!window._ && { compile: function(s) {
          return function(r) {
            return window._.template(s)(r);
          };
        } };
      } });
      function $i(s) {
        return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $i(s);
      }
      function Us(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function Np(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Dp(l.key), l);
        }
      }
      function Dp(s) {
        var r = function(n, l) {
          if ($i(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if ($i(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return $i(r) == "symbol" ? r : r + "";
      }
      var Fp = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, xr = function() {
        return s = function n() {
          var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Fp;
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
            if (Array.isArray(c)) return Us(c);
          }(t = e.split(" ")) || function(c) {
            if (typeof Symbol < "u" && c[Symbol.iterator] != null || c["@@iterator"] != null) return Array.from(c);
          }(t) || function(c, h) {
            if (c) {
              if (typeof c == "string") return Us(c, h);
              var g = Object.prototype.toString.call(c).slice(8, -1);
              return g === "Object" && c.constructor && (g = c.constructor.name), g === "Map" || g === "Set" ? Array.from(c) : g === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g) ? Us(c, h) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && Np(s.prototype, r), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        var s, r;
      }();
      function Gs(s) {
        return Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gs(s);
      }
      function Mp(s, r, n) {
        return r = jo(r), function(l, e) {
          if (e && (Gs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, sc() ? Reflect.construct(r, n || [], jo(s).constructor) : r.apply(s, n));
      }
      function sc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (sc = function() {
          return !!s;
        })();
      }
      function jo(s) {
        return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jo(s);
      }
      function Ws(s, r) {
        return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ws(s, r);
      }
      var Hp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Vp = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Mp(this, r, ["glyphicon glyphicon-", Hp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ws(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Js(s) {
        return Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Js(s);
      }
      function zp(s, r, n) {
        return r = ko(r), function(l, e) {
          if (e && (Js(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, ac() ? Reflect.construct(r, n || [], ko(s).constructor) : r.apply(s, n));
      }
      function ac() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (ac = function() {
          return !!s;
        })();
      }
      function ko(s) {
        return ko = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ko(s);
      }
      function Ks(s, r) {
        return Ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ks(s, r);
      }
      var qp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, $p = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zp(this, r, ["icon-", qp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ks(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Zs(s) {
        return Zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zs(s);
      }
      function Up(s, r, n) {
        return r = xo(r), function(l, e) {
          if (e && (Zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, lc() ? Reflect.construct(r, n || [], xo(s).constructor) : r.apply(s, n));
      }
      function lc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (lc = function() {
          return !!s;
        })();
      }
      function xo(s) {
        return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, xo(s);
      }
      function Ys(s, r) {
        return Ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Ys(s, r);
      }
      var Gp = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Wp = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Up(this, r, ["fa fa-", Gp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Ys(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function Qs(s) {
        return Qs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qs(s);
      }
      function Jp(s, r, n) {
        return r = Oo(r), function(l, e) {
          if (e && (Qs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, cc() ? Reflect.construct(r, n || [], Oo(s).constructor) : r.apply(s, n));
      }
      function cc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (cc = function() {
          return !!s;
        })();
      }
      function Oo(s) {
        return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Oo(s);
      }
      function Xs(s, r) {
        return Xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, Xs(s, r);
      }
      var Kp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, Zp = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Jp(this, r, ["fas fa-", Kp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && Xs(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ea(s) {
        return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ea(s);
      }
      function Yp(s, r, n) {
        return r = Co(r), function(l, e) {
          if (e && (ea(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, uc() ? Reflect.construct(r, n || [], Co(s).constructor) : r.apply(s, n));
      }
      function uc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (uc = function() {
          return !!s;
        })();
      }
      function Co(s) {
        return Co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Co(s);
      }
      function ta(s, r) {
        return ta = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ta(s, r);
      }
      var Qp = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, Xp = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yp(this, r, ["ui-icon ui-icon-", Qp]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && ta(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ra(s) {
        return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ra(s);
      }
      function ef(s, r, n) {
        return r = Eo(r), function(l, e) {
          if (e && (ra(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, hc() ? Reflect.construct(r, n || [], Eo(s).constructor) : r.apply(s, n));
      }
      function hc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (hc = function() {
          return !!s;
        })();
      }
      function Eo(s) {
        return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Eo(s);
      }
      function na(s, r) {
        return na = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, na(s, r);
      }
      var tf = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, rf = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ef(this, r, ["oi oi-", tf]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && na(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function ia(s) {
        return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ia(s);
      }
      function nf(s, r, n) {
        return r = So(r), function(l, e) {
          if (e && (ia(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, dc() ? Reflect.construct(r, n || [], So(s).constructor) : r.apply(s, n));
      }
      function dc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (dc = function() {
          return !!s;
        })();
      }
      function So(s) {
        return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, So(s);
      }
      function oa(s, r) {
        return oa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, oa(s, r);
      }
      var of = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, sf = function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), nf(this, r, ["icon icon-", of]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && oa(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr);
      function sa(s) {
        return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, sa(s);
      }
      function af(s, r, n) {
        return r = Po(r), function(l, e) {
          if (e && (sa(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, pc() ? Reflect.construct(r, n || [], Po(s).constructor) : r.apply(s, n));
      }
      function pc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pc = function() {
          return !!s;
        })();
      }
      function Po(s) {
        return Po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Po(s);
      }
      function aa(s, r) {
        return aa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, aa(s, r);
      }
      var lf = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, cf = { bootstrap: function(s) {
        function r() {
          return function(l, e) {
            if (!(l instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), af(this, r, ["bi bi-", lf]);
        }
        return function(l, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(e && e.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), e && aa(l, e);
        }(r, s), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(xr), bootstrap3: Vp, fontawesome3: $p, fontawesome4: Wp, fontawesome5: Zp, jqueryui: Xp, openiconic: rf, spectre: sf };
      function Ui(s) {
        return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Ui(s);
      }
      function uf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, hf(l.key), l);
        }
      }
      function hf(s) {
        var r = function(n, l) {
          if (Ui(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Ui(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Ui(r) == "symbol" ? r : r + "";
      }
      var fc = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(s) {
        return s in document.documentElement;
      }), Or = function() {
        return s = function n(l) {
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
          for (var h = 0; h < l.length; h++) {
            var g = document.createElement("option");
            g.setAttribute("value", l[h]), g.textContent = e[h] || l[h], n.appendChild(g);
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
          }, c = n.getAttribute("min"), h = n.getAttribute("max");
          return e.addEventListener("click", function() {
            n.getAttribute("initialized") ? c ? Number(n.value) > Number(c) && n.stepDown() : n.stepDown() : i(n, c), j(n, "change");
          }), t.addEventListener("click", function() {
            n.getAttribute("initialized") ? h ? Number(n.value) < Number(h) && n.stepUp() : n.stepUp() : i(n, c), j(n, "change");
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
          var h = document.createElement("div");
          return h.style.clear = "left", t.appendChild(h), t;
        } }, { key: "getProgressBar", value: function() {
          var n = document.createElement("progress");
          return n.setAttribute("max", 100), n.setAttribute("value", 0), n;
        } }, { key: "updateProgressBar", value: function(n, l) {
          n && n.setAttribute("value", l);
        } }, { key: "updateProgressBarUnknown", value: function(n) {
          n && n.removeAttribute("value");
        } }], r && uf(s.prototype, r), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        var s, r;
      }();
      function bi(s) {
        return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bi(s);
      }
      function df(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, pf(l.key), l);
        }
      }
      function pf(s) {
        var r = function(n, l) {
          if (bi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (bi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return bi(r) == "symbol" ? r : r + "";
      }
      function ff(s, r, n) {
        return r = lr(r), function(l, e) {
          if (e && (bi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, yc() ? Reflect.construct(r, n || [], lr(s).constructor) : r.apply(s, n));
      }
      function yc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yc = function() {
          return !!s;
        })();
      }
      function xn() {
        return xn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = lr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, xn.apply(this, arguments);
      }
      function lr(s) {
        return lr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lr(s);
      }
      function la(s, r) {
        return la = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, la(s, r);
      }
      var mc = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ff(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && la(e, t);
        }(r, s), n = r, (l = [{ key: "getFormInputLabel", value: function(e, t) {
          var i = xn(lr(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = xn(lr(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-form-input-label"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var e = xn(lr(r.prototype), "getIndentedPanel", this).call(this);
          return e.classList.add("je-indented-panel"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var e = xn(lr(r.prototype), "getChildEditorHolder", this).call(this);
          return e.classList.add("je-child-editor-holder"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("je-header-button-holder"), e;
        } }, { key: "getTable", value: function() {
          var e = xn(lr(r.prototype), "getTable", this).call(this);
          return e.classList.add("je-table"), e;
        } }, { key: "addInputError", value: function(e, t) {
          var i = this.closest(e, ".form-control") || e.controlgroup;
          e.errmsg ? e.errmsg.style.display = "block" : (e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), e.errmsg.style = e.errmsg.style || {}, e.errmsg.style.color = "red", i.appendChild(e.errmsg)), e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && df(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function vi(s) {
        return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, vi(s);
      }
      function yf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, mf(l.key), l);
        }
      }
      function mf(s) {
        var r = function(n, l) {
          if (vi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (vi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return vi(r) == "symbol" ? r : r + "";
      }
      function bf(s, r, n) {
        return r = cr(r), function(l, e) {
          if (e && (vi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, bc() ? Reflect.construct(r, n || [], cr(s).constructor) : r.apply(s, n));
      }
      function bc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (bc = function() {
          return !!s;
        })();
      }
      function On() {
        return On = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = cr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, On.apply(this, arguments);
      }
      function cr(s) {
        return cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, cr(s);
      }
      function ca(s, r) {
        return ca = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ca(s, r);
      }
      mc.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var vc = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), bf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ca(e, t);
        }(r, s), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(h), { label: t, checkbox: c, container: i };
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = On(cr(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i;
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("col-md-offset-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, c, h) {
          return On(cr(r.prototype), "getRangeInput", this).call(this, e, t, i, c, h);
        } }, { key: "getFormInputField", value: function(e) {
          var t = On(cr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && t.classList.add("form-control"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, h) {
          var g = document.createElement("div");
          return !e || t.type !== "checkbox" && t.type !== "radio" ? (g.classList.add("form-group"), e && (e.classList.add("control-label"), g.appendChild(e), c && e.appendChild(c)), g.appendChild(t)) : (g.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), g.appendChild(e)), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), g;
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
          var c = On(cr(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-default"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = On(cr(r.prototype), "getTableContainer", this).call(this);
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
            for (var h = 0; h < t.length; h++) c.appendChild(t[h]);
            return i;
          }
        } }]) && yf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function gi(s) {
        return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, gi(s);
      }
      function vf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, gf(l.key), l);
        }
      }
      function gf(s) {
        var r = function(n, l) {
          if (gi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (gi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return gi(r) == "symbol" ? r : r + "";
      }
      function _f(s, r, n) {
        return r = ur(r), function(l, e) {
          if (e && (gi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, gc() ? Reflect.construct(r, n || [], ur(s).constructor) : r.apply(s, n));
      }
      function gc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (gc = function() {
          return !!s;
        })();
      }
      function Cn() {
        return Cn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ur(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, Cn.apply(this, arguments);
      }
      function ur(s) {
        return ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ur(s);
      }
      function ua(s, r) {
        return ua = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ua(s, r);
      }
      vc.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var wf = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, _c = function(s) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), _f(this, r, [e, wf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ua(e, t);
        }(r, s), n = r, (l = [{ key: "getSelectInput", value: function(e, t) {
          var i = Cn(ur(r.prototype), "getSelectInput", this).call(this, e);
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
          var h = document.createElement("label");
          h.setAttribute("for", e + "-opt-in"), h.classList.add("custom-control-label");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", h.appendChild(g), i.appendChild(c), i.appendChild(h), { label: t, checkbox: c, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, c, h) {
          var g = Cn(ur(r.prototype), "getRangeInput", this).call(this, e, t, i, c, h);
          return this.options.custom_forms === !0 && (g.classList.remove("form-control"), g.classList.add("custom-range")), g;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), c = document.createElement("div"), h = document.createElement("button");
          h.setAttribute("type", "button");
          var g = document.createElement("button");
          g.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), i.appendChild(h), c.appendChild(g), t.classList.add("input-group"), i.classList.add("input-group-prepend"), c.classList.add("input-group-append"), h.classList.add("btn"), h.classList.add("btn-secondary"), h.classList.add("stepper-down"), g.classList.add("btn"), g.classList.add("btn-secondary"), g.classList.add("stepper-up"), e.getAttribute("readonly") && (h.setAttribute("disabled", !0), g.setAttribute("disabled", !0)), h.textContent = "-", g.textContent = "+";
          var x = function(U, G) {
            U.value = Number(G || U.value), U.setAttribute("initialized", "1");
          }, S = e.getAttribute("min"), D = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), h.addEventListener("click", function() {
            e.getAttribute("initialized") ? S ? Number(e.value) > Number(S) && e.stepDown() : e.stepDown() : x(e, S), j(e, "change");
          }), g.addEventListener("click", function() {
            e.getAttribute("initialized") ? D ? Number(e.value) < Number(D) && e.stepUp() : e.stepUp() : x(e, S), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = Cn(ur(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && e !== "file" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), e === "file" && t.classList.add("form-control-file"), t;
        } }, { key: "getHiddenLabel", value: function(e) {
          var t = document.createElement("label");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "visuallyHidden", value: function(e) {
          e && e.classList.add("sr-only");
        } }, { key: "getHiddenText", value: function(e) {
          var t = document.createElement("span");
          return t.textContent = e, t.classList.add("sr-only"), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, h) {
          var g = document.createElement("div");
          if (g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (g.appendChild(e), c && g.appendChild(c)), g.appendChild(t);
          else {
            var x = document.createElement("div");
            this.options.custom_forms === !1 ? (x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (x.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? x.classList.add("custom-checkbox") : x.classList.add("custom-radio")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), g.appendChild(x);
          }
          return i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), g;
        } }, { key: "getInfoButton", value: function(e) {
          var t = document.createElement("button");
          t.type = "button", t.classList.add("ml-3", "jsoneditor-twbs4-text-button"), t.setAttribute("data-toggle", "tooltip"), t.setAttribute("data-placement", "auto"), t.title = e;
          var i = document.createTextNode("ⓘ");
          return t.appendChild(i), this.options.tooltip === "bootstrap" ? window.jQuery && window.jQuery().tooltip ? window.jQuery(t).tooltip() : console.warn("Could not find popper jQuery plugin of Bootstrap.") : this.options.tooltip === "css" && t.classList.add("je-tooltip"), t;
        } }, { key: "getCheckbox", value: function() {
          return this.getFormInputField("checkbox");
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, c) {
          var h = document.createElement("div");
          h.classList.add("form-group"), t && (h.appendChild(t), c && t.appendChild(c));
          var g = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            g.appendChild(S);
          }), h.appendChild(g), i && h.appendChild(i), h;
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
          var c = Cn(ur(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = Cn(ur(r.prototype), "getTableContainer", this).call(this);
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
            for (var h = 0; h < t.length; h++) t[h].classList.remove("mr-2", "btn-secondary"), t[h].classList.add("btn-outline-secondary"), c.appendChild(t[h]);
            return i;
          }
        } }]) && vf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function _i(s) {
        return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _i(s);
      }
      function jf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, kf(l.key), l);
        }
      }
      function kf(s) {
        var r = function(n, l) {
          if (_i(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (_i(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return _i(r) == "symbol" ? r : r + "";
      }
      function xf(s, r, n) {
        return r = hr(r), function(l, e) {
          if (e && (_i(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, wc() ? Reflect.construct(r, n || [], hr(s).constructor) : r.apply(s, n));
      }
      function wc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wc = function() {
          return !!s;
        })();
      }
      function En() {
        return En = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = hr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, En.apply(this, arguments);
      }
      function hr(s) {
        return hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, hr(s);
      }
      function ha(s, r) {
        return ha = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ha(s, r);
      }
      _c.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Of = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, jc = function(s) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), xf(this, r, [e, Of]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ha(e, t);
        }(r, s), n = r, (l = [{ key: "getSelectInput", value: function(e, t) {
          var i = En(hr(r.prototype), "getSelectInput", this).call(this, e);
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
          var h = document.createElement("label");
          h.setAttribute("for", e + "-opt-in"), h.classList.add("form-check-label");
          var g = document.createElement("span");
          return g.classList.add("visually-hidden"), g.textContent = e + "-opt-in", h.appendChild(g), i.appendChild(c), i.appendChild(h), { label: t, checkbox: c, container: i };
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
        } }, { key: "getRangeInput", value: function(e, t, i, c, h) {
          var g = En(hr(r.prototype), "getRangeInput", this).call(this, e, t, i, c, h);
          return g.classList.remove("form-control"), g.classList.add("form-range"), g;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var c = document.createElement("button");
          c.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(c), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), c.classList.add("btn"), c.classList.add("btn-secondary"), c.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), c.setAttribute("disabled", !0)), i.textContent = "-", c.textContent = "+";
          var h = function(S, D) {
            S.value = Number(D || S.value), S.setAttribute("initialized", "1");
          }, g = e.getAttribute("min"), x = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? g ? Number(e.value) > Number(g) && e.stepDown() : e.stepDown() : h(e, g), j(e, "change");
          }), c.addEventListener("click", function() {
            e.getAttribute("initialized") ? x ? Number(e.value) < Number(x) && e.stepUp() : e.stepUp() : h(e, g), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = En(hr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, c, h) {
          var g = document.createElement("div");
          if (g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), g.appendChild(e), c && g.appendChild(c)), g.appendChild(t);
          else {
            var x = document.createElement("div");
            x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), x.appendChild(t), x.appendChild(e), c && x.appendChild(c), g.appendChild(x);
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
          var h = document.createElement("div");
          h.classList.add("form-group"), t && (h.appendChild(t), c && t.appendChild(c));
          var g = document.createElement("div");
          return Object.values(e).forEach(function(x) {
            var S = x.firstChild;
            g.appendChild(S);
          }), h.appendChild(g), i && h.appendChild(i), h;
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
          var c = En(hr(r.prototype), "getButton", this).call(this, e, t, i);
          return c.classList.add("btn", "btn-secondary", "btn-sm"), c;
        } }, { key: "getTableContainer", value: function() {
          var e = En(hr(r.prototype), "getTableContainer", this).call(this);
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
        } }]) && jf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function wi(s) {
        return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, wi(s);
      }
      function Cf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Ef(l.key), l);
        }
      }
      function Ef(s) {
        var r = function(n, l) {
          if (wi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (wi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return wi(r) == "symbol" ? r : r + "";
      }
      function Sf(s, r, n) {
        return r = Cr(r), function(l, e) {
          if (e && (wi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, kc() ? Reflect.construct(r, n || [], Cr(s).constructor) : r.apply(s, n));
      }
      function kc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (kc = function() {
          return !!s;
        })();
      }
      function ji() {
        return ji = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Cr(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, ji.apply(this, arguments);
      }
      function Cr(s) {
        return Cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Cr(s);
      }
      function da(s, r) {
        return da = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, da(s, r);
      }
      jc.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var xc = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Sf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && da(e, t);
        }(r, s), n = r, (l = [{ key: "getTable", value: function() {
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
          var h = ji(Cr(r.prototype), "getFormControl", this).call(this, e, t, i, c);
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
          var c = document.createElement("button");
          c.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), t && !e ? (c.classList.add("ui-button-icon-only"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(t)) : t ? (c.classList.add("ui-button-text-icon-primary"), t.classList.add("ui-button-icon-primary", "ui-icon-primary"), c.appendChild(t)) : c.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          return h.classList.add("ui-button-text"), h.textContent = e || i || ".", c.appendChild(h), c.setAttribute("title", i), c;
        } }, { key: "setButtonText", value: function(e, t, i, c) {
          e.innerHTML = "", e.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !t ? (e.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : i ? (e.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), e.appendChild(i)) : e.classList.add("ui-button-text-only");
          var h = document.createElement("span");
          h.classList.add("ui-button-text"), h.textContent = t || c || ".", e.appendChild(h), e.setAttribute("title", c);
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
        } }]) && Cf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function ki(s) {
        return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ki(s);
      }
      function Pf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Tf(l.key), l);
        }
      }
      function Tf(s) {
        var r = function(n, l) {
          if (ki(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (ki(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return ki(r) == "symbol" ? r : r + "";
      }
      function Lf(s, r, n) {
        return r = To(r), function(l, e) {
          if (e && (ki(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Oc() ? Reflect.construct(r, n || [], To(s).constructor) : r.apply(s, n));
      }
      function Oc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Oc = function() {
          return !!s;
        })();
      }
      function To(s) {
        return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, To(s);
      }
      function pa(s, r) {
        return pa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, pa(s, r);
      }
      xc.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var Cc = function(s) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Lf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && pa(e, t);
        }(r, s), n = r, (l = [{ key: "addInputError", value: function(e, t) {
          if (e.errmsg) e.errmsg.style.display = "block";
          else {
            var i = this.closest(e, ".form-control");
            e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(e.errmsg);
          }
          e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && Pf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function xi(s) {
        return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, xi(s);
      }
      function Af(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Rf(l.key), l);
        }
      }
      function Rf(s) {
        var r = function(n, l) {
          if (xi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (xi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return xi(r) == "symbol" ? r : r + "";
      }
      function If(s, r, n) {
        return r = pt(r), function(l, e) {
          if (e && (xi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Ec() ? Reflect.construct(r, n || [], pt(s).constructor) : r.apply(s, n));
      }
      function Ec() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Ec = function() {
          return !!s;
        })();
      }
      function vt() {
        return vt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = pt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, vt.apply(this, arguments);
      }
      function pt(s) {
        return pt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, pt(s);
      }
      function fa(s, r) {
        return fa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, fa(s, r);
      }
      Cc.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Bf = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, Sc = function(s) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), If(this, r, [e, Bf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fa(e, t);
        }(r, s), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = document.createElement("span");
          t.classList.add("form-group");
          var i = document.createElement("label");
          i.classList.add("form-switch", "d-inline-block");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("i");
          h.classList.add("form-icon");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(h), t.appendChild(i), { label: i, checkbox: c, container: t };
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
        } }, { key: "getRangeInput", value: function(e, t, i, c, h) {
          var g = vt(pt(r.prototype), "getRangeInput", this).call(this, e, t, i, c, h);
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
        } }, { key: "getFormControl", value: function(e, t, i, c, h) {
          var g = document.createElement("div");
          return g.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio" ? (e && (e.classList.add("form-label"), g.appendChild(e), c && e.appendChild(c)), g.appendChild(t)) : (g.classList.add(t.type), c && e.appendChild(c), e.insertBefore(t, e.firstChild), g.appendChild(e)), this.options.input_size === "small" ? t.classList.add("input-sm", "select-sm") : this.options.input_size === "large" && t.classList.add("input-lg", "select-lg"), t.type !== "checkbox" && g.appendChild(t), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), g;
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
          var h = document.createElement("div");
          h.classList.add("popover-container"), t.appendChild(h);
          var g = document.createElement("div");
          g.classList.add("card"), h.appendChild(g);
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
        } }]) && Af(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      function Oi(s) {
        return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Oi(s);
      }
      function Nf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, Df(l.key), l);
        }
      }
      function Df(s) {
        var r = function(n, l) {
          if (Oi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Oi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Oi(r) == "symbol" ? r : r + "";
      }
      function Ff(s, r, n) {
        return r = mt(r), function(l, e) {
          if (e && (Oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(l);
        }(s, Pc() ? Reflect.construct(r, n || [], mt(s).constructor) : r.apply(s, n));
      }
      function Pc() {
        try {
          var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (Pc = function() {
          return !!s;
        })();
      }
      function _t() {
        return _t = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(s, r, n) {
          var l = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = mt(t)) !== null; ) ;
            return t;
          }(s, r);
          if (l) {
            var e = Object.getOwnPropertyDescriptor(l, r);
            return e.get ? e.get.call(arguments.length < 3 ? s : n) : e.value;
          }
        }, _t.apply(this, arguments);
      }
      function mt(s) {
        return mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mt(s);
      }
      function ya(s, r) {
        return ya = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, l) {
          return n.__proto__ = l, n;
        }, ya(s, r);
      }
      Sc.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Mf = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, Tc = function(s) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ff(this, r, [e, Mf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ya(e, t);
        }(r, s), n = r, (l = [{ key: "getOptInSwitch", value: function(e) {
          var t = this.getHiddenLabel(e + " opt-in");
          t.setAttribute("for", e + "-opt-in");
          var i = document.createElement("label");
          i.classList.add("switch");
          var c = document.createElement("input");
          c.setAttribute("type", "checkbox"), c.setAttribute("id", e + "-opt-in"), c.classList.add("json-editor-opt-in");
          var h = document.createElement("span");
          h.classList.add("switch-slider", "round");
          var g = document.createElement("span");
          return g.classList.add("sr-only"), g.textContent = e + "-opt-in", i.appendChild(g), i.appendChild(c), i.appendChild(h), { label: t, checkbox: c, container: i };
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
          var h = _t(mt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, c);
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
        } }, { key: "getRadioHolder", value: function(e, t, i, c, h) {
          var g = _t(mt(r.prototype), "getRadioHolder", this).call(this, t, i, c, h);
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
        } }, { key: "getFormControl", value: function(e, t, i, c, h) {
          var g = document.createElement("div");
          return g.classList.add("form-group", "mb-1", "w-full"), e && (e.classList.add("text-xs"), t.type === "checkbox" && (t.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormCheckboxControl(e, t, !1, c)), t.type === "radio" && (t.classList.add("form-radio", "text-red-600", "mr-1"), e.classList.add("items-center", "flex"), e = this.getFormRadioControl(e, t, !1, c)), g.appendChild(e), !["checkbox", "radio"].includes(t.type) && c && g.appendChild(c)), ["checkbox", "radio"].includes(t.type) || (this.options.input_size === "small" ? t.classList.add("text-xs") : this.options.input_size === "normal" ? t.classList.add("text-base") : this.options.input_size === "large" && t.classList.add("text-xl"), g.appendChild(t)), i && g.appendChild(i), t.tagName.toLowerCase() !== "div" && t && e && h && (e.setAttribute("for", h), t.setAttribute("id", h)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", h + "-description"), t.setAttribute("aria-describedby", h + "-description")), g;
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
            for (var h = 0; h < t.length; h++) c.appendChild(t[h]);
            return i;
          }
        } }]) && Nf(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, l;
      }(Or);
      Tc.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Hf = { html: mc, bootstrap3: vc, bootstrap4: _c, bootstrap5: jc, jqueryui: xc, barebones: Cc, spectre: Sc, tailwind: Tc };
      const Vf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function Sn(s) {
        return Sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Sn(s);
      }
      function ma(s, r) {
        (r == null || r > s.length) && (r = s.length);
        for (var n = 0, l = new Array(r); n < r; n++) l[n] = s[n];
        return l;
      }
      function ba() {
        ba = function() {
          return r;
        };
        var s, r = {}, n = Object.prototype, l = n.hasOwnProperty, e = Object.defineProperty || function($, q, K) {
          $[q] = K.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", c = t.asyncIterator || "@@asyncIterator", h = t.toStringTag || "@@toStringTag";
        function g($, q, K) {
          return Object.defineProperty($, q, { value: K, enumerable: !0, configurable: !0, writable: !0 }), $[q];
        }
        try {
          g({}, "");
        } catch {
          g = function(q, K, ge) {
            return q[K] = ge;
          };
        }
        function x($, q, K, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), Ue = new dr(ge || []);
          return e(Le, "_invoke", { value: Ot($, K, Ue) }), Le;
        }
        function S($, q, K) {
          try {
            return { type: "normal", arg: $.call(q, K) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var D = "suspendedStart", U = "suspendedYield", G = "executing", te = "completed", fe = {};
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
        function Ke($) {
          ["next", "throw", "return"].forEach(function(q) {
            g($, q, function(K) {
              return this._invoke(q, K);
            });
          });
        }
        function it($, q) {
          function K(se, Le, Ue, ot) {
            var st = S($[se], $, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && Sn(Yt) == "object" && l.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                K("next", Et, Ue, ot);
              }, function(Et) {
                K("throw", Et, Ue, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, Ue(It);
              }, function(Et) {
                return K("throw", Et, Ue, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function Ue() {
              return new q(function(ot, st) {
                K(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then(Ue, Ue) : Ue();
          } });
        }
        function Ot($, q, K) {
          var ge = D;
          return function(se, Le) {
            if (ge === G) throw Error("Generator is already running");
            if (ge === te) {
              if (se === "throw") throw Le;
              return { value: s, done: !0 };
            }
            for (K.method = se, K.arg = Le; ; ) {
              var Ue = K.delegate;
              if (Ue) {
                var ot = nn(Ue, K);
                if (ot) {
                  if (ot === fe) continue;
                  return ot;
                }
              }
              if (K.method === "next") K.sent = K._sent = K.arg;
              else if (K.method === "throw") {
                if (ge === D) throw ge = te, K.arg;
                K.dispatchException(K.arg);
              } else K.method === "return" && K.abrupt("return", K.arg);
              ge = G;
              var st = S($, q, K);
              if (st.type === "normal") {
                if (ge = K.done ? te : U, st.arg === fe) continue;
                return { value: st.arg, done: K.done };
              }
              st.type === "throw" && (ge = te, K.method = "throw", K.arg = st.arg);
            }
          };
        }
        function nn($, q) {
          var K = q.method, ge = $.iterator[K];
          if (ge === s) return q.delegate = null, K === "throw" && $.iterator.return && (q.method = "return", q.arg = s, nn($, q), q.method === "throw") || K !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + K + "' method")), fe;
          var se = S(ge, $.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, fe;
          var Le = se.arg;
          return Le ? Le.done ? (q[$.resultName] = Le.value, q.next = $.nextLoc, q.method !== "return" && (q.method = "next", q.arg = s), q.delegate = null, fe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, fe);
        }
        function Ci($) {
          var q = { tryLoc: $[0] };
          1 in $ && (q.catchLoc = $[1]), 2 in $ && (q.finallyLoc = $[2], q.afterLoc = $[3]), this.tryEntries.push(q);
        }
        function Ne($) {
          var q = $.completion || {};
          q.type = "normal", delete q.arg, $.completion = q;
        }
        function dr($) {
          this.tryEntries = [{ tryLoc: "root" }], $.forEach(Ci, this), this.reset(!0);
        }
        function Ct($) {
          if ($ || $ === "") {
            var q = $[i];
            if (q) return q.call($);
            if (typeof $.next == "function") return $;
            if (!isNaN($.length)) {
              var K = -1, ge = function se() {
                for (; ++K < $.length; ) if (l.call($, K)) return se.value = $[K], se.done = !1, se;
                return se.value = s, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(Sn($) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = g(Ie, h, "GeneratorFunction"), r.isGeneratorFunction = function($) {
          var q = typeof $ == "function" && $.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function($) {
          return Object.setPrototypeOf ? Object.setPrototypeOf($, Ie) : ($.__proto__ = Ie, g($, h, "GeneratorFunction")), $.prototype = Object.create(xe), $;
        }, r.awrap = function($) {
          return { __await: $ };
        }, Ke(it.prototype), g(it.prototype, c, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function($, q, K, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x($, q, K, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function(Ue) {
            return Ue.done ? Ue.value : Le.next();
          });
        }, Ke(xe), g(xe, h, "Generator"), g(xe, i, function() {
          return this;
        }), g(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function($) {
          var q = Object($), K = [];
          for (var ge in q) K.push(ge);
          return K.reverse(), function se() {
            for (; K.length; ) {
              var Le = K.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, dr.prototype = { constructor: dr, reset: function($) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = s, this.done = !1, this.delegate = null, this.method = "next", this.arg = s, this.tryEntries.forEach(Ne), !$) for (var q in this) q.charAt(0) === "t" && l.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = s);
        }, stop: function() {
          this.done = !0;
          var $ = this.tryEntries[0].completion;
          if ($.type === "throw") throw $.arg;
          return this.rval;
        }, dispatchException: function($) {
          if (this.done) throw $;
          var q = this;
          function K(st, It) {
            return Le.type = "throw", Le.arg = $, q.next = st, It && (q.method = "next", q.arg = s), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return K("end");
            if (se.tryLoc <= this.prev) {
              var Ue = l.call(se, "catchLoc"), ot = l.call(se, "finallyLoc");
              if (Ue && ot) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              } else if (Ue) {
                if (this.prev < se.catchLoc) return K(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return K(se.finallyLoc);
              }
            }
          }
        }, abrupt: function($, q) {
          for (var K = this.tryEntries.length - 1; K >= 0; --K) {
            var ge = this.tryEntries[K];
            if (ge.tryLoc <= this.prev && l.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
              var se = ge;
              break;
            }
          }
          se && ($ === "break" || $ === "continue") && se.tryLoc <= q && q <= se.finallyLoc && (se = null);
          var Le = se ? se.completion : {};
          return Le.type = $, Le.arg = q, se ? (this.method = "next", this.next = se.finallyLoc, fe) : this.complete(Le);
        }, complete: function($, q) {
          if ($.type === "throw") throw $.arg;
          return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && q && (this.next = q), fe;
        }, finish: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.finallyLoc === $) return this.complete(K.completion, K.afterLoc), Ne(K), fe;
          }
        }, catch: function($) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var K = this.tryEntries[q];
            if (K.tryLoc === $) {
              var ge = K.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(K);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function($, q, K) {
          return this.delegate = { iterator: Ct($), resultName: q, nextLoc: K }, this.method === "next" && (this.arg = s), fe;
        } }, r;
      }
      function Lc(s, r, n, l, e, t, i) {
        try {
          var c = s[t](i), h = c.value;
        } catch (g) {
          return void n(g);
        }
        c.done ? r(h) : Promise.resolve(h).then(l, e);
      }
      function zf(s, r) {
        for (var n = 0; n < r.length; n++) {
          var l = r[n];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(s, qf(l.key), l);
        }
      }
      function qf(s) {
        var r = function(n, l) {
          if (Sn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Sn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(s);
        return Sn(r) == "symbol" ? r : r + "";
      }
      var Er = function() {
        function s(t) {
          var i = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(G, te) {
            if (!(G instanceof te)) throw new TypeError("Cannot call a class as a function");
          }(this, s), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = v({}, s.defaults.options, c), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || s.defaults.translate, this.translateProperty = this.options.translateProperty || s.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var h = this.options.theme || s.defaults.theme, g = s.defaults.themes[h];
          if (!g) throw new Error("Unknown theme ".concat(h));
          this.element.setAttribute("data-theme", h), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new g(this);
          var x = v(Vf, this.getEditorsRules()), S = function(G, te, fe) {
            return fe ? i.addNewStyleRulesToShadowRoot(G, te, fe) : i.addNewStyleRules(G, te);
          };
          if (!this.theme.options.disable_theme_rules) {
            var D = C(this.element);
            S("default", x, D), g.rules !== void 0 && S(h, g.rules, D);
          }
          var U = s.defaults.iconlibs[this.options.iconlib || s.defaults.iconlib];
          U && (this.iconlib = new U()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = s, n = [{ key: "load", value: (l = ba().mark(function t() {
          var i, c, h, g, x, S, D = this;
          return ba().wrap(function(U) {
            for (; ; ) switch (U.prev = U.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (c = new Ip(this.options)).onSchemaLoaded = function(G) {
                  D.trigger("schemaLoaded", G);
                }, c.onAllSchemasLoaded = function() {
                  D.trigger("allSchemasLoaded");
                }, this.expandSchema = function(G) {
                  return c.expandSchema(G);
                }, this.expandRefs = function(G, te) {
                  return c.expandRefs(G, te);
                }, h = document.location.toString(), U.next = 9, c.load(this.schema, i, h);
              case 9:
                g = U.sent, x = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new Il(this, null, x, s.defaults), S = this.getEditorClass(g), this.root = this.createEditor(S, { jsoneditor: this, schema: g, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), k(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  D.ready && (D.validation_results = D.validator.validate(D.root.getValue()), D.root.showValidationErrors(D.validation_results), D.trigger("ready"), D.trigger("change"));
                });
              case 24:
              case "end":
                return U.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(c, h) {
            var g = l.apply(t, i);
            function x(D) {
              Lc(g, c, h, x, S, "next", D);
            }
            function S(D) {
              Lc(g, c, h, x, S, "throw", D);
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
            for (var c = [], h = 0; h < this.callbacks[t].length; h++) this.callbacks[t][h] !== i && c.push(this.callbacks[t][h]);
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
          return Object.values(s.defaults.editors).reduce(function(t, i) {
            return i.rules ? v(t, i.rules) : t;
          }, {});
        } }, { key: "getEditorClass", value: function(t) {
          var i, c = this;
          if (t = this.expandSchema(t), s.defaults.resolvers.find(function(h) {
            return (i = h(t, c)) && s.defaults.editors[i];
          }), !i) throw new Error("Unknown editor for schema ".concat(JSON.stringify(t)));
          if (!s.defaults.editors[i]) throw new Error("Unknown editor ".concat(i));
          return s.defaults.editors[i];
        } }, { key: "createEditor", value: function(t, i) {
          var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          return new t(i = v({}, t.options || {}, i), s.defaults, c);
        } }, { key: "onChange", value: function(t) {
          var i = this;
          if (this.ready && (t && this.trigger(t.event, t.data), !this.firing_change)) return this.firing_change = !0, window.requestAnimationFrame(function() {
            i.firing_change = !1, i.ready && (i.validation_results = i.validator.validate(i.root.getValue()), i.options.show_errors !== "never" ? i.root.showValidationErrors(i.validation_results) : i.root.showValidationErrors([]), i.trigger("change"));
          }), this;
        } }, { key: "compileTemplate", value: function(t) {
          var i, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s.defaults.template;
          if (typeof c == "string") {
            if (!s.defaults.templates[c]) throw new Error("Unknown template engine ".concat(c));
            if (!(i = s.defaults.templates[c]())) throw new Error("Template engine ".concat(c, " missing required library."));
          } else i = c;
          if (!i) throw new Error("No template engine set");
          if (!i.compile) throw new Error("Invalid template engine set");
          return i.compile(t);
        } }, { key: "_data", value: function(t, i, c) {
          if (arguments.length !== 3) return t.hasAttribute("data-jsoneditor-".concat(i)) ? this.__data[t.getAttribute("data-jsoneditor-".concat(i))] : null;
          var h;
          t.hasAttribute("data-jsoneditor-".concat(i)) ? h = t.getAttribute("data-jsoneditor-".concat(i)) : (h = this.uuid++, t.setAttribute("data-jsoneditor-".concat(i), h)), this.__data[h] = c;
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
          for (var c = [], h = 0; h < this.watchlist[t].length; h++) this.watchlist[t][h] !== i && c.push(this.watchlist[t][h]);
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
          for (var h = c.sheet ? c.sheet : c.styleSheet, g = this.element.nodeName.toLowerCase(); h.cssRules.length > 0; ) h.deleteRule(0);
          Object.keys(i).forEach(function(x) {
            var S = t === "default" ? x : "".concat(g, '[data-theme="').concat(t, '"] ').concat(x);
            h.insertRule ? h.insertRule(S + " {" + decodeURIComponent(i[x]) + "}", 0) : h.addRule && h.addRule(S, decodeURIComponent(i[x]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, c) {
          var h = this.element.nodeName.toLowerCase(), g = "";
          Object.keys(i).forEach(function(D) {
            var U = t === "default" ? D : "".concat(h, '[data-theme="').concat(t, '"] ').concat(D);
            g += U + " {" + decodeURIComponent(i[D]) + `}
`;
          });
          var x, S = new CSSStyleSheet();
          S.replaceSync(g), c.adoptedStyleSheets = [].concat(function(D) {
            if (Array.isArray(D)) return ma(D);
          }(x = c.adoptedStyleSheets) || function(D) {
            if (typeof Symbol < "u" && D[Symbol.iterator] != null || D["@@iterator"] != null) return Array.from(D);
          }(x) || function(D, U) {
            if (D) {
              if (typeof D == "string") return ma(D, U);
              var G = Object.prototype.toString.call(D).slice(8, -1);
              return G === "Object" && D.constructor && (G = D.constructor.name), G === "Map" || G === "Set" ? Array.from(D) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? ma(D, U) : void 0;
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
        } }], n && zf(r.prototype, n), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, n, l, e;
      }();
      Er.defaults = wn, Er.AbstractEditor = z, Er.AbstractTheme = Or, Er.AbstractIconLib = xr, Object.assign(Er.defaults.themes, Hf), Object.assign(Er.defaults.editors, wo), Object.assign(Er.defaults.templates, Bp), Object.assign(Er.defaults.iconlibs, cf);
    })(), O;
  })());
})(_h);
var wh = _h.exports;
const Ta = /* @__PURE__ */ gb(wh), _b = ["placeholder", "readonly"], wb = ["onClick"], jb = ["title"], kb = ["onClick"], xb = ["title"], Ob = {
  key: 0,
  class: "ontocombo-empty p-1"
}, Cb = {
  __name: "ontocombo",
  props: {
    modelValue: String,
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(o, { expose: u, emit: p }) {
    const _ = o, b = p, O = /* @__PURE__ */ An(null), d = /* @__PURE__ */ An(!1), w = /* @__PURE__ */ An(""), a = /* @__PURE__ */ An(/* @__PURE__ */ new Set()), f = /* @__PURE__ */ An({}), y = qa(() => !_.options || _.options.length === 0 ? !1 : _.options.length <= 2 && !_.options.some((A) => A.children)), m = () => {
      if (O.value && d.value) {
        const A = O.value.getBoundingClientRect();
        f.value = {
          position: "fixed",
          top: `${A.bottom + 4}px`,
          left: `${A.left}px`,
          minWidth: `${A.width}px`,
          zIndex: 999999,
          backgroundColor: "#ffffff",
          border: "1px solid #ced4da",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
          maxHeight: "250px",
          overflowY: "auto"
        };
      }
    }, v = (A) => {
      const N = (B) => {
        for (const z of B) {
          if (!z.children && z.value === A) return z.label;
          if (z.children) {
            const V = N(z.children);
            if (V) return V;
          }
        }
        return null;
      };
      w.value = N(_.options) || A || "";
    };
    u({ updateFromExternal: v }), to(() => _.modelValue, (A) => {
      A !== w.value && v(A);
    }, { immediate: !0 }), to(d, (A) => {
      A && Fn(m);
    });
    const j = () => {
      b("update:modelValue", w.value);
    }, C = qa(() => {
      const A = y.value ? "" : w.value.toLowerCase(), N = (B, z = 0, V = !1) => {
        let Y = [];
        for (const J of B) {
          const Z = J.label.toLowerCase().includes(A), le = J.children ? k(J.children, A) : !1;
          if (!A || Z || le)
            if (J.children) {
              const oe = V || !!A || a.value.has(J.id);
              Y.push({ ...J, isGroup: !0, level: z, expanded: oe }), oe && Y.push(...N(J.children, z + 1, V));
            } else
              Y.push({ ...J, isGroup: !1, level: z });
        }
        return Y;
      };
      return N(_.options);
    }), k = (A, N) => {
      for (const B of A)
        if (B.label.toLowerCase().includes(N) || B.children && k(B.children, N)) return !0;
      return !1;
    }, E = () => {
      d.value = !0, Fn(m);
    }, P = () => {
      d.value = !d.value, d.value && Fn(m);
    }, T = () => {
      d.value = !1;
    }, I = (A) => {
      a.value.has(A) ? a.value.delete(A) : a.value.add(A), a.value = new Set(a.value);
    }, L = (A) => {
      w.value = A.label, b("update:modelValue", A.value), T();
    }, M = (A, N) => {
      const B = N ? "group" : "element";
      return A === 0 ? B : A === 1 ? `sub${B}` : A === 2 ? `subsub${B}` : `${B}-level-${A}`;
    }, H = (A) => {
      if (d.value && O.value) {
        const N = A.composedPath(), B = document.querySelector(".ontocombo-dropdown");
        !N.includes(O.value) && (!B || !N.includes(B)) && T();
      }
    };
    return sl(() => {
      document.addEventListener("click", H), document.addEventListener("mousedown", H), window.addEventListener("scroll", m, !0), window.addEventListener("resize", m);
    }), al(() => {
      document.removeEventListener("click", H), document.removeEventListener("mousedown", H), window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (A, N) => (Qt(), Pr("div", {
      class: "ontocombo",
      ref_key: "containerRef",
      ref: O
    }, [
      wt("div", {
        class: "ontocombo-header form-control p-0 d-flex align-items-stretch",
        onClick: Si(E, ["stop"])
      }, [
        By(wt("input", {
          type: "text",
          class: "ontocombo-input flex-grow-1 px-2 border-0 bg-transparent",
          "onUpdate:modelValue": N[0] || (N[0] = (B) => w.value = B),
          onFocus: E,
          onClick: Si(E, ["stop"]),
          onInput: j,
          onKeydown: [
            hu(T, ["tab"]),
            hu(T, ["esc"])
          ],
          placeholder: o.placeholder,
          readonly: y.value,
          style: Bn(y.value ? "cursor: pointer; outline: none !important; box-shadow: none !important; min-width: 0;" : "outline: none !important; box-shadow: none !important; min-width: 0;")
        }, null, 44, _b), [
          [hb, w.value]
        ]),
        wt("div", {
          class: "ontocombo-arrow d-flex align-items-center px-2 flex-shrink-0",
          onClick: Si(P, ["stop"]),
          style: { cursor: "pointer" }
        }, [
          wt("i", {
            class: Nn(["fas", d.value ? "fa-caret-down" : "fa-caret-right"])
          }, null, 2)
        ])
      ]),
      (Qt(), ph(qy, { to: "body" }, [
        d.value ? (Qt(), Pr("div", {
          key: 0,
          class: "ontocombo-dropdown",
          style: Bn(f.value),
          onClick: N[1] || (N[1] = Si(() => {
          }, ["stop"]))
        }, [
          (Qt(!0), Pr(Nt, null, rm(C.value, (B) => (Qt(), Pr(Nt, {
            key: B.id
          }, [
            B.isGroup ? (Qt(), Pr("div", {
              key: 0,
              class: Nn(["ontocombo-row is-group", M(B.level, !0)]),
              style: Bn({ display: "flex", cursor: "pointer", "align-items": "center", padding: `0 ${B.level * 16 + 8}px` }),
              onClick: Si((z) => I(B.id), ["stop"])
            }, [
              wt("span", {
                class: "row-label flex-grow-1 text-start",
                title: B.label
              }, Qi(B.label === "" ? " " : B.label), 9, jb),
              wt("i", {
                class: Nn(["fas row-toggle", B.expanded ? "fa-caret-down" : "fa-caret-right"])
              }, null, 2)
            ], 14, wb)) : (Qt(), Pr("div", {
              key: 1,
              class: Nn(["ontocombo-row is-element", M(B.level, !1)]),
              style: Bn({ cursor: "pointer", paddingLeft: `${B.level * 16 + 8}px` }),
              onClick: Si((z) => L(B), ["stop"])
            }, [
              wt("span", {
                class: "row-label flex-grow-1 text-start",
                title: B.label
              }, Qi(B.label === "" ? " " : B.label), 9, xb)
            ], 14, kb))
          ], 64))), 128)),
          C.value.length === 0 ? (Qt(), Pr("div", Ob, [
            N[2] || (N[2] = Wo(" Using custom value:", -1)),
            N[3] || (N[3] = wt("br", null, null, -1)),
            Wo(" " + Qi(w.value), 1)
          ])) : za("", !0)
        ], 4)) : za("", !0)
      ]))
    ], 512));
  }
};
function Eb(o, u) {
  o.defaults.editors.ontocombo = class extends o.defaults.editors.string {
    build() {
      var _;
      super.build(), this.input && (this.input.type = "hidden", this.input.style.setProperty("display", "none", "important")), this.vueContainer = document.createElement("div"), this.vueContainer.style.width = "100%", this.input.parentNode.insertBefore(this.vueContainer, this.input.nextSibling);
      const p = ((_ = this.schema.options) == null ? void 0 : _.ontology_data) || [];
      this.vueApp = u(Cb, {
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
  }, o.defaults.resolvers.unshift((p) => {
    if (p.type === "string" && p.format === "ontocombo")
      return "ontocombo";
  });
}
const Sb = {
  key: 0,
  class: "alert alert-danger mb-3"
}, Pb = {
  class: "json-editor-scroll-area d-flex flex-column h-100",
  "data-bs-theme": "light"
}, Tb = {
  __name: "filter",
  props: {
    model: Object
  },
  setup(o) {
    const u = o, p = /* @__PURE__ */ An(null), _ = /* @__PURE__ */ An("");
    let b = null, O = !1;
    const d = {
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
              default: `SELECT DISTINCT ?s ?p ?o WHERE {
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
          Advanced: { query: `SELECT DISTINCT ?s ?p ?o WHERE {
  ?s ?p ?o .
}` }
        }), Fn(() => {
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
      Fn(() => {
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
      await Fn();
      const v = p.value.getRootNode();
      w("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", v), w("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", v), w("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", document.head), w("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", document.head);
      try {
        const C = wh.JSONEditor || (Ta == null ? void 0 : Ta.JSONEditor) || window.JSONEditor;
        Eb(C, gh);
        const k = ((j = u.model) == null ? void 0 : j.get("schema")) || {}, E = k.entities || [], P = k.predicates || [], T = d.properties.Basic.items.properties;
        T.predicate.options.ontology_data = P, T.object.options.ontology_data = E;
        const I = d.properties.Simple.items.properties;
        I.subject.options.ontology_data = E, I.object.options.ontology_data = E, I.predicate.options.ontology_data = P, b = new C(p.value, {
          theme: "bootstrap5",
          iconlib: "fontawesome5",
          schema: d,
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
            let A = [], N = [];
            const B = (Z) => Z ? (Z = Z.trim(), /^https?:\/\//.test(Z) && !Z.startsWith("<") && !Z.startsWith('"') ? `<${Z}>` : Z) : "";
            L.Simple.forEach((Z, le) => {
              let oe = B(Z.subject) || "?s", ne = B(Z.predicate) || "?p", ye = B(Z.object) || "?o", ue = `${oe} ${ne} ${ye}`;
              if (le > 0) {
                let je = L.Simple[le - 1];
                je.modifier === "NOT" && (ue = `FILTER NOT EXISTS { ${ue} }`), je.logic === "OR" ? (N.length === 0 && N.push(A.pop()), N.push(ue)) : (N.length > 0 && (A.push(N.map((Ee) => `{ ${Ee} }`).join(" UNION ")), N = []), A.push(ue));
              } else
                A.push(ue);
            }), N.length > 0 && A.push(N.map((Z) => `{ ${Z} }`).join(" UNION "));
            let z = A.join(` .
  `), V = z.match(/\?[a-zA-Z0-9_]+/g);
            const J = `SELECT DISTINCT ${V ? Array.from(new Set(V)).join(" ") : "*"} WHERE {
  ${z} 
}`;
            if (L.Advanced || (L.Advanced = {}), L.Advanced.query !== J) {
              O = !0;
              const Z = b.getEditor("root.Advanced.query");
              Z && Z.setValue(J), L.Advanced.query = J, O = !1;
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
      _.value ? (Qt(), Pr("div", Sb, [
        j[0] || (j[0] = wt("strong", null, "Error:", -1)),
        Wo(" " + Qi(_.value), 1)
      ])) : za("", !0),
      wt("div", Pb, [
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
}, Lb = ".json-editor-scroll-area{max-height:calc(100vh - 88px);overflow-x:hidden;overflow-y:auto}.json-editor-scroll-area .card{border:none;background:transparent!important;margin:0!important;padding:0}.json-editor-scroll-area .card-header{border-radius:0;margin-bottom:10px}.json-editor-scroll-area .card-title{display:none!important}.json-editor-scroll-area .card-body{padding-top:0;padding-bottom:0}.json-editor-scroll-area .btn-group,.json-editor-scroll-area .je-object__controls{display:none}.json-editor-scroll-area .json-editor-btntype-add{background-color:#fff;border-color:var(--bs-success);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-success);margin-right:1rem}.json-editor-scroll-area .json-editor-btntype-add:active,.json-editor-scroll-area .json-editor-btntype-add:focus-visible,.json-editor-scroll-area .json-editor-btntype-add:hover{background-color:var(--bs-success);border-color:var(--bs-success);color:#fff}.json-editor-scroll-area .json-editor-btntype-deletelast{background-color:#fff;border-color:var(--bs-danger);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-danger)}.json-editor-scroll-area .json-editor-btntype-deletelast:active,.json-editor-scroll-area .json-editor-btntype-deletelast:focus-visible,.json-editor-scroll-area .json-editor-btntype-deletelast:hover{background-color:var(--bs-danger);border-color:var(--bs-danger);color:#fff}";
function Ab({ model: o, el: u }) {
  const p = document.createElement("style");
  p.innerHTML = Lb, u.append(p);
  const _ = document.createElement("div");
  _.setAttribute("id", "filter-vue-app"), u.append(_);
  const b = gh(Tb, { model: o });
  return b.mount(_), () => {
    b.unmount();
  };
}
export {
  Ab as render
};

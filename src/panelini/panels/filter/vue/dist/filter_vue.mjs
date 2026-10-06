/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Fa(l) {
  const c = /* @__PURE__ */ Object.create(null);
  for (const p of l.split(",")) c[p] = 1;
  return (p) => p in c;
}
const at = {}, Ln = [], br = () => {
}, rc = () => !1, Go = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // uppercase letter
(l.charCodeAt(2) > 122 || l.charCodeAt(2) < 97), Wo = (l) => l.startsWith("onUpdate:"), xt = Object.assign, Ma = (l, c) => {
  const p = l.indexOf(c);
  p > -1 && l.splice(p, 1);
}, Nf = Object.prototype.hasOwnProperty, et = (l, c) => Nf.call(l, c), Me = Array.isArray, sn = (l) => so(l) === "[object Map]", No = (l) => so(l) === "[object Set]", xu = (l) => so(l) === "[object Date]", qe = (l) => typeof l == "function", dt = (l) => typeof l == "string", vr = (l) => typeof l == "symbol", rt = (l) => l !== null && typeof l == "object", nc = (l) => (rt(l) || qe(l)) && qe(l.then) && qe(l.catch), ic = Object.prototype.toString, so = (l) => ic.call(l), Df = (l) => so(l).slice(8, -1), oc = (l) => so(l) === "[object Object]", Ha = (l) => dt(l) && l !== "NaN" && l[0] !== "-" && "" + parseInt(l, 10) === l, Wi = /* @__PURE__ */ Fa(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Jo = (l) => {
  const c = /* @__PURE__ */ Object.create(null);
  return (p) => c[p] || (c[p] = l(p));
}, Ff = /-\w/g, Qt = Jo(
  (l) => l.replace(Ff, (c) => c.slice(1).toUpperCase())
), Mf = /\B([A-Z])/g, Bn = Jo(
  (l) => l.replace(Mf, "-$1").toLowerCase()
), sc = Jo((l) => l.charAt(0).toUpperCase() + l.slice(1)), fa = Jo(
  (l) => l ? `on${sc(l)}` : ""
), mr = (l, c) => !Object.is(l, c), Ao = (l, ...c) => {
  for (let p = 0; p < l.length; p++)
    l[p](...c);
}, ac = (l, c, p, w = !1) => {
  Object.defineProperty(l, c, {
    configurable: !0,
    enumerable: !1,
    writable: w,
    value: p
  });
}, Va = (l) => {
  const c = parseFloat(l);
  return isNaN(c) ? l : c;
};
let Ou;
const Ko = () => Ou || (Ou = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xi(l) {
  if (Me(l)) {
    const c = {};
    for (let p = 0; p < l.length; p++) {
      const w = l[p], v = dt(w) ? qf(w) : Xi(w);
      if (v)
        for (const O in v)
          c[O] = v[O];
    }
    return c;
  } else if (dt(l) || rt(l))
    return l;
}
const Hf = /;(?![^(]*\))/g, Vf = /:([^]+)/, zf = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function qf(l) {
  const c = {};
  return l.replace(zf, (p) => p.startsWith("/*") ? "" : p).split(Hf).forEach((p) => {
    if (p) {
      const w = p.split(Vf);
      w.length > 1 && (c[w[0].trim()] = w[1].trim());
    }
  }), c;
}
function An(l) {
  let c = "";
  if (dt(l))
    c = l;
  else if (Me(l))
    for (let p = 0; p < l.length; p++) {
      const w = An(l[p]);
      w && (c += w + " ");
    }
  else if (rt(l))
    for (const p in l)
      l[p] && (c += p + " ");
  return c.trim();
}
const Uf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", $f = /* @__PURE__ */ Fa(Uf);
function lc(l) {
  return !!l || l === "";
}
function Gf(l, c, p) {
  if (l.length !== c.length) return !1;
  let w = !0;
  for (let v = 0; w && v < l.length; v++)
    w = Zo(l[v], c[v], p);
  return w;
}
function Cu(l, c, p) {
  if (l.size !== c.size) return !1;
  const w = Array.from(c), v = new Uint8Array(w.length);
  for (const O of l) {
    let h = -1;
    for (let g = 0; g < w.length; g++)
      if (!v[g] && Zo(O, w[g], p)) {
        h = g;
        break;
      }
    if (h < 0) return !1;
    v[h] = 1;
  }
  return !0;
}
function Wf(l, c, p) {
  let w = sn(l), v = sn(c);
  if (w || v || (w = No(l), v = No(c), w || v))
    return w && v ? Cu(l, c, p) : !1;
  const O = Object.keys(l).length, h = Object.keys(c).length;
  if (O !== h)
    return !1;
  for (const g in l) {
    const s = l.hasOwnProperty(g), f = c.hasOwnProperty(g);
    if (s && !f || !s && f || !Zo(l[g], c[g], p))
      return !1;
  }
  return String(l) === String(c);
}
function Eu(l, c, p, w) {
  p || (p = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [v, O] = p;
  if (v.has(l) || O.has(c))
    return v.get(l) === c && O.get(c) === l;
  v.set(l, c), O.set(c, l);
  const h = w(l, c, p);
  return v.delete(l), O.delete(c), h;
}
function Zo(l, c, p) {
  if (l === c) return !0;
  let w = xu(l), v = xu(c);
  return w || v ? w && v ? l.getTime() === c.getTime() : !1 : (w = vr(l), v = vr(c), w || v ? l === c : (w = Me(l), v = Me(c), w || v ? w && v ? Eu(l, c, p, Gf) : !1 : (w = rt(l), v = rt(c), w || v ? !w || !v ? !1 : Eu(l, c, p, Wf) : String(l) === String(c))));
}
const uc = (l) => !!(l && l.__v_isRef === !0), Do = (l) => dt(l) ? l : l == null ? "" : Me(l) || rt(l) && (l.toString === ic || !qe(l.toString)) ? uc(l) ? Do(l.value) : JSON.stringify(l, cc, 2) : String(l), cc = (l, c) => uc(c) ? cc(l, c.value) : sn(c) ? {
  [`Map(${c.size})`]: [...c.entries()].reduce(
    (p, [w, v], O) => (p[ya(w, O) + " =>"] = v, p),
    {}
  )
} : No(c) ? {
  [`Set(${c.size})`]: [...c.values()].map((p) => ya(p))
} : vr(c) ? ya(c) : rt(c) && !Me(c) && !oc(c) ? String(c) : c, ya = (l, c = "") => {
  var p;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    vr(l) ? `Symbol(${(p = l.description) != null ? p : c})` : l
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class Jf {
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
      let c, p;
      if (this.scopes) {
        const w = this.scopes.slice();
        for (c = 0, p = w.length; c < p; c++)
          w[c].pause();
      }
      for (c = 0, p = this.effects.length; c < p; c++)
        this.effects[c].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let c, p;
      if (this.scopes) {
        const v = this.scopes.slice();
        for (c = 0, p = v.length; c < p; c++)
          v[c].resume();
      }
      const w = this.effects.slice();
      for (c = 0, p = w.length; c < p; c++)
        w[c].resume();
    }
  }
  run(c) {
    if (this._active) {
      const p = gt;
      try {
        return gt = this, c();
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
      let p, w;
      for (p = 0, w = this.effects.length; p < w; p++)
        this.effects[p].stop();
      for (this.effects.length = 0, p = 0, w = this.cleanups.length; p < w; p++)
        this.cleanups[p]();
      if (this.cleanups.length = 0, this.scopes) {
        const v = this.scopes.slice();
        for (p = 0, w = v.length; p < w; p++)
          v[p].stop(!0);
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
function Kf() {
  return gt;
}
let lt;
const ma = /* @__PURE__ */ new WeakSet();
class dc {
  constructor(c) {
    this.fn = c, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, gt && (gt.active ? gt.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ma.has(this) && (ma.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || pc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Su(this), fc(this);
    const c = lt, p = Xt;
    lt = this, Xt = !0;
    try {
      return this.fn();
    } finally {
      yc(this), lt = c, Xt = p, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let c = this.deps; c; c = c.nextDep)
        Ua(c);
      this.deps = this.depsTail = void 0, Su(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ma.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ea(this) && this.run();
  }
  get dirty() {
    return Ea(this);
  }
}
let hc = 0, Ji, Ki;
function pc(l, c = !1) {
  if (l.flags |= 8, c) {
    l.next = Ki, Ki = l;
    return;
  }
  l.next = Ji, Ji = l;
}
function za() {
  hc++;
}
function qa() {
  if (--hc > 0)
    return;
  if (Ki) {
    let c = Ki;
    for (Ki = void 0; c; ) {
      const p = c.next;
      c.next = void 0, c.flags &= -9, c = p;
    }
  }
  let l;
  for (; Ji; ) {
    let c = Ji;
    for (Ji = void 0; c; ) {
      const p = c.next;
      if (c.next = void 0, c.flags &= -9, c.flags & 1)
        try {
          c.trigger();
        } catch (w) {
          l || (l = w);
        }
      c = p;
    }
  }
  if (l) throw l;
}
function fc(l) {
  for (let c = l.deps; c; c = c.nextDep)
    c.version = -1, c.prevActiveLink = c.dep.activeLink, c.dep.activeLink = c;
}
function yc(l) {
  let c, p = l.depsTail, w = p;
  for (; w; ) {
    const v = w.prevDep;
    w.version === -1 ? (w === p && (p = v), Ua(w), Zf(w)) : c = w, w.dep.activeLink = w.prevActiveLink, w.prevActiveLink = void 0, w = v;
  }
  l.deps = c, l.depsTail = p;
}
function Ea(l) {
  for (let c = l.deps; c; c = c.nextDep)
    if (c.dep.version !== c.version || c.dep.computed && (mc(c.dep.computed) || c.dep.version !== c.version))
      return !0;
  return !!l._dirty;
}
function mc(l) {
  if (l.flags & 4 && !(l.flags & 16) || (l.flags &= -17, l.globalVersion === eo) || (l.globalVersion = eo, !l.isSSR && l.flags & 128 && (!l.deps && !l._dirty || !Ea(l))))
    return;
  l.flags |= 2;
  const c = l.dep, p = lt, w = Xt;
  lt = l, Xt = !0;
  try {
    fc(l);
    const v = l.fn(l._value);
    (c.version === 0 || mr(v, l._value)) && (l.flags |= 128, l._value = v, c.version++);
  } catch (v) {
    throw c.version++, v;
  } finally {
    lt = p, Xt = w, yc(l), l.flags &= -3;
  }
}
function Ua(l, c = !1) {
  const { dep: p, prevSub: w, nextSub: v } = l;
  if (w && (w.nextSub = v, l.prevSub = void 0), v && (v.prevSub = w, l.nextSub = void 0), p.subs === l && (p.subs = w, !w && p.computed)) {
    p.computed.flags &= -5;
    for (let O = p.computed.deps; O; O = O.nextDep)
      Ua(O, !0);
  }
  !c && !--p.sc && p.map && p.map.delete(p.key);
}
function Zf(l) {
  const { prevDep: c, nextDep: p } = l;
  c && (c.nextDep = p, l.prevDep = void 0), p && (p.prevDep = c, l.nextDep = void 0);
}
let Xt = !0;
const bc = [];
function Ir() {
  bc.push(Xt), Xt = !1;
}
function Br() {
  const l = bc.pop();
  Xt = l === void 0 ? !0 : l;
}
function Su(l) {
  const { cleanup: c } = l;
  if (l.cleanup = void 0, c) {
    const p = lt;
    lt = void 0;
    try {
      c();
    } finally {
      lt = p;
    }
  }
}
let eo = 0;
class Yf {
  constructor(c, p) {
    this.sub = c, this.dep = p, this.version = p.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class $a {
  // TODO isolatedDeclarations "__v_skip"
  constructor(c) {
    this.computed = c, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(c) {
    if (!lt || !Xt || lt === this.computed)
      return;
    let p = this.activeLink;
    if (p === void 0 || p.sub !== lt)
      p = this.activeLink = new Yf(lt, this), lt.deps ? (p.prevDep = lt.depsTail, lt.depsTail.nextDep = p, lt.depsTail = p) : lt.deps = lt.depsTail = p, vc(p);
    else if (p.version === -1 && (p.version = this.version, p.nextDep)) {
      const w = p.nextDep;
      w.prevDep = p.prevDep, p.prevDep && (p.prevDep.nextDep = w), p.prevDep = lt.depsTail, p.nextDep = void 0, lt.depsTail.nextDep = p, lt.depsTail = p, lt.deps === p && (lt.deps = w);
    }
    return p;
  }
  trigger(c) {
    this.version++, eo++, this.notify(c);
  }
  notify(c) {
    za();
    try {
      for (let p = this.subs; p; p = p.prevSub)
        p.sub.notify() && p.sub.dep.notify();
    } finally {
      qa();
    }
  }
}
function vc(l) {
  if (l.dep.sc++, l.sub.flags & 4) {
    const c = l.dep.computed;
    if (c && !l.dep.subs) {
      c.flags |= 20;
      for (let w = c.deps; w; w = w.nextDep)
        vc(w);
    }
    const p = l.dep.subs;
    p !== l && (l.prevSub = p, p && (p.nextSub = l)), l.dep.subs = l;
  }
}
const Sa = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ Symbol(
  ""
), Pa = /* @__PURE__ */ Symbol(
  ""
), to = /* @__PURE__ */ Symbol(
  ""
);
function jt(l, c, p) {
  if (Xt && lt) {
    let w = Sa.get(l);
    w || Sa.set(l, w = /* @__PURE__ */ new Map());
    let v = w.get(p);
    v || (w.set(p, v = new $a()), v.map = w, v.key = p), v.track();
  }
}
function Lr(l, c, p, w, v, O) {
  const h = Sa.get(l);
  if (!h) {
    eo++;
    return;
  }
  const g = (s) => {
    s && s.trigger();
  };
  if (za(), c === "clear")
    h.forEach(g);
  else {
    const s = Me(l), f = s && Ha(p);
    if (s && p === "length") {
      const y = Number(w);
      h.forEach((m, _) => {
        (_ === "length" || _ === to || !vr(_) && _ >= y) && g(m);
      });
    } else
      switch ((p !== void 0 || h.has(void 0)) && g(h.get(p)), f && g(h.get(to)), c) {
        case "add":
          s ? f && g(h.get("length")) : (g(h.get(Rn)), sn(l) && g(h.get(Pa)));
          break;
        case "delete":
          s || (g(h.get(Rn)), sn(l) && g(h.get(Pa)));
          break;
        case "set":
          sn(l) && g(h.get(Rn));
          break;
      }
  }
  qa();
}
function ki(l) {
  const c = /* @__PURE__ */ Xe(l);
  return c === l || (jt(c, "iterate", to), /* @__PURE__ */ Ft(l)) ? c : /* @__PURE__ */ gr(l) ? /* @__PURE__ */ an(l) ? c.map((p) => ln(Mt(p))) : c.map(ln) : c.map(Mt);
}
function Yo(l) {
  return jt(l = /* @__PURE__ */ Xe(l), "iterate", to), l;
}
function fr(l, c) {
  return /* @__PURE__ */ gr(l) ? ln(/* @__PURE__ */ an(l) ? Mt(c) : c) : Mt(c);
}
const Qf = {
  __proto__: null,
  [Symbol.iterator]() {
    return ba(this, Symbol.iterator, (l) => fr(this, l));
  },
  concat(...l) {
    return ki(this).concat(
      ...l.map((c) => Me(c) ? ki(c) : c)
    );
  },
  entries() {
    return ba(this, "entries", (l) => (l[1] = fr(this, l[1]), l));
  },
  every(l, c) {
    return Er(this, "every", l, c, void 0, arguments);
  },
  filter(l, c) {
    return Er(
      this,
      "filter",
      l,
      c,
      (p) => p.map((w) => fr(this, w)),
      arguments
    );
  },
  find(l, c) {
    return Er(
      this,
      "find",
      l,
      c,
      (p) => fr(this, p),
      arguments
    );
  },
  findIndex(l, c) {
    return Er(this, "findIndex", l, c, void 0, arguments);
  },
  findLast(l, c) {
    return Er(
      this,
      "findLast",
      l,
      c,
      (p) => fr(this, p),
      arguments
    );
  },
  findLastIndex(l, c) {
    return Er(this, "findLastIndex", l, c, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(l, c) {
    return Er(this, "forEach", l, c, void 0, arguments);
  },
  includes(...l) {
    return va(this, "includes", l);
  },
  indexOf(...l) {
    return va(this, "indexOf", l);
  },
  join(l) {
    return ki(this).join(l);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...l) {
    return va(this, "lastIndexOf", l);
  },
  map(l, c) {
    return Er(this, "map", l, c, void 0, arguments);
  },
  pop() {
    return Vi(this, "pop");
  },
  push(...l) {
    return Vi(this, "push", l);
  },
  reduce(l, ...c) {
    return Pu(this, "reduce", l, c);
  },
  reduceRight(l, ...c) {
    return Pu(this, "reduceRight", l, c);
  },
  shift() {
    return Vi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(l, c) {
    return Er(this, "some", l, c, void 0, arguments);
  },
  splice(...l) {
    return Vi(this, "splice", l);
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
    return Vi(this, "unshift", l);
  },
  values() {
    return ba(this, "values", (l) => fr(this, l));
  }
};
function ba(l, c, p) {
  const w = Yo(l), v = w[c]();
  return w !== l && !/* @__PURE__ */ Ft(l) && (v._next = v.next, v.next = () => {
    const O = v._next();
    return O.done || (O.value = p(O.value)), O;
  }), v;
}
const Xf = Array.prototype;
function Er(l, c, p, w, v, O) {
  const h = Yo(l), g = h !== l && !/* @__PURE__ */ Ft(l), s = h[c];
  if (s !== Xf[c]) {
    const m = s.apply(l, O);
    return g ? Mt(m) : m;
  }
  let f = p;
  h !== l && (g ? f = function(m, _) {
    return p.call(this, fr(l, m), _, l);
  } : p.length > 2 && (f = function(m, _) {
    return p.call(this, m, _, l);
  }));
  const y = s.call(h, f, w);
  return g && v ? v(y) : y;
}
function Pu(l, c, p, w) {
  const v = Yo(l), O = v !== l && !/* @__PURE__ */ Ft(l);
  let h = p, g = !1;
  v !== l && (O ? (g = w.length === 0, h = function(f, y, m) {
    return g && (g = !1, f = fr(l, f)), p.call(this, f, fr(l, y), m, l);
  }) : p.length > 3 && (h = function(f, y, m) {
    return p.call(this, f, y, m, l);
  }));
  const s = v[c](h, ...w);
  return g ? fr(l, s) : s;
}
function va(l, c, p) {
  const w = /* @__PURE__ */ Xe(l);
  jt(w, "iterate", to);
  const v = w[c](...p);
  return (v === -1 || v === !1) && /* @__PURE__ */ Ka(p[0]) ? (p[0] = /* @__PURE__ */ Xe(p[0]), w[c](...p)) : v;
}
function Vi(l, c, p = []) {
  Ir(), za();
  const w = (/* @__PURE__ */ Xe(l))[c].apply(l, p);
  return qa(), Br(), w;
}
const ey = /* @__PURE__ */ Fa("__proto__,__v_isRef,__isVue"), gc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((l) => l !== "arguments" && l !== "caller").map((l) => Symbol[l]).filter(vr)
);
function ty(l) {
  vr(l) || (l = String(l));
  const c = /* @__PURE__ */ Xe(this);
  return jt(c, "has", l), c.hasOwnProperty(l);
}
class _c {
  constructor(c = !1, p = !1) {
    this._isReadonly = c, this._isShallow = p;
  }
  get(c, p, w) {
    if (p === "__v_skip") return c.__v_skip;
    const v = this._isReadonly, O = this._isShallow;
    if (p === "__v_isReactive")
      return !v;
    if (p === "__v_isReadonly")
      return v;
    if (p === "__v_isShallow")
      return O;
    if (p === "__v_raw")
      return w === (v ? O ? dy : xc : O ? kc : jc).get(c) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(c) === Object.getPrototypeOf(w) ? c : void 0;
    const h = Me(c);
    if (!v) {
      let s;
      if (h && (s = Qf[p]))
        return s;
      if (p === "hasOwnProperty")
        return ty;
    }
    const g = Reflect.get(
      c,
      p,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ kt(c) ? c : w
    );
    if ((vr(p) ? gc.has(p) : ey(p)) || (v || jt(c, "get", p), O))
      return g;
    if (/* @__PURE__ */ kt(g)) {
      const s = h && Ha(p) ? g : g.value;
      return v && rt(s) ? /* @__PURE__ */ La(s) : s;
    }
    return rt(g) ? v ? /* @__PURE__ */ La(g) : /* @__PURE__ */ Wa(g) : g;
  }
}
class wc extends _c {
  constructor(c = !1) {
    super(!1, c);
  }
  set(c, p, w, v) {
    let O = c[p];
    const h = Me(c) && Ha(p);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ gr(O);
      if (!/* @__PURE__ */ Ft(w) && !/* @__PURE__ */ gr(w) && (O = /* @__PURE__ */ Xe(O), w = /* @__PURE__ */ Xe(w)), !h && /* @__PURE__ */ kt(O) && !/* @__PURE__ */ kt(w))
        return f || (O.value = w), !0;
    }
    const g = h ? Number(p) < c.length : et(c, p), s = Reflect.set(
      c,
      p,
      w,
      /* @__PURE__ */ kt(c) ? c : v
    );
    return c === /* @__PURE__ */ Xe(v) && s && (g ? mr(w, O) && Lr(c, "set", p, w) : Lr(c, "add", p, w)), s;
  }
  deleteProperty(c, p) {
    const w = et(c, p);
    c[p];
    const v = Reflect.deleteProperty(c, p);
    return v && w && Lr(c, "delete", p, void 0), v;
  }
  has(c, p) {
    const w = Reflect.has(c, p);
    return (!vr(p) || !gc.has(p)) && jt(c, "has", p), w;
  }
  ownKeys(c) {
    return jt(
      c,
      "iterate",
      Me(c) ? "length" : Rn
    ), Reflect.ownKeys(c);
  }
}
class ry extends _c {
  constructor(c = !1) {
    super(!0, c);
  }
  set(c, p) {
    return !0;
  }
  deleteProperty(c, p) {
    return !0;
  }
}
const ny = /* @__PURE__ */ new wc(), iy = /* @__PURE__ */ new ry(), oy = /* @__PURE__ */ new wc(!0);
const Ta = (l) => l, Co = (l) => Reflect.getPrototypeOf(l);
function sy(l, c, p) {
  return function(...w) {
    const v = this.__v_raw, O = /* @__PURE__ */ Xe(v), h = sn(O), g = l === "entries" || l === Symbol.iterator && h, s = l === "keys" && h, f = v[l](...w), y = p ? Ta : c ? ln : Mt;
    return !c && jt(
      O,
      "iterate",
      s ? Pa : Rn
    ), xt(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: m, done: _ } = f.next();
          return _ ? { value: m, done: _ } : {
            value: g ? [y(m[0]), y(m[1])] : y(m),
            done: _
          };
        }
      }
    );
  };
}
function Eo(l) {
  return function(...c) {
    return l === "delete" ? !1 : l === "clear" ? void 0 : this;
  };
}
function ay(l, c) {
  const p = {
    get(v) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), g = /* @__PURE__ */ Xe(v);
      l || (mr(v, g) && jt(h, "get", v), jt(h, "get", g));
      const { has: s } = Co(h), f = c ? Ta : l ? ln : Mt;
      if (s.call(h, v))
        return f(O.get(v));
      if (s.call(h, g))
        return f(O.get(g));
      O !== h && O.get(v);
    },
    get size() {
      const v = this.__v_raw;
      return !l && jt(/* @__PURE__ */ Xe(v), "iterate", Rn), v.size;
    },
    has(v) {
      const O = this.__v_raw, h = /* @__PURE__ */ Xe(O), g = /* @__PURE__ */ Xe(v);
      return l || (mr(v, g) && jt(h, "has", v), jt(h, "has", g)), v === g ? O.has(v) : O.has(v) || O.has(g);
    },
    forEach(v, O) {
      const h = this, g = h.__v_raw, s = /* @__PURE__ */ Xe(g), f = c ? Ta : l ? ln : Mt;
      return !l && jt(s, "iterate", Rn), g.forEach((y, m) => v.call(O, f(y), f(m), h));
    }
  };
  return xt(
    p,
    l ? {
      add: Eo("add"),
      set: Eo("set"),
      delete: Eo("delete"),
      clear: Eo("clear")
    } : {
      add(v) {
        const O = /* @__PURE__ */ Xe(this), h = Co(O), g = /* @__PURE__ */ Xe(v), s = !c && !/* @__PURE__ */ Ft(v) && !/* @__PURE__ */ gr(v) ? g : v;
        return h.has.call(O, s) || mr(v, s) && h.has.call(O, v) || mr(g, s) && h.has.call(O, g) || (O.add(s), Lr(O, "add", s, s)), this;
      },
      set(v, O) {
        !c && !/* @__PURE__ */ Ft(O) && !/* @__PURE__ */ gr(O) && (O = /* @__PURE__ */ Xe(O));
        const h = /* @__PURE__ */ Xe(this), { has: g, get: s } = Co(h);
        let f = g.call(h, v);
        f || (v = /* @__PURE__ */ Xe(v), f = g.call(h, v));
        const y = s.call(h, v);
        return h.set(v, O), f ? mr(O, y) && Lr(h, "set", v, O) : Lr(h, "add", v, O), this;
      },
      delete(v) {
        const O = /* @__PURE__ */ Xe(this), { has: h, get: g } = Co(O);
        let s = h.call(O, v);
        s || (v = /* @__PURE__ */ Xe(v), s = h.call(O, v)), g && g.call(O, v);
        const f = O.delete(v);
        return s && Lr(O, "delete", v, void 0), f;
      },
      clear() {
        const v = /* @__PURE__ */ Xe(this), O = v.size !== 0, h = v.clear();
        return O && Lr(
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
    p[v] = sy(v, l, c);
  }), p;
}
function Ga(l, c) {
  const p = ay(l, c);
  return (w, v, O) => v === "__v_isReactive" ? !l : v === "__v_isReadonly" ? l : v === "__v_raw" ? w : Reflect.get(
    et(p, v) && v in w ? p : w,
    v,
    O
  );
}
const ly = {
  get: /* @__PURE__ */ Ga(!1, !1)
}, uy = {
  get: /* @__PURE__ */ Ga(!1, !0)
}, cy = {
  get: /* @__PURE__ */ Ga(!0, !1)
};
const jc = /* @__PURE__ */ new WeakMap(), kc = /* @__PURE__ */ new WeakMap(), xc = /* @__PURE__ */ new WeakMap(), dy = /* @__PURE__ */ new WeakMap();
function hy(l) {
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
function Wa(l) {
  return /* @__PURE__ */ gr(l) ? l : Ja(
    l,
    !1,
    ny,
    ly,
    jc
  );
}
// @__NO_SIDE_EFFECTS__
function py(l) {
  return Ja(
    l,
    !1,
    oy,
    uy,
    kc
  );
}
// @__NO_SIDE_EFFECTS__
function La(l) {
  return Ja(
    l,
    !0,
    iy,
    cy,
    xc
  );
}
function Ja(l, c, p, w, v) {
  if (!rt(l) || l.__v_raw && !(c && l.__v_isReactive) || l.__v_skip || !Object.isExtensible(l))
    return l;
  const O = v.get(l);
  if (O)
    return O;
  const h = hy(Df(l));
  if (h === 0)
    return l;
  const g = new Proxy(
    l,
    h === 2 ? w : p
  );
  return v.set(l, g), g;
}
// @__NO_SIDE_EFFECTS__
function an(l) {
  return /* @__PURE__ */ gr(l) ? /* @__PURE__ */ an(l.__v_raw) : !!(l && l.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function gr(l) {
  return !!(l && l.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ft(l) {
  return !!(l && l.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ka(l) {
  return l ? !!l.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Xe(l) {
  const c = l && l.__v_raw;
  return c ? /* @__PURE__ */ Xe(c) : l;
}
function fy(l) {
  return !et(l, "__v_skip") && Object.isExtensible(l) && ac(l, "__v_skip", !0), l;
}
const Mt = (l) => rt(l) ? /* @__PURE__ */ Wa(l) : l, ln = (l) => rt(l) ? /* @__PURE__ */ La(l) : l;
// @__NO_SIDE_EFFECTS__
function kt(l) {
  return l ? l.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Tn(l) {
  return yy(l, !1);
}
function yy(l, c) {
  return /* @__PURE__ */ kt(l) ? l : new my(l, c);
}
class my {
  constructor(c, p) {
    this.dep = new $a(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = p ? c : /* @__PURE__ */ Xe(c), this._value = p ? c : Mt(c), this.__v_isShallow = p;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(c) {
    const p = this._rawValue, w = this.__v_isShallow || /* @__PURE__ */ Ft(c) || /* @__PURE__ */ gr(c);
    c = w ? c : /* @__PURE__ */ Xe(c), mr(c, p) && (this._rawValue = c, this._value = w ? c : Mt(c), this.dep.trigger());
  }
}
function by(l) {
  return /* @__PURE__ */ kt(l) ? l.value : l;
}
const vy = {
  get: (l, c, p) => c === "__v_raw" ? l : by(Reflect.get(l, c, p)),
  set: (l, c, p, w) => {
    const v = l[c];
    return /* @__PURE__ */ kt(v) && !/* @__PURE__ */ kt(p) ? (v.value = p, !0) : Reflect.set(l, c, p, w);
  }
};
function Oc(l) {
  return /* @__PURE__ */ an(l) ? l : new Proxy(l, vy);
}
class gy {
  constructor(c, p, w) {
    this.fn = c, this.setter = p, this._value = void 0, this.dep = new $a(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = eo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !p, this.isSSR = w;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    lt !== this)
      return pc(this, !0), !0;
  }
  get value() {
    const c = this.dep.track();
    return mc(this), c && (c.version = this.dep.version), this._value;
  }
  set value(c) {
    this.setter && this.setter(c);
  }
}
// @__NO_SIDE_EFFECTS__
function _y(l, c, p = !1) {
  let w, v;
  return qe(l) ? w = l : (w = l.get, v = l.set), new gy(w, v, p);
}
const So = {}, Fo = /* @__PURE__ */ new WeakMap();
let Pn;
function wy(l, c = !1, p = Pn) {
  if (p) {
    let w = Fo.get(p);
    w || Fo.set(p, w = []), w.push(l);
  }
}
function jy(l, c, p = at) {
  const { immediate: w, deep: v, once: O, scheduler: h, augmentJob: g, call: s } = p, f = (A) => v ? A : /* @__PURE__ */ Ft(A) || v === !1 || v === 0 ? Ar(A, 1) : Ar(A);
  let y, m, _, j, C = !1, k = !1;
  if (/* @__PURE__ */ kt(l) ? (m = () => l.value, C = /* @__PURE__ */ Ft(l)) : /* @__PURE__ */ an(l) ? (m = () => f(l), C = !0) : Me(l) ? (k = !0, C = l.some((A) => /* @__PURE__ */ an(A) || /* @__PURE__ */ Ft(A)), m = () => l.map((A) => {
    if (/* @__PURE__ */ kt(A))
      return A.value;
    if (/* @__PURE__ */ an(A))
      return f(A);
    if (qe(A))
      return s ? s(A, 2) : A();
  })) : qe(l) ? c ? m = s ? () => s(l, 2) : l : m = () => {
    if (_) {
      Ir();
      try {
        _();
      } finally {
        Br();
      }
    }
    const A = Pn;
    Pn = y;
    try {
      return s ? s(l, 3, [j]) : l(j);
    } finally {
      Pn = A;
    }
  } : m = br, c && v) {
    const A = m, N = v === !0 ? 1 / 0 : v;
    m = () => Ar(A(), N);
  }
  const E = Kf(), S = () => {
    y.stop(), E && E.active && Ma(E.effects, y);
  };
  if (O && c) {
    const A = c;
    c = (...N) => {
      const D = A(...N);
      return S(), D;
    };
  }
  let L = k ? new Array(l.length).fill(So) : So;
  const T = (A) => {
    if (!(!(y.flags & 1) || !y.dirty && !A))
      if (c) {
        const N = y.run();
        if (A || v || C || (k ? N.some((D, F) => mr(D, L[F])) : mr(N, L))) {
          _ && _();
          const D = Pn;
          Pn = y;
          try {
            const F = [
              N,
              // pass undefined as the old value when it's changed for the first time
              L === So ? void 0 : k && L[0] === So ? [] : L,
              j
            ];
            L = N, s ? s(c, 3, F) : (
              // @ts-expect-error
              c(...F)
            );
          } finally {
            Pn = D;
          }
        }
      } else
        y.run();
  };
  return g && g(T), y = new dc(m), y.scheduler = h ? () => h(T, !1) : T, j = (A) => wy(A, !1, y), _ = y.onStop = () => {
    const A = Fo.get(y);
    if (A) {
      if (s)
        s(A, 4);
      else
        for (const N of A) N();
      Fo.delete(y);
    }
  }, c ? w ? T(!0) : L = y.run() : h ? h(T.bind(null, !0), !0) : y.run(), S.pause = y.pause.bind(y), S.resume = y.resume.bind(y), S.stop = S, S;
}
function Ar(l, c = 1 / 0, p) {
  if (c <= 0 || !rt(l) || l.__v_skip || (p = p || /* @__PURE__ */ new Map(), (p.get(l) || 0) >= c))
    return l;
  if (p.set(l, c), c--, /* @__PURE__ */ kt(l))
    Ar(l.value, c, p);
  else if (Me(l))
    for (let w = 0; w < l.length; w++)
      Ar(l[w], c, p);
  else if (No(l) || sn(l))
    l.forEach((w) => {
      Ar(w, c, p);
    });
  else if (oc(l)) {
    for (const w in l)
      Ar(l[w], c, p);
    for (const w of Object.getOwnPropertySymbols(l))
      Object.prototype.propertyIsEnumerable.call(l, w) && Ar(l[w], c, p);
  }
  return l;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ao(l, c, p, w) {
  try {
    return w ? l(...w) : l();
  } catch (v) {
    Qo(v, c, p);
  }
}
function er(l, c, p, w) {
  if (qe(l)) {
    const v = ao(l, c, p, w);
    return v && nc(v) && v.catch((O) => {
      Qo(O, c, p);
    }), v;
  }
  if (Me(l)) {
    const v = [];
    for (let O = 0; O < l.length; O++)
      v.push(er(l[O], c, p, w));
    return v;
  }
}
function Qo(l, c, p, w = !0) {
  const v = c ? c.vnode : null, { errorHandler: O, throwUnhandledErrorInProduction: h } = c && c.appContext.config || at;
  if (c) {
    let g = c.parent;
    const s = c.proxy, f = `https://vuejs.org/error-reference/#runtime-${p}`;
    for (; g; ) {
      const y = g.ec;
      if (y) {
        for (let m = 0; m < y.length; m++)
          if (y[m](l, s, f) === !1)
            return;
      }
      g = g.parent;
    }
    if (O) {
      Ir(), ao(O, null, 10, [
        l,
        s,
        f
      ]), Br();
      return;
    }
  }
  ky(l, p, v, w, h);
}
function ky(l, c, p, w = !0, v = !1) {
  if (v)
    throw l;
  console.error(l);
}
const Pt = [];
let pr = -1;
const Ci = [];
let nn = null, xi = 0;
const Cc = /* @__PURE__ */ Promise.resolve();
let Mo = null;
function Aa(l) {
  const c = Mo || Cc;
  return l ? c.then(this ? l.bind(this) : l) : c;
}
function xy(l) {
  let c = pr + 1, p = Pt.length;
  for (; c < p; ) {
    const w = c + p >>> 1, v = Pt[w], O = ro(v);
    O < l || O === l && v.flags & 2 ? c = w + 1 : p = w;
  }
  return c;
}
function Za(l) {
  if (!(l.flags & 1)) {
    const c = ro(l), p = Pt[Pt.length - 1];
    !p || // fast path when the job id is larger than the tail
    !(l.flags & 2) && c >= ro(p) ? Pt.push(l) : Pt.splice(xy(c), 0, l), l.flags |= 1, Ec();
  }
}
function Ec() {
  Mo || (Mo = Cc.then(Pc));
}
function Oy(l) {
  if (!Me(l))
    nn && l.id === -1 ? nn.splice(xi + 1, 0, l) : l.flags & 1 || (Ci.push(l), l.flags |= 1);
  else
    for (let c = 0; c < l.length; c++)
      Ci.push(l[c]);
  Ec();
}
function Tu(l, c, p = pr + 1) {
  for (; p < Pt.length; p++) {
    const w = Pt[p];
    if (w && w.flags & 2) {
      if (l && w.id !== l.uid)
        continue;
      Pt.splice(p, 1), p--, w.flags & 4 && (w.flags &= -2), w(), w.flags & 4 || (w.flags &= -2);
    }
  }
}
function Sc(l) {
  if (Ci.length) {
    const c = [...new Set(Ci)].sort(
      (p, w) => ro(p) - ro(w)
    );
    if (Ci.length = 0, nn) {
      for (let p = 0; p < c.length; p++)
        nn.push(c[p]);
      return;
    }
    for (nn = c, xi = 0; xi < nn.length; xi++) {
      const p = nn[xi];
      p.flags & 4 && (p.flags &= -2), p.flags & 8 || p(), p.flags &= -2;
    }
    nn = null, xi = 0;
  }
}
const ro = (l) => l.id == null ? l.flags & 2 ? -1 : 1 / 0 : l.id;
function Pc(l) {
  try {
    for (pr = 0; pr < Pt.length; pr++) {
      const c = Pt[pr];
      c && !(c.flags & 8) && (c.flags & 4 && (c.flags &= -2), ao(
        c,
        c.i,
        c.i ? 15 : 14
      ), c.flags & 4 || (c.flags &= -2));
    }
  } finally {
    for (; pr < Pt.length; pr++) {
      const c = Pt[pr];
      c && (c.flags &= -2);
    }
    pr = -1, Pt.length = 0, Sc(), Mo = null, (Pt.length || Ci.length) && Pc();
  }
}
let Dt = null, Tc = null;
function Ho(l) {
  const c = Dt;
  return Dt = l, Tc = l && l.type.__scopeId || null, c;
}
function Cy(l, c = Dt, p) {
  if (!c || l._n)
    return l;
  const w = (...v) => {
    w._d && zu(-1);
    const O = Ho(c), h = In.length;
    let g;
    try {
      g = l(...v);
    } finally {
      for (let s = In.length; s > h; s--) ed();
      Ho(O), w._d && zu(1);
    }
    return g;
  };
  return w._n = !0, w._c = !0, w._d = !0, w;
}
function Lu(l, c) {
  if (Dt === null)
    return l;
  const p = ns(Dt), w = l.dirs || (l.dirs = []);
  for (let v = 0; v < c.length; v++) {
    let [O, h, g, s = at] = c[v];
    O && (qe(O) && (O = {
      mounted: O,
      updated: O
    }), O.deep && Ar(h), w.push({
      dir: O,
      instance: p,
      value: h,
      oldValue: void 0,
      arg: g,
      modifiers: s
    }));
  }
  return l;
}
function En(l, c, p, w) {
  const v = l.dirs, O = c && c.dirs;
  for (let h = 0; h < v.length; h++) {
    const g = v[h];
    O && (g.oldValue = O[h].value);
    let s = g.dir[w];
    s && (Ir(), er(s, p, 8, [
      l.el,
      g,
      l,
      c
    ]), Br());
  }
}
function Ey(l, c) {
  if (Tt) {
    let p = Tt.provides;
    const w = Tt.parent && Tt.parent.provides;
    w === p && (p = Tt.provides = Object.create(w)), p[l] = c;
  }
}
function Ro(l, c, p = !1) {
  const w = xm();
  if (w || Ei) {
    let v = Ei ? Ei._context.provides : w ? w.parent == null || w.ce ? w.vnode.appContext && w.vnode.appContext.provides : w.parent.provides : void 0;
    if (v && l in v)
      return v[l];
    if (arguments.length > 1)
      return p && qe(c) ? c.call(w && w.proxy) : c;
  }
}
const Sy = /* @__PURE__ */ Symbol.for("v-scx"), Py = () => Ro(Sy);
function Io(l, c, p) {
  return Lc(l, c, p);
}
function Lc(l, c, p = at) {
  const { immediate: w, deep: v, flush: O, once: h } = p, g = xt({}, p), s = c && w || !c && O !== "post";
  let f;
  if (oo) {
    if (O === "sync") {
      const j = Py();
      f = j.__watcherHandles || (j.__watcherHandles = []);
    } else if (!s) {
      const j = () => {
      };
      return j.stop = br, j.resume = br, j.pause = br, j;
    }
  }
  const y = Tt;
  g.call = (j, C, k) => er(j, y, C, k);
  let m = !1;
  O === "post" ? g.scheduler = (j) => {
    Lt(j, y && y.suspense);
  } : O !== "sync" && (m = !0, g.scheduler = (j, C) => {
    C ? j() : Za(j);
  }), g.augmentJob = (j) => {
    c && (j.flags |= 4), m && (j.flags |= 2, y && (j.id = y.uid, j.i = y));
  };
  const _ = jy(l, c, g);
  return oo && (f ? f.push(_) : s && _()), _;
}
function Ty(l, c, p) {
  const w = this.proxy, v = dt(l) ? l.includes(".") ? Ac(w, l) : () => w[l] : l.bind(w, w);
  let O;
  qe(c) ? O = c : (O = c.handler, p = c);
  const h = lo(this), g = Lc(v, O.bind(w), p);
  return h(), g;
}
function Ac(l, c) {
  const p = c.split(".");
  return () => {
    let w = l;
    for (let v = 0; v < p.length && w; v++)
      w = w[p[v]];
    return w;
  };
}
const Ly = /* @__PURE__ */ Symbol("_vte"), Xo = (l) => l.__isTeleport, ga = /* @__PURE__ */ Symbol("_leaveCb");
function Ay(l) {
  let c = l[0];
  if (l.length > 1) {
    for (const p of l)
      if (p.type !== Nr) {
        c = p;
        break;
      }
  }
  return c;
}
function Rc(l) {
  if (!Qa(l))
    return Xo(l.type) && l.children ? Ay(l.children) : l;
  if (l.component)
    return l.component.subTree;
  const { shapeFlag: c, children: p } = l;
  if (p) {
    if (c & 16)
      return p[0];
    if (c & 32 && qe(p.default))
      return p.default();
  }
}
function Ya(l, c) {
  if (l.shapeFlag & 6 && l.component) {
    l.transition = c;
    const p = l.component.subTree;
    Ya(
      Xo(p.type) && Rc(p) || p,
      c
    );
  } else l.shapeFlag & 128 ? (l.ssContent.transition = c.clone(l.ssContent), l.ssFallback.transition = c.clone(l.ssFallback)) : l.transition = c;
}
function Ic(l) {
  l.ids = [l.ids[0] + l.ids[2]++ + "-", 0, 0];
}
function Au(l, c) {
  let p;
  return !!((p = Object.getOwnPropertyDescriptor(l, c)) && !p.configurable);
}
const Vo = /* @__PURE__ */ new WeakMap();
function Zi(l, c, p, w, v = !1) {
  if (Me(l)) {
    l.forEach(
      (k, E) => Zi(
        k,
        c && (Me(c) ? c[E] : c),
        p,
        w,
        v
      )
    );
    return;
  }
  if (Yi(w) && !v) {
    w.shapeFlag & 512 && w.type.__asyncResolved && w.component.subTree.component && Zi(l, c, p, w.component.subTree);
    return;
  }
  const O = w.shapeFlag & 4 ? ns(w.component) : w.el, h = v ? null : O, { i: g, r: s } = l, f = c && c.r, y = g.refs === at ? g.refs = {} : g.refs, m = g.setupState, _ = /* @__PURE__ */ Xe(m), j = m === at ? rc : (k) => Au(y, k) ? !1 : et(_, k), C = (k, E) => !(E && Au(y, E));
  if (f != null && f !== s) {
    if (Ru(c), dt(f))
      y[f] = null, j(f) && (m[f] = null);
    else if (/* @__PURE__ */ kt(f)) {
      const k = c;
      C(f, k.k) && (f.value = null), k.k && (y[k.k] = null);
    }
  }
  if (qe(s))
    ao(s, g, 12, [h, y]);
  else {
    const k = dt(s), E = /* @__PURE__ */ kt(s);
    if (k || E) {
      const S = () => {
        if (l.f) {
          const L = k ? j(s) ? m[s] : y[s] : C() || !l.k ? s.value : y[l.k];
          if (v)
            Me(L) && Ma(L, O);
          else if (Me(L))
            L.includes(O) || L.push(O);
          else if (k)
            y[s] = [O], j(s) && (m[s] = y[s]);
          else {
            const T = [O];
            C(s, l.k) && (s.value = T), l.k && (y[l.k] = T);
          }
        } else k ? (y[s] = h, j(s) && (m[s] = h)) : E && (C(s, l.k) && (s.value = h), l.k && (y[l.k] = h));
      };
      if (h) {
        const L = () => {
          S(), Vo.delete(l);
        };
        L.id = -1, Vo.set(l, L), Lt(L, p);
      } else
        Ru(l), S();
    }
  }
}
function Ru(l) {
  const c = Vo.get(l);
  c && (c.flags |= 8, Vo.delete(l));
}
Ko().requestIdleCallback;
Ko().cancelIdleCallback;
const Yi = (l) => !!l.type.__asyncLoader, Qa = (l) => l.type.__isKeepAlive;
function Ry(l, c) {
  Bc(l, "a", c);
}
function Iy(l, c) {
  Bc(l, "da", c);
}
function Bc(l, c, p = Tt) {
  const w = l.__wdc || (l.__wdc = () => {
    let v = p;
    for (; v; ) {
      if (v.isDeactivated)
        return;
      v = v.parent;
    }
    return l();
  });
  if (es(c, w, p), p) {
    let v = p.parent;
    for (; v && v.parent; )
      Qa(v.parent.vnode) && By(w, c, p, v), v = v.parent;
  }
}
function By(l, c, p, w) {
  const v = es(
    c,
    l,
    w,
    !0
    /* prepend */
  );
  Nc(() => {
    Ma(w[c], v);
  }, p);
}
function es(l, c, p = Tt, w = !1) {
  if (p) {
    const v = p[l] || (p[l] = []), O = c.__weh || (c.__weh = (...h) => {
      Ir();
      const g = lo(p), s = er(c, p, l, h);
      return g(), Br(), s;
    });
    return w ? v.unshift(O) : v.push(O), O;
  }
}
const Dr = (l) => (c, p = Tt) => {
  (!oo || l === "sp") && es(l, (...w) => c(...w), p);
}, Ny = Dr("bm"), Xa = Dr("m"), Dy = Dr(
  "bu"
), Fy = Dr("u"), el = Dr(
  "bum"
), Nc = Dr("um"), My = Dr(
  "sp"
), Hy = Dr("rtg"), Vy = Dr("rtc");
function zy(l, c = Tt) {
  es("ec", l, c);
}
const qy = /* @__PURE__ */ Symbol.for("v-ndc");
function Uy(l, c, p, w) {
  let v;
  const O = p, h = Me(l);
  if (h || dt(l)) {
    const g = h && /* @__PURE__ */ an(l);
    let s = !1, f = !1;
    g && (s = !/* @__PURE__ */ Ft(l), f = /* @__PURE__ */ gr(l), l = Yo(l)), v = new Array(l.length);
    for (let y = 0, m = l.length; y < m; y++)
      v[y] = c(
        s ? f ? ln(Mt(l[y])) : Mt(l[y]) : l[y],
        y,
        void 0,
        O
      );
  } else if (typeof l == "number") {
    v = new Array(l);
    for (let g = 0; g < l; g++)
      v[g] = c(g + 1, g, void 0, O);
  } else if (rt(l))
    if (l[Symbol.iterator])
      v = Array.from(
        l,
        (g, s) => c(g, s, void 0, O)
      );
    else {
      const g = Object.keys(l);
      v = new Array(g.length);
      for (let s = 0, f = g.length; s < f; s++) {
        const y = g[s];
        v[s] = c(l[y], y, s, O);
      }
    }
  else
    v = [];
  return v;
}
const Ra = (l) => l ? sd(l) ? ns(l) : Ra(l.parent) : null, Qi = (
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
    $parent: (l) => Ra(l.parent),
    $root: (l) => Ra(l.root),
    $host: (l) => l.ce,
    $emit: (l) => l.emit,
    $options: (l) => Fc(l),
    $forceUpdate: (l) => l.f || (l.f = () => {
      Za(l.update);
    }),
    $nextTick: (l) => l.n || (l.n = Aa.bind(l.proxy)),
    $watch: (l) => Ty.bind(l)
  })
), _a = (l, c) => l !== at && !l.__isScriptSetup && et(l, c), $y = {
  get({ _: l }, c) {
    if (c === "__v_skip")
      return !0;
    const { ctx: p, setupState: w, data: v, props: O, accessCache: h, type: g, appContext: s } = l;
    if (c[0] !== "$") {
      const _ = h[c];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return w[c];
          case 2:
            return v[c];
          case 4:
            return p[c];
          case 3:
            return O[c];
        }
      else {
        if (_a(w, c))
          return h[c] = 1, w[c];
        if (v !== at && et(v, c))
          return h[c] = 2, v[c];
        if (et(O, c))
          return h[c] = 3, O[c];
        if (p !== at && et(p, c))
          return h[c] = 4, p[c];
        Ia && (h[c] = 0);
      }
    }
    const f = Qi[c];
    let y, m;
    if (f)
      return c === "$attrs" && jt(l.attrs, "get", ""), f(l);
    if (
      // css module (injected by vue-loader)
      (y = g.__cssModules) && (y = y[c])
    )
      return y;
    if (p !== at && et(p, c))
      return h[c] = 4, p[c];
    if (
      // global properties
      m = s.config.globalProperties, et(m, c)
    )
      return m[c];
  },
  set({ _: l }, c, p) {
    const { data: w, setupState: v, ctx: O } = l;
    return _a(v, c) ? (v[c] = p, !0) : w !== at && et(w, c) ? (w[c] = p, !0) : et(l.props, c) || c[0] === "$" && c.slice(1) in l ? !1 : (O[c] = p, !0);
  },
  has({
    _: { data: l, setupState: c, accessCache: p, ctx: w, appContext: v, props: O, type: h }
  }, g) {
    let s;
    return !!(p[g] || l !== at && g[0] !== "$" && et(l, g) || _a(c, g) || et(O, g) || et(w, g) || et(Qi, g) || et(v.config.globalProperties, g) || (s = h.__cssModules) && s[g]);
  },
  defineProperty(l, c, p) {
    return p.get != null ? l._.accessCache[c] = 0 : et(p, "value") && this.set(l, c, p.value, null), Reflect.defineProperty(l, c, p);
  }
};
function Iu(l) {
  return Me(l) ? l.reduce(
    (c, p) => (c[p] = null, c),
    {}
  ) : l;
}
let Ia = !0;
function Gy(l) {
  const c = Fc(l), p = l.proxy, w = l.ctx;
  Ia = !1, c.beforeCreate && Bu(c.beforeCreate, l, "bc");
  const {
    // state
    data: v,
    computed: O,
    methods: h,
    watch: g,
    provide: s,
    inject: f,
    // lifecycle
    created: y,
    beforeMount: m,
    mounted: _,
    beforeUpdate: j,
    updated: C,
    activated: k,
    deactivated: E,
    beforeDestroy: S,
    beforeUnmount: L,
    destroyed: T,
    unmounted: A,
    render: N,
    renderTracked: D,
    renderTriggered: F,
    errorCaptured: M,
    serverPrefetch: H,
    // public API
    expose: z,
    inheritAttrs: V,
    // assets
    components: K,
    directives: Z,
    filters: re
  } = c;
  if (f && Wy(f, w, null), h)
    for (const ne in h) {
      const me = h[ne];
      qe(me) && (w[ne] = me.bind(p));
    }
  if (v) {
    const ne = v.call(p, p);
    rt(ne) && (l.data = /* @__PURE__ */ Wa(ne));
  }
  if (Ia = !0, O)
    for (const ne in O) {
      const me = O[ne], fe = qe(me) ? me.bind(p, p) : qe(me.get) ? me.get.bind(p, p) : br, ke = !qe(me) && qe(me.set) ? me.set.bind(p) : br, Ee = ld({
        get: fe,
        set: ke
      });
      Object.defineProperty(w, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (Se) => Ee.value = Se
      });
    }
  if (g)
    for (const ne in g)
      Dc(g[ne], w, p, ne);
  if (s) {
    const ne = qe(s) ? s.call(p) : s;
    Reflect.ownKeys(ne).forEach((me) => {
      Ey(me, ne[me]);
    });
  }
  y && Bu(y, l, "c");
  function oe(ne, me) {
    Me(me) ? me.forEach((fe) => ne(fe.bind(p))) : me && ne(me.bind(p));
  }
  if (oe(Ny, m), oe(Xa, _), oe(Dy, j), oe(Fy, C), oe(Ry, k), oe(Iy, E), oe(zy, M), oe(Vy, D), oe(Hy, F), oe(el, L), oe(Nc, A), oe(My, H), Me(z))
    if (z.length) {
      const ne = l.exposed || (l.exposed = {});
      z.forEach((me) => {
        Object.defineProperty(ne, me, {
          get: () => p[me],
          set: (fe) => p[me] = fe,
          enumerable: !0
        });
      });
    } else l.exposed || (l.exposed = {});
  N && l.render === br && (l.render = N), V != null && (l.inheritAttrs = V), K && (l.components = K), Z && (l.directives = Z), H && Ic(l);
}
function Wy(l, c, p = br) {
  Me(l) && (l = Ba(l));
  for (const w in l) {
    const v = l[w];
    let O;
    rt(v) ? "default" in v ? O = Ro(
      v.from || w,
      v.default,
      !0
    ) : O = Ro(v.from || w) : O = Ro(v), /* @__PURE__ */ kt(O) ? Object.defineProperty(c, w, {
      enumerable: !0,
      configurable: !0,
      get: () => O.value,
      set: (h) => O.value = h
    }) : c[w] = O;
  }
}
function Bu(l, c, p) {
  er(
    Me(l) ? l.map((w) => w.bind(c.proxy)) : l.bind(c.proxy),
    c,
    p
  );
}
function Dc(l, c, p, w) {
  let v = w.includes(".") ? Ac(p, w) : () => p[w];
  if (dt(l)) {
    const O = c[l];
    qe(O) && Io(v, O);
  } else if (qe(l))
    Io(v, l.bind(p));
  else if (rt(l))
    if (Me(l))
      l.forEach((O) => Dc(O, c, p, w));
    else {
      const O = qe(l.handler) ? l.handler.bind(p) : c[l.handler];
      qe(O) && Io(v, O, l);
    }
}
function Fc(l) {
  const c = l.type, { mixins: p, extends: w } = c, {
    mixins: v,
    optionsCache: O,
    config: { optionMergeStrategies: h }
  } = l.appContext, g = O.get(c);
  let s;
  return g ? s = g : !v.length && !p && !w ? s = c : (s = {}, v.length && v.forEach(
    (f) => zo(s, f, h, !0)
  ), zo(s, c, h)), rt(c) && O.set(c, s), s;
}
function zo(l, c, p, w = !1) {
  const { mixins: v, extends: O } = c;
  O && zo(l, O, p, !0), v && v.forEach(
    (h) => zo(l, h, p, !0)
  );
  for (const h in c)
    if (!(w && h === "expose")) {
      const g = Jy[h] || p && p[h];
      l[h] = g ? g(l[h], c[h]) : c[h];
    }
  return l;
}
const Jy = {
  data: Nu,
  props: Du,
  emits: Du,
  // objects
  methods: $i,
  computed: $i,
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
  components: $i,
  directives: $i,
  // watch
  watch: Zy,
  // provide / inject
  provide: Nu,
  inject: Ky
};
function Nu(l, c) {
  return c ? l ? function() {
    return xt(
      qe(l) ? l.call(this, this) : l,
      qe(c) ? c.call(this, this) : c
    );
  } : c : l;
}
function Ky(l, c) {
  return $i(Ba(l), Ba(c));
}
function Ba(l) {
  if (Me(l)) {
    const c = {};
    for (let p = 0; p < l.length; p++)
      c[l[p]] = l[p];
    return c;
  }
  return l;
}
function St(l, c) {
  return l ? [...new Set([].concat(l, c))] : c;
}
function $i(l, c) {
  return l ? xt(/* @__PURE__ */ Object.create(null), l, c) : c;
}
function Du(l, c) {
  return l ? Me(l) && Me(c) ? [.../* @__PURE__ */ new Set([...l, ...c])] : xt(
    /* @__PURE__ */ Object.create(null),
    Iu(l),
    Iu(c ?? {})
  ) : c;
}
function Zy(l, c) {
  if (!l) return c;
  if (!c) return l;
  const p = xt(/* @__PURE__ */ Object.create(null), l);
  for (const w in c)
    p[w] = St(l[w], c[w]);
  return p;
}
function Mc() {
  return {
    app: null,
    config: {
      isNativeTag: rc,
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
let Yy = 0;
function Qy(l, c) {
  return function(w, v = null) {
    qe(w) || (w = xt({}, w)), v != null && !rt(v) && (v = null);
    const O = Mc(), h = /* @__PURE__ */ new WeakSet(), g = [];
    let s = !1;
    const f = O.app = {
      _uid: Yy++,
      _component: w,
      _props: v,
      _container: null,
      _context: O,
      _instance: null,
      version: Tm,
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
      mount(y, m, _) {
        if (!s) {
          const j = f._ceVNode || Rr(w, v);
          return j.appContext = O, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), l(j, y, _), s = !0, f._container = y, y.__vue_app__ = f, ns(j.component);
        }
      },
      onUnmount(y) {
        g.push(y);
      },
      unmount() {
        s && (er(
          g,
          f._instance,
          16
        ), l(null, f._container), delete f._container.__vue_app__);
      },
      provide(y, m) {
        return O.provides[y] = m, f;
      },
      runWithContext(y) {
        const m = Ei;
        Ei = f;
        try {
          return y();
        } finally {
          Ei = m;
        }
      }
    };
    return f;
  };
}
let Ei = null;
const Xy = (l, c) => c === "modelValue" || c === "model-value" ? l.modelModifiers : l[`${c}Modifiers`] || l[`${Qt(c)}Modifiers`] || l[`${Bn(c)}Modifiers`];
function em(l, c, ...p) {
  if (l.isUnmounted) return;
  const w = l.vnode.props || at;
  let v = p;
  const O = c.startsWith("update:"), h = O && Xy(w, c.slice(7));
  h && (h.trim && (v = p.map((y) => dt(y) ? y.trim() : y)), h.number && (v = v.map(Va)));
  let g, s = w[g = fa(c)] || // also try camelCase event handler (#2249)
  w[g = fa(Qt(c))];
  !s && O && (s = w[g = fa(Bn(c))]), s && er(
    s,
    l,
    6,
    v
  );
  const f = w[g + "Once"];
  if (f) {
    if (!l.emitted)
      l.emitted = {};
    else if (l.emitted[g])
      return;
    l.emitted[g] = !0, er(
      f,
      l,
      6,
      v
    );
  }
}
const tm = /* @__PURE__ */ new WeakMap();
function Hc(l, c, p = !1) {
  const w = p ? tm : c.emitsCache, v = w.get(l);
  if (v !== void 0)
    return v;
  const O = l.emits;
  let h = {}, g = !1;
  if (!qe(l)) {
    const s = (f) => {
      const y = Hc(f, c, !0);
      y && (g = !0, xt(h, y));
    };
    !p && c.mixins.length && c.mixins.forEach(s), l.extends && s(l.extends), l.mixins && l.mixins.forEach(s);
  }
  return !O && !g ? (rt(l) && w.set(l, null), null) : (Me(O) ? O.forEach((s) => h[s] = null) : xt(h, O), rt(l) && w.set(l, h), h);
}
function ts(l, c) {
  return !l || !Go(c) ? !1 : (c = c.slice(2), c = c === "Once" ? c : c.replace(/Once$/, ""), et(l, c[0].toLowerCase() + c.slice(1)) || et(l, Bn(c)) || et(l, c));
}
function Fu(l) {
  const {
    type: c,
    vnode: p,
    proxy: w,
    withProxy: v,
    propsOptions: [O],
    slots: h,
    attrs: g,
    emit: s,
    render: f,
    renderCache: y,
    props: m,
    data: _,
    setupState: j,
    ctx: C,
    inheritAttrs: k
  } = l, E = Ho(l);
  let S, L;
  try {
    if (p.shapeFlag & 4) {
      const A = v || w, N = A;
      S = yr(
        f.call(
          N,
          A,
          y,
          m,
          j,
          _,
          C
        )
      ), L = g;
    } else {
      const A = c;
      S = yr(
        A.length > 1 ? A(
          m,
          { attrs: g, slots: h, emit: s }
        ) : A(
          m,
          null
        )
      ), L = c.props ? g : rm(g);
    }
  } catch (A) {
    In.length = 0, Qo(A, l, 1), S = Rr(Nr);
  }
  let T = S;
  if (L && k !== !1) {
    const A = Object.keys(L), { shapeFlag: N } = T;
    A.length && N & 7 && (O && A.some(Wo) && (L = nm(
      L,
      O
    )), T = Si(T, L, !1, !0));
  }
  if (p.dirs && (T = Si(T, null, !1, !0), T.dirs = T.dirs ? T.dirs.concat(p.dirs) : p.dirs), p.transition) {
    const A = Xo(T.type) && Rc(T) || T;
    Ya(A, p.transition);
  }
  return S = T, Ho(E), S;
}
const rm = (l) => {
  let c;
  for (const p in l)
    (p === "class" || p === "style" || Go(p)) && ((c || (c = {}))[p] = l[p]);
  return c;
}, nm = (l, c) => {
  const p = {};
  for (const w in l)
    (!Wo(w) || !(w.slice(9) in c)) && (p[w] = l[w]);
  return p;
};
function im(l, c, p) {
  const { props: w, children: v, component: O } = l, { props: h, children: g, patchFlag: s } = c, f = O.emitsOptions;
  if (c.dirs || c.transition)
    return !0;
  if (p && s >= 0) {
    if (s & 1024)
      return !0;
    if (s & 16)
      return w ? Mu(w, h, f) : !!h;
    if (s & 8) {
      const y = c.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        const _ = y[m];
        if (Vc(h, w, _) && !ts(f, _))
          return !0;
      }
    }
  } else
    return (v || g) && (!g || !g.$stable) ? !0 : w === h ? !1 : w ? h ? Mu(w, h, f) : !0 : !!h;
  return !1;
}
function Mu(l, c, p) {
  const w = Object.keys(c);
  if (w.length !== Object.keys(l).length)
    return !0;
  for (let v = 0; v < w.length; v++) {
    const O = w[v];
    if (Vc(c, l, O) && !ts(p, O))
      return !0;
  }
  return !1;
}
function Vc(l, c, p) {
  const w = l[p], v = c[p];
  return p === "style" && rt(w) && rt(v) ? !Zo(w, v) : w !== v;
}
function om({ vnode: l, parent: c, suspense: p }, w) {
  for (; c; ) {
    const v = c.subTree;
    if (v.suspense && v.suspense.activeBranch === l && (v.suspense.vnode.el = v.el = w, l = v), v === l)
      (l = c.vnode).el = w, c = c.parent;
    else
      break;
  }
  p && p.activeBranch === l && (p.vnode.el = w);
}
const zc = {}, qc = () => Object.create(zc), Uc = (l) => Object.getPrototypeOf(l) === zc;
function sm(l, c, p, w = !1) {
  const v = {}, O = qc();
  l.propsDefaults = /* @__PURE__ */ Object.create(null), $c(l, c, v, O);
  for (const h in l.propsOptions[0])
    h in v || (v[h] = void 0);
  p ? l.props = w ? v : /* @__PURE__ */ py(v) : l.type.props ? l.props = v : l.props = O, l.attrs = O;
}
function am(l, c, p, w) {
  const {
    props: v,
    attrs: O,
    vnode: { patchFlag: h }
  } = l, g = /* @__PURE__ */ Xe(v), [s] = l.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (w || h > 0) && !(h & 16)
  ) {
    if (h & 8) {
      const y = l.vnode.dynamicProps;
      for (let m = 0; m < y.length; m++) {
        let _ = y[m];
        if (ts(l.emitsOptions, _))
          continue;
        const j = c[_];
        if (s)
          if (et(O, _))
            j !== O[_] && (O[_] = j, f = !0);
          else {
            const C = Qt(_);
            v[C] = Na(
              s,
              g,
              C,
              j,
              l,
              !1
            );
          }
        else
          j !== O[_] && (O[_] = j, f = !0);
      }
    }
  } else {
    $c(l, c, v, O) && (f = !0);
    let y;
    for (const m in g)
      (!c || // for camelCase
      !et(c, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = Bn(m)) === m || !et(c, y))) && (s ? p && // for camelCase
      (p[m] !== void 0 || // for kebab-case
      p[y] !== void 0) && (v[m] = Na(
        s,
        g,
        m,
        void 0,
        l,
        !0
      )) : delete v[m]);
    if (O !== g)
      for (const m in O)
        (!c || !et(c, m)) && (delete O[m], f = !0);
  }
  f && Lr(l.attrs, "set", "");
}
function $c(l, c, p, w) {
  const [v, O] = l.propsOptions;
  let h = !1, g;
  if (c)
    for (let s in c) {
      if (Wi(s))
        continue;
      const f = c[s];
      let y;
      v && et(v, y = Qt(s)) ? !O || !O.includes(y) ? p[y] = f : (g || (g = {}))[y] = f : ts(l.emitsOptions, s) || (!(s in w) || f !== w[s]) && (w[s] = f, h = !0);
    }
  if (O) {
    const s = /* @__PURE__ */ Xe(p), f = g || at;
    for (let y = 0; y < O.length; y++) {
      const m = O[y];
      p[m] = Na(
        v,
        s,
        m,
        f[m],
        l,
        !et(f, m)
      );
    }
  }
  return h;
}
function Na(l, c, p, w, v, O) {
  const h = l[p];
  if (h != null) {
    const g = et(h, "default");
    if (g && w === void 0) {
      const s = h.default;
      if (h.type !== Function && !h.skipFactory && qe(s)) {
        const { propsDefaults: f } = v;
        if (p in f)
          w = f[p];
        else {
          const y = lo(v);
          w = f[p] = s.call(
            null,
            c
          ), y();
        }
      } else
        w = s;
      v.ce && v.ce._setProp(p, w);
    }
    h[
      0
      /* shouldCast */
    ] && (O && !g ? w = !1 : h[
      1
      /* shouldCastTrue */
    ] && (w === "" || w === Bn(p)) && (w = !0));
  }
  return w;
}
const lm = /* @__PURE__ */ new WeakMap();
function Gc(l, c, p = !1) {
  const w = p ? lm : c.propsCache, v = w.get(l);
  if (v)
    return v;
  const O = l.props, h = {}, g = [];
  let s = !1;
  if (!qe(l)) {
    const y = (m) => {
      s = !0;
      const [_, j] = Gc(m, c, !0);
      xt(h, _), j && g.push(...j);
    };
    !p && c.mixins.length && c.mixins.forEach(y), l.extends && y(l.extends), l.mixins && l.mixins.forEach(y);
  }
  if (!O && !s)
    return rt(l) && w.set(l, Ln), Ln;
  if (Me(O))
    for (let y = 0; y < O.length; y++) {
      const m = Qt(O[y]);
      Hu(m) && (h[m] = at);
    }
  else if (O)
    for (const y in O) {
      const m = Qt(y);
      if (Hu(m)) {
        const _ = O[y], j = h[m] = Me(_) || qe(_) ? { type: _ } : xt({}, _), C = j.type;
        let k = !1, E = !0;
        if (Me(C))
          for (let S = 0; S < C.length; ++S) {
            const L = C[S], T = qe(L) && L.name;
            if (T === "Boolean") {
              k = !0;
              break;
            } else T === "String" && (E = !1);
          }
        else
          k = qe(C) && C.name === "Boolean";
        j[
          0
          /* shouldCast */
        ] = k, j[
          1
          /* shouldCastTrue */
        ] = E, (k || et(j, "default")) && g.push(m);
      }
    }
  const f = [h, g];
  return rt(l) && w.set(l, f), f;
}
function Hu(l) {
  return l[0] !== "$" && !Wi(l);
}
const tl = (l) => l === "_" || l === "_ctx" || l === "$stable", rl = (l) => Me(l) ? l.map(yr) : [yr(l)], um = (l, c, p) => {
  if (c._n)
    return c;
  const w = Cy((...v) => rl(c(...v)), p);
  return w._c = !1, w;
}, Wc = (l, c, p) => {
  const w = l._ctx;
  for (const v in l) {
    if (tl(v)) continue;
    const O = l[v];
    if (qe(O))
      c[v] = um(v, O, w);
    else if (O != null) {
      const h = rl(O);
      c[v] = () => h;
    }
  }
}, Jc = (l, c) => {
  const p = rl(c);
  l.slots.default = () => p;
}, Kc = (l, c, p) => {
  for (const w in c)
    (p || !tl(w)) && (l[w] = c[w]);
}, cm = (l, c, p) => {
  const w = l.slots = qc();
  if (l.vnode.shapeFlag & 32) {
    const v = c._;
    v ? (Kc(w, c, p), p && ac(w, "_", v, !0)) : Wc(c, w);
  } else c && Jc(l, c);
}, dm = (l, c, p) => {
  const { vnode: w, slots: v } = l;
  let O = !0, h = at;
  if (w.shapeFlag & 32) {
    const g = c._;
    g ? p && g === 1 ? O = !1 : Kc(v, c, p) : (O = !c.$stable, Wc(c, v)), h = c;
  } else c && (Jc(l, c), h = { default: 1 });
  if (O)
    for (const g in v)
      !tl(g) && h[g] == null && delete v[g];
}, Lt = mm;
function hm(l) {
  return pm(l);
}
function pm(l, c) {
  const p = Ko();
  p.__VUE__ = !0;
  const {
    insert: w,
    remove: v,
    patchProp: O,
    createElement: h,
    createText: g,
    createComment: s,
    setText: f,
    setElementText: y,
    parentNode: m,
    nextSibling: _,
    setScopeId: j = br,
    insertStaticContent: C
  } = l, k = (R, B, W, Y = null, Q = null, X = null, de = void 0, he = null, le = !!B.dynamicChildren) => {
    if (R === B)
      return;
    R && !zi(R, B) && (Y = Ye(R), Se(R, Q, X, !0), R = null), B.patchFlag === -2 && (le = !1, B.dynamicChildren = null), B.dynamicChildren && R && R.dynamicChildren && R.dynamicChildren.hasOnce && (B.dynamicChildren === Ln && (B.dynamicChildren = []), B.dynamicChildren.hasOnce = !0);
    const { type: ie, ref: je, shapeFlag: be } = B;
    switch (ie) {
      case rs:
        E(R, B, W, Y);
        break;
      case Nr:
        S(R, B, W, Y);
        break;
      case ja:
        R == null && L(B, W, Y, de);
        break;
      case Nt:
        K(
          R,
          B,
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
        be & 1 ? N(
          R,
          B,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le
        ) : be & 6 ? Z(
          R,
          B,
          W,
          Y,
          Q,
          X,
          de,
          he,
          le
        ) : (be & 64 || be & 128) && ie.process(
          R,
          B,
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
    je != null && Q ? Zi(je, R && R.ref, X, B || R, !B) : je == null && R && R.ref != null && Zi(R.ref, null, X, R, !0);
  }, E = (R, B, W, Y) => {
    if (R == null)
      w(
        B.el = g(B.children),
        W,
        Y
      );
    else {
      const Q = B.el = R.el;
      B.children !== R.children && f(Q, B.children);
    }
  }, S = (R, B, W, Y) => {
    R == null ? w(
      B.el = s(B.children || ""),
      W,
      Y
    ) : B.el = R.el;
  }, L = (R, B, W, Y) => {
    [R.el, R.anchor] = C(
      R.children,
      B,
      W,
      Y,
      R.el,
      R.anchor
    );
  }, T = ({ el: R, anchor: B }, W, Y) => {
    let Q;
    for (; R && R !== B; )
      Q = _(R), w(R, W, Y), R = Q;
    w(B, W, Y);
  }, A = ({ el: R, anchor: B }) => {
    let W;
    for (; R && R !== B; )
      W = _(R), v(R), R = W;
    v(B);
  }, N = (R, B, W, Y, Q, X, de, he, le) => {
    if (B.type === "svg" ? de = "svg" : B.type === "math" && (de = "mathml"), R == null)
      D(
        B,
        W,
        Y,
        Q,
        X,
        de,
        he,
        le
      );
    else {
      const ie = R.el && R.el._isVueCE ? R.el : null;
      try {
        ie && ie._beginPatch(), H(
          R,
          B,
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
  }, D = (R, B, W, Y, Q, X, de, he) => {
    let le, ie;
    const { props: je, shapeFlag: be, transition: Ce, dirs: te } = R;
    if (le = R.el = h(
      R.type,
      X,
      je && je.is,
      je
    ), be & 8 ? y(le, R.children) : be & 16 && M(
      R.children,
      le,
      null,
      Y,
      Q,
      wa(R, X),
      de,
      he
    ), te && En(R, null, Y, "created"), F(le, R, R.scopeId, de, Y), je) {
      for (const ce in je)
        ce !== "value" && !Wi(ce) && O(le, ce, null, je[ce], X, Y);
      "value" in je && O(le, "value", null, je.value, X), (ie = je.onVnodeBeforeMount) && hr(ie, Y, R);
    }
    te && En(R, null, Y, "beforeMount");
    const ae = fm(Q, Ce);
    ae && Ce.beforeEnter(le), w(le, B, W), ((ie = je && je.onVnodeMounted) || ae || te) && Lt(() => {
      try {
        ie && hr(ie, Y, R), ae && Ce.enter(le), te && En(R, null, Y, "mounted");
      } finally {
      }
    }, Q);
  }, F = (R, B, W, Y, Q) => {
    if (W && j(R, W), Y)
      for (let X = 0; X < Y.length; X++)
        j(R, Y[X]);
    if (Q) {
      let X = Q.subTree;
      if (B === X || Xc(X.type) && (X.ssContent === B || X.ssFallback === B)) {
        const de = Q.vnode;
        F(
          R,
          de,
          de.scopeId,
          de.slotScopeIds,
          Q.parent
        );
      }
    }
  }, M = (R, B, W, Y, Q, X, de, he, le = 0) => {
    for (let ie = le; ie < R.length; ie++) {
      const je = R[ie] = he ? Tr(R[ie]) : yr(R[ie]);
      k(
        null,
        je,
        B,
        W,
        Y,
        Q,
        X,
        de,
        he
      );
    }
  }, H = (R, B, W, Y, Q, X, de) => {
    const he = B.el = R.el;
    let { patchFlag: le, dynamicChildren: ie, dirs: je } = B;
    le |= R.patchFlag & 16;
    const be = R.props || at, Ce = B.props || at;
    let te;
    if (W && Sn(W, !1), (te = Ce.onVnodeBeforeUpdate) && hr(te, W, B, R), je && En(B, R, W, "beforeUpdate"), W && Sn(W, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    ie && (!R.dynamicChildren || R.dynamicChildren.length !== ie.length) && (le = 0, de = !1, ie = null), (be.innerHTML && Ce.innerHTML == null || be.textContent && Ce.textContent == null) && y(he, ""), ie ? z(
      R.dynamicChildren,
      ie,
      he,
      W,
      Y,
      wa(B, Q),
      X
    ) : de || me(
      R,
      B,
      he,
      null,
      W,
      Y,
      wa(B, Q),
      X,
      !1
    ), le > 0) {
      if (le & 16)
        V(he, be, Ce, W, Q);
      else if (le & 2 && be.class !== Ce.class && O(he, "class", null, Ce.class, Q), le & 4 && O(he, "style", be.style, Ce.style, Q), le & 8) {
        const ae = B.dynamicProps;
        for (let ce = 0; ce < ae.length; ce++) {
          const Oe = ae[ce], Ae = be[Oe], ze = Ce[Oe];
          (ze !== Ae || Oe === "value") && O(he, Oe, Ae, ze, Q, W);
        }
      }
      le & 1 && R.children !== B.children && y(he, B.children);
    } else !de && ie == null && V(he, be, Ce, W, Q);
    ((te = Ce.onVnodeUpdated) || je) && Lt(() => {
      te && hr(te, W, B, R), je && En(B, R, W, "updated");
    }, Y);
  }, z = (R, B, W, Y, Q, X, de) => {
    for (let he = 0; he < B.length; he++) {
      const le = R[he], ie = B[he], je = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === Nt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zi(le, ie) || // - In the case of a component, it could contain anything.
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
        X,
        de,
        !0
      );
    }
  }, V = (R, B, W, Y, Q) => {
    if (B !== W) {
      if (B !== at)
        for (const X in B)
          !Wi(X) && !(X in W) && O(
            R,
            X,
            B[X],
            null,
            Q,
            Y
          );
      for (const X in W) {
        if (Wi(X)) continue;
        const de = W[X], he = B[X];
        de !== he && X !== "value" && O(R, X, he, de, Q, Y);
      }
      "value" in W && O(R, "value", B.value, W.value, Q);
    }
  }, K = (R, B, W, Y, Q, X, de, he, le) => {
    const ie = B.el = R ? R.el : g(""), je = B.anchor = R ? R.anchor : g("");
    let { patchFlag: be, dynamicChildren: Ce, slotScopeIds: te } = B;
    te && (he = he ? he.concat(te) : te), R == null ? (w(ie, W, Y), w(je, W, Y), M(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      B.children || [],
      W,
      je,
      Q,
      X,
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
      X,
      de,
      he
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (B.key != null || Q && B === Q.subTree) && Zc(
      R,
      B,
      !0
      /* shallow */
    )) : me(
      R,
      B,
      W,
      je,
      Q,
      X,
      de,
      he,
      le
    );
  }, Z = (R, B, W, Y, Q, X, de, he, le) => {
    B.slotScopeIds = he, R == null ? B.shapeFlag & 512 ? Q.ctx.activate(
      B,
      W,
      Y,
      de,
      le
    ) : re(
      B,
      W,
      Y,
      Q,
      X,
      de,
      le
    ) : ue(R, B, le);
  }, re = (R, B, W, Y, Q, X, de) => {
    const he = R.component = km(
      R,
      Y,
      Q
    );
    if (Qa(R) && (he.ctx.renderer = Te), Om(he, !1, de), he.asyncDep) {
      if (Q && Q.registerDep(he, oe, de), !R.el) {
        const le = he.subTree = Rr(Nr);
        S(null, le, B, W), R.placeholder = le.el;
      }
    } else
      oe(
        he,
        R,
        B,
        W,
        Q,
        X,
        de
      );
  }, ue = (R, B, W) => {
    const Y = B.component = R.component;
    if (im(R, B, W))
      if (Y.asyncDep && !Y.asyncResolved) {
        B.el = R.el, ne(Y, B, W);
        return;
      } else
        Y.next = B, Y.update();
    else
      B.el = R.el, Y.vnode = B;
  }, oe = (R, B, W, Y, Q, X, de) => {
    const he = () => {
      if (R.isMounted) {
        let { next: be, bu: Ce, u: te, parent: ae, vnode: ce } = R;
        {
          const ct = Yc(R);
          if (ct) {
            be && (be.el = ce.el, ne(R, be, de)), ct.asyncDep.then(() => {
              Lt(() => {
                R.isUnmounted || ie();
              }, Q);
            });
            return;
          }
        }
        let Oe = be, Ae;
        Sn(R, !1), be ? (be.el = ce.el, ne(R, be, de)) : be = ce, Ce && Ao(Ce), (Ae = be.props && be.props.onVnodeBeforeUpdate) && hr(Ae, ae, be, ce), Sn(R, !0);
        const ze = Fu(R), nt = R.subTree;
        R.subTree = ze, k(
          nt,
          ze,
          // parent may have changed if it's in a teleport
          m(nt.el),
          // anchor may have changed if it's in a fragment
          Ye(nt),
          R,
          Q,
          X
        ), be.el = ze.el, Oe === null && om(R, ze.el), te && Lt(te, Q), (Ae = be.props && be.props.onVnodeUpdated) && Lt(
          () => hr(Ae, ae, be, ce),
          Q
        );
      } else {
        let be;
        const { el: Ce, props: te } = B, { bm: ae, m: ce, parent: Oe, root: Ae, type: ze } = R, nt = Yi(B);
        Sn(R, !1), ae && Ao(ae), !nt && (be = te && te.onVnodeBeforeMount) && hr(be, Oe, B), Sn(R, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(
            ze,
            R.parent ? R.parent.type : void 0
          );
          const ct = R.subTree = Fu(R);
          k(
            null,
            ct,
            W,
            Y,
            R,
            Q,
            X
          ), B.el = ct.el;
        }
        if (ce && Lt(ce, Q), !nt && (be = te && te.onVnodeMounted)) {
          const ct = B;
          Lt(
            () => hr(be, Oe, ct),
            Q
          );
        }
        (B.shapeFlag & 256 || Oe && Yi(Oe.vnode) && Oe.vnode.shapeFlag & 256) && R.a && Lt(R.a, Q), R.isMounted = !0, B = W = Y = null;
      }
    };
    R.scope.on();
    const le = R.effect = new dc(he);
    R.scope.off();
    const ie = R.update = le.run.bind(le), je = R.job = le.runIfDirty.bind(le);
    je.i = R, je.id = R.uid, le.scheduler = () => Za(je), Sn(R, !0), ie();
  }, ne = (R, B, W) => {
    B.component = R;
    const Y = R.vnode.props;
    R.vnode = B, R.next = null, am(R, B.props, Y, W), dm(R, B.children, W), Ir(), Tu(R), Br();
  }, me = (R, B, W, Y, Q, X, de, he, le = !1) => {
    const ie = R && R.children, je = R ? R.shapeFlag : 0, be = B.children, { patchFlag: Ce, shapeFlag: te } = B;
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
    ) : Fe(ie, Q, X, !0) : (je & 8 && y(W, ""), te & 16 && M(
      be,
      W,
      Y,
      Q,
      X,
      de,
      he,
      le
    ));
  }, fe = (R, B, W, Y, Q, X, de, he, le) => {
    R = R || Ln, B = B || Ln;
    const ie = R.length, je = B.length, be = Math.min(ie, je);
    let Ce;
    for (Ce = 0; Ce < be; Ce++) {
      const te = B[Ce] = le ? Tr(B[Ce]) : yr(B[Ce]);
      k(
        R[Ce],
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
      R,
      Q,
      X,
      !0,
      !1,
      be
    ) : M(
      B,
      W,
      Y,
      Q,
      X,
      de,
      he,
      le,
      be
    );
  }, ke = (R, B, W, Y, Q, X, de, he, le) => {
    let ie = 0;
    const je = B.length;
    let be = R.length - 1, Ce = je - 1;
    for (; ie <= be && ie <= Ce; ) {
      const te = R[ie], ae = B[ie] = le ? Tr(B[ie]) : yr(B[ie]);
      if (zi(te, ae))
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
      const te = R[be], ae = B[Ce] = le ? Tr(B[Ce]) : yr(B[Ce]);
      if (zi(te, ae))
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
        const te = Ce + 1, ae = te < je ? B[te].el : Y;
        for (; ie <= Ce; )
          k(
            null,
            B[ie] = le ? Tr(B[ie]) : yr(B[ie]),
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
        Se(R[ie], Q, X, !0), ie++;
    else {
      const te = ie, ae = ie, ce = /* @__PURE__ */ new Map();
      for (ie = ae; ie <= Ce; ie++) {
        const Je = B[ie] = le ? Tr(B[ie]) : yr(B[ie]);
        Je.key != null && ce.set(Je.key, ie);
      }
      let Oe, Ae = 0;
      const ze = Ce - ae + 1;
      let nt = !1, ct = 0;
      const ft = new Array(ze);
      for (ie = 0; ie < ze; ie++) ft[ie] = 0;
      for (ie = te; ie <= be; ie++) {
        const Je = R[ie];
        if (Ae >= ze) {
          Se(Je, Q, X, !0);
          continue;
        }
        let Ze;
        if (Je.key != null)
          Ze = ce.get(Je.key);
        else
          for (Oe = ae; Oe <= Ce; Oe++)
            if (ft[Oe - ae] === 0 && zi(Je, B[Oe])) {
              Ze = Oe;
              break;
            }
        Ze === void 0 ? Se(Je, Q, X, !0) : (ft[Ze - ae] = ie + 1, Ze >= ct ? ct = Ze : nt = !0, k(
          Je,
          B[Ze],
          W,
          null,
          Q,
          X,
          de,
          he,
          le
        ), Ae++);
      }
      const yt = nt ? ym(ft) : Ln;
      for (Oe = yt.length - 1, ie = ze - 1; ie >= 0; ie--) {
        const Je = ae + ie, Ze = B[Je], _r = B[Je + 1], un = Je + 1 < je ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          _r.el || Qc(_r)
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
  }, Ee = (R, B, W, Y, Q = null) => {
    const { el: X, type: de, transition: he, children: le, shapeFlag: ie } = R;
    if (ie & 6) {
      Ee(R.component.subTree, B, W, Y);
      return;
    }
    if (ie & 128) {
      R.suspense.move(B, W, Y);
      return;
    }
    if (ie & 64) {
      de.move(R, B, W, Te);
      return;
    }
    if (de === Nt) {
      w(X, B, W);
      for (let be = 0; be < le.length; be++)
        Ee(le[be], B, W, Y);
      w(R.anchor, B, W);
      return;
    }
    if (de === ja) {
      T(R, B, W);
      return;
    }
    if (Y !== 2 && ie & 1 && he)
      if (Y === 0)
        he.persisted && !X[ga] ? w(X, B, W) : (he.beforeEnter(X), w(X, B, W), Lt(() => he.enter(X), Q));
      else {
        const { leave: be, delayLeave: Ce, afterLeave: te } = he, ae = () => {
          R.ctx.isUnmounted ? v(X) : w(X, B, W);
        }, ce = () => {
          const Oe = X._isLeaving || !!X[ga];
          X._isLeaving && X[ga](
            !0
            /* cancelled */
          ), he.persisted && !Oe ? ae() : be(X, () => {
            ae(), te && te();
          });
        };
        Ce ? Ce(X, ae, ce) : ce();
      }
    else
      w(X, B, W);
  }, Se = (R, B, W, Y = !1, Q = !1) => {
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
    } = R;
    if ((be === -2 || ie && ie.hasOnce) && (Q = !1), he != null && (Ir(), Zi(he, null, W, R, !0), Br()), te != null && (!R.ctx || R.ctx === B) && (B.renderCache[te] = void 0), je & 256) {
      B.ctx.deactivate(R);
      return;
    }
    const ce = je & 1 && Ce, Oe = !Yi(R);
    let Ae;
    if (Oe && (Ae = de && de.onVnodeBeforeUnmount) && hr(Ae, B, R), je & 6)
      Pe(R.component, W, Y);
    else {
      if (je & 128) {
        R.suspense.unmount(W, Y);
        return;
      }
      ce && En(R, null, B, "beforeUnmount"), je & 64 ? R.type.remove(
        R,
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
      (X !== Nt || be > 0 && be & 64) ? Fe(
        ie,
        B,
        W,
        !1,
        !0
      ) : (X === Nt && be & 384 || !Q && je & 16) && Fe(le, B, W), Y && ye(R);
    }
    const ze = ae != null && te == null;
    (Oe && (Ae = de && de.onVnodeUnmounted) || ce || ze) && Lt(() => {
      Ae && hr(Ae, B, R), ce && En(R, null, B, "unmounted"), ze && (R.el = null);
    }, W);
  }, ye = (R) => {
    const { type: B, el: W, anchor: Y, transition: Q } = R;
    if (B === Nt) {
      Re(W, Y);
      return;
    }
    if (B === ja) {
      A(R), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
      return;
    }
    const X = () => {
      v(W), Q && !Q.persisted && Q.afterLeave && Q.afterLeave();
    };
    if (R.shapeFlag & 1 && Q && !Q.persisted) {
      const { leave: de, delayLeave: he } = Q, le = () => de(W, X);
      he ? he(R.el, X, le) : le();
    } else
      X();
  }, Re = (R, B) => {
    let W;
    for (; R !== B; )
      W = _(R), v(R), R = W;
    v(B);
  }, Pe = (R, B, W) => {
    const { bum: Y, scope: Q, job: X, subTree: de, um: he, m: le, a: ie } = R;
    Vu(le), Vu(ie), Y && Ao(Y), Q.stop(), X ? (X.flags |= 8, Se(de, R, B, W)) : R.vnode.el && de && (de.transition = R.vnode.transition, Se(de, R, B, W)), he && Lt(he, B), Lt(() => {
      R.isUnmounted = !0;
    }, B);
  }, Fe = (R, B, W, Y = !1, Q = !1, X = 0) => {
    for (let de = X; de < R.length; de++)
      Se(R[de], B, W, Y, Q);
  }, Ye = (R) => {
    if (R.shapeFlag & 6)
      return Ye(R.component.subTree);
    if (R.shapeFlag & 128)
      return R.suspense.next();
    const B = _(R.anchor || R.el), W = B && B[Ly];
    return W ? _(W) : B;
  };
  let tt = !1;
  const Ve = (R, B, W) => {
    let Y;
    R == null ? B._vnode && (Se(B._vnode, null, null, !0), Y = B._vnode.component) : k(
      B._vnode || null,
      R,
      B,
      null,
      null,
      null,
      W
    ), B._vnode = R, tt || (tt = !0, Tu(Y), Sc(), tt = !1);
  }, Te = {
    p: k,
    um: Se,
    m: Ee,
    r: ye,
    mt: re,
    mc: M,
    pc: me,
    pbc: z,
    n: Ye,
    o: l
  };
  return {
    render: Ve,
    hydrate: void 0,
    createApp: Qy(Ve)
  };
}
function wa({ type: l, props: c }, p) {
  return p === "svg" && l === "foreignObject" || p === "mathml" && l === "annotation-xml" && c && c.encoding && c.encoding.includes("html") ? void 0 : p;
}
function Sn({ effect: l, job: c }, p) {
  p ? (l.flags |= 32, c.flags |= 4) : (l.flags &= -33, c.flags &= -5);
}
function fm(l, c) {
  return (!l || l && !l.pendingBranch) && c && !c.persisted;
}
function Zc(l, c, p = !1) {
  const w = l.children, v = c.children;
  if (Me(w) && Me(v))
    for (let O = 0; O < w.length; O++) {
      const h = w[O];
      let g = v[O];
      g.shapeFlag & 1 && !g.dynamicChildren && ((g.patchFlag <= 0 || g.patchFlag === 32) && (g = v[O] = Tr(v[O]), g.el = h.el), !p && g.patchFlag !== -2 && Zc(h, g)), g.type === rs && (g.patchFlag === -1 && (g = v[O] = Tr(g)), g.el = h.el), g.type === Nr && !g.el && (g.el = h.el);
    }
}
function ym(l) {
  const c = l.slice(), p = [0];
  let w, v, O, h, g;
  const s = l.length;
  for (w = 0; w < s; w++) {
    const f = l[w];
    if (f !== 0) {
      if (v = p[p.length - 1], l[v] < f) {
        c[w] = v, p.push(w);
        continue;
      }
      for (O = 0, h = p.length - 1; O < h; )
        g = O + h >> 1, l[p[g]] < f ? O = g + 1 : h = g;
      f < l[p[O]] && (O > 0 && (c[w] = p[O - 1]), p[O] = w);
    }
  }
  for (O = p.length, h = p[O - 1]; O-- > 0; )
    p[O] = h, h = c[h];
  return p;
}
function Yc(l) {
  const c = l.subTree.component;
  if (c)
    return c.asyncDep && !c.asyncResolved ? c : Yc(c);
}
function Vu(l) {
  if (l)
    for (let c = 0; c < l.length; c++)
      l[c].flags |= 8;
}
function Qc(l) {
  if (l.placeholder)
    return l.placeholder;
  const c = l.component;
  return c ? Qc(c.subTree) : null;
}
const Xc = (l) => l.__isSuspense;
function mm(l, c) {
  c && c.pendingBranch ? Me(l) ? c.effects.push(...l) : c.effects.push(l) : Oy(l);
}
const Nt = /* @__PURE__ */ Symbol.for("v-fgt"), rs = /* @__PURE__ */ Symbol.for("v-txt"), Nr = /* @__PURE__ */ Symbol.for("v-cmt"), ja = /* @__PURE__ */ Symbol.for("v-stc"), In = [];
let Bt = null;
function Pr(l = !1) {
  In.push(Bt = l ? null : []);
}
function ed() {
  In.pop(), Bt = In[In.length - 1] || null;
}
let no = 1;
function zu(l, c = !1) {
  no += l, l < 0 && Bt && c && (Bt.hasOnce = !0);
}
function td(l) {
  return l.dynamicChildren = no > 0 ? Bt || Ln : null, ed(), no > 0 && Bt && Bt.push(l), l;
}
function on(l, c, p, w, v, O) {
  return td(
    wt(
      l,
      c,
      p,
      w,
      v,
      O,
      !0
    )
  );
}
function bm(l, c, p, w, v) {
  return td(
    Rr(
      l,
      c,
      p,
      w,
      v,
      !0
    )
  );
}
function rd(l) {
  return l ? l.__v_isVNode === !0 : !1;
}
function zi(l, c) {
  return l.type === c.type && l.key === c.key;
}
const nd = ({ key: l }) => l ?? null, Bo = ({
  ref: l,
  ref_key: c,
  ref_for: p
}) => (typeof l == "number" && (l = "" + l), l != null ? dt(l) || /* @__PURE__ */ kt(l) || qe(l) ? { i: Dt, r: l, k: c, f: !!p } : l : null);
function wt(l, c = null, p = null, w = 0, v = null, O = l === Nt ? 0 : 1, h = !1, g = !1) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l,
    props: c,
    key: c && nd(c),
    ref: c && Bo(c),
    scopeId: Tc,
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
    patchFlag: w,
    dynamicProps: v,
    dynamicChildren: null,
    appContext: null,
    ctx: Dt
  };
  return g ? (qo(s, p), O & 128 && l.normalize(s)) : p && (s.shapeFlag |= dt(p) ? 8 : 16), no > 0 && // avoid a block node from tracking itself
  !h && // has current parent block
  Bt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (s.patchFlag > 0 || O & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  s.patchFlag !== 32 && Bt.push(s), s;
}
const Rr = vm;
function vm(l, c = null, p = null, w = 0, v = null, O = !1) {
  if ((!l || l === qy) && (l = Nr), rd(l)) {
    const g = Si(
      l,
      c,
      !0
      /* mergeRef: true */
    );
    return p && qo(g, p), no > 0 && !O && Bt && (g.shapeFlag & 6 ? Bt[Bt.indexOf(l)] = g : Bt.push(g)), g.patchFlag = -2, g;
  }
  if (Pm(l) && (l = l.__vccOpts), c) {
    c = gm(c);
    let { class: g, style: s } = c;
    g && !dt(g) && (c.class = An(g)), rt(s) && (/* @__PURE__ */ Ka(s) && !Me(s) && (s = xt({}, s)), c.style = Xi(s));
  }
  const h = dt(l) ? 1 : Xc(l) ? 128 : Xo(l) ? 64 : rt(l) ? 4 : qe(l) ? 2 : 0;
  return wt(
    l,
    c,
    p,
    w,
    v,
    h,
    O,
    !0
  );
}
function gm(l) {
  return l ? /* @__PURE__ */ Ka(l) || Uc(l) ? xt({}, l) : l : null;
}
function Si(l, c, p = !1, w = !1) {
  const { props: v, ref: O, patchFlag: h, children: g, transition: s } = l, f = c ? _m(v || {}, c) : v, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: l.type,
    props: f,
    key: f && nd(f),
    ref: c && c.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      p && O ? Me(O) ? O.concat(Bo(c)) : [O, Bo(c)] : Bo(c)
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
    patchFlag: c && l.type !== Nt ? h === -1 ? 16 : h | 16 : h,
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
  return s && w && Ya(
    y,
    s.clone(y)
  ), y;
}
function id(l = " ", c = 0) {
  return Rr(rs, null, l, c);
}
function od(l = "", c = !1) {
  return c ? (Pr(), bm(Nr, null, l)) : Rr(Nr, null, l);
}
function yr(l) {
  return l == null || typeof l == "boolean" ? Rr(Nr) : Me(l) ? Rr(
    Nt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    l.slice()
  ) : rd(l) ? Tr(l) : Rr(rs, null, String(l));
}
function Tr(l) {
  return l.el === null && l.patchFlag !== -1 || l.memo ? l : Si(l);
}
function qo(l, c) {
  let p = 0;
  const { shapeFlag: w } = l;
  if (c == null)
    c = null;
  else if (Me(c))
    p = 16;
  else if (typeof c == "object")
    if (w & 65) {
      const v = c.default;
      v && (v._c && (v._d = !1), qo(l, v()), v._c && (v._d = !0));
      return;
    } else {
      p = 32;
      const v = c._;
      !v && !Uc(c) ? c._ctx = Dt : v === 3 && Dt && (Dt.slots._ === 1 ? c._ = 1 : (c._ = 2, l.patchFlag |= 1024));
    }
  else if (qe(c)) {
    if (w & 65) {
      qo(l, { default: c });
      return;
    }
    c = { default: c, _ctx: Dt }, p = 32;
  } else
    c = String(c), w & 64 ? (p = 16, c = [id(c)]) : p = 8;
  l.children = c, l.shapeFlag |= p;
}
function _m(...l) {
  const c = {};
  for (let p = 0; p < l.length; p++) {
    const w = l[p];
    for (const v in w)
      if (v === "class")
        c.class !== w.class && (c.class = An([c.class, w.class]));
      else if (v === "style")
        c.style = Xi([c.style, w.style]);
      else if (Go(v)) {
        const O = c[v], h = w[v];
        h && O !== h && !(Me(O) && O.includes(h)) ? c[v] = O ? [].concat(O, h) : h : h == null && O == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Wo(v) && (c[v] = h);
      } else v !== "" && (c[v] = w[v]);
  }
  return c;
}
function hr(l, c, p, w = null) {
  er(l, c, 7, [
    p,
    w
  ]);
}
const wm = Mc();
let jm = 0;
function km(l, c, p) {
  const w = l.type, v = (c ? c.appContext : l.appContext) || wm, O = {
    uid: jm++,
    vnode: l,
    type: w,
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
    scope: new Jf(
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
    propsOptions: Gc(w, v),
    emitsOptions: Hc(w, v),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: at,
    // inheritAttrs
    inheritAttrs: w.inheritAttrs,
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
  return O.ctx = { _: O }, O.root = c ? c.root : O, O.emit = em.bind(null, O), l.ce && l.ce(O), O;
}
let Tt = null;
const xm = () => Tt || Dt;
let Uo, io;
{
  const l = Ko(), c = (p, w) => {
    let v;
    return (v = l[p]) || (v = l[p] = []), v.push(w), (O) => {
      v.length > 1 ? v.forEach((h) => h(O)) : v[0](O);
    };
  };
  Uo = c(
    "__VUE_INSTANCE_SETTERS__",
    (p) => Tt = p
  ), io = c(
    "__VUE_SSR_SETTERS__",
    (p) => oo = p
  );
}
const lo = (l) => {
  const c = Tt;
  return Uo(l), l.scope.on(), () => {
    l.scope.off(), Uo(c);
  };
}, qu = () => {
  Tt && Tt.scope.off(), Uo(null);
};
function sd(l) {
  return l.vnode.shapeFlag & 4;
}
let oo = !1;
function Om(l, c = !1, p = !1) {
  c && io(c);
  const { props: w, children: v } = l.vnode, O = sd(l);
  sm(l, w, O, c), cm(l, v, p || c);
  const h = O ? Cm(l, c) : void 0;
  return c && io(!1), h;
}
function Cm(l, c) {
  const p = l.type;
  l.accessCache = /* @__PURE__ */ Object.create(null), l.proxy = new Proxy(l.ctx, $y);
  const { setup: w } = p;
  if (w) {
    Ir();
    const v = l.setupContext = w.length > 1 ? Sm(l) : null, O = lo(l), h = ao(
      w,
      l,
      0,
      [
        l.props,
        v
      ]
    ), g = nc(h);
    if (Br(), O(), (g || l.sp) && !Yi(l) && Ic(l), g) {
      if (h.then(qu, qu), c)
        return h.then((s) => {
          io(!0);
          try {
            Uu(l, s, c);
          } finally {
            io(!1);
          }
        }).catch((s) => {
          Qo(s, l, 0);
        });
      l.asyncDep = h;
    } else
      Uu(l, h);
  } else
    ad(l);
}
function Uu(l, c, p) {
  qe(c) ? l.type.__ssrInlineRender ? l.ssrRender = c : l.render = c : rt(c) && (l.setupState = Oc(c)), ad(l);
}
function ad(l, c, p) {
  const w = l.type;
  l.render || (l.render = w.render || br);
  {
    const v = lo(l);
    Ir();
    try {
      Gy(l);
    } finally {
      Br(), v();
    }
  }
}
const Em = {
  get(l, c) {
    return jt(l, "get", ""), l[c];
  }
};
function Sm(l) {
  const c = (p) => {
    l.exposed = p || {};
  };
  return {
    attrs: new Proxy(l.attrs, Em),
    slots: l.slots,
    emit: l.emit,
    expose: c
  };
}
function ns(l) {
  return l.exposed ? l.exposeProxy || (l.exposeProxy = new Proxy(Oc(fy(l.exposed)), {
    get(c, p) {
      if (p in c)
        return c[p];
      if (p in Qi)
        return Qi[p](l);
    },
    has(c, p) {
      return p in c || p in Qi;
    }
  })) : l.proxy;
}
function Pm(l) {
  return qe(l) && "__vccOpts" in l;
}
const ld = (l, c) => /* @__PURE__ */ _y(l, c, oo), Tm = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Da;
const $u = typeof window < "u" && window.trustedTypes;
if ($u)
  try {
    Da = /* @__PURE__ */ $u.createPolicy("vue", {
      createHTML: (l) => l
    });
  } catch {
  }
const ud = Da ? (l) => Da.createHTML(l) : (l) => l, Lm = "http://www.w3.org/2000/svg", Am = "http://www.w3.org/1998/Math/MathML", Sr = typeof document < "u" ? document : null, Gu = Sr && /* @__PURE__ */ Sr.createElement("template"), Rm = {
  insert: (l, c, p) => {
    c.insertBefore(l, p || null);
  },
  remove: (l) => {
    const c = l.parentNode;
    c && c.removeChild(l);
  },
  createElement: (l, c, p, w) => {
    const v = c === "svg" ? Sr.createElementNS(Lm, l) : c === "mathml" ? Sr.createElementNS(Am, l) : p ? Sr.createElement(l, { is: p }) : Sr.createElement(l);
    return l === "select" && w && w.multiple != null && v.setAttribute("multiple", w.multiple), v;
  },
  createText: (l) => Sr.createTextNode(l),
  createComment: (l) => Sr.createComment(l),
  setText: (l, c) => {
    l.nodeValue = c;
  },
  setElementText: (l, c) => {
    l.textContent = c;
  },
  parentNode: (l) => l.parentNode,
  nextSibling: (l) => l.nextSibling,
  querySelector: (l) => Sr.querySelector(l),
  setScopeId(l, c) {
    l.setAttribute(c, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(l, c, p, w, v, O) {
    const h = p ? p.previousSibling : c.lastChild;
    if (v && (v === O || v.nextSibling))
      for (; c.insertBefore(v.cloneNode(!0), p), !(v === O || !(v = v.nextSibling)); )
        ;
    else {
      Gu.innerHTML = ud(
        w === "svg" ? `<svg>${l}</svg>` : w === "mathml" ? `<math>${l}</math>` : l
      );
      const g = Gu.content;
      if (w === "svg" || w === "mathml") {
        const s = g.firstChild;
        for (; s.firstChild; )
          g.appendChild(s.firstChild);
        g.removeChild(s);
      }
      c.insertBefore(g, p);
    }
    return [
      // first
      h ? h.nextSibling : c.firstChild,
      // last
      p ? p.previousSibling : c.lastChild
    ];
  }
}, Im = /* @__PURE__ */ Symbol("_vtc");
function Bm(l, c, p) {
  const w = l[Im];
  w && (c = (c ? [c, ...w] : [...w]).join(" ")), c == null ? l.removeAttribute("class") : p ? l.setAttribute("class", c) : l.className = c;
}
const $o = /* @__PURE__ */ Symbol("_vod"), cd = /* @__PURE__ */ Symbol("_vsh"), Nm = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(l, { value: c }, { transition: p }) {
    l[$o] = l.style.display === "none" ? "" : l.style.display, p && c ? p.beforeEnter(l) : qi(l, c);
  },
  mounted(l, { value: c }, { transition: p }) {
    p && c && p.enter(l);
  },
  updated(l, { value: c, oldValue: p }, { transition: w }) {
    !c != !p && (w ? c ? (w.beforeEnter(l), qi(l, !0), w.enter(l)) : w.leave(l, () => {
      qi(l, !1);
    }) : qi(l, c));
  },
  beforeUnmount(l, { value: c }) {
    qi(l, c);
  }
};
function qi(l, c) {
  l.style.display = c ? l[$o] : "none", l[cd] = !c;
}
const Dm = /* @__PURE__ */ Symbol(""), Fm = /(?:^|;)\s*display\s*:/;
function Mm(l, c, p) {
  const w = l.style, v = dt(p);
  let O = !1;
  if (p && !v) {
    if (c)
      if (dt(c))
        for (const h of c.split(";")) {
          const g = h.slice(0, h.indexOf(":")).trim();
          p[g] == null && Gi(w, g, "");
        }
      else
        for (const h in c)
          p[h] == null && Gi(w, h, "");
    for (const h in p) {
      h === "display" && (O = !0);
      const g = p[h];
      g != null ? Vm(
        l,
        h,
        !dt(c) && c ? c[h] : void 0,
        g
      ) || Gi(w, h, g) : Gi(w, h, "");
    }
  } else if (v) {
    if (c !== p) {
      const h = w[Dm];
      h && (p += ";" + h), w.cssText = p, O = Fm.test(p);
    }
  } else c && l.removeAttribute("style");
  $o in l && (l[$o] = O ? w.display : "", l[cd] && (w.display = "none"));
}
const Po = /\s*!important$/;
function Gi(l, c, p) {
  if (Me(p))
    p.forEach((w) => Gi(l, c, w));
  else if (p == null && (p = ""), c.startsWith("--"))
    Po.test(p) ? l.setProperty(c, p.replace(Po, ""), "important") : l.setProperty(c, p);
  else {
    const w = Hm(l, c);
    Po.test(p) ? l.setProperty(
      Bn(w),
      p.replace(Po, ""),
      "important"
    ) : l[w] = p;
  }
}
const Wu = ["Webkit", "Moz", "ms"], ka = {};
function Hm(l, c) {
  const p = ka[c];
  if (p)
    return p;
  let w = Qt(c);
  if (w !== "filter" && w in l)
    return ka[c] = w;
  w = sc(w);
  for (let v = 0; v < Wu.length; v++) {
    const O = Wu[v] + w;
    if (O in l)
      return ka[c] = O;
  }
  return c;
}
function Vm(l, c, p, w) {
  return l.tagName === "TEXTAREA" && (c === "width" || c === "height") && dt(w) && p === w;
}
const Ju = "http://www.w3.org/1999/xlink";
function Ku(l, c, p, w, v, O = $f(c)) {
  w && c.startsWith("xlink:") ? p == null ? l.removeAttributeNS(Ju, c.slice(6, c.length)) : l.setAttributeNS(Ju, c, p) : p == null || O && !lc(p) ? l.removeAttribute(c) : l.setAttribute(
    c,
    O ? "" : vr(p) ? String(p) : p
  );
}
function Zu(l, c, p, w, v) {
  if (c === "innerHTML" || c === "textContent") {
    p != null && (l[c] = c === "innerHTML" ? ud(p) : p);
    return;
  }
  const O = l.tagName;
  if (c === "value" && O !== "PROGRESS" && // custom elements may use _value internally
  !O.includes("-")) {
    const g = O === "OPTION" ? l.getAttribute("value") || "" : l.value, s = p == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      l.type === "checkbox" ? "on" : ""
    ) : String(p);
    (g !== s || !("_value" in l)) && (l.value = s), p == null && l.removeAttribute(c), l._value = p;
    return;
  }
  let h = !1;
  if (p === "" || p == null) {
    const g = typeof l[c];
    g === "boolean" ? p = lc(p) : p == null && g === "string" ? (p = "", h = !0) : g === "number" && (p = 0, h = !0);
  }
  try {
    l[c] = p;
  } catch {
  }
  h && l.removeAttribute(v || c);
}
function Oi(l, c, p, w) {
  l.addEventListener(c, p, w);
}
function zm(l, c, p, w) {
  l.removeEventListener(c, p, w);
}
const Yu = /* @__PURE__ */ Symbol("_vei");
function qm(l, c, p, w, v = null) {
  const O = l[Yu] || (l[Yu] = {}), h = O[c];
  if (w && h)
    h.value = w;
  else {
    const [g, s] = Gm(c);
    if (w) {
      const f = O[c] = Km(
        w,
        v
      );
      Oi(l, g, f, s);
    } else h && (zm(l, g, h, s), O[c] = void 0);
  }
}
const Um = /(Once|Passive|Capture)$/, $m = /^on:?(?:Once|Passive|Capture)$/;
function Gm(l) {
  let c, p;
  for (; (p = l.match(Um)) && !$m.test(l); )
    c || (c = {}), l = l.slice(0, l.length - p[1].length), c[p[1].toLowerCase()] = !0;
  return [l[2] === ":" ? l.slice(3) : Bn(l.slice(2)), c];
}
let xa = 0;
const Wm = /* @__PURE__ */ Promise.resolve(), Jm = () => xa || (Wm.then(() => xa = 0), xa = Date.now());
function Km(l, c) {
  const p = (w) => {
    if (!w._vts)
      w._vts = Date.now();
    else if (w._vts <= p.attached)
      return;
    const v = p.value;
    if (Me(v)) {
      const O = w.stopImmediatePropagation;
      w.stopImmediatePropagation = () => {
        O.call(w), w._stopped = !0;
      };
      const h = v.slice(), g = [w];
      for (let s = 0; s < h.length && !w._stopped; s++) {
        const f = h[s];
        f && er(
          f,
          c,
          5,
          g
        );
      }
    } else
      er(
        v,
        c,
        5,
        [w]
      );
  };
  return p.value = l, p.attached = Jm(), p;
}
const Qu = (l) => l.charCodeAt(0) === 111 && l.charCodeAt(1) === 110 && // lowercase letter
l.charCodeAt(2) > 96 && l.charCodeAt(2) < 123, Zm = (l, c, p, w, v, O) => {
  const h = v === "svg";
  c === "class" ? Bm(l, w, h) : c === "style" ? Mm(l, p, w) : Go(c) ? Wo(c) || qm(l, c, p, w, O) : (c[0] === "." ? (c = c.slice(1), !0) : c[0] === "^" ? (c = c.slice(1), !1) : Ym(l, c, w, h)) ? (Zu(l, c, w), !l.tagName.includes("-") && (c === "value" || c === "checked" || c === "selected") && Ku(l, c, w, h, O, c !== "value")) : /* #11081 force set props for possible async custom element */ l._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Qm(l, c) || // @ts-expect-error _def is private
  l._def.__asyncLoader && (/[A-Z]/.test(c) || !dt(w))) ? Zu(l, Qt(c), w, O, c) : (c === "true-value" ? l._trueValue = w : c === "false-value" && (l._falseValue = w), Ku(l, c, w, h));
};
function Ym(l, c, p, w) {
  if (w)
    return !!(c === "innerHTML" || c === "textContent" || c in l && Qu(c) && qe(p));
  if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA")
    return !1;
  if (c === "width" || c === "height") {
    const v = l.tagName;
    if (v === "IMG" || v === "VIDEO" || v === "CANVAS" || v === "SOURCE")
      return !1;
  }
  return Qu(c) && dt(p) ? !1 : c in l;
}
function Qm(l, c) {
  const p = (
    // @ts-expect-error _def is private
    l._def.props
  );
  if (!p)
    return !1;
  const w = Qt(c);
  return Array.isArray(p) ? p.some((v) => Qt(v) === w) : Object.keys(p).some((v) => Qt(v) === w);
}
const Xu = (l) => {
  const c = l.props["onUpdate:modelValue"] || !1;
  return Me(c) ? (p) => Ao(c, p) : c;
};
function Xm(l) {
  l.target.composing = !0;
}
function ec(l) {
  const c = l.target;
  c.composing && (c.composing = !1, c.dispatchEvent(new Event("input")));
}
const To = /* @__PURE__ */ Symbol("_assign"), Lo = /* @__PURE__ */ Symbol("_initialValue");
function Oa(l, c, p) {
  return c && (l = l.trim()), p && (l = Va(l)), l;
}
const eb = {
  created(l, { modifiers: { lazy: c, trim: p, number: w } }, v) {
    l.parentNode && (l.type === "text" ? l[Lo] = l.defaultValue.replace(/[\r\n]/g, "") : l.type === "textarea" && (l[Lo] = l.defaultValue.replace(/\r\n?/g, `
`))), l[To] = Xu(v);
    const O = w || v.props && v.props.type === "number";
    Oi(l, c ? "change" : "input", (h) => {
      h.target.composing || l[To](Oa(l.value, p, O));
    }), (p || O) && Oi(l, "change", () => {
      l.value = Oa(l.value, p, O);
    }), c || (Oi(l, "compositionstart", Xm), Oi(l, "compositionend", ec), Oi(l, "change", ec));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(l, { value: c, modifiers: { trim: p, number: w } }) {
    const v = c ?? "", O = l[Lo];
    delete l[Lo], O !== void 0 && (l.type === "text" || l.type === "textarea") && l.value !== O ? l[To](Oa(l.value, p, w)) : l.value = v;
  },
  beforeUpdate(l, { value: c, oldValue: p, modifiers: { lazy: w, trim: v, number: O } }, h) {
    if (l[To] = Xu(h), l.composing) return;
    const g = (O || l.type === "number") && !/^0\d/.test(l.value) ? Va(l.value) : l.value, s = c ?? "";
    if (g === s)
      return;
    const f = l.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === l && l.type !== "range" && (w && c === p || v && l.value.trim() === s) || (l.value = s);
  }
}, tb = ["ctrl", "shift", "alt", "meta"], rb = {
  stop: (l) => l.stopPropagation(),
  prevent: (l) => l.preventDefault(),
  self: (l) => l.target !== l.currentTarget,
  ctrl: (l) => !l.ctrlKey,
  shift: (l) => !l.shiftKey,
  alt: (l) => !l.altKey,
  meta: (l) => !l.metaKey,
  left: (l) => "button" in l && l.button !== 0,
  middle: (l) => "button" in l && l.button !== 1,
  right: (l) => "button" in l && l.button !== 2,
  exact: (l, c) => tb.some((p) => l[`${p}Key`] && !c.includes(p))
}, Ui = (l, c) => {
  if (!l) return l;
  const p = l._withMods || (l._withMods = {}), w = c.join(".");
  return p[w] || (p[w] = (v, ...O) => {
    for (let h = 0; h < c.length; h++) {
      const g = rb[c[h]];
      if (g && g(v, c)) return;
    }
    return l(v, ...O);
  });
}, nb = /* @__PURE__ */ xt({ patchProp: Zm }, Rm);
let tc;
function ib() {
  return tc || (tc = hm(nb));
}
const dd = (...l) => {
  const c = ib().createApp(...l), { mount: p } = c;
  return c.mount = (w) => {
    const v = sb(w);
    if (!v) return;
    const O = c._component;
    !qe(O) && !O.render && !O.template && (O.template = v.innerHTML), v.nodeType === 1 && (v.textContent = "");
    const h = p(v, !1, ob(v));
    return v instanceof Element && (v.removeAttribute("v-cloak"), v.setAttribute("data-v-app", "")), h;
  }, c;
};
function ob(l) {
  if (l instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && l instanceof MathMLElement)
    return "mathml";
}
function sb(l) {
  return dt(l) ? document.querySelector(l) : l;
}
function ab(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var hd = { exports: {} };
/*! For license information please see jsoneditor.js.LICENSE.txt */
(function(l, c) {
  (function(p, w) {
    l.exports = w();
  })(self, () => (() => {
    var p = { 9306: (h, g, s) => {
      var f = s(4901), y = s(6823), m = TypeError;
      h.exports = function(_) {
        if (f(_)) return _;
        throw new m(y(_) + " is not a function");
      };
    }, 5548: (h, g, s) => {
      var f = s(3517), y = s(6823), m = TypeError;
      h.exports = function(_) {
        if (f(_)) return _;
        throw new m(y(_) + " is not a constructor");
      };
    }, 3506: (h, g, s) => {
      var f = s(3925), y = String, m = TypeError;
      h.exports = function(_) {
        if (f(_)) return _;
        throw new m("Can't set " + y(_) + " as a prototype");
      };
    }, 6469: (h, g, s) => {
      var f = s(8227), y = s(2360), m = s(4913).f, _ = f("unscopables"), j = Array.prototype;
      j[_] === void 0 && m(j, _, { configurable: !0, value: y(null) }), h.exports = function(C) {
        j[_][C] = !0;
      };
    }, 7829: (h, g, s) => {
      var f = s(8183).charAt;
      h.exports = function(y, m, _) {
        return m + (_ ? f(y, m).length : 1);
      };
    }, 679: (h, g, s) => {
      var f = s(1625), y = TypeError;
      h.exports = function(m, _) {
        if (f(_, m)) return m;
        throw new y("Incorrect invocation");
      };
    }, 8551: (h, g, s) => {
      var f = s(34), y = String, m = TypeError;
      h.exports = function(_) {
        if (f(_)) return _;
        throw new m(y(_) + " is not an object");
      };
    }, 235: (h, g, s) => {
      var f = s(9213).forEach, y = s(4598)("forEach");
      h.exports = y ? [].forEach : function(m) {
        return f(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, 7916: (h, g, s) => {
      var f = s(6080), y = s(9565), m = s(8981), _ = s(6319), j = s(4209), C = s(3517), k = s(6198), E = s(4659), S = s(81), L = s(851), T = Array;
      h.exports = function(A) {
        var N = m(A), D = C(this), F = arguments.length, M = F > 1 ? arguments[1] : void 0, H = M !== void 0;
        H && (M = f(M, F > 2 ? arguments[2] : void 0));
        var z, V, K, Z, re, ue, oe = L(N), ne = 0;
        if (!oe || this === T && j(oe)) for (z = k(N), V = D ? new this(z) : T(z); z > ne; ne++) ue = H ? M(N[ne], ne) : N[ne], E(V, ne, ue);
        else for (V = D ? new this() : [], re = (Z = S(N, oe)).next; !(K = y(re, Z)).done; ne++) ue = H ? _(Z, M, [K.value, ne], !0) : K.value, E(V, ne, ue);
        return V.length = ne, V;
      };
    }, 9617: (h, g, s) => {
      var f = s(5397), y = s(5610), m = s(6198), _ = function(j) {
        return function(C, k, E) {
          var S = f(C), L = m(S);
          if (L === 0) return !j && -1;
          var T, A = y(E, L);
          if (j && k != k) {
            for (; L > A; ) if ((T = S[A++]) != T) return !0;
          } else for (; L > A; A++) if ((j || A in S) && S[A] === k) return j || A || 0;
          return !j && -1;
        };
      };
      h.exports = { includes: _(!0), indexOf: _(!1) };
    }, 9213: (h, g, s) => {
      var f = s(6080), y = s(9504), m = s(7055), _ = s(8981), j = s(6198), C = s(1469), k = y([].push), E = function(S) {
        var L = S === 1, T = S === 2, A = S === 3, N = S === 4, D = S === 6, F = S === 7, M = S === 5 || D;
        return function(H, z, V, K) {
          for (var Z, re, ue = _(H), oe = m(ue), ne = j(oe), me = f(z, V), fe = 0, ke = K || C, Ee = L ? ke(H, ne) : T || F ? ke(H, 0) : void 0; ne > fe; fe++) if ((M || fe in oe) && (re = me(Z = oe[fe], fe, ue), S)) if (L) Ee[fe] = re;
          else if (re) switch (S) {
            case 3:
              return !0;
            case 5:
              return Z;
            case 6:
              return fe;
            case 2:
              k(Ee, Z);
          }
          else switch (S) {
            case 4:
              return !1;
            case 7:
              k(Ee, Z);
          }
          return D ? -1 : A || N ? N : Ee;
        };
      };
      h.exports = { forEach: E(0), map: E(1), filter: E(2), some: E(3), every: E(4), find: E(5), findIndex: E(6), filterReject: E(7) };
    }, 597: (h, g, s) => {
      var f = s(9039), y = s(8227), m = s(7388), _ = y("species");
      h.exports = function(j) {
        return m >= 51 || !f(function() {
          var C = [];
          return (C.constructor = {})[_] = function() {
            return { foo: 1 };
          }, C[j](Boolean).foo !== 1;
        });
      };
    }, 4598: (h, g, s) => {
      var f = s(9039);
      h.exports = function(y, m) {
        var _ = [][y];
        return !!_ && f(function() {
          _.call(null, m || function() {
            return 1;
          }, 1);
        });
      };
    }, 926: (h, g, s) => {
      var f = s(9306), y = s(8981), m = s(7055), _ = s(6198), j = TypeError, C = "Reduce of empty array with no initial value", k = function(E) {
        return function(S, L, T, A) {
          var N = y(S), D = m(N), F = _(N);
          if (f(L), F === 0 && T < 2) throw new j(C);
          var M = E ? F - 1 : 0, H = E ? -1 : 1;
          if (T < 2) for (; ; ) {
            if (M in D) {
              A = D[M], M += H;
              break;
            }
            if (M += H, E ? M < 0 : F <= M) throw new j(C);
          }
          for (; E ? M >= 0 : F > M; M += H) M in D && (A = L(A, D[M], M, N));
          return A;
        };
      };
      h.exports = { left: k(!1), right: k(!0) };
    }, 4527: (h, g, s) => {
      var f = s(3724), y = s(4376), m = TypeError, _ = Object.getOwnPropertyDescriptor, j = f && !function() {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", { writable: !1 }).length = 1;
        } catch (C) {
          return C instanceof TypeError;
        }
      }();
      h.exports = j ? function(C, k) {
        if (y(C) && !_(C, "length").writable) throw new m("Cannot set read only .length");
        return C.length = k;
      } : function(C, k) {
        return C.length = k;
      };
    }, 7680: (h, g, s) => {
      var f = s(9504);
      h.exports = f([].slice);
    }, 4488: (h, g, s) => {
      var f = s(7680), y = Math.floor, m = function(_, j) {
        var C = _.length;
        if (C < 8) for (var k, E, S = 1; S < C; ) {
          for (E = S, k = _[S]; E && j(_[E - 1], k) > 0; ) _[E] = _[--E];
          E !== S++ && (_[E] = k);
        }
        else for (var L = y(C / 2), T = m(f(_, 0, L), j), A = m(f(_, L), j), N = T.length, D = A.length, F = 0, M = 0; F < N || M < D; ) _[F + M] = F < N && M < D ? j(T[F], A[M]) <= 0 ? T[F++] : A[M++] : F < N ? T[F++] : A[M++];
        return _;
      };
      h.exports = m;
    }, 7433: (h, g, s) => {
      var f = s(4376), y = s(3517), m = s(34), _ = s(8227)("species"), j = Array;
      h.exports = function(C) {
        var k;
        return f(C) && (k = C.constructor, (y(k) && (k === j || f(k.prototype)) || m(k) && (k = k[_]) === null) && (k = void 0)), k === void 0 ? j : k;
      };
    }, 1469: (h, g, s) => {
      var f = s(7433);
      h.exports = function(y, m) {
        return new (f(y))(m === 0 ? 0 : m);
      };
    }, 6319: (h, g, s) => {
      var f = s(8551), y = s(9539);
      h.exports = function(m, _, j, C) {
        try {
          return C ? _(f(j)[0], j[1]) : _(j);
        } catch (k) {
          y(m, "throw", k);
        }
      };
    }, 4428: (h, g, s) => {
      var f = s(8227)("iterator"), y = !1;
      try {
        var m = 0, _ = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          y = !0;
        } };
        _[f] = function() {
          return this;
        }, Array.from(_, function() {
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
    }, 4576: (h, g, s) => {
      var f = s(9504), y = f({}.toString), m = f("".slice);
      h.exports = function(_) {
        return m(y(_), 8, -1);
      };
    }, 6955: (h, g, s) => {
      var f = s(2140), y = s(4901), m = s(4576), _ = s(8227)("toStringTag"), j = Object, C = m(/* @__PURE__ */ function() {
        return arguments;
      }()) === "Arguments";
      h.exports = f ? m : function(k) {
        var E, S, L;
        return k === void 0 ? "Undefined" : k === null ? "Null" : typeof (S = function(T, A) {
          try {
            return T[A];
          } catch {
          }
        }(E = j(k), _)) == "string" ? S : C ? m(E) : (L = m(E)) === "Object" && y(E.callee) ? "Arguments" : L;
      };
    }, 7740: (h, g, s) => {
      var f = s(9297), y = s(5031), m = s(7347), _ = s(4913);
      h.exports = function(j, C, k) {
        for (var E = y(C), S = _.f, L = m.f, T = 0; T < E.length; T++) {
          var A = E[T];
          f(j, A) || k && f(k, A) || S(j, A, L(C, A));
        }
      };
    }, 1436: (h, g, s) => {
      var f = s(8227)("match");
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
    }, 2211: (h, g, s) => {
      var f = s(9039);
      h.exports = !f(function() {
        function y() {
        }
        return y.prototype.constructor = null, Object.getPrototypeOf(new y()) !== y.prototype;
      });
    }, 2529: (h) => {
      h.exports = function(g, s) {
        return { value: g, done: s };
      };
    }, 6699: (h, g, s) => {
      var f = s(3724), y = s(4913), m = s(6980);
      h.exports = f ? function(_, j, C) {
        return y.f(_, j, m(1, C));
      } : function(_, j, C) {
        return _[j] = C, _;
      };
    }, 6980: (h) => {
      h.exports = function(g, s) {
        return { enumerable: !(1 & g), configurable: !(2 & g), writable: !(4 & g), value: s };
      };
    }, 4659: (h, g, s) => {
      var f = s(3724), y = s(4913), m = s(6980);
      h.exports = function(_, j, C) {
        f ? y.f(_, j, m(0, C)) : _[j] = C;
      };
    }, 380: (h, g, s) => {
      var f = s(9504), y = s(9039), m = s(533).start, _ = RangeError, j = isFinite, C = Math.abs, k = Date.prototype, E = k.toISOString, S = f(k.getTime), L = f(k.getUTCDate), T = f(k.getUTCFullYear), A = f(k.getUTCHours), N = f(k.getUTCMilliseconds), D = f(k.getUTCMinutes), F = f(k.getUTCMonth), M = f(k.getUTCSeconds);
      h.exports = y(function() {
        return E.call(/* @__PURE__ */ new Date(-50000000000001)) !== "0385-07-25T07:06:39.999Z";
      }) || !y(function() {
        E.call(/* @__PURE__ */ new Date(NaN));
      }) ? function() {
        if (!j(S(this))) throw new _("Invalid time value");
        var H = this, z = T(H), V = N(H), K = z < 0 ? "-" : z > 9999 ? "+" : "";
        return K + m(C(z), K ? 6 : 4, 0) + "-" + m(F(H) + 1, 2, 0) + "-" + m(L(H), 2, 0) + "T" + m(A(H), 2, 0) + ":" + m(D(H), 2, 0) + ":" + m(M(H), 2, 0) + "." + m(V, 3, 0) + "Z";
      } : E;
    }, 3640: (h, g, s) => {
      var f = s(8551), y = s(4270), m = TypeError;
      h.exports = function(_) {
        if (f(this), _ === "string" || _ === "default") _ = "string";
        else if (_ !== "number") throw new m("Incorrect hint");
        return y(this, _);
      };
    }, 2106: (h, g, s) => {
      var f = s(283), y = s(4913);
      h.exports = function(m, _, j) {
        return j.get && f(j.get, _, { getter: !0 }), j.set && f(j.set, _, { setter: !0 }), y.f(m, _, j);
      };
    }, 6840: (h, g, s) => {
      var f = s(4901), y = s(4913), m = s(283), _ = s(9433);
      h.exports = function(j, C, k, E) {
        E || (E = {});
        var S = E.enumerable, L = E.name !== void 0 ? E.name : C;
        if (f(k) && m(k, L, E), E.global) S ? j[C] = k : _(C, k);
        else {
          try {
            E.unsafe ? j[C] && (S = !0) : delete j[C];
          } catch {
          }
          S ? j[C] = k : y.f(j, C, { value: k, enumerable: !1, configurable: !E.nonConfigurable, writable: !E.nonWritable });
        }
        return j;
      };
    }, 9433: (h, g, s) => {
      var f = s(4475), y = Object.defineProperty;
      h.exports = function(m, _) {
        try {
          y(f, m, { value: _, configurable: !0, writable: !0 });
        } catch {
          f[m] = _;
        }
        return _;
      };
    }, 4606: (h, g, s) => {
      var f = s(6823), y = TypeError;
      h.exports = function(m, _) {
        if (!delete m[_]) throw new y("Cannot delete property " + f(_) + " of " + f(m));
      };
    }, 3724: (h, g, s) => {
      var f = s(9039);
      h.exports = !f(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] !== 7;
      });
    }, 4055: (h, g, s) => {
      var f = s(4475), y = s(34), m = f.document, _ = y(m) && y(m.createElement);
      h.exports = function(j) {
        return _ ? m.createElement(j) : {};
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
      var f = s(4055)("span").classList, y = f && f.constructor && f.constructor.prototype;
      h.exports = y === Object.prototype ? void 0 : y;
    }, 8834: (h, g, s) => {
      var f = s(9392).match(/firefox\/(\d+)/i);
      h.exports = !!f && +f[1];
    }, 7290: (h, g, s) => {
      var f = s(516), y = s(9088);
      h.exports = !f && !y && typeof window == "object" && typeof document == "object";
    }, 6763: (h) => {
      h.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";
    }, 516: (h) => {
      h.exports = typeof Deno == "object" && Deno && typeof Deno.version == "object";
    }, 3202: (h, g, s) => {
      var f = s(9392);
      h.exports = /MSIE|Trident/.test(f);
    }, 28: (h, g, s) => {
      var f = s(9392);
      h.exports = /ipad|iphone|ipod/i.test(f) && typeof Pebble < "u";
    }, 8119: (h, g, s) => {
      var f = s(9392);
      h.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(f);
    }, 9088: (h, g, s) => {
      var f = s(4475), y = s(4576);
      h.exports = y(f.process) === "process";
    }, 6765: (h, g, s) => {
      var f = s(9392);
      h.exports = /web0s(?!.*chrome)/i.test(f);
    }, 9392: (h) => {
      h.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
    }, 7388: (h, g, s) => {
      var f, y, m = s(4475), _ = s(9392), j = m.process, C = m.Deno, k = j && j.versions || C && C.version, E = k && k.v8;
      E && (y = (f = E.split("."))[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1])), !y && _ && (!(f = _.match(/Edge\/(\d+)/)) || f[1] >= 74) && (f = _.match(/Chrome\/(\d+)/)) && (y = +f[1]), h.exports = y;
    }, 9160: (h, g, s) => {
      var f = s(9392).match(/AppleWebKit\/(\d+)\./);
      h.exports = !!f && +f[1];
    }, 8727: (h) => {
      h.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, 6518: (h, g, s) => {
      var f = s(4475), y = s(7347).f, m = s(6699), _ = s(6840), j = s(9433), C = s(7740), k = s(2796);
      h.exports = function(E, S) {
        var L, T, A, N, D, F = E.target, M = E.global, H = E.stat;
        if (L = M ? f : H ? f[F] || j(F, {}) : f[F] && f[F].prototype) for (T in S) {
          if (N = S[T], A = E.dontCallGetSet ? (D = y(L, T)) && D.value : L[T], !k(M ? T : F + (H ? "." : "#") + T, E.forced) && A !== void 0) {
            if (typeof N == typeof A) continue;
            C(N, A);
          }
          (E.sham || A && A.sham) && m(N, "sham", !0), _(L, T, N, E);
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
      var f = s(9565), y = s(6840), m = s(7323), _ = s(9039), j = s(8227), C = s(6699), k = j("species"), E = RegExp.prototype;
      h.exports = function(S, L, T, A) {
        var N = j(S), D = !_(function() {
          var z = {};
          return z[N] = function() {
            return 7;
          }, ""[S](z) !== 7;
        }), F = D && !_(function() {
          var z = !1, V = /a/;
          return S === "split" && ((V = {}).constructor = {}, V.constructor[k] = function() {
            return V;
          }, V.flags = "", V[N] = /./[N]), V.exec = function() {
            return z = !0, null;
          }, V[N](""), !z;
        });
        if (!D || !F || T) {
          var M = /./[N], H = L(N, ""[S], function(z, V, K, Z, re) {
            var ue = V.exec;
            return ue === m || ue === E.exec ? D && !re ? { done: !0, value: f(M, V, K, Z) } : { done: !0, value: f(z, K, V, Z) } : { done: !1 };
          });
          y(String.prototype, S, H[0]), y(E, N, H[1]);
        }
        A && C(E[N], "sham", !0);
      };
    }, 8745: (h, g, s) => {
      var f = s(616), y = Function.prototype, m = y.apply, _ = y.call;
      h.exports = typeof Reflect == "object" && Reflect.apply || (f ? _.bind(m) : function() {
        return _.apply(m, arguments);
      });
    }, 6080: (h, g, s) => {
      var f = s(7476), y = s(9306), m = s(616), _ = f(f.bind);
      h.exports = function(j, C) {
        return y(j), C === void 0 ? j : m ? _(j, C) : function() {
          return j.apply(C, arguments);
        };
      };
    }, 616: (h, g, s) => {
      var f = s(9039);
      h.exports = !f(function() {
        var y = (function() {
        }).bind();
        return typeof y != "function" || y.hasOwnProperty("prototype");
      });
    }, 566: (h, g, s) => {
      var f = s(9504), y = s(9306), m = s(34), _ = s(9297), j = s(7680), C = s(616), k = Function, E = f([].concat), S = f([].join), L = {};
      h.exports = C ? k.bind : function(T) {
        var A = y(this), N = A.prototype, D = j(arguments, 1), F = function() {
          var M = E(D, j(arguments));
          return this instanceof F ? function(H, z, V) {
            if (!_(L, z)) {
              for (var K = [], Z = 0; Z < z; Z++) K[Z] = "a[" + Z + "]";
              L[z] = k("C,a", "return new C(" + S(K, ",") + ")");
            }
            return L[z](H, V);
          }(A, M.length, M) : A.apply(T, M);
        };
        return m(N) && (F.prototype = N), F;
      };
    }, 9565: (h, g, s) => {
      var f = s(616), y = Function.prototype.call;
      h.exports = f ? y.bind(y) : function() {
        return y.apply(y, arguments);
      };
    }, 350: (h, g, s) => {
      var f = s(3724), y = s(9297), m = Function.prototype, _ = f && Object.getOwnPropertyDescriptor, j = y(m, "name"), C = j && (function() {
      }).name === "something", k = j && (!f || f && _(m, "name").configurable);
      h.exports = { EXISTS: j, PROPER: C, CONFIGURABLE: k };
    }, 6706: (h, g, s) => {
      var f = s(9504), y = s(9306);
      h.exports = function(m, _, j) {
        try {
          return f(y(Object.getOwnPropertyDescriptor(m, _)[j]));
        } catch {
        }
      };
    }, 7476: (h, g, s) => {
      var f = s(4576), y = s(9504);
      h.exports = function(m) {
        if (f(m) === "Function") return y(m);
      };
    }, 9504: (h, g, s) => {
      var f = s(616), y = Function.prototype, m = y.call, _ = f && y.bind.bind(m, m);
      h.exports = f ? _ : function(j) {
        return function() {
          return m.apply(j, arguments);
        };
      };
    }, 7751: (h, g, s) => {
      var f = s(4475), y = s(4901);
      h.exports = function(m, _) {
        return arguments.length < 2 ? (j = f[m], y(j) ? j : void 0) : f[m] && f[m][_];
        var j;
      };
    }, 851: (h, g, s) => {
      var f = s(6955), y = s(5966), m = s(4117), _ = s(6269), j = s(8227)("iterator");
      h.exports = function(C) {
        if (!m(C)) return y(C, j) || y(C, "@@iterator") || _[f(C)];
      };
    }, 81: (h, g, s) => {
      var f = s(9565), y = s(9306), m = s(8551), _ = s(6823), j = s(851), C = TypeError;
      h.exports = function(k, E) {
        var S = arguments.length < 2 ? j(k) : E;
        if (y(S)) return m(f(S, k));
        throw new C(_(k) + " is not iterable");
      };
    }, 6933: (h, g, s) => {
      var f = s(9504), y = s(4376), m = s(4901), _ = s(4576), j = s(655), C = f([].push);
      h.exports = function(k) {
        if (m(k)) return k;
        if (y(k)) {
          for (var E = k.length, S = [], L = 0; L < E; L++) {
            var T = k[L];
            typeof T == "string" ? C(S, T) : typeof T != "number" && _(T) !== "Number" && _(T) !== "String" || C(S, j(T));
          }
          var A = S.length, N = !0;
          return function(D, F) {
            if (N) return N = !1, F;
            if (y(this)) return F;
            for (var M = 0; M < A; M++) if (S[M] === D) return F;
          };
        }
      };
    }, 5966: (h, g, s) => {
      var f = s(9306), y = s(4117);
      h.exports = function(m, _) {
        var j = m[_];
        return y(j) ? void 0 : f(j);
      };
    }, 2478: (h, g, s) => {
      var f = s(9504), y = s(8981), m = Math.floor, _ = f("".charAt), j = f("".replace), C = f("".slice), k = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, E = /\$([$&'`]|\d{1,2})/g;
      h.exports = function(S, L, T, A, N, D) {
        var F = T + S.length, M = A.length, H = E;
        return N !== void 0 && (N = y(N), H = k), j(D, H, function(z, V) {
          var K;
          switch (_(V, 0)) {
            case "$":
              return "$";
            case "&":
              return S;
            case "`":
              return C(L, 0, T);
            case "'":
              return C(L, F);
            case "<":
              K = N[C(V, 1, -1)];
              break;
            default:
              var Z = +V;
              if (Z === 0) return z;
              if (Z > M) {
                var re = m(Z / 10);
                return re === 0 ? z : re <= M ? A[re - 1] === void 0 ? _(V, 1) : A[re - 1] + _(V, 1) : z;
              }
              K = A[Z - 1];
          }
          return K === void 0 ? "" : K;
        });
      };
    }, 4475: function(h, g, s) {
      var f = function(y) {
        return y && y.Math === Math && y;
      };
      h.exports = f(typeof globalThis == "object" && globalThis) || f(typeof window == "object" && window) || f(typeof self == "object" && self) || f(typeof s.g == "object" && s.g) || f(typeof this == "object" && this) || /* @__PURE__ */ function() {
        return this;
      }() || Function("return this")();
    }, 9297: (h, g, s) => {
      var f = s(9504), y = s(8981), m = f({}.hasOwnProperty);
      h.exports = Object.hasOwn || function(_, j) {
        return m(y(_), j);
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
      var f = s(7751);
      h.exports = f("document", "documentElement");
    }, 5917: (h, g, s) => {
      var f = s(3724), y = s(9039), m = s(4055);
      h.exports = !f && !y(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a !== 7;
      });
    }, 7055: (h, g, s) => {
      var f = s(9504), y = s(9039), m = s(4576), _ = Object, j = f("".split);
      h.exports = y(function() {
        return !_("z").propertyIsEnumerable(0);
      }) ? function(C) {
        return m(C) === "String" ? j(C, "") : _(C);
      } : _;
    }, 3167: (h, g, s) => {
      var f = s(4901), y = s(34), m = s(2967);
      h.exports = function(_, j, C) {
        var k, E;
        return m && f(k = j.constructor) && k !== C && y(E = k.prototype) && E !== C.prototype && m(_, E), _;
      };
    }, 3706: (h, g, s) => {
      var f = s(9504), y = s(4901), m = s(7629), _ = f(Function.toString);
      y(m.inspectSource) || (m.inspectSource = function(j) {
        return _(j);
      }), h.exports = m.inspectSource;
    }, 1181: (h, g, s) => {
      var f, y, m, _ = s(8622), j = s(4475), C = s(34), k = s(6699), E = s(9297), S = s(7629), L = s(6119), T = s(421), A = "Object already initialized", N = j.TypeError, D = j.WeakMap;
      if (_ || S.state) {
        var F = S.state || (S.state = new D());
        F.get = F.get, F.has = F.has, F.set = F.set, f = function(H, z) {
          if (F.has(H)) throw new N(A);
          return z.facade = H, F.set(H, z), z;
        }, y = function(H) {
          return F.get(H) || {};
        }, m = function(H) {
          return F.has(H);
        };
      } else {
        var M = L("state");
        T[M] = !0, f = function(H, z) {
          if (E(H, M)) throw new N(A);
          return z.facade = H, k(H, M, z), z;
        }, y = function(H) {
          return E(H, M) ? H[M] : {};
        }, m = function(H) {
          return E(H, M);
        };
      }
      h.exports = { set: f, get: y, has: m, enforce: function(H) {
        return m(H) ? y(H) : f(H, {});
      }, getterFor: function(H) {
        return function(z) {
          var V;
          if (!C(z) || (V = y(z)).type !== H) throw new N("Incompatible receiver, " + H + " required");
          return V;
        };
      } };
    }, 4209: (h, g, s) => {
      var f = s(8227), y = s(6269), m = f("iterator"), _ = Array.prototype;
      h.exports = function(j) {
        return j !== void 0 && (y.Array === j || _[m] === j);
      };
    }, 4376: (h, g, s) => {
      var f = s(4576);
      h.exports = Array.isArray || function(y) {
        return f(y) === "Array";
      };
    }, 4901: (h) => {
      var g = typeof document == "object" && document.all;
      h.exports = g === void 0 && g !== void 0 ? function(s) {
        return typeof s == "function" || s === g;
      } : function(s) {
        return typeof s == "function";
      };
    }, 3517: (h, g, s) => {
      var f = s(9504), y = s(9039), m = s(4901), _ = s(6955), j = s(7751), C = s(3706), k = function() {
      }, E = j("Reflect", "construct"), S = /^\s*(?:class|function)\b/, L = f(S.exec), T = !S.test(k), A = function(D) {
        if (!m(D)) return !1;
        try {
          return E(k, [], D), !0;
        } catch {
          return !1;
        }
      }, N = function(D) {
        if (!m(D)) return !1;
        switch (_(D)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return T || !!L(S, C(D));
        } catch {
          return !0;
        }
      };
      N.sham = !0, h.exports = !E || y(function() {
        var D;
        return A(A.call) || !A(Object) || !A(function() {
          D = !0;
        }) || D;
      }) ? N : A;
    }, 6575: (h, g, s) => {
      var f = s(9297);
      h.exports = function(y) {
        return y !== void 0 && (f(y, "value") || f(y, "writable"));
      };
    }, 2796: (h, g, s) => {
      var f = s(9039), y = s(4901), m = /#|\.prototype\./, _ = function(S, L) {
        var T = C[j(S)];
        return T === E || T !== k && (y(L) ? f(L) : !!L);
      }, j = _.normalize = function(S) {
        return String(S).replace(m, ".").toLowerCase();
      }, C = _.data = {}, k = _.NATIVE = "N", E = _.POLYFILL = "P";
      h.exports = _;
    }, 4117: (h) => {
      h.exports = function(g) {
        return g == null;
      };
    }, 34: (h, g, s) => {
      var f = s(4901);
      h.exports = function(y) {
        return typeof y == "object" ? y !== null : f(y);
      };
    }, 3925: (h, g, s) => {
      var f = s(34);
      h.exports = function(y) {
        return f(y) || y === null;
      };
    }, 6395: (h) => {
      h.exports = !1;
    }, 788: (h, g, s) => {
      var f = s(34), y = s(4576), m = s(8227)("match");
      h.exports = function(_) {
        var j;
        return f(_) && ((j = _[m]) !== void 0 ? !!j : y(_) === "RegExp");
      };
    }, 757: (h, g, s) => {
      var f = s(7751), y = s(4901), m = s(1625), _ = s(7040), j = Object;
      h.exports = _ ? function(C) {
        return typeof C == "symbol";
      } : function(C) {
        var k = f("Symbol");
        return y(k) && m(k.prototype, j(C));
      };
    }, 2652: (h, g, s) => {
      var f = s(6080), y = s(9565), m = s(8551), _ = s(6823), j = s(4209), C = s(6198), k = s(1625), E = s(81), S = s(851), L = s(9539), T = TypeError, A = function(D, F) {
        this.stopped = D, this.result = F;
      }, N = A.prototype;
      h.exports = function(D, F, M) {
        var H, z, V, K, Z, re, ue, oe = M && M.that, ne = !(!M || !M.AS_ENTRIES), me = !(!M || !M.IS_RECORD), fe = !(!M || !M.IS_ITERATOR), ke = !(!M || !M.INTERRUPTED), Ee = f(F, oe), Se = function(Re) {
          return H && L(H, "normal", Re), new A(!0, Re);
        }, ye = function(Re) {
          return ne ? (m(Re), ke ? Ee(Re[0], Re[1], Se) : Ee(Re[0], Re[1])) : ke ? Ee(Re, Se) : Ee(Re);
        };
        if (me) H = D.iterator;
        else if (fe) H = D;
        else {
          if (!(z = S(D))) throw new T(_(D) + " is not iterable");
          if (j(z)) {
            for (V = 0, K = C(D); K > V; V++) if ((Z = ye(D[V])) && k(N, Z)) return Z;
            return new A(!1);
          }
          H = E(D, z);
        }
        for (re = me ? D.next : H.next; !(ue = y(re, H)).done; ) {
          try {
            Z = ye(ue.value);
          } catch (Re) {
            L(H, "throw", Re);
          }
          if (typeof Z == "object" && Z && k(N, Z)) return Z;
        }
        return new A(!1);
      };
    }, 9539: (h, g, s) => {
      var f = s(9565), y = s(8551), m = s(5966);
      h.exports = function(_, j, C) {
        var k, E;
        y(_);
        try {
          if (!(k = m(_, "return"))) {
            if (j === "throw") throw C;
            return C;
          }
          k = f(k, _);
        } catch (S) {
          E = !0, k = S;
        }
        if (j === "throw") throw C;
        if (E) throw k;
        return y(k), C;
      };
    }, 3994: (h, g, s) => {
      var f = s(7657).IteratorPrototype, y = s(2360), m = s(6980), _ = s(687), j = s(6269), C = function() {
        return this;
      };
      h.exports = function(k, E, S, L) {
        var T = E + " Iterator";
        return k.prototype = y(f, { next: m(+!L, S) }), _(k, T, !1, !0), j[T] = C, k;
      };
    }, 1088: (h, g, s) => {
      var f = s(6518), y = s(9565), m = s(6395), _ = s(350), j = s(4901), C = s(3994), k = s(2787), E = s(2967), S = s(687), L = s(6699), T = s(6840), A = s(8227), N = s(6269), D = s(7657), F = _.PROPER, M = _.CONFIGURABLE, H = D.IteratorPrototype, z = D.BUGGY_SAFARI_ITERATORS, V = A("iterator"), K = "keys", Z = "values", re = "entries", ue = function() {
        return this;
      };
      h.exports = function(oe, ne, me, fe, ke, Ee, Se) {
        C(me, ne, fe);
        var ye, Re, Pe, Fe = function(B) {
          if (B === ke && Ue) return Ue;
          if (!z && B && B in Ve) return Ve[B];
          switch (B) {
            case K:
            case Z:
            case re:
              return function() {
                return new me(this, B);
              };
          }
          return function() {
            return new me(this);
          };
        }, Ye = ne + " Iterator", tt = !1, Ve = oe.prototype, Te = Ve[V] || Ve["@@iterator"] || ke && Ve[ke], Ue = !z && Te || Fe(ke), R = ne === "Array" && Ve.entries || Te;
        if (R && (ye = k(R.call(new oe()))) !== Object.prototype && ye.next && (m || k(ye) === H || (E ? E(ye, H) : j(ye[V]) || T(ye, V, ue)), S(ye, Ye, !0, !0), m && (N[Ye] = ue)), F && ke === Z && Te && Te.name !== Z && (!m && M ? L(Ve, "name", Z) : (tt = !0, Ue = function() {
          return y(Te, this);
        })), ke) if (Re = { values: Fe(Z), keys: Ee ? Ue : Fe(K), entries: Fe(re) }, Se) for (Pe in Re) (z || tt || !(Pe in Ve)) && T(Ve, Pe, Re[Pe]);
        else f({ target: ne, proto: !0, forced: z || tt }, Re);
        return m && !Se || Ve[V] === Ue || T(Ve, V, Ue, { name: ke }), N[ne] = Ue, Re;
      };
    }, 7657: (h, g, s) => {
      var f, y, m, _ = s(9039), j = s(4901), C = s(34), k = s(2360), E = s(2787), S = s(6840), L = s(8227), T = s(6395), A = L("iterator"), N = !1;
      [].keys && ("next" in (m = [].keys()) ? (y = E(E(m))) !== Object.prototype && (f = y) : N = !0), !C(f) || _(function() {
        var D = {};
        return f[A].call(D) !== D;
      }) ? f = {} : T && (f = k(f)), j(f[A]) || S(f, A, function() {
        return this;
      }), h.exports = { IteratorPrototype: f, BUGGY_SAFARI_ITERATORS: N };
    }, 6269: (h) => {
      h.exports = {};
    }, 6198: (h, g, s) => {
      var f = s(8014);
      h.exports = function(y) {
        return f(y.length);
      };
    }, 283: (h, g, s) => {
      var f = s(9504), y = s(9039), m = s(4901), _ = s(9297), j = s(3724), C = s(350).CONFIGURABLE, k = s(3706), E = s(1181), S = E.enforce, L = E.get, T = String, A = Object.defineProperty, N = f("".slice), D = f("".replace), F = f([].join), M = j && !y(function() {
        return A(function() {
        }, "length", { value: 8 }).length !== 8;
      }), H = String(String).split("String"), z = h.exports = function(V, K, Z) {
        N(T(K), 0, 7) === "Symbol(" && (K = "[" + D(T(K), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), Z && Z.getter && (K = "get " + K), Z && Z.setter && (K = "set " + K), (!_(V, "name") || C && V.name !== K) && (j ? A(V, "name", { value: K, configurable: !0 }) : V.name = K), M && Z && _(Z, "arity") && V.length !== Z.arity && A(V, "length", { value: Z.arity });
        try {
          Z && _(Z, "constructor") && Z.constructor ? j && A(V, "prototype", { writable: !1 }) : V.prototype && (V.prototype = void 0);
        } catch {
        }
        var re = S(V);
        return _(re, "source") || (re.source = F(H, typeof K == "string" ? K : "")), V;
      };
      Function.prototype.toString = z(function() {
        return m(this) && L(this).source || k(this);
      }, "toString");
    }, 741: (h) => {
      var g = Math.ceil, s = Math.floor;
      h.exports = Math.trunc || function(f) {
        var y = +f;
        return (y > 0 ? s : g)(y);
      };
    }, 1955: (h, g, s) => {
      var f, y, m, _, j, C = s(4475), k = s(3389), E = s(6080), S = s(9225).set, L = s(8265), T = s(8119), A = s(28), N = s(6765), D = s(9088), F = C.MutationObserver || C.WebKitMutationObserver, M = C.document, H = C.process, z = C.Promise, V = k("queueMicrotask");
      if (!V) {
        var K = new L(), Z = function() {
          var re, ue;
          for (D && (re = H.domain) && re.exit(); ue = K.get(); ) try {
            ue();
          } catch (oe) {
            throw K.head && f(), oe;
          }
          re && re.enter();
        };
        T || D || N || !F || !M ? !A && z && z.resolve ? ((_ = z.resolve(void 0)).constructor = z, j = E(_.then, _), f = function() {
          j(Z);
        }) : D ? f = function() {
          H.nextTick(Z);
        } : (S = E(S, C), f = function() {
          S(Z);
        }) : (y = !0, m = M.createTextNode(""), new F(Z).observe(m, { characterData: !0 }), f = function() {
          m.data = y = !y;
        }), V = function(re) {
          K.head || f(), K.add(re);
        };
      }
      h.exports = V;
    }, 6043: (h, g, s) => {
      var f = s(9306), y = TypeError, m = function(_) {
        var j, C;
        this.promise = new _(function(k, E) {
          if (j !== void 0 || C !== void 0) throw new y("Bad Promise constructor");
          j = k, C = E;
        }), this.resolve = f(j), this.reject = f(C);
      };
      h.exports.f = function(_) {
        return new m(_);
      };
    }, 5749: (h, g, s) => {
      var f = s(788), y = TypeError;
      h.exports = function(m) {
        if (f(m)) throw new y("The method doesn't accept regular expressions");
        return m;
      };
    }, 3904: (h, g, s) => {
      var f = s(4475), y = s(9039), m = s(9504), _ = s(655), j = s(3802).trim, C = s(7452), k = m("".charAt), E = f.parseFloat, S = f.Symbol, L = S && S.iterator, T = 1 / E(C + "-0") != -1 / 0 || L && !y(function() {
        E(Object(L));
      });
      h.exports = T ? function(A) {
        var N = j(_(A)), D = E(N);
        return D === 0 && k(N, 0) === "-" ? -0 : D;
      } : E;
    }, 2703: (h, g, s) => {
      var f = s(4475), y = s(9039), m = s(9504), _ = s(655), j = s(3802).trim, C = s(7452), k = f.parseInt, E = f.Symbol, S = E && E.iterator, L = /^[+-]?0x/i, T = m(L.exec), A = k(C + "08") !== 8 || k(C + "0x16") !== 22 || S && !y(function() {
        k(Object(S));
      });
      h.exports = A ? function(N, D) {
        var F = j(_(N));
        return k(F, D >>> 0 || (T(L, F) ? 16 : 10));
      } : k;
    }, 4213: (h, g, s) => {
      var f = s(3724), y = s(9504), m = s(9565), _ = s(9039), j = s(1072), C = s(3717), k = s(8773), E = s(8981), S = s(7055), L = Object.assign, T = Object.defineProperty, A = y([].concat);
      h.exports = !L || _(function() {
        if (f && L({ b: 1 }, L(T({}, "a", { enumerable: !0, get: function() {
          T(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1) return !0;
        var N = {}, D = {}, F = Symbol("assign detection"), M = "abcdefghijklmnopqrst";
        return N[F] = 7, M.split("").forEach(function(H) {
          D[H] = H;
        }), L({}, N)[F] !== 7 || j(L({}, D)).join("") !== M;
      }) ? function(N, D) {
        for (var F = E(N), M = arguments.length, H = 1, z = C.f, V = k.f; M > H; ) for (var K, Z = S(arguments[H++]), re = z ? A(j(Z), z(Z)) : j(Z), ue = re.length, oe = 0; ue > oe; ) K = re[oe++], f && !m(V, Z, K) || (F[K] = Z[K]);
        return F;
      } : L;
    }, 2360: (h, g, s) => {
      var f, y = s(8551), m = s(6801), _ = s(8727), j = s(421), C = s(397), k = s(4055), E = s(6119), S = "prototype", L = "script", T = E("IE_PROTO"), A = function() {
      }, N = function(M) {
        return "<" + L + ">" + M + "</" + L + ">";
      }, D = function(M) {
        M.write(N("")), M.close();
        var H = M.parentWindow.Object;
        return M = null, H;
      }, F = function() {
        try {
          f = new ActiveXObject("htmlfile");
        } catch {
        }
        var M, H, z;
        F = typeof document < "u" ? document.domain && f ? D(f) : (H = k("iframe"), z = "java" + L + ":", H.style.display = "none", C.appendChild(H), H.src = String(z), (M = H.contentWindow.document).open(), M.write(N("document.F=Object")), M.close(), M.F) : D(f);
        for (var V = _.length; V--; ) delete F[S][_[V]];
        return F();
      };
      j[T] = !0, h.exports = Object.create || function(M, H) {
        var z;
        return M !== null ? (A[S] = y(M), z = new A(), A[S] = null, z[T] = M) : z = F(), H === void 0 ? z : m.f(z, H);
      };
    }, 6801: (h, g, s) => {
      var f = s(3724), y = s(8686), m = s(4913), _ = s(8551), j = s(5397), C = s(1072);
      g.f = f && !y ? Object.defineProperties : function(k, E) {
        _(k);
        for (var S, L = j(E), T = C(E), A = T.length, N = 0; A > N; ) m.f(k, S = T[N++], L[S]);
        return k;
      };
    }, 4913: (h, g, s) => {
      var f = s(3724), y = s(5917), m = s(8686), _ = s(8551), j = s(6969), C = TypeError, k = Object.defineProperty, E = Object.getOwnPropertyDescriptor, S = "enumerable", L = "configurable", T = "writable";
      g.f = f ? m ? function(A, N, D) {
        if (_(A), N = j(N), _(D), typeof A == "function" && N === "prototype" && "value" in D && T in D && !D[T]) {
          var F = E(A, N);
          F && F[T] && (A[N] = D.value, D = { configurable: L in D ? D[L] : F[L], enumerable: S in D ? D[S] : F[S], writable: !1 });
        }
        return k(A, N, D);
      } : k : function(A, N, D) {
        if (_(A), N = j(N), _(D), y) try {
          return k(A, N, D);
        } catch {
        }
        if ("get" in D || "set" in D) throw new C("Accessors not supported");
        return "value" in D && (A[N] = D.value), A;
      };
    }, 7347: (h, g, s) => {
      var f = s(3724), y = s(9565), m = s(8773), _ = s(6980), j = s(5397), C = s(6969), k = s(9297), E = s(5917), S = Object.getOwnPropertyDescriptor;
      g.f = f ? S : function(L, T) {
        if (L = j(L), T = C(T), E) try {
          return S(L, T);
        } catch {
        }
        if (k(L, T)) return _(!y(m.f, L, T), L[T]);
      };
    }, 298: (h, g, s) => {
      var f = s(4576), y = s(5397), m = s(8480).f, _ = s(7680), j = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      h.exports.f = function(C) {
        return j && f(C) === "Window" ? function(k) {
          try {
            return m(k);
          } catch {
            return _(j);
          }
        }(C) : m(y(C));
      };
    }, 8480: (h, g, s) => {
      var f = s(1828), y = s(8727).concat("length", "prototype");
      g.f = Object.getOwnPropertyNames || function(m) {
        return f(m, y);
      };
    }, 3717: (h, g) => {
      g.f = Object.getOwnPropertySymbols;
    }, 2787: (h, g, s) => {
      var f = s(9297), y = s(4901), m = s(8981), _ = s(6119), j = s(2211), C = _("IE_PROTO"), k = Object, E = k.prototype;
      h.exports = j ? k.getPrototypeOf : function(S) {
        var L = m(S);
        if (f(L, C)) return L[C];
        var T = L.constructor;
        return y(T) && L instanceof T ? T.prototype : L instanceof k ? E : null;
      };
    }, 1625: (h, g, s) => {
      var f = s(9504);
      h.exports = f({}.isPrototypeOf);
    }, 1828: (h, g, s) => {
      var f = s(9504), y = s(9297), m = s(5397), _ = s(9617).indexOf, j = s(421), C = f([].push);
      h.exports = function(k, E) {
        var S, L = m(k), T = 0, A = [];
        for (S in L) !y(j, S) && y(L, S) && C(A, S);
        for (; E.length > T; ) y(L, S = E[T++]) && (~_(A, S) || C(A, S));
        return A;
      };
    }, 1072: (h, g, s) => {
      var f = s(1828), y = s(8727);
      h.exports = Object.keys || function(m) {
        return f(m, y);
      };
    }, 8773: (h, g) => {
      var s = {}.propertyIsEnumerable, f = Object.getOwnPropertyDescriptor, y = f && !s.call({ 1: 2 }, 1);
      g.f = y ? function(m) {
        var _ = f(this, m);
        return !!_ && _.enumerable;
      } : s;
    }, 2967: (h, g, s) => {
      var f = s(6706), y = s(34), m = s(7750), _ = s(3506);
      h.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var j, C = !1, k = {};
        try {
          (j = f(Object.prototype, "__proto__", "set"))(k, []), C = k instanceof Array;
        } catch {
        }
        return function(E, S) {
          return m(E), _(S), y(E) && (C ? j(E, S) : E.__proto__ = S), E;
        };
      }() : void 0);
    }, 2357: (h, g, s) => {
      var f = s(3724), y = s(9039), m = s(9504), _ = s(2787), j = s(1072), C = s(5397), k = m(s(8773).f), E = m([].push), S = f && y(function() {
        var T = /* @__PURE__ */ Object.create(null);
        return T[2] = 2, !k(T, 2);
      }), L = function(T) {
        return function(A) {
          for (var N, D = C(A), F = j(D), M = S && _(D) === null, H = F.length, z = 0, V = []; H > z; ) N = F[z++], f && !(M ? N in D : k(D, N)) || E(V, T ? [N, D[N]] : D[N]);
          return V;
        };
      };
      h.exports = { entries: L(!0), values: L(!1) };
    }, 3179: (h, g, s) => {
      var f = s(2140), y = s(6955);
      h.exports = f ? {}.toString : function() {
        return "[object " + y(this) + "]";
      };
    }, 4270: (h, g, s) => {
      var f = s(9565), y = s(4901), m = s(34), _ = TypeError;
      h.exports = function(j, C) {
        var k, E;
        if (C === "string" && y(k = j.toString) && !m(E = f(k, j)) || y(k = j.valueOf) && !m(E = f(k, j)) || C !== "string" && y(k = j.toString) && !m(E = f(k, j))) return E;
        throw new _("Can't convert object to primitive value");
      };
    }, 5031: (h, g, s) => {
      var f = s(7751), y = s(9504), m = s(8480), _ = s(3717), j = s(8551), C = y([].concat);
      h.exports = f("Reflect", "ownKeys") || function(k) {
        var E = m.f(j(k)), S = _.f;
        return S ? C(E, S(k)) : E;
      };
    }, 9167: (h, g, s) => {
      var f = s(4475);
      h.exports = f;
    }, 1103: (h) => {
      h.exports = function(g) {
        try {
          return { error: !1, value: g() };
        } catch (s) {
          return { error: !0, value: s };
        }
      };
    }, 916: (h, g, s) => {
      var f = s(4475), y = s(550), m = s(4901), _ = s(2796), j = s(3706), C = s(8227), k = s(7290), E = s(516), S = s(6395), L = s(7388), T = y && y.prototype, A = C("species"), N = !1, D = m(f.PromiseRejectionEvent), F = _("Promise", function() {
        var M = j(y), H = M !== String(y);
        if (!H && L === 66 || S && (!T.catch || !T.finally)) return !0;
        if (!L || L < 51 || !/native code/.test(M)) {
          var z = new y(function(K) {
            K(1);
          }), V = function(K) {
            K(function() {
            }, function() {
            });
          };
          if ((z.constructor = {})[A] = V, !(N = z.then(function() {
          }) instanceof V)) return !0;
        }
        return !H && (k || E) && !D;
      });
      h.exports = { CONSTRUCTOR: F, REJECTION_EVENT: D, SUBCLASSING: N };
    }, 550: (h, g, s) => {
      var f = s(4475);
      h.exports = f.Promise;
    }, 3438: (h, g, s) => {
      var f = s(8551), y = s(34), m = s(6043);
      h.exports = function(_, j) {
        if (f(_), y(j) && j.constructor === _) return j;
        var C = m.f(_);
        return (0, C.resolve)(j), C.promise;
      };
    }, 537: (h, g, s) => {
      var f = s(550), y = s(4428), m = s(916).CONSTRUCTOR;
      h.exports = m || !y(function(_) {
        f.all(_).then(void 0, function() {
        });
      });
    }, 1056: (h, g, s) => {
      var f = s(4913).f;
      h.exports = function(y, m, _) {
        _ in y || f(y, _, { configurable: !0, get: function() {
          return m[_];
        }, set: function(j) {
          m[_] = j;
        } });
      };
    }, 8265: (h) => {
      var g = function() {
        this.head = null, this.tail = null;
      };
      g.prototype = { add: function(s) {
        var f = { item: s, next: null }, y = this.tail;
        y ? y.next = f : this.head = f, this.tail = f;
      }, get: function() {
        var s = this.head;
        if (s) return (this.head = s.next) === null && (this.tail = null), s.item;
      } }, h.exports = g;
    }, 6682: (h, g, s) => {
      var f = s(9565), y = s(8551), m = s(4901), _ = s(4576), j = s(7323), C = TypeError;
      h.exports = function(k, E) {
        var S = k.exec;
        if (m(S)) {
          var L = f(S, k, E);
          return L !== null && y(L), L;
        }
        if (_(k) === "RegExp") return f(j, k, E);
        throw new C("RegExp#exec called on incompatible receiver");
      };
    }, 7323: (h, g, s) => {
      var f, y, m = s(9565), _ = s(9504), j = s(655), C = s(7979), k = s(8429), E = s(5745), S = s(2360), L = s(1181).get, T = s(3635), A = s(8814), N = E("native-string-replace", String.prototype.replace), D = RegExp.prototype.exec, F = D, M = _("".charAt), H = _("".indexOf), z = _("".replace), V = _("".slice), K = (y = /b*/g, m(D, f = /a/, "a"), m(D, y, "a"), f.lastIndex !== 0 || y.lastIndex !== 0), Z = k.BROKEN_CARET, re = /()??/.exec("")[1] !== void 0;
      (K || re || Z || T || A) && (F = function(ue) {
        var oe, ne, me, fe, ke, Ee, Se, ye = this, Re = L(ye), Pe = j(ue), Fe = Re.raw;
        if (Fe) return Fe.lastIndex = ye.lastIndex, oe = m(F, Fe, Pe), ye.lastIndex = Fe.lastIndex, oe;
        var Ye = Re.groups, tt = Z && ye.sticky, Ve = m(C, ye), Te = ye.source, Ue = 0, R = Pe;
        if (tt && (Ve = z(Ve, "y", ""), H(Ve, "g") === -1 && (Ve += "g"), R = V(Pe, ye.lastIndex), ye.lastIndex > 0 && (!ye.multiline || ye.multiline && M(Pe, ye.lastIndex - 1) !== `
`) && (Te = "(?: " + Te + ")", R = " " + R, Ue++), ne = new RegExp("^(?:" + Te + ")", Ve)), re && (ne = new RegExp("^" + Te + "$(?!\\s)", Ve)), K && (me = ye.lastIndex), fe = m(D, tt ? ne : ye, R), tt ? fe ? (fe.input = V(fe.input, Ue), fe[0] = V(fe[0], Ue), fe.index = ye.lastIndex, ye.lastIndex += fe[0].length) : ye.lastIndex = 0 : K && fe && (ye.lastIndex = ye.global ? fe.index + fe[0].length : me), re && fe && fe.length > 1 && m(N, fe[0], ne, function() {
          for (ke = 1; ke < arguments.length - 2; ke++) arguments[ke] === void 0 && (fe[ke] = void 0);
        }), fe && Ye) for (fe.groups = Ee = S(null), ke = 0; ke < Ye.length; ke++) Ee[(Se = Ye[ke])[0]] = fe[Se[1]];
        return fe;
      }), h.exports = F;
    }, 7979: (h, g, s) => {
      var f = s(8551);
      h.exports = function() {
        var y = f(this), m = "";
        return y.hasIndices && (m += "d"), y.global && (m += "g"), y.ignoreCase && (m += "i"), y.multiline && (m += "m"), y.dotAll && (m += "s"), y.unicode && (m += "u"), y.unicodeSets && (m += "v"), y.sticky && (m += "y"), m;
      };
    }, 1034: (h, g, s) => {
      var f = s(9565), y = s(9297), m = s(1625), _ = s(7979), j = RegExp.prototype;
      h.exports = function(C) {
        var k = C.flags;
        return k !== void 0 || "flags" in j || y(C, "flags") || !m(j, C) ? k : f(_, C);
      };
    }, 8429: (h, g, s) => {
      var f = s(9039), y = s(4475).RegExp, m = f(function() {
        var C = y("a", "y");
        return C.lastIndex = 2, C.exec("abcd") !== null;
      }), _ = m || f(function() {
        return !y("a", "y").sticky;
      }), j = m || f(function() {
        var C = y("^r", "gy");
        return C.lastIndex = 2, C.exec("str") !== null;
      });
      h.exports = { BROKEN_CARET: j, MISSED_STICKY: _, UNSUPPORTED_Y: m };
    }, 3635: (h, g, s) => {
      var f = s(9039), y = s(4475).RegExp;
      h.exports = f(function() {
        var m = y(".", "s");
        return !(m.dotAll && m.test(`
`) && m.flags === "s");
      });
    }, 8814: (h, g, s) => {
      var f = s(9039), y = s(4475).RegExp;
      h.exports = f(function() {
        var m = y("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, 7750: (h, g, s) => {
      var f = s(4117), y = TypeError;
      h.exports = function(m) {
        if (f(m)) throw new y("Can't call method on " + m);
        return m;
      };
    }, 3389: (h, g, s) => {
      var f = s(4475), y = s(3724), m = Object.getOwnPropertyDescriptor;
      h.exports = function(_) {
        if (!y) return f[_];
        var j = m(f, _);
        return j && j.value;
      };
    }, 9472: (h, g, s) => {
      var f, y = s(4475), m = s(8745), _ = s(4901), j = s(6763), C = s(9392), k = s(7680), E = s(2812), S = y.Function, L = /MSIE .\./.test(C) || j && ((f = y.Bun.version.split(".")).length < 3 || f[0] === "0" && (f[1] < 3 || f[1] === "3" && f[2] === "0"));
      h.exports = function(T, A) {
        var N = A ? 2 : 1;
        return L ? function(D, F) {
          var M = E(arguments.length, 1) > N, H = _(D) ? D : S(D), z = M ? k(arguments, N) : [], V = M ? function() {
            m(H, this, z);
          } : H;
          return A ? T(V, F) : T(V);
        } : T;
      };
    }, 7633: (h, g, s) => {
      var f = s(7751), y = s(2106), m = s(8227), _ = s(3724), j = m("species");
      h.exports = function(C) {
        var k = f(C);
        _ && k && !k[j] && y(k, j, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, 687: (h, g, s) => {
      var f = s(4913).f, y = s(9297), m = s(8227)("toStringTag");
      h.exports = function(_, j, C) {
        _ && !C && (_ = _.prototype), _ && !y(_, m) && f(_, m, { configurable: !0, value: j });
      };
    }, 6119: (h, g, s) => {
      var f = s(5745), y = s(3392), m = f("keys");
      h.exports = function(_) {
        return m[_] || (m[_] = y(_));
      };
    }, 7629: (h, g, s) => {
      var f = s(6395), y = s(4475), m = s(9433), _ = "__core-js_shared__", j = h.exports = y[_] || m(_, {});
      (j.versions || (j.versions = [])).push({ version: "3.36.1", mode: f ? "pure" : "global", copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE", source: "https://github.com/zloirock/core-js" });
    }, 5745: (h, g, s) => {
      var f = s(7629);
      h.exports = function(y, m) {
        return f[y] || (f[y] = m || {});
      };
    }, 2293: (h, g, s) => {
      var f = s(8551), y = s(5548), m = s(4117), _ = s(8227)("species");
      h.exports = function(j, C) {
        var k, E = f(j).constructor;
        return E === void 0 || m(k = f(E)[_]) ? C : y(k);
      };
    }, 8183: (h, g, s) => {
      var f = s(9504), y = s(1291), m = s(655), _ = s(7750), j = f("".charAt), C = f("".charCodeAt), k = f("".slice), E = function(S) {
        return function(L, T) {
          var A, N, D = m(_(L)), F = y(T), M = D.length;
          return F < 0 || F >= M ? S ? "" : void 0 : (A = C(D, F)) < 55296 || A > 56319 || F + 1 === M || (N = C(D, F + 1)) < 56320 || N > 57343 ? S ? j(D, F) : A : S ? k(D, F, F + 2) : N - 56320 + (A - 55296 << 10) + 65536;
        };
      };
      h.exports = { codeAt: E(!1), charAt: E(!0) };
    }, 533: (h, g, s) => {
      var f = s(9504), y = s(8014), m = s(655), _ = s(2333), j = s(7750), C = f(_), k = f("".slice), E = Math.ceil, S = function(L) {
        return function(T, A, N) {
          var D, F, M = m(j(T)), H = y(A), z = M.length, V = N === void 0 ? " " : m(N);
          return H <= z || V === "" ? M : ((F = C(V, E((D = H - z) / V.length))).length > D && (F = k(F, 0, D)), L ? M + F : F + M);
        };
      };
      h.exports = { start: S(!1), end: S(!0) };
    }, 2333: (h, g, s) => {
      var f = s(1291), y = s(655), m = s(7750), _ = RangeError;
      h.exports = function(j) {
        var C = y(m(this)), k = "", E = f(j);
        if (E < 0 || E === 1 / 0) throw new _("Wrong number of repetitions");
        for (; E > 0; (E >>>= 1) && (C += C)) 1 & E && (k += C);
        return k;
      };
    }, 706: (h, g, s) => {
      var f = s(350).PROPER, y = s(9039), m = s(7452);
      h.exports = function(_) {
        return y(function() {
          return !!m[_]() || "​᠎"[_]() !== "​᠎" || f && m[_].name !== _;
        });
      };
    }, 3802: (h, g, s) => {
      var f = s(9504), y = s(7750), m = s(655), _ = s(7452), j = f("".replace), C = RegExp("^[" + _ + "]+"), k = RegExp("(^|[^" + _ + "])[" + _ + "]+$"), E = function(S) {
        return function(L) {
          var T = m(y(L));
          return 1 & S && (T = j(T, C, "")), 2 & S && (T = j(T, k, "$1")), T;
        };
      };
      h.exports = { start: E(1), end: E(2), trim: E(3) };
    }, 4495: (h, g, s) => {
      var f = s(7388), y = s(9039), m = s(4475).String;
      h.exports = !!Object.getOwnPropertySymbols && !y(function() {
        var _ = Symbol("symbol detection");
        return !m(_) || !(Object(_) instanceof Symbol) || !Symbol.sham && f && f < 41;
      });
    }, 8242: (h, g, s) => {
      var f = s(9565), y = s(7751), m = s(8227), _ = s(6840);
      h.exports = function() {
        var j = y("Symbol"), C = j && j.prototype, k = C && C.valueOf, E = m("toPrimitive");
        C && !C[E] && _(C, E, function(S) {
          return f(k, this);
        }, { arity: 1 });
      };
    }, 1296: (h, g, s) => {
      var f = s(4495);
      h.exports = f && !!Symbol.for && !!Symbol.keyFor;
    }, 9225: (h, g, s) => {
      var f, y, m, _, j = s(4475), C = s(8745), k = s(6080), E = s(4901), S = s(9297), L = s(9039), T = s(397), A = s(7680), N = s(4055), D = s(2812), F = s(8119), M = s(9088), H = j.setImmediate, z = j.clearImmediate, V = j.process, K = j.Dispatch, Z = j.Function, re = j.MessageChannel, ue = j.String, oe = 0, ne = {}, me = "onreadystatechange";
      L(function() {
        f = j.location;
      });
      var fe = function(ye) {
        if (S(ne, ye)) {
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
        j.postMessage(ue(ye), f.protocol + "//" + f.host);
      };
      H && z || (H = function(ye) {
        D(arguments.length, 1);
        var Re = E(ye) ? ye : Z(ye), Pe = A(arguments, 1);
        return ne[++oe] = function() {
          C(Re, void 0, Pe);
        }, y(oe), oe;
      }, z = function(ye) {
        delete ne[ye];
      }, M ? y = function(ye) {
        V.nextTick(ke(ye));
      } : K && K.now ? y = function(ye) {
        K.now(ke(ye));
      } : re && !F ? (_ = (m = new re()).port2, m.port1.onmessage = Ee, y = k(_.postMessage, _)) : j.addEventListener && E(j.postMessage) && !j.importScripts && f && f.protocol !== "file:" && !L(Se) ? (y = Se, j.addEventListener("message", Ee, !1)) : y = me in N("script") ? function(ye) {
        T.appendChild(N("script"))[me] = function() {
          T.removeChild(this), fe(ye);
        };
      } : function(ye) {
        setTimeout(ke(ye), 0);
      }), h.exports = { set: H, clear: z };
    }, 1240: (h, g, s) => {
      var f = s(9504);
      h.exports = f(1 .valueOf);
    }, 5610: (h, g, s) => {
      var f = s(1291), y = Math.max, m = Math.min;
      h.exports = function(_, j) {
        var C = f(_);
        return C < 0 ? y(C + j, 0) : m(C, j);
      };
    }, 5397: (h, g, s) => {
      var f = s(7055), y = s(7750);
      h.exports = function(m) {
        return f(y(m));
      };
    }, 1291: (h, g, s) => {
      var f = s(741);
      h.exports = function(y) {
        var m = +y;
        return m != m || m === 0 ? 0 : f(m);
      };
    }, 8014: (h, g, s) => {
      var f = s(1291), y = Math.min;
      h.exports = function(m) {
        var _ = f(m);
        return _ > 0 ? y(_, 9007199254740991) : 0;
      };
    }, 8981: (h, g, s) => {
      var f = s(7750), y = Object;
      h.exports = function(m) {
        return y(f(m));
      };
    }, 2777: (h, g, s) => {
      var f = s(9565), y = s(34), m = s(757), _ = s(5966), j = s(4270), C = s(8227), k = TypeError, E = C("toPrimitive");
      h.exports = function(S, L) {
        if (!y(S) || m(S)) return S;
        var T, A = _(S, E);
        if (A) {
          if (L === void 0 && (L = "default"), T = f(A, S, L), !y(T) || m(T)) return T;
          throw new k("Can't convert object to primitive value");
        }
        return L === void 0 && (L = "number"), j(S, L);
      };
    }, 6969: (h, g, s) => {
      var f = s(2777), y = s(757);
      h.exports = function(m) {
        var _ = f(m, "string");
        return y(_) ? _ : _ + "";
      };
    }, 2140: (h, g, s) => {
      var f = {};
      f[s(8227)("toStringTag")] = "z", h.exports = String(f) === "[object z]";
    }, 655: (h, g, s) => {
      var f = s(6955), y = String;
      h.exports = function(m) {
        if (f(m) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
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
      var f = s(9504), y = 0, m = Math.random(), _ = f(1 .toString);
      h.exports = function(j) {
        return "Symbol(" + (j === void 0 ? "" : j) + ")_" + _(++y + m, 36);
      };
    }, 7040: (h, g, s) => {
      var f = s(4495);
      h.exports = f && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, 8686: (h, g, s) => {
      var f = s(3724), y = s(9039);
      h.exports = f && y(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype !== 42;
      });
    }, 2812: (h) => {
      var g = TypeError;
      h.exports = function(s, f) {
        if (s < f) throw new g("Not enough arguments");
        return s;
      };
    }, 8622: (h, g, s) => {
      var f = s(4475), y = s(4901), m = f.WeakMap;
      h.exports = y(m) && /native code/.test(String(m));
    }, 511: (h, g, s) => {
      var f = s(9167), y = s(9297), m = s(1951), _ = s(4913).f;
      h.exports = function(j) {
        var C = f.Symbol || (f.Symbol = {});
        y(C, j) || _(C, j, { value: m.f(j) });
      };
    }, 1951: (h, g, s) => {
      var f = s(8227);
      g.f = f;
    }, 8227: (h, g, s) => {
      var f = s(4475), y = s(5745), m = s(9297), _ = s(3392), j = s(4495), C = s(7040), k = f.Symbol, E = y("wks"), S = C ? k.for || k : k && k.withoutSetter || _;
      h.exports = function(L) {
        return m(E, L) || (E[L] = j && m(k, L) ? k[L] : S("Symbol." + L)), E[L];
      };
    }, 7452: (h) => {
      h.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
    }, 8706: (h, g, s) => {
      var f = s(6518), y = s(9039), m = s(4376), _ = s(34), j = s(8981), C = s(6198), k = s(6837), E = s(4659), S = s(1469), L = s(597), T = s(8227), A = s(7388), N = T("isConcatSpreadable"), D = A >= 51 || !y(function() {
        var M = [];
        return M[N] = !1, M.concat()[0] !== M;
      }), F = function(M) {
        if (!_(M)) return !1;
        var H = M[N];
        return H !== void 0 ? !!H : m(M);
      };
      f({ target: "Array", proto: !0, arity: 1, forced: !D || !L("concat") }, { concat: function(M) {
        var H, z, V, K, Z, re = j(this), ue = S(re, 0), oe = 0;
        for (H = -1, V = arguments.length; H < V; H++) if (F(Z = H === -1 ? re : arguments[H])) for (K = C(Z), k(oe + K), z = 0; z < K; z++, oe++) z in Z && E(ue, oe, Z[z]);
        else k(oe + 1), E(ue, oe++, Z);
        return ue.length = oe, ue;
      } });
    }, 8431: (h, g, s) => {
      var f = s(6518), y = s(9213).every;
      f({ target: "Array", proto: !0, forced: !s(4598)("every") }, { every: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2008: (h, g, s) => {
      var f = s(6518), y = s(9213).filter;
      f({ target: "Array", proto: !0, forced: !s(597)("filter") }, { filter: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 113: (h, g, s) => {
      var f = s(6518), y = s(9213).find, m = s(6469), _ = "find", j = !0;
      _ in [] && Array(1)[_](function() {
        j = !1;
      }), f({ target: "Array", proto: !0, forced: j }, { find: function(C) {
        return y(this, C, arguments.length > 1 ? arguments[1] : void 0);
      } }), m(_);
    }, 1629: (h, g, s) => {
      var f = s(6518), y = s(235);
      f({ target: "Array", proto: !0, forced: [].forEach !== y }, { forEach: y });
    }, 3418: (h, g, s) => {
      var f = s(6518), y = s(7916);
      f({ target: "Array", stat: !0, forced: !s(4428)(function(m) {
        Array.from(m);
      }) }, { from: y });
    }, 4423: (h, g, s) => {
      var f = s(6518), y = s(9617).includes, m = s(9039), _ = s(6469);
      f({ target: "Array", proto: !0, forced: m(function() {
        return !Array(1).includes();
      }) }, { includes: function(j) {
        return y(this, j, arguments.length > 1 ? arguments[1] : void 0);
      } }), _("includes");
    }, 5276: (h, g, s) => {
      var f = s(6518), y = s(7476), m = s(9617).indexOf, _ = s(4598), j = y([].indexOf), C = !!j && 1 / j([1], 1, -0) < 0;
      f({ target: "Array", proto: !0, forced: C || !_("indexOf") }, { indexOf: function(k) {
        var E = arguments.length > 1 ? arguments[1] : void 0;
        return C ? j(this, k, E) || 0 : m(this, k, E);
      } });
    }, 4346: (h, g, s) => {
      s(6518)({ target: "Array", stat: !0 }, { isArray: s(4376) });
    }, 3792: (h, g, s) => {
      var f = s(5397), y = s(6469), m = s(6269), _ = s(1181), j = s(4913).f, C = s(1088), k = s(2529), E = s(6395), S = s(3724), L = "Array Iterator", T = _.set, A = _.getterFor(L);
      h.exports = C(Array, "Array", function(D, F) {
        T(this, { type: L, target: f(D), index: 0, kind: F });
      }, function() {
        var D = A(this), F = D.target, M = D.index++;
        if (!F || M >= F.length) return D.target = void 0, k(void 0, !0);
        switch (D.kind) {
          case "keys":
            return k(M, !1);
          case "values":
            return k(F[M], !1);
        }
        return k([M, F[M]], !1);
      }, "values");
      var N = m.Arguments = m.Array;
      if (y("keys"), y("values"), y("entries"), !E && S && N.name !== "values") try {
        j(N, "name", { value: "values" });
      } catch {
      }
    }, 8598: (h, g, s) => {
      var f = s(6518), y = s(9504), m = s(7055), _ = s(5397), j = s(4598), C = y([].join);
      f({ target: "Array", proto: !0, forced: m !== Object || !j("join", ",") }, { join: function(k) {
        return C(_(this), k === void 0 ? "," : k);
      } });
    }, 2062: (h, g, s) => {
      var f = s(6518), y = s(9213).map;
      f({ target: "Array", proto: !0, forced: !s(597)("map") }, { map: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 2712: (h, g, s) => {
      var f = s(6518), y = s(926).left, m = s(4598), _ = s(7388);
      f({ target: "Array", proto: !0, forced: !s(9088) && _ > 79 && _ < 83 || !m("reduce") }, { reduce: function(j) {
        var C = arguments.length;
        return y(this, j, C, C > 1 ? arguments[1] : void 0);
      } });
    }, 4490: (h, g, s) => {
      var f = s(6518), y = s(9504), m = s(4376), _ = y([].reverse), j = [1, 2];
      f({ target: "Array", proto: !0, forced: String(j) === String(j.reverse()) }, { reverse: function() {
        return m(this) && (this.length = this.length), _(this);
      } });
    }, 4782: (h, g, s) => {
      var f = s(6518), y = s(4376), m = s(3517), _ = s(34), j = s(5610), C = s(6198), k = s(5397), E = s(4659), S = s(8227), L = s(597), T = s(7680), A = L("slice"), N = S("species"), D = Array, F = Math.max;
      f({ target: "Array", proto: !0, forced: !A }, { slice: function(M, H) {
        var z, V, K, Z = k(this), re = C(Z), ue = j(M, re), oe = j(H === void 0 ? re : H, re);
        if (y(Z) && (z = Z.constructor, (m(z) && (z === D || y(z.prototype)) || _(z) && (z = z[N]) === null) && (z = void 0), z === D || z === void 0)) return T(Z, ue, oe);
        for (V = new (z === void 0 ? D : z)(F(oe - ue, 0)), K = 0; ue < oe; ue++, K++) ue in Z && E(V, K, Z[ue]);
        return V.length = K, V;
      } });
    }, 5086: (h, g, s) => {
      var f = s(6518), y = s(9213).some;
      f({ target: "Array", proto: !0, forced: !s(4598)("some") }, { some: function(m) {
        return y(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 6910: (h, g, s) => {
      var f = s(6518), y = s(9504), m = s(9306), _ = s(8981), j = s(6198), C = s(4606), k = s(655), E = s(9039), S = s(4488), L = s(4598), T = s(8834), A = s(3202), N = s(7388), D = s(9160), F = [], M = y(F.sort), H = y(F.push), z = E(function() {
        F.sort(void 0);
      }), V = E(function() {
        F.sort(null);
      }), K = L("sort"), Z = !E(function() {
        if (N) return N < 70;
        if (!(T && T > 3)) {
          if (A) return !0;
          if (D) return D < 603;
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
            for (ne = 0; ne < 47; ne++) F.push({ k: ue + ne, v: oe });
          }
          for (F.sort(function(fe, ke) {
            return ke.v - fe.v;
          }), ne = 0; ne < F.length; ne++) ue = F[ne].k.charAt(0), me.charAt(me.length - 1) !== ue && (me += ue);
          return me !== "DGBEFHACIJK";
        }
      });
      f({ target: "Array", proto: !0, forced: z || !V || !K || !Z }, { sort: function(re) {
        re !== void 0 && m(re);
        var ue = _(this);
        if (Z) return re === void 0 ? M(ue) : M(ue, re);
        var oe, ne, me = [], fe = j(ue);
        for (ne = 0; ne < fe; ne++) ne in ue && H(me, ue[ne]);
        for (S(me, /* @__PURE__ */ function(ke) {
          return function(Ee, Se) {
            return Se === void 0 ? -1 : Ee === void 0 ? 1 : ke !== void 0 ? +ke(Ee, Se) || 0 : k(Ee) > k(Se) ? 1 : -1;
          };
        }(re)), oe = j(me), ne = 0; ne < oe; ) ue[ne] = me[ne++];
        for (; ne < fe; ) C(ue, ne++);
        return ue;
      } });
    }, 4554: (h, g, s) => {
      var f = s(6518), y = s(8981), m = s(5610), _ = s(1291), j = s(6198), C = s(4527), k = s(6837), E = s(1469), S = s(4659), L = s(4606), T = s(597)("splice"), A = Math.max, N = Math.min;
      f({ target: "Array", proto: !0, forced: !T }, { splice: function(D, F) {
        var M, H, z, V, K, Z, re = y(this), ue = j(re), oe = m(D, ue), ne = arguments.length;
        for (ne === 0 ? M = H = 0 : ne === 1 ? (M = 0, H = ue - oe) : (M = ne - 2, H = N(A(_(F), 0), ue - oe)), k(ue + M - H), z = E(re, H), V = 0; V < H; V++) (K = oe + V) in re && S(z, V, re[K]);
        if (z.length = H, M < H) {
          for (V = oe; V < ue - H; V++) Z = V + M, (K = V + H) in re ? re[Z] = re[K] : L(re, Z);
          for (V = ue; V > ue - H + M; V--) L(re, V - 1);
        } else if (M > H) for (V = ue - H; V > oe; V--) Z = V + M - 1, (K = V + H - 1) in re ? re[Z] = re[K] : L(re, Z);
        for (V = 0; V < M; V++) re[V + oe] = arguments[V + 2];
        return C(re, ue - H + M), z;
      } });
    }, 1688: (h, g, s) => {
      var f = s(6518), y = s(380);
      f({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== y }, { toISOString: y });
    }, 739: (h, g, s) => {
      var f = s(6518), y = s(9039), m = s(8981), _ = s(2777);
      f({ target: "Date", proto: !0, arity: 1, forced: y(function() {
        return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
          return 1;
        } }) !== 1;
      }) }, { toJSON: function(j) {
        var C = m(this), k = _(C, "number");
        return typeof k != "number" || isFinite(k) ? C.toISOString() : null;
      } });
    }, 9572: (h, g, s) => {
      var f = s(9297), y = s(6840), m = s(3640), _ = s(8227)("toPrimitive"), j = Date.prototype;
      f(j, _) || y(j, _, m);
    }, 3288: (h, g, s) => {
      var f = s(9504), y = s(6840), m = Date.prototype, _ = "Invalid Date", j = "toString", C = f(m[j]), k = f(m.getTime);
      String(/* @__PURE__ */ new Date(NaN)) !== _ && y(m, j, function() {
        var E = k(this);
        return E == E ? C(this) : _;
      });
    }, 4170: (h, g, s) => {
      var f = s(6518), y = s(566);
      f({ target: "Function", proto: !0, forced: Function.bind !== y }, { bind: y });
    }, 2010: (h, g, s) => {
      var f = s(3724), y = s(350).EXISTS, m = s(9504), _ = s(2106), j = Function.prototype, C = m(j.toString), k = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, E = m(k.exec);
      f && !y && _(j, "name", { configurable: !0, get: function() {
        try {
          return E(k, C(this))[1];
        } catch {
          return "";
        }
      } });
    }, 3110: (h, g, s) => {
      var f = s(6518), y = s(7751), m = s(8745), _ = s(9565), j = s(9504), C = s(9039), k = s(4901), E = s(757), S = s(7680), L = s(6933), T = s(4495), A = String, N = y("JSON", "stringify"), D = j(/./.exec), F = j("".charAt), M = j("".charCodeAt), H = j("".replace), z = j(1 .toString), V = /[\uD800-\uDFFF]/g, K = /^[\uD800-\uDBFF]$/, Z = /^[\uDC00-\uDFFF]$/, re = !T || C(function() {
        var me = y("Symbol")("stringify detection");
        return N([me]) !== "[null]" || N({ a: me }) !== "{}" || N(Object(me)) !== "{}";
      }), ue = C(function() {
        return N("\uDF06\uD834") !== '"\\udf06\\ud834"' || N("\uDEAD") !== '"\\udead"';
      }), oe = function(me, fe) {
        var ke = S(arguments), Ee = L(fe);
        if (k(Ee) || me !== void 0 && !E(me)) return ke[1] = function(Se, ye) {
          if (k(Ee) && (ye = _(Ee, this, A(Se), ye)), !E(ye)) return ye;
        }, m(N, null, ke);
      }, ne = function(me, fe, ke) {
        var Ee = F(ke, fe - 1), Se = F(ke, fe + 1);
        return D(K, me) && !D(Z, Se) || D(Z, me) && !D(K, Ee) ? "\\u" + z(M(me, 0), 16) : me;
      };
      N && f({ target: "JSON", stat: !0, arity: 3, forced: re || ue }, { stringify: function(me, fe, ke) {
        var Ee = S(arguments), Se = m(re ? oe : N, null, Ee);
        return ue && typeof Se == "string" ? H(Se, V, ne) : Se;
      } });
    }, 4731: (h, g, s) => {
      var f = s(4475);
      s(687)(f.JSON, "JSON", !0);
    }, 479: (h, g, s) => {
      s(687)(Math, "Math", !0);
    }, 2892: (h, g, s) => {
      var f = s(6518), y = s(6395), m = s(3724), _ = s(4475), j = s(9167), C = s(9504), k = s(2796), E = s(9297), S = s(3167), L = s(1625), T = s(757), A = s(2777), N = s(9039), D = s(8480).f, F = s(7347).f, M = s(4913).f, H = s(1240), z = s(3802).trim, V = "Number", K = _[V], Z = j[V], re = K.prototype, ue = _.TypeError, oe = C("".slice), ne = C("".charCodeAt), me = k(V, !K(" 0o1") || !K("0b1") || K("+0x1")), fe = function(Ee) {
        var Se, ye = arguments.length < 1 ? 0 : K(function(Re) {
          var Pe = A(Re, "number");
          return typeof Pe == "bigint" ? Pe : function(Fe) {
            var Ye, tt, Ve, Te, Ue, R, B, W, Y = A(Fe, "number");
            if (T(Y)) throw new ue("Cannot convert a Symbol value to a number");
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
                for (R = (Ue = oe(Y, 2)).length, B = 0; B < R; B++) if ((W = ne(Ue, B)) < 48 || W > Te) return NaN;
                return parseInt(Ue, Ve);
              }
            }
            return +Y;
          }(Pe);
        }(Ee));
        return L(re, Se = this) && N(function() {
          H(Se);
        }) ? S(Object(ye), this, fe) : ye;
      };
      fe.prototype = re, me && !y && (re.constructor = fe), f({ global: !0, constructor: !0, wrap: !0, forced: me }, { Number: fe });
      var ke = function(Ee, Se) {
        for (var ye, Re = m ? D(Se) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), Pe = 0; Re.length > Pe; Pe++) E(Se, ye = Re[Pe]) && !E(Ee, ye) && M(Ee, ye, F(Se, ye));
      };
      y && Z && ke(j[V], Z), (me || y) && ke(j[V], K);
    }, 9868: (h, g, s) => {
      var f = s(6518), y = s(9504), m = s(1291), _ = s(1240), j = s(2333), C = s(9039), k = RangeError, E = String, S = Math.floor, L = y(j), T = y("".slice), A = y(1 .toFixed), N = function(H, z, V) {
        return z === 0 ? V : z % 2 == 1 ? N(H, z - 1, V * H) : N(H * H, z / 2, V);
      }, D = function(H, z, V) {
        for (var K = -1, Z = V; ++K < 6; ) Z += z * H[K], H[K] = Z % 1e7, Z = S(Z / 1e7);
      }, F = function(H, z) {
        for (var V = 6, K = 0; --V >= 0; ) K += H[V], H[V] = S(K / z), K = K % z * 1e7;
      }, M = function(H) {
        for (var z = 6, V = ""; --z >= 0; ) if (V !== "" || z === 0 || H[z] !== 0) {
          var K = E(H[z]);
          V = V === "" ? K : V + L("0", 7 - K.length) + K;
        }
        return V;
      };
      f({ target: "Number", proto: !0, forced: C(function() {
        return A(8e-5, 3) !== "0.000" || A(0.9, 0) !== "1" || A(1.255, 2) !== "1.25" || A(1000000000000000100, 0) !== "1000000000000000128";
      }) || !C(function() {
        A({});
      }) }, { toFixed: function(H) {
        var z, V, K, Z, re = _(this), ue = m(H), oe = [0, 0, 0, 0, 0, 0], ne = "", me = "0";
        if (ue < 0 || ue > 20) throw new k("Incorrect fraction digits");
        if (re != re) return "NaN";
        if (re <= -1e21 || re >= 1e21) return E(re);
        if (re < 0 && (ne = "-", re = -re), re > 1e-21) if (V = (z = function(fe) {
          for (var ke = 0, Ee = fe; Ee >= 4096; ) ke += 12, Ee /= 4096;
          for (; Ee >= 2; ) ke += 1, Ee /= 2;
          return ke;
        }(re * N(2, 69, 1)) - 69) < 0 ? re * N(2, -z, 1) : re / N(2, z, 1), V *= 4503599627370496, (z = 52 - z) > 0) {
          for (D(oe, 0, V), K = ue; K >= 7; ) D(oe, 1e7, 0), K -= 7;
          for (D(oe, N(10, K, 1), 0), K = z - 1; K >= 23; ) F(oe, 8388608), K -= 23;
          F(oe, 1 << K), D(oe, 1, 1), F(oe, 2), me = M(oe);
        } else D(oe, 0, V), D(oe, 1 << -z, 0), me = M(oe) + L("0", ue);
        return ue > 0 ? ne + ((Z = me.length) <= ue ? "0." + L("0", ue - Z) + me : T(me, 0, Z - ue) + "." + T(me, Z - ue)) : ne + me;
      } });
    }, 9085: (h, g, s) => {
      var f = s(6518), y = s(4213);
      f({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== y }, { assign: y });
    }, 9904: (h, g, s) => {
      s(6518)({ target: "Object", stat: !0, sham: !s(3724) }, { create: s(2360) });
    }, 7945: (h, g, s) => {
      var f = s(6518), y = s(3724), m = s(6801).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperties !== m, sham: !y }, { defineProperties: m });
    }, 4185: (h, g, s) => {
      var f = s(6518), y = s(3724), m = s(4913).f;
      f({ target: "Object", stat: !0, forced: Object.defineProperty !== m, sham: !y }, { defineProperty: m });
    }, 5506: (h, g, s) => {
      var f = s(6518), y = s(2357).entries;
      f({ target: "Object", stat: !0 }, { entries: function(m) {
        return y(m);
      } });
    }, 3851: (h, g, s) => {
      var f = s(6518), y = s(9039), m = s(5397), _ = s(7347).f, j = s(3724);
      f({ target: "Object", stat: !0, forced: !j || y(function() {
        _(1);
      }), sham: !j }, { getOwnPropertyDescriptor: function(C, k) {
        return _(m(C), k);
      } });
    }, 1278: (h, g, s) => {
      var f = s(6518), y = s(3724), m = s(5031), _ = s(5397), j = s(7347), C = s(4659);
      f({ target: "Object", stat: !0, sham: !y }, { getOwnPropertyDescriptors: function(k) {
        for (var E, S, L = _(k), T = j.f, A = m(L), N = {}, D = 0; A.length > D; ) (S = T(L, E = A[D++])) !== void 0 && C(N, E, S);
        return N;
      } });
    }, 9773: (h, g, s) => {
      var f = s(6518), y = s(4495), m = s(9039), _ = s(3717), j = s(8981);
      f({ target: "Object", stat: !0, forced: !y || m(function() {
        _.f(1);
      }) }, { getOwnPropertySymbols: function(C) {
        var k = _.f;
        return k ? k(j(C)) : [];
      } });
    }, 875: (h, g, s) => {
      var f = s(6518), y = s(9039), m = s(8981), _ = s(2787), j = s(2211);
      f({ target: "Object", stat: !0, forced: y(function() {
        _(1);
      }), sham: !j }, { getPrototypeOf: function(C) {
        return _(m(C));
      } });
    }, 9432: (h, g, s) => {
      var f = s(6518), y = s(8981), m = s(1072);
      f({ target: "Object", stat: !0, forced: s(9039)(function() {
        m(1);
      }) }, { keys: function(_) {
        return m(y(_));
      } });
    }, 287: (h, g, s) => {
      s(6518)({ target: "Object", stat: !0 }, { setPrototypeOf: s(2967) });
    }, 6099: (h, g, s) => {
      var f = s(2140), y = s(6840), m = s(3179);
      f || y(Object.prototype, "toString", m, { unsafe: !0 });
    }, 6034: (h, g, s) => {
      var f = s(6518), y = s(2357).values;
      f({ target: "Object", stat: !0 }, { values: function(m) {
        return y(m);
      } });
    }, 8459: (h, g, s) => {
      var f = s(6518), y = s(3904);
      f({ global: !0, forced: parseFloat !== y }, { parseFloat: y });
    }, 8940: (h, g, s) => {
      var f = s(6518), y = s(2703);
      f({ global: !0, forced: parseInt !== y }, { parseInt: y });
    }, 6499: (h, g, s) => {
      var f = s(6518), y = s(9565), m = s(9306), _ = s(6043), j = s(1103), C = s(2652);
      f({ target: "Promise", stat: !0, forced: s(537) }, { all: function(k) {
        var E = this, S = _.f(E), L = S.resolve, T = S.reject, A = j(function() {
          var N = m(E.resolve), D = [], F = 0, M = 1;
          C(k, function(H) {
            var z = F++, V = !1;
            M++, y(N, E, H).then(function(K) {
              V || (V = !0, D[z] = K, --M || L(D));
            }, T);
          }), --M || L(D);
        });
        return A.error && T(A.value), S.promise;
      } });
    }, 2003: (h, g, s) => {
      var f = s(6518), y = s(6395), m = s(916).CONSTRUCTOR, _ = s(550), j = s(7751), C = s(4901), k = s(6840), E = _ && _.prototype;
      if (f({ target: "Promise", proto: !0, forced: m, real: !0 }, { catch: function(L) {
        return this.then(void 0, L);
      } }), !y && C(_)) {
        var S = j("Promise").prototype.catch;
        E.catch !== S && k(E, "catch", S, { unsafe: !0 });
      }
    }, 436: (h, g, s) => {
      var f, y, m, _ = s(6518), j = s(6395), C = s(9088), k = s(4475), E = s(9565), S = s(6840), L = s(2967), T = s(687), A = s(7633), N = s(9306), D = s(4901), F = s(34), M = s(679), H = s(2293), z = s(9225).set, V = s(1955), K = s(3138), Z = s(1103), re = s(8265), ue = s(1181), oe = s(550), ne = s(916), me = s(6043), fe = "Promise", ke = ne.CONSTRUCTOR, Ee = ne.REJECTION_EVENT, Se = ne.SUBCLASSING, ye = ue.getterFor(fe), Re = ue.set, Pe = oe && oe.prototype, Fe = oe, Ye = Pe, tt = k.TypeError, Ve = k.document, Te = k.process, Ue = me.f, R = Ue, B = !!(Ve && Ve.createEvent && k.dispatchEvent), W = "unhandledrejection", Y = function(te) {
        var ae;
        return !(!F(te) || !D(ae = te.then)) && ae;
      }, Q = function(te, ae) {
        var ce, Oe, Ae, ze = ae.value, nt = ae.state === 1, ct = nt ? te.ok : te.fail, ft = te.resolve, yt = te.reject, Je = te.domain;
        try {
          ct ? (nt || (ae.rejection === 2 && ie(ae), ae.rejection = 1), ct === !0 ? ce = ze : (Je && Je.enter(), ce = ct(ze), Je && (Je.exit(), Ae = !0)), ce === te.promise ? yt(new tt("Promise-chain cycle")) : (Oe = Y(ce)) ? E(Oe, ce, ft, yt) : ft(ce)) : yt(ze);
        } catch (Ze) {
          Je && !Ae && Je.exit(), yt(Ze);
        }
      }, X = function(te, ae) {
        te.notified || (te.notified = !0, V(function() {
          for (var ce, Oe = te.reactions; ce = Oe.get(); ) Q(ce, te);
          te.notified = !1, ae && !te.rejection && he(te);
        }));
      }, de = function(te, ae, ce) {
        var Oe, Ae;
        B ? ((Oe = Ve.createEvent("Event")).promise = ae, Oe.reason = ce, Oe.initEvent(te, !1, !0), k.dispatchEvent(Oe)) : Oe = { promise: ae, reason: ce }, !Ee && (Ae = k["on" + te]) ? Ae(Oe) : te === W && K("Unhandled promise rejection", ce);
      }, he = function(te) {
        E(z, k, function() {
          var ae, ce = te.facade, Oe = te.value;
          if (le(te) && (ae = Z(function() {
            C ? Te.emit("unhandledRejection", Oe, ce) : de(W, ce, Oe);
          }), te.rejection = C || le(te) ? 2 : 1, ae.error)) throw ae.value;
        });
      }, le = function(te) {
        return te.rejection !== 1 && !te.parent;
      }, ie = function(te) {
        E(z, k, function() {
          var ae = te.facade;
          C ? Te.emit("rejectionHandled", ae) : de("rejectionhandled", ae, te.value);
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
        M(this, Ye), N(te), E(f, this);
        var ae = ye(this);
        try {
          te(je(Ce, ae), je(be, ae));
        } catch (ce) {
          be(ae, ce);
        }
      }).prototype, (f = function(te) {
        Re(this, { type: fe, done: !1, notified: !1, parent: !1, reactions: new re(), rejection: !1, state: 0, value: void 0 });
      }).prototype = S(Ye, "then", function(te, ae) {
        var ce = ye(this), Oe = Ue(H(this, Fe));
        return ce.parent = !0, Oe.ok = !D(te) || te, Oe.fail = D(ae) && ae, Oe.domain = C ? Te.domain : void 0, ce.state === 0 ? ce.reactions.add(Oe) : V(function() {
          Q(Oe, ce);
        }), Oe.promise;
      }), y = function() {
        var te = new f(), ae = ye(te);
        this.promise = te, this.resolve = je(Ce, ae), this.reject = je(be, ae);
      }, me.f = Ue = function(te) {
        return te === Fe || te === void 0 ? new y(te) : R(te);
      }, !j && D(oe) && Pe !== Object.prototype)) {
        m = Pe.then, Se || S(Pe, "then", function(te, ae) {
          var ce = this;
          return new Fe(function(Oe, Ae) {
            E(m, ce, Oe, Ae);
          }).then(te, ae);
        }, { unsafe: !0 });
        try {
          delete Pe.constructor;
        } catch {
        }
        L && L(Pe, Ye);
      }
      _({ global: !0, constructor: !0, wrap: !0, forced: ke }, { Promise: Fe }), T(Fe, fe, !1, !0), A(fe);
    }, 3362: (h, g, s) => {
      s(436), s(6499), s(2003), s(7743), s(1481), s(280);
    }, 7743: (h, g, s) => {
      var f = s(6518), y = s(9565), m = s(9306), _ = s(6043), j = s(1103), C = s(2652);
      f({ target: "Promise", stat: !0, forced: s(537) }, { race: function(k) {
        var E = this, S = _.f(E), L = S.reject, T = j(function() {
          var A = m(E.resolve);
          C(k, function(N) {
            y(A, E, N).then(S.resolve, L);
          });
        });
        return T.error && L(T.value), S.promise;
      } });
    }, 1481: (h, g, s) => {
      var f = s(6518), y = s(6043);
      f({ target: "Promise", stat: !0, forced: s(916).CONSTRUCTOR }, { reject: function(m) {
        var _ = y.f(this);
        return (0, _.reject)(m), _.promise;
      } });
    }, 280: (h, g, s) => {
      var f = s(6518), y = s(7751), m = s(6395), _ = s(550), j = s(916).CONSTRUCTOR, C = s(3438), k = y("Promise"), E = m && !j;
      f({ target: "Promise", stat: !0, forced: m || j }, { resolve: function(S) {
        return C(E && this === k ? _ : this, S);
      } });
    }, 825: (h, g, s) => {
      var f = s(6518), y = s(7751), m = s(8745), _ = s(566), j = s(5548), C = s(8551), k = s(34), E = s(2360), S = s(9039), L = y("Reflect", "construct"), T = Object.prototype, A = [].push, N = S(function() {
        function M() {
        }
        return !(L(function() {
        }, [], M) instanceof M);
      }), D = !S(function() {
        L(function() {
        });
      }), F = N || D;
      f({ target: "Reflect", stat: !0, forced: F, sham: F }, { construct: function(M, H) {
        j(M), C(H);
        var z = arguments.length < 3 ? M : j(arguments[2]);
        if (D && !N) return L(M, H, z);
        if (M === z) {
          switch (H.length) {
            case 0:
              return new M();
            case 1:
              return new M(H[0]);
            case 2:
              return new M(H[0], H[1]);
            case 3:
              return new M(H[0], H[1], H[2]);
            case 4:
              return new M(H[0], H[1], H[2], H[3]);
          }
          var V = [null];
          return m(A, V, H), new (m(_, M, V))();
        }
        var K = z.prototype, Z = E(k(K) ? K : T), re = m(M, Z, H);
        return k(re) ? re : Z;
      } });
    }, 888: (h, g, s) => {
      var f = s(6518), y = s(9565), m = s(34), _ = s(8551), j = s(6575), C = s(7347), k = s(2787);
      f({ target: "Reflect", stat: !0 }, { get: function E(S, L) {
        var T, A, N = arguments.length < 3 ? S : arguments[2];
        return _(S) === N ? S[L] : (T = C.f(S, L)) ? j(T) ? T.value : T.get === void 0 ? void 0 : y(T.get, N) : m(A = k(S)) ? E(A, L, N) : void 0;
      } });
    }, 4864: (h, g, s) => {
      var f = s(3724), y = s(4475), m = s(9504), _ = s(2796), j = s(3167), C = s(6699), k = s(2360), E = s(8480).f, S = s(1625), L = s(788), T = s(655), A = s(1034), N = s(8429), D = s(1056), F = s(6840), M = s(9039), H = s(9297), z = s(1181).enforce, V = s(7633), K = s(8227), Z = s(3635), re = s(8814), ue = K("match"), oe = y.RegExp, ne = oe.prototype, me = y.SyntaxError, fe = m(ne.exec), ke = m("".charAt), Ee = m("".replace), Se = m("".indexOf), ye = m("".slice), Re = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Pe = /a/g, Fe = /a/g, Ye = new oe(Pe) !== Pe, tt = N.MISSED_STICKY, Ve = N.UNSUPPORTED_Y;
      if (_("RegExp", f && (!Ye || tt || Z || re || M(function() {
        return Fe[ue] = !1, oe(Pe) !== Pe || oe(Fe) === Fe || String(oe(Pe, "i")) !== "/a/i";
      })))) {
        for (var Te = function(B, W) {
          var Y, Q, X, de, he, le, ie = S(ne, this), je = L(B), be = W === void 0, Ce = [], te = B;
          if (!ie && je && be && B.constructor === Te) return B;
          if ((je || S(ne, B)) && (B = B.source, be && (W = A(te))), B = B === void 0 ? "" : T(B), W = W === void 0 ? "" : T(W), te = B, Z && "dotAll" in Pe && (Q = !!W && Se(W, "s") > -1) && (W = Ee(W, /s/g, "")), Y = W, tt && "sticky" in Pe && (X = !!W && Se(W, "y") > -1) && Ve && (W = Ee(W, /y/g, "")), re && (de = function(ae) {
            for (var ce, Oe = ae.length, Ae = 0, ze = "", nt = [], ct = k(null), ft = !1, yt = !1, Je = 0, Ze = ""; Ae <= Oe; Ae++) {
              if ((ce = ke(ae, Ae)) === "\\") ce += ke(ae, ++Ae);
              else if (ce === "]") ft = !1;
              else if (!ft) switch (!0) {
                case ce === "[":
                  ft = !0;
                  break;
                case ce === "(":
                  fe(Re, ye(ae, Ae + 1)) && (Ae += 2, yt = !0), ze += ce, Je++;
                  continue;
                case (ce === ">" && yt):
                  if (Ze === "" || H(ct, Ze)) throw new me("Invalid capture group name");
                  ct[Ze] = !0, nt[nt.length] = [Ze, Je], yt = !1, Ze = "";
                  continue;
              }
              yt ? Ze += ce : ze += ce;
            }
            return [ze, nt];
          }(B), B = de[0], Ce = de[1]), he = j(oe(B, W), ie ? this : ne, Te), (Q || X || Ce.length) && (le = z(he), Q && (le.dotAll = !0, le.raw = Te(function(ae) {
            for (var ce, Oe = ae.length, Ae = 0, ze = "", nt = !1; Ae <= Oe; Ae++) (ce = ke(ae, Ae)) !== "\\" ? nt || ce !== "." ? (ce === "[" ? nt = !0 : ce === "]" && (nt = !1), ze += ce) : ze += "[\\s\\S]" : ze += ce + ke(ae, ++Ae);
            return ze;
          }(B), Y)), X && (le.sticky = !0), Ce.length && (le.groups = Ce)), B !== te) try {
            C(he, "source", te === "" ? "(?:)" : te);
          } catch {
          }
          return he;
        }, Ue = E(oe), R = 0; Ue.length > R; ) D(Te, oe, Ue[R++]);
        ne.constructor = Te, Te.prototype = ne, F(y, "RegExp", Te, { constructor: !0 });
      }
      V("RegExp");
    }, 7495: (h, g, s) => {
      var f = s(6518), y = s(7323);
      f({ target: "RegExp", proto: !0, forced: /./.exec !== y }, { exec: y });
    }, 8781: (h, g, s) => {
      var f = s(350).PROPER, y = s(6840), m = s(8551), _ = s(655), j = s(9039), C = s(1034), k = "toString", E = RegExp.prototype, S = E[k], L = j(function() {
        return S.call({ source: "a", flags: "b" }) !== "/a/b";
      }), T = f && S.name !== k;
      (L || T) && y(E, k, function() {
        var A = m(this);
        return "/" + _(A.source) + "/" + _(C(A));
      }, { unsafe: !0 });
    }, 1699: (h, g, s) => {
      var f = s(6518), y = s(9504), m = s(5749), _ = s(7750), j = s(655), C = s(1436), k = y("".indexOf);
      f({ target: "String", proto: !0, forced: !C("includes") }, { includes: function(E) {
        return !!~k(j(_(this)), j(m(E)), arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, 7764: (h, g, s) => {
      var f = s(8183).charAt, y = s(655), m = s(1181), _ = s(1088), j = s(2529), C = "String Iterator", k = m.set, E = m.getterFor(C);
      _(String, "String", function(S) {
        k(this, { type: C, string: y(S), index: 0 });
      }, function() {
        var S, L = E(this), T = L.string, A = L.index;
        return A >= T.length ? j(void 0, !0) : (S = f(T, A), L.index += S.length, j(S, !1));
      });
    }, 1761: (h, g, s) => {
      var f = s(9565), y = s(9228), m = s(8551), _ = s(4117), j = s(8014), C = s(655), k = s(7750), E = s(5966), S = s(7829), L = s(6682);
      y("match", function(T, A, N) {
        return [function(D) {
          var F = k(this), M = _(D) ? void 0 : E(D, T);
          return M ? f(M, D, F) : new RegExp(D)[T](C(F));
        }, function(D) {
          var F = m(this), M = C(D), H = N(A, F, M);
          if (H.done) return H.value;
          if (!F.global) return L(F, M);
          var z = F.unicode;
          F.lastIndex = 0;
          for (var V, K = [], Z = 0; (V = L(F, M)) !== null; ) {
            var re = C(V[0]);
            K[Z] = re, re === "" && (F.lastIndex = S(M, j(F.lastIndex), z)), Z++;
          }
          return Z === 0 ? null : K;
        }];
      });
    }, 5440: (h, g, s) => {
      var f = s(8745), y = s(9565), m = s(9504), _ = s(9228), j = s(9039), C = s(8551), k = s(4901), E = s(4117), S = s(1291), L = s(8014), T = s(655), A = s(7750), N = s(7829), D = s(5966), F = s(2478), M = s(6682), H = s(8227)("replace"), z = Math.max, V = Math.min, K = m([].concat), Z = m([].push), re = m("".indexOf), ue = m("".slice), oe = "a".replace(/./, "$0") === "$0", ne = !!/./[H] && /./[H]("a", "$0") === "";
      _("replace", function(me, fe, ke) {
        var Ee = ne ? "$" : "$0";
        return [function(Se, ye) {
          var Re = A(this), Pe = E(Se) ? void 0 : D(Se, H);
          return Pe ? y(Pe, Se, Re, ye) : y(fe, T(Re), Se, ye);
        }, function(Se, ye) {
          var Re = C(this), Pe = T(Se);
          if (typeof ye == "string" && re(ye, Ee) === -1 && re(ye, "$<") === -1) {
            var Fe = ke(fe, Re, Pe, ye);
            if (Fe.done) return Fe.value;
          }
          var Ye = k(ye);
          Ye || (ye = T(ye));
          var tt, Ve = Re.global;
          Ve && (tt = Re.unicode, Re.lastIndex = 0);
          for (var Te, Ue = []; (Te = M(Re, Pe)) !== null && (Z(Ue, Te), Ve); ) T(Te[0]) === "" && (Re.lastIndex = N(Pe, L(Re.lastIndex), tt));
          for (var R, B = "", W = 0, Y = 0; Y < Ue.length; Y++) {
            for (var Q, X = T((Te = Ue[Y])[0]), de = z(V(S(Te.index), Pe.length), 0), he = [], le = 1; le < Te.length; le++) Z(he, (R = Te[le]) === void 0 ? R : String(R));
            var ie = Te.groups;
            if (Ye) {
              var je = K([X], he, de, Pe);
              ie !== void 0 && Z(je, ie), Q = T(f(ye, void 0, je));
            } else Q = F(X, Pe, de, he, ie, ye);
            de >= W && (B += ue(Pe, W, de) + Q, W = de + X.length);
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
    }, 1392: (h, g, s) => {
      var f, y = s(6518), m = s(7476), _ = s(7347).f, j = s(8014), C = s(655), k = s(5749), E = s(7750), S = s(1436), L = s(6395), T = m("".slice), A = Math.min, N = S("startsWith");
      y({ target: "String", proto: !0, forced: !(!L && !N && (f = _(String.prototype, "startsWith"), f && !f.writable) || N) }, { startsWith: function(D) {
        var F = C(E(this));
        k(D);
        var M = j(A(arguments.length > 1 ? arguments[1] : void 0, F.length)), H = C(D);
        return T(F, M, M + H.length) === H;
      } });
    }, 2762: (h, g, s) => {
      var f = s(6518), y = s(3802).trim;
      f({ target: "String", proto: !0, forced: s(706)("trim") }, { trim: function() {
        return y(this);
      } });
    }, 6412: (h, g, s) => {
      s(511)("asyncIterator");
    }, 6761: (h, g, s) => {
      var f = s(6518), y = s(4475), m = s(9565), _ = s(9504), j = s(6395), C = s(3724), k = s(4495), E = s(9039), S = s(9297), L = s(1625), T = s(8551), A = s(5397), N = s(6969), D = s(655), F = s(6980), M = s(2360), H = s(1072), z = s(8480), V = s(298), K = s(3717), Z = s(7347), re = s(4913), ue = s(6801), oe = s(8773), ne = s(6840), me = s(2106), fe = s(5745), ke = s(6119), Ee = s(421), Se = s(3392), ye = s(8227), Re = s(1951), Pe = s(511), Fe = s(8242), Ye = s(687), tt = s(1181), Ve = s(9213).forEach, Te = ke("hidden"), Ue = "Symbol", R = "prototype", B = tt.set, W = tt.getterFor(Ue), Y = Object[R], Q = y.Symbol, X = Q && Q[R], de = y.RangeError, he = y.TypeError, le = y.QObject, ie = Z.f, je = re.f, be = V.f, Ce = oe.f, te = _([].push), ae = fe("symbols"), ce = fe("op-symbols"), Oe = fe("wks"), Ae = !le || !le[R] || !le[R].findChild, ze = function(Be, Ge, We) {
        var Qe = ie(Y, Ge);
        Qe && delete Y[Ge], je(Be, Ge, We), Qe && Be !== Y && je(Y, Ge, Qe);
      }, nt = C && E(function() {
        return M(je({}, "a", { get: function() {
          return je(this, "a", { value: 7 }).a;
        } })).a !== 7;
      }) ? ze : je, ct = function(Be, Ge) {
        var We = ae[Be] = M(X);
        return B(We, { type: Ue, tag: Be, description: Ge }), C || (We.description = Ge), We;
      }, ft = function(Be, Ge, We) {
        Be === Y && ft(ce, Ge, We), T(Be);
        var Qe = N(Ge);
        return T(We), S(ae, Qe) ? (We.enumerable ? (S(Be, Te) && Be[Te][Qe] && (Be[Te][Qe] = !1), We = M(We, { enumerable: F(0, !1) })) : (S(Be, Te) || je(Be, Te, F(1, M(null))), Be[Te][Qe] = !0), nt(Be, Qe, We)) : je(Be, Qe, We);
      }, yt = function(Be, Ge) {
        T(Be);
        var We = A(Ge), Qe = H(We).concat(un(We));
        return Ve(Qe, function(ht) {
          C && !m(Je, We, ht) || ft(Be, ht, We[ht]);
        }), Be;
      }, Je = function(Be) {
        var Ge = N(Be), We = m(Ce, this, Ge);
        return !(this === Y && S(ae, Ge) && !S(ce, Ge)) && (!(We || !S(this, Ge) || !S(ae, Ge) || S(this, Te) && this[Te][Ge]) || We);
      }, Ze = function(Be, Ge) {
        var We = A(Be), Qe = N(Ge);
        if (We !== Y || !S(ae, Qe) || S(ce, Qe)) {
          var ht = ie(We, Qe);
          return !ht || !S(ae, Qe) || S(We, Te) && We[Te][Qe] || (ht.enumerable = !0), ht;
        }
      }, _r = function(Be) {
        var Ge = be(A(Be)), We = [];
        return Ve(Ge, function(Qe) {
          S(ae, Qe) || S(Ee, Qe) || te(We, Qe);
        }), We;
      }, un = function(Be) {
        var Ge = Be === Y, We = be(Ge ? ce : A(Be)), Qe = [];
        return Ve(We, function(ht) {
          !S(ae, ht) || Ge && !S(Y, ht) || te(Qe, ae[ht]);
        }), Qe;
      };
      k || (ne(X = (Q = function() {
        if (L(X, this)) throw new he("Symbol is not a constructor");
        var Be = arguments.length && arguments[0] !== void 0 ? D(arguments[0]) : void 0, Ge = Se(Be), We = function(Qe) {
          var ht = this === void 0 ? y : this;
          ht === Y && m(We, ce, Qe), S(ht, Te) && S(ht[Te], Ge) && (ht[Te][Ge] = !1);
          var tr = F(1, Qe);
          try {
            nt(ht, Ge, tr);
          } catch (At) {
            if (!(At instanceof de)) throw At;
            ze(ht, Ge, tr);
          }
        };
        return C && Ae && nt(Y, Ge, { configurable: !0, set: We }), ct(Ge, Be);
      })[R], "toString", function() {
        return W(this).tag;
      }), ne(Q, "withoutSetter", function(Be) {
        return ct(Se(Be), Be);
      }), oe.f = Je, re.f = ft, ue.f = yt, Z.f = Ze, z.f = V.f = _r, K.f = un, Re.f = function(Be) {
        return ct(ye(Be), Be);
      }, C && (me(X, "description", { configurable: !0, get: function() {
        return W(this).description;
      } }), j || ne(Y, "propertyIsEnumerable", Je, { unsafe: !0 }))), f({ global: !0, constructor: !0, wrap: !0, forced: !k, sham: !k }, { Symbol: Q }), Ve(H(Oe), function(Be) {
        Pe(Be);
      }), f({ target: Ue, stat: !0, forced: !k }, { useSetter: function() {
        Ae = !0;
      }, useSimple: function() {
        Ae = !1;
      } }), f({ target: "Object", stat: !0, forced: !k, sham: !C }, { create: function(Be, Ge) {
        return Ge === void 0 ? M(Be) : yt(M(Be), Ge);
      }, defineProperty: ft, defineProperties: yt, getOwnPropertyDescriptor: Ze }), f({ target: "Object", stat: !0, forced: !k }, { getOwnPropertyNames: _r }), Fe(), Ye(Q, Ue), Ee[Te] = !0;
    }, 9463: (h, g, s) => {
      var f = s(6518), y = s(3724), m = s(4475), _ = s(9504), j = s(9297), C = s(4901), k = s(1625), E = s(655), S = s(2106), L = s(7740), T = m.Symbol, A = T && T.prototype;
      if (y && C(T) && (!("description" in A) || T().description !== void 0)) {
        var N = {}, D = function() {
          var Z = arguments.length < 1 || arguments[0] === void 0 ? void 0 : E(arguments[0]), re = k(A, this) ? new T(Z) : Z === void 0 ? T() : T(Z);
          return Z === "" && (N[re] = !0), re;
        };
        L(D, T), D.prototype = A, A.constructor = D;
        var F = String(T("description detection")) === "Symbol(description detection)", M = _(A.valueOf), H = _(A.toString), z = /^Symbol\((.*)\)[^)]+$/, V = _("".replace), K = _("".slice);
        S(A, "description", { configurable: !0, get: function() {
          var Z = M(this);
          if (j(N, Z)) return "";
          var re = H(Z), ue = F ? K(re, 7, -1) : V(re, z, "$1");
          return ue === "" ? void 0 : ue;
        } }), f({ global: !0, constructor: !0, forced: !0 }, { Symbol: D });
      }
    }, 1510: (h, g, s) => {
      var f = s(6518), y = s(7751), m = s(9297), _ = s(655), j = s(5745), C = s(1296), k = j("string-to-symbol-registry"), E = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { for: function(S) {
        var L = _(S);
        if (m(k, L)) return k[L];
        var T = y("Symbol")(L);
        return k[L] = T, E[T] = L, T;
      } });
    }, 2259: (h, g, s) => {
      s(511)("iterator");
    }, 2675: (h, g, s) => {
      s(6761), s(1510), s(7812), s(3110), s(9773);
    }, 7812: (h, g, s) => {
      var f = s(6518), y = s(9297), m = s(757), _ = s(6823), j = s(5745), C = s(1296), k = j("symbol-to-string-registry");
      f({ target: "Symbol", stat: !0, forced: !C }, { keyFor: function(E) {
        if (!m(E)) throw new TypeError(_(E) + " is not a symbol");
        if (y(k, E)) return k[E];
      } });
    }, 5700: (h, g, s) => {
      var f = s(511), y = s(8242);
      f("toPrimitive"), y();
    }, 8125: (h, g, s) => {
      var f = s(7751), y = s(511), m = s(687);
      y("toStringTag"), m(f("Symbol"), "Symbol");
    }, 3500: (h, g, s) => {
      var f = s(4475), y = s(7400), m = s(9296), _ = s(235), j = s(6699), C = function(E) {
        if (E && E.forEach !== _) try {
          j(E, "forEach", _);
        } catch {
          E.forEach = _;
        }
      };
      for (var k in y) y[k] && C(f[k] && f[k].prototype);
      C(m);
    }, 2953: (h, g, s) => {
      var f = s(4475), y = s(7400), m = s(9296), _ = s(3792), j = s(6699), C = s(687), k = s(8227)("iterator"), E = _.values, S = function(T, A) {
        if (T) {
          if (T[k] !== E) try {
            j(T, k, E);
          } catch {
            T[k] = E;
          }
          if (C(T, A, !0), y[A]) {
            for (var N in _) if (T[N] !== _[N]) try {
              j(T, N, _[N]);
            } catch {
              T[N] = _[N];
            }
          }
        }
      };
      for (var L in y) S(f[L] && f[L].prototype, L);
      S(m, "DOMTokenList");
    }, 5575: (h, g, s) => {
      var f = s(6518), y = s(4475), m = s(9472)(y.setInterval, !0);
      f({ global: !0, bind: !0, forced: y.setInterval !== m }, { setInterval: m });
    }, 4599: (h, g, s) => {
      var f = s(6518), y = s(4475), m = s(9472)(y.setTimeout, !0);
      f({ global: !0, bind: !0, forced: y.setTimeout !== m }, { setTimeout: m });
    }, 6031: (h, g, s) => {
      s(5575), s(4599);
    } }, w = {};
    function v(h) {
      var g = w[h];
      if (g !== void 0) return g.exports;
      var s = w[h] = { exports: {} };
      return p[h].call(s.exports, s, s.exports, v), s.exports;
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
      v.r(O), v.d(O, { JSONEditor: () => Cr }), v(2675), v(9463), v(6412), v(2259), v(5700), v(8125), v(8706), v(113), v(1629), v(3418), v(4346), v(3792), v(2712), v(4490), v(4782), v(739), v(9572), v(3288), v(2010), v(4731), v(479), v(2892), v(9085), v(9904), v(4185), v(875), v(9432), v(287), v(6099), v(6034), v(3362), v(7495), v(8781), v(7764), v(3500), v(2953), v(5506), v(4864), v(5440), v(4423);
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
          if (f(e) != "object" || !e) return e;
          var i = e[Symbol.toPrimitive];
          if (i !== void 0) {
            var u = i.call(e, "string");
            if (f(u) != "object") return u;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(r), (r = f(a) == "symbol" ? a : a + "") in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
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
        return y(o) ? _({}, o) : Array.isArray(o) ? o.map(m) : o;
      }
      function _(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        return n.forEach(function(e) {
          e && Object.keys(e).forEach(function(t) {
            e[t] && y(e[t]) ? (k(o, t) || (o[t] = {}), _(o[t], e[t])) : Array.isArray(e[t]) ? o[t] = m(e[t]) : o[t] = e[t];
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
      v(4170), v(3851), v(825), v(888), v(8598), v(1699), v(1761), v(5276), v(5086), v(1392), v(2062), v(8459), v(8940);
      var E = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, S = /^\s*(-|\+)?(\d+)\s*$/;
      function L() {
        var o = (/* @__PURE__ */ new Date()).getTime();
        return typeof performance < "u" && typeof performance.now == "function" && (o += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
          var n = (o + 16 * Math.random()) % 16 | 0;
          return o = Math.floor(o / 16), (r === "x" ? n : 3 & n | 8).toString(16);
        });
      }
      function T(o) {
        return o && f(o) === "object" && !Array.isArray(o);
      }
      var A = ["__proto__", "constructor", "prototype"];
      function N(o) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
        if (!n.length) return o;
        var e = n.shift();
        if (T(o) && T(e)) for (var t in e) k(e, t) && (A.includes(t) || (T(e[t]) ? (k(o, t) && T(o[t]) || Object.assign(o, s({}, t, {})), N(o[t], e[t])) : Object.assign(o, s({}, t, e[t]))));
        return N.apply(void 0, [o].concat(n));
      }
      function D(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function F(o) {
        return F = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, F(o);
      }
      function M(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, H(a.key), a);
        }
      }
      function H(o) {
        var r = function(n, a) {
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
      var z = function() {
        return o = function n(a, e) {
          var t, i;
          (function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.defaults = e, this.jsoneditor = a.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty, this.original_schema = a.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.isUiOnly = !1, this.options = _({}, this.options || {}, this.schema.options || {}, a.schema.options || {}, a), this.enforceConstEnabled = (t = this.options.enforce_const) !== null && t !== void 0 ? t : this.jsoneditor.options.enforce_const, this.formname = this.jsoneditor.options.form_name_root || "root", a.path || this.schema.id || (this.schema.id = this.formname), this.path = a.path || this.formname, this.formname = a.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.parent = a.parent, this.key = this.parent !== void 0 ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, this.optInWidget = (i = this.options.opt_in_widget) !== null && i !== void 0 ? i : this.jsoneditor.options.opt_in_widget, a.container && this.setContainer(a.container), this.registerDependencies();
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
            }) : F(a) === "object" ? F(i) !== "object" ? this.dependenciesFulfilled = a === i : Object.keys(a).some(function(u) {
              return !!k(a, u) && (k(i, u) && a[u] === i[u] ? void 0 : (e.dependenciesFulfilled = !1, !0));
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
          }, k(this.schema, "watch")) {
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
            this.theme.createImageLink(a, e, b), this.link_watchers.push(function(P) {
              var I = i(P), $ = u(P);
              e.setAttribute("href", I), e.setAttribute("title", $ || I), b.setAttribute("src", I);
            });
          } else if (["audio", "video"].includes(t)) {
            a = this.theme.getBlockLinkHolder(), (e = this.theme.getBlockLink()).setAttribute("target", "_blank");
            var x = document.createElement(t);
            x.setAttribute("controls", "controls"), this.theme.createMediaLink(a, e, x), this.link_watchers.push(function(P) {
              var I = i(P), $ = u(P);
              e.setAttribute("href", I), e.textContent = $ || I, x.setAttribute("src", I);
            });
          } else e = a = this.theme.getBlockLink(), a.setAttribute("target", "_blank"), a.textContent = n.rel, a.style.display = "none", this.link_watchers.push(function(P) {
            var I = i(P), $ = u(P);
            I && (a.style.display = ""), a.setAttribute("href", I), a.textContent = $ || I;
          });
          return d && e && (d === !0 ? e.setAttribute("download", "") : this.link_watchers.push(function(P) {
            e.setAttribute("download", d(P));
          })), n.class && n.class.split(" ").forEach(function(P) {
            e.classList.add(P);
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
          var a = document.createElement("div");
          return a.innerHTML = n, a.textContent || a.innerText;
        } }, { key: "onWatchedFieldChange", value: function() {
          var n, a = this;
          if (this.header_template) {
            n = _(this.getWatchedFieldValues(), { key: this.key, i: this.key, i0: 1 * this.key, i1: 1 * this.key + 1, title: this.getTitle() }), this.editors && Object.keys(this.editors).length && (n.properties = {}, Object.keys(this.editors).forEach(function(i) {
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
            }(u = i) || function(I, $) {
              var G = I == null ? null : typeof Symbol < "u" && I[Symbol.iterator] || I["@@iterator"];
              if (G != null) {
                var ee, pe, _e, we, Ie = [], De = !0, He = !1;
                try {
                  if (_e = (G = G.call(I)).next, $ === 0) {
                    if (Object(G) !== G) return;
                    De = !1;
                  } else for (; !(De = (ee = _e.call(G)).done) && (Ie.push(ee.value), Ie.length !== $); De = !0) ;
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
            }(u, d) || function(I, $) {
              if (I) {
                if (typeof I == "string") return D(I, $);
                var G = Object.prototype.toString.call(I).slice(8, -1);
                return G === "Object" && I.constructor && (G = I.constructor.name), G === "Map" || G === "Set" ? Array.from(I) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? D(I, $) : void 0;
              }
            }(u, d) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }()), x = b[0], P = b[1];
            P === Object(P) ? a[x] = e.expandCallbacks(n, P) : typeof P == "string" && F(t) === "object" && typeof t[P] == "function" && (a[x] = t[P].bind(null, e));
          }), a;
        } }, { key: "showValidationErrors", value: function(n) {
        } }], r && M(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function V(o) {
        return V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, V(o);
      }
      function K(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Z(a.key), a);
        }
      }
      function Z(o) {
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
          var b = (e = this.options.prompt_paste_max_length_reached) !== null && e !== void 0 ? e : this.jsoneditor.options.prompt_paste_max_length_reached, x = this.schema.maxLength !== void 0;
          b && x && this.input.addEventListener("paste", function($) {
            ($.clipboardData || window.clipboardData).getData("text").length + t.input.value.length > t.schema.maxLength && alert(t.translate("paste_max_length_reached", [t.schema.maxLength]));
          }), this.format && this.input.setAttribute("data-schemaformat", this.format);
          var P = this.input;
          if (this.format === "range" && (P = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, P, this.description, this.infoButton, this.formname), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input), t.format === "range" && (t.control.querySelector("output").value = t.input.value);
          }), this.schema.template) {
            var I = this.expandCallbacks("template", { template: this.schema.template });
            typeof I.template == "function" ? this.template = I.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }, { key: "setupCleave", value: function(e) {
          var t = this.expandCallbacks("cleave", _({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
          V(t) === "object" && Object.keys(t).length > 0 && (this.cleave_instance = new window.Cleave(e, t));
        } }, { key: "setupImask", value: function(e) {
          var t = this.expandCallbacks("imask", _({}, this.defaults.options.imask || {}, this.options.imask || {}));
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
          var i = e.reduce(function(u, d) {
            return d.path === t.path && u.push(d.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input);
        } }]) && K(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
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
        return r = Fe(r), function(a, e) {
          if (e && (ke(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
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
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Fe(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
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
          var u = Pe(Fe(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(u.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize());
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Pe(Fe(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.ace) {
            var i = this.input_type;
            i !== "cpp" && i !== "c++" && i !== "c" || (i = "c_cpp"), e = this.expandCallbacks("ace", _({}, { selectionStyle: "text", minLines: 30, maxLines: 30 }, this.defaults.options.ace || {}, this.options.ace || {}, { mode: "ace/mode/".concat(i) })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, e), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
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
      function R(o, r) {
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
      function W(o, r, n) {
        return r = X(r), function(a, e) {
          if (e && (Ue(e) === "object" || typeof e == "function")) return e;
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
          }(this, r), W(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && de(e, t);
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
          return Array.isArray(this.schema.items) ? e >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? _({}, this.schema.additionalItems) : void 0 : _({}, this.schema.items[e]) : this.schema.items ? _({}, this.schema.items) : {};
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
          this.empty(!0), this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.controls) && this.controls.parentNode.removeChild(this.controls), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, Q(X(r.prototype), "destroy", this).call(this);
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
            t.forEach(function(x, P) {
              if (e.rows[P]) e.rows[P].setValue(x, i);
              else if (e.row_cache[P]) e.rows[P] = e.row_cache[P], e.rows[P].setValue(x, i), e.rows[P].container.style.display = "", e.rows[P].tab && (e.rows[P].tab.style.display = ""), e.rows[P].register(), e.jsoneditor.trigger("addRow", e.rows[P]);
              else {
                var I = e.addRow(x, i);
                e.jsoneditor.trigger("addRow", I);
              }
            });
            for (var u = t.length; u < this.rows.length; u++) this.destroyRow(this.rows[u]), this.rows[u] = null;
            this.rows = this.rows.slice(0, t.length);
            var d = this.rows.find(function(x) {
              return x.tab === e.active_tab;
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
          return this.setButtonState(this.add_row_button, b), t.push(b), t.some(function(x) {
            return x;
          });
        } }, { key: "refreshValue", value: function(e) {
          var t = this, i = this.value ? this.value.length : 0;
          if (this.value = this.rows.map(function(d) {
            return d.getValue();
          }), i !== this.value.length || e) {
            var u = this.schema.minItems && this.schema.minItems >= this.rows.length;
            this.rows.forEach(function(d, b) {
              if (d.movedown_button) {
                var x = b !== t.rows.length - 1;
                t.setButtonState(d.movedown_button, x);
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
            var b = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue().filter(function($, G) {
              return G !== b;
            }), P = null, I = i.rows[b].getValue();
            i.setValue(x), i.rows[b] ? P = i.rows[b].tab : i.rows[b - 1] && (P = i.rows[b - 1].tab), P && (i.active_tab = P, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", I);
          }), t && t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton(this.getItemTitle(), "copy", "button_copy_row_title", [this.getItemTitle()]), d = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            var x = i.getValue();
            b.preventDefault(), b.stopPropagation();
            var P = 1 * b.currentTarget.getAttribute("data-i");
            x.forEach(function(I, $) {
              if ($ === P) {
                var G = Ue(I) === "object" && I !== null ? function(we) {
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
                if (d.items.type === "string" && d.items.format === "uuid") G = L();
                else if (d.items.type === "object" && d.items.properties) for (var ee = 0, pe = Object.keys(G); ee < pe.length; ee++) {
                  var _e = pe[ee];
                  d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && (G[_e] = L());
                }
                x.push(G);
              }
            }), i.setValue(x), i.refreshValue(!0), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[P - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveleft" : "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i");
            if (!(b <= 0)) {
              var x = i.getValue(), P = x[b - 1];
              x[b - 1] = x[b], x[b] = P, i.setValue(x), i.active_tab = i.rows[b - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", this.schema.format === "tabs-top" ? "moveright" : "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            if (!(b >= x.length - 1)) {
              var P = x[b + 1];
              x[b + 1] = x[b], x[b] = P, i.setValue(x), i.active_tab = i.rows[b + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
            }
          }), t && t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e, t) {
          var i = this;
          le(e, function(u, d) {
            var b = i.getValue(), x = b[u];
            b.splice(u, 1), b.splice(d, 0, x), i.setValue(b), i.active_tab = i.rows[d].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[d]);
          }, { useTrigger: t });
        } }, { key: "addControls", value: function() {
          this.collapsed = !1, this.toggle_button = this._createToggleButton(), this.options.collapsed && j(this.toggle_button, "click"), this.schema.options && this.schema.options.disable_collapse !== void 0 ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this._createAddRowButton(), this.delete_last_row_button = this._createDeleteLastRowButton(), this.remove_all_rows_button = this._createRemoveAllRowsButton(), this.tabs && (this.add_row_button.classList.add("je-array-control-btn"), this.delete_last_row_button.classList.add("je-array-control-btn"), this.remove_all_rows_button.classList.add("je-array-control-btn"));
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
        } }], a && R(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
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
            var x = [];
            for (e = 0; e < t.option_keys.length; e++) t.select_options[t.option_keys[e]] && (t.select_options[t.option_keys[e]].selected || t.select_options[t.option_keys[e]].checked) && x.push(t.select_values[t.option_keys[e]]);
            t.updateValue(x), t.onChange(!0);
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
          var t = new RegExp("^".concat(this.escapeRegExp(this.path), "(\\.\\d+)?$")), i = e.reduce(function(u, d) {
            return d.path.match(t) && u.push(d.message), u;
          }, []);
          i.length ? this.theme.addInputError(this.input || this.inputs, "".concat(i.join(". "), ".")) : this.theme.removeInputError(this.input || this.inputs);
        } }]) && je(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
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
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ct(a.key), a);
        }
      }
      function ct(o) {
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
      function ft(o, r, n) {
        return r = Ze(r), function(a, e) {
          if (e && (ze(e) === "object" || typeof e == "function")) return e;
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
      function _r(o, r) {
        return _r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, _r(o, r);
      }
      var un = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ft(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _r(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          this.choices_instance ? (e = this.applyConstFilter(e), e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : Je(Ze(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.Choices && !this.choices_instance) {
            var t = this.expandCallbacks("choices", _({}, { removeItems: !0, removeItemButton: !0 }, this.defaults.options.choices || {}, this.options.choices || {}, { addItems: !0, editItems: !1, duplicateItemsAllowed: !1 }));
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
              var d = this.sanitize(this.select_values[e[u]]);
              i.push(d), d !== e[u] && (t = !0);
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
        } }]) && nt(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
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
        return r = At(r), function(a, e) {
          if (e && (Be(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
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
      function tr() {
        return tr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = At(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, tr.apply(this, arguments);
      }
      function At(o) {
        return At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, At(o);
      }
      function is(o, r) {
        return is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, is(o, r);
      }
      var fd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qe(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && is(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.select2_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : tr(At(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (e = this.expandCallbacks("select2", _({}, { tags: !0, width: "100%" }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = e.tags = !!e.tags && this.schema.items && this.schema.items.type === "string", this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
            var i = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
            t.updateValue(i), t.onChange(!0);
          }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), tr(At(r.prototype), "afterInputReady", this).call(this);
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
          !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), tr(At(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), tr(At(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), tr(At(r.prototype), "destroy", this).call(this);
        } }]) && Ge(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
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
        return r = rr(r), function(a, e) {
          if (e && (Nn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, nl() ? Reflect.construct(r, n || [], rr(o).constructor) : r.apply(o, n));
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
      function os(o, r) {
        return os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, os(o, r);
      }
      var vd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), bd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && os(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.selectize_instance ? (e = [].concat(e).map(function(i) {
            return "".concat(i);
          }), this.updateValue(e), this.selectize_instance.setValue(this.value), this.onChange(!0)) : cn(rr(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            e = this.expandCallbacks("selectize", _({}, { plugins: ["remove_button"], delimiter: !1, createOnBlur: !0, create: !0 }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = e.create = !!e.create && this.schema.items && this.schema.items.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(b) {
              var x = t.selectize_instance.getValue();
              t.updateValue(x), t.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
            var i = this.theme.getHiddenLabel(this.formname);
            this.input.setAttribute("id", this.formname + "-hidden-input"), i.setAttribute("for", this.formname + "-hidden-input"), this.input.parentNode.insertBefore(i, this.input);
            var u = this.selectize_instance.$control[0];
            if (u) {
              var d = this.theme.getHiddenLabel(this.formname);
              d.setAttribute("for", this.formname + "-selectized"), u.appendChild(d);
            }
          }
          cn(rr(r.prototype), "afterInputReady", this).call(this);
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
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), cn(rr(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), cn(rr(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), cn(rr(r.prototype), "destroy", this).call(this);
        } }]) && yd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ae);
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
        return r = Fr(r), function(a, e) {
          if (e && (Dn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, il() ? Reflect.construct(r, n || [], Fr(o).constructor) : r.apply(o, n));
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
      function Pi() {
        return Pi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Fr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Pi.apply(this, arguments);
      }
      function Fr(o) {
        return Fr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Fr(o);
      }
      function ss(o, r) {
        return ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ss(o, r);
      }
      var jd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), wd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ss(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), Pi(Fr(r.prototype), "postBuild", this).call(this);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Autocomplete && !this.autocomplete_instance && (e = this.expandCallbacks("autocomplete", _({}, { search: function(i) {
            return console.log('No "search" callback defined for autocomplete in property "'.concat(i.key, '"')), [];
          }, onSubmit: function() {
            t.input.blur();
          }, baseClass: "autocomplete" }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(e.baseClass), this.autocomplete_dropdown.classList.add("".concat(e.baseClass, "-result-list")), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, e)), Pi(Fr(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "destroy", value: function() {
          this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), Pi(Fr(r.prototype), "destroy", this).call(this);
        } }]) && gd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Fn(o) {
        return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Fn(o);
      }
      function kd(o, r) {
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
        return r = Mr(r), function(a, e) {
          if (e && (Fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ol() ? Reflect.construct(r, n || [], Mr(o).constructor) : r.apply(o, n));
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
      function Ti() {
        return Ti = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Mr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ti.apply(this, arguments);
      }
      function Mr(o) {
        return Mr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Mr(o);
      }
      function as(o, r) {
        return as = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, as(o, r);
      }
      var Cd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Od(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && as(e, t);
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
                b.onload = function(x) {
                  e.value = x.target.result, e.refreshPreview(), e.onChange(!0), b = null;
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
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Ti(Mr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Ti(Mr(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(e) ? this.value = this.schema.enum[0] : this.value = e, this.input.value = this.value, this.refreshPreview(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), Ti(Mr(r.prototype), "destroy", this).call(this);
        } }]) && kd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function Mn(o) {
        return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Mn(o);
      }
      function Ed(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Sd(a.key), a);
        }
      }
      function Sd(o) {
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
      function Pd(o, r, n) {
        return r = Hr(r), function(a, e) {
          if (e && (Mn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, sl() ? Reflect.construct(r, n || [], Hr(o).constructor) : r.apply(o, n));
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
      function Li() {
        return Li = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Hr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Li.apply(this, arguments);
      }
      function Hr(o) {
        return Hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Hr(o);
      }
      function ls(o, r) {
        return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ls(o, r);
      }
      var al = function(o) {
        function r(e, t) {
          var i;
          return function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (i = Pd(this, r, [e, t])).active = !1, i.isUiOnly = !0, i.parent && i.parent.schema && (Array.isArray(i.parent.schema.required) ? i.parent.schema.required.includes(i.key) || i.parent.schema.required.push(i.key) : i.parent.schema.required = [i.key]), i;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ls(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          var e = this;
          this.options.compact = !0;
          var t = this.expandCallbacks("button", _({}, { icon: "", validated: !1, align: "left", action: function(u, d) {
            window.alert('No button action defined for "'.concat(u.path, '"'));
          } }, this.defaults.options.button || {}, this.options.button || {})), i = this.translateProperty(t.text || this.schema.title) || this.key;
          this.input = this.getButton(i, t.icon, i), typeof t.action != "function" ? window.alert('No button action defined for "'.concat(this.path, '"')) : this.input.addEventListener("click", t.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.disable(!0), this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(t.align), this.control.appendChild(this.input), this.container.appendChild(this.control), this.changeHandler = function() {
            e.jsoneditor.validate(e.jsoneditor.getValue()).length > 0 ? e.disable() : e.enable();
          }, t.validated && this.jsoneditor.on("change", this.changeHandler);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Li(Hr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Li(Hr(r.prototype), "disable", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "activate", value: function() {
          this.active = !1, this.enable();
        } }, { key: "deactivate", value: function() {
          this.isRequired() || (this.active = !1, this.disable());
        } }, { key: "destroy", value: function() {
          this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, Li(Hr(r.prototype), "destroy", this).call(this);
        } }]) && Ed(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
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
        }(o, ll() ? Reflect.construct(r, n || [], Ht(o).constructor) : r.apply(o, n));
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
      function Vr() {
        return Vr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ht(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Vr.apply(this, arguments);
      }
      function Ht(o) {
        return Ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ht(o);
      }
      function us(o, r) {
        return us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
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
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = !!(e = this.applyConstFilter(e));
          var i = this.getValue() !== e;
          this.value = e, this.input.checked = this.value, t || (this.is_dirty = !0), this.onChange(i);
        } }, { key: "register", value: function() {
          Vr(Ht(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Vr(Ht(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "getNumColumns", value: function() {
          return Math.min(12, Math.max(this.getTitle().length / 7, 2));
        } }, { key: "setOptInCheckbox", value: function() {
          Vr(Ht(r.prototype), "setOptInCheckbox", this).call(this), this.optInAppended && (this.container.insertBefore(this.optInContainer, this.container.firstChild), this.optInContainer.style.verticalAlign = "top", this.control.style.marginTop = "0");
        } }, { key: "build", value: function() {
          var e = this;
          this.parent.options.table_row || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.label.htmlFor = this.formname), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.input.id = this.formname, this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.control.style.display = "inline-block", (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), this.input.disabled = !0), this.input.addEventListener("change", function(t) {
            t.preventDefault(), t.stopPropagation(), e.value = t.currentTarget.checked, e.is_dirty = !0, e.onChange(!0);
          }), this.container.appendChild(this.control);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, Vr(Ht(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, Vr(Ht(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Vr(Ht(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var d = e.reduce(function(b, x) {
              return x.path === t.path && b.push(x.message), b;
            }, []);
            this.input.controlgroup = this.control, d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Td(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function Vn(o) {
        return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Vn(o);
      }
      function Id(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Bd(a.key), a);
        }
      }
      function Bd(o) {
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
      function Nd(o, r, n) {
        return r = Vt(r), function(a, e) {
          if (e && (Vn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ul() ? Reflect.construct(r, n || [], Vt(o).constructor) : r.apply(o, n));
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
      function zr() {
        return zr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Vt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, zr.apply(this, arguments);
      }
      function Vt(o) {
        return Vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Vt(o);
      }
      function cs(o, r) {
        return cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, cs(o, r);
      }
      v(6910);
      var Ai = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Nd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cs(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e);
          var i = this.typecast(e), u = this.enum_options.length > 0 && this.enum_values.includes(i), d = !!this.jsoneditor.options.use_default_values || this.schema.default !== void 0;
          if (this.hasPlaceholderOption || u && (!t || this.isRequired() || d) || (i = this.enum_values[0]), this.value !== i) {
            var b = this.enum_values.indexOf(i);
            u && b !== -1 ? this.input.value = this.enum_options[b] : this.hasPlaceholderOption ? this.input.value = "_placeholder_" : this.input.value = i, this.value = i, t || (this.is_dirty = !0), this.onChange(), this.change();
          }
        } }, { key: "register", value: function() {
          zr(Vt(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          zr(Vt(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
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
            var x = this.schema.options && this.schema.options.enum_titles || [];
            this.schema.enum.forEach(function(P, I) {
              d.enum_options[I] = "".concat(P), d.enum_display[I] = "".concat(d.translateProperty(x[I]) || P), d.enum_values[I] = d.typecast(P);
            });
          } else if (this.schema.type === "boolean") this.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], this.enum_options = ["1", ""], this.enum_values = [!0, !1], this.isRequired() || (this.enum_display.unshift(" "), this.enum_options.unshift("undefined"), this.enum_values.unshift(void 0));
          else {
            if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
            if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource)) for (i = 0; i < this.schema.enumSource.length; i++) typeof this.schema.enumSource[i] == "string" ? this.enumSource[i] = { source: this.schema.enumSource[i] } : Array.isArray(this.schema.enumSource[i]) ? this.enumSource[i] = this.schema.enumSource[i] : this.enumSource[i] = _({}, this.schema.enumSource[i]);
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
                  var x = [];
                  for (t = 0; t < b.length; t++) this.enumSource[d].filter({ i: t, item: b[t], watched: e }) && x.push(b[t]);
                  b = x;
                }
                var P = [], I = [];
                for (t = 0; t < b.length; t++) {
                  var $ = b[t];
                  this.enumSource[d].value ? I[t] = this.typecast(this.enumSource[d].value({ i: t, item: $ })) : I[t] = b[t], this.enumSource[d].title ? P[t] = this.enumSource[d].title({ i: t, item: $ }) : P[t] = I[t];
                }
                this.enumSource[d].sort && (function(ee, pe, _e) {
                  ee.map(function(we, Ie) {
                    return { v: we, t: pe[Ie] };
                  }).sort(function(we, Ie) {
                    return we.v < Ie.v ? -_e : we.v === Ie.v ? 0 : _e;
                  }).forEach(function(we, Ie) {
                    ee[Ie] = we.v, pe[Ie] = we.t;
                  });
                }).bind(null, I, P, this.enumSource[d].sort === "desc" ? 1 : -1)(), i = i.concat(I), u = u.concat(P);
              }
            }
            var G = this.value;
            this.theme.setSelectOptions(this.input, i, u), this.enum_options = i, this.enum_display = u, this.enum_values = i, i.includes(G) || this.jsoneditor.options.enum_source_value_auto_select !== !1 ? (this.input.value = G, this.value = G) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path));
          }
          zr(Vt(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.input.disabled = !1, zr(Vt(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.input.disabled = !0, zr(Vt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), zr(Vt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this, i = this.jsoneditor.options.show_errors, u = i === "change" || i === "interaction";
          if ((i !== "never" || this.is_dirty) && (!u || this.is_dirty)) {
            var d = e.reduce(function(b, x) {
              return x.path === t.path && b.push(x.message), b;
            }, []);
            d.length ? this.theme.addInputError(this.input, "".concat(d.join(". "), ".")) : this.theme.removeInputError(this.input);
          }
        } }]) && Id(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function zn(o) {
        return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zn(o);
      }
      function Dd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Fd(a.key), a);
        }
      }
      function Fd(o) {
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
      function Md(o, r, n) {
        return r = zt(r), function(a, e) {
          if (e && (zn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, cl() ? Reflect.construct(r, n || [], zt(o).constructor) : r.apply(o, n));
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
      function ds(o, r) {
        return ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ds(o, r);
      }
      var dl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Md(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ds(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.choices_instance) {
            var i = this.typecast(e || "");
            if (this.enum_values.includes(i) || (i = this.enum_values[0]), this.value === i) return;
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange();
          } else qr(zt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          if (window.Choices && !this.choices_instance) {
            var e = this.expandCallbacks("choices", _({}, this.defaults.options.choices || {}, this.options.choices || {}));
            this.choices_instance = new window.Choices(this.input, e);
          }
          qr(zt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          if (qr(zt(r.prototype), "onWatchedFieldChange", this).call(this), this.choices_instance) {
            var t = this.enum_options.map(function(i, u) {
              return { value: i, label: e.enum_display[u] };
            });
            this.choices_instance.setChoices(t, "value", "label", !0), this.choices_instance.setChoiceByValue("".concat(this.value));
          }
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.choices_instance && this.choices_instance.enable(), qr(zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.choices_instance && this.choices_instance.disable(), qr(zt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), qr(zt(r.prototype), "destroy", this).call(this);
        } }]) && Dd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ai);
      function dn(o) {
        return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, dn(o);
      }
      function Hd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Vd(a.key), a);
        }
      }
      function Vd(o) {
        var r = function(n, a) {
          if (dn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (dn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return dn(r) == "symbol" ? r : r + "";
      }
      function zd(o, r, n) {
        return r = Ur(r), function(a, e) {
          if (e && (dn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, hl() ? Reflect.construct(r, n || [], Ur(o).constructor) : r.apply(o, n));
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
      function Ri() {
        return Ri = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ur(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ri.apply(this, arguments);
      }
      function Ur(o) {
        return Ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ur(o);
      }
      function hs(o, r) {
        return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, hs(o, r);
      }
      dl.rules = { ".choices > *": "box-sizing:border-box" };
      var qd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), zd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (Ri(Ur(r.prototype), "build", this).call(this), this.input && (this.schema.max && typeof this.schema.max == "string" && this.input.setAttribute("max", this.schema.max), this.schema.min && typeof this.schema.max == "string" && this.input.setAttribute("min", this.schema.min), window.flatpickr && dn(this.options.flatpickr) === "object")) {
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
              var d = this.input.parentNode, b = this.input.nextSibling, x = this.theme.getInputGroup(this.input, t);
              x !== void 0 ? (this.options.flatpickr.inline = !1, d.insertBefore(x, b), e = x) : this.options.flatpickr.wrap = !1;
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
          if (e = this.applyConstFilter(e), this.schema.type === "string") Ri(Ur(r.prototype), "setValue", this).call(this, e, t, i), this.flatpickr && this.flatpickr.setDate(e);
          else if (e > 0) {
            var u = new Date(1e3 * e), d = u.getFullYear(), b = this.zeroPad(u.getMonth() + 1), x = this.zeroPad(u.getDate()), P = this.zeroPad(u.getHours()), I = this.zeroPad(u.getMinutes()), $ = this.zeroPad(u.getSeconds()), G = [d, b, x].join("-"), ee = [P, I, $].join(":"), pe = "".concat(G, "T").concat(ee);
            this.schema.format === "date" ? pe = G : this.schema.format === "time" && (pe = ee), this.input.value = pe, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(pe);
          }
        } }, { key: "destroy", value: function() {
          this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, Ri(Ur(r.prototype), "destroy", this).call(this);
        } }, { key: "zeroPad", value: function(e) {
          return "0".concat(e).slice(-2);
        } }]) && Hd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function qn(o) {
        return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, qn(o);
      }
      function Ud(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, $d(a.key), a);
        }
      }
      function $d(o) {
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
      function Gd(o, r, n) {
        return r = qt(r), function(a, e) {
          if (e && (qn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, pl() ? Reflect.construct(r, n || [], qt(o).constructor) : r.apply(o, n));
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
      function $r() {
        return $r = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = qt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, $r.apply(this, arguments);
      }
      function qt(o) {
        return qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, qt(o);
      }
      function ps(o, r) {
        return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ps(o, r);
      }
      var Wd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ps(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.currentEditor] && this.editors[this.currentEditor].register();
          }
          $r(qt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if ($r(qt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
          $r(qt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable();
          $r(qt(r.prototype), "disable", this).call(this);
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
          var i = _({}, this.schema, this.jsoneditor.refs[e]), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: t, path: this.path, parent: this, required: !0 });
          this.editors.push(d), d.preBuild(), d.build(), d.postBuild();
        } }, { key: "preBuild", value: function() {
          var e;
          for (this.refs = {}, this.editors = [], this.currentEditor = "", e = 0; e < this.schema.links.length; e++) if (this.schema.links[e].rel.toLowerCase() === "describedby") {
            this.template = this.jsoneditor.compileTemplate(this.schema.links[e].href, this.template_engine);
            break;
          }
          this.schema.links = this.schema.links.slice(0, e).concat(this.schema.links.slice(e + 1)), this.schema.links.length === 0 && delete this.schema.links, this.baseSchema = _({}, this.schema);
        } }, { key: "build", value: function() {
          this.editor_holder = document.createElement("div"), this.container.appendChild(this.editor_holder), this.switchEditor();
        } }, { key: "onWatchedFieldChange", value: function() {
          this.switchEditor();
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.currentEditor] && this.refreshValue(), $r(qt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "refreshValue", value: function() {
          this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue());
        } }, { key: "setValue", value: function(e, t) {
          e = this.applyConstFilter(e), this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(e, t), this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), $r(qt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          this.editors.forEach(function(t) {
            t && t.showValidationErrors(e);
          });
        } }]) && Ud(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function hn(o) {
        return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hn(o);
      }
      function fl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function Jd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Kd(a.key), a);
        }
      }
      function Kd(o) {
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
      function Zd(o, r, n) {
        return r = Gr(r), function(a, e) {
          if (e && (hn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, yl() ? Reflect.construct(r, n || [], Gr(o).constructor) : r.apply(o, n));
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
      function fs(o, r) {
        return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, fs(o, r);
      }
      var Yd = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Zd(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fs(e, t);
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
          this.always_disabled || (this.switcher.disabled = !1, Ii(Gr(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.switcher.disabled = !0, Ii(Gr(r.prototype), "disable", this).call(this);
        } }, { key: "getHTML", value: function(e) {
          var t, i, u = this;
          if (e === null) return "<em>null</em>";
          if (hn(e) === "object") {
            var d = "";
            return t = e, i = function(b, x) {
              var P = u.getHTML(x);
              Array.isArray(e) || (P = "<div><em>".concat(b, "</em>: ").concat(P, "</div>")), d += "<li>".concat(P, "</li>");
            }, Array.isArray(t) || typeof t.length == "number" && t.length > 0 && t.length - 1 in t ? Array.from(t).forEach(function(b, x) {
              return i(x, b);
            }) : Object.entries(t).forEach(function(b) {
              var x, P, I = (P = 2, function(ee) {
                if (Array.isArray(ee)) return ee;
              }(x = b) || function(ee, pe) {
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
              }(x, P) || function(ee, pe) {
                if (ee) {
                  if (typeof ee == "string") return fl(ee, pe);
                  var _e = Object.prototype.toString.call(ee).slice(8, -1);
                  return _e === "Object" && ee.constructor && (_e = ee.constructor.name), _e === "Map" || _e === "Set" ? Array.from(ee) : _e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_e) ? fl(ee, pe) : void 0;
                }
              }(x, P) || function() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
              }()), $ = I[0], G = I[1];
              return i($, G);
            }), d = Array.isArray(e) ? "<ol>".concat(d, "</ol>") : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>".concat(d, "</ul>");
          }
          return typeof e == "boolean" ? e ? "true" : "false" : typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e;
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.refreshValue(), this.onChange());
        } }, { key: "destroy", value: function() {
          this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Ii(Gr(r.prototype), "destroy", this).call(this);
        } }]) && Jd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function pn(o) {
        return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pn(o);
      }
      function Qd(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Xd(a.key), a);
        }
      }
      function Xd(o) {
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
      function eh(o, r, n) {
        return r = Ut(r), function(a, e) {
          if (e && (pn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ml() ? Reflect.construct(r, n || [], Ut(o).constructor) : r.apply(o, n));
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
      function Wr() {
        return Wr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Ut(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Wr.apply(this, arguments);
      }
      function Ut(o) {
        return Ut = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Ut(o);
      }
      function ys(o, r) {
        return ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ys(o, r);
      }
      var th = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), eh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ys(e, t);
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          Wr(Ut(r.prototype), "register", this).call(this), this.input && this.jsoneditor.options.use_name_attributes && this.input.setAttribute("name", this.formname);
        } }, { key: "unregister", value: function() {
          Wr(Ut(r.prototype), "unregister", this).call(this), this.input && this.input.removeAttribute("name");
        } }, { key: "setValue", value: function(e, t, i) {
          if (e = this.applyConstFilter(e), (!this.template || i) && (e == null ? e = "" : pn(e) === "object" ? e = JSON.stringify(e) : typeof e != "string" && (e = "".concat(e)), e !== this.serialized)) {
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
          Wr(Ut(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function() {
          Wr(Ut(r.prototype), "disable", this).call(this);
        } }, { key: "refreshValue", value: function() {
          this.value = this.input.value, typeof this.value != "string" && (this.value = ""), this.serialized = this.value;
        } }, { key: "destroy", value: function() {
          this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), Wr(Ut(r.prototype), "destroy", this).call(this);
        } }, { key: "sanitize", value: function(e) {
          return this.purify(e);
        } }, { key: "onWatchedFieldChange", value: function() {
          var e;
          this.template && (e = this.getWatchedFieldValues(), this.setValue(this.template(e), !1, !0)), Wr(Ut(r.prototype), "onWatchedFieldChange", this).call(this);
        } }, { key: "build", value: function() {
          if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
            var e = this.expandCallbacks("template", { template: this.schema.template });
            typeof e.template == "function" ? this.template = e.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue();
          } else this.refreshValue();
        } }]) && Qd(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
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
        return r = uo(r), function(a, e) {
          if (e && (Un(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, bl() ? Reflect.construct(r, n || [], uo(o).constructor) : r.apply(o, n));
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
      function uo(o) {
        return uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, uo(o);
      }
      function ms(o, r) {
        return ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ms(o, r);
      }
      var oh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), ih(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ms(e, t);
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
        } }]) && rh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(al);
      function $n(o) {
        return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, $n(o);
      }
      function sh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ah(a.key), a);
        }
      }
      function ah(o) {
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
      function lh(o, r, n) {
        return r = Gn(r), function(a, e) {
          if (e && ($n(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, vl() ? Reflect.construct(r, n || [], Gn(o).constructor) : r.apply(o, n));
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
      function bs() {
        return bs = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Gn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, bs.apply(this, arguments);
      }
      function Gn(o) {
        return Gn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Gn(o);
      }
      function vs(o, r) {
        return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, vs(o, r);
      }
      var gl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          if (bs(Gn(r.prototype), "build", this).call(this), this.schema.minimum !== void 0) {
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
        } }]) && sh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Wn(o) {
        return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Wn(o);
      }
      function uh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ch(a.key), a);
        }
      }
      function ch(o) {
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
      function dh(o, r, n) {
        return r = co(r), function(a, e) {
          if (e && (Wn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, _l() ? Reflect.construct(r, n || [], co(o).constructor) : r.apply(o, n));
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
      function co(o) {
        return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, co(o);
      }
      function gs(o, r) {
        return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, gs(o, r);
      }
      var wl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), dh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gs(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return this.schema.default || this.jsoneditor.options.use_default_values || this.value !== "" ? function(e) {
            if (e == null) return !1;
            var t = e.match(S), i = parseInt(e);
            return t !== null && !isNaN(i) && isFinite(i);
          }(this.value) ? parseInt(this.value) : this.value : void this.shouldBeUnset();
        } }]) && uh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(gl);
      function Jn(o) {
        return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Jn(o);
      }
      function hh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ph(a.key), a);
        }
      }
      function ph(o) {
        var r = function(n, a) {
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
      function fh(o, r, n) {
        return r = Kn(r), function(a, e) {
          if (e && (Jn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, jl() ? Reflect.construct(r, n || [], Kn(o).constructor) : r.apply(o, n));
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
      function _s() {
        return _s = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, _s.apply(this, arguments);
      }
      function Kn(o) {
        return Kn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kn(o);
      }
      function ws(o, r) {
        return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ws(o, r);
      }
      var yh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), fh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ws(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          if (_s(Kn(r.prototype), "preBuild", this).call(this), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
            case "ipv6":
              this.schema.options.cleave = { delimiters: [":"], blocks: [4, 4, 4, 4, 4, 4, 4, 4], uppercase: !0 };
              break;
            case "ipv4":
              this.schema.options.cleave = { delimiters: ["."], blocks: [3, 3, 3, 3], numericOnly: !0 };
          }
          this.options = _(this.options, this.schema.options || {});
        } }]) && hh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function Zn(o) {
        return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zn(o);
      }
      function mh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, bh(a.key), a);
        }
      }
      function bh(o) {
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
      function vh(o, r, n) {
        return r = $t(r), function(a, e) {
          if (e && (Zn(e) === "object" || typeof e == "function")) return e;
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
      function Jr() {
        return Jr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = $t(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Jr.apply(this, arguments);
      }
      function $t(o) {
        return $t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, $t(o);
      }
      function js(o, r) {
        return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, js(o, r);
      }
      var gh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), vh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && js(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Jr($t(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.jodit_instance && this.jodit_instance.setEditorValue(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Jr($t(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.Jodit ? (e = this.expandCallbacks("jodit", _({}, { height: 300 }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
            t.value = t.jodit_instance.getEditorValue(), t.is_dirty = !0, t.onChange(!0);
          }), this.theme.afterInputReady(this.input)) : Jr($t(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), Jr($t(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.jodit_instance && this.jodit_instance.setReadOnly(!0), Jr($t(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), Jr($t(r.prototype), "destroy", this).call(this);
        } }]) && mh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
      function _h(o, r, n, a) {
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
      function wh(o, r, n) {
        return (r = Ol(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Gt(o) {
        return Gt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gt(o);
      }
      function Bi(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], x = !0, P = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(x = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); x = !0) ;
            } catch (I) {
              P = !0, i = I;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (P) throw i;
              }
            }
            return b;
          }
        }(o, r) || ks(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ut(o) {
        return function(r) {
          if (Array.isArray(r)) return xs(r);
        }(o) || function(r) {
          if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
        }(o) || ks(o) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function ks(o, r) {
        if (o) {
          if (typeof o == "string") return xs(o, r);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set" ? Array.from(o) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xs(o, r) : void 0;
        }
      }
      function xs(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function jh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ol(a.key), a);
        }
      }
      function Ol(o) {
        var r = function(n, a) {
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
      v(8431);
      var Cl = function() {
        return o = function n(a, e, t, i) {
          (function(u, d) {
            if (!(u instanceof d)) throw new TypeError("Cannot call a class as a function");
          })(this, n), this.jsoneditor = a, this.schema = e || this.jsoneditor.schema, this.options = t || {}, this.translate = this.jsoneditor.translate || i.translate, this.translateProperty = this.jsoneditor.translateProperty || i.translateProperty, this.defaults = i, this._validateSubSchema = { dependentRequired: function(u, d, b) {
            var x = [];
            if (u.dependentRequired !== void 0) {
              var P = [];
              Object.keys(u.dependentRequired).forEach(function(I) {
                if (d[I] !== void 0) {
                  var $ = u.dependentRequired[I];
                  P = $.filter(function(G) {
                    return !k(d, G);
                  });
                }
              }), P.length > 0 && x.push({ message: "Must have the required properties: " + P.join(", "), path: b });
            }
            return x;
          }, dependentSchemas: function(u, d, b) {
            var x = this, P = [];
            return Object.keys(u.dependentSchemas).forEach(function(I) {
              if (d[I] !== void 0) {
                var $ = u.dependentSchemas[I], G = x._validateSchema($, d, b);
                P = [].concat(ut(P), ut(G));
              }
            }), P;
          }, contains: function(u, d, b) {
            var x = this, P = [], I = 0;
            d.forEach(function(G) {
              x._validateSchema(u.contains, G, b).length === 0 && I++;
            });
            var $ = I === 0;
            return u.minContains !== void 0 ? I < u.minContains && P.push({ message: this.translate("error_minContains", [I, u.minContains], u), path: b }) : $ && P.push({ message: this.translate("error_contains", null, u), path: b }), u.maxContains !== void 0 && I > u.maxContains && P.push({ message: this.translate("error_maxContains", [I, u.maxContains], u), path: b }), P;
          }, if: function(u, d, b) {
            if (u.then === void 0 && u.else === void 0) return [];
            var x = this._validateSchema(u.if, d, b), P = [], I = [];
            return u.then !== void 0 && (P = this._validateSchema(u.then, d, b)), u.else !== void 0 && (I = this._validateSchema(u.else, d, b)), u.if === !0 ? P : u.if === !1 ? I : x.length === 0 ? P : x.length > 0 ? I : [];
          }, const: function(u, d, b) {
            return JSON.stringify(u.const) === JSON.stringify(d) ? [] : [{ path: b, property: "const", message: this.translate("error_const", null, u) }];
          }, enum: function(u, d, b) {
            var x = JSON.stringify(d);
            return u.enum.some(function(P) {
              return x === JSON.stringify(P);
            }) ? [] : [{ path: b, property: "enum", message: this.translate("error_enum", null, u) }];
          }, extends: function(u, d, b) {
            var x = this;
            return u.extends.reduce(function(P, I) {
              return P.push.apply(P, ut(x._validateSchema(I, d, b))), P;
            }, []);
          }, allOf: function(u, d, b) {
            var x = this;
            return u.allOf.reduce(function(P, I) {
              return P.push.apply(P, ut(x._validateSchema(I, d, b))), P;
            }, []);
          }, anyOf: function(u, d, b) {
            var x = this;
            return u.anyOf.some(function(P) {
              return !x._validateSchema(P, d, b).length;
            }) ? [] : [{ path: b, property: "anyOf", message: this.translate("error_anyOf", null, u) }];
          }, oneOf: function(u, d, b) {
            var x = this, P = 0, I = [];
            u.oneOf.forEach(function(G, ee) {
              var pe = x._validateSchema(G, d, b);
              pe.length || P++, pe.forEach(function(_e) {
                _e.path = "".concat(b, ".oneOf[").concat(ee, "]").concat(_e.path.substr(b.length));
              }), I.push.apply(I, ut(pe));
            });
            var $ = [];
            return P !== 1 && ($.push({ path: b, property: "oneOf", message: this.translate("error_oneOf", [P], u) }), $.push.apply($, I)), $;
          }, not: function(u, d, b) {
            return this._validateSchema(u.not, d, b).length ? [] : [{ path: b, property: "not", message: this.translate("error_not", null, u) }];
          }, type: function(u, d, b) {
            var x = this;
            if (Array.isArray(u.type)) {
              if (!u.type.some(function(P) {
                return x._checkType(P, d);
              })) return [{ path: b, property: "type", message: this.translate("error_type_union", null, u) }];
            } else if (["date", "time", "datetime-local"].includes(u.format) && u.type === "integer") {
              if (!this._checkType("string", "".concat(d))) return [{ path: b, property: "type", message: this.translate("error_type", [u.format], u) }];
            } else if (!this._checkType(u.type, d)) return [{ path: b, property: "type", message: this.translate("error_type", [u.type], u) }];
            return [];
          }, disallow: function(u, d, b) {
            var x = this;
            if (Array.isArray(u.disallow)) {
              if (u.disallow.some(function(P) {
                return x._checkType(P, d);
              })) return [{ path: b, property: "disallow", message: this.translate("error_disallow_union", null, u) }];
            } else if (this._checkType(u.disallow, d)) return [{ path: b, property: "disallow", message: this.translate("error_disallow", [u.disallow], u) }];
            return [];
          } }, this._validateNumberSubSchema = { multipleOf: function(u, d, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, d, b);
          }, divisibleBy: function(u, d, b) {
            return this._validateNumberSubSchemaMultipleDivisible(u, d, b);
          }, maximum: function(u, d, b) {
            var x = u.exclusiveMaximum ? d < u.maximum : d <= u.maximum;
            return window.math ? x = window.math[u.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(d), window.math.bignumber(u.maximum)) : window.Decimal && (x = new window.Decimal(d)[u.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(u.maximum))), x ? [] : [{ path: b, property: "maximum", message: this.translate(u.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [u.maximum], u) }];
          }, minimum: function(u, d, b) {
            var x = u.exclusiveMinimum ? d > u.minimum : d >= u.minimum;
            return window.math ? x = window.math[u.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(d), window.math.bignumber(u.minimum)) : window.Decimal && (x = new window.Decimal(d)[u.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(u.minimum))), x ? [] : [{ path: b, property: "minimum", message: this.translate(u.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [u.minimum], u) }];
          } }, this._validateStringSubSchema = { maxLength: function(u, d, b) {
            var x = [];
            return "".concat(d).length > u.maxLength && x.push({ path: b, property: "maxLength", message: this.translate("error_maxLength", [u.maxLength], u) }), x;
          }, minLength: function(u, d, b) {
            return "".concat(d).length < u.minLength ? [{ path: b, property: "minLength", message: this.translate(u.minLength === 1 ? "error_notempty" : "error_minLength", [u.minLength], u) }] : [];
          }, pattern: function(u, d, b) {
            return new RegExp(u.pattern).test(d) ? [] : [{ path: b, property: "pattern", message: u.options && u.options.patternmessage ? u.options.patternmessage : this.translate("error_pattern", [u.pattern], u) }];
          } }, this._validateArraySubSchema = { items: function(u, d, b) {
            var x = this, P = [];
            if (Array.isArray(u.items)) for (var I = 0; I < d.length; I++) if (u.items[I]) P.push.apply(P, ut(this._validateSchema(u.items[I], d[I], "".concat(b, ".").concat(I))));
            else {
              if (u.additionalItems === !0) break;
              if (!u.additionalItems) {
                if (u.additionalItems === !1) {
                  P.push({ path: b, property: "additionalItems", message: this.translate("error_additionalItems", null, u) });
                  break;
                }
                break;
              }
              P.push.apply(P, ut(this._validateSchema(u.additionalItems, d[I], "".concat(b, ".").concat(I))));
            }
            else d.forEach(function($, G) {
              P.push.apply(P, ut(x._validateSchema(u.items, $, "".concat(b, ".").concat(G))));
            });
            return P;
          }, maxItems: function(u, d, b) {
            return d.length > u.maxItems ? [{ path: b, property: "maxItems", message: this.translate("error_maxItems", [u.maxItems], u) }] : [];
          }, minItems: function(u, d, b) {
            return d.length < u.minItems ? [{ path: b, property: "minItems", message: this.translate("error_minItems", [u.minItems], u) }] : [];
          }, uniqueItems: function(u, d, b) {
            for (var x = {}, P = 0; P < d.length; P++) {
              var I = JSON.stringify(d[P]);
              if (x[I]) return [{ path: b, property: "uniqueItems", message: this.translate("error_uniqueItems", null, u) }];
              x[I] = !0;
            }
            return [];
          } }, this._validateObjectSubSchema = { maxProperties: function(u, d, b) {
            return Object.keys(d).length > u.maxProperties ? [{ path: b, property: "maxProperties", message: this.translate("error_maxProperties", [u.maxProperties], u) }] : [];
          }, minProperties: function(u, d, b) {
            return Object.keys(d).length < u.minProperties ? [{ path: b, property: "minProperties", message: this.translate("error_minProperties", [u.minProperties], u) }] : [];
          }, required: function(u, d, b) {
            var x = this, P = [];
            return Array.isArray(u.required) && u.required.forEach(function(I) {
              if (d[I] === void 0) {
                var $ = x.jsoneditor.getEditor("".concat(b, ".").concat(I));
                $ && $.dependenciesFulfilled === !1 || $ && ["button", "info"].includes($.schema.format || $.schema.type) || P.push({ path: b, property: "required", message: x.translate("error_required", [u && u.properties && u.properties[I] && u.properties[I].title ? u.properties[I].title : I], u) });
              }
            }), P;
          }, properties: function(u, d, b, x) {
            var P = this, I = [];
            return Object.entries(u.properties).forEach(function($) {
              var G = Bi($, 2), ee = G[0], pe = G[1];
              x[ee] = !0, I.push.apply(I, ut(P._validateSchema(pe, d[ee], "".concat(b, ".").concat(ee))));
            }), I;
          }, patternProperties: function(u, d, b, x) {
            var P = this, I = [];
            return Object.entries(u.patternProperties).forEach(function($) {
              var G = Bi($, 2), ee = G[0], pe = G[1], _e = new RegExp(ee);
              Object.entries(d).forEach(function(we) {
                var Ie = Bi(we, 2), De = Ie[0], He = Ie[1];
                _e.test(De) && (x[De] = !0, I.push.apply(I, ut(P._validateSchema(pe, He, "".concat(b, ".").concat(De)))));
              });
            }), I;
          } }, this._validateObjectSubSchema2 = { propertyNames: function(u, d, b, x) {
            for (var P, I = this, $ = [], G = Object.keys(d), ee = null, pe = function() {
              var we = "";
              return ee = G[_e], typeof u.propertyNames == "boolean" ? u.propertyNames === !0 ? 0 : ($.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_false", [ee], u) }), 1) : Object.entries(u.propertyNames).every(function(Ie) {
                var De = Bi(Ie, 2), He = De[0], ve = De[1], xe = !1;
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
                    return $.push({ path: b, property: "propertyNames", message: I.translate("error_property_names_unsupported", [He], u) }), !1;
                }
                return $.push({ path: b, property: "propertyNames", message: I.translate(we, [ee], u) }), !1;
              }) ? void 0 : 1;
            }, _e = 0; _e < G.length && ((P = pe()) === 0 || P !== 1); _e++) ;
            return $;
          }, additionalProperties: function(u, d, b, x) {
            for (var P = [], I = Object.keys(d), $ = 0; $ < I.length; $++) {
              var G = I[$];
              if (!x[G]) {
                if (!u.additionalProperties) {
                  P.push({ path: b, property: "additionalProperties", message: this.translate("error_additional_properties", [G], u) });
                  break;
                }
                if (u.additionalProperties === !0) break;
                P.push.apply(P, ut(this._validateSchema(u.additionalProperties, d[G], "".concat(b, ".").concat(G))));
              }
            }
            return P;
          }, dependencies: function(u, d, b) {
            var x = this, P = [];
            return Object.entries(u.dependencies).forEach(function(I) {
              var $ = Bi(I, 2), G = $[0], ee = $[1];
              d[G] !== void 0 && (Array.isArray(ee) ? ee.forEach(function(pe) {
                d[pe] === void 0 && P.push({ path: b, property: "dependencies", message: x.translate("error_dependency", [pe], u) });
              }) : P.push.apply(P, ut(x._validateSchema(ee, d, b))));
            }), P;
          } };
        }, r = [{ key: "fitTest", value: function(n, a) {
          var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e7, t = { match: 0, extra: 0 };
          if (Gt(n) === "object" && n !== null) {
            var i = this._getSchema(a);
            if (i.anyOf) {
              var u, d = function(ee) {
                for (var pe = 1; pe < arguments.length; pe++) {
                  var _e = arguments[pe] != null ? arguments[pe] : {};
                  pe % 2 ? xl(Object(_e), !0).forEach(function(we) {
                    wh(ee, we, _e[we]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(ee, Object.getOwnPropertyDescriptors(_e)) : xl(Object(_e)).forEach(function(we) {
                    Object.defineProperty(ee, we, Object.getOwnPropertyDescriptor(_e, we));
                  });
                }
                return ee;
              }({}, t), b = function(ee, pe) {
                var _e = typeof Symbol < "u" && ee[Symbol.iterator] || ee["@@iterator"];
                if (!_e) {
                  if (Array.isArray(ee) || (_e = ks(ee))) {
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
                for (b.s(); !(u = b.n()).done; ) {
                  var x = u.value, P = this.fitTest(n, x, e);
                  (P.match > d.match || P.match === d.match && P.extra < d.extra) && (d = P);
                }
              } catch (ee) {
                b.e(ee);
              } finally {
                b.f();
              }
              return d;
            }
            var I = this._getSchema(a).properties;
            for (var $ in I) if (k(I, $)) {
              if (Gt(n[$]) === "object" && Gt(I[$]) === "object" && Gt(I[$].properties) === "object") {
                var G = this.fitTest(n[$], I[$], e / 100);
                t.match += G.match, t.extra += G.extra;
              }
              n[$] !== void 0 && (t.match += e);
            } else t.extra += e;
          }
          return t;
        } }, { key: "_getSchema", value: function(n) {
          return n === void 0 ? _({}, this.jsoneditor.expandRefs(this.schema)) : n;
        } }, { key: "validate", value: function(n) {
          return this._validateSchema(this.schema, n);
        } }, { key: "_validateSchema", value: function(n, a, e) {
          var t = this, i = [];
          return e = e || this.jsoneditor.root.formname, n = _({}, this.jsoneditor.expandRefs(n)), a === void 0 ? this._validateV3Required(n, a, e) : (Object.keys(n).forEach(function(u) {
            t._validateSubSchema[u] && i.push.apply(i, ut(t._validateSubSchema[u].call(t, n, a, e)));
          }), i.push.apply(i, ut(this._validateByValueType(n, a, e))), n.links && n.links.forEach(function(u, d) {
            u.rel && u.rel.toLowerCase() === "describedby" && (n = t._expandSchemaLink(n, d), i.push.apply(i, ut(t._validateSchema(n, a, e, t.translate))));
          }), ["date", "time", "datetime-local"].includes(n.format) && i.push.apply(i, ut(this._validateDateTimeSubSchema(n, a, e))), ["uuid"].includes(n.format) && i.push.apply(i, ut(this._validateUUIDSchema(n, a, e))), i.push.apply(i, ut(this._validateCustomValidator(n, a, e))), this._removeDuplicateErrors(i));
        } }, { key: "_expandSchemaLink", value: function(n, a) {
          var e = n.links[a].href, t = this.jsoneditor.root.getValue(), i = this.jsoneditor.compileTemplate(e, this.jsoneditor.template), u = document.location.origin + document.location.pathname + i(t);
          return n.links = n.links.slice(0, a).concat(n.links.slice(a + 1)), _({}, n, this.jsoneditor.refs[u]);
        } }, { key: "_validateV3Required", value: function(n, a, e) {
          return (n.required !== void 0 && n.required === !0 || n.required === void 0 && this.jsoneditor.options.required_by_default === !0) && n.type !== "info" ? [{ path: e, property: "required", message: this.translate("error_notset", null, n) }] : [];
        } }, { key: "_validateByValueType", value: function(n, a, e) {
          var t = this, i = [];
          if (a === null) return i;
          if (typeof a == "number") Object.keys(n).forEach(function(d) {
            t._validateNumberSubSchema[d] && i.push.apply(i, ut(t._validateNumberSubSchema[d].call(t, n, a, e)));
          });
          else if (typeof a == "string") Object.keys(n).forEach(function(d) {
            t._validateStringSubSchema[d] && i.push.apply(i, ut(t._validateStringSubSchema[d].call(t, n, a, e)));
          });
          else if (Array.isArray(a)) Object.keys(n).forEach(function(d) {
            t._validateArraySubSchema[d] && i.push.apply(i, ut(t._validateArraySubSchema[d].call(t, n, a, e)));
          });
          else if (Gt(a) === "object") {
            var u = {};
            Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema[d] && i.push.apply(i, ut(t._validateObjectSubSchema[d].call(t, n, a, e, u)));
            }), n.additionalProperties !== void 0 || !this.jsoneditor.options.no_additional_properties || n.oneOf || n.anyOf || n.allOf || (n.additionalProperties = !1), Object.keys(n).forEach(function(d) {
              t._validateObjectSubSchema2[d] !== void 0 && i.push.apply(i, ut(t._validateObjectSubSchema2[d].call(t, n, a, e, u)));
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
          if (n.type === "integer") return function(d, b, x) {
            return 1 * b < 1 ? [{ path: x, property: "format", message: t.translate("error_invalid_epoch", null, d) }] : b !== Math.abs(parseInt(b)) ? [{ path: x, property: "format", message: t.translate("error_".concat(d.format.replace(/-/g, "_")), [u], d) }] : [];
          }(n, a, e);
          if (i && i.flatpickr) {
            if (i) return function(d, b, x, P) {
              if (b !== "") {
                var I;
                if (P.flatpickr.config.mode !== "single") {
                  var $ = P.flatpickr.config.mode === "range" ? P.flatpickr.l10n.rangeSeparator : ", ";
                  I = P.flatpickr.selectedDates.map(function(ee) {
                    return P.flatpickr.formatDate(ee, P.flatpickr.config.dateFormat);
                  }).join($);
                }
                try {
                  if (I) {
                    if (I !== b) throw new Error("".concat(P.flatpickr.config.mode, " mismatch"));
                  } else if (P.flatpickr.formatDate(P.flatpickr.parseDate(b, P.flatpickr.config.dateFormat), P.flatpickr.config.dateFormat) !== b) throw new Error("mismatch");
                } catch {
                  var G = P.flatpickr.config.errorDateFormat !== void 0 ? P.flatpickr.config.errorDateFormat : P.flatpickr.config.dateFormat;
                  return [{ path: x, property: "format", message: t.translate("error_".concat(P.format.replace(/-/g, "_")), [G], d) }];
                }
              }
              return [];
            }(n, a, e, i);
          } else if (!{ date: /^(\d{4}\D\d{2}\D\d{2})$/, time: /^(\d{2}:\d{2}(?::\d{2})?)$/, "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)$/ }[n.format].test(a)) return [{ path: e, property: "format", message: this.translate("error_".concat(n.format.replace(/-/g, "_")), [u], n) }];
          return [];
        } }, { key: "_validateCustomValidator", value: function(n, a, e) {
          var t = this, i = [];
          i.push.apply(i, ut(_h.call(this, n, a, e, this.translate)));
          var u = function(d) {
            i.push.apply(i, ut(d.call(t, n, a, e)));
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
            return t !== null && !Array.isArray(t) && Gt(t) === "object";
          }, null: function(t) {
            return t === null;
          } };
          return typeof n == "string" ? !e[n] || e[n](a) : !this._validateSchema(n, a).length;
        } }], r && jh(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function fn(o) {
        return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fn(o);
      }
      function kh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, xh(a.key), a);
        }
      }
      function xh(o) {
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
      function Oh(o, r, n) {
        return r = Wt(r), function(a, e) {
          if (e && (fn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, El() ? Reflect.construct(r, n || [], Wt(o).constructor) : r.apply(o, n));
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
      function Kr() {
        return Kr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Wt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Kr.apply(this, arguments);
      }
      function Wt(o) {
        return Wt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Wt(o);
      }
      function Os(o, r) {
        return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
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
        }(r, o), n = r, (a = [{ key: "register", value: function() {
          if (this.editors) {
            for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
            this.editors[this.type] && this.editors[this.type].register();
          }
          Kr(Wt(r.prototype), "register", this).call(this);
        } }, { key: "unregister", value: function() {
          if (Kr(Wt(r.prototype), "unregister", this).call(this), this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4;
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            if (this.editors) for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].enable();
            this.switcher.disabled = !1, Kr(Wt(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          if (e && (this.always_disabled = !0), this.editors) for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable(e);
          this.switcher.disabled = !0, Kr(Wt(r.prototype), "disable", this).call(this);
        } }, { key: "switchEditor", value: function(e) {
          var t = this;
          this.lastType = this.type, this.editors[e] || this.buildChildEditor(e);
          var i = this.getValue();
          this.type = e, this.register(), this.editors.forEach(function(u, d) {
            var b, x;
            u && (t.type === d ? (t.keep_only_existing_values && (b = u.getValue(), x = i, Object.keys(x).forEach(function(P) {
              A.includes(P) || P in b && (b[P] = x[P]);
            }), i = b), (t.keep_values || t.if) && u.setValue(i, !0), u.container.style.display = "") : u.container.style.display = "none");
          }), this.onChange(!0, !1, { event: "switch", data: { type: this.lastType, path: this.editors[e].path } }), this.refreshValue(), this.refreshHeaderText();
        } }, { key: "buildChildEditor", value: function(e) {
          var t, i, u = this, d = this.types[e], b = this.theme.getChildEditorHolder();
          this.editor_holder.appendChild(b), typeof d == "string" ? (i = _({}, this.schema)).type = d : (i = _({}, this.schema, d), i = this.jsoneditor.expandRefs(i), d && d.required && Array.isArray(d.required) && this.schema.required && Array.isArray(this.schema.required) && (i.required = this.schema.required.concat(d.required))), (t = i) !== null && t !== void 0 && (t = t.options) !== null && t !== void 0 && t.dependencies && delete i.options.dependencies;
          var x = this.jsoneditor.getEditorClass(i);
          this.editors[e] = this.jsoneditor.createEditor(x, { jsoneditor: this.jsoneditor, schema: i, container: b, path: this.path, parent: this, required: !0 }), this.editors[e].preBuild(), this.editors[e].build(), this.editors[e].postBuild(), this.editors[e].header && this.theme.visuallyHidden(this.editors[e].header), this.editors[e].option = this.switcher_options[e], b.addEventListener("change_header_text", function() {
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
              fn(e) === "object" && Array.isArray(e) || (e = [e]);
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
            e.editors[d] = !1, typeof u == "string" ? (b = _({}, e.schema)).type = u : (b = _({}, e.schema, u), u.required && Array.isArray(u.required) && e.schema.required && Array.isArray(e.schema.required) && (b.required = e.schema.required.concat(u.required))), e.validators[d] = new Cl(e.jsoneditor, b, i, e.defaults);
          }), this.jsoneditor.on("change", function() {
            e.switchIf();
          }), this.switchEditor(0);
        } }, { key: "onChildEditorChange", value: function(e, t) {
          this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), Kr(Wt(r.prototype), "onChildEditorChange", this).call(this, e, t);
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
          this.validators.forEach(function(I, $) {
            var G = null;
            i.anyOf !== void 0 && i.anyOf && (G = I.fitTest(e), (d.match < G.match || d.match === G.match && d.extra > G.extra) && ((d = G).i = $)), I.validate(e).length || b.i !== null ? d = b : (b.i = $, G !== null && (b.match = G.match));
          });
          var x = b.i;
          this.anyOf !== void 0 && this.anyOf && b.match < d.match && (x = d.i), this.if && (x = this.getIfType(e)), x === null && (x = this.type), this.type = x, this.switcher.value = this.display_text[x];
          var P = this.type !== u;
          P && (this.switchEditor(this.type), this.editors[this.type].setValue(e, t)), e !== void 0 && this.editors[this.type].setValue(e, t), this.refreshValue(), this.onChange(P);
        } }, { key: "destroy", value: function() {
          this.editors.forEach(function(e) {
            e && e.destroy();
          }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), Kr(Wt(r.prototype), "destroy", this).call(this);
        } }, { key: "showValidationErrors", value: function(e) {
          var t = this;
          if (this.oneOf || this.anyOf) {
            var i = this.oneOf ? "oneOf" : "anyOf";
            this.editors.forEach(function(u, d) {
              if (u) {
                var b = "".concat(t.path, ".").concat(i, "[").concat(d, "]");
                u.showValidationErrors(e.reduce(function(x, P) {
                  if (P.path.startsWith(b) || P.path === b.substr(0, P.path.length)) {
                    var I = _({}, P);
                    P.path.startsWith(b) && (I.path = t.path + I.path.substr(b.length)), x.push(I);
                  }
                  return x;
                }, []));
              }
            });
          } else this.editors.forEach(function(u) {
            u && u.showValidationErrors(e);
          });
        } }, { key: "addLinks", value: function() {
        } }]) && kh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function Yn(o) {
        return Yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Yn(o);
      }
      function Eh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Sh(a.key), a);
        }
      }
      function Sh(o) {
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
      function Ph(o, r, n) {
        return r = ho(r), function(a, e) {
          if (e && (Yn(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Sl() ? Reflect.construct(r, n || [], ho(o).constructor) : r.apply(o, n));
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
      function ho(o) {
        return ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ho(o);
      }
      function Cs(o, r) {
        return Cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Cs(o, r);
      }
      var Th = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ph(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cs(e, t);
        }(r, o), n = r, (a = [{ key: "getValue", value: function() {
          if (this.dependenciesFulfilled) return null;
        } }, { key: "setValue", value: function() {
          this.onChange();
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }]) && Eh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function Pl(o, r) {
        var n = Object.keys(o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(o);
          r && (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })), n.push.apply(n, a);
        }
        return n;
      }
      function Qn(o) {
        for (var r = 1; r < arguments.length; r++) {
          var n = arguments[r] != null ? arguments[r] : {};
          r % 2 ? Pl(Object(n), !0).forEach(function(a) {
            po(o, a, n[a]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : Pl(Object(n)).forEach(function(a) {
            Object.defineProperty(o, a, Object.getOwnPropertyDescriptor(n, a));
          });
        }
        return o;
      }
      function po(o, r, n) {
        return (r = Ll(r)) in o ? Object.defineProperty(o, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : o[r] = n, o;
      }
      function Xn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], x = !0, P = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(x = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); x = !0) ;
            } catch (I) {
              P = !0, i = I;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (P) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return Tl(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Tl(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Tl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function wr(o) {
        return wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, wr(o);
      }
      function Lh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ll(a.key), a);
        }
      }
      function Ll(o) {
        var r = function(n, a) {
          if (wr(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (wr(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return wr(r) == "symbol" ? r : r + "";
      }
      function Ah(o, r, n) {
        return r = Rt(r), function(a, e) {
          if (e && (wr(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Al() ? Reflect.construct(r, n || [], Rt(o).constructor) : r.apply(o, n));
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
      function nr() {
        return nr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Rt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, nr.apply(this, arguments);
      }
      function Rt(o) {
        return Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Rt(o);
      }
      function Es(o, r) {
        return Es = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Es(o, r);
      }
      var Rl = function(o) {
        function r(e, t, i) {
          var u;
          return function(d, b) {
            if (!(d instanceof b)) throw new TypeError("Cannot call a class as a function");
          }(this, r), (u = Ah(this, r, [e, t])).currentDepth = i, u;
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Es(e, t);
        }(r, o), n = r, (a = [{ key: "getChildEditors", value: function() {
          return this.editors;
        } }, { key: "register", value: function() {
          nr(Rt(r.prototype), "register", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.register();
          });
        } }, { key: "unregister", value: function() {
          nr(Rt(r.prototype), "unregister", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            return e.unregister();
          });
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.maxwidth), 3);
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.editjson_control && (this.editjson_control.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), nr(Rt(r.prototype), "enable", this).call(this), this.editors && Object.values(this.editors).forEach(function(e) {
            (e.isActive() || e.isUiOnly) && e.enable(), e.optInCheckbox && (e.optInCheckbox.disabled = !1);
          }));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.editjson_control && (this.editjson_control.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), nr(Rt(r.prototype), "disable", this).call(this), this.editors && Object.values(this.editors).forEach(function(t) {
            (t.isActive() || t.isUiOnly) && t.disable(e), t.optInCheckbox.disabled = !0;
          });
        } }, { key: "layoutEditors", value: function() {
          var e, t, i = this;
          if (this.row_container) {
            var u;
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(He, ve) {
              var xe = i.editors[He].schema.propertyOrder, Ke = i.editors[ve].schema.propertyOrder;
              return typeof xe != "number" && (xe = 1e3), typeof Ke != "number" && (Ke = 1e3), xe - Ke;
            });
            var d, b = this.format === "categories", x = [], P = null, I = null;
            if (this.format === "grid-strict") {
              var $ = 0;
              if (d = [], this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  var xe = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), Ke = ve.options.hidden ? 0 : ve.options.grid_offset || 0, it = !ve.options.hidden && (ve.options.grid_break || !1), Ot = { key: He, width: xe, offset: Ke, height: ve.options.hidden ? 0 : ve.container.offsetHeight };
                  d.push(Ot), x[$] = d, it && ($++, d = []);
                }
              }), this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), u = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), u.appendChild(d), t = 0; t < x[e].length; t++) P = x[e][t].key, (I = this.editors[P]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, x[e][t].width, x[e][t].offset), d.appendChild(I.container);
            } else if (this.format === "grid") {
              for (this.property_order.forEach(function(He) {
                var ve = i.editors[He];
                if (!ve.property_removed) {
                  for (var xe = !1, Ke = ve.options.hidden ? 0 : ve.options.grid_columns || ve.getNumColumns(), it = ve.options.hidden ? 0 : ve.container.offsetHeight, Ot = 0; Ot < x.length; Ot++) x[Ot].width + Ke <= 12 && (!it || 0.5 * x[Ot].minh < it && 2 * x[Ot].maxh > it) && (xe = Ot);
                  xe === !1 && (x.push({ width: 0, minh: 999999, maxh: 0, editors: [] }), xe = x.length - 1), x[xe].editors.push({ key: He, width: Ke, height: it }), x[xe].width += Ke, x[xe].minh = Math.min(x[xe].minh, it), x[xe].maxh = Math.max(x[xe].maxh, it);
                }
              }), e = 0; e < x.length; e++) if (x[e].width < 12) {
                var G = !1, ee = 0;
                for (t = 0; t < x[e].editors.length; t++) (G === !1 || x[e].editors[t].width > x[e].editors[G].width) && (G = t), x[e].editors[t].width *= 12 / x[e].width, x[e].editors[t].width = Math.floor(x[e].editors[t].width), ee += x[e].editors[t].width;
                ee < 12 && (x[e].editors[G].width += 12 - ee), x[e].width = 12;
              }
              if (this.layout === JSON.stringify(x)) return !1;
              for (this.layout = JSON.stringify(x), u = document.createElement("div"), e = 0; e < x.length; e++) for (d = this.theme.getGridRow(), u.appendChild(d), t = 0; t < x[e].editors.length; t++) P = x[e].editors[t].key, (I = this.editors[P]).options.hidden ? I.container.style.display = "none" : this.theme.setGridColumnSize(I.container, x[e].editors[t].width), d.appendChild(I.container);
            } else {
              if (u = document.createElement("div"), b) {
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
                ve.property_removed || (d = i.theme.getGridRow(), u.appendChild(d), ve.options.hidden ? ve.container.style.display = "none" : i.theme.setGridColumnSize(ve.container, 12), d.appendChild(ve.container));
              });
            }
            for (; this.row_container.firstChild; ) this.row_container.removeChild(this.row_container.firstChild);
            this.row_container.appendChild(u);
          }
        } }, { key: "getPropertySchema", value: function(e) {
          var t = this, i = this.schema.properties[e] || {};
          i = _({}, i);
          var u = !!this.schema.properties[e];
          return this.schema.patternProperties && Object.keys(this.schema.patternProperties).forEach(function(d) {
            new RegExp(d).test(e) && (i.allOf = i.allOf || [], i.allOf.push(t.schema.patternProperties[d]), u = !0);
          }), !u && this.schema.additionalProperties && wr(this.schema.additionalProperties) === "object" && (i = _({}, this.schema.additionalProperties)), i;
        } }, { key: "preBuild", value: function() {
          var e = this;
          if (nr(Rt(r.prototype), "preBuild", this).call(this), this.editors = {}, this.cached_editors = {}, this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) Object.entries(this.schema.properties).forEach(function(t) {
            var i = Xn(t, 2), u = i[0], d = i[1], b = e.jsoneditor.getEditorClass(d);
            e.editors[u] = e.jsoneditor.createEditor(b, { jsoneditor: e.jsoneditor, schema: d, path: "".concat(e.path, ".").concat(u), parent: e, compact: !0, required: !0 }, e.currentDepth + 1), e.editors[u].preBuild();
            var x = e.editors[u].options.hidden ? 0 : e.editors[u].options.grid_columns || e.editors[u].getNumColumns();
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
            var d = Xn(u, 2), b = d[0], x = d[1], P = e.theme.getTableCell();
            e.editor_holder.appendChild(P), x.setContainer(P), x.build(), x.postBuild(), x.setOptInCheckbox(x.header), x.setValue(x.getDefault(), !0), e.editors[b].options.hidden && (P.style.display = "none"), e.editors[b].options.input_width && (P.style.width = e.editors[b].options.input_width);
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
                var d = e.editors[e.addproperty_input.value].key, b = e.editors[e.addproperty_input.value].type, x = e.editors[e.addproperty_input.value].path;
                e.onChange(!0, !1, { event: "add", data: { key: d, type: b, path: x } });
              }
            }), this.addproperty_input.addEventListener("input", function(u) {
              u.target.previousSibling.previousSibling.childNodes.forEach(function(d) {
                var b = d.innerText, x = u.target.value;
                e.options.case_sensitive_property_search || e.jsoneditor.options.case_sensitive_property_search || (b = b.toLowerCase(), x = x.toLowerCase()), b.includes(x) ? d.style.display = "" : d.style.display = "none";
              });
            }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input_label), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
            var i = document.createElement("div");
            i.style.clear = "both", this.addproperty_holder.appendChild(i), this.onOutsideModalClickListener = this.onOutsideModalClick.bind(this), document.addEventListener("click", this.onOutsideModalClickListener, !0), this.schema.description && (this.description = this.theme.getDescription(this.translateProperty(this.schema.description)), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), t ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.translateProperty(this.schema.title))), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), Object.values(this.editors).forEach(function(u) {
              var d = e.theme.getTabContent(), b = e.theme.getGridColumn(), x = !(!u.schema || u.schema.type !== "object" && u.schema.type !== "array");
              if (d.isObjOrArray = x, t) {
                if (x) {
                  var P = e.theme.getGridContainer();
                  P.appendChild(b), d.appendChild(P), e.tabPanesContainer.appendChild(d), e.row_container = P;
                } else e.row_container_basic === void 0 && (e.row_container_basic = e.theme.getGridContainer(), d.appendChild(e.row_container_basic), e.tabPanesContainer.childElementCount === 0 ? e.tabPanesContainer.appendChild(d) : e.tabPanesContainer.insertBefore(d, e.tabPanesContainer.childNodes[1])), e.row_container_basic.appendChild(b);
                e.addRow(u, e.tabs_holder, d), d.id = e.getValidId(u.schema.title);
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
          var t = this, i = this.jsoneditor.options.show_opt_in, u = this.options.show_opt_in !== void 0, d = u && this.options.show_opt_in === !0, b = u && this.options.show_opt_in === !1;
          (d || !b && i || !u && i) && Object.entries(this.editors).forEach(function(x) {
            var P = Xn(x, 2), I = P[0], $ = P[1];
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
                return Qn(Qn({}, t), {}, po({}, i, {}));
              case "additionalProperties":
              case "propertyNames":
                return Qn(Qn({}, t), {}, po({}, i, !0));
              default:
                return Qn(Qn({}, t), {}, po({}, i, e[i]));
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
          this.refreshValue(), nr(Rt(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "canHaveAdditionalProperties", value: function() {
          return typeof this.schema.additionalProperties == "boolean" ? this.schema.additionalProperties : wr(this.schema.additionalProperties) === "object" && this.schema.additionalProperties !== null || (typeof this.options.no_additional_properties == "boolean" ? !this.options.no_additional_properties : typeof this.jsoneditor.options.no_additional_properties != "boolean" || !this.jsoneditor.options.no_additional_properties);
        } }, { key: "destroy", value: function() {
          Object.values(this.cached_editors).forEach(function(e) {
            return e.destroy();
          }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClickListener, !0), nr(Rt(r.prototype), "destroy", this).call(this);
        } }, { key: "getValue", value: function() {
          if (this.dependenciesFulfilled) {
            var e = nr(Rt(r.prototype), "getValue", this).call(this);
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
              var b = Xn(d, 2), x = (b[0], b[1]);
              x.key === i && (u = x);
            }), u && !u.isActive() && u.activate();
          });
        } }, { key: "getDependentRequired", value: function(e) {
          return this.schema.dependentRequired && k(this.schema.dependentRequired, e) ? this.schema.dependentRequired[e] : [];
        } }, { key: "refreshAddProperties", value: function() {
          var e = this;
          if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) this.addproperty_button.style.display = "none";
          else {
            var t, i = 0, u = !1;
            Object.keys(this.editors).forEach(function(d) {
              return i++;
            }), t = this.canHaveAdditionalProperties() && !(this.schema.maxProperties !== void 0 && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, Object.keys(this.cached_editors).forEach(function(d) {
              e.addPropertyCheckbox(d), e.isRequiredObject(e.cached_editors[d]) && d in e.editors && (e.addproperty_checkboxes[d].disabled = !0), e.schema.minProperties !== void 0 && i <= e.schema.minProperties ? (e.addproperty_checkboxes[d].disabled = e.addproperty_checkboxes[d].checked, e.addproperty_checkboxes[d].checked || (u = !0)) : d in e.editors ? u = !0 : t || k(e.schema.properties, d) ? (e.addproperty_checkboxes[d].disabled = !1, u = !0) : e.addproperty_checkboxes[d].disabled = !0;
            }), this.canHaveAdditionalProperties() && (u = !0), Object.keys(this.schema.properties).forEach(function(d) {
              e.cached_editors[d] || (u = !0, e.addPropertyCheckbox(d));
            }), u ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_button.style.display = "none");
          }
        } }, { key: "isRequiredObject", value: function(e) {
          if (e) return typeof e.schema.required == "boolean" ? e.schema.required : Array.isArray(this.schema.required) ? this.schema.required.includes(e.key) : !!this.jsoneditor.options.required_by_default;
        } }, { key: "setValue", value: function(e, t) {
          var i = this;
          (wr(e = (e = this.applyConstFilter(e)) || {}) !== "object" || Array.isArray(e)) && (e = {}), Object.entries(this.cached_editors).forEach(function(u) {
            var d = Xn(u, 2), b = d[0], x = d[1];
            e[b] !== void 0 ? (i.addObjectProperty(b), x.setValue(e[b], t), x.activate(), i.disabled && x.disable()) : t || i.isRequiredObject(x) ? x.setValue(x.getDefault(), t) : i.jsoneditor.options.show_opt_in || i.options.show_opt_in ? x.deactivate() : i.removeObjectProperty(b);
          }), Object.entries(e).forEach(function(u) {
            var d = Xn(u, 2), b = d[0], x = d[1];
            i.cached_editors[b] || (i.addObjectProperty(b), i.editors[b] && i.editors[b].setValue(x, t, !!i.editors[b].template));
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
        } }]) && Lh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z);
      function ei(o) {
        return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ei(o);
      }
      function Rh(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Ih(a.key), a);
        }
      }
      function Ih(o) {
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
      function Bh(o, r, n) {
        return r = jr(r), function(a, e) {
          if (e && (ei(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Il() ? Reflect.construct(r, n || [], jr(o).constructor) : r.apply(o, n));
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
      function ti() {
        return ti = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = jr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, ti.apply(this, arguments);
      }
      function jr(o) {
        return jr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jr(o);
      }
      function Ss(o, r) {
        return Ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ss(o, r);
      }
      Rl.rules = { ".je-object__title": "display:inline-block", ".je-object__controls": "margin:0%200%200%2010px", ".je-object__container": "position:relative", ".je-object__property-checkbox": "margin:0;height:auto", ".property-selector": "width:295px;max-height:160px;padding:5px%200;overflow-y:auto;overflow-x:hidden;padding-left:5px", ".property-selector-input": "width:220px;margin-bottom:0;display:inline-block", ".json-editor-btntype-toggle": "margin:0%2010px%200%200", ".je-edit-json--textarea": "height:170px;width:300px;display:block" };
      var Nh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Bh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ss(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          ti(jr(r.prototype), "preBuild", this).call(this);
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
            var d = this.theme.getFormRadioLabel(this.enum_display[i]);
            d.htmlFor = this.input.id;
            var b = this.theme.getFormRadioControl(d, this.input, !(this.options.layout !== "horizontal" && !this.options.compact));
            this.radioContainer.appendChild(b);
          }
          if (this.schema.readOnly || this.schema.readonly) {
            this.disable(!0);
            for (var x = 0; x < this.radioGroup.length; x++) this.radioGroup[x].disabled = !0;
            this.radioContainer.classList.add("readonly");
          }
          var P = this.theme.getContainer();
          P.appendChild(this.radioContainer), P.dataset.containerFor = "radio", this.input = P, this.control = this.theme.getFormControl(this.label, P, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
            e.input.parentNode && e.afterInputReady();
          });
        } }, { key: "enable", value: function() {
          if (!this.always_disabled) {
            for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !1;
            this.radioContainer.classList.remove("readonly"), ti(jr(r.prototype), "enable", this).call(this);
          }
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0);
          for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !0;
          this.radioContainer.classList.add("readonly"), ti(jr(r.prototype), "disable", this).call(this);
        } }, { key: "destroy", value: function() {
          this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), ti(jr(r.prototype), "destroy", this).call(this);
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
        } }]) && Rh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ai);
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
        return r = Jt(r), function(a, e) {
          if (e && (ri(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Bl() ? Reflect.construct(r, n || [], Jt(o).constructor) : r.apply(o, n));
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
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Jt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Zr.apply(this, arguments);
      }
      function Jt(o) {
        return Jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Jt(o);
      }
      function Ps(o, r) {
        return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ps(o, r);
      }
      var Hh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Mh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ps(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Zr(Jt(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.sceditor_instance && this.sceditor_instance.val(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Zr(Jt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.sceditor) {
            var t = this.expandCallbacks("sceditor", _({}, { format: this.input_type, emoticonsEnabled: !1, width: "100%", height: 300, readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, { element: this.input })), i = window.sceditor.instance(this.input);
            i === void 0 && window.sceditor.create(this.input, t), this.sceditor_instance = i || window.sceditor.instance(this.input), this.sceditor_instance.blur(function() {
              e.value = e.sceditor_instance.val(), e.sceditor_instance.updateOriginal(), e.is_dirty = !0, e.onChange(!0);
            }), this.theme.afterInputReady(this.input);
          } else Zr(Jt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), Zr(Jt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.sceditor_instance && this.sceditor_instance.readOnly(!0), Zr(Jt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), Zr(Jt(r.prototype), "destroy", this).call(this);
        } }]) && Dh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe);
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
        return r = ir(r), function(a, e) {
          if (e && (ni(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Nl() ? Reflect.construct(r, n || [], ir(o).constructor) : r.apply(o, n));
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
      function Ts(o, r) {
        return Ts = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ts(o, r);
      }
      var Uh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ts(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.select2_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0);
          } else yn(ir(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
            var t = this.expandCallbacks("select2", _({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
            this.newEnumAllowed = t.tags = !!t.tags && this.schema.type === "string", this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = k(this.select2_instance.select2, "amd"), this.selectChangeHandler = function() {
              var i = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
              e.updateValue(i), e.onChange(!0);
            }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler);
          }
          yn(ir(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t, i = this.typecast(e), u = !1;
          return this.enum_values.includes(i) || i === "" || (this.enum_options.push("".concat(i)), this.enum_display.push("".concat(i)), this.enum_values.push(i), this.schema.enum.push(i), (t = this.input.querySelector('option[value="'.concat(i, '"]'))) ? t.removeAttribute("data-select2-tag") : this.select2_instance.append(new Option(i, i, !1, !1)).trigger("change"), u = !0), u;
        } }, { key: "enable", value: function() {
          this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), yn(ir(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), yn(ir(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), yn(ir(r.prototype), "destroy", this).call(this);
        } }]) && Vh(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ai);
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
        return r = Kt(r), function(a, e) {
          if (e && (ii(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Dl() ? Reflect.construct(r, n || [], Kt(o).constructor) : r.apply(o, n));
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
      function Yr() {
        return Yr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Kt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Yr.apply(this, arguments);
      }
      function Kt(o) {
        return Kt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Kt(o);
      }
      function Ls(o, r) {
        return Ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ls(o, r);
      }
      var Jh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Wh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ls(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t) {
          if (e = this.applyConstFilter(e), this.selectize_instance) {
            t ? this.is_dirty = !1 : this.jsoneditor.options.show_errors === "change" && (this.is_dirty = !0);
            var i = this.updateValue(e);
            this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0);
          } else Yr(Kt(r.prototype), "setValue", this).call(this, e, t);
        } }, { key: "afterInputReady", value: function() {
          var e = this;
          if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
            var t = this.expandCallbacks("selectize", _({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
            this.newEnumAllowed = t.create = !!t.create && this.schema.type === "string", this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(i) {
              e.updateValue(i), e.onChange(!0);
            }, this.selectize_instance.on("change", this.multiselectChangeHandler);
          }
          Yr(Kt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "updateValue", value: function(e) {
          var t = this.enum_values[0];
          return e = this.typecast(e || ""), this.enum_values.includes(e) ? t = e : this.newEnumAllowed && (t = this.addNewOption(e) ? e : t), this.value = t, t;
        } }, { key: "addNewOption", value: function(e) {
          var t = this.typecast(e), i = !1;
          return this.enum_values.includes(t) || t === "" || (this.enum_options.push("".concat(t)), this.enum_display.push("".concat(t)), this.enum_values.push(t), this.schema.enum.push(t), this.selectize_instance.addItem(t), this.selectize_instance.refreshOptions(!1), i = !0), i;
        } }, { key: "onWatchedFieldChange", value: function() {
          var e = this;
          Yr(Kt(r.prototype), "onWatchedFieldChange", this).call(this), this.selectize_instance && (this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(t, i) {
            e.selectize_instance.addOption({ value: t, text: e.enum_display[i] });
          }), this.selectize_instance.addItem("".concat(this.value), !0));
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), Yr(Kt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.selectize_instance && this.selectize_instance.lock(), Yr(Kt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), Yr(Kt(r.prototype), "destroy", this).call(this);
        } }]) && $h(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(Ai);
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
        return r = fo(r), function(a, e) {
          if (e && (oi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Fl() ? Reflect.construct(r, n || [], fo(o).constructor) : r.apply(o, n));
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
      function fo(o) {
        return fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, fo(o);
      }
      function As(o, r) {
        return As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, As(o, r);
      }
      var Qh = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Yh(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && As(e, t);
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
            b.classList.add("tiny", "button"), b.innerHTML = "Clear signature", d.appendChild(b), i.appendChild(d), this.options.compact && this.container.setAttribute("class", "".concat(this.container.getAttribute("class"), " compact")), (this.schema.readOnly || this.schema.readonly) && (this.disable(!0), Array.from(this.inputs).forEach(function(P) {
              u.setAttribute("readOnly", "readOnly"), P.disabled = !0;
            })), b.addEventListener("click", function(P) {
              P.preventDefault(), P.stopPropagation(), e.signaturePad.clear(), e.signaturePad.strokeEnd();
            }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), u.width = i.offsetWidth, this.options && this.options.canvas_height ? u.height = this.options.canvas_height : u.height = "300";
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
        return r = Zt(r), function(a, e) {
          if (e && (si(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ml() ? Reflect.construct(r, n || [], Zt(o).constructor) : r.apply(o, n));
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
      function Qr() {
        return Qr = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Zt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Qr.apply(this, arguments);
      }
      function Zt(o) {
        return Zt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Zt(o);
      }
      function Rs(o, r) {
        return Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Rs(o, r);
      }
      v(6031);
      var rp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), tp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rs(e, t);
        }(r, o), n = r, (a = [{ key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = Qr(Zt(r.prototype), "setValue", this).call(this, e, t, i);
          u !== void 0 && u.changed && this.simplemde_instance && this.simplemde_instance.value(u.value);
        } }, { key: "build", value: function() {
          this.options.format = "textarea", Qr(Zt(r.prototype), "build", this).call(this), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type);
        } }, { key: "afterInputReady", value: function() {
          var e, t = this;
          window.SimpleMDE ? (e = this.expandCallbacks("simplemde", _({}, { height: 300 }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, { element: this.input, forceSync: !0 })), this.simplemde_instance = new window.SimpleMDE(e), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
            t.value = t.simplemde_instance.value(), t.is_dirty = !0, t.onChange(!0);
          }), e.autorefresh && this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 }), this.theme.afterInputReady(this.input)) : Qr(Zt(r.prototype), "afterInputReady", this).call(this);
        } }, { key: "getNumColumns", value: function() {
          return 6;
        } }, { key: "enable", value: function() {
          !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), Qr(Zt(r.prototype), "enable", this).call(this);
        } }, { key: "disable", value: function(e) {
          this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), Qr(Zt(r.prototype), "disable", this).call(this, e);
        } }, { key: "destroy", value: function() {
          this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), Qr(Zt(r.prototype), "destroy", this).call(this);
        } }, { key: "startListening", value: function(e, t) {
          var i = this, u = function d() {
            e.display.wrapper.offsetHeight ? (i.stopListening(e, t), e.display.lastWrapHeight !== e.display.wrapper.clientHeight && e.refresh()) : t.timeout = window.setTimeout(d, t.delay);
          };
          t.timeout = window.setTimeout(u, t.delay), t.hurry = function() {
            window.clearTimeout(t.timeout), t.timeout = window.setTimeout(u, 50);
          }, e.on(window, "mouseup", t.hurry), e.on(window, "keyup", t.hurry);
        } }, { key: "stopListening", value: function(e, t) {
          window.clearTimeout(t.timeout), e.off(window, "mouseup", t.hurry), e.off(window, "keyup", t.hurry);
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
      function np(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, ip(a.key), a);
        }
      }
      function ip(o) {
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
      function op(o, r, n) {
        return r = mn(r), function(a, e) {
          if (e && (ai(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Hl() ? Reflect.construct(r, n || [], mn(o).constructor) : r.apply(o, n));
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
      function yo() {
        return yo = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = mn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, yo.apply(this, arguments);
      }
      function mn(o) {
        return mn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, mn(o);
      }
      function Is(o, r) {
        return Is = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Is(o, r);
      }
      var Vl = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), op(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Is(e, t);
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
          }, d = this.enum_values.length - 1; d > -1; d--) {
            var b = this.formname + (d + 1), x = this.theme.getFormInputField("radio");
            x.name = "".concat(this.formname, "[starrating]"), x.value = this.enum_values[d], x.id = b, x.addEventListener("change", u, !1), this.radioGroup.push(x);
            var P = document.createElement("label");
            P.htmlFor = b, P.title = this.enum_values[d], this.options.displayValue && P.classList.add("starrating-display-enabled");
            var I = this.theme.getHiddenText("label");
            I.textContent = d, P.appendChild(I), this.ratingContainer.appendChild(x), this.ratingContainer.appendChild(P);
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
          this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), yo(mn(r.prototype), "destroy", this).call(this);
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
          yo(mn(r.prototype), "setValue", this).call(this, this.value);
        } }]) && np(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
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
        return r = Xr(r), function(a, e) {
          if (e && (li(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, zl() ? Reflect.construct(r, n || [], Xr(o).constructor) : r.apply(o, n));
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
      function Ni() {
        return Ni = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Xr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Ni.apply(this, arguments);
      }
      function Xr(o) {
        return Xr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Xr(o);
      }
      function Bs(o, r) {
        return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Bs(o, r);
      }
      Vl.rules = { ".starrating": "direction:rtl;display:inline-block;white-space:nowrap", ".starrating > input": "display:none", ".starrating > label:before": "content:'%5C2606';margin:1px;font-size:18px;font-style:normal;font-weight:400;line-height:1;font-family:'Arial';display:inline-block", ".starrating > label": "color:%23888;cursor:pointer;margin:8px%200%202px%200", ".starrating > label.starrating-display-enabled": "margin:1px%200%200%200", ".starrating > input:checked ~ label": "color:%23ffca08", ".starrating:not(.readonly) > input:hover ~ label": "color:%23ffca08", ".starrating > input:checked ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating:not(.readonly) > input:hover ~ label:before": "content:'%5C2605';text-shadow:0%200%201px%20rgba(0%2C20%2C20%2C1)", ".starrating .starrating-display": "position:relative;direction:rtl;text-align:center;font-size:10px;line-height:0px" };
      var up = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), lp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Bs(e, t);
        }(r, o), n = r, (a = [{ key: "build", value: function() {
          Ni(Xr(r.prototype), "build", this).call(this), this.input.setAttribute("type", "number"), this.input.getAttribute("step") || this.input.setAttribute("step", "1");
          var e = this.theme.getStepperButtons(this.input);
          this.control.appendChild(e), this.stepperDown = this.control.querySelector(".stepper-down"), this.stepperUp = this.control.querySelector(".stepper-up");
        } }, { key: "enable", value: function() {
          Ni(Xr(r.prototype), "enable", this).call(this), this.stepperDown.removeAttribute("disabled"), this.stepperUp.removeAttribute("disabled");
        } }, { key: "disable", value: function() {
          Ni(Xr(r.prototype), "disable", this).call(this), this.stepperDown.setAttribute("disabled", !0), this.stepperUp.setAttribute("disabled", !0);
        } }]) && sp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(wl);
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
        return r = or(r), function(a, e) {
          if (e && (ui(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ql() ? Reflect.construct(r, n || [], or(o).constructor) : r.apply(o, n));
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
      function bn() {
        return bn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = or(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, bn.apply(this, arguments);
      }
      function or(o) {
        return or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, or(o);
      }
      function Ns(o, r) {
        return Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ns(o, r);
      }
      var pp = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ns(e, t);
        }(r, o), n = r, a = [{ key: "register", value: function() {
          if (bn(or(r.prototype), "register", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].register();
        } }, { key: "unregister", value: function() {
          if (bn(or(r.prototype), "unregister", this).call(this), this.rows) for (var e = 0; e < this.rows.length; e++) this.rows[e].unregister();
        } }, { key: "getNumColumns", value: function() {
          return Math.max(Math.min(12, this.width), 3);
        } }, { key: "preBuild", value: function() {
          var e = this.jsoneditor.expandRefs(this.schema.items || {});
          this.item_title = e.title || "row", this.item_default = e.default || null, this.item_has_child_editors = e.properties || e.items, this.width = 12, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top, bn(or(r.prototype), "preBuild", this).call(this);
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
          this.refreshValue(), bn(or(r.prototype), "onChildEditorChange", this).call(this, e, t);
        } }, { key: "getItemDefault", value: function() {
          return _({}, { default: this.item_default }).default;
        } }, { key: "getItemTitle", value: function() {
          return this.item_title;
        } }, { key: "getElementEditor", value: function(e, t) {
          var i = _({}, this.schema.items), u = this.jsoneditor.getEditorClass(i, this.jsoneditor), d = this.row_holder.appendChild(this.theme.getTableRow()), b = d;
          this.item_has_child_editors || (b = this.theme.getTableCell(), d.appendChild(b));
          var x = this.jsoneditor.createEditor(u, { jsoneditor: this.jsoneditor, schema: i, container: b, path: "".concat(this.path, ".").concat(e), parent: this, compact: !0, table_row: !0 });
          return x.preBuild(), t || (x.build(), x.postBuild(), x.controls_cell = d.appendChild(this.theme.getTableCell()), x.row = d, x.table_controls = this.theme.getButtonHolder(), x.controls_cell.appendChild(x.table_controls), x.table_controls.style.margin = 0, x.table_controls.style.padding = 0), x;
        } }, { key: "destroy", value: function() {
          this.innerHTML = "", this.checkParent(this.title) && this.title.parentNode.removeChild(this.title), this.checkParent(this.description) && this.description.parentNode.removeChild(this.description), this.checkParent(this.row_holder) && this.row_holder.parentNode.removeChild(this.row_holder), this.checkParent(this.table) && this.table.parentNode.removeChild(this.table), this.checkParent(this.panel) && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, bn(or(r.prototype), "destroy", this).call(this);
        } }, { key: "ensureArraySize", value: function(e) {
          if (Array.isArray(e) || (e = [e]), this.schema.minItems) for (; e.length < this.schema.minItems; ) e.push(this.getItemDefault());
          return this.schema.maxItems && e.length > this.schema.maxItems && (e = e.slice(0, this.schema.maxItems)), e;
        } }, { key: "setValue", value: function() {
          var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], i = arguments.length > 1 ? arguments[1] : void 0;
          if (t = this.applyConstFilter(t), t = this.ensureArraySize(t), JSON.stringify(t) !== this.serialized) {
            var u = !1;
            t.forEach(function(x, P) {
              e.rows[P] ? e.rows[P].setValue(x) : (e.addRow(x), u = !0);
            });
            for (var d = t.length; d < this.rows.length; d++) {
              var b = this.rows[d].container;
              this.item_has_child_editors || this.rows[d].row.parentNode.removeChild(this.rows[d].row), this.rows[d].destroy(), b.parentNode && b.parentNode.removeChild(b), this.rows[d] = null, u = !0;
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
          var d = u.some(function($) {
            return $;
          });
          this.rows.forEach(function($) {
            return e.setButtonState($.controls_cell, d);
          }), this.setButtonState(this.controls_header_cell, d), this.setButtonState(this.table, this.value.length);
          var b = !(i || this.hide_add_button);
          this.setButtonState(this.add_row_button, b);
          var x = !(!this.value.length || t || this.hide_delete_last_row_buttons);
          this.setButtonState(this.delete_last_row_button, x);
          var P = !(this.value.length <= 1 || t || this.hide_delete_all_rows_buttons);
          this.setButtonState(this.remove_all_rows_button, P);
          var I = b || x || P;
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
            var b = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue(), P = i.getValue()[b];
            x.splice(b, 1), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("deleteRow", P);
          }), t.appendChild(u), u;
        } }, { key: "_createCopyButton", value: function(e, t) {
          var i = this, u = this.getButton("", "copy", "button_copy_row_title_short"), d = this.schema;
          return u.classList.add("copy", "json-editor-btntype-copy"), u.setAttribute("data-i", e), u.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation();
            var x = 1 * b.currentTarget.getAttribute("data-i"), P = i.getValue(), I = P[x];
            d.items.type === "string" && d.items.format === "uuid" ? I = L() : d.items.type === "object" && d.items.properties && P.forEach(function($, G) {
              if (x === G) for (var ee = 0, pe = Object.keys($); ee < pe.length; ee++) {
                var _e = pe[ee];
                d.items.properties && d.items.properties[_e] && d.items.properties[_e].format === "uuid" && ((I = Object.assign({}, P[x]))[_e] = L());
              }
            }), P.splice(x + 1, 0, I), i.setValue(P), i.onChange(!0), i.jsoneditor.trigger("copyRow", i.rows[x + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveUpButton", value: function(e, t) {
          var i = this, u = this.getButton("", "moveup", "button_move_up_title");
          return u.classList.add("moveup", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(b - 1, 0, x.splice(b, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b - 1]);
          }), t.appendChild(u), u;
        } }, { key: "_createMoveDownButton", value: function(e, t) {
          var i = this, u = this.getButton("", "movedown", "button_move_down_title");
          return u.classList.add("movedown", "json-editor-btntype-move"), u.setAttribute("data-i", e), u.addEventListener("click", function(d) {
            d.preventDefault(), d.stopPropagation();
            var b = 1 * d.currentTarget.getAttribute("data-i"), x = i.getValue();
            x.splice(b + 1, 0, x.splice(b, 1)[0]), i.setValue(x), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[b + 1]);
          }), t.appendChild(u), u;
        } }, { key: "_supportDragDrop", value: function(e) {
          var t = this;
          le(e, function(i, u) {
            var d = t.getValue(), b = d[i];
            d.splice(i, 1), d.splice(u, 0, b), t.setValue(d), t.onChange(!0), t.jsoneditor.trigger("moveRow", t.rows[u]);
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
        } }], a && cp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(he);
      function ci(o) {
        return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ci(o);
      }
      function fp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, yp(a.key), a);
        }
      }
      function yp(o) {
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
      function mp(o, r, n) {
        return r = en(r), function(a, e) {
          if (e && (ci(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ul() ? Reflect.construct(r, n || [], en(o).constructor) : r.apply(o, n));
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
      function Di() {
        return Di = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = en(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Di.apply(this, arguments);
      }
      function en(o) {
        return en = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, en(o);
      }
      function Ds(o, r) {
        return Ds = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ds(o, r);
      }
      function di(o) {
        return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, di(o);
      }
      function bp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, vp(a.key), a);
        }
      }
      function vp(o) {
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
      function gp(o, r, n) {
        return r = tn(r), function(a, e) {
          if (e && (di(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, $l() ? Reflect.construct(r, n || [], tn(o).constructor) : r.apply(o, n));
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
      function Fi() {
        return Fi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = tn(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, Fi.apply(this, arguments);
      }
      function tn(o) {
        return tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, tn(o);
      }
      function Fs(o, r) {
        return Fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Fs(o, r);
      }
      function hi(o) {
        return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, hi(o);
      }
      function _p(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, wp(a.key), a);
        }
      }
      function wp(o) {
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
      function jp(o, r, n) {
        return r = sr(r), function(a, e) {
          if (e && (hi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Gl() ? Reflect.construct(r, n || [], sr(o).constructor) : r.apply(o, n));
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
      function vn() {
        return vn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = sr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
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
        return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ms(o, r);
      }
      v(9868);
      var mo = { ace: tt, array: he, arrayChoices: un, arraySelect2: fd, arraySelectize: vd, autocomplete: jd, base64: Cd, button: al, checkbox: Rd, choices: dl, datetime: qd, describedBy: Wd, enum: Yd, hidden: th, info: oh, integer: wl, ip: yh, jodit: gh, multiple: Ch, multiselect: Ae, null: Th, number: gl, object: Rl, radio: Nh, sceditor: Hh, select: Ai, select2: Uh, selectize: Jh, signature: Qh, simplemde: rp, starrating: Vl, stepper: up, string: fe, table: pp, upload: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ds(e, t);
        }(r, o), n = r, (a = [{ key: "getNumColumns", value: function() {
          return 4;
        } }, { key: "build", value: function() {
          var e = this;
          if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))), this.options.hidden && (this.container.style.display = "none"), this.options = this.expandCallbacks("upload", _({}, { title: "Browse", icon: "", auto_upload: !1, hide_input: !1, enable_drag_drop: !1, drop_zone_text: "Drag & Drop file here", drop_zone_top: !1, alt_drop_zone: "", mime_type: "", max_upload_size: 0, upload_handler: function(u, d, b, x) {
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
                b.onload = function(x) {
                  e.preview_value = x.target.result, e.refreshPreview(d), e.onChange(!0), b = null;
                }, b.readAsDataURL(d[0]);
              } else e.theme.addInputError(e.uploader, "".concat(e.translate("upload_wrong_file_format"), " ").concat(e.options.mime_type.toString()));
            }, this.uploader.addEventListener("change", this.uploadHandler), this.dragHandler = function(u) {
              var d = u.dataTransfer.items || u.dataTransfer.files, b = d && d.length && (e.options.mime_type.length === 0 || e.isValidMimeType(d[0].type, e.options.mime_type)), x = u.currentTarget.classList && u.currentTarget.classList.contains("upload-dropzone") && b;
              switch ((u.currentTarget === window ? "w_" : "e_") + u.type) {
                case "w_drop":
                case "w_dragover":
                  x || (u.dataTransfer.dropEffect = "none");
                  break;
                case "e_dragenter":
                  x ? (e.dropZone.classList.add("valid-dropzone"), u.dataTransfer.dropEffect = "copy") : e.dropZone.classList.add("invalid-dropzone");
                  break;
                case "e_dragover":
                  x && (u.dataTransfer.dropEffect = "copy");
                  break;
                case "e_dragleave":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone");
                  break;
                case "e_drop":
                  e.dropZone.classList.remove("valid-dropzone", "invalid-dropzone"), x && e.uploadHandler(u);
              }
              x || u.preventDefault();
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
            b.addEventListener("click", function(x) {
              x.preventDefault(), b.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.options.upload_handler(t.path, i, { success: function(P) {
                t.setValue(P), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, failure: function(P) {
                t.theme.addInputError(t.uploader, P), t.progressBar && t.preview.removeChild(t.progressBar), b.removeAttribute("disabled");
              }, updateProgress: function(P) {
                t.progressBar && (P ? t.theme.updateProgressBar(t.progressBar, P) : t.theme.updateProgressBarUnknown(t.progressBar));
              } });
            }), this.preview.appendChild(this.theme.getUploadPreview(i, b, this.preview_value)), this.options.auto_upload && (b.dispatchEvent(new window.MouseEvent("click")), b.parentNode.removeChild(b));
          }
        } }, { key: "enable", value: function() {
          this.always_disabled || (this.uploader && (this.uploader.disabled = !1), Di(en(r.prototype), "enable", this).call(this));
        } }, { key: "disable", value: function(e) {
          e && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), Di(en(r.prototype), "disable", this).call(this);
        } }, { key: "setValue", value: function(e) {
          e = this.applyConstFilter(e), this.value !== e && (this.value = e, this.input.value = this.value, this.onChange());
        } }, { key: "destroy", value: function() {
          var e = this;
          this.options.enable_drag_drop === !0 && (["dragover", "drop"].forEach(function(t) {
            window.removeEventListener(t, e.dragHandler, !0);
          }), ["dragenter", "dragover", "dragleave", "drop"].forEach(function(t) {
            e.dropZone.removeEventListener(t, e.dragHandler, !0);
          }), this.dropZone.removeEventListener("dblclick", this.clickHandler), this.dropZone && this.dropZone.parentNode && this.dropZone.parentNode.removeChild(this.dropZone)), this.uploader && this.uploader.parentNode && (this.uploader.removeEventListener("change", this.uploadHandler), this.uploader.parentNode.removeChild(this.uploader)), this.browseButton && this.browseButton.parentNode && (this.browseButton.removeEventListener("click", this.clickHandler), this.browseButton.parentNode.removeChild(this.browseButton)), this.fileDisplay && this.fileDisplay.parentNode && (this.fileDisplay.removeEventListener("dblclick", this.clickHandler), this.fileDisplay.parentNode.removeChild(this.fileDisplay)), this.fileUploadGroup && this.fileUploadGroup.parentNode && this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup), this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.header && this.header.parentNode && this.header.parentNode.removeChild(this.header), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), Di(en(r.prototype), "destroy", this).call(this);
        } }, { key: "isValidMimeType", value: function(e, t) {
          return t.reduce(function(i, u) {
            return i || new RegExp(u.replace(/\*/g, ".*"), "gi").test(e);
          }, !1);
        } }]) && fp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(z), uuid: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), gp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Fs(e, t);
        }(r, o), n = r, (a = [{ key: "preBuild", value: function() {
          Fi(tn(r.prototype), "preBuild", this).call(this), this.schema.default = this.uuid = this.getUuid(), this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = { delimiters: ["-"], blocks: [8, 4, 4, 4, 12] });
        } }, { key: "build", value: function() {
          Fi(tn(r.prototype), "build", this).call(this), this.disable(!0), this.input.setAttribute("readonly", "true");
        } }, { key: "sanitize", value: function(e) {
          return e = this.purify(e), this.testUuid(e) || (e = this.uuid), e;
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e), this.testUuid(e) || (e = this.uuid), this.uuid = e, Fi(tn(r.prototype), "setValue", this).call(this, e, t, i);
        } }, { key: "getUuid", value: function() {
          return L();
        } }, { key: "testUuid", value: function(e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e);
        } }]) && bp(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe), colorpicker: function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), jp(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ms(e, t);
        }(r, o), n = r, (a = [{ key: "postBuild", value: function() {
          window.Picker && (this.input.type = "text"), this.input.style.padding = "3px";
        } }, { key: "setValue", value: function(e, t, i) {
          e = this.applyConstFilter(e);
          var u = vn(sr(r.prototype), "setValue", this).call(this, e, t, i);
          return this.picker_instance && this.picker_instance.domElement && u && u.changed && this.picker_instance.setColor(u.value, !0), u;
        } }, { key: "getNumColumns", value: function() {
          return 2;
        } }, { key: "afterInputReady", value: function() {
          vn(sr(r.prototype), "afterInputReady", this).call(this), this.createPicker(!0);
        } }, { key: "disable", value: function() {
          if (vn(sr(r.prototype), "disable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "none";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !0;
          }
        } }, { key: "enable", value: function() {
          if (vn(sr(r.prototype), "enable", this).call(this), this.picker_instance && this.picker_instance.domElement) {
            this.picker_instance.domElement.style.pointerEvents = "auto";
            for (var e = this.picker_instance.domElement.querySelectorAll("button"), t = 0; t < e.length; t++) e[t].disabled = !1;
          }
        } }, { key: "destroy", value: function() {
          this.createPicker(!1), vn(sr(r.prototype), "destroy", this).call(this);
        } }, { key: "createPicker", value: function(e) {
          var t = this;
          if (e) {
            if (window.Picker && !this.picker_instance) {
              var i = this.expandCallbacks("colorpicker", _({}, { editor: !1, alpha: !1, color: this.value, popup: "bottom" }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, { parent: this.container })), u = function(d) {
                var b = t.picker_instance.settings.editorFormat, x = t.picker_instance.settings.alpha;
                t.setValue(b === "hex" ? x ? d.hex : d.hex.slice(0, 7) : d["".concat(b + (x ? "a" : ""), "String")]);
              };
              i.popup || typeof i.onChange == "function" ? i.popup && typeof i.onDone != "function" && (i.onDone = u) : i.onChange = u, this.picker_instance = new window.Picker(i), i.popup || (this.input.style.display = "none", this.theme.afterInputReady(this.picker_instance.domElement));
            }
          } else this.picker_instance && (this.picker_instance.destroy(), this.picker_instance = null, this.input.style.display = "");
        } }]) && _p(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(fe) };
      function Wl(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      var Jl = {}, Hs = "en", kp = Hs;
      Jl.en = { error_notset: "Property must be set", error_notempty: "Value required", error_enum: "Value must be one of the enumerated values", error_const: "Value must be the constant value", error_anyOf: "Value must validate against at least one of the provided schemas", error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.", error_not: "Value must not validate against the provided schema", error_type_union: "Value must be one of the provided types", error_type: "Value must be of type {{0}}", error_disallow_union: "Value must not be one of the provided disallowed types", error_disallow: "Value must not be of type {{0}}", error_multipleOf: "Value must be a multiple of {{0}}", error_maximum_excl: "Value must be less than {{0}}", error_maximum_incl: "Value must be at most {{0}}", error_minimum_excl: "Value must be greater than {{0}}", error_minimum_incl: "Value must be at least {{0}}", error_maxLength: "Value must be at most {{0}} characters long", error_contains: "No items match contains", error_minContains: "Contains match count {{0}} is less than minimum contains count of {{1}}", error_maxContains: "Contains match count {{0}} exceeds maximum contains count of {{1}}", error_minLength: "Value must be at least {{0}} characters long", error_pattern: "Value must match the pattern {{0}}", error_additionalItems: "No additional items allowed in this array", error_maxItems: "Value must have at most {{0}} items", error_minItems: "Value must have at least {{0}} items", error_uniqueItems: "Array must have unique items", error_maxProperties: "Object must have at most {{0}} properties", error_minProperties: "Object must have at least {{0}} properties", error_required: "Object is missing the required property '{{0}}'", error_additional_properties: "No additional properties allowed, but property {{0}} is set", error_property_names_exceeds_maxlength: "Property name {{0}} exceeds maxLength", error_property_names_enum_mismatch: "Property name {{0}} does not match any enum values", error_property_names_const_mismatch: "Property name {{0}} does not match the const value", error_property_names_pattern_mismatch: "Property name {{0}} does not match pattern", error_property_names_false: "Property name {{0}} fails when propertyName is false", error_property_names_maxlength: "Property name {{0}} cannot match invalid maxLength", error_property_names_enum: "Property name {{0}} cannot match invalid enum", error_property_names_pattern: "Property name {{0}} cannot match invalid pattern", error_property_names_unsupported: "Unsupported propertyName {{0}}", error_dependency: "Must have property {{0}}", error_date: "Date must be in the format {{0}}", error_time: "Time must be in the format {{0}}", error_datetime_local: "Datetime must be in the format {{0}}", error_invalid_epoch: "Date must be greater than 1 January 1970", error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots", error_ipv6: "Value must be a valid IPv6 address", error_hostname: "The hostname has the wrong format", upload_max_size: "Filesize too large. Max size is ", upload_wrong_file_format: "Wrong file format. Allowed format(s): ", button_save: "Save", button_copy: "Copy", button_cancel: "Cancel", button_add: "Add", button_delete_all: "All", button_delete_all_title: "Delete All", button_delete_last: "Last {{0}}", button_delete_last_title: "Delete Last {{0}}", button_add_row_title: "Add {{0}}", button_move_down_title: "Move down", button_move_up_title: "Move up", button_properties: "Properties", button_object_properties: "Object Properties", button_copy_row_title: "Copy {{0}}", button_delete_row_title: "Delete {{0}}", button_delete_row_title_short: "Delete", button_copy_row_title_short: "Copy", button_collapse: "Collapse", button_expand: "Expand", button_edit_json: "Edit JSON", button_upload: "Upload", flatpickr_toggle_button: "Toggle", flatpickr_clear_button: "Clear", choices_placeholder_text: "Start typing to add value", default_array_item_title: "item", button_delete_node_warning: "Are you sure you want to remove this item?", table_controls: "Controls", paste_max_length_reached: "Pasted text exceeded maximum length of {{0}} and will be clipped." }, Object.entries(mo).forEach(function(o) {
        var r = function(e, t) {
          return function(i) {
            if (Array.isArray(i)) return i;
          }(e) || function(i, u) {
            var d = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
            if (d != null) {
              var b, x, P, I, $ = [], G = !0, ee = !1;
              try {
                if (P = (d = d.call(i)).next, u !== 0) for (; !(G = (b = P.call(d)).done) && ($.push(b.value), $.length !== u); G = !0) ;
              } catch (pe) {
                ee = !0, x = pe;
              } finally {
                try {
                  if (!G && d.return != null && (I = d.return(), Object(I) !== I)) return;
                } finally {
                  if (ee) throw x;
                }
              }
              return $;
            }
          }(e, t) || function(i, u) {
            if (i) {
              if (typeof i == "string") return Wl(i, u);
              var d = Object.prototype.toString.call(i).slice(8, -1);
              return d === "Object" && i.constructor && (d = i.constructor.name), d === "Map" || d === "Set" ? Array.from(i) : d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? Wl(i, u) : void 0;
            }
          }(e, t) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }(o, 2), n = r[0], a = r[1];
        mo[n].options = a.options || {};
      });
      var gn = { options: { upload: function(o, r, n) {
        console.log("Upload handler required for upload editor");
      }, use_name_attributes: !0, prompt_before_delete: !0, use_default_values: !0, max_depth: 0, button_state_mode: 1, case_sensitive_property_search: !0, show_errors: "interaction", prompt_paste_max_length_reached: !1, remove_false_properties: !1, enforce_const: !1, opt_in_widget: "checkbox" }, theme: "html", template: "default", themes: {}, callbacks: {}, templates: {}, iconlibs: {}, editors: mo, languages: Jl, resolvers: g, custom_validators: [], default_language: Hs, language: kp, translate: function(o, r, n) {
        var a = {};
        n && n.options && n.options.error_messages && n.options.error_messages[gn.language] && (a = n.options.error_messages[gn.language]);
        var e = gn.languages[gn.language];
        if (!e) throw new Error("Unknown language ".concat(gn.language));
        var t = a[o] || e[o] || gn.languages[Hs][o] || o;
        if (r) for (var i = 0; i < r.length; i++) t = t.replace(new RegExp("\\{\\{".concat(i, "}}"), "g"), r[i]);
        return t;
      }, translateProperty: function(o, r) {
        return o;
      } };
      function _n() {
        _n = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(U, q, J) {
          U[q] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function b(U, q, J) {
          return Object.defineProperty(U, q, { value: J, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          b({}, "");
        } catch {
          b = function(q, J, ge) {
            return q[J] = ge;
          };
        }
        function x(U, q, J, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new dr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, J, $e) }), Le;
        }
        function P(U, q, J) {
          try {
            return { type: "normal", arg: U.call(q, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var I = "suspendedStart", $ = "suspendedYield", G = "executing", ee = "completed", pe = {};
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
        function Ke(U) {
          ["next", "throw", "return"].forEach(function(q) {
            b(U, q, function(J) {
              return this._invoke(q, J);
            });
          });
        }
        function it(U, q) {
          function J(se, Le, $e, ot) {
            var st = P(U[se], U, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && bt(Yt) == "object" && a.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                J("next", Et, $e, ot);
              }, function(Et) {
                J("throw", Et, $e, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return J("throw", Et, $e, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(ot, st) {
                J(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, J) {
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
                var ot = rn($e, J);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === I) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var st = P(U, q, J);
              if (st.type === "normal") {
                if (ge = J.done ? ee : $, st.arg === pe) continue;
                return { value: st.arg, done: J.done };
              }
              st.type === "throw" && (ge = ee, J.method = "throw", J.arg = st.arg);
            }
          };
        }
        function rn(U, q) {
          var J = q.method, ge = U.iterator[J];
          if (ge === o) return q.delegate = null, J === "throw" && U.iterator.return && (q.method = "return", q.arg = o, rn(U, q), q.method === "throw") || J !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = P(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function ji(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function dr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(ji, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var J = -1, ge = function se() {
                for (; ++J < U.length; ) if (a.call(U, J)) return se.value = U[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(bt(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, b(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ke(it.prototype), b(it.prototype, u, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function(U, q, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x(U, q, J, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), b(xe, d, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), J = [];
          for (var ge in q) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, dr.prototype = { constructor: dr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && a.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function J(st, It) {
            return Le.type = "throw", Le.arg = U, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), ot = a.call(se, "finallyLoc");
              if ($e && ot) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
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
            var J = this.tryEntries[q];
            if (J.finallyLoc === U) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.tryLoc === U) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, J) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function Kl(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), d = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(d) : Promise.resolve(d).then(a, e);
      }
      function Zl(o) {
        return function() {
          var r = this, n = arguments;
          return new Promise(function(a, e) {
            var t = o.apply(r, n);
            function i(d) {
              Kl(t, a, e, i, u, "next", d);
            }
            function u(d) {
              Kl(t, a, e, i, u, "throw", d);
            }
            i(void 0);
          });
        };
      }
      function wn(o, r) {
        return function(n) {
          if (Array.isArray(n)) return n;
        }(o) || function(n, a) {
          var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
          if (e != null) {
            var t, i, u, d, b = [], x = !0, P = !1;
            try {
              if (u = (e = e.call(n)).next, a !== 0) for (; !(x = (t = u.call(e)).done) && (b.push(t.value), b.length !== a); x = !0) ;
            } catch (I) {
              P = !0, i = I;
            } finally {
              try {
                if (!x && e.return != null && (d = e.return(), Object(d) !== d)) return;
              } finally {
                if (P) throw i;
              }
            }
            return b;
          }
        }(o, r) || function(n, a) {
          if (n) {
            if (typeof n == "string") return Yl(n, a);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Yl(n, a) : void 0;
          }
        }(o, r) || function() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Yl(o, r) {
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
      function xp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Op(a.key), a);
        }
      }
      function Op(o) {
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
      v(1688);
      var Cp = function() {
        return o = function e(t) {
          (function(i, u) {
            if (!(i instanceof u)) throw new TypeError("Cannot call a class as a function");
          })(this, e), this.options = t || {}, this.schema = {}, this.refs = this.options.refs || {}, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1, this._subSchema1 = { type: function(i) {
            bt(i.type) === "object" && (i.type = this._expandSubSchema(i.type));
          }, disallow: function(i) {
            bt(i.disallow) === "object" && (i.disallow = this._expandSubSchema(i.disallow));
          }, anyOf: function(i) {
            var u = this;
            Object.entries(i.anyOf).forEach(function(d) {
              var b = wn(d, 2), x = b[0], P = b[1];
              i.anyOf[x] = u.expandSchema(P);
            });
          }, dependencies: function(i) {
            var u = this;
            Object.entries(i.dependencies).forEach(function(d) {
              var b = wn(d, 2), x = b[0], P = b[1];
              bt(P) !== "object" || Array.isArray(P) || (i.dependencies[x] = u.expandSchema(P));
            });
          }, not: function(i) {
            i.not = this.expandSchema(i.not);
          } }, this._subSchema2 = { allOf: function(i, u) {
            var d = this, b = _({}, u);
            return Object.entries(i.allOf).forEach(function(x) {
              var P = wn(x, 2), I = P[0], $ = P[1];
              i.allOf[I] = d.expandRefs($, !0), b = d.extendSchemas(b, d.expandSchema($));
            }), delete b.allOf, b;
          }, extends: function(i, u) {
            var d, b = this;
            return delete (d = Array.isArray(i.extends) ? i.extends.reduce(function(x, P, I) {
              return b.extendSchemas(x, b.expandSchema(P));
            }, u) : this.extendSchemas(u, this.expandSchema(i.extends))).extends, d;
          }, oneOf: function(i, u) {
            var d = this, b = _({}, u);
            return delete b.oneOf, i.oneOf.reduce(function(x, P, I) {
              return x.oneOf[I] = d.extendSchemas(d.expandSchema(P), b), x;
            }, u), u;
          } };
        }, r = [{ key: "load", value: (a = Zl(_n().mark(function e(t, i, u) {
          return _n().wrap(function(d) {
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
          var i = this, u = _({}, e);
          if (!u.$ref) return u;
          var d = u.$ref.split("#");
          if (d.length === 2 && !this.refs_with_info[u.$ref]) {
            var b = this.expandRecursivePointer(this.schema, d[1]), x = this.extendSchemas(u, this.expandSchema(b));
            return delete x.$ref, x;
          }
          var P = d.length > 2 ? this.refs_with_info["#" + d[1]] : this.refs_with_info[u.$ref];
          delete u.$ref;
          var I = P.$ref.startsWith("#") ? P.fetchUrl : "", $ = this._getRef(I, P);
          if (this.refs[$]) {
            if (t && k(this.refs[$], "allOf")) {
              var G = this.refs[$].allOf;
              Object.keys(G).forEach(function(ee) {
                G[ee] = i.expandRefs(G[ee], !0);
              });
            }
          } else console.warn("reference:'".concat($, "' not found!"));
          return d.length > 2 ? this.extendSchemas(u, this.expandSchema(this.expandRecursivePointer(this.refs[$], d[2]))) : this.extendSchemas(u, this.expandSchema(this.refs[$]));
        } }, { key: "expandRecursivePointer", value: function(e, t) {
          var i = e;
          return t.split("/").slice(1).forEach(function(u) {
            i[u] && (i = i[u]);
          }), i.$refs && i.$refs.startsWith("#") ? this.expandRecursivePointer(e, i.$refs) : i;
        } }, { key: "expandSchema", value: function(e) {
          var t = this;
          Object.entries(this._subSchema1).forEach(function(u) {
            var d = wn(u, 2), b = d[0], x = d[1];
            e[b] && x.call(t, e);
          });
          var i = _({}, e);
          return Object.entries(this._subSchema2).forEach(function(u) {
            var d = wn(u, 2), b = d[0], x = d[1];
            e[b] && (i = x.call(t, e, i));
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
          var d = {}, b = function(G) {
            return Object.keys(G).forEach(function(ee) {
              d[ee] = !0;
            });
          };
          if (e.$ref && bt(e.$ref) !== "object" && (e.$ref.indexOf("#") !== 0 || !u)) {
            var x = e.$ref, P = "";
            x.indexOf("#") > 0 && (x = x.substr(0, x.indexOf("#"))), x !== e.$ref && (P = e.$ref.substr(e.$ref.indexOf("#")));
            var I = this.refs_prefix + this.refs_counter++, $ = I + P;
            e.$ref.substr(0, 1) === "#" || this.refs[e.$ref] || (d[x] = !0), this.refs_with_info[I] = { fetchUrl: t, $ref: x }, e.$ref = $;
          }
          return Object.values(e).forEach(function(G) {
            G && bt(G) === "object" && (Array.isArray(G) ? Object.values(G).forEach(function(ee) {
              ee && bt(ee) === "object" && b(i._getExternalRefs(ee, t, u));
            }) : G.$ref && typeof G.$ref == "string" && G.$ref.startsWith("#") || b(i._getExternalRefs(G, t, u)));
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
        } }, { key: "_asyncloadExternalRefs", value: (n = Zl(_n().mark(function e(t, i, u) {
          var d, b, x, P, I, $, G = this, ee = arguments;
          return _n().wrap(function(pe) {
            for (; ; ) switch (pe.prev = pe.next) {
              case 0:
                d = ee.length > 3 && ee[3] !== void 0 && ee[3], b = this._getExternalRefs(t, i, d), x = 0, P = _n().mark(function _e() {
                  var we, Ie, De, He, ve, xe, Ke, it, Ot, rn, ji;
                  return _n().wrap(function(Ne) {
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
                        return G.refs[we] = ve, Ne.next = 31, G._asyncloadExternalRefs(ve, we, u);
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
                        if (x++, xe = G._joinUrl(we, u), G.options.ajax_cache_responses && (it = G.cacheGet(xe)) && (Ke = it), Ke) {
                          Ne.next = 61;
                          break;
                        }
                        return Ne.next = 48, new Promise(function(dr) {
                          var Ct = new XMLHttpRequest();
                          G.options.ajaxCredentials && (Ct.withCredentials = G.options.ajaxCredentials), Ct.overrideMimeType("application/json"), Ct.open("GET", xe, !0), Ct.onload = function() {
                            dr(Ct);
                          }, Ct.onerror = function(U) {
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
                        return G.refs[we] = Ke, rn = G._getFileBaseFromFileLocation(xe), xe !== we && (ji = xe.split("/"), xe = (we.substr(0, 1) === "/" ? "/" : "") + ji.pop()), Ne.next = 68, G._asyncloadExternalRefs(Ke, xe, rn);
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
                return pe.delegateYield(P(), "t0", 7);
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
          e = _({}, e), t = _({}, t);
          var u = {}, d = function(b) {
            typeof b == "string" && (b = [b]), typeof t.type == "string" && (t.type = [t.type]), t.type && t.type.length ? u.type = b.filter(function(x) {
              return t.type.includes(x);
            }) : u.type = b, u.type.length === 1 && typeof u.type[0] == "string" ? u.type = u.type[0] : u.type.length === 0 && delete u.type;
          };
          return Object.entries(e).forEach(function(b) {
            var x = wn(b, 2), P = x[0], I = x[1];
            t[P] !== void 0 ? function($, G) {
              (function(ee, pe) {
                return (ee === "required" || ee === "defaultProperties") && bt(pe) === "object" && Array.isArray(pe);
              })($, G) ? u[$] = G.concat(t[$]).reduce(function(ee, pe) {
                return ee.includes(pe) || ee.push(pe), ee;
              }, []) : $ !== "type" || typeof G != "string" && !Array.isArray(G) ? bt(G) !== "object" || Array.isArray(G) || G === null ? u[$] = G : u[$] = i.extendSchemas(G, t[$]) : d(G);
            }(P, I) : u[P] = I;
          }), Object.entries(t).forEach(function(b) {
            var x = wn(b, 2), P = x[0], I = x[1];
            e[P] === void 0 && (u[P] = I);
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
        } }], r && xp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r, n, a;
      }(), Ep = (v(2762), { default: function() {
        return { compile: function(o) {
          var r = o.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g), n = r && r.length;
          if (!n) return function() {
            return o;
          };
          for (var a = [], e = function(i) {
            var u, d, b = r[i].replace(/[{}]+/g, "").trim().split("."), x = b.length;
            x > 1 ? u = function(P) {
              for (d = P, i = 0; i < x && (d = d[b[i]]); i++) ;
              return d;
            } : (b = b[0], u = function(P) {
              return P[b];
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
      function Mi(o) {
        return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Mi(o);
      }
      function Vs(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function Sp(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Pp(a.key), a);
        }
      }
      function Pp(o) {
        var r = function(n, a) {
          if (Mi(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Mi(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Mi(r) == "symbol" ? r : r + "";
      }
      var Tp = { collapse: "", expand: "", delete: "", edit: "", add: "", cancel: "", save: "", moveup: "", movedown: "" }, kr = function() {
        return o = function n() {
          var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Tp;
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
            if (Array.isArray(u)) return Vs(u);
          }(t = e.split(" ")) || function(u) {
            if (typeof Symbol < "u" && u[Symbol.iterator] != null || u["@@iterator"] != null) return Array.from(u);
          }(t) || function(u, d) {
            if (u) {
              if (typeof u == "string") return Vs(u, d);
              var b = Object.prototype.toString.call(u).slice(8, -1);
              return b === "Object" && u.constructor && (b = u.constructor.name), b === "Map" || b === "Set" ? Array.from(u) : b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b) ? Vs(u, d) : void 0;
            }
          }(t) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }()), i;
        } }]) && Sp(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function zs(o) {
        return zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, zs(o);
      }
      function Lp(o, r, n) {
        return r = bo(r), function(a, e) {
          if (e && (zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Ql() ? Reflect.construct(r, n || [], bo(o).constructor) : r.apply(o, n));
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
      function bo(o) {
        return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, bo(o);
      }
      function qs(o, r) {
        return qs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, qs(o, r);
      }
      var Ap = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "floppy-remove", save: "floppy-saved", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Rp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Lp(this, r, ["glyphicon glyphicon-", Ap]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && qs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function Us(o) {
        return Us = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Us(o);
      }
      function Ip(o, r, n) {
        return r = vo(r), function(a, e) {
          if (e && (Us(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, Xl() ? Reflect.construct(r, n || [], vo(o).constructor) : r.apply(o, n));
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
      function vo(o) {
        return vo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, vo(o);
      }
      function $s(o, r) {
        return $s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, $s(o, r);
      }
      var Bp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "remove-circle", time: "time", calendar: "calendar", edit_properties: "list" }, Np = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Ip(this, r, ["icon-", Bp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && $s(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function Gs(o) {
        return Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Gs(o);
      }
      function Dp(o, r, n) {
        return r = go(r), function(a, e) {
          if (e && (Gs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, eu() ? Reflect.construct(r, n || [], go(o).constructor) : r.apply(o, n));
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
      function go(o) {
        return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, go(o);
      }
      function Ws(o, r) {
        return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ws(o, r);
      }
      var Fp = { collapse: "caret-square-o-down", expand: "caret-square-o-right", delete: "times", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "files-o", clear: "times-circle-o", time: "clock-o", calendar: "calendar", edit_properties: "list" }, Mp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Dp(this, r, ["fa fa-", Fp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ws(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function Js(o) {
        return Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Js(o);
      }
      function Hp(o, r, n) {
        return r = _o(r), function(a, e) {
          if (e && (Js(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, tu() ? Reflect.construct(r, n || [], _o(o).constructor) : r.apply(o, n));
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
      function _o(o) {
        return _o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, _o(o);
      }
      function Ks(o, r) {
        return Ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ks(o, r);
      }
      var Vp = { collapse: "caret-down", expand: "caret-right", delete: "trash", edit: "pen", add: "plus", subtract: "minus", cancel: "ban", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "copy", clear: "times-circle", time: "clock", calendar: "calendar", edit_properties: "list" }, zp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Hp(this, r, ["fas fa-", Vp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ks(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function Zs(o) {
        return Zs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Zs(o);
      }
      function qp(o, r, n) {
        return r = wo(r), function(a, e) {
          if (e && (Zs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ru() ? Reflect.construct(r, n || [], wo(o).constructor) : r.apply(o, n));
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
      function wo(o) {
        return wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, wo(o);
      }
      function Ys(o, r) {
        return Ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Ys(o, r);
      }
      var Up = { collapse: "triangle-1-s", expand: "triangle-1-e", delete: "trash", edit: "pencil", add: "plusthick", subtract: "minusthick", cancel: "closethick", save: "disk", moveup: "arrowthick-1-n", moveright: "arrowthick-1-e", movedown: "arrowthick-1-s", moveleft: "arrowthick-1-w", copy: "copy", clear: "circle-close", time: "time", calendar: "calendar", edit_properties: "note" }, $p = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), qp(this, r, ["ui-icon ui-icon-", Up]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Ys(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function Qs(o) {
        return Qs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Qs(o);
      }
      function Gp(o, r, n) {
        return r = jo(r), function(a, e) {
          if (e && (Qs(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, nu() ? Reflect.construct(r, n || [], jo(o).constructor) : r.apply(o, n));
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
      function jo(o) {
        return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, jo(o);
      }
      function Xs(o, r) {
        return Xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, Xs(o, r);
      }
      var Wp = { collapse: "collapse-down", expand: "expand-right", delete: "trash", edit: "pencil", add: "plus", subtract: "minus", cancel: "ban", save: "file", moveup: "arrow-thick-top", moveright: "arrow-thick-right", movedown: "arrow-thick-bottom", moveleft: "arrow-thick-left", copy: "clipboard", clear: "circle-x", time: "clock", calendar: "calendar", edit_properties: "list" }, Jp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Gp(this, r, ["oi oi-", Wp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && Xs(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function ea(o) {
        return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ea(o);
      }
      function Kp(o, r, n) {
        return r = ko(r), function(a, e) {
          if (e && (ea(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, iu() ? Reflect.construct(r, n || [], ko(o).constructor) : r.apply(o, n));
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
      function ko(o) {
        return ko = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ko(o);
      }
      function ta(o, r) {
        return ta = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ta(o, r);
      }
      var Zp = { collapse: "arrow-down", expand: "arrow-right", delete: "delete", edit: "edit", add: "plus", subtract: "minus", cancel: "cross", save: "check", moveup: "upward", moveright: "forward", movedown: "downward", moveleft: "back", copy: "copy", clear: "close", time: "time", calendar: "bookmark", edit_properties: "menu" }, Yp = function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Kp(this, r, ["icon icon-", Zp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && ta(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr);
      function ra(o) {
        return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, ra(o);
      }
      function Qp(o, r, n) {
        return r = xo(r), function(a, e) {
          if (e && (ra(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, ou() ? Reflect.construct(r, n || [], xo(o).constructor) : r.apply(o, n));
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
      var Xp = { collapse: "chevron-down", expand: "chevron-right", delete: "trash", edit: "pencil", add: "plus", subtract: "dash", cancel: "x-circle", save: "save", moveup: "arrow-up", moveright: "arrow-right", movedown: "arrow-down", moveleft: "arrow-left", copy: "clipboard", clear: "x-circle", time: "clock", calendar: "calendar", edit_properties: "list-ul" }, ef = { bootstrap: function(o) {
        function r() {
          return function(a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Qp(this, r, ["bi bi-", Xp]);
        }
        return function(a, e) {
          if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
          a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: !0, configurable: !0 } }), Object.defineProperty(a, "prototype", { writable: !1 }), e && na(a, e);
        }(r, o), n = r, Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n;
      }(kr), bootstrap3: Rp, fontawesome3: Np, fontawesome4: Mp, fontawesome5: zp, jqueryui: $p, openiconic: Jp, spectre: Yp };
      function Hi(o) {
        return Hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Hi(o);
      }
      function tf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, rf(a.key), a);
        }
      }
      function rf(o) {
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
      var su = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].find(function(o) {
        return o in document.documentElement;
      }), xr = function() {
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
          var i = function(b, x) {
            b.value = Number(x || b.value), b.setAttribute("initialized", "1");
          }, u = n.getAttribute("min"), d = n.getAttribute("max");
          return e.addEventListener("click", function() {
            n.getAttribute("initialized") ? u ? Number(n.value) > Number(u) && n.stepDown() : n.stepDown() : i(n, u), j(n, "change");
          }), t.addEventListener("click", function() {
            n.getAttribute("initialized") ? d ? Number(n.value) < Number(d) && n.stepUp() : n.stepUp() : i(n, u), j(n, "change");
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
            if (!n[su]) return !1;
            if (n[su](a)) return n;
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
          var a = document.createElement("div");
          return a.innerHTML = n, a.textContent || a.innerText;
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
        } }], r && tf(o.prototype, r), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        var o, r;
      }();
      function pi(o) {
        return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, pi(o);
      }
      function nf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, of(a.key), a);
        }
      }
      function of(o) {
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
      function sf(o, r, n) {
        return r = ar(r), function(a, e) {
          if (e && (pi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, au() ? Reflect.construct(r, n || [], ar(o).constructor) : r.apply(o, n));
      }
      function au() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (au = function() {
          return !!o;
        })();
      }
      function jn() {
        return jn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ar(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, jn.apply(this, arguments);
      }
      function ar(o) {
        return ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ar(o);
      }
      function ia(o, r) {
        return ia = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ia(o, r);
      }
      var lu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), sf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ia(e, t);
        }(r, o), n = r, (a = [{ key: "getFormInputLabel", value: function(e, t) {
          var i = jn(ar(r.prototype), "getFormInputLabel", this).call(this, e, t);
          return i.classList.add("je-form-input-label"), i;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = jn(ar(r.prototype), "getFormInputDescription", this).call(this, e);
          return t.classList.add("je-form-input-label"), t;
        } }, { key: "getIndentedPanel", value: function() {
          var e = jn(ar(r.prototype), "getIndentedPanel", this).call(this);
          return e.classList.add("je-indented-panel"), e;
        } }, { key: "getTopIndentedPanel", value: function() {
          return this.getIndentedPanel();
        } }, { key: "getChildEditorHolder", value: function() {
          var e = jn(ar(r.prototype), "getChildEditorHolder", this).call(this);
          return e.classList.add("je-child-editor-holder"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.classList.add("je-header-button-holder"), e;
        } }, { key: "getTable", value: function() {
          var e = jn(ar(r.prototype), "getTable", this).call(this);
          return e.classList.add("je-table"), e;
        } }, { key: "addInputError", value: function(e, t) {
          var i = this.closest(e, ".form-control") || e.controlgroup;
          e.errmsg ? e.errmsg.style.display = "block" : (e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), e.errmsg.style = e.errmsg.style || {}, e.errmsg.style.color = "red", i.appendChild(e.errmsg)), e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && nf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
      function fi(o) {
        return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, fi(o);
      }
      function af(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, lf(a.key), a);
        }
      }
      function lf(o) {
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
      function uf(o, r, n) {
        return r = lr(r), function(a, e) {
          if (e && (fi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, uu() ? Reflect.construct(r, n || [], lr(o).constructor) : r.apply(o, n));
      }
      function uu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (uu = function() {
          return !!o;
        })();
      }
      function kn() {
        return kn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = lr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, kn.apply(this, arguments);
      }
      function lr(o) {
        return lr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, lr(o);
      }
      function oa(o, r) {
        return oa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, oa(o, r);
      }
      lu.rules = { ".je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold", ".je-form-input-description": "display:inline-block;margin:0;font-size:0.8em;font-style:italic", ".je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px%20solid%20%23ddd", ".je-child-editor-holder": "margin-bottom:8px", ".je-header-button-holder": "display:inline-block;margin-left:10px;font-size:0.8em;vertical-align:middle", ".je-table": "margin-bottom:5px;border-bottom:1px%20solid%20%23ccc", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var cu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), uf(this, r, arguments);
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
          d.classList.add("switch-slider");
          var b = document.createElement("span");
          return b.classList.add("sr-only"), b.textContent = e + "-opt-in", i.appendChild(b), i.appendChild(u), i.appendChild(d), { label: t, checkbox: u, container: i };
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = kn(lr(r.prototype), "getSelectInput", this).call(this, e);
          return i.classList.add("form-control"), i;
        } }, { key: "setGridColumnSize", value: function(e, t, i) {
          e.classList.add("col-md-".concat(t)), i && e.classList.add("col-md-offset-".concat(i));
        } }, { key: "afterInputReady", value: function(e) {
          e.controlgroup || (e.controlgroup = this.closest(e, ".form-group"), this.closest(e, ".compact") && (e.controlgroup.style.marginBottom = 0));
        } }, { key: "getTextareaInput", value: function() {
          var e = document.createElement("textarea");
          return e.classList.add("form-control"), e;
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          return kn(lr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
        } }, { key: "getFormInputField", value: function(e) {
          var t = kn(lr(r.prototype), "getFormInputField", this).call(this, e);
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
          var u = kn(lr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-default"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = kn(lr(r.prototype), "getTableContainer", this).call(this);
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
        } }]) && af(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
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
        return r = ur(r), function(a, e) {
          if (e && (yi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, du() ? Reflect.construct(r, n || [], ur(o).constructor) : r.apply(o, n));
      }
      function du() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (du = function() {
          return !!o;
        })();
      }
      function xn() {
        return xn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = ur(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, xn.apply(this, arguments);
      }
      function ur(o) {
        return ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, ur(o);
      }
      function sa(o, r) {
        return sa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, sa(o, r);
      }
      cu.rules = { ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var pf = { disable_theme_rules: !1, input_size: "normal", custom_forms: !1, object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, hu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), hf(this, r, [e, pf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && sa(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = xn(ur(r.prototype), "getSelectInput", this).call(this, e);
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
          var b = xn(ur(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return this.options.custom_forms === !0 && (b.classList.remove("form-control"), b.classList.add("custom-range")), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("div"), u = document.createElement("div"), d = document.createElement("button");
          d.setAttribute("type", "button");
          var b = document.createElement("button");
          b.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), i.appendChild(d), u.appendChild(b), t.classList.add("input-group"), i.classList.add("input-group-prepend"), u.classList.add("input-group-append"), d.classList.add("btn"), d.classList.add("btn-secondary"), d.classList.add("stepper-down"), b.classList.add("btn"), b.classList.add("btn-secondary"), b.classList.add("stepper-up"), e.getAttribute("readonly") && (d.setAttribute("disabled", !0), b.setAttribute("disabled", !0)), d.textContent = "-", b.textContent = "+";
          var x = function($, G) {
            $.value = Number(G || $.value), $.setAttribute("initialized", "1");
          }, P = e.getAttribute("min"), I = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), d.addEventListener("click", function() {
            e.getAttribute("initialized") ? P ? Number(e.value) > Number(P) && e.stepDown() : e.stepDown() : x(e, P), j(e, "change");
          }), b.addEventListener("click", function() {
            e.getAttribute("initialized") ? I ? Number(e.value) < Number(I) && e.stepUp() : e.stepUp() : x(e, P), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = xn(ur(r.prototype), "getFormInputField", this).call(this, e);
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
            var x = document.createElement("div");
            this.options.custom_forms === !1 ? (x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label")) : (x.classList.add("custom-control"), t.classList.add("custom-control-input"), e.classList.add("custom-control-label"), t.type === "checkbox" ? x.classList.add("custom-checkbox") : x.classList.add("custom-radio")), x.appendChild(t), x.appendChild(e), u && x.appendChild(u), b.appendChild(x);
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
          return Object.values(e).forEach(function(x) {
            var P = x.firstChild;
            b.appendChild(P);
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
          var u = xn(ur(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = xn(ur(r.prototype), "getTableContainer", this).call(this);
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
        } }]) && cf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
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
        return r = cr(r), function(a, e) {
          if (e && (mi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, pu() ? Reflect.construct(r, n || [], cr(o).constructor) : r.apply(o, n));
      }
      function pu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (pu = function() {
          return !!o;
        })();
      }
      function On() {
        return On = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = cr(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, On.apply(this, arguments);
      }
      function cr(o) {
        return cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, cr(o);
      }
      function aa(o, r) {
        return aa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, aa(o, r);
      }
      hu.rules = { ".jsoneditor-twbs4-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var bf = { disable_theme_rules: !1, input_size: "normal", object_indent: !0, object_background: "bg-light", object_text: "", table_border: !1, table_zebrastyle: !1, tooltip: "bootstrap" }, fu = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), mf(this, r, [e, bf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && aa(e, t);
        }(r, o), n = r, (a = [{ key: "getSelectInput", value: function(e, t) {
          var i = On(cr(r.prototype), "getSelectInput", this).call(this, e);
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
          var b = On(cr(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return b.classList.remove("form-control"), b.classList.add("form-range"), b;
        } }, { key: "getStepperButtons", value: function(e) {
          var t = document.createElement("div"), i = document.createElement("button");
          i.setAttribute("type", "button");
          var u = document.createElement("button");
          u.setAttribute("type", "button"), t.appendChild(i), t.appendChild(e), t.appendChild(u), t.classList.add("input-group"), i.classList.add("btn"), i.classList.add("btn-secondary"), i.classList.add("stepper-down"), u.classList.add("btn"), u.classList.add("btn-secondary"), u.classList.add("stepper-up"), e.getAttribute("readonly") && (i.setAttribute("disabled", !0), u.setAttribute("disabled", !0)), i.textContent = "-", u.textContent = "+";
          var d = function(P, I) {
            P.value = Number(I || P.value), P.setAttribute("initialized", "1");
          }, b = e.getAttribute("min"), x = e.getAttribute("max");
          return e.addEventListener("change", function() {
            e.getAttribute("initialized") || e.setAttribute("initialized", "1");
          }), i.addEventListener("click", function() {
            e.getAttribute("initialized") ? b ? Number(e.value) > Number(b) && e.stepDown() : e.stepDown() : d(e, b), j(e, "change");
          }), u.addEventListener("click", function() {
            e.getAttribute("initialized") ? x ? Number(e.value) < Number(x) && e.stepUp() : e.stepUp() : d(e, b), j(e, "change");
          }), t;
        } }, { key: "getFormInputField", value: function(e) {
          var t = On(cr(r.prototype), "getFormInputField", this).call(this, e);
          return e !== "checkbox" && e !== "radio" && (t.classList.add("form-control"), this.options.input_size === "small" && t.classList.add("form-control-sm"), this.options.input_size === "large" && t.classList.add("form-control-lg")), t;
        } }, { key: "getFormControl", value: function(e, t, i, u, d) {
          var b = document.createElement("div");
          if (b.classList.add("form-group"), !e || t.type !== "checkbox" && t.type !== "radio") e && (e.classList.add("form-label"), b.appendChild(e), u && b.appendChild(u)), b.appendChild(t);
          else {
            var x = document.createElement("div");
            x.classList.add("form-check"), t.classList.add("form-check-input"), e.classList.add("form-check-label"), t.tagName.toLowerCase() !== "div" && t && e && d && (e.setAttribute("for", d), t.setAttribute("id", d)), t.tagName.toLowerCase() !== "div" && t && i && (i.setAttribute("id", d + "-description"), t.setAttribute("aria-describedby", d + "-description")), x.appendChild(t), x.appendChild(e), u && x.appendChild(u), b.appendChild(x);
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
          return Object.values(e).forEach(function(x) {
            var P = x.firstChild;
            b.appendChild(P);
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
          var u = On(cr(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-secondary", "btn-sm"), u;
        } }, { key: "getTableContainer", value: function() {
          var e = On(cr(r.prototype), "getTableContainer", this).call(this);
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
        } }]) && ff(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
      function bi(o) {
        return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, bi(o);
      }
      function vf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, gf(a.key), a);
        }
      }
      function gf(o) {
        var r = function(n, a) {
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
      function _f(o, r, n) {
        return r = Or(r), function(a, e) {
          if (e && (bi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, yu() ? Reflect.construct(r, n || [], Or(o).constructor) : r.apply(o, n));
      }
      function yu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (yu = function() {
          return !!o;
        })();
      }
      function vi() {
        return vi = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = Or(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vi.apply(this, arguments);
      }
      function Or(o) {
        return Or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Or(o);
      }
      function la(o, r) {
        return la = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, la(o, r);
      }
      fu.rules = { ".form-group": "margin-bottom:1rem", ".form-text": "display:block", ".jsoneditor-twbs5-text-button": "background:none;padding:0;border:0;color:currentColor", "td > .form-group": "margin-bottom:0", ".json-editor-btn-upload": "margin-top:1rem", ".je-noindent .card": "padding:0;border:0", ".je-tooltip:hover::before": "display:block;position:absolute;font-size:0.8em;color:%23fff;border-radius:0.2em;content:attr(title);background-color:%23000;margin-top:-2.5em;padding:0.3em", ".je-tooltip:hover::after": "display:block;position:absolute;font-size:0.8em;color:%23fff", ".select2-container--default .select2-selection--single": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".select2-container--default   .select2-selection--single   .select2-selection__rendered": "line-height:calc(1.5em%20%2B%200.75rem%20%2B%202px)", ".selectize-control.form-control": "padding:0", ".selectize-dropdown.form-control": "padding:0;height:auto", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var mu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), _f(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && la(e, t);
        }(r, o), n = r, (a = [{ key: "getTable", value: function() {
          var e = vi(Or(r.prototype), "getTable", this).call(this);
          return e.setAttribute("cellpadding", 5), e.setAttribute("cellspacing", 0), e;
        } }, { key: "getTableHeaderCell", value: function(e) {
          var t = vi(Or(r.prototype), "getTableHeaderCell", this).call(this, e);
          return t.classList.add("ui-state-active"), t.style.fontWeight = "bold", t;
        } }, { key: "getTableCell", value: function() {
          var e = vi(Or(r.prototype), "getTableCell", this).call(this);
          return e.classList.add("ui-widget-content"), e;
        } }, { key: "getHeaderButtonHolder", value: function() {
          var e = this.getButtonHolder();
          return e.style.marginLeft = "10px", e.style.fontSize = ".6em", e.style.display = "inline-block", e;
        } }, { key: "getFormInputDescription", value: function(e) {
          var t = this.getDescription(e);
          return t.style.marginLeft = "10px", t.style.display = "inline-block", t;
        } }, { key: "getFormControl", value: function(e, t, i, u) {
          var d = vi(Or(r.prototype), "getFormControl", this).call(this, e, t, i, u);
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
        } }]) && vf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
      function gi(o) {
        return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, gi(o);
      }
      function wf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, jf(a.key), a);
        }
      }
      function jf(o) {
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
        return r = Oo(r), function(a, e) {
          if (e && (gi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, bu() ? Reflect.construct(r, n || [], Oo(o).constructor) : r.apply(o, n));
      }
      function bu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (bu = function() {
          return !!o;
        })();
      }
      function Oo(o) {
        return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, Oo(o);
      }
      function ua(o, r) {
        return ua = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ua(o, r);
      }
      mu.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' };
      var vu = function(o) {
        function r() {
          return function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, r), kf(this, r, arguments);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ua(e, t);
        }(r, o), n = r, (a = [{ key: "addInputError", value: function(e, t) {
          if (e.errmsg) e.errmsg.style.display = "block";
          else {
            var i = this.closest(e, ".form-control");
            e.errmsg = document.createElement("div"), e.errmsg.setAttribute("class", "errmsg"), i.nodeName && i.appendChild(e.errmsg);
          }
          e.errmsg.innerHTML = "", e.errmsg.appendChild(document.createTextNode(t)), e.errmsg.setAttribute("role", "alert");
        } }, { key: "removeInputError", value: function(e) {
          e.style && (e.style.borderColor = ""), e.errmsg && (e.errmsg.style.display = "none");
        } }]) && wf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
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
        return r = pt(r), function(a, e) {
          if (e && (_i(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, gu() ? Reflect.construct(r, n || [], pt(o).constructor) : r.apply(o, n));
      }
      function gu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (gu = function() {
          return !!o;
        })();
      }
      function vt() {
        return vt = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(o, r, n) {
          var a = function(t, i) {
            for (; !Object.prototype.hasOwnProperty.call(t, i) && (t = pt(t)) !== null; ) ;
            return t;
          }(o, r);
          if (a) {
            var e = Object.getOwnPropertyDescriptor(a, r);
            return e.get ? e.get.call(arguments.length < 3 ? o : n) : e.value;
          }
        }, vt.apply(this, arguments);
      }
      function pt(o) {
        return pt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }, pt(o);
      }
      function ca(o, r) {
        return ca = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, ca(o, r);
      }
      vu.rules = { ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red" };
      var Ef = { disable_theme_rules: !1, label_bold: !0, align_bottom: !1, object_indent: !1, object_border: !1, table_border: !1, table_zebrastyle: !1, input_size: "normal" }, _u = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Cf(this, r, [e, Ef]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ca(e, t);
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
          var e = vt(pt(r.prototype), "getButtonHolder", this).call(this);
          return e.classList.add("btn-group"), e;
        } }, { key: "getFormButtonHolder", value: function(e) {
          var t = vt(pt(r.prototype), "getFormButtonHolder", this).call(this);
          return t.classList.remove("btn-group"), t.classList.add("d-block"), e === "center" ? t.classList.add("text-center") : e === "right" ? t.classList.add("text-right") : t.classList.add("text-left"), t;
        } }, { key: "getFormButton", value: function(e, t, i) {
          var u = vt(pt(r.prototype), "getFormButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-primary", "mx-2", "my-1"), this.options.input_size !== "small" && u.classList.remove("btn-sm"), this.options.input_size === "large" && u.classList.add("btn-lg"), u;
        } }, { key: "getButton", value: function(e, t, i) {
          var u = vt(pt(r.prototype), "getButton", this).call(this, e, t, i);
          return u.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), u;
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
          var i = vt(pt(r.prototype), "getCheckboxLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-checkbox", "pr-0"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormCheckboxControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getMultiCheckboxHolder", value: function(e, t, i, u) {
          return vt(pt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
        } }, { key: "getFormRadio", value: function(e) {
          var t = this.getFormInputField("radio");
          for (var i in e) t.setAttribute(i, e[i]);
          return t;
        } }, { key: "getFormRadioLabel", value: function(e, t) {
          var i = vt(pt(r.prototype), "getFormRadioLabel", this).call(this, e, t), u = document.createElement("i");
          return u.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(u, i.firstChild), i;
        } }, { key: "getFormRadioControl", value: function(e, t, i) {
          return e.insertBefore(t, e.firstChild), i && e.classList.add("form-inline"), e;
        } }, { key: "getFormInputField", value: function(e) {
          var t = vt(pt(r.prototype), "getFormInputField", this).call(this, e);
          return ["checkbox", "radio"].includes(e) || t.classList.add("form-input"), t;
        } }, { key: "getRangeInput", value: function(e, t, i, u, d) {
          var b = vt(pt(r.prototype), "getRangeInput", this).call(this, e, t, i, u, d);
          return b.classList.add("slider"), b.classList.remove("form-input"), b.setAttribute("oninput", 'this.setAttribute("value", this.value)'), b;
        } }, { key: "getRangeControl", value: function(e, t) {
          var i = vt(pt(r.prototype), "getRangeControl", this).call(this, e, t);
          return i.classList.add("text-center"), i;
        } }, { key: "getSelectInput", value: function(e, t) {
          var i = vt(pt(r.prototype), "getSelectInput", this).call(this, e);
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
          var x = document.createElement("div");
          return x.classList.add("card-body"), x.innerHTML = e, b.appendChild(x), t;
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
        } }]) && xf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
      function wi(o) {
        return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, wi(o);
      }
      function Sf(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Pf(a.key), a);
        }
      }
      function Pf(o) {
        var r = function(n, a) {
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
        return r = mt(r), function(a, e) {
          if (e && (wi(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return function(t) {
            if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(a);
        }(o, wu() ? Reflect.construct(r, n || [], mt(o).constructor) : r.apply(o, n));
      }
      function wu() {
        try {
          var o = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch {
        }
        return (wu = function() {
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
      function da(o, r) {
        return da = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
          return n.__proto__ = a, n;
        }, da(o, r);
      }
      _u.rules = { "*": "--primary-color:%235755d9;--gray-color:%23bcc3ce;--light-color:%23fff", ".slider:focus": "box-shadow:none", "h4 > label + .btn-group": "margin-left:1rem", ".text-right > button": "margin-right:0%20!important", ".text-left > button": "margin-left:0%20!important", ".property-selector": "font-size:0.7rem;font-weight:normal;max-height:260px%20!important;width:395px%20!important", ".property-selector .form-checkbox": "margin:0", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "border-collapse:collapse", ".table td": "padding:0.4rem%200.4rem", ".mr-5": "margin-right:1rem%20!important", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23eee", ".je-table-border td": "border:0.05rem%20solid%20%23dadee4%20!important", ".btn-info": "font-size:0.5rem;font-weight:bold;height:0.8rem;padding:0.15rem%200;line-height:0.8;margin:0.3rem%200%200.3rem%200.1rem", ".je-label + select": "min-width:5rem", ".je-label": "font-weight:600", ".btn-action.btn-info": "width:0.8rem", ".je-border": "border:0.05rem%20solid%20%23dadee4", ".je-panel": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit", ".je-align-bottom": "margin-top:auto", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem;border:3px%20solid%20white;box-shadow:0px%200px%208px%20rgba(0%2C%200%2C%200%2C%200.3);box-sizing:border-box", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".columns .container.je-noindent": "padding-left:0;padding-right:0", ".selectize-control.multi .item": "background:var(--primary-color)%20!important", ".select2-container--default   .select2-selection--single   .select2-selection__arrow": "display:none", ".select2-container--default .select2-selection--single": "border:none", ".select2-container .select2-selection--single .select2-selection__rendered": "padding:0", ".select2-container .select2-search--inline .select2-search__field": "margin-top:0", ".select2-container--default.select2-container--focus   .select2-selection--multiple": "border:0.05rem%20solid%20var(--gray-color)", ".select2-container--default   .select2-selection--multiple   .select2-selection__choice": "margin:0.4rem%200.2rem%200.2rem%200;padding:2px%205px;background-color:var(--primary-color);color:var(--light-color)", ".select2-container--default .select2-search--inline .select2-search__field": "line-height:normal", ".choices": "margin-bottom:auto", ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)", ".choices[data-type*='select-multiple'] .choices__button": "border-left:0.05rem%20solid%20%232826a6", ".choices__inner": "font-size:inherit;min-height:20px;padding:4px%207.5px%204px%203.75px", ".choices[data-type*='select-one'] .choices__inner": "padding-bottom:4px", ".choices__list--dropdown .choices__item": "font-size:inherit" };
      var Lf = { disable_theme_rules: !1, label_bold: !1, object_panel_default: !0, object_indent: !0, object_border: !1, table_border: !1, table_hdiv: !1, table_zebrastyle: !1, input_size: "small", enable_compact: !1 }, ju = function(o) {
        function r(e) {
          return function(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
          }(this, r), Tf(this, r, [e, Lf]);
        }
        return function(e, t) {
          if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && da(e, t);
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
          var d = _t(mt(r.prototype), "getMultiCheckboxHolder", this).call(this, e, t, i, u);
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
        } }, { key: "getRadioHolder", value: function(e, t, i, u, d) {
          var b = _t(mt(r.prototype), "getRadioHolder", this).call(this, t, i, u, d);
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
            for (var d = 0; d < t.length; d++) u.appendChild(t[d]);
            return i;
          }
        } }]) && Sf(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        var n, a;
      }(xr);
      ju.rules = { ".slider": "-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;display:block;border:none;height:1.2rem;width:100%25", ".slider:focus": "box-shadow:0%200%200%200%20rgba(87%2C%2085%2C%20217%2C%200.2);outline:none", ".slider.tooltip:not([data-tooltip])::after": "content:attr(value)", ".slider::-webkit-slider-thumb": "-webkit-appearance:none;background:%23f17405;border-radius:100%25;height:0.6rem;margin-top:-0.25rem;transition:transform%200.2s;width:0.6rem", ".slider:active::-webkit-slider-thumb": "transform:scale(1.25);outline:none", ".slider::-webkit-slider-runnable-track": "background:%23b2b4b6;border-radius:0.1rem;height:0.1rem;width:100%25", "a.tooltips": "position:relative;display:inline", "a.tooltips span": "position:absolute;white-space:nowrap;width:auto;padding-left:1rem;padding-right:1rem;color:%23ffffff;background:rgba(56%2C%2056%2C%2056%2C%200.85);height:1.5rem;line-height:1.5rem;text-align:center;visibility:hidden;border-radius:3px", "a.tooltips span:after": "content:%22%22;position:absolute;top:50%25;left:100%25;margin-top:-5px;width:0;height:0;border-left:5px%20solid%20rgba(56%2C%2056%2C%2056%2C%200.85);border-top:5px%20solid%20transparent;border-bottom:5px%20solid%20transparent", "a:hover.tooltips span": "visibility:visible;opacity:0.9;font-size:0.8rem;right:100%25;top:50%25;margin-top:-12px;margin-right:10px;z-index:999", ".json-editor-btntype-properties + div": "font-size:0.8rem;font-weight:normal", textarea: "width:100%25;min-height:2rem;resize:vertical", table: "width:100%25;border-collapse:collapse", ".table td": "padding:0rem%200rem", "div[data-schematype]:not([data-schematype='object'])": "transition:0.5s", "div[data-schematype]:not([data-schematype='object']):hover": "background-color:%23e6f4fe", "div[data-schemaid='root']": "position:relative;width:inherit;display:inherit;overflow-x:hidden;z-index:10", "select[multiple]": "height:auto", "select[multiple].from-select": "height:auto", ".je-table-zebra:nth-child(even)": "background-color:%23f2f2f2", ".je-table-border": "border:0.5px%20solid%20black", ".je-table-hdiv": "border-bottom:1px%20solid%20black", ".je-border": "border:0.05rem%20solid%20%233182ce", ".je-panel": "width:inherit;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-panel-top": "width:100%25;padding:0.2rem;margin:0.2rem;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".required:after": "content:%22%20*%22;color:red;font:inherit;font-weight:bold", ".je-desc": "font-size:smaller;margin:0.2rem%200", ".container-xl.je-noindent": "padding-left:0;padding-right:0", ".json-editor-btntype-add": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%234299e1;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deletelast": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23e53e3e;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-deleteall": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%23000000;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-save": "float:right;color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btn-back": "color:white;margin:0.3rem;padding:0.3rem%200.8rem;background-color:%232b6cb0;box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-webkit-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2);-moz-box-shadow:3px%203px%205px%201px%20rgba(4%2C%204%2C%204%2C%200.2)", ".json-editor-btntype-delete": "color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btntype-move": "color:%23000000;background-color:rgba(218%2C%20222%2C%20228%2C%200.1);margin:0.03rem;padding:0.1rem", ".json-editor-btn-collapse": "padding:0em%200.8rem;font-size:1.3rem;color:%23e53e3e;background-color:rgba(218%2C%20222%2C%20228%2C%200.1)", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-dropzone": "position:relative;margin:0.5rem%200;border:2px%20dashed%20black;width:100%25;height:60px;background:teal;transition:all%200.5s", ".je-dropzone:before": "position:absolute;content:attr(data-text);color:rgba(0%2C%200%2C%200%2C%200.6);left:50%25;top:50%25;transform:translate(-50%25%2C%20-50%25)", ".je-dropzone.valid-dropzone": "background:green", ".je-dropzone.invalid-dropzone": "background:red", ".switch": "position:relative;display:inline-block;width:28px;height:16px;margin-right:10px", ".switch input": "opacity:0;width:0;height:0", ".switch-slider": "position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:%23ccc;transition:.1s;border-radius:34px", ".switch-slider:before": "position:absolute;content:%22%22;height:12px;width:12px;left:1px;top:2px;background-color:white;transition:.1s;border-radius:50%25", "input:checked + .switch-slider": "background-color:%232196F3", "input:focus + .switch-slider": "box-shadow:0%200%201px%20%232196F3", "input:checked + .switch-slider:before": "transform:translateX(12px)", "input:disabled + .switch-slider": "opacity:0.5" };
      var Af = { html: lu, bootstrap3: cu, bootstrap4: hu, bootstrap5: fu, jqueryui: mu, barebones: vu, spectre: _u, tailwind: ju };
      const Rf = { ".table-responsive .autocomplete-result-list": "position:relative%20!important", ".je-float-right-linkholder": "float:right;margin-left:10px", ".je-modal": "background-color:white;border:1px%20solid%20black;box-shadow:3px%203px%20black;position:absolute;z-index:10", ".je-infobutton-icon": "font-size:16px;font-weight:bold;padding:0.25rem;position:relative;display:inline-block", ".je-infobutton-tooltip": "font-size:12px;font-weight:normal;font-family:sans-serif;visibility:hidden;background-color:rgba(50%2C%2050%2C%2050%2C%200.75);margin:0%200.25rem;color:%23fafafa;padding:0.5rem%201rem;border-radius:0.25rem;width:20rem;position:absolute", ".je-not-loaded": "pointer-events:none", ".je-header": "display:inline-block", ".je-upload-preview img": "float:left;margin:0%200.5rem%200.5rem%200;max-width:100%25;max-height:5rem", ".je-checkbox": "display:inline-block;width:auto", ".je-checkbox-control--compact": "display:inline-block;margin-right:1rem", ".je-radio": "display:inline-block;width:auto", ".je-radio-control--compact": "display:inline-block;margin-right:1rem", ".je-switcher": "background-color:transparent;display:inline-block;font-style:italic;font-weight:normal;height:auto;width:auto;margin-bottom:0;margin-left:5px;padding:0%200%200%203px", ".je-textarea": "width:100%25;height:300px;box-sizing:border-box", ".je-range-control": "text-align:center", ".je-indented-panel": "padding-left:10px;margin-left:10px;border-left:1px%20solid%20%23ccc", ".je-indented-panel--top": "padding-left:10px;margin-left:10px", ".je-tabholder": "float:left;width:130px", ".je-tabholder .content": "margin-left:120px", ".je-tabholder--top": "margin-left:10px", ".je-tabholder--clear": "clear:both", ".je-tab": "border:1px%20solid%20%23ccc;border-width:1px%200%201px%201px;text-align:center;line-height:30px;border-radius:5px;border-bottom-right-radius:0;border-top-right-radius:0;font-weight:bold;cursor:pointer", ".je-tab--top": "float:left;border:1px%20solid%20%23ccc;border-width:1px%201px%200px%201px;text-align:center;line-height:30px;border-radius:5px;padding-left:5px;padding-right:5px;border-bottom-right-radius:0;border-bottom-left-radius:0;font-weight:bold;cursor:pointer", ".je-block-link": "display:block", ".je-media": "width:100%25" };
      function Cn(o) {
        return Cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
          return typeof r;
        } : function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, Cn(o);
      }
      function ha(o, r) {
        (r == null || r > o.length) && (r = o.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = o[n];
        return a;
      }
      function pa() {
        pa = function() {
          return r;
        };
        var o, r = {}, n = Object.prototype, a = n.hasOwnProperty, e = Object.defineProperty || function(U, q, J) {
          U[q] = J.value;
        }, t = typeof Symbol == "function" ? Symbol : {}, i = t.iterator || "@@iterator", u = t.asyncIterator || "@@asyncIterator", d = t.toStringTag || "@@toStringTag";
        function b(U, q, J) {
          return Object.defineProperty(U, q, { value: J, enumerable: !0, configurable: !0, writable: !0 }), U[q];
        }
        try {
          b({}, "");
        } catch {
          b = function(q, J, ge) {
            return q[J] = ge;
          };
        }
        function x(U, q, J, ge) {
          var se = q && q.prototype instanceof _e ? q : _e, Le = Object.create(se.prototype), $e = new dr(ge || []);
          return e(Le, "_invoke", { value: Ot(U, J, $e) }), Le;
        }
        function P(U, q, J) {
          try {
            return { type: "normal", arg: U.call(q, J) };
          } catch (ge) {
            return { type: "throw", arg: ge };
          }
        }
        r.wrap = x;
        var I = "suspendedStart", $ = "suspendedYield", G = "executing", ee = "completed", pe = {};
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
        function Ke(U) {
          ["next", "throw", "return"].forEach(function(q) {
            b(U, q, function(J) {
              return this._invoke(q, J);
            });
          });
        }
        function it(U, q) {
          function J(se, Le, $e, ot) {
            var st = P(U[se], U, Le);
            if (st.type !== "throw") {
              var It = st.arg, Yt = It.value;
              return Yt && Cn(Yt) == "object" && a.call(Yt, "__await") ? q.resolve(Yt.__await).then(function(Et) {
                J("next", Et, $e, ot);
              }, function(Et) {
                J("throw", Et, $e, ot);
              }) : q.resolve(Yt).then(function(Et) {
                It.value = Et, $e(It);
              }, function(Et) {
                return J("throw", Et, $e, ot);
              });
            }
            ot(st.arg);
          }
          var ge;
          e(this, "_invoke", { value: function(se, Le) {
            function $e() {
              return new q(function(ot, st) {
                J(se, Le, ot, st);
              });
            }
            return ge = ge ? ge.then($e, $e) : $e();
          } });
        }
        function Ot(U, q, J) {
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
                var ot = rn($e, J);
                if (ot) {
                  if (ot === pe) continue;
                  return ot;
                }
              }
              if (J.method === "next") J.sent = J._sent = J.arg;
              else if (J.method === "throw") {
                if (ge === I) throw ge = ee, J.arg;
                J.dispatchException(J.arg);
              } else J.method === "return" && J.abrupt("return", J.arg);
              ge = G;
              var st = P(U, q, J);
              if (st.type === "normal") {
                if (ge = J.done ? ee : $, st.arg === pe) continue;
                return { value: st.arg, done: J.done };
              }
              st.type === "throw" && (ge = ee, J.method = "throw", J.arg = st.arg);
            }
          };
        }
        function rn(U, q) {
          var J = q.method, ge = U.iterator[J];
          if (ge === o) return q.delegate = null, J === "throw" && U.iterator.return && (q.method = "return", q.arg = o, rn(U, q), q.method === "throw") || J !== "return" && (q.method = "throw", q.arg = new TypeError("The iterator does not provide a '" + J + "' method")), pe;
          var se = P(ge, U.iterator, q.arg);
          if (se.type === "throw") return q.method = "throw", q.arg = se.arg, q.delegate = null, pe;
          var Le = se.arg;
          return Le ? Le.done ? (q[U.resultName] = Le.value, q.next = U.nextLoc, q.method !== "return" && (q.method = "next", q.arg = o), q.delegate = null, pe) : Le : (q.method = "throw", q.arg = new TypeError("iterator result is not an object"), q.delegate = null, pe);
        }
        function ji(U) {
          var q = { tryLoc: U[0] };
          1 in U && (q.catchLoc = U[1]), 2 in U && (q.finallyLoc = U[2], q.afterLoc = U[3]), this.tryEntries.push(q);
        }
        function Ne(U) {
          var q = U.completion || {};
          q.type = "normal", delete q.arg, U.completion = q;
        }
        function dr(U) {
          this.tryEntries = [{ tryLoc: "root" }], U.forEach(ji, this), this.reset(!0);
        }
        function Ct(U) {
          if (U || U === "") {
            var q = U[i];
            if (q) return q.call(U);
            if (typeof U.next == "function") return U;
            if (!isNaN(U.length)) {
              var J = -1, ge = function se() {
                for (; ++J < U.length; ) if (a.call(U, J)) return se.value = U[J], se.done = !1, se;
                return se.value = o, se.done = !0, se;
              };
              return ge.next = ge;
            }
          }
          throw new TypeError(Cn(U) + " is not iterable");
        }
        return we.prototype = Ie, e(xe, "constructor", { value: Ie, configurable: !0 }), e(Ie, "constructor", { value: we, configurable: !0 }), we.displayName = b(Ie, d, "GeneratorFunction"), r.isGeneratorFunction = function(U) {
          var q = typeof U == "function" && U.constructor;
          return !!q && (q === we || (q.displayName || q.name) === "GeneratorFunction");
        }, r.mark = function(U) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(U, Ie) : (U.__proto__ = Ie, b(U, d, "GeneratorFunction")), U.prototype = Object.create(xe), U;
        }, r.awrap = function(U) {
          return { __await: U };
        }, Ke(it.prototype), b(it.prototype, u, function() {
          return this;
        }), r.AsyncIterator = it, r.async = function(U, q, J, ge, se) {
          se === void 0 && (se = Promise);
          var Le = new it(x(U, q, J, ge), se);
          return r.isGeneratorFunction(q) ? Le : Le.next().then(function($e) {
            return $e.done ? $e.value : Le.next();
          });
        }, Ke(xe), b(xe, d, "Generator"), b(xe, i, function() {
          return this;
        }), b(xe, "toString", function() {
          return "[object Generator]";
        }), r.keys = function(U) {
          var q = Object(U), J = [];
          for (var ge in q) J.push(ge);
          return J.reverse(), function se() {
            for (; J.length; ) {
              var Le = J.pop();
              if (Le in q) return se.value = Le, se.done = !1, se;
            }
            return se.done = !0, se;
          };
        }, r.values = Ct, dr.prototype = { constructor: dr, reset: function(U) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(Ne), !U) for (var q in this) q.charAt(0) === "t" && a.call(this, q) && !isNaN(+q.slice(1)) && (this[q] = o);
        }, stop: function() {
          this.done = !0;
          var U = this.tryEntries[0].completion;
          if (U.type === "throw") throw U.arg;
          return this.rval;
        }, dispatchException: function(U) {
          if (this.done) throw U;
          var q = this;
          function J(st, It) {
            return Le.type = "throw", Le.arg = U, q.next = st, It && (q.method = "next", q.arg = o), !!It;
          }
          for (var ge = this.tryEntries.length - 1; ge >= 0; --ge) {
            var se = this.tryEntries[ge], Le = se.completion;
            if (se.tryLoc === "root") return J("end");
            if (se.tryLoc <= this.prev) {
              var $e = a.call(se, "catchLoc"), ot = a.call(se, "finallyLoc");
              if ($e && ot) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              } else if ($e) {
                if (this.prev < se.catchLoc) return J(se.catchLoc, !0);
              } else {
                if (!ot) throw Error("try statement without catch or finally");
                if (this.prev < se.finallyLoc) return J(se.finallyLoc);
              }
            }
          }
        }, abrupt: function(U, q) {
          for (var J = this.tryEntries.length - 1; J >= 0; --J) {
            var ge = this.tryEntries[J];
            if (ge.tryLoc <= this.prev && a.call(ge, "finallyLoc") && this.prev < ge.finallyLoc) {
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
            var J = this.tryEntries[q];
            if (J.finallyLoc === U) return this.complete(J.completion, J.afterLoc), Ne(J), pe;
          }
        }, catch: function(U) {
          for (var q = this.tryEntries.length - 1; q >= 0; --q) {
            var J = this.tryEntries[q];
            if (J.tryLoc === U) {
              var ge = J.completion;
              if (ge.type === "throw") {
                var se = ge.arg;
                Ne(J);
              }
              return se;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(U, q, J) {
          return this.delegate = { iterator: Ct(U), resultName: q, nextLoc: J }, this.method === "next" && (this.arg = o), pe;
        } }, r;
      }
      function ku(o, r, n, a, e, t, i) {
        try {
          var u = o[t](i), d = u.value;
        } catch (b) {
          return void n(b);
        }
        u.done ? r(d) : Promise.resolve(d).then(a, e);
      }
      function If(o, r) {
        for (var n = 0; n < r.length; n++) {
          var a = r[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, Bf(a.key), a);
        }
      }
      function Bf(o) {
        var r = function(n, a) {
          if (Cn(n) != "object" || !n) return n;
          var e = n[Symbol.toPrimitive];
          if (e !== void 0) {
            var t = e.call(n, "string");
            if (Cn(t) != "object") return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(n);
        }(o);
        return Cn(r) == "symbol" ? r : r + "";
      }
      var Cr = function() {
        function o(t) {
          var i = this, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (function(G, ee) {
            if (!(G instanceof ee)) throw new TypeError("Cannot call a class as a function");
          }(this, o), !(t instanceof Element)) throw new Error("element should be an instance of Element");
          this.element = t, this.options = _({}, o.defaults.options, u), this.ready = !1, this.copyClipboard = null, this.schema = this.options.schema, this.template = this.options.template, this.translate = this.options.translate || o.defaults.translate, this.translateProperty = this.options.translateProperty || o.defaults.translateProperty, this.uuid = 0, this.__data = {};
          var d = this.options.theme || o.defaults.theme, b = o.defaults.themes[d];
          if (!b) throw new Error("Unknown theme ".concat(d));
          this.element.setAttribute("data-theme", d), this.element.classList.add("je-not-loaded"), this.element.classList.remove("je-ready"), this.theme = new b(this);
          var x = _(Rf, this.getEditorsRules()), P = function(G, ee, pe) {
            return pe ? i.addNewStyleRulesToShadowRoot(G, ee, pe) : i.addNewStyleRules(G, ee);
          };
          if (!this.theme.options.disable_theme_rules) {
            var I = C(this.element);
            P("default", x, I), b.rules !== void 0 && P(d, b.rules, I);
          }
          var $ = o.defaults.iconlibs[this.options.iconlib || o.defaults.iconlib];
          $ && (this.iconlib = new $()), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.promise = this.load();
        }
        return r = o, n = [{ key: "load", value: (a = pa().mark(function t() {
          var i, u, d, b, x, P, I = this;
          return pa().wrap(function($) {
            for (; ; ) switch ($.prev = $.next) {
              case 0:
                return i = document.location.origin + document.location.pathname.toString(), (u = new Cp(this.options)).onSchemaLoaded = function(G) {
                  I.trigger("schemaLoaded", G);
                }, u.onAllSchemasLoaded = function() {
                  I.trigger("allSchemasLoaded");
                }, this.expandSchema = function(G) {
                  return u.expandSchema(G);
                }, this.expandRefs = function(G, ee) {
                  return u.expandRefs(G, ee);
                }, d = document.location.toString(), $.next = 9, u.load(this.schema, i, d);
              case 9:
                b = $.sent, x = this.options.custom_validators ? { custom_validators: this.options.custom_validators } : {}, this.validator = new Cl(this, null, x, o.defaults), P = this.getEditorClass(b), this.root = this.createEditor(P, { jsoneditor: this, schema: b, required: !0, container: this.root_container }), this.root.preBuild(), this.root.build(), this.root.postBuild(), k(this.options, "startval") && this.root.setValue(this.options.startval), this.validation_results = this.validator.validate(this.root.getValue()), this.root.showValidationErrors(this.validation_results), this.ready = !0, this.element.classList.remove("je-not-loaded"), this.element.classList.add("je-ready"), window.requestAnimationFrame(function() {
                  I.ready && (I.validation_results = I.validator.validate(I.root.getValue()), I.root.showValidationErrors(I.validation_results), I.trigger("ready"), I.trigger("change"));
                });
              case 24:
              case "end":
                return $.stop();
            }
          }, t, this);
        }), e = function() {
          var t = this, i = arguments;
          return new Promise(function(u, d) {
            var b = a.apply(t, i);
            function x(I) {
              ku(b, u, d, x, P, "next", I);
            }
            function P(I) {
              ku(b, u, d, x, P, "throw", I);
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
            return i.rules ? _(t, i.rules) : t;
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
          return new t(i = _({}, t.options || {}, i), o.defaults, u);
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
          Object.keys(i).forEach(function(x) {
            var P = t === "default" ? x : "".concat(b, '[data-theme="').concat(t, '"] ').concat(x);
            d.insertRule ? d.insertRule(P + " {" + decodeURIComponent(i[x]) + "}", 0) : d.addRule && d.addRule(P, decodeURIComponent(i[x]), 0);
          });
        } }, { key: "addNewStyleRulesToShadowRoot", value: function(t, i, u) {
          var d = this.element.nodeName.toLowerCase(), b = "";
          Object.keys(i).forEach(function(I) {
            var $ = t === "default" ? I : "".concat(d, '[data-theme="').concat(t, '"] ').concat(I);
            b += $ + " {" + decodeURIComponent(i[I]) + `}
`;
          });
          var x, P = new CSSStyleSheet();
          P.replaceSync(b), u.adoptedStyleSheets = [].concat(function(I) {
            if (Array.isArray(I)) return ha(I);
          }(x = u.adoptedStyleSheets) || function(I) {
            if (typeof Symbol < "u" && I[Symbol.iterator] != null || I["@@iterator"] != null) return Array.from(I);
          }(x) || function(I, $) {
            if (I) {
              if (typeof I == "string") return ha(I, $);
              var G = Object.prototype.toString.call(I).slice(8, -1);
              return G === "Object" && I.constructor && (G = I.constructor.name), G === "Map" || G === "Set" ? Array.from(I) : G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G) ? ha(I, $) : void 0;
            }
          }(x) || function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }(), [P]);
        } }, { key: "showValidationErrors", value: function(t) {
          var i = t ?? this.validate();
          Object.values(this.editors).forEach(function(u) {
            u && (u.is_dirty = !0, u.showValidationErrors(i));
          });
        } }], n && If(r.prototype, n), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        var r, n, a, e;
      }();
      Cr.defaults = gn, Cr.AbstractEditor = z, Cr.AbstractTheme = xr, Cr.AbstractIconLib = kr, Object.assign(Cr.defaults.themes, Af), Object.assign(Cr.defaults.editors, mo), Object.assign(Cr.defaults.templates, Ep), Object.assign(Cr.defaults.iconlibs, ef);
    })(), O;
  })());
})(hd);
var pd = hd.exports;
const Ca = /* @__PURE__ */ ab(pd), lb = ["placeholder"], ub = { class: "ontocombo-arrow" }, cb = ["onClick"], db = ["title"], hb = ["onClick"], pb = ["title"], fb = {
  key: 0,
  class: "ontocombo-empty"
}, yb = {
  __name: "ontocombo",
  props: {
    modelValue: String,
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "Select..." }
  },
  emits: ["update:modelValue"],
  setup(l, { emit: c }) {
    const p = l, w = c, v = /* @__PURE__ */ Tn(null), O = /* @__PURE__ */ Tn(!1), h = /* @__PURE__ */ Tn(""), g = /* @__PURE__ */ Tn(/* @__PURE__ */ new Set()), s = /* @__PURE__ */ Tn("");
    Io(() => p.modelValue, (S) => {
      if (!S) {
        s.value = "";
        return;
      }
      const L = (T) => {
        for (const A of T) {
          if (!A.children && A.value === S) return A.label;
          if (A.children) {
            const N = L(A.children);
            if (N) return N;
          }
        }
        return S;
      };
      s.value = L(p.options) || S;
    }, { immediate: !0 });
    const f = ld(() => {
      const S = h.value.toLowerCase(), L = (T, A = 0, N = !1) => {
        let D = [];
        for (const F of T) {
          const M = F.label.toLowerCase().includes(S), H = F.children ? y(F.children, S) : !1;
          if (!S || M || H)
            if (F.children) {
              const z = N || !!S || g.value.has(F.id);
              D.push({
                ...F,
                isGroup: !0,
                level: A,
                expanded: z
              }), z && D.push(...L(F.children, A + 1, N));
            } else
              D.push({ ...F, isGroup: !1, level: A });
        }
        return D;
      };
      return L(p.options);
    }), y = (S, L) => {
      for (const T of S)
        if (T.label.toLowerCase().includes(L) || T.children && y(T.children, L)) return !0;
      return !1;
    }, m = () => {
      O.value = !O.value, O.value && (h.value = "");
    }, _ = () => {
      O.value = !1, h.value = "";
    }, j = (S) => {
      g.value.has(S) ? g.value.delete(S) : g.value.add(S), g.value = new Set(g.value);
    }, C = (S) => {
      w("update:modelValue", S.value), s.value = S.label, _();
    }, k = (S, L) => {
      const T = L ? "group" : "element";
      return S === 0 ? T : S === 1 ? `sub${T}` : S === 2 ? `subsub${T}` : `${T}-level-${S}`;
    }, E = (S) => {
      O.value && v.value && (S.composedPath().includes(v.value) || _());
    };
    return Xa(() => document.addEventListener("click", E)), el(() => document.removeEventListener("click", E)), (S, L) => (Pr(), on("div", {
      class: "ontocombo",
      ref_key: "containerRef",
      ref: v
    }, [
      wt("div", {
        class: "ontocombo-header",
        onClick: Ui(m, ["stop"])
      }, [
        Lu(wt("input", {
          type: "text",
          class: "ontocombo-input",
          "onUpdate:modelValue": L[0] || (L[0] = (T) => h.value = T),
          onFocus: L[1] || (L[1] = (T) => O.value = !0),
          onClick: L[2] || (L[2] = Ui(() => {
          }, ["stop"])),
          placeholder: s.value || l.placeholder
        }, null, 40, lb), [
          [eb, h.value]
        ]),
        wt("div", ub, [
          wt("i", {
            class: An(["fas", O.value ? "fa-caret-down" : "fa-caret-right"])
          }, null, 2)
        ])
      ]),
      Lu(wt("div", {
        class: "ontocombo-dropdown",
        onClick: L[3] || (L[3] = Ui(() => {
        }, ["stop"]))
      }, [
        (Pr(!0), on(Nt, null, Uy(f.value, (T) => (Pr(), on(Nt, {
          key: T.id
        }, [
          T.isGroup ? (Pr(), on("div", {
            key: 0,
            class: An(["ontocombo-row is-group", k(T.level, !0)]),
            style: Xi({ paddingLeft: `${T.level * 16 + 8}px` }),
            onClick: Ui((A) => j(T.id), ["stop"])
          }, [
            wt("span", {
              class: "row-label",
              title: T.label
            }, Do(T.label), 9, db),
            wt("i", {
              class: An(["fas row-toggle", T.expanded ? "fa-caret-down" : "fa-caret-right"])
            }, null, 2)
          ], 14, cb)) : (Pr(), on("div", {
            key: 1,
            class: An(["ontocombo-row is-element", k(T.level, !1)]),
            style: Xi({ paddingLeft: `${T.level * 16 + 8}px` }),
            onClick: Ui((A) => C(T), ["stop"])
          }, [
            wt("span", {
              class: "row-label",
              title: T.label
            }, Do(T.label), 9, pb)
          ], 14, hb))
        ], 64))), 128)),
        f.value.length === 0 ? (Pr(), on("div", fb, " No results found ")) : od("", !0)
      ], 512), [
        [Nm, O.value]
      ])
    ], 512));
  }
};
function mb(l, c) {
  l.defaults.editors.ontocombo = class extends l.defaults.editors.string {
    build() {
      var w;
      this.input = document.createElement("input"), this.input.type = "hidden", this.container.appendChild(this.input), this.vueContainer = document.createElement("div"), this.container.appendChild(this.vueContainer);
      const p = ((w = this.schema.options) == null ? void 0 : w.ontology_data) || [];
      this.vueApp = c(yb, {
        options: p,
        modelValue: this.value,
        placeholder: this.schema.title || "Select...",
        "onUpdate:modelValue": (v) => {
          this.value = v, this.input.value = v, this.onChange(!0);
        }
      }), this.vueInstance = this.vueApp.mount(this.vueContainer);
    }
    setValue(p) {
      this.value = p, this.input && (this.input.value = p), this.vueInstance && (this.vueInstance.$props.modelValue = p);
    }
    // Safely override enable/disable to prevent the crash
    enable() {
      this.always_disabled || (this.disabled = !1, this.input && (this.input.disabled = !1));
    }
    disable(p) {
      p && (this.always_disabled = !0), this.disabled = !0, this.input && (this.input.disabled = !0);
    }
    destroy() {
      this.vueApp && this.vueApp.unmount(), this.vueContainer && this.vueContainer.parentNode && this.vueContainer.parentNode.removeChild(this.vueContainer), super.destroy();
    }
  }, l.defaults.resolvers.unshift((p) => {
    if (p.type === "string" && p.format === "ontocombo")
      return "ontocombo";
  });
}
const bb = {
  key: 0,
  class: "alert alert-danger mb-3"
}, vb = {
  class: "json-editor-scroll-area d-flex flex-column h-100",
  "data-bs-theme": "light"
}, gb = {
  __name: "filter",
  props: {
    model: Object
  },
  setup(l) {
    const c = l, p = /* @__PURE__ */ Tn(null), w = /* @__PURE__ */ Tn("");
    let v = null, O = !1;
    const h = { class: "form-select" }, g = { class: "border-0 p-0 m-0 bg-transparent shadow-none" }, s = {
      type: "object",
      format: "categories",
      title: " ",
      properties: {
        Simple: {
          type: "array",
          minItems: 1,
          options: {
            category: "Simple",
            containerAttributes: g,
            titleHidden: !0
          },
          items: {
            type: "object",
            format: "grid",
            options: {
              containerAttributes: g,
              inputAttributes: g,
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
            containerAttributes: g,
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
    }, f = (j, C) => {
      if (C && !C.querySelector(`link[href="${j}"]`)) {
        const k = document.createElement("link");
        k.rel = "stylesheet", k.href = j, C.appendChild(k);
      }
    }, y = () => {
      if (c.model && v) {
        O = !0;
        const j = v.getEditor("root.Simple");
        j && j.setValue([{ subject: "", predicate: "", object: "", logic: "AND", modifier: "" }]);
        const C = v.getEditor("root.Advanced.query");
        C && C.setValue(`SELECT * WHERE {
  ?s ?p ?o .
}`), _(), setTimeout(() => {
          let k = v.getValue();
          k = JSON.parse(JSON.stringify(k || {}));
          const E = c.model.get("value") || {};
          k._trigger_apply = E._trigger_apply || 0, k._trigger_cancel = Date.now(), c.model.set("value", k), c.model.save_changes(), O = !1;
        }, 50);
      }
    }, m = () => {
      c.model && v && setTimeout(() => {
        let j = v.getValue();
        j = JSON.parse(JSON.stringify(j || {}));
        const C = c.model.get("value") || {};
        j._trigger_cancel = C._trigger_cancel || 0, j._trigger_apply = Date.now(), c.model.set("value", j), c.model.save_changes();
      }, 50);
    }, _ = () => {
      Aa(() => {
        var E, S;
        const j = (E = p.value) == null ? void 0 : E.getRootNode();
        if (!j || !v) return;
        const C = v.getValue(), k = ((S = C == null ? void 0 : C.Simple) == null ? void 0 : S.length) || 0;
        for (let L = 0; L < k; L++) {
          const T = L === k - 1, A = j.querySelector(`[data-schemapath="root.Simple.${L}.logic"]`), N = j.querySelector(`[data-schemapath="root.Simple.${L}.modifier"]`);
          A && (T ? A.classList.add("d-none") : A.classList.remove("d-none")), N && (T ? N.classList.add("d-none") : N.classList.remove("d-none"));
        }
      });
    };
    return Xa(async () => {
      var C;
      await Aa();
      const j = p.value.getRootNode();
      f("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", j), f("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css", j), f("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css", document.head);
      try {
        const k = pd.JSONEditor || (Ca == null ? void 0 : Ca.JSONEditor) || window.JSONEditor;
        mb(k, dd);
        const E = ((C = c.model) == null ? void 0 : C.get("schema")) || {}, S = E.entities || [], L = E.predicates || [], T = s.properties.Simple.items.properties;
        T.subject.options.ontology_data = S, T.object.options.ontology_data = S, T.predicate.options.ontology_data = L, v = new k(p.value, {
          theme: "bootstrap5",
          iconlib: "fontawesome5",
          schema: s,
          disable_collapse: !0,
          disable_edit_json: !0,
          disable_properties: !0,
          show_opt_in: !1,
          disable_array_reorder: !0,
          disable_array_delete_all_rows: !0,
          remove_button_labels: !0,
          prompt_before_delete: !1
        }), v.on("ready", () => {
          j.querySelectorAll(".nav-tabs .nav-item").forEach((D) => {
            D.textContent.trim() === "Basic" && (D.style.display = "none");
          }), j.querySelectorAll(".nav-tabs .nav-link").forEach((D) => {
            D.textContent.trim() === "Simple" && D.click();
          }), _();
        }), v.on("change", () => {
          if (O) return;
          let A = v.getValue(), N = !0;
          if (j.querySelectorAll(".nav-tabs .nav-link").forEach((F) => {
            F.textContent.trim() === "Advanced" && F.classList.contains("active") && (N = !1);
          }), N && A && A.Simple && Array.isArray(A.Simple)) {
            let F = [];
            A.Simple.forEach((H, z) => {
              let V = `${H.subject || "?s"} ${H.predicate || "?p"} ${H.object || "?o"}`;
              if (z > 0) {
                let K = A.Simple[z - 1];
                K.modifier === "NOT" && (V = `FILTER NOT EXISTS { ${V} }`);
                let Z = K.logic === "OR" ? ` } UNION {
    ` : ` .
    `;
                F.push(Z);
              } else
                H.modifier === "NOT" && (V = `FILTER NOT EXISTS { ${V} }`);
              F.push(V);
            });
            const M = `SELECT * WHERE {
  ${F.join("")} 
}`;
            if (A.Advanced || (A.Advanced = {}), A.Advanced.query !== M) {
              O = !0;
              const H = v.getEditor("root.Advanced.query");
              H && H.setValue(M), A.Advanced.query = M, O = !1;
            }
          }
          if (_(), c.model) {
            A = JSON.parse(JSON.stringify(A || {}));
            const F = c.model.get("value") || {};
            F._trigger_apply && (A._trigger_apply = F._trigger_apply), F._trigger_cancel && (A._trigger_cancel = F._trigger_cancel), c.model.set("value", A), c.model.save_changes();
          }
        });
      } catch (k) {
        console.error("Failed to initialize JSON Editor:", k), w.value = String(k);
      }
    }), el(() => {
      v && v.destroy();
    }), (j, C) => (Pr(), on(Nt, null, [
      w.value ? (Pr(), on("div", bb, [
        C[0] || (C[0] = wt("strong", null, "Error:", -1)),
        id(" " + Do(w.value), 1)
      ])) : od("", !0),
      wt("div", vb, [
        wt("div", {
          ref_key: "editorHolder",
          ref: p,
          class: "flex-grow-1"
        }, null, 512),
        wt("div", { class: "m-3 d-flex justify-content-end border-top pt-3" }, [
          wt("button", {
            class: "btn btn-secondary col-3 me-2",
            onClick: y
          }, "Cancel"),
          wt("button", {
            class: "btn btn-primary col-3",
            onClick: m
          }, "Apply")
        ])
      ])
    ], 64));
  }
}, _b = ".json-editor-scroll-area{max-height:calc(100vh - 88px);overflow-x:hidden;overflow-y:auto}.json-editor-scroll-area .card{border:none!important;background:transparent!important;padding:0 2px!important;margin:0!important}.json-editor-scroll-area .card-header{margin-bottom:10px}.json-editor-scroll-area .card-title{display:none!important}.json-editor-scroll-area .card-body{padding-top:0;padding-bottom:0}.json-editor-scroll-area .btn-group,.json-editor-scroll-area .je-object__controls{display:none}.json-editor-scroll-area .json-editor-btntype-add{background-color:#fff;border-color:var(--bs-success);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-success);margin-right:1rem}.json-editor-scroll-area .json-editor-btntype-add:active,.json-editor-scroll-area .json-editor-btntype-add:focus-visible,.json-editor-scroll-area .json-editor-btntype-add:hover{background-color:var(--bs-success);border-color:var(--bs-success);color:#fff}.json-editor-scroll-area .json-editor-btntype-deletelast{background-color:#fff;border-color:var(--bs-danger);border-radius:var(--bs-border-radius-sm)!important;color:var(--bs-danger)}.json-editor-scroll-area .json-editor-btntype-deletelast:active,.json-editor-scroll-area .json-editor-btntype-deletelast:focus-visible,.json-editor-scroll-area .json-editor-btntype-deletelast:hover{background-color:var(--bs-danger);border-color:var(--bs-danger);color:#fff}";
function wb({ model: l, el: c }) {
  const p = document.createElement("style");
  p.innerHTML = _b, c.append(p);
  const w = document.createElement("div");
  w.setAttribute("id", "filter-vue-app"), c.append(w);
  const v = dd(gb, { model: l });
  return v.mount(w), () => {
    v.unmount();
  };
}
export {
  wb as render
};

#!/usr/bin/env node
import __module from 'module';import __path from 'path';import __url from 'url';const require = __module.createRequire(import.meta.url);const __dirname = __path.dirname(__url.fileURLToPath(import.meta.url));const __filename=new URL(import.meta.url).pathname

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {
  }
  ;
  $$Proxy2.value = new $$Proxy2();
  return $$Proxy2;
}();

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map12(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidLeft = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return function(f) {
    return function(x) {
      return map12($$const(x))(f);
    };
  };
};
var voidRight = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return function(x) {
    return map12($$const(x));
  };
};
var functorArray = {
  map: arrayMap
};

// output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
var unsafeSet = function(label) {
  return function(value) {
    return function(rec) {
      var copy = {};
      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy[key] = rec[key];
        }
      }
      copy[label] = value;
      return copy;
    };
  };
};

// output/Data.Semigroup/index.js
var semigroupString = {
  append: concatString
};
var semigroupArray = {
  append: concatArray
};
var append = function(dict) {
  return dict.append;
};

// output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// output/Control.Apply/foreign.js
var arrayApply = function(fs) {
  return function(xs) {
    var l = fs.length;
    var k = xs.length;
    var result = new Array(l * k);
    var n = 0;
    for (var i = 0; i < l; i++) {
      var f = fs[i];
      for (var j = 0; j < k; j++) {
        result[n++] = f(xs[j]);
      }
    }
    return result;
  };
};

// output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var applyArray = {
  apply: arrayApply,
  Functor0: function() {
    return functorArray;
  }
};
var apply = function(dict) {
  return dict.apply;
};
var applyFirst = function(dictApply) {
  var apply1 = apply(dictApply);
  var map9 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map9($$const)(a))(b);
    };
  };
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map9 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map9($$const(identity2))(a))(b);
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var unless = function(dictApplicative) {
  var pure15 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (!v) {
        return v1;
      }
      ;
      if (v) {
        return pure15(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var when = function(dictApplicative) {
  var pure15 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      ;
      if (!v) {
        return pure15(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  var apply3 = apply(dictApplicative.Apply0());
  var pure15 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply3(pure15(f))(a);
    };
  };
};

// output/Data.Bounded/foreign.js
var topInt = 2147483647;
var bottomInt = -2147483648;
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq4) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq4 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordNumberImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;
var ordArrayImpl = function(f) {
  return function(xs) {
    return function(ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;
      while (i < xlen && i < ylen) {
        var x = xs[i];
        var y = ys[i];
        var o = f(x)(y);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqBooleanImpl = refEq;
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqStringImpl = refEq;
var eqArrayImpl = function(f) {
  return function(xs) {
    return function(ys) {
      if (xs.length !== ys.length)
        return false;
      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i]))
          return false;
      }
      return true;
    };
  };
};

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqRowNil = {
  eqRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return true;
      };
    };
  }
};
var eqRecord = function(dict) {
  return dict.eqRecord;
};
var eqRec = function() {
  return function(dictEqRecord) {
    return {
      eq: eqRecord(dictEqRecord)($$Proxy.value)
    };
  };
};
var eqNumber = {
  eq: eqNumberImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqBoolean = {
  eq: eqBooleanImpl
};
var eq = function(dict) {
  return dict.eq;
};
var eq2 = /* @__PURE__ */ eq(eqBoolean);
var eqArray = function(dictEq) {
  return {
    eq: eqArrayImpl(eq(dictEq))
  };
};
var eqRowCons = function(dictEqRecord) {
  var eqRecord1 = eqRecord(dictEqRecord);
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictEq) {
        var eq32 = eq(dictEq);
        return {
          eqRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = eqRecord1($$Proxy.value)(ra)(rb);
                var key = reflectSymbol2($$Proxy.value);
                var get4 = unsafeGet(key);
                return eq32(get4(ra))(get4(rb)) && tail2;
              };
            };
          }
        };
      };
    };
  };
};
var notEq = function(dictEq) {
  var eq32 = eq(dictEq);
  return function(x) {
    return function(y) {
      return eq2(eq32(x)(y))(false);
    };
  };
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();
var eqOrdering = {
  eq: function(v) {
    return function(v1) {
      if (v instanceof LT && v1 instanceof LT) {
        return true;
      }
      ;
      if (v instanceof GT && v1 instanceof GT) {
        return true;
      }
      ;
      if (v instanceof EQ && v1 instanceof EQ) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/Data.Ring/foreign.js
var numSub = function(n1) {
  return function(n2) {
    return n1 - n2;
  };
};

// output/Data.Semiring/foreign.js
var intAdd = function(x) {
  return function(y) {
    return x + y | 0;
  };
};
var intMul = function(x) {
  return function(y) {
    return x * y | 0;
  };
};
var numAdd = function(n1) {
  return function(n2) {
    return n1 + n2;
  };
};
var numMul = function(n1) {
  return function(n2) {
    return n1 * n2;
  };
};

// output/Data.Semiring/index.js
var zeroRecord = function(dict) {
  return dict.zeroRecord;
};
var zero = function(dict) {
  return dict.zero;
};
var semiringRecordNil = {
  addRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return {};
      };
    };
  },
  mulRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return {};
      };
    };
  },
  oneRecord: function(v) {
    return function(v1) {
      return {};
    };
  },
  zeroRecord: function(v) {
    return function(v1) {
      return {};
    };
  }
};
var semiringNumber = {
  add: numAdd,
  zero: 0,
  mul: numMul,
  one: 1
};
var semiringInt = {
  add: intAdd,
  zero: 0,
  mul: intMul,
  one: 1
};
var oneRecord = function(dict) {
  return dict.oneRecord;
};
var one = function(dict) {
  return dict.one;
};
var mulRecord = function(dict) {
  return dict.mulRecord;
};
var mul = function(dict) {
  return dict.mul;
};
var addRecord = function(dict) {
  return dict.addRecord;
};
var semiringRecord = function() {
  return function(dictSemiringRecord) {
    return {
      add: addRecord(dictSemiringRecord)($$Proxy.value),
      mul: mulRecord(dictSemiringRecord)($$Proxy.value),
      one: oneRecord(dictSemiringRecord)($$Proxy.value)($$Proxy.value),
      zero: zeroRecord(dictSemiringRecord)($$Proxy.value)($$Proxy.value)
    };
  };
};
var add = function(dict) {
  return dict.add;
};
var semiringRecordCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function(dictSemiringRecord) {
      var addRecord1 = addRecord(dictSemiringRecord);
      var mulRecord1 = mulRecord(dictSemiringRecord);
      var oneRecord1 = oneRecord(dictSemiringRecord);
      var zeroRecord1 = zeroRecord(dictSemiringRecord);
      return function(dictSemiring) {
        var add1 = add(dictSemiring);
        var mul1 = mul(dictSemiring);
        var one1 = one(dictSemiring);
        var zero1 = zero(dictSemiring);
        return {
          addRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = addRecord1($$Proxy.value)(ra)(rb);
                var key = reflectSymbol2($$Proxy.value);
                var insert4 = unsafeSet(key);
                var get4 = unsafeGet(key);
                return insert4(add1(get4(ra))(get4(rb)))(tail2);
              };
            };
          },
          mulRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = mulRecord1($$Proxy.value)(ra)(rb);
                var key = reflectSymbol2($$Proxy.value);
                var insert4 = unsafeSet(key);
                var get4 = unsafeGet(key);
                return insert4(mul1(get4(ra))(get4(rb)))(tail2);
              };
            };
          },
          oneRecord: function(v) {
            return function(v1) {
              var tail2 = oneRecord1($$Proxy.value)($$Proxy.value);
              var key = reflectSymbol2($$Proxy.value);
              var insert4 = unsafeSet(key);
              return insert4(one1)(tail2);
            };
          },
          zeroRecord: function(v) {
            return function(v1) {
              var tail2 = zeroRecord1($$Proxy.value)($$Proxy.value);
              var key = reflectSymbol2($$Proxy.value);
              var insert4 = unsafeSet(key);
              return insert4(zero1)(tail2);
            };
          }
        };
      };
    };
  };
};

// output/Data.Ring/index.js
var sub = function(dict) {
  return dict.sub;
};
var ringNumber = {
  sub: numSub,
  Semiring0: function() {
    return semiringNumber;
  }
};
var negate = function(dictRing) {
  var sub1 = sub(dictRing);
  var zero2 = zero(dictRing.Semiring0());
  return function(a) {
    return sub1(zero2)(a);
  };
};

// output/Data.Ord/index.js
var eqRec2 = /* @__PURE__ */ eqRec();
var notEq2 = /* @__PURE__ */ notEq(eqOrdering);
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordRecordNil = {
  compareRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return EQ.value;
      };
    };
  },
  EqRecord0: function() {
    return eqRowNil;
  }
};
var ordNumber = /* @__PURE__ */ function() {
  return {
    compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqNumber;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var compareRecord = function(dict) {
  return dict.compareRecord;
};
var ordRecord = function() {
  return function(dictOrdRecord) {
    var eqRec1 = eqRec2(dictOrdRecord.EqRecord0());
    return {
      compare: compareRecord(dictOrdRecord)($$Proxy.value),
      Eq0: function() {
        return eqRec1;
      }
    };
  };
};
var compare = function(dict) {
  return dict.compare;
};
var compare2 = /* @__PURE__ */ compare(ordInt);
var greaterThan = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(a1) {
    return function(a2) {
      var v = compare3(a1)(a2);
      if (v instanceof GT) {
        return true;
      }
      ;
      return false;
    };
  };
};
var ordArray = function(dictOrd) {
  var compare3 = compare(dictOrd);
  var eqArray3 = eqArray(dictOrd.Eq0());
  return {
    compare: function() {
      var toDelta = function(x) {
        return function(y) {
          var v = compare3(x)(y);
          if (v instanceof EQ) {
            return 0;
          }
          ;
          if (v instanceof LT) {
            return 1;
          }
          ;
          if (v instanceof GT) {
            return -1 | 0;
          }
          ;
          throw new Error("Failed pattern match at Data.Ord (line 79, column 7 - line 82, column 17): " + [v.constructor.name]);
        };
      };
      return function(xs) {
        return function(ys) {
          return compare2(0)(ordArrayImpl(toDelta)(xs)(ys));
        };
      };
    }(),
    Eq0: function() {
      return eqArray3;
    }
  };
};
var ordRecordCons = function(dictOrdRecord) {
  var compareRecord1 = compareRecord(dictOrdRecord);
  var eqRowCons2 = eqRowCons(dictOrdRecord.EqRecord0())();
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      var eqRowCons1 = eqRowCons2(dictIsSymbol);
      return function(dictOrd) {
        var compare3 = compare(dictOrd);
        var eqRowCons22 = eqRowCons1(dictOrd.Eq0());
        return {
          compareRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var key = reflectSymbol2($$Proxy.value);
                var left = compare3(unsafeGet(key)(ra))(unsafeGet(key)(rb));
                var $95 = notEq2(left)(EQ.value);
                if ($95) {
                  return left;
                }
                ;
                return compareRecord1($$Proxy.value)(ra)(rb);
              };
            };
          },
          EqRecord0: function() {
            return eqRowCons22;
          }
        };
      };
    };
  };
};

// output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedInt = {
  top: topInt,
  bottom: bottomInt,
  Ord0: function() {
    return ordInt;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showArrayImpl = function(f) {
  return function(xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

// output/Data.Show/index.js
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};
var showArray = function(dictShow) {
  return {
    show: showArrayImpl(show(dictShow))
  };
};

// output/Data.Maybe/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var map2 = /* @__PURE__ */ map(functorMaybe);
var fromMaybe = function(a) {
  return maybe(a)(identity3);
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};
var eqMaybe = function(dictEq) {
  var eq4 = eq(dictEq);
  return {
    eq: function(x) {
      return function(y) {
        if (x instanceof Nothing && y instanceof Nothing) {
          return true;
        }
        ;
        if (x instanceof Just && y instanceof Just) {
          return eq4(x.value0)(y.value0);
        }
        ;
        return false;
      };
    }
  };
};
var ordMaybe = function(dictOrd) {
  var compare3 = compare(dictOrd);
  var eqMaybe1 = eqMaybe(dictOrd.Eq0());
  return {
    compare: function(x) {
      return function(y) {
        if (x instanceof Nothing && y instanceof Nothing) {
          return EQ.value;
        }
        ;
        if (x instanceof Nothing) {
          return LT.value;
        }
        ;
        if (y instanceof Nothing) {
          return GT.value;
        }
        ;
        if (x instanceof Just && y instanceof Just) {
          return compare3(x.value0)(y.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqMaybe1;
    }
  };
};
var applyMaybe = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return map2(v.value0)(v1);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var bindMaybe = {
  bind: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Apply0: function() {
    return applyMaybe;
  }
};

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler2(error2) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error2) {
      setTimeout(function() {
        throw error2;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error2) {
      return left(error2);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error2) {
      k(left(error2))();
      return nonCanceler2;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size !== 0) {
        size--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size) % limit] = cb;
        size++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill3(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill3(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error2) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status2 = SUSPENDED;
    var step = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run4(localRunTick) {
      var tmp, result, attempt2;
      while (true) {
        tmp = null;
        result = null;
        attempt2 = null;
        switch (status2) {
          case STEP_BIND:
            status2 = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status2 = RETURN;
              fail2 = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status2 = RETURN;
              fail2 = step;
              step = null;
            } else if (bhead === null) {
              status2 = RETURN;
            } else {
              status2 = STEP_BIND;
              step = util.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status2 = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status2 = RETURN;
                  step = util.right(step._1);
                } else {
                  status2 = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status2 = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;
              case ASYNC:
                status2 = PENDING;
                step = runAsync(util.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status2 = STEP_RESULT;
                      step = result2;
                      run4(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status2 = RETURN;
                fail2 = util.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status2 = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status2 = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status2 = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util.right(tmp);
                break;
              case SEQ:
                status2 = CONTINUE;
                step = sequential3(util, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status2 = COMPLETED;
              step = interrupt || fail2 || step;
            } else {
              tmp = attempts._3;
              attempt2 = attempts._1;
              attempts = attempts._2;
              switch (attempt2.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status2 = RETURN;
                  } else if (fail2) {
                    status2 = CONTINUE;
                    step = attempt2._2(util.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status2 = RETURN;
                  } else {
                    bhead = attempt2._1;
                    btail = attempt2._2;
                    status2 = STEP_BIND;
                    step = util.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt2._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status2 = CONTINUE;
                      step = attempt2._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status2 = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt2._1.killed(util.fromLeft(interrupt))(attempt2._2);
                  } else if (fail2) {
                    step = attempt2._1.failed(util.fromLeft(fail2))(attempt2._2);
                  } else {
                    step = attempt2._1.completed(util.fromRight(step))(attempt2._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status2 = CONTINUE;
                  step = attempt2._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status2 = RETURN;
                  step = attempt2._1;
                  fail2 = attempt2._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util.fromLeft(fail2);
              }, 0);
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status2 = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join4) {
      return function() {
        if (status2 === COMPLETED) {
          rethrow = rethrow && join4.rethrow;
          join4.handler(step)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join4;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill3(error2, cb) {
      return function() {
        if (status2 === COMPLETED) {
          cb(util.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(void 0));
          }
        })();
        switch (status2) {
          case SUSPENDED:
            interrupt = util.left(error2);
            status2 = COMPLETED;
            step = interrupt;
            run4(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              if (status2 === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error2)), attempts, interrupt);
              }
              status2 = RETURN;
              step = null;
              fail2 = null;
              run4(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              status2 = RETURN;
              step = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join3(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status2 === SUSPENDED) {
          run4(runTick);
        }
        return canceler;
      };
    }
    return {
      kill: kill3,
      join: join3,
      onComplete,
      isSuspended: function() {
        return status2 === SUSPENDED;
      },
      run: function() {
        if (status2 === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run4(runTick);
            });
          } else {
            run4(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill3(error2, par2, cb2) {
      var step = par2;
      var head3 = null;
      var tail2 = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error2, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head3 === null) {
                break loop;
              }
              step = head3._2;
              if (tail2 === null) {
                head3 = null;
              } else {
                head3 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head3) {
                tail2 = new Aff2(CONS, head3, tail2);
              }
              head3 = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join3(result, head3, tail2) {
      var fail2, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail2 = result;
        step = null;
      } else {
        step = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head3 === null) {
            cb(fail2 || step)();
            return;
          }
          if (head3._3 !== EMPTY) {
            return;
          }
          switch (head3.tag) {
            case MAP:
              if (fail2 === null) {
                head3._3 = util.right(head3._1(util.fromRight(step)));
                step = head3._3;
              } else {
                head3._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head3._1._3;
              rhs = head3._2._3;
              if (fail2) {
                head3._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill3(early, fail2 === lhs ? head3._2 : head3._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(fail2, null, null);
                    } else {
                      join3(fail2, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head3._3 = step;
              }
              break;
            case ALT:
              lhs = head3._1._3;
              rhs = head3._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail2 = step === lhs ? rhs : lhs;
                step = null;
                head3._3 = fail2;
              } else {
                head3._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill3(early, step === lhs ? head3._2 : head3._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(step, null, null);
                    } else {
                      join3(step, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head3 = null;
          } else {
            head3 = tail2._1;
            tail2 = tail2._2;
          }
        }
    }
    function resolve(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join3(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run4() {
      var status2 = CONTINUE;
      var step = par;
      var head3 = null;
      var tail2 = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status2) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status2 = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head3, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head3 === null) {
                break loop;
              }
              if (head3._1 === EMPTY) {
                head3._1 = step;
                status2 = CONTINUE;
                step = head3._2;
                head3._2 = EMPTY;
              } else {
                head3._2 = step;
                step = head3;
                if (tail2 === null) {
                  head3 = null;
                } else {
                  head3 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error2, cb2) {
      interrupt = util.left(error2);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill3(error2, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler2;
          };
        });
      };
    }
    run4();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential3(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler2;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _catchError(aff) {
  return function(k) {
    return Aff.Catch(aff, k);
  };
}
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
function _fork(immediate) {
  return function(aff) {
    return Aff.Fork(immediate, aff);
  };
}
var _liftEffect = Aff.Sync;
function _parAffMap(f) {
  return function(aff) {
    return Aff.ParMap(f, aff);
  };
}
function _parAffApply(aff1) {
  return function(aff2) {
    return Aff.ParApply(aff1, aff2);
  };
}
function _parAffAlt(aff1) {
  return function(aff2) {
    return Aff.ParAlt(aff1, aff2);
  };
}
var makeAff = Aff.Async;
function _makeFiber(util, aff) {
  return function() {
    return Aff.Fiber(util, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output/Control.Bind/foreign.js
var arrayBind = function(arr) {
  return function(f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

// output/Control.Bind/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var discard = function(dict) {
  return dict.discard;
};
var bindArray = {
  bind: arrayBind,
  Apply0: function() {
    return applyArray;
  }
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};
var join = function(dictBind) {
  var bind15 = bind(dictBind);
  return function(m) {
    return bind15(m)(identity4);
  };
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind8 = bind(dictMonad.Bind1());
  var pure8 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind8(f)(function(f$prime) {
        return bind8(a)(function(a$prime) {
          return pure8(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Data.Monoid/index.js
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var monoidArray = {
  mempty: [],
  Semigroup0: function() {
    return semigroupArray;
  }
};
var mempty = function(dict) {
  return dict.mempty;
};

// output/Effect/index.js
var $runtime_lazy = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

// output/Effect.Exception/foreign.js
function showErrorImpl(err) {
  return err.stack || err.toString();
}
function error(msg) {
  return new Error(msg);
}
function message(e) {
  return e.message;
}

// output/Effect.Exception/index.js
var showError = {
  show: showErrorImpl
};

// output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};
var catchError = function(dict) {
  return dict.catchError;
};
var $$try = function(dictMonadError) {
  var catchError1 = catchError(dictMonadError);
  var Monad0 = dictMonadError.MonadThrow0().Monad0();
  var map9 = map(Monad0.Bind1().Apply0().Functor0());
  var pure8 = pure(Monad0.Applicative0());
  return function(a) {
    return catchError1(map9(Right.create)(a))(function($52) {
      return pure8(Left.create($52));
    });
  };
};

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// output/Effect.Ref/foreign.js
var _new = function(val) {
  return function() {
    return { value: val };
  };
};
var read = function(ref) {
  return function() {
    return ref.value;
  };
};
var write = function(val) {
  return function(ref) {
    return function() {
      ref.value = val;
    };
  };
};

// output/Effect.Ref/index.js
var $$new = _new;

// output/Control.Monad.Rec.Class/index.js
var Loop = /* @__PURE__ */ function() {
  function Loop2(value0) {
    this.value0 = value0;
  }
  ;
  Loop2.create = function(value0) {
    return new Loop2(value0);
  };
  return Loop2;
}();
var Done = /* @__PURE__ */ function() {
  function Done2(value0) {
    this.value0 = value0;
  }
  ;
  Done2.create = function(value0) {
    return new Done2(value0);
  };
  return Done2;
}();
var tailRecM = function(dict) {
  return dict.tailRecM;
};
var untilJust = function(dictMonadRec) {
  var tailRecM1 = tailRecM(dictMonadRec);
  var mapFlipped3 = mapFlipped(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
  return function(m) {
    return tailRecM1(function(v) {
      return mapFlipped3(m)(function(v1) {
        if (v1 instanceof Nothing) {
          return new Loop(unit);
        }
        ;
        if (v1 instanceof Just) {
          return new Done(v1.value0);
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 179, column 43 - line 181, column 19): " + [v1.constructor.name]);
      });
    })(unit);
  };
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Control.Monad.ST.Global/index.js
var toEffect = unsafeCoerce2;

// output/Control.Monad.ST.Internal/foreign.js
var map_ = function(f) {
  return function(a) {
    return function() {
      return f(a());
    };
  };
};
function newSTRef(val) {
  return function() {
    return { value: val };
  };
}
var read2 = function(ref) {
  return function() {
    return ref.value;
  };
};
var modifyImpl2 = function(f) {
  return function(ref) {
    return function() {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};
var write2 = function(a) {
  return function(ref) {
    return function() {
      return ref.value = a;
    };
  };
};

// output/Control.Monad.ST.Internal/index.js
var modify$prime = modifyImpl2;
var modify = function(f) {
  return modify$prime(function(s) {
    var s$prime = f(s);
    return {
      state: s$prime,
      value: s$prime
    };
  });
};
var functorST = {
  map: map_
};

// output/Data.HeytingAlgebra/foreign.js
var boolConj = function(b1) {
  return function(b2) {
    return b1 && b2;
  };
};
var boolDisj = function(b1) {
  return function(b2) {
    return b1 || b2;
  };
};
var boolNot = function(b) {
  return !b;
};

// output/Data.HeytingAlgebra/index.js
var tt = function(dict) {
  return dict.tt;
};
var not = function(dict) {
  return dict.not;
};
var disj = function(dict) {
  return dict.disj;
};
var heytingAlgebraBoolean = {
  ff: false,
  tt: true,
  implies: function(a) {
    return function(b) {
      return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
  },
  conj: boolConj,
  disj: boolDisj,
  not: boolNot
};
var conj = function(dict) {
  return dict.conj;
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var uncurry = function(f) {
  return function(v) {
    return f(v.value0)(v.value1);
  };
};
var snd = function(v) {
  return v.value1;
};
var functorTuple = {
  map: function(f) {
    return function(m) {
      return new Tuple(m.value0, f(m.value1));
    };
  }
};
var fst = function(v) {
  return v.value0;
};

// output/Control.Monad.State.Class/index.js
var state = function(dict) {
  return dict.state;
};
var put = function(dictMonadState) {
  var state1 = state(dictMonadState);
  return function(s) {
    return state1(function(v) {
      return new Tuple(unit, s);
    });
  };
};
var modify_ = function(dictMonadState) {
  var state1 = state(dictMonadState);
  return function(f) {
    return state1(function(s) {
      return new Tuple(unit, f(s));
    });
  };
};
var gets = function(dictMonadState) {
  var state1 = state(dictMonadState);
  return function(f) {
    return state1(function(s) {
      return new Tuple(f(s), s);
    });
  };
};
var get = function(dictMonadState) {
  return state(dictMonadState)(function(s) {
    return new Tuple(s, s);
  });
};

// output/Control.Monad.Trans.Class/index.js
var lift = function(dict) {
  return dict.lift;
};

// output/Effect.Class/index.js
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Control.Monad.Writer.Class/index.js
var tell = function(dict) {
  return dict.tell;
};
var pass = function(dict) {
  return dict.pass;
};
var listen = function(dict) {
  return dict.listen;
};

// output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var wrap = function() {
  return coerce2;
};
var unwrap = function() {
  return coerce2;
};
var unwrap1 = /* @__PURE__ */ unwrap();
var un = function() {
  return function(v) {
    return unwrap1;
  };
};
var over = function() {
  return function() {
    return function(v) {
      return coerce2;
    };
  };
};
var alaF = function() {
  return function() {
    return function() {
      return function() {
        return function(v) {
          return coerce2;
        };
      };
    };
  };
};

// output/Control.Monad.Writer.Trans/index.js
var WriterT = function(x) {
  return x;
};
var runWriterT = function(v) {
  return v;
};
var mapWriterT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorWriterT = function(dictFunctor) {
  var map9 = map(dictFunctor);
  return {
    map: function(f) {
      return mapWriterT(map9(function(v) {
        return new Tuple(f(v.value0), v.value1);
      }));
    }
  };
};
var execWriterT = function(dictFunctor) {
  var map9 = map(dictFunctor);
  return function(v) {
    return map9(snd)(v);
  };
};
var applyWriterT = function(dictSemigroup) {
  var append2 = append(dictSemigroup);
  return function(dictApply) {
    var apply3 = apply(dictApply);
    var Functor0 = dictApply.Functor0();
    var map9 = map(Functor0);
    var functorWriterT1 = functorWriterT(Functor0);
    return {
      apply: function(v) {
        return function(v1) {
          var k = function(v3) {
            return function(v4) {
              return new Tuple(v3.value0(v4.value0), append2(v3.value1)(v4.value1));
            };
          };
          return apply3(map9(k)(v))(v1);
        };
      },
      Functor0: function() {
        return functorWriterT1;
      }
    };
  };
};
var bindWriterT = function(dictSemigroup) {
  var append2 = append(dictSemigroup);
  var applyWriterT1 = applyWriterT(dictSemigroup);
  return function(dictBind) {
    var bind8 = bind(dictBind);
    var Apply0 = dictBind.Apply0();
    var map9 = map(Apply0.Functor0());
    var applyWriterT2 = applyWriterT1(Apply0);
    return {
      bind: function(v) {
        return function(k) {
          return bind8(v)(function(v1) {
            var v2 = k(v1.value0);
            return map9(function(v3) {
              return new Tuple(v3.value0, append2(v1.value1)(v3.value1));
            })(v2);
          });
        };
      },
      Apply0: function() {
        return applyWriterT2;
      }
    };
  };
};
var applicativeWriterT = function(dictMonoid) {
  var mempty3 = mempty(dictMonoid);
  var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
  return function(dictApplicative) {
    var pure8 = pure(dictApplicative);
    var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
    return {
      pure: function(a) {
        return pure8(new Tuple(a, mempty3));
      },
      Apply0: function() {
        return applyWriterT2;
      }
    };
  };
};
var monadWriterT = function(dictMonoid) {
  var applicativeWriterT1 = applicativeWriterT(dictMonoid);
  var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
  return function(dictMonad) {
    var applicativeWriterT2 = applicativeWriterT1(dictMonad.Applicative0());
    var bindWriterT22 = bindWriterT1(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeWriterT2;
      },
      Bind1: function() {
        return bindWriterT22;
      }
    };
  };
};
var monadTellWriterT = function(dictMonoid) {
  var Semigroup0 = dictMonoid.Semigroup0();
  var monadWriterT1 = monadWriterT(dictMonoid);
  return function(dictMonad) {
    var monadWriterT22 = monadWriterT1(dictMonad);
    return {
      tell: function() {
        var $252 = pure(dictMonad.Applicative0());
        var $253 = Tuple.create(unit);
        return function($254) {
          return WriterT($252($253($254)));
        };
      }(),
      Semigroup0: function() {
        return Semigroup0;
      },
      Monad1: function() {
        return monadWriterT22;
      }
    };
  };
};
var monadWriterWriterT = function(dictMonoid) {
  var monadTellWriterT1 = monadTellWriterT(dictMonoid);
  return function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure8 = pure(dictMonad.Applicative0());
    var monadTellWriterT22 = monadTellWriterT1(dictMonad);
    return {
      listen: function(v) {
        return bind8(v)(function(v1) {
          return pure8(new Tuple(new Tuple(v1.value0, v1.value1), v1.value1));
        });
      },
      pass: function(v) {
        return bind8(v)(function(v1) {
          return pure8(new Tuple(v1.value0.value0, v1.value0.value1(v1.value1)));
        });
      },
      Monoid0: function() {
        return dictMonoid;
      },
      MonadTell1: function() {
        return monadTellWriterT22;
      }
    };
  };
};

// output/Control.Parallel.Class/index.js
var sequential = function(dict) {
  return dict.sequential;
};
var parallel = function(dict) {
  return dict.parallel;
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Data.Bifunctor/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var bimap = function(dict) {
  return dict.bimap;
};
var lmap = function(dictBifunctor) {
  var bimap1 = bimap(dictBifunctor);
  return function(f) {
    return bimap1(f)(identity5);
  };
};
var bifunctorEither = {
  bimap: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return new Left(v(v2.value0));
        }
        ;
        if (v2 instanceof Right) {
          return new Right(v1(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  }
};

// output/Data.Monoid.Conj/index.js
var Conj = function(x) {
  return x;
};
var semigroupConj = function(dictHeytingAlgebra) {
  var conj2 = conj(dictHeytingAlgebra);
  return {
    append: function(v) {
      return function(v1) {
        return conj2(v)(v1);
      };
    }
  };
};
var monoidConj = function(dictHeytingAlgebra) {
  var semigroupConj1 = semigroupConj(dictHeytingAlgebra);
  return {
    mempty: tt(dictHeytingAlgebra),
    Semigroup0: function() {
      return semigroupConj1;
    }
  };
};

// output/Data.Foldable/index.js
var alaF2 = /* @__PURE__ */ alaF()()()();
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond3 = applySecond(dictApplicative.Apply0());
  var pure8 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(f) {
      return foldr22(function($454) {
        return applySecond3(f($454));
      })(pure8(unit));
    };
  };
};
var for_ = function(dictApplicative) {
  var traverse_1 = traverse_(dictApplicative);
  return function(dictFoldable) {
    return flip(traverse_1(dictFoldable));
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate = function(dictFoldable) {
  var foldl22 = foldl(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(v1) {
            if (v.init) {
              return {
                init: false,
                acc: v1
              };
            }
            ;
            return {
              init: false,
              acc: append2(v.acc)(append2(sep)(v1))
            };
          };
        };
        return foldl22(go)({
          init: true,
          acc: mempty3
        })(xs).acc;
      };
    };
  };
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append2(f(x))(acc);
        };
      })(mempty3);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};
var all = function(dictFoldable) {
  var foldMap2 = foldMap(dictFoldable);
  return function(dictHeytingAlgebra) {
    return alaF2(Conj)(foldMap2(monoidConj(dictHeytingAlgebra)));
  };
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply3) {
    return function(map9) {
      return function(pure8) {
        return function(f) {
          return function(array) {
            function go(bot, top3) {
              switch (top3 - bot) {
                case 0:
                  return pure8([]);
                case 1:
                  return map9(array1)(f(array[bot]));
                case 2:
                  return apply3(map9(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply3(apply3(map9(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                  return apply3(map9(concat2)(go(bot, pivot)))(go(pivot, top3));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity6 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse2 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse2(dictApplicative)(identity6);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};
var $$for = function(dictApplicative) {
  return function(dictTraversable) {
    var traverse2 = traverse(dictTraversable)(dictApplicative);
    return function(x) {
      return function(f) {
        return traverse2(f)(x);
      };
    };
  };
};

// output/Control.Parallel/index.js
var identity7 = /* @__PURE__ */ identity(categoryFn);
var parTraverse_ = function(dictParallel) {
  var sequential3 = sequential(dictParallel);
  var traverse_2 = traverse_(dictParallel.Applicative1());
  var parallel3 = parallel(dictParallel);
  return function(dictFoldable) {
    var traverse_1 = traverse_2(dictFoldable);
    return function(f) {
      var $48 = traverse_1(function($50) {
        return parallel3(f($50));
      });
      return function($49) {
        return sequential3($48($49));
      };
    };
  };
};
var parTraverse = function(dictParallel) {
  var sequential3 = sequential(dictParallel);
  var Applicative1 = dictParallel.Applicative1();
  var parallel3 = parallel(dictParallel);
  return function(dictTraversable) {
    var traverse2 = traverse(dictTraversable)(Applicative1);
    return function(f) {
      var $51 = traverse2(function($53) {
        return parallel3(f($53));
      });
      return function($52) {
        return sequential3($51($52));
      };
    };
  };
};
var parSequence_ = function(dictParallel) {
  var parTraverse_1 = parTraverse_(dictParallel);
  return function(dictFoldable) {
    return parTraverse_1(dictFoldable)(identity7);
  };
};

// output/Data.Time.Duration/index.js
var over2 = /* @__PURE__ */ over()();
var negate2 = /* @__PURE__ */ negate(ringNumber);
var identity8 = /* @__PURE__ */ identity(categoryFn);
var Milliseconds = function(x) {
  return x;
};
var toDuration = function(dict) {
  return dict.toDuration;
};
var semigroupMilliseconds = {
  append: function(v) {
    return function(v1) {
      return v + v1;
    };
  }
};
var ordMilliseconds = ordNumber;
var fromDuration = function(dict) {
  return dict.fromDuration;
};
var negateDuration = function(dictDuration) {
  var $57 = toDuration(dictDuration);
  var $58 = over2(Milliseconds)(negate2);
  var $59 = fromDuration(dictDuration);
  return function($60) {
    return $57($58($59($60)));
  };
};
var durationMilliseconds = {
  fromDuration: identity8,
  toDuration: identity8
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Effect.Aff/index.js
var $runtime_lazy2 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var map3 = /* @__PURE__ */ map(functorEffect);
var Canceler = function(x) {
  return x;
};
var functorParAff = {
  map: _parAffMap
};
var functorAff = {
  map: _map
};
var forkAff = /* @__PURE__ */ _fork(true);
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    ;
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    ;
    if (v instanceof Right) {
      return false;
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var launchAff_ = function($74) {
  return $$void2(launchAff($74));
};
var delay = function(v) {
  return _delay(Right.create, v);
};
var applyParAff = {
  apply: _parAffApply,
  Functor0: function() {
    return functorParAff;
  }
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var pure2 = /* @__PURE__ */ pure(applicativeAff);
var bind1 = /* @__PURE__ */ bind(bindAff);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
var effectCanceler = function($75) {
  return Canceler($$const(liftEffect2($75)));
};
var joinFiber = function(v) {
  return makeAff(function(k) {
    return map3(effectCanceler)(v.join(k));
  });
};
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var monadErrorAff = {
  catchError: _catchError,
  MonadThrow0: function() {
    return monadThrowAff;
  }
};
var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
var attempt = $$try2;
var runAff = function(k) {
  return function(aff) {
    return launchAff(bindFlipped2(function($80) {
      return liftEffect2(k($80));
    })($$try2(aff)));
  };
};
var runAff_ = function(k) {
  return function(aff) {
    return $$void2(runAff(k)(aff));
  };
};
var parallelAff = {
  parallel: unsafeCoerce2,
  sequential: _sequential,
  Monad0: function() {
    return monadAff;
  },
  Applicative1: function() {
    return $lazy_applicativeParAff(0);
  }
};
var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
  return {
    pure: function() {
      var $82 = parallel(parallelAff);
      return function($83) {
        return $82(pure2($83));
      };
    }(),
    Apply0: function() {
      return applyParAff;
    }
  };
});
var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
var semigroupCanceler = {
  append: function(v) {
    return function(v1) {
      return function(err) {
        return parSequence_2([v(err), v1(err)]);
      };
    };
  }
};
var monadRecAff = {
  tailRecM: function(k) {
    var go = function(a) {
      return bind1(k(a))(function(res) {
        if (res instanceof Done) {
          return pure2(res.value0);
        }
        ;
        if (res instanceof Loop) {
          return go(res.value0);
        }
        ;
        throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
      });
    };
    return go;
  },
  Monad0: function() {
    return monadAff;
  }
};
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));
var monoidCanceler = {
  mempty: nonCanceler,
  Semigroup0: function() {
    return semigroupCanceler;
  }
};
var altParAff = {
  alt: _parAffAlt,
  Functor0: function() {
    return functorParAff;
  }
};

// output/Control.Monad.State.Trans/index.js
var monadTransStateT = {
  lift: function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure8 = pure(dictMonad.Applicative0());
    return function(m) {
      return function(s) {
        return bind8(m)(function(x) {
          return pure8(new Tuple(x, s));
        });
      };
    };
  }
};
var lift3 = /* @__PURE__ */ lift(monadTransStateT);
var functorStateT = function(dictFunctor) {
  var map9 = map(dictFunctor);
  return {
    map: function(f) {
      return function(v) {
        return function(s) {
          return map9(function(v1) {
            return new Tuple(f(v1.value0), v1.value1);
          })(v(s));
        };
      };
    }
  };
};
var execStateT = function(dictFunctor) {
  var map9 = map(dictFunctor);
  return function(v) {
    return function(s) {
      return map9(snd)(v(s));
    };
  };
};
var monadStateT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeStateT(dictMonad);
    },
    Bind1: function() {
      return bindStateT(dictMonad);
    }
  };
};
var bindStateT = function(dictMonad) {
  var bind8 = bind(dictMonad.Bind1());
  return {
    bind: function(v) {
      return function(f) {
        return function(s) {
          return bind8(v(s))(function(v1) {
            var v3 = f(v1.value0);
            return v3(v1.value1);
          });
        };
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var applyStateT = function(dictMonad) {
  var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadStateT(dictMonad)),
    Functor0: function() {
      return functorStateT1;
    }
  };
};
var applicativeStateT = function(dictMonad) {
  var pure8 = pure(dictMonad.Applicative0());
  return {
    pure: function(a) {
      return function(s) {
        return pure8(new Tuple(a, s));
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var monadStateStateT = function(dictMonad) {
  var pure8 = pure(dictMonad.Applicative0());
  var monadStateT1 = monadStateT(dictMonad);
  return {
    state: function(f) {
      return function($200) {
        return pure8(f($200));
      };
    },
    Monad0: function() {
      return monadStateT1;
    }
  };
};
var monadTellStateT = function(dictMonadTell) {
  var Monad1 = dictMonadTell.Monad1();
  var Semigroup0 = dictMonadTell.Semigroup0();
  var monadStateT1 = monadStateT(Monad1);
  return {
    tell: function() {
      var $201 = lift3(Monad1);
      var $202 = tell(dictMonadTell);
      return function($203) {
        return $201($202($203));
      };
    }(),
    Semigroup0: function() {
      return Semigroup0;
    },
    Monad1: function() {
      return monadStateT1;
    }
  };
};
var monadWriterStateT = function(dictMonadWriter) {
  var MonadTell1 = dictMonadWriter.MonadTell1();
  var Monad1 = MonadTell1.Monad1();
  var bind8 = bind(Monad1.Bind1());
  var listen2 = listen(dictMonadWriter);
  var pure8 = pure(Monad1.Applicative0());
  var pass2 = pass(dictMonadWriter);
  var Monoid0 = dictMonadWriter.Monoid0();
  var monadTellStateT1 = monadTellStateT(MonadTell1);
  return {
    listen: function(m) {
      return function(s) {
        return bind8(listen2(m(s)))(function(v) {
          return pure8(new Tuple(new Tuple(v.value0.value0, v.value1), v.value0.value1));
        });
      };
    },
    pass: function(m) {
      return function(s) {
        return pass2(bind8(m(s))(function(v) {
          return pure8(new Tuple(new Tuple(v.value0.value0, v.value1), v.value0.value1));
        }));
      };
    },
    Monoid0: function() {
      return Monoid0;
    },
    MonadTell1: function() {
      return monadTellStateT1;
    }
  };
};

// output/Effect.Aff.Class/index.js
var liftAff = function(dict) {
  return dict.liftAff;
};

// output/Node.Stream.Object/foreign.js
import Stream from "stream";
var DEBUG = process.env["NODEJS_OBJECT_STREAM_TRACE"] !== "";
var log = (m) => DEBUG ? console.log(m) : void 0;
var chainCount = 0;
var composeCount = 0;
var neverCount = 0;
var onceCount = 0;
var bindCount = 0;
var zipCount = 0;
var mapCount = 0;
var constCount = 0;
var fromPromiseCount = 0;
var Never = class extends Stream.Readable {
  constructor() {
    super({ objectMode: true });
    this.id = neverCount++;
  }
  _read() {
    log(`Never {id: ${this.id}}#_read()`);
    log(`  this.push(null)`);
    this.push(null);
  }
};
var Once = class extends Stream.Duplex {
  /** @param {T} a */
  constructor(a) {
    super({ objectMode: true });
    this.a = a;
    this.id = onceCount++;
    this.push(this.a);
    this.push(null);
    log(`Once {id: ${this.id}}#new()`);
    log(`  this.push(${a})`);
    log(`  this.push(null)`);
  }
  _write(_ck, _enc, cb) {
    cb();
  }
  _read() {
    log(`Once {id: ${this.id}}#_read()`);
  }
};
var Const = class extends Stream.Transform {
  /** @param {T} a */
  constructor(a) {
    super({ objectMode: true });
    this.a = a;
    this.id = constCount++;
  }
  /** @type {Stream.Transform['_transform']} */
  _transform(_c, _enc, cb) {
    log(`Const {id: ${this.id}}#_transform(${_c}, _, _)`);
    log(`  cb(${this.a})`);
    this.push(this.a);
    cb();
  }
};
var FromPromise = class extends Stream.Readable {
  /** @param {Promise<T>} p */
  constructor(p) {
    super({ objectMode: true });
    this.id = fromPromiseCount++;
    p.then((a) => {
      log(`FromPromise {id: ${this.id}}#new()`);
      log(`  ...p.then(...)`);
      log(`    this.push(${a})`);
      log(`    this.push(null)`);
      this.push(a);
      this.push(null);
    }).catch((e) => {
      log(`FromPromise {id: ${this.id}}#new()`);
      log(`  ...p.catch(...)`);
      log(`    this.destroy(${e})`);
      this.destroy(e);
    });
  }
  _read() {
    log(`FromPromise {id: ${this.id}}#_read()`);
  }
};
var Chain = class extends Stream.Readable {
  /** @param {...Stream.Readable} streams */
  constructor(...streams) {
    super({ objectMode: true });
    this.id = chainCount++;
    this.ix = -1;
    this.streams = streams;
    this.next();
    if (this.streams[this.ix]) {
      this.streams[this.ix].pause();
    }
  }
  next() {
    log(`Chain {id: ${this.id}}#next()`);
    this.ix++;
    if (this.ix === this.streams.length) {
      log(`  this.push(null)`);
      this.push(null);
    } else {
      const cur = this.streams[this.ix];
      cur.once("error", (e) => {
        log(`Chain {id: ${this.id}}#next()`);
        log(`  cur.once('error', ...)`);
        log(`    this.destroy(${e})`);
        this.destroy(e);
      });
      cur.once("end", () => {
        log(`Chain {id: ${this.id}}#next()`);
        log(`  cur.once('end', ...)`);
        log(`    this.next()`);
        this.next();
      });
      cur.on("data", (ck) => {
        log(`Chain {id: ${this.id}}#next()`);
        log(`  cur.on('data', ...)`);
        log(`    this.push(${ck})`);
        const canPush = this.push(ck);
        if (cur && !canPush) {
          log(`    cur.pause()`);
          cur.pause();
        }
      });
      const prev = this.streams[this.ix - 1];
      if (prev && prev.isPaused()) {
        cur.pause();
      }
    }
  }
  _read() {
    log(`Chain {id: ${this.id}}#_read()`);
    this.streams.forEach((s) => {
      if (s.isPaused()) {
        log(`  s.resume()`);
        s.resume();
      }
    });
  }
};
var Map = class extends Stream.Transform {
  /** @param {(t: T) => R} f */
  constructor(f) {
    super({ objectMode: true });
    this.f = f;
    this.id = mapCount++;
  }
  /** @type {Stream.Transform['_transform']} */
  _transform(ck, _, cb) {
    log(`Map {id: ${this.id}}#_transform(${ck}, _, _)`);
    const r = this.f(ck);
    log(`  const r = (${r})`);
    log(`  cb(null, ${r})`);
    cb(null, r);
  }
};
var Zip = class extends Stream.Readable {
  /** @type {Array<Stream.Readable>} */
  streams = [];
  /** @type {Array<unknown | null>} */
  buf = [];
  /** @param {...Stream.Readable} streams */
  constructor(...streams) {
    super({ objectMode: true });
    this.id = zipCount++;
    log(`Zip {id: ${this.id}}#new()`);
    log(`  this.streams = Array {streams: ${streams.length}}`);
    this.streams = streams;
    this.streams.forEach((s, ix) => {
      log(`  this.streams[${ix}].once('error', ...)`);
      log(`  this.streams[${ix}].once('end', ...)`);
      log(`  this.streams[${ix}].once('data', ...)`);
      s.once("error", (e) => this.destroy(e));
      s.once("end", () => this.push(null));
      s.on("data", (ck) => {
        log(`Zip {id: ${this.id}}#new()`);
        log(`  this.streams[${ix}].once('data', ...)`);
        log(`    this.bufput(${ix}, ${ck})`);
        log(`    stream.pause()`);
        this.bufput(ix, ck);
        s.pause();
      });
      s.pause();
    });
  }
  /** @type {(ix: number, val: unknown) => boolean} */
  bufput(ix, val) {
    log(`Zip {id: ${this.id}}#bufput(${ix}, ${val})`);
    const bufstr = JSON.stringify(this.buf.map((a) => a === null ? "null" : ".."));
    log(`  this.buf = ${bufstr}`);
    this.buf[ix] = val;
    if (!this.isWaiting()) {
      log(`  this.push(${bufstr})`);
      const canPush = this.push(this.buf);
      this.bufinit();
      if (canPush) {
        log(`  this.streams.forEach(s => s.resume())`);
        this.streams.forEach((s) => s.resume());
      }
      return canPush;
    } else {
      return true;
    }
  }
  bufinit() {
    const nuls = this.streams.map(() => null);
    log(`  this.buf = ${JSON.stringify(nuls)}`);
    this.buf = nuls;
  }
  isWaiting() {
    return this.buf.some((a) => a === null);
  }
  _read() {
    log(`Zip {id: ${this.id}}#_read()`);
    this.streams.forEach((s) => {
      if (s.isPaused()) {
        s.resume();
      }
    });
  }
};
var Compose2 = class extends Stream.Duplex {
  /**
   * @param {Stream.Readable | Stream.Transform} a
   * @param {Stream.Transform} b
   */
  constructor(a, b) {
    super({ objectMode: true });
    this.id = composeCount++;
    this.a = a;
    this.b = b;
    log(`Compose {id: ${this.id}}#new()`);
    log(`  a.on('data', ...)`);
    log(`  a.once('end', ...)`);
    log(`  a.once('error', ...)`);
    log(`  a.pause()`);
    log(`  b.on('drain', ...)`);
    log(`  b.on('data', ...)`);
    log(`  b.on('error', ...)`);
    log(`  b.on('finish', ...)`);
    this.a.once("end", () => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  a.on('end', ...)`);
      log(`    b.end()`);
      this.b.end();
    });
    this.a.on("data", (ck) => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  a.on('data', ...)`);
      log(`    b.write(${ck})`);
      const canWrite = this.b.write(ck);
      if (!canWrite) {
        log(`    a.pause()`);
        this.a.pause();
      }
    });
    this.a.once("error", (e) => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  a.once('error', ...)`);
      log(`    this.destroy(${e})`);
      this.destroy(e);
      this.b.destroy(e);
    });
    this.b.on("drain", () => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  b.on('drain', ...)`);
      log(`    this.a.resume()`);
      this.a.resume();
    });
    this.b.on("data", (ck) => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  b.on('data', ...)`);
      log(`    this.push(${ck})`);
      const canPush = this.push(ck);
      if (!canPush) {
        log(`    b.pause()`);
        this.b.pause();
      }
    });
    this.b.once("end", () => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  b.once('end', ...)`);
      log(`    this.push(null)`);
      this.push(null);
    });
    this.b.once("error", (e) => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  b.once('error', ...)`);
      log(`    this.destroy(${e})`);
      this.destroy(e);
      this.a.destroy(e);
    });
    this.b.once("finish", () => {
      log(`Compose {id: ${this.id}}#new()`);
      log(`  b.once('finish', ...)`);
      log(`    this.emit('finish')`);
      this.emit("finish");
    });
  }
  _read() {
    log(`Compose {id: ${this.id}}#_read()`);
    if (this.b.isPaused()) {
      log(`  b.resume()`);
      this.b.resume();
    }
  }
  /** @type {Stream.Duplex['_write']} */
  _write(ck, _enc, cb) {
    log(`Compose {id: ${this.id}}#_write(${ck}, _, _)`);
    if (this.a instanceof Stream.Readable) {
      throw new Error("Cannot `write` to a Readable stream");
    }
    log(`  this.a.write(${ck}, _, _)`);
    this.a.write(ck, _enc, cb);
  }
};
var Bind = class extends Stream.Duplex {
  /**
   * @param {(t: T) => () => Stream.Readable} f
   */
  constructor(f) {
    super({ objectMode: true });
    this.f = f;
    this.id = bindCount++;
    this.cur = void 0;
    this.streams = [];
    this.done = false;
  }
  /** @type {NonNullable<Stream.Duplex['_final']>} */
  _final(cb) {
    log(`Bind {id: ${this.id}}#_final(_)`);
    this.done = true;
    cb();
  }
  initcur() {
    log(`Bind {id: ${this.id}}#initcur()`);
    if (!this.cur) {
      this.cur = this.streams[0];
    }
    const s = this.cur;
    log(`  s.on('data', ...)`);
    s.on("data", (ck) => {
      log(`Bind {id: ${this.id}}#initcur()`);
      log(`  s.on('data', ...)`);
      log(`    this.push(${ck})`);
      const canPush = this.push(ck);
      if (!canPush) {
        s.pause();
      }
    });
    log(`  s.once('end', ...)`);
    s.once("end", () => {
      log(`Bind {id: ${this.id}}#initcur()`);
      log(`  s.once('end', ...)`);
      log(`  this.streams.shift()`);
      this.streams.shift();
      if (this.streams.length > 0) {
        log(`  this.cur = this.streams[0]`);
        this.cur = this.streams[0];
        log(`  this.initcur()`);
        this.initcur();
      } else if (this.done) {
        log(`  this.push(null)`);
        this.push(null);
      } else {
        log(`  this.cur = undefined`);
        this.cur = void 0;
      }
    });
  }
  /** @type {Stream.Duplex['_write']} */
  _write(ck, _, cb) {
    log(`Bind {id: ${this.id}}#_write(${ck}, _, _)`);
    try {
      log(`  this.streams = ${JSON.stringify(this.streams.map((_2) => "Readable"))}`);
      this.streams.push(this.f(ck)());
      log(`  this.initcur()`);
      this.initcur();
      log(`  cb()`);
      cb();
    } catch (e) {
      log(`  cb(${e})`);
      cb(e);
    }
  }
  /** @type {Stream.Duplex['_read']} */
  _read() {
    log(`Bind {id: ${this.id}}#_read()`);
    if (this.cur && this.cur.isPaused()) {
      log(`  this.cur.resume()`);
      this.cur.resume();
    }
  }
};
var neverImpl = () => new Never();
var onceImpl = (a) => () => new Once(a);
var fromPromiseImpl = (a) => () => new FromPromise(a());
var chainImpl = (ss) => () => new Chain(...ss);
var mapImpl = (f) => () => new Map(f);
var applyImpl = (iab) => (ia) => () => new Compose2(new Zip(iab, ia), new Map(([ab, a]) => ab(a)));
var bindImpl = (f) => () => new Bind(f);
var pipeImpl = (a) => (b) => () => new Compose2(a, b);
process.on("beforeExit", () => {
  debugger;
});

// output/Control.Promise/foreign.js
function promise(f) {
  return function() {
    return new Promise(function(success, error2) {
      var succF = function(s) {
        return function() {
          return success(s);
        };
      };
      var failF = function(s) {
        return function() {
          return error2(s);
        };
      };
      try {
        f(succF)(failF)();
      } catch (e) {
        error2(e);
      }
    });
  };
}

// output/Data.FunctorWithIndex/foreign.js
var mapWithIndexArray = function(f) {
  return function(xs) {
    var l = xs.length;
    var result = Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(i)(xs[i]);
    }
    return result;
  };
};

// output/Data.FunctorWithIndex/index.js
var mapWithIndex = function(dict) {
  return dict.mapWithIndex;
};
var functorWithIndexArray = {
  mapWithIndex: mapWithIndexArray,
  Functor0: function() {
    return functorArray;
  }
};

// output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust5) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe2 = f(value);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust5(maybe2);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust5) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value = fromJust5(maybe2);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/index.js
var fromJust2 = /* @__PURE__ */ fromJust();
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
};

// output/Data.Unfoldable/index.js
var fromJust3 = /* @__PURE__ */ fromJust();
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton2 = function(dictPlus) {
  var empty5 = empty(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty5);
  };
};
var functorNonEmpty = function(dictFunctor) {
  var map22 = map(dictFunctor);
  return {
    map: function(f) {
      return function(m) {
        return new NonEmpty(f(m.value0), map22(f)(m.value1));
      };
    }
  };
};
var foldableNonEmpty = function(dictFoldable) {
  var foldMap2 = foldMap(dictFoldable);
  var foldl3 = foldl(dictFoldable);
  var foldr3 = foldr(dictFoldable);
  return {
    foldMap: function(dictMonoid) {
      var append15 = append(dictMonoid.Semigroup0());
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        return function(v) {
          return append15(f(v.value0))(foldMap12(f)(v.value1));
        };
      };
    },
    foldl: function(f) {
      return function(b) {
        return function(v) {
          return foldl3(f)(f(b)(v.value0))(v.value1);
        };
      };
    },
    foldr: function(f) {
      return function(b) {
        return function(v) {
          return f(v.value0)(foldr3(f)(b)(v.value1));
        };
      };
    }
  };
};

// output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil2() {
  }
  ;
  Nil2.value = new Nil2();
  return Nil2;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons2.create = function(value0) {
    return function(value1) {
      return new Cons2(value0, value1);
    };
  };
  return Cons2;
}();
var NonEmptyList = function(x) {
  return x;
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
          $tco_var_v = new Cons(v1, v);
          $copy_v1 = v1.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
            return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
          }
          ;
          if (v2 instanceof Cons && v2.value1 instanceof Nil) {
            return new Cons(f(v2.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v2) {
          return function($copy_v3) {
            var $tco_var_v2 = $copy_v2;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v2, v3) {
              if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                $tco_var_v2 = v2.value1;
                $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                return;
              }
              ;
              $tco_done1 = true;
              return v3;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(v)(unrolledMap(v1));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $284 = foldl(foldableList)(flip(f))(b);
      return function($285) {
        return $284(rev($285));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $286 = append2(acc);
        return function($287) {
          return $286(f($287));
        };
      })(mempty3);
    };
  }
};
var foldr2 = /* @__PURE__ */ foldr(foldableList);
var foldableNonEmptyList = /* @__PURE__ */ foldableNonEmpty(foldableList);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr2(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();

// output/Foreign/foreign.js
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};

// output/Data.Number/foreign.js
var isFiniteImpl = isFinite;
var round = Math.round;

// output/Data.Int/index.js
var top2 = /* @__PURE__ */ top(boundedInt);
var bottom2 = /* @__PURE__ */ bottom(boundedInt);
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();
var unsafeClamp = function(x) {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  ;
  if (x >= toNumber(top2)) {
    return top2;
  }
  ;
  if (x <= toNumber(bottom2)) {
    return bottom2;
  }
  ;
  if (otherwise) {
    return fromMaybe(0)(fromNumber(x));
  }
  ;
  throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
};
var round2 = function($37) {
  return unsafeClamp(round($37));
};

// output/Data.List/index.js
var fromFoldable = function(dictFoldable) {
  return foldr(dictFoldable)(Cons.create)(Nil.value);
};

// output/Data.List.NonEmpty/index.js
var singleton3 = /* @__PURE__ */ function() {
  var $200 = singleton2(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();
var fromList = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just(new NonEmpty(v.value0, v.value1));
  }
  ;
  throw new Error("Failed pattern match at Data.List.NonEmpty (line 121, column 1 - line 121, column 57): " + [v.constructor.name]);
};
var fromFoldable2 = function(dictFoldable) {
  var $219 = fromFoldable(dictFoldable);
  return function($220) {
    return fromList($219($220));
  };
};

// output/Control.Promise/index.js
var fromAff = function(aff) {
  return promise(function(succ2) {
    return function(err) {
      return runAff_(either(err)(succ2))(aff);
    };
  });
};

// output/Data.Array/foreign.js
var replicateFill = function(count, value) {
  if (count < 1) {
    return [];
  }
  var result = new Array(count);
  return result.fill(value);
};
var replicatePolyfill = function(count, value) {
  var result = [];
  var n = 0;
  for (var i = 0; i < count; i++) {
    result[n++] = value;
  }
  return result;
};
var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons2(head3, tail2) {
    this.head = head3;
    this.tail = tail2;
  }
  var emptyList = {};
  function curryCons(head3) {
    return function(tail2) {
      return new Cons2(head3, tail2);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr3, xs) {
    return listToArray(foldr3(curryCons)(emptyList)(xs));
  };
}();
var indexImpl = function(just, nothing, xs, i) {
  return i < 0 || i >= xs.length ? nothing : just(xs[i]);
};
var concat = function(xss) {
  if (xss.length <= 1e4) {
    return Array.prototype.concat.apply([], xss);
  }
  var result = [];
  for (var i = 0, l = xss.length; i < l; i++) {
    var xs = xss[i];
    for (var j = 0, m = xs.length; j < m; j++) {
      result.push(xs[j]);
    }
  }
  return result;
};
var sortByImpl = function() {
  function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
    if (to - mid > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare3(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare3, fromOrdering, xs) {
    var out;
    if (xs.length < 2)
      return xs;
    out = xs.slice(0);
    mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
    return out;
  };
}();

// output/Data.Array.ST/foreign.js
function newSTArray() {
  return [];
}
function unsafeFreezeThawImpl(xs) {
  return xs;
}
var unsafeFreezeImpl = unsafeFreezeThawImpl;
var sortByImpl2 = function() {
  function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
    if (to - mid > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare3(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare3, fromOrdering, xs) {
    if (xs.length < 2)
      return xs;
    mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
    return xs;
  };
}();
var pushImpl = function(a, xs) {
  return xs.push(a);
};

// output/Control.Monad.ST.Uncurried/foreign.js
var runSTFn1 = function runSTFn12(fn) {
  return function(a) {
    return function() {
      return fn(a);
    };
  };
};
var runSTFn2 = function runSTFn22(fn) {
  return function(a) {
    return function(b) {
      return function() {
        return fn(a, b);
      };
    };
  };
};

// output/Data.Array.ST/index.js
var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
var push = /* @__PURE__ */ runSTFn2(pushImpl);

// output/Data.Array.ST.Iterator/index.js
var map4 = /* @__PURE__ */ map(functorST);
var not2 = /* @__PURE__ */ not(heytingAlgebraBoolean);
var $$void3 = /* @__PURE__ */ $$void(functorST);
var Iterator = /* @__PURE__ */ function() {
  function Iterator2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Iterator2.create = function(value0) {
    return function(value1) {
      return new Iterator2(value0, value1);
    };
  };
  return Iterator2;
}();
var peek = function(v) {
  return function __do() {
    var i = read2(v.value1)();
    return v.value0(i);
  };
};
var next = function(v) {
  return function __do() {
    var i = read2(v.value1)();
    modify(function(v1) {
      return v1 + 1 | 0;
    })(v.value1)();
    return v.value0(i);
  };
};
var pushWhile = function(p) {
  return function(iter) {
    return function(array) {
      return function __do() {
        var $$break = newSTRef(false)();
        while (map4(not2)(read2($$break))()) {
          (function __do2() {
            var mx = peek(iter)();
            if (mx instanceof Just && p(mx.value0)) {
              push(mx.value0)(array)();
              return $$void3(next(iter))();
            }
            ;
            return $$void3(write2(true)($$break))();
          })();
        }
        ;
        return {};
      };
    };
  };
};
var iterator = function(f) {
  return map4(Iterator.create(f))(newSTRef(0));
};
var iterate = function(iter) {
  return function(f) {
    return function __do() {
      var $$break = newSTRef(false)();
      while (map4(not2)(read2($$break))()) {
        (function __do2() {
          var mx = next(iter)();
          if (mx instanceof Just) {
            return f(mx.value0)();
          }
          ;
          if (mx instanceof Nothing) {
            return $$void3(write2(true)($$break))();
          }
          ;
          throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
        })();
      }
      ;
      return {};
    };
  };
};

// output/Data.Function.Uncurried/foreign.js
var runFn2 = function(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
};
var runFn4 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

// output/Data.Array/index.js
var $$void4 = /* @__PURE__ */ $$void(functorST);
var singleton5 = function(a) {
  return [a];
};
var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
var index2 = /* @__PURE__ */ function() {
  return runFn4(indexImpl)(Just.create)(Nothing.value);
}();
var head = function(xs) {
  return index2(xs)(0);
};
var groupBy2 = function(op) {
  return function(xs) {
    return function __do() {
      var result = newSTArray();
      var iter = iterator(function(v) {
        return index2(xs)(v);
      })();
      iterate(iter)(function(x) {
        return $$void4(function __do2() {
          var sub1 = newSTArray();
          push(x)(sub1)();
          pushWhile(op(x))(iter)(sub1)();
          var grp = unsafeFreeze(sub1)();
          return push(grp)(result)();
        });
      })();
      return unsafeFreeze(result)();
    }();
  };
};
var fromFoldable3 = function(dictFoldable) {
  return runFn2(fromFoldableImpl)(foldr(dictFoldable));
};
var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
var mapMaybe2 = function(f) {
  return concatMap(function() {
    var $189 = maybe([])(singleton5);
    return function($190) {
      return $189(f($190));
    };
  }());
};

// output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};

// output/Node.EventEmitter/foreign.js
var unsafeOff = (emitter, eventName, cb) => emitter.off(eventName, cb);
var unsafeOn = (emitter, eventName, cb) => emitter.on(eventName, cb);

// output/Node.EventEmitter/index.js
var EventHandle = /* @__PURE__ */ function() {
  function EventHandle2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  EventHandle2.create = function(value0) {
    return function(value1) {
      return new EventHandle2(value0, value1);
    };
  };
  return EventHandle2;
}();
var subscribeSameFunction = function(onXFn, eventEmitter, eventName, jsCb) {
  onXFn(eventEmitter, eventName, jsCb);
  return function() {
    return unsafeOff(eventEmitter, eventName, jsCb);
  };
};
var on = function(v) {
  return function(psCb) {
    return function(eventEmitter) {
      return function() {
        return subscribeSameFunction(unsafeOn, eventEmitter, v.value0, v.value1(psCb));
      };
    };
  };
};

// output/Node.Stream.Object/index.js
var wrap2 = /* @__PURE__ */ wrap();
var bind2 = /* @__PURE__ */ bind(bindEffect);
var join2 = /* @__PURE__ */ join(bindEffect);
var apply2 = /* @__PURE__ */ apply(applyEffect);
var pure3 = /* @__PURE__ */ pure(applicativeEffect);
var unwrap2 = /* @__PURE__ */ unwrap();
var identity9 = /* @__PURE__ */ identity(categoryFn);
var bind12 = /* @__PURE__ */ bind(bindAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var discard2 = /* @__PURE__ */ discard(discardUnit);
var discard1 = /* @__PURE__ */ discard2(bindAff);
var untilJust2 = /* @__PURE__ */ untilJust(monadRecAff);
var pure1 = /* @__PURE__ */ pure(applicativeAff);
var $$void5 = /* @__PURE__ */ $$void(functorST);
var map5 = /* @__PURE__ */ map(functorEffect);
var functorObjectStream = {
  map: function(ab) {
    return function(v) {
      return wrap2(join2(apply2(apply2(pure3(pipeImpl))(v))(mapImpl(ab))));
    };
  }
};
var applyObjectStream = {
  apply: function(v) {
    return function(v1) {
      return wrap2(join2(apply2(apply2(pure3(applyImpl))(v))(v1)));
    };
  },
  Functor0: function() {
    return functorObjectStream;
  }
};
var bindObjectStream = {
  bind: function(v) {
    return function(asb) {
      return wrap2(function __do() {
        var sia = v();
        var sab = bindImpl(function($61) {
          return unwrap2(asb($61));
        })();
        return pipeImpl(sia)(sab)();
      });
    };
  },
  Apply0: function() {
    return applyObjectStream;
  }
};
var once = function($62) {
  return wrap2(onceImpl($62));
};
var applicativeObjectStream = {
  pure: once,
  Apply0: function() {
    return applyObjectStream;
  }
};
var monadObjectStream = {
  Applicative0: function() {
    return applicativeObjectStream;
  },
  Bind1: function() {
    return bindObjectStream;
  }
};
var monadEffectObjectStreamUn = {
  liftEffect: /* @__PURE__ */ function() {
    var $63 = flip(bind2)(onceImpl);
    return function($64) {
      return wrap2($63($64));
    };
  }(),
  Monad0: function() {
    return monadObjectStream;
  }
};
var monadAffObjectStreamUnit = {
  liftAff: function($65) {
    return wrap2(fromPromiseImpl(fromAff($65)));
  },
  MonadEffect0: function() {
    return monadEffectObjectStreamUn;
  }
};
var never = /* @__PURE__ */ wrap2(neverImpl);
var errorH = /* @__PURE__ */ function() {
  return new EventHandle("error", mkEffectFn1);
}();
var endH = /* @__PURE__ */ function() {
  return new EventHandle("end", identity9);
}();
var dataH = /* @__PURE__ */ function() {
  return new EventHandle("data", mkEffectFn1);
}();
var run3 = function(v) {
  return bind12(liftEffect3(toEffect(newSTRef(0))))(function(runningCount) {
    return bind12(liftEffect3(toEffect(newSTArray)))(function(values) {
      return bind12(liftEffect3(v))(function(s) {
        return makeAff(function(res) {
          var onError = function(e) {
            return res(new Left(e));
          };
          var onEnd = launchAff_(discard1(untilJust2(discard1(delay(wrap2(1)))(function() {
            return bind12(liftEffect3(toEffect(read2(runningCount))))(function(running) {
              return pure1(function() {
                var $60 = running === 0;
                if ($60) {
                  return new Just(unit);
                }
                ;
                return Nothing.value;
              }());
            });
          })))(function() {
            return bind12(liftEffect3(toEffect(unsafeFreeze(values))))(function(values$prime) {
              return liftEffect3(res(new Right(values$prime)));
            });
          }));
          var onData = function(a) {
            return toEffect(function __do() {
              $$void5(modify(function(v1) {
                return v1 + 1 | 0;
              })(runningCount))();
              $$void5(push(a)(values))();
              return $$void5(modify(function(v1) {
                return v1 - 1 | 0;
              })(runningCount))();
            });
          };
          return function __do() {
            var cancelData = on(dataH)(onData)(s)();
            var cancelError = on(errorH)(onError)(s)();
            var cancelEnd = on(endH)(onEnd)(s)();
            return effectCanceler(function __do2() {
              cancelData();
              cancelError();
              return cancelEnd();
            });
          };
        });
      });
    });
  });
};
var chainMany = function(dictTraversable) {
  var fromFoldable1 = fromFoldable3(dictTraversable.Foldable1());
  var traverse2 = traverse(dictTraversable)(applicativeEffect);
  return function(as$prime) {
    return wrap2(function __do() {
      var as = map5(fromFoldable1)(traverse2(unwrap2)(as$prime))();
      return chainImpl(as)();
    });
  };
};
var fromFoldable4 = function(dictTraversable) {
  var $68 = chainMany(dictTraversable);
  var $69 = map(dictTraversable.Functor0())(once);
  return function($70) {
    return $68($69($70));
  };
};

// output/Effect.AVar/foreign.js
var AVar = function() {
  function MutableQueue() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }
  function MutableCell(queue, value) {
    this.queue = queue;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
  function AVar2(value) {
    this.draining = false;
    this.error = null;
    this.value = value;
    this.takes = new MutableQueue();
    this.reads = new MutableQueue();
    this.puts = new MutableQueue();
  }
  var EMPTY = {};
  function runEff(eff) {
    try {
      eff();
    } catch (error2) {
      setTimeout(function() {
        throw error2;
      }, 0);
    }
  }
  function putLast(queue, value) {
    var cell = new MutableCell(queue, value);
    switch (queue.size) {
      case 0:
        queue.head = cell;
        break;
      case 1:
        cell.prev = queue.head;
        queue.head.next = cell;
        queue.last = cell;
        break;
      default:
        cell.prev = queue.last;
        queue.last.next = cell;
        queue.last = cell;
    }
    queue.size++;
    return cell;
  }
  function takeLast(queue) {
    var cell;
    switch (queue.size) {
      case 0:
        return null;
      case 1:
        cell = queue.head;
        queue.head = null;
        break;
      case 2:
        cell = queue.last;
        queue.head.next = null;
        queue.last = null;
        break;
      default:
        cell = queue.last;
        queue.last = cell.prev;
        queue.last.next = null;
    }
    cell.prev = null;
    cell.queue = null;
    queue.size--;
    return cell.value;
  }
  function takeHead(queue) {
    var cell;
    switch (queue.size) {
      case 0:
        return null;
      case 1:
        cell = queue.head;
        queue.head = null;
        break;
      case 2:
        cell = queue.head;
        queue.last.prev = null;
        queue.head = queue.last;
        queue.last = null;
        break;
      default:
        cell = queue.head;
        queue.head = cell.next;
        queue.head.prev = null;
    }
    cell.next = null;
    cell.queue = null;
    queue.size--;
    return cell.value;
  }
  function deleteCell(cell) {
    if (cell.queue === null) {
      return;
    }
    if (cell.queue.last === cell) {
      takeLast(cell.queue);
      return;
    }
    if (cell.queue.head === cell) {
      takeHead(cell.queue);
      return;
    }
    if (cell.prev) {
      cell.prev.next = cell.next;
    }
    if (cell.next) {
      cell.next.prev = cell.prev;
    }
    cell.queue.size--;
    cell.queue = null;
    cell.value = null;
    cell.next = null;
    cell.prev = null;
  }
  function drainVar(util, avar) {
    if (avar.draining) {
      return;
    }
    var ps = avar.puts;
    var ts = avar.takes;
    var rs = avar.reads;
    var p, r, t, value, rsize;
    avar.draining = true;
    while (1) {
      p = null;
      r = null;
      t = null;
      value = avar.value;
      rsize = rs.size;
      if (avar.error !== null) {
        value = util.left(avar.error);
        while (p = takeHead(ps)) {
          runEff(p.cb(value));
        }
        while (r = takeHead(rs)) {
          runEff(r(value));
        }
        while (t = takeHead(ts)) {
          runEff(t(value));
        }
        break;
      }
      if (value === EMPTY && (p = takeHead(ps))) {
        avar.value = value = p.value;
      }
      if (value !== EMPTY) {
        t = takeHead(ts);
        while (rsize-- && (r = takeHead(rs))) {
          runEff(r(util.right(value)));
        }
        if (t !== null) {
          avar.value = EMPTY;
          runEff(t(util.right(value)));
        }
      }
      if (p !== null) {
        runEff(p.cb(util.right(void 0)));
      }
      if (avar.value === EMPTY && ps.size === 0 || avar.value !== EMPTY && ts.size === 0) {
        break;
      }
    }
    avar.draining = false;
  }
  AVar2.EMPTY = EMPTY;
  AVar2.putLast = putLast;
  AVar2.takeLast = takeLast;
  AVar2.takeHead = takeHead;
  AVar2.deleteCell = deleteCell;
  AVar2.drainVar = drainVar;
  return AVar2;
}();
function empty2() {
  return new AVar(AVar.EMPTY);
}
function _killVar(util, error2, avar) {
  return function() {
    if (avar.error === null) {
      avar.error = error2;
      avar.value = AVar.EMPTY;
      AVar.drainVar(util, avar);
    }
  };
}
function _putVar(util, value, avar, cb) {
  return function() {
    var cell = AVar.putLast(avar.puts, { cb, value });
    AVar.drainVar(util, avar);
    return function() {
      AVar.deleteCell(cell);
    };
  };
}
function _takeVar(util, avar, cb) {
  return function() {
    var cell = AVar.putLast(avar.takes, cb);
    AVar.drainVar(util, avar);
    return function() {
      AVar.deleteCell(cell);
    };
  };
}

// output/Effect.AVar/index.js
var Killed = /* @__PURE__ */ function() {
  function Killed2(value0) {
    this.value0 = value0;
  }
  ;
  Killed2.create = function(value0) {
    return new Killed2(value0);
  };
  return Killed2;
}();
var Filled = /* @__PURE__ */ function() {
  function Filled2(value0) {
    this.value0 = value0;
  }
  ;
  Filled2.create = function(value0) {
    return new Filled2(value0);
  };
  return Filled2;
}();
var Empty = /* @__PURE__ */ function() {
  function Empty2() {
  }
  ;
  Empty2.value = new Empty2();
  return Empty2;
}();
var ffiUtil2 = /* @__PURE__ */ function() {
  return {
    left: Left.create,
    right: Right.create,
    nothing: Nothing.value,
    just: Just.create,
    killed: Killed.create,
    filled: Filled.create,
    empty: Empty.value
  };
}();
var kill = function(err) {
  return function(avar) {
    return _killVar(ffiUtil2, err, avar);
  };
};
var put2 = function(value) {
  return function(avar) {
    return function(cb) {
      return _putVar(ffiUtil2, value, avar, cb);
    };
  };
};
var take3 = function(avar) {
  return function(cb) {
    return _takeVar(ffiUtil2, avar, cb);
  };
};

// output/Effect.Aff.AVar/index.js
var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
var take4 = function(avar) {
  return makeAff(function(k) {
    return function __do() {
      var c = take3(avar)(k)();
      return effectCanceler(c);
    };
  });
};
var put3 = function(value) {
  return function(avar) {
    return makeAff(function(k) {
      return function __do() {
        var c = put2(value)(avar)(k)();
        return effectCanceler(c);
      };
    });
  };
};
var kill2 = function(error2) {
  var $10 = kill(error2);
  return function($11) {
    return liftEffect4($10($11));
  };
};
var empty3 = /* @__PURE__ */ liftEffect4(empty2);

// output/Control.Monad.State/index.js
var execState = function(v) {
  return function(s) {
    var v1 = v(s);
    return v1.value1;
  };
};

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head3, tail2) {
    this.head = head3;
    this.tail = tail2;
  };
  function finalCell(head3) {
    return new ConsCell(head3, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply3, map9, f) {
    var buildFrom = function(x, ys) {
      return apply3(map9(consList)(f(x)))(ys);
    };
    var go = function(acc, currentLen, xs) {
      if (currentLen === 0) {
        return acc;
      } else {
        var last3 = xs[currentLen - 1];
        return new Cont(function() {
          var built = go(buildFrom(last3, acc), currentLen - 1, xs);
          return built;
        });
      }
    };
    return function(array) {
      var acc = map9(finalCell)(f(array[array.length - 1]));
      var result = go(acc, array.length - 1, array);
      while (result instanceof Cont) {
        result = result.fn();
      }
      return map9(listToArray)(result);
    };
  };
}();

// output/Data.Array.NonEmpty/index.js
var fromJust4 = /* @__PURE__ */ fromJust();
var toArray = function(v) {
  return v;
};
var adaptMaybe = function(f) {
  return function($126) {
    return fromJust4(f(toArray($126)));
  };
};
var head2 = /* @__PURE__ */ adaptMaybe(head);

// output/Test.Spec.Tree/index.js
var indexIsSymbol = {
  reflectSymbol: function() {
    return "index";
  }
};
var nameIsSymbol = {
  reflectSymbol: function() {
    return "name";
  }
};
var append12 = /* @__PURE__ */ append(semigroupArray);
var un2 = /* @__PURE__ */ un();
var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
var eq12 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqBoolean));
var all3 = /* @__PURE__ */ all(foldableArray)(heytingAlgebraBoolean);
var bind3 = /* @__PURE__ */ bind(bindMaybe);
var applicativeStateT2 = /* @__PURE__ */ applicativeStateT(monadIdentity);
var for_2 = /* @__PURE__ */ for_(applicativeStateT2)(foldableArray);
var modify_2 = /* @__PURE__ */ modify_(/* @__PURE__ */ monadStateStateT(monadIdentity));
var $$for2 = /* @__PURE__ */ $$for(applicativeStateT2)(traversableArray);
var Node = /* @__PURE__ */ function() {
  function Node3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Node3.create = function(value0) {
    return function(value1) {
      return new Node3(value0, value1);
    };
  };
  return Node3;
}();
var Leaf = /* @__PURE__ */ function() {
  function Leaf3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Leaf3.create = function(value0) {
    return function(value1) {
      return new Leaf3(value0, value1);
    };
  };
  return Leaf3;
}();
var PathItem = function(x) {
  return x;
};
var Item = function(x) {
  return x;
};
var pathItemOrd = /* @__PURE__ */ ordRecord()(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(ordRecordNil)()(nameIsSymbol)(/* @__PURE__ */ ordMaybe(ordString)))()(indexIsSymbol)(ordInt));
var pathItemEq = /* @__PURE__ */ eqRec()(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(eqRowNil)()(nameIsSymbol)(/* @__PURE__ */ eqMaybe(eqString)))()(indexIsSymbol)(eqInt));
var parentSuiteName = /* @__PURE__ */ mapMaybe2(/* @__PURE__ */ function() {
  var $223 = un2(PathItem);
  return function($224) {
    return function(v) {
      return v.name;
    }($223($224));
  };
}());
var itemEq = {
  eq: function(v) {
    return function(v1) {
      return v.isFocused === v1.isFocused && eq12(v.isParallelizable)(v1.isParallelizable);
    };
  }
};
var eq22 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(itemEq));
var isAllParallelizable = function(v) {
  if (v instanceof Node) {
    return all3(isAllParallelizable)(v.value1);
  }
  ;
  if (v instanceof Leaf) {
    return eq22(v.value1)(Nothing.value) || eq12(bind3(v.value1)(function() {
      var $226 = un2(Item);
      return function($227) {
        return function(v1) {
          return v1.isParallelizable;
        }($226($227));
      };
    }()))(new Just(true));
  }
  ;
  throw new Error("Failed pattern match at Test.Spec.Tree (line 134, column 23 - line 136, column 82): " + [v.constructor.name]);
};
var filterTree = function(f) {
  return function(v) {
    if (v instanceof Node) {
      var v1 = mapMaybe2(filterTree(f))(v.value1);
      if (v1.length === 0) {
        return Nothing.value;
      }
      ;
      return new Just(new Node(v.value0, v1));
    }
    ;
    if (v instanceof Leaf) {
      if (f(v.value0)(v.value1)) {
        return new Just(new Leaf(v.value0, v.value1));
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
    }
    ;
    throw new Error("Failed pattern match at Test.Spec.Tree (line 115, column 16 - line 123, column 27): " + [v.constructor.name]);
  };
};
var filterTrees = function(f) {
  return mapMaybe2(filterTree(f));
};
var discardUnfocused = function(ts) {
  var isFocused = function(v2) {
    return function(v1) {
      if (v1 instanceof Just) {
        return v1.value0.isFocused;
      }
      ;
      if (v1 instanceof Nothing) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Test.Spec.Tree (line 147, column 5 - line 147, column 46): " + [v2.constructor.name, v1.constructor.name]);
    };
  };
  var v = filterTrees(isFocused)(ts);
  if (v.length === 0) {
    return ts;
  }
  ;
  return v;
};
var countTests = function(g) {
  var go = function(v) {
    if (v instanceof Node) {
      return for_2(v.value1)(go);
    }
    ;
    if (v instanceof Leaf) {
      return modify_2(function(v1) {
        return v1 + 1 | 0;
      });
    }
    ;
    throw new Error("Failed pattern match at Test.Spec.Tree (line 129, column 3 - line 129, column 30): " + [v.constructor.name]);
  };
  return execState($$for2(g)(go))(0);
};
var annotateWithPaths = /* @__PURE__ */ function() {
  var go = function(path) {
    return function(index3) {
      return function(v) {
        if (v instanceof Node) {
          var name2 = either(Just.create)($$const(Nothing.value))(v.value0);
          var nextPath = append12(path)([{
            index: index3,
            name: name2
          }]);
          return new Node(lmap2(function(v1) {
            return new Tuple(v1, path);
          })(v.value0), mapWithIndex2(go(nextPath))(v.value1));
        }
        ;
        if (v instanceof Leaf) {
          return new Leaf(new Tuple(v.value0, path), v.value1);
        }
        ;
        throw new Error("Failed pattern match at Test.Spec.Tree (line 96, column 21 - line 104, column 33): " + [v.constructor.name]);
      };
    };
  };
  return mapWithIndex2(go([]));
}();

// output/Test.Spec/index.js
var over3 = /* @__PURE__ */ over()();
var monadTellWriterT2 = /* @__PURE__ */ monadTellWriterT(monoidArray);
var map6 = /* @__PURE__ */ map(functorTuple);
var un3 = /* @__PURE__ */ un();
var bindWriterT2 = /* @__PURE__ */ bindWriterT(semigroupArray);
var SpecT = function(x) {
  return x;
};
var exampleMUnit = {
  evaluateExample: function(t) {
    return function(around$prime) {
      return around$prime(function(v) {
        return t;
      });
    };
  }
};
var evaluateExample = function(dict) {
  return dict.evaluateExample;
};
var it = function(dictMonad) {
  var tell2 = tell(monadTellWriterT2(dictMonad));
  return function(dictExample) {
    var evaluateExample1 = evaluateExample(dictExample);
    return function(name2) {
      return function(test) {
        return tell2([new Leaf(name2, new Just({
          isParallelizable: Nothing.value,
          isFocused: false,
          example: evaluateExample1(test)
        }))]);
      };
    };
  };
};
var describe = function(dictMonad) {
  var map32 = map(dictMonad.Bind1().Apply0().Functor0());
  return function(name2) {
    return over3(SpecT)(mapWriterT(map32(map6(function(group3) {
      return [new Node(new Left(name2), group3)];
    }))));
  };
};
var collect2 = function(dictFunctor) {
  var $237 = map(dictFunctor)(discardUnfocused);
  var $238 = execWriterT(dictFunctor);
  var $239 = un3(SpecT);
  return function($240) {
    return $237($238($239($240)));
  };
};
var bindSpecT = function(dictBind) {
  return bindWriterT2(dictBind);
};

// output/Test.Spec.Assertions/index.js
var fail = function(dictMonadThrow) {
  var $98 = throwError(dictMonadThrow);
  return function($99) {
    return $98(error($99));
  };
};
var shouldEqual = function(dictMonadThrow) {
  var when5 = when(dictMonadThrow.Monad0().Applicative0());
  var fail1 = fail(dictMonadThrow);
  return function(dictShow) {
    var show5 = show(dictShow);
    return function(dictEq) {
      var notEq3 = notEq(dictEq);
      return function(v1) {
        return function(v2) {
          return when5(notEq3(v1)(v2))(fail1(show5(v1) + (" \u2260 " + show5(v2))));
        };
      };
    };
  };
};

// output/Test.Node.Stream.Object/index.js
var describe2 = /* @__PURE__ */ describe(monadIdentity);
var discard3 = /* @__PURE__ */ discard(discardUnit);
var discard12 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindSpecT(bindIdentity));
var it2 = /* @__PURE__ */ it(monadIdentity)(exampleMUnit);
var bind4 = /* @__PURE__ */ bind(bindAff);
var shouldEqual2 = /* @__PURE__ */ shouldEqual(monadThrowAff);
var showArray2 = /* @__PURE__ */ showArray(showInt);
var eqArray2 = /* @__PURE__ */ eqArray(eqInt);
var shouldEqual1 = /* @__PURE__ */ shouldEqual2(showArray2)(eqArray2);
var chainMany2 = /* @__PURE__ */ chainMany(traversableArray);
var liftAff2 = /* @__PURE__ */ liftAff(monadAffObjectStreamUnit);
var discard22 = /* @__PURE__ */ discard3(bindAff);
var wrap3 = /* @__PURE__ */ wrap();
var pure4 = /* @__PURE__ */ pure(applicativeAff);
var fromFoldable5 = /* @__PURE__ */ fromFoldable4(traversableArray);
var shouldEqual22 = /* @__PURE__ */ shouldEqual2(/* @__PURE__ */ showArray(showArray2))(/* @__PURE__ */ eqArray(eqArray2));
var bind13 = /* @__PURE__ */ bind(bindObjectStream);
var pure12 = /* @__PURE__ */ pure(applicativeObjectStream);
var spec = /* @__PURE__ */ describe2("Node.Stream.Object")(/* @__PURE__ */ describe2("ObjectStream")(/* @__PURE__ */ discard12(/* @__PURE__ */ describe2("once")(/* @__PURE__ */ it2("emits once")(/* @__PURE__ */ bind4(/* @__PURE__ */ run3(/* @__PURE__ */ once(1)))(function(out) {
  return shouldEqual1(out)([1]);
}))))(function() {
  return discard12(describe2("never")(it2("immediately closes")(bind4(run3(never))(function(out) {
    return shouldEqual1(out)([]);
  }))))(function() {
    return discard12(describe2("chain")(discard12(it2("noops")(bind4(run3(chainMany2([])))(function(out) {
      return shouldEqual1(out)([]);
    })))(function() {
      return discard12(it2("works with 1 stream")(bind4(run3(chainMany2([once(1)])))(function(out) {
        return shouldEqual1(out)([1]);
      })))(function() {
        return discard12(it2("works with 2 streams")(bind4(run3(chainMany2([once(1), once(2)])))(function(out) {
          return shouldEqual1(out)([1, 2]);
        })))(function() {
          return it2("does not emit end until last child stream ends")(function() {
            var delayed = function(n) {
              return function(a) {
                return liftAff2(discard22(delay(wrap3(n)))(function() {
                  return pure4(a);
                }));
              };
            };
            return bind4(run3(chainMany2([delayed(10)(1), delayed(20)(2)])))(function(out) {
              return shouldEqual1(out)([1, 2]);
            });
          }());
        });
      });
    })))(function() {
      return describe2("fromFoldable")(discard12(it2("creates an empty readable")(bind4(run3(fromFoldable5([])))(function(out) {
        return shouldEqual22(out)([]);
      })))(function() {
        return discard12(it2("creates a readable that emits each element")(bind4(run3(fromFoldable5([1, 2, 3])))(function(out) {
          return shouldEqual1(out)([1, 2, 3]);
        })))(function() {
          return discard12(it2("bind maps each number")(bind4(run3(bind13(fromFoldable5([1, 2, 3]))(function(a) {
            return pure12(a + 1 | 0);
          })))(function(out) {
            return shouldEqual1(out)([2, 3, 4]);
          })))(function() {
            return it2("bind fans out")(bind4(run3(bind13(fromFoldable5([1, 2, 3]))(function(a) {
              return fromFoldable5([a * 10 | 0, a * 20 | 0]);
            })))(function(out) {
              return shouldEqual1(out)([10, 20, 20, 40, 30, 60]);
            }));
          });
        });
      }));
    });
  });
})));

// output/Test.Spec.Config/index.js
var defaultConfig = /* @__PURE__ */ function() {
  return {
    slow: 75,
    timeout: new Just(2e3),
    exit: true,
    failFast: false,
    filterTree: identity(categoryFn)
  };
}();

// output/Data.Map.Internal/index.js
var $runtime_lazy3 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var Leaf2 = /* @__PURE__ */ function() {
  function Leaf3() {
  }
  ;
  Leaf3.value = new Leaf3();
  return Leaf3;
}();
var Node2 = /* @__PURE__ */ function() {
  function Node3(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  Node3.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new Node3(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return Node3;
}();
var IterLeaf = /* @__PURE__ */ function() {
  function IterLeaf2() {
  }
  ;
  IterLeaf2.value = new IterLeaf2();
  return IterLeaf2;
}();
var IterEmit = /* @__PURE__ */ function() {
  function IterEmit2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  IterEmit2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new IterEmit2(value0, value1, value2);
      };
    };
  };
  return IterEmit2;
}();
var IterNode = /* @__PURE__ */ function() {
  function IterNode2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  IterNode2.create = function(value0) {
    return function(value1) {
      return new IterNode2(value0, value1);
    };
  };
  return IterNode2;
}();
var SplitLast = /* @__PURE__ */ function() {
  function SplitLast2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  SplitLast2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new SplitLast2(value0, value1, value2);
      };
    };
  };
  return SplitLast2;
}();
var unsafeNode = function(k, v, l, r) {
  if (l instanceof Leaf2) {
    if (r instanceof Leaf2) {
      return new Node2(1, 1, k, v, l, r);
    }
    ;
    if (r instanceof Node2) {
      return new Node2(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
  }
  ;
  if (l instanceof Node2) {
    if (r instanceof Leaf2) {
      return new Node2(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
    }
    ;
    if (r instanceof Node2) {
      return new Node2(1 + function() {
        var $280 = l.value0 > r.value0;
        if ($280) {
          return l.value0;
        }
        ;
        return r.value0;
      }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
  }
  ;
  throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
};
var toMapIter = /* @__PURE__ */ function() {
  return flip(IterNode.create)(IterLeaf.value);
}();
var stepWith = function(f) {
  return function(next2) {
    return function(done) {
      var go = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof IterLeaf) {
            $tco_done = true;
            return done(unit);
          }
          ;
          if (v instanceof IterEmit) {
            $tco_done = true;
            return next2(v.value0, v.value1, v.value2);
          }
          ;
          if (v instanceof IterNode) {
            $copy_v = f(v.value1)(v.value0);
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 940, column 8 - line 946, column 20): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go;
    };
  };
};
var singleton6 = function(k) {
  return function(v) {
    return new Node2(1, 1, k, v, Leaf2.value, Leaf2.value);
  };
};
var unsafeBalancedNode = /* @__PURE__ */ function() {
  var height = function(v) {
    if (v instanceof Leaf2) {
      return 0;
    }
    ;
    if (v instanceof Node2) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
  };
  var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
    if (rl instanceof Node2 && rl.value0 > height(rr)) {
      return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
    }
    ;
    return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
  };
  var rotateRight = function(k, v, lk, lv, ll, lr, r) {
    if (lr instanceof Node2 && height(ll) <= lr.value0) {
      return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
    }
    ;
    return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
  };
  return function(k, v, l, r) {
    if (l instanceof Leaf2) {
      if (r instanceof Leaf2) {
        return singleton6(k)(v);
      }
      ;
      if (r instanceof Node2 && r.value0 > 1) {
        return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
      }
      ;
      return unsafeNode(k, v, l, r);
    }
    ;
    if (l instanceof Node2) {
      if (r instanceof Node2) {
        if (r.value0 > (l.value0 + 1 | 0)) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        if (l.value0 > (r.value0 + 1 | 0)) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
      }
      ;
      if (r instanceof Leaf2 && l.value0 > 1) {
        return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
      }
      ;
      return unsafeNode(k, v, l, r);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
  };
}();
var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
  return function(k, v, l, r) {
    if (r instanceof Leaf2) {
      return new SplitLast(k, v, l);
    }
    ;
    if (r instanceof Node2) {
      var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
      return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
  };
});
var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
var unsafeJoinNodes = function(v, v1) {
  if (v instanceof Leaf2) {
    return v1;
  }
  ;
  if (v instanceof Node2) {
    var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
    return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
  }
  ;
  throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
};
var update = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(f) {
    return function(k) {
      var go = function(v) {
        if (v instanceof Leaf2) {
          return Leaf2.value;
        }
        ;
        if (v instanceof Node2) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            var v2 = f(v.value3);
            if (v2 instanceof Nothing) {
              return unsafeJoinNodes(v.value4, v.value5);
            }
            ;
            if (v2 instanceof Just) {
              return new Node2(v.value0, v.value1, v.value2, v2.value0, v.value4, v.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 531, column 11 - line 535, column 38): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 527, column 7 - line 535, column 38): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 524, column 8 - line 535, column 38): " + [v.constructor.name]);
      };
      return go;
    };
  };
};
var lookup = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(k) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Leaf2) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        if (v instanceof Node2) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            $copy_v = v.value4;
            return;
          }
          ;
          if (v1 instanceof GT) {
            $copy_v = v.value5;
            return;
          }
          ;
          if (v1 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value3);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 283, column 7 - line 286, column 22): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 8 - line 286, column 22): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return go;
  };
};
var iterMapL = /* @__PURE__ */ function() {
  var go = function($copy_iter) {
    return function($copy_v) {
      var $tco_var_iter = $copy_iter;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(iter, v) {
        if (v instanceof Leaf2) {
          $tco_done = true;
          return iter;
        }
        ;
        if (v instanceof Node2) {
          if (v.value5 instanceof Leaf2) {
            $tco_var_iter = new IterEmit(v.value2, v.value3, iter);
            $copy_v = v.value4;
            return;
          }
          ;
          $tco_var_iter = new IterEmit(v.value2, v.value3, new IterNode(v.value5, iter));
          $copy_v = v.value4;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 951, column 13 - line 958, column 48): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_iter, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return go;
}();
var stepAscCps = /* @__PURE__ */ stepWith(iterMapL);
var stepUnfoldr = /* @__PURE__ */ function() {
  var step = function(k, v, next2) {
    return new Just(new Tuple(new Tuple(k, v), next2));
  };
  return stepAscCps(step)(function(v) {
    return Nothing.value;
  });
}();
var toUnfoldable2 = function(dictUnfoldable) {
  var $784 = unfoldr(dictUnfoldable)(stepUnfoldr);
  return function($785) {
    return $784(toMapIter($785));
  };
};
var isEmpty2 = function(v) {
  if (v instanceof Leaf2) {
    return true;
  }
  ;
  return false;
};
var insert2 = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(k) {
    return function(v) {
      var go = function(v1) {
        if (v1 instanceof Leaf2) {
          return singleton6(k)(v);
        }
        ;
        if (v1 instanceof Node2) {
          var v2 = compare3(k)(v1.value2);
          if (v2 instanceof LT) {
            return unsafeBalancedNode(v1.value2, v1.value3, go(v1.value4), v1.value5);
          }
          ;
          if (v2 instanceof GT) {
            return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go(v1.value5));
          }
          ;
          if (v2 instanceof EQ) {
            return new Node2(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
      };
      return go;
    };
  };
};
var foldableMap = {
  foldr: function(f) {
    return function(z) {
      var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
        return function(m$prime, z$prime) {
          if (m$prime instanceof Leaf2) {
            return z$prime;
          }
          ;
          if (m$prime instanceof Node2) {
            return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
        };
      });
      var go = $lazy_go(169);
      return function(m) {
        return go(m, z);
      };
    };
  },
  foldl: function(f) {
    return function(z) {
      var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
        return function(z$prime, m$prime) {
          if (m$prime instanceof Leaf2) {
            return z$prime;
          }
          ;
          if (m$prime instanceof Node2) {
            return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
        };
      });
      var go = $lazy_go(175);
      return function(m) {
        return go(z, m);
      };
    };
  },
  foldMap: function(dictMonoid) {
    var mempty3 = mempty(dictMonoid);
    var append15 = append(dictMonoid.Semigroup0());
    return function(f) {
      var go = function(v) {
        if (v instanceof Leaf2) {
          return mempty3;
        }
        ;
        if (v instanceof Node2) {
          return append15(go(v.value4))(append15(f(v.value3))(go(v.value5)));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
      };
      return go;
    };
  }
};
var empty4 = /* @__PURE__ */ function() {
  return Leaf2.value;
}();

// output/Test.Spec.Console/foreign.js
function write3(s) {
  return function() {
    try {
      process.stdout.write(s);
    } catch (e) {
    }
  };
}

// output/Test.Spec.Console/index.js
var tellLn = function(dictMonadWriter) {
  var tell2 = tell(dictMonadWriter.MonadTell1());
  return function(l) {
    return tell2(l + "\n");
  };
};

// output/Control.Monad.Writer/index.js
var unwrap3 = /* @__PURE__ */ unwrap();
var runWriter = function($5) {
  return unwrap3(runWriterT($5));
};

// output/Pipes.Internal/index.js
var Request = /* @__PURE__ */ function() {
  function Request2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Request2.create = function(value0) {
    return function(value1) {
      return new Request2(value0, value1);
    };
  };
  return Request2;
}();
var Respond = /* @__PURE__ */ function() {
  function Respond2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Respond2.create = function(value0) {
    return function(value1) {
      return new Respond2(value0, value1);
    };
  };
  return Respond2;
}();
var M = /* @__PURE__ */ function() {
  function M2(value0) {
    this.value0 = value0;
  }
  ;
  M2.create = function(value0) {
    return new M2(value0);
  };
  return M2;
}();
var Pure = /* @__PURE__ */ function() {
  function Pure2(value0) {
    this.value0 = value0;
  }
  ;
  Pure2.create = function(value0) {
    return new Pure2(value0);
  };
  return Pure2;
}();
var monadTransProxy = {
  lift: function(dictMonad) {
    var map9 = map(dictMonad.Bind1().Apply0().Functor0());
    return function(m) {
      return new M(map9(Pure.create)(m));
    };
  }
};
var functorProxy2 = function(dictMonad) {
  var bind22 = bind(dictMonad.Bind1());
  var pure22 = pure(dictMonad.Applicative0());
  return {
    map: function(f) {
      return function(p0) {
        var go = function(p) {
          if (p instanceof Request) {
            return new Request(p.value0, function(x) {
              return go(p.value1(x));
            });
          }
          ;
          if (p instanceof Respond) {
            return new Respond(p.value0, function(x) {
              return go(p.value1(x));
            });
          }
          ;
          if (p instanceof M) {
            return new M(bind22(p.value0)(function(v) {
              return pure22(go(v));
            }));
          }
          ;
          if (p instanceof Pure) {
            return new Pure(f(p.value0));
          }
          ;
          throw new Error("Failed pattern match at Pipes.Internal (line 28, column 12 - line 32, column 41): " + [p.constructor.name]);
        };
        return go(p0);
      };
    }
  };
};
var closed = function($copy_v) {
  var $tco_result;
  function $tco_loop(v) {
    $copy_v = v;
    return;
  }
  ;
  while (true) {
    $tco_result = $tco_loop($copy_v);
  }
  ;
  return $tco_result;
};
var applyProxy2 = function(dictMonad) {
  var bind22 = bind(dictMonad.Bind1());
  var pure22 = pure(dictMonad.Applicative0());
  var functorProxy1 = functorProxy2(dictMonad);
  var map9 = map(functorProxy1);
  return {
    apply: function(pf0) {
      return function(px) {
        var go = function(pf) {
          if (pf instanceof Request) {
            return new Request(pf.value0, function(x) {
              return go(pf.value1(x));
            });
          }
          ;
          if (pf instanceof Respond) {
            return new Respond(pf.value0, function(x) {
              return go(pf.value1(x));
            });
          }
          ;
          if (pf instanceof M) {
            return new M(bind22(pf.value0)(function(v) {
              return pure22(go(v));
            }));
          }
          ;
          if (pf instanceof Pure) {
            return map9(pf.value0)(px);
          }
          ;
          throw new Error("Failed pattern match at Pipes.Internal (line 36, column 13 - line 40, column 33): " + [pf.constructor.name]);
        };
        return go(pf0);
      };
    },
    Functor0: function() {
      return functorProxy1;
    }
  };
};
var bindProxy2 = function(dictMonad) {
  var bind22 = bind(dictMonad.Bind1());
  var pure22 = pure(dictMonad.Applicative0());
  var applyProxy1 = applyProxy2(dictMonad);
  return {
    bind: function(p0) {
      return function(f) {
        var go = function(p) {
          if (p instanceof Request) {
            return new Request(p.value0, function(x) {
              return go(p.value1(x));
            });
          }
          ;
          if (p instanceof Respond) {
            return new Respond(p.value0, function(x) {
              return go(p.value1(x));
            });
          }
          ;
          if (p instanceof M) {
            return new M(bind22(p.value0)(function(v) {
              return pure22(go(v));
            }));
          }
          ;
          if (p instanceof Pure) {
            return f(p.value0);
          }
          ;
          throw new Error("Failed pattern match at Pipes.Internal (line 47, column 12 - line 51, column 28): " + [p.constructor.name]);
        };
        return go(p0);
      };
    },
    Apply0: function() {
      return applyProxy1;
    }
  };
};
var applicativeProxy2 = function(dictMonad) {
  var applyProxy1 = applyProxy2(dictMonad);
  return {
    pure: Pure.create,
    Apply0: function() {
      return applyProxy1;
    }
  };
};
var monadProxy = function(dictMonad) {
  var applicativeProxy1 = applicativeProxy2(dictMonad);
  var bindProxy1 = bindProxy2(dictMonad);
  return {
    Applicative0: function() {
      return applicativeProxy1;
    },
    Bind1: function() {
      return bindProxy1;
    }
  };
};
var proxyMonadEffect = function(dictMonadEffect) {
  var liftEffect7 = liftEffect(dictMonadEffect);
  var monadProxy1 = monadProxy(dictMonadEffect.Monad0());
  return {
    liftEffect: function(m) {
      return new M(liftEffect7(function __do() {
        var r = m();
        return new Pure(r);
      }));
    },
    Monad0: function() {
      return monadProxy1;
    }
  };
};

// output/Pipes.Core/index.js
var runEffectRec = function(dictMonadRec) {
  var Monad0 = dictMonadRec.Monad0();
  var map9 = map(Monad0.Bind1().Apply0().Functor0());
  var pure8 = pure(Monad0.Applicative0());
  var go = function(v) {
    if (v instanceof Request) {
      return map9(Done.create)(closed(v.value0));
    }
    ;
    if (v instanceof Respond) {
      return map9(Done.create)(closed(v.value0));
    }
    ;
    if (v instanceof Pure) {
      return pure8(new Done(v.value0));
    }
    ;
    if (v instanceof M) {
      return map9(Loop.create)(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Pipes.Core (line 104, column 3 - line 104, column 39): " + [v.constructor.name]);
  };
  return tailRecM(dictMonadRec)(go);
};
var runEffect = function(dictMonad) {
  var bind8 = bind(dictMonad.Bind1());
  var pure8 = pure(dictMonad.Applicative0());
  var go = function(p) {
    if (p instanceof Request) {
      return closed(p.value0);
    }
    ;
    if (p instanceof Respond) {
      return closed(p.value0);
    }
    ;
    if (p instanceof M) {
      return bind8(p.value0)(go);
    }
    ;
    if (p instanceof Pure) {
      return pure8(p.value0);
    }
    ;
    throw new Error("Failed pattern match at Pipes.Core (line 95, column 12 - line 99, column 30): " + [p.constructor.name]);
  };
  return go;
};
var respond = function(dictMonad) {
  return function(a) {
    return new Respond(a, Pure.create);
  };
};
var request = function(dictMonad) {
  return function(a$prime) {
    return new Request(a$prime, Pure.create);
  };
};
var composeResponse = function(dictMonad) {
  var bind8 = bind(bindProxy2(dictMonad));
  var map9 = map(dictMonad.Bind1().Apply0().Functor0());
  return function(p0) {
    return function(fb) {
      var go = function(p) {
        if (p instanceof Request) {
          return new Request(p.value0, function($126) {
            return go(p.value1($126));
          });
        }
        ;
        if (p instanceof Respond) {
          return bind8(fb(p.value0))(function($127) {
            return go(p.value1($127));
          });
        }
        ;
        if (p instanceof M) {
          return new M(map9(go)(p.value0));
        }
        ;
        if (p instanceof Pure) {
          return new Pure(p.value0);
        }
        ;
        throw new Error("Failed pattern match at Pipes.Core (line 137, column 12 - line 141, column 33): " + [p.constructor.name]);
      };
      return go(p0);
    };
  };
};
var composePush$prime = function(dictMonad) {
  var bind8 = bind(dictMonad.Bind1());
  var pure8 = pure(dictMonad.Applicative0());
  return function(p) {
    return function(fb) {
      if (p instanceof Request) {
        return new Request(p.value0, function(a) {
          return composePush$prime(dictMonad)(p.value1(a))(fb);
        });
      }
      ;
      if (p instanceof Respond) {
        return composePull$prime(dictMonad)(p.value1)(fb(p.value0));
      }
      ;
      if (p instanceof M) {
        return new M(bind8(p.value0)(function(p$prime) {
          return pure8(composePush$prime(dictMonad)(p$prime)(fb));
        }));
      }
      ;
      if (p instanceof Pure) {
        return new Pure(p.value0);
      }
      ;
      throw new Error("Failed pattern match at Pipes.Core (line 222, column 21 - line 226, column 29): " + [p.constructor.name]);
    };
  };
};
var composePull$prime = function(dictMonad) {
  var map9 = map(dictMonad.Bind1().Apply0().Functor0());
  return function(fb$prime) {
    return function(p) {
      if (p instanceof Request) {
        return composePush$prime(dictMonad)(fb$prime(p.value0))(p.value1);
      }
      ;
      if (p instanceof Respond) {
        return new Respond(p.value0, function($130) {
          return function(v) {
            return composePull$prime(dictMonad)(fb$prime)(v);
          }(p.value1($130));
        });
      }
      ;
      if (p instanceof M) {
        return new M(map9(function(v) {
          return composePull$prime(dictMonad)(fb$prime)(v);
        })(p.value0));
      }
      ;
      if (p instanceof Pure) {
        return new Pure(p.value0);
      }
      ;
      throw new Error("Failed pattern match at Pipes.Core (line 197, column 22 - line 201, column 29): " + [p.constructor.name]);
    };
  };
};

// output/Pipes/index.js
var $$yield = function(dictMonad) {
  return respond(dictMonad);
};
var composePipes = function(dictMonad) {
  var composePull$prime2 = composePull$prime(dictMonad);
  return function(p1) {
    return function(p2) {
      return composePull$prime2($$const(p1))(p2);
    };
  };
};
var $$await = function(dictMonad) {
  return request(dictMonad)(unit);
};

// output/Ansi.Codes/index.js
var show2 = /* @__PURE__ */ show(showInt);
var intercalate4 = /* @__PURE__ */ intercalate(foldableNonEmptyList)(monoidString);
var map7 = /* @__PURE__ */ map(functorNonEmptyList);
var Bold = /* @__PURE__ */ function() {
  function Bold2() {
  }
  ;
  Bold2.value = new Bold2();
  return Bold2;
}();
var Dim = /* @__PURE__ */ function() {
  function Dim2() {
  }
  ;
  Dim2.value = new Dim2();
  return Dim2;
}();
var Italic = /* @__PURE__ */ function() {
  function Italic2() {
  }
  ;
  Italic2.value = new Italic2();
  return Italic2;
}();
var Underline = /* @__PURE__ */ function() {
  function Underline2() {
  }
  ;
  Underline2.value = new Underline2();
  return Underline2;
}();
var Inverse = /* @__PURE__ */ function() {
  function Inverse2() {
  }
  ;
  Inverse2.value = new Inverse2();
  return Inverse2;
}();
var Strikethrough = /* @__PURE__ */ function() {
  function Strikethrough2() {
  }
  ;
  Strikethrough2.value = new Strikethrough2();
  return Strikethrough2;
}();
var ToEnd = /* @__PURE__ */ function() {
  function ToEnd2() {
  }
  ;
  ToEnd2.value = new ToEnd2();
  return ToEnd2;
}();
var FromBeginning = /* @__PURE__ */ function() {
  function FromBeginning2() {
  }
  ;
  FromBeginning2.value = new FromBeginning2();
  return FromBeginning2;
}();
var Entire = /* @__PURE__ */ function() {
  function Entire2() {
  }
  ;
  Entire2.value = new Entire2();
  return Entire2;
}();
var Black = /* @__PURE__ */ function() {
  function Black2() {
  }
  ;
  Black2.value = new Black2();
  return Black2;
}();
var Red = /* @__PURE__ */ function() {
  function Red2() {
  }
  ;
  Red2.value = new Red2();
  return Red2;
}();
var Green = /* @__PURE__ */ function() {
  function Green2() {
  }
  ;
  Green2.value = new Green2();
  return Green2;
}();
var Yellow = /* @__PURE__ */ function() {
  function Yellow2() {
  }
  ;
  Yellow2.value = new Yellow2();
  return Yellow2;
}();
var Blue = /* @__PURE__ */ function() {
  function Blue2() {
  }
  ;
  Blue2.value = new Blue2();
  return Blue2;
}();
var Magenta = /* @__PURE__ */ function() {
  function Magenta2() {
  }
  ;
  Magenta2.value = new Magenta2();
  return Magenta2;
}();
var Cyan = /* @__PURE__ */ function() {
  function Cyan2() {
  }
  ;
  Cyan2.value = new Cyan2();
  return Cyan2;
}();
var White = /* @__PURE__ */ function() {
  function White2() {
  }
  ;
  White2.value = new White2();
  return White2;
}();
var BrightBlack = /* @__PURE__ */ function() {
  function BrightBlack2() {
  }
  ;
  BrightBlack2.value = new BrightBlack2();
  return BrightBlack2;
}();
var BrightRed = /* @__PURE__ */ function() {
  function BrightRed2() {
  }
  ;
  BrightRed2.value = new BrightRed2();
  return BrightRed2;
}();
var BrightGreen = /* @__PURE__ */ function() {
  function BrightGreen2() {
  }
  ;
  BrightGreen2.value = new BrightGreen2();
  return BrightGreen2;
}();
var BrightYellow = /* @__PURE__ */ function() {
  function BrightYellow2() {
  }
  ;
  BrightYellow2.value = new BrightYellow2();
  return BrightYellow2;
}();
var BrightBlue = /* @__PURE__ */ function() {
  function BrightBlue2() {
  }
  ;
  BrightBlue2.value = new BrightBlue2();
  return BrightBlue2;
}();
var BrightMagenta = /* @__PURE__ */ function() {
  function BrightMagenta2() {
  }
  ;
  BrightMagenta2.value = new BrightMagenta2();
  return BrightMagenta2;
}();
var BrightCyan = /* @__PURE__ */ function() {
  function BrightCyan2() {
  }
  ;
  BrightCyan2.value = new BrightCyan2();
  return BrightCyan2;
}();
var BrightWhite = /* @__PURE__ */ function() {
  function BrightWhite2() {
  }
  ;
  BrightWhite2.value = new BrightWhite2();
  return BrightWhite2;
}();
var Reset = /* @__PURE__ */ function() {
  function Reset2() {
  }
  ;
  Reset2.value = new Reset2();
  return Reset2;
}();
var PMode = /* @__PURE__ */ function() {
  function PMode2(value0) {
    this.value0 = value0;
  }
  ;
  PMode2.create = function(value0) {
    return new PMode2(value0);
  };
  return PMode2;
}();
var PForeground = /* @__PURE__ */ function() {
  function PForeground2(value0) {
    this.value0 = value0;
  }
  ;
  PForeground2.create = function(value0) {
    return new PForeground2(value0);
  };
  return PForeground2;
}();
var PBackground = /* @__PURE__ */ function() {
  function PBackground2(value0) {
    this.value0 = value0;
  }
  ;
  PBackground2.create = function(value0) {
    return new PBackground2(value0);
  };
  return PBackground2;
}();
var Up = /* @__PURE__ */ function() {
  function Up2(value0) {
    this.value0 = value0;
  }
  ;
  Up2.create = function(value0) {
    return new Up2(value0);
  };
  return Up2;
}();
var Down = /* @__PURE__ */ function() {
  function Down2(value0) {
    this.value0 = value0;
  }
  ;
  Down2.create = function(value0) {
    return new Down2(value0);
  };
  return Down2;
}();
var Forward = /* @__PURE__ */ function() {
  function Forward2(value0) {
    this.value0 = value0;
  }
  ;
  Forward2.create = function(value0) {
    return new Forward2(value0);
  };
  return Forward2;
}();
var Back = /* @__PURE__ */ function() {
  function Back2(value0) {
    this.value0 = value0;
  }
  ;
  Back2.create = function(value0) {
    return new Back2(value0);
  };
  return Back2;
}();
var NextLine = /* @__PURE__ */ function() {
  function NextLine2(value0) {
    this.value0 = value0;
  }
  ;
  NextLine2.create = function(value0) {
    return new NextLine2(value0);
  };
  return NextLine2;
}();
var PreviousLine = /* @__PURE__ */ function() {
  function PreviousLine2(value0) {
    this.value0 = value0;
  }
  ;
  PreviousLine2.create = function(value0) {
    return new PreviousLine2(value0);
  };
  return PreviousLine2;
}();
var HorizontalAbsolute = /* @__PURE__ */ function() {
  function HorizontalAbsolute2(value0) {
    this.value0 = value0;
  }
  ;
  HorizontalAbsolute2.create = function(value0) {
    return new HorizontalAbsolute2(value0);
  };
  return HorizontalAbsolute2;
}();
var Position = /* @__PURE__ */ function() {
  function Position2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Position2.create = function(value0) {
    return function(value1) {
      return new Position2(value0, value1);
    };
  };
  return Position2;
}();
var EraseData = /* @__PURE__ */ function() {
  function EraseData2(value0) {
    this.value0 = value0;
  }
  ;
  EraseData2.create = function(value0) {
    return new EraseData2(value0);
  };
  return EraseData2;
}();
var EraseLine = /* @__PURE__ */ function() {
  function EraseLine2(value0) {
    this.value0 = value0;
  }
  ;
  EraseLine2.create = function(value0) {
    return new EraseLine2(value0);
  };
  return EraseLine2;
}();
var ScrollUp = /* @__PURE__ */ function() {
  function ScrollUp2(value0) {
    this.value0 = value0;
  }
  ;
  ScrollUp2.create = function(value0) {
    return new ScrollUp2(value0);
  };
  return ScrollUp2;
}();
var ScrollDown = /* @__PURE__ */ function() {
  function ScrollDown2(value0) {
    this.value0 = value0;
  }
  ;
  ScrollDown2.create = function(value0) {
    return new ScrollDown2(value0);
  };
  return ScrollDown2;
}();
var Graphics = /* @__PURE__ */ function() {
  function Graphics2(value0) {
    this.value0 = value0;
  }
  ;
  Graphics2.create = function(value0) {
    return new Graphics2(value0);
  };
  return Graphics2;
}();
var SavePosition = /* @__PURE__ */ function() {
  function SavePosition2() {
  }
  ;
  SavePosition2.value = new SavePosition2();
  return SavePosition2;
}();
var RestorePosition = /* @__PURE__ */ function() {
  function RestorePosition2() {
  }
  ;
  RestorePosition2.value = new RestorePosition2();
  return RestorePosition2;
}();
var QueryPosition = /* @__PURE__ */ function() {
  function QueryPosition2() {
  }
  ;
  QueryPosition2.value = new QueryPosition2();
  return QueryPosition2;
}();
var HideCursor = /* @__PURE__ */ function() {
  function HideCursor2() {
  }
  ;
  HideCursor2.value = new HideCursor2();
  return HideCursor2;
}();
var ShowCursor = /* @__PURE__ */ function() {
  function ShowCursor2() {
  }
  ;
  ShowCursor2.value = new ShowCursor2();
  return ShowCursor2;
}();
var prefix = "\x1B[";
var eraseParamToString = function(ep) {
  if (ep instanceof ToEnd) {
    return "0";
  }
  ;
  if (ep instanceof FromBeginning) {
    return "1";
  }
  ;
  if (ep instanceof Entire) {
    return "2";
  }
  ;
  throw new Error("Failed pattern match at Ansi.Codes (line 95, column 3 - line 98, column 25): " + [ep.constructor.name]);
};
var colorSuffix = "m";
var colorCode = function(c) {
  if (c instanceof Black) {
    return 30;
  }
  ;
  if (c instanceof Red) {
    return 31;
  }
  ;
  if (c instanceof Green) {
    return 32;
  }
  ;
  if (c instanceof Yellow) {
    return 33;
  }
  ;
  if (c instanceof Blue) {
    return 34;
  }
  ;
  if (c instanceof Magenta) {
    return 35;
  }
  ;
  if (c instanceof Cyan) {
    return 36;
  }
  ;
  if (c instanceof White) {
    return 37;
  }
  ;
  if (c instanceof BrightBlack) {
    return 90;
  }
  ;
  if (c instanceof BrightRed) {
    return 91;
  }
  ;
  if (c instanceof BrightGreen) {
    return 92;
  }
  ;
  if (c instanceof BrightYellow) {
    return 93;
  }
  ;
  if (c instanceof BrightBlue) {
    return 94;
  }
  ;
  if (c instanceof BrightMagenta) {
    return 95;
  }
  ;
  if (c instanceof BrightCyan) {
    return 96;
  }
  ;
  if (c instanceof BrightWhite) {
    return 97;
  }
  ;
  throw new Error("Failed pattern match at Ansi.Codes (line 173, column 3 - line 189, column 22): " + [c.constructor.name]);
};
var codeForRenderingMode = function(m) {
  if (m instanceof Bold) {
    return 1;
  }
  ;
  if (m instanceof Dim) {
    return 2;
  }
  ;
  if (m instanceof Italic) {
    return 3;
  }
  ;
  if (m instanceof Underline) {
    return 4;
  }
  ;
  if (m instanceof Inverse) {
    return 7;
  }
  ;
  if (m instanceof Strikethrough) {
    return 9;
  }
  ;
  throw new Error("Failed pattern match at Ansi.Codes (line 138, column 3 - line 144, column 23): " + [m.constructor.name]);
};
var graphicsParamToString = function(gp) {
  if (gp instanceof Reset) {
    return "0";
  }
  ;
  if (gp instanceof PMode) {
    return show2(codeForRenderingMode(gp.value0));
  }
  ;
  if (gp instanceof PForeground) {
    return show2(colorCode(gp.value0));
  }
  ;
  if (gp instanceof PBackground) {
    return show2(colorCode(gp.value0) + 10 | 0);
  }
  ;
  throw new Error("Failed pattern match at Ansi.Codes (line 116, column 3 - line 120, column 45): " + [gp.constructor.name]);
};
var escapeCodeToString = /* @__PURE__ */ function() {
  var go = function(c) {
    if (c instanceof Up) {
      return show2(c.value0) + "A";
    }
    ;
    if (c instanceof Down) {
      return show2(c.value0) + "B";
    }
    ;
    if (c instanceof Forward) {
      return show2(c.value0) + "C";
    }
    ;
    if (c instanceof Back) {
      return show2(c.value0) + "D";
    }
    ;
    if (c instanceof NextLine) {
      return show2(c.value0) + "E";
    }
    ;
    if (c instanceof PreviousLine) {
      return show2(c.value0) + "F";
    }
    ;
    if (c instanceof HorizontalAbsolute) {
      return show2(c.value0) + "G";
    }
    ;
    if (c instanceof Position) {
      return show2(c.value0) + (";" + (show2(c.value1) + "H"));
    }
    ;
    if (c instanceof EraseData) {
      return eraseParamToString(c.value0) + "J";
    }
    ;
    if (c instanceof EraseLine) {
      return eraseParamToString(c.value0) + "K";
    }
    ;
    if (c instanceof ScrollUp) {
      return show2(c.value0) + "S";
    }
    ;
    if (c instanceof ScrollDown) {
      return show2(c.value0) + "T";
    }
    ;
    if (c instanceof Graphics) {
      return intercalate4(";")(map7(graphicsParamToString)(c.value0)) + colorSuffix;
    }
    ;
    if (c instanceof SavePosition) {
      return "s";
    }
    ;
    if (c instanceof RestorePosition) {
      return "u";
    }
    ;
    if (c instanceof QueryPosition) {
      return "6n";
    }
    ;
    if (c instanceof HideCursor) {
      return "?25l";
    }
    ;
    if (c instanceof ShowCursor) {
      return "?25h";
    }
    ;
    throw new Error("Failed pattern match at Ansi.Codes (line 53, column 5 - line 71, column 37): " + [c.constructor.name]);
  };
  return function($846) {
    return function(v) {
      return prefix + v;
    }(go($846));
  };
}();

// output/Test.Spec.Style/index.js
var fromFoldable6 = /* @__PURE__ */ fromFoldable2(foldableArray);
var yellow = /* @__PURE__ */ function() {
  return [new PForeground(Yellow.value)];
}();
var styled = function(as) {
  return function(str) {
    var v = fromFoldable6(as);
    if (v instanceof Nothing) {
      return str;
    }
    ;
    if (v instanceof Just) {
      return escapeCodeToString(new Graphics(v.value0)) + (str + escapeCodeToString(new Graphics(singleton3(Reset.value))));
    }
    ;
    throw new Error("Failed pattern match at Test.Spec.Style (line 16, column 3 - line 22, column 80): " + [v.constructor.name]);
  };
};
var red = /* @__PURE__ */ function() {
  return [new PForeground(Red.value)];
}();
var magenta = /* @__PURE__ */ function() {
  return [new PForeground(Magenta.value)];
}();
var green = /* @__PURE__ */ function() {
  return [new PForeground(Green.value)];
}();
var dim = /* @__PURE__ */ function() {
  return [new PMode(Dim.value)];
}();
var cyan = /* @__PURE__ */ function() {
  return [new PForeground(Cyan.value)];
}();
var bold = /* @__PURE__ */ function() {
  return [new PMode(Bold.value)];
}();

// output/Test.Spec.Speed/index.js
var greaterThan2 = /* @__PURE__ */ greaterThan(ordMilliseconds);
var Fast = /* @__PURE__ */ function() {
  function Fast2() {
  }
  ;
  Fast2.value = new Fast2();
  return Fast2;
}();
var Medium = /* @__PURE__ */ function() {
  function Medium2() {
  }
  ;
  Medium2.value = new Medium2();
  return Medium2;
}();
var Slow = /* @__PURE__ */ function() {
  function Slow2() {
  }
  ;
  Slow2.value = new Slow2();
  return Slow2;
}();
var speedOf = function(v) {
  return function(v1) {
    if (greaterThan2(v1)(v)) {
      return Slow.value;
    }
    ;
    if (v1 > v / 2) {
      return Medium.value;
    }
    ;
    return Fast.value;
  };
};

// output/Test.Spec.Result/index.js
var Success = /* @__PURE__ */ function() {
  function Success2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Success2.create = function(value0) {
    return function(value1) {
      return new Success2(value0, value1);
    };
  };
  return Success2;
}();
var Failure = /* @__PURE__ */ function() {
  function Failure2(value0) {
    this.value0 = value0;
  }
  ;
  Failure2.create = function(value0) {
    return new Failure2(value0);
  };
  return Failure2;
}();

// output/Test.Spec.Runner.Event/index.js
var Parallel = /* @__PURE__ */ function() {
  function Parallel2() {
  }
  ;
  Parallel2.value = new Parallel2();
  return Parallel2;
}();
var Sequential = /* @__PURE__ */ function() {
  function Sequential2() {
  }
  ;
  Sequential2.value = new Sequential2();
  return Sequential2;
}();
var Start = /* @__PURE__ */ function() {
  function Start2(value0) {
    this.value0 = value0;
  }
  ;
  Start2.create = function(value0) {
    return new Start2(value0);
  };
  return Start2;
}();
var Suite = /* @__PURE__ */ function() {
  function Suite2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  Suite2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new Suite2(value0, value1, value2);
      };
    };
  };
  return Suite2;
}();
var SuiteEnd = /* @__PURE__ */ function() {
  function SuiteEnd2(value0) {
    this.value0 = value0;
  }
  ;
  SuiteEnd2.create = function(value0) {
    return new SuiteEnd2(value0);
  };
  return SuiteEnd2;
}();
var Test = /* @__PURE__ */ function() {
  function Test2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  Test2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new Test2(value0, value1, value2);
      };
    };
  };
  return Test2;
}();
var TestEnd = /* @__PURE__ */ function() {
  function TestEnd2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  TestEnd2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new TestEnd2(value0, value1, value2);
      };
    };
  };
  return TestEnd2;
}();
var Pending = /* @__PURE__ */ function() {
  function Pending2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Pending2.create = function(value0) {
    return function(value1) {
      return new Pending2(value0, value1);
    };
  };
  return Pending2;
}();
var End = /* @__PURE__ */ function() {
  function End2(value0) {
    this.value0 = value0;
  }
  ;
  End2.create = function(value0) {
    return new End2(value0);
  };
  return End2;
}();

// output/Test.Spec.Summary/index.js
var $runtime_lazy4 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var semiringRecord2 = /* @__PURE__ */ semiringRecord()(/* @__PURE__ */ semiringRecordCons({
  reflectSymbol: function() {
    return "failed";
  }
})()(/* @__PURE__ */ semiringRecordCons({
  reflectSymbol: function() {
    return "passed";
  }
})()(/* @__PURE__ */ semiringRecordCons({
  reflectSymbol: function() {
    return "pending";
  }
})()(semiringRecordNil)(semiringInt))(semiringInt))(semiringInt));
var add2 = /* @__PURE__ */ add(semiringRecord2);
var un4 = /* @__PURE__ */ un();
var Count = function(x) {
  return x;
};
var semigroupCount = {
  append: function(v) {
    return function(v1) {
      return add2(v)(v1);
    };
  }
};
var monoidCount = {
  mempty: /* @__PURE__ */ zero(semiringRecord2),
  Semigroup0: function() {
    return semigroupCount;
  }
};
var $lazy_summarize = /* @__PURE__ */ $runtime_lazy4("summarize", "Test.Spec.Summary", function() {
  return foldMap(foldableArray)(monoidCount)(function(v) {
    if (v instanceof Leaf && (v.value1 instanceof Just && v.value1.value0 instanceof Success)) {
      return {
        passed: 1,
        failed: 0,
        pending: 0
      };
    }
    ;
    if (v instanceof Leaf && (v.value1 instanceof Just && v.value1.value0 instanceof Failure)) {
      return {
        passed: 0,
        failed: 1,
        pending: 0
      };
    }
    ;
    if (v instanceof Leaf && v.value1 instanceof Nothing) {
      return {
        passed: 0,
        failed: 0,
        pending: 1
      };
    }
    ;
    if (v instanceof Node) {
      return $lazy_summarize(29)(v.value1);
    }
    ;
    throw new Error("Failed pattern match at Test.Spec.Summary (line 25, column 21 - line 29, column 32): " + [v.constructor.name]);
  });
});
var summarize = /* @__PURE__ */ $lazy_summarize(24);
var successful = function(groups) {
  return un4(Count)(summarize(groups)).failed === 0;
};

// output/Test.Spec.Reporter.Base/index.js
var discard4 = /* @__PURE__ */ discard(discardUnit);
var lift4 = /* @__PURE__ */ lift(monadTransProxy);
var monadWriterT2 = /* @__PURE__ */ monadWriterT(monoidString)(monadIdentity);
var bindStateT2 = /* @__PURE__ */ bindStateT(monadWriterT2);
var bind5 = /* @__PURE__ */ bind(bindStateT2);
var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadWriterT2);
var get2 = /* @__PURE__ */ get(monadStateStateT2);
var all4 = /* @__PURE__ */ all(foldableMap)(heytingAlgebraBoolean);
var discard13 = /* @__PURE__ */ discard4(bindStateT2);
var put4 = /* @__PURE__ */ put(monadStateStateT2);
var applicativeStateT3 = /* @__PURE__ */ applicativeStateT(monadWriterT2);
var when2 = /* @__PURE__ */ when(applicativeStateT3);
var for_3 = /* @__PURE__ */ for_(applicativeStateT3)(foldableArray);
var toUnfoldable3 = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
var pure5 = /* @__PURE__ */ pure(applicativeStateT3);
var ordArray2 = /* @__PURE__ */ ordArray(pathItemOrd);
var insert3 = /* @__PURE__ */ insert2(ordArray2);
var update2 = /* @__PURE__ */ update(ordArray2);
var gets2 = /* @__PURE__ */ gets(monadStateStateT2);
var lookup2 = /* @__PURE__ */ lookup(ordArray2);
var unless2 = /* @__PURE__ */ unless(applicativeStateT3);
var execStateT2 = /* @__PURE__ */ execStateT(/* @__PURE__ */ functorWriterT(functorIdentity));
var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
var voidLeft2 = /* @__PURE__ */ voidLeft(functorEffect);
var pure13 = /* @__PURE__ */ pure(applicativeAff);
var RunningTest = /* @__PURE__ */ function() {
  function RunningTest2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  RunningTest2.create = function(value0) {
    return function(value1) {
      return new RunningTest2(value0, value1);
    };
  };
  return RunningTest2;
}();
var RunningPending = /* @__PURE__ */ function() {
  function RunningPending2(value0) {
    this.value0 = value0;
  }
  ;
  RunningPending2.create = function(value0) {
    return new RunningPending2(value0);
  };
  return RunningPending2;
}();
var RunningSuite = /* @__PURE__ */ function() {
  function RunningSuite2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  RunningSuite2.create = function(value0) {
    return function(value1) {
      return new RunningSuite2(value0, value1);
    };
  };
  return RunningSuite2;
}();
var scanWithStateM = function(dictMonad) {
  var bindProxy4 = bindProxy2(dictMonad);
  var bind15 = bind(bindProxy4);
  var $$await2 = $$await(dictMonad);
  var discard24 = discard4(bindProxy4);
  var $$yield3 = $$yield(dictMonad);
  var lift1 = lift4(dictMonad);
  return function(step) {
    return function(begin) {
      var go = function(x) {
        return bind15($$await2)(function(a) {
          return discard24($$yield3(a))(function() {
            return bind15(lift1(step(x)(a)))(function(x$prime) {
              return go(x$prime);
            });
          });
        });
      };
      return bind15(lift1(begin))(function(x) {
        return go(x);
      });
    };
  };
};
var scanWithStateM1 = /* @__PURE__ */ scanWithStateM(monadAff);
var defaultUpdate = function(opts) {
  return function(e) {
    var modifyRunningItems = function(f) {
      var runningItemIsFinished = function(v) {
        if (v instanceof RunningPending) {
          return true;
        }
        ;
        if (v instanceof RunningTest) {
          return isJust(v.value1);
        }
        ;
        if (v instanceof RunningSuite) {
          return v.value1;
        }
        ;
        throw new Error("Failed pattern match at Test.Spec.Reporter.Base (line 158, column 33 - line 161, column 46): " + [v.constructor.name]);
      };
      return bind5(get2)(function(s) {
        var nextRunningItems = f(opts.getRunningItems(s));
        var allFinished = all4(runningItemIsFinished)(nextRunningItems);
        return discard13(put4(opts.putRunningItems(function() {
          if (allFinished) {
            return empty4;
          }
          ;
          return nextRunningItems;
        }())(s)))(function() {
          return when2(allFinished)(for_3(toUnfoldable3(nextRunningItems))(uncurry(opts.printFinishedItem)));
        });
      });
    };
    var baseUpdate = function(v) {
      if (v instanceof Suite && v.value0 instanceof Sequential) {
        return pure5(unit);
      }
      ;
      if (v instanceof Suite && v.value0 instanceof Parallel) {
        return modifyRunningItems(insert3(v.value1)(new RunningSuite(v.value2, false)));
      }
      ;
      if (v instanceof SuiteEnd) {
        return modifyRunningItems(flip(update2)(v.value0)(function(v1) {
          if (v1 instanceof RunningSuite) {
            return new Just(new RunningSuite(v1.value0, true));
          }
          ;
          return Nothing.value;
        }));
      }
      ;
      if (v instanceof Test && v.value0 instanceof Sequential) {
        return pure5(unit);
      }
      ;
      if (v instanceof Test && v.value0 instanceof Parallel) {
        return modifyRunningItems(insert3(v.value1)(new RunningTest(v.value2, Nothing.value)));
      }
      ;
      if (v instanceof TestEnd) {
        return bind5(gets2(opts.getRunningItems))(function(runningItem) {
          var v1 = lookup2(v.value0)(runningItem);
          if (v1 instanceof Just && v1.value0 instanceof RunningTest) {
            return modifyRunningItems(insert3(v.value0)(new RunningTest(v1.value0.value0, new Just(v.value2))));
          }
          ;
          return pure5(unit);
        });
      }
      ;
      if (v instanceof Pending) {
        return bind5(gets2(opts.getRunningItems))(function(runningItem) {
          return unless2(isEmpty2(runningItem))(modifyRunningItems(insert3(v.value0)(new RunningPending(v.value1))));
        });
      }
      ;
      if (v instanceof End) {
        return pure5(unit);
      }
      ;
      if (v instanceof Start) {
        return pure5(unit);
      }
      ;
      throw new Error("Failed pattern match at Test.Spec.Reporter.Base (line 121, column 18 - line 146, column 33): " + [v.constructor.name]);
    };
    return discard13(baseUpdate(e))(function() {
      return opts.update(e);
    });
  };
};
var defaultReporter = function(initialState2) {
  return function(onEvent) {
    return scanWithStateM1(function(s) {
      return function(e) {
        var v = runWriter(execStateT2(onEvent(e))(s));
        return liftEffect5(voidLeft2(write3(v.value1))(v.value0));
      };
    })(pure13(initialState2));
  };
};

// output/Test.Spec.Reporter.Console/index.js
var show3 = /* @__PURE__ */ show(showInt);
var discard5 = /* @__PURE__ */ discard(discardUnit);
var eq3 = /* @__PURE__ */ eq(/* @__PURE__ */ eqArray(pathItemEq));
var append13 = /* @__PURE__ */ append(semigroupArray);
var intercalate5 = /* @__PURE__ */ intercalate(foldableArray)(monoidString);
var monadWriterT3 = /* @__PURE__ */ monadWriterT(monoidString)(monadIdentity);
var monadStateStateT3 = /* @__PURE__ */ monadStateStateT(monadWriterT3);
var monadWriterStateT2 = /* @__PURE__ */ monadWriterStateT(/* @__PURE__ */ monadWriterWriterT(monoidString)(monadIdentity));
var applicativeStateT4 = /* @__PURE__ */ applicativeStateT(monadWriterT3);
var pure6 = /* @__PURE__ */ pure(applicativeStateT4);
var bind6 = /* @__PURE__ */ bind(/* @__PURE__ */ bindStateT(monadWriterT3));
var get3 = /* @__PURE__ */ get(monadStateStateT3);
var when3 = /* @__PURE__ */ when(applicativeStateT4);
var lookup3 = /* @__PURE__ */ lookup(/* @__PURE__ */ ordArray(pathItemOrd));
var PrintTest = /* @__PURE__ */ function() {
  function PrintTest2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  PrintTest2.create = function(value0) {
    return function(value1) {
      return new PrintTest2(value0, value1);
    };
  };
  return PrintTest2;
}();
var PrintPending = /* @__PURE__ */ function() {
  function PrintPending2(value0) {
    this.value0 = value0;
  }
  ;
  PrintPending2.create = function(value0) {
    return new PrintPending2(value0);
  };
  return PrintPending2;
}();
var printSummary = function(dictMonadWriter) {
  var tellLn2 = tellLn(dictMonadWriter);
  var Monad1 = dictMonadWriter.MonadTell1().Monad1();
  var pure15 = pure(Monad1.Applicative0());
  var discard15 = discard5(Monad1.Bind1());
  var pluralize = function(v) {
    return function(v1) {
      if (v1 === 1) {
        return v;
      }
      ;
      return v + "s";
    };
  };
  var printPassedFailed = function(p) {
    return function(f) {
      var total = p + f | 0;
      var testStr = pluralize("test")(total);
      var color = function() {
        var $78 = f > 0;
        if ($78) {
          return red;
        }
        ;
        return dim;
      }();
      var amount = show3(p) + ("/" + (show3(total) + (" " + (testStr + " passed"))));
      return tellLn2(styled(color)(amount));
    };
  };
  var printPending = function(p) {
    if (p > 0) {
      return tellLn2(styled(yellow)(show3(p) + (" " + (pluralize("test")(p) + " pending"))));
    }
    ;
    if (otherwise) {
      return pure15(unit);
    }
    ;
    throw new Error("Failed pattern match at Test.Spec.Reporter.Console (line 67, column 5 - line 67, column 34): " + [p.constructor.name]);
  };
  return function($123) {
    return function(v) {
      return discard15(tellLn2(""))(function() {
        return discard15(tellLn2(styled(bold)("Summary")))(function() {
          return discard15(printPassedFailed(v.passed)(v.failed))(function() {
            return discard15(printPending(v.pending))(function() {
              return tellLn2("");
            });
          });
        });
      });
    }(summarize($123));
  };
};
var printSummary1 = /* @__PURE__ */ printSummary(monadWriterStateT2);
var print = function(dictMonadState) {
  var Monad0 = dictMonadState.Monad0();
  var Bind1 = Monad0.Bind1();
  var bind15 = bind(Bind1);
  var get1 = get(dictMonadState);
  var discard15 = discard5(Bind1);
  var pure15 = pure(Monad0.Applicative0());
  var put5 = put(dictMonadState);
  return function(dictMonadWriter) {
    var tellLn2 = tellLn(dictMonadWriter);
    return function(path) {
      return function(a) {
        return bind15(get1)(function(s) {
          return discard15(function() {
            if (s.lastPrintedSuitePath instanceof Just && eq3(s.lastPrintedSuitePath.value0)(path)) {
              return pure15(unit);
            }
            ;
            return discard15(tellLn2(styled(append13(bold)(magenta))(intercalate5(" \xBB ")(parentSuiteName(path)))))(function() {
              return put5(function() {
                var $95 = {};
                for (var $96 in s) {
                  if ({}.hasOwnProperty.call(s, $96)) {
                    $95[$96] = s[$96];
                  }
                  ;
                }
                ;
                $95.lastPrintedSuitePath = new Just(path);
                return $95;
              }());
            });
          }())(function() {
            if (a instanceof PrintTest && a.value1 instanceof Success) {
              return tellLn2("  " + (styled(green)("\u2713\uFE0E ") + styled(dim)(a.value0)));
            }
            ;
            if (a instanceof PrintTest && a.value1 instanceof Failure) {
              return discard15(tellLn2("  " + styled(red)("\u2717 " + (a.value0 + ":"))))(function() {
                return discard15(tellLn2(""))(function() {
                  return tellLn2("  " + styled(red)(message(a.value1.value0)));
                });
              });
            }
            ;
            if (a instanceof PrintPending) {
              return tellLn2("  " + styled(cyan)("~ " + a.value0));
            }
            ;
            throw new Error("Failed pattern match at Test.Spec.Reporter.Console (line 98, column 3 - line 106, column 56): " + [a.constructor.name]);
          });
        });
      };
    };
  };
};
var print1 = /* @__PURE__ */ print(monadStateStateT3)(monadWriterStateT2);
var initialState = /* @__PURE__ */ function() {
  return {
    runningItems: empty4,
    lastPrintedSuitePath: Nothing.value
  };
}();
var consoleReporter = /* @__PURE__ */ defaultReporter(initialState)(/* @__PURE__ */ defaultUpdate({
  getRunningItems: function(v) {
    return v.runningItems;
  },
  putRunningItems: /* @__PURE__ */ flip(function(v) {
    return function(v1) {
      return {
        lastPrintedSuitePath: v.lastPrintedSuitePath,
        runningItems: v1
      };
    };
  }),
  printFinishedItem: function(path) {
    return function(v) {
      if (v instanceof RunningTest && v.value1 instanceof Just) {
        return print1(path)(new PrintTest(v.value0, v.value1.value0));
      }
      ;
      if (v instanceof RunningPending) {
        return print1(path)(new PrintPending(v.value0));
      }
      ;
      return pure6(unit);
    };
  },
  update: function(v) {
    if (v instanceof TestEnd) {
      return bind6(get3)(function(v1) {
        return when3(isNothing(lookup3(v.value0)(v1.runningItems)))(print1(v.value0)(new PrintTest(v.value1, v.value2)));
      });
    }
    ;
    if (v instanceof Pending) {
      return bind6(get3)(function(v1) {
        return when3(isEmpty2(v1.runningItems))(print1(v.value0)(new PrintPending(v.value1)));
      });
    }
    ;
    if (v instanceof End) {
      return printSummary1(v.value0);
    }
    ;
    return pure6(unit);
  }
}));

// output/Test.Spec.Runner/foreign.js
function exit(code) {
  return function() {
    try {
      if (process && typeof process.exit === "function") {
        process.exit(code);
      }
    } catch (e) {
    }
    try {
      if (phantom && typeof phantom.exit === "function") {
        phantom.exit(code);
      }
    } catch (e) {
    }
  };
}

// output/Data.DateTime.Instant/index.js
var append14 = /* @__PURE__ */ append(semigroupMilliseconds);
var negateDuration2 = /* @__PURE__ */ negateDuration(durationMilliseconds);
var unInstant = function(v) {
  return v;
};
var diff = function(dictDuration) {
  var toDuration2 = toDuration(dictDuration);
  return function(dt1) {
    return function(dt2) {
      return toDuration2(append14(unInstant(dt1))(negateDuration2(unInstant(dt2))));
    };
  };
};

// output/Effect.Now/foreign.js
function now() {
  return Date.now();
}

// output/Test.Spec.Runner/index.js
var $runtime_lazy5 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var bindProxy3 = /* @__PURE__ */ bindProxy2(monadAff);
var bind7 = /* @__PURE__ */ bind(bindProxy3);
var lift5 = /* @__PURE__ */ lift(monadTransProxy)(monadAff);
var applyProxy3 = /* @__PURE__ */ applyProxy2(monadAff);
var applySecond2 = /* @__PURE__ */ applySecond(applyProxy3);
var applicativeProxy3 = /* @__PURE__ */ applicativeProxy2(monadAff);
var pure7 = /* @__PURE__ */ pure(applicativeProxy3);
var bind14 = /* @__PURE__ */ bind(bindAff);
var parTraverse2 = /* @__PURE__ */ parTraverse(parallelAff);
var runEffectRec2 = /* @__PURE__ */ runEffectRec(monadRecAff);
var composeResponse2 = /* @__PURE__ */ composeResponse(monadAff);
var discard6 = /* @__PURE__ */ discard(discardUnit);
var discard14 = /* @__PURE__ */ discard6(bindAff);
var pure14 = /* @__PURE__ */ pure(applicativeAff);
var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
var discard23 = /* @__PURE__ */ discard6(bindProxy3);
var $$yield2 = /* @__PURE__ */ $$yield(monadAff);
var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
var show4 = /* @__PURE__ */ show(showInt);
var sequential2 = /* @__PURE__ */ sequential(parallelAff);
var alt2 = /* @__PURE__ */ alt(altParAff);
var parallel2 = /* @__PURE__ */ parallel(parallelAff);
var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
var identity10 = /* @__PURE__ */ identity(categoryFn);
var diff2 = /* @__PURE__ */ diff(durationMilliseconds);
var liftEffect1 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ proxyMonadEffect(monadEffectAff));
var when4 = /* @__PURE__ */ when(applicativeProxy3);
var applyFirst2 = /* @__PURE__ */ applyFirst(applyProxy3);
var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorArray);
var map8 = /* @__PURE__ */ map(/* @__PURE__ */ functorProxy2(monadAff));
var $$for3 = /* @__PURE__ */ $$for(applicativeProxy3)(traversableArray);
var map1 = /* @__PURE__ */ map(functorArray);
var foldl2 = /* @__PURE__ */ foldl(foldableArray);
var composePipes2 = /* @__PURE__ */ composePipes(monadAff);
var runEffect2 = /* @__PURE__ */ runEffect(monadAff);
var show1 = /* @__PURE__ */ show(showError);
var $$void6 = /* @__PURE__ */ $$void(functorAff);
var un5 = /* @__PURE__ */ un();
var mergeProducers = function(dictTraversable) {
  var parTraverse1 = parTraverse2(dictTraversable);
  return function(ps) {
    return bind7(lift5(empty3))(function($$var) {
      return bind7(lift5(forkAff(function() {
        var consumer = function(i) {
          return applySecond2(lift5(put3(i)($$var)))(pure7(unit));
        };
        return bind14(parTraverse1(function(p) {
          return runEffectRec2(composeResponse2(p)(consumer));
        })(ps))(function(x) {
          return discard14(kill2(error("finished"))($$var))(function() {
            return pure14(x);
          });
        });
      }())))(function(fib) {
        var $lazy_loop = $runtime_lazy5("loop", "Test.Spec.Runner", function() {
          return bind7(lift5($$try3(take4($$var))))(function(res) {
            if (res instanceof Left) {
              return lift5(joinFiber(fib));
            }
            ;
            if (res instanceof Right) {
              return discard23($$yield2(res.value0))(function() {
                return $lazy_loop(168);
              });
            }
            ;
            throw new Error("Failed pattern match at Test.Spec.Runner (line 164, column 7 - line 168, column 15): " + [res.constructor.name]);
          });
        });
        var loop = $lazy_loop(162);
        return loop;
      });
    });
  };
};
var mergeProducers1 = /* @__PURE__ */ mergeProducers(traversableArray);
var makeTimeout = function(v) {
  return discard14(delay(v))(function() {
    return makeAff(function(cb) {
      return voidRight2(mempty2)(cb(Left.create(error("test timed out after " + (show4(round2(v)) + "ms")))));
    });
  });
};
var timeout = function(time2) {
  return function(t) {
    return bind14(sequential2(alt2(parallel2($$try3(makeTimeout(time2))))(parallel2($$try3(t)))))(either(throwError2)(pure14));
  };
};
var _run = function(dictFunctor) {
  var collect3 = collect2(dictFunctor);
  var map22 = map(dictFunctor);
  return function(config) {
    var filteredTests = function(tests) {
      return config.filterTree(tests);
    };
    var executeExample = function(f) {
      return lift5(bind14(liftEffect6(now))(function(start) {
        var wrap4 = maybe(identity10)(timeout)(config.timeout);
        return bind14(attempt(wrap4(f(function(a) {
          return a(unit);
        }))))(function(e) {
          return bind14(liftEffect6(now))(function(end) {
            var duration = diff2(end)(start);
            return pure14(either(Failure.create)($$const(new Success(speedOf(config.slow)(duration), duration)))(e));
          });
        });
      }));
    };
    var runItem = function(keepRunningVar) {
      return function(v) {
        return bind7(liftEffect1(read(keepRunningVar)))(function(keepRunning) {
          if (v.test instanceof Leaf && v.test.value1 instanceof Just) {
            if (keepRunning) {
              return discard23($$yield2(new Test(function() {
                if (v.isParallelizable) {
                  return Parallel.value;
                }
                ;
                return Sequential.value;
              }(), v.test.value0.value1, v.test.value0.value0)))(function() {
                return bind7(executeExample(v.test.value1.value0.example))(function(res) {
                  return discard23(function() {
                    if (res instanceof Failure && config.failFast) {
                      return liftEffect1(write(false)(keepRunningVar));
                    }
                    ;
                    return pure7(unit);
                  }())(function() {
                    return discard23($$yield2(new TestEnd(v.test.value0.value1, v.test.value0.value0, res)))(function() {
                      return pure7([new Leaf(v.test.value0.value0, new Just(res))]);
                    });
                  });
                });
              });
            }
            ;
            return pure7([new Leaf(v.test.value0.value0, Nothing.value)]);
          }
          ;
          if (v.test instanceof Leaf && v.test.value1 instanceof Nothing) {
            return discard23(when4(keepRunning)($$yield2(new Pending(v.test.value0.value1, v.test.value0.value0))))(function() {
              return pure7([new Leaf(v.test.value0.value0, Nothing.value)]);
            });
          }
          ;
          if (v.test instanceof Node && v.test.value0 instanceof Right) {
            return applyFirst2(loop(keepRunningVar)(v.test.value1))(lift5(v.test.value0.value0(unit)));
          }
          ;
          if (v.test instanceof Node && v.test.value0 instanceof Left) {
            return discard23(when4(keepRunning)($$yield2(new Suite(function() {
              if (v.isParallelizable) {
                return Parallel.value;
              }
              ;
              return Sequential.value;
            }(), v.test.value0.value0.value1, v.test.value0.value0.value0))))(function() {
              return bind7(loop(keepRunningVar)(v.test.value1))(function(res) {
                return discard23(when4(keepRunning)($$yield2(new SuiteEnd(v.test.value0.value0.value1))))(function() {
                  return pure7([new Node(new Left(v.test.value0.value0.value0), res)]);
                });
              });
            });
          }
          ;
          throw new Error("Failed pattern match at Test.Spec.Runner (line 112, column 7 - line 139, column 40): " + [v.test.constructor.name]);
        });
      };
    };
    var loop = function(keepRunningVar) {
      return function(tests) {
        var groups = groupBy2(function(a) {
          return function(b) {
            return a.isParallelizable === b.isParallelizable;
          };
        })(mapFlipped2(tests)(function(test) {
          return {
            isParallelizable: isAllParallelizable(test),
            test
          };
        }));
        return map8(concat)($$for3(groups)(function(g) {
          var $96 = head2(g).isParallelizable;
          if ($96) {
            return map8(concat)(mergeProducers1(map1(runItem(keepRunningVar))(toArray(g))));
          }
          ;
          return map8(concat)($$for3(toArray(g))(runItem(keepRunningVar)));
        }));
      };
    };
    var $102 = map22(function(tests) {
      return discard23($$yield2(new Start(countTests(tests))))(function() {
        return bind7(liftEffect1($$new(true)))(function(keepRunningVar) {
          return bind7(loop(keepRunningVar)(annotateWithPaths(filteredTests(tests))))(function(r) {
            return discard23($$yield2(new End(r)))(function() {
              return pure7(r);
            });
          });
        });
      });
    });
    return function($103) {
      return $102(collect3($103));
    };
  };
};
var runSpecT = function(dictFunctor) {
  var mapFlipped1 = mapFlipped(dictFunctor);
  var _run1 = _run(dictFunctor);
  return function(config) {
    return function(reporters) {
      return function(spec2) {
        return mapFlipped1(_run1(config)(spec2))(function(runner) {
          var events = foldl2(composePipes2)(runner)(reporters);
          var reportedEvents = runEffect2(composeResponse2(events)(function(v) {
            return pure7(unit);
          }));
          if (config.exit) {
            return bind14($$try3(reportedEvents))(function(v) {
              if (v instanceof Left) {
                return discard14(liftEffect6(write3(styled(red)(show1(v.value0) + "\n"))))(function() {
                  return discard14(liftEffect6(exit(1)))(function() {
                    return throwError2(v.value0);
                  });
                });
              }
              ;
              if (v instanceof Right) {
                return liftEffect6(function() {
                  var code = function() {
                    var $100 = successful(v.value0);
                    if ($100) {
                      return 0;
                    }
                    ;
                    return 1;
                  }();
                  return function __do() {
                    exit(code)();
                    return v.value0;
                  };
                }());
              }
              ;
              throw new Error("Failed pattern match at Test.Spec.Runner (line 191, column 33 - line 199, column 21): " + [v.constructor.name]);
            });
          }
          ;
          return reportedEvents;
        });
      };
    };
  };
};
var runSpecT1 = /* @__PURE__ */ runSpecT(functorIdentity);
var runSpec$prime = function(config) {
  return function(reporters) {
    return function(spec2) {
      return $$void6(un5(Identity)(runSpecT1(config)(reporters)(spec2)));
    };
  };
};

// output/Test.Main/index.js
var main = /* @__PURE__ */ function() {
  return launchAff_(runSpec$prime({
    slow: defaultConfig.slow,
    exit: defaultConfig.exit,
    failFast: defaultConfig.failFast,
    filterTree: defaultConfig.filterTree,
    timeout: Nothing.value
  })([consoleReporter])(spec));
}();

// <stdin>
main();
//# sourceMappingURL=index.js.map

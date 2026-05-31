(() => {
    "use strict";
    var e = {
        d: (t, r) => {
            for (var n in r) e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: r[n]
            });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }
    }, t = {};
    e.r(t), e.d(t, {
        qC: () => r
    });
    function r() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return e.reduce((function(e, t) {
            return function() {
                for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
                return e(t.apply(void 0, r));
            };
        }));
    }
    var n = function(e) {
        return function(t) {
            return Object.prototype.toString.call(t) === "[object ".concat(e, "]");
        };
    };
    n("Object"), n("Array");
    window.aa = r("123123"), window.bb = t.default.getTypeFn("String");
})();
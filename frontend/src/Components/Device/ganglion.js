/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var e = function(t, n) {
    return e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
    }, e(t, n)
};

function t(t, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

    function r() {
        this.constructor = t
    }
    e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
}

function n(e, t, n, r) {
    return new(n || (n = Promise))((function(a, o) {
        function i(e) {
            try {
                l(r.next(e))
            } catch (e) {
                o(e)
            }
        }

        function c(e) {
            try {
                l(r.throw(e))
            } catch (e) {
                o(e)
            }
        }

        function l(e) {
            var t;
            e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                e(t)
            }))).then(i, c)
        }
        l((r = r.apply(e, t || [])).next())
    }))
}

function r(e, t) {
    var n, r, a, o, i = {
        label: 0,
        sent: function() {
            if (1 & a[0]) throw a[1];
            return a[1]
        },
        trys: [],
        ops: []
    };
    return o = {
        next: c(0),
        throw: c(1),
        return: c(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
        return this
    }), o;

    function c(o) {
        return function(c) {
            return function(o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; i;) try {
                    if (n = 1, r && (a = 2 & o[0] ? r.return : o[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, o[1])).done) return a;
                    switch (r = 0, a && (o = [2 & o[0], a.value]), o[0]) {
                        case 0:
                        case 1:
                            a = o;
                            break;
                        case 4:
                            return i.label++, {
                                value: o[1],
                                done: !1
                            };
                        case 5:
                            i.label++, r = o[1], o = [0];
                            continue;
                        case 7:
                            o = i.ops.pop(), i.trys.pop();
                            continue;
                        default:
                            if (!(a = i.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                i = 0;
                                continue
                            }
                            if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                                i.label = o[1];
                                break
                            }
                            if (6 === o[0] && i.label < a[1]) {
                                i.label = a[1], a = o;
                                break
                            }
                            if (a && i.label < a[2]) {
                                i.label = a[2], i.ops.push(o);
                                break
                            }
                            a[2] && i.ops.pop(), i.trys.pop();
                            continue
                    }
                    o = t.call(e, i)
                } catch (e) {
                    o = [6, e], r = 0
                } finally {
                    n = a = 0
                }
                if (5 & o[0]) throw o[1];
                return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                }
            }([o, c])
        }
    }
}

function a(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
        n = t && e[t],
        r = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length) return {
        next: function() {
            return e && r >= e.length && (e = void 0), {
                value: e && e[r++],
                done: !e
            }
        }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function o(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var r, a, o = n.call(e),
        i = [];
    try {
        for (;
            (void 0 === t || t-- > 0) && !(r = o.next()).done;) i.push(r.value)
    } catch (e) {
        a = {
            error: e
        }
    } finally {
        try {
            r && !r.done && (n = o.return) && n.call(o)
        } finally {
            if (a) throw a.error
        }
    }
    return i
}

function i(e, t, n) {
    if (n || 2 === arguments.length)
        for (var r, a = 0, o = t.length; a < o; a++) !r && a in t || (r || (r = Array.prototype.slice.call(t, 0, a)), r[a] = t[a]);
    return e.concat(r || Array.prototype.slice.call(t))
}

function c(e) {
    return this instanceof c ? (this.v = e, this) : new c(e)
}

function l(e, t, n) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r, a = n.apply(e, t || []),
        o = [];
    return r = {}, i("next"), i("throw"), i("return"), r[Symbol.asyncIterator] = function() {
        return this
    }, r;

    function i(e) {
        a[e] && (r[e] = function(t) {
            return new Promise((function(n, r) {
                o.push([e, t, n, r]) > 1 || l(e, t)
            }))
        })
    }

    function l(e, t) {
        try {
            (n = a[e](t)).value instanceof c ? Promise.resolve(n.value.v).then(u, s) : f(o[0][2], n)
        } catch (e) {
            f(o[0][3], e)
        }
        var n
    }

    function u(e) {
        l("next", e)
    }

    function s(e) {
        l("throw", e)
    }

    function f(e, t) {
        e(t), o.shift(), o.length && l(o[0][0], o[0][1])
    }
}

function u(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t, n = e[Symbol.asyncIterator];
    return n ? n.call(e) : (e = a(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
        return this
    }, t);

    function r(n) {
        t[n] = e[n] && function(t) {
            return new Promise((function(r, a) {
                (function(e, t, n, r) {
                    Promise.resolve(r).then((function(t) {
                        e({
                            value: t,
                            done: n
                        })
                    }), t)
                })(r, a, (t = e[n](t)).done, t.value)
            }))
        }
    }
}

function s(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function f(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function C(e, t) {
    return function(e) {
        if (Array.isArray(e)) return e
    }(e) || function(e, t) {
        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (null != n) {
            var r, a, o = [],
                i = !0,
                c = !1;
            try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (o.push(r.value), !t || o.length !== t); i = !0);
            } catch (e) {
                c = !0, a = e
            } finally {
                try {
                    i || null == n.return || n.return()
                } finally {
                    if (c) throw a
                }
            }
            return o
        }
    }(e, t) || function(e, t) {
        if (e) {
            if ("string" == typeof e) return f(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0
        }
    }(e, t) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
}

function h(e, t, n, r, a, o, i) {
    try {
        var c = e[o](i),
            l = c.value
    } catch (e) {
        return void n(e)
    }
    c.done ? t(l) : Promise.resolve(l).then(r, a)
}

function d(e) {
    return function() {
        var t = this,
            n = arguments;
        return new Promise((function(r, a) {
            var o = e.apply(t, n);

            function i(e) {
                h(o, r, a, i, c, "next", e)
            }

            function c(e) {
                h(o, r, a, i, c, "throw", e)
            }
            i(void 0)
        }))
    }
}

function m(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function p(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
}
var B = {
    exports: {}
};
! function(e) {
    var t = function(e) {
        var t, n = Object.prototype,
            r = n.hasOwnProperty,
            a = "function" == typeof Symbol ? Symbol : {},
            o = a.iterator || "@@iterator",
            i = a.asyncIterator || "@@asyncIterator",
            c = a.toStringTag || "@@toStringTag";

        function l(e, t, n) {
            return Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            l({}, "")
        } catch (e) {
            l = function(e, t, n) {
                return e[t] = n
            }
        }

        function u(e, t, n, r) {
            var a = t && t.prototype instanceof p ? t : p,
                o = Object.create(a.prototype),
                i = new D(r || []);
            return o._invoke = function(e, t, n) {
                var r = f;
                return function(a, o) {
                    if (r === h) throw new Error("Generator is already running");
                    if (r === d) {
                        if ("throw" === a) throw o;
                        return E()
                    }
                    for (n.method = a, n.arg = o;;) {
                        var i = n.delegate;
                        if (i) {
                            var c = g(i, n);
                            if (c) {
                                if (c === m) continue;
                                return c
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if (r === f) throw r = d, n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = h;
                        var l = s(e, t, n);
                        if ("normal" === l.type) {
                            if (r = n.done ? d : C, l.arg === m) continue;
                            return {
                                value: l.arg,
                                done: n.done
                            }
                        }
                        "throw" === l.type && (r = d, n.method = "throw", n.arg = l.arg)
                    }
                }
            }(e, n, i), o
        }

        function s(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = u;
        var f = "suspendedStart",
            C = "suspendedYield",
            h = "executing",
            d = "completed",
            m = {};

        function p() {}

        function B() {}

        function y() {}
        var I = {};
        l(I, o, (function() {
            return this
        }));
        var O = Object.getPrototypeOf,
            S = O && O(O(x([])));
        S && S !== n && r.call(S, o) && (I = S);
        var b = y.prototype = p.prototype = Object.create(I);

        function v(e) {
            ["next", "throw", "return"].forEach((function(t) {
                l(e, t, (function(e) {
                    return this._invoke(t, e)
                }))
            }))
        }

        function w(e, t) {
            function n(a, o, i, c) {
                var l = s(e[a], e, o);
                if ("throw" !== l.type) {
                    var u = l.arg,
                        f = u.value;
                    return f && "object" == typeof f && r.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                        n("next", e, i, c)
                    }), (function(e) {
                        n("throw", e, i, c)
                    })) : t.resolve(f).then((function(e) {
                        u.value = e, i(u)
                    }), (function(e) {
                        return n("throw", e, i, c)
                    }))
                }
                c(l.arg)
            }
            var a;
            this._invoke = function(e, r) {
                function o() {
                    return new t((function(t, a) {
                        n(e, r, t, a)
                    }))
                }
                return a = a ? a.then(o, o) : o()
            }
        }

        function g(e, n) {
            var r = e.iterator[n.method];
            if (r === t) {
                if (n.delegate = null, "throw" === n.method) {
                    if (e.iterator.return && (n.method = "return", n.arg = t, g(e, n), "throw" === n.method)) return m;
                    n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return m
            }
            var a = s(r, e.iterator, n.arg);
            if ("throw" === a.type) return n.method = "throw", n.arg = a.arg, n.delegate = null, m;
            var o = a.arg;
            return o ? o.done ? (n[e.resultName] = o.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, m) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, m)
        }

        function P(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function k(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function D(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(P, this), this.reset(!0)
        }

        function x(e) {
            if (e) {
                var n = e[o];
                if (n) return n.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var a = -1,
                        i = function n() {
                            for (; ++a < e.length;)
                                if (r.call(e, a)) return n.value = e[a], n.done = !1, n;
                            return n.value = t, n.done = !0, n
                        };
                    return i.next = i
                }
            }
            return {
                next: E
            }
        }

        function E() {
            return {
                value: t,
                done: !0
            }
        }
        return B.prototype = y, l(b, "constructor", y), l(y, "constructor", B), B.displayName = l(y, c, "GeneratorFunction"), e.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === B || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, l(e, c, "GeneratorFunction")), e.prototype = Object.create(b), e
        }, e.awrap = function(e) {
            return {
                __await: e
            }
        }, v(w.prototype), l(w.prototype, i, (function() {
            return this
        })), e.AsyncIterator = w, e.async = function(t, n, r, a, o) {
            void 0 === o && (o = Promise);
            var i = new w(u(t, n, r, a), o);
            return e.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                return e.done ? e.value : i.next()
            }))
        }, v(b), l(b, c, "Generator"), l(b, o, (function() {
            return this
        })), l(b, "toString", (function() {
            return "[object Generator]"
        })), e.keys = function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t.reverse(),
                function n() {
                    for (; t.length;) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n
                    }
                    return n.done = !0, n
                }
        }, e.values = x, D.prototype = {
            constructor: D,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(k), !e)
                    for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var n = this;

                function a(r, a) {
                    return c.type = "throw", c.arg = e, n.next = r, a && (n.method = "next", n.arg = t), !!a
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        c = i.completion;
                    if ("root" === i.tryLoc) return a("end");
                    if (i.tryLoc <= this.prev) {
                        var l = r.call(i, "catchLoc"),
                            u = r.call(i, "finallyLoc");
                        if (l && u) {
                            if (this.prev < i.catchLoc) return a(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return a(i.finallyLoc)
                        } else if (l) {
                            if (this.prev < i.catchLoc) return a(i.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return a(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var a = this.tryEntries[n];
                    if (a.tryLoc <= this.prev && r.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                        var o = a;
                        break
                    }
                }
                o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                var i = o ? o.completion : {};
                return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, m) : this.complete(i)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), m
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), m
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var a = r.arg;
                            k(n)
                        }
                        return a
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, n, r) {
                return this.delegate = {
                    iterator: x(e),
                    resultName: n,
                    nextLoc: r
                }, "next" === this.method && (this.arg = t), m
            }
        }, e
    }(e.exports);
    try {
        regeneratorRuntime = t
    } catch (e) {
        "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t)
    }
}(B);
var y = B.exports;

function I(e) {
    return "function" == typeof e
}

function O(e) {
    var t = e((function(e) {
        Error.call(e), e.stack = (new Error).stack
    }));
    return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
}
var S = O((function(e) {
    return function(t) {
        e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(e, t) {
            return t + 1 + ") " + e.toString()
        })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t
    }
}));

function b(e, t) {
    if (e) {
        var n = e.indexOf(t);
        0 <= n && e.splice(n, 1)
    }
}
var v = function() {
        function e(e) {
            this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null
        }
        var t;
        return e.prototype.unsubscribe = function() {
            var e, t, n, r, c;
            if (!this.closed) {
                this.closed = !0;
                var l = this._parentage;
                if (l)
                    if (this._parentage = null, Array.isArray(l)) try {
                        for (var u = a(l), s = u.next(); !s.done; s = u.next()) {
                            s.value.remove(this)
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            s && !s.done && (t = u.return) && t.call(u)
                        } finally {
                            if (e) throw e.error
                        }
                    } else l.remove(this);
                var f = this.initialTeardown;
                if (I(f)) try {
                    f()
                } catch (e) {
                    c = e instanceof S ? e.errors : [e]
                }
                var C = this._finalizers;
                if (C) {
                    this._finalizers = null;
                    try {
                        for (var h = a(C), d = h.next(); !d.done; d = h.next()) {
                            var m = d.value;
                            try {
                                P(m)
                            } catch (e) {
                                c = null != c ? c : [], e instanceof S ? c = i(i([], o(c)), o(e.errors)) : c.push(e)
                            }
                        }
                    } catch (e) {
                        n = {
                            error: e
                        }
                    } finally {
                        try {
                            d && !d.done && (r = h.return) && r.call(h)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                }
                if (c) throw new S(c)
            }
        }, e.prototype.add = function(t) {
            var n;
            if (t && t !== this)
                if (this.closed) P(t);
                else {
                    if (t instanceof e) {
                        if (t.closed || t._hasParent(this)) return;
                        t._addParent(this)
                    }(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                }
        }, e.prototype._hasParent = function(e) {
            var t = this._parentage;
            return t === e || Array.isArray(t) && t.includes(e)
        }, e.prototype._addParent = function(e) {
            var t = this._parentage;
            this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e
        }, e.prototype._removeParent = function(e) {
            var t = this._parentage;
            t === e ? this._parentage = null : Array.isArray(t) && b(t, e)
        }, e.prototype.remove = function(t) {
            var n = this._finalizers;
            n && b(n, t), t instanceof e && t._removeParent(this)
        }, e.EMPTY = ((t = new e).closed = !0, t), e
    }(),
    w = v.EMPTY;

function g(e) {
    return e instanceof v || e && "closed" in e && I(e.remove) && I(e.add) && I(e.unsubscribe)
}

function P(e) {
    I(e) ? e() : e.unsubscribe()
}
var k = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1
    },
    D = {
        setTimeout: function(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            var a = D.delegate;
            return (null == a ? void 0 : a.setTimeout) ? a.setTimeout.apply(a, i([e, t], o(n))) : setTimeout.apply(void 0, i([e, t], o(n)))
        },
        clearTimeout: function(e) {
            var t = D.delegate;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e)
        },
        delegate: void 0
    };

function x(e) {
    D.setTimeout((function() {
        throw e
    }))
}

function E() {}
var A = N("C", void 0, void 0);

function N(e, t, n) {
    return {
        kind: e,
        value: t,
        error: n
    }
}
var T = null;

function R(e) {
    if (k.useDeprecatedSynchronousErrorHandling) {
        var t = !T;
        if (t && (T = {
                errorThrown: !1,
                error: null
            }), e(), t) {
            var n = T,
                r = n.errorThrown,
                a = n.error;
            if (T = null, r) throw a
        }
    } else e()
}
var F = function(e) {
        function n(t) {
            var n = e.call(this) || this;
            return n.isStopped = !1, t ? (n.destination = t, g(t) && t.add(n)) : n.destination = H, n
        }
        return t(n, e), n.create = function(e, t, n) {
            return new M(e, t, n)
        }, n.prototype.next = function(e) {
            this.isStopped ? j(function(e) {
                return N("N", e, void 0)
            }(e), this) : this._next(e)
        }, n.prototype.error = function(e) {
            this.isStopped ? j(N("E", void 0, e), this) : (this.isStopped = !0, this._error(e))
        }, n.prototype.complete = function() {
            this.isStopped ? j(A, this) : (this.isStopped = !0, this._complete())
        }, n.prototype.unsubscribe = function() {
            this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null)
        }, n.prototype._next = function(e) {
            this.destination.next(e)
        }, n.prototype._error = function(e) {
            try {
                this.destination.error(e)
            } finally {
                this.unsubscribe()
            }
        }, n.prototype._complete = function() {
            try {
                this.destination.complete()
            } finally {
                this.unsubscribe()
            }
        }, n
    }(v),
    G = Function.prototype.bind;

function U(e, t) {
    return G.call(e, t)
}
var L = function() {
        function e(e) {
            this.partialObserver = e
        }
        return e.prototype.next = function(e) {
            var t = this.partialObserver;
            if (t.next) try {
                t.next(e)
            } catch (e) {
                _(e)
            }
        }, e.prototype.error = function(e) {
            var t = this.partialObserver;
            if (t.error) try {
                t.error(e)
            } catch (e) {
                _(e)
            } else _(e)
        }, e.prototype.complete = function() {
            var e = this.partialObserver;
            if (e.complete) try {
                e.complete()
            } catch (e) {
                _(e)
            }
        }, e
    }(),
    M = function(e) {
        function n(t, n, r) {
            var a, o, i = e.call(this) || this;
            I(t) || !t ? a = {
                next: null != t ? t : void 0,
                error: null != n ? n : void 0,
                complete: null != r ? r : void 0
            } : i && k.useDeprecatedNextContext ? ((o = Object.create(t)).unsubscribe = function() {
                return i.unsubscribe()
            }, a = {
                next: t.next && U(t.next, o),
                error: t.error && U(t.error, o),
                complete: t.complete && U(t.complete, o)
            }) : a = t;
            return i.destination = new L(a), i
        }
        return t(n, e), n
    }(F);

function _(e) {
    x(e)
}

function j(e, t) {
    var n = k.onStoppedNotification;
    n && D.setTimeout((function() {
        return n(e, t)
    }))
}
var H = {
        closed: !0,
        next: E,
        error: function(e) {
            throw e
        },
        complete: E
    },
    z = "function" == typeof Symbol && Symbol.observable || "@@observable";

function Q(e) {
    return e
}

function V(e) {
    return 0 === e.length ? Q : 1 === e.length ? e[0] : function(t) {
        return e.reduce((function(e, t) {
            return t(e)
        }), t)
    }
}
var W = function() {
    function e(e) {
        e && (this._subscribe = e)
    }
    return e.prototype.lift = function(t) {
        var n = new e;
        return n.source = this, n.operator = t, n
    }, e.prototype.subscribe = function(e, t, n) {
        var r, a = this,
            o = (r = e) && r instanceof F || function(e) {
                return e && I(e.next) && I(e.error) && I(e.complete)
            }(r) && g(r) ? e : new M(e, t, n);
        return R((function() {
            var e = a,
                t = e.operator,
                n = e.source;
            o.add(t ? t.call(o, n) : n ? a._subscribe(o) : a._trySubscribe(o))
        })), o
    }, e.prototype._trySubscribe = function(e) {
        try {
            return this._subscribe(e)
        } catch (t) {
            e.error(t)
        }
    }, e.prototype.forEach = function(e, t) {
        var n = this;
        return new(t = Y(t))((function(t, r) {
            var a = new M({
                next: function(t) {
                    try {
                        e(t)
                    } catch (e) {
                        r(e), a.unsubscribe()
                    }
                },
                error: r,
                complete: t
            });
            n.subscribe(a)
        }))
    }, e.prototype._subscribe = function(e) {
        var t;
        return null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)
    }, e.prototype[z] = function() {
        return this
    }, e.prototype.pipe = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return V(e)(this)
    }, e.prototype.toPromise = function(e) {
        var t = this;
        return new(e = Y(e))((function(e, n) {
            var r;
            t.subscribe((function(e) {
                return r = e
            }), (function(e) {
                return n(e)
            }), (function() {
                return e(r)
            }))
        }))
    }, e.create = function(t) {
        return new e(t)
    }, e
}();

function Y(e) {
    var t;
    return null !== (t = null != e ? e : k.Promise) && void 0 !== t ? t : Promise
}

function q(e) {
    return function(t) {
        if (function(e) {
                return I(null == e ? void 0 : e.lift)
            }(t)) return t.lift((function(t) {
            try {
                return e(t, this)
            } catch (e) {
                this.error(e)
            }
        }));
        throw new TypeError("Unable to lift unknown Observable type")
    }
}

function Z(e, t, n, r, a) {
    return new $(e, t, n, r, a)
}
var $ = function(e) {
        function n(t, n, r, a, o, i) {
            var c = e.call(this, t) || this;
            return c.onFinalize = o, c.shouldUnsubscribe = i, c._next = n ? function(e) {
                try {
                    n(e)
                } catch (e) {
                    t.error(e)
                }
            } : e.prototype._next, c._error = a ? function(e) {
                try {
                    a(e)
                } catch (e) {
                    t.error(e)
                } finally {
                    this.unsubscribe()
                }
            } : e.prototype._error, c._complete = r ? function() {
                try {
                    r()
                } catch (e) {
                    t.error(e)
                } finally {
                    this.unsubscribe()
                }
            } : e.prototype._complete, c
        }
        return t(n, e), n.prototype.unsubscribe = function() {
            var t;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var n = this.closed;
                e.prototype.unsubscribe.call(this), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
            }
        }, n
    }(F),
    X = O((function(e) {
        return function() {
            e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
        }
    })),
    K = function(e) {
        function n() {
            var t = e.call(this) || this;
            return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t
        }
        return t(n, e), n.prototype.lift = function(e) {
            var t = new J(this, this);
            return t.operator = e, t
        }, n.prototype._throwIfClosed = function() {
            if (this.closed) throw new X
        }, n.prototype.next = function(e) {
            var t = this;
            R((function() {
                var n, r;
                if (t._throwIfClosed(), !t.isStopped) {
                    t.currentObservers || (t.currentObservers = Array.from(t.observers));
                    try {
                        for (var o = a(t.currentObservers), i = o.next(); !i.done; i = o.next()) {
                            i.value.next(e)
                        }
                    } catch (e) {
                        n = {
                            error: e
                        }
                    } finally {
                        try {
                            i && !i.done && (r = o.return) && r.call(o)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                }
            }))
        }, n.prototype.error = function(e) {
            var t = this;
            R((function() {
                if (t._throwIfClosed(), !t.isStopped) {
                    t.hasError = t.isStopped = !0, t.thrownError = e;
                    for (var n = t.observers; n.length;) n.shift().error(e)
                }
            }))
        }, n.prototype.complete = function() {
            var e = this;
            R((function() {
                if (e._throwIfClosed(), !e.isStopped) {
                    e.isStopped = !0;
                    for (var t = e.observers; t.length;) t.shift().complete()
                }
            }))
        }, n.prototype.unsubscribe = function() {
            this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
        }, Object.defineProperty(n.prototype, "observed", {
            get: function() {
                var e;
                return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0
            },
            enumerable: !1,
            configurable: !0
        }), n.prototype._trySubscribe = function(t) {
            return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t)
        }, n.prototype._subscribe = function(e) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e)
        }, n.prototype._innerSubscribe = function(e) {
            var t = this,
                n = this,
                r = n.hasError,
                a = n.isStopped,
                o = n.observers;
            return r || a ? w : (this.currentObservers = null, o.push(e), new v((function() {
                t.currentObservers = null, b(o, e)
            })))
        }, n.prototype._checkFinalizedStatuses = function(e) {
            var t = this,
                n = t.hasError,
                r = t.thrownError,
                a = t.isStopped;
            n ? e.error(r) : a && e.complete()
        }, n.prototype.asObservable = function() {
            var e = new W;
            return e.source = this, e
        }, n.create = function(e, t) {
            return new J(e, t)
        }, n
    }(W),
    J = function(e) {
        function n(t, n) {
            var r = e.call(this) || this;
            return r.destination = t, r.source = n, r
        }
        return t(n, e), n.prototype.next = function(e) {
            var t, n;
            null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === n || n.call(t, e)
        }, n.prototype.error = function(e) {
            var t, n;
            null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === n || n.call(t, e)
        }, n.prototype.complete = function() {
            var e, t;
            null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e)
        }, n.prototype._subscribe = function(e) {
            var t, n;
            return null !== (n = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== n ? n : w
        }, n
    }(K),
    ee = function(e) {
        function n(t) {
            var n = e.call(this) || this;
            return n._value = t, n
        }
        return t(n, e), Object.defineProperty(n.prototype, "value", {
            get: function() {
                return this.getValue()
            },
            enumerable: !1,
            configurable: !0
        }), n.prototype._subscribe = function(t) {
            var n = e.prototype._subscribe.call(this, t);
            return !n.closed && t.next(this._value), n
        }, n.prototype.getValue = function() {
            var e = this,
                t = e.hasError,
                n = e.thrownError,
                r = e._value;
            if (t) throw n;
            return this._throwIfClosed(), r
        }, n.prototype.next = function(t) {
            e.prototype.next.call(this, this._value = t)
        }, n
    }(K),
    te = new W((function(e) {
        return e.complete()
    })),
    ne = function(e) {
        return e && "number" == typeof e.length && "function" != typeof e
    };
var re = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";

function ae(e) {
    if (e instanceof W) return e;
    if (null != e) {
        if (function(e) {
                return I(e[z])
            }(e)) return u = e, new W((function(e) {
            var t = u[z]();
            if (I(t.subscribe)) return t.subscribe(e);
            throw new TypeError("Provided object does not correctly implement Symbol.observable")
        }));
        if (ne(e)) return i = e, new W((function(e) {
            for (var t = 0; t < i.length && !e.closed; t++) e.next(i[t]);
            e.complete()
        }));
        if (I(null == (o = e) ? void 0 : o.then)) return n = e, new W((function(e) {
            n.then((function(t) {
                e.closed || (e.next(t), e.complete())
            }), (function(t) {
                return e.error(t)
            })).then(null, x)
        }));
        if (function(e) {
                return Symbol.asyncIterator && I(null == e ? void 0 : e[Symbol.asyncIterator])
            }(e)) return oe(e);
        if (function(e) {
                return I(null == e ? void 0 : e[re])
            }(e)) return t = e, new W((function(e) {
            var n, r;
            try {
                for (var o = a(t), i = o.next(); !i.done; i = o.next()) {
                    var c = i.value;
                    if (e.next(c), e.closed) return
                }
            } catch (e) {
                n = {
                    error: e
                }
            } finally {
                try {
                    i && !i.done && (r = o.return) && r.call(o)
                } finally {
                    if (n) throw n.error
                }
            }
            e.complete()
        }));
        if (function(e) {
                return I(null == e ? void 0 : e.getReader)
            }(e)) return oe(function(e) {
            return l(this, arguments, (function() {
                var t, n, a;
                return r(this, (function(r) {
                    switch (r.label) {
                        case 0:
                            t = e.getReader(), r.label = 1;
                        case 1:
                            r.trys.push([1, , 9, 10]), r.label = 2;
                        case 2:
                            return [4, c(t.read())];
                        case 3:
                            return n = r.sent(), a = n.value, n.done ? [4, c(void 0)] : [3, 5];
                        case 4:
                            return [2, r.sent()];
                        case 5:
                            return [4, c(a)];
                        case 6:
                            return [4, r.sent()];
                        case 7:
                            return r.sent(), [3, 2];
                        case 8:
                            return [3, 10];
                        case 9:
                            return t.releaseLock(), [7];
                        case 10:
                            return [2]
                    }
                }))
            }))
        }(e))
    }
    var t, n, o, i, u;
    throw function(e) {
        return new TypeError("You provided " + (null !== e && "object" == typeof e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
    }(e)
}

function oe(e) {
    return new W((function(t) {
        (function(e, t) {
            var a, o, i, c;
            return n(this, void 0, void 0, (function() {
                var n, l;
                return r(this, (function(r) {
                    switch (r.label) {
                        case 0:
                            r.trys.push([0, 5, 6, 11]), a = u(e), r.label = 1;
                        case 1:
                            return [4, a.next()];
                        case 2:
                            if ((o = r.sent()).done) return [3, 4];
                            if (n = o.value, t.next(n), t.closed) return [2];
                            r.label = 3;
                        case 3:
                            return [3, 1];
                        case 4:
                            return [3, 11];
                        case 5:
                            return l = r.sent(), i = {
                                error: l
                            }, [3, 11];
                        case 6:
                            return r.trys.push([6, , 9, 10]), o && !o.done && (c = a.return) ? [4, c.call(a)] : [3, 8];
                        case 7:
                            r.sent(), r.label = 8;
                        case 8:
                            return [3, 10];
                        case 9:
                            if (i) throw i.error;
                            return [7];
                        case 10:
                            return [7];
                        case 11:
                            return t.complete(), [2]
                    }
                }))
            }))
        })(e, t).catch((function(e) {
            return t.error(e)
        }))
    }))
}
var ie = O((function(e) {
    return function() {
        e(this), this.name = "EmptyError", this.message = "no elements in sequence"
    }
}));

function ce(e, t) {
    return q((function(n, r) {
        var a = 0;
        n.subscribe(Z(r, (function(n) {
            r.next(e.call(t, n, a++))
        })))
    }))
}
var le = Array.isArray;

function ue(e) {
    return ce((function(t) {
        return function(e, t) {
            return le(t) ? e.apply(void 0, i([], o(t))) : e(t)
        }(e, t)
    }))
}

function se(e, t, n) {
    return void 0 === n && (n = 1 / 0), I(t) ? se((function(n, r) {
        return ce((function(e, a) {
            return t(n, e, r, a)
        }))(ae(e(n, r)))
    }), n) : ("number" == typeof t && (n = t), q((function(t, r) {
        return function(e, t, n, r, a, o, i, c) {
            var l = [],
                u = 0,
                s = 0,
                f = !1,
                C = function() {
                    !f || l.length || u || t.complete()
                },
                h = function(e) {
                    return u < r ? d(e) : l.push(e)
                },
                d = function(e) {
                    o && t.next(e), u++;
                    var c = !1;
                    ae(n(e, s++)).subscribe(Z(t, (function(e) {
                        null == a || a(e), o ? h(e) : t.next(e)
                    }), (function() {
                        c = !0
                    }), void 0, (function() {
                        if (c) try {
                            u--;
                            for (var e = function() {
                                    var e = l.shift();
                                    i ? function(e, t, n, r, a) {
                                        void 0 === r && (r = 0), void 0 === a && (a = !1);
                                        var o = t.schedule((function() {
                                            n(), a ? e.add(this.schedule(null, r)) : this.unsubscribe()
                                        }), r);
                                        e.add(o)
                                    }(t, i, (function() {
                                        return d(e)
                                    })) : d(e)
                                }; l.length && u < r;) e();
                            C()
                        } catch (e) {
                            t.error(e)
                        }
                    })))
                };
            return e.subscribe(Z(t, h, (function() {
                    f = !0, C()
                }))),
                function() {
                    null == c || c()
                }
        }(t, r, e, n)
    })))
}
var fe = ["addListener", "removeListener"],
    Ce = ["addEventListener", "removeEventListener"],
    he = ["on", "off"];

function de(e, t, n, r) {
    if (I(n) && (r = n, n = void 0), r) return de(e, t, n).pipe(ue(r));
    var a = o(function(e) {
            return I(e.addEventListener) && I(e.removeEventListener)
        }(e) ? Ce.map((function(r) {
            return function(a) {
                return e[r](t, a, n)
            }
        })) : function(e) {
            return I(e.addListener) && I(e.removeListener)
        }(e) ? fe.map(me(e, t)) : function(e) {
            return I(e.on) && I(e.off)
        }(e) ? he.map(me(e, t)) : [], 2),
        i = a[0],
        c = a[1];
    if (!i && ne(e)) return se((function(e) {
        return de(e, t, n)
    }))(ae(e));
    if (!i) throw new TypeError("Invalid event target");
    return new W((function(e) {
        var t = function() {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            return e.next(1 < t.length ? t : t[0])
        };
        return i(t),
            function() {
                return c(t)
            }
    }))
}

function me(e, t) {
    return function(n) {
        return function(r) {
            return e[n](t, r)
        }
    }
}

function pe(e, t) {
    return q((function(n, r) {
        var a = 0;
        n.subscribe(Z(r, (function(n) {
            return e.call(t, n, a++) && r.next(n)
        })))
    }))
}

function Be(e) {
    return q((function(t, n) {
        var r = !1;
        t.subscribe(Z(n, (function(e) {
            r = !0, n.next(e)
        }), (function() {
            r || n.next(e), n.complete()
        })))
    }))
}

function ye(e) {
    return e <= 0 ? function() {
        return te
    } : q((function(t, n) {
        var r = 0;
        t.subscribe(Z(n, (function(t) {
            ++r <= e && (n.next(t), e <= r && n.complete())
        })))
    }))
}

function Ie(e) {
    return void 0 === e && (e = Oe), q((function(t, n) {
        var r = !1;
        t.subscribe(Z(n, (function(e) {
            r = !0, n.next(e)
        }), (function() {
            return r ? n.complete() : n.error(e())
        })))
    }))
}

function Oe() {
    return new ie
}

function Se(e) {
    return q((function(t, n) {
        ae(e).subscribe(Z(n, (function() {
            return n.complete()
        }), E)), !n.closed && t.subscribe(n)
    }))
}

function be(e, t, n) {
    var r = I(e) || t || n ? {
        next: e,
        error: t,
        complete: n
    } : e;
    return r ? q((function(e, t) {
        var n;
        null === (n = r.subscribe) || void 0 === n || n.call(r);
        var a = !0;
        e.subscribe(Z(t, (function(e) {
            var n;
            null === (n = r.next) || void 0 === n || n.call(r, e), t.next(e)
        }), (function() {
            var e;
            a = !1, null === (e = r.complete) || void 0 === e || e.call(r), t.complete()
        }), (function(e) {
            var n;
            a = !1, null === (n = r.error) || void 0 === n || n.call(r, e), t.error(e)
        }), (function() {
            var e, t;
            a && (null === (e = r.unsubscribe) || void 0 === e || e.call(r)), null === (t = r.finalize) || void 0 === t || t.call(r)
        })))
    })) : Q
}

function ve(e) {
    return ve = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, ve(e)
}
var we = "\nLIS3DH Registers\n0x07.0\n0x08.0\n0x09.0\n0x0A.0\n0x0B.0\n0x0C.0\n0x0D.0\n0x0E.0\n0x0F.33\n\n0x1F.0\n0x20.8\n0x21.0\n0x22.0\n0x23.18\n0x24.0\n0x25.0\n0x26.0\n0x27.0\n0x28.0\n0x29.0\n0x2A.0\n0x2B.0\n0x2C.0\n0x2D.0\n0x2E.0\n0x2F.20\n0x30.0\n0x31.0\n0x32.0\n0x33.0\n\n0x38.0\n0x39.0\n0x3A.0\n0x3B.0\n0x3C.0\n0x3D.0\n",
    ge = "\nLIS3DH Registers\n0x07 00\n0x08 00\n0x09 00\n0x0A 00\n0x0B 00\n0x0C 00\n0x0D 00\n0x0E 00\n0x0F 33\n\n0x1F 00\n0x20 08\n0x21 00\n0x22 00\n0x23 18\n0x24 00\n0x25 00\n0x26 00\n0x27 00\n0x28 00\n0x29 00\n0x2A 00\n0x2B 00\n0x2C 00\n0x2D 00\n0x2E 00\n0x2F 20\n0x30 00\n0x31 00\n0x32 00\n0x33 00\n\n0x38 00\n0x39 00\n0x3A 00\n0x3B 00\n0x3C 00\n0x3D 00\n",
    Pe = "\nBoard ADS Registers\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\n",
    ke = "\nDaisy ADS Registers\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\n",
    De = {
        OBCIChannelOff1: "1",
        OBCIChannelOff2: "2",
        OBCIChannelOff3: "3",
        OBCIChannelOff4: "4",
        OBCIChannelOff5: "5",
        OBCIChannelOff6: "6",
        OBCIChannelOff7: "7",
        OBCIChannelOff8: "8",
        OBCIChannelOff9: "q",
        OBCIChannelOff10: "w",
        OBCIChannelOff11: "e",
        OBCIChannelOff12: "r",
        OBCIChannelOff13: "t",
        OBCIChannelOff14: "y",
        OBCIChannelOff15: "u",
        OBCIChannelOff16: "i",
        commandChannelOff: function(e) {
            return new Promise((function(t, n) {
                switch (e) {
                    case 1:
                        t("1");
                        break;
                    case 2:
                        t("2");
                        break;
                    case 3:
                        t("3");
                        break;
                    case 4:
                        t("4");
                        break;
                    case 5:
                        t("5");
                        break;
                    case 6:
                        t("6");
                        break;
                    case 7:
                        t("7");
                        break;
                    case 8:
                        t("8");
                        break;
                    case 9:
                        t("q");
                        break;
                    case 10:
                        t("w");
                        break;
                    case 11:
                        t("e");
                        break;
                    case 12:
                        t("r");
                        break;
                    case 13:
                        t("t");
                        break;
                    case 14:
                        t("y");
                        break;
                    case 15:
                        t("u");
                        break;
                    case 16:
                        t("i");
                        break;
                    default:
                        n(Error("Error [commandChannelOff]: Invalid Channel Number"))
                }
            }))
        },
        OBCIChannelOn1: "!",
        OBCIChannelOn2: "@",
        OBCIChannelOn3: "#",
        OBCIChannelOn4: "$",
        OBCIChannelOn5: "%",
        OBCIChannelOn6: "^",
        OBCIChannelOn7: "&",
        OBCIChannelOn8: "*",
        OBCIChannelOn9: "Q",
        OBCIChannelOn10: "W",
        OBCIChannelOn11: "E",
        OBCIChannelOn12: "R",
        OBCIChannelOn13: "T",
        OBCIChannelOn14: "Y",
        OBCIChannelOn15: "U",
        OBCIChannelOn16: "I",
        commandChannelOn: function(e) {
            return new Promise((function(t, n) {
                switch (e) {
                    case 1:
                        t("!");
                        break;
                    case 2:
                        t("@");
                        break;
                    case 3:
                        t("#");
                        break;
                    case 4:
                        t("$");
                        break;
                    case 5:
                        t("%");
                        break;
                    case 6:
                        t("^");
                        break;
                    case 7:
                        t("&");
                        break;
                    case 8:
                        t("*");
                        break;
                    case 9:
                        t("Q");
                        break;
                    case 10:
                        t("W");
                        break;
                    case 11:
                        t("E");
                        break;
                    case 12:
                        t("R");
                        break;
                    case 13:
                        t("T");
                        break;
                    case 14:
                        t("Y");
                        break;
                    case 15:
                        t("U");
                        break;
                    case 16:
                        t("I");
                        break;
                    default:
                        n(Error("Error [commandChannelOn]: Invalid Channel Number"))
                }
            }))
        },
        OBCITestSignalConnectToDC: "p",
        OBCITestSignalConnectToGround: "0",
        OBCITestSignalConnectToPulse1xFast: "=",
        OBCITestSignalConnectToPulse1xSlow: "-",
        OBCITestSignalConnectToPulse2xFast: "]",
        OBCITestSignalConnectToPulse2xSlow: "[",
        getTestSignalCommand: function(e) {
            return new Promise((function(t, n) {
                switch (e) {
                    case "dc":
                        t("p");
                        break;
                    case "ground":
                        t("0");
                        break;
                    case "pulse1xFast":
                        t("=");
                        break;
                    case "pulse1xSlow":
                        t("-");
                        break;
                    case "pulse2xFast":
                        t("]");
                        break;
                    case "pulse2xSlow":
                        t("[");
                        break;
                    case "none":
                        t("d");
                        break;
                    default:
                        n(Error("Invalid selection! Check your spelling."))
                }
            }))
        },
        OBCIChannelCmdADCNormal: "0",
        OBCIChannelCmdADCShorted: "1",
        OBCIChannelCmdADCBiasDRP: "6",
        OBCIChannelCmdADCBiasDRN: "7",
        OBCIChannelCmdADCBiasMethod: "2",
        OBCIChannelCmdADCMVDD: "3",
        OBCIChannelCmdADCTemp: "4",
        OBCIChannelCmdADCTestSig: "5",
        OBCIChannelCmdBiasInclude: "1",
        OBCIChannelCmdBiasRemove: "0",
        OBCIChannelCmdChannel1: "1",
        OBCIChannelCmdChannel2: "2",
        OBCIChannelCmdChannel3: "3",
        OBCIChannelCmdChannel4: "4",
        OBCIChannelCmdChannel5: "5",
        OBCIChannelCmdChannel6: "6",
        OBCIChannelCmdChannel7: "7",
        OBCIChannelCmdChannel8: "8",
        OBCIChannelCmdChannel9: "Q",
        OBCIChannelCmdChannel10: "W",
        OBCIChannelCmdChannel11: "E",
        OBCIChannelCmdChannel12: "R",
        OBCIChannelCmdChannel13: "T",
        OBCIChannelCmdChannel14: "Y",
        OBCIChannelCmdChannel15: "U",
        OBCIChannelCmdChannel16: "I",
        commandChannelForCmd: Re,
        OBCIChannelCmdGain1: "0",
        OBCIChannelCmdGain2: "1",
        OBCIChannelCmdGain4: "2",
        OBCIChannelCmdGain6: "3",
        OBCIChannelCmdGain8: "4",
        OBCIChannelCmdGain12: "5",
        OBCIChannelCmdGain24: "6",
        commandForGain: Te,
        gainForCommand: function(e) {
            switch (String(e)) {
                case "0":
                    return 1;
                case "1":
                    return 2;
                case "2":
                    return 4;
                case "3":
                    return 6;
                case "4":
                    return 8;
                case "5":
                    return 12;
                case "6":
                    return 24;
                default:
                    throw new Error("Invalid gain setting of ".concat(e, " gain must be (0,1,2,3,4,5,6)"))
            }
        },
        OBCIChannelCmdLatch: "X",
        OBCIChannelCmdPowerOff: "1",
        OBCIChannelCmdPowerOn: "0",
        OBCIChannelCmdSet: "x",
        OBCIChannelCmdSRB1Connect: "1",
        OBCIChannelCmdSRB1Diconnect: "0",
        OBCIChannelCmdSRB2Connect: "1",
        OBCIChannelCmdSRB2Diconnect: "0",
        channelSettingsObjectDefault: Fe,
        channelSettingsArrayInit: function(e) {
            for (var t = [], n = 0; n < e; n++) t.push(Fe(n));
            return t
        },
        OBCIStringADCNormal: "normal",
        OBCIStringADCShorted: "shorted",
        OBCIStringADCBiasMethod: "biasMethod",
        OBCIStringADCMvdd: "mvdd",
        OBCIStringADCTemp: "temp",
        OBCIStringADCTestSig: "testSig",
        OBCIStringADCBiasDrp: "biasDrp",
        OBCIStringADCBiasDrn: "biasDrn",
        commandForADCString: Ne,
        inputTypeForCommand: function(e) {
            switch (String(e)) {
                case "0":
                    return "normal";
                case "1":
                    return "shorted";
                case "2":
                    return "biasMethod";
                case "3":
                    return "mvdd";
                case "4":
                    return "temp";
                case "5":
                    return "testSig";
                case "6":
                    return "biasDrp";
                case "7":
                    return "biasDrn";
                default:
                    throw new Error("Invalid input type, must be less than 8")
            }
        },
        OBCIChannelDefaultAllSet: "d",
        OBCIChannelDefaultAllGet: "D",
        OBCIChannelImpedanceLatch: "Z",
        OBCIChannelImpedanceSet: "z",
        OBCIChannelImpedanceTestSignalApplied: "1",
        OBCIChannelImpedanceTestSignalAppliedNot: "0",
        OBCISDLogForHour1: "G",
        OBCISDLogForHour2: "H",
        OBCISDLogForHour4: "J",
        OBCISDLogForHour12: "K",
        OBCISDLogForHour24: "L",
        OBCISDLogForMin5: "A",
        OBCISDLogForMin15: "S",
        OBCISDLogForMin30: "F",
        OBCISDLogForSec14: "a",
        OBCISDLogStop: "j",
        OBCIStringSDHour1: "1hour",
        OBCIStringSDHour2: "2hour",
        OBCIStringSDHour4: "4hour",
        OBCIStringSDHour12: "12hour",
        OBCIStringSDHour24: "24hour",
        OBCIStringSDMin5: "5min",
        OBCIStringSDMin15: "15min",
        OBCIStringSDMin30: "30min",
        OBCIStringSDSec14: "14sec",
        sdSettingForString: function(e) {
            return new Promise((function(t, n) {
                switch (e) {
                    case "1hour":
                        t("G");
                        break;
                    case "2hour":
                        t("H");
                        break;
                    case "4hour":
                        t("J");
                        break;
                    case "12hour":
                        t("K");
                        break;
                    case "24hour":
                        t("L");
                        break;
                    case "5min":
                        t("A");
                        break;
                    case "15min":
                        t("S");
                        break;
                    case "30min":
                        t("F");
                        break;
                    case "14sec":
                        t("a");
                        break;
                    default:
                        n(Error(TypeError))
                }
            }))
        },
        OBCIStreamStart: "b",
        OBCIStreamStop: "s",
        OBCIAccelStart: "n",
        OBCIAccelStop: "N",
        OBCIMiscQueryRegisterSettings: "?",
        OBCIMiscQueryRegisterSettingsChannel1: "CH1SET",
        OBCIMiscQueryRegisterSettingsChannel2: "CH2SET",
        OBCIMiscQueryRegisterSettingsChannel3: "CH3SET",
        OBCIMiscQueryRegisterSettingsChannel4: "CH4SET",
        OBCIMiscQueryRegisterSettingsChannel5: "CH5SET",
        OBCIMiscQueryRegisterSettingsChannel6: "CH6SET",
        OBCIMiscQueryRegisterSettingsChannel7: "CH7SET",
        OBCIMiscQueryRegisterSettingsChannel8: "CH8SET",
        channelSettingsKeyForChannel: function(e) {
            return new Promise((function(t, n) {
                switch (e) {
                    case 1:
                        t(new Buffer("CH1SET"));
                        break;
                    case 2:
                        t(new Buffer("CH2SET"));
                        break;
                    case 3:
                        t(new Buffer("CH3SET"));
                        break;
                    case 4:
                        t(new Buffer("CH4SET"));
                        break;
                    case 5:
                        t(new Buffer("CH5SET"));
                        break;
                    case 6:
                        t(new Buffer("CH6SET"));
                        break;
                    case 7:
                        t(new Buffer("CH7SET"));
                        break;
                    case 8:
                        t(new Buffer("CH8SET"));
                        break;
                    default:
                        n(Error("Invalid channel number"))
                }
            }))
        },
        OBCIMiscSoftReset: "v",
        OBCIChannelMaxNumber8: "c",
        OBCIChannelMaxNumber16: "C",
        OBCIChannelMaxNumber8NoDaisyToRemove: "",
        OBCIChannelMaxNumber8SuccessDaisyRemoved: "daisy removed",
        OBCIChannelMaxNumber16DaisyAlreadyAttached: "16",
        OBCIChannelMaxNumber16DaisyAttached: "daisy attached16",
        OBCIChannelMaxNumber16NoDaisyAttached: "no daisy to attach!8",
        OBCIFilterDisable: "g",
        OBCIFilterEnable: "f",
        OBCITrigger: "`",
        OBCINumberOfChannelsCyton: 8,
        OBCINumberOfChannelsCytonBLE: 2,
        OBCINumberOfChannelsDaisy: 16,
        OBCINumberOfChannelsDefault: 8,
        OBCINumberOfChannelsGanglion: 4,
        OBCIBoardCyton: "cyton",
        OBCIBoardCytonBLE: "cytonBLE",
        OBCIBoardDaisy: "daisy",
        OBCIBoardDefault: "default",
        OBCIBoardGanglion: "ganglion",
        OBCIBoardNone: "none",
        numberOfChannelsForBoardType: function(e) {
            switch (e) {
                case "daisy":
                    return 16;
                case "ganglion":
                    return 4;
                case "none":
                    return 0;
                case "cytonBLE":
                    return 2;
                default:
                    return 8
            }
        },
        boardTypeForNumberOfChannels: function(e) {
            switch (e) {
                case 16:
                    return "daisy";
                case 4:
                    return "ganglion";
                case 0:
                    return "none";
                case 2:
                    return "cytonBLE";
                default:
                    return "cyton"
            }
        },
        OBCISampleRate1000: 1e3,
        OBCISampleRate125: 125,
        OBCISampleRate12800: 12800,
        OBCISampleRate1600: 1600,
        OBCISampleRate16000: 16e3,
        OBCISampleRate200: 200,
        OBCISampleRate2000: 2e3,
        OBCISampleRate250: 250,
        OBCISampleRate25600: 25600,
        OBCISampleRate3200: 3200,
        OBCISampleRate400: 400,
        OBCISampleRate4000: 4e3,
        OBCISampleRate500: 500,
        OBCISampleRate6400: 6400,
        OBCISampleRate800: 800,
        OBCISampleRate8000: 8e3,
        OBCISampleNumberMax: 255,
        OBCIPacketSize: 33,
        OBCIPacketSizeBLECyton: 20,
        OBCIPacketSizeBLERaw: 12,
        OBCIByteStart: 160,
        OBCIByteStop: 192,
        OBCIErrorInvalidByteLength: "Invalid Packet Byte Length",
        OBCIErrorInvalidByteStart: "Invalid Start Byte",
        OBCIErrorInvalidByteStop: "Invalid Stop Byte",
        OBCIErrorInvalidData: "Invalid data - try again",
        OBCIErrorInvalidType: "Invalid type - check comments for input type",
        OBCIErrorMissingRegisterSetting: "Missing register setting",
        OBCIErrorMissingRequiredProperty: "Missing property in JSON",
        OBCIErrorNobleAlreadyScanning: "Scan already under way",
        OBCIErrorNobleNotAlreadyScanning: "No scan started",
        OBCIErrorNobleNotInPoweredOnState: "Please turn blue tooth on.",
        OBCIErrorTimeSyncIsNull: "'this.sync.curSyncObj' must not be null",
        OBCIErrorTimeSyncNoComma: "Missed the time sync sent confirmation. Try sync again",
        OBCIErrorUndefinedOrNullInput: "Undefined or Null Input",
        OBCIMasterBufferSize: 4096,
        OBCILeadOffDriveInAmps: 6e-9,
        OBCILeadOffFrequencyHz: 31.5,
        getChannelSetter: function(e, t, n, r, a, o, i) {
            var c, l, u, s;
            return new Promise((function(f, C) {
                xe(e) || C(Error("channelNumber must be of type 'number' ")), Ee(t) || C(Error("powerDown must be of type 'boolean' ")), xe(n) || C(Error("gain must be of type 'number' ")), Ae(r) || C(Error("inputType must be of type 'string' ")), Ee(a) || C(Error("bias must be of type 'boolean' ")), Ee(o) || C(Error("srb1 must be of type 'boolean' ")), Ee(i) || C(Error("srb2 must be of type 'boolean' "));
                var h = Re(e).catch((function(e) {
                    return C(e)
                }));
                c = t ? "1" : "0";
                var d = Te(n).catch((function(e) {
                        return C(e)
                    })),
                    m = Ne(r).catch((function(e) {
                        return C(e)
                    }));
                l = a ? "1" : "0", u = o ? "1" : "0", s = i ? "1" : "0";
                var p = {
                    channelNumber: e,
                    powerDown: t,
                    gain: n,
                    inputType: r,
                    bias: a,
                    srb2: o,
                    srb1: i
                };
                Promise.all([h, d, m]).then((function(e) {
                    var t = ["x", e[0], c, e[1], e[2], l, u, s, "X"];
                    f({
                        commandArray: t,
                        newChannelSettingsObject: p
                    })
                }))
            }))
        },
        getImpedanceSetter: function(e, t, n) {
            var r, a;
            return new Promise((function(o, i) {
                xe(e) || i(Error("channelNumber must be of type 'number' ")), Ee(t) || i(Error("pInputApplied must be of type 'boolean' ")), Ee(n) || i(Error("nInputApplied must be of type 'boolean' ")), a = t ? "1" : "0", r = n ? "1" : "0", Re(e).then((function(e) {
                    o(["z", e, a, r, "Z"])
                })).catch((function(e) {
                    return i(e)
                }))
            }))
        },
        getSampleRateSetter: function(e, t) {
            return new Promise((function(n, r) {
                if (!Ae(e)) return r(Error("board type must be of type 'string' "));
                if (!xe(t)) return r(Error("sampleRate must be of type 'number' "));
                var a;
                if (t = Math.floor(t), "cyton" === e || "daisy" === e) a = Ue;
                else {
                    if ("ganglion" !== e) return r(Error("boardType must be either ".concat("cyton", " or ").concat("ganglion")));
                    a = Le
                }
                a(t).then((function(e) {
                    n(["~", e])
                })).catch((function(e) {
                    return r(e)
                }))
            }))
        },
        getBoardModeSetter: function(e) {
            return new Promise((function(t, n) {
                if (!Ae(e)) return n(Error("board mode must be of type 'string' "));
                Me(e).then((function(e) {
                    t(["/", e])
                })).catch((function(e) {
                    return n(e)
                }))
            }))
        },
        OBCIWriteIntervalDelayMSLong: 50,
        OBCIWriteIntervalDelayMSNone: 0,
        OBCIWriteIntervalDelayMSShort: 10,
        OBCISyncTimeSent: ",",
        OBCISyncTimeSet: "<",
        OBCIRadioKey: 240,
        OBCIRadioCmdChannelGet: 0,
        OBCIRadioCmdChannelSet: 1,
        OBCIRadioCmdChannelSetOverride: 2,
        OBCIRadioCmdPollTimeGet: 3,
        OBCIRadioCmdPollTimeSet: 4,
        OBCIRadioCmdBaudRateSetDefault: 5,
        OBCIRadioCmdBaudRateSetFast: 6,
        OBCIRadioCmdSystemStatus: 7,
        OBCIImpedanceTextBad: "bad",
        OBCIImpedanceTextGood: "good",
        OBCIImpedanceTextInit: "init",
        OBCIImpedanceTextOk: "ok",
        OBCIImpedanceTextNone: "none",
        OBCIImpedanceThresholdBadMax: 1e6,
        OBCIImpedanceSeriesResistor: 2200,
        getTextForRawImpedance: function(e) {
            return e > 0 && e < 5e3 ? "good" : e > 5001 && e < 1e4 ? "ok" : e > 10001 && e < 1e6 ? "bad" : "none"
        },
        OBCISimulatorPortName: "OpenBCISimulator",
        OBCIStreamPacketStandardAccel: 0,
        OBCIStreamPacketStandardRawAux: 1,
        OBCIStreamPacketUserDefinedType: 2,
        OBCIStreamPacketAccelTimeSyncSet: 3,
        OBCIStreamPacketAccelTimeSynced: 4,
        OBCIStreamPacketRawAuxTimeSyncSet: 5,
        OBCIStreamPacketRawAuxTimeSynced: 6,
        OBCIStreamPacketImpedance: 7,
        isNumber: xe,
        isBoolean: Ee,
        isString: Ae,
        isUndefined: function(e) {
            return void 0 === e
        },
        isNull: function(e) {
            return null === e
        },
        OBCIPacketPositionStartByte: 0,
        OBCIPacketPositionStopByte: 32,
        OBCIPacketPositionStartAux: 26,
        OBCIPacketPositionStopAux: 31,
        OBCIPacketPositionChannelDataStart: 2,
        OBCIPacketPositionChannelDataStop: 25,
        OBCIPacketPositionSampleNumber: 1,
        OBCIPacketPositionTimeSyncAuxStart: 26,
        OBCIPacketPositionTimeSyncAuxStop: 28,
        OBCIPacketPositionTimeSyncTimeStart: 28,
        OBCIPacketPositionTimeSyncTimeStop: 32,
        OBCISimulatorLineNoiseHz60: "60Hz",
        OBCISimulatorLineNoiseHz50: "50Hz",
        OBCISimulatorLineNoiseNone: "none",
        OBCISimulatorFragmentationRandom: "random",
        OBCISimulatorFragmentationFullBuffers: "fullBuffers",
        OBCISimulatorFragmentationOneByOne: "oneByOne",
        OBCISimulatorFragmentationNone: "none",
        OBCIFirmwareV1: "v1",
        OBCIFirmwareV2: "v2",
        OBCIFirmwareV3: "v3",
        OBCIAccelAxisX: 7,
        OBCIAccelAxisY: 8,
        OBCIAccelAxisZ: 9,
        OBCIStreamPacketTimeByteSize: 4,
        OBCIParseDaisy: "Daisy",
        OBCIParseFailure: "Failure",
        OBCIParseFirmware: "v2",
        OBCIParseEOT: "$$$",
        OBCIParseSuccess: "Success",
        OBCIParsingChannelSettings: 2,
        OBCIParsingEOT: 4,
        OBCIParsingNormal: 3,
        OBCIParsingReset: 0,
        OBCIParsingTimeSyncSent: 1,
        OBCITimeoutProcessBytes: 500,
        OBCISimulatorRawAux: "rawAux",
        OBCISimulatorStandard: "standard",
        OBCIRadioChannelMax: 25,
        OBCIRadioChannelMin: 1,
        OBCIRadioPollTimeMax: 255,
        OBCIRadioPollTimeMin: 0,
        OBCITimeSyncArraySize: 10,
        OBCITimeSyncMultiplierWithSyncConf: .9,
        OBCITimeSyncMultiplierWithoutSyncConf: .75,
        OBCITimeSyncThresholdTransFailureMS: 10,
        OBCIBoardModeSet: "/",
        OBCIBoardModeCmdDefault: "0",
        OBCIBoardModeCmdDebug: "1",
        OBCIBoardModeCmdAnalog: "2",
        OBCIBoardModeCmdDigital: "3",
        OBCIBoardModeCmdGetCur: "/",
        OBCIBoardModeAnalog: "analog",
        OBCIBoardModeDefault: "default",
        OBCIBoardModeDebug: "debug",
        OBCIBoardModeDigital: "digital",
        OBCISampleRateSet: "~",
        OBCISampleRateCmdCyton16000: "0",
        OBCISampleRateCmdCyton8000: "1",
        OBCISampleRateCmdCyton4000: "2",
        OBCISampleRateCmdCyton2000: "3",
        OBCISampleRateCmdCyton1000: "4",
        OBCISampleRateCmdCyton500: "5",
        OBCISampleRateCmdCyton250: "6",
        OBCISampleRateCmdGang25600: "0",
        OBCISampleRateCmdGang12800: "1",
        OBCISampleRateCmdGang6400: "2",
        OBCISampleRateCmdGang3200: "3",
        OBCISampleRateCmdGang1600: "4",
        OBCISampleRateCmdGang800: "5",
        OBCISampleRateCmdGang400: "6",
        OBCISampleRateCmdGang200: "7",
        OBCISampleRateCmdGetCur: "~",
        OBCIWifiAttach: "{",
        OBCIWifiRemove: "}",
        OBCIWifiReset: ";",
        OBCIWifiStatus: ":",
        OBCIRadioBaudRateDefault: 115200,
        OBCIRadioBaudRateDefaultStr: "default",
        OBCIRadioBaudRateFast: 230400,
        OBCIRadioBaudRateFastStr: "fast",
        OBCIEmitterAccelerometer: "accelerometer",
        OBCIEmitterBlePoweredUp: "blePoweredOn",
        OBCIEmitterClose: "close",
        OBCIEmitterDroppedPacket: "droppedPacket",
        OBCIEmitterEot: "eot",
        OBCIEmitterError: "error",
        OBCIEmitterGanglionFound: "ganglionFound",
        OBCIEmitterHardSet: "hardSet",
        OBCIEmitterImpedance: "impedance",
        OBCIEmitterImpedanceArray: "impedanceArray",
        OBCIEmitterMessage: "message",
        OBCIEmitterQuery: "query",
        OBCIEmitterRawDataPacket: "rawDataPacket",
        OBCIEmitterReady: "ready",
        OBCIEmitterRFduino: "rfduino",
        OBCIEmitterSample: "sample",
        OBCIEmitterScanStopped: "scanStopped",
        OBCIEmitterSynced: "synced",
        OBCIEmitterWifiShield: "wifiShield",
        OBCIGanglionAccelAxisX: 1,
        OBCIGanglionAccelAxisY: 2,
        OBCIGanglionAccelAxisZ: 3,
        OBCIGanglionBleSearchTime: 2e4,
        OBCIGanglionByteIdUncompressed: 0,
        OBCIGanglionByteId18Bit: {
            max: 100,
            min: 1
        },
        OBCIGanglionByteId19Bit: {
            max: 200,
            min: 101
        },
        OBCIGanglionByteIdImpedanceChannel1: 201,
        OBCIGanglionByteIdImpedanceChannel2: 202,
        OBCIGanglionByteIdImpedanceChannel3: 203,
        OBCIGanglionByteIdImpedanceChannel4: 204,
        OBCIGanglionByteIdImpedanceChannelReference: 205,
        OBCIGanglionByteIdMultiPacket: 206,
        OBCIGanglionByteIdMultiPacketStop: 207,
        OBCIGanglionMCP3912Gain: 51,
        OBCIGanglionMCP3912Vref: 1.2,
        OBCIGanglionPacketSize: 20,
        OBCIGanglionPacket18Bit: {
            auxByte: 20,
            byteId: 0,
            dataStart: 1,
            dataStop: 19
        },
        OBCIGanglionPacket19Bit: {
            byteId: 0,
            dataStart: 1,
            dataStop: 20
        },
        OBCIGanglionPrefix: "Ganglion",
        OBCIGanglionSamplesPerPacket: 2,
        OBCIGanglionSyntheticDataEnable: "t",
        OBCIGanglionSyntheticDataDisable: "T",
        OBCIGanglionImpedanceStart: "z",
        OBCIGanglionImpedanceStop: "Z",
        OBCIGanglionScaleFactorPerCountVolts: 1.8699498629276494e-9,
        SimbleeUuidService: "fe84",
        SimbleeUuidReceive: "2d30c082f39f4ce6923f3484ea480596",
        SimbleeUuidSend: "2d30c083f39f4ce6923f3484ea480596",
        SimbleeUuidDisconnect: "2d30c084f39f4ce6923f3484ea480596",
        RFduinoUuidService: "2220",
        RFduinoUuidReceive: "2221",
        RFduinoUuidSend: "2222",
        RFduinoUuidSendTwo: "2223",
        OBCICytonBLESamplesPerPacket: 3,
        OBCIGanglionAccelScaleFactor: .016,
        OBCINobleEmitterPeripheralConnect: "connect",
        OBCINobleEmitterPeripheralDisconnect: "disconnect",
        OBCINobleEmitterPeripheralDiscover: "discover",
        OBCINobleEmitterPeripheralServicesDiscover: "servicesDiscover",
        OBCINobleEmitterServiceCharacteristicsDiscover: "characteristicsDiscover",
        OBCINobleEmitterServiceRead: "read",
        OBCINobleEmitterDiscover: "discover",
        OBCINobleEmitterScanStart: "scanStart",
        OBCINobleEmitterScanStop: "scanStop",
        OBCINobleEmitterStateChange: "stateChange",
        OBCINobleStatePoweredOn: "poweredOn",
        getPeripheralLocalNames: function(e) {
            return new Promise((function(t, n) {
                var r = [];
                return e.forEach((function(e) {
                    r.push(e.advertisement.localName)
                })), r.length > 0 ? t(r) : n(Error("No peripherals discovered with prefix equal to ".concat("Ganglion")))
            }))
        },
        getPeripheralWithLocalName: function(e, t) {
            return new Promise((function(n, r) {
                return "object" !== ve(e) ? r(Error("pArray must be of type Object")) : (e.forEach((function(e) {
                    if (e.advertisement.hasOwnProperty("localName") && e.advertisement.localName === t) return n(e)
                })), r(Error("No peripheral found with localName: ".concat(t))))
            }))
        },
        getVersionNumber: function(e) {
            return Number(e[1])
        },
        isPeripheralGanglion: function(e) {
            if (e && e.hasOwnProperty("advertisement") && null !== e.advertisement && e.advertisement.hasOwnProperty("localName") && void 0 !== e.advertisement.localName && null !== e.advertisement.localName && e.advertisement.localName.indexOf("Ganglion") > -1) return !0;
            return !1
        },
        commandSampleRateForCmdCyton: Ue,
        commandSampleRateForCmdGanglion: Le,
        commandBoardModeForMode: Me,
        rawDataToSampleObjectDefault: function(e) {
            void 0 === e && (e = 8);
            return {
                accelArray: [0, 0, 0],
                channelSettings: De.channelSettingsArrayInit(e),
                decompressedSamples: Ge(e),
                lastSampleNumber: 0,
                rawDataPacket: Buffer.alloc(33),
                rawDataPackets: [],
                scale: !0,
                sendCounts: !1,
                timeOffset: 0,
                verbose: !1
            }
        },
        OBCIProtocolBLE: "ble",
        OBCIProtocolSerial: "serial",
        OBCIProtocolWifi: "wifi",
        OBCIRegisterQueryAccelerometerFirmwareV1: we,
        OBCIRegisterQueryAccelerometerFirmwareV3: ge,
        OBCIRegisterQueryCyton: Pe,
        OBCIRegisterQueryCytonDaisy: ke,
        OBCIRegisterQueryNameMISC1: "MISC1",
        OBCIRegisterQueryNameBIASSENSP: "BIAS_SENSP",
        OBCIRegisterQueryNameCHnSET: ["CH1SET", "CH2SET", "CH3SET", "CH4SET", "CH5SET", "CH6SET", "CH7SET", "CH8SET"],
        OBCIRegisterQuerySizeCytonFirmwareV1: Pe.length + we.length,
        OBCIRegisterQuerySizeCytonDaisyFirmwareV1: Pe.length + ke.length + we.length,
        OBCIRegisterQuerySizeCytonFirmwareV3: Pe.length + ge.length,
        OBCIRegisterQuerySizeCytonDaisyFirmwareV3: Pe.length + ke.length + ge.length
    };

function xe(e) {
    return "number" == typeof e
}

function Ee(e) {
    return "boolean" == typeof e
}

function Ae(e) {
    return "string" == typeof e
}

function Ne(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case "normal":
                t("0");
                break;
            case "shorted":
                t("1");
                break;
            case "biasMethod":
                t("2");
                break;
            case "mvdd":
                t("3");
                break;
            case "temp":
                t("4");
                break;
            case "testSig":
                t("5");
                break;
            case "biasDrp":
                t("6");
                break;
            case "biasDrn":
                t("7");
                break;
            default:
                n(Error("Invalid ADC string"))
        }
    }))
}

function Te(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case 1:
                t("0");
                break;
            case 2:
                t("1");
                break;
            case 4:
                t("2");
                break;
            case 6:
                t("3");
                break;
            case 8:
                t("4");
                break;
            case 12:
                t("5");
                break;
            case 24:
                t("6");
                break;
            default:
                n(Error("Invalid gain setting of " + e + " gain must be (1,2,4,6,8,12,24)"))
        }
    }))
}

function Re(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case 1:
                t("1");
                break;
            case 2:
                t("2");
                break;
            case 3:
                t("3");
                break;
            case 4:
                t("4");
                break;
            case 5:
                t("5");
                break;
            case 6:
                t("6");
                break;
            case 7:
                t("7");
                break;
            case 8:
                t("8");
                break;
            case 9:
                t("Q");
                break;
            case 10:
                t("W");
                break;
            case 11:
                t("E");
                break;
            case 12:
                t("R");
                break;
            case 13:
                t("T");
                break;
            case 14:
                t("Y");
                break;
            case 15:
                t("U");
                break;
            case 16:
                t("I");
                break;
            default:
                n(Error("Invalid channel number"))
        }
    }))
}

function Fe(e) {
    return {
        channelNumber: e,
        powerDown: !1,
        gain: 24,
        inputType: "normal",
        bias: !0,
        srb2: !0,
        srb1: !1
    }
}

function Ge(e) {
    for (var t = [], n = 0; n < 3; n++) t.push(new Array(e));
    return t
}

function Ue(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case 16e3:
                t("0");
                break;
            case 8e3:
                t("1");
                break;
            case 4e3:
                t("2");
                break;
            case 2e3:
                t("3");
                break;
            case 1e3:
                t("4");
                break;
            case 500:
                t("5");
                break;
            case 250:
                t("6");
                break;
            default:
                n(Error("Invalid sample rate"))
        }
    }))
}

function Le(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case 25600:
                t("0");
                break;
            case 12800:
                t("1");
                break;
            case 6400:
                t("2");
                break;
            case 3200:
                t("3");
                break;
            case 1600:
                t("4");
                break;
            case 800:
                t("5");
                break;
            case 400:
                t("6");
                break;
            case 200:
                t("7");
                break;
            default:
                n(Error("Invalid sample rate"))
        }
    }))
}

function Me(e) {
    return new Promise((function(t, n) {
        switch (e) {
            case "default":
                t("0");
                break;
            case "debug":
                t("1");
                break;
            case "analog":
                t("2");
                break;
            case "digital":
                t("3");
                break;
            default:
                n(Error("Invalid sample rate"))
        }
    }))
}
var _e = .002 / Math.pow(2, 4),
    je = {
        extractRawDataPackets: function(e) {
            if (!e) return {
                buffer: e,
                rawDataPackets: []
            };
            var t = e.length,
                n = [];
            if (t < De.OBCIPacketSize) return {
                buffer: e,
                rawDataPackets: n
            };
            for (var r = 0; r <= t - De.OBCIPacketSize;) {
                if (e[r] === De.OBCIByteStart && St(e[r + De.OBCIPacketSize - 1])) {
                    var a;
                    a = Uint8Array.from(e.slice(r, r + De.OBCIPacketSize)), n.push(a);
                    var o = void 0;
                    o = r > 0 ? Uint8Array.concat([Uint8Array.from(e.slice(0, r)), Uint8Array.from(e.slice(r + De.OBCIPacketSize))]) : Uint8Array.from(e.slice(De.OBCIPacketSize)), e = 0 === o.length ? null : Uint8Array.from(o), r = -1, t -= De.OBCIPacketSize
                }
                r++
            }
            return {
                buffer: e,
                rawDataPackets: n
            }
        },
        extractRawBLEDataPackets: function(e) {
            var t = [];
            if (De.isNull(e)) return t;
            if (e.byteLength !== De.OBCIPacketSizeBLECyton) return t;
            var n = [0, 0, 0];
            n[0] = e[1], n[1] = n[0] + 1, n[1] > 255 && (n[1] -= 256), n[2] = n[1] + 1, n[2] > 255 && (n[2] -= 256);
            for (var r = 0; r < De.OBCICytonBLESamplesPerPacket; r++) {
                var a = je.samplePacketZero(n[r]);
                a[0] = De.OBCIByteStart, a[De.OBCIPacketPositionStopByte] = e[0], e.copy(a, De.OBCIPacketPositionChannelDataStart, De.OBCIPacketPositionChannelDataStart + 6 * r, De.OBCIPacketPositionChannelDataStart + 6 + 6 * r), t.push(a)
            }
            return t
        },
        transformRawDataPacketToSample: Ke,
        transformRawDataPacketsToSample: function(e) {
            for (var t = [], n = 0; n < e.rawDataPackets.length; n++) {
                e.rawDataPacket = e.rawDataPackets[n];
                var r = Ke(e);
                t.push(r), r.hasOwnProperty("sampleNumber") ? e.lastSampleNumber = r.sampleNumber : r.hasOwnProperty("impedanceValue") || (e.lastSampleNumber = e.rawDataPacket[De.OBCIPacketPositionSampleNumber])
            }
            return t
        },
        convertGanglionArrayToBuffer: function(e, t) {
            for (var n = 0; n < De.OBCINumberOfChannelsGanglion; n++) t.writeInt16BE(e[n] >> 8, 3 * n), t.writeInt8(255 & e[n], 3 * n + 2)
        },
        getRawPacketType: ft,
        getFromTimePacketAccel: ot,
        getFromTimePacketTime: at,
        getFromTimePacketRawAux: it,
        ganglionFillRawDataPacket: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket) || De.isUndefined(e.data) || De.isNull(e.data)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (!e.hasOwnProperty("sampleNumber")) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            if (e.data.byteLength !== De.OBCIPacketSizeBLERaw) throw new Error(De.OBCIErrorInvalidByteLength);
            e.data.copy(e.rawDataPacket, De.OBCIPacketPositionChannelDataStart), e.rawDataPacket[De.OBCIPacketPositionSampleNumber] = e.sampleNumber, e.rawDataPacket[De.OBCIPacketPositionStartByte] = De.OBCIByteStart, e.rawDataPacket[De.OBCIPacketPositionStopByte] = De.OBCIStreamPacketStandardRawAux
        },
        parsePacketStandardAccel: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            if (e.rawDataPacket[0] !== De.OBCIByteStart) throw new Error(De.OBCIErrorInvalidByteStart);
            var t = {};
            (De.isUndefined(e.scale) || De.isNull(e.scale)) && (e.scale = !0);
            e.scale ? t.accelData = ct(e.rawDataPacket.slice(De.OBCIPacketPositionStartAux, De.OBCIPacketPositionStopAux + 1)) : t.accelDataCounts = lt(e.rawDataPacket.slice(De.OBCIPacketPositionStartAux, De.OBCIPacketPositionStopAux + 1));
            e.scale ? t.channelData = ut(e) : t.channelDataCounts = st(e);
            return t.auxData = Uint8Array.from(e.rawDataPacket.slice(De.OBCIPacketPositionStartAux, De.OBCIPacketPositionStopAux + 1)), t.sampleNumber = e.rawDataPacket[De.OBCIPacketPositionSampleNumber], t.startByte = e.rawDataPacket[0], t.stopByte = e.rawDataPacket[De.OBCIPacketPositionStopByte], t.valid = !0, t.timestamp = Date.now(), t.boardTime = 0, t
        },
        parsePacketStandardRawAux: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            if (e.rawDataPacket[0] !== De.OBCIByteStart) throw new Error(De.OBCIErrorInvalidByteStart);
            var t = {};
            (De.isUndefined(e.scale) || De.isNull(e.scale)) && (e.scale = !0);
            e.scale ? t.channelData = ut(e) : t.channelDataCounts = st(e);
            return t.auxData = Uint8Array.from(e.rawDataPacket.slice(De.OBCIPacketPositionStartAux, De.OBCIPacketPositionStopAux + 1)), t.sampleNumber = e.rawDataPacket[De.OBCIPacketPositionSampleNumber], t.startByte = e.rawDataPacket[0], t.stopByte = e.rawDataPacket[De.OBCIPacketPositionStopByte], t.valid = !0, t.timestamp = Date.now(), t.boardTime = 0, t
        },
        parsePacketTimeSyncedAccel: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            if (e.rawDataPacket[0] !== De.OBCIByteStart) throw new Error(De.OBCIErrorInvalidByteStart);
            var t = {};
            t.sampleNumber = e.rawDataPacket[De.OBCIPacketPositionSampleNumber], t.startByte = e.rawDataPacket[0], t.stopByte = e.rawDataPacket[De.OBCIPacketPositionStopByte], t.boardTime = at(e.rawDataPacket), e.hasOwnProperty("timeOffset") ? t.timestamp = t.boardTime + e.timeOffset : t.timestamp = Date.now();
            t.auxData = it(e.rawDataPacket), (De.isUndefined(e.scale) || De.isNull(e.scale)) && (e.scale = !0);
            e.scale ? t.channelData = ut(e) : t.channelDataCounts = st(e);
            ot(e) && (e.scale ? t.accelData = e.accelArray : t.accelDataCounts = e.accelArray);
            return t.valid = !0, t
        },
        parsePacketTimeSyncedRawAux: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            if (e.rawDataPacket[0] !== De.OBCIByteStart) throw new Error(De.OBCIErrorInvalidByteStart);
            var t = {};
            t.sampleNumber = e.rawDataPacket[De.OBCIPacketPositionSampleNumber], t.startByte = e.rawDataPacket[0], t.stopByte = e.rawDataPacket[De.OBCIPacketPositionStopByte], t.boardTime = at(e.rawDataPacket), e.hasOwnProperty("timeOffset") ? t.timestamp = t.boardTime + e.timeOffset : t.timestamp = Date.now();
            t.auxData = it(e.rawDataPacket), (De.isUndefined(e.scale) || De.isNull(e.scale)) && (e.scale = !0);
            e.scale ? t.channelData = ut(e) : t.channelDataCounts = st(e);
            return t.valid = !0, t
        },
        parsePacketImpedance: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.rawDataPacket) || De.isNull(e.rawDataPacket)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
            var t = {};
            t.channelNumber = e.rawDataPacket[1], 5 === t.channelNumber && (t.channelNumber = 0);
            return t.impedanceValue = Number(e.rawDataPacket.toString().match(/\d+/)[0]), t
        },
        convertSampleToPacketStandard: function(e) {
            var t = new Uint8Array(De.OBCIPacketSize);
            t.fill(0), t[0] = De.OBCIByteStart, t[1] = e.sampleNumber;
            for (var n = 0; n < De.OBCINumberOfChannelsDefault; n++) {
                mt(e.channelData[n]).copy(t, 2 + 3 * n)
            }
            for (var r = 0; r < 3; r++) {
                pt(e.auxData[r]).copy(t, De.OBCIPacketSize - 1 - 6 + 2 * r)
            }
            return t[De.OBCIPacketSize - 1] = De.OBCIByteStop, t
        },
        convertSampleToPacketRawAux: function(e, t) {
            var n = new Uint8Array(De.OBCIPacketSize);
            n.fill(0), n[0] = De.OBCIByteStart, n[1] = e.sampleNumber;
            for (var r = 0; r < De.OBCINumberOfChannelsDefault; r++) {
                mt(e.channelData[r]).copy(n, 2 + 3 * r)
            }
            return t.copy(n, 26), n[De.OBCIPacketSize - 1] = Ot(De.OBCIStreamPacketStandardRawAux), n
        },
        convertSampleToPacketAccelTimeSyncSet: function(e, t) {
            var n = It(e, t);
            return n[De.OBCIPacketPositionStopByte] = Ot(De.OBCIStreamPacketAccelTimeSyncSet), n
        },
        convertSampleToPacketAccelTimeSynced: It,
        convertSampleToPacketRawAuxTimeSyncSet: function(e, t, n) {
            var r = yt(e, t, n);
            return r[De.OBCIPacketPositionStopByte] = Ot(De.OBCIStreamPacketRawAuxTimeSyncSet), r
        },
        convertSampleToPacketRawAuxTimeSynced: yt,
        debugPrettyPrint: function(e) {
            if (null == e) console.log("== Sample is undefined ==");
            else {
                console.log("-- Sample --"), console.log("---- Start Byte: " + e.startByte), console.log("---- Sample Number: " + e.sampleNumber);
                for (var t = 0; t < 8; t++) console.log("---- Channel Data " + (t + 1) + ": " + e.channelData[t]);
                if (e.accelData)
                    for (var n = 0; n < 3; n++) console.log("---- Accel Data " + n + ": " + e.accelData[n]);
                e.auxData && console.log("---- Aux Data " + e.auxData), console.log("---- Stop Byte: " + e.stopByte)
            }
        },
        samplePrintHeader: function() {
            return "All voltages in Volts!sampleNumber, channel1, channel2, channel3, channel4, channel5, channel6, channel7, channel8, aux1, aux2, aux3\n"
        },
        samplePrintLine: function(e) {
            return new Promise((function(t, n) {
                null == e && n(Error("undefined sample")), t(e.sampleNumber + "," + e.channelData[0].toFixed(8) + "," + e.channelData[1].toFixed(8) + "," + e.channelData[2].toFixed(8) + "," + e.channelData[3].toFixed(8) + "," + e.channelData[4].toFixed(8) + "," + e.channelData[5].toFixed(8) + "," + e.channelData[6].toFixed(8) + "," + e.channelData[7].toFixed(8) + "," + e.auxData[0].toFixed(8) + "," + e.auxData[1].toFixed(8) + "," + e.auxData[2].toFixed(8) + "\n")
            }))
        },
        floatTo3ByteBuffer: mt,
        floatTo2ByteBuffer: pt,
        impedanceCalculationForChannel: function(e, t) {
            var n = Math.sqrt(2);
            return new Promise((function(r, a) {
                null == e && a(Error("Sample Object cannot be null or undefined")), void 0 !== e.channelData && null !== e.channelData || a(Error("Channel cannot be null or undefined")), (t < 1 || t > De.OBCINumberOfChannelsDefault) && a(Error("Channel number invalid."));
                var o = t - 1;
                e.channelData[o] < 0 && (e.channelData[o] *= -1), r(n * e.channelData[o] / De.OBCILeadOffDriveInAmps)
            }))
        },
        impedanceCalculationForAllChannels: function(e) {
            var t = Math.sqrt(2);
            return new Promise((function(n, r) {
                null == e && r(Error("Sample Object cannot be null or undefined")), void 0 !== e.channelData && null !== e.channelData || r(Error("Channel cannot be null or undefined"));
                for (var a = [], o = e.channelData.length, i = 0; i < o; i++) {
                    e.channelData[i] < 0 && (e.channelData[i] *= -1);
                    var c = t * e.channelData[i] / De.OBCILeadOffDriveInAmps;
                    a.push(c)
                }
                e.impedances = a, n(e)
            }))
        },
        interpret16bitAsInt32: function(e) {
            var t = 0;
            return e[0] > 127 && (t = 65535), t << 16 | e[0] << 8 | e[1]
        },
        interpret24bitAsInt32: function(e) {
            var t = 0;
            return e[0] > 127 && (t = 255), t << 24 | e[0] << 16 | e[1] << 8 | e[2]
        },
        impedanceArray: function(e) {
            for (var t = [], n = 0; n < e; n++) t.push(Xe(n + 1));
            return t
        },
        impedanceObject: Xe,
        impedanceSummarize: function(e) {
            e.raw > De.OBCIImpedanceThresholdBadMax ? e.text = De.OBCIImpedanceTextNone : e.text = De.getTextForRawImpedance(e.raw)
        },
        newSample: ht,
        newSampleNoScale: dt,
        scaleFactorAux: _e,
        impedanceCalculateArray: function(e, t) {
            if (t.buffer.push(e.channelData), t.count++, t.count >= t.window) {
                for (var n = [], r = 0; r < e.channelData.length; r++) {
                    for (var a = 0, o = 0; o < t.window; o++) t.buffer[r][o] > a && (a = t.buffer[r][o]);
                    for (var i = 0, c = 0; c < t.window; c++) t.buffer[r][c] < i && (i = t.buffer[r][c]);
                    var l = a - i;
                    n.push(l / 2 / De.OBCILeadOffDriveInAmps)
                }
                return t.count = 0, n
            }
            return null
        },
        impedanceTestObjDefault: function(e) {
            var t = e || {};
            return t.active = !1, t.buffer = [], t.count = 0, t.isTestingPInput = !1, t.isTestingNInput = !1, t.onChannel = 0, t.sampleNumber = 0, t.continuousMode = !1, t.impedanceForChannel = 0, t.window = 40, t
        },
        samplePacket: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 0, 0, 1, 0, 2, Ot(De.OBCIStreamPacketStandardAccel)])
        },
        samplePacketZero: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Ot(De.OBCIStreamPacketStandardAccel)])
        },
        samplePacketReal: function(e) {
            return new Uint8Array([160, Ct(e), 143, 242, 64, 143, 223, 244, 144, 43, 182, 143, 191, 191, 127, 255, 255, 127, 255, 255, 148, 37, 52, 32, 182, 125, 0, 224, 0, 224, 15, 112, Ot(De.OBCIStreamPacketStandardAccel)])
        },
        samplePacketStandardRawAux: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 2, 3, 4, 5, Ot(De.OBCIStreamPacketStandardRawAux)])
        },
        samplePacketAccelTimeSyncSet: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, Ot(De.OBCIStreamPacketAccelTimeSyncSet)])
        },
        samplePacketAccelTimeSynced: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, Ot(De.OBCIStreamPacketAccelTimeSynced)])
        },
        samplePacketRawAuxTimeSyncSet: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, Ot(De.OBCIStreamPacketRawAuxTimeSyncSet)])
        },
        samplePacketRawAuxTimeSynced: function(e) {
            return new Uint8Array([160, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, Ot(De.OBCIStreamPacketRawAuxTimeSynced)])
        },
        samplePacketImpedance: function(e) {
            return new Uint8Array([160, e, 54, 52, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Ot(De.OBCIStreamPacketImpedance)])
        },
        samplePacketUserDefined: function() {
            return new Uint8Array([160, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Ot(De.OBCIStreamPacketUserDefinedType)])
        },
        samplePacketCytonBLE: function(e) {
            return new Uint8Array([192, Ct(e), 0, 0, 1, 0, 0, 2, 0, 0, 10, 0, 0, 20, 0, 0, 100, 0, 0, 200])
        },
        getBiasSetFromADSRegisterQuery: tt,
        getBooleanFromRegisterQuery: Je,
        getChannelDataArray: ut,
        getChannelDataArrayNoScale: st,
        getDataArrayAccel: ct,
        getDataArrayAccelNoScale: lt,
        getFirmware: function(e) {
            var t = e.toString().match(/v\d.\d*.\d*/);
            if (t) {
                var n = t[0].split(".");
                return {
                    major: Number(n[0][1]),
                    minor: Number(n[1]),
                    patch: Number(n[2]),
                    raw: t[0]
                }
            }
            return t
        },
        getSRB1FromADSRegisterQuery: et,
        getNumFromThreeCSVADSRegisterQuery: nt,
        isEven: Bt,
        isOdd: function(e) {
            return e % 2 == 1
        },
        isStopByte: St,
        isTimeSyncSetConfirmationInBuffer: function(e) {
            if (e) {
                var t = e.length;
                switch (t) {
                    case 0:
                        return !1;
                    case 1:
                        return e[0] === De.OBCISyncTimeSent.charCodeAt(0);
                    case 2:
                        return e[1] === De.OBCIByteStart ? e[0] === De.OBCISyncTimeSent.charCodeAt(0) : !!St(e[0]) && e[1] === De.OBCISyncTimeSent.charCodeAt(0);
                    default:
                        if (e[0] === De.OBCISyncTimeSent.charCodeAt(0) && e[1] === De.OBCIByteStart) return !0;
                        for (var n = 1; n < t; n++)
                            if (n === t - 1) {
                                if (St(e[n - 1])) return e[n] === De.OBCISyncTimeSent.charCodeAt(0)
                            } else if (St(e[n - 1]) && e[n + 1] === De.OBCIByteStart) return e[n] === De.OBCISyncTimeSent.charCodeAt(0);
                        return !1
                }
            }
        },
        makeDaisySampleObject: function(e, t) {
            var n = {};
            e.hasOwnProperty("channelData") && (n.channelData = e.channelData.concat(t.channelData));
            e.hasOwnProperty("channelDataCounts") && (n.channelDataCounts = e.channelDataCounts.concat(t.channelDataCounts));
            n.sampleNumber = Math.floor(t.sampleNumber / 2), n.auxData = {
                lower: e.auxData,
                upper: t.auxData
            }, n.stopByte = e.stopByte, n.timestamp = (e.timestamp + t.timestamp) / 2, n._timestamps = {
                lower: e.timestamp,
                upper: t.timestamp
            }, e.hasOwnProperty("accelData") && (e.accelData[0] > 0 || e.accelData[1] > 0 || e.accelData[2] > 0 ? n.accelData = e.accelData : n.accelData = t.accelData);
            e.hasOwnProperty("accelDataCounts") && (e.accelDataCounts[0] > 0 || e.accelDataCounts[1] > 0 || e.accelDataCounts[2] > 0 ? n.accelDataCounts = e.accelDataCounts : n.accelDataCounts = t.accelDataCounts);
            return n.valid = !0, n
        },
        makeDaisySampleObjectWifi: function(e, t) {
            var n = {};
            e.hasOwnProperty("channelData") && (n.channelData = e.channelData.concat(t.channelData));
            e.hasOwnProperty("channelDataCounts") && (n.channelDataCounts = e.channelDataCounts.concat(t.channelDataCounts));
            n.sampleNumber = t.sampleNumber, n.auxData = {
                lower: e.auxData,
                upper: t.auxData
            }, e.hasOwnProperty("timestamp") && (n.timestamp = e.timestamp);
            n.stopByte = e.stopByte, n._timestamps = {
                lower: e.timestamp,
                upper: t.timestamp
            }, e.hasOwnProperty("accelData") && (e.accelData[0] > 0 || e.accelData[1] > 0 || e.accelData[2] > 0 ? n.accelData = e.accelData : n.accelData = t.accelData);
            e.hasOwnProperty("accelDataCounts") && (e.accelDataCounts[0] > 0 || e.accelDataCounts[1] > 0 || e.accelDataCounts[2] > 0 ? n.accelDataCounts = e.accelDataCounts : n.accelDataCounts = t.accelDataCounts);
            return n.valid = !0, n
        },
        makeTailByteFromPacketType: Ot,
        newSyncObject: function() {
            return {
                boardTime: 0,
                correctedTransmissionTime: !1,
                error: null,
                timeSyncSent: 0,
                timeSyncSentConfirmation: 0,
                timeSyncSetPacket: 0,
                timeRoundTrip: 0,
                timeTransmission: 0,
                timeOffset: 0,
                timeOffsetMaster: 0,
                valid: !1
            }
        },
        setChSetFromADSRegisterQuery: rt,
        stripToEOTBuffer: function(e) {
            var t = e.indexOf(De.OBCIParseEOT);
            if (!(t >= 0)) return e;
            t += De.OBCIParseEOT.length;
            return t < e.byteLength ? Uint8Array.from(e.slice(t)) : null
        },
        syncChannelSettingsWithRawData: function(e) {
            if (De.isUndefined(e) || De.isUndefined(e.channelSettings) || De.isNull(e.channelSettings) || De.isUndefined(e.data) || De.isNull(e.data)) throw new Error(De.OBCIErrorUndefinedOrNullInput);
            if (!Array.isArray(e.channelSettings)) throw new Error("".concat(De.OBCIErrorInvalidType, " channelSettings"));
            if (e.channelSettings.length === De.OBCINumberOfChannelsCyton) {
                if (e.data.toString().match(/Daisy ADS/)) throw new Error("raw data mismatch - expected only cyton register info but also found daisy");
                if (null == e.data.toString().match(/Board ADS/)) throw new Error(De.OBCIErrorInvalidData)
            } else {
                if (null == e.data.toString().match(/Daisy ADS/)) throw new Error("raw data mismatch - expected daisy register info but none found");
                if (null == e.data.toString().match(/Board ADS/)) throw new Error("no Board ADS info found")
            }
            e.channelSettings.forEach((function(e) {
                if (!(e.hasOwnProperty("channelNumber") && e.hasOwnProperty("powerDown") && e.hasOwnProperty("gain") && e.hasOwnProperty("inputType") && e.hasOwnProperty("bias") && e.hasOwnProperty("srb2") && e.hasOwnProperty("srb1"))) throw new Error(De.OBCIErrorMissingRequiredProperty)
            }));
            var t = null,
                n = !1,
                r = !1,
                a = e.data.toString().match(/Board ADS/),
                o = e.data.toString().slice(a.index, De.OBCIRegisterQueryCyton.length);
            et(o) && (n = !0);
            if (e.channelSettings.length > De.OBCINumberOfChannelsCyton) {
                var i = e.data.toString().match(/Daisy ADS/);
                t = e.data.toString().slice(i.index, i.index + De.OBCIRegisterQueryCytonDaisy.length), et(o) && (r = !0)
            }
            e.channelSettings.forEach((function(e) {
                e.channelNumber < De.OBCINumberOfChannelsCyton ? (rt(o, e), e.bias = tt(o, e.channelNumber), e.srb1 = n) : (rt(t, e), e.bias = tt(t, e.channelNumber - De.OBCINumberOfChannelsCyton), e.srb1 = r)
            }))
        },
        droppedPacketCheck: function(e, t) {
            if (e === De.OBCISampleNumberMax && 0 === t) return null;
            if (t - e == 1) return null;
            var n = [];
            if (e > t) {
                for (var r = De.OBCISampleNumberMax - e, a = 0; a < r; a++) n.push(e + a + 1);
                e = -1
            }
            for (var o = 1; o < t - e; o++) n.push(e + o);
            return n
        },
        convert18bitAsInt32: Ye,
        convert19bitAsInt32: qe,
        decompressDeltas18Bit: Ze,
        decompressDeltas19Bit: $e,
        sampleCompressedData: function(e) {
            return new Uint8Array([e, 0, 0, 0, 0, 8, 0, 5, 0, 0, 72, 0, 9, 240, 1, 176, 0, 48, 0, 8])
        },
        sampleBLERaw: function() {
            return new Uint8Array([0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4])
        },
        sampleImpedanceChannel1: function() {
            return new Uint8Array([De.OBCIGanglionByteIdImpedanceChannel1, 0, 0, 1])
        },
        sampleImpedanceChannel2: function() {
            return new Uint8Array([De.OBCIGanglionByteIdImpedanceChannel2, 0, 0, 1])
        },
        sampleImpedanceChannel3: function() {
            return new Uint8Array([De.OBCIGanglionByteIdImpedanceChannel3, 0, 0, 1])
        },
        sampleImpedanceChannel4: function() {
            return new Uint8Array([De.OBCIGanglionByteIdImpedanceChannel4, 0, 0, 1])
        },
        sampleImpedanceChannelReference: function() {
            return new Uint8Array([De.OBCIGanglionByteIdImpedanceChannelReference, 0, 0, 1])
        },
        sampleMultiBytePacket: function(e) {
            var t = new Uint8Array([De.OBCIGanglionByteIdMultiPacket]);
            return Uint8Array.concat([t, e])
        },
        sampleMultiBytePacketStop: function(e) {
            var t = new Uint8Array([De.OBCIGanglionByteIdMultiPacketStop]);
            return Uint8Array.concat([t, e])
        },
        sampleOtherData: function(e) {
            var t = new Uint8Array([255]);
            return Uint8Array.concat([t, e])
        },
        sampleUncompressedData: function() {
            return new Uint8Array([0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 1, 2, 3, 4, 5, 6, 7])
        },
        parseGanglion: function(e) {
            var t = parseInt(e.rawDataPacket[0]);
            if (t <= De.OBCIGanglionByteId19Bit.max) return We(e);
            switch (t) {
                case De.OBCIGanglionByteIdMultiPacket:
                    return He(e);
                case De.OBCIGanglionByteIdMultiPacketStop:
                    return ze(e);
                case De.OBCIGanglionByteIdImpedanceChannel1:
                case De.OBCIGanglionByteIdImpedanceChannel2:
                case De.OBCIGanglionByteIdImpedanceChannel3:
                case De.OBCIGanglionByteIdImpedanceChannel4:
                case De.OBCIGanglionByteIdImpedanceChannelReference:
                    return function(e) {
                        var t;
                        switch (parseInt(e.rawDataPacket[0])) {
                            case De.OBCIGanglionByteIdImpedanceChannel1:
                                t = 1;
                                break;
                            case De.OBCIGanglionByteIdImpedanceChannel2:
                                t = 2;
                                break;
                            case De.OBCIGanglionByteIdImpedanceChannel3:
                                t = 3;
                                break;
                            case De.OBCIGanglionByteIdImpedanceChannel4:
                                t = 4;
                                break;
                            case De.OBCIGanglionByteIdImpedanceChannelReference:
                                t = 0
                        }
                        var n = {
                                channelNumber: t,
                                impedanceValue: 0
                            },
                            r = e.rawDataPacket.length;
                        for (; Number.isNaN(Number(e.rawDataPacket.slice(1, r))) && 0 !== r;) r--;
                        0 !== r && (n.impedanceValue = Number(e.rawDataPacket.slice(1, r)));
                        return n
                    }(e);
                default:
                    return null
            }
        },
        processMultiBytePacket: He,
        processMultiBytePacketStop: ze
    };

function He(e) {
    e.multiPacketBuffer ? e.multiPacketBuffer = Uint8Array.concat([Uint8Array.from(e.multiPacketBuffer), Uint8Array.from(e.rawDataPacket.slice(De.OBCIGanglionPacket19Bit.dataStart, De.OBCIGanglionPacket19Bit.dataStop))]) : e.multiPacketBuffer = e.rawDataPacket.slice(De.OBCIGanglionPacket19Bit.dataStart, De.OBCIGanglionPacket19Bit.dataStop)
}

function ze(e) {
    He(e);
    var t = e.multiPacketBuffer.toString();
    return e.multiPacketBuffer = null, {
        message: t
    }
}

function Qe(e, t) {
    for (var n = 1; n < 3; n++)
        for (var r = 0; r < 4; r++) e.decompressedSamples[n][r] = e.decompressedSamples[n - 1][r] - t[n - 1][r]
}

function Ve(e, t, n) {
    var r;
    if (n)(r = dt(e)).channelDataCounts = t;
    else {
        r = ht(e);
        for (var a = 0; a < De.OBCINumberOfChannelsGanglion; a++) r.channelData.push(t[a] * De.OBCIGanglionScaleFactorPerCountVolts)
    }
    return r.timestamp = Date.now(), r
}

function We(e) {
    return parseInt(e.rawDataPacket[0]) === De.OBCIGanglionByteIdUncompressed ? function(e) {
        e.lastSampleNumber = De.OBCIGanglionByteIdUncompressed;
        for (var t = 0; t < 4; t++) e.decompressedSamples[0][t] = je.interpret24bitAsInt32(e.rawDataPacket.slice(1 + 3 * t, 1 + 3 * t + 3));
        return [Ve(0, e.decompressedSamples[0], e.sendCounts)]
    }(e) : function(e) {
        e.lastSampleNumber = parseInt(e.rawDataPacket[0]);
        var t = [];
        if (e.lastSampleNumber <= De.OBCIGanglionByteId18Bit.max) switch (Qe(e, Ze(e.rawDataPacket.slice(De.OBCIGanglionPacket18Bit.dataStart, De.OBCIGanglionPacket18Bit.dataStop))), t.push(Ve(2 * e.lastSampleNumber - 1, e.decompressedSamples[1], e.sendCounts)), t.push(Ve(2 * e.lastSampleNumber, e.decompressedSamples[2], e.sendCounts)), e.lastSampleNumber % 10) {
            case De.OBCIGanglionAccelAxisX:
                e.accelArray[0] = e.sendCounts ? e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) : e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) * De.OBCIGanglionAccelScaleFactor;
                break;
            case De.OBCIGanglionAccelAxisY:
                e.accelArray[1] = e.sendCounts ? e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) : e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) * De.OBCIGanglionAccelScaleFactor;
                break;
            case De.OBCIGanglionAccelAxisZ:
                e.accelArray[2] = e.sendCounts ? e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) : e.rawDataPacket.readInt8(De.OBCIGanglionPacket18Bit.auxByte - 1) * De.OBCIGanglionAccelScaleFactor, e.sendCounts ? t[0].accelData = e.accelArray : t[0].accelDataCounts = e.accelArray
        } else Qe(e, $e(e.rawDataPacket.slice(De.OBCIGanglionPacket19Bit.dataStart, De.OBCIGanglionPacket19Bit.dataStop))), t.push(Ve(2 * (e.lastSampleNumber - 100) - 1, e.decompressedSamples[1], e.sendCounts)), t.push(Ve(2 * (e.lastSampleNumber - 100), e.decompressedSamples[2], e.sendCounts));
        for (var n = 0; n < De.OBCINumberOfChannelsGanglion; n++) e.decompressedSamples[0][n] = e.decompressedSamples[2][n];
        return t
    }(e)
}

function Ye(e) {
    var t = 0;
    return !0 & e[2] && (t = 16383), t << 18 | e[0] << 16 | e[1] << 8 | e[2]
}

function qe(e) {
    var t = 0;
    return !0 & e[2] && (t = 8191), t << 19 | e[0] << 16 | e[1] << 8 | e[2]
}

function Ze(e) {
    var t = new Array(De.OBCIGanglionSamplesPerPacket);
    t[0] = [0, 0, 0, 0], t[1] = [0, 0, 0, 0];
    for (var n, r = [], a = 0; a < De.OBCIGanglionSamplesPerPacket; a++) r.push([0, 0, 0, 0]);
    return n = new Uint8Array([e[0] >> 6, (63 & e[0]) << 2 | e[1] >> 6, (63 & e[1]) << 2 | e[2] >> 6]), r[0][0] = Ye(n), n = new Uint8Array([(63 & e[2]) >> 4, e[2] << 4 | e[3] >> 4, e[3] << 4 | e[4] >> 4]), r[0][1] = Ye(n), n = new Uint8Array([(15 & e[4]) >> 2, e[4] << 6 | e[5] >> 2, e[5] << 6 | e[6] >> 2]), r[0][2] = Ye(n), n = new Uint8Array([3 & e[6], e[7], e[8]]), r[0][3] = Ye(n), n = new Uint8Array([e[9] >> 6, (63 & e[9]) << 2 | e[10] >> 6, (63 & e[10]) << 2 | e[11] >> 6]), r[1][0] = Ye(n), n = new Uint8Array([(63 & e[11]) >> 4, e[11] << 4 | e[12] >> 4, e[12] << 4 | e[13] >> 4]), r[1][1] = Ye(n), n = new Uint8Array([(15 & e[13]) >> 2, e[13] << 6 | e[14] >> 2, e[14] << 6 | e[15] >> 2]), r[1][2] = Ye(n), n = new Uint8Array([3 & e[15], e[16], e[17]]), r[1][3] = Ye(n), r
}

function $e(e) {
    var t = new Array(De.OBCIGanglionSamplesPerPacket);
    t[0] = [0, 0, 0, 0], t[1] = [0, 0, 0, 0];
    for (var n, r = [], a = 0; a < De.OBCIGanglionSamplesPerPacket; a++) r.push([0, 0, 0, 0]);
    return n = new Uint8Array([e[0] >> 5, (31 & e[0]) << 3 | e[1] >> 5, (31 & e[1]) << 3 | e[2] >> 5]), r[0][0] = qe(n), n = new Uint8Array([(31 & e[2]) >> 2, e[2] << 6 | e[3] >> 2, e[3] << 6 | e[4] >> 2]), r[0][1] = qe(n), n = new Uint8Array([(3 & e[4]) << 1 | e[5] >> 7, (127 & e[5]) << 1 | e[6] >> 7, (127 & e[6]) << 1 | e[7] >> 7]), r[0][2] = qe(n), n = new Uint8Array([(127 & e[7]) >> 4, (15 & e[7]) << 4 | e[8] >> 4, (15 & e[8]) << 4 | e[9] >> 4]), r[0][3] = qe(n), n = new Uint8Array([(15 & e[9]) >> 1, e[9] << 7 | e[10] >> 1, e[10] << 7 | e[11] >> 1]), r[1][0] = qe(n), n = new Uint8Array([(1 & e[11]) << 2 | e[12] >> 6, e[12] << 2 | e[13] >> 6, e[13] << 2 | e[14] >> 6]), r[1][1] = qe(n), n = new Uint8Array([(56 & e[14]) >> 3, (7 & e[14]) << 5 | (248 & e[15]) >> 3, (7 & e[15]) << 5 | (248 & e[16]) >> 3]), r[1][2] = qe(n), n = new Uint8Array([7 & e[16], e[17], e[18]]), r[1][3] = qe(n), r
}

function Xe(e) {
    return {
        channel: e,
        P: {
            raw: -1,
            text: De.OBCIImpedanceTextInit
        },
        N: {
            raw: -1,
            text: De.OBCIImpedanceTextInit
        }
    }
}

function Ke(e) {
    var t;
    try {
        switch (ft(e.rawDataPacket[De.OBCIPacketPositionStopByte])) {
            case De.OBCIStreamPacketStandardAccel:
                t = je.parsePacketStandardAccel(e);
                break;
            case De.OBCIStreamPacketStandardRawAux:
                t = je.parsePacketStandardRawAux(e);
                break;
            case De.OBCIStreamPacketAccelTimeSyncSet:
            case De.OBCIStreamPacketAccelTimeSynced:
                t = je.parsePacketTimeSyncedAccel(e);
                break;
            case De.OBCIStreamPacketRawAuxTimeSyncSet:
            case De.OBCIStreamPacketRawAuxTimeSynced:
                t = je.parsePacketTimeSyncedRawAux(e);
                break;
            case De.OBCIStreamPacketImpedance:
                t = je.parsePacketImpedance(e);
                break;
            default:
                t = {
                    error: "bad stop byte ".concat(e.rawDataPacket.slice(32, 33).toString("hex")),
                    valid: !1,
                    rawDataPacket: e.rawDataPacket
                }, e.verbose && console.log(t.error)
        }
    } catch (n) {
        t = {
            error: n,
            valid: !1,
            rawDataPacket: e.rawDataPacket
        }, e.verbose && console.log(n)
    }
    return t
}

function Je(e, t, n) {
    var r = e.match(t);
    if (r) {
        var a = parseInt(e.charAt(r.index + n));
        if (Number.isNaN(a)) throw new Error(De.OBCIErrorInvalidData);
        return Boolean(a)
    }
    throw new Error(De.OBCIErrorMissingRegisterSetting)
}

function et(e) {
    return Je(e, De.OBCIRegisterQueryNameMISC1, 21)
}

function tt(e, t) {
    return Je(e, De.OBCIRegisterQueryNameBIASSENSP, 20 + 3 * t)
}

function nt(e, t, n) {
    var r = e.match(t);
    if (r) {
        var a = parseInt(e.charAt(r.index + n)),
            o = parseInt(e.charAt(r.index + n + 3)),
            i = parseInt(e.charAt(r.index + n + 6));
        if (Number.isNaN(a) || Number.isNaN(o) || Number.isNaN(i)) throw new Error(De.OBCIErrorInvalidData);
        return a << 2 | o << 1 | i
    }
    throw new Error(De.OBCIErrorMissingRegisterSetting)
}

function rt(e, t) {
    var n = De.OBCIRegisterQueryNameCHnSET[t.channelNumber];
    void 0 === n && (n = De.OBCIRegisterQueryNameCHnSET[t.channelNumber - De.OBCINumberOfChannelsCyton]), t.powerDown = Je(e, n, 16), t.gain = De.gainForCommand(nt(e, n, 19)), t.inputType = De.inputTypeForCommand(nt(e, n, 31)), t.srb2 = Je(e, n, 28)
}

function at(e) {
    var t = De.OBCIPacketSize - 1;
    if (e.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
    return e.readUInt32BE(t - De.OBCIStreamPacketTimeByteSize)
}

function ot(e) {
    var t = De.OBCIPacketSize - 1 - De.OBCIStreamPacketTimeByteSize - 2;
    if (e.rawDataPacket.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
    var n = e.rawDataPacket[De.OBCIPacketPositionSampleNumber],
        r = je.interpret16bitAsInt32(e.rawDataPacket.slice(t, t + 2));
    switch (n % 10) {
        case De.OBCIAccelAxisX:
            return e.accelArray[0] = e.scale ? r * _e : r, !1;
        case De.OBCIAccelAxisY:
            return e.accelArray[1] = e.scale ? r * _e : r, !1;
        case De.OBCIAccelAxisZ:
            return e.accelArray[2] = e.scale ? r * _e : r, !0;
        default:
            return !1
    }
}

function it(e) {
    if (e.byteLength !== De.OBCIPacketSize) throw new Error(De.OBCIErrorInvalidByteLength);
    return Uint8Array.from(e.slice(De.OBCIPacketPositionTimeSyncAuxStart, De.OBCIPacketPositionTimeSyncAuxStop))
}

function ct(e) {
    for (var t = [], n = 0; n < 3; n++) {
        var r = 2 * n;
        t.push(je.interpret16bitAsInt32(e.slice(r, r + 2)) * _e)
    }
    return t
}

function lt(e) {
    for (var t = [], n = 0; n < 3; n++) {
        var r = 2 * n;
        t.push(je.interpret16bitAsInt32(e.slice(r, r + 2)))
    }
    return t
}

function ut(e) {
    if (!Array.isArray(e.channelSettings)) throw new Error("Error [getChannelDataArray]: Channel Settings must be an array!");
    e.hasOwnProperty("protocol") || (e.protocol = De.OBCIProtocolSerial);
    var t = [],
        n = e.channelSettings.length,
        r = e.rawDataPacket[De.OBCIPacketPositionSampleNumber],
        a = n === De.OBCINumberOfChannelsDaisy,
        o = De.OBCINumberOfChannelsCyton;
    a || (o = e.channelSettings.length);
    for (var i = 0; i < o; i++) {
        if (!e.channelSettings[i].hasOwnProperty("gain")) throw new Error("Error [getChannelDataArray]: Invalid channel settings object at index ".concat(i));
        if (!De.isNumber(e.channelSettings[i].gain)) throw new Error("Error [getChannelDataArray]: Property gain of channelSettingsObject not or type Number");
        var c = 0;
        if (e.protocol === De.OBCIProtocolSerial) c = Bt(r) && a ? 4.5 / e.channelSettings[i + De.OBCINumberOfChannelsDefault].gain / (Math.pow(2, 23) - 1) : 4.5 / e.channelSettings[i].gain / (Math.pow(2, 23) - 1);
        else if (e.protocol === De.OBCIProtocolWifi) c = a ? e.lastSampleNumber === r ? 4.5 / e.channelSettings[i + De.OBCINumberOfChannelsDefault].gain / (Math.pow(2, 23) - 1) : 4.5 / e.channelSettings[i].gain / (Math.pow(2, 23) - 1) : e.channelSettings.length === De.OBCINumberOfChannelsCyton ? 4.5 / e.channelSettings[i].gain / (Math.pow(2, 23) - 1) : De.OBCIGanglionScaleFactorPerCountVolts;
        else {
            if (e.protocol !== De.OBCIProtocolBLE) throw new Error("Error [getChannelDataArray]: Invalid protocol must be wifi or serial");
            c = 4.5 / e.channelSettings[i].gain / (Math.pow(2, 23) - 1)
        }
        t.push(c * je.interpret24bitAsInt32(e.rawDataPacket.slice(3 * i + De.OBCIPacketPositionChannelDataStart, 3 * i + De.OBCIPacketPositionChannelDataStart + 3)))
    }
    return t
}

function st(e) {
    if (!Array.isArray(e.channelSettings)) throw new Error("Error [getChannelDataArrayNoScale]: Channel Settings must be an array!");
    var t = [],
        n = e.channelSettings.length;
    n > De.OBCINumberOfChannelsDefault && (n = De.OBCINumberOfChannelsDefault);
    for (var r = 0; r < n; r++) t.push(je.interpret24bitAsInt32(e.rawDataPacket.slice(3 * r + De.OBCIPacketPositionChannelDataStart, 3 * r + De.OBCIPacketPositionChannelDataStart + 3)));
    return t
}

function ft(e) {
    return 15 & e
}

function Ct(e) {
    return e || 0 === e ? e > 255 && (e = 255) : e = 69, e
}

function ht(e) {
    return e || 0 === e ? e > 255 && (e = 255) : e = 0, {
        startByte: De.OBCIByteStart,
        sampleNumber: e,
        channelData: [],
        accelData: [],
        auxData: null,
        stopByte: De.OBCIByteStop,
        boardTime: 0,
        timestamp: 0,
        valid: !0
    }
}

function dt(e) {
    return e || 0 === e ? e > 255 && (e = 255) : e = 0, {
        startByte: De.OBCIByteStart,
        sampleNumber: e,
        channelDataCounts: [],
        accelDataCounts: [],
        auxData: null,
        stopByte: De.OBCIByteStop,
        boardTime: 0,
        timestamp: 0,
        valid: !0
    }
}

function mt(e) {
    var t = new Uint8Array(3);
    t.fill(0);
    var n = e / (.1875 / (Math.pow(2, 23) - 1));
    return n = Math.floor(n), t[2] = 255 & n, t[1] = (65280 & n) >> 8, t[0] = (n & 255 << 16) >> 16, t
}

function pt(e) {
    var t = new Uint8Array(2);
    t.fill(0);
    var n = e / _e;
    return n = Math.floor(n), t[1] = 255 & n, t[0] = (65280 & n) >> 8, t
}

function Bt(e) {
    return e % 2 == 0
}

function yt(e, t, n) {
    var r = new Uint8Array(De.OBCIPacketSize);
    r.fill(0), r[0] = De.OBCIByteStart, r[1] = e.sampleNumber;
    for (var a = 0; a < De.OBCINumberOfChannelsDefault; a++) {
        mt(e.channelData[a]).copy(r, 2 + 3 * a)
    }
    return n.copy(r, 26), r.writeInt32BE(t, 28), r[De.OBCIPacketSize - 1] = Ot(De.OBCIStreamPacketRawAuxTimeSynced), r
}

function It(e, t) {
    var n = new Uint8Array(De.OBCIPacketSize);
    n.fill(0), n[0] = De.OBCIByteStart, n[1] = e.sampleNumber;
    for (var r = 0; r < De.OBCINumberOfChannelsDefault; r++) {
        mt(e.channelData[r]).copy(n, 2 + 3 * r)
    }
    return n.writeInt32BE(t, 28), n[De.OBCIPacketSize - 1] = Ot(De.OBCIStreamPacketAccelTimeSynced), n
}

function Ot(e) {
    return (e < 0 || e > 15) && (e = 0), De.OBCIByteStop | e
}

function St(e) {
    return (240 & e) === De.OBCIByteStop
}

function bt(e, t) {
    if (null == e) return {};
    var n, r, a = function(e, t) {
        if (null == e) return {};
        var n, r, a = {},
            o = Object.keys(e);
        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
        return a
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
    }
    return a
}
var vt = ["channelData"];

function wt(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
    }
    return n
}

function gt(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? wt(Object(n), !0).forEach((function(t) {
            s(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wt(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
    }
    return e
}
var Pt = function(e) {
        var t = e.channelData;
        return gt(gt({}, bt(e, vt)), {}, {
            data: t
        })
    },
    kt = {
        reader: "2d30c082-f39f-4ce6-923f-3484ea480596",
        writer: "2d30c083-f39f-4ce6-923f-3484ea480596",
        connection: "2d30c084-f39f-4ce6-923f-3484ea480596"
    },
    Dt = {
        filters: [{
            namePrefix: "Ganglion-"
        }],
        optionalServices: [65156]
    },
    xt = {
        start: "b",
        accelData: "n"
    };

function Et(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
    }
    return n
}

function At(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Et(Object(n), !0).forEach((function(t) {
            s(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Et(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
    }
    return e
}

function Nt(e) {
    var t = parseInt(e.rawDataPacket[0]);
    if (t <= De.OBCIGanglionByteId19Bit.max) return We(e);
    switch (t) {
        case De.OBCIGanglionByteIdMultiPacket:
            return processMultiBytePacket(e);
        case De.OBCIGanglionByteIdMultiPacketStop:
            return processMultiBytePacketStop(e);
        case De.OBCIGanglionByteIdImpedanceChannel1:
        case De.OBCIGanglionByteIdImpedanceChannel2:
        case De.OBCIGanglionByteIdImpedanceChannel3:
        case De.OBCIGanglionByteIdImpedanceChannel4:
        case De.OBCIGanglionByteIdImpedanceChannelReference:
            return processImpedanceData(e);
        default:
            return null
    }
}
var Tt = function() {
    function e() {
        var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

        function r(e) {
            return {
                channelNumber: e,
                powerDown: !1,
                gain: 24,
                inputType: "normal",
                bias: !0,
                srb2: !0,
                srb1: !1
            }
        }
        m(this, e), this.options = n, this.gatt = null, this.device = null, this.deviceName = null, this.service = null, this.characteristics = null, this.onDisconnect$ = new K, this.boardName = "ganglion", this.channelSize = 4;
        var a = function(e) {
            for (var t = [], n = 0; n < e; n++) t.push(r(n));
            return t
        };

        function o(e) {
            for (var t = [], n = 0; n < 3; n++) t.push(new Array(e));
            return t
        }
        this.rawDataPacketToSample = {
            accelArray: [0, 0, 0],
            channelSettings: a(4),
            decompressedSamples: o(4),
            lastSampleNumber: 0,
            rawDataPacket: new Uint8Array(33).buffer,
            rawDataPackets: [],
            scale: !0,
            sendCounts: !1,
            timeOffset: 0,
            verbose: !1
        }, this.connectionStatus = new ee(!1), this.stream = (new K).pipe(ce((function(e) {
            return t.eventToBufferMapper(e)
        })), be((function(e) {
            return t.setRawDataPacket(e)
        })), ce((function() {
            return Nt(t.rawDataPacketToSample)
        })), se((function(e) {
            return e
        })), ce(Pt), Se(this.onDisconnect$)), this.accelData = this.stream.pipe(pe((function(e) {
            return e.accelData.length
        })))
    }
    var t, n, r, a, o;
    return t = e, n = [{
        key: "eventToBufferMapper",
        value: function(e) {
            return new Uint8Array(e.target.value.buffer)
        }
    }, {
        key: "setRawDataPacket",
        value: function(e) {
            this.rawDataPacketToSample.rawDataPacket = e
        }
    }, {
        key: "connect",
        value: (o = d(y.mark((function e() {
            return y.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, navigator.bluetooth.requestDevice(Dt);
                    case 2:
                        return this.device = e.sent, this.addDisconnectedEvent(), e.next = 6, this.device.gatt.connect();
                    case 6:
                        return this.gatt = e.sent, this.deviceName = this.gatt.device.name, e.next = 10, this.gatt.getPrimaryService(65156);
                    case 10:
                        return this.service = e.sent, e.t0 = this, e.next = 14, this.service.getCharacteristics();
                    case 14:
                        e.t1 = e.sent, e.t0.setCharacteristics.call(e.t0, e.t1), this.connectionStatus.next(!0);
                    case 17:
                    case "end":
                        return e.stop()
                }
            }), e, this)
        }))), function() {
            return o.apply(this, arguments)
        })
    }, {
        key: "setCharacteristics",
        value: function(e) {
            this.characteristics = Object.entries(kt).reduce((function(t, n) {
                var r = C(n, 2),
                    a = r[0],
                    o = r[1];
                return At(At({}, t), {}, s({}, a, e.find((function(e) {
                    return e.uuid === o
                }))))
            }), {})
        }
    }, {
        key: "start",
        value: (a = d(y.mark((function e() {
            var t, n, r, a, o = this;
            return y.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (t = this.characteristics, n = t.reader, r = t.writer, a = Object.entries(xt).reduce((function(e, t) {
                                var n = C(t, 2),
                                    r = n[0],
                                    a = n[1];
                                return At(At({}, e), {}, s({}, r, (new TextEncoder).encode(a)))
                            }), {}), n.startNotifications(), n.addEventListener("characteristicvaluechanged", (function(e) {
                                o.stream.next(e)
                            })), !this.options.accelData) {
                            e.next = 8;
                            break
                        }
                        return e.next = 7, r.writeValue(a.accelData);
                    case 7:
                        n.readValue();
                    case 8:
                        return e.next = 10, r.writeValue(a.start);
                    case 10:
                        n.readValue();
                    case 11:
                    case "end":
                        return e.stop()
                }
            }), e, this)
        }))), function() {
            return a.apply(this, arguments)
        })
    }, {
        key: "addDisconnectedEvent",
        value: function() {
            var e = this;
            de(this.device, "gattserverdisconnected").pipe(function(e, t) {
                var n = arguments.length >= 2;
                return function(r) {
                    return r.pipe(e ? pe((function(t, n) {
                        return e(t, n, r)
                    })) : Q, ye(1), n ? Be(t) : Ie((function() {
                        return new ie
                    })))
                }
            }()).subscribe((function() {
                e.gatt = null, e.device = null, e.deviceName = null, e.service = null, e.characteristics = null, e.connectionStatus.next(!1)
            }))
        }
    }, {
        key: "disconnect",
        value: function() {
            this.gatt && (this.onDisconnect$.next(), this.gatt.disconnect())
        }
    }], n && p(t.prototype, n), r && p(t, r), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e
}();
const Rt = ["FP1", "FP2", "C3", "C4"],
    Ft = {
        label: "ganglion",
        device: Tt,
        onconnect: e => n(void 0, void 0, void 0, (function*() {
            let t = e.device;
            yield t.start(), t.stream.subscribe((t => {
                let n = {};
                t.data.forEach(((e, t) => n[Rt[t]] = e)), e.ondata(n, t.timestamp)
            }))
        })),
        protocols: ["bluetooth"]
    };
export {
    Ft as
    default, Ft as device
};
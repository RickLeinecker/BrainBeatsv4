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
function t(t, e, n, r) {
    return new(n || (n = Promise))((function(i, o) {
        function s(t) {
            try {
                c(r.next(t))
            } catch (t) {
                o(t)
            }
        }

        function u(t) {
            try {
                c(r.throw(t))
            } catch (t) {
                o(t)
            }
        }

        function c(t) {
            var e;
            t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                t(e)
            }))).then(s, u)
        }
        c((r = r.apply(t, e || [])).next())
    }))
}
var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function n(t) {
    if (t.__esModule) return t;
    var e = Object.defineProperty({}, "__esModule", {
        value: !0
    });
    return Object.keys(t).forEach((function(n) {
        var r = Object.getOwnPropertyDescriptor(t, n);
        Object.defineProperty(e, n, r.get ? r : {
            enumerable: !0,
            get: function() {
                return t[n]
            }
        })
    })), e
}
var r = {},
    i = function(t, e) {
        return i = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        }, i(t, e)
    };
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
function o(t, e) {
    function n() {
        this.constructor = t
    }
    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
}

function s(t) {
    return "function" == typeof t
}
var u = !1,
    c = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
            t && (new Error).stack;
            u = t
        },
        get useDeprecatedSynchronousErrorHandling() {
            return u
        }
    };

function a(t) {
    setTimeout((function() {
        throw t
    }), 0)
}
var h = {
        closed: !0,
        next: function(t) {},
        error: function(t) {
            if (c.useDeprecatedSynchronousErrorHandling) throw t;
            a(t)
        },
        complete: function() {}
    },
    l = function() {
        return Array.isArray || function(t) {
            return t && "number" == typeof t.length
        }
    }();

function f(t) {
    return null !== t && "object" == typeof t
}
var p = function() {
        function t(t) {
            return Error.call(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(t, e) {
                return e + 1 + ") " + t.toString()
            })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t, this
        }
        return t.prototype = Object.create(Error.prototype), t
    }(),
    d = function() {
        function t(t) {
            this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
        }
        return t.prototype.unsubscribe = function() {
            var e;
            if (!this.closed) {
                var n = this,
                    r = n._parentOrParents,
                    i = n._ctorUnsubscribe,
                    o = n._unsubscribe,
                    u = n._subscriptions;
                if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, r instanceof t) r.remove(this);
                else if (null !== r)
                    for (var c = 0; c < r.length; ++c) {
                        r[c].remove(this)
                    }
                if (s(o)) {
                    i && (this._unsubscribe = void 0);
                    try {
                        o.call(this)
                    } catch (t) {
                        e = t instanceof p ? b(t.errors) : [t]
                    }
                }
                if (l(u)) {
                    c = -1;
                    for (var a = u.length; ++c < a;) {
                        var h = u[c];
                        if (f(h)) try {
                            h.unsubscribe()
                        } catch (t) {
                            e = e || [], t instanceof p ? e = e.concat(b(t.errors)) : e.push(t)
                        }
                    }
                }
                if (e) throw new p(e)
            }
        }, t.prototype.add = function(e) {
            var n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
                case "function":
                    n = new t(e);
                case "object":
                    if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                    if (this.closed) return n.unsubscribe(), n;
                    if (!(n instanceof t)) {
                        var r = n;
                        (n = new t)._subscriptions = [r]
                    }
                    break;
                default:
                    throw new Error("unrecognized teardown " + e + " added to Subscription.")
            }
            var i = n._parentOrParents;
            if (null === i) n._parentOrParents = this;
            else if (i instanceof t) {
                if (i === this) return n;
                n._parentOrParents = [i, this]
            } else {
                if (-1 !== i.indexOf(this)) return n;
                i.push(this)
            }
            var o = this._subscriptions;
            return null === o ? this._subscriptions = [n] : o.push(n), n
        }, t.prototype.remove = function(t) {
            var e = this._subscriptions;
            if (e) {
                var n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
            }
        }, t.EMPTY = function(t) {
            return t.closed = !0, t
        }(new t), t
    }();

function b(t) {
    return t.reduce((function(t, e) {
        return t.concat(e instanceof p ? e.errors : e)
    }), [])
}
var v = function() {
        return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
    }(),
    y = function(t) {
        function e(n, r, i) {
            var o = t.call(this) || this;
            switch (o.syncErrorValue = null, o.syncErrorThrown = !1, o.syncErrorThrowable = !1, o.isStopped = !1, arguments.length) {
                case 0:
                    o.destination = h;
                    break;
                case 1:
                    if (!n) {
                        o.destination = h;
                        break
                    }
                    if ("object" == typeof n) {
                        n instanceof e ? (o.syncErrorThrowable = n.syncErrorThrowable, o.destination = n, n.add(o)) : (o.syncErrorThrowable = !0, o.destination = new m(o, n));
                        break
                    }
                default:
                    o.syncErrorThrowable = !0, o.destination = new m(o, n, r, i)
            }
            return o
        }
        return o(e, t), e.prototype[v] = function() {
            return this
        }, e.create = function(t, n, r) {
            var i = new e(t, n, r);
            return i.syncErrorThrowable = !1, i
        }, e.prototype.next = function(t) {
            this.isStopped || this._next(t)
        }, e.prototype.error = function(t) {
            this.isStopped || (this.isStopped = !0, this._error(t))
        }, e.prototype.complete = function() {
            this.isStopped || (this.isStopped = !0, this._complete())
        }, e.prototype.unsubscribe = function() {
            this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this))
        }, e.prototype._next = function(t) {
            this.destination.next(t)
        }, e.prototype._error = function(t) {
            this.destination.error(t), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.destination.complete(), this.unsubscribe()
        }, e.prototype._unsubscribeAndRecycle = function() {
            var t = this._parentOrParents;
            return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
        }, e
    }(d),
    m = function(t) {
        function e(e, n, r, i) {
            var o, u = t.call(this) || this;
            u._parentSubscriber = e;
            var c = u;
            return s(n) ? o = n : n && (o = n.next, r = n.error, i = n.complete, n !== h && (s((c = Object.create(n)).unsubscribe) && u.add(c.unsubscribe.bind(c)), c.unsubscribe = u.unsubscribe.bind(u))), u._context = c, u._next = o, u._error = r, u._complete = i, u
        }
        return o(e, t), e.prototype.next = function(t) {
            if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                c.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
            }
        }, e.prototype.error = function(t) {
            if (!this.isStopped) {
                var e = this._parentSubscriber,
                    n = c.useDeprecatedSynchronousErrorHandling;
                if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : a(t), this.unsubscribe();
                else {
                    if (this.unsubscribe(), n) throw t;
                    a(t)
                }
            }
        }, e.prototype.complete = function() {
            var t = this;
            if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                    var n = function() {
                        return t._complete.call(t._context)
                    };
                    c.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe())
                } else this.unsubscribe()
            }
        }, e.prototype.__tryOrUnsub = function(t, e) {
            try {
                t.call(this._context, e)
            } catch (t) {
                if (this.unsubscribe(), c.useDeprecatedSynchronousErrorHandling) throw t;
                a(t)
            }
        }, e.prototype.__tryOrSetError = function(t, e, n) {
            if (!c.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
            try {
                e.call(this._context, n)
            } catch (e) {
                return c.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = e, t.syncErrorThrown = !0, !0) : (a(e), !0)
            }
            return !1
        }, e.prototype._unsubscribe = function() {
            var t = this._parentSubscriber;
            this._context = null, this._parentSubscriber = null, t.unsubscribe()
        }, e
    }(y);

function w(t) {
    for (; t;) {
        var e = t,
            n = e.closed,
            r = e.destination,
            i = e.isStopped;
        if (n || i) return !1;
        t = r && r instanceof y ? r : null
    }
    return !0
}
var x = function() {
    return "function" == typeof Symbol && Symbol.observable || "@@observable"
}();

function _(t) {
    return t
}

function g() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return S(t)
}

function S(t) {
    return 0 === t.length ? _ : 1 === t.length ? t[0] : function(e) {
        return t.reduce((function(t, e) {
            return e(t)
        }), e)
    }
}
var E = function() {
    function t(t) {
        this._isScalar = !1, t && (this._subscribe = t)
    }
    return t.prototype.lift = function(e) {
        var n = new t;
        return n.source = this, n.operator = e, n
    }, t.prototype.subscribe = function(t, e, n) {
        var r = this.operator,
            i = function(t, e, n) {
                if (t) {
                    if (t instanceof y) return t;
                    if (t[v]) return t[v]()
                }
                return t || e || n ? new y(t, e, n) : new y(h)
            }(t, e, n);
        if (r ? i.add(r.call(i, this.source)) : i.add(this.source || c.useDeprecatedSynchronousErrorHandling && !i.syncErrorThrowable ? this._subscribe(i) : this._trySubscribe(i)), c.useDeprecatedSynchronousErrorHandling && i.syncErrorThrowable && (i.syncErrorThrowable = !1, i.syncErrorThrown)) throw i.syncErrorValue;
        return i
    }, t.prototype._trySubscribe = function(t) {
        try {
            return this._subscribe(t)
        } catch (e) {
            c.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), w(t) ? t.error(e) : console.warn(e)
        }
    }, t.prototype.forEach = function(t, e) {
        var n = this;
        return new(e = C(e))((function(e, r) {
            var i;
            i = n.subscribe((function(e) {
                try {
                    t(e)
                } catch (t) {
                    r(t), i && i.unsubscribe()
                }
            }), r, e)
        }))
    }, t.prototype._subscribe = function(t) {
        var e = this.source;
        return e && e.subscribe(t)
    }, t.prototype[x] = function() {
        return this
    }, t.prototype.pipe = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return 0 === t.length ? this : S(t)(this)
    }, t.prototype.toPromise = function(t) {
        var e = this;
        return new(t = C(t))((function(t, n) {
            var r;
            e.subscribe((function(t) {
                return r = t
            }), (function(t) {
                return n(t)
            }), (function() {
                return t(r)
            }))
        }))
    }, t.create = function(e) {
        return new t(e)
    }, t
}();

function C(t) {
    if (t || (t = c.Promise || Promise), !t) throw new Error("no Promise impl found");
    return t
}
var N = function() {
        function t() {
            return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }(),
    T = function(t) {
        function e(e, n) {
            var r = t.call(this) || this;
            return r.subject = e, r.subscriber = n, r.closed = !1, r
        }
        return o(e, t), e.prototype.unsubscribe = function() {
            if (!this.closed) {
                this.closed = !0;
                var t = this.subject,
                    e = t.observers;
                if (this.subject = null, e && 0 !== e.length && !t.isStopped && !t.closed) {
                    var n = e.indexOf(this.subscriber); - 1 !== n && e.splice(n, 1)
                }
            }
        }, e
    }(d),
    I = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.destination = e, n
        }
        return o(e, t), e
    }(y),
    V = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.observers = [], e.closed = !1, e.isStopped = !1, e.hasError = !1, e.thrownError = null, e
        }
        return o(e, t), e.prototype[v] = function() {
            return new I(this)
        }, e.prototype.lift = function(t) {
            var e = new j(this, this);
            return e.operator = t, e
        }, e.prototype.next = function(t) {
            if (this.closed) throw new N;
            if (!this.isStopped)
                for (var e = this.observers, n = e.length, r = e.slice(), i = 0; i < n; i++) r[i].next(t)
        }, e.prototype.error = function(t) {
            if (this.closed) throw new N;
            this.hasError = !0, this.thrownError = t, this.isStopped = !0;
            for (var e = this.observers, n = e.length, r = e.slice(), i = 0; i < n; i++) r[i].error(t);
            this.observers.length = 0
        }, e.prototype.complete = function() {
            if (this.closed) throw new N;
            this.isStopped = !0;
            for (var t = this.observers, e = t.length, n = t.slice(), r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0
        }, e.prototype.unsubscribe = function() {
            this.isStopped = !0, this.closed = !0, this.observers = null
        }, e.prototype._trySubscribe = function(e) {
            if (this.closed) throw new N;
            return t.prototype._trySubscribe.call(this, e)
        }, e.prototype._subscribe = function(t) {
            if (this.closed) throw new N;
            return this.hasError ? (t.error(this.thrownError), d.EMPTY) : this.isStopped ? (t.complete(), d.EMPTY) : (this.observers.push(t), new T(this, t))
        }, e.prototype.asObservable = function() {
            var t = new E;
            return t.source = this, t
        }, e.create = function(t, e) {
            return new j(t, e)
        }, e
    }(E),
    j = function(t) {
        function e(e, n) {
            var r = t.call(this) || this;
            return r.destination = e, r.source = n, r
        }
        return o(e, t), e.prototype.next = function(t) {
            var e = this.destination;
            e && e.next && e.next(t)
        }, e.prototype.error = function(t) {
            var e = this.destination;
            e && e.error && this.destination.error(t)
        }, e.prototype.complete = function() {
            var t = this.destination;
            t && t.complete && this.destination.complete()
        }, e.prototype._subscribe = function(t) {
            return this.source ? this.source.subscribe(t) : d.EMPTY
        }, e
    }(V);

function O() {
    return function(t) {
        return t.lift(new P(t))
    }
}
var P = function() {
        function t(t) {
            this.connectable = t
        }
        return t.prototype.call = function(t, e) {
            var n = this.connectable;
            n._refCount++;
            var r = new A(t, n),
                i = e.subscribe(r);
            return r.closed || (r.connection = n.connect()), i
        }, t
    }(),
    A = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.connectable = n, r
        }
        return o(e, t), e.prototype._unsubscribe = function() {
            var t = this.connectable;
            if (t) {
                this.connectable = null;
                var e = t._refCount;
                if (e <= 0) this.connection = null;
                else if (t._refCount = e - 1, e > 1) this.connection = null;
                else {
                    var n = this.connection,
                        r = t._connection;
                    this.connection = null, !r || n && r !== n || r.unsubscribe()
                }
            } else this.connection = null
        }, e
    }(y),
    k = function(t) {
        function e(e, n) {
            var r = t.call(this) || this;
            return r.source = e, r.subjectFactory = n, r._refCount = 0, r._isComplete = !1, r
        }
        return o(e, t), e.prototype._subscribe = function(t) {
            return this.getSubject().subscribe(t)
        }, e.prototype.getSubject = function() {
            var t = this._subject;
            return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
        }, e.prototype.connect = function() {
            var t = this._connection;
            return t || (this._isComplete = !1, (t = this._connection = new d).add(this.source.subscribe(new R(this.getSubject(), this))), t.closed && (this._connection = null, t = d.EMPTY)), t
        }, e.prototype.refCount = function() {
            return O()(this)
        }, e
    }(E),
    F = function() {
        var t = k.prototype;
        return {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: !0
            },
            _subject: {
                value: null,
                writable: !0
            },
            _connection: {
                value: null,
                writable: !0
            },
            _subscribe: {
                value: t._subscribe
            },
            _isComplete: {
                value: t._isComplete,
                writable: !0
            },
            getSubject: {
                value: t.getSubject
            },
            connect: {
                value: t.connect
            },
            refCount: {
                value: t.refCount
            }
        }
    }(),
    R = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.connectable = n, r
        }
        return o(e, t), e.prototype._error = function(e) {
            this._unsubscribe(), t.prototype._error.call(this, e)
        }, e.prototype._complete = function() {
            this.connectable._isComplete = !0, this._unsubscribe(), t.prototype._complete.call(this)
        }, e.prototype._unsubscribe = function() {
            var t = this.connectable;
            if (t) {
                this.connectable = null;
                var e = t._connection;
                t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
            }
        }, e
    }(I);
var M = function() {
        function t(t, e, n, r) {
            this.keySelector = t, this.elementSelector = e, this.durationSelector = n, this.subjectSelector = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new D(t, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector))
        }, t
    }(),
    D = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            return s.keySelector = n, s.elementSelector = r, s.durationSelector = i, s.subjectSelector = o, s.groups = null, s.attemptedToUnsubscribe = !1, s.count = 0, s
        }
        return o(e, t), e.prototype._next = function(t) {
            var e;
            try {
                e = this.keySelector(t)
            } catch (t) {
                return void this.error(t)
            }
            this._group(t, e)
        }, e.prototype._group = function(t, e) {
            var n = this.groups;
            n || (n = this.groups = new Map);
            var r, i = n.get(e);
            if (this.elementSelector) try {
                r = this.elementSelector(t)
            } catch (t) {
                this.error(t)
            } else r = t;
            if (!i) {
                i = this.subjectSelector ? this.subjectSelector() : new V, n.set(e, i);
                var o = new z(e, i, this);
                if (this.destination.next(o), this.durationSelector) {
                    var s = void 0;
                    try {
                        s = this.durationSelector(new z(e, i))
                    } catch (t) {
                        return void this.error(t)
                    }
                    this.add(s.subscribe(new W(e, i, this)))
                }
            }
            i.closed || i.next(r)
        }, e.prototype._error = function(t) {
            var e = this.groups;
            e && (e.forEach((function(e, n) {
                e.error(t)
            })), e.clear()), this.destination.error(t)
        }, e.prototype._complete = function() {
            var t = this.groups;
            t && (t.forEach((function(t, e) {
                t.complete()
            })), t.clear()), this.destination.complete()
        }, e.prototype.removeGroup = function(t) {
            this.groups.delete(t)
        }, e.prototype.unsubscribe = function() {
            this.closed || (this.attemptedToUnsubscribe = !0, 0 === this.count && t.prototype.unsubscribe.call(this))
        }, e
    }(y),
    W = function(t) {
        function e(e, n, r) {
            var i = t.call(this, n) || this;
            return i.key = e, i.group = n, i.parent = r, i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.complete()
        }, e.prototype._unsubscribe = function() {
            var t = this.parent,
                e = this.key;
            this.key = this.parent = null, t && t.removeGroup(e)
        }, e
    }(y),
    z = function(t) {
        function e(e, n, r) {
            var i = t.call(this) || this;
            return i.key = e, i.groupSubject = n, i.refCountSubscription = r, i
        }
        return o(e, t), e.prototype._subscribe = function(t) {
            var e = new d,
                n = this.refCountSubscription,
                r = this.groupSubject;
            return n && !n.closed && e.add(new B(n)), e.add(r.subscribe(t)), e
        }, e
    }(E),
    B = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.parent = e, e.count++, n
        }
        return o(e, t), e.prototype.unsubscribe = function() {
            var e = this.parent;
            e.closed || this.closed || (t.prototype.unsubscribe.call(this), e.count -= 1, 0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe())
        }, e
    }(d),
    U = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n._value = e, n
        }
        return o(e, t), Object.defineProperty(e.prototype, "value", {
            get: function() {
                return this.getValue()
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype._subscribe = function(e) {
            var n = t.prototype._subscribe.call(this, e);
            return n && !n.closed && e.next(this._value), n
        }, e.prototype.getValue = function() {
            if (this.hasError) throw this.thrownError;
            if (this.closed) throw new N;
            return this._value
        }, e.prototype.next = function(e) {
            t.prototype.next.call(this, this._value = e)
        }, e
    }(V),
    Y = function(t) {
        function e(e, n) {
            var r = t.call(this, e, n) || this;
            return r.scheduler = e, r.work = n, r.pending = !1, r
        }
        return o(e, t), e.prototype.schedule = function(t, e) {
            if (void 0 === e && (e = 0), this.closed) return this;
            this.state = t;
            var n = this.id,
                r = this.scheduler;
            return null != n && (this.id = this.recycleAsyncId(r, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(r, this.id, e), this
        }, e.prototype.requestAsyncId = function(t, e, n) {
            return void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n)
        }, e.prototype.recycleAsyncId = function(t, e, n) {
            if (void 0 === n && (n = 0), null !== n && this.delay === n && !1 === this.pending) return e;
            clearInterval(e)
        }, e.prototype.execute = function(t, e) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            var n = this._execute(t, e);
            if (n) return n;
            !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }, e.prototype._execute = function(t, e) {
            var n = !1,
                r = void 0;
            try {
                this.work(t)
            } catch (t) {
                n = !0, r = !!t && t || new Error(t)
            }
            if (n) return this.unsubscribe(), r
        }, e.prototype._unsubscribe = function() {
            var t = this.id,
                e = this.scheduler,
                n = e.actions,
                r = n.indexOf(this);
            this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== r && n.splice(r, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
        }, e
    }(function(t) {
        function e(e, n) {
            return t.call(this) || this
        }
        return o(e, t), e.prototype.schedule = function(t, e) {
            return this
        }, e
    }(d)),
    G = function(t) {
        function e(e, n) {
            var r = t.call(this, e, n) || this;
            return r.scheduler = e, r.work = n, r
        }
        return o(e, t), e.prototype.schedule = function(e, n) {
            return void 0 === n && (n = 0), n > 0 ? t.prototype.schedule.call(this, e, n) : (this.delay = n, this.state = e, this.scheduler.flush(this), this)
        }, e.prototype.execute = function(e, n) {
            return n > 0 || this.closed ? t.prototype.execute.call(this, e, n) : this._execute(e, n)
        }, e.prototype.requestAsyncId = function(e, n, r) {
            return void 0 === r && (r = 0), null !== r && r > 0 || null === r && this.delay > 0 ? t.prototype.requestAsyncId.call(this, e, n, r) : e.flush(this)
        }, e
    }(Y),
    q = function() {
        function t(e, n) {
            void 0 === n && (n = t.now), this.SchedulerAction = e, this.now = n
        }
        return t.prototype.schedule = function(t, e, n) {
            return void 0 === e && (e = 0), new this.SchedulerAction(this, t).schedule(n, e)
        }, t.now = function() {
            return Date.now()
        }, t
    }(),
    L = function(t) {
        function e(n, r) {
            void 0 === r && (r = q.now);
            var i = t.call(this, n, (function() {
                return e.delegate && e.delegate !== i ? e.delegate.now() : r()
            })) || this;
            return i.actions = [], i.active = !1, i.scheduled = void 0, i
        }
        return o(e, t), e.prototype.schedule = function(n, r, i) {
            return void 0 === r && (r = 0), e.delegate && e.delegate !== this ? e.delegate.schedule(n, r, i) : t.prototype.schedule.call(this, n, r, i)
        }, e.prototype.flush = function(t) {
            var e = this.actions;
            if (this.active) e.push(t);
            else {
                var n;
                this.active = !0;
                do {
                    if (n = t.execute(t.state, t.delay)) break
                } while (t = e.shift());
                if (this.active = !1, n) {
                    for (; t = e.shift();) t.unsubscribe();
                    throw n
                }
            }
        }, e
    }(q),
    H = new(function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e
    }(L))(G),
    K = H,
    Q = new E((function(t) {
        return t.complete()
    }));

function J(t) {
    return t ? function(t) {
        return new E((function(e) {
            return t.schedule((function() {
                return e.complete()
            }))
        }))
    }(t) : Q
}

function X(t) {
    return t && "function" == typeof t.schedule
}
var Z, $ = function(t) {
    return function(e) {
        for (var n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete()
    }
};

function tt(t, e) {
    return new E((function(n) {
        var r = new d,
            i = 0;
        return r.add(e.schedule((function() {
            i !== t.length ? (n.next(t[i++]), n.closed || r.add(this.schedule())) : n.complete()
        }))), r
    }))
}

function et(t, e) {
    return e ? tt(t, e) : new E($(t))
}

function nt() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = t[t.length - 1];
    return X(n) ? (t.pop(), tt(t, n)) : et(t)
}

function rt(t, e) {
    return new E(e ? function(n) {
        return e.schedule(it, 0, {
            error: t,
            subscriber: n
        })
    } : function(e) {
        return e.error(t)
    })
}

function it(t) {
    var e = t.error;
    t.subscriber.error(e)
}
Z || (Z = {});
var ot = function() {
    function t(t, e, n) {
        this.kind = t, this.value = e, this.error = n, this.hasValue = "N" === t
    }
    return t.prototype.observe = function(t) {
        switch (this.kind) {
            case "N":
                return t.next && t.next(this.value);
            case "E":
                return t.error && t.error(this.error);
            case "C":
                return t.complete && t.complete()
        }
    }, t.prototype.do = function(t, e, n) {
        switch (this.kind) {
            case "N":
                return t && t(this.value);
            case "E":
                return e && e(this.error);
            case "C":
                return n && n()
        }
    }, t.prototype.accept = function(t, e, n) {
        return t && "function" == typeof t.next ? this.observe(t) : this.do(t, e, n)
    }, t.prototype.toObservable = function() {
        switch (this.kind) {
            case "N":
                return nt(this.value);
            case "E":
                return rt(this.error);
            case "C":
                return J()
        }
        throw new Error("unexpected notification kind value")
    }, t.createNext = function(e) {
        return void 0 !== e ? new t("N", e) : t.undefinedValueNotification
    }, t.createError = function(e) {
        return new t("E", void 0, e)
    }, t.createComplete = function() {
        return t.completeNotification
    }, t.completeNotification = new t("C"), t.undefinedValueNotification = new t("N", void 0), t
}();
var st = function() {
        function t(t, e) {
            void 0 === e && (e = 0), this.scheduler = t, this.delay = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ut(t, this.scheduler, this.delay))
        }, t
    }(),
    ut = function(t) {
        function e(e, n, r) {
            void 0 === r && (r = 0);
            var i = t.call(this, e) || this;
            return i.scheduler = n, i.delay = r, i
        }
        return o(e, t), e.dispatch = function(t) {
            var e = t.notification,
                n = t.destination;
            e.observe(n), this.unsubscribe()
        }, e.prototype.scheduleMessage = function(t) {
            this.destination.add(this.scheduler.schedule(e.dispatch, this.delay, new ct(t, this.destination)))
        }, e.prototype._next = function(t) {
            this.scheduleMessage(ot.createNext(t))
        }, e.prototype._error = function(t) {
            this.scheduleMessage(ot.createError(t)), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.scheduleMessage(ot.createComplete()), this.unsubscribe()
        }, e
    }(y),
    ct = function() {
        return function(t, e) {
            this.notification = t, this.destination = e
        }
    }(),
    at = function(t) {
        function e(e, n, r) {
            void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === n && (n = Number.POSITIVE_INFINITY);
            var i = t.call(this) || this;
            return i.scheduler = r, i._events = [], i._infiniteTimeWindow = !1, i._bufferSize = e < 1 ? 1 : e, i._windowTime = n < 1 ? 1 : n, n === Number.POSITIVE_INFINITY ? (i._infiniteTimeWindow = !0, i.next = i.nextInfiniteTimeWindow) : i.next = i.nextTimeWindow, i
        }
        return o(e, t), e.prototype.nextInfiniteTimeWindow = function(e) {
            if (!this.isStopped) {
                var n = this._events;
                n.push(e), n.length > this._bufferSize && n.shift()
            }
            t.prototype.next.call(this, e)
        }, e.prototype.nextTimeWindow = function(e) {
            this.isStopped || (this._events.push(new ht(this._getNow(), e)), this._trimBufferThenGetEvents()), t.prototype.next.call(this, e)
        }, e.prototype._subscribe = function(t) {
            var e, n = this._infiniteTimeWindow,
                r = n ? this._events : this._trimBufferThenGetEvents(),
                i = this.scheduler,
                o = r.length;
            if (this.closed) throw new N;
            if (this.isStopped || this.hasError ? e = d.EMPTY : (this.observers.push(t), e = new T(this, t)), i && t.add(t = new ut(t, i)), n)
                for (var s = 0; s < o && !t.closed; s++) t.next(r[s]);
            else
                for (s = 0; s < o && !t.closed; s++) t.next(r[s].value);
            return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), e
        }, e.prototype._getNow = function() {
            return (this.scheduler || K).now()
        }, e.prototype._trimBufferThenGetEvents = function() {
            for (var t = this._getNow(), e = this._bufferSize, n = this._windowTime, r = this._events, i = r.length, o = 0; o < i && !(t - r[o].time < n);) o++;
            return i > e && (o = Math.max(o, i - e)), o > 0 && r.splice(0, o), r
        }, e
    }(V),
    ht = function() {
        return function(t, e) {
            this.time = t, this.value = e
        }
    }(),
    lt = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.value = null, e.hasNext = !1, e.hasCompleted = !1, e
        }
        return o(e, t), e.prototype._subscribe = function(e) {
            return this.hasError ? (e.error(this.thrownError), d.EMPTY) : this.hasCompleted && this.hasNext ? (e.next(this.value), e.complete(), d.EMPTY) : t.prototype._subscribe.call(this, e)
        }, e.prototype.next = function(t) {
            this.hasCompleted || (this.value = t, this.hasNext = !0)
        }, e.prototype.error = function(e) {
            this.hasCompleted || t.prototype.error.call(this, e)
        }, e.prototype.complete = function() {
            this.hasCompleted = !0, this.hasNext && t.prototype.next.call(this, this.value), t.prototype.complete.call(this)
        }, e
    }(V),
    ft = 1,
    pt = function() {
        return Promise.resolve()
    }(),
    dt = {};

function bt(t) {
    return t in dt && (delete dt[t], !0)
}
var vt = function(t) {
        var e = ft++;
        return dt[e] = !0, pt.then((function() {
            return bt(e) && t()
        })), e
    },
    yt = function(t) {
        bt(t)
    },
    mt = function(t) {
        function e(e, n) {
            var r = t.call(this, e, n) || this;
            return r.scheduler = e, r.work = n, r
        }
        return o(e, t), e.prototype.requestAsyncId = function(e, n, r) {
            return void 0 === r && (r = 0), null !== r && r > 0 ? t.prototype.requestAsyncId.call(this, e, n, r) : (e.actions.push(this), e.scheduled || (e.scheduled = vt(e.flush.bind(e, null))))
        }, e.prototype.recycleAsyncId = function(e, n, r) {
            if (void 0 === r && (r = 0), null !== r && r > 0 || null === r && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, n, r);
            0 === e.actions.length && (yt(n), e.scheduled = void 0)
        }, e
    }(Y),
    wt = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e.prototype.flush = function(t) {
            this.active = !0, this.scheduled = void 0;
            var e, n = this.actions,
                r = -1,
                i = n.length;
            t = t || n.shift();
            do {
                if (e = t.execute(t.state, t.delay)) break
            } while (++r < i && (t = n.shift()));
            if (this.active = !1, e) {
                for (; ++r < i && (t = n.shift());) t.unsubscribe();
                throw e
            }
        }, e
    }(L),
    xt = new wt(mt),
    _t = xt,
    gt = new L(Y),
    St = gt,
    Et = function(t) {
        function e(e, n) {
            var r = t.call(this, e, n) || this;
            return r.scheduler = e, r.work = n, r
        }
        return o(e, t), e.prototype.requestAsyncId = function(e, n, r) {
            return void 0 === r && (r = 0), null !== r && r > 0 ? t.prototype.requestAsyncId.call(this, e, n, r) : (e.actions.push(this), e.scheduled || (e.scheduled = requestAnimationFrame((function() {
                return e.flush(null)
            }))))
        }, e.prototype.recycleAsyncId = function(e, n, r) {
            if (void 0 === r && (r = 0), null !== r && r > 0 || null === r && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, n, r);
            0 === e.actions.length && (cancelAnimationFrame(n), e.scheduled = void 0)
        }, e
    }(Y),
    Ct = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e.prototype.flush = function(t) {
            this.active = !0, this.scheduled = void 0;
            var e, n = this.actions,
                r = -1,
                i = n.length;
            t = t || n.shift();
            do {
                if (e = t.execute(t.state, t.delay)) break
            } while (++r < i && (t = n.shift()));
            if (this.active = !1, e) {
                for (; ++r < i && (t = n.shift());) t.unsubscribe();
                throw e
            }
        }, e
    }(L),
    Nt = new Ct(Et),
    Tt = Nt,
    It = function(t) {
        function e(e, n) {
            void 0 === e && (e = Vt), void 0 === n && (n = Number.POSITIVE_INFINITY);
            var r = t.call(this, e, (function() {
                return r.frame
            })) || this;
            return r.maxFrames = n, r.frame = 0, r.index = -1, r
        }
        return o(e, t), e.prototype.flush = function() {
            for (var t, e, n = this.actions, r = this.maxFrames;
                (e = n[0]) && e.delay <= r && (n.shift(), this.frame = e.delay, !(t = e.execute(e.state, e.delay))););
            if (t) {
                for (; e = n.shift();) e.unsubscribe();
                throw t
            }
        }, e.frameTimeFactor = 10, e
    }(L),
    Vt = function(t) {
        function e(e, n, r) {
            void 0 === r && (r = e.index += 1);
            var i = t.call(this, e, n) || this;
            return i.scheduler = e, i.work = n, i.index = r, i.active = !0, i.index = e.index = r, i
        }
        return o(e, t), e.prototype.schedule = function(n, r) {
            if (void 0 === r && (r = 0), !this.id) return t.prototype.schedule.call(this, n, r);
            this.active = !1;
            var i = new e(this.scheduler, this.work);
            return this.add(i), i.schedule(n, r)
        }, e.prototype.requestAsyncId = function(t, n, r) {
            void 0 === r && (r = 0), this.delay = t.frame + r;
            var i = t.actions;
            return i.push(this), i.sort(e.sortActions), !0
        }, e.prototype.recycleAsyncId = function(t, e, n) {}, e.prototype._execute = function(e, n) {
            if (!0 === this.active) return t.prototype._execute.call(this, e, n)
        }, e.sortActions = function(t, e) {
            return t.delay === e.delay ? t.index === e.index ? 0 : t.index > e.index ? 1 : -1 : t.delay > e.delay ? 1 : -1
        }, e
    }(Y);

function jt() {}
var Ot = function() {
        function t() {
            return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }(),
    Pt = function() {
        function t() {
            return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }(),
    At = function() {
        function t() {
            return Error.call(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this
        }
        return t.prototype = Object.create(Error.prototype), t
    }();

function kt(t, e) {
    return function(n) {
        if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
        return n.lift(new Ft(t, e))
    }
}
var Ft = function() {
        function t(t, e) {
            this.project = t, this.thisArg = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Rt(t, this.project, this.thisArg))
        }, t
    }(),
    Rt = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.project = n, i.count = 0, i.thisArg = r || i, i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e;
            try {
                e = this.project.call(this.thisArg, t, this.count++)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.next(e)
        }, e
    }(y);

function Mt(t) {
    var e = this,
        n = t.args,
        r = t.subscriber,
        i = t.params,
        o = i.callbackFunc,
        s = i.context,
        u = i.scheduler,
        c = i.subject;
    if (!c) {
        c = i.subject = new lt;
        try {
            o.apply(s, n.concat([function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var r = t.length <= 1 ? t[0] : t;
                e.add(u.schedule(Dt, 0, {
                    value: r,
                    subject: c
                }))
            }]))
        } catch (t) {
            c.error(t)
        }
    }
    this.add(c.subscribe(r))
}

function Dt(t) {
    var e = t.value,
        n = t.subject;
    n.next(e), n.complete()
}

function Wt(t) {
    var e = this,
        n = t.params,
        r = t.subscriber,
        i = t.context,
        o = n.callbackFunc,
        s = n.args,
        u = n.scheduler,
        c = n.subject;
    if (!c) {
        c = n.subject = new lt;
        try {
            o.apply(i, s.concat([function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var r = t.shift();
                if (r) e.add(u.schedule(Bt, 0, {
                    err: r,
                    subject: c
                }));
                else {
                    var i = t.length <= 1 ? t[0] : t;
                    e.add(u.schedule(zt, 0, {
                        value: i,
                        subject: c
                    }))
                }
            }]))
        } catch (t) {
            this.add(u.schedule(Bt, 0, {
                err: t,
                subject: c
            }))
        }
    }
    this.add(c.subscribe(r))
}

function zt(t) {
    var e = t.value,
        n = t.subject;
    n.next(e), n.complete()
}

function Bt(t) {
    var e = t.err;
    t.subject.error(e)
}
var Ut = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e.prototype.notifyNext = function(t, e, n, r, i) {
            this.destination.next(e)
        }, e.prototype.notifyError = function(t, e) {
            this.destination.error(t)
        }, e.prototype.notifyComplete = function(t) {
            this.destination.complete()
        }, e
    }(y),
    Yt = function(t) {
        function e(e, n, r) {
            var i = t.call(this) || this;
            return i.parent = e, i.outerValue = n, i.outerIndex = r, i.index = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
        }, e.prototype._error = function(t) {
            this.parent.notifyError(t, this), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.parent.notifyComplete(this), this.unsubscribe()
        }, e
    }(y);

function Gt() {
    return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
}
var qt = Gt(),
    Lt = function(t) {
        return t && "number" == typeof t.length && "function" != typeof t
    };

function Ht(t) {
    return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
}
var Kt = function(t) {
    if (t && "function" == typeof t[x]) return r = t,
        function(t) {
            var e = r[x]();
            if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
            return e.subscribe(t)
        };
    if (Lt(t)) return $(t);
    if (Ht(t)) return n = t,
        function(t) {
            return n.then((function(e) {
                t.closed || (t.next(e), t.complete())
            }), (function(e) {
                return t.error(e)
            })).then(null, a), t
        };
    if (t && "function" == typeof t[qt]) return e = t,
        function(t) {
            for (var n = e[qt]();;) {
                var r = void 0;
                try {
                    r = n.next()
                } catch (e) {
                    return t.error(e), t
                }
                if (r.done) {
                    t.complete();
                    break
                }
                if (t.next(r.value), t.closed) break
            }
            return "function" == typeof n.return && t.add((function() {
                n.return && n.return()
            })), t
        };
    var e, n, r, i = f(t) ? "an invalid object" : "'" + t + "'";
    throw new TypeError("You provided " + i + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")
};

function Qt(t, e, n, r, i) {
    if (void 0 === i && (i = new Yt(t, n, r)), !i.closed) return e instanceof E ? e.subscribe(i) : Kt(e)(i)
}
var Jt = {};
var Xt = function() {
        function t(t) {
            this.resultSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Zt(t, this.resultSelector))
        }, t
    }(),
    Zt = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.resultSelector = n, r.active = 0, r.values = [], r.observables = [], r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.values.push(Jt), this.observables.push(t)
        }, e.prototype._complete = function() {
            var t = this.observables,
                e = t.length;
            if (0 === e) this.destination.complete();
            else {
                this.active = e, this.toRespond = e;
                for (var n = 0; n < e; n++) {
                    var r = t[n];
                    this.add(Qt(this, r, void 0, n))
                }
            }
        }, e.prototype.notifyComplete = function(t) {
            0 == (this.active -= 1) && this.destination.complete()
        }, e.prototype.notifyNext = function(t, e, n) {
            var r = this.values,
                i = r[n],
                o = this.toRespond ? i === Jt ? --this.toRespond : this.toRespond : 0;
            r[n] = e, 0 === o && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
        }, e.prototype._tryResultSelector = function(t) {
            var e;
            try {
                e = this.resultSelector.apply(this, t)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.next(e)
        }, e
    }(Ut);

function $t(t, e) {
    if (null != t) {
        if (function(t) {
                return t && "function" == typeof t[x]
            }(t)) return function(t, e) {
            return new E((function(n) {
                var r = new d;
                return r.add(e.schedule((function() {
                    var i = t[x]();
                    r.add(i.subscribe({
                        next: function(t) {
                            r.add(e.schedule((function() {
                                return n.next(t)
                            })))
                        },
                        error: function(t) {
                            r.add(e.schedule((function() {
                                return n.error(t)
                            })))
                        },
                        complete: function() {
                            r.add(e.schedule((function() {
                                return n.complete()
                            })))
                        }
                    }))
                }))), r
            }))
        }(t, e);
        if (Ht(t)) return function(t, e) {
            return new E((function(n) {
                var r = new d;
                return r.add(e.schedule((function() {
                    return t.then((function(t) {
                        r.add(e.schedule((function() {
                            n.next(t), r.add(e.schedule((function() {
                                return n.complete()
                            })))
                        })))
                    }), (function(t) {
                        r.add(e.schedule((function() {
                            return n.error(t)
                        })))
                    }))
                }))), r
            }))
        }(t, e);
        if (Lt(t)) return tt(t, e);
        if (function(t) {
                return t && "function" == typeof t[qt]
            }(t) || "string" == typeof t) return function(t, e) {
            if (!t) throw new Error("Iterable cannot be null");
            return new E((function(n) {
                var r, i = new d;
                return i.add((function() {
                    r && "function" == typeof r.return && r.return()
                })), i.add(e.schedule((function() {
                    r = t[qt](), i.add(e.schedule((function() {
                        if (!n.closed) {
                            var t, e;
                            try {
                                var i = r.next();
                                t = i.value, e = i.done
                            } catch (t) {
                                return void n.error(t)
                            }
                            e ? n.complete() : (n.next(t), this.schedule())
                        }
                    })))
                }))), i
            }))
        }(t, e)
    }
    throw new TypeError((null !== t && typeof t || t) + " is not observable")
}

function te(t, e) {
    return e ? $t(t, e) : t instanceof E ? t : new E(Kt(t))
}
var ee = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.parent = e, n
        }
        return o(e, t), e.prototype._next = function(t) {
            this.parent.notifyNext(t)
        }, e.prototype._error = function(t) {
            this.parent.notifyError(t), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.parent.notifyComplete(), this.unsubscribe()
        }, e
    }(y),
    ne = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e.prototype.notifyNext = function(t) {
            this.destination.next(t)
        }, e.prototype.notifyError = function(t) {
            this.destination.error(t)
        }, e.prototype.notifyComplete = function() {
            this.destination.complete()
        }, e
    }(y);

function re(t, e) {
    if (!e.closed) {
        if (t instanceof E) return t.subscribe(e);
        var n;
        try {
            n = Kt(t)(e)
        } catch (t) {
            e.error(t)
        }
        return n
    }
}

function ie(t, e, n) {
    return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof e ? function(r) {
        return r.pipe(ie((function(n, r) {
            return te(t(n, r)).pipe(kt((function(t, i) {
                return e(n, t, r, i)
            })))
        }), n))
    } : ("number" == typeof e && (n = e), function(e) {
        return e.lift(new oe(t, n))
    })
}
var oe = function() {
        function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY), this.project = t, this.concurrent = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new se(t, this.project, this.concurrent))
        }, t
    }(),
    se = function(t) {
        function e(e, n, r) {
            void 0 === r && (r = Number.POSITIVE_INFINITY);
            var i = t.call(this, e) || this;
            return i.project = n, i.concurrent = r, i.hasCompleted = !1, i.buffer = [], i.active = 0, i.index = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
        }, e.prototype._tryNext = function(t) {
            var e, n = this.index++;
            try {
                e = this.project(t, n)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.active++, this._innerSub(e)
        }, e.prototype._innerSub = function(t) {
            var e = new ee(this),
                n = this.destination;
            n.add(e);
            var r = re(t, e);
            r !== e && n.add(r)
        }, e.prototype._complete = function() {
            this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
        }, e.prototype.notifyNext = function(t) {
            this.destination.next(t)
        }, e.prototype.notifyComplete = function() {
            var t = this.buffer;
            this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
        }, e
    }(ne),
    ue = ie;

function ce(t) {
    return void 0 === t && (t = Number.POSITIVE_INFINITY), ie(_, t)
}

function ae() {
    return ce(1)
}

function he() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return ae()(nt.apply(void 0, t))
}

function le(t) {
    return new E((function(e) {
        var n;
        try {
            n = t()
        } catch (t) {
            return void e.error(t)
        }
        return (n ? te(n) : J()).subscribe(e)
    }))
}

function fe(t, e) {
    return new E((function(n) {
        var r = t.length;
        if (0 !== r)
            for (var i = new Array(r), o = 0, s = 0, u = function(u) {
                    var c = te(t[u]),
                        a = !1;
                    n.add(c.subscribe({
                        next: function(t) {
                            a || (a = !0, s++), i[u] = t
                        },
                        error: function(t) {
                            return n.error(t)
                        },
                        complete: function() {
                            ++o !== r && a || (s === r && n.next(e ? e.reduce((function(t, e, n) {
                                return t[e] = i[n], t
                            }), {}) : i), n.complete())
                        }
                    }))
                }, c = 0; c < r; c++) u(c);
        else n.complete()
    }))
}

function pe(t, e, n, r, i) {
    var o;
    if (function(t) {
            return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
        }(t)) {
        var s = t;
        t.addEventListener(e, n, i), o = function() {
            return s.removeEventListener(e, n, i)
        }
    } else if (function(t) {
            return t && "function" == typeof t.on && "function" == typeof t.off
        }(t)) {
        var u = t;
        t.on(e, n), o = function() {
            return u.off(e, n)
        }
    } else if (function(t) {
            return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
        }(t)) {
        var c = t;
        t.addListener(e, n), o = function() {
            return c.removeListener(e, n)
        }
    } else {
        if (!t || !t.length) throw new TypeError("Invalid event target");
        for (var a = 0, h = t.length; a < h; a++) pe(t[a], e, n, r, i)
    }
    r.add(o)
}

function de(t) {
    var e = t.subscriber,
        n = t.condition;
    if (!e.closed) {
        if (t.needIterate) try {
            t.state = t.iterate(t.state)
        } catch (t) {
            return void e.error(t)
        } else t.needIterate = !0;
        if (n) {
            var r = void 0;
            try {
                r = n(t.state)
            } catch (t) {
                return void e.error(t)
            }
            if (!r) return void e.complete();
            if (e.closed) return
        }
        var i;
        try {
            i = t.resultSelector(t.state)
        } catch (t) {
            return void e.error(t)
        }
        if (!e.closed && (e.next(i), !e.closed)) return this.schedule(t)
    }
}

function be(t) {
    return !l(t) && t - parseFloat(t) + 1 >= 0
}

function ve(t) {
    var e = t.subscriber,
        n = t.counter,
        r = t.period;
    e.next(n), this.schedule({
        subscriber: e,
        counter: n + 1,
        period: r
    }, r)
}

function ye() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = Number.POSITIVE_INFINITY,
        r = null,
        i = t[t.length - 1];
    return X(i) ? (r = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (n = t.pop())) : "number" == typeof i && (n = t.pop()), null === r && 1 === t.length && t[0] instanceof E ? t[0] : ce(n)(et(t, r))
}
var me = new E(jt);

function we(t) {
    var e = t.keys,
        n = t.index,
        r = t.subscriber,
        i = t.subscription,
        o = t.obj;
    if (!r.closed)
        if (n < e.length) {
            var s = e[n];
            r.next([s, o[s]]), i.add(this.schedule({
                keys: e,
                index: n + 1,
                subscriber: r,
                subscription: i,
                obj: o
            }))
        } else r.complete()
}

function xe(t, e) {
    function n() {
        return !n.pred.apply(n.thisArg, arguments)
    }
    return n.pred = t, n.thisArg = e, n
}

function _e(t, e) {
    return function(n) {
        return n.lift(new ge(t, e))
    }
}
var ge = function() {
        function t(t, e) {
            this.predicate = t, this.thisArg = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Se(t, this.predicate, this.thisArg))
        }, t
    }(),
    Se = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.predicate = n, i.thisArg = r, i.count = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e;
            try {
                e = this.predicate.call(this.thisArg, t, this.count++)
            } catch (t) {
                return void this.destination.error(t)
            }
            e && this.destination.next(t)
        }, e
    }(y);

function Ee() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    if (1 === t.length) {
        if (!l(t[0])) return t[0];
        t = t[0]
    }
    return et(t, void 0).lift(new Ce)
}
var Ce = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Ne(t))
        }, t
    }(),
    Ne = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.hasFirst = !1, n.observables = [], n.subscriptions = [], n
        }
        return o(e, t), e.prototype._next = function(t) {
            this.observables.push(t)
        }, e.prototype._complete = function() {
            var t = this.observables,
                e = t.length;
            if (0 === e) this.destination.complete();
            else {
                for (var n = 0; n < e && !this.hasFirst; n++) {
                    var r = Qt(this, t[n], void 0, n);
                    this.subscriptions && this.subscriptions.push(r), this.add(r)
                }
                this.observables = null
            }
        }, e.prototype.notifyNext = function(t, e, n) {
            if (!this.hasFirst) {
                this.hasFirst = !0;
                for (var r = 0; r < this.subscriptions.length; r++)
                    if (r !== n) {
                        var i = this.subscriptions[r];
                        i.unsubscribe(), this.remove(i)
                    } this.subscriptions = null
            }
            this.destination.next(e)
        }, e
    }(Ut);

function Te(t) {
    var e = t.start,
        n = t.index,
        r = t.count,
        i = t.subscriber;
    n >= r ? i.complete() : (i.next(e), i.closed || (t.index = n + 1, t.start = e + 1, this.schedule(t)))
}

function Ie(t, e, n) {
    void 0 === t && (t = 0);
    var r = -1;
    return be(e) ? r = Number(e) < 1 ? 1 : Number(e) : X(e) && (n = e), X(n) || (n = St), new E((function(e) {
        var i = be(t) ? t : +t - n.now();
        return n.schedule(Ve, i, {
            index: 0,
            period: r,
            subscriber: e
        })
    }))
}

function Ve(t) {
    var e = t.index,
        n = t.period,
        r = t.subscriber;
    if (r.next(e), !r.closed) {
        if (-1 === n) return r.complete();
        t.index = e + 1, this.schedule(t, n)
    }
}

function je() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = t[t.length - 1];
    return "function" == typeof n && t.pop(), et(t, void 0).lift(new Oe(n))
}
var Oe = function() {
        function t(t) {
            this.resultSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Pe(t, this.resultSelector))
        }, t
    }(),
    Pe = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.resultSelector = n, i.iterators = [], i.active = 0, i.resultSelector = "function" == typeof n ? n : void 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.iterators;
            l(t) ? e.push(new ke(t)) : "function" == typeof t[qt] ? e.push(new Ae(t[qt]())) : e.push(new Fe(this.destination, this, t))
        }, e.prototype._complete = function() {
            var t = this.iterators,
                e = t.length;
            if (this.unsubscribe(), 0 !== e) {
                this.active = e;
                for (var n = 0; n < e; n++) {
                    var r = t[n];
                    if (r.stillUnsubscribed) this.destination.add(r.subscribe());
                    else this.active--
                }
            } else this.destination.complete()
        }, e.prototype.notifyInactive = function() {
            this.active--, 0 === this.active && this.destination.complete()
        }, e.prototype.checkIterators = function() {
            for (var t = this.iterators, e = t.length, n = this.destination, r = 0; r < e; r++) {
                if ("function" == typeof(s = t[r]).hasValue && !s.hasValue()) return
            }
            var i = !1,
                o = [];
            for (r = 0; r < e; r++) {
                var s, u = (s = t[r]).next();
                if (s.hasCompleted() && (i = !0), u.done) return void n.complete();
                o.push(u.value)
            }
            this.resultSelector ? this._tryresultSelector(o) : n.next(o), i && n.complete()
        }, e.prototype._tryresultSelector = function(t) {
            var e;
            try {
                e = this.resultSelector.apply(this, t)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.next(e)
        }, e
    }(y),
    Ae = function() {
        function t(t) {
            this.iterator = t, this.nextResult = t.next()
        }
        return t.prototype.hasValue = function() {
            return !0
        }, t.prototype.next = function() {
            var t = this.nextResult;
            return this.nextResult = this.iterator.next(), t
        }, t.prototype.hasCompleted = function() {
            var t = this.nextResult;
            return Boolean(t && t.done)
        }, t
    }(),
    ke = function() {
        function t(t) {
            this.array = t, this.index = 0, this.length = 0, this.length = t.length
        }
        return t.prototype[qt] = function() {
            return this
        }, t.prototype.next = function(t) {
            var e = this.index++,
                n = this.array;
            return e < this.length ? {
                value: n[e],
                done: !1
            } : {
                value: null,
                done: !0
            }
        }, t.prototype.hasValue = function() {
            return this.array.length > this.index
        }, t.prototype.hasCompleted = function() {
            return this.array.length === this.index
        }, t
    }(),
    Fe = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.parent = n, i.observable = r, i.stillUnsubscribed = !0, i.buffer = [], i.isComplete = !1, i
        }
        return o(e, t), e.prototype[qt] = function() {
            return this
        }, e.prototype.next = function() {
            var t = this.buffer;
            return 0 === t.length && this.isComplete ? {
                value: null,
                done: !0
            } : {
                value: t.shift(),
                done: !1
            }
        }, e.prototype.hasValue = function() {
            return this.buffer.length > 0
        }, e.prototype.hasCompleted = function() {
            return 0 === this.buffer.length && this.isComplete
        }, e.prototype.notifyComplete = function() {
            this.buffer.length > 0 ? (this.isComplete = !0, this.parent.notifyInactive()) : this.destination.complete()
        }, e.prototype.notifyNext = function(t) {
            this.buffer.push(t), this.parent.checkIterators()
        }, e.prototype.subscribe = function() {
            return re(this.observable, new ee(this))
        }, e
    }(ne),
    Re = Object.freeze({
        __proto__: null,
        Observable: E,
        ConnectableObservable: k,
        GroupedObservable: z,
        observable: x,
        Subject: V,
        BehaviorSubject: U,
        ReplaySubject: at,
        AsyncSubject: lt,
        asap: _t,
        asapScheduler: xt,
        async: St,
        asyncScheduler: gt,
        queue: K,
        queueScheduler: H,
        animationFrame: Tt,
        animationFrameScheduler: Nt,
        VirtualTimeScheduler: It,
        VirtualAction: Vt,
        Scheduler: q,
        Subscription: d,
        Subscriber: y,
        Notification: ot,
        get NotificationKind() {
            return Z
        },
        pipe: g,
        noop: jt,
        identity: _,
        isObservable: function(t) {
            return !!t && (t instanceof E || "function" == typeof t.lift && "function" == typeof t.subscribe)
        },
        ArgumentOutOfRangeError: Ot,
        EmptyError: Pt,
        ObjectUnsubscribedError: N,
        UnsubscriptionError: p,
        TimeoutError: At,
        bindCallback: function t(e, n, r) {
            if (n) {
                if (!X(n)) return function() {
                    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                    return t(e, r).apply(void 0, i).pipe(kt((function(t) {
                        return l(t) ? n.apply(void 0, t) : n(t)
                    })))
                };
                r = n
            }
            return function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var i, o = this,
                    s = {
                        context: o,
                        subject: i,
                        callbackFunc: e,
                        scheduler: r
                    };
                return new E((function(n) {
                    if (r) {
                        var u = {
                            args: t,
                            subscriber: n,
                            params: s
                        };
                        return r.schedule(Mt, 0, u)
                    }
                    if (!i) {
                        i = new lt;
                        try {
                            e.apply(o, t.concat([function() {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                i.next(t.length <= 1 ? t[0] : t), i.complete()
                            }]))
                        } catch (t) {
                            w(i) ? i.error(t) : console.warn(t)
                        }
                    }
                    return i.subscribe(n)
                }))
            }
        },
        bindNodeCallback: function t(e, n, r) {
            if (n) {
                if (!X(n)) return function() {
                    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                    return t(e, r).apply(void 0, i).pipe(kt((function(t) {
                        return l(t) ? n.apply(void 0, t) : n(t)
                    })))
                };
                r = n
            }
            return function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var i = {
                    subject: void 0,
                    args: t,
                    callbackFunc: e,
                    scheduler: r,
                    context: this
                };
                return new E((function(n) {
                    var o = i.context,
                        s = i.subject;
                    if (r) return r.schedule(Wt, 0, {
                        params: i,
                        subscriber: n,
                        context: o
                    });
                    if (!s) {
                        s = i.subject = new lt;
                        try {
                            e.apply(o, t.concat([function() {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                var n = t.shift();
                                n ? s.error(n) : (s.next(t.length <= 1 ? t[0] : t), s.complete())
                            }]))
                        } catch (t) {
                            w(s) ? s.error(t) : console.warn(t)
                        }
                    }
                    return s.subscribe(n)
                }))
            }
        },
        combineLatest: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            var n = void 0,
                r = void 0;
            return X(t[t.length - 1]) && (r = t.pop()), "function" == typeof t[t.length - 1] && (n = t.pop()), 1 === t.length && l(t[0]) && (t = t[0]), et(t, r).lift(new Xt(n))
        },
        concat: he,
        defer: le,
        empty: J,
        forkJoin: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            if (1 === t.length) {
                var n = t[0];
                if (l(n)) return fe(n, null);
                if (f(n) && Object.getPrototypeOf(n) === Object.prototype) {
                    var r = Object.keys(n);
                    return fe(r.map((function(t) {
                        return n[t]
                    })), r)
                }
            }
            if ("function" == typeof t[t.length - 1]) {
                var i = t.pop();
                return fe(t = 1 === t.length && l(t[0]) ? t[0] : t, null).pipe(kt((function(t) {
                    return i.apply(void 0, t)
                })))
            }
            return fe(t, null)
        },
        from: te,
        fromEvent: function t(e, n, r, i) {
            return s(r) && (i = r, r = void 0), i ? t(e, n, r).pipe(kt((function(t) {
                return l(t) ? i.apply(void 0, t) : i(t)
            }))) : new E((function(t) {
                pe(e, n, (function(e) {
                    arguments.length > 1 ? t.next(Array.prototype.slice.call(arguments)) : t.next(e)
                }), t, r)
            }))
        },
        fromEventPattern: function t(e, n, r) {
            return r ? t(e, n).pipe(kt((function(t) {
                return l(t) ? r.apply(void 0, t) : r(t)
            }))) : new E((function(t) {
                var r, i = function() {
                    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                    return t.next(1 === e.length ? e[0] : e)
                };
                try {
                    r = e(i)
                } catch (e) {
                    return void t.error(e)
                }
                if (s(n)) return function() {
                    return n(i, r)
                }
            }))
        },
        generate: function(t, e, n, r, i) {
            var o, s;
            if (1 == arguments.length) {
                var u = t;
                s = u.initialState, e = u.condition, n = u.iterate, o = u.resultSelector || _, i = u.scheduler
            } else void 0 === r || X(r) ? (s = t, o = _, i = r) : (s = t, o = r);
            return new E((function(t) {
                var r = s;
                if (i) return i.schedule(de, 0, {
                    subscriber: t,
                    iterate: n,
                    condition: e,
                    resultSelector: o,
                    state: r
                });
                for (;;) {
                    if (e) {
                        var u = void 0;
                        try {
                            u = e(r)
                        } catch (e) {
                            return void t.error(e)
                        }
                        if (!u) {
                            t.complete();
                            break
                        }
                    }
                    var c = void 0;
                    try {
                        c = o(r)
                    } catch (e) {
                        return void t.error(e)
                    }
                    if (t.next(c), t.closed) break;
                    try {
                        r = n(r)
                    } catch (e) {
                        return void t.error(e)
                    }
                }
            }))
        },
        iif: function(t, e, n) {
            return void 0 === e && (e = Q), void 0 === n && (n = Q), le((function() {
                return t() ? e : n
            }))
        },
        interval: function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = St), (!be(t) || t < 0) && (t = 0), e && "function" == typeof e.schedule || (e = St), new E((function(n) {
                return n.add(e.schedule(ve, t, {
                    subscriber: n,
                    counter: 0,
                    period: t
                })), n
            }))
        },
        merge: ye,
        never: function() {
            return me
        },
        of: nt,
        onErrorResumeNext: function t() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            if (0 === e.length) return Q;
            var r = e[0],
                i = e.slice(1);
            return 1 === e.length && l(r) ? t.apply(void 0, r) : new E((function(e) {
                var n = function() {
                    return e.add(t.apply(void 0, i).subscribe(e))
                };
                return te(r).subscribe({
                    next: function(t) {
                        e.next(t)
                    },
                    error: n,
                    complete: n
                })
            }))
        },
        pairs: function(t, e) {
            return new E(e ? function(n) {
                var r = Object.keys(t),
                    i = new d;
                return i.add(e.schedule(we, 0, {
                    keys: r,
                    index: 0,
                    subscriber: n,
                    subscription: i,
                    obj: t
                })), i
            } : function(e) {
                for (var n = Object.keys(t), r = 0; r < n.length && !e.closed; r++) {
                    var i = n[r];
                    t.hasOwnProperty(i) && e.next([i, t[i]])
                }
                e.complete()
            })
        },
        partition: function(t, e, n) {
            return [_e(e, n)(new E(Kt(t))), _e(xe(e, n))(new E(Kt(t)))]
        },
        race: Ee,
        range: function(t, e, n) {
            return void 0 === t && (t = 0), new E((function(r) {
                void 0 === e && (e = t, t = 0);
                var i = 0,
                    o = t;
                if (n) return n.schedule(Te, 0, {
                    index: i,
                    count: e,
                    start: t,
                    subscriber: r
                });
                for (;;) {
                    if (i++ >= e) {
                        r.complete();
                        break
                    }
                    if (r.next(o++), r.closed) break
                }
            }))
        },
        throwError: rt,
        timer: Ie,
        using: function(t, e) {
            return new E((function(n) {
                var r, i;
                try {
                    r = t()
                } catch (t) {
                    return void n.error(t)
                }
                try {
                    i = e(r)
                } catch (t) {
                    return void n.error(t)
                }
                var o = (i ? te(i) : Q).subscribe(n);
                return function() {
                    o.unsubscribe(), r && r.unsubscribe()
                }
            }))
        },
        zip: je,
        scheduled: $t,
        EMPTY: Q,
        NEVER: me,
        config: c
    }),
    Me = n(Re);

function De(t) {
    return function(e) {
        return e.lift(new We(t))
    }
}
var We = function() {
        function t(t) {
            this.durationSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ze(t, this.durationSelector))
        }, t
    }(),
    ze = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.durationSelector = n, r.hasValue = !1, r
        }
        return o(e, t), e.prototype._next = function(t) {
            if (this.value = t, this.hasValue = !0, !this.throttled) {
                var e = void 0;
                try {
                    e = (0, this.durationSelector)(t)
                } catch (t) {
                    return this.destination.error(t)
                }
                var n = re(e, new ee(this));
                !n || n.closed ? this.clearThrottle() : this.add(this.throttled = n)
            }
        }, e.prototype.clearThrottle = function() {
            var t = this,
                e = t.value,
                n = t.hasValue,
                r = t.throttled;
            r && (this.remove(r), this.throttled = void 0, r.unsubscribe()), n && (this.value = void 0, this.hasValue = !1, this.destination.next(e))
        }, e.prototype.notifyNext = function() {
            this.clearThrottle()
        }, e.prototype.notifyComplete = function() {
            this.clearThrottle()
        }, e
    }(ne);
var Be = function() {
        function t(t) {
            this.closingNotifier = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Ue(t, this.closingNotifier))
        }, t
    }(),
    Ue = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.buffer = [], r.add(re(n, new ee(r))), r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.buffer.push(t)
        }, e.prototype.notifyNext = function() {
            var t = this.buffer;
            this.buffer = [], this.destination.next(t)
        }, e
    }(ne);
var Ye = function() {
        function t(t, e) {
            this.bufferSize = t, this.startBufferEvery = e, this.subscriberClass = e && t !== e ? qe : Ge
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new this.subscriberClass(t, this.bufferSize, this.startBufferEvery))
        }, t
    }(),
    Ge = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.bufferSize = n, r.buffer = [], r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.buffer;
            e.push(t), e.length == this.bufferSize && (this.destination.next(e), this.buffer = [])
        }, e.prototype._complete = function() {
            var e = this.buffer;
            e.length > 0 && this.destination.next(e), t.prototype._complete.call(this)
        }, e
    }(y),
    qe = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.bufferSize = n, i.startBufferEvery = r, i.buffers = [], i.count = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this,
                n = e.bufferSize,
                r = e.startBufferEvery,
                i = e.buffers,
                o = e.count;
            this.count++, o % r == 0 && i.push([]);
            for (var s = i.length; s--;) {
                var u = i[s];
                u.push(t), u.length === n && (i.splice(s, 1), this.destination.next(u))
            }
        }, e.prototype._complete = function() {
            for (var e = this.buffers, n = this.destination; e.length > 0;) {
                var r = e.shift();
                r.length > 0 && n.next(r)
            }
            t.prototype._complete.call(this)
        }, e
    }(y);
var Le = function() {
        function t(t, e, n, r) {
            this.bufferTimeSpan = t, this.bufferCreationInterval = e, this.maxBufferSize = n, this.scheduler = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Ke(t, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler))
        }, t
    }(),
    He = function() {
        return function() {
            this.buffer = []
        }
    }(),
    Ke = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            s.bufferTimeSpan = n, s.bufferCreationInterval = r, s.maxBufferSize = i, s.scheduler = o, s.contexts = [];
            var u = s.openContext();
            if (s.timespanOnly = null == r || r < 0, s.timespanOnly) {
                var c = {
                    subscriber: s,
                    context: u,
                    bufferTimeSpan: n
                };
                s.add(u.closeAction = o.schedule(Qe, n, c))
            } else {
                var a = {
                        subscriber: s,
                        context: u
                    },
                    h = {
                        bufferTimeSpan: n,
                        bufferCreationInterval: r,
                        subscriber: s,
                        scheduler: o
                    };
                s.add(u.closeAction = o.schedule(Xe, n, a)), s.add(o.schedule(Je, r, h))
            }
            return s
        }
        return o(e, t), e.prototype._next = function(t) {
            for (var e, n = this.contexts, r = n.length, i = 0; i < r; i++) {
                var o = n[i],
                    s = o.buffer;
                s.push(t), s.length == this.maxBufferSize && (e = o)
            }
            e && this.onBufferFull(e)
        }, e.prototype._error = function(e) {
            this.contexts.length = 0, t.prototype._error.call(this, e)
        }, e.prototype._complete = function() {
            for (var e = this.contexts, n = this.destination; e.length > 0;) {
                var r = e.shift();
                n.next(r.buffer)
            }
            t.prototype._complete.call(this)
        }, e.prototype._unsubscribe = function() {
            this.contexts = null
        }, e.prototype.onBufferFull = function(t) {
            this.closeContext(t);
            var e = t.closeAction;
            if (e.unsubscribe(), this.remove(e), !this.closed && this.timespanOnly) {
                t = this.openContext();
                var n = this.bufferTimeSpan,
                    r = {
                        subscriber: this,
                        context: t,
                        bufferTimeSpan: n
                    };
                this.add(t.closeAction = this.scheduler.schedule(Qe, n, r))
            }
        }, e.prototype.openContext = function() {
            var t = new He;
            return this.contexts.push(t), t
        }, e.prototype.closeContext = function(t) {
            this.destination.next(t.buffer);
            var e = this.contexts;
            (e ? e.indexOf(t) : -1) >= 0 && e.splice(e.indexOf(t), 1)
        }, e
    }(y);

function Qe(t) {
    var e = t.subscriber,
        n = t.context;
    n && e.closeContext(n), e.closed || (t.context = e.openContext(), t.context.closeAction = this.schedule(t, t.bufferTimeSpan))
}

function Je(t) {
    var e = t.bufferCreationInterval,
        n = t.bufferTimeSpan,
        r = t.subscriber,
        i = t.scheduler,
        o = r.openContext();
    r.closed || (r.add(o.closeAction = i.schedule(Xe, n, {
        subscriber: r,
        context: o
    })), this.schedule(t, e))
}

function Xe(t) {
    var e = t.subscriber,
        n = t.context;
    e.closeContext(n)
}
var Ze = function() {
        function t(t, e) {
            this.openings = t, this.closingSelector = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new $e(t, this.openings, this.closingSelector))
        }, t
    }(),
    $e = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.closingSelector = r, i.contexts = [], i.add(Qt(i, n)), i
        }
        return o(e, t), e.prototype._next = function(t) {
            for (var e = this.contexts, n = e.length, r = 0; r < n; r++) e[r].buffer.push(t)
        }, e.prototype._error = function(e) {
            for (var n = this.contexts; n.length > 0;) {
                var r = n.shift();
                r.subscription.unsubscribe(), r.buffer = null, r.subscription = null
            }
            this.contexts = null, t.prototype._error.call(this, e)
        }, e.prototype._complete = function() {
            for (var e = this.contexts; e.length > 0;) {
                var n = e.shift();
                this.destination.next(n.buffer), n.subscription.unsubscribe(), n.buffer = null, n.subscription = null
            }
            this.contexts = null, t.prototype._complete.call(this)
        }, e.prototype.notifyNext = function(t, e) {
            t ? this.closeBuffer(t) : this.openBuffer(e)
        }, e.prototype.notifyComplete = function(t) {
            this.closeBuffer(t.context)
        }, e.prototype.openBuffer = function(t) {
            try {
                var e = this.closingSelector.call(this, t);
                e && this.trySubscribe(e)
            } catch (t) {
                this._error(t)
            }
        }, e.prototype.closeBuffer = function(t) {
            var e = this.contexts;
            if (e && t) {
                var n = t.buffer,
                    r = t.subscription;
                this.destination.next(n), e.splice(e.indexOf(t), 1), this.remove(r), r.unsubscribe()
            }
        }, e.prototype.trySubscribe = function(t) {
            var e = this.contexts,
                n = new d,
                r = {
                    buffer: [],
                    subscription: n
                };
            e.push(r);
            var i = Qt(this, t, r);
            !i || i.closed ? this.closeBuffer(r) : (i.context = r, this.add(i), n.add(i))
        }, e
    }(Ut);
var tn = function() {
        function t(t) {
            this.closingSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new en(t, this.closingSelector))
        }, t
    }(),
    en = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.closingSelector = n, r.subscribing = !1, r.openBuffer(), r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.buffer.push(t)
        }, e.prototype._complete = function() {
            var e = this.buffer;
            e && this.destination.next(e), t.prototype._complete.call(this)
        }, e.prototype._unsubscribe = function() {
            this.buffer = void 0, this.subscribing = !1
        }, e.prototype.notifyNext = function() {
            this.openBuffer()
        }, e.prototype.notifyComplete = function() {
            this.subscribing ? this.complete() : this.openBuffer()
        }, e.prototype.openBuffer = function() {
            var t = this.closingSubscription;
            t && (this.remove(t), t.unsubscribe());
            var e, n = this.buffer;
            this.buffer && this.destination.next(n), this.buffer = [];
            try {
                e = (0, this.closingSelector)()
            } catch (t) {
                return this.error(t)
            }
            t = new d, this.closingSubscription = t, this.add(t), this.subscribing = !0, t.add(re(e, new ee(this))), this.subscribing = !1
        }, e
    }(ne);
var nn = function() {
        function t(t) {
            this.selector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new rn(t, this.selector, this.caught))
        }, t
    }(),
    rn = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.selector = n, i.caught = r, i
        }
        return o(e, t), e.prototype.error = function(e) {
            if (!this.isStopped) {
                var n = void 0;
                try {
                    n = this.selector(e, this.caught)
                } catch (e) {
                    return void t.prototype.error.call(this, e)
                }
                this._unsubscribeAndRecycle();
                var r = new ee(this);
                this.add(r);
                var i = re(n, r);
                i !== r && this.add(i)
            }
        }, e
    }(ne);

function on(t, e) {
    return ie(t, e, 1)
}
var sn = function() {
        function t(t, e) {
            this.predicate = t, this.source = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new un(t, this.predicate, this.source))
        }, t
    }(),
    un = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.predicate = n, i.source = r, i.count = 0, i.index = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.predicate ? this._tryPredicate(t) : this.count++
        }, e.prototype._tryPredicate = function(t) {
            var e;
            try {
                e = this.predicate(t, this.index++, this.source)
            } catch (t) {
                return void this.destination.error(t)
            }
            e && this.count++
        }, e.prototype._complete = function() {
            this.destination.next(this.count), this.destination.complete()
        }, e
    }(y);
var cn = function() {
        function t(t) {
            this.durationSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new an(t, this.durationSelector))
        }, t
    }(),
    an = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.durationSelector = n, r.hasValue = !1, r
        }
        return o(e, t), e.prototype._next = function(t) {
            try {
                var e = this.durationSelector.call(this, t);
                e && this._tryNext(t, e)
            } catch (t) {
                this.destination.error(t)
            }
        }, e.prototype._complete = function() {
            this.emitValue(), this.destination.complete()
        }, e.prototype._tryNext = function(t, e) {
            var n = this.durationSubscription;
            this.value = t, this.hasValue = !0, n && (n.unsubscribe(), this.remove(n)), (n = re(e, new ee(this))) && !n.closed && this.add(this.durationSubscription = n)
        }, e.prototype.notifyNext = function() {
            this.emitValue()
        }, e.prototype.notifyComplete = function() {
            this.emitValue()
        }, e.prototype.emitValue = function() {
            if (this.hasValue) {
                var e = this.value,
                    n = this.durationSubscription;
                n && (this.durationSubscription = void 0, n.unsubscribe(), this.remove(n)), this.value = void 0, this.hasValue = !1, t.prototype._next.call(this, e)
            }
        }, e
    }(ne);
var hn = function() {
        function t(t, e) {
            this.dueTime = t, this.scheduler = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ln(t, this.dueTime, this.scheduler))
        }, t
    }(),
    ln = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.dueTime = n, i.scheduler = r, i.debouncedSubscription = null, i.lastValue = null, i.hasValue = !1, i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(fn, this.dueTime, this))
        }, e.prototype._complete = function() {
            this.debouncedNext(), this.destination.complete()
        }, e.prototype.debouncedNext = function() {
            if (this.clearDebounce(), this.hasValue) {
                var t = this.lastValue;
                this.lastValue = null, this.hasValue = !1, this.destination.next(t)
            }
        }, e.prototype.clearDebounce = function() {
            var t = this.debouncedSubscription;
            null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
        }, e
    }(y);

function fn(t) {
    t.debouncedNext()
}

function pn(t) {
    return void 0 === t && (t = null),
        function(e) {
            return e.lift(new dn(t))
        }
}
var dn = function() {
        function t(t) {
            this.defaultValue = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new bn(t, this.defaultValue))
        }, t
    }(),
    bn = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.defaultValue = n, r.isEmpty = !0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.isEmpty = !1, this.destination.next(t)
        }, e.prototype._complete = function() {
            this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
        }, e
    }(y);

function vn(t) {
    return t instanceof Date && !isNaN(+t)
}
var yn = function() {
        function t(t, e) {
            this.delay = t, this.scheduler = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new mn(t, this.delay, this.scheduler))
        }, t
    }(),
    mn = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.delay = n, i.scheduler = r, i.queue = [], i.active = !1, i.errored = !1, i
        }
        return o(e, t), e.dispatch = function(t) {
            for (var e = t.source, n = e.queue, r = t.scheduler, i = t.destination; n.length > 0 && n[0].time - r.now() <= 0;) n.shift().notification.observe(i);
            if (n.length > 0) {
                var o = Math.max(0, n[0].time - r.now());
                this.schedule(t, o)
            } else this.unsubscribe(), e.active = !1
        }, e.prototype._schedule = function(t) {
            this.active = !0, this.destination.add(t.schedule(e.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: t
            }))
        }, e.prototype.scheduleNotification = function(t) {
            if (!0 !== this.errored) {
                var e = this.scheduler,
                    n = new wn(e.now() + this.delay, t);
                this.queue.push(n), !1 === this.active && this._schedule(e)
            }
        }, e.prototype._next = function(t) {
            this.scheduleNotification(ot.createNext(t))
        }, e.prototype._error = function(t) {
            this.errored = !0, this.queue = [], this.destination.error(t), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.scheduleNotification(ot.createComplete()), this.unsubscribe()
        }, e
    }(y),
    wn = function() {
        return function(t, e) {
            this.time = t, this.notification = e
        }
    }();
var xn = function() {
        function t(t) {
            this.delayDurationSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new _n(t, this.delayDurationSelector))
        }, t
    }(),
    _n = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.delayDurationSelector = n, r.completed = !1, r.delayNotifierSubscriptions = [], r.index = 0, r
        }
        return o(e, t), e.prototype.notifyNext = function(t, e, n, r, i) {
            this.destination.next(t), this.removeSubscription(i), this.tryComplete()
        }, e.prototype.notifyError = function(t, e) {
            this._error(t)
        }, e.prototype.notifyComplete = function(t) {
            var e = this.removeSubscription(t);
            e && this.destination.next(e), this.tryComplete()
        }, e.prototype._next = function(t) {
            var e = this.index++;
            try {
                var n = this.delayDurationSelector(t, e);
                n && this.tryDelay(n, t)
            } catch (t) {
                this.destination.error(t)
            }
        }, e.prototype._complete = function() {
            this.completed = !0, this.tryComplete(), this.unsubscribe()
        }, e.prototype.removeSubscription = function(t) {
            t.unsubscribe();
            var e = this.delayNotifierSubscriptions.indexOf(t);
            return -1 !== e && this.delayNotifierSubscriptions.splice(e, 1), t.outerValue
        }, e.prototype.tryDelay = function(t, e) {
            var n = Qt(this, t, e);
            n && !n.closed && (this.destination.add(n), this.delayNotifierSubscriptions.push(n))
        }, e.prototype.tryComplete = function() {
            this.completed && 0 === this.delayNotifierSubscriptions.length && this.destination.complete()
        }, e
    }(Ut),
    gn = function(t) {
        function e(e, n) {
            var r = t.call(this) || this;
            return r.source = e, r.subscriptionDelay = n, r
        }
        return o(e, t), e.prototype._subscribe = function(t) {
            this.subscriptionDelay.subscribe(new Sn(t, this.source))
        }, e
    }(E),
    Sn = function(t) {
        function e(e, n) {
            var r = t.call(this) || this;
            return r.parent = e, r.source = n, r.sourceSubscribed = !1, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.subscribeToSource()
        }, e.prototype._error = function(t) {
            this.unsubscribe(), this.parent.error(t)
        }, e.prototype._complete = function() {
            this.unsubscribe(), this.subscribeToSource()
        }, e.prototype.subscribeToSource = function() {
            this.sourceSubscribed || (this.sourceSubscribed = !0, this.unsubscribe(), this.source.subscribe(this.parent))
        }, e
    }(y);
var En = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Cn(t))
        }, t
    }(),
    Cn = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return o(e, t), e.prototype._next = function(t) {
            t.observe(this.destination)
        }, e
    }(y);
var Nn = function() {
        function t(t, e) {
            this.keySelector = t, this.flushes = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Tn(t, this.keySelector, this.flushes))
        }, t
    }(),
    Tn = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.keySelector = n, i.values = new Set, r && i.add(re(r, new ee(i))), i
        }
        return o(e, t), e.prototype.notifyNext = function() {
            this.values.clear()
        }, e.prototype.notifyError = function(t) {
            this._error(t)
        }, e.prototype._next = function(t) {
            this.keySelector ? this._useKeySelector(t) : this._finalizeNext(t, t)
        }, e.prototype._useKeySelector = function(t) {
            var e, n = this.destination;
            try {
                e = this.keySelector(t)
            } catch (t) {
                return void n.error(t)
            }
            this._finalizeNext(e, t)
        }, e.prototype._finalizeNext = function(t, e) {
            var n = this.values;
            n.has(t) || (n.add(t), this.destination.next(e))
        }, e
    }(ne);

function In(t, e) {
    return function(n) {
        return n.lift(new Vn(t, e))
    }
}
var Vn = function() {
        function t(t, e) {
            this.compare = t, this.keySelector = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new jn(t, this.compare, this.keySelector))
        }, t
    }(),
    jn = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.keySelector = r, i.hasKey = !1, "function" == typeof n && (i.compare = n), i
        }
        return o(e, t), e.prototype.compare = function(t, e) {
            return t === e
        }, e.prototype._next = function(t) {
            var e;
            try {
                var n = this.keySelector;
                e = n ? n(t) : t
            } catch (t) {
                return this.destination.error(t)
            }
            var r = !1;
            if (this.hasKey) try {
                r = (0, this.compare)(this.key, e)
            } catch (t) {
                return this.destination.error(t)
            } else this.hasKey = !0;
            r || (this.key = e, this.destination.next(t))
        }, e
    }(y);

function On(t) {
    return void 0 === t && (t = kn),
        function(e) {
            return e.lift(new Pn(t))
        }
}
var Pn = function() {
        function t(t) {
            this.errorFactory = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new An(t, this.errorFactory))
        }, t
    }(),
    An = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.errorFactory = n, r.hasValue = !1, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.hasValue = !0, this.destination.next(t)
        }, e.prototype._complete = function() {
            if (this.hasValue) return this.destination.complete();
            var t = void 0;
            try {
                t = this.errorFactory()
            } catch (e) {
                t = e
            }
            this.destination.error(t)
        }, e
    }(y);

function kn() {
    return new Pt
}

function Fn(t) {
    return function(e) {
        return 0 === t ? J() : e.lift(new Rn(t))
    }
}
var Rn = function() {
        function t(t) {
            if (this.total = t, this.total < 0) throw new Ot
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Mn(t, this.total))
        }, t
    }(),
    Mn = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.total = n, r.count = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.total,
                n = ++this.count;
            n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
        }, e
    }(y);
var Dn = function() {
        function t(t, e, n) {
            this.predicate = t, this.thisArg = e, this.source = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Wn(t, this.predicate, this.thisArg, this.source))
        }, t
    }(),
    Wn = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o.predicate = n, o.thisArg = r, o.source = i, o.index = 0, o.thisArg = r || o, o
        }
        return o(e, t), e.prototype.notifyComplete = function(t) {
            this.destination.next(t), this.destination.complete()
        }, e.prototype._next = function(t) {
            var e = !1;
            try {
                e = this.predicate.call(this.thisArg, t, this.index++, this.source)
            } catch (t) {
                return void this.destination.error(t)
            }
            e || this.notifyComplete(!1)
        }, e.prototype._complete = function() {
            this.notifyComplete(!0)
        }, e
    }(y);
var zn = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Bn(t))
        }, t
    }(),
    Bn = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.hasCompleted = !1, n.hasSubscription = !1, n
        }
        return o(e, t), e.prototype._next = function(t) {
            this.hasSubscription || (this.hasSubscription = !0, this.add(re(t, new ee(this))))
        }, e.prototype._complete = function() {
            this.hasCompleted = !0, this.hasSubscription || this.destination.complete()
        }, e.prototype.notifyComplete = function() {
            this.hasSubscription = !1, this.hasCompleted && this.destination.complete()
        }, e
    }(ne);
var Un = function() {
        function t(t) {
            this.project = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Yn(t, this.project))
        }, t
    }(),
    Yn = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.project = n, r.hasSubscription = !1, r.hasCompleted = !1, r.index = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.hasSubscription || this.tryNext(t)
        }, e.prototype.tryNext = function(t) {
            var e, n = this.index++;
            try {
                e = this.project(t, n)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.hasSubscription = !0, this._innerSub(e)
        }, e.prototype._innerSub = function(t) {
            var e = new ee(this),
                n = this.destination;
            n.add(e);
            var r = re(t, e);
            r !== e && n.add(r)
        }, e.prototype._complete = function() {
            this.hasCompleted = !0, this.hasSubscription || this.destination.complete(), this.unsubscribe()
        }, e.prototype.notifyNext = function(t) {
            this.destination.next(t)
        }, e.prototype.notifyError = function(t) {
            this.destination.error(t)
        }, e.prototype.notifyComplete = function() {
            this.hasSubscription = !1, this.hasCompleted && this.destination.complete()
        }, e
    }(ne);
var Gn = function() {
        function t(t, e, n) {
            this.project = t, this.concurrent = e, this.scheduler = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new qn(t, this.project, this.concurrent, this.scheduler))
        }, t
    }(),
    qn = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o.project = n, o.concurrent = r, o.scheduler = i, o.index = 0, o.active = 0, o.hasCompleted = !1, r < Number.POSITIVE_INFINITY && (o.buffer = []), o
        }
        return o(e, t), e.dispatch = function(t) {
            var e = t.subscriber,
                n = t.result,
                r = t.value,
                i = t.index;
            e.subscribeToProjection(n, r, i)
        }, e.prototype._next = function(t) {
            var n = this.destination;
            if (n.closed) this._complete();
            else {
                var r = this.index++;
                if (this.active < this.concurrent) {
                    n.next(t);
                    try {
                        var i = (0, this.project)(t, r);
                        if (this.scheduler) {
                            var o = {
                                subscriber: this,
                                result: i,
                                value: t,
                                index: r
                            };
                            this.destination.add(this.scheduler.schedule(e.dispatch, 0, o))
                        } else this.subscribeToProjection(i, t, r)
                    } catch (t) {
                        n.error(t)
                    }
                } else this.buffer.push(t)
            }
        }, e.prototype.subscribeToProjection = function(t, e, n) {
            this.active++, this.destination.add(re(t, new ee(this)))
        }, e.prototype._complete = function() {
            this.hasCompleted = !0, this.hasCompleted && 0 === this.active && this.destination.complete(), this.unsubscribe()
        }, e.prototype.notifyNext = function(t) {
            this._next(t)
        }, e.prototype.notifyComplete = function() {
            var t = this.buffer;
            this.active--, t && t.length > 0 && this._next(t.shift()), this.hasCompleted && 0 === this.active && this.destination.complete()
        }, e
    }(ne);
var Ln = function() {
        function t(t) {
            this.callback = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Hn(t, this.callback))
        }, t
    }(),
    Hn = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.add(new d(n)), r
        }
        return o(e, t), e
    }(y);
var Kn = function() {
        function t(t, e, n, r) {
            this.predicate = t, this.source = e, this.yieldIndex = n, this.thisArg = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Qn(t, this.predicate, this.source, this.yieldIndex, this.thisArg))
        }, t
    }(),
    Qn = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            return s.predicate = n, s.source = r, s.yieldIndex = i, s.thisArg = o, s.index = 0, s
        }
        return o(e, t), e.prototype.notifyComplete = function(t) {
            var e = this.destination;
            e.next(t), e.complete(), this.unsubscribe()
        }, e.prototype._next = function(t) {
            var e = this.predicate,
                n = this.thisArg,
                r = this.index++;
            try {
                e.call(n || this, t, r, this.source) && this.notifyComplete(this.yieldIndex ? r : t)
            } catch (t) {
                this.destination.error(t)
            }
        }, e.prototype._complete = function() {
            this.notifyComplete(this.yieldIndex ? -1 : void 0)
        }, e
    }(y);
var Jn = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Xn(t))
        }, t
    }(),
    Xn = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o(e, t), e.prototype._next = function(t) {}, e
    }(y);
var Zn = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new $n(t))
        }, t
    }(),
    $n = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return o(e, t), e.prototype.notifyComplete = function(t) {
            var e = this.destination;
            e.next(t), e.complete()
        }, e.prototype._next = function(t) {
            this.notifyComplete(!1)
        }, e.prototype._complete = function() {
            this.notifyComplete(!0)
        }, e
    }(y);

function tr(t) {
    return function(e) {
        return 0 === t ? J() : e.lift(new er(t))
    }
}
var er = function() {
        function t(t) {
            if (this.total = t, this.total < 0) throw new Ot
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new nr(t, this.total))
        }, t
    }(),
    nr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.total = n, r.ring = new Array, r.count = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.ring,
                n = this.total,
                r = this.count++;
            e.length < n ? e.push(t) : e[r % n] = t
        }, e.prototype._complete = function() {
            var t = this.destination,
                e = this.count;
            if (e > 0)
                for (var n = this.count >= this.total ? this.total : this.count, r = this.ring, i = 0; i < n; i++) {
                    var o = e++ % n;
                    t.next(r[o])
                }
            t.complete()
        }, e
    }(y);
var rr = function() {
        function t(t) {
            this.value = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ir(t, this.value))
        }, t
    }(),
    ir = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.value = n, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.destination.next(this.value)
        }, e
    }(y);
var or = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new sr(t))
        }, t
    }(),
    sr = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return o(e, t), e.prototype._next = function(t) {
            this.destination.next(ot.createNext(t))
        }, e.prototype._error = function(t) {
            var e = this.destination;
            e.next(ot.createError(t)), e.complete()
        }, e.prototype._complete = function() {
            var t = this.destination;
            t.next(ot.createComplete()), t.complete()
        }, e
    }(y);

function ur(t, e) {
    var n = !1;
    return arguments.length >= 2 && (n = !0),
        function(r) {
            return r.lift(new cr(t, e, n))
        }
}
var cr = function() {
        function t(t, e, n) {
            void 0 === n && (n = !1), this.accumulator = t, this.seed = e, this.hasSeed = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ar(t, this.accumulator, this.seed, this.hasSeed))
        }, t
    }(),
    ar = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o.accumulator = n, o._seed = r, o.hasSeed = i, o.index = 0, o
        }
        return o(e, t), Object.defineProperty(e.prototype, "seed", {
            get: function() {
                return this._seed
            },
            set: function(t) {
                this.hasSeed = !0, this._seed = t
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype._next = function(t) {
            if (this.hasSeed) return this._tryNext(t);
            this.seed = t, this.destination.next(t)
        }, e.prototype._tryNext = function(t) {
            var e, n = this.index++;
            try {
                e = this.accumulator(this.seed, t, n)
            } catch (t) {
                this.destination.error(t)
            }
            this.seed = e, this.destination.next(e)
        }, e
    }(y);

function hr(t, e) {
    return arguments.length >= 2 ? function(n) {
        return g(ur(t, e), tr(1), pn(e))(n)
    } : function(e) {
        return g(ur((function(e, n, r) {
            return t(e, n, r + 1)
        })), tr(1))(e)
    }
}
var lr = function() {
        function t(t, e, n) {
            this.accumulator = t, this.seed = e, this.concurrent = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new fr(t, this.accumulator, this.seed, this.concurrent))
        }, t
    }(),
    fr = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o.accumulator = n, o.acc = r, o.concurrent = i, o.hasValue = !1, o.hasCompleted = !1, o.buffer = [], o.active = 0, o.index = 0, o
        }
        return o(e, t), e.prototype._next = function(t) {
            if (this.active < this.concurrent) {
                var e = this.index++,
                    n = this.destination,
                    r = void 0;
                try {
                    r = (0, this.accumulator)(this.acc, t, e)
                } catch (t) {
                    return n.error(t)
                }
                this.active++, this._innerSub(r)
            } else this.buffer.push(t)
        }, e.prototype._innerSub = function(t) {
            var e = new ee(this),
                n = this.destination;
            n.add(e);
            var r = re(t, e);
            r !== e && n.add(r)
        }, e.prototype._complete = function() {
            this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete()), this.unsubscribe()
        }, e.prototype.notifyNext = function(t) {
            var e = this.destination;
            this.acc = t, this.hasValue = !0, e.next(t)
        }, e.prototype.notifyComplete = function() {
            var t = this.buffer;
            this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete())
        }, e
    }(ne);

function pr(t, e) {
    return function(n) {
        var r;
        if (r = "function" == typeof t ? t : function() {
                return t
            }, "function" == typeof e) return n.lift(new dr(r, e));
        var i = Object.create(n, F);
        return i.source = n, i.subjectFactory = r, i
    }
}
var dr = function() {
    function t(t, e) {
        this.subjectFactory = t, this.selector = e
    }
    return t.prototype.call = function(t, e) {
        var n = this.selector,
            r = this.subjectFactory(),
            i = n(r).subscribe(t);
        return i.add(e.subscribe(r)), i
    }, t
}();
var br = function() {
        function t(t) {
            this.nextSources = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new vr(t, this.nextSources))
        }, t
    }(),
    vr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.destination = e, r.nextSources = n, r
        }
        return o(e, t), e.prototype.notifyError = function() {
            this.subscribeToNextSource()
        }, e.prototype.notifyComplete = function() {
            this.subscribeToNextSource()
        }, e.prototype._error = function(t) {
            this.subscribeToNextSource(), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.subscribeToNextSource(), this.unsubscribe()
        }, e.prototype.subscribeToNextSource = function() {
            var t = this.nextSources.shift();
            if (t) {
                var e = new ee(this),
                    n = this.destination;
                n.add(e);
                var r = re(t, e);
                r !== e && n.add(r)
            } else this.destination.complete()
        }, e
    }(ne);
var yr = function() {
        function t() {}
        return t.prototype.call = function(t, e) {
            return e.subscribe(new mr(t))
        }, t
    }(),
    mr = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.hasPrev = !1, n
        }
        return o(e, t), e.prototype._next = function(t) {
            var e;
            this.hasPrev ? e = [this.prev, t] : this.hasPrev = !0, this.prev = t, e && this.destination.next(e)
        }, e
    }(y);

function wr(t, e) {
    return function(n) {
        for (var r = n, i = 0; i < e; i++) {
            var o = null != r ? r[t[i]] : void 0;
            if (void 0 === o) return;
            r = o
        }
        return r
    }
}
var xr = function() {
        function t(t, e) {
            this.count = t, this.source = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new _r(t, this.count, this.source))
        }, t
    }(),
    _r = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.count = n, i.source = r, i
        }
        return o(e, t), e.prototype.complete = function() {
            if (!this.isStopped) {
                var e = this.source,
                    n = this.count;
                if (0 === n) return t.prototype.complete.call(this);
                n > -1 && (this.count = n - 1), e.subscribe(this._unsubscribeAndRecycle())
            }
        }, e
    }(y);
var gr = function() {
        function t(t) {
            this.notifier = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Sr(t, this.notifier, e))
        }, t
    }(),
    Sr = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.notifier = n, i.source = r, i.sourceIsBeingSubscribedTo = !0, i
        }
        return o(e, t), e.prototype.notifyNext = function() {
            this.sourceIsBeingSubscribedTo = !0, this.source.subscribe(this)
        }, e.prototype.notifyComplete = function() {
            if (!1 === this.sourceIsBeingSubscribedTo) return t.prototype.complete.call(this)
        }, e.prototype.complete = function() {
            if (this.sourceIsBeingSubscribedTo = !1, !this.isStopped) {
                if (this.retries || this.subscribeToRetries(), !this.retriesSubscription || this.retriesSubscription.closed) return t.prototype.complete.call(this);
                this._unsubscribeAndRecycle(), this.notifications.next(void 0)
            }
        }, e.prototype._unsubscribe = function() {
            var t = this.notifications,
                e = this.retriesSubscription;
            t && (t.unsubscribe(), this.notifications = void 0), e && (e.unsubscribe(), this.retriesSubscription = void 0), this.retries = void 0
        }, e.prototype._unsubscribeAndRecycle = function() {
            var e = this._unsubscribe;
            return this._unsubscribe = null, t.prototype._unsubscribeAndRecycle.call(this), this._unsubscribe = e, this
        }, e.prototype.subscribeToRetries = function() {
            var e;
            this.notifications = new V;
            try {
                e = (0, this.notifier)(this.notifications)
            } catch (e) {
                return t.prototype.complete.call(this)
            }
            this.retries = e, this.retriesSubscription = re(e, new ee(this))
        }, e
    }(ne);
var Er = function() {
        function t(t, e) {
            this.count = t, this.source = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Cr(t, this.count, this.source))
        }, t
    }(),
    Cr = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.count = n, i.source = r, i
        }
        return o(e, t), e.prototype.error = function(e) {
            if (!this.isStopped) {
                var n = this.source,
                    r = this.count;
                if (0 === r) return t.prototype.error.call(this, e);
                r > -1 && (this.count = r - 1), n.subscribe(this._unsubscribeAndRecycle())
            }
        }, e
    }(y);
var Nr = function() {
        function t(t, e) {
            this.notifier = t, this.source = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Tr(t, this.notifier, this.source))
        }, t
    }(),
    Tr = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.notifier = n, i.source = r, i
        }
        return o(e, t), e.prototype.error = function(e) {
            if (!this.isStopped) {
                var n = this.errors,
                    r = this.retries,
                    i = this.retriesSubscription;
                if (r) this.errors = void 0, this.retriesSubscription = void 0;
                else {
                    n = new V;
                    try {
                        r = (0, this.notifier)(n)
                    } catch (e) {
                        return t.prototype.error.call(this, e)
                    }
                    i = re(r, new ee(this))
                }
                this._unsubscribeAndRecycle(), this.errors = n, this.retries = r, this.retriesSubscription = i, n.next(e)
            }
        }, e.prototype._unsubscribe = function() {
            var t = this.errors,
                e = this.retriesSubscription;
            t && (t.unsubscribe(), this.errors = void 0), e && (e.unsubscribe(), this.retriesSubscription = void 0), this.retries = void 0
        }, e.prototype.notifyNext = function() {
            var t = this._unsubscribe;
            this._unsubscribe = null, this._unsubscribeAndRecycle(), this._unsubscribe = t, this.source.subscribe(this)
        }, e
    }(ne);
var Ir = function() {
        function t(t) {
            this.notifier = t
        }
        return t.prototype.call = function(t, e) {
            var n = new Vr(t),
                r = e.subscribe(n);
            return r.add(re(this.notifier, new ee(n))), r
        }, t
    }(),
    Vr = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.hasValue = !1, e
        }
        return o(e, t), e.prototype._next = function(t) {
            this.value = t, this.hasValue = !0
        }, e.prototype.notifyNext = function() {
            this.emitValue()
        }, e.prototype.notifyComplete = function() {
            this.emitValue()
        }, e.prototype.emitValue = function() {
            this.hasValue && (this.hasValue = !1, this.destination.next(this.value))
        }, e
    }(ne);
var jr = function() {
        function t(t, e) {
            this.period = t, this.scheduler = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Or(t, this.period, this.scheduler))
        }, t
    }(),
    Or = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.period = n, i.scheduler = r, i.hasValue = !1, i.add(r.schedule(Pr, n, {
                subscriber: i,
                period: n
            })), i
        }
        return o(e, t), e.prototype._next = function(t) {
            this.lastValue = t, this.hasValue = !0
        }, e.prototype.notifyNext = function() {
            this.hasValue && (this.hasValue = !1, this.destination.next(this.lastValue))
        }, e
    }(y);

function Pr(t) {
    var e = t.subscriber,
        n = t.period;
    e.notifyNext(), this.schedule(t, n)
}
var Ar = function() {
        function t(t, e) {
            this.compareTo = t, this.comparator = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new kr(t, this.compareTo, this.comparator))
        }, t
    }(),
    kr = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.compareTo = n, i.comparator = r, i._a = [], i._b = [], i._oneComplete = !1, i.destination.add(n.subscribe(new Fr(e, i))), i
        }
        return o(e, t), e.prototype._next = function(t) {
            this._oneComplete && 0 === this._b.length ? this.emit(!1) : (this._a.push(t), this.checkValues())
        }, e.prototype._complete = function() {
            this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0, this.unsubscribe()
        }, e.prototype.checkValues = function() {
            for (var t = this, e = t._a, n = t._b, r = t.comparator; e.length > 0 && n.length > 0;) {
                var i = e.shift(),
                    o = n.shift(),
                    s = !1;
                try {
                    s = r ? r(i, o) : i === o
                } catch (t) {
                    this.destination.error(t)
                }
                s || this.emit(!1)
            }
        }, e.prototype.emit = function(t) {
            var e = this.destination;
            e.next(t), e.complete()
        }, e.prototype.nextB = function(t) {
            this._oneComplete && 0 === this._a.length ? this.emit(!1) : (this._b.push(t), this.checkValues())
        }, e.prototype.completeB = function() {
            this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0
        }, e
    }(y),
    Fr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.parent = n, r
        }
        return o(e, t), e.prototype._next = function(t) {
            this.parent.nextB(t)
        }, e.prototype._error = function(t) {
            this.parent.error(t), this.unsubscribe()
        }, e.prototype._complete = function() {
            this.parent.completeB(), this.unsubscribe()
        }, e
    }(y);

function Rr() {
    return new V
}
var Mr = function() {
        function t(t, e) {
            this.predicate = t, this.source = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Dr(t, this.predicate, this.source))
        }, t
    }(),
    Dr = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.predicate = n, i.source = r, i.seenValue = !1, i.index = 0, i
        }
        return o(e, t), e.prototype.applySingleValue = function(t) {
            this.seenValue ? this.destination.error("Sequence contains more than one element") : (this.seenValue = !0, this.singleValue = t)
        }, e.prototype._next = function(t) {
            var e = this.index++;
            this.predicate ? this.tryNext(t, e) : this.applySingleValue(t)
        }, e.prototype.tryNext = function(t, e) {
            try {
                this.predicate(t, e, this.source) && this.applySingleValue(t)
            } catch (t) {
                this.destination.error(t)
            }
        }, e.prototype._complete = function() {
            var t = this.destination;
            this.index > 0 ? (t.next(this.seenValue ? this.singleValue : void 0), t.complete()) : t.error(new Pt)
        }, e
    }(y);
var Wr = function() {
        function t(t) {
            this.total = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new zr(t, this.total))
        }, t
    }(),
    zr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.total = n, r.count = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            ++this.count > this.total && this.destination.next(t)
        }, e
    }(y);
var Br = function() {
        function t(t) {
            if (this._skipCount = t, this._skipCount < 0) throw new Ot
        }
        return t.prototype.call = function(t, e) {
            return 0 === this._skipCount ? e.subscribe(new y(t)) : e.subscribe(new Ur(t, this._skipCount))
        }, t
    }(),
    Ur = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r._skipCount = n, r._count = 0, r._ring = new Array(n), r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this._skipCount,
                n = this._count++;
            if (n < e) this._ring[n] = t;
            else {
                var r = n % e,
                    i = this._ring,
                    o = i[r];
                i[r] = t, this.destination.next(o)
            }
        }, e
    }(y);
var Yr = function() {
        function t(t) {
            this.notifier = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Gr(t, this.notifier))
        }, t
    }(),
    Gr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            r.hasValue = !1;
            var i = new ee(r);
            r.add(i), r.innerSubscription = i;
            var o = re(n, i);
            return o !== i && (r.add(o), r.innerSubscription = o), r
        }
        return o(e, t), e.prototype._next = function(e) {
            this.hasValue && t.prototype._next.call(this, e)
        }, e.prototype.notifyNext = function() {
            this.hasValue = !0, this.innerSubscription && this.innerSubscription.unsubscribe()
        }, e.prototype.notifyComplete = function() {}, e
    }(ne);
var qr = function() {
        function t(t) {
            this.predicate = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Lr(t, this.predicate))
        }, t
    }(),
    Lr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.predicate = n, r.skipping = !0, r.index = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.destination;
            this.skipping && this.tryCallPredicate(t), this.skipping || e.next(t)
        }, e.prototype.tryCallPredicate = function(t) {
            try {
                var e = this.predicate(t, this.index++);
                this.skipping = Boolean(e)
            } catch (t) {
                this.destination.error(t)
            }
        }, e
    }(y);
var Hr = function(t) {
    function e(e, n, r) {
        void 0 === n && (n = 0), void 0 === r && (r = _t);
        var i = t.call(this) || this;
        return i.source = e, i.delayTime = n, i.scheduler = r, (!be(n) || n < 0) && (i.delayTime = 0), r && "function" == typeof r.schedule || (i.scheduler = _t), i
    }
    return o(e, t), e.create = function(t, n, r) {
        return void 0 === n && (n = 0), void 0 === r && (r = _t), new e(t, n, r)
    }, e.dispatch = function(t) {
        var e = t.source,
            n = t.subscriber;
        return this.add(e.subscribe(n))
    }, e.prototype._subscribe = function(t) {
        var n = this.delayTime,
            r = this.source;
        return this.scheduler.schedule(e.dispatch, n, {
            source: r,
            subscriber: t
        })
    }, e
}(E);
var Kr = function() {
    function t(t, e) {
        this.scheduler = t, this.delay = e
    }
    return t.prototype.call = function(t, e) {
        return new Hr(e, this.delay, this.scheduler).subscribe(t)
    }, t
}();

function Qr(t, e) {
    return "function" == typeof e ? function(n) {
        return n.pipe(Qr((function(n, r) {
            return te(t(n, r)).pipe(kt((function(t, i) {
                return e(n, t, r, i)
            })))
        })))
    } : function(e) {
        return e.lift(new Jr(t))
    }
}
var Jr = function() {
        function t(t) {
            this.project = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Xr(t, this.project))
        }, t
    }(),
    Xr = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.project = n, r.index = 0, r
        }
        return o(e, t), e.prototype._next = function(t) {
            var e, n = this.index++;
            try {
                e = this.project(t, n)
            } catch (t) {
                return void this.destination.error(t)
            }
            this._innerSub(e)
        }, e.prototype._innerSub = function(t) {
            var e = this.innerSubscription;
            e && e.unsubscribe();
            var n = new ee(this),
                r = this.destination;
            r.add(n), this.innerSubscription = re(t, n), this.innerSubscription !== n && r.add(this.innerSubscription)
        }, e.prototype._complete = function() {
            var e = this.innerSubscription;
            e && !e.closed || t.prototype._complete.call(this), this.unsubscribe()
        }, e.prototype._unsubscribe = function() {
            this.innerSubscription = void 0
        }, e.prototype.notifyComplete = function() {
            this.innerSubscription = void 0, this.isStopped && t.prototype._complete.call(this)
        }, e.prototype.notifyNext = function(t) {
            this.destination.next(t)
        }, e
    }(ne);
var Zr = function() {
        function t(t) {
            this.notifier = t
        }
        return t.prototype.call = function(t, e) {
            var n = new $r(t),
                r = re(this.notifier, new ee(n));
            return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n
        }, t
    }(),
    $r = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.seenValue = !1, n
        }
        return o(e, t), e.prototype.notifyNext = function() {
            this.seenValue = !0, this.complete()
        }, e.prototype.notifyComplete = function() {}, e
    }(ne);
var ti = function() {
        function t(t, e) {
            this.predicate = t, this.inclusive = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ei(t, this.predicate, this.inclusive))
        }, t
    }(),
    ei = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.predicate = n, i.inclusive = r, i.index = 0, i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e, n = this.destination;
            try {
                e = this.predicate(t, this.index++)
            } catch (t) {
                return void n.error(t)
            }
            this.nextOrComplete(t, e)
        }, e.prototype.nextOrComplete = function(t, e) {
            var n = this.destination;
            Boolean(e) ? n.next(t) : (this.inclusive && n.next(t), n.complete())
        }, e
    }(y);
var ni = function() {
        function t(t, e, n) {
            this.nextOrObserver = t, this.error = e, this.complete = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ri(t, this.nextOrObserver, this.error, this.complete))
        }, t
    }(),
    ri = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o._tapNext = jt, o._tapError = jt, o._tapComplete = jt, o._tapError = r || jt, o._tapComplete = i || jt, s(n) ? (o._context = o, o._tapNext = n) : n && (o._context = n, o._tapNext = n.next || jt, o._tapError = n.error || jt, o._tapComplete = n.complete || jt), o
        }
        return o(e, t), e.prototype._next = function(t) {
            try {
                this._tapNext.call(this._context, t)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.next(t)
        }, e.prototype._error = function(t) {
            try {
                this._tapError.call(this._context, t)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.error(t)
        }, e.prototype._complete = function() {
            try {
                this._tapComplete.call(this._context)
            } catch (t) {
                return void this.destination.error(t)
            }
            return this.destination.complete()
        }, e
    }(y),
    ii = {
        leading: !0,
        trailing: !1
    };
var oi = function() {
        function t(t, e, n) {
            this.durationSelector = t, this.leading = e, this.trailing = n
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new si(t, this.durationSelector, this.leading, this.trailing))
        }, t
    }(),
    si = function(t) {
        function e(e, n, r, i) {
            var o = t.call(this, e) || this;
            return o.destination = e, o.durationSelector = n, o._leading = r, o._trailing = i, o._hasValue = !1, o
        }
        return o(e, t), e.prototype._next = function(t) {
            this._hasValue = !0, this._sendValue = t, this._throttled || (this._leading ? this.send() : this.throttle(t))
        }, e.prototype.send = function() {
            var t = this._hasValue,
                e = this._sendValue;
            t && (this.destination.next(e), this.throttle(e)), this._hasValue = !1, this._sendValue = void 0
        }, e.prototype.throttle = function(t) {
            var e = this.tryDurationSelector(t);
            e && this.add(this._throttled = re(e, new ee(this)))
        }, e.prototype.tryDurationSelector = function(t) {
            try {
                return this.durationSelector(t)
            } catch (t) {
                return this.destination.error(t), null
            }
        }, e.prototype.throttlingDone = function() {
            var t = this._throttled,
                e = this._trailing;
            t && t.unsubscribe(), this._throttled = void 0, e && this.send()
        }, e.prototype.notifyNext = function() {
            this.throttlingDone()
        }, e.prototype.notifyComplete = function() {
            this.throttlingDone()
        }, e
    }(ne);
var ui = function() {
        function t(t, e, n, r) {
            this.duration = t, this.scheduler = e, this.leading = n, this.trailing = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new ci(t, this.duration, this.scheduler, this.leading, this.trailing))
        }, t
    }(),
    ci = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            return s.duration = n, s.scheduler = r, s.leading = i, s.trailing = o, s._hasTrailingValue = !1, s._trailingValue = null, s
        }
        return o(e, t), e.prototype._next = function(t) {
            this.throttled ? this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0) : (this.add(this.throttled = this.scheduler.schedule(ai, this.duration, {
                subscriber: this
            })), this.leading ? this.destination.next(t) : this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0))
        }, e.prototype._complete = function() {
            this._hasTrailingValue ? (this.destination.next(this._trailingValue), this.destination.complete()) : this.destination.complete()
        }, e.prototype.clearThrottle = function() {
            var t = this.throttled;
            t && (this.trailing && this._hasTrailingValue && (this.destination.next(this._trailingValue), this._trailingValue = null, this._hasTrailingValue = !1), t.unsubscribe(), this.remove(t), this.throttled = null)
        }, e
    }(y);

function ai(t) {
    t.subscriber.clearThrottle()
}
var hi = function() {
    return function(t, e) {
        this.value = t, this.interval = e
    }
}();

function li(t, e, n) {
    return void 0 === n && (n = St),
        function(r) {
            var i = vn(t),
                o = i ? +t - n.now() : Math.abs(t);
            return r.lift(new fi(o, i, e, n))
        }
}
var fi = function() {
        function t(t, e, n, r) {
            this.waitFor = t, this.absoluteTimeout = e, this.withObservable = n, this.scheduler = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new pi(t, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler))
        }, t
    }(),
    pi = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            return s.absoluteTimeout = n, s.waitFor = r, s.withObservable = i, s.scheduler = o, s.scheduleTimeout(), s
        }
        return o(e, t), e.dispatchTimeout = function(t) {
            var e = t.withObservable;
            t._unsubscribeAndRecycle(), t.add(re(e, new ee(t)))
        }, e.prototype.scheduleTimeout = function() {
            var t = this.action;
            t ? this.action = t.schedule(this, this.waitFor) : this.add(this.action = this.scheduler.schedule(e.dispatchTimeout, this.waitFor, this))
        }, e.prototype._next = function(e) {
            this.absoluteTimeout || this.scheduleTimeout(), t.prototype._next.call(this, e)
        }, e.prototype._unsubscribe = function() {
            this.action = void 0, this.scheduler = null, this.withObservable = null
        }, e
    }(ne);
var di = function() {
    return function(t, e) {
        this.value = t, this.timestamp = e
    }
}();

function bi(t, e, n) {
    return 0 === n ? [e] : (t.push(e), t)
}
var vi = function() {
        function t(t) {
            this.windowBoundaries = t
        }
        return t.prototype.call = function(t, e) {
            var n = new yi(t),
                r = e.subscribe(n);
            return r.closed || n.add(re(this.windowBoundaries, new ee(n))), r
        }, t
    }(),
    yi = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.window = new V, e.next(n.window), n
        }
        return o(e, t), e.prototype.notifyNext = function() {
            this.openWindow()
        }, e.prototype.notifyError = function(t) {
            this._error(t)
        }, e.prototype.notifyComplete = function() {
            this._complete()
        }, e.prototype._next = function(t) {
            this.window.next(t)
        }, e.prototype._error = function(t) {
            this.window.error(t), this.destination.error(t)
        }, e.prototype._complete = function() {
            this.window.complete(), this.destination.complete()
        }, e.prototype._unsubscribe = function() {
            this.window = null
        }, e.prototype.openWindow = function() {
            var t = this.window;
            t && t.complete();
            var e = this.destination,
                n = this.window = new V;
            e.next(n)
        }, e
    }(ne);
var mi = function() {
        function t(t, e) {
            this.windowSize = t, this.startWindowEvery = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new wi(t, this.windowSize, this.startWindowEvery))
        }, t
    }(),
    wi = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.destination = e, i.windowSize = n, i.startWindowEvery = r, i.windows = [new V], i.count = 0, e.next(i.windows[0]), i
        }
        return o(e, t), e.prototype._next = function(t) {
            for (var e = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize, n = this.destination, r = this.windowSize, i = this.windows, o = i.length, s = 0; s < o && !this.closed; s++) i[s].next(t);
            var u = this.count - r + 1;
            if (u >= 0 && u % e == 0 && !this.closed && i.shift().complete(), ++this.count % e == 0 && !this.closed) {
                var c = new V;
                i.push(c), n.next(c)
            }
        }, e.prototype._error = function(t) {
            var e = this.windows;
            if (e)
                for (; e.length > 0 && !this.closed;) e.shift().error(t);
            this.destination.error(t)
        }, e.prototype._complete = function() {
            var t = this.windows;
            if (t)
                for (; t.length > 0 && !this.closed;) t.shift().complete();
            this.destination.complete()
        }, e.prototype._unsubscribe = function() {
            this.count = 0, this.windows = null
        }, e
    }(y);
var xi = function() {
        function t(t, e, n, r) {
            this.windowTimeSpan = t, this.windowCreationInterval = e, this.maxWindowSize = n, this.scheduler = r
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new gi(t, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler))
        }, t
    }(),
    _i = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e._numberOfNextedValues = 0, e
        }
        return o(e, t), e.prototype.next = function(e) {
            this._numberOfNextedValues++, t.prototype.next.call(this, e)
        }, Object.defineProperty(e.prototype, "numberOfNextedValues", {
            get: function() {
                return this._numberOfNextedValues
            },
            enumerable: !0,
            configurable: !0
        }), e
    }(V),
    gi = function(t) {
        function e(e, n, r, i, o) {
            var s = t.call(this, e) || this;
            s.destination = e, s.windowTimeSpan = n, s.windowCreationInterval = r, s.maxWindowSize = i, s.scheduler = o, s.windows = [];
            var u = s.openWindow();
            if (null !== r && r >= 0) {
                var c = {
                        subscriber: s,
                        window: u,
                        context: null
                    },
                    a = {
                        windowTimeSpan: n,
                        windowCreationInterval: r,
                        subscriber: s,
                        scheduler: o
                    };
                s.add(o.schedule(Ci, n, c)), s.add(o.schedule(Ei, r, a))
            } else {
                var h = {
                    subscriber: s,
                    window: u,
                    windowTimeSpan: n
                };
                s.add(o.schedule(Si, n, h))
            }
            return s
        }
        return o(e, t), e.prototype._next = function(t) {
            for (var e = this.windows, n = e.length, r = 0; r < n; r++) {
                var i = e[r];
                i.closed || (i.next(t), i.numberOfNextedValues >= this.maxWindowSize && this.closeWindow(i))
            }
        }, e.prototype._error = function(t) {
            for (var e = this.windows; e.length > 0;) e.shift().error(t);
            this.destination.error(t)
        }, e.prototype._complete = function() {
            for (var t = this.windows; t.length > 0;) {
                var e = t.shift();
                e.closed || e.complete()
            }
            this.destination.complete()
        }, e.prototype.openWindow = function() {
            var t = new _i;
            return this.windows.push(t), this.destination.next(t), t
        }, e.prototype.closeWindow = function(t) {
            t.complete();
            var e = this.windows;
            e.splice(e.indexOf(t), 1)
        }, e
    }(y);

function Si(t) {
    var e = t.subscriber,
        n = t.windowTimeSpan,
        r = t.window;
    r && e.closeWindow(r), t.window = e.openWindow(), this.schedule(t, n)
}

function Ei(t) {
    var e = t.windowTimeSpan,
        n = t.subscriber,
        r = t.scheduler,
        i = t.windowCreationInterval,
        o = n.openWindow(),
        s = this,
        u = {
            action: s,
            subscription: null
        },
        c = {
            subscriber: n,
            window: o,
            context: u
        };
    u.subscription = r.schedule(Ci, e, c), s.add(u.subscription), s.schedule(t, i)
}

function Ci(t) {
    var e = t.subscriber,
        n = t.window,
        r = t.context;
    r && r.action && r.subscription && r.action.remove(r.subscription), e.closeWindow(n)
}
var Ni = function() {
        function t(t, e) {
            this.openings = t, this.closingSelector = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Ti(t, this.openings, this.closingSelector))
        }, t
    }(),
    Ti = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            return i.openings = n, i.closingSelector = r, i.contexts = [], i.add(i.openSubscription = Qt(i, n, n)), i
        }
        return o(e, t), e.prototype._next = function(t) {
            var e = this.contexts;
            if (e)
                for (var n = e.length, r = 0; r < n; r++) e[r].window.next(t)
        }, e.prototype._error = function(e) {
            var n = this.contexts;
            if (this.contexts = null, n)
                for (var r = n.length, i = -1; ++i < r;) {
                    var o = n[i];
                    o.window.error(e), o.subscription.unsubscribe()
                }
            t.prototype._error.call(this, e)
        }, e.prototype._complete = function() {
            var e = this.contexts;
            if (this.contexts = null, e)
                for (var n = e.length, r = -1; ++r < n;) {
                    var i = e[r];
                    i.window.complete(), i.subscription.unsubscribe()
                }
            t.prototype._complete.call(this)
        }, e.prototype._unsubscribe = function() {
            var t = this.contexts;
            if (this.contexts = null, t)
                for (var e = t.length, n = -1; ++n < e;) {
                    var r = t[n];
                    r.window.unsubscribe(), r.subscription.unsubscribe()
                }
        }, e.prototype.notifyNext = function(t, e, n, r, i) {
            if (t === this.openings) {
                var o = void 0;
                try {
                    o = (0, this.closingSelector)(e)
                } catch (t) {
                    return this.error(t)
                }
                var s = new V,
                    u = new d,
                    c = {
                        window: s,
                        subscription: u
                    };
                this.contexts.push(c);
                var a = Qt(this, o, c);
                a.closed ? this.closeWindow(this.contexts.length - 1) : (a.context = c, u.add(a)), this.destination.next(s)
            } else this.closeWindow(this.contexts.indexOf(t))
        }, e.prototype.notifyError = function(t) {
            this.error(t)
        }, e.prototype.notifyComplete = function(t) {
            t !== this.openSubscription && this.closeWindow(this.contexts.indexOf(t.context))
        }, e.prototype.closeWindow = function(t) {
            if (-1 !== t) {
                var e = this.contexts,
                    n = e[t],
                    r = n.window,
                    i = n.subscription;
                e.splice(t, 1), r.complete(), i.unsubscribe()
            }
        }, e
    }(Ut);
var Ii = function() {
        function t(t) {
            this.closingSelector = t
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Vi(t, this.closingSelector))
        }, t
    }(),
    Vi = function(t) {
        function e(e, n) {
            var r = t.call(this, e) || this;
            return r.destination = e, r.closingSelector = n, r.openWindow(), r
        }
        return o(e, t), e.prototype.notifyNext = function(t, e, n, r, i) {
            this.openWindow(i)
        }, e.prototype.notifyError = function(t) {
            this._error(t)
        }, e.prototype.notifyComplete = function(t) {
            this.openWindow(t)
        }, e.prototype._next = function(t) {
            this.window.next(t)
        }, e.prototype._error = function(t) {
            this.window.error(t), this.destination.error(t), this.unsubscribeClosingNotification()
        }, e.prototype._complete = function() {
            this.window.complete(), this.destination.complete(), this.unsubscribeClosingNotification()
        }, e.prototype.unsubscribeClosingNotification = function() {
            this.closingNotification && this.closingNotification.unsubscribe()
        }, e.prototype.openWindow = function(t) {
            void 0 === t && (t = null), t && (this.remove(t), t.unsubscribe());
            var e = this.window;
            e && e.complete();
            var n, r = this.window = new V;
            this.destination.next(r);
            try {
                n = (0, this.closingSelector)()
            } catch (t) {
                return this.destination.error(t), void this.window.error(t)
            }
            this.add(this.closingNotification = Qt(this, n))
        }, e
    }(Ut);
var ji = function() {
        function t(t, e) {
            this.observables = t, this.project = e
        }
        return t.prototype.call = function(t, e) {
            return e.subscribe(new Oi(t, this.observables, this.project))
        }, t
    }(),
    Oi = function(t) {
        function e(e, n, r) {
            var i = t.call(this, e) || this;
            i.observables = n, i.project = r, i.toRespond = [];
            var o = n.length;
            i.values = new Array(o);
            for (var s = 0; s < o; s++) i.toRespond.push(s);
            for (s = 0; s < o; s++) {
                var u = n[s];
                i.add(Qt(i, u, void 0, s))
            }
            return i
        }
        return o(e, t), e.prototype.notifyNext = function(t, e, n) {
            this.values[n] = e;
            var r = this.toRespond;
            if (r.length > 0) {
                var i = r.indexOf(n); - 1 !== i && r.splice(i, 1)
            }
        }, e.prototype.notifyComplete = function() {}, e.prototype._next = function(t) {
            if (0 === this.toRespond.length) {
                var e = [t].concat(this.values);
                this.project ? this._tryProject(e) : this.destination.next(e)
            }
        }, e.prototype._tryProject = function(t) {
            var e;
            try {
                e = this.project.apply(this, t)
            } catch (t) {
                return void this.destination.error(t)
            }
            this.destination.next(e)
        }, e
    }(Ut);
var Pi = Object.freeze({
        __proto__: null,
        audit: De,
        auditTime: function(t, e) {
            return void 0 === e && (e = St), De((function() {
                return Ie(t, e)
            }))
        },
        buffer: function(t) {
            return function(e) {
                return e.lift(new Be(t))
            }
        },
        bufferCount: function(t, e) {
            return void 0 === e && (e = null),
                function(n) {
                    return n.lift(new Ye(t, e))
                }
        },
        bufferTime: function(t) {
            var e = arguments.length,
                n = St;
            X(arguments[arguments.length - 1]) && (n = arguments[arguments.length - 1], e--);
            var r = null;
            e >= 2 && (r = arguments[1]);
            var i = Number.POSITIVE_INFINITY;
            return e >= 3 && (i = arguments[2]),
                function(e) {
                    return e.lift(new Le(t, r, i, n))
                }
        },
        bufferToggle: function(t, e) {
            return function(n) {
                return n.lift(new Ze(t, e))
            }
        },
        bufferWhen: function(t) {
            return function(e) {
                return e.lift(new tn(t))
            }
        },
        catchError: function(t) {
            return function(e) {
                var n = new nn(t),
                    r = e.lift(n);
                return n.caught = r
            }
        },
        combineAll: function(t) {
            return function(e) {
                return e.lift(new Xt(t))
            }
        },
        combineLatest: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            var n = null;
            return "function" == typeof t[t.length - 1] && (n = t.pop()), 1 === t.length && l(t[0]) && (t = t[0].slice()),
                function(e) {
                    return e.lift.call(te([e].concat(t)), new Xt(n))
                }
        },
        concat: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                return e.lift.call(he.apply(void 0, [e].concat(t)))
            }
        },
        concatAll: ae,
        concatMap: on,
        concatMapTo: function(t, e) {
            return on((function() {
                return t
            }), e)
        },
        count: function(t) {
            return function(e) {
                return e.lift(new sn(t, e))
            }
        },
        debounce: function(t) {
            return function(e) {
                return e.lift(new cn(t))
            }
        },
        debounceTime: function(t, e) {
            return void 0 === e && (e = St),
                function(n) {
                    return n.lift(new hn(t, e))
                }
        },
        defaultIfEmpty: pn,
        delay: function(t, e) {
            void 0 === e && (e = St);
            var n = vn(t) ? +t - e.now() : Math.abs(t);
            return function(t) {
                return t.lift(new yn(n, e))
            }
        },
        delayWhen: function(t, e) {
            return e ? function(n) {
                return new gn(n, e).lift(new xn(t))
            } : function(e) {
                return e.lift(new xn(t))
            }
        },
        dematerialize: function() {
            return function(t) {
                return t.lift(new En)
            }
        },
        distinct: function(t, e) {
            return function(n) {
                return n.lift(new Nn(t, e))
            }
        },
        distinctUntilChanged: In,
        distinctUntilKeyChanged: function(t, e) {
            return In((function(n, r) {
                return e ? e(n[t], r[t]) : n[t] === r[t]
            }))
        },
        elementAt: function(t, e) {
            if (t < 0) throw new Ot;
            var n = arguments.length >= 2;
            return function(r) {
                return r.pipe(_e((function(e, n) {
                    return n === t
                })), Fn(1), n ? pn(e) : On((function() {
                    return new Ot
                })))
            }
        },
        endWith: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                return he(e, nt.apply(void 0, t))
            }
        },
        every: function(t, e) {
            return function(n) {
                return n.lift(new Dn(t, e, n))
            }
        },
        exhaust: function() {
            return function(t) {
                return t.lift(new zn)
            }
        },
        exhaustMap: function t(e, n) {
            return n ? function(r) {
                return r.pipe(t((function(t, r) {
                    return te(e(t, r)).pipe(kt((function(e, i) {
                        return n(t, e, r, i)
                    })))
                })))
            } : function(t) {
                return t.lift(new Un(e))
            }
        },
        expand: function(t, e, n) {
            return void 0 === e && (e = Number.POSITIVE_INFINITY), e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e,
                function(r) {
                    return r.lift(new Gn(t, e, n))
                }
        },
        filter: _e,
        finalize: function(t) {
            return function(e) {
                return e.lift(new Ln(t))
            }
        },
        find: function(t, e) {
            if ("function" != typeof t) throw new TypeError("predicate is not a function");
            return function(n) {
                return n.lift(new Kn(t, n, !1, e))
            }
        },
        findIndex: function(t, e) {
            return function(n) {
                return n.lift(new Kn(t, n, !0, e))
            }
        },
        first: function(t, e) {
            var n = arguments.length >= 2;
            return function(r) {
                return r.pipe(t ? _e((function(e, n) {
                    return t(e, n, r)
                })) : _, Fn(1), n ? pn(e) : On((function() {
                    return new Pt
                })))
            }
        },
        groupBy: function(t, e, n, r) {
            return function(i) {
                return i.lift(new M(t, e, n, r))
            }
        },
        ignoreElements: function() {
            return function(t) {
                return t.lift(new Jn)
            }
        },
        isEmpty: function() {
            return function(t) {
                return t.lift(new Zn)
            }
        },
        last: function(t, e) {
            var n = arguments.length >= 2;
            return function(r) {
                return r.pipe(t ? _e((function(e, n) {
                    return t(e, n, r)
                })) : _, tr(1), n ? pn(e) : On((function() {
                    return new Pt
                })))
            }
        },
        map: kt,
        mapTo: function(t) {
            return function(e) {
                return e.lift(new rr(t))
            }
        },
        materialize: function() {
            return function(t) {
                return t.lift(new or)
            }
        },
        max: function(t) {
            return hr("function" == typeof t ? function(e, n) {
                return t(e, n) > 0 ? e : n
            } : function(t, e) {
                return t > e ? t : e
            })
        },
        merge: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                return e.lift.call(ye.apply(void 0, [e].concat(t)))
            }
        },
        mergeAll: ce,
        mergeMap: ie,
        flatMap: ue,
        mergeMapTo: function(t, e, n) {
            return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof e ? ie((function() {
                return t
            }), e, n) : ("number" == typeof e && (n = e), ie((function() {
                return t
            }), n))
        },
        mergeScan: function(t, e, n) {
            return void 0 === n && (n = Number.POSITIVE_INFINITY),
                function(r) {
                    return r.lift(new lr(t, e, n))
                }
        },
        min: function(t) {
            return hr("function" == typeof t ? function(e, n) {
                return t(e, n) < 0 ? e : n
            } : function(t, e) {
                return t < e ? t : e
            })
        },
        multicast: pr,
        observeOn: function(t, e) {
            return void 0 === e && (e = 0),
                function(n) {
                    return n.lift(new st(t, e))
                }
        },
        onErrorResumeNext: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return 1 === t.length && l(t[0]) && (t = t[0]),
                function(e) {
                    return e.lift(new br(t))
                }
        },
        pairwise: function() {
            return function(t) {
                return t.lift(new yr)
            }
        },
        partition: function(t, e) {
            return function(n) {
                return [_e(t, e)(n), _e(xe(t, e))(n)]
            }
        },
        pluck: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            var n = t.length;
            if (0 === n) throw new Error("list of properties cannot be empty.");
            return function(e) {
                return kt(wr(t, n))(e)
            }
        },
        publish: function(t) {
            return t ? pr((function() {
                return new V
            }), t) : pr(new V)
        },
        publishBehavior: function(t) {
            return function(e) {
                return pr(new U(t))(e)
            }
        },
        publishLast: function() {
            return function(t) {
                return pr(new lt)(t)
            }
        },
        publishReplay: function(t, e, n, r) {
            n && "function" != typeof n && (r = n);
            var i = "function" == typeof n ? n : void 0,
                o = new at(t, e, r);
            return function(t) {
                return pr((function() {
                    return o
                }), i)(t)
            }
        },
        race: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                return 1 === t.length && l(t[0]) && (t = t[0]), e.lift.call(Ee.apply(void 0, [e].concat(t)))
            }
        },
        reduce: hr,
        repeat: function(t) {
            return void 0 === t && (t = -1),
                function(e) {
                    return 0 === t ? J() : t < 0 ? e.lift(new xr(-1, e)) : e.lift(new xr(t - 1, e))
                }
        },
        repeatWhen: function(t) {
            return function(e) {
                return e.lift(new gr(t))
            }
        },
        retry: function(t) {
            return void 0 === t && (t = -1),
                function(e) {
                    return e.lift(new Er(t, e))
                }
        },
        retryWhen: function(t) {
            return function(e) {
                return e.lift(new Nr(t, e))
            }
        },
        refCount: O,
        sample: function(t) {
            return function(e) {
                return e.lift(new Ir(t))
            }
        },
        sampleTime: function(t, e) {
            return void 0 === e && (e = St),
                function(n) {
                    return n.lift(new jr(t, e))
                }
        },
        scan: ur,
        sequenceEqual: function(t, e) {
            return function(n) {
                return n.lift(new Ar(t, e))
            }
        },
        share: function() {
            return function(t) {
                return O()(pr(Rr)(t))
            }
        },
        shareReplay: function(t, e, n) {
            var r;
            return r = t && "object" == typeof t ? t : {
                    bufferSize: t,
                    windowTime: e,
                    refCount: !1,
                    scheduler: n
                },
                function(t) {
                    return t.lift(function(t) {
                        var e, n, r = t.bufferSize,
                            i = void 0 === r ? Number.POSITIVE_INFINITY : r,
                            o = t.windowTime,
                            s = void 0 === o ? Number.POSITIVE_INFINITY : o,
                            u = t.refCount,
                            c = t.scheduler,
                            a = 0,
                            h = !1,
                            l = !1;
                        return function(t) {
                            var r;
                            a++, !e || h ? (h = !1, e = new at(i, s, c), r = e.subscribe(this), n = t.subscribe({
                                next: function(t) {
                                    e.next(t)
                                },
                                error: function(t) {
                                    h = !0, e.error(t)
                                },
                                complete: function() {
                                    l = !0, n = void 0, e.complete()
                                }
                            }), l && (n = void 0)) : r = e.subscribe(this), this.add((function() {
                                a--, r.unsubscribe(), r = void 0, n && !l && u && 0 === a && (n.unsubscribe(), n = void 0, e = void 0)
                            }))
                        }
                    }(r))
                }
        },
        single: function(t) {
            return function(e) {
                return e.lift(new Mr(t, e))
            }
        },
        skip: function(t) {
            return function(e) {
                return e.lift(new Wr(t))
            }
        },
        skipLast: function(t) {
            return function(e) {
                return e.lift(new Br(t))
            }
        },
        skipUntil: function(t) {
            return function(e) {
                return e.lift(new Yr(t))
            }
        },
        skipWhile: function(t) {
            return function(e) {
                return e.lift(new qr(t))
            }
        },
        startWith: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            var n = t[t.length - 1];
            return X(n) ? (t.pop(), function(e) {
                return he(t, e, n)
            }) : function(e) {
                return he(t, e)
            }
        },
        subscribeOn: function(t, e) {
            return void 0 === e && (e = 0),
                function(n) {
                    return n.lift(new Kr(t, e))
                }
        },
        switchAll: function() {
            return Qr(_)
        },
        switchMap: Qr,
        switchMapTo: function(t, e) {
            return e ? Qr((function() {
                return t
            }), e) : Qr((function() {
                return t
            }))
        },
        take: Fn,
        takeLast: tr,
        takeUntil: function(t) {
            return function(e) {
                return e.lift(new Zr(t))
            }
        },
        takeWhile: function(t, e) {
            return void 0 === e && (e = !1),
                function(n) {
                    return n.lift(new ti(t, e))
                }
        },
        tap: function(t, e, n) {
            return function(r) {
                return r.lift(new ni(t, e, n))
            }
        },
        throttle: function(t, e) {
            return void 0 === e && (e = ii),
                function(n) {
                    return n.lift(new oi(t, !!e.leading, !!e.trailing))
                }
        },
        throttleTime: function(t, e, n) {
            return void 0 === e && (e = St), void 0 === n && (n = ii),
                function(r) {
                    return r.lift(new ui(t, e, n.leading, n.trailing))
                }
        },
        throwIfEmpty: On,
        timeInterval: function(t) {
            return void 0 === t && (t = St),
                function(e) {
                    return le((function() {
                        return e.pipe(ur((function(e, n) {
                            var r = e.current;
                            return {
                                value: n,
                                current: t.now(),
                                last: r
                            }
                        }), {
                            current: t.now(),
                            value: void 0,
                            last: void 0
                        }), kt((function(t) {
                            var e = t.current,
                                n = t.last,
                                r = t.value;
                            return new hi(r, e - n)
                        })))
                    }))
                }
        },
        timeout: function(t, e) {
            return void 0 === e && (e = St), li(t, rt(new At), e)
        },
        timeoutWith: li,
        timestamp: function(t) {
            return void 0 === t && (t = St), kt((function(e) {
                return new di(e, t.now())
            }))
        },
        toArray: function() {
            return hr(bi, [])
        },
        window: function(t) {
            return function(e) {
                return e.lift(new vi(t))
            }
        },
        windowCount: function(t, e) {
            return void 0 === e && (e = 0),
                function(n) {
                    return n.lift(new mi(t, e))
                }
        },
        windowTime: function(t) {
            var e = St,
                n = null,
                r = Number.POSITIVE_INFINITY;
            return X(arguments[3]) && (e = arguments[3]), X(arguments[2]) ? e = arguments[2] : be(arguments[2]) && (r = Number(arguments[2])), X(arguments[1]) ? e = arguments[1] : be(arguments[1]) && (n = Number(arguments[1])),
                function(i) {
                    return i.lift(new xi(t, n, r, e))
                }
        },
        windowToggle: function(t, e) {
            return function(n) {
                return n.lift(new Ni(t, e))
            }
        },
        windowWhen: function(t) {
            return function(e) {
                return e.lift(new Ii(t))
            }
        },
        withLatestFrom: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                var n;
                "function" == typeof t[t.length - 1] && (n = t.pop());
                var r = t;
                return e.lift(new ji(r, n))
            }
        },
        zip: function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return function(e) {
                return e.lift.call(je.apply(void 0, [e].concat(t)))
            }
        },
        zipAll: function(t) {
            return function(e) {
                return e.lift(new Oe(t))
            }
        }
    }),
    Ai = n(Pi),
    ki = {};
Object.defineProperty(ki, "__esModule", {
    value: !0
});
var Fi = Ai;

function Ri(t) {
    for (var e = [], n = 0; n < t.length; n++) n % 3 == 0 ? e.push(t[n] << 4 | t[n + 1] >> 4) : (e.push((15 & t[n]) << 8 | t[n + 1]), n++);
    return e
}

function Mi(t) {
    for (var e = [], n = 0; n < t.length; n += 3) e.push(t[n] << 16 | t[n + 1] << 8 | t[n + 2]);
    return e
}

function Di(t, e) {
    function n(n) {
        return {
            x: e * t.getInt16(n),
            y: e * t.getInt16(n + 2),
            z: e * t.getInt16(n + 4)
        }
    }
    return {
        sequenceId: t.getUint16(0),
        samples: [n(2), n(8), n(14)]
    }
}
ki.parseControl = function(t) {
    return t.pipe(Fi.concatMap((function(t) {
        return t.split("")
    })), Fi.scan((function(t, e) {
        return t.indexOf("}") >= 0 ? e : t + e
    }), ""), Fi.filter((function(t) {
        return t.indexOf("}") >= 0
    })), Fi.map((function(t) {
        return JSON.parse(t)
    })))
}, ki.decodeUnsigned12BitData = Ri, ki.decodeUnsigned24BitData = Mi, ki.decodeEEGSamples = function(t) {
    return Ri(t).map((function(t) {
        return .48828125 * (t - 2048)
    }))
}, ki.decodePPGSamples = function(t) {
    return Mi(t)
}, ki.parseTelemetry = function(t) {
    return {
        sequenceId: t.getUint16(0),
        batteryLevel: t.getUint16(2) / 512,
        fuelGaugeVoltage: 2.2 * t.getUint16(4),
        temperature: t.getUint16(8)
    }
}, ki.parseAccelerometer = function(t) {
    return Di(t, 610352e-10)
}, ki.parseGyroscope = function(t) {
    return Di(t, .0074768)
};
var Wi = {},
    zi = e && e.__awaiter || function(t, e, n, r) {
        return new(n || (n = Promise))((function(i, o) {
            function s(t) {
                try {
                    c(r.next(t))
                } catch (t) {
                    o(t)
                }
            }

            function u(t) {
                try {
                    c(r.throw(t))
                } catch (t) {
                    o(t)
                }
            }

            function c(t) {
                t.done ? i(t.value) : new n((function(e) {
                    e(t.value)
                })).then(s, u)
            }
            c((r = r.apply(t, e || [])).next())
        }))
    },
    Bi = e && e.__generator || function(t, e) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: u(0),
            throw: u(1),
            return: u(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }), o;

        function u(o) {
            return function(u) {
                return function(o) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                        switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++, {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++, r = o[1], o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1], i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2], s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        o = e.call(t, s)
                    } catch (t) {
                        o = [6, t], r = 0
                    } finally {
                        n = i = 0
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, u])
            }
        }
    };
Object.defineProperty(Wi, "__esModule", {
    value: !0
});
var Ui = Me,
    Yi = Ai;
Wi.decodeResponse = function(t) {
    return (new TextDecoder).decode(t.subarray(1, 1 + t[0]))
}, Wi.encodeCommand = function(t) {
    var e = (new TextEncoder).encode("X" + t + "\n");
    return e[0] = e.length - 1, e
}, Wi.observableCharacteristic = function(t) {
    return zi(this, void 0, void 0, (function() {
        var e;
        return Bi(this, (function(n) {
            switch (n.label) {
                case 0:
                    return [4, t.startNotifications()];
                case 1:
                    return n.sent(), e = Ui.fromEvent(t.service.device, "gattserverdisconnected"), [2, Ui.fromEvent(t, "characteristicvaluechanged").pipe(Yi.takeUntil(e), Yi.map((function(t) {
                        return t.target.value
                    })))]
            }
        }))
    }))
};
var Gi = {};
Object.defineProperty(Gi, "__esModule", {
    value: !0
});
var qi = Me,
    Li = Ai,
    Hi = r;
Gi.zipSamples = function(t) {
    var e = [],
        n = null;
    return t.pipe(Li.mergeMap((function(t) {
        if (t.timestamp !== n && (n = t.timestamp, e.length)) {
            var r = qi.from([e.slice()]);
            return e.splice(0, e.length, t), r
        }
        return e.push(t), qi.from([])
    })), Li.concat(qi.from([e])), Li.mergeMap((function(t) {
        var e = t[0].samples.map((function(e, n) {
            for (var r = [NaN, NaN, NaN, NaN, NaN], i = 0, o = t; i < o.length; i++) {
                var s = o[i];
                r[s.electrode] = s.samples[n]
            }
            return {
                data: r,
                index: t[0].index,
                timestamp: t[0].timestamp + 1e3 * n / Hi.EEG_FREQUENCY
            }
        }));
        return qi.from(e)
    })))
};
var Ki = {};
Object.defineProperty(Ki, "__esModule", {
    value: !0
});
var Qi = Me,
    Ji = Ai,
    Xi = r;
Ki.zipSamplesPpg = function(t) {
        var e = [],
            n = null;
        return t.pipe(Ji.mergeMap((function(t) {
            if (t.timestamp !== n && (n = t.timestamp, e.length)) {
                var r = Qi.from([e.slice()]);
                return e.splice(0, e.length, t), r
            }
            return e.push(t), Qi.from([])
        })), Ji.concat(Qi.from([e])), Ji.mergeMap((function(t) {
            var e = t[0].samples.map((function(e, n) {
                for (var r = [NaN, NaN, NaN], i = 0, o = t; i < o.length; i++) {
                    var s = o[i];
                    r[s.ppgChannel] = s.samples[n]
                }
                return {
                    data: r,
                    index: t[0].index,
                    timestamp: t[0].timestamp + 1e3 * n / Xi.PPG_FREQUENCY
                }
            }));
            return Qi.from(e)
        })))
    },
    function(t) {
        var n = e && e.__awaiter || function(t, e, n, r) {
                return new(n || (n = Promise))((function(i, o) {
                    function s(t) {
                        try {
                            c(r.next(t))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function u(t) {
                        try {
                            c(r.throw(t))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function c(t) {
                        t.done ? i(t.value) : new n((function(e) {
                            e(t.value)
                        })).then(s, u)
                    }
                    c((r = r.apply(t, e || [])).next())
                }))
            },
            r = e && e.__generator || function(t, e) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }), o;

                function u(o) {
                    return function(u) {
                        return function(o) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1], i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2], s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                o = e.call(t, s)
                            } catch (t) {
                                o = [6, t], r = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, u])
                    }
                }
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Me,
            o = Ai,
            s = ki,
            u = Wi,
            c = Gi;
        t.zipSamples = c.zipSamples;
        var a = Ki;
        t.zipSamplesPpg = a.zipSamplesPpg, t.MUSE_SERVICE = 65165;
        var h = ["273e000f-4c4d-454d-96be-f03bac821358", "273e0010-4c4d-454d-96be-f03bac821358", "273e0011-4c4d-454d-96be-f03bac821358"];
        t.PPG_FREQUENCY = 64, t.PPG_SAMPLES_PER_READING = 6;
        var l = ["273e0003-4c4d-454d-96be-f03bac821358", "273e0004-4c4d-454d-96be-f03bac821358", "273e0005-4c4d-454d-96be-f03bac821358", "273e0006-4c4d-454d-96be-f03bac821358", "273e0007-4c4d-454d-96be-f03bac821358"];
        t.EEG_FREQUENCY = 256, t.EEG_SAMPLES_PER_READING = 12, t.ppgChannelNames = ["ambient", "infrared", "red"], t.channelNames = ["TP9", "AF7", "AF8", "TP10", "AUX"];
        var f = function() {
            function e() {
                this.enableAux = !1, this.enablePpg = !1, this.deviceName = "", this.connectionStatus = new i.BehaviorSubject(!1), this.gatt = null, this.lastIndex = null, this.lastTimestamp = null
            }
            return e.prototype.connect = function(e) {
                return n(this, void 0, void 0, (function() {
                    var n, c, a, f, p, d, b, v, y, m, w, x, _, g, S, E, C, N, T, I, V, j = this;
                    return r(this, (function(O) {
                        switch (O.label) {
                            case 0:
                                return e ? (this.gatt = e, [3, 4]) : [3, 1];
                            case 1:
                                return [4, navigator.bluetooth.requestDevice({
                                    filters: [{
                                        services: [t.MUSE_SERVICE]
                                    }]
                                })];
                            case 2:
                                return n = O.sent(), c = this, [4, n.gatt.connect()];
                            case 3:
                                c.gatt = O.sent(), O.label = 4;
                            case 4:
                                return this.deviceName = this.gatt.device.name || null, [4, this.gatt.getPrimaryService(t.MUSE_SERVICE)];
                            case 5:
                                return a = O.sent(), i.fromEvent(this.gatt.device, "gattserverdisconnected").pipe(o.first()).subscribe((function() {
                                    j.gatt = null, j.connectionStatus.next(!1)
                                })), f = this, [4, a.getCharacteristic("273e0001-4c4d-454d-96be-f03bac821358")];
                            case 6:
                                return f.controlChar = O.sent(), p = this, [4, u.observableCharacteristic(this.controlChar)];
                            case 7:
                                return p.rawControlData = O.sent().pipe(o.map((function(t) {
                                    return u.decodeResponse(new Uint8Array(t.buffer))
                                })), o.share()), this.controlResponses = s.parseControl(this.rawControlData), [4, a.getCharacteristic("273e000b-4c4d-454d-96be-f03bac821358")];
                            case 8:
                                return d = O.sent(), b = this, [4, u.observableCharacteristic(d)];
                            case 9:
                                return b.telemetryData = O.sent().pipe(o.map(s.parseTelemetry)), [4, a.getCharacteristic("273e0009-4c4d-454d-96be-f03bac821358")];
                            case 10:
                                return v = O.sent(), y = this, [4, u.observableCharacteristic(v)];
                            case 11:
                                return y.gyroscopeData = O.sent().pipe(o.map(s.parseGyroscope)), [4, a.getCharacteristic("273e000a-4c4d-454d-96be-f03bac821358")];
                            case 12:
                                return m = O.sent(), w = this, [4, u.observableCharacteristic(m)];
                            case 13:
                                if (w.accelerometerData = O.sent().pipe(o.map(s.parseAccelerometer)), this.eventMarkers = new i.Subject, !this.enablePpg) return [3, 18];
                                this.ppgCharacteristics = [], x = [], _ = h.length, g = function(e) {
                                    var n, i, c, l;
                                    return r(this, (function(r) {
                                        switch (r.label) {
                                            case 0:
                                                return n = h[e], [4, a.getCharacteristic(n)];
                                            case 1:
                                                return i = r.sent(), l = (c = x).push, [4, u.observableCharacteristic(i)];
                                            case 2:
                                                return l.apply(c, [r.sent().pipe(o.map((function(n) {
                                                    var r = n.getUint16(0);
                                                    return {
                                                        index: r,
                                                        ppgChannel: e,
                                                        samples: s.decodePPGSamples(new Uint8Array(n.buffer).subarray(2)),
                                                        timestamp: j.getTimestamp(r, t.PPG_SAMPLES_PER_READING, t.PPG_FREQUENCY)
                                                    }
                                                })))]), S.ppgCharacteristics.push(i), [2]
                                        }
                                    }))
                                }, S = this, E = 0, O.label = 14;
                            case 14:
                                return E < _ ? [5, g(E)] : [3, 17];
                            case 15:
                                O.sent(), O.label = 16;
                            case 16:
                                return E++, [3, 14];
                            case 17:
                                this.ppgReadings = i.merge.apply(void 0, x), O.label = 18;
                            case 18:
                                this.eegCharacteristics = [], C = [], N = this.enableAux ? l.length : 4, T = function(e) {
                                    var n, i, c, h;
                                    return r(this, (function(r) {
                                        switch (r.label) {
                                            case 0:
                                                return n = l[e], [4, a.getCharacteristic(n)];
                                            case 1:
                                                return i = r.sent(), h = (c = C).push, [4, u.observableCharacteristic(i)];
                                            case 2:
                                                return h.apply(c, [r.sent().pipe(o.map((function(n) {
                                                    var r = n.getUint16(0);
                                                    return {
                                                        electrode: e,
                                                        index: r,
                                                        samples: s.decodeEEGSamples(new Uint8Array(n.buffer).subarray(2)),
                                                        timestamp: j.getTimestamp(r, t.EEG_SAMPLES_PER_READING, t.EEG_FREQUENCY)
                                                    }
                                                })))]), I.eegCharacteristics.push(i), [2]
                                        }
                                    }))
                                }, I = this, V = 0, O.label = 19;
                            case 19:
                                return V < N ? [5, T(V)] : [3, 22];
                            case 20:
                                O.sent(), O.label = 21;
                            case 21:
                                return V++, [3, 19];
                            case 22:
                                return this.eegReadings = i.merge.apply(void 0, C), this.connectionStatus.next(!0), [2]
                        }
                    }))
                }))
            }, e.prototype.sendCommand = function(t) {
                return n(this, void 0, void 0, (function() {
                    return r(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.controlChar.writeValue(u.encodeCommand(t))];
                            case 1:
                                return e.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.start = function() {
                return n(this, void 0, void 0, (function() {
                    var t;
                    return r(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.pause()];
                            case 1:
                                return e.sent(), t = "p21", this.enablePpg ? t = "p50" : this.enableAux && (t = "p20"), [4, this.controlChar.writeValue(u.encodeCommand(t))];
                            case 2:
                                return e.sent(), [4, this.controlChar.writeValue(u.encodeCommand("s"))];
                            case 3:
                                return e.sent(), [4, this.resume()];
                            case 4:
                                return e.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.pause = function() {
                return n(this, void 0, void 0, (function() {
                    return r(this, (function(t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.sendCommand("h")];
                            case 1:
                                return t.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.resume = function() {
                return n(this, void 0, void 0, (function() {
                    return r(this, (function(t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.sendCommand("d")];
                            case 1:
                                return t.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.deviceInfo = function() {
                return n(this, void 0, void 0, (function() {
                    var t;
                    return r(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return t = this.controlResponses.pipe(o.filter((function(t) {
                                    return !!t.fw
                                })), o.take(1)).toPromise(), [4, this.sendCommand("v1")];
                            case 1:
                                return e.sent(), [2, t]
                        }
                    }))
                }))
            }, e.prototype.injectMarker = function(t, e) {
                return void 0 === e && (e = (new Date).getTime()), n(this, void 0, void 0, (function() {
                    return r(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, this.eventMarkers.next({
                                    value: t,
                                    timestamp: e
                                })];
                            case 1:
                                return n.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.disconnect = function() {
                this.gatt && (this.lastIndex = null, this.lastTimestamp = null, this.gatt.disconnect(), this.connectionStatus.next(!1))
            }, e.prototype.getTimestamp = function(t, e, n) {
                var r = 1 / n * 1e3 * e;
                for (null !== this.lastIndex && null !== this.lastTimestamp || (this.lastIndex = t, this.lastTimestamp = (new Date).getTime() - r); this.lastIndex - t > 4096;) t += 65536;
                return t === this.lastIndex ? this.lastTimestamp : t > this.lastIndex ? (this.lastTimestamp += r * (t - this.lastIndex), this.lastIndex = t, this.lastTimestamp) : this.lastTimestamp - r * (this.lastIndex - t)
            }, e
        }();
        t.MuseClient = f
    }(r);
const Zi = ["TP9", "AF7", "AF8", "TP10"],
    $i = {
        label: "muse",
        device: r.MuseClient,
        onconnect: e => t(void 0, void 0, void 0, (function*() {
            let t = e.device;
            yield t.start(), t.eegReadings.subscribe((t => {
                let n = {};
                n[Zi[t.electrode]] = t.samples, e.ondata(n, t.timestamp)
            }))
        })),
        protocols: ["bluetooth"]
    };
export {
    $i as
    default, $i as device
};
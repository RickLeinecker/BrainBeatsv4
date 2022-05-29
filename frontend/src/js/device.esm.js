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
function e(e, t, o, n) {
    return new(o || (o = Promise))((function(c, a) {
        function i(e) {
            try {
                d(n.next(e))
            } catch (e) {
                a(e)
            }
        }

        function r(e) {
            try {
                d(n.throw(e))
            } catch (e) {
                a(e)
            }
        }

        function d(e) {
            var t;
            e.done ? c(e.value) : (t = e.value, t instanceof o ? t : new o((function(e) {
                e(t)
            }))).then(i, r)
        }
        d((n = n.apply(e, t || [])).next())
    }))
}
let t = !1;
let o = new TextEncoder;
const n = new TextDecoder("utf-8"),
    c = {
        label: "device",
        onconnect: o => e(void 0, void 0, void 0, (function*() {
            let e = [1, 5, 10];
            t = !0;
            let n = () => {
                if (t) {
                    let t = [];
                    e.forEach((e => {
                        t.push(Math.sin(2 * e * Math.PI * Date.now() / 1e3))
                    }));
                    let c = t.join(",");
                    o.ondata(c), setTimeout(n, 1e3 / 60)
                }
            };
            return n(), !0
        })),
        ondisconnect: o => e(void 0, void 0, void 0, (function*() {
            t = !1, console.log("Device disconnected", o)
        })),
        encode: (e, t) => o.encode(e),
        decode: (e, t) => n.decode(e),
        ondata: e => e.split(",").map((e => Number.parseFloat(e))),
        onerror: onerror,
        characteristics: {
            transmit: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
            receive: "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
        },
        usbVendorId: 4292,
        usbProductId: 6e4,
        bufferSize: 1e3,
        baudRate: 115200,
        url: "https://localhost",
        protocols: ["serial", "bluetooth", "websocket"]
    };
export {
    c as
    default
};
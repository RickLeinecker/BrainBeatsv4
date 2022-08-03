let e, a = [],
    t = [],
    s = [],
    o = [],
    l = [],
    r = [];
new TextEncoder, new TextDecoder("utf-8");
const c = {
    label: "hegduino",
    ondata: c => {
        let n = [];
        if (c.indexOf("|") > -1) {
            let p = c.split("|");
            if (p.length > 3) {
                if (0 === a.length) a.push(Date.now()), e = parseFloat(p[0]);
                else {
                    let t = parseFloat(p[0]);
                    a.push(Math.floor(a[a.length - 1] + .001 * (t - e))), e = t
                }
                t.push(parseFloat(p[1])), s.push(parseFloat(p[2])), o.push(parseFloat(p[3])), l.push(parseFloat(p[4])), r.push(parseFloat(p[5]))
            }
            n.push(parseFloat(p[3]))
        } else console.log("HEGDUINO: ", c);
        return n
    },
    onconnect: e => console.log("Device connected", e),
    namePrefix: "HEG",
    serviceUUID: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
    characteristics: {
        transmit: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
        receive: "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
    },
    usbVendorId: 4292,
    usbProductId: 6e4,
    bufferSize: 1e3,
    baudRate: 115200
};
export {
    c as
    default, c as device
};
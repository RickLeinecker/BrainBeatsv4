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
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

// Constraints which are specified using any or all of max, min, or exact are always treated as mandatory. 
// If any constraint which uses one or more of those can't be met when calling applyConstraints(), the promise will be rejected.
class DataTrackConstraints {
    constructor(track) {
        this.channelCount = undefined;
        this.latency = undefined;
        this.sampleRate = undefined;
        this.sampleSize = undefined;
        this.volume = undefined;
        // Image Tracks
        this.whiteBalanceMode = undefined;
        this.exposureMode = undefined;
        this.focusMode = undefined;
        this.pointOfInterest = undefined;
        this.exposureCompensation = undefined;
        this.colorTemperature = undefined;
        this.iso = undefined;
        this.brightness = undefined;
        this.contrast = undefined;
        this.saturation = undefined;
        this.sharpness = undefined;
        this.focusDistance = undefined;
        this.zoom = undefined;
        this.torch = undefined;
        // Video Tracks
        this.aspectRatio = undefined;
        this.frameRate = undefined;
        this.height = undefined;
        this.width = undefined;
        this.resizeMode = undefined;
        // Shared Screen Tracks
        this.cursor = ['always', 'motion', 'never']; // can be single string
        this.displaySurface = ['application', 'browser', 'monitor', 'window']; // can be single string
        this.logicalSurface = false;
        console.error('TODO: Get Constraints', track); // TODO: Get Constraints
        return this;
    }
}

class DataTrackSettings extends DataTrackConstraints {
    constructor(track) {
        super(track);
        let constraints = track.getConstraints();
        // All Media Tracks
        this.deviceId = constraints.deviceId;
        this.groupId = constraints.groupId;
        // Audio Tracks
        this.autoGainControl = constraints.autoGainControl;
        this.channelCount = constraints.channelCount;
        this.echoCancellation = constraints.echoCancellation;
        this.latency = constraints.latency;
        this.noiseSuppression = constraints.noiseSuppression;
        this.sampleRate = constraints.sampleRate;
        this.sampleSize = constraints.sampleSize;
        this.volume = constraints.volume;
        // Video Tracks
        this.aspectRatio = constraints.aspectRatio;
        this.facingMode = constraints.facingMode;
        this.frameRate = constraints.frameRate;
        this.height = constraints.height;
        this.width = constraints.width;
        this.resizeMode = constraints.resizeMode;
        // Shared Screen Tracks
        this.cursor = constraints.cursor;
        this.displaySurface = constraints.displaySurface;
        this.logicalSurface = constraints.logicalSurface;
    }
}

class DataTrackCapabilities {
    constructor(track) {
        console.error('TODO: Get Capabilities', track); // TODO: Get Capabilities
    }
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

const randomUUID = () => {
    // // Use Crypto API
    if (globalThis.crypto)
        return globalThis.crypto.randomUUID();
    // // Or Generate our UUID
    else
        return v4();
};

// NOTE: This class allows the conversion of independent data coming from Device classes
// to a ReadableStream format.
class DataStreamTrack extends EventTarget {
    constructor(device, // Get Track Details
    track, // Get Readable Stream from MediaStreamTrack
    contentHint = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super();
        // Mirror Attributes from MediaStreamTrack
        this.contentHint = '';
        this.enabled = false;
        this.isolated = false;
        this.muted = false;
        this.remote = false;
        this.id = '';
        this.kind = '';
        this.label = '';
        this.readyState = 'live';
        // New Attributes
        this.data = [];
        this.timestamps = [];
        this.writable = new WritableStream({
            start: () => { },
            write: (chunk) => this.addData(chunk, Date.now()), // TODO: Allow reliable stream into the track
            // close: () => console.log("All data successfully read!"),
            // abort: (reason: any) => console.error("Something went wrong!", reason),
        });
        this.callbacks = new Map();
        this.pipeline = [];
        this._bufferSize = 256 * 60 * 2;
        this.deinit = () => {
            this.dispatchEvent(new Event('ended'));
        };
        // TODO: Allow constraints to apply to the selected track
        this.applyConstraints = () => __awaiter(this, void 0, void 0, function* () {
            // if (constraint.mute) this.dispatchEvent(new Event('mute'))
            // else this.dispatchEvent(new Event('unmute'))
        });
        this.clone = () => {
            return this; // TODO: should actually clone
        };
        this.getCapabilities = () => {
            return new DataTrackCapabilities(this);
        };
        this.getConstraints = () => {
            return new DataTrackConstraints(this);
        };
        this.getSettings = () => {
            return new DataTrackSettings(this);
        };
        this.stop = () => {
            this.readable.cancel();
            this.writable.abort();
        };
        this.addData = (values, timestamps = [Date.now()]) => {
            // Values
            if (!Array.isArray(values))
                values = [values];
            this.data.push(...values);
            // Timestamps (not corrected)
            // console.log(timestamps)
            if (!Array.isArray(timestamps))
                timestamps = [timestamps];
            const lastTime = timestamps[timestamps.length - 1];
            if (values.length !== timestamps.length)
                timestamps = Array.from({ length: values.length }, (_, i) => { var _a; return (_a = timestamps === null || timestamps === void 0 ? void 0 : timestamps[i]) !== null && _a !== void 0 ? _a : lastTime; });
            this.timestamps.push(...timestamps);
            if (this.controller)
                values.forEach((v) => { var _a; return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.enqueue(v); });
            const diff = this.data.length - this._bufferSize;
            for (let i = diff; i > 0; i--)
                this.data.shift();
            this.ondata(values, timestamps);
        };
        // Data Readout
        this.ondata = (data, timestamp) => {
            this.callbacks.forEach((f) => {
                f(data, timestamp);
            });
        };
        this.subscribe = (callback) => {
            let id = randomUUID();
            this.callbacks.set(id, callback);
            return id;
        };
        this.unsubscribe = (id) => this.callbacks.delete(id);
        this.id = (_a = device === null || device === void 0 ? void 0 : device.id) !== null && _a !== void 0 ? _a : randomUUID();
        this.kind = (_c = (_b = device === null || device === void 0 ? void 0 : device.constraints) === null || _b === void 0 ? void 0 : _b.kind) !== null && _c !== void 0 ? _c : this.kind;
        this.label = (_e = (_d = device === null || device === void 0 ? void 0 : device.constraints) === null || _d === void 0 ? void 0 : _d.label) !== null && _e !== void 0 ? _e : this.label;
        this.callbacks = new Map();
        this.data = [];
        if (typeof this.contentHint === 'string')
            this.contentHint = contentHint;
        this._bufferSize = (_g = (_f = device === null || device === void 0 ? void 0 : device.constraints) === null || _f === void 0 ? void 0 : _f.bufferSize) !== null && _g !== void 0 ? _g : this._bufferSize;
        this.pipeline = [];
        const pull = () => { };
        const cancel = () => this.controller = undefined;
        this.readable = new ReadableStream({
            start: (controller) => { this.controller = controller; },
            pull,
            cancel
        });
        if (track) {
            if ('MediaStreamTrackProcessor' in globalThis) {
                // Get Readable Stream from Media Stream
                const readable = (_h = (new MediaStreamTrackProcessor({ track: track }))) === null || _h === void 0 ? void 0 : _h.readable;
                // Pipe Stream to Data Buffer
                const [r1, r2] = readable.tee();
                r1.pipeTo(new WritableStream({
                    start: () => { },
                    write: (chunk) => this.addData(chunk, Date.now()),
                    // close: () => console.log("All data successfully read!"),
                    // abort: (reason: any) => console.error("Something went wrong!", reason),
                }));
                // Assign Main Readable
                this.readable = r2;
            }
            else {
                alert('Your browser does not support the experimental MediaStreamTrack API for Insertable Streams of Media');
            }
        }
    }
    get [Symbol.toStringTag]() { return 'DataStreamTrack'; }
}

// Data Channels Behave Just Like Tracks
class DataChannel extends DataStreamTrack {
    constructor(parent) {
        var _a, _b;
        super();
        this.id = '';
        this.label = '';
        this.send = (data) => this.parent.send(data);
        this.sendMessage = (_) => { };
        this.id = (_b = (_a = parent.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : randomUUID();
        this.label = parent.label;
        this.parent = parent;
    }
}

const DataDeviceInfo = (constraints) => {
    const protocols = new Set();
    if (Array.isArray(constraints.protocols))
        constraints.protocols.forEach((str) => protocols.add(str));
    else {
        if (constraints.serviceUUID)
            protocols.add('bluetooth');
        if (constraints.usbVendorId)
            protocols.add('serial');
        if (constraints.url) {
            protocols.add('wifi');
            protocols.add('websocket');
        }
    }
    return {
        deviceId: randomUUID(),
        groupId: randomUUID(),
        kind: constraints.kind,
        label: constraints.label,
        protocols: Array.from(protocols),
        modes: constraints === null || constraints === void 0 ? void 0 : constraints.modes
    };
};

/*

Extension of the MediaStream API to handle arbitrary time-series data.

*/
class DataStream extends MediaStream {
    constructor(arg = []) {
        super(arg);
        // Mirror Attributes from MediaStreams
        this.tracks = new Map();
        // Functions
        this.addTrack = this.addTrack;
        // ---------------------- NEW METHODS ----------------------
        this.getDataTracks = () => [...this.tracks.values()];
        // ----------------- Event Listeners -----------------
        // this.ontrack
        // this.onremovetrack
        // this.onactive
        // this.oninactive
        // ----------------- Core Properties -----------------
        // this.id
        // this.active
        // ----------------- Custom Methods -----------------
        // this.addTrack
        // this.getTracks
        this._addTrack = this.addTrack; // save original
        this._getTracks = this.getTracks; // save original
        this._removeTrack = this.removeTrack; // save original
        this.addTrack = (track) => {
            if (![...this.tracks.values()].includes(track)) { // don't duplicate tracks
                if (track instanceof MediaStreamTrack) {
                    this._addTrack(track); // Add track using the MediaStreams API
                    track = new DataStreamTrack(undefined, track); // Add track using our DataStreams API
                }
                this.tracks.set(track.contentHint || this.tracks.size, track);
                this.dispatchEvent(new CustomEvent('addtrack', { detail: track })); // Trigger ontrackadded for local updates (disabled in MediaStreams API)
            }
            return track;
        };
        this.removeTrack = (track) => {
            if ([...this.tracks.values()].includes(track)) {
                try {
                    this._removeTrack(track);
                }
                catch (_a) { } // Try adding using the MediaStreams API
                for (let [key, value] of this.tracks.entries()) {
                    if (value === track) {
                        this.tracks.delete(key);
                        this.dispatchEvent(new CustomEvent('removetrack', { detail: track })); // Trigger ontrackadded for local updates (disabled in MediaStreams API)
                    }
                }
            }
            return track;
        };
        this.getTracks = () => {
            const mediaTracks = this._getTracks();
            const dataTracks = this.getDataTracks();
            return [...mediaTracks, ...dataTracks];
        };
        this.addEventListener('addtrack', ((ev) => {
            ev.track = ev.detail;
            delete ev.detail;
        }));
        this.addEventListener('removetrack', ((ev) => {
            ev.track = ev.detail;
            delete ev.detail;
        }));
        let arr = (!Array.isArray(arg)) ? [...arg.getTracks()] : [...arg];
        arr.forEach((t) => this.addTrack(t));
    }
    get [Symbol.toStringTag]() { return 'DataStream'; }
}

class Device {
    // coordinates: any[] = []
    // // Inherited Functions
    // onconnect: (target) =>{}
    // ondisconnect: (target) =>{}}
    constructor(constraints) {
        var _a;
        this.id = randomUUID();
        this._ondata = (data) => data;
        this.active = false;
        this.debug = false;
        this.init = (constraints) => {
            var _a, _b, _c;
            // Disconnect Active Device
            if (this.active)
                this.disconnect();
            // Assign Constraints
            if (constraints) {
                Object.assign(this.constraints, constraints); // Replace new constraints
                //  Callbacks 
                this.onconnect = (_a = this.constraints.onconnect) !== null && _a !== void 0 ? _a : this.onconnect;
                this.ondisconnect = (_b = this.constraints.ondisconnect) !== null && _b !== void 0 ? _b : this.ondisconnect;
                if (this.constraints.ondata)
                    this._ondata = this.constraints.ondata;
                this.onerror = (_c = this.constraints.onerror) !== null && _c !== void 0 ? _c : this.onerror;
                if (this.constraints.encode instanceof Function)
                    this.encode = this.constraints.encode;
                else
                    this.encoder = new TextEncoder();
                if (this.constraints.decode instanceof Function)
                    this.decode = this.constraints.decode;
                else
                    this.decoder = new TextDecoder("utf-8");
                if (this.constraints.oninit instanceof Function)
                    this.oninit = this.constraints.oninit;
            }
            // Run Callback
            this.oninit(this);
        };
        // setCoordinates = (input:any[]) => {
        //     if (Array.isArray(input)) this.coordinates = input
        // }
        // Core Methods 
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!(this.device instanceof Device) && this.device.connect)
                yield this.device.connect();
            this.active = true;
            this._connect();
            this.onconnect(this);
        });
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            if (!(this.device instanceof Device) && this.device.disconnect)
                yield this.device.disconnect();
            this.active = false;
            (_b = this.stream) === null || _b === void 0 ? void 0 : _b.tracks.forEach((t) => { var _a; return (_a = this.stream) === null || _a === void 0 ? void 0 : _a.removeTrack(t); });
            this._disconnect();
            this.ondisconnect(this);
        });
        this._connect = () => __awaiter(this, void 0, void 0, function* () { });
        this._disconnect = () => __awaiter(this, void 0, void 0, function* () { });
        this.send = (msg, from) => __awaiter(this, void 0, void 0, function* () { this.onsend(msg, from); });
        // Auxilliary Methods
        this.encode = (msg, _) => this.encoder.encode(msg);
        this.decode = (msg, _) => this.decoder.decode(msg);
        // Events
        this.oninit = (_ = this) => __awaiter(this, void 0, void 0, function* () { });
        this.onconnect = (target = this) => __awaiter(this, void 0, void 0, function* () { return (this.debug) ? console.log(`${target.constructor.name} connected!`) : {}; });
        this.ondisconnect = (target = this) => __awaiter(this, void 0, void 0, function* () { return (this.debug) ? console.log(`${target.constructor.name} disconnected!`) : {}; });
        this.onsend = (msg, from) => __awaiter(this, void 0, void 0, function* () { return (this.debug) ? console.log(`Sent ${msg} from ${from}`) : {}; });
        this.onerror = (err) => __awaiter(this, void 0, void 0, function* () { return (this.debug) ? console.log(`${this.constructor.name} Error: ${err}`) : {}; });
        // --------------- Internal Methods ---------------
        this.ondata = (data, timestamps = [Date.now()], charName) => {
            // Run Data through Decoder Function
            if (this._ondata instanceof Function) {
                let obj = this._ondata(data, charName); // returns array
                // Add DataStreamTrack for each Data Channel
                if (this.stream) {
                    const keys = Object.keys(obj);
                    keys.forEach((key) => {
                        var _a;
                        if (this.stream) {
                            let track = (_a = this.stream.tracks.get(key)) !== null && _a !== void 0 ? _a : this._createTrack(String(key));
                            if (track instanceof DataStreamTrack)
                                track.addData(obj[key], timestamps);
                        }
                    });
                }
            }
        };
        this._createTrack = (contentHint) => {
            if (this.stream) {
                const newTrack = new DataStreamTrack(this, undefined, contentHint);
                return this.stream.addTrack(newTrack);
            }
            else
                return undefined;
        };
        // Auto-select first constraint in an array
        if (Array.isArray(constraints)) {
            this.constraints = constraints[0];
            this.options = [...constraints];
        }
        else {
            this.constraints = constraints;
            this.options = [constraints];
        }
        this.device = (this.constraints.device) ? new this.constraints.device(this.constraints) : this;
        this.stream = this.constraints.stream;
        this.debug = (_a = this.constraints.debug) !== null && _a !== void 0 ? _a : false;
        // -------------- Set Default Constraints --------------
        this.init(this.constraints);
    }
}

// BluetoothDevice modified from this sparkfun tutorial: https://learn.sparkfun.com/tutorials/esp32-ota-updates-over-ble-from-a-react-web-application/all
class Bluetooth extends Device {
    constructor(constraints) {
        super(constraints);
        this.characteristics = {};
        // ---------------------- CORE ----------------------
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            let filters = [];
            filters.push({ services: this.options.map(o => (typeof o.serviceUUID === 'string') ? o.serviceUUID.toLowerCase() : o.serviceUUID).filter(str => !!str) });
            this.options.forEach(o => {
                if (o.namePrefix)
                    filters.push({ namePrefix: o.namePrefix }); // TODO: Can do multiple?
            });
            yield navigator.bluetooth.requestDevice({
                filters
            })
                .then((source) => {
                this.source = source;
                let gatt = source.gatt;
                if (gatt)
                    return gatt.connect(); //Connect to HEG
                else
                    return Promise.reject();
            })
                .then((server) => {
                var _a;
                // NOTE: This requires the name prefix to be specified
                const serviceUUID = (_a = this.options.find(o => { var _a; return (o === null || o === void 0 ? void 0 : o.namePrefix) && ((_a = server.device.name) === null || _a === void 0 ? void 0 : _a.includes(o.namePrefix)); })) === null || _a === void 0 ? void 0 : _a.serviceUUID;
                if (serviceUUID) {
                    this.server = server;
                    return server.getPrimaryService(serviceUUID);
                }
                else
                    return Promise.reject();
                // TODO: Track server.device.id in cookies?
            })
                .then((service) => __awaiter(this, void 0, void 0, function* () {
                this.service = service;
                if (this.source)
                    this.source.addEventListener('gattserverdisconnected', () => { this.ondisconnect(this); });
                for (let name in this.constraints.characteristics)
                    yield this.connectCharacteristic(name, this.constraints.characteristics[name]);
                this.onconnect(this);
            }))
                .catch(err => { console.error(err); this.onerror(err); return Promise.reject(); });
        });
        this._disconnect = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.server) === null || _a === void 0 ? void 0 : _a.disconnect();
        });
        this.send = (msg, charName) => __awaiter(this, void 0, void 0, function* () {
            if (this.transmitCharacteristic)
                return this.transmitCharacteristic.writeValue(this.encode(msg, charName));
        });
        // ---------------------- CALLBACKS ----------------------
        this.onnotification = (e, charName) => {
            this.ondata(this.decode(e.target.value, charName), Date.now(), charName); // TODO: Add Capacity for On-Device Timestamp
        };
        // ---------------------- INTERNAL UTILITIES ----------------------
        this.connectCharacteristic = (name, value) => __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(value))
                yield Promise.all(value.map((val, i) => this.connectCharacteristic(`${name}${i}`, val)));
            else {
                value = (typeof value === 'string') ? value.toLowerCase() : value;
                if (this.service) {
                    const characteristic = yield this.service.getCharacteristic(value);
                    this.characteristics[name] = characteristic;
                    let props = characteristic.properties;
                    // Assign to Write to this Characteristic
                    if (props.write || props.writeWithoutResponse) {
                        this.transmitCharacteristic = characteristic;
                    }
                    // Start Notifications
                    if (props.notify) {
                        characteristic.addEventListener('characteristicvaluechanged', (e) => {
                            this.onnotification(e, name);
                        });
                        return characteristic.startNotifications();
                    }
                }
            }
        });
        console.log(constraints);
    }
}

class SerialDevice extends Device {
    constructor(constraints) {
        super(constraints);
        this.displayPorts = [];
        this.encodedBuffer = "";
        this.connected = false;
        this.recordData = false;
        this.recorded = [];
        this.port = null;
        this.decoder = new TextDecoder();
        this.subscribed = false;
        this.readable = null;
        this.writer = null;
        this.monitoring = false;
        this.newSamples = 0;
        this.monitorSamples = 10000; //Max 10000 samples visible in stream monitor by default
        this.monitorData = [];
        this.monitorIdx = 0;
        // ---------------------- CORE ----------------------
        // Supports one usbVendorId and usbProductId filter
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            let { usbVendorId, usbProductId } = this.constraints;
            console.log(this.constraints);
            var re = /[0-9A-Fa-f]{6}/g;
            // Convert to Hexadecimal (assume strings are accurate)
            // TODO: TypeScript doesn't like when passing strings as a filter. Do the opposite.
            if (!!usbVendorId && typeof usbVendorId !== 'string' && !re.test(usbVendorId + ''))
                usbVendorId = `0x${usbVendorId.toString(16)}`; // test if this works
            if (!!usbProductId && typeof usbProductId !== 'string' && !re.test(usbProductId + ''))
                usbProductId = `0x${usbProductId.toString(16)}`; // test if this works
            // if (typeof usbProductId === 'string' || typeof usbVendorId === 'string') throw new Error('WTF why is this a string?')
            const filters = [
                {
                    usbVendorId,
                    usbProductId
                }
            ];
            yield navigator.serial.requestPort({ filters }).then(this.onPortSelected);
        });
        this.send = (msg) => __awaiter(this, void 0, void 0, function* () {
            msg += "\n";
            var encodedString = unescape(encodeURIComponent(msg));
            var bytes = new Uint8Array(encodedString.length);
            for (var i = 0; i < encodedString.length; ++i)
                bytes[i] = encodedString.charCodeAt(i);
            if (navigator.serial) {
                if (this.port.writable) {
                    const writer = this.port.writable.getWriter();
                    yield writer.write(bytes.buffer);
                    writer.releaseLock();
                }
            }
        });
        // ---------------------- INTERNAL UTILITIES ----------------------
        this.subscribe = (port = this.port) => __awaiter(this, void 0, void 0, function* () {
            if (port.readable && this.subscribed === true) {
                this.readable = port.readable; // TODO: Readable data handled externally
                // Internal Management of the Stream
                console.error('Managing the readable stream internally');
                let transform = (value) => __awaiter(this, void 0, void 0, function* () {
                    console.log('streaming');
                    if (!this.subscribed)
                        throw Error('Device disconnected');
                    this.onReceive(value);
                    return value;
                });
                const transformer = new TransformStream({ transform });
                this.readable
                    .pipeThrough(transformer)
                    .pipeTo(new WritableStream({}))
                    .then(() => console.log("All data successfully written!"))
                    .catch(e => this.handleError(e));
                return true;
            }
            else
                return false;
        });
        this.handleError = (error) => __awaiter(this, void 0, void 0, function* () {
            console.log(error); // TODO: Handle non-fatal read error.
            if (error.message.includes('framing') || error.message.includes('overflow') || error.message.includes('overrun') || error.message.includes('Overflow') || error.message.includes('break')) {
                this.subscribed = false;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    if (this.readable) {
                        yield this.readable.cancel();
                        this.readable = null;
                    }
                    this.subscribed = true;
                    this.subscribe(this.port);
                    //if that fails then close port and reopen it
                }), 30); //try to resubscribe 
            }
            else if (error.message.includes('parity') || error.message.includes('Parity')) {
                if (this.port) {
                    this.subscribed = false;
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        if (this.readable) {
                            yield this.readable.cancel();
                            this.readable = null;
                        }
                        yield this.port.close();
                        //this.port = null;
                        this.connected = false;
                        setTimeout(() => { this.onPortSelected(this.port); }, 100); //close the port and reopen
                    }), 50);
                }
            }
            else {
                yield this._disconnect();
            }
        });
        this.onPortSelected = (port) => __awaiter(this, void 0, void 0, function* () {
            // Set in Class
            this.port = port;
            // Add Disconnect Callback
            navigator.serial.addEventListener("disconnect", this.disconnect);
            // Check USB or Serial Constraint
            let serialOptions = { baudRate: 115200, bufferSize: 1000 };
            if (typeof this.constraints.serial === 'object')
                Object.assign(serialOptions, this.constraints.serial);
            if (typeof this.constraints.usb === 'object')
                Object.assign(serialOptions, this.constraints.usb);
            // Open the Port
            try {
                yield port.open(serialOptions);
            }
            catch (err) {
                yield port.open(serialOptions);
            }
            this.active = true;
            this.onconnect(this);
            this.connected = true;
            this.subscribed = true;
            // Subscribe to Port Data
            yield this.subscribe(port);
        });
        this.onReceive = (input) => {
            this.encodedBuffer += this.decoder.decode(input);
            var index;
            while ((index = this.encodedBuffer.indexOf('\n')) >= 0) {
                var line = this.encodedBuffer.substr(0, index + 1);
                if (this.recordData == true) {
                    this.recorded.push(line);
                }
                if (this.monitoring = true) {
                    this.newSamples++;
                    this.monitorData.push(line);
                }
                this.ondata(line);
                this.encodedBuffer = this.encodedBuffer.substr(index + 1);
            }
        };
        this._disconnect = () => __awaiter(this, void 0, void 0, function* () {
            this.closePort();
        });
        this.closePort = (port = this.port) => __awaiter(this, void 0, void 0, function* () {
            if (this.port) {
                this.subscribed = false;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log('clsing', this.readable);
                        if (this.readable) {
                            yield this.readable.cancel();
                            this.readable = null;
                        }
                        yield port.close();
                        //this.port = null;
                        this.connected = false;
                    }
                    catch (err) {
                        console.error(err);
                    }
                }), 50);
            }
        });
        if (navigator.serial)
            this.decoder = new TextDecoder();
        else {
            console.log("ERROR: Cannot locate navigator.serial. Enable #experimental-web-platform-features in chrome://flags");
            alert("Serial support not found. Enable #experimental-web-platform-features in chrome://flags or use a chrome extension");
        }
    }
}

class DataTrackSupportedConstraints {
    constructor(stream) {
        console.log('Logic not implemented', stream);
    }
}

const safeParse = (input) => {
    if (typeof input === 'string')
        input = JSON.parse(input);
    if (typeof input === 'object') {
        // Convert Stringified Functions to String
        for (let key in input) {
            let value = input[key];
            let regex = new RegExp('(|[a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\))\s*=>');
            let func = (typeof value === 'string') ? value.substring(0, 8) == 'function' : false;
            let arrow = (typeof value === 'string') ? regex.test(value) : false;
            try {
                input[key] = (func || arrow) ? new Function(value) : value;
                // REMOVE EVAL FOR ROLLUP
                // input[key] = (func || arrow) ? eval('(' + value + ')') : value;
            }
            catch (e) {
                input[key] = value;
            }
            if (typeof input[key] === 'object')
                safeParse(input[key]);
        }
        return input;
    }
    else
        return {};
};
const safeStringify = (input) => {
    // Stringify Functions
    for (let key in input) {
        if (input[key] instanceof Function)
            input[key] = input[key].toString();
        if (input[key] instanceof Object)
            safeStringify(input[key]);
    }
    // Actually Stringify
    return JSON.stringify(input);
};

class Websocket {
    constructor(url = 'http://localhost', protocols) {
        this.sendBuffer = [];
        this.callbacks = new Map();
        this.ready = false;
        this._onopen = () => {
            this.ready = true;
            this.sendBuffer.forEach(msg => {
                if (this.ws)
                    this.ws.send(msg);
            });
            this.onopen();
        };
        this._onclose = () => {
            this.ready = false;
            this.onclose();
        };
        this._onerror = (e) => {
            console.error(e);
            this.onerror(e);
            return e;
        };
        this._onmessage = (res) => {
            try {
                let parsed = safeParse(res.data);
                if (parsed.error)
                    console.error(parsed.error);
                else {
                    let callbackId = parsed.callbackId;
                    let data = parsed;
                    // Run Callback
                    if (callbackId) {
                        data = data.data;
                        let callback = this.callbacks.get(callbackId);
                        if (callback)
                            callback(data);
                    }
                    // Parse Stripped Data Message
                    if (data)
                        this.onmessage(data);
                }
            }
            catch (e) {
                console.error('Error parsing WebSocket message from server: ', res.data, e);
            }
        };
        this.onopen = () => { };
        this.onclose = () => { };
        this.onerror = () => { };
        this.onmessage = () => { };
        this.addEventListener = (name, callback) => {
            if (this.ws) {
                if (name === 'message')
                    this.ws.addEventListener(name, (res) => { callback(JSON.parse(res.data)); }); // parse messages
                else
                    this.ws.addEventListener(name, callback); // otherwise pass raw response
            }
        };
        this.close = () => {
            if (this.ws)
                this.ws.close();
        };
        this.send = (data, service = 'websocket') => {
            return new Promise(resolve => {
                // Allow Awaiting WebSocket Calls
                let callbackId = randomUUID();
                let callback = (data) => {
                    resolve(data);
                    this.callbacks.delete(callbackId);
                };
                this.callbacks.set(callbackId, callback);
                // Create Message with Proper Stringification
                let o = { data, callbackId, service };
                let msg = safeStringify(o);
                if (this.ready && this.ws) {
                    // Actually Send
                    this.ws.send(msg);
                }
                else
                    this.sendBuffer.push(msg);
            });
        };
        this.url = url;
        let urlObj = new URL(url);
        const toPass = [];
        Object.keys(protocols).forEach((str) => {
            toPass.push(`${str}.brainsatplay.com%${protocols[str]}`);
        });
        console.log(toPass);
        if (urlObj.protocol === 'http:')
            this.ws = new WebSocket(`ws://` + urlObj.host, toPass.join(';'));
        else if (urlObj.protocol === 'https:')
            this.ws = new WebSocket(`wss://` + urlObj.host, toPass.join(';'));
        else {
            console.log('invalid protocol');
            return;
        }
        this.sendBuffer = [];
        this.callbacks = new Map();
        this.ws.onopen = this._onopen;
        this.ws.onerror = this._onerror;
        this.ws.onmessage = this._onmessage;
        this.ws.onclose = this._onclose;
        globalThis.onunload = globalThis.onbeforeunload = () => {
            if (this.ws)
                this.ws.onclose = () => { };
            console.log('C:OSING');
            this.close();
        };
    }
}

class WebSocketDevice extends Device {
    constructor(constraints) {
        super(constraints); // Auto-selects first constraint in an array
        this._connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.socket || this.socket.url != this.constraints.url) {
                this.socket = new Websocket(this.constraints.url, { services: ['websocket'] });
                this.socket.onmessage = (msg) => {
                    if (msg.service === 'websocket')
                        this.ondata(msg.data, msg === null || msg === void 0 ? void 0 : msg.timestamp);
                };
            }
        });
        this._disconnect = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
        });
        this.send = (msg) => __awaiter(this, void 0, void 0, function* () { var _b; return (_b = this.socket) === null || _b === void 0 ? void 0 : _b.send(msg); });
    }
}

/*

The DataDevice interface provides access to connected data hardware like EEGs.
In essence, it lets you obtain access to any hardware source of data.

Based on https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API

*/
/**
 * The DataDevices interface provides access to data sources like webcams, microphones, and BLE / USB devices.
 * ```typescript
 * import { DataDevices } from "datastreams-api";
 *
 * const dataDevices = new DataDevices();
 * ```
 */
class DataDevices extends EventTarget {
    constructor() {
        super();
        this.devices = [];
        // // trigger devicechange event
        // _devicechanged = () => {
        //     this.dispatchEvent(new Event('devicechange'))
        // }
        this.load = (devices) => {
            if (Array.isArray(devices))
                this.devices.push(...devices);
            else if (!!devices)
                this.devices.push(devices);
        };
        this.enumerateDevices = () => __awaiter(this, void 0, void 0, function* () {
            // Get Previously Connected Devices from navigator.usb.requestDevice({filters:[]})
            let usb = yield navigator.usb.getDevices();
            // Get Previously Connected Devices from navigator.serial.requestDevice({filters:[]})
            let serial = yield navigator.serial.getPorts();
            // Get Previously Connected Devices from navigator.bluetooth.requestDevice({acceptAllDevices: true})
            let bluetooth = []; //await navigator.bluetooth.getDevices()
            let media = yield navigator.mediaDevices.enumerateDevices();
            return [...media, ...serial, ...usb, ...bluetooth];
        });
        this.getSupportedDevices = (filter) => __awaiter(this, void 0, void 0, function* () {
            let media = [];
            if (!filter || filter === 'media') {
                media = yield navigator.mediaDevices.enumerateDevices();
            }
            return [...media, ...this.devices];
        });
        this.getDeviceInfo = (constraints) => DataDeviceInfo(constraints);
        this.getSupportedConstraints = () => __awaiter(this, void 0, void 0, function* () {
            return new DataTrackSupportedConstraints(this);
        });
        // Specify Device with Protocol, Label, and Mode (or Pass in the Entire Device Configuration). Allows Boolean or Object Specification.
        // Note: Allows selection by the end-user if the query returns more than one device
        this.getDevice = (constraints, fallback = false) => {
            var _a, _b;
            // Match Device Configuration by Constraints
            let filtered = [...this.devices];
            const protocols = [];
            if (constraints.bluetooth)
                protocols.push('bluetooth');
            if (constraints.usb || constraints.serial)
                protocols.push('usb', 'serial');
            if (constraints.websocket)
                protocols.push('websocket');
            // Protocol Match
            if (protocols.length > 0)
                filtered = filtered.filter(o => {
                    if (o['protocols'])
                        return o['protocols'].find((k) => protocols.includes(k));
                });
            // Label Match
            const label = constraints['label'];
            if (label)
                filtered = filtered.filter(o => label === o.label);
            // Mode Match
            const mode = constraints['mode'];
            if (mode) {
                filtered = filtered.filter(o => {
                    if (o['modes'])
                        return o['modes'].includes(mode);
                });
            }
            if (filtered.length === 0)
                filtered.push(constraints); // Load raw constraints
            const found = filtered === null || filtered === void 0 ? void 0 : filtered[0]; // Jump to Fallback if Stream is Specified OR No Filtered Results
            const customDevice = !!((_a = filtered === null || filtered === void 0 ? void 0 : filtered[0]) === null || _a === void 0 ? void 0 : _a.device); // Jump to Fallback if Stream is Specified OR No Filtered Results
            if (protocols.length === 0)
                protocols.push(...(_b = found === null || found === void 0 ? void 0 : found.protocols) !== null && _b !== void 0 ? _b : []);
            const getGenericDevice = () => {
                return new Device((found) ? filtered.map(o => Object.assign(o, constraints)) : constraints); //Fallback to generic device
            };
            // TODO: Allow users to select from multiple matches
            if (customDevice)
                return getGenericDevice();
            else {
                // Check Protocol and serviceUUID Presence
                if (found && (protocols.includes('bluetooth') && (found === null || found === void 0 ? void 0 : found.serviceUUID)))
                    return new Bluetooth(filtered.map(o => Object.assign(o, constraints)));
                // Check Protocol and usbVendorId / usbProductId Presence
                else if (found && (protocols.includes('usb') || (protocols.includes('serial') && (found === null || found === void 0 ? void 0 : found.usbVendorId) && (found === null || found === void 0 ? void 0 : found.usbProductId))))
                    return new SerialDevice(filtered.map(o => Object.assign(o, constraints)));
                else if (found && protocols.includes('websocket'))
                    return new WebSocketDevice(filtered.map(o => Object.assign(o, constraints)));
                else if (fallback)
                    return getGenericDevice();
            }
            return;
        };
        this.startDataStream = (constraints = {}, stream = new DataStream()) => __awaiter(this, void 0, void 0, function* () {
            let device;
            constraints.stream = stream; // Bind DataStream to the device
            const copy = Object.assign({}, constraints); // Copy
            if (copy.device || (constraints.video || constraints.audio || constraints.screen)) {
                // Wrap in Device Class
                device = new Device(copy);
            }
            else {
                // Option #1: Get device from raw constraints
                device = this.getDevice(copy);
                // Option #2: Infer preferred connection type from device constraints
                if (!device) {
                    let info = DataDeviceInfo(constraints);
                    info.protocols.forEach(str => copy[str] = true);
                    // Option #3: Fallback to generic device if not found
                    device = this.getDevice(copy, true);
                }
            }
            if (device)
                yield device.connect().then(res => res).catch((e) => {
                    console.warn('Device not connected');
                    throw e;
                });
            return device;
        });
        // Pass minimal constraints (e.g. {bluetooth: true}) OR the full device configuration object
        this.getUserDevice = (constraints = {}) => __awaiter(this, void 0, void 0, function* () {
            // delete constraints.audio
            let mediaStream;
            // 1. Use MediaStreams API
            if (constraints.video || constraints.audio)
                mediaStream = yield navigator.mediaDevices.getUserMedia(constraints);
            let stream = new DataStream(mediaStream);
            // 2. Get Screen through MediaStreams API
            if (constraints.screen) {
                let displayStream = yield navigator.mediaDevices.getDisplayMedia({ video: true });
                displayStream.getTracks().forEach(stream.addTrack);
            }
            // 3. Create Device from Contraints and Stream
            const device = yield this.startDataStream(constraints, stream);
            // 4. Apply Constraints
            stream.getTracks().forEach((t) => {
                t.applyConstraints(constraints);
                // let settings = t.getSettings() // TODO: Returns a dictionary currently set values for the constraints
                // console.log(`Track ${i} Settings`,settings)
            });
            return device;
        });
        /* -------- Events --------
            devicechange (to implement): Fired when a biosensing input or output device is attached to or removed from the user's computer.

            this.addEventListener('devicechange', () => {
                console.error('test')
            })
        */
    }
    get [Symbol.toStringTag]() { return 'DataDevices'; }
}

// Ensure Proper Pipeline Format
let pipeline = [];
// Bind Pipeline
let bound = [];
// --------------------------- Pipeline Functions ---------------------------
let addSource = (source, bound) => bound.push(source); // Push source at the beginning
let addSink = (sink, bound) => bound[bound.length - 1].pipeTo(sink);
let addTransform = (o, pipeline, bound // Includes the readable side of a TransformStream 
) => {
    pipeline.push(o);
    bound.push(bound[bound.length - 1].pipeThrough(o));
};
// --------------------------- Pipeline Construction ---------------------------
self.onmessage = (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (e.data.cmd === 'init')
        e.data.data.source.pipeThrough(e.data.data.transformer).pipeTo(e.data.data.sink);
    if (e.data.cmd === 'add')
        addTransform(e.data.data, pipeline, bound);
    if (e.data.cmd === 'source')
        addSource(e.data.data, bound);
    if (e.data.cmd === 'sink')
        addSink(e.data.data, bound);
});
var worker = self;

// import { HardwarePipe } from "./pipes/Hardware.pipe";
class DataPipeline {
    constructor({ thread } = { thread: true }) {
        this.id = randomUUID();
        this.pipeline = [];
        this.bound = [];
        this.source = null;
        this.sink = null;
        this.kind = '';
        this.thread = true;
        this.setSource = (track) => {
            let readable = track.readable;
            this.kind = track.kind; // Guess the kind of stream (and sink...)
            this.source = readable;
            if (this.thread && this.worker)
                this.worker.postMessage({ cmd: 'source', data: this.source }, [this.source]);
            else
                addSource(this.source, this.bound);
        };
        this.setSink = (kind = this.kind) => {
            this.output = new DataStreamTrack();
            if (kind === 'video' || kind === 'audio') {
                if ('MediaStreamTrackGenerator' in window)
                    this.output = new MediaStreamTrackGenerator({ kind: kind });
                else
                    alert('Your browser does not support the experimental MediaStreamTrack API for Insertable Streams of Media');
            }
            this.sink = this.output.writable;
            if (this.thread && this.worker)
                this.worker.postMessage({ cmd: 'sink', data: this.sink }, [this.sink]); // TODO: TypeScript issue working with WritableStreams
            else
                addSink(this.sink, this.bound);
        };
        // TODO: Specify formats acceptable for pipeline creation
        this.add = (settings) => {
            let transformer;
            // Passed TransformStream
            if (settings instanceof TransformStream)
                transformer = settings;
            // Create a new TransformStream
            else {
                let transform;
                // Basic Function Transformation
                if (settings instanceof Function)
                    transform = { transform: (chunk, controller) => __awaiter(this, void 0, void 0, function* () { return controller.enqueue(settings(chunk)); }) };
                // Default Pipe Methods
                else {
                    // switch (settings.method) {
                    //     case 'offload':
                    //         transform = new ServerPipe(settings)
                    //         break;
                    //     case 'embed':
                    //         transform = new HardwarePipe(settings)
                    //         break;
                    //     default:
                    transform = { transform: (chunk, controller) => __awaiter(this, void 0, void 0, function* () { return controller.enqueue(settings.function(chunk)); }) };
                    // break;
                    // }
                }
                transformer = new TransformStream(transform);
            }
            this.pipeline.push(transformer);
            if (this.thread && this.worker) {
                this.pipeline.push(transformer);
                this.worker.postMessage({ cmd: 'add', data: transformer }, [transformer]);
            }
            else
                addTransform(transformer, this.pipeline, this.bound);
        };
        // Set Worker
        this.thread = thread; // NOTE: Complicated transforms may not be able to transferred——and thus interrupt a threaded stream...
        if (this.thread) {
            // Set Worker
            try {
                this.worker = new Worker("./src/pipeline.worker", { name: 'pipelineworker', type: 'module' });
            }
            catch (_a) {
                try {
                    this.worker = worker; // TODO: TypeScript issue working with workers
                }
                catch (err) {
                    console.log("Error creating worker. ERROR:", err);
                }
            }
        }
    }
}

class DataStreamConstraints {
    constructor() {
        this.audio = false;
        this.video = false;
        this.peerIdentity = null;
    }
}

export { DataChannel, DataDeviceInfo, DataDevices, DataPipeline, DataStream, DataStreamConstraints, DataStreamTrack, DataTrackCapabilities, DataTrackConstraints, DataTrackSettings, DataTrackSupportedConstraints };

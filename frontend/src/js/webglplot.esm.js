/**
 * Minified by jsDelivr using Terser v5.10.0.
 * Original file: /gh/danchitnis/webgl-plot@master/dist/webglplot.esm.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
 class ColorRGBA {
    constructor(t, s, e, i) {
        this.r = t, this.g = s, this.b = e, this.a = i
    }
}
class WebglBase {
    constructor() {
        this.scaleX = 1, this.scaleY = 1, this.offsetX = 0, this.offsetY = 0, this.loop = !1, this._vbuffer = 0, this._coord = 0, this.visible = !0, this.intensity = 1, this.xy = new Float32Array([]), this.numPoints = 0, this.color = new ColorRGBA(0, 0, 0, 1), this.webglNumPoints = 0
    }
}
class WebglLine extends WebglBase {
    constructor(t, s) {
        super(), this.currentIndex = 0, this.webglNumPoints = s, this.numPoints = s, this.color = t, this.xy = new Float32Array(2 * this.webglNumPoints)
    }
    setX(t, s) {
        this.xy[2 * t] = s
    }
    setY(t, s) {
        this.xy[2 * t + 1] = s
    }
    getX(t) {
        return this.xy[2 * t]
    }
    getY(t) {
        return this.xy[2 * t + 1]
    }
    lineSpaceX(t, s) {
        for (let e = 0; e < this.numPoints; e++) this.setX(e, t + s * e)
    }
    arrangeX() {
        this.lineSpaceX(-1, 2 / this.numPoints)
    }
    constY(t) {
        for (let s = 0; s < this.numPoints; s++) this.setY(s, t)
    }
    shiftAdd(t) {
        const s = t.length;
        for (let t = 0; t < this.numPoints - s; t++) this.setY(t, this.getY(t + s));
        for (let e = 0; e < s; e++) this.setY(e + this.numPoints - s, t[e])
    }
    addArrayY(t) {
        if (this.currentIndex + t.length <= this.numPoints)
            for (let s = 0; s < t.length; s++) this.setY(this.currentIndex, t[s]), this.currentIndex++
    }
    replaceArrayY(t) {
        if (t.length == this.numPoints)
            for (let s = 0; s < this.numPoints; s++) this.setY(s, t[s])
    }
}
class WebglStep extends WebglBase {
    constructor(t, s) {
        super(), this.webglNumPoints = 2 * s, this.numPoints = s, this.color = t, this.xy = new Float32Array(2 * this.webglNumPoints)
    }
    setY(t, s) {
        this.xy[4 * t + 1] = s, this.xy[4 * t + 3] = s
    }
    getX(t) {
        return this.xy[4 * t]
    }
    getY(t) {
        return this.xy[4 * t + 1]
    }
    lineSpaceX(t, s) {
        for (let e = 0; e < this.numPoints; e++) this.xy[4 * e] = t + e * s, this.xy[4 * e + 2] = t + (e * s + s)
    }
    constY(t) {
        for (let s = 0; s < this.numPoints; s++) this.setY(s, t)
    }
    shiftAdd(t) {
        const s = t.length;
        for (let t = 0; t < this.numPoints - s; t++) this.setY(t, this.getY(t + s));
        for (let e = 0; e < s; e++) this.setY(e + this.numPoints - s, t[e])
    }
}
class WebglPolar extends WebglBase {
    constructor(t, s) {
        super(), this.webglNumPoints = s, this.numPoints = s, this.color = t, this.intenisty = 1, this.xy = new Float32Array(2 * this.webglNumPoints), this._vbuffer = 0, this._coord = 0, this.visible = !0, this.offsetTheta = 0
    }
    setRtheta(t, s, e) {
        const i = e * Math.cos(2 * Math.PI * (s + this.offsetTheta) / 360),
            o = e * Math.sin(2 * Math.PI * (s + this.offsetTheta) / 360);
        this.setX(t, i), this.setY(t, o)
    }
    getTheta(t) {
        return 0
    }
    getR(t) {
        return Math.sqrt(Math.pow(this.getX(t), 2) + Math.pow(this.getY(t), 2))
    }
    setX(t, s) {
        this.xy[2 * t] = s
    }
    setY(t, s) {
        this.xy[2 * t + 1] = s
    }
    getX(t) {
        return this.xy[2 * t]
    }
    getY(t) {
        return this.xy[2 * t + 1]
    }
}
class WebglSquare extends WebglBase {
    constructor(t) {
        super(), this.webglNumPoints = 4, this.numPoints = 4, this.color = t, this.xy = new Float32Array(2 * this.webglNumPoints)
    }
    setSquare(t, s, e, i) {
        this.xy = new Float32Array([t, s, t, i, e, s, e, i])
    }
}
const scaleAndAdd = (t, s, e) => {
        const i = {
            x: 0,
            y: 0
        };
        return i.x = t.x + s.x * e, i.y = t.y + s.y * e, i
    },
    normal = t => set(-t.y, t.x),
    direction = (t, s) => {
        let e = subtract(t, s);
        return e = normalize(e), e
    },
    add = (t, s) => {
        const e = {
            x: 0,
            y: 0
        };
        return e.x = t.x + s.x, e.y = t.y + s.y, e
    },
    dot = (t, s) => t.x * s.x + t.y * s.y,
    normalize = t => {
        const s = {
            x: 0,
            y: 0
        };
        let e = t.x * t.x + t.y * t.y;
        return e > 0 && (e = 1 / Math.sqrt(e), s.x = t.x * e, s.y = t.y * e), s
    },
    set = (t, s) => {
        const e = {
            x: 0,
            y: 0
        };
        return e.x = t, e.y = s, e
    },
    subtract = (t, s) => {
        const e = {
            x: 0,
            y: 0
        };
        return e.x = t.x - s.x, e.y = t.y - s.y, e
    },
    PolyLine = t => {
        let s, e = {
                x: 0,
                y: 0
            },
            i = {
                x: 0,
                y: 0
            };
        const o = [],
            n = (t, s) => {
                o.push({
                    vec2: t,
                    miterLength: s
                })
            },
            r = s => ({
                x: t[2 * s],
                y: t[2 * s + 1]
            });
        e = direction(r(1), r(0)), s = normal(e), n(s, 1);
        const h = t.length / 2;
        for (let t = 1; t < h - 1; t++) {
            const o = r(t - 1),
                h = r(t),
                a = r(t + 1);
            e = direction(h, o), s = normal(e), i = direction(a, h);
            const l = computeMiter(e, i);
            n(l, computeMiterLen(e, l, 1))
        }
        return e = direction(r(h - 1), r(h - 2)), s = normal(e), n(s, 1), o
    },
    computeMiter = (t, s) => {
        let e = add(t, s);
        e = normalize(e);
        return set(-e.y, e.x)
    },
    computeMiterLen = (t, s, e) => {
        const i = set(-t.y, t.x);
        return e / (n = i, (o = s).x * n.x + o.y * n.y);
        var o, n
    };
class WebglThickLine extends WebglBase {
    constructor(t, s, e) {
        super(), this.currentIndex = 0, this._thicknessRequested = 0, this._actualThickness = 0, this.webglNumPoints = 2 * s, this.numPoints = s, this.color = t, this._thicknessRequested = e, this._linePoints = new Float32Array(2 * s), this.xy = new Float32Array(2 * this.webglNumPoints)
    }
    convertToTriPoints() {
        const t = this._actualThickness / 2,
            s = PolyLine(this._linePoints);
        for (let e = 0; e < this.numPoints; e++) {
            const i = {
                    x: this._linePoints[2 * e],
                    y: this._linePoints[2 * e + 1]
                },
                o = scaleAndAdd(i, s[e].vec2, s[e].miterLength * t),
                n = scaleAndAdd(i, s[e].vec2, -s[e].miterLength * t);
            this.xy[4 * e] = o.x, this.xy[4 * e + 1] = o.y, this.xy[4 * e + 2] = n.x, this.xy[4 * e + 3] = n.y
        }
    }
    setX(t, s) {
        this._linePoints[2 * t] = s
    }
    setY(t, s) {
        this._linePoints[2 * t + 1] = s
    }
    lineSpaceX(t, s) {
        for (let e = 0; e < this.numPoints; e++) this.setX(e, t + s * e)
    }
    setThickness(t) {
        this._thicknessRequested = t
    }
    getThickness() {
        return this._thicknessRequested
    }
    setActualThickness(t) {
        this._actualThickness = t
    }
}
class WebglPlot {
    constructor(t, s) {
        this.debug = !1, this.addLine = this.addDataLine, null == s ? this.webgl = t.getContext("webgl", {
            antialias: !0,
            transparent: !1
        }) : (this.webgl = t.getContext("webgl", {
            antialias: s.antialias,
            transparent: s.transparent,
            desynchronized: s.deSync,
            powerPerformance: s.powerPerformance,
            preserveDrawing: s.preserveDrawing
        }), this.debug = null != s.debug && s.debug), this.log("canvas type is: " + t.constructor.name), this.log(`[webgl-plot]:width=${t.width}, height=${t.height}`), this._linesData = [], this._linesAux = [], this._thickLines = [], this._surfaces = [], this.gScaleX = 1, this.gScaleY = 1, this.gXYratio = 1, this.gOffsetX = 0, this.gOffsetY = 0, this.gLog10X = !1, this.gLog10Y = !1, this.webgl.clear(this.webgl.COLOR_BUFFER_BIT), this.webgl.viewport(0, 0, t.width, t.height), this._progLine = this.webgl.createProgram(), this.initThinLineProgram(), this.webgl.enable(this.webgl.BLEND), this.webgl.blendFunc(this.webgl.SRC_ALPHA, this.webgl.ONE_MINUS_SRC_ALPHA)
    }
    get linesData() {
        return this._linesData
    }
    get linesAux() {
        return this._linesAux
    }
    get thickLines() {
        return this._thickLines
    }
    get surfaces() {
        return this._surfaces
    }
    _drawLines(t) {
        const s = this.webgl;
        t.forEach((t => {
            if (t.visible) {
                s.useProgram(this._progLine);
                const e = s.getUniformLocation(this._progLine, "uscale");
                s.uniformMatrix2fv(e, !1, new Float32Array([t.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, t.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
                const i = s.getUniformLocation(this._progLine, "uoffset");
                s.uniform2fv(i, new Float32Array([t.offsetX + this.gOffsetX, t.offsetY + this.gOffsetY]));
                const o = s.getUniformLocation(this._progLine, "is_log");
                s.uniform2iv(o, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
                const n = s.getUniformLocation(this._progLine, "uColor");
                s.uniform4fv(n, [t.color.r, t.color.g, t.color.b, t.color.a]), s.bufferData(s.ARRAY_BUFFER, t.xy, s.STREAM_DRAW), s.drawArrays(t.loop ? s.LINE_LOOP : s.LINE_STRIP, 0, t.webglNumPoints)
            }
        }))
    }
    _drawSurfaces(t) {
        const s = this.webgl;
        t.forEach((t => {
            if (t.visible) {
                s.useProgram(this._progLine);
                const e = s.getUniformLocation(this._progLine, "uscale");
                s.uniformMatrix2fv(e, !1, new Float32Array([t.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, t.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
                const i = s.getUniformLocation(this._progLine, "uoffset");
                s.uniform2fv(i, new Float32Array([t.offsetX + this.gOffsetX, t.offsetY + this.gOffsetY]));
                const o = s.getUniformLocation(this._progLine, "is_log");
                s.uniform2iv(o, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
                const n = s.getUniformLocation(this._progLine, "uColor");
                s.uniform4fv(n, [t.color.r, t.color.g, t.color.b, t.color.a]), s.bufferData(s.ARRAY_BUFFER, t.xy, s.STREAM_DRAW), s.drawArrays(s.TRIANGLE_STRIP, 0, t.webglNumPoints)
            }
        }))
    }
    _drawTriangles(t) {
        const s = this.webgl;
        s.bufferData(s.ARRAY_BUFFER, t.xy, s.STREAM_DRAW), s.useProgram(this._progLine);
        const e = s.getUniformLocation(this._progLine, "uscale");
        s.uniformMatrix2fv(e, !1, new Float32Array([t.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, t.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
        const i = s.getUniformLocation(this._progLine, "uoffset");
        s.uniform2fv(i, new Float32Array([t.offsetX + this.gOffsetX, t.offsetY + this.gOffsetY]));
        const o = s.getUniformLocation(this._progLine, "is_log");
        s.uniform2iv(o, new Int32Array([0, 0]));
        const n = s.getUniformLocation(this._progLine, "uColor");
        s.uniform4fv(n, [t.color.r, t.color.g, t.color.b, t.color.a]), s.drawArrays(s.TRIANGLE_STRIP, 0, t.xy.length / 2)
    }
    _drawThickLines() {
        this._thickLines.forEach((t => {
            if (t.visible) {
                const s = Math.min(this.gScaleX, this.gScaleY);
                t.setActualThickness(t.getThickness() / s), t.convertToTriPoints(), this._drawTriangles(t)
            }
        }))
    }
    update() {
        this.clear(), this.draw()
    }
    draw() {
        this._drawLines(this.linesData), this._drawLines(this.linesAux), this._drawThickLines(), this._drawSurfaces(this.surfaces)
    }
    clear() {
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)
    }
    _addLine(t) {
        t._vbuffer = this.webgl.createBuffer(), this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, t._vbuffer), this.webgl.bufferData(this.webgl.ARRAY_BUFFER, t.xy, this.webgl.STREAM_DRAW), t._coord = this.webgl.getAttribLocation(this._progLine, "coordinates"), this.webgl.vertexAttribPointer(t._coord, 2, this.webgl.FLOAT, !1, 0, 0), this.webgl.enableVertexAttribArray(t._coord)
    }
    addDataLine(t) {
        this._addLine(t), this.linesData.push(t)
    }
    addAuxLine(t) {
        this._addLine(t), this.linesAux.push(t)
    }
    addThickLine(t) {
        this._addLine(t), this._thickLines.push(t)
    }
    addSurface(t) {
        this._addLine(t), this.surfaces.push(t)
    }
    initThinLineProgram() {
        const t = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(t, "\n      attribute vec2 coordinates;\n      uniform mat2 uscale;\n      uniform vec2 uoffset;\n      uniform ivec2 is_log;\n\n      void main(void) {\n         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;\n         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;\n         vec2 line = vec2(x, y);\n         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);\n      }"), this.webgl.compileShader(t);
        const s = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(s, "\n         precision mediump float;\n         uniform highp vec4 uColor;\n         void main(void) {\n            gl_FragColor =  uColor;\n         }"), this.webgl.compileShader(s), this._progLine = this.webgl.createProgram(), this.webgl.attachShader(this._progLine, t), this.webgl.attachShader(this._progLine, s), this.webgl.linkProgram(this._progLine)
    }
    popDataLine() {
        this.linesData.pop()
    }
    removeAllLines() {
        this._linesData = [], this._linesAux = [], this._thickLines = [], this._surfaces = []
    }
    removeDataLines() {
        this._linesData = []
    }
    removeAuxLines() {
        this._linesAux = []
    }
    viewport(t, s, e, i) {
        this.webgl.viewport(t, s, e, i)
    }
    log(t) {
        this.debug && console.log("[webgl-plot]:" + t)
    }
}
export {
    ColorRGBA,
    WebglLine,
    WebglPlot,
    WebglPolar,
    WebglSquare,
    WebglStep,
    WebglThickLine
};
//# sourceMappingURL=/sm/ef8a380a47b7c4b91253a95b77c11adc40dbb3d244cf154a0e653299466f5050.map
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var fili_min = createCommonjsModule(function(module, exports) {
  /**
   * @name    fili
   * @version 2.0.3 | December 13th 2018
   * @author  Florian Markert
   * @license MIT
   */
  !function(r) {
    module.exports = r();
  }(function() {
    return function r(t, e, n) {
      function a(o2, i) {
        if (!e[o2]) {
          if (!t[o2]) {
            var s = typeof commonjsRequire == "function" && commonjsRequire;
            if (!i && s)
              return s(o2, true);
            if (u)
              return u(o2, true);
            var c = new Error("Cannot find module '" + o2 + "'");
            throw c.code = "MODULE_NOT_FOUND", c;
          }
          var f = e[o2] = {exports: {}};
          t[o2][0].call(f.exports, function(r2) {
            var e2 = t[o2][1][r2];
            return a(e2 || r2);
          }, f, f.exports, r, t, e, n);
        }
        return e[o2].exports;
      }
      for (var u = typeof commonjsRequire == "function" && commonjsRequire, o = 0; o < n.length; o++)
        a(n[o]);
      return a;
    }({1: [function(r, t, e) {
      t.exports = {CalcCascades: r("./src/calcCascades"), Fft: r("./src/fft"), FirCoeffs: r("./src/firCoeffs"), FirFilter: r("./src/firFilter"), IirCoeffs: r("./src/iirCoeffs"), IirFilter: r("./src/iirFilter"), TestFilter: r("./src/testFilter")};
    }, {"./src/calcCascades": 2, "./src/fft": 3, "./src/firCoeffs": 4, "./src/firFilter": 5, "./src/iirCoeffs": 6, "./src/iirFilter": 7, "./src/testFilter": 8}], 2: [function(r, t, e) {
      var n = r("./iirCoeffs"), a = new n(), u = {bessel: {q: [[0.57735026919], [0.805538281842, 0.521934581669], [1.02331395383, 0.611194546878, 0.510317824749], [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397], [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276], [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204], [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643], [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482], [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338], [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965], [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042], [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]], f3dB: [[1.27201964951], [1.60335751622, 1.43017155999], [1.9047076123, 1.68916826762, 1.60391912877], [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177], [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166], [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542], [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132], [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687], [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552], [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989], [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588], [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]], f1dB: [[2.16477559371], [2.70320928596, 2.41122332505], [3.25676581436, 2.88822569572, 2.74246238837], [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475], [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508], [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345], [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525], [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119], [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075], [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952], [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403], [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]]}}, o = {bessel: {as: [[1.3617], [1.3397, 0.7743], [1.2217, 0.9686, 0.5131], [1.1112, 0.9754, 0.7202, 0.3728], [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]], bs: [[0.618], [0.4889, 0.389], [0.3887, 0.3505, 0.2756], [0.3162, 0.2979, 0.2621, 0.2087], [0.265, 0.2549, 0.2351, 0.2059, 0.1665]]}, butterworth: {as: [[1.4142], [1.8478, 0.7654], [1.9319, 1.4142, 0.5176], [1.9616, 1.6629, 1.1111, 0.3902], [1.9754, 1.782, 1.4142, 0.908, 0.3129]], bs: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]]}, tschebyscheff05: {as: [[1.3614], [2.6282, 0.3648], [3.8645, 0.7528, 0.1589], [5.1117, 1.0639, 0.3439, 0.0885], [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]], bs: [[1.3827], [3.4341, 1.1509], [6.9797, 1.8573, 1.0711], [11.9607, 2.9365, 1.4206, 1.0407], [18.3695, 4.3453, 1.944, 1.252, 1.0263]]}, tschebyscheff1: {as: [[1.3022], [2.5904, 0.3039], [3.8437, 0.6292, 0.1296], [5.1019, 0.8916, 0.2806, 0.0717], [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]], bs: [[1.5515], [4.1301, 1.1697], [8.5529, 1.9124, 1.0766], [14.7608, 3.0426, 1.4334, 1.0432], [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]]}, tschebyscheff2: {as: [[1.1813], [2.4025, 0.2374], [3.588, 0.4925, 0.0995], [4.7743, 0.6991, 0.2153, 0.0547], [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]], bs: [[1.7775], [4.9862, 1.1896], [10.4648, 1.9622, 1.0826], [18.151, 3.1353, 1.4449, 1.0461], [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]]}, tschebyscheff3: {as: [[1.065], [2.1853, 0.1964], [3.2721, 0.4077, 0.0815], [4.3583, 0.5791, 0.1765, 0.0448], [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]], bs: [[1.9305], [5.5339, 1.2009], [11.6773, 1.9873, 1.0861], [20.2948, 3.1808, 1.4507, 1.0478], [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]]}, allpass: {as: [[1.6278], [2.337, 1.3506], [2.6117, 2.0706, 1.0967], [2.7541, 2.4174, 1.785, 0.9239], [2.8406, 2.612, 2.1733, 1.5583, 0.8018]], bs: [[0.8832], [1.4878, 1.1837], [1.7763, 1.6015, 1.2596], [1.942, 1.83, 1.6101, 1.2822], [2.049, 1.9714, 1.8184, 1.5923, 1.2877]]}}, i = function(r2, t2) {
        var e2 = [], n2 = 0;
        if (t2 !== "fromPZ")
          for (r2.order > 12 && (r2.order = 12), n2 = 0; n2 < r2.order; n2++) {
            var i2, s2, c2;
            r2.transform === "matchedZ" ? e2.push(a.lowpassMZ({Fs: r2.Fs, Fc: r2.Fc, preGain: r2.preGain, as: o[r2.characteristic].as[r2.order - 1][n2], bs: o[r2.characteristic].bs[r2.order - 1][n2]})) : (r2.characteristic === "butterworth" ? (i2 = 0.5 / Math.sin(Math.PI / (2 * r2.order) * (n2 + 0.5)), s2 = 1) : (i2 = u[r2.characteristic].q[r2.order - 1][n2], s2 = r2.oneDb ? u[r2.characteristic].f1dB[r2.order - 1][n2] : u[r2.characteristic].f3dB[r2.order - 1][n2]), c2 = t2 === "highpass" ? r2.Fc / s2 : r2.Fc * s2, t2 !== "bandpass" && t2 !== "bandstop" || r2.characteristic === "bessel" && (c2 = Math.sqrt(r2.order) * c2 / r2.order), e2.push(a[t2]({Fs: r2.Fs, Fc: c2, Q: i2, BW: r2.BW || 0, gain: r2.gain || 0, preGain: r2.preGain || false})));
          }
        else
          for (n2 = 0; n2 < r2.length; n2++)
            e2.push(a[t2](r2[n2]));
        return e2;
      }, s = function(r2) {
        return function(t2) {
          return i(t2, r2);
        };
      }, c = {}, f = function() {
        var r2 = [];
        for (var t2 in a)
          c[t2] = s(t2), r2.push(t2);
        return c.available = function() {
          return r2;
        }, c;
      };
      t.exports = f;
    }, {"./iirCoeffs": 6}], 3: [function(r, t, e) {
      var n = function(r2) {
        if (!function(r3) {
          return !(r3 & r3 - 1);
        }(r2))
          return false;
        var t2 = {};
        t2.length = r2, t2.buffer = new Float64Array(r2), t2.re = new Float64Array(r2), t2.im = new Float64Array(r2), t2.reI = new Float64Array(r2), t2.imI = new Float64Array(r2), t2.twiddle = new Int32Array(r2), t2.sinTable = new Float64Array(r2 - 1), t2.cosTable = new Float64Array(r2 - 1);
        var e2 = 2 * Math.PI, n2 = Math.floor(Math.log(r2) / Math.LN2);
        for (u = t2.sinTable.length; u--; )
          t2.sinTable[u] = Math.sin(e2 * (u / r2)), t2.cosTable[u] = Math.cos(e2 * (u / r2));
        for (var a = r2 >> 1, u = 0, o = 0; t2.twiddle[u] = o, !(++u >= r2); ) {
          for (n2 = a; n2 <= o; )
            o -= n2, n2 >>= 1;
          o += n2;
        }
        var i = Math.PI, s = 2 * Math.PI, c = Math.abs, f = Math.pow, l = Math.cos, h = Math.sin, p = function(r3) {
          return h(i * r3) / (i * r3);
        }, v = Math.E, b = {rectangular: {calc: function() {
          return 1;
        }, values: [], correction: 1}, none: {calc: function() {
          return 1;
        }, values: [], correction: 1}, hanning: {calc: function(r3, t3) {
          return 0.5 * (1 - l(s * r3 / (t3 - 1)));
        }, values: [], correction: 2}, hamming: {calc: function(r3, t3) {
          return 0.54 - 0.46 * l(s * r3 / (t3 - 1));
        }, values: [], correction: 1.8518999946875638}, tukery: {calc: function(r3, t3, e3) {
          return r3 < e3 * (t3 - 1) / 2 ? 0.5 * (1 + l(i * (2 * r3 / (e3 * (t3 - 1)) - 1))) : (t3 - 1) * (1 - e3 / 2) < r3 ? 0.5 * (1 + l(i * (2 * r3 / (e3 * (t3 - 1)) - 2 / e3 + 1))) : 1;
        }, values: [], correction: 4 / 3}, cosine: {calc: function(r3, t3) {
          return h(i * r3 / (t3 - 1));
        }, values: [], correction: 1.570844266360796}, lanczos: {calc: function(r3, t3) {
          return p(2 * r3 / (t3 - 1) - 1);
        }, values: [], correction: 1.6964337576195783}, triangular: {calc: function(r3, t3) {
          return 2 / (t3 + 1) * ((t3 + 1) / 2 - c(r3 - (t3 - 1) / 2));
        }, values: [], correction: 2}, bartlett: {calc: function(r3, t3) {
          return 2 / (t3 - 1) * ((t3 - 1) / 2 - c(r3 - (t3 - 1) / 2));
        }, values: [], correction: 2}, gaussian: {calc: function(r3, t3, e3) {
          return f(v, -0.5 * f((r3 - (t3 - 1) / 2) / (e3 * (t3 - 1) / 2), 2));
        }, values: [], correction: 5 / 3}, bartlettHanning: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.62 - 0.48 * c(r3 / (t3 - 1) - 0.5) - 0.38 * l(e3);
        }, values: [], correction: 2}, blackman: {calc: function(r3, t3, e3) {
          var n3 = (1 - e3) / 2, a2 = e3 / 2, u2 = s * r3 / (t3 - 1);
          return n3 - 0.5 * l(u2) + a2 * l(2 * u2);
        }, values: [], correction: 4 / 3}, blackmanHarris: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.35875 - 0.48829 * l(e3) + 0.14128 * l(2 * e3) - 0.01168 * l(3 * e3);
        }, values: [], correction: 1.5594508635}, nuttall3: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.375 - 0.5 * l(e3) + 0.125 * l(2 * e3);
        }, values: [], correction: 1.56}, nuttall3a: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.40897 - 0.5 * l(e3) + 0.09103 * l(2 * e3);
        }, values: [], correction: 1.692}, nuttall3b: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.4243801 - 0.4973406 * l(e3) + 0.078793 * l(2 * e3);
        }, values: [], correction: 1.7372527}, nuttall4: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.3125 - 0.46875 * l(e3) + 0.1875 * l(2 * e3) - 0.03125 * l(3 * e3);
        }, values: [], correction: 1.454543}, nuttall4a: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.338946 - 0.481973 * l(e3) + 0.161054 * l(2 * e3) - 0.018027 * l(3 * e3);
        }, values: [], correction: 1.512732763}, nuttall4b: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.355768 - 0.481973 * l(e3) + 0.144232 * l(2 * e3) - 0.012604 * l(3 * e3);
        }, values: [], correction: 1.55223262}, nuttall4c: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.3635819 - 0.4891775 * l(e3) + 0.1365995 * l(2 * e3) - 0.0106411 * l(3 * e3);
        }, values: [], correction: 1.57129067}, sft3f: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.26526 - 0.5 * l(e3) + 0.23474 * l(2 * e3);
        }, values: [], correction: 1.3610238}, sft4f: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.21706 - 0.42103 * l(e3) + 0.28294 * l(2 * e3) - 0.07897 * l(3 * e3);
        }, values: [], correction: 1.2773573}, sft5f: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.1881 - 0.36923 * l(e3) + 0.28702 * l(2 * e3) - 0.13077 * l(3 * e3) + 0.02488 * l(4 * e3);
        }, values: [], correction: 1.23167769}, sft3m: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.28235 - 0.52105 * l(e3) + 0.19659 * l(2 * e3);
        }, values: [], correction: 1.39343451}, sft4m: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.241906 - 0.460841 * l(e3) + 0.2552381 * l(2 * e3) - 0.041872 * l(3 * e3);
        }, values: [], correction: 1.3190596}, sft5m: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.209671 - 0.407331 * l(e3) + 0.281225 * l(2 * e3) - 0.092669 * l(3 * e3) + 91036e-7 * l(4 * e3);
        }, values: [], correction: 1.26529456464}, nift: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return 0.2810639 - 0.5208972 * l(e3) + 0.1980399 * l(2 * e3);
        }, values: [], correction: 1.39094182}, hpft: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.912510941 * l(e3) + 1.079173272 * l(2 * e3) - 0.1832630879 * l(3 * e3)) / t3;
        }, values: [], correction: 1}, srft: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.93 * l(e3) + 1.29 * l(2 * e3) - 0.388 * l(3 * e3) + 0.028 * l(4 * e3)) / t3;
        }, values: [], correction: 1}, hft70: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.90796 * l(e3) + 1.07349 * l(2 * e3) - 0.18199 * l(3 * e3)) / t3;
        }, values: [], correction: 1}, hft95: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.9383379 * l(e3) + 1.3045202 * l(2 * e3) - 0.402827 * l(3 * e3) + 0.0350665 * l(4 * e3)) / t3;
        }, values: [], correction: 1}, hft90d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.942604 * l(e3) + 1.340318 * l(2 * e3) - 0.440811 * l(3 * e3) + 0.043097 * l(4 * e3)) / t3;
        }, values: [], correction: 1}, hft116d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.9575375 * l(e3) + 1.4780705 * l(2 * e3) - 0.6367431 * l(3 * e3) + 0.1228389 * l(4 * e3) - 66288e-7 * l(5 * e3)) / t3;
        }, values: [], correction: 1}, hft144d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.96760033 * l(e3) + 1.57983607 * l(2 * e3) - 0.81123644 * l(3 * e3) + 0.22583558 * l(4 * e3) - 0.02773848 * l(5 * e3) + 9036e-7 * l(6 * e3)) / t3;
        }, values: [], correction: 1}, hft196d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.97441842 * l(e3) + 1.65409888 * l(2 * e3) - 0.95788186 * l(3 * e3) + 0.3367342 * l(4 * e3) - 0.06364621 * l(5 * e3) + 521942e-8 * l(6 * e3) - 10599e-8 * l(7 * e3)) / t3;
        }, values: [], correction: 1}, hft223d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.98298997309 * l(e3) + 1.75556083063 * l(2 * e3) - 1.19037717712 * l(3 * e3) + 0.56155440797 * l(4 * e3) - 0.17296769663 * l(5 * e3) + 0.03233247087 * l(6 * e3) - 0.00324954578 * l(7 * e3) + 1380104e-10 * l(8 * e3) - 132725e-11 * l(9 * e3)) / t3;
        }, values: [], correction: 1}, hft248d: {calc: function(r3, t3) {
          var e3 = s * r3 / (t3 - 1);
          return (1 - 1.985844164102 * l(e3) + 1.791176438506 * l(2 * e3) - 1.282075284005 * l(3 * e3) + 0.667777530266 * l(4 * e3) - 0.240160796576 * l(5 * e3) + 0.056656381764 * l(6 * e3) - 0.008134974479 * l(7 * e3) + 62454465e-11 * l(8 * e3) - 19808998e-12 * l(9 * e3) + 132974e-12 * l(10 * e3)) / t3;
        }, values: [], correction: 1}}, m = function(r3) {
          return b[r3.name].values.length !== r3.N ? (r3.n === 0 && (b[r3.name].values.length = 0), b[r3.name].values[r3.n] = b[r3.name].correction * b[r3.name].calc(r3.n, r3.N, r3.a), b[r3.name].values[r3.n]) : b[r3.name].values;
        };
        return {forward: function(r3, e3) {
          var n3, a2, u2, o2, i2, s2, c2, f2, l2, h2, p2, v2;
          u2 = t2.buffer.length;
          var b2 = {name: e3, N: u2, a: 0.5, n: 0}, d = m(b2);
          if (typeof d == "number")
            for (n3 = 0; n3 < u2; ++n3)
              b2.n = n3, t2.buffer[n3] = r3[n3] * m(b2);
          else
            for (n3 = 0; n3 < u2; ++n3)
              t2.buffer[n3] = r3[n3] * d[n3];
          for (n3 = u2; n3--; )
            t2.re[n3] = t2.buffer[t2.twiddle[n3]], t2.im[n3] = 0;
          for (o2 = 1; o2 < u2; o2 = i2)
            for (s2 = 0, i2 = o2 + o2, c2 = u2 / i2, a2 = 0; a2 < o2; a2++) {
              for (f2 = t2.cosTable[s2], l2 = t2.sinTable[s2], n3 = a2; n3 < u2; n3 += i2)
                h2 = n3 + o2, p2 = l2 * t2.im[h2] + f2 * t2.re[h2], v2 = f2 * t2.im[h2] - l2 * t2.re[h2], t2.re[h2] = t2.re[n3] - p2, t2.re[n3] += p2, t2.im[h2] = t2.im[n3] - v2, t2.im[n3] += v2;
              s2 += c2;
            }
          return {re: t2.re, im: t2.im};
        }, inverse: function(r3, e3) {
          var n3, a2, u2, o2, i2, s2, c2, f2, l2, h2, p2, v2;
          for (u2 = r3.length, n3 = u2; n3--; )
            a2 = t2.twiddle[n3], t2.reI[n3] = r3[a2], t2.imI[n3] = -e3[a2];
          for (o2 = 1; o2 < u2; o2 = i2)
            for (s2 = 0, i2 = o2 + o2, c2 = u2 / i2, a2 = 0; a2 < o2; a2++) {
              for (f2 = t2.cosTable[s2], l2 = t2.sinTable[s2], n3 = a2; n3 < u2; n3 += i2)
                h2 = n3 + o2, p2 = l2 * t2.imI[h2] + f2 * t2.reI[h2], v2 = f2 * t2.imI[h2] - l2 * t2.reI[h2], t2.reI[h2] = t2.reI[n3] - p2, t2.reI[n3] += p2, t2.imI[h2] = t2.imI[n3] - v2, t2.imI[n3] += v2;
              s2 += c2;
            }
          for (n3 = u2; n3--; )
            t2.buffer[n3] = t2.reI[n3] / u2;
          return t2.buffer;
        }, magnitude: function(r3) {
          for (var t3 = [], e3 = 0; e3 < r3.re.length; e3++)
            t3.push(Math.sqrt(r3.re[e3] * r3.re[e3] + r3.im[e3] * r3.im[e3]));
          return t3;
        }, magToDb: function(r3) {
          for (var t3 = [], e3 = 0; e3 < r3.length; e3++)
            t3.push(20 * Math.log(r3[e3]) * Math.LOG10E);
          return t3;
        }, phase: function(r3) {
          for (var t3 = [], e3 = 0; e3 < r3.re.length; e3++)
            t3.push(Math.atan2(r3.im[e3], r3.re[e3]));
          return t3;
        }, windows: function() {
          var r3 = [];
          for (var t3 in b)
            r3.push(t3);
          return r3;
        }};
      };
      t.exports = n;
    }, {}], 4: [function(r, t, e) {
      var n = function() {
        var r2 = function(r3) {
          var t3 = r3.Fs, e3 = r3.Fa, n3 = r3.Fb, a = r3.order || 51, u = r3.Att || 100, o = function(r4) {
            for (var t4 = 0, e4 = 1, n4 = 1; e4 > 1e-6 * n4; )
              t4 += 2, e4 *= r4 * r4 / (t4 * t4), n4 += e4;
            return n4;
          };
          a / 2 - Math.floor(a / 2) == 0 && a++;
          var i, s = (a - 1) / 2, c = [], f = 0, l = 0, h = [];
          for (c[0] = 2 * (n3 - e3) / t3, l = 1; l <= s; l++)
            c[l] = (Math.sin(2 * l * Math.PI * n3 / t3) - Math.sin(2 * l * Math.PI * e3 / t3)) / (l * Math.PI);
          for (f = u < 21 ? 0 : u > 50 ? 0.1102 * (u - 8.7) : 0.5842 * Math.pow(u - 21, 0.4) + 0.07886 * (u - 21), i = o(f), l = 0; l <= s; l++)
            h[s + l] = c[l] * o(f * Math.sqrt(1 - l * l / (s * s))) / i;
          for (l = 0; l < s; l++)
            h[l] = h[a - 1 - l];
          return h;
        }, t2 = function(r3) {
          var t3 = r3.Fs, e3 = r3.Fc, n3 = r3.order, a = 2 * Math.PI * e3 / t3, u = 0, o = 0, i = [];
          for (u = 0; u <= n3; u++)
            u - n3 / 2 == 0 ? i[u] = a : (i[u] = Math.sin(a * (u - n3 / 2)) / (u - n3 / 2), i[u] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * u / n3)), o += i[u];
          for (u = 0; u <= n3; u++)
            i[u] /= o;
          return i;
        }, e2 = function(r3) {
          var t3;
          for (t3 = 0; t3 < r3.length; t3++)
            r3[t3] = -r3[t3];
          return r3[(r3.length - 1) / 2]++, r3;
        }, n2 = function(r3) {
          for (var n3 = t2({order: r3.order, Fs: r3.Fs, Fc: r3.F2}), a = e2(t2({order: r3.order, Fs: r3.Fs, Fc: r3.F1})), u = [], o = 0; o < n3.length; o++)
            u.push(n3[o] + a[o]);
          return u;
        };
        return {lowpass: function(r3) {
          return t2(r3);
        }, highpass: function(r3) {
          return e2(t2(r3));
        }, bandstop: function(r3) {
          return n2(r3);
        }, bandpass: function(r3) {
          return e2(n2(r3));
        }, kbFilter: function(t3) {
          return r2(t3);
        }, available: function() {
          return ["lowpass", "highpass", "bandstop", "bandpass", "kbFilter"];
        }};
      };
      t.exports = n;
    }, {}], 5: [function(r, t, e) {
      var n = r("./utils"), a = n.runMultiFilter, u = n.runMultiFilterReverse, o = n.complex, i = n.evaluatePhase, s = function(r2) {
        var t2 = r2, e2 = [], n2 = 0;
        for (n2 = 0; n2 < t2.length; n2++)
          e2[n2] = {re: t2[n2], im: 0};
        var s2 = function(r3) {
          var t3, e3 = [];
          for (t3 = 0; t3 < r3; t3++)
            e3.push(0);
          return {buf: e3, pointer: 0};
        }, c = s2(t2.length - 1), f = function(r3, e3) {
          e3.buf[e3.pointer] = r3;
          var a2 = 0;
          for (n2 = 0; n2 < e3.buf.length; n2++)
            a2 += t2[n2] * e3.buf[(e3.pointer + n2) % e3.buf.length];
          return e3.pointer = (e3.pointer + 1) % e3.buf.length, a2;
        }, l = function(r3) {
          var e3 = s2(t2.length - 1);
          return a(r3, e3, f);
        }, h = function(r3) {
          for (var n3 = r3.Fs, a2 = r3.Fr, u2 = -Math.PI * (a2 / n3) * 2, i2 = {re: 0, im: 0}, s3 = 0; s3 < t2.length - 1; s3++)
            i2 = o.add(i2, o.mul(e2[s3], {re: Math.cos(u2 * s3), im: Math.sin(u2 * s3)}));
          var c2 = o.magnitude(i2);
          return {magnitude: c2, phase: o.phase(i2), dBmagnitude: 20 * Math.log(c2) * Math.LOG10E};
        };
        return {responsePoint: function(r3) {
          return h(r3);
        }, response: function(r3) {
          r3 = r3 || 100;
          var t3 = [], e3 = 0, n3 = 2 * r3;
          for (e3 = 0; e3 < r3; e3++)
            t3[e3] = h({Fs: n3, Fr: e3});
          return i(t3), t3;
        }, simulate: function(r3) {
          return l(r3);
        }, singleStep: function(r3) {
          return f(r3, c);
        }, multiStep: function(r3, t3) {
          return a(r3, c, f, t3);
        }, filtfilt: function(r3, t3) {
          return u(a(r3, c, f, t3), c, f, true);
        }, reinit: function() {
          c = s2(t2.length - 1);
        }};
      };
      t.exports = s;
    }, {"./utils": 9}], 6: [function(r, t, e) {
      var n = function() {
        var r2 = function(r3, t3) {
          var e3 = r3.Q, n2 = r3.Fc, a = r3.Fs, u = {}, o = 2 * Math.PI * n2 / a;
          return r3.BW ? u.alpha = Math.sin(o) * Math.sinh(Math.log(2) / 2 * r3.BW * o / Math.sin(o)) : u.alpha = Math.sin(o) / (2 * e3), u.cw = Math.cos(o), u.a0 = 1 + u.alpha, t3.a0 = u.a0, t3.a.push(-2 * u.cw / u.a0), t3.k = 1, t3.a.push((1 - u.alpha) / u.a0), u;
        }, t2 = function(r3) {
          var t3 = r3.Q, e3 = r3.Fc, n2 = r3.Fs, a = {}, u = 2 * Math.PI * e3 / n2;
          return a.alpha = Math.sin(u) / (2 * t3), a.cw = Math.cos(u), a.A = Math.pow(10, r3.gain / 40), a;
        }, e2 = function() {
          var r3 = {};
          return r3.z = [0, 0], r3.a = [], r3.b = [], r3;
        };
        return {fromPZ: function(r3) {
          var t3 = e2();
          return t3.a0 = 1, t3.b.push(1), t3.b.push(-r3.z0.re - r3.z1.re), t3.b.push(r3.z0.re * r3.z1.re - r3.z0.im * r3.z1.im), t3.a.push(-r3.p0.re - r3.p1.re), t3.a.push(r3.p0.re * r3.p1.re - r3.p0.im * r3.p1.im), r3.type === "lowpass" ? t3.k = (1 + t3.a[0] + t3.a[1]) / (1 + t3.b[1] + t3.b[2]) : t3.k = (1 - t3.a[0] + t3.a[1]) / (1 - t3.b[1] + t3.b[2]), t3;
        }, lowpassMZ: function(r3) {
          var t3 = e2();
          t3.a0 = 1;
          var n2 = r3.as, a = r3.bs, u = 2 * Math.PI * r3.Fc / r3.Fs, o = -n2 / (2 * a);
          return t3.a.push(2 * -Math.pow(Math.E, o * u) * Math.cos(-u * Math.sqrt(Math.abs(Math.pow(n2, 2) / (4 * Math.pow(a, 2)) - 1 / a)))), t3.a.push(Math.pow(Math.E, 2 * o * u)), r3.preGain ? (t3.b.push(1), t3.k = t3.a0 + t3.a[0] + t3.a[1]) : (t3.b.push(t3.a0 + t3.a[0] + t3.a[1]), t3.k = 1), t3.b.push(0), t3.b.push(0), t3;
        }, lowpassBT: function(r3) {
          var t3 = e2();
          return r3.Q = 1, t3.wp = Math.tan(2 * Math.PI * r3.Fc / (2 * r3.Fs)), t3.wp2 = t3.wp * t3.wp, r3.BW && delete r3.BW, t3.k = 1, t3.a0 = 3 * t3.wp + 3 * t3.wp2 + 1, t3.b.push(3 * t3.wp2 * r3.Q / t3.a0), t3.b.push(2 * t3.b[0]), t3.b.push(t3.b[0]), t3.a.push((6 * t3.wp2 - 2) / t3.a0), t3.a.push((3 * t3.wp2 - 3 * t3.wp + 1) / t3.a0), t3;
        }, highpassBT: function(r3) {
          var t3 = e2();
          return r3.Q = 1, t3.wp = Math.tan(2 * Math.PI * r3.Fc / (2 * r3.Fs)), t3.wp2 = t3.wp * t3.wp, r3.BW && delete r3.BW, t3.k = 1, t3.a0 = t3.wp + t3.wp2 + 3, t3.b.push(3 * r3.Q / t3.a0), t3.b.push(2 * t3.b[0]), t3.b.push(t3.b[0]), t3.a.push((2 * t3.wp2 - 6) / t3.a0), t3.a.push((t3.wp2 - t3.wp + 3) / t3.a0), t3;
        }, lowpass: function(t3) {
          var n2 = e2();
          t3.BW && delete t3.BW;
          var a = r2(t3, n2);
          return t3.preGain ? (n2.k = 0.5 * (1 - a.cw), n2.b.push(1 / a.a0)) : (n2.k = 1, n2.b.push((1 - a.cw) / (2 * a.a0))), n2.b.push(2 * n2.b[0]), n2.b.push(n2.b[0]), n2;
        }, highpass: function(t3) {
          var n2 = e2();
          t3.BW && delete t3.BW;
          var a = r2(t3, n2);
          return t3.preGain ? (n2.k = 0.5 * (1 + a.cw), n2.b.push(1 / a.a0)) : (n2.k = 1, n2.b.push((1 + a.cw) / (2 * a.a0))), n2.b.push(-2 * n2.b[0]), n2.b.push(n2.b[0]), n2;
        }, allpass: function(t3) {
          var n2 = e2();
          t3.BW && delete t3.BW;
          var a = r2(t3, n2);
          return n2.k = 1, n2.b.push((1 - a.alpha) / a.a0), n2.b.push(-2 * a.cw / a.a0), n2.b.push((1 + a.alpha) / a.a0), n2;
        }, bandpassQ: function(t3) {
          var n2 = e2(), a = r2(t3, n2);
          return n2.k = 1, n2.b.push(a.alpha * t3.Q / a.a0), n2.b.push(0), n2.b.push(-n2.b[0]), n2;
        }, bandpass: function(t3) {
          var n2 = e2(), a = r2(t3, n2);
          return n2.k = 1, n2.b.push(a.alpha / a.a0), n2.b.push(0), n2.b.push(-n2.b[0]), n2;
        }, bandstop: function(t3) {
          var n2 = e2(), a = r2(t3, n2);
          return n2.k = 1, n2.b.push(1 / a.a0), n2.b.push(-2 * a.cw / a.a0), n2.b.push(n2.b[0]), n2;
        }, peak: function(r3) {
          var n2 = e2(), a = t2(r3);
          return n2.k = 1, n2.a0 = 1 + a.alpha / a.A, n2.a.push(-2 * a.cw / n2.a0), n2.a.push((1 - a.alpha / a.A) / n2.a0), n2.b.push((1 + a.alpha * a.A) / n2.a0), n2.b.push(-2 * a.cw / n2.a0), n2.b.push((1 - a.alpha * a.A) / n2.a0), n2;
        }, lowshelf: function(r3) {
          var n2 = e2();
          r3.BW && delete r3.BW;
          var a = t2(r3);
          n2.k = 1;
          var u = 2 * Math.sqrt(a.A) * a.alpha;
          return n2.a0 = a.A + 1 + (a.A - 1) * a.cw + u, n2.a.push(-2 * (a.A - 1 + (a.A + 1) * a.cw) / n2.a0), n2.a.push((a.A + 1 + (a.A - 1) * a.cw - u) / n2.a0), n2.b.push(a.A * (a.A + 1 - (a.A - 1) * a.cw + u) / n2.a0), n2.b.push(2 * a.A * (a.A - 1 - (a.A + 1) * a.cw) / n2.a0), n2.b.push(a.A * (a.A + 1 - (a.A - 1) * a.cw - u) / n2.a0), n2;
        }, highshelf: function(r3) {
          var n2 = e2();
          r3.BW && delete r3.BW;
          var a = t2(r3);
          n2.k = 1;
          var u = 2 * Math.sqrt(a.A) * a.alpha;
          return n2.a0 = a.A + 1 - (a.A - 1) * a.cw + u, n2.a.push(2 * (a.A - 1 - (a.A + 1) * a.cw) / n2.a0), n2.a.push((a.A + 1 - (a.A - 1) * a.cw - u) / n2.a0), n2.b.push(a.A * (a.A + 1 + (a.A - 1) * a.cw + u) / n2.a0), n2.b.push(-2 * a.A * (a.A - 1 + (a.A + 1) * a.cw) / n2.a0), n2.b.push(a.A * (a.A + 1 + (a.A - 1) * a.cw - u) / n2.a0), n2;
        }, aweighting: function(r3) {
          var t3 = e2();
          t3.k = 1;
          var n2 = 2 * Math.PI * r3.Fc / r3.Fs, a = 2 * Math.tan(n2 / 2), u = r3.Q, o = Math.pow(a, 2);
          return t3.a0 = 4 * u + o * u + 2 * a, t3.a.push(2 * o * u - 8 * u), t3.a.push(4 * u + o * u - 2 * a), t3.b.push(o * u), t3.b.push(2 * o * u), t3.b.push(o * u), t3;
        }};
      };
      t.exports = n;
    }, {}], 7: [function(r, t, e) {
      var n = r("./utils"), a = n.complex, u = n.runMultiFilter, o = n.runMultiFilterReverse, i = n.evaluatePhase, s = function(r2) {
        for (var t2 = r2, e2 = {re: 1, im: 0}, n2 = [], s2 = [], c = 0; c < t2.length; c++) {
          n2[c] = {};
          var f = t2[c];
          n2[c].b0 = {re: f.b[0], im: 0}, n2[c].b1 = {re: f.b[1], im: 0}, n2[c].b2 = {re: f.b[2], im: 0}, n2[c].a1 = {re: f.a[0], im: 0}, n2[c].a2 = {re: f.a[1], im: 0}, n2[c].k = {re: f.k, im: 0}, n2[c].z = [0, 0], s2[c] = {}, s2[c].b1 = f.b[1] / f.b[0], s2[c].b2 = f.b[2] / f.b[0], s2[c].a1 = f.a[0], s2[c].a2 = f.a[1];
        }
        var l = function(r3, t3) {
          var e3 = t3 * r3.k.re - r3.a1.re * r3.z[0] - r3.a2.re * r3.z[1], n3 = r3.b0.re * e3 + r3.b1.re * r3.z[0] + r3.b2.re * r3.z[1];
          return r3.z[1] = r3.z[0], r3.z[0] = e3, n3;
        }, h = function(r3, t3) {
          var e3 = r3, n3 = 0;
          for (n3 = 0; n3 < t3.length; n3++)
            e3 = l(t3[n3], e3);
          return e3;
        }, p = function(r3, t3) {
          var n3 = r3.Fs, u2 = r3.Fr, o2 = -Math.PI * (u2 / n3) * 2, i2 = {re: Math.cos(o2), im: Math.sin(o2)}, s3 = a.mul(t3.k, a.add(t3.b0, a.mul(i2, a.add(t3.b1, a.mul(t3.b2, i2))))), c2 = a.add(e2, a.mul(i2, a.add(t3.a1, a.mul(t3.a2, i2)))), f2 = a.div(s3, c2);
          return {magnitude: a.magnitude(f2), phase: a.phase(f2)};
        }, v = function(r3) {
          var t3 = 0, e3 = {magnitude: 1, phase: 0};
          for (t3 = 0; t3 < n2.length; t3++) {
            var a2 = p(r3, n2[t3]);
            e3.magnitude *= a2.magnitude, e3.phase += a2.phase;
          }
          return e3.dBmagnitude = 20 * Math.log(e3.magnitude) * Math.LOG10E, e3;
        }, b = function() {
          for (var r3 = [], e3 = 0; e3 < t2.length; e3++)
            r3[e3] = {b0: {re: f.b[0], im: 0}, b1: {re: f.b[1], im: 0}, b2: {re: f.b[2], im: 0}, a1: {re: f.a[0], im: 0}, a2: {re: f.a[1], im: 0}, k: {re: f.k, im: 0}, z: [0, 0]};
          return r3;
        }, m = function(r3) {
          var t3 = b();
          return u(r3, t3, h);
        }, d = function(r3, t3) {
          var e3 = {}, n3 = [], a2 = 0;
          for (a2 = 0; a2 < t3; a2++)
            n3.push(r3(a2));
          e3.out = m(n3);
          var u2 = false, o2 = false;
          for (a2 = 0; a2 < t3 - 1; a2++)
            if (e3.out[a2] > e3.out[a2 + 1] && !u2 && (u2 = true, e3.max = {sample: a2, value: e3.out[a2]}), u2 && !o2 && e3.out[a2] < e3.out[a2 + 1]) {
              o2 = true, e3.min = {sample: a2, value: e3.out[a2]};
              break;
            }
          return e3;
        }, M = function(r3, t3) {
          var e3 = Math.pow(r3 / 2, 2) - t3;
          return e3 < 0 ? [{re: -r3 / 2, im: Math.sqrt(Math.abs(e3))}, {re: -r3 / 2, im: -Math.sqrt(Math.abs(e3))}] : [{re: -r3 / 2 + Math.sqrt(e3), im: 0}, {re: -r3 / 2 - Math.sqrt(e3), im: 0}];
        }, g = function() {
          for (var r3 = [], t3 = 0; t3 < s2.length; t3++)
            r3[t3] = {}, r3[t3].z = M(s2[t3].b1, s2[t3].b2), r3[t3].p = M(s2[t3].a1, s2[t3].a2);
          return r3;
        };
        return {singleStep: function(r3) {
          return h(r3, n2);
        }, multiStep: function(r3, t3) {
          return u(r3, n2, h, t3);
        }, filtfilt: function(r3, t3) {
          return o(u(r3, n2, h, t3), n2, h, true);
        }, simulate: function(r3) {
          return m(r3);
        }, stepResponse: function(r3) {
          return d(function() {
            return 1;
          }, r3);
        }, impulseResponse: function(r3) {
          return d(function(r4) {
            return r4 === 0 ? 1 : 0;
          }, r3);
        }, responsePoint: function(r3) {
          return v(r3);
        }, response: function(r3) {
          r3 = r3 || 100;
          var t3 = [], e3 = 0, n3 = 2 * r3;
          for (e3 = 0; e3 < r3; e3++)
            t3[e3] = v({Fs: n3, Fr: e3});
          return i(t3), t3;
        }, polesZeros: function() {
          return g();
        }, reinit: function() {
          for (c = 0; c < n2.length; c++)
            n2[c].z = [0, 0];
        }};
      };
      t.exports = s;
    }, {"./utils": 9}], 8: [function(r, t, e) {
      var n = function(r2) {
        var t2, e2 = r2, n2 = [], a = function(r3) {
          for (t2 = 0; t2 < r3.steps; t2++)
            n2.push(e2.singleStep((Math.random() - 0.5) * r3.pp + r3.offset));
        }, u = function(r3) {
          var a2 = r3.offset + r3.pp, u2 = r3.offset - r3.pp;
          for (t2 = 0; t2 < r3.steps; t2++)
            t2 % 200 < 100 ? n2.push(e2.singleStep(a2)) : n2.push(e2.singleStep(u2));
        }, o = function(r3) {
          var a2 = r3.offset + r3.pp, u2 = r3.offset - r3.pp;
          for (t2 = 0; t2 < r3.steps; t2++)
            t2 % 100 == 0 ? n2.push(e2.singleStep(a2)) : n2.push(e2.singleStep(u2));
        }, i = function(r3) {
          var a2 = r3.offset + r3.pp, u2 = r3.offset - r3.pp, o2 = u2, i2 = (a2 - u2) / 100;
          for (t2 = 0; t2 < r3.steps; t2++)
            t2 % 200 < 100 ? o2 += i2 : o2 -= i2, n2.push(e2.singleStep(o2));
        };
        return {randomStability: function(r3) {
          for (e2.reinit(), n2.length = 0, a(r3), t2 = r3.setup; t2 < n2.length; t2++)
            if (n2[t2] > r3.maxStable || n2[t2] < r3.minStable)
              return n2[t2];
          return true;
        }, directedRandomStability: function(r3) {
          e2.reinit(), n2.length = 0;
          var s;
          for (s = 0; s < r3.tests; s++) {
            var c = Math.random();
            c < 0.25 ? a(r3) : c < 0.5 ? u(r3) : c < 0.75 ? o(r3) : i(r3);
          }
          for (a(r3), t2 = r3.setup; t2 < n2.length; t2++)
            if (n2[t2] > r3.maxStable || n2[t2] < r3.minStable)
              return n2[t2];
          return true;
        }, evaluateBehavior: function() {
        }};
      };
      t.exports = n;
    }, {}], 9: [function(r, t, e) {
      e.evaluatePhase = function(r2) {
        var t2 = 0, e2 = 0, n2 = Math.PI, a2 = 2 * n2, u2 = [];
        for (e2 = 0; e2 < r2.length; e2++)
          u2.push(r2[e2].phase);
        for (r2[0].unwrappedPhase = r2[0].phase, r2[0].groupDelay = 0, e2 = 1; e2 < u2.length; e2++) {
          var o2 = u2[e2] - u2[e2 - 1];
          if (o2 > n2)
            for (t2 = e2; t2 < u2.length; t2++)
              u2[t2] -= a2;
          else if (o2 < -n2)
            for (t2 = e2; t2 < u2.length; t2++)
              u2[t2] += a2;
          u2[e2] < 0 ? r2[e2].unwrappedPhase = -u2[e2] : r2[e2].unwrappedPhase = u2[e2], r2[e2].phaseDelay = r2[e2].unwrappedPhase / (e2 / r2.length), r2[e2].groupDelay = (r2[e2].unwrappedPhase - r2[e2 - 1].unwrappedPhase) / (n2 / r2.length), r2[e2].groupDelay < 0 && (r2[e2].groupDelay = -r2[e2].groupDelay);
        }
        r2[0].magnitude !== 0 ? (r2[0].phaseDelay = r2[1].phaseDelay, r2[0].groupDelay = r2[1].groupDelay) : (r2[0].phaseDelay = r2[2].phaseDelay, r2[0].groupDelay = r2[2].groupDelay, r2[1].phaseDelay = r2[2].phaseDelay, r2[1].groupDelay = r2[2].groupDelay);
      }, e.runMultiFilter = function(r2, t2, e2, n2) {
        var a2 = [];
        n2 && (a2 = r2);
        var u2;
        for (u2 = 0; u2 < r2.length; u2++)
          a2[u2] = e2(r2[u2], t2);
        return a2;
      }, e.runMultiFilterReverse = function(r2, t2, e2, n2) {
        var a2 = [];
        n2 && (a2 = r2);
        var u2;
        for (u2 = r2.length - 1; u2 >= 0; u2--)
          a2[u2] = e2(r2[u2], t2);
        return a2;
      };
      var n = function(r2, t2) {
        for (var e2 = true; e2; ) {
          var n2 = r2, a2 = t2;
          if (e2 = false, a2 || (a2 = 1), n2 !== Math.floor(n2) || a2 !== Math.floor(a2))
            return 1;
          if (n2 === 0 || n2 === 1)
            return a2;
          r2 = n2 - 1, t2 = a2 * n2, e2 = true;
        }
      };
      e.besselFactors = function(r2) {
        for (var t2 = [], e2 = 0; e2 < r2 + 1; e2++) {
          var a2 = n(2 * r2 - e2), u2 = Math.pow(2, r2 - e2) * n(e2) * n(r2 - e2);
          t2.unshift(Math.floor(a2 / u2));
        }
        return t2;
      };
      var a = function(r2, t2) {
        for (var e2 = 0, n2 = 0; n2 < t2; n2++) {
          var a2 = 1 / Math.pow(2, n2 + 1);
          r2 > a2 && (r2 -= a2, e2 += a2);
        }
        return e2;
      }, u = function(r2, t2) {
        return r2 & Math.pow(2, t2);
      }, o = function(r2, t2, e2) {
        var n2 = Math.abs(r2), o2 = r2 - n2;
        return {number: u(n2, t2).toString(), fraction: a(o2, e2).toString(), numberBits: t2, fractionBits: e2};
      };
      e.fixedPoint = {convert: function(r2, t2, e2) {
        return o(r2, t2, e2);
      }, add: function(r2, t2) {
      }, sub: function(r2, t2) {
      }, mul: function(r2, t2) {
      }, div: function(r2, t2) {
      }}, e.complex = {div: function(r2, t2) {
        var e2 = r2.re, n2 = r2.im, a2 = t2.re, u2 = t2.im, o2 = a2 * a2 + u2 * u2;
        return {re: (e2 * a2 + n2 * u2) / o2, im: (n2 * a2 - e2 * u2) / o2};
      }, mul: function(r2, t2) {
        var e2 = r2.re, n2 = r2.im, a2 = t2.re, u2 = t2.im;
        return {re: e2 * a2 - n2 * u2, im: (e2 + n2) * (a2 + u2) - e2 * a2 - n2 * u2};
      }, add: function(r2, t2) {
        return {re: r2.re + t2.re, im: r2.im + t2.im};
      }, sub: function(r2, t2) {
        return {re: r2.re - t2.re, im: r2.im - t2.im};
      }, phase: function(r2) {
        return Math.atan2(r2.im, r2.re);
      }, magnitude: function(r2) {
        return Math.sqrt(r2.re * r2.re + r2.im * r2.im);
      }};
    }, {}]}, {}, [1])(1);
  });
});
var CalcCascades = fili_min.CalcCascades;
var Fft = fili_min.Fft;
var FirCoeffs = fili_min.FirCoeffs;
var FirFilter = fili_min.FirFilter;
var IirCoeffs = fili_min.IirCoeffs;
var IirFilter = fili_min.IirFilter;
var TestFilter = fili_min.TestFilter;
export default fili_min;
export {CalcCascades, Fft, FirCoeffs, FirFilter, IirCoeffs, IirFilter, TestFilter, fili_min as __moduleExports};

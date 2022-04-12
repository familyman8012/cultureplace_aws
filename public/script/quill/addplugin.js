//table
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.quillTableUI = e())
    : (t.quillTableUI = e());
})(window, function () {
  return (function (t) {
    var e = {};
    function o(n) {
      if (e[n]) return e[n].exports;
      var i = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
    }
    return (
      (o.m = t),
      (o.c = e),
      (o.d = function (t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (o.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (o.t = function (t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var i in t)
            o.d(
              n,
              i,
              function (e) {
                return t[e];
              }.bind(null, i)
            );
        return n;
      }),
      (o.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return o.d(e, "a", e), e;
      }),
      (o.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (o.p = ""),
      o((o.s = 0))
    );
  })([
    function (t, e, o) {
      "use strict";
      o.r(e);
      var n = (function () {
          function t() {}
          return (
            (t.prototype.getAllStyles = function (t) {
              return window.getComputedStyle(t);
            }),
            (t.prototype.getStyle = function (t, e) {
              return this.getAllStyles(t)[e];
            }),
            (t.prototype.isStaticPositioned = function (t) {
              return "static" === (this.getStyle(t, "position") || "static");
            }),
            (t.prototype.offsetParent = function (t) {
              for (
                var e = t.offsetParent || document.documentElement;
                e &&
                e !== document.documentElement &&
                this.isStaticPositioned(e);

              )
                e = e.offsetParent;
              return e || document.documentElement;
            }),
            (t.prototype.position = function (t, e) {
              var o;
              void 0 === e && (e = !0);
              var n = {
                width: 0,
                height: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              };
              if ("fixed" === this.getStyle(t, "position"))
                o = {
                  top: (o = t.getBoundingClientRect()).top,
                  bottom: o.bottom,
                  left: o.left,
                  right: o.right,
                  height: o.height,
                  width: o.width
                };
              else {
                var i = this.offsetParent(t);
                (o = this.offset(t, !1)),
                  i !== document.documentElement && (n = this.offset(i, !1)),
                  (n.top += i.clientTop),
                  (n.left += i.clientLeft);
              }
              return (
                (o.top -= n.top),
                (o.bottom -= n.top),
                (o.left -= n.left),
                (o.right -= n.left),
                e &&
                  ((o.top = Math.round(o.top)),
                  (o.bottom = Math.round(o.bottom)),
                  (o.left = Math.round(o.left)),
                  (o.right = Math.round(o.right))),
                o
              );
            }),
            (t.prototype.offset = function (t, e) {
              void 0 === e && (e = !0);
              var o = t.getBoundingClientRect(),
                n = window.pageYOffset - document.documentElement.clientTop,
                i = window.pageXOffset - document.documentElement.clientLeft,
                l = {
                  height: o.height || t.offsetHeight,
                  width: o.width || t.offsetWidth,
                  top: o.top + n,
                  bottom: o.bottom + n,
                  left: o.left + i,
                  right: o.right + i
                };
              return (
                e &&
                  ((l.height = Math.round(l.height)),
                  (l.width = Math.round(l.width)),
                  (l.top = Math.round(l.top)),
                  (l.bottom = Math.round(l.bottom)),
                  (l.left = Math.round(l.left)),
                  (l.right = Math.round(l.right))),
                l
              );
            }),
            (t.prototype.positionElements = function (t, e, o, n) {
              var i = o.split("-"),
                l = i[0],
                h = void 0 === l ? "top" : l,
                s = i[1],
                r = void 0 === s ? "center" : s,
                a = n ? this.offset(t, !1) : this.position(t, !1),
                c = this.getAllStyles(e),
                d = parseFloat(c.marginTop),
                u = parseFloat(c.marginBottom),
                p = parseFloat(c.marginLeft),
                g = parseFloat(c.marginRight),
                f = 0,
                v = 0;
              switch (h) {
                case "top":
                  f = a.top - (e.offsetHeight + d + u);
                  break;
                case "bottom":
                  f = a.top + a.height;
                  break;
                case "left":
                  v = a.left - (e.offsetWidth + p + g);
                  break;
                case "right":
                  v = a.left + a.width;
              }
              switch (r) {
                case "top":
                  f = a.top;
                  break;
                case "bottom":
                  f = a.top + a.height - e.offsetHeight;
                  break;
                case "left":
                  v = a.left;
                  break;
                case "right":
                  v = a.left + a.width - e.offsetWidth;
                  break;
                case "center":
                  "top" === h || "bottom" === h
                    ? (v = a.left + a.width / 2 - e.offsetWidth / 2)
                    : (f = a.top + a.height / 2 - e.offsetHeight / 2);
              }
              e.style.transform =
                "translate(" + Math.round(v) + "px, " + Math.round(f) + "px)";
              var m = e.getBoundingClientRect(),
                w = document.documentElement,
                b = window.innerHeight || w.clientHeight,
                E = window.innerWidth || w.clientWidth;
              return m.left >= 0 && m.top >= 0 && m.right <= E && m.bottom <= b;
            }),
            t
          );
        })(),
        i = /\s+/,
        l = new n();
      var h,
        s,
        r = function () {
          return (r =
            Object.assign ||
            function (t) {
              for (var e, o = 1, n = arguments.length; o < n; o++)
                for (var i in (e = arguments[o]))
                  Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
              return t;
            }).apply(this, arguments);
        };
      !(function (t) {
        (t.EDITOR_CHANGE = "editor-change"),
          (t.SCROLL_BEFORE_UPDATE = "scroll-before-update"),
          (t.SCROLL_BLOT_MOUNT = "scroll-blot-mount"),
          (t.SCROLL_BLOT_UNMOUNT = "scroll-blot-unmount"),
          (t.SCROLL_OPTIMIZE = "scroll-optimize"),
          (t.SCROLL_UPDATE = "scroll-update"),
          (t.SELECTION_CHANGE = "selection-change"),
          (t.TEXT_CHANGE = "text-change");
      })(h || (h = {})),
        (function (t) {
          (t.API = "api"), (t.SILENT = "silent"), (t.USER = "user");
        })(s || (s = {}));
      var a = ["bottom-left", "bottom-right", "top-left", "top-right", "auto"],
        c =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M73.142857 336.64h526.628572v43.885714H73.142857zM73.142857 643.657143h526.628572v43.885714H73.142857zM336.457143 117.028571h43.885714v789.942858h-43.885714zM204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.84 131.84 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.771429 87.771429 0 0 0 87.771429 87.771429h614.4a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM819.2 73.142857h-219.428571v877.714286h219.428571a131.657143 131.657143 0 0 0 131.657143-131.657143V204.8A131.84 131.84 0 0 0 819.2 73.142857z m44.068571 460.982857h-65.828571v65.828572H753.371429v-65.828572h-65.828572V490.057143h65.828572v-65.828572h44.068571v65.828572h65.828571z" /></svg>',
        d =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M380.342857 336.457143h526.811429v43.885714H380.342857z m0 307.2h526.811429v43.885714H380.342857zM643.657143 117.028571h43.885714v789.942858h-43.885714zM204.8 73.142857h614.582857A131.474286 131.474286 0 0 1 950.857143 204.8v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.657143 131.657143 0 0 1 204.8 73.142857z m0 43.885714a87.588571 87.588571 0 0 0-87.588571 87.771429v614.4a87.588571 87.588571 0 0 0 87.588571 87.771429h614.582857a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM204.8 73.142857A131.657143 131.657143 0 0 0 73.142857 204.8v614.4a131.657143 131.657143 0 0 0 131.657143 131.657143h219.428571V73.142857z m131.84 460.8h-65.828571v65.828572h-43.885715v-65.828572h-65.828571v-43.885714h65.828571v-65.828572h43.885715v65.828572h65.828571z" /></svg>',
        u =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M73.142857 599.771429h877.714286v43.885714H73.142857zM336.457143 380.342857h43.885714v526.628572h-43.885714z m307.2 0h43.885714v526.628572h-43.885714zM204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.657143 131.657143 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.588571 87.588571 0 0 0 87.771429 87.771429h614.4a87.588571 87.588571 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM819.2 73.142857H204.8A131.657143 131.657143 0 0 0 73.142857 204.8v219.428571h877.714286v-219.428571A131.657143 131.657143 0 0 0 819.2 73.142857z m-219.428571 197.485714h-65.828572v65.828572h-43.885714v-65.828572h-65.828572v-43.885714h65.828572V160.914286h43.885714v65.828571h65.828572z" /></svg>',
        p =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.84 131.84 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.771429 87.771429 0 0 0 87.771429 87.771429h614.4a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM73.142857 336.457143h877.714286v44.068571H73.142857zM336.64 117.028571h43.885714v526.628572h-43.885714z m307.017143 0h44.068571v526.628572H643.657143zM73.142857 599.771429v219.428571a131.657143 131.657143 0 0 0 131.657143 131.657143h614.4a131.657143 131.657143 0 0 0 131.657143-131.657143v-219.428571z m526.628572 197.485714h-65.645715v65.828571H490.057143v-65.828571h-65.828572v-43.885714h65.828572v-65.828572h44.068571v65.828572h65.645715z" /></svg>',
        g =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M925.996 99.038c-25.47-25.6-60.121-39.822-96.323-39.822H194.198c-75.12 0.13-136.016 61.026-136.145 136.146v635.345c0 36.073 14.351 70.723 39.822 96.323 25.6 25.73 60.25 40.081 96.323 40.081h635.475c36.072 0 70.723-14.351 96.323-39.951 25.6-25.6 39.951-60.122 39.951-96.324V195.362c0-36.073-14.351-70.724-39.951-96.324z m-365.77 494.287L512 545.228l-48.226 48.097-32.194-31.935 48.355-48.226-48.226-48.097 32.194-32.194L512 480.97l48.097-48.097 32.194 32.194-48.097 48.097 48.226 48.226-32.194 31.935zM103.434 195.362c0-24.049 9.568-47.192 26.635-64.13 17.066-17.066 40.08-26.634 64.129-26.634h136.145v226.91H103.434V195.361z m0 181.656h226.91V649.31h-226.91V377.02z m90.764 544.84c-24.049 0-47.192-9.567-64.13-26.634-17.066-17.066-26.634-40.08-26.634-64.258V694.69h226.91v227.168H194.197z m726.238-90.763c0 24.048-9.438 47.192-26.505 64.259-17.066 17.066-40.21 26.634-64.258 26.505H693.527V694.69h226.91v136.404z m0-181.786H693.527V377.02h226.91v272.29zM693.527 331.507V104.598h136.146c24.048 0 47.192 9.438 64.258 26.505 17.067 17.067 26.635 40.21 26.505 64.259v136.145H693.527z" /></svg>',
        f =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M925.99596 99.038384c-25.470707-25.6-60.121212-39.822222-96.323233-39.822222H194.19798c-36.072727 0-70.723232 14.351515-96.323233 39.822222-25.6 25.6-39.822222 60.121212-39.822222 96.323232v635.474748c0 36.072727 14.351515 70.723232 39.822222 96.323232C123.474747 952.759596 158.125253 967.111111 194.19798 967.111111h635.474747c36.072727 0 70.723232-14.351515 96.323233-39.951515 25.6-25.6 39.951515-60.121212 39.951515-96.323232V195.361616c0-36.072727-14.351515-70.723232-39.951515-96.323232z m-550.270707 5.559596h272.290909v227.167677H375.725253V104.59798z m56.242424 360.468687l31.935353-32.19394 48.09697 48.226263 48.09697-48.226263 32.193939 32.19394-48.09697 48.096969 48.226263 48.226263-32.193939 31.935354-48.226263-48.09697-48.226263 48.09697-31.935353-31.935354 48.226262-48.226263-48.096969-48.096969zM103.434343 195.361616c0-24.048485 9.567677-47.191919 26.634344-64.129293 17.066667-17.066667 40.080808-26.634343 64.129293-26.634343h136.145454v227.167677H103.434343V195.361616z m817.002021 635.733333c0 24.048485-9.567677 47.191919-26.634344 64.258586-17.066667 17.066667-40.080808 26.634343-64.129293 26.634344H194.19798c-24.048485 0-47.191919-9.567677-64.258586-26.634344C112.872727 878.157576 103.434343 855.014141 103.434343 830.836364V694.690909h226.909091v226.909091h45.381819V694.690909h272.290909v226.909091h45.381818V694.690909h226.909091v136.40404z m0-499.329292H693.527273V104.59798h136.145454c24.048485 0 47.191919 9.567677 64.129293 26.634343 17.066667 17.066667 26.634343 40.080808 26.634344 64.129293v136.404041z" /></svg>',
        v =
          '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M764.42168889 830.5152c0 30.23530667-24.61013333 54.84430222-54.84316444 54.84430222H314.42147555c-30.23416889 0-54.84316445-24.61013333-54.84316444-54.84430222V248.32796445h504.84337778v582.18723555zM369.26577778 149.89084445c0-6.32832 4.92202667-11.25034667 11.25034667-11.25034667H644.18702222c6.32832 0 11.25034667 4.92202667 11.25034667 11.25034667v33.04675555H369.26577778V149.89084445z m559.68768 33.04675555H720.82773333V149.89084445c0-42.1888-34.45191111-76.64071111-76.64071111-76.64071112H380.51612445c-42.1888 0-76.64071111 34.45191111-76.64071112 76.64071112v33.04675555h-208.82773333c-18.28181333 0-33.04789333 14.76608-33.04789333 33.04675555s14.76608 33.04675555 33.04675555 33.04675556h98.43825778v581.48408889c0 66.79779555 54.14001778 120.93781333 120.93667555 120.93781333h395.1570489c66.79665778 0 120.93667555-54.14001778 120.93667555-120.93781333V248.32796445h98.43825778c18.28067555 0 33.04675555-14.76494222 33.04675555-33.04675556s-14.76608-32.34360889-33.04675555-32.34360889zM512 786.21923555c18.28181333 0 33.04675555-14.76608 33.04675555-33.04789333v-351.56195555c0-18.28181333-14.76494222-33.04675555-33.04675555-33.04675556s-33.04675555 14.76494222-33.04675555 33.04675556v351.56195555c0 18.28181333 14.76494222 33.04789333 33.04675555 33.04789333m-153.98456889 0c18.28181333 0 33.04675555-14.76608 33.04675556-33.04789333v-351.56195555c0-18.28181333-14.76494222-33.04675555-33.04675556-33.04675556s-33.04675555 14.76494222-33.04675556 33.04675556v351.56195555c0.70314667 18.28181333 15.46922667 33.04789333 33.04675556 33.04789333m307.96913778 0c18.28067555 0 33.04675555-14.76608 33.04675556-33.04789333v-351.56195555c0-18.28181333-14.76608-33.04675555-33.04675556-33.04675556s-33.04675555 14.76494222-33.04675556 33.04675556v351.56195555c0 18.28181333 14.76494222 33.04789333 33.04675556 33.04789333" /></svg>',
        m = (function () {
          function t(t, e) {
            var o = this;
            (this.TOGGLE_TEMPLATE =
              '<svg width="9" height="9" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g><path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z"/><path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z"/><path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/></g></svg>'),
              (this.DEFAULTS = {}),
              (this.docClickBinded = this.hideMenu.bind(this)),
              (this.menuItems = [
                {
                  title: "Insert column right",
                  icon: c,
                  handler: function () {
                    o.table.insertColumnRight();
                  }
                },
                {
                  title: "Insert column left",
                  icon: d,
                  handler: function () {
                    o.table.insertColumnLeft();
                  }
                },
                {
                  title: "Insert row above",
                  icon: u,
                  handler: function () {
                    o.table.insertRowAbove();
                  }
                },
                {
                  title: "Insert row below",
                  icon: p,
                  handler: function () {
                    o.table.insertRowBelow();
                  }
                },
                {
                  title: "Delete column",
                  icon: g,
                  handler: function () {
                    o.table.deleteColumn();
                  }
                },
                {
                  title: "Delete row",
                  icon: f,
                  handler: function () {
                    o.table.deleteRow();
                  }
                },
                {
                  title: "Delete table",
                  icon: v,
                  handler: function () {
                    o.table.deleteTable();
                  }
                }
              ]),
              (this.quill = t),
              (this.options = r(r({}, this.DEFAULTS), e)),
              (this.table = t.getModule("table")),
              this.table
                ? ((this.toggle = t.addContainer("ql-table-toggle")),
                  this.toggle.classList.add("ql-table-toggle_hidden"),
                  (this.toggle.innerHTML = this.TOGGLE_TEMPLATE),
                  this.toggle.addEventListener("click", function (t) {
                    o.toggleMenu(), t.preventDefault(), t.stopPropagation();
                  }),
                  this.quill.on(h.EDITOR_CHANGE, function (t, e, n, i) {
                    t === h.SELECTION_CHANGE && o.detectButton(e);
                  }),
                  this.quill.root.addEventListener("contextmenu", function (t) {
                    if (!o.isTable()) return !0;
                    t.preventDefault(), o.showMenu();
                  }))
                : console.error('"table" module not found');
          }
          return (
            (t.prototype.isTable = function (t) {
              return (
                t || (t = this.quill.getSelection()),
                !!t && !(!this.quill.getFormat(t.index).table || t.length)
              );
            }),
            (t.prototype.showMenu = function () {
              var t = this;
              this.hideMenu(),
                (this.menu = this.quill.addContainer("ql-table-menu")),
                this.menuItems.forEach(function (e) {
                  t.menu.appendChild(t.createMenuItem(e));
                }),
                (function (t, e, o, n, h) {
                  var s = Array.isArray(o) ? o : o.split(i),
                    r = [
                      "top",
                      "bottom",
                      "left",
                      "right",
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                      "left-top",
                      "left-bottom",
                      "right-top",
                      "right-bottom"
                    ],
                    a = e.classList,
                    c = function (t) {
                      var e = t.split("-"),
                        o = e[0],
                        n = e[1],
                        i = [];
                      return (
                        h &&
                          (i.push(h + "-" + o),
                          n && i.push(h + "-" + o + "-" + n),
                          i.forEach(function (t) {
                            a.add(t);
                          })),
                        i
                      );
                    };
                  h &&
                    r.forEach(function (t) {
                      a.remove(h + "-" + t);
                    });
                  var d = s.findIndex(function (t) {
                    return "auto" === t;
                  });
                  d >= 0 &&
                    r.forEach(function (t) {
                      null ==
                        s.find(function (e) {
                          return -1 !== e.search("^" + t);
                        }) && s.splice(d++, 1, t);
                    });
                  var u,
                    p = e.style;
                  (p.position = "absolute"),
                    (p.top = "0"),
                    (p.left = "0"),
                    (p["will-change"] = "transform");
                  for (var g = !1, f = 0, v = s; f < v.length; f++) {
                    var m = c((u = v[f]));
                    if (l.positionElements(t, e, u, n)) {
                      g = !0;
                      break;
                    }
                    h &&
                      m.forEach(function (t) {
                        a.remove(t);
                      });
                  }
                  g || (c((u = s[0])), l.positionElements(t, e, u, n));
                })(this.toggle, this.menu, a, !1),
                document.addEventListener("click", this.docClickBinded);
            }),
            (t.prototype.hideMenu = function () {
              this.menu &&
                (this.menu.remove(),
                (this.menu = null),
                document.removeEventListener("click", this.docClickBinded));
            }),
            (t.prototype.createMenuItem = function (t) {
              var e = this,
                o = document.createElement("div");
              o.classList.add("ql-table-menu__item");
              var n = document.createElement("span");
              n.classList.add("ql-table-menu__item-icon"),
                (n.innerHTML = t.icon);
              var i = document.createElement("span");
              return (
                i.classList.add("ql-table-menu__item-text"),
                (i.innerText = t.title),
                o.appendChild(n),
                o.appendChild(i),
                o.addEventListener(
                  "click",
                  function (o) {
                    o.preventDefault(),
                      o.stopPropagation(),
                      e.quill.focus(),
                      t.handler(),
                      e.hideMenu(),
                      e.detectButton(e.quill.getSelection());
                  },
                  !1
                ),
                o
              );
            }),
            (t.prototype.detectButton = function (t) {
              if (null != t)
                if (this.isTable(t)) {
                  var e = this.quill.getLine(t.index),
                    o = e[0],
                    n = (e[1], this.quill.container.getBoundingClientRect()),
                    i = o.domNode.getBoundingClientRect();
                  (i = {
                    bottom: i.bottom - n.top,
                    height: i.height,
                    left: i.left - n.left,
                    right: i.right - n.left,
                    top: i.top - n.top,
                    width: i.width
                  }),
                    this.showToggle(i);
                } else this.hideToggle(), this.hideMenu();
            }),
            (t.prototype.showToggle = function (t) {
              (this.position = t),
                this.toggle.classList.remove("ql-table-toggle_hidden"),
                (this.toggle.style.top = t.top + "px"),
                (this.toggle.style.left = t.left + "px");
            }),
            (t.prototype.hideToggle = function () {
              this.toggle.classList.add("ql-table-toggle_hidden");
            }),
            (t.prototype.toggleMenu = function () {
              this.menu ? this.hideToggle() : this.showMenu();
            }),
            t
          );
        })();
      e.default = m;
    }
  ]);
});
//imgresize
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.ImageResize = e())
    : (t.ImageResize = e());
})(window, function () {
  return (function (t) {
    var e = {};
    function n(o) {
      if (e[o]) return e[o].exports;
      var r = (e[o] = { i: o, l: !1, exports: {} });
      return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            n.d(
              o,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return o;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 4))
    );
  })([
    function (t, e, n) {
      var o;
      "undefined" != typeof self && self,
        (o = function () {
          return (function (t) {
            var e = {};
            function n(o) {
              if (e[o]) return e[o].exports;
              var r = (e[o] = { i: o, l: !1, exports: {} });
              return (
                t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
              );
            }
            return (
              (n.m = t),
              (n.c = e),
              (n.d = function (t, e, o) {
                n.o(t, e) ||
                  Object.defineProperty(t, e, {
                    configurable: !1,
                    enumerable: !0,
                    get: o
                  });
              }),
              (n.n = function (t) {
                var e =
                  t && t.__esModule
                    ? function () {
                        return t.default;
                      }
                    : function () {
                        return t;
                      };
                return n.d(e, "a", e), e;
              }),
              (n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }),
              (n.p = ""),
              n((n.s = 9))
            );
          })([
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = (function (t) {
                function e(e) {
                  var n = this;
                  return (
                    (e = "[Parchment] " + e),
                    ((n = t.call(this, e) || this).message = e),
                    (n.name = n.constructor.name),
                    n
                  );
                }
                return r(e, t), e;
              })(Error);
              e.ParchmentError = i;
              var a,
                s = {},
                u = {},
                c = {},
                l = {};
              function f(t, e) {
                var n;
                if ((void 0 === e && (e = a.ANY), "string" == typeof t))
                  n = l[t] || s[t];
                else if (t instanceof Text || t.nodeType === Node.TEXT_NODE)
                  n = l.text;
                else if ("number" == typeof t)
                  t & a.LEVEL & a.BLOCK
                    ? (n = l.block)
                    : t & a.LEVEL & a.INLINE && (n = l.inline);
                else if (t instanceof HTMLElement) {
                  var o = (t.getAttribute("class") || "").split(/\s+/);
                  for (var r in o) if ((n = u[o[r]])) break;
                  n = n || c[t.tagName];
                }
                return null == n
                  ? null
                  : e & a.LEVEL & n.scope && e & a.TYPE & n.scope
                  ? n
                  : null;
              }
              (e.DATA_KEY = "__blot"),
                (function (t) {
                  (t[(t.TYPE = 3)] = "TYPE"),
                    (t[(t.LEVEL = 12)] = "LEVEL"),
                    (t[(t.ATTRIBUTE = 13)] = "ATTRIBUTE"),
                    (t[(t.BLOT = 14)] = "BLOT"),
                    (t[(t.INLINE = 7)] = "INLINE"),
                    (t[(t.BLOCK = 11)] = "BLOCK"),
                    (t[(t.BLOCK_BLOT = 10)] = "BLOCK_BLOT"),
                    (t[(t.INLINE_BLOT = 6)] = "INLINE_BLOT"),
                    (t[(t.BLOCK_ATTRIBUTE = 9)] = "BLOCK_ATTRIBUTE"),
                    (t[(t.INLINE_ATTRIBUTE = 5)] = "INLINE_ATTRIBUTE"),
                    (t[(t.ANY = 15)] = "ANY");
                })((a = e.Scope || (e.Scope = {}))),
                (e.create = function (t, e) {
                  var n = f(t);
                  if (null == n) throw new i("Unable to create " + t + " blot");
                  var o = n,
                    r =
                      t instanceof Node || t.nodeType === Node.TEXT_NODE
                        ? t
                        : o.create(e);
                  return new o(r, e);
                }),
                (e.find = function t(n, o) {
                  return (
                    void 0 === o && (o = !1),
                    null == n
                      ? null
                      : null != n[e.DATA_KEY]
                      ? n[e.DATA_KEY].blot
                      : o
                      ? t(n.parentNode, o)
                      : null
                  );
                }),
                (e.query = f),
                (e.register = function t() {
                  for (var e = [], n = 0; n < arguments.length; n++)
                    e[n] = arguments[n];
                  if (e.length > 1)
                    return e.map(function (e) {
                      return t(e);
                    });
                  var o = e[0];
                  if (
                    "string" != typeof o.blotName &&
                    "string" != typeof o.attrName
                  )
                    throw new i("Invalid definition");
                  if ("abstract" === o.blotName)
                    throw new i("Cannot register abstract class");
                  if (
                    ((l[o.blotName || o.attrName] = o),
                    "string" == typeof o.keyName)
                  )
                    s[o.keyName] = o;
                  else if (
                    (null != o.className && (u[o.className] = o),
                    null != o.tagName)
                  ) {
                    Array.isArray(o.tagName)
                      ? (o.tagName = o.tagName.map(function (t) {
                          return t.toUpperCase();
                        }))
                      : (o.tagName = o.tagName.toUpperCase());
                    var r = Array.isArray(o.tagName) ? o.tagName : [o.tagName];
                    r.forEach(function (t) {
                      (null != c[t] && null != o.className) || (c[t] = o);
                    });
                  }
                  return o;
                });
            },
            function (t, e, n) {
              "use strict";
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = n(0),
                r = (function () {
                  function t(t, e, n) {
                    void 0 === n && (n = {}),
                      (this.attrName = t),
                      (this.keyName = e);
                    var r = o.Scope.TYPE & o.Scope.ATTRIBUTE;
                    null != n.scope
                      ? (this.scope = (n.scope & o.Scope.LEVEL) | r)
                      : (this.scope = o.Scope.ATTRIBUTE),
                      null != n.whitelist && (this.whitelist = n.whitelist);
                  }
                  return (
                    (t.keys = function (t) {
                      return [].map.call(t.attributes, function (t) {
                        return t.name;
                      });
                    }),
                    (t.prototype.add = function (t, e) {
                      return (
                        !!this.canAdd(t, e) &&
                        (t.setAttribute(this.keyName, e), !0)
                      );
                    }),
                    (t.prototype.canAdd = function (t, e) {
                      return (
                        null !=
                          o.query(
                            t,
                            o.Scope.BLOT & (this.scope | o.Scope.TYPE)
                          ) &&
                        (null == this.whitelist ||
                          ("string" == typeof e
                            ? this.whitelist.indexOf(e.replace(/["']/g, "")) >
                              -1
                            : this.whitelist.indexOf(e) > -1))
                      );
                    }),
                    (t.prototype.remove = function (t) {
                      t.removeAttribute(this.keyName);
                    }),
                    (t.prototype.value = function (t) {
                      var e = t.getAttribute(this.keyName);
                      return this.canAdd(t, e) && e ? e : "";
                    }),
                    t
                  );
                })();
              e.default = r;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(11),
                a = n(5),
                s = n(0),
                u = (function (t) {
                  function e(e) {
                    var n = t.call(this, e) || this;
                    return n.build(), n;
                  }
                  return (
                    r(e, t),
                    (e.prototype.appendChild = function (t) {
                      this.insertBefore(t);
                    }),
                    (e.prototype.attach = function () {
                      t.prototype.attach.call(this),
                        this.children.forEach(function (t) {
                          t.attach();
                        });
                    }),
                    (e.prototype.build = function () {
                      var t = this;
                      (this.children = new i.default()),
                        [].slice
                          .call(this.domNode.childNodes)
                          .reverse()
                          .forEach(function (e) {
                            try {
                              var n = c(e);
                              t.insertBefore(n, t.children.head || void 0);
                            } catch (t) {
                              if (t instanceof s.ParchmentError) return;
                              throw t;
                            }
                          });
                    }),
                    (e.prototype.deleteAt = function (t, e) {
                      if (0 === t && e === this.length()) return this.remove();
                      this.children.forEachAt(t, e, function (t, e, n) {
                        t.deleteAt(e, n);
                      });
                    }),
                    (e.prototype.descendant = function (t, n) {
                      var o = this.children.find(n),
                        r = o[0],
                        i = o[1];
                      return (null == t.blotName && t(r)) ||
                        (null != t.blotName && r instanceof t)
                        ? [r, i]
                        : r instanceof e
                        ? r.descendant(t, i)
                        : [null, -1];
                    }),
                    (e.prototype.descendants = function (t, n, o) {
                      void 0 === n && (n = 0),
                        void 0 === o && (o = Number.MAX_VALUE);
                      var r = [],
                        i = o;
                      return (
                        this.children.forEachAt(n, o, function (n, o, a) {
                          ((null == t.blotName && t(n)) ||
                            (null != t.blotName && n instanceof t)) &&
                            r.push(n),
                            n instanceof e &&
                              (r = r.concat(n.descendants(t, o, i))),
                            (i -= a);
                        }),
                        r
                      );
                    }),
                    (e.prototype.detach = function () {
                      this.children.forEach(function (t) {
                        t.detach();
                      }),
                        t.prototype.detach.call(this);
                    }),
                    (e.prototype.formatAt = function (t, e, n, o) {
                      this.children.forEachAt(t, e, function (t, e, r) {
                        t.formatAt(e, r, n, o);
                      });
                    }),
                    (e.prototype.insertAt = function (t, e, n) {
                      var o = this.children.find(t),
                        r = o[0],
                        i = o[1];
                      if (r) r.insertAt(i, e, n);
                      else {
                        var a =
                          null == n ? s.create("text", e) : s.create(e, n);
                        this.appendChild(a);
                      }
                    }),
                    (e.prototype.insertBefore = function (t, e) {
                      if (
                        null != this.statics.allowedChildren &&
                        !this.statics.allowedChildren.some(function (e) {
                          return t instanceof e;
                        })
                      )
                        throw new s.ParchmentError(
                          "Cannot insert " +
                            t.statics.blotName +
                            " into " +
                            this.statics.blotName
                        );
                      t.insertInto(this, e);
                    }),
                    (e.prototype.length = function () {
                      return this.children.reduce(function (t, e) {
                        return t + e.length();
                      }, 0);
                    }),
                    (e.prototype.moveChildren = function (t, e) {
                      this.children.forEach(function (n) {
                        t.insertBefore(n, e);
                      });
                    }),
                    (e.prototype.optimize = function (e) {
                      if (
                        (t.prototype.optimize.call(this, e),
                        0 === this.children.length)
                      )
                        if (null != this.statics.defaultChild) {
                          var n = s.create(this.statics.defaultChild);
                          this.appendChild(n), n.optimize(e);
                        } else this.remove();
                    }),
                    (e.prototype.path = function (t, n) {
                      void 0 === n && (n = !1);
                      var o = this.children.find(t, n),
                        r = o[0],
                        i = o[1],
                        a = [[this, t]];
                      return r instanceof e
                        ? a.concat(r.path(i, n))
                        : (null != r && a.push([r, i]), a);
                    }),
                    (e.prototype.removeChild = function (t) {
                      this.children.remove(t);
                    }),
                    (e.prototype.replace = function (n) {
                      n instanceof e && n.moveChildren(this),
                        t.prototype.replace.call(this, n);
                    }),
                    (e.prototype.split = function (t, e) {
                      if ((void 0 === e && (e = !1), !e)) {
                        if (0 === t) return this;
                        if (t === this.length()) return this.next;
                      }
                      var n = this.clone();
                      return (
                        this.parent.insertBefore(n, this.next),
                        this.children.forEachAt(
                          t,
                          this.length(),
                          function (t, o, r) {
                            (t = t.split(o, e)), n.appendChild(t);
                          }
                        ),
                        n
                      );
                    }),
                    (e.prototype.unwrap = function () {
                      this.moveChildren(this.parent, this.next), this.remove();
                    }),
                    (e.prototype.update = function (t, e) {
                      var n = this,
                        o = [],
                        r = [];
                      t.forEach(function (t) {
                        t.target === n.domNode &&
                          "childList" === t.type &&
                          (o.push.apply(o, t.addedNodes),
                          r.push.apply(r, t.removedNodes));
                      }),
                        r.forEach(function (t) {
                          if (
                            !(
                              null != t.parentNode &&
                              "IFRAME" !== t.tagName &&
                              document.body.compareDocumentPosition(t) &
                                Node.DOCUMENT_POSITION_CONTAINED_BY
                            )
                          ) {
                            var e = s.find(t);
                            null != e &&
                              ((null != e.domNode.parentNode &&
                                e.domNode.parentNode !== n.domNode) ||
                                e.detach());
                          }
                        }),
                        o
                          .filter(function (t) {
                            return t.parentNode == n.domNode;
                          })
                          .sort(function (t, e) {
                            return t === e
                              ? 0
                              : t.compareDocumentPosition(e) &
                                Node.DOCUMENT_POSITION_FOLLOWING
                              ? 1
                              : -1;
                          })
                          .forEach(function (t) {
                            var e = null;
                            null != t.nextSibling &&
                              (e = s.find(t.nextSibling));
                            var o = c(t);
                            (o.next == e && null != o.next) ||
                              (null != o.parent && o.parent.removeChild(n),
                              n.insertBefore(o, e || void 0));
                          });
                    }),
                    e
                  );
                })(a.default);
              function c(t) {
                var e = s.find(t);
                if (null == e)
                  try {
                    e = s.create(t);
                  } catch (n) {
                    (e = s.create(s.Scope.INLINE)),
                      [].slice.call(t.childNodes).forEach(function (t) {
                        e.domNode.appendChild(t);
                      }),
                      t.parentNode && t.parentNode.replaceChild(e.domNode, t),
                      e.attach();
                  }
                return e;
              }
              e.default = u;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(1),
                a = n(6),
                s = n(2),
                u = n(0),
                c = (function (t) {
                  function e(e) {
                    var n = t.call(this, e) || this;
                    return (n.attributes = new a.default(n.domNode)), n;
                  }
                  return (
                    r(e, t),
                    (e.formats = function (t) {
                      return (
                        "string" == typeof this.tagName ||
                        (Array.isArray(this.tagName)
                          ? t.tagName.toLowerCase()
                          : void 0)
                      );
                    }),
                    (e.prototype.format = function (t, e) {
                      var n = u.query(t);
                      n instanceof i.default
                        ? this.attributes.attribute(n, e)
                        : e &&
                          (null == n ||
                            (t === this.statics.blotName &&
                              this.formats()[t] === e) ||
                            this.replaceWith(t, e));
                    }),
                    (e.prototype.formats = function () {
                      var t = this.attributes.values(),
                        e = this.statics.formats(this.domNode);
                      return null != e && (t[this.statics.blotName] = e), t;
                    }),
                    (e.prototype.replaceWith = function (e, n) {
                      var o = t.prototype.replaceWith.call(this, e, n);
                      return this.attributes.copy(o), o;
                    }),
                    (e.prototype.update = function (e, n) {
                      var o = this;
                      t.prototype.update.call(this, e, n),
                        e.some(function (t) {
                          return (
                            t.target === o.domNode && "attributes" === t.type
                          );
                        }) && this.attributes.build();
                    }),
                    (e.prototype.wrap = function (n, o) {
                      var r = t.prototype.wrap.call(this, n, o);
                      return (
                        r instanceof e &&
                          r.statics.scope === this.statics.scope &&
                          this.attributes.move(r),
                        r
                      );
                    }),
                    e
                  );
                })(s.default);
              e.default = c;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(5),
                a = n(0),
                s = (function (t) {
                  function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                  }
                  return (
                    r(e, t),
                    (e.value = function (t) {
                      return !0;
                    }),
                    (e.prototype.index = function (t, e) {
                      return this.domNode === t ||
                        this.domNode.compareDocumentPosition(t) &
                          Node.DOCUMENT_POSITION_CONTAINED_BY
                        ? Math.min(e, 1)
                        : -1;
                    }),
                    (e.prototype.position = function (t, e) {
                      var n = [].indexOf.call(
                        this.parent.domNode.childNodes,
                        this.domNode
                      );
                      return t > 0 && (n += 1), [this.parent.domNode, n];
                    }),
                    (e.prototype.value = function () {
                      return (
                        ((t = {})[this.statics.blotName] =
                          this.statics.value(this.domNode) || !0),
                        t
                      );
                      var t;
                    }),
                    (e.scope = a.Scope.INLINE_BLOT),
                    e
                  );
                })(i.default);
              e.default = s;
            },
            function (t, e, n) {
              "use strict";
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = n(0),
                r = (function () {
                  function t(t) {
                    (this.domNode = t),
                      (this.domNode[o.DATA_KEY] = { blot: this });
                  }
                  return (
                    Object.defineProperty(t.prototype, "statics", {
                      get: function () {
                        return this.constructor;
                      },
                      enumerable: !0,
                      configurable: !0
                    }),
                    (t.create = function (t) {
                      if (null == this.tagName)
                        throw new o.ParchmentError(
                          "Blot definition missing tagName"
                        );
                      var e;
                      return (
                        Array.isArray(this.tagName)
                          ? ("string" == typeof t &&
                              ((t = t.toUpperCase()),
                              parseInt(t).toString() === t &&
                                (t = parseInt(t))),
                            (e =
                              "number" == typeof t
                                ? document.createElement(this.tagName[t - 1])
                                : this.tagName.indexOf(t) > -1
                                ? document.createElement(t)
                                : document.createElement(this.tagName[0])))
                          : (e = document.createElement(this.tagName)),
                        this.className && e.classList.add(this.className),
                        e
                      );
                    }),
                    (t.prototype.attach = function () {
                      null != this.parent && (this.scroll = this.parent.scroll);
                    }),
                    (t.prototype.clone = function () {
                      var t = this.domNode.cloneNode(!1);
                      return o.create(t);
                    }),
                    (t.prototype.detach = function () {
                      null != this.parent && this.parent.removeChild(this),
                        delete this.domNode[o.DATA_KEY];
                    }),
                    (t.prototype.deleteAt = function (t, e) {
                      this.isolate(t, e).remove();
                    }),
                    (t.prototype.formatAt = function (t, e, n, r) {
                      var i = this.isolate(t, e);
                      if (null != o.query(n, o.Scope.BLOT) && r) i.wrap(n, r);
                      else if (null != o.query(n, o.Scope.ATTRIBUTE)) {
                        var a = o.create(this.statics.scope);
                        i.wrap(a), a.format(n, r);
                      }
                    }),
                    (t.prototype.insertAt = function (t, e, n) {
                      var r = null == n ? o.create("text", e) : o.create(e, n),
                        i = this.split(t);
                      this.parent.insertBefore(r, i);
                    }),
                    (t.prototype.insertInto = function (t, e) {
                      void 0 === e && (e = null),
                        null != this.parent &&
                          this.parent.children.remove(this);
                      var n = null;
                      t.children.insertBefore(this, e),
                        null != e && (n = e.domNode),
                        (this.domNode.parentNode == t.domNode &&
                          this.domNode.nextSibling == n) ||
                          t.domNode.insertBefore(this.domNode, n),
                        (this.parent = t),
                        this.attach();
                    }),
                    (t.prototype.isolate = function (t, e) {
                      var n = this.split(t);
                      return n.split(e), n;
                    }),
                    (t.prototype.length = function () {
                      return 1;
                    }),
                    (t.prototype.offset = function (t) {
                      return (
                        void 0 === t && (t = this.parent),
                        null == this.parent || this == t
                          ? 0
                          : this.parent.children.offset(this) +
                            this.parent.offset(t)
                      );
                    }),
                    (t.prototype.optimize = function (t) {
                      null != this.domNode[o.DATA_KEY] &&
                        delete this.domNode[o.DATA_KEY].mutations;
                    }),
                    (t.prototype.remove = function () {
                      null != this.domNode.parentNode &&
                        this.domNode.parentNode.removeChild(this.domNode),
                        this.detach();
                    }),
                    (t.prototype.replace = function (t) {
                      null != t.parent &&
                        (t.parent.insertBefore(this, t.next), t.remove());
                    }),
                    (t.prototype.replaceWith = function (t, e) {
                      var n = "string" == typeof t ? o.create(t, e) : t;
                      return n.replace(this), n;
                    }),
                    (t.prototype.split = function (t, e) {
                      return 0 === t ? this : this.next;
                    }),
                    (t.prototype.update = function (t, e) {}),
                    (t.prototype.wrap = function (t, e) {
                      var n = "string" == typeof t ? o.create(t, e) : t;
                      return (
                        null != this.parent &&
                          this.parent.insertBefore(n, this.next),
                        n.appendChild(this),
                        n
                      );
                    }),
                    (t.blotName = "abstract"),
                    t
                  );
                })();
              e.default = r;
            },
            function (t, e, n) {
              "use strict";
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = n(1),
                r = n(7),
                i = n(8),
                a = n(0),
                s = (function () {
                  function t(t) {
                    (this.attributes = {}), (this.domNode = t), this.build();
                  }
                  return (
                    (t.prototype.attribute = function (t, e) {
                      e
                        ? t.add(this.domNode, e) &&
                          (null != t.value(this.domNode)
                            ? (this.attributes[t.attrName] = t)
                            : delete this.attributes[t.attrName])
                        : (t.remove(this.domNode),
                          delete this.attributes[t.attrName]);
                    }),
                    (t.prototype.build = function () {
                      var t = this;
                      this.attributes = {};
                      var e = o.default.keys(this.domNode),
                        n = r.default.keys(this.domNode),
                        s = i.default.keys(this.domNode);
                      e.concat(n)
                        .concat(s)
                        .forEach(function (e) {
                          var n = a.query(e, a.Scope.ATTRIBUTE);
                          n instanceof o.default &&
                            (t.attributes[n.attrName] = n);
                        });
                    }),
                    (t.prototype.copy = function (t) {
                      var e = this;
                      Object.keys(this.attributes).forEach(function (n) {
                        var o = e.attributes[n].value(e.domNode);
                        t.format(n, o);
                      });
                    }),
                    (t.prototype.move = function (t) {
                      var e = this;
                      this.copy(t),
                        Object.keys(this.attributes).forEach(function (t) {
                          e.attributes[t].remove(e.domNode);
                        }),
                        (this.attributes = {});
                    }),
                    (t.prototype.values = function () {
                      var t = this;
                      return Object.keys(this.attributes).reduce(function (
                        e,
                        n
                      ) {
                        return (e[n] = t.attributes[n].value(t.domNode)), e;
                      },
                      {});
                    }),
                    t
                  );
                })();
              e.default = s;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              function i(t, e) {
                return (t.getAttribute("class") || "")
                  .split(/\s+/)
                  .filter(function (t) {
                    return 0 === t.indexOf(e + "-");
                  });
              }
              Object.defineProperty(e, "__esModule", { value: !0 });
              var a = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                  r(e, t),
                  (e.keys = function (t) {
                    return (t.getAttribute("class") || "")
                      .split(/\s+/)
                      .map(function (t) {
                        return t.split("-").slice(0, -1).join("-");
                      });
                  }),
                  (e.prototype.add = function (t, e) {
                    return (
                      !!this.canAdd(t, e) &&
                      (this.remove(t),
                      t.classList.add(this.keyName + "-" + e),
                      !0)
                    );
                  }),
                  (e.prototype.remove = function (t) {
                    i(t, this.keyName).forEach(function (e) {
                      t.classList.remove(e);
                    }),
                      0 === t.classList.length && t.removeAttribute("class");
                  }),
                  (e.prototype.value = function (t) {
                    var e = (i(t, this.keyName)[0] || "").slice(
                      this.keyName.length + 1
                    );
                    return this.canAdd(t, e) ? e : "";
                  }),
                  e
                );
              })(n(1).default);
              e.default = a;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              function i(t) {
                var e = t.split("-"),
                  n = e
                    .slice(1)
                    .map(function (t) {
                      return t[0].toUpperCase() + t.slice(1);
                    })
                    .join("");
                return e[0] + n;
              }
              Object.defineProperty(e, "__esModule", { value: !0 });
              var a = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                  r(e, t),
                  (e.keys = function (t) {
                    return (t.getAttribute("style") || "")
                      .split(";")
                      .map(function (t) {
                        return t.split(":")[0].trim();
                      });
                  }),
                  (e.prototype.add = function (t, e) {
                    return (
                      !!this.canAdd(t, e) &&
                      ((t.style[i(this.keyName)] = e), !0)
                    );
                  }),
                  (e.prototype.remove = function (t) {
                    (t.style[i(this.keyName)] = ""),
                      t.getAttribute("style") || t.removeAttribute("style");
                  }),
                  (e.prototype.value = function (t) {
                    var e = t.style[i(this.keyName)];
                    return this.canAdd(t, e) ? e : "";
                  }),
                  e
                );
              })(n(1).default);
              e.default = a;
            },
            function (t, e, n) {
              t.exports = n(10);
            },
            function (t, e, n) {
              "use strict";
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = n(2),
                r = n(3),
                i = n(4),
                a = n(12),
                s = n(13),
                u = n(14),
                c = n(15),
                l = n(16),
                f = n(1),
                p = n(7),
                h = n(8),
                d = n(6),
                y = n(0),
                m = {
                  Scope: y.Scope,
                  create: y.create,
                  find: y.find,
                  query: y.query,
                  register: y.register,
                  Container: o.default,
                  Format: r.default,
                  Leaf: i.default,
                  Embed: c.default,
                  Scroll: a.default,
                  Block: u.default,
                  Inline: s.default,
                  Text: l.default,
                  Attributor: {
                    Attribute: f.default,
                    Class: p.default,
                    Style: h.default,
                    Store: d.default
                  }
                };
              e.default = m;
            },
            function (t, e, n) {
              "use strict";
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = (function () {
                function t() {
                  (this.head = this.tail = null), (this.length = 0);
                }
                return (
                  (t.prototype.append = function () {
                    for (var t = [], e = 0; e < arguments.length; e++)
                      t[e] = arguments[e];
                    this.insertBefore(t[0], null),
                      t.length > 1 && this.append.apply(this, t.slice(1));
                  }),
                  (t.prototype.contains = function (t) {
                    for (var e, n = this.iterator(); (e = n()); )
                      if (e === t) return !0;
                    return !1;
                  }),
                  (t.prototype.insertBefore = function (t, e) {
                    t &&
                      ((t.next = e),
                      null != e
                        ? ((t.prev = e.prev),
                          null != e.prev && (e.prev.next = t),
                          (e.prev = t),
                          e === this.head && (this.head = t))
                        : null != this.tail
                        ? ((this.tail.next = t),
                          (t.prev = this.tail),
                          (this.tail = t))
                        : ((t.prev = null), (this.head = this.tail = t)),
                      (this.length += 1));
                  }),
                  (t.prototype.offset = function (t) {
                    for (var e = 0, n = this.head; null != n; ) {
                      if (n === t) return e;
                      (e += n.length()), (n = n.next);
                    }
                    return -1;
                  }),
                  (t.prototype.remove = function (t) {
                    this.contains(t) &&
                      (null != t.prev && (t.prev.next = t.next),
                      null != t.next && (t.next.prev = t.prev),
                      t === this.head && (this.head = t.next),
                      t === this.tail && (this.tail = t.prev),
                      (this.length -= 1));
                  }),
                  (t.prototype.iterator = function (t) {
                    return (
                      void 0 === t && (t = this.head),
                      function () {
                        var e = t;
                        return null != t && (t = t.next), e;
                      }
                    );
                  }),
                  (t.prototype.find = function (t, e) {
                    void 0 === e && (e = !1);
                    for (var n, o = this.iterator(); (n = o()); ) {
                      var r = n.length();
                      if (
                        t < r ||
                        (e &&
                          t === r &&
                          (null == n.next || 0 !== n.next.length()))
                      )
                        return [n, t];
                      t -= r;
                    }
                    return [null, 0];
                  }),
                  (t.prototype.forEach = function (t) {
                    for (var e, n = this.iterator(); (e = n()); ) t(e);
                  }),
                  (t.prototype.forEachAt = function (t, e, n) {
                    if (!(e <= 0))
                      for (
                        var o,
                          r = this.find(t),
                          i = r[0],
                          a = t - r[1],
                          s = this.iterator(i);
                        (o = s()) && a < t + e;

                      ) {
                        var u = o.length();
                        t > a
                          ? n(o, t - a, Math.min(e, a + u - t))
                          : n(o, 0, Math.min(u, t + e - a)),
                          (a += u);
                      }
                  }),
                  (t.prototype.map = function (t) {
                    return this.reduce(function (e, n) {
                      return e.push(t(n)), e;
                    }, []);
                  }),
                  (t.prototype.reduce = function (t, e) {
                    for (var n, o = this.iterator(); (n = o()); ) e = t(e, n);
                    return e;
                  }),
                  t
                );
              })();
              e.default = o;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(2),
                a = n(0),
                s = {
                  attributes: !0,
                  characterData: !0,
                  characterDataOldValue: !0,
                  childList: !0,
                  subtree: !0
                },
                u = (function (t) {
                  function e(e) {
                    var n = t.call(this, e) || this;
                    return (
                      (n.scroll = n),
                      (n.observer = new MutationObserver(function (t) {
                        n.update(t);
                      })),
                      n.observer.observe(n.domNode, s),
                      n.attach(),
                      n
                    );
                  }
                  return (
                    r(e, t),
                    (e.prototype.detach = function () {
                      t.prototype.detach.call(this), this.observer.disconnect();
                    }),
                    (e.prototype.deleteAt = function (e, n) {
                      this.update(),
                        0 === e && n === this.length()
                          ? this.children.forEach(function (t) {
                              t.remove();
                            })
                          : t.prototype.deleteAt.call(this, e, n);
                    }),
                    (e.prototype.formatAt = function (e, n, o, r) {
                      this.update(),
                        t.prototype.formatAt.call(this, e, n, o, r);
                    }),
                    (e.prototype.insertAt = function (e, n, o) {
                      this.update(), t.prototype.insertAt.call(this, e, n, o);
                    }),
                    (e.prototype.optimize = function (e, n) {
                      var o = this;
                      void 0 === e && (e = []),
                        void 0 === n && (n = {}),
                        t.prototype.optimize.call(this, n);
                      for (
                        var r = [].slice.call(this.observer.takeRecords());
                        r.length > 0;

                      )
                        e.push(r.pop());
                      for (
                        var s = function (t, e) {
                            void 0 === e && (e = !0),
                              null != t &&
                                t !== o &&
                                null != t.domNode.parentNode &&
                                (null == t.domNode[a.DATA_KEY].mutations &&
                                  (t.domNode[a.DATA_KEY].mutations = []),
                                e && s(t.parent));
                          },
                          u = function (t) {
                            null != t.domNode[a.DATA_KEY] &&
                              null != t.domNode[a.DATA_KEY].mutations &&
                              (t instanceof i.default && t.children.forEach(u),
                              t.optimize(n));
                          },
                          c = e,
                          l = 0;
                        c.length > 0;
                        l += 1
                      ) {
                        if (l >= 100)
                          throw new Error(
                            "[Parchment] Maximum optimize iterations reached"
                          );
                        for (
                          c.forEach(function (t) {
                            var e = a.find(t.target, !0);
                            null != e &&
                              (e.domNode === t.target &&
                                ("childList" === t.type
                                  ? (s(a.find(t.previousSibling, !1)),
                                    [].forEach.call(t.addedNodes, function (t) {
                                      var e = a.find(t, !1);
                                      s(e, !1),
                                        e instanceof i.default &&
                                          e.children.forEach(function (t) {
                                            s(t, !1);
                                          });
                                    }))
                                  : "attributes" === t.type && s(e.prev)),
                              s(e));
                          }),
                            this.children.forEach(u),
                            r = (c = [].slice.call(
                              this.observer.takeRecords()
                            )).slice();
                          r.length > 0;

                        )
                          e.push(r.pop());
                      }
                    }),
                    (e.prototype.update = function (e, n) {
                      var o = this;
                      void 0 === n && (n = {}),
                        (e = e || this.observer.takeRecords())
                          .map(function (t) {
                            var e = a.find(t.target, !0);
                            return null == e
                              ? null
                              : null == e.domNode[a.DATA_KEY].mutations
                              ? ((e.domNode[a.DATA_KEY].mutations = [t]), e)
                              : (e.domNode[a.DATA_KEY].mutations.push(t), null);
                          })
                          .forEach(function (t) {
                            null != t &&
                              t !== o &&
                              null != t.domNode[a.DATA_KEY] &&
                              t.update(
                                t.domNode[a.DATA_KEY].mutations || [],
                                n
                              );
                          }),
                        null != this.domNode[a.DATA_KEY].mutations &&
                          t.prototype.update.call(
                            this,
                            this.domNode[a.DATA_KEY].mutations,
                            n
                          ),
                        this.optimize(e, n);
                    }),
                    (e.blotName = "scroll"),
                    (e.defaultChild = "block"),
                    (e.scope = a.Scope.BLOCK_BLOT),
                    (e.tagName = "DIV"),
                    e
                  );
                })(i.default);
              e.default = u;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(3),
                a = n(0),
                s = (function (t) {
                  function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                  }
                  return (
                    r(e, t),
                    (e.formats = function (n) {
                      if (n.tagName !== e.tagName)
                        return t.formats.call(this, n);
                    }),
                    (e.prototype.format = function (n, o) {
                      var r = this;
                      n !== this.statics.blotName || o
                        ? t.prototype.format.call(this, n, o)
                        : (this.children.forEach(function (t) {
                            t instanceof i.default ||
                              (t = t.wrap(e.blotName, !0)),
                              r.attributes.copy(t);
                          }),
                          this.unwrap());
                    }),
                    (e.prototype.formatAt = function (e, n, o, r) {
                      null != this.formats()[o] || a.query(o, a.Scope.ATTRIBUTE)
                        ? this.isolate(e, n).format(o, r)
                        : t.prototype.formatAt.call(this, e, n, o, r);
                    }),
                    (e.prototype.optimize = function (n) {
                      t.prototype.optimize.call(this, n);
                      var o = this.formats();
                      if (0 === Object.keys(o).length) return this.unwrap();
                      var r = this.next;
                      r instanceof e &&
                        r.prev === this &&
                        (function (t, e) {
                          if (Object.keys(t).length !== Object.keys(e).length)
                            return !1;
                          for (var n in t) if (t[n] !== e[n]) return !1;
                          return !0;
                        })(o, r.formats()) &&
                        (r.moveChildren(this), r.remove());
                    }),
                    (e.blotName = "inline"),
                    (e.scope = a.Scope.INLINE_BLOT),
                    (e.tagName = "SPAN"),
                    e
                  );
                })(i.default);
              e.default = s;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(3),
                a = n(0),
                s = (function (t) {
                  function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                  }
                  return (
                    r(e, t),
                    (e.formats = function (n) {
                      var o = a.query(e.blotName).tagName;
                      if (n.tagName !== o) return t.formats.call(this, n);
                    }),
                    (e.prototype.format = function (n, o) {
                      null != a.query(n, a.Scope.BLOCK) &&
                        (n !== this.statics.blotName || o
                          ? t.prototype.format.call(this, n, o)
                          : this.replaceWith(e.blotName));
                    }),
                    (e.prototype.formatAt = function (e, n, o, r) {
                      null != a.query(o, a.Scope.BLOCK)
                        ? this.format(o, r)
                        : t.prototype.formatAt.call(this, e, n, o, r);
                    }),
                    (e.prototype.insertAt = function (e, n, o) {
                      if (null == o || null != a.query(n, a.Scope.INLINE))
                        t.prototype.insertAt.call(this, e, n, o);
                      else {
                        var r = this.split(e),
                          i = a.create(n, o);
                        r.parent.insertBefore(i, r);
                      }
                    }),
                    (e.prototype.update = function (e, n) {
                      navigator.userAgent.match(/Trident/)
                        ? this.build()
                        : t.prototype.update.call(this, e, n);
                    }),
                    (e.blotName = "block"),
                    (e.scope = a.Scope.BLOCK_BLOT),
                    (e.tagName = "P"),
                    e
                  );
                })(i.default);
              e.default = s;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                  r(e, t),
                  (e.formats = function (t) {}),
                  (e.prototype.format = function (e, n) {
                    t.prototype.formatAt.call(this, 0, this.length(), e, n);
                  }),
                  (e.prototype.formatAt = function (e, n, o, r) {
                    0 === e && n === this.length()
                      ? this.format(o, r)
                      : t.prototype.formatAt.call(this, e, n, o, r);
                  }),
                  (e.prototype.formats = function () {
                    return this.statics.formats(this.domNode);
                  }),
                  e
                );
              })(n(4).default);
              e.default = i;
            },
            function (t, e, n) {
              "use strict";
              var o,
                r =
                  (this && this.__extends) ||
                  ((o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  function (t, e) {
                    function n() {
                      this.constructor = t;
                    }
                    o(t, e),
                      (t.prototype =
                        null === e
                          ? Object.create(e)
                          : ((n.prototype = e.prototype), new n()));
                  });
              Object.defineProperty(e, "__esModule", { value: !0 });
              var i = n(4),
                a = n(0),
                s = (function (t) {
                  function e(e) {
                    var n = t.call(this, e) || this;
                    return (n.text = n.statics.value(n.domNode)), n;
                  }
                  return (
                    r(e, t),
                    (e.create = function (t) {
                      return document.createTextNode(t);
                    }),
                    (e.value = function (t) {
                      var e = t.data;
                      return e.normalize && (e = e.normalize()), e;
                    }),
                    (e.prototype.deleteAt = function (t, e) {
                      this.domNode.data = this.text =
                        this.text.slice(0, t) + this.text.slice(t + e);
                    }),
                    (e.prototype.index = function (t, e) {
                      return this.domNode === t ? e : -1;
                    }),
                    (e.prototype.insertAt = function (e, n, o) {
                      null == o
                        ? ((this.text =
                            this.text.slice(0, e) + n + this.text.slice(e)),
                          (this.domNode.data = this.text))
                        : t.prototype.insertAt.call(this, e, n, o);
                    }),
                    (e.prototype.length = function () {
                      return this.text.length;
                    }),
                    (e.prototype.optimize = function (n) {
                      t.prototype.optimize.call(this, n),
                        (this.text = this.statics.value(this.domNode)),
                        0 === this.text.length
                          ? this.remove()
                          : this.next instanceof e &&
                            this.next.prev === this &&
                            (this.insertAt(this.length(), this.next.value()),
                            this.next.remove());
                    }),
                    (e.prototype.position = function (t, e) {
                      return void 0 === e && (e = !1), [this.domNode, t];
                    }),
                    (e.prototype.split = function (t, e) {
                      if ((void 0 === e && (e = !1), !e)) {
                        if (0 === t) return this;
                        if (t === this.length()) return this.next;
                      }
                      var n = a.create(this.domNode.splitText(t));
                      return (
                        this.parent.insertBefore(n, this.next),
                        (this.text = this.statics.value(this.domNode)),
                        n
                      );
                    }),
                    (e.prototype.update = function (t, e) {
                      var n = this;
                      t.some(function (t) {
                        return (
                          "characterData" === t.type && t.target === n.domNode
                        );
                      }) && (this.text = this.statics.value(this.domNode));
                    }),
                    (e.prototype.value = function () {
                      return this.text;
                    }),
                    (e.blotName = "text"),
                    (e.scope = a.Scope.INLINE_BLOT),
                    e
                  );
                })(i.default);
              e.default = s;
            }
          ]);
        }),
        (t.exports = o());
    },
    function (t, e, n) {
      (function (t, n) {
        var o = /^\[object .+?Constructor\]$/,
          r = /^(?:0|[1-9]\d*)$/,
          i = {};
        (i["[object Float32Array]"] =
          i["[object Float64Array]"] =
          i["[object Int8Array]"] =
          i["[object Int16Array]"] =
          i["[object Int32Array]"] =
          i["[object Uint8Array]"] =
          i["[object Uint8ClampedArray]"] =
          i["[object Uint16Array]"] =
          i["[object Uint32Array]"] =
            !0),
          (i["[object Arguments]"] =
            i["[object Array]"] =
            i["[object ArrayBuffer]"] =
            i["[object Boolean]"] =
            i["[object DataView]"] =
            i["[object Date]"] =
            i["[object Error]"] =
            i["[object Function]"] =
            i["[object Map]"] =
            i["[object Number]"] =
            i["[object Object]"] =
            i["[object RegExp]"] =
            i["[object Set]"] =
            i["[object String]"] =
            i["[object WeakMap]"] =
              !1);
        var a = "object" == typeof t && t && t.Object === Object && t,
          s = "object" == typeof self && self && self.Object === Object && self,
          u = a || s || Function("return this")(),
          c = e && !e.nodeType && e,
          l = c && "object" == typeof n && n && !n.nodeType && n,
          f = l && l.exports === c,
          p = f && a.process,
          h = (function () {
            try {
              var t = l && l.require && l.require("util").types;
              return t || (p && p.binding && p.binding("util"));
            } catch (t) {}
          })(),
          d = h && h.isTypedArray;
        function y(t, e, n) {
          switch (n.length) {
            case 0:
              return t.call(e);
            case 1:
              return t.call(e, n[0]);
            case 2:
              return t.call(e, n[0], n[1]);
            case 3:
              return t.call(e, n[0], n[1], n[2]);
          }
          return t.apply(e, n);
        }
        var m,
          v,
          b,
          _ = Array.prototype,
          g = Function.prototype,
          N = Object.prototype,
          O = u["__core-js_shared__"],
          x = g.toString,
          A = N.hasOwnProperty,
          w = (m = /[^.]+$/.exec((O && O.keys && O.keys.IE_PROTO) || ""))
            ? "Symbol(src)_1." + m
            : "",
          j = N.toString,
          E = x.call(Object),
          T = RegExp(
            "^" +
              x
                .call(A)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          S = f ? u.Buffer : void 0,
          P = u.Symbol,
          C = u.Uint8Array,
          B = S ? S.allocUnsafe : void 0,
          L =
            ((v = Object.getPrototypeOf),
            (b = Object),
            function (t) {
              return v(b(t));
            }),
          k = Object.create,
          I = N.propertyIsEnumerable,
          z = _.splice,
          D = P ? P.toStringTag : void 0,
          M = (function () {
            try {
              var t = lt(Object, "defineProperty");
              return t({}, "", {}), t;
            } catch (t) {}
          })(),
          R = S ? S.isBuffer : void 0,
          U = Math.max,
          q = Date.now,
          K = lt(u, "Map"),
          Y = lt(Object, "create"),
          W = (function () {
            function t() {}
            return function (e) {
              if (!Ot(e)) return {};
              if (k) return k(e);
              t.prototype = e;
              var n = new t();
              return (t.prototype = void 0), n;
            };
          })();
        function F(t) {
          var e = -1,
            n = null == t ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var o = t[e];
            this.set(o[0], o[1]);
          }
        }
        function V(t) {
          var e = -1,
            n = null == t ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var o = t[e];
            this.set(o[0], o[1]);
          }
        }
        function X(t) {
          var e = -1,
            n = null == t ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var o = t[e];
            this.set(o[0], o[1]);
          }
        }
        function $(t) {
          var e = (this.__data__ = new V(t));
          this.size = e.size;
        }
        function H(t, e) {
          var n = vt(t),
            o = !n && mt(t),
            r = !n && !o && _t(t),
            i = !n && !o && !r && At(t),
            a = n || o || r || i,
            s = a
              ? (function (t, e) {
                  for (var n = -1, o = Array(t); ++n < t; ) o[n] = e(n);
                  return o;
                })(t.length, String)
              : [],
            u = s.length;
          for (var c in t)
            (!e && !A.call(t, c)) ||
              (a &&
                ("length" == c ||
                  (r && ("offset" == c || "parent" == c)) ||
                  (i &&
                    ("buffer" == c ||
                      "byteLength" == c ||
                      "byteOffset" == c)) ||
                  ft(c, u))) ||
              s.push(c);
          return s;
        }
        function G(t, e, n) {
          ((void 0 !== n && !yt(t[e], n)) || (void 0 === n && !(e in t))) &&
            Z(t, e, n);
        }
        function Q(t, e, n) {
          var o = t[e];
          (A.call(t, e) && yt(o, n) && (void 0 !== n || e in t)) || Z(t, e, n);
        }
        function J(t, e) {
          for (var n = t.length; n--; ) if (yt(t[n][0], e)) return n;
          return -1;
        }
        function Z(t, e, n) {
          "__proto__" == e && M
            ? M(t, e, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
              })
            : (t[e] = n);
        }
        (F.prototype.clear = function () {
          (this.__data__ = Y ? Y(null) : {}), (this.size = 0);
        }),
          (F.prototype.delete = function (t) {
            var e = this.has(t) && delete this.__data__[t];
            return (this.size -= e ? 1 : 0), e;
          }),
          (F.prototype.get = function (t) {
            var e = this.__data__;
            if (Y) {
              var n = e[t];
              return "__lodash_hash_undefined__" === n ? void 0 : n;
            }
            return A.call(e, t) ? e[t] : void 0;
          }),
          (F.prototype.has = function (t) {
            var e = this.__data__;
            return Y ? void 0 !== e[t] : A.call(e, t);
          }),
          (F.prototype.set = function (t, e) {
            var n = this.__data__;
            return (
              (this.size += this.has(t) ? 0 : 1),
              (n[t] = Y && void 0 === e ? "__lodash_hash_undefined__" : e),
              this
            );
          }),
          (V.prototype.clear = function () {
            (this.__data__ = []), (this.size = 0);
          }),
          (V.prototype.delete = function (t) {
            var e = this.__data__,
              n = J(e, t);
            return (
              !(n < 0) &&
              (n == e.length - 1 ? e.pop() : z.call(e, n, 1), --this.size, !0)
            );
          }),
          (V.prototype.get = function (t) {
            var e = this.__data__,
              n = J(e, t);
            return n < 0 ? void 0 : e[n][1];
          }),
          (V.prototype.has = function (t) {
            return J(this.__data__, t) > -1;
          }),
          (V.prototype.set = function (t, e) {
            var n = this.__data__,
              o = J(n, t);
            return o < 0 ? (++this.size, n.push([t, e])) : (n[o][1] = e), this;
          }),
          (X.prototype.clear = function () {
            (this.size = 0),
              (this.__data__ = {
                hash: new F(),
                map: new (K || V)(),
                string: new F()
              });
          }),
          (X.prototype.delete = function (t) {
            var e = ct(this, t).delete(t);
            return (this.size -= e ? 1 : 0), e;
          }),
          (X.prototype.get = function (t) {
            return ct(this, t).get(t);
          }),
          (X.prototype.has = function (t) {
            return ct(this, t).has(t);
          }),
          (X.prototype.set = function (t, e) {
            var n = ct(this, t),
              o = n.size;
            return n.set(t, e), (this.size += n.size == o ? 0 : 1), this;
          }),
          ($.prototype.clear = function () {
            (this.__data__ = new V()), (this.size = 0);
          }),
          ($.prototype.delete = function (t) {
            var e = this.__data__,
              n = e.delete(t);
            return (this.size = e.size), n;
          }),
          ($.prototype.get = function (t) {
            return this.__data__.get(t);
          }),
          ($.prototype.has = function (t) {
            return this.__data__.has(t);
          }),
          ($.prototype.set = function (t, e) {
            var n = this.__data__;
            if (n instanceof V) {
              var o = n.__data__;
              if (!K || o.length < 199)
                return o.push([t, e]), (this.size = ++n.size), this;
              n = this.__data__ = new X(o);
            }
            return n.set(t, e), (this.size = n.size), this;
          });
        var tt,
          et = function (t, e, n) {
            for (var o = -1, r = Object(t), i = n(t), a = i.length; a--; ) {
              var s = i[tt ? a : ++o];
              if (!1 === e(r[s], s, r)) break;
            }
            return t;
          };
        function nt(t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : D && D in Object(t)
            ? (function (t) {
                var e = A.call(t, D),
                  n = t[D];
                try {
                  t[D] = void 0;
                  var o = !0;
                } catch (t) {}
                var r = j.call(t);
                o && (e ? (t[D] = n) : delete t[D]);
                return r;
              })(t)
            : (function (t) {
                return j.call(t);
              })(t);
        }
        function ot(t) {
          return xt(t) && "[object Arguments]" == nt(t);
        }
        function rt(t) {
          return (
            !(
              !Ot(t) ||
              (function (t) {
                return !!w && w in t;
              })(t)
            ) &&
            (gt(t) ? T : o).test(
              (function (t) {
                if (null != t) {
                  try {
                    return x.call(t);
                  } catch (t) {}
                  try {
                    return t + "";
                  } catch (t) {}
                }
                return "";
              })(t)
            )
          );
        }
        function it(t) {
          if (!Ot(t))
            return (function (t) {
              var e = [];
              if (null != t) for (var n in Object(t)) e.push(n);
              return e;
            })(t);
          var e = pt(t),
            n = [];
          for (var o in t)
            ("constructor" != o || (!e && A.call(t, o))) && n.push(o);
          return n;
        }
        function at(t, e, n, o, r) {
          t !== e &&
            et(
              e,
              function (i, a) {
                if ((r || (r = new $()), Ot(i)))
                  !(function (t, e, n, o, r, i, a) {
                    var s = ht(t, n),
                      u = ht(e, n),
                      c = a.get(u);
                    if (c) return void G(t, n, c);
                    var l = i ? i(s, u, n + "", t, e, a) : void 0,
                      f = void 0 === l;
                    if (f) {
                      var p = vt(u),
                        h = !p && _t(u),
                        d = !p && !h && At(u);
                      (l = u),
                        p || h || d
                          ? vt(s)
                            ? (l = s)
                            : xt((_ = s)) && bt(_)
                            ? (l = (function (t, e) {
                                var n = -1,
                                  o = t.length;
                                e || (e = Array(o));
                                for (; ++n < o; ) e[n] = t[n];
                                return e;
                              })(s))
                            : h
                            ? ((f = !1),
                              (l = (function (t, e) {
                                if (e) return t.slice();
                                var n = t.length,
                                  o = B ? B(n) : new t.constructor(n);
                                return t.copy(o), o;
                              })(u, !0)))
                            : d
                            ? ((f = !1),
                              (y = u),
                              (m = !0
                                ? ((v = y.buffer),
                                  (b = new v.constructor(v.byteLength)),
                                  new C(b).set(new C(v)),
                                  b)
                                : y.buffer),
                              (l = new y.constructor(
                                m,
                                y.byteOffset,
                                y.length
                              )))
                            : (l = [])
                          : (function (t) {
                              if (!xt(t) || "[object Object]" != nt(t))
                                return !1;
                              var e = L(t);
                              if (null === e) return !0;
                              var n = A.call(e, "constructor") && e.constructor;
                              return (
                                "function" == typeof n &&
                                n instanceof n &&
                                x.call(n) == E
                              );
                            })(u) || mt(u)
                          ? ((l = s),
                            mt(s)
                              ? (l = (function (t) {
                                  return (function (t, e, n, o) {
                                    var r = !n;
                                    n || (n = {});
                                    var i = -1,
                                      a = e.length;
                                    for (; ++i < a; ) {
                                      var s = e[i],
                                        u = o ? o(n[s], t[s], s, n, t) : void 0;
                                      void 0 === u && (u = t[s]),
                                        r ? Z(n, s, u) : Q(n, s, u);
                                    }
                                    return n;
                                  })(t, jt(t));
                                })(s))
                              : (Ot(s) && !gt(s)) ||
                                (l = (function (t) {
                                  return "function" != typeof t.constructor ||
                                    pt(t)
                                    ? {}
                                    : W(L(t));
                                })(u)))
                          : (f = !1);
                    }
                    var y, m, v, b;
                    var _;
                    f && (a.set(u, l), r(l, u, o, i, a), a.delete(u));
                    G(t, n, l);
                  })(t, e, a, n, at, o, r);
                else {
                  var s = o ? o(ht(t, a), i, a + "", t, e, r) : void 0;
                  void 0 === s && (s = i), G(t, a, s);
                }
              },
              jt
            );
        }
        function st(t, e) {
          return dt(
            (function (t, e, n) {
              return (
                (e = U(void 0 === e ? t.length - 1 : e, 0)),
                function () {
                  for (
                    var o = arguments,
                      r = -1,
                      i = U(o.length - e, 0),
                      a = Array(i);
                    ++r < i;

                  )
                    a[r] = o[e + r];
                  r = -1;
                  for (var s = Array(e + 1); ++r < e; ) s[r] = o[r];
                  return (s[e] = n(a)), y(t, this, s);
                }
              );
            })(t, e, St),
            t + ""
          );
        }
        function ut(t, e, n, o, r, i) {
          return (
            Ot(t) &&
              Ot(e) &&
              (i.set(e, t), at(t, e, void 0, ut, i), i.delete(e)),
            t
          );
        }
        function ct(t, e) {
          var n,
            o,
            r = t.__data__;
          return (
            "string" == (o = typeof (n = e)) ||
            "number" == o ||
            "symbol" == o ||
            "boolean" == o
              ? "__proto__" !== n
              : null === n
          )
            ? r["string" == typeof e ? "string" : "hash"]
            : r.map;
        }
        function lt(t, e) {
          var n = (function (t, e) {
            return null == t ? void 0 : t[e];
          })(t, e);
          return rt(n) ? n : void 0;
        }
        function ft(t, e) {
          var n = typeof t;
          return (
            !!(e = null == e ? 9007199254740991 : e) &&
            ("number" == n || ("symbol" != n && r.test(t))) &&
            t > -1 &&
            t % 1 == 0 &&
            t < e
          );
        }
        function pt(t) {
          var e = t && t.constructor;
          return t === (("function" == typeof e && e.prototype) || N);
        }
        function ht(t, e) {
          if (
            ("constructor" !== e || "function" != typeof t[e]) &&
            "__proto__" != e
          )
            return t[e];
        }
        var dt = (function (t) {
          var e = 0,
            n = 0;
          return function () {
            var o = q(),
              r = 16 - (o - n);
            if (((n = o), r > 0)) {
              if (++e >= 800) return arguments[0];
            } else e = 0;
            return t.apply(void 0, arguments);
          };
        })(
          M
            ? function (t, e) {
                return M(t, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value:
                    ((n = e),
                    function () {
                      return n;
                    }),
                  writable: !0
                });
                var n;
              }
            : St
        );
        function yt(t, e) {
          return t === e || (t != t && e != e);
        }
        var mt = ot(
            (function () {
              return arguments;
            })()
          )
            ? ot
            : function (t) {
                return xt(t) && A.call(t, "callee") && !I.call(t, "callee");
              },
          vt = Array.isArray;
        function bt(t) {
          return null != t && Nt(t.length) && !gt(t);
        }
        var _t =
          R ||
          function () {
            return !1;
          };
        function gt(t) {
          if (!Ot(t)) return !1;
          var e = nt(t);
          return (
            "[object Function]" == e ||
            "[object GeneratorFunction]" == e ||
            "[object AsyncFunction]" == e ||
            "[object Proxy]" == e
          );
        }
        function Nt(t) {
          return (
            "number" == typeof t &&
            t > -1 &&
            t % 1 == 0 &&
            t <= 9007199254740991
          );
        }
        function Ot(t) {
          var e = typeof t;
          return null != t && ("object" == e || "function" == e);
        }
        function xt(t) {
          return null != t && "object" == typeof t;
        }
        var At = d
          ? (function (t) {
              return function (e) {
                return t(e);
              };
            })(d)
          : function (t) {
              return xt(t) && Nt(t.length) && !!i[nt(t)];
            };
        var wt = st(function (t) {
          return t.push(void 0, ut), y(Tt, void 0, t);
        });
        function jt(t) {
          return bt(t) ? H(t, !0) : it(t);
        }
        var Et,
          Tt =
            ((Et = function (t, e, n, o) {
              at(t, e, n, o);
            }),
            st(function (t, e) {
              var n = -1,
                o = e.length,
                r = o > 1 ? e[o - 1] : void 0,
                i = o > 2 ? e[2] : void 0;
              for (
                r = Et.length > 3 && "function" == typeof r ? (o--, r) : void 0,
                  i &&
                    (function (t, e, n) {
                      if (!Ot(n)) return !1;
                      var o = typeof e;
                      return (
                        !!("number" == o
                          ? bt(n) && ft(e, n.length)
                          : "string" == o && (e in n)) && yt(n[e], t)
                      );
                    })(e[0], e[1], i) &&
                    ((r = o < 3 ? void 0 : r), (o = 1)),
                  t = Object(t);
                ++n < o;

              ) {
                var a = e[n];
                a && Et(t, a, n, r);
              }
              return t;
            }));
        function St(t) {
          return t;
        }
        n.exports = wt;
      }.call(this, n(2), n(3)(t)));
    },
    function (t, e) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    },
    function (t, e) {
      t.exports = function (t) {
        return (
          t.webpackPolyfill ||
            ((t.deprecate = function () {}),
            (t.paths = []),
            t.children || (t.children = []),
            Object.defineProperty(t, "loaded", {
              enumerable: !0,
              get: function () {
                return t.l;
              }
            }),
            Object.defineProperty(t, "id", {
              enumerable: !0,
              get: function () {
                return t.i;
              }
            }),
            (t.webpackPolyfill = 1)),
          t
        );
      };
    },
    function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "default", function () {
          return W;
        });
      var o = n(1),
        r = n.n(o),
        i = {
          modules: ["DisplaySize", "Toolbar", "Resize"],
          overlayStyles: {
            position: "absolute",
            boxSizing: "border-box",
            border: "1px dashed #444"
          },
          handleStyles: {
            position: "absolute",
            height: "12px",
            width: "12px",
            backgroundColor: "white",
            border: "1px solid #777",
            boxSizing: "border-box",
            opacity: "0.80"
          },
          displayStyles: {
            position: "absolute",
            font: "12px/1.0 Arial, Helvetica, sans-serif",
            padding: "4px 8px",
            textAlign: "center",
            backgroundColor: "white",
            color: "#333",
            border: "1px solid #777",
            boxSizing: "border-box",
            opacity: "0.80",
            cursor: "default"
          },
          toolbarStyles: {
            position: "absolute",
            top: "-12px",
            right: "0",
            left: "0",
            height: "0",
            minWidth: "100px",
            font: "12px/1.0 Arial, Helvetica, sans-serif",
            textAlign: "center",
            color: "#333",
            boxSizing: "border-box",
            cursor: "default"
          },
          toolbarButtonStyles: {
            display: "inline-block",
            width: "24px",
            height: "24px",
            background: "white",
            border: "1px solid #999",
            verticalAlign: "middle"
          },
          toolbarButtonSvgStyles: {
            fill: "#444",
            stroke: "#444",
            strokeWidth: "2"
          }
        };
      function a(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = n),
          t
        );
      }
      var s = function t(e) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          a(this, "onCreate", function () {}),
          a(this, "onDestroy", function () {}),
          a(this, "onUpdate", function () {}),
          (this.overlay = e.overlay),
          (this.img = e.img),
          (this.options = e.options),
          (this.requestUpdate = e.onUpdate);
      };
      function u(t) {
        return (u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function c(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function l(t, e) {
        return (l =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function f(t, e) {
        return !e || ("object" !== u(e) && "function" != typeof e) ? p(t) : e;
      }
      function p(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function h() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      }
      function d(t) {
        return (d = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      function y(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = n),
          t
        );
      }
      var m = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 }
            })),
              e && l(t, e);
          })(o, t);
          var e,
            n =
              ((e = o),
              function () {
                var t,
                  n = d(e);
                if (h()) {
                  var o = d(this).constructor;
                  t = Reflect.construct(n, arguments, o);
                } else t = n.apply(this, arguments);
                return f(this, t);
              });
          function o() {
            var t;
            c(this, o);
            for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++)
              r[i] = arguments[i];
            return (
              y(
                p((t = n.call.apply(n, [this].concat(r)))),
                "onCreate",
                function () {
                  (t.display = document.createElement("div")),
                    Object.assign(t.display.style, t.options.displayStyles),
                    t.overlay.appendChild(t.display);
                }
              ),
              y(p(t), "onDestroy", function () {}),
              y(p(t), "onUpdate", function () {
                if (t.display && t.img) {
                  var e = t.getCurrentSize();
                  if (
                    ((t.display.innerHTML = e.join(" &times; ")),
                    e[0] > 120 && e[1] > 30)
                  )
                    Object.assign(t.display.style, {
                      right: "4px",
                      bottom: "4px",
                      left: "auto"
                    });
                  else if ("right" == t.img.style.float) {
                    var n = t.display.getBoundingClientRect();
                    Object.assign(t.display.style, {
                      right: "auto",
                      bottom: "-".concat(n.height + 4, "px"),
                      left: "-".concat(n.width + 4, "px")
                    });
                  } else {
                    var o = t.display.getBoundingClientRect();
                    Object.assign(t.display.style, {
                      right: "-".concat(o.width + 4, "px"),
                      bottom: "-".concat(o.height + 4, "px"),
                      left: "auto"
                    });
                  }
                }
              }),
              y(p(t), "getCurrentSize", function () {
                return [
                  t.img.width,
                  Math.round(
                    (t.img.width / t.img.naturalWidth) * t.img.naturalHeight
                  )
                ];
              }),
              t
            );
          }
          return o;
        })(s),
        v = n(0),
        b = n.n(v),
        _ =
          '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>\n</svg>',
        g =
          '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>\n</svg>',
        N =
          '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>\n</svg>';
      function O(t) {
        return (O =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function x(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function A(t, e) {
        return (A =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function w(t, e) {
        return !e || ("object" !== O(e) && "function" != typeof e) ? j(t) : e;
      }
      function j(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function E() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      }
      function T(t) {
        return (T = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      function S(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = n),
          t
        );
      }
      var P = new b.a.Attributor.Style("float", "float"),
        C = new b.a.Attributor.Style("margin", "margin"),
        B = new b.a.Attributor.Style("display", "display");
      function L(t) {
        return (L =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function k(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function I(t, e) {
        return (I =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function z(t, e) {
        return !e || ("object" !== L(e) && "function" != typeof e) ? D(t) : e;
      }
      function D(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function M() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      }
      function R(t) {
        return (R = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      function U(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = n),
          t
        );
      }
      function q(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function K(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = n),
          t
        );
      }
      b.a.register(P), b.a.register(C), b.a.register(B);
      var Y = {
          DisplaySize: m,
          Toolbar: (function (t) {
            !(function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 }
              })),
                e && A(t, e);
            })(o, t);
            var e,
              n =
                ((e = o),
                function () {
                  var t,
                    n = T(e);
                  if (E()) {
                    var o = T(this).constructor;
                    t = Reflect.construct(n, arguments, o);
                  } else t = n.apply(this, arguments);
                  return w(this, t);
                });
            function o() {
              var t;
              x(this, o);
              for (
                var e = arguments.length, r = new Array(e), i = 0;
                i < e;
                i++
              )
                r[i] = arguments[i];
              return (
                S(
                  j((t = n.call.apply(n, [this].concat(r)))),
                  "onCreate",
                  function () {
                    (t.toolbar = document.createElement("div")),
                      Object.assign(t.toolbar.style, t.options.toolbarStyles),
                      t.overlay.appendChild(t.toolbar),
                      t._defineAlignments(),
                      t._addToolbarButtons();
                  }
                ),
                S(j(t), "onDestroy", function () {}),
                S(j(t), "onUpdate", function () {}),
                S(j(t), "_defineAlignments", function () {
                  t.alignments = [
                    {
                      icon: _,
                      apply: function () {
                        B.add(t.img, "inline"),
                          P.add(t.img, "left"),
                          C.add(t.img, "0 1em 1em 0");
                      },
                      isApplied: function () {
                        return "left" == P.value(t.img);
                      }
                    },
                    {
                      icon: g,
                      apply: function () {
                        B.add(t.img, "block"),
                          P.remove(t.img),
                          C.add(t.img, "auto");
                      },
                      isApplied: function () {
                        return "auto" == C.value(t.img);
                      }
                    },
                    {
                      icon: N,
                      apply: function () {
                        B.add(t.img, "inline"),
                          P.add(t.img, "right"),
                          C.add(t.img, "0 0 1em 1em");
                      },
                      isApplied: function () {
                        return "right" == P.value(t.img);
                      }
                    }
                  ];
                }),
                S(j(t), "_addToolbarButtons", function () {
                  var e = [];
                  t.alignments.forEach(function (n, o) {
                    var r = document.createElement("span");
                    e.push(r),
                      (r.innerHTML = n.icon),
                      r.addEventListener("click", function () {
                        e.forEach(function (t) {
                          return (t.style.filter = "");
                        }),
                          n.isApplied()
                            ? (P.remove(t.img),
                              C.remove(t.img),
                              B.remove(t.img))
                            : (t._selectButton(r), n.apply()),
                          t.requestUpdate();
                      }),
                      Object.assign(r.style, t.options.toolbarButtonStyles),
                      o > 0 && (r.style.borderLeftWidth = "0"),
                      Object.assign(
                        r.children[0].style,
                        t.options.toolbarButtonSvgStyles
                      ),
                      n.isApplied() && t._selectButton(r),
                      t.toolbar.appendChild(r);
                  });
                }),
                S(j(t), "_selectButton", function (t) {
                  t.style.filter = "invert(20%)";
                }),
                t
              );
            }
            return o;
          })(s),
          Resize: (function (t) {
            !(function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 }
              })),
                e && I(t, e);
            })(o, t);
            var e,
              n =
                ((e = o),
                function () {
                  var t,
                    n = R(e);
                  if (M()) {
                    var o = R(this).constructor;
                    t = Reflect.construct(n, arguments, o);
                  } else t = n.apply(this, arguments);
                  return z(this, t);
                });
            function o() {
              var t;
              k(this, o);
              for (
                var e = arguments.length, r = new Array(e), i = 0;
                i < e;
                i++
              )
                r[i] = arguments[i];
              return (
                U(
                  D((t = n.call.apply(n, [this].concat(r)))),
                  "onCreate",
                  function () {
                    (t.boxes = []),
                      t.addBox("nwse-resize"),
                      t.addBox("nesw-resize"),
                      t.addBox("nwse-resize"),
                      t.addBox("nesw-resize"),
                      t.positionBoxes();
                  }
                ),
                U(D(t), "onDestroy", function () {
                  t.deleteCursor();
                }),
                U(D(t), "positionBoxes", function () {
                  var e = "".concat(
                      -parseFloat(t.options.handleStyles.width) / 2,
                      "px"
                    ),
                    n = "".concat(
                      -parseFloat(t.options.handleStyles.height) / 2,
                      "px"
                    );
                  [
                    { left: e, top: n },
                    { right: e, top: n },
                    { right: e, bottom: n },
                    { left: e, bottom: n }
                  ].forEach(function (e, n) {
                    Object.assign(t.boxes[n].style, e);
                  });
                }),
                U(D(t), "addBox", function (e) {
                  var n = document.createElement("div");
                  Object.assign(n.style, t.options.handleStyles),
                    (n.style.cursor = e),
                    (n.style.width = "".concat(
                      t.options.handleStyles.width,
                      "px"
                    )),
                    (n.style.height = "".concat(
                      t.options.handleStyles.height,
                      "px"
                    )),
                    n.addEventListener("mousedown", t.handleMousedown, !1),
                    t.overlay.appendChild(n),
                    t.boxes.push(n);
                }),
                U(D(t), "handleMousedown", function (e) {
                  (t.dragBox = e.target),
                    (t.dragStartX = e.clientX),
                    (t.preDragWidth = t.img.width || t.img.naturalWidth),
                    t.setCursor(t.dragBox.style.cursor),
                    document.addEventListener("mousemove", t.handleDrag, !1),
                    document.addEventListener("mouseup", t.handleMouseup, !1);
                }),
                U(D(t), "handleMouseup", function () {
                  t.deleteCursor(),
                    document.removeEventListener("mousemove", t.handleDrag),
                    document.removeEventListener("mouseup", t.handleMouseup);
                }),
                U(D(t), "handleDrag", function (e) {
                  if (t.img) {
                    var n = e.clientX - t.dragStartX;
                    t.dragBox === t.boxes[0] || t.dragBox === t.boxes[3]
                      ? (t.img.width = Math.round(t.preDragWidth - n))
                      : (t.img.width = Math.round(t.preDragWidth + n)),
                      t.requestUpdate();
                  }
                }),
                U(D(t), "setCursor", function (e) {
                  [document.body, t.img].forEach(function (t) {
                    t.style.cursor = e;
                  });
                }),
                U(D(t), "deleteCursor", function () {
                  [document.body, t.img].forEach(function (t) {
                    t.style.removeProperty("cursor"),
                      0 == t.style.length && t.removeAttribute("style");
                  });
                }),
                t
              );
            }
            return o;
          })(s)
        },
        W = function t(e) {
          var n = this,
            o =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          q(this, t),
            K(this, "initializeModules", function () {
              n.removeModules(),
                (n.modules = n.moduleClasses.map(function (t) {
                  return new (Y[t] || t)(n);
                })),
                n.modules.forEach(function (t) {
                  t.onCreate();
                }),
                n.onUpdate();
            }),
            K(this, "onUpdate", function () {
              n.repositionElements(),
                n.modules.forEach(function (t) {
                  t.onUpdate();
                });
            }),
            K(this, "removeModules", function () {
              n.modules.forEach(function (t) {
                t.onDestroy();
              }),
                (n.modules = []);
            }),
            K(this, "handleClick", function (t) {
              if (
                t.target &&
                t.target.tagName &&
                "IMG" === t.target.tagName.toUpperCase()
              ) {
                if (n.img === t.target) return;
                n.img && n.hide(), n.show(t.target);
              } else n.img && n.hide();
            }),
            K(this, "show", function (t) {
              (n.img = t), n.showOverlay(), n.initializeModules();
            }),
            K(this, "showOverlay", function () {
              n.overlay && n.hideOverlay(),
                n.quill.setSelection(null),
                n.setUserSelect("none"),
                document.addEventListener("keyup", n.checkImage, !0),
                n.quill.root.addEventListener("input", n.checkImage, !0),
                (n.overlay = document.createElement("div")),
                Object.assign(n.overlay.style, n.options.overlayStyles),
                n.quill.root.parentNode.appendChild(n.overlay),
                n.repositionElements();
            }),
            K(this, "hideOverlay", function () {
              n.overlay &&
                (n.quill.root.parentNode.removeChild(n.overlay),
                (n.overlay = void 0),
                document.removeEventListener("keyup", n.checkImage),
                n.quill.root.removeEventListener("input", n.checkImage),
                n.setUserSelect(""));
            }),
            K(this, "repositionElements", function () {
              if (n.overlay && n.img) {
                var t = n.quill.root.parentNode,
                  e = n.img.getBoundingClientRect(),
                  o = t.getBoundingClientRect();
                Object.assign(n.overlay.style, {
                  left: "".concat(e.left - o.left - 1 + t.scrollLeft, "px"),
                  top: "".concat(e.top - o.top + t.scrollTop, "px"),
                  width: "".concat(e.width, "px"),
                  height: "".concat(e.height, "px")
                });
              }
            }),
            K(this, "hide", function () {
              n.hideOverlay(), n.removeModules(), (n.img = void 0);
            }),
            K(this, "setUserSelect", function (t) {
              [
                "userSelect",
                "mozUserSelect",
                "webkitUserSelect",
                "msUserSelect"
              ].forEach(function (e) {
                (n.quill.root.style[e] = t),
                  (document.documentElement.style[e] = t);
              });
            }),
            K(this, "checkImage", function (t) {
              n.img &&
                ((46 != t.keyCode && 8 != t.keyCode) ||
                  n.quill.find(n.img).deleteAt(0),
                n.hide());
            }),
            (this.quill = e);
          var a = !1;
          o.modules && (a = o.modules.slice()),
            (this.options = r()({}, o, i)),
            !1 !== a && (this.options.modules = a),
            document.execCommand("enableObjectResizing", !1, "false"),
            this.quill.root.addEventListener("click", this.handleClick, !1),
            (this.quill.root.parentNode.style.position =
              this.quill.root.parentNode.style.position || "relative"),
            (this.moduleClasses = this.options.modules),
            (this.modules = []);
        };
      window.Quill && window.Quill.register("modules/imageResize", W);
    }
  ]);
});

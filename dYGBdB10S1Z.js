/*FB_PKG_DELIM*/

__d(
  "BDHeaderConfig",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = "129477";
    f.ASBD_ID = a;
  },
  66
);
__d(
  "CometEnvironmentSite",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      NONE: 0,
      GENERIC_COMET: 1,
      COMET_ON_MOBILE: 2,
      COMET_ON_INSTAGRAM: 3,
      FB_ACCOUNTS_CENTER: 5,
      CANVAS: 6,
      IG_WWW: 7,
      FRL_ACCOUNTS_CENTER: 8,
      NOVI_CHECKOUT: 9,
      ENTERPRISE_CENTER: 10,
      BIZ_WEB: 11,
      BUSINESS_FB: 12,
      HORIZON_WORLDS: 14,
      FB_WEB: 15,
      WHATSAPP: 17,
      META_DOT_COM: 18,
      OCULUS_DOT_COM: 19,
      FRL_FAMILY_CENTER: 20,
      WHATSAPP_FAQ: 23,
      IG_ACCOUNTS_CENTER: 24,
      ADS_MANAGER_ON_BLUE: 25,
      MESSENGER_FAMILY_CENTER: 26,
      META_WORK_PORTFOLIO: 27,
      BARCELONA_WEB: 29,
      FB_FAMILY_CENTER: 30,
      CANDIDATE_PORTAL: 31,
      META_HELP: 32,
      FRL_AUTH: 33,
      META_LLAMA: 34,
      IG_GEN_AI_STUDIO: 35,
      FB_GEN_AI_STUDIO: 36,
      IG_FAMILY_CENTER: 37,
      IG_PRIVACY_CENTER: 38,
      IG_HELP_CENTER: 39,
      ABOUT_META: 40,
      IG_GEN_AI_IMAGINE: 41,
      FB_GEN_AI_IMAGINE: 42,
      INTERNALFB: 43,
      COMMERCE_MANAGER: 44,
      QUEST_DEV_CENTER: 45,
      ABRA: 46,
      META_BUG_BOUNTY: 47,
      CTRL_VERSE_DATA_COLLECTION: 48,
      META_CONTENT_LIBRARY_UI: 49,
      SUPPORT_PORTAL: 50,
      MSE_RATING_TOOL: 51,
      MEDIA_PORTAL: 52,
      COMMERCE_PERMISSION_WIZARD: 53,
      SA_DEMO_BOOKING: 55,
      COMMERCE_EXTENSION: 56,
      FB_PRIVACY_CENTER: 57,
      ADS_MANAGER_ON_COMET: 58,
      FB_HELP_CENTER: 59,
      MONETIZATION_DOGFOODING: 61,
      AI_DEMOS: 62,
      DEVELOPER_PLATFORM: 63,
      PARTNERSHIP_ADS_HUB: 64,
      INSTAGRAM_ABOUT: 65,
      TRANSPARENCY: 66,
      BUSINESS_USER_PROFILE_MANAGED_ACCOUNT: 67,
      WHATSAPP_FLOWS: 68,
    });
    f["default"] = a;
  },
  66
);
__d(
  "CometLruCache",
  ["recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = (function () {
      function a(a, b) {
        (this.$1 = a),
          (this.$2 = b),
          a <= 0 &&
            c("recoverableViolation")(
              "CometLruCache: Unable to create instance of cache with zero or negative capacity.",
              "CometLruCache"
            ),
          (this.$3 = new Map());
      }
      var b = a.prototype;
      b.set = function (a, b) {
        this.$3["delete"](a);
        this.$3.set(a, { timestamp: Date.now(), value: b });
        if (this.$3.size > this.$1) {
          a = this.$3.keys().next();
          a.done || this.$3["delete"](a.value);
        }
      };
      b.get = function (a) {
        var b = this.$3.get(a);
        if (b != null) {
          if (Date.now() > b.timestamp + this.$2) {
            this.$3["delete"](a);
            return null;
          }
          this.$3["delete"](a);
          this.$3.set(a, b);
          return b.value;
        }
        return null;
      };
      b.has = function (a) {
        return this.$3.has(a);
      };
      b["delete"] = function (a) {
        this.$3["delete"](a);
      };
      b.size = function () {
        return this.$3.size;
      };
      b.capacity = function () {
        return this.$1 - this.$3.size;
      };
      b.clear = function () {
        this.$3.clear();
      };
      return a;
    })();
    function a(a, b) {
      b === void 0 && (b = Number.MAX_SAFE_INTEGER);
      return new h(a, b);
    }
    g.create = a;
  },
  98
);
__d(
  "structuredClone",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = (a = window) == null ? void 0 : a.structuredClone;
    f["default"] = b;
  },
  66
);
__d(
  "ConstUriUtils",
  [
    "CometLruCache",
    "ExecutionEnvironment",
    "FBLogger",
    "PHPQuerySerializer",
    "PHPQuerySerializerNoEncoding",
    "URIRFC3986",
    "URISchemes",
    "UriNeedRawQuerySVConfig",
    "isSameOrigin",
    "nullthrows",
    "recoverableViolation",
    "structuredClone",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = d("CometLruCache").create(5e3),
      m = new RegExp("(^|\\.)facebook\\.com$", "i"),
      n = new RegExp("(^|\\.)messenger\\.com$", "i"),
      o = new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),
      p = new RegExp(
        "[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"
      ),
      q = c("UriNeedRawQuerySVConfig").uris.map(function (a) {
        return { domain: a, valid: x(a) };
      }),
      r = [],
      s = [];
    function t(a, b) {
      var d = {};
      if (a != null)
        for (
          var a = a.entries(),
            e = Array.isArray(a),
            f = 0,
            a = e
              ? a
              : a[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var g;
          if (e) {
            if (f >= a.length) break;
            g = a[f++];
          } else {
            f = a.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          d[g[0]] = g[1];
        }
      else
        c("FBLogger")("ConstUriUtils").warn(
          "Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue."
        );
      return b.serialize(d);
    }
    function u(a, b, d) {
      var e = k || (k = c("PHPQuerySerializer"));
      if (["http", "https"].includes(b) && v(a)) {
        if (a.includes("doubleclick.net") && d != null && !d.startsWith("http"))
          return e;
        e = c("PHPQuerySerializerNoEncoding");
      }
      return e;
    }
    function v(a) {
      return (
        a != null &&
        q.some(function (b) {
          return b.valid && w(a, b.domain);
        })
      );
    }
    function w(a, b) {
      if (b === "" || a === "") return !1;
      if (a.endsWith(b)) {
        b = a.length - b.length - 1;
        if (b === -1 || a[b] === ".") return !0;
      }
      return !1;
    }
    function x(a) {
      return !p.test(a);
    }
    function y(a, b) {
      var c =
        b.protocol != null && b.protocol !== "" ? b.protocol : a.getProtocol();
      c = b.domain != null ? u(b.domain, c) : a.getSerializer();
      c = {
        domain: a.getDomain(),
        fragment: a.getFragment(),
        fragmentSeparator: a.hasFragmentSeparator(),
        isGeneric: a.isGeneric(),
        originalRawQuery: a.getOriginalRawQuery(),
        path: a.getPath(),
        port: a.getPort(),
        protocol: a.getProtocol(),
        queryParams: a.getQueryParams(),
        serializer: c,
        subdomain: a.getSubdomain(),
      };
      a = babelHelpers["extends"]({}, c, b);
      c = b.queryParams != null && b.queryParams.size !== 0;
      return D.getUribyObject(a, c);
    }
    function z(a, b, c, d) {
      c === void 0 && (c = !1);
      var e =
          a.protocol !== "" ? a.protocol + ":" + (a.isGeneric ? "" : "//") : "",
        f = a.domain !== "" ? a.domain : "",
        g = a.port !== "" ? ":" + a.port : "",
        h =
          a.path !== ""
            ? a.path
            : (e !== "" && e !== "mailto:") || f !== "" || g !== ""
            ? "/"
            : "";
      c = A(
        f,
        a.originalRawQuery,
        a.queryParams,
        b,
        c,
        (b = d) != null ? b : a.serializer
      );
      d = c.length > 0 ? "?" : "";
      b = a.fragment !== "" ? "#" + a.fragment : "";
      a = a.fragment === "" && a.fragmentSeparator ? "#" : "";
      return "" + e + f + g + h + d + c + a + b;
    }
    function A(a, b, c, d, e, f) {
      e === void 0 && (e = !1);
      if (!d && (e || v(a))) {
        return (d = b) != null ? d : "";
      }
      return t(c, f);
    }
    function B(a) {
      var b = a.trim();
      b = (h || (h = d("URIRFC3986"))).parse(b) || {
        fragment: null,
        host: null,
        isGenericURI: !1,
        query: null,
        scheme: null,
        userinfo: null,
      };
      var c = b.host || "",
        e = c.split(".");
      e = e.length >= 3 ? e[0] : "";
      var f = u(c, b.scheme || "", b.query),
        g = f.deserialize(b.query || "") || {};
      g = new Map(Object.entries(g));
      g = C(
        {
          domain: c,
          fragment: b.fragment || "",
          fragmentSeparator: b.fragment === "",
          isGeneric: b.isGenericURI,
          originalRawQuery: b.query,
          path: b.path || "",
          port: b.port != null ? String(b.port) : "",
          protocol: (b.scheme || "").toLowerCase(),
          queryParams: g,
          serializer: f,
          subdomain: e,
          userInfo: (c = b == null ? void 0 : b.userinfo) != null ? c : "",
        },
        a
      );
      return g;
    }
    function C(a, b, c, e) {
      c === void 0 &&
        (c = (j || (j = d("URISchemes"))).Options.INCLUDE_DEFAULTS);
      var f = {
          components: babelHelpers["extends"]({}, a),
          error: "",
          valid: !0,
        },
        g = f.components;
      if (!(j || (j = d("URISchemes"))).isAllowed(a.protocol, c, e)) {
        f.valid = !1;
        f.error =
          'The URI protocol "' + String(a.protocol) + '" is not allowed.';
        return f;
      }
      if (!x(a.domain || "")) {
        f.valid = !1;
        f.error = "This is an unsafe domain " + String(a.domain);
        return f;
      }
      g.port = (a.port != null && String(a.port)) || "";
      if (Boolean(a.userInfo)) {
        f.valid = !1;
        f.error =
          "Invalid URI: (userinfo is not allowed in a URI " +
          String(a.userInfo) +
          ")";
        return f;
      }
      c = b != null && b !== "" ? b : z(g, !1);
      if (g.domain === "" && g.path.indexOf("\\") !== -1) {
        f.valid = !1;
        f.error =
          "Invalid URI: (no domain but multiple back-slashes " + c + ")";
        return f;
      }
      if (!g.protocol && o.test(c)) {
        f.valid = !1;
        f.error = "Invalid URI: (unsafe protocol-relative URI " + c + ")";
        return f;
      }
      if (g.domain !== "" && g.path !== "" && !g.path.startsWith("/")) {
        f.valid = !1;
        f.error =
          "Invalid URI: (domain and pathwhere path lacks leading slash " +
          c +
          ")";
        return f;
      }
      return f;
    }
    var D = (function () {
      function a(a) {
        (this.queryParams = new Map()),
          (this.domain = a.domain),
          (this.fragment = a.fragment),
          (this.fragmentSeparator = Boolean(a.fragmentSeparator)),
          (this.isGenericProtocol = Boolean(a.isGeneric)),
          (this.path = a.path),
          (this.originalRawQuery = a.originalRawQuery),
          (this.port = a.port),
          (this.protocol = a.protocol),
          (this.queryParams = a.queryParams),
          (this.serializer = a.serializer),
          (this.subdomain = a.subdomain);
      }
      var b = a.prototype;
      b.addQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return y(this, { queryParams: c });
        }
        return this;
      };
      b.addQueryParams = function (a) {
        if (a.size > 0) {
          var b = this.getQueryParams();
          a.forEach(function (a, c) {
            b.set(c, a);
          });
          return y(this, { queryParams: b });
        }
        return this;
      };
      b.addQueryParamString = function (a) {
        if (Boolean(a)) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return y(this, { queryParams: b });
        }
        return this;
      };
      b.addTrailingSlash = function () {
        var a = this.getPath();
        return a.length > 0 && a[a.length - 1] !== "/"
          ? this.setPath(a + "/")
          : this;
      };
      b.getDomain = function () {
        return this.domain;
      };
      b.getFragment = function () {
        return this.fragment;
      };
      b.getOrigin = function () {
        var a = this.getPort();
        return (
          this.getProtocol() + "://" + this.getDomain() + (a ? ":" + a : "")
        );
      };
      b.getOriginalRawQuery = function () {
        return this.originalRawQuery;
      };
      b.getPath = function () {
        return this.path;
      };
      b.getPort = function () {
        return this.port;
      };
      b.getProtocol = function () {
        return this.protocol.toLowerCase();
      };
      b.getQualifiedUri = function () {
        if (!this.getDomain()) {
          var b;
          b =
            (b = typeof window !== "undefined" ? window : self) == null
              ? void 0
              : (b = b.location) == null
              ? void 0
              : b.href;
          if (b == null) {
            c("FBLogger")("ConstUriUtils")
              .blameToPreviousFile()
              .warn(
                "Cannot get qualified URI for current URI as there is no current location"
              );
            return null;
          }
          (i || (i = c("ExecutionEnvironment"))).isInWorker &&
            b.startsWith("blob:") &&
            (b = b.substring(5, b.length));
          b = b.slice(0, b.indexOf("/", b.indexOf(":") + 3));
          return a.getUri(b + this.toString());
        }
        return this;
      };
      b.getQueryParam = function (a) {
        a = this.queryParams.get(a);
        if (typeof a === "string") return a;
        else {
          a = JSON.stringify(a);
          return a == null ? a : JSON.parse(a);
        }
      };
      b.getQueryData = function () {
        return Object.fromEntries(this.getQueryParams());
      };
      b.getQueryParams = function () {
        if (c("structuredClone") != null)
          return c("structuredClone")(this.queryParams);
        var a = JSON.stringify(Array.from(this.queryParams), function (a, b) {
          return Array.isArray(b)
            ? { __CUUArr: !0, value: babelHelpers["extends"]({}, b) }
            : b;
        });
        a = JSON.parse(a, function (a, b) {
          return b != null && typeof b === "object" && b.__CUUArr
            ? Object.keys(b.value).reduce(function (a, c) {
                a[c] = b.value[c];
                return a;
              }, [])
            : b;
        });
        return new Map(a);
      };
      b.getQueryString = function (a) {
        a === void 0 && (a = !1);
        return A(
          this.domain,
          this.originalRawQuery,
          this.queryParams,
          !1,
          a,
          this.serializer
        );
      };
      b.getRegisteredDomain = function () {
        if (!this.getDomain()) return "";
        if (!this.isFacebookUri()) return null;
        var a = this.getDomain().split("."),
          b = a.indexOf("facebook");
        b === -1 && (b = a.indexOf("workplace"));
        return a.slice(b).join(".");
      };
      b.getSerializer = function () {
        return this.serializer;
      };
      b.getSubdomain = function () {
        return this.subdomain;
      };
      b.getUnqualifiedUri = function () {
        if (this.getDomain()) {
          var b = this.toString();
          return a.getUri(b.slice(b.indexOf("/", b.indexOf(":") + 3)));
        }
        return this;
      };
      a.getUri = function (b) {
        b = b.trim();
        var d = l.get(b);
        if (d == null) {
          var e = B(b);
          if (e.valid) (d = new a(e.components)), l.set(b, d);
          else {
            c("FBLogger")("ConstUriUtils").blameToPreviousFrame().warn(e.error);
            return null;
          }
        }
        return d;
      };
      a.getUriOrThrow = function (b) {
        return c("nullthrows")(a.getUri(b));
      };
      a.getUribyObject = function (b, d) {
        var e = z(b, d),
          f = l.get(e);
        if (f == null) {
          d && (b.originalRawQuery = t(b.queryParams, b.serializer));
          d = C(b);
          if (d.valid) (f = new a(d.components)), l.set(e, f);
          else {
            c("recoverableViolation")(d.error, "ConstUri");
            return null;
          }
        }
        return f;
      };
      b.hasFragmentSeparator = function () {
        return this.fragmentSeparator;
      };
      b.isEmpty = function () {
        return !(
          this.getPath() ||
          this.getProtocol() ||
          this.getDomain() ||
          this.getPort() ||
          this.queryParams.size > 0 ||
          this.getFragment()
        );
      };
      b.isFacebookUri = function () {
        var a = this.toString();
        if (a === "") return !1;
        return !this.getDomain() && !this.getProtocol()
          ? !0
          : ["https", "http"].indexOf(this.getProtocol()) !== -1 &&
              (m.test(this.getDomain()) || n.test(this.getDomain()));
      };
      b.isGeneric = function () {
        return this.isGenericProtocol;
      };
      b.isSameOrigin = function (a) {
        return c("isSameOrigin")(this, a);
      };
      b.isSubdomainOfDomain = function (b) {
        var c = a.getUri(b);
        return c != null && w(this.domain, b);
      };
      b.isSecure = function () {
        return this.getProtocol() === "https";
      };
      b.removeQueryParams = function (a) {
        if (Array.isArray(a) && a.length > 0) {
          var b = this.getQueryParams();
          a.map(function (a) {
            return b["delete"](a);
          });
          return y(this, { queryParams: b });
        }
        return this;
      };
      b.removeQueryParam = function (a) {
        if (Boolean(a)) {
          var b = this.getQueryParams();
          b["delete"](a);
          return y(this, { queryParams: b });
        }
        return this;
      };
      b.removeSubdomain = function () {
        var a = this.getQualifiedUri();
        if (a == null) return null;
        var b = a.getDomain();
        b = b.split(".");
        b.length >= 3 && (b = b.slice(-2));
        return y(a, { domain: b.join("."), subdomain: "" });
      };
      b.replaceQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return y(this, { queryParams: c });
        }
        return this;
      };
      b.replaceQueryParams = function (a) {
        return y(this, { queryParams: a });
      };
      b.replaceQueryParamString = function (a) {
        if (a != null) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return y(this, { queryParams: b });
        }
        return this;
      };
      b.setDomain = function (a) {
        if (Boolean(a)) {
          var b = a.split(".");
          b = b.length >= 3 ? b[0] : "";
          return y(this, { domain: a, subdomain: b });
        }
        return this;
      };
      b.setFragment = function (a) {
        return a === "#"
          ? y(this, { fragment: "", fragmentSeparator: !0 })
          : y(this, { fragment: a, fragmentSeparator: a !== "" });
      };
      b.setPath = function (a) {
        return a != null ? y(this, { path: a }) : this;
      };
      b.setPort = function (a) {
        return Boolean(a) ? y(this, { port: a }) : this;
      };
      b.setProtocol = function (a) {
        return Boolean(a) ? y(this, { protocol: a }) : this;
      };
      b.setSecure = function (a) {
        return this.setProtocol(a ? "https" : "http");
      };
      b.setSubDomain = function (a) {
        if (Boolean(a)) {
          var b = this.getQualifiedUri();
          if (b == null) return null;
          var c = b.getDomain();
          c = c.split(".");
          c.length >= 3 ? (c[0] = a) : c.unshift(a);
          return y(b, { domain: c.join("."), subdomain: a });
        }
        return this;
      };
      b.stripTrailingSlash = function () {
        return this.setPath(this.getPath().replace(/\/$/, ""));
      };
      a.$1 = function (a) {
        a = a;
        for (var b = 0; b < r.length; b++) {
          var c = r[b];
          a = c(a);
        }
        return a;
      };
      a.$2 = function (a, b) {
        b = b;
        for (var c = 0; c < s.length; c++) {
          var d = s[c];
          b = d(a, b);
        }
        return b;
      };
      b.$3 = function (b, c) {
        c === void 0 && (c = !1);
        return z(
          {
            domain: a.$1(this.domain),
            fragment: this.fragment,
            fragmentSeparator: this.fragmentSeparator,
            isGeneric: this.isGenericProtocol,
            originalRawQuery: this.originalRawQuery,
            path: this.path,
            port: this.port,
            protocol: this.protocol,
            queryParams: a.$2(this.domain, this.queryParams),
            serializer: b,
            subdomain: this.subdomain,
            userInfo: "",
          },
          !1,
          c
        );
      };
      b.toStringRawQuery = function () {
        this.rawStringValue == null &&
          (this.rawStringValue = this.$3(c("PHPQuerySerializerNoEncoding")));
        return this.rawStringValue;
      };
      b.toString = function () {
        this.stringValue == null &&
          (this.stringValue = this.$3(this.serializer));
        return this.stringValue;
      };
      b.toStringPreserveQuery = function () {
        return this.$3(this.serializer, !0);
      };
      a.isValidUri = function (b) {
        var c = l.get(b);
        if (c != null) return !0;
        c = B(b);
        if (c.valid) {
          l.set(b, new a(c.components));
          return !0;
        }
        return !1;
      };
      return a;
    })();
    function a(a) {
      if (a instanceof D) return a;
      else return null;
    }
    function b(a) {
      r.push(a);
    }
    function e(a) {
      s.push(a);
    }
    f = D.getUri;
    var E = D.getUriOrThrow,
      F = D.isValidUri;
    g.isSubdomainOfDomain = w;
    g.isConstUri = a;
    g.registerDomainFilter = b;
    g.registerQueryParamsFilter = e;
    g.getUri = f;
    g.getUriOrThrow = E;
    g.isValidUri = F;
  },
  98
);
__d(
  "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "EventListener",
  ["cr:5695"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:5695");
  },
  98
);
__d(
  "FalcoConsentChecker",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function g(a, b, c, d) {
      var e;
      switch (typeof d) {
        case "string":
          e = a[String(d)];
          return !e ? !1 : e <= b;
        case "number":
          return g(a, b, c, c[Number(d)]);
        default:
          e = !1;
          if (Array.isArray(d)) {
            var f = d[0];
            for (var h = 1; h < d.length; h++) {
              e = g(a, b, c, d[h]);
              if (e) {
                if (f === "or") return !0;
              } else if (f === "and") return !1;
            }
          }
          return e;
      }
    }
    f["default"] = g;
  },
  66
);
__d(
  "OdsWebBatchFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1838142");
    b = d("FalcoLoggerInternal").create("ods_web_batch", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "pageID",
  ["WebSession"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = d("WebSession").getPageId_DO_NOT_USE();
    g["default"] = a;
  },
  98
);
__d(
  "WebStorageMutex",
  ["WebStorage", "clearTimeout", "pageID", "setTimeout"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = null,
      j = !1,
      k = c("pageID");
    function l() {
      j || ((j = !0), (i = (h || (h = c("WebStorage"))).getLocalStorage()));
      return i;
    }
    a = (function () {
      function a(a) {
        this.name = a;
      }
      a.testSetPageID = function (a) {
        k = a;
      };
      var b = a.prototype;
      b.$2 = function () {
        var a,
          b = l();
        if (!b) return k;
        b = b.getItem("mutex_" + this.name);
        b = ((a = b) != null ? a : "").split(":");
        return b && parseInt(b[1], 10) >= Date.now() ? b[0] : null;
      };
      b.$3 = function (a) {
        var b = l();
        if (!b) return;
        a = a == null ? 1e3 : a;
        a = Date.now() + a;
        (h || (h = c("WebStorage"))).setItemGuarded(
          b,
          "mutex_" + this.name,
          k + ":" + a
        );
      };
      b.hasLock = function () {
        return this.$2() === k;
      };
      b.lock = function (a, b, d) {
        var e = this;
        this.$1 && c("clearTimeout")(this.$1);
        k === (this.$2() || k) && this.$3(d);
        this.$1 = c("setTimeout")(function () {
          e.$1 = null;
          var c = e.hasLock() ? a : b;
          c && c(e);
        }, 0);
      };
      b.unlock = function () {
        this.$1 && c("clearTimeout")(this.$1);
        var a = l();
        a && this.hasLock() && a.removeItem("mutex_" + this.name);
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "guid",
  [],
  function (a, b, c, d, e, f) {
    function a() {
      if (
        typeof crypto === "object" &&
        typeof crypto.getRandomValues === "function" &&
        typeof String.prototype.padStart === "function"
      ) {
        var a = crypto.getRandomValues(new Uint32Array(2));
        return (
          "f" +
          a[0].toString(16).padStart(8, "0") +
          a[1].toString(16).padStart(8, "0")
        );
      }
      return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "");
    }
    f["default"] = a;
  },
  66
);
__d(
  "PersistedQueue",
  [
    "AnalyticsCoreData",
    "BaseEventEmitter",
    "ExecutionEnvironment",
    "Run",
    "WebStorage",
    "WebStorageMutex",
    "cr:8958",
    "err",
    "guid",
    "nullthrows",
    "performanceAbsoluteNow",
    "requestAnimationFrame",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = 24 * 60 * 60 * 1e3,
      m = 30 * 1e3,
      n = new (c("BaseEventEmitter"))(),
      o;
    function p(a) {
      a === void 0 && (a = !1);
      if (o === void 0) {
        var b;
        if (
          ((b = (h || (h = c("AnalyticsCoreData")))
            .queue_activation_experiment) != null
            ? b
            : !1) &&
          a
        )
          try {
            return (i || (i = c("WebStorage"))).getLocalStorageForRead();
          } catch (a) {
            return null;
          }
        b = "check_quota";
        try {
          a = (i || (i = c("WebStorage"))).getLocalStorage();
          a ? (a.setItem(b, b), a.removeItem(b), (o = a)) : (o = null);
        } catch (a) {
          o = null;
        }
      }
      return o;
    }
    function q(a) {
      var b = a.prev,
        c = a.next;
      c && (c.prev = b);
      b && (b.next = c);
      a.next = null;
      a.prev = null;
    }
    function r(a) {
      return { item: a, next: null, prev: null };
    }
    function s(a, b) {
      return (
        a +
        "^$" +
        ((a = b == null ? void 0 : b.queueNameSuffix) != null ? a : "")
      );
    }
    var t = {},
      u = {},
      v = {},
      w = !1;
    a = (function () {
      function a(a, b) {
        var d,
          e = this;
        this.$7 = 0;
        this.$3 = a;
        this.$5 = (d = b == null ? void 0 : b.queueNameSuffix) != null ? d : "";
        this.$15 = b == null ? void 0 : b.application;
        this.$4 = s(a, b);
        this.$11 = this.$4 + "^$" + c("guid")();
        this.$14 = !1;
        if (b) {
          this.$8 = (d = b.max_age_in_ms) != null ? d : l;
          this.$12 = b.migrate;
          this.$13 = b.onLoad;
        } else this.$8 = l;
        this.$9 = [
          n.addListener("active", function () {
            (e.$10 != null || !e.$14) &&
              ((e.$14 = !0), (e.$10 = null), e.$16());
          }),
          n.addListener("inactive", function () {
            e.$10 == null && ((e.$10 = Date.now()), e.$17());
          }),
        ];
        ((j || (j = c("ExecutionEnvironment"))).canUseDOM ||
          (j || (j = c("ExecutionEnvironment"))).isInWorker) &&
          c("requestAnimationFrame")(function () {
            return e.$16();
          });
      }
      var d = a.prototype;
      d.isActive = function () {
        var a = this.$10;
        if (a == null) return !0;
        if (Date.now() - a > m) {
          this.$10 = null;
          n.emit("active", null);
          return !0;
        }
        return !1;
      };
      d.$16 = function () {
        this.$18(), this.$19();
      };
      d.$17 = function () {
        this.$20();
      };
      d.getFullName = function () {
        return this.$4;
      };
      d.getQueueNameSuffix = function () {
        return this.$5;
      };
      a.isQueueActivateExperiment = function () {
        return w;
      };
      a.setOnQueueActivateExperiment = function () {
        w = !0;
      };
      a.create = function (b, d) {
        var e = s(b, d);
        if (e in t) throw c("err")("Duplicate queue created: " + b);
        d = new a(b, d);
        t[e] = d;
        v[b] ? v[b].push(d) : (v[b] = [d]);
        e = u[b];
        e && d.setHandler(e);
        return d;
      };
      a.setHandler = function (a, b) {
        if (v[a]) {
          var c = v[a];
          for (
            var c = c,
              d = Array.isArray(c),
              e = 0,
              c = d
                ? c
                : c[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var f;
            if (d) {
              if (e >= c.length) break;
              f = c[e++];
            } else {
              e = c.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            f.setHandler(b);
          }
        }
        u[a] = b;
      };
      d.destroy = function () {
        this.$9.forEach(function (a) {
          return a.remove();
        });
      };
      a.destroy = function (a, b) {
        a = s(a, b);
        t[a].destroy();
        delete t[a];
      };
      d.setHandler = function (a) {
        this.$6 = a;
        this.$19();
        return this;
      };
      d.$19 = function () {
        this.$7 > 0 && this.$6 && this.$6(this);
      };
      d.length = function () {
        return this.$7;
      };
      d.enumeratedLength = function () {
        return this.$21().length;
      };
      a.isPersistenceAllowed = function () {
        var a = p();
        return !a ? !1 : !0;
      };
      a.getSuffixesForKey = function (a) {
        var b = [];
        try {
          var c = p(!0);
          if (!c) return b;
          a = a + "^$";
          for (var d = 0; d < c.length; d++) {
            var e = c.key(d);
            if (typeof e === "string" && e.startsWith("mutex_falco_"))
              c.removeItem(e);
            else if (typeof e === "string" && e.startsWith(a)) {
              e = e.split("^$");
              if (e.length > 2) {
                e = e[1];
                b.push(e);
              } else b.push("");
            }
          }
        } catch (a) {}
        return b;
      };
      d.$18 = function () {
        var d,
          e = this,
          a = p(!0);
        if (!a) return;
        var f = this.$4 + "^$";
        d = new (c("WebStorageMutex"))((d = this.$15) != null ? d : f);
        var g = this.$12,
          h = this.$13;
        d.lock(function (d) {
          var i = Date.now() - e.$8;
          try {
            for (var j = 0; j < a.length; j++) {
              var k = a.key(j);
              if (typeof k === "string" && k.startsWith(f)) {
                var l = a.getItem(k);
                a.removeItem(k);
                if (l != null && l.startsWith("{")) {
                  k = b("cr:8958").parse(c("nullthrows")(l));
                  if (k.ts > i)
                    try {
                      for (
                        var l = k.items,
                          k = Array.isArray(l),
                          m = 0,
                          l = k
                            ? l
                            : l[
                                typeof Symbol === "function"
                                  ? Symbol.iterator
                                  : "@@iterator"
                              ]();
                        ;

                      ) {
                        var n;
                        if (k) {
                          if (m >= l.length) break;
                          n = l[m++];
                        } else {
                          m = l.next();
                          if (m.done) break;
                          n = m.value;
                        }
                        n = n;
                        g != null ? g(n) : n;
                        n = h != null ? h(n) : n;
                        e.$22(n);
                      }
                    } catch (a) {}
                }
              }
            }
          } catch (a) {}
          d.unlock();
          e.$19();
        });
      };
      d.$20 = function () {
        var a = p();
        if (!a) return;
        var d = this.$21();
        if (d.length === 0) {
          a.getItem(this.$11) != null && a.removeItem(this.$11);
          return;
        }
        (i || (i = c("WebStorage"))).setItemGuarded(
          a,
          this.$11,
          b("cr:8958").stringify({
            items: d.map(function (a) {
              return a;
            }),
            ts: (k || (k = c("performanceAbsoluteNow")))(),
          })
        );
      };
      d.$21 = function () {
        var a = this.$1,
          b = [];
        if (!a) return b;
        do b.push(a.item);
        while ((a = a.prev));
        return b.reverse();
      };
      d.markItemAsCompleted = function (a) {
        var b = a.prev;
        q(a);
        this.$1 === a && (this.$1 = b);
        this.$7--;
        this.isActive() || this.$20();
      };
      d.markItemAsFailed = function (a) {
        q(a);
        var b = this.$2;
        if (b) {
          var c = b.prev;
          c && ((c.next = a), (a.prev = c));
          a.next = b;
          b.prev = a;
        }
        this.$2 = a;
        this.isActive() && this.$19();
      };
      d.markItem = function (a, b) {
        b ? this.markItemAsCompleted(a) : this.markItemAsFailed(a);
      };
      d.$22 = function (a) {
        a = r(a);
        var b = this.$1;
        b && ((b.next = a), (a.prev = b));
        this.$1 = a;
        this.$2 || (this.$2 = a);
        this.$7++;
      };
      d.wrapAndEnqueueItem = function (a) {
        this.$22(a), this.isActive() ? this.$19() : this.$20();
      };
      d.dequeueItem = function () {
        if (this.$10 != null) return null;
        var a = this.$2;
        if (!a) return null;
        this.$2 = a.next;
        return a;
      };
      return a;
    })();
    a.eventEmitter = n;
    if ((j || (j = c("ExecutionEnvironment"))).canUseDOM) {
      var x = d("Run").maybeOnBeforeUnload(function () {
        n.emit("inactive", null), x == null ? void 0 : x.remove();
      }, !1);
      if (!x)
        var y = d("Run").onUnload(function () {
          n.emit("inactive", null), y.remove();
        });
    }
    g["default"] = a;
  },
  98
);
__d(
  "ServerTime",
  ["ServerTimeData"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = 0;
    f = 0;
    var j = null;
    h =
      (h = (typeof window !== "undefined" ? window : self).performance) == null
        ? void 0
        : h.timing;
    if (h) {
      var k = h.requestStart;
      h = h.domLoading;
      if (k && h) {
        var l =
          c("ServerTimeData").timeOfResponseStart -
          c("ServerTimeData").timeOfRequestStart;
        k = h - k - l;
        f = k / 2;
        l = h - c("ServerTimeData").timeOfResponseStart - f;
        h = Math.max(50, k * 0.8);
        Math.abs(l) > h && ((i = l), (j = Date.now()));
      }
    } else d(c("ServerTimeData").serverTime);
    function a() {
      return Date.now() - i;
    }
    function b() {
      return i;
    }
    function d(a) {
      a = Date.now() - a;
      Math.abs(i - a) > 6e4 && ((i = a), (j = Date.now()));
    }
    function e() {
      return j === null ? null : Date.now() - j;
    }
    f = a;
    k = b;
    g.getMillis = a;
    g.getOffsetMillis = b;
    g.update = d;
    g.getMillisSinceLastUpdate = e;
    g.get = f;
    g.getSkew = k;
  },
  98
);
__d(
  "FalcoLoggerInternal",
  [
    "AnalyticsCoreData",
    "BaseEventEmitter",
    "FBLogger",
    "FalcoConsentChecker",
    "FalcoUtils",
    "PersistedQueue",
    "Promise",
    "Random",
    "ServerTime",
    "WebSession",
    "nullthrows",
    "performanceAbsoluteNow",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k = (f = d("FalcoUtils")).getTaggedBitmap(33),
      l = f.getTaggedBitmap(0),
      m = f.getTaggedBitmap(37),
      n = 500 * 1024 * 0.6,
      o = new Map();
    function p(a) {
      var b;
      a.tags = d("FalcoUtils").xorBitmap((b = a.tags) != null ? b : [0, 0], k);
      return a;
    }
    function a(a, b) {
      var d;
      d = (d = c("PersistedQueue").getSuffixesForKey(a)) != null ? d : [];
      d.push(b);
      for (
        var d = d,
          e = Array.isArray(d),
          f = 0,
          d = e
            ? d
            : d[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        var g, h;
        if (e) {
          if (f >= d.length) break;
          h = d[f++];
        } else {
          f = d.next();
          if (f.done) break;
          h = f.value;
        }
        h = h;
        var j = a + "^$" + h;
        if (o.has(j)) continue;
        g = (
          (g = (i || (i = c("AnalyticsCoreData"))).use_falco_as_mutex_key) !=
          null
            ? g
            : !1
        )
          ? c("PersistedQueue").create(a, {
              onLoad: p,
              queueNameSuffix: h,
              application: "falco",
            })
          : c("PersistedQueue").create(a, { onLoad: p, queueNameSuffix: h });
        o.set(j, g);
      }
      return c("nullthrows")(o.get(a + "^$" + b));
    }
    f = f.identityToString((i || (i = c("AnalyticsCoreData"))).identity);
    var q = a("falco_queue_log", f),
      r = a("falco_queue_immediately", f),
      s = a("falco_queue_critical", f),
      t = new (c("BaseEventEmitter"))(),
      u = {};
    function v(a, b, e) {
      var f = c("Random").coinflip(b.r);
      if (!f) {
        d("FalcoUtils").bumpODSMetrics(e, "event.filters.sampling", 1);
        return !1;
      }
      f = b.c;
      if (f != null && (i || (i = c("AnalyticsCoreData"))).consents != null) {
        b = w(f, (i || (i = c("AnalyticsCoreData"))).consents, a);
        if (!b) {
          d("FalcoUtils").bumpODSMetrics(e, "event.filters.consent", 1);
          return !1;
        }
      }
      return !0;
    }
    function w(a, b, d) {
      var e = u[a];
      e == null && (e = u[a] = JSON.parse(a));
      return c("FalcoConsentChecker")(b, d, e, e[0]);
    }
    function x() {
      return (
        (j || (j = c("performanceAbsoluteNow")))() -
        d("ServerTime").getOffsetMillis()
      );
    }
    function y(a, b, d, e, f, g) {
      if ((i || (i = c("AnalyticsCoreData"))).enable_observer) {
        a = babelHelpers["extends"](
          { name: a, time: b, sampled: d, getData: f, policy: e },
          g && { getPrivacyContext: g }
        );
        t.emit("event", a);
      }
    }
    function z(a, b, e, f, g, h) {
      var j;
      g = JSON.stringify(g);
      if (g.length > n) {
        d("FalcoUtils").bumpODSMetrics(a, "event.filters.exceeded_size", 1);
        c("FBLogger")("falco", "oversized_message:" + a).warn(
          'Dropping event "%s" due to exceeding the max size %s at %s',
          a,
          n,
          g.length
        );
        return;
      }
      var k = d("FalcoUtils").xorBitmap([0, 0], l);
      k = d("FalcoUtils").xorBitmap(k, m);
      (
        (j = (i || (i = c("AnalyticsCoreData"))).enable_session_id_bug_fix) !=
        null
          ? j
          : !1
      )
        ? h.wrapAndEnqueueItem({
            name: a,
            policy: b,
            time: e,
            extra: g,
            privacyContext: f,
            tags: k,
            sessionId: d("WebSession").getId(),
            deviceId: (i || (i = c("AnalyticsCoreData"))).device_id,
          })
        : (h.wrapAndEnqueueItem({
            name: a,
            policy: b,
            time: e,
            extra: g,
            privacyContext: f,
            tags: k,
          }),
          d("FalcoUtils").bumpODSMetrics(a, "event.captured", 1));
    }
    function A(a, b, c, e, f) {
      try {
        var g = x();
        d("FalcoUtils").bumpODSMetrics(a, "event.logged", 1);
        var h = v(g, b, a);
        if (h) {
          var i = e(),
            j = c && c();
          z(a, b, g, j, i, f);
        }
        y(a, g, h, b, e, c);
      } catch (a) {
        C(a);
      }
    }
    function B(a, c, e, f, g) {
      try {
        var i = x();
        d("FalcoUtils").bumpODSMetrics(a, "event.logged", 1);
        var j = v(i, c, a);
        if (j) {
          var k = f(),
            l = (h || (h = b("Promise"))).resolve(e && e());
          return h.all([k, l]).then(function (b) {
            var d = b[0],
              e = b[1];
            z(a, c, i, e, d, g);
            y(
              a,
              i,
              j,
              c,
              function () {
                return d;
              },
              e &&
                function () {
                  return e;
                }
            );
          });
        } else {
          y(a, i, j, c, f, e);
          return (h || (h = b("Promise"))).resolve();
        }
      } catch (a) {
        return (h || (h = b("Promise"))).reject(a);
      }
    }
    function C(a) {
      var b = c("FBLogger")("falco");
      a instanceof Error
        ? b.catching(a).warn("Error while attempting to log to Falco")
        : b.warn(
            "Caught non-error while attempting to log to Falco: %s",
            JSON.stringify(a)
          );
    }
    function e(a, b) {
      return {
        log: function (c, d) {
          A(a, b, d, c, q);
        },
        logAsync: function (c, d) {
          B(a, b, d, c, q)["catch"](C);
        },
        logImmediately: function (c, d) {
          A(a, b, d, c, r);
        },
        logCritical: function (c, d) {
          A(a, b, d, c, s);
        },
        logRealtimeEvent: function (c, d) {
          A(a, b, d, c, s);
        },
      };
    }
    g.observable = t;
    g.create = e;
  },
  98
);
__d(
  "FalcoUtils",
  ["AnalyticsCoreData", "ODS"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = "ods_web_batch";
    function a(a) {
      if (a) {
        var b = a.fbIdentity,
          c = a.appScopedIdentity;
        a = a.claim;
        var d = "";
        if (b) {
          var e = b.accountId;
          b = b.actorId;
          d = e + "^#" + b + "^#";
        } else c !== void 0 && (d = "^#^#" + c);
        return d + "^#" + a;
      }
      return "";
    }
    function b(a) {
      return a > 30 ? [0, 1 << (a - 30)] : [1 << a, 0];
    }
    function e(a, b) {
      return [a[0] | b[0], a[1] | b[1]];
    }
    function f(a, b, e) {
      if (a === j) return;
      (i || (i = d("ODS"))).bumpEntityKey(
        7173,
        "entities.ff_js_web." +
          a +
          "." +
          (h || (h = c("AnalyticsCoreData"))).app_id +
          "." +
          ((a = (h || (h = c("AnalyticsCoreData"))).app_version) != null
            ? a
            : "0"
          ).split(".")[0] +
          "." +
          h.push_phase,
        b,
        e
      );
    }
    g.identityToString = a;
    g.getTaggedBitmap = b;
    g.xorBitmap = e;
    g.bumpODSMetrics = f;
  },
  98
);
__d(
  "ODS",
  [
    "ExecutionEnvironment",
    "OdsWebBatchFalcoEvent",
    "Random",
    "Run",
    "clearTimeout",
    "gkx",
    "setTimeout",
    "unrecoverableViolation",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j =
        (h || (h = c("ExecutionEnvironment"))).canUseDOM ||
        (h || c("ExecutionEnvironment")).isInWorker,
      k = {};
    function l(a, b, c, d, e) {
      var f;
      d === void 0 && (d = 1);
      e === void 0 && (e = 1);
      var g = (f = k[b]) != null ? f : null;
      if (g != null && g <= 0) return;
      i = i || {};
      var h = i[a] || (i[a] = {}),
        j = h[b] || (h[b] = {}),
        l = j[c] || (j[c] = { n: 0, d: null }),
        m = Number(d),
        o = Number(e);
      g > 0 && ((m /= g), (o /= g));
      if (!isFinite(m) || !isFinite(o)) return;
      l.n += m;
      if (arguments.length >= 5) {
        var p = l.d;
        p == null && (p = 0);
        l.d = p + o;
      }
      n();
    }
    var m;
    function n() {
      if (m != null) return;
      m = c("setTimeout")(
        function () {
          o();
        },
        c("gkx")("20935") ? 13e3 / 2 : 5e3
      );
    }
    function a(a, b) {
      if (!j) return;
      k[a] = d("Random").random() < b ? b : 0;
    }
    function b(a, b, c, d) {
      d === void 0 && (d = 1);
      if (!j) return;
      l(a, b, c, d);
    }
    function e(a, b, c, d, e) {
      d === void 0 && (d = 1);
      e === void 0 && (e = 1);
      if (!j) return;
      l(a, b, c, d, e);
    }
    function o(a) {
      a === void 0 && (a = "normal");
      if (!j) return;
      c("clearTimeout")(m);
      m = null;
      if (i == null) return;
      var b = i;
      i = null;
      function d() {
        return { batch: b };
      }
      a === "critical"
        ? c("OdsWebBatchFalcoEvent").logCritical(d)
        : c("OdsWebBatchFalcoEvent").log(d);
    }
    j &&
      d("Run").onUnload(function () {
        o("critical");
      });
    g.setEntitySample = a;
    g.bumpEntityKey = b;
    g.bumpFraction = e;
    g.flush = o;
  },
  98
);
__d(
  "RDRequireDeferredReference",
  ["RequireDeferredReference"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      b.disableForSSR_DO_NOT_USE = function () {
        this.$RDRequireDeferredReference1 = !1;
      };
      var c = b.prototype;
      c.isAvailableInSSR_DO_NOT_USE = function () {
        return this.constructor.$RDRequireDeferredReference1;
      };
      return b;
    })(c("RequireDeferredReference"));
    a.$RDRequireDeferredReference1 = !0;
    g["default"] = a;
  },
  98
);
__d(
  "react-forget-runtime",
  [
    "invariant",
    "CometEnvironmentSite",
    "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE",
    "FBLogger",
    "SiteData",
    "err",
    "gkx",
    "justknobx",
    "qex",
  ],
  function (a, b, c, d, e, f, g, h) {
    var i = null,
      j = null,
      k = !1,
      l = a.console,
      m = [],
      n = {};
    a = c("gkx")("21075");
    var o = "Jest-Only Fatal: ",
      p = a ? o : "";
    function q(a) {
      if (!k) {
        var b = c("err")(o + a);
        l.error(o + a + "\n" + b.stack);
        k = !0;
        c("FBLogger")("React").warn(
          "React compiler guard functions used in production."
        );
      }
    }
    [
      "useCallback",
      "useContext",
      "useEffect",
      "useImperativeHandle",
      "useInsertionEffect",
      "useLayoutEffect",
      "useMemo",
      "useReducer",
      "useRef",
      "useState",
      "useDebugValue",
      "useDeferredValue",
      "useTransition",
      "useMutableSource",
      "useSyncExternalStore",
      "useId",
      "useCacheRefresh",
      "useOptimistic",
    ].forEach(function (a) {
      n[a] = function () {
        var a =
          "[React] Unexpected React hook call {name} from a React Forget compiled function. Check that all hooks are called directly and named according to convention ('use[A-Z]') ";
        q(a);
      };
    });
    var r = [
      "useMemoCache",
      "unstable_useMemoCache",
      "readContext",
      "unstable_isNewReconciler",
      "getCacheSignal",
      "getCacheForType",
      "use",
    ];
    a = function () {
      var a = r[s];
      n[a] = function () {
        if (j == null)
          throw c("FBLogger")("React").mustfixThrow(
            "React Forget internal error: unexpected null dispatcher"
          );
        else {
          var b;
          return (b = j)[a].apply(b, arguments);
        }
      };
    };
    for (var s = 0; s < r.length; s++) a();
    function b(a) {
      if (!c("gkx")("21076")) return;
      i.H == null;
      var b = i.H;
      if (b == null) return;
      if (a === 0) {
        m.push(b);
        m.length === 1 && (j = b);
        if (b === n) {
          var d =
            "[React] Unexpected call to custom hook or component from a React Forget compiled function. Check that (1) all hooks are called directly and named according to convention ('use[A-Z]') and (2) components are returned as JSX instead of being directly invoked.";
          q(d);
        }
        i.H = n;
      } else if (a === 1) {
        d = m.pop();
        if (d == null)
          throw c("FBLogger")("React").mustfixThrow(
            "React Forget internal error: unexpected null in guard stack"
          );
        m.length === 0 && (j = null);
        i.H = d;
      } else if (a === 2) m.push(b), j != null && (i.H = j);
      else if (a === 3) {
        d = m.pop();
        if (d == null)
          throw c("FBLogger")("React").mustfixThrow(
            "React Forget internal error: unexpected null in guard stack"
          );
        i.H = d;
      }
    }
    var t, u;
    function d(a) {
      (v = a.isValidElement),
        (i = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE),
        (u = a.unstable_useContextWithBailout),
        (t = a.useContext);
    }
    a = !1;
    function e(a, b) {
      l.log(a, b);
    }
    var v = null;
    function w(a) {
      return (a = v == null ? void 0 : v(a)) != null ? a : !1;
    }
    var x = new Set();
    function f(a, b, d, e, f, g) {
      function i(a, b, c, h) {
        c =
          p +
          "Forget change detection: " +
          f +
          ":" +
          g +
          " [" +
          e +
          "]: " +
          d +
          c +
          " changed from " +
          a +
          " to " +
          b +
          " (depth " +
          h +
          ")";
        if (x.has(c)) return;
        x.add(c);
        l.error(c);
      }
      var j = 2;
      function k(a, b, d, e) {
        if (e > j) return;
        else if (a === b) return;
        else if (typeof a !== typeof b)
          i("type " + typeof a, "type " + typeof b, d, e);
        else if (typeof a === "object") {
          typeof b === "object" || h(0, 18576);
          if (a === null || b === null)
            (a !== null || b !== null) &&
              i(
                "type " + (a === null ? "null" : "object"),
                "type " + (b === null ? "null" : "object"),
                d,
                e
              );
          else if (a instanceof Map)
            if (!(b instanceof Map)) i("Map instance", "other value", d, e);
            else if (a.size !== b.size)
              i(
                "Map instance with size " + a.size,
                "Map instance with size " + b.size,
                d,
                e
              );
            else
              for (
                var f = a,
                  g = Array.isArray(f),
                  l = 0,
                  f = g
                    ? f
                    : f[
                        typeof Symbol === "function"
                          ? Symbol.iterator
                          : "@@iterator"
                      ]();
                ;

              ) {
                var m;
                if (g) {
                  if (l >= f.length) break;
                  m = f[l++];
                } else {
                  l = f.next();
                  if (l.done) break;
                  m = l.value;
                }
                m = m;
                var n = m[0];
                m = m[1];
                !b.has(n)
                  ? i(
                      "Map instance with key " + String(n),
                      "Map instance without key " + String(m),
                      d,
                      e
                    )
                  : k(m, b.get(n), d + ".get(" + String(n) + ")", e + 1);
              }
          else if (b instanceof Map) i("other value", "Map instance", d, e);
          else if (a instanceof Set)
            if (!(b instanceof Set)) i("Set instance", "other value", d, e);
            else if (a.size !== b.size)
              i(
                "Set instance with size " + a.size,
                "Set instance with size " + b.size,
                d,
                e
              );
            else
              for (
                m = b,
                  n = Array.isArray(m),
                  l = 0,
                  m = n
                    ? m
                    : m[
                        typeof Symbol === "function"
                          ? Symbol.iterator
                          : "@@iterator"
                      ]();
                ;

              ) {
                if (n) {
                  if (l >= m.length) break;
                  g = m[l++];
                } else {
                  l = m.next();
                  if (l.done) break;
                  g = l.value;
                }
                f = g;
                a.has(f) ||
                  i(
                    "Set instance without element " + String(f),
                    "Set instance with element " + String(f),
                    d,
                    e
                  );
              }
          else if (b instanceof Set) i("other value", "Set instance", d, e);
          else if (Array.isArray(a) || Array.isArray(b))
            if (!Array.isArray(a) || !Array.isArray(b))
              i(
                "type " + (Array.isArray(a) ? "array" : "object"),
                "type " + (Array.isArray(b) ? "array" : "object"),
                d,
                e
              );
            else if (a.length !== b.length)
              i(
                "array with length " + a.length,
                "array with length " + b.length,
                d,
                e
              );
            else
              for (g = 0; g < a.length; g++)
                k(a[g], b[g], d + "[" + g + "]", e + 1);
          else if (w(a) || w(b))
            !w(a) || !w(b)
              ? i(
                  "type " + (w(a) ? "React element" : "object"),
                  "type " + (w(b) ? "React element" : "object"),
                  d,
                  e
                )
              : c(
                  "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                )(a).type !==
                c(
                  "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                )(b).type
              ? i(
                  "React element of type " +
                    String(
                      c(
                        "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                      )(a).type.name
                    ),
                  "React element of type " +
                    String(
                      c(
                        "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                      )(b).type.name
                    ),
                  d,
                  e
                )
              : k(
                  c(
                    "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                  )(a).props,
                  c(
                    "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE"
                  )(b).props,
                  "[props of " + d + "]",
                  e + 1
                );
          else {
            for (f in b)
              f in a ||
                i("object without key " + f, "object with key " + f, d, e);
            for (l in a)
              !(l in b)
                ? i("object with key " + l, "object without key " + l, d, e)
                : k(a[l], b[l], d + "." + l, e + 1);
          }
        } else if (typeof a === "function") return;
        else
          isNaN(a) || isNaN(b)
            ? isNaN(a) !== isNaN(b) &&
              i(
                "" + (isNaN(a) ? "NaN" : "non-NaN value"),
                "" + (isNaN(b) ? "NaN" : "non-NaN value"),
                d,
                e
              )
            : a !== b && i(String(a), String(b), d, e);
      }
      k(a, b, "", 0);
    }
    var y = c("justknobx")._("2819"),
      z;
    function A(a, b) {
      if (y === !1) return t(a);
      z === void 0 && (z = c("qex")._("362"));
      return u(a, z === !0 ? b : null);
    }
    g.$dispatcherGuard = b;
    g.initReactForgetRuntime = d;
    g.shouldLogRender = a;
    g.logRender = e;
    g.$structuralCheck = f;
    g.useContextWithBailoutExperiment__unstable = A;
  },
  98
);
__d("setupReactRefresh", ["cr:1108857"], function (a, b, c, d, e, f, g) {}, 34);
__d(
  "shimReactSecretInternals_DEPRECATED",
  ["FBLogger", "justknobx"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set();
    function i(a, b) {
      b === void 0 && (b = "warn");
      if (c("justknobx")._("1806")) {
        if (h.has(a)) return;
        h.add(a);
        var d = c("FBLogger")("react", "secret-internals-shim-" + a);
        b === "warn"
          ? d.warn(
              "Access to a renamed property of React's secret internals: %s. A library or hack needs to be updated.",
              a
            )
          : d.mustfix(
              "Access to a renamed property of React's secret internals: %s. A library or hack needs to be updated.",
              a
            );
      }
    }
    function a(a) {
      var b = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      Object.assign(b, {
        ReactCurrentDispatcher: {
          get current() {
            return b.H;
          },
          set current(a) {
            b.H = a;
          },
        },
        ReactCurrentCache: {
          get current() {
            i("ReactCurrentCache-current-get");
            return b.A;
          },
          set current(a) {
            i("ReactCurrentCache-current-set"), (b.A = a);
          },
        },
        ReactCurrentBatchConfig: {
          get transition() {
            i("ReactCurrentBatchConfig-transition-get");
            return b.T;
          },
          set transition(a) {
            i("ReactCurrentBatchConfig-transition-set"), (b.T = a);
          },
        },
        ReactCurrentOwner: {
          get current() {
            var a = b.A;
            return a === null ? null : a.getOwner();
          },
          set current(a) {
            i("ReactCurrentOwner-current-set", "mustfix");
          },
        },
      });
      a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b;
    }
    g["default"] = a;
  },
  98
);
__d(
  "React",
  [
    "FBLogger",
    "cr:1294158",
    "react-forget-runtime",
    "setupReactRefresh",
    "shimReactSecretInternals_DEPRECATED",
  ],
  function (a, b, c, d, e, f) {
    b("setupReactRefresh");
    a = b("cr:1294158");
    b("shimReactSecretInternals_DEPRECATED")(a);
    b("react-forget-runtime").initReactForgetRuntime(a);
    var g = a.createFactory;
    a.createFactory = function () {
      b("FBLogger")("react", "createfactory").mustfix(
        "React.createFactory is not supported anymore"
      );
      return g.apply(void 0, arguments);
    };
    e.exports = a;
  },
  null
);
__d(
  "ReactDOM",
  ["cr:1293", "cr:1294159", "cr:7162", "cr:734", "err", "setupReactRefresh"],
  function (a, b, c, d, e, f, g) {
    var h, i;
    b("setupReactRefresh");
    function a() {
      throw c("err")("This React API is not available on Workplace.");
    }
    e = b("cr:734")
      ? b("cr:734")(b("cr:1294159").createPortal)
      : b("cr:1294159").createPortal;
    function d(a, c, d) {
      return b("cr:1294159").hydrateRoot(
        a,
        c,
        babelHelpers["extends"](
          {
            onRecoverableError: function (a) {
              if (a != null && typeof a.message === "string") {
                var b = a.message;
                if (
                  b.indexOf(
                    "The server could not finish this Suspense boundary"
                  ) !== -1 ||
                  b.indexOf("Minified React error #419;") !== -1 ||
                  b.indexOf("This Suspense boundary received an update") !==
                    -1 ||
                  b.indexOf("Minified React error #421;") !== -1
                )
                  return;
              }
              typeof reportError === "function" && reportError(a);
            },
          },
          d
        )
      );
    }
    f =
      (f = b("cr:1293") == null ? void 0 : b("cr:1293").findDOMNode) != null
        ? f
        : a;
    h =
      (h = b("cr:7162") == null ? void 0 : b("cr:7162").render_DEPRECATED) !=
      null
        ? h
        : a;
    i =
      (i =
        b("cr:7162") == null
          ? void 0
          : b("cr:7162").unmountComponentAtNode_DEPRECATED) != null
        ? i
        : a;
    g.createPortal = e;
    g.createRoot = b("cr:1294159").createRoot;
    g.hydrateRoot = d;
    g.flushSync = b("cr:1294159").flushSync;
    g.useFormStatus = b("cr:1294159").useFormStatus;
    g.useFormState = b("cr:1294159").useFormState;
    g.version = b("cr:1294159").version;
    g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
      b(
        "cr:1294159"
      ).__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
      b("cr:1294159").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    g.unstable_batchedUpdates = b("cr:1294159").unstable_batchedUpdates;
    g.unstable_createEventHandle = b("cr:1294159").unstable_createEventHandle;
    g.findDOMNode = f;
    g.render = h;
    g.unmountComponentAtNode = i;
  },
  98
);
__d(
  "WAWebIndexedDB",
  [],
  function (a, b, c, d, e, f) {
    var g;
    try {
      g = self.indexedDB;
    } catch (a) {}
    a = g;
    f["default"] = a;
  },
  66
);
__d(
  "getCrossOriginTransport",
  ["invariant", "ExecutionEnvironment", "err"],
  function (a, b, c, d, e, f, g) {
    var h;
    function i() {
      if (!(h || (h = b("ExecutionEnvironment"))).isInBrowser)
        throw b("err")(
          "getCrossOriginTransport: %s",
          "Cross origin transport unavailable in the server environment."
        );
      try {
        var a = new XMLHttpRequest();
        !("withCredentials" in a) &&
          typeof XDomainRequest !== "undefined" &&
          (a = new XDomainRequest());
        return a;
      } catch (a) {
        throw b("err")("getCrossOriginTransport: %s", a.message);
      }
    }
    i.withCredentials = function () {
      var a = i();
      "withCredentials" in a || g(0, 5150);
      var b = a.open;
      a.open = function () {
        b.apply(this, arguments), (this.withCredentials = !0);
      };
      return a;
    };
    e.exports = i;
  },
  null
);
__d(
  "ZeroRewrites",
  [
    "URI",
    "ZeroRewriteRules",
    "getCrossOriginTransport",
    "getSameOriginTransport",
    "isFacebookURI",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        rewriteURI: function (a) {
          if (!b("isFacebookURI")(a) || h._isWhitelisted(a)) return a;
          var c = h._getRewrittenSubdomain(a);
          c !== null && c !== void 0 && (a = a.setSubdomain(c));
          return a;
        },
        getTransportBuilderForURI: function (a) {
          return h.isRewritten(a)
            ? b("getCrossOriginTransport").withCredentials
            : b("getSameOriginTransport");
        },
        isRewriteSafe: function (a) {
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a)
          )
            return !1;
          var c = h._getCurrentURI().getDomain(),
            d = new (g || (g = b("URI")))(a).qualify().getDomain();
          return c === d || h.isRewritten(a);
        },
        isRewritten: function (a) {
          a = a.getQualifiedURI();
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a) ||
            h._isWhitelisted(a)
          )
            return !1;
          var c = a.getSubdomain(),
            d = h._getCurrentURI(),
            e = h._getRewrittenSubdomain(d);
          return a.getDomain() !== d.getDomain() && c === e;
        },
        _isWhitelisted: function (a) {
          a = a.getPath();
          a.endsWith("/") || (a += "/");
          return (
            b("ZeroRewriteRules").whitelist &&
            b("ZeroRewriteRules").whitelist[a] === 1
          );
        },
        _getRewrittenSubdomain: function (a) {
          a = a.getQualifiedURI().getSubdomain();
          return b("ZeroRewriteRules").rewrite_rules[a];
        },
        _getCurrentURI: function () {
          return new (g || (g = b("URI")))("/").qualify();
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "asyncToGeneratorRuntime",
  ["Promise"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    function h(a, c, d, e, f, h, i) {
        //console.log(i)

      try {
        var j = a[h](i),
          k = j.value;
      } catch (a) {
        d(a);
        return;
      }
      j.done ? c(k) : (g || (g = b("Promise"))).resolve(k).then(e, f);
    }
    function a(a) {
      return function () {
        var c = this,
          d = arguments;
        return new (g || (g = b("Promise")))(function (b, e) {
          var f = a.apply(c, d);
          function g(a) {
            h(f, b, e, g, i, "next", a);
          }
          function i(a) {
            h(f, b, e, g, i, "throw", a);
          }
          g(void 0);
        });
      };
    }
    f.asyncToGenerator = a;
  },
  66
);
__d(
  "getAsyncHeaders",
  [
    "BDHeaderConfig",
    "LSD",
    "ZeroCategoryHeader",
    "isFacebookURI",
    "requireWeak",
  ],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = {},
        d = c("isFacebookURI")(a);
      d &&
        c("ZeroCategoryHeader").value &&
        (b[c("ZeroCategoryHeader").header] = c("ZeroCategoryHeader").value);
      d = h(a);
      d && (b["X-FB-LSD"] = d);
      d = i(a);
      d && (b["X-ASBD-ID"] = d);
      c("requireWeak")("MessengerPWAVersionForUserAgent", function (c) {
        c = c();
        c != null && !j(a) && (b["X-FB-PWA"] = "" + c);
      });
      return b;
    }
    function h(a) {
      return j(a) ? null : c("LSD").token;
    }
    function i(a) {
      return j(a) ? null : d("BDHeaderConfig").ASBD_ID;
    }
    function j(a) {
      var b;
      b =
        (b =
          (b = k()) == null
            ? void 0
            : (b = b.location) == null
            ? void 0
            : b.origin) != null
          ? b
          : (b = window) == null
          ? void 0
          : (b = b.location) == null
          ? void 0
          : b.origin;
      return b == null
        ? !0
        : !a.toString().startsWith("/") && a.getOrigin() !== b;
    }
    function k() {
      if (typeof document !== "undefined") return document;
      else return null;
    }
    g["default"] = a;
  },
  98
);
__d(
  "once",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = g(a);
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
      return b;
    }
    function g(a) {
      var b = a,
        c;
      a = function () {
        if (b) {
          for (var a = arguments.length, d = new Array(a), e = 0; e < a; e++)
            d[e] = arguments[e];
          c = b.apply(this, d);
          b = null;
        }
        return c;
      };
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "regeneratorRuntime",
  ["Promise"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h = Object.prototype.hasOwnProperty,
      i =
        (typeof Symbol === "function" &&
          (typeof Symbol === "function" ? Symbol.iterator : "@@iterator")) ||
        "@@iterator",
      j = e.exports;
    function k(a, b, c, d) {
      b = Object.create((b || r).prototype);
      d = new A(d || []);
      b._invoke = x(a, c, d);
      return b;
    }
    j.wrap = k;
    function l(a, b, c) {
      try {
        return { type: "normal", arg: a.call(b, c) };
      } catch (a) {
        return { type: "throw", arg: a };
      }
    }
    var m = "suspendedStart",
      n = "suspendedYield",
      o = "executing",
      p = "completed",
      q = {};
    function r() {}
    function s() {}
    function t() {}
    var u = (t.prototype = r.prototype);
    s.prototype = u.constructor = t;
    t.constructor = s;
    s.displayName = "GeneratorFunction";
    function a(a) {
      ["next", "throw", "return"].forEach(function (b) {
        a[b] = function (a) {
          return this._invoke(b, a);
        };
      });
    }
    j.isGeneratorFunction = function (a) {
      a = typeof a === "function" && a.constructor;
      return a
        ? a === s || (a.displayName || a.name) === "GeneratorFunction"
        : !1;
    };
    j.mark = function (a) {
      Object.setPrototypeOf ? Object.setPrototypeOf(a, t) : Object.assign(a, t);
      a.prototype = Object.create(u);
      return a;
    };
    j.awrap = function (a) {
      return new v(a);
    };
    function v(a) {
      this.arg = a;
    }
    function w(a) {
      function c(c, f) {
        var h = a[c](f);
        c = h.value;
        return c instanceof v
          ? (g || (g = b("Promise"))).resolve(c.arg).then(d, e)
          : (g || (g = b("Promise"))).resolve(c).then(function (a) {
              h.value = a;
              return h;
            });
      }
      typeof process === "object" &&
        process.domain &&
        (c = process.domain.bind(c));
      var d = c.bind(a, "next"),
        e = c.bind(a, "throw");
      c.bind(a, "return");
      var f;
      function h(a, d) {
        var e = f
          ? f.then(function () {
              return c(a, d);
            })
          : new (g || (g = b("Promise")))(function (b) {
              b(c(a, d));
            });
        f = e["catch"](function (a) {});
        return e;
      }
      this._invoke = h;
    }
    a(w.prototype);
    j.async = function (a, b, c, d) {
      var e = new w(k(a, b, c, d));
      return j.isGeneratorFunction(b)
        ? e
        : e.next().then(function (a) {
            return a.done ? a.value : e.next();
          });
    };
    function x(a, b, c) {
      var d = m;
      return function (e, f) {
        if (d === o) throw new Error("Generator is already running");
        if (d === p) {
          if (e === "throw") throw f;
          return C();
        }
        while (!0) {
          var g = c.delegate;
          if (g) {
            if (e === "return" || (e === "throw" && g.iterator[e] === void 0)) {
              c.delegate = null;
              var h = g.iterator["return"];
              if (h) {
                h = l(h, g.iterator, f);
                if (h.type === "throw") {
                  e = "throw";
                  f = h.arg;
                  continue;
                }
              }
              if (e === "return") continue;
            }
            h = l(g.iterator[e], g.iterator, f);
            if (h.type === "throw") {
              c.delegate = null;
              e = "throw";
              f = h.arg;
              continue;
            }
            e = "next";
            f = void 0;
            var i = h.arg;
            if (i.done) (c[g.resultName] = i.value), (c.next = g.nextLoc);
            else {
              d = n;
              return i;
            }
            c.delegate = null;
          }
          if (e === "next") d === n ? (c.sent = f) : (c.sent = void 0);
          else if (e === "throw") {
            if (d === m) {
              d = p;
              throw f;
            }
            c.dispatchException(f) && ((e = "next"), (f = void 0));
          } else e === "return" && c.abrupt("return", f);
          d = o;
          h = l(a, b, c);
          if (h.type === "normal") {
            d = c.done ? p : n;
            var i = { value: h.arg, done: c.done };
            if (h.arg === q) c.delegate && e === "next" && (f = void 0);
            else return i;
          } else h.type === "throw" && ((d = p), (e = "throw"), (f = h.arg));
        }
      };
    }
    a(u);
    u[i] = function () {
      return this;
    };
    u.toString = function () {
      return "[object Generator]";
    };
    function y(a) {
      var b = { tryLoc: a[0] };
      1 in a && (b.catchLoc = a[1]);
      2 in a && ((b.finallyLoc = a[2]), (b.afterLoc = a[3]));
      this.tryEntries.push(b);
    }
    function z(a) {
      var b = a.completion || {};
      b.type = "normal";
      delete b.arg;
      a.completion = b;
    }
    function A(a) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        a.forEach(y, this),
        this.reset(!0);
    }
    j.keys = function (a) {
      var b = [];
      for (var c in a) b.push(c);
      b.reverse();
      return function c() {
        while (b.length) {
          var d = b.pop();
          if (d in a) {
            c.value = d;
            c.done = !1;
            return c;
          }
        }
        c.done = !0;
        return c;
      };
    };
    function B(a) {
      if (a) {
        var b = a[i];
        if (b) return b.call(a);
        if (typeof a.next === "function") return a;
        if (!isNaN(a.length)) {
          var c = -1;
          b = function b() {
            while (++c < a.length)
              if (h.call(a, c)) {
                b.value = a[c];
                b.done = !1;
                return b;
              }
            b.value = void 0;
            b.done = !0;
            return b;
          };
          return (b.next = b);
        }
      }
      return { next: C };
    }
    j.values = B;
    function C() {
      return { value: void 0, done: !0 };
    }
    A.prototype = {
      constructor: A,
      reset: function (a) {
        this.prev = 0;
        this.next = 0;
        this.sent = void 0;
        this.done = !1;
        this.delegate = null;
        this.tryEntries.forEach(z);
        if (!a)
          for (a in this)
            a.charAt(0) === "t" &&
              h.call(this, a) &&
              !isNaN(+a.slice(1)) &&
              (this[a] = void 0);
      },
      stop: function () {
        this.done = !0;
        var a = this.tryEntries[0];
        a = a.completion;
        if (a.type === "throw") throw a.arg;
        return this.rval;
      },
      dispatchException: function (a) {
        if (this.done) throw a;
        var b = this;
        function c(c, d) {
          f.type = "throw";
          f.arg = a;
          b.next = c;
          return !!d;
        }
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d],
            f = e.completion;
          if (e.tryLoc === "root") return c("end");
          if (e.tryLoc <= this.prev) {
            var g = h.call(e, "catchLoc"),
              i = h.call(e, "finallyLoc");
            if (g && i) {
              if (this.prev < e.catchLoc) return c(e.catchLoc, !0);
              else if (this.prev < e.finallyLoc) return c(e.finallyLoc);
            } else if (g) {
              if (this.prev < e.catchLoc) return c(e.catchLoc, !0);
            } else if (i) {
              if (this.prev < e.finallyLoc) return c(e.finallyLoc);
            } else throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function (a, b) {
        for (var c = this.tryEntries.length - 1; c >= 0; --c) {
          var d = this.tryEntries[c];
          if (
            d.tryLoc <= this.prev &&
            h.call(d, "finallyLoc") &&
            this.prev < d.finallyLoc
          ) {
            var e = d;
            break;
          }
        }
        e &&
          (a === "break" || a === "continue") &&
          e.tryLoc <= b &&
          b <= e.finallyLoc &&
          (e = null);
        d = e ? e.completion : {};
        d.type = a;
        d.arg = b;
        e ? (this.next = e.finallyLoc) : this.complete(d);
        return q;
      },
      complete: function (a, b) {
        if (a.type === "throw") throw a.arg;
        a.type === "break" || a.type === "continue"
          ? (this.next = a.arg)
          : a.type === "return"
          ? ((this.rval = a.arg), (this.next = "end"))
          : a.type === "normal" && b && (this.next = b);
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b];
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc);
            z(c);
            return q;
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b];
          if (c.tryLoc === a) {
            var d = c.completion;
            if (d.type === "throw") {
              var e = d.arg;
              z(c);
            }
            return e;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (a, b, c) {
        this.delegate = { iterator: B(a), resultName: b, nextLoc: c };
        return q;
      },
    };
  },
  null
);
__d(
  "requireDeferred",
  ["RDRequireDeferredReference"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {};
    function i(a, b) {
      h[a] = b;
    }
    function j(a) {
      return h[a];
    }
    function a(a) {
      var b = j(a);
      if (b) return b;
      b = new (c("RDRequireDeferredReference"))(a);
      i(a, b);
      return b;
    }
    g["default"] = a;
  },
  98
);
__d(
  "warning",
  ["cr:755"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:755");
  },
  98
);
__d(
  "warningComet",
  [
    "SiteData",
    "cr:1072546",
    "cr:1072547",
    "cr:1072549",
    "cr:983844",
    "err",
    "fb-error",
  ],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {}
    b = a;
    c = b;
    g["default"] = c;
  },
  98
);
__d(
  "warningWWW",
  ["WebDriverConfig", "cr:1105154", "cr:11202", "cr:2682"],
  function (a, b, c, d, e, f, g) {
    a = b("cr:2682");
    c = a;
    g["default"] = c;
  },
  98
);
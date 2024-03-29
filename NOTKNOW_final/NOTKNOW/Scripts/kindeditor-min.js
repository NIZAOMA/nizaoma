﻿/* KindEditor 4.0 (2011-09-26), Copyright (C) kindsoft.net, Licence: http://www.kindsoft.net/license.php */(function (B, k) {
    function ca(a) { if (!a) return !1; return Object.prototype.toString.call(a) === "[object Array]" } function Xa(a) { if (!a) return !1; return Object.prototype.toString.call(a) === "[object Function]" } function L(a, b) { for (var c = 0, d = b.length; c < d; c++) if (a === b[c]) return c; return -1 } function l(a, b) { if (ca(a)) for (var c = 0, d = a.length; c < d; c++) { if (b.call(a[c], c, a[c]) === !1) break } else for (c in a) if (a.hasOwnProperty(c) && b.call(a[c], c, a[c]) === !1) break } function w(a) {
        return a.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,
        "")
    } function ka(a, b, c) { c = c === k ? "," : c; return (c + b + c).indexOf(c + a + c) >= 0 } function s(a) { return a && /^\d+$/.test(a) ? a + "px" : a } function z(a) { var b; return a && (b = /(\d+)/.exec(a)) ? parseInt(b[1], 10) : 0 } function C(a) { return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") } function da(a) { var b = a.split("-"), a = ""; l(b, function (b, d) { a += b > 0 ? d.charAt(0).toUpperCase() + d.substr(1) : d }); return a } function la(a) {
        function b(a) {
            a = parseInt(a, 10).toString(16).toUpperCase(); return a.length >
            1 ? a : "0" + a
        } return a.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig, function (a, d, e, f) { return "#" + b(d) + b(e) + b(f) })
    } function t(a, b) { var b = b === k ? "," : b, c = {}, d = ca(a) ? a : a.split(b), e; l(d, function (a, b) { if (e = /^(\d+)\.\.(\d+)$/.exec(b)) for (var d = parseInt(e[1], 10) ; d <= parseInt(e[2], 10) ; d++) c[d.toString()] = !0; else c[b] = !0 }); return c } function Da(a, b) { return Array.prototype.slice.call(a, b || 0) } function o(a, b) { return a === k ? b : a } function D(a, b, c) {
        c || (c = b, b = null); var d; if (b) {
            var e = function () { }; e.prototype = b.prototype;
            d = new e; l(c, function (a, b) { d[a] = b })
        } else d = c; d.constructor = a; a.prototype = d; a.parent = b ? b.prototype : null
    } function Ya(a) {
        var b; if (b = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(a)) a = b[0]; b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; b.lastIndex = 0; b.test(a) && (a = a.replace(b, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })); if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return eval("(" + a + ")"); throw "JSON parse error";
    } function Kb(a, b, c) { a.addEventListener ? a.addEventListener(b, c, Za) : a.attachEvent && a.attachEvent("on" + b, c) } function ma(a, b, c) { a.removeEventListener ? a.removeEventListener(b, c, Za) : a.detachEvent && a.detachEvent("on" + b, c) } function $a(a, b) { this.init(a, b) } function ab(a) { try { delete a[V] } catch (b) { a.removeAttribute && a.removeAttribute(V) } } function W(a, b, c) {
        if (b.indexOf(",") >= 0) l(b.split(","), function () { W(a, this, c) }); else {
            var d =
            a[V] || null; d || (a[V] = ++bb, d = bb); u[d] === k && (u[d] = {}); var e = u[d][b]; e && e.length > 0 ? ma(a, b, e[0]) : (u[d][b] = [], u[d].el = a); e = u[d][b]; e.length === 0 && (e[0] = function (b) { var c = b ? new $a(a, b) : k; l(e, function (b, d) { b > 0 && d && d.call(a, c) }) }); L(c, e) < 0 && e.push(c); Kb(a, b, e[0])
        }
    } function M(a, b, c) {
        if (b && b.indexOf(",") >= 0) l(b.split(","), function () { M(a, this, c) }); else {
            var d = a[V] || null; if (d) if (b === k) d in u && (l(u[d], function (b, c) { b != "el" && c.length > 0 && ma(a, b, c[0]) }), delete u[d], ab(a)); else if (u[d]) {
                var e = u[d][b]; if (e && e.length >
                0) { c === k ? (ma(a, b, e[0]), delete u[d][b]) : (l(e, function (a, b) { a > 0 && b === c && e.splice(a, 1) }), e.length == 1 && (ma(a, b, e[0]), delete u[d][b])); var f = 0; l(u[d], function () { f++ }); f < 2 && (delete u[d], ab(a)) }
            }
        }
    } function cb(a, b) { if (b.indexOf(",") >= 0) l(b.split(","), function () { cb(a, this) }); else { var c = a[V] || null; if (c) { var d = u[c][b]; if (u[c] && d && d.length > 0) d[0]() } } } function Ea(a, b, c) { b = /^\d{2,}$/.test(b) ? b : b.toUpperCase().charCodeAt(0); W(a, "keydown", function (d) { d.ctrlKey && d.which == b && !d.shiftKey && !d.altKey && (c.call(a), d.stop()) }) }
    function na(a) { for (var b = {}, c = /\s*([\w\-]+)\s*:([^;]*)(;|$)/g, d; d = c.exec(a) ;) { var e = w(d[1].toLowerCase()); d = w(la(d[2])); b[e] = d } return b } function H(a) { for (var b = {}, c = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g, d; d = c.exec(a) ;) { var e = (d[1] || d[2] || d[4] || d[6]).toLowerCase(); b[e] = (d[2] ? d[3] : d[4] ? d[5] : d[7]) || "" } return b } function Lb(a, b) {
        return a = /\s+class\s*=/.test(a) ? a.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function (a, d, e,
        f) { return (" " + e + " ").indexOf(" " + b + " ") < 0 ? e === "" ? d + b + f : d + e + " " + b + f : a }) : a.substr(0, a.length - 1) + ' class="' + b + '">'
    } function Mb(a) { var b = ""; l(na(a), function (a, d) { b += a + ":" + d + ";" }); return b } function oa(a, b, c, d) {
        function e(a) { for (var a = a.split("/"), b = [], c = 0, d = a.length; c < d; c++) { var e = a[c]; e == ".." ? b.length > 0 && b.pop() : e !== "" && e != "." && b.push(e) } return "/" + b.join("/") } function f(b, c) {
            if (a.substr(0, b.length) === b) {
                for (var e = [], g = 0; g < c; g++) e.push(".."); g = "."; e.length > 0 && (g += "/" + e.join("/")); d == "/" && (g += "/"); return g +
                a.substr(b.length)
            } else if (h = /^(.*)\//.exec(b)) return f(h[1], ++c)
        } b = o(b, "").toLowerCase(); if (L(b, ["absolute", "relative", "domain"]) < 0) return a; c = c || location.protocol + "//" + location.host; if (d === k) var g = location.pathname.match(/^(\/.*)\//), d = g ? g[1] : ""; var h; if (h = /^(\w+:\/\/[^\/]*)/.exec(a)) { if (h[1] !== c) return a } else if (/^\w+:/.test(a)) return a; /^\//.test(a) ? a = c + e(a.substr(1)) : /^\w+:\/\//.test(a) || (a = c + e(d + "/" + a)); b === "relative" ? a = f(c + d, 0).substr(2) : b === "absolute" && a.substr(0, c.length) === c && (a = a.substr(c.length));
        return a
    } function P(a, b, c, d, e) {
        var c = c || "", d = o(d, !1), e = o(e, "\t"), f = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","), a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function (a, b, c, d) { return b + c.replace(/<(?:br|br\s[^>]*)>/ig, "\n") + d }), a = a.replace(/<(?:br|br\s[^>]*)\s*\/?>\s*<\/p>/ig, "</p>"), a = a.replace(/<(?:p|p\s[^>]*)><\/p>/ig, ""), a = a.replace(/\u200B/g, ""), g = {}; b && (l(b, function (a, b) { for (var c = a.split(","), d = 0, e = c.length; d < e; d++) g[c[d]] = t(b) }), g.script || (a = a.replace(/(<(?:script|script\s[^>]*)>)([\s\S]*?)(<\/script>)/ig,
        "")), g.style || (a = a.replace(/(<(?:style|style\s[^>]*)>)([\s\S]*?)(<\/style>)/ig, ""))); var h = [], a = a.replace(/(\s*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:"]+="[^"]*")|(?:\s+[\w\-:"]+='[^']*'))*)(\/)?>(\s*)/g, function (a, m, r, q, I, ea, p) {
            var m = m || "", r = r || "", k = q.toLowerCase(), n = I || "", q = ea ? " " + ea : "", p = p || ""; if (b && !g[k]) return ""; q === "" && db[k] && (q = " /"); eb[k] && (m && (m = " "), p && (p = " ")); Fa[k] && (r ? p = "\n" : m = "\n"); d && k == "br" && (p = "\n"); if (fb[k] && !Fa[k]) if (d) {
                r && h.length > 0 && h[h.length -
                1] === k ? h.pop() : h.push(k); p = m = "\n"; I = 0; for (ea = r ? h.length : h.length - 1; I < ea; I++) m += e, r || (p += e); q ? h.pop() : r || (p += e)
            } else m = p = ""; if (n !== "") {
                var v = H(a); if (k === "font") { var o = {}, E = ""; l(v, function (a, b) { if (a === "color") o.color = b, delete v[a]; a === "size" && (o["font-size"] = f[parseInt(b, 10) - 1] || "", delete v[a]); a === "face" && (o["font-family"] = b, delete v[a]); a === "style" && (E = b) }); E && !/;$/.test(E) && (E += ";"); l(o, function (a, b) { b !== "" && (/\s/.test(b) && (b = "'" + b + "'"), E += a + ":" + b + ";") }); v.style = E } l(v, function (a, d) {
                    Nb[a] && (v[a] =
                    a); L(a, ["src", "href"]) >= 0 && (v[a] = oa(d, c)); (b && a !== "style" && !g[k]["*"] && !g[k][a] || k === "body" && a === "contenteditable" || /^kindeditor_\d+$/.test(a)) && delete v[a]; if (a === "style" && d !== "") { var e = na(d); l(e, function (a) { b && !g[k].style && !g[k]["." + a] && delete e[a] }); var f = ""; l(e, function (a, b) { f += a + ":" + b + ";" }); v.style = f }
                }); n = ""; l(v, function (a, b) { a === "style" && b === "" || (n += " " + a + '="' + b + '"') })
            } k === "font" && (k = "span"); return m + "<" + r + k + n + q + ">" + p
        }), a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function (a, b,
        c, d) { return b + c.replace(/\n/g, '<span id="__kindeditor_pre_newline__">\n') + d }), a = a.replace(/\n\s*\n/g, "\n"), a = a.replace(/<span id="__kindeditor_pre_newline__">\n/g, "\n"); return w(a)
    } function gb(a, b) {
        a = a.replace(/<meta[\s\S]*?>/ig, "").replace(/<![\s\S]*?>/ig, "").replace(/<style[^>]*>[\s\S]*?<\/style>/ig, "").replace(/<script[^>]*>[\s\S]*?<\/script>/ig, "").replace(/<w:[^>]+>[\s\S]*?<\/w:[^>]+>/ig, "").replace(/<o:[^>]+>[\s\S]*?<\/o:[^>]+>/ig, "").replace(/<xml>[\s\S]*?<\/xml>/ig, "").replace(/(<table[^>]*)(>)/ig,
        function (a, b, e) { a = a.replace(/border="?\d+"?/, ""); a = H(a); a.border === k && (b += ' border="1"'); a.bordercolor === k && (b += ' bordercolor="#000000"'); b += e; return b }); return P(a, b)
    } function hb(a) { if (/\.(rm|rmvb)(\?|$)/i.test(a)) return "audio/x-pn-realaudio-plugin"; if (/\.(swf|flv)(\?|$)/i.test(a)) return "application/x-shockwave-flash"; return "video/x-ms-asf-plugin" } function ib(a) { return H(unescape(a)) } function Ga(a) { var b = "<embed "; l(a, function (a, d) { b += a + '="' + d + '" ' }); b += "/>"; return b } function jb(a, b) {
        var c = b.width,
        d = b.height, e = b.type || hb(b.src), f = Ga(b), g = ""; c > 0 && (g += "width:" + c + "px;"); d > 0 && (g += "height:" + d + "px;"); c = /realaudio/i.test(e) ? "ke-rm" : /flash/i.test(e) ? "ke-flash" : "ke-media"; c = '<img class="' + c + '" src="' + a + '" '; g !== "" && (c += 'style="' + g + '" '); c += 'data-ke-tag="' + escape(f) + '" alt="" />'; return c
    } function qa(a, b) { if (a.nodeType == 9 && b.nodeType != 9) return !0; for (; b = b.parentNode;) if (b == a) return !0; return !1 } function ra(a, b) {
        var b = b.toLowerCase(), c = null; if (n && F < 8) {
            var d = a.ownerDocument.createElement("div"); d.appendChild(a.cloneNode(!1));
            d = H(d.innerHTML.toLowerCase()); b in d && (c = d[b])
        } else c = a.getAttribute(b, 2); b === "style" && c !== null && (c = Mb(c)); return c
    } function sa(a, b) {
        function c(a) { if (typeof a != "string") return a; return a.replace(/([^\w\-])/g, "\\$1") } function d(a, b) { return a === "*" || a.toLowerCase() === c(b.toLowerCase()) } function e(a, b, c) { var e = []; (a = (c.ownerDocument || c).getElementById(a.replace(/\\/g, ""))) && d(b, a.nodeName) && qa(c, a) && e.push(a); return e } function f(a, b, c) {
            var e = c.ownerDocument || c, g = [], j, i, h; if (c.getElementsByClassName) {
                e =
                c.getElementsByClassName(a.replace(/\\/g, "")); j = 0; for (i = e.length; j < i; j++) h = e[j], d(b, h.nodeName) && g.push(h)
            } else if (e.querySelectorAll) { e = e.querySelectorAll((c.nodeName !== "#document" ? c.nodeName + " " : "") + b + "." + a); j = 0; for (i = e.length; j < i; j++) h = e[j], qa(c, h) && g.push(h) } else { e = c.getElementsByTagName(b); a = " " + a + " "; j = 0; for (i = e.length; j < i; j++) if (h = e[j], h.nodeType == 1) (b = h.className) && (" " + b + " ").indexOf(a) > -1 && g.push(h) } return g
        } function g(a, b, d, e) {
            for (var f = [], d = e.getElementsByTagName(d), g = 0, j = d.length; g < j; g++) e =
            d[g], e.nodeType == 1 && (b === null ? ra(e, a) !== null && f.push(e) : b === c(ra(e, a)) && f.push(e)); return f
        } function h(a, b) {
            var c = [], j, h = (j = /^((?:\\.|[^.#\s\[<>])+)/.exec(a)) ? j[1] : "*"; if (j = /#((?:[\w\-]|\\.)+)$/.exec(a)) c = e(j[1], h, b); else if (j = /\.((?:[\w\-]|\\.)+)$/.exec(a)) c = f(j[1], h, b); else if (j = /\[((?:[\w\-]|\\.)+)\]/.exec(a)) c = g(j[1].toLowerCase(), null, h, b); else if (j = /\[((?:[\w\-]|\\.)+)\s*=\s*['"]?((?:\\.|[^'"]+)+)['"]?\]/.exec(a)) {
                c = j[1].toLowerCase(); j = j[2]; if (c === "id") h = e(j, h, b); else if (c === "class") h = f(j,
                h, b); else if (c === "name") { c = []; j = (b.ownerDocument || b).getElementsByName(j.replace(/\\/g, "")); for (var m, q = 0, r = j.length; q < r; q++) m = j[q], d(h, m.nodeName) && qa(b, m) && m.getAttributeNode("name") && c.push(m); h = c } else h = g(c, j, h, b); c = h
            } else { h = b.getElementsByTagName(h); m = 0; for (q = h.length; m < q; m++) j = h[m], j.nodeType == 1 && c.push(j) } return c
        } var j = a.split(","); if (j.length > 1) { var m = []; l(j, function () { l(sa(this, b), function () { L(this, m) < 0 && m.push(this) }) }); return m } for (var b = b || document, j = [], r, q = /((?:\\.|[^\s>])+|[\s>])/g; r =
        q.exec(a) ;) r[1] !== " " && j.push(r[1]); r = []; if (j.length == 1) return h(j[0], b); var q = !1, I, k, p, n, o, v, pa, E, s, t; v = 0; for (lenth = j.length; v < lenth; v++) if (I = j[v], I === ">") q = !0; else { if (v > 0) { k = []; pa = 0; for (s = r.length; pa < s; pa++) { n = r[pa]; p = h(I, n); E = 0; for (t = p.length; E < t; E++) o = p[E], q ? n === o.parentNode && k.push(o) : k.push(o) } r = k } else r = h(I, b); if (r.length === 0) return [] } return r
    } function X(a) { if (!a) return document; return a.ownerDocument || a.document || a } function Q(a) { if (!a) return B; a = X(a); return a.parentWindow || a.defaultView } function Ob(a,
    b) { if (a.nodeType == 1) { var c = X(a); try { a.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + b; var d = c.getElementById("__kindeditor_temp_tag__"); d.parentNode.removeChild(d) } catch (e) { f(a).empty(), f("@" + b, c).each(function () { a.appendChild(this) }) } } } function Ha(a, b, c) { n && F < 8 && b.toLowerCase() == "class" && (b = "className"); a.setAttribute(b, "" + c) } function Ia(a) { if (!a || !a.nodeName) return ""; return a.nodeName.toLowerCase() } function Pb(a, b) {
        var c = Q(a), d = da(b), e = ""; c.getComputedStyle ?
        (c = c.getComputedStyle(a, null), e = c[d] || c.getPropertyValue(b) || a.style[d]) : a.currentStyle && (e = a.currentStyle[d] || a.style[d]); return e
    } function G(a) { a = a || document; return R ? a.body : a.documentElement } function fa(a) { var a = a || document, b; n || Ja ? (b = G(a).scrollLeft, a = G(a).scrollTop) : (b = Q(a).scrollX, a = Q(a).scrollY); return { x: b, y: a } } function J(a) { this.init(a) } function kb(a) { a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset; return a } function Ka(a, b, c) {
        function d(d, e, f) {
            var j = d.nodeValue.length,
            g; b && (g = d.cloneNode(!0), g = e > 0 ? g.splitText(e) : g, f < j && g.splitText(f - e)); if (c) { var i = d; e > 0 && (i = d.splitText(e), a.setStart(d, e)); f < j && (d = i.splitText(f - e), a.setEnd(d, 0)); h.push(i) } return g
        } function e() { c && a.up().collapse(!0); for (var b = 0, d = h.length; b < d; b++) { var e = h[b]; e.parentNode && e.parentNode.removeChild(e) } } function f(e, k) {
            for (var p = e.firstChild, n; p;) {
                n = (new S(g)).selectNode(p); m <= 0 && (m = n.compareBoundaryPoints(ga, a)); m >= 0 && r <= 0 && (r = n.compareBoundaryPoints(ha, a)); r >= 0 && q <= 0 && (q = n.compareBoundaryPoints(Y,
                a)); q >= 0 && l <= 0 && (l = n.compareBoundaryPoints(ia, a)); if (l >= 0) return !1; n = p.nextSibling; if (m > 0) if (p.nodeType == 1) if (r >= 0 && q <= 0) b && k.appendChild(p.cloneNode(!0)), c && h.push(p); else { var o; b && (o = p.cloneNode(!1), k.appendChild(o)); if (f(p, o) === !1) return !1 } else if (p.nodeType == 3 && (p = p == j.startContainer ? d(p, j.startOffset, p.nodeValue.length) : p == j.endContainer ? d(p, 0, j.endOffset) : d(p, 0, p.nodeValue.length), b)) try { k.appendChild(p) } catch (ea) { } p = n
            }
        } var g = a.doc, h = [], j = a.cloneRange().down(), m = -1, r = -1, q = -1, l = -1, k = a.commonAncestor(),
        p = g.createDocumentFragment(); if (k.nodeType == 3) return k = d(k, a.startOffset, a.endOffset), b && p.appendChild(k), e(), b ? p : a; f(k, p); c && a.up().collapse(!0); for (var k = 0, o = h.length; k < o; k++) { var n = h[k]; n.parentNode && n.parentNode.removeChild(n) } return b ? p : a
    } function ja(a, b) { for (var c = b; c;) { var d = f(c); if (d.name == "marquee" || d.name == "select") return; c = c.parentNode } try { a.moveToElementText(b) } catch (e) { } } function lb(a, b) {
        var c = a.parentElement().ownerDocument, d = a.duplicate(); d.collapse(b); var e = d.parentElement(), i = e.childNodes;
        if (i.length === 0) return { node: e.parentNode, offset: f(e).index() }; var g = c, h = 0, j = -1, m = a.duplicate(); ja(m, e); for (var r = 0, q = i.length; r < q; r++) {
            var k = i[r], j = m.compareEndPoints("StartToStart", d); if (j === 0) return { node: k.parentNode, offset: r }; if (k.nodeType == 1) { var l = a.duplicate(), p, n = f(k), o = k; n.isControl() && (p = c.createElement("span"), n.after(p), o = p, h += n.text().replace(/\r\n|\n|\r/g, "").length); ja(l, o); m.setEndPoint("StartToEnd", l); j > 0 ? h += l.text.replace(/\r\n|\n|\r/g, "").length : h = 0; p && f(p).remove() } else k.nodeType ==
            3 && (m.moveStart("character", k.nodeValue.length), h += k.nodeValue.length); j < 0 && (g = k)
        } if (j < 0 && g.nodeType == 1) return { node: e, offset: f(e.lastChild).index() + 1 }; if (j > 0) for (; g.nextSibling && g.nodeType == 1;) g = g.nextSibling; m = a.duplicate(); ja(m, e); m.setEndPoint("StartToEnd", d); h -= m.text.replace(/\r\n|\n|\r/g, "").length; return { node: g, offset: h }
    } function mb(a, b) {
        var c = a.ownerDocument || a, d = c.body.createTextRange(); if (c == a) return d.collapse(!0), d; if (a.nodeType == 1 && a.childNodes.length > 0) {
            var e = a.childNodes, i; b === 0 ? (i =
            e[0], e = !0) : (i = e[b - 1], e = !1); if (!i) return d; if (f(i).name === "head") return b === 1 && (e = !0), b === 2 && (e = !1), d.collapse(e), d; if (i.nodeType == 1) { var g = f(i), h; g.isControl() && (h = c.createElement("span"), e ? g.before(h) : g.after(h), i = h); ja(d, i); d.collapse(e); h && f(h).remove(); return d } a = i; b = e ? 0 : i.nodeValue.length
        } c = c.createElement("span"); f(a).before(c); ja(d, c); d.moveStart("character", b); f(c).remove(); return d
    } function nb(a) {
        function b(a) { if (f(a.node).name == "tr") a.node = a.node.cells[a.offset], a.offset = 0 } var c; if (n) {
            if (a.item) return c =
            X(a.item(0)), c = new S(c), c.selectNode(a.item(0)), c; c = a.parentElement().ownerDocument; var d = lb(a, !0), a = lb(a, !1); b(d); b(a); c = new S(c); c.setStart(d.node, d.offset); c.setEnd(a.node, a.offset); return c
        } d = a.startContainer; c = d.ownerDocument || d; c = new S(c); c.setStart(d, a.startOffset); c.setEnd(a.endContainer, a.endOffset); return c
    } function S(a) { this.init(a) } function La(a) { if (!a.nodeName) return a.get ? a : nb(a); return new S(a) } function N(a, b, c) { try { a.execCommand(b, !1, c) } catch (d) { } } function ob(a, b) {
        var c = ""; try { c = a.queryCommandValue(b) } catch (d) { } typeof c !==
        "string" && (c = ""); return c
    } function Ma(a) { var b = Q(a); return a.selection || b.getSelection() } function pb(a) { var b = {}, c, d; l(a, function (a, f) { c = a.split(","); for (var g = 0, h = c.length; g < h; g++) d = c[g], b[d] = f }); return b } function ta(a, b) { return qb(a, b, "*") || qb(a, b) } function qb(a, b, c) {
        c = c || a.name; if (a.type !== 1) return !1; b = pb(b); if (!b[c]) return !1; for (var c = b[c].split(","), b = 0, d = c.length; b < d; b++) {
            var e = c[b]; if (e === "*") return !0; var f = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(e), g = f[1] ? "css" : "attr", e = f[2], f = f[3] || ""; if (f ===
            "" && a[g](e) !== "") return !0; if (f !== "" && a[g](e) === f) return !0
        } return !1
    } function Na(a, b) { a.type == 1 && (rb(a, b, "*"), rb(a, b)) } function rb(a, b, c) { c = c || a.name; if (a.type === 1 && (b = pb(b), b[c])) { for (var c = b[c].split(","), b = !1, d = 0, e = c.length; d < e; d++) { var f = c[d]; if (f === "*") { b = !0; break } var g = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(f), f = g[2]; g[1] ? (f = da(f), a[0].style[f] && (a[0].style[f] = "")) : a.removeAttr(f) } b && a.remove(!0) } } function Z(a) { for (; a.first() ;) a = a.first(); return a } function Qb(a, b, c) {
        l(b, function (b, c) {
            b !== "style" &&
            a.attr(b, c)
        }); l(c, function (b, c) { a.css(b, c) })
    } function sb(a) { for (; a && a.name != "body";) { if (Fa[a.name] || a.name == "div" && a.hasClass("ke-script")) return !0; a = a.parent() } return !1 } function ua(a) { this.init(a) } function tb(a) { a.nodeName && (a = X(a), a = La(a).selectNodeContents(a.body).collapse(!1)); return new ua(a) } function Oa(a) {
        var b = a.moveEl, c = a.moveFn, d = a.clickEl || b, e = a.beforeDrag, i = [document], g = [{ x: 0, y: 0 }], h = []; (a.iframeFix === k || a.iframeFix) && f("iframe").each(function () { try { i.push(Pa(this)) } catch (a) { } g.push(f(this).pos()) });
        d.mousedown(function (a) {
            var m = d.get(), k = z(b.css("left")), q = z(b.css("top")), n = b.width(), o = b.height(), p = a.pageX, s = a.pageY, t = !0; e && e(); l(i, function (a, b) {
                function e(b) { if (t) { var f = O(g[a].x + b.pageX - p), j = O(g[a].y + b.pageY - s); c.call(d, k, q, n, o, f, j) } b.stop() } function j(a) { a.stop() } function i(a) { t = !1; m.releaseCapture && m.releaseCapture(); l(h, function () { f(this.doc).unbind("mousemove", this.move).unbind("mouseup", this.up).unbind("selectstart", this.select) }); a.stop() } f(b).mousemove(e).mouseup(i).bind("selectstart",
                j); h.push({ doc: b, move: e, up: i, select: j })
            }); m.setCapture && m.setCapture(); a.stop()
        })
    } function T(a) { this.init(a) } function Qa(a) { return new T(a) } function Pa(a) { a = f(a)[0]; return a.contentDocument || a.contentWindow.document } function Rb(a, b, c, d) {
        var e = ['<html><head><meta charset="utf-8" /><title>KindEditor</title>', "<style>", "html {margin:0;padding:0;}", "body {margin:0;padding:5px;}", 'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}', "body, p, div {word-wrap: break-word;}", "p {margin:5px 0;}",
        "table {border-collapse:collapse;}", "table.ke-zeroborder td {border:1px dotted #AAA;}", "img.ke-flash {", "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/flash.gif);", "\tbackground-position:center center;", "\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-rm {", "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/rm.gif);", "\tbackground-position:center center;", "\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-media {",
        "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/media.gif);", "\tbackground-position:center center;", "\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-anchor {", "\tborder:1px dashed #666;", "\twidth:16px;", "\theight:16px;", "}", ".ke-script {", "\tdisplay:none;", "\tfont-size:0;", "\twidth:0;", "\theight:0;", "}", ".ke-pagebreak {", "\tborder:1px dotted #AAA;", "\tfont-size:0;", "\theight:2px;", "}", "</style>"]; ca(c) || (c = [c]); l(c, function (a, b) {
            b && e.push('<link href="' +
            b + '" rel="stylesheet" />')
        }); d && e.push("<style>" + d + "</style>"); e.push("</head><body " + (b ? 'class="' + b + '"' : "") + "></body></html>"); return e.join("\n")
    } function $(a, b) { return a.hasVal() ? a.val(b) : a.html(b) } function va(a) { this.init(a) } function ub(a) { return new va(a) } function vb(a, b) { var c = this.get(a); c && !c.hasClass("ke-disabled") && b(c) } function Ra(a) { this.init(a) } function wb(a) { return new Ra(a) } function wa(a) { this.init(a) } function Sa(a) { return new wa(a) } function xa(a) { this.init(a) } function xb(a) { return new xa(a) }
    function yb(a) { this.init(a) } function ya(a) { this.init(a) } function zb(a) { return new ya(a) } function Ta(a, b) { var c = document.getElementsByTagName("head")[0] || (R ? document.body : document.documentElement), d = document.createElement("script"); c.appendChild(d); d.src = a; d.charset = "utf-8"; d.onload = d.onreadystatechange = function () { if (!this.readyState || this.readyState === "loaded") b && b(), d.onload = d.onreadystatechange = null, c.removeChild(d) } } function Ua(a) {
        for (var b = document.getElementsByTagName("head")[0] || (R ? document.body :
        document.documentElement), c = document.createElement("link"), d = oa(a, "absolute"), e = f('link[rel="stylesheet"]', b), i = 0, g = e.length; i < g; i++) if (oa(e[i].href, "absolute") === d) return; b.appendChild(c); c.href = a; c.rel = "stylesheet"
    } function Ab(a, b) { if (!b) return aa[a]; aa[a] = b } function Bb(a) { var b, c = "core"; if (b = /^(\w+)\.(\w+)$/.exec(a)) c = b[1], a = b[2]; return { ns: c, key: a } } function Cb(a, b) {
        b = b === k ? f.options.langType : b; if (typeof a === "string") {
            if (!K[b]) return "no language"; var c = a.length - 1; if (a.substr(c) === ".") return K[b][a.substr(0,
            c)]; c = Bb(a); return K[b][c.ns][c.key]
        } l(a, function (a, c) { var f = Bb(a); K[b] || (K[b] = {}); K[b][f.ns] || (K[b][f.ns] = {}); K[b][f.ns][f.key] = c })
    } function za(a, b) { var c = a.startContainer, d = a.startOffset; if (ba || a.isControl()) if ((c = f(c.childNodes[d])) && c.name == "img" && b(c)) return c } function Sb() {
        var a = this; f(a.edit.doc).contextmenu(function (b) {
            a.menu && a.hideMenu(); if (a.useContextmenu) {
                if (a._contextmenus.length !== 0) {
                    var c = 0, d = []; for (l(a._contextmenus, function () {
                    if (this.title == "-") d.push(this); else if (this.cond && this.cond() &&
                    (d.push(this), this.width && this.width > c)) c = this.width
                    }) ; d.length > 0 && d[0].title == "-";) d.shift(); for (; d.length > 0 && d[d.length - 1].title == "-";) d.pop(); var e = null; l(d, function (a) { this.title == "-" && e.title == "-" && delete d[a]; e = this }); if (d.length > 0) {
                        b.preventDefault(); var i = f(a.edit.iframe).pos(), g = Sa({ x: i.x + b.clientX, y: i.y + b.clientY, width: c, css: { visibility: "hidden" } }); l(d, function () { this.title && g.addItem(this) }); var i = G(g.doc), h = g.div.height(); b.clientY + h >= i.clientHeight - 100 && g.pos(g.x, z(g.y) - h); g.div.css("visibility",
                        "visible"); a.menu = g
                    }
                }
            } else b.preventDefault()
        })
    } function Tb() {
        function a(a) { for (a = f(a.commonAncestor()) ; a;) { if (a.type == 1 && !a.isStyle()) break; a = a.parent() } return a.name } var b = this, c = b.edit.doc, d = b.newlineTag; if (!(n && d !== "br") && (!Va || !(F < 3 && d !== "p")) && !Ja) {
            var e = t("h1,h2,h3,h4,h5,h6,pre,li"), i = t("p,h1,h2,h3,h4,h5,h6,pre,li,blockquote"); f(c).keydown(function (f) {
                if (!(f.which != 13 || f.shiftKey || f.ctrlKey || f.altKey)) {
                    b.cmd.selection(); var h = a(b.cmd.range); h == "marquee" || h == "select" || (d === "br" && !e[h] ? (f.preventDefault(),
                    b.insertHtml("<br />")) : i[h] || N(c, "formatblock", "<p>"))
                }
            }); f(c).keyup(function (e) { if (!(e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) && d != "br") if (b.cmd.selection(), e = a(b.cmd.range), !(e == "marquee" || e == "select")) if (i[e] || N(c, "formatblock", "<p>"), e = b.cmd.commonAncestor("div")) { for (var h = f("<p></p>"), j = e[0].firstChild; j;) { var m = j.nextSibling; h.append(j); j = m } e.before(h); e.remove(); b.cmd.range.selectNodeContents(h[0]); b.cmd.select() } })
        }
    } function Ub() {
        var a = this; f(a.edit.doc).keydown(function (b) {
            b.which ==
            9 && (b.preventDefault(), a.afterTab ? a.afterTab.call(a, b) : a.insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;"))
        })
    } function Vb() { var a = this; f(a.edit.textarea[0], a.edit.win).focus(function (b) { a.afterFocus && a.afterFocus.call(a, b) }).blur(function (b) { a.afterBlur && a.afterBlur.call(a, b) }) } function U(a) { return w(a.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/ig, "")) } function Db(a, b) { if (a.length === 0) a.push(b); else { var c = a[a.length - 1]; U(b.html) !== U(c.html) && a.push(b) } } function Eb(a, b) {
        var c = this.edit,
        d = c.doc.body, e, i; if (a.length === 0) return this; c.designMode ? (e = this.cmd.range, i = e.createBookmark(!0), i.html = d.innerHTML) : i = { html: d.innerHTML }; Db(b, i); var g = a.pop(); U(i.html) === U(g.html) && a.length > 0 && (g = a.pop()); c.designMode ? (c.html(g.html), g.start && (e.moveToBookmark(g), this.select())) : f(d).html(U(g.html)); return this
    } function Aa(a) {
        function b(a, b) { Aa.prototype[a] === k && (c[a] = b); c.options[a] = b } var c = this; c.options = {}; l(a, function (c) { b(c, a[c]) }); l(f.options, function (a, d) { c[a] === k && b(a, d) }); b("width", o(c.width,
        c.minWidth)); b("height", o(c.height, c.minHeight)); b("width", s(c.width)); b("height", s(c.height)); if (Fb) c.designMode = !1; var d = f(c.srcElement || "<textarea/>"); c.srcElement = d; c.initContent = $(d); c.plugin = {}; c.isCreated = !1; c._handlers = {}; c._contextmenus = []; c._undoStack = []; c._redoStack = []; c._calledPlugins = {}; c._firstAddBookmark = !0; c.menu = c.contextmenu = null; c.dialogs = []
    } if (!B.KindEditor) {
        var A = navigator.userAgent.toLowerCase(), n = A.indexOf("msie") > -1 && A.indexOf("opera") == -1, Va = A.indexOf("gecko") > -1 && A.indexOf("khtml") ==
        -1, ba = A.indexOf("applewebkit") > -1, Ja = A.indexOf("opera") > -1, Fb = A.indexOf("mobile") > -1, R = document.compatMode != "CSS1Compat", F = (A = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(A)) ? A[1] : "0", Ba = (new Date).getTime(), O = Math.round, f = {
            DEBUG: !1, VERSION: "4.0 (2011-09-26)", IE: n, GECKO: Va, WEBKIT: ba, OPERA: Ja, V: F, TIME: Ba, each: l, isArray: ca, isFunction: Xa, inArray: L, inString: ka, trim: w, addUnit: s, removeUnit: z, escape: C, unescape: function (a) {
                return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g,
                "&")
            }, toCamel: da, toHex: la, toMap: t, toArray: Da, undef: o, invalidUrl: function (a) { return !a || /[<>"]/.test(a) }, addParam: function (a, b) { return a.indexOf("?") >= 0 ? a + "&" + b : a + "?" + b }, extend: D, json: Ya
        }, eb = t("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), fb = t("address,applet,blockquote,body,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul"),
        db = t("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), Gb = t("b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u"), Wb = t("img,table,input,textarea,button"), Fa = t("pre,style,script"), Ca = t("html,head,body,td,tr,table,ol,ul,li"); t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"); var Nb = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), Hb = t("input,button,textarea,select"); f.basePath = function () {
            for (var a =
            document.getElementsByTagName("script"), b, c = 0, d = a.length; c < d; c++) if (b = a[c].src || "", /kindeditor[\w\-\.]*\.js/.test(b)) return b.substring(0, b.lastIndexOf("/") + 1); return ""
        }(); f.options = {
            designMode: !0, fullscreenMode: !1, filterMode: !1, wellFormatMode: !0, shadowMode: !0, loadStyleMode: !0, basePath: f.basePath, themesPath: f.basePath + "themes/", langPath: f.basePath + "lang/", pluginsPath: f.basePath + "plugins/", themeType: "default", langType: "zh_CN", urlType: "", newlineTag: "p", resizeType: 2, syncType: "form", pasteType: 2, dialogAlignType: "page",
            useContextmenu: !0, bodyClass: "ke-content", indentChar: "\t", cssPath: "", cssData: "", minWidth: 650, minHeight: 100, minChangeSize: 5, items: ["source", "|", "undo", "redo", "|", "preview", "print", "template", "cut", "copy", "paste", "plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor",
            "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image", "flash", "media", "insertfile", "table", "hr", "emoticons", "map", "code", "pagebreak", "anchor", "link", "unlink", "|", "about"], noDisableItems: ["source", "fullscreen"], colorTable: [["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]],
            fontSizeTable: ["9px", "10px", "12px", "14px", "16px", "18px", "24px", "32px"], htmlTags: {
                font: ["color", "size", "face", ".background-color"], span: [".color", ".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".line-height"], div: ["align", ".border", ".margin", ".padding", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".background", ".font-style", ".text-decoration", ".vertical-align", ".margin-left"], table: ["border",
                "cellspacing", "cellpadding", "width", "height", "align", "bordercolor", ".padding", ".margin", ".border", "bgcolor", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".background", ".width", ".height"], "td,th": ["align", "valign", "width", "height", "colspan", "rowspan", "bgcolor", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".background"], a: ["href", "target",
                "name"], embed: ["src", "width", "height", "type", "loop", "autostart", "quality", ".width", ".height", "align", "allowscriptaccess"], img: ["src", "width", "height", "border", "alt", "title", "align", ".width", ".height"], "p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": ["align", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".text-indent", ".margin-left"], pre: ["class"], "hr,br,tbody,tr,strong,b,sub,sup,em,i,u,strike": []
            }, layout: '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
        };
        var Za = !1, Ib = t("8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222"), A = t("33..40"), Wa = {}; l(Ib, function (a, b) { Wa[a] = b }); l(A, function (a, b) { Wa[a] = b }); var Xb = "altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,layerX,layerY,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which".split(",");
        D($a, {
            init: function (a, b) {
                var c = this, d = a.ownerDocument || a.document || a; c.event = b; l(Xb, function (a, d) { c[d] = b[d] }); if (!c.target) c.target = c.srcElement || d; if (c.target.nodeType === 3) c.target = c.target.parentNode; if (!c.relatedTarget && c.fromElement) c.relatedTarget = c.fromElement === c.target ? c.toElement : c.fromElement; if (c.pageX == null && c.clientX != null) {
                    var e = d.documentElement, d = d.body; c.pageX = c.clientX + (e && e.scrollLeft || d && d.scrollLeft || 0) - (e && e.clientLeft || d && d.clientLeft || 0); c.pageY = c.clientY + (e && e.scrollTop ||
                    d && d.scrollTop || 0) - (e && e.clientTop || d && d.clientTop || 0)
                } if (!c.which && (c.charCode || c.charCode === 0 ? c.charCode : c.keyCode)) c.which = c.charCode || c.keyCode; if (!c.metaKey && c.ctrlKey) c.metaKey = c.ctrlKey; if (!c.which && c.button !== k) c.which = c.button & 1 ? 1 : c.button & 2 ? 3 : c.button & 4 ? 2 : 0; switch (c.which) { case 186: c.which = 59; break; case 187: case 107: case 43: c.which = 61; break; case 189: case 45: c.which = 109; break; case 42: c.which = 106; break; case 47: c.which = 111; break; case 78: c.which = 110 } c.which >= 96 && c.which <= 105 && (c.which -= 48)
            },
            preventDefault: function () { var a = this.event; a.preventDefault && a.preventDefault(); a.returnValue = !1 }, stopPropagation: function () { var a = this.event; a.stopPropagation && a.stopPropagation(); a.cancelBubble = !0 }, stop: function () { this.preventDefault(); this.stopPropagation() }
        }); var V = "kindeditor_" + Ba, bb = 0, u = {}; n && B.attachEvent("onunload", function () { l(u, function (a, b) { b.el && M(b.el) }) }); f.ctrl = Ea; f.ready = function (a) {
            function b() {
                e || (e = !0, a(KindEditor), document.addEventListener ? M(document, "DOMContentLoaded", b) : document.attachEvent &&
                M(document, "readystatechange", d), M(B, "load", b))
            } function c() { if (!e) { try { document.documentElement.doScroll("left") } catch (a) { setTimeout(c, 0); return } b() } } function d() { document.readyState === "complete" && b() } var e = !1; document.addEventListener ? W(document, "DOMContentLoaded", b) : document.attachEvent && (W(document, "readystatechange", d), document.documentElement.doScroll && B.frameElement === k && c()); W(B, "load", b)
        }; f.formatUrl = oa; f.formatHtml = P; f.getCssList = na; f.getAttrList = H; f.mediaType = hb; f.mediaAttrs = ib; f.mediaEmbed =
        Ga; f.mediaImg = jb; f.clearMsWord = gb; f.query = function (a, b) { var c = sa(a, b); return c.length > 0 ? c[0] : null }; f.queryAll = sa; D(J, {
            init: function (a) { for (var b = 0, c = a.length; b < c; b++) this[b] = a[b].get ? a[b][0] : a[b]; this.length = a.length; this.doc = X(this[0]); this.name = Ia(this[0]); this.type = this.length > 0 ? this[0].nodeType : null; this.win = Q(this[0]); this._data = {} }, each: function (a) { for (var b = 0; b < this.length; b++) if (a.call(this[b], b, this[b]) === !1) break; return this }, bind: function (a, b) { this.each(function () { W(this, a, b) }); return this },
            unbind: function (a, b) { this.each(function () { M(this, a, b) }); return this }, fire: function (a) { if (this.length < 1) return this; cb(this[0], a); return this }, hasAttr: function (a) { if (this.length < 1) return !1; return !!ra(this[0], a) }, attr: function (a, b) { var c = this; if (a === k) return H(c.outer()); if (typeof a === "object") return l(a, function (a, b) { c.attr(a, b) }), c; if (b === k) return b = c.length < 1 ? null : ra(c[0], a), b === null ? "" : b; c.each(function () { Ha(this, a, b) }); return c }, removeAttr: function (a) {
                this.each(function () {
                    var b = a; n && F < 8 && b.toLowerCase() ==
                    "class" && (b = "className"); Ha(this, b, ""); this.removeAttribute(b)
                }); return this
            }, get: function (a) { if (this.length < 1) return null; return this[a || 0] }, hasClass: function (a) { if (this.length < 1) return !1; return ka(a, this[0].className, " ") }, addClass: function (a) { this.each(function () { if (!ka(a, this.className, " ")) this.className = w(this.className + " " + a) }); return this }, removeClass: function (a) {
                this.each(function () { if (ka(a, this.className, " ")) this.className = w(this.className.replace(RegExp("(^|\\s)" + a + "(\\s|$)"), " ")) });
                return this
            }, html: function (a) { if (a === k) { if (this.length < 1) return ""; return P(this[0].innerHTML) } this.each(function () { Ob(this, a) }); return this }, text: function () { if (this.length < 1) return ""; return n ? this[0].innerText : this[0].textContent }, hasVal: function () { if (this.length < 1) return !1; return !!Hb[Ia(this[0])] }, val: function (a) { if (a === k) { if (this.length < 1) return ""; return this.hasVal() ? this[0].value : this.attr("value") } else return this.each(function () { Hb[Ia(this)] ? this.value = a : Ha(this, "value", a) }), this }, css: function (a,
            b) { var c = this; if (a === k) return na(c.attr("style")); if (typeof a === "object") return l(a, function (a, b) { c.css(a, b) }), c; if (b === k) { if (c.length < 1) return ""; return c[0].style[da(a)] || Pb(c[0], a) || "" } c.each(function () { this.style[da(a)] = b }); return c }, width: function (a) { if (a === k) { if (this.length < 1) return 0; return this[0].offsetWidth } return this.css("width", s(a)) }, height: function (a) { if (a === k) { if (this.length < 1) return 0; return this[0].offsetHeight } return this.css("height", s(a)) }, opacity: function (a) {
                this.each(function () {
                    this.style.opacity ===
                    k ? this.style.filter = a == 1 ? "" : "alpha(opacity=" + a * 100 + ")" : this.style.opacity = a == 1 ? "" : a
                }); return this
            }, data: function (a, b) { if (b === k) return this._data[a]; this._data[a] = b; return this }, pos: function () { var a = this[0], b = 0, c = 0; if (a) if (a.getBoundingClientRect) a = a.getBoundingClientRect(), c = fa(this.doc), b = a.left + c.x, c = a.top + c.y; else for (; a;) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent; return { x: O(b), y: O(c) } }, clone: function (a) { if (this.length < 1) return new J([]); return new J([this[0].cloneNode(a)]) }, append: function (a) {
                this.each(function () {
                    this.appendChild &&
                    this.appendChild(f(a)[0])
                }); return this
            }, before: function (a) { this.each(function () { this.parentNode.insertBefore(f(a)[0], this) }); return this }, after: function (a) { this.each(function () { this.nextSibling ? this.parentNode.insertBefore(f(a)[0], this.nextSibling) : this.parentNode.appendChild(f(a)[0]) }); return this }, replaceWith: function (a) { var b = []; this.each(function (c, d) { M(d); var e = f(a)[0]; d.parentNode.replaceChild(e, d); b.push(e) }); return f(b) }, empty: function () {
                this.each(function (a, b) {
                    for (var c = b.firstChild; c;) {
                        if (!b.parentNode) break;
                        var d = c.nextSibling; c.parentNode.removeChild(c); c = d
                    }
                }); return this
            }, remove: function (a) { var b = this; b.each(function (c, d) { if (d.parentNode) { M(d); if (a) for (var e = d.firstChild; e;) { var f = e.nextSibling; d.parentNode.insertBefore(e, d); e = f } d.parentNode.removeChild(d); delete b[c] } }); b.length = 0; b._data = {}; return b }, show: function (a) { return this.css("display", a === k ? "block" : a) }, hide: function () { return this.css("display", "none") }, outer: function () {
                if (this.length < 1) return ""; var a = this.doc.createElement("div"); a.appendChild(this[0].cloneNode(!0));
                return P(a.innerHTML)
            }, isSingle: function () { return !!db[this.name] }, isInline: function () { return !!eb[this.name] }, isBlock: function () { return !!fb[this.name] }, isStyle: function () { return !!Gb[this.name] }, isControl: function () { return !!Wb[this.name] }, contains: function (a) { if (this.length < 1) return !1; return qa(this[0], f(a)[0]) }, parent: function () { if (this.length < 1) return null; var a = this[0].parentNode; return a ? new J([a]) : null }, children: function () {
                if (this.length < 1) return []; for (var a = [], b = this[0].firstChild; b;) (b.nodeType !=
                3 || w(b.nodeValue) !== "") && a.push(new J([b])), b = b.nextSibling; return a
            }, first: function () { var a = this.children(); return a.length > 0 ? a[0] : null }, last: function () { var a = this.children(); return a.length > 0 ? a[a.length - 1] : null }, index: function () { if (this.length < 1) return -1; for (var a = -1, b = this[0]; b;) a++, b = b.previousSibling; return a }, prev: function () { if (this.length < 1) return null; var a = this[0].previousSibling; return a ? new J([a]) : null }, next: function () {
                if (this.length < 1) return null; var a = this[0].nextSibling; return a ? new J([a]) :
                null
            }, scan: function (a, b) { function c(d) { for (d = b ? d.firstChild : d.lastChild; d;) { var e = b ? d.nextSibling : d.previousSibling; if (a(d) === !1) return !1; if (c(d) === !1) return !1; d = e } } if (!(this.length < 1)) return b = b === k ? !0 : b, c(this[0]), this }
        }); l("blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error,contextmenu".split(","), function (a, b) {
            J.prototype[b] = function (a) {
                return a ? this.bind(b,
                a) : this.fire(b)
            }
        }); A = f; f = function (a, b) {
            function c(a) { a[0] || (a = []); return new J(a) } if (!(a === k || a === null)) {
                if (typeof a === "string") {
                    b && (b = f(b)[0]); var d = a.length; a.charAt(0) === "@" && (a = a.substr(1)); if (a.length !== d || /<.+>/.test(a)) { var d = (b ? b.ownerDocument || b : document).createElement("div"), e = []; d.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + a; for (var i = 0, g = d.childNodes.length; i < g; i++) { var h = d.childNodes[i]; h.id != "__kindeditor_temp_tag__" && e.push(h) } return c(e) } return c(sa(a,
                    b))
                } if (a && a.get) return a; if (ca(a)) return c(a); return c(Da(arguments))
            }
        }; l(A, function (a, b) { f[a] = b }); B.KindEditor = f; var ha = 0, ga = 1, Y = 2, ia = 3, Jb = 0; D(S, {
            init: function (a) { this.startContainer = a; this.startOffset = 0; this.endContainer = a; this.endOffset = 0; this.collapsed = !0; this.doc = a }, commonAncestor: function () {
                function a(a) { for (var b = []; a;) b.push(a), a = a.parentNode; return b } for (var b = a(this.startContainer), c = a(this.endContainer), d = 0, e = b.length, f = c.length, g, h; ++d;) if (g = b[e - d], h = c[f - d], !g || !h || g !== h) break; return b[e -
                d + 1]
            }, setStart: function (a, b) { var c = this.doc; this.startContainer = a; this.startOffset = b; if (this.endContainer === c) this.endContainer = a, this.endOffset = b; return kb(this) }, setEnd: function (a, b) { var c = this.doc; this.endContainer = a; this.endOffset = b; if (this.startContainer === c) this.startContainer = a, this.startOffset = b; return kb(this) }, setStartBefore: function (a) { return this.setStart(a.parentNode || this.doc, f(a).index()) }, setStartAfter: function (a) { return this.setStart(a.parentNode || this.doc, f(a).index() + 1) }, setEndBefore: function (a) {
                return this.setEnd(a.parentNode ||
                this.doc, f(a).index())
            }, setEndAfter: function (a) { return this.setEnd(a.parentNode || this.doc, f(a).index() + 1) }, selectNode: function (a) { return this.setStartBefore(a).setEndAfter(a) }, selectNodeContents: function (a) { var b = f(a); if (b.type == 3 || b.isSingle()) return this.selectNode(a); b = b.children(); if (b.length > 0) return this.setStartBefore(b[0][0]).setEndAfter(b[b.length - 1][0]); return this.setStart(a, 0).setEnd(a, 0) }, collapse: function (a) {
                if (a) return this.setEnd(this.startContainer, this.startOffset); return this.setStart(this.endContainer,
                this.endOffset)
            }, compareBoundaryPoints: function (a, b) {
                var c = this.get(), d = b.get(); if (n) {
                    var e = {}; e[ha] = "StartToStart"; e[ga] = "EndToStart"; e[Y] = "EndToEnd"; e[ia] = "StartToEnd"; c = c.compareEndPoints(e[a], d); if (c !== 0) return c; var i, g, h, j; if (a === ha || a === ia) i = this.startContainer, h = this.startOffset; if (a === ga || a === Y) i = this.endContainer, h = this.endOffset; if (a === ha || a === ga) g = b.startContainer, j = b.startOffset; if (a === Y || a === ia) g = b.endContainer, j = b.endOffset; if (i === g) return i = h - j, i > 0 ? 1 : i < 0 ? -1 : 0; for (c = g; c && c.parentNode !==
                    i;) c = c.parentNode; if (c) return f(c).index() >= h ? -1 : 1; for (c = i; c && c.parentNode !== g;) c = c.parentNode; if (c) return f(c).index() >= j ? 1 : -1; if ((c = f(g).next()) && c.contains(i)) return 1; if ((c = f(i).next()) && c.contains(g)) return -1
                } else return c.compareBoundaryPoints(a, d)
            }, cloneRange: function () { return (new S(this.doc)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset) }, toString: function () { var a = this.get(); return (n ? a.text : a.toString()).replace(/\r\n|\n|\r/g, "") }, cloneContents: function () {
                return Ka(this,
                !0, !1)
            }, deleteContents: function () { return Ka(this, !1, !0) }, extractContents: function () { return Ka(this, !0, !0) }, insertNode: function (a) {
                var b = this.startContainer, c = this.startOffset, d = this.endContainer, e = this.endOffset, f, g, h, j = 1; if (a.nodeName.toLowerCase() === "#document-fragment") f = a.firstChild, g = a.lastChild, j = a.childNodes.length; b.nodeType == 1 ? (h = b.childNodes[c]) ? (b.insertBefore(a, h), b === d && (e += j)) : b.appendChild(a) : b.nodeType == 3 && (c === 0 ? (b.parentNode.insertBefore(a, b), b.parentNode === d && (e += j)) : c >= b.nodeValue.length ?
                b.nextSibling ? b.parentNode.insertBefore(a, b.nextSibling) : b.parentNode.appendChild(a) : (h = c > 0 ? b.splitText(c) : b, b.parentNode.insertBefore(a, h), b === d && (d = h, e -= c))); f ? this.setStartBefore(f).setEndAfter(g) : this.selectNode(a); if (this.compareBoundaryPoints(Y, this.cloneRange().setEnd(d, e)) >= 1) return this; return this.setEnd(d, e)
            }, surroundContents: function (a) { a.appendChild(this.extractContents()); return this.insertNode(a).selectNode(a) }, isControl: function () {
                var a = this.startContainer, b = this.startOffset, c = this.endContainer,
                d = this.endOffset; return a.nodeType == 1 && a === c && b + 1 === d && f(a.childNodes[b]).isControl()
            }, get: function (a) {
                var b = this.doc; if (!n) { b = b.createRange(); try { b.setStart(this.startContainer, this.startOffset), b.setEnd(this.endContainer, this.endOffset) } catch (c) { } return b } if (a && this.isControl()) return b = b.body.createControlRange(), b.addElement(this.startContainer.childNodes[this.startOffset]), b; a = this.cloneRange().down(); b = b.body.createTextRange(); b.setEndPoint("StartToStart", mb(a.startContainer, a.startOffset));
                b.setEndPoint("EndToStart", mb(a.endContainer, a.endOffset)); return b
            }, html: function () { return f(this.cloneContents()).outer() }, down: function () { function a(a, d, e) { if (a.nodeType == 1 && (a = f(a).children(), a.length !== 0)) { var i, g, h, j; d > 0 && (i = a[d - 1]); d < a.length && (g = a[d]); if (i && i.type == 3) h = i[0], j = h.nodeValue.length; g && g.type == 3 && (h = g[0], j = 0); h && (e ? b.setStart(h, j) : b.setEnd(h, j)) } } var b = this; a(b.startContainer, b.startOffset, !0); a(b.endContainer, b.endOffset, !1); return b }, up: function () {
                function a(a, d, e) {
                    a.nodeType ==
                    3 && (d === 0 ? e ? b.setStartBefore(a) : b.setEndBefore(a) : d == a.nodeValue.length && (e ? b.setStartAfter(a) : b.setEndAfter(a)))
                } var b = this; a(b.startContainer, b.startOffset, !0); a(b.endContainer, b.endOffset, !1); return b
            }, enlarge: function (a) {
                function b(b, e, i) {
                    b = f(b); if (!(b.type == 3 || Ca[b.name] || !a && b.isBlock())) if (e === 0) { for (; !b.prev() ;) { e = b.parent(); if (!e || Ca[e.name] || !a && e.isBlock()) break; b = e } i ? c.setStartBefore(b[0]) : c.setEndBefore(b[0]) } else if (e == b.children().length) {
                        for (; !b.next() ;) {
                            e = b.parent(); if (!e || Ca[e.name] ||
                            !a && e.isBlock()) break; b = e
                        } i ? c.setStartAfter(b[0]) : c.setEndAfter(b[0])
                    }
                } var c = this; c.up(); b(c.startContainer, c.startOffset, !0); b(c.endContainer, c.endOffset, !1); return c
            }, createBookmark: function (a) {
                var b, c = f('<span style="display:none;"></span>', this.doc)[0]; c.id = "__kindeditor_bookmark_start_" + Jb++ + "__"; if (!this.collapsed) b = c.cloneNode(!0), b.id = "__kindeditor_bookmark_end_" + Jb++ + "__"; b && this.cloneRange().collapse(!1).insertNode(b).setEndBefore(b); this.insertNode(c).setStartAfter(c); return {
                    start: a ?
                    "#" + c.id : c, end: b ? a ? "#" + b.id : b : null
                }
            }, moveToBookmark: function (a) { var b = this.doc, c = f(a.start, b), a = a.end ? f(a.end, b) : null; if (!c || c.length < 1) return this; this.setStartBefore(c[0]); c.remove(); a && a.length > 0 ? (this.setEndBefore(a[0]), a.remove()) : this.collapse(!0); return this }, dump: function () {
                console.log("--------------------"); console.log(this.startContainer.nodeType == 3 ? this.startContainer.nodeValue : this.startContainer, this.startOffset); console.log(this.endContainer.nodeType == 3 ? this.endContainer.nodeValue :
                this.endContainer, this.endOffset)
            }
        }); f.range = La; f.START_TO_START = ha; f.START_TO_END = ga; f.END_TO_END = Y; f.END_TO_START = ia; D(ua, {
            init: function (a) { var b = a.doc; this.doc = b; this.win = Q(b); this.sel = Ma(b); this.range = a }, selection: function (a) {
                var b = this.doc, c; c = Ma(b); var d; try { d = c.rangeCount > 0 ? c.getRangeAt(0) : c.createRange() } catch (e) { } c = n && (!d || !d.item && d.parentElement().ownerDocument !== b) ? null : d; this.sel = Ma(b); if (c) return this.range = La(c), f(this.range.startContainer).name == "html" && this.range.selectNodeContents(b.body).collapse(!1),
                this; a && this.range.selectNodeContents(b.body).collapse(!1); return this
            }, select: function () {
                var a = this.sel, b = this.range.cloneRange(), c = b.startContainer, d = b.startOffset, e = X(c), i = this.win; if (c.nodeType == 1 && b.collapsed) { if (n) { a = f("<span>&nbsp;</span>", e); b.insertNode(a[0]); b = e.body.createTextRange(); try { b.moveToElementText(a[0]) } catch (g) { } b.collapse(!1); b.select(); a.remove(); i.focus(); return this } if (ba) { var h = c.childNodes; (f(c).isInline() || d > 0 && f(h[d - 1]).isInline() || h[d] && f(h[d]).isInline()) && b.insertNode(e.createTextNode("\u200b")) } } b =
                b.get(!0); if (n) try { b.select() } catch (j) { } else a.removeAllRanges(), a.addRange(b); i.focus(); return this
            }, wrap: function (a) {
                var b = this.range, c; c = f(a, this.doc); if (b.collapsed) return b.insertNode(c[0]).selectNodeContents(c[0]), this; if (c.isBlock()) { for (var d = a = c.clone(!0) ; d.first() ;) d = d.first(); d.append(b.extractContents()); b.insertNode(a[0]).selectNode(a[0]); return this } b.enlarge(); var e = b.createBookmark(), a = b.commonAncestor(), i = !1; f(a).scan(function (a) {
                    if (!i && a == e.start) i = !0; else if (i) {
                        if (a == e.end) return !1;
                        var b = f(a); if (!sb(b) && b.type == 3 && w(a.nodeValue).length > 0) {
                            for (var d; (d = b.parent()) && d.isStyle() && d.children().length == 1;) b = d; d = c; d = d.clone(!0); if (b.type == 3) Z(d).append(b.clone(!1)), b.replaceWith(d); else {
                                for (var a = b, m; (m = b.first()) && m.children().length == 1;) b = m; m = b.first(); for (b = b.doc.createDocumentFragment() ; m;) b.appendChild(m[0]), m = m.next(); m = a.clone(!0); for (var k = Z(m), q = m, l = !1; d;) { for (; q;) q.name === d.name && (Qb(q, d.attr(), d.css()), l = !0), q = q.first(); l || k.append(d.clone(!1)); l = !1; d = d.first() } d = m; b.firstChild &&
                                Z(d).append(b); a.replaceWith(d)
                            }
                        }
                    }
                }); b.moveToBookmark(e); return this
            }, split: function (a, b) {
                for (var c = this.range, d = c.doc, e = c.cloneRange().collapse(a), i = e.startContainer, g = e.startOffset, h = i.nodeType == 3 ? i.parentNode : i, j = !1, m; h && h.parentNode;) { m = f(h); if (b) { if (!m.isStyle()) break; if (!ta(m, b)) break } else if (Ca[m.name]) break; j = !0; h = h.parentNode } if (j) d = d.createElement("span"), c.cloneRange().collapse(!a).insertNode(d), a ? e.setStartBefore(h.firstChild).setEnd(i, g) : e.setStart(i, g).setEndAfter(h.lastChild), i = e.extractContents(),
                g = i.firstChild, j = i.lastChild, a ? (e.insertNode(i), c.setStartAfter(j).setEndBefore(d)) : (h.appendChild(i), c.setStartBefore(d).setEndBefore(g)), e = d.parentNode, e == c.endContainer && (h = f(d).prev(), i = f(d).next(), h && i && h.type == 3 && i.type == 3 ? c.setEnd(h[0], h[0].nodeValue.length) : a || c.setEnd(c.endContainer, c.endOffset - 1)), e.removeChild(d); return this
            }, remove: function (a) {
                var b = this.doc, c = this.range; if (c.collapsed) return this.split(!0, a), c.collapse(!0), this; c.enlarge(); if (c.startOffset === 0) {
                    for (var d = f(c.startContainer),
                    e; (e = d.parent()) && e.isStyle() && e.children().length == 1;) d = e; c.setStart(d[0], 0); d = f(c.startContainer); d.isBlock() && Na(d, a); (d = d.parent()) && d.isBlock() && Na(d, a)
                } this.split(!0, a); this.split(!1, a); var i = b.createElement("span"), g = b.createElement("span"); c.cloneRange().collapse(!1).insertNode(g); c.cloneRange().collapse(!0).insertNode(i); var h = [], j = !1; f(c.commonAncestor()).scan(function (a) { if (!j && a == i) j = !0; else { if (a == g) return !1; j && h.push(a) } }); f(i).remove(); f(g).remove(); var b = c.startContainer, m = c.startOffset,
                d = c.endContainer; e = c.endOffset; if (m > 0) { var k = f(b.childNodes[m - 1]); k && Z(k).isStyle() && (k.remove(), c.setStart(b, m - 1), b == d && c.setEnd(d, e - 1)); if ((m = f(b.childNodes[m])) && Z(m).isStyle()) m.remove(), b == d && c.setEnd(d, e - 1) } (b = f(d.childNodes[c.endOffset])) && Z(b).isStyle() && b.remove(); b = c.createBookmark(!0); l(h, function (b, c) { Na(f(c), a) }); c.moveToBookmark(b); return this
            }, commonNode: function (a) {
                for (var b = this.range, c = b.endContainer, b = b.endOffset, d = c.nodeType == 3 || b === 0 ? c : c.childNodes[b - 1], e = d, i = d; i;) {
                    if (ta(f(i),
                    a)) return f(i); i = i.parentNode
                } for (; e && (e = e.firstChild) && e.childNodes.length == 1;) if (ta(f(e), a)) return f(e); if (d.nodeType == 1 || c.nodeType == 3 && b === 0) if ((c = f(d).prev()) && ta(c, a)) return c; return null
            }, commonAncestor: function (a) {
                function b(b) { for (; b;) { if (b.nodeType == 1 && b.tagName.toLowerCase() === a) return b; b = b.parentNode } return null } var c = this.range, d = c.startContainer, e = c.startOffset, i = c.endContainer, c = c.endOffset, i = i.nodeType == 3 || c === 0 ? i : i.childNodes[c - 1], d = b(d.nodeType == 3 || e === 0 ? d : d.childNodes[e - 1]), e =
                b(i); if (d && e && d === e) return f(d); return null
            }, state: function (a) { var b = this.doc, c = !1; try { c = b.queryCommandState(a) } catch (d) { } return c }, val: function (a) {
                var b = this.doc, a = a.toLowerCase(), c = ""; if (a === "fontfamily" || a === "fontname") return c = ob(b, "fontname"), c = c.replace(/['"]/g, ""), c.toLowerCase(); if (a === "formatblock") { c = ob(b, a); if (c === "" && (a = this.commonNode({ "h1,h2,h3,h4,h5,h6,p,div,pre,address": "*" }))) c = a.name; c === "Normal" && (c = "p"); return c.toLowerCase() } if (a === "fontsize") return (a = this.commonNode({ "*": ".font-size" })) &&
                (c = a.css("font-size")), c.toLowerCase(); if (a === "forecolor") return (a = this.commonNode({ "*": ".color" })) && (c = a.css("color")), c = la(c), c === "" && (c = "default"), c.toLowerCase(); if (a === "hilitecolor") return (a = this.commonNode({ "*": ".background-color" })) && (c = a.css("background-color")), c = la(c), c === "" && (c = "default"), c.toLowerCase(); return c
            }, toggle: function (a, b) { this.commonNode(b) ? this.remove(b) : this.wrap(a); return this.select() }, bold: function () {
                return this.toggle("<strong></strong>", {
                    span: ".font-weight=bold", strong: "*",
                    b: "*"
                })
            }, italic: function () { return this.toggle("<em></em>", { span: ".font-style=italic", em: "*", i: "*" }) }, underline: function () { return this.toggle("<u></u>", { span: ".text-decoration=underline", u: "*" }) }, strikethrough: function () { return this.toggle("<s></s>", { span: ".text-decoration=line-through", s: "*" }) }, forecolor: function (a) { return this.toggle('<span style="color:' + a + ';"></span>', { span: ".color=" + a, font: "color" }) }, hilitecolor: function (a) {
                return this.toggle('<span style="background-color:' + a + ';"></span>', {
                    span: ".background-color=" +
                    a
                })
            }, fontsize: function (a) { return this.toggle('<span style="font-size:' + a + ';"></span>', { span: ".font-size=" + a, font: "size" }) }, fontname: function (a) { return this.fontfamily(a) }, fontfamily: function (a) { return this.toggle('<span style="font-family:' + a + ';"></span>', { span: ".font-family=" + a, font: "face" }) }, removeformat: function () { var a = { "*": ".font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family" }; l(Gb, function (b) { a[b] = "*" }); this.remove(a); return this.select() }, inserthtml: function (a) {
                function b(a,
                b) { var b = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + b, c = a.get(); c.item ? c.item(0).outerHTML = b : c.pasteHTML(b); var e = a.doc.getElementById("__kindeditor_temp_tag__"); e.parentNode.removeChild(e); c = nb(c); a.setEnd(c.endContainer, c.endOffset); a.collapse(!1); d.select() } function c(a, b) { var c = a.doc, e = c.createDocumentFragment(); f("@" + b, c).each(function () { e.appendChild(this) }); a.deleteContents(); a.insertNode(e); a.collapse(!1); d.select() } var d = this, e = d.range; if (a === "") return d;
                if (sb(f(e.startContainer))) return d; if (n) { try { b(e, a) } catch (i) { c(e, a) } return d } c(e, a); return d
            }, hr: function () { return this.inserthtml("<hr />") }, print: function () { this.win.print(); return this }, insertimage: function (a, b, c, d, e, f) { b = o(b, ""); o(e, 0); a = '<img src="' + C(a) + '" data-ke-src="' + C(a) + '" '; c && (a += 'width="' + C(c) + '" '); d && (a += 'height="' + C(d) + '" '); b && (a += 'title="' + C(b) + '" '); f && (a += 'align="' + C(f) + '" '); a += 'alt="' + C(b) + '" '; a += "/>"; return this.inserthtml(a) }, createlink: function (a, b) {
                var c = this.doc, d = this.range;
                this.select(); var e = this.commonNode({ a: "*" }); e && !d.isControl() && (d.selectNode(e.get()), this.select()); d.collapsed ? (c = '<a href="' + C(a) + '" data-ke-src="' + C(a) + '" ', b && (c += ' target="' + C(b) + '"'), c += ">" + C(a) + "</a>", this.inserthtml(c)) : (N(c, "createlink", "__kindeditor_temp_url__"), e = this.commonNode({ a: "*" }), f('a[href="__kindeditor_temp_url__"]', e ? e.parent() : c).each(function () { f(this).attr("href", a).attr("data-ke-src", a); b ? f(this).attr("target", b) : f(this).removeAttr("target") })); return this
            }, unlink: function () {
                var a =
                this.doc, b = this.range; this.select(); if (b.collapsed) { var c = this.commonNode({ a: "*" }); c && (b.selectNode(c.get()), this.select()); N(a, "unlink", null); ba && f(b.startContainer).name === "img" && (a = f(b.startContainer).parent(), a.name === "a" && a.remove(!0)) } else N(a, "unlink", null); return this
            }
        }); l("formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript".split(","), function (a, b) {
            ua.prototype[b] = function (a) {
                if (n) {
                    rng = this.range.get(!0);
                    try { rng.select() } catch (d) { }
                } N(this.doc, b, a); (!n || L(b, "formatblock,selectall,insertorderedlist,insertunorderedlist".split(",")) >= 0) && this.selection(); return this
            }
        }); l("cut,copy,paste".split(","), function (a, b) { ua.prototype[b] = function () { if (!this.doc.queryCommandSupported(b)) throw "not supported"; if (n) { rng = this.range.get(!0); try { rng.select() } catch (a) { } } N(this.doc, b, null); return this } }); f.cmd = tb; D(T, {
            init: function (a) {
                var b = this; b.name = a.name || ""; b.doc = a.doc || document; b.win = Q(b.doc); b.x = s(a.x); b.y = s(a.y);
                b.z = a.z; b.width = s(a.width); b.height = s(a.height); b.div = f('<div style="display:block;"></div>'); b.options = a; b._alignEl = a.alignEl; b.width && b.div.css("width", b.width); b.height && b.div.css("height", b.height); b.z && b.div.css({ position: "absolute", left: b.x, top: b.y, "z-index": b.z }); b.z && (b.x === k || b.y === k) && b.autoPos(b.width, b.height); a.cls && b.div.addClass(a.cls); a.css && b.div.css(a.css); a.src ? f(a.src).hide().after(b.div) : f(b.doc.body).append(b.div); a.html && b.div.html(a.html); if (a.autoScroll) if (n && F < 7 || R) {
                    var c =
                    fa(); f(b.win).bind("scroll", function () { var a = fa(), e = a.x - c.x, a = a.y - c.y; b.pos(z(b.x) + e, z(b.y) + a, !1) })
                } else b.div.css("position", "fixed")
            }, pos: function (a, b, c) { c = o(c, !0); if (a !== null && (a = a < 0 ? 0 : s(a), this.div.css("left", a), c)) this.x = a; if (b !== null && (b = b < 0 ? 0 : s(b), this.div.css("top", b), c)) this.y = b; return this }, autoPos: function (a, b) {
                var c = z(a) || 0, d = z(b) || 0, e = fa(); if (this._alignEl) { var i = f(this._alignEl), g = i.pos(), c = O(i[0].clientWidth / 2 - c / 2), d = O(i[0].clientHeight / 2 - d / 2); x = c < 0 ? g.x : g.x + c; y = d < 0 ? g.y : g.y + d } else g =
                G(this.doc), x = O(e.x + (g.clientWidth - c) / 2), y = O(e.y + (g.clientHeight - d) / 2); n && F < 7 || R || (x -= e.x, y -= e.y); return this.pos(x, y)
            }, remove: function () { var a = this; n && F < 7 && f(a.win).unbind("scroll"); a.div.remove(); l(a, function (b) { a[b] = null }); return this }, show: function () { this.div.show(); return this }, hide: function () { this.div.hide(); return this }, draggable: function (a) { var b = this, a = a || {}; a.moveEl = b.div; a.moveFn = function (a, d, e, f, g, h) { if ((a += g) < 0) a = 0; if ((d += h) < 0) d = 0; b.pos(a, d) }; Oa(a); return b }
        }); f.widget = Qa; D(va, T, {
            init: function (a) {
                function b() {
                    var b =
                    Pa(c.iframe); b.open(); if (h) b.domain = document.domain; b.write(Rb(d, e, i, g)); b.close(); c.win = c.iframe[0].contentWindow; c.doc = b; var j = tb(b); c.afterChange(function () { j.selection() }); ba && f(b).click(function (a) { f(a.target).name === "img" && (j.selection(!0), j.range.selectNode(a.target), j.select()) }); n && f(b).keydown(function (a) { if (a.which == 8) { j.selection(); var b = j.range; b.isControl() && (b.collapse(!0), f(b.startContainer.childNodes[b.startOffset]).remove(), a.preventDefault()) } }); c.cmd = j; c.html($(c.srcElement));
                    n ? (b.body.disabled = !0, b.body.contentEditable = !0, b.body.removeAttribute("disabled")) : b.designMode = "on"; a.afterCreate && a.afterCreate.call(c)
                } var c = this; va.parent.init.call(c, a); c.srcElement = f(a.srcElement); c.div.addClass("ke-edit"); c.designMode = o(a.designMode, !0); c.beforeGetHtml = a.beforeGetHtml; c.beforeSetHtml = a.beforeSetHtml; c.afterSetHtml = a.afterSetHtml; var d = o(a.themesPath, ""), e = a.bodyClass, i = a.cssPath, g = a.cssData, h = location.host.replace(/:\d+/, "") !== document.domain, j = "document.open();" + (h ? 'document.domain="' +
                document.domain + '";' : "") + "document.close();", j = n ? ' src="javascript:void(function(){' + encodeURIComponent(j) + '}())"' : ""; c.iframe = f('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + j + "></iframe>").css("width", "100%"); c.textarea = f('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css("width", "100%"); c.width && c.setWidth(c.width); c.height && c.setHeight(c.height); c.designMode ? c.textarea.hide() : c.iframe.hide(); h && c.iframe.bind("load", function () {
                    c.iframe.unbind("load"); n ? b() :
                    setTimeout(b, 0)
                }); c.div.append(c.iframe); c.div.append(c.textarea); c.srcElement.hide(); !h && b()
            }, setWidth: function (a) { this.div.css("width", s(a)); return this }, setHeight: function (a) { a = s(a); this.div.css("height", a); this.iframe.css("height", a); if (n && F < 8 || R) a = s(z(a) - 2); this.textarea.css("height", a); return this }, remove: function () {
                var a = this.doc; f(a.body).unbind(); f(a).unbind(); f(this.win).unbind(); $(this.srcElement, this.html()); this.srcElement.show(); a.write(""); this.iframe.unbind(); this.textarea.unbind();
                va.parent.remove.call(this)
            }, html: function (a, b) { var c = this.doc; if (this.designMode) { c = c.body; if (a === k) return a = b ? "<!doctype html><html>" + c.parentNode.innerHTML + "</html>" : c.innerHTML, this.beforeGetHtml && (a = this.beforeGetHtml(a)), Va && a == "<br />" && (a = ""), a; this.beforeSetHtml && (a = this.beforeSetHtml(a)); f(c).html(a); this.afterSetHtml && this.afterSetHtml(); return this } if (a === k) return this.textarea.val(); this.textarea.val(a); return this }, design: function (a) {
                if (a === k ? !this.designMode : a) {
                    if (!this.designMode) a =
                    this.html(), this.designMode = !0, this.html(a), this.textarea.hide(), this.iframe.show()
                } else if (this.designMode) a = this.html(), this.designMode = !1, this.html(a), this.iframe.hide(), this.textarea.show(); return this.focus()
            }, focus: function () { this.designMode ? this.win.focus() : this.textarea[0].focus(); return this }, blur: function () {
                if (n) { var a = f('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', this.div); this.div.append(a); a[0].focus(); a.remove() } else this.designMode ?
                this.win.blur() : this.textarea[0].blur(); return this
            }, afterChange: function (a) { function b(b) { setTimeout(function () { a(b) }, 1) } var c = this.doc, d = c.body; f(c).keyup(function (b) { !b.ctrlKey && !b.altKey && Wa[b.which] && a(b) }); f(c).mouseup(a).contextmenu(a); f(this.win).blur(a); f(d).bind("paste", b); f(d).bind("cut", b); return this }
        }); f.edit = ub; f.iframeDoc = Pa; D(Ra, T, {
            init: function (a) {
                function b(a) { a = f(a); if (a.hasClass("ke-outline")) return a; if (a.hasClass("ke-toolbar-icon")) return a.parent() } function c(a, c) {
                    var d = b(a.target);
                    if (d && !d.hasClass("ke-disabled") && !d.hasClass("ke-selected")) d[c]("ke-on")
                } var d = this; Ra.parent.init.call(d, a); d.disableMode = o(a.disableMode, !1); d.noDisableItemMap = t(o(a.noDisableItems, [])); d._itemMap = {}; d.div.addClass("ke-toolbar").bind("contextmenu,mousedown,mousemove", function (a) { a.preventDefault() }); d.div.mouseover(function (a) { c(a, "addClass") }).mouseout(function (a) { c(a, "removeClass") }).click(function (a) { var c = b(a.target); c && !c.hasClass("ke-disabled") && d.options.click.call(this, a, c.attr("data-name")) })
            },
            get: function (a) { if (this._itemMap[a]) return this._itemMap[a]; return this._itemMap[a] = f("span.ke-icon-" + a, this.div).parent() }, select: function (a) { vb.call(this, a, function (a) { a.addClass("ke-selected") }); return self }, unselect: function (a) { vb.call(this, a, function (a) { a.removeClass("ke-selected").removeClass("ke-on") }); return self }, enable: function (a) { if (a = a.get ? a : this.get(a)) a.removeClass("ke-disabled"), a.opacity(1); return this }, disable: function (a) {
                if (a = a.get ? a : this.get(a)) a.removeClass("ke-selected").addClass("ke-disabled"),
                a.opacity(0.5); return this
            }, disableAll: function (a, b) { var c = this, d = c.noDisableItemMap; b && (d = t(b)); (a === k ? !c.disableMode : a) ? (f("span.ke-outline", c.div).each(function () { var a = f(this), b = a[0].getAttribute("data-name", 2); d[b] || c.disable(a) }), c.disableMode = !0) : (f("span.ke-outline", c.div).each(function () { var a = f(this), b = a[0].getAttribute("data-name", 2); d[b] || c.enable(a) }), c.disableMode = !1); return c }
        }); f.toolbar = wb; D(wa, T, {
            init: function (a) {
                a.z = a.z || 811213; wa.parent.init.call(this, a); this.centerLineMode = o(a.centerLineMode,
                !0); this.div.addClass("ke-menu").bind("click,mousedown", function (a) { a.stopPropagation() })
            }, addItem: function (a) {
                if (a.title === "-") this.div.append(f('<div class="ke-menu-separator"></div>')); else {
                    var b = f('<div class="ke-menu-item"></div>'), c = f('<div class="ke-inline-block ke-menu-item-left"></div>'), d = f('<div class="ke-inline-block ke-menu-item-right"></div>'), e = s(a.height), i = a.iconClass; this.div.append(b); e && (b.css("height", e), d.css("line-height", e)); var g; this.centerLineMode && (g = f('<div class="ke-inline-block ke-menu-item-center"></div>'),
                    e && g.css("height", e)); b.mouseover(function () { f(this).addClass("ke-menu-item-on"); g && g.addClass("ke-menu-item-center-on") }).mouseout(function () { f(this).removeClass("ke-menu-item-on"); g && g.removeClass("ke-menu-item-center-on") }).click(function (b) { a.click.call(f(this)); b.stopPropagation() }).append(c); g && b.append(g); b.append(d); a.checked && (i = "ke-icon-checked"); c.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + i + '"></span>'); d.html(a.title); return this
                }
            }, remove: function () {
                this.options.beforeRemove &&
                this.options.beforeRemove.call(this); f(".ke-menu-item", this.div[0]).unbind(); wa.parent.remove.call(this); return this
            }
        }); f.menu = Sa; D(xa, T, {
            init: function (a) {
                a.z = a.z || 811213; xa.parent.init.call(this, a); var b = a.colors || [["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]]; this.selectedColor = (a.selectedColor ||
                "").toLowerCase(); this._cells = []; this.div.addClass("ke-colorpicker").bind("click,mousedown", function (a) { a.stopPropagation() }); a = this.doc.createElement("table"); this.div.append(a); a.className = "ke-colorpicker-table"; a.cellPadding = 0; a.cellSpacing = 0; a.border = 0; var c = a.insertRow(0), d = c.insertCell(0); d.colSpan = b[0].length; this._addAttr(d, "", "ke-colorpicker-cell-top"); for (var e = 0; e < b.length; e++) for (var c = a.insertRow(e + 1), f = 0; f < b[e].length; f++) d = c.insertCell(f), this._addAttr(d, b[e][f], "ke-colorpicker-cell")
            },
            _addAttr: function (a, b, c) { var d = this, a = f(a).addClass(c); d.selectedColor === b.toLowerCase() && a.addClass("ke-colorpicker-cell-selected"); a.attr("title", b || d.options.noColor); a.mouseover(function () { f(this).addClass("ke-colorpicker-cell-on") }); a.mouseout(function () { f(this).removeClass("ke-colorpicker-cell-on") }); a.click(function (a) { a.stop(); d.options.click.call(f(this), b) }); b ? a.append(f('<div class="ke-colorpicker-cell-color"></div>').css("background-color", b)) : a.html(d.options.noColor); d._cells.push(a) },
            remove: function () { l(this._cells, function () { this.unbind() }); xa.parent.remove.call(this); return this }
        }); f.colorpicker = xb; D(yb, {
            init: function (a) {
                var b = f(a.button), c = a.fieldName || "file", d = a.url || "", e = b.val(), i = b[0].className || "", g = "kindeditor_upload_iframe_" + (new Date).getTime(), c = ['<div class="ke-inline-block ' + i + '">', '<iframe name="' + g + '" style="display:none;"></iframe>', '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + g + '" action="' + d + '">', '<span class="ke-button-common">',
                '<input type="button" class="ke-button-common ke-button" value="' + e + '" />', "</span>", '<input type="file" class="ke-upload-file" name="' + c + '" tabindex="-1" />', "</form></div>"].join(""), c = f(c, b.doc); b.hide(); b.before(c); this.div = c; this.button = b; this.iframe = f("iframe", c); this.form = f("form", c); this.fileBox = f(".ke-upload-file", c).width(f(".ke-button-common").width()); this.options = a
            }, submit: function () {
                var a = this, b = a.iframe; b.bind("load", function () {
                    b.unbind(); var c, e = f.iframeDoc(b).body.innerHTML; try {
                        c =
                        f.json(e)
                    } catch (i) { alert(e) } c && a.options.afterUpload.call(a, c)
                }); a.form[0].submit(); var c = document.createElement("form"); a.fileBox.before(c); f(c).append(a.fileBox); c.reset(); f(c).remove(!0); return a
            }, remove: function () { this.fileBox && this.fileBox.unbind(); this.div.remove(); this.button.show(); return this }
        }); f.uploadbutton = function (a) { return new yb(a) }; D(ya, T, {
            init: function (a) {
                a.z = a.z || 811213; ya.parent.init.call(this, a); var b = a.title, c = f(a.body, this.doc), d = a.previewBtn, e = a.yesBtn, i = a.noBtn, g = a.closeBtn,
                h = o(a.shadowMode, !0), j = o(a.showMask, !0); this.div.addClass("ke-dialog").bind("click,mousedown", function (a) { a.stopPropagation() }).addClass("ke-dialog-" + (h ? "" : "no-") + "shadow"); h = f('<div class="ke-dialog-header"></div>'); this.div.append(h); h.html(b); this.closeIcon = f('<span class="ke-dialog-icon-close" title="' + g.name + '"></span>').click(g.click); h.append(this.closeIcon); this.draggable({ clickEl: h, beforeDrag: a.beforeDrag }); a = f('<div class="ke-dialog-body"></div>'); this.div.append(a); a.append(c); var m = f('<div class="ke-dialog-footer"></div>');
                (d || e || i) && this.div.append(m); l([{ btn: d, name: "preview" }, { btn: e, name: "yes" }, { btn: i, name: "no" }], function () { if (this.btn) { var a = this.btn, a = a || {}, b = a.name || "", c = f('<span class="ke-button-common ke-button-outer" title="' + b + '"></span>'), b = f('<input class="ke-button-common ke-button" type="button" value="' + b + '" />'); a.click && b.click(a.click); c.append(b); c.addClass("ke-dialog-" + this.name); m.append(c) } }); this.height && a.height(z(this.height) - h.height() - m.height()); this.mask = null; if (j) c = G(this.doc), this.mask =
                Qa({ x: 0, y: 0, z: this.z - 1, cls: "ke-dialog-mask", width: Math.max(c.scrollWidth, c.clientWidth), height: Math.max(c.scrollHeight, c.clientHeight) }); this.autoPos(this.div.width(), this.div.height()); this.footerDiv = m; this.bodyDiv = a; this.headerDiv = h
            }, remove: function () { this.options.beforeRemove && this.options.beforeRemove.call(this); this.mask && this.mask.remove(); this.closeIcon.unbind(); f("input", this.div).unbind(); this.footerDiv.unbind(); this.bodyDiv.unbind(); this.headerDiv.unbind(); ya.parent.remove.call(this); return this }
        });
        f.dialog = zb; f.tabs = function (a) {
            var b = Qa(a), c = b.remove, d = a.afterSelect, a = b.div, e = []; a.addClass("ke-tabs").bind("contextmenu,mousedown,mousemove", function (a) { a.preventDefault() }); var i = f('<ul class="ke-tabs-ul ke-clearfix"></ul>'); a.append(i); b.add = function (a) { var b = f('<li class="ke-tabs-li">' + a.title + "</li>"); b.data("tab", a); e.push(b); i.append(b) }; b.selectedIndex = 0; b.select = function (a) {
                b.selectedIndex = a; l(e, function (c, d) {
                    d.unbind(); c === a ? (d.addClass("ke-tabs-li-selected"), f(d.data("tab").panel).show("")) :
                    (d.removeClass("ke-tabs-li-selected").removeClass("ke-tabs-li-on").mouseover(function () { f(this).addClass("ke-tabs-li-on") }).mouseout(function () { f(this).removeClass("ke-tabs-li-on") }).click(function () { b.select(c) }), f(d.data("tab").panel).hide())
                }); d && d.call(b, a)
            }; b.remove = function () { l(e, function () { this.remove() }); i.remove(); c.call(b) }; return b
        }; f.loadScript = Ta; f.loadStyle = Ua; f.ajax = function (a, b, c, d) {
            var c = c || "GET", e = B.XMLHttpRequest ? new B.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"); e.open(c,
            a, !0); e.onreadystatechange = function () { e.readyState == 4 && e.status == 200 && b && (d = Ya(w(e.responseText)), b(d)) }; if (c == "POST") { var f = []; l(d, function (a, b) { f.push(encodeURIComponent(a) + "=" + encodeURIComponent(b)) }); try { e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") } catch (g) { } e.send(f.join("&")) } else e.send(null)
        }; var aa = {}, K = {}; Aa.prototype = {
            lang: function (a) { return Cb(a, this.langType) }, loadPlugin: function (a, b) {
                var c = this; if (aa[a]) {
                    if (c._calledPlugins[a]) return b && b.call(c), c; aa[a].call(c,
                    KindEditor); b && b.call(c); c._calledPlugins[a] = !0; return c
                } Ta(c.pluginsPath + a + "/" + a + ".js?ver=" + encodeURIComponent(f.DEBUG ? Ba : "4.0 (2011-09-26)"), function () { aa[a] && c.loadPlugin(a, b) }); return c
            }, handler: function (a, b) { var c = this; c._handlers[a] || (c._handlers[a] = []); if (Xa(b)) return c._handlers[a].push(b), c; l(c._handlers[a], function () { b = this.call(c, b) }); return b }, clickToolbar: function (a, b) {
                var c = this, d = "clickToolbar" + a; if (b === k) {
                    if (c._handlers[d]) return c.handler(d); c.loadPlugin(a, function () { c.handler(d) });
                    return c
                } return c.handler(d, b)
            }, updateState: function () { var a = this; l("justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,subscript,superscript,bold,italic,underline,strikethrough".split(","), function (b, c) { a.cmd.state(c) ? a.toolbar.select(c) : a.toolbar.unselect(c) }); return a }, addContextmenu: function (a) { this._contextmenus.push(a); return this }, afterCreate: function (a) { return this.handler("afterCreate", a) }, beforeRemove: function (a) { return this.handler("beforeRemove", a) },
            beforeGetHtml: function (a) { return this.handler("beforeGetHtml", a) }, beforeSetHtml: function (a) { return this.handler("beforeSetHtml", a) }, afterSetHtml: function (a) { return this.handler("afterSetHtml", a) }, create: function () {
                function a(a, c, d) { d = o(d, !0); if (a && a >= b.minWidth && (b.resize(a, null), d)) b.width = s(a); if (c && c >= b.minHeight && (b.resize(null, c), d)) b.height = s(c) } var b = this, c = b.fullscreenMode; if (b.isCreated) return b; c ? G().style.overflow = "hidden" : G().style.overflow = ""; var d = c ? G().clientWidth + "px" : b.width, e = c ?
                G().clientHeight + "px" : b.height; if (n && F < 8 || R) e = s(z(e) + 2); var i = b.container = f(b.layout); c ? f(document.body).append(i) : b.srcElement.before(i); var g = f(".toolbar", i), h = f(".edit", i), j = b.statusbar = f(".statusbar", i); i.removeClass("container").addClass("ke-container ke-container-" + b.themeType).css("width", d); c ? (i.css({ position: "absolute", left: 0, top: 0, "z-index": 811211 }), b._scrollPos = fa(), B.scrollTo(0, 0), f(document.body).css({ height: "1px", overflow: "hidden" }), f(document.body.parentNode).css("overflow", "hidden")) :
                b._scrollPos && (f(document.body).css({ height: "", overflow: "" }), f(document.body.parentNode).css("overflow", ""), B.scrollTo(b._scrollPos.x, b._scrollPos.y)); var m = []; f.each(b.items, function (a, c) { c == "|" ? m.push('<span class="ke-inline-block ke-separator"></span>') : c == "/" ? m.push("<br />") : (m.push('<span class="ke-inline-block ke-outline" data-name="' + c + '" title="' + b.lang(c) + '">'), m.push('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + c + '"></span></span>')) }); var g = b.toolbar = wb({
                    src: g,
                    html: m.join(""), noDisableItems: b.noDisableItems, click: function (a, c) { a.stop(); if (b.menu) { var d = b.menu.name; b.hideMenu(); if (d === c) return } b.clickToolbar(c) }
                }), k = b.edit = ub({
                    height: z(e) - g.div.height(), src: h, srcElement: b.srcElement, designMode: b.designMode, themesPath: b.themesPath, bodyClass: b.bodyClass, cssPath: b.cssPath, cssData: b.cssData, beforeGetHtml: function (a) { a = b.beforeGetHtml(a); return P(a, b.filterMode ? b.htmlTags : null, b.urlType, b.wellFormatMode, b.indentChar) }, beforeSetHtml: function (a) {
                        a = P(a, b.filterMode ?
                        b.htmlTags : null, "", !1); return b.beforeSetHtml(a)
                    }, afterSetHtml: function () { b.afterSetHtml() }, afterCreate: function () {
                        b.edit = k = this; b.cmd = k.cmd; b._docMousedownFn = function () { b.menu && b.hideMenu() }; f(k.doc, document).mousedown(b._docMousedownFn); Sb.call(b); Tb.call(b); Ub.call(b); Vb.call(b); k.afterChange(function () { k.designMode && (b.updateState(), b.addBookmark(), b.options.afterChange && b.options.afterChange.call(b)) }); k.textarea.keyup(function (a) { !a.ctrlKey && !a.altKey && Ib[a.which] && b.options.afterChange && b.options.afterChange.call(b) });
                        b.readonlyMode && b.readonly(); b.isCreated = !0; b.initContent = b.html(); b.afterCreate(); b.options.afterCreate && b.options.afterCreate.call(b)
                    }
                }); j.removeClass("statusbar").addClass("ke-statusbar").append('<span class="ke-inline-block ke-statusbar-center-icon"></span>').append('<span class="ke-inline-block ke-statusbar-right-icon"></span>'); f(B).unbind("resize"); b.resize(d, e); c ? (f(B).bind("resize", function () { b.isCreated && a(G().clientWidth, G().clientHeight, !1) }), g.select("fullscreen"), j.first().css("visibility",
                "hidden"), j.last().css("visibility", "hidden")) : (b.resizeType > 0 ? Oa({ moveEl: i, clickEl: j, moveFn: function (b, c, d, e, f, j) { e += j; a(null, e) } }) : j.first().css("visibility", "hidden"), b.resizeType === 2 ? Oa({ moveEl: i, clickEl: j.last(), moveFn: function (b, c, d, e, f, j) { d += f; e += j; a(d, e) } }) : j.last().css("visibility", "hidden")); return b
            }, remove: function () {
                var a = this; if (!a.isCreated) return a; a.beforeRemove(); a.menu && a.hideMenu(); l(a.dialogs, function () { a.hideDialog() }); f(document).unbind("mousedown", a._docMousedownFn); a.toolbar.remove();
                a.edit.remove(); a.statusbar.last().unbind(); a.statusbar.unbind(); a.container.remove(); a.container = a.toolbar = a.edit = a.menu = null; a.dialogs = []; a.isCreated = !1; return a
            }, resize: function (a, b) { a !== null && this.container.css("width", s(a)); b !== null && (b = z(b) - this.toolbar.div.height() - this.statusbar.height(), b > 0 && this.edit.setHeight(b)); return this }, select: function () { this.isCreated && this.cmd.select(); return this }, html: function (a) {
                if (a === k) return this.isCreated ? this.edit.html() : $(this.srcElement); this.isCreated ?
                this.edit.html(a) : $(this.srcElement, a); return this
            }, fullHtml: function () { return this.isCreated ? this.edit.html(k, !0) : "" }, text: function (a) { return a === k ? w(this.html().replace(/<(?!img|embed).*?>/ig, "").replace(/&nbsp;/ig, " ")) : this.html(C(a)) }, isEmpty: function () { return w(this.text().replace(/\r\n|\n|\r/, "")) === "" }, isDirty: function () { return w(this.initContent.replace(/\r\n|\n|\r|t/g, "")) !== w(this.html().replace(/\r\n|\n|\r|t/g, "")) }, selectedHtml: function () { return this.isCreated ? this.cmd.range.html() : "" },
            count: function (a) { a = (a || "html").toLowerCase(); if (a === "html") return U(this.html()).length; if (a === "text") return this.text().replace(/<(?:img|embed).*?>/ig, "K").replace(/\r\n|\n|\r/g, "").length; return 0 }, exec: function (a) { var a = a.toLowerCase(), b = this.cmd, c = L(a, "selectall,copy,paste,print".split(",")) < 0; c && this.addBookmark(!1); b[a].apply(b, Da(arguments, 1)); c && (this.updateState(), this.addBookmark(!1), this.options.afterChange && this.options.afterChange.call(this)); return this }, insertHtml: function (a) {
                if (!this.isCreated) return this;
                a = this.beforeSetHtml(a); this.exec("inserthtml", a); return this
            }, appendHtml: function (a) { this.html(this.html() + a); if (this.isCreated) a = this.cmd, a.range.selectNodeContents(a.doc.body).collapse(!1), a.select(); return this }, sync: function () { $(this.srcElement, this.html()); return this }, focus: function () { this.isCreated ? this.edit.focus() : this.srcElement[0].focus(); return this }, blur: function () { this.isCreated ? this.edit.blur() : this.srcElement[0].blur(); return this }, addBookmark: function (a) {
                var a = o(a, !0), b = this.edit,
                c = b.doc.body, d = c.innerHTML; if (a && this._undoStack.length > 0 && Math.abs(d.length - U(this._undoStack[this._undoStack.length - 1].html).length) < this.minChangeSize) return this; b.designMode && !this._firstAddBookmark ? (b = this.cmd.range, a = b.createBookmark(!0), a.html = c.innerHTML, b.moveToBookmark(a)) : a = { html: c.innerHTML }; this._firstAddBookmark = !1; Db(this._undoStack, a); return this
            }, undo: function () { return Eb.call(this, this._undoStack, this._redoStack) }, redo: function () { return Eb.call(this, this._redoStack, this._undoStack) },
            fullscreen: function (a) { this.fullscreenMode = a === k ? !this.fullscreenMode : a; return this.remove().create() }, readonly: function (a) { var a = o(a, !0), b = this, c = b.edit, d = c.doc; b.designMode ? b.toolbar.disableAll(a, []) : l(b.noDisableItems, function () { b.toolbar[a ? "disable" : "enable"](this) }); n ? d.body.contentEditable = !a : d.designMode = a ? "off" : "on"; c.textarea[0].disabled = a }, createMenu: function (a) {
                var b = this.toolbar.get(a.name), c = b.pos(); a.x = c.x; a.y = c.y + b.height(); a.selectedColor !== k ? (a.cls = "ke-colorpicker-" + this.themeType,
                a.noColor = this.lang("noColor"), this.menu = xb(a)) : (a.cls = "ke-menu-" + this.themeType, a.centerLineMode = !1, this.menu = Sa(a)); return this.menu
            }, hideMenu: function () { this.menu.remove(); this.menu = null; return this }, hideContextmenu: function () { this.contextmenu.remove(); this.contextmenu = null; return this }, createDialog: function (a) {
                var b = this; a.autoScroll = o(a.autoScroll, !0); a.shadowMode = o(a.shadowMode, b.shadowMode); a.closeBtn = o(a.closeBtn, { name: b.lang("close"), click: function () { b.hideDialog().focus() } }); a.noBtn = o(a.noBtn,
                { name: b.lang(a.yesBtn ? "no" : "close"), click: function () { b.hideDialog().focus() } }); if (b.dialogAlignType != "page") a.alignEl = b.container; a.cls = "ke-dialog-" + b.themeType; if (b.dialogs.length > 0) { var c = b.dialogs[b.dialogs.length - 1]; b.dialogs[0].mask.div.css("z-index", c.z + 1); a.z = c.z + 2; a.showMask = !1 } a = zb(a); b.dialogs.push(a); return a
            }, hideDialog: function () { this.dialogs.length > 0 && this.dialogs.pop().remove(); this.dialogs.length > 0 && this.dialogs[0].mask.div.css("z-index", this.dialogs[this.dialogs.length - 1].z - 1); return this }
        };
        n && F < 7 && N(document, "BackgroundImageCache", !0); f.editor = function (a) { return new Aa(a) }; f.create = function (a, b) {
            function c(a) { l(aa, function (b, c) { c.call(a, KindEditor) }); return a.create() } b = b || {}; b.basePath = o(b.basePath, f.basePath); b.themesPath = o(b.themesPath, b.basePath + "themes/"); b.langPath = o(b.langPath, b.basePath + "lang/"); b.pluginsPath = o(b.pluginsPath, b.basePath + "plugins/"); if (o(b.loadStyleMode, f.options.loadStyleMode)) {
                var d = o(b.themeType, f.options.themeType); Ua(b.themesPath + "default/default.css"); Ua(b.themesPath +
                d + "/" + d + ".css")
            } if (d = f(a)) { b.srcElement = d[0]; if (!b.width) b.width = d.width(); if (!b.height) b.height = d.height(); var e = new Aa(b); if (K[e.langType]) return c(e); Ta(e.langPath + e.langType + ".js?ver=" + encodeURIComponent(f.DEBUG ? Ba : "4.0 (2011-09-26)"), function () { return c(e) }); return e }
        }; f.plugin = Ab; f.lang = Cb; Ab("core", function (a) {
            var b = this, c = { undo: "Z", redo: "Y", bold: "B", italic: "I", underline: "U", print: "P", selectall: "A" }; b.afterSetHtml(function () { b.options.afterChange && b.options.afterChange.call(b) }); if (b.syncType ==
            "form") { for (var d = a(b.srcElement), e = !1; d = d.parent() ;) if (d.name == "form") { e = !0; break } if (e) { d.bind("submit", function () { b.sync() }); var f = a('[type="reset"]', d); f.click(function () { b.html(b.initContent) }); b.beforeRemove(function () { d.unbind(); f.unbind() }) } } b.clickToolbar("source", function () { if (!Fb) b.edit.designMode ? (b.toolbar.disableAll(!0), b.edit.design(!1), b.toolbar.select("source")) : (b.toolbar.disableAll(!1), b.edit.design(!0), b.toolbar.unselect("source")), b.designMode = b.edit.designMode }); b.afterCreate(function () {
                b.designMode ||
                b.toolbar.disableAll(!0).select("source")
            }); b.clickToolbar("fullscreen", function () { b.fullscreen() }); var g = !1; b.afterCreate(function () { a(b.edit.doc, b.edit.textarea).keyup(function (a) { a.which == 27 && setTimeout(function () { b.fullscreen() }, 0) }); if (g) { if (n && !b.designMode) return; b.focus() } g || (g = !0) }); l("undo,redo".split(","), function (a, d) { c[d] && b.afterCreate(function () { Ea(this.edit.doc, c[d], function () { b.clickToolbar(d) }) }); b.clickToolbar(d, function () { b[d]() }) }); b.clickToolbar("formatblock", function () {
                var a =
                b.lang("formatblock.formatBlock"), c = { h1: 28, h2: 24, h3: 18, H4: 14, p: 12 }, d = b.cmd.val("formatblock"), e = b.createMenu({ name: "formatblock", width: b.langType == "en" ? 200 : 150 }); l(a, function (a, f) { var h = "font-size:" + c[a] + "px;"; a.charAt(0) === "h" && (h += "font-weight:bold;"); e.addItem({ title: '<span style="' + h + '">' + f + "</span>", height: c[a] + 12, checked: d === a || d === f, click: function () { b.select().exec("formatblock", "<" + a + ">").hideMenu() } }) })
            }); b.clickToolbar("fontname", function () {
                var a = b.cmd.val("fontname"), c = b.createMenu({
                    name: "fontname",
                    width: 150
                }); l(b.lang("fontname.fontName"), function (d, e) { c.addItem({ title: '<span style="font-family: ' + d + ';">' + e + "</span>", checked: a === d.toLowerCase() || a === e.toLowerCase(), click: function () { b.exec("fontname", d).hideMenu() } }) })
            }); b.clickToolbar("fontsize", function () {
                var a = b.cmd.val("fontsize"); menu = b.createMenu({ name: "fontsize", width: 150 }); l(b.fontSizeTable, function (c, d) {
                    menu.addItem({
                        title: '<span style="font-size:' + d + ';">' + d + "</span>", height: z(d) + 12, checked: a === d, click: function () {
                            b.exec("fontsize",
                            d).hideMenu()
                        }
                    })
                })
            }); l("forecolor,hilitecolor".split(","), function (a, c) { b.clickToolbar(c, function () { b.createMenu({ name: c, selectedColor: b.cmd.val(c) || "default", colors: b.colorTable, click: function (a) { b.exec(c, a).hideMenu() } }) }) }); l("cut,copy,paste".split(","), function (a, c) { b.clickToolbar(c, function () { b.focus(); try { b.exec(c, null) } catch (a) { alert(b.lang(c + "Error")) } }) }); b.clickToolbar("about", function () { b.createDialog({ name: "about", width: 300, title: b.lang("about"), body: '<div style="margin:20px;"><div>KindEditor 4.0 (2011-09-26)</div><div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div></div>' }) });
            b.plugin.getSelectedLink = function () { return b.cmd.commonAncestor("a") }; b.plugin.getSelectedImage = function () { return za(b.edit.cmd.range, function (a) { return !/^ke-\w+$/i.test(a[0].className) }) }; b.plugin.getSelectedFlash = function () { return za(b.edit.cmd.range, function (a) { return a[0].className == "ke-flash" }) }; b.plugin.getSelectedMedia = function () { return za(b.edit.cmd.range, function (a) { return a[0].className == "ke-flash" || a[0].className == "ke-rm" }) }; b.plugin.getSelectedAnchor = function () {
                return za(b.edit.cmd.range,
                function (a) { return a[0].className == "ke-anchor" })
            }; l("link,image,flash,media,anchor".split(","), function (a, c) { var d = c.charAt(0).toUpperCase() + c.substr(1); l("edit,delete".split(","), function (a, e) { b.addContextmenu({ title: b.lang(e + d), click: function () { b.loadPlugin(c, function () { b.plugin[c][e](); b.hideMenu() }) }, cond: b.plugin["getSelected" + d], width: 150, iconClass: e == "edit" ? "ke-icon-" + c : k }) }); b.addContextmenu({ title: "-" }) }); b.plugin.getSelectedTable = function () { return b.cmd.commonAncestor("table") }; b.plugin.getSelectedRow =
            function () { return b.cmd.commonAncestor("tr") }; b.plugin.getSelectedCell = function () { return b.cmd.commonAncestor("td") }; l("prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,rowsplit,colsplit,coldelete,rowdelete,insert,delete".split(","), function (a, c) {
                var d = L(c, ["prop", "delete"]) < 0 ? b.plugin.getSelectedCell : b.plugin.getSelectedTable; b.addContextmenu({
                    title: b.lang("table" + c), click: function () { b.loadPlugin("table", function () { b.plugin.table[c](); b.hideMenu() }) }, cond: d,
                    width: 170, iconClass: "ke-icon-table" + c
                })
            }); b.addContextmenu({ title: "-" }); l("selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript,hr,print,bold,italic,underline,strikethrough,removeformat,unlink".split(","), function (a, d) { c[d] && b.afterCreate(function () { Ea(this.edit.doc, c[d], function () { b.cmd.selection(); b.clickToolbar(d) }) }); b.clickToolbar(d, function () { b.focus().exec(d, null) }) }); b.afterCreate(function () {
                function c() {
                    e.range.moveToBookmark(f);
                    e.select(); ba && (a("div." + i, g).each(function () { a(this).after("<br />").remove(!0) }), a("span.Apple-style-span", g).remove(!0), a("meta", g).remove()); var d = g[0].innerHTML; g.remove(); d !== "" && (b.pasteType === 2 && (/schemas-microsoft-com|worddocument|mso-\w+/i.test(d) ? d = gb(d, b.filterMode ? b.htmlTags : a.options.htmlTags) : (d = P(d, b.filterMode ? b.htmlTags : null), d = b.beforeSetHtml(d))), b.pasteType === 1 && (d = d.replace(/<br[^>]*>/ig, "\n"), d = d.replace(/<\/p><p[^>]*>/ig, "\n"), d = d.replace(/<[^>]+/g, ""), d = d.replace(/&nbsp;/ig,
                    " "), d = d.replace(/\n\s*\n/g, "\n"), d = b.newlineTag == "p" ? d.replace(/^/, "<p>").replace(/$/, "</p>").replace(/\n/g, "</p><p>") : d.replace(/\n/g, "<br />$&")), b.insertHtml(d))
                } var d = b.edit.doc, e, f, g, i = "__kindeditor_paste__", k = !1; a(d.body).bind("paste", function (l) {
                    if (b.pasteType === 0) l.stop(); else if (!k) {
                        k = !0; a("div." + i, d).remove(); e = b.cmd.selection(); f = e.range.createBookmark(); g = a('<div class="' + i + '"></div>', d).css({
                            position: "absolute", width: "1px", height: "1px", overflow: "hidden", left: "-1981px", top: a(f.start).pos().y +
                            "px", "white-space": "nowrap"
                        }); a(d.body).append(g); if (n) { var o = e.range.get(!0); o.moveToElementText(g[0]); o.select(); o.execCommand("paste"); l.preventDefault() } else e.range.selectNodeContents(g[0]), e.select(); setTimeout(function () { c(); k = !1 }, 0)
                    }
                })
            }); b.beforeGetHtml(function (a) {
                return a.replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/ig, function (a) { a = H(a); a = ib(a["data-ke-tag"]); return Ga(a) }).replace(/<img[^>]*class="?ke-anchor"?[^>]*>/ig, function (a) {
                    a = H(a); return '<a name="' + unescape(a["data-ke-name"]) +
                    '"></a>'
                }).replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function (a, b, c) { return "<script" + unescape(b) + ">" + c + "<\/script>" }).replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function (a, b, c) { a = a.replace(/(\s+(?:href|src)=")[^"]*(")/i, "$1" + c + "$2"); return a = a.replace(/\s+data-ke-src="[^"]*"/i, "") }).replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function (a, b, c) { return b + c })
            }); b.beforeSetHtml(function (a) {
                return a.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig,
                function (a) { a = H(a); a.src = o(a.src, ""); a.width = o(a.width, 0); a.height = o(a.height, 0); return jb(b.themesPath + "common/blank.gif", a) }).replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/ig, function (a) { a = H(a); return '<img class="ke-anchor" src="' + b.themesPath + 'common/anchor.gif" data-ke-name="' + escape(a.name) + '" />' }).replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig, function (a, b, c) { return '<div class="ke-script" data-ke-script-attr="' + escape(b) + '">' + c + "</div>" }).replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig,
                function (a, b, c, d, e) { if (a.match(/\sdata-ke-src="[^"]*"/i)) return a; return b + c + '="' + d + '" data-ke-src="' + d + '"' + e }).replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function (a, b, c) { return b + "data-ke-" + c }).replace(/<table[^>]*\s+border="0"[^>]*>/ig, function (a) { if (a.indexOf("ke-zeroborder") >= 0) return a; return Lb(a, "ke-zeroborder") })
            })
        })
    }
})(window);

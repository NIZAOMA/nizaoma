(function (a) {
    with (a) {
        a.Ps = function () { T.call(this) }; y(Ps, T); Ps.prototype.B = function () { this.o(document.body) };
        Ps.prototype.C = function (b) {
            function c(b, c, d) { if (C) { var e = function () { c.css("display", ""); b.css("display", ""); var e = G; Ym(e); Zm(e, d) }; c.show().fadeOut(150, function () { b.css({ opacity: 0.5, right: -20, position: "relative", display: "block" }).animate({ opacity: 1, right: 0 }, 150, e) }) } else { C = j; b.show(); var g = G; Ym(g); Zm(g, d) } } function d() { C = m; r.hide(); w.show() } function e() { $(this).trigger("requestStory") } function g() { var b = n.filter(".current"); b.length && l.css("top", b.position().top + b.height() / 2 - 10) } Ps.n.C.call(this,
            b); var h = { member: Vj(function (b) { return $.get("/node/HomeHeroStoryV2", { params: { member_hash: b } }) }), topic: Vj(function (b) { return $.get("/node/HomeTopicStoryV2", { params: { url_token: b } }) }) }, l = $("div.single-story > .icon-sign").addClass("visible"), n = $("a.rep"), q = k; n.mouseenter(function () { q = setTimeout(v(e, this), 500) }).mouseleave(function () { clearTimeout(q) }).click(e).on("requestStory", function () {
                var b = $(this), c = b.data(), d = c.type, c = c.token; b.addClass("current").siblings().removeClass("current"); g(); h[d](c).done(function (c) {
                    $(".single-story-inner").fadeOut(150,
                    function () { $(this).remove(); $(c).insertAfter(l).hide().fadeIn(150) }); b.trigger("afterRequestStory")
                })
            }); g(); var r = $("div.mobi-front"), w = $("div.desk-front"); r.find(".js-signin, .js-signup").click(function () { w.find(".js-title-label").text("返回"); w.find(".return").off().click(function () { window.location.hash = "" }); d() }); this.h().e(window, "hashchange", function () { var b = window.location.hash.slice(1); "signin" === b || "signup" === b ? d() : (w.css("display", ""), r.css("display", "")) }); this.h().e(Y, ["accountcallback",
            "sina_callback", "qqconn_callback"], d); var C = m, b = window.location.hash.slice(1), I = "signin" === b || "signup" !== b && $("div.view-signin").hasClass("selected"), G = new Wm({ Fv: function (b, d) { "signin" === b ? c(Xm(G, "signin"), Xm(G, "signup"), b) : "signup" === b ? c(Xm(G, "signup"), Xm(G, "signin"), b) : G.defaults.Fv.call(G, b, d) } }); ("signin" === b || "signup" === b) && d(); G.Qf = j; G.Tk = I ? "signin" : "signup"; G.o(H("js-sign-flow")); this.ux(); if (!sb) {
                var b = $("div.single-story"), R = $("div.rep"), X = k, ja = function () {
                    var b = R.filter(":not(.current)").get();
                    z.lT(b); return b[0]
                }, I = function () { X || (X = setInterval(function () { $(ja()).trigger("requestStory") }, 5E3)) }, Na = function () { clearInterval(X); X = k }; b.hover(Na, I); R.on("requestStory", Na).on("afterRequestStory", I); b = { start: I, stop: Na }; b.start(); b = b.stop; this.wo || (this.wo = []); this.wo.push(v(b, i))
            }
        };
        Ps.prototype.ux = function () { $.each({ ".app-link.ios": ["click_zhihu_ios_dl_link", "homepage_not_logged_in"], ".app-link.android": ["click_zhihu_android_dl_link", "homepage_not_logged_in"], 'a.app-download-button[href^="http://itunes"]': ["click_zhihu_ios_dl_link", "homepage_mobile_big_not_logged_in"], 'a.app-download-button[href^="https://play.google.com"]': ["click_zhihu_android_dl_link", "homepage_mobile_big_not_logged_in"] }, function (b, c) { $(b).on("click", function () { W.apply(k, ["app-promotion"].concat(c)) }) }) };
        Ca("ZH.entrySignPage", function () { (new Ps).B() }); If("sign");
    }
})(zhihu);
//@ sourceURL=http://static.zhihu.com/static/compiled/sign.js
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(window.jQuery)
}(function(e) {
    function a(a, t) {
        var n, s, d, r = {},
            l = e.fn.datetimepicker.CONSTS,
            o = l.NAV,
            i = l.I18N[t.language] ? l.I18N[t.language] : l.I18N.en,
            c = {
                showYear: null,
                showMonth: null
            },
            u = t.date instanceof Date ? new Date(t.date.getTime()) : null,
            p = t.firstDayOfWeek,
            h = e(a),
            v = function(e, a) {
                var t = e.getFullYear();
                return null == a && (a = e.getMonth()), 0 != t % 4 || 0 == t % 100 && 0 != t % 400 || 1 !== a ? [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][a] : 29
            },
            D = function(e) {
                return "" === e || null == e
            },
            M = function(a, t, n, s) {
                return e.isFunction(t) ? t.apply(a, n || []) : s
            },
            g = function(e, a, t) {
                var n = e + "";
                for (t || (t = " "); n.length < a;) n = t + n;
                return n.toString()
            },
            m = function(e, a) {
                var t = e.str,
                    n = e.len;
                switch (e.char) {
                    case "Y":
                        t = n <= 3 ? (a.getFullYear() + "").slice(2, 4) : a.getFullYear();
                        break;
                    case "M":
                        t = n > 2 ? l.MN[a.getMonth()] : n < 2 ? a.getMonth() + 1 : g(a.getMonth() + 1, 2, "0");
                        break;
                    case "D":
                        t = n > 1 ? g(a.getDate(), 2, "0") : a.getDate();
                        break;
                    case "h":
                        var s = a.getHours() % 12;
                        0 === s && (s = 12), t = n > 1 ? g(s, 2, "0") : s;
                        break;
                    case "H":
                        t = n > 1 ? g(a.getHours(), 2, "0") : a.getHours();
                        break;
                    case "m":
                        t = n > 1 ? g(a.getMinutes(), 2, "0") : a.getMinutes();
                        break;
                    case "s":
                        t = n > 1 ? g(a.getSeconds(), 2, "0") : a.getSeconds();
                        break;
                    default:
                        t = e.str
                }
                return t
            },
            f = function(a, t, n, s, d) {
                var r = e("<td/>").attr("colspan", n).html(t).appendTo(a);
                return s && r.data("nav", s), r.addClass(d), r
            },
            C = function(e) {
                var a = u,
                    n = a.getDate(),
                    s = t.endDate,
                    d = t.startDate,
                    r = v(a, e);
                n > r && a.setDate(r), a.setMonth(e), s && a > s && a.setDate(s.getDate()), d && a < d && a.setDate(d.getDate())
            },
            Y = function(e, a) {
                if (a) {
                    var n = a.getFullYear(),
                        s = a.getMonth(),
                        d = a.getDate(),
                        r = new Date,
                        u = r.getFullYear(),
                        h = r.getMonth(),
                        D = r.getDate();
                    c.showYear = n, c.showMonth = s;
                    var M = t.startDate,
                        g = t.endDate;
                    e.$title.text(i.MN[s] + ", " + n);
                    var m = new Date(a);
                    m.setDate(v(m, null) + 1), g && m > g || m.getFullYear() > l.MAXYEAR ? e.$nextm.addClass("disabled").removeClass("hover").data("disabled", !0) : e.$nextm.removeClass("disabled").data("disabled", !1);
                    var f = new Date(a);
                    f.setDate(0), M && f < M || f.getFullYear() < l.MINYEAR ? e.$prevm.addClass("disabled").removeClass("hover").data("disabled", !0) : e.$prevm.removeClass("disabled").data("disabled", !1), a.setDate(1);
                    var C = (a.getDay() - p) % 7;
                    a.setDate(0 - C), a.setDate(a.getDate() + 1);
                    for (var Y = e.find("tbody").children().eq(0), b = 0; b < 5 && Y.length; b++) {
                        for (var w, k = Y.children(), T = 0; T < 7; ++T, a.setDate(w + 1)) {
                            var y = k.eq(T);
                            if (y.removeClass().data("nav", o.day), !y.length) break;
                            w = a.getDate(), y.text(w);
                            var E = a.getMonth() == s;
                            if (E) {
                                var A = !1;
                                if (null != M && M > a || null != g && g < a ? (y.addClass("day disabled"), A = !0) : y.addClass("day"), y.data("disabled", A), !A) {
                                    E && w == d && (c.selectedDate && c.selectedDate.removeClass("selected"), y.addClass("selected"), c.selectedDate = y, c.showDay = w), a.getFullYear() == u && a.getMonth() == h && w == D && y.addClass("today");
                                    var N = a.getDay();
                                    0 !== N && 6 !== N || y.addClass("weekend")
                                }
                            } else y.addClass("oday").data("disabled", !0)
                        }
                        Y = Y.next()
                    }
                }
            },
            b = function(a, n) {
                if (n) {
                    var s = n.getFullYear(),
                        d = n.getMonth(),
                        r = e(a).data("midYear");
                    r ? s > r + 5 ? r += 10 : s < r - 4 && (r -= 10) : r = s, e(a).data("midYear", r);
                    var u, p, h, v, M = [r - 4, r - 3, r - 2, r - 1, r, r + 1, r + 2, r + 3, r + 4, r + 5],
                        g = e("td.year", a),
                        m = e("td.month", a),
                        f = t.endDate,
                        C = t.startDate;
                    f && f && s == (u = f.getFullYear()) && (p = f.getMonth()), (!u || u > l.MAXYEAR) && (u = l.MAXYEAR), C && C && s == (h = C.getFullYear()) && (v = C.getMonth()), (!h || h < l.MINYEAR) && (h = l.MINYEAR);
                    for (var Y = 0; Y < 12; Y++) {
                        var b = m.eq(Y).text(i.MN[Y]).data("nav", o.month).data("month", Y);
                        if (Y == d && (c.selectedMonth && c.selectedMonth.removeClass("selected"), b.addClass("selected"), c.selectedMonth = b), !D(v) && Y < v || !D(p) && Y > p ? b.addClass("disabled").data("disabled", !0) : b.removeClass("disabled").data("disabled", !1), Y < 10) {
                            var w = g.eq(Y).text(M[Y]).data("nav", o.year);
                            M[Y] == s && (c.selectedYear && c.selectedYear.removeClass("selected"), w.addClass("selected"), c.selectedYear = w), !D(h) && M[Y] < h || !D(u) && M[Y] > u ? w.addClass("disabled").data("disabled", !0) : w.removeClass("disabled").data("disabled", !1)
                        }
                    }
                    var k = e("td.prevy", a).removeClass("disabled").data("disabled", !1);
                    M[0] <= h && k.addClass("disabled").data("disabled", !0).removeClass("hover");
                    var T = e("td.nexty", a).removeClass("disabled").data("disabled", !1);
                    M[9] >= u && T.addClass("disabled").data("disabled", !0).removeClass("hover")
                }
            },
            w = function(e, a, t) {
                if (!a) return e.$h.val("00"), e.$m.val("00"), void e.$s.val("00");
                t != l.VIEWMODE.HM && t != l.VIEWMODE.YMDHM || a.setSeconds(0);
                var n = a.getHours() + "",
                    s = a.getMinutes() + "",
                    d = a.getSeconds() + "";
                e.$h.val(g(n, 2, "0")), e.$m.val(g(s, 2, "0")), e.$s.val(g(d, 2, "0"))
            },
            k = function(e, a, t) {
                return isNaN(e) ? a : Math.min(t, Math.max(a, e))
            },
            T = e("<form novalidate/>").appendTo(h).addClass(t.baseCls);
        n = function() {
            var a = e('<table cellspacing = "2px" cellpadding = "0" class="dt"/>'),
                t = e("<thead/>").appendTo(a),
                n = e('<tr class = "mainhead"/>');
            a.$prevm = f(n, '<i class="icon-datepicker-prev"/>', 1, o.prevm, "prevm"), a.$title = e('<td class="title" colspan="5"/>').data("nav", o.title).appendTo(n), a.$nextm = f(n, '<i class="icon-datepicker-next"/>', 1, o.nextm, "nextm"), n.appendTo(t), n = e("<tr/>");
            var s;
            for (s = 0; s < 7; ++s) {
                var d = e("<td/>").appendTo(n),
                    r = (s + p) % 7;
                d.addClass("day name").text(i.SDN[r]), 0 !== r && 6 !== r || d.addClass("weekend")
            }
            n.appendTo(t);
            var l = e('<tbody onselectstart="return false;"/>').appendTo(a);
            for (s = 5; s > 0; s--)
                for (var c = e("<tr/>").appendTo(l), u = 0; u < 7; u++) e("<td/>").appendTo(c);
            return a
        }(), Y(n, new Date(u)), s = function() {
            for (var a = e('<table cellspacing = "2px" cellpadding = "0" class="mt"/>'), t = e("<tbody/>").appendTo(a), n = e("<tr/>").appendTo(t), s = 0; s < 2; s++) e('<td class="month"/>').appendTo(n);
            f(n, '<i class="icon-datepicker-prev"/>', 1, o.prevy, " prevy"), f(n, '<i class="icon-datepicker-next"/>', 1, o.nexty, " nexty");
            for (var d = 0; d < 5; d++) n = e("<tr/>").appendTo(t), e('<td class="month"/><td class="month"/><td class="year"/><td class="year"/>').appendTo(n);
            var r = e('<tfoot class="buttonpane"/>').appendTo(a);
            return n = e("<tr/>").appendTo(r), f(n, i.OK, 4, o.mok, "ok"), a
        }(), d = function(a) {
            var n = e('<table cellspacing = "0" cellpadding = "0" class="tt"/>'),
                s = e("<tbody>").appendTo(n);
            n.$h = e('<input type="number" min="0" max="23" maxlength="2"/>').data("time", "h").change(function() {
                var e = parseInt(this.value, 10),
                    a = k(e, 0, 23);
                e != a && (this.value = a), u.setHours(a), M(r, t.onDateChange, arguments)
            }).focus(function() {
                n.focus = e(this)
            }), n.$m = e('<input type="number" min="0" max="59" maxlength="2"/>').data("time", "m").change(function() {
                var e = parseInt(this.value, 10),
                    a = k(e, 0, 59);
                e != a && (this.value = a), u.setMinutes(a), M(r, t.onDateChange, arguments)
            }).focus(function() {
                n.focus = e(this)
            }), n.$s = e('<input type="number" min="0" max="59" maxlength="2"/>').data("time", "s").change(function() {
                var e = parseInt(this.value, 10),
                    a = k(e, 0, 59);
                e != a && (this.value = a), u.setSeconds(a), M(r, t.onDateChange, arguments)
            }).focus(function() {
                n.focus = e(this)
            }), n.focus = n.$m;
            var d = e("<td/>").append(e('<i class="icon-datepicker-plus"/>')).data("nav", o.plus),
                c = e("<td/>").append(e('<i class="icon-datepicker-minus"/>')).data("nav", o.minus),
                p = e("<tr/>").append(e('<td rowspan="2"/>').text(i.TIME)).append(e('<td rowspan="2"/>').append(n.$h)).append(e('<td class="common" rowspan="2"/>').text(":")).append(e('<td rowspan="2"/>').append(n.$m));
            return a != l.VIEWMODE.YMDHM && a != l.VIEWMODE.HM && p.append(e('<td class="common" rowspan="2"/>').text(":")).append(e('<td rowspan="2"/>').append(n.$s)), p.append(d).appendTo(s), e("<tr/>").append(c).appendTo(s), n
        }(t.viewMode);
        var y = function() {
                var a = e('<table class="buttonpane"/>'),
                    t = e("<tr/>");
                return f(t, i.TODAY, null, o.today, "today"), t.appendTo(a), a
            }(),
            E = l.VIEWMODE;
        switch (t.viewMode) {
            case E.YM:
                b(s, new Date(u)), T.append(s.show());
                break;
            case E.HM:
            case E.HMS:
                w(d, u, t.viewMode), T.append(d.show()),
                    function(a) {
                        var t = e("<table/>"),
                            n = e("<tr/>").appendTo(t);
                        f(n, i.CLEAR, 1, o.clear, "clear"), f(n, i.CURRENT, 1, o.current, "current"), f(n, i.OK, 1, o.dok, "ok"), t.appendTo(a)
                    }(T);
                break;
            case E.YMD:
                T.append(n.show()), s.hide().appendTo(T), T.append(y);
                break;
            case E.YMDHMS:
            case E.YMDHM:
            default:
                n.appendTo(T).show(), s.hide().appendTo(T), w(d, u, t.viewMode), d.show().appendTo(T), T.append(y)
        }
        return function() {
            var a = function(a) {
                var i = a.target,
                    p = e(i).closest("td"),
                    h = a.type,
                    v = p.data("nav"),
                    D = arguments;
                if (!p.data("disabled") && 0 !== p.length && v)
                    if (u || (u = u || new Date), "mouseover" === h) p.addClass("hover");
                    else if ("mouseup" === h) switch (p.removeClass("hover"), v) {
                    case o.prevm:
                        ! function() {
                            var e = t.startDate,
                                a = u,
                                n = c.showMonth,
                                s = c.showYear;
                            e ? s > e.getFullYear() ? n > 0 ? C(n - 1) : (a.setFullYear(s - 1), C(11)) : s == e.getFullYear() && n > e.getMonth() && n > 0 && (C(n - 1), a < e && (u = new Date(e))) : n > 0 ? C(n - 1) : (a.setFullYear(s - 1), C(11))
                        }(), Y(n, new Date(u)), M(r, t.onDateChange, D);
                        break;
                    case o.nextm:
                        ! function() {
                            var e = t.endDate,
                                a = u,
                                n = c.showMonth,
                                s = c.showYear;
                            e ? s < e.getFullYear() ? n < 11 ? C(n + 1) : (a.setFullYear(s + 1), C(0)) : s == e.getFullYear() && n < e.getMonth() && (C(n + 1), a > e && (u = new Date(e))) : n < 11 ? C(n + 1) : (a.setFullYear(s + 1), C(0))
                        }(), Y(n, new Date(u)), M(r, t.onDateChange, D);
                        break;
                    case o.title:
                        b(s, new Date(c.showYear, c.showMonth));
                        var m = s.parent(".perfect-datetimepicker");
                        s.css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: m.height(),
                            width: m.width(),
                            "z-index": 1e5
                        }).show("fast");
                        break;
                    case o.clear:
                        u = null, c.selectedDate && c.selectedDate.removeClass("selected"), M(r, t.onDateChange, D), M(r, t.onClear, D);
                        break;
                    case o.current:
                        u = new Date, M(r, t.onDateChange, D);
                    case o.today:
                        var f = new Date;
                        if (t.startDate && f < t.startDate || t.endDate && f > t.endDate) return;
                        u = new Date(f), Y(n, f), w(d, f), c.selectedDate && c.selectedDate.removeClass("selected"), c.selectedDate = n.find("td.today").addClass("selected"), M(r, t.onDateChange, D);
                        break;
                    case o.dok:
                        M(r, t.onOk, D);
                        break;
                    case o.prevy:
                        ! function() {
                            var e, a, n = t.startDate,
                                s = u,
                                d = s.getFullYear() - 10,
                                r = s.getMonth();
                            n && d == (a = n.getFullYear()) && (e = n.getMonth()), (!a || a < l.MINYEAR) && (a = l.MINYEAR), d < a ? (s.setFullYear(a), r < e && s.setMonth(e)) : s.setFullYear(d)
                        }(), b(s, new Date(u)), M(r, t.onDateChange, D);
                        break;
                    case o.nexty:
                        ! function() {
                            var e, a, n = t.endDate,
                                s = u,
                                d = s.getFullYear() + 10,
                                r = s.getMonth();
                            n && d == (a = n.getFullYear()) && (e = n.getMonth()), (!a || a > l.MAXYEAR) && (a = l.MAXYEAR), d > a ? (s.setFullYear(a), r < e && s.setMonth(e)) : s.setFullYear(d)
                        }(), b(s, new Date(u)), M(r, t.onDateChange, D);
                        break;
                    case o.mok:
                        Y(n, new Date(u)), n.parent().length > 0 && s.hide("fast");
                        break;
                    case o.cancel:
                        Y(n, new Date(u)), s.hide("fast");
                        break;
                    case o.year:
                        c.selectedYear && c.selectedYear.removeClass("selected"), c.selectedYear = p;
                        var k = u;
                        k.setFullYear(p.text()), b(s, new Date(k)), M(r, t.onDateChange, D);
                        break;
                    case o.month:
                        c.selectedMonth && c.selectedMonth.removeClass("selected"), c.selectedMonth = p.addClass("selected"), u.setMonth(p.data("month")), M(r, t.onDateChange, D);
                        break;
                    case o.day:
                        c.selectedDate && c.selectedDate.removeClass("selected"), c.selectedDate = p.addClass("selected");
                        var T = u;
                        T.setFullYear(c.showYear), T.setMonth(c.showMonth), T.setDate(p.text()), M(r, t.onDateChange, D);
                        break;
                    case o.plus:
                        ! function(e, a) {
                            var n = a.data("time");
                            if ("h" === n) {
                                var s = (u.getHours() + 1) % 24;
                                u.setHours(s), e.$h.val(g(s, 2, "0"))
                            } else if ("m" === n) {
                                var d = (u.getMinutes() + 5) % 60;
                                u.setMinutes(d), e.$m.val(g(d, 2, "0"))
                            } else {
                                var l = (u.getSeconds() + 5) % 60;
                                u.setSeconds(l), e.$s.val(g(l, 2, "0"))
                            }
                            a.select(), M(r, t.onDateChange, arguments, !1)
                        }(d, d.focus);
                        break;
                    case o.minus:
                        ! function(e, a) {
                            var n = a.data("time");
                            if ("h" === n) {
                                var s = (u.getHours() + 23) % 24;
                                u.setHours(s), e.$h.val(g(s, 2, "0"))
                            } else if ("m" === n) {
                                var d = (u.getMinutes() + 55) % 60;
                                u.setMinutes(d), e.$m.val(g(d, 2, "0"))
                            } else {
                                var l = (u.getSeconds() + 55) % 60;
                                u.setSeconds(l), e.$s.val(g(l, 2, "0"))
                            }
                            a.select(), M(r, t.onDateChange, arguments, !1)
                        }(d, d.focus)
                } else "mouseout" === h && p.removeClass("hover")
            };
            h.unbind(), h.bind("mousedown", a).bind("mouseover", a).bind("mouseup", a).bind("mouseout", a)
        }(), r.element = h, r.$datetable = n, r.$monthtable = s, r.$timetable = d, r.getValue = function() {
            var e = l.VIEWMODE,
                a = u;
            return !a || t.viewMode !== e.YMD && t.viewMode !== e.YM || a.setHours(0, 0, 0, 0), a
        }, r.setValue = function(e) {
            e instanceof Date && (u = e, Y(n, e), b(s, e), w(d, e, t.viewMode))
        }, r.getText = function(e) {
            return function(e, a) {
                if (!e) return "";
                var t = a.length,
                    n = "";
                if (t > 0) {
                    for (var s = a.charAt(0), d = 0, r = s, l = 1; l < t; l++) {
                        var o = a.charAt(l);
                        s !== o ? (n += m({
                            char: s,
                            str: r,
                            len: l - d
                        }, e), d = l, r = s = o) : r += o
                    }
                    n += m({
                        char: s,
                        str: r,
                        len: t - d
                    }, e)
                }
                return n
            }(this.getValue(), e || "YYYY/MM/DD HH:mm:ss")
        }, r.destroy = function() {
            return this.element.removeData("datetimepicker"), this.element.remove(), r
        }, r
    }
    e.fn.datetimepicker = function(t) {
        return this.each(function() {
            var n = e(this);
            n.data("dateTimePicker") || (t = e.extend(!0, {}, e.fn.datetimepicker.defaults, t), n.data("dateTimePicker", new a(this, t)))
        })
    }, e.fn.datetimepicker.init = function(t, n) {
        var s = new a(t, e.extend(!0, {}, e.fn.datetimepicker.defaults, n));
        return e(t).data("dateTimePicker", s), s
    }, e.fn.datetimepicker.CONSTS = {
        I18N: {
            zh: {
                SDN: ["日", "一", "二", "三", "四", "五", "六"],
                MN: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                DN: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                CALENDAR: "日历",
                CLEAR: "清空",
                TODAY: "今天",
                OK: "确定",
                CURRENT: "当前",
                TIME: "时间"
            },
            en: {
                SDN: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                MN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                CALENDAR: "Calendar",
                CLEAR: "Clear",
                TODAY: "Today",
                OK: "OK",
                CURRENT: "Now",
                TIME: "Time"
            },
            de: {
                SDN: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                MN: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                DN: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                CALENDAR: "Kalender",
                CLEAR: "Löschen",
                TODAY: "Heute",
                OK: "OK",
                CURRENT: "Jetzt",
                TIME: "Zeit"
            },
            nl: {
                SDN: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
                MN: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                DN: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
                CALENDAR: "Kalender",
                CLEAR: "Legen",
                TODAY: "Vandaag",
                OK: "OK",
                CURRENT: "Nu",
                TIME: "Tijd"
            }
        },
        VIEWMODE: {
            YM: "YM",
            YMD: "YMD",
            HMS: "HMS",
            HM: "HM",
            YMDHMS: "YMDHMS",
            YMDHM: "YMDHM"
        },
        MINYEAR: 1900,
        MAXYEAR: 2999,
        NAV: {
            prevm: 2,
            nextm: 3,
            title: 4,
            clear: 5,
            today: 6,
            dok: 7,
            prevy: 8,
            nexty: 9,
            cancel: 10,
            mok: 11,
            plus: 12,
            minus: 13,
            current: 15,
            day: 100,
            month: 200,
            year: 300
        }
    }, e.fn.datetimepicker.defaults = {
        baseCls: "perfect-datetimepicker",
        viewMode: e.fn.datetimepicker.CONSTS.VIEWMODE.YMD,
        firstDayOfWeek: 0,
        date: null,
        endDate: null,
        startDate: null,
        language: "en",
        onDateChange: null,
        onClear: null,
        onOk: null,
        onClose: null
    }
});
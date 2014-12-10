define("js/sjs/pages/games/squares", [ "../../modules/isMobile", "../../modules/wxShare", "./squares/squares_Set", "./squares/squares_Chess", "./squares/squares_Direction", "./squares/squares_StopPoint", "./squares/squares_selectPanel" ], function(a, b, c) {
    var d = a("../../modules/isMobile");
    var e = a("../../modules/wxShare");
    var f = a("./squares/squares_Set");
    var g = a("./squares/squares_selectPanel");
    var h;
    var i, j, k;
    var l, m;
    var n, o;
    var p, q;
    var r;
    var s, t;
    var u, v;
    var w = 80;
    $(function() {
        $(window).on("resize", function() {
            var a = $("body").width();
            var b = $("body").height();
            var c = $(".resize__div__alert");
            if (b > a) {
                $("body").css({
                    minHeight: "418px",
                    overflowY: "auto"
                });
                if (c.length > 0) {
                    c.hide();
                }
            } else if (b < a) {
                $("body").css({
                    minHeight: "100%",
                    overflowY: "hidden"
                });
                if (c.length > 0) {
                    c.show();
                } else {
                    $newresize = $("<div class='resize__div__alert'><div class='resize__div__p'></div></div>");
                    $("body").append($newresize);
                    $newresize.css({
                        position: "absolute",
                        display: "block",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 5e4,
                        background: "rgba(0,0,0,0.99)"
                    });
                    $(".resize__div__p").css({
                        position: "absolute",
                        display: "block",
                        top: "50%",
                        left: "50%",
                        height: "250px",
                        width: "125px",
                        marginLeft: "-62px",
                        marginTop: "-125px",
                        background: "url(" + window.THIS.HOST + "static/css/imgs/rotate.png) no-repeat",
                        backgroundSize: "100% 100%"
                    });
                }
            }
        });
    });
    function x() {
        if (window.localStorage) {
            window.localStorage.setItem("SetFinished", q);
        } else if (window.sessionStorage) {
            window.sessionStorage.setItem("SetFinished", q);
        }
    }
    function y() {
        if (window.localStorage) {
            return window.localStorage.getItem("SetFinished");
        } else if (window.sessionStorage) {
            return window.sessionStorage.getItem("SetFinished");
        }
        return q || 0;
    }
    function z() {
        A($(".canvas-wrapper"), "canvasWrapper");
        A($(".canvas-header"), "canvasHeaderWrapper");
        A($(".canvas-bottom"), "canvasBottomWrapper");
        B();
        E();
    }
    function A(a, b, c) {
        var a = a || $("body");
        var d = template(b, c);
        a.html(d);
    }
    function B() {
        headerWidth = $(".canvas-header-wrapper").width();
        headerHeight = $(".canvas-header-wrapper").height();
        $("#canvasHeader").prop("width", 2 * headerWidth).prop("height", 2 * headerHeight).css({
            width: headerWidth + "px",
            height: headerHeight + "px"
        });
        s = new createjs.Stage("canvasHeader");
        createjs.Touch.enable(s);
        bottomWidth = $(".canvas-bottom-wrapper").width();
        bottomHeight = $(".canvas-bottom-wrapper").height();
        $("#canvasBottom").prop("width", 2 * bottomWidth).prop("height", 2 * bottomHeight).css({
            width: bottomWidth + "px",
            height: bottomHeight + "px"
        });
        t = new createjs.Stage("canvasBottom");
        createjs.Touch.enable(t);
        u = 2 * $(".canvas-stage-wrapper").width();
        v = 2 * $(".canvas-stage-wrapper").height();
        $("#canvasStage").prop("width", u).prop("height", v).css({
            width: u / 2 + "px",
            height: v / 2 + "px"
        });
        k = new createjs.Stage("canvasStage");
        var a = new createjs.Text("Squares", "bold 96px Calibri", "#2a3e51");
        a.textAlign = "center";
        var b = new createjs.Text("Pu", "bold 72px Calibri", "#2a3e51");
        b.textAlign = "center";
        b.x = -72;
        b.y = 96;
        var c = new createjs.Text("zz", "bold 72px Calibri", "#e37c22");
        c.textAlign = "center";
        c.x = 0;
        c.y = 96;
        var d = new createjs.Text("le", "bold 72px Calibri", "#2a3e51");
        d.textAlign = "center";
        d.x = 64;
        d.y = 96;
        var e = new createjs.Container();
        e.addChild(a, b, c, d);
        e.textBaseline = "middle";
        e.set({
            x: u / 2,
            y: v / 2 - 84
        });
        console.log(e.getBounds());
        k.addChild(e);
        createjs.Touch.enable(k);
        k.update();
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", k);
    }
    function C(a) {
        var b = a.refresh || false;
        var c = a.openChoose || false;
        var d = a.closeChoose || false;
        var e = $("#canvasBottom").prop("width");
        var f = $("#canvasBottom").prop("height");
        t.removeAllChildren();
        if (b) {
            var i = new createjs.Text("刷新", "40px Calibri", "#2a3e51");
            var j = {
                width: i.getMeasuredWidth(),
                height: i.getMeasuredHeight()
            };
            i.set({
                x: e - 20 - j.width,
                y: f / 2 - j.height / 2
            });
            i.on("click", function(a, b) {
                G();
            });
            t.addChild(i);
        }
        if (c) {
            var k = new createjs.Text("选关", "40px Calibri", "#2a3e51");
            var j = {
                width: k.getMeasuredWidth(),
                height: k.getMeasuredHeight()
            };
            k.set({
                x: 20,
                y: f / 2 - j.height / 2
            });
            k.on("click", function(a, b) {
                h = new g(p, r, 6, function(a) {
                    q = parseInt(a) - 1 >= 0 ? parseInt(a) - 1 : 0;
                    G();
                });
            });
            t.addChild(k);
        }
        if (d) {
            var l = new createjs.Text("返回", "40px Calibri", "#2a3e51");
            var j = l.getBounds();
            l.set({
                x: 20,
                y: f / 2 - j.height / 2
            });
            t.addChild(l);
        }
        t.update();
    }
    function D(a) {
        console.log("setLevelHead " + a);
        var b = $("#canvasHeader").prop("width");
        var c = $("#canvasHeader").prop("height");
        if (s.getNumChildren() == 0) {
            var d = new createjs.Text("Level " + a, "36px Calibri", "#2a3e51");
            var e = d.getBounds();
            d.set({
                x: b / 2 - e.width / 2,
                y: c / 2 - e.height / 2
            });
            var f = new createjs.Shape();
            f.graphics.beginFill("#2a3e51").drawRoundRect(b - 30, c / 2 - 10, 20, 20, 20);
            s.addChild(d);
            s.update();
        } else {
            var d = s.getChildAt(0);
            d.text = "Level " + a;
            s.update();
        }
    }
    function E() {
        j = new createjs.LoadQueue(true);
        j.loadFile({
            id: "stagesMap",
            src: window.THIS.HOST + "static/json/squares_stage_map.json",
            type: createjs.LoadQueue.JSON
        });
        j.on("complete", function() {
            setTimeout(function() {
                F();
            }, 4e3);
        }, this);
        k.on("mousedown", function() {
            console.log("mousedown on globalStage");
        });
    }
    function F() {
        var a = j.getResult("stagesMap");
        l = a["colors"];
        m = a["sets"];
        o = a["height"];
        n = a["width"];
        p = m.length;
        q = 0;
        G();
        C({
            refresh: true,
            openChoose: true
        });
        $("#refreshCurrent").on("click", function() {
            G();
        });
        $("#chooseSet").on("click", function() {
            window.selectPanel = new g(p, r, 6, function(a) {
                q = parseInt(a) - 1 >= 0 ? parseInt(a) - 1 : 0;
                G();
            });
        });
    }
    function G() {
        if (p >= q) {
            D(q + 1);
            var a = new f(m[q], l, w, function() {
                q++;
                if (q > r) {
                    x();
                    r = q;
                }
                G();
            }, k, u, v);
            a.set({
                x: u / 2 - a.getWidth() / 2 + 40,
                y: v / 2 - a.getHeight() / 2 + 40
            });
            k.removeAllChildren();
            k.clear();
            k.addChild(a.getContainer());
            k.update();
        } else {}
    }
    $(function() {
        r = y();
        q = r;
        z();
    });
});

define("js/sjs/modules/isMobile", [], function(a, b, c) {
    var d = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return d.Android() || d.BlackBerry() || d.iOS() || d.Opera() || d.Windows();
        },
        weChat: function() {
            var a = navigator.userAgent.toLowerCase();
            if (/micromessenger/.test(a) == true) {
                return true;
            }
            return false;
        }
    };
    c.exports = d;
});

define("js/sjs/modules/wxShare", [], function(a, b, c) {
    var d = function(a, b, c, d, e, f) {
        e = e || 160;
        f = f || 160;
        function g(g) {
            if (g == "friend") {
                window.WeixinJSBridge.invoke("sendAppMessage", {
                    appid: "",
                    img_url: b,
                    img_width: "" + e,
                    img_height: "" + f,
                    link: c,
                    desc: d,
                    title: a
                });
            } else if (g == "timeline") {
                window.WeixinJSBridge.invoke("shareTimeline", {
                    img_url: b,
                    link: c,
                    desc: d,
                    title: a
                });
            } else if (g == "weibo") {
                window.WeixinJSBridge.invoke("shareWeibo", {
                    content: a + ">>" + c,
                    url: c
                });
            }
        }
        function h() {
            window.WeixinJSBridge.on("menu:share:appmessage", function(a) {
                g("friend");
            });
            window.WeixinJSBridge.on("menu:share:timeline", function(a) {
                g("timeline");
            });
            window.WeixinJSBridge.on("menu:share:weibo", function(a) {
                g("weibo");
            });
        }
        if (typeof a == "undefined" || typeof b == "undefined" || typeof c == "undefined") {
            return;
        }
        if (typeof window.WeixinJSBridge == "undefined" || typeof window.WeixinJSBridge.invoke == "undefined") {
            var i = 5;
            var j = setInterval(function() {
                if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
                    clearInterval(j);
                    h();
                } else if (i <= 0) {
                    clearInterval(j);
                }
                i--;
            }, 200);
        } else {
            h();
        }
    };
    c.exports = d;
});

define("js/sjs/pages/games/squares/squares_Set", [ "js/sjs/pages/games/squares/squares_Chess", "js/sjs/pages/games/squares/squares_Direction", "js/sjs/pages/games/squares/squares_StopPoint" ], function(a, b, c) {
    var d = a("js/sjs/pages/games/squares/squares_Chess");
    var e = a("js/sjs/pages/games/squares/squares_Direction");
    var f = a("js/sjs/pages/games/squares/squares_StopPoint");
    var g = function(a, b, c, d, e, f, g) {
        this.singleWidth = c || 80;
        this.config = a || {};
        this.colors = b;
        this.stage = e;
        this.parentHeight = g;
        this.parentWidth = f;
        this.finishFn = d || function() {};
        this.__init();
    };
    g.prototype.__init = function() {
        this.container = new createjs.Container();
        this.height = this.singleWidth * this.config.row;
        this.width = this.singleWidth * this.config.column;
        var a = this;
        this.sets = [];
        var b = 0;
        for (var c = 0; c < this.config.init.length; c++) {
            var g = this.config.init[c];
            var h = g.position;
            var i = h[0] * this.singleWidth;
            var j = h[1] * this.singleWidth;
            switch (g.type) {
              case 1:
                var k = new d(this.colors[g.color], this.singleWidth, this.singleWidth, g.direction);
                k.draw().set({
                    x: j,
                    y: i
                }).addClickListener({}, false, function(b, c) {
                    a.goBeforeCheck(b, c);
                }, function(b) {
                    a.goCompleteCheck(b);
                });
                this.addChild(k, b++);
                this.sets.push(k);
                break;

              case 2:
                var l = new e(this.singleWidth, this.singleWidth, g.direction);
                l.set({
                    x: j,
                    y: i
                });
                this.addChild(l, b++);
                this.sets.push(l);
                break;

              case 4:
                var m = new f(this.colors[g.color], this.singleWidth, this.singleWidth);
                m.set({
                    x: j,
                    y: i
                });
                this.addChild(m, b++);
                this.sets.push(m);
                break;

              default:
                break;
            }
        }
    };
    g.prototype.addChild = function(a, b) {
        var c = this;
        a.set({
            scaleX: 0,
            scaleY: 0,
            regX: a.width / 2,
            regY: a.height / 2
        });
        c.container.addChild(a.getContainer());
        createjs.Tween.get(a.getContainer()).wait(b * 200).to({
            scaleX: 1,
            scaleY: 1
        }, 200, createjs.Ease.linear).call(function() {
            if (b == c.sets.length) {
                c.container.cache(0, 0, c.width, c.height);
                c.stage.cache(0, 0, c.parentWidth, c.parentHeight);
            }
        });
    };
    g.prototype.goBeforeCheck = function(a, b) {
        var c = this, g = a.x, h = a.y, b = b || a.direction;
        childLen = this.sets.length;
        var i, j;
        switch (b) {
          case "up":
            i = g;
            j = h - a.step;
            break;

          case "down":
            i = g;
            j = h + a.step;
            break;

          case "left":
            i = g - a.step;
            j = h;
            break;

          case "right":
            i = g + a.step;
            j = h;
            break;
        }
        for (var k = 0; k < childLen; k++) {
            var l = c.sets[k];
            if (a == l) {
                continue;
            }
            if (g == l.x && h == l.y) {
                if (l instanceof e) {
                    l.show();
                    a.drawOffADirection();
                } else if (l instanceof f) {
                    l.show();
                    a.drawOffAStop();
                }
            }
            if (l.x == i && l.y == j && l instanceof d) {
                console.log("push a chess @ " + i + "," + j + " " + b);
                c.goBeforeCheck(l, b);
                l.go(function(a) {
                    console.log("goCompleteCheck");
                    console.log(a);
                    c.goCompleteCheck(a, true);
                }, b);
            }
        }
    };
    g.prototype.goCompleteCheck = function(a, b) {
        var c = this, d = a.x, g = a.y, h = this.sets.length;
        var b = b || false;
        for (var i = 0; i < h; i++) {
            var j = c.sets[i];
            if (a == j) {
                continue;
            }
            if (d == j.x && g == j.y) {
                if (j instanceof e) {
                    a.drawOnADirection(j.color);
                    j.hide();
                    a.direct(j.direction);
                } else if (j instanceof f) {
                    a.drawOnAStop(j.color);
                    j.hide();
                    if (a.color == j.color && b == false) {
                        var k = c.checkFinish();
                        if (k) {
                            c.finishAnimation();
                        }
                    }
                }
            }
        }
    };
    g.prototype.checkFinish = function() {
        var a = this;
        var b = a.sets.length;
        var c = [], e = [];
        for (var g = 0; g < b; g++) {
            if (a.sets[g] instanceof d) {
                c.push(a.sets[g]);
            } else if (a.sets[g] instanceof f) {
                e.push(a.sets[g]);
            }
        }
        var h = e.length;
        var i = true;
        for (var j = 0; j < h; j++) {
            var k = c.length;
            var l = e[j];
            var m = false;
            for (var n = 0; n < k; n++) {
                var o = c[n];
                if (o.x == l.x && o.y == l.y && o.color == l.color) {
                    m = true;
                    c.splice(n, 1);
                    break;
                }
            }
            if (m == false) {
                i = false;
                break;
            }
        }
        return i;
    };
    g.prototype.finishAnimation = function() {
        var a = this, b = a.sets.length, c = 0;
        for (var d = 0; d < b; d++) {
            createjs.Tween.get(a.sets[d].getContainer()).wait(0).to({
                scaleX: 1.1,
                scaleY: 1.1
            }, 50, createjs.Ease.linear).to({
                scaleX: 0,
                scaleY: 0
            }, 220, createjs.Ease.linear).call(function() {
                c++;
                if (c == b) a.finishFn();
            });
        }
    };
    g.prototype.getWidth = function() {
        return this.width;
    };
    g.prototype.getHeight = function() {
        return this.height;
    };
    g.prototype.set = function(a) {
        this.container.set(a);
        return this;
    };
    g.prototype.getContainer = function() {
        return this.container;
    };
    c.exports = g;
});

define("js/sjs/pages/games/squares/squares_Chess", [], function(a, b, c) {
    var d = "#ffffff";
    var e = function(a, b, c, d, e) {
        this.step = e || b;
        this.color = a;
        this.direction = d || "up";
        this.width = b;
        this.height = c;
        this.container = new createjs.Container();
        this.rotateBiasDegree = 0;
    };
    e.prototype.set = function(a) {
        this.container.set(a);
        if (typeof a.x != "undefined") {
            this.x = a.x;
        }
        if (typeof a.y != "undefined") {
            this.y = a.y;
        }
        return this;
    };
    e.prototype.addClickListener = function(a, b, c, d) {
        a = a || {};
        b = b || false;
        var e = this;
        this.container.on("mousedown", function(a, b) {
            console.log("mousedown on chess");
            (function() {
                if (c) {
                    c(e, e.direction);
                }
            })();
            e.go(d);
            a.preventDefault();
            a.stopPropagation();
            return false;
        }, null, b, a);
        return this;
    };
    e.prototype.getContainer = function() {
        return this.container;
    };
    e.prototype.draw = function() {
        var a = this.width, b = this.height;
        this.container.removeAllChildren();
        this.container.uncache();
        var c = "rgba(" + parseInt(this.color.substr(1, 2), 16) + ", " + parseInt(this.color.substr(3, 2), 16) + ", " + parseInt(this.color.substr(5, 2), 16) + ", 0.8)";
        var e = new createjs.Shape();
        e.graphics.beginFill(this.color).drawRoundRect(2, 2, a - 4, b - 4, 5);
        var f = new createjs.Shape();
        f.graphics.beginFill("rgba(255, 255, 255, 0.95)").drawRoundRect(6, 6, a - 12, b - 12, 5);
        var g = new createjs.Shape();
        g.graphics.beginFill(this.color).drawRoundRect(8, 8, a - 16, b - 16, 5);
        this.container.addChild(e, f, g);
        var h = new createjs.Shape();
        switch (this.direction) {
          case "down":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2, b / 2 + 7).lineTo(a / 2 - 14, b / 2 - 7).lineTo(a / 2 + 14, b / 2 - 7).closePath().endFill();
            break;

          case "left":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2 - 7, b / 2).lineTo(a / 2 + 7, b / 2 - 14).lineTo(a / 2 + 7, b / 2 + 14).closePath().endFill();
            break;

          case "right":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2 + 7, b / 2).lineTo(a / 2 - 7, b / 2 - 14).lineTo(a / 2 - 7, b / 2 + 14).closePath().endFill();
            break;

          case "up":
          default:
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2, b / 2 - 7).lineTo(a / 2 - 14, b / 2 + 7).lineTo(a / 2 + 14, b / 2 + 7).closePath().endFill();
            break;
        }
        h.set({
            regX: a / 2,
            regY: b / 2,
            x: a / 2,
            y: b / 2
        });
        this.container.addChild(h);
        var i = new createjs.Shape();
        i.graphics.beginLinearGradientFill([ "rgba(255,255,255,0.08)", "rgba(255,255,255,0)" ], [ .5, .5 ], 0, 0, a, b).drawRoundRect(0, 0, a, b, 5);
        this.container.addChild(i);
        this.container.cache(0, 0, this.width, this.height);
        return this;
    };
    e.prototype.drawDirection = function(a) {
        this.container.getChildAt(3);
    };
    e.prototype.drawOnAStop = function(a) {
        var b = this.container.getChildAt(1);
        var c = "rgba(" + parseInt(a.substr(1, 2), 16) + ", " + parseInt(a.substr(3, 2), 16) + ", " + parseInt(a.substr(5, 2), 16) + ", 0.8)";
        b.graphics.clear().beginFill(a).drawRoundRect(6, 6, this.width - 12, this.height - 12, 5);
        this.container.cache(0, 0, this.width, this.height);
    };
    e.prototype.drawOffAStop = function() {
        var a = this.container.getChildAt(1);
        a.graphics.clear().beginFill("rgba(255, 255, 255, 0.95)").drawRoundRect(3, 3, this.width - 6, this.height - 6, 5);
        this.container.cache(0, 0, this.width, this.height);
    };
    e.prototype.drawOnADirection = function(a) {
        var b = this.container.getChildAt(3);
        var c = this.width, d = this.height;
        var e = parseInt(a.substring(1, 3), 16);
        var f = parseInt(a.substring(3, 5), 16);
        var g = parseInt(a.substring(5), 16);
        b.filters = [ new createjs.ColorFilter(0, 0, 0, 1, e, f, e, 0) ];
        b.cache(0, 0, this.width, this.height);
        this.container.cache(0, 0, this.width, this.height);
    };
    e.prototype.drawOffADirection = function() {
        var a = this.container.getChildAt(3);
        var b = this.width, c = this.height;
        var e = parseInt(d.substring(1, 3), 16);
        var f = parseInt(d.substring(3, 5), 16);
        var g = parseInt(d.substring(5), 16);
        a.filters = [ new createjs.ColorFilter(0, 0, 0, 1, e, f, e, 0) ];
        a.cache(0, 0, this.width, this.height);
        this.container.cache(0, 0, this.width, this.height);
    };
    e.prototype.direct = function(a, b) {
        console.log("direct: " + a + ", curDirection: " + this.direction);
        var c = this;
        var d = this.direction;
        if (this.direction != a && (a == "up" || a == "right" || a == "down" || a == "left")) {
            this.direction = a;
            var e, f;
            switch (d) {
              case "up":
                e = 1;
                break;

              case "right":
                e = 2;
                break;

              case "down":
                e = 3;
                break;

              case "left":
                e = 4;
                break;
            }
            switch (this.direction) {
              case "up":
                f = 1;
                break;

              case "right":
                f = 2;
                break;

              case "down":
                f = 3;
                break;

              case "left":
                f = 4;
                break;
            }
            var g = (f - e) * 90;
            this.rotateBiasDegree += g;
            this.rotateBiasDegree %= 360;
            console.log(g);
            this.container.uncache();
            createjs.Tween.get(this.container.getChildAt(3)).to({
                rotation: c.rotateBiasDegree
            }, 100, createjs.Ease.linear).call(function() {
                c.container.cache(0, 0, c.width, c.height);
                if (b) {
                    b();
                }
            });
        }
    };
    e.prototype.go = function(a, b) {
        var c = this;
        var d, e;
        b = b || this.direction;
        switch (b) {
          case "up":
            d = this.container.x;
            e = this.container.y - this.step;
            this.y = this.y - this.step;
            break;

          case "right":
            d = this.container.x + this.step;
            e = this.container.y;
            this.x = this.x + this.step;
            break;

          case "down":
            d = this.container.x;
            e = this.container.y + this.step;
            this.y = this.y + this.step;
            break;

          case "left":
            d = this.container.x - this.step;
            e = this.container.y;
            this.x = this.x - this.step;
            break;

          default:
            d = this.container.x;
            e = this.container.y;
            break;
        }
        if (a) createjs.Tween.get(this.container).to({
            x: d,
            y: e
        }, 100, createjs.Ease.linear).call(function() {
            a(c);
        }); else createjs.Tween.get(this.container).to({
            x: d,
            y: e
        }, 100, createjs.Ease.linear);
    };
    c.exports = e;
});

define("js/sjs/pages/games/squares/squares_Direction", [], function(a, b, c) {
    var d = "#4a494a";
    var e = function(a, b, c) {
        this.color = d;
        this.direction = c || "up";
        this.width = a;
        this.height = b;
        this.container = new createjs.Container();
        this.__init();
    };
    e.prototype.set = function(a) {
        this.container.set(a);
        if (typeof a.x != "undefined") {
            this.x = a.x;
        }
        if (typeof a.y != "undefined") {
            this.y = a.y;
        }
        return this;
    };
    e.prototype.getContainer = function() {
        return this.container;
    };
    e.prototype.hide = function() {
        this.container.set({
            alpha: 0
        });
    };
    e.prototype.show = function() {
        this.container.set({
            alpha: 1
        });
    };
    e.prototype.__init = function() {
        var a = this.width, b = this.height;
        var c = new createjs.Shape();
        c.graphics.beginFill(this.color).moveTo(a / 2, b / 2 - 7).lineTo(a / 2 - 14, b / 2 + 7).lineTo(a / 2 + 14, b / 2 + 7).closePath();
        if (this.direction == "down") c.setTransform(0, 0, 1, 1, 180, 0, 0, a, b); else if (this.direction == "left") {
            c.setTransform(0, 0, 1, 1, -90, 0, 0, a, 0);
        } else if (this.direction == "right") {
            c.setTransform(0, 0, 1, 1, 90, 0, 0, 0, b);
        }
        this.container.addChild(c);
        this.container.cache(0, 0, this.width, this.height);
    };
    c.exports = e;
});

define("js/sjs/pages/games/squares/squares_StopPoint", [], function(a, b, c) {
    var d = function(a, b, c) {
        this.color = a;
        this.width = b;
        this.height = c;
        this.container = new createjs.Container();
        this.__init();
    };
    d.prototype.set = function(a) {
        this.container.set(a);
        if (typeof a.x != "undefined") {
            this.x = a.x;
        }
        if (typeof a.y != "undefined") {
            this.y = a.y;
        }
        return this;
    };
    d.prototype.hide = function() {
        this.container.set({
            alpha: 0
        });
    };
    d.prototype.show = function() {
        this.container.set({
            alpha: 1
        });
    };
    d.prototype.getContainer = function() {
        return this.container;
    };
    d.prototype.__init = function() {
        var a = this.width, b = this.height;
        var c = new createjs.Shape();
        c.graphics.beginFill(this.color).drawCircle(a / 2, b / 2, 24);
        var d = new createjs.Shape();
        d.graphics.beginFill("rgba(255, 255, 255, 0.95)").drawCircle(a / 2, b / 2, 16);
        var e = new createjs.Shape();
        e.graphics.beginFill(this.color).drawCircle(a / 2, b / 2, 12);
        this.container.addChild(c, d, e);
        this.container.cache(0, 0, this.width, this.height);
        return this;
    };
    c.exports = d;
});

define("js/sjs/pages/games/squares/squares_selectPanel", [], function(a, b, c) {
    var d = 80;
    function e(a, b, c) {
        var a = a || $("body");
        var d = template(b, c);
        a.html(d);
    }
    var f = function(a, b, c, d) {
        this.x = b;
        this.y = c;
        this.id = a;
        this.hidden = d || false;
        this.container = new createjs.Container();
        this.draw();
    };
    f.prototype.draw = function() {
        this.container.removeAllChildren();
        if (this.hidden == false) {
            var a = new createjs.Shape();
            a.graphics.setStrokeStyle(1, "round").beginFill("#dedbce").drawRoundRect(2, 2, d - 4, d - 4, 3);
            var b = new createjs.Shape();
            b.graphics.setStrokeStyle(1, "round").beginFill("rgba(252, 223, 222, 1)").moveTo(48, 30).lineTo(32, 30).arcTo(16, 30, 16, 40, 10).arcTo(16, 50, 26, 50, 10).lineTo(48, 50).closePath();
            b.regX = 0;
            b.regY = 0;
            b.set({
                regX: d / 2,
                regY: d / 2,
                x: d / 2,
                y: d / 2 + 4
            });
            b.rotation = 38;
            var c = new createjs.Shape();
            c.graphics.setStrokeStyle(1, "round").beginFill("rgba(252, 223, 222, 1)").moveTo(32, 30).lineTo(48, 30).arcTo(64, 30, 64, 40, 10).arcTo(64, 50, 54, 50, 10).lineTo(32, 50).closePath();
            c.regX = 0;
            c.regY = 0;
            c.set({
                regX: d / 2,
                regY: d / 2,
                x: d / 2,
                y: d / 2 + 4
            });
            c.rotation = -38;
            var e = new createjs.Text(this.id, "36px Calibri", "#313c42");
            e.textAlign = "center";
            e.set({
                x: d / 2,
                y: (d - 40) / 2
            });
            this.container.addChild(a, e);
        } else {
            var a = new createjs.Shape();
            a.graphics.setStrokeStyle(1, "round").beginFill("#dedbce").drawRoundRect(2, 2, d - 4, d - 4, 3);
            var b = new createjs.Shape();
            b.graphics.setStrokeStyle(1, "round").beginFill("#313c42").moveTo(48, 30).lineTo(32, 30).arcTo(16, 30, 16, 40, 10).arcTo(16, 50, 26, 50, 10).lineTo(48, 50).closePath();
            b.regX = 0;
            b.regY = 0;
            b.set({
                regX: d / 2,
                regY: d / 2,
                x: d / 2,
                y: d / 2 + 4
            });
            b.rotation = 38;
            var c = new createjs.Shape();
            c.graphics.setStrokeStyle(1, "round").beginFill("#313c42").moveTo(32, 30).lineTo(48, 30).arcTo(64, 30, 64, 40, 10).arcTo(64, 50, 54, 50, 10).lineTo(32, 50).closePath();
            c.regX = 0;
            c.regY = 0;
            c.set({
                regX: d / 2,
                regY: d / 2,
                x: d / 2,
                y: d / 2 + 4
            });
            c.rotation = -38;
            this.container.addChild(a, b, c);
        }
        this.container.set({
            x: this.x,
            y: this.y
        });
        this.container.cache(0, 0, d, d);
    };
    f.prototype.regMouseDown = function(a) {
        console.log(this.id);
        var b = this;
        this.container.on("mousedown", function() {
            if (b.hidden == false) {
                a.hide();
                a.showClickFn(b.id);
            } else {
                a.hiddenClickFn();
            }
        });
    };
    var g = function(a, b, c, d, e) {
        this.totalSet = a;
        this.perRowSet = c;
        this.currentBestSet = b;
        this.showClickFn = d || function() {};
        this.hiddenClickFn = e || function() {};
        this.__init();
    };
    g.prototype.__init = function() {
        e($(".select-wrapper"), "setSelectWrapper");
        selectPanel = new createjs.Stage("canvasSelect");
        totalWidth = 2 * $(".set-select-wrapper").width();
        totalHeight = 2 * $(".set-select-wrapper").height();
        $("#canvasSelect").prop("width", totalWidth).prop("height", totalHeight).css({
            width: totalWidth / 2 + "px",
            height: totalHeight / 2 + "px"
        });
        this.container = new createjs.Container();
        this.sets = [];
        var a = this;
        this.width = this.perRowSet * d;
        this.height = Math.ceil(this.totalSet / this.perRowSet) * d;
        for (var b = 0; b < this.totalSet; b++) {
            var c = parseInt(b / this.perRowSet);
            var g = b % this.perRowSet;
            var h = c * d;
            var i = g * d;
            var j = new f(b + 1, i, h, b <= this.currentBestSet ? false : true);
            j.regMouseDown(a);
            this.sets.push(j);
            this.container.addChild(j.container);
        }
        this.container.set({
            x: totalWidth / 2 - this.width / 2,
            y: totalHeight / 2 - this.height / 2
        });
        selectPanel.addChild(this.container);
        createjs.Touch.enable(selectPanel);
        selectPanel.update();
        window.selectPanel = selectPanel;
    };
    g.prototype.unlock = function(a) {};
    g.prototype.hide = function() {
        $(".set-select-wrapper").hide();
    };
    g.prototype.show = function() {
        $(".set-select-wrapper").show();
    };
    c.exports = g;
});
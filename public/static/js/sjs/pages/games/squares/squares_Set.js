define("js/sjs/pages/games/squares/squares_Set", [ "./squares_Chess", "./squares_Direction", "./squares_StopPoint" ], function(a, b, c) {
    var d = a("./squares_Chess");
    var e = a("./squares_Direction");
    var f = a("./squares_StopPoint");
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
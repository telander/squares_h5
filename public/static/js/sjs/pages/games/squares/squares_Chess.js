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
        e.graphics.beginFill(this.color).drawRoundRect(1, 1, a - 2, b - 2, 5);
        var f = new createjs.Shape();
        f.graphics.beginFill("rgba(255, 255, 255, 0.95)").drawRoundRect(3, 3, a - 6, b - 6, 5);
        var g = new createjs.Shape();
        g.graphics.beginFill(this.color).drawRoundRect(4, 4, a - 8, b - 8, 5);
        this.container.addChild(e, f, g);
        var h = new createjs.Shape();
        switch (this.direction) {
          case "down":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2, b / 2 + 3.5).lineTo(a / 2 - 7, b / 2 - 3.5).lineTo(a / 2 + 7, b / 2 - 3.5).closePath().endFill();
            break;

          case "left":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2 - 3.5, b / 2).lineTo(a / 2 + 3.5, b / 2 - 7).lineTo(a / 2 + 3.5, b / 2 + 7).closePath().endFill();
            break;

          case "right":
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2 + 3.5, b / 2).lineTo(a / 2 - 3.5, b / 2 - 7).lineTo(a / 2 - 3.5, b / 2 + 7).closePath().endFill();
            break;

          case "up":
          default:
            h.graphics.setStrokeStyle(1, "round").beginFill(d).moveTo(a / 2, b / 2 - 3.5).lineTo(a / 2 - 7, b / 2 + 3.5).lineTo(a / 2 + 7, b / 2 + 3.5).closePath().endFill();
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
        b.graphics.clear().beginFill(a).drawRoundRect(3, 3, this.width - 6, this.height - 6, 5);
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
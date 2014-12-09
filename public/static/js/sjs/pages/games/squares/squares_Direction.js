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
        c.graphics.beginFill(this.color).moveTo(a / 2, b / 2 - 3.5).lineTo(a / 2 - 7, b / 2 + 3.5).lineTo(a / 2 + 7, b / 2 + 3.5).closePath();
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
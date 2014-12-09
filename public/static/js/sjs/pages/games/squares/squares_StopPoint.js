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
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
define(function(require, exports, module) {

	var StopPoint = function(color, width, height){
		this.color = color; 
		this.width = width;
		this.height = height;
		this.container = new createjs.Container();
		this.__init();
	};

	StopPoint.prototype.set = function(obj) {
		this.container.set(obj);
		if(typeof obj.x != 'undefined') {
			this.x = obj.x;
		}
		if(typeof obj.y != 'undefined') {
			this.y = obj.y;
		}
		return this;
	}

	StopPoint.prototype.hide = function() {
		this.container.set({
			alpha: 0,
		});
	}

	StopPoint.prototype.show = function() {
		this.container.set({
			alpha: 1,
		});
	}

	StopPoint.prototype.getContainer = function() {
		return this.container;
	}

	StopPoint.prototype.__init = function() {
		var width = this.width, height = this.height;
		
		var shape1 = new createjs.Shape();
		shape1.graphics.beginFill(this.color).drawCircle(width / 2, height / 2, 24);
		var shape2 = new createjs.Shape();
		shape2.graphics.beginFill("rgba(255, 255, 255, 0.95)").drawCircle(width / 2, height / 2, 16);
		var shape3 = new createjs.Shape();
		shape3.graphics.beginFill(this.color).drawCircle(width / 2, height / 2, 12);


		this.container.addChild(shape1, shape2, shape3);

		this.container.cache(0, 0, this.width, this.height);
		return this;
	}

	module.exports = StopPoint;
});
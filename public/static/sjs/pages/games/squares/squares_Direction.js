define(function(require, exports, module) {

	var triColor = "#4a494a";

	var Direction = function(width, height, direction){
		this.color = triColor; 
		this.direction = direction || "up";
		this.width = width;
		this.height = height;
		this.container = new createjs.Container();
		this.__init();
	};

	Direction.prototype.set = function(obj) {
		this.container.set(obj);
		if(typeof obj.x != 'undefined') {
			this.x = obj.x;
		}
		if(typeof obj.y != 'undefined') {
			this.y = obj.y;
		}
		return this;
	}

	Direction.prototype.getContainer = function() {
		return this.container;
	}

	Direction.prototype.hide = function() {
		this.container.set({
			alpha: 0,
		});
		// this.container.cache(0, 0, this.width, this.height);
	}

	Direction.prototype.show = function() {
		this.container.set({
			alpha: 1,
		});
		// this.container.cache(0, 0, this.width, this.height);
	}

	Direction.prototype.__init = function() {
		var width = this.width, height = this.height;
		
		var shape4 = new createjs.Shape();
		// 等腰30度三角形，高固定8.，默认向上
		shape4.graphics.beginFill(this.color).moveTo(width / 2, height / 2 - 7).lineTo(width / 2 - 14, height / 2 + 7).lineTo(width / 2 + 14, height / 2 + 7).closePath();
		if(this.direction == "down")
			shape4.setTransform(0, 0, 1, 1, 180, 0, 0, width, height);
		else if(this.direction == "left") {
			shape4.setTransform(0, 0, 1, 1, -90, 0, 0, width, 0);
		}
		else if(this.direction == "right") {
			shape4.setTransform(0, 0, 1, 1, 90, 0, 0, 0, height);
		}
		this.container.addChild(shape4);

		this.container.cache(0, 0, this.width, this.height);
	}

	module.exports = Direction;
});
define(function(require, exports, module) {

	var triColor = "#ffffff";

	var Chess = function(color, width, height, direction, step){
		this.step = step || width;
		this.color = color; 
		this.direction = direction || "up";
		this.width = width;
		this.height = height;
		this.container = new createjs.Container();
		// rotate以后只是view变了，下次再rotate要在初始状态角度rotate。所以要记录全局
		this.rotateBiasDegree = 0;
	};

	Chess.prototype.set = function(obj) {
		this.container.set(obj);
		if(typeof obj.x != 'undefined') {
			this.x = obj.x;
		}
		if(typeof obj.y != 'undefined') {
			this.y = obj.y;
		}
		// console.log(this);
		return this;
	}

	Chess.prototype.addClickListener = function(data, once, beforeFn, callback) {
		data = data || {};
		once = once || false;
		var self = this;

		this.container.on("mousedown", function(evt, data){
			console.log("mousedown on chess");
			(function(){
				// console.log("before click!");
				if(beforeFn) {
					beforeFn(self, self.direction);
				}
			})();
			self.go(callback);
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		}, null, once, data);
		return this;
	}

	Chess.prototype.getContainer = function() {
		return this.container;
	}

	Chess.prototype.draw = function() {
		var width = this.width, height = this.height;
		this.container.removeAllChildren();
		this.container.uncache();
		var opacityColor = "rgba(" + parseInt(this.color.substr(1, 2), 16) + ", " + parseInt(this.color.substr(3, 2), 16) + ", " + parseInt(this.color.substr(5, 2), 16) + ", 0.8)";
		var shape1 = new createjs.Shape();
		// shape1.graphics.beginLinearGradientFill([this.color, opacityColor, this.color, this.color], [0, 0.5, 0.51, 1], 0, 0, width, height).drawRoundRect(0, 0, width, height, 5);
		shape1.graphics.beginFill(this.color).drawRoundRect(2, 2, width-4, height-4, 5);
		var shape2 = new createjs.Shape();
		shape2.graphics.beginFill("rgba(255, 255, 255, 0.95)").drawRoundRect(6, 6, width - 12, height - 12, 5);
		var shape3 = new createjs.Shape();
		// shape3.graphics.beginLinearGradientFill([this.color, opacityColor, this.color, this.color], [0, 0.5, 0.51, 1], 3, 3, width - 6, height - 6).drawRoundRect(3, 3, width - 6, height - 6, 5);
		shape3.graphics.beginFill(this.color).drawRoundRect(8, 8, width - 16, height - 16, 5);


		this.container.addChild(shape1, shape2, shape3);

		var shape4 = new createjs.Shape();
		// 等腰30度三角形，高固定
		switch(this.direction) {
			case "down":
				shape4.graphics.setStrokeStyle(1, "round").beginFill(triColor).moveTo(width / 2, height / 2 + 7).lineTo(width / 2 - 14, height / 2 - 7).lineTo(width / 2 + 14, height / 2 - 7).closePath().endFill();
				break;
			case "left":
				shape4.graphics.setStrokeStyle(1, "round").beginFill(triColor).moveTo(width / 2 - 7, height / 2).lineTo(width / 2 + 7, height / 2 - 14).lineTo(width / 2 + 7, height / 2 + 14).closePath().endFill();
				break;
			case "right":
				shape4.graphics.setStrokeStyle(1, "round").beginFill(triColor).moveTo(width / 2 + 7, height / 2).lineTo(width / 2 - 7, height / 2 - 14).lineTo(width / 2 - 7, height / 2 + 14).closePath().endFill();
				break;
			case "up":
			default:
				shape4.graphics.setStrokeStyle(1, "round").beginFill(triColor).moveTo(width / 2, height / 2 - 7).lineTo(width / 2 - 14, height / 2 + 7).lineTo(width / 2 + 14, height / 2 + 7).closePath().endFill();
				break;
		}
			
		shape4.set({
			regX: width / 2,
			regY: height / 2,
			x: width / 2, 
			y: height / 2,
		});
		// if(this.direction == "down")
		// 	shape4.setTransform(0, 0, 1, 1, 180, 0, 0, width, height);
		// else if(this.direction == "left") {
		// 	shape4.setTransform(0, 0, 1, 1, -90, 0, 0, width, 0);
		// }
		// else if(this.direction == "right") {
		// 	shape4.setTransform(0, 0, 1, 1, 90, 0, 0, 0, height);
		// }

		this.container.addChild(shape4);

		var shape5 = new createjs.Shape();
		shape5.graphics.beginLinearGradientFill(["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"], [0.5, 0.5], 0, 0, width, height).drawRoundRect(0, 0, width, height, 5);
		this.container.addChild(shape5);
		this.container.cache(0, 0, this.width, this.height);
		return this;
	}

	Chess.prototype.drawDirection =  function(color) {
		this.container.getChildAt(3)
	}

	// 棋子移动到终止点。需要换一下效果
	Chess.prototype.drawOnAStop = function(color) {
		var shape2 = this.container.getChildAt(1);
		var opacityColor = "rgba(" + parseInt(color.substr(1, 2), 16) + ", " + parseInt(color.substr(3, 2), 16) + ", " + parseInt(color.substr(5, 2), 16) + ", 0.8)";
		// shape2.graphics.clear().beginLinearGradientFill([color, opacityColor, color, color], [0, 0.5, 0.51, 1], 2, 2, this.width - 4, this.height - 4).drawRoundRect(2, 2, this.width - 4, this.height - 4, 5);
		shape2.graphics.clear().beginFill(color).drawRoundRect(6, 6, this.width - 12, this.height - 12, 5);
		// if(color == this.color) {
		// 	newShape.graphics.setStrokeStyle(1, "round").beginStroke(color).drawRoundRect(2, 2, this.width - 4 , this.height - 4, 5);
		// }
		// else {
		// 	newShape.graphics.setStrokeStyle(1, "round").beginStroke(color).drawRoundRect(2, 2, this.width - 4 , this.height - 4, 5);	
		// }
		// this.container.addChild(newShape);
		this.container.cache(0, 0, this.width, this.height);
	}

	// 棋子离开终止点。需要换一下效果
	Chess.prototype.drawOffAStop = function() {
		var shape2 = this.container.getChildAt(1);
		shape2.graphics.clear().beginFill("rgba(255, 255, 255, 0.95)").drawRoundRect(6, 6, this.width - 12, this.height - 12, 5);
		this.container.cache(0, 0, this.width, this.height);
	}

	// 棋子移动到方向点。需要换一下效果
	Chess.prototype.drawOnADirection = function(color) {
		var shape4 = this.container.getChildAt(3);
		var width = this.width, height = this.height;
		var newColorRed = parseInt(color.substring(1,3), 16);
		var newColorGreen = parseInt(color.substring(3,5), 16);
		var newColorBlue = parseInt(color.substring(5), 16);
		shape4.filters = [
			new createjs.ColorFilter(0,0,0,1, newColorRed, newColorGreen, newColorRed, 0)
		];
		shape4.cache(0, 0, this.width, this.height);
		this.container.cache(0, 0, this.width, this.height);
	}

	// 棋子离开方向点。需要换一下效果
	Chess.prototype.drawOffADirection = function() {
		
		var shape4 = this.container.getChildAt(3);
		var width = this.width, height = this.height;
		var newColorRed = parseInt(triColor.substring(1,3), 16);
		var newColorGreen = parseInt(triColor.substring(3,5), 16);
		var newColorBlue = parseInt(triColor.substring(5), 16);
		shape4.filters = [
			new createjs.ColorFilter(0,0,0,1, newColorRed, newColorGreen, newColorRed, 0)
		];
		shape4.cache(0, 0, this.width, this.height);
		this.container.cache(0, 0, this.width, this.height);
	}

	Chess.prototype.direct = function(direction, completeFn) {
		console.log("direct: " + direction + ", curDirection: " + this.direction);
		var self = this;
		var curDirection = this.direction;
		if(this.direction != direction && (direction == 'up' || direction == 'right' || direction == 'down' || direction == 'left')) {
			this.direction = direction;
			var curInt, thisInt;
			switch (curDirection) {
				case 'up': 
					curInt = 1;
					break;
				case "right":
					curInt = 2;
					break;
				case "down":
					curInt = 3;
					break;
				case "left":
					curInt = 4;
					break;
			}

			switch (this.direction) {
				case 'up': 
					thisInt = 1;
					break;
				case "right":
					thisInt = 2;
					break;
				case "down":
					thisInt = 3;
					break;
				case "left":
					thisInt = 4;
					break;
			}

			var biasDegree = (thisInt - curInt) * 90;
			this.rotateBiasDegree += biasDegree;
			this.rotateBiasDegree %= 360;
			console.log(biasDegree);
			this.container.uncache();
			createjs.Tween.get(this.container.getChildAt(3)).to({
				rotation: self.rotateBiasDegree,
			}, 100, createjs.Ease.linear).call(function(){
				self.container.cache(0, 0, self.width, self.height);
				if(completeFn) {
					completeFn();
				}
			});
		}
	}

	Chess.prototype.go = function(completeFn, direction) {
		// console.log(this.container.x + ":" + this.container.y);
		var self = this;
		var fx, fy;
		direction = direction || this.direction;
		switch (direction) {
			case "up":
				fx = this.container.x;
				fy = this.container.y - this.step;
				this.y = this.y - this.step;
				break;
			case "right":
				fx = this.container.x + this.step;
				fy = this.container.y;
				this.x = this.x + this.step;
				break;
			case "down":
				fx = this.container.x;
				fy = this.container.y + this.step;
				this.y = this.y + this.step;
				break;
			case "left":
				fx = this.container.x - this.step;
				fy = this.container.y;
				this.x = this.x - this.step;
				break;
			default:
				fx = this.container.x;
				fy = this.container.y;
				break;
		}

		// this.set({
		// 	x: fx, 
		// 	y: fy
		// });
		if(completeFn)
			createjs.Tween.get(this.container).to({
				x: fx,
				y: fy,
			}, 100, createjs.Ease.linear).call(function(){
				completeFn(self);
			});
		else 
			createjs.Tween.get(this.container).to({
				x: fx,
				y: fy,
			}, 100, createjs.Ease.linear);

		// console.log(fx + ":" + fy);
	}


	module.exports = Chess;
});
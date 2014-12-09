define(function(require, exports, module) {
	var Chess = require("./squares_Chess.js");
	var Direction = require("./squares_Direction.js");
	var StopPoint = require("./squares_StopPoint.js");

	var Sets = function(config, colors, r, finishFn, stage, parentWidth, parentHeight) {
		this.singleWidth = r || 40;
		this.config = config || {};

		this.colors = colors;
		this.stage = stage;
		this.parentHeight = parentHeight;
		this.parentWidth = parentWidth;
		this.finishFn = finishFn || function(){};
		this.__init();
	}

	Sets.prototype.__init = function() {
		this.container = new createjs.Container();
		this.height = this.singleWidth * this.config.row;
		this.width = this.singleWidth * this.config.column;
		var self = this;
		this.sets = [];
		var no = 0;
		// console.log(this.config);
		for(var i=0; i<this.config.init.length; i++) {
			var current= this.config.init[i];
			var position = current.position;
			var y = position[0] * this.singleWidth;
			var x = position[1] * this.singleWidth;
			switch(current.type) {
				// 棋子
				case 1: 
					var chess = new Chess(this.colors[current.color], this.singleWidth, this.singleWidth, current.direction);
					chess.draw().set({
						x: x,
						y: y
					}).addClickListener({}, false, function(a, d) {
						self.goBeforeCheck(a, d);
					}, function(a) {
						self.goCompleteCheck(a);
					});
					// this.container.addChild(chess.getContainer());
					this.addChild(chess, no++);
					this.sets.push(chess);
					break;
				// 方向
				case 2:
					var direction = new Direction(this.singleWidth, this.singleWidth, current.direction);
					direction.set({
						x: x, 
						y: y
					});
					// this.container.addChild(direction.getContainer());
					this.addChild(direction, no++);
					this.sets.push(direction);
				 	break;
				// 终点
				case 4:
					var stopPoint = new StopPoint(this.colors[current.color], this.singleWidth, this.singleWidth);
					stopPoint.set({
						x: x, 
						y: y
					});
					// this.container.addChild(stopPoint.getContainer());
					this.addChild(stopPoint, no++);
					this.sets.push(stopPoint);
					break;
				default:
					break;
			}
		}
		// 不需要cache，因为每次都在动
		// this.container.cache(0, 0, this.width, this.height);
	}

	Sets.prototype.addChild = function(child, no) {
		var self = this;
		child.set({
			scaleX: 0,
			scaleY: 0,
			regX: child.width / 2,
			regY: child.height / 2,
		});
		self.container.addChild(child.getContainer());
		createjs.Tween.get(child.getContainer())
		.wait(no * 200)
		.to({
			scaleX: 1,
			scaleY: 1,
		}, 200, createjs.Ease.linear)
		.call(function() {
			if(no == self.sets.length) {
				self.container.cache(0, 0, self.width, self.height);
				self.stage.cache(0, 0, self.parentWidth, self.parentHeight);
			}
		});
	}

	// 棋子移动前需要验证和处理
	Sets.prototype.goBeforeCheck = function(chess, direction) {
		var self = this,
			chessX = chess.x,
			chessY = chess.y,
			direction = direction || chess.direction;
			childLen = this.sets.length;
		// 看有没有挡路的棋子，会推动一起移动
		var nextX, nextY;
		switch(direction) {
			case "up":
				nextX = chessX;
				nextY = chessY - chess.step;
				break;
			case "down":
				nextX = chessX;
				nextY = chessY + chess.step;
				break;
			case "left":
				nextX = chessX - chess.step;
				nextY = chessY;
				break;
			case "right":
				nextX = chessX + chess.step;
				nextY = chessY;
				break;
		}
		for(var i=0; i< childLen; i++) {
			var curChild = self.sets[i];
			if(chess == curChild) {
				continue;
			}
			if(chessX == curChild.x && chessY == curChild.y) {
				if(curChild instanceof Direction) {
					curChild.show();
					chess.drawOffADirection();
				}
				else if(curChild instanceof StopPoint) {
					curChild.show();
					chess.drawOffAStop();
				}
			}
			if(curChild.x == nextX && curChild.y == nextY && curChild instanceof Chess) {
				console.log("push a chess @ " + nextX + "," + nextY + " " + direction);
				self.goBeforeCheck(curChild, direction);
				curChild.go(function(a){
					console.log("goCompleteCheck");
					console.log(a);
					self.goCompleteCheck(a, true);
				}, direction);
			}
		}
		// this.container.cache(0, 0, this.width, this.height);
	}

	// 棋子移动以后需要验证和处理
	Sets.prototype.goCompleteCheck = function(chess, skipDone) {

		var self = this,
			chessX = chess.x,
			chessY = chess.y,
			childLen = this.sets.length;
		var skipDone = skipDone || false;
		for(var i=0; i<childLen; i++) {
			var curChild = self.sets[i];
			// console.log(curChild);
			if(chess == curChild) {
				continue;
			}
			// console.log(chessX + ":" + chessY + ":" + curChild.x + ":" + curChild.y);
			if(chessX == curChild.x && chessY == curChild.y) {
				// console.log(curChild);
				if(curChild instanceof Direction) {
					chess.drawOnADirection(curChild.color);
					curChild.hide();
					chess.direct(curChild.direction);
				}
				else if(curChild instanceof StopPoint) {
					chess.drawOnAStop(curChild.color);
					// console.log("ToStop: " + curChild.color);
					// console.log(curChild);
					curChild.hide();
					if(chess.color == curChild.color && skipDone == false) {
						var done = self.checkFinish();
						if(done) {
							self.finishAnimation();
						}
					}
				}
			}
		}
		// this.container.cache(0, 0, this.width, this.height);
	}

	Sets.prototype.checkFinish = function() {
		var self = this;
		var childLen = self.sets.length;
		var chessArr = [], stopPointArr = [];
		for(var i=0; i<childLen; i++) {
			if(self.sets[i] instanceof Chess) {
				chessArr.push(self.sets[i]);
			}
			else if(self.sets[i] instanceof StopPoint) {
				stopPointArr.push(self.sets[i]);
			}
		}

		var stopPointLen = stopPointArr.length;
		var done = true;
		for(var c=0; c<stopPointLen; c++) {
			var chessLen = chessArr.length;
			var stopPoint = stopPointArr[c];
			var finish = false;
			for(var s = 0; s<chessLen; s++) {
				var chess = chessArr[s];
				if(chess.x == stopPoint.x && chess.y == stopPoint.y && chess.color == stopPoint.color) {
					finish = true;
					chessArr.splice(s, 1);
					break;
				}
			}
			if(finish == false) {
				done = false;
				break;
			}
		}
		return done;
	}

	Sets.prototype.finishAnimation = function() {
		var self = this,
			childLen = self.sets.length,
			finishNo = 0;
		for(var i=0; i<childLen; i++) {
			createjs.Tween.get(self.sets[i].getContainer())
			.wait(0)
			.to({
				scaleX: 1.1,
				scaleY: 1.1,
			}, 50, createjs.Ease.linear)
			.to({
				scaleX: 0,
				scaleY: 0,
			}, 220, createjs.Ease.linear)
			.call(function(){
				finishNo++;
				if(finishNo == childLen)
					self.finishFn();
			});
		}
	}

	Sets.prototype.getWidth = function() {
		return this.width;
	}

	Sets.prototype.getHeight = function() {
		return this.height;
	}

	Sets.prototype.set = function(obj) {
		this.container.set(obj);
		return this;
	}

	Sets.prototype.getContainer = function() {
		return this.container;
	}

	module.exports = Sets;

});
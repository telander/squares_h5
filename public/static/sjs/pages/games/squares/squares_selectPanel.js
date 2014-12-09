define(function(require, exports, module) {

	var length = 40;

	// 渲染魔板
	function _showTemplate($domWrapper, $templateId, $data) {
		var $domWrapper = $domWrapper || $('body');
		var html = template($templateId, $data);
		$domWrapper.html(html);
	}

	var SelectItem = function(id, x, y, hidden) {
		this.x = x; 
		this.y = y;
		this.id = id;
		this.hidden = hidden || false;
		this.container = new createjs.Container();

		this.draw();
	}

	SelectItem.prototype.draw = function() {
		this.container.removeAllChildren();
		if(this.hidden == false) {
			var backShape = new createjs.Shape();
			backShape.graphics.setStrokeStyle(1, "round").beginFill("#dedbce").drawRoundRect(1, 1, length - 2, length - 2, 3);

			var heartShapeLeft = new createjs.Shape();
			heartShapeLeft.graphics.setStrokeStyle(1, "round").beginFill("rgba(252, 223, 222, 1)").moveTo(24, 15).lineTo(16, 15).arcTo(8, 15, 8, 20, 5).arcTo(8, 25, 13, 25, 5).lineTo(24, 25).closePath();
			heartShapeLeft.regX = 0;
			heartShapeLeft.regY = 0;
			heartShapeLeft.set({
				regX: length / 2,
				regY: length / 2,
				x: length / 2, 
				y: length / 2 + 2,
			});
			heartShapeLeft.rotation = 38;
			var heartShapeRight = new createjs.Shape();
			heartShapeRight.graphics.setStrokeStyle(1, "round").beginFill("rgba(252, 223, 222, 1)").moveTo(16, 15).lineTo(24, 15).arcTo(32, 15, 32, 20, 5).arcTo(32, 25, 27, 25, 5).lineTo(16, 25).closePath();
			heartShapeRight.regX = 0;
			heartShapeRight.regY = 0;
			heartShapeRight.set({
				regX: length / 2,
				regY: length / 2,
				x: length / 2, 
				y: length / 2 + 2,
			});
			heartShapeRight.rotation = -38;		
			// 313c42
			var text = new createjs.Text(this.id, "18px Calibri", "#313c42")
			text.textAlign = "center";
			text.set({
				// regX: length / 2,
				// regY: length / 2,
				x: length / 2,
				y: (length - 20 ) / 2
			})
			// this.container.addChild(backShape, heartShapeLeft, heartShapeRight, text);
			this.container.addChild(backShape, text);
		}
		else {
			var backShape = new createjs.Shape();
			backShape.graphics.setStrokeStyle(1, "round").beginFill("#dedbce").drawRoundRect(1, 1, length - 2, length - 2, 3);

			var heartShapeLeft = new createjs.Shape();
			heartShapeLeft.graphics.setStrokeStyle(1, "round").beginFill("#313c42").moveTo(24, 15).lineTo(16, 15).arcTo(8, 15, 8, 20, 5).arcTo(8, 25, 13, 25, 5).lineTo(24, 25).closePath();
			heartShapeLeft.regX = 0;
			heartShapeLeft.regY = 0;
			heartShapeLeft.set({
				regX: length / 2,
				regY: length / 2,
				x: length / 2, 
				y: length / 2 + 2,
			});
			heartShapeLeft.rotation = 38;
			var heartShapeRight = new createjs.Shape();
			heartShapeRight.graphics.setStrokeStyle(1, "round").beginFill("#313c42").moveTo(16, 15).lineTo(24, 15).arcTo(32, 15, 32, 20, 5).arcTo(32, 25, 27, 25, 5).lineTo(16, 25).closePath();
			heartShapeRight.regX = 0;
			heartShapeRight.regY = 0;
			heartShapeRight.set({
				regX: length / 2,
				regY: length / 2,
				x: length / 2, 
				y: length / 2 + 2,
			});
			heartShapeRight.rotation = -38;
			this.container.addChild(backShape, heartShapeLeft, heartShapeRight);
		}

		this.container.set({
			x: this.x, 
			y: this.y
		});
		this.container.cache(0, 0, length, length);
	}

	SelectItem.prototype.regMouseDown = function(parent) {
		console.log(this.id);
		var self = this;
		this.container.on("mousedown", function(){
			if(self.hidden == false) {
				parent.hide();
				parent.showClickFn(self.id);
			}
			else {
				parent.hiddenClickFn();
			}
		});
	}

	var SelectPanel = function(totalSet, currentBestSet, perRowSet, showClickFn, hiddenClickFn) {
		// 一共有多少关
		this.totalSet = totalSet;
		// 一行展示多少关
		this.perRowSet = perRowSet;
		// 目前过了多少关
		this.currentBestSet = currentBestSet;

		this.showClickFn = showClickFn || function(){};
		this.hiddenClickFn = hiddenClickFn || function(){};
		this.__init();
	}

	SelectPanel.prototype.__init = function() {
		_showTemplate($(".select-wrapper"), "setSelectWrapper");
		selectPanel = new createjs.Stage("canvasSelect");
		totalWidth = $(".set-select-wrapper").width();
		totalHeight = $(".set-select-wrapper").height();
		$("#canvasSelect").prop('width', totalWidth).prop('height', totalHeight);

		this.container = new createjs.Container();
		this.sets = [];
		var parent = this;

		this.width = this.perRowSet * length;
		this.height = Math.ceil(this.totalSet / this.perRowSet) * length;

		for(var i=0; i<this.totalSet; i++) {
			var yi = parseInt(i / this.perRowSet);
			var xi = i % this.perRowSet;
			var y = yi * length;
			var x = xi * length;
			var selectItem = new SelectItem(i+1, x, y, i<=this.currentBestSet?false:true);
			selectItem.regMouseDown(parent);
			this.sets.push(selectItem);
			this.container.addChild(selectItem.container);
		}

		this.container.set({
			x: totalWidth / 2 - this.width / 2,
			y: totalHeight / 2 - this.height / 2
		});
		
		selectPanel.addChild(this.container);
		createjs.Touch.enable(selectPanel);
		selectPanel.update();
		window.selectPanel = selectPanel;
		// this.container.cache(0, 0, this.width, this.height);
	}

	SelectPanel.prototype.unlock = function(newBestSet) {
		
	}

	SelectPanel.prototype.hide = function() {
		$(".set-select-wrapper").hide();
	}

	SelectPanel.prototype.show = function() {
		$(".set-select-wrapper").show();	
	}

	module.exports = SelectPanel;

});
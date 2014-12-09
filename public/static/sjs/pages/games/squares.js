define(function(require, exports, module) {
	var isMobile = require("../../modules/isMobile.js");
	var wxInnerShare = require("../../modules/wxShare.js");

	var Sets = require("./squares/squares_Set.js");
	var SelectPanel = require("./squares/squares_selectPanel.js");

	var selectPanel;
	// canvas和资源队列
	var globalCanvas, globalQueue, globalStage;

	// 全局颜色和棋盘
	var globalColor, globalSetMap;
	// 棋子高度
	var perMaxWidth, perMaxHeight;
	// 总关数和已过关数
	var totalSet, passTotalSet;
	var currentBest;

	// header and footer stage 
	var headStage, footStage;

	//
	var totalWidth, totalHeight;

	var squareLen=80;

	$(function() {
		$(window).on("resize", function() {
			var $width = $("body").width();
			var $height = $("body").height();
			var $resizediv = $(".resize__div__alert");
			if($height > $width) {
				$("body").css({
					minHeight: "418px",
					overflowY: "auto"
				});
				if($resizediv.length>0) {
					$resizediv.hide();
				}
			}
			else if($height < $width) {
				$("body").css({
					minHeight: "100%",
					overflowY: "hidden"
				});
				if($resizediv.length > 0) {
					$resizediv.show();
				}
				else {
					$newresize =$("<div class='resize__div__alert'><div class='resize__div__p'></div></div>");
					$("body").append($newresize);
					$newresize.css({
						position: 'absolute',
						display: 'block',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 50000,
						background: 'rgba(0,0,0,0.99)'
					});
					$(".resize__div__p").css({
						position: "absolute",
						display: "block",
						top: '50%',
						left: '50%',
						height: '250px',
						width: '125px',
						marginLeft: "-62px",
						marginTop: "-125px",
						background: "url(" + window.THIS.HOST + "static/css/imgs/rotate.png) no-repeat",
						backgroundSize: "100% 100%"
					});
				}
			}
		});
	});

	function savePassedSet() {
		if(window.localStorage) {
			window.localStorage.setItem("SetFinished", passTotalSet);
		}
		else if(window.sessionStorage) {
			window.sessionStorage.setItem("SetFinished", passTotalSet);	
		}
	}

	function getPassedSet() {
		if(window.localStorage) {
			return window.localStorage.getItem("SetFinished");
		}
		else if(window.sessionStorage) {
			return window.sessionStorage.getItem("SetFinished");	
		}
		return passTotalSet || 0;
	}


	function _initPage() {
		_showTemplate($(".canvas-wrapper"), "canvasWrapper");
		_showTemplate($(".canvas-header"), "canvasHeaderWrapper");
		_showTemplate($(".canvas-bottom"), "canvasBottomWrapper");
		loadInitStage();
		preloadSrc();
	}
	
	// 渲染魔板
	function _showTemplate($domWrapper, $templateId, $data) {
		var $domWrapper = $domWrapper || $('body');
		var html = template($templateId, $data);
		$domWrapper.html(html);
	}

	function loadInitStage() {
		// head stage
		headerWidth = $(".canvas-header-wrapper").width();
		headerHeight = $(".canvas-header-wrapper").height();
		$("#canvasHeader").prop('width', 2 * headerWidth).prop('height', 2 * headerHeight).css({"width": headerWidth + "px", "height": headerHeight + "px"});
		headStage = new createjs.Stage("canvasHeader");
		createjs.Touch.enable(headStage);

		// bottom stage
		bottomWidth = $(".canvas-bottom-wrapper").width();
		bottomHeight = $(".canvas-bottom-wrapper").height();
		$("#canvasBottom").prop('width', 2 * bottomWidth).prop('height', 2 * bottomHeight).css({"width": bottomWidth + "px", "height": bottomHeight + "px"});
		footStage = new createjs.Stage("canvasBottom");
		createjs.Touch.enable(footStage);

		totalWidth = 2 * $(".canvas-stage-wrapper").width();
		totalHeight = 2 * $(".canvas-stage-wrapper").height();
		
		$("#canvasStage").prop('width', totalWidth).prop('height', totalHeight).css({"width": totalWidth / 2 + "px", "height": totalHeight / 2 + "px"});
		globalStage = new createjs.Stage("canvasStage");
		var textTitle = new createjs.Text('Squares', 'bold 96px Calibri', '#2a3e51');
		textTitle.textAlign = 'center';
		var textSubTitle = new createjs.Text('Pu', 'bold 72px Calibri', '#2a3e51');
		textSubTitle.textAlign = 'center';
		textSubTitle.x = -72;
		textSubTitle.y = 96;
		var textSubTitle2 = new createjs.Text('zz', 'bold 72px Calibri', '#e37c22');
		textSubTitle2.textAlign = 'center';
		textSubTitle2.x = 0;
		textSubTitle2.y = 96;

		var textSubTitle3 = new createjs.Text('le', 'bold 72px Calibri', '#2a3e51');
		textSubTitle3.textAlign = 'center';
		textSubTitle3.x = 64;
		textSubTitle3.y = 96;

		var container = new createjs.Container();
	    container.addChild(textTitle, textSubTitle, textSubTitle2, textSubTitle3);
	    container.textBaseline = 'middle';
	    container.set({
	    	x: totalWidth / 2,
	    	y: totalHeight / 2 - 84
	    });

	    console.log(container.getBounds());

	 //    function zzRotate(){
	 //    	createjs.Tween.get(container.getChildAt(2)).to({
		//     	rotation: -15,
		//     }, 800, createjs.Ease.cubicInOut()).to({
		//     	rotation: 15,
		//     }, 800, createjs.Ease.cubicInOut()).call(zzRotate);
		// };

		// zzRotate();

	    //Add Shape instance to stage display list.
	    globalStage.addChild(container);
	    createjs.Touch.enable(globalStage);
	    //Update stage will render next frame
	    globalStage.update();

	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    createjs.Ticker.setFPS(40);
	    createjs.Ticker.addEventListener("tick", globalStage);

	    // console.log(textSubTitle2);
	}

	function setControlBottom(config) {
		var refresh = config.refresh || false;
		var openChoose = config.openChoose || false;
		var closeChoose = config.closeChoose || false;

		var width = $("#canvasBottom").prop('width');
		var height = $("#canvasBottom").prop('height');

		footStage.removeAllChildren();
		if(refresh) {
			var refreshText = new createjs.Text("刷新", '40px Calibri', '#2a3e51');
			// var b = refreshText.getBounds();
			var b = {width: refreshText.getMeasuredWidth(), height: refreshText.getMeasuredHeight()};
			refreshText.set({
				x: width - 20 - b.width,
				y: height / 2 - b.height / 2
			});
			// var hit = new createjs.Shape();
			// hit.graphics.beginFill("#00f").drawRect(width - 10 - b.width, height / 2 - b.height / 2, b.width, b.height);

			// refreshText.hitArea = hit;
			refreshText.on("click", function(evt, data) {
				loadSetsAt();
			});
			footStage.addChild(refreshText);
		}
		if(openChoose) {
			var openChooseText = new createjs.Text("选关", '40px Calibri', '#2a3e51');
			// var b = openChooseText.getBounds();
			var b = {width: openChooseText.getMeasuredWidth(), height: openChooseText.getMeasuredHeight()};
			openChooseText.set({
				x: 20,
				y: height / 2 - b.height / 2
			});
			// var hit = new createjs.Shape();
			// hit.graphics.beginFill("#f00").drawRect(10, height / 2 - b.height / 2, b.width, b.height);
			// openChooseText.hitArea = hit;
			openChooseText.on("click", function(evt, data) {
				selectPanel = new SelectPanel(totalSet, currentBest, 6, function(id){
					passTotalSet = parseInt(id) - 1 >= 0 ? parseInt(id) - 1 : 0;
					loadSetsAt();
				});
			});
			footStage.addChild(openChooseText);
		}
		if(closeChoose) {
			var closeChooseText = new createjs.Text("返回", '40px Calibri', '#2a3e51');
			var b = closeChooseText.getBounds();
			closeChooseText.set({
				x: 20,
				y: height / 2 - b.height / 2
			});
			footStage.addChild(closeChooseText);
		}
		footStage.update();
	}

	function setLevelHead(level) {
		console.log('setLevelHead ' + level);
		var width = $("#canvasHeader").prop('width');
		var height = $("#canvasHeader").prop('height');
		if(headStage.getNumChildren() == 0) {
			var headText = new createjs.Text('Level ' + level, '36px Calibri', '#2a3e51');
			var b = headText.getBounds();
			headText.set({
				// textAlign: 'center',
				x: width / 2 - b.width / 2,
				y: height / 2 - b.height / 2
			});

			var hint = new createjs.Shape();
			hint.graphics.beginFill('#2a3e51').drawRoundRect(width - 30, height/2 - 10, 20, 20, 20);

			headStage.addChild(headText);
			headStage.update();
			// headStage.cache(0, 0, width, height);
		}
		else {
			var headText = headStage.getChildAt(0);
			headText.text = "Level " + level;
			headStage.update();
			// headStage.cache(0, 0, width, height);
		}

	}

	function preloadSrc() {
		globalQueue = new createjs.LoadQueue(true);
		// console.log(window.THIS.HOST + 'static/json/squares_stage_map.json');
		globalQueue.loadFile({id: 'stagesMap', src: window.THIS.HOST + 'static/json/squares_stage_map.json', type: createjs.LoadQueue.JSON});
		globalQueue.on("complete", function(){
			setTimeout(function(){
				__preloadComplete();
			}, 4000);
		}, this);

		globalStage.on("mousedown", function() {
			console.log("mousedown on globalStage");
		});
	}

	function __preloadComplete() {
		var stagesMapJson = globalQueue.getResult("stagesMap");
		globalColor = stagesMapJson['colors'];
		globalSetMap = stagesMapJson['sets'];
		perMaxHeight = stagesMapJson['height'];
		perMaxWidth = stagesMapJson['width'];
		totalSet = globalSetMap.length;
		passTotalSet = 0;
		// console.log(globalSetMap[passTotalSet]);
		// console.log(globalColor);

		loadSetsAt();
		setControlBottom({refresh: true, openChoose: true});

		$("#refreshCurrent").on("click", function() {
			loadSetsAt();
		});

		$("#chooseSet").on("click", function() {
			window.selectPanel = new SelectPanel(totalSet, currentBest, 6, function(id){
				passTotalSet = parseInt(id) - 1 >= 0 ? parseInt(id) - 1 : 0;
				loadSetsAt();
			});
			// var gameSetNo = prompt("选择关卡", "1~" + totalSet);
			// if(gameSetNo == "1~"+totalSet){
			// 	gameSetNo = passTotalSet + 1;
			// }
			// gameSetNo = parseInt(gameSetNo);
			// if(!gameSetNo)
			// 	gameSetNo = passTotalSet + 1;
			// passTotalSet = gameSetNo - 1;
			// loadSetsAt();
		});
	}

	function loadSetsAt() {
		if(totalSet >= passTotalSet) {
			setLevelHead(passTotalSet + 1);
			var curSet = new Sets(globalSetMap[passTotalSet], globalColor, squareLen, function() {
				passTotalSet++;
				if(passTotalSet > currentBest) {
					savePassedSet();
					currentBest = passTotalSet;
				}
				loadSetsAt();
			}, globalStage, totalWidth, totalHeight);
			curSet.set({
				// x: totalWidth / 2,
				// y: totalHeight / 2,
				// regX: 0,
				// regY: 0,
				x: totalWidth / 2 - curSet.getWidth() / 2 + 40,
				y: totalHeight / 2 - curSet.getHeight() / 2 + 40
			});
			globalStage.removeAllChildren();
			globalStage.clear();
			globalStage.addChild(curSet.getContainer());
			globalStage.update();
			// console.log("load Set at");
			// window.globalStage = globalStage;
		}
		else {
			// alert("恭喜您通关！屌炸天！");
		}
	}

	// function loadNextSets() {
	// 	if(totalSet >= passTotalSet) {
	// 		var curSet = new Sets(globalSetMap[passTotalSet], globalColor, squareLen, function() {
	// 			passTotalSet++;
	// 			loadNextSets();
	// 		}, globalStage, totalWidth, totalHeight);
	// 		curSet.set({
	// 			x: totalWidth / 2 - curSet.getWidth() / 2 + 20,
	// 			y: totalHeight / 2 - curSet.getHeight() / 2 + 20,
	// 		});
	// 		globalStage.removeAllChildren();
	// 		globalStage.clear();
	// 		globalStage.addChild(curSet.getContainer());
	// 		globalStage.update();
	// 	}
	// 	else {
	// 	}
	// }

	$(function() {
		currentBest = getPassedSet();
		passTotalSet = currentBest;
		_initPage();
	});

});
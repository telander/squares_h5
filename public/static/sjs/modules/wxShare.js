define(function(require, exports, module) {
	var wxInnerShare = function(title, pic, url, txt, picwidth, picheight) {
		picwidth = picwidth || 160;
		picheight = picheight || 160;

		function innerShare(where) {
			if (where == 'friend') {
				window.WeixinJSBridge.invoke('sendAppMessage', {
					"appid": '',
					"img_url": pic,
					"img_width": "" + picwidth,
					"img_height": "" + picheight,
					"link": url,
					"desc": txt,
					"title": title,
				});
			} else if (where == 'timeline') {
				window.WeixinJSBridge.invoke('shareTimeline', {
					"img_url": pic,
					"link": url,
					"desc": txt,
					"title": title,
				});
			} else if (where == 'weibo') {
				window.WeixinJSBridge.invoke("shareWeibo", {
					'content': title + ">>" + url,
					'url': url,
				});
			}
		}

		function customWxInnerShare() {
			window.WeixinJSBridge.on('menu:share:appmessage', function(argv) {
				innerShare('friend');
			});

			window.WeixinJSBridge.on('menu:share:timeline', function(argv) {
				innerShare('timeline');
			});

			window.WeixinJSBridge.on('menu:share:weibo', function(argv) {
				innerShare('weibo');
			});
		};

		if (typeof title == 'undefined' || typeof pic == 'undefined' || typeof url == "undefined") {
			return;
		}
		if (typeof window.WeixinJSBridge == "undefined" || typeof window.WeixinJSBridge.invoke == "undefined") {
			var retry = 5;
			var t = setInterval(function() {
				if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
					clearInterval(t);
					customWxInnerShare();
				} else if (retry <= 0) {
					clearInterval(t);
				}
				retry--;
			}, 200);
		} else {
			customWxInnerShare();
		}
	};

	module.exports = wxInnerShare;
});
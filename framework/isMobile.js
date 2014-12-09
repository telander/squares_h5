var isMobile = {
	Android: function(str) {
		return (str || navigator.userAgent).match(/Android/i);
	},
	BlackBerry: function(str) {
		return (str || navigator.userAgent).match(/BlackBerry/i);
	},
	iOS: function(str) {
		return (str || navigator.userAgent).match(/iPhone|iPad|iPod/i);
	},
	Opera: function(str) {
		return (str || navigator.userAgent).match(/Opera Mini/i);
	},
	Windows: function(str) {
		return (str || navigator.userAgent).match(/IEMobile/i);
	},
	any: function(str) {
		return (isMobile.Android(str) || isMobile.BlackBerry(str) || isMobile.iOS(str) || isMobile.Opera(str) || isMobile.Windows(str));
	},
	weChat: function(str) {
		var ua = (str || navigator.userAgent).toLowerCase();
		if(/micromessenger/.test(ua) == true) {
			return true;
			// 如果要检查版本
			// var reg = /micromessenger\/(\d+)/;
			// var match = ua.match(reg);
			// if(match.length == 2 && parseInt(match[1]) >= 5) {
			// 	return true;
			// }
		}
		return false;
	}
}
 
module.exports = isMobile;
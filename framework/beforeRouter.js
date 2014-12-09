var config = require("../config/config.js");
var isMobile = require("./isMobile.js");
exports.clearSession = function(req, res, next) {
	req.session = null;
	next();
}

exports.assembleParam = function(req, res, next) {
	req.thisParam = req.thisParam || [];
	if(config.port != 80){
		req.thisParam.host = "http://" + req.host + ":" + config.port + "/";	
	}
	else {
		req.thisParam.host = "http://" + req.host + "/";		
	}
	req.thisParam.isMobile = isMobile.any(req.headers['user-agent']);
	req.thisParam.clientType = isMobile.weChat(req.headers['user-agent']) ? 'weChat' : 'unChecked';
	
	req.thisParam.staticVersion = config.staticVersion;
	req.thisParam.cdn_prefix = config.cdn_prefix;
	next();
}


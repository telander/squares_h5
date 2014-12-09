var config = require("../config/config.js");

var matchRoute = function(req) {
	var routeReg = config.route;
	var controller, action, param;

	// console.log("path: " + req.path + "; params: " + req.params + "; url: " + req.url);
	// console.log(req.params);


	for (pattern in routeReg) {
		var reg = new RegExp(pattern);
		// console.log(req.url);
		if(reg.test(req.url)) {
			controller = routeReg[pattern][0];
			action = routeReg[pattern][1];
			param = {};
			matches = reg.exec(req.url);
			if(matches.length > 1) {
				for(i = 1; i < matches.length; i++) {
					if(typeof routeReg[pattern][1+i] != 'undefined')
						param[routeReg[pattern][1+i]] = matches[i];
				}
			}
			break;
		}
	}
	return [controller, action, param];
}

exports.route = function(req, res, next) {
	var match = matchRoute(req);
	var controller = match[0];
	var action = match[1];
	var param = match[2];
	// console.log("Controller+Action:" + controller + action);
	if(typeof controller == 'undefined' || typeof action == 'undefined') {
		console.log(req.url);
		res.send(404, "Sorry, we can't find that");
		// var url = req.url;
		// res.render("test", {ua: req.headers['user-agent'], user: req.isLogin ? req.user : 'Guest', url: url});
	}
	else {
		var thisController = require("../controller/" + controller.charAt(0).toUpperCase() + controller.substring(1) + ".js");
		for(key in param) {
			req.thisParam[key] = param[key];
		}

		thisController[action](req, res, next);
	}
	
}
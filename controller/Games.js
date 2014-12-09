// Squares
exports.squares = function(req, res, next) {
	var url = req.url;
	var pageCss = "games/squares";
	var pageJs = "games/squares";
	res.render("games/squares", {
		thisParam: req.thisParam,
		pageJs: pageJs,
		pageCss: pageCss,
		ua: req.headers['user-agent']
	});
	res.end();
}

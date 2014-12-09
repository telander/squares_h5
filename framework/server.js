var http = require("http");
var express = require("express");
var config = require("../config/config.js");
var beforeRouter = require("./beforeRouter");
var router = require("./router");

var ejs = require("ejs");

var bodyParser = require("body-parser");
var timeout = require("connect-timeout");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var session = require('cookie-session');
var md5 = require("md5");

var app = express();


function haltByTimeout(req, res, next) {
	if(!req.timedout) next();
	else res.end("服务器像蜗牛一样，超时啦！");
}

app.set("views", __dirname + "/../views");
app.set("view engine", "ejs");

app.use('/static', function(req, res, next){
	if(/j1/.test(req.url)) {
		next();
	}
	else express.static(__dirname + '/../public/static')(req, res, next);
});

app.use(function(req, res, next) {
	if(/t\.jpg/.test(req.url)) {
		console.log(req.url);
	}
	next();
})
	

app.use(timeout(5000));
app.use(bodyParser({keepExtensions: true, uploadDir: "/var/tmp/"}))
app.use(bodyParser.urlencoded());
app.use(haltByTimeout);
app.use(methodOverride());
app.use(haltByTimeout);
app.use(cookieParser(config.cookieSecret));
app.use(haltByTimeout);
app.use(session({
	keys: [config.sessionKey1, config.sessionKey2],
	overwrite: true,
	maxage: ( config.sessionExpire || 20 ) * 60 * 1000,
	expires: new Date("31/12/2050 00:00:00"),
}));
app.use(haltByTimeout);

// 添加额外信息, 判断了UserAgent
app.all("*", beforeRouter.assembleParam);

app.use(router.route);

app.listen(config.port);

http.createServer(app);

console.log("服务器已启动，监听" + config.port);
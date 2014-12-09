module.exports = {
	port: 8887,
	cookieSecret: "MhxzKhl",
	sessionKey1: "MhxzKhl",
	sessionKey2: "MhxzKhl",
	sessionExpire: "20",  // minute

	staticVersion: '1',

	cdn_prefix: 'http://127.0.0.1:8887/static/imgs/',

	route: {
		"^\/h5games/squares": ['Games', 'squares']
	}
}
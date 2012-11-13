//requires
var http = require('http');
var url = require('url');


function start(route, handle){
	function onRequest(req, res) {
		// store request pathname
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received");

		//call router with res and req objects
		route(handle, pathname, res, req);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;

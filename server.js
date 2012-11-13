
var http = require("http");
var url = require("url");


function start(route, handle){
	function onRequest(req, res) {
		// store POST data
		var postData = "";
		// store request pathname
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received");
		
		//handle POST data extraction
		req.setEncoding("utf8");

		//add data listener
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk +"'.");

		});
		req.addListener("end", function() {
			//call router
			route(handle, pathname, res, postData);
		});
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;

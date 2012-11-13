var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//define request handler mapping
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;


server.start(router.route);
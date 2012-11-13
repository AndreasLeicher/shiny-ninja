var exec = require("child_process").exec;

function start(res) {
	console.log("Request handler 'start' called.");
	
	exec("ls -lah", function (err, stdout, stderr) {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(stdout);
		res.end();
	});
}

function upload(res) {
	console.log("Request handler 'upload' called.");
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello upload");
	res.end();
}

exports.start = start;
exports.upload = upload;


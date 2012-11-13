var exec = require("child_process").exec;

function start() {
	console.log("Request handler 'start' called.");
	var content = "empty";
	exec("ls -lah", function (err, stdout, stderr) {
		content = stdout;
	})


	return content;
}

function upload() {
	console.log("Request handler 'upload' called.");
	return "Hello upload";
}

exports.start = start;
exports.upload = upload;


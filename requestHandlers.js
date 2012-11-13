function start() {
	console.log("Request handler 'start' called.");

	function sleep(millis) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + millis);
	}

	sleep(10000);
	return "Hello start";
}

function upload() {
	console.log("Request handler 'upload' called.");
	return "Hello upload";
}

exports.start = start;
exports.upload = upload;


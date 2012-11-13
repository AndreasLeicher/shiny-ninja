var querystring  = require("querystring"),
fs = require("fs");


//request handler for start page, allows users to upload a file
function start(res, postData) {
	console.log("Request handler 'start' called.");
	
	var body = 
	'<html>' +
	'<head>' +
	'	<meta http-equiv="Content-Type" content="text/html"; charset=UTF-8" />' +
	'</head>' + 
	'<body>' +
	'	<form action="/upload" enctype="multipart/form-data" method="post">' + 
	'		<input type="file" name="upload">' +
	'		<input type="submit" value="Upload File" />' + 
	'	</form>' + 
	'</body>' + 
	'</html>';

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}


// request handler for uploads, also calls show to display file
function upload(res, postData) {
	console.log("Request handler 'upload' called.");
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("You sent this: \n\n" + 
		querystring.parse(postData).text);
	res.end();
}


// display the test.png file
function show(res, postData) {
	console.log("Request handler 'show' called.");
	fs.readFile("/tmp/test.png", "binary", function(err, file) {
		if(err) {
			//display error message
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
		} else {
			//display file
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(file, "binary");
			res.end();
		}
	});
}


exports.start = start;
exports.upload = upload;
exports.show = show;


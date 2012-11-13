var querystring  = require("querystring"),
	fs = require("fs")
	formidable = require("formidable");


//request handler for start page, allows users to upload a file
function start(res) {
	console.log("Request handler 'start' called.");
	
	var body = 
	'<html>' +
	'<head>' +
	'	<meta http-equiv="Content-Type" content="text/html"; charset=UTF-8" />' +
	'</head>' + 
	'<body>' +
	'	<form action="/upload" enctype="multipart/form-data" method="post">' + 
	'		<input type="file" name="upload" multiple="multiple">' +
	'		<input type="submit" value="Upload File" />' + 
	'	</form>' + 
	'</body>' + 
	'</html>';

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}


// request handler for uploads, also calls show to display file
function upload(res, req) {
	console.log("Request handler 'upload' called.");

	//use formidable to save file
	var form = new formidable.IncomingForm();
	console.log("about to parse.");
	//parse POST data using formidable
	form.parse(req, function(error, fields, files) {
		console.log("parsing done.");
		//rename uploaded file to /tmp/test.png, delete if it exists
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
			if (err) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
	//write response HTML
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("received image: <br/>");
	res.write("<img src='/show' />");
	res.end();
	});
}


// display the test.png file
function show(res) {
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


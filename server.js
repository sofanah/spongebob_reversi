/* Include the static file webserver library */
var static = require('node-static');

/*Include the http server library */
var http = require('http');

/* Assume running on Heroku */
var port = process.env.PORT;
var directory = __dirname + '/public';

/* If not on Heroku, readjust the port and directory info */
if(typeof port == 'undefined' || !port){
	directory = './public';
	port = 8080;
}

/* Set up a static webserver to deliver files from filesystem */
var file = new static.Server(directory);

/* Construct http server to get files from file server */
var app = http.createServer(
	function(request, response){
		request.addListener('end', 
			function(){
				file.serve(request,response);
			}
		).resume();
	}).listen(port);

/* Make sure the server is running */
console.log('The server is running');
var http = require('http');

var port = 8080;

var server = http.createServer(handleRequest);

function handleRequest(request, response) {
  // capture the method of the request just to print it out and see it. you can start to enforce which methods you'll accept by rejecting certain message types here. 
  var method = request.method;

  // set requestData to empty var
  var requestData = '';

  // (listener) if the request has something (receives any data) in its data key, it will fire off a fxn that takes requestData and puts data to it
  request.on('data', function(data) {
    requestData = data;
  });

  // when request end triggers listener, turn request data into a string and show it in response.end
  request.on('end', function(){
    output = requestData.toString();
    response.end('Your post had ' + output);
  });
}

server.listen(port, function() {
  console.log('Server is running');
});
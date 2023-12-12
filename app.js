// File: app.js

//Importing 'http' module.
const http = require('http');

const port = 8081;

// importing "currencies" module
const currencies = require('./currencies.json');

const objectStr = {
    "serverName" : "VS Code server",
    "version": "1.0.2",
    "Current Date": new Date().toLocaleDateString(),
    "Current Time" : new Date().toLocaleTimeString()
}

const serverInfo = {
    serverName: "Crio Server",
    version: "1.0.0",
    currentDate: new Date().toDateString(),
    currentTime: new Date().toTimeString(),
  };
  
// host - the address where our server will be accessible (example: localhost)
// port - the port of the machine where the server application is running

//'createServer' method is creating a server with the help http module.
http.createServer((request, response) => {
    const url = request.url;
    console.log("Hello from server.");
    console.log(new Date().toLocaleDateString());
    console.log(new Date().toLocaleTimeString());
    // console.log(ojectStr);

    // Set response status code and response headers

    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.writeHead(200, { 'Content-Type': 'application/json' });

    // const jsonString = JSON.stringify(objectStr) //Stringify the response.
    // Set response body i.e, data to be sent

    // response.write(jsonString);

    if(request.url === "/status"){
        response.writeHead(200, {"Content-Type": "application/json"}) //Adding Headers.
        response.write(JSON.stringify(serverInfo));
        response.end();
    } else if(request.url === "/data"){
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(currencies.data));
        response.end();
    } else if(request.url==="/"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<h1>Hello from Server</h1>');
        response.end();
    } else{
        response.writeHead(404);
        response.end();
    }


    // Tell the server the response is complete and to close the connection

    // response.end();

//'listen' takes 'port' as first argument. And it listen for 'requests'
}).listen(port, () => {

    // Log text to the terminal once the server starts

    console.log(`Nodejs server started on port ${port}`)

});

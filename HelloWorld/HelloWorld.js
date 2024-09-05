const http = require('http') //puts required module into a contant called http.
//define the port the app will be accessed from (80,8080,8888 are default to the domain)
const PORT = process.env.PORT || 3000
// the http module can cerate a http server that listens to the server

// the callback is a function which executes after something else has completed

//use the createServer() method to create a http server:
// this is how we respond to any request and apply logic
const server = http.createServer((request,response) =>{
    console.log(request)
    response.writeHead(200,{'Content-Type':'text/plain'})
    response.end('Hello World')
})

//start the server
server.listen(PORT, ()=> console.log(`server started on port ${PORT}
    press Ctrl-C to terminate.....`))

    //server.listen(PORT)` is a callback function
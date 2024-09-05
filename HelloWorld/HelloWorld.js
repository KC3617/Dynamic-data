const http = require('http') //puts required module into a contant called http.
//define the port the app will be accessed from (80,8080,8888 are default to the domain)
const PORT = process.env.PORT || 3000
// the http module can cerate a http server that listens to the server

// the callback is a function which executes after something else has completed

//use the createServer() method to create a http server:
// this is how we respond to any request and apply logic
const server = http.createServer((request,response) =>{
    console.log("*************************************")
    console.log("*************************************")

    console.log(request.url)
    console.log(request.method) 
    // methods can be: get(retrieves info. Associated w/ read oppertaion of a database)
    //post(submits info on behalf of the user to the server. Associated w/ create operation) => CREATE ""
    //put(understood more as an update to existing info compared to post. Is update) =>update
    //delete => delete

    //how to handle requests
    //ROUTING

    if(request.url == "/"){
        //execute the statement
    response.writeHead(200,{"Content-Type":"text/plain"})
    response.end("Home page")
    }
    else if(request.url == "/contact"){
        //execute the statement
    response.writeHead(200,{"Content-Type":"text/plain"})
    response.end("Contact page")
    }
    else if(request.url == "/about"){
        //execute the statement
    response.writeHead(200,{"Content-Type":"text/plain"})
    response.end("About page")
    }
    else if(request.url == "/gallery"){
        //execute the statement
    response.writeHead(200,{"Content-Type":"text/HTML"})
    response.end("<html><head><title>Page Title</title></head><body><h1>My 1st HTML Response</h1></body></html>")
    }
    else {
        response.writeHead(400,{"Content-Type":"text/plain"})
        response.end("Page Not Found Error 400")
    }
    //Basic conditions 
    /**
     * Equals: i.e. if a == b (equal sign twice bc = alone is an assignment operator i.e. assigning value to variable)
     * Not equal: i.e. if a != b
     * Greater than: i.e. if a > b
     * Less than: i.e. if a < b
     * Greater than or equal: i.e. if a >= b
     * Less than or equal: i.e. if a <= b
     */

    console.log("Responding to request")

    console.log("*************************************")
    console.log("*************************************")
})

//start the server
server.listen(PORT, ()=> console.log(`server started on port http://localhost:${PORT}
    press Ctrl-C to terminate.....`))

    //server.listen(PORT)` is a callback function
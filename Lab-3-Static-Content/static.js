const http = require('http') //puts required module into a contant called http.
//define the port the app will be accessed from (80,8080,8888 are default to the domain)
//in order to access local files, we need to work with the file system
const fs = require("fs")

const PORT = process.env.PORT || 3000
// the http module can cerate a http server that listens to the server

// the callback is a function which executes after something else has completed

//Syntax to create a function
const functionName = (parameter1, parameter2, parameter3) => {
    //code to be executed
}

//Create a function to read and display files
//can only specify default value for 1st and last parameter in function
const displayPage = (path,res,contentType,responseCode=200) => {
    fs.readFile(__dirname + path, (errors,content) => {
        if(errors){
            res.writeHead(500,{'Content-type':'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode,{"Content-Type": contentType})
        res.end(content)
    })
}
// "/public/home.html"

//use the createServer() method to create a http server:
// this is how we respond to any request and apply logic
const server = http.createServer((request,response) =>{

    console.log(request.url)
    console.log(request.method) 
    // methods can be: get(retrieves info. Associated w/ read oppertaion of a database)
    //post(submits info on behalf of the user to the server. Associated w/ create operation) => CREATE ""
    //put(understood more as an update to existing info compared to post. Is update) =>update
    //delete => delete

    //how to handle requests
    var path = request.url
    //ROUTING
    switch(path){
        case '':
        case'/':
            displayPage('/public/home.html',response,'text/html')
        break
        case '/about':
            displayPage('/public/about.html',response,'text/html')
        break
        case '/contact':
            displayPage('/public/contact.html',response,'text/html')
        break
        case '/logo':
            displayPage('/public/img.jpg',response,'image/jpg')
        break
        default:
            displayPage('/public/404.html',response,'text/html', 400)
        break
    }

    console.log("Responding to request")
})

//start the server
server.listen(PORT, ()=> console.log(`server started on port http://localhost:${PORT}
    press Ctrl-C to terminate.....`))

    //server.listen(PORT)` is a callback function
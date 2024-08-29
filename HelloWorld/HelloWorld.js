const http = require('http')
const PORT = process.env.PORT || 3000
const server = http.createServer((request,response) =>{
    console.log(request)
    response.writeHead(200,{'Content-Type':'text/plain'})
    response.end('Hello World')
})

server.listen(PORT, ()=> console.log(`server started on port ${PORT}
    press Ctrl-C to terminate.....`))

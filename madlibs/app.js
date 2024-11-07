// imports express into our project 
const express = require('express') 
//create the express server inside a variable called app
const app = express()
//Specify static routes
app.use(express.static('public'))
// import a package for handlebars
const expressHandlebars = require('express-handlebars')
// make express use the handlebars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000

app.get("/", (req,res)=>{
    res.render('page')
})

app.post('/process',(req,res)=>{
    res.send('got post')
})

app.get('/process',(req,res)=>{
    console.log(req.query)
})


//Handle the error first
//NOT FOUND!
app.use((request,response)=>{
    response.status(404)
    response.render('404')
 })

 //SERVER ERROR :(
    app.use((error,request,response,next)=>{
        console.log(error.message)
        response.status(500)
        response.render('500')
     })
    
     app.listen(PORT, ()=>{
        console.log(`Express is running on http://localhost:${PORT} `)
        console.log('Press ctrl-c to terminate')
     })
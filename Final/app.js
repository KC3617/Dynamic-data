// imports express into our project 
const express = require('express') 
//create the express server inside a variable called app
const app = express()
//Specify static routes
app.use(express.static('public'))
// import a package for handlebars
const expressHandlebars = require('express-handlebars')
//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')

const port = process.env.port || 3000
app.get("/",(req,res)=>{
    res.render('page',{req})
})





//Error handling ->  app.use() basic express route 
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//Server Error 500
app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500') 
}) 

// setup listener
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    //console.log('Server starter http://localhost:'+port)
    console.log('To close pres Ctrl-C')
})
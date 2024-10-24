//imports express into our project
const express = require('express')
//create express server insdie var called app
const app = express()

//specify static routes
app.use(express.static('public'))

//import a package for handlebars
const expressHandlebars=require('express-handlebars')

//make express use the handlebars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')

const PORT = process.env.port || 3000

//import app-wide data
const gallery= require("./data/gallery.json")

//process routes before errors(write at end)
app.get('/',(request,response,)=>{
    console.log(gallery)
    //import page-specific data
    const data = require("./data/home-data.json")

    response.render('landing',{
        gallery,
        data
    })
})
app.get('/events',(request,response,)=>{
    const data = require("./data/events_festivals-data.json")
    response.render('page',{
        gallery,
        data
    })
})
app.get('/food',(request,response,)=>{
    const data = require("./data/food_dining-data.json")
    response.render('page',{
        gallery,
        data
    })
})
app.get('/nightlife',(request,response,)=>{
    const data = require("./data/nightlife_entertainment-data.json")
    response.render('page',{
        gallery,
        data
    })
})
app.get('/retail',(request,response,)=>{
    const data = require("./data/shopping_markets-data.json")
    response.render('page',{
        gallery,
        data
    })
})

//Handle errors first (write 1st)
//NOT FOUND:
app.use( (request,response)=>{
    response.status(404)
    response.render('404')
} )

//SERVER ERROR:
app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.listen(PORT, ()=>{
    console.log(`Express is running on http://localhost:${PORT}`)
    console.log('Press ctrl-c to terminate')
})
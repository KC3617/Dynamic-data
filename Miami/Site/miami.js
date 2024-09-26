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

//process routes before errors(write at end)
app.get('/',(request,response,)=>{
    response.render('landing',{
        title:"This Is Miami",
        abstract:"Miami is in FLorida & very expensive",
        image:"miamiroad.jpg"
    })
})
app.get('/about',(request,response,)=>{
    response.render('page',{
        title:"About Miami",
        abstract:"Miami is in the south and spelled with 5 letters. It is also hot."
    })
})
app.get('/hotspots',(request,response,)=>{
    response.render('page',{
        title:"Miami Hotspots",
        abstract:"Miami is a party city. Go out and do things(legally) here."
    })
})

app.get('/Gallery',(request,response,)=>{
    response.type('text/plain')
    response.send('Pictures of Miami')
})

//triggers server error
app.get('/history',(req,res,)=>{
    response.type('text/plain')
    response.send('History of Miami')
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
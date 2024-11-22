// Run the following commands in terminal:
// npm install express
// npm install express-handlebars 
// if you have errors, run   
// sudo npm install express
// sudo npm install express-handlebars 


const express = require('express')

const expressHandlebars = require('express-handlebars') 

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')
//ends handlebar configuration

const port = process.env.port || 3000

//Setup routes
app.get("/",(req,res)=>{
    const data = require('./data/homepage.json') 
    res.render('homepage',{data})
})

app.get("/about",(req,res)=>{
    const data = require('./data/about.json') 
    res.render('page',{data})
})
// all category pages
app.get("/category1",(req,res)=>{
    const data = require('./data/category_1.json') 
    res.render('category',{data})
})
app.get("/category2",(req,res)=>{
    const data = require('./data/category_2.json') 
    res.render('category',{data})
})
app.get("/category3",(req,res)=>{
    const data = require('./data/category_3.json') 
    res.render('category',{data})
})
//details page
app.get("/category1/details/:id",(req,res)=>{

    const data = require('./data/category_1.json') 
    console.log(data)
    // filter the data to get only the data that matches the id
    // temporary filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    console.log("data filter")
    console.log(data)

    res.render('details',{"data":tempData})
})

let cart = {"products":[]}

app.get("/cart",(req,res) =>{
    if(typeof(req.query.id) != "undefined") {
        cart.products.push(req.query)
        console.log(req)
        console.log(req.query.name)
    } else {
        console.log(req)
        console.log(req.query.id)
        console.log(req.query.name)
    }

    res.render("cart",{"products":cart.products})
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

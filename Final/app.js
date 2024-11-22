//Run the following commands in terminal:
//npm install express
//npm install express-handlebars
//if you have errors, run
//sudo npm install express
//sude npm install express-handlebars

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

//setup routes
app.get("/",(req,res)=>{
    const data= require('./data/homepage.json')
    res.render('homepage',{data})
})

//about page
app.get("/about",(req,res)=>{
    const data= require('./data/about.json')
    res.render('about',{data})
})

//categories

app.get("/category/:category",(req,res)=>{
    if(req.params.category == "accessories"){
        let dataFile = './data/accessories-data.json'
    } else  if(req.params.category == "tops"){
        let dataFile = './data/tops-data.json'
    } else  if(req.params.category == "bottoms"){
        let dataFile = './data/bottoms-data.json'
    }
    var data= require(dataFile)
    res.render('category',{data})
})

//details page
app.get("/category/:category/details/:id",(req,res)=>{
    if(req.params.category == "tops"){
        let data = top-data.json
    }

    const data= require('./data/homepage.json')
    //filter to get data that matches the id
    // temp filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    res.render('details',{"data":tempData})
})

//shopping cart
let cart = {"products":[]}

app.get("/cart",(req,res)=>{

    if(typfeof(req.query.id) != "undefined") {
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
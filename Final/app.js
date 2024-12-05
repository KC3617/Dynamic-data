// Run the following commands in terminal:
// npm install express
// npm install express-handlebars 
// if you have errors, run   
// sudo npm install express
// sudo npm install express-handlebars 

const express = require('express')

const expressHandlebars = require('express-handlebars') 

const app = express()

app.use(express.static('public'))

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')
//ends handlebar configuration

const port = process.env.port || 3000

//Setup routes
app.get("/",(req,res)=>{
    const data = require('./data/homepage.json')
    const featuredProducts = getFeaturedProducts(6); // Get 6 featured products
    res.render('homepage',{
        data: data,
        featuredProducts: featuredProducts
    })
})

//function to get featured products from json files
const fs = require('fs')
const path = require('path')
function getFeaturedProducts(numberOfProducts = 6) {
    const categoryFiles = ['./data/category_1.json', './data/category_2.json', './data/category_3.json'] // Add all your category files
    let allProducts = []

    categoryFiles.forEach(file => {
        const filePath = path.join(__dirname, file)
        const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        allProducts = allProducts.concat(categoryData.products.map(product => ({
            ...product,
            categoryName: categoryData.name
        })))
    })

    // Shuffle the array to randomize selection
    allProducts.sort(() => 0.5 - Math.random())

    // Return the specified number of products
    return allProducts.slice(0, numberOfProducts)
}
//end

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

app.get("/category2/details/:id",(req,res)=>{

    const data = require('./data/category_2.json') 
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

app.get("/category3/details/:id",(req,res)=>{

    const data = require('./data/category_3.json') 
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

//cart
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

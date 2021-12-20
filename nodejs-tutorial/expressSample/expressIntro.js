const express = require('express')
const app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.set('view engine', 'pug')


app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})


let categoryArray = [
    {
        "id": 2,
        "description": "Sweet and savory sauces relishes spreads and seasonings",
        "name": "Condiments"
    },
    {
        "id": 1,
        "description": "Soft drinks coffees teas beers and ales",
        "name": "Beverages"
    },
    {
        "id": 3,
        "description": "Desserts candies and sweet breads",
        "name": "Confections"
    },
    {
        "id": 4,
        "description": "Cheeses",
        "name": "Dairy Products"
    },
    {
        "id": 5,
        "description": "Breads crackers pasta and cereal",
        "name": "Grains/Cereals"
    },
    {
        "id": 6,
        "description": "Prepared meats",
        "name": "Meat/Poultry"
    },
    {
        "id": 7,
        "description": "Dried fruit and bean curd",
        "name": "Produce"
    },
    {
        "id": 8,
        "description": "Seaweed and fish",
        "name": "Seafood"
    }
]

app.get('/category', (req, res) => {
    res.render('category', { categories:  categoryArray})

})


app.get('/addcategory', (req, res) => {
    res.render('addcategory')

})

app.post('/addcategory', (req, res) => {
 
   

    res.render('addcategory')

})


app.get('/about', (req, res) => {
    res.send('Welcome about page!!')
})

// app.get('/category', (req, res) => {
//     res.json({ name: 'Electronic', description: 'Electronic products...' })
// })



app.listen(3000, function () {
    console.log('Sunucu aslanlar gibi ayakta...');
})
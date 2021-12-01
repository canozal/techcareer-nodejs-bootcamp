const express = require('express')
const app = express();


// Her bir uca ENDPOINT diyorum
app.get('/', (req, res) => {
    res.send('Welcome home page!!')
})

app.get('/about', (req, res) => {
    res.send('Welcome about page!!')
})

app.get('/category', (req, res) => {
    res.json({ name: 'Electronic', description: 'Electronic products...' })
})



app.listen(3000, function () {
    console.log('Sunucu aslanlar gibi ayakta...');
})
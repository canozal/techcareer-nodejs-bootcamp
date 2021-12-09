
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { webUserController } = require('./controllers/webUserController');
const { connectionHelper } = require('./dbconnect/connectionHelper');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


connectionHelper.connect();



app.get('/api/webusers', (req, res) => {
    webUserController.getAll(req, res)
})


app.get('/api/webusers/:id', (req, res) => {
    webUserController.getById(req, res)
})

app.post('/api/webusers', (req, res) => {
    webUserController.add(req, res)
})

app.delete('/api/webusers/:id', (req, res) => {
    webUserController.delete(req, res)
})

app.put('/api/webusers', (req, res) => {
    webUserController.update(req, res)
})


app.listen(8080, () => {
    console.log("Sunucum çalışıyor...");
})

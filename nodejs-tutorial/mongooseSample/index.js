
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { webUserController } = require('./controllers/webUserController');
const { connectionHelper } = require('./dbconnect/connectionHelper');
var jwt = require('jsonwebtoken');
const { adminUserModel } = require('./models/adminUser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


connectionHelper.connect();

let accessPrivateKey = "techCareer";
let refreshPrivateKey = "techCareerRefreshToken"


let accessTokenExpireTime = 20;
let refreshTokenExpireTime = 300;
//refresh token >>>>>>> access token


app.use((req, res, next) => {

    if (req.originalUrl == '/token' || req.originalUrl == '/refreshToken') {
        next();
    }
    else {
        let token = req.headers.authorization;

        try {
            jwt.verify(token, accessPrivateKey, function (err, decoded) {
                if (err) {
                    console.log(err);
                }
            });
            next();

        } catch {
            res.status(401).json({ 'message': 'Yetkiniz yok' });
        }
    }

})

app.post('/token', (req, res) => {

    adminUserModel.findOne({ email: req.body.email, password: req.body.password }, (err, doc) => {

        if (doc != null) {
            //Token üretip arkadaşa ver

            const accessToken = jwt.sign({ email: req.body.email }, accessPrivateKey, {
                algorithm: 'HS512',
                expiresIn: accessTokenExpireTime
            })

            const refreshToken = jwt.sign({ email: req.body.email }, refreshPrivateKey, {
                algorithm: 'HS512',
                expiresIn: refreshTokenExpireTime
            })

            res.json({ 'accessToken': accessToken, 'refreshToken': refreshToken })

        }
        else {
            res.status(404).send("Admin email veya parola hatalı!");

        }

    })

})


app.post('/refreshToken', (req, res) => {

    var refToken = req.body.refreshToken;

    try {
        jwt.verify(refToken, refreshPrivateKey);

        const accessToken = jwt.sign({ email: req.body.email }, accessPrivateKey, {
            algorithm: 'HS512',
            expiresIn: accessTokenExpireTime
        })

        const refreshToken = jwt.sign({ email: req.body.email }, refreshPrivateKey, {
            algorithm: 'HS512',
            expiresIn: refreshTokenExpireTime
        })

        res.json({ 'accessToken': accessToken, 'refreshToken': refreshToken })



    } catch {
        res.status(401).json({ 'tokenError': 'Token süreniz doldu!!' });
    }

})

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


app.post('/api/webusers/loginControl', (req, res) => {
    webUserController.loginControl(req, res)
})


app.listen(8080, () => {
    console.log("Sunucum çalışıyor...");
})




// JWT

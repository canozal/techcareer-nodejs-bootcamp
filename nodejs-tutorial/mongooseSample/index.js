
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
var uuid = require('uuid');
var path = require('path')

const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const { sendChatMessage } = require('./socketHandler/chatHandler')(io)



const { webUserController } = require('./controllers/webUserController');
const { connectionHelper } = require('./dbconnect/connectionHelper');
var jwt = require('jsonwebtoken');
const { adminUserModel } = require('./models/adminUser');
const { productModel } = require('./models/product');
const { categoryModel } = require('./models/category');
const { productController } = require('./controllers/productController');
const webUserRoute = require("./routes/webUserRoutes");
const { webUserModel } = require('./models/webUser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/webusers', webUserRoute)

// categoryModel.findById('61bb71713b0d21ea2139285f',(err, doc) => {


//     if(doc != null){
// var product = new productModel({
//     name: 'Iphone',
//     unitsInStock: 4,
//     category : '61bb71713b0d21ea2139285f'
// });

// product.save();
//     }
// })


//Eğer client benden bu ürünün KATEGORİSİNİN adını da isterse manuel join işlemi gerçekleştiriyorum


// productModel.findById('61bb7598a9409739c01c8049').populate('_category').exec(function(err, doc) {
//     console.log('Result: ', doc._category);

//   });


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept , Authorization"
    );
    next()
});

let clients = [];


io.on('connection', (socket) => {

    clients.push(socket.id);
    console.log(clients);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('newmessage', sendChatMessage);


});



connectionHelper.connect();

let accessPrivateKey = "techCareer";
let refreshPrivateKey = "techCareerRefreshToken"


let accessTokenExpireTime = 20;
let refreshTokenExpireTime = 300;



app.use((req, res, next) => {

    next();
    // if (req.originalUrl == '/token' || req.originalUrl == '/refreshToken') {
    //     next();
    // }
    // else {
    //     let token = req.headers.authorization;

    //     try {
    //         // jwt.verify(token, accessPrivateKey, function (err, decoded) {
    //         //     if (err) {
    //         //         console.log(err);
    //         //     }
    //         // });

    //         jwt.verify(token, accessPrivateKey);
    //         next();

    //     } catch {
    //         res.status(401).json({ 'message': 'Yetkiniz yok' });
    //     }
    // }

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



app.get('/webuserpage',(req,res) => {
    res.sendFile('postImageSample.html', {root: __dirname })
})

app.post('/api/userimage', upload.single('webuserimage'), (req, res) => {



    let extName = path.parse(req.file.originalname).ext


    //Resmi ya mongodb ye kaydederim ya da file olarak bir klasöre kaydederim.

    //1. yol gelen resmi dosya olarak kaydetmek

    // var file = __dirname + "/" + uuid.v1()  + extName;
    // fs.readFile(req.file.path, function (err, data) {
    //     fs.writeFile(file, data, function (err) {
    //         if (err) {
    //             console.error(err);
    //             response = {
    //                 message: 'Sorry, file couldn\'t be uploaded.',
    //                 filename: req.file.originalname
    //             };
    //         } else {
    //             response = {
    //                 message: 'File uploaded successfully',
    //                 filename: req.file.originalname
    //             };
    //         }
    //         res.end(JSON.stringify(response));
    //     });
    // });


    //2. yol - Gelen resmi mongodb ye  kaydetmek

    var newWebUser = new webUserModel({
        name: "Steve",
        surname: "Harris",
        address: "ABD",
        password: "123",
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/jpeg'
        }
    })

    newWebUser.save()

    res.send('OK')


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


app.get('/api/webusers/:id', (req, res) => {
    webUserController.getById(req, res)
})

app.post('/api/webusers', (req, res) => {

    webUserController.add(req, res, io);

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

app.post('/api/products', (req, res) => {

    productController.add(req, res);

})

app.get('/api/products', (req, res) => {

    productController.getAll(req, res);

})


// app.listen(8080, () => {
//     console.log("Sunucum çalışıyor...");
// })



server.listen(8080, () => {
    console.log('listening on *:8080');
});





// JWT

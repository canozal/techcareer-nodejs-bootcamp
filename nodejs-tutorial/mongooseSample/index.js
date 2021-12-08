//mongoose paketi ile nodejs üzerinden mongodb ye ulaşacağım

const mongoose = require('mongoose')
const { Schema } = mongoose

const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



mongoose.connect("mongodb+srv://user_techcareer:KB0jZ7gSjEFsXwDY@cluster0.9orl8.mongodb.net/techcareermusicdb?authSource=admin&replicaSet=atlas-13lahc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
    .catch(err => {
        //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor
        console.log("Connection Error: ", err);
    })


//VS Code üzerinden collection oluşturacağım
const webUserSchema = new Schema({
    name: { type: String, required: true },
    surname: String,
    email: String,
    address: String,
    city: [],
    detail: {},
    addDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },

})

const webUserModel = mongoose.model('WebUser', webUserSchema);



app.get('/api/webusers', (req, res) => {
    webUserModel.find((err, docs) => {
        if (!err) {
            res.json(docs)
        }
        else {
            res.json(err)
        }
    })
})

app.post('/api/webusers', (req, res) => {


    var newWebUser = new webUserModel({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address
    })

    newWebUser.save((err, doc) => {

        if (!err) {
            res.status(201).json(doc)
        }
        else {
            res.status(500).json(err);
        }
    })

})

app.delete('/api/webusers/:id', (req, res) => {

    var webUserId = req.params.id

    webUserModel.findByIdAndRemove(webUserId, (err, doc) => {

        if (!err) {
            res.json(doc)
        }
        else {
            res.status(500).json(err)
        }

    })

})

app.put('/api/webusers', (req, res) => {

    //Öncelikle mongoda güncellenecek WebUser bulunur.

    var id = req.body.id
    // webUserModel.findByIdAndUpdate(id, { name: req.body.name, surname: req.body.surname }, { new: true }, (err, doc) => {
    //     if (!err) {
    //         res.json(doc)
    //     }
    //     else {
    //         res.status(500).json(err);
    //     }
    // })

    webUserModel.findById(id, (err, doc) => {

        if(!err){
            doc.name = req.body.name;
            doc.surname = req.body.surname;
            doc.save()

            res.json(doc)
        }
        else{   
            res.status(500).json(err)
        }

    })



})


app.listen(8080, () => {
    console.log("Sunucum çalışıyor...");
})













// Yeni bir webuser ekleme işlemi
// var webUser = new webUserModel({
//      name: "Tuna",
//     surname: 'Sakar',
//     email: 'tuna@mail.com',
//     address: 'Olmayan bir kolon',
//     city: ['İzmir', 'İstanbul', 'Ankara'],
//     detail: { language: 'English', color: 'Yellow' }
// })

// webUser.save((err,doc)=>{

//     //Hata yoksa bu if bloğuna girer yani err null ise
//     if(!err){
//         console.log('Eklenen döküman ', doc);
//     }
//     else{
//         //Burası hatanın olduğu yer.
//         console.log('Hata: ', err);
//     }
// })


//DB First - Code First
//DB First => Önce veritabanı üzerinden tablolar oluşturulur
//Code First => Veritabanı tabloları ( collectionlar code üzerinde oluşturulup veritabanına bildirilir )

//ready states being:

// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting

// setTimeout(() => {
//     console.log(mongoose.connection.readyState) 
// }, 2000);


// try {
//     await mongoose.connect('mongodb+srv://user_techcareer:KB0jZ7gSjEFsXwDY@cluster0.9orl8.mongodb.net/test?authSource=admin&replicaSet=atlas-13lahc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
//   } catch (error) {
//     handleError(error);
//   }



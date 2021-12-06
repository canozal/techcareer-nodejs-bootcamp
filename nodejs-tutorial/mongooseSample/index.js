//mongoose paketi ile nodejs üzerinden mongodb ye ulaşacağım

const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect("mongodb+srv://user_techcareer:KB0jZ7gSjEFsXwDY@cluster0.9orl8.mongodb.net/techcareermusicdb?authSource=admin&replicaSet=atlas-13lahc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
.catch(err =>{

    //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor
    console.log("Connection Error: ", err);
})

//VS Code üzerinden collection oluşturacağım

const webUserSchema = new Schema({
    name: String,
    surname: String,
    email: String
})

const webUserModel = mongoose.model('WebUser',webUserSchema);



// Yeni bir webuser ekleme işlemi

var webUser = new webUserModel({
    name:"Tuna",
    //surname:'Sakar',
    //email:'tuna@mail.com',
    //address:'Olmayan bir kolon'
})

webUser.save()





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

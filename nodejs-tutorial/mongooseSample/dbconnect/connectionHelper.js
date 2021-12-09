
const mongoose = require('mongoose');


const connectionHelper = {
    connect: () => {
        mongoose.connect("mongodb+srv://user_techcareer:KB0jZ7gSjEFsXwDY@cluster0.9orl8.mongodb.net/techcareermusicdb?authSource=admin&replicaSet=atlas-13lahc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
            .catch(err => {
                //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor
                console.log("Connection Error: ", err);
            })

    }
}


module.exports = {
    connectionHelper
}



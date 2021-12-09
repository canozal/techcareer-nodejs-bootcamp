
const mongoose = require('mongoose');
const { connectionString } = require('../env/config');


const connectionHelper = {
    connect: () => {
        mongoose.connect(connectionString)
            .catch(err => {
                //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor
                console.log("Connection Error: ", err);
            })

    }
}


module.exports = {
    connectionHelper
}



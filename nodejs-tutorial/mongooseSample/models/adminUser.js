
const mongoose = require('mongoose')
const { Schema } = mongoose


const adminUserSchema = new Schema({
    email : String,
    password: String,
})

const adminUserModel = mongoose.model('AdminUser', adminUserSchema );

module.exports = {
    adminUserModel
}


console.log('ADMin user model js !!');

const mongoose = require('mongoose')
const { Schema } = mongoose




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

const webUserModel = mongoose.model('WebUser', webUserSchema );

module.exports = {
    webUserModel
}
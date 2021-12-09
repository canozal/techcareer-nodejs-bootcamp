
const mongoose = require('mongoose')
const { Schema } = mongoose


const webUserLogSchema = new Schema({
    webUserId: String,
    addDate: { type: Date, default: Date.now },
    loginType: String,
    ipAddress: String

})

const webUserLogModel = mongoose.model('WebUserLog', webUserLogSchema );

module.exports = {
    webUserLogModel
}
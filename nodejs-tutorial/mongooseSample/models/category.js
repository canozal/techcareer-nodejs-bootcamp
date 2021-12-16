// bir ürünün sadece bir tane kategorisi olur (!)
//Kategorinin ürünleri olur



const mongoose = require('mongoose')
const { Schema } = mongoose


const categorySchema = new Schema({
    name : String,
    description: String

})

const categoryModel = mongoose.model('Category', categorySchema );

module.exports = {
    categoryModel
}



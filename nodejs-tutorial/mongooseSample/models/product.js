// bir ürünün sadece bir tane kategorisi olur (!)
//Kategorinin ürünleri olur



const mongoose = require('mongoose')
const { Schema } = mongoose

//1. yöntem
//Eğer client benden bu ürünün KATEGORİSİNİN adını da isterse manuel join işlemi gerçekleştiriyorum

// const productSchema = new Schema({
//     name : String,
//     unitPrice: Number,
//     unitsInStock : Number,
//     categoryId : String
// })


//2. yöntem
// Eğer client benden bu ürünün kategorisinin adını isterse içerideki nested objeden bunu almam mümkün!
// Şema bir miktar daha büyüdü 
// Ana kategori objesi değiştiğinde bu objenin haberi olmayacak!!

// const productSchema = new Schema({
//     name : String,
//     unitPrice: Number,
//     unitsInStock : Number,
//     category: {}
// })


//3. yöntem referans ile bağlama
const productSchema = new Schema({
    name : String,
    unitPrice: Number,
    unitsInStock : Number,
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
    
})

const productModel = mongoose.model('Product', productSchema );

module.exports = {
    productModel
}

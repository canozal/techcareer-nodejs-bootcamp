const { productModel } = require("../models/product")




const productController = {

    add: (req, res) => {

        var product = new productModel({
            name: req.body.name,
            unitPrice: req.body.unitPrice,
            category: req.body.categoryId
        });


        product.save((err, doc) => {
            if (!err) {
                res.status(201).json(doc);
            }
            else {
                res.status(500).json(err);
            }
        })
    },
    getAll: (req, res) => {
        productModel.find().populate('category').exec(function (err, doc) {


            if (!err) {
                res.json(doc)
            }
            else {
                res.status(500).json(err);
            }

        });
    }


}

module.exports = {
    productController
}
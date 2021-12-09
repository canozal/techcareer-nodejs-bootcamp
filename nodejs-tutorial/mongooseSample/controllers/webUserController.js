//Bu controller webuserla ilgili işlemleri yapacak arkadaş

const mongoose = require('mongoose');
const { webUserModel } = require('../models/webUser');




const webUserController = {

    getById: (req, res) => {

        var id = req.params.id;

        webUserModel.findById(id, (err, doc) => {

            if (!err && doc != null) {
                res.json(doc)
            }
            else if (doc == null) {
                res.status(404).json(null)
            }
            else {
                res.status(500).json(err);
            }

        })

    },
    getAll: (req, res) => {
        var query = {};
        var fields = req.query.fields;


        var fieldResult = '';

        if (fields != undefined) {
            var fieldArray = fields.split(',');
            fieldArray.forEach(item => {
                fieldResult = item + " " + fieldResult
            })
        }


        if (req.query.name !== undefined) {
            query.name = req.query.name;
        }
        if (req.query.surname !== undefined) {
            query.surname = req.query.surname;
        }
        if (req.query.address !== undefined) {
            query.address = req.query.address;
        }



        webUserModel.find(query, fieldResult, (err, docs) => {
            if (!err) {
                res.json(docs)
            }
            else {
                res.json(err)
            }
        })
    },
    add: (req, res) => {
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
    },
    delete: (req, res) => {
        var webUserId = req.params.id

        webUserModel.findByIdAndRemove(webUserId, (err, doc) => {

            if (!err) {
                res.status(404).json(doc)
            }
            else {
                res.status(500).json(err)
            }

        })
    },
    update: (req, res) => {
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

            if (!err) {
                doc.name = req.body.name;
                doc.surname = req.body.surname;
                doc.save()

                res.json(doc)
            }
            else {
                res.status(500).json(err)
            }

        })
    }

}

module.exports = {
    webUserController
}
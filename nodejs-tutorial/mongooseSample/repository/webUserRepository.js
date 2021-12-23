//Bu controller webuserla ilgili işlemleri yapacak arkadaş

const { webUserModel } = require('../models/webUser');
const { webUserLogModel } = require('../models/webUserLog');


var CryptoJS = require("crypto-js");
const { userLoginKey } = require('../env/shaKey');




const webUserRepository = {

    getById: async (id) => {

        let newWebUser = {};

        // var result  = await webUserModel.findById(id).exec()
        // res.json(result);


        await webUserModel.findById(id, (err, doc) => {

            if (!err && doc != null) {
                return doc;
            }
            else if (doc == null) {
                return null
            }
        })
    }

}

module.exports = {
    webUserRepository
}
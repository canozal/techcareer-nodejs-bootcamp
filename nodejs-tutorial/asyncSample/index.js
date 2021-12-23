const fs = require('fs');
var async = require("async");


let files = ['./user.json', './admin.json'];

let finalData = [];


for (i = 0; i < files.length; i++) {
    fs.readFile(files[i], function (err, data) {

        let resultData = JSON.parse(data);
        finalData.push(resultData);
        
        if(finalData.length == files.length){
            sendData(finalData)
        }

    });
}



function sendData(data){
   // console.log(data);
}






var jsonFiles = [];

async.forEachOf(files, (file, key, callback) => {
    fs.readFile(file, (err, data) => {
           let result = JSON.parse(data);
           jsonFiles.push(result)

        callback();
    });
}, err => {
    console.log(jsonFiles);
});

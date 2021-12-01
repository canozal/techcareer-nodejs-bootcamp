const http = require('http')
const fs = require('fs')

const port = 8080
const server = http.createServer(function (req, res) {
    //throw 'aman da aman';
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('Hello Nodejs!')

    if (req.url == '/') {
        fs.readFile('./index.html', function (err, data) {
            if( err == null){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
            else{
                res.writeHead(500);
                res.end('Sunucu tarafında bir hata meydana geldi')
            }
        })
    }
    else if (req.url == '/about') {

        fs.readFile('./about.html', function(err,data){

            console.log('1');

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data)

        })

    }
    else {
        fs.readFile('./404.html', function(err,data){

            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data)

        })
    }


})


server.listen(port, function () {
    console.log("Sunucum çalışıyor...!");
})


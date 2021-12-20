const nodemailer = require('nodemailer');


const { v4: uuidv4 } = require('uuid');
console.log(uuidv4()); 

var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'bilgebatman19@gmail.com',
        pass: 'Superman!35'
    }

})


var mailOptions = {
    from: 'bilgebatman19@gmail.com',
    to: 'yildiz.cagatay@hotmail.com',
    subject: 'Nodejs Bootcamp!',
    text: 'Merhaba Mehmet. Nodejs bootcamp e hoşgeldin beş gittin!!'
}

function sendEMail(mailOptions) {

    transporter.sendMail(mailOptions, function (err, info) {

        if (err) {
            console.log('EMail gönderme işlemi esnasında bir hata meydana geldi!');
        }
        else {
            console.log('EMail sent: ' + info.response);
        }

    })

}

// sendEMail(mailOptions);

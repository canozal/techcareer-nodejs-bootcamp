

var myPromise = new Promise(function (myResolve, myReject) {


    var success = true;

    console.log('0');

    if (success) {

        myResolve({ name: 'çağatay', surname: 'yıldız' })

    }
    else {
        myReject('ERROR!!');
    }
})



myPromise
    .then((data) => {
        console.log('1');
        console.log(data.name);
    })
    .catch((err) => {
        console.log(err);
    })


console.log('2');


// function myImageUpload(myResolve, reject){


//     var success = false;


//     if(success){
//         myResolve('cagatay.jpeg')
//     }
//     else{
//         reject('ERROR!!');
//     }

// }


// myImageUpload(resolve,reject);


// function resolve(image){
//     console.log('Oley be çalıştı' + image);
// }


// function reject(errorMessage){
//     console.log(errorMessage);
// }




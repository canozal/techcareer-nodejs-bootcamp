

//JS object
var product = {
    name: 'Iphone',
    unitPrice: 5000,
    unitsInStock: 20,
    supplierName: 'Apple'
}

// console.log(product.name);


var webUser = {
    name: 'Çağatay',
    surname: 'Yıldız',
    languages: ['js', 'csharp', 'swift']
}


// console.log(webUser.languages[1])


var order = {
    orderId: 4523,
    orderStatus: true,
    detail: {
        name: 'Steve',
        surname: 'Harris'

    }
}

console.log(order.orderId);
console.log(order['orderId']);


// console.log(order.detail.name);



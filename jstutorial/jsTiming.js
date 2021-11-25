

// 2 saniye sonra buradaki kod bloğu çalışır ( 2000 ml olarak yazılmıstır!)
setTimeout(() => {

    console.log('time out function çalıştı!!!');
}, 20000);


//Ben her iki saniyede bir çalışırım
setInterval(() => {
    console.log('bu her iki saniyede bir çalışır');
}, 2000);


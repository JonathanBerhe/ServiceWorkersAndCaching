function print( msg )
{
    var formatDataNow = new Date(Date.now()).toLocaleString('it-IT');
    console.log(formatDataNow, msg);
}


// Check if service workers is supported
if(navigator.serviceWorker)
{
    print("Service Worker: Supported");

    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('../../service-worker.js')
        .then(reg => print("Service Worker: Registered!"))
        .catch(err => print('Service Worker: error ' + err.toString()))
    })
}



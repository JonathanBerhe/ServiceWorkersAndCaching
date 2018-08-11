
function log( msg )
{
    var formatDataNow = new Date(Date.now()).toLocaleString('it-IT');
    console.log(formatDataNow, msg);
}



// Check if service workers is supported
if(navigator.serviceWorker)
{
    log("Service Worker: Supported");

    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('../../service-worker.js')
        .then(reg => log("Service Worker: Registered!"))
        .catch(err => log('Service Worker: error ' + err.toString()))
    })
}



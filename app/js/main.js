// Check if service workers is supported
if(navigator.serviceWorker)
{
    console.log("Service Worker: Supported");

    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('../../service-worker.js')
        .then(reg => console.log("Service Worker: Registered!"))
        .catch(err => console.log('Service Worker: error ' + err.toString()))
    })
}


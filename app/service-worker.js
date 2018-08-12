const cache_version = 'v1';

const cache_items = [
    './img/*.PNG',
    './js/*.js',
    './index.html'
];


// Call install event
self.addEventListener('install', event => {
    log("Service Worker: Installing .")

    event.waitUntil( preCache() );
});


// Call fetch event
self.addEventListener('fetch', e => {

    e.respondWith( fromCache(e.request) );
    log("Service Worker: Is serving the assets..");

    e.waitUntil( updateCache(e.request) );
    log(`Service Worker: Cache ${cache_version} is updated.`);
});



// f(x) that put items into cache.
function preCache()
{
    return cache.open(cache_version).then(function(cache)
    {
        log("Service Worker: Storing assets into cache..");

        // Put arrayItems into cache.
        return cache.addAll(cache_items);
    });
}


// f(x) that trying to take items from cache
function fromCache(request)
{
    return caches.open(cache_version).then(function(cache)
    {
        log("Service Worker: Taking assets from cache..");

        // Compare actual cache with the request from remote server..
        return cache.match(request).then(function(matching)
        {
            if(matching !== cache_version) log(`Service Worker: Actual cache ${cache_version} !== request; Clearing old cache..`);
            
            return matching || caches.delete(cache); 
        });
    });
}


function updateCache(request)
{
    log(`Service Worker: Opening cache version: ${cache_version} from update event..`)
    // Take cache_version from caches..
    return caches.open(cache_version).then(function(cache)
    {
        // Fetch request and put the response into cache(cache_version)
        return fetch(request).then(function(respose)
        {
            log("Service Worker: Updating cache form fetch event..")
            return cache.put(request, respose);
        })
        .catch(err => cache.match(request).then(error_return => {
            log(`Service Worker: ERROR UPDATE CACHE ${cache_version}`);
            return error_return;
        }));
    });
}

// utility f(x) - console.log
function log( msg )
{
    var formatDataNow = new Date(Date.now()).toLocaleString('it-IT');
    console.log(formatDataNow, msg);
}
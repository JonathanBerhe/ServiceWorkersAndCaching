const cache_version = 'v1';

// Call install event
self.addEventListener('install', e => {
    console.log("Service Worker: Installed.")
});

// Call activate event
self.addEventListener('activate', e => {
    console.log("Service Worker: Activated!")

    e.waitUntil(
        caches.keys().then( cache_version => {
            return Promise.all(
                cache_version.map( cache => {
                    if( cache !== cache_version)
                    {
                        console.log("Service Worker: Clearing old cache...");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log("Service Worker: Fetching...");

    e.respondWith(
        fetch(e.request)
        .then(res => {

            // Make a copy
            const resClone = res.clone();

            // Open cache
            caches.open(cache_version)
            .then(cache => {
                cache.put(e.request, resClone);
            });

            return res;

        }).catch( err => caches.match(e.request).then(res => res))
    );
});
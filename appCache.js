/**
 *
 */

(function() {

	console.log('Loaded worker!', self);

	var CACHE_NAME = 'v1',
		MAX_AGE = 30000,   // 30 sec
		cacheUrls = [
		'/test_serviceworker/',
		'/test_serviceworker/index.html',
		'/test_serviceworker/css/custom.css',
		'/test_serviceworker/images/p2.png',
		'/test_serviceworker/js/networkHandler.js',
		'/test_serviceworker/js/dataLoader.js',
		'/test_serviceworker/js/main.js',
		'/test_serviceworker/back/posts.json'
	];

	self.addEventListener('install', function(event) {
		console.log('install', event);

		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(function(cache) {
					console.log('Opened cache');
					return cache.addAll(cacheUrls);
				})
		);
	});

	self.addEventListener('activate', function(event) {
		console.log('activate', event);
	});

	self.addEventListener('fetch', function(event) {

		event.respondWith(
			caches.match(event.request)
				.then(function(cachedResponse) {
					var lastModified, fetchRequest;

					console.log('fetch req resp', event.request, cachedResponse);

					// from caches
					if (cachedResponse) {

						// update cache for js-files
						if (cachedResponse.headers.get('content-type') == 'application/javascript') {
							lastModified = new Date(cachedResponse.headers.get('last-modified'));

							if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
								fetchRequest = event.request.clone();

								return fetch(fetchRequest)
									.then(function(response) {

										if (!response || response.status !== 200) {
											return cachedResponse;
										}

										caches.open(CACHE_NAME)
											.then(function(cache) {
												cache.put(event.request, response.clone());
											});

										return response;
									}).catch(function() {

										return cachedResponse;
									});
							}
						}

						return cachedResponse;
					}

					// from network
					return fetch(event.request);
				})
		);
	});


})();

/**
 *
 */

(function() {

	if (!navigator.serviceWorker) {
		return;
	}

	navigator.serviceWorker.register(
		'/test_serviceworker/appCache.js',
		{ scope: '/test_serviceworker/' }
	).then(function(registration) {

		console.log('Registered ServiceWorker', registration);

		if (registration.installing) {
			console.log('Service worker installing');
		} else if (registration.waiting) {
			console.log('Service worker installed');
		} else if (registration.active) {
			console.log('Service worker active');
		}

		registration.unregister();

	}).catch(function(err) {
		throw new Error('ServiceWorker registration failed: ' + err);
	});

})();

/**
 *
 */

(function() {
	var xhr;

	xhr = new XMLHttpRequest();
	xhr.open('get', 'back/posts.json', true);
	xhr.send();
	xhr.addEventListener('loadend', function() {

		console.log( this.responseURL, JSON.parse(this.response) );
	});

})();

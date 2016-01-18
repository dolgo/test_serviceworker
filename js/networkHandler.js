/**
 *
 */

(function() {

	var networkHandler = {

		indicator: null,

		init: function() {
			var that = this;

			window.addEventListener('online', this.updateIndicator);
			window.addEventListener('offline', this.updateIndicator);

			window.addEventListener('load', function() {
				that.indicator = document.getElementById('indicator');
				that.updateIndicator();
			});
		},

		updateIndicator: function() {

			this.indicator.className = (navigator.onLine)? 'online' : 'offline';
		}
	};

	networkHandler.init();

})();
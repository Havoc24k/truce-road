/**
 * HeaderView
 */

app.views.headerView = (function() {
	var _CONTAINER_NAME = 'header-view';
	var _page;

	/**
	 * [render description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function render(data) {
		return $.parseHTML(app.templateEngine.createHTML({
			name: _CONTAINER_NAME,
			container: $('#' + _CONTAINER_NAME),
			data: data,
			options: {
				addTemplate: false
			}
		}));
	}

	/**
	 * [setupHandlers description]
	 * @return {[type]} [description]
	 */
	function setupHandlers() {
		$('.back-to-map').bind('touchend click', function(e) {
			e.preventDefault();
			app.views.mapView.show();
		});
	}

	////////////////////
	//Event Handlers //
	////////////////////

	return {

		/**
		 * [show description]
		 * @return {[type]} [description]
		 */
		show: function() {
			// render
			_page = render({});

			// slide page to view
			app.pageSlider.slidePage($(_page));

			// execute any extra code needed
			setupHandlers();

			$(document).foundation();
		},

		/**
		 * [hide description]
		 * @return {[type]} [description]
		 */
		hide: function() {
			$('#' + _CONTAINER_NAME).empty();
		}
	};
})();

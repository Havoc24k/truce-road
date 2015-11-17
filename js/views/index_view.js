/**
 * IndexView
 */

app.views.indexView = (function() {
	var _CONTAINER_NAME = 'index-view';
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
	function setupHandlers() {}

	////////////////////
	//Event Handlers //
	////////////////////

	return {

		/**
		 * [show description]
		 * @return {[type]} [description]
		 */
		show: function(name) {
			// render
			_page = render({
				'name': name
			});

			// slide page to view
			app.pageSlider.slidePage($(_page));

			// execute any extra code needed
			setupHandlers();
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

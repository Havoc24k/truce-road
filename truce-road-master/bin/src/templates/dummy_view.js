/**
 * [VIEW_NAME]
 */

app.views.[VIEW_CLASS_NAME] = (function() {
	var _CONTAINER_NAME = '[VIEW_CONTAINER_NAME]';
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
		show: function() {
			// render
			_page = render({});

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

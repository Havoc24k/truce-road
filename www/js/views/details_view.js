/**
 * DetailsView
 */

app.views.detailsView = (function () {
	var _CONTAINER_NAME = 'details-view';
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
		$('.back-to-map').on('click', goBack);
	}

	////////////////////
	//Event Handlers //
	////////////////////

	function goBack(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		window.location.href = "#/";

		return false;
	}

	return {

		/**
		 * [show description]
		 * @return {[type]} [description]
		 */
		show: function () {

			var index = app.registry.getSelectedIndex();
			// render
			_page = render({
				data: {
					"poiData": app.utils.getDetailsByIndex(index)
				}
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
		hide: function () {
			$('#' + _CONTAINER_NAME).empty();
		}
	};
})();
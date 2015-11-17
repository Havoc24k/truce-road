/*global google */
/**
 * MapView
 */

app.views.mapView = (function() {
	var _CONTAINER_NAME = 'map-view';
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

	function CenterControl(controlDiv, map) {

		// Set CSS for the control border.
		var controlUI = document.createElement('div');
		controlUI.style.backgroundColor = '#fff';
		controlUI.style.border = '2px solid #fff';
		controlUI.style.borderRadius = '3px';
		controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		controlUI.style.cursor = 'pointer';
		controlUI.style.marginBottom = '22px';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'Πληροφορίες';
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior.
		var controlText = document.createElement('div');
		controlText.style.color = 'rgb(25,25,25)';
		controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
		controlText.style.fontSize = '16px';
		controlText.style.lineHeight = '38px';
		controlText.style.paddingLeft = '5px';
		controlText.style.paddingRight = '5px';
		controlText.innerHTML = 'Πληροφορίες';
		controlUI.appendChild(controlText);

		controlUI.addEventListener('touchend', function() {
			app.views.headerView.show();
		});
	}

	function _initMap() {
		var markerArray = [];

		// Instantiate a directions service.
		var directionsService = new google.maps.DirectionsService();

		// Create a map and center it on Manhattan.
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {
				lat: 37.883447,
				lng: 21.385127
			},
		});

		// Create the DIV to hold the control and call the CenterControl() constructor
		// passing in this DIV.
		var centerControlDiv = document.createElement('div');
		var centerControl = new CenterControl(centerControlDiv, map);

		centerControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

		// Create a renderer for directions and bind it to the map.
		var directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		});

		// Instantiate an info window to hold step text.
		var stepDisplay = new google.maps.InfoWindow();

		// Display the route between the initial start and end selections.
		calculateAndDisplayRoute(
			directionsDisplay, directionsService, markerArray, stepDisplay, map);
		// Listen to change events from the start and end lists.
		var onChangeHandler = function() {
			calculateAndDisplayRoute(
				directionsDisplay, directionsService, markerArray, stepDisplay, map);
		};
	}

	function calculateAndDisplayRoute(directionsDisplay, directionsService,
		markerArray, stepDisplay, map) {
		// First, remove any existing markers from the map.
		for (var i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}

		// Retrieve the start and end locations and create a DirectionsRequest using
		// WALKING directions.
		directionsService.route({
			// origin: document.getElementById('start').value,
			// destination: document.getElementById('end').value,
			origin: "37.883447,21.385127",
			destination: "37.640531,21.630084",
			travelMode: google.maps.TravelMode.WALKING
		}, function(response, status) {
			// Route the directions and pass the response to a function to create
			// markers for each step.
			if (status === google.maps.DirectionsStatus.OK) {
				// document.getElementById('warnings-panel').innerHTML =
				// 	'<b>' + response.routes[0].warnings + '</b>';
				directionsDisplay.setDirections(response);
				showSteps(response, markerArray, stepDisplay, map);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	function showSteps(directionResult, markerArray, stepDisplay, map) {
		// For each step, place a marker, and add the text to the marker's infowindow.
		// Also attach the marker to an array so we can keep track of it and remove it
		// when calculating new routes.
		var myRoute = directionResult.routes[0].legs[0];
		for (var i = 0; i < myRoute.steps.length; i++) {
			var marker = markerArray[i] = markerArray[i] || new google.maps.Marker();
			marker.setMap(map);
			marker.setPosition(myRoute.steps[i].start_location);
			attachInstructionText(
				stepDisplay, marker, myRoute.steps[i].instructions, map);
		}
	}

	function attachInstructionText(stepDisplay, marker, text, map) {
		google.maps.event.addListener(marker, 'click', function() {
			// Open an info window when the marker is clicked on, containing the text
			// of the step.
			stepDisplay.setContent(text);
			stepDisplay.open(map, marker);
		});
	}

	// function _initMap() {
	// 	var map = new google.maps.Map(document.getElementById('map'), {
	// 		zoom: 11,
	// 		minZoom: 11,
	// 		center: {
	// 			lat: 37.883447,
	// 			lng: 21.385127
	// 		},
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	});

	// 	// Create the DIV to hold the control and call the CenterControl() constructor
	// 	// passing in this DIV.
	// 	var centerControlDiv = document.createElement('div');
	// 	var centerControl = new CenterControl(centerControlDiv, map);

	// 	centerControlDiv.index = 1;
	// 	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


	// 	var flightPlanCoordinates = [{
	// 		lat: 37.883447,
	// 		lng: 21.385127
	// 	}, {
	// 		lat: 37.861520,
	// 		lng: 21.428084
	// 	}, {
	// 		lat: 37.843197,
	// 		lng: 21.457904
	// 	}, {
	// 		lat: 37.806634,
	// 		lng: 21.474716
	// 	}, {
	// 		lat: 37.761802,
	// 		lng: 21.505335
	// 	}, {
	// 		lat: 37.728298,
	// 		lng: 21.536804
	// 	}, {
	// 		lat: 37.674255,
	// 		lng: 21.592420
	// 	}, {
	// 		lat: 37.640531,
	// 		lng: 21.630084
	// 	}];
	// 	var flightPath = new google.maps.Polyline({
	// 		path: flightPlanCoordinates,
	// 		geodesic: true,
	// 		strokeColor: '#FF0000',
	// 		strokeOpacity: 1.0,
	// 		strokeWeight: 2
	// 	});

	// 	flightPath.setMap(map);
	// }

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

			$(document).foundation({});

			if (typeof google === 'undefined') {
				$.ajax({
					url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRYoIGWPfGJdMF94gChqpn4NqecPFqVmM&signed_in=false",
					dataType: "script",
					success: _initMap
				});
			} else {
				_initMap();
			}


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

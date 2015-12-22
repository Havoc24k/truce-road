/*global google */
/**
 * MapView
 */

app.views.mapView = (function () {
	var _CONTAINER_NAME = 'map-view';
	var _page;
	var infoWindow;

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
		controlUI.style.border = '2px solid #009ed6';
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
		controlText.id = "info";
		controlUI.appendChild(controlText);

		/*controlUI.addEventListener('touchend', function () {
			app.views.headerView.show();
		});*/

		/*controlUI.addEventListener('click', function () {
			app.views.headerView.show();
		});*/

		$("#map").on("click", "#info", function(e){
			window.location.href = "#/info";
		});
	}

	function _initMap() {
		var markerArray = [];

		// Instantiate a directions service.
		var directionsService = new google.maps.DirectionsService();

		// Create a map and center it on Manhattan.
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			minZoom: 11,
			center: {
				lat: 37.883447,
				lng: 21.385127
			},
		});

		/*infoWindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});*/

		// Create the DIV to hold the control and call the CenterControl() constructor
		// passing in this DIV.
		var centerControlDiv = document.createElement('div');
		var centerControl = new CenterControl(centerControlDiv, map);

		centerControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

		// Create a renderer for directions and bind it to the map.
		var directionsDisplay = new google.maps.DirectionsRenderer({
			map: map,
			suppressMarkers: true
		});

		// Instantiate an info window to hold step text.
		var stepDisplay = new google.maps.InfoWindow();

		// Display the route between the initial start and end selections.
		calculateAndDisplayRoute(
			directionsDisplay, directionsService, markerArray, stepDisplay, map);
		// Listen to change events from the start and end lists.
		var onChangeHandler = function () {
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

		// WAYPOINTS //
		var _waypoints = [
			{
				location: new google.maps.LatLng(37.665620, 21.614506),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.661544, 21.619828),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.667319, 21.611545),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.662665, 21.617360),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.662223, 21.618690),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.662835, 21.617231),
				stopover: true
			},
			{
				location: new google.maps.LatLng(37.662376, 21.618004),
				stopover: true
			},
			/*{
				location: new google.maps.LatLng(37.662342, 21.618369),
				stopover: true
			},*/
			{
				location: new google.maps.LatLng(37.662317, 21.618279),
				stopover: true
			}
		];

		// Retrieve the start and end locations and create a DirectionsRequest using
		// WALKING directions.
		directionsService.route({
			// origin: document.getElementById('start').value,
			// destination: document.getElementById('end').value,
			origin: "37.640531,21.630084",
			destination: "37.883447,21.385127",
			//waypoints: _waypoints,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.WALKING
		}, function (response, status) {
			// Route the directions and pass the response to a function to create
			// markers for each step.
			if (status === google.maps.DirectionsStatus.OK) {
				// document.getElementById('warnings-panel').innerHTML =
				// 	'<b>' + response.routes[0].warnings + '</b>';
				directionsDisplay.setDirections(response);
				showSteps(response, markerArray, stepDisplay, map, directionsDisplay);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	function showSteps(directionResult, markerArray, stepDisplay, map, directionsDisplay) {
		// For each step, place a marker, and add the text to the marker's infowindow.
		// Also attach the marker to an array so we can keep track of it and remove it
		// when calculating new routes.
		var marker;
		var myRoute = directionResult.routes[0].legs[0];
		window.console.log(myRoute, directionsDisplay);
		/*var startingPoint = myRoute;
		myRoute.steps.unshift(startingPoint);*/
		var contentString;
		for (var i = 0; i < myRoute.steps.length; i++) {
			marker = markerArray[i] || new google.maps.Marker({
				position: myRoute.steps[i].start_point,
				map: map
			});
			//marker.setMap(map);
			marker.setPosition(myRoute.steps[i].start_location);
			attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
			contentString = '<div id="content">' +
				'<p>' + myRoute.steps[i].instructions + '</p>' +
				'<div class="detailLink">' +
				'Περισσότερες πληροφορίες >' +
				'</div>' +
				'</div>';


			var infoWindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 200
			});
			marker.infoObj = infoWindow;
			marker.indexObj = i;
		}

		///////////////////////////////////
		///// ADDING POINT FOR ORIGIN /////
		///////////////////////////////////
		marker = new google.maps.Marker({
			position: {
				lat: 37.640236,
				lng: 21.629419
			},
			label: "T",
			map: map
		});
		attachInstructionText(stepDisplay, marker, myRoute.start_address, map);
		contentString = '<div id="content">' +
			'<p>' + myRoute.start_address + '</p>' +
			'<div class="detailLink">' +
			'Περισσότερες πληροφορίες >' +
			'</div>' +
			'</div>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});
		marker.infoObj = infoWindow;
		marker.indexObj = -1;

		////////////////////////////////////
		/// ADDING POINT FOR DESTINATION ///
		////////////////////////////////////
		marker = new google.maps.Marker({
			position: {
				lat: 37.883447,
				lng: 21.385127
			},
			label: "A",
			map: map
		});
		attachInstructionText(stepDisplay, marker, myRoute.end_address, map);
		contentString = '<div id="content">' +
			'<p>' + myRoute.end_address + '</p>' +
			'<div class="detailLink">' +
			'Περισσότερες πληροφορίες >' +
			'</div>' +
			'</div>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});
		marker.infoObj = infoWindow;
		marker.indexObj = -2;
	}

	function attachInstructionText(stepDisplay, marker, text, map) {
		google.maps.event.addListener(marker, 'click', function () {
			// Open an info window when the marker is clicked on, containing the text
			// of the step.
			//stepDisplay.setContent(text);
			//stepDisplay.open(map, marker);
			window.console.log(marker.indexObj, marker, text);
			marker.infoObj.open(map, marker);
			var result = app.registry.setSelectedIndex(marker.indexObj);

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
	function setupHandlers() {
		$("#map").on("click", ".detailLink", onDetailClick);

	}

	////////////////////
	//Event Handlers //
	////////////////////

	function onDetailClick(e) {
		e.preventDefault();
		window.console.log(app.registry.getSelectedIndex());
		if (app.registry.getSelectedIndex() === null) {
			if (navigator.notification === undefined) {
				alert("Δεν βρέθηκαν λεπτομέριες.");
				return false;
			} else {
				navigator.notification.alert("Δέν βρέθηκαν λεπτομέριες.", null, "Ενημέρωση", "OK");
			}

		} else {
			window.location.href = "#/detailsView";

			return false;
		}
	}

	return {

		/**
		 * [show description]
		 * @return {[type]} [description]
		 */
		show: function () {
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
		hide: function () {
			$('#' + _CONTAINER_NAME).empty();
		}
	};
})();
// This example creates a 2-pixel-wide red polyline showing the path of William
// Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
// Brisbane, Australia.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    minZoom: 11,
    center: {
      lat: 37.883447,
      lng: 21.385127
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var flightPlanCoordinates = [{
    lat: 37.883447,
    lng: 21.385127
  }, {
    lat: 37.861520,
    lng: 21.428084
  }, {
    lat: 37.843197,
    lng: 21.457904
  }, {
    lat: 37.806634,
    lng: 21.474716
  }, {
    lat: 37.761802,
    lng: 21.505335
  }, {
    lat: 37.728298,
    lng: 21.536804
  }, {
    lat: 37.674255,
    lng: 21.592420
  }, {
    lat: 37.640531,
    lng: 21.630084
  }];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

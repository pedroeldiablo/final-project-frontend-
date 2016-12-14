angular.module('finalProject')
.directive('googleRoute', googleRoute);

googleRoute.$inject = ['$window'];
function googleRoute($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-route">Google route here!</div>',

    stops: '='
  },
  link: function($scope, element) {
    $scope.$watch('data', () => {
      const map = new   $window.google.maps.Map(element[0], {
        center: {lat: $scope.data[0].lat, lng: $scope.data[0].lng},
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        scrollwheel: false
      });
    scope: {
      stops: '='
    },
    });
    $scope.$watch('stops', () => {
    link: function($scope, element) {
      $scope.$watch('stops', () => {
      const map = new $window.google.maps.Map(element[0], {
        center: { lat:$scope.stops[0].lat, lng: $scope.stops[0].lng},
        zoom: 15,
        scrollwheel: false,
        minZoom: 3
      });

      const run = new $window.google.maps.Polyline({
        path: $scope.data,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      const directionsService = new $window.google.maps.DirectionsService;
      const directionsDisplay = new $window.google.maps.DirectionsRenderer;
      const infowindow = new $window.google.maps.InfoWindow();

          // const marker = new $window.google.maps.Marker({
          //   position: latLng,
          //   map: map
          // });
          //
          // marker.addListener('click', () => {
          //   infowindow.close();
          //   infowindow.setContent(`<h6 class="infoWindowText">${$scope.stop.purpose}</h6><img src="${$scope.stop.image}" class="infoWindowImg"><a href="#/stops/${$scope.stop.id}">See more about this stop</a><a href="#/users/${$scope.stop.user.id}">See more about this user</a>
          //   `);
          //
          //   infowindow.open(map, marker);

        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      angular.module('finalProject')
  .directive('googleMap', googleMap);




        const run = new $window.google.maps.Polyline({
          path: $scope.data,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        run.setMap(map);
      });
    }
  };
}

angular.module('finalProject')
.directive('googleRoute', googleRoute);

googleRoute.$inject = ['$window'];
function googleRoute($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-route"></div>',
    scope: {
      walk: '='
    },
    link: function($scope, element) {

      let markers = [];
      let waypoints = [];

      const map = new $window.google.maps.Map(element[0], {
        center: { lat: $scope.walk.stops[0].place.lat, lng: $scope.walk.stops[0].place.lng},
        zoom: 15,
        scrollwheel: false,
        minZoom: 3,
        styles: [
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'saturation': 36
              },
              {
                'color': '#000000'
              },
              {
                'lightness': 40
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'color': '#000000'
              },
              {
                'lightness': 16
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 20
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 17
              },
              {
                'weight': 1.2
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 20
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 21
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 17
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 29
              },
              {
                'weight': 0.2
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 18
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 16
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 19
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 17
              }
            ]
          }
        ]

      });

      const directionsService = new $window.google.maps.DirectionsService;
      const directionsDisplay = new $window.google.maps.DirectionsRenderer;

      directionsDisplay.setMap(map);

      markers = $scope.walk.stops.map((stop) => {
        return new $window.google.maps.Marker({
          position: { lat: stop.place.lat, lng: stop.place.lng },
          map: map
        });
      });

      waypoints = markers.map((marker) => {
        return {
          location: marker.getPosition(),
          stopover: true
        };
      });

      waypoints.splice(0,1);
      waypoints.splice(-1,1);

      directionsService.route({
        origin: markers[0].getPosition(),
        destination: markers[markers.length-1].getPosition(),
        waypoints: waypoints,
        travelMode: 'WALKING'
      }, (response, status) => {
        if(status === 'OK') {
          directionsDisplay.setDirections(response);
        }
      });
    }
  };
}

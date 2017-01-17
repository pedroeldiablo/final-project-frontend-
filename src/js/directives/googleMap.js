angular.module('finalProject')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google map here!</div>',
    scope: {
      stop: '='
    },
    link: function($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        center: { lat: 51.474191, lng: -0.0713257 },
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

      const infowindow = new $window.google.maps.InfoWindow();

      $scope.$watch('stop.$resolved', () => {
        if($scope.stop.place) {
          const latLng = {
            lat: $scope.stop.place.lat,
            lng: $scope.stop.place.lng
          };

          const marker = new $window.google.maps.Marker({
            position: latLng,
            map: map
          });

          marker.addListener('click', () => {
            infowindow.close();
            infowindow.setContent(`<h6 class="infoWindowText">${$scope.stop.purpose}</h6><img src="${$scope.stop.image}" class="infoWindowImg"><a href="#/stops/${$scope.stop.id}">See more about this stop</a><a href="#/users/${$scope.stop.user.id}">See more about this user</a>
        `);

            infowindow.open(map, marker);

          });

          map.setCenter(latLng);
        }
      });
      map.addListener('resize', function() {
        var latLng = map.getCenter();
        map.event.trigger(map, 'resize');
        map.setCenter(latLng);
      });

    }
  };
}

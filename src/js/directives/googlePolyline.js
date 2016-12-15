// angular.module('finalProject')
//   .directive('googlePolyline', googlePolyline);
//
// googlePolyline.$inject = ['$window'];
// function googlePolyline($window) {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-polyline"></div>',
//     scope: {
//       walk: '='
//     },
//     link: function($scope, element) {
//       $scope.$watch('walk', () => {
//         const map = new   $window.google.maps.Map(element[0], {
//           center: {lat: $scope.walk.stop[0].lat, lng: $scope.walk.stop[0].lng},
//           zoom: 14,
//           disableDefaultUI: true,
//           zoomControl: true,
//           scaleControl: true,
//           scrollwheel: false
//         });
//
//         const walk = new $window.google.maps.Polyline({
//           path: $scope.walk,
//           geodesic: true,
//           strokeColor: '#FF0000',
//           strokeOpacity: 1.0,
//           strokeWeight: 2
//         });
//
//         walk.setMap(map);
//       });
//     }
//   };
// }

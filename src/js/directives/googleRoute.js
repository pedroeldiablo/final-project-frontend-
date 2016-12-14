// angular.module('finalProject')
// .directive('googleRoute', googleRoute);
//
// googleRoute.$inject = ['$window'];
// function googleRoute($window) {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-route">Google route here!</div>',
//     scope: {
//       stop: '='
//     },
//     link: function($scope, element) {
//
//       const map = new $window.google.maps.Map(element[0], {
//         center: { lat: 51.474191, lng: -0.0713257 },
//         zoom: 15,
//         scrollwheel: false,
//         minZoom: 3
//       });
//
//       const infowindow = new $window.google.maps.InfoWindow();
//
//       function addStops(stops) {
//         stops.forEach((stop) => {
//           const latLng = {
//             lat: $scope.stop.place.lat,
//             lng: $scope.stop.place.lng
//           };
//
//           const marker = new $window.google.maps.Marker({
//             position: latLng,
//             map: map
//           });
//
//           marker.addListener('click', () => {
//             infowindow.close();
//             infowindow.setContent(`<h6 class="infoWindowText">${$scope.stop.purpose}</h6><img src="${$scope.stop.image}" class="infoWindowImg"><a href="#/stops/${$scope.stop.id}">See more about this stop</a><a href="#/users/${$scope.stop.user.id}">See more about this user</a>
//             `);
//
//             infowindow.open(map, marker);
//
//           });
//         });
//       }
//     }
//   };
// }

angular.module('finalProject')
.directive('googlePlace', googlePlace);

googlePlace.$inject = ['$window'];

function googlePlace($window) {
  return {
    restrict: 'A',
    scope: {
      stop: '='
    },
    link: function($scope, element) {
      const options = {
        types: [],
        componentRestrictions: { country: 'GB' }
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latLng = place.geometry.location.toJSON();


        $scope.stop.lat = latLng.lat;
        $scope.stop.lng = latLng.lng;
        $scope.stop.google_place_id = place.place_id;
        $scope.stop.place_name = place.name;
        // $scope.place.rating = place.rating;
        // $scope.place.website = place.website;

        $scope.$apply();
      });
    }
  };
}

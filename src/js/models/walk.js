angular.module('finalProject')
  .factory('Walk', Walk);

Walk.$inject = ['$resource', 'API_URL'];
function Walk($resource, API_URL) {
  return new $resource(`${API_URL}/walks/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

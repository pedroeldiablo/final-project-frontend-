angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('walksIndex', {
      url: '/walks',
      templateUrl: '/templates/walksIndex.html',
      controller: 'WalksIndexController as walksIndex'
    })
    .state('walksNew', {
      url: '/walks/new',
      templateUrl: '/templates/walksNew.html',
      controller: 'WalksNewController as walksNew'
    })
    .state('walksShow', {
      url: '/walks/:id',
      templateUrl: '/templates/walksShow.html',
      controller: 'WalksShowController as walksShow'
    })
    .state('walksEdit', {
      url: '/walks/:id/edit',
      templateUrl: '/templates/walksEdit.html',
      controller: 'WalksEditController as walksEdit'
    })
    .state('stopsIndex', {
      url: '/stops',
      templateUrl: '/templates/stopsIndex.html',
      controller: 'StopsIndexController as stopsIndex'
    })
    .state('stopsNew', {
      url: '/stops/new',
      templateUrl: '/templates/stopsNew.html',
      controller: 'StopsNewController as stopsNew'
    })
    .state('stopsShow', {
      url: '/stops/:id',
      templateUrl: '/templates/stopsShow.html',
      controller: 'StopsShowController as stopsShow'
    })
    .state('stopsEdit', {
      url: '/stops/:id/edit',
      templateUrl: '/templates/stopsEdit.html',
      controller: 'StopsEditController as stopsEdit'
    });


  $urlRouterProvider.otherwise('/users');
}

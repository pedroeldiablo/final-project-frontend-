angular.module('finalProject')
  .controller( 'MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'User'];
function MainController($auth, $state, $rootScope, User) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('login');
      });
  }

  const protectedStates = ['usersEdit','usersIndex', 'usersShow', 'stopsNew', 'placesNew', 'walksNew', 'walksEdit', 'stopsEdit', 'walksEdit'];

  function secureState(e, toState, toParams) {
    main.message = null;
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there';
    }
  }

  if ($auth.isAuthenticated()) {
    const userId = $auth.getPayload().id;
    main.currentUser = User.get({id: userId});
  }
  $rootScope.$on('$stateChangeStart', secureState);

  main.menuVisible = false;

  function toggleMenu() {
    console.log('clicked');
    main.menuVisible = main.menuVisible ? false : true;
  }

  main.toggleMenu = toggleMenu;
  main.logout = logout;
}

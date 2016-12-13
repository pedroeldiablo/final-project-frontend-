angular.module('finalProject')
  .controller('WalksIndexController', WalksIndexController)
  .controller('WalksShowController', WalksShowController)
  .controller('WalksEditController', WalksEditController)
  .controller('WalksNewController', WalksNewController);


// SHOW ALL WALKS
WalksIndexController.$inject = ['Walk'];
function WalksIndexController(Walk) {
  const walksIndex = this;

  walksIndex.queryString = '';

  function filter(walk) {
    const regex = new RegExp(walksIndex.queryString, 'i');
    // const stopNames = walk.stops.map((stop) => {
    //   return stop.name;
    // }).join(', ');
    return regex.test(walk.name) || regex.test(walk.description)||regex.test(walk.user.username);

    // return regex.test(walk.name) || regex.test(walk.description)||regex.test(walk.user.username) ||regex.test(stopNames);
  }

  walksIndex.filter = filter;
  walksIndex.all = Walk.query();
}



// SHOW AN INDIVIDUAL WALK
WalksShowController.$inject = ['Walk', '$state', '$auth'];
function WalksShowController(Walk, $state, $auth) {
  const walksShow = this;

  walksShow.walk = Walk.get($state.params);

  function deleteWalk() {
    walksShow.walk.$remove(() => {
      $state.go('walksIndex');
    });
  }

  walksShow.delete = deleteWalk;
  walksShow.isLoggedIn = $auth.isAuthenicated;

}

//CREATE NEW WALK
WalksNewController.$inject = ['Walk', '$state'];
function WalksNewController(Walk, $state) {
  const walksNew = this;
  walksNew.walk = {};
  function create() {
    Walk.save(walksNew.walk, (walk) => {
      $state.go('walksShow', { id: walk.id });
    });
  }
  walksNew.create = create;
}

//EDIT A WALK
WalksEditController.$inject = ['Walk', '$state'];
function WalksEditController(Walk, $state) {
  const walksEdit = this;

  walksEdit.walk = Walk.get($state.params);

  function update() {
    walksEdit.walk.$update(() => {
      $state.go('walksShow', $state.params);
    });
  }

  this.update = update;

}

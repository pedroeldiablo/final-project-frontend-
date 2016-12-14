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
WalksShowController.$inject = ['Walk', 'Stop', '$state', '$auth'];
function WalksShowController(Walk, Stop, $state, $auth) {
  const walksShow = this;
  walksShow.formVisible = false;
  // walksShow.formEditVisible = false;


  walksShow.walk = Walk.get($state.params);

  //ADD STOP CONTROLLER
  walksShow.newStop = {};

  function showCreateForm() {
    walksShow.formVisible = true;
  }

  function hideCreateForm() {
    walksShow.formVisible = false;
    walksShow.newStop = {};
  }

  walksShow.showCreateForm = showCreateForm;
  walksShow.hideCreateForm = hideCreateForm;

  // StopsNewController.$inject = ['Stop', '$state'];
  // function StopsNewController(Stop, $state) {
  //   const stopsNew = this;
  //   stopsNew.stop = {};
  //   function create() {
  //     Stop.save(stopsNew.stop, (stop) => {
  //       $state.go('stopsShow', { id: stop.id });
  //     });
  //   }
  //   stopsNew.create = create;
  // }

  // CREATE STOP
  // function createStop() {
  //   Stop.save({ walk_id: $state.params.id }, walksShow.newStop, () => {
  //     walksShow.stop = {};
  //     hideCreateForm();
  //     walksShow.walk = Walk.get($state.params);
  //   });

  function createStop() {
    Stop.save({ walks: $state.params.id }, walksShow.newStop, () => {
      walksShow.stop = {};
      hideCreateForm();
      walksShow.walk = Walk.get($state.params);
    });
  }

  walksShow.createStop = createStop;


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

angular.module('finalProject')
  .controller('StopsIndexController', StopsIndexController)
  .controller('StopsShowController', StopsShowController)
  .controller('StopsEditController', StopsEditController)
  .controller('StopsNewController', StopsNewController);


// SHOW ALL STOPS
StopsIndexController.$inject = ['Stop'];
function StopsIndexController(Stop) {
  const stopsIndex = this;

  stopsIndex.all = Stop.query();
}

// SHOW AN INDIVIDUAL STOP
StopsShowController.$inject = ['Stop', '$state', '$auth'];
function StopsShowController(Stop, $state, $auth) {
  const stopsShow = this;

  stopsShow.stop = Stop.get($state.params);

  function deleteStop() {
    stopsShow.stop.$remove(() => {
      $state.go('stopsIndex');
    });
  }

  stopsShow.delete = deleteStop;
  stopsShow.isLoggedIn = $auth.isAuthenicated;

}

//CREATE NEW STOP
StopsNewController.$inject = ['Stop', '$state'];
function StopsNewController(Stop, $state) {
  const stopsNew = this;
  stopsNew.stop = {};
  function create() {
    Stop.save(stopsNew.stop, (stop) => {
      $state.go('stopsShow', { id: stop.id });
    });
  }
  stopsNew.create = create;
}

//EDIT A STOP
StopsEditController.$inject = ['Stop', '$state'];
function StopsEditController(Stop, $state) {
  const stopsEdit = this;

  stopsEdit.stop = Stop.get($state.params);

  function update() {
    stopsEdit.stop.$update(() => {
      $state.go('stopsShow', $state.params);
    });
  }

  this.update = update;

}

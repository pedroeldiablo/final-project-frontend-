angular.module('finalProject')
  .controller('WalksIndexController', WalksIndexController)
  // .controller('WalksFollowingController', WalksFollowingController)
  .controller('WalksNewController', WalksNewController)
  .controller('WalksShowController', WalksShowController)
  .controller('WalksEditController', WalksEditController);
  // .controller('UserWalksController', UserWalksController);



// SHOW ALL WALKS
WalksIndexController.$inject = ['Walk'];
function WalksIndexController(Walk) {
  const walksIndex = this;

  walksIndex.queryString = '';

  function filter(walk) {
    const regex = new RegExp(walksIndex.queryString, 'i');
    return regex.test(walk.name) || regex.test(walk.description)||regex.test(walk.user.username);
  }

  walksIndex.filter = filter;
  walksIndex.all = Walk.query();
}

// SHOW AN INDIVIDUAL WALK
WalksShowController.$inject = ['Walk', 'Stop', '$state', '$auth'];
function WalksShowController(Walk, Stop, $state, $auth) {
  const walksShow = this;
  walksShow.formVisible = false;

  // function isCurrentUser() {
  //   return $auth.getPayload().id === Number($state.params.id);
  // }
  //
  // walksShow.isCurrentUser = isCurrentUser;

  function deleteWalk() {
    walksShow.walk.$remove(() => {
      $state.go('walksIndex');
    });
  }


  walksShow.isLoggedIn = $auth.isAuthenicated;




  walksShow.walk = Walk.get($state.params);
  console.log(walksShow.walk);
  // console.log(walksShow.walk.user.user_id);

  //ADD STOP CONTROLLER
  walksShow.newStop = {
    walk_id: $state.params.id
  };

  function showCreateForm() {
    walksShow.formVisible = true;
  }

  function hideCreateForm() {
    walksShow.formVisible = false;
    walksShow.newStop = {};
  }

  walksShow.showCreateForm = showCreateForm;
  walksShow.hideCreateForm = hideCreateForm;

  function createStop() {
    walksShow.newStop.walk_id = $state.params.id;
    console.log('passing in: ', $state.params.id, walksShow.newStop );

    Stop.save(walksShow.newStop, () => {
      walksShow.stop = {};
      hideCreateForm();
      walksShow.walk = Walk.get($state.params);
    });
  }

  // EDIT STOP CONTROLLER
  function showEditForm(stop) {
    walksShow.formEditVisible = true;
    walksShow.currentStop = stop;
    walksShow.stopContentVisible = false;
  }

  function hideEditForm() {
    walksShow.formEditVisible = false;
  }

  function hideStopContent() {
    walksShow.stopContentVisible = false;
  }

  function showStop(stop) {
    console.log('clicked!', stop);
    showEditForm(stop);
  }

  // function deleteStop(stop) {
  //   console.log('delete me', stop);
  //   Stop.remove({ id: stop._id, walkId: $state.params.id }, () => {
  //     $state.reload();
  //     $state.go('walksShow', { id: walk._id });
  //   });
  // }

  function deleteStop(stop) {
    console.log('delete me', stop);
    Stop.remove({ id: stop.id}, () => {
      $state.reload();
      // $state.go('walksShow', { id: walk._id });
    });
  }

  // function deleteStop() {
  //   walksShow.stop.$remove(() => {
  //     $state.go('stopsIndex');
  //   });
  // }

  walksShow.deleteStop = deleteStop;

  // UPDATE WALK CONTROLLER WITH EDIT STOP
  function updateWalk(updatedStop) {
    Stop.update({ id: updatedStop._id, walkId: $state.params.id }, updatedStop);
  }



  // FOLLOW WALK
  // function followWalk() {
  //   walksShow.walk.followedBy.push(userId);
  //
  //   walksShow.walk.$update((walk) => {
  //     console.log('succes, followed walk:', walk);
  //     walksShow.following = true;
  //   });
  // }

  // UN-FOLLOW WALK
  // function unfollowWalk() {
  //   const index = walksShow.walk.followedBy.indexOf(userId);
  //   walksShow.walk.followedBy.splice(index,1);
  //
  //   walksShow.walk.$update((walk) => {
  //     console.log('succes, unfollowed walk:', walk);
  //     walksShow.following = false;
  //   });
  // }

  // walksShow.unfollowWalk = unfollowWalk;
  // walksShow.followWalk = followWalk;
  walksShow.delete = deleteWalk;
  walksShow.updateWalk = updateWalk;
  walksShow.showEditForm = showEditForm;
  walksShow.hideEditForm = hideEditForm;
  walksShow.createStop = createStop;
  walksShow.showStop = showStop;
  // walksShow.showStopContent = showStopContent;
  // walksShow.hideStopContent = hideStopContent;


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

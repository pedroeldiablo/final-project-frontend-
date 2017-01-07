#Journal Maps Front End

##Angular and Google Maps

###Start Journaling [Here](https://journal-maps.herokuapp.com/#/login).

Register, Login and Explore.

##Overview



##Project Aims

Starting from a real world experience of having travelled to Barcelona and stayed at an AirBnB


##Technology Used

AngularJS, Google Maps API and Geometry, Places and Directions Libraries, Bower.  

##Feedback and Evaluation

With the site built primarily around the idea of mapping walks this called for a number of

##Challenges

The main aim of the site is to allow users to map walks, and so accurately creating a walk between stops that is physically possible was important. One early attempt at tackling this was looking at Polylines. This however resulted in the shortest direct line between two points ignoring barriers such as buildings and railways. Switching to a Directions directive taking walking as the travelMode resolved this.

As new stops are added to the walk or stops removed it was important that the maps and routes update, so this had to be considered within the directives were structured.

Creating an array and then splicing it to remove the first and last stops which became the start and end points for the route. The remaining stops were then the waypoints of the walk.

```javascript
directionsService.route({
  origin: markers[0].getPosition(),
  destination: markers[markers.length-1].getPosition(),
  waypoints: waypoints,
  travelMode: 'WALKING'
}, (response, status) => {
  if(status === 'OK') {
    directionsDisplay.setDirections(response);
  }
});
```
##Where to From Here?

In the current state, while it is possible to delete and edit stop that already exist within a walk it isn't possible to amend the order of the stops. Adding this option would make the site considerably more practical. Similarly it would be helpful to be able to stops to another walk. Once these aspects are achieved I would like to develop the social component more, so that users for example could share a walk. It would also be a nice addition to be able to search for existing stops on a map within a geographic area, this would allow users to be inspired by searching what's around. Showing the stops within a boundary and adding a filter to narrow these by type of attraction being one approach that might be possible for this.

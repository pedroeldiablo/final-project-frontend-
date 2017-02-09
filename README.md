#Journal Maps Front End

##Angular and Google Maps

###Start Journaling [Here](https://journal-maps.herokuapp.com/#/login).

Become an urban explorer. Discover cities like never before.

##Overview

Starting from a personal experience I decided to develop a personalised map making application.

The genesis of the idea came from having travelled to Barcelona and stayed at an AirBnB.

On asking the host for recommendations for restaurants, cafes and bars in the area I was presented with a city map and stack of business cards. The host then drew Xs, circles, arrows and add notes all over the map, which I then photographed so that I could carry it around with me more easily.

It struck me that there must be a better way for making personal recommendations of this sort, particularly tying them together into walks, so that for example if you have family staying, or in this case AirBnB guests, you can put together recommendations of the sort that really speaks of an area and local knowledge.

![alt text](//images/Barcelona-map.jpg "Map of Barcelona with recommendations")

##Project Aims

The App needed to allow for the following things.

* For there to be unique users

* For these users to be able to add places of interest, or stops to the site.

* For these stops to contain some information, such as who created them, searchable text such as an address, the name and purpose of the stop, and ideally a visual element such as a photo, gif or video.

* For the user to be able to connect these stops so that they formed a walk.

* For there to be a map of the stop and the walk.

* For these elements to be editable, but for there to be limitations, such as only the original user being able to edit the walks description.


##Technology Used

AngularJS, Google Maps API and Geometry, Places and Directions Libraries, Bower.  

##Approach and Challenges

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

In the current state, while it is possible to delete and edit stop that already exist within a walk it isn't possible to amend the order of the stops. Adding this option would make the site considerably more practical.

Similarly it would be helpful to be able to copy stops to another walk.

Once these aspects are achieved I would like to develop the social component more, so that users for example could share a walk, as this was within the original idea.

It would also be a nice addition to be able to search for existing stops on a map within a geographic area, this would allow users to be inspired by searching what's around. Showing the stops within a boundary and adding a filter to narrow these by type of attraction being one approach that might be possible for this.

Populating the site. The biggest challenge to making this project successful would be encouraging people to create an initial library of walks and stops. One approach to tackling this would be to target businesses, and have them create walks within their areas. There is a natural incentive for them in that they get to promote themselves, but would also be adding details and character about their area.

It would also be practical to add a feature for events, so that for example a design festival could list all the locations that will feature and then allow attendees to search and create personalised routes for exploring.  

A sub strand was to allow users to keep a diary of personal walks, this is reflected in the choice of title for the project. This would encourage more regular usage as users could keep a personal and more intimate list of places that they visit along with private thoughts.

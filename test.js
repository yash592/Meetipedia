// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">





// var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=pasadena&expand=organizer,venue&token=ZHYMXVXF44JLXPWWBSYQ";
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).done(function(response) {

//       // Printing the entire object to console
//       console.log(response);
//      console.log(response.events[0].venue.address.latitude);
//      console.log(response.events[0].venue.address.longitude);

//      var lat = response.events[0].venue.address.latitude; 
//      var long = response.events[0].venue.address.longitude;
//      eventLocation = (lat + "," + long);


//      console.log(eventLocation);



//     });


 
  // <!-- 34.063905, -118.446836 -->

 // This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var eventLocation;
var latitudeArray = [];
var longitudeArray = [];
var parkingArray = [];
// Setting up the map and hardcoding LA neighborhoods as lat and long

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};

  var Westwood = {lat: 34.063 , lng: -118.446};

  var WoodlandHills = {lat: 34.177395, lng: -118.601543};

  var Pasadena = {lat: 34.140840, lng: -118.126073};

  var SantaMonica = {lat: 34.026365, lng: -118.483078};

  // grabbing the above varviables and displaying it on the map div

  map = new google.maps.Map(document.getElementById('map'), {
    center: SantaMonica,
    map.setZoom(11),
  });

  // Looking for restaurants, stripclubs ( ͡° ͜ʖ ͡°) once the event is done 

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: SantaMonica,
    radius: 10000,
    type: ['restaurant'],
  }, callback);

  // 34.062542, -118.443982

    // getting the events for Pasadena from Eventbrite and trying to set the 2nd location as a marker

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=SantaMonica&expand=organizer,venue&token=ZHYMXVXF44JLXPWWBSYQ";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      for (var i = 0; i < (response.events[i].venue.address.latitude).length; i ++) {
         
         var latitudes = response.events[i].venue.address.latitude;
         latitudeArray.push(latitudes);         

      };

      for (var i = 0; i < (response.events[i].venue.address.longitude).length; i ++) {
         
         var longitudes = response.events[i].venue.address.longitude;
         longitudeArray.push(longitudes);         

      };

          var locations = []
          for (var i = 0; i < longitudeArray.length; i++) {
          locations[i] = [latitudeArray[i],longitudeArray[i]];
    };

     console.log(locations);

      // Printing the entire object to console
    console.log(response);
     console.log(response.events[2].venue.address.latitude);
     console.log(response.events[2].venue.address.longitude);

     var lat = response.events[2].venue.address.latitude; 
     var long = response.events[2].venue.address.longitude;
     eventLocation = ("(" + lat + "," + long + ")");

     // trying to log the lat,long of the eventlocation
     console.log(eventLocation); 

     console.log(latitudeArray);

     console.log(longitudeArray);

     

  for (var i = 0; i < locations.length; i ++) {

     var marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][0], locations[i][1]),
    title:"Hello World!",
    // animation: google.maps.Animation.DROP,
     icon: 'https://i.imgur.com/NEkcQ9x.png',
});

  marker.setMap(map);


  };

//   var marker = new google.maps.Marker({
//     position: myLatlng,
//     title:"Hello World!",
//     icon: 'https://cdn3.iconfinder.com/data/icons/map/500/restaurant-512.png',
// });

//   marker.setMap(map);

console.log(parkingArray);

    });

    // setting up markers for parking
 


    
  var parkingURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:34.147859,-118.144506&start_time=2015-11-22T16:35:28-06:00&end_time=2015-11-22T19:35:44-06:00"
  $.ajax({
    url: parkingURL,
    method: "GET"
    }).done(function(parkingresponse){

      console.log(parkingURL);
      console.log(parkingresponse);
    
    // var response = response.lat;
    // var response = response.lng;

    });
  


     
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: 'https://i.imgur.com/jCy5Hqs.png',

    // 'https://i.imgur.com/x6QIsXH.png',
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


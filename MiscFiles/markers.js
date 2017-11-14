// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var eventLocation;

// // var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=pasadena&expand=venue&token=ZHYMXVXF44JLXPWWBSYQ";
// //     $.ajax({
// //       url: queryURL,
// //       method: "GET"
// //     }).done(function(response) {

// //       // Printing the entire object to console
// //       console.log(response);
// //      console.log(response.events[0].venue.address.latitude);
// //      console.log(response.events[0].venue.address.longitude);

// //      var lat = response.events[0].venue.address.latitude; 
// //      var long = response.events[0].venue.address.longitude;
// //      eventLocation = (lat + "," + long);

var latitude = [];
var longitude = [];




//     });

  function initMap() {
         	

       var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=pasadena&expand=venue&token=ZHYMXVXF44JLXPWWBSYQ";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {



      // Printing the entire object to console
     // console.log(response);
     // console.log(response.events[0].venue.address.latitude);
     // console.log(response.events[0].venue.address.longitude);

     // var lat = response.events[0].venue.address.latitude; 
     // var long = response.events[0].venue.address.longitude;
     // eventLocation = (lat + "," + long);
     // console.log(lat,long);



     // function getlocation(){
 for (i = 0; i < (response.events[i].venue.address.latitude).length; i++) {
     var latitudes = response.events[i].venue.address.latitude;
     
     console.log(latitudes);
 
  latitude.push(latitudes[i]);
      
      console.log(latitudes);
    
     }
    
  
     

     for (i = 0; i < (response.events[i].venue.address.longitude).length; i++) {
     var longitudes = response.events[i].venue.address.longitude;
     // console.log(longitudes);

     var eventLocation = (latitudes[i], longitudes[i]);
     
     console.log(eventLocation);

    

     }

     // }
       // getlocation();


    


    });
};
    //var myLatLng = {lat: parseFloat(lat), lng: parseFloat(long)};

//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: myLatLng
//         });

//         var marker = new google.maps.Marker({
//           position: myLatLng,
//           map: map,
//           title: 'Hello World!'
//         });

      
//     });
// };
        



    

// function initMap() {
//   var pyrmont = {lat: -33.867, lng: 151.195};
//   var Westwood = {lat: 34.063 , lng: -118.446};
  
//   // <!-- 34.063905, -118.446836 -->


//   map = new google.maps.Map(document.getElementById('map'), {
//     center: Westwood,
//     zoom: 18
//   });

//   infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch({
//     location: Westwood,
//     radius: 500,
//   }, callback);
// }

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// var myLatlng = new google.maps.LatLng(eventLocation);
// var mapOptions = {
//   zoom: 4,
//   center: location
// }
// var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// var marker = new google.maps.Marker({
//     position: eventLocation,
//     title:"Hello World!"
// });

// // To add the marker to the map, call setMap();
// marker.setMap(map);
// setting up global variables

var map;
var infowindow;
var eventLocation;
var latitudeArray = [];
var longitudeArray = [];
var parkingLongitudeArray = [];
var parkingLatitudeArray =[];

var contentArr = [];
var parkingInfoArray = [];

var getNeighborhood = localStorage.getItem("neighborhood");
console.log(getNeighborhood);

var neighborhoodlc = (getNeighborhood).trim().toLowerCase();
console.log(neighborhoodlc);

var neighborhood = neighborhoodlc.replace(" ", "");
console.log(neighborhood);

var pasadena = ["34.147859" , "-118.144506"];
// console.log(pasadenaparking[0]);


// Setting up the map and hardcoding LA neighborhoods as lat and long

function initMap() {

  var mapareas = {

  hollywood: {lat:34.095313, lng:-118.332143},

  woodlandhills: {lat: 34.177395, lng: -118.601543},

  pasadena: {lat: 34.140840, lng: -118.126073},

  santamonica: {lat: 34.026365, lng: -118.483078},


  }

  console.log(mapareas[neighborhood]);

  

  // grabbing the above variables and displaying it on the map div

  map = new google.maps.Map(document.getElementById('map'), {
    center: mapareas[neighborhood],
    zoom: 15,
  });

  // Looking for restaurants, stripclubs ( ͡° ͜ʖ ͡°) once the event is done 

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: mapareas[neighborhood],
    radius: 5000,
    type: ['restaurant'],
  }, callback);

  // getting restaurants through google places.

  function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    };
  };
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'assets/images/restaurant.png',

    // 'https://i.imgur.com/x6QIsXH.png',
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
};


  var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + neighborhood + "&expand=organizer,venue&token=ZHYMXVXF44JLXPWWBSYQ";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	console.log(response);

    	// setting up for loop for locations, infowindows and markers

    	for (var i = 0; i < response.events.length; i++) {

			var latitudes = response.events[i].venue.address.latitude;
			
			var longitudes = response.events[i].venue.address.longitude;
			
			// setting up the markers for the EventBrite events.

			

			 

			 var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + response.events[i].name.html + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + response.events[i].description.text + '</p>' + 
            // '<img src=' + response.events[i].organizer.logo.url + '>' + 
            '<p>Link: <a href='+ response.events[i].url + 'target=_blank' + '>'+
            response.events[i].url + '</a> '+
            '</p>'+
            '</div>'+
            '</div>';

            // console.log(contentString);                 

            

            var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400          

             
        });

            var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitudes, longitudes),    
			icon: 'assets/images/meetup.png',
			map: map,
			html: contentString
			// title: response.events[i].name.html

		});

            marker.setMap(map);

          marker.addListener('click', function() {
            infowindow.close();
          infowindow.setContent(this.html);
          infowindow.open(map, this);

        });

            // console.log(infowindow);

           


            

            // console.log(infowindow);           

          

    		


    	} // first for loop closes here

    	// console.log(contentArr);


    	    


    }); // response done closes here

    

    // Parkwhiz API starts here

    console.log(mapareas[neighborhood]);

    // var parkingURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:34.147859,-118.144506&start_time=2015-11-22T16:35:28-06:00&end_time=2015-11-22T19:35:44-06:00"

    var parkingURL = "https://api.parkwhiz.com/v4/quotes/?q=coordinates:" + mapareas[neighborhood].lat + "," + mapareas[neighborhood].lng + "&start_time=2015-11-22T16:35:28-06:00&end_time=2015-11-22T19:35:44-06:00"
  $.ajax({
    url: parkingURL,
    method: "GET"
    }).done(function(parkingresponse) {
    	console.log(parkingresponse);
    	// console.log(parkingresponse[0].location_id);+

    	

    	var myinfowindow = new google.maps.InfoWindow();

    	// looping over the parkingresponse array and placing markers on the map

    	for (var i = 0; i < parkingresponse.length; i++) {

    		var parkingLatitude = parkingresponse[i]._embedded["pw:location"].entrances[0].coordinates[0];

    		var parkingLongitude = parkingresponse[i]._embedded["pw:location"].entrances[0].coordinates[1];

    		var infoWindowContent = parkingresponse[i].purchase_options["0"].price.USD;

    		parkingInfoArray.push(infoWindowContent);
    		// console.log(parkingLatitude);

    		// console.log(parkingLongitude);

        var parkingContentString = '<div id="parkingcontent">'+
            '<div id="parkingNotice">'+
            '</div>'+
            '<h1 id="parkingHeading" class="parkingHeading">' + parkingresponse[i]._embedded["pw:location"].name + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + parkingresponse[i]._embedded["pw:location"].address1+ '</p>' + 
            // '<img src=' + response.events[i].organizer.logo.url + '>' + 
            '<p>$' + parkingresponse[i].purchase_options["0"].price.USD +
            '</p>'+
            '</div>'+
            '</div>';


    		var parkinginfowindow = new google.maps.InfoWindow({
            content: parkingContentString,
            maxWidth: 400 

          });



            var parkingmarker = new google.maps.Marker({
            position: new google.maps.LatLng(parkingLatitude, parkingLongitude),    
            icon: 'assets/images/parking.png',
            map: map,
            html: parkingContentString

          });

            parkingmarker.setMap(map);

          parkingmarker.addListener('click', function() {
            infowindow.close();
          parkinginfowindow.setContent(this.html);
          parkinginfowindow.open(map, this);

        });







    	}; // parkingresponse for loop ends here

    	// console.log(parkingInfoArray);
    	// console.log(infowindow);
     //  console.log(parkingContentString);

    	


    }); // parking response ends here




} // initmap closes here
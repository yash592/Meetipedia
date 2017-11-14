

      var eventLocation = "";

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=Pasadena&expand=organizer,venue&token=ZHYMXVXF44JLXPWWBSYQ";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);
     console.log(response.events[1].venue.address.latitude);
     console.log(response.events[1].venue.address.longitude);

     var lat = response.events[1].venue.address.latitude; 
     var long = response.events[1].venue.address.longitude;
     eventLocation = (parseFloat(lat) + "," + parseFloat(long));


     console.log(eventLocation);



    });


      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng("(" + eventLocation + ")"),
          mapTypeId: 'roadmap'
        });

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(eventLocation),
            type: 'info'
          }, 
        ];

        // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });
      }
    
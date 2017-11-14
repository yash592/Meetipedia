
$(document).ready(function(){
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
	});

$("#submit").on("click", function(){

	window.location.href = "main.html"


});
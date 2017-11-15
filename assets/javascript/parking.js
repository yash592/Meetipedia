


$("#submitbutton").on("click", function(event) {

	 event.preventDefault();

	// $("#submitbutton").on("click", function() {

	// 	window.location.href = "main.html";

  var neighborhood = $("#neighborhood").val().trim();

  if (neighborhood !="Chicago" && neighborhood !="Pasadena" && neighborhood !="Hollywood" && neighborhood !="Woodland hills" && neighborhood !="Santa Monica" && neighborhood !="Irvine" && neighborhood !="San Francisco"
  	 && neighborhood !="chicago" && neighborhood !="pasadena" && neighborhood !="hollywood" && neighborhood !="woodland hills" && neighborhood !="santa Monica" && neighborhood !="irvine" && neighborhood !="san francisco") { 

  	window.location.href = "bummer.html";  	

  }

  else {

  localStorage.clear();

      // Store all content into localStorage
  localStorage.setItem("neighborhood", neighborhood);
//   

  window.location.href = "main.html";
  	
  };

  

  



}); // document.ready function ends here


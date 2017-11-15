


$("#submitbutton").on("click", function(event) {

	 event.preventDefault();

	// $("#submitbutton").on("click", function() {

	// 	window.location.href = "main.html";

  var neighborhood = $("#neighborhood").val().trim();

  console.log(neighborhood);

  localStorage.clear();

      // Store all content into localStorage
  localStorage.setItem("neighborhood", neighborhood);


//   $('#submitbutton').on("click", function () {
//   	event.preventDefault();
//   console.log(term);
// });

   window.location.href = "main.html";



}); // document.ready function ends here





var queryURL = "https://www.googleapis.com/youtube/v3GET {base_URL}/search?part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&key=AIzaSyDlDeXz6hox05IplaBivh2Owr3tnDzfFaE";

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function

  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

  }
  )
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);



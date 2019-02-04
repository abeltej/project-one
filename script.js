

// var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&key=AIzaSyDlDeXz6hox05IplaBivh2Owr3tnDzfFaE";

// // .on("click") function associated with the Search Button
// $(".btn").on("click", function(event) {
//   // This line allows us to take advantage of the HTML "submit" property
//   // This way we can hit enter on the keyboard and it registers the search
//   // (in addition to clicks). Prevents the page from reloading on form submit.
//   event.preventDefault();

//   // Empty the region associated with the articles
//   clear();

//   // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//   // The data then gets passed as an argument to the updatePage function
  
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){
//       console.log(response)
//   }
//   )
// });

// //  .on("click") function associated with the clear button
// $("#clear-all").on("click", clear);


function artistInfo(artists) {

  var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artists + "&api_key=24b4aa93fb9c29dedfbb4977c6bb8cf4&format=json"
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  console.log(response);
    var artistName = $("<h1>").text(response.artist.name);
    var artistURL = $("<a>").attr(response.artist).append(artistName);
    var artistBio = $("<h3>").text(response.artist.bio.summary);
    var artistImage = $("<img>").attr("src", response.artist.image[3]["#text"]);
    var upcomingEvents = $("<h4>").text(response.artist.ontour + " Upcoming Events");
    var goToArtist = $("<a>").attr("href", response.artist.url).text("See Tour Dates"); 

    // Empty the contents of the artist-div, append the new artist content
    $("#artist-div").empty();
    $("#artist-div").append(artistURL, artistImage, artistBio, upcomingEvents,goToArtist);
  });
}

// Event handler for user clicking the select-artist button
$("#submit").on("click", function(event) {
  event.preventDefault();
  var art = $("#search").val().trim();

  artistInfo(art);

});




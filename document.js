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
    var inputArtist = $("#search").val().trim();

    artistInfo(inputArtist);
  
});

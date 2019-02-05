$(document).ready(function() {

  $('.vidWindow').hide();

  $('#submit').click(function() {

      $('.vidWindow').show();

  });
});



function youtubeArtist(keyword) {

  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + keyword + "&type=video&key=AIzaSyCFdNzrcERfUCd1R5rk1h3JAjXNT9svi5g"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // var videoURl = response.items[0].id.videoId;
    // var newVideo = $("<iframe>").attr('src', videoURL)
  
    console.log(response.items[0].snippet.title);

    var videoId = response.items[0].id.videoId;
    $("#testing").attr("src", "https://www.youtube.com/embed/" + videoId);
    console.log(response);

    // console.log(response.items[0].id);

    // Empty the contents of the artist-div, append the new artist content
    // $("#video-div").empty();
    // $("#video-div").append(str);
  });
}
$("#submit").on("click", function (event) {
  event.preventDefault();
  var inputArtist = $("#search").val().trim();

  



  youtubeArtist(inputArtist);

});

// $("#vidWindow").empty();
// $("#vidWindow").append(str);

// var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&key=AIzaSyDlDeXz6hox05IplaBivh2Owr3tnDzfFaE";




function artistInfo(artists) {

  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artists + "&api_key=24b4aa93fb9c29dedfbb4977c6bb8cf4&format=json"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var artistName = $("<h1>").text(response.artist.name);
    var artistURL = $("<a>").attr(response.artist).append(artistName);
    var artistBio = $("<h3>").text(response.artist.bio.summary);
    var artistImage = $("<img>").attr("src", response.artist.image[3]["#text"]);
    var upcomingEvents = $("<h4>").text(response.artist.ontour + " Upcoming Events");
    var goToArtist = $("<a>").attr("href", response.artist.url).text("See Tour Dates");

    // Empty the contents of the artist-div, append the new artist content
    $("#cBlockTwo").empty();
    $("#cBlockTwo").append(artistURL, artistImage, artistBio, upcomingEvents, goToArtist);
  });
}

// Event handler for user clicking the select-artist button
$("#submit").on("click", function (event) {
  event.preventDefault();
  var inputArtist = $("#search").val().trim();

  artistInfo(inputArtist);
  concertInfo(inputArtist)
});


function concertInfo(artists) {

  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artists + "&apikey=JRYkzb07x4RvvpOyhVRJUcNJnlRoMffq"


  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",

  }).then(function (response) {
    console.log(response);
    $("#cBlockOne").empty();

    for (var i = 0; i < response._embedded.events.length; i++) {
      console.log("loop")

      var eventCity = $("<h5>").text(response._embedded.events[i]._embedded.venues[0].city.name);
      var eventDates = $("<h6>").text(response._embedded.events[i].dates.start.localDate);
      var eventName = $("<h6>").text(response._embedded.events[i].name);
      var eventURL = $("<a>").attr("href", response._embedded.events[i].url).text("Tickets & Info");
      var eventDiv = $("<div>").appendTo("#cBlockOne").append(eventCity, eventDates, eventName, eventURL);
      $(eventDiv).attr("class", "border border-dark eventDiv text-center");
    }
  });
}


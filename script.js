$(document).ready(function () {
  $('.vidWindow').hide();
  $(".scrollBox").hide();
});

// Event handler for user clicking the search-artist button
$("#submit").on("click", function (event) {
  event.preventDefault();
  var inputArtist = $("#search").val().trim();

  var validation = validator.isEmpty(inputArtist);

  // if text is entered into search box, perform api call funcitons and show video window
  if (validation === false) {
    $('.vidWindow').show();
    $(".scrollBox").show();
    artistInfo(inputArtist);
    concertInfo(inputArtist);
    youtubeArtist(inputArtist);
  }
});

// youtube api call funciton
function youtubeArtist(keyword) {

  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + keyword + "&type=video&key=AIzaSyCFdNzrcERfUCd1R5rk1h3JAjXNT9svi5g"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    // console.log(response.items[0].snippet.title);

    var videoId = response.items[0].id.videoId;
    $("#testing").attr("src", "https://www.youtube.com/embed/" + videoId);
    // console.log(response);
  });
}

// api call function to LastFM for arist info and image
function artistInfo(artists) {

  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artists + "&api_key=24b4aa93fb9c29dedfbb4977c6bb8cf4&format=json"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var artistName = $("<h1>").text(response.artist.name);
    var artistURL = $("<a>").attr("href", response.artist.bio.url).text("More Info");
    var artistBio = $("<h3>").text(response.artist.bio.summary);
    var artistImage = $("<img>").attr("src", response.artist.image[3]["#text"]);
   
    $("#cBlockTwo").empty();
    $("#cBlockTwo").append(artistName, artistURL, artistImage, artistBio);
  });
}

// api call funciton to ticketmaster for conert info
function concertInfo(artists) {

  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artists + "&apikey=JRYkzb07x4RvvpOyhVRJUcNJnlRoMffq"

  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",

  }).then(function (response) {
    // console.log(response);
    $("#cBlockOne").empty();
    

    for (var i = 0; i < response._embedded.events.length; i++) {
      console.log("loop")

      var eventCity = $("<h5>").text(response._embedded.events[i]._embedded.venues[0].city.name);
      var eventDates = $("<h6>").text(response._embedded.events[i].dates.start.localDate);
      var eventName = $("<h6>").text(response._embedded.events[i].name);
      var eventURL = $("<a>").attr("href", response._embedded.events[i].url).text("Tickets & Info");
      var eventDiv = $("<div>").appendTo("#cBlockOne").append(eventCity, eventDates, eventName, eventURL);
      $(eventDiv).attr("class", "border border-dark rounded eventDiv text-center");
    }
  });
}

 
$(document).ready(function() {

    var players = ["ronaldo"];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".player-button", function() {
      $("#players").empty();
      $(".player-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=IKmyZRZqBn2f4JXZO8kTHFk0yI6ScANl";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var playerdiv = $("<div class=\"soccerplayer\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var playerImage = $("<img>");
            playerImage.attr("src", still);
            playerImage.attr("data-still", still);
            playerImage.attr("data-animate", animated);
            playerImage.attr("data-state", "still");
            playerImage.addClass("player-image");
  
            playerdiv.append(p);
            playerdiv.append(playerImage);
  
            $("#players").append(playerdiv);
          }
        });
    });
  
    $(document).on("click", ".player-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#addplayer").on("click", function(event) {
      event.preventDefault();
      var newplayer = $("input").eq(0).val();
  
      if (newplayer.length > 2) {
        players.push(newplayer);
      }
  
      populateButtons(players, "player-button", "#soccerplayers");
  
    });
  
    populateButtons(players, "player-button", "#soccerplayers");
  });
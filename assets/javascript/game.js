var sports = ["Badminton", "Handball", "Dressages", "Bobsleigh", "Curling", "Speed Skating", "Long Jump", "Gymnastics", "Ping-Pong", "Hockey"];

function displayGif() {
    var Osport = $(this).attr("data-Osport");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Osport + "&api_key=6Mf8kelUSBecuyyorodHx74jiGumtjs7&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        // console.log(response);

        // create variable to grab data from api
        var results = response.data;

        for (var i = 0; i <= results.length; i++) {
            var gifDiv = $("<div>").attr("class", "gifDiv float-md-left");
            var Image = $("<img>");
            Image.attr("class", "img-fluid gif");
            Image.attr("src", results[i].images.fixed_height_still.url);
            Image.attr("data-still", results[i].images.fixed_height_still.url);
            Image.attr("data-animate", results[i].images.fixed_height.url);
            Image.attr("data-state", "still");

            var ratingPG = $("<p>")
            ratingPG.text(" rating: " + results[i].rating)
            ratingPG.attr("class", "rating");
            gifDiv.append(Image);
            gifDiv.append(ratingPG);
            $(".gif-container").prepend(gifDiv);
        }

    });
}
// create click on function for switching between animate and still
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});
// create a function that append newly create buttons, create buttons on click and add them to Osport
function showButtons() {

    $("#gif-buttons").empty();

    for (var i = 0; i < sports.length; i++) {
        var gifButton = $("<button>");
        gifButton.attr("type", "button")
        gifButton.attr("class", "btn btn-info m-1 Osport")
        gifButton.text(sports[i])
        gifButton.attr("data-Osport", sports[i])
        gifButton.attr("id", "gif-button");
        $("#gif-buttons").append(gifButton);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var Osport = $("#gif-input").val().trim();
    sports.push(Osport);
    showButtons();
});

$(document).on("click", ".Osport", displayGif);

showButtons();
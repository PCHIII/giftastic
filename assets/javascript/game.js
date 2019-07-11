
// using giphy api, create a search function for sports that returns 10 gifs
// create 10 buttons with sports already choosen.
// add for placeholder (form) user to create a new sport button, that adds to the search array.





var sports = ["Volleyball", "Hockey", "Football", "Nascar", "Baseball",  "Boxing", "Gymnastics", "Golf", "Tennis", "Basketball", "Surfing", "Bowling"];

function displayGif() {
    var Osport = $(this).attr("data-Osport");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + Osport + "&api_key=6Mf8kelUSBecuyyorodHx74jiGumtjs7&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        // console.log(response);

        // create variable to grab data from api
        var results = response.data;

        // grab stills in pulled data

        for (var i = 0; i <= results.length; i++) {
            var gifDiv = $("<div>").attr("class", "gifDiv float-md-left");
            var Image = $("<img>");
            Image.attr("class", "img-fluid gif");
            Image.attr("src", results[i].images.fixed_height_still.url);
            Image.attr("data-still", results[i].images.fixed_height_still.url);
            Image.attr("data-animate", results[i].images.fixed_height.url);
            Image.attr("data-state", "still");
// get rating from string
            var ratingPG = $("<p>")
            ratingPG.text(" rating: " + results[i].rating)
            ratingPG.attr("class", "rating");
            gifDiv.append(Image);
            gifDiv.append(ratingPG);
            $(".gif-container").prepend(gifDiv);
        }

    });
}
// create on click function for switching between animate and still
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
//  click button to add a created button and add to json search, post to page.
// event.preventDefault
$("#add-gif").on("click", function(e) {
    e.preventDefault();
    Osport = $("#gif-input").val();
    sports.push(Osport);
    showButtons();
    // console.log(e)
});

$(document).on("click", ".Osport", displayGif);

showButtons();
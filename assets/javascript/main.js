
// using giphy api, create a search function for sports that returns 10 gifs
// create 10 buttons with sports already choosen.
// add for placeholder (form) user to create a new sport button, that adds to the search array.


$(document).ready(function() {



var sports = ["Volleyball", "Hockey", "Football", "Nascar", "Baseball",  "Boxing", "Gymnastics", "Golf", "Tennis", "Basketball", "Surfing", "Bowling"];

function displayGif() {
    var oSport = $(this).attr("data-oSport");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + oSport + "&api_key=6Mf8kelUSBecuyyorodHx74jiGumtjs7&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);

        
        // storing the data from the AJAX request in the results variable
        var results = response.data;

// loop thru data
        // grab stills in pulled data
 // Setting the attributes of the image
//  create div tag and img tag to store
        for (var i = 0; i <= results.length; i++) {
            var gifDiv = $("<div>").attr("class", "gifDiv float-md-left");
            var image = $("<img>");
            image.attr("class", "img-fluid gif");
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
           
            // image.attr("display","block");

// get rating from string
// create p tag to store rating
// Appending the images and rating to the html container.
            var ratingPG = $("<p>")
            ratingPG.text(" rating: " + results[i].rating)
            ratingPG.attr("class", "rating");
            gifDiv.append(image);
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
// create a function that create buttons from array and append new to var sports array
// Appending the buttons to the html container
function showButtons() {

    $("#gif-buttons").empty();

    for (var i = 0; i < sports.length; i++) {
        var gifButton = $("<button>");
        gifButton.attr("type", "button")
        gifButton.attr("class", "btn btn-info m-1 oSport")
        gifButton.text(sports[i])
        gifButton.attr("data-oSport", sports[i])
        gifButton.attr("id", "gif-button");
        $("#gif-buttons").append(gifButton);
    }
}

// event.preventDefault
$("#add-gif").on("click", function(e) {
    e.preventDefault();
    oSport = $("#gif-input").val().trim();
    sports.push(oSport);
    showButtons();
    // console.log(e)

    
// $(".reset").click(function() {
//     $("#add-gif").trigger('reset'); 

//     });


});

$(document).on("click", ".oSport", displayGif);

showButtons();

});
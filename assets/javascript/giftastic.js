// Create string of movies 
var movies = ["clueless", "10 things i hate about you", "mean girls", "the princess diaries", "she's the man"];

// Function to show buttons of array above 
function showGifButtons() {
    $("#buttonsHere").empty();

    for (var i = 0; i < movies.length; i++) {
        var gifsButton = $("<button>");
        gifsButton.addClass("btn btn-default movieButtons");
        gifsButton.attr("data-name", movies[i]);
        gifsButton.text(movies[i]);
        $("#buttonsHere").append(gifsButton);
    }
}

// Create click function to add more movie buttons
$("#submitButton").on("click", function (event){
    event.preventDefault();
    var newMovie = $("#movie-input").val().trim();
    movies.push(newMovie);
    showGifButtons();
});
    showGifButtons();

// Function to display gifs 
$("body").on("click", ".movieButtons", function (){
    var searchMovie = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchMovie + "&api_key=yCfnCA9fO24mTNR8QEAInZrDXrbIBWTP&limit=10";

$.ajax( {
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    var results = response.data;

for (var i = 0; i < results.length; i++){
    var gifsDiv = $("<div>");
    var gifsRating = $("<h3>").text("Rating: " + results[i].rating);
    gifsDiv.append(gifsRating);
    var gifsImage = $("<img>");
    gifsImage.attr("src", results[i].images.original_still.url);
    gifsImage.attr("data-animate", results[i].images.original.url);
    gifsImage.attr("data-still", results[i].images.original_still.url);
    gifsImage.attr("data-state", "still");
    gifsDiv.append(gifsImage);
    $("#gifsHere").prepend(gifsDiv);
   

}

});

});

// Function to animate gifs then back to their still form 
$("body").on("click", "img", function(){
    var state = $(this).attr("data-state");
    
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});
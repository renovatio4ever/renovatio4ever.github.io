// Author: Peter Santiago
// Date: 10.23.2018
// Purpose: Simple GIPHY-API search browser
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap

// Intended for maintaining objects on page in local storage; WIP

var imagebankmem =[];

// sci fi content array, dynamic button constructor

$( document ).ready(function() {
    var imagebank = ["Space", "Moon", "Stars", "Robots", "Computers", "Stormtroopers", "Phasers", "Voltron", "Cyborgs", "Androids"];
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < imagebank.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("mysearchquery");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", imagebank[i]);
            gifButton.text(imagebank[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    // after a new topic is entered, a button is configured for it
    
    function addNewButton(){
        $("#addGif").on("click", function(){
        var mysearchquery = $("#topic-input").val().trim();
        if (mysearchquery == ""){
          return false; 
        }
        imagebank.push(mysearchquery);
    
        displayGifButtons();
        return false;
        });
    }
    
    // remove button function

    function removeLastButton(){
        $("removeGif").on("click", function(){
        imagebank.pop(mysearchquery);
        displayGifButtons();
        return false;
        });
    }


    // searches API and displays gif based on results.
    // Free DEV Key: 461iE0tNG94oBHTW9Hfby7wS0DCp2obb
    
    function displayGifs(){
        var mysearchquery = $(this).attr("data-name");
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mysearchquery + "&api_key=461iE0tNG94oBHTW9Hfby7wS0DCp2obb&limit=10";

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=461iE0tNG94oBHTW9Hfby7wS0DCp2obb&q=" + mysearchquery + "&limit=10&offset=0&rating=G&lang=en";

        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
        });
    }

     // render functions
    
    displayGifButtons(); 
    addNewButton();
    removeLastButton();

    // gif animation functions
    
    $(document).on("click", ".mysearchquery", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
// Author: Peter Santiago
// Date: 10.18.2018
// Purpose: Video Game Themed Trivia Game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap
// Note: The game is intended to by played with headphones and the audio turned up.

$(document).ready(function () {
    var options = [
        {
            question: "What was the first official video game console in gaming history?", 
            choice: ["Atari", "Magnavox Odyssey", "Vectrex", "Coleco Vision"],
            answer: 1,
            photo: "assets/images/odyssey.jpg"
         },
         {
             question: "What was the first marketed video game in gaming history?", 
            choice: ["Pac-Man", "Street Fighter", "Tennis", "Pong"],
            answer: 3,
            photo: "assets/images/pong.gif"
         }, 
         {
             question: "First game with a hidden Easter Egg in gaming history?", 
            choice: ["Zoom", "Defender", "Adventure", "Jump Man" ],
            answer: 2,
            photo: "assets/images/adventuretime.gif"
        }, 
        {
            question: "First video game to be shown on the silver screen?", 
            choice: ["Running Boy", "Super Mario Brothers", "Street Fighter II", "Fatal Fury" ],
            answer: 1,
            photo: "assets/images/supermario.gif"
        }, 
        {
            question: "What are the colors of the monsters in Pac-Man?", 
            choice: ["Red-Pink-Cyan-Orange", "Pink-Orange-Brown-Cyan", "Black-White-Peuce-Blue", "Green-Orange-Red-Peppermint" ],
            answer: 0,
            photo: "assets/images/pac-man.gif"
        }, 
        {
            question: "In what year was the famous Donkey Kong video game released?", 
            choice: ["1979", "1999", "1981", "1985" ],
            answer: 0,
            photo: "assets/images/maxheadroom.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $(window).on('load', function () {
        $('#myModal').modal('show');
    });


    function playWin() {
        var audio = new Audio("assets/sounds/readyplayerone-intro.mp3");
        audio.play();
    }

    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            playWin();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
        
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 4000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
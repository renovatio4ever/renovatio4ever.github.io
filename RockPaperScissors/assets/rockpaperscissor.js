// Peter Santiago 09.27.2018
// Simple Rock paper scissors gate
// Object is to be the first to score 20 points before the computer does
// This game incorporates everything learned so far including: Boostrap, JS, Random Engines, Images, CSS, HTML and document printing

// "The Rock", Paper and Scissor image is copyrighted and is not intended for marketing purposes.

// Read up on Modals.. Amazing, what you can do with them including creating those cool scrolling popups for your site. Wrote a tiny script to present the history and rules of the game.

window.onload = function() {
    document.getElementById("my_audio").play();
}

// Modal Popup Script.

$(window).on('load',function(){
    $('#myModal').modal('show');
});

// Here I declare my vars and set to zero

var mylosses = 0;
var mywins = 0;

// declare a function that focuses on userChoice
// I user getElement to find my ID's in the html (.innerHTML) for processing

var play = function (userChoice) {

    document.getElementById("player").innerHTML = "";
    document.getElementById("opponent").innerHTML = "";
    document.getElementById("results").innerHTML = "";

// Prints what you chose based on the button pressed

    document.getElementById("player").innerHTML = 'Janken Pon! You chose' + ' ' + userChoice + '.';

// Fear the random generator. Section seeds random values to create the effect of a random choice by the program. I use decimal values between 0 and 1 for random-ness rather than setting a math upper and floor. 

    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
        computerChoice = "rock";
    } else if (computerChoice <= 0.67) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }

// Prints what the computer generated in the opponent document object

    document.getElementById("opponent").innerHTML = 'The machine chose' + ' ' + computerChoice + '.';

    var compare = function (choice1, choice2) {
        if (choice1 == choice2) {
            return "OMG! The Human and Machine are tied!";
        } else if (choice1 == "rock") {
            if (choice2 == "scissors") {
                mywins++;
                return "The Rock wins!";
            } else {
                mylosses++;
                return "Woops, More paper work for you!";
            }
        } else if (choice1 == "paper") {
            if (choice2 == "rock") {
                mywins++;
                return "Paper Wins!";
            } else {
                mylosses++;
                return "Haha. Edwards won.";
            }
        } else if (choice1 == "scissors") {
            if (choice2 == "rock") {
                mylosses++;
                return "Sorry. The Rock Won";
            } else {
                mywins++;
                return "Scissors Win";
            }
        };
    };

// Now for the fun part. I use the compare method to compare numerical scores between the human player and the computer. The compare method is ok here since I am only comparing a human player and computer scores.

    var thewinner = compare(userChoice, computerChoice);

// Passing the results of the scores (wins, losses..etc) to the div contents of the HTML

    document.getElementById("results").innerHTML = thewinner;
    document.getElementById("mywins").innerHTML = mywins;
    document.getElementById("mylosses").innerHTML = mylosses;

// The logic if either the human or computer wins

    if (mywins == 20 || mylosses == 20) {
        document.getElementById("mywins").style.fontSize = "44";
        document.getElementById("mylosses").style.fontSize = "44";
        alert("Someone has won the match. Let's see who won shall we?");
    }
    if (mywins == 20) {
        // alert("Congratulations. You scored " + mywins + " wins. Jenkins crowns you as the champion");
        document.getElementById("results").innerHTML = 'Congratulations. You scored ' + mywins + ' wins. You know the way of the Janken Pon!';        
        mylosses = 0;
        mywins = 0;
    }
    if (mylosses == 20) {
        document.getElementById("results").innerHTML = 'Ouch.. Sorry, you lost. Unfortunately, You know not the way of Janken Pon!';
        mylosses = 0;
        mywins = 0;
    }
};

// This is the reset function that is executed when the button is pushed.

var reset = function () {
    document.getElementById("mywins").innerHTML = mywins;
    document.getElementById("mylosses").innerHTML = mylosses;
    mylosses = 0;
    mywins = 0;
};

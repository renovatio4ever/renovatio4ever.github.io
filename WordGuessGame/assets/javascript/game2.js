// Strict is not necessary but it keeps me from shooting myself in the foot for not
// declaring variables properly.. and there are quite a few

'use strict';

// My object of Matrix theme related words!

var selectableWords =
    [
        "matrix",
        "morpheus",
        "anderson",
        "smith",
        "trinity",
        "neo",
        "rabbit",
        "squiddy",
        "zion",
        "nebuchadnezzar",
        "oracle",
        "apoc",
    ];

// My self-explaining variable declarations

const maxTries = 10;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var gameStarted = false;        
var hasFinished = false;        
var wins = 0;                   

// Bg, win, and lose sound components

// Reset our game-level variables

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

// Used length of my var to set the Math randomizer

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    
// Clearing out the arrays to reset or start a fresh game

    guessedLetters = [];
    guessingWord = [];

// Make sure that the theme hangman (Mr. Smith or Morpheus in this case) is cleared from view

    document.getElementById("hangmanImage").src = "";

// dimensionalize, and clearing the word being guessed

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

// Hiding the prompts and game outcome (win or lose) images
    
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

// Update the display - when and where applicable

    updateDisplay();
};

//  Updates the display on the DOM

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        var bgsound = new Audio('assets/sounds/matrix_youlose.wav');
        bgsound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    }
};

// Displays the appropriate image depending on the outcome
// In this case, rather than writing some switch, if, and or else mess I
// just numbered by images and am calling them in through a combination of file concatination
// and increment (i.e. 0.jpg, 1.jpg, 2.jpg...etc)

function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".jpg";
};

// Upon game completion (regardless of outcome) the keystrokes are aborted and the game is reset

document.onkeydown = function(event) {

    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
            var bgsound = new Audio('assets/sounds/matrix_redux.wav');
            bgsound.volume = 0.1;
            bgsound.play();
        }

// Critical component: This ensures the same key stroke was not used and the player penalized for it

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

// This function replaces the blanks and replaces them with the letter of the guessed word
// It leverages an array to store the position and pointer of the word
// So that the letter is assigned correctly to the corresponding blank

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

// If the guess is incorrect we decrement the amount of chances and reveal a bit more of 
// The nemisis Mr. Smith to the player.

    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
        var bgsound = new Audio('assets/sounds/matrix_rightletter.wav');
            bgsound.play();
    }
};

// Validate if the player won or not.

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        var bgsound = new Audio('assets/sounds/matrix_youwin.wav');
        bgsound.play();
        document.getElementById("hangmanImage").src = "assets/images/morphues_win.jpg";
        hasFinished = true;
    }
};
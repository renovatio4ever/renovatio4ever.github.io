// Author: Peter Santiago
// Date: 11.02.2018
// Purpose: Janken Pon II (a.k.a. Rock Paper Scissors)
// Features: This code was built with Node JS -->
// Required packages: Inquirer, and Colors (for the effects)

// Install Packages
var inquirer = require("inquirer");
var colors = require("colors");

// Set initial health amounts.
var userhealth = 60;
var zombiehealth = 5;

// Created a generic function that checks if the user won or lost.
function amongtheliving() {

  console.log("");
  console.log("");

  // If the user has less than 0 health.... then the user lost.
  if (userhealth <= 0) {

    console.log(colors.red(".-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-."));
    console.log("");
    console.log(colors.yellow("Wow.. The carnage was horrible. You are soo dead!"));
    console.log(colors.cyan("Don't give up. Try again!"));
    console.log("");
    console.log(colors.red(".-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-..-^-."));

    // Exit the game
    process.exit();
  }

  // If the zombie has less than 0 health.... then user wins.
  if (zombiehealth <= 0) {

    console.log(colors.green(".';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'"));
    console.log("");
    console.log(colors.yellow("The zombie collapses hard on the ground. You kicked it's butt!"));
    console.log(colors.cyan("Try your luck again!".yellow));
    console.log("");
    console.log(colors.green(".';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'..';;'"));

    // Exit the game
    process.exit();
  }

  // After performing the "check", the next round is initiated.
  letsslayzombies();

}

// This function holds the game logic
function letsslayzombies() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
  inquirer.prompt([
    {
      type: "list",
      name: "numberguessed",
      message: "Guess a number between [1-5] to survive!",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // Determine if user or zombie is alive
    if (userhealth > 0 || zombiehealth > 0) {

      // Random zombie userdamage
      var userdamage = Math.floor(Math.random() * 5) + 1;

      // The zombie can make a guess too
      var zombiedice = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log(colors.magenta("The hideous zombie rolled a " + zombiedice));

      // If the user guessed the zombies number
      if (zombiedice === parseInt(guess.numberguessed)) {

        // Notify user of userdamage
        zombiehealth -= userdamage;
        console.log(colors.blue(".*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*."));
        console.log(colors.yellow("BLAM!!! CRUNCH!!! You hit the nasty zombie for " + userdamage + " userdamage!"));
        console.log(colors.cyan("You have " + userhealth + " health left. The slobbering zombie has " + zombiehealth + " health left."));
        console.log(colors.blue(".*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*..*=*."));

        // Check if the game is over.
        amongtheliving();
      }

      else {
        // subtracting userdamage.
        userhealth -= userdamage;
        console.log(colors.red("SLASH!!! BITE!! The zombie inflicted you with " + userdamage + " userdamage!".red));
        console.log(colors.cyan("You have " + userhealth + " health left. The Zombie has " + zombiehealth + " health left."));

        // validate the reound
        amongtheliving();

      }
    }
  });
}

// Starts the game!
letsslayzombies();
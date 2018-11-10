// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos, Patrick Mirville)
// Updated: 11.01.2018
// Purpose: Fantasy Football/Craps Betting Themed Game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap

// This is a Test Harness JS for the Login, Team Selector, and Bet Page Flow
// Section also validates that data (is at least) reaching the database


var queryURL = "https://api.fantasydata.net/v3/nfl/scores/JSON/GameStatsByWeek/2018/8?key=ad398993c55d46449bde67a4095fef1b";

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
console.log(response);
console.log(response.Runtime);
});
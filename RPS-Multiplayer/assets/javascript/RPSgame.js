// Author: Peter Santiago
// Date: 11.02.2018
// Purpose: Janken Pon II (a.k.a. Rock Paper Scissors)
//Features: This code was built on JS, HTML, HTML5, CSS, CSS, Bootstrap, Firebase -->

// Show Modal on Load
$(window).on('load', function () {
	$('#myModal').modal('show');
});

// Firebase Initializaton
var config = {
	apiKey: "AIzaSyBt5wt0oyEZSIjApKcgMtgM-5sLPKRRCfE",
	authDomain: "rps-multiplayer-game-bb719.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-game-bb719.firebaseio.com",
	projectId: "rps-multiplayer-game-bb719",
	storageBucket: "rps-multiplayer-game-bb719.appspot.com",
	messagingSenderId: "26415069758"
};
firebase.initializeApp(config);
var database = firebase.database();

// Player Variables
var p1Wins;
var p1Losses;
var p1Name;
var p1Choice;

var p2Wins;
var p2Losses;
var p2Name;
var p2Choice;

var playerTurn;
var whoAmI = "none";

// Theme Flag. As the player progresses the them val is incremented. The value will determine
// The background displayed for that player. (i.e. 1 = Chinese Painting 1, 2 = Chinese Painting 2..)

var theme = 1;

database.ref().on("value", function (snapshot) {

	// Whose turn is it anyway?
	if (snapshot.val().db_playerTurn !== undefined) {
		playerTurn = snapshot.val().db_playerTurn;
	}
	// The DB will default to a player if none are chosen.
	else {
		database.ref().update({
			db_playerTurn: 1
		});
	}

	// Show stats if the Player 1 has a name.
	if (snapshot.val().db_p1Name !== undefined) {
		$("#player1Name").text(snapshot.val().db_p1Name);
		$("#player1LblWins").text("Wins: " + snapshot.val().db_p1Wins);
		$("#player1LblLosses").text("Losses: " + snapshot.val().db_p1Losses);
	}

	// Don't let Player 1 go if there is no Player 2
	else if (snapshot.val().db_p1Name === undefined && snapshot.val().db_p2Name !== undefined) {
		$("#p2c1").text(" ");
		$("#p2c2").text(" ");
		$("#p2c3").text(" ");
		$("#gameStats").text("Waiting for your opponent...");
		$("#player1Name").text("Available Seat");
		$("#player1LblWins").text(" ");
		$("#player1LblLosses").text(" ");
	} else {
		$("#player1Name").text("Available Seat");
		$("#player1LblWins").text(" ");
		$("#player1LblLosses").text(" ");
	}

	// Show stats if the Player 2 has a name.
	if (snapshot.val().db_p2Name !== undefined) {
		$("#player2Name").text(snapshot.val().db_p2Name);
		$("#player2LblWins").text("Wins: " + snapshot.val().db_p2Wins);
		$("#player2LblLosses").text("Losses: " + snapshot.val().db_p2Losses);
	}

	// Don't let Player 2 go if there is no Player 1
	else if (snapshot.val().db_p2Name === undefined && snapshot.val().db_p1Name !== undefined) {
		$("#p1c1").text(" ");
		$("#p1c2").text(" ");
		$("#p1c3").text(" ");
		$("#gameStats").text("Waiting for a new opponent...");
		$("#player2Name").text("Available Seat");
		$("#player2LblWins").text(" ");
		$("#player2LblLosses").text(" ");
	} else {
		$("#player2Name").text("Available Seat");
		$("#player2LblWins").text(" ");
		$("#player2LblLosses").text(" ");
	}

	// Written in characteristic sequence of a Janken Pon Round
	// Player 1 & 2 have taken a seat, now we can play!!
	if (snapshot.val().db_p1Name !== undefined && snapshot.val().db_p2Name !== undefined) {
		// Player 1 Turn
		if (snapshot.val().db_playerTurn === 1) {
			if (whoAmI === "player1") {
				$(".player1Rock").text("Rock");
				$(".player1Paper").text("Paper");
				$(".player1Scissors").text("Scissors");
				$("#gameStats").text("Choose your weapon!");
				$("#p2c1").text(" ");
			} else {
				$("#gameStats").text("Waiting for Player 1 to choose");
				$("#p1c1").text(" ");
				$("#p2c1").text(" ");
			}
		}

		// Player 2 Turn
		else if (snapshot.val().db_playerTurn === 2) {
			if (whoAmI === "player2") {
				// let player2 choose
				$(".player2Rock").text("Rock");
				$(".player2Paper").text("Paper");
				$(".player2Scissors").text("Scissors");
				$("#gameStats").text("Choose your weapon!");
				$("#p1c1").text(" ");
			} else {
				$("#gameStats").text("Waiting for Player 2 to choose");
				$("#p1c1").text(" ");
				$("#p2c1").text(" ");
			}
		}
		// JANKEN PON!! Now, display the Results.
		else if (snapshot.val().db_playerTurn === 0) {

			p1Choice = snapshot.val().db_p1Choice;
			p2Choice = snapshot.val().db_p2Choice;
			$("#p1c1").text(p1Choice);
			$("#p2c1").text(p2Choice);

			if (theme === 1) {
				var imgStyle = "actor";
				$('body').removeClass('bg1').addClass('bg2');
				theme++;
			} else if (theme === 2) {
				var imgStyle = "anime";
				$('body').removeClass('bg2').addClass('bg3');
				theme++;
			} else if (theme === 3) {
				var imgStyle = "human";
				$('body').removeClass('bg3').addClass('bg4');
				theme++;
			} else {
				var imgStyle = "real";
				$('body').removeClass('bg4').addClass('bg0');
				theme = 1;
			}

			$("#p1Image").html('<img src="assets/images/' + imgStyle + p1Choice + '.png" alt="' + p1Choice + '" class="img img-responsive" />');
			$("#p2Image").html('<img src="assets/images/' + imgStyle + p2Choice + '.png" alt="' + p2Choice + '" class="img img-responsive" />');

			// If Player 1 Wins
			if ((p1Choice === "Rock" && p2Choice === "Scissors") || (p1Choice === "Paper" && p2Choice === "Rock") || (p1Choice === "Scissors" && p2Choice === "Paper")) {
				$("#gameStats").text("Player 1 wins!");
				// Only update the database 1 time
				if (whoAmI === "player1") {
					p1Wins = snapshot.val().db_p1Wins;
					p1Wins++;
					p2Losses = snapshot.val().db_p2Losses;
					p2Losses++;
					playerTurn = 3;
					database.ref().update({
						db_p1Wins: p1Wins,
						db_p2Losses: p2Losses,
						db_playerTurn: playerTurn
					});
				}
			}

			// If Player 2 Wins
			else if ((p2Choice === "Rock" && p1Choice === "Scissors") || (p2Choice === "Paper" && p1Choice === "Rock") || (p2Choice === "Scissors" && p1Choice === "Paper")) {
				$("#gameStats").text("Player 2 wins!");
				if (whoAmI === "player1") {
					p2Wins = snapshot.val().db_p2Wins;
					p2Wins++;
					p1Losses = snapshot.val().db_p1Losses;
					p1Losses++;
					playerTurn = 3;
					database.ref().update({
						db_p2Wins: p2Wins,
						db_p1Losses: p1Losses,
						db_playerTurn: playerTurn
					});
				}
			}

			// If there is a DRAW
			else {
				$("#gameStats").text("WoW! It's a draw!")
			}

			// Let's rub it in their faces for 5 seconds and then reset the turn
			setTimeout(resetPlayerTurn, 1000 * 5);
		}
	}

	// New arrivals become Player 1
	if (whoAmI === "none" && snapshot.val().db_p1Name === undefined) {
		drawPlayerNameInput("player1");
		resetPlayerTurn();
	}
	// Player 1 exists. New arrival becomes Player 2
	else if (whoAmI === "none" && snapshot.val().db_p2Name === undefined) {
		drawPlayerNameInput("player2");
		resetPlayerTurn();
	}

	// If Player 1 and 2 are seated. Additional visitors become Trolls.. I mean, Spectators :)
	else if (whoAmI === "none") {
		drawPlayerNameDisplay();
	}

	// Store Player 1 Choice
	p1Choice = snapshot.val().db_p1Choice;

	// If firebase is down, trap the choice made
}, function (errorObject) {

	// Console Error Trap - Disabled
	// console.log("The read failed: " + errorObject.code);
});

// Player 1 and 2 choices respectively
$(document).on("click", ".choice", function () {
	var decision = $(this).attr("data-val");
	if (playerTurn === 1) {
		playerTurn = 2;
		database.ref().update({
			db_p1Choice: decision,
			db_playerTurn: playerTurn
		});
		$(".player1Rock").text(" ");
		$(".player1Paper").text(" ");
		$(".player1Scissors").text(" ");
	}
	else if (playerTurn === 2) {
		playerTurn = 0;
		database.ref().update({
			db_p2Choice: decision,
			db_playerTurn: playerTurn
		});
		$(".player2Paper").text(" ");
		$(".player2Scissors").text(" ");
	}
});

// What's a game without theme music in the background
function playAudio() {
	var audio = new Audio("assets/sounds/Kugane.mp3");
	audio.play();
}

// Player 1 Inputs Name and Press Play
$(document).on("click", ".btnPlayerNameInput", function (event) {
	event.preventDefault();
	playAudio();
	playerTurn = 1;

	// If the form was for player 1, set local p1Name & update db_p1Name
	if ($(this).attr("id") === "player1") {
		p1Name = $("#playerNameInput").val().trim();
		database.ref().update({
			db_p1Name: p1Name,
			db_p1Wins: 0,
			db_p1Losses: 0,
			db_playerTurn: playerTurn
		});

		// Identify which player the user is & draw the player's side of the board
		whoAmI = "player1";
		drawPlayerNameDisplay();
	}
	// If the form was for player 2, do the same
	else if ($(this).attr("id") === "player2") {
		p2Name = $("#playerNameInput").val().trim();
		database.ref().update({
			db_p2Name: p2Name,
			db_p2Wins: 0,
			db_p2Losses: 0,
			db_playerTurn: playerTurn
		});

		whoAmI = "player2";
		drawPlayerNameDisplay();
	}
});

// Resets the player's turn to 1
function resetPlayerTurn() {
	database.ref().update({
		db_playerTurn: 1
	});
	$("#p1Image").html(" ");
	$("#p2Image").html(" ");
}

// Experimental Draw Form for Player 1
function drawPlayerNameInput(whichPlayer) {
	$("#playerIntro").html(
		'<form class="form-inline">' +
		'<div class="form-group">' +
		'<input type="text" class="form-control" id="playerNameInput" placeholder="Your Name">' +
		'</div>' +
		'<button type="submit" class="btn btn-default btnPlayerNameInput" id="' + whichPlayer + '">Play!</button>' +
		'</form>'
	);
}

// Assigns a seat for the visiting Player
function drawPlayerNameDisplay() {
	if (whoAmI === "none") {
		$("#playerIntro").html("You are currently spectating.");
	} else if (whoAmI === "player1") {
		$("#playerIntro").html("Hi, " + p1Name + "! You are player 1.");
		$("#p1c1").addClass("player1Rock");
		$("#p1c2").addClass("player1Paper");
		$("#p1c3").addClass("player1Scissors");
	} else if (whoAmI === "player2") {
		$("#playerIntro").html("Hi, " + p2Name + "! You are player 2.");
		$("#p2c1").addClass("player2Rock");
		$("#p2c2").addClass("player2Paper");
		$("#p2c3").addClass("player2Scissors");
	}
}

// Game chat room section
$(document).on("click", "#chatSubmit", function (event) {
	event.preventDefault();

	var chatText = $("#inputChatText").val().trim();
	var myName = "Spectator";

	if (whoAmI === "player1") {
		myName = p1Name;
	} else if (whoAmI === "player2") {
		myName = p2Name;
	}

	database.ref().push({
		db_chatName: myName,
		db_chatType: whoAmI,
		db_chatText: chatText
	});
	$("#inputChatText").val(" ");
});

database.ref().on("child_added", function (snapshot) {
	var chatType = snapshot.val().db_chatType;
	var chatName = snapshot.val().db_chatName;
	var chatText = snapshot.val().db_chatText;


	if (chatType === "player1") {
		$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
	} else if (chatType === "player2") {
		$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
	} else if (chatType === "none") {
		$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
	}
});

// Seat becomes available if Player 1 leaves (DB Clean Up)
$(window).unload(function () {
	if (whoAmI === "player1") {
		database.ref().update({
			db_p1Name: null,
			db_p1Wins: 0,
			db_p1Losses: 0
		});


	}

// Seat becomes available if Player 2 leaves (DB Clean Up)
	else if (whoAmI === "player2") {
		database.ref().update({
			db_p2Name: null,
			db_p2Wins: 0,
			db_p2Losses: 0
		});
	}
// Note: There is no "else" for spectators. If they leave there is really nothing do.
});
// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos, Patrick Mirville)
// Updated: 11.01.2018
// Purpose: Fantasy Football/Craps Betting Themed Game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap

// This is a Test Harness JS for the Login, Team Selector, and Bet Page Flow
// Section also validates that data (is at least) reaching the database

// Initialize Firebase

var config = {
    apiKey: "AIzaSyC19BuOOU7CeeMF_O1V8s0M3xMx-MyoLHI",
    authDomain: "dream-team-game.firebaseapp.com",
    databaseURL: "https://dream-team-game.firebaseio.com",
    projectId: "dream-team-game",
    storageBucket: "dream-team-game.appspot.com",
    messagingSenderId: "369829537224"
};
firebase.initializeApp(config);
var database = firebase.database();

// Test Harness: New Player
// var newplayer

// Test Harness: Variables
var wins1, wins2, wins3, loss1, loss2, loss3, draw1, draw2, draw3;
wins1 = wins2 = wins3 = loss1 = loss2 = loss3 = draw1 = draw2 = draw3 = 0;

var odds1, odds2, odds3;
odds1 = odds2 = odds3 = 0;

var team1earn, team2earn, team3earn;
team1earn = team2earn = team3earn = 0;

var totalbets = 0
var totaltokens = 5000
var tokensearned = 0
var totalearnings = 0
var betlocker = "false"
var currentplayer
var gameplayer



// function setuser() {
//     currentplayer = $("#new-player").text();
//     // currentplayer = "Player9999"
//     console.log(currentplayer);
//     $("#playing-as").text(currentplayer);
// }

// setuser();

// Test Harness: Initialization



$(document).ready(function () {

    // simplemask.js masking.. because fat fingering text will goof the generator.

    $('#wins-1').simpleMask({'mask': ['###'],'nextInput': $('#loss-1')});
    $('#loss-1').simpleMask({'mask': ['###'],'nextInput': $('#draw-1')});
    $('#draw-1').simpleMask({'mask': ['###'],'nextInput': $('#wins-2')});
    $('#wins-2').simpleMask({'mask': ['###'],'nextInput': $('#loss-2')});
    $('#loss-2').simpleMask({'mask': ['###'],'nextInput': $('#draw-2')});
    $('#draw-2').simpleMask({'mask': ['###'],'nextInput': $('#wins-3')});
    $('#wins-3').simpleMask({'mask': ['###'],'nextInput': $('#loss-3')});
    $('#loss-3').simpleMask({'mask': ['###'],'nextInput': $('#draw-3')});
    $('#draw-3').simpleMask({'mask': ['###'],'nextInput': $('#wins-1')});

});

function hidethestack() {
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
}

hidethestack();

// Test Harness: Realtime Calculations and DB Write
$('input').keyup(function () {
    calcbets();
    overbet();
});

// Test Harness: Interim Bet Engine
function calcbets() {


    // $("tr").each(function() {
    //     if ($(this).find(".win")) {
    //       team1earn = parseInt($(this).find(".win").val().trim())
    //       team2earn = parseInt($(this).find(".loss").val().trim())
    //       team3earn = parseInt($(this).find(".draw").val().trim())
    //     }
    //   })
    
    wins1 = $("#wins-1").val().trim();
    loss1 = $("#loss-1").val().trim();
    draw1 = $("#draw-1").val().trim();

    wins2 = $("#wins-2").val().trim();
    loss2 = $("#loss-2").val().trim();
    draw2 = $("#draw-2").val().trim();

    wins3 = $("#wins-3").val().trim();
    loss3 = $("#loss-3").val().trim();
    draw3 = $("#draw-3").val().trim();

    team1earn = parseInt(wins1) + parseInt(loss1) + parseInt(draw1);
    team2earn = parseInt(wins2) + parseInt(loss2) + parseInt(draw2);
    team3earn = parseInt(wins3) + parseInt(loss3) + parseInt(draw3);
    
    totalbets = team1earn + team2earn + team3earn

    tokensearned = totaltokens - totalbets

    $("#earn-1").text(team1earn);
    $("#earn-2").text(team2earn);
    $("#earn-3").text(team3earn);

    $("#totalearnings").text(totalbets);
    $("#tokens-earned").text(tokensearned);

    // Test Harness: Score write
    database.ref().update({
        t_token: tokensearned,
        t1_earn: team1earn,
        t2_earn: team2earn,
        t3_earn: team3earn,
        t_earnings: totalbets
    });
}

function overbet() {
    if (tokensearned < 1) {
        $("#mymodal-youwentover").modal('show');
        $(':input').val(0);

        $("#earn-1").text(0);
        $("#totalearnings").text(0);
        $("#tokens-earned").text(5000);
    }
}

$("#reset-this").click(function () {
    tokensearned = 0;
    overbet();
});

$("#bet-this").click(function () {
    betlocker = "True";
    // insert special FX
    database.ref().update({
        betlock: betlocker
    });
});

$("#pick-team-1").attr("disabled", true);

$("#go-bet-now").click(function () {

    // ref.child('dream-team-game').orderByChild('player').equalTo('superplayer2018').on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //     snapshot.forEach(function(data) {
    //         console.log(data.key);
    //     });
    // });

    $("#game-player").on("keyup change", function () {
        gameplayer = this.value;
    });

    if (gameplayer === "superplayer2018") {
        $("#mymodal-existing").modal('show');
        $("#hide-the-welcome").hide();
        $("#hide-the-team").hide();
        $("#hide-the-bets").show();
        $("#hide-the-champs").hide();
    } else {
        $("#mymodal-register").modal('show');
        $("#hide-the-welcome").hide();
        $("#hide-the-team").show();
        $("#hide-the-bets").hide();
        $("#hide-the-champs").hide();

    }

});

$("#go-to-champs").click(function () {
    $("#hide-the-welcome").hide();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").show();
});

// Disable Button Count
$("#pick-team-1").click(function () {
    $("#pick-team-1").attr("disabled", true);
});

$("#pick-team-2").click(function () {
    $("#pick-team-2").attr("disabled", true);
});

$("#pick-team-3").click(function () {
    $("#pick-team-3").attr("disabled", true);
});

$("#pick-team-4").click(function () {
    $("#pick-team-4").attr("disabled", true);
});

$("#pick-team-5").click(function () {
    $("#pick-team-5").attr("disabled", true);
});

// End Series
$("#go-back-to-teams").click(function () {
    $("#hide-the-welcome").hide();
    $("#hide-the-team").show();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

$("#go-to-bet-board").click(function () {
    $("#hide-the-welcome").hide();
    $("#hide-the-team").hide();
    $("#hide-the-bets").show();
    $("#hide-the-champs").hide();
});


$("#go-to-home").click(function () {
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

$("#go-back-home-now").click(function () {
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

function GenerateNFLTeams(){
    
    var queryURL = "http://api.sportradar.us/nfl/official/trial/v5/en/seasons/2018/standings.json?api_key=4qk5mjfh827kk5vgk4d98wbv";

    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        var results = response.data; 
        for (var i=0; i<results.length; i++){

        }
    });
}
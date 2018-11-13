// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos)
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
var totaltokens = 9000
var tokensearned = 0
var totalearnings = 0
var betlocker = "false"
var currentplayer
var gameplayer
var teamcounter = 0

    
function displaynflteams(){
    
        $.ajax({
            type: "GET",
            url: "https://api.fantasydata.net/v3/nfl/scores/JSON/GameStatsByWeek/2018/8?key=ad398993c55d46449bde67a4095fef1b",
            dataType: "json"
        })
        .done(function(response) {
            for (var i = 0; i < 5; i++) {
            // index, Team, Point Spread, Odds (fixed), Select Button
            console.log("Away Team: " + response[i].AwayTeam + " Away Score " + response[i].AwayScore + " Home Score " + response[i].HomeScore)
            // $("#nflteams").append("<tr><th scope=row>" + i + "</th><td>" + response[i].HomeTeam + "</td><td>" + response[i].PointSpread + 
            // "</td><td id=odds-" + i + "1>2</td><td id=place-bets-" + i + "><button class=btn btn-primary my-2 my-sm-0 pb id=pick-team-" + i + 
            // ">Select</button></td></tr>")

            $('#nflteams').append("<tr><th scope='row'>" + i + "</th><td>" + response[i].HomeTeam + 
            "</td><td>" + response[i].PointSpread + "</td><td id='odds-" + i + "'>2</td><td id='place-bets-" + i + 
            "'><button class='btn btn-primary my-2 my-sm-0 pb' id='pick-team-" + i + "'>Select</button></td></tr>")
            }
         })
    }      


    function buildQueryURL() {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var queryParams = { "api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931" };
        queryParams.q = "NFL";
        queryParams.begin_date = "20170101";
        queryParams.end_date = "20180101";
        return queryURL + $.param(queryParams);
        }
      function updatePage(NFLNews) {
        var numArticles = 3
      
        for (var i = 0; i < numArticles; i++) {
          var article = NFLNews.response.docs[i];
          var headline = article.headline;
          console.log(headline.main)
          var headlinelink = article.web_url;
          console.log(headlinelink)
        }
    }
     
        var queryURL = buildQueryURL();
      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(updatePage);
     

$(document).ready(function () {

    $('.bt').simpleMask({'mask': ['###']});
    
});

function hidethestack() {
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
}

hidethestack();
displaynflteams();
// displaynflnews();

// Test Harness: Realtime Calculations and DB Write
$('input').keyup(function () {
    calcbets();
    overbet();
});

// Test Harness: Interim Bet Engine
function calcbets() {
    
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

$(".pb").click(function () {
    $(this).attr("disabled", true);
    teamcounter++
    console.log("teamcounter " + teamcounter)
    // if (teamcounter === 3){
    //     $("#hide-the-welcome").hide();
    //     $("#hide-the-team").hide();
    //     $("#hide-the-bets").show();
    //     $("#hide-the-champs").hide();
    // }
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


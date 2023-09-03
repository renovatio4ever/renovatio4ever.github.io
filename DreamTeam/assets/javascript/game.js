// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos)
// Updated: 11.13.2018
// Purpose: Fantasy Football/Craps Betting Themed Game
// This code was built on JS, HTML, HTML5, CSS, CSS3, Firebase, and Bootstrap
// Note: This is a WIP, there is a bit of functionality that requires additional updates.


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

// Static wins losses and draws for the 3 teams selected
var wins1, wins2, wins3, loss1, loss2, loss3, draw1, draw2, draw3;
wins1 = wins2 = wins3 = loss1 = loss2 = loss3 = draw1 = draw2 = draw3 = 0;

var odds1, odds2, odds3;
odds1 = odds2 = odds3 = 0;

var team1earn, team2earn, team3earn;
team1earn = team2earn = team3earn = 0;

// Declared game variable stack
var totalbets = 0
var totaltokens = 5000
var tokensearned = 0
var totalearnings = 0
var betlocker = "false"
var currentplayer
var gameplayer
var teamcounter = 0

// Default Account Setup
var starter_tokensearned = "5000"
var starter_t1_earn = "0"
var starter_t2_earn = "0"
var starter_t3_earn = "0"
var starter_t_earnings = "0"

// API 1: Displays teams that users can select from to bet
function displaynflteams() {

    $.ajax({
            type: "GET",
            url: "https://api.fantasydata.net/v3/nfl/scores/JSON/GameStatsByWeek/2018/8?key=ad398993c55d46449bde67a4095fef1b",
            dataType: "json"
        })
        .done(function (response) {
            for (var i = 0; i < 10; i++) {

                //Use API to build each candidate "Team" Record
                $('#nflteams').append("<tr><th scope='row'>" + i + "</th><td>" + response[i].HomeTeam +
                    "</td><td>" + response[i].PointSpread + "</td><td id='odds-" + i + "'>2</td><td id='place-bets-" + i +
                    "'><button class='btn btn-primary my-2 my-sm-0 pb' id='pick-team-" + i + "'>Coming Soon</button></td></tr>")
            }
        })
}

// API 2: NFL News ticker for splash page on click

$('.teams').on('click', function () {


    $("#nflnewstable").empty();

    takemetothenews();

    var nflnewsitem = $(this).text();

    function buildQueryURL() {

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var queryParams = {
            "api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
        };
        queryParams.q = nflnewsitem;
        queryParams.begin_date = "20180101";
        queryParams.end_date = "20181101";
        return queryURL + $.param(queryParams);
    }

    function updatePage(NFLNews) {
        var numArticles = 6

        for (var i = 0; i < numArticles; i++) {
            var article = NFLNews.response.docs[i];
            var headline = article.headline;
            console.log(headline.main)
            var headlinelink = article.web_url;
            console.log(headlinelink)

            $('#nflnewstable').append("<tr><td> " + i + " </td><td><i> " + headline.main + " </i></td></tr>" +
                "<tr><td></td><td><a href=" + headlinelink + " target=\"_blank\">" + headlinelink + "</a></td></tr>")
        }
    }

    var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);

    // numArticles = 0
    // headline = ""
    // headlinelink = ""
})

// Manages bogus user
$(document).ready(function () {

    $('.bt').simpleMask({
        'mask': ['###']
    });

});

// Test Harness: Realtime Calculations and DB Write
$('input').keyup(function () {
    calcbets();
    overbet();
});

// Betting Form
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

}



$("#go-bet-now").click(function () {

    gameplayer = $("#thesearenotthedroids").val();

    database.ref().push({
        player: gameplayer,
        t_token: starter_tokensearned,
        t1_earn: starter_t1_earn,
        t2_earn: starter_t2_earn,
        t3_earn: starter_t3_earn,
        t_earnings: starter_t_earnings,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    console.log(gameplayer)
    console.log(starter_tokensearned)
    console.log(starter_t1_earn)
    console.log(starter_t2_earn)
    console.log(starter_t3_earn)
    console.log(starter_t_earnings)

    $("#mymodal-register").modal('show');
    $("#hide-the-welcome").hide();
    $("#hide-the-team").show();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
    $("#hide-the-news").hide();

});

function listthechamps() {

    let y = 0
    $("#tableChampion").empty();

    var database = firebase.database();
    database.ref().once('value', function (snapshot) {
        if (snapshot.exists()) {
            var content = '';
            snapshot.forEach(function (data) {
                y++
                var val = data.val();
                content += '<tr>';
                content += '<td>' + y + '</td>';
                content += '<td>' + val.player + '</td>';
                content += '<td>' + val.t_earnings + '</td>';
                content += '<td>' + val.t_token + '</td>';
                content += '</tr>';
            });
            $('#tableChampion').append(content);
        }
    });
}
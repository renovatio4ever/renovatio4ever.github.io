// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos)
// Updated: 11.13.2018
// Purpose: Fantasy Football/Craps Betting Themed Game

// Modal and Block

function hidethestack() {
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
    $("#hide-the-news").hide();
}

hidethestack();
displaynflteams();

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

// Disable Button Count

$(".pb").click(function () {
    $(this).attr("disabled", true);
});

// End Series
$("#go-back-to-teams").click(function () {
    $("#hide-the-news").hide();
    $("#hide-the-welcome").hide();
    $("#hide-the-team").show();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

$("#go-to-bet-board").click(function () {
    $("#hide-the-news").hide();
    $("#hide-the-welcome").hide();
    $("#hide-the-team").hide();
    $("#hide-the-bets").show();
    $("#hide-the-champs").hide();
});


$("#go-to-home").click(function () {
    $("#hide-the-news").hide();
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

$("#go-back-home-now").click(function () {
    $("#hide-the-news").hide();
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

$("#hide-the-news").click(function () {
    $("#hide-the-news").hide();
    $("#hide-the-welcome").show();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
});

function takemetothenews() {
    $("#hide-the-news").show();
    $("#hide-the-welcome").hide();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").hide();
};

$("#go-to-champs").click(function () {
    $("#hide-the-welcome").hide();
    $("#hide-the-team").hide();
    $("#hide-the-bets").hide();
    $("#hide-the-champs").show();
    $("#hide-the-news").hide();
    listthechamps();
});
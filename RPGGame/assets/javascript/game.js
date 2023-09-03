// Author: Peter Santiago
// Date: 10.13.2018
// Purpose: Simple Final Fantasy themed RPG game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap
// Note: The game is intended to by played with headphones or audio turned up.

// Launches welcome form

$(window).on('load', function () {
    $('#myModal').modal('show');
});

// Declaring game object variable

var baseATK = 0; // base ATK value
var player; // holds the player Object
var opponent; // holds the current opponent Object
var chararray = []; // array that stores the game characters (Objects)
var selectedplayer = false; // flag to mark if we picked a player yet
var selectedopponent = false; // flag to mark if we picked a opponent

// Character build comprised of name, hp, ap, counterattack (decrement) and the character picture

function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthpoints = hp;
    this.attackpower = ap;
    this.counterattackpower = counter;
    this.pic = pic;
}

// Increasing the attack strength (this attack strength + original attack strength) as it gets hit 

Character.prototype.increaseAttack = function () {
    this.attackpower += baseATK;
};

// Inherent the methods from the function object the character. Everytime
// player hits my opponent it's going to state that attackef for attackpower.
// Note my attackpower goes up everytime defender get hits. It's like the "rage-bar" in a classic video game fight
// that the key for ultimately defeating the remaining opponents.

Character.prototype.attack = function (Obj) {
    Obj.healthpoints -= this.attackpower;
    $("#msg").html("You attacked " +
        Obj.name + " for " + this.attackpower + " damage points.");
    this.increaseAttack();
};

// Same principle but for the opponent

Character.prototype.counterAttack = function (Obj) {
    Obj.healthpoints -= this.counterattackpower;
    $("#msg").append("<br>" + this.name + " counter attacked you for " + this.counterattackpower + " damage points.");
};


// Initializing all the characters that will be in play. I need an array so as to be able to reference them easily
// to display in the startinging, fighting, and opponent box.
// This approach allows me to add as many cards that can be feasibily presented in the window or browser
// Bootstrap takes care of autosizing each "card" as they are presented.

function initCharacters() {
    var tifa = new Character("Tifa Lockheart", 100, 10, 5, "assets/images/tifa.jpg");
    var seph = new Character("Sephiroth", 200, 50, 30, "assets/images/sephiroth.jpg");
    var kefka = new Character("Kefka Palazzo", 150, 15, 2, "assets/images/kefka.jpg");
    var cloud = new Character("Cloud Strife", 180, 30, 12, "assets/images/cloud.jpg");
    var midgard = new Character("Midgardsormr", 350, 20, 50, "assets/images/midgardsormr.jpg");
    var rinoa = new Character("Rinoa Heartily", 250, 80, 10, "assets/images/rinoa.jpg");
    var fran = new Character("Fran", 200, 25, 15, "assets/images/fran.jpg");
    chararray.push(tifa, seph, kefka, cloud, midgard, rinoa, fran);
}

// Storing attack power with each turn

function setBaseAttack(Obj) {
    baseATK = Obj.attackpower;
}

// Rounds
// validating if the character is alive otherwise ready the "defeated queue"

function isAlive(Obj) {
    if (Obj.healthpoints > 0) {
        return true;
    }
    return false;
}

// validates if the defender has won the round.

function isWinner() {
    if (chararray.length == 0 && player.healthpoints > 0)
        return true;
    else return false;
}

// Creating each "card" for players and opponenets. Only thing I'm displaying (intentionally) is name and HP
// Lining up all my defenders and opponents in a nice row.

function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < chararray.length; i++) {
        $(divID).append("<div />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img/>");
        $(divID + " img:last-child").attr("id", chararray[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", chararray[i].pic);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(chararray[i].name + "<br>");
        $(divID + " div:last-child").append("HP: " + chararray[i].healthpoints);
        $(divID + " idv:last-child").append();

    }
}

// Update the characters pictures location on the screen (move them between divs)

function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < chararray.length; i++) {
        $(toDivID).append("<img/>");
        $(toDivID + " img:last-child").attr("id", chararray[i].name);
        $(toDivID + " img:last-child").attr("src", chararray[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

// Sound Libary. I know I could have condensed this into an array and just play each from an index.
// I added this last minute though for brownie points.

function playAudio() {
    var audio = new Audio("assets/sounds/thecrystaltheme.mp3");
    audio.play();
}

function playAttack() {
    var audio = new Audio("assets/sounds/attack.mp3");
    audio.play();
}

function playWin() {
    var audio = new Audio("assets/sounds/win.mp3");
    audio.play();
}

// Change the view from the first screen to the second screen
function changeView() {
    $("#firstScreen").empty();
    $("#TheLight").empty();
    $("#secondScreen").show();
}


$(document).on("click", "img", function () {
    // Stores the opponent the user has clicked on in the opponent variable and removes it from the chararray
    if (selectedplayer && !selectedopponent && (this.id != player.name)) {
        for (var j = 0; j < chararray.length; j++) {
            if (chararray[j].name == (this).id) {
                opponent = chararray[j]; // sets opponent
                chararray.splice(j, 1);
                selectedopponent = true;
                $("#msg").html("Click the attack button!");
            }
        }
        $("#defenderDiv").append(this); // appends the selected opponent to the div 
        $("#defenderDiv").addClass("animated zoomInRight");
        $("#defenderDiv").append("<br>" + opponent.name);
        $("#defenderHealthDiv").append("HP: " + opponent.healthpoints);
        $("#defenderHealthDiv").addClass("animated zoomInRight");
    }
    // Stores the character the user has clicked on in the player variable and removes it from character array
    // For the background the first character of each name is incorporate in the file name. Just more efficient this
    // way as opposed to crafting code for every new image used.

    if (!selectedplayer) {
        for (var i = 0; i < chararray.length; i++) {
            if (chararray[i].name == (this).id) {
                player = chararray[i];
                playAudio();
                $("body").css({
                    "background-image": "url('assets/images/" + this.id[0] + ".jpg')"
                });
                setBaseAttack(player);
                chararray.splice(i, 1);
                selectedplayer = true;
                changeView();
                $("#msg").html("Pick Your Opponent!");
            }
        }

        // using the zoomIn animation from the massive library of animation borrowed. Thanks Daniel Eden!

        updatePics("#game", "#defendersLeftDiv");
        $("#playerDiv").append(this);
        $("#playerDiv").addClass("animated zoomIn");
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append("HP: " + player.healthpoints);
        $("#playerHealthDiv").addClass("animated zoomIn");
    }

});

// The attack button. Plays damage sound FX for each click.
// If else conditionals to determine if the player is still alive.

$(document).on("click", "#attackBtn", function () {
    if (selectedplayer && selectedopponent) {
        if (isAlive(player) && isAlive(opponent)) {
            playAttack();
            player.attack(opponent);
            opponent.counterAttack(player);
            $("#playerHealthDiv").html("HP: " + player.healthpoints);
            $("#defenderHealthDiv").html("HP: " + opponent.healthpoints);
            if (!isAlive(opponent)) {
                $("#defenderHealthDiv").html("DEFEATED!");
                $("#playerHealthDiv").html("Opponent defeated!");
                $("#msg").html("Pick another opponent to battle...");
            }
            if (!isAlive(player)) {
                $("#playerHealthDiv").html("DEFEATED!");
                $("#msg").html("You are <b>DEFEATED!!</b>, and your soul returns to the Crystal. Press the button to respawn anew, warrior!...");
                $("#attackBtn").html("Restart Game");
                $(document).on("click", "#attackBtn", function () { // restarts game
                    location.reload();
                });
            }
        }
        if (!isAlive(opponent)) {
            $("#defenderDiv").removeClass("animated zoomInRight");
            $("#defenderHealthDiv").removeClass("animated zoomInRight");
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            selectedopponent = false;
            if (isWinner()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
                playWin();
            }
        }
    }
});

// Making sure the document is ready for execution. Just a good habit to have this.

$(document).ready(function () {
    $("#secondScreen").hide();
    $("#globalMsg").hide();
    initCharacters();
    characterCards("#game");
});
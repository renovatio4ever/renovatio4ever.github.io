// Author: Peter Santiago
// Date: 12.15.2018
// Purpose: Bamazon Exercise
//Features: This code was built on Node JS, JS, mySQL

var figlet = require("figlet");
var inquirer = require("inquirer");
var colors = require("colors");

// runOptions();
bamazontitle();

function bamazontitle() {
    console.clear();
    console.log(colors.inverse.yellow("Welcome to..\n"));
    figlet.text('bamazon', {
        font: 'Ansi Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(colors.cyan(data));
        runOptions();
    });
}

function runOptions () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What is your role?",
        choices: [
            "Manager",
            "Supervisor",
            "Customer"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Manager":
                runManager();
                break;

            case "Supervisor":
                runSupervisor();
                break;

            case "Customer":
                runCustomer();
                break;
        }
    });
}

var runManager = function () {
    console.log("blah")
}

var runSupervisor = function () {
    console.log("blah")
}

var runCustomer = function () {
    console.log("blah")
}
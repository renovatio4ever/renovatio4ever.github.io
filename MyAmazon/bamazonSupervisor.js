// Author: Peter Santiago
// Date: 12.15.2018
// Purpose: Bamazon Exercise
//Features: This code was built on Node JS, JS, mySQL

require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');

// Connection to DB
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connecting to database")
    runOptions()
});

// Query Sales from DB

var viewProductSales = function () {
    var sqlQuery = "SELECT departments.department_id,departments.department_name,over_head_costs,  SUM(products.product_sales) AS product_sales , over_head_costs-SUM(products.product_sales) AS total_profit";
    sqlQuery += " FROM products  JOIN  departments ON products.department_name = departments.department_name";
    sqlQuery += " GROUP BY departments.department_name";
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
        var t = new Table;
        results.forEach(function (product) {
            t.cell('Department Id', product.department_id)
            t.cell('Department Name', product.department_name)
            t.cell('Overhead costs', product.over_head_costs)
            t.cell('Product sales', product.product_sales)
            t.cell('Total profit', product.total_profit)
            t.newRow()
        })
        console.log(t.toString())
        runOptions();
    })
}

// Add Department

var insertToDepartment = function (name, cost) {
    connection.query("INSERT INTO departments(department_name,over_head_costs)VALUES(?,?)", [name, cost], function (error, results, fields) {
        if (error) throw error;
    })
    console.log("\n You have successfully added the department\n")
    runOptions();
}

// User Menu

var runOptions = function () {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit Supervisor Console"

            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;
                    
                case "Exit Supervisor Console":
                console.clear();
                console.log("You have exited successfully");
                process.exit();
                break;
            }
        });
}

// Create New Department

var createNewDepartment = function () {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "what is the  name of the department you would like to add ?",

        },
        {
            name: "cost",
            type: "input",
            message: "what is the  overhead costs of the department ?",

        }
    ])
        .then(function (answer) {
            var departmentName = answer.department;
            var overheadCost = answer.cost;
            insertToDepartment(departmentName, overheadCost);
        })
}
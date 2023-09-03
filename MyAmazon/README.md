# BAMAZON

[![BAMAZON Title](./assets/images/amazontitle.jpg)](https://renovatio4ever.github.io/MyAmazon/)

## **Description**
Amazon-like storefront application using Node.js and MySQL. It presents three interfaces: customer, manager and Supervisor.

## **Bamazon Demo**
You can  watch the demo of the Bamazon customer,manager, and supervisor interfaces at the link below. 

## **NPM Packages Used :**
mysql, inquirer, easy-table, dot-env, and colors npm packages

## **MySQL Database Setup**
To run this application, you need to setup MySQL database  on your machine. then you will need to create bamazon database and both products and departments table with the SQL code found in bamazon.sql. Run this code inside your MySQL client then you will be ready to proceed with running the bamazon customer, manager and suoervisor interfaces.

## **Getting Started**
to run this app you will need to :
* Clone repo.
* Run command in Terminal or Gitbash 'npm install'
* Run command depending which mode you would like to be on:
    * Customer - 'node  bamazonCustomer.js'
    * Manager - 'node bamazonManager.js'
    * Supervisor - 'node bamazonSuoervisor.js'


## **Features**
* Each module contains an exit option to exit each routine cleanly

## **Supervisor Console**
This is a demo of the Supervisor console. Supervisors can create departments, and view all sales relevant to that department

[![Supervisor Console Demo](./assets/images/howto_supervisor.gif)](https://renovatio4ever.github.io/MyAmazon/)

## **Manager Console**
This is a demo of the Manager console. Managers can view low inventory, add inventory, and add new products.

[![Manager Console Demo](./assets/images/howto_manager.gif)](https://renovatio4ever.github.io/MyAmazon/)

## **Customer Console**
This is a demo of the Customer console. Customers can purchase items by number of units.

[![Customer Console Demo](./assets/images/howto_customer.gif)](https://renovatio4ever.github.io/MyAmazon/)

## **MySQL Console**
This is a quick view of the actual mySQL table containing the contents of bamazon called by node JS.

[![mySQL Bamazon Administration](./assets/images/howto_bamazonsql.gif)](https://renovatio4ever.github.io/MyAmazon/)
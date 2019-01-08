# Burger Logger (A.K.A. "EAT-MAH-BURGER")

Eat-Mah-Burger is a simple data (hamburger) logger built on express, and mySQL. Visitors will enter and consume custom burgers left behing by visitors across the galaxy. Consumed burgers are stored in SQL. The solution was built leveraging several technical principles including MVC and ORM.

### Selfie of Eat Mah Burger

[![Eat Mah Burgers](http://i64.tinypic.com/m7vzow.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger/)

### Not convinced? Queue in the video

[![Eat Mah Burgers The Movie - Rated: Delicious](./public/assets/img/mahburgervid.gif)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger)

### Github Repository

[Github Site](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger)

### Live Heroku Site

Coming soon to a dinner table near you. Bring your appetite!

### Approach Taken

Eat Mah Burger was crafted leveraging the MVC and ORM technical application

#### Model View Controller (MVC)

The application was crafted using the Model View Controller (MVC) architectural patterh. All the components in the code set have been organized into the categories that make up the MVC Model. The approach makes for a clean, organized and scalable approach to coding via interconnecting parts that pass data and functionality between one another. See here for additional information: 

[What is MVC anyway?](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

##### Model

Sample object model to query for the all the burgers (in Valhalla) stored in the DB. The callback "cb" is the result of the query.

```
var burger = {
    all: function(cb) {
        orm.all("burgers", function(result) {
            cb(result);
        });
    },
}
```

##### View

The application leverages handlebars! An extremely fluid and robust component that allows for clean integration of data and html via semantic scaffolding. Handlebars provides for a poweful way to present result data from the backend without the need to create multiple pages. From a high level handlebars allows the Picaso's in us to preserve advanced (i.e. bootstrap) HTML formatting while allowing for the insertion of data from the controller. The insertion occurs through marked "mustaches" or triple curly brackets where we want the data (or even another html) to propogate. The following snippet depicts where each burger will be listed. handlebars supports logic to determine where the data (or in this case: burger) data will be presented. New burgers will be added to the left side of the web site with the option to eat it, whereas burgers that were consumed (often with fried) will be stored on the right side of the site.

```
<div class="panel-panel default">
			<h3 class="title">Eat my creations:</h3>
			<ul class="list-group">
				{{#each burgers}}
				{{#unless this.devoured}}
				<li class="list-group-item">
					<div class="input-group">
						<p class="lead"> {{this.burger_name}} </p>
						<span class="input-group-btn">
```


##### Controller

Just like an air traffic controller this component "routes" input and output data to specific models that in turn makes requests to the backend for data to present to the front end. This snippet routes user input to the 

```
router.post("/burgers", function(req, res) {
    burger.create(
        ["burger_name"], [req.body.b_name], function() {
            res.redirect("/burgers");
        });
});
```


#### Object Relational Mapping (ORM)

The application also applies a computer principle called Object Relational Mapping or ORM to add, and read data from the database. An ORM can be leveraged to query for the entire content of a DB table. 

Example: 

```
SELECT * FROM burgers
```
Translates to the following as an ORM to capture, connect, query, and pass a response back to the corresponding controller.

```
all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
```
ORM database call to list all the burgers that are enjoying respite in Valhalla. The ORM esablishes a connection to query the DB leveraging the parametes passed.

### Technology Used

This application leverages the following technologies

```
* Node.JS
* Express
* JavaScript
* JQuery
* Bootstrap
* HTML
* CSS
* MySQL
* Handlebars
* MVC/ORM
```

### Installation the burger application

The following are the steps required for installing and configuring the totally awesome burger application.

###### Step 1: Clone the repository

- visit github and execute a clone of the "burgerlogger" repository
- git clone https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger

###### Step 2: Install the required npm packages

- Launch VSC IDE and install the following packages
- "npm i express" (Web Servlette)
- "npm i mysql2" (Data)
- "npm i express-handlebars" (Views)

Optional Packages

- "npm i method-override" (logic for DB loader)

###### Step 3: Create a home for our burgers. The Database.

[![The Burger Database](http://i64.tinypic.com/t9ie0h.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger/)

- Launch mySQL IDE and execute the SQL statements in the db folder
- The script will create the DB, and seed the DB with content

###### Step 4: Configure the Database connection

- In the config folder modify the connections.js file with the appropriate db name, user, and password credentials

```
   connection = mysql.createConnection({
	host: "your_db_name",
	user: "root",
	password: "your_password",
	database: "your_burger_db"
    port: "your_db_port_num"
```
Note: Custom DB ports will need to be added.

###### Step 5: Launch the super cool burger application

- In the VSC IDE execute "node server.js"
- The application will launch in port 3002
- Open your browser to http://localhost:3002/
- Start crafting some unique burgers for the world to devour!

### The User Manual. We welcome all burgers!

[![How does he do it?](http://i68.tinypic.com/2zsa3j5.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger/)

```
1. Enter in a funky burger from the deepest dream state
2. Press the Order Up button, and your burger will be posted to be eaten by anyone in the Galaxy
3. Eat the burger! Enjoy the savory taste of your burger or that of someone elses
4. You burger's spirit will not perish, but will be added among the greats in Burger Valhalla.
```

### Road Map

- Upgrade to Sequelize
- Host in Heroku leveraging SharkDB
- Stretch: Add option to supersize the order with fries and a cola.





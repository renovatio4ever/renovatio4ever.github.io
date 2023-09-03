# Burger Logger (A.K.A. "EAT-MAH-BURGER") Sequelized Edition.

Eat-Mah-Burger is a simple data (hamburger) logger built on express, and now hosted on it's own Herkoku server. Visitors will enter and consume custom burgers left behing by visitors across the galaxy. Consumed burgers are stored in SQL. The solution was built leveraging several technical principles including MVC and ORM.

### Selfie of Eat Mah Burger

[![Eat Mah Burgers](http://i64.tinypic.com/m7vzow.jpg)](https://eatdaburger-redux.herokuapp.com/)

### Not convinced? Queue in the video

[![Eat Mah Burgers The Movie - Rated: Delicious](./public/assets/img/mahburgervid.gif)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger-Sequelized)

### Github Repository

[Github Site](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger-Sequelized)

### Live Heroku Site (NEW!!)

[Live Heroku Site](https://eatdaburger-redux.herokuapp.com/)

### Approach Taken

Eat Mah Burger was crafted leveraging the MVC and ORM technical application, then converted to sequelize for hosting on Heroku.

#### Model View Controller (MVC)

The application was crafted using the Model View Controller (MVC) architectural pattern. All the components in the code set have been organized into the categories that make up the MVC Model. The approach makes for a clean, organized and scalable approach to coding via interconnecting parts that pass data and functionality between one another. See here for additional information: 

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


##### Controller (a.k.a Routes)

Just like an air traffic controller this component "routes" input and output data to specific models that in turn makes requests to the backend for data to present to the front end. This snippet routes user input to the /burgers functions.

```
router.post("/burgers", function(req, res) {
    burger.create(
        ["burger_name"], [req.body.b_name], function() {
            res.redirect("/burgers");
        });
});
```

#### Sequelize

Sequelize is an ORM specifically for node.js. It makes relating to database objects much easier, and more robust as it comes replete with amazing promised based features. In this example sequelize is used to list all (.findAll) records in the burger table. Note: No SQL statements written!! This approach inherently removes sql injections, and adds a layer of security. Sequelize also makes it easier to port code from one DB to another.

```
app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (result) {
            var hbsObject = {
                burger: result
            };
            res.render("index", hbsObject);
        });
    });
```

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
* JawsDB (NEW)
* Handlebars
* MVC/ORM
* Sequelize (NEW)
```

### Installation the burger application

The following are the steps required for installing and configuring the totally awesome burger application.

###### Step 1: Clone the repository

- visit github and execute a clone of the "burgerlogger" repository
- git clone https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger-Sequelized

###### Step 2: Install the required npm packages

- Launch VSC IDE and install the following packages
- "npm i express" (Web Servlette)
- "npm i express-handlebars" (Views)
- "npm i mysql2" (Database)
- "npm i sequelize" (Controller query)

Optional Packages

- "npm i method-override" (logic for DB loader)

###### Step 3: Create a home for our burgers. The Database.

[![The Burger Database](http://i64.tinypic.com/t9ie0h.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger-Sequelized/)

- Local execution: Launch mySQL IDE and execute the schema.sql script in the db folder
- The script will create the DB.
- Note: Sequelize will build the required table complete with indexes! It will also at createdAt, and updatedAt columns.

###### Step 4: Configure the Database connection for heroku

- In the config folder modify the connections.js with environmental. Note: since this application is being uploaded to Heroku, profiles were created to distinguish between the local and remote DB. Local execution of the application connects to the mySQL, while remote execution (hosted on heroku) the application will connect to (in this case) JawsDB.

```
// local (MySQL) configuration

"development": {
    "username": "root",
    "password": "your-pass-word",
    "database": "burgers_seq_db",
    "host": "localhost",
    "dialect": "mysql"
  },

// remote (JawsDB) configuration

  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
```

###### Step 5: Launch the super cool burger application

- In the VSC IDE execute "node server.js"
- The application will launch in the pre-defined port
- Open your browser to http://localhost:8080/
- Start crafting some unique burgers for the world to devour!

### The User Manual. We welcome all burgers!

[![How does he do it?](http://i68.tinypic.com/2zsa3j5.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/BurgerLogger-Sequelized/)

```
1. Enter in the name of the burger from your deepest dream state
2. Press the Order Up button, and your burger will be posted to be eaten by anyone in the Galaxy
3. Eat the burger! Enjoy the savory taste of your burger or that of someone elses
4. You burger's spirit will not perish, but will be added among the greats in Burger Valhalla.
```

### Road Map

- Add option to supersize the order with fries and a cola.

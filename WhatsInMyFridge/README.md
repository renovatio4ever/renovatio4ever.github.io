# WHAT's IN YOUR FRIDGE

What's in your fridge is a simple food recipe and wine pairing application built atop node js technology. 

### Who came up with the idea and why?

Once upon a time there were three hungry developers that didn’t know what to eat just prior to a huge development project. None of them wanted to leave their offices to scavenger for eats. All they wanted to do was satiate their appetites. “What’s in the fridge!?” exclaimed a developer. An application was born

### How does it work?

What’s in your fridge is a simple application that exposes the joys of cooking at home using just the ingredients in your fridge. Just provide the ingredients and the application will present instant recipes that you can craft at home based on your selection. Moreover the application will optionally find that perfect wine in your cellar to pair with your delicious home cooked cuisine.

### Quick start guide

[![Raiding Your Fridge 101](https://imageshack.com/a/img923/3251/DwVb0j.jpg)](https://github.com/nehasahay/Project2)

```
1. Browse to https://whatsinyourfridge.herokuapp.com/
2. New Users: Select Register Link
3. Provide Full Name, Valid email, and Password (No special characters!)
3. Log in with newly created user name and password
4. Walk up to your fridge, and enter in 2 ingredients seperated by a comma
5. Application will return a maximum of 10 recipes, and a recommended wine to accompany the recipes
```

### Selfie of What's in your fridge

[![What's in your fridge](https://imageshack.com/a/img924/7430/CYQUMC.jpg)](https://whatsinyourfridge.herokuapp.com/)

### Still Need Proof? Queue In the Video

[![What's In Your Fridge](https://imageshack.com/a/img923/9364/GG3ktw.gif)](https://whatsinyourfridge.herokuapp.com/)

### Github Repository

[Github Site](https://github.com/nehasahay/Project2)

### Live Heroku Site (NEW!!)

[Live Heroku Site](https://whatsinyourfridge.herokuapp.com/)

### Approach Taken

What's in your fridge was developed using the full stack methodology with specific focus on MVC, and ORM technical applications. The application was compiled for hosting on the Heroku platform with JawsDB as the backend.

#### Model View Controller (MVC)

What's in your fridge was developed using the Model View Controller (MVC) architectural pattern. All the components in the code set have been organized into the categories that make up the MVC Model. The approach makes for a clean, organized and scalable approach to coding via interconnecting parts that pass data and functionality between one another. See here for additional information: 

[What is MVC anyway?](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

##### Model

Sample object model for the pairing database

```
module.exports = function (sequelize, DataTypes) {
    var Pairings = sequelize.define("Pairings", {
        food_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },

        ...

    return Pairings;
};
```

##### View

The application leverages pugJS! An extremely fluid and robust server side templating agent that allows for clean integration of routable data and html via short hand semantic scaffolding. pugJS provides for a poweful way to present result data from the backend without the need to create multiple pages. From a high level pugJS allows for creative license to leverage sophisticated FE packages (i.e. bootstrap) formatting while allowing for the insertion of data from the controller. The insertion occurs through containers where the data (and even other nested html) to propogate. The following is a snippet of the main html container with nested container for the body and foooter. pugJS supports logic to determine where the data will be presented. 

```
doctype html
html  
    head
        title What's In Your Fridge?
        include includes/head.pug
    body
        include includes/nav.pug
        .container
            main
                block content
            footer
                //- | cool footer with lots of copyrights
        include includes/scripts.pug
        block scripts
```


##### Controller (a.k.a Routes)

Just like an air traffic controller this component "routes" input and output data to specific models that in turn makes requests to the backend for data to present to the front end. This snippet routes user input for authentication.

```
app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email , id and fullname
      res.json({
        email: req.user.email,
        id: req.user.id,
        fullname: req.user.fullname
      });
    }
  });

```

#### Sequelize

Sequelize is an ORM specifically for node.js. It makes relating to database objects much easier, and more robust as it comes replete with amazing promised based features. In this example sequelize is used to find a matching (.findOne) "wine type" record from the pairings database from the ingredient passed from the front end UI. Note: No SQL statements are written!! This approach inherently removes sql injections, and adds a layer of security. Sequelize also makes it easier to port code from one DB to another.

```
 db.Pairings.findOne({
                where: {
                    food_type: recipe
                }
            })
            .then(function (response) {
                // console.log(response.wine_type);

                axios.get("http://api.snooth.com/wines/?", {
                        params: {
                            "akey": process.env.AKEY,
                            "ip": req.connection.remoteAddress,
                            "q": response.wine_type,
                            "xp": 30,
                            "n": 1
                        }
                    })
```

### Technology Used

This application leverages the following technologies

- PassportJS  | User Authentication       
- PugJS       | App Front End Scaffolding 
- Node.JS     | Server Side App           
- Express     | DB                        
- Materialize | Authentication Form       
- Bootstrap   | Overall App FE Design     
- HTML        | Base App FE code          
- CSS3        | App Style                 
- MySQL       | Local Test Database       
- JawsDB      | Production Database       
- Sequelize   | Server Side SQL Query     
- D3          | Reporting                 


### D3 Documentation Technology & Reporting

A simple localized report was generated using D3 (https://d3js.org/). D3 is a sophisticated library of javascripts that manipulate data documents leveraging HTML, SVG, and CSS. It is extremely powerful in that the data presented is used to drive the graphical interface and interactions of the document. D3 requiers only a single script header to take advantage of the immense library of graphically interactive reporting packages

```
<script src="http://d3js.org/d3.v3.min.js"></script>
```

This application leverages the D3 dashboard library to create a simple interactive report of the top 10 ingredients found in the refridgerator

[![WIYF D3 Reporting](https://imageshack.com/a/img924/2132/9iBbjG.jpg)](https://d3js.org/)

```
Features:
- Click on bars to adjust pie chart
- Click on pie chart to adjust bars
```

### Installing What's In My Fridge

The following are the steps required for installing and configuring the totally awesome burger application.

###### Step 1: Clone the repository

- visit github and execute a clone of the "whatsinmyfridge" repository
- git clone https://github.com/nehasahay/Project2.git

###### Step 2: Install the required npm packages

- npm i "package"
- axios           | 0.18.0
- bcrypt-nodejs   | 0.0.3 
- chai            | 4.2.0 
- dotenv          | 6.2.0 
- express         | 4.16.2
- express-session | 1.15.6
- mocha           | 5.2.0 
- mysql2          | 1.5.1 
- passport        | 0.4.0 
- passport-local  | 1.0.0 
- path            | 0.12.7
- pug             | 2.0.3 
- sequelize       | 4.22.15


###### Step 3: Create the user and pairing database

[![The Recipe Database](https://imageshack.com/a/img921/1737/fBa41P.jpg)](https://whatsinyourfridge.herokuapp.com/)

- Locate the db directory in the project
- Launch MySQL Manager
- Copy/Paste & Execute Schema.sql to create the database
- Note: Sequelize will build the required table complete with indexes! It will also at createdAt, and updatedAt columns.

###### Step 4: Configure the Database connection for heroku

- In the config folder modify the connections.js with environmental. Note: since this application is being uploaded to Heroku, profiles were created to distinguish between the local and remote DB. Local execution of the application connects to the mySQL, while remote execution (hosted on heroku) the application will connect to (in this case) JawsDB.

```
// local (MySQL) configuration

"development": {
    "username": "root",
    "password": "your-pass-word",
    "database": "recipe_db",
    "host": "localhost",
    "dialect": "mysql"
  },

// remote (JawsDB) configuration

  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
```

###### Step 5: Launching the application

- In the VSC IDE execute "node server.js"
- The application will launch in the pre-defined port
- Open your browser to http://localhost:8080/
- Start crafting some unique burgers for the world to devour!

### Road Map

- Nutritional Data (3DS Reporting)
- ReactJs Technology Application
- Migrate to MongoDB
- Enhanced Registration and Authentication
- Extended Context Driven Sommelier Pairing DB
- Price, Allergy and Caloric Filtering
- Social Media Referencing (Sharing Recipes)
- Scheduling and Reminder Recipe Services


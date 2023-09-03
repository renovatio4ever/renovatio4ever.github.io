# VR News Info Cube

This application is a spin off the npm scraper and NYT News assignment.

### Woah, wait, what's the twist?

I got bored of the 2D approach, stared at my VR goggles and ..viola.. 3D Cube with news in it!

### How does it work?

VR News cube is a simple scraper application that scrapes the news (via the Cheerio npm) and presents the news into a 3D cube. Users simple click on the cube to view the next news article stored in MongoDB. Users have the option to write and save their comments for the world to see. 

### Application Selfie

[![VR News Info Cube](https://imageshack.com/a/img923/7434/R9oSXT.jpg)](https://github.com/renovatio4ever/renovatio4ever.github.io/tree/master/VRNewsCube)

### What?! Not convinced? Queue in the video!

[![VR News Info Cube](https://media.giphy.com/media/1dLj1grT2UIFRnBTkZ/giphy.gif)](https://nanovrnewscube.herokuapp.com/)

### Quick start guide

How to use "The News Cube"

```
1. Browse to https://nanovrnewscube.herokuapp.com/
2. Click on small neon cube to lower left of the application
3. A larger cube and two forms will appear. The form to the left allows for commentary, the center main or Cube presents the scraped news, the form to the right presents all commnets made over time.
4. Click anywhere on the larger cube to change information
```

### Approach Taken

The application was designed implementing the following technologies and approach

- Cheerio: (https://www.npmjs.com/package/cheerio) An npm scraper that allows the user to define segments of html to capture and store as a variable or actual string in a database. In this case Cheerio was used to capture (or scrape) news from the NY Times API, and store into a database

[![mLab MongoDB](https://imageshack.com/a/img924/1865/uqsOT9.png)](https://mlab.com/)

- MongoDB: (A free form (no-SQL) database that allows us to store data in BSON (JSON equivalent) format. The advantage of this is that any data can be stored as a JSON object only to be called again in an application. In this case I read the records of scraped articles and use it to populate my Cube.

[![CSS3 Cube](https://imageshack.com/a/img923/8066/Uzcrqr.gif)](https://3dtransforms.desandro.com/cube)

- CSS3 Cube: I wanted a completely different, more futuristic and interactive way to view data. After watching the SAO anime, I was motivated to use a 3D VR medium to present data. CSS3 Cube was definitely the way to go. In this case I passed each record of scraped news into a CSS3 cube that changes with each click.

```
#cube .front  { transform: rotateY(   0deg ) translateZ( 202px ); }
#cube .back   { transform: rotateX( 180deg ) translateZ( 202px ); }
#cube .right  { transform: rotateY(  90deg ) translateZ( 202px ); }
#cube .left   { transform: rotateY( -90deg ) translateZ( 202px ); }
#cube .top    { transform: rotateX(  90deg ) translateZ( 202px ); }
#cube .bottom { transform: rotateX( -90deg ) translateZ( 202px ); }

#cube.show-front  { transform: translateZ( -100px ) rotateY(    0deg ); }
#cube.show-back   { transform: translateZ( -100px ) rotateX( -180deg ); }
#cube.show-right  { transform: translateZ( -100px ) rotateY(  -90deg ); }
#cube.show-left   { transform: translateZ( -100px ) rotateY(   90deg ); }
#cube.show-top    { transform: translateZ( -100px ) rotateX(  -90deg ); }
#cube.show-bottom { transform: translateZ( -100px ) rotateX(   90deg ); }

#cube { transition: transform 2s; }

```

#### Model View Controller (MVC)

The application was developed applying the MVC approach

##### Model

Sample Model

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary:{
    type: String,
    required: true
  },
  date: String,
});
```

##### View

Scaffolding for the VR Cube. Note: that the divs within the scaffolding change 

```
  <div id="headline"></div>
    <div id="cube">
      <figure class="front">
        <div id="face-color"></div>
      </figure>
      <figure class="back">
         <div id="face-color"></div>
      </figure>
      <figure class="right">
         <div id="face-color"></div>
      </figure>
      <figure class="left">
         <div id="face-color"></div>
      </figure>
      <figure class="top">
         <div id="face-color"></div>
      </figure>
      <figure class="bottom">
         <div id="face-color"></div>
      </figure>
    </div>
  </section>
```


##### Controller 

Snippet of fetch function. This function retrieves 100 articles from the NY Times API. This code is called internally and was not exposed externally so as not to spam the API. Public API's do NOT like to be spammed and can block excessive requests. This is a "use once, throw away for demo" execution.

```
exports.fetch = function() {

  // runs scrape and save as object (for mongodb)
  scrape("http://www.nytimes.com", function(data) {
    var obj = data;

    // date goodness
    var formattedDate = makeDate();
    for (var i in obj) {
      addIfNotFound(i);
    }

```

#### MongoDB

[![Mlab MongoDB](https://imageshack.com/a/img924/7261/rA2zBW.jpg)](https://mlab.com/)

For this exercize mlab was used to host the mlab database. This made it easy to upload the code to Heroku without the headache of having to add and configure the component. Again, mongoDB makes it possible to write and read data in the preferred JSON model. A collection (aka table) was created for the storage of articles and another for the storage of the notes.

MongoDB is no-SQL, it is non-relational. That said any desired relationships would need to be crafted in code for presentation to the front-end. .populate is typically used to associate records from one collection with another. I preferred to refer each note to it's corresponding article by id. That said .find was the preferred. Note! I sort first before applying .find for performance sake.

Sample "Join" call using .find (Id). 

```
exports.gather = function(data, cb) {
  Note.find({
    _headlineId: data.id
  })
  .sort({
    id: -1
  })
  .exec(function(err, doc) {
    cb(doc);
  });
};

```


Sample Article Query
```
db.getCollection("headlines").find({}).pretty()

{
	"_id" : ObjectId("5875d12191378f0011876acd"),
	"headline" : "Trump Received Unsubstantiated Intelligence on Ties to Russia",
	"summary" : "The uncorroborated summary says that Russia had salacious information about President-elect Donald J. Trump. It is based on memos generated by political operatives seeking to derail Mr. Trump’s candidacy.",
	"date" : "1_11_2017",
	"__v" : 0
}
```

### Technology Used

This application leverages the following technologies

- HTML5
- CSS, CSS3 (Cube)
- Cheerio NPM
- Express
- Handlebars
- Mongoose
- MongoDB (Mlab)
- NodeJS

### Installing VR News Info Cube

- Clone https://github.com/renovatio4ever/renovatio4ever.github.io.git/VRNewsCube in "VRNewsCube
- install npm packages

```
"cheerio": "^0.20.0",
"express": "^4.13.4",
"express-handlebars": "^3.0.0",
"mongoose": "^4.4.6",
"path": "^0.12.7",
"request": "^2.69.0"
```

- Configure Mlab, and apply appropriate credentials

```
// MongoDB connector
mongoose.connect('mongodb://vrnewsbot:vrN3ws1@ds249123.mlab.com:49123/nanovrenterprise');
var db = mongoose.connection;
```

- Run the scraper
- Launch the solution in port 3055
- Enjoy

### Road Map

- Leverage an Occulus Rift Bridge (https://github.com/Instrument/oculus-bridge) so that users can actually enjoy VR News in it's intended enviroment
- Get rid of tunnel.gif, put some stars.. Make it appear the user is gettings news from outer space.. maybe above Earth.

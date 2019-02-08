/* Web Scraper Homework Solution Example */

// Require our dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

// Instantiate our Express App
var app = express();

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

// MongoDB connector
mongoose.connect('mongodb://vrnewsbot:vrN3ws1@ds249123.mlab.com:49123/nanovrenterprise');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// bring in our routes file into the the server files
var routes = require('./config/routes.js');

// Incorporate these routes into our app
app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);


// set up our port to be either the host's designated port, or 3055
var port = process.env.PORT || 3055;

// set our app to listen on the port.
app.listen(port, function() {
    console.log("lisenting on port:" + port);
});

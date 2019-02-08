// Routes Content

// require express
var express = require('express');

// instantiates the router
var router = express.Router();

// call the scraper
var scrape = require('../scripts/scrape.js');

// headline and notes route
var headlinesController = require('../controllers/headlines.js');
var notesController = require('../controllers/notes.js');

// calling the JSON from MongoDB
router.get('/', function(req, res) {
    res.render('home');
});

//test route
router.get('/test', function(req,res) {
    // grab the article information from nytimes
    scrape("http://www.nytimes.com", function(data) {
        // send to browser as json
        res.json(data);
    });
});

// fetch more news. Need to call it with a route directly
router.post('/fetch', function(req, res) {
    headlinesController.fetch();
    // send a success message to the browser
    res.send('success');
});

// get data from mongodb
router.get('/check', function(req, res) {
    headlinesController.check(function(data) {
        // send the article data to a json
        res.json(data);
    });
});

// calls associated notes from routing controller
router.post('/gather', function(req, res) {
    notesController.gather(req.body, function(data) {
        res.json(data);
    });
});

// save our notes (note: save is used)
router.post('/save', function(req, res) {
    notesController.save(req.body, function(data) {
        res.json(data);
    });
});

// delete notes router
router.delete('/delete', function(req, res) {
    notesController.delete(req.body, function(data) {
        res.json(data);
    });
});

// export stuff
module.exports = router;

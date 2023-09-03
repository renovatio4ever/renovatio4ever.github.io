// headlines controller
// scraper and date declaration
var scrape = require('../scripts/scrape.js');
var makeDate = require('../scripts/date.js');

// call headlines and mongoose notes
var Headline = require('../models/Headline');
var Note = require('../models/Note');


// exporting a fetch
exports.fetch = function() {

  // runs scrape and save as object (for mongodb)
  scrape("http://www.nytimes.com", function(data) {
    var obj = data;

    // date goodness
    var formattedDate = makeDate();
    for (var i in obj) {
      addIfNotFound(i);
    }

    // note validations
    function addIfNotFound(current) {
      Headline.findOne({
        'headline': obj[current][0]
      }, function(err, res) {
        if (err) {
          console.log(err);
        }
        // avoide duplicates!
        if (res === null) {
          var headlineEntry = new Headline({
            headline: obj[current][0],
            summary: obj[current][1],
            date: formattedDate
          });
          // save new entry to db
          headlineEntry.save(function(err) {
            if (err) {
              console.log(err);
            } 
            else {
              console.log('successfully added');
            }
          });
        }
      });
    }

  });
};

// validation callback
exports.check = function(cb) {
  Headline.find()
    .sort({
      _id: -1
    })
    .exec(function(err, doc) {
      cb(doc);
    });
};

// The News Scrape Engine

// take in request and cheerio, thus making our scrapes possible
var request = require('request');
var cheerio = require('cheerio');

// this fucntion will scrape the NYTimes website (cb is our callback)
var scrape = function(url, cb) {

  if (url == "http://www.nytimes.com") {
    request(url, function(err, res, body) {
      var $ = cheerio.load(body);
      var articles = {};
      $('.theme-summary').each(function(i, element){
        var head = $(this).children(".story-heading").text();
        var sum = $(this).children(".summary").text();
        if (head !== "" && sum !== ""){
          // headline parsing
          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          articles[i] = [headNeat]; 
          articles[i].push(sumNeat);
        }
      });

      console.log(articles); 
      cb(articles);
    });
  }
};

module.exports = scrape;

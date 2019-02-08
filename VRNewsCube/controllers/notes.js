// notes controller
// get the date formatting function from out scripts
var makeDate = require('../scripts/date.js');

// models again
var Headline = require('../models/Headline');
var Note = require('../models/Note');

// save a note
exports.save = function(data, cb) {
  
  // create a formatted date
  var formattedDate = makeDate();

  // make a newNote with the note model, saving the apropos info
  var newNote = new Note ({
    _headlineId:data.id,
    date:data.date,
    noteText:data.note
  });

  // save the newNote we made to mongoDB with mongoose's save function
  newNote.save(function(err, doc){
    if (err) {
      console.log(err);
    } 
    else{
      console.log(doc);
      cb(doc);
    }
  });
};

// gather notes for a news article. (.exec used in place of .then after finding an article)
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

// delete all notes from an article
exports.delete = function(data, cb) {
  Note.remove({
    _headlineId:data.id
  }, function(err, removed){
    // log any errors
    if(err){
      console.log(err);
    } 
    else {
      console.log("Delete Sucessful");
      cb(removed);
    }
  });
};

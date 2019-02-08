// Notes model
// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noteSchema = new Schema({
  _headlineId: {
      type: Schema.Types.ObjectId,
      ref: 'Headline'
  },
  date: String,
  noteText: String
});

// create the Note model using the noteSchema
var Note = mongoose.model('Note', noteSchema);

module.exports = Note;

// Headline model
// require mongoose
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

// create the Headline model using the headlineSchema
var Headline = mongoose.model('Headline', headlineSchema);

module.exports = Headline;

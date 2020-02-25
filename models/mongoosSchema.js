const mongoose = require('mongoose'); // requiring the module

const userSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  //username: {type: String, unique: true},
  user_id:{type: String},
  age:{type: String},
  sex:{type: String},
  focus:{type: String},
  political_or:{type: String},
  q0:{type: Array},
  q1:{type: Array},
  q2:{type: Array},
  q3:{type: Array},
  q4:{type: Array}
});

module.exports = mongoose.model('User', userSchema); // exporting the user data


// TOMORROW
// set up heroku app
// create the app so participant don't get to choose which quest will fill

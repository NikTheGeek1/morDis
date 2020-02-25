// collecting data from the questionnaire
'use strict';
const User = require('../models/mongoosSchema'); // fetching the userSchema in the user model

module.exports = function(_){
  return {
    SetRouting: function(router){
      router.post('/q_data', this.postQ_data);
    },
    postQ_data: function(req, res){
      const newUser = new User();
      // for each result we take from the client side (questionnaires) we
      // pass it into the newUser schema
        _.forEach(req.body, function(val, key){
        newUser[key] = val;
        console.log(newUser);
      });
      newUser.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

      }
    }
  }

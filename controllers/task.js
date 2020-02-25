'use strict';

module.exports = function(){
  return {
    SetRouting: function(router){
      router.get('/quests_app', this.getTask);
      router.post('/quests_app', this.postTask);
    },
    postTask: function(req, res){

      var submitted_q = req.body;
      return res.render('task', {quests:Object.values(submitted_q)})
    },
    getTask: function(req, res){
      return res.render('task');
    }
  }

}

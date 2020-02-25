'use strict';

module.exports = function(){
  return {
    SetRouting: function(router){
      router.get('/', this.getIndexPage)
    },
    getIndexPage: function(req, res){
      return res.render('index');
    }
  }

}

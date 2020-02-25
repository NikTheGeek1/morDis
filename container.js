const dependable = require('dependable'); // a module which helps us register modules just once
const path = require('path');
const container = dependable.container();

const moduleArray = [
  ['_', 'lodash']
];

moduleArray.forEach(function(val){
  container.register(val[0], function(){
    return require(val[1]);
  })
});

container.load(path.join(__dirname, '/controllers')); // this is for making use
// of every file which is in the controllers directory
container.load(path.join(__dirname, '/helpers'));

container.register('container', function(){
  return container
});

module.exports = container;

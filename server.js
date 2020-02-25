const express = require('express'); // express is a module that works with nodejs
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const container = require('./container');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');

const MongoClient = require('mongodb').MongoClient;

container.resolve(function(index, task, q_data){ // brings the modules from the container. we run everyting in here
  // adding mongoose connection to the database
  mongoose.Promise = global.Promise;
  const uri = "mongodb+srv://ntheodoropoulos:nikblod1@cluster0-axiu3.mongodb.net/test?retryWrites=true&w=majority"
  //const uri ="mongodb://ntheodoropoulos:nikblod1!@cluster0-shard-00-00-axiu3.mongodb.net:27017,cluster0-shard-00-01-axiu3.mongodb.net:27017,cluster0-shard-00-02-axiu3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })


  const app = SetupExpress();

  function SetupExpress(){
    const app = express();
    const server = http.createServer(app);
    server.listen(process.env.PORT || 3000, function(){
      console.log('Listening on port 3000');
    });
    ConfigureExpress(app);

    // setting up ROUTERS
    const router = require('express-promise-router')();
    index.SetRouting(router);
    task.SetRouting(router);
    q_data.SetRouting(router);


    app.use(router);
    app.use(function(req, res){
      res.render('404');
    });
  }


  function ConfigureExpress(app){

    app.use(compression());
    app.use(helmet());
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(session({ // allows to save sessions
      //secret: 'thisissecret',
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      saveInitialized: true,
      store: new MongoStore({mongooseConnection: mongoose.connection}) // save data to database
    }))


  }

});

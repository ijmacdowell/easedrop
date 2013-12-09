/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    tasks = require("./tasks"),
    mongoose = require('mongoose');


// Get yo' models
// var User = require("./models/user.js"),

var app = express();
var server = require('http').createServer(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var port;
app.configure('development', function(){
  port = 3000;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost/<app_name>');
});

app.configure('production', function(){
  port = 80;
  app.use(express.errorHandler());
  // TODO:
  // add production database connection string
  // mongoose.connect('mongodb://localhost/<app_name>');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('opened');
});


server.listen(port, function(){
});


app.get('/', routes.home);


/*
 * Run background tasks here:
 */

// Run immediately
// tasks.myTask();

// Run periodically
// setInterval(tasks.myTask, 1000 * 60 * 10);

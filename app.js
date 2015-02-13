
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://alianjum:seecs123@ds035290.mongolab.com:35290/r_fusion');
var bodyParser = require('body-parser');
var app = express();
//getting routes
var user= require("./routes/user.js"),
    extraFiles= require("./routes/extraFiles.js"),
    auth= require("./routes/auth.js"),
    rdiaries= require("./routes/rdiaries.js"),
    sms= require("./routes/sms.js"),
    BSON = require('mongodb').BSONPure;
// all environments
//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
//app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express['static'](__dirname + '/views/rFusion'));

app.use(bodyParser());
//<----------For cross domain--------->

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
//<----------For cross domain--------->

app.use(function(req,res,next){
    req.db = db;
    next();
});

// Used to parse the request to get form parameters also contains session parameters
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(bodyParser());

// Login Authorization
app.use(auth.initialize());
app.use(auth.session());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//authentication
// Authentiacting user login and sending the proper response message
app.get('/logout',user.logout);
app.post('/login', user.login);
// sms
app.post('/sendsms',sms.sendsms);
//user
app.post('/donors',user.donors);
app.get('/data',user.returnUser);
app.post('/signup', user.save);
app.put('/update', user.update);
//extra files
app.get('/', extraFiles.index),
app.get('/login',extraFiles.login),
app.get('/signup', extraFiles.signup);
app.get('/thankyou', extraFiles.thankyou);
app.get('/map', extraFiles.map);
app.get('/update', extraFiles.updatePage);
app.get('/user',extraFiles.user);

//rdiaries
app.get('/rdiary',rdiaries.diarypost);
app.post('/rdiaries',rdiaries.rdiariesSave);
app.get('/rdiaries',rdiaries.rdiaries);

app.listen(process.env.PORT || 5000)
console.log("Server started at 5000");

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

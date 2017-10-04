var express = require('express');
var app = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var mongoose        = require('mongoose');

// Create a default connection string
var connectionstring = 'mongodb://127.0.0.1:27017/webdev2016';

//  remote connection string if running on remote
/*if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionstring = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}*/
console.log("MONGO USERNAME: " + process.env.MLAB_USERNAME_WEBDEV);
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionstring = 'mongodb://' + username + ':' + password;
    connectionstring += '@ds155028.mlab.com:55028/heroku_l4tbqfmc'; // use yours
}

// connect to database
console.log(connectionstring);
var db = mongoose.connect(connectionstring);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || 3000;
//app.set('port', port);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
multer();
/*
app.use(session({
    secret:process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));*/
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// User models of assignment and project.
//var userModelAssignment = require("./public/assignment/server/models/user/user.model.js")(db,mongoose);
//var userModelProject = require("./public/project/server/models/user/user.model.js")(db,mongoose);

// Passport authentication common for assignment and project
//var securityService = require("./public/security/security.js")(userModelAssignment,userModelProject);
// Assignment app.js
//require("./public/assignment/server/app.js")(app, db, userModelAssignment,securityService);

// Project app.js
//require("./public/project/server/app.js")(app,db, userModelProject, securityService);

/*app.listen(port, ipaddress, function () {
    console.log("Server is listening on: " + ipaddress + ":" + port);
})*/
app.listen(port, function () {
    console.log("Server is listening on port: " + port);
});
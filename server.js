var express = require('express');
var app = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
//var passport        = require('passport');
//var LocalStrategy   = require('passport-local').Strategy;
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var mongoose        = require('mongoose');

// Create a default connection string
var connectionstring = 'mongodb://127.0.0.1:27017/webdev2016';

//  remote connection string if running on remote
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionstring = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

// connect to database
var db = mongoose.connect(connectionstring);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret:process.env.PASSPORT_SECRET }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/app.js")(app, db);


// Project app.js
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress, function () {
    console.log("Server is listening on: " + ipaddress + ":" + port);
});
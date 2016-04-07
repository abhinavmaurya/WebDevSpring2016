/**
 * Created by abhinavmaurya on 3/16/16.
 */
"use strict"

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, userModel){

    var auth = authorized;

    /*APIs*/
    app.post    ("/api/assignment/login",   passport.authenticate('local'), login);
    app.get     ("/api/assignment/loggedin",    loggedin);
    app.post    ("/api/assignment/logout",  logout);
    app.post    ("/api/assignment/register",    auth,    createUser);
    app.put     ("/api/assignment/user/:userId",    auth,    updateUser);
    app.delete  ("/api/assignment/user/:userId",    deleteUser);
    app.get     ("/api/assignment/user",    auth,    getAllUsers);
    app.get     ("/api/assignment/user/:userId",    auth,    getUserByUserId);
    app.get     ("/api/assignment/user/username/:username",  getUserByUsername);

    /*Functions for passport authentication*/
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    /* --------------- Implementation -----------------*/

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    /*function login(req, res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }*/

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /*function loggedin(req, res){
        res.json(req.session.currentUser);
    }*/
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    /*function logout(req, res){
        req.session.destroy();
        res.send(200);
    }*/
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function getUserByUserId(req, res){
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res){
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res){
        var newUser = req.body;
        newUser.emails = [newUser.email];
        newUser.phones = [newUser.phone];
        newUser.roles = ["student"];
        /*userModel.createUser(user)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );*/
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var userData = req.body;
        userModel.updateUserById(userId, userData)
            .then(
                function(stats){
                    return userModel.findUserById(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        userModel.deleteUserById(userId)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res){
        userModel.findAllUsers()
            .then(
                function(docs){
                    res.json(docs);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
};

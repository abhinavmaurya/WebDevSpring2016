/**
 * Created by abhinavmaurya on 3/16/16.
 */
"use strict"

var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel, securityService){

    var auth = authorized;
    var passport = securityService.getPassport();

    /*APIs*/
    app.post    ("/api/assignment/login",   passport.authenticate('assignment'), login);
    app.get     ("/api/assignment/loggedin",    loggedin);
    app.post    ("/api/assignment/logout",  logout);
    app.post    ("/api/assignment/register",    createUser);
    app.put     ("/api/assignment/user/:userId",    auth,    updateUser);
    app.delete  ("/api/assignment/user/:userId",    deleteUser);
    app.get     ("/api/assignment/user",    auth,    getAllUsers);
    app.get     ("/api/assignment/user/:userId",    auth,    getUserByUserId);
    app.get     ("/api/assignment/user/username/:username",  getUserByUsername);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.app === "assignment" ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function getUserByUserId(req, res){
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
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
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
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
        if(userData.password) {
            userData.password = bcrypt.hashSync(userData.password);
        }
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
    }
};

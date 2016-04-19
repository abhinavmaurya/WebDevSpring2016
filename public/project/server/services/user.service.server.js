/**
 * Created by abhinavmaurya on 3/16/16.
 */
"use strict"

var passport        = require('passport');
var bcrypt          = require("bcrypt-nodejs");

module.exports = function (app, userModel, userStockModel, securityService){

    var auth = authorized;
    var passport = securityService.getPassport();

    /*APIs*/
    app.post    ("/api/project/login",   passport.authenticate('project'), login);
    app.get     ("/api/project/loggedin",    loggedin);
    app.post    ("/api/project/logout",  logout);
    app.post    ("/api/project/register",    createUser);
    app.put     ("/api/project/user/:userId",    auth,    updateUser);
    app.delete  ("/api/project/user/:userId",    deleteUser);
    app.get     ("/api/project/user",    auth,    getAllUsers);
    app.get     ("/api/project/user/:userId",    auth,    getUserByUserId);
    app.get     ("/api/project/user/username/:username",  getUserByUsername);

    app.get     ("/api/project/user/:userId/follower",    getFollowers);
    app.get     ("/api/project/user/:userId/following",    getFollowingUsers);
    app.post    ("/api/project/user/:userId/follower",    addFollower);
    app.post    ("/api/project/user/:userId/following",    addFollowingUser);
    app.delete  ("/api/project/user/:userId/follower/:followerId",    deleteFollower);
    app.delete  ("/api/project/user/:userId/following/:followingId",    deleteFollowingUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.app === "tradebull" ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function getUserByUserId(req, res){
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function(user){
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
        var createdUser = null;
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
                        createdUser = user;
                        return userStockModel.createUserStock(user._id);
                    }
                },
                function(err){
                    console.log(err);
                    res.status(400).send(err);
                }
            )
            .then(
                function(doc){
                    if(createdUser){
                        req.login(createdUser, function(err) {
                            if(err) {
                                console.log(err);
                                res.status(400).send(err);
                            } else {
                                res.json(createdUser);
                            }
                        });
                    }
                },
                function(err){
                    console.log(err);
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

    /*Followers and Following Users*/
    function getFollowers(req, res){
        var userId = req.params.userId;
        userModel.findFollowers(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getFollowingUsers(req, res){
        var userId = req.params.userId;
        userModel.findFollowingUsers(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addFollower(req, res){
        var userId = req.params.userId;
        var follower = req.body;
        userModel.addFollower(userId, follower)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addFollowingUser(req, res){
        var userId = req.params.userId;
        var followingUser = req.body;
        userModel.addFollowingUser(userId, followingUser)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFollower(req, res){
        var userId = req.params.userId;
        var followerId = req.params.followerId;
        userModel.deleteFollower(userId, followerId)
            .then(
                function(stats){
                    res.send(stats);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFollowingUser(req, res){
        var userId = req.params.userId;
        var followerId = req.params.followingId;
        userModel.deleteFollowingUser(userId, followerId)
            .then(
                function(stats){
                    res.send(stats);
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

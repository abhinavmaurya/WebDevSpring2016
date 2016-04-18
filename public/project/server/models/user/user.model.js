/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("Users", UserSchema);
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findUsers: findUsers,
        /*Followers and Following*/
        findFollowers: findFollowers,
        findFollowingUsers: findFollowingUsers,
        addFollower: addFollower,
        addFollowingUser: addFollowingUser,
        deleteFollower: deleteFollower,
        deleteFollowingUser: deleteFollowingUser
    };
    return api;

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user){
        delete user._id;
        var deferred = q.defer();
        UserModel.update(
            {_id: userId},
            {$set: user},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }



    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }


    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(
            function(err, docs){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;
    }

    function findUsers(userIds){
        var deferred = q.defer();
        UserModel.find(
            {_id: {$in: userIds}},
            function(err, docs){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;
    }
    /*Followers and Following Users*/
    function findFollowers(userId){
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc.followers);
                    }
                });
        return deferred.promise;
    }

    function findFollowingUsers(userId){
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc.following);
                    }
                });
        return deferred.promise;
    }

    function addFollower(userId, followerUser){
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        doc.followers.push(followerUser);
                        deferred.resolve(doc.save());
                    }
                });
        return deferred.promise;
    }

    function addFollowingUser(userId, followingUser){
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        doc.following.push(followingUser);
                        deferred.resolve(doc.save());
                    }
                });
        return deferred.promise;
    }

    function deleteFollower(userId, followerUserId){
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(
            userId,
            {$pull: {followers: {userId: followerUserId}}},
            function(err, stats){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }

    function deleteFollowingUser(userId, followingUserId){
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(
            {_id: userId},
            {$pull: {following: {userId: followingUserId}}},
            function(err, stats){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }
}
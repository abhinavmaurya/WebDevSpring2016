/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

//load q promise library
var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers
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
        var deferred = q.defer();
        console.log(userId);
        console.log(user);
        delete user._id;
        UserModel.update(
            {_id: userId},
            {$set: user},
            function(err, stats){
                if(err){
                    console.log("update user error");
                    console.log(err);
                    deferred.reject();
                }else{
                    console.log(stats);
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
                console.log("findUserById error");
                deferred.reject(err);
            }else{
                console.log("findUserById -- user");
                console.log(doc);
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
}


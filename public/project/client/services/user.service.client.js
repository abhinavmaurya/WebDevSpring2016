/**
 * Created by abhinavmaurya on 2/20/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("UserService", UserService);

    function UserService ($rootScope){

        var userData =
            [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "email": "alice@tb.com"		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "email": "bob@tb.com"		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "email": "charlie@tb.com"		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "email": "dan@tb.com"},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "email": "ed@tb.com"		}
            ];

        var api = {

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername: findUserByUsername

        };
        return api;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password, callback){
            var user = null;
            for(var u in userData){

                if(userData[u].username == username && userData[u].password == password) {
                    user = userData[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback){
            callback(userData);
        }

        function createUser(user, callback){
            var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password,
                email: user.email
            };

            userData.push(newUser);
            callback(userData);
        }

        function updateUser(userId, user, callback){

            var index = userData.indexOf(findUserById(userId));
            if(index>=0){
                userData[index] = {
                    _id: user._id,
                    username: user.username,
                    password: user.password,
                    email: user.email
                }
            }
            callback(userData);
        }

        function findUserById(userId){
            for(var u in userData){

                if(userData[u]._id == userId) {
                    return userData[u];
                }
            }
            return null;
        }


        function deleteUserById(userId, callback){
            var index = userData.indexOf(findUserById(userId));
            if(index>=0){
                userData.splice(index, 1);
            }

            callback(userData);
        }

        function findUserByUsername(username){
            var user = null;
            for(var u in userData){

                if(userData[u].username == username) {
                    user = userData[u];
                    break;
                }
            }
            return user;
        }
    }
})();
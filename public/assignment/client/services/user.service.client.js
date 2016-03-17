/**
 * Created by abhinavmaurya on 2/20/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope){

        var userData =
            [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ];

        var api = {

            login: login,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername: findUserByUsername,
            isAdminUser: isAdminUser,
            logout: logout

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
            //return $http.get("/api/project/loggedin");
        }

        function logout(){
            return $http.post("api/project/logout");
        }

        function login(credentials){
            /*var user = null;
             for(var u in userData){

             if(userData[u].username == username && userData[u].password == password) {
             user = userData[u];
             break;
             }
             }
             callback(user);*/
            return $http.post("/api/project/login", credentials);
        }

        function findAllUsers(callback){
            callback(userData);
        }

        function createUser(user, callback){
            var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };

            userData.push(newUser);
            callback(newUser);
        }

        function updateUser(userId, user){

            var index = userData.indexOf(findUserById(userId));
            if(index>=0){
                userData[index] = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    roles: user.roles
                }
            }
            return (userData[index]);
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

        function isAdminUser(){
            var user = getCurrentUser();

            if(user){
                for(var role in user.roles){
                    if (user.roles[role] == "admin")
                        return true;
                }
            }
            return false;
        }
    }
})();
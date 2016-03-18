/**
 * Created by abhinavmaurya on 2/20/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope){

        var api = {

            login: login,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserById: findUserById,
            isAdminUser: isAdminUser,
            logout: logout,
            getLoggedinUser: getLoggedinUser

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
            //return $http.get("/api/project/loggedin");
        }

        function getLoggedinUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function login(credentials){
            return $http.post("/api/assignment/login", credentials);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user/");
        }

        function createUser(user){
            return $http.post("/api/assignment/register", user);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/:"+ userId, user);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/:"+ userId);
        }


        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/:"+ userId);
        }

        /*function findUserByUsername(username){
            var user = null;
            for(var u in userData){

                if(userData[u].username == username) {
                    user = userData[u];
                    break;
                }
            }
            return user;
        }*/

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
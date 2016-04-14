/**
 * Created by abhinavmaurya on 2/20/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
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
            findUserByUsername: findUserByUsername,
            logout: logout,
            getLoggedinUser: getLoggedinUser,

            /*followers and following users*/
            findFollowers: findFollowers,
            findFollowingUsers: findFollowingUsers,
            addFollower: addFollower,
            addFollowingUser: addFollowingUser,
            deleteFollower: deleteFollower,
            deleteFollowingUser: deleteFollowingUser

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function getLoggedinUser(){
            return $http.get("/api/project/loggedin");
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function login(credentials){
            return $http.post("/api/project/login", credentials);
        }

        function findAllUsers(){
            return $http.get("/api/project/user/");
        }

        function createUser(user){
            return $http.post("/api/project/register", user);
        }

        function updateUser(userId, user){
            return $http.put("/api/project/user/"+userId, user);
        }

        function findUserById(userId){
            return $http.get("/api/project/user/"+userId);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user/username/"+ username);
        }

        function findFollowers(userId){
            return $http.get("/api/project/user/"+userId+"/follower");
        }

        function findFollowingUsers(userId){
            return $http.get("/api/project/user/"+userId+"/following");
        }

        function addFollower(userId, followerId){
            return $http.post("/api/project/user/"+userId+"/follower/" +followerId);
        }

        function addFollowingUser(userId, followingId){
            return $http.post("/api/project/user/"+userId+"/following/" +followingId);
        }

        function deleteFollower(userId, followerId){
            return $http.delete("/api/project/user/"+userId+"/follower/" +followerId);
        }

        function deleteFollowingUser(userId, followingId){
            return $http.delete("/api/project/user/"+userId+"/following/" +followingId);
        }
    }
})();
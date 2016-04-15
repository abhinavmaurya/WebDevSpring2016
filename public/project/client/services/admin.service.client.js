/**
 * Created by abhinavmaurya on 2/20/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("AdminService", AdminService);

    function AdminService ($http){

        var api = {

            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById
        };
        return api;


        function findAllUsers(){
            return $http.get("/api/project/admin/user/");
        }

        function createUser(user){
            return $http.post("/api/project/admin/user", user);
        }

        function updateUser(userId, user){
            return $http.put("/api/project/admin/user/"+userId, user);
        }

        function findUserById(userId){
            return $http.get("/api/project/admin/user/"+userId);
        }


        function deleteUserById(userId){
            return $http.delete("/api/project/admin/user/"+userId);
        }
    }
})();
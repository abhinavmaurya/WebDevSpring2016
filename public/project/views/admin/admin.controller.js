/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("AdminController", AdminController);


    function AdminController($scope, UserService){

        console.log("Inside AdminController")
        UserService.findAllUsers(setUsers);

        $scope.user = null;
        $scope.selectedUser = null;
        $scope.setUsers = setUsers;

        //functions
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.unselectUser = unselectUser;
        $scope.deleteUser = deleteUser;


        function setUsers(users){
            console.log(users);
            $scope.users = users;
            $scope.user = null;
        }

        function selectUser(user){
            $scope.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                email: user.email
            };
            $scope.selectedUser = true;
        }

        function unselectUser(user){
            $scope.user = null;
            $scope.selectedUser = null;
        }

        function deleteUser(user){
            UserService.deleteUserById(user._id, setUsers);
        }

        function addUser(user){
            if(user && user.username && user.password && user.email){
                var newUser = {
                    username: user.username,
                    password: user.password,
                    email: user.email
                };
                UserService.createUser(newUser, setUsers);
            }else{
                $scope.message("Please provide user credentials properly");
            }
        }

        function updateUser(user){
            if(user && user.username && user.password && user.email){
                var updatedUser = {
                    username: user.username,
                    password: user.password,
                    email: user.email
                };
                UserService.updateUser(user._id, updatedUser, setUsers);
            }else{
                $scope.message("Please provide user credentials properly");
            }
        }
    }

})();

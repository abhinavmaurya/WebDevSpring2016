/**
 * Created by abhinavmaurya on 2/19/16.
 */

"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("AdminController", AdminController);


    function AdminController(UserService){

        var vm = this;

        function init(){
            UserService
                .findAllUsers()
                .then(function(response){
                    vm.users = response.data;
                    console.log(vm.users);
                });
        }
        init();

        vm.user = null;
        vm.selectedUser = null;

        //functions
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.unselectUser = unselectUser;
        vm.deleteUser = deleteUser;


        /*function setUsers(users){
            console.log(users);
            $scope.users = users;
            $scope.user = null;
        }*/

        function selectUser(user){
            vm.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                email: user.email
            };
            vm.selectedUser = true;
        }

        function unselectUser(){
            vm.user = null;
            vm.selectedUser = null;
        }

        function deleteUser(user){
            UserService
                .deleteUserById(user._id)
                .then(function(response){
                    init();
                });
        }

        function addUser(user){
            if(user && user.username && user.password && user.email){
                var newUser = {
                    username: user.username,
                    password: user.password,
                    email: user.email
                };
                UserService
                    .createUser(newUser)
                    .then(function(response){
                        init();
                    });
            }else{
                vm.message("Please provide user credentials properly");
            }
        }

        function updateUser(user){
            if(user && user.username && user.password && user.email){
                var updatedUser = {
                    username: user.username,
                    password: user.password,
                    email: user.email
                };
                UserService
                    .updateUser(user._id, updatedUser)
                    .then(function(response){
                        init();
                        unselectUser();
                    });
            }else{
                vm.message("Please provide user credentials properly");
            }
        }
    }

})();

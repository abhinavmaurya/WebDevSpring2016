/**
 * Created by abhinavmaurya on 3/18/16.
 */

"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(AdminService){

        var vm = this;

        function init(){
            AdminService
                .findAllUsers()
                .then(
                    function(response){
                        vm.users = response.data;
                        console.log(vm.users);
                    },
                    function(err){
                        console.log(err);
                    }
                );
            unselectUser();
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
            vm.user = angular.copy(user);
            vm.selectedUser = true;
        }

        function unselectUser(){
            vm.user = null;
            vm.selectedUser = null;
        }

        function deleteUser(user){
            AdminService
                .deleteUserById(user._id)
                .then(function(response){
                    init();
                });
        }

        function addUser(user){
            if(user && user.username && user.password){
                if(user.roles && user.roles.length > 1) {
                    user.roles = user.roles.split(",");
                } else {
                    user.roles = ["student"];
                }
                AdminService
                    .createUser(user)
                    .then(function(response){
                        init();
                    });
            }else{
                vm.message = "Please provide user credentials properly";
            }
        }

        function updateUser(user){
            if(user && user.username && user.password){
                var updatedUser = angular.copy(user);
                delete updatedUser._id;
                if(typeof user.roles == "string") {
                    updatedUser.roles = user.roles.split(",");
                }
                AdminService
                    .updateUser(user._id, updatedUser)
                    .then(function(response){
                        init();
                    });
            }else{
                vm.message = "Please provide user credentials properly";
            }
        }
    }
})();

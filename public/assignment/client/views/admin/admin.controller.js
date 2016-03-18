/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);


    function AdminController($location, UserService){

        var vm = this;
        var users = null;

        function init(){
            UserService
                .findAllUsers
                .then(function(response){
                    var users = response.data;
                    if(users)
                        setUsers(users);
                });
        }
        init();

        vm.user = null;
        vm.selectedUser = null;

        //Functions
        vm.selectUser = selectUser;
        vm.setUsers = setUsers;
        vm.unselectUser = unselectUser;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser();

        function setUsers(users){
            console.log(users);
            vm.users = users;
            vm.user = null;
        }

        function selectUser(user){
            vm.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                email: user.email
            };
            vm.selectedUser = true;
        }

        function unselectUser(user){
            vm.user = null;
            vm.selectedUser = null;
        }

        function deleteUser(user){
            UserService.deleteUserById(user._id);
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

    }

})();

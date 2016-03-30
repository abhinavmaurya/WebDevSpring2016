/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location){

        var vm = this;

        function init(){

        }
        init();

        vm.register = register;

        function register(user){
            console.log("Inside Register");
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.vpassword) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.vpassword) {
                vm.message = "Passwords must match";
                return;
            }
            //var usr = UserService.findUserByUsername(user.username);
            if (isDuplicateUsername(user.username)) {
                vm.message = "Username already exists";
                return;
            }
            UserService
                .createUser(user)
                .then(
                    function(response){
                        var currentUser = response.data;
                        console.log(currentUser);
                        if(currentUser){
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                    },
                    function(err){
                        console.log(error);
                    }
                );
        }

        function isDuplicateUsername(username){
            UserService
                .findUserByUsername(username)
                .then(function(response){
                   var user = response.data;
                    console.log("duplicate check");
                    console.log(user);
                    if(user)
                        return true;
                    else
                        return false;
                });
        }
    }
})();
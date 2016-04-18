/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("TradeBullApp")
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
            UserService
                .createUser(user)
                .then(
                    function(response){
                        var currentUser = response.data;
                        console.log(currentUser);
                        if(currentUser){
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }else{
                            vm.message = "Username already exists";
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }
    }
})();
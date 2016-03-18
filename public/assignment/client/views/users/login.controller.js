/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){

        var vm = this;

        // event handlers declaration
        vm.login = login;
        //vm.success = success;

        function init(){

        }
        init();

        // event handler implementations
        function login(user){
            if(!(user && user.username && user.password)){
                vm.message = "Please provide username and password to login.";
            }else{
                UserService
                    .login({
                        username: user.username,
                        password:user.password
                    })
                    .then(function(response){
                        console.log("returned back");
                        var currentUser = response.data;
                        console.log(currentUser);
                        if (currentUser) {
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }else{
                            vm.message = "Invalid username/password";
                        }
                    });
            }
        }

        /*function success(user) {
            if (user) {
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }else{
                vm.message = "Invalid username/password";
            }
        }*/
    }


})();

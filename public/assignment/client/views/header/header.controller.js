/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location){

        var vm = this;

        vm.logout = logout;
        vm.isAdmin = isAdmin;

        function init(){
            vm.$location = $location;
        }
        init();

        function isAdmin(){
            return UserService.isAdminUser();
        }

        function logout(){

            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url('/home');
                });
        }

    }
})();
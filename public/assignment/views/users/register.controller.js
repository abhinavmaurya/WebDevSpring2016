/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService){

        $scope.register = register;
        $scope.success = success;

        function register(user){
            console.log("Inside Register");
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.vpassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.vpassword) {
                $scope.message = "Passwords must match";
                return;
            }
            var usr = UserService.findUserByUsername(user.username);
            if (usr != null) {
                $scope.message = "User already exists";
                return;
            }
            UserService.createUser(user, success);
        }

        function success(user){
            //$rootScope.currentUser = user;
            UserService.setCurrentUser(user);
            $scope.$location.url('/profile');
        }
    }
})();
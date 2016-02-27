/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, UserService){

        var usr = UserService.getCurrentUser();
        if(usr) {
            $scope.currentUser = {
                _id: usr._id,
                username: usr.username,
                firstName: usr.firstName,
                lastName: usr.lastName,
                password: usr.password,
                email: usr.email,
                roles: usr.roles
            };
        }else{
            $scope.$location.url("/home");
        }

        $scope.updateUser = updateUser;
        $scope.success = success;


        function updateUser(user){
            UserService.updateUser(user._id, user, success);
        }

        function success(user){
            $scope.error = null;
            $scope.message = null;
            if(user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(user);
            }else{
                $scope.message = "Unable to update the user";
            }
        }
    }
})();
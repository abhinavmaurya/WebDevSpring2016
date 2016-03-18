/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($location, UserService){

        var vm = this;

        function init(){
            var usr = UserService.getCurrentUser();
            if(usr) {
                vm.currentUser = {
                    _id: usr._id,
                    username: usr.username,
                    firstName: usr.firstName,
                    lastName: usr.lastName,
                    password: usr.password,
                    email: usr.email,
                    roles: usr.roles
                };
            }else{
                $location.url("/home");
            }
        }
        return init();



        vm.updateUser = updateUser;
        //vm.success = success;


        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    var updatedUser = response.data;
                    if(updateduser){
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser(updatedUser);
                    }else{
                        vm.message = "Unable to update the user";
                    }
                });
        }

        /*function success(user){
            $scope.error = null;
            $scope.message = null;
            if(user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(user);
            }else{
                $scope.message = "Unable to update the user";
            }
        }*/
    }
})();
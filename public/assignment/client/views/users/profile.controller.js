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
                vm.$location.url("/home");
            }
        }
        init();



        vm.updateUser = updateUser;
        //vm.success = success;


        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    var updatedUser = response.data;
                    if(updatedUser){
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser(updatedUser);
                        //return UserService.setCurrentUser(updatedUser);
                    }else{
                        vm.message = "Unable to update the user";
                    }
                })
                /*.then(
                    function(response){
                        var updatedUser = response.data;
                        console.log("Updated User");
                        console.log(updatedUser);
                        UserService.setCurrentUser(updatedUser);
                    },
                    function(err){
                        vm.message("Unable to fetch updated profile");
                    }
                )*/;
        }
    }
})();
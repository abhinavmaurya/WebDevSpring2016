/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
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
                    email: usr.email
                };
            }else{
                $location.url("/home");
            }
        }
        init();

        vm.updateUser = updateUser;


        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        if(updatedUser){
                            vm.message = "User updated successfully";
                            UserService.setCurrentUser(updatedUser);
                        }else{
                            vm.message = "Unable to update the user";
                        }
                    },
                    function(err){
                        console.log("API Failure");
                    }
                );
        }
    }
})();
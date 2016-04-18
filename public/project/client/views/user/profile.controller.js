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
            vm.changePassword = false;
            if(usr) {
                UserService
                    .findUserById(usr._id)
                    .then(
                        function(response){
                            vm.currentUser = response.data;
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            }else{
                $location.url("/home");
            }
        }
        init();

        vm.updateUser = updateUser;


        function updateUser(user){
            if(!vm.changePassword){
                delete user.password;
            }
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        if(updatedUser){
                            vm.message = "User updated successfully";
                            UserService.setCurrentUser(updatedUser);
                            init();
                        }else{
                            vm.message = "Unable to update the user";
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }
    }
})();
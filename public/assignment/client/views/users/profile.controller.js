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
                console.log(usr);
                vm.currentUser = {
                    _id: usr._id,
                    username: usr.username,
                    firstName: usr.firstName,
                    lastName: usr.lastName,
                    password: usr.password,
                    emails: makeString(usr.emails),
                    phones: makeString(usr.phones),
                    roles: usr.roles
                };
                console.log(vm.currentUser);
                /*console.log(['123', '234'].join(";"));
                console.log('123'.split(";"));*/
            }else{
                vm.$location.url("/home");
            }
        }
        init();



        vm.updateUser = updateUser;
        //vm.success = success;

        function makeString(array){
            var str = array.join(";") + "";
            return str;
        }

        function updateUser(user){
            console.log(user);
            console.log(vm.currentUser);
            user.emails = user.emails.split(";");
            user.phones = user.phones.split(";");
            user.updated = Date.now;
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    var updatedUser = response.data;
                    if(updatedUser){
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser(updatedUser);
                        init();
                    }else{
                        vm.message = "Unable to update the user";
                    }
                });
        }
    }
})();
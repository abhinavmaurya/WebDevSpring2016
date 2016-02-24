/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $rootScope, UserService){

        if($rootScope.user) {
            $scope.user = {
                _id: $rootScope.user._id,
                username: $rootScope.user.username,
                firstName: $rootScope.user.firstName,
                lastName: $rootScope.user.lastName,
                password: $rootScope.user.password,
                email: $rootScope.user.email,
                roles: $rootScope.user.roles
            };
        }

        $scope.updateUser = updateUser;
        $scope.success = success;


        function updateUser(user){

            console.log(user._id);
            console.log(user.firstName);
            UserService.updateUser(user._id, user, success);
        }

        function success(user){

            $rootScope.user = user;
        }
    }
})();
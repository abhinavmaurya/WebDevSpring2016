/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService){

        $scope.register = register;
        $scope.success = success;

        function register(user){
            if(user && user.username && user.email && user.password && user.password == user.vpassword) {
                UserService.createUser(user, success);
            }
        }

        function success(user){

            $rootScope.user = user;
            $scope.$location.url('/profile');
        }
    }
})();
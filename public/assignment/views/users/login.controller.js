/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService){

        // event handlers declaration
        $scope.login = login;
        $scope.success = success;

        // event handler implementations
        function login(user){
            console.log("inside validate")
            if(user.username && user.password) {
                UserService.findUserByCredentials(user.username, user.password, success);
            }
        }

        function success(user) {
            if (user) {
                UserService.setCurrentUser(user);
                $scope.$location.url("/profile");
            }else{
                $scope.message = "Invalid username/password";
            }
        }
    }


})();

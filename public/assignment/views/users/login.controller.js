/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $rootScope, UserService){

        // event handlers declaration
        $scope.validate = validate;
        $scope.success = success;

        // event handler implementations
        function validate(user){
            console.log("inside validate")
            if(user.username && user.password) {
                UserService.findUserByCredentials(user.username, user.password, success);
            }
        }

        function success(user) {
            if (user) {
                console.log("success");
                $rootScope.user = user;
                $scope.$location.url("/profile");
            }else{
                console.log("Invalid user");
            }
        }
    }


})();

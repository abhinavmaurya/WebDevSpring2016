/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService){

        $scope.logout = logout;
        $scope.isAdmin = function (){
            return UserService.isAdminUser();
        };

        function logout(){
            UserService.setCurrentUser(undefined);
            $scope.$location.url('/home');
        }

    }
})();
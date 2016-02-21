/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope){

        $scope.logout = logout;
        $scope.isAdmin = isAdmin;

        function logout(){
            $rootScope.user = undefined;
            console.log($rootScope.user);
            $scope.$location.url('/home');
        }

        function isAdmin(){
            var user = $rootScope.user;

            if(user){
                for(var role in user.roles){
                    if (user.roles[role] == "admin")
                        return true;
                }
            }
            return false;
        }
    }
})();
/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("TradeBullApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope){

        $scope.logout = logout;
        $scope.isAdmin = function (){
            return true;
        };

        function logout(){
            //UserService.setCurrentUser(undefined);
            $scope.$location.url('/home');
        }

    }
})();
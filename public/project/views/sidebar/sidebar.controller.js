/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("TradeBullApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope){

        $scope.isAdmin = function (){
            //return UserService.isAdminUser();
            return true;
        };

    }
})();
/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, UserService){

        $scope.isAdmin = function (){
            return UserService.isAdminUser();
        };

    }
})();
/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();
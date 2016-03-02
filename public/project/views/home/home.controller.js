/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("HomeController", HomeController);


    function HomeController($scope, StockService, $routeParams, $location){

        var name = $routeParams.name;
        if(name){
            search(name);
        }

        $scope.search = search;
        $scope.render = render;
        $scope.error = error;

        function search(name){
            $location.url("/home/"+name);
            StockService.findStockByName(name, render, error);
        }

        function render(response){
            console.log(response);
            $scope.stocks = response;
        }
        function error(){
            console.log("error");
        }
    }

})();

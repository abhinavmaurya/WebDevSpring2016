/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("SearchController", SearchController);


    function SearchController($scope, StockService, $routeParams, $location){

        var vm = this;

        vm.search = search;

        function init(){
            var name = $routeParams.name;
            if(name){
                search(name);
            }
        }
        init();

        var name = $routeParams.name;
        if(name){
            search(name);
        }


        function search(name){
            StockService
                .findStockByName(name)
                .then(function(response){
                    vm.stocks = response.data;
                });
        }
    }

})();

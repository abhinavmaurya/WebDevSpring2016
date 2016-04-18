/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("SearchController", SearchController);


    function SearchController(StockService, $routeParams, $location){

        var vm = this;

        vm.showResult = showResult;
        vm.search = search;

        function init(){
            var name = $routeParams.name;
            if(name){
                vm.name=name;
                showResult(name);
            }
        }
        init();

        function showResult(name){
            vm.message = null;
            StockService
                .findStockByName(name)
                .then(function(response){
                    if(response.data && response.data.length > 0)
                        vm.stocks = response.data;
                    else
                        vm.message = "No matching record(s) found."
                });
        }

        function search(name){
            if(name)
                $location.url('/search/'+name);
        }
    }

})();

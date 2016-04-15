/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("HomeController", HomeController);


    function HomeController(UserService, StockService){

        var vm = this;
        vm.headline = null;
        var user = UserService.getCurrentUser();

        function init(){
            StockService
                .findHeadlines()
                .then(function(response){
                    vm.headline = response.data.items;
                });
        }
        init();

    }

})();

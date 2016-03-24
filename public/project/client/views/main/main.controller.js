/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("TradeBullApp")
        .controller("MainController", MainController);

    function MainController($location){

        var vm = this;

        function init(){
            vm.$location = $location;
        }
        init();
    }
})();
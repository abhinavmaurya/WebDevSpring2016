/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function(){

    angular
        .module("PortfolioApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location){

        var vm = this;

        function init(){
        }
        init();

    }
})();
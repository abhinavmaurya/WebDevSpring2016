/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function () {

    angular
        .module("TradeBullApp")
        .controller("HomeController", HomeController);


    function HomeController(UserService){

        var vm = this;
        var user = UserService.getCurrentUser();

        function init(){

        }
        init();

    }

})();

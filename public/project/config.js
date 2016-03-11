/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/home/:name", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/details/:symbol",{
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/watchlist",{
                templateUrl: "views/stocks/watchlist.view.html",
                controller: "WatchlistController"
            })
            .when("/portfolio",{
                templateUrl: "views/stocks/portfolio.view.html",
                controller: "PortfolioController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
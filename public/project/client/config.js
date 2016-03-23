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
            .when("/search", {
                templateUrl: "views/stocks/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:name", {
                templateUrl: "views/stocks/search.view.html",
                controller: "SearchController"
            })
            .when("/details/:symbol",{
                templateUrl: "views/stocks/details.view.html",
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
            .when("/register", {
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
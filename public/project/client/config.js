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
                controller: "HomeController",
                controllerAs: "model",
                resolve:{
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/stocks/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve:{
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/search/:name", {
                templateUrl: "views/stocks/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve:{
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/details/:symbol",{
                templateUrl: "views/stocks/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve:{
                    getLoggedIn: getLoggedIn
                }

            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/watchlist",{
                templateUrl: "views/stocks/watchlist.view.html",
                controller: "WatchlistController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/portfolio",{
                templateUrl: "views/stocks/portfolio.view.html",
                controller: "PortfolioController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/view/:userId", {
                templateUrl: "views/user/userdetails.view.html",
                controller: "UserDetailsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $q, $location) {
            var deferred = $q.defer();
            UserService
                .getLoggedinUser()
                .success(function(user) {
                    if(user !== '0') {
                        UserService.setCurrentUser(user);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            return deferred.promise;
        }

        function getLoggedIn(UserService, $q){
            var deferred = $q.defer();

            UserService
                .getLoggedinUser()
                .success(function(user){
                    if(user !== '0'){
                        UserService.setCurrentUser(user);
                    }
                    deferred.resolve();
                });
            return deferred.promise;
        }
    }
})();
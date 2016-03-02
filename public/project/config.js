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
                templateUrl: "details/details.view.html",
                controller: "DetailsController"
            })
            /*.when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/logout",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/form-fields",{
                templateUrl: "views/forms/form-fields.view.html",
                controller: "FieldsController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })*/
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields",{
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve:{
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function(UserService, $q){
        var deferred = $q.defer();
        UserService
            .getLoggedinUser()
            .success(function(user){
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    };

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
})();
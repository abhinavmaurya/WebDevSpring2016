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
                controller: "HomeController"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
                //controllerAs: "model",
                /*
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }*/
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
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();
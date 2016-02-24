/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html"
            })
            .when("/logout",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html"
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/form-fields",{
                templateUrl: "views/forms/forms-fields.view.html"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
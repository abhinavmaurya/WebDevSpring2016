/**
 * Created by abhinavmaurya on 3/19/16.
 */

(function (){

    angular
        .module("PortfolioApp")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/resume",{
                templateUrl: "views/resume/resume.view.html"
            })
            .when("/skills",{
                templateUrl: "views/skill/skills.view.html"
            })
            .when("/contact",{
                templateUrl: "views/contact/contact.view.html"
            })
            .when("/project",{
                templateUrl: "views/works/project.view.html"
            })
            .when("/assignment",{
                templateUrl: "views/works/assignment.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
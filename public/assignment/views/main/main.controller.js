/**
 * Created by abhinavmaurya on 2/19/16.
 */
(function(){

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        console.log($location.url());
        //alert($location.url);
        $scope.$location = $location;
    }
})();
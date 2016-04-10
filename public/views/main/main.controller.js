/**
 * Created by abhinavmaurya on 2/19/16.
 */
(function(){

    angular
        .module("PortfolioApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;

        $scope.loader = loader;
        $scope.resetLoader = resetLoader;

        function init(){
            loader();
        }
        init();


        function loader(){
            $scope.showLoader = true;
            setTimeout(resetLoader, 1000);
        }

        function resetLoader(){
            $scope.showLoader = false;
            $scope.$apply();
        }
    }
})();
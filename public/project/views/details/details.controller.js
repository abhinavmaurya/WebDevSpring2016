/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $http, $scope, StockService){
        var stockID = $routeParams.symbol;
        $scope.render = render;

        StockService.findStockById(stockID, render);

        function render(response){
            console.log(response);
            $scope.stock = response;
        }
    }
})();
/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $scope, StockService){
        var stockID = $routeParams.symbol;

        $scope.render = render;
        $scope.addToWatchlist = addToWatchlist;
        $scope.addToPortfolio = addToPortfolio;
        $scope.postAddToPortfolio = postAddToPortfolio;
        $scope.postAddToWatchlist = postAddToWatchlist;

        $scope.message = null;
        $scope.error = null;

        StockService.findStockById(stockID, render);

        function render(response){
            console.log(response);
            $scope.stock = response;
        }


        function addToWatchlist(stock){
            StockService.addToWatchlist(stock, postAddToWatchlist);
        }

        function postAddToPortfolio(stock){
            if(stock){
                $scope.message = "Successfully added stock to portfolio";
            }else{
                $scope.message = "Unable to add stock to portfolio";
            }
        }

        function postAddToWatchlist(stock){

        }

        function addToPortfolio(stock, qty){
            if(qty && qty > 0) {
                StockService.addToPortfolio(stock, qty, postAddToPortfolio);
            }else{
                $scope.error = "Please provide valid quantity";
            }
        }
    }
})();
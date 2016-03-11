/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("PortfolioController", WatchlistController);

    function WatchlistController($scope, StockService){

        $scope.portfolio = null;
        $scope.render = render;
        $scope.deleteFromPortfolio = deleteFromPortfolio;
        $scope.selStock = null;

        $scope.selectStock = selectStock;
        $scope.unselectStock = unselectStock;
        $scope.updateStock = updateStock;

        StockService.findAllStockInPortfolio(render);

        function render(response){
            console.log(response);
            $scope.portfolio = response;
            unselectStock();
        }

        function deleteFromPortfolio(stock){
            StockService.removeFromPortfolio(stock, render);
        }

        function selectStock(stock){
            $scope.selStock = {
                "Name": stock.Name,
                "Symbol": stock.Symbol,
                "BuyingPrice": stock.BuyingPrice,
                "Quantity": stock.Quantity
            };
        }

        function unselectStock(){
            $scope.selStock = null;
        }

        function updateStock(stock){
            StockService.updatePortfolioStock(stock, render);
        }
    }
})();

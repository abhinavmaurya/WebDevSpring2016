/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController($scope, StockService){

        $scope.watchlist = null;
        $scope.render = render;
        $scope.deleteFromWatchlist = deleteFromWatchlist;

        StockService.findAllStockInWatchlist(render);

        function render(response){
            console.log(response);
            $scope.watchlist = response;
        }

        function deleteFromWatchlist(stock){
            StockService.removeFromWatchlist(stock, render);
        }
    }
})();

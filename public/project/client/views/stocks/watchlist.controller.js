/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController(StockService, UserService, UserStockService){

        var vm = this;
        var userId = UserService.getCurrentUser()._id;
        vm.deleteFromWatchlist = deleteFromWatchlist;


        function init(){
            vm.watchlist = [];
            UserStockService
                .getUserWatchlist(userId)
                .then(
                    function(response){
                        var watch_lst = response.data;
                        for(var s in watch_lst){
                            StockService
                                .findStockById(watch_lst[s])
                                .then(function(response){
                                    var stock = response.data;
                                    vm.watchlist.push(stock);
                                });
                        }
                    },
                    function(err){
                        console.log("err");
                    }
                )
        }

        init();

        function deleteFromWatchlist(stock){
            UserStockService
                .deleteStockFromUserWatchlist(userId, stock.Symbol)
                .then(
                    function(response){
                        return StockService.deleteWatcherFromStock(stock.Symbol, userId);
                    }
                )
                .then(
                    function(response){
                        console.log("deleted watcher as well");
                        init();
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }
    }
})();

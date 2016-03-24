/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController(StockService, UserService){

        var vm = this;
        var userId = UserService.getCurrentUser()._id;
        vm.deleteFromWatchlist = deleteFromWatchlist;


        function init(){
            vm.watchlist = [];
            StockService
                .getUserWatchlist(userId)
                .then(
                    function(response){
                        var watch_lst = response.data;
                        for(var s in watch_lst){
                            StockService
                                .findStockById(watch_lst[s].Symbol)
                                .then(function(response){
                                    var stock = response.data;
                                    vm.watchlist.push(stock);
                                });
                        }
                    },
                    function(err){
                        console.log("Error fetching watchlist");
                    }
                )
        }

        init();

        function deleteFromWatchlist(stock){
            StockService
                .deleteStockFromUserWatchlist(userId, stock.Symbol)
                .then(function(response){
                    init();
                });
        }
    }
})();

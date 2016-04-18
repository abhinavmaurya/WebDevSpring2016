/**
 * Created by abhinavmaurya on 3/10/16.
 */
"use strict";
(function(){

    angular
        .module("TradeBullApp")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController(StockService, UserService, UserStockService){

        var vm = this;
        var userId = UserService.getCurrentUser()._id;
        vm.deleteFromWatchlist = deleteFromWatchlist;
        vm.setStatus = setStatus;
        vm.getUpDown = getUpDown;


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
                        init();
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }

        function setStatus(val){
            return val < 0 ? 'color-red' : val > 0 ? 'color-green' : '';
        }

        function getUpDown(val){
            return val < 0 ? 'fa fa-long-arrow-down' : val > 0 ? 'fa fa-long-arrow-up' : '';
        }
    }
})();

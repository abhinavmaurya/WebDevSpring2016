/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("PortfolioController", WatchlistController);

    function WatchlistController(StockService, UserService){

        var vm = this;
        var userId = UserService.getCurrentUser()._id;


        vm.portfolio = null;
        vm.selStock = null;
        vm.deleteFromPortfolio = deleteFromPortfolio;
        vm.selectStock = selectStock;
        vm.unselectStock = unselectStock;
        vm.updateStock = updateStock;

        function init(){
            refreshList();
        }
        init();

        function refreshList(){
            unselectStock();
            StockService
                .getUserPortfolio(userId)
                .then(function(response){
                    console.log(response.data);
                    vm.portfolio = response.data;
                    loadRealTimeData();
                });
        }

        function loadRealTimeData(){
            // synchronize loading of data from API
            angular.forEach(vm.portfolio, function(stock){
                StockService
                    .findStockById(stock.Symbol)
                    .then(function(response){
                        stock.LastPrice = response.data.LastPrice;
                        stock.Name = response.data.Name;
                    });
            });
        }

        function deleteFromPortfolio(stock){
            StockService
                .deleteStockFromUserPortfolio(userId, stock.Symbol)
                .then(function(response){
                    refreshList();
                });
        }

        function selectStock(stock){
            vm.selStock = {
                "Name": stock.Name,
                "Symbol": stock.Symbol,
                "BuyingPrice": stock.BuyingPrice,
                "Quantity": stock.Quantity,
                "LastPrice": stock.LastPrice
            };
        }

        function unselectStock(){
            vm.selStock = null;
        }

        function updateStock(stock){
            console.log(stock);
            StockService
                .updateStockInUserPortfolio(userId, stock.Symbol, stock)
                .then(function(response){
                    refreshList();
                });
        }
    }
})();

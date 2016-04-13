/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("PortfolioController", WatchlistController);

    function WatchlistController(StockService, UserService, UserStockService){

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
            UserStockService
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
                    .findStockById(stock.stockId)
                    .then(function(response){
                        stock.LastPrice = response.data.LastPrice;
                        stock.Name = response.data.Name;
                    });
            });
        }

        function deleteFromPortfolio(stock){

            UserStockService
                .deleteStockFromUserPortfolio(userId, stock._id)
                .then(function(response){
                    refreshList();
                });
        }

        function selectStock(stock){
            vm.selStock = {
                "Name": stock.Name,
                "stockId": stock.stockId,
                "purchaseDate": stock.purchaseDate,
                "price": stock.price,
                "quantity": stock.quantity,
                "LastPrice": stock.LastPrice
            };
        }

        function unselectStock(){
            vm.selStock = null;
        }

        function updateStock(stock){
            console.log(stock);
            UserStockService
                .updateStockInUserPortfolio(userId, stock.stockId, stock)
                .then(function(response){
                    refreshList();
                });
        }
    }
})();

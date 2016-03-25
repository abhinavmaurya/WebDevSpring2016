/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $scope, StockService, UserService){
        var stockID = $routeParams.symbol;
        var user = UserService.getCurrentUser();

        var vm = this;
        function init(){
            StockService
                .findStockById(stockID)
                .then(function(response){
                    vm.stock = response.data;
                });
            findInUserWatchlist();
        }
        init();
        vm.addToWatchlist = addToWatchlist;
        vm.addToPortfolio = addToPortfolio;

        vm.message = null;
        vm.error = null;

        function findInUserWatchlist(){
            if(user) {
                StockService
                    .findInUserWatchlist(user._id, stockID)
                    .then(function(response){
                        console.log(response.data);
                        if(response.data) {
                            vm.displayAddToWatchlist = true;
                        }
                    });
            }
        }
        function addToWatchlist(){
            StockService
                .addToUserWatchlist(user._id, stockID)
                .then(function(response){
                    if(response.data){
                        vm.displayAddToWatchlist = true;
                    }
                });
        }

        function postAddToPortfolio(stock){
            if(stock){
                $scope.message = "Successfully added stock to portfolio";
            }else{
                $scope.message = "Unable to add stock to portfolio";
            }
        }

        function addToPortfolio(qty, buyPrice){
            if((isNaN(qty) && qty <= 0) || (isNaN(buyPrice) && buyPrice <= 0)) {
                $scope.error = "Please provide valid quantity and buying price";
            }else{
                var newStock = {
                    "Symbol": stockID,
                    "BuyingPrice": buyPrice,
                    "Quantity": qty
                };
                StockService
                    .addStockToUserPortfolio(user._id, stockID, newStock)
                    .then(function(response){
                        vm.qty = null;
                        vm.buyPrice = null;
                    });
            }
        }
    }
})();
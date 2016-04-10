/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController)
        .controller("ChartController", ChartController)
        .controller("StockNewsController", StockNewsController);

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
        vm.format = format;
        vm.formatDate= formatDate;
        vm.commitAdd = commitAdd;

        vm.addPort = null;
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

        function addToPortfolio(){
            vm.addPort = {
                symbol: stockID
            };
        }

        function commitAdd(stockToAdd){
            if((isNaN(stockToAdd.qty) && stockToAdd.qty <= 0) || (isNaN(stockToAdd.buyPrice) && stockToAdd.buyPrice <= 0)) {
                $scope.error = "Please provide valid quantity and buying price";
            }else{
                var newStock = {
                    "Symbol": stockID,
                    "BuyingPrice": stockToAdd.buyPrice,
                    "Quantity": stockToAdd.qty
                };
                StockService
                    .addStockToUserPortfolio(user._id, stockID, newStock)
                    .then(function(response){
                        vm.addPort = null;
                    });
            }
        }

        function format(num, n, x) {
            if(num) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                return num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
            }
        }

        function formatDate(date){
            if(date) {
                return (new Date(date));
            }
        }
    }

    function ChartController($scope){
        $scope.chartConfig = {
            options: {

                navigator: {
                    enabled: true,
                    series: {
                        data: []
                    }
                },
                rangeSelector: {
                    selected: 1
                },
                plotOptions: {
                    series: {
                        lineWidth: 1,
                        fillOpacity: 0.5

                    }
                },

                legend: {
                    enabled: false
                },
                loading: true

            },
            useHighStocks: true,
            xAxis: [{
                type: 'datetime'
            }],
            title : {
                text : 'AAPL Stock Price'
            },
            series: [{
                id: 'stockprice',
                name: 'Price',
                data: usdeur,
                color: '#80a3ca'
            }]
        }
    }

    function StockNewsController($routeParams, StockService){
        var stockID = $routeParams.symbol;
        var vm = this;
        function init(){
            StockService
                .findStockById(stockID)
                .then(function(response){
                    vm.stock = response.data;
                });

            StockService
                .findStockNews(stockID)
                .then(function(response){
                    console.log(response.data);
                    console.log(response.data.items);
                    vm.stockNews = response.data.items;
                });
        }
        init();
    }
})();
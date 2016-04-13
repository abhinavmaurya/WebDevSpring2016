/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController)
        .controller("ChartController", ChartController)
        .controller("StockNewsController", StockNewsController);

    function DetailsController($routeParams, $scope, UserStockService, StockService, UserService, SweetAlert){
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
        vm.addToWatchlist = addToWatchlist;
        vm.addToPortfolio = addToPortfolio;
        vm.format = format;
        vm.formatDate= formatDate;
        vm.commitAdd = commitAdd;
        vm.setStatus = setStatus;
        vm.getUpDown = getUpDown;

        vm.addPort = null;
        vm.message = null;
        vm.error = null;

        function setStatus(val){
            /*return val < 0 ? 'panel-danger' : val > 0 ? 'panel-success' : '';*/
            return val < 0 ? 'color-red' : val > 0 ? 'color-green' : '';
        }

        function getUpDown(val){
            return val < 0 ? 'fa fa-long-arrow-down' : val > 0 ? 'fa fa-long-arrow-up' : '';
        }

        function findInUserWatchlist(){
            if(user) {
                UserStockService
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
            console.log(user._id, stockID);
            UserStockService
                .addToUserWatchlist(user._id, stockID)
                .then(function(response){
                    if(response.data){
                        SweetAlert.swal("Success!", "Successfully added to Watchlist!", "success");
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
            console.log("portfolio");
            vm.addPort = {
                Symbol: stockID
            };
        }

        function commitAdd(stockToAdd){
            if((isNaN(stockToAdd.qty) && stockToAdd.qty <= 0) || (isNaN(stockToAdd.buyPrice) && stockToAdd.buyPrice <= 0)) {
                $scope.error = "Please provide valid quantity and buying price";
            }else{
                var newStock = {
                    "stockId": stockID,
                    "price": stockToAdd.buyPrice,
                    "purchaseDate": stockToAdd.purchaseDate,
                    "quantity": stockToAdd.qty
                };
                UserStockService
                    .addStockToUserPortfolio(user._id, stockID, newStock)
                    .then(function(response){
                        SweetAlert.swal("Success!", "Successfully added to Portfolio!", "success");
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

    function ChartController(StockService, $routeParams){
        var vm = this;
        var stockID = $routeParams.symbol;
        vm.data = [];

        function init(){
            var params = {
                Normalized: false,
                NumberOfDays: 750,
                DataPeriod: "Day",
                Elements:
                    [{
                        Symbol: stockID,
                        Type: "price",
                        Params: ["c"] //ohlc, c = close only
                    }]
            };
            StockService
                .findHistoricalData(JSON.stringify(params))
                .then(function(response){
                    var dates = response.data.Dates;
                    var price = response.data.Elements[0].DataSeries.close.values;
                    for(var i in dates){
                        var element = [];
                        var dat = new Date(dates[i]);
                        dat = Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
                        element.push(dat);
                        element.push(price[i]);
                        vm.data.push(element);
                    }
                    drawChart(vm.data);
                });
        }
        init();
        function drawChart(chartData) {
            vm.chartConfig = {
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
                title: {
                    text: 'AAPL Stock Price'
                },
                series: [{
                    id: 'stockprice',
                    name: 'Price',
                    data: chartData,
                    color: '#80a3ca'
                }]
            }
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
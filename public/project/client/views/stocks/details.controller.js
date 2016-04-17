/**
 * Created by abhinavmaurya on 3/2/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("DetailsController", DetailsController)
        .controller("ChartController", ChartController)
        .controller("StockNewsController", StockNewsController);

    function DetailsController($routeParams, UserStockService, StockService, UserService, SweetAlert){
        var stockID = $routeParams.symbol;
        var user = UserService.getCurrentUser();

        var vm = this;
        vm.watchers= null;
        vm.holders = null;
        function init(){
            StockService
                .findStockById(stockID)
                .then(function(response){
                    vm.stock = response.data;
                });
            findInUserWatchlist();
            findWatchersAndHolders(stockID);
        }
        init();
        vm.addToWatchlist = addToWatchlist;
        vm.addToWatchlist = addToWatchlist;
        vm.addToPortfolio = addToPortfolio;
        vm.formatDate= formatDate;
        vm.commitAdd = commitAdd;
        vm.setStatus = setStatus;
        vm.getUpDown = getUpDown;

        vm.addPort = null;
        vm.message = null;
        vm.error = null;

        function setStatus(val){
            return val < 0 ? 'color-red' : val > 0 ? 'color-green' : '';
        }

        function getUpDown(val){
            return val < 0 ? 'fa fa-long-arrow-down' : val > 0 ? 'fa fa-long-arrow-up' : '';
        }

        function findInUserWatchlist(){
            if(user) {
                console.log(user);
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

        function findWatchersAndHolders(stockId){
            StockService
                .findStockWatchers(stockId)
                .then(function(response){
                    vm.watchers = response.data;
                });
            StockService
                .findStockHolders(stockId)
                .then(function(response){
                    vm.holders = response.data;
                });
        }

        function addToWatchlist(){
            console.log(user._id, stockID);
            UserStockService
                .addToUserWatchlist(user._id, stockID)
                .then(
                    function(response){
                        if(response.data){
                            var newUser = {
                                userId: user._id,
                                username: user.username
                            };
                            StockService.addWatcherToStock(stockID, newUser);
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        SweetAlert.swal("Success!", "Successfully added to Watchlist!", "success");
                        vm.displayAddToWatchlist = true;
                        findWatchersAndHolders(stockID);
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }

        function addToPortfolio(){
            console.log("portfolio");
            vm.addPort = {
                Symbol: stockID
            };
        }

        function commitAdd(stockToAdd){
            if((isNaN(stockToAdd.qty) || stockToAdd.qty <= 0) || (isNaN(stockToAdd.buyPrice) || stockToAdd.buyPrice <= 0) || (stockToAdd.purchaseDate == null || stockToAdd.purchaseDate > new Date())) {
                /*vm.modal.error = "Please provide valid quantity, buying price";*/
                SweetAlert.swal("Not added!", "Please provide valid quantity, buying price and date!", "error");
            }else{
                var newStock = {
                    "stockId": stockID,
                    "price": stockToAdd.buyPrice,
                    "purchaseDate": stockToAdd.purchaseDate,
                    "quantity": stockToAdd.qty
                };
                UserStockService
                    .addStockToUserPortfolio(user._id, stockID, newStock)
                    .then(
                        function(response){
                            if(!checkIfAlreadyHolder(user._id)){
                                var newUser = {
                                    userId: user._id,
                                    username: user.username
                                };
                                return StockService.addHolderToStock(stockID, newUser);
                            }
                        },
                        function(err){
                            console.log(err);
                        }
                    )
                    .then(
                        function(response){
                            SweetAlert.swal("Success!", "Successfully added to Portfolio!", "success");
                            vm.addPort = null;
                            findWatchersAndHolders(stockID);
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            }
        }

        function checkIfAlreadyHolder(userId){
            var flag = false;
            for(var s in vm.holders){
                if(vm.holders[s].userId == userId){
                    flag = true;
                    break;
                }
            }
            return flag;
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
        vm.loadingChart = true;

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
                    vm.loadingChart = false;
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
                    text: stockID +' Stock Price'
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
                    vm.stockNews = response.data.items;
                });
        }
        init();
    }
})();
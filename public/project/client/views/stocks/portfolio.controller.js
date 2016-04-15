/**
 * Created by abhinavmaurya on 3/10/16.
 */

(function(){

    angular
        .module("TradeBullApp")
        .controller("PortfolioController", WatchlistController);

    function WatchlistController(StockService, UserService, UserStockService, SweetAlert){

        var vm = this;
        var userId = UserService.getCurrentUser()._id;

        vm.messgae = null;
        vm.portfolio = null;
        vm.selStock = null;
        vm.deleteFromPortfolio = deleteFromPortfolio;
        vm.selectStock = selectStock;
        vm.unselectStock = unselectStock;
        vm.updateStock = updateStock;
        vm.setStatus = setStatus;
        vm.getUpDown = getUpDown;


        function init(){
            refreshList();
        }
        init();

        function refreshList(){
            unselectStock();
            UserStockService
                .getUserPortfolio(userId)
                .then(function(response){
                    if(response.data && response.data.length > 0){
                        console.log(response.data);
                        vm.portfolio = response.data;
                        loadRealTimeData();
                    }else{
                        vm.message = "There are no stocks in your portfolio!"
                    }

                });
        }

        function loadRealTimeData(){
            // synchronize loading of data from API
            angular.forEach(vm.portfolio, function(stock){
                StockService
                    .findStockById(stock.stockId)
                    .then(function(response){
                        // format date
                        stock.purchaseDate = new Date(stock.purchaseDate);
                        stock.LastPrice = response.data.LastPrice;
                        stock.Change = response.data.Change;
                        stock.Name = response.data.Name;
                        stock.Investment = stock.price * stock.quantity;
                        stock.CurrentWorth = stock.LastPrice * stock.quantity;
                        stock.TotalPL = (stock.CurrentWorth) - (stock.Investment);
                        stock.TodaysPL = (stock.Change * stock.quantity);
                    });
            });
        }

        function deleteFromPortfolio(stock){
            SweetAlert.swal(
                {
                    title: "Delete "+stock.Name,
                    text: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plz!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        /*SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");*/
                        confirmDelete(stock);
                        SweetAlert.swal("Deleted!", stock.Name+" is deleted from your portfolio!", "success");
                    } else {
                        SweetAlert.swal("Cancelled", stock.Name+" is safe :)", "error");
                    }
                });
        }

        function confirmDelete(stock){

            UserStockService
                .deleteStockFromUserPortfolio(userId, stock._id)
                .then(
                    function(response){
                        return StockService.deleteHolderFromStock(stock._id, userId);
                    },
                    function(err){
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        refreshList();
                    },
                    function(err){
                        console.log(err);
                    }
                );
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

        function setStatus(val){
            return val < 0 ? 'color-red' : val > 0 ? 'color-green' : '';
        }

        function getUpDown(val){
            return val < 0 ? 'fa fa-long-arrow-down' : val > 0 ? 'fa fa-long-arrow-up' : '';
        }
    }
})();

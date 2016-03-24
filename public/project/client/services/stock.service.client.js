/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("StockService", StockService);

    function StockService($http){

        var watchlist =
            [
            {"Name":"Apple Inc","Symbol":"AAPL","LastPrice":101.1},
            {"Name":"Adobe Systems Inc","Symbol":"ADBE","LastPrice":85.26}
            ];
        var portfolio =
            [
            {"Name":"Apple Inc","Symbol":"AAPL","LastPrice":101.1,"BuyingPrice":101.1, "Quantity": 50},
            {"Name":"Adobe Systems Inc","Symbol":"ADBE","LastPrice":85.26, "BuyingPrice":85.26, "Quantity": 50}
            ];
        var result;
        var api = {
            findStockByName: findStockByName,
            findStockById: findStockById,
            findInWatchlist: findInWatchlist,
            findInPortfolio: findInPortfolio,
            getUserWatchlist: getUserWatchlist,
            addToWatchlist: addToWatchlist,
            addToPortfolio: addToPortfolio,
            removeFromWatchlist: removeFromWatchlist,
            removeFromPortfolio: removeFromPortfolio,
            findAllStockInPortfolio: findAllStockInPortfolio,
            updatePortfolioStock: updatePortfolioStock
        };
        return api;

        function findStockByName(name, callback, error){
            $http({
                method: "JSONP",
                params: {
                    input: name
                },
                url: "http://dev.markitondemand.com/Api/Lookup/jsonp?callback=JSON_CALLBACK",
                isArray: true
            }).success(function(data, status) {
                callback(data);
            }).error(function(data, status) {
                console.log("Unable to fetch data");
                error();
            });
        }

        function findStockById(id){
            /*$http({
                method: "JSONP",
                params: {
                    symbol: id
                },
                url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?callback=JSON_CALLBACK",
                isArray: true
            }).success(function(data, status) {
                callback(data);
            }).error(function(data, status) {
                console.log("Unable to fetch data");
                error();
            });*/
            return $http.jsonp("http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + id + "&callback=JSON_CALLBACK");
        }

        function findInWatchlist(stock){
            var flag = null;
            if(stock) {
                for (var s in watchlist) {
                    if (watchlist[s].Symbol == stock.Symbol) {
                        flag = watchlist[s];
                        break;
                    }
                }
            }
            return(flag);
        }

        function findInPortfolio(stock){
            var flag = null;
            if(stock) {
                for (var s in portfolio) {
                    if (portfolio[s].Symbol == stock.Symbol) {
                        flag = portfolio[s];
                        break;
                    }
                }
            }
            return(flag);
        }

        function addToWatchlist(stock, callback){
            if(!findInWatchlist(stock)) {
                var newStock = {
                    "Name": stock.Name,
                    "Symbol": stock.Symbol,
                    "LastPrice": stock.LastPrice
                };
                watchlist.push(newStock);
                console.log("After add");
                console.log(watchlist);
                callback(newStock);
            }else
                callback(stock);
        }

        function addToPortfolio(stock, qty, callback){
            if(stock) {
                var newStock = {
                    "Name": stock.Name,
                    "Symbol": stock.Symbol,
                    "BuyingPrice": stock.LastPrice,
                    "Quantity": qty
                };
                portfolio.push(newStock);
                console.log(portfolio);
                callback(newStock);
            }else
                callback(null);
        }

        function removeFromWatchlist(stock, callback){
            var index = watchlist.indexOf(findInWatchlist(stock));
            if(index >= 0){
                watchlist.splice(index, 1);
            }
            callback(watchlist);
        }

        function removeFromPortfolio(stock, callback){
            var index = portfolio.indexOf(findInPortfolio(stock));
            if(index >= 0){
                portfolio.splice(index, 1);
            }
            callback(portfolio);
        }

        function getUserWatchlist(userId){
            console.log("Service called");
            return $http.get("/api/project/"+ userId + "/watchlist");
        }

        function findAllStockInPortfolio(callback){
            callback(portfolio);
        }

        function updatePortfolioStock(stock, callback){
            var index = portfolio.indexOf(findInPortfolio(stock));
            if(index >= 0){
                portfolio[index]={
                    "Name": stock.Name,
                    "Symbol": stock.Symbol,
                    "BuyingPrice": stock.BuyingPrice,
                    "Quantity": stock.Quantity
                };
            }
            callback(portfolio);
        }
    }
})();
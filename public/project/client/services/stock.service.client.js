/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("StockService", StockService);

    function StockService($http){

        var portfolio =
            [
            {"Name":"Apple Inc","Symbol":"AAPL","LastPrice":101.1,"BuyingPrice":101.1, "Quantity": 50},
            {"Name":"Adobe Systems Inc","Symbol":"ADBE","LastPrice":85.26, "BuyingPrice":85.26, "Quantity": 50}
            ];
        var result;
        var api = {
            findStockByName: findStockByName,
            findStockById: findStockById,
            findInUserWatchlist: findInUserWatchlist,
            findInPortfolio: findInPortfolio,
            getUserWatchlist: getUserWatchlist,
            addToUserWatchlist: addToUserWatchlist,
            addToPortfolio: addToPortfolio,
            deleteStockFromUserWatchlist: deleteStockFromUserWatchlist,
            removeFromPortfolio: removeFromPortfolio,
            findAllStockInPortfolio: findAllStockInPortfolio,
            updatePortfolioStock: updatePortfolioStock
        };
        return api;

        function findStockByName(name){
            return $http.jsonp("http://dev.markitondemand.com/Api/Lookup/jsonp?input=" + name + "&callback=JSON_CALLBACK");
        }

        function findStockById(id){
            return $http.jsonp("http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + id + "&callback=JSON_CALLBACK");
        }

        function findInUserWatchlist(userId, stockId){
            return $http.get("/api/project/"+userId+"/watchlist/"+stockId);
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

        function addToUserWatchlist(userId, stockId){
            return $http.post("/api/project/"+ userId +"/watchlist/"+stockId);
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

        function deleteStockFromUserWatchlist(userId, stockId){
            return $http.delete("/api/project/"+userId+"/watchlist/"+stockId);
        }

        function removeFromPortfolio(stock, callback){
            var index = portfolio.indexOf(findInPortfolio(stock));
            if(index >= 0){
                portfolio.splice(index, 1);
            }
            callback(portfolio);
        }

        function getUserWatchlist(userId){
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
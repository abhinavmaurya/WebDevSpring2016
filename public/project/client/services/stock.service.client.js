/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("StockService", StockService);

    function StockService($http){

        var api = {
            findStockByName: findStockByName,
            findStockById: findStockById,
            findInUserWatchlist: findInUserWatchlist,
            findInPortfolio: findInPortfolio,
            getUserWatchlist: getUserWatchlist,
            addToUserWatchlist: addToUserWatchlist,
            addStockToUserPortfolio: addStockToUserPortfolio,
            deleteStockFromUserWatchlist: deleteStockFromUserWatchlist,
            deleteStockFromUserPortfolio: deleteStockFromUserPortfolio,
            getUserPortfolio: getUserPortfolio,
            updateStockInUserPortfolio: updateStockInUserPortfolio,
            findStockNews: findStockNews
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

        function addStockToUserPortfolio(userId, stockId, stock){
            return $http.post("/api/project/"+ userId + "/portfolio/" + stockId, stock);
        }

        function deleteStockFromUserWatchlist(userId, stockId){
            return $http.delete("/api/project/"+userId+"/watchlist/"+stockId);
        }

        function deleteStockFromUserPortfolio(userId, stockId){
            return $http.delete("/api/project/"+userId+"/portfolio/"+stockId);
        }

        function getUserWatchlist(userId){
            return $http.get("/api/project/"+ userId + "/watchlist");
        }

        function getUserPortfolio(userId){
            return $http.get("/api/project/"+ userId + "/portfolio");
        }

        function updateStockInUserPortfolio(userId, stockId, updatedStock){
            return $http.put("/api/project/"+ userId +"/portfolio/"+stockId, updatedStock);
        }

        function findStockNews(stockId){
            /*return $http.jsonp("https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://finance.yahoo.com/rss/headline?s="+stockId+ "&callback=JSON_CALLBACK");*/
            /*return $http.jsonp("http://rss2json.com/api.json?rss_url=http%3A%2F%2Ffinance.yahoo.com%2Frss%2Fheadline%3Fs%3D"+stockId + "&callback=JSON_CALLBACK");*/
            return $http.get("http://rss2json.com/api.json?rss_url=http%3A%2F%2Ffinance.yahoo.com%2Frss%2Fheadline%3Fs%3D"+stockId);

        }
    }
})();
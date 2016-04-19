/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("UserStockService", UserStockService);

    function UserStockService($http){

        var api = {
            findInUserWatchlist: findInUserWatchlist,
            findInUserPortfolio: findInUserPortfolio,
            getUserWatchlist: getUserWatchlist,
            addToUserWatchlist: addToUserWatchlist,
            addStockToUserPortfolio: addStockToUserPortfolio,
            deleteStockFromUserWatchlist: deleteStockFromUserWatchlist,
            deleteStockFromUserPortfolio: deleteStockFromUserPortfolio,
            getUserPortfolio: getUserPortfolio,
            updateStockInUserPortfolio: updateStockInUserPortfolio
        };
        return api;

        function findInUserWatchlist(userId, stockId){
            return $http.get("/api/project/"+userId+"/watchlist/"+stockId);
        }

        function findInUserPortfolio(userId, stockId){
            return $http.get("/api/project/"+userId+"/portfolio/"+stockId);
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
    }
})();
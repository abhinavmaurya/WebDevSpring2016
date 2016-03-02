/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .factory("StockService", StockService);

    function StockService($http){
        var result;
        var api = {
            findStockByName: findStockByName,
            findStockById: findStockById
            //stock_search: stock_search
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



        function findStockById(id, callback){
            $http({
                method: "JSONP",
                params: {
                    input: name
                },
                url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?callback=JSON_CALLBACK",
                isArray: true
            }).success(function(data, status) {
                callback(data);
            }).error(function(data, status) {
                console.log("Unable to fetch data");
                error();
            });
        }
    }
})();
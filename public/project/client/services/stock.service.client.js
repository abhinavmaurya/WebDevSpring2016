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
            findStockNews: findStockNews,
            findHistoricalData: findHistoricalData
        };
        return api;

        function findStockByName(name){
            return $http.jsonp("http://dev.markitondemand.com/Api/Lookup/jsonp?input=" + name + "&callback=JSON_CALLBACK");
        }

        function findStockById(id){
            return $http.jsonp("http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + id + "&callback=JSON_CALLBACK");
        }

        function findStockNews(stockId){
            return $http.get("http://rss2json.com/api.json?rss_url=http%3A%2F%2Ffinance.yahoo.com%2Frss%2Fheadline%3Fs%3D"+stockId);
        }

        function findHistoricalData(params){
            return $http.jsonp("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp?parameters=" + params + "&callback=JSON_CALLBACK");

        }
    }
})();
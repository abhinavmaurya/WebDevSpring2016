/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){

    var StockSchema = require("./stock.schema.server.js")(mongoose);
    var StockModel = mongoose.model("Stock", StockSchema);
    var api = {
        findStockWatchers: findStockWatchers,
        findStockHolders: findStockHolders,
        addWatcherToStock: addWatcherToStock,
        deleteWatcherFromStock: deleteWatcherFromStock,
        addHolderToStock: addHolderToStock,
        deleteHolderFromStock: deleteHolderFromStock
    };
    return api;

    function findStockWatchers(stockId){
        var deferred = q.defer();
        StockModel.findOne(
            {stockId: stockId},
            function(err, stock){
                if(err){
                    deferred.reject(err);
                }else{
                    if(stock)
                        deferred.resolve(stock.watchers);
                    else
                        deferred.resolve(null);
                }
            }
        );
        return deferred.promise;
    }

    function findStockHolders(stockId){
        var deferred = q.defer();
        StockModel.findOne(
            {stockId: stockId},
            function(err, stock){
                if(err){
                    deferred.reject(err);
                }else{
                    if(stock)
                        deferred.resolve(stock.holders);
                    else
                        deferred.resolve(null);
                }
            }
        );
        return deferred.promise;
    }

    function addWatcherToStock(stockId, userId){
        var deferred = q.defer();
        StockModel.findOne(
            {stockId: stockId},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    if(doc) {   // if stock is already created
                        doc.watchers.push(userId);
                        // save changes
                        doc.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }else{   // if stock is not created and first user is watching/holding
                        var newStock = {
                            stockId: stockId,
                            watchers: [],
                            holders: []
                        };
                        newStock.watchers.push(userId);
                        StockModel.create(
                            newStock,
                            function(err, doc){
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                        });
                    }
                }
            }
        );
        return deferred.promise;
    }

    function addHolderToStock(stockId, userId){
        var deferred = q.defer();
        StockModel.findOne(
            {stockId: stockId},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    if(doc) {   // if stock is already created
                        doc.holders.push(userId);
                        // save changes
                        doc.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }else{
                        var newStock = {
                            stockId: stockId,
                            watchers: [],
                            holders: []
                        };
                        newStock.holders.push(userId);

                        StockModel.create(
                            newStock,
                            function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            }
        );
        return deferred.promise;
    }

    function deleteWatcherFromStock(stockId, userId){
        var deferred = q.defer();
        StockModel.update(
            {stockId: stockId},
            {$pull: {watchers: userId}},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function deleteHolderFromStock(stockId, userId){
        var deferred = q.defer();
        StockModel.update(
            {stockId: stockId},
            {$pull: {holders: userId}},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }
}
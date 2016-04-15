/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){

    var UserStockSchema = require("./user-stock.schema.server.js")(mongoose);
    var UserStockModel = mongoose.model("UserStock", UserStockSchema);
    var api = {
        findUserWatchlist: findUserWatchlist,
        findUserPortfolio: findUserPortfolio,
        findStockInUserWatchlist: findStockInUserWatchlist,
        findStockInUserPortfolio: findStockInUserPortfolio,
        addStockInUserWatchlist: addStockInUserWatchlist,
        deleteStockInUserWatchlist: deleteStockInUserWatchlist,
        addStockInUserPortfolio: addStockInUserPortfolio,
        deleteStockInUserPortfolio: deleteStockInUserPortfolio,
        updateStockInUserPortfolio: updateStockInUserPortfolio,
        createUserStock: createUserStock
    };
    return api;

    function findUserWatchlist(userId){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        if(doc){
                            deferred.resolve(doc.watchlist);
                        }else{
                            deferred.resolve([]);
                        }

                    }
            });
        return deferred.promise;
    }

    function findUserPortfolio(userId){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc.portfolio);
                    }
                });
        return deferred.promise;
    }

    function findStockInUserWatchlist(userId, watchlistStockId){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {
                    userId: userId,
                    watchlist: watchlistStockId
                },
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        /*deferred.resolve(doc.watchlist.id(watchlistStockId));*/
                        /*UserStockModel.findOne(
                            {watchlist: watchlistStockId},
                            function(err, doc){
                                if(err){
                                    deferred.reject(err);
                                }else{
                                    deferred.resolve(doc);
                                }
                            }
                        );*/
                        deferred.resolve(doc);
                    }
                });
        return deferred.promise;
    }

    function findStockInUserPortfolio(userId, portfolioStockId){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc.portfolio.id(portfolioStockId));
                    }
            });
        return deferred.promise;
    }

    function addStockInUserWatchlist(userId, newWatchlistStock){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        if(doc){
                            doc.watchlist.push(newWatchlistStock);
                            deferred.resolve(doc.save());
                        }
                    }
            });
        return deferred.promise;
    }

    function addStockInUserPortfolio(userId, newPortfolioStock){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        if(doc){
                            doc.portfolio.push(newPortfolioStock);
                            deferred.resolve(doc.save());
                        }
                    }
            });
        return deferred.promise;
    }

    function deleteStockInUserWatchlist(userId, stockId){
        var deferred = q.defer();
        UserStockModel.update(
                {userId: userId},
                {$pull: {watchlist: stockId}},
                function(err, stats){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(stats);
                    }
                }
        );
        return deferred.promise;
    }

    function deleteStockInUserPortfolio(userId, portfolioStockId){
        var deferred = q.defer();
        UserStockModel.update(
            {userId: userId},
            {$pull: {portfolio: {_id: portfolioStockId}}},
            function(err, stats){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }

    function updateStockInUserPortfolio(userId,updateStockId, updatedPortfolioStock){
        var deferred = q.defer();
        UserStockModel
            .findOne(
                {userId: userId},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        if(doc){
                            var stockToUpdate = doc.portfolio.id(updateStockId);
                            stockToUpdate.quantity = updatedPortfolioStock.quantity;
                            stockToUpdate.purchaseDate = updatedPortfolioStock.purchaseDate;
                            stockToUpdate.price = updatedPortfolioStock.price;
                            deferred.resolve(doc.save());
                        }
                    }
            });
        return deferred.promise;
    }

    function createUserStock(userId){
        var deferred = q.defer();
        var newUserStock = {
            userId: userId,
            watchlist: [],
            portfolio: []
        };
        UserStockModel
            .create(newUserStock, function(err, stats){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }
}
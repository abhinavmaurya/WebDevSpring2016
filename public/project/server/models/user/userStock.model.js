/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);
    var api = {
        findUserWatchlist: findUserWatchlist,
        findUserPortfolio: findUserPortfolio,
        findStockInUserPortfolio: findStockInUserPortfolio,
        addStockInUserWatchlist: addStockInUserWatchlist,
        deleteStockInUserWatchlist: deleteStockInUserWatchlist,
        addStockInUserPortfolio: addStockInUserPortfolio,
        deleteStockInUserPortfolio: deleteStockInUserPortfolio,
        updateStockInUserPortfolio: updateStockInUserPortfolio
    };
    return api;

    function findUserWatchlist(userId){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user.watchlist);
                }
            });
        return deferred.promise;
    }

    function findUserPortfolio(userId){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user.portfolio);
                }
            });
        return deferred.promise;
    }

    function findStockInUserPortfolio(userId, portfolioStockId){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user.portfolio.id(portfolioStockId));
                }
            });
        return deferred.promise;
    }

    function addStockInUserWatchlist(userId, newWatchlistStock){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    user.watchlist.push(newWatchlistStock);
                    deferred.resolve(user.save());
                }
            });
        return deferred.promise;
    }

    function addStockInUserPortfolio(userId, newPortfolioStock){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    user.portfolio.push(newPortfolioStock);
                    deferred.resolve(user.save());
                }
            });
        return deferred.promise;
    }

    function deleteStockInUserWatchlist(userId, stockId){
        var deferred = q.defer();
        UserModel.update(
                {_id: userId},
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
        UserModel.update(
            {_id: userId},
            {$pull: {watchlist: {_id: portfolioStockId}}},
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

    function updateStockInUserPortfolio(userId, updatedStockId, updatedPortfolioStock){
        var deferred = q.defer();
        UserModel
            .findById(userId, function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    var stockToUpdate = user.portfolio.id(updatedStockId);
                    stockToUpdate.quantity = updatedPortfolioStock.quantity;
                    stockToUpdate.purchaseDate = updatedPortfolioStock.purchaseDate;
                    stockToUpdate.price = updatedPortfolioStock.price;
                    deferred.resolve(user.save());
                }
            });
        return deferred.promise;
    }
}
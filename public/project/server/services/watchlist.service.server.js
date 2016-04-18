/**
 * Created by abhinavmaurya on 3/23/16.
 */
"use strict";
module.exports = function (app, userStockModel){

    app.post("/api/project/:userId/watchlist/:stockId", addToUserWatchlist);
    app.delete("/api/project/:userId/watchlist/:stockId", deleteStockFromUserWatchlist);
    app.get("/api/project/:userId/watchlist", getUserWatchlist);
    app.get("/api/project/:userId/watchlist/:stockId", findStockInUserWatchList);

    function addToUserWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        userStockModel
            .addStockInUserWatchlist(userId, stockId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findStockInUserWatchList(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        userStockModel
            .findStockInUserWatchlist(userId, stockId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteStockFromUserWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        userStockModel
            .deleteStockInUserWatchlist(userId, stockId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUserWatchlist(req, res){
        var userId = req.params.userId;
        userStockModel
            .findUserWatchlist(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}

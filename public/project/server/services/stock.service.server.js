/**
 * Created by abhinavmaurya on 3/23/16.
 */
"use strict"

module.exports = function (app, stockModel){

    app.post("/api/project/:stockId/holder", addHolderToStock);
    app.post("/api/project/:stockId/watcher", addWatcherToStock);
    app.delete("/api/project/:stockId/holder/:userId", deleteHolderFromStock);
    app.delete("/api/project/:stockId/watcher/:userId", deleteWatcherFromStock);
    app.get("/api/project/:userId/holder", findStockHolders);
    app.get("/api/project/:userId/watcher", findStockWatchers);

    function addHolderToStock(req, res){
        var stockId = req.params.stockId;
        var user = req.body;

        stockModel
            .addHolderToStock(stockId, user)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addWatcherToStock(req, res){
        var stockId = req.params.stockId;
        var user = req.body;
        stockModel
            .addWatcherToStock(stockId, user)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findStockHolders(req, res){
        var userId = req.params.userId;
        stockModel
            .findStockHolders(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findStockWatchers(req, res){
        var userId = req.params.userId;
        stockModel
            .findStockWatchers(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteHolderFromStock(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        stockModel
            .deleteHolderFromStock(stockId, userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteWatcherFromStock(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        stockModel
            .deleteWatcherFromStock(stockId, userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
};

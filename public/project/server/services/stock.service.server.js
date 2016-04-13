/**
 * Created by abhinavmaurya on 3/23/16.
 */

module.exports = function (app, stockModel){

    app.post("/api/project/:stockId/portfolio/:userId", addHolderToStock);
    app.post("/api/project/:stockId/watchlist/:userId", addWatcherToStock);
    app.delete("/api/project/:stockId/portfolio/:userId", deleteHolderFromStock);
    app.delete("/api/project/:stockId/watchlist/:userId", deleteWatcherFromStock);
    app.get("/api/project/:userId/portfolio/", findStockHolders);
    app.get("/api/project/:userId/watchlist", findStockWatchers);

    function addHolderToStock(req, res){
        var stockId = req.params.stockId;
        var userId = req.params.userId;
        stockModel
            .addHolderToStock(stockId, userId)
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
        var userId = req.params.userId;
        stockModel
            .addWatcherToStock(stockId, userId)
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
}

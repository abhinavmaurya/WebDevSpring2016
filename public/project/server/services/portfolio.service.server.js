/**
 * Created by abhinavmaurya on 3/23/16.
 */

module.exports = function (app, userStockModel){

    app.post("/api/project/:userId/portfolio/:stockId", addStockToUserPortfolio);
    app.put("/api/project/:userId/portfolio/:stockId", updateStockInUserPortfolio);
    app.delete("/api/project/:userId/portfolio/:stockId", deleteStockFromUserPortfolio);
    app.get("/api/project/:userId/portfolio/:stockId", findStockInUserPortfolio);
    app.get("/api/project/:userId/portfolio", getUserPortfolio);

    function addStockToUserPortfolio(req, res){
        var stockToAdd = req.body;
        var userId = req.params.userId;
        userStockModel
            .addStockInUserPortfolio(userId, stockToAdd)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUserPortfolio(req, res){
        var userId = req.params.userId;
        userStockModel
            .findUserPortfolio(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findStockInUserPortfolio(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        /*var stock = model.findStockInUserWatchList(userId, stockId);
         res.send(stock);*/
        userStockModel
            .findStockInUserPortfolio(userId, stockId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteStockFromUserPortfolio(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        userStockModel
            .deleteStockInUserPortfolio(userId, stockId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateStockInUserPortfolio(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        var updatedStock = req.body;
        /*model.updateStockInUserPortfolio(userId, stockId, update);
        res.send(200);*/
        userStockModel
            .updateStockInUserPortfolio(userId, stockId, updatedStock)
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

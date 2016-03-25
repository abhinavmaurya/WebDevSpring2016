/**
 * Created by abhinavmaurya on 3/23/16.
 */

module.exports = function (app, model){

    app.post("/api/project/:userId/portfolio/:stockId", addStockToUserPortfolio);
    app.put("/api/project/:userId/portfolio/:stockId", updateStockInUserPortfolio);
    app.delete("/api/project/:userId/portfolio/:stockId", deleteStockFromUserPortfolio);
    //app.get("/api/project/:userId/portfolio/:stockId", findStockInUserPortfolio);
    app.get("/api/project/:userId/portfolio", getUserPortfolio);

    function addStockToUserPortfolio(req, res){
        var stockToAdd = req.body;
        var userId = req.params.userId;
        model.addStockToUserPortfolio(userId, stockToAdd);
        res.send(200);
    }

    function getUserPortfolio(req, res){
        var userId = req.params.userId;
        var portfolio = model.getUserPortfolio(userId);
        res.send(portfolio);
    }

    function deleteStockFromUserPortfolio(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        model.deleteStockFromUserPortfolio(userId, stockId);
        res.send(200);
    }

    function updateStockInUserPortfolio(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        var update = req.body;
        model.updateStockInUserPortfolio(userId, stockId, update);
        res.send(200);
    }
}

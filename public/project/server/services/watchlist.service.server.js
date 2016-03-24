/**
 * Created by abhinavmaurya on 3/23/16.
 */

module.exports = function (app, model){

    app.post("/api/project/:userId/watchlist/:stockId", addToWatchlist);
    app.delete("/api/project/:userId/watchlist/:stockId", deleteStockFromUserWatchlist);
    app.get("/api/project/:userId/watchlist", getUserWatchlist);
    app.get("/api/project/:userId/watchlist/:stockId", findStockInUserWatchList);

    function addToWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        //model.addToWatchlist(userId, stockId);
        res.send(200);
    }

    function findStockInUserWatchList(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        //model.getStockFromWatchlist(userId, stockId);
        res.send(200);
    }

    function deleteStockFromUserWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        model.deleteStockFromUserWatchlist(userId, stockId);
        res.send(200);
    }

    function getUserWatchlist(req, res){
        var userId = req.params.userId;
        console.log(userId + "--");
        var watchlist = model.getUserWatchlist(userId);
        res.send(watchlist);
    }
}

/**
 * Created by abhinavmaurya on 3/23/16.
 */

module.exports = function (app, model){

    app.post("/api/project/:userId/watchlist/:stockId", addToWatchlist);
    app.delete("/api/project/:userId/watchlist/:stockId", deleteFromWatchlist);
    app.get("/api/project/:userId/watchlist", getWatchlist);
    app.get("/api/project/:userId/watchlist/:stockId", getStockFromWatchlist);

    function addToWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        //model.addToWatchlist(userId, stockId);
        res.send(200);
    }

    function getStockFromWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        //model.getStockFromWatchlist(userId, stockId);
        res.send(200);
    }

    function deleteFromWatchlist(req, res){
        var userId = req.params.userId;
        var stockId = req.params.stockId;
        console.log(userId + "--" + stockId);
        //model.deleteFromWatchlist(userId, stockId);
        res.send(200);
    }

    function getWatchlist(req, res){
        var userId = req.params.userId;
        console.log(userId + "--");
        //var watchlist = model.getWatchlistOfUser(userId, stockId);
        res.send(200);
    }
}

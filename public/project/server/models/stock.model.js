/**
 * Created by abhinavmaurya on 3/24/16.
 */

var watchlistMock = require("./watchlist.mock.json");
var portfolioMock = require("./portfolio.mock.json");

module.exports = function(){

    var api = {
        // watchlist
        findStockInWatchlist: findStockInWatchlist
    };
    return api;

    function findStockInWatchList(userId, stockId){
        var flag = null;
        for (var u in watchlistMock) {
            if (watchlistMock[u].userId == userId) {
                for(var s in watchlistMock[u].watchlist){
                    if(watchlistMock[u].watchlist[s] == stockId){
                        flag = watchlistMock[u].watchlist[s];
                        break;
                    }
                }
            }
        }
        return(flag);
    }
}

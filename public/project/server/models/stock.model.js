/**
 * Created by abhinavmaurya on 3/24/16.
 */

var watchlistMock = require("./watchlist.mock.json");
//var portfolioMock = require("./portfolio.mock.json");

module.exports = function(){

    var api = {
        // watchlist
        findStockInUserWatchList: findStockInUserWatchList,
        getUserWatchlist: getUserWatchlist,
        deleteStockFromUserWatchlist: deleteStockFromUserWatchlist,
        addToUserWatchlist: addToUserWatchlist
    };
    return api;

    function findStockInUserWatchList(userId, stockId){
        var flag = null;
        for (var u in watchlistMock) {
            if (watchlistMock[u].userId == userId) {
                for(var s in watchlistMock[u].watchlist){
                    if(watchlistMock[u].watchlist[s].Symbol == stockId){
                        flag = watchlistMock[u].watchlist[s];
                        break;
                    }
                }
            }
        }
        return(flag);
    }

    function getUserWatchlist(userId){
        var user_watchlist = null;
        for(var u in watchlistMock){
            if(watchlistMock[u].userId == userId){
                user_watchlist = watchlistMock[u].watchlist;
                break;
            }
        }
        return user_watchlist;
    }

    function deleteStockFromUserWatchlist(userId, stockId){
        for (var u in watchlistMock) {
            if (watchlistMock[u].userId == userId) {
                for(var s in watchlistMock[u].watchlist){
                    if(watchlistMock[u].watchlist[s].Symbol == stockId){
                        watchlistMock[u].watchlist.splice(s, 1);
                        break;
                    }
                }
            }
        }
    }

    function addToUserWatchlist(userId, stockId){
        for (var u in watchlistMock) {
            if (watchlistMock[u].userId == userId) {
                var record = {"Symbol": stockId};
                watchlistMock[u].watchlist.push(record);
                break;
            }
        }
    }
}

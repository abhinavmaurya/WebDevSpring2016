/**
 * Created by abhinavmaurya on 3/24/16.
 */

var watchlistMock = require("./watchlist.mock.json");
var portfolioMock = require("./portfolio.mock.json");

module.exports = function(){

    var api = {
        // watchlist
        findStockInUserWatchList: findStockInUserWatchList,
        getUserWatchlist: getUserWatchlist,
        deleteStockFromUserWatchlist: deleteStockFromUserWatchlist,
        addToUserWatchlist: addToUserWatchlist,
        addStockToUserPortfolio: addStockToUserPortfolio,
        getUserPortfolio: getUserPortfolio,
        deleteStockFromUserPortfolio: deleteStockFromUserPortfolio,
        updateStockInUserPortfolio: updateStockInUserPortfolio
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

    function deleteStockFromUserPortfolio(userId, stockId){
        for (var u in portfolioMock) {
            if (portfolioMock[u].userId == userId) {
                for(var s in portfolioMock[u].stocks){
                    if(portfolioMock[u].stocks[s].Symbol == stockId){
                        portfolioMock[u].stocks.splice(s, 1);
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

    function addStockToUserPortfolio(userId, stock){
        for(var u in portfolioMock){
            if(portfolioMock[u].userId == userId){
                portfolioMock[u].stocks.push(stock);
                break;
            }
        }
    }

    function getUserPortfolio(userId){
        var user_portfolio = null;
        for(var u in portfolioMock){
            if(portfolioMock[u].userId == userId){
                user_portfolio = portfolioMock[u].stocks;
                break;
            }
        }
        return user_portfolio;
    }

    function updateStockInUserPortfolio(userId, stockId, update){
        for(var u in portfolioMock){
            if(portfolioMock[u].userId == userId){
                for(var s in portfolioMock[u].stocks){
                    if(portfolioMock[u].stocks[s].Symbol == stockId){
                        portfolioMock[u].stocks[s].BuyingPrice = update.BuyingPrice;
                        portfolioMock[u].stocks[s].Quantity = update.Quantity;
                        console.log(portfolioMock[u].stocks[s]);
                        break;
                    }
                }
            }
        }
    }
}

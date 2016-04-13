/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function(app){
    var userModel   = require("./models/user/user.model.js")();
    var userStockModel   = require("./models/user/userStock.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel, userStockModel);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userStockModel);
    var watchlistService = require("./services/watchlist.service.server.js")(app, userStockModel);

    var stockModel      = require("./models/stock.model.js")();
    var stockService    = require("./services/stock.service.server.js")(app, stockModel);
}
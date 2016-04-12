/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function(app){
    var userModel   = require("./models/user/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);

    var stockModel   = require("./models/stock.model.js")();
    var portfolioService = require("./services/portfolio.service.server.js")(app, stockModel);
    var watchlistService = require("./services/watchlist.service.server.js")(app, stockModel);
}
/**
 * Created by abhinavmaurya on 3/16/16.
 */
"use strict";
module.exports = function(app, db, userModel, securityService){
    var userStockModel   = require("./models/user/userStock.model.js")();
    var stockModel      = require("./models/stock/stock.model.js")();

    // userModel passed from server.js as passport authentication for assignment and project is combined.
    // Also securityService contains the passport authentication.
    var userService = require("./services/user.service.server.js")(app, userModel, userStockModel, securityService);
    var adminService = require("./services/admin.service.server.js")(app, userModel, userStockModel);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userStockModel);
    var watchlistService = require("./services/watchlist.service.server.js")(app, userStockModel);
    var stockService    = require("./services/stock.service.server.js")(app, stockModel);
}
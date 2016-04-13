/**
 * Created by abhinavmaurya on 4/12/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var PortfolioStockSchema = require("./portfolio.schema.server.js")();
    var UserStockSchema = new mongoose.Schema(
        {
            userId: String,

            /*User watchlist*/
            watchlist: [String],

            /*User Portfolio*/
            portfolio: [PortfolioStockSchema]
        }, {collection: "project.user.stock"});
    return UserStockSchema;
};
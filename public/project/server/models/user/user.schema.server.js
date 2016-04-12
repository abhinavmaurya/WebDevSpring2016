/**
 * Created by abhinavmaurya on 4/12/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var PortfolioStockSchema = require("./portfolio.schema.server.js")();
    var UserSchema = new mongoose.Schema(
        {
            /*User Basic Info*/
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            about: String,
            admin: Boolean,

            /*User watchlist*/
            watchlist: [String],

            /*User Portfolio*/
            portfolio: [PortfolioStockSchema]
        }, {collection: "project.user"});
    return UserSchema;
};
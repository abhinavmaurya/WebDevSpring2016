/**
 * Created by abhinavmaurya on 4/12/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var StockSchema = new mongoose.Schema(
        {
            stockId: String,
            watchers: [String], //ids of users watching this stock
            holders: [String]  //ids of users holding this stock
        }, {collection: "project.stock"});
    return StockSchema;
};
/**
 * Created by abhinavmaurya on 4/12/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var PortfolioStockSchema = new mongoose.Schema(
        {
            stockId: {type: String, required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            purchaseDate: {type: Date, default: Date.now}
        }, {collection: "project.portfolio"});
    return PortfolioStockSchema;
};
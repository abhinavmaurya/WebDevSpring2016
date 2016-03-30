/**
 * Created by abhinavmaurya on 3/30/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var FieldSchema = new mongoose.Schema(
        {
            label: String,
            type: {type: String, default: "TEXT", enum:["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
            placeholder: String,
            options: [{label: String, value: String}],
        }, {collection: "assignment.field"});
    return FieldSchema;
};

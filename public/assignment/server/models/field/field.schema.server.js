/**
 * Created by abhinavmaurya on 3/30/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var FieldSchema = new mongoose.Schema(
        {
            label: String,
            type: {type: String, default: "TEXT"/*, enum:["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "DROPDOWN", "DATE", "RADIO", "CHECKBOX"]*/},
            placeholder: String,
            options: [{label: String, value: String}],
        }, {collection: "assignment.field"});
    return FieldSchema;
};

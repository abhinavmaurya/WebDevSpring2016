/**
 * Created by abhinavmaurya on 3/30/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var FieldSchema = require("../field/field.schema.server.js")();
    var FormSchema = new mongoose.Schema(
        {
            userId: String,
            title: String,
            fields: [FieldSchema],
            created: {type: Date, default: Date.now},
            updated: {type: Date, default: Date.now},
        }, {collection: "assignment.form"});
    return FormSchema;
};
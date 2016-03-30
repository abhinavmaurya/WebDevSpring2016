/**
 * Created by abhinavmaurya on 3/29/16.
 */

var mongoose = require('mongoose');
module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String]
        }, {collection: "assignment.user"});
    return UserSchema;
};
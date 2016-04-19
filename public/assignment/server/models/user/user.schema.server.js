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
            emails: [String],
            phones: [String],
            roles: [String],
            // field to identify type of user object (assignment or project)
            app: {type: String, default:"assignment"}
        }, {collection: "assignment.user"});
    return UserSchema;
};
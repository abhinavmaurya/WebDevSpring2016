/**
 * Created by abhinavmaurya on 4/12/16.
 */

var mongoose = require('mongoose');
module.exports = function() {
    
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
            /*followers: User being followed by these users*/
            followers: [String],
            /*following: User following these users*/
            following: [String]

        }, {collection: "project.user"});
    return UserSchema;
};
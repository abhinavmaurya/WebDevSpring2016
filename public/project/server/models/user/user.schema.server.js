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
            admin: {type: Boolean, default: false},
            /*followers: User being followed by these users*/
            followers: [{userId: String, username: String}],
            /*following: User following these users*/
            following: [{userId: String, username: String}]

        }, {collection: "project.user"});
    return UserSchema;
};
/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function(app, db){
    var formModel = require("./models/form.model.js")(db);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldService = require("./services/field.service.server.js")(app, formModel);

    var userModel   = require("./models/user.model.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);
};
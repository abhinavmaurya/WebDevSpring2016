/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function(app, db, userModel, securityService){
    var formModel = require("./models/form/form.model.js")(db);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldService = require("./services/field.service.server.js")(app, formModel);

    //var userModel   = require("./models/user/user.model.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel, securityService);
    var adminService = require("./services/admin.service.server.js")(app, userModel);
};
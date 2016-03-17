/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function (app, model){
    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);

    function login(req, res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        console.log("inside login");
        console.log(req.session.currentUser);
        res.json(user);
    }

    function loggedin(req, res){
        res.json(req.session.currentUser);
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }
}

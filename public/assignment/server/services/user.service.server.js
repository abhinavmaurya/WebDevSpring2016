/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function (app, model){
    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:userId", getUserByUserId);
    app.get("/api/assignment/user/username/:username", getUserByUsername);

    function login(req, res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res){
        res.json(req.session.currentUser);
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function getUserByUserId(req, res){
        var userId = req.params.userId;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function getUserByUsername(req, res){
        var username = req.params.username;
        var user = model.findUserByUsername(username);
        res.json(user);
    }

    function register(req, res){
        var user = req.body;
        user = model.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var userData = req.body;
        user = model.updateUser(userId, userData);
        req.session.currentUser = user;
        res.json(user);
    }

    function deleteUser(req, res){
        var userId = req.bosy.userId;
        model.deleteUserById(userId);
        res.send(200);
    }

    function getAllUsers(req, res){
        var users = model.getAllUsers();
        res.json(users);
    }
}

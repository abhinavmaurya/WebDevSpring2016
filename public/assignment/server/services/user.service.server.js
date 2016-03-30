/**
 * Created by abhinavmaurya on 3/16/16.
 */

module.exports = function (app, userModel){
    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", createUser);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:userId", getUserByUserId);
    app.get("/api/assignment/user/username/:username", getUserByUsername);

    function login(req, res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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
        userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res){
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var userData = req.body;
        userModel.updateUserById(userId, userData)
            .then(
                function(stats){
                    //return userModel.getUserByUserId(userId);
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            /*.then(
                function(user){
                    console.log(user);
                    req.session.currentUser(user);
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )*/;
    }

    function deleteUser(req, res){
        var userId = req.body.userId;
        userModel.deleteUserById(userId)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res){
        userModel.getAllUsers()
            .then(
                function(docs){
                    res.json(docs);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
};

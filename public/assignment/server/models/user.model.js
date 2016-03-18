/**
 * Created by abhinavmaurya on 3/16/16.
 */

var mock = require('./user.mock.json');

//load q promise library
var q = require("q");

module.exports = function(){
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers
    };
    return api;

    function findUserByCredentials(credentials){
        for(var u in mock) {
            if(mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user){
        user._id = new Date().getTime();
        mock.push(user);
        return user;
    }

    function updateUser(userId, user){
        var index = mock.indexOf(findUserById(userId));
        if(index>=0){
            mock[index] = {
                _id: userId,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles
            }
        }
        return (mock[index]);
    }

    function findUserById(userId){
        for(var u in mock){

            if(mock[u]._id == userId) {
                return mock[u];
            }
        }
        return -1;
    }

    function findUserByUsername(username){
        for(var u in mock){

            if(mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId){
        var index = mock.indexOf(findUserById(userId));
        if(index>=0){
            mock.splice(index, 1);
        }
    }

    function findAllUsers(){
        return mock;
    }
}


/**
 * Created by abhinavmaurya on 2/20/16.
 */
(function (){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService (){

        var userData =
            [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ];

        var api = {

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            //deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback){
            console.log("inside finduser");
            var user = null;
            for(var u in userData){

                if(userData[u].username == username && userData[u].password == password) {
                    user = userData[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback){
            callback(userData);
        }

        function createUser(user, callback){
            var newUser = {
                _id: (new Date()).getTime(),
                firstName: '',
                lastname: '',
                username: user.username,
                password: user.password,
                roles:[]
            };

            console.log(userData);

            userData.push(newUser);
            callback(newUser);
        }

        function updateUser(userId, user, callback){

            var old_user = findUserById(userId);
            if(old_user){
                var index = userData.indexOf(old_user);
                userData[index] = {
                    "_id": user._id,
                    firstName: user.firstName,
                    lastname: user.lastName,
                    username: user.username,
                    password: user.password,
                    roles: user.roles
                }
            }
            console.log(userData);
            callback(user);
        }

        function findUserById(userId){
            for(var u in userData){

                if(userData[u]._id == userId) {
                    return userData[u];
                }
            }
            return null;
        }
    }
})();
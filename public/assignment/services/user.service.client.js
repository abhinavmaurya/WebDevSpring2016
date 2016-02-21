/**
 * Created by abhinavmaurya on 2/20/16.
 */
(function (){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http){

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

            findUserByCredentials: findUserByCredentials
            /*findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser*/
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
    }
})();
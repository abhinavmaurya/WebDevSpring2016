/**
 * Created by abhinavmaurya on 2/22/16.
 */
(function (){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope){

        var formData =
            [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback){
            var newForm = {
                _id: (new Date()).getTime(),
                title: form.title,
                userId: userId
            };
            formData.push(newForm);
            findAllFormsForUser(userId, callback);
        }

        function findAllFormsForUser(userId, callback){
            var result = [];
            for(var f in formData){
                if (formData[f].userId == userId){
                    result.push(formData[f]);
                }
            }

            callback(result);
        }

        function deleteFormById(formId, callback){
            var index = formData.indexOf(findFormById(formId));
            if(index>=0){
                formData.splice(index, 1);
            }

            findAllFormsForUser($rootScope.user._id, callback);
        }


        function updateFormById(formId, newForm, callback){
            var index = formData.indexOf(findFormById(formId));
            if(index >= 0){
                formData[index]={
                    _id: formData[index]._id,
                    title: newForm.title,
                    userId: formData[index].userId
                };
            }

            //callback(formData);
            findAllFormsForUser($rootScope.user._id, callback);
        }


        function findFormById(formId){
            for(var f in formData){

                if(formData[f]._id == formId) {
                    return formData[f];
                }
            }
            return null;
        }
    }
})();
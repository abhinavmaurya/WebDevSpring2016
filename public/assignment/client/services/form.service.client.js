/**
 * Created by abhinavmaurya on 2/22/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return api;

        function createFormForUser(userId, form){
            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userId);
            return $http.post(url, form);
        }

        function findAllFormsForUser(userId){
            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userId);
            return $http.get(url);
        }

        function deleteFormById(formId){
            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);
            return $http.delete(url);
        }


        function updateFormById(formId, newForm){
            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);
            return $http.put(url, newForm);
        }


        function findFormById(formId){
            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);

            return $http.get(url);
        }
    }
})();
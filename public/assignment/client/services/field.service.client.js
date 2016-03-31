/**
 * Created by abhinavmaurya on 3/18/16.
 */

"use strict";

(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {

            createField: createField,
            findFieldsByForm: findFieldsByForm,
            getFieldForForm: getFieldForForm,
            deleteField: deleteField,
            updateField: updateField,
            sortFields: sortFields
        };
        return api;

        function createField(formId, field) {

            var url = "/api/assignment/form/:formId/field";
            url = url.replace(":formId", formId);
            return $http.post(url, field);
        }

        function sortFields(formId, startIndex, endIndex) {
            return $http.put("/api/assignment/form/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function findFieldsByForm(formId) {
            var url = "/api/assignment/form/:formId/field";
            url = url.replace(":formId", formId);

            return $http.get(url);
        }

        function getFieldForForm(formId, fieldId) {
            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);

            return $http.get(url);
        }

        function deleteField(formId, fieldId) {
            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);

            return $http.delete(url);
        }

        function updateField(formId, fieldId, field) {
            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);
            return $http.put(url, field);
        }
    }
})();
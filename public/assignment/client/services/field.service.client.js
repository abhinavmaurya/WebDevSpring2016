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

            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return api;

        function createFieldForForm(formId, field) {

            var url = "/api/assignment/form/:formId/field";
            url = url.replace(":formId", formId);
            return $http.post(url, field);
        }

        function getFieldsForForm(formId) {
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

        function deleteFieldFromForm(formId, fieldId) {
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
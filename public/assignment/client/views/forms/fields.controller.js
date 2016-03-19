/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $routeParams, $location, $scope, $uibModal, $log) {

        var vm = this;
        vm.fields = null;
        vm.field = null;
        vm.options = null;

        vm.removeField = removeField;
        vm.addField = addField;
        vm.editField = editField;

        vm.oldIndex = -1;
        var formId = -1;

        function init() {
            if($routeParams.formId) {
                formId = $routeParams.formId;
                FieldService
                    .getFieldsForForm(formId)
                    .then(function (response) {
                        vm.fields = response.data;
                        console.log(vm.fields);
                        vm.$location = $location;
                        $scope.fields = vm.fields;
                    });

            }else{
                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text Field", value: "SINGLE-LINE-TEXT"},
                {name: "Multi Line Text Field", value: "MULTI-LINE-TEXT"},
                {name: "Date Field", value: "DATE"},
                {name: "Dropdown Field", value: "DROPDOWN"},
                {name: "Checkboxes Field", value: "CHECKBOX"},
                {name: "Radio Buttons Field", value: "RADIO"}
            ];
        }
        init();

        function removeField($index) {

            var fieldId = vm.fields[$index]._id;

            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    if(response.data) {
                        FieldService
                            .getFieldsForForm(formId)
                            .then(function (response) {
                                vm.fields = response.data;
                                $scope.fields = vm.fields;

                            });
                    }
                });
        }

        function addField() {

            var fieldType = vm.fieldType.value;

            switch (fieldType) {

                case "SINGLE-LINE-TEXT":
                    vm.field = createSingleLineTextField();
                    break;

                case "MULTI-LINE-TEXT":
                    vm.field = createMultiLineTextField();
                    break;

                case "DATE":
                    vm.field = createDateField();
                    break;

                case "DROPDOWN":
                    vm.field = createDropDownField();
                    break;

                case "CHECKBOX":
                    vm.field = createCheckboxField();
                    break;

                case "RADIO":
                    vm.field = createRadioField();
                    break;
            }

            FieldService
                .createFieldForForm(formId, vm.field)
                .then(function (response) {
                    vm.fields = response.data;
                    $scope.fields = vm.fields;
                    vm.field = {};
            });

        }

        function createSingleLineTextField() {

            var field = {
                _id: null,
                label: "New Text Field",
                type: "TEXT",
                placeholder: "New Field"
            };

            return field;
        }

        function createMultiLineTextField() {

            var field = {
                _id: null,
                label: "New Text Field",
                type: "TEXTAREA",
                placeholder: "New Field"
            };

            return field;
        }

        function createDateField() {

            var field = {
                _id: null,
                label: "New Date Field",
                type: "DATE"
            };

            return field;
        }

        function createDropDownField() {

            var field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            return field;
        }

        function createCheckboxField() {

            var field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            return field;
        }

        function createRadioField() {

            var field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            return field;
        }
        function editField($index) {

            vm.fieldToBeEdited = vm.fields[$index];
            var modalInstance = $uibModal.open({
                templateUrl: 'fieldEditModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    field: function () {
                        return vm.fieldToBeEdited;
                    }
                }
            });

            modalInstance.result.then(function (field) {
                FieldService
                    .updateField(formId, field._id, field)
                    .then(function (response) {
                        if(response.data) {
                            FieldService
                                .getFieldsForForm(formId)
                                .then(function (response) {
                                    init();
                            });
                        }
                });
            });
        }
    }

    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceCtrl',
            function ($scope, $uibModalInstance, field) {
                $scope.field = field;
                $scope.convertOptions = convertOptions;
                $scope.newField = {
                    label: field.label,
                    options: convertOptions(field.options),
                    placeholder: field.placeholder
                };
                console.log($scope.newField);
                console.log(field);

                function convertOptions(options){
                    var string = "";
                    for(var i in options){
                        string += options[i].label + ":" + options[i].value + "\n";
                    }
                    return string;
                }

                $scope.ok = function () {
                    if($scope.newField.label) {
                        $scope.field.label = $scope.newField.label;
                    }
                    if($scope.field.type != "DATE") {
                        if($scope.newField.placeholder) {
                            if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA") {
                                $scope.field.placeholder = $scope.newField.placeholder;
                            } else {
                                UpdateOtherFields();
                            }
                        }
                    }

                    function UpdateOtherFields() {
                        var content = $scope.newField.options;
                        console.log(content);
                        content = content.trim();
                        var rawOptions = content.split("\n");
                        var options = [];
                        for (var i in rawOptions) {
                            var rawField = rawOptions[i].split(":");
                            var option = {label: rawField[0].trim(), value: rawField[1].trim()};
                            options.push(option);
                        }
                        $scope.field.options = options;
                    }
                    $uibModalInstance.close($scope.field);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    });
})();
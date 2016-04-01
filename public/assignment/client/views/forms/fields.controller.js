"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams, $route) {
        var vm = this;
        vm.cField = null;
        vm.eField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.sortFields = sortFields;
        vm.duplicateField = duplicateField;
        var formId = $routeParams.formId;

        vm.options = [
            {name: "Single Line Text Field", value: "TEXT"},
            {name: "Multi Line Text Field", value: "TEXTAREA"},
            {name: "Password Field", value: "PASSWORD"},
            {name: "Email Field", value: "EMAIL"},
            {name: "Date Field", value: "DATE"},
            {name: "Dropdown Field", value: "DROPDOWN"},
            {name: "Checkboxes Field", value: "CHECKBOX"},
            {name: "Radio Buttons Field", value: "RADIO"}
        ];

        function init() {
            FieldService
                .findFieldsByForm(formId)
                .then(
                    function(response){
                        vm.fields = response.data;
                    }
                );
            FormService
                .findFormById(formId)
                .then(
                    function (response){
                        vm.form = response.data;
                    }
                );
        }
        init();

        function sortFields(start, end) {
            FieldService
                .sortFields(formId, start, end)
                .then(
                    function (response) {
                        init();
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        function deleteField(field) {
            vm.cField = null;
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function addField(fieldType) {
            var field = null;
            switch (fieldType) {
                case "TEXT":
                    field = createSingleLineTextField();
                    break;

                case "TEXTAREA":
                    field = createMultiLineTextField();
                    break;

                case "DATE":
                    field = createDateField();
                    break;

                case "DROPDOWN":
                    field = createDropDownField();
                    break;

                case "CHECKBOX":
                    field = createCheckboxField();
                    break;

                case "RADIO":
                    field = createRadioField();
                    break;

                case "EMAIL":
                    field = createEmailField();
                    break;

                case "PASSWORD":
                    field = createPasswordField();
                    break;

                default:
                    field = createSingleLineTextField();
            }
            FieldService
                .createField(formId, field)
                .then(function(newField){
                    init();
                });
        }


        function duplicateField(field){
            var dupField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                option: field.options
            };

            FieldService
                .createField(formId, dupField)
                .then(init);
        }


        function editField(field) {
            vm.eField = {
                _id: field._id,
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options: field.options,
                header: translateFieldType(field.type)
            };

            var isOption =
                !(
                    vm.eField.type === 'TEXT' ||
                    vm.eField.type === 'TEXTAREA' ||
                    vm.eField.type === 'PASSWORD' ||
                    vm.eField.type === 'EMAIL' ||
                    vm.eField.type === 'DATE'
                );

            if (isOption) {
                var optionList = [];
                var ol = vm.eField.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                vm.eField.optionText = optionList.join("\n");
            }
        }

        function commitEdit(field) {
            vm.eField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder
            };

            var isOption =
                !(
                    vm.eField.type === 'TEXT' ||
                    vm.eField.type === 'TEXTAREA' ||
                    vm.eField.type === 'PASSWORD' ||
                    vm.eField.type === 'EMAIL' ||
                    vm.eField.type === 'DATE'
                );

            var optionArray = [];
            if (isOption) {
                var oa = field.optionText.split("\n");
                for (var o in oa) {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0].trim(),
                        value: a[1].trim()
                    });
                }
                vm.eField.options = optionArray;

            }
            FieldService
                .updateField(formId, field._id, vm.eField)
                .then(init);
            vm.eField = null;
        }



        /* Helper functions to create fields*/
        function createSingleLineTextField() {

            var field = {
                label: "New Text Field",
                type: "TEXT",
                placeholder: "New Field"
            };

            return field;
        }

        function createPasswordField() {

            var field = {
                label: "New Password Field",
                type: "PASSWORD",
                placeholder: "Password"
            };

            return field;
        }

        function createEmailField() {

            var field = {
                label: "New Email Field",
                type: "EMAIL",
                placeholder: "alice@wonderland.com"
            };

            return field;
        }

        function createMultiLineTextField() {

            var field = {
                label: "New Text Area",
                type: "TEXTAREA",
                placeholder: "New Field"
            };

            return field;
        }

        function createDateField() {
            var field = {
                label: "New Date Field",
                type: "DATE"
            };

            return field;
        }

        function createDropDownField() {

            var field = {"label": "New Dropdown", "type": "DROPDOWN", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            return field;
        }

        function createCheckboxField() {

            var field = {"label": "New Checkboxes", "type": "CHECKBOX", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            return field;
        }

        function createRadioField() {

            var field = {"label": "New Radio Buttons", "type": "RADIO", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            return field;
        }

        function translateFieldType(fieldType) {
            var name = "";
            for (var k in vm.options) {
                if (vm.options[k].value == fieldType){
                    name = vm.options[k].name;
                    break;
                }
            }
            return name;
        }

    }
})();
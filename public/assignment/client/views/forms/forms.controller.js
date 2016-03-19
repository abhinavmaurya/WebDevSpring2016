/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService, $location){


        var vm = this;
        function init(){
            vm.usr = UserService.getCurrentUser();
            FormService
                .findAllFormsForUser(vm.usr._id)
                .then(function(response) {
                    setForms(response.data);
                    vm.$location = $location;
                });
        }
        init();
        vm.selectedForm = null;

        // event handlers
        vm.setForms = setForms;
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.unselectForm = unselectForm;


        function setForms(forms){
            console.log(forms);
            vm.forms = forms;   // set updated forms
            vm.form = null; //reset form
            vm.selectedForm = false;
            vm.message = null;
        }

        function addForm(form){
            if(!form){
                vm.message = "Please specify a valid name of the form.";
            }else{
                var newForm = {
                    title: form.title
                };
                FormService
                    .createFormForUser(vm.usr._id, newForm)
                    .then(function(response) {
                        setForms(response.data);
                    });
            }
        }

        function deleteForm(form){
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    if(response.data)
                        init();
                });
        }


        function selectForm(form){
            vm.form = {
                _id: form._id,
                title: form.title
            };
            vm.selectedForm = true;
        }

        function updateForm(form){

            var updatedForm = {
                title: form.title
            };

            FormService
                .updateFormById(form._id, updatedForm)
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });
        }

        function unselectForm(){
            vm.form = null;
            vm.selectedForm = null;
        }
    }
})();
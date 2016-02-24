/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, FormService){

        console.log("Inside Form controller")
        var userId = $rootScope.user._id;
        FormService.findAllFormsForUser(userId, setForms);


        $scope.setForms = setForms;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;


        function setForms(forms){
            console.log(forms);
            $scope.forms = forms;
        }

        function addForm(form){

            var newForm = {
                title: form.title
            };
            FormService.createFormForUser(userId, newForm, setForms);
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id, setForms);
        }


        function selectForm(form){
            $scope.form = {
                _id: form._id,
                title: form.title
            };
        }

        function updateForm(form){

            var updatedForm = {
                title: form.title
            };

            FormService.updateFormById(form._id, updatedForm, setForms);
        }

    }
})();
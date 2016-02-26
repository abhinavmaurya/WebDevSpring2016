/**
 * Created by abhinavmaurya on 2/19/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, FormService, UserService){

        var usr = UserService.getCurrentUser();
        var userId = null;
        // Redirect if user id is not found in scope i.e. logout
        if(usr){
            userId = usr._id;
        }else{
            $scope.$location.url("/home");
        }

        FormService.findAllFormsForUser(userId, setForms);

        $scope.form = null;
        $scope.selectedForm = null;

        // even handlers
        $scope.setForms = setForms;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.unselectForm = unselectForm;


        function setForms(forms){
            $scope.forms = forms;   // set updated forms
            $scope.form = null; //reset form
        }

        function addForm(form){

            if(!form){
                $scope.message = "Please specify a valid name of the form."
            }else{
                var newForm = {
                    title: form.title
                };
                FormService.createFormForUser(userId, newForm, setForms);
            }
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id, setForms);
        }


        function selectForm(form){
            $scope.form = {
                _id: form._id,
                title: form.title
            };
            $scope.selectedForm = true;
        }

        function updateForm(form){

            var updatedForm = {
                title: form.title
            };

            FormService.updateFormById(form._id, updatedForm, setForms);
        }

        function unselectForm(){
            $scope.form = null;
            $scope.selectedForm = null;
        }

    }
})();
/**
 * Created by abhinavmaurya on 3/30/16.
 */

module.exports = function(formModel) {

    var FormModel = formModel.getMongooseModel();

    var api = {
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        sortFields: sortFields
    };

    return api;

    function createFieldForForm(formId, field) {
        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function findAllFieldsForForm (formId) {
        return FormModel.findById(formId)
            .then(
                function(form){
                    return form.fields;
                }
            );
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        return FormModel
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        return FormModel
            .findById(formId)
            .then(
                function(form){
                    var fieldToUpdate   = form.fields.id(fieldId);
                    fieldToUpdate.label  = field.label;
                    fieldToUpdate.type = field.type;
                    fieldToUpdate.placeholder = field.placeholder;
                    fieldToUpdate.options = field.options;
                    return form.save();
                }
            );
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        return FormModel
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function sortFields(formId, startIndex, endIndex) {
        return FormModel
            .findById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.markModified("fields");
                    form.save();
                }
            );
    }
};

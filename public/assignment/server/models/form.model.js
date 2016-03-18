/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

var mock = require("./form.mock.json");

module.exports = function() {
    var api = {

        //Form
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,

        //Field
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    };
    return api;

    function createForm(form) {
        form._id = new Date().getTime();
        mock.push(form);
    }

    function findFormById(formId) {
        for (var i in mock) {

            if(mock[i]._id === formId) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllForms() {

        return mock;
    }

    function updateFormById(formId, form) {

        for (var i in mock) {

            if(mock[i]._id == formId) {

                mock[i].title = form.title;
                break;
            }
        }

        return mock;
    }

    function deleteFormById(formId) {
        for (var i in mock) {

            if (mock[i]._id == formId) {

                mock.splice(i,1);
                break;
            }
        }
        return mock;
    }

    function findFormByTitle(formTitle) {
        for (var i in mock) {

            if (mock[i].title === formTitle) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsByUserId(userId) {
        var forms = [];

        for (var i in mock) {

            if (mock[i].userId == userId) {

                forms.push(mock[i]);
            }
        }

        return forms;
    }

    function createFieldForForm(formId, field) {
        for (var i in mock) {

            if (mock[i]._id === formId) {

                if(!mock[i].fields) {
                    mock[i].fields = [];
                }
                field._id = new Date().getTime();
                mock[i].fields.push(field);
                break;
            }
        }
    }

    function findAllFieldsForForm (formId) {

        for (var i in mock) {

            if (mock[i]._id === formId) {

                return mock[i].fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i in mock) {

            if (mock[i]._id === formId) {

                for (var j in mock[i].fields) {

                    if (mock[i].fields[j]._id === fieldId) {

                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        field._id = fieldId;

        for (var i in mock) {

            if (mock[i]._id === formId) {

                for (var j in mock[i].fields) {

                    if (mock[i].fields[j]._id === fieldId) {

                        mock[i].fields[j] = field;
                    }
                }
            }
        }
    }
    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                for (var j in mock[i].fields) {
                    if (mock[i].fields[j]._id === fieldId) {
                        mock[i].fields.splice(j,1);
                    }
                }
            }
        }
    }

}
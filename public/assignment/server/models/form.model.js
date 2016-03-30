/**
 * Created by abhinavmaurya on 3/16/16.
 */

"use strict"

//var mock = require("./form.mock.json");
var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {

        //Form
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel(){
        return FormModel;
    }

    function createForm(form) {
        var deferred = q.defer();
        FormModel.create(form, function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findFormById(formId) {
        /*for (var i in mock) {
            if(mock[i]._id == formId) {
                return mock[i];
            }
        }
        return null;*/
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {

        var deferred = q.defer();
        FormModel.find(function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {

        /*for (var i in mock) {

            if(mock[i]._id == formId) {

                mock[i].title = form.title;
                break;
            }
        }

        return mock;*/
        var deferred = q.defer();
        FormModel.update(
            {_id: formId},
            {$set: form},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        /*for (var i in mock) {

            if (mock[i]._id == formId) {

                mock.splice(i,1);
                break;
            }
        }
        return mock;*/
        var deferred = q.defer();
        FormModel.remove(
            {_id: formId},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;

    }

    function findFormByTitle(formTitle) {
        /*for (var i in mock) {

            if (mock[i].title == formTitle) {

                return mock[i];
            }
        }
        return null;*/
        var deferred = q.defer();
        FormModel.findOne(
            {title: formTitle},
            function(err, doc){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(doc);
                }
        });
        return deferred.promise;

    }

    function findAllFormsByUserId(userId) {
        /*var forms = [];

        for (var i in mock) {

            if (mock[i].userId == userId) {

                forms.push(mock[i]);
            }
        }
        return forms;*/
        var deferred = q.defer();
        FormModel.find(
            {userId: userId},
            function(err, doc){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    // ----------------------------------------------

}
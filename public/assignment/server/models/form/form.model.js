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

};
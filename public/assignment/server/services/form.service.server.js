/**
 * Created by abhinavmaurya on 3/18/16.
 */

"use strict"

module.exports = function(app, formModel) {

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findUserForms);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm (req, res) {

        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;

        formModel.createForm(form)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserForms(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsByUserId(userId)
            .then(
                function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllForms(req, res) {
        formModel.findAllForms()
            .then(
                function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId, form)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        res.send(200);
    }
};
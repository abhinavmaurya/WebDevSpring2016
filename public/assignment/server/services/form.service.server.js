/**
 * Created by abhinavmaurya on 3/18/16.
 */

"use strict"

module.exports = function(app, formModel) {

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findAllformsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm (req, res) {

        var form = req.body;
        var userId = req.params.userId;

        form.userId = userId;

        formModel.createForm(form);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllformsForUser(req, res) {
        var userId = parseInt(req.params.userId);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllForms(req, res) {
        res.json(formModel.findAllForms());
    }

    function findFormById(req, res) {
        var formId = parseInt(req.params.formId);
        res.json(formModel.findFormById(formId));
    }

    function updateFormById(req, res) {
        var formId = parseInt(req.params.formId);
        var form = req.body;

        formModel.updateFormById(formId, form);
        res.send(200);
    }

    function deleteFormById(req, res) {

        var formId = parseInt(req.params.formId);
        formModel.deleteFormById(formId);
        res.send(200);
    }
};
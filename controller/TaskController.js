var TaskModel = require('../model/TaskModel');
var Promise = require('bluebird');

function TaskController(Model) {
    this.Model = Promise.promisifyAll(Model);
}

TaskController.prototype.create = function(req, res) {
    console.log('TaskController.prototype.create');
    var data = req.body;
    this.Model.createAsync(data)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        console.log(err);
    });
};

TaskController.prototype.findOne = function(req, res) {
    console.log('TaskController.prototype.findOne');
    var id = req.params._id;

    this.Model.findOneAsync(id)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        console.log(err);
    });
};

TaskController.prototype.findAll = function(req, res) {
    console.log('TaskController.prototype.findAll');
    var data = req.body;

    this.Model.findAllAsync()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        console.log(err);
    });
};

TaskController.prototype.update = function(req, res) {
    console.log('TaskController.prototype.update');
    var data = req.body,
    id = req.params._id;

    this.Model.updateAsync(data, id)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        console.log(err);
    });
};

TaskController.prototype.delete = function(req, res) {
    console.log('TaskController.prototype.delete');
    var id = req.params._id;

    this.Model.deleteAsync(id)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        console.log(err);
    });
};

module.exports = new TaskController(TaskModel);

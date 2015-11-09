var express = require('express');
var router = express.Router();

var TaskController      = require('../controller/TaskController');
// Page
router.get('/', function (req, res) {res.render('index', { title: 'ejs' })});

// Task
router.get ('/task',        TaskController.findAll.bind(TaskController));
router.get ('/task/:_id',   TaskController.findOne.bind(TaskController));
router.post('/task',        TaskController.create.bind(TaskController));
router.put ('/task/:_id',   TaskController.update.bind(TaskController));
router.delete('/task/:_id', TaskController.delete.bind(TaskController));

module.exports = router;

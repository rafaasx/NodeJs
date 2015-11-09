var db = require('../Db/sqlite');
var jsonSql = require('json-sql')();

function TaskModel() {
    try {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task varchar(200), done INTEGER)");
        });
    } catch (e) {
        console.log('TaskModel - ' + e);
    } finally {

    }

}

TaskModel.prototype.create = function(data, callback) {
    try {
        console.log('TaskModel.prototype.create');
        var result;
        db.run("INSERT INTO tasks (task, done) VALUES ('" + data.task + "', " + parseInt(data.done) + ")",
        function() {
            console.log('entrou');
            data.id = this.lastID;
            console.log(JSON.stringify(data));
            callback(undefined, data);
        });
    } catch (e) {
        console.log('TaskModel.prototype.create - ' + e);
    } finally {
    }
};

TaskModel.prototype.findOne = function(id, callback) {
    try {
        console.log('TaskModel.prototype.findOne');
        db.each("SELECT id, task, done FROM tasks WHERE id = " + id, function(err, row) {
            callback(err, row);
         });
     } catch (e) {
        console.log('TaskModel.prototype.findAll - ' + e);
    } finally {
    }

};

TaskModel.prototype.findAll = function(callback) {
    try {
        console.log('TaskModel.prototype.findAll');
        var jsonList = [];
        console.log('TaskModel.prototype.findAll');
        db.each("SELECT id, task, done FROM tasks", function(err, row) {
            row.done = (row.done == 1 ? true : false);
            jsonList.push(row);
            callback(err, jsonList);
         });
     } catch (e) {
        console.log('TaskModel.prototype.findAll - ' + e);
    } finally {
    }
};

TaskModel.prototype.update = function(data, id, callback) {
    console.log('TaskModel.prototype.update');
    var sql = " UPDATE tasks ";
        sql += " SET task = '" + data.task + "', done = " + (data.done == true ? 1 : 0);
        sql += " WHERE id = " + id;
        db.run(sql);
};

TaskModel.prototype.delete = function(id, callback) {
    console.log('TaskModel.prototype.delete');
    db.run("DELETE FROM tasks WHERE id = '" + id + "'" )
};

module.exports = new TaskModel();

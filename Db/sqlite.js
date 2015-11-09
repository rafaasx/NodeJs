var sqlite3 = require('sqlite3').verbose();
var result;
var db = new sqlite3.Database('Db/task.db', result);

module.exports = db;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var path = require('path');

app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(require('stylus').middleware(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, '/')));
/*
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Ori­gin', "*");
    res.header('Access-Control-Allow-Met­hods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Hea­ders', 'Content-Type');
    next();
});
*/
var routes = require('./routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
app.use(methodOverride('_method'));

app.use('/', routes);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

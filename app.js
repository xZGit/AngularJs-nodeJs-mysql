/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');

var config = require('./config.js');


//set test
var routes = config.isNotCoverTest ? './routes' : './routes-cov';

var index = require(routes + '/index');
var user = require(routes + '/user');
var common = require(routes + '/common');
var files = require(routes + '/fileUpload');
var app = express();


var session = require('express-session');


var mysql = require('mysql'), // node-mysql module
    myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = config.db;


// all environments
app.set('port', process.env.PORT || 4300);


app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'www')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//mysql
app.use(myConnection(mysql, dbOptions, 'request'));

//session
app.use(express.cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { path: '/', maxAge: 60000}}));

//fileServer
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/uploads' }));

app.get('/', index.index);
app.post('/login', user.login);
app.get('/user/:userId', user.getUser);
app.post('/saveFile', files.saveFile);
app.delete('/user/:userId', user.deleteUser);
app.post('/user', user.userServ);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;

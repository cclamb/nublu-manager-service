var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('nublu-manager-service');
var routes = require('./routes/index');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = 'resource not found';
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.statusCode = err.status;
        debug('error: ' + err);
        res.json({
            status: 'error',
            error: err.status,
            message: err.message,
            trace: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.statusCode = err.status;
    debug('error: ' + err);
    res.json({
            status: 'error',
            error: err.status,
            message: err.message
        });
});

module.exports = app;

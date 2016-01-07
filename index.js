'use strict';

var app = require('angular').module('MonogramGame', [
    require('angular-ui-router'),
]);

var indexController = app.controller('Play', require('./app/js/controllers/Play'));
app.config(require('./app/js/config'));

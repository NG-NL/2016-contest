'use strict';

var app = require('angular').module('NonogramGame', [
    require('angular-ui-router'),
]);

// Controllers
app.controller('Play', require('./app/js/controllers/Play'));

// Factories
app.factory('Board', require('./app/js/factories/Board'));
app.factory('Square', require('./app/js/factories/Square'));

app.config(require('./app/js/config'));

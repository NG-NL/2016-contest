'use strict';

window.jQuery = require('jquery');
var app = require('angular').module('NonogramGame', [
    require('angular-ui-router'),
]);

// Controllers
app.controller('Play', require('./app/js/controllers/Play'));

// Factories
app.factory('Board', require('./app/js/factories/Board'));
app.factory('Square', require('./app/js/factories/Square'));
app.factory('jQuery', ['$window', function ($window) {
    return $window.jQuery;
}]);

// Services
app.service('BoardsCollection', require('./app/js/services/BoardsCollection'));



app.config(require('./app/js/config'));

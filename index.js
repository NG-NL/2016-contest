'use strict';

window.jQuery = require('jquery');
window._ = require('underscore');
var app = require('angular').module('NonogramGame', [
    require('angular-ui-router'),
]);

// Controllers
app.controller('Play', require('./app/js/controllers/Play'));

// Factories
app.factory('Board', require('./app/js/factories/Board'));
app.factory('Square', require('./app/js/factories/Square'));
app.factory('BoardRobot', require('./app/js/factories/BoardRobot'));
app.factory('jQuery', ['$window', function ($window) {
    return $window.jQuery;
}]);
app.factory('_', ['$window', function ($window) {
    return $window._;
}]);

// Services
app.service('BoardsCollection', require('./app/js/services/BoardsCollection'));



app.config(require('./app/js/config'));

'use strict';

module.exports = function($scope, Board, $rootScope) {

    var rand = function(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    $rootScope.bodyClass = 'bg-' + rand([1,2,3,4,5,6]);

    var data = require('../../../nonogramData');

    var easyData = {
        rows: [
            [5],
            [2],
            [2, 1],
            [2],
            [3],
        ],
        columns: [
            [1],
            [1,1,1],
            [1,3],
            [2,2],
            [3],
        ]
    };

    var board = new Board(data.rows, data.columns);
    board.generate();


    $scope.game = {
        board: board,
        rows: data.rows,
        columns: data.columns,
    };
};

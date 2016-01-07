'use strict';

module.exports = function($scope, Board) {

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

    var board = new Board(easyData.rows, easyData.columns);
    board.generate();


    $scope.game = {
        board: board,
        rows: easyData.rows,
        columns: easyData.columns,
    };
};

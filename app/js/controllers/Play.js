'use strict';

module.exports = function($scope, Board, $rootScope, BoardsCollection) {
    // Body class
    var rand = function(array) {
        return array[Math.floor(Math.random() * array.length)];
    };
    $rootScope.bodyClass = 'bg-' + rand([1,2,3,4,5,6]);

    $scope.boards = [];
    $scope.board = {};

    BoardsCollection.forEach(function(data) {
        var board = new Board(data.rows, data.columns);
        board.generate();
        board.name = data.name;
        $scope.boards.push(board);
    });

    $scope.board = $scope.boards[0];
};

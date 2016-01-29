'use strict';

module.exports = ['$scope', 'Board', '$rootScope', 'BoardsCollection', 'jQuery', '$timeout',
    function($scope, Board, $rootScope, BoardsCollection, $, $t) {
        // Body class
        var rand = function(array) {
            return array[Math.floor(Math.random() * array.length)];
        };
        $rootScope.bodyClass = 'bg-' + rand([1,2,3,4,5,6]);

        $scope.playing = false;
        $scope.timer = 0;
        $scope.boards = [];
        $scope.board = {};

        $scope.$watch('board', function (value, previous) {
            var val = value || null;
            if (val) {
                previous.timer = $scope.timer;
                $scope.playing = false;
                $scope.timer = value.timer ? value.timer : 0;
                var defaultFontSize = '16px';
                $('html').css('font-size', defaultFontSize);
                $t(resizeBoardIfNeeded, 50); // keep resizing if needed
            }
        });

        BoardsCollection.forEach(function(data) {
            var board = new Board(data.rows, data.columns);
            board.generate();
            board.name = data.name;
            $scope.boards.push(board);
        });

        $scope.board = $scope.boards[0];

        $scope.startPlaying  = function() {
            $scope.playing = !$scope.playing;
            startTimer();
        };

        $scope.changeBoard = function(board) {
            $scope.board = board;
            $scope.showBoardSelector = false;
        };

        var startTimer = function() {
            if ($scope.playing && $scope.board.isValid() === false) {
                $t(function() {
                    $scope.timer = $scope.timer + 1;
                    startTimer();
                }, 1000);
            }
        };

        var resizeBoardIfNeeded = function() {
            if (
                $('.game .wrapper').outerHeight() > $(window).height() ||
                $('.game .wrapper').outerWidth() > $(window).width())
            {
                $('html').css('font-size', (parseInt($('html').css('font-size')) - 1) + 'px');
                resizeBoardIfNeeded();
            }
        };
    }
];

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

        $scope.$watch('board', function (value) {//I change here
            var val = value || null;
            if (val) {
                $scope.playing = false;
                $scope.timer = 0;
                var defaultFontSize = '16px';
                $('html').css('font-size', defaultFontSize);
                $t(resizeBoardIfNeeded, 50);
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

        var startTimer = function() {
            if ($scope.playing) {
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

require('./node_modules/angular/angular.min');

var puzzle = require('./nonogramData');
var NonogramSolver = require('./nonogram-solver');
var Cell = require('./cell');

var app = angular.module('nonogramApp', []);

app.service('nonogramSolver', NonogramSolver);

app.component('nonogramPuzzle', {
  controller: function (nonogramSolver, $scope, $timeout) {
    this.columnDefinitions = puzzle.columns;
    this.rowDefinitions = puzzle.rows;
    this.rows = [];
    this.columns = [];
    this.hint = hint;
    this.solve = solve;

    for (var row = 0; row < puzzle.rows.length; row++) {
      for (var col = 0; col < puzzle.columns.length; col++) {
        var cell = new Cell();
        this.rows[row] = this.rows[row] || [];
        this.rows[row][col] = cell;

        this.columns[col] = this.columns[col] || [];
        this.columns[col][row] = cell;
      }
    }

    function hint() {
      var nonogramPuzzle = this;
      for (var row = 0; row < puzzle.rows.length; row++) {
        if (nonogramSolver.hint(nonogramPuzzle.rowDefinitions[row], nonogramPuzzle.rows[row])) {
          return;
        }
      }
      for (var col = 0; col < puzzle.columns.length; col++) {
        if (nonogramSolver.hint(nonogramPuzzle.columnDefinitions[col], nonogramPuzzle.columns[col])) {
          return;
        }
      }

    }

    function solve() {
      var nonogramPuzzle = this;
      var row = 0;
      var col = 0;
      var didSomething = false;

      function solveRow() {
        console.log('Solving row ' + row);
        if (nonogramSolver.solve(nonogramPuzzle.rowDefinitions[row], nonogramPuzzle.rows[row])) {
          didSomething = true;
        }
        row++;
        if (row < puzzle.rows.length) {
          $timeout(solveRow);
          $scope.$apply();
        } else {
          row = 0;
          $timeout(solveCol)
        }
      }

      function solveCol() {
        console.log('Solving col ' + col);
        if (nonogramSolver.solve(nonogramPuzzle.columnDefinitions[col], nonogramPuzzle.columns[col])) {
          didSomething = true;
        }
        col++;
        if (col < puzzle.columns.length) {
          $timeout(solveCol);
          $scope.$apply();
        } else {
          col = 0;
          if (didSomething) {
            didSomething = false;
            $timeout(solveRow);
          }
        }
      }

      $timeout(solveRow);

    }
  },
  template: '<div class="row">' +
            '  <div><span class="definition horizontal vertical">' +
            '    <button ng-click="$ctrl.hint()">Hint</button>' +
            '    <button ng-click="$ctrl.solve()">Solve</button>' +
            '  </span></div>' +
            '  <nonogram-definition ng-repeat="col in $ctrl.columns" x="$index" cells="col"' +
            '    definition="$ctrl.columnDefinitions[$index]" ng-class="{' +
            '      borderright: ($index % 5) === 4 && !$last' +
            '  }">' +
            '  </nonogram-definition>' +
            '</div>' +
            '<div class="row" ng-repeat="row in $ctrl.rows" ng-class="{' +
            '      borderbottom: ($index % 5) === 4 && !$last' +
            '  }">' +
            '  <nonogram-definition y="$index" cells="row" definition="$ctrl.rowDefinitions[$index]">' +
            '  </nonogram-definition>' +
            '  <nonogram-cell ng-repeat="col in $ctrl.columns" cell="row[$index]" ng-class="{' +
            '      borderright: ($index % 5) === 4 && !$last' +
            '  }">' +
            '  </nonogram-cell>' +
            '</div>'
});

app.component('nonogramDefinition', {
  bindings: {
    definition: '=',
    cells: '=',
    x: '=',
    y: '='
  },
  controller: function () {
    var definitionRegex = new RegExp('^[01]*2{' + this.definition.join('}[01]+2{') + '}[01]*$');
    var notWrongRegex = new RegExp('^[01]*[012]{' + this.definition.join('}[01]+[012]{') + '}[01]*$');

    this.isValid = function () {
      return definitionRegex.test(this.cells.join(''));
    };

    this.isWrong = function () {
      return !notWrongRegex.test(this.cells.join(''));
    }
  },
  template: '<span class="definition" ng-class="{' +
            '  horizontal: $ctrl.x === undefined,' +
            '  vertical: $ctrl.y === undefined,' +
            '  valid: $ctrl.isValid(),' +
            '  wrong: $ctrl.isWrong()' +
            '}">' +
            '  <span ng-repeat="def in $ctrl.definition track by $index">{{def}}</span>' +
            '</span>'
});

app.component('nonogramCell', {
  bindings: {
    cell: '='
  },
  controller: function () {
    this.val = 1;
    this.toggle = this.cell.toggle.bind(this.cell);
  },
    template: '<span ng-click="$ctrl.toggle()" class="cell" ng-class="{' +
              '  unchecked : $ctrl.cell.value === 0,' +
              '  unknown: $ctrl.cell.value === 1,' +
              '  checked: $ctrl.cell.value === 2,' +
              '  suggested: $ctrl.cell.suggest' +
              '}"></span>'
});



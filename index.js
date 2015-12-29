require('./bower_components/angular/angular.min');

var puzzle = require('./nonogramData');

var app = angular.module('nonogramApp', []);

function Cell() {
  this.value = 1;
}

Cell.prototype.toggle = function () {
  this.value = (this.value + 1) % 3;
};

Cell.prototype.toString = function () {
  return String(this.value);
};

app.component('nonogramPuzzle', {
  controller: function () {
    this.columnDefinitions = puzzle.columns;
    this.rowDefinitions = puzzle.rows;
    this.rows = [];
    this.columns = [];

    for (var row = 0; row < puzzle.rows.length; row++) {
      for (var col = 0; col < puzzle.columns.length; col++) {
        var cell = new Cell(row, col);
        this.rows[row] = this.rows[row] || [];
        this.rows[row][col] = cell;

        this.columns[col] = this.columns[col] || [];
        this.columns[col][row] = cell;
      }
    }
  },
  template: '<div class="row">' +
            '  <div><span class="definition horizontal vertical">&nbsp;<!-- empty top-left --></span></div>' +
            '  <nonogram-definition ng-repeat="col in nonogramPuzzle.columns" x="$index" cells="col"' +
            '    definition="nonogramPuzzle.columnDefinitions[$index]" ng-class="{' +
            '      borderright: ($index % 5) === 4 && !$last' +
            '  }">' +
            '  </nonogram-definition>' +
            '</div>' +
            '<div class="row" ng-repeat="row in nonogramPuzzle.rows" ng-class="{' +
            '      borderbottom: ($index % 5) === 4 && !$last' +
            '  }">' +
            '  <nonogram-definition y="$index" cells="row" definition="nonogramPuzzle.rowDefinitions[$index]">' +
            '  </nonogram-definition>' +
            '  <nonogram-cell ng-repeat="col in nonogramPuzzle.columns" cell="row[$index]" ng-class="{' +
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
            '  horizontal: nonogramDefinition.x === undefined,' +
            '  vertical: nonogramDefinition.y === undefined,' +
            '  valid: nonogramDefinition.isValid(),' +
            '  wrong: nonogramDefinition.isWrong()' +
            '}">' +
            '  <span ng-repeat="def in nonogramDefinition.definition track by $index">{{def}}</span>' +
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
  template: '<span ng-click="nonogramCell.toggle()" class="cell" ng-class="{' +
            '  unchecked : nonogramCell.cell.value === 0,' +
            '  unknown: nonogramCell.cell.value === 1,' +
            '  checked: nonogramCell.cell.value === 2' +
            '}"></span>'
});



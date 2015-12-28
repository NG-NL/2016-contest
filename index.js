require('./bower_components/angular/angular.min');

var puzzle = require('./nonogramData');

var app = angular.module('nonogramApp', []);

app.component('nonogramPuzzle', {
  bindings: {
  },
  controller: function () {
    this.columns = puzzle.columns;
    this.rows = puzzle.rows;
  },
  template:
    '<div class="row">' +
    '  <nonogram-definition><!-- empty top-left --></nonogram-definition>' +
    '  <nonogram-definition ng-repeat="col in nonogramPuzzle.columns" x="$index" definition="col">' +
    '  </nonogram-definition>' +
    '</div>' +
    '<div class="row" ng-repeat="row in nonogramPuzzle.rows">' +
    '  <nonogram-definition y="$index" definition="row"></nonogram-definition>' +
    '  <nonogram-cell ng-repeat="col in nonogramPuzzle.columns" x="$parent.$index" y="$index"></nonogram-cell>' +
    '</div>'
});

app.component('nonogramDefinition', {
  bindings: {
    definition: '=',
    x: '=',
    y: '='
  },
  controller: function () {
  },
  template:
  '<span class="definition" ng-class="{' +
  '  horizontal: nonogramDefinition.x === undefined,' +
  '  vertical: nonogramDefinition.y === undefined' +
  '}">' +
  '  <span ng-repeat="def in nonogramDefinition.definition track by $index">{{def}}</span>' +
  '  <span ng-if="nonogramDefinition.definition === undefined">&nbsp;</span>' +
  '</span>'
});

app.component('nonogramCell', {
  bindings: {
    x: '=',
    y: '='
  },
  controller: function ($log) {
    this.val = 0;
    this.toggle = function () {
      $log.log('Clicked (' + this.x + ',' + this.y + ')');
      this.val = (this.val + 1) % 3;
    }
  },
  template:
    '<span ng-click="nonogramCell.toggle()" class="cell" ng-class="{' +
    '  unknown : nonogramCell.val === 0,' +
    '  checked: nonogramCell.val === 1,' +
    '  unchecked: nonogramCell.val === 2' +
    '}"></span>'
});


